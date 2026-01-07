import { create } from 'zustand';

export interface CommandLog {
  id: string;
  command: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: Date;
  executionTime?: number;
  response?: string;
}

interface CommandState {
  commands: CommandLog[];
  isExecuting: boolean;
  addCommand: (command: string) => void;
  updateCommandStatus: (id: string, status: CommandLog['status'], executionTime?: number, response?: string) => void;
  clearCommands: () => void;
}

export const useCommandStore = create<CommandState>((set) => ({
  commands: [],
  isExecuting: false,
  addCommand: (command) => {
    const newCommand: CommandLog = {
      id: Date.now().toString(),
      command,
      status: 'pending',
      timestamp: new Date(),
    };
    set((state) => ({
      commands: [newCommand, ...state.commands],
      isExecuting: true,
    }));
  },
  updateCommandStatus: (id, status, executionTime, response) =>
    set((state) => ({
      commands: state.commands.map((cmd) =>
        cmd.id === id ? { ...cmd, status, executionTime, response } : cmd
      ),
      isExecuting: false,
    })),
  clearCommands: () => set({ commands: [] }),
}));