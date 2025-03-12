import { Badge } from "@/components/ui/badge";
import { GatewayStatus as Status } from "@shared/schema";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Circle } from "lucide-react";

interface GatewayStatusProps {
  status: string;
}

const statusConfig: Record<string, { color: string; text: string; description: string }> = {
  online: { color: "bg-green-500", text: "Online", description: "Gateway is operational" },
  offline: { color: "bg-red-500", text: "Offline", description: "Gateway is not responding" },
  unknown: { color: "bg-gray-500", text: "Unknown", description: "Gateway status cannot be determined" },
  joining: { color: "bg-blue-500", text: "Joining", description: "Gateway is joining the network" },
  leaving: { color: "bg-orange-500", text: "Leaving", description: "Gateway is leaving the network" }
};

export function GatewayStatus({ status }: GatewayStatusProps) {
  // Default to unknown if status is not in config
  const config = statusConfig[status.toLowerCase()] || statusConfig.unknown;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" className="flex items-center gap-2">
          <Circle className={`h-2 w-2 ${config.color}`} />
          {config.text}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{config.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}