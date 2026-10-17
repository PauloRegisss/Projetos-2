import json

from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_GET, require_POST

from .forms import ContactForm
from .models import ContactMessage
from .ratelimit import is_rate_limited

CONTACT_RATE_LIMIT = 5  # mensagens por minuto, por IP


@require_GET
def health(_request: HttpRequest):
    return JsonResponse({"status": "ok"})


@require_POST
def contato(request: HttpRequest):
    if is_rate_limited(request, "contato", CONTACT_RATE_LIMIT):
        return JsonResponse(
            {"error": "Muitas mensagens enviadas. Tente novamente em instantes."},
            status=429,
        )

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido."}, status=400)

    if not isinstance(data, dict):
        return JsonResponse({"error": "JSON inválido."}, status=400)

    form = ContactForm(data)
    if not form.is_valid():
        return JsonResponse(
            {
                "error": "Dados inválidos.",
                "fields": form.errors.get_json_data(),
            },
            status=400,
        )

    _ = form.save()
    return JsonResponse({"success": True}, status=201)


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
