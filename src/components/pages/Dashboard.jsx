import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../context/AuthContext';
import { useDocumentation } from '../../context/DocumentationContext';

const { 
  FiCode, FiBook, FiSearch, FiTrendingUp, FiUsers, 
  FiStar, FiClock, FiArrowRight, FiZap, FiTarget 
} = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { data, recentSearches, savedSnippets } = useDocumentation();

  const stats = [
    { label: 'Code Snippets', value: data.snippets.length, icon: FiCode, color: 'bg-blue-500' },
    { label: 'Tutorials', value: data.tutorials.length, icon: FiBook, color: 'bg-green-500' },
    { label: 'FAQs', value: data.faqs.length, icon: FiSearch, color: 'bg-purple-500' },
    { label: 'AI Personas', value: data.aiPersonas.length, icon: FiUsers, color: 'bg-orange-500' },
  ];

  const quickActions = [
    { label: 'Search Documentation', icon: FiSearch, path: '/search', color: 'bg-blue-500' },
    { label: 'Browse Snippets', icon: FiCode, path: '/snippets', color: 'bg-green-500' },
    { label: 'View Tutorials', icon: FiBook, path: '/tutorials', color: 'bg-purple-500' },
    { label: 'Ask AI Personas', icon: FiZap, path: '/ai-personas', color: 'bg-orange-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome{user ? `, ${user.name}` : ' to Vibe-Coding Docs'}!
        </h1>
        <p className="text-gray-600">
          Your comprehensive documentation and coding assistant platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={action.path}
                className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`${action.color} p-2 rounded-lg`}>
                      <SafeIcon icon={action.icon} className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{action.label}</span>
                  </div>
                  <SafeIcon 
                    icon={FiArrowRight} 
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" 
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Popular Snippets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Popular Snippets</h3>
            <SafeIcon icon={FiStar} className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {data.snippets.slice(0, 3).map((snippet) => (
              <div key={snippet.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiCode} className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{snippet.title}</p>
                  <p className="text-xs text-gray-500">{snippet.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/snippets"
            className="block mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View all snippets →
          </Link>
        </motion.div>

        {/* Recent Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tutorials</h3>
            <SafeIcon icon={FiBook} className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            {data.tutorials.slice(0, 3).map((tutorial) => (
              <div key={tutorial.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiBook} className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{tutorial.title}</p>
                  <p className="text-xs text-gray-500">{tutorial.duration}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/tutorials"
            className="block mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View all tutorials →
          </Link>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <SafeIcon icon={FiClock} className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            {recentSearches.length > 0 ? (
              recentSearches.slice(0, 3).map((search, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiSearch} className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Searched "{search}"</p>
                    <p className="text-xs text-gray-500">Recent</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent activity</p>
            )}
          </div>
          {user && (
            <Link
              to="/profile"
              className="block mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View profile →
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;