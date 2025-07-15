import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/pages/Dashboard';
import SearchResults from './components/pages/SearchResults';
import CodeSnippets from './components/pages/CodeSnippets';
import Tutorials from './components/pages/Tutorials';
import FAQs from './components/pages/FAQs';
import Glossary from './components/pages/Glossary';
import Profile from './components/pages/Profile';
import AIPersonas from './components/pages/AIPersonas';
import AuthModal from './components/auth/AuthModal';

// Context
import { AuthProvider } from './context/AuthContext';
import { DocumentationProvider } from './context/DocumentationContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <DocumentationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1e293b',
                  color: '#fff',
                  borderRadius: '8px',
                },
              }}
            />
            
            <Header 
              onMenuClick={() => setSidebarOpen(true)}
              onAuthClick={() => setAuthModalOpen(true)}
            />
            
            <div className="flex">
              <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
              
              <main className="flex-1 lg:ml-64 transition-all duration-300">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/snippets" element={<CodeSnippets />} />
                    <Route path="/tutorials" element={<Tutorials />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/glossary" element={<Glossary />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/ai-personas" element={<AIPersonas />} />
                  </Routes>
                </AnimatePresence>
              </main>
            </div>

            <AuthModal 
              isOpen={authModalOpen}
              onClose={() => setAuthModalOpen(false)}
            />
          </div>
        </Router>
      </DocumentationProvider>
    </AuthProvider>
  );
}

export default App;