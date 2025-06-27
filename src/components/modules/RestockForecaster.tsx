import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Calendar, Filter, AlertTriangle, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { KPICard } from '../ui/KPICard';
import { mockRestockForecasts, mockKPIs } from '../../data/mockData';
import { RestockForecast } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const RestockForecaster = () => {
  const [selectedProduct, setSelectedProduct] = useState<RestockForecast>(mockRestockForecasts[0]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFestivals, setShowFestivals] = useState(true);

  const categories = ['all', 'sanitizer', 'baby-products', 'electronics', 'textiles'];

  const getStockStatus = (forecast: RestockForecast) => {
    const daysToStockout = Math.ceil((new Date(forecast.predictedStockout).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysToStockout <= 7) return 'critical';
    if (daysToStockout <= 14) return 'medium';
    return 'low';
  };

  const calculateReorderThreshold = (forecast: RestockForecast) => {
    const avgDemand = forecast.historicalData.reduce((sum, data) => sum + data.demand, 0) / forecast.historicalData.length;
    const leadTime = 7; // days
    const safetyStock = avgDemand * 0.2; // 20% safety stock
    return Math.ceil((avgDemand * leadTime) + safetyStock);
  };

  const demandTrendData = selectedProduct.historicalData.map(data => ({
    ...data,
    date: new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const festivalImpactData = selectedProduct.festivals?.map(festival => ({
    name: festival.name,
    surge: festival.expectedSurge,
    date: new Date(festival.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Restock Forecaster</h1>
          <p className="text-gray-400">AI-powered inventory prediction and optimization</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-slate-800">
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowFestivals(!showFestivals)}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
              showFestivals ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-white/10 text-gray-300'
            }`}
          >
            <Sparkles size={16} />
            <span>Festival Impact</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={kpi.label} metric={kpi} index={index} />
        ))}
      </div>

      {/* Product Forecasts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRestockForecasts.map((forecast, index) => (
          <motion.div
            key={forecast.productId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              hover 
              className={`cursor-pointer ${selectedProduct.productId === forecast.productId ? 'border-cyan-500/50 bg-cyan-500/10' : ''}`}
              onClick={() => setSelectedProduct(forecast)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{forecast.productName}</h3>
                      <p className="text-gray-400 text-sm">{forecast.productId}</p>
                    </div>
                  </div>
                  <StatusBadge 
                    status={getStockStatus(forecast)} 
                    pulse={getStockStatus(forecast) === 'critical'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-lg font-bold text-white">{forecast.currentStock.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Current Stock</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {Math.ceil((new Date(forecast.predictedStockout).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                    <div className="text-xs text-gray-400">Until Stockout</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Reorder Threshold</span>
                    <span className="text-cyan-400 font-bold">{calculateReorderThreshold(forecast)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        forecast.currentStock <= calculateReorderThreshold(forecast) ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (forecast.currentStock / calculateReorderThreshold(forecast)) * 100)}%` }}
                    />
                  </div>
                </div>

                {forecast.currentStock <= calculateReorderThreshold(forecast) && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm font-medium">Reorder Required</span>
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
        {/* Historical Demand Trends */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">
            Historical Trends: {selectedProduct.productName}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Line 
                type="monotone" 
                dataKey="demand" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="Demand"
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="stock" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Stock"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Festival Impact Analysis */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Festival Impact Forecast</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm">Seasonal Surge</span>
            </div>
          </div>
          
          {showFestivals && festivalImpactData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={festivalImpactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Bar dataKey="surge" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No festival data available for this product</p>
              </div>
            </div>
          )}

          {showFestivals && selectedProduct.festivals && (
            <div className="mt-4 space-y-2">
              {selectedProduct.festivals.map((festival, index) => (
                <motion.div
                  key={festival.name}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div>
                    <div className="text-white font-medium">{festival.name}</div>
                    <div className="text-gray-400 text-sm">
                      {new Date(festival.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-400 font-bold">+{festival.expectedSurge}%</div>
                    <div className="text-gray-400 text-xs">Expected Surge</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Smart Recommendations */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Immediate Action Required',
              items: mockRestockForecasts.filter(f => getStockStatus(f) === 'critical'),
              color: 'red',
              icon: AlertTriangle
            },
            {
              title: 'Plan Reorder Soon',
              items: mockRestockForecasts.filter(f => getStockStatus(f) === 'medium'),
              color: 'amber',
              icon: Calendar
            },
            {
              title: 'Stock Levels Healthy',
              items: mockRestockForecasts.filter(f => getStockStatus(f) === 'low'),
              color: 'emerald',
              icon: TrendingUp
            }
          ].map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                className={`bg-${category.color}-500/10 border border-${category.color}-500/30 rounded-lg p-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Icon className={`w-5 h-5 text-${category.color}-400`} />
                  <h4 className={`text-${category.color}-300 font-medium`}>{category.title}</h4>
                </div>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div key={item.productId} className="text-sm">
                      <div className="text-white">{item.productName}</div>
                      <div className="text-gray-400">{item.currentStock} units remaining</div>
                    </div>
                  ))}
                  {category.items.length === 0 && (
                    <div className="text-gray-400 text-sm">No items in this category</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};