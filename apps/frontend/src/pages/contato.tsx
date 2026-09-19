import {
	ArrowLeft,
	ArrowUpRight,
	Check,
	Mail,
	MessageSquare,
	UserRound,
} from "lucide-react";
import { Link } from "waku";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "../components/ui/field";
import { Input } from "../components/ui/input";

export default function ContactPage() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-background px-6 pb-24 pt-32 lg:px-10 lg:pt-40">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_75%_20%,rgba(125,81,254,.2),transparent_34%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

			<div className="relative mx-auto max-w-7xl">
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
				>
					<ArrowLeft size={16} /> Voltar para a HOME
				</Link>
				<div className="mt-12 grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
					<section className="max-w-xl">
						<p className="flex items-center gap-3 font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
							<span className="h-px w-8 bg-primary" /> Fale com a NEXUS
						</p>
						<h1 className="mt-6 text-5xl font-black leading-[.94] tracking-[-.07em] text-white sm:text-7xl">
							Toda boa decisão começa com uma{" "}
							<span className="text-primary">conversa.</span>
						</h1>
						<p className="mt-8 max-w-md text-lg leading-relaxed text-white/55">
							Quer entender como IoT pode transformar sua operação? Conte um
							pouco sobre o seu contexto. A gente começa por aí.
						</p>

						<div className="mt-14 space-y-5 border-t border-white/10 pt-6">
							<p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/40">
								O que acontece depois
							</p>
							<div className="flex items-start gap-3 text-sm text-white/60">
								<span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<Check size={13} />
								</span>
								<span>Entendemos o desafio antes de falar em solução.</span>
							</div>
							<div className="flex items-start gap-3 text-sm text-white/60">
								<span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<Check size={13} />
								</span>
								<span>
									Mostramos o potencial do IoT aplicado ao seu contexto.
								</span>
							</div>
							<div className="flex items-start gap-3 text-sm text-white/60">
								<span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<Check size={13} />
								</span>
								<span>Você decide os próximos passos com mais clareza.</span>
							</div>
						</div>
					</section>

					<section className="rounded-[2rem] border border-white/10 bg-card p-6 shadow-2xl shadow-black/20 sm:p-9">
						<div className="mb-8 flex items-start justify-between gap-6">
							<div>
								<p className="font-mono text-[10px] uppercase tracking-[.18em] text-white/40">
									Contato / 01
								</p>
								<h2 className="mt-2 text-2xl font-black text-white">
									Vamos conversar?
								</h2>
							</div>
							<div className="rounded-2xl bg-primary/[.1] p-3 text-primary">
								<MessageSquare size={22} />
							</div>
						</div>
						<form className="space-y-6">
							<FieldSet>
								<FieldGroup>
									<Field>
										<FieldLabel
											htmlFor="nome"
											className="text-sm font-bold text-white"
										>
											<UserRound
												aria-hidden="true"
												className="size-4 text-white/35"
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
											className="min-h-12 rounded-xl border-white/10 bg-white/[.03] px-4 text-white placeholder:text-white/25"
										/>
									</Field>
									<Field>
										<FieldLabel
											htmlFor="email"
											className="text-sm font-bold text-white"
										>
											<Mail
												aria-hidden="true"
												className="size-4 text-white/35"
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
											className="min-h-12 rounded-xl border-white/10 bg-white/[.03] px-4 text-white placeholder:text-white/25"
										/>
									</Field>
									<Field>
										<FieldLabel
											htmlFor="mensagem"
											className="text-sm font-bold text-white"
										>
											<MessageSquare
												aria-hidden="true"
												className="size-4 text-white/35"
											/>
											Mensagem
										</FieldLabel>
										<textarea
											id="mensagem"
											name="mensagem"
											required
											rows={6}
											placeholder="O que você gostaria de melhorar na sua operação?"
											className="w-full resize-y rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-white/25 transition focus:border-primary focus:ring-2 focus:ring-primary/20"
										/>
										<FieldDescription className="text-white/35">
											Uma mensagem curta já é suficiente para começar.
										</FieldDescription>
									</Field>
								</FieldGroup>
							</FieldSet>
							<button
								type="submit"
								className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground transition hover:bg-[#c1ff52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
							>
								Enviar mensagem <ArrowUpRight size={18} />
							</button>
							<p className="text-center text-xs leading-relaxed text-white/30">
								Sem compromisso. Este formulário é apenas uma demonstração.
							</p>
						</form>
					</section>
				</div>
			</div>
		</div>
	);
}

export const getConfig = async () => ({ render: "static" as const });
