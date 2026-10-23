import type { Pergunta, Resposta } from "./types";

// Mesmas regras do `chatbot/validation.py`, para o usuário não avançar com
// resposta inválida. O backend valida de novo de qualquer jeito.
export function validarResposta(
	pergunta: Pergunta,
	valor: string,
): { valor: Resposta } | { erro: string } {
	const texto = valor.trim();

	if (pergunta.type === "choice") {
		if (!pergunta.choices?.includes(texto)) {
			return { erro: "Escolha uma das opções." };
		}
		return { valor: texto };
	}

	if (pergunta.type === "number") {
		if (texto === "") return { erro: "Este campo é obrigatório." };
		const numero = Number(texto.replace(",", "."));
		if (!Number.isFinite(numero)) return { erro: "Informe um número." };
		if (pergunta.integer && !Number.isInteger(numero)) {
			return { erro: "Informe um número inteiro." };
		}
		if (pergunta.min !== undefined && numero < pergunta.min) {
			return { erro: `O valor mínimo é ${pergunta.min}.` };
		}
		if (pergunta.max !== undefined && numero > pergunta.max) {
			return { erro: `O valor máximo é ${pergunta.max}.` };
		}
		return { valor: numero };
	}

	if (texto === "") return { erro: "Este campo é obrigatório." };
	if (pergunta.max_length && texto.length > pergunta.max_length) {
		return { erro: `Use no máximo ${pergunta.max_length} caracteres.` };
	}
	return { valor: texto };
}
