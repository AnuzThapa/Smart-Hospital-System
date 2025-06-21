# we can create or register user or doctor both inside serializer or view,if is it closely related to validation do in serializer or if you want more control do in view.
from django.shortcuts import render
from transformers import pipeline 
from PIL import Image
import torch
import os
from django.http import HttpResponse
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from userauths.models import User,Profile
from . import serializer as api_serializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
import markdown
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now 
from .models import AppointmentSlot,BookAppointmentSlot,Doctor
import re
import tempfile
from bs4 import BeautifulSoup
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from llama_cpp import Llama
import ollama
import base64
import requests
import logging
import lmstudio as lms
logger = logging.getLogger(__name__)
# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = api_serializer.UserRegisterSerializer 
class DoctorRegisterView(generics.CreateAPIView):   #receives the post request from frontend and pass the json data to serializer
    queryset=Doctor.objects.all()
    serializer_class=api_serializer.DoctorRegisterSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes=[AllowAny]
class DoctorLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required."},
                            status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials."},
                            status=status.HTTP_401_UNAUTHORIZED)

        try:
            doctor = Doctor.objects.get(user=user)
        except Doctor.DoesNotExist:
            return Response({"error": "User is not registered as a doctor."},
                            status=status.HTTP_403_FORBIDDEN)

        # If using token authentication
        # token, created = Token.objects.get_or_create(user=user)

        return Response({
            # "token": token.key,
            "doctor_id": doctor.id,
            "username": user.username,
            "email": user.email
        })
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"detail": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "username": user.username
                }
            }, status=status.HTTP_200_OK)
        else:
            # manual conversion to json without using serializer.
            return Response({"detail": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)


# with using serializers
# serializer is useful for providing validation

# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()

# class LoginView(APIView):
#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             password = serializer.validated_data['password']
#             user = authenticate(request, email=email, password=password)

#             if user:
#                 return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = api_serializer.ProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):  #override get_object function
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        return Profile.objects.get(user=user)   #returns the profile for the user


class AiModelView(APIView):
    parser_classes = [JSONParser,MultiPartParser, FormParser]
    # we can also store the conversation in the database and every time new query qppear,we can send last 3 converation to the model so it remembers the previous conversation.
    @swagger_auto_schema(request_body=api_serializer.PromptSerializer)
    def post(self, request):
        serializer = api_serializer.PromptSerializer(data=request.data)
        if serializer.is_valid():
            prompt = serializer.validated_data['query']
            image = serializer.validated_data.get('image', None)
            model_path = "medgemma-4b-it"
            try:
            
                model=lms.llm(model_path)

                system_prompt=""" you are a highly skilled AI assistant specialized in radiology. You support radiologists and medical

                Guidelines:

                1. Be accurate,concise, and clinically relevant.
                2. User proper radiologic terms (e.g."hypodense" "ground-glass opacity").
                3. Do not guess-flag when input lacks detail.
                4. Include differentials or next steps when appropriate.

                Tone: Confident,professional, and precise

                Limitations: No final diagnoses or treatment plans without full clinical context.
                """

                chat=lms.Chat(system_prompt)
                if image is not None:
                    image_handle = lms.prepare_image(image)
                    chat.add_user_message("What is your opinion about this image?", images=[image_handle])
                else:
                    chat.add_user_message(prompt)
                    
                def extract_response_text(prediction):
                        for attr in ['output', 'result', 'message', 'content']:
                            value = getattr(prediction, attr, None)
                            if isinstance(value, str):
                                return value
                        return str(prediction)


                response = model.respond(chat)
                if isinstance(response, str):
                    response_content = response
                else:
                    response_content = str(response)

                logger.info(f"Model response: {response_content}")


                elevenlabs_api_key = "YOUR_ELEVENLABS_API_KEY"  # Replace with your ElevenLabs API key
                voice_id = "your_voice_id"  # Replace with your ElevenLabs voice ID
                tts_response = requests.post(
                    f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
                    headers={
                        "xi-api-key": elevenlabs_api_key,
                        "Content-Type": "application/json",
                        "Accept": "audio/mpeg"
                    },
                    json={
                        "text": response_content,
                        "model_id": "eleven_monolingual_v1",
                        "voice_settings": {
                            "stability": 0.5,
                            "similarity_boost": 0.75
                        }
                    }
                )

                if tts_response.status_code != 200:
                    logger.warning("TTS generation failed.")

                audio_bytes = tts_response.content
                audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")

                return Response(
                    {"response": response_content,
                    "audio_base64": audio_base64,}, 
                    status=status.HTTP_200_OK
                )

            except ConnectionError as e:
                logger.error(f"LMstudio connection error: {str(e)}")
                return Response(
                    {"detail": "Could not connect to Ollama service. Please ensure it's running."},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )
            except Exception as e:
                logger.error(f"LMstudio chat error: {str(e)}")
                return Response(
                    {"detail": f"AI model error: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DoctorListView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = api_serializer.DoctorListSerializer

# OR,
# class DoctorListView(APIView):
#     def get(self, request):
#         doctors = Doctor.objects.all()
#         serializer = DoctorListSerializer(doctors, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
class AppointmentSlotCreateView(generics.CreateAPIView):
    queryset = AppointmentSlot.objects.all()   #get all the appointment slot available from the appointment slot model
    serializer_class = api_serializer.AppointmentSlotSerializer
    # permission_classes = [permissions.IsAuthenticated]  # or customize per your auth setup
    permission_classes = [AllowAny] 
    def perform_create(self, serializer):
        # optionally restrict doctor to logged-in user if doctor model is linked to user
        # example:
        # doctor = self.request.user.doctor_profile
        # serializer.save(doctor=doctor, is_booked=False)
        # else, accept doctor field from input
        serializer.save(is_booked=False)
# class AvailableSlotsView(generics.ListAPIView):
#     serializer_class = api_serializer.AppointmentSlotSerializer
#     permission_classes = [AllowAny]  #anyone can access this view

#     def get_queryset(self):
#         doctor_id = self.kwargs.get('doctor_id')
#         return AppointmentSlot.objects.filter(
#             doctor_id=doctor_id,
#             date__gte=now(),
#             is_booked=False
#         ).order_by('date', 'start_time')
class AvailableAppointmentSlotListView(generics.ListAPIView):
    serializer_class = api_serializer.AvailableAppointmentSlotSerializer

    def get_queryset(self):
        doctor_id = self.request.query_params.get('doctor', None)
        date = self.request.query_params.get('date', None)  # optional filter by date
        queryset = AppointmentSlot.objects.filter(is_booked=False)

        if doctor_id is not None:
            queryset = queryset.filter(doctor_id=doctor_id)
        
        if date is not None:
            queryset = queryset.filter(date__date=date)  # filtering by date only (ignoring time part)

        return queryset.order_by('date', 'start_time')
class BookAppointmentSlotView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]   #only loggedin user can access this view
    # permission_classes=[AllowAny]
    serializer_class=api_serializer.BookAppointmentSlotSerializer
    def post(self, request, slot_id):
        try:
            slot = AppointmentSlot.objects.get(pk=slot_id, is_booked=False)
        except AppointmentSlot.DoesNotExist:
            return Response({"detail": "This slot is not available."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = api_serializer.BookAppointmentSlotSerializer(data=request.data)
        if serializer.is_valid():
            # Create booking
            BookAppointmentSlot.objects.create(
                slot=slot,
                patient=request.user,
                symptoms=serializer.validated_data.get('symptoms', '')
            )
            slot.is_booked = True
            slot.patient = request.user
            slot.save()
            return Response({"detail": "Appointment booked successfully."}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
