import json
import os
from types import SimpleNamespace
from unittest import mock

from django.core.cache import cache
from django.test import Client, SimpleTestCase, TestCase
from django.urls import reverse

from . import analise
from .calculos import FATOR_MONITORAMENTO, HORAS_POR_MES, calcular_metricas
from .questions import QUESTIONS
from .views import SIMULATION_RATE_LIMIT

VALID_RESPOSTAS = {
    "setor": "Indústria",
    "funcionarios": 120,
    "faturamento": 850000,
    "energia": 42000.5,
    "manutencao": 15000,
    "paradas": 30,
    "desperdicio": 8,
    "monitoramento": "Manual",
}


class PerguntasViewTests(TestCase):
    def test_retorna_todas_as_perguntas_em_ordem(self):
        response = self.client.get(reverse("chatbot:perguntas"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["perguntas"], QUESTIONS)

    def test_perguntas_numericas_tem_minimo(self):
        numericas = [q for q in QUESTIONS if q["type"] == "number"]

        self.assertTrue(numericas)
        for question in numericas:
            self.assertIn("min", question, question["key"])
            if "max" in question:
                self.assertLess(question["min"], question["max"], question["key"])

    def test_post_retorna_405(self):
        response = self.client.post(reverse("chatbot:perguntas"))

        self.assertEqual(response.status_code, 405)

    def test_tela_html_antiga_nao_existe(self):
        response = self.client.get("/chat/")

        self.assertEqual(response.status_code, 404)


class SimularViewTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = Client(enforce_csrf_checks=True)
        patcher = mock.patch.dict(os.environ)
        patcher.start()
        self.addCleanup(patcher.stop)
        os.environ.pop("ANTHROPIC_API_KEY", None)

    def csrf_token(self) -> str:
        return self.client.get("/auth/csrf/").json()["csrfToken"]

    def post(self, body: str, ip: str = "10.0.0.1"):
        return self.client.post(
            reverse("chatbot:simular"),
            body,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=self.csrf_token(),
            HTTP_X_FORWARDED_FOR=ip,
        )

    def post_respostas(self, **overrides):
        return self.post(json.dumps({**VALID_RESPOSTAS, **overrides}))

    def assertErroNoCampo(self, response, campo: str):
        self.assertEqual(response.status_code, 400)
        self.assertIn(campo, response.json()["fields"])

    def test_respostas_validas_retornam_200(self):
        response = self.post_respostas(setor="  Indústria  ", extra="ignorado")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["respostas"], {**VALID_RESPOSTAS, "setor": "Indústria"}
        )

    def test_resposta_traz_metricas_estimativa_e_analise(self):
        data = self.post_respostas().json()

        self.assertTrue(data["estimativa"])
        self.assertIn("metricas", data)
        self.assertTrue(data["analise"])

    def test_json_invalido_retorna_400(self):
        response = self.post("abc")

        self.assertEqual(response.status_code, 400)

    def test_json_que_nao_e_objeto_retorna_400(self):
        response = self.post(json.dumps([]))

        self.assertEqual(response.status_code, 400)

    def test_objeto_vazio_lista_todos_os_campos(self):
        response = self.post(json.dumps({}))

        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            set(response.json()["fields"]), {q["key"] for q in QUESTIONS}
        )

    def test_texto_vazio_ou_longo_demais(self):
        self.assertErroNoCampo(self.post_respostas(setor="   "), "setor")
        self.assertErroNoCampo(self.post_respostas(setor="a" * 81), "setor")

    def test_numero_com_tipo_errado(self):
        self.assertErroNoCampo(self.post_respostas(energia="5000"), "energia")
        self.assertErroNoCampo(self.post_respostas(energia=True), "energia")
        self.assertErroNoCampo(self.post("{\"energia\": NaN}"), "energia")

    def test_numero_fora_do_intervalo(self):
        self.assertErroNoCampo(self.post_respostas(desperdicio=101), "desperdicio")
        self.assertErroNoCampo(self.post_respostas(paradas=-1), "paradas")
        self.assertErroNoCampo(self.post_respostas(funcionarios=0), "funcionarios")

    def test_funcionarios_precisa_ser_inteiro(self):
        self.assertErroNoCampo(self.post_respostas(funcionarios=2.5), "funcionarios")

    def test_opcao_inexistente(self):
        response = self.post_respostas(monitoramento="Satélite")

        self.assertErroNoCampo(response, "monitoramento")

    def test_get_retorna_405(self):
        response = self.client.get(reverse("chatbot:simular"))

        self.assertEqual(response.status_code, 405)

    def test_sem_csrf_retorna_403(self):
        response = self.client.post(
            reverse("chatbot:simular"),
            json.dumps(VALID_RESPOSTAS),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 403)

    def test_limite_por_ip_retorna_429(self):
        for _ in range(SIMULATION_RATE_LIMIT):
            self.assertEqual(self.post_respostas().status_code, 200)

        response = self.post_respostas()

        self.assertEqual(response.status_code, 429)

class CalculosTests(SimpleTestCase):
    def metrica(self, resultado, key):
        return next(m for m in resultado["metricas"] if m["key"] == key)

    def test_mesmas_respostas_mesmo_resultado(self):
        self.assertEqual(
            calcular_metricas(VALID_RESPOSTAS), calcular_metricas(VALID_RESPOSTAS)
        )

    def test_com_iot_nunca_negativo_nem_maior_que_sem_iot(self):
        for monitoramento in ["Manual", "Parcialmente automatizado", "Já uso sensores"]:
            for valor in [0, 1, 100]:
                respostas = {
                    **VALID_RESPOSTAS,
                    "monitoramento": monitoramento,
                    "energia": valor,
                    "manutencao": valor,
                    "paradas": min(valor, 744),
                    "desperdicio": min(valor, 100),
                }
                for m in calcular_metricas(respostas)["metricas"]:
                    self.assertGreaterEqual(m["com_iot"], 0)
                    self.assertLessEqual(m["com_iot"], m["sem_iot"])

    def test_quem_ja_usa_sensores_ganha_menos(self):
        manual = calcular_metricas({**VALID_RESPOSTAS, "monitoramento": "Manual"})
        sensores = calcular_metricas({**VALID_RESPOSTAS, "monitoramento": "Já uso sensores"})
        self.assertLess(sensores["economia_mensal"], manual["economia_mensal"])

    def test_energia_manual_aplica_reducao_cheia(self):
        resultado = calcular_metricas({**VALID_RESPOSTAS, "energia": 20000})
        self.assertEqual(self.metrica(resultado, "energia")["com_iot"], 16000)

    def test_economia_anual_e_12x_a_mensal(self):
        r = calcular_metricas(VALID_RESPOSTAS)
        self.assertAlmostEqual(r["economia_anual"], r["economia_mensal"] * 12, places=1)

    def test_fatores_cobrem_todas_as_opcoes_de_monitoramento(self):
        pergunta = next(q for q in QUESTIONS if q["key"] == "monitoramento")
        self.assertEqual(set(FATOR_MONITORAMENTO), set(pergunta["choices"]))

    def test_horas_por_mes_igual_ao_maximo_de_paradas(self):
        pergunta = next(q for q in QUESTIONS if q["key"] == "paradas")
        self.assertEqual(HORAS_POR_MES, pergunta["max"])

    def test_resultado_marca_como_estimativa(self):
        self.assertIs(calcular_metricas(VALID_RESPOSTAS)["estimativa"], True)

class AnaliseTests(SimpleTestCase):
    def setUp(self):
        patcher = mock.patch.dict(os.environ)
        patcher.start()
        self.addCleanup(patcher.stop)
        os.environ.pop("ANTHROPIC_API_KEY", None)
        self.resultado = calcular_metricas(VALID_RESPOSTAS)

    def test_sem_chave_usa_texto_padrao(self):
        texto = analise.gerar_analise(VALID_RESPOSTAS, self.resultado)

        self.assertEqual(texto, analise.analise_padrao(self.resultado))

    def test_com_chave_usa_o_texto_da_ia(self):
        os.environ["ANTHROPIC_API_KEY"] = "chave-falsa"
        with mock.patch.object(analise, "anthropic") as fake:
            fake.Anthropic.return_value.messages.create.return_value = SimpleNamespace(
                content=[SimpleNamespace(type="text", text="Análise da IA.")]
            )
            texto = analise.gerar_analise(VALID_RESPOSTAS, self.resultado)

        self.assertEqual(texto, "Análise da IA.")

    def test_falha_da_api_cai_no_texto_padrao(self):
        os.environ["ANTHROPIC_API_KEY"] = "chave-falsa"
        with mock.patch.object(analise, "anthropic") as fake:
            fake.Anthropic.return_value.messages.create.side_effect = RuntimeError
            texto = analise.gerar_analise(VALID_RESPOSTAS, self.resultado)

        self.assertEqual(texto, analise.analise_padrao(self.resultado))