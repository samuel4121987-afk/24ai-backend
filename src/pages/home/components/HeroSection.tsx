import { motion } from 'framer-motion';

interface HeroSectionProps {
  onRequestAccess: () => void;
}

export default function HeroSection({ onRequestAccess }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0E27] via-[#1A0B2E] to-[#0A0E27]">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 50,
              opacity: 0 
            }}
            animate={{ 
              y: -50,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center w-full">
          {/* Left Content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            {/* Trust Indicator */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white"></div>
              </div>
              <p className="text-white/90 text-sm font-medium">Trusted by 2,847+ remote teams worldwide</p>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-6xl lg:text-7xl font-black text-white leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Control Any Computer<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">From Anywhere</span><br />
              In Real-Time
            </motion.h1>

            {/* CTA Button */}
            <motion.button
              onClick={onRequestAccess}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-white font-bold text-lg rounded-full shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 flex items-center gap-3 whitespace-nowrap cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Controlling Now
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
            </motion.button>
          </div>

          {/* Right Content - 40% */}
          <div className="lg:col-span-2">
            <motion.div 
              className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Live Indicator */}
              <div className="flex items-center gap-2 mb-6">
                <motion.div 
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <span className="text-white font-semibold text-lg">Active Sessions: 1,247</span>
              </div>

              <p className="text-white/90 text-base leading-relaxed mb-6">
                Enterprise-grade remote access with military-level encryption. Execute commands, monitor screens, and manage systems with zero latency.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-cyan-400 text-3xl font-bold">&lt;50ms</div>
                  <div className="text-white/70 text-sm mt-1">Avg Latency</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-cyan-400 text-3xl font-bold">99.9%</div>
                  <div className="text-white/70 text-sm mt-1">Uptime</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <i className="ri-arrow-down-line text-white/50 text-3xl"></i>
      </motion.div>
    </section>
  );
}