from django.shortcuts import render
from django.http import JsonResponse

def api(request):
    data = {
        "id": "1",
        "content": "This is my first tweet."
    }
    return JsonResponse(data, status=200)