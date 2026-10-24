# Projeto Nexus

> Projeto desenvolvido em parceria com a **BzuTech** (empresa de IoT), como parte da disciplina de Projetos do 2º período — CESAR School.

## 📌 Tema

Educar empresas sobre a importância de coletar dados operacionais por meio de IoT para melhorar a gestão, performance e a tomada de decisão.

## 🌐 Acesse o Projeto

🔗 **Link do deploy:** [nexus-frontend-5ip8.onrender.com](https://nexus-frontend-5ip8.onrender.com/)

## 📝 Descrição do Projeto

Muitas empresas ainda tomam decisões operacionais com base em observação manual e experiência, sem dados concretos sobre o que realmente acontece no dia a dia da operação — seja no chão de fábrica, na lavoura, na cadeia de frios ou na frota de transporte. Esse projeto, desenvolvido em parceria com a BzuTech, tem como objetivo mostrar de forma clara e visual o diferencial que a aplicação de IoT (Internet das Coisas) traz para diferentes setores de negócio.

Uma plataforma interativa que mensura o impacto do IoT no seu negócio. Por meio de um chatbot conversacional estilo autoatendimento, a empresa informa seu cenário atual; a partir das respostas, o sistema calcula as métricas de desempenho e eficiência com e sem a aplicação de IoT, e uma Inteligência Artificial gera uma análise personalizada do resultado. Tudo isso é apresentado em um Showroom Interativo, com link próprio para cada simulação.

O projeto conta ainda com um canal de contato integrado ao backend, permitindo que visitantes enviem mensagens que ficam disponíveis para a equipe através de um painel administrativo próprio.

## 👥 Integrantes

### Ciência da Computação

| Nome | Email Institucional |
|------|----------------------|
| Guilherme Fernandes de Lima Araújo | gfla@cesar.school |
| Luiz Eduardo Albuquerque Alves de Lima | leaal@cesar.school |
| Paulo César Regis de Lima | pcrl@cesar.school |
| Pedro Antonio Beltrão Rihan | pabr@cesar.school |
| Rafael Ramos Novaes de Freitas | rrnf@cesar.school |
| Ricardo Marinho do Prado | rmp3@cesar.school |
| Thony Guilherme de Aquino Barreto | tgab@cesar.school |

### Design

| Nome | Email Institucional |
|------|----------------------|
| Helena Gabrielli Bezerra Santos | hgbs@cesar.school |
| Júlia Teixeira Catão Ribeiro | jtcr@cesar.school |
| Sofia Marinho de Hollanda Cavalcanti | smhc@cesar.school |
| Thamires Gestosa Vieira | tgv@cesar.school |

## 🏢 Empresa Parceira

**BzuTech** — IoT para eficiência máxima.
Site da BzuTech: [www.bzutech.com.br](https://www.bzutech.com.br)
## 📋 Gestão do Projeto

- **Jira:** https://cesar-team-fds-cc.atlassian.net/jira/software/projects/SCRUM/boards/1?filter=&groupBy=none&atlOrigin=eyJpIjoiYTQ0MDkxMzk1MTkzNDQ3NmJhY2RkNDM1ODJiYTcxYTEiLCJwIjoiaiJ9

## Entregável 1 FDS 
- **Print do Backlog:** 
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/Captura%20de%20tela%202026-08-28%20181230.png)

- **Análise de Competidores:**
[Análise de Competidores.md](./An%C3%A1lise%20de%20Competidores.md)

## Entregável 2 FDS 

- **Deployment da infraestrutura em produção:**
https://www.youtube.com/watch?v=cQkOwgvnDnk

- **Screencast de explicação do código Django:**
https://www.youtube.com/watch?v=sYD3GoiuwKU

- **Print do Backlog:**
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/Captura%20de%20tela%202026-09-18%20202254.png)

- **Issue/bug tracker:**
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/imagem_2026-09-20_213144532.png)

## Entregável 3 FDS
- **Print da Sprint:**
![Print da Sprint](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/imagem_2026-10-18_202158615.png)

- **Print do Backlog:**
![Print do Backlog](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/imagem_2026-10-16_181635211.png)
  
- **Issue/bug tracker:**
![Print do Issue/Bug Tracker](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/imagem_2026-10-17_213726095.png)

- **Histórias de usuário:** as 6 histórias, com os cenários de validação em BDD (Dado / Quando / Então), estão em **[historias.md](./historias.md)**.

### Histórias implementadas

> **📌 História 1 – Alternar tema claro/escuro**<br>
> **Como** usuário da plataforma, **quero** alternar entre o modo claro e o modo escuro, **para** adaptar a visualização à minha preferência e conforto visual.<br>
> **Critérios de aceitação:** botão de tema no cabeçalho do site e do painel administrativo; troca imediata das cores; preferência lembrada ao voltar ao site; na primeira visita, segue o tema do sistema.

> **📌 História 2 – Abrir o chatbot**<br>
> **Como** tomador de decisão do negócio, **quero** abrir a tela do chatbot conversacional, **para** iniciar a avaliação do impacto do IoT na minha empresa.<br>
> **Critérios de aceitação:** botão flutuante em todas as páginas abre o chat; o chat também abre pelo botão "Começar simulação" do Showroom; fecha pelo botão ou pela tecla Esc.<br>
> **Issues:** #16, #21

> **📌 História 3 – Receber as perguntas**<br>
> **Como** usuário, **quero** receber perguntas automatizadas sobre a operação do meu negócio, **para** que a IA compreenda o meu cenário atual.<br>
> **Critérios de aceitação:** perguntas carregadas do backend (`GET /chat/perguntas/`); uma pergunta por vez, com barra de progresso; campo adequado a cada tipo (texto, número ou opções).<br>
> **Issues:** #16, #21

> **📌 História 4 – Responder às perguntas**<br>
> **Como** usuário da plataforma, **quero** responder às perguntas do chatbot, **para** que a IA receba os dados reais da minha empresa.<br>
> **Critérios de aceitação:** resposta inválida não avança e mostra o motivo; é possível voltar e recomeçar; o backend valida de novo (`POST /chat/simular/`) e recusa dados inválidos com erro por campo.<br>
> **Issues:** #17, #21, #22

> **📌 História 5 – Gerar o Showroom**<br>
> **Como** usuário, **quero** que os dados informados sejam processados e gerem um Showroom Interativo, **para** que o impacto do IoT no meu negócio seja calculado automaticamente.<br>
> **Critérios de aceitação:** métricas com e sem IoT calculadas no backend; análise personalizada gerada por IA, com texto padrão se a IA estiver indisponível; simulação salva com id próprio; limite de 5 simulações por minuto.<br>
> **Issues:** #18, #19, #20, #24

> **📌 História 6 – Visualizar o Showroom**<br>
> **Como** tomador de decisão do negócio, **quero** visualizar o Showroom gerado, **para** comparar as métricas da minha empresa com e sem IoT.<br>
> **Critérios de aceitação:** economia mensal e anual; comparativo de energia, manutenção, paradas e desperdício; análise e aviso de estimativa; link próprio (`/showroom/<id>`) que pode ser recarregado e compartilhado; mensagem amigável para simulação inexistente.<br>
> **Issues:** #23

### Screencasts

- **Screencast de explicação do código Django:** _(link do YouTube)_
- **Screencast do deploy das histórias de usuário:** _(link do YouTube)_

## 🛠️ Tecnologias

**Backend**

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)
![Claude](https://img.shields.io/badge/Claude%20(Anthropic%20API)-D97757?style=for-the-badge&logo=anthropic&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Waku](https://img.shields.io/badge/Waku-111111?style=for-the-badge&logo=react&logoColor=white)

**Infraestrutura**

![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* [Bun](https://bun.sh/)
* [Python 3](https://www.python.org/)
* Git

Verifique as versões instaladas:

```bash
bun --version
python --version
git --version
```

### 1. Clone o repositório

```bash
git clone https://github.com/PauloRegisss/Projetos-2.git
```

Entre na pasta do projeto:

```bash
cd Projetos-2
```

### 2. Instale as dependências

```bash
bun run setup
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `.env` a partir do arquivo de exemplo:

```bash
cp .env.example .env
```

Depois, configure as variáveis de ambiente necessárias no arquivo `.env`. Para rodar localmente, use:

```env
WAKU_PUBLIC_BACKEND_URL="http://localhost:8000"
DEBUG=True
ALLOWED_HOSTS="localhost,127.0.0.1"
```

A variável `ANTHROPIC_API_KEY` é opcional: sem ela, o Showroom usa uma análise padrão no lugar da gerada pela IA.

### 4. Crie o banco de dados

Aplique as migrations (cria as tabelas de contatos e de simulações):

```bash
apps/backend/.venv/bin/python apps/backend/manage.py migrate
```

Para acessar o painel administrativo (`/admin`), crie um usuário administrador:

```bash
apps/backend/.venv/bin/python apps/backend/manage.py createsuperuser
```

> No Windows, use `apps\backend\.venv\Scripts\python.exe` no lugar de `apps/backend/.venv/bin/python`.

### 5. Execute o projeto

Para iniciar o frontend e o backend em ambiente de desenvolvimento:

```bash
bun run dev
```

O frontend estará disponível em:

```text
http://localhost:3000
```

E o backend em:

```text
http://localhost:8000
```

### Executar apenas o frontend

```bash
bun run frontend:dev
```

### Executar apenas o backend

```bash
bun run backend:dev
```

### 🧪 Testes

Para rodar os testes automatizados do backend:

```bash
cd apps/backend
.venv/bin/python manage.py test
```

### 🏭 Build

Para gerar a build do projeto:

```bash
bun run build
```

Para gerar a build apenas do frontend:

```bash
bun run frontend:build
```

Para iniciar o frontend após a build:

```bash
bun run frontend:start
```


## 📄 Licença

> _[A definir]_
