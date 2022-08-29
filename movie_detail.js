const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = "api_key=9f2832d7fe5339ef6d5818b58c015723";

async function getMovie(id) {
    var url = `${BASE_URL}/movie/${id}?${API_KEY}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log("adult:" + data.adult);
  }

var url = window.location.href;
var new_url = new URL(url);
var id = new_url.searchParams.get("id");

//   function showMovies(data, genre) {
//     var sub_item = "";
//     var genre = $(`#${genre}`);
//     for (i = 0; i < data.length - 10; i++) {
//         sub_item = `<a href="movie.html?id=${data[i].id}"><div class="sub-item"><img src="${IMG_URL + data[i].poster_path}"></div></a>`;
//         genre.append(sub_item);
//     }
// }

  getMovie(id);