import React from "react";
import { connect } from "react-redux";
import { requestLyricsAPI } from "../Actions/lyrics";

class LyricsSearchResult extends React.Component {
  selectSong = index => {
    const lyricsId = this.props.searchResult[index].lyricsId;
    this.props.requestLyricsAPI(lyricsId);
  };
  render() {
    return (
      <div id="lyrics_result_top">
        {this.props.searchResult.map((x, index) => (
          <a href="#jump" className="result_item_link">
            <div
              key={index}
              onClick={() => this.selectSong(index)}
              className="result_item_box"
            >
              <img src={x.thumb} />

              <div className="description_box">
                <p className="title"> {x.title}</p>
                <p className="artist"> {x.artist}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResult: state.lyrics.searchResult
  };
};
const mapDispatchToProps = dispatch => ({
  requestLyricsAPI: lyricsId => {
    dispatch(requestLyricsAPI(lyricsId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LyricsSearchResult);
