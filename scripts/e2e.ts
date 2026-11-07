// Testes de sistema (E2E) com Selenium: sobe backend e frontend em portas próprias,
// com um banco temporário, roda o pytest e desliga tudo no fim.
//
//   bun run e2e          testes rápidos, sem janela (é o que o CI roda)
//   bun run e2e:demo     abre o Chrome, devagar e com legendas, para gravar o screencast
//   bun run e2e -- -k historia_7    repassa argumentos para o pytest
import { type ChildProcess, spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const raiz = process.cwd();
const backend = path.join(raiz, "apps", "backend");
const frontend = path.join(raiz, "apps", "frontend");
const pastaTestes = path.join(raiz, "e2e");

const argumentos = process.argv.slice(2);
const demo = argumentos.includes("--demo");
const semBuild = argumentos.includes("--sem-build");
const argumentosPytest = argumentos.filter((arg) => !["--demo", "--sem-build", "--"].includes(arg));

const pythonVenv =
	process.platform === "win32"
		? path.join(backend, ".venv", "Scripts", "python.exe")
		: path.join(backend, ".venv", "bin", "python");
const python = process.env.PYTHON_BIN ?? (existsSync(pythonVenv) ? pythonVenv : "python3");

// Portas diferentes das do `bun run dev`, para os testes não brigarem com o projeto aberto.
const portaBackend = process.env.E2E_BACKEND_PORT ?? "8100";
const portaFrontend = process.env.E2E_FRONTEND_PORT ?? "3100";
const urlBackend = `http://localhost:${portaBackend}`;
const urlFrontend = `http://localhost:${portaFrontend}`;

const pastaTemporaria = mkdtempSync(path.join(tmpdir(), "nexus-e2e-"));
const ambiente: NodeJS.ProcessEnv = {
	...process.env,
	DATABASE_URL: `sqlite:///${path.join(pastaTemporaria, "e2e.sqlite3")}`,
	SECRET_KEY: process.env.SECRET_KEY ?? "chave-usada-somente-nos-testes-e2e",
	DEBUG: "True",
	ALLOWED_HOSTS: "localhost,127.0.0.1",
	CORS_ALLOWED_ORIGINS: urlFrontend,
	CSRF_TRUSTED_ORIGINS: urlFrontend,
	SESSION_COOKIE_SECURE: "False",
	// Sem chave, o chat e a análise usam as respostas locais: o resultado fica previsível.
	ANTHROPIC_API_KEY: "",
	WAKU_PUBLIC_BACKEND_URL: urlBackend,
	E2E_BASE_URL: urlFrontend,
	PORT: portaFrontend,
	PYTHONUNBUFFERED: "1",
	...(demo ? { E2E_DEMO: "1" } : {}),
};

const processos: ChildProcess[] = [];

function etapa(mensagem: string) {
	console.log(`\n\x1b[36m[e2e]\x1b[0m ${mensagem}`);
}

function falhar(mensagem: string): never {
	console.error(`\n\x1b[31m[e2e] ${mensagem}\x1b[0m`);
	encerrar(1);
}

function executar(comando: string, args: string[], cwd = raiz) {
	const resultado = spawnSync(comando, args, { cwd, env: ambiente, stdio: "inherit" });
	if (resultado.status !== 0) falhar(`Falhou: ${comando} ${args.join(" ")}`);
}

function iniciar(nome: string, comando: string, args: string[], cwd: string) {
	const filho = spawn(comando, args, { cwd, env: ambiente, stdio: ["ignore", "pipe", "pipe"], detached: process.platform !== "win32" });
	const prefixo = `\x1b[90m[${nome}]\x1b[0m `;
	const mostrar = process.env.E2E_LOGS === "1";
	filho.stdout?.on("data", (dados) => mostrar && process.stdout.write(prefixo + dados));
	filho.stderr?.on("data", (dados) => mostrar && process.stderr.write(prefixo + dados));
	processos.push(filho);
	return filho;
}

async function responde(url: string) {
	try {
		await fetch(url, { signal: AbortSignal.timeout(1500) });
		return true;
	} catch {
		return false;
	}
}

async function aguardar(url: string, nome: string) {
	for (let tentativa = 0; tentativa < 90; tentativa++) {
		if (await responde(url)) return;
		await Bun.sleep(1000);
	}
	falhar(`${nome} não respondeu em ${url}. Rode com E2E_LOGS=1 para ver os logs.`);
}

function encerrar(codigo: number): never {
	for (const filho of processos) {
		try {
			if (filho.pid && process.platform !== "win32") process.kill(-filho.pid, "SIGTERM");
			else filho.kill("SIGTERM");
		} catch {}
	}
	rmSync(pastaTemporaria, { recursive: true, force: true });
	process.exit(codigo);
}

process.on("SIGINT", () => encerrar(130));

for (const url of [urlBackend, urlFrontend]) {
	if (await responde(url)) falhar(`A porta de ${url} já está em uso. Feche o processo ou defina E2E_BACKEND_PORT/E2E_FRONTEND_PORT.`);
}

const temDependencias = spawnSync(python, ["-c", "import selenium, pytest"], { env: ambiente }).status === 0;
if (!temDependencias) {
	etapa("Instalando Selenium e pytest");
	executar(python, ["-m", "pip", "install", "-q", "-r", path.join(pastaTestes, "requirements.txt")]);
}

etapa("Criando o banco temporário");
executar(python, ["manage.py", "migrate", "--noinput"], backend);

if (!semBuild) {
	etapa("Gerando o build do frontend");
	executar("bun", ["run", "build"], frontend);
}

etapa(`Subindo backend (${urlBackend}) e frontend (${urlFrontend})`);
iniciar("backend", python, ["manage.py", "runserver", `127.0.0.1:${portaBackend}`, "--noreload"], backend);
iniciar("frontend", "bun", ["--bun", "run", "start"], frontend);
await aguardar(`${urlBackend}/health/`, "O backend");
await aguardar(urlFrontend, "O frontend");

etapa(demo ? "Rodando os testes no modo demonstração" : "Rodando os testes");
const testes = spawnSync(python, ["-m", "pytest", ...argumentosPytest], { cwd: pastaTestes, env: ambiente, stdio: "inherit" });
encerrar(testes.status ?? 1);
