# Controle Político / Painel de Engajamento Digital

Este é um MVP de estudo para políticos, gabinetes e equipes de comunicação acompanharem o engajamento público de forma organizada, segura e ética.

A ideia é simular um produto real sem usar coleta indevida de dados. O sistema não pede senha do Instagram ou de qualquer rede social, não automatiza login e não faz raspagem abusiva. Integrações futuras devem usar APIs oficiais, OAuth ou importação manual/autorizada.

## O que já está pronto

- Login demonstrativo com limite de tentativas e recuperação simulada.
- Painel com métricas, filtros, ranking e gráficos.
- Ranking de engajamento com pontuação por curtidas, comentários, compartilhamentos, menções e bônus de recorrência.
- Consulta individual por `@perfil`.
- Publicações com métricas e perfis mais engajados.
- Relatórios com resumo executivo, exportação CSV e impressão/salvamento em PDF.
- Administração de usuários, papéis e logs.
- Configurações de gabinete, identidade visual, integrações autorizadas e aviso de uso responsável.
- Servidor Express inicial com Helmet, CORS, validação Zod e limite de requisições.

## Regras de pontuação

As regras ficam em `src/utils/scoring.ts`:

- Curtida: 1 ponto
- Comentário: 3 pontos
- Compartilhamento: 5 pontos
- Menção: 4 pontos
- Frequência recorrente: bônus de 10 pontos

Classificação:

- 0 a 10: Inativo
- 11 a 30: Pouco ativo
- 31 a 70: Ativo
- 71+: Muito ativo

## Instalação

```bash
npm install
```

## Execução

Interface:

```bash
npm run dev
```

Servidor simulado:

```bash
npm run api
```

Versão de produção:

```bash
npm run build
```

## Acesso de demonstração

- E-mail: `admin@controlepolitico.com`
- Senha: `Admin123`

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste:

```bash
VITE_APP_NAME="Controle Político"
VITE_API_URL="http://127.0.0.1:3333"
JWT_SECRET="troque-este-segredo-em-producao"
ALLOWED_ORIGIN="http://127.0.0.1:5173"
```

## Segurança e uso responsável

Este MVP usa dados simulados. Em uma evolução real, use apenas dados públicos, autorizados ou importados por fontes legítimas.

Próximos passos para transformar em produto:

- Substituir a autenticação local por Supabase Auth, Firebase Auth ou NextAuth.
- Persistir dados em PostgreSQL, Supabase ou Firebase.
- Implementar controle de acesso por função também no servidor.
- Registrar ações administrativas em logs imutáveis.
- Configurar proteção contra CSRF conforme a estratégia de sessão escolhida.
- Guardar segredos apenas no servidor.
- Criar política de privacidade e termos revisados juridicamente.
