import { motion } from 'framer-motion';
import { Award, Trophy, Target, Zap, Leaf, Shield, TrendingUp, Star } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { mockBadges, mockRiskZones } from '../../data/mockData';
import { Badge } from '../../types';

export const Gamification = () => {
  const leaderboardData = mockRiskZones.map((zone, index) => ({
    rank: index + 1,
    name: zone.name,
    score: 100 - zone.riskScore,
    badge: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'none',
    improvement: Math.floor(Math.random() * 20) - 10
  })).sort((a, b) => b.score - a.score);

  const achievements = [
    { name: 'Efficiency Master', progress: 85, target: 100, icon: Zap, color: 'cyan' },
    { name: 'Green Champion', progress: 92, target: 100, icon: Leaf, color: 'emerald' },
    { name: 'Risk Mitigator', progress: 67, target: 100, icon: Shield, color: 'blue' },
    { name: 'Cost Optimizer', progress: 78, target: 100, icon: TrendingUp, color: 'purple' }
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '🏅';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'gold': return 'from-yellow-500 to-amber-600';
      case 'silver': return 'from-gray-400 to-gray-500';
      case 'bronze': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Achievement Center</h1>
          <p className="text-gray-400">Gamified performance tracking and rewards</p>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-xl">2,847 XP</span>
        </div>
      </div>

      {/* Badges Collection */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Badge Collection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              className={`p-4 rounded-lg border transition-all ${
                badge.earned
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <div className={`text-4xl mb-2 ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                  {badge.icon}
                </div>
                <h4 className={`font-semibold mb-1 ${badge.earned ? 'text-white' : 'text-gray-400'}`}>
                  {badge.name}
                </h4>
                <p className="text-xs text-gray-400 mb-3">{badge.description}</p>
                
                {badge.earned ? (
                  <StatusBadge status="low" label="Earned" />
                ) : (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        style={{ width: `${badge.progress || 0}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400">{badge.progress || 0}% Complete</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* ESG Leaderboard */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Regional ESG Leaderboard</h3>
        <div className="space-y-3">
          {leaderboardData.map((entry, index) => (
            <motion.div
              key={entry.name}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getBadgeColor(entry.badge)} flex items-center justify-center text-xl`}>
                  {entry.rank <= 3 ? getBadgeIcon(entry.badge) : entry.rank}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{entry.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">ESG Score: {entry.score}</span>
                    <div className={`flex items-center text-xs ${
                      entry.improvement > 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {entry.improvement > 0 ? '↗' : '↘'} {Math.abs(entry.improvement)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{entry.score}</div>
                <div className="text-xs text-gray-400">Points</div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Achievement Progress */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Achievement Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.name}
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-${achievement.color}-500/20 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${achievement.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{achievement.name}</h4>
                    <div className="text-sm text-gray-400">
                      {achievement.progress}/{achievement.target} points
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold text-${achievement.color}-400`}>
                      {Math.round((achievement.progress / achievement.target) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full bg-gradient-to-r from-${achievement.color}-500 to-${achievement.color}-600`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Weekly Challenges */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Weekly Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Zero Delay Week',
              description: 'Achieve zero delays for 7 consecutive days',
              reward: '500 XP + Zero Delay Badge',
              progress: 4,
              target: 7,
              icon: Target,
              color: 'emerald'
            },
            {
              title: 'Carbon Crusher',
              description: 'Reduce carbon footprint by 15% this week',
              reward: '300 XP + Eco Warrior Badge',
              progress: 12,
              target: 15,
              icon: Leaf,
              color: 'green'
            },
            {
              title: 'Route Master',
              description: 'Optimize 50 delivery routes',
              reward: '400 XP + Route Optimizer Badge',
              progress: 37,
              target: 50,
              icon: TrendingUp,
              color: 'blue'
            }
          ].map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <motion.div
                key={challenge.title}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-${challenge.color}-500/20 flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 text-${challenge.color}-400`} />
                  </div>
                  <h4 className="text-white font-medium">{challenge.title}</h4>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{challenge.progress}/{challenge.target}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r from-${challenge.color}-500 to-${challenge.color}-600`}
                      style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-white/5 rounded text-xs text-gray-300">
                  <Star className="w-3 h-3 inline mr-1 text-yellow-400" />
                  {challenge.reward}
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};