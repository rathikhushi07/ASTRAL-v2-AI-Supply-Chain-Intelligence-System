import { RiskZone, Shipment, InventoryItem, BlockchainNode, SustainabilityMetrics, NotificationItem, DeliveryRoute, KPIMetric, SimulationEvent, Badge, RestockForecast } from '../types';

export const mockRiskZones: RiskZone[] = [
  {
    id: '1',
    name: 'Mumbai Port',
    risk: 'high',
    riskScore: 78,
    lat: 19.0760,
    lng: 72.8777,
    etaDelay: 24,
    weatherImpact: 85,
    warehouseConditions: 'Congested',
    activeShipments: 342
  },
  {
    id: '2',
    name: 'Delhi Hub',
    risk: 'medium',
    riskScore: 45,
    lat: 28.6139,
    lng: 77.2090,
    etaDelay: 8,
    weatherImpact: 25,
    warehouseConditions: 'Optimal',
    activeShipments: 189
  },
  {
    id: '3',
    name: 'Chennai Center',
    risk: 'low',
    riskScore: 23,
    lat: 13.0827,
    lng: 80.2707,
    etaDelay: 2,
    weatherImpact: 15,
    warehouseConditions: 'Excellent',
    activeShipments: 156
  },
  {
    id: '4',
    name: 'Kolkata Distribution',
    risk: 'medium',
    riskScore: 56,
    lat: 22.5726,
    lng: 88.3639,
    etaDelay: 12,
    weatherImpact: 40,
    warehouseConditions: 'Fair',
    activeShipments: 234
  },
  {
    id: '5',
    name: 'Bangalore Tech Hub',
    risk: 'low',
    riskScore: 31,
    lat: 12.9716,
    lng: 77.5946,
    etaDelay: 4,
    weatherImpact: 20,
    warehouseConditions: 'Good',
    activeShipments: 178
  }
];

export const mockShipments: Shipment[] = [
  {
    id: 'SH001',
    origin: 'Mumbai Port',
    destination: 'Delhi Hub',
    delayPrediction: 18,
    confidence: 87,
    reasons: ['Weather conditions', 'Traffic congestion', 'Port delays'],
    status: 'delayed',
    estimatedDelivery: '2025-01-16T14:30:00Z',
    explainableAI: {
      features: [
        { name: 'Weather Severity', importance: 35, value: 'High (85%)' },
        { name: 'Traffic Density', importance: 28, value: 'Congested' },
        { name: 'Port Efficiency', importance: 22, value: 'Below Average' },
        { name: 'Historical Delays', importance: 15, value: '12% above normal' }
      ],
      modelType: 'Random Forest Classifier',
      confidence: 87,
      reasoning: 'High weather severity and traffic congestion are the primary factors contributing to the predicted 18-hour delay. Historical data shows similar conditions result in delays 87% of the time.'
    }
  },
  {
    id: 'SH002',
    origin: 'Chennai Center',
    destination: 'Bangalore Tech Hub',
    delayPrediction: 2,
    confidence: 92,
    reasons: ['Optimal route', 'Good weather'],
    status: 'on-time',
    estimatedDelivery: '2025-01-15T10:15:00Z',
    explainableAI: {
      features: [
        { name: 'Route Efficiency', importance: 40, value: 'Optimal' },
        { name: 'Weather Conditions', importance: 30, value: 'Clear' },
        { name: 'Traffic Flow', importance: 20, value: 'Light' },
        { name: 'Vehicle Condition', importance: 10, value: 'Excellent' }
      ],
      modelType: 'Gradient Boosting',
      confidence: 92,
      reasoning: 'Optimal route conditions with clear weather and light traffic ensure minimal delay probability. Model confidence is high due to consistent historical performance on this route.'
    }
  },
  {
    id: 'SH003',
    origin: 'Delhi Hub',
    destination: 'Kolkata Distribution',
    delayPrediction: 36,
    confidence: 78,
    reasons: ['Severe weather', 'Infrastructure issues', 'Customs delay'],
    status: 'critical',
    estimatedDelivery: '2025-01-17T16:45:00Z',
    explainableAI: {
      features: [
        { name: 'Weather Impact', importance: 45, value: 'Severe Storm' },
        { name: 'Infrastructure Status', importance: 25, value: 'Road Closures' },
        { name: 'Customs Processing', importance: 20, value: 'Delayed' },
        { name: 'Alternative Routes', importance: 10, value: 'Limited' }
      ],
      modelType: 'Neural Network',
      confidence: 78,
      reasoning: 'Severe weather conditions combined with infrastructure issues create high delay probability. Limited alternative routes reduce mitigation options.'
    }
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'INV001',
    name: 'Electronics Components',
    currentStock: 1250,
    demandPrediction: 1800,
    recommendedAction: 'reroute',
    alternateHubs: ['Delhi Hub', 'Bangalore Tech Hub'],
    shortage: 550,
    historicalData: [
      { month: 'Oct', demand: 1200, stock: 1400 },
      { month: 'Nov', demand: 1350, stock: 1300 },
      { month: 'Dec', demand: 1600, stock: 1250 },
      { month: 'Jan', demand: 1800, stock: 1250 }
    ],
    reorderThreshold: 1000,
    seasonalFactor: 1.2
  },
  {
    id: 'INV002',
    name: 'Textile Products',
    currentStock: 3200,
    demandPrediction: 2800,
    recommendedAction: 'hold',
    alternateHubs: ['Mumbai Port'],
    shortage: 0,
    historicalData: [
      { month: 'Oct', demand: 2400, stock: 3000 },
      { month: 'Nov', demand: 2600, stock: 3100 },
      { month: 'Dec', demand: 2700, stock: 3200 },
      { month: 'Jan', demand: 2800, stock: 3200 }
    ],
    reorderThreshold: 2000,
    seasonalFactor: 0.9
  },
  {
    id: 'INV003',
    name: 'Pharmaceutical Supplies',
    currentStock: 890,
    demandPrediction: 1500,
    recommendedAction: 'restock',
    alternateHubs: ['Chennai Center', 'Kolkata Distribution'],
    shortage: 610,
    historicalData: [
      { month: 'Oct', demand: 1100, stock: 1200 },
      { month: 'Nov', demand: 1250, stock: 1000 },
      { month: 'Dec', demand: 1400, stock: 890 },
      { month: 'Jan', demand: 1500, stock: 890 }
    ],
    reorderThreshold: 800,
    seasonalFactor: 1.1
  }
];

export const mockDeliveryRoutes: DeliveryRoute[] = [
  {
    id: 'DR001',
    type: 'drone',
    origin: 'Mumbai Warehouse',
    destination: 'Andheri Store',
    status: 'active',
    estimatedTime: 25,
    route: [
      { lat: 19.0760, lng: 72.8777 },
      { lat: 19.1136, lng: 72.8697 },
      { lat: 19.1197, lng: 72.8464 }
    ],
    events: ['Clear weather', 'Light traffic']
  },
  {
    id: 'DR002',
    type: 'van',
    origin: 'Delhi Hub',
    destination: 'Gurgaon Center',
    status: 'delayed',
    estimatedTime: 45,
    actualTime: 62,
    route: [
      { lat: 28.6139, lng: 77.2090 },
      { lat: 28.4595, lng: 77.0266 }
    ],
    events: ['Heavy traffic', 'Road construction']
  },
  {
    id: 'DR003',
    type: 'bike',
    origin: 'Bangalore Hub',
    destination: 'Koramangala',
    status: 'completed',
    estimatedTime: 20,
    actualTime: 18,
    route: [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.9279, lng: 77.6271 }
    ],
    events: ['Optimal route']
  }
];

export const mockKPIs: KPIMetric[] = [
  {
    label: 'Delays Resolved Today',
    value: '12',
    change: '+3',
    trend: 'up',
    sparkline: [8, 10, 7, 12, 15, 12]
  },
  {
    label: 'Reroute Success Rate',
    value: '91%',
    change: '+5%',
    trend: 'up',
    sparkline: [85, 87, 89, 88, 91, 91]
  },
  {
    label: 'Carbon Score',
    value: '82/100',
    change: '+2',
    trend: 'up',
    sparkline: [78, 79, 80, 81, 82, 82]
  },
  {
    label: 'Active Shipments',
    value: '1,247',
    change: '+156',
    trend: 'up',
    sparkline: [1100, 1150, 1200, 1180, 1247, 1247]
  }
];

export const mockSimulationEvents: SimulationEvent[] = [
  {
    id: 'SE001',
    type: 'port-strike',
    name: 'Port Strike',
    impact: 75,
    duration: 48,
    affectedRegions: ['Mumbai Port', 'Chennai Center']
  },
  {
    id: 'SE002',
    type: 'flood',
    name: 'Monsoon Flood',
    impact: 60,
    duration: 72,
    affectedRegions: ['Kolkata Distribution']
  },
  {
    id: 'SE003',
    type: 'demand-spike',
    name: 'Festival Rush',
    impact: 40,
    duration: 120,
    affectedRegions: ['Delhi Hub', 'Bangalore Tech Hub']
  },
  {
    id: 'SE004',
    type: 'supplier-issue',
    name: 'Supplier Delay',
    impact: 55,
    duration: 24,
    affectedRegions: ['Mumbai Port']
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'B001',
    name: 'Zero Delay Hub',
    description: 'Achieved zero delays for 7 consecutive days',
    icon: '🎯',
    earned: true
  },
  {
    id: 'B002',
    name: 'Eco Leader',
    description: 'Maintained ESG score above 80 for a month',
    icon: '🌱',
    earned: true
  },
  {
    id: 'B003',
    name: 'Fastest Rerouter',
    description: 'Completed 100 successful reroutes',
    icon: '⚡',
    earned: false,
    progress: 78
  },
  {
    id: 'B004',
    name: 'Risk Master',
    description: 'Predicted and prevented 50 high-risk events',
    icon: '🛡️',
    earned: false,
    progress: 42
  }
];

export const mockRestockForecasts: RestockForecast[] = [
  {
    productId: 'RF001',
    productName: 'Hand Sanitizer',
    currentStock: 450,
    predictedStockout: '2025-01-22T00:00:00Z',
    reorderPoint: 300,
    seasonalFactor: 1.3,
    historicalData: [
      { date: '2024-12-01', stock: 800, demand: 120 },
      { date: '2024-12-15', stock: 650, demand: 150 },
      { date: '2025-01-01', stock: 500, demand: 180 },
      { date: '2025-01-15', stock: 450, demand: 200 }
    ],
    festivals: [
      { name: 'Republic Day', date: '2025-01-26', expectedSurge: 25 },
      { name: 'Holi', date: '2025-03-14', expectedSurge: 40 }
    ]
  },
  {
    productId: 'RF002',
    productName: 'Baby Products',
    currentStock: 1200,
    predictedStockout: '2025-02-05T00:00:00Z',
    reorderPoint: 800,
    seasonalFactor: 1.1,
    historicalData: [
      { date: '2024-12-01', stock: 1500, demand: 80 },
      { date: '2024-12-15', stock: 1350, demand: 90 },
      { date: '2025-01-01', stock: 1250, demand: 95 },
      { date: '2025-01-15', stock: 1200, demand: 100 }
    ],
    festivals: [
      { name: 'Valentine\'s Day', date: '2025-02-14', expectedSurge: 15 }
    ]
  }
];

export const mockBlockchainNodes: BlockchainNode[] = [
  {
    id: 'BC001',
    type: 'supplier',
    name: 'Tech Supplier Co.',
    timestamp: '2025-01-10T08:00:00Z',
    hash: '0x1a2b3c4d5e6f7890abcdef',
    verified: true,
    location: 'Shenzhen, China'
  },
  {
    id: 'BC002',
    type: 'warehouse',
    name: 'Mumbai Warehouse',
    timestamp: '2025-01-12T14:30:00Z',
    hash: '0x2b3c4d5e6f7890abcdef12',
    verified: true,
    location: 'Mumbai, India'
  },
  {
    id: 'BC003',
    type: 'distribution',
    name: 'Delhi Distribution',
    timestamp: '2025-01-14T09:15:00Z',
    hash: '0x3c4d5e6f7890abcdef1234',
    verified: true,
    location: 'Delhi, India'
  },
  {
    id: 'BC004',
    type: 'retail',
    name: 'Retail Store #247',
    timestamp: '2025-01-15T16:20:00Z',
    hash: '0x4d5e6f7890abcdef123456',
    verified: false,
    location: 'Bangalore, India'
  }
];

export const mockSustainabilityMetrics: SustainabilityMetrics = {
  score: 78,
  carbonSavings: 1247,
  routeOptimization: 85,
  greenPackaging: 92,
  badge: 'gold',
  trend: 'up'
};

export const mockNotifications: NotificationItem[] = [
  {
    id: 'NOT001',
    type: 'risk',
    title: 'High Risk Alert',
    message: 'Mumbai Port showing critical risk levels due to severe weather conditions.',
    timestamp: '2025-01-15T09:30:00Z',
    severity: 'high',
    read: false
  },
  {
    id: 'NOT002',
    type: 'delay',
    title: 'Shipment Delay Predicted',
    message: 'SH003 expected to be delayed by 36 hours due to infrastructure issues.',
    timestamp: '2025-01-15T08:45:00Z',
    severity: 'medium',
    read: false
  },
  {
    id: 'NOT003',
    type: 'esg',
    title: 'Sustainability Goal Achieved',
    message: 'Monthly carbon reduction target exceeded by 12%.',
    timestamp: '2025-01-15T07:20:00Z',
    severity: 'low',
    read: true
  },
  {
    id: 'NOT004',
    type: 'reroute',
    title: 'Inventory Reroute Recommended',
    message: 'Electronics components shortage detected. Rerouting from alternate hubs suggested.',
    timestamp: '2025-01-15T06:15:00Z',
    severity: 'medium',
    read: false
  }
];

export const mockAuditTrail = [
  {
    id: 'AUD001',
    action: 'Risk Assessment Update',
    user: 'AI System',
    timestamp: '2025-01-15T09:30:00Z',
    region: 'Mumbai Port',
    details: 'Risk level updated from medium to high due to weather conditions'
  },
  {
    id: 'AUD002',
    action: 'Inventory Reroute',
    user: 'John Doe',
    timestamp: '2025-01-15T08:15:00Z',
    region: 'Delhi Hub',
    details: 'Approved rerouting of electronics components to Bangalore Tech Hub'
  },
  {
    id: 'AUD003',
    action: 'Delay Prediction',
    user: 'AI System',
    timestamp: '2025-01-15T07:45:00Z',
    region: 'Kolkata Distribution',
    details: 'Predicted 36-hour delay for shipment SH003 with 78% confidence'
  }
];

export const mockMetrics = {
  ordersProcessed: 15847,
  riskReduction: 23,
  delaySavings: 156,
  sustainabilityScore: 78,
  activeAlerts: 12,
  routeOptimization: 89
};