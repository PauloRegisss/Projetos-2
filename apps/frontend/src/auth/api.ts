import { getEnv } from "waku";

// No navegador as requisições passam pelo proxy `/api` do próprio frontend
// (ver `pages/_api/api/[...path].ts`), para os cookies ficarem no mesmo site.
// No servidor o backend é chamado direto.
// Lido só na hora da requisição: `getEnv` só existe no ambiente react-server,
// e este módulo também é carregado no SSR de componentes de cliente.
function getApiUrl() {
	return import.meta.env.SSR ? getEnv("WAKU_PUBLIC_BACKEND_URL") : "/api";
}

export async function api(path: string, options: RequestInit = {}) {
	return fetch(`${getApiUrl()}${path}`, {
		...options,
		credentials: "include",
	});
}
