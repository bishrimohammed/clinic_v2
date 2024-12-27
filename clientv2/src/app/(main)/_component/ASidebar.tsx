"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  ChevronRight,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Inbox,
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavItem, PermissionName } from "@/types/global";
import { hasPermission } from "@/lib/hasPermission";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// This is sample data.
const data = {
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
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
  ];
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="py-2 flex items-center border-b shadow-sm border-[#3f3f4126] bg-violet-600 text-white justify-center  gap-2">
        <div className="grid flex-1 text-left text-lg leading-tight">
          <span className="truncate font-semibold">Healthcare Management</span>
          <span className="truncate text-sm">System</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={navMain} /> */}
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => {
              const hasAccess = item.permissions?.some((permission) =>
                hasPermission(permission)
              );
              if (hasAccess) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={false}
                    className="group/collapsible"
                    // data-state={item.isActive ? "open" : "closed"}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} className="">
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => {
                            if (hasPermission(subItem.permission)) {
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              } else {
                return null;
              }
            })}
          </SidebarMenu>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarGroupContent> */}

      {/* </SidebarGroupContent> */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
