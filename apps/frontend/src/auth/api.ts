import { getEnv } from "waku";
import { unstable_getHeaders } from "waku/router/server";

const API_URL = import.meta.env.SSR
	? getEnv("WAKU_PUBLIC_BACKEND_URL")
	: import.meta.env.WAKU_PUBLIC_BACKEND_URL;
export async function api(path: string, options: RequestInit = {}) {
	const headers = unstable_getHeaders();
	return fetch(`${API_URL}${path}`, {
		...options,
		credentials: "include",
		headers,
	});
}
