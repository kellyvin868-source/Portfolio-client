const navItems = [
  { id: 'home',     icon: 'fas fa-home',        label: 'Dashboard' },
  { id: 'projects', icon: 'fas fa-code',         label: 'Projects' },
  { id: 'messages', icon: 'fas fa-envelope',     label: 'Messages' },
  { id: 'profile',  icon: 'fas fa-user-circle',  label: 'Profile' },
];

export default function Sidebar({ page, setPage, sidebarOpen, setSidebarOpen, logout }) {
  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0a0a1a] border-r border-white/5 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="px-6 py-5 border-b border-white/5">
        <div className="font-mono font-bold text-xl">
          <span className="text-violet-400">&lt;</span>KKK<span className="text-violet-400">/&gt;</span>
          <span className="text-xs text-[#8888aa] ml-2 font-sans font-normal">Admin</span>
        </div>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map(item => (
          <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-l-[3px] ${page === item.id ? 'text-violet-300 bg-violet-900/10 border-violet-500' : 'text-[#8888aa] hover:text-white hover:bg-white/3 border-transparent'}`}>
            <i className={`${item.icon} w-4`} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#8888aa] hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-all">
          <i className="fas fa-sign-out-alt w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
