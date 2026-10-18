from django.shortcuts import render

from .questions import QUESTIONS


def chat(request):
    """Tela do chatbot conversacional: ponto de partida da avaliação de impacto do IoT."""
    context = {
        "first_question": QUESTIONS[0],
        "total_questions": len(QUESTIONS),
    }
    return render(request, "chatbot/chat.html", context)
