import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { socket } from '../services/socket.js';

export default function Chat() {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit('user:online', user);
    socket.on('chat:message', (message) => setMessages((current) => [...current, message]));
    return () => socket.disconnect();
  }, [user]);

  function send() {
    socket.emit('chat:message', { user: user.name, text });
    setText('');
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-bold">Chat en tiempo real</h1>
      <section className="panel grid h-[520px] grid-rows-[1fr_auto] overflow-hidden">
        <div className="space-y-3 overflow-auto p-5">
          {messages.map((message, index) => (
            <div key={index} className="rounded-md bg-slate-100 p-3 text-sm">
              <strong>{message.user}</strong>: {message.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-slate-200 p-4">
          <input className="input" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="btn" onClick={send}>Enviar</button>
        </div>
      </section>
    </div>
  );
}
