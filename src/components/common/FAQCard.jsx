import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const { FiChevronDown, FiChevronUp, FiThumbsUp, FiThumbsDown, FiEye, FiTag } = FiIcons;

const FAQCard = ({ faq }) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHelpful, setIsHelpful] = useState(null);
  const [helpfulCount, setHelpfulCount] = useState(faq.helpful);

  const handleHelpful = (helpful) => {
    if (!user) {
      toast.error('Please sign in to rate FAQs');
      return;
    }
    
    if (isHelpful === helpful) {
      setIsHelpful(null);
      setHelpfulCount(helpful ? helpfulCount - 1 : helpfulCount + 1);
    } else {
      const prevHelpful = isHelpful;
      setIsHelpful(helpful);
      
      if (prevHelpful === null) {
        setHelpfulCount(helpful ? helpfulCount + 1 : helpfulCount - 1);
      } else {
        setHelpfulCount(helpful ? helpfulCount + 2 : helpfulCount - 2);
      }
    }
    
    toast.success(helpful ? 'Marked as helpful' : 'Marked as not helpful');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Question Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>{faq.views} views</span>
              </span>
              <span className="flex items-center space-x-1">
                <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
                <span>{helpfulCount} helpful</span>
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                {faq.category}
              </span>
            </div>
          </div>
          <SafeIcon 
            icon={isExpanded ? FiChevronUp : FiChevronDown} 
            className="w-5 h-5 text-gray-400" 
          />
        </div>
      </div>

      {/* Answer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200"
          >
            <div className="p-4">
              <p className="text-gray-700 mb-4">{faq.answer}</p>
              
              {/* Tags */}
              {faq.tags && faq.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {faq.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Was this helpful?</span>
                  <button
                    onClick={() => handleHelpful(true)}
                    className={`p-2 rounded-md transition-colors ${
                      isHelpful === true
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <SafeIcon icon={FiThumbsUp} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleHelpful(false)}
                    className={`p-2 rounded-md transition-colors ${
                      isHelpful === false
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <SafeIcon icon={FiThumbsDown} className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {helpfulCount} people found this helpful
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQCard;