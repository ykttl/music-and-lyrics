import keys from "../keys";

export const inputKeyword = keyword => ({
  type: "INPUT_KEYWORD_LYRICS",
  keyword
});

export const receiveAPI = json => {
  const data = json.message.body.track_list;
  let searchResult = [];

  if (json.message.header.available === 0) {
    searchResult = [{ title: "No result :(  Please try different keyword." }];
  } else {
    const filteredData = Object.keys(data)
      .filter(
        key =>
          !data[key].track.track_name.includes("Karaoke") &&
          !data[key].track.artist_name.includes("Karaoke")
      )
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    Object.keys(filteredData).forEach(key =>
      searchResult.push({
        lyricsId: data[key].track.track_id,
        artist: data[key].track.artist_name,
        title: data[key].track.track_name,
        thumb: data[key].track.album_coverart_100x100,
        type: "lyrics",
        favorite: false
      })
    );
  }
  return {
    type: "RECEIVE_API_LYRICS",
    searchResult
  };
};

export const requestAPI = keyword => dispatch =>
  fetch(
    `https://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${keyword}&apikey=${
      keys.lyricsAPI
    }&format=jsonp&callback=jsonp_callback&page_size=15`
  )
    .then(response => response.text())
    .then(responseText => {
      const match = responseText.replace(/^jsonp_callback\(|\)\;/g, "");
      return match;
    })
    .then(text => JSON.parse(text))
    .then(json => dispatch(receiveAPI(json)));

export const receiveSelectedLyricsAPI = json => {
  let lyrics;
  if (
    json.message.body.lyrics === undefined ||
    json.message.body.lyrics.lyrics_body === ""
  ) {
    lyrics = " Sorry, no Lyrics :( ";
  } else {
    lyrics = json.message.body.lyrics.lyrics_body;
  }
  return {
    type: "RECEIVE_SELECTED_LYRICS_API",
    lyrics
  };
};

const saveLyricsId = lyricsId => ({
  type: "SAVE_LYRICS_ID",
  lyricsId
});

export const requestLyricsAPI = lyricsId => {
  return dispatch => {
    dispatch(saveLyricsId(lyricsId));

    return fetch(
      `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${lyricsId}&apikey=${
        keys.lyricsAPI
      }&format=jsonp&callback=jsonp_callback`
    )
      .then(response => response.text())
      .then(responseText => {
        const match = responseText.replace(/^jsonp_callback\(|\)\;/g, "");
        return match;
      })
      .then(text => JSON.parse(text))
      .then(json => dispatch(receiveSelectedLyricsAPI(json)));
  };
};
