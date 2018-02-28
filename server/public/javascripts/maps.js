var autocomplete, map, marker;

// var markerCenter = { lat: myLatLng[0].loc.lat, lng: myLatLng[0].loc.lng };
// console.log(markerCenter);

// console.log(myEvent[0].venue.loc.lng);
var filteredEvent = [];

function checkDate() {
  let filterDate = $(".datepicker").val();
  let filterTime = $(".timepicker").val();
  let date = new Date(filterDate);
  dataType: "json";
  filteredEvent = [];

  if (filteredEvent.length === 0) {
    for (i = 0; i < myEvent.length; i++) {
      var stringEventDate = new Date(myEvent[i].date);
      if (date.getTime() === stringEventDate.getTime()) {
        filteredEvent.push(myEvent[i]);
      }
    }
  }
}

$("#filter-btn").click(function() {
  console.log(filteredEvent.length);
  checkDate();
  initMap();
});

// Try HTML5 geolocation.
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 48.875297, lng: 2.337526 },
    zoom: 14
  });

  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  // for (i = 0; i <= ) {};

  // MAP MAP MAP (init marker)
  if (filteredEvent.length === 0) {
    for (i = 0; i <= myEvent.length; i++) {
      var contentString = `<div id="iw-container"><h4 id="firstHeading" class="firstHeading">${
        myEvent[i].name
      }</h4> 
  <h5>Description :  </h5>
  <p>${myEvent[i].description}</p>
  <button class="class="waves-effect waves-light btn">
  <a href="/events/${myEvent[i]._id}"> see more</a></button></div>
  `;

      var marker = new google.maps.Marker({
        position: {
          lat: myEvent[i].venue.loc.lat,
          lng: myEvent[i].venue.loc.lng
        },
        date: myEvent[i].date,
        map: map,
        contentString: contentString,
        icon: "/images/bobcat_logo.png"
      });

      var infowindow = new google.maps.InfoWindow({});

      marker.addListener("click", function() {
        infowindow.setContent(this.contentString);
        infowindow.open(map, this);
        map.setCenter(this.getPosition());
      });
    }
    console.log("using myEvent");
  } else {
    for (i = 0; i <= filteredEvent.length; i++) {
      var contentString = `<div id="iw-container"><h4 id="firstHeading" class="firstHeading">${
        filteredEvent[i].name
      }</h4> 
  <h5>Description :  </h5>
  <p>${filteredEvent[i].description}</p>
  <button class="class="waves-effect waves-light btn">
  <a href="/events/${filteredEvent[i]._id}"> see more</a></button></div>
  `;

      var marker = new google.maps.Marker({
        position: {
          lat: filteredEvent[i].venue.loc.lat,
          lng: filteredEvent[i].venue.loc.lng
        },
        date: filteredEvent[i].date,
        map: map,
        contentString: contentString
      });

      var infowindow = new google.maps.InfoWindow({});

      marker.addListener("click", function() {
        infowindow.setContent(this.contentString);
        infowindow.open(map, this);
        map.setCenter(this.getPosition());
      });

      // filteredEvent = [];
    }
    console.log("using filteredEvent");
    // filteredEvent = [];
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found");
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  //autocompleteSearch();
  //autocomplete.bindTo("bounds", map);
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
}

// Use to display the autocomplete form + grab data from it (LAT + LONG)

function initialize() {
  var input = document.getElementById("searchTextField");
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, "place_changed", function() {
    var venue = autocomplete.getPlace();
    document.getElementById("searchTextField").value = venue.name;
    document.getElementById("adress").value = venue.formatted_address;
    document.getElementById("venue_lat").value = venue.geometry.location.lat();
    document.getElementById("venue_long").value = venue.geometry.location.lng();
  });
}

//event page map

function initEventMap() {
  var map = new google.maps.Map(document.getElementById("mapEvent"), {
    center: event.venue.loc,
    zoom: 14
  });
  var marker = new google.maps.Marker({
    position: {
      lat: event.venue.loc.lat,
      lng: event.venue.loc.lng
    },
    map: map
    // contentString: contentString
  });
}
//google.maps.event.addDomListener(window, "load", initialize)
