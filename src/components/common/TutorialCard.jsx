import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const { FiPlay, FiClock, FiUser, FiCalendar, FiHeart, FiBookmark, FiCheckCircle } = FiIcons;

const TutorialCard = ({ tutorial }) => {
  const { user } = useAuth();

  const handleStart = () => {
    if (!user) {
      toast.error('Please sign in to start tutorials');
      return;
    }
    toast.success('Tutorial started!');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{tutorial.title}</h3>
            <p className="text-sm text-gray-600">{tutorial.description}</p>
          </div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
            {tutorial.difficulty}
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <SafeIcon icon={FiClock} className="w-4 h-4" />
              <span>{tutorial.duration}</span>
            </span>
            <span className="flex items-center space-x-1">
              <SafeIcon icon={FiUser} className="w-4 h-4" />
              <span>{tutorial.author}</span>
            </span>
          </div>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
            {tutorial.category}
          </span>
        </div>

        {/* Steps Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">What you'll learn:</h4>
          <div className="space-y-1">
            {tutorial.steps.slice(0, 3).map((step, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                <span>{step}</span>
              </div>
            ))}
            {tutorial.steps.length > 3 && (
              <div className="text-sm text-gray-500">
                +{tutorial.steps.length - 3} more steps
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tutorial.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <SafeIcon icon={FiHeart} className="w-4 h-4" />
              <span>{tutorial.likes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <SafeIcon icon={FiPlay} className="w-4 h-4" />
              <span>{tutorial.completions}</span>
            </span>
          </div>
          <span className="flex items-center space-x-1">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>{tutorial.createdAt}</span>
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <SafeIcon icon={FiPlay} className="w-4 h-4" />
          <span>Start Tutorial</span>
        </button>
      </div>
    </motion.div>
  );
};

export default TutorialCard;