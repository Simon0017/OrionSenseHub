from django.shortcuts import render
from rest_framework import viewsets,permissions
from django.views.decorators.http import require_http_methods

from .serializers import *
from .models import *
from .validators import *

@validate_sensor_data
@require_http_methods(["POST"])
def post_data(request,project_id,device_id):
    '''endpoint view for posting the data from the devices'''

    # try:
    #     device = Device.objects.get(id=device_id, project_id=project_id)
    # except Device.DoesNotExist:
    #     return Response(
    #         {"error": "Device not found for this project."},
    #         status=status.HTTP_404_NOT_FOUND
    #     )

    # serializer = DataSerializer(data=request.data)
    # if serializer.is_valid():
    #     serializer.save(device=device)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)