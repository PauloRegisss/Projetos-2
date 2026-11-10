import math
from typing import Any

from .questions import QUESTIONS

Erros = dict[str, list[dict[str, str]]]


def _erro(message: str, code: str) -> list[dict[str, str]]:
    # Mesmo formato de `form.errors.get_json_data()`, usado no /contato/.
    return [{"message": message, "code": code}]


def _validar_numero(question: dict[str, Any], value: Any) -> tuple[Any, Any]:
    # `bool` é subclasse de `int` em Python, então precisa ser recusado à parte.
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None, _erro("Informe um número.", "invalid")
    # `json.loads` aceita NaN e Infinity.
    if not math.isfinite(value):
        return None, _erro("Informe um número.", "invalid")
    if question.get("integer") and value != int(value):
        return None, _erro("Informe um número inteiro.", "invalid")
    if "min" in question and value < question["min"]:
        return None, _erro(f"O valor mínimo é {question['min']}.", "min_value")
    if "max" in question and value > question["max"]:
        return None, _erro(f"O valor máximo é {question['max']}.", "max_value")
    return value, None


def _validar_texto(question: dict[str, Any], value: Any) -> tuple[Any, Any]:
    if not isinstance(value, str) or not value.strip():
        return None, _erro("Este campo é obrigatório.", "required")
    value = value.strip()
    if len(value) > question["max_length"]:
        return None, _erro(
            f"Use no máximo {question['max_length']} caracteres.", "max_length"
        )
    return value, None


def _validar_opcao(question: dict[str, Any], value: Any) -> tuple[Any, Any]:
    if value not in question["choices"]:
        return None, _erro("Escolha uma das opções.", "invalid_choice")
    return value, None


VALIDADORES = {
    "number": _validar_numero,
    "text": _validar_texto,
    "choice": _validar_opcao,
}


def validar_respostas(data: dict[str, Any]) -> tuple[dict[str, Any], Erros]:
    """Valida as respostas do chat contra `QUESTIONS`.

    Retorna as respostas limpas (só as chaves conhecidas) e os erros por campo.
    """
    respostas: dict[str, Any] = {}
    erros: Erros = {}

    for question in QUESTIONS:
        key = question["key"]
        if key not in data or data[key] is None:  # ty: ignore[invalid-argument-type]
            erros[key] = _erro("Este campo é obrigatório.", "required")  # ty: ignore[invalid-assignment]
            continue

        value, erro = VALIDADORES[question["type"]](question, data[key])  # ty: ignore[invalid-argument-type]
        if erro:
            erros[key] = erro  # ty: ignore[invalid-assignment]
        else:
            respostas[key] = value  # ty: ignore[invalid-assignment]

    return respostas, erros
