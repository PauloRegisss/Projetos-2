import json

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import Client, TestCase

from .models import ContactMessage
from .views import CONTACT_RATE_LIMIT

VALID_CONTACT = {
    "name": "Maria",
    "email": "maria@exemplo.com",
    "subject": "Orçamento",
    "message": "Quero saber mais sobre IoT.",
}


class ContatoViewTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = Client(enforce_csrf_checks=True)

    def csrf_token(self) -> str:
        return self.client.get("/auth/csrf/").json()["csrfToken"]

    def post(self, body: str, ip: str = "10.0.0.1"):
        return self.client.post(
            "/contato/",
            body,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=self.csrf_token(),
            HTTP_X_FORWARDED_FOR=ip,
        )

    def test_mensagem_valida_e_salva(self):
        response = self.post(json.dumps(VALID_CONTACT))

        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_json_invalido_retorna_400(self):
        response = self.post("abc")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_json_que_nao_e_objeto_retorna_400(self):
        response = self.post(json.dumps(["a", "b"]))

        self.assertEqual(response.status_code, 400)

    def test_campos_faltando_retornam_400_com_erros(self):
        response = self.post(json.dumps({}))

        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            set(response.json()["fields"]),
            {"name", "email", "subject", "message"},
        )

    def test_email_invalido_nao_e_salvo(self):
        response = self.post(json.dumps({**VALID_CONTACT, "email": "nao-e-email"}))

        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.json()["fields"])
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_get_retorna_405(self):
        response = self.client.get("/contato/")

        self.assertEqual(response.status_code, 405)

    def test_sem_csrf_retorna_403(self):
        response = self.client.post(
            "/contato/",
            json.dumps(VALID_CONTACT),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 403)

    def test_limite_por_ip_retorna_429(self):
        for _ in range(CONTACT_RATE_LIMIT):
            self.assertEqual(self.post(json.dumps(VALID_CONTACT)).status_code, 201)

        response = self.post(json.dumps(VALID_CONTACT))

        self.assertEqual(response.status_code, 429)
        self.assertEqual(ContactMessage.objects.count(), CONTACT_RATE_LIMIT)

    def test_limite_e_separado_por_ip(self):
        for _ in range(CONTACT_RATE_LIMIT):
            _ = self.post(json.dumps(VALID_CONTACT), ip="10.0.0.1")

        response = self.post(json.dumps(VALID_CONTACT), ip="10.0.0.2")

        self.assertEqual(response.status_code, 201)


class LoginRateLimitTests(TestCase):
    def setUp(self):
        cache.clear()
        get_user_model().objects.create_user("admin", password="senha-forte-123")

    def test_limite_de_tentativas_retorna_429(self):
        from authentication.views import LOGIN_RATE_LIMIT

        body = json.dumps({"username": "admin", "password": "errada"})
        for _ in range(LOGIN_RATE_LIMIT):
            response = self.client.post(
                "/auth/login/", body, content_type="application/json"
            )
            self.assertEqual(response.status_code, 401)

        response = self.client.post(
            "/auth/login/", body, content_type="application/json"
        )

        self.assertEqual(response.status_code, 429)
