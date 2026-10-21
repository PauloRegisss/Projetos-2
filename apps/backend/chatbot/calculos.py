REDUCAO_ENERGIA = 0.20
REDUCAO_MANUTENCAO = 0.25
REDUCAO_PARADAS = 0.30
REDUCAO_DESPERDICIO = 0.25

FATOR_MONITORAMENTO = {
    "Manual": 1.0,
    "Parcialmente automatizado": 0.6,
    "Já uso sensores": 0.3,
}

HORAS_POR_MES = 744

METRICAS = [
    {"key": "energia", "label": "Gasto com energia", "unidade": "R$/mês",
     "reducao": REDUCAO_ENERGIA},
    {"key": "manutencao", "label": "Custo de manutenção", "unidade": "R$/mês",
     "reducao": REDUCAO_MANUTENCAO},
    {"key": "paradas", "label": "Horas de parada", "unidade": "h/mês",
     "reducao": REDUCAO_PARADAS},
    {"key": "desperdicio", "label": "Desperdício", "unidade": "%",
     "reducao": REDUCAO_DESPERDICIO},
]


def _com_iot(sem_iot: float, reducao: float, fator: float) -> float:
    return round(sem_iot * (1 - reducao * fator), 2)


def calcular_metricas(respostas: dict) -> dict:
    """Recebe as respostas já validadas e devolve as métricas e a economia.

    Os números são estimativas (por isso `"estimativa": True` na resposta).
    """
    fator = FATOR_MONITORAMENTO[respostas["monitoramento"]]

    metricas = []
    ganho = {}
    for m in METRICAS:
        sem_iot = respostas[m["key"]]
        com_iot = _com_iot(sem_iot, m["reducao"], fator)
        ganho[m["key"]] = sem_iot - com_iot
        metricas.append({
            "key": m["key"],
            "label": m["label"],
            "unidade": m["unidade"],
            "sem_iot": sem_iot,
            "com_iot": com_iot,
        })

    faturamento = respostas["faturamento"]
    economia_mensal = round(
        ganho["energia"]
        + ganho["manutencao"]
        + ganho["paradas"] * (faturamento / HORAS_POR_MES)
        + ganho["desperdicio"] / 100 * faturamento,
        2,
    )

    return {
        "estimativa": True,
        "metricas": metricas,
        "economia_mensal": economia_mensal,
        "economia_anual": round(economia_mensal * 12, 2),
    }