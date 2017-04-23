var counter = function(e) {

    var wrapper = $(".form__text");
    var length = wrapper.val().length;
    var maxLength = 650;


    if (length >= maxLength && ( e.keyCode != 8 ||  e.keyCode != 46 ) ) {

        $(".textarea__counter .textarea__counter-text").html( length );

        $(".textarea__counter-max").addClass("red");


    } else	{

        $(".textarea__counter-max").removeClass("red");
        $(".textarea__counter .textarea__counter-text").html( length );

    }




};

$(".form__text").bind('keyup', counter);
$(".form__text").bind('keydown', counter);


//Placeholder
$(".placeholder").focus(function() {

    $(this).removeClass("italic");

}).blur(function() {

    if( !$(this).val().length ) $(this).addClass("italic");

});

// accord

$(".service__button").on("click", function(){
    var t = $(this);


    $(".service__prices").stop().slideUp(300);

    t.next(".service__prices").stop().slideToggle(300, function () {

        if( $(this).is(":visible") ) $(this).css("display", "flex");

    });

});

// map

ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("map", {
        center: [48.783943, 44.578888],
        zoom: 17,
        controls : []
    });

    // Создаем ломаную с помощью вспомогательного класса Polyline.
    var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин ломаной.
        [48.785628, 44.577351],
        [48.784561, 44.579164],
        [48.784409, 44.578965],
        [48.784146, 44.579392],
        [48.783868, 44.579025]
    ], {
        // Описываем свойства геообъекта.
        // Содержимое балуна.
        balloonContent: "Ломаная линия"
    }, {
        // Задаем опции геообъекта.
        // Отключаем кнопку закрытия балуна.
        balloonCloseButton: false,
        // Цвет линии.
        strokeColor: "#ff1c26",
        // Ширина линии.
        strokeWidth: 4,
        // Коэффициент прозрачности.
        strokeOpacity: 0.9
    });

    // Добавляем линии на карту.


    myPlacemark = new ymaps.Placemark([48.783943, 44.578888], {
        hintContent: 'АвтоДоп',
        balloonContent: 'Автосервис \ Мойка'
    });

    // Ползунок изменения масштаба
    myMap.controls.add('zoomControl', {
        float: 'none',
        position: { left: 10, top: 44 }
    });
    myMap.behaviors.disable(['scrollZoom']);
    myMap.geoObjects
        .add(myPlacemark)
        .add(myPolyline);
}

// smooth scroll

$(document).ready(function () {
    $('.header__item-link').click(function (e) {

        var href = $(this).attr('href');

        $('html, body').animate({
            scrollTop:  $(href).offset().top
        }, 500);

        e.preventDefault();
    })
});

// button up

$(document).ready(function () {
    var btn = $('.wrapper__button');

    btn.on('click', function (e) {
       $('html, body').animate({
           scrollTop: 0
       }, 500);

        e.preventDefault();
    });

    $(window).on('scroll', function () {

        var t = $(this),
            height = t.height(),
            top = t.scrollTop();

        if(top > height) {
            if(!btn.is(':visible')) {
                btn.show(300, function () {
                    if( $(this).is(":visible") ) $(this).css("display", "flex");
                });

            }
        }   else    {
            btn.hide();
        }
    });


});


// gallery

$(document).on("click", "#gallery--pic .preview", function(e) {

    var t = $(this);

    var src = t.attr("src");

    var currentImg =  $('.gallery__pictures-pic[src="'+src+'"]');

    var next = currentImg.parent("li").next("li").find(".gallery__pictures-pic");

    if( !next.length ) {
        var next = $(".gallery__pictures-pic:first-child");
    }

    goImg( next.attr("src") );

    e.preventDefault();
    e.stopPropagation();

});



function goImg( src ) {

    var gallery = $("#gallery--pic");


    //Если нет галереи, добавляем
    if( !gallery.length ) {


        if( $("body").append('<div id="gallery--pic" class="fixed">'+
                '<div class="container__pic">'+
                '<i class="fa fa-times-circle close"></i>'+
                '<img class="preview" />'+
                '</div>'+
                '</div>') ) {

            var gallery = $("#gallery--pic");

            gallery.find(".preview").attr({"src": src});
            gallery.fadeIn(300);


        }

        //Иначе просто показываем и меняем ссылку у превью
    } else {

        gallery.find(".preview").attr({"src": src});
        gallery.fadeIn(300);

    }


    $("body, html").css({"overflow":"hidden"});


}

$(".gallery__pictures-pic").click(function() {

    var t = $(this);

    var src = t.attr("src");

    goImg( src );

});

$(document).on("click", ".fixed", function() {

    $("#gallery--pic").fadeOut(300);
    $("body, html").css({"overflow":"auto"});

});

// comparison
$(document).ready(function () {
    $('.gallery__comparison').imagesCompare();
});

// slider section

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

(function( $ ){

    $.fn.mySlider = function( contentClass, slideClass, time, interval ) {



        return this.each(function( ) {



            var t = $(this);

            var content = t.find(contentClass);
            var slides = t.find(slideClass);

            var pointsClass = "points";
            var pointClass = "point";


            //Добавляем точки
            function renderPoints() {

                if( t.append('<div class="'+pointsClass+'"></div>') ) {

                    var points = t.find("."+pointsClass);

                    slides.each(function(i) {

                        $(this).attr({"slide": i});

                        points.append('<span class="'+pointClass+'" item="'+i+'"></span>');

                    });

                }

                return true;

            }


            //Интервал карусели
            function sliderInterval() {

                return setInterval(function() {

                    var active = t.find(".active_slide");

                    //alert(slideClass)

                    var next = active.next(slideClass);



                    //Если слайды закончились
                    if( !next.length ) {


                        var i = 0;

                        content.animate({"left": 0}, time);

                        active.removeClass("active_slide");
                        t.find(slideClass+":first").addClass("active_slide");


                        t.find(".active_point").removeClass("active_point");
                        t.find("."+pointClass+':first').addClass("active_point");


                        return true;

                    }

                    content.stop().animate({"left": -next.position().left }, time, function() {

                        var i = next.attr("slide");

                        active.removeClass("active_slide");
                        next.addClass("active_slide");

                        t.find(".active_point").removeClass("active_point");
                        t.find("."+pointClass+'[item='+i+']').addClass("active_point");

                    });


                }, interval);

            }

            var sliderIntervalID = sliderInterval();


            //Вешаем обработчик на батоны
            $(document).on("click", "."+pointsClass+" ."+pointClass, function() {

                var _this = $(this);

                if( _this.hasClass("active_point") ) return true;

                clearInterval( sliderIntervalID );

                var i = _this.attr("item");

                var next = t.find('[slide='+ i +']');
                var active = t.find(".active_slide");

                    active.removeClass("active_slide");
                    next.addClass("active_slide");

                    t.find(".active_point").removeClass("active_point");
                    t.find("."+pointClass+'[item='+i+']').addClass("active_point");

                if( !next.length ) return;

               


                content.stop().animate({"left": -next.position().left }, time, function() {


                    

                    //Запускаем интервал
                    sliderIntervalID = sliderInterval();

                });

            })

            //Если батоны добавились, добавляем класс первой кнопке
            if( renderPoints() ) {

                t.find("."+pointsClass+" ."+pointClass+ ":first").addClass("active_point");
                t.find(slideClass+":first").addClass("active_slide");

            }

     })

    };
})( jQuery );

$("#slider").mySlider(".slider__list", ".slider__item", 1000, 4000);
$("#feedback__slider").mySlider(".feedback__slider-list", ".feedback__slider-item", 1000, 5000);


// smooth scroll to ads

$(document).ready(function () {

    $('.slider__link').click(function (e) {

        var href = $(this).attr('href');

        $('html, body').animate({
            scrollTop:  $(href).offset().top - ($(window).height()) / 4
        }, 500);

        e.preventDefault();
    });
});

// slider
$(function() {

    $('form').submit(function(e) {

        //e.preventDefault();
        //return false;

    });

});

$(document).on("click", ".feedback__button", function(e) {



    var t = $(this);
    var name = $(".feedback__form .form__name").val();
    var car = $(".feedback__form .form__car").val();
    var text = $(".feedback__form .form__text").val();

    if( !name || !car || !text ) return false;

    $.post( coreDir + "editor.php", {

        ajax: "addreview",
        name: name,
        car: car,
        text: text,

    }, function( answer ) {


            var name = $(".feedback__form .form__name").val('');
            var car = $(".feedback__form .form__car").val('');
            var text = $(".feedback__form .form__text").val('');

        if( answer == 'ok' ) {

            alert('Ваш отзыв добавлен. Спасибо!');

        } else if( answer == 'stop' ) {

            alert('Вы уже добавляли отзыв!');

        }

    } );

    e.preventDefault();
    e.stopPropagation();
    return false;

});




//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb3VudGVyID0gZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIHZhciB3cmFwcGVyID0gJChcIi5mb3JtX190ZXh0XCIpO1xyXG4gICAgdmFyIGxlbmd0aCA9IHdyYXBwZXIudmFsKCkubGVuZ3RoO1xyXG4gICAgdmFyIG1heExlbmd0aCA9IDY1MDtcclxuXHJcblxyXG4gICAgaWYgKGxlbmd0aCA+PSBtYXhMZW5ndGggJiYgKCBlLmtleUNvZGUgIT0gOCB8fCAgZS5rZXlDb2RlICE9IDQ2ICkgKSB7XHJcblxyXG4gICAgICAgICQoXCIudGV4dGFyZWFfX2NvdW50ZXIgLnRleHRhcmVhX19jb3VudGVyLXRleHRcIikuaHRtbCggbGVuZ3RoICk7XHJcblxyXG4gICAgICAgICQoXCIudGV4dGFyZWFfX2NvdW50ZXItbWF4XCIpLmFkZENsYXNzKFwicmVkXCIpO1xyXG5cclxuXHJcbiAgICB9IGVsc2VcdHtcclxuXHJcbiAgICAgICAgJChcIi50ZXh0YXJlYV9fY291bnRlci1tYXhcIikucmVtb3ZlQ2xhc3MoXCJyZWRcIik7XHJcbiAgICAgICAgJChcIi50ZXh0YXJlYV9fY291bnRlciAudGV4dGFyZWFfX2NvdW50ZXItdGV4dFwiKS5odG1sKCBsZW5ndGggKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59O1xyXG5cclxuJChcIi5mb3JtX190ZXh0XCIpLmJpbmQoJ2tleXVwJywgY291bnRlcik7XHJcbiQoXCIuZm9ybV9fdGV4dFwiKS5iaW5kKCdrZXlkb3duJywgY291bnRlcik7XHJcblxyXG5cclxuLy9QbGFjZWhvbGRlclxyXG4kKFwiLnBsYWNlaG9sZGVyXCIpLmZvY3VzKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJpdGFsaWNcIik7XHJcblxyXG59KS5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmKCAhJCh0aGlzKS52YWwoKS5sZW5ndGggKSAkKHRoaXMpLmFkZENsYXNzKFwiaXRhbGljXCIpO1xyXG5cclxufSk7XHJcblxyXG4vLyBhY2NvcmRcclxuXHJcbiQoXCIuc2VydmljZV9fYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ID0gJCh0aGlzKTtcclxuXHJcblxyXG4gICAgJChcIi5zZXJ2aWNlX19wcmljZXNcIikuc3RvcCgpLnNsaWRlVXAoMzAwKTtcclxuXHJcbiAgICB0Lm5leHQoXCIuc2VydmljZV9fcHJpY2VzXCIpLnN0b3AoKS5zbGlkZVRvZ2dsZSgzMDAsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYoICQodGhpcykuaXMoXCI6dmlzaWJsZVwiKSApICQodGhpcykuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbi8vIG1hcFxyXG5cclxueW1hcHMucmVhZHkoaW5pdCk7XHJcbnZhciBteU1hcCxcclxuICAgIG15UGxhY2VtYXJrO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFwXCIsIHtcclxuICAgICAgICBjZW50ZXI6IFs0OC43ODM5NDMsIDQ0LjU3ODg4OF0sXHJcbiAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgY29udHJvbHMgOiBbXVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LvQvtC80LDQvdGD0Y4g0YEg0L/QvtC80L7RidGM0Y4g0LLRgdC/0L7QvNC+0LPQsNGC0LXQu9GM0L3QvtCz0L4g0LrQu9Cw0YHRgdCwIFBvbHlsaW5lLlxyXG4gICAgdmFyIG15UG9seWxpbmUgPSBuZXcgeW1hcHMuUG9seWxpbmUoW1xyXG4gICAgICAgIC8vINCj0LrQsNC30YvQstCw0LXQvCDQutC+0L7RgNC00LjQvdCw0YLRiyDQstC10YDRiNC40L0g0LvQvtC80LDQvdC+0LkuXHJcbiAgICAgICAgWzQ4Ljc4NTYyOCwgNDQuNTc3MzUxXSxcclxuICAgICAgICBbNDguNzg0NTYxLCA0NC41NzkxNjRdLFxyXG4gICAgICAgIFs0OC43ODQ0MDksIDQ0LjU3ODk2NV0sXHJcbiAgICAgICAgWzQ4Ljc4NDE0NiwgNDQuNTc5MzkyXSxcclxuICAgICAgICBbNDguNzgzODY4LCA0NC41NzkwMjVdXHJcbiAgICBdLCB7XHJcbiAgICAgICAgLy8g0J7Qv9C40YHRi9Cy0LDQtdC8INGB0LLQvtC50YHRgtCy0LAg0LPQtdC+0L7QsdGK0LXQutGC0LAuXHJcbiAgICAgICAgLy8g0KHQvtC00LXRgNC20LjQvNC+0LUg0LHQsNC70YPQvdCwLlxyXG4gICAgICAgIGJhbGxvb25Db250ZW50OiBcItCb0L7QvNCw0L3QsNGPINC70LjQvdC40Y9cIlxyXG4gICAgfSwge1xyXG4gICAgICAgIC8vINCX0LDQtNCw0LXQvCDQvtC/0YbQuNC4INCz0LXQvtC+0LHRitC10LrRgtCwLlxyXG4gICAgICAgIC8vINCe0YLQutC70Y7Rh9Cw0LXQvCDQutC90L7Qv9C60YMg0LfQsNC60YDRi9GC0LjRjyDQsdCw0LvRg9C90LAuXHJcbiAgICAgICAgYmFsbG9vbkNsb3NlQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAvLyDQptCy0LXRgiDQu9C40L3QuNC4LlxyXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNmZjFjMjZcIixcclxuICAgICAgICAvLyDQqNC40YDQuNC90LAg0LvQuNC90LjQuC5cclxuICAgICAgICBzdHJva2VXaWR0aDogNCxcclxuICAgICAgICAvLyDQmtC+0Y3RhNGE0LjRhtC40LXQvdGCINC/0YDQvtC30YDQsNGH0L3QvtGB0YLQuC5cclxuICAgICAgICBzdHJva2VPcGFjaXR5OiAwLjlcclxuICAgIH0pO1xyXG5cclxuICAgIC8vINCU0L7QsdCw0LLQu9GP0LXQvCDQu9C40L3QuNC4INC90LAg0LrQsNGA0YLRgy5cclxuXHJcblxyXG4gICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs0OC43ODM5NDMsIDQ0LjU3ODg4OF0sIHtcclxuICAgICAgICBoaW50Q29udGVudDogJ9CQ0LLRgtC+0JTQvtC/JyxcclxuICAgICAgICBiYWxsb29uQ29udGVudDogJ9CQ0LLRgtC+0YHQtdGA0LLQuNGBIFxcINCc0L7QudC60LAnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQn9C+0LvQt9GD0L3QvtC6INC40LfQvNC10L3QtdC90LjRjyDQvNCw0YHRiNGC0LDQsdCwXHJcbiAgICBteU1hcC5jb250cm9scy5hZGQoJ3pvb21Db250cm9sJywge1xyXG4gICAgICAgIGZsb2F0OiAnbm9uZScsXHJcbiAgICAgICAgcG9zaXRpb246IHsgbGVmdDogMTAsIHRvcDogNDQgfVxyXG4gICAgfSk7XHJcbiAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XHJcbiAgICBteU1hcC5nZW9PYmplY3RzXHJcbiAgICAgICAgLmFkZChteVBsYWNlbWFyaylcclxuICAgICAgICAuYWRkKG15UG9seWxpbmUpO1xyXG59XHJcblxyXG4vLyBzbW9vdGggc2Nyb2xsXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcuaGVhZGVyX19pdGVtLWxpbmsnKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogICQoaHJlZikub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSlcclxufSk7XHJcblxyXG4vLyBidXR0b24gdXBcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBidG4gPSAkKCcud3JhcHBlcl9fYnV0dG9uJyk7XHJcblxyXG4gICAgYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICB9LCA1MDApO1xyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBoZWlnaHQgPSB0LmhlaWdodCgpLFxyXG4gICAgICAgICAgICB0b3AgPSB0LnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBpZih0b3AgPiBoZWlnaHQpIHtcclxuICAgICAgICAgICAgaWYoIWJ0bi5pcygnOnZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgYnRuLnNob3coMzAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoICQodGhpcykuaXMoXCI6dmlzaWJsZVwiKSApICQodGhpcykuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgZWxzZSAgICB7XHJcbiAgICAgICAgICAgIGJ0bi5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxufSk7XHJcblxyXG5cclxuLy8gZ2FsbGVyeVxyXG5cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNnYWxsZXJ5LS1waWMgLnByZXZpZXdcIiwgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIHZhciB0ID0gJCh0aGlzKTtcclxuXHJcbiAgICB2YXIgc3JjID0gdC5hdHRyKFwic3JjXCIpO1xyXG5cclxuICAgIHZhciBjdXJyZW50SW1nID0gICQoJy5nYWxsZXJ5X19waWN0dXJlcy1waWNbc3JjPVwiJytzcmMrJ1wiXScpO1xyXG5cclxuICAgIHZhciBuZXh0ID0gY3VycmVudEltZy5wYXJlbnQoXCJsaVwiKS5uZXh0KFwibGlcIikuZmluZChcIi5nYWxsZXJ5X19waWN0dXJlcy1waWNcIik7XHJcblxyXG4gICAgaWYoICFuZXh0Lmxlbmd0aCApIHtcclxuICAgICAgICB2YXIgbmV4dCA9ICQoXCIuZ2FsbGVyeV9fcGljdHVyZXMtcGljOmZpcnN0LWNoaWxkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvSW1nKCBuZXh0LmF0dHIoXCJzcmNcIikgKTtcclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGdvSW1nKCBzcmMgKSB7XHJcblxyXG4gICAgdmFyIGdhbGxlcnkgPSAkKFwiI2dhbGxlcnktLXBpY1wiKTtcclxuXHJcblxyXG4gICAgLy/QldGB0LvQuCDQvdC10YIg0LPQsNC70LXRgNC10LgsINC00L7QsdCw0LLQu9GP0LXQvFxyXG4gICAgaWYoICFnYWxsZXJ5Lmxlbmd0aCApIHtcclxuXHJcblxyXG4gICAgICAgIGlmKCAkKFwiYm9keVwiKS5hcHBlbmQoJzxkaXYgaWQ9XCJnYWxsZXJ5LS1waWNcIiBjbGFzcz1cImZpeGVkXCI+JytcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29udGFpbmVyX19waWNcIj4nK1xyXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZmEgZmEtdGltZXMtY2lyY2xlIGNsb3NlXCI+PC9pPicrXHJcbiAgICAgICAgICAgICAgICAnPGltZyBjbGFzcz1cInByZXZpZXdcIiAvPicrXHJcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICc8L2Rpdj4nKSApIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBnYWxsZXJ5ID0gJChcIiNnYWxsZXJ5LS1waWNcIik7XHJcblxyXG4gICAgICAgICAgICBnYWxsZXJ5LmZpbmQoXCIucHJldmlld1wiKS5hdHRyKHtcInNyY1wiOiBzcmN9KTtcclxuICAgICAgICAgICAgZ2FsbGVyeS5mYWRlSW4oMzAwKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/QmNC90LDRh9C1INC/0YDQvtGB0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvCDQuCDQvNC10L3Rj9C10Lwg0YHRgdGL0LvQutGDINGDINC/0YDQtdCy0YzRjlxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgZ2FsbGVyeS5maW5kKFwiLnByZXZpZXdcIikuYXR0cih7XCJzcmNcIjogc3JjfSk7XHJcbiAgICAgICAgZ2FsbGVyeS5mYWRlSW4oMzAwKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgICQoXCJib2R5LCBodG1sXCIpLmNzcyh7XCJvdmVyZmxvd1wiOlwiaGlkZGVuXCJ9KTtcclxuXHJcblxyXG59XHJcblxyXG4kKFwiLmdhbGxlcnlfX3BpY3R1cmVzLXBpY1wiKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgdCA9ICQodGhpcyk7XHJcblxyXG4gICAgdmFyIHNyYyA9IHQuYXR0cihcInNyY1wiKTtcclxuXHJcbiAgICBnb0ltZyggc3JjICk7XHJcblxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuZml4ZWRcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJChcIiNnYWxsZXJ5LS1waWNcIikuZmFkZU91dCgzMDApO1xyXG4gICAgJChcImJvZHksIGh0bWxcIikuY3NzKHtcIm92ZXJmbG93XCI6XCJhdXRvXCJ9KTtcclxuXHJcbn0pO1xyXG5cclxuLy8gY29tcGFyaXNvblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjbXlJbWFnZUNvbXBhcmUsICNteUltYWdlQ29tcGFyZTEnKS5pbWFnZXNDb21wYXJlKCk7XHJcbn0pO1xyXG5cclxuLy8gc2xpZGVyIHNlY3Rpb25cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xyXG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XHJcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xyXG59XHJcblxyXG4oZnVuY3Rpb24oICQgKXtcclxuXHJcbiAgICAkLmZuLm15U2xpZGVyID0gZnVuY3Rpb24oY29udGVudENsYXNzLCBzbGlkZUNsYXNzLCB0aW1lLCBpbnRlcnZhbCkge1xyXG5cclxuICAgICAgICB2YXIgdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBjb250ZW50ID0gdC5maW5kKGNvbnRlbnRDbGFzcyk7XHJcbiAgICAgICAgdmFyIHNsaWRlcyA9IHQuZmluZChzbGlkZUNsYXNzKTtcclxuXHJcbiAgICAgICAgdmFyIHBvaW50c0NsYXNzID0gXCJwb2ludHNcIjtcclxuICAgICAgICB2YXIgcG9pbnRDbGFzcyA9IFwicG9pbnRcIjtcclxuXHJcblxyXG4gICAgICAgIC8v0JTQvtCx0LDQstC70Y/QtdC8INGC0L7Rh9C60LhcclxuICAgICAgICBmdW5jdGlvbiByZW5kZXJQb2ludHMoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiggdC5hcHBlbmQoJzxkaXYgY2xhc3M9XCInK3BvaW50c0NsYXNzKydcIj48L2Rpdj4nKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnRzID0gdC5maW5kKFwiLlwiK3BvaW50c0NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzbGlkZXMuZWFjaChmdW5jdGlvbihpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XCJzbGlkZVwiOiBpfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiJytwb2ludENsYXNzKydcIiBpdGVtPVwiJytpKydcIj48L3NwYW4+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy/QmNC90YLQtdGA0LLQsNC7INC60LDRgNGD0YHQtdC70LhcclxuICAgICAgICBmdW5jdGlvbiBzbGlkZXJJbnRlcnZhbCgpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdC5maW5kKFwiLmFjdGl2ZV9zbGlkZVwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBhY3RpdmUubmV4dChzbGlkZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9CV0YHQu9C4INGB0LvQsNC50LTRiyDQt9Cw0LrQvtC90YfQuNC70LjRgdGMXHJcbiAgICAgICAgICAgICAgICBpZiggIW5leHQubGVuZ3RoICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYW5pbWF0ZSh7XCJsZWZ0XCI6IDB9LCB0aW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLnJlbW92ZUNsYXNzKFwiYWN0aXZlX3NsaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQuZmluZChzbGlkZUNsYXNzK1wiOmZpcnN0XCIpLmFkZENsYXNzKFwiYWN0aXZlX3NsaWRlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmFjdGl2ZV9wb2ludFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9wb2ludFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0LmZpbmQoXCIuXCIrcG9pbnRDbGFzcysnW2l0ZW09JytpKyddJykuYWRkQ2xhc3MoXCJhY3RpdmVfcG9pbnRcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGVudC5zdG9wKCkuYW5pbWF0ZSh7XCJsZWZ0XCI6IC1uZXh0LnBvc2l0aW9uKCkubGVmdCB9LCB0aW1lLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuZXh0LmF0dHIoXCJzbGlkZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLnJlbW92ZUNsYXNzKFwiYWN0aXZlX3NsaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQuYWRkQ2xhc3MoXCJhY3RpdmVfc2xpZGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYWN0aXZlX3BvaW50XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlX3BvaW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHQuZmluZChcIi5cIitwb2ludENsYXNzKydbaXRlbT0nK2krJ10nKS5hZGRDbGFzcyhcImFjdGl2ZV9wb2ludFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9LCBpbnRlcnZhbCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNsaWRlckludGVydmFsSUQgPSBzbGlkZXJJbnRlcnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v0JLQtdGI0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LHQsNGC0L7QvdGLXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5cIitwb2ludHNDbGFzcytcIiAuXCIrcG9pbnRDbGFzcywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgaWYoIF90aGlzLmhhc0NsYXNzKFwiYWN0aXZlX3BvaW50XCIpICkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKCBzbGlkZXJJbnRlcnZhbElEICk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaSA9IF90aGlzLmF0dHIoXCJpdGVtXCIpO1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IHQuZmluZCgnW3NsaWRlPScrIGkgKyddJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gJChcIi5hY3RpdmVfc2xpZGVcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgY29udGVudC5zdG9wKCkuYW5pbWF0ZSh7XCJsZWZ0XCI6IC1uZXh0LnBvc2l0aW9uKCkubGVmdCB9LCB0aW1lLCBmdW5jdGlvbigpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0aXZlLnJlbW92ZUNsYXNzKFwiYWN0aXZlX3NsaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV4dC5hZGRDbGFzcyhcImFjdGl2ZV9zbGlkZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmFjdGl2ZV9wb2ludFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9wb2ludFwiKTtcclxuICAgICAgICAgICAgICAgIHQuZmluZChcIi5cIitwb2ludENsYXNzKydbaXRlbT0nK2krJ10nKS5hZGRDbGFzcyhcImFjdGl2ZV9wb2ludFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9CX0LDQv9GD0YHQutCw0LXQvCDQuNC90YLQtdGA0LLQsNC7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJJbnRlcnZhbElEID0gc2xpZGVySW50ZXJ2YWwoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL9CV0YHQu9C4INCx0LDRgtC+0L3RiyDQtNC+0LHQsNCy0LjQu9C40YHRjCwg0LTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YEg0L/QtdGA0LLQvtC5INC60L3QvtC/0LrQtVxyXG4gICAgICAgIGlmKCByZW5kZXJQb2ludHMoKSApIHtcclxuXHJcbiAgICAgICAgICAgIHQuZmluZChcIi5cIitwb2ludHNDbGFzcytcIiAuXCIrcG9pbnRDbGFzcysgXCI6Zmlyc3RcIikuYWRkQ2xhc3MoXCJhY3RpdmVfcG9pbnRcIik7XHJcbiAgICAgICAgICAgIHQuZmluZChzbGlkZUNsYXNzK1wiOmZpcnN0XCIpLmFkZENsYXNzKFwiYWN0aXZlX3NsaWRlXCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxufSkoIGpRdWVyeSApO1xyXG5cclxuJChcIiNzbGlkZXJcIikubXlTbGlkZXIoXCIuc2xpZGVyX19saXN0XCIsIFwiLnNsaWRlcl9faXRlbVwiLCAxMDAwLCA0MDAwKTtcclxuJChcIiNmZWVkYmFja19fc2xpZGVyXCIpLm15U2xpZGVyKFwiLmZlZWRiYWNrX19zbGlkZXItbGlzdFwiLCBcIi5mZWVkYmFja19fc2xpZGVyLWl0ZW1cIiwgMTAwMCwgNDAwMCk7XHJcblxyXG5cclxuLy8gc21vb3RoIHNjcm9sbCB0byBhZHNcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKCcuc2xpZGVyX19saW5rJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICAkKGhyZWYpLm9mZnNldCgpLnRvcCAtICgkKHdpbmRvdykuaGVpZ2h0KCkpIC8gNFxyXG4gICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIHNsaWRlclxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
