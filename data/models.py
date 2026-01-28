from django.db import models
from devices.models import devices

class data(models.Model):
    '''Records the data from the various devices,THIS IS  A TIMESERIES HYPERTABLE'''
    payload  = models.JSONField()
    device = models.ForeignKey(devices,related_name="device",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


