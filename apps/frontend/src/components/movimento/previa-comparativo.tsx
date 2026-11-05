import { Inclinacao } from "./efeitos";

const LINHAS = [
  { rotulo: "Energia", com: 80 },
  { rotulo: "Manutenção", com: 75 },
  { rotulo: "Paradas", com: 70 },
  { rotulo: "Desperdício", com: 75 },
];

// Prévia ilustrativa do que a simulação entrega, sem valores de nenhuma empresa.
export default function PreviaComparativo() {
  return (
    <Inclinacao>
      <div className="entrada-flutuante relative rounded-[2rem] border border-border bg-card p-6 text-left shadow-2xl shadow-black/5 [transform-style:preserve-3d] sm:p-8 dark:border-white/10 dark:shadow-black/30">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[.18em] text-muted-foreground uppercase">Prévia do comparativo</p>
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[10px] whitespace-nowrap text-muted-foreground">
            EXEMPLO
          </span>
        </div>
        <p className="mt-2 text-xl font-bold text-card-foreground">O que muda quando você conecta?</p>

        <div className="profundidade-1 mt-7 space-y-5">
          {LINHAS.map(({ rotulo, com }, indice) => (
            <div key={rotulo}>
              <p className="text-xs font-bold text-card-foreground">{rotulo}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted-foreground/25" />
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="previa-barra h-full rounded-full bg-primary"
                  style={{ width: `${com}%`, animationDelay: `${indice * 180}ms` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-muted-foreground/40" /> Sem IoT
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary" /> Com IoT
          </span>
        </div>
      </div>
    </Inclinacao>
  );
}
