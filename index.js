var app = require('express')();
var bodyparser=require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);


//app config
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
    console.log(req.body);
    res.redirect('/chat/'+req.body.usrname);
    //res.sendFile(__dirname + '/chat.html');
});

app.get('/chat/*', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
    //io.emit('User Connects');
    socket.on('User Connects',function(usrname){
        io.emit('User Connects',usrname); 
    });
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('User disconnected');
  });
  socket.on('chat message', function(msg){
      io.emit('chat message',msg);
//    console.log('message: ' + msg);
  });
  socket.on('user typing', function(){
      io.emit('user typing');
      console.log('user typing');
  });
  socket.on('user NOTtyping', function(){
      io.emit('user NOTtyping');
      console.log('user stop typing');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
