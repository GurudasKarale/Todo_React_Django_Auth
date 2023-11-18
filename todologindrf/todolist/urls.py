
from rest_framework import routers
from .views import TodoViewSet,AddTodoViewSet,UpdateTodoViewSet,DeleteTodoViewSet

# router = routers.DefaultRouter()
# router.register('/addtodo/',AddTodoViewSet,'addtodoview')
#
# urlpatterns = router.urls


from django.urls import path

urlpatterns = [
    path('todos/', TodoViewSet.as_view({'get': 'list'}), name='TodoViewSet'),
    path('addtodo/', AddTodoViewSet.as_view({'post': 'create'}), name='AddTodoViewSet'),
    path('updatetodo/<pk>', UpdateTodoViewSet.as_view({'patch': 'partial_update'}), name='updateTodoViewSet'),
    path('deletetodo/<pk>', DeleteTodoViewSet.as_view({'delete': 'destroy'}), name='deleteTodoViewSet')
]