import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDocumentation } from '../../context/DocumentationContext';
import { useAIProvider } from '../../context/AIProviderContext';
import AIProviderSelector from '../ai/AIProviderSelector';
import AIProxyExplainer from '../ai/AIProxyExplainer';
import toast from 'react-hot-toast';

const { FiBot, FiSend, FiUser, FiZap, FiMessageCircle, FiStar, FiLoader, FiHelpCircle } = FiIcons;

const AIPersonas = () => {
  const { data, getAIPersonaResponse } = useDocumentation();
  const { providers, activeProvider, sendMessage, openConfigModal } = useAIProvider();
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProxyExplainer, setShowProxyExplainer] = useState(false);

  useEffect(() => {
    // Reset conversation when switching personas or providers
    setConversation([]);
  }, [selectedPersona, activeProvider]);

  const currentProvider = providers.find(p => p.id === activeProvider);
  const isProviderConnected = currentProvider?.connected || currentProvider?.id === 'vibe';

  const handleSendMessage = async () => {
    if (!query.trim() || !selectedPersona || !isProviderConnected) return;

    const userMessage = {
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    setLoading(true);
    const currentQuery = query;
    setQuery('');

    try {
      let response;
      if (activeProvider === 'vibe') {
        // Use the getAIPersonaResponse for the vibe provider
        response = await getAIPersonaResponse(selectedPersona.id, currentQuery);
      } else {
        // Use the new AI provider for external models
        response = await sendMessage(
          activeProvider,
          currentProvider.selectedModel,
          `As an AI coding assistant with expertise in ${selectedPersona.specialties.join(', ')}, please answer: ${currentQuery}`,
          conversation
        );
      }

      const aiMessage = {
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setConversation(prev => [...prev, aiMessage]);
      toast.success('Response received!');
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error(`Failed to get response: ${error.message}`);
      
      // Show CORS explainer if this might be a CORS issue
      if (error.message.includes('CORS') || error.message.includes('network') || error.message.includes('Failed to fetch')) {
        setShowProxyExplainer(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Personas</h1>
          <p className="text-gray-600">
            Get specialized coding assistance from our AI experts
          </p>
        </div>
        <button 
          onClick={() => setShowProxyExplainer(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <SafeIcon icon={FiHelpCircle} className="w-4 h-4" />
          <span>About API Access</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Personas and Provider Selection */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Provider Selector */}
          <AIProviderSelector />

          {/* AI Personas */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose an Expert</h2>
            <div className="space-y-4">
              {data.aiPersonas.map((persona, index) => (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => isProviderConnected ? setSelectedPersona(persona) : openConfigModal(activeProvider)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPersona?.id === persona.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  } ${!isProviderConnected && 'opacity-75'}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{persona.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{persona.name}</h3>
                      <p className="text-sm text-gray-600">{persona.description}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {persona.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    {persona.personality}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selectedPersona ? (
            <div className="bg-white rounded-lg border border-gray-200 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{selectedPersona.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedPersona.name}</h3>
                      <p className="text-sm text-gray-600">{selectedPersona.responseStyle}</p>
                    </div>
                  </div>
                  {/* Provider Badge */}
                  <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
                    <div className="text-sm">{currentProvider.logo}</div>
                    <span className="text-xs font-medium text-gray-700">
                      {currentProvider.name}
                    </span>
                    {isProviderConnected && (
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    )}
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {!isProviderConnected ? (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiZap} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Connect to an AI provider to start chatting
                    </p>
                    <button
                      onClick={() => openConfigModal(activeProvider)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Configure {currentProvider.name}
                    </button>
                  </div>
                ) : conversation.length === 0 ? (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiMessageCircle} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Start a conversation with {selectedPersona.name} using {currentProvider.name}
                    </p>
                    {currentProvider.selectedModel && (
                      <p className="text-sm text-gray-500 mt-2">
                        Using model: {currentProvider.selectedModel}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {conversation.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <div className="flex space-x-1 items-center">
                            <SafeIcon icon={FiLoader} className="w-4 h-4 text-gray-500 animate-spin" />
                            <span className="text-sm text-gray-500">Generating response...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isProviderConnected ? "Ask a coding question..." : "Connect to an AI provider first..."}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    disabled={loading || !isProviderConnected}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!query.trim() || loading || !isProviderConnected}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <SafeIcon
                      icon={loading ? FiLoader : FiSend}
                      className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 h-[600px] flex items-center justify-center">
              <div className="text-center">
                <SafeIcon icon={FiBot} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an AI Expert</h3>
                <p className="text-gray-600">
                  Choose a specialized AI persona to get personalized coding assistance
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Currently using: {currentProvider.name} {isProviderConnected ? '(Connected)' : '(Not Connected)'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Proxy Explainer Modal */}
      <AIProxyExplainer 
        isOpen={showProxyExplainer} 
        onClose={() => setShowProxyExplainer(false)} 
      />
    </motion.div>
  );
};

export default AIPersonas;