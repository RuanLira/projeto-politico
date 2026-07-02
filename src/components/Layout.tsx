import {
  BarChart3,
  FileText,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { AppUser } from '../types';

export type PageKey = 'dashboard' | 'ranking' | 'profile' | 'publications' | 'reports' | 'admin' | 'settings';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'ranking', label: 'Ranking', icon: Trophy },
  { key: 'profile', label: 'Consulta', icon: Search },
  { key: 'publications', label: 'Publicacoes', icon: FileText },
  { key: 'reports', label: 'Relatorios', icon: BarChart3 },
  { key: 'admin', label: 'Administracao', icon: Users },
  { key: 'settings', label: 'Configuracoes', icon: Settings },
] as const;

export function Layout({
  activePage,
  onPageChange,
  user,
  onLogout,
  children,
}: {
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
  user: AppUser;
  onLogout: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="brand">
        <div className="brand-mark">CP</div>
        <div>
          <strong>Controle Politico</strong>
          <span>Painel de Engajamento</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              className={activePage === item.key ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                onPageChange(item.key);
                setOpen(false);
              }}
              title={item.label}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <div className="security-note">
          <ShieldCheck size={18} />
          <span>Uso autorizado, etico e sem coleta de senhas de redes sociais.</span>
        </div>
        <button className="ghost-button full" onClick={onLogout}>
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar desktop-only">
        <SidebarContent />
      </aside>
      <header className="mobile-topbar">
        <button className="icon-button" onClick={() => setOpen(true)} title="Abrir menu">
          <Menu size={22} />
        </button>
        <strong>Controle Politico</strong>
        <div className="user-pill">{user.role}</div>
      </header>
      {open && (
        <div className="mobile-drawer">
          <div className="drawer-panel">
            <button className="icon-button drawer-close" onClick={() => setOpen(false)} title="Fechar menu">
              <X size={22} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
      <main className="main-content">
        <div className="topline">
          <div>
            <span className="eyebrow">Mandato monitorado</span>
            <h1>{pageTitle(activePage)}</h1>
          </div>
          <div className="user-card">
            <div className="avatar">{user.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

function pageTitle(page: PageKey) {
  const titles: Record<PageKey, string> = {
    dashboard: 'Dashboard',
    ranking: 'Ranking de Engajamento',
    profile: 'Consulta de Perfil',
    publications: 'Publicacoes',
    reports: 'Relatorios',
    admin: 'Administracao',
    settings: 'Configuracoes',
  };
  return titles[page];
}
