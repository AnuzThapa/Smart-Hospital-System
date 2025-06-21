from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns=[
    
    # Login - get access and refresh tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Refresh access token using refresh token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('user/register/',views.UserRegisterView.as_view(),name='user_register'),
    path('user/login/',views.LoginView.as_view(),name='login'),
    path('user/profile/',views.ProfileAPIView.as_view()),
    path('user/profile/',views.LoginView.as_view(),name='login'),
    path("user/token/",views.MyTokenObtainPairView.as_view()),
    path("user/token/refresh/",TokenRefreshView.as_view()),
    path('model/AiModel/',views.AiModelView.as_view(),name='AiModel'),

    path('doctor/register/',views.DoctorRegisterView.as_view(),name='doctor_register'),
    path('doctor/login/', views.DoctorLoginView.as_view(), name='doctor_login'),
    path('doctor/display/',views.DoctorListView.as_view(),name="doctor-list"),

    # path('doctor/<int:doctor_id>/slots',views.AvailableAppointmentSlotListView.as_view(),name="available_slot"),
    # path('appointment-slot/<int:doctor_id>/display',views.AvailableAppointmentSlotListView.as_view(), name='available-slots-for-doctor'),--> this can also be done but there will be slight change in view
    path('appointment-slot/display',views.AvailableAppointmentSlotListView.as_view(), name='available-slots-for-doctor'),
    path('appointment-slot/<int:doctor_id>/create/', views.AppointmentSlotCreateView.as_view(), name='appointment-slot-create'),
    path('appointment-slot/<int:slot_id>/book',views.BookAppointmentSlotView.as_view(),name="book_slot")
]
