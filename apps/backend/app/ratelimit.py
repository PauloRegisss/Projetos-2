from django.core.cache import cache
from django.http import HttpRequest


def get_client_ip(request: HttpRequest) -> str:
    # As requisições do navegador chegam pelo proxy `/api` do frontend, que
    # repassa o IP original no `X-Forwarded-For`. Sem ele, o IP seria sempre o
    # do servidor do frontend e todos os usuários dividiriam o mesmo limite.
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "")


def is_rate_limited(
    request: HttpRequest,
    scope: str,
    limit: int,
    window_seconds: int = 60,
) -> bool:
    """Conta a requisição e diz se o IP passou de `limit` na janela atual."""
    key = f"ratelimit:{scope}:{get_client_ip(request)}"
    _ = cache.add(key, 0, timeout=window_seconds)
    try:
        count = cache.incr(key)
    except ValueError:
        # A chave expirou entre o `add` e o `incr`.
        cache.set(key, 1, timeout=window_seconds)
        count = 1
    return count > limit
