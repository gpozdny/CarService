<?php

define('WEBORK', TRUE);

require_once("config.php");
require_once("functions.php");

$action = (int)$_POST["action"];

$name = clearCode( $_POST["name"] );
$pass = clearCode( $_POST["pass"] );

//Авторизуемся
if( $action == 1 ) {

	$m = array('name' => $name, 'pass' => $pass);

	//Все прошло
	$result = login(false, $m );
	if( $result == 1 ) {
		echo 1;
	}

	//Ошибка
	else {
		echo $result;
	}

}

//Авторизуемся
else if( $action == 2 ) {

	//Все прошло
	if( login(true) == 2 ) {
		echo 2;
	}

	//Ошибка
	else {
		echo "Something wrong!";
	}

}


?>