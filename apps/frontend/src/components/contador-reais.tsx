"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const DURACAO_MS = 1200;

function formatarReais(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Sobe de zero até o valor. O servidor já entrega o valor final, então a página continua correta sem JavaScript.
export default function ContadorReais({ valor }: { valor: number }) {
  const [atual, setAtual] = useState(valor);
  const [animando, setAnimando] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAtual(0);
    setAnimando(true);
  }, []);

  useEffect(() => {
    if (!animando) return;
    const inicio = performance.now();
    let quadro = requestAnimationFrame(function passo(agora) {
      const progresso = Math.min((agora - inicio) / DURACAO_MS, 1);
      setAtual(valor * (1 - (1 - progresso) ** 3));
      if (progresso < 1) quadro = requestAnimationFrame(passo);
    });
    return () => cancelAnimationFrame(quadro);
  }, [animando, valor]);

  return (
    <>
      <span aria-hidden="true" className="tabular-nums">
        {formatarReais(atual)}
      </span>
      <span className="sr-only">{formatarReais(valor)}</span>
    </>
  );
}
