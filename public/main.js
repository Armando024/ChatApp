        var count=15;
        $('#m').keyup(function(){
            var _math=15-$('#m').val().length;
            $('#txtcount').text('Characters left: '+_math );
            
            if( $('#m').val().trim()!=''){
                if($('#m').hasClass('is-invalid')){
                    $('#m').removeClass('is-invalid');
                    $('.invalid-feedback').hide();
                }
                $('#m').addClass('is-valid');
                $('.valid-feedback').show();
                $('#btn1').prop('disabled',false);

            }
            else{
                if($('#m').hasClass('is-valid')){
                    $('#m').removeClass('is-valid');
                    $('.valid-feedback').hide();
                }
                $('#btn1').prop('disabled',true);
                $('#m').addClass('is-invalid');
                $('.invalid-feedback').show();
            }
       });
        
