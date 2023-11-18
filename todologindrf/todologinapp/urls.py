from . import views
from django.urls import path
from .views import LoginAPI,UserAPI,UserRegisterAPI  #RegisterAPI
from knox.views import LogoutView,LogoutAllView

urlpatterns = [
    path('', UserRegisterAPI.as_view(), name="userRegister"),
    path('loginAPI/', LoginAPI.as_view(), name='login'),
    path('userAPI/', UserAPI.as_view(), name='userInfo'),
    path('logout/', LogoutView.as_view(), name='knox_logout')     #must be a post request

]