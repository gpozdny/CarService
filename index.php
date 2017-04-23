<?php

	define('WEBORK', "TRUE");
	
	define('ROOT', '');
	define('CORE', 'core/');

	require_once( CORE.'config.php');
	require_once( CORE.'functions.php');
	require_once( CORE.'skin.class.php');
	require_once( CORE.'cache.php');

	$tpl = new skin();
	$tpl->dir = ROOT .'skin';
	$tpl->load_skin("index.tpl");

			$data = '';

			//Реклама
			foreach ($ad as $key => $val) {

				$val = $ad[$key];

				$data .= '<li class="slider__item">  <h3 class="slider__item-title">'.$val[1].'</h3><span class="slider__item-text">'.$val[2].'</span> </li>';
				
			}

			$tpl->set('{ads}', $data);


			$data = '';

			//Акции
			foreach ($shares as $key => $val) {

				$val = $shares[$key];

				$data .= '<li class="service__ads-item"> <h3 class="ads__title">'.$val[1].'</h3><span class="service__ads-text">'.$val[2].'</span>  </li>';
				
			}

			$tpl->set('{shares}', $data);


			$data = '';
			$gallery = getFiles( ROOT.'assets/img/gallery/' );

			//Галерея
			foreach ($gallery as $key => $val) {

				$src = $config['home'].'assets/img/gallery/'.$gallery[$key];

				$data .= '<li class="gallery__pictures-item"><img class="gallery__pictures-pic" src="'.$src.'" width="380" height="300"></li>';
				
			}

			$tpl->set('{gallery}', $data);





			$data = '';
			$compare = getDir( ROOT.'assets/img/compare/' );

			//Галерея
			foreach ($compare as $key => $val) {

				$src = $config['home'].'assets/img/compare/'.$compare[$key].'/';
				$files = getFiles( ROOT.'assets/img/compare/'.$compare[$key].'/' );

				$data .= '<li class="gallery__works-item">  <div class="gallery__comparison"> <div class="compare__before" style="display: none;"><img class="works__pic" src="'.$src.$files[1].'"></div>  <div class="compare__after"><img class="works__pic" src="'.$src.$files[0].'"></div>   </div>   </li>';
				
			}

			$tpl->set('{compare}', $data);



			$data = '';

			//Отзывы
			foreach ($reviews as $key => $val) {

				$val = $reviews[$key];

				if( $val[2] == 1 ) {
					$data .= '<li class="feedback__slider-item"> <div class="slider-item__title"><span class="slider-item__name">'.$val[3].'</span><span class="slider-item__car">'.$val[4].'</span></div>
                <div class="slider-item__text">                  <p>'.$val[5].'</p>                </div>              </li>';
				
				}
			}

			$tpl->set('{reviews}', $data);



	$tpl->set('{home}', $config['home']);

	$tpl->compile("content");
  	$content = $tpl->result["content"];

	echo $content;


?>