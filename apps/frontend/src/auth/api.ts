import { getEnv } from "waku";

// Lido só na hora da requisição: `getEnv` só existe no ambiente react-server,
// e este módulo também é carregado no SSR de componentes de cliente.
function getApiUrl() {
	return import.meta.env.SSR
		? getEnv("WAKU_PUBLIC_BACKEND_URL")
		: import.meta.env.WAKU_PUBLIC_BACKEND_URL;
}

export async function api(path: string, options: RequestInit = {}) {
	return fetch(`${getApiUrl()}${path}`, {
		...options,
		credentials: "include",
	});
}
