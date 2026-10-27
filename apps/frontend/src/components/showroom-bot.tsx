"use client";

import { ArrowLeft, ArrowRight, Check, Clock3, SendHorizontal } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "waku";
import { Bubble, BubbleContent } from "./ui/bubble";
import { Button } from "./ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
} from "./ui/input-group";
import { Message, MessageContent, MessageFooter } from "./ui/message";
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "./ui/message-scroller";

type Mensagem = {
	id: number;
	role: "assistant" | "user";
	texto: string;
	hora: string;
};

const mensagemVariants: Variants = {
	initial: { opacity: 0, y: 14, scale: 0.98 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
			transition: { type: "spring", stiffness: 420, damping: 30 },
	},
};

const MotionMessageScrollerItem = motion.create(MessageScrollerItem);

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
	hora: "agora",
};

export default function ShowRoomBot() {
	const [mensagens, setMensagens] = useState<Mensagem[]>([MENSAGEM_INICIAL]);
	const [entrada, setEntrada] = useState("");
	const [digitando, setDigitando] = useState(false);
	const proximoId = useRef(2);
	const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
	const shouldReduceMotion = useReducedMotion();
	const emInicio = mensagens.length === 1;

	useEffect(() => {
		return () => timers.current.forEach((timer) => clearTimeout(timer));
	}, []);

	function enviarMensagem(valor = entrada) {
		const texto = valor.trim();
		if (!texto) return;

		const agora = new Date().toLocaleTimeString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
		const idDoUsuario = proximoId.current++;
		setMensagens((atuais) => [
			...atuais,
			{ id: idDoUsuario, role: "user", texto, hora: agora },
		]);
		setEntrada("");
		setDigitando(true);

		const timer = setTimeout(() => {
			setMensagens((atuais) => [
				...atuais,
				{
					id: proximoId.current++,
					role: "assistant",
					texto:
						"Mensagem recebida. Em breve poderei analisar esse ponto com os dados da sua operação.",
					hora: agora,
				},
			]);
			setDigitando(false);
		}, shouldReduceMotion ? 160 : 720);
		timers.current.push(timer);
	}

	return (
		<main className="relative flex h-screen h-dvh max-h-screen max-h-dvh w-full flex-col overflow-hidden bg-[#101010] text-white selection:bg-[#aaff00] selection:text-[#101010]">
			<Link
				to="/"
				aria-label="Voltar para a página principal"
				className="absolute top-5 left-5 z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-[#171717]/90 px-4 text-xs font-semibold text-white/65 backdrop-blur-sm transition-colors hover:border-[#aaff00]/40 hover:bg-[#202020] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aaff00] sm:top-7 sm:left-7"
			>
				<ArrowLeft aria-hidden="true" className="size-4" />
				<span>Voltar</span>
			</Link>
			<MessageScrollerProvider autoScroll>
				<MessageScroller className="min-h-0 flex-1">
					<MessageScrollerViewport aria-label="Histórico da conversa">
						<MessageScrollerContent className="mx-auto min-h-full w-full max-w-3xl gap-8 px-4 pt-16 pb-8 sm:px-8 sm:pt-24">
							{emInicio && (
								<motion.div
									initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.55, ease: "easeOut" }}
									className="flex min-h-[min(52dvh,470px)] flex-col items-center justify-center text-center"
								>
									<div className="relative flex size-36 items-center justify-center rounded-full bg-[#aaff00] shadow-[0_0_0_12px_rgba(170,255,0,.08),0_0_55px_rgba(170,255,0,.18)] sm:size-40">
										<img
											src="/images/robo nexus.png"
											alt="Robô NEXUS"
											className="size-[118%] object-contain"
										/>
									</div>
									<p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[.34em] text-[#aaff00] sm:text-xs">
										Smart IoT Solutions
									</p>
									{/*<h1 className="mt-7 max-w-xl text-4xl font-black tracking-[-.055em] text-white sm:text-6xl">
										Olá, eu sou a NEXUS.
									</h1>
									<p className="mt-5 max-w-md text-lg leading-relaxed text-white/55 sm:text-xl">
										Como posso tornar sua operação mais inteligente hoje?
									</p>*/}
								</motion.div>
							)}

							{mensagens.map((mensagem) => (
								<MotionMessageScrollerItem
									key={mensagem.id}
									messageId={String(mensagem.id)}
									scrollAnchor={mensagem.role === "user"}
									variants={mensagemVariants}
									initial={shouldReduceMotion ? false : "initial"}
									animate="animate"
								>
									<Message
										align={mensagem.role === "user" ? "end" : "start"}
										className={
											mensagem.role === "user" ? "items-end" : "items-start"
										}
									>
										<MessageContent
											className={
												mensagem.role === "user"
													? "w-fit max-w-[86%] self-end"
													: "w-fit max-w-[90%] self-start"
											}
										>
											{mensagem.role === "user" ? (
													<Bubble align="end" variant="secondary" className="max-w-full self-end">
														<BubbleContent className="max-w-full rounded-2xl rounded-tr-md bg-[#7d51fe] px-4 py-3 font-semibold text-white">
														{mensagem.texto}
													</BubbleContent>
												</Bubble>
											) : (
												<Bubble
													align="start"
													variant="muted"
													className="self-start"
												>
													<BubbleContent className="rounded-2xl rounded-tl-md px-4 py-3 font-semibold text-white/80">
														{mensagem.texto}
													</BubbleContent>
												</Bubble>
											)}
											<MessageFooter className="gap-1 px-1 text-[10px] text-white/35">
												{mensagem.hora}
												{mensagem.role === "user" && (
													<Check
														aria-label="Enviada"
														className="size-3 text-[#aaff00]"
													/>
												)}
											</MessageFooter>
										</MessageContent>
									</Message>
								</MotionMessageScrollerItem>
							))}

							{digitando && (
								<MotionMessageScrollerItem
									messageId="typing"
									variants={mensagemVariants}
									initial={shouldReduceMotion ? false : "initial"}
									animate="animate"
								>
									<Message>
										<MessageContent className="w-fit max-w-[90%] self-start">
											<div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-white/10 px-4 py-4" role="status" aria-label="NEXUS está digitando">
												{[0, 1, 2].map((dot) => (
															<motion.span
																key={dot}
																className="size-1.5 rounded-full bg-[#aaff00]"
																{...(shouldReduceMotion
																	? {}
																	: {
																			animate: { y: [0, -4, 0] },
																		transition: {
																			duration: 0.7,
																			repeat: Infinity,
																			delay: dot * 0.12,
																		},
																	})}
													/>
												))}
											</div>
										</MessageContent>
									</Message>
								</MotionMessageScrollerItem>
							)}
						</MessageScrollerContent>
					</MessageScrollerViewport>
					<MessageScrollerButton className="border-white/10 bg-[#1b1b1b] text-white hover:bg-[#282828]" />
				</MessageScroller>
			</MessageScrollerProvider>

			<footer className="sticky bottom-0 z-10 mx-auto w-full max-w-3xl shrink-0 bg-[#101010] px-4 pb-4 sm:px-8 sm:pb-6">
				{emInicio && (
					<motion.div
						initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.15, duration: 0.4 }}
						className="mb-4"
					>
						<p className="mb-3 pl-0.5 font-mono text-[11px] font-bold uppercase tracking-[.22em] text-white/40">
							Comece por aqui
						</p>
						<div className="grid grid-cols-2 gap-2">
							{SUGESTOES.map((sugestao) => (
								<Button
									key={sugestao}
									variant="outline"
									onClick={() => enviarMensagem(sugestao)}
									className="h-auto min-h-17 justify-between rounded-2xl border-white/10 bg-[#171717] px-4 py-3 text-left text-sm font-medium whitespace-normal text-white/75 hover:border-[#aaff00]/40 hover:bg-[#202020] hover:text-white sm:min-h-16"
								>
									<span className="max-w-[85%]">{sugestao}</span>
									<ArrowRight
										aria-hidden="true"
										className="size-5 shrink-0 text-[#aaff00]"
									/>
								</Button>
							))}
						</div>
					</motion.div>
				)}

				<form
					onSubmit={(event) => {
						event.preventDefault();
						enviarMensagem();
					}}
				>
					<label htmlFor="showroom-message" className="sr-only">
						Digite sua mensagem
					</label>
					<InputGroup className="h-auto min-h-20 rounded-2xl border-white/15 bg-[#171717] p-2 shadow-none ring-0 focus-within:border-[#aaff00]/50">
						<InputGroupTextarea
							id="showroom-message"
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
							className="min-h-14 px-3 py-3 text-base text-white placeholder:text-white/30 focus-visible:ring-0"
						/>
						<InputGroupAddon align="inline-end" className="self-end pb-0.5">
							<InputGroupButton
								type="submit"
								size="icon-sm"
								aria-label="Enviar mensagem"
								disabled={!entrada.trim()}
								className="size-16 rounded-2xl bg-[#527c0f] text-[#101010] hover:bg-[#aaff00] disabled:bg-[#30470b] disabled:text-[#101010]/50"
							>
								<SendHorizontal
									aria-hidden="true"
									className="size-6 -rotate-12"
								/>
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
					<p className="mt-3 flex items-center justify-center gap-1 text-[11px] text-white/25">
						<Clock3 aria-hidden="true" className="size-3" /> Enter envia · Shift
						+ Enter quebra a linha · IA em breve
					</p>
				</form>
			</footer>
		</main>
	);
}
