import { useState, useEffect } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050510]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'py-4'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="font-mono font-bold text-xl">
          <span className="text-violet-400">&lt;</span>Kelvin<span className="text-violet-400">/&gt;</span>
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="px-4 py-2 rounded-lg text-sm font-medium text-[#8888aa] hover:text-white hover:bg-white/5 transition-all">{l.label}</a>
            </li>
          ))}
          <li>
            <a href="/admin" className="ml-2 px-4 py-2 rounded-full text-sm font-semibold gradient-bg text-white">Admin</a>
          </li>
        </ul>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 bg-[#050510]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 z-40">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-semibold text-[#8888aa] hover:text-white transition-colors">{l.label}</a>
          ))}
          <a href="/admin" onClick={() => setOpen(false)} className="px-6 py-3 rounded-full gradient-bg text-white font-semibold">Admin</a>
        </div>
      )}
    </nav>
  );
}
