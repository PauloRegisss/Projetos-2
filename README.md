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

- **Deployment da infraestrutura em produção:**
https://www.youtube.com/watch?v=sYD3GoiuwKU

- **Screencast de explicação do código Django:**
https://youtu.be/cQkOwgvnDnk

- **Print do Backlog:**
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/Captura%20de%20tela%202026-09-18%20202254.png)

- **Issue/bug tracker:**
![Backlog Image](https://github.com/PauloRegisss/Projetos-2/blob/main/Prints/imagem_2026-09-20_213144532.png)

## 🛠️ Tecnologias

> _[A definir]_

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
