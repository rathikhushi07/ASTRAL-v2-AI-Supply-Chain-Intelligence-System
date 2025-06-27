import { motion } from 'framer-motion';
import { Leaf, Award, TrendingUp, Download, Recycle, Zap, Droplets } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { mockSustainabilityMetrics } from '../../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const carbonData = [
  { name: 'Transportation', value: 45, color: '#EF4444' },
  { name: 'Packaging', value: 25, color: '#F59E0B' },
  { name: 'Warehousing', value: 20, color: '#10B981' },
  { name: 'Processing', value: 10, color: '#3B82F6' },
];

const monthlyTrends = [
  { month: 'Jan', carbon: 1456, renewable: 65, efficiency: 78 },
  { month: 'Feb', carbon: 1389, renewable: 68, efficiency: 81 },
  { month: 'Mar', carbon: 1298, renewable: 72, efficiency: 85 },
  { month: 'Apr', carbon: 1247, renewable: 75, efficiency: 89 },
];

const sustainabilityGoals = [
  { goal: 'Carbon Neutral by 2030', progress: 78, target: 100 },
  { goal: 'Renewable Energy 80%', progress: 75, target: 80 },
  { goal: 'Waste Reduction 50%', progress: 67, target: 50 },
  { goal: 'Green Packaging 90%', progress: 92, target: 90 },
];

export const Sustainability = () => {
  const metrics = mockSustainabilityMetrics;
  
  const handleDownloadReport = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'sustainability-report.pdf';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sustainability Scorecard</h1>
          <p className="text-gray-400">Environmental impact and ESG performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Download Report</span>
          </button>
          <StatusBadge status={metrics.badge} label={`${metrics.badge.toUpperCase()} ESG`} />
        </div>
      </div>

      {/* ESG Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{metrics.score}</div>
            <div className="text-sm text-gray-400 mb-1">ESG Score</div>
            <div className="flex items-center justify-center text-emerald-400 text-sm">
              <TrendingUp size={16} className="mr-1" />
              {metrics.trend === 'up' ? '+5%' : '-5%'}
            </div>
          </motion.div>
        </GlassCard>

        <GlassCard>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
              <Recycle className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{metrics.carbonSavings}t</div>
            <div className="text-sm text-gray-400 mb-1">Carbon Saved</div>
            <div className="text-emerald-400 text-sm">This month</div>
          </motion.div>
        </GlassCard>

        <GlassCard>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{metrics.routeOptimization}%</div>
            <div className="text-sm text-gray-400 mb-1">Route Efficiency</div>
            <div className="text-emerald-400 text-sm">+12% vs last month</div>
          </motion.div>
        </GlassCard>

        <GlassCard>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{metrics.greenPackaging}%</div>
            <div className="text-sm text-gray-400 mb-1">Green Packaging</div>
            <div className="text-emerald-400 text-sm">Target: 90%</div>
          </motion.div>
        </GlassCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Footprint Breakdown */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Carbon Footprint Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={carbonData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {carbonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Monthly Sustainability Trends */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Sustainability Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Line 
                type="monotone" 
                dataKey="carbon" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Carbon Reduction"
              />
              <Line 
                type="monotone" 
                dataKey="renewable" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Renewable Energy"
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Efficiency"
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Sustainability Goals */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-6">Sustainability Goals Progress</h3>
        <div className="space-y-4">
          {sustainabilityGoals.map((goal, index) => (
            <motion.div
              key={goal.goal}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{goal.goal}</span>
                <span className="text-gray-400">{goal.progress}% / {goal.target}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    goal.progress >= goal.target ? 'bg-emerald-500' : 'bg-cyan-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Environmental Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Water Conservation</h3>
              <p className="text-gray-400 text-sm">Reduced usage by 23%</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">45,678 L</div>
          <div className="text-sm text-gray-400">Water saved this month</div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Recycle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Waste Reduction</h3>
              <p className="text-gray-400 text-sm">Diverted from landfills</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">12.3 tons</div>
          <div className="text-sm text-gray-400">Waste recycled</div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Renewable Energy</h3>
              <p className="text-gray-400 text-sm">Solar & wind power</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">75%</div>
          <div className="text-sm text-gray-400">Of total energy use</div>
        </GlassCard>
      </div>
    </div>
  );
};