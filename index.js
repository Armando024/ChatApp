var express=require('express');
var app = express();
var bodyparser=require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path=require('path');

//app config
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
//maybe add more styling in the future?
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/chat',express.static(path.join(__dirname,'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
    res.redirect('/chat/'+req.body.usrname);
});

app.get('/chat/*', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});
//Socket Configuration
//socket is for one client
//io is for everyone
var activeusers=[];
var newuser=[];
io.on('connection', function(socket){
    
  socket.on('User Connects',function(usrname){
            socket.username=usrname;
            activeusers.push(usrname);
            socket.id=activeusers.length-1;
            io.emit('User Connects',usrname,activeusers); 
  });

  socket.on('disconnect', function(){
    activeusers[socket.id]=null;
    io.emit('User disconnected',socket.username,socket.id);
  });
  socket.on('chat message', function(data){
      socket.broadcast.emit('chat message',{message:data.message,username:data.username});//bug?
  });
  socket.on('user typing', function(){
      io.emit('user typing');
  });
  socket.on('user NOTtyping', function(){
      io.emit('user NOTtyping');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
