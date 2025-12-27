import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FocusMode } from './FocusMode';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Activity, 
  BarChart2, 
  Settings, 
  Rocket 
} from 'lucide-react';

export const Layout = () => {
  const [isFocusModeOpen, setFocusModeOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <>
      <div className="flex h-screen w-full bg-bgDark text-slate-200 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 h-full bg-slate-900/80 backdrop-blur-xl border-l border-white/5 flex flex-col p-4">
          <div className="mb-8 mt-2 text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ADHD Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1">نسخه فرانت‌اند</p>
          </div>

          <nav className="flex-1 space-y-2">
            <NavLink to="/" className={navClass}>
              <LayoutDashboard size={20} />
              <span>داشبورد</span>
            </NavLink>
            <NavLink to="/tasks" className={navClass}>
              <CheckSquare size={20} />
              <span>کارها</span>
            </NavLink>
            <NavLink to="/habits" className={navClass}>
              <Activity size={20} />
              <span>عادت‌ها</span>
            </NavLink>
            <NavLink to="/analytics" className={navClass}>
              <BarChart2 size={20} />
              <span>آمار</span>
            </NavLink>
            <NavLink to="/settings" className={navClass}>
              <Settings size={20} />
              <span>تنظیمات</span>
            </NavLink>
          </nav>

          <div className="mt-auto pt-4 border-t border-white/5">
            <button 
              onClick={() => setFocusModeOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl transition-all shadow-lg shadow-cyan-900/20 font-bold"
            >
              <Rocket size={20} />
              <span>حالت تمرکز</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 h-full overflow-hidden relative">
          {/* Decorative background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="h-full overflow-y-auto p-8 relative z-10">
            <Outlet />
          </div>
        </main>
      </div>

      <FocusMode isOpen={isFocusModeOpen} onClose={() => setFocusModeOpen(false)} />
    </>
  );
};