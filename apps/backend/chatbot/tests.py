from django.test import TestCase
from django.urls import reverse

from .questions import QUESTIONS


class ChatScreenTests(TestCase):
    def test_chat_screen_opens(self):
        response = self.client.get(reverse("chatbot:chat"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "chatbot/chat.html")

    def test_chat_screen_shows_first_question(self):
        response = self.client.get(reverse("chatbot:chat"))
        self.assertContains(response, QUESTIONS[0]["text"])
        self.assertContains(response, "Começar avaliação")