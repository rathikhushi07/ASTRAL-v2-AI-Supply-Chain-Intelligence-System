import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPIMetric } from '../../types';

interface KPICardProps {
  metric: KPIMetric;
  index?: number;
}

export const KPICard = ({ metric, index = 0 }: KPICardProps) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-emerald-400" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-400" />;
      default:
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-emerald-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">{metric.label}</span>
        <div className="flex items-center space-x-1">
          {getTrendIcon()}
          <span className={`text-xs ${getTrendColor()}`}>{metric.change}</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-lg font-bold text-white">{metric.value}</span>
        
        {metric.sparkline && (
          <div className="flex items-end space-x-0.5 h-6">
            {metric.sparkline.map((value, i) => (
              <div
                key={i}
                className="w-1 bg-cyan-400 rounded-sm opacity-70"
                style={{ height: `${(value / Math.max(...metric.sparkline!)) * 100}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};