const { Router } = require('express');

const router = Router();

const supermarkets = [
  {
    store: 'Parker Store'
  },
  {
    store: "Trevor Store"
  }
]

router.get('', (req, res) => {
  res.send(supermarkets);
})

module.exports = router;