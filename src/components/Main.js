import React from "react";
import LyricsSearch from "./LyricsSearch";
import YouTubeSearch from "./YouTubeSearch";
import MusicPlayer from "./MusicPlayer";
import YouTubeSearchResult from "./YouTubeSearchResult";
import LyricsSearchResult from "./LyricsSearchResult";
import DisplayLyrics from "./DisplayLyrics";
import FavList from "./FavList";
import Header from "./Header";

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="box">
            <YouTubeSearch />
            <MusicPlayer />
            <YouTubeSearchResult />
          </div>
          <div className="box">
            <LyricsSearch />
            <DisplayLyrics />
            <LyricsSearchResult />
          </div>
          <FavList />
        </div>
      </div>
    );
  }
}
