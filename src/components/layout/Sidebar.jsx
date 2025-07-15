import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiHome, FiSearch, FiCode, FiBook, FiHelpCircle, 
  FiBookOpen, FiUser, FiBot, FiX, FiStar, FiClock 
} = FiIcons;

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/search', icon: FiSearch, label: 'Search' },
    { path: '/snippets', icon: FiCode, label: 'Code Snippets' },
    { path: '/tutorials', icon: FiBook, label: 'Tutorials' },
    { path: '/faqs', icon: FiHelpCircle, label: 'FAQs' },
    { path: '/glossary', icon: FiBookOpen, label: 'Glossary' },
    { path: '/ai-personas', icon: FiBot, label: 'AI Personas' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
  ];

  const quickLinks = [
    { label: 'Popular Snippets', icon: FiStar },
    { label: 'Recent Searches', icon: FiClock },
    { label: 'Saved Items', icon: FiBookOpen },
  ];

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Quick Links */}
          <div className="px-4 py-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors w-full text-left"
                >
                  <SafeIcon icon={link.icon} className="w-4 h-4" />
                  <span className="text-sm">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;