from django.test import TestCase
from django.urls import reverse

from .questions import QUESTIONS


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
