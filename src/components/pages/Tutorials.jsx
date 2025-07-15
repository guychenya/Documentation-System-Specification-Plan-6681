import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDocumentation } from '../../context/DocumentationContext';
import TutorialCard from '../common/TutorialCard';

const { FiBook, FiFilter, FiClock, FiTrendingUp, FiStar, FiPlay } = FiIcons;

const Tutorials = () => {
  const { data } = useDocumentation();
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const filteredTutorials = data.tutorials.filter(tutorial => {
    if (filterBy === 'all') return true;
    return tutorial.category === filterBy;
  });

  const sortedTutorials = [...filteredTutorials].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      default:
        return 0;
    }
  });

  const categories = ['all', ...new Set(data.tutorials.map(t => t.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tutorials</h1>
        <p className="text-gray-600">
          Step-by-step guides to master new skills and technologies
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <SafeIcon icon={FiBook} className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{data.tutorials.length}</p>
              <p className="text-sm text-gray-600">Total Tutorials</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <SafeIcon icon={FiPlay} className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {data.tutorials.reduce((sum, t) => sum + t.completions, 0)}
              </p>
              <p className="text-sm text-gray-600">Completions</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <SafeIcon icon={FiClock} className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(data.tutorials.reduce((sum, t) => {
                  const duration = parseInt(t.duration.split(' ')[0]);
                  return sum + duration;
                }, 0) / data.tutorials.length)}m
              </p>
              <p className="text-sm text-gray-600">Avg Duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="w-4 h-4 text-gray-600" />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setSortBy('recent')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                sortBy === 'recent' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiClock} className="w-4 h-4" />
              <span>Recent</span>
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                sortBy === 'popular' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
              <span>Popular</span>
            </button>
            <button
              onClick={() => setSortBy('difficulty')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                sortBy === 'difficulty' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiStar} className="w-4 h-4" />
              <span>Difficulty</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedTutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TutorialCard tutorial={tutorial} />
          </motion.div>
        ))}
      </div>

      {sortedTutorials.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiBook} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials found</h3>
          <p className="text-gray-600">
            Try adjusting your filters to find tutorials that match your interests.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Tutorials;