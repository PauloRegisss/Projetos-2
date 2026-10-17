import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "waku/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// O Waku só carrega o `.env` da pasta do frontend. Carrega também o da raiz
// do monorepo para o servidor ter acesso ao `WAKU_PUBLIC_BACKEND_URL` no dev.
// Variáveis já definidas no ambiente (ex.: Render) não são sobrescritas.
const rootEnv = path.resolve(__dirname, "../../.env");
if (existsSync(rootEnv)) {
	process.loadEnvFile(rootEnv);
}

export default defineConfig({
	vite: {
		plugins: [
			tailwindcss(),
			react(),
			babel({ presets: [reactCompilerPreset()] }),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		optimizeDeps: {
			exclude: ["lucide-react"],
		},
		envDir: "../../",
	},
});
