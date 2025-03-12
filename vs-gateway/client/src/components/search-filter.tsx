import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onOrderChange: (value: 'asc' | 'desc') => void;
}

export function SearchFilter({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onOrderChange
}: SearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by label, domain or address..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex gap-2">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="totalStake">Total Stake</SelectItem>
            <SelectItem value="delegateStake">Delegate Stake</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="streak">Streak</SelectItem>
            <SelectItem value="delegateEAY">Delegate EAY</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={onOrderChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}