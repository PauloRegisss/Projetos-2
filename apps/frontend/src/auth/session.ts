import { unstable_getHeaders, unstable_redirect } from "waku/router/server";
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
		unstable_redirect("/auth");
	}
	const json = await response.json();
	if (!json.user.is_staff) return unstable_redirect("/auth");
	return (json.user ?? null) as User | null;
}
