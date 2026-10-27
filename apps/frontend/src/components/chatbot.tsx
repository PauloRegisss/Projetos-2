"use client";

import { ArrowUp, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
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

export const EVENTO_ABRIR_CHAT = "nexus-chatbot:open";

type Mensagem = { id: number; role: "assistant" | "user"; texto: string };

const SUGESTOES = [
	"Quero conhecer soluções IoT",
	"Quero reduzir custos",
	"Quero automatizar processos",
	"Ver exemplos do meu setor",
];

const MENSAGEM_INICIAL: Mensagem = {
	id: 1,
	role: "assistant",
	texto:
		"Olá, eu sou a NEXUS. Como posso tornar sua operação mais inteligente hoje?",
};

export default function Chatbot() {
	const [aberto, setAberto] = useState(false);
	const [mensagens, setMensagens] = useState<Mensagem[]>([MENSAGEM_INICIAL]);
	const [entrada, setEntrada] = useState("");
	const [digitando, setDigitando] = useState(false);
	const proximoId = useRef(2);
	const fimDaConversa = useRef<HTMLDivElement>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const emInicio = mensagens.length === 1;

	useEffect(() => {
		const abrir = () => setAberto(true);
		const fechar = (event: KeyboardEvent) => {
			if (event.key === "Escape") setAberto(false);
		};
		window.addEventListener(EVENTO_ABRIR_CHAT, abrir);
		window.addEventListener("keydown", fechar);
		return () => {
			window.removeEventListener(EVENTO_ABRIR_CHAT, abrir);
			window.removeEventListener("keydown", fechar);
			if (timer.current) clearTimeout(timer.current);
		};
	}, []);

	useEffect(() => {
		fimDaConversa.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});
	}, []);

	function enviarMensagem(valor = entrada) {
		const texto = valor.trim();
		if (!texto || digitando) return;

		setMensagens((atuais) => [
			...atuais,
			{ id: proximoId.current++, role: "user", texto },
		]);
		setEntrada("");
		setDigitando(true);
		timer.current = setTimeout(() => {
			setMensagens((atuais) => [
				...atuais,
				{
					id: proximoId.current++,
					role: "assistant",
					texto: responderDuvida(texto),
				},
			]);
			setDigitando(false);
		}, 600);
	}

	if (!aberto) return null;

	return (
		<div className="fixed inset-0 z-[60] flex items-end justify-end bg-black/60 sm:p-5 lg:p-8">
			<Button
				variant="ghost"
				aria-label="Fechar assistente"
				onClick={() => setAberto(false)}
				className="absolute inset-0 h-auto w-auto cursor-default rounded-none bg-black/40 hover:bg-black/40"
			/>
			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby="duvidas-title"
				className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#101010] text-white shadow-2xl sm:h-[min(720px,calc(100dvh-2.5rem))] sm:max-w-[400px] sm:rounded-[2rem] sm:border sm:border-white/10"
			>
				<header className="relative z-10 flex h-[82px] shrink-0 items-center gap-3 border-b border-white/10 bg-[#171717] px-5">
					<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#aaff00] shadow-[0_0_0_6px_rgba(170,255,0,.08),0_0_24px_rgba(170,255,0,.14)]">
						<img
							src="/images/chat.png"
							alt="Robô NEXUS"
							className="size-[116%] object-contain"
						/>
					</div>
					<div className="min-w-0">
						<h2
							id="duvidas-title"
							className="font-mono text-lg font-bold tracking-[.18em] text-white"
						>
							NEXUS
						</h2>
						<p className="mt-0.5 truncate text-sm text-white/50">
							Sua operação, mais inteligente.
						</p>
					</div>
					<Button
						variant="ghost"
						size="icon"
						aria-label="Fechar assistente"
						onClick={() => setAberto(false)}
						className="ml-auto shrink-0 text-white/55 hover:bg-white/10 hover:text-white"
					>
						<X aria-hidden="true" />
					</Button>
				</header>

				<MessageScrollerProvider autoScroll>
					<MessageScroller className="min-h-0 flex-1">
						<MessageScrollerViewport aria-label="Conversa com o assistente">
							<MessageScrollerContent className="min-h-full gap-4 px-4 py-4">
								{emInicio && (
									<div className="flex min-h-[min(38dvh,300px)] flex-col items-center justify-center px-2 text-center">
										<div className="flex size-24 items-center justify-center rounded-full bg-[#aaff00] shadow-[0_0_0_8px_rgba(170,255,0,.08),0_0_35px_rgba(170,255,0,.16)]">
											<img
												src="/images/chat.png"
												alt=""
												className="size-[116%] object-contain"
											/>
										</div>
														<p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[.28em] text-[#aaff00]">
											Smart IoT Solutions
										</p>
														<h1 className="mt-4 text-3xl font-black tracking-[-.06em] text-white">
											Olá, eu sou a NEXUS.
										</h1>
														<p className="mt-3 max-w-[280px] text-base leading-relaxed text-white/55">
											Como posso tornar sua operação mais inteligente hoje?
										</p>
									</div>
								)}

								{!emInicio &&
									mensagens
										.filter((mensagem) => mensagem.id !== 1)
										.map((mensagem) => (
											<MensagemItem key={mensagem.id} mensagem={mensagem} />
										))}
								{digitando && (
									<MessageScrollerItem messageId="digitando">
										<Message>
											<MessageContent>
												<div
													role="status"
													aria-label="NEXUS está digitando"
													className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-white/10 px-4 py-4"
												>
													<Loader2
														aria-hidden="true"
														className="size-4 animate-spin text-[#aaff00]"
													/>
												</div>
											</MessageContent>
										</Message>
									</MessageScrollerItem>
								)}
								<div ref={fimDaConversa} aria-hidden="true" />
							</MessageScrollerContent>
						</MessageScrollerViewport>
					</MessageScroller>
				</MessageScrollerProvider>

				<footer className="shrink-0 bg-[#101010] px-4 pt-1 pb-3">
					{emInicio && (
						<div className="mb-3">
							<p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[.2em] text-white/40">
								Comece por aqui
							</p>
							<div className="grid grid-cols-2 gap-1.5">
								{SUGESTOES.map((sugestao) => (
									<Button
										key={sugestao}
										variant="outline"
										onClick={() => enviarMensagem(sugestao)}
										className="min-h-12 justify-between rounded-xl border-white/10 bg-[#171717] px-3 py-2 text-left text-xs font-medium whitespace-normal text-white/75 hover:border-[#aaff00]/40 hover:bg-[#202020] hover:text-white"
									>
										<span className="max-w-[82%]">{sugestao}</span>
										<span
											aria-hidden="true"
											className="text-xl font-light text-[#aaff00]"
										>
											›
										</span>
									</Button>
								))}
							</div>
						</div>
					)}
					<form
						onSubmit={(event) => {
							event.preventDefault();
							enviarMensagem();
						}}
					>
						<label htmlFor="duvida-message" className="sr-only">
							Digite sua mensagem
						</label>
						<InputGroup className="h-auto min-h-14 rounded-2xl border-white/15 bg-[#171717] p-1.5 focus-within:border-[#aaff00]/50">
							<InputGroupTextarea
								id="duvida-message"
								value={entrada}
								onChange={(event) => setEntrada(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === "Enter" && !event.shiftKey) {
										event.preventDefault();
										enviarMensagem();
									}
								}}
								placeholder="Digite sua mensagem..."
								rows={1}
								maxLength={1000}
								className="max-h-24 min-h-10 px-3 py-2.5 text-sm text-white placeholder:text-white/30"
							/>
							<InputGroupAddon align="inline-end" className="self-end pb-0.5">
								<InputGroupButton
									type="submit"
									size="icon-sm"
									aria-label="Enviar mensagem"
									disabled={!entrada.trim() || digitando}
									className="size-11 rounded-xl bg-[#527c0f] text-[#101010] hover:bg-[#aaff00] disabled:bg-[#30470b]"
								>
									<ArrowUp aria-hidden="true" className="size-5 -rotate-12" />
								</InputGroupButton>
							</InputGroupAddon>
						</InputGroup>
					</form>
					<p className="mt-2 text-center text-[10px] tracking-wide text-white/25">
						Tecnologia NEXUS · Respostas geradas por IA
					</p>
				</footer>
			</section>
		</div>
	);
}

function MensagemItem({ mensagem }: { mensagem: Mensagem }) {
	return (
		<Message
			align={mensagem.role === "user" ? "end" : "start"}
			className={mensagem.role === "user" ? "items-end" : "items-start"}
		>
			<MessageContent
				className={
					mensagem.role === "user"
						? "w-fit max-w-[86%] self-end"
						: "w-fit max-w-[90%] self-start"
				}
			>
				<Bubble
					align={mensagem.role === "user" ? "end" : "start"}
					variant={mensagem.role === "user" ? "secondary" : "muted"}
					className="max-w-full"
				>
					<BubbleContent
						className={
							mensagem.role === "user"
								? "rounded-2xl rounded-tr-md bg-[#7d51fe] px-4 py-3 text-white"
								: "rounded-2xl rounded-tl-md bg-white/10 px-4 py-3 text-white/80"
						}
					>
						{mensagem.texto}
					</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
	);
}

function responderDuvida(pergunta: string) {
	const texto = pergunta.toLocaleLowerCase("pt-BR");
	if (texto.includes("iot") || texto.includes("internet das coisas"))
		return "IoT conecta máquinas, sensores e dados para ajudar sua empresa a reduzir desperdícios, antecipar falhas e tomar decisões melhores.";
	if (
		texto.includes("custo") ||
		texto.includes("preço") ||
		texto.includes("valor")
	)
		return "A NEXUS começa entendendo sua operação. Use o Showroom para receber uma estimativa de economia com e sem IoT.";
	if (
		texto.includes("especialista") ||
		texto.includes("contato") ||
		texto.includes("falar")
	)
		return "Você pode falar com a equipe NEXUS pela página de contato. Assim, um especialista poderá entender seu cenário com mais detalhes.";
	return "Posso ajudar com dúvidas sobre IoT, eficiência operacional, custos e o funcionamento do Showroom. Tente perguntar de outro jeito ou escolha uma sugestão acima.";
}
