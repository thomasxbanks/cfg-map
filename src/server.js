var port = 8008;
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
      var territories = response.data;
      var boundaries = [];
      const getBoundaries = (territory, index) => {
        territory.boundaryAsJson[0][0].forEach((boundaryCoord)=>{
          var object = {
            'lat': boundaryCoord['y'],
            'lng': boundaryCoord['x']
          };
          boundaries[index].push(object);
        });
      };
      const updateColors = (territory) => {  
        if( territory.formatting === null ){ 
          territory.formatting = {
            name: 'Available',
            colour: '#24C11A',
            opacity: 0.35
          };
        } else {
          if (territory.formatting.name === 'Awarded Franchise') {
            territory.formatting.colour = '#C1371A';
          } else if (territory.formatting.name === 'Company Operated') {
            territory.formatting.colour = '#004492';
          } else if (territory.formatting.name === 'Resale') {
            territory.formatting.colour = '#FBD90D';
          } else if (territory.formatting.name === 'Under Offer') {
            territory.formatting.colour = '#DC6A29';
          } else if (territory.formatting.name === 'Available') {
            territory.formatting.colour = '#24C11A';
          } else {
            territory.formatting.colour = '#24C11A';
          }
          territory.formatting.opacity = 0.35;
        }
      };

      territories.forEach((territory, index)=>{
        boundaries.push([]);
        getBoundaries(territory, index);
        updateColors(territory);
      });

      res.locals.statusNames = [...new Set(territories.map(item => item.formatting.name))];
      res.locals.statusColors = [...new Set(territories.map(item => item.formatting.colour))];

      res.locals.boundaries = boundaries;
      


      res.locals.markers = [{
        "name": "ABERDARE",
        "postcode": "CF44 7AT",
        "lat": 51.713735,
        "lng": -3.445994,
        "status": "Available"
      },
      {
        "name": "ABERDEEN",
        "postcode": "AB25 1BS",
        "lat": 57.150797,
        "lng": -2.101944,
        "status": "Available"
      },
      {
        "name": "ACCRINGTON",
        "postcode": "BB5 1EJ",
        "lat": 53.753939,
        "lng": -2.364233,
        "status": "Available"
      },
      {
        "name": "AIRDRIE",
        "postcode": "ML6 6AH",
        "lat": 55.866871,
        "lng": -3.979591,
        "status": "Available"
      },
      {
        "name": "ARMLEY",
        "postcode": "LS12 1UX",
        "lat": 53.796898,
        "lng": -1.589761,
        "status": "Available"
      },
      {
        "name": "ARNOLD",
        "postcode": "NG5 7EJ",
        "lat": 53.003441,
        "lng": -1.127165,
        "status": "Available"
      },
      {
        "name": "AYR",
        "postcode": "KA7 1PA",
        "lat": 55.464397,
        "lng": -4.630864,
        "status": "Available"
      },
      {
        "name": "BARNSLEY",
        "postcode": "S70 2PX",
        "lat": 53.552928,
        "lng": -1.482178,
        "status": "Available"
      },
      {
        "name": "BARROW",
        "postcode": "LA14 1JH",
        "lat": 54.112872,
        "lng": -3.224945,
        "status": "Available"
      },
      {
        "name": "BEARWOOD",
        "postcode": "B66 4BX",
        "lat": 52.476192,
        "lng": -1.969981,
        "status": "Available"
      },
      {
        "name": "BEDMINSTER",
        "postcode": "BS3 4EY",
        "lat": 51.44181,
        "lng": -2.598114,
        "status": "Available"
      },
      {
        "name": "BIRMINGHAM",
        "postcode": "B4 7LN",
        "lat": 52.4804,
        "lng": -1.893544,
        "status": "Available"
      },
      {
        "name": "BLACKBURN",
        "postcode": "BB2 1LU",
        "lat": 53.764293,
        "lng": -2.541277,
        "status": "Available"
      },
      {
        "name": "BLACKPOOL",
        "postcode": "FY4 1AB",
        "lat": 53.798939,
        "lng": -3.052345,
        "status": "Available"
      },
      {
        "name": "BLACKWOOD",
        "postcode": "NP12 1AA",
        "lat": 51.665401,
        "lng": -3.194321,
        "status": "Available"
      },
      {
        "name": "BLYTH",
        "postcode": "NE24 1BW",
        "lat": 55.126603,
        "lng": -1.509792,
        "status": "Available"
      },
      {
        "name": "BOOTLE",
        "postcode": "L20 4SW",
        "lat": 53.450918,
        "lng": -2.992235,
        "status": "Available"
      },
      {
        "name": "BOSTON",
        "postcode": "PE21 8SH",
        "lat": 52.976366,
        "lng": -0.024200,
        "status": "Available"
      },
      {
        "name": "BOURNEMOUTH",
        "postcode": "BH1 4BP",
        "lat": 50.727327,
        "lng": -1.837570,
        "status": "Available"
      },
      {
        "name": "BRADFORD 2",
        "postcode": "BD1 3PP",
        "lat": 53.795696,
        "lng": -1.755200,
        "status": "Available"
      },
      {
        "name": "BRIDGEND",
        "postcode": "CF31 1BZ",
        "lat": 51.505004,
        "lng": -3.575136,
        "status": "Available"
      },
      {
        "name": "BRIGHTON",
        "postcode": "BN1 4JE",
        "lat": 50.832905,
        "lng": -0.138399,
        "status": "Available"
      },
      {
        "name": "BURTON ON TRENT",
        "postcode": "DE14 1JN",
        "lat": 52.80298,
        "lng": -1.629890,
        "status": "Available"
      },
      {
        "name": "BURY",
        "postcode": "BL9 0NB",
        "lat": 53.594644,
        "lng": -2.294402,
        "status": "Available"
      },
      {
        "name": "CANTON",
        "postcode": "CF11 9DX",
        "lat": 51.48169,
        "lng": -3.197795,
        "status": "Available"
      },
      {
        "name": "CARDIFF",
        "postcode": "CF24 3RQ",
        "lat": 51.493037,
        "lng": -3.169413,
        "status": "Available"
      },
      {
        "name": "CARDONALD",
        "postcode": "G52 3JH",
        "lat": 55.845699,
        "lng": -4.353475,
        "status": "Available"
      },
      {
        "name": "CARLISLE",
        "postcode": "CA3 8DP",
        "lat": 54.895224,
        "lng": -2.933219,
        "status": "Available"
      },
      {
        "name": "CASTLEFORD",
        "postcode": "WF10 1DX",
        "lat": 53.725478,
        "lng": -1.354646,
        "status": "Available"
      },
      {
        "name": "CHEETHAM HILL",
        "postcode": "M8 5BN",
        "lat": 53.513401,
        "lng": -2.245628,
        "status": "Available"
      },
      {
        "name": "CHELMSLEY WOOD",
        "postcode": "B37 5TL",
        "lat": 52.479334,
        "lng": -1.739240,
        "status": "Available"
      },
      {
        "name": "CHESTERFIELD",
        "postcode": "S40 1XL",
        "lat": 53.2364,
        "lng": -1.425055,
        "status": "Available"
      },
      {
        "name": "CHORLEY",
        "postcode": "PR7 2SU",
        "lat": 53.651889,
        "lng": -2.631718,
        "status": "Available"
      },
      {
        "name": "CLACTON-ON-SEA",
        "postcode": "CO15 1NU",
        "lat": 51.790337,
        "lng": 1.154213,
        "status": "Available"
      },
      {
        "name": "CLYDEBANK",
        "postcode": "G81 1EA",
        "lat": 55.901903,
        "lng": -4.404873,
        "status": "Available"
      },
      {
        "name": "COATBRIDGE",
        "postcode": "ML6 6AH",
        "lat": 55.866871,
        "lng": -3.979591,
        "status": "Available"
      },
      {
        "name": "COLWYN BAY",
        "postcode": "Ll29 8DG",
        "lat": 53.295237,
        "lng": -3.725806,
        "status": "Available"
      },
      {
        "name": "COVENTRY",
        "postcode": "CV1 1FL",
        "lat": 52.409461,
        "lng": -1.509234,
        "status": "Available"
      },
      {
        "name": "CWMBRAN",
        "postcode": "NP44 1PN",
        "lat": 51.654585,
        "lng": -3.020727,
        "status": "Available"
      },
      {
        "name": "DARWEN",
        "postcode": "BB3 1AZ",
        "lat": 53.696198,
        "lng": -2.467918,
        "status": "Available"
      },
      {
        "name": "DERBY",
        "postcode": "DE1 2PA",
        "lat": 52.918372,
        "lng": -1.473698,
        "status": "Available"
      },
      {
        "name": "DUMBARTON",
        "postcode": "G82 1LJ",
        "lat": 55.943858,
        "lng": -4.569939,
        "status": "Available"
      },
      {
        "name": "DUNDEE",
        "postcode": "DD12AJ",
        "lat": 56.462133,
        "lng": -2.970359,
        "status": "Available"
      },
      {
        "name": "EBBW VALE",
        "postcode": "NP23 6HH",
        "lat": 51.778989,
        "lng": -3.207784,
        "status": "Available"
      },
      {
        "name": "EDINBURGH",
        "postcode": "EH11 2DW",
        "lat": 55.943708,
        "lng": -3.219808,
        "status": "Available"
      },
      {
        "name": "ELGIN",
        "postcode": "IV30 1EE",
        "lat": 57.649063,
        "lng": -3.311971,
        "status": "Available"
      },
      {
        "name": "ELLESMERE PORT",
        "postcode": "CH65 0BL",
        "lat": 53.277651,
        "lng": -2.902236,
        "status": "Available"
      },
      {
        "name": "FELTHAM",
        "postcode": "TW13 4BS",
        "lat": 51.445732,
        "lng": -0.410705,
        "status": "Available"
      },
      {
        "name": "GLOUCESTER",
        "postcode": "GL1 1SL",
        "lat": 51.866556,
        "lng": -2.242385,
        "status": "Available"
      },
      {
        "name": "GREAT YAYMOUTH",
        "postcode": "NR30 1RN",
        "lat": 52.598233,
        "lng": 1.728047,
        "status": "Available"
      },
      {
        "name": "GREENOCK",
        "postcode": "PA15 1XE",
        "lat": 55.950853,
        "lng": -4.762461,
        "status": "Available"
      },
      {
        "name": "GRIMSBY",
        "postcode": "DN31 1DG",
        "lat": 53.5651,
        "lng": -0.086486,
        "status": "Available"
      },
      {
        "name": "HALIFAX",
        "postcode": "HX1 1BW",
        "lat": 53.721659,
        "lng": -1.860573,
        "status": "Available"
      },
      {
        "name": "HAMILTON",
        "postcode": "ML3 6AH",
        "lat": 55.774914,
        "lng": -4.036392,
        "status": "Available"
      },
      {
        "name": "HARPURHEY",
        "postcode": "M9 4DH",
        "lat": 53.51253,
        "lng": -2.212493,
        "status": "Available"
      },
      {
        "name": "HARTLEPOOL",
        "postcode": "TS24 7RX",
        "lat": 54.684045,
        "lng": -1.214985,
        "status": "Available"
      },
      {
        "name": "HASTINGS",
        "postcode": "TN34 1RE",
        "lat": 50.857557,
        "lng": 0.582484,
        "status": "Available"
      },
      {
        "name": "HUYTON",
        "postcode": "L36 9YG",
        "lat": 53.412612,
        "lng": -2.839270,
        "status": "Available"
      },
      {
        "name": "HYDE",
        "postcode": "SK14 1HL",
        "lat": 53.450071,
        "lng": -2.078320,
        "status": "Available"
      },
      {
        "name": "INVERNESS",
        "postcode": "IV1 1PX",
        "lat": 57.478703,
        "lng": -4.225759,
        "status": "Available"
      },
      {
        "name": "IRVINE",
        "postcode": "KA12 8BQ",
        "lat": 55.614585,
        "lng": -4.668553,
        "status": "Available"
      },
      {
        "name": "KEIGHLEY",
        "postcode": "BD21 3DG",
        "lat": 53.868047,
        "lng": -1.908067,
        "status": "Available"
      },
      {
        "name": "KENSINGTON",
        "postcode": "L7 0LQ",
        "lat": 53.412232,
        "lng": -2.943146,
        "status": "Available"
      },
      {
        "name": "KILMARNOCK",
        "postcode": "KA1 1QJ",
        "lat": 55.607178,
        "lng": -4.497529,
        "status": "Available"
      },
      {
        "name": "KINGS HEATH",
        "postcode": "B14 7DG",
        "lat": 52.434101,
        "lng": -1.892552,
        "status": "Available"
      },
      {
        "name": "KIRKBY",
        "postcode": "L32 8RH",
        "lat": 53.482048,
        "lng": -2.886843,
        "status": "Available"
      },
      {
        "name": "KIRKCALDY",
        "postcode": "KY1 1LW",
        "lat": 56.109601,
        "lng": -3.159718,
        "status": "Available"
      },
      {
        "name": "KNOWLE",
        "postcode": "BS4 2QU",
        "lat": 51.434425,
        "lng": -2.568009,
        "status": "Available"
      },
      {
        "name": "LEICESTER",
        "postcode": "LE1 3GP",
        "lat": 52.637529,
        "lng": -1.132749,
        "status": "Available"
      },
      {
        "name": "LEIGH",
        "postcode": "WN7 1DR",
        "lat": 53.497005,
        "lng": -2.518541,
        "status": "Available"
      },
      {
        "name": "LLANELLI",
        "postcode": "SA15 3TR",
        "lat": 51.682236,
        "lng": -4.161832,
        "status": "Available"
      },
      {
        "name": "LLANRUMNEY",
        "postcode": "CF3 5SP",
        "lat": 51.520296,
        "lng": -3.120039,
        "status": "Available"
      },
      {
        "name": "LONGSIGHT",
        "postcode": "M13 9AB",
        "lat": 53.465793,
        "lng": -2.215980,
        "status": "Available"
      },
      {
        "name": "LUTON",
        "postcode": "LU1 2TL",
        "lat": 51.880115,
        "lng": -0.416500,
        "status": "Available"
      },
      {
        "name": "MAESTEG",
        "postcode": "CF34 9DW",
        "lat": 51.607975,
        "lng": -3.659817,
        "status": "Available"
      },
      {
        "name": "MAIDENHEAD",
        "postcode": "SL6 8AG",
        "lat": 51.523897,
        "lng": -0.719876,
        "status": "Available"
      },
      {
        "name": "MANCHESTER",
        "postcode": "M1 1JQ",
        "lat": 53.481907,
        "lng": -2.236043,
        "status": "Available"
      },
      {
        "name": "MIDDLETON",
        "postcode": "M24 4DF",
        "lat": 53.54945,
        "lng": -2.199321,
        "status": "Available"
      },
      {
        "name": "NEATH",
        "postcode": "SA11 1RS",
        "lat": 51.664224,
        "lng": -3.805818,
        "status": "Available"
      },
      {
        "name": "NETHERTON",
        "postcode": "L30 5QA",
        "lat": 53.488462,
        "lng": -2.973910,
        "status": "Available"
      },
      {
        "name": "NEWPORT",
        "postcode": "NP20 1LQ",
        "lat": 51.584575,
        "lng": -2.993595,
        "status": "Available"
      },
      {
        "name": "NORRIS GREEN",
        "postcode": "L11 1BY",
        "lat": 53.44124,
        "lng": -2.929321,
        "status": "Available"
      },
      {
        "name": "NORTHAMPTON",
        "postcode": "NN1 2BH",
        "lat": 52.23943,
        "lng": -0.890994,
        "status": "Available"
      },
      {
        "name": "NORTHFIELD",
        "postcode": "B31 2JZ",
        "lat": 52.416363,
        "lng": -1.968271,
        "status": "Available"
      },
      {
        "name": "NORTHPOINT",
        "postcode": "HU7 4EE",
        "lat": 53.786662,
        "lng": -0.322013,
        "status": "Available"
      },
      {
        "name": "NORTHWICH",
        "postcode": "CW9 5DE",
        "lat": 53.262062,
        "lng": -2.513610,
        "status": "Available"
      },
      {
        "name": "NOTTINGHAM",
        "postcode": "NG1 6HL",
        "lat": 52.953544,
        "lng": -1.152551,
        "status": "Available"
      },
      {
        "name": "NUNEATON",
        "postcode": "CV11 4DX",
        "lat": 52.522629,
        "lng": -1.465910,
        "status": "Available"
      },
      {
        "name": "OLDHAM",
        "postcode": "OL1 3RZ",
        "lat": 53.542248,
        "lng": -2.110542,
        "status": "Available"
      },
      {
        "name": "PARTICK",
        "postcode": "G11 6AB",
        "lat": 55.870508,
        "lng": -4.303920,
        "status": "Available"
      },
      {
        "name": "PECKHAM",
        "postcode": "SE15 5BA",
        "lat": 51.470327,
        "lng": -0.061524,
        "status": "Available"
      },
      {
        "name": "PETERBOROUGH",
        "postcode": "PE1 1EL",
        "lat": 52.5697,
        "lng": -0.242802,
        "status": "Available"
      },
      {
        "name": "PONTEFRACT",
        "postcode": "WF8 1PD",
        "lat": 53.692557,
        "lng": -1.308506,
        "status": "Available"
      },
      {
        "name": "PORT TALBOT",
        "postcode": "SA13 1NR",
        "lat": 51.595333,
        "lng": -3.782986,
        "status": "Available"
      },
      {
        "name": "PORTSLADE",
        "postcode": "BN41 1GB",
        "lat": 50.833742,
        "lng": -0.207314,
        "status": "Available"
      },
      {
        "name": "PORTSMOUTH",
        "postcode": "PO2 0LZ",
        "lat": 50.816262,
        "lng": -1.079295,
        "status": "Available"
      },
      {
        "name": "PRESTON",
        "postcode": "PR1 2EJ",
        "lat": 53.759784,
        "lng": -2.701093,
        "status": "Available"
      },
      {
        "name": "PRINCESS PARKWAY",
        "postcode": "M20 1HH",
        "lat": 53.433067,
        "lng": -2.247587,
        "status": "Available"
      },
      {
        "name": "READING",
        "postcode": "RG1 7LA",
        "lat": 51.455501,
        "lng": -0.976859,
        "status": "Available"
      },
      {
        "name": "REDDITCH",
        "postcode": "B97 4ET",
        "lat": 52.306107,
        "lng": -1.941481,
        "status": "Available"
      },
      {
        "name": "REDRUTH",
        "postcode": "TR15 2BL",
        "lat": 50.233084,
        "lng": -5.228372,
        "status": "Available"
      },
      {
        "name": "ROCHDALE",
        "postcode": "OL16 1DS",
        "lat": 53.61994,
        "lng": -2.154270,
        "status": "Available"
      },
      {
        "name": "ROTHERHAM",
        "postcode": "S60 1QN",
        "lat": 53.4326,
        "lng": -1.356712,
        "status": "Available"
      },
      {
        "name": "RUNCORN",
        "postcode": "WA7 2BS",
        "lat": 53.32832,
        "lng": -2.697525,
        "status": "Available"
      },
      {
        "name": "RUTHERGLEN",
        "postcode": "G73 2HP",
        "lat": 55.828131,
        "lng": -4.211485,
        "status": "Available"
      },
      {
        "name": "SALFORD",
        "postcode": "M6 5JA",
        "lat": 53.488906,
        "lng": -2.286721,
        "status": "Available"
      },
      {
        "name": "SCUNTHORPE",
        "postcode": "DN15 6RA",
        "lat": 53.591398,
        "lng": -0.646342,
        "status": "Available"
      },
      {
        "name": "SHAWLANDS",
        "postcode": "G41 3NN",
        "lat": 55.828477,
        "lng": -4.283997,
        "status": "Available"
      },
      {
        "name": "SHEFFIELD",
        "postcode": "S1 2AW",
        "lat": 53.383811,
        "lng": -1.464491,
        "status": "Available"
      },
      {
        "name": "SHIRLEY & BOUREMOUTH",
        "postcode": "SO15 3NL",
        "lat": 50.921748,
        "lng": -1.432367,
        "status": "Available"
      },
      {
        "name": "SKELMERSDALE",
        "postcode": "WN8 6LJ",
        "lat": 53.549877,
        "lng": -2.774292,
        "status": "Available"
      },
      {
        "name": "SLOUGH",
        "postcode": "SL1 1DH",
        "lat": 51.509463,
        "lng": -0.594741,
        "status": "Available"
      },
      {
        "name": "SOUTHMEAD",
        "postcode": "BS10 6BA",
        "lat": 51.503645,
        "lng": -2.601790,
        "status": "Available"
      },
      {
        "name": "STECHFORD",
        "postcode": "B33 8BT",
        "lat": 52.484466,
        "lng": -1.809598,
        "status": "Available"
      },
      {
        "name": "STRETFORD",
        "postcode": "M32 8WB",
        "lat": 53.442878,
        "lng": -2.311071,
        "status": "Available"
      },
      {
        "name": "SWANSEA",
        "postcode": "SA1 3AN",
        "lat": 51.61882,
        "lng": -3.948210,
        "status": "Available"
      },
      {
        "name": "SWINDON",
        "postcode": "SN1 1BP",
        "lat": 51.562172,
        "lng": -1.786089,
        "status": "Available"
      },
      {
        "name": "THE FORGE",
        "postcode": "G31 4EB",
        "lat": 55.853442,
        "lng": -4.199822,
        "status": "Available"
      },
      {
        "name": "THETFORD",
        "postcode": "IP24 2AN",
        "lat": 52.4137,
        "lng": 0.749001,
        "status": "Available"
      },
      {
        "name": "TORQUAY",
        "postcode": "TQ2 5QB",
        "lat": 50.467851,
        "lng": -3.531671,
        "status": "Available"
      },
      {
        "name": "TOXTETH",
        "postcode": "L8 4UE",
        "lat": 53.384146,
        "lng": -2.963964,
        "status": "Available"
      },
      {
        "name": "TROWBRIDGE",
        "postcode": "BA14 8EJ",
        "lat": 51.320778,
        "lng": -2.206920,
        "status": "Available"
      },
      {
        "name": "WAKEFIELD",
        "postcode": "WF1 1QE",
        "lat": 53.683369,
        "lng": -1.495342,
        "status": "Available"
      },
      {
        "name": "WALSALL",
        "postcode": "WS1 1PB",
        "lat": 52.583228,
        "lng": -1.982807,
        "status": "Available"
      },
      {
        "name": "WARRINGTON",
        "postcode": "WA1 2QW",
        "lat": 53.388424,
        "lng": -2.593497,
        "status": "Available"
      },
      {
        "name": "WEST BROMWICH 2",
        "postcode": "B70 7QZ",
        "lat": 52.51781,
        "lng": -1.992102,
        "status": "Available"
      },
      {
        "name": "WESTON-SUPER-MARE",
        "postcode": "BS23 1LF",
        "lat": 51.350399,
        "lng": -2.977880,
        "status": "Available"
      },
      {
        "name": "WIGAN",
        "postcode": "WN1 1UW",
        "lat": 53.548421,
        "lng": -2.630387,
        "status": "Available"
      },
      {
        "name": "WILLESDEN",
        "postcode": "NW10 2TE",
        "lat": 51.547455,
        "lng": -0.225828,
        "status": "Available"
      },
      {
        "name": "WISHAW",
        "postcode": "ML2 7AF",
        "lat": 55.773914,
        "lng": -3.919853,
        "status": "Available"
      },
      {
        "name": "WOLVERHAMPTON",
        "postcode": "WV1 3JW",
        "lat": 52.585815,
        "lng": -2.124586,
        "status": "Available"
      },
      {
        "name": "WORKSOP",
        "postcode": "S80 1DG",
        "lat": 53.303083,
        "lng": -1.124054,
        "status": "Available"
      },
      {
        "name": "WYTHENSHAWE",
        "postcode": "M22 5RF",
        "lat": 53.379976,
        "lng": -2.262252,
        "status": "Available"
      }
      ];

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

app.listen(port);
