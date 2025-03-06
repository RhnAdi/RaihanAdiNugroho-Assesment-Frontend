"use client"

import * as React from "react"
import {
  Command,
  LifeBuoy,
  PieChart,
  Send,
  SquareTerminal,
} from "lucide-react"

import { NavUser } from "@/components/moleculs/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"

const data = {
  navMain: [
    {
      title: "Banner Ads",
      icon: SquareTerminal,
      isActive: true,
      url: '/dashboard',
      items: [
        {
          title: "Packages",
          url: "/dashboard",
          isActive: true
        }
      ],
    }
  ],
  navSecondary: [
    {
      title: "Github",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Linkedin",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Banner Ads",
      url: "#",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<UserLoginResponse>()
  React.useEffect(() => {
    if(typeof window != undefined){
      const userStr = localStorage.getItem('user')
      if(userStr) {
        setUser(JSON.parse(userStr))
      }
    }
  }, [])
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="cursor-pointer">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">PT.Gracia Visi Pratama</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
