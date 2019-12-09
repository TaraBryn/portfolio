var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let {front_end} = require(global.root + '/public/json/projects.json')
  res.render('index', { title: 'Express', front_end });
});

router.get('/projects/front-end', (req, res) => {
  let {front_end} = require(global.root + '/public/json/projects.json');
  res.json(front_end)
})

router.get('/test', (req, res)=>res.send('successful'))

module.exports = router;
