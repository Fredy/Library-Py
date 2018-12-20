from django.urls import path
from . import views


urlpatterns = [
    path('admin1', views.login),
    path('', views.index),
]
