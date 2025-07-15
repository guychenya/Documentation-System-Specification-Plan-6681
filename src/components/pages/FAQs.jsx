import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDocumentation } from '../../context/DocumentationContext';
import FAQCard from '../common/FAQCard';

const { FiHelpCircle, FiSearch, FiFilter, FiTrendingUp, FiThumbsUp } = FiIcons;

const FAQs = () => {
  const { data } = useDocumentation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('helpful');

  const filteredFAQs = data.faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedFAQs = [...filteredFAQs].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'views':
        return b.views - a.views;
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const categories = ['all', ...new Set(data.faqs.map(f => f.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600">
          Find answers to common questions about Vibe-Coding
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="w-4 h-4 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
                onClick={() => setSortBy('helpful')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  sortBy === 'helpful' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
                <span>Helpful</span>
              </button>
              <button
                onClick={() => setSortBy('views')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  sortBy === 'views' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                <span>Popular</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {sortedFAQs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FAQCard faq={faq} />
          </motion.div>
        ))}
      </div>

      {sortedFAQs.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiHelpCircle} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
          <p className="text-gray-600">
            {searchQuery ? 'Try adjusting your search terms' : 'No FAQs match your current filters'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default FAQs;