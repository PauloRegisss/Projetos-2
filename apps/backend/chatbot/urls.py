from django.urls import path

from . import views

app_name = "chatbot"

urlpatterns = [
    path("perguntas/", views.perguntas, name="perguntas"),
    path("simular/", views.simular_view, name="simular"),
]
