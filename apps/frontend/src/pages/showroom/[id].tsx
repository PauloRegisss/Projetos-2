import {
	ArrowLeft,
	ArrowUpRight,
	Info,
	RotateCcw,
	SearchX,
	Sparkles,
	TrendingDown,
} from "lucide-react";
import { Link } from "waku";
import type { PageProps } from "waku/router";
import { api } from "@/auth/api";
import type { Metrica, Simulacao } from "@/chatbot/types";
import Header from "@/components/header";

export default async function ShowroomSimulacaoPage({
	id,
}: PageProps<"/showroom/[id]">) {
	const simulacao = await getData(id);

	return (
		<>
			<Header />
			<div className="min-h-screen bg-background px-6 pt-32 pb-24 lg:px-10 lg:pt-40">
				<div className="mx-auto max-w-7xl">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
					>
						<ArrowLeft size={16} /> Voltar para a HOME
					</Link>
					{simulacao ? <Resultado simulacao={simulacao} /> : <NaoEncontrada />}
				</div>
			</div>
		</>
	);
}

function Resultado({ simulacao }: { simulacao: Simulacao }) {
	const setor = simulacao.respostas.setor;

	return (
		<>
			{/* Título */}
			<div className="mt-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
				<div>
					<p className="font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">
						Nexus / Showroom
					</p>
					<h1 className="mt-5 text-4xl font-black tracking-[-.06em] text-foreground sm:text-6xl">
						Sua operação com e sem IoT.
					</h1>
					<p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
						Comparativo gerado a partir das respostas da sua empresa
						{setor ? ` (setor: ${setor})` : ""}.
					</p>
				</div>
				{simulacao.estimativa && (
					<p className="flex max-w-sm items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground dark:border-white/10">
						<Info className="mt-0.5 shrink-0 text-secondary" size={18} />
						Os valores são estimativas baseadas em percentuais médios de redução
						e podem variar conforme a realidade da empresa.
					</p>
				)}
			</div>

			{/* Economia */}
			<div className="mt-12 grid gap-4 sm:grid-cols-2">
				<CardEconomia
					titulo="Economia estimada por mês"
					valor={simulacao.economia_mensal}
					destaque
				/>
				<CardEconomia
					titulo="Economia estimada por ano"
					valor={simulacao.economia_anual}
				/>
			</div>

			{/* Comparativo */}
			<section className="mt-4 rounded-3xl border border-border bg-card p-5 sm:p-8 dark:border-white/10">
				<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
					<div>
						<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[.18em]">
							Comparativo Nexus
						</p>
						<h2 className="mt-2 text-xl font-bold text-card-foreground">
							O que muda quando você conecta?
						</h2>
					</div>
					<div className="flex gap-4 text-xs text-muted-foreground">
						<span className="flex items-center gap-2">
							<span className="size-2.5 rounded-full bg-muted-foreground/40" />{" "}
							Sem IoT
						</span>
						<span className="flex items-center gap-2">
							<span className="size-2.5 rounded-full bg-primary" /> Com IoT
						</span>
					</div>
				</div>

				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{simulacao.metricas.map((metrica) => (
						<CardMetrica key={metrica.key} metrica={metrica} />
					))}
				</div>
			</section>

			{/* Análise da IA */}
			<section className="mt-4 rounded-3xl border border-secondary/30 bg-secondary/5 p-5 sm:p-8">
				<div className="flex items-center gap-3">
					<Sparkles className="text-secondary" size={22} />
					<h2 className="text-xl font-bold text-foreground">
						Análise para o seu negócio
					</h2>
				</div>
				<p className="mt-4 max-w-3xl whitespace-pre-line leading-relaxed text-foreground/80">
					{simulacao.analise}
				</p>
			</section>

			{/* Chamada para ação */}
			<div className="mt-4 flex flex-col items-start justify-between gap-6 rounded-3xl bg-foreground p-6 text-background sm:flex-row sm:items-center sm:p-8">
				<div>
					<h2 className="text-2xl font-black tracking-[-.04em]">
						Quer transformar essa estimativa em resultado?
					</h2>
					<p className="mt-2 text-background/70">
						Fale com a equipe e entenda como aplicar IoT na sua operação.
					</p>
				</div>
				<div className="flex flex-wrap gap-3">
					<RotateCcw size={16} /> Refazer simulação
					<Link
						to="/contato"
						className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-extrabold text-primary-foreground transition hover:brightness-95"
					>
						Falar com a NEXUS <ArrowUpRight size={18} />
					</Link>
				</div>
			</div>
		</>
	);
}

function CardEconomia({
	titulo,
	valor,
	destaque = false,
}: {
	titulo: string;
	valor: number;
	destaque?: boolean;
}) {
	return (
		<div
			className={`rounded-3xl border p-6 sm:p-8 ${
				destaque
					? "border-primary/40 bg-primary/10"
					: "border-border bg-card dark:border-white/10"
			}`}
		>
			<TrendingDown className="text-primary" size={22} />
			<p className="mt-6 text-sm text-muted-foreground">{titulo}</p>
			<p className="mt-2 text-3xl font-black tracking-[-.04em] text-foreground sm:text-5xl">
				{formatarReais(valor)}
			</p>
		</div>
	);
}

function CardMetrica({ metrica }: { metrica: Metrica }) {
	const { sem_iot, com_iot } = metrica;
	// As barras usam o valor sem IoT como 100% (o com IoT nunca é maior).
	const largura = sem_iot > 0 ? (com_iot / sem_iot) * 100 : 0;
	const reducao = sem_iot > 0 ? Math.round((1 - com_iot / sem_iot) * 100) : 0;

	return (
		<article className="rounded-2xl border border-border bg-background/60 p-5 dark:border-white/10">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h3 className="font-bold text-foreground">{metrica.label}</h3>
					<p className="mt-1 font-mono text-[10px] text-muted-foreground uppercase">
						{metrica.unidade}
					</p>
				</div>
				{reducao > 0 && (
					<span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs font-bold text-foreground">
						−{reducao}%
					</span>
				)}
			</div>

			<div className="mt-5 space-y-3">
				<Barra
					rotulo="Sem IoT"
					valor={formatarValor(sem_iot, metrica.unidade)}
					largura={sem_iot > 0 ? 100 : 0}
					cor="bg-muted-foreground/40"
				/>
				<Barra
					rotulo="Com IoT"
					valor={formatarValor(com_iot, metrica.unidade)}
					largura={largura}
					cor="bg-primary"
				/>
			</div>
		</article>
	);
}

function Barra({
	rotulo,
	valor,
	largura,
	cor,
}: {
	rotulo: string;
	valor: string;
	largura: number;
	cor: string;
}) {
	return (
		<div>
			<div className="flex justify-between text-xs">
				<span className="text-muted-foreground">{rotulo}</span>
				<span className="font-mono font-bold text-foreground">{valor}</span>
			</div>
			<div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
				<div
					className={`h-full rounded-full ${cor}`}
					style={{ width: `${largura}%` }}
				/>
			</div>
		</div>
	);
}

function NaoEncontrada() {
	return (
		<div className="mx-auto mt-16 max-w-xl rounded-3xl border border-dashed border-border px-6 py-16 text-center">
			<SearchX className="mx-auto text-muted-foreground" size={36} />
			<h1 className="mt-6 text-2xl font-black text-foreground">
				Simulação não encontrada.
			</h1>
			<p className="mt-3 text-muted-foreground">
				O link pode estar incorreto ou a simulação não existe mais. Faça uma
				nova simulação pelo chat.
			</p>
			<RotateCcw size={16} /> Refazer simulação
		</div>
	);
}

function formatarReais(valor: number) {
	return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarValor(valor: number, unidade: string) {
	if (unidade.startsWith("R$")) return formatarReais(valor);
	const numero = valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
	if (unidade === "%") return `${numero}%`;
	if (unidade.startsWith("h")) return `${numero} h`;
	return numero;
}

// 404 (ou id que não é UUID) → null, e a página mostra "não encontrada".
const getData = async (id: string): Promise<Simulacao | null> => {
	try {
		const res = await api(`/chat/simulacoes/${encodeURIComponent(id)}/`);
		if (!res.ok) return null;
		return (await res.json()) as Simulacao;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getConfig = async () => ({ render: "dynamic" as const });
