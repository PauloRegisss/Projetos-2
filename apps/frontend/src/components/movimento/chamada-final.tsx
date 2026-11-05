"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

function misturar(de: number, para: number, progresso: number) {
  return de + (para - de) * progresso;
}

// O bloco colorido cresce até ocupar a tela, com a marca gigante correndo ao fundo.
export default function ChamadaFinal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  // Só liga depois de montar, para o servidor e a primeira renderização do cliente serem iguais.
  const ativo = useRef(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  useEffect(() => {
    ativo.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const scale = useTransform(scrollYProgress, (p) => (ativo.current ? misturar(0.84, 1, p) : 1));
  const borderRadius = useTransform(scrollYProgress, (p) => (ativo.current ? misturar(72, 32, p) : 32));
  const marcaX = useTransform(scrollYProgress, (p) => (ativo.current ? `${misturar(-22, 6, p)}%` : "-4%"));
  const conteudoY = useTransform(scrollYProgress, (p) => (ativo.current ? misturar(70, 0, p) : 0));

  return (
    <section ref={ref} id="relatos" className="mx-3 mb-6 overflow-clip lg:mx-6">
      <motion.div style={{ scale, borderRadius }} className="relative origin-bottom overflow-hidden bg-primary">
        <motion.p
          aria-hidden="true"
          style={{ x: marcaX }}
          className="pointer-events-none absolute -bottom-[3vw] left-0 text-[24vw] leading-[.8] font-black tracking-[-.08em] whitespace-nowrap text-primary-foreground/8"
        >
          NEXUS NEXUS
        </motion.p>
        <motion.div style={{ y: conteudoY }} className="relative">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
