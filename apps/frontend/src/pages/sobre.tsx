import { ArrowRight, BellRing, Gauge, Radio, Wifi } from "lucide-react";
import { Link } from "waku";
import Header from "@/components/header";
import CampoDeSinal from "@/components/movimento/campo-de-sinal";
import ChamadaFinal from "@/components/movimento/chamada-final";
import {
	Aparecer,
	BarraDeProgresso,
	Holofote,
	Letreiro,
	Magnetico,
	Parallax,
	ParallaxLocal,
	TextoRevelado,
} from "@/components/movimento/efeitos";
import Palavras from "@/components/movimento/palavras";

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
			<BarraDeProgresso />
			<Header />

			<main className="relative overflow-clip bg-background text-foreground">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-170 bg-[radial-gradient(circle_at_18%_20%,rgba(170,255,0,.12),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(125,81,254,.12),transparent_34%),linear-gradient(rgba(0,0,0,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.035)_1px,transparent_1px)] bg-size-[auto,auto,48px_48px,48px_48px] mask-[linear-gradient(to_bottom,black,transparent)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(170,255,0,.14),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(125,81,254,.2),transparent_34%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)]" />

				<div className="absolute inset-x-0 top-0 h-170 mask-[linear-gradient(to_bottom,black_65%,transparent)]">
					<CampoDeSinal />
				</div>
				<div className="pointer-events-none absolute inset-x-0 top-0 h-170 bg-linear-to-r from-background/85 via-background/45 to-transparent" />

				<section className="relative mx-auto max-w-7xl px-6 pt-36 pb-24 lg:px-10 lg:pt-44 lg:pb-32">
					<Parallax velocidade={-70} apagar className="max-w-3xl">
						<p className="entrada flex items-center gap-3 font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">
							<span className="h-px w-8 bg-primary" />
							Sobre a NEXUS
						</p>

						<h1 className="mt-6 text-5xl font-black leading-[.95] tracking-[-.07em] text-foreground sm:text-7xl">
							<Palavras texto="Tecnologia para trocar a reação pela" />
							<span className="text-primary">
								<Palavras texto="antecipação." atraso={420} />
							</span>
						</h1>

						<p
							style={{ animationDelay: "620ms" }}
							className="entrada mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
						>
							A NEXUS é um projeto de IoT que mostra como máquinas, ambientes e
							sistemas podem trabalhar juntos para tornar operações mais
							inteligentes, seguras, eficientes e conectadas.
						</p>
					</Parallax>
				</section>

				<div className="relative z-10 -my-8 overflow-x-clip py-10">
					<Letreiro
						itens={["Conectar", "Entender", "Antecipar", "Melhorar"]}
						velocidadeBase={50}
						className="relative mx-[-5%] -rotate-[1.8deg] bg-secondary py-3 text-2xl font-black tracking-[-.04em] text-secondary-foreground uppercase sm:text-4xl"
					/>
				</div>

				<section className="border-y border-border bg-card/60">
					<div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28">
						<div>
							<p className="font-mono text-[.68rem] font-bold tracking-[.14em] text-secondary uppercase">
								Por que existimos
							</p>

							<h2 className="mt-5 max-w-md text-4xl font-black leading-tight tracking-[-.06em] text-foreground sm:text-5xl">
								<TextoRevelado trechos={[{ texto: "Toda operação já produz sinais." }]} />
							</h2>
						</div>

						<Aparecer direcao="direita" className="space-y-6 text-lg leading-relaxed text-muted-foreground">
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
						</Aparecer>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<Aparecer className="max-w-2xl">
						<p className="font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">
							Como funciona
						</p>

						<h2 className="mt-5 text-4xl font-black tracking-[-.06em] text-foreground sm:text-5xl">
							Do sinal à decisão.
						</h2>
					</Aparecer>

					<div className="mt-12 grid gap-4 md:grid-cols-3">
						{pillars.map(({ icon: Icon, title, text }, index) => (
							<ParallaxLocal key={title} distancia={[18, 54, 90][index] ?? 18}>
								<Aparecer as="article" atraso={index * 120}>
									<Holofote className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7 motion-reduce:hover:translate-y-0">
										<div className="flex items-center justify-between">
											<Icon aria-hidden="true" className="size-6 text-primary" />
											<span className="font-mono text-xs text-muted-foreground/60">
												0{index + 1}
											</span>
										</div>

										<h3 className="mt-16 text-2xl font-black text-card-foreground">
											{title}
										</h3>

										<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
											{text}
										</p>
									</Holofote>
								</Aparecer>
							</ParallaxLocal>
						))}
					</div>
				</section>

				<ChamadaFinal>
					<div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center gap-8 px-7 py-16 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
						<div className="max-w-2xl">
							<div className="flex items-center gap-3 text-primary-foreground/70">
								<Wifi aria-hidden="true" className="size-5" />

								<span className="font-mono text-[.68rem] font-bold tracking-[.14em] uppercase">
									O próximo passo
								</span>
							</div>

							<h2 className="mt-4 text-5xl font-black leading-[.98] tracking-[-.06em] text-primary-foreground sm:text-7xl">
								Veja a NEXUS em ação.
							</h2>

							<p className="mt-4 max-w-xl leading-relaxed text-primary-foreground/80">
								Explore o showroom e descubra como dados podem virar clareza
								para a sua operação.
							</p>
						</div>

						<Magnetico forca={0.45} className="shrink-0">
							<Link
								to="/showroom"
								className="group inline-flex min-h-16 items-center justify-center gap-3 rounded-full bg-[#141414] px-8 text-sm font-extrabold text-white transition hover:bg-[#242424] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414]"
							>
								Conhecer o showroom
								<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Magnetico>
					</div>
				</ChamadaFinal>
			</main>
		</>
	);
}

export const getConfig = async () => ({ render: "static" as const });
