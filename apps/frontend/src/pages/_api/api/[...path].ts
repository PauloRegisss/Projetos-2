// import { getEnv } from "waku";
// import type { ApiContext } from "waku/router";

// // Proxy do navegador para o Django: o navegador chama `/api/...` no próprio
// // domínio do frontend, então os cookies de sessão e CSRF ficam no mesmo site
// // e não são tratados como cookies de terceiros.

// const FORWARDED_REQUEST_HEADERS = [
// 	"accept",
// 	"content-type",
// 	"cookie",
// 	"origin",
// 	"referer",
// 	"x-csrftoken",
// 	// IP original do navegador, usado pelo rate limit do backend.
// 	"x-forwarded-for",
// ];

// // O `fetch` do servidor já descomprime o corpo, então esses headers da
// // resposta original não valem mais para o corpo repassado.
// const DROPPED_RESPONSE_HEADERS = [
// 	"content-encoding",
// 	"content-length",
// 	"transfer-encoding",
// 	"connection",
// ];

// async function proxy(
// 	request: Request,
// 	{ params }: ApiContext<"/api/[...path]">,
// ) {
// 	const { search } = new URL(request.url);
// 	// Todas as rotas do Django terminam com "/".
// 	const target = `${getEnv("WAKU_PUBLIC_BACKEND_URL")}/${params.path.join("/")}/${search}`;

// 	const headers = new Headers();
// 	for (const name of FORWARDED_REQUEST_HEADERS) {
// 		const value = request.headers.get(name);
// 		if (value) headers.set(name, value);
// 	}

// 	const hasBody = request.method !== "GET" && request.method !== "HEAD";
// 	const response = await fetch(target, {
// 		method: request.method,
// 		headers,
// 		body: hasBody ? await request.arrayBuffer() : null,
// 		redirect: "manual",
// 	});

// 	const responseHeaders = new Headers();
// 	response.headers.forEach((value, name) => {
// 		if (name !== "set-cookie" && !DROPPED_RESPONSE_HEADERS.includes(name)) {
// 			responseHeaders.set(name, value);
// 		}
// 	});
// 	for (const cookie of response.headers.getSetCookie()) {
// 		responseHeaders.append("set-cookie", cookie);
// 	}

// 	return new Response(response.body, {
// 		status: response.status,
// 		headers: responseHeaders,
// 	});
// }

// export const GET = proxy;
// export const POST = proxy;
// export const PUT = proxy;
// export const PATCH = proxy;
// export const DELETE = proxy;
