from django.urls import path

from . import views

app_name = "chatbot"

urlpatterns = [
    path("perguntas/", views.perguntas, name="perguntas"),
    path("simular/", views.simular_view, name="simular"),
    path("assistente/", views.assistente_view, name="assistente"),
    path("simulacoes/<uuid:simulacao_id>/", views.simulacao_detalhe, name="simulacao"),
]
