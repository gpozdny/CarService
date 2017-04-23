<?php

	define('WEBORK', "TRUE");
	
	define('ROOT', '../');
	define('CORE', '');

	//Подключаем базу с рекламой
	require_once( CORE.'data/db.ad.php' );

	//Подключаем базу с ценами
	require_once( CORE.'data/db.price.php' );

	//Подключаем базу с отзывами
	require_once( CORE.'data/db.reviews.php' );

	//Подключаем базу с акциями
	require_once( CORE.'data/db.shares.php' );

	//$data = '{"ad": '.json_encode($ad).', "price": '.json_encode($price).', "reviews": '.json_encode($reviews).', "shares": '.json_encode($shares).'}';

	//echo $data;

?>