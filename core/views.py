from django.shortcuts import render


def home(request):
    return render(request, "home.html")

def analytics(request):
    return render(request, "analytics.html")