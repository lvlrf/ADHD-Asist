import React, { useState } from 'react';
import { useStore } from '../store';
import { Task, TaskStatus, StatusLabels, StatusColors } from '../types';
import { LayoutList, Kanban, Plus, Clock, Zap } from 'lucide-react';

export const Tasks = () => {
  const { tasks, updateTaskStatus, addTask, toggleToday } = useStore();
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('kanban');

  const columns: TaskStatus[] = ['Inbox', 'Next Action', 'In Progress', 'Done'];

  // Basic HTML5 Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('taskId', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary for onDrop to fire
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTaskStatus(taskId, status);
    }
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <div 
      draggable 
      onDragStart={(e) => handleDragStart(e, task.id)}
      className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-white/5 hover:border-blue-500/50 shadow-sm mb-3 cursor-grab active:cursor-grabbing group transition-all"
    >
      <div className="flex justify-between items-start gap-2">
        <h4 className={`font-medium ${task.status === 'Done' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
          {task.title}
        </h4>
        {task.energyLevel === '🔥High Focus' && <Zap size={14} className="text-orange-500 flex-shrink-0" />}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3 text-xs">
        {task.context.map(c => (
          <span key={c} className="px-2 py-0.5 rounded bg-slate-700 text-slate-400">{c}</span>
        ))}
        {task.estimatedTime && (
          <span className="flex items-center gap-1 text-slate-500">
            <Clock size={12} /> {task.estimatedTime}m
          </span>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group-hover:text-blue-400 text-slate-500 text-xs transition-colors">
          <input 
            type="checkbox" 
            checked={task.isToday} 
            onChange={() => toggleToday(task.id)}
            className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-offset-slate-900"
          />
          امروز انجام میدم
        </label>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            📋 مدیریت کارها
          </h1>
          <p className="text-slate-500 text-sm">بکشید و رها کنید تا وضعیت تغییر کند</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
            onClick={() => alert('در نسخه فرانت‌اند، این دکمه نمایشی است.')}
          >
            <Plus size={18} />
            کار جدید
          </button>

          <div className="bg-slate-800 p-1 rounded-lg border border-white/10 flex">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutList size={20} />
            </button>
            <button 
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-md transition-all ${viewMode === 'kanban' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Kanban size={20} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1200px] h-full">
            {columns.map(status => (
              <div 
                key={status} 
                className="w-1/4 min-w-[300px] flex flex-col h-full"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              >
                <div className={`flex items-center justify-between p-3 rounded-t-xl bg-slate-800/40 border-b-2 ${StatusColors[status]} backdrop-blur`}>
                  <h3 className="font-bold text-slate-200">{StatusLabels[status]}</h3>
                  <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                    {tasks.filter(t => t.status === status).length}
                  </span>
                </div>
                
                <div className="flex-1 bg-slate-900/30 border-x border-b border-white/5 rounded-b-xl p-3 overflow-y-auto custom-scrollbar transition-colors hover:bg-white/5">
                  {tasks.filter(t => t.status === status).map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {tasks.map(task => (
            <div key={task.id} className="bg-glass-bg border border-glass-border p-4 rounded-xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
               <div className="flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full ${
                    task.status === 'Done' ? 'bg-green-500' :
                    task.status === 'Next Action' ? 'bg-blue-500' :
                    task.status === 'In Progress' ? 'bg-yellow-500' : 'bg-slate-500'
                  }`} />
                  <div>
                    <h4 className="text-white font-medium">{task.title}</h4>
                    <p className="text-slate-500 text-xs">{StatusLabels[task.status]} • {task.context.join(', ')}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                 {task.isToday && <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">امروز</span>}
                 <span className="text-slate-600 text-sm">{task.estimatedTime ? `${task.estimatedTime}m` : '-'}</span>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};