import keys from '../keys';

export const inputKeyword = keyword => {
  return {
    type: 'INPUT_KEYWORD_YOUTUBE',
    keyword
  };
};

export const receiveAPI = json => {
  let items = json.items;
  let searchResult = [];
  console.log(json);

  if (json.pageInfo.totalResults === 0) {
    searchResult = [{ title: 'No result :(  Please try different keyword.' }];
  } else {
    items.forEach(x =>
      searchResult.push({
        videoId: x.id.videoId,
        title: x.snippet.title,
        thumb: x.snippet.thumbnails.default.url,
        type: 'youtube'
      })
    );
  }
  return {
    type: 'RECEIVE_API_YOUTUBE',
    searchResult
  };
};

export const selectVideo = selectedVideoId => {
  return {
    type: 'SELECT_VIDEO',
    selectedVideoId
  };
};

export const requestAPI = keyword => {
  return dispatch => {
    return fetch(
      `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${keyword}&key=${
        keys.youtubeAPI
      }&maxResults=15`
    )
      .then(response => response.json())
      .then(json => dispatch(receiveAPI(json)));
  };
};
