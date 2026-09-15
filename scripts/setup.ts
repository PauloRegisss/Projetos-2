const ROOT = process.cwd();
const APPS_DIR = `${ROOT}/apps`;
const BACKEND_DIR = `${APPS_DIR}/backend`;
const FRONTEND_DIR = `${APPS_DIR}/frontend`;

const VENV_DIR = `${BACKEND_DIR}/.venv`;
const REQUIREMENTS_FILE = `${BACKEND_DIR}/requirements.txt`;

const IS_WINDOWS = process.platform === "win32";

const PYTHON = IS_WINDOWS
	? (Bun.which("python") ?? Bun.which("py"))
	: (Bun.which("python3") ?? Bun.which("python"));

const VENV_PYTHON = IS_WINDOWS
	? `${VENV_DIR}/Scripts/python.exe`
	: `${VENV_DIR}/bin/python`;

function info(message: string) {
	console.log(`\n\x1b[36m[setup]\x1b[0m ${message}`);
}

function success(message: string) {
	console.log(`\x1b[32m✓\x1b[0m ${message}`);
}

function fail(message: string): never {
	console.error(`\n\x1b[31m✗ ${message}\x1b[0m`);
	process.exit(1);
}

async function exists(path: string) {
	return Bun.file(path).exists();
}

async function run(command: string, args: string[], cwd = ROOT) {
	const proc = Bun.spawn([command, ...args], {
		cwd,
		stdin: "inherit",
		stdout: "inherit",
		stderr: "inherit",
	});

	const exitCode = await proc.exited;

	if (exitCode !== 0) {
		throw new Error(
			`Comando falhou com código ${exitCode}: ${command} ${args.join(" ")}`,
		);
	}
}

async function checkStructure() {
	info("Verificando estrutura do monorepo...");

	if (!(await exists(`${BACKEND_DIR}/manage.py`))) {
		fail("Backend não encontrado em 'apps/backend'.");
	}

	if (!(await exists(`${FRONTEND_DIR}/package.json`))) {
		fail("Frontend não encontrado em 'apps/frontend'.");
	}

	if (!(await exists(REQUIREMENTS_FILE))) {
		fail("requirements.txt não encontrado em 'apps/backend/requirements.txt'.");
	}

	success("Estrutura do monorepo encontrada.");
}

async function setupBun() {
	info("Verificando Bun...");

	const bun = Bun.which("bun");

	if (!bun) {
		fail("Bun não encontrado. Instale o Bun antes de executar o setup.");
	}

	success(`Bun encontrado: ${bun}`);

	info("Instalando dependências JavaScript...");

	await run(bun, ["install"], ROOT);

	success("Dependências JavaScript instaladas.");
}

async function setupPython() {
	info("Verificando Python...");

	if (!PYTHON) {
		fail(
			"Python não encontrado.\n" +
				"Instale Python 3 antes de executar o setup.",
		);
	}

	success(`Python encontrado: ${PYTHON}`);

	if (!(await exists(VENV_DIR))) {
		info("Criando ambiente virtual Python...");

		await run(PYTHON, ["-m", "venv", VENV_DIR], BACKEND_DIR);

		success("Ambiente virtual criado.");
	} else {
		success("Ambiente virtual já existe.");
	}

	if (!(await exists(VENV_PYTHON))) {
		fail(`Python do ambiente virtual não encontrado:\n${VENV_PYTHON}`);
	}

	info("Atualizando pip...");

	await run(
		VENV_PYTHON,
		["-m", "pip", "install", "--upgrade", "pip"],
		BACKEND_DIR,
	);

	success("pip atualizado.");

	info("Instalando dependências do Django...");

	await run(
		VENV_PYTHON,
		["-m", "pip", "install", "-r", REQUIREMENTS_FILE],
		BACKEND_DIR,
	);

	success("Dependências Python instaladas.");
}

async function main() {
	console.log(`
\x1b[35m╔══════════════════════════════════════╗
║          PROJETOS-2 SETUP             ║
║          Bun + Waku + Django          ║
╚══════════════════════════════════════╝\x1b[0m
`);

	console.log(`Sistema: ${process.platform}`);
	console.log(`Root: ${ROOT}`);

	try {
		await checkStructure();

		await setupBun();

		await setupPython();

		console.log(`
\x1b[32m╔══════════════════════════════════════╗
║       ✓ SETUP CONCLUÍDO              ║
╚══════════════════════════════════════╝\x1b[0m
`);

		console.log("Para iniciar o projeto:");
		console.log("\n  bun run backend:dev\n");
	} catch (error) {
		fail(
			error instanceof Error
				? error.message
				: "Erro desconhecido durante o setup.",
		);
	}
}

await main();
