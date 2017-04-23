function stopEvt( e ) {
	e = e || window.event, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !
		0, e.preventDefault ? e.preventDefault() : e.returnValue = !1
}

function hide_message( e ) {
	var t = $( "#message-" + e );
	t.slideUp( 300, function() {
		t.remove()
	} )
}

function message( e, t, a ) {
	if ( !a ) var a = 3e3;
	var s = $( "#message_content" );
	if ( s.length || $( "body" ).append(
			'<div id="message_content" class="message_content"></div>' ), !t ) var t =
		"success";
	var i = $( ".message" ).length + 1;
	$( "#message_content" ).prepend( '<div id="message-' + i +
			'" class="message clear ' + t + '"><div class="text">' + e + "</div></div>" ),
		$( "#message-" + i ).slideDown( 300 ), setTimeout( "hide_message(" + i + ")",
			a )
}

function shadowUp( e ) {
	var t = e.parents( ".case" ).find( ".shadow" );
	e.hasClass( "active" ) ? t.animate( {
		top: "0px",
		opacity: 1
	}, 400 ) : t.animate( {
		top: "-50px",
		opacity: 0
	}, 400 ), e.toggleClass( "active" )
}

function aut() {
	var e = $( ".form .name" ).text(),
		t = $( ".form .pass" ).val();
	e && t ? $.post( coreDir + "login.php", {
		name: e,
		pass: t,
		action: 1
	}, function( e ) {
		1 == e ? location.reload() : message( e, "warning" )
	} ) : message( "Wrong username or password!", "warning" )
}

function logout() {
	$.post( coreDir + "login.php", {
		action: 2
	}, function( e ) {
		2 == e ? location.reload() : message( e )
	} )
}




function editAd( e ) {
	var t = $( "#ad-" + e );
	t.hasClass( "edited" ) || ( t.addClass( "edited" ), t.find( ".field" ).attr( {
		contenteditable: "true"
	} ), t.find( ".title" ).focus() )
}




function saveBlock(what) {



	var e = "",
		t = $( ".content ."+what );

	if ( t.length ) {

		t.each( function( t ) {

			var a = $( this ),
				s = a.attr( what+"-id" );

			var arr = Array();

			//Перебираем кажое поле .field и получаем значение для отправки
			a.find('.field').each(function(i) {

				arr[i] = '"' +$(this).html() +'"';

			});

			var data = arr.join(',');

			e += '"a' + s + '":["' + s + '", '+data+'],'

		} );

		var e = "{" + e.replace( /,+$/g, "" ) + "}"
	}


	$.post( coreDir + "editor.php", {

		ajax: what,
		data: e,
		lastID: lastID

	}, function( e ) {


		"ok" == e && ( message( "Информация обновлена" ), $( ".content .edited" ).removeClass(
			"edited" ), $( ".field" ).blur() )

	} )
}

function deleteBlock( what, e ) {
	var t = $( "#"+what+"-" + e );
	t.fadeTo( 300, 0, function() {
		t.slideUp( 300, function() {
			t.remove() && saveBlock(what), message( "Информация обновлена" )
		} )
	} )
}


function deleteImage( t, name, patch ) {

	$.post( coreDir + "editor.php", {

		ajax: "delete",
		image: name,
		patch: patch,

	}, function( e ) {
		"ok" == e && ( message( "Изображение удалено" ), t.remove() )
	} )

}

function deleteCompare( id ) {

	$.post( coreDir + "editor.php", {

		ajax: "delete-compare",
		id: id,

	}, function( e ) {

		message( "Работа удалена" ), $("#compare-"+id).remove();

	} )

}


$(document).on("click", "#gallery .image", function() {

	var t = $(this);
	var name = t.attr("image");

	deleteImage( t, name, 'assets/img/gallery/' )

});


function addBlock( e, t, what ) {
	
	var t = $( t ),
		e = lastID ? lastID : e;
	++e, lastID = e;

	$.post( coreDir + "editor.php", {

		ajax: "block",
		block: what,

	}, function( html ) {

		var html = html.replace(/{id}/img, e);

		if( what == "gallery" ) t.before( html );
		else $("#"+what).append( html );

	} );
	
}

$(document).on("click", ".compare", function() {


	$(".active-uploader").removeClass("active-uploader");
	$(this).addClass("active-uploader");


})

$(document).on("click", "#reviews .review .aprove", function() {

	var t = $(this);

	if( t.hasClass('aproved') ) {

		t.removeClass('aproved').find('.field').text('0');

	} else {

		t.addClass('aproved').find('.field').text('1');

	}


})


var pressed = 0,
	once = 0;

$( ".desc" ).on( "keydown", function( e ) {
	var t = e.keyCode;
	if ( !once ) return 17 == pressed && 66 == t ? ( once = 1, wrapSelectedText(),
		stopEvt( e ), !1 ) : void( pressed = t )
} ).on( "keyup", function( e ) {
	pressed = once = 0
} ), 

$( "#adminForm .input" ).on( "focus", function() {
	var e = $( this );
	e.hasClass( "pass" ) ? e.val() || shadowUp( e ) : e.text() || shadowUp( e )
} ).on( "blur", function() {
	var e = $( this );
	e.text() || e.hasClass( "pass" ) || shadowUp( e ), e.hasClass( "pass" ) &&
		"" == e.val() && shadowUp( e )
} ), $( ".form .input" ).on( "keypress", function( e ) {
	var t = e.keyCode,
		a = $( this );
	return a.hasClass( "pass" ) || 13 != t ? void( a.hasClass( "pass" ) && 13 ==
		t && aut() ) : ( a.parent( ".case" ).nextAll( ".case" ).find( ".input" ).focus(), !
		1 )
} ), 

$( document ).on( "focus", ".ad .field", function() {
	
	var e = $( this );
	e.text() == e.attr( "default" ) && e.text( '' ).removeClass( "gray" )

} ).on( "blur", ".ad .field", function() {

	var e = $( this );
	e.text() || e.text( e.attr( "default" ) ).addClass( "gray" )

} );

var lastCost = lastFree = 0;

$( document ).on( "blur", ".item .price", function() {
	0 == $( this ).text() && $( this ).text( "-" )
} ).on( "keypress", ".item .price", function( e ) {
	return 13 == e.keyCode ? ( $( this ).blur(), !1 ) : void 0
} );
var lastID = 0;