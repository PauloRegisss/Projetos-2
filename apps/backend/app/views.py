import json
from typing import TypedDict

from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET

from .models import ContactMessage


class ContactData(TypedDict):
    name: str
    email: str
    subject: str
    message: str


@require_GET
def health(_request: HttpRequest):
    return JsonResponse({"status": "ok"})


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


@require_GET
def contatos_admin(request: HttpRequest):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Autenticação necessária."}, status=401)

    if not request.user.is_staff:
        return JsonResponse({"error": "Acesso não autorizado."}, status=403)

    messages = ContactMessage.objects.order_by("-date").values(
        "id",
        "name",
        "email",
        "subject",
        "message",
        "date",
    )

    return JsonResponse({"contacts": list(messages)}, safe=True)
