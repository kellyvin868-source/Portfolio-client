export default function Footer() {
  return (
    <footer className="bg-[#0a0a1a] border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="font-mono font-bold text-xl mb-3">
          <span className="text-violet-400">&lt;</span>KKK<span className="text-violet-400">/&gt;</span>
        </div>
        <p className="text-[#8888aa] text-sm mb-4">Built with <i className="fas fa-heart text-rose-500" /> using React, Node.js &amp; MongoDB</p>
        <div className="flex justify-center gap-3 mb-4">
          {[['fab fa-github','GitHub'],['fab fa-linkedin','LinkedIn'],['fab fa-twitter','Twitter']].map(([icon, label]) => (
            <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8888aa] hover:bg-violet-600 hover:border-violet-600 hover:text-white hover:-translate-y-1 transition-all">
              <i className={icon} />
            </a>
          ))}
        </div>
        <p className="text-[#555577] text-xs">&copy; 2024 Kelvin Kiprop Kemboi. All rights reserved.</p>
      </div>
    </footer>
  );
}
