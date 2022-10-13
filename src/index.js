const express = require('express');
const friendsRoute = require('./routes/friends');
const marketsRoute = require('./routes/markets');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
})

app.use('/api/friends/', friendsRoute);
app.use('/api/markets/', marketsRoute);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));



