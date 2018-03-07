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
  res.locals.page = 'home';
  var axios = require('axios');
  var apiVersion = 'v1';
  var protocol = 'https://';
  var domain = 'api.vision-mapping.com/';
  var data = {
    'coordinates': `fyn/${apiVersion}/coordinates`,
    'getBoundaries': `data/areas/v1/getBoundaries`,
    'getLocations': `data/locations/${apiVersion}`
  };
  var method = {
    'create': 'create',
    'post': 'post'
  };
  var parameters = {
    'apiKey': 'rbWKjpcDJ5BDPtT0tcyCxkhcslqQWbmq9jtvNM7H'
  };
  var mapLayerKey = {
    'store_locations': '48B2V1y4',
    'franchise_territories': '83ggzQ8Q'
  };
  var franchiseTerritoryStatus = {
    'available': `cVdR8xRS`,
    'awarded_franchise': `jCnkMm1x`,
    'company_operated': `KkM8Wf0C`,
    'resale': `KNqXkmc7`,
    'under_offer': `X3yg3yZn`
  };

  var endpoint = `${protocol}${domain}${data.getBoundaries}?apiKey=${parameters.apiKey}`;

  axios(
    { method: `${method.post}`,
      url: endpoint,
      data: {
        mapLayerKey: `${mapLayerKey.franchise_territories}`
      }
    }
  )
    .then(function (response) {
      // console.error("SUCCESS\n********************************************************\n", response.data);
      res.locals.statusCode = response.status;
      res.locals.title = 'Success!';
      res.locals.content = response.data;
      res.locals.territories = response.data;
      const getBoundaries = (territory, index) => {
        territory.boundaryAsJson[0][0].forEach((boundaryCoord)=>{
          var object = {
            'lat': boundaryCoord['y'],
            'lng': boundaryCoord['x']
          };
          boundaries[index].push(object);
        });
      };

      var territories = response.data;
      var boundaries = [];

      territories.forEach((territory, index)=>{
        boundaries.push([]);
        getBoundaries(territory, index);
      });
      
      res.locals.boundaries = boundaries;

      res.render(app.locals.site.template, res.locals);
    })
    .catch(function (error) {
      console.error("ERROR\n********************************************************\n", error);
      res.locals.statusCode = error.response.status;
      res.locals.title = 'Oh noes!';
      res.locals.content = error.response.data.Message || error.response.statusText;
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
