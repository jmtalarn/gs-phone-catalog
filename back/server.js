const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('static'));
/*
 * ADDED AN INTENTIONAL LATENCY TO SIMULATE
 * BETTER THE TIME RESPONSE OF A REMOTE SERVER
 * */
app.use(function (req, res, next) {
	setTimeout(next, 1000);
});
const phones = require('./phones/app');
const port = normalizePort(process.env.PORT || '3001');

app.get('/', (req, res) => {
	res.send('Phone catalog API Server!');
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/phones', phones);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}
