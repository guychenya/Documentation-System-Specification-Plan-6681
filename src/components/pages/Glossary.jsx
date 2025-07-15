import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDocumentation } from '../../context/DocumentationContext';

const { FiBookOpen, FiSearch, FiFilter, FiTag, FiLink } = FiIcons;

const Glossary = () => {
  const { data } = useDocumentation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState('all');

  const filteredTerms = data.glossary.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesLetter = selectedLetter === 'all' || term.term.charAt(0).toLowerCase() === selectedLetter;
    return matchesSearch && matchesCategory && matchesLetter;
  });

  const sortedTerms = [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term));

  const categories = ['all', ...new Set(data.glossary.map(t => t.category))];
  const letters = ['all', ...'abcdefghijklmnopqrstuvwxyz'.split('')];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Glossary</h1>
        <p className="text-gray-600">
          Technical terms and definitions to help you understand coding concepts
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search terms and definitions..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Category Filter */}
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

        {/* Letter Filter */}
        <div className="flex flex-wrap gap-2">
          {letters.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedLetter === letter
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {letter === 'all' ? 'All' : letter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Terms List */}
      <div className="space-y-4">
        {sortedTerms.map((term, index) => (
          <motion.div
            key={term.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">{term.term}</h3>
              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md text-sm font-medium">
                {term.category}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{term.definition}</p>
            
            {term.examples && term.examples.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {term.examples.map((example, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm font-mono"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <SafeIcon icon={FiLink} className="w-4 h-4 mr-1" />
                  Related Terms:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {term.relatedTerms.map((relatedTerm, i) => (
                    <button
                      key={i}
                      onClick={() => setSearchQuery(relatedTerm)}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm hover:bg-blue-200 transition-colors"
                    >
                      {relatedTerm}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {sortedTerms.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiBookOpen} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No terms found</h3>
          <p className="text-gray-600">
            {searchQuery ? 'Try adjusting your search terms' : 'No terms match your current filters'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Glossary;