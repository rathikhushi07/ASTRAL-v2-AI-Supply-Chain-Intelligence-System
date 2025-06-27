import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { FloatingSidebar } from './components/FloatingSidebar';
import { Overview } from './components/modules/Overview';
import { RiskHeatmap } from './components/modules/RiskHeatmap';
import { DelayPredictor } from './components/modules/DelayPredictor';
import { InventoryRouter } from './components/modules/InventoryRouter';
import { BlockchainTracker } from './components/modules/BlockchainTracker';
import { Sustainability } from './components/modules/Sustainability';
import { LastMileVisualizer } from './components/modules/LastMileVisualizer';
import { RestockForecaster } from './components/modules/RestockForecaster';
import { ForecastSandbox } from './components/modules/ForecastSandbox';
import { Gamification } from './components/modules/Gamification';

function App() {
  const [activeModule, setActiveModule] = useState('overview');
  const [language, setLanguage] = useState('en');

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <Overview />;
      case 'risk-heatmap':
        return <RiskHeatmap />;
      case 'delay-predictor':
        return <DelayPredictor />;
      case 'inventory-router':
        return <InventoryRouter />;
      case 'blockchain-tracker':
        return <BlockchainTracker />;
      case 'sustainability':
        return <Sustainability />;
      case 'last-mile':
        return <LastMileVisualizer />;
      case 'restock-forecaster':
        return <RestockForecaster />;
      case 'forecast-sandbox':
        return <ForecastSandbox />;
      case 'gamification':
        return <Gamification />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent)]" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <Navigation activeModule={activeModule} onModuleChange={setActiveModule} />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen relative z-10">
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Sidebar */}
      <FloatingSidebar language={language} onLanguageChange={setLanguage} />
    </div>
  );
}

export default App;