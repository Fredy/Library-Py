from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    birth_date = models.DateField()

    def __str__(self):
        return ' '.join([self.first_name, self.last_name])


class Genre(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=50)
    authors = models.ManyToManyField(Author)
    pub_date = models.DateField()
    edition = models.IntegerField()
    cover_url = models.CharField(max_length=100)
    stock = models.IntegerField(default=0)
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.title
