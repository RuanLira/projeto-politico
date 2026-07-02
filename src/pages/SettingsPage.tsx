import { Save, Upload } from 'lucide-react';
import { useState } from 'react';
import { politician } from '../data/mockData';

export function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="page-stack">
      <section className="settings-grid">
        <article className="panel">
          <div className="panel-header">
            <h3>Dados do gabinete</h3>
          </div>
          <div className="form-grid">
            <label>Nome público<input defaultValue={politician.name} /></label>
            <label>Cargo<input defaultValue={politician.office} /></label>
            <label>Partido<input defaultValue={politician.party} /></label>
            <label>Regiao<input defaultValue={politician.region} /></label>
          </div>
        </article>
        <article className="panel">
          <div className="panel-header">
            <h3>Identidade visual</h3>
          </div>
          <div className="form-grid">
            <label>Cor primaria<input type="color" defaultValue="#0f3b63" /></label>
            <label>Cor de destaque<input type="color" defaultValue="#12a594" /></label>
            <button className="secondary-button">
              <Upload size={18} />
              Enviar logo
            </button>
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Integracoes autorizadas</h3>
        </div>
        <div className="integration-list">
          <label><input type="checkbox" defaultChecked /> Importacao manual por CSV validado</label>
          <label><input type="checkbox" />  Auth oficial Instagram Graph API</label>
          <label><input type="checkbox" />  Auth oficial Facebook Pages</label>
          <label><input type="checkbox" defaultChecked /> Relatórios semanais por e-mail</label>
        </div>
        <div className="responsible-box light">
            O sistema não solicita senhas de redes sociais, não automatiza login e não executa raspagem abusiva.
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Politica de uso responsável e privacidade</h3>
        </div>
        <p className="muted">
          Use apenas dados públicos, autorizados ou importados por fontes legítimas. Evite coletar dados sensíveis
          desnecessarios e mantenha controle de acesso conforme a função de cada integrante da equipe.
        </p>
      </section>

      <button className="primary-button fit" onClick={save}>
        <Save size={18} />
        {saved ? 'Salvo com sucesso' : 'Salvar configuracoes'}
      </button>
    </div>
  );
}
