import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Cria o superusuário inicial usando variáveis de ambiente."

    def handle(self, *args, **options):
        username = os.environ.get("CREATE_SUPERUSER_USERNAME")
        email = os.environ.get("CREATE_SUPERUSER_EMAIL", "")
        password = os.environ.get("CREATE_SUPERUSER_PASSWORD")

        if not username or not password:
            self.stdout.write("Variáveis de superusuário não configuradas; pulando.")
            return

        user_model = get_user_model()
        user, created = user_model.objects.get_or_create(
            username=username,
            defaults={"email": email},
        )

        if not created:
            self.stdout.write(f"Superusuário '{username}' já existe; pulando.")
            return

        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save(update_fields=["email", "is_staff", "is_superuser", "password"])
        self.stdout.write(self.style.SUCCESS(f"Superusuário '{username}' criado."))
