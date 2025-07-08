from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

class UserRegisterSerializer(RegisterSerializer):
    full_name = serializers.CharField(required=False, allow_blank = True)
    contact = serializers.CharField(required= False, allow_blank = True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['full_name'] = self.validated_data.get('full_name', '')
        data['contact'] = self.validate_data.get('contact', '')
        return data