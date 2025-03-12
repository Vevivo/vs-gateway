import { useState } from "react";
import { useGateways } from "@/hooks/use-gateways";
import { Gateway } from "@shared/schema";
import { SearchableGatewaySelect } from "@/components/searchable-gateway-select";
import { GatewayComparisonCard } from "@/components/gateway-comparison-card";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [firstGateway, setFirstGateway] = useState<Gateway | undefined>();
  const [secondGateway, setSecondGateway] = useState<Gateway | undefined>();
  const { toast } = useToast();

  const { 
    data: gateways = [], 
    isLoading,
    isError,
    refetch
  } = useGateways();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          Failed to load gateway data. Please try refreshing.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Gateway Comparison</h1>
        <p className="text-muted-foreground mb-4">
          Select two gateways to compare their performance, stake, and other metrics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <SearchableGatewaySelect
              gateways={gateways}
              selectedGateway={firstGateway}
              onSelect={setFirstGateway}
              placeholder="Select first gateway..."
            />
          </div>
          {firstGateway && (
            <GatewayComparisonCard 
              gateway={firstGateway} 
              comparedGateway={secondGateway}
            />
          )}
        </div>

        <div>
          <div className="mb-6">
            <SearchableGatewaySelect
              gateways={gateways}
              selectedGateway={secondGateway}
              onSelect={setSecondGateway}
              placeholder="Select second gateway..."
            />
          </div>
          {secondGateway && (
            <GatewayComparisonCard 
              gateway={secondGateway} 
              comparedGateway={firstGateway}
            />
          )}
        </div>
      </div>
    </div>
  );
}