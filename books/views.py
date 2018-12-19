from .models import Author, Genre, Book
from .serializers import AuthorSerializer, GenreSerializer, BookSerializer
from rest_framework import generics

class BookList(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class =  BookSerializer