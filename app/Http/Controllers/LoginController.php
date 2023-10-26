<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\testController;
use App\Http\Controllers\ssoController;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Session;

class LoginController extends Controller
{
	public function index(){
        return view('auth/login');
    }
	
    public function loginProcess_test(){
        
       return  redirect('dashboard');
        $sso = new ssoController($_POST['usernameTxt'], $_POST['passwordTxt'], 'Leasing', $_SERVER['REMOTE_ADDR'], '1');

        $chk = $sso->validateEmployee();
       
       //  var_dump($chk);
       //  exit();
       
       if ($chk['status'] == 1) {
           $empInfo = $sso->getEmployeeInfo($chk['api_key'],$_POST['usernameTxt']);
       //     $empInfo = $this->clientsso->getEmployeeInfo($chk['api_key'], $_POST['usernameTxt']);

           $getUser = DB::table('tbl_user')
           // $getUser =  DB::connection('sqlsrv2')->table('tbl_user')
                   ->where('employee_number',$_POST['usernameTxt'])->get();
           // var_dump($getUser->first());

       if (count($getUser) == 1) {

       $fullname = $getUser->first()->firstname .' ' . $getUser->first()->middlename . ' ' . $getUser->first()->lastname;
       session(['employee_number' => $_POST['usernameTxt']]);
       session(['id' => $getUser->first()->id]);
       session(['firstname' => $getUser->first()->firstname]);
       session(['middlename' => $getUser->first()->middlename]);
       session(['lastname' => $getUser->first()->lastname]);
       session(['fullname' => $fullname]);
       session(['apiKey' => $chk['api_key']]);
       session(['user_level' =>  $getUser->first()->user_level]);
       session(['role_level' =>  $getUser->first()->role_level]);
       session(['is_logged_in' =>  'YES']);
       session(['department' =>  $getUser->first()->department]);

       return  view('dashboard');
       }
        }
       
        // return redirect('/dashboard');
        // dd('dsadas');
    }


     function loginProcess() {
        // $clientIP = request()->ip();
        // $clientIP = \Request::ip();
        // $clientIP = \Request::getClientIp(true);
        // if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        //     $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
        // } else {
        //     $ip_address = $_SERVER['REMOTE_ADDR'];
        // }
        // echo $ip_address;

        // $sso = new ssoController($_POST['usernameTxt'], $_POST['passwordTxt'], 'Leasing', $_SERVER['REMOTE_ADDR'], '1');
        $sso = new ssoController($_POST['usernameTxt'], $_POST['passwordTxt'], 'Leasing', $_SERVER['REMOTE_ADDR'], '1');

         $chk = $sso->validateEmployee();
        
        //  var_dump($chk);
        //  exit();
        
        if ($chk['status'] == 1) {
            $empInfo = $sso->getEmployeeInfo($chk['api_key'],$_POST['usernameTxt']);
        //     $empInfo = $this->clientsso->getEmployeeInfo($chk['api_key'], $_POST['usernameTxt']);

            $getUser = DB::table('tbl_user')
            // $getUser =  DB::connection('sqlsrv2')->table('tbl_user')
                    ->where('employee_number',$_POST['usernameTxt'])->get();
            // var_dump($getUser->first());

        if (count($getUser) == 1) {

        $fullname = $getUser->first()->firstname .' ' . $getUser->first()->middlename . ' ' . $getUser->first()->lastname;
        session(['employee_number' => $_POST['usernameTxt']]);
        session(['id' => $getUser->first()->id]);
        session(['firstname' => $getUser->first()->firstname]);
        session(['middlename' => $getUser->first()->middlename]);
        session(['lastname' => $getUser->first()->lastname]);
        session(['fullname' => $fullname]);
        session(['apiKey' => $chk['api_key']]);
        session(['user_level' =>  $getUser->first()->user_level]);
        session(['role_level' =>  $getUser->first()->role_level]);
        session(['is_logged_in' =>  'YES']);
        session(['department' =>  $getUser->first()->department]);


        // $allSessions = session()->all();  
        // $allSessions->session()->flush(); 
        // dd($allSessions);    
                echo "window.location.href = '\dashboard';\n";
                // return redirect('/dashboard');
            }else {
               echo " Swal.fire(
                    'Login Failed',
                    'Account does not exist!',
                    'error'
               );\n";
            }
        }elseif($chk['status'] == 2){
            echo " Swal.fire(
                'Login Failed',
                'Account is Disabled in Myportal',
                'error'
           );\n";
        } 
        else {
            echo " Swal.fire(
                'Login Failed',
                'We didn\'t recognise your employee no. or password',
                'error'
           );\n";

           
        }
    }


    function logoutProcess() {
        $allSessions = session()->all(); 
        Session::flush();
        return redirect('/');
    }


    public function disableAPIKEY($key, $username) {

        $curl = curl_init();

        $arr = array(
            CURLOPT_URL => $this->server . "validate_user/disablekey/{$username}",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 400,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
                "X-API-KEY: {$key}",
            )
        );

        return $this->sendRequest($arr);
    }
}
