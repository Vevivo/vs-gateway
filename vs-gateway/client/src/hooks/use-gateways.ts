import { useQuery } from "@tanstack/react-query";
import { Gateway } from "@shared/schema";

interface UseGatewaysOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  limit?: number;
}

export function useGateways(options: UseGatewaysOptions = {}) {
  const { sortBy = 'operatorStake', sortOrder = 'desc', search = '', limit = 100 } = options;

  return useQuery({
    queryKey: ['gateways', sortBy, sortOrder, search, limit],
    queryFn: async () => {
      try {
        // Create URL with query parameters
        const params = new URLSearchParams({
          limit: String(limit),
          sortBy,
          sortOrder
        });

        const response = await fetch(`/api/gateways?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch gateway data');
        }

        let gateways = await response.json() as Gateway[];

        // Client-side search filtering
        if (search) {
          gateways = gateways.filter(gateway => 
            gateway.address.toLowerCase().includes(search.toLowerCase()) ||
            gateway.fqdn?.toLowerCase().includes(search.toLowerCase())
          );
        }

        return gateways;
      } catch (error) {
        console.error('Failed to fetch gateways:', error);
        throw new Error('Failed to fetch gateway data');
      }
    },
    staleTime: 30000, // Consider data stale after 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
}