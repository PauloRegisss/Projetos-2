import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "waku";
import Header from "@/components/header";
import CampoDeSinal from "@/components/movimento/campo-de-sinal";
import { BarraDeProgresso, Magnetico, Parallax } from "@/components/movimento/efeitos";
import Palavras from "@/components/movimento/palavras";
import PreviaComparativo from "@/components/movimento/previa-comparativo";
import { Button } from "@/components/ui/button";

const ETAPAS = ["8 perguntas rápidas", "Comparativo com e sem IoT", "Link próprio para compartilhar"];

export default function ShowroomPage() {
	return (
		<>
			<BarraDeProgresso />
			<Header />
			<div className="relative min-h-screen overflow-hidden bg-background px-6 pt-32 pb-24 lg:px-10 lg:pt-36">
				<div className="absolute inset-0 mask-[linear-gradient(to_bottom,black_70%,transparent)]">
					<CampoDeSinal />
				</div>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-to-r from-background/85 via-background/45 to-transparent lg:w-2/3" />

				<div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
					<Parallax velocidade={-60} apagar>
						<Link
							to="/"
							className="entrada inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
						>
							<ArrowLeft size={16} /> Voltar para a HOME
						</Link>
						<p
							className="entrada mt-10 font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase"
							style={{ animationDelay: "80ms" }}
						>
							Nexus / Showroom
						</p>
						<h1 className="mt-5 text-5xl font-black leading-[.96] tracking-[-.07em] text-foreground sm:text-7xl">
							<Palavras texto="Veja o impacto do IoT no seu negócio." atraso={120} />
						</h1>
						<p
							className="entrada mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
							style={{ animationDelay: "620ms" }}
						>
							Responda algumas perguntas rápidas no chat e monte o seu Showroom com o comparativo da operação com e sem
							IoT.
						</p>
						<ul className="mt-6 flex flex-wrap gap-2">
							{ETAPAS.map((etapa, indice) => (
								<li
									key={etapa}
									className="entrada rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
									style={{ animationDelay: `${720 + indice * 90}ms` }}
								>
									{etapa}
								</li>
							))}
						</ul>
						<div className="entrada mt-8" style={{ animationDelay: "1000ms" }}>
							<Magnetico>
								<Link to="/showroom/new">
									<Button size="lg" className="h-14 rounded-full px-7 font-extrabold">
										<Sparkles size={18} /> Começar simulação
									</Button>
								</Link>
							</Magnetico>
						</div>
					</Parallax>

					<Parallax velocidade={60}>
						<PreviaComparativo />
					</Parallax>
				</div>
			</div>
		</>
	);
}

export const getConfig = async () => ({ render: "static" as const });
