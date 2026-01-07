import { motion } from 'framer-motion';
import { useCommandStore } from '../../../store/commandStore';
import { format } from 'date-fns';

export default function ActivityFeed() {
  const { commands, clearCommands } = useCommandStore();

  const statusConfig = {
    pending: { color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/30', icon: 'ri-loader-4-line animate-spin' },
    success: { color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/30', icon: 'ri-check-line' },
    failed: { color: 'text-red-400', bg: 'bg-red-400/20', border: 'border-red-400/30', icon: 'ri-close-line' }
  };

  return (
    <div className="w-80 bg-[#161B22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="ri-history-line text-cyan-400 text-xl"></i>
          <h3 className="text-white font-bold">Activity Feed</h3>
        </div>
        {commands.length > 0 && (
          <button
            onClick={clearCommands}
            className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {commands.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <i className="ri-inbox-line text-5xl text-gray-700 mb-3"></i>
            <p className="text-gray-500 text-sm">No commands executed yet</p>
            <p className="text-gray-600 text-xs mt-1">Your command history will appear here</p>
          </div>
        ) : (
          commands.map((cmd) => {
            const status = statusConfig[cmd.status];
            return (
              <motion.div
                key={cmd.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-[#21262D] rounded-xl p-4 border ${status.border}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className={`flex items-center gap-2 px-2 py-1 ${status.bg} rounded-lg`}>
                    <i className={`${status.icon} ${status.color} text-sm`}></i>
                    <span className={`text-xs font-semibold ${status.color} capitalize`}>
                      {cmd.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {format(cmd.timestamp, 'HH:mm:ss')}
                  </span>
                </div>

                {/* Command */}
                <p className="text-white font-mono text-sm mb-2 break-words">
                  {cmd.command}
                </p>

                {/* Response */}
                {cmd.response && (
                  <p className="text-gray-400 text-xs mb-2">
                    {cmd.response}
                  </p>
                )}

                {/* Execution Time */}
                {cmd.executionTime && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <i className="ri-time-line"></i>
                    <span>{cmd.executionTime}ms</span>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}