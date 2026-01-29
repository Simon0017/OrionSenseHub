from django.shortcuts import render

def devices_overview(request):
    return render(request, 'devices_overview.html')