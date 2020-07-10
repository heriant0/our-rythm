$(document).ready(function () {
  if (localStorage.token) {
    afterLogin()
  } else {
    beforeLogin()
  }
})

function beforeLogin() {
  $(".form-login").show();
  $(".form-register").hide();
  $("#navbar").hide();
}

function afterLogin() {
  $(".form-login").hide();
  $(".form-register").hide();
  $("#navbar").show();
}

function callRegister() {
  $(".form-register").show();
  $(".form-login").hide();
}

function registerProcess() {
  event.preventDefault();

  const username = $("#userName").val()
  const email = $("#emailRegister").val()
  const password = $("#passwordRegister").val()

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/register",
    data: {
      name: username,
      email: email,
      password: password
    }
  })
    .done((result) => {
      console.log("register done")
      $(".form-login").show();
      $(".form-register").hide();

    })
    .fail(err => {
      console.log("Error:", err.responseJSON.message)
    })
    .always(() => {
      $("#userName").val('')
      $('#emailRegister').val('')
      $('#passwordRegister').val('')
    })
}

function loginProcess(event) {
  event.preventDefault();

  const email = $("#emailLogin").val()
  const password = $("#passwordLogin").val()

  console.log(email, password);

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/login",
    data: { email: email, password: password }
  })
    .done((result) => {
      console.log(result, 'hasil login ajax');
      localStorage.token = result.access_token;
      $(".form-login").hide();
    })
    .fail((err) => {
      console.log(err, 'error ajax login');
    })
    .always((_) => {
      $("#emailLogin").val('')
      $("#passwordLogin").val('')
    })
}

function logoutProcess() {
  localStorage.clear();
  $(".form-login").show();
  $(".form-register").hide();
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();
}

function onSignIn(googleUser) {
  let google_token = googleUser.getAuthResponse().id_token;
  console.log('test login')
  $.ajax({
    method: "post",
    url: 'http://localhost:3000/googleSignIn',
    headers: { google_token }
  })
    .done(data => {
      localStorage.setItem('token', data.token)
      afterLogin()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function getDezeer(event) {
  event.preventDefault()
  let songs = $("#search").val()
  console.log(songs);
  console.log('check dezeeer')
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/api/${songs}`,
  })
    .done(data => {
      $('.list-music').empty()
      data.forEach(playlist => {
        $('.list-music').append(`
            <div class="card" style="width: 18rem;">
              <img src="${playlist.picture}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${playlist.title}</h5>

                <a href="${playlist.preview}" target="blank" class="btn btn-primary btn-md">Play</a>
                <a href="#" onclick="mailgun()" class="btn btn-primary btn-md">Send Email</a>
              </div>
            </div>
        `)
      });


      console.log((data));
      afterLogin()
    })
    .fail(err => {
      console.log(err.responseJSON)
    })
}

function mailgun(id){
  console.log("<<<<<<<<<<<<< tets send")
  $.ajax({
    method: "post",
    url: `http://localhost:3000/sendmail/`,
    data: {
      subject: id,
      html: id
    }
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
}