export type TaskStatus = 'Inbox' | 'Next Action' | 'In Progress' | 'Done';
export type EnergyLevel = '🔥High Focus' | '⚡Medium' | '🪶Low Focus';
export type Importance = '🔴High' | '🟡Medium' | '🟢Low';
export type Urgency = '🚨Urgent' | '⏰Soon' | '📅Normal' | '🐢Low';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  context: string[]; // Multi-select
  energyLevel?: EnergyLevel;
  importance?: Importance;
  urgency?: Urgency;
  quickWin: boolean;
  estimatedTime?: number; // minutes
  dueDate?: string;
  scheduledFor?: string;
  projectId?: string;
  tags: string[];
  notes?: string;
  isToday: boolean; // "Assign to Today" feature
}

export interface Project {
  id: string;
  projectName: string;
  status: 'Active' | 'On Hold' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
}

export interface Habit {
  id: string;
  name: string;
  type: 'Good' | 'Bad';
  status: 'Active' | 'Paused' | 'Completed';
  streak: number;
  lastDone?: string;
}

// Persian translations for UI
export const StatusLabels: Record<TaskStatus, string> = {
  'Inbox': 'ورودی',
  'Next Action': 'کار بعدی',
  'In Progress': 'در حال انجام',
  'Done': 'انجام شده'
};

export const StatusColors: Record<TaskStatus, string> = {
  'Inbox': 'border-slate-500',
  'Next Action': 'border-blue-500',
  'In Progress': 'border-yellow-500',
  'Done': 'border-green-500'
};