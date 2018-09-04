import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../Context";
import Spinner from "../layout/Spinner";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      trackTitle: "",
      apiKey: "9b89e43c07f4ce6ee5d62701ee3e1270",
      loading: false
    };
  }

  findTrack = (dispatch, e) => {
    e.preventDefault();
    this.setState({ loading: true });
    axios(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
        this.state.trackTitle
      }&page_size=10&page=1&s_track_rating=desc
            &apikey=${this.state.apiKey}`
    )
      .then(res => {
        this.setState({ loading: false });
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> &nbsp; Search for a Song...
              </h1>
              <p className="lead">Get the lyrics of any song...</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song Title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={e =>
                      this.setState({ trackTitle: e.target.value })
                    }
                  />
                  <br />
                  <button
                    className="btn btn-primary btn-lg btn-block mb-5"
                    type="submit"
                  >
                    Get the Lyrics
                  </button>
                  {this.state.loading ? <Spinner /> : null}
                </div>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Search;
