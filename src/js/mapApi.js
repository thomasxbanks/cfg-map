function initMap() {
  console.log( 'this is where the map would init');
  // Define arrays and variables
  // var markers = []
  // var boundaries = []

  // // Center of the UK
  // var uk = {lat: <%= locals.content[0].labelY %>, lng: <%= locals.content[0].labelX %>}
  // var map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 6,
  //   center: uk
  // });
  // <% for( var i=0; i < parseInt(locals.content.length, 10); i++) { %>
  //   var markerCoordinates = {lat: <%= locals.content[i].labelY %>, lng: <%= locals.content[i].labelX %>}
  //   var marker = new google.maps.Marker({
  //     label: "<%- locals.content[i].name %>",
  //     position: markerCoordinates,
  //     map: map
  //   });
  //   markers.push(marker)
  // <% } %>

  // // group markers together
  // var markerCluster = new MarkerClusterer(map, markers,
  //   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
  // );

  // // Zoom the map on load to show all markers
  // var bounds = new google.maps.LatLngBounds();
  // for (var i = 0; i < markers.length; i++) {
  //  bounds.extend(markers[i].getPosition());
  // }
  // map.fitBounds(bounds);

  // <% for( var i = 0; i < parseInt(locals.boundaries.length, 10); i++) { %>
  //   // console.log(<%= i %>, <%- JSON.stringify(locals.territories[i].formatting) %>);
  //   <% if( locals.territories[i].formatting !== null ){ %>
  //     var fillColor = '<%= locals.territories[i].formatting.colour %>'
  //     var fillOpacity = '<%= locals.territories[i].formatting.opacity %>'
  //   <% } else { %>  
  //     var fillColor = '#ffffff'
  //     var fillOpacity = 0.2
  //   <% } %>
  //   var options = {
  //     path: <%- JSON.stringify(locals.boundaries[i]) %>,
  //     strokeColor: '#757575',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 1,
  //     fillColor: fillColor,
  //     fillOpacity: fillOpacity
  //   }
  //   var territoryCoords = new google.maps.Polygon(options);
  //   territoryCoords.setMap(map);
  // <% } %>

}