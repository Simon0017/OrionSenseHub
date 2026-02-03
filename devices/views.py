from django.shortcuts import render

def devices_overview(request):
    return render(request, 'devices_overview.html')

def device_detail(request):
    return render(request, 'device_detail.html')