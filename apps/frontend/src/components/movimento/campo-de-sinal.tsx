"use client";

import { useEffect, useRef } from "react";

const DURACAO_VARREDURA = 2.6;
const FIM_VARREDURA = 4.4;

function suavizar(valor: number) {
  const limitado = Math.min(Math.max(valor, 0), 1);
  return limitado * limitado * (3 - 2 * limitado);
}

// Linhas de ruído que viram um sinal limpo perto do cursor, ao carregar a página e conforme a rolagem.
export default function CampoDeSinal({
  className = "",
  coerencia = 0,
  intensidade = 1,
}: {
  className?: string;
  /** Quanto do campo já é sinal limpo, de 0 a 1. Pode mudar a qualquer momento. */
  coerencia?: number;
  /** Força das linhas, de 0 a 1. */
  intensidade?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coerenciaAlvo = useRef(coerencia);
  const redesenhar = useRef<(() => void) | null>(null);

  useEffect(() => {
    coerenciaAlvo.current = coerencia;
    redesenhar.current?.();
  }, [coerencia]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const temCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let largura = 0;
    let altura = 0;
    let topoPagina = 0;
    let cores = { sinal: "#aaff00", ruido: "#888888" };
    const alvo = { x: -9999, y: -9999 };
    const foco = { x: -9999, y: -9999 };
    let quadro = 0;
    let visivel = true;
    let ultimoInstante = performance.now();
    let tempo = 0;
    let contador = 0;
    let coerenciaBase = coerenciaAlvo.current;

    const lerCores = () => {
      const estilo = getComputedStyle(canvas);
      cores = {
        sinal: estilo.getPropertyValue("--primary").trim() || cores.sinal,
        ruido: estilo.getPropertyValue("--foreground").trim() || cores.ruido,
      };
    };

    const redimensionar = () => {
      const caixa = canvas.getBoundingClientRect();
      const densidade = Math.min(window.devicePixelRatio || 1, 2);
      largura = caixa.width;
      altura = caixa.height;
      topoPagina = caixa.top + window.scrollY;
      canvas.width = Math.round(largura * densidade);
      canvas.height = Math.round(altura * densidade);
      ctx.setTransform(densidade, 0, 0, densidade, 0, 0);
      if (reduzido) desenhar();
    };

    const coerenciaDoCursor = (x: number, y: number) => {
      const dx = x - foco.x;
      const dy = y - foco.y;
      return Math.exp(-(dx * dx) / 98000 - (dy * dy) / 42000);
    };

    const coerenciaDaVarredura = (x: number) => {
      if (tempo >= FIM_VARREDURA) return 0;
      const frente = suavizar(tempo / DURACAO_VARREDURA) * (largura + 500) - 250;
      const passou = suavizar((frente - x) / 240 + 0.5);
      return passou * (1 - suavizar((tempo - DURACAO_VARREDURA) / (FIM_VARREDURA - DURACAO_VARREDURA)));
    };

    function desenhar() {
      ctx!.clearRect(0, 0, largura, altura);
      const rolagem = window.scrollY;
      if (reduzido) coerenciaBase = coerenciaAlvo.current;
      const coerenciaRolagem = Math.max(
        coerenciaBase,
        reduzido ? 0.65 : suavizar(rolagem / Math.max(altura * 0.75, 1)),
      );
      const totalLinhas = Math.min(Math.max(Math.round(altura / 44), 8), 18);
      const passo = largura < 700 ? 11 : 7;

      for (let linha = 0; linha < totalLinhas; linha++) {
        const camada = (linha % 3) + 1;
        const profundidade = camada / 3;
        const base = (altura * (linha + 1)) / (totalLinhas + 1) + rolagem * profundidade * 0.22;
        const deslocamento = temCursor && foco.x > -999 ? (foco.x - largura / 2) * profundidade * -0.018 : 0;
        const amplitude = 14 + camada * 11;
        const atenuacao = (largura < 700 ? 0.5 : 1) * intensidade;
        const fase = linha * 0.62;

        let baldeAtual = -1;
        let xAnterior = 0;
        let yAnterior = 0;

        for (let x = -passo; x <= largura + passo; x += passo) {
          const coerencia = Math.max(coerenciaRolagem, coerenciaDoCursor(x, base), coerenciaDaVarredura(x));
          const limpo = Math.sin(x * 0.0075 + tempo * 0.9 + fase) * amplitude;
          const ruido =
            (Math.sin(x * 0.11 + tempo * 3.4 + linha * 7) +
              Math.sin(x * 0.29 - tempo * 5.1 + linha * 3) * 0.8 +
              Math.sin(x * 0.53 + tempo * 7.3 + linha * 11) * 0.6) *
            (3.2 + camada * 1.6);
          const y = base + limpo * coerencia + ruido * (1 - coerencia);
          const xFinal = x + deslocamento;
          const balde = Math.round(coerencia * 5);

          if (balde !== baldeAtual) {
            if (baldeAtual >= 0) ctx!.stroke();
            baldeAtual = balde;
            ctx!.beginPath();
            ctx!.moveTo(xAnterior, yAnterior);
            ctx!.strokeStyle = balde >= 2 ? cores.sinal : cores.ruido;
            ctx!.globalAlpha =
              (balde >= 2 ? 0.14 + (balde / 5) * 0.72 : 0.06 + balde * 0.03) * (0.55 + profundidade * 0.45) * atenuacao;
            ctx!.lineWidth = 0.8 + (balde / 5) * 0.9;
          }
          ctx!.lineTo(xFinal, y);
          xAnterior = xFinal;
          yAnterior = y;

          // Pacotes de dados só existem onde o sinal já está limpo.
          const pacote = ((tempo * (55 + camada * 28) + linha * 173) % (largura + 180)) - 90;
          if (Math.abs(x - pacote) < passo / 2 && coerencia > 0.45) {
            ctx!.stroke();
            ctx!.beginPath();
            ctx!.fillStyle = cores.sinal;
            ctx!.globalAlpha = coerencia * 0.22 * atenuacao;
            ctx!.arc(xFinal, y, 8, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.beginPath();
            ctx!.globalAlpha = coerencia * atenuacao;
            ctx!.arc(xFinal, y, 2.4, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.beginPath();
            ctx!.moveTo(xFinal, y);
            ctx!.globalAlpha = (0.14 + (balde / 5) * 0.72) * atenuacao;
          }
        }
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
    }

    const animar = (agora: number) => {
      quadro = requestAnimationFrame(animar);
      if (!visivel) {
        ultimoInstante = agora;
        return;
      }
      tempo += Math.min((agora - ultimoInstante) / 1000, 0.1);
      ultimoInstante = agora;
      if (++contador % 60 === 0) lerCores();
      coerenciaBase += (coerenciaAlvo.current - coerenciaBase) * 0.035;

      if (temCursor) {
        if (foco.x < -999 && alvo.x > -999) {
          foco.x = alvo.x;
          foco.y = alvo.y;
        }
        foco.x += (alvo.x - foco.x) * 0.09;
        foco.y += (alvo.y - foco.y) * 0.09;
      } else {
        // Sem cursor, o foco passeia sozinho pela tela.
        foco.x = largura * (0.5 + Math.sin(tempo * 0.42) * 0.45);
        foco.y = altura * (0.45 + Math.cos(tempo * 0.31) * 0.3);
      }
      desenhar();
    };

    const moverCursor = (evento: PointerEvent) => {
      alvo.x = evento.clientX;
      alvo.y = evento.pageY - topoPagina;
    };

    lerCores();
    redimensionar();
    const observadorTamanho = new ResizeObserver(redimensionar);
    observadorTamanho.observe(canvas);

    if (reduzido) {
      redesenhar.current = desenhar;
      return () => {
        redesenhar.current = null;
        observadorTamanho.disconnect();
      };
    }

    const observadorVisao = new IntersectionObserver((entradas) => {
      visivel = entradas[0]?.isIntersecting ?? true;
    });
    observadorVisao.observe(canvas);
    window.addEventListener("pointermove", moverCursor, { passive: true });
    quadro = requestAnimationFrame(animar);

    return () => {
      cancelAnimationFrame(quadro);
      observadorTamanho.disconnect();
      observadorVisao.disconnect();
      window.removeEventListener("pointermove", moverCursor);
    };
  }, [intensidade]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none size-full ${className}`} />;
}
