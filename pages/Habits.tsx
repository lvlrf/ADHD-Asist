import React from 'react';
import { useStore } from '../store';
import { Flame, Check } from 'lucide-react';

export const Habits = () => {
  const { habits } = useStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">🎯 ردیابی عادت‌ها</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-glass-bg border border-glass-border p-5 rounded-2xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-white">{habit.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${habit.type === 'Good' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {habit.type === 'Good' ? 'عادت خوب' : 'عادت بد'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <Flame className="text-orange-500" size={20} />
              <span className="text-2xl font-bold text-white">{habit.streak}</span>
              <span className="text-slate-500 text-sm">روز متوالی</span>
            </div>

            <button className="w-full py-2 rounded-xl bg-slate-700/50 hover:bg-blue-600 hover:text-white text-slate-300 transition-all flex items-center justify-center gap-2">
              <Check size={18} />
              ثبت برای امروز
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};