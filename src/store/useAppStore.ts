import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    id: '1',
    email: 'admin@nexushr.com',
    name: 'Alex Rivera',
    role: 'admin'
  }, // Mock user for initial development
  setUser: (user) => set({ user }),
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
