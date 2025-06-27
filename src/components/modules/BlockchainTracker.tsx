import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle, Clock, Hash, MapPin, QrCode } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { mockBlockchainNodes } from '../../data/mockData';

export const BlockchainTracker = () => {
  const [selectedNode, setSelectedNode] = useState(mockBlockchainNodes[0]);
  const [showQRCode, setShowQRCode] = useState(false);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'supplier': return '🏭';
      case 'warehouse': return '🏢';
      case 'distribution': return '🚚';
      case 'retail': return '🏪';
      default: return '📦';
    }
  };

  const getNodeColor = (verified: boolean) => {
    return verified ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-amber-500/50 bg-amber-500/10';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blockchain TrustChain Tracker</h1>
          <p className="text-gray-400">Tamper-proof supply chain verification</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all flex items-center space-x-2"
          >
            <QrCode size={16} />
            <span>QR Code</span>
          </button>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Secured by Blockchain</span>
          </div>
        </div>
      </div>

      {/* Blockchain Timeline */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-6">Supply Chain Journey</h3>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500"></div>
          
          {/* Timeline Nodes */}
          <div className="space-y-6">
            {mockBlockchainNodes.map((node, index) => (
              <motion.div
                key={node.id}
                className={`relative flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all ${
                  selectedNode.id === node.id ? getNodeColor(node.verified) : 'hover:bg-white/5'
                }`}
                onClick={() => setSelectedNode(node)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                  node.verified ? 'bg-emerald-500' : 'bg-amber-500'
                }`}>
                  {getNodeIcon(node.type)}
                  {node.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Node Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">{node.name}</h4>
                    <StatusBadge 
                      status={node.verified ? 'low' : 'medium'} 
                      label={node.verified ? 'Verified' : 'Pending'}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">
                        {new Date(node.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{node.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 font-mono">
                        {node.hash.substring(0, 10)}...
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Selected Node Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Node Details</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl">
                {getNodeIcon(selectedNode.type)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{selectedNode.name}</h4>
                <p className="text-gray-400 capitalize">{selectedNode.type}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <StatusBadge 
                  status={selectedNode.verified ? 'low' : 'medium'} 
                  label={selectedNode.verified ? 'Verified' : 'Pending Verification'}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Timestamp</span>
                <span className="text-white">{new Date(selectedNode.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Location</span>
                <span className="text-white">{selectedNode.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Transaction Hash</span>
                <span className="text-cyan-400 font-mono text-sm">{selectedNode.hash}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all">
                Verify Transaction
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Security Metrics */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Security Metrics</h3>
          <div className="space-y-4">
            {[
              { label: 'Chain Integrity', value: '100%', status: 'verified' },
              { label: 'Consensus Rate', value: '99.9%', status: 'verified' },
              { label: 'Hash Verification', value: '100%', status: 'verified' },
              { label: 'Node Synchronization', value: '98.7%', status: 'pending' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  {metric.status === 'verified' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  )}
                  <span className="text-gray-300">{metric.label}</span>
                </div>
                <span className="text-white font-semibold">{metric.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Chain Secured</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">
              All transactions verified and tamper-proof
            </p>
          </div>
        </GlassCard>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowQRCode(false)}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <div className="text-6xl">📱</div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Track Your Product</h3>
            <p className="text-gray-600 mb-4">Scan to view complete supply chain journey</p>
            <button
              onClick={() => setShowQRCode(false)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};