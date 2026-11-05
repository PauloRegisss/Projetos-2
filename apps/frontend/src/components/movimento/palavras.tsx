// Título que sobe palavra por palavra. A animação é só CSS, então funciona antes de hidratar.
export default function Palavras({ texto, atraso = 0 }: { texto: string; atraso?: number }) {
  return texto.split(" ").map((palavra, indice) => (
    <span key={`${palavra}-${indice}`}>
      <span className="mascara">
        <span className="palavra" style={{ animationDelay: `${atraso + indice * 70}ms` }}>
          {palavra}
        </span>
      </span>{" "}
    </span>
  ));
}
