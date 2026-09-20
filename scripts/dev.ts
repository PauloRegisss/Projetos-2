import { spawn } from "node:child_process";
import readline from "node:readline";

const processes = [
	{
		name: "FRONTEND",
		command: "bun",
		args: ["run", "frontend:dev"],
	},
	{
		name: "BACKEND",
		command: "bun",
		args: ["run", "backend:dev"],
	},
];

const children = processes.map(({ name, command, args }) => {
	const child = spawn(command, args, {
		shell: true,
		stdio: ["inherit", "pipe", "pipe"],
	});

	const prefix = `[${name}]`;

	const pipe = (stream: NodeJS.ReadableStream, output: NodeJS.WriteStream) => {
		const rl = readline.createInterface({
			input: stream,
			crlfDelay: Infinity,
		});

		rl.on("line", (line) => {
			output.write(`${prefix} ${line}\n`);
		});
	};

	if (child.stdout) {
		pipe(child.stdout, process.stdout);
	}

	if (child.stderr) {
		pipe(child.stderr, process.stderr);
	}

	child.on("error", (error) => {
		console.error(`${prefix} ${error.message}`);
	});

	child.on("exit", (code, signal) => {
		if (signal) {
			console.log(`${prefix} encerrado por ${signal}`);
		} else {
			console.log(`${prefix} encerrado com código ${code}`);
		}
	});

	return child;
});

const shutdown = () => {
	console.log("\nEncerrando frontend e backend...");

	for (const child of children) {
		if (!child.killed) {
			child.kill("SIGTERM");
		}
	}
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
