import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDocumentation } from '../../context/DocumentationContext';
import toast from 'react-hot-toast';

const { FiBot, FiSend, FiUser, FiZap, FiMessageCircle, FiStar } = FiIcons;

const AIPersonas = () => {
  const { data, getAIPersonaResponse } = useDocumentation();
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!query.trim() || !selectedPersona) return;

    const userMessage = { type: 'user', content: query, timestamp: new Date() };
    setConversation(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await getAIPersonaResponse(selectedPersona.id, query);
      const aiMessage = { type: 'ai', content: response, timestamp: new Date() };
      setConversation(prev => [...prev, aiMessage]);
      toast.success('Response received!');
    } catch (error) {
      toast.error('Failed to get response');
    } finally {
      setLoading(false);
      setQuery('');
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Personas</h1>
        <p className="text-gray-600">
          Get specialized coding assistance from our AI experts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personas List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose an Expert</h2>
          <div className="space-y-4">
            {data.aiPersonas.map((persona, index) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedPersona(persona)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPersona?.id === persona.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
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

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selectedPersona ? (
            <div className="bg-white rounded-lg border border-gray-200 h-96 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{selectedPersona.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedPersona.name}</h3>
                    <p className="text-sm text-gray-600">{selectedPersona.responseStyle}</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {conversation.length === 0 ? (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiMessageCircle} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Start a conversation with {selectedPersona.name}
                    </p>
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
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                    placeholder="Ask a coding question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!query.trim() || loading}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <SafeIcon icon={FiSend} className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 h-96 flex items-center justify-center">
              <div className="text-center">
                <SafeIcon icon={FiBot} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an AI Expert</h3>
                <p className="text-gray-600">
                  Choose a specialized AI persona to get personalized coding assistance
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AIPersonas;