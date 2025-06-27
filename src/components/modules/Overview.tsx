import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Shield, Truck, Leaf } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { mockMetrics } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { name: 'Jan', orders: 12000, delays: 240, sustainability: 72 },
  { name: 'Feb', orders: 13500, delays: 180, sustainability: 75 },
  { name: 'Mar', orders: 14200, delays: 150, sustainability: 78 },
  { name: 'Apr', orders: 15847, delays: 120, sustainability: 78 },
];

const riskDistribution = [
  { name: 'Low Risk', value: 60, color: '#10B981' },
  { name: 'Medium Risk', value: 30, color: '#F59E0B' },
  { name: 'High Risk', value: 10, color: '#EF4444' },
];

export const Overview = () => {
  const metrics = [
    {
      title: 'Orders Processed',
      value: mockMetrics.ordersProcessed.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Activity,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Risk Reduction',
      value: `${mockMetrics.riskReduction}%`,
      change: '+5%',
      trend: 'up',
      icon: Shield,
      color: 'from-emerald-500 to-green-600'
    },
    {
      title: 'Delay Savings',
      value: `${mockMetrics.delaySavings}h`,
      change: '-8%',
      trend: 'down',
      icon: Truck,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'ESG Score',
      value: mockMetrics.sustainabilityScore,
      change: '+3%',
      trend: 'up',
      icon: Leaf,
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Supply Chain Command Center</h1>
        <p className="text-gray-400">Real-time insights powered by AI</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <GlassCard key={metric.title} hover>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="ml-1">{metric.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-gray-400 text-sm">{metric.title}</p>
              </motion.div>
            </GlassCard>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#00D4FF" 
                strokeWidth={2}
                dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="delays" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Risk Distribution */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Live Activity Feed */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Live Activity Feed</h3>
        <div className="space-y-3">
          {[
            { time: '09:34', action: 'Risk level updated', location: 'Mumbai Port', status: 'high' },
            { time: '09:28', action: 'Shipment rerouted', location: 'Delhi Hub', status: 'medium' },
            { time: '09:22', action: 'ESG target achieved', location: 'Chennai Center', status: 'low' },
            { time: '09:15', action: 'Inventory optimized', location: 'Bangalore Hub', status: 'low' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'high' ? 'bg-red-500' :
                  activity.status === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <div>
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.location}</p>
                </div>
              </div>
              <span className="text-gray-400 text-xs">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};