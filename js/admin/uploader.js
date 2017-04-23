
$('#gallery').dmUploader({

        url: coreDir+'uploader.php',
        dataType: 'html',
        allowedTypes: 'image/*',
        fileName:'images',
        

        onInit: function(){



          //$.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
        },

        changeData: function() {

          extraData: {
              imageID:6
          }



        },

        onBeforeUpload: function(id){

          

          //console.log( $.dmUploader.pluginName );

          //$.danidemo.addLog('#demo-debug', 'default', 'Starting the upload of #' + id);

          //$.danidemo.updateFileStatus(id, 'default', 'Uploading...');
        },

        onNewFile: function( id, file, type ) {

          
          
          //$.danidemo.addFile('#demo-files', id, file);

          /*** Begins Image preview loader ***/
          if (typeof FileReader !== "undefined"){
            
            var reader = new FileReader();

            // Last image added
            var img = $(this);

            reader.onload = function (e) {



              if( type == 1 ) {

                var image;

                $("#gallery .add-image").before('<div class="image loading-image" image="">'+
                  '<div class="overlay"><i class="fa fa-trash" aria-hidden="true"></i></div>'+
                  '<img src="'+e.target.result+'"/>'+
                '</div>');

              }

            }

            reader.readAsDataURL(file);

          } else {
            // Hide/Remove all Images if FileReader isn't supported
            $('#demo-files').find('.demo-image-preview').remove();
          }
          /*** Ends Image preview loader ***/

        },
        onComplete: function(){

          //$.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
        },
        onUploadProgress: function(id, percent){
          //var percentStr = percent + '%';

          //$.danidemo.updateFileProgress(id, percentStr);
        },
        onUploadSuccess: function(id, data){

          var data = JSON.parse(data);

          $(".loading-image:first").attr({"image": data.image}).removeClass("loading-image");

          //$.danidemo.addLog('#demo-debug', 'success', 'Upload of file #' + id + ' completed');

          //$.danidemo.addLog('#demo-debug', 'info', 'Server Response for file #' + id + ': ' + JSON.stringify(data));

          //$.danidemo.updateFileStatus(id, 'success', 'Upload Complete');

          //$.danidemo.updateFileProgress(id, '100%');
        },

        onUploadError: function(id, message){

          alert(message)
          
          //$.danidemo.updateFileStatus(id, 'error', message);

          //$.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);
        },
        onFileTypeError: function(file){
          //$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');
        },
        onFileSizeError: function(file){
          //$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');
        },
        onFallbackMode: function(message){
          //$.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
        }
});




$('#works').dmUploader({

        url: coreDir+'uploader.php',
        dataType: 'html',
        allowedTypes: 'image/*',
        fileName:'images',
        

        onInit: function(){



          //$.danidemo.addLog('#demo-debug', 'default', 'Plugin initialized correctly');
        },

        changeData: function() {

          extraData: {
              imageID:6
          }



        },

        onBeforeUpload: function(id){

          

          //console.log( $.dmUploader.pluginName );

          //$.danidemo.addLog('#demo-debug', 'default', 'Starting the upload of #' + id);

          //$.danidemo.updateFileStatus(id, 'default', 'Uploading...');
        },

        onNewFile: function( id, file, type ) {
          
          
          //$.danidemo.addFile('#demo-files', id, file);

          /*** Begins Image preview loader ***/
          if (typeof FileReader !== "undefined"){


            
            var reader = new FileReader();

            // Last image added
            var active = $(".active-uploader")
            var img = active.find("img");
            active.addClass("ready");



            reader.onload = function (e) {

                img.attr({"src": e.target.result });
 

            }

            reader.readAsDataURL(file);

          } else {
            // Hide/Remove all Images if FileReader isn't supported
            $('#demo-files').find('.demo-image-preview').remove();
          }
          /*** Ends Image preview loader ***/

        },
        onComplete: function(){

          //$.danidemo.addLog('#demo-debug', 'default', 'All pending tranfers completed');
        },
        onUploadProgress: function(id, percent){
          //var percentStr = percent + '%';

          //$.danidemo.updateFileProgress(id, percentStr);
        },
        onUploadSuccess: function(id, data){

          var data = JSON.parse(data);

          $(".loading-image:first").attr({"image": data.image}).removeClass("loading-image");

          //$.danidemo.addLog('#demo-debug', 'success', 'Upload of file #' + id + ' completed');

          //$.danidemo.addLog('#demo-debug', 'info', 'Server Response for file #' + id + ': ' + JSON.stringify(data));

          //$.danidemo.updateFileStatus(id, 'success', 'Upload Complete');

          //$.danidemo.updateFileProgress(id, '100%');
        },

        onUploadError: function(id, message){

          alert(message)
          
          //$.danidemo.updateFileStatus(id, 'error', message);

          //$.danidemo.addLog('#demo-debug', 'error', 'Failed to Upload file #' + id + ': ' + message);
        },
        onFileTypeError: function(file){
          //$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: must be an image');
        },
        onFileSizeError: function(file){
          //$.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' cannot be added: size excess limit');
        },
        onFallbackMode: function(message){
          //$.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
        }
});