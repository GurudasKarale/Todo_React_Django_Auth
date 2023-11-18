from rest_framework import serializers
from .models import Todol

# Lead Serializer
class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todol
    fields = '__all__'                                 # all the properties of todol should be serialized