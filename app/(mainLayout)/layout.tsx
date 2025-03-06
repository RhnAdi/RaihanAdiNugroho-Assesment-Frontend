import { AppSidebar } from '@/components/moleculs/app-sidebar';
import { SiteHeader } from '@/components/moleculs/site-header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import React, { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => (
  <div className="[--header-height:calc(--spacing(14))]">
    <SidebarProvider className="flex flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            { children }
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
);

export default MainLayout;
