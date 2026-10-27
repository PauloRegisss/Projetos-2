"use client";

import {
	ArrowLeft,
	ArrowUp,
	Bot,
	Loader2,
	RotateCcw,
	Sparkles,
} from "lucide-react";
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
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { Message, MessageContent } from "@/components/ui/message";
import {
	MessageScroller,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

type Estado = "carregando" | "erro" | "pronto";

export default function ShowRoomBot() {
	const router = useRouter();
	const [estado, setEstado] = useState<Estado>("carregando");
	const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
	const [indice, setIndice] = useState(0);
	const [respostas, setRespostas] = useState<Respostas>({});
	const [entrada, setEntrada] = useState("");
	const [erro, setErro] = useState<string | null>(null);
	const [enviando, setEnviando] = useState(false);
	const [aberta, setAberta] = useState(false);
	const fimDaConversa = useRef<HTMLDivElement>(null);
	const carregando = useRef(false);

	const carregarPerguntas = useCallback(async () => {
		if (carregando.current) return;
		carregando.current = true;
		setEstado("carregando");

		try {
			const response = await api("/chat/perguntas/");
			if (!response.ok) throw new Error(`status ${response.status}`);
			const data = (await response.json()) as { perguntas: Pergunta[] };
			setPerguntas(data.perguntas);
			setEstado("pronto");
		} catch (error) {
			console.error(error);
			setEstado("erro");
		} finally {
			carregando.current = false;
		}
	}, []);

	useEffect(() => {
		void carregarPerguntas();
	}, [carregarPerguntas]);

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
	}, []);
	const irPara = useCallback(
		(novoIndice: number) => {
			const pergunta = perguntas[novoIndice];
			const respostaAnterior = pergunta ? respostas[pergunta.key] : undefined;
			setIndice(novoIndice);
			setEntrada(
				respostaAnterior === undefined ? "" : String(respostaAnterior),
			);
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
			setIndice((atualIndice) => atualIndice + 1);
			setEntrada("");
			setErro(null);
		},
		[atual],
	);

	function recomecar() {
		setRespostas({});
		setIndice(0);
		setEntrada("");
		setErro(null);
		setAberta(false);
	}

	async function gerarShowroom() {
		setEnviando(true);
		const resultado = await enviarSimulacao(respostas);
		setEnviando(false);

		if (resultado.ok) {
			router.push(`/showroom/${resultado.id}`);
			return;
		}

		toast.add({ title: resultado.titulo, description: resultado.descricao });
		const campoComErro = perguntas.findIndex(
			(pergunta) => resultado.campos?.[pergunta.key],
		);
		const perguntaComErro = perguntas[campoComErro];
		if (perguntaComErro) {
			setIndice(campoComErro);
			setEntrada(String(respostas[perguntaComErro.key] ?? ""));
			setErro(resultado.campos?.[perguntaComErro.key]?.[0]?.message ?? null);
		}
	}

	return (
		<main className="flex h-screen h-dvh max-h-screen max-h-dvh w-full flex-col overflow-hidden bg-[#101010] text-white">
			<header className="shrink-0 border-b border-white/10 bg-[#101010]/95 px-4 py-4 backdrop-blur sm:px-8">
				<div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4">
					<a
						href="/"
						className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-semibold text-white/65 transition hover:border-[#aaff00]/40 hover:text-white focus-visible:outline-2 focus-visible:outline-[#aaff00]"
					>
						<ArrowLeft aria-hidden="true" className="size-4" /> Voltar
					</a>
					<div className="flex items-center gap-3">
						<div className="flex size-9 items-center justify-center rounded-full bg-[#aaff00] text-[#101010]">
							<Sparkles aria-hidden="true" className="size-4" />
						</div>
						<div className="hidden text-right sm:block">
							<p className="text-sm font-bold">NEXUS Showroom</p>
							<p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/40">
								Simulação de impacto
							</p>
						</div>
					</div>
				</div>
				{estado === "pronto" && (
					<div className="mx-auto mt-4 w-full max-w-4xl space-y-2">
						<div className="flex justify-between font-mono text-[10px] uppercase tracking-[.14em] text-white/45">
							<span>
								{terminou
									? "Pronto para gerar"
									: `Pergunta ${indice + 1} de ${total}`}
							</span>
							<span>{progresso}%</span>
						</div>
						<Progress
							value={progresso}
							aria-label={`Progresso: ${progresso}%`}
							className="bg-white/10"
						/>
					</div>
				)}
			</header>
			<Separator className="bg-transparent" />

			<MessageScrollerProvider autoScroll>
				<MessageScroller className="min-h-0 flex-1">
					<MessageScrollerViewport aria-label="Histórico da simulação">
						<MessageScrollerContent className="mx-auto w-full max-w-3xl gap-5 px-4 py-8 sm:px-8 sm:py-10">
							{estado === "carregando" && (
								<StatusMessage texto="Preparando sua simulação..." carregando />
							)}
							{estado === "erro" && <ErroMessage onRetry={carregarPerguntas} />}
							{estado === "pronto" && (
								<>
									<BalaoBot>
										Vou fazer {total} perguntas rápidas sobre sua operação para
										estimar o impacto do IoT.
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
											Pronto! Revise suas respostas e gere seu comparativo com e
											sem IoT.
										</BalaoBot>
									)}
								</>
							)}
							<div ref={fimDaConversa} aria-hidden="true" />
						</MessageScrollerContent>
					</MessageScrollerViewport>
				</MessageScroller>
			</MessageScrollerProvider>

			<footer className="shrink-0 border-t border-white/10 bg-[#101010] px-4 pt-4 pb-5 sm:px-8">
				<div className="mx-auto w-full max-w-3xl">
					{estado === "pronto" && atual?.type === "choice" && (
						<fieldset className="flex flex-wrap gap-2">
							<legend className="sr-only">{atual.text}</legend>
							{atual.choices?.map((opcao) => (
								<Button
									key={opcao}
									variant="outline"
									size="lg"
									className="rounded-full border-white/15 bg-white/5 text-white hover:border-[#aaff00]/50 hover:bg-[#aaff00] hover:text-[#101010]"
									onClick={() => responder(opcao)}
								>
									{opcao}
								</Button>
							))}
						</fieldset>
					)}

					{estado === "pronto" && atual && atual.type !== "choice" && (
						<form
							onSubmit={(event) => {
								event.preventDefault();
								responder(entrada);
							}}
						>
							<label htmlFor="showroom-answer" className="sr-only">
								{atual.text}
							</label>
							<InputGroup className="h-auto min-h-14 rounded-[1.5rem] border-white/15 bg-[#171717] p-1.5 focus-within:border-[#aaff00]/50">
								<InputGroupTextarea
									id="showroom-answer"
									value={entrada}
									onChange={(event) => {
										setEntrada(event.target.value);
										setErro(null);
									}}
									onKeyDown={(event) => {
										if (event.key === "Enter" && !event.shiftKey) {
											event.preventDefault();
											responder(entrada);
										}
									}}
									placeholder={atual.placeholder ?? "Digite sua resposta..."}
									rows={1}
									maxLength={atual.max_length}
									inputMode={atual.type === "number" ? "decimal" : "text"}
									className="max-h-28 min-h-10 px-3 py-2.5 text-base text-white placeholder:text-white/30"
								/>
								<InputGroupAddon align="inline-end" className="self-end pb-0.5">
									<InputGroupButton
										type="submit"
										size="icon-sm"
										aria-label="Enviar resposta"
										className="size-10 rounded-full bg-[#aaff00] text-[#101010] hover:bg-white"
									>
										<ArrowUp aria-hidden="true" />
									</InputGroupButton>
								</InputGroupAddon>
							</InputGroup>
						</form>
					)}

					{erro && (
						<p role="alert" className="mt-2 px-2 text-sm text-red-300">
							{erro}
						</p>
					)}
					{terminou && (
						<Button
							disabled={enviando}
							onClick={gerarShowroom}
							className="h-12 w-full rounded-full bg-[#aaff00] font-extrabold text-[#101010] hover:bg-white"
						>
							{enviando && (
								<Loader2 aria-hidden="true" className="animate-spin" />
							)}
							{enviando ? "Gerando seu Showroom..." : "Gerar meu Showroom"}
						</Button>
					)}
					<div className="mt-3 flex items-center justify-between text-xs text-white/45">
						<Button
							variant="ghost"
							size="sm"
							disabled={indice === 0 || enviando}
							onClick={() => irPara(indice - 1)}
							className="px-1 text-white/55 hover:text-white"
						>
							<ArrowLeft aria-hidden="true" /> Voltar
						</Button>
						<Button
							variant="ghost"
							size="sm"
							disabled={indice === 0 || enviando}
							onClick={() => setAberta(true)}
							className="px-1 text-white/55 hover:text-white"
						>
							<RotateCcw aria-hidden="true" /> Recomeçar
						</Button>
					</div>
					{aberta && (
						<ConfirmarReinicio
							onCancel={() => setAberta(false)}
							onConfirm={recomecar}
						/>
					)}
				</div>
			</footer>
		</main>
	);
}

function ConfirmarReinicio({
	onCancel,
	onConfirm,
}: {
	onCancel: () => void;
	onConfirm: () => void;
}) {
	return (
		<div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-5">
			<div
				role="dialog"
				aria-modal="true"
				className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1b1b1b] p-5 shadow-2xl"
			>
				<h2 className="font-bold">Recomeçar simulação?</h2>
				<p className="mt-2 text-sm text-white/60">
					Suas respostas atuais serão apagadas.
				</p>
				<div className="mt-5 flex justify-end gap-2">
					<Button variant="ghost" onClick={onCancel}>
						Cancelar
					</Button>
					<Button
						onClick={onConfirm}
						className="bg-[#aaff00] text-[#101010] hover:bg-white"
					>
						Recomeçar
					</Button>
				</div>
			</div>
		</div>
	);
}

function StatusMessage({
	texto,
	carregando = false,
}: {
	texto: string;
	carregando?: boolean;
}) {
	return (
		<p className="flex items-center gap-2 text-sm text-white/60">
			{carregando && (
				<Loader2
					aria-hidden="true"
					className="size-4 animate-spin text-[#aaff00]"
				/>
			)}
			{texto}
		</p>
	);
}

function ErroMessage({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm">
			<p>Não foi possível carregar as perguntas.</p>
			<Button
				variant="link"
				onClick={onRetry}
				className="mt-2 h-auto p-0 text-[#aaff00]"
			>
				Tentar novamente
			</Button>
		</div>
	);
}

function formatarResposta(
	pergunta: Pergunta,
	valor: Respostas[string] | undefined,
) {
	if (valor === undefined) return "";
	return pergunta.type === "number" && typeof valor === "number"
		? valor.toLocaleString("pt-BR")
		: String(valor);
}

function BalaoBot({ children }: { children: ReactNode }) {
	return (
		<Message>
			<MessageContent className="w-fit max-w-[90%] self-start">
				<Bubble
					align="start"
					variant="default"
					className="self-start max-w-full"
				>
					<BubbleContent className="rounded-2xl rounded-tl-md bg-[#aaff00] px-4 py-3 font-semibold text-[#101010]">
						{children}
					</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
	);
}

function BalaoUsuario({ children }: { children: ReactNode }) {
	return (
		<Message align="end" className="items-end">
			<MessageContent className="w-fit max-w-[86%] self-end">
				<Bubble align="end" variant="secondary" className="self-end max-w-full">
					<BubbleContent className="rounded-2xl rounded-tr-md bg-[#7d51fe] px-4 py-3 font-semibold text-white">
						{children}
					</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
	);
}
