"use client";

import { BellRing, Gauge, Radio } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Holofote } from "./efeitos";

function Radar() {
  return (
    <div aria-hidden="true" className="relative size-36 sm:size-44">
      {[0, 1, 2].map((anel) => (
        <span
          key={anel}
          style={{ animationDelay: `${anel * 0.9}s` }}
          className="radar absolute inset-0 rounded-full border border-primary/70"
        />
      ))}
      <span className="absolute inset-0 m-auto size-3 rounded-full bg-primary shadow-[0_0_24px_var(--primary)]" />
      <span className="absolute top-[18%] left-[24%] size-2 rounded-full bg-primary/80" />
      <span className="absolute right-[16%] bottom-[30%] size-2 rounded-full bg-secondary" />
      <span className="absolute right-[28%] top-[14%] size-1.5 rounded-full bg-foreground/50" />
    </div>
  );
}

function Equalizador() {
  const barras = [0.45, 0.8, 0.55, 1, 0.7, 0.35, 0.9, 0.6, 0.75, 0.4, 0.95, 0.5];
  return (
    <div aria-hidden="true" className="flex h-36 w-full max-w-64 items-end gap-1.5 sm:h-44">
      {barras.map((altura, indice) => (
        <span
          key={`${altura}-${indice}`}
          style={{ height: `${altura * 100}%`, animationDelay: `${indice * -0.17}s` }}
          className="equalizador flex-1 origin-bottom rounded-t-sm bg-linear-to-t from-secondary to-secondary/30"
        />
      ))}
    </div>
  );
}

function Alerta() {
  return (
    <div aria-hidden="true" className="relative flex h-36 w-full max-w-64 items-center sm:h-44">
      <svg viewBox="0 0 240 90" className="absolute inset-0 m-auto w-full text-accent" fill="none">
        <path
          pathLength={1}
          className="tracar"
          d="M0 60 H52 L66 60 L76 26 L90 76 L102 44 L110 60 H150 L164 18 L176 60 H240"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute top-1 right-1 flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <span className="ponto-vivo absolute inset-3 rounded-full bg-accent" />
        <BellRing size={18} className="relative" />
      </span>
    </div>
  );
}

const ETAPAS = [
  {
    numero: "01",
    titulo: "Identificar",
    texto: "Descubra quais máquinas, ambientes e processos podem ser monitorados.",
    icone: <Radio className="text-primary" size={28} />,
    visual: <Radar />,
  },
  {
    numero: "02",
    titulo: "Visualizar",
    texto: "Veja no showroom como dados podem virar contexto para sua operação.",
    icone: <Gauge className="text-secondary" size={28} />,
    visual: <Equalizador />,
  },
  {
    numero: "03",
    titulo: "Adotar",
    texto: "Leve uma visão mais clara para conversar sobre os próximos passos da sua empresa.",
    icone: <BellRing className="text-accent" size={28} />,
    visual: <Alerta />,
  },
];

function Cartao({
  etapa,
  indice,
  progresso,
  fixado,
}: {
  etapa: (typeof ETAPAS)[number];
  indice: number;
  progresso: MotionValue<number>;
  fixado: boolean;
}) {
  const centro = indice / (ETAPAS.length - 1);
  const opacity = useTransform(progresso, [centro - 0.42, centro - 0.08, centro + 0.08, centro + 0.42], [0.32, 1, 1, 0.32]);
  const scale = useTransform(progresso, [centro - 0.42, centro, centro + 0.42], [0.93, 1, 0.93]);

  return (
    <motion.article
      style={fixado ? { opacity, scale } : {}}
      className="w-full shrink-0 lg:w-[min(44vw,44rem)]"
    >
      <Holofote className="relative grid h-full gap-8 overflow-hidden rounded-[2rem] border border-border bg-card p-7 transition-colors hover:border-primary/40 sm:grid-cols-[1fr_auto] sm:p-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            {etapa.icone}
            <span className="font-mono text-xs tracking-[.2em] text-muted-foreground">{etapa.numero}</span>
          </div>
          <p className="mt-10 text-4xl font-black tracking-[-.05em] text-card-foreground lg:mt-10 lg:text-5xl">
            {etapa.titulo}
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground lg:text-lg">{etapa.texto}</p>
        </div>
        <div className="flex items-center justify-center sm:w-48 lg:w-56">{etapa.visual}</div>
      </Holofote>
    </motion.article>
  );
}

// Em telas grandes a seção fica fixa e os cartões correm na horizontal conforme a rolagem.
export default function Jornada({ cabecalho }: { cabecalho: ReactNode }) {
  const reduzido = useReducedMotion();
  const secao = useRef<HTMLElement>(null);
  const trilha = useRef<HTMLDivElement>(null);
  const [fixado, setFixado] = useState(false);
  const [distancia, setDistancia] = useState(0);
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    const consulta = window.matchMedia("(min-width: 1024px) and (min-height: 620px)");
    const atualizar = () => setFixado(consulta.matches && !reduzido);
    atualizar();
    consulta.addEventListener("change", atualizar);
    return () => consulta.removeEventListener("change", atualizar);
  }, [reduzido]);

  useEffect(() => {
    if (!fixado || !trilha.current) return;
    const medir = () => {
      if (!trilha.current) return;
      setDistancia(Math.max(trilha.current.scrollWidth - window.innerWidth + 80, 0));
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(trilha.current);
    window.addEventListener("resize", medir);
    return () => {
      observador.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [fixado]);

  const { scrollYProgress } = useScroll({ target: secao, offset: ["start start", "end end"] });
  const progresso = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.3 });
  const x = useTransform(progresso, [0.04, 0.96], [0, -distancia]);
  const larguraLinha = useTransform(progresso, [0.04, 0.96], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (valor) => {
    setAtual(Math.min(Math.round(valor * (ETAPAS.length - 1)), ETAPAS.length - 1));
  });

  return (
    <section ref={secao} id="como-funciona" className={fixado ? "relative h-[300vh]" : "relative"}>
      <div className={fixado ? "sticky top-0 flex h-screen flex-col justify-center overflow-clip pt-20" : "py-24"}>
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">{cabecalho}</div>

        <motion.div
          ref={trilha}
          style={fixado ? { x } : {}}
          className={
            fixado
              ? "relative mt-7 flex w-max gap-5 px-10"
              : "relative mx-auto mt-10 flex max-w-7xl flex-col gap-4 px-6"
          }
        >
          {ETAPAS.map((etapa, indice) => (
            <Cartao key={etapa.titulo} etapa={etapa} indice={indice} progresso={progresso} fixado={fixado} />
          ))}
        </motion.div>

        {fixado && (
          <div aria-hidden="true" className="mx-auto mt-7 flex w-full max-w-7xl items-center gap-5 px-10 pr-28">
            <span className="font-mono text-xs tracking-[.2em] text-primary">
              {ETAPAS[atual]?.numero} <span className="text-muted-foreground">/ 03</span>
            </span>
            <div className="relative h-px flex-1 bg-border">
              <motion.div
                style={{ width: larguraLinha }}
                className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_14px_var(--primary)]"
              >
                <span className="absolute top-1/2 right-0 size-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]" />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
