<?php

//Если напрямую
if( !defined('WEBORK') ) {
	exit("Oooooooooops!");
}

if( $_SERVER['HTTPS'] == "") $http = "http://";
else $http = "https://";

$config = array(

	"home" => $http. $_SERVER['SERVER_NAME'] ."/",

	"name" => "Admin",

	"pass" => "Admin",

);



?>