import json
from sqlite3 import Date
from time import timezone
from typing import TypedDict

from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import ContactMessage


class ContactData(TypedDict):
    name: str
    email: str
    subject: str
    message: str


@csrf_exempt
def contato(request: HttpRequest):
    if request.method == "POST":
        data: ContactData = json.loads(request.body)
        _ = ContactMessage.objects.create(
            name=data["name"],
            email=data["email"],
            subject=data["subject"],
            message=data["message"],
        )
        return JsonResponse({"success": True})
    return JsonResponse({"error": "Rota desconhecida."})
