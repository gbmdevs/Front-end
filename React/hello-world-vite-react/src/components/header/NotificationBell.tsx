
import { Bell } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const NotificationBell = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full p-2 hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2 border-b">
          <p className="font-semibold">Notifications</p>
          <p className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">Mark all as read</p>
        </div>
        <div className="py-2">
          <p className="text-center text-sm text-muted-foreground py-4">No new notifications</p>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2 text-center">
          <p className="text-xs text-primary cursor-pointer">View all notifications</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;