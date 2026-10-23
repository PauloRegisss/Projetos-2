import { api } from "@/auth/api";
import { getCsrfToken } from "@/auth/auth";
import type { Respostas } from "./types";

type ErrosDeCampo = Record<string, { message: string; code: string }[]>;

export type ResultadoEnvio =
	| { ok: true; id: string }
	| { ok: false; titulo: string; descricao: string; campos?: ErrosDeCampo };

// Envia as respostas para `POST /chat/simular/` e traduz cada status em uma
// mensagem para o toast (mesmo padrão do formulário de contato).
export async function enviarSimulacao(
	respostas: Respostas,
): Promise<ResultadoEnvio> {
	try {
		const csrfToken = await getCsrfToken();
		const response = await api("/chat/simular/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrfToken,
			},
			body: JSON.stringify(respostas),
		});

		if (response.status === 400) {
			const data = await response.json().catch(() => ({}));
			return {
				ok: false,
				titulo: "Algumas respostas precisam de ajuste.",
				descricao: "Confira a pergunta destacada e tente de novo.",
				campos: data.fields,
			};
		}

		if (response.status === 429) {
			return {
				ok: false,
				titulo: "Muitas simulações seguidas.",
				descricao: "Aguarde um minuto e tente novamente.",
			};
		}

		if (!response.ok) {
			return {
				ok: false,
				titulo: "Não foi possível gerar a simulação.",
				descricao: "Tente novamente em instantes.",
			};
		}

		const data = await response.json();
		return { ok: true, id: data.id as string };
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			titulo: "Sem conexão com o servidor.",
			descricao: "Verifique sua internet e tente novamente.",
		};
	}
}
