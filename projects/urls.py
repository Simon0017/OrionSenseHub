from django.urls import path
from .views import *

urlpatterns = [
    path('dashboard/', dashboard, name='projects_dashboard'),
    path('project_overview/', project_overview, name='project_overview'),
]