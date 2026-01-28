'''This file contains validators for the data posted from devices to the server before being processed
by the viewsets'''

from django.conf import settings
from rest_framework import serializers
from functools import wraps

sensor_definitions = settings.SENSOR_DEFINITIONS

def validate_sensor_data(func):
    '''decorator used to validate the sensor data'''
    @wraps(func)
    def wrapper(request,*args,**kwargs):
        data = kwargs.get('data')
        if not data and args:
            # e.g., when function signature is (self, data)
            data = args[-1]
        
        if not data or not isinstance(data, dict):
            raise serializers.ValidationError("Invalid or missing data.")
        

        sensor_type = data.get("sensor_type")
        definition = sensor_definitions.get(sensor_type)

        if not definition:
            raise serializers.ValidationError(f"Unknown sensor type: {sensor_type}")
        
        return func(*args,**kwargs)
    
    return wrapper