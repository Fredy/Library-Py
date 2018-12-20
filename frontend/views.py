from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html')


def index_admin(request):
    return render(request, 'frontend/indexAdmin.html')


def login(request):
    return render(request, 'frontend/login.html')
