import type { Express } from "express";
import { createServer, type Server } from "http";
import { ARIO, mARIOToken } from '@ar.io/sdk';

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize AR.IO SDK for mainnet (default)
  const ario = ARIO.init();

  // Gateway endpoints
  app.get('/api/gateways', async (req, res) => {
    try {
      const { limit = 100, sortBy = 'operatorStake', sortOrder = 'desc' } = req.query;

      // Fetch gateways using AR.IO SDK
      const response = await ario.getGateways({
        limit: Number(limit),
        sortBy: sortBy as any,
        sortOrder: sortOrder === 'asc' ? 'asc' : 'desc'
      });

      // Transform gateway data according to SDK's gateway structure
      const transformedGateways = response.items.map(gateway => {
        // Get observer data if available
        const observer = gateway.observer ? {
          address: gateway.observer.walletAddress,
          observationChance: gateway.observer.observationChance || 0,
          performance: gateway.observer.performance || 0,
          currentReportStatus: gateway.observer.currentReportStatus || 'unknown',
          failedGateways: gateway.observer.failedGateways || []
        } : undefined;

        const stats = gateway.stats || {};
        const weights = gateway.weights || {};

        // Calculate performance using gateway performance ratio
        const performance = weights.gatewayPerformanceRatio ? weights.gatewayPerformanceRatio * 100 : 0;

        // Calculate delegate EAY using normalized composite weight
        const delegateEAY = weights.normalizedCompositeWeight ? weights.normalizedCompositeWeight * 100 : 0;

        // Convert mARIO to ARIO for stake values
        const operatorStake = Number(gateway.operatorStake) / 1e9;
        const totalDelegatedStake = Number(gateway.totalDelegatedStake) / 1e9;
        const totalStake = operatorStake + totalDelegatedStake;

        // Extract weights
        const gatewayWeights = {
          stakeWeight: weights.stakeWeight || 0,
          tenureWeight: weights.tenureWeight || 0,
          gatewayPerformanceRatio: weights.gatewayPerformanceRatio || 0,
          observerPerformanceRatio: weights.observerPerformanceRatio || 0,
          compositeWeight: weights.compositeWeight || 0,
          normalizedCompositeWeight: weights.normalizedCompositeWeight || 0
        };

        return {
          address: gateway.gatewayAddress,
          label: gateway.settings?.label,
          fqdn: gateway.settings?.fqdn,
          status: gateway.status || 'unknown',
          operatorStake: operatorStake,
          totalDelegatedStake: totalDelegatedStake,
          totalStake: totalStake,
          delegateStake: totalDelegatedStake, // For backward compatibility
          performance: performance,
          streak: stats.passedConsecutiveEpochs || 0,
          rewardShareRatio: Number(gateway.settings?.delegateRewardShareRatio || 0), // Remove multiplication
          delegateEAY: delegateEAY,
          observer: observer,
          weights: gatewayWeights,
          version: gateway.version
        };
      });

      res.json(transformedGateways);
    } catch (error) {
      console.error('Failed to fetch gateways:', error);
      res.status(500).json({ error: 'Failed to fetch gateway data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}