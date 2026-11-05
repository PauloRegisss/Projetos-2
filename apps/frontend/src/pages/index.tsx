import Header from "@/components/header";
import CampoDeSinal from "@/components/movimento/campo-de-sinal";
import ChamadaFinal from "@/components/movimento/chamada-final";
import { Aparecer, BarraDeProgresso, Inclinacao, Letreiro, Magnetico, Parallax, TextoRevelado } from "@/components/movimento/efeitos";
import Jornada from "@/components/movimento/jornada";
import Palavras from "@/components/movimento/palavras";
import { ArrowRight, ArrowUpRight, Check, CircleAlert, Wifi } from "lucide-react";

const comparisons = [
  {
    label: "Visibilidade da operação",
    without: "Fragmentada",
    with: "Em tempo real",
  },
  {
    label: "Resposta a falhas",
    without: "Depois do prejuízo",
    with: "Antes da parada",
  },
  { label: "Decisões", without: "No feeling", with: "Baseadas em dados" },
];

const GRANDEZAS = ["Vibração", "Temperatura", "Energia", "Pressão", "Umidade", "Consumo", "Paradas", "Desperdício"];
const DECISOES = ["Ouvir", "Entender", "Antecipar", "Decidir"];

export default function HomePage() {
  return (
    <>
      <BarraDeProgresso />
      <Header />
      <div className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-180 bg-[radial-gradient(circle_at_70%_20%,rgba(125,81,254,.16),transparent_38%),linear-gradient(rgba(0,0,0,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.035)_1px,transparent_1px)] bg-size-[auto,48px_48px,48px_48px] mask-[linear-gradient(to_bottom,black,transparent)] dark:bg-[radial-gradient(circle_at_70%_20%,rgba(125,81,254,.22),transparent_38%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)]" />
        <div className="absolute inset-0 mask-[linear-gradient(to_bottom,black_78%,transparent)]">
          <CampoDeSinal />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-to-r from-background/85 via-background/45 to-transparent lg:w-2/3" />

        <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-20 pt-36 lg:grid-cols-[.92fr_1.08fr] lg:px-10 lg:pt-40">
          <Parallax velocidade={-90} apagar className="max-w-2xl">
            <p className="entrada mb-6 flex items-center gap-3 font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
              <span className="h-px w-8 bg-primary" />
              IoT para operações mais inteligentes
            </p>

            <h1 className="text-5xl font-black leading-[.94] tracking-[-.07em] text-foreground sm:text-7xl">
              <Palavras texto="Sua máquina está falando." />
              <br />
              <span className="text-primary">
                <Palavras texto="Você está" atraso={280} />
                <span className="relative inline-block">
                  <span className="mascara">
                    <span className="palavra" style={{ animationDelay: "420ms" }}>
                      ouvindo?
                    </span>
                  </span>
                  <span aria-hidden="true" className="onda-escuta entrada" style={{ animationDelay: "1100ms" }}>
                    <svg viewBox="0 0 400 20" preserveAspectRatio="none" fill="none">
                      <path
                        d="M0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10 T 125 10 T 150 10 T 175 10 T 200 10 T 225 10 T 250 10 T 275 10 T 300 10 T 325 10 T 350 10 T 375 10 T 400 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>

            <p style={{ animationDelay: "620ms" }} className="entrada mt-8 max-w-xl text-lg leading-relaxed text-foreground/65 sm:text-xl">
              A NEXUS é um projeto que incentiva empresas a transformar máquinas e sistemas em uma operação que enxerga
              problemas antes que eles parem o negócio.
            </p>

            <div className="entrada mt-9" style={{ animationDelay: "760ms" }}>
              <Magnetico>
                <a
                  href="/showroom"
                  className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-primary px-7 text-sm font-extrabold text-primary-foreground shadow-[0_12px_40px_color-mix(in_oklab,var(--primary)_35%,transparent)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Ver a diferença no showroom{" "}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetico>
            </div>
            <p
              className="entrada mt-7 hidden font-mono text-[10px] tracking-[.16em] text-muted-foreground uppercase [@media(hover:hover)_and_(pointer:fine)]:block"
              style={{ animationDelay: "1300ms" }}
            >
              Mova o cursor: o ruído vira sinal
            </p>
          </Parallax>

          <Parallax velocidade={70}>
            <Inclinacao>
          <div className="entrada-flutuante relative rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-black/5 [transform-style:preserve-3d] sm:p-6 dark:border-white/10 dark:shadow-black/30">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
                  Nexus / Comparativo
                </p>
                <p className="mt-2 text-lg font-bold text-card-foreground">Duas operações. Um futuro.</p>
              </div>

              <span className="flex shrink-0 items-center gap-2 rounded-full border border-primary/30 px-3 py-1 font-mono text-[10px] whitespace-nowrap text-primary">
                <span className="ponto-vivo size-1.5 rounded-full bg-primary" />
                AO VIVO
              </span>
            </div>

            <div className="grid gap-3 [transform-style:preserve-3d] sm:grid-cols-2">
              <div className="profundidade-1 rounded-2xl border border-[#ff5c5c]/25 bg-[#ff5c5c]/5 p-5 dark:bg-[#ff5c5c]/6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#dc4545] dark:text-[#ff8c8c]">
                    Sem IoT
                  </span>
                  <CircleAlert size={18} className="text-[#ff5c5c]" />
                </div>

                <p className="mt-10 text-2xl font-black text-card-foreground">Reagir</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A equipe descobre o problema quando o impacto já chegou.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-black/5 p-3 dark:bg-black/20">
                    <p className="font-mono text-[10px] text-muted-foreground">PARADAS</p>
                    <p className="mt-2 text-xl font-bold text-[#dc4545] dark:text-[#ff8c8c]">+18%</p>
                  </div>
                  <div className="rounded-xl bg-black/5 p-3 dark:bg-black/20">
                    <p className="font-mono text-[10px] text-muted-foreground">VISIBILIDADE</p>
                    <p className="mt-2 text-xl font-bold text-[#dc4545] dark:text-[#ff8c8c]">32%</p>
                  </div>
                </div>
              </div>

              <div className="profundidade-2 rounded-2xl border border-primary/40 bg-primary/8 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary">Com NEXUS + IoT</span>
                  <Wifi size={18} className="text-primary" />
                </div>

                <p className="mt-10 text-2xl font-black text-card-foreground">Antecipar</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A equipe recebe o sinal, entende o contexto e age no tempo certo.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-primary/10 p-3 dark:bg-primary/15">
                    <p className="font-mono text-[10px] text-muted-foreground">EFICIÊNCIA</p>
                    <p className="mt-2 text-xl font-bold text-primary">+28.4%</p>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-3 dark:bg-primary/15">
                    <p className="font-mono text-[10px] text-muted-foreground">VISIBILIDADE</p>
                    <p className="mt-2 text-xl font-bold text-primary">100%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-foreground/2 px-4 py-3 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/3">
              <span className="ponto-vivo h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_#AAFF00]" />
              A diferença é saber antes.
            </div>
          </div>
            </Inclinacao>
          </Parallax>
        </section>
      </div>

      <div className="relative z-10 -my-10 overflow-x-clip py-16 sm:py-20">
        <Letreiro
          itens={DECISOES}
          sentido={-1}
          velocidadeBase={26}
          className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3.6deg] bg-secondary py-3 text-xl font-black tracking-[-.03em] text-secondary-foreground uppercase sm:text-3xl"
        />
        <Letreiro
          itens={GRANDEZAS}
          velocidadeBase={55}
          className="relative mx-[-5%] -rotate-[2.6deg] bg-primary py-4 text-3xl font-black tracking-[-.04em] text-primary-foreground uppercase sm:py-5 sm:text-5xl"
        />
      </div>

      <section id="solucoes" className="border-y border-border bg-card px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
              A diferença na prática
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.06em] text-foreground sm:text-6xl">
              <TextoRevelado
                trechos={[
                  { texto: "IoT não é apenas sobre ter mais tecnologia." },
                  { texto: "É sobre perder menos.", className: "text-secondary", novaLinha: true },
                ]}
              />
            </h2>
          </div>
          <Aparecer className="mt-14 overflow-hidden rounded-3xl border border-border">
            <div className="hidden grid-cols-[1.2fr_1fr_1fr] bg-muted px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:grid">
              <span>O que muda</span>
              <span>Sem IoT</span>
              <span className="text-primary">Com IoT</span>
            </div>
            {comparisons.map((item) => (
              <div
                key={item.label}
                className="grid gap-3 border-t border-border px-6 py-5 transition-colors hover:bg-muted/60 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center"
              >
                <span className="font-bold text-foreground">{item.label}</span>
                <Aparecer as="span" direcao="esquerda" atraso={120} className="flex items-center gap-2 text-sm text-[#ff8c8c]">
                  <CircleAlert size={15} /> {item.without}
                </Aparecer>
                <Aparecer as="span" direcao="direita" atraso={220} className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Check size={15} /> {item.with}
                </Aparecer>
              </div>
            ))}
          </Aparecer>
        </div>
      </section>
      <Jornada
        cabecalho={
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <p className="font-mono text-[.68rem] font-bold leading-none tracking-[.12em] text-primary uppercase">
                Como a NEXUS orienta a conexão
              </p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.06em] text-foreground sm:text-6xl">
                Do sensor à decisão.
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-muted-foreground lg:pb-2">
              A NEXUS é um projeto que mostra o potencial do IoT e ajuda sua empresa a enxergar onde essa tecnologia
              pode gerar mais impacto.
            </p>
          </div>
        }
      />

      <ChamadaFinal>
        <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center gap-10 px-7 py-20 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-primary-foreground/80">
              Pronto para comparar?
            </p>
            <h2 className="mt-5 max-w-3xl text-5xl font-black leading-[.98] tracking-[-.06em] text-primary-foreground sm:text-7xl">
              Veja o impacto antes de imaginar.
            </h2>
          </div>
          <Magnetico forca={0.45} className="shrink-0">
            <a
              href="/showroom"
              className="group inline-flex min-h-16 items-center gap-3 rounded-full bg-[#141414] px-8 text-sm font-extrabold text-white transition hover:bg-[#242424] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414]"
            >
              Entrar no showroom{" "}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Magnetico>
        </div>
      </ChamadaFinal>
      <footer className="border-t border-border px-6 py-8 sm:pr-28 lg:px-10 lg:pr-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-black tracking-[-.05em] text-foreground">
            NEXUS<span className="text-primary">.</span>
          </span>
          <span>Dados que conectam. Decisões que movem.</span>
          <span>© 2026 NEXUS</span>
        </div>
      </footer>
    </>
  );
}

export const getConfig = async () => ({ render: "static" as const });
