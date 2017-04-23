<!DOCTYPE HTML>
<html lang="en">
    <head>
        <!--=============== basic  ===============-->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Блеск-Автодоп</title>
        <!--=============== css  ===============-->	
        <link type="text/css" rel="stylesheet" href="{home}css/reset.css">
        <link type="text/css" rel="stylesheet" href="{home}css/admin.css">
        <link type="text/css" rel="stylesheet" href="{home}css/color.css">

        <link type="text/css" rel="stylesheet" href="{home}css/font-awesome.min.css">
        
        <!--=============== favicons ===============-->
        <link rel="shortcut icon" href="{home}images/favicon.png">

        <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet"> 
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet"> 

    </head>
    <body>

        <div class="topMenu">

            <div class="title"><i class="fa fa-cogs logo" aria-hidden="true"></i> blesk-avtodop</div>

            

            <ul class="nav">

                <li><a href="/admin/ad"><i class="fa fa-tags" aria-hidden="true"></i>  </a></li>
                <li><a href="/admin/price"><i class="fa fa-usd" aria-hidden="true"></i>  </a></li>
                <li><a href="/admin/shares"><i class="fa fa-signal" aria-hidden="true"></i>  </a></li>
                <li><a href="/admin/gallery"><i class="fa fa-picture-o" aria-hidden="true"></i>  </a></li>
                <li><a href="/admin/works"><i class="fa fa-taxi" aria-hidden="true"></i>  </a></li>
                <li><a href="/admin/reviews"><i class="fa fa-comment" aria-hidden="true"></i>  </a></li>

            </ul>

            <div class="logOut" onclick="logout();"><i class="fa fa-user-circle-o" aria-hidden="true"> </i> LogOut</div>
        </div>

        <div class="leftMenu">
            <ul>

                <li><a href="/admin/ad"><i class="fa fa-tags" aria-hidden="true"></i> Реклама </a></li>
                <li><a href="/admin/price"><i class="fa fa-usd" aria-hidden="true"></i> Цены </a></li>
                <li><a href="/admin/shares"><i class="fa fa-signal" aria-hidden="true"></i> Акции </a></li>
                <li><a href="/admin/gallery"><i class="fa fa-picture-o" aria-hidden="true"></i> Галерея </a></li>
                <li><a href="/admin/works"><i class="fa fa-taxi" aria-hidden="true"></i> Работы </a></li>
                <li><a href="/admin/reviews"><i class="fa fa-comment" aria-hidden="true"></i> Отзывы </a></li>
                
                
                
            </ul>
        </div>


        <div class="content clear">

            <div class="speed-bar">{speed-bar}</div>
            
            {content}


        </div>


    </body>

    <script type="text/javascript">
        
        var home = "{home}";
        var coreDir = home+"core/";

    </script>

    <script type="text/javascript" src="{home}js/jquery.min.js"></script>
    <script type="text/javascript" src="{home}js/admin/highlight.js"></script>

    <script type="text/javascript" src="{home}js/admin/image-preview.min.js"></script>
    <script type="text/javascript" src="{home}js/admin/dmuploader.min.js"></script>
    <script type="text/javascript" src="{home}js/admin/uploader.js"></script>

    <script type="text/javascript" src="{home}js/admin/admin.js"></script>


</html>