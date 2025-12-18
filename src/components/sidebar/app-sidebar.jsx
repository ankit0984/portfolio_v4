"use client"

import * as React from "react"
import {
  IconDashboard,
  IconInnerShadowTop,
} from "@tabler/icons-react"
import {
  Home,
  User,
  Code2,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  Trophy,
  Wrench,
  PenLine,
  Mail,
} from "lucide-react"
import { NavUser } from "@/components/ui/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {NavProject} from "@/components/sidebar/nav-project";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navProject:[
    {
      title: "Dashboard",
      url: "/admin/",
      icon: IconDashboard,
    },
    {
      title: "Hero Section",
      url: "#",
      icon: Home,
      isActive: false,
      items: [
        {
          title: "get data",
          url: "#",
        },
        {
          title: "post data",
          url: "#",
        },
        {
          title: "update data",
          url: "#",
        },
      ],
    },
    {
      title: "About Section",
      url: "#",
      icon: User,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
      ],
    },
    {
      title: "Skill Section",
      url: "#",
      icon: Code2,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
        {
          title: "Delete Method",
          url: "#",
        },
      ],
    },
    {
      title: "Experience Section",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
        {
          title: "Delete Method",
          url: "#",
        },
      ],
    },
    {
      title: "Education Section",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
        {
          title: "Delete Method",
          url: "#",
        },
      ],
    },
    {
      title: "Project Section",
      url: "#",
      icon: FolderKanban,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
        {
          title: "Delete Method",
          url: "#",
        },
      ],
    },
    {
      title: "Certification Section",
      url: "#",
      icon: Award,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
        {
          title: "Delete Method",
          url: "#",
        },
      ],
    },
    {
      title: "Achievement Section",
      url: "#",
      icon: Trophy,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
        {
          title: "Delete Method",
          url: "#",
        },
      ],
    },
    {
      title: "Service Section",
      url: "#",
      icon: Wrench,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
        {
          title: "Delete Method",
          url: "#",
        },
      ],
    },
    {
      title: "Blog Section",
      url: "#",
      icon: PenLine,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        },
        {
          title: "Delete Method",
          url: "#",
        },
      ],
    },
    {
      title: "Contact Section",
      url: "#",
      icon: Mail,
      items: [
        {
          title: "Get Method",
          url: "#",
        },
        {
          title: "Post Method",
          url: "#",
        },
        {
          title: "Update Method",
          url: "#",
        }
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProject items={data.navProject} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
