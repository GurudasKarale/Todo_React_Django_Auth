from .models import Todol
from rest_framework import viewsets, permissions
from .serializers import TodoSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
# Lead Viewset


class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TodoSerializer
    def get_queryset(self):
        return self.request.user.Todos.all()  #related name in model


class AddTodoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TodoSerializer
    #http_method_names = ['post', ]
    def get_queryset(self):
        return self.request.user.Todos.all()

    def perform_create(self, serializer):
            instance = serializer.save(owner=self.request.user)


class UpdateTodoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TodoSerializer
    #http_method_names = ['post', ]
    def get_queryset(self):
        return self.request.user.Todos.all()

    def perform_update(self, serializer):
            instance = serializer.save(owner=self.request.user)


class DeleteTodoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TodoSerializer
    #http_method_names = ['post', ]
    def get_queryset(self):
        return self.request.user.Todos.all()

    def destroy(self, request, pk=None, *args, **kwargs):
        item = self.get_object()
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
