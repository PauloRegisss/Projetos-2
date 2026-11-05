import { api } from "@/auth/api";
import { getCsrfToken } from "@/auth/auth";

export type MensagemAssistente = { role: "user" | "assistant"; content: string };

export type ResultadoAssistente = { ok: true; resposta: string } | { ok: false; erro: string };

// O serviço gratuito do Render pode levar quase um minuto para acordar.
const TIMEOUT_MS = 70_000;

// Envia a conversa para `POST /chat/assistente/` e traduz cada status em uma mensagem para o chat.
export async function perguntarAssistente(mensagens: MensagemAssistente[]): Promise<ResultadoAssistente> {
  const signal = AbortSignal.timeout(TIMEOUT_MS);
  try {
    const csrfToken = await getCsrfToken();
    const response = await api("/chat/assistente/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ mensagens }),
      signal,
    });

    if (response.status === 429) {
      return { ok: false, erro: "Muitas mensagens seguidas. Aguarde um minuto e tente novamente." };
    }
    if (!response.ok) {
      return { ok: false, erro: "O assistente não conseguiu responder agora." };
    }

    const data = await response.json();
    return { ok: true, resposta: data.resposta as string };
  } catch (error) {
    console.error(error);
    return { ok: false, erro: "Sem conexão com o servidor." };
  }
}
