import React from 'react';
import { useStore } from '../store';
import { CheckCircle2, AlertCircle, Calendar, Activity } from 'lucide-react';

export const Dashboard = () => {
  const { tasks, habits } = useStore();

  const todayTasks = tasks.filter(t => t.isToday && t.status !== 'Done');
  const urgentTasks = tasks.filter(t => t.urgency === '🚨Urgent' && t.status !== 'Done');
  const activeHabits = habits.filter(h => h.status === 'Active');

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">سلام، خوش اومدی 👋</h2>
        <p className="text-slate-400">امروز قراره کلی کار مفید انجام بدی.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-glass-bg backdrop-blur-md border border-glass-border p-6 rounded-2xl shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">کارهای امروز</p>
              <h3 className="text-3xl font-bold text-white">{todayTasks.length}</h3>
            </div>
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
              <Calendar size={24} />
            </div>
          </div>
          <div className="text-sm text-slate-500">
            {todayTasks.length > 0 ? 'بریم انجامشون بدیم!' : 'همه کارها انجام شد 🎉'}
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-glass-bg backdrop-blur-md border border-glass-border p-6 rounded-2xl shadow-xl relative overflow-hidden group hover:border-red-500/30 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">فوری و مهم</p>
              <h3 className="text-3xl font-bold text-white">{urgentTasks.length}</h3>
            </div>
            <div className="p-3 bg-red-500/20 text-red-400 rounded-xl">
              <AlertCircle size={24} />
            </div>
          </div>
          <div className="text-sm text-slate-500">
            اولویت با ایناست
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-glass-bg backdrop-blur-md border border-glass-border p-6 rounded-2xl shadow-xl relative overflow-hidden group hover:border-green-500/30 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">عادت‌های فعال</p>
              <h3 className="text-3xl font-bold text-white">{activeHabits.length}</h3>
            </div>
            <div className="p-3 bg-green-500/20 text-green-400 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <div className="text-sm text-slate-500">
            زنجیره رو قطع نکن!
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Quick List */}
        <div className="bg-glass-bg backdrop-blur-md border border-glass-border rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">برای امروز 👇</h3>
          <div className="space-y-3">
            {todayTasks.length === 0 ? (
              <p className="text-slate-500 text-center py-8">هیچ کاری برای امروز تنظیم نشده.</p>
            ) : (
              todayTasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className={`w-2 h-8 rounded-full ${task.priority === 'High' ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <div className="flex-1">
                    <h4 className="text-slate-200 font-medium">{task.title}</h4>
                    <div className="flex gap-2 text-xs text-slate-500 mt-1">
                      {task.context.map(c => <span key={c} className="bg-slate-700 px-2 py-0.5 rounded text-slate-300">{c}</span>)}
                      <span>{task.estimatedTime} دقیقه</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Note/Sync Status */}
        <div className="bg-glass-bg backdrop-blur-md border border-glass-border rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4 animate-pulse">
            <Activity size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">وضعیت همگام‌سازی</h3>
          <p className="text-slate-400 text-sm max-w-xs">
            همگام‌سازی خودکار با Notion هر ۵ دقیقه و بکاپ Google Sheets هر ۱ ساعت انجام می‌شود.
          </p>
          <div className="mt-6 flex gap-2 text-xs text-slate-600">
            <span>آخرین سینک: همین الان</span>
            <span>•</span>
            <span className="text-green-500">متصل ✅</span>
          </div>
        </div>
      </div>
    </div>
  );
};