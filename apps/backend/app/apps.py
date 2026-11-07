from django.apps import AppConfig


class AppConfig(AppConfig):
    # A migration 0001 criou o id como BigAutoField; manter o mesmo tipo evita uma migration desnecessária.
    default_auto_field = "django.db.models.BigAutoField"
    name = "app"
