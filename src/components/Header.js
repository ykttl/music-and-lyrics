import React from "react";
import { connect } from "react-redux";
import { toggleFavList } from "../Actions/favList";

class Header extends React.Component {
  favListButton = () => {
    this.props.toggleFavList();
  };
  render() {
    return (
      <div className="header" id="jump">
        <h1>Music and Lyrics</h1>
        <button className="fav_list_button" onClick={this.favListButton}>
          {this.props.showFavList ? "Hide Fav List" : "Show Fav List"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showFavList: state.favList.showFavList
});

const mapDispatchToProps = dispatch => ({
  toggleFavList: () => {
    dispatch(toggleFavList());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
