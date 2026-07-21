import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import DashboardShell from "@/components/DashboardShell";
import { isAdminEmail } from "@/lib/admin";

const NAV = {
  tutor: [
    {
      label: "Dashboard",
      href: "/dashboard/tutor",
      icon: <Icon name="grid" />,
    },
    {
      label: "Resources",
      href: "/dashboard/tutor/resources",
      icon: <Icon name="folder" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Icon name="cog" />,
    },
  ],
  parent: [
    {
      label: "Dashboard",
      href: "/dashboard/parent",
      icon: <Icon name="grid" />,
    },
    {
      label: "Resources",
      href: "/dashboard/parent/resources",
      icon: <Icon name="folder" />,
    },
    // "Refer a friend" hidden during internal testing — the $20 credit
    // it pitches is part of the payment system, which is off while the
    // product is free. The page + API routes still exist; uncomment
    // when paid mode is ready.
    // {
    //   label: "Refer a friend",
    //   href: "/dashboard/parent/refer",
    //   icon: <Icon name="gift" />,
    // },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Icon name="cog" />,
    },
  ],
  student: [
    {
      label: "My dashboard",
      href: "/dashboard/student",
      icon: <Icon name="book" />,
    },
    {
      label: "Resources",
      href: "/dashboard/student/resources",
      icon: <Icon name="folder" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Icon name="cog" />,
    },
  ],
  admin: [
    {
      label: "Overview",
      href: "/dashboard/admin",
      icon: <Icon name="grid" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Icon name="cog" />,
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

  // Role is null on accounts that signed up via Google/OAuth without
  // selecting a role first (the old default-to-parent trigger has been
  // changed to NULL). Force them through the onboarding picker before
  // they hit any dashboard.
  if (!profile?.role) redirect("/onboarding/role");

  const navItems = [...(NAV[profile.role] ?? NAV.parent)];

  // Surface an Admin link for allowlisted staff regardless of their role.
  // Access is enforced server-side by requireAdmin() on the admin routes;
  // this just adds the nav entry so they can find it (audit C6).
  if (isAdminEmail(user.email) && profile.role !== "admin") {
    navItems.push({
      label: "Admin",
      href: "/dashboard/admin",
      icon: <Icon name="grid" />,
    });
  }

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
  if (name === "folder") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
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
  if (name === "gift") {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="3.5" y="9" width="17" height="11" rx="1.5" />
        <path d="M3 12h18" />
        <path d="M12 9v11" />
        <path d="M12 9c-2.5 0-4-1.4-4-3a2 2 0 0 1 4 0c0 1.6 0 3 0 3z" />
        <path d="M12 9c2.5 0 4-1.4 4-3a2 2 0 0 0-4 0c0 1.6 0 3 0 3z" />
      </svg>
    );
  }
  if (name === "cog") {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9 1.65 1.65 0 0 0 4.27 7.18l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.27.66.85 1.13 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }
  return null;
}
