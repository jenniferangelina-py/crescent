const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = "api_key=9f2832d7fe5339ef6d5818b58c015723";

const IMG_URL = "https://image.tmdb.org/t/p/original";

async function getMovie(id) {
    var url = `${BASE_URL}/movie/${id}?${API_KEY}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    
    var title = `${data.title}`;
    $("#title").text(title);

    var genres = "";
    for (i = 0; i < data.genres.length; i++) {
      if (i == 0) {
        genres += data.genres[i].name;
      }
      if (i !== 0) {
        genres += " ⋆ " + data.genres[i].name;
      }
    }
    $("#genres").text(genres);

    var img = `${IMG_URL + data.backdrop_path}`;
    $("#image").attr('src', img);

    var overview = `${data.overview}`;
    $("#overview").text(overview);
  }

async function getRelatedMovies(id) {
  var url = `${BASE_URL}/movie/${id}/similar?${API_KEY}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  var sub_item = "";
  var relatedMovies = $("#relatedMovies");
  for (i = 0; i < data.results.length - 10; i++) {
    sub_item = `<a href="movie.html?id=${data.results[i].id}"><div class="sub-item"><img src="${IMG_URL + data.results[i].poster_path}"></div></a>`;
    relatedMovies.append(sub_item);
  }

  console.log(data.results[1]);
}

async function getMovieCredits(id) {
  var url = `${BASE_URL}/movie/${id}/credits?${API_KEY}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  var sub_item = "";
  var cast = $("#cast");
  var castnames = $("#castnames");
  for (i = 0; i < data.cast.length; i++) {
    var image = data.cast[i].profile_path !== null ? IMG_URL + data.cast[i].profile_path : "public/anonim.png";
    if (data.cast[i].known_for_department == "Acting") {
      sub_item = `<div class="castdiv"><img class="castimg" src="${image}"><p>${data.cast[i].name} as ${data.cast[i].character}</p></div>`;
      cast.append(sub_item);
    }
  }
}

// https://api.themoviedb.org/3/movie/616037?api_key=9f2832d7fe5339ef6d5818b58c015723
// https://api.themoviedb.org/3/movie/616037/similar?api_key=9f2832d7fe5339ef6d5818b58c015723
// https://api.themoviedb.org/3/movie/616037/credits?api_key=9f2832d7fe5339ef6d5818b58c015723

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

// async function getMovies(url, genre) {
//   const res = await fetch(url);
//   const data = await res.json();
//   showMovies(data.results, genre);
// }

getMovie(id);

getRelatedMovies(id);

getMovieCredits(id);

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