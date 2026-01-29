from django.shortcuts import render

# projects dashboard
def dashboard(request):
    return render(request, 'projects_dashboard.html')

def project_overview(request):
    return render(request, 'project_overview.html')

# create/read/update and delete projects view
def projects_crud(request):
    pass

# administation roles crud operations view
def project_roles_crud(request):
    pass

# regen new api key
def regen_api(request):
    pass