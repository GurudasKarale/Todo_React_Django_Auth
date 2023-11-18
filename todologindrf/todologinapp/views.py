from .serializers import RegisterSerializer, UserSerializer, LoginUserSerializer
from django.contrib.auth import login, authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token


# @api_view(['POST'])
# def UserRegisterAPI(request):
#     serializer = RegisterSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user=serializer.save()
#
#     return Response({
#         "token": AuthToken.objects.create(user)[1]
#     })

class UserRegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })
#
# class LoginAPI(KnoxLoginView):
#     permission_classes = (permissions.AllowAny,)
#
#     def post(self, request, format=None):
#         serializer = AuthTokenSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#
#         #username = request.POST['username']
#         #password = request.POST['password']
#         #user = authenticate(request, username=username, password=password)
#         login(request, user)
#         #token, created = Token.objects.get_or_create(user=user)
#         #return Response({'token': token.key}, status.HTTP_201_CREATED)
#         return super(LoginAPI, self).post(request, format=None)

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
