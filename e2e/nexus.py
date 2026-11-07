"""Ações de alto nível sobre o site, usadas pelos testes de cada história."""

import os
import re
import time

from selenium.common.exceptions import (
    ElementClickInterceptedException,
    StaleElementReferenceException,
    TimeoutException,
)
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = os.environ.get("E2E_BASE_URL", "http://localhost:3100").rstrip("/")
DEMO = os.environ.get("E2E_DEMO") == "1"
PAUSA = float(os.environ.get("E2E_PAUSA", "1.4" if DEMO else "0"))
ESPERA = 20

ID_INEXISTENTE = "00000000-0000-4000-8000-000000000000"
URL_SIMULACAO = re.compile(r"/showroom/[0-9a-f-]{36}$")

RESPOSTAS_VALIDAS = ["Indústria", "120", "850000", "42000", "15000", "30", "8"]

_LEGENDA_JS = """
let legenda = document.getElementById('e2e-legenda');
if (!legenda) {
  legenda = document.createElement('div');
  legenda.id = 'e2e-legenda';
  Object.assign(legenda.style, {
    position: 'fixed', top: '12px', left: '50%', transform: 'translateX(-50%)',
    zIndex: 2147483647, background: '#141414', color: '#aaff00',
    font: '600 15px/1.4 system-ui, sans-serif', padding: '10px 20px',
    borderRadius: '999px', border: '1px solid #aaff00', pointerEvents: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,.45)', maxWidth: '90vw', textAlign: 'center',
  });
  document.body.appendChild(legenda);
}
legenda.textContent = arguments[0];
"""


class Site:
    def __init__(self, driver):
        self.driver = driver
        self.legenda = ""

    # ----- navegação e leitura -------------------------------------------------
    def abrir(self, caminho="/"):
        try:
            self.driver.get(f"{BASE_URL}{caminho}")
        except TimeoutException:
            # Algum recurso demorou demais; o conteúdo já está na tela, então seguimos.
            self.driver.execute_script("window.stop()")
        self.esperar(lambda d: d.execute_script("return document.readyState") == "complete")
        self._mostrar_legenda()
        return self

    @property
    def caminho(self):
        return self.driver.execute_script("return location.pathname")

    def texto(self):
        """Texto visível da página, em minúsculas (alguns rótulos usam CSS em caixa alta)."""
        return self.driver.execute_script("return document.body.innerText").lower()

    def esperar(self, condicao, mensagem="", tempo=ESPERA):
        return WebDriverWait(self.driver, tempo, poll_frequency=0.2).until(condicao, mensagem)

    def esperar_texto(self, trecho, tempo=ESPERA):
        trecho = trecho.lower()
        try:
            self.esperar(lambda _: trecho in self.texto(), tempo=tempo)
        except TimeoutException as erro:
            raise AssertionError(f'O texto "{trecho}" não apareceu na página.') from erro

    def esperar_caminho(self, condicao, tempo=ESPERA):
        try:
            self.esperar(lambda _: condicao(self.caminho), tempo=tempo)
        except TimeoutException as erro:
            raise AssertionError(f"A página não chegou ao endereço esperado (está em {self.caminho}).") from erro
        self._mostrar_legenda()

    def elemento(self, seletor):
        return self.esperar(lambda d: d.find_element(By.CSS_SELECTOR, seletor))

    def existe(self, seletor):
        return bool(self.driver.find_elements(By.CSS_SELECTOR, seletor))

    # ----- interação -----------------------------------------------------------
    def clicar(self, seletor=None, texto=None, dentro="body"):
        """Clica num elemento por seletor ou pelo texto exato. Tenta de novo enquanto a página hidrata."""

        def tentar(_):
            try:
                alvo = self._achar(seletor, texto, dentro)
                if alvo is None:
                    return False
                self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'})", alvo)
                alvo.click()
                return True
            except (ElementClickInterceptedException, StaleElementReferenceException):
                return False

        try:
            self.esperar(tentar)
        except TimeoutException as erro:
            raise AssertionError(f"Não foi possível clicar em {texto or seletor}.") from erro
        self.pausar()

    def clicar_ate(self, seletor, condicao, texto=None):
        """Clica até a condição ficar verdadeira (o primeiro clique pode chegar antes da hidratação)."""

        def tentar(_):
            alvo = self._achar(seletor, texto, "body")
            if alvo is not None:
                try:
                    alvo.click()
                except (ElementClickInterceptedException, StaleElementReferenceException):
                    return False
            time.sleep(0.4)
            return condicao()

        self.esperar(tentar)
        self.pausar()

    def digitar(self, seletor, valor, enviar=True):
        campo = self.elemento(seletor)
        campo.send_keys(Keys.COMMAND if self._mac() else Keys.CONTROL, "a")
        campo.send_keys(Keys.BACKSPACE)
        if DEMO:
            for letra in valor:
                campo.send_keys(letra)
                time.sleep(0.05)
        else:
            campo.send_keys(valor)
        if enviar:
            campo.send_keys(Keys.ENTER)
        time.sleep(0.25)
        self.pausar(0.5)

    def tecla_esc(self):
        self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
        time.sleep(0.4)

    # ----- simulação (/showroom/new) -------------------------------------------
    def pergunta_atual(self):
        achado = re.search(r"pergunta (\d+) de (\d+)", self.texto())
        return int(achado.group(1)) if achado else None

    def responder(self, valor):
        self.digitar("#showroom-answer", valor)

    def erro_da_pergunta(self):
        alertas = self.driver.find_elements(By.CSS_SELECTOR, "footer [role=alert]")
        return alertas[0].text if alertas else ""

    def iniciar_simulacao(self):
        self.abrir("/showroom/new")
        self.esperar_texto("pergunta 1 de 8")

    def preencher_simulacao(self, monitoramento="Manual"):
        self.iniciar_simulacao()
        for valor in RESPOSTAS_VALIDAS:
            self.responder(valor)
        self.clicar(texto=monitoramento)
        self.esperar_texto("gerar meu showroom")

    def gerar_showroom(self, monitoramento="Manual"):
        self.preencher_simulacao(monitoramento)
        self.clicar(texto="Gerar meu Showroom")
        self.esperar_caminho(lambda caminho: bool(URL_SIMULACAO.search(caminho)), tempo=40)
        self.esperar_texto("economia estimada por mês")
        return self.caminho

    def economia_mensal(self):
        """Valor final da economia mensal (lê o texto acessível, que não muda durante a animação)."""
        texto = self.driver.execute_script("return document.querySelector('.tabular-nums + .sr-only').textContent")
        return float(re.sub(r"[^\d,]", "", texto).replace(",", "."))

    # ----- chat flutuante ------------------------------------------------------
    def abrir_chat(self):
        self.clicar_ate('button[aria-label="Abrir assistente NEXUS"]', lambda: self.existe("[role=dialog]"))

    def perguntar_ao_chat(self, pergunta):
        self.digitar("#duvida-message", pergunta)

    def texto_do_chat(self):
        return self.driver.execute_script(
            "return document.querySelector('[role=dialog]')?.innerText ?? ''"
        ).lower()

    def esperar_resposta_do_chat(self, trecho):
        trecho = trecho.lower()
        try:
            self.esperar(lambda _: trecho in self.texto_do_chat())
        except TimeoutException as erro:
            raise AssertionError(f'O chat não respondeu com "{trecho}".') from erro
        self.pausar()

    # ----- modo demonstração ---------------------------------------------------
    def cenario(self, titulo):
        """No modo demonstração, mostra o cenário na tela e dá tempo de narrar."""
        self.legenda = titulo
        self._mostrar_legenda()
        self.pausar(1.6)

    def pausar(self, fator=1.0):
        if PAUSA:
            time.sleep(PAUSA * fator)

    def _mostrar_legenda(self):
        if DEMO and self.legenda:
            self.driver.execute_script(_LEGENDA_JS, self.legenda)

    # ----- auxiliares ----------------------------------------------------------
    def _achar(self, seletor, texto, dentro):
        if seletor:
            achados = self.driver.find_elements(By.CSS_SELECTOR, seletor)
            return achados[0] if achados else None
        # Usa o texto do DOM: um elemento ainda transparente (esperando entrar na tela) também conta.
        return self.driver.execute_script(
            """
            const [dentro, texto] = arguments;
            const alvo = texto.trim().toLowerCase();
            const candidatos = [...document.querySelectorAll(`${dentro} button, ${dentro} a`)].filter(
              (el) => el.textContent.trim().replace(/\\s+/g, " ").replace(/[›]$/, "").trim().toLowerCase() === alvo,
            );
            return candidatos.find((el) => el.getClientRects().length) ?? candidatos[0] ?? null;
            """,
            dentro,
            texto,
        )

    def _mac(self):
        return self.driver.capabilities.get("platformName", "").lower() in ("mac", "macos", "darwin")
