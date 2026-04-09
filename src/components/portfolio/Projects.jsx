import { useState, useEffect } from 'react';
import api from '../../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    api.get('/api/projects')
      .then(r => setProjects(r.data))
      .catch(() => setError('Could not load projects. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24" id="projects">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 bg-violet-900/20 border border-violet-500/20 px-4 py-1.5 rounded-full mb-3">What I've Built</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Projects</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-16 text-[#8888aa]">
            <div className="w-10 h-10 border-2 border-[#2a2a45] border-t-violet-600 rounded-full animate-spin mb-4" />
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-400 py-16">{error}</p>
        ) : !projects.length ? (
          <p className="text-center text-[#8888aa] py-16">No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={p._id} className="bg-[#12122a] border border-white/5 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 card-hover" data-aos="fade-up" data-aos-delay={i * 80}>
                {p.image
                  ? <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                  : <div className="w-full h-48 bg-[#0f0f24] flex items-center justify-center text-5xl text-violet-800/40"><i className="fas fa-code" /></div>
                }
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-[#8888aa] text-sm mb-4 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(p.techStack || []).map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-violet-900/20 border border-violet-500/20 text-violet-300">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {p.githubLink && <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#8888aa] border border-white/10 px-3 py-1.5 rounded-lg hover:border-violet-500 hover:text-violet-300 transition-all"><i className="fab fa-github" /> GitHub</a>}
                    {p.liveDemo   && <a href={p.liveDemo}   target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#8888aa] border border-white/10 px-3 py-1.5 rounded-lg hover:border-violet-500 hover:text-violet-300 transition-all"><i className="fas fa-external-link-alt" /> Live Demo</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
