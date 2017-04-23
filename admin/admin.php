<?php

	define('WEBORK', "TRUE");
	
	define('ROOT', '../');
	define('CORE', '../core/');

	require_once( CORE.'config.php');
	require_once( CORE.'functions.php');
	require_once( CORE.'skin.class.php');

	$get = clearCode( $_GET['get'] );


	$tpl = new skin();
	$tpl->dir = ROOT .'skin/admin';

	//Авторизация
	if( !$_SESSION['name'] ) {

  		$tpl->load_skin("login.tpl");
  		

	}


	

	//Прошли авторизацию
	else if( aut() == true ) {

		$tpl->load_skin("admin.tpl");

		
  		
		//Реклама
		if( $get == "ad" || !$get ) {

			$adtpl = new skin();
			$adtpl->dir = ROOT .'skin/admin';
			$adtpl->load_skin("ad.tpl");

			//Подключаем базу с рекламой
			require_once( CORE.'data/db.ad.php' );
			$lastID = $key;

			unset( $ad['key'] );

			//Разбираем базу с рекламой
			foreach ($ad as $key => $val) {

				$val = $ad[$key];

				if( !$val[1] ) {
					$val[1] = 'Без названия';
					$titleClass = 'gray';
				} else $titleClass = '';

				if( !$val[2] ) {
					$val[2] = 'Без описания';
					$textClass = 'gray';
				} else $textClass = '';



				$adtpl->set('{id}', $val[0]);
				
				$adtpl->set('{title}', $val[1]);
				$adtpl->set('{titleClass}', $titleClass);
				$adtpl->set('{textClass}', $textClass);
				$adtpl->set('{text}', $val[2]);

				$adtpl->compile("ad");
				
			}

			$tpl->set('{speed-bar}', 'Редактирование рекламы');
			$tpl->set('{content}', '<div id="ad">'.$adtpl->result['ad'].'</div><div class="buttons"> <div class="button actionBut" onclick="addBlock('.$lastID.', this, \'ad\');">Добавить</div> <div class="button actionBut green" onclick="saveBlock(\'ad\');">Сохранить</div></div>');

		//Цены
		} else if( $get == "price" ) {

			
			$pricetpl = new skin();
			$pricetpl->dir = ROOT .'skin/admin';
			$pricetpl->load_skin("price.tpl");

			//Подключаем базу с рекламой
			require_once( CORE.'data/db.price.php' );
			$lastID = $key;

			unset( $price['key'] );

			//Разбираем базу с рекламой
			foreach ($price as $key => $val) {

				$val = $price[$key];

				if( !$val[1] ) {
					$val[1] = 'Без названия';
					$titleClass = 'gray';
				} else $titleClass = '';

				if( !$val[2] ) {
					$val[2] = 'Без цены';
					$textClass = 'gray';
				} else $textClass = '';



				$pricetpl->set('{id}', $val[0]);
				
				$pricetpl->set('{title}', $val[1]);
				$pricetpl->set('{titleClass}', $titleClass);
				$pricetpl->set('{textClass}', $textClass);
				$pricetpl->set('{text}', $val[2]);

				$pricetpl->compile("price");
				
			}

			$tpl->set('{speed-bar}', 'Редактирование цен');
			$tpl->set('{content}', '<div id="price">'.$pricetpl->result['price'].'</div> <div class="buttons"> <div class="button actionBut" onclick="addBlock('.$lastID.', this, \'price\');">Добавить</div><div class="button actionBut green" onclick="saveBlock(\'price\');">Сохранить</div> </div>');
				
			
		//Акции
		} else if( $get == "shares" ) {


			$sharestpl = new skin();
			$sharestpl->dir = ROOT .'skin/admin';
			$sharestpl->load_skin("shares.tpl");

			//Подключаем базу с рекламой
			require_once( CORE.'data/db.shares.php' );
			$lastID = $key;

			unset( $shares['key'] );

			//Разбираем базу с рекламой
			foreach ($shares as $key => $val) {

				$val = $shares[$key];

				if( !$val[1] ) {
					$val[1] = 'Без названия';
					$titleClass = 'gray';
				} else $titleClass = '';

				if( !$val[2] ) {
					$val[2] = 'Без цены';
					$textClass = 'gray';
				} else $textClass = '';



				$sharestpl->set('{id}', $val[0]);
				
				$sharestpl->set('{title}', $val[1]);
				$sharestpl->set('{titleClass}', $titleClass);
				$sharestpl->set('{textClass}', $textClass);
				$sharestpl->set('{text}', $val[2]);

				$sharestpl->compile("shares");
				
			}

			$tpl->set('{speed-bar}', 'Редактирование акций');
			$tpl->set('{content}', '<div id="shares" class="shares-content clear">'.$sharestpl->result['shares'].'</div> <div class="buttons"> <div class="button actionBut" onclick="addBlock('.$lastID.', this, \'shares\');">Добавить</div> <div class="button actionBut green" onclick="saveBlock(\'shares\');">Сохранить</div> </div> ');
				
			
		//Галерея
		} else if( $get == "gallery" ) {

			$gallerytpl = new skin();
			$gallerytpl->dir = ROOT .'skin/admin';
			$gallerytpl->load_skin("gallery.tpl");

			$gallery = getFiles( ROOT.'assets/img/gallery/' );
			$count = count( $gallery );

			//Разбираем базу с рекламой
			for( $i=0; $i < $count; $i++ ) {

				$src = $config['home'].'assets/img/gallery/'.$gallery[$i];


				$gallerytpl->set('{src}', $src );
				$gallerytpl->set('{file-name}', $gallery[$i] );
				

				$gallerytpl->compile("gallery");
				
			}

			$tpl->set('{speed-bar}', 'Редактирование галереи');
			$tpl->set('{content}', '<div id="gallery" class="gallery clear" type="1">'. $gallerytpl->result['gallery'] .' <div class="add-image" ><input class="chose" type="file" name="files[]"  accept="image/*" multiple="multiple" title=\'Click to add Images\'><i class="fa fa-picture-o" aria-hidden="true"></i></div> </div>');
				
			
		//Работы
		} else if( $get == "works" ) {

			$workstpl = new skin();
			$workstpl->dir = ROOT .'skin/admin';
			$workstpl->load_skin("works.tpl");

		
			$root = ROOT.'assets/img/compare/';
			$link = $config['home'].'assets/img/compare/';


			$dirs = getDir( $root );
			$lastID = $dirs[count($dirs)-1];


			$dir = getDir( $root );

			$check = 0;

			foreach ( $dir as $k => $id ) {

				$check = $id;
				
				$folder = $link.$id.'/';
				$workstpl->set('{id}', $id );

				$files = getFiles( $root.$id.'/' );
				
				if( file_exists( $root.$id.'/'.$files[1] ) ) {

					$workstpl->set('{ready-before}',  'ready' );
					$workstpl->set('{src-before}',  $folder.$files[1] );

				}
				
				if( file_exists( $root.$id.'/'.$files[0] ) ) {

					$workstpl->set('{ready-after}',  'ready' );
					$workstpl->set('{src-after}',  $folder.$files[0] );

				}
				

				

				$workstpl->compile("works");

			}

			
			$tpl->set('{speed-bar}', 'Редактирование работ');
			$tpl->set('{content}', '<div id="works" class="works clear" type="2">'. $workstpl->result['works'] .'</div> <div class="buttons"><div class="button actionBut" onclick="addBlock('.$lastID.', this, \'works\');">Добавить работу</div> </div> ');
			
		//Отзывы
		} else if( $get == "reviews" ) {

			
			$reviewstpl = new skin();
			$reviewstpl->dir = ROOT .'skin/admin';
			$reviewstpl->load_skin("reviews.tpl");

			//Подключаем базу с рекламой
			require_once( CORE.'data/db.reviews.php' );
			$lastID = $key;

			unset( $shares['key'] );

			//Разбираем базу с рекламой
			foreach ($reviews as $key => $val) {

				$val = $reviews[$key];

				$reviewstpl->set('{id}', $val[0]);
				$reviewstpl->set('{ip}', $val[1]);

				if( $val[2] ) {

					$reviewstpl->set('{aproved}', 'aproved');
					$reviewstpl->set('{aproved-var}', '1');

				} else {

					$reviewstpl->set('{aproved}', '');
					$reviewstpl->set('{aproved-var}', '0');

				}
				
				
				$reviewstpl->set('{name}', $val[3]);
				$reviewstpl->set('{car}', $val[4]);
				$reviewstpl->set('{text}', $val[5]);

				$reviewstpl->compile("reviews");
				
			}

			$tpl->set('{speed-bar}', 'Редактирование отзывов');
			$tpl->set('{content}', '<div id="reviews" class="reviews  clear">'.$reviewstpl->result['reviews'].'</div> <div class="buttons"><div class="button actionBut green" onclick="saveBlock(\'review\');">Сохранить</div></div>');
				
			
		}

	}

	$tpl->set('{home}', $config['home']);

	$tpl->compile("content");
  	$content = $tpl->result["content"];

	echo $content;
	

?>