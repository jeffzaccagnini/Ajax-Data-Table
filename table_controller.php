<?php
 
 require 'config.php';
 
 error_reporting(E_ALL);
 ini_set('display_errors', 1);
 
 $token = 'auth_key';
 $action = $_GET['action'];
 $ipp = $_GET['ipp'];
 $page = $_GET['page'];
 $limit = $_GET['limit']; 
 
 if(isset($token)) {
	
	 

try{

	switch($action)
	{
		case 'initialize':
			Table::Initialize($ipp, $page, $limit);
			break;
		case 'add':
			
			break;
		case 'delete':
			Table::delete($_GET['id']);
			Table::initialize($ipp, $page, $limit);
			break;
			
		case 'delete_multiple':
			Table::delete_multiple($_GET['ids']);
			Table::initialize($ipp, $page, $limit);
			break;
		default:
			Table::Initialize($ipp, $page, $limit);
			break;
	}

}
catch(Exception $e){
//	echo $e->getMessage();
	die("0");
}
	} else {	
		echo 'You are not authorized to view this page.';
	 }


?>