import uuid

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Simulacao",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("respostas", models.JSONField()),
                ("resultado", models.JSONField()),
                ("criado_em", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "simulação",
                "verbose_name_plural": "simulações",
                "ordering": ["-criado_em"],
            },
        ),
    ]