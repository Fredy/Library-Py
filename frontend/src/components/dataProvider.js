import React from "react";
import PropTypes from "prop-types";

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
}

class CreateNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      authors: [0],
      pub_date: "2000-01-01",
      edition: "1",
      cover_url: "",
      stock: "0",
      genres: [0],
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
    const conf = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: new Headers({
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken")
      })
    };
    fetch("/api/books/add", conf)
      .then(response => {
        if (response.status === 201) {
          return "Saved!";
        }
        console.log(response);
        return `(${response.status}) Error: ${response.statusText}`;
      }).then(message => alert(message));
  }

  render() {
    return (
      <div>
        <h1> Create New</h1>
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
      </div>
    );
  }
}

class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      loaded: false,
      placeholder: "loading...",
      nextUrl: "",
      prevUrl: ""
    };

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  fetchData(url) {
    let params = {};
    if (!url.search) {
      const { title, author, pubStart, pubEnd } = this.props.params;
      if (title) {
        params.title = title;
      }
      if (author) {
        params.author = author;
      }
      if (pubStart) {
        params.pubStart = pubStart;
      }
      if (pubEnd) {
        params.pubEnd = pubEnd;
      }
      url.search = new URLSearchParams(params);
    }

    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          data: data.results,
          total: data.count,
          loaded: true,
          nextUrl: data.next,
          prevUrl: data.previous
        })
      });
  }

  componentDidMount() {
    let url = new URL(this.props.endpoint, window.location.origin);
    this.fetchData(url);
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    const prevParams = prevProps.params;
    if (params.title !== prevParams.title
      || params.author !== prevParams.author
      || params.pubStart !== prevParams.pubStart
      || params.pubEnd !== prevParams.pubEnd) {
      let url = new URL(this.props.endpoint, window.location.origin);
      this.fetchData(url);
    }
  }

  prevPage() {
    const prevUrl = this.state.prevUrl;
    if (!prevUrl) {
      return;
    }

    this.setState({
      loaded: false
    });

    let url = new URL(prevUrl);
    this.fetchData(url)
  }

  nextPage() {
    const nextUrl = this.state.nextUrl;
    if (!nextUrl) {
      return;
    }

    this.setState({
      loaded: false
    });

    let url = new URL(nextUrl);
    this.fetchData(url)
  }

  render() {
    const { data, total, loaded, placeholder } = this.state;
    let view;
    if (loaded) {
      view = (
        <div>
          {"isLogedIn" in this.props && this.props.isLogedIn ? <CreateNew /> : null}
          {this.props.render(data, total, this.props.isLogedIn)}
          <div className="container">
            <div className="col-lg-4 mx-auto">
              <div className="row justify-content-around">
                <div className="col">
                  <button type="button"
                    className="btn btn-primary btn-block mb-2"
                    onClick={this.prevPage}
                    disabled={!Boolean(this.state.prevUrl)}
                  >Previus page </button>
                </div>
                <div className="col">
                  <button type="button"
                    className="btn btn-secondary btn-block"
                    onClick={this.nextPage}
                    disabled={!Boolean(this.state.nextUrl)}
                  >Next page</button>
                </div>

              </div>
            </div>
          </div>
        </div >
      )
    } else {
      view = <p>{placeholder}</p>;
    }
    return view;
  }

}

DataProvider.propTypes = {
  endpoint: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

export default DataProvider;