const { request } = require('express');
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

router.use((req, res, next) => {
  console.log("inside friends route")
  if(req.user) {
      next();
  } else {
      res.send(401);
  }
});

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

router.get('/shopping/cart', (req, res) => {
  const { cart } = req.session;
  if(!cart) {
    res.send("No Cart");
  } else {
    res.send(cart);
  }
});

router.post('/shopping/cart/item', (req, res) => {
  console.log(req.session);
  const { name, skill } = req.body;
  const cartItem = { name, skill }
  const { cart } = req.session;
  console.log(cartItem);
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});

module.exports = router;