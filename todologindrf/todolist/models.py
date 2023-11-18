from django.db import models
from django.contrib.auth.models import User

class Todol(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, blank=True, null=True)
    owner = models.ForeignKey(
        User, related_name="Todos", on_delete=models.CASCADE, null=True)



