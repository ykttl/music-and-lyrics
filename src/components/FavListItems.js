import React from "react";
import { connect } from "react-redux";
import { selectVideo } from "../Actions/youtube";
import { updateFavList, removeItem } from "../Actions/favList";
import { requestLyricsAPI } from "../Actions/lyrics";

class FavListItems extends React.Component {
  getLocalData = () => {
    const local = localStorage.getItem("favorite");
    try {
      return local && local !== null ? JSON.parse(local) : [];
    } catch (e) {
      return [];
    }
  };
  componentDidMount = () => {
    let favList = this.getLocalData();
    this.props.updateFavList(favList);
  };

  componentDidUpdate = () => {
    localStorage.setItem("favorite", JSON.stringify(this.props.favList));
  };
  selectListItem = index => {
    const selectedItem = this.props.favList[index];
    if (selectedItem.type === "youtube") {
      const selectedVideoId = selectedItem.videoId;
      this.props.selectVideo(selectedVideoId);
    } else {
      const lyricsId = selectedItem.lyricsId;
      this.props.requestLyricsAPI(lyricsId);
    }
  };
  removeItem = index => {
    this.props.removeItem(index);
  };
  render() {
    return (
      <div>
        {this.props.favList
          .map((x, index) => (
            <div>
              <button
                onClick={() => this.removeItem(index)}
                className="remove_fav_item_button"
              >
                <i className="fas fa-times-circle" />
              </button>
              <a
                href="#"
                onClick={() => this.selectListItem(index)}
                className="result_item_link"
              >
                <div key={index} className="fav_item_box">
                  <img src={x.thumb} className="fav_thumb" />
                  <div className="fav_description_box">
                    <p> {x.title}</p>
                  </div>
                </div>
              </a>
            </div>
          ))
          .reverse()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    favList: state.favList.favList,
    searchResult: state.lyrics.searchResult
  };
};

const mapDispatchToProps = dispatch => ({
  updateFavList: favList => {
    dispatch(updateFavList(favList));
  },
  selectVideo: selectedVideoId => {
    dispatch(selectVideo(selectedVideoId));
  },
  requestLyricsAPI: lyricsId => {
    dispatch(requestLyricsAPI(lyricsId));
  },
  removeItem: index => {
    dispatch(removeItem(index));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavListItems);
