import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Bell, Globe, MessageCircle, X, Send, Mic, Volume2 } from 'lucide-react';
import { mockNotifications } from '../data/mockData';
import { NotificationItem, ChatMessage } from '../types';

interface FloatingSidebarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const FloatingSidebar = ({ language, onLanguageChange }: FloatingSidebarProps) => {
  const [activePanel, setActivePanel] = useState<'chat' | 'notifications' | 'language' | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m AstralBot, your AI supply chain assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (message: string): string => {
    const responses = {
      'delay': 'Based on current data, I see 3 shipments with predicted delays. SH003 has the highest delay prediction of 36 hours due to severe weather conditions.',
      'risk': 'Mumbai Port currently shows the highest risk level at 78% due to weather conditions and port congestion. Would you like me to show alternative routes?',
      'inventory': 'I detected a shortage of 550 units in Electronics Components. I recommend rerouting from Delhi Hub and Bangalore Tech Hub to meet demand.',
      'sustainability': 'Your current ESG score is 78 with a Gold badge! You\'ve exceeded monthly carbon reduction targets by 12%.',
      'blockchain': 'All blockchain nodes are verified except Retail Store #247. The verification is pending for the latest transaction.',
      'default': 'I can help you with risk assessments, delay predictions, inventory optimization, sustainability metrics, and blockchain tracking. What specific information do you need?'
    };

    const lowercaseMessage = message.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }
    return responses.default;
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputMessage('Show me the current risk levels');
      }, 2000);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col space-y-4 z-50">
        {/* Chat Button */}
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center"
          onClick={() => setActivePanel(activePanel === 'chat' ? null : 'chat')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bot size={24} />
        </motion.button>

        {/* Notifications Button */}
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-amber-500/25 flex items-center justify-center relative"
          onClick={() => setActivePanel(activePanel === 'notifications' ? null : 'notifications')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </motion.button>

        {/* Language Button */}
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center"
          onClick={() => setActivePanel(activePanel === 'language' ? null : 'language')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Globe size={24} />
        </motion.button>
      </div>

      {/* Panels */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            className="fixed right-6 bottom-32 w-96 h-96 backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl shadow-2xl z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">
                {activePanel === 'chat' && 'AstralBot Assistant'}
                {activePanel === 'notifications' && 'Notifications'}
                {activePanel === 'language' && 'Language Settings'}
              </h3>
              <button
                onClick={() => setActivePanel(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 h-full overflow-hidden">
              {/* Chat Panel */}
              {activePanel === 'chat' && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            message.type === 'user'
                              ? 'bg-cyan-500 text-white'
                              : 'bg-white/10 text-gray-300'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about delays, risks, inventory..."
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={handleVoiceInput}
                      className={`p-2 rounded-lg ${isListening ? 'bg-red-500' : 'bg-white/10'} text-white hover:bg-white/20`}
                    >
                      <Mic size={16} />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Panel */}
              {activePanel === 'notifications' && (
                <div className="space-y-3 overflow-y-auto h-full">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        notification.read
                          ? 'bg-white/5 border-white/10 text-gray-400'
                          : 'bg-white/10 border-cyan-500/30 text-white'
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs mt-1 opacity-80">{notification.message}</p>
                          <p className="text-xs mt-2 opacity-60">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            notification.severity === 'high'
                              ? 'bg-red-500'
                              : notification.severity === 'medium'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Language Panel */}
              {activePanel === 'language' && (
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setActivePanel(null);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${
                        language === lang.code
                          ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};