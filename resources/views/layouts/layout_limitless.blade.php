<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.108.0">
    <meta name="_token" content="{{ csrf_token() }}">
    <title>Elite Exam</title>


<!-- Global stylesheets -->
<link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}" />
<!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->
<!-- <script src="{{ asset('assets/select2_new/dist/css/select2.min.css') }}"></script> -->

<link href="{{ asset('assets/select2/select2.min.css')}}" rel="stylesheet" />


<link href="{{ asset('limitless/assets/css/icons/icomoon/styles.css') }}" rel="stylesheet" type="text/css">
<link href="{{ asset('limitless/assets/css/minified/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
<!-- <script src="{{ asset('assets/bootstrap_test/css/bootstrap.min.css') }}"></script> -->

<link href="{{ asset('limitless/assets/css/minified/core.min.css') }}" rel="stylesheet" type="text/css">
<link href="{{ asset('limitless/assets/css/minified/components.min.css') }}" rel="stylesheet" type="text/css">
<link href="{{ asset('limitless/assets/css/minified/colors.min.css') }}" rel="stylesheet" type="text/css">


<!-- /global stylesheets -->

<!-- Core JS files -->
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/loaders/pace.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/core/libraries/jquery.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/core/libraries/bootstrap.min.js') }}"></script>
<!-- <script src="{{ asset('assets/bootstrap_test/js/bootstrap.bundle.min.js') }}"></script> -->

<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/loaders/blockui.min.js') }}"></script>
<!-- /core JS files -->

<!-- Theme JS files -->

<script type="text/javascript" src="{{ asset('limitless/assets/js/core/libraries/jquery_ui/datepicker.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/core/libraries/jquery_ui/effects.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/notifications/jgrowl.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/ui/moment/moment.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/pickers/daterangepicker.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/pickers/anytime.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/pickers/pickadate/picker.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/pickers/pickadate/picker.date.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/pickers/pickadate/picker.time.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/pickers/pickadate/legacy.js') }}"></script>
<!-- 
<script type="text/javascript" src="{{ asset('limitless/assets/js/core/app.js') }}"></script>
<script type="text/javascript" src="{{ asset('limitless/assets/js/pages/picker_date.js') }}"></script> -->

<!-- <script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/notifications/sweet_alert.min.js') }}"></script> -->
    <script type="text/javascript" src="{{ asset('assets/sweet_alert/sweet_alert.min.js') }}"></script>
    <script src="{{ asset('assets/DataTables/datatables.min.js') }}"></script>
    <!-- <script type="text/javascript" src="{{ asset('limitless/assets/js/pages/layout_sidebar_sticky.js') }}"></script> -->
<!-- /theme JS files -->


<script src="{{ asset('assets/axios/axios.min.js') }}"></script>

<!-- <script type="text/javascript" src="{{ asset('limitless/assets/js/plugins/forms/selects/select2.min.js') }}"></script> -->
<!-- <script src="{{ asset('assets/select2_new/dist/js/select2.full.min.js') }}"></script> -->
<script src="{{ asset('assets/select2/select2.min.js') }}"></script>



<!-- <script type="text/javascript" src="{{ asset('limitless/assets/js/pages/form_select2.js') }}"></script> -->



  </head>
  <body class="bg-light">
    
  <div class="navbar  navbar-inverse navbar-fixed-top">
			<div class="navbar-header">

					<!-- <a class="navbar-brand" href="{{ url('') }}"><i class=" icon-calendar3 position-left"></i>  {{ config('app.name', 'Laravelguest') }}</a> -->
					<a class="navbar-brand" href="{{ url('') }}"><img width="100" height="10" src="{{asset('assets/images/logo_light.png')}}" alt=""></a>

				
				
			</div>
		<ul class="nav navbar-nav">
			

            </ul>

            <ul class="nav navbar-nav navbar-right">
                  
				<li class="dropdown dropdown-user">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <!-- <img src="{{ asset('limitless/assets/images/placeholder.jpg') }}" alt=""> -->
							<?php $allSessions = session()->all(); ?>

                            <span><?php echo $allSessions['fullname']; ?></span>
                            <i class="caret"></i>
                        </a>

                        <ul class="dropdown-menu dropdown-menu-right">
                           
                            <!-- <li><a href="#"><i class="icon-switch2"></i> Logout</a></li> -->
							<li><a href="#" 
								onclick="event.preventDefault();
								document.getElementById('logout-form').submit();">
								<i class="icon-switch2"></i>Logout
										</a>
								<form id="logout-form" action="{{ route('logoutProcess') }}" method="POST" class="d-none">
									@csrf
								</form>
                            </li>
                        </ul>
                </li>
			</ul>			
			
	
		</div>




	<!-- Page container -->
	<div class="page-container">

		<!-- Page content -->
		<div class="page-content">
			
			
			<!-- Main content -->
			<div class="content-wrapper" id="domMessage">

				@yield('content')

			</div>
			<!-- /main content -->
		</div>
		<!-- /page content -->
	</div>
	<!-- /page container -->
      </body>
</html>