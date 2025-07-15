import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiGithub, 
  FiGlobe, 
  FiCode, 
  FiTerminal, 
  FiGitBranch, 
  FiGitCommit, 
  FiGitPullRequest, 
  FiAlertTriangle, 
  FiSettings,
  FiCheckCircle,
  FiArrowRight,
  FiLink,
  FiPlusCircle,
  FiEdit,
  FiCloud,
  FiLayers,
  FiInfo,
  FiExternalLink,
  FiBook,
  FiVideo,
  FiTag,
  FiSearch,
  FiPlay
} = FiIcons;

const GitHubNetlifySync = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Synchronizing GitHub and Netlify
        </h1>
        <p className="text-gray-600">
          A comprehensive guide to setting up continuous deployment from GitHub to Netlify
        </p>
      </div>

      {/* Overview */}
      <section className="mb-10">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg text-white">
              <SafeIcon icon={FiGlobe} className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Continuous Deployment Workflow</h2>
              <p className="text-gray-700 mb-4">
                Connecting GitHub to Netlify creates a seamless workflow where code changes are automatically deployed. This eliminates manual deployments and ensures your live site always reflects the current state of your codebase.
              </p>
              
              <div className="flex items-center justify-between my-8">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-2">
                    <SafeIcon icon={FiCode} className="w-8 h-8 text-gray-700" />
                  </div>
                  <span className="text-sm text-gray-600">Local Code</span>
                </div>
                
                <SafeIcon icon={FiArrowRight} className="w-5 h-5 text-gray-400" />
                
                <div className="flex flex-col items-center">
                  <div className="bg-gray-800 p-4 rounded-full mb-2">
                    <SafeIcon icon={FiGithub} className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">GitHub</span>
                </div>
                
                <SafeIcon icon={FiArrowRight} className="w-5 h-5 text-gray-400" />
                
                <div className="flex flex-col items-center">
                  <div className="bg-teal-600 p-4 rounded-full mb-2">
                    <SafeIcon icon={FiCloud} className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">Netlify</span>
                </div>
                
                <SafeIcon icon={FiArrowRight} className="w-5 h-5 text-gray-400" />
                
                <div className="flex flex-col items-center">
                  <div className="bg-green-500 p-4 rounded-full mb-2">
                    <SafeIcon icon={FiGlobe} className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">Live Site</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Connect GitHub to Netlify */}
      <section className="mb-10">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-gray-800 p-3 rounded-lg text-white">
              <SafeIcon icon={FiLink} className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Step 1: Connect GitHub to Netlify</h2>
              
              <div className="space-y-6 mt-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">1</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Log in to Netlify</h3>
                  </div>
                  <p className="text-gray-600 ml-11">
                    Go to <a href="https://app.netlify.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">app.netlify.com</a> and sign in with your account.
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">2</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Add a new site</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Click the "Add new site" button and select "Import an existing project" from the dropdown menu.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <SafeIcon icon={FiPlusCircle} className="w-5 h-5 text-teal-600" />
                        <span className="font-medium">Add new site</span>
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                        <span className="font-medium">Import an existing project</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">3</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Connect to GitHub</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Select GitHub as your repository provider. If this is your first time, you'll need to authorize Netlify to access your GitHub account.
                    </p>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gray-800 p-2 rounded-lg">
                        <SafeIcon icon={FiGithub} className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <SafeIcon icon={FiGithub} className="w-5 h-5 text-gray-700" />
                      </div>
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <SafeIcon icon={FiGithub} className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: Push Code Changes */}
      <section className="mb-10">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-blue-600 p-3 rounded-lg text-white">
              <SafeIcon icon={FiGitCommit} className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Step 2: Push Code Changes for Automatic Deployments</h2>
              
              <p className="text-gray-700 mb-4">
                Once your site is connected to Netlify, any changes pushed to your GitHub repository will trigger automatic deployments.
              </p>
              
              <div className="space-y-6 mt-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">1</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Make changes to your project</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Edit files in your local project directory to make the desired changes to your website.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <SafeIcon icon={FiEdit} className="w-5 h-5 text-blue-600" />
                        <p className="text-sm">
                          Example: Update the content, fix bugs, or add new features to your application.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">2</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Stage and commit your changes</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Use Git commands to stage and commit your changes with a descriptive message.
                    </p>
                    <div className="bg-gray-800 p-3 rounded-lg text-green-400 font-mono text-sm mb-3 overflow-x-auto">
                      <div>$ git add .</div>
                      <div>$ git commit -m "Update landing page content and fix navigation bug"</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">3</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Push changes to GitHub</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Push your committed changes to the GitHub repository to trigger the Netlify deployment.
                    </p>
                    <div className="bg-gray-800 p-3 rounded-lg text-green-400 font-mono text-sm mb-3">
                      <div>$ git push origin main</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Manage Branches and Tags */}
      <section className="mb-10">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-purple-600 p-3 rounded-lg text-white">
              <SafeIcon icon={FiGitBranch} className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Step 3: Manage Branches and Tags</h2>
              
              <p className="text-gray-700 mb-4">
                Effectively manage different environments and versions using Git branches and tags with Netlify.
              </p>
              
              <div className="space-y-6 mt-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">1</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Use branch-based workflows</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Create and use different branches for various purposes in your development workflow.
                    </p>
                    <div className="bg-gray-800 p-3 rounded-lg text-green-400 font-mono text-sm mb-3">
                      <div>$ git checkout -b feature/new-contact-form</div>
                      <div>$ git push origin feature/new-contact-form</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">2</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Configure branch deploys in Netlify</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Set up Netlify to deploy different branches to separate environments.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <ol className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="mr-2">1.</span>
                          <span>Go to your site's dashboard in Netlify</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">2.</span>
                          <span>Navigate to Site settings, then Build &amp; deploy, then Deploy contexts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">3.</span>
                          <span>Configure which branches should deploy and where</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">3</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Use Git tags for stable releases</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Tag specific commits to mark stable releases or versions of your project.
                    </p>
                    <div className="bg-gray-800 p-3 rounded-lg text-green-400 font-mono text-sm mb-3">
                      <div>$ git tag v1.0.0</div>
                      <div>$ git push origin v1.0.0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: Best Practices */}
      <section className="mb-10">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-green-600 p-3 rounded-lg text-white">
              <SafeIcon icon={FiGitPullRequest} className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Step 4: Best Practices for Commits and Pull Requests</h2>
              
              <p className="text-gray-700 mb-4">
                Follow these best practices to maintain a clean, organized Git history and streamline your deployment process.
              </p>
              
              <div className="space-y-6 mt-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">1</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Write meaningful commit messages</h3>
                  </div>
                  <div className="ml-11">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <h4 className="text-sm font-medium text-green-700 mb-1">Good Commit Messages ✅</h4>
                        <div className="bg-green-50 p-3 rounded-lg text-sm text-gray-700 space-y-2">
                          <p>"Add responsive navigation for mobile devices"</p>
                          <p>"Fix authentication bug in login form"</p>
                          <p>"Update product pricing on homepage"</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-red-700 mb-1">Poor Commit Messages ❌</h4>
                        <div className="bg-red-50 p-3 rounded-lg text-sm text-gray-700 space-y-2">
                          <p>"Fix stuff"</p>
                          <p>"Updates"</p>
                          <p>"WIP"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium text-gray-700">2</span>
                    </div>
                    <h3 className="font-medium text-gray-800">Use pull requests for code reviews</h3>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 mb-3">
                      Create pull requests when merging feature branches into main branches to facilitate code reviews and maintain quality.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <ol className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="mr-2">1.</span>
                          <span>Push your feature branch to GitHub</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">2.</span>
                          <span>Go to your repository on GitHub and click "Compare &amp; pull request"</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">3.</span>
                          <span>Add a title and description explaining the changes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">4.</span>
                          <span>Request reviews from team members</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">5.</span>
                          <span>After approval, merge the pull request</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 5: Troubleshooting */}
      <section className="mb-10">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-red-600 p-3 rounded-lg text-white">
              <SafeIcon icon={FiAlertTriangle} className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Step 5: Troubleshooting Tips</h2>
              
              <p className="text-gray-700 mb-4">
                Common issues that may occur during the GitHub-Netlify integration and how to fix them.
              </p>
              
              <div className="space-y-6 mt-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-orange-500 mr-2" />
                    <h3 className="font-medium text-gray-800">Deployments not triggering</h3>
                  </div>
                  <div className="ml-7">
                    <p className="text-gray-600 mb-2">
                      If your site doesn't deploy when you push to GitHub:
                    </p>
                    <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                      <li>
                        <p className="font-medium">Check GitHub connection</p>
                        <p className="text-gray-600">
                          Go to Netlify's "Site settings" &gt; "Build &amp; deploy" &gt; "Continuous deployment" to verify your GitHub repository is still connected properly.
                        </p>
                      </li>
                      <li>
                        <p className="font-medium">Verify webhooks</p>
                        <p className="text-gray-600">
                          Check that the Netlify webhook exists in your GitHub repository settings under "Settings" &gt; "Webhooks".
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-orange-500 mr-2" />
                    <h3 className="font-medium text-gray-800">Build failures</h3>
                  </div>
                  <div className="ml-7">
                    <p className="text-gray-600 mb-2">
                      If your build fails during deployment:
                    </p>
                    <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                      <li>
                        <p className="font-medium">Check build logs</p>
                        <p className="text-gray-600">
                          Review the detailed build logs in Netlify to identify the exact error.
                        </p>
                      </li>
                      <li>
                        <p className="font-medium">Verify build command</p>
                        <p className="text-gray-600">
                          Make sure your build command is correct for your project (e.g., <code className="bg-gray-100 px-1 py-0.5 rounded">npm run build</code>).
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <SafeIcon icon={FiBook} className="w-5 h-5 mr-2 text-blue-600" />
                Documentation
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://docs.netlify.com/configure-builds/get-started/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <SafeIcon icon={FiExternalLink} className="w-4 h-4 mr-1" />
                    Netlify Build Configuration
                  </a>
                </li>
                <li>
                  <a href="https://docs.github.com/en/get-started/quickstart/github-flow" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <SafeIcon icon={FiExternalLink} className="w-4 h-4 mr-1" />
                    GitHub Flow Guide
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <SafeIcon icon={FiVideo} className="w-5 h-5 mr-2 text-red-600" />
                Video Tutorials
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.youtube.com/watch?v=4XpMZFKgLKw" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <SafeIcon icon={FiExternalLink} className="w-4 h-4 mr-1" />
                    Deploy with GitHub and Netlify
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=HUBNt18RFbo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    <SafeIcon icon={FiExternalLink} className="w-4 h-4 mr-1" />
                    Git and GitHub for Beginners
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default GitHubNetlifySync;