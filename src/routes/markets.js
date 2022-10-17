const { Router } = require('express');

const router = Router();

const supermarkets = [
  {
    store: 'Parker Store'
  },
  {
    store: "Trevor Store"
  }
];

router.use((req, res, next) => {
  if(req.session.user) {
      next();
  } else {
      res.send(401);
  }
});

router.get('', (req, res) => {
  res.send(supermarkets);
})

module.exports = router;