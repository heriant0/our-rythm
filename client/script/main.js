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
}

function afterLogin() {
  $(".form-login").hide();
  $(".form-register").hide();
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
}
