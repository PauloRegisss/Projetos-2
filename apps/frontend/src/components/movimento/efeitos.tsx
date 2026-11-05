"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { type CSSProperties, type ElementType, type PointerEvent, type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

const MOLA = { stiffness: 120, damping: 20, mass: 0.4 };

function temCursor() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function BarraDeProgresso() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-linear-to-r from-primary via-primary to-secondary"
    />
  );
}

// Move o conteúdo em velocidade diferente da rolagem e, se pedido, apaga aos poucos.
export function Parallax({
  children,
  velocidade = 100,
  apagar = false,
  className = "",
}: {
  children: ReactNode;
  velocidade?: number;
  apagar?: boolean;
  className?: string;
}) {
  const reduzido = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduzido ? 0 : velocidade]);
  const opacity = useTransform(scrollY, [0, 620], [1, apagar && !reduzido ? 0 : 1]);

  return (
    <motion.div style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// Parallax para conteúdo no meio da página: se desloca enquanto atravessa a tela.
export function ParallaxLocal({
  children,
  distancia = 40,
  className = "",
}: {
  children: ReactNode;
  distancia?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Só liga depois de montar, para o servidor e a primeira renderização do cliente serem iguais.
  const ativo = useRef(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useEffect(() => {
    ativo.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const y = useTransform(scrollYProgress, (p) => (ativo.current ? (0.5 - p) * 2 * distancia : 0));

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Inclina o conteúdo em 3D seguindo o cursor na tela inteira, com um reflexo por cima.
export function Inclinacao({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduzido = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-1, 1], [-9, 9]), MOLA);
  const rotateX = useSpring(useTransform(py, [-1, 1], [7, -7]), MOLA);
  const brilhoX = useTransform(px, [-1, 1], ["10%", "90%"]);
  const brilhoY = useTransform(py, [-1, 1], ["10%", "90%"]);
  const brilho = useTransform(
    [brilhoX, brilhoY] as MotionValue<string>[],
    ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)`,
  );

  useEffect(() => {
    if (reduzido || !temCursor()) return;
    const mover = (evento: globalThis.PointerEvent) => {
      px.set((evento.clientX / window.innerWidth) * 2 - 1);
      py.set((evento.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, [px, py, reduzido]);

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
        {children}
        <motion.div
          aria-hidden="true"
          style={{ background: brilho }}
          className="pointer-events-none absolute inset-0 rounded-[2rem]"
        />
      </motion.div>
    </div>
  );
}

// Puxa o conteúdo em direção ao cursor quando ele passa por perto.
export function Magnetico({ children, className = "", forca = 0.35 }: { children: ReactNode; className?: string; forca?: number }) {
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.3 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.3 });
  const reduzido = useReducedMotion();

  const mover = (evento: PointerEvent<HTMLSpanElement>) => {
    if (reduzido || evento.pointerType !== "mouse") return;
    const caixa = evento.currentTarget.getBoundingClientRect();
    x.set((evento.clientX - caixa.left - caixa.width / 2) * forca);
    y.set((evento.clientY - caixa.top - caixa.height / 2) * forca);
  };
  const soltar = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span style={{ x, y }} onPointerMove={mover} onPointerLeave={soltar} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  );
}

function PalavraRevelada({
  texto,
  progresso,
  inicio,
  fim,
  className,
}: {
  texto: string;
  progresso: MotionValue<number>;
  inicio: number;
  fim: number;
  className?: string;
}) {
  const opacity = useTransform(progresso, [inicio, fim], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {texto}{" "}
    </motion.span>
  );
}

type TrechoTexto = { texto: string; className?: string; novaLinha?: boolean };

// O título acende palavra por palavra conforme a rolagem. Antes de hidratar, aparece inteiro.
export function TextoRevelado({ trechos }: { trechos: TrechoTexto[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduzido = useReducedMotion();
  const [montado, setMontado] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 50%"] });

  useEffect(() => setMontado(true), []);

  const total = trechos.reduce((soma, trecho) => soma + trecho.texto.split(" ").length, 0);
  let indice = 0;

  return (
    <span ref={ref}>
      {trechos.map((trecho) => (
        <span key={trecho.texto} className={trecho.className}>
          {trecho.novaLinha && <br />}
          {montado && !reduzido
            ? trecho.texto.split(" ").map((palavra) => {
                const atual = indice++;
                return (
                  <PalavraRevelada
                    key={`${palavra}-${atual}`}
                    texto={palavra}
                    progresso={scrollYProgress}
                    inicio={atual / total}
                    fim={(atual + 1) / total}
                  />
                );
              })
            : `${trecho.texto} `}
        </span>
      ))}
    </span>
  );
}

const DESLOCAMENTOS = {
  baixo: "translate3d(0, 2.5rem, 0)",
  esquerda: "translate3d(-3.5rem, 0, 0)",
  direita: "translate3d(3.5rem, 0, 0)",
};

// Entra na tela quando fica visível. O servidor entrega o conteúdo visível, então nada some sem JavaScript.
export function Aparecer({
  children,
  direcao = "baixo",
  atraso = 0,
  className = "",
  style,
  as: Elemento = "div",
}: {
  children: ReactNode;
  direcao?: keyof typeof DESLOCAMENTOS;
  atraso?: number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const elemento = ref.current;
    if (!elemento || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (elemento.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    elemento.style.opacity = "0";
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0]?.isIntersecting) return;
        observador.disconnect();
        elemento.style.opacity = "";
        elemento.animate(
          [
            { opacity: 0, transform: DESLOCAMENTOS[direcao] },
            { opacity: 1, transform: "none" },
          ],
          { duration: 850, delay: atraso, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [atraso, direcao]);

  return (
    <Elemento ref={ref} className={className} style={style}>
      {children}
    </Elemento>
  );
}

// Faixa contínua que acelera e inverte de direção com a velocidade da rolagem.
export function Letreiro({
  itens,
  sentido = 1,
  velocidadeBase = 40,
  className = "",
}: {
  itens: string[];
  sentido?: 1 | -1;
  velocidadeBase?: number;
  className?: string;
}) {
  const reduzido = useReducedMotion();
  const { scrollY } = useScroll();
  const velocidade = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const fator = useTransform(velocidade, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const inclinacao = useTransform(velocidade, [-2500, 2500], [-5, 5]);
  const base = useMotionValue(0);
  const direcao = useRef(sentido);
  const x = useTransform(base, (valor) => `${((((valor % 25) + 25) % 25) - 25).toFixed(3)}%`);

  useAnimationFrame((_, delta) => {
    if (reduzido) return;
    const extra = fator.get();
    if (extra < -0.1) direcao.current = (sentido * -1) as 1 | -1;
    else if (extra > 0.1) direcao.current = sentido;
    const pixels = direcao.current * velocidadeBase * (delta / 1000) * (1 + Math.abs(extra));
    base.set(base.get() + (pixels * 25) / 1600);
  });

  const conteudo = itens.map((item) => (
    <span key={item} className="flex items-center gap-8 pr-8">
      {item}
      <span className="size-3 rounded-full bg-current opacity-60" />
    </span>
  ));

  return (
    <div aria-hidden="true" className={`overflow-clip ${className}`}>
      <motion.div style={{ x, skewX: reduzido ? 0 : inclinacao }} className="flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((copia) => (
          <div key={copia} className="flex">
            {conteudo}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Faz um brilho acompanhar o cursor dentro do elemento (usa as variáveis de .holofote).
export function Holofote({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mover = (evento: PointerEvent<HTMLDivElement>) => {
    const caixa = evento.currentTarget.getBoundingClientRect();
    evento.currentTarget.style.setProperty("--holofote-x", `${evento.clientX - caixa.left}px`);
    evento.currentTarget.style.setProperty("--holofote-y", `${evento.clientY - caixa.top}px`);
  };
  return (
    <div onPointerMove={mover} className={`holofote ${className}`}>
      {children}
    </div>
  );
}
