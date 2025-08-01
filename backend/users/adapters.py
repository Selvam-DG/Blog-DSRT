from allauth.account.adapter import DefaultAccountAdapter

class UserAccountAdapter(DefaultAccountAdapter):
    def save_user( self, request, user, form, commit = True):
        
        setattr(form, '_has_phone_field', False)
        user = super().save_user(request, user, form, commit = False)
        user.full_name = form.cleaned_data.get('full_name', '')
        user.contact = form.cleaned_data.get('contact', '')
        if commit:
            user.save()
        return user
