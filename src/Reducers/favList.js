const initialState = {
  favList: [],
  showFavList: true
};

const favList = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FAV_LIST":
      return {
        ...state,
        favList: action.favList.filter(item => item !== null)
      };
    case "REMOVE_ITEM":
      const index = action.index;
      const itemToRemove = state.favList[index];
      return {
        ...state,
        favList: state.favList.filter(item => item !== itemToRemove)
      };
    case "TOGGLE_FAV_LIST":
      return {
        ...state,
        showFavList: !state.showFavList
      };

    default:
      return state;
  }
};

export default favList;
