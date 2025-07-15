import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../context/AuthContext';
import { useDocumentation } from '../../context/DocumentationContext';

const { 
  FiUser, FiSettings, FiCode, FiBook, FiSearch, FiStar, 
  FiEdit3, FiSave, FiX, FiMail, FiCalendar, FiTrendingUp 
} = FiIcons;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { savedSnippets, recentSearches } = useDocumentation();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user || {});

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <SafeIcon icon={FiUser} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Please sign in</h3>
          <p className="text-gray-600">You need to be signed in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Saved Snippets', value: savedSnippets.length, icon: FiCode, color: 'bg-blue-500' },
    { label: 'Recent Searches', value: recentSearches.length, icon: FiSearch, color: 'bg-green-500' },
    { label: 'Completed Tutorials', value: user.progress?.completedTutorials || 0, icon: FiBook, color: 'bg-purple-500' },
    { label: 'Total Searches', value: user.progress?.searchQueries || 0, icon: FiTrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={isEditing ? FiX : FiEdit3} className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={editData.email || ''}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiCalendar} className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Member since</p>
                <p className="font-medium text-gray-900">January 2024</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Saved Snippets */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SafeIcon icon={FiCode} className="w-5 h-5 mr-2" />
            Saved Snippets
          </h3>
          <div className="space-y-3">
            {savedSnippets.length > 0 ? (
              savedSnippets.slice(0, 5).map((snippet, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <SafeIcon icon={FiCode} className="w-4 h-4 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{snippet.title}</p>
                    <p className="text-xs text-gray-500">
                      Saved {new Date(snippet.savedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No saved snippets yet</p>
            )}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SafeIcon icon={FiSearch} className="w-5 h-5 mr-2" />
            Recent Searches
          </h3>
          <div className="space-y-3">
            {recentSearches.length > 0 ? (
              recentSearches.slice(0, 5).map((search, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <SafeIcon icon={FiSearch} className="w-4 h-4 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">"{search}"</p>
                    <p className="text-xs text-gray-500">Recent search</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent searches</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;