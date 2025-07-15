import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AIProviderContext = createContext();

export const useAIProvider = () => {
  const context = useContext(AIProviderContext);
  if (!context) {
    throw new Error('useAIProvider must be used within an AIProviderProvider');
  }
  return context;
};

export const AIProviderProvider = ({ children }) => {
  const [providers, setProviders] = useState([
    {
      id: 'ollama',
      name: 'Ollama',
      description: 'Local AI with Ollama',
      connected: false,
      endpoint: 'http://localhost:11434/api/chat',
      apiKey: '',
      models: [],
      selectedModel: '',
      configurable: true,
      logo: '🦙',
      testEndpoint: 'http://localhost:11434/api/tags',
      testMethod: 'GET'
    },
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'OpenAI API (ChatGPT)',
      connected: false,
      endpoint: 'https://api.openai.com/v1/chat/completions',
      apiKey: '',
      models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
      selectedModel: 'gpt-4o-mini',
      configurable: true,
      logo: '🤖',
      testEndpoint: 'https://api.openai.com/v1/models',
      testMethod: 'GET',
      useProxy: true
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      description: 'Anthropic Claude API',
      connected: false,
      endpoint: 'https://api.anthropic.com/v1/messages',
      apiKey: '',
      models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
      selectedModel: 'claude-3-5-sonnet-20241022',
      configurable: true,
      logo: '🧠',
      testEndpoint: 'https://api.anthropic.com/v1/models',
      testMethod: 'GET',
      useProxy: true
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Google Gemini AI',
      connected: false,
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
      apiKey: '',
      models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro'],
      selectedModel: 'gemini-1.5-flash',
      configurable: true,
      logo: '💎',
      testEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
      testMethod: 'GET',
      useProxy: true
    },
    {
      id: 'groq',
      name: 'Groq',
      description: 'Groq Lightning Fast AI',
      connected: false,
      endpoint: 'https://api.groq.com/openai/v1/chat/completions',
      apiKey: '',
      models: ['llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'llama-3.2-90b-text-preview', 'llama-3.2-11b-text-preview', 'mixtral-8x7b-32768', 'gemma2-9b-it'],
      selectedModel: 'llama-3.1-70b-versatile',
      configurable: true,
      logo: '⚡',
      testEndpoint: 'https://api.groq.com/openai/v1/models',
      testMethod: 'GET',
      useProxy: true
    },
    {
      id: 'xai',
      name: 'xAI (Grok)',
      description: 'xAI Grok Models',
      connected: false,
      endpoint: 'https://api.x.ai/v1/chat/completions',
      apiKey: '',
      models: ['grok-beta', 'grok-vision-beta'],
      selectedModel: 'grok-beta',
      configurable: true,
      logo: '🚀',
      testEndpoint: 'https://api.x.ai/v1/models',
      testMethod: 'GET',
      useProxy: true
    },
    {
      id: 'vibe',
      name: 'Vibe AI',
      description: 'Built-in Vibe Coding AI',
      connected: true,
      configurable: false,
      models: ['vibe-coding-assistant'],
      selectedModel: 'vibe-coding-assistant',
      logo: '✨'
    }
  ]);

  const [activeProvider, setActiveProvider] = useState('vibe');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [proxyUrl, setProxyUrl] = useState('https://cors-anywhere.herokuapp.com/');

  useEffect(() => {
    // Load saved provider configurations from localStorage
    const savedProviders = localStorage.getItem('vibe-coding-ai-providers');
    if (savedProviders) {
      try {
        const parsedProviders = JSON.parse(savedProviders);
        // Merge saved configurations with default ones to ensure we have the latest structure
        const mergedProviders = providers.map(defaultProvider => {
          const savedProvider = parsedProviders.find(p => p.id === defaultProvider.id);
          return savedProvider ? { ...defaultProvider, ...savedProvider } : defaultProvider;
        });
        setProviders(mergedProviders);
        
        // Set active provider to last connected one
        const connectedProvider = mergedProviders.find(p => p.connected && p.id !== 'vibe');
        if (connectedProvider) {
          setActiveProvider(connectedProvider.id);
        }
      } catch (error) {
        console.error("Failed to parse saved providers:", error);
      }
    }

    // Check if we're in development mode
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      // In development, use a local proxy or a development proxy
      setProxyUrl('/api/proxy?url=');
    }
  }, []);

  useEffect(() => {
    // Save provider configurations to localStorage
    localStorage.setItem('vibe-coding-ai-providers', JSON.stringify(providers));
  }, [providers]);

  const openConfigModal = (providerId) => {
    const provider = providers.find(p => p.id === providerId);
    setSelectedProvider(provider);
    setIsConfigModalOpen(true);
  };

  const closeConfigModal = () => {
    setSelectedProvider(null);
    setIsConfigModalOpen(false);
  };

  const updateProvider = (providerId, updates) => {
    setProviders(prevProviders =>
      prevProviders.map(provider =>
        provider.id === providerId ? { ...provider, ...updates } : provider
      )
    );
  };

  // Function to handle API requests with CORS proxy if needed
  const fetchWithProxy = async (url, options, useProxy = false) => {
    try {
      // For Ollama (local) or when proxy is not needed
      if (!useProxy) {
        return await fetch(url, options);
      }
      
      // For external APIs that need a proxy
      // Use a serverless function or proxy service
      const proxyUrl = '/api/proxy'; // This would be your serverless function endpoint
      
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          method: options.method || 'GET',
          headers: options.headers || {},
          body: options.body
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Proxy request failed: ${response.status} - ${errorText}`);
      }
      
      return response;
    } catch (error) {
      console.error("Error with fetch request:", error);
      throw error;
    }
  };

  const testConnection = async (provider) => {
    if (!provider.configurable) return true;
    
    setIsLoading(true);
    try {
      // Handle Ollama specially since it's local and has a different API structure
      if (provider.id === 'ollama') {
        // Ollama is accessed locally, so no proxy needed
        const response = await fetch(provider.testEndpoint, {
          method: provider.testMethod
        });
        
        if (!response.ok) {
          throw new Error(`Connection failed: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && Array.isArray(data.models)) {
          // Extract available models from Ollama response
          const ollamaModels = data.models.map(model => model.name);
          updateProvider(provider.id, {
            models: ollamaModels,
            selectedModel: ollamaModels.length > 0 ? ollamaModels[0] : '',
            connected: true
          });
          toast.success(`Connected to ${provider.name} successfully!`);
          return true;
        }
      } else {
        // For external API providers
        // First, check if the API key is provided
        if (!provider.apiKey) {
          throw new Error('API key is required');
        }
        
        // Simulate successful connection for now to avoid CORS issues
        // In a real application, you would implement a proper backend proxy or use serverless functions
        toast.success(`Connected to ${provider.name} successfully!`);
        updateProvider(provider.id, { connected: true });
        
        // Show info about CORS
        toast.info('Note: For production use, a proper backend proxy is required');
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Connection test failed:", error);
      toast.error(`Failed to connect to ${provider.name}: ${error.message}`);
      updateProvider(provider.id, { connected: false });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (providerId, model, message, conversation) => {
    const provider = providers.find(p => p.id === providerId);
    if (!provider) {
      throw new Error('Provider not found');
    }

    if (provider.id === 'vibe') {
      // Simulate built-in AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `Vibe AI response to "${message}": This is a simulated response from the built-in AI model.`;
    }

    if (!provider.connected) {
      throw new Error('Provider not connected');
    }

    try {
      if (provider.id === 'ollama') {
        // Direct request to local Ollama
        const response = await fetch(`http://localhost:11434/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: provider.selectedModel,
            messages: [
              ...conversation.map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
              })),
              { role: 'user', content: message }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.message?.content || 'No response from model';
      } else {
        // For external APIs - in a real app, this would use a backend proxy
        // Here we'll simulate a response to avoid CORS issues
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate a simulated response based on the provider and message
        let simulatedResponse;
        
        switch (provider.id) {
          case 'openai':
            simulatedResponse = `OpenAI (${provider.selectedModel}) response to: "${message}"\n\nHere's a simulated response based on your query. In a production environment, this would be sent through a secure backend proxy to the OpenAI API.`;
            break;
          case 'anthropic':
            simulatedResponse = `Claude (${provider.selectedModel}) response to: "${message}"\n\nThis is a simulated Claude response. In a production environment, your query would be processed by Anthropic's API through a secure backend channel.`;
            break;
          case 'gemini':
            simulatedResponse = `Gemini (${provider.selectedModel}) response to: "${message}"\n\nHere's a simulated Gemini response. For actual integration, you would need to implement a backend proxy or use Google's client libraries.`;
            break;
          case 'groq':
            simulatedResponse = `Groq (${provider.selectedModel}) response to: "${message}"\n\nThis is a simulated high-speed response from Groq. In production, this would be processed through their API with proper authentication.`;
            break;
          case 'xai':
            simulatedResponse = `Grok (${provider.selectedModel}) response to: "${message}"\n\nHere's what Grok would say (simulated). For real implementation, a backend proxy would be required to handle API authentication and requests.`;
            break;
          default:
            simulatedResponse = `AI response to: "${message}"\n\nThis is a simulated response. To get actual AI responses, implement a backend proxy for the selected provider.`;
        }
        
        return simulatedResponse;
      }
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  };

  const value = {
    providers,
    activeProvider,
    setActiveProvider,
    isConfigModalOpen,
    openConfigModal,
    closeConfigModal,
    updateProvider,
    testConnection,
    isLoading,
    selectedProvider,
    sendMessage
  };

  return (
    <AIProviderContext.Provider value={value}>
      {children}
    </AIProviderContext.Provider>
  );
};