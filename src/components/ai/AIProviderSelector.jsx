import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAIProvider } from '../../context/AIProviderContext';

const { FiSettings, FiCheckCircle } = FiIcons;

const AIProviderSelector = () => {
  const { 
    providers, 
    activeProvider, 
    setActiveProvider, 
    openConfigModal 
  } = useAIProvider();

  return (
    <div className="px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 mb-3">AI Provider</h3>
      <div className="space-y-2">
        {providers.map((provider) => (
          <motion.div 
            key={provider.id}
            whileHover={{ x: 2 }}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
              activeProvider === provider.id 
                ? 'bg-primary-50 border border-primary-100' 
                : 'hover:bg-gray-50 border border-transparent'
            }`}
            onClick={() => {
              if (provider.connected || provider.id === 'vibe') {
                setActiveProvider(provider.id);
              } else {
                openConfigModal(provider.id);
              }
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="text-xl">{provider.logo}</div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-gray-900">{provider.name}</span>
                  {provider.connected && (
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  )}
                </div>
                {provider.selectedModel && provider.connected && (
                  <p className="text-xs text-gray-500">{provider.selectedModel}</p>
                )}
              </div>
            </div>
            
            {provider.configurable && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openConfigModal(provider.id);
                }}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <SafeIcon icon={FiSettings} className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIProviderSelector;