import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useCommandStore } from '../../store/commandStore';
import Sidebar from './components/Sidebar';
import CommandBar from './components/CommandBar';
import ScreenMonitor from './components/ScreenMonitor';
import ActivityFeed from './components/ActivityFeed';
import InstallAgentModal from './components/InstallAgentModal';

export default function DashboardPage() {
  const { isAuthenticated, agentConnected, setAgentConnected } = useAuthStore();
  const navigate = useNavigate();
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Check if agent is installed and connected
    if (!agentConnected) {
      setShowInstallModal(true);
    }
  }, [agentConnected]);

  const handleConnect = () => {
    setConnectionStatus('connecting');
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
      setAgentConnected(true);
      setShowInstallModal(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-[#0D1117] overflow-hidden">
      <Sidebar onInstallAgent={() => setShowInstallModal(true)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <CommandBar connectionStatus={connectionStatus} />
        
        <div className="flex-1 flex gap-6 p-6 overflow-hidden">
          <div className="flex-1 flex flex-col gap-6 overflow-hidden">
            <ScreenMonitor />
          </div>
          
          <ActivityFeed />
        </div>
      </div>

      {showInstallModal && (
        <InstallAgentModal
          onClose={() => setShowInstallModal(false)}
          onConnect={handleConnect}
          connectionStatus={connectionStatus}
        />
      )}
    </div>
  );
}