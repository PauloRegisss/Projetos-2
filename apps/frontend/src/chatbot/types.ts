// Formatos devolvidos pelo app `chatbot` do Django.

export type Pergunta = {
	key: string;
	text: string;
	type: "text" | "number" | "choice";
	min?: number;
	max?: number;
	integer?: boolean;
	max_length?: number;
	choices?: string[];
	placeholder?: string;
};

export type Resposta = string | number;
export type Respostas = Record<string, Resposta>;

export type Metrica = {
	key: string;
	label: string;
	unidade: string;
	sem_iot: number;
	com_iot: number;
};

export type Simulacao = {
	id: string;
	respostas: Respostas;
	estimativa: boolean;
	metricas: Metrica[];
	economia_mensal: number;
	economia_anual: number;
	analise: string;
	criado_em: string;
};
