<?php

//Если напрямую
if( !defined('WEBORK') ) {
	exit("Oooooooooops!");
}

$_TIME = $_SERVER['REQUEST_TIME'];

//Очищаем код
function clearCode( $text ) {
	$clear = array('\'', '"', '<', '>', '&', '@');
	return str_replace($clear, '', $text);
}


//Безопасный код
function safeCode($code, $space = false, $tags = false, $reverse = false) {

	$search  = array( '&', '"', '\'', '\\', 'javascript' );
    $replace = array( '&amp;', '&quot;', '&apos;', '&#92;', 'jаvаsсript' );

    $searchTags = array( '<', '>' );
    $replaceTags = array( '&lt;', '&gt;' );



    if( !$code ) return false;
	   
	if( !$reverse ) {

		$code = str_replace( $search, $replace, $code );
		if( !$tags ) str_replace( $searchTags, $replaceTags, $code );
	
	} else {

		$code = str_replace( $replace, $search, $code );
		if( !$tags ) str_replace( $replaceTags, $searchTags, $code );

	}
	   
	if( !$space ) $code = str_replace("\n", "<br>", $code);
	return $code;

}



//Site Login
session_start();

function login( $logout = true, &$m = false ) {
	
	global $_TIME, $config;

	$ip = $_SERVER['REMOTE_ADDR'];

	if( $_SESSION[$ip]['wrong'] >= 5 && ( $_TIME - $_SESSION[$ip]['last'] ) < 300000 ) {return 'Easy cowboy. Wait..';}
	
	if( $logout == FALSE ) {

		if( $m['name'] !== $config["name"] || $m['pass'] !== $config["pass"]) {

			++$_SESSION[$ip]['wrong'];
			$_SESSION[$ip]['last'] = $_TIME;

			return 'Wrong username or password';

		}
		
		$_SESSION['name'] = $m['name'];
		$_SESSION['pass'] = md5( md5( $m['pass'] ) );
		
		setcookie ('name', $m['name'], $_TIME + 15552000, '/');
		setcookie ('pass',  md5( md5( $m['pass'] ) ),  $_TIME + 15552000, '/', $_SERVER['HTTP_HOST'], false, true);
		
		return 1;
	
	//Удаляем куки и сессию
	} else {
		 
		 session_destroy();
		 setcookie ('name', '', $_TIME -1, '/');
	     setcookie ('pass', '',  $_TIME -1, '/', $_SERVER['HTTP_HOST'], false, true);

		 return 2;
	}
}

//Функция проверки авторизации
function aut() {

	global $_TIME, $config;

	//Проверка по куки или сессии
	if( ( $_SESSION['name'] && $_SESSION['pass'] ) || ( $_COOKIE['name'] && $_COOKIE['pass'] ) ) {

		if( $_SESSION['name'] == $config['name'] && $_SESSION['pass'] == md5(md5( $config['pass'] )) || $_COOKIE['name'] && $_COOKIE['pass'] == md5(md5( $config['pass'] )) ) {

			return true;

		//Не прошел проверку
		} else { login(true); return false; }

	//Не прошел проверку
	} else return false; 

}

//Функция записи в БД
function saveBD( $json, $db, $name, $lastID ) {

	//Путь к БД
	$path = CORE.'data/'.$db;

	//Получаем массив
	$array = json_decode( $json, true );

	if( !count( $array ) ) return 'empty';

	require_once( $path );

	if( $lastID ) $key = $lastID;

	$data = '';

	foreach ($array as $k => $value) {

		$safety = Array();

		//Перебираем массив для безопасности
		for( $i=0; $i < count($array[$k]); $i++ ) {

			$safety[] = "'".safeCode($array[$k][$i], true, true)."'";

		}

		$safety = implode($safety, ",");
		
		$data .= "\t'".$k."' => Array(".$safety."), \n\n";

	}


	$data = "<?php \n \$key = ".$key."; \n\n \$$name = Array(\n\n".$data.");\n\n?>";

	file_put_contents($path, $data);


	return true;

}

function resizePNG($file_input, $file_output, $w_o, $h_o, $percent = false) {

	list($w_i, $h_i, $type) = getimagesize($file_input);
	if (!$w_i || !$h_i) {
		echo 'Невозможно получить длину и ширину изображения';
		return;
    }
    $types = array('','gif','jpeg','png');
    $ext = $types[$type];
    if ($ext) {
    	$func = 'imagecreatefrom'.$ext;
    	$img = $func($file_input);
    } else {
    	echo 'Некорректный формат файла';
		return;
    }
	if ($percent) {
		$w_o *= $w_i / 100;
		$h_o *= $h_i / 100;
	}
	if (!$h_o) $h_o = $w_o/($w_i/$h_i);
	if (!$w_o) $w_o = $h_o/($h_i/$w_i);

	
	$img_o = imagecreatetruecolor($w_o, $h_o);

	//Отключаем режим сопряжения цветов
	imagealphablending($img_o, false);

	//Включаем сохранение альфа канала
	imagesavealpha($img_o, true);

	imagecolortransparent($img_o);

	imagecopyresampled($img_o, $img, 0, 0, 0, 0, $w_o, $h_o, $w_i, $h_i);
	

	if ($type == 2) {
		return imagepng($img_o,$file_output,100);
	} else {
		$func = 'image'.$ext;
		return $func($img_o,$file_output);
	}

}

function resize($file_input, $file_output, $w_o, $h_o, $percent = false) {

	list($w_i, $h_i, $type) = getimagesize($file_input);
	if (!$w_i || !$h_i) {
		echo 'Невозможно получить длину и ширину изображения';
		return;
    }
    $types = array('','gif','jpeg','png');
    $ext = $types[$type];
    if ($ext) {
    	$func = 'imagecreatefrom'.$ext;
    	$img = $func($file_input);
    } else {
    	echo 'Некорректный формат файла';
		return;
    }
	if ($percent) {
		$w_o *= $w_i / 100;
		$h_o *= $h_i / 100;
	}
	if (!$h_o) $h_o = $w_o/($w_i/$h_i);
	if (!$w_o) $w_o = $h_o/($h_i/$w_i);
	$img_o = imagecreatetruecolor($w_o, $h_o);
	imagecopyresampled($img_o, $img, 0, 0, 0, 0, $w_o, $h_o, $w_i, $h_i);
	if ($type == 2) {
		return imagejpeg($img_o,$file_output,100);
	} else {
		$func = 'image'.$ext;
		return $func($img_o,$file_output);
	}
	
}

function getFiles( $dir ) {

	$filelist = array();

	if ( is_dir($dir) ) {

	    if( $dh = opendir($dir) ) {

	        while ( ( $file = readdir($dh) ) !== false) {

	            if( is_file( $dir.$file ) ) $filelist[] = $file;

	        }

	        closedir($dh);
	    }
	}

	return $filelist;
}

function getDir( $dir ) {

	$dirlist = array();

	if ( is_dir($dir) ) {

	    if( $dh = opendir($dir) ) {

	        while ( ( $dirname = readdir($dh) ) !== false) {

	            if( is_dir( $dir.$dirname ) && $dirname != '.' && $dirname != '..' ) $dirlist[] = $dirname;

	        }

	        closedir($dh);
	    }
	}

	return $dirlist;
}

//Удаляем полностью директорию
function delDir( $d ) { 
  $dir = opendir($d); 
  
  while( $file = readdir($dir) ) { 
    if ( is_file($d.'/'.$file) ) unlink($d.'/'.$file); 
    elseif ( is_dir($d.'/'.$file ) && $file !== '.' && $file !=='..') delDir($d.'/'.$file); 
  } 
  
  closedir($dir); rmdir($d);
  
  return true;
}


?>