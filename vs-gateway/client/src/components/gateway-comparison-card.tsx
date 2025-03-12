import { Gateway } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ComparisonIndicatorProps {
  value: number;
  otherValue: number;
  unit?: string;
  format?: 'ario' | 'percent' | 'normalized' | 'default';
}

function ComparisonIndicator({ value, otherValue, unit = "", format = 'default' }: ComparisonIndicatorProps) {
  const formatNumber = (num: number) => {
    if (format === 'ario') {
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1
      }).format(num);
    }
    if (format === 'normalized') {
      return num.toFixed(3);
    }
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(num);
  };

  const isHigher = value > otherValue;
  const isEqual = value === otherValue;

  return (
    <span className={`inline-flex items-center ${isEqual ? 'text-foreground' : isHigher ? 'text-green-500' : 'text-red-500'} font-medium`}>
      {!isEqual && (
        isHigher ? (
          <ArrowUp className="w-5 h-5 animate-bounce" />
        ) : (
          <ArrowDown className="w-5 h-5 animate-bounce" />
        )
      )}
      <span className={isEqual ? "" : "ml-2"}>
        {formatNumber(value)}{unit}
      </span>
    </span>
  );
}

interface GatewayComparisonCardProps {
  gateway: Gateway;
  comparedGateway?: Gateway;
}

export function GatewayComparisonCard({ gateway, comparedGateway }: GatewayComparisonCardProps) {
  return (
    <Card className="p-6 bg-card text-card-foreground border-2 border-border rounded-lg shadow-lg">
      <div className="space-y-6">
        <div className="border-b border-border pb-4">
          <h3 className="text-xl font-semibold mb-2 text-foreground">{gateway.label || gateway.fqdn || 'Unnamed Gateway'}</h3>
          <p className="text-sm text-muted-foreground font-mono">{gateway.address}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3 border-b border-border pb-2 text-foreground">Stake Information</h4>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Operator Stake</span>
                <ComparisonIndicator 
                  value={gateway.operatorStake} 
                  otherValue={comparedGateway?.operatorStake || 0}
                  unit=" ARIO"
                  format="ario"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Delegated Stake</span>
                <ComparisonIndicator 
                  value={gateway.totalDelegatedStake} 
                  otherValue={comparedGateway?.totalDelegatedStake || 0}
                  unit=" ARIO"
                  format="ario"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Stake</span>
                <ComparisonIndicator 
                  value={gateway.totalStake} 
                  otherValue={comparedGateway?.totalStake || 0}
                  unit=" ARIO"
                  format="ario"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Reward Share Ratio</span>
                <ComparisonIndicator 
                  value={gateway.rewardShareRatio} 
                  otherValue={comparedGateway?.rewardShareRatio || 0}
                  unit="%"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Delegate EAY</span>
                <ComparisonIndicator 
                  value={gateway.delegateEAY} 
                  otherValue={comparedGateway?.delegateEAY || 0}
                  unit="%"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 border-b border-border pb-2 text-foreground">Performance Metrics</h4>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Performance</span>
                <ComparisonIndicator 
                  value={gateway.performance} 
                  otherValue={comparedGateway?.performance || 0}
                  unit="%"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Gateway Perf. Ratio</span>
                <ComparisonIndicator 
                  value={(gateway.weights?.gatewayPerformanceRatio || 0) * 100} 
                  otherValue={(comparedGateway?.weights?.gatewayPerformanceRatio || 0) * 100}
                  unit="%"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Observer Perf. Ratio</span>
                <ComparisonIndicator 
                  value={(gateway.weights?.observerPerformanceRatio || 0) * 100} 
                  otherValue={(comparedGateway?.weights?.observerPerformanceRatio || 0) * 100}
                  unit="%"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tenure Weight</span>
                <ComparisonIndicator 
                  value={gateway.weights?.tenureWeight || 0} 
                  otherValue={comparedGateway?.weights?.tenureWeight || 0}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Streak</span>
                <ComparisonIndicator 
                  value={gateway.streak} 
                  otherValue={comparedGateway?.streak || 0}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 border-b border-border pb-2 text-foreground">Observer Metrics</h4>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Observation Chance</span>
                <ComparisonIndicator 
                  value={gateway.observer?.observationChance || 0} 
                  otherValue={comparedGateway?.observer?.observationChance || 0}
                  unit="%"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Observer Performance</span>
                <ComparisonIndicator 
                  value={gateway.observer?.performance || 0} 
                  otherValue={comparedGateway?.observer?.performance || 0}
                  unit="%"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 border-b border-border pb-2 text-foreground">Additional Weights</h4>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Stake Weight</span>
                <ComparisonIndicator 
                  value={gateway.weights?.stakeWeight || 0} 
                  otherValue={comparedGateway?.weights?.stakeWeight || 0}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Composite Weight</span>
                <ComparisonIndicator 
                  value={gateway.weights?.compositeWeight || 0} 
                  otherValue={comparedGateway?.weights?.compositeWeight || 0}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Normalized Weight</span>
                <ComparisonIndicator 
                  value={gateway.weights?.normalizedCompositeWeight || 0}
                  otherValue={comparedGateway?.weights?.normalizedCompositeWeight || 0}
                  unit="normalized"
                  format="normalized"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-foreground">Software</h4>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="text-foreground">{gateway.version || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}