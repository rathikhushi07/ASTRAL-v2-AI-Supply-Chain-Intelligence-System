import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Map,
  Clock,
  Route,
  Shield,
  Leaf,
  Truck,
  TrendingUp,
  Bot,
  Search,
  FileText,
  Globe,
  Scale,
  Zap,
  Bell,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Zap },
  { id: 'risk-heatmap', label: 'Risk Heatmap', icon: Map },
  { id: 'delay-predictor', label: 'Delay Predictor', icon: Clock },
  { id: 'inventory-router', label: 'Inventory Router', icon: Route },
  { id: 'blockchain-tracker', label: 'Blockchain Tracker', icon: Shield },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'last-mile', label: 'Last Mile', icon: Truck },
  { id: 'restock-forecaster', label: 'Restock Forecaster', icon: TrendingUp },
  { id: 'explainable-ai', label: 'Explainable AI', icon: Search },
  { id: 'audit-trail', label: 'Audit Trail', icon: FileText },
  { id: 'ethics-panel', label: 'Ethics Panel', icon: Scale },
  { id: 'forecast-sandbox', label: 'Forecast Sandbox', icon: Zap },
  { id: 'gamification', label: 'Achievement Center', icon: Bot }
];

export const Navigation = ({ activeModule, onModuleChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Sidebar */}
      <motion.nav
        className={`
          fixed top-0 left-0 h-full w-64 backdrop-blur-xl bg-black/40 border-r border-white/10 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ASTRAL</h1>
              <p className="text-xs text-cyan-300">v2.0</p>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }
                  `}
                  onClick={() => {
                    onModuleChange(item.id);
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Icon size={18} className={isActive ? 'text-cyan-300' : 'text-gray-400 group-hover:text-white'} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};