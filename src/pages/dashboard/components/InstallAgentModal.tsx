import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InstallAgentModalProps {
  onClose: () => void;
  onConnect: () => void;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
}

export default function InstallAgentModal({ onClose, onConnect, connectionStatus }: InstallAgentModalProps) {
  const [selectedOS, setSelectedOS] = useState<'windows' | 'mac' | 'linux'>('windows');
  const [installStep, setInstallStep] = useState<'download' | 'install' | 'connect'>('download');

  const downloadLinks = {
    windows: 'https://24ai.org.es/downloads/ai-control-agent-windows.exe',
    mac: 'https://24ai.org.es/downloads/ai-control-agent-mac.dmg',
    linux: 'https://24ai.org.es/downloads/ai-control-agent-linux.deb'
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = downloadLinks[selectedOS];
    link.download = `ai-control-agent-${selectedOS}`;
    // link.click(); // Commented out for demo
    
    setInstallStep('install');
  };

  const handleInstall = () => {
    setInstallStep('connect');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl bg-[#161B22] rounded-3xl border border-gray-800 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <i className="ri-close-line text-xl"></i>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <i className="ri-download-cloud-line text-4xl text-white"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Install Desktop Agent</h2>
            <p className="text-gray-400">Required to control your computer remotely</p>
          </div>

          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {['download', 'install', 'connect'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  installStep === step
                    ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400'
                    : index < ['download', 'install', 'connect'].indexOf(installStep)
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {index < ['download', 'install', 'connect'].indexOf(installStep) ? (
                    <i className="ri-check-line"></i>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                  <span className="text-sm font-medium capitalize">{step}</span>
                </div>
                {index < 2 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    index < ['download', 'install', 'connect'].indexOf(installStep)
                      ? 'bg-green-500'
                      : 'bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {installStep === 'download' && (
              <motion.div
                key="download"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select Your Operating System</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['windows', 'mac', 'linux'] as const).map((os) => (
                      <button
                        key={os}
                        onClick={() => setSelectedOS(os)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedOS === os
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-gray-700 bg-[#21262D] hover:border-gray-600'
                        }`}
                      >
                        <i className={`${
                          os === 'windows' ? 'ri-windows-fill' :
                          os === 'mac' ? 'ri-apple-fill' :
                          'ri-ubuntu-fill'
                        } text-3xl ${selectedOS === os ? 'text-cyan-400' : 'text-gray-400'} mb-2`}></i>
                        <div className={`text-sm font-medium ${selectedOS === os ? 'text-white' : 'text-gray-400'} capitalize`}>
                          {os}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line text-xl"></i>
                  Download Agent for {selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}
                  <span className="text-sm opacity-80">(45.2 MB)</span>
                </button>
              </motion.div>
            )}

            {installStep === 'install' && (
              <motion.div
                key="install"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-[#21262D] rounded-xl p-6 border border-gray-700">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <i className="ri-information-line text-cyan-400"></i>
                    Installation Instructions
                  </h3>
                  <ol className="space-y-3 text-gray-300 text-sm">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span>Open the downloaded installer file</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span>Follow the installation wizard</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span>Grant necessary permissions when prompted</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <span>The agent will start automatically after installation</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-alert-line text-orange-400 text-xl mt-0.5"></i>
                    <div className="text-sm text-orange-200">
                      <strong>Important:</strong> You'll receive an email notification at your registered address once the installation is complete with your unique connection code.
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleInstall}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all whitespace-nowrap cursor-pointer"
                >
                  I've Installed the Agent
                </button>
              </motion.div>
            )}

            {installStep === 'connect' && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center py-8">
                  {connectionStatus === 'connected' ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                      >
                        <i className="ri-check-line text-5xl text-white"></i>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-3">Successfully Connected!</h3>
                      <p className="text-gray-400 mb-6">Your desktop agent is now active and ready to receive commands</p>
                      <button
                        onClick={onClose}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                      >
                        Start Controlling
                      </button>
                    </>
                  ) : connectionStatus === 'connecting' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-24 h-24 mx-auto mb-6 border-8 border-cyan-500 border-t-transparent rounded-full"
                      ></motion.div>
                      <h3 className="text-2xl font-bold text-white mb-3">Connecting to Agent...</h3>
                      <p className="text-gray-400">Please wait while we establish a secure connection</p>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <i className="ri-link text-5xl text-white"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Connect to Agent</h3>
                      <p className="text-gray-400 mb-6">Click the button below to establish a secure connection with your desktop agent</p>
                      <button
                        onClick={onConnect}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 mx-auto whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-plug-line text-xl"></i>
                        Connect Now
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}