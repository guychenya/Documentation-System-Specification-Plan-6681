import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiServer, FiShield, FiGlobe, FiCode, FiAlertTriangle } = FiIcons;

const AIProxyExplainer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">About CORS and API Proxies</h2>
          <p className="text-gray-600">
            Understanding why direct API calls to AI providers may be blocked in browser applications.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <SafeIcon icon={FiAlertTriangle} className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">The CORS Issue</h3>
              <p className="text-gray-700">
                Cross-Origin Resource Sharing (CORS) is a security feature implemented by browsers that 
                prevents web pages from making requests to a different domain than the one that served 
                the web page. Most AI API providers don't allow direct browser requests.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <SafeIcon icon={FiServer} className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">The Solution: Backend Proxy</h3>
              <p className="text-gray-700">
                In a production application, you would implement a backend proxy server or serverless 
                functions that handle API requests on behalf of your frontend. This keeps your API keys 
                secure and bypasses CORS restrictions.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <SafeIcon icon={FiShield} className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Security Benefits</h3>
              <p className="text-gray-700">
                Using a backend proxy also provides important security benefits:
              </p>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                <li>Keeps API keys private and not exposed in browser code</li>
                <li>Enables request validation and rate limiting</li>
                <li>Allows for logging and monitoring of API usage</li>
                <li>Can implement caching to reduce API costs</li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <SafeIcon icon={FiCode} className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Implementation Options</h3>
              <p className="text-gray-700">
                There are several ways to implement a backend proxy:
              </p>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                <li>Node.js server with Express</li>
                <li>Serverless functions (AWS Lambda, Vercel Functions, Netlify Functions)</li>
                <li>Backend-as-a-Service solutions</li>
                <li>Dedicated API gateways</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIProxyExplainer;