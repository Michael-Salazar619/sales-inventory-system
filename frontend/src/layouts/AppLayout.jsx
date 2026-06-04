import { BarChart3, Boxes, FileSpreadsheet, MessageSquare, Receipt, LogOut } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const nav = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/inventory', label: 'Inventario', icon: Boxes },
  { to: '/sales', label: 'Ventas', icon: Receipt },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/reports', label: 'Reportes', icon: FileSpreadsheet }
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen lg:flex">
      <aside className="border-r border-slate-200 bg-slate-950 text-white lg:w-72">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-sm font-semibold text-blue-200">Enterprise Suite</p>
          <h1 className="text-lg font-bold">Ventas e Inventario</h1>
        </div>
        <nav className="grid gap-1 p-3">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              <item.icon size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-sm text-slate-500">Sesion activa</p>
            <h2 className="font-semibold">{user?.name} · {user?.role}</h2>
          </div>
          <button className="rounded-md border border-slate-300 p-2 hover:bg-slate-100" onClick={logout} title="Cerrar sesion">
            <LogOut size={18} />
          </button>
        </header>
        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
