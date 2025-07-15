import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDocumentation } from '../../context/DocumentationContext';
import CodeSnippetCard from '../common/CodeSnippetCard';
import TutorialCard from '../common/TutorialCard';
import FAQCard from '../common/FAQCard';

const { FiSearch, FiFilter, FiX, FiCode, FiBook, FiHelpCircle } = FiIcons;

const SearchResults = () => {
  const { searchResults, searchQuery, loading, search } = useDocumentation();
  const [filters, setFilters] = useState({
    type: 'all',
    difficulty: 'all',
    category: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredResults = searchResults.filter(result => {
    if (filters.type !== 'all') {
      if (filters.type === 'snippets' && !result.code) return false;
      if (filters.type === 'tutorials' && !result.steps) return false;
      if (filters.type === 'faqs' && !result.question) return false;
    }
    
    if (filters.difficulty !== 'all' && result.difficulty !== filters.difficulty) {
      return false;
    }
    
    if (filters.category !== 'all' && result.category !== filters.category) {
      return false;
    }
    
    return true;
  });

  const resultTypes = {
    snippets: filteredResults.filter(r => r.code),
    tutorials: filteredResults.filter(r => r.steps),
    faqs: filteredResults.filter(r => r.question),
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      difficulty: 'all',
      category: 'all',
    });
  };

  const getResultIcon = (result) => {
    if (result.code) return FiCode;
    if (result.steps) return FiBook;
    if (result.question) return FiHelpCircle;
    return FiSearch;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
        {searchQuery && (
          <p className="text-gray-600">
            {loading ? 'Searching...' : `Found ${filteredResults.length} results for "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiFilter} className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          {(filters.type !== 'all' || filters.difficulty !== 'all' || filters.category !== 'all') && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="snippets">Code Snippets</option>
                  <option value="tutorials">Tutorials</option>
                  <option value="faqs">FAQs</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="React">React</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="CSS">CSS</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="space-y-6">
          {/* Code Snippets */}
          {resultTypes.snippets.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiCode} className="w-5 h-5 mr-2" />
                Code Snippets ({resultTypes.snippets.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {resultTypes.snippets.map((snippet) => (
                  <CodeSnippetCard key={snippet.id} snippet={snippet} />
                ))}
              </div>
            </div>
          )}

          {/* Tutorials */}
          {resultTypes.tutorials.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiBook} className="w-5 h-5 mr-2" />
                Tutorials ({resultTypes.tutorials.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {resultTypes.tutorials.map((tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {resultTypes.faqs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiHelpCircle} className="w-5 h-5 mr-2" />
                FAQs ({resultTypes.faqs.length})
              </h2>
              <div className="space-y-4">
                {resultTypes.faqs.map((faq) => (
                  <FAQCard key={faq.id} faq={faq} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : searchQuery ? (
        <div className="text-center py-12">
          <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start searching</h3>
          <p className="text-gray-600">
            Use the search bar above to find code snippets, tutorials, and documentation.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SearchResults;