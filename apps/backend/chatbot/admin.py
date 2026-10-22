from django.contrib import admin

from .models import Simulacao


@admin.register(Simulacao)
class SimulacaoAdmin(admin.ModelAdmin):
    list_display = ("criado_em", "setor", "economia_mensal", "id")
    ordering = ("-criado_em",)
    readonly_fields = ("id", "respostas", "resultado", "criado_em")

    @admin.display(description="Setor")
    def setor(self, obj: Simulacao):
        return obj.respostas.get("setor", "-")

    @admin.display(description="Economia mensal estimada (R$)")
    def economia_mensal(self, obj: Simulacao):
        return obj.resultado.get("economia_mensal", "-")

    def has_add_permission(self, request):
        return False
