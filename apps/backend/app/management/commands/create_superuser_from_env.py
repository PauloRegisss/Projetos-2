import os

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand, CommandError


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
        if user_model.objects.filter(username=username).exists():
            self.stdout.write(f"Superusuário '{username}' já existe; pulando.")
            return

        user = user_model(
            username=username,
            email=email,
            is_staff=True,
            is_superuser=True,
        )

        # Valida antes de salvar, para nunca criar um admin com senha fraca
        # (usa os validadores de AUTH_PASSWORD_VALIDATORS do settings.py).
        try:
            validate_password(password, user=user)
        except ValidationError as error:
            raise CommandError(
                "CREATE_SUPERUSER_PASSWORD é fraca; superusuário não foi criado. "
                + " ".join(error.messages)
            ) from error

        user.set_password(password)
        user.save()
        self.stdout.write(self.style.SUCCESS(f"Superusuário '{username}' criado."))
