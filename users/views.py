from django.shortcuts import render


# user registration view
def user_registration(request):
    return render(request, 'registration.html')

# user login view
def user_login(request):
    return render(request, 'login.html')

# account settings view
def account_settings(request):
    pass

# change password view
def change_password(request):
    pass

# forgot password view
def forgot_password(request):
    pass

# reset password view
def reset_password(request):
    pass
