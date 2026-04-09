import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import StatsPage from './StatsPage';
import ProjectsPage from './ProjectsPage';
import MessagesPage from './MessagesPage';
import ProfilePage from './ProfilePage';

export default function Dashboard() {
  const [page, setPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();

  const pages = { home: <StatsPage />, projects: <ProjectsPage />, messages: <MessagesPage />, profile: <ProfilePage /> };
  const titles = { home: 'Dashboard', projects: 'Projects', messages: 'Messages', profile: 'Profile Settings' };

  return (
    <div className="min-h-screen bg-[#050510] flex">
      <Sidebar page={page} setPage={setPage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-[#0a0a1a] border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden text-[#8888aa] hover:text-white" onClick={() => setSidebarOpen(true)}>
            <i className="fas fa-bars text-lg" />
          </button>
          <span className="font-bold">{titles[page]}</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-[#8888aa] hidden sm:block">{admin?.username}</span>
            {admin?.profileImage && <img src={admin.profileImage} alt="avatar" className="w-9 h-9 rounded-full object-cover border-2 border-violet-500" />}
          </div>
        </header>
        <div className="flex-1 p-6">{pages[page]}</div>
      </main>
    </div>
  );
}
