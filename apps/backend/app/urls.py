from django.urls import path

from app.views import contato

urlpatterns = [
    path("contato/", contato, name="contato"),
]
