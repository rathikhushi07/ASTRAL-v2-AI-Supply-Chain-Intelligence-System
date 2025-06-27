export interface RiskZone {
  id: string;
  name: string;
  risk: 'low' | 'medium' | 'high';
  riskScore: number;
  lat: number;
  lng: number;
  etaDelay: number;
  weatherImpact: number;
  warehouseConditions: string;
  activeShipments: number;
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  delayPrediction: number;
  confidence: number;
  reasons: string[];
  status: 'on-time' | 'delayed' | 'critical';
  estimatedDelivery: string;
  explainableAI?: {
    features: { name: string; importance: number; value: string }[];
    modelType: string;
    confidence: number;
    reasoning: string;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  demandPrediction: number;
  recommendedAction: 'restock' | 'reroute' | 'hold';
  alternateHubs: string[];
  shortage: number;
  historicalData?: { month: string; demand: number; stock: number }[];
  reorderThreshold?: number;
  seasonalFactor?: number;
}

export interface BlockchainNode {
  id: string;
  type: 'supplier' | 'warehouse' | 'distribution' | 'retail';
  name: string;
  timestamp: string;
  hash: string;
  verified: boolean;
  location: string;
}

export interface SustainabilityMetrics {
  score: number;
  carbonSavings: number;
  routeOptimization: number;
  greenPackaging: number;
  badge: 'bronze' | 'silver' | 'gold';
  trend: 'up' | 'down' | 'stable';
}

export interface NotificationItem {
  id: string;
  type: 'risk' | 'delay' | 'esg' | 'reroute' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  read: boolean;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export interface DeliveryRoute {
  id: string;
  type: 'drone' | 'van' | 'bike';
  origin: string;
  destination: string;
  status: 'active' | 'delayed' | 'completed';
  estimatedTime: number;
  actualTime?: number;
  route: { lat: number; lng: number }[];
  events?: string[];
}

export interface KPIMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  sparkline?: number[];
}

export interface SimulationEvent {
  id: string;
  type: 'port-strike' | 'flood' | 'demand-spike' | 'supplier-issue';
  name: string;
  impact: number;
  duration: number;
  affectedRegions: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
}

export interface RestockForecast {
  productId: string;
  productName: string;
  currentStock: number;
  predictedStockout: string;
  reorderPoint: number;
  seasonalFactor: number;
  historicalData: { date: string; stock: number; demand: number }[];
  festivals?: { name: string; date: string; expectedSurge: number }[];
}