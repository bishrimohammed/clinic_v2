"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LucideIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavItem, PermissionName } from "@/types/global";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const navMain: NavItem[] = [
  {
    title: "Patient Management",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    permissions: ["Patient", "Appointment", "Visit"],
    items: [
      {
        title: "Patients",
        url: "#",
        permission: "Patient",
      },
      {
        title: "Appointments",
        url: "#",
        permission: "Appointment",
      },
      {
        title: "Visits",
        url: "#",
        permission: "Visit",
      },
    ],
  },
  {
    title: "User Management",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    permissions: ["Employee", "Role", "User"],
    items: [
      {
        title: "Employees Management",
        url: "#",
        permission: "Employee",
      },
      {
        title: "Role Management",
        url: "#",
        permission: "Role",
      },
      {
        title: "Account Managment",
        url: "#",
        permission: "User",
      },
    ],
  },
  {
    title: "Lab Investigation",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    permissions: [
      "Lab Result",
      "External Lab Service Result",
      "View Lab Result",
    ],
    items: [
      {
        title: "Pending  Investigation",
        url: "#",
        permission: "Lab Result",
      },
      {
        title: "Pending External Investigation",
        url: "#",
        permission: "External Lab Service Result",
      },
      {
        title: "Completedd Investigation",
        url: "#",
        permission: "View Lab Result",
      },
    ],
  },
  {
    title: "Clinic Configurations",
    url: "#",
    icon: Bot,
    isActive: true,
    permissions: [
      "Clinic Profile",
      "Clinic Services",
      "Clinic Field Configuration",
      "Credit Service",
    ],
    items: [
      {
        title: "Clinic Profile Management",
        url: "#",
        permission: "Clinic Profile",
      },
      {
        title: "Clinic Services Management",
        url: "#",
        permission: "Clinic Services",
      },
      {
        title: "Clinic Field Configuration",
        url: "#",
        permission: "Clinic Field Configuration",
      },
      {
        title: "Clinic Credit Service",
        url: "#",
        permission: "Credit Service",
      },
    ],
  },
  // {
  //   title: "Documentation",
  //   url: "#",
  //   icon: BookOpen,
  //   items: [
  //     {
  //       title: "Introduction",
  //       url: "#",
  //     },
  //     {
  //       title: "Get Started",
  //       url: "#",
  //     },
  //     {
  //       title: "Tutorials",
  //       url: "#",
  //     },
  //     {
  //       title: "Changelog",
  //       url: "#",
  //     },
  //   ],
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings2,
  //   items: [
  //     {
  //       title: "General",
  //       url: "#",
  //     },
  //     {
  //       title: "Team",
  //       url: "#",
  //     },
  //     {
  //       title: "Billing",
  //       url: "#",
  //     },
  //     {
  //       title: "Limits",
  //       url: "#",
  //     },
  //   ],
  // },
];
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
