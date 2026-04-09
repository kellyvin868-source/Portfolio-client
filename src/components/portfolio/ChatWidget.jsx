import { useState, useRef, useEffect } from 'react';
import api from '../../api';

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: "Hi! I'm Kelvin's assistant. Ask me about his skills, projects, or how to reach him 👋" }]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = async () => {
    const msg = input.trim();
    if (!msg) return;
    setMessages(m => [...m, { role: 'user', text: msg }]);
    setInput(''); setTyping(true);
    try {
      const { data } = await api.post('/api/chat', { message: msg });
      setMessages(m => [...m, { role: 'bot', text: data.reply || 'Sorry, I could not respond.' }]);
    } catch {
      setMessages(m => [...m, { role: 'bot', text: 'Network error. Please try again.' }]);
    }
    setTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button onClick={() => setOpen(!open)} className="relative w-14 h-14 rounded-full gradient-bg text-white text-xl shadow-[0_4px_20px_rgba(124,58,237,0.5)] hover:scale-110 transition-transform" aria-label="Chat">
        <i className={`fas ${open ? 'fa-times' : 'fa-comment-dots'}`} />
        {!open && <span className="absolute inset-[-4px] rounded-full border-2 border-violet-500 animate-ping opacity-60" />}
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 w-80 bg-[#12122a] border border-violet-900/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="gradient-bg px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><i className="fas fa-robot" /></div>
              <div>
                <p className="text-white font-semibold text-sm">Kelvin's Assistant</p>
                <p className="text-white/70 text-xs">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white" aria-label="Close chat"><i className="fas fa-times" /></button>
          </div>

          <div className="flex flex-col gap-3 p-4 h-64 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${m.role === 'bot' ? 'bg-violet-900/40 text-violet-300' : 'bg-cyan-900/40 text-cyan-300'}`}>
                  <i className={`fas fa-${m.role === 'bot' ? 'robot' : 'user'}`} />
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${m.role === 'bot' ? 'bg-[#0f0f24] text-white rounded-bl-sm' : 'gradient-bg text-white rounded-br-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-900/40 text-violet-300 flex items-center justify-center text-xs"><i className="fas fa-robot" /></div>
                <div className="bg-[#0f0f24] px-3 py-2 rounded-2xl rounded-bl-sm text-[#8888aa] text-sm">Typing...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex border-t border-white/5 bg-[#0f0f24]">
            <input
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-[#8888aa] focus:outline-none"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button onClick={send} className="gradient-bg px-4 text-white hover:opacity-90 transition-opacity" aria-label="Send">
              <i className="fas fa-paper-plane text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
