import React from "react";
import { connect } from "react-redux";
import { inputKeyword, requestAPI, requestLyricsAPI } from "../Actions/lyrics";

class LyricsSearch extends React.Component {
  inputKeyword = e => {
    const keyword = e.target.value;
    this.props.inputKeyword(keyword);
  };
  searchLyrics = () => {
    const keyword = this.props.keyword;
    this.props.requestAPI(keyword);
  };
  onKeyPress = e => {
    if (e.which === 13) {
      this.searchLyrics();
    }
  };
  render() {
    return (
      <div className="search_area_box">
        <h3>Lyrics</h3>

        <input
          type="text"
          onChange={this.inputKeyword}
          onKeyPress={this.onKeyPress}
        />
        <button onClick={this.searchLyrics} className="search_button">
          <i class="fas fa-search" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    keyword: state.lyrics.keyword
  };
};

const mapDispatchToProps = dispatch => ({
  requestAPI: keyword => {
    dispatch(requestAPI(keyword));
  },
  inputKeyword: keyword => {
    dispatch(inputKeyword(keyword));
  },
  requestLyricsAPI: lyricsId => {
    dispatch(requestLyricsAPI(lyricsId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LyricsSearch);
