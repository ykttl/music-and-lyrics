const initialState = {
  keyword: "",
  searchResult: [],
  lyrics: "",
  lyricsId: ""
};

const lyricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_KEYWORD_LYRICS":
      return {
        ...state,
        keyword: action.keyword
      };
    case "RECEIVE_API_LYRICS":
      return {
        ...state,
        searchResult: action.searchResult,
        lyrics: ""
      };
    case "RECEIVE_SELECTED_LYRICS_API":
      return {
        ...state,
        lyrics: action.lyrics
      };
    case "SAVE_LYRICS_ID":
      return {
        ...state,
        lyricsId: action.lyricsId
      };
    default:
      return state;
  }
};

export default lyricsReducer;
