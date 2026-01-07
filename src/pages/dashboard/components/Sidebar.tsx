import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  onInstallAgent: () => void;
}

export default function Sidebar({ onInstallAgent }: SidebarProps) {
  const { userEmail, logout, agentConnected } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: 'ri-dashboard-line', label: 'Dashboard', active: true },
    { icon: 'ri-computer-line', label: 'Active Sessions', active: false },
    { icon: 'ri-terminal-box-line', label: 'Command History', active: false },
    { icon: 'ri-file-list-3-line', label: 'System Logs', active: false },
    { icon: 'ri-settings-3-line', label: 'Settings', active: false }
  ];

  return (
    <div className="w-72 bg-[#161B22] border-r border-gray-800 flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <i className="ri-user-line text-2xl text-white"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate">{userEmail?.split('@')[0]}</h3>
            <p className="text-xs text-gray-400 truncate">{userEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <i className="ri-vip-crown-line text-cyan-400"></i>
          <span className="text-xs font-semibold text-cyan-400">Pro Access</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 4 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              item.active
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <i className={`${item.icon} text-xl`}></i>
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Install Agent Button */}
      <div className="p-4 border-t border-gray-800">
        {!agentConnected && (
          <button
            onClick={onInstallAgent}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all mb-3 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-download-cloud-line text-xl"></i>
            Install Desktop Agent
          </button>
        )}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-gray-400 font-medium rounded-xl hover:bg-gray-700 hover:text-white transition-all cursor-pointer whitespace-nowrap"
        >
          <i className="ri-logout-box-line text-xl"></i>
          Logout
        </button>
      </div>
    </div>
  );
}