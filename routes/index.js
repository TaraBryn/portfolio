var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let {front_end} = require(global.root + '/public/json/projects.json')
  res.render('index', { title: 'Express', front_end });
});

router.get('/projects/frontend/:project', (req, res) => {
  res.render('front-end', require(global.root + '/public/json/projects.json').front_end[req.params.project]);
})

router.get('/test', (req, res)=>res.send('successful'))

module.exports = router;
