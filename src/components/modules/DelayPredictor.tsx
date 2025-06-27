import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, AlertCircle, CheckCircle, Brain } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { ShimmerLoader } from '../ui/ShimmerLoader';
import { mockShipments } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const confidenceData = [
  { name: 'High Confidence', value: 87, color: '#10B981' },
  { name: 'Medium Confidence', value: 78, color: '#F59E0B' },
  { name: 'Low Confidence', value: 45, color: '#EF4444' },
];

const predictionTrends = [
  { time: '6h ago', accuracy: 85 },
  { time: '4h ago', accuracy: 88 },
  { time: '2h ago', accuracy: 92 },
  { time: 'Now', accuracy: 89 },
];

export const DelayPredictor = () => {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState(mockShipments);

  const handleRefreshPredictions = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setPredictions(prev => prev.map(shipment => ({
        ...shipment,
        confidence: Math.max(70, Math.min(95, shipment.confidence + (Math.random() - 0.5) * 5))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Delay Predictor</h1>
          <p className="text-gray-400">Machine learning-powered delay forecasting</p>
        </div>
        <button
          onClick={handleRefreshPredictions}
          className={`px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all ${
            loading ? 'animate-pulse' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Refresh Predictions'}
        </button>
      </div>

      {/* Prediction Cards */}
      <div className="space-y-4">
        {loading ? (
          // Shimmer loading state
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-cyan-500/20 via-cyan-300/40 to-cyan-500/20 rounded w-3/4 animate-shimmer"></div>
                <div className="h-4 bg-gradient-to-r from-cyan-500/20 via-cyan-300/40 to-cyan-500/20 rounded w-1/2 animate-shimmer"></div>
                <div className="h-4 bg-gradient-to-r from-cyan-500/20 via-cyan-300/40 to-cyan-500/20 rounded w-2/3 animate-shimmer"></div>
              </div>
            </div>
          ))
        ) : (
          predictions.map((shipment, index) => (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hover>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      shipment.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                      shipment.status === 'delayed' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {shipment.status === 'critical' ? <AlertCircle size={24} /> :
                       shipment.status === 'delayed' ? <Clock size={24} /> :
                       <CheckCircle size={24} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{shipment.id}</h3>
                      <p className="text-gray-400 text-sm">{shipment.origin} → {shipment.destination}</p>
                    </div>
                  </div>
                  <StatusBadge status={shipment.status} pulse={shipment.status === 'critical'} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{shipment.delayPrediction}h</div>
                    <div className="text-sm text-gray-400">Predicted Delay</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{Math.round(shipment.confidence)}%</div>
                    <div className="text-sm text-gray-400">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-400">Est. Delivery</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Contributing Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {shipment.reasons.map((reason, reasonIndex) => (
                      <span
                        key={reasonIndex}
                        className="px-2 py-1 bg-white/10 text-gray-300 rounded-md text-xs"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-400">AI Prediction</span>
                  </div>
                  <button className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-md text-sm transition-all">
                    View Details
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Levels */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Prediction Confidence</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Bar dataKey="value" fill="#00D4FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Accuracy Trends */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Prediction Accuracy</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={predictionTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Model Performance */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Model Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Overall Accuracy', value: '89.2%', trend: '+2.1%' },
            { label: 'Precision', value: '91.7%', trend: '+1.5%' },
            { label: 'Recall', value: '87.3%', trend: '+0.8%' },
            { label: 'F1 Score', value: '89.4%', trend: '+1.2%' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
              <div className="text-xs text-emerald-400 flex items-center justify-center">
                <TrendingUp size={12} className="mr-1" />
                {metric.trend}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};