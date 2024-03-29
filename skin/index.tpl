<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Главная страница</title>
    <meta content="" name="author">
    <meta content="" name="description">
    <meta content="" name="keywords">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <meta name="google-site-verification" content="iVOX40lpI8BwVVSjJi0Z2XxiDf-dMpg-Y0g0R-YUeg4">
    <link rel="stylesheet" href="assets/css/foundation.css">
    <link rel="stylesheet" href="assets/css/app.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Exo+2">
    
  </head>
  <body>
    <div class="wrapper">
      <header class="header">
        <div class="container container--header">
          <nav class="header__nav">
            <ul class="header__list">
              <li class="header__item"><a class="header__item-link header__item-services" href="#service">Услуги</a></li>
              <li class="header__item"><a class="header__item-link header__item-gallery" href="#gallery">Галерея</a></li>
              <li class="header__item"><a class="header__item-link header__item-feedback" href="#feedback">Отзывы</a></li>
              <li class="header__item"><a class="header__item-link header__item-contacts" href="#contacts">Контакты</a></li>
            </ul>
          </nav>
          <div class="header__phone"><span class="header__phone-text"> 8(937)719-15-18</span><span class="header__hours"> Работаем с 8:00 до 20:00</span></div>
        </div>
      </header>
      <section class="slider">
        <div class="slider__title">
          <h1 class="slider__title-text">Блеск-Автодоп</h1>
          <h2 class="slider__title-desc">Автосервис / Мойка</h2>
        </div>
        <div class="slider__body" id="slider">
          <ul class="slider__list">
            
            {ads}
            
          </ul>
        </div>
        <div class="slider__link-wrap"><a class="slider__link" href="#ads">акции</a></div>
      </section>
      <section class="service" id="service">
        <div class="container container--service">
          <div class="service__title">
            <h2 class="service__title-text title">Услуги</h2>
          </div>
          <ul class="service__list">
            <li class="service__item">
              <div class="service__picture service__picture--transmission"></div><span class="service__item-text">РЕМОНТ  ТРАНСМИССИИ, ТОРМОЗНОЙ  СИСТЕМЫ, КПП,  РЕДУКТОРОВ.</span>
            </li>
            <li class="service__item">
              <div class="service__picture service__picture--electro"></div><span class="service__item-text">ПРОБЛЕМЫ  ЭЛЕКТРОСИСТЕМЫ,  КОМПЬЮТЕРНАЯ  ДИАГНОСТИКА.</span>
            </li>
            <li class="service__item">
              <div class="service__picture service__picture--body"></div><span class="service__item-text">КУЗОВНЫЕ  И  ПОКРАСОЧНЫЕ  РАБОТЫ  ЛЮБОЙ СЛОЖНОСТИ.</span>
            </li>
            <li class="service__item">
              <div class="service__picture service__picture--tires"></div><span class="service__item-text">ШИНОМОНТАЖНЫЕ  РАБОТЫ, ЗАКАЧКА  АЗОТОМ.</span>
            </li>
            <li class="service__item">
              <div class="service__picture service__picture--wash"></div><span class="service__item-text">АВТОМОБИЛЬНАЯ МОЙКА   И  ХИМЧИСТКА.</span>
            </li>
            <li class="service__item">
              <div class="service__picture service__picture--engine"></div><span class="service__item-text">РЕМОНТ ДВИГАТЕЛЯ</span>
            </li>
          </ul><span class="service__button">Посмотреть весь спектр услуг</span>
          <ul class="service__prices">
            <li class="service__prices-item"><span class="service__prices-name">Автоэлектрик \ Компьтерная диагностика</span><span class="service__prices-price">от 500р</span></li>
            <li class="service__prices-item"><span class="service__prices-name">Ремонт ходовой и навесного оборудования</span><span class="service__prices-price">от 500р</span></li>
            <li class="service__prices-item"><span class="service__prices-name">Замена рычагов передней подвески</span><span class="service__prices-price">от 700р до 1500р</span></li>
            <li class="service__prices-item"><span class="service__prices-name">Замена рычагов задней подвески</span><span class="service__prices-price">от 500р до 1000р</span></li>
            <li class="service__prices-item"><span class="service__prices-name">Замена сайлентблоков</span><span class="service__prices-price">от 300р</span></li>
            <li class="service__prices-item"><span class="service__prices-name">Кузовной ремонт</span><span class="service__prices-price">от 3000р за позицию</span></li>
            <li class="service__prices-item"><span class="service__prices-name">Заправка кондиционера</span><span class="service__prices-price">2р за грамм</span></li>
            <li class="service__prices-item"><span class="service__prices-name">Заправка кондиционера</span><span class="service__prices-price">1500р полная</span></li>
          </ul>
          <div class="service__ads" id="ads">
            <div class="service__title-ads">
              <h3 class="service__ads-text title">наши акции</h3>
            </div>
            <ul class="service__ads-list">

              {shares}
              
            </ul>
          </div>
        </div>
      </section>
      <section class="gallery" id="gallery">
        <div class="container container--gallery">
          <div class="gallery__title">
            <h2 class="gallery__title-text title">Галерея</h2>
          </div>
          <div class="gallery__pictures">
            <ul class="gallery__pictures-list">
              
              {gallery}
              
            </ul>
          </div>
          <div class="gallery__works">
            <h2 class="gallery__works-title title">Наши работы</h2>
            <ul class="gallery__works-list">

              {compare}

            </ul>
          </div>
        </div>
      </section>
      <section class="feedback" id="feedback">
        <div class="feedback__title">
          <h2 class="feedback__title-text title">Отзывы</h2>
        </div>
        <div class="feedback__slider-bg">
          <div class="feedback__slider" id="feedback__slider">
            <ul class="feedback__slider-list">
              
              {reviews}

            </ul>
          </div>
        </div>
        <div class="container container--feedback">
          <div class="feedback__form">
            <div class="feedback__form-wrap">
              <input class="form__name form__input placeholder italic" type="text" placeholder="Ваше Имя" required>
              <input class="form__car form__input placeholder italic" type="text" placeholder="Марка и модель авто, год выпуска" required>
            </div>
            <div class="feedback__textarea">
              <div class="feedback__textarea-wrap">
                <textarea class="form__text placeholder italic" maxlength="650" placeholder="Ваш отзыв" required></textarea>
              </div>
              <div class="textarea__counter"><span class="textarea__counter-text">0</span><span class="textarea__counter-max">/ 650</span></div>
            </div>
            <div class="feedback__button-wrap">
              <button class="feedback__button">Добавить</button>
            </div>
          </div>
        </div>
      </section>
      <section class="contacts" id="contacts">
        <div class="container container--contacts">
          <div class="contacts__title">
            <h2 class="contacts__title-text title">Контакты</h2>
          </div>
          <div class="contacts__wrapper">
            <div class="contacts__address">
              <h3 class="contacts__address-title">Наш адрес</h3>
              <div class="contacts__address-wrapper"><i class="fa fa fa-map-marker" aria-hidden="true"></i><span class="contacts__address-text">Волгоград, Краснооктябрьский район, улица Пельше 2б</span></div>
            </div>
            <div class="contacts__phone">
              <h3 class="contacts__phone-title">Свяжитесь с нами!</h3>
              <div class="contacts__phone-wrapper"><i class="fa fa fa-mobile" aria-hidden="true"></i><span class="contacts__phone-number">Автосервис</span><a class="contacts__tel" href="tel:+7(937)533-06-08">+7(937)533-06-08</a></div>
              <div class="contacts__phone-wrapper"><i class="fa fa fa-mobile" aria-hidden="true"></i><span class="contacts__phone-number">Мойка</span><a class="contacts__tel" href="tel:+7 (937)719-15-18">+7(937)719-15-18</a></div>
            </div>
          </div>
        </div>
        <div class="contacts__map-title">
          <h2 class="contacts__map-text">Где нас найти</h2>
        </div>
        <div class="contacts__map" id="map"></div>
      </section><a class="wrapper__button" href="#"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
    </div>
    <footer class="footer">
      <div class="footer__line"></div>
      <div class="container container--footer">
        <div class="footer__company">
          <h3 class="footer__company-info">Автосервис / Мойка</h3><span class="footer__company-text">БЛЕСК-АвтоДоп</span>
          <div class="footer__icons">
            <div class="footer__icons-first"></div>
            <div class="footer__icons-second"></div>
            <div class="footer__icons-third"></div>
          </div>
        </div>
        <div class="footer__info">
          <div class="footer__address"><span class="footer__address-text">г.Волгоград, Краснооктябрьский район, улица Пельше 2б</span></div>
          <div class="footer__phone"><span class="footer__phone-number">8(937)533-06-08</span><span class="footer__phone-number">8(937)719-15-18</span></div>
        </div>
      </div>
    </footer>
    <script type="text/javascript">
      var home="{home}";var coreDir=home+"core/";
    </script> 
    <script src="assets/js/foundation.js" defer></script>
    <script src="assets/js/hammer.js" defer></script>
    <script src="assets/js/compare.js" defer></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script><!--[if lt IE 9]>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script><![endif]-->
    
    <script src="assets/js/app.js" defer></script>
  </body>
</html>