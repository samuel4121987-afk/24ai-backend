import { motion } from 'framer-motion';
import { useState } from 'react';

interface InstallationGuideProps {
  onRequestAccess: () => void;
}

export default function InstallationGuide({ onRequestAccess }: InstallationGuideProps) {
  const [selectedOS, setSelectedOS] = useState<'windows' | 'mac' | 'linux'>('windows');

  const steps = [
    { label: 'Request Access', completed: false, current: true },
    { label: 'Download Agent', completed: false, current: false },
    { label: 'Install Dependencies', completed: false, current: false },
    { label: 'Connect', completed: false, current: false }
  ];

  const dependencies = [
    { name: 'Python 3.9+', version: '3.11.0', icon: 'ri-code-s-slash-line', required: true },
    { name: 'Node.js 16+', version: '18.17.0', icon: 'ri-nodejs-line', required: true },
    { name: 'Chrome/Edge', version: 'Latest', icon: 'ri-chrome-line', required: true },
    { name: '.NET Runtime', version: '7.0', icon: 'ri-window-line', required: selectedOS === 'windows' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      step.completed
                        ? 'bg-cyan-500 text-white'
                        : step.current
                        ? 'border-4 border-cyan-500 text-cyan-500 bg-white'
                        : 'border-2 border-gray-300 text-gray-400 bg-white'
                    }`}
                  >
                    {step.completed ? <i className="ri-check-line"></i> : index + 1}
                  </motion.div>
                  <span className={`mt-2 text-sm font-medium whitespace-nowrap ${
                    step.current ? 'text-cyan-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step.completed ? 'bg-cyan-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Installation Cards */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Card 1: Download Desktop Agent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-download-cloud-line text-4xl text-white"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Install the Control Agent</h3>
                
                {/* OS Selector */}
                <div className="flex gap-2 mb-6">
                  {(['windows', 'mac', 'linux'] as const).map((os) => (
                    <button
                      key={os}
                      onClick={() => setSelectedOS(os)}
                      className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                        selectedOS === os
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {os.charAt(0).toUpperCase() + os.slice(1)}
                    </button>
                  ))}
                </div>

                <button
                  onClick={onRequestAccess}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line text-xl"></i>
                  Download for {selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}
                  <span className="text-sm opacity-80">(45.2 MB)</span>
                </button>

                <div className="mt-4 text-sm text-gray-600">
                  <strong>System Requirements:</strong>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 4GB RAM minimum</li>
                    <li>• 500MB free disk space</li>
                    <li>• Internet connection required</li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <img 
                  src="https://readdy.ai/api/search-image?query=modern%20laptop%20computer%20with%20download%20icon%20and%20installation%20progress%20bar%20on%20screen%20in%20minimalist%20style%20with%20soft%20blue%20gradient%20background%20and%20clean%20professional%20aesthetic&width=500&height=400&seq=install1&orientation=landscape" 
                  alt="Download Agent" 
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Required Dependencies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg border-l-8 border-orange-500"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Required Dependencies</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {dependencies.filter(dep => dep.required).map((dep, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <i className={`${dep.icon} text-2xl text-white`}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{dep.name}</h4>
                        <span className="text-sm text-gray-500">v{dep.version}</span>
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-sm"></i>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors text-sm whitespace-nowrap cursor-pointer">
                    Install
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <i className="ri-information-line text-blue-500 text-xl mt-0.5"></i>
                <p className="text-sm text-blue-900">
                  <strong>Auto-detection:</strong> The installer will automatically check for these dependencies and guide you through installation if any are missing.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Email Notification Setup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 shadow-lg text-white"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-mail-send-line text-5xl text-white"></i>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-3">Installation Notifications</h3>
                <p className="text-white/90 text-lg mb-4">
                  We'll notify you when installation completes and send your unique connection code
                </p>
                
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded cursor-pointer" defaultChecked />
                    <span className="font-medium">Enable desktop notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}