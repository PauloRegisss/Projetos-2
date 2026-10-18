import json

from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_GET, require_POST

from app.ratelimit import is_rate_limited

from .questions import QUESTIONS
from .validation import validar_respostas

SIMULATION_RATE_LIMIT = 5  # simulações por minuto, por IP


@require_GET
def perguntas(_request: HttpRequest):
    """Perguntas do chat, para o frontend montar a conversa."""
    return JsonResponse({"perguntas": QUESTIONS})


@require_POST
def simular_view(request: HttpRequest):
    """Recebe e valida as respostas do chat. Por enquanto só devolve as respostas validadas."""
    if is_rate_limited(request, "simular", SIMULATION_RATE_LIMIT):
        return JsonResponse(
            {"error": "Muitas simulações enviadas. Tente novamente em instantes."},
            status=429,
        )

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido."}, status=400)

    if not isinstance(data, dict):
        return JsonResponse({"error": "JSON inválido."}, status=400)

    respostas, erros = validar_respostas(data)
    if erros:
        return JsonResponse({"error": "Respostas inválidas.", "fields": erros}, status=400)

    return JsonResponse({"respostas": respostas})
