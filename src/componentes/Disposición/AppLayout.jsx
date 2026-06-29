import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, GraduationCap, CalendarDays, MessageCircle, User, Menu, X, FileText, Recycle, Heart, Bell, Star, Shield, CreditCard, Users2, TrendingUp, Settings } from 'lucide-react';
import Logo from '@/components/Logo';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';

const navItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/jobs', icon: Briefcase, label: 'Empleos' },
  { path: '/messages', icon: MessageCircle, label: 'Mensajes' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

const sidebarItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/jobs', icon: Briefcase, label: 'Empleos' },
  { path: '/applications', icon: FileText, label: 'Mis postulaciones' },
  { path: '/trainings', icon: GraduationCap, label: 'Capacitaciones' },
  { path: '/events', icon: CalendarDays, label: 'Eventos' },
  { path: '/favorites', icon: Star, label: 'Favoritos' },
  { path: '/recycling', icon: Recycle, label: 'Reciclaje' },
  { path: '/community', icon: Heart, label: 'Apoyo comunitario' },
  { path: '/messages', icon: MessageCircle, label: 'Mensajes' },
  { path: '/company', icon: Briefcase, label: 'Panel Empresa' },
  { path: '/talent-pool', icon: Users2, label: 'Bolsa de Talentos' },
  { path: '/pricing', icon: CreditCard, label: 'Planes' },
  { path: '/settings', icon: Settings, label: 'Configuración' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

export default function AppLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    base44.entities.Notification.filter({ read: false }).then(data => setUnreadCount(data.length)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-primary text-primary-foreground fixed inset-y-0 left-0 z-40">
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <Logo size="sm" variant="onDark" />
          <div>
            <span className="font-display font-bold text-sm block">Ciudad</span>
            <span className="font-display font-bold text-secondary text-sm block -mt-0.5">Activa</span>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
          {user?.role === 'admin' && (
            <>
              <Link to="/admin"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === '/admin' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                <Shield className="w-5 h-5" />
                Administrador
              </Link>
              <Link to="/financial"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === '/financial' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                <TrendingUp className="w-5 h-5" />
                Dashboard Financiero
              </Link>
            </>
          )}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
              {user?.full_name?.[0] || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.full_name || 'Usuario'}</p>
              <p className="text-white/50 text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-72 bg-primary text-primary-foreground flex flex-col">
            <div className="p-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <Logo size="sm" variant="onDark" />
                <span className="font-display font-bold text-sm">Ciudad Activa</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-white/70"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {sidebarItems.map(item => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10'}`}>
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              {user?.role === 'admin' && (
                <>
                  <Link to="/admin" onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === '/admin' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10'}`}>
                    <Shield className="w-5 h-5" />
                    Administrador
                  </Link>
                  <Link to="/financial" onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === '/financial' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10'}`}>
                    <TrendingUp className="w-5 h-5" />
                    Dashboard Financiero
                  </Link>
                </>
              )}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top header — safe area top */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-3 lg:px-6 h-12 flex items-center justify-between"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h2 className="font-heading font-bold text-foreground text-sm">
                ¡Hola, {user?.full_name?.split(' ')[0] || 'Usuario'}! 👋
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link to="/notifications" className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" />}
            </Link>
            <Link to="/profile" className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xs">
              {user?.full_name?.[0] || 'U'}
            </Link>
          </div>
        </header>

        {/* Page content — extra bottom padding for mobile safe area + bottom nav */}
        <main className="flex-1 overflow-x-hidden" style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav — floating premium */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="mx-3 mb-2 bg-card/96 backdrop-blur-xl border border-border/60 rounded-2xl shadow-lg shadow-black/8 flex items-center justify-around px-1 h-14">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 active:scale-90">
                {active && <span className="absolute inset-0 bg-[#183D7C]/10 rounded-xl" />}
                <item.icon className={`w-5 h-5 relative z-10 ${active ? 'text-[#183D7C] dark:text-blue-400' : 'text-muted-foreground'}`} style={active ? { strokeWidth: 2.5 } : {}} />
                <span className={`text-[10px] font-medium relative z-10 ${active ? 'text-[#183D7C] dark:text-blue-400' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {active && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#F57C21] rounded-full" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}