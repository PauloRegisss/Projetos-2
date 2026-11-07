from pathlib import Path

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

import os

from nexus import DEMO, Site

ARTEFATOS = Path(__file__).parent / "artefatos"


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    resultado = yield
    relatorio = resultado.get_result()
    setattr(item, f"relatorio_{relatorio.when}", relatorio)


@pytest.fixture
def site(request):
    opcoes = Options()
    opcoes.add_argument("--window-size=1366,900")
    opcoes.add_argument("--lang=pt-BR")
    opcoes.add_argument("--no-sandbox")
    opcoes.add_argument("--disable-dev-shm-usage")
    if not DEMO:
        # Sem animações os testes ficam mais rápidos e estáveis; o modo demonstração mantém tudo.
        opcoes.add_argument("--force-prefers-reduced-motion")
    if not DEMO or os.environ.get("E2E_HEADLESS") == "1":
        opcoes.add_argument("--headless=new")

    driver = webdriver.Chrome(options=opcoes)
    driver.set_page_load_timeout(45)
    yield Site(driver)

    relatorio = getattr(request.node, "relatorio_call", None)
    if relatorio is not None and relatorio.failed:
        ARTEFATOS.mkdir(exist_ok=True)
        driver.save_screenshot(str(ARTEFATOS / f"{request.node.name}.png"))
    driver.quit()
