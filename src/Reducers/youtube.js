const initialState = {
  keyword: "",
  searchResult: [],
  selectedVideoId: "",
  musicPlayer: false,
  favData: []
};

const youtubeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_KEYWORD_YOUTUBE":
      return {
        ...state,
        keyword: action.keyword
      };
    case "RECEIVE_API_YOUTUBE":
      return {
        ...state,
        searchResult: action.searchResult,
        musicPlayer: false
      };
    case "SELECT_VIDEO":
      return {
        ...state,
        selectedVideoId: action.selectedVideoId,
        musicPlayer: true
      };
    default:
      return state;
  }
};

export default youtubeReducer;
