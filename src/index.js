const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const friendsRoute = require('./routes/friends');
const marketsRoute = require('./routes/markets');
const authRoute = require('./routes/auth');
require('./database');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(
    session({
        secret: "Parkoid",
        resave: false,
        saveUninitialized: false
    })
);

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
})

app.use('/api/auth', authRoute);
app.use('/api/friends/', friendsRoute);
app.use('/api/markets/', marketsRoute);



app.listen(PORT, () => console.log(`Running on port ${PORT}`));



