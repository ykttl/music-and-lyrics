export const updateFavList = favList => {
  return {
    type: "UPDATE_FAV_LIST",
    favList
  };
};

export const removeItem = index => ({
  type: "REMOVE_ITEM",
  index
});
export const toggleFavList = () => ({
  type: "TOGGLE_FAV_LIST"
});
