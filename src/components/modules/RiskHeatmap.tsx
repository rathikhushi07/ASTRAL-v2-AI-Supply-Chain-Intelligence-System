import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, AlertTriangle, Cloud, Warehouse, Truck, X } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { mockRiskZones } from '../../data/mockData';
import { RiskZone } from '../../types';

export const RiskHeatmap = () => {
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/20';
      case 'low': return 'text-emerald-400 bg-emerald-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Risk Heatmap</h1>
          <p className="text-gray-400">Real-time regional risk assessment</p>
        </div>
        <button
          onClick={handleRefresh}
          className={`px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all ${
            refreshing ? 'animate-pulse' : ''
          }`}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Risk Map */}
      <GlassCard>
        <div className="relative h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50" />
          
          {/* Risk Zones */}
          {mockRiskZones.map((zone, index) => (
            <motion.div
              key={zone.id}
              className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${getRiskColor(zone.risk)}`}
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 3) * 20}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.5 }}
              onClick={() => setSelectedZone(zone)}
            >
              <div className="relative">
                <MapPin className="w-6 h-6" />
                {zone.risk === 'high' && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>
            </motion.div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-white text-sm">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span className="text-white text-sm">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-white text-sm">Low Risk</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Risk Zones List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRiskZones.map((zone, index) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{zone.name}</h3>
                  <StatusBadge status={zone.risk} pulse={zone.risk === 'high'} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Risk Score</span>
                    <span className="text-white font-medium">{zone.riskScore}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">ETA Delay</span>
                    <span className="text-white font-medium">{zone.etaDelay}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Active Shipments</span>
                    <span className="text-white font-medium">{zone.activeShipments}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedZone(zone)}
                  className="w-full mt-3 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-sm transition-all"
                >
                  View Details
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Zone Details Modal */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedZone(null)}
          >
            <motion.div
              className="bg-slate-900/90 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{selectedZone.name}</h2>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Risk Level</span>
                  <StatusBadge status={selectedZone.risk} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedZone.riskScore}%</div>
                    <div className="text-sm text-gray-400">Risk Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedZone.etaDelay}h</div>
                    <div className="text-sm text-gray-400">ETA Delay</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Cloud className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">Weather Impact</div>
                      <div className="text-sm text-gray-400">{selectedZone.weatherImpact}% severity</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Warehouse className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-white font-medium">Warehouse Conditions</div>
                      <div className="text-sm text-gray-400">{selectedZone.warehouseConditions}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-white font-medium">Active Shipments</div>
                      <div className="text-sm text-gray-400">{selectedZone.activeShipments} in transit</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all">
                    Optimize Routes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};