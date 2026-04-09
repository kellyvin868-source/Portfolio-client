import { useState } from 'react';
import api from '../../api';

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email is required';
    if (form.message.trim().length < 10) return 'Message must be at least 10 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setStatus({ msg: err, type: 'error' }); return; }
    setLoading(true); setStatus({ msg: '', type: '' });
    try {
      await api.post('/api/messages', form);
      setStatus({ msg: "✓ Message sent! I'll get back to you soon.", type: 'success' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ msg: err.response?.data?.message || 'Something went wrong. Please try again.', type: 'error' });
    }
    setLoading(false);
  };

  const inp = 'w-full bg-[#0f0f24] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#8888aa] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all';

  return (
    <section className="py-24 bg-[#0a0a1a]" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 bg-violet-900/20 border border-violet-500/20 px-4 py-1.5 rounded-full mb-3">Let's Talk</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Contact Me</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div data-aos="fade-right" className="space-y-6">
            <h3 className="text-2xl font-bold">Get in touch</h3>
            <p className="text-[#8888aa]">Have a project in mind or want to collaborate? I'd love to hear from you. Drop a message and I'll get back to you within 24 hours.</p>
            {[
              ['fas fa-envelope',       'Email',      'kellyvin868@gmail.com'],
              ['fas fa-map-marker-alt', 'Location',   'Kisii, Kenya'],
              ['fas fa-university',     'University', 'Kisii University'],
              ['fas fa-phone',            'Phone' ,      '0114895068']
            ].map(([icon, label, val]) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-violet-900/20 flex items-center justify-center text-violet-400 flex-shrink-0"><i className={icon} /></div>
                <div><strong className="block text-sm">{label}</strong><p className="text-[#8888aa] text-sm">{val}</p></div>
              </div>
            ))}
          </div>
          <div data-aos="fade-left">
            <div className="bg-[#12122a] border border-white/5 rounded-2xl p-6">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#8888aa] mb-1.5">Your Name</label>
                    <input className={inp} placeholder="Kelvin Kemboi" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#8888aa] mb-1.5">Your Email</label>
                    <input type="email" className={inp} placeholder="kelvin@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8888aa] mb-1.5">Message</label>
                  <textarea className={`${inp} resize-y`} rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-full gradient-bg text-white font-semibold shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <><i className="fas fa-spinner fa-spin" /> Sending...</> : <><i className="fas fa-paper-plane" /> Send Message</>}
                </button>
                {status.msg && <p className={`text-sm text-center ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{status.msg}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
