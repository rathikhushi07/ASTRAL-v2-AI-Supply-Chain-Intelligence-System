import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Zap, AlertTriangle, Cloud, Truck, Factory, TrendingDown, TrendingUp } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { mockSimulationEvents, mockRiskZones } from '../../data/mockData';
import { SimulationEvent } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

export const ForecastSandbox = () => {
  const [activeEvents, setActiveEvents] = useState<SimulationEvent[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);

  const eventIcons = {
    'port-strike': Factory,
    'flood': Cloud,
    'demand-spike': TrendingUp,
    'supplier-issue': Truck
  };

  const eventColors = {
    'port-strike': 'from-red-500 to-red-600',
    'flood': 'from-blue-500 to-blue-600',
    'demand-spike': 'from-green-500 to-green-600',
    'supplier-issue': 'from-amber-500 to-amber-600'
  };

  const handleDragStart = (e: React.DragEvent, event: SimulationEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(event));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const eventData = JSON.parse(e.dataTransfer.getData('application/json'));
    if (!activeEvents.find(ae => ae.id === eventData.id)) {
      setActiveEvents(prev => [...prev, eventData]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeEvent = (eventId: string) => {
    setActiveEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock results based on active events
    const totalImpact = activeEvents.reduce((sum, event) => sum + event.impact, 0);
    const avgDuration = activeEvents.reduce((sum, event) => sum + event.duration, 0) / (activeEvents.length || 1);
    
    const results = {
      overallImpact: Math.min(100, totalImpact),
      estimatedDelay: Math.round(avgDuration * 0.5),
      costIncrease: Math.round(totalImpact * 0.8),
      alternativeRoutes: Math.max(1, 5 - Math.floor(totalImpact / 20)),
      riskLevel: totalImpact > 80 ? 'high' : totalImpact > 40 ? 'medium' : 'low',
      affectedRegions: [...new Set(activeEvents.flatMap(e => e.affectedRegions))],
      recommendations: generateRecommendations(activeEvents)
    };
    
    setSimulationResults(results);
    setIsSimulating(false);
  };

  const generateRecommendations = (events: SimulationEvent[]) => {
    const recommendations = [];
    
    if (events.some(e => e.type === 'port-strike')) {
      recommendations.push('Activate alternative ports and increase air freight capacity');
    }
    if (events.some(e => e.type === 'flood')) {
      recommendations.push('Reroute through northern corridors and increase safety stock');
    }
    if (events.some(e => e.type === 'demand-spike')) {
      recommendations.push('Scale up production and optimize inventory distribution');
    }
    if (events.some(e => e.type === 'supplier-issue')) {
      recommendations.push('Engage backup suppliers and expedite critical shipments');
    }
    
    return recommendations;
  };

  const resetSimulation = () => {
    setActiveEvents([]);
    setSimulationResults(null);
    setIsSimulating(false);
  };

  const impactData = simulationResults ? [
    { name: 'Baseline', value: 100 },
    { name: 'With Events', value: 100 - simulationResults.overallImpact },
    { name: 'Optimized', value: 100 - (simulationResults.overallImpact * 0.6) }
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Forecast Sandbox</h1>
          <p className="text-gray-400">What-if scenario simulation and AI reforecasting</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={runSimulation}
            disabled={activeEvents.length === 0 || isSimulating}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
              activeEvents.length === 0 || isSimulating
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            <Play size={16} />
            <span>{isSimulating ? 'Simulating...' : 'Run Simulation'}</span>
          </button>
          <button
            onClick={resetSimulation}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Library */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Event Library</h3>
          <p className="text-gray-400 text-sm mb-4">Drag events to the simulation area</p>
          
          <div className="space-y-3">
            {mockSimulationEvents.map((event) => {
              const Icon = eventIcons[event.type];
              return (
                <motion.div
                  key={event.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, event)}
                  className={`p-3 rounded-lg bg-gradient-to-r ${eventColors[event.type]} cursor-grab active:cursor-grabbing`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-white" />
                    <div className="flex-1">
                      <div className="text-white font-medium">{event.name}</div>
                      <div className="text-white/80 text-sm">Impact: {event.impact}%</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Simulation Area */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Active Simulation</h3>
          
          <div
            className="min-h-64 border-2 border-dashed border-white/20 rounded-lg p-4 transition-all"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {activeEvents.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Drop events here to simulate</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {activeEvents.map((event) => {
                    const Icon = eventIcons[event.type];
                    return (
                      <motion.div
                        key={event.id}
                        className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-cyan-400" />
                          <div>
                            <div className="text-white font-medium">{event.name}</div>
                            <div className="text-gray-400 text-sm">
                              {event.duration}h duration, {event.impact}% impact
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeEvent(event.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          ×
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {isSimulating && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 text-cyan-400">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>AI analyzing scenarios...</span>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Results */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Simulation Results</h3>
          
          {!simulationResults ? (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Run a simulation to see results</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Overall Impact</div>
                  <div className="text-lg font-bold text-white">{simulationResults.overallImpact}%</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Est. Delay</div>
                  <div className="text-lg font-bold text-white">{simulationResults.estimatedDelay}h</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Cost Increase</div>
                  <div className="text-lg font-bold text-white">{simulationResults.costIncrease}%</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-sm text-gray-400">Alt. Routes</div>
                  <div className="text-lg font-bold text-white">{simulationResults.alternativeRoutes}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Risk Level</span>
                  <StatusBadge status={simulationResults.riskLevel} />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium">AI Recommendations</h4>
                <div className="space-y-1">
                  {simulationResults.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Impact Visualization */}
      {simulationResults && (
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Performance Impact Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Supply Chain Efficiency</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Bar dataKey="value" fill="#00D4FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Affected Regions</h4>
              <div className="space-y-2">
                {simulationResults.affectedRegions.map((region: string, index: number) => (
                  <motion.div
                    key={region}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-white">{region}</span>
                    <StatusBadge status="medium" label="Impacted" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};