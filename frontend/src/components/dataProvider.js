import React from "react";
import PropTypes from "prop-types";

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
          {this.props.render(data, total)}
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