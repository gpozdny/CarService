<?php

	define('WEBORK', "TRUE");
	
	define('ROOT', '../');
	define('CORE', '../core/');

	require_once( CORE.'config.php');
	require_once( CORE.'functions.php');
	require_once( CORE.'skin.class.php');

	if( !aut() ) exit('Oooooooops!');

	$ajax = clearCode( $_REQUEST['ajax'] );
	$_POST['data'] = str_replace('\\', '\\\\', $_POST['data']);

	//Получаем шаблон блока
	if( $ajax == "block" ) {

		$block = clearCode( $_POST['block'] );

		if( !$block ) exit('Block empty');

			$skin = new skin();
			$skin->dir = ROOT .'skin/admin';
			$skin->load_skin( $block.".tpl" );

			$skin->set('{title}', "Название");
			$skin->set('{text}', "Текст");



		$skin->compile("block");
		$html = $skin->result['block'];

		if( $html ) echo $html;


	}
		

	//Редактируем рекламу
	else if( $ajax == "ad" ) {

		$ad = $_POST['data'];
		$ad = str_replace("\n", '<br>', $ad);
		
		$ad = str_replace( Array("Без названия", "Без описания"), "", $ad);

		saveBD( $ad, 'db.ad.php', "ad", (int)$_POST['lastID'] );

		echo 'ok';

	//Редактируем прайс
	} else if( $ajax == "price" ) {

		$price = $_POST['data'];

		//Сохраняем цены
		if( saveBD( $price, 'db.price.php', "price", (int)$_POST['lastID'] ) )	echo "ok";

	//Редактируем акции
	} else if( $ajax == "shares" ) {

		$shares = $_POST['data'];

		//Сохраняем цены
		if( saveBD( $shares, 'db.shares.php', "shares", (int)$_POST['lastID'] ) )	echo "ok";


	//Удаляем изображение рекламы
	} else if( $ajax == "delete" ) {

		$image = clearCode( $_POST['image'] );
		$patch = clearCode( $_POST['patch'] );
		
		if( file_exists( ROOT.$patch.$image ) ) {

			if( unlink(ROOT.$patch.$image ) ) echo 'ok';
			
		}

		


	//Удаляем работу
	} else if( $ajax == "delete-compare" ) {

		$id = (int)$_POST['id'];
		$patch = ROOT.'assets/img/compare/'.$id;
		
		if( is_dir( $patch ) ) {
			
			if( delDir( $patch ) ) echo 'ok';
			
		}


	//Редактируем отзывы
	} else if( $ajax == "review" ) {

		$reviews = $_POST['data'];

		//Сохраняем цены
		if( saveBD( $reviews, 'db.reviews.php', "reviews", (int)$_POST['lastID'] ) )	echo "ok";

	}

	 else if( $ajax == "addreview" ) {

		$name = clearCode( $_POST['name'] );
		$car = clearCode( $_POST['car'] );
		$text = clearCode( $_POST['text'] );

		$ip = $_SERVER["REMOTE_ADDR"];

		//Подключаем базу с рекламой
		require_once( CORE.'data/db.reviews.php' );

		$string = json_encode( $reviews );

		if( strpos($string, $ip) ) exit('stop');

		exit( array_search( $ip, $reviews ) );

		$id = ++$key;

		$reviews[$id] = Array($id, $ip,'0', $name, $car, $text);

		

		$reviews = json_encode( $reviews );
		
		//Сохраняем цены
		if( saveBD( $reviews, 'db.reviews.php', "reviews", $id ) ) echo "ok";

	}



?>