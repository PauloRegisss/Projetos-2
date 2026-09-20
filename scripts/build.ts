import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const backend = path.join(root, "apps", "backend");
const frontend = path.join(root, "apps", "frontend");
const localPython = path.join(backend, ".venv", "bin", "python");
const python = process.env.PYTHON_BIN ?? (existsSync(localPython) ? localPython : "python3");

function run(command: string, args: string[], cwd: string) {
	console.log(`\n> ${command} ${args.join(" ")}`);
	const result = spawnSync(command, args, {
		cwd,
		stdio: "inherit",
		env: process.env,
	});

	if (result.error) throw result.error;
	if (result.status !== 0) {
		process.exit(result.status ?? 1);
	}
}

console.log("Construindo backend...");
run(python, ["manage.py", "check"], backend);
run(python, ["manage.py", "collectstatic", "--noinput"], backend);

console.log("Construindo frontend...");
run("bun", ["run", "build"], frontend);

console.log("\nBuild de produção concluído.");
