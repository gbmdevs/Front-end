import { ReactNode } from 'react';
import { 
    Sidebar,
    SidebarProvider,
  } from "@/components/ui/sidebar";
import SidebarContentArea from './sidebar/SidebarContent';
import Header from './header/Header';
import MainContent from './MainContent';  

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) =>{
    return(
        <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-svh w-full">
          <Sidebar collapsible="offcanvas"> 
             <SidebarContentArea /> 
          </Sidebar>      
          <div className="flex flex-col flex-1">
            <Header />
            <MainContent>{children}</MainContent>
          </div>
        </div>
      </SidebarProvider>
    );
}
export default Layout;