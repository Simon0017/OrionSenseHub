from django.urls import path
from .views import *

urlpatterns = [
    path('overview/', devices_overview, name='devices_overview'),
    path('detail/', device_detail, name='device_detail'),
]