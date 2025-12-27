import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Task } from '../types';

declare global {
  interface Window {
    confetti: any;
  }
}

interface FocusModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FocusMode: React.FC<FocusModeProps> = ({ isOpen, onClose }) => {
  const { tasks, updateTaskStatus } = useStore();
  const [focusTask, setFocusTask] = useState<Task | null>(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Load the most important task
  useEffect(() => {
    if (isOpen) {
      // Logic to find "Next Action" with highest priority
      const nextAction = tasks.find(t => t.status === 'Next Action');
      if (nextAction) {
        setFocusTask(nextAction);
      } else {
        const inbox = tasks.find(t => t.status === 'Inbox');
        setFocusTask(inbox || null);
      }
      setTimeLeft(25 * 60);
      setIsActive(false);
    }
  }, [isOpen, tasks]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isActive) {
        triggerConfetti();
        setIsActive(false);
        alert("زمان تمرکز تمام شد! عالی بود!");
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const triggerConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleComplete = () => {
    triggerConfetti();
    if (focusTask) {
      updateTaskStatus(focusTask.id, 'Done');
    }
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center bg-black/95 text-white p-4 animate-in fade-in duration-300">
      <h2 className="text-slate-400 text-xl mb-2">فقط روی این تمرکز کن:</h2>
      
      <h1 className="text-4xl md:text-6xl font-bold my-8 text-blue-400 max-w-4xl leading-tight">
        {focusTask ? focusTask.title : 'هیچ کاری برای انجام نیست!'}
      </h1>

      <div className="font-mono text-7xl md:text-9xl font-bold mb-12 tabular-nums tracking-wider text-slate-100">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={toggleTimer}
          className={`px-8 py-4 text-xl rounded-full border-2 transition-all ${
            isActive 
              ? 'border-red-500 text-red-500 hover:bg-red-500/10' 
              : 'border-white text-white hover:bg-white/10'
          }`}
        >
          {isActive ? 'توقف' : 'شروع'}
        </button>

        <button 
          onClick={handleComplete}
          className="px-8 py-4 text-xl rounded-full bg-green-600 hover:bg-green-500 text-white border-2 border-transparent transition-all shadow-lg shadow-green-900/50"
        >
          انجام شد 🎉
        </button>
      </div>

      <button 
        onClick={onClose}
        className="mt-12 text-slate-500 hover:text-white transition-colors"
      >
        خروج
      </button>
    </div>
  );
};