const skills = [
  { icon: 'fab fa-html5',   title: 'Frontend',       tags: ['HTML5','CSS3','JavaScript'],          color: 'text-violet-400 bg-violet-900/20' },
  { icon: 'fab fa-react',   title: 'React',          tags: ['React.js','Hooks','Context API','SPA'], color: 'text-cyan-400 bg-cyan-900/20' },
  { icon: 'fas fa-wind',    title: 'Tailwind CSS',   tags: ['Utility-First','Responsive','Dark Mode'], color: 'text-sky-400 bg-sky-900/20' },
  { icon: 'fab fa-node-js', title: 'Backend',        tags: ['Node.js','Express','REST APIs'],       color: 'text-violet-400 bg-violet-900/20' },
  { icon: 'fas fa-database',title: 'Database',       tags: ['MongoDB','Mongoose'],                  color: 'text-violet-400 bg-violet-900/20' },
  { icon: 'fas fa-shield-alt',title:'Auth & Security',tags: ['JWT','bcrypt','Middleware'],          color: 'text-violet-400 bg-violet-900/20' },
  { icon: 'fas fa-tools',   title: 'Dev Tools',      tags: ['Git','GitHub','Postman'],              color: 'text-violet-400 bg-violet-900/20' },
  { icon: 'fas fa-cloud',   title: 'Deployment',     tags: ['Render','Vercel','MongoDB Atlas'],    color: 'text-violet-400 bg-violet-900/20' },
];

export default function Skills() {
  return (
    <section className="py-24 bg-[#0a0a1a]" id="skills">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 bg-violet-900/20 border border-violet-500/20 px-4 py-1.5 rounded-full mb-3">What I Use</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Skills & Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((s, i) => (
            <div key={s.title} className="bg-[#12122a] border border-white/5 rounded-2xl p-6 transition-all duration-300 card-hover cursor-default" data-aos="fade-up" data-aos-delay={i * 50}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 ${s.color}`}>
                <i className={s.icon} />
              </div>
              <h3 className="font-bold mb-3">{s.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#8888aa]">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
