# Projeto Nexus

> Projeto desenvolvido em parceria com a **BzuTech** (empresa de IoT), como parte da disciplina de Projetos do 2º período — CESAR School.

## 📌 Tema

Educar empresas sobre a importância de coletar dados operacionais por meio de IoT para melhorar a gestão, performance e a tomada de decisão.

## 📝 Descrição do Projeto

Muitas empresas ainda tomam decisões operacionais com base em observação manual e experiência, sem dados concretos sobre o que realmente acontece no dia a dia da operação — seja no chão de fábrica, na lavoura, na cadeia de frios ou na frota de transporte. Esse projeto, desenvolvido em parceria com a BzuTech, tem como objetivo mostrar de forma clara e visual o diferencial que a aplicação de IoT (Internet das Coisas) traz para diferentes setores de negócio.

A plataforma apresenta uma landing page introdutória, explicando de forma simples o que é IoT e como sensores conectados transformam dados físicos em decisões de gestão. A partir dela, o usuário é direcionado para uma dashboard interativa, que exibe o comparativo de "antes e depois" da aplicação de IoT em diversos setores — como agro, indústria, saúde, energia, transporte e varejo — evidenciando ganhos em eficiência, redução de custos e antecipação de problemas.

O projeto conta ainda com um canal de contato integrado ao backend, permitindo que visitantes enviem mensagens que ficam disponíveis para a equipe através de um painel administrativo próprio.

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
[https://github.com/PauloRegisss/Projetos-2/blob/main/Ana%CC%81lise%20de%20Competidores.md](https://github.com/PauloRegisss/Projetos-2/blob/main/An%C3%A1lise%20de%20Competidores.md)

## Entregável 2 FDS 

- **Deployment da infraestrutura em produção:**
https://www.youtube.com/watch?v=cQkOwgvnDnk

- **Screencast de explicação do código Django:**
https://www.youtube.com/watch?v=sYD3GoiuwKU

- **Print do Backlog:**
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/Captura%20de%20tela%202026-09-18%20202254.png)

- **Issue/bug tracker:**
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/imagem_2026-09-20_213144532.png)

## 🛠️ Tecnologias

**Backend**

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/Django%20REST%20Framework-A30000?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

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

Depois, configure as variáveis de ambiente necessárias no arquivo `.env`.

### 4. Execute o projeto

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
