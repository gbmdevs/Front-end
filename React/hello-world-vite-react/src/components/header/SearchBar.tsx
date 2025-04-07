
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative mx-4 flex-1 max-w-md">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search expenses..."
        className="pl-8 bg-background h-9 md:w-[200px] lg:w-[300px]"
      />
    </div>
  );
};

export default SearchBar;