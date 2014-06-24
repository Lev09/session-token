var zmq = require('zmq');

var requester = zmq.socket('asyncreq');
requester.connect('tcp://localhost:6009');

requester.send('message', function(response) {
	console.log(response);
});
