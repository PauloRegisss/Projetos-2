import {
	ArrowRight,
	BarChart3,
	Boxes,
	BrainCircuit,
	ChevronRight,
	Factory,
	HeartPulse,
	Leaf,
	Package,
	Radio,
	ShieldCheck,
	Thermometer,
	Truck,
} from "lucide-react";

const sectors = [
	{ icon: Truck, name: "Logística", detail: "Rastreie cada etapa" },
	{ icon: Factory, name: "Indústria", detail: "Antecipe paradas" },
	{ icon: Leaf, name: "Agronegócio", detail: "Proteja sua colheita" },
	{ icon: HeartPulse, name: "Saúde", detail: "Controle o essencial" },
	{ icon: Package, name: "Varejo", detail: "Cuide do estoque" },
	{ icon: Thermometer, name: "Cadeia fria", detail: "Mantenha o padrão" },
];

const steps = [
	{
		number: "01",
		icon: Radio,
		title: "Sensor",
		text: "Capturamos o que está acontecendo em tempo real.",
	},
	{
		number: "02",
		icon: Boxes,
		title: "Dados",
		text: "Organizamos sinais dispersos em uma única visão.",
	},
	{
		number: "03",
		icon: BrainCircuit,
		title: "Análise",
		text: "Traduzimos padrões complexos em contexto claro.",
	},
	{
		number: "04",
		icon: ArrowRight,
		title: "Ação",
		text: "Você decide mais rápido, com confiança e precisão.",
	},
];

export default function HomePage() {
	return <div></div>;
	// return (
	// 	<div className="relative overflow-hidden bg-[#141414]">
	// 		<div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,transparent_78%)]" />
	// 		<section className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-16 px-6 pb-24 pt-36 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pt-44">
	// 			<div className="relative z-10 max-w-3xl">
	// 				<p className="mb-7 flex items-center gap-3 font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-[#AAFF00] uppercase">
	// 					<span className="h-px w-8 bg-[#AAFF00]" /> IoT para operações que
	// 					não podem parar
	// 				</p>
	// 				<h1 className="max-w-4xl text-6xl font-black leading-[.92] tracking-[-0.075em] text-white sm:text-8xl lg:text-[8.2rem]">
	// 					O próximo passo{" "}
	// 					<span className="text-[#AAFF00]">da sua operação.</span>
	// 				</h1>
	// 				<p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
	// 					A NEXUS conecta sensores, dados e inteligência para transformar o
	// 					caos operacional em decisões simples, rápidas e eficientes.
	// 				</p>
	// 				<div className="mt-10 flex flex-wrap items-center gap-4">
	// 					<a
	// 						href="#solucoes"
	// 						className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#AAFF00] px-6 text-sm font-extrabold text-[#141414] transition hover:bg-[#c1ff52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AAFF00]"
	// 					>
	// 						Conheça a NEXUS <ArrowRight size={17} />
	// 					</a>
	// 					<a
	// 						href="#como-funciona"
	// 						className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-bold text-white transition hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AAFF00]"
	// 					>
	// 						Ver como funciona <ChevronRight size={16} />
	// 					</a>
	// 				</div>
	// 			</div>
	// 			<div className="relative mx-auto h-[390px] w-full max-w-[500px] lg:h-[490px]">
	// 				<div className="absolute inset-0 bg-[radial-gradient(circle,rgba(125,81,254,.22),transparent_64%)]" />
	// 				<div className="absolute right-0 top-12 w-[90%] rounded-[2rem] border border-white/15 bg-[#1d1d1d]/90 p-5 shadow-2xl shadow-[#7d51fe]/10 backdrop-blur sm:p-7">
	// 					<div className="mb-8 flex items-center justify-between">
	// 						<div>
	// 							<p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">
	// 								Nexus / Overview
	// 							</p>
	// 							<p className="mt-2 text-xl font-bold text-white">
	// 								Operação em tempo real
	// 							</p>
	// 						</div>
	// 						<span className="motion-safe:animate-pulse h-3 w-3 rounded-full bg-[#AAFF00] shadow-[0_0_18px_#AAFF00]" />
	// 					</div>
	// 					<div className="grid grid-cols-2 gap-3">
	// 						<div className="rounded-2xl bg-[#AAFF00] p-4 text-[#141414]">
	// 							<p className="font-mono text-[10px] uppercase tracking-wider opacity-60">
	// 								Eficiência
	// 							</p>
	// 							<p className="mt-4 text-3xl font-black">+28.4%</p>
	// 							<p className="mt-1 text-xs font-bold">vs. mês anterior</p>
	// 						</div>
	// 						<div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
	// 							<p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
	// 								Alertas ativos
	// 							</p>
	// 							<p className="mt-4 text-3xl font-black text-white">03</p>
	// 							<p className="mt-1 text-xs text-[#fd51fe]">1 requer atenção</p>
	// 						</div>
	// 					</div>
	// 					<div className="mt-5 flex h-28 items-end gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 pb-4 pt-5">
	// 						{[35, 48, 42, 68, 54, 76, 62, 91, 75, 100, 83, 95].map(
	// 							(height, index) => (
	// 								<span
	// 									key={height}
	// 									className={`w-full rounded-t-sm ${index > 8 ? "bg-[#AAFF00]" : "bg-[#7D51FE]/70"}`}
	// 									style={{ height: `${height}%` }}
	// 								/>
	// 							),
	// 						)}
	// 					</div>
	// 				</div>
	// 				<div className="absolute bottom-0 left-0 rounded-2xl border border-[#AAFF00]/30 bg-[#1c1c1c] p-4 shadow-xl shadow-black/30">
	// 					<div className="flex items-center gap-3">
	// 						<div className="rounded-xl bg-[#7D51FE]/20 p-3 text-[#AAFF00]">
	// 							<ShieldCheck size={22} />
	// 						</div>
	// 						<div>
	// 							<p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
	// 								Sistema protegido
	// 							</p>
	// 							<p className="mt-1 text-sm font-bold text-white">
	// 								Tudo sob controle
	// 							</p>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</section>
	// 		<div className="border-y border-white/10 bg-[#1c1c1c]">
	// 			<div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5 font-mono text-[10px] uppercase tracking-[.18em] text-white/40 lg:px-10">
	// 				<span>Conecte o que importa</span>
	// 				<span className="text-[#AAFF00]">● Dados em movimento</span>
	// 				<span className="hidden sm:inline">Sensores inteligentes</span>
	// 				<span className="hidden md:inline">Decisões mais rápidas</span>
	// 			</div>
	// 		</div>

	// 		<section
	// 			id="solucoes"
	// 			className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
	// 		>
	// 			<div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
	// 				<div>
	// 					<p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-[#AAFF00] uppercase">
	// 						01 / O problema
	// 					</p>
	// 					<h2 className="mt-6 text-4xl font-black leading-tight tracking-[-.06em] text-white sm:text-6xl">
	// 						Menos ruído.
	// 						<br />
	// 						<span className="text-[#7D51FE]">Mais clareza.</span>
	// 					</h2>
	// 				</div>
	// 				<div className="max-w-2xl">
	// 					<p className="text-2xl leading-snug text-white/85 sm:text-3xl">
	// 						Sua operação já gera muitos dados. O que falta é transformar toda
	// 						essa informação em uma resposta que chega antes do problema.
	// 					</p>
	// 					<p className="mt-6 max-w-xl text-base leading-relaxed text-white/45">
	// 						A NEXUS nasce para fazer essa ponte. Tecnologia invisível no dia a
	// 						dia, impacto visível no resultado.
	// 					</p>
	// 				</div>
	// 			</div>
	// 			<div className="mt-20 grid gap-4 sm:grid-cols-3">
	// 				<div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-7">
	// 					<p className="font-mono text-4xl font-bold text-[#AAFF00]">24/7</p>
	// 					<p className="mt-10 font-bold text-white">Monitoramento contínuo</p>
	// 					<p className="mt-2 text-sm leading-relaxed text-white/45">
	// 						Nada passa despercebido quando você precisa estar presente em
	// 						todos os pontos.
	// 					</p>
	// 				</div>
	// 				<div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-7">
	// 					<p className="font-mono text-4xl font-bold text-[#FD51FE]">
	// 						1 visão
	// 					</p>
	// 					<p className="mt-10 font-bold text-white">Para toda a operação</p>
	// 					<p className="mt-2 text-sm leading-relaxed text-white/45">
	// 						Informações conectadas, sem planilhas soltas ou sistemas que não
	// 						conversam.
	// 					</p>
	// 				</div>
	// 				<div className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-7">
	// 					<p className="font-mono text-4xl font-bold text-[#7D51FE]">∞</p>
	// 					<p className="mt-10 font-bold text-white">
	// 						Possibilidades de escala
	// 					</p>
	// 					<p className="mt-2 text-sm leading-relaxed text-white/45">
	// 						Comece pequeno. Cresça no ritmo da sua operação, sem trocar a
	// 						base.
	// 					</p>
	// 				</div>
	// 			</div>
	// 		</section>

	// 		<section
	// 			id="como-funciona"
	// 			className="border-y border-white/10 bg-[#1c1c1c] px-6 py-28 lg:px-10 lg:py-36"
	// 		>
	// 			<div className="mx-auto max-w-7xl">
	// 				<div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
	// 					<div>
	// 						<p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-[#AAFF00] uppercase">
	// 							02 / Como funciona
	// 						</p>
	// 						<h2 className="mt-6 max-w-2xl text-4xl font-black leading-[.95] tracking-[-.06em] text-white sm:text-6xl">
	// 							Do sinal à decisão.
	// 							<br />
	// 							<span className="[-webkit-text-stroke:1px_rgba(242,242,243,.42)] text-transparent">
	// 								Sem atalhos.
	// 							</span>
	// 						</h2>
	// 					</div>
	// 					<p className="max-w-xs text-sm leading-relaxed text-white/45">
	// 						Uma camada inteligente entre o mundo físico e as decisões que
	// 						fazem seu negócio avançar.
	// 					</p>
	// 				</div>
	// 				<div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
	// 					{steps.map(({ number, icon: Icon, title, text }, index) => (
	// 						<div
	// 							key={title}
	// 							className="group bg-[#1c1c1c] p-6 transition hover:bg-[#242424] sm:p-8"
	// 						>
	// 							<div className="flex items-start justify-between">
	// 								<span className="font-mono text-xs text-white/35">
	// 									{number}
	// 								</span>
	// 								<Icon
	// 									className="text-[#AAFF00] transition group-hover:scale-110"
	// 									size={25}
	// 								/>
	// 							</div>
	// 							<h3 className="mt-20 text-2xl font-black text-white">
	// 								{title}
	// 							</h3>
	// 							<p className="mt-3 text-sm leading-relaxed text-white/45">
	// 								{text}
	// 							</p>
	// 							{index < 3 && (
	// 								<div className="mt-8 hidden h-px w-10 bg-[#AAFF00] md:block" />
	// 							)}
	// 						</div>
	// 					))}
	// 				</div>
	// 			</div>
	// 		</section>

	// 		<section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
	// 			<div className="grid items-end gap-10 lg:grid-cols-[.8fr_1.2fr]">
	// 				<div>
	// 					<p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-[#AAFF00] uppercase">
	// 						03 / Soluções por setor
	// 					</p>
	// 					<h2 className="mt-6 text-4xl font-black leading-tight tracking-[-.06em] text-white sm:text-6xl">
	// 						Tecnologia que
	// 						<br />
	// 						<span className="text-[#AAFF00]">entende o contexto.</span>
	// 					</h2>
	// 				</div>
	// 				<p className="max-w-xl text-lg leading-relaxed text-white/50">
	// 					Cada operação tem um ritmo. A NEXUS adapta inteligência e sensores à
	// 					realidade de quem faz acontecer.
	// 				</p>
	// 			</div>
	// 			<div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
	// 				{sectors.map(({ icon: Icon, name, detail }) => (
	// 					<a
	// 						href="#contato"
	// 						key={name}
	// 						className="group flex min-h-36 flex-col justify-between rounded-2xl border border-white/10 bg-[#1c1c1c] p-5 transition hover:-translate-y-1 hover:border-[#AAFF00]/50"
	// 					>
	// 						<div className="flex items-center justify-between">
	// 							<Icon
	// 								size={23}
	// 								className="text-[#7D51FE] group-hover:text-[#AAFF00]"
	// 							/>
	// 							<ArrowRight
	// 								size={17}
	// 								className="text-white/25 transition group-hover:translate-x-1 group-hover:text-[#AAFF00]"
	// 							/>
	// 						</div>
	// 						<div>
	// 							<h3 className="text-lg font-bold text-white">{name}</h3>
	// 							<p className="mt-1 text-sm text-white/40">{detail}</p>
	// 						</div>
	// 					</a>
	// 				))}
	// 			</div>
	// 		</section>

	// 		<section
	// 			id="relatos"
	// 			className="mx-6 overflow-hidden rounded-[2rem] bg-[#AAFF00] lg:mx-10"
	// 		>
	// 			<div className="mx-auto grid max-w-7xl gap-10 px-7 py-16 sm:px-12 lg:grid-cols-[1fr_.8fr] lg:items-end lg:py-24">
	// 				<div>
	// 					<p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-[#141414]/55">
	// 						A tecnologia não precisa ser complexa
	// 					</p>
	// 					<blockquote className="mt-8 max-w-3xl text-3xl font-black leading-tight tracking-[-.06em] text-[#141414] sm:text-5xl">
	// 						“A NEXUS traduz o que está acontecendo na operação para que a
	// 						gente saiba exatamente o que fazer.”
	// 					</blockquote>
	// 					<p className="mt-8 font-mono text-xs uppercase tracking-wider text-[#141414]/55">
	// 						— Operação logística, São Paulo
	// 					</p>
	// 				</div>
	// 				<div className="lg:justify-self-end">
	// 					<BarChart3
	// 						size={120}
	// 						strokeWidth={1}
	// 						className="text-[#141414]/25"
	// 					/>
	// 				</div>
	// 			</div>
	// 		</section>

	// 		<section
	// 			id="contato"
	// 			className="relative mx-auto max-w-7xl px-6 py-32 text-center lg:px-10 lg:py-44"
	// 		>
	// 			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(125,81,254,.22),transparent_64%)] opacity-60" />
	// 			<div className="relative">
	// 				<p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-[#AAFF00] uppercase">
	// 					04 / Próximo passo
	// 				</p>
	// 				<h2 className="mx-auto mt-7 max-w-4xl text-5xl font-black leading-[.94] tracking-[-.07em] text-white sm:text-7xl">
	// 					Sua operação já está em movimento.{" "}
	// 					<span className="text-[#AAFF00]">Vamos conectar.</span>
	// 				</h2>
	// 				<p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-white/50">
	// 					Conte para a gente o que você quer enxergar melhor. A próxima
	// 					decisão pode começar aqui.
	// 				</p>
	// 				<a
	// 					href="mailto:oi@nexus.io"
	// 					className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#AAFF00] px-7 text-sm font-extrabold text-[#141414] transition hover:bg-[#c1ff52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AAFF00]"
	// 				>
	// 					Falar com a NEXUS <ArrowRight size={18} />
	// 				</a>
	// 			</div>
	// 		</section>

	// 		<footer className="border-t border-white/10 px-6 py-8 lg:px-10">
	// 			<div className="mx-auto flex max-w-7xl flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
	// 				<span className="font-black tracking-[-.05em] text-white">
	// 					NEXUS<span className="text-[#AAFF00]">.</span>
	// 				</span>
	// 				<span>Dados que conectam. Decisões que movem.</span>
	// 				<span>© 2026 NEXUS</span>
	// 			</div>
	// 		</footer>
	// 	</div>
	// );
}

export const getConfig = async () => ({ render: "static" });
