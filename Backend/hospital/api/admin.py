from django.contrib import admin
from userauths.models import User,Profile
from .models import Doctor,AppointmentSlot,BookAppointmentSlot
# Register your models here.
# admin.site.register(User)
admin.site.register(Profile)
# admin.site.register(Doctor)
# admin.site.register(AppointmentSlot)
admin.site.register(BookAppointmentSlot)
@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'specialization', 'position', 'available', 'created_at']  #these feilds are shown in admin pannel so we can view id also there
    search_fields = ['user__full_name', 'user__email']
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display=['id','username','email']
@admin.register(AppointmentSlot)
class AppointmentSlotAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor', 'start_time','end_time')  # Add 'id' here

# admin.site.register()
# admin.site.register()