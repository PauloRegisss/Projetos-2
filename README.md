# GRUPO 9

> Projeto desenvolvido em parceria com a **BzuTech** (empresa de IoT), como parte da disciplina de Projetos do 2º período — CESAR School.

## 📌 Tema

Educar empresas sobre a importância de coletar dados operacionais por meio de IoT para melhorar a gestão, performance e a tomada de decisão.

## 📝 Descrição do Projeto

> _[Descrição a ser definida]_

## 👥 Integrantes

### Ciência da Computação

| Nome | Email Institucional | 
|------|----------------------|
| Guilherme Fernandes de Lima Araújo | gfla@cesar.school 
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

- **Jira:** https://projeto-2-grupo-9.atlassian.net/jira/projects?page=1&sortKey=name&sortOrder=ASC&types=software%2Cbusiness

## Entregável 1 FDS 
- **Print do Backlog:** 
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/Captura%20de%20tela%202026-08-28%20181230.png)

- **Análise de Competidores:**
https://github.com/PauloRegisss/Projetos-2/blob/main/Ana%CC%81lise%20de%20Competidores.md

## Entregável 2 FDS 

- **Issue/bug tracker:**

- **Deployment da infraestrutura em produção:**

- **Screencast de explicação do código Django:**

- **Print do Backlog:**
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/Captura%20de%20tela%202026-09-18%20202254.png)

## 🛠️ Tecnologias

> _[A definir]_

## 🚀 Como executar

1. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

Bun
Python 3
Git

Para verificar as instalações:

bun --version
python --version
git --version
2. Clonar o repositório

Clone o projeto:

git clone https://github.com/PauloRegisss/Projetos-2.git

Entre na pasta:

cd Projetos-2
3. Instalar as dependências

Instale as dependências do projeto utilizando o Bun:

bun install

O projeto utiliza workspaces, portanto as aplicações localizadas dentro de apps/ fazem parte do mesmo projeto.

4. Configurar as variáveis de ambiente

Crie o arquivo .env a partir do arquivo de exemplo:

cp .env.example .env

Depois, configure as variáveis de acordo com seu ambiente.

Entre as principais configurações estão:

WAKU_PUBLIC_BACKEND_URL=http://localhost:8000

SECRET_KEY=sua-chave-secreta

DEBUG=True

ALLOWED_HOSTS=localhost,127.0.0.1

CORS_ALLOWED_ORIGINS=http://localhost:3000

CSRF_TRUSTED_ORIGINS=http://localhost:3000

DATABASE_URL=sqlite:///apps/backend/db.sqlite3

BACKEND_PORT=8000
FRONTEND_PORT=3000

Importante: não coloque senhas, chaves secretas ou outras credenciais reais no GitHub. Utilize o .env localmente e mantenha esse arquivo fora do versionamento.

▶️ Executando o projeto
Opção 1 — Executar o projeto completo

Para iniciar o ambiente de desenvolvimento:

bun run dev

Esse comando utiliza os scripts do projeto para iniciar o ambiente de desenvolvimento.

Opção 2 — Executar somente o frontend

Caso queira executar apenas a aplicação frontend:

bun run frontend:dev

O frontend estará disponível, normalmente, em:

http://localhost:3000
Opção 3 — Executar somente o backend

Para iniciar o backend:

bun run backend:dev

O backend utiliza a porta definida pela configuração do ambiente, sendo 8000 a porta padrão utilizada no projeto.

http://localhost:8000
🏭 Build para produção

Para gerar a build do projeto:

bun run build

Também é possível gerar a build somente do frontend:

bun run frontend:build

Depois da build, o frontend pode ser iniciado com:

bun run frontend:start

## 📄 Licença

> _[A definir]_
