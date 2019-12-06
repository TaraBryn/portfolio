var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/projects/front-end', (req, res) => {
  let {front_end} = require(global.root + '/public/json/projects.json');
  res.json(front_end)
})

module.exports = router;
