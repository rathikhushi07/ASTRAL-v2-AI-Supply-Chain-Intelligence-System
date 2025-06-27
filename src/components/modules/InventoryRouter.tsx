import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingDown, TrendingUp, ArrowRight, Brain, RefreshCw } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { mockInventory } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const demandSupplyData = mockInventory.map(item => ({
  name: item.name.split(' ')[0],
  demand: item.demandPrediction,
  supply: item.currentStock,
  shortage: item.shortage
}));

export const InventoryRouter = () => {
  const [selectedItem, setSelectedItem] = useState(mockInventory[0]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsOptimizing(false);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'restock': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'reroute': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'hold': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Inventory Router</h1>
          <p className="text-gray-400">AI-powered inventory optimization and rerouting</p>
        </div>
        <button
          onClick={handleOptimize}
          className={`px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all flex items-center space-x-2 ${
            isOptimizing ? 'animate-pulse' : ''
          }`}
          disabled={isOptimizing}
        >
          <RefreshCw size={16} className={isOptimizing ? 'animate-spin' : ''} />
          <span>{isOptimizing ? 'Optimizing...' : 'Optimize Routes'}</span>
        </button>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockInventory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              hover 
              className={`cursor-pointer ${selectedItem.id === item.id ? 'border-cyan-500/50 bg-cyan-500/10' : ''}`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getActionColor(item.recommendedAction)}`}>
                    {item.recommendedAction}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-lg font-bold text-white">{item.currentStock.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Current Stock</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{item.demandPrediction.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Predicted Demand</div>
                  </div>
                </div>

                {item.shortage > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm font-medium">
                        Shortage: {item.shortage.toLocaleString()} units
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selected Item Details */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Detailed Analysis: {selectedItem.name}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-400">Current Stock</span>
                </div>
                <div className="text-2xl font-bold text-white">{selectedItem.currentStock.toLocaleString()}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-gray-400">Demand Forecast</span>
                </div>
                <div className="text-2xl font-bold text-white">{selectedItem.demandPrediction.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Recommended Action</h4>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getActionColor(selectedItem.recommendedAction)}`}>
                  {selectedItem.recommendedAction.charAt(0).toUpperCase() + selectedItem.recommendedAction.slice(1)}
                </span>
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-400">AI Recommendation</span>
              </div>
            </div>

            {selectedItem.alternateHubs.length > 0 && (
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Alternate Hubs</h4>
                <div className="space-y-2">
                  {selectedItem.alternateHubs.map((hub, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300">{hub}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-400 text-sm">Available</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all">
              Execute Rerouting
            </button>
          </div>
        </GlassCard>

        {/* Demand vs Supply Chart */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Demand vs Supply Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demandSupplyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Bar dataKey="supply" fill="#10B981" name="Current Supply" />
              <Bar dataKey="demand" fill="#F59E0B" name="Predicted Demand" />
              <Bar dataKey="shortage" fill="#EF4444" name="Shortage" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Optimization Results */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Optimization Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Cost Savings', value: '$127K', change: '+15%', color: 'text-emerald-400' },
            { label: 'Efficiency Gained', value: '23%', change: '+8%', color: 'text-cyan-400' },
            { label: 'Stock Turnover', value: '4.2x', change: '+12%', color: 'text-amber-400' },
            { label: 'Fulfilled Orders', value: '98.5%', change: '+3%', color: 'text-purple-400' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
              <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
              <div className="text-xs text-emerald-400 flex items-center justify-center">
                <TrendingUp size={12} className="mr-1" />
                {metric.change}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};