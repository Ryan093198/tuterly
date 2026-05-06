import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import DashboardShell from "@/components/DashboardShell";

const NAV = {
  tutor: [
    {
      label: "Students",
      href: "/dashboard/tutor",
      icon: <Icon name="students" />,
    },
  ],
  parent: [
    {
      label: "My children",
      href: "/dashboard/parent",
      icon: <Icon name="heart" />,
    },
  ],
  student: [
    {
      label: "My dashboard",
      href: "/dashboard/student",
      icon: <Icon name="book" />,
    },
  ],
  admin: [
    {
      label: "Overview",
      href: "/dashboard/admin",
      icon: <Icon name="grid" />,
    },
  ],
};

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, role")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "parent";
  const navItems = NAV[role] ?? NAV.parent;

  return (
    <DashboardShell
      navItems={navItems}
      user={{
        full_name: profile?.full_name ?? user.email,
        email: profile?.email ?? user.email,
      }}
    >
      {children}
    </DashboardShell>
  );
}

function Icon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "students") {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 19c.7-3.3 3.4-5.5 6.5-5.5s5.8 2.2 6.5 5.5" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M15 14.5c1.6.4 3 1.7 3.5 3.5" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z" />
      </svg>
    );
  }
  if (name === "book") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v14H5.5A1.5 1.5 0 0 0 4 18.5V4.5z" />
        <path d="M4 18.5A1.5 1.5 0 0 0 5.5 20H19" />
      </svg>
    );
  }
  if (name === "grid") {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  return null;
}
