"use client";

import { ArrowLeft, ArrowUp, Bot, Loader2, RotateCcw, X } from "lucide-react";
import {
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useRouter } from "waku";
import { api } from "@/auth/api";
import { enviarSimulacao } from "@/chatbot/enviar-simulacao";
import type { Pergunta, Respostas } from "@/chatbot/types";
import { validarResposta } from "@/chatbot/validar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

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
	const carregandoRef = useRef(false);
	const fimDaConversa = useRef<HTMLDivElement>(null);
	const campo = useRef<HTMLInputElement>(null);

	const carregarPerguntas = useCallback(async () => {
		if (carregandoRef.current) return;
		carregandoRef.current = true;
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
		} finally {
			carregandoRef.current = false;
		}
	}, []);

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

	useEffect(() => {
		if (aberto && perguntas.length === 0) void carregarPerguntas();
	}, [aberto, carregarPerguntas, perguntas.length]);

	const total = perguntas.length;
	const terminou = total > 0 && indice >= total;
	const atual = terminou ? null : perguntas[indice];
	const progresso = total
		? Math.round((Math.min(indice, total) / total) * 100)
		: 0;
	const historico = useMemo(
		() => perguntas.slice(0, Math.min(indice, total)),
		[perguntas, indice, total],
	);

	useEffect(() => {
		fimDaConversa.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});
		if (aberto && estado === "pronto") campo.current?.focus();
	}, [aberto, estado]);

	const irPara = useCallback(
		(novoIndice: number) => {
			const pergunta = perguntas[novoIndice];
			const anterior = pergunta ? respostas[pergunta.key] : undefined;
			setIndice(novoIndice);
			setEntrada(anterior === undefined ? "" : String(anterior));
			setErro(null);
		},
		[perguntas, respostas],
	);

	const responder = useCallback(
		(valor: string) => {
			if (!atual) return;
			const resultado = validarResposta(atual, valor);
			if ("erro" in resultado) {
				setErro(resultado.erro);
				return;
			}
			setRespostas((atuais) => ({ ...atuais, [atual.key]: resultado.valor }));
			irPara(indice + 1);
		},
		[atual, indice, irPara],
	);

	const voltar = useCallback(() => {
		if (indice > 0) irPara(indice - 1);
	}, [indice, irPara]);

	const recomecar = useCallback(() => {
		setRespostas({});
		setIndice(0);
		setEntrada("");
		setErro(null);
	}, []);

	async function gerarShowroom() {
		setEnviando(true);
		const resultado = await enviarSimulacao(respostas);
		setEnviando(false);

		if (resultado.ok) {
			setAberto(false);
			recomecar();
			router.push(`/showroom/${resultado.id}`);
			return;
		}

		toast.add({ title: resultado.titulo, description: resultado.descricao });
		const campoComErro = perguntas.findIndex((p) => resultado.campos?.[p.key]);
		const pergunta = perguntas[campoComErro];
		if (pergunta) {
			irPara(campoComErro);
			setErro(resultado.campos?.[pergunta.key]?.[0]?.message ?? null);
		}
	}

	if (!aberto) return null;

	return (
		<div className="fixed inset-0 z-60 flex items-end justify-end sm:p-6 lg:p-8">
			<Button
				variant="ghost"
				className="absolute inset-0 h-auto w-auto cursor-default rounded-none bg-black/30 hover:bg-black/30 dark:bg-black/50 dark:hover:bg-black/50"
				aria-label="Fechar assistente"
				onClick={() => setAberto(false)}
			/>

			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby="chatbot-title"
				aria-describedby="chatbot-description"
				className="relative flex h-dvh w-full flex-col overflow-hidden border-border bg-card text-card-foreground shadow-2xl shadow-black/20 sm:h-[min(640px,calc(100dvh-3rem))] sm:max-w-md sm:rounded-[2rem] sm:border dark:border-white/10"
			>
				<header className="shrink-0 px-5 pt-5 pb-4">
					<div className="flex items-center justify-between gap-3">
						<div className="flex min-w-0 items-center gap-3">
							<Avatar size="lg" className="bg-primary text-primary-foreground">
								<AvatarFallback className="bg-primary text-primary-foreground">
									<Bot aria-hidden="true" className="size-5" />
								</AvatarFallback>
							</Avatar>
							<div className="min-w-0">
								<h2
									id="chatbot-title"
									className="truncate font-bold leading-tight"
								>
									Assistente NEXUS
								</h2>
								<p
									id="chatbot-description"
									className="truncate text-xs text-muted-foreground"
								>
									Simulação de impacto do IoT
								</p>
							</div>
						</div>
						<Button
							variant="ghost"
							size="icon"
							aria-label="Fechar assistente"
							onClick={() => setAberto(false)}
						>
							<X aria-hidden="true" />
						</Button>
					</div>

					{estado === "pronto" && (
						<div className="mt-4 space-y-2">
							<div className="flex justify-between font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">
								<span>
									{terminou
										? "Concluído"
										: `Pergunta ${indice + 1} de ${total}`}
								</span>
								<span>{progresso}%</span>
							</div>
							<Progress
								value={progresso}
								aria-label={`Progresso: ${progresso}%`}
							/>
						</div>
					)}
				</header>
				<Separator />

				<main
					className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
					aria-live="polite"
				>
					{estado === "carregando" && <EstadoCarregando />}
					{estado === "erro" && <EstadoErro onRetry={carregarPerguntas} />}

					{estado === "pronto" && (
						<>
							<BalaoBot>
								Olá! Vou fazer {total} perguntas rápidas sobre a sua operação
								para estimar o impacto do IoT no seu negócio.
							</BalaoBot>
							{historico.map((pergunta) => (
								<div key={pergunta.key} className="space-y-2">
									<BalaoBot>{pergunta.text}</BalaoBot>
									<BalaoUsuario>
										{formatarResposta(pergunta, respostas[pergunta.key])}
									</BalaoUsuario>
								</div>
							))}
							{atual && <BalaoBot>{atual.text}</BalaoBot>}
							{terminou && (
								<BalaoBot>
									Pronto! Já tenho tudo o que preciso. Clique em{" "}
									<strong>Gerar meu Showroom</strong> para ver o comparativo com
									e sem IoT.
								</BalaoBot>
							)}
						</>
					)}
					<div ref={fimDaConversa} aria-hidden="true" />
				</main>

				{estado === "pronto" && (
					<footer className="shrink-0 border-t border-border px-5 pt-4 pb-5 dark:border-white/10">
						{atual?.type === "choice" && (
							<fieldset className="flex flex-wrap gap-2">
								<legend className="sr-only">{atual.text}</legend>
								{atual.choices?.map((opcao) => (
									<Button
										key={opcao}
										variant={
											respostas[atual.key] === opcao ? "default" : "outline"
										}
										size="lg"
										className="rounded-full"
										onClick={() => responder(opcao)}
									>
										{opcao}
									</Button>
								))}
							</fieldset>
						)}

						{atual && atual.type !== "choice" && (
							<form
								className="flex items-end gap-2"
								noValidate
								onSubmit={(event) => {
									event.preventDefault();
									responder(entrada);
								}}
							>
								<div className="min-w-0 flex-1">
									<Label htmlFor="chatbot-answer" className="sr-only">
										{atual.text}
									</Label>
									<Input
										ref={campo}
										id="chatbot-answer"
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
										className="h-12 rounded-full px-5 text-base"
									/>
								</div>
								<Button
									type="submit"
									size="icon-lg"
									className="rounded-full"
									aria-label="Enviar resposta"
								>
									<ArrowUp aria-hidden="true" />
								</Button>
							</form>
						)}

						{erro && (
							<p role="alert" className="mt-2 px-2 text-sm text-destructive">
								{erro}
							</p>
						)}

						{terminou && (
							<Button
								className="mt-1 h-12 w-full rounded-full font-extrabold"
								disabled={enviando}
								onClick={gerarShowroom}
							>
								{enviando && (
									<Loader2 aria-hidden="true" className="animate-spin" />
								)}
								{enviando ? "Gerando sua análise..." : "Gerar meu Showroom"}
							</Button>
						)}

						<div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
							<Button
								variant="ghost"
								size="sm"
								className="px-1"
								onClick={voltar}
								disabled={indice === 0 || enviando}
							>
								<ArrowLeft aria-hidden="true" /> Voltar
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="px-1"
								onClick={recomecar}
								disabled={indice === 0 || enviando}
							>
								<RotateCcw aria-hidden="true" /> Recomeçar
							</Button>
						</div>
					</footer>
				)}
			</section>
		</div>
	);
}

function EstadoCarregando() {
	return (
		<p className="flex items-center gap-2 text-sm text-muted-foreground">
			<Loader2 aria-hidden="true" className="animate-spin" size={16} />{" "}
			Carregando perguntas...
		</p>
	);
}

function EstadoErro({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
			<p className="font-semibold">Não foi possível carregar as perguntas.</p>
			<Button
				variant="link"
				className="mt-2 h-auto p-0 font-bold"
				onClick={onRetry}
			>
				Tentar de novo
			</Button>
		</div>
	);
}

function formatarResposta(
	pergunta: Pergunta,
	valor: Respostas[string] | undefined,
) {
	if (valor === undefined) return "";
	if (pergunta.type === "number" && typeof valor === "number")
		return valor.toLocaleString("pt-BR");
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
		<p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 text-sm font-semibold leading-relaxed text-primary-foreground">
			{children}
		</p>
	);
}
