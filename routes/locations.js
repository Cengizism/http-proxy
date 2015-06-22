var express = require('express');
var url = require('url');
var request = require('request');

var router = express.Router();

/* GET locations listing. */
router.get('/:type?', function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');

  var api = 'http://still-atoll-8938.herokuapp.com/api/locations';

  if (req.params.type) {
    api += '/' + req.params.type;
    // console.log('there is a type param available: ', req.params.type, api);
  }

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  api += '?q=' + query.q;

  if (query.max) {
    api += '&max=' + query.max;
  }

  // console.log('api', api);

  request(api, function (error, response, requested) {
    // console.log('res', response.statusCode, response.body);

    if (response.statusCode == 404) {
      res.json({notFound: true});
    } else if (response.statusCode == 200) {
      var json = JSON.parse(requested);
      res.json(json);
    } else {
      res.json({error: true});
    }
  });
});

module.exports = router;
