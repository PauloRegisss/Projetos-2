import { unstable_getHeaders } from "waku/router/server";
import { api } from "./api";

export interface User {
	id: number;
	username: string;
	email: string;
	is_staff: boolean;
}

// Usado apenas em componentes de servidor: repassa ao backend só o cookie
// da requisição do navegador. Repassar todos os headers (ex.: Host) faz o
// Django recusar a requisição.
export async function getSession(): Promise<User | null> {
	const { cookie } = unstable_getHeaders();
	const response = await api("/auth/me/", {
		headers: cookie ? { cookie } : {},
	});
	if (response.status === 401) {
		return null;
	}

	if (!response.ok) {
		throw new Error("Erro ao verificar autenticação");
	}
	const json = (await response.json()) as { user?: User };
	// Só staff acessa o admin. Não redireciona aqui: a página `/auth` também
	// usa esta função, e redirecionar para ela mesma criaria um loop.
	return json.user?.is_staff ? json.user : null;
}
