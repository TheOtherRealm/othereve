/*
 Created		: Nov 24, 2018, 4:20:47 PM
 Author		: Aaron E-J <the at otherrealm.org>
 Copyright(C): 2018 Other Realm LLC
 This program is free software: you can redistribute it and/or modify
 it under the terms of the latest version of the GNU Affero General Public License as published by
 the Free Software Foundation, using at least version 3.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details: <http://www.gnu.org/licenses/>.
 */
/* global L */
var cons = function (i) {
	return console.log(i);
};
////cons(map);
var geojsonFeature = [{
	"type": "Feature",
	"properties": {
		"name": "round here",
		"amenity": "Baseball Stadium",
		"popupContent": "This is where the Rockies play!",
		"underConstruction": true
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-72.97628, 41.8795]
	}
},{
	"type": "Feature",
	"properties": {
		"name": "NHCT",
		"amenity": "Baseball Stadium",
		"popupContent": "This is where the Rockies play!",
		"underConstruction": true
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-72.97699, 41.8700]
	}
},{
	"type": "Feature",
	"properties": {
		"name": "Far Away",
		"amenity": "Baseball Stadium",
		"popupContent": "This is where the Rockies play!",
		"underConstruction": true
	},
	"geometry": {
		"type": "Point",
		"coordinates": [72.97628, 41.8795]
	}
}];
// remaining is the same as in the docs, accept for the var instead of const declarations
//var provider = new OpenStreetMapProvider();
function onEachFeature(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.popupContent) {
		layer.bindPopup(feature.properties.popupContent);
	}
}
var map = L.map('map').fitWorld();
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.locate({setView: true, maxZoom: 16});
L.geoJSON(geojsonFeature, {
	filter: function (feature, layer) {
		cons(feature.geometry.coordinates[1]);
		if (feature.geometry.coordinates[0]>0||feature.geometry.coordinates[1]<0) {
			// If the property "underConstruction" exists and is true, return false (don't render features under construction)
			return false;
		}
		return true;
	},
	onEachFeature: onEachFeature
}).addTo(map);

var myLayer = L.geoJSON().addTo(map);
var marker = L.marker();
var onMapClick = function (e) {
	marker.setLatLng(e.latlng)
		.bindPopup("You clicked the map at " + e.latlng.toString())
		.addTo(map);
};
map.on('click', onMapClick);
var OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;
var GeoSearchControl = window.GeoSearch.GeoSearchControl;
var provider = new OpenStreetMapProvider();
var searchControl = new GeoSearchControl({
  provider: provider
});
map.addControl(searchControl);
new GeoSearchControl({
	provider: myProvider,           // required
	autoComplete: true,             // optional: true|false  - default true
	autoCompleteDelay: 250,         // optional: number      - default 250
}).addTo(map);
