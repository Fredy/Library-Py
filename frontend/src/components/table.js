import React from "react";
import PropTypes from "prop-types";

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
}


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

function Card(props) {
  return (
    <div className={"card my-2" + (!props.book.stock ? " text-secondary bg-light" : "")} key={props.book.id}>

      <div className="row align-items-center">

        <div className="col-sm-1 ml-5">
          <img src={props.book.cover_url} className="img-fluid" alt={props.book.title}></img>
        </div>

        <div className="col-sm">
          <div className="card-body">
            <h5 className="card-title"><u>{props.book.title}</u></h5>
            <div className="row">
              <div className="col-sm">
                <Authors authors={props.book.authors} />
                <Genres genres={props.book.genres} />
              </div>
              <div className="col-sm">
                <MDate date={props.book.pub_date} />
                <h6 className="card-subtitle mb-2"><strong>Available Stock: </strong> {props.book.stock}</h6>
              </div>


            </div>
          </div>
        </div>
        {props.isLogedIn ? (
          <div className="col-sm-1 mr-5">
            <button type="button"
              className="btn btn-success btn-block"
              onClick={() => props.handleEditButton(props.book.id)}
            >Edit</button>
          </div>
        ) : null}
      </div>

    </div>
  );
}

function MCard(props) {
  return (
    <div className={"card my-2" + (!props.book.stock ? " text-secondary bg-light" : "")} >

      <div className="row align-items-center">

        <div className="col-sm-1 ml-5">
          <img src={props.book.cover_url} className="img-fluid" alt={props.book.title}></img>
        </div>

        <div className="col-sm">
          <div className="card-body">
            <h5 className="card-title"><u>{props.book.title}</u></h5>
            <div className="row">
              <div className="col-sm">
                <Authors authors={props.book.authors} />
                <Genres genres={props.book.genres} />
              </div>
              <div className="col-sm">
                <MDate date={props.book.pub_date} />
                <h6 className="card-subtitle mb-2"><strong>Available Stock: </strong> {props.book.stock}</h6>
              </div>


            </div>
          </div>
        </div>
        {props.isLogedIn ? (
          <div className="col-sm-1 mr-5">
            <button type="button"
              className="btn btn-success btn-block"
              onClick={() => props.handleEditButton(props.book.id)}
            >Edit</button>
          </div>
        ) : null}
      </div>

    </div>
  );
}

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.book.title,
      authors: this.props.book.authors.map(a => a.id),
      pub_date: this.props.book.pub_date,
      edition: this.props.book.edition,
      cover_url: this.props.book.cover_url,
      stock: this.props.book.stock,
      genres: this.props.book.genres.map(g => g.id),
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value

    if (name === "authors" || name === "genres") {
      let tmp = this.state[name].slice();
      tmp[0] = value;
      value = tmp;
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }

  render() {
    return (
      <div className="card my-2 py-2 px-2" >
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group ">
            <label className="col-sm-2 control-label">
              Title
          </label>
            <div className="col-sm-10">
              <input name="title" className="form-control" type="text"
                value={this.state.title} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label ">
              Author Id
          </label>
            <div className="col-sm-10">
              <input name="authors" className="form-control" type="number"
                value={this.state.authors[0]} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label ">
              Publication date
          </label>
            <div className="col-sm-10">
              <input name="pub_date" className="form-control" type="date"
                value={this.state.pub_date} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label ">
              Edition
          </label>
            <div className="col-sm-10">
              <input name="edition" className="form-control" type="number"
                value={this.state.edition} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label ">
              Cover url
          </label>
            <div className="col-sm-10">
              <input name="cover_url" className="form-control" type="text"
                value={this.state.cover_url} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label ">
              Available stock
          </label>
            <div className="col-sm-10">
              <input name="stock" className="form-control" type="number"
                value={this.state.stock} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label ">
              Genre Id
          </label>
            <div className="col-sm-10">
              <input name="genres" className="form-control" type="number"
                value={this.state.genres[0]} onChange={this.handleChange} />
            </div>
          </div>

          <button className="btn btn-primary ml-3" >Save</button>
        </form>
        <div className="row">
          <button className="btn btn-danger ml-4 mt-2" onClick={this.props.handleDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: -1
    };

    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEditButton(id) {
    this.setState({
      editable: id
    });
  }

  handleDelete() {
    const conf = {
      method: "DELETE",
      // body: JSON.stringify(params),
      headers: new Headers({
        // "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken")
      })
    };
    fetch("/api/books/" + this.state.editable, conf)
      .then(response => {
        if (response.status === 204) {
          return "Deleted!";
        }
        console.log(response);
        return `(${response.status}) Error: ${response.statusText}`;
      }).then(message => alert(message));
  }

  handleSubmit(params) {
    const conf = {
      method: "PUT",
      body: JSON.stringify(params),
      headers: new Headers({
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken")
      })
    };
    fetch("/api/books/" + this.state.editable, conf)
      .then(response => {
        if (response.status === 200) {
          return "Saved!";
        }
        console.log(response);
        return `(${response.status}) Error: ${response.statusText}`;
      }).then(message => alert(message));
  }

  render() {
    if (!this.props.data.length) {
      return <p>Nothing to show</p>;
    } else {
      return (
        <div className="container">
          <h2>
            Showing <strong>{this.props.data.length}</strong> of <strong>{this.props.total}</strong> books
        </h2>
          <hr className="my-4"></hr>
          {this.props.data.map(book => (
            book.id !== this.state.editable ? (
              <MCard
                book={book}
                isLogedIn={this.props.isLogedIn}
                handleEditButton={this.handleEditButton}
                key={book.id}
              />
            ) : (
                <CardForm
                  book={book}
                  handleSubmit={this.handleSubmit}
                  handleDelete={this.handleDelete}
                  key={book.id} />
              )
          ))}
        </div>
      );
    }
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired
};

export default Table;