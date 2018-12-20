from django.urls import path
from . import views


urlpatterns = [
    path('admin_no', views.login),
    path('admin_page', views.index_admin),
    path('', views.index),
]
