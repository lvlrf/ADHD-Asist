import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, Project, Habit, TaskStatus } from './types';

// Mock Data
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'تکمیل داکیومنت پروژه',
    status: 'Next Action',
    context: ['سیستم'],
    energyLevel: '🔥High Focus',
    importance: '🔴High',
    quickWin: false,
    estimatedTime: 45,
    tags: ['work'],
    isToday: true
  },
  {
    id: '2',
    title: 'خرید مواد غذایی',
    status: 'Inbox',
    context: ['خرید', 'بیرون'],
    energyLevel: '⚡Medium',
    quickWin: true,
    estimatedTime: 20,
    tags: ['personal'],
    isToday: false
  },
  {
    id: '3',
    title: 'ورزش صبحگاهی',
    status: 'Done',
    context: ['سلامت'],
    energyLevel: '⚡Medium',
    quickWin: false,
    estimatedTime: 30,
    tags: ['health'],
    isToday: true
  },
  {
    id: '4',
    title: 'دیباگ کردن API',
    status: 'In Progress',
    context: ['سیستم'],
    energyLevel: '🔥High Focus',
    importance: '🔴High',
    urgency: '🚨Urgent',
    quickWin: false,
    estimatedTime: 60,
    tags: ['dev'],
    isToday: true
  }
];

interface AppState {
  tasks: Task[];
  projects: Project[];
  habits: Habit[];
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  addTask: (task: Task) => void;
  toggleToday: (id: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isLoading, setIsLoading] = useState(false);

  // Simulating loading data
  useEffect(() => {
    // In a real app, fetch from Python/Notion backend here
  }, []);

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const toggleToday = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isToday: !t.isToday } : t));
  };

  const mockProjects: Project[] = [
    { id: 'p1', projectName: 'بازطراحی سایت', status: 'Active', priority: 'High', progress: 45 }
  ];

  const mockHabits: Habit[] = [
    { id: 'h1', name: 'مطالعه روزانه', type: 'Good', status: 'Active', streak: 12, lastDone: '2023-10-27' },
    { id: 'h2', name: 'چک کردن اینستاگرام', type: 'Bad', status: 'Active', streak: 2, lastDone: '2023-10-27' }
  ];

  return (
    <AppContext.Provider value={{ 
      tasks, 
      projects: mockProjects, 
      habits: mockHabits,
      updateTaskStatus,
      addTask,
      toggleToday,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useStore must be used within AppProvider');
  return context;
};