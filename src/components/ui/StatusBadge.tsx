import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'low' | 'medium' | 'high' | 'on-time' | 'delayed' | 'critical' | 'bronze' | 'silver' | 'gold';
  label?: string;
  pulse?: boolean;
}

export const StatusBadge = ({ status, label, pulse = false }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'low':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'high':
      case 'critical':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'on-time':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'delayed':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'bronze':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'silver':
        return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      case 'gold':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <motion.span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
        ${getStatusStyles()} ${pulse ? 'animate-pulse' : ''}
      `}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
};