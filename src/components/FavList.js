import React from "react";
import { connect } from "react-redux";
import FavListItems from "./FavListItems";

class FavList extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.showFavList
            ? "box box_fav_list_show"
            : "box box_fav_list_hide"
        }
      >
        {this.props.showFavList && (
          <div>
            <h3>Favorite List</h3>
            {this.props.favList.length === 0 ? (
              <p className="no_fav_items_message">
                There is no favorite item yet.
              </p>
            ) : (
              <p />
            )}

            <FavListItems />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    favList: state.favList.favList,
    showFavList: state.favList.showFavList
  };
};

export default connect(mapStateToProps)(FavList);
