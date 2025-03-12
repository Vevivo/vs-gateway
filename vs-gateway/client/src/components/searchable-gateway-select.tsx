import { useState, useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Gateway } from "@shared/schema";

interface SearchableGatewaySelectProps {
  gateways: Gateway[];
  selectedGateway?: Gateway;
  onSelect: (gateway: Gateway) => void;
  placeholder?: string;
}

export function SearchableGatewaySelect({ 
  gateways, 
  selectedGateway, 
  onSelect,
  placeholder = "Select gateway..."
}: SearchableGatewaySelectProps) {
  const [open, setOpen] = useState(false);

  const getGatewayLabel = useCallback((gateway: Gateway) => {
    return gateway.label || gateway.fqdn || gateway.address;
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedGateway ? getGatewayLabel(selectedGateway) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search gateway..." />
          <CommandEmpty>No gateway found.</CommandEmpty>
          <CommandGroup>
            {gateways.map((gateway) => (
              <CommandItem
                key={gateway.address}
                value={getGatewayLabel(gateway)}
                onSelect={() => {
                  onSelect(gateway);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedGateway?.address === gateway.address ? "opacity-100" : "opacity-0"
                  )}
                />
                {getGatewayLabel(gateway)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
