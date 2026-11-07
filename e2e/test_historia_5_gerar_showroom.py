"""História 5 – Gerar o Showroom a partir das respostas."""


def test_cenario_1_gera_e_abre_o_showroom(site):
    site.preencher_simulacao()
    site.cenario("História 5 · Cenário 1: gerar o Showroom com respostas válidas")
    site.clicar(texto="Gerar meu Showroom")
    site.esperar_caminho(lambda caminho: caminho.startswith("/showroom/") and caminho != "/showroom/new", tempo=40)
    site.esperar_texto("economia estimada por mês")


def test_cenarios_2_e_4_ganho_menor_com_sensores_e_analise_sem_ia(site):
    site.cenario("História 5 · Cenário 2: monitoramento manual tem ganho maior que com sensores")
    site.gerar_showroom("Manual")
    manual = site.economia_mensal()
    site.cenario("História 5 · Cenário 4: sem IA configurada, a análise padrão aparece")
    site.esperar_texto("com monitoramento iot, a estimativa é de uma economia")

    site.gerar_showroom("Já uso sensores")
    com_sensores = site.economia_mensal()
    assert manual > com_sensores > 0
