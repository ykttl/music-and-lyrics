import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { updateFavList } from "../Actions/favList";

class MusicPlayer extends React.Component {
  onReady = event => {
    event.target.playVideo();
  };
  getLocalData = () => {
    const local = localStorage.getItem("favorite");
    try {
      return local ? JSON.parse(local) : [];
    } catch (e) {
      return [];
    }
  };
  addFavList = () => {
    let favList = this.getLocalData();
    const searchResult = this.props.searchResult;
    const selectedVideoId = this.props.selectedVideoId;
    const index = Object.keys(searchResult).filter(
      key => searchResult[key].videoId === selectedVideoId
    );
    const favoriteItem = searchResult[index];
    const result = favList.push(favoriteItem);
    localStorage.setItem("favorite", JSON.stringify(favList));

    this.props.updateFavList(favList);
  };
  render() {
    return (
      <div>
        {this.props.musicPlayer && (
          <div>
            <button onClick={this.addFavList} className="fav_button">
              <i class="far fa-heart" />
            </button>
            <YouTube
              videoId={this.props.selectedVideoId}
              onReady={this.onReady}
              className="main_content video"
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    musicPlayer: state.youtube.musicPlayer,
    selectedVideoId: state.youtube.selectedVideoId,
    searchResult: state.youtube.searchResult
  };
};

const mapDispatchToProps = dispatch => ({
  updateFavList: favList => {
    dispatch(updateFavList(favList));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPlayer);
