var socket = io();

var sendButton = document.getElementById("send");
var nameInput = document.getElementById("nameinput");
var messageInput = document.getElementById("messageinput");

// if user clicks "Send" button, send message
sendButton.addEventListener("click", sendMessage);

// if ENTER key was pressed, send message
window.addEventListener("keypress", function(event){
	if (event.which === 13) {		
		sendMessage();
	}	
});

// when "chat" event received, display message
socket.on('chat', function(data){
  console.log('RECEIVED: name: '+ data.name + ', message: ' + data.message);
	displayNewMessage(data.name, data.message);
});


function sendMessage(event) {

	console.log('SENDING: name: '+ nameInput.value + ', message: ' + messageInput.value);
	socket.emit('chat', {name: nameinput.value, message: messageinput.value} ); 
  messageinput.value = '';  // clear out text field after sending message
}

function displayNewMessage (username, message) {

  var date, mon, yr, hh, mm, ss, ts;
  var d = new Date();
  mon = d.getMonth();
  day = d.getDate();
  yr =  d.getFullYear();
  hh = d.getHours();
  mm = d.getMinutes();
  ss = d.getSeconds();
  ts = '' +mon +'/' +day +'/' +yr + ' ' +hh +':' +mm +':' +ss + ' ';

   console.log(ts);

  var newMessage = document.createElement('div');
  newMessage.className = 'message';
  var messageTextNode = document.createTextNode(': ' + message);

  var newMessageUser = document.createElement('span');
  newMessageUser.className = 'username';
  newMessageUser.innerText = ts + ' ' +username;
  newMessage.appendChild(newMessageUser);
  newMessage.appendChild(messageTextNode);

  document.getElementById('chat').appendChild(newMessage);

  window.scrollTo(0,document.body.scrollHeight);
}

