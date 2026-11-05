"use client";

import {
	ArrowLeft,
	ArrowUpRight,
	Check,
	Loader2,
	Mail,
	MessageSquare,
	UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link } from "waku";
import { api } from "@/auth/api";
import { getCsrfToken } from "@/auth/auth";
import Header from "@/components/header";
import CampoDeSinal from "@/components/movimento/campo-de-sinal";
import { BarraDeProgresso, Holofote, Magnetico } from "@/components/movimento/efeitos";
import Palavras from "@/components/movimento/palavras";
import { toast } from "@/components/ui/toast";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "../components/ui/field";
import { Input } from "../components/ui/input";

const CAMPOS = ["nome", "email", "assunto", "mensagem"];

function contarPreenchidos(form: HTMLFormElement) {
	const dados = new FormData(form);
	return CAMPOS.filter((campo) => String(dados.get(campo) ?? "").trim()).length;
}

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [preenchidos, setPreenchidos] = useState(0);
	const [transmissoes, setTransmissoes] = useState(0);
	const [transmitindo, setTransmitindo] = useState(false);

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		setIsSubmitting(true);

		try {
			const csrfToken = await getCsrfToken();
			const response = await api("/contato/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken,
				},
				body: JSON.stringify({
					name: formData.get("nome"),
					email: formData.get("email"),
					subject: formData.get("assunto"),
					message: formData.get("mensagem"),
				}),
			});

			if (response.status === 400) {
				toast.add({
					title: "Não foi possível enviar a mensagem.",
					description: "Confira se todos os campos e o e-mail estão corretos.",
				});
				return;
			}

			if (response.status === 429) {
				toast.add({
					title: "Muitas mensagens enviadas.",
					description: "Aguarde um minuto e tente novamente.",
				});
				return;
			}

			if (!response.ok) {
				toast.add({
					title: "Ocorreu um erro ao tentar enviar a mensagem.",
					description: "Tente novamente mais tarde!",
				});
				return;
			}

			toast.add({
				title: "Mensagem enviada com sucesso.",
				description: "Aguarda até que a nossa equipe entre em contato!",
			});

			form.reset();
			setPreenchidos(0);
			setTransmissoes((total) => total + 1);
			setTransmitindo(true);
			window.setTimeout(() => setTransmitindo(false), 2200);
		} catch (error) {
			console.error(error);
			toast.add({
				title: "Ocorreu um erro ao tentar enviar a mensagem.",
				description: "Tente novamente mais tarde!",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<BarraDeProgresso />
			<Header />

			<div className="relative min-h-screen overflow-hidden bg-background px-6 pb-24 pt-32 lg:px-10 lg:pt-40">
				{/* Quanto mais campos preenchidos, mais limpo fica o sinal ao fundo. */}
				<div className="absolute inset-x-0 top-0 h-[60rem] mask-[linear-gradient(to_bottom,black_70%,transparent)]">
					<CampoDeSinal coerencia={transmitindo ? 1 : preenchidos / CAMPOS.length} intensidade={0.8} />
				</div>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-to-r from-background/85 via-background/45 to-transparent lg:w-2/3" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-190 bg-[radial-gradient(circle_at_75%_20%,rgba(125,81,254,.14),transparent_34%),linear-gradient(rgba(0,0,0,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.035)_1px,transparent_1px)] bg-size-[auto,48px_48px,48px_48px] mask-[linear-gradient(to_bottom,black,transparent)] dark:bg-[radial-gradient(circle_at_75%_20%,rgba(125,81,254,.2),transparent_34%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)]" />

				<div className="relative mx-auto max-w-7xl">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						<ArrowLeft size={16} /> Voltar para a HOME
					</Link>

					<div className="mt-12 grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
						<section className="max-w-xl">
							<p className="entrada flex items-center gap-3 font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
								<span className="h-px w-8 bg-primary" />
								Fale com a NEXUS
							</p>

							<h1 className="mt-6 text-5xl font-black leading-[.94] tracking-[-.07em] text-foreground sm:text-7xl">
								<Palavras texto="Toda boa decisão começa com uma" />
								<span className="text-primary">
									<Palavras texto="conversa." atraso={420} />
								</span>
							</h1>

							<p
								style={{ animationDelay: "560ms" }}
								className="entrada mt-8 max-w-md text-lg leading-relaxed text-muted-foreground"
							>
								Quer entender como IoT pode transformar sua operação? Conte um
								pouco sobre o seu contexto. A gente começa por aí.
							</p>

							<div
								style={{ animationDelay: "700ms" }}
								className="entrada mt-14 space-y-5 border-t border-border pt-6 dark:border-white/10"
							>
								<p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">
									O que acontece depois
								</p>

								<div className="flex items-start gap-3 text-sm text-foreground/75">
									<span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
										<Check size={13} />
									</span>
									<span>Entendemos o desafio antes de falar em solução.</span>
								</div>

								<div className="flex items-start gap-3 text-sm text-foreground/75">
									<span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
										<Check size={13} />
									</span>
									<span>
										Mostramos o potencial do IoT aplicado ao seu contexto.
									</span>
								</div>

								<div className="flex items-start gap-3 text-sm text-foreground/75">
									<span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
										<Check size={13} />
									</span>
									<span>Você decide os próximos passos com mais clareza.</span>
								</div>
							</div>
						</section>

						<section style={{ animationDelay: "250ms" }} className="entrada">
							<Holofote className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-2xl shadow-black/5 sm:p-9 dark:border-white/10 dark:shadow-black/20">
							<div className="mb-8 flex items-start justify-between gap-6">
								<div>
									<p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
										Contato / 01
									</p>
									<h2 className="mt-2 text-2xl font-black text-card-foreground">
										Vamos conversar?
									</h2>
								</div>

								<div className="rounded-2xl bg-primary/10 p-3 text-primary">
									<MessageSquare size={22} />
								</div>
							</div>

							<div aria-hidden="true" className="mb-7 flex items-center gap-4">
								<div className="flex h-6 items-end gap-1">
									{CAMPOS.map((campo, indice) => (
										<span
											key={campo}
											style={{ height: `${(indice + 1) * 25}%` }}
											className={`w-1.5 rounded-sm transition-colors duration-500 ${
												indice < preenchidos || transmitindo ? "bg-primary shadow-[0_0_10px_var(--primary)]" : "bg-muted"
											}`}
										/>
									))}
								</div>
								<span className="font-mono text-[10px] tracking-[.16em] text-muted-foreground uppercase">
									{transmitindo
										? "Sinal transmitido"
										: preenchidos === CAMPOS.length
											? "Sinal pronto para enviar"
											: "Força do sinal"}
								</span>
							</div>

							<form
								className="space-y-6"
								onSubmit={handleSubmit}
								onInput={(event) => setPreenchidos(contarPreenchidos(event.currentTarget))}
								action="/api/contato/"
							>
								<FieldSet>
									<FieldGroup>
										<Field>
											<FieldLabel
												htmlFor="nome"
												className="text-sm font-bold text-card-foreground"
											>
												<UserRound
													aria-hidden="true"
													className="size-4 text-muted-foreground"
												/>
												Nome
											</FieldLabel>

											<Input
												id="nome"
												name="nome"
												type="text"
												autoComplete="name"
												required
												placeholder="Qual é o seu nome?"
												className="min-h-12 rounded-xl border-input bg-background px-4 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/20"
											/>
										</Field>

										<Field>
											<FieldLabel
												htmlFor="email"
												className="text-sm font-bold text-card-foreground"
											>
												<Mail
													aria-hidden="true"
													className="size-4 text-muted-foreground"
												/>
												E-mail
											</FieldLabel>

											<Input
												id="email"
												name="email"
												type="email"
												autoComplete="email"
												required
												placeholder="voce@empresa.com"
												className="min-h-12 rounded-xl border-input bg-background px-4 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/20"
											/>
										</Field>

										<Field>
											<FieldLabel
												htmlFor="assunto"
												className="text-sm font-bold text-card-foreground"
											>
												<UserRound
													aria-hidden="true"
													className="size-4 text-muted-foreground"
												/>
												Assunto
											</FieldLabel>

											<Input
												id="assunto"
												name="assunto"
												type="text"
												autoComplete="off"
												required
												placeholder="Sobre o que deseja falar?"
												className="min-h-12 rounded-xl border-input bg-background px-4 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/20"
											/>
										</Field>

										<Field>
											<FieldLabel
												htmlFor="mensagem"
												className="text-sm font-bold text-card-foreground"
											>
												<MessageSquare
													aria-hidden="true"
													className="size-4 text-muted-foreground"
												/>
												Mensagem
											</FieldLabel>

											<textarea
												id="mensagem"
												name="mensagem"
												required
												rows={6}
												placeholder="O que você gostaria de melhorar na sua operação?"
												className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/60 transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
											/>

											<FieldDescription className="text-muted-foreground">
												Uma mensagem curta já é suficiente para começar.
											</FieldDescription>
										</Field>
									</FieldGroup>
								</FieldSet>

								<div className="relative">
									{transmissoes > 0 &&
										[0, 1, 2].map((onda) => (
											<span
												key={`${transmissoes}-${onda}`}
												aria-hidden="true"
												style={{ animationDelay: `${onda * 220}ms` }}
												className="onda-envio pointer-events-none absolute inset-0 rounded-full border-2 border-primary"
											/>
										))}
									<Magnetico forca={0.08} className="w-full">
										<button
											disabled={isSubmitting}
											type="submit"
											className="group relative inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
										>
											{isSubmitting && (
												<Loader2 className="animate-spin" size={18} />
											)}
											Enviar mensagem{" "}
											<ArrowUpRight
												size={18}
												className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
											/>
										</button>
									</Magnetico>
								</div>

								<p className="text-center text-xs leading-relaxed text-muted-foreground">
									Sem compromisso. Este formulário é apenas uma demonstração.
								</p>
							</form>
							</Holofote>
						</section>
					</div>
				</div>
			</div>
		</>
	);
}
