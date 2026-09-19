import {
	ArrowLeft,
	BellRing,
	CheckCircle2,
	CircleAlert,
	Gauge,
	Radio,
	Thermometer,
	Wifi,
} from "lucide-react";

const machines = [
	{
		name: "Linha de envase 01",
		status: "Operando",
		value: "92%",
		color: "text-primary",
	},
	{
		name: "Câmara fria 02",
		status: "Atenção",
		value: "7.8°C",
		// color: "text-accent",
	},
	{
		name: "Compressor 04",
		status: "Operando",
		value: "68%",
		color: "text-primary",
	},
];

export default function ShowroomPage() {
	return (
		<div className="min-h-screen bg-background px-6 pb-16 pt-32 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
					<div>
						<a
							className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-primary"
							href="/"
						>
							<ArrowLeft size={16} /> Voltar para a NEXUS
						</a>
						<p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
							Nexus / Showroom
						</p>
						<h1 className="mt-5 text-4xl font-black tracking-[-.06em] text-white sm:text-6xl">
							A diferença em tempo real.
						</h1>
						<p className="mt-5 max-w-xl text-lg leading-relaxed text-white/50">
							Uma amostra de como sua operação pode sair do modo reativo e
							começar a antecipar decisões.
						</p>
					</div>
					<div className="flex items-center gap-3 rounded-full border border-primary/30 bg-primary/[.06] px-4 py-3 text-sm text-primary">
						<span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_#AAFF00]" />{" "}
						Dados simulados ao vivo
					</div>
				</div>

				<div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div className="rounded-2xl border border-white/10 bg-card p-5">
						<Gauge className="text-primary" size={21} />
						<p className="mt-8 text-sm text-white/45">Eficiência operacional</p>
						<p className="mt-2 text-3xl font-black text-white">+28.4%</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-card p-5">
						<Radio className="text-secondary" size={21} />
						<p className="mt-8 text-sm text-white/45">Sensores conectados</p>
						<p className="mt-2 text-3xl font-black text-white">128</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-card p-5">
						<BellRing className="text-accent" size={21} />
						<p className="mt-8 text-sm text-white/45">Alertas em aberto</p>
						<p className="mt-2 text-3xl font-black text-white">03</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-card p-5">
						<Thermometer className="text-primary" size={21} />
						<p className="mt-8 text-sm text-white/45">Tempo monitorado</p>
						<p className="mt-2 text-3xl font-black text-white">24/7</p>
					</div>
				</div>

				<div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
					<section className="rounded-3xl border border-white/10 bg-card p-5 sm:p-7">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-mono text-[10px] uppercase tracking-[.18em] text-white/40">
									Operação monitorada
								</p>
								<h2 className="mt-2 text-xl font-bold text-white">
									Ativos conectados
								</h2>
							</div>
							<Wifi className="text-primary" size={22} />
						</div>
						<div className="mt-8 space-y-3">
							{machines.map((machine) => (
								<div
									key={machine.name}
									className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-4"
								>
									<div className="flex min-w-48 flex-1 items-center gap-3">
										<span
											className={`h-2.5 w-2.5 rounded-full ${machine.status === "Atenção" ? "bg-accent" : "bg-primary"}`}
										/>
										<div>
											<p className="font-bold text-white">{machine.name}</p>
											<p className="mt-1 text-xs text-white/40">
												{machine.status}
											</p>
										</div>
									</div>
									<div className="h-2 min-w-32 flex-1 overflow-hidden rounded-full bg-white/10">
										<div
											className={`h-full rounded-full ${machine.status === "Atenção" ? "w-2/3 bg-accent" : "w-[92%] bg-primary"}`}
										/>
									</div>
									<span
										className={`font-mono text-sm font-bold ${machine.color}`}
									>
										{machine.value}
									</span>
								</div>
							))}
						</div>
					</section>
					<aside className="rounded-3xl border border-primary/25 bg-primary/[.06] p-5 sm:p-7">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold text-white">Antes que pare</h2>
							<CircleAlert className="text-accent" size={22} />
						</div>
						<p className="mt-3 text-sm leading-relaxed text-white/50">
							Foi identificado uma alteração de temperatura na Câmara fria 02.
						</p>
						<div className="mt-8 rounded-2xl border border-accent/25 bg-accent/[.08] p-4">
							<p className="font-mono text-[10px] uppercase tracking-wider text-accent">
								Alerta preventivo
							</p>
							<p className="mt-3 text-2xl font-black text-white">7.8°C</p>
							<p className="mt-1 text-xs text-white/45">
								acima do padrão operacional
							</p>
						</div>
						<button
							type="button"
							className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-[#c1ff52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						>
							<CheckCircle2 size={16} /> Ver recomendação
						</button>
					</aside>
				</div>

				<div className="mt-4 rounded-3xl border border-white/10 bg-card p-5 sm:p-7">
					<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
						<div>
							<p className="font-mono text-[10px] uppercase tracking-[.18em] text-white/40">
								Comparativo Nexus
							</p>
							<h2 className="mt-2 text-xl font-bold text-white">
								O que muda quando você conecta?
							</h2>
						</div>
						<span className="text-sm text-primary">Com IoT / Sem IoT</span>
					</div>
					<div className="mt-8 grid gap-3 sm:grid-cols-3">
						<div className="rounded-2xl bg-[#ff5c5c]/[.06] p-4">
							<p className="font-mono text-[10px] uppercase text-[#ff8c8c]">
								Sem IoT
							</p>
							<p className="mt-4 text-lg font-bold text-white">
								Descobrir depois
							</p>
							<p className="mt-2 text-sm text-white/45">
								Falha, parada e prejuízo.
							</p>
						</div>
						<div className="flex items-center justify-center text-white/20">
							→
						</div>
						<div className="rounded-2xl bg-primary/[.08] p-4">
							<p className="font-mono text-[10px] uppercase text-primary">
								Com NEXUS + IoT
							</p>
							<p className="mt-4 text-lg font-bold text-white">Agir antes</p>
							<p className="mt-2 text-sm text-white/45">
								Sinal, contexto e decisão.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getConfig = async () => ({ render: "static" as const });
