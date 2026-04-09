import { useState, useEffect } from 'react';

const roles = ['Full-Stack Developer', 'React Developer', 'Node.js Engineer', 'Tailwind CSS Expert', 'MongoDB Specialist'];

export default function Hero() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) { setTimeout(() => setDeleting(true), 1800); return; }
        setCharIdx(c => c + 1);
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 < 0) { setDeleting(false); setRoleIdx(r => (r + 1) % roles.length); setCharIdx(0); return; }
        setCharIdx(c => c - 1);
      }
    }, deleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden" id="home">
      {/* Background */}
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-violet-700 opacity-15 blur-[80px] -top-48 -right-24 animate-[blobFloat_8s_ease-in-out_infinite]" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500 opacity-15 blur-[80px] -bottom-24 -left-24 animate-[blobFloat_8s_ease-in-out_infinite_-4s]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-violet-900/30 border border-violet-500/30 px-4 py-1.5 rounded-full text-sm text-violet-300 mb-6" data-aos="fade-down">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-[pulseDot_2s_infinite]" />
            Available for opportunities
          </div>
          <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4" data-aos="fade-up" data-aos-delay="100">
            Kelvin Kiprop<br /><span className="gradient-text">Kemboi</span>
          </h1>
          <p className="text-lg text-[#8888aa] font-mono mb-3 min-h-7" data-aos="fade-up" data-aos-delay="200">
            {text}<span className="animate-[blink_1s_infinite] text-violet-400">|</span>
          </p>
          <p className="text-[#8888aa] mb-8" data-aos="fade-up" data-aos-delay="300">
            <i className="fas fa-graduation-cap text-violet-400 mr-2" />
            Kisii University &nbsp;·&nbsp; Computer Science
          </p>
          <div className="flex flex-wrap gap-4 mb-8" data-aos="fade-up" data-aos-delay="400">
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-white font-semibold shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.5)] transition-all">
              <i className="fas fa-code" /> View Projects
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-violet-400 hover:text-violet-300 transition-all">
              <i className="fas fa-paper-plane" /> Contact Me
            </a>
          </div>
          <div className="flex gap-3" data-aos="fade-up" data-aos-delay="500">
            {[['fab fa-github','GitHub'],['fab fa-linkedin','LinkedIn'],['fab fa-twitter','Twitter']].map(([icon, label]) => (
              <a key={label} href="#" aria-label={label} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8888aa] hover:bg-violet-600 hover:border-violet-600 hover:text-white hover:-translate-y-1 transition-all">
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Code Card */}
        <div data-aos="fade-left" data-aos-delay="200">
          <div className="bg-[#12122a] border border-violet-900/40 rounded-2xl overflow-hidden card-glow">
            <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-auto font-mono text-xs text-[#8888aa]">kelvin.js</span>
            </div>
            <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <code>
                <span className="text-purple-400">const </span>
                <span className="text-cyan-300">developer</span>
                <span className="text-white"> = {'{'}</span>{'\n'}
                {'  '}<span className="text-sky-300">name</span><span className="text-white">: </span><span className="text-green-300">"Kelvin Kiprop Kemboi"</span><span className="text-white">,</span>{'\n'}
                {'  '}<span className="text-sky-300">role</span><span className="text-white">: </span><span className="text-green-300">"Full-Stack Developer"</span><span className="text-white">,</span>{'\n'}
                {'  '}<span className="text-sky-300">stack</span><span className="text-white">: [</span><span className="text-green-300">"React"</span><span className="text-white">, </span><span className="text-green-300">"Node.js"</span><span className="text-white">,</span>{'\n'}
                {'           '}<span className="text-green-300">"MongoDB"</span><span className="text-white">, </span><span className="text-green-300">"Tailwind"</span><span className="text-white">],</span>{'\n'}
                {'  '}<span className="text-sky-300">available</span><span className="text-white">: </span><span className="text-orange-400">true</span><span className="text-white">,</span>{'\n'}
                {'  '}<span className="text-sky-300">hire</span><span className="text-white">: () </span><span className="text-purple-400">=&gt; </span><span className="text-green-300">"Let's build!"</span>{'\n'}
                <span className="text-white">{'};'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8888aa] animate-[bounceY_2s_infinite]">
        <i className="fas fa-chevron-down text-xl" />
      </a>
    </section>
  );
}
