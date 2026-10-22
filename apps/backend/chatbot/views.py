import json

from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_GET, require_POST

from app.ratelimit import is_rate_limited

from .analise import gerar_analise
from .calculos import calcular_metricas
from .models import Simulacao
from .questions import QUESTIONS
from .validation import validar_respostas

SIMULATION_RATE_LIMIT = 5  # simulações por minuto, por IP


def _serializar(simulacao: Simulacao) -> dict:
    """Mesmo formato no POST e no GET, para o frontend tratar os dois igual."""
    return {
        "id": str(simulacao.id),
        "respostas": simulacao.respostas,
        **simulacao.resultado,
        "criado_em": simulacao.criado_em.isoformat(),
    }


@require_GET
def perguntas(_request: HttpRequest):
    """Perguntas do chat, para o frontend montar a conversa."""
    return JsonResponse({"perguntas": QUESTIONS})


@require_POST
def simular_view(request: HttpRequest):
    """Valida as respostas do chat, salva a simulação e devolve id + métricas."""
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

    metricas = calcular_metricas(respostas)
    resultado = {**metricas, "analise": gerar_analise(respostas, metricas)}
    simulacao = Simulacao.objects.create(respostas=respostas, resultado=resultado)
    return JsonResponse(_serializar(simulacao))


@require_GET
def simulacao_detalhe(_request: HttpRequest, simulacao_id):
    """Simulação salva, para o Showroom abrir por URL própria."""
    try:
        simulacao = Simulacao.objects.get(pk=simulacao_id)
    except Simulacao.DoesNotExist:
        return JsonResponse({"error": "Simulação não encontrada."}, status=404)
    return JsonResponse(_serializar(simulacao))