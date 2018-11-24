import React from "react";
import { connect } from "react-redux";
import { selectVideo } from "../Actions/youtube";

class YouTubeSearchResult extends React.Component {
  selectVideo = index => {
    const selectedVideoId = this.props.searchResult[index].videoId;
    this.props.selectVideo(selectedVideoId);
  };
  render() {
    return (
      <div id="youtube_result_top">
        {this.props.searchResult.map((item, index) => (
          <a href="#jump" className="result_item_link">
            <div
              key={index}
              onClick={() => this.selectVideo(index)}
              className="result_item_box"
            >
              <img src={item.thumb} />
              <div className="description_box">
                <p>{item.title}</p>
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
    searchResult: state.youtube.searchResult,
    musicPlayer: state.youtube.musicPlayer
  };
};
const mapDispatchToProps = dispatch => ({
  selectVideo: selectedVideoId => {
    dispatch(selectVideo(selectedVideoId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTubeSearchResult);
