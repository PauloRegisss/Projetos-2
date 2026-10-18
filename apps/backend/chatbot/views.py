import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .questions import QUESTIONS


def chat(request):
    """Tela do chatbot conversacional: ponto de partida da avaliação de impacto do IoT."""
    context = {
        "first_question": QUESTIONS[0],
        "total_questions": len(QUESTIONS),
    }
    return render(request, "chatbot/chat.html", context)


@csrf_exempt
def simular_view(request):
    """Recebe as respostas do chat. Por enquanto só devolve o que recebeu (stub)."""
    if request.method == "POST":
        respostas = json.loads(request.body)
        return JsonResponse({"recebido": respostas})
    return JsonResponse({"error": "Método não permitido."}, status=405)