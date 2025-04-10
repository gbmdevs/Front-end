
import { ReactNode } from 'react';
import { 
  SidebarContent as SidebarContentComponent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader as SidebarHeaderComponent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { Home, CreditCard, PieChart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-5">
      <div className="flex items-center gap-2 font-semibold text-xl">
        <CreditCard className="h-6 w-6" />
        <span className="font-bold">Planilha Pessoal</span>
      </div>
    </div>
  );
};

const SidebarContentArea = () => {
  const { state } = useSidebar();

  const version = "1.0.0";
  
  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' }/*,
    { name: 'Expenses', icon: CreditCard, path: '/expenses' },
    { name: 'Analytics', icon: PieChart, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' }*/
  ];
  
  return (
    <>
      <SidebarHeaderComponent>
        <SidebarHeader />
      </SidebarHeaderComponent>
      <SidebarContentComponent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.name} 
                    isActive={window.location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContentComponent>
      <SidebarFooter className="group-data-[state=collapsed]:hidden">
        <div className="p-4 text-xs text-sidebar-foreground/50">
          © 2025 Versão {version}
        </div>
      </SidebarFooter>
    </>
  );
};

export default SidebarContentArea;