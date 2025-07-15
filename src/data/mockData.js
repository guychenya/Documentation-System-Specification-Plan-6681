export const mockData = {
  snippets: [
    {
      id: '1',
      title: 'React useState Hook',
      description: 'Basic state management in React functional components',
      language: 'javascript',
      code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,
      tags: ['react', 'hooks', 'state', 'frontend'],
      category: 'React',
      author: 'Vibe Coding',
      createdAt: '2024-01-15',
      likes: 45,
      difficulty: 'Beginner'
    },
    {
      id: '2',
      title: 'Python List Comprehension',
      description: 'Efficient way to create lists in Python',
      language: 'python',
      code: `# Basic list comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# Nested list comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]
print(matrix)  # [[0, 0, 0], [0, 1, 2], [0, 2, 4]]`,
      tags: ['python', 'list-comprehension', 'loops', 'efficiency'],
      category: 'Python',
      author: 'Vibe Coding',
      createdAt: '2024-01-14',
      likes: 32,
      difficulty: 'Intermediate'
    },
    {
      id: '3',
      title: 'Express.js Route Handler',
      description: 'Creating RESTful API endpoints with Express.js',
      language: 'javascript',
      code: `const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// GET route
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

// POST route
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  
  // Save user logic here
  res.status(201).json({ message: 'User created', user: { name, email } });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      tags: ['nodejs', 'express', 'api', 'backend', 'rest'],
      category: 'Backend',
      author: 'Vibe Coding',
      createdAt: '2024-01-13',
      likes: 67,
      difficulty: 'Intermediate'
    },
    {
      id: '4',
      title: 'CSS Flexbox Layout',
      description: 'Modern CSS layout with Flexbox',
      language: 'css',
      code: `.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.item {
  flex: 1;
  min-height: 100px;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
}

.item:first-child {
  flex: 2; /* Takes twice the space */
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}`,
      tags: ['css', 'flexbox', 'layout', 'responsive', 'frontend'],
      category: 'CSS',
      author: 'Vibe Coding',
      createdAt: '2024-01-12',
      likes: 28,
      difficulty: 'Beginner'
    },
    {
      id: '5',
      title: 'JavaScript Async/Await',
      description: 'Modern asynchronous programming in JavaScript',
      language: 'javascript',
      code: `// Async function with error handling
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Using the async function
async function displayUser(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log('User:', user);
  } catch (error) {
    console.log('Failed to load user');
  }
}

// Multiple async operations
async function loadMultipleUsers(userIds) {
  const userPromises = userIds.map(id => fetchUserData(id));
  const users = await Promise.all(userPromises);
  return users;
}`,
      tags: ['javascript', 'async', 'await', 'promises', 'api'],
      category: 'JavaScript',
      author: 'Vibe Coding',
      createdAt: '2024-01-11',
      likes: 89,
      difficulty: 'Advanced'
    }
  ],
  
  tutorials: [
    {
      id: '1',
      title: 'Getting Started with React Hooks',
      description: 'Learn the fundamentals of React Hooks and how to use them effectively',
      content: 'Complete tutorial content here...',
      steps: [
        'Introduction to Hooks',
        'useState Hook',
        'useEffect Hook',
        'Custom Hooks',
        'Best Practices'
      ],
      category: 'React',
      difficulty: 'Beginner',
      duration: '45 minutes',
      tags: ['react', 'hooks', 'frontend', 'javascript'],
      author: 'Vibe Coding',
      createdAt: '2024-01-10',
      likes: 234,
      completions: 1567
    },
    {
      id: '2',
      title: 'Building REST APIs with Node.js',
      description: 'Create scalable REST APIs using Node.js and Express',
      content: 'Complete tutorial content here...',
      steps: [
        'Setting up Express',
        'Creating Routes',
        'Middleware',
        'Database Integration',
        'Authentication',
        'Error Handling'
      ],
      category: 'Backend',
      difficulty: 'Intermediate',
      duration: '2 hours',
      tags: ['nodejs', 'express', 'api', 'backend', 'rest'],
      author: 'Vibe Coding',
      createdAt: '2024-01-09',
      likes: 189,
      completions: 892
    },
    {
      id: '3',
      title: 'Python Data Analysis with Pandas',
      description: 'Master data manipulation and analysis using Pandas',
      content: 'Complete tutorial content here...',
      steps: [
        'Installing Pandas',
        'DataFrames and Series',
        'Data Cleaning',
        'Data Transformation',
        'Visualization',
        'Advanced Operations'
      ],
      category: 'Python',
      difficulty: 'Intermediate',
      duration: '1.5 hours',
      tags: ['python', 'pandas', 'data-analysis', 'data-science'],
      author: 'Vibe Coding',
      createdAt: '2024-01-08',
      likes: 156,
      completions: 743
    }
  ],
  
  faqs: [
    {
      id: '1',
      question: 'How do I get started with the Vibe-Coding App?',
      answer: 'To get started, create an account and complete the onboarding tutorial. The app will guide you through setting up your development environment and introduce you to the AI coding assistants.',
      category: 'Getting Started',
      tags: ['onboarding', 'setup', 'beginner'],
      helpful: 245,
      views: 1234
    },
    {
      id: '2',
      question: 'What programming languages are supported?',
      answer: 'Vibe-Coding supports JavaScript, Python, Java, C++, Go, Rust, and many more. Our AI personas are specialized in different languages and can provide tailored assistance.',
      category: 'Features',
      tags: ['languages', 'support', 'ai-personas'],
      helpful: 189,
      views: 987
    },
    {
      id: '3',
      question: 'How does the AI code completion work?',
      answer: 'Our AI analyzes your code context and provides intelligent suggestions. It learns from your coding patterns and preferences to offer more personalized completions over time.',
      category: 'AI Features',
      tags: ['ai', 'code-completion', 'machine-learning'],
      helpful: 167,
      views: 756
    },
    {
      id: '4',
      question: 'Can I save and organize my code snippets?',
      answer: 'Yes! You can save code snippets, organize them into collections, add tags, and share them with your team. The search functionality makes it easy to find snippets later.',
      category: 'Code Management',
      tags: ['snippets', 'organization', 'sharing'],
      helpful: 134,
      views: 623
    },
    {
      id: '5',
      question: 'Is there a mobile app available?',
      answer: 'Currently, Vibe-Coding is available as a web application that works on mobile browsers. A dedicated mobile app is in development and will be released soon.',
      category: 'Platform',
      tags: ['mobile', 'app', 'platform'],
      helpful: 89,
      views: 445
    }
  ],
  
  glossary: [
    {
      id: '1',
      term: 'API',
      definition: 'Application Programming Interface - a set of protocols and tools for building software applications',
      category: 'General',
      relatedTerms: ['REST', 'GraphQL', 'Endpoint'],
      examples: ['REST API', 'GraphQL API', 'Web API']
    },
    {
      id: '2',
      term: 'React Hook',
      definition: 'Functions that let you use state and other React features in functional components',
      category: 'React',
      relatedTerms: ['useState', 'useEffect', 'Component'],
      examples: ['useState', 'useEffect', 'useContext']
    },
    {
      id: '3',
      term: 'Async/Await',
      definition: 'JavaScript syntax for handling asynchronous operations in a more readable way',
      category: 'JavaScript',
      relatedTerms: ['Promise', 'Callback', 'Synchronous'],
      examples: ['async function', 'await fetch()', 'try/catch']
    },
    {
      id: '4',
      term: 'Middleware',
      definition: 'Software that acts as a bridge between different applications or components',
      category: 'Backend',
      relatedTerms: ['Express', 'Request', 'Response'],
      examples: ['Authentication middleware', 'Logging middleware', 'CORS middleware']
    },
    {
      id: '5',
      term: 'Flexbox',
      definition: 'CSS layout method for arranging elements in rows or columns with flexible sizing',
      category: 'CSS',
      relatedTerms: ['Grid', 'Layout', 'Responsive'],
      examples: ['justify-content', 'align-items', 'flex-direction']
    }
  ],
  
  aiPersonas: [
    {
      id: 'javascript-expert',
      name: 'JavaScript Expert',
      description: 'Specialized in modern JavaScript, ES6+, and web development',
      avatar: '🚀',
      specialties: ['JavaScript', 'ES6+', 'Web APIs', 'Performance'],
      personality: 'Enthusiastic about cutting-edge JavaScript features',
      responseStyle: 'Detailed with modern best practices'
    },
    {
      id: 'python-guru',
      name: 'Python Guru',
      description: 'Expert in Python programming, data science, and automation',
      avatar: '🐍',
      specialties: ['Python', 'Data Science', 'Machine Learning', 'Automation'],
      personality: 'Methodical and focused on clean, readable code',
      responseStyle: 'Pythonic solutions with clear explanations'
    },
    {
      id: 'react-specialist',
      name: 'React Specialist',
      description: 'Frontend expert specializing in React and modern UI development',
      avatar: '⚛️',
      specialties: ['React', 'Hooks', 'State Management', 'Performance'],
      personality: 'Component-focused with UX awareness',
      responseStyle: 'Modern React patterns with performance tips'
    },
    {
      id: 'backend-architect',
      name: 'Backend Architect',
      description: 'Server-side expert focused on scalable system design',
      avatar: '🏗️',
      specialties: ['System Design', 'APIs', 'Databases', 'Security'],
      personality: 'Security-conscious and scalability-focused',
      responseStyle: 'Architectural insights with security considerations'
    }
  ]
};