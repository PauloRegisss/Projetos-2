"""Histórias da entrega 3, mantidas como teste de regressão."""


def test_historia_1_alterna_e_lembra_o_tema(site):
    site.abrir("/")
    site.cenario("História 1 · Alternar o tema e manter a escolha")
    inicial = site.driver.execute_script("return document.documentElement.classList.contains('dark')")

    site.clicar_ate(
        'button[aria-label^="Ativar tema"]',
        lambda: site.driver.execute_script("return document.documentElement.classList.contains('dark')") != inicial,
    )
    site.driver.refresh()
    site.esperar(lambda d: d.execute_script("return document.readyState") == "complete")
    depois = site.driver.execute_script("return document.documentElement.classList.contains('dark')")
    assert depois != inicial, "o tema escolhido deve continuar depois de recarregar a página"


def test_historia_2_abre_e_fecha_o_chat(site):
    site.abrir("/")
    site.cenario("História 2 · Abrir o chat pelo botão flutuante e fechar com Esc")
    site.abrir_chat()
    site.esperar_texto("olá, eu sou a nexus")
    site.tecla_esc()
    assert not site.existe("[role=dialog]"), "o chat deve fechar com a tecla Esc"


def test_historia_3_mostra_a_primeira_pergunta(site):
    site.abrir("/showroom")
    site.cenario("História 3 · Começar a simulação e receber a primeira pergunta")
    site.clicar(texto="Começar simulação")
    site.esperar_caminho(lambda caminho: caminho == "/showroom/new")
    site.esperar_texto("pergunta 1 de 8")
    site.esperar_texto("qual o setor da sua empresa?")
