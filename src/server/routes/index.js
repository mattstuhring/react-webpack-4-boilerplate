var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendStatus(200);
  res.send('Hello Express routes!')
});

module.exports = router;
