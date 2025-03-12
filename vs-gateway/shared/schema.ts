import { z } from "zod";

// Gateway Data Types
export const GatewayStatus = z.enum(['online', 'offline', 'unknown', 'joining', 'leaving']);

export const WeightsSchema = z.object({
  stakeWeight: z.number(),
  tenureWeight: z.number(),
  gatewayPerformanceRatio: z.number(),
  observerPerformanceRatio: z.number(),
  compositeWeight: z.number(),
  normalizedCompositeWeight: z.number()
});

export const ObserverSchema = z.object({
  address: z.string(),
  observationChance: z.number(),
  performance: z.number(),
  currentReportStatus: z.string(),
  failedGateways: z.array(z.string())
});

export const GatewaySchema = z.object({
  address: z.string(),
  label: z.string().optional(),
  fqdn: z.string().optional(),
  status: z.string(),
  operatorStake: z.number(),
  totalDelegatedStake: z.number(),
  totalStake: z.number(),
  delegateStake: z.number(), // For backward compatibility
  performance: z.number(),
  streak: z.number(),
  rewardShareRatio: z.number(),
  delegateEAY: z.number(),
  observer: ObserverSchema.optional(),
  weights: WeightsSchema.optional(),
  version: z.string().optional()
});

export type Gateway = z.infer<typeof GatewaySchema>;
export type Observer = z.infer<typeof ObserverSchema>;
export type Weights = z.infer<typeof WeightsSchema>;