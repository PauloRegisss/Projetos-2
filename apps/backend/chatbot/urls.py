from django.urls import path

from . import views

app_name = "chatbot"

urlpatterns = [
    path("", views.chat, name="chat"),
    path("simular/", views.simular_view, name="simular"),
]