import { ArrowRight, BellRing, Gauge, Radio, Wifi } from "lucide-react";
import { Link } from "waku";
import Header from "@/components/header";

const pillars = [
	{
		icon: Radio,
		title: "Conectar",
		text: "Sensores e sistemas transformam o que acontece na operação em dados confiáveis.",
	},
	{
		icon: Gauge,
		title: "Entender",
		text: "Os dados ganham contexto para revelar padrões, riscos e oportunidades de melhoria.",
	},
	{
		icon: BellRing,
		title: "Antecipar",
		text: "Alertas e visibilidade ajudam equipes a agir antes que uma falha vire prejuízo.",
	},
];

export default function AboutPage() {
	return (
		<>
			<Header />
			<main className="relative overflow-hidden bg-background">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-170 bg-[radial-gradient(circle_at_18%_20%,rgba(170,255,0,.14),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(125,81,254,.2),transparent_34%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-size-[auto,auto,48px_48px,48px_48px] mask-[linear-gradient(to_bottom,black,transparent)]" />
				<section className="relative mx-auto max-w-7xl px-6 pt-36 pb-24 lg:px-10 lg:pt-44 lg:pb-32">
					<div className="max-w-3xl">
						<p className="flex items-center gap-3 font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">
							<span className="h-px w-8 bg-primary" /> Sobre a NEXUS
						</p>
						<h1 className="mt-6 text-5xl font-black leading-[.95] tracking-[-.07em] text-white sm:text-7xl">
							Tecnologia para trocar a reação pela{" "}
							<span className="text-primary">antecipação.</span>
						</h1>
						<p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
							A NEXUS é um projeto de IoT que mostra como máquinas, ambientes e
							sistemas podem trabalhar juntos para tornar operações mais
							inteligentes, seguras e eficientes.
						</p>
					</div>
				</section>

				<section className="border-y border-white/10 bg-card/60">
					<div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28">
						<div>
							<p className="font-mono text-[.68rem] font-bold tracking-[.14em] text-secondary uppercase">
								Por que existimos
							</p>
							<h2 className="mt-5 max-w-md text-4xl font-black leading-tight tracking-[-.06em] text-white sm:text-5xl">
								Toda operação já produz sinais.
							</h2>
						</div>
						<div className="space-y-6 text-lg leading-relaxed text-white/55">
							<p>
								O desafio é transformar esses sinais em decisões no momento
								certo. Sem visibilidade, problemas pequenos crescem escondidos
								até interromperem o trabalho.
							</p>
							<p>
								A NEXUS aproxima pessoas e dados para que a equipe entenda o que
								está acontecendo, priorize o que importa e melhore
								continuamente.
							</p>
						</div>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<div className="max-w-2xl">
						<p className="font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">
							Como funciona
						</p>
						<h2 className="mt-5 text-4xl font-black tracking-[-.06em] text-white sm:text-5xl">
							Do sinal à decisão.
						</h2>
					</div>
					<div className="mt-12 grid gap-4 md:grid-cols-3">
						{pillars.map(({ icon: Icon, title, text }, index) => (
							<article
								key={title}
								className="rounded-3xl border border-white/10 bg-card p-6 sm:p-7"
							>
								<div className="flex items-center justify-between">
									<Icon aria-hidden="true" className="size-6 text-primary" />
									<span className="font-mono text-xs text-white/25">
										0{index + 1}
									</span>
								</div>
								<h3 className="mt-16 text-2xl font-black text-white">
									{title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-white/50">
									{text}
								</p>
							</article>
						))}
					</div>
				</section>

				<section className="mx-6 mb-20 overflow-hidden rounded-[2rem] bg-primary lg:mx-10 lg:mb-28">
					<div className="mx-auto flex max-w-7xl flex-col gap-8 px-7 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
						<div className="max-w-xl">
							<div className="flex items-center gap-3 text-primary-foreground/60">
								<Wifi aria-hidden="true" className="size-5" />
								<span className="font-mono text-[.68rem] font-bold tracking-[.14em] uppercase">
									O próximo passo
								</span>
							</div>
							<h2 className="mt-4 text-3xl font-black tracking-[-.05em] text-primary-foreground sm:text-4xl">
								Veja a NEXUS em ação.
							</h2>
							<p className="mt-3 leading-relaxed text-primary-foreground/65">
								Explore o showroom e descubra como dados podem virar clareza
								para a sua operação.
							</p>
						</div>
						<Link
							to="/showroom"
							className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary-foreground px-6 text-sm font-bold text-primary transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"
						>
							Conhecer o showroom{" "}
							<ArrowRight aria-hidden="true" className="size-4" />
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}

export const getConfig = async () => ({ render: "static" as const });
