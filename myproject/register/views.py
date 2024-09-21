from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, LoginSerializer


@api_view(['POST'])
def register_user(request):
    data = request.data
   
    data['password'] = make_password(data['password'])  # Hash password before saving
    serializer = UserSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!"}, status=201)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()  # Fetch all registered users
    serializer = UserSerializer(users, many=True)  # Serialize the user data
    return Response(serializer.data)  # Return the serialized data as a response

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        # Retrieve the user instance
        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            token, created = Token.objects.get_or_create(user=user)  # Generate or retrieve a token
            return Response({"token": token.key}, status=200)
        except User.DoesNotExist:
            return Response({"error": "User does not exist."}, status=404)

    return Response(serializer.errors, status=400)
