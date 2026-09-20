import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import readline from "node:readline";
import path from "node:path";

const root = process.cwd();
const backend = path.join(root, "apps", "backend");
const frontend = path.join(root, "apps", "frontend");
const localPython = path.join(backend, ".venv", "bin", "python");
const python = process.env.PYTHON_BIN ?? (existsSync(localPython) ? localPython : "python3");
const localGunicorn = path.join(backend, ".venv", "bin", "gunicorn");
const gunicorn = process.env.GUNICORN_BIN ?? (existsSync(localGunicorn) ? localGunicorn : "gunicorn");
const backendPort = process.env.BACKEND_PORT ?? "8000";
const frontendPort = process.env.FRONTEND_PORT ?? "3000";
const workers = process.env.GUNICORN_WORKERS ?? "3";

const migration = spawnSync(python, ["manage.py", "migrate", "--noinput"], {
	cwd: backend,
	stdio: "inherit",
	env: process.env,
});

if (migration.error) throw migration.error;
if (migration.status !== 0) process.exit(migration.status ?? 1);

const processes = [
	{
		name: "BACKEND",
		command: gunicorn,
		args: [
			"--bind",
			`0.0.0.0:${backendPort}`,
			"--workers",
			workers,
			"--access-logfile",
			"-",
			"--error-logfile",
			"-",
			"projeto.wsgi:application",
		],
		cwd: backend,
		env: process.env,
	},
	{
		name: "FRONTEND",
		command: "bun",
		args: ["run", "start"],
		cwd: frontend,
		env: { ...process.env, PORT: frontendPort },
	},
];

const children = processes.map(({ name, command, args, cwd, env }) => {
	const child = spawn(command, args, {
		cwd,
		env,
		stdio: ["inherit", "pipe", "pipe"],
	});
	const prefix = `[${name}]`;

	const pipe = (stream: NodeJS.ReadableStream, output: NodeJS.WriteStream) => {
		const lines = readline.createInterface({ input: stream, crlfDelay: Infinity });
		lines.on("line", (line) => output.write(`${prefix} ${line}\n`));
	};

	if (child.stdout) pipe(child.stdout, process.stdout);
	if (child.stderr) pipe(child.stderr, process.stderr);
	child.on("error", (error) => console.error(`${prefix} ${error.message}`));
	child.on("exit", (code, signal) => {
		if (signal) console.log(`${prefix} encerrado por ${signal}`);
		else if (code !== 0) console.error(`${prefix} encerrado com código ${code}`);
	});

	return child;
});

let shuttingDown = false;
const shutdown = (signal: NodeJS.Signals) => {
	if (shuttingDown) return;
	shuttingDown = true;
	console.log(`\nEncerrando serviços (${signal})...`);
	for (const child of children) {
		if (!child.killed) child.kill("SIGTERM");
	}
	setTimeout(() => process.exit(0), 5000).unref();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
