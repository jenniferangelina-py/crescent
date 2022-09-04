const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = "api_key=9f2832d7fe5339ef6d5818b58c015723";

const IMG_URL = "https://image.tmdb.org/t/p/original";

async function getMoviesByKeyword(keyword) {
    var url = `${BASE_URL}/search/movie?${API_KEY}&query=${keyword}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();

    var sub_item = "";
    var movie = $("#moviebysearch");
    for (i = 0; i < data.results.length - 10; i++) {
      sub_item = `<a href="movie.html?id=${data.results[i].id}"><div class="sub-item"><img src="${IMG_URL + data.results[i].poster_path}"></div></a>`;
      movie.append(sub_item);
    }
}

async function getMoviesByKeywordTV(keyword) {
  var url = `${BASE_URL}/tv/movie?${API_KEY}&query=${keyword}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  var sub_item = "";
  var movie = $("#moviebysearch");
  for (i = 0; i < data.results.length - 10; i++) {
    sub_item = `<a href="movie.html?id=${data.results[i].id}"><div class="sub-item"><img src="${IMG_URL + data.results[i].poster_path}"></div></a>`;
    movie.append(sub_item);
  }
}

var url = window.location.href;
var new_url = new URL(url);
var keyword = new_url.searchParams.get("keyword");

getMoviesByKeyword(keyword);
getMoviesByKeywordTV(keyword);