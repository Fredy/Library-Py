from rest_framework import serializers
from .models import Author, Genre, Book


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'first_name', 'last_name')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name')


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    genres = GenreSerializer(many=True)

    class Meta:
        model = Book
        fields = ('id', 'title', 'authors', 'pub_date',
                  'edition', 'cover_url', 'stock', 'genres')


class BookSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'authors', 'pub_date',
                  'edition', 'cover_url', 'stock', 'genres')
