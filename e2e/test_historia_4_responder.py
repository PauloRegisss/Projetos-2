"""História 4 – Responder às perguntas (cenários em historias.md)."""


def test_cenario_1_resposta_valida_avanca(site):
    site.iniciar_simulacao()
    site.cenario("História 4 · Cenário 1: resposta válida avança para a próxima pergunta")
    site.responder("Indústria")
    site.esperar_texto("pergunta 2 de 8")
    site.esperar_texto("indústria")


def test_cenarios_2_3_4_respostas_invalidas_nao_avancam(site):
    site.iniciar_simulacao()
    site.responder("Indústria")

    site.cenario("História 4 · Cenário 4: funcionários precisa ser um número inteiro")
    site.responder("2,5")
    assert site.erro_da_pergunta() == "Informe um número inteiro."
    assert site.pergunta_atual() == 2

    site.cenario("História 4 · Cenário 3: resposta vazia não é aceita")
    site.responder("")
    assert site.erro_da_pergunta() == "Este campo é obrigatório."
    assert site.pergunta_atual() == 2

    for valor in ["120", "850000", "42000", "15000", "30"]:
        site.responder(valor)
    site.cenario("História 4 · Cenário 2: desperdício acima de 100% é recusado")
    site.responder("150")
    assert site.erro_da_pergunta() == "O valor máximo é 100."
    assert site.pergunta_atual() == 7


def test_cenario_5_voltar_e_recomecar(site):
    site.iniciar_simulacao()
    for valor in ["Indústria", "120", "850000"]:
        site.responder(valor)
    assert site.pergunta_atual() == 4

    site.cenario("História 4 · Cenário 5: voltar para a pergunta anterior")
    site.clicar(texto="Voltar", dentro="footer")
    assert site.pergunta_atual() == 3
    assert site.elemento("#showroom-answer").get_attribute("value") == "850000"

    site.cenario("História 4 · Cenário 5: recomeçar apaga as respostas")
    site.clicar(texto="Recomeçar", dentro="footer")
    site.clicar(texto="Recomeçar", dentro="[role=dialog]")
    site.esperar_texto("pergunta 1 de 8")
