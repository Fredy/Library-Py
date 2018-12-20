from .models import Author, Genre, Book
from .serializers import AuthorSerializer, GenreSerializer, BookSerializer, BookSimpleSerializer
from rest_framework import generics, permissions
from rest_framework.exceptions import ParseError


class BookList(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        """
        Filter against title, author name and date.
        """
        queryset = Book.objects.all()
        title = self.request.query_params.get('title', None)
        author = self.request.query_params.get('author', None)
        author_id = self.request.query_params.get('author_id', None)
        pubStart = self.request.query_params.get('pubStart', None)
        pubEnd = self.request.query_params.get('pubEnd', None)

        if title is not None:
            queryset = queryset.filter(title__contains=title)
        if author_id is not None:
            try:
                int_id = int(author_id)
            except ValueError:
                raise ParseError(
                    f"Id parameter is not an integer number: '{author_id}'")
            else:
                queryset = queryset.filter(authors__id=int_id)
        elif author is not None:
            first_query = queryset.filter(authors__first_name__contains=author)
            last_query = queryset.filter(authors__last_name__contains=author)
            queryset = first_query | last_query

        if pubStart is not None or pubEnd is not None:
            if pubStart is None:
                pubStart = '0'
            if pubEnd is None:
                pubEnd = '9999'
            queryset = queryset.filter(pub_date__year__range=[pubStart, pubEnd])
        queryset.distinct()

        return queryset



class BookRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Book.objects.all()
    serializer_class = BookSimpleSerializer


class AuthorList(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class GenreList(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
