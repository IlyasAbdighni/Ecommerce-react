const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/main');
const morgan = require('morgan');
const passport = require('passport');

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// log requests to console
app.use(morgan('dev'));

// Initialize passport for user
app.use(passport.initialize());

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(
	config.database,
	function(error) {
		if (error) {
			console.log(error);
		} else {
			console.log('Database connected successfully');
		}
	}
);

// Bringing passport strategy
require('./config/passport')(passport);

const api = require('./api');

app.use('/api', api);

const path = require('path');

app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.get('*', (req, res) =>
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
