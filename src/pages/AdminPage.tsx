import { ShieldCheck, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { auditLogs, teamUsers } from '../data/mockData';
import type { AppUser, Role } from '../types';
import { canAccess } from '../utils/security';

export function AdminPage({ user }: { user: AppUser }) {
  const [users, setUsers] = useState(teamUsers);
  const allowed = canAccess(user.role, ['Administrador']);

  function addUser() {
    setUsers((current) => [
      ...current,
      {
        id: `user-${current.length + 1}`,
        name: 'Novo Integrante',
        email: `novo${current.length + 1}@controlepolitico.com`,
        role: 'Consulta' as Role,
        status: 'Pendente',
        lastAccess: '-',
      },
    ]);
  }

  if (!allowed) {
    return (
      <div className="panel empty-state">
        <ShieldCheck size={34} />
        <h2>Acesso restrito</h2>
        <p>A administração de usuários e permissões está disponível apenas para administradores.</p>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <div className="action-row">
        <div>
          <span className="eyebrow">Equipe</span>
          <h2>Usuários e permissões</h2>
        </div>
        <button className="primary-button fit" onClick={addUser}>
          <UserPlus size={18} />
          Adicionar usuário
        </button>
      </div>

      <DataTable
        columns={['Nome', 'E-mail', 'Nível', 'Status', 'Último acesso']}
        rows={users.map((teamUser) => [
          teamUser.name,
          teamUser.email,
          <select value={teamUser.role} onChange={(event) => {
            const nextRole = event.target.value as Role;
            setUsers((current) => current.map((item) => item.id === teamUser.id ? { ...item, role: nextRole } : item));
          }}>
            <option>Administrador</option>
            <option>Gabinete</option>
            <option>Comunicação</option>
            <option>Consulta</option>
          </select>,
          teamUser.status,
          teamUser.lastAccess,
        ])}
      />

      <section className="panel">
        <div className="panel-header">
          <h3>Logs de atividade</h3>
        </div>
        <DataTable
          columns={['Data', 'Usuario', 'Acao', 'Modulo', 'Nível']}
          rows={auditLogs.map((log) => [log.date, log.user, log.action, log.target, log.severity])}
        />
      </section>
    </div>
  );
}
