const express = require('express');

var app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./src/db/sequelize_models');
const basicAuth = require('express-basic-auth');
const {app_port} = require('./src/config/config');




// const { companyDetails,userModel } = require('./db/sequelize_models/');
const expressSwagger = require('express-swagger-generator')(app);

const usersRouter = require('./src/routes/userRoutes');
const companyDetailsRouter = require('./src/routes/companyDetailsRoutes');
const timeSlotRouter = require("./src/routes/time_slotRoutes");
const questionRouter = require("./src/routes/questionRoutes");
const optionRouter = require("./src/routes/optionRoutes");
const answerRouter = require("./src/routes/answerRoutes");
const resultRouter = require("./src/routes/resultRoutes");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//db.sequelize.sync({ alter: true });
//drop the table if it already exists

// db.sequelize.sync({alter:true}).then(() => {
//   console.log("Drop and re-sync database table.");
// });


// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '100mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
	bodyParser.urlencoded({
		limit: '100mb',
		extended: true,
	})
);

app.get('/', function (req, res) {
	res.redirect('/api');
});
// app.get('/api', (req, res) => {
// 	var credentials = basicAuth(req);
// 	console.log(credentials)

	app.get('/api', (req, res) => {
		
		app.use(basicAuth({
			users: { 'admin': 'Password#105' },
			challenge: true,
			realm: 'Enter Your Credentials',
		}));
		console.log("Swagger path")
		const options = {
			swaggerDefinition: {
				info: {
					description: 'This is a Exam Portal Sever',
					title: 'Swagger',
					version: '1.0.0',
				},
				//host: config.localBaseUrl,
				basePath: '/',
				produces: ['application/json', 'application/xml'],
				schemes: ['http', 'https'],
				securityDefinitions: {
					JWT: {
						type: 'apiKey',
						in: 'header',
						name: 'Authorization',
						description: '',
					},
				},
			},
			
			basedir: __dirname, // app absolute path
			files: ['./src/routes/**/*.js', './src/controller/**/*.js'], // Path to the API handle folder
		};
		
		expressSwagger(options);

		res.send(`<html>
		<script>
		window.location.href = "/api-docs/"
		</script>
		
		</html>`)
	})




app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*')

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true)

	// Pass to next layer of middleware
	next()
});

app.use('/user', usersRouter);
app.use('/companyDetails',companyDetailsRouter);
app.use('/timeslot',timeSlotRouter);
app.use('/questions',questionRouter);
app.use('/options',optionRouter);
app.use('/answer',answerRouter);
app.use('/result',resultRouter);




app.get('/',(res,resp)=>{
    resp.send('home page')
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

port = app_port;
app.listen(port,()=>{
    console.log(`App is listening at http://localhost${port}`);
});

module.exports = app;