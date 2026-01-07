import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommandStore } from '../../../store/commandStore';

interface CommandBarProps {
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
}

export default function CommandBar({ connectionStatus }: CommandBarProps) {
  const [command, setCommand] = useState('');
  const { addCommand, updateCommandStatus, isExecuting } = useCommandStore();

  const handleExecute = async () => {
    if (!command.trim() || isExecuting) return;

    const commandId = Date.now().toString();
    addCommand(command);

    // Simulate command execution
    const startTime = Date.now();
    
    setTimeout(() => {
      const executionTime = Date.now() - startTime;
      updateCommandStatus(
        commandId,
        'success',
        executionTime,
        `Command "${command}" executed successfully`
      );
    }, 1500);

    setCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleExecute();
    }
  };

  const statusConfig = {
    disconnected: { color: 'text-red-400', bg: 'bg-red-400', label: 'Disconnected', pulse: false },
    connecting: { color: 'text-yellow-400', bg: 'bg-yellow-400', label: 'Connecting...', pulse: true },
    connected: { color: 'text-green-400', bg: 'bg-green-400', label: 'Connected', pulse: true }
  };

  const status = statusConfig[connectionStatus];

  return (
    <div className="bg-[#161B22] border-b border-gray-800 p-6">
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#21262D] rounded-xl border border-gray-700">
          <motion.div
            className={`w-3 h-3 ${status.bg} rounded-full`}
            animate={status.pulse ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
          <span className={`text-sm font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Command Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type command or use natural language... (e.g., 'Open YouTube', 'Search Google for restaurants')"
            disabled={connectionStatus !== 'connected'}
            className="w-full px-6 py-4 bg-[#21262D] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {command && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              Press Enter to execute
            </div>
          )}
        </div>

        {/* Execute Button */}
        <button
          onClick={handleExecute}
          disabled={!command.trim() || isExecuting || connectionStatus !== 'connected'}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          {isExecuting ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>
              Executing...
            </>
          ) : (
            <>
              <i className="ri-play-fill"></i>
              Execute
            </>
          )}
        </button>
      </div>
    </div>
  );
}