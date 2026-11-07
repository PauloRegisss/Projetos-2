# Como contribuir com o Projeto Nexus

Este guia leva você do zero até um pull request aprovado: como rodar o projeto, onde fica cada parte do código, como escrever commits e testes e o que acontece depois do merge.

Se algo aqui estiver desatualizado, corrigir este arquivo também é uma ótima primeira contribuição.

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Preparando o ambiente](#2-preparando-o-ambiente)
3. [Onde fica cada coisa](#3-onde-fica-cada-coisa)
4. [Fluxo de trabalho](#4-fluxo-de-trabalho)
5. [Padrão de commits](#5-padrão-de-commits)
6. [Testes](#6-testes)
7. [Adicionando uma história de usuário](#7-adicionando-uma-história-de-usuário)
8. [CI/CD e deploy](#8-cicd-e-deploy)
9. [Estilo de código](#9-estilo-de-código)
10. [Problemas comuns](#10-problemas-comuns)

## 1. Visão geral

O Nexus é um monorepo com dois apps:

| App | Tecnologia | Porta local |
|-----|------------|-------------|
| `apps/frontend` | [Waku](https://waku.gg) (React 19 com Server Components), Tailwind 4 | `3000` |
| `apps/backend` | Django, com respostas em JSON | `8000` |

O navegador nunca chama o Django diretamente. Ele chama `/api/...` no próprio frontend, e o proxy em `apps/frontend/src/pages/_api/api/[...path].ts` repassa a requisição. Assim, os cookies de sessão e de CSRF ficam no mesmo site, inclusive em produção.

## 2. Preparando o ambiente

### Pré-requisitos

- [Bun](https://bun.sh) 1.x
- Python 3.9 ou mais novo
- Google Chrome, para os testes de sistema
- Node 22, apenas se for rodar o frontend direto pelo Node (veja `.node-version`)

### Passo a passo

```bash
git clone https://github.com/PauloRegisss/Projetos-2.git
cd Projetos-2
bun run setup          # instala o frontend e cria o ambiente Python do backend
cp .env.example .env   # depois ajuste os valores, se precisar
apps/backend/.venv/bin/python apps/backend/manage.py migrate
bun run dev            # frontend em http://localhost:3000 e backend em http://localhost:8000
```

> No Windows, troque `apps/backend/.venv/bin/python` por `apps\backend\.venv\Scripts\python.exe`.

Para usar o painel `/admin`, crie um usuário com `apps/backend/.venv/bin/python apps/backend/manage.py createsuperuser`.

### Variáveis de ambiente

O arquivo `.env` fica na raiz e é lido pelos dois apps. O `.env.example` explica cada variável. As mais importantes:

| Variável | Para que serve |
|----------|----------------|
| `WAKU_PUBLIC_BACKEND_URL` | Endereço do Django usado pelo proxy do frontend (`http://localhost:8000` no ambiente local) |
| `DATABASE_URL` | Banco de dados. Sem ela, o projeto usa SQLite em `apps/backend/db.sqlite3` |
| `ANTHROPIC_API_KEY` | Opcional. Sem ela, o chat responde com a base local sobre IoT e o Showroom usa a análise padrão |

Nunca faça commit do `.env`: ele já está no `.gitignore`.

## 3. Onde fica cada coisa

```text
apps/
  backend/
    app/              contato e saúde da API (/contato/, /contatos/, /health/)
    authentication/   login, logout e sessão do painel (/auth/...)
    chatbot/          perguntas, validação, cálculo, simulações e assistente (/chat/...)
    projeto/          settings.py e urls.py principais
  frontend/src/
    pages/            rotas do site (cada arquivo vira uma URL)
    components/       componentes React; animações em components/movimento/
    chatbot/          chamadas da simulação e do assistente para a API
    auth/             cliente da API e sessão
e2e/                  testes de sistema com Selenium, um arquivo por história
scripts/              comandos do monorepo (setup, dev, build, start, e2e)
historias.md          histórias de usuário com os cenários BDD
```

Exemplo de caminho completo, na simulação: `pages/showroom/new.tsx` → `components/showroom-bot.tsx` → `POST /api/chat/simular/` → `chatbot/urls.py` → `views.simular_view` → `validation.py` → `calculos.py` → `analise.py` → `models.Simulacao`.

## 4. Fluxo de trabalho

1. **Escolha ou abra uma issue** no [bug tracker](https://github.com/PauloRegisss/Projetos-2/issues). Use os modelos **Bug** ou **História de usuário**.
2. **Crie uma branch** a partir da `main` atualizada:
   ```bash
   git switch main && git pull
   git switch -c feat/25-ia-do-chat
   ```
   Use o formato `tipo/numero-da-issue-resumo`, como `fix/13-validacao-contato` ou `docs/contributing`.
3. **Faça commits pequenos**, cada um com uma mudança que faça sentido sozinha.
4. **Rode os testes** antes de abrir o pull request (seção 6).
5. **Abra o pull request** para a `main`. O modelo já traz um checklist; escreva `Closes #N` para a issue fechar no merge.
6. **Espere o CI ficar verde** e peça revisão a pelo menos uma pessoa da equipe.

## 5. Padrão de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/pt-br/), com a descrição em português e no imperativo:

```text
tipo(escopo): descrição curta do que muda
```

| Tipo | Quando usar |
|------|-------------|
| `feat` | Funcionalidade nova |
| `fix` | Correção de bug |
| `docs` | Só documentação |
| `test` | Só testes |
| `refactor` | Mudança de código sem mudar o comportamento |
| `ci` | Pipeline e automação |
| `chore` | Dependências e configuração |

Escopos que já usamos: `chat`, `chatbot`, `showroom`, `ui`, `auth`, `contato`, `dev`, `docker`.

Exemplos reais do histórico:

```text
feat(chatbot): responde dúvidas sobre IoT com IA e base local
fix(dev): roda o frontend no runtime do Bun e fixa o Node 22
docs: atualiza fluxo do chat e adiciona história de dúvidas sobre IoT
```

Quando o commit resolve uma issue, coloque `Closes #N` no corpo da mensagem.

## 6. Testes

| Comando | O que roda | Tempo |
|---------|------------|-------|
| `cd apps/backend && .venv/bin/python manage.py test` | Testes do Django (views, validação, cálculos, assistente) | ~3 s |
| `cd apps/frontend && bunx tsc --noEmit` | Checagem de tipos do frontend | ~10 s |
| `bun run e2e` | Testes de sistema com Selenium, do navegador até o banco | ~1 min |
| `bun run e2e:demo` | Os mesmos testes, com o Chrome aberto, devagar e com legendas | ~3 min |

### Testes de sistema (E2E)

O `bun run e2e` faz tudo sozinho:

- cria um banco SQLite temporário, sem tocar no seu `db.sqlite3`;
- sobe backend e frontend nas portas `8100` e `3100`, para não brigar com o `bun run dev`;
- instala Selenium e pytest no ambiente do backend, se ainda não estiverem lá;
- roda os testes e desliga tudo no fim.

Opções úteis:

```bash
bun run e2e -- -k historia_7      # só os testes da história 7
bun run e2e -- --sem-build        # reaproveita o build atual do frontend
E2E_LOGS=1 bun run e2e            # mostra os logs do Django e do Waku
```

Quando um teste falha, o print da tela fica em `e2e/artefatos/`. No CI, ele vira um artefato para baixar.

**Escrevendo um teste E2E.** Crie `e2e/test_historia_N_resumo.py`, com uma função por cenário do `historias.md`, e use as ações de `e2e/nexus.py`:

```python
def test_cenario_1_pergunta_sobre_iot(site):
    site.abrir("/")
    site.cenario("História 7 · Cenário 1: perguntar sobre IoT")  # legenda no modo demonstração
    site.abrir_chat()
    site.perguntar_ao_chat("O que é MQTT?")
    site.esperar_resposta_do_chat("broker")
```

## 7. Adicionando uma história de usuário

1. Escreva a história no `historias.md`, no formato **Como / eu quero / para que**, com os cenários em **Dado / Quando / Então**.
2. Crie a issue com o modelo **História de usuário** e coloque o card na sprint atual do Jira.
3. Implemente, com testes do Django para o backend e um teste E2E por cenário.
4. Quando entregar, adicione o post-it da história na seção da entrega no README e marque a história como implementada na tabela do `historias.md`.

## 8. CI/CD e deploy

O workflow `.github/workflows/ci.yml` roda em todo push e pull request:

```text
push / PR ──► Backend (testes Django + migrations) ─┐
          └─► Frontend (tipos + build) ─────────────┴─► Testes E2E (Selenium) ─► Deploy
```

- **Pull request:** o CI precisa ficar verde antes do merge.
- **Push na `main`:** o Render publica backend e frontend **só depois que todos os checks passam**, por causa do `autoDeployTrigger: checksPass` no `render.yaml`. Se algum teste falhar, a versão no ar continua a anterior.
- **Produção:**
  - frontend: <https://nexus-frontend-5ip8.onrender.com>
  - backend: <https://nexus-backend-d6i9.onrender.com/health/>

O plano gratuito do Render desliga os serviços sem uso, então a primeira visita pode levar até um minuto.

## 9. Estilo de código

- **TypeScript:** formatado com [oxfmt](https://oxc.rs) (configuração em `.oxfmtrc.json`). Rode `bunx oxfmt --write <arquivos>` nos arquivos que você mudou.
- **Python:** siga a PEP 8, com nomes e mensagens em português, como no restante do backend.
- **Textos do site:** em português do Brasil.
- **Acessibilidade:** botões só com ícone precisam de `aria-label`. Animações novas devem respeitar `prefers-reduced-motion`.
- **Temas:** teste toda tela nova no tema claro e no escuro.

## 10. Problemas comuns

| Sintoma | Solução |
|---------|---------|
| As rotas `/api` dão erro 500 com `Illegal invocation` | Você rodou o frontend direto no Node 26. Use `bun run dev`, que usa o runtime do Bun, ou o Node 22 |
| `bun run e2e` diz que a porta está em uso | Feche o processo nas portas 3100/8100 ou defina `E2E_FRONTEND_PORT` e `E2E_BACKEND_PORT` |
| O login funciona, mas o `/admin` volta para o login | Confira se `SESSION_COOKIE_SECURE=False` no `.env` local |
| O chat não usa a IA | Sem `ANTHROPIC_API_KEY`, ele responde com a base local. Isso é esperado |
| O CI falha em "Verificar migrations pendentes" | Rode `manage.py makemigrations` e faça commit da migration gerada |
