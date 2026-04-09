export default function About() {
  return (
    <section className="py-24" id="about">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 bg-violet-900/20 border border-violet-500/20 px-4 py-1.5 rounded-full mb-3">Who I Am</span>
          <h2 className="text-4xl font-extrabold tracking-tight">About Me</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div data-aos="fade-right">
            <div className="relative inline-block">
              <div className="w-72 h-80 bg-[#12122a] border border-violet-900/40 rounded-2xl flex items-center justify-center text-8xl text-violet-600/40 relative z-10">
                <i className="fas fa-user" />
              </div>
              <div className="absolute inset-[-12px] border-2 border-violet-600/30 rounded-[20px]" />
            </div>
          </div>
          <div data-aos="fade-left" className="space-y-4">
            <p className="text-[#8888aa] leading-relaxed">I'm <strong className="text-white">Kelvin Kiprop Kemboi</strong>, a passionate Computer Scientist at <strong className="text-white">Kisii University</strong> with a deep love for building full-stack web applications that solve real-world problems.</p>
            <p className="text-[#8888aa] leading-relaxed">I specialize in <strong className="text-white">React.js</strong>, <strong className="text-white">Node.js</strong>, <strong className="text-white">MongoDB</strong>, and <strong className="text-white">Tailwind CSS</strong>, and I've shipped production-ready dashboards, SaaS tools, and developer SDKs.</p>
            <p className="text-[#8888aa] leading-relaxed">When I'm not coding, I'm exploring new technologies, contributing to open-source, and mentoring fellow students.</p>
            <div className="flex gap-8 pt-6 border-t border-white/5">
              {[['4+','Projects Built'],['3+','Years Coding'],['1','SDK Published']].map(([n,l]) => (
                <div key={l}>
                  <h3 className="text-3xl font-black gradient-text">{n}</h3>
                  <p className="text-xs text-[#8888aa] mt-1">{l}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full gradient-bg text-white font-semibold shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all">
              <i className="fas fa-paper-plane" /> Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
