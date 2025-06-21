from django.db import models
from userauths.models import User 
from rest_framework import serializers

class Doctor(models.Model):
    SPECIALIZATION_CHOICES = [
        (1, 'Cardiology'),
        (2, 'Neurology'),
        (3, 'Pediatrics'),
        (4, 'Orthopedics'),
        (5, 'Dermatology'),
        (6, 'Psychiatry'),
        (7, 'General Medicine'),
    ]
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name='doctor_profile',max_length=100)
    picture = models.ImageField(  # Changed from 'image' to 'picture' to match frontend
        upload_to='doctors/pictures/',
        blank=True,
        null=True,
        help_text='Upload picture'
    )
    position=models.CharField(max_length=100)
    description=models.CharField(max_length=200)
    available=models.BooleanField(default=True)
    experience_years = models.PositiveIntegerField(default=0)
    education = models.CharField(max_length=200)
    age = models.PositiveIntegerField(default=0)
    specialization=models.IntegerField(choices=SPECIALIZATION_CHOICES,default=7)
    certifications=models.TextField(blank=True)
    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['user__full_name']      #ordering doctor by their fullname.
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctors'

    def __str__(self):
        return f"Dr. {self.user.full_name} - {self.get_specialization_display()}"

class AppointmentSlot(models.Model):
    doctor=models.ForeignKey(Doctor,on_delete=models.CASCADE)   #this wants doctor id
    start_time=models.TimeField()
    end_time=models.TimeField()
    date=models.DateTimeField()
    is_booked=models.BooleanField(default=False)
    patient=models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='appointments')

    class Meta:
        unique_together = ('doctor', 'date', 'start_time')  # Prevent duplicate slots
        ordering = ['date', 'start_time']  #order the appointment slot in admin pannel in date and time order

    def __str__(self):
        return f"{self.doctor} - {self.date} at {self.start_time}"   #instance name to be shown in admin pannel

class BookAppointmentSlot(models.Model):
    slot = models.OneToOneField(AppointmentSlot, on_delete=models.CASCADE, related_name='booking')  #one slot can have one field
    patient = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'is_staff': False})  #patient belonging to this slot
    phone=models.CharField(max_length=15)
    symptoms = models.TextField(blank=True)
    booked_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.patient.get_full_name()} booked {self.slot}"
# Create your models here.
