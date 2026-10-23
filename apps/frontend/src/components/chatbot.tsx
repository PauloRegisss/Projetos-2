"use client";

import { ArrowLeft, ArrowUp, Bot, Loader2, RotateCcw, X } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "waku";
import { api } from "@/auth/api";
import { enviarSimulacao } from "@/chatbot/enviar-simulacao";
import type { Pergunta, Respostas } from "@/chatbot/types";
import { validarResposta } from "@/chatbot/validar";
import { toast } from "@/components/ui/toast";

// Evento disparado pelo botão flutuante (floating-chat-button.tsx) e pelos
// botões "Refazer simulação" do Showroom.
export const EVENTO_ABRIR_CHAT = "nexus-chatbot:open";

type Estado = "carregando" | "erro" | "pronto";

export default function Chatbot() {
	const router = useRouter();
	const [aberto, setAberto] = useState(false);
	const [estado, setEstado] = useState<Estado>("carregando");
	const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
	const [indice, setIndice] = useState(0);
	const [respostas, setRespostas] = useState<Respostas>({});
	const [entrada, setEntrada] = useState("");
	const [erro, setErro] = useState<string | null>(null);
	const [enviando, setEnviando] = useState(false);
	const fimDaConversa = useRef<HTMLDivElement>(null);
	const campo = useRef<HTMLInputElement>(null);

	// Abre com o evento do botão flutuante; fecha com Esc.
	useEffect(() => {
		const abrir = () => setAberto(true);
		const fecharComEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") setAberto(false);
		};
		window.addEventListener(EVENTO_ABRIR_CHAT, abrir);
		window.addEventListener("keydown", fecharComEsc);
		return () => {
			window.removeEventListener(EVENTO_ABRIR_CHAT, abrir);
			window.removeEventListener("keydown", fecharComEsc);
		};
	}, []);

	// Busca as perguntas só na primeira vez que o chat abre.
	useEffect(() => {
		if (aberto && perguntas.length === 0) carregarPerguntas();
	}, [aberto]);

	// Rola até a pergunta atual e foca o campo.
	useEffect(() => {
		fimDaConversa.current?.scrollIntoView({ behavior: "smooth" });
		campo.current?.focus();
	}, [indice, estado, aberto]);

	async function carregarPerguntas() {
		setEstado("carregando");
		try {
			const response = await api("/chat/perguntas/");
			if (!response.ok) throw new Error(`status ${response.status}`);
			const data = await response.json();
			setPerguntas(data.perguntas);
			setEstado("pronto");
		} catch (error) {
			console.error(error);
			setEstado("erro");
		}
	}

	const total = perguntas.length;
	const terminou = total > 0 && indice >= total;
	const atual = terminou ? null : perguntas[indice];
	const progresso = total ? Math.round((Math.min(indice, total) / total) * 100) : 0;

	function irPara(novoIndice: number) {
		const pergunta = perguntas[novoIndice];
		const anterior = pergunta ? respostas[pergunta.key] : undefined;
		setIndice(novoIndice);
		setEntrada(anterior === undefined ? "" : String(anterior));
		setErro(null);
	}

	function responder(valor: string) {
		if (!atual) return;
		const resultado = validarResposta(atual, valor);
		if ("erro" in resultado) {
			setErro(resultado.erro);
			return;
		}
		setRespostas((atuais) => ({ ...atuais, [atual.key]: resultado.valor }));
		irPara(indice + 1);
	}

	function voltar() {
		if (indice > 0) irPara(indice - 1);
	}

	function recomecar() {
		setRespostas({});
		irPara(0);
	}

	async function gerarShowroom() {
		setEnviando(true);
		const resultado = await enviarSimulacao(respostas);
		setEnviando(false);

		if (resultado.ok) {
			setAberto(false);
			setRespostas({});
			setIndice(0);
			setEntrada("");
			router.push(`/showroom/${resultado.id}`);
			return;
		}

		toast.add({ title: resultado.titulo, description: resultado.descricao });

		// 400: volta para a primeira pergunta com erro e mostra a mensagem.
		const campoComErro = perguntas.findIndex((p) => resultado.campos?.[p.key]);
		const pergunta = perguntas[campoComErro];
		if (pergunta) {
			irPara(campoComErro);
			setErro(resultado.campos?.[pergunta.key]?.[0]?.message ?? null);
		}
	}

	if (!aberto) return null;

	return (
		<div className="fixed inset-0 z-[60] flex items-end justify-end sm:p-6 lg:p-8">
			<button
				type="button"
				aria-label="Fechar assistente"
				onClick={() => setAberto(false)}
				className="absolute inset-0 cursor-default bg-black/30 backdrop-blur-[2px]"
			/>

			<section
				role="dialog"
				aria-modal="true"
				aria-label="Assistente NEXUS"
				className="relative flex h-dvh w-full flex-col overflow-hidden border-border bg-card text-card-foreground shadow-2xl shadow-black/20 sm:h-[min(640px,calc(100dvh-3rem))] sm:max-w-md sm:rounded-[2rem] sm:border dark:border-white/10"
			>
				{/* Cabeçalho com progresso */}
				<header className="border-b border-border px-5 pt-5 pb-4 dark:border-white/10">
					<div className="flex items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<Bot size={20} />
							</span>
							<div>
								<p className="font-bold leading-tight">Assistente NEXUS</p>
								<p className="text-xs text-muted-foreground">
									Simulação de impacto do IoT
								</p>
							</div>
						</div>
						<button
							type="button"
							aria-label="Fechar assistente"
							onClick={() => setAberto(false)}
							className="flex size-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
						>
							<X size={18} />
						</button>
					</div>

					{estado === "pronto" && (
						<div className="mt-4">
							<div className="flex justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-[.14em]">
								<span>
									{terminou ? "Concluído" : `Pergunta ${indice + 1} de ${total}`}
								</span>
								<span>{progresso}%</span>
							</div>
							<div
								className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
								role="progressbar"
								aria-valuenow={progresso}
								aria-valuemin={0}
								aria-valuemax={100}
							>
								<div
									className="h-full rounded-full bg-primary transition-all duration-300"
									style={{ width: `${progresso}%` }}
								/>
							</div>
						</div>
					)}
				</header>

				{/* Conversa */}
				<div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
					{estado === "carregando" && (
						<p className="flex items-center gap-2 text-sm text-muted-foreground">
							<Loader2 className="animate-spin" size={16} /> Carregando perguntas...
						</p>
					)}

					{estado === "erro" && (
						<div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
							<p className="font-semibold">Não foi possível carregar as perguntas.</p>
							<button
								type="button"
								onClick={carregarPerguntas}
								className="mt-3 cursor-pointer font-bold text-primary underline-offset-4 hover:underline"
							>
								Tentar de novo
							</button>
						</div>
					)}

					{estado === "pronto" && (
						<>
							<BalaoBot>
								Olá! Vou fazer {total} perguntas rápidas sobre a sua operação para
								estimar o impacto do IoT no seu negócio.
							</BalaoBot>

							{perguntas.slice(0, Math.min(indice, total)).map((p) => (
								<div key={p.key} className="space-y-2">
									<BalaoBot>{p.text}</BalaoBot>
									<BalaoUsuario>{formatarResposta(p, respostas[p.key])}</BalaoUsuario>
								</div>
							))}

							{atual && <BalaoBot>{atual.text}</BalaoBot>}

							{terminou && (
								<BalaoBot>
									Pronto! Já tenho tudo o que preciso. Clique em{" "}
									<strong>Gerar meu Showroom</strong> para ver o comparativo com e sem
									IoT.
								</BalaoBot>
							)}
						</>
					)}
					<div ref={fimDaConversa} />
				</div>

				{/* Área de resposta */}
				{estado === "pronto" && (
					<footer className="border-t border-border px-5 pt-4 pb-5 dark:border-white/10">
						{atual?.type === "choice" && (
							<div className="flex flex-wrap gap-2">
								{atual.choices?.map((opcao) => (
									<button
										key={opcao}
										type="button"
										onClick={() => responder(opcao)}
										className={`min-h-11 cursor-pointer rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-primary ${
											respostas[atual.key] === opcao
												? "border-primary bg-primary text-primary-foreground"
												: "border-border text-foreground hover:border-primary hover:text-primary"
										}`}
									>
										{opcao}
									</button>
								))}
							</div>
						)}

						{atual && atual.type !== "choice" && (
							<form
								noValidate
								className="flex items-center gap-2"
								onSubmit={(event) => {
									event.preventDefault();
									responder(entrada);
								}}
							>
								<input
									ref={campo}
									aria-label={atual.text}
									aria-invalid={erro ? true : undefined}
									value={entrada}
									onChange={(event) => {
										setEntrada(event.target.value);
										setErro(null);
									}}
									type={atual.type === "number" ? "number" : "text"}
									inputMode={atual.type === "number" ? "decimal" : "text"}
									min={atual.min}
									max={atual.max}
									step={atual.integer ? 1 : "any"}
									maxLength={atual.max_length}
									placeholder={atual.placeholder ?? "Digite sua resposta"}
									className="min-h-12 flex-1 rounded-full border border-input bg-background px-5 text-base text-foreground outline-none transition placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 aria-invalid:border-destructive"
								/>
								<button
									type="submit"
									aria-label="Enviar resposta"
									className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
								>
									<ArrowUp size={20} />
								</button>
							</form>
						)}

						{erro && (
							<p role="alert" className="mt-2 px-2 text-sm text-destructive">
								{erro}
							</p>
						)}

						{terminou && (
							<button
								type="button"
								disabled={enviando}
								onClick={gerarShowroom}
								className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
							>
								{enviando && <Loader2 className="animate-spin" size={18} />}
								{enviando ? "Gerando sua análise..." : "Gerar meu Showroom"}
							</button>
						)}

						<div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
							<button
								type="button"
								onClick={voltar}
								disabled={indice === 0 || enviando}
								className="inline-flex cursor-pointer items-center gap-1 transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ArrowLeft size={14} /> Voltar
							</button>
							<button
								type="button"
								onClick={recomecar}
								disabled={indice === 0 || enviando}
								className="inline-flex cursor-pointer items-center gap-1 transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
							>
								<RotateCcw size={14} /> Recomeçar
							</button>
						</div>
					</footer>
				)}
			</section>
		</div>
	);
}

function formatarResposta(pergunta: Pergunta, valor: Respostas[string] | undefined) {
	if (valor === undefined) return "";
	if (pergunta.type === "number" && typeof valor === "number") {
		return valor.toLocaleString("pt-BR");
	}
	return String(valor);
}

function BalaoBot({ children }: { children: ReactNode }) {
	return (
		<p className="max-w-[85%] rounded-2xl rounded-tl-md bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
			{children}
		</p>
	);
}

function BalaoUsuario({ children }: { children: ReactNode }) {
	return (
		<p className="ml-auto max-w-[85%] w-fit rounded-2xl rounded-tr-md bg-primary px-4 py-3 text-sm font-semibold leading-relaxed text-primary-foreground">
			{children}
		</p>
	);
}
