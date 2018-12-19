from faker import Faker
from random import randint
import os
import json


def gen_dict(model, pk, fields):
    return {'model': model, 'pk': pk, 'fields': fields}


def gen_author_fields(first_name, last_name, birth_date):
    return {'first_name': first_name,
            'last_name': last_name,
            'birth_date': birth_date}


def gen_book_fields(title, pub_date, edition, cover_url, stock, authors, genres):
    return {'title': title,
            'pub_date': pub_date,
            'edition': edition,
            'cover_url': cover_url,
            'stock': stock,
            'authors': authors,
            'genres': genres}


def gen_genre_fields(name):
    return {'name': name}


def datagen(total_authors, total_genres, total_books):
    gen = Faker()
    author_model = 'books.author'
    book_model = 'books.book'
    genre_model = 'books.genre'
    img_url = 'https://images-na.ssl-images-amazon.com/images/I/51364NhwLoL.jpg'

    data = []

    for i in range(total_authors):
        author_fields = gen_author_fields(
            gen.first_name(), gen.last_name(), gen.date())
        author_data = gen_dict(author_model, i + 1, author_fields)
        data.append(author_data)

    for i in range(total_genres):
        genre_fields = gen_genre_fields(gen.word().capitalize())
        genre_data = gen_dict(genre_model, i + 1, genre_fields)
        data.append(genre_data)

    for i in range(total_authors):
        rnd_authors = randint(1, 2)
        rnd_genres = randint(1, 3)
        authors = [randint(1, total_authors) for a in range(rnd_authors)]
        genres = [randint(1, total_genres) for a in range(rnd_genres)]

        book_fields = gen_book_fields(gen.sentence()[:-1],
                                      gen.date(), randint(1, 9),
                                      img_url, randint(0, 5),
                                      authors, genres)
        book_data = gen_dict(book_model, i + 1, book_fields)
        data.append(book_data)
    return data


if __name__ == '__main__':
    authors = 33
    genres = 13
    books = 400
    out_path = 'books/fixtures'
    file_name = 'books.json'
    if not os.path.exists(out_path):
        os.makedirs(out_path)

    with open(os.path.join(out_path, file_name), 'w') as f:
        f.write(json.dumps(datagen(authors, genres, books)))
