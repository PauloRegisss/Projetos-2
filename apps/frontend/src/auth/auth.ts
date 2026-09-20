import { api } from "./api";

interface User {
	id: number;
	username: string;
	email: string;
	is_staff: boolean;
}

export async function getCsrfToken() {
	const response = await api("/auth/csrf/");

	if (!response.ok) {
		throw new Error("Não foi possível obter o token CSRF");
	}

	const data = await response.json();

	return data.csrfToken as string;
}

export async function signIn({
	username,
	password,
}: {
	username: string;
	password: string;
}) {
	const csrfToken = await getCsrfToken();

	return await api("/auth/login/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": csrfToken,
		},
		body: JSON.stringify({
			username,
			password,
		}),
	});
}

export async function getSession(): Promise<User | null> {
	const response = await api("/auth/me/");
	if (response.status === 401) {
		return null;
	}

	if (!response.ok) {
		throw new Error("Erro ao verificar autenticação");
	}
	const json = await response.json();
	return (json.user ?? null) as User | null;
}
