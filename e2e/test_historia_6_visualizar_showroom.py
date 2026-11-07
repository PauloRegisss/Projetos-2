"""História 6 – Visualizar o Showroom."""

from nexus import ID_INEXISTENTE


def test_cenarios_1_2_e_4_comparativo_link_proprio_e_contato(site):
    caminho = site.gerar_showroom()

    site.cenario("História 6 · Cenário 1: economia, comparativo, análise e aviso de estimativa")
    for trecho in [
        "economia estimada por mês",
        "economia estimada por ano",
        "gasto com energia",
        "custo de manutenção",
        "horas de parada",
        "desperdício",
        "análise para o seu negócio",
        "estimativas",
    ]:
        site.esperar_texto(trecho)

    site.cenario("História 6 · Cenário 2: o link da simulação continua funcionando ao recarregar")
    site.driver.refresh()
    site.esperar_texto("economia estimada por mês")
    assert site.caminho == caminho

    site.cenario("História 6 · Cenário 4: chamada para falar com a equipe")
    site.clicar(texto="Falar com a NEXUS")
    site.esperar_caminho(lambda atual: atual == "/contato")


def test_cenario_3_simulacao_inexistente(site):
    site.abrir(f"/showroom/{ID_INEXISTENTE}")
    site.cenario("História 6 · Cenário 3: link inexistente mostra aviso e permite refazer")
    site.esperar_texto("simulação não encontrada")
    site.clicar(texto="Refazer simulação")
    site.esperar_caminho(lambda caminho: caminho == "/showroom/new")
    site.esperar_texto("pergunta 1 de 8")
