# Perguntas do chatbot, na ordem em que são feitas.
# Perguntas numéricas têm `min` e, quando faz sentido, `max` e `integer`: o frontend usa os
# limites no campo e o backend usa na validação das respostas.
QUESTIONS = [
    {"key": "setor", "text": "Qual o setor da sua empresa?", "type": "text", "max_length": 80},
    {"key": "funcionarios", "text": "Quantos funcionários a empresa tem?", "type": "number",
     "min": 1, "integer": True},
    {"key": "faturamento", "text": "Qual o faturamento mensal aproximado (R$)?", "type": "number", "min": 0},
    {"key": "energia", "text": "Quanto a empresa gasta por mês com energia (R$)?", "type": "number", "min": 0},
    {"key": "manutencao", "text": "Quanto gasta por mês com manutenção (R$)?", "type": "number", "min": 0},
    # Um mês tem no máximo 744 horas (31 dias × 24 h).
    {"key": "paradas", "text": "Quantas horas de parada não planejada ocorrem por mês?", "type": "number",
     "min": 0, "max": 744},
    {"key": "desperdicio", "text": "Qual % de perdas/desperdício você estima hoje?", "type": "number",
     "min": 0, "max": 100},
    {"key": "monitoramento", "text": "Como o monitoramento é feito hoje?", "type": "choice",
     "choices": ["Manual", "Parcialmente automatizado", "Já uso sensores"]},
]
