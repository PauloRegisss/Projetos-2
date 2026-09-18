from django.shortcuts import render, redirect
from .models import ContactMessage
from django.utils import timezone


def contato(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message,
            date=timezone.now()
        )

        return redirect('contato')

    return render(request, 'core/contato.html')
