import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDocumentation } from '../../context/DocumentationContext';
import CodeSnippetCard from '../common/CodeSnippetCard';

const { FiCode, FiFilter, FiPlus, FiTrendingUp, FiClock, FiStar } = FiIcons;

const CodeSnippets = () => {
  const { data } = useDocumentation();
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const filteredSnippets = data.snippets.filter(snippet => {
    if (filterBy === 'all') return true;
    return snippet.category === filterBy;
  });

  const sortedSnippets = [...filteredSnippets].sort((a, b) => {
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

  const categories = ['all', ...new Set(data.snippets.map(s => s.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Snippets</h1>
          <p className="text-gray-600">
            Discover and save useful code snippets for your projects
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Snippet</span>
        </button>
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

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedSnippets.map((snippet, index) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CodeSnippetCard snippet={snippet} />
          </motion.div>
        ))}
      </div>

      {sortedSnippets.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiCode} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No snippets found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or add your first snippet.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CodeSnippets;