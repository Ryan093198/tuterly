import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function DashboardIndex() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  switch (profile?.role) {
    case "tutor":
      redirect("/dashboard/tutor");
    case "admin":
      redirect("/dashboard/admin");
    case "parent":
    default:
      redirect("/dashboard/parent");
  }
}
