from rest_framework import serializers
from .models import Author, Genre, Book

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'first_name', 'last_name', 'birth_date')

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name')

class BookSerializer(serializers. ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'