function getApiUrl() {
	return import.meta.env.WAKU_PUBLIC_BACKEND_URL;
}

export async function api(path: string, options: RequestInit = {}) {
	return fetch(`${getApiUrl()}${path}`, {
		...options,
		credentials: "include",
	});
}
