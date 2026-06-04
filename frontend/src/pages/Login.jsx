import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Boxes, LockKeyhole, ShieldCheck, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Credenciales invalidas o servidor no disponible');
    }
  }

  return (
    <main className="grid min-h-screen bg-slate-950 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.55),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.38),transparent_28%),linear-gradient(135deg,#0f172a,#111827)]" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-white/10 ring-1 ring-white/20">
            <Boxes size={24} />
          </div>
          <div>
            <p className="text-sm text-blue-100">Enterprise Suite</p>
            <h1 className="text-xl font-bold">Ventas e Inventario</h1>
          </div>
        </div>
        <div className="relative max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">Operacion comercial inteligente</p>
          <h2 className="mt-4 text-5xl font-bold leading-tight">Controla ventas, stock y reportes desde un panel empresarial.</h2>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[['Ventas', TrendingUp], ['Seguridad', ShieldCheck], ['Acceso', LockKeyhole]].map(([label, Icon]) => (
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur" key={label}>
                <Icon size={22} />
                <p className="mt-3 text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid place-items-center bg-slate-100 p-6">
        <form onSubmit={handleSubmit} className="soft-ring w-full max-w-md rounded-lg border border-slate-200 bg-white p-8">
          <div className="mb-7">
            <p className="text-sm font-semibold text-brand">Panel administrativo</p>
            <h1 className="mt-2 text-3xl font-bold">Iniciar sesion</h1>
            <p className="mt-2 text-sm text-slate-500">Ingresa con el usuario demo para explorar el sistema.</p>
          </div>
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Correo
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Contrasena
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="btn w-full">Ingresar</button>
          </div>
          <div className="mt-6 rounded-md bg-slate-50 p-3 text-xs text-slate-500">
            Usuario demo: admin@demo.com · Admin123!
          </div>
        </form>
      </section>
    </main>
  );
}
