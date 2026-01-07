import { motion } from 'framer-motion';

export default function FeaturesGrid() {
  const features = [
    {
      icon: 'ri-terminal-box-line',
      title: 'Command Execution',
      description: 'Run any command with natural language processing',
      gradient: 'from-purple-600 to-purple-900',
      textColor: 'text-white'
    },
    {
      icon: 'ri-eye-line',
      title: 'Live Screen Monitoring',
      description: 'Real-time screen capture at 2-5 FPS with instant feedback',
      image: 'https://readdy.ai/api/search-image?query=modern%20computer%20screen%20displaying%20real-time%20monitoring%20dashboard%20with%20live%20data%20streams%20and%20analytics%20graphs%20in%20a%20clean%20minimalist%20dark%20interface%20with%20glowing%20cyan%20accents%20and%20professional%20tech%20aesthetic&width=600&height=400&seq=feat1&orientation=landscape',
      badge: 'Real-time'
    },
    {
      icon: 'ri-speed-line',
      title: 'Ultra-Low Latency',
      number: '< 50ms',
      description: 'Average response latency',
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      icon: 'ri-lock-line',
      title: 'End-to-End Encryption',
      description: 'Military-grade security for all communications',
      gradient: 'from-teal-500 to-teal-700',
      textColor: 'text-white',
      features: ['AES-256 Encryption', 'Zero-knowledge Architecture', 'Secure WebSocket']
    },
    {
      icon: 'ri-notification-3-line',
      title: 'Instant Notifications',
      description: 'Get alerts for every action',
      gradient: 'from-orange-500 to-orange-600',
      textColor: 'text-white'
    },
    {
      icon: 'ri-computer-line',
      title: 'Cross-Platform Support',
      description: 'Works on Windows, macOS, and Linux',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-900',
      platforms: ['Windows', 'macOS', 'Linux']
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-600 rounded-full text-sm font-semibold mb-4"
          >
            <i className="ri-flashlight-line"></i>
            POWERFUL FEATURES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Everything You Need for Remote Control
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Military-grade security meets intuitive design
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 overflow-hidden group cursor-pointer ${
                feature.gradient ? `bg-gradient-to-br ${feature.gradient}` : feature.bgColor
              }`}
            >
              {feature.image && (
                <div className="absolute inset-0">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                </div>
              )}

              <div className="relative z-10">
                {feature.badge && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold mb-4">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    {feature.badge}
                  </div>
                )}

                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-6 ${
                  feature.gradient || feature.image ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-cyan-400 to-blue-500'
                }`}>
                  <i className={`${feature.icon} text-3xl ${feature.gradient || feature.image ? 'text-white' : 'text-white'}`}></i>
                </div>

                {feature.number && (
                  <div className="text-5xl font-black text-cyan-500 mb-2">{feature.number}</div>
                )}

                <h3 className={`text-2xl font-bold mb-3 ${feature.textColor}`}>{feature.title}</h3>
                <p className={`${feature.textColor} opacity-90 leading-relaxed`}>{feature.description}</p>

                {feature.features && (
                  <ul className="mt-4 space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/90">
                        <i className="ri-check-line text-green-400"></i>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {feature.platforms && (
                  <div className="flex gap-3 mt-4">
                    {feature.platforms.map((platform, i) => (
                      <div key={i} className="px-3 py-1 bg-gray-200 rounded-lg text-xs font-semibold text-gray-700">
                        {platform}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}