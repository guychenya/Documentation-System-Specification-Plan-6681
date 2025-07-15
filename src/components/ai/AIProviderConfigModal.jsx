import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAIProvider } from '../../context/AIProviderContext';
import toast from 'react-hot-toast';

const { FiX, FiServer, FiKey, FiCheck, FiLoader, FiAlertTriangle, FiDatabase, FiInfo, FiAlertCircle } = FiIcons;

const AIProviderConfigModal = () => {
  const {
    isConfigModalOpen,
    closeConfigModal,
    selectedProvider,
    updateProvider,
    testConnection,
    isLoading
  } = useAIProvider();

  const [formData, setFormData] = useState({
    endpoint: '',
    apiKey: '',
    selectedModel: ''
  });

  useEffect(() => {
    if (selectedProvider) {
      setFormData({
        endpoint: selectedProvider.endpoint || '',
        apiKey: selectedProvider.apiKey || '',
        selectedModel: selectedProvider.selectedModel || ''
      });
    }
  }, [selectedProvider]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProvider) return;

    // Update provider with form data
    updateProvider(selectedProvider.id, {
      endpoint: formData.endpoint,
      apiKey: formData.apiKey,
      selectedModel: formData.selectedModel
    });

    // Test connection with updated config
    const updatedProvider = {
      ...selectedProvider,
      endpoint: formData.endpoint,
      apiKey: formData.apiKey,
      selectedModel: formData.selectedModel
    };

    const success = await testConnection(updatedProvider);
    if (success) {
      closeConfigModal();
    }
  };

  const getProviderInstructions = (providerId) => {
    const instructions = {
      openai: {
        title: "OpenAI API Setup",
        steps: [
          "Visit platform.openai.com",
          "Go to API Keys section",
          "Create a new API key",
          "Copy and paste it below"
        ]
      },
      anthropic: {
        title: "Anthropic API Setup",
        steps: [
          "Visit console.anthropic.com",
          "Go to API Keys section",
          "Create a new API key",
          "Copy and paste it below"
        ]
      },
      gemini: {
        title: "Google Gemini API Setup",
        steps: [
          "Visit aistudio.google.com",
          "Go to API Keys section",
          "Create a new API key",
          "Copy and paste it below"
        ]
      },
      groq: {
        title: "Groq API Setup",
        steps: [
          "Visit console.groq.com",
          "Go to API Keys section",
          "Create a new API key",
          "Copy and paste it below"
        ]
      },
      xai: {
        title: "xAI (Grok) API Setup",
        steps: [
          "Visit console.x.ai",
          "Go to API Keys section",
          "Create a new API key",
          "Copy and paste it below"
        ]
      },
      ollama: {
        title: "Ollama Local Setup",
        steps: [
          "Install Ollama from ollama.ai",
          "Run 'ollama serve' in terminal",
          "Pull models with 'ollama pull llama2'",
          "Ensure it's running on localhost:11434"
        ]
      }
    };
    return instructions[providerId] || null;
  };

  if (!selectedProvider) return null;

  const instructions = getProviderInstructions(selectedProvider.id);

  return (
    <AnimatePresence>
      {isConfigModalOpen && selectedProvider && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeConfigModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{selectedProvider.logo}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Configure {selectedProvider.name}
                  </h2>
                  <p className="text-sm text-gray-600">{selectedProvider.description}</p>
                </div>
              </div>
              <button
                onClick={closeConfigModal}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>

            {/* Instructions */}
            {instructions && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700 mb-2">
                  <SafeIcon icon={FiInfo} className="w-5 h-5" />
                  <h3 className="font-medium">{instructions.title}</h3>
                </div>
                <ol className="text-sm text-blue-600 space-y-1">
                  {instructions.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* CORS Warning for External APIs */}
            {selectedProvider.id !== 'ollama' && selectedProvider.id !== 'vibe' && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2 text-yellow-700 mb-2">
                  <SafeIcon icon={FiAlertCircle} className="w-5 h-5" />
                  <h3 className="font-medium">CORS Notice</h3>
                </div>
                <p className="text-sm text-yellow-600">
                  Direct API calls may be blocked by CORS policies. For production use, implement a backend proxy for secure API communication.
                </p>
                <p className="text-sm text-yellow-600 mt-2">
                  This demo will simulate responses for external providers. Only Ollama (local) connections will work directly.
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Endpoint */}
              {selectedProvider.id !== 'ollama' && selectedProvider.id !== 'gemini' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Endpoint
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiServer} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="endpoint"
                      value={formData.endpoint}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Enter API endpoint"
                      readOnly
                    />
                  </div>
                </div>
              )}

              {/* API Key */}
              {selectedProvider.id !== 'ollama' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiKey} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="apiKey"
                      value={formData.apiKey}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Enter API key"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Models */}
              {selectedProvider.id === 'ollama' ? (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700 mb-2">
                    <SafeIcon icon={FiDatabase} className="w-5 h-5" />
                    <h3 className="font-medium">Local Ollama Models</h3>
                  </div>
                  <p className="text-sm text-blue-600">
                    Models will be detected automatically when you test the connection. Make sure Ollama is running locally on port 11434.
                  </p>
                </div>
              ) : (
                selectedProvider.models && selectedProvider.models.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model
                    </label>
                    <select
                      name="selectedModel"
                      value={formData.selectedModel}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {selectedProvider.models.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                )
              )}

              {/* Connection Status */}
              <div className={`p-3 rounded-lg ${
                selectedProvider.connected 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-yellow-50 text-yellow-700'
              }`}>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={selectedProvider.connected ? FiCheck : FiAlertTriangle} className="w-5 h-5" />
                  <span>
                    {selectedProvider.connected ? 'Connected successfully' : 'Not connected'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  {isLoading && <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />}
                  <span>{isLoading ? 'Testing...' : 'Test & Save'}</span>
                </button>
                <button
                  type="button"
                  onClick={closeConfigModal}
                  className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIProviderConfigModal;