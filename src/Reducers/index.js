import { combineReducers } from "redux";
import youtubeReducer from "./youtube";
import lyricsReducer from "./lyrics";
import favList from "./favList";

const reducers = combineReducers({
  youtube: youtubeReducer,
  lyrics: lyricsReducer,
  favList
});

export default reducers;
