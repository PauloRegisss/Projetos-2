import json
import os
from io import StringIO
from unittest import mock

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.core.management import call_command
from django.core.management.base import CommandError
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


class CreateSuperuserFromEnvTests(TestCase):
    def run_command(self, **env: str) -> str:
        out = StringIO()
        with mock.patch.dict(os.environ, env):
            call_command("create_superuser_from_env", stdout=out)
        return out.getvalue()

    def test_senha_fraca_aborta_sem_criar_usuario(self):
        with self.assertRaises(CommandError):
            _ = self.run_command(
                CREATE_SUPERUSER_USERNAME="admin",
                CREATE_SUPERUSER_PASSWORD="admin1234",
            )

        self.assertFalse(get_user_model().objects.filter(username="admin").exists())

    def test_senha_forte_cria_superusuario(self):
        _ = self.run_command(
            CREATE_SUPERUSER_USERNAME="admin",
            CREATE_SUPERUSER_EMAIL="admin@exemplo.com",
            CREATE_SUPERUSER_PASSWORD="Nexus-Painel-2026!",
        )

        user = get_user_model().objects.get(username="admin")
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.check_password("Nexus-Painel-2026!"))

    def test_usuario_existente_e_mantido(self):
        get_user_model().objects.create_user("admin", password="Senha-Antiga-123!")

        output = self.run_command(
            CREATE_SUPERUSER_USERNAME="admin",
            CREATE_SUPERUSER_PASSWORD="admin1234",
        )

        self.assertIn("já existe", output)
        user = get_user_model().objects.get(username="admin")
        self.assertTrue(user.check_password("Senha-Antiga-123!"))

    def test_sem_senha_pula(self):
        output = self.run_command(
            CREATE_SUPERUSER_USERNAME="admin",
            CREATE_SUPERUSER_PASSWORD="",
        )

        self.assertIn("pulando", output)
        self.assertFalse(get_user_model().objects.exists())
