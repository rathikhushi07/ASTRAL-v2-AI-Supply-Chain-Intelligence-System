import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, X, BarChart3, GitBranch, Info } from 'lucide-react';
import { Shipment } from '../../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ExplainableAIProps {
  shipment: Shipment;
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainableAI = ({ shipment, isOpen, onClose }: ExplainableAIProps) => {
  const [activeTab, setActiveTab] = useState<'features' | 'flow' | 'details'>('features');

  if (!shipment.explainableAI) return null;

  const { features, modelType, confidence, reasoning } = shipment.explainableAI;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Decision Explanation</h2>
                  <p className="text-gray-400 text-sm">Shipment {shipment.id} - {shipment.delayPrediction}h delay prediction</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-white/5 rounded-lg p-1">
              {[
                { id: 'features', label: 'Feature Importance', icon: BarChart3 },
                { id: 'flow', label: 'Decision Flow', icon: GitBranch },
                { id: 'details', label: 'Model Details', icon: Info }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="space-y-6">
              {activeTab === 'features' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white">Feature Importance Analysis</h3>
                  
                  {/* Feature Bars */}
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.name}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{feature.name}</span>
                          <div className="text-right">
                            <span className="text-cyan-400 font-bold">{feature.importance}%</span>
                            <div className="text-xs text-gray-400">{feature.value}</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${feature.importance}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={features}>
                        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                        <YAxis stroke="#9CA3AF" />
                        <Bar dataKey="importance" fill="#00D4FF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {activeTab === 'flow' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white">Decision Flow</h3>
                  
                  <div className="space-y-4">
                    {[
                      { step: 1, condition: 'Weather Severity > 80%', result: 'High Risk Path', color: 'red' },
                      { step: 2, condition: 'Traffic Density = Congested', result: 'Add 12h Delay', color: 'amber' },
                      { step: 3, condition: 'Port Efficiency < Average', result: 'Add 6h Delay', color: 'amber' },
                      { step: 4, condition: 'Historical Pattern Match', result: 'Confidence: 87%', color: 'emerald' }
                    ].map((flow, index) => (
                      <motion.div
                        key={flow.step}
                        className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className={`w-8 h-8 rounded-full bg-${flow.color}-500/20 text-${flow.color}-400 flex items-center justify-center font-bold`}>
                          {flow.step}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{flow.condition}</div>
                          <div className="text-gray-400 text-sm">{flow.result}</div>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-cyan-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-white">Model Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Model Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Algorithm:</span>
                          <span className="text-white">{modelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Confidence:</span>
                          <span className="text-cyan-400 font-bold">{confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Training Data:</span>
                          <span className="text-white">50K+ shipments</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Updated:</span>
                          <span className="text-white">2 hours ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Performance Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Accuracy:</span>
                          <span className="text-emerald-400">89.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Precision:</span>
                          <span className="text-emerald-400">91.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recall:</span>
                          <span className="text-emerald-400">87.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">F1 Score:</span>
                          <span className="text-emerald-400">89.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">AI Reasoning</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{reasoning}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};