const BASE_URL = "https://api.themoviedb.org/3";

const ACTION = "/discover/movie?with_genres=28&";
const ADVENTURE = "/discover/movie?with_genres=12&";
const ANIMATION = "/discover/movie?with_genres=16&";
const COMEDY = "/discover/movie?with_genres=35&";
const DRAMA = "/discover/movie?with_genres=18&";
const FANTASY = "/discover/movie?with_genres=14&";
const HISTORY = "/discover/movie?with_genres=36&";
const ROMANCE = "/discover/movie?with_genres=10749&";
const SCIENCE_FICTION = "/discover/movie?with_genres=878&";

const POPULARITY = "/discover/movie?sort_by=popularity.desc&";

const API_KEY = "api_key=9f2832d7fe5339ef6d5818b58c015723";

const ACTION_POPULARITY = BASE_URL + ACTION + POPULARITY + API_KEY;
const ADVENTURE_POPULARITY = BASE_URL + ADVENTURE + POPULARITY + API_KEY;
const ANIMATION_POPULARITY = BASE_URL + ANIMATION + POPULARITY + API_KEY;
const COMEDY_POPULARITY = BASE_URL + COMEDY + POPULARITY + API_KEY;
const DRAMA_POPULARITY = BASE_URL + DRAMA + POPULARITY + API_KEY;
const FANTASY_POPULARITY = BASE_URL + FANTASY + POPULARITY + API_KEY;
const HISTORY_POPULARITY = BASE_URL + HISTORY + POPULARITY + API_KEY;
const ROMANCE_POPULARITY = BASE_URL + ROMANCE + POPULARITY + API_KEY;
const SCIENCEFICTION_POPULARITY = BASE_URL + SCIENCE_FICTION + POPULARITY + API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/original";

async function getMovies(url, genre) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results, genre);
}

function showMovies(data, genre) {
    var sub_item = "";
    var genre = $(`#${genre}`);
    for (i = 0; i < data.length - 10; i++) {
        sub_item = `<div class="sub-item"><img src="${IMG_URL + data[i].poster_path}"></div>`;
        genre.append(sub_item);
    }
}

getMovies(ACTION_POPULARITY, "action");
getMovies(ADVENTURE_POPULARITY, "adventure");
getMovies(ANIMATION_POPULARITY, "animation");
getMovies(COMEDY_POPULARITY, "comedy");
getMovies(DRAMA_POPULARITY, "drama");
getMovies(FANTASY_POPULARITY, "fantasy");
getMovies(HISTORY_POPULARITY, "history");
getMovies(ROMANCE_POPULARITY, "romance");
getMovies(SCIENCEFICTION_POPULARITY, "sciencefiction");