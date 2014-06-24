var zmq = require('zmq');
var crypto = require('crypto');
var argv = require('optimist').default({
	bind: 'tcp://*:6009'
}).argv

var createKey = function(done) {
	crypto.randomBytes(32, function(ex, buf) {
		var token = buf.toString('hex');  
		var key = 'sessions/' + token;
		done(key);
	});
};

var responder = zmq.socket('asyncrep');
responder.bind(argv.bind);
console.log("binding on : ", argv.bind);

responder.on('message', function(message, response) {
	createKey(function(key) {
		response.send(key);
	});
});
