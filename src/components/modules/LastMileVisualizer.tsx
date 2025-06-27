import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, MapPin, Truck, Zap, AlertTriangle, Cloud, Construction } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { KPICard } from '../ui/KPICard';
import { mockDeliveryRoutes, mockKPIs } from '../../data/mockData';
import { DeliveryRoute } from '../../types';

export const LastMileVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<DeliveryRoute>(mockDeliveryRoutes[0]);
  const [simulationEvents, setSimulationEvents] = useState({
    traffic: false,
    weather: false,
    construction: false,
    droneMalfunction: false
  });
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnimationProgress(prev => (prev >= 100 ? 0 : prev + 2));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'drone': return '🚁';
      case 'van': return '🚐';
      case 'bike': return '🏍️';
      default: return '📦';
    }
  };

  const getVehicleColor = (type: string) => {
    switch (type) {
      case 'drone': return 'from-blue-500 to-cyan-600';
      case 'van': return 'from-green-500 to-emerald-600';
      case 'bike': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const calculateDelay = () => {
    let delay = 0;
    if (simulationEvents.traffic) delay += 15;
    if (simulationEvents.weather) delay += 20;
    if (simulationEvents.construction) delay += 10;
    if (simulationEvents.droneMalfunction && selectedRoute.type === 'drone') delay += 30;
    return delay;
  };

  const alternativeRoutes = [
    { name: 'Route A (Optimal)', time: selectedRoute.estimatedTime, cost: 45, efficiency: 95 },
    { name: 'Route B (Traffic)', time: selectedRoute.estimatedTime + 15, cost: 52, efficiency: 78 },
    { name: 'Route C (Scenic)', time: selectedRoute.estimatedTime + 8, cost: 48, efficiency: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Last Mile Visualizer</h1>
          <p className="text-gray-400">AI-optimized delivery route simulation</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
              isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
            } text-white`}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'Pause' : 'Play'} Simulation</span>
          </button>
          <button
            onClick={() => {
              setAnimationProgress(0);
              setIsPlaying(false);
            }}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mockKPIs.slice(0, 4).map((kpi, index) => (
          <KPICard key={kpi.label} metric={kpi} index={index} />
        ))}
      </div>

      {/* Main Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Visualization */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Route Simulation</h3>
            <StatusBadge 
              status={selectedRoute.status === 'active' ? 'low' : selectedRoute.status === 'delayed' ? 'medium' : 'high'} 
              label={selectedRoute.status}
            />
          </div>

          {/* Simulated Map */}
          <div className="relative h-64 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg overflow-hidden mb-4">
            {/* Route Path */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 20 200 Q 150 100 280 50"
                stroke="#00D4FF"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </svg>

            {/* Origin */}
            <div className="absolute left-4 bottom-4 flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-white text-sm">{selectedRoute.origin}</span>
            </div>

            {/* Destination */}
            <div className="absolute right-4 top-4 flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-sm">{selectedRoute.destination}</span>
            </div>

            {/* Moving Vehicle */}
            <motion.div
              className={`absolute w-8 h-8 rounded-full bg-gradient-to-r ${getVehicleColor(selectedRoute.type)} flex items-center justify-center text-lg shadow-lg`}
              style={{
                left: `${20 + (animationProgress * 2.6)}px`,
                top: `${200 - (animationProgress * 1.5)}px`
              }}
              animate={{
                scale: isPlaying ? [1, 1.1, 1] : 1,
              }}
              transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 1
              }}
            >
              {getVehicleIcon(selectedRoute.type)}
            </motion.div>

            {/* Event Indicators */}
            {simulationEvents.traffic && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-red-400" />
                </div>
              </div>
            )}

            {simulationEvents.weather && (
              <div className="absolute top-8 right-8">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            )}

            {simulationEvents.construction && (
              <div className="absolute bottom-8 left-1/3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Construction className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">{Math.round(animationProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                style={{ width: `${animationProgress}%` }}
              />
            </div>
          </div>
        </GlassCard>

        {/* Route Details */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Route Details</h3>
          
          <div className="space-y-4">
            {/* Vehicle Selection */}
            <div className="grid grid-cols-3 gap-2">
              {mockDeliveryRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedRoute.id === route.id
                      ? 'border-cyan-500/50 bg-cyan-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-2xl mb-1">{getVehicleIcon(route.type)}</div>
                  <div className="text-xs text-gray-400 capitalize">{route.type}</div>
                </button>
              ))}
            </div>

            {/* Route Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-sm text-gray-400">Estimated Time</div>
                <div className="text-lg font-bold text-white">
                  {selectedRoute.estimatedTime + calculateDelay()} min
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-sm text-gray-400">Vehicle Type</div>
                <div className="text-lg font-bold text-white capitalize">{selectedRoute.type}</div>
              </div>
            </div>

            {/* Event Toggles */}
            <div className="space-y-3">
              <h4 className="text-white font-medium">Simulation Events</h4>
              {[
                { key: 'traffic', label: 'Heavy Traffic', icon: Truck, delay: '+15 min' },
                { key: 'weather', label: 'Bad Weather', icon: Cloud, delay: '+20 min' },
                { key: 'construction', label: 'Road Work', icon: Construction, delay: '+10 min' },
                { key: 'droneMalfunction', label: 'Drone Issue', icon: AlertTriangle, delay: '+30 min' }
              ].map((event) => {
                const Icon = event.icon;
                return (
                  <div key={event.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{event.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">{event.delay}</span>
                      <button
                        onClick={() => setSimulationEvents(prev => ({
                          ...prev,
                          [event.key]: !prev[event.key as keyof typeof prev]
                        }))}
                        className={`w-10 h-6 rounded-full transition-all ${
                          simulationEvents[event.key as keyof typeof simulationEvents]
                            ? 'bg-cyan-500'
                            : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          simulationEvents[event.key as keyof typeof simulationEvents]
                            ? 'translate-x-5'
                            : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Route Comparison */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Alternative Routes Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternativeRoutes.map((route, index) => (
            <motion.div
              key={route.name}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-white font-medium mb-3">{route.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white">{route.time} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-white">₹{route.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className={`${route.efficiency > 90 ? 'text-emerald-400' : route.efficiency > 80 ? 'text-amber-400' : 'text-red-400'}`}>
                    {route.efficiency}%
                  </span>
                </div>
              </div>
              <button className="w-full mt-3 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-sm transition-all">
                Select Route
              </button>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};