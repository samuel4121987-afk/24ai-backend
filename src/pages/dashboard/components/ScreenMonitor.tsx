import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScreenMonitor() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState<'HD' | 'SD'>('HD');
  const [fps, setFps] = useState(5);
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="flex-1 bg-[#161B22] rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="ri-eye-line text-cyan-400 text-xl"></i>
          <h3 className="text-white font-bold">Live Screen Monitor</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <span className="text-xs font-semibold text-green-400">{fps} FPS</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuality(quality === 'HD' ? 'SD' : 'HD')}
            className="px-3 py-1.5 bg-[#21262D] text-gray-400 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            {quality}
          </button>
          <button className="w-9 h-9 flex items-center justify-center bg-[#21262D] text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer">
            <i className="ri-camera-line"></i>
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 flex items-center justify-center bg-[#21262D] text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <i className={isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'}></i>
          </button>
        </div>
      </div>

      {/* Screen Display */}
      <div
        className="flex-1 relative bg-[#0D1117] overflow-hidden"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Simulated Screen Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
            ></motion.div>
            <p className="text-gray-400 text-sm">Waiting for screen capture...</p>
            <p className="text-gray-600 text-xs mt-2">Install and connect the desktop agent to start monitoring</p>
          </div>
        </div>

        {/* Screen Border Glow */}
        <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-lg pointer-events-none"></div>

        {/* Overlay Controls */}
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 right-4 flex gap-2"
          >
            <button className="px-4 py-2 bg-black/80 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap">
              <i className="ri-screenshot-line"></i>
              Screenshot
            </button>
            <button className="px-4 py-2 bg-black/80 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line"></i>
              Refresh
            </button>
          </motion.div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="px-6 py-3 border-t border-gray-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <i className="ri-time-line text-gray-500"></i>
            <span className="text-gray-400">Latency: <strong className="text-cyan-400">48ms</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-signal-wifi-line text-gray-500"></i>
            <span className="text-gray-400">Quality: <strong className="text-cyan-400">{quality}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-database-2-line text-gray-500"></i>
            <span className="text-gray-400">Bandwidth: <strong className="text-cyan-400">2.4 MB/s</strong></span>
          </div>
        </div>
        <div className="text-gray-500">
          Resolution: 1920x1080
        </div>
      </div>
    </div>
  );
}