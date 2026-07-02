import { useState } from 'react';
import { Layout, type PageKey } from './components/Layout';
import { useAuth } from './hooks/useAuth';
import { AdminPage } from './pages/AdminPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ProfileSearchPage } from './pages/ProfileSearchPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { RankingPage } from './pages/RankingPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import type { EngagementFilters } from './services/engagementService';

export function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState<PageKey>('dashboard');
  const [filters, setFilters] = useState<EngagementFilters>({ type: 'all', publicationId: 'all' });
  const [profileHandle, setProfileHandle] = useState('@ana.cidadania');

  if (!user) return <LoginPage />;

  return (
    <Layout activePage={page} onPageChange={setPage} user={user} onLogout={logout}>
      {page === 'dashboard' && <DashboardPage filters={filters} onFiltersChange={setFilters} />}
      {page === 'ranking' && (
        <RankingPage
          filters={filters}
          onFiltersChange={setFilters}
          onOpenProfile={(handle) => {
            setProfileHandle(handle);
            setPage('profile');
          }}
        />
      )}
      {page === 'profile' && <ProfileSearchPage initialHandle={profileHandle} />}
      {page === 'publications' && <PublicationsPage />}
      {page === 'reports' && <ReportsPage />}
      {page === 'admin' && <AdminPage user={user} />}
      {page === 'settings' && <SettingsPage />}
    </Layout>
  );
}
