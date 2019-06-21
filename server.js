const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 2001;
const route = require('./route');
const jikan = require('moment');

var whitelist = ['http://192.168.100.22']
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== 1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json());

app.use(cors());

route(app, corsOptions);

app.listen(port);
console.log('API Now Running at Port "'+ port +'" ['+ jikan().format('DD/MM/YYYY HH:mm:ss') +' UTC+7]');