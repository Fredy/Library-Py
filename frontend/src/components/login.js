import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./dataProvider";
import Table from "./table";

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
}

function CSRFToken() {
  let csrftoken = getCookie("csrftoken");
  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
  );
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      endpoint: "admin",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    const { user, password } = this.state;
    const lead = { user, password };
    const conf = {
      method: "post",
      body: JSON.stringify(lead),
      headers: new Headers({
        "Content-Type": "application/json",
      })
    };
    fetch(this.state.endpoint, conf).then(response => console.log(response));
  }

  renderTable(data, totalData) {
    return <Table data={data} total={totalData} isLogedIn={false} />
  }

  render() {
    return (
      <div className="text-center">
        <form className="form-login" method="POST">
          <CSRFToken />
          <h1> Admin login </h1>
          <hr className="my-4"></hr>
          <div className="form-group">
            <label htmlFor="inputAccount" className="sr-only">Account</label>
            <input type="text" id="inputAccount" className="form-control" placeholder="Account" required="" autoFocus=""
              name="user"
              value={this.state.user}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </div>
        </form>


      </div>
    );
  }
}

// Render the app.
const wrapper = document.getElementById("login");
wrapper ? ReactDOM.render(<Login />, wrapper) : null;

