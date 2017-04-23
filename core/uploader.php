<?php

	define('WEBORK', "TRUE");
	
	define('ROOT', '../');
	define('CORE', '');

	require_once( CORE.'config.php');
	require_once( CORE.'functions.php');



	$type = (int)$_POST['type'];
	

	if( is_uploaded_file($_FILES['images']['tmp_name']) ) {

		

		$imgtype = $_FILES['images']['type'];
  
  		if( ( $imgtype == 'image/gif' || $imgtype == 'image/jpeg' || $imgtype == 'image/png') && $_FILES['images']['size'] <= 1048576 ) {

  			if( $type == 1 ) {

  				$id = count( getFiles( ROOT. $patch ) );
  				$patch = "assets/img/gallery/";

  				$src = ROOT. $patch.$id.'-'.$_FILES['images']['name'];

  				// копируем новое изображение
	          	resize( $_FILES['images']['tmp_name'], $src, 100, 100, true );

	          	echo json_encode(array('status' => 'ok', 'image' => $id.'-'.$_FILES['images']['name'] ));

  			} else {

  				$id = (int)$_POST['id'];
  				$image = clearCode( $_POST['image'] );

  				$patch = "assets/img/compare/";

  				//Получаем расширение файла
  				list($w_i, $h_i, $type) = getimagesize($_FILES['images']['tmp_name']);
				
			    $types = array('','gif','jpeg','png');
			    $extend = $types[$type];

			    

			    $dir = ROOT. $patch.'/'.$id;

			    if( !is_dir( $dir ) ) mkdir( $dir );

  				$src = $dir.'/'.$image.'.'.$extend;

  				// копируем новое изображение
	          	resize( $_FILES['images']['tmp_name'], $src, 100, 100, true );

	          	echo json_encode(array('status' => 'ok', 'image' => $id.'-'.$_FILES['images']['name'] ));

  			}

  			

  			
		
		  	

  		}

  		

	}




?>
