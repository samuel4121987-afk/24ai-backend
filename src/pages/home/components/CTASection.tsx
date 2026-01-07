import { motion } from 'framer-motion';

interface CTASectionProps {
  onRequestAccess: () => void;
}

export default function CTASection({ onRequestAccess }: CTASectionProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=futuristic%20technology%20server%20room%20with%20glowing%20blue%20lights%20and%20modern%20data%20center%20equipment%20in%20atmospheric%20lighting%20with%20depth%20of%20field%20and%20professional%20tech%20aesthetic&width=1920&height=800&seq=cta1&orientation=landscape"
          alt="Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl lg:text-7xl font-black text-white mb-6 tracking-wide uppercase"
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.05em', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
        >
          Start Controlling Your Systems Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          Request your access code now<br />
          Join 2,847+ professionals already using AI Control
        </motion.p>

        <motion.button
          onClick={onRequestAccess}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all cursor-pointer whitespace-nowrap"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <i className="ri-terminal-box-line text-2xl text-white"></i>
          </div>
          <span className="uppercase tracking-wide">Request Access Code</span>
          <i className="ri-arrow-right-up-line text-2xl"></i>
        </motion.button>
      </div>
    </section>
  );
}