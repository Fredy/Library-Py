import React from "react";
import PropTypes from "prop-types";

function Genres(props) {
  const genres = props.genres;
  const genreList = genres.map(g => g.name);
  return (
    <h6 className="card-subtitle mb-2">
      <strong>{(genres.length > 1 ? "Genres: " : "Genre: ")}</strong>
      {genreList.join(", ")}
    </h6>
  );
}

function Authors(props) {
  return props.authors.map(author => (
    <h6 className="card-subtitle mb-2 text-muted" key={author.id}>
      {author.first_name + " " + author.last_name}
    </h6>
  ));
}

function MDate(props) {
  const date = new Date(props.date)
  return (
    <h6 className="card-subtitle mb-2"><strong>Published: </strong> {date.getFullYear()}</h6>
  );
}

function Table(props) {
  if (!props.data.length) {
    return <p>Nothing to show</p>;
  } else {
    return (
      <div className="container">
        <h2>
          Showing <strong>{props.data.length}</strong> of <strong>{props.total}</strong> books
        </h2>
        <hr className="my-4"></hr>
        {props.data.map(book => (
          <div className={"card my-2" + (!book.stock? " text-secondary bg-light":"")} key={book.id}>

            <div class="row align-items-center">

              <div className="col-sm-1 ml-5">
                <img src={book.cover_url} className="img-fluid" alt={book.title}></img>
              </div>

              <div className="col-sm">
                <div className="card-body">
                  <h5 className="card-title"><u>{book.title}</u></h5>
                  <div className="row">
                    <div className="col-sm">
                      <Authors authors={book.authors} />
                      <Genres genres={book.genres} />
                    </div>
                    <div className="col-sm">
                      <MDate date={book.pub_date} />
                      <h6 className="card-subtitle mb-2"><strong>Available Stock: </strong> {book.stock}</h6>
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired
};

export default Table;