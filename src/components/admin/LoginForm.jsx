import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  const inp = 'w-full bg-[#0f0f24] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#8888aa] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all';

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4" style={{ backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.12) 0%, transparent 60%)' }}>
      <div className="bg-[#12122a] border border-violet-900/40 rounded-2xl p-8 w-full max-w-md shadow-[0_0_40px_rgba(124,58,237,0.2)]">
        <div className="font-mono font-bold text-2xl mb-1">
          <span className="text-violet-400">&lt;</span>KKK<span className="text-violet-400">/&gt;</span>
        </div>
        <p className="text-[#8888aa] text-sm mb-8">Admin Dashboard — Kelvin Portfolio</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#8888aa] mb-1.5">Email</label>
            <input type="email" className={inp} placeholder="admin@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#8888aa] mb-1.5">Password</label>
            <input type="password" className={inp} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-full gradient-bg text-white font-semibold mt-2 hover:-translate-y-0.5 transition-all disabled:opacity-60">
            {loading ? <><i className="fas fa-spinner fa-spin" /> Logging in...</> : <><i className="fas fa-sign-in-alt" /> Login</>}
          </button>
        </form>
      </div>
    </div>
  );
}
