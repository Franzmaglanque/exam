<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title>Elite Exam</title>
	
	<!-- Global stylesheets -->
	<!-- <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css"> -->
	<link href="{{ asset('Limitless2/global_assets/css/icons/icomoon/styles.min.css') }}" rel="stylesheet" type="text/css">
	<link href="{{ asset('Limitless2/assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
	<link href="{{ asset('Limitless2/assets/css/bootstrap_limitless.min.css') }}" rel="stylesheet" type="text/css">
	<link href="{{ asset('Limitless2/assets/css/layout.min.css') }}" rel="stylesheet" type="text/css">
	<link href="{{ asset('Limitless2/assets/css/components.min.css') }}" rel="stylesheet" type="text/css">
	<link href="{{ asset('Limitless2/assets/css/colors.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets/DataTables/datatables.min.css') }}" rel="stylesheet">

	<!-- /global stylesheets -->

	<!-- Core JS files -->
	<!-- <script src="{{ asset('Limitless2/global_assets/js/main/jquery.min.js') }}"></script> -->
    <script src="{{ asset('assets/jquery/jquery.min.js') }}"></script>

	<script src="{{ asset('Limitless2/global_assets/js/main/bootstrap.bundle.min.js') }}"></script>
	<script src="{{ asset('Limitless2/global_assets/js/plugins/loaders/blockui.min.js') }}"></script>
	<!-- /core JS files -->

	<!-- Theme JS files -->
	<script src="{{ asset('Limitless2/global_assets/js/plugins/editors/ckeditor/ckeditor.js') }}"></script>

	<script src="{{ asset('Limitless2/assets/js/app.js') }}"></script>
	<script src="{{ asset('Limitless2/global_assets/js/demo_pages/invoice_template.js') }}"></script>
    <script src="{{ asset('assets/chartjs/chart.js') }}"></script>

	<!-- /theme JS files -->


	<!-- Theme JS files -->
	<script src="{{ asset('Limitless2/global_assets/js/plugins/tables/datatables/datatables.min.js') }}"></script>
    <script src="{{ asset('assets/sweet_alert/sweet_alert.min.js') }}"></script>
	<script src="{{ asset('Limitless2/global_assets/js/plugins/forms/selects/select2.min.js') }}"></script>
    <script src="{{ asset('assets/axios/axios.min.js') }}"></script>
	<!-- <script src="{{ asset('Limitless2/assets/js/app.js') }}"></script> -->
	<!-- <script src="{{ asset('Limitless2/global_assets/js/demo_pages/invoice_archive.js') }}"></script> -->
	<!-- /theme JS files -->
</head>

<body>

	<!-- Main navbar -->
	<div class="navbar navbar-expand-md navbar-dark">
		<div class="navbar-brand">
			<a href="/" class="d-inline-block">
				<!-- <img src="{{ asset('Limitless2/global_assets/images/logo_light.png') }}" alt=""> -->
				<img src="{{ asset('assets/images/logo_light.png') }}" alt="">
			</a>
		</div>

		<div class="d-md-none">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
				<i class="icon-tree5"></i>
			</button>
			<button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
				<i class="icon-paragraph-justify3"></i>
			</button>
		</div>

		<div class="collapse navbar-collapse" id="navbar-mobile">

			<ul class="navbar-nav">
				<li class="nav-item dropdown dropdown-user">
					<a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown"><span>Manage Contracts</span></a>
					<div class="dropdown-menu dropdown-menu-right">
						<a class="dropdown-item" href="{{route('index')}}">Active Contracts</a>
						<a class="dropdown-item" href="{{route('inactiveContract')}}">View Inactive Contracts</a>
						<a class="dropdown-item" href="{{route('createContract')}}">Create New Contract</a>
					</div>
				</li>
			</ul>

			<!-- <ul class="navbar-nav">
				<li class="nav-item dropdown dropdown-user">
					<a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown"><span>RFP</span></a>
					<div class="dropdown-menu dropdown-menu-right">
						<a class="dropdown-item" href="{{route('rfpIndex')}}" >Commence RFP</a>
						<a class="dropdown-item" href="{{route('rfpCreate')}}" >Create RFP</a>
						<a class="dropdown-item" href="{{route('frontMoney')}}" >Escalation RFP</a>
					</div>
				</li>
			</ul> -->

			<ul class="navbar-nav">
				<li class="nav-item dropdown dropdown-user">
					<a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown"><span>Reports</span></a>
					<div class="dropdown-menu dropdown-menu-right">
						<a class="dropdown-item" href="{{route('generateReport')}}" target="_blank">Summary Report</a>
						<a class="dropdown-item" href="{{URL::to('/commencedReport')}}">Commenced Contracts Report</a>
						<a class="dropdown-item" href="{{route('releaseUnreleaseRfp')}}" >Release/Unrelease RFP</a>
						<a class="dropdown-item" href="{{route('validatedUnvalidatedReport')}}" >Validated/Unvalidated Invoice</a>
						<a class="dropdown-item" href="{{URL::to('/rentalsEscalationView')}}" target="_blank">Rentals with Escalation</a>
					

					</div>
				</li>
			</ul>


			<div class="ml-md-3 mr-md-auto"></div>

			<ul class="navbar-nav">
				<li class="nav-item dropdown dropdown-user">
					<a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
						<!-- <img src="../../../../global_assets/images/placeholders/placeholder.jpg" class="rounded-circle mr-2" height="34" alt=""> -->
						<span>{{session()->all()['fullname']}}</span>
					</a>
					<div class="dropdown-menu dropdown-menu-right">
						<!-- <a href="#" class="dropdown-item"><i class="icon-switch2"></i> Logout</a> -->
						<a href="#" class="dropdown-item"
								onclick="event.preventDefault();
								document.getElementById('logout-form').submit();">
								<i class="icon-switch2"></i>Logout
										</a>
								<form id="logout-form" action="{{ route('logoutProcess') }}" method="POST" class="d-none">
									@csrf
								</form>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<!-- /main navbar -->


	<!-- Page content -->
	<div class="page-content">

		<!-- Main content -->
		<div class="content-wrapper">

			<!-- Page header -->
			<div class="page-header page-header-light">
			

				<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
					<div class="d-flex">
						<div class="breadcrumb">
							<a href="/" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
							<!-- <a href="invoice_template.html" class="breadcrumb-item">Invoices</a>
							<span class="breadcrumb-item active">Templates</span> -->
						</div>

						<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
					</div>

					<div class="header-elements d-none">
						<div class="breadcrumb justify-content-center">
							<!-- <a href="#" class="breadcrumb-elements-item">
								<i class="icon-comment-discussion mr-2"></i>
								Support
							</a>

							<div class="breadcrumb-elements-item dropdown p-0">
								<a href="#" class="breadcrumb-elements-item dropdown-toggle" data-toggle="dropdown">
									<i class="icon-gear mr-2"></i>
									Settings
								</a>

								<div class="dropdown-menu dropdown-menu-right">
									<a href="#" class="dropdown-item"><i class="icon-user-lock"></i> Account security</a>
									<a href="#" class="dropdown-item"><i class="icon-statistics"></i> Analytics</a>
									<a href="#" class="dropdown-item"><i class="icon-accessibility"></i> Accessibility</a>
									<div class="dropdown-divider"></div>
									<a href="#" class="dropdown-item"><i class="icon-gear"></i> All settings</a>
								</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
			<!-- /page header -->


			<!-- Content area -->
			<div class="content">
				@yield('content')
			</div>
			<!-- /content area -->


			<!-- Footer -->
			<div class="navbar navbar-expand-lg navbar-light">
				<div class="text-center d-lg-none w-100">
					<button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
						<i class="icon-unfold mr-2"></i>
						Footer
					</button>
				</div>

				<div class="navbar-collapse collapse" id="navbar-footer">
					<span class="navbar-text">
						<!-- &copy; 2015 - 2018. <a href="#">Limitless Web App Kit</a> by <a href="http://themeforest.net/user/Kopyov" target="_blank">Eugene Kopyov</a> -->
					</span>

					<ul class="navbar-nav ml-lg-auto">
						<!-- <li class="nav-item"><a href="https://kopyov.ticksy.com/" class="navbar-nav-link" target="_blank"><i class="icon-lifebuoy mr-2"></i> Support</a></li>
						<li class="nav-item"><a href="http://demo.interface.club/limitless/docs/" class="navbar-nav-link" target="_blank"><i class="icon-file-text2 mr-2"></i> Docs</a></li>
						<li class="nav-item"><a href="https://themeforest.net/item/limitless-responsive-web-application-kit/13080328?ref=kopyov" class="navbar-nav-link font-weight-semibold"><span class="text-pink-400"><i class="icon-cart2 mr-2"></i> Purchase</span></a></li> -->
					</ul>
				</div>
			</div>
			<!-- /footer -->

		</div>
		<!-- /main content -->

	</div>
	<!-- /page content -->
	
</body>
</html>
