import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export default async function InvitePage({ params }) {
  const { token } = await params;

  const admin = createAdminClient();
  const { data: invite } = await admin
    .from("invites")
    .select(
      "id, to_email, role, status, expires_at, student_id, from_user_id, students(first_name, last_name)"
    )
    .eq("token", token)
    .maybeSingle();

  if (!invite) return <InviteShell heading="Invite not found" body="This invite link is invalid or has been removed." />;

  if (invite.status !== "pending") {
    return <InviteShell heading="Invite already used" body="This invite has already been accepted or expired." />;
  }
  if (new Date(invite.expires_at) < new Date()) {
    await admin.from("invites").update({ status: "expired" }).eq("id", invite.id);
    return <InviteShell heading="Invite expired" body="Ask your tutor to send a new invite." />;
  }

  const { data: inviter } = await admin
    .from("profiles")
    .select("full_name")
    .eq("id", invite.from_user_id)
    .maybeSingle();

  const studentName = invite.students
    ? `${invite.students.first_name} ${invite.students.last_name}`
    : "your child";
  const inviterName = inviter?.full_name || "Your tutor";
  const inviteRole =
    invite.role === "parent"
      ? "view reports for"
      : invite.role === "student"
        ? "be the student account for"
        : "tutor";

  // Check if the user is signed in.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Send invitees straight to the signup form with the email + role pre-filled.
    const params = new URLSearchParams({
      next: `/invite/${token}`,
      mode: "signup",
      email: invite.to_email,
      role: invite.role,
      inviter: inviterName,
      student: studentName,
    });
    redirect(`/?${params.toString()}`);
  }

  // Email mismatch — the invite was for a different address.
  if (user.email?.toLowerCase() !== invite.to_email.toLowerCase()) {
    return (
      <InviteShell
        heading="Email doesn't match"
        body={`This invite was sent to ${invite.to_email} but you're signed in as ${user.email}. Sign out and sign in with the invited email to accept.`}
      >
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="h-11 px-5 rounded-full bg-foreground text-background font-medium"
          >
            Sign out
          </button>
        </form>
      </InviteShell>
    );
  }

  // Accept the invite.
  if (invite.role === "parent" && invite.student_id) {
    await admin
      .from("students")
      .update({ parent_id: user.id })
      .eq("id", invite.student_id);

    // Make sure the user's role is "parent" (overrides default if they signed up via tutor flow).
    await admin
      .from("profiles")
      .update({ role: "parent" })
      .eq("id", user.id);
  }

  if (invite.role === "tutor" && invite.student_id) {
    await admin.from("tutor_students").upsert(
      { tutor_id: user.id, student_id: invite.student_id, status: "active" },
      { onConflict: "tutor_id,student_id" }
    );
    await admin.from("profiles").update({ role: "tutor" }).eq("id", user.id);
  }

  if (invite.role === "student" && invite.student_id) {
    await admin
      .from("students")
      .update({ student_user_id: user.id })
      .eq("id", invite.student_id);
    await admin.from("profiles").update({ role: "student" }).eq("id", user.id);
  }

  await admin.from("invites").update({ status: "accepted" }).eq("id", invite.id);

  redirect("/dashboard");
}

function InviteShell({ heading, body, children }) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-2xl font-semibold tracking-tight">Tuterly</div>
        <h1 className="text-xl font-semibold">{heading}</h1>
        <p className="text-sm text-zinc-500">{body}</p>
        {children}
      </div>
    </main>
  );
}
