"use client";

import * as React from "react";
import {
  Bot,
  Calendar,
  ChevronRight,
  Home,
  Inbox,
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
import Link from "next/link";

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
        url: "/clinic-profile",
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
];
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
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
      <SidebarHeader className="py-4 flex items-center    justify-center  gap-2">
        <div className="grid flex-1 text-left text-base leading-tight">
          <span className="truncate font-semibold">
            BIMO Healthcare SYSTEM{" "}
          </span>
          {/* <span className="truncate text-sm">System</span> */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="text-2xl">
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
                                      <Link href={subItem.url}>
                                        <span>{subItem.title}</span>
                                      </Link>
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

            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
