var socket = io.connect();

function addMessage(msg, nick) {
	$('<div>', {
		'html': '<p>' + nick + ' : ' + msg + '</p>'
	}).appendTo("#chatEntries");
}

function sendMessage() {
	var messageInput = $('#messageInput');
	var message = messageInput.val();
	if (message != "") {
		socket.emit('sendMessage', message);
		addMessage(message, "Me");
		messageInput.val('');
	}
}

function setNick() {
	var nick = $("#nickInput").val();
	if (nick != "") {
		socket.emit('setNick', nick);
		$('#nickControls').hide();
		$('#chatControls').show();
	}
}

socket.on('message', function(data) {
	addMessage(data['message'], data['nick']);
});

$(function() {
	$("#chatControls").hide();
	$("#nickSet").click(setNick);
	$("#submit").click(sendMessage);
	$('#messageInput').bind('keypress', function(e){
		if(e.keyCode == 13) {
			sendMessage();
		}
	});
});
