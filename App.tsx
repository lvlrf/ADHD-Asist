import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Habits } from './pages/Habits';

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500">
    <h2 className="text-2xl font-bold mb-2 text-slate-300">{title}</h2>
    <p>این بخش در نسخه دمو هنوز پیاده‌سازی نشده است.</p>
  </div>
);

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="habits" element={<Habits />} />
            <Route path="analytics" element={<PlaceholderPage title="آمار و تحلیل" />} />
            <Route path="settings" element={<PlaceholderPage title="تنظیمات" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;