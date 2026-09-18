// import {
// 	ArrowRight,
// 	ArrowUpRight,
// 	BellRing,
// 	Check,
// 	CircleAlert,
// 	Gauge,
// 	Radio,
// 	Wifi,
// } from "lucide-react";

// const comparisons = [
// 	{
// 		label: "Visibilidade da operação",
// 		without: "Fragmentada",
// 		with: "Em tempo real",
// 	},
// 	{
// 		label: "Resposta a falhas",
// 		without: "Depois do prejuízo",
// 		with: "Antes da parada",
// 	},
// 	{ label: "Decisões", without: "No feeling", with: "Baseadas em dados" },
// ];

export default function HomePage() {
	return (
		<></>
		// <div className="relative overflow-hidden bg-background">
		// 	<div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_70%_20%,rgba(125,81,254,.22),transparent_38%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

		// 	<section className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-6 pb-20 pt-36 lg:grid-cols-[.92fr_1.08fr] lg:px-10 lg:pt-40">
		// 		<div className="max-w-2xl">
		// 			<p className="mb-6 flex items-center gap-3 font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
		// 				<span className="h-px w-8 bg-primary" /> IoT para operações mais
		// 				inteligentes
		// 			</p>
		// 			<h1 className="text-5xl font-black leading-[.94] tracking-[-.07em] text-white sm:text-7xl">
		// 				Sua máquina está falando.
		// 				<br />
		// 				<span className="text-primary">Você está ouvindo?</span>
		// 			</h1>
		// 			<p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
		// 				A NEXUS é um projeto que incentiva empresas a transformar máquinas e
		// 				sistemas em uma operação que enxerga problemas antes que eles parem
		// 				o negócio.
		// 			</p>
		// 			<a
		// 				href="/showroom"
		// 				className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-full bg-primary px-7 text-sm font-extrabold text-primary-foreground transition hover:bg-[#c1ff52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
		// 			>
		// 				Ver a diferença no showroom <ArrowRight size={18} />
		// 			</a>
		// 		</div>

		// 		<div className="relative rounded-[2rem] border border-white/10 bg-card/90 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
		// 			<div className="mb-5 flex items-center justify-between">
		// 				<div>
		// 					<p className="font-mono text-[10px] uppercase tracking-[.18em] text-white/40">
		// 						Nexus / Comparativo
		// 					</p>
		// 					<p className="mt-2 text-lg font-bold text-white">
		// 						Duas operações. Um futuro.
		// 					</p>
		// 				</div>
		// 				<span className="rounded-full border border-primary/30 px-3 py-1 font-mono text-[10px] text-primary">
		// 					AO VIVO
		// 				</span>
		// 			</div>
		// 			<div className="grid gap-3 sm:grid-cols-2">
		// 				<div className="rounded-2xl border border-[#ff5c5c]/25 bg-[#ff5c5c]/[.06] p-5">
		// 					<div className="flex items-center justify-between">
		// 						<span className="font-mono text-[10px] uppercase tracking-wider text-[#ff8c8c]">
		// 							Sem IoT
		// 						</span>
		// 						<CircleAlert size={18} className="text-[#ff5c5c]" />
		// 					</div>
		// 					<p className="mt-10 text-2xl font-black text-white">Reagir</p>
		// 					<p className="mt-2 text-sm leading-relaxed text-white/45">
		// 						A equipe descobre o problema quando o impacto já chegou.
		// 					</p>
		// 					<div className="mt-8 grid grid-cols-2 gap-2">
		// 						<div className="rounded-xl bg-black/20 p-3">
		// 							<p className="font-mono text-[10px] text-white/40">PARADAS</p>
		// 							<p className="mt-2 text-xl font-bold text-[#ff8c8c]">+18%</p>
		// 						</div>
		// 						<div className="rounded-xl bg-black/20 p-3">
		// 							<p className="font-mono text-[10px] text-white/40">
		// 								VISIBILIDADE
		// 							</p>
		// 							<p className="mt-2 text-xl font-bold text-[#ff8c8c]">32%</p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="rounded-2xl border border-primary/40 bg-primary/[.08] p-5">
		// 					<div className="flex items-center justify-between">
		// 						<span className="font-mono text-[10px] uppercase tracking-wider text-primary">
		// 							Com NEXUS + IoT
		// 						</span>
		// 						<Wifi size={18} className="text-primary" />
		// 					</div>
		// 					<p className="mt-10 text-2xl font-black text-white">Antecipar</p>
		// 					<p className="mt-2 text-sm leading-relaxed text-white/55">
		// 						A equipe recebe o sinal, entende o contexto e age no tempo
		// 						certo.
		// 					</p>
		// 					<div className="mt-8 grid grid-cols-2 gap-2">
		// 						<div className="rounded-xl bg-primary/15 p-3">
		// 							<p className="font-mono text-[10px] text-white/50">
		// 								EFICIÊNCIA
		// 							</p>
		// 							<p className="mt-2 text-xl font-bold text-primary">+28.4%</p>
		// 						</div>
		// 						<div className="rounded-xl bg-primary/15 p-3">
		// 							<p className="font-mono text-[10px] text-white/50">
		// 								VISIBILIDADE
		// 							</p>
		// 							<p className="mt-2 text-xl font-bold text-primary">100%</p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 			<div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm text-white/55">
		// 				<span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_#AAFF00]" />{" "}
		// 				A diferença é saber antes.
		// 			</div>
		// 		</div>
		// 	</section>

		// 	<section
		// 		id="solucoes"
		// 		className="border-y border-white/10 bg-card px-6 py-24 lg:px-10 lg:py-32"
		// 	>
		// 		<div className="mx-auto max-w-7xl">
		// 			<div className="max-w-2xl">
		// 				<p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
		// 					A diferença na prática
		// 				</p>
		// 				<h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.06em] text-white sm:text-6xl">
		// 					IoT não é apenas sobre ter mais tecnologia.
		// 					<br />
		// 					<span className="text-secondary">É sobre perder menos.</span>
		// 				</h2>
		// 			</div>
		// 			<div className="mt-14 overflow-hidden rounded-3xl border border-white/10">
		// 				<div className="hidden grid-cols-[1.2fr_1fr_1fr] bg-white/[.04] px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-white/40 sm:grid">
		// 					<span>O que muda</span>
		// 					<span>Sem IoT</span>
		// 					<span className="text-primary">Com IoT</span>
		// 				</div>
		// 				{comparisons.map((item) => (
		// 					<div
		// 						key={item.label}
		// 						className="grid gap-3 border-t border-white/10 px-6 py-5 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center"
		// 					>
		// 						<span className="font-bold text-white">{item.label}</span>
		// 						<span className="flex items-center gap-2 text-sm text-[#ff8c8c]">
		// 							<CircleAlert size={15} /> {item.without}
		// 						</span>
		// 						<span className="flex items-center gap-2 text-sm text-primary">
		// 							<Check size={15} /> {item.with}
		// 						</span>
		// 					</div>
		// 				))}
		// 			</div>
		// 		</div>
		// 	</section>

		// 	<section
		// 		id="como-funciona"
		// 		className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
		// 	>
		// 		<div className="grid items-start gap-12 lg:grid-cols-[.7fr_1.3fr]">
		// 			<div>
		// 				<p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
		// 					Como a NEXUS orienta a conexão
		// 				</p>
		// 				<h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.06em] text-white sm:text-6xl">
		// 					Do sensor à decisão.
		// 				</h2>
		// 				<p className="mt-6 max-w-md leading-relaxed text-white/50">
		// 					A NEXUS é um projeto que mostra o potencial do IoT e ajuda sua
		// 					empresa a enxergar onde essa tecnologia pode gerar mais impacto.
		// 				</p>
		// 			</div>
		// 			<div className="grid gap-3 sm:grid-cols-3">
		// 				<div className="rounded-2xl border border-white/10 bg-card p-6">
		// 					<Radio className="text-primary" />
		// 					<p className="mt-14 text-xl font-black text-white">Identificar</p>
		// 					<p className="mt-2 text-sm leading-relaxed text-white/45">
		// 						Descubra quais máquinas, ambientes e processos podem ser
		// 						monitorados.
		// 					</p>
		// 				</div>
		// 				<div className="rounded-2xl border border-white/10 bg-card p-6">
		// 					<Gauge className="text-secondary" />
		// 					<p className="mt-14 text-xl font-black text-white">Visualizar</p>
		// 					<p className="mt-2 text-sm leading-relaxed text-white/45">
		// 						Veja no showroom como dados podem virar contexto para sua
		// 						operação.
		// 					</p>
		// 				</div>
		// 				<div className="rounded-2xl border border-white/10 bg-card p-6">
		// 					<BellRing className="text-accent" />
		// 					<p className="mt-14 text-xl font-black text-white">Adotar</p>
		// 					<p className="mt-2 text-sm leading-relaxed text-white/45">
		// 						Leve uma visão mais clara para conversar sobre os próximos
		// 						passos da sua empresa.
		// 					</p>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</section>

		// 	<section
		// 		id="relatos"
		// 		className="mx-6 mb-24 overflow-hidden rounded-[2rem] bg-primary lg:mx-10"
		// 	>
		// 		<div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-7 py-14 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:py-20">
		// 			<div>
		// 				<p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-primary-foreground/55">
		// 					Pronto para comparar?
		// 				</p>
		// 				<h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-[-.06em] text-primary-foreground sm:text-6xl">
		// 					Veja o impacto antes de imaginar.
		// 				</h2>
		// 			</div>
		// 			<a
		// 				href="/showroom"
		// 				className="inline-flex min-h-14 shrink-0 items-center gap-3 rounded-full bg-[#141414] px-7 text-sm font-extrabold text-white transition hover:bg-[#242424] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414]"
		// 			>
		// 				Entrar no showroom <ArrowUpRight size={18} />
		// 			</a>
		// 		</div>
		// 	</section>

		// 	<footer className="border-t border-white/10 px-6 py-8 lg:px-10">
		// 		<div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
		// 			<span className="font-black tracking-[-.05em] text-white">
		// 				NEXUS<span className="text-primary">.</span>
		// 			</span>
		// 			<span>Dados que conectam. Decisões que movem.</span>
		// 			<span>© 2026 NEXUS</span>
		// 		</div>
		// 	</footer>
		// </div>
	);
}

export const getConfig = async () => ({ render: "static" as const });
