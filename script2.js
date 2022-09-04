const BASE_URL = "https://api.themoviedb.org/3";

// https://api.themoviedb.org/3/discover/movie?with_genres=28&/discover/movie?sort_by=popularity.desc&api_key=9f2832d7fe5339ef6d5818b58c015723

const ACTION = "/discover/tv?with_genres=28&";
const ADVENTURE = "/discover/tv?with_genres=12&";
const ANIMATION = "/discover/tv?with_genres=16&";
const COMEDY = "/discover/tv?with_genres=35&";
const DRAMA = "/discover/tv?with_genres=18&";
const FANTASY = "/discover/tv?with_genres=14&";
const HISTORY = "/discover/tv?with_genres=36&";
const ROMANCE = "/discover/tv?with_genres=10749&";
const SCIENCE_FICTION = "/discover/movie?with_genres=878&";

const POPULARITY = "/discover/tv?sort_by=popularity.desc&";

const PG13 = "certification_country=US&certification=PG-13&"

const API_KEY = "api_key=9f2832d7fe5339ef6d5818b58c015723";

const ACTION_POPULARITY = BASE_URL + ACTION + POPULARITY + PG13 + API_KEY;
const ADVENTURE_POPULARITY = BASE_URL + ADVENTURE + POPULARITY + PG13 + API_KEY;
const ANIMATION_POPULARITY = BASE_URL + ANIMATION + POPULARITY + PG13 + API_KEY;
const COMEDY_POPULARITY = BASE_URL + COMEDY + POPULARITY + PG13 + API_KEY;
const DRAMA_POPULARITY = BASE_URL + DRAMA + POPULARITY + PG13 + API_KEY;
const FANTASY_POPULARITY = BASE_URL + FANTASY + POPULARITY + PG13 + API_KEY;
const HISTORY_POPULARITY = BASE_URL + HISTORY + POPULARITY + PG13 + API_KEY;
const ROMANCE_POPULARITY = BASE_URL + ROMANCE + POPULARITY + PG13 + API_KEY;
const SCIENCEFICTION_POPULARITY = BASE_URL + SCIENCE_FICTION + POPULARITY + PG13 + API_KEY;

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
        sub_item = `<a href="tv.html?id=${data[i].id}"><div class="sub-item"><img src="${IMG_URL + data[i].poster_path}"></div></a>`;
        genre.append(sub_item);
    }
}

async function login() {

    var username = $("#login_username").val();
    var password = $("#login_password").val();

    showLoading();
    hideLoginResult();

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/login",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        data: {
            username: username,
            password: password
        },
        success: function (response) {
            hideLoading();
            console.log(response);
            if (response.statusCode == 200) {
                writeCookie("login_username", response.username, 365);
                showValid();
                location.reload();
            }
            if (response.statusCode == 401) {
                showInvalid();
            }
        },
        error: function () {
            hideLoading();
            console.log("error");
        }
    });
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

// bukan cara yang baik kata fel

function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

async function signup() {
    var email = $("#signup_email").val();
    var username = $("#signup_username").val();
    var password = $("#signup_password").val();
    console.log(email);
    console.log(username);
    console.log(password);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/signup",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        data: {
            email: email,
            username: username,
            password: password
        },
        success: function (response) {
                console.log(response);
                if (response.statusCode == 200) {
                    alert("Signup berhasil.");
                    writeCookie("login_username", response.username, 365);

                }

                if (response.statusCode == 409) {
                    alert(response.message);
                
                }
        },
        error: function () {
                console.log("error");
        }
    });
}

function showLoading() {
    $("#btn_signin").hide();
    $("#btn_loading").show();
}

function hideLoading() {
    $("#btn_signin").show();
    $("#btn_loading").hide();
}

hideLoading();

function showInvalid() {
    $("#invalid").show();
}

function showValid() {
    $("#valid").show();
}

function hideLoginResult() {
    $("#invalid").hide();
    $("#valid").hide();
}

hideLoginResult();

$("#login_username").keyup(function(event) {
    if (event.keyCode === 13) {
        login();
    }
});

$("#login_password").keyup(function(event) {
    if (event.keyCode === 13) {
        login();
    }
});

function hideSignupLogin() {
    $("#btn_signup2").hide();
    $("#btn_login2").hide();
}

console.log(readCookie("login_username"));

if (readCookie("login_username") == null || readCookie("login_username") == "") {
    hideLogout();
} else {
    hideSignupLogin();
}

function logout() {
    eraseCookie("login_username");
    location.reload();
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function hideLogout() {
    $("#btn_logout").hide();
}

function search(keyword) {
    console.log(keyword);
    window.location.href = "search.html?keyword="+keyword;
}

$("#search").keyup(function(event) {
    if (event.keyCode === 13) {
        var keyword = $("#search").val();
        search(keyword);
    }
  });