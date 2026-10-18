import json

from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET

from .questions import QUESTIONS


@require_GET
def perguntas(_request: HttpRequest):
    """Perguntas do chat, para o frontend montar a conversa."""
    return JsonResponse({"perguntas": QUESTIONS})


@csrf_exempt
def simular_view(request):
    """Recebe as respostas do chat. Por enquanto só devolve o que recebeu (stub)."""
    if request.method == "POST":
        respostas = json.loads(request.body)
        return JsonResponse({"recebido": respostas})
    return JsonResponse({"error": "Método não permitido."}, status=405)
