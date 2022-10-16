const { Router } = require('express');


const router = Router();


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

router.get("/", (req, res, next) => {
  console.log(req.cookies);
  res.cookie('visited', true, {
    maxAge: 10000
  });
  console.log('Before handling request');
  res.send(groceryList);
});

router.get('/:name', (req, res) => {
  const { name } = req.params;
  const friendItem = groceryList.find((n) => n.name === name);
  console.log(friendItem);
  res.send(friendItem);
});

router.post("/", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  console.log(groceryList);
  res.send(201);
});

module.exports = router;