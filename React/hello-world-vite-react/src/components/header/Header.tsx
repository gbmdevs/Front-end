import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="h-16 border-b px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="font-bold text-xl">Financeiro</span>
      </div>
      
      <SearchBar />
      
      <div className="flex items-center gap-3">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;