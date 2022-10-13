const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
})

let groceryList = [
    {
        name: "Parker",
        skill: "Being awesome"
    },
    {
        name: "Trevor",
        skill: "Funniness"
    },
    {
        name: "daniel",
        skill: "inelligence"
    },
];

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

app.get("/friends", (req, res, next) => {
        console.log('Before handling request');
        next();
    }, 
    (req, res) => {
        res.send(groceryList);
});

app.post("/friends", (req, res) => {
    console.log(req.body);
    groceryList.push(req.body);
    console.log(groceryList);
    res.send(201);
});
