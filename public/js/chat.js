var socket = null;
var display = "none";
var name = "anonymous";
var message = "";
var count = 1;
$('.chat-container').slimScroll({
height:'300px',
wheelStep:100
});
var socket = io();
console.log('connected');
$('#end').click(function () {
    $('li.message').css('display', 'none');
	$('div.balloon').css('display', 'none');
    display = "none"; 
    console.log('ended');
});
$('#start').click(function () {
    newName = prompt("Type in your name");
    socket.emit('setName', {
                  nameFrom: name,
                  nameTo: newName
                  });
    console.log(name);
});
display = "inline";
$('li.message').slideDown(1000).fadeIn();

      
	  var connected = "Materialize.toast('<span class=\"green-text\">New user is connected!<span>', 4000, 'rounded place-center white');";

	  $('form').submit(function () {
	      var message = $('#message').val();
	      var words = message.split(" ");
	      if (words[0] == "/nick") {
	          words.shift();
	          newName = words.join(" ");
	          console.log("new name = " + newName);
	          socket.emit('setName', {
                  nameFrom: name,
                  nameTo: newName
                  }
                  );
              $('#message').val('');
	          return false;
	      } else {
	          console.log("new message = " + message);
	          socket.emit('chat message', { text: message, sender: name });
	          $('#message').val('');
	          return false;
	      }
	  });

	  socket.on('connect', function (message) {
	      time = new Date();
	      name = name + time.getMilliseconds();
	      Materialize.toast('<span class="green-text">New user is connected!<span>', 4000, 'rounded place-center white');
	  });
		socket.on('setName', function (message) {
            if(message.nameFrom == name){
		    $("#messages").append($("<li class=\"green-text message\"> Your name has been changed from " + name + " to " + message.nameTo + "</li>"));
		    name = message.nameTo;}
            else{
                $("#messages").append($("<li class=\"green-text message\"> " + message.nameFrom + " changed nick to " + message.nameTo + "</li>"));
            }
		});
		socket.on('chat message', function (msg) {
		    var time = new Date();
		    var song = new Audio('alert.ogg');
			
		    song.play();
			var direction= "";
			id= time.getMilliseconds();
			_id = '#'+ id;
			//time= time.getString();
			if(msg.sender == name){
				direction= "left";
			}else{ direction = "right";}
		    $('#messages').append($('<div>').attr('class', 'balloon '+direction).attr('id', id).html(' <span class=\"green-text message\">' + msg.sender + ": " +"</span></br>" + msg.text +"</br>" + time)).fadeIn();
			console.log(_id);

		    count++;
		    $('#messages').scrollTop($('li:last').height() * count);
		    count++;
		});