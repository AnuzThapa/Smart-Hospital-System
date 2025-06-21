from userauths.models import User,Profile
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import BookAppointmentSlot,AppointmentSlot,Doctor
from rest_framework.parsers import MultiPartParser, FormParser

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
        try:
            token['teacher_id'] = user.teacher.id
        except:
            token['teacher_id'] = 0


        return token

class UserRegisterSerializer(serializers.ModelSerializer):   
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User #it is the model from user auth.
        fields = ['role','full_name', 'email', 'password', 'password2']   #the user in doctor form should send this
        # this is actually what show in docs
    
    def validate(self, attr):
        if attr['password'] != attr['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attr
    
    def create(self, validated_data):
        role = validated_data.get('role', 'patient')
        user = User.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            role=role
        )
        
        email_username, _ = user.email.split("@")
        user.username = email_username
        user.set_password(validated_data['password'])
        user.save()
        
        return user
class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model=Profile
    fields="__all__"
# class UserSerializer(serializers.ModelSerializer):
#   class Meta:
#     model=User
#     fields='__all__'
class PromptSerializer(serializers.Serializer):
    query = serializers.CharField(required=False, allow_blank=True)
    image = serializers.ImageField(required=False)
class DoctorLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
class DoctorRegisterSerializer(serializers.ModelSerializer):
    user = UserRegisterSerializer()   ## Nest the user fields  - now because of this there is no need to create user and again doctor
    # before this /register/user should be done to register doctor as user and again /register/doctor should be done to register doctor because user is used in doctor model
    # this create both user and doctor for doctor.
    picture = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = Doctor
        fields = ['id','picture', 'user', 'specialization', 'position',   #these are the expectations from the react frontend form
            'description', 'age', 'certifications',
            'experience_years', 'education', 'consultation_fee']    #specifying which feilds to be included in serialization.only these fields will be converted to/from json
        
    def create(self, validated_data):   #can also be done in view using perform create.
        user_data = validated_data.pop('user') #pop user key and its value out of doctorData dict send from frontend
        user_data['role'] = 'doctor'  # or however you're distinguishing roles
        user_serializer = UserRegisterSerializer(data=user_data)    #send the user part of data to user register serializer after popping
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        doctor = Doctor.objects.create(user=user, **validated_data)
        return doctor
# class AppointmentSlotSerializer(serializers.ModelSerializer):
#     doctor = DoctorRegisterSerializer(read_only=True)
#     doctor_id = serializers.PrimaryKeyRelatedField(
#         queryset=Doctor.objects.all(),
#         source='doctor',
#         write_only=True
#     )

#     class Meta:
#         model = AppointmentSlot
#         fields = [   #only these feilds undergo serialization
#             'id',
#             'doctor',
#             'doctor_id',
#             'date',
#             'start_time',
#             'end_time',
#             'is_booked',
#             'patient'
#         ]
#         read_only_fields = ['is_booked', 'patient']
class DoctorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'
        depth = 1  # To include nested user info
class AppointmentSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentSlot
        fields = ['id', 'doctor', 'date', 'start_time', 'end_time', 'is_booked', 'patient']
        read_only_fields = ['is_booked', 'patient']  # slots created are by default available, no patient assigned yet  #cant modify or write for this feild only read as they are already set

class AvailableAppointmentSlotSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.__str__', read_only=True)  # Optional: show doctor name
    class Meta:
        model = AppointmentSlot
        fields = ['id', 'doctor', 'doctor_name', 'date', 'start_time', 'end_time', 'is_booked']
        read_only_fields = ['id', 'doctor_name', 'is_booked']

class BookAppointmentSlotSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)  # Optional for authenticated users
    phone = serializers.CharField(max_length=15)
    symptoms = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = BookAppointmentSlot
        fields = ['id','email','phone','slot', 'patient', 'symptoms', 'booked_at']   #these feilds undergo serialization
        read_only_fields = ['booked_at']  #we can only read booked_at feild but cant modify it in admin pannel

    def validate_slot(self, value):
        if value.is_booked:
            raise serializers.ValidationError("This slot is already booked.")   #validation is performed in serailizer
        return value

    def create(self, validated_data):
        slot = validated_data['slot']
        slot.is_booked = True
        slot.patient = validated_data['patient']
        slot.save()
        return super().create(validated_data)

