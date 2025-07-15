import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useDocumentation } from '../../context/DocumentationContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const { FiCopy, FiHeart, FiBookmark, FiCode, FiUser, FiCalendar, FiTag } = FiIcons;

const CodeSnippetCard = ({ snippet }) => {
  const { saveSnippet, savedSnippets } = useDocumentation();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(snippet.likes);

  const isSaved = savedSnippets.some(s => s.id === snippet.id);

  const handleCopy = () => {
    toast.success('Code copied to clipboard!');
  };

  const handleLike = () => {
    if (!user) {
      toast.error('Please sign in to like snippets');
      return;
    }
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleSave = () => {
    if (!user) {
      toast.error('Please sign in to save snippets');
      return;
    }
    if (!isSaved) {
      saveSnippet(snippet);
      toast.success('Snippet saved!');
    }
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
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{snippet.title}</h3>
            <p className="text-sm text-gray-600">{snippet.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(snippet.difficulty)}`}>
              {snippet.difficulty}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {snippet.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <SafeIcon icon={FiUser} className="w-4 h-4" />
              <span>{snippet.author}</span>
            </span>
            <span className="flex items-center space-x-1">
              <SafeIcon icon={FiCalendar} className="w-4 h-4" />
              <span>{snippet.createdAt}</span>
            </span>
          </div>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
            {snippet.category}
          </span>
        </div>
      </div>

      {/* Code */}
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <CopyToClipboard text={snippet.code} onCopy={handleCopy}>
            <button className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
              <SafeIcon icon={FiCopy} className="w-4 h-4" />
            </button>
          </CopyToClipboard>
        </div>
        <SyntaxHighlighter
          language={snippet.language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                isLiked 
                  ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <SafeIcon icon={FiHeart} className="w-4 h-4" />
              <span className="text-sm">{likes}</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                isSaved
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <SafeIcon icon={FiBookmark} className="w-4 h-4" />
              <span className="text-sm">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <SafeIcon icon={FiCode} className="w-4 h-4" />
            <span className="text-sm">{snippet.language}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeSnippetCard;