const ROOT = process.cwd();

const BACKEND_DIR = `${ROOT}/apps/backend`;
const MANAGE_PY = `${BACKEND_DIR}/manage.py`;

const IS_WINDOWS = process.platform === "win32";

const VENV_PYTHON = IS_WINDOWS
	? `${BACKEND_DIR}/.venv/Scripts/python.exe`
	: `${BACKEND_DIR}/.venv/bin/python`;

function info(message: string) {
	console.log(`\x1b[36m[django]\x1b[0m ${message}`);
}

function error(message: string) {
	console.error(`\x1b[31m[django]\x1b[0m ${message}`);
}

async function exists(path: string) {
	return Bun.file(path).exists();
}

async function main() {
	if (!(await exists(MANAGE_PY))) {
		error(`manage.py não encontrado:\n${MANAGE_PY}`);
		process.exit(1);
	}

	if (!(await exists(VENV_PYTHON))) {
		error(
			`Ambiente virtual não encontrado:\n${VENV_PYTHON}\n\n` +
				`Execute primeiro:\n  bun run setup`,
		);

		process.exit(1);
	}

	info("Iniciando Django...");
	info(`Backend: ${BACKEND_DIR}`);
	info(`Python: ${VENV_PYTHON}`);

	const proc = Bun.spawn([VENV_PYTHON, MANAGE_PY, "runserver"], {
		cwd: BACKEND_DIR,

		env: {
			...process.env,
		},

		stdin: "inherit",
		stdout: "inherit",
		stderr: "inherit",
	});

	const exitCode = await proc.exited;

	process.exit(exitCode);
}

await main();
