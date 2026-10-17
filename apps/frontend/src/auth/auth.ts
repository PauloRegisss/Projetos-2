import { api } from "./api";

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

export async function signOut() {
	const csrfToken = await getCsrfToken();

	return await api("/auth/logout/", {
		method: "POST",
		headers: {
			"X-CSRFToken": csrfToken,
		},
	});
}
