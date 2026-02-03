from django.urls import path
from .views import *

urlpatterns = [
    path("dashboard/", home, name="dashboard"),
    path("analytics/", analytics, name="analytics"),
]