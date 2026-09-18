from django.shortcuts import render, redirect
from .models import ContactMessage
from django.utils import timezone
import json
from django.http import JsonResponse

def contato(request):
    if request.method == "POST":
        data = json.loads(request.body)

        ContactMessage.objects.create(
            name=data["name"],
            email=data["email"],
            subject=data["subject"],
            message=data["message"],
        )

        return JsonResponse({"success": True})
