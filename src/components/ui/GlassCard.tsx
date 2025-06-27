import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className = '', hover = false }: GlassCardProps) => {
  return (
    <motion.div
      className={`
        backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6
        shadow-2xl shadow-cyan-500/10 ${hover ? 'hover:bg-white/10 hover:border-cyan-400/30' : ''}
        transition-all duration-300 ${className}
      `}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};