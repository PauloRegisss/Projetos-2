import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "waku";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";

export default function ShowroomPage() {
	return (
		<>
			<Header />
			<div className="min-h-screen bg-background px-6 pt-36 pb-24 lg:px-10">
				<div className="mx-auto max-w-3xl text-center space-y-4">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
					>
						<ArrowLeft size={16} /> Voltar para a HOME
					</Link>
					<p className="mt-10 font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">
						Nexus / Showroom
					</p>
					<h1 className="mt-5 text-4xl font-black tracking-[-.06em] text-foreground sm:text-6xl">
						Veja o impacto do IoT no seu negócio.
					</h1>
					<p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
						Responda algumas perguntas rápidas no chat e monte o seu Showroom
						com o comparativo da operação com e sem IoT.
					</p>
					<Link to={"/showroom/new"}>
						<Button>
							<Sparkles size={18} /> Começar simulação
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
}

export const getConfig = async () => ({ render: "static" as const });
