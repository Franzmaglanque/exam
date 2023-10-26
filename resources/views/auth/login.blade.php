@extends('layouts.login')

@section('content')
<main class="form-signin w-100 m-auto">
  <!-- <form> -->
  <form action="#" id="loginFrm" name="loginFrm" class="form-horizontal">
    @csrf
    <!-- <h1 class="h3 mb-3 fw-normal">Please sign in</h1> -->
    <h5 class="content-group"><b style="font-size: 20px; color: #2E7D32;">E</b>lite <b style="font-size: 20px; color: #2E7D32;">E</b>xam </h5>
    <small><b>Login to your account</b></small>

    <div class="form-floating">
      <!-- <input type="email" class="form-control" id="floatingInput" placeholder="Employee No."> -->
      <input type="text" id="usernameTxt" name="usernameTxt" placeholder="Username" class="form-control">

      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <!-- <input type="password" class="form-control" id="floatingPassword" placeholder="Password"> -->
      <input type="password" id="passwordTxt" name="passwordTxt" placeholder="Password" class="form-control">
      <label for="floatingPassword">Password</label>
    </div>

    <!-- <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button> -->
    <button id="loginBtn" name="loginBtn" class="btn btn-primary btn-block" onclick="" >LOGIN</button>

    <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p> -->
  </form>
</main>


<script type="text/javascript">
$("#loginFrm").submit(function(e){
        e.preventDefault();
});

$("#loginBtn").on('click',function(){
    proc.login();
})
var proc = {
        'login': function () {
            // if ($('#loginFrm').valid()) {
                console.log($('#loginFrm').serialize());
                $.ajax({
                    type: 'POST',
                    data: $('#loginFrm').serialize(),
                    url: '/login',
                    beforeSend: function () {
                        // loadLoading('content');
                    },
                    error: function (xhr) {
                        // errorSweetAlert(xhr.status, xhr.statusText);
                    },
                    success: function (data) {
                        eval(data);
                    },
                    complete: function () {
                        // unloadLoading('content');
                    }
                });
            // } 
            // else {
            //     errorSweetAlert('', 'Please fill all required fields.');
            // }
        }
    }
</script>

@endsection
