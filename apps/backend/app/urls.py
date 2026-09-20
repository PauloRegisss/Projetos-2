from django.urls import path

from app.views import contato, contatos_admin

urlpatterns = [
    path("contato/", contato, name="contato"),
    path("contatos/", contatos_admin, name="contatos-admin"),
]
