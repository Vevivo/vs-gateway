import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gateway } from "@shared/schema";
import { GatewayStatus } from "../gateway-status";
import { Card } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface DataTableProps {
  data: Gateway[];
  isLoading: boolean;
}

export function DataTable({ data, isLoading }: DataTableProps) {
  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          No gateways found
        </div>
      </Card>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Total Stake (ARIO)</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Streak</TableHead>
              <TableHead className="text-right">Delegate Stake</TableHead>
              <TableHead className="text-right">Reward Share Ratio</TableHead>
              <TableHead className="text-right">Delegate EAY</TableHead>
              <TableHead>Observation Chance</TableHead>
              <TableHead>Observer Performance</TableHead>
              <TableHead>Stake Weight</TableHead>
              <TableHead>Tenure Weight</TableHead>
              <TableHead>Gateway Perf. Ratio</TableHead>
              <TableHead>Observer Perf. Ratio</TableHead>
              <TableHead>Composite Weight</TableHead>
              <TableHead>Normalized Weight</TableHead>
              <TableHead>Version</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((gateway) => (
              <TableRow key={gateway.address}>
                <TableCell>{gateway.label || '-'}</TableCell>
                <TableCell>{gateway.fqdn || '-'}</TableCell>
                <TableCell className="font-mono max-w-[150px] truncate">
                  <Tooltip>
                    <TooltipTrigger className="cursor-help">
                      {gateway.address}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-mono">{gateway.address}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-right">{formatNumber(gateway.totalStake)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{formatNumber(gateway.performance)}%</span>
                  </div>
                </TableCell>
                <TableCell>{gateway.streak}</TableCell>
                <TableCell className="text-right">{formatNumber(gateway.delegateStake)}</TableCell>
                <TableCell className="text-right">{formatNumber(gateway.rewardShareRatio)}%</TableCell>
                <TableCell className="text-right">{formatNumber(gateway.delegateEAY)}%</TableCell>
                <TableCell>
                  {gateway.observer ? `${formatNumber(gateway.observer.observationChance)}%` : '-'}
                </TableCell>
                <TableCell>
                  {gateway.observer ? `${formatNumber(gateway.observer.performance)}%` : '-'}
                </TableCell>
                <TableCell>{gateway.weights ? formatNumber(gateway.weights.stakeWeight) : '-'}</TableCell>
                <TableCell>{gateway.weights ? formatNumber(gateway.weights.tenureWeight) : '-'}</TableCell>
                <TableCell>{gateway.weights ? `${formatNumber(gateway.weights.gatewayPerformanceRatio * 100)}%` : '-'}</TableCell>
                <TableCell>{gateway.weights ? `${formatNumber(gateway.weights.observerPerformanceRatio * 100)}%` : '-'}</TableCell>
                <TableCell>{gateway.weights ? formatNumber(gateway.weights.compositeWeight) : '-'}</TableCell>
                <TableCell>{gateway.weights ? formatNumber(gateway.weights.normalizedCompositeWeight * 100) : '-'}</TableCell>
                <TableCell>{gateway.version || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}