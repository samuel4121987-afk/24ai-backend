import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0D1117] rounded-t-[32px] pt-20 pb-12 overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 text-center opacity-5 pointer-events-none">
        <div className="text-[12rem] font-black text-white/20" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          AI CONTROL
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 - Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-4xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Take Control<br />From Anywhere
            </h3>
            <p className="text-gray-400 text-sm mt-8">© {currentYear} AI Control Assistant</p>
          </div>

          {/* Column 2 - Product */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Security', 'API Documentation', 'System Status'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Connect */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm">
                  <i className="ri-github-fill"></i>
                  GitHub <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">2.8k ★</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm">
                  <i className="ri-discord-fill"></i>
                  Discord Community
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm">
                  <i className="ri-twitter-x-fill"></i>
                  Twitter Updates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm">
                  <i className="ri-linkedin-fill"></i>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-2">Get Updates</h4>
            <p className="text-gray-400 text-sm mb-4">New features and security updates</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-[#21262D] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none text-sm"
              />
              <button className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all cursor-pointer flex-shrink-0">
                <i className="ri-arrow-right-line text-white text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
          </div>
          <a 
            href="https://readdy.ai/?ref=logo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Powered by Readdy
          </a>
        </div>
      </div>
    </footer>
  );
}