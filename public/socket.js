
        $(function () {
            var socket = io();
            var a=window.location.pathname;
            //console.log(a);
            //console.log(a.split('/'));
            a=a.split('/');
            var usrname=a[2];
            var newUser=true; 
            socket.emit('User Connects',a[2]); //when user initially connects

            socket.on('chat message', function(data){
                $('#messages').append($('<div class="col-md-12 border-bottom">').html('<b>'+data.username+':</b>'+ data.message));
            });

            socket.on('user typing',function(){
                $('#usrtyping').show();
            });

            socket.on('user NOTtyping',function(){
                $('#usrtyping').hide();
            });
            socket.on('User Connects',function(usrname,activeusers){
                if (newUser) {
                    var i;
                    for(i=0;i<activeusers.length;i++){
                        if(activeusers[i]!=null)
                        $('#infousr').append($('<li id='+i+' >').text(activeusers[i]));
                    } 
                    newUser=false;
                }
                else {
                    var id=activeusers.length-1;
                $('#infousr').append($('<li id='+id+' >').text(activeusers[id]));
                }
                $('#messages').append($('<div class="col-md-12 text-center pt-1 pb-1  alert alert-success">').text(usrname+' connected '));
            });
            socket.on('User disconnected',function(usr,id){
                $('#'+id).remove();
                $('#messages').append($('<div class="col-md-12 text-center pt-1 pb-1 alert alert-danger">').text(usr+' disconnected'));
            });
           //Client events 
            $('form').submit(function(){
                socket.emit('chat message',{message:$('#m').val(),username:usrname});// $('#m').val(),usrname);
                $('#m').val('');
                $('#usrtyping').hide();
                return false;
            });
            $('#m').keyup(function(){
                if ($('#m').val()==''){
                    socket.emit('user NOTtyping');
                }
            });
            $('#m').keydown(function(){
                if ($('#m').val()!='')
                socket.emit('user typing');
            });

        });

