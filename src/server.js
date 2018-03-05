var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');

app.locals = {
  site: {
    title: 'Interactive map',
    description: 'This is an interactive map',
    author: 'thomasxbanks',
    template: 'index'
  }
};

app.get(['/'], function(req, res) {
  var bar = require('./modules/module.js');
  res.locals.page = 'home';
  res.locals.log = bar();
  var axios = require('axios');
  var apiVersion = `v1`;
  var protocol = `https://`;
  var domain = `api.vision-mapping.com/`;
  var data = {
    'coordinates': `fyn/${apiVersion}/coordinates/`,
    'getBoundaries': `data/areas/${apiVersion}/getBoundaries/`,
    'getLocations': `data/locations/${apiVersion}/`
  };
  var method = {
    'create': `create`,
    'post': `post`
  };
  var parameters = {
    'apiKey': `rbWKjpcDJ5BDPtT0tcyCxkhcslqQWbmq9jtvNM7H`
  };
  
  var endpoint = `${protocol}${domain}${data.getBoundaries}${method.post}`;

  axios.get(endpoint, {
    params: {
      apiKey: `${parameters.apiKey}`,
      body: {
        mapLayerKey: "UK221"
      }
    }
  })
    .then(function (response) {
      res.locals.statusCode = response.status;
      res.locals.content = response.status;
      res.render(app.locals.site.template, res.locals);
    })
    .catch(function (error) {
      res.locals.statusCode = error.response.status;
      res.locals.title = 'Oh noes!';
      res.locals.content = error.response.data.Message || error.response.statusText;
      // console.error('fucked up ********************************************************', error);
      res.render(app.locals.site.template, res.locals);
    });
  
});

// Final catch-all
// keep this last in line to act as the 404 page
app.get('/*', function(req, res) {
  res.locals.statusCode = 404;
  res.locals.title = 'Oops!';
  res.locals.content = "This page does not exist.";
  res.render(app.locals.site.template, res.locals);
});

app.listen(8008);
