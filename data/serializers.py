from rest_framework import serializers
from .models import data

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = data
        fields = "__all__"
