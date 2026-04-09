import { useState, useEffect } from 'react';
import api from '../../api';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [replyModal, setReplyModal] = useState(null);
  const [replyText, setReplyText]   = useState('');
  const [sending, setSending]       = useState(false);

  const load = () => {
    setLoading(true); setError('');
    api.get('/api/messages')
      .then(r => {
        setMessages(r.data);
        // Mark unread as read silently
        r.data.filter(m => !m.read).forEach(m =>
          api.put(`/api/messages/${m._id}/read`).catch(() => {})
        );
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const del = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/api/messages/${id}`);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const sendReply = async () => {
    if (!replyText.trim() || replyText.trim().length < 2) { alert('Please enter a reply.'); return; }
    setSending(true);
    try {
      await api.post(`/api/messages/${replyModal.id}/reply`, { replyText });
      setReplyModal(null); setReplyText(''); load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send reply');
    }
    setSending(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Messages</h2>

      {error && <p className="text-red-400 text-sm mb-4 bg-red-900/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-[#2a2a45] border-t-violet-600 rounded-full animate-spin" /></div>
      ) : !messages.length ? (
        <div className="text-center py-16 text-[#8888aa]"><i className="fas fa-inbox text-4xl mb-3 opacity-30 block" />No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m._id} className={`bg-[#12122a] border rounded-2xl p-4 flex items-start gap-3 transition-all ${!m.read ? 'border-violet-500/30' : 'border-white/5 hover:border-white/10'}`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${!m.read ? 'bg-violet-400' : 'bg-transparent'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">{m.name}</h3>
                  <span className="text-[#8888aa] text-xs">&lt;{m.email}&gt;</span>
                  {m.replied && <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/20 border border-green-500/20 text-green-400">Replied</span>}
                  {!m.read && <span className="text-xs px-2 py-0.5 rounded-full bg-violet-900/20 border border-violet-500/20 text-violet-300">New</span>}
                </div>
                <p className="text-[#8888aa] text-sm mt-1 break-words">{m.message}</p>
                <p className="text-xs text-[#555577] mt-1">{new Date(m.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setReplyModal({ id: m._id, name: m.name, email: m.email }); setReplyText(''); }} className="w-8 h-8 rounded-lg border border-white/10 text-[#8888aa] hover:border-violet-500 hover:text-violet-300 transition-all text-sm" title="Reply"><i className="fas fa-reply" /></button>
                <button onClick={() => del(m._id)} className="w-8 h-8 rounded-lg bg-red-900/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm" title="Delete"><i className="fas fa-trash" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {replyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && setReplyModal(null)}>
          <div className="bg-[#12122a] border border-violet-900/40 rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Reply to Message</h3>
              <button onClick={() => setReplyModal(null)} className="text-[#8888aa] hover:text-white"><i className="fas fa-times" /></button>
            </div>
            <p className="text-[#8888aa] text-sm mb-4">To: <strong className="text-white">{replyModal.name}</strong> &lt;{replyModal.email}&gt;</p>
            <textarea
              className="w-full bg-[#0f0f24] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#8888aa] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm resize-y"
              rows={5} placeholder="Type your reply..." value={replyText} onChange={e => setReplyText(e.target.value)}
            />
            <div className="flex gap-3 justify-end mt-4">
              <button onClick={() => setReplyModal(null)} className="px-4 py-2 rounded-full border border-white/10 text-[#8888aa] hover:text-white text-sm transition-all">Cancel</button>
              <button onClick={sendReply} disabled={sending} className="px-5 py-2 rounded-full gradient-bg text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
                {sending ? <><i className="fas fa-spinner fa-spin mr-1" />Sending...</> : <><i className="fas fa-paper-plane mr-1" />Send Reply</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
