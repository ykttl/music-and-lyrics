import React from "react";
import { connect } from "react-redux";
import { updateFavList, removeItem } from "../Actions/favList";

class DisplayLyrics extends React.Component {
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
    const lyricsId = this.props.lyricsId;
    const index = Object.keys(searchResult).filter(
      key => searchResult[key].lyricsId === lyricsId
    );
    const favoriteItem = searchResult[index];
    const result = favList.push(favoriteItem);
    localStorage.setItem("favorite", JSON.stringify(favList));
    this.props.updateFavList(favList);
  };
  render() {
    return (
      <div className="lyrics_box">
        {this.props.error && <p>error</p>}

        {this.props.lyrics && (
          <div>
            <button onClick={this.addFavList} className="fav_button">
              <i className="far fa-heart" />
            </button>

            <div id="jump2" className="main_content lyrics">
              {this.props.lyrics.replace("\n,[object Object]", <br />)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lyrics: state.lyrics.lyrics,
    searchResult: state.lyrics.searchResult,
    lyricsId: state.lyrics.lyricsId,
    favList: state.favList.favList,
    error: state.lyrics.error
  };
};
const mapDispatchToProps = dispatch => ({
  updateFavList: favList => {
    dispatch(updateFavList(favList));
  },
  removeItem: index => {
    dispatch(removeItem(index));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayLyrics);
