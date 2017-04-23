<!DOCTYPE HTML>
<html lang="en">
    <head>
        <!--=============== basic  ===============-->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Koffee с Совой</title>
        <!--=============== css  ===============-->
        <link type="text/css" rel="stylesheet" href="{home}css/reset.css">
        <link type="text/css" rel="stylesheet" href="{home}css/admin.css">
        <link type="text/css" rel="stylesheet" href="{home}css/color.css">
        <!--=============== favicons ===============-->
        <link rel="shortcut icon" href="{home}images/favicon.png">
    </head>
    <body class="login">

        <div id="adminForm" class="form">
            <div class="title"> </div>
            
            <div class="case">

                <div class="shadow">Username</div>
                <div class="input name" contenteditable="true" spellcheck="false" default="Username"></div>
                
            </div>

            <div class="case">

                <div class="shadow">Password</div>
                <input class="input pass" spellcheck="false" default="Password" type="password" value="" autocomplete="off">
                
            </div>
            <div class="button" onclick="aut();">Let's go</div>
        </div>

    </body>

    <script type="text/javascript">
        
        var home = "{home}";
        var coreDir = home+"core/";

    </script>
    
    <script type="text/javascript" src="{home}js/jquery.min.js"></script>
    <script type="text/javascript" src="{home}js/admin/admin.js"></script>

</html>