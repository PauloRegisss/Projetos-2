"use client";

import { useLayoutEffect, useRef } from "react";

// Cresce quando entra na tela. O servidor já entrega a largura final, então nada se perde sem JavaScript.
export default function BarraAnimada({ largura, atraso = 0, className = "" }: { largura: number; atraso?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const barra = ref.current;
    if (!barra || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    barra.style.width = "0";
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0]?.isIntersecting) return;
        observador.disconnect();
        barra.style.width = `${largura}%`;
        barra.animate([{ width: "0" }, { width: `${largura}%` }], {
          duration: 1200,
          delay: atraso,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    observador.observe(barra);
    return () => observador.disconnect();
  }, [largura, atraso]);

  return <div ref={ref} className={`h-full rounded-full ${className}`} style={{ width: `${largura}%` }} />;
}
