<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.108.0">
    <title>Elite Exam</title>


    

   

<!-- <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"> -->
<!-- 
<link href="{{ asset('assets/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
<link href="{{ asset('assets/css/offcanvas-navbar.css') }}" rel="stylesheet"> -->


                            <!-- CSS -->
    <link href="{{ asset('assets/bootstrap_5/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/select2/select2.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('assets/DataTables/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/css/offcanvas-navbar.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('assets/font_awesome/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/daterangepicker/daterangepicker.css') }}">

    <!-- <link rel="stylesheet" href="{{ asset('assets/checkbox/checkboxStyle.css') }}"> -->
    <link rel="stylesheet" href="{{ asset('assets/checkbox/checkboxStyle.css') }}">



                            <!-- JS -->
    <script src="{{ asset('assets/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/jquery_block/jquery.blockUI.js') }}"></script>
    <script src="{{ asset('assets/popper/popper.min.js') }}"></script>
    <script src="{{ asset('assets/bootstrap_5/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/select2/select2.min.js') }}"></script>
    <script src="{{ asset('assets/axios/axios.min.js') }}"></script>
    <script src="{{ asset('assets/DataTables/datatables.min.js') }}"></script>
    <script src="{{ asset('assets/sweet_alert/sweet_alert.min.js') }}"></script>
    <script src="{{ asset('assets/chartjs/chart.js') }}"></script>
    <script src="{{ asset('assets/daterangepicker/moment.min.js') }}"></script>
    <script src="{{ asset('assets/daterangepicker/daterangepicker.js') }}"></script>
    <!-- <script src="{{ asset('assets/checkbox/form_checkboxes_radios.js') }}"></script>
    <script src="{{ asset('assets/checkbox/uniform.min.js') }}"></script>
    <script src="{{ asset('assets/checkbox/switchery.min.js') }}"></script>
    <script src="{{ asset('assets/checkbox/switch.min.js') }}"></script> -->

    



    <!-- <script src="{{ asset('assets/vue/vue.global.js') }}"></script> -->
    <!-- <script src="{{ asset('js/app.js') }}" ></script> -->
    <!-- <script src="{{ asset('assets/bootstrap/js/bootstrap.bundle.min.js') }}"></script> -->

  
  </head>
  <body class="bg-light">
    
      <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
        <div class="container-fluid">
        <a href="{{URL::to('/dashboard')}}" class="navbar-brand"><img width="150" height="30" src="{{asset('assets/images/logo_light.png')}}" alt=""></a>
          <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <!-- <li class="nav-item">    
                <a class="nav-link " aria-current="page" href="{{route('dashboard')}}">Dashboard</a>
              </li> -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Manage Contracts</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="{{route('index')}}">Active Contracts</a></li>
                  <li><a class="dropdown-item" href="{{route('createContract')}}">Create New Contract</a></li>
                  <li><a class="dropdown-item" href="{{route('inactiveContract')}}">View Inactive Contracts</a></li>

                </ul>
              </li>

              <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">RFP</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="{{route('rfpIndex')}}" >Commence RFP</a></li>
                  <li><a class="dropdown-item" href="{{route('rfpCreate')}}" >Create RFP</a></li>
                  <li><a class="dropdown-item" href="{{route('frontMoney')}}" >Escalation RFP</a></li>
                </ul>
              </li> -->

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Reports</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="{{route('generateReport')}}" target="_blank">Summary Report</a></li>
                  <!-- <li><a class="dropdown-item" href="{{route('generateReport')}}" target="_blank">RFP Report</a></li> -->
                  <li><a class="dropdown-item" href="{{route('releaseUnreleaseRfp')}}" >Release/Unrelease RFP</a></li>
                  <li><a class="dropdown-item" href="{{route('validatedUnvalidatedReport')}}" >Validated/Unvalidated Invoice</a></li>
                  <!-- <li><a class="dropdown-item" href="{{URL::to('/rentalsEscalation')}}" target="_blank">Rentals with Escalation</a></li> -->
                  <li><a class="dropdown-item" href="{{URL::to('/rentalsEscalationView')}}" target="_blank">Rentals with Escalation</a></li>


                </ul>
              </li>
<!-- 
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Utilities</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="{{URL::to('/contractTypeMaintenance')}}">Contract Type</a></li>
                  <li><a class="dropdown-item" href="{{URL::to('/contractPaymentMaintenance')}}">Contract Payment</a></li>
                </ul>
              </li> -->
            </ul>

                  <!-- GET ALL SESSIONS -->
            <?php $allSessions = session()->all(); ?>

          <ul class="nav justify-content-end">
            <!-- <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Settings</a> -->
              <a href="" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><img src="{{ asset('assets/images/placeholder_.jpg') }}" alt="" width="30px" height="30px">
          <span class="" style="color:white"><?php echo $allSessions['fullname']; ?></span>
              </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                      <a class="dropdown-item" href="{{ route('logoutProcess') }}" 
                          onclick="event.preventDefault();
                          document.getElementById('logout-form').submit();">
                          Logout
                      </a>
                      <form id="logout-form" action="{{ route('logoutProcess') }}" method="POST" class="d-none">
                          @csrf
                      </form>
                  </li>
                  
                </ul>
          </ul>
          
          </div>
        </div>
      </nav>

<div class="nav-scroller bg-body shadow-sm">
  <nav class="nav" aria-label="Secondary navigation">
  </nav>
</div>



<main class="container">
  @yield('content')
</main>
      </body>
</html>