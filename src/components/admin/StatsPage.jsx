import { useState, useEffect } from 'react';
import api from '../../api';

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/messages/stats')
      .then(r => setStats(r.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load stats'));
  }, []);

  const cards = [
    { label: 'Total Projects', icon: 'fas fa-code',     value: stats?.totalProjects, color: 'bg-violet-900/20 text-violet-400' },
    { label: 'Total Messages', icon: 'fas fa-envelope', value: stats?.totalMessages, color: 'bg-violet-900/20 text-violet-400' },
    { label: 'Unread',         icon: 'fas fa-bell',     value: stats?.unread,        color: 'bg-red-900/20 text-red-400' },
  ];

  return (
    <div>
      {error && <p className="text-red-400 text-sm mb-4 bg-red-900/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {cards.map(c => (
          <div key={c.label} className="bg-[#12122a] border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-violet-500/40 transition-all">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${c.color}`}><i className={c.icon} /></div>
            <div>
              <h3 className="text-3xl font-black">{stats ? (c.value ?? 0) : <span className="text-[#8888aa] text-xl">—</span>}</h3>
              <p className="text-xs text-[#8888aa] mt-0.5">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[#8888aa] text-sm">Welcome back! Use the sidebar to manage your portfolio.</p>
    </div>
  );
}
