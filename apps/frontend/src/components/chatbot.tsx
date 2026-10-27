"use client";

import { ArrowUp, Bot, Loader2, X } from "lucide-react";
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
	"O que é IoT?",
	"Como a NEXUS pode ajudar minha empresa?",
	"Quero falar com um especialista",
];

const MENSAGEM_INICIAL: Mensagem = {
	id: 1,
	role: "assistant",
	texto:
		"Olá! Sou o assistente NEXUS. Posso tirar dúvidas sobre IoT, nossas soluções e o funcionamento da plataforma.",
};

export default function Chatbot() {
	const [aberto, setAberto] = useState(false);
	const [mensagens, setMensagens] = useState<Mensagem[]>([MENSAGEM_INICIAL]);
	const [entrada, setEntrada] = useState("");
	const [digitando, setDigitando] = useState(false);
	const proximoId = useRef(2);
	const fimDaConversa = useRef<HTMLDivElement>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
	});

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
		}, 550);
	}

	if (!aberto) return null;

	return (
		<div className="fixed inset-0 z-60 flex items-end justify-end sm:p-6 lg:p-8">
			<Button
				variant="ghost"
				aria-label="Fechar assistente"
				onClick={() => setAberto(false)}
				className="absolute inset-0 h-auto w-auto cursor-default rounded-none bg-black/35 hover:bg-black/35 dark:bg-black/60 dark:hover:bg-black/60"
			/>
			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby="duvidas-title"
				className="relative flex h-dvh w-full flex-col overflow-hidden border-border bg-card text-card-foreground shadow-2xl sm:h-[min(680px,calc(100dvh-3rem))] sm:max-w-md sm:rounded-[2rem] sm:border dark:border-white/10"
			>
				<header className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4 dark:border-white/10">
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
							<Bot aria-hidden="true" className="size-5" />
						</div>
						<div>
							<h2 id="duvidas-title" className="font-bold">
								Assistente NEXUS
							</h2>
							<p className="text-xs text-muted-foreground">Tire suas dúvidas</p>
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
				</header>

				<MessageScrollerProvider autoScroll>
					<MessageScroller className="min-h-0 flex-1">
						<MessageScrollerViewport aria-label="Conversa com o assistente">
							<MessageScrollerContent className="gap-4 px-5 py-5">
								{mensagens.map((mensagem) => (
									<MensagemItem key={mensagem.id} mensagem={mensagem} />
								))}
								{digitando && (
									<MessageScrollerItem messageId="digitando">
										<Message>
											<MessageContent>
												<div
													role="status"
													aria-label="Assistente digitando"
													className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-muted px-4 py-4"
												>
													<Loader2
														aria-hidden="true"
														className="size-4 animate-spin text-primary"
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

				<footer className="shrink-0 border-t border-border px-5 pt-3 pb-4 dark:border-white/10">
					{mensagens.length === 1 && (
						<div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
							{SUGESTOES.map((sugestao) => (
								<Button
									key={sugestao}
									variant="outline"
									size="sm"
									className="shrink-0 rounded-full text-xs"
									onClick={() => enviarMensagem(sugestao)}
								>
									{sugestao}
								</Button>
							))}
						</div>
					)}
					<form
						onSubmit={(event) => {
							event.preventDefault();
							enviarMensagem();
						}}
					>
						<label htmlFor="duvida-message" className="sr-only">
							Digite sua dúvida
						</label>
						<InputGroup className="h-auto min-h-14 rounded-2xl bg-background p-1.5">
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
								placeholder="Digite sua dúvida..."
								rows={1}
								maxLength={1000}
								className="max-h-28 min-h-10 px-3 py-2.5"
							/>
							<InputGroupAddon align="inline-end" className="self-end pb-0.5">
								<InputGroupButton
									type="submit"
									size="icon-sm"
									aria-label="Enviar dúvida"
									disabled={!entrada.trim() || digitando}
									className="size-10 rounded-full"
								>
									<ArrowUp aria-hidden="true" />
								</InputGroupButton>
							</InputGroupAddon>
						</InputGroup>
					</form>
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
								? "rounded-2xl rounded-tr-md bg-primary px-4 py-3 text-primary-foreground"
								: "rounded-2xl rounded-tl-md px-4 py-3"
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
