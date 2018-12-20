import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./dataProvider";
import Table from "./table";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      pubStart: "",
      pubEnd: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value

    if (name === "pubStart" || name === "pubEnd") {
      if (isNaN(value)) {
        return;
      }
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, author, pubStart, pubEnd } = this.state;
    if (!title && !author && !pubStart && !pubEnd) {
      return;
    }
    this.props.onSubmit(title, author, pubStart, pubEnd)
  }

  render() {
    return (
      <div className="jumbotron text-center" id="mainNav">
        <div className="container">
          <h1 className="jumbotron-heading">My library</h1>
          <hr className="my-4 col-6"></hr>
          <div className="col-md order-md-1">
            <p className="lead">Search Books</p>

            <form className="col-md-6 mx-auto" onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <input type="text" className="form-control text-center" placeholder="By Title"
                  name="title" value={this.state.title} onChange={this.handleChange}
                />
              </div>
              <div className="form-group row">
                <input type="text" className="form-control text-center" id="author" placeholder="By Author"
                  name="author" value={this.state.author} onChange={this.handleChange}
                />
              </div>
              <div className="row justify-content-center">
                <span className="text-secondary">Publication date</span>
              </div>
              <div className="form-group row justify-content-center">
                <input type="text" className="col-sm-2 form-control text-center" id="date_start" maxLength="4"
                  name="pubStart" value={this.state.pubStart} onChange={this.handleChange}
                />
                <span className="col-sm-1 col-form-label">-</span>
                <input type="text" className="col-sm-2 form-control text-center" id="date_end" maxLength="4"
                  name="pubEnd" value={this.state.pubEnd} onChange={this.handleChange}
                />
              </div>
              <div className="form-group row justify-content-center">
                <button type="submit" className="btn btn-primary mb-2">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>);
  }
}

class AppAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(title, author, pubStart, pubEnd) {
    this.setState({
      params: {
        title: title,
        author: author,
        pubStart: pubStart,
        pubEnd: pubEnd,
      }
    });
  }

  renderTable(data, totalData, isLogedIn) {
    return <Table data={data} total={totalData} isLogedIn={isLogedIn}/>
  }

  render() {
    return (
      <div className="container pb-2">
        <SearchInput
          onSubmit={this.handleSubmit}
        />

        <DataProvider
          isLogedIn={true}
          endpoint="api/books"
          render={this.renderTable}
          params={this.state.params}
        />
      </div>
    );
  }
}

// Render the app.
const wrapper = document.getElementById("appAdmin");
wrapper ? ReactDOM.render(<AppAdmin />, wrapper) : null;