import React, { createContext, useContext, useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { mockData } from '../data/mockData';

const DocumentationContext = createContext();

export const useDocumentation = () => {
  const context = useContext(DocumentationContext);
  if (!context) {
    throw new Error('useDocumentation must be used within a DocumentationProvider');
  }
  return context;
};

export const DocumentationProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedSnippets, setSavedSnippets] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse([...mockData.snippets, ...mockData.tutorials, ...mockData.faqs], {
    keys: ['title', 'description', 'tags', 'content', 'question', 'answer'],
    threshold: 0.3,
    includeScore: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem('vibe-coding-saved-snippets');
    if (saved) {
      setSavedSnippets(JSON.parse(saved));
    }

    const searches = localStorage.getItem('vibe-coding-recent-searches');
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  }, []);

  const search = async (query) => {
    setLoading(true);
    setSearchQuery(query);
    
    // Add to recent searches
    const newSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
    setRecentSearches(newSearches);
    localStorage.setItem('vibe-coding-recent-searches', JSON.stringify(newSearches));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (query.trim() === '') {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const results = fuse.search(query).map(result => ({
      ...result.item,
      score: result.score,
    }));

    setSearchResults(results);
    setLoading(false);
  };

  const saveSnippet = (snippet) => {
    const newSaved = [...savedSnippets, { ...snippet, savedAt: new Date().toISOString() }];
    setSavedSnippets(newSaved);
    localStorage.setItem('vibe-coding-saved-snippets', JSON.stringify(newSaved));
  };

  const removeSavedSnippet = (snippetId) => {
    const newSaved = savedSnippets.filter(s => s.id !== snippetId);
    setSavedSnippets(newSaved);
    localStorage.setItem('vibe-coding-saved-snippets', JSON.stringify(newSaved));
  };

  const getAIPersonaResponse = async (persona, query) => {
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = {
      'javascript-expert': `Here's a JavaScript solution for "${query}": Consider using modern ES6+ features and async/await patterns.`,
      'python-guru': `For "${query}" in Python, I recommend using list comprehensions and the standard library.`,
      'react-specialist': `React approach for "${query}": Use hooks and functional components for better performance.`,
      'backend-architect': `Backend solution for "${query}": Focus on scalability, security, and proper error handling.`,
    };

    return responses[persona] || `AI response for "${query}" from ${persona}`;
  };

  const value = {
    searchResults,
    searchQuery,
    loading,
    savedSnippets,
    recentSearches,
    search,
    saveSnippet,
    removeSavedSnippet,
    getAIPersonaResponse,
    data: mockData,
  };

  return (
    <DocumentationContext.Provider value={value}>
      {children}
    </DocumentationContext.Provider>
  );
};