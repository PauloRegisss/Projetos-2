"""História 7 – Tirar dúvidas sobre IoT no chat (sem chave de IA, usa a base local)."""


def test_cenario_1_pergunta_sobre_iot(site):
    site.abrir("/")
    site.cenario("História 7 · Cenário 1: perguntar sobre IoT pela sugestão do chat")
    site.abrir_chat()
    site.clicar(texto="O que é IoT?", dentro="[role=dialog]")
    site.esperar_resposta_do_chat("internet das coisas")


def test_cenario_2_pergunta_de_continuacao(site):
    site.abrir("/")
    site.abrir_chat()
    site.cenario("História 7 · Cenário 2: pedir um exemplo continua o assunto anterior")
    site.perguntar_ao_chat("O que é MQTT?")
    site.esperar_resposta_do_chat("broker")
    site.perguntar_ao_chat("Dê um exemplo")
    site.esperar_resposta_do_chat("fabrica/linha1/temperatura")


def test_cenarios_3_e_4_fora_do_tema_sem_ia(site):
    site.abrir("/")
    site.abrir_chat()
    site.cenario("História 7 · Cenários 3 e 4: assunto fora do tema é recusado, mesmo sem IA")
    site.perguntar_ao_chat("Me passa uma receita de bolo")
    site.esperar_resposta_do_chat("só consigo responder a perguntas sobre iot")
    assert "tentar novamente" not in site.texto_do_chat()
