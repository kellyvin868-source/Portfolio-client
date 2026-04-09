import { useState, useEffect } from 'react';
import api from '../../api';

const emptyForm = { title: '', description: '', techStack: '', githubLink: '', liveDemo: '' };

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(emptyForm);
  const [editId, setEditId]     = useState(null);
  const [imgFile, setImgFile]   = useState(null);
  const [preview, setPreview]   = useState('');
  const [saving, setSaving]     = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const load = () => {
    setLoading(true); setError('');
    api.get('/api/projects')
      .then(r => setProjects(r.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load projects'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setImgFile(null); setPreview(''); setModal(true); };

  const openEdit = async (id) => {
    setEditLoading(true);
    try {
      const { data } = await api.get(`/api/projects/${id}`);
      setForm({ title: data.title, description: data.description, techStack: (data.techStack||[]).join(', '), githubLink: data.githubLink||'', liveDemo: data.liveDemo||'' });
      setEditId(id); setImgFile(null); setPreview(data.image || ''); setModal(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to load project');
    }
    setEditLoading(false);
  };

  const closeModal = () => { setModal(false); setForm(emptyForm); setEditId(null); setImgFile(null); setPreview(''); };

  const handleImg = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImgFile(f);
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) { alert('Title and description are required'); return; }
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imgFile) fd.append('image', imgFile);
    try {
      if (editId) await api.put(`/api/projects/${editId}`, fd);
      else        await api.post('/api/projects', fd);
      closeModal(); load();
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    }
    setSaving(false);
  };

  const del = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const inp = 'w-full bg-[#0f0f24] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-[#8888aa] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Projects</h2>
        <button onClick={openAdd} disabled={editLoading} className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
          <i className="fas fa-plus" /> Add Project
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4 bg-red-900/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-[#2a2a45] border-t-violet-600 rounded-full animate-spin" /></div>
      ) : !projects.length ? (
        <div className="text-center py-16 text-[#8888aa]"><i className="fas fa-code text-4xl mb-3 opacity-30 block" />No projects yet. Add your first one!</div>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p._id} className="bg-[#12122a] border border-white/5 rounded-2xl p-4 flex items-start gap-4 hover:border-white/10 transition-all">
              {p.image
                ? <img src={p.image} alt={p.title} className="w-20 h-14 object-cover rounded-xl flex-shrink-0" />
                : <div className="w-20 h-14 bg-[#0f0f24] rounded-xl flex items-center justify-center text-[#8888aa] flex-shrink-0"><i className="fas fa-code" /></div>
              }
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{p.title}</h3>
                <p className="text-[#8888aa] text-xs mt-0.5 truncate">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(p.techStack||[]).map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-violet-900/20 border border-violet-500/20 text-violet-300">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p._id)} disabled={editLoading} className="w-8 h-8 rounded-lg border border-white/10 text-[#8888aa] hover:border-violet-500 hover:text-violet-300 transition-all text-sm disabled:opacity-50">
                  {editLoading ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-edit" />}
                </button>
                <button onClick={() => del(p._id)} className="w-8 h-8 rounded-lg bg-red-900/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm"><i className="fas fa-trash" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="bg-[#12122a] border border-violet-900/40 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">{editId ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={closeModal} className="text-[#8888aa] hover:text-white"><i className="fas fa-times" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-xs text-[#8888aa] mb-1.5">Title *</label><input className={inp} value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
              <div><label className="block text-xs text-[#8888aa] mb-1.5">Description *</label><textarea className={`${inp} resize-y`} rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required /></div>
              <div><label className="block text-xs text-[#8888aa] mb-1.5">Tech Stack <span className="text-[#555577]">(comma separated)</span></label><input className={inp} placeholder="React, Node.js, MongoDB" value={form.techStack} onChange={e => setForm({...form, techStack: e.target.value})} /></div>
              <div><label className="block text-xs text-[#8888aa] mb-1.5">GitHub URL</label><input type="url" className={inp} placeholder="https://github.com/..." value={form.githubLink} onChange={e => setForm({...form, githubLink: e.target.value})} /></div>
              <div><label className="block text-xs text-[#8888aa] mb-1.5">Live Demo URL</label><input type="url" className={inp} placeholder="https://..." value={form.liveDemo} onChange={e => setForm({...form, liveDemo: e.target.value})} /></div>
              <div>
                <label className="block text-xs text-[#8888aa] mb-1.5">Project Image</label>
                <label className="inline-flex items-center gap-2 text-sm text-violet-400 border border-dashed border-violet-500/40 px-4 py-2 rounded-xl cursor-pointer hover:bg-violet-900/10 transition-all">
                  <i className="fas fa-image" /> Choose Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImg} />
                </label>
                {preview && <img src={preview} alt="preview" className="mt-3 w-full h-40 object-cover rounded-xl" />}
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-full border border-white/10 text-[#8888aa] hover:text-white text-sm transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 rounded-full gradient-bg text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
                  {saving ? <><i className="fas fa-spinner fa-spin mr-1" />Saving...</> : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
