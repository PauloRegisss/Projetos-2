import json

from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest, JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import ensure_csrf_cookie


@require_POST
def login_view(request: HttpRequest):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "JSON inválido"},
            status=400,
        )

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return JsonResponse(
            {"error": "Username e senha são obrigatórios"},
            status=400,
        )
    user = authenticate(
        request,
        username=username,
        password=password,
    )

    if user is None:
        return JsonResponse(
            {"error": "Credenciais inválidas"},
            status=401,
        )

    login(request, user)

    return JsonResponse(
        {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_staff": user.is_staff,
            },
        }
    )


@require_GET
def me_view(request: HttpRequest):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"error": "Não autenticado"},
            status=401,
        )

    return JsonResponse(
        {
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
                "is_staff": request.user.is_staff,
            },
        }
    )


@require_POST
def logout_view(request: HttpRequest):
    logout(request)

    return JsonResponse({"message": "Logout realizado com sucesso"})


@ensure_csrf_cookie
def csrf(request: HttpRequest):
    return JsonResponse(
        {
            "csrfToken": get_token(request),
        }
    )
