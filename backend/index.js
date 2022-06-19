const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const port = 5000;
const Router = require('./routes/index');
const db = require('./config/index');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//using express session
app.use(cookieParser());
app.use(
  session({
    name: 'crm_cookie',
    secret: 'thisisafullstackapp',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      secure: false,
      //maxAge: 400 * 60 * 100,
    },
  })
);
app.set('trust proxy', 1);
//serve static files
app.use(express.static('./assets'));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/', Router);

app.listen(port, (err) => {
  if (err) {
    console.log('There is err :', err);
  } else {
    console.log(`Server started in ${port}`);
  }
});
