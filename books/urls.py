from django.urls import path
from . import views

urlpatterns = [
    path('books', views.BookList.as_view()),
    path('books/add', views.BookCreate.as_view()),
    path('books/<int:pk>', views.BookRetrieveUpdateDestroy.as_view()),
    path('authors', views.AuthorList.as_view()),
]