<?php
if (! defined ( 'WEBORK' )) {
	exit("Ooooooooooops!");
}

class skin {

	var $dir = "";
	var $skin = null;
	var $copy_skin = null;
	var $data = array();
	var $block_data = array ();
	var $result = array ();
	var $parse_time = 0;
	
	function load_skin($skin_name) {
		
		$time_before = $this->get_real_time();
		
		$this->skin = file_get_contents($this->dir."/".$skin_name);
		
		if (strpos ( $this->skin, "[aviable=" ) !== false) {
			$this->skin = preg_replace ( "#\\[aviable=(.+?)\\](.*?)\\[/aviable\\]#ies", "\$this->check_module('\\1', '\\2')", $this->skin );
		}
		
		if (strpos ( $this->skin, "[not-aviable=" ) !== false) {
			$this->skin = preg_replace ( "#\\[not-aviable=(.+?)\\](.*?)\\[/not-aviable\\]#ies", "\$this->check_module('\\1', '\\2', false)", $this->skin );
		}

		if( strpos( $this->skin, "{include file=" ) !== false ) {
			$this->skin = preg_replace( "#\\{include file=['\"](.+?)['\"]\\}#ies", "\$this->load_file('\\1', 'tpl')", $this->skin );
		}
		
		if (strpos ( $this->skin, "[not-group=" ) !== false) {
			$this->skin = preg_replace ( "#\\[not-group=(.+?)\\](.*?)\\[/not-group\\]#ies", "\$this->check_group('\\1', '\\2', false)", $this->skin );
		}
		
		if (strpos ( $this->skin, "[group=" ) !== false) {
			$this->skin = preg_replace ( "#\\[group=(.+?)\\](.*?)\\[/group\\]#ies", "\$this->check_group('\\1', '\\2')", $this->skin );
		}
		
		$this->copy_skin = $this->skin;
		
		$this->parse_time += $this->get_real_time() - $time_before;
	}
		
	function set($name, $var) {
		if( is_array($var) && count($var) ) {
			foreach ( $var as $key => $key_var ) {
				$this->set( $key, $key_var );
			}
		} else { $this->data[$name] = $var;}
	   
	}
	
		
	function set_block($name, $var) {
		if( is_array( $var ) && count( $var ) ) {
			foreach ( $var as $key => $key_var ) {
				$this->set_block( $key, $key_var );
			}
		} else $this->block_data[$name] = $var;
	}
	
	function compile($tpl) {
		
		$time_before = $this->get_real_time();
		
		if( count( $this->block_data ) ) {
			foreach ( $this->block_data as $key_find => $key_replace ) {
				$find_preg[] = $key_find;
				$replace_preg[] = $key_replace;
			}
			
			$this->copy_skin = preg_replace( $find_preg, $replace_preg, $this->copy_skin );
		}

		foreach ( $this->data as $key_find => $key_replace ) {
			$find[] = $key_find;
			$replace[] = $key_replace;
		}
		
		$this->copy_skin = str_replace( $find, $replace, $this->copy_skin );
		
		if( isset( $this->result[$tpl] ) ) $this->result[$tpl] .= $this->copy_skin;
		else $this->result[$tpl] = $this->copy_skin;
		
		$this->_clear();
		
		$this->parse_time += $this->get_real_time() - $time_before;
	}
	
	function check_group($groups, $block, $action = true) {
		global $member;
		
		$groups = explode( ',', $groups );
		
		if( $action ) {
			
			if( ! in_array( $member['group'], $groups ) ) return "";
		
		} else {
			
			if( in_array( $member['group'], $groups ) ) return "";
		
		}
		
		$block = str_replace( '\"', '"', $block );
		
		return $block;
	
	}
	
	function check_module($aviable, $block, $action = true) {
		global $do;

		$aviable = explode( '|', $aviable );
		
		$block = str_replace( '\"', '"', $block );
		
		if( $action ) {
			
			if( ! (in_array( $do, $aviable )) and ($aviable[0] != "global") ) return "";
			else return $block;
		
		} else {
			
			if( (in_array( $do, $aviable )) ) return "";
			else return $block;
		
		}
	
	}
	
	function _clear() {
		
		$this->data = array ();
		$this->block_data = array();
		$this->copy_skin = $this->skin;
	
	}
	
	function clear( $name="" ) {
		
		$this->data = array ();
		$this->block_data = array ();
		$this->copy_skin = null;
		$this->skin = null;
		if( $name ) $this->result[$name] = null;
	
	}
	
	function global_clear() {
		
		$this->clear();
		$this->result = array ();
	
	}
	
	function get_real_time() {
		list ( $seconds, $microSeconds ) = explode( ' ', microtime() );
		return (( float ) $seconds + ( float ) $microSeconds);
	}
}


?>