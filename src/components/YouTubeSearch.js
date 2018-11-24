import React from "react";
import { connect } from "react-redux";
import { inputKeyword, requestAPI } from "../Actions/youtube";

class YouTubeSearch extends React.Component {
  inputKeyword = e => {
    const keyword = e.target.value;
    this.props.inputKeyword(keyword);
  };
  searchYouTube = () => {
    const keyword = this.props.keyword;
    this.props.requestAPI(keyword);
  };
  onKeyPress = e => {
    if (e.which === 13) {
      this.searchYouTube();
    }
  };
  render() {
    return (
      <div className="search_area_box">
        <h3>YouTube</h3>
        <input
          type="text"
          onChange={this.inputKeyword}
          onKeyPress={this.onKeyPress}
        />
        <button onClick={this.searchYouTube} className="search_button">
          <i class="fas fa-search" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    keyword: state.youtube.keyword,
    searchResult: state.youtube.searchResult
  };
};

const mapDispatchToProps = dispatch => ({
  requestAPI: keyword => {
    dispatch(requestAPI(keyword));
  },
  inputKeyword: keyword => {
    dispatch(inputKeyword(keyword));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTubeSearch);
