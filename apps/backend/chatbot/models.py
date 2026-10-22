from django.db import models

import uuid

from django.db import models


class Simulacao(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    respostas = models.JSONField()
    resultado = models.JSONField()
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criado_em"]
        verbose_name = "simulação"
        verbose_name_plural = "simulações"

    def __str__(self):
        setor = self.respostas.get("setor", "sem setor")
        return f"{setor} - {self.criado_em:%d/%m/%Y %H:%M}"
