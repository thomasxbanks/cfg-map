
const dataMaker = (response) =>{
  page.statusCode = response.status;
  if (page.statusCode <= 200) {
    page.title = 'Success!';
    page.content = response.data;
    page.territories = response.data;
    const getBoundaries = (territory, index) => {
      territory.boundaryAsJson[0][0].forEach(boundaryCoord => {
        var object = {
          'lat': boundaryCoord['y'],
          'lng': boundaryCoord['x']
        };
        boundaries[index].push(object);
      });
    };

    var territories = response.data;
    var boundaries = [];

    territories.forEach((territory, index) => {
      boundaries.push([]);
      getBoundaries(territory, index);
    });

    page.boundaries = boundaries;
  } else {
    page.title = 'Fail!';
    page.content = response.statusText;
  }
  console.log('Page Object:', page);
};


let page = {};
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
console.log(endpoint);

// $.ajax({
//   url: endpoint,
//   type: `${method.post}`,
//   crossDomain: true,
//   data: {
//     mapLayerKey: `${mapLayerKey.franchise_territories}`
//   },
//   dataType: "json",
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'X-Requested-With': 'XMLHttpRequest'
//   },
//   success: function (raw) {
//     var response = JSON.parse(raw);
//     dataMaker(response);
//     console.log(response.status);
//   },
//   error: function (xhr, status) {
//     console.error(status, xhr);
//   }
// });

jQuery.support.cors = true; 
$.ajax({ 
  url: endpoint, 
  type: "post", 
  dataType: "json", 
  contentType: "json", 

  data: { mapLayerKey: '83ggzQ8Q' }, 
  success: function (response) { 
    alert(response.OrderPlacementResult); 
    // orderId = data; 
    if (data != null) { 
      orderStatus = "Order has been placed successfully."; 
    } 
  } 

});
