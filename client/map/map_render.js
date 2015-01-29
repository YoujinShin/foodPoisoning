window.mapObjects=[];
window.theGroups=[];

Template.map.rendered= function() {

	console.log("# render map");
	//console.log(this.data);
	
	// get map coordinates
	var mapSettings= getMapView(Session.get("currentCity"));

	// remove attribution
	L.Control.Attribution.prototype.options.prefix = '';
	L.mapbox.accessToken = 'pk.eyJ1Ijoic2Vuc2VhYmxlIiwiYSI6ImxSNC1wc28ifQ.hst-boAjFCngpjzrbXrShw';
	
	// init map
	mapObjects[this.data._id] = L.map('map'+this.data._id, {
		zoomControl:false,
		})
		.setView(mapSettings.coordinates, mapSettings.zoom)
	    .addLayer(L.mapbox.tileLayer("examples.map-20v6611k", {
	    	attribution:'',
	        detectRetina: true
	    })
	);

	// load shape file
	var geojson = L.geoJson(provinces, {
		style: {
			weight: 1,
			opacity: 0.8,
			color: '#e7604a',
			fillOpacity: 0,
			fillColor: '#e7604a',
			over:false,
			active:false
		},
		onEachFeature: onEachFeature
	}).addTo(mapObjects[this.data._id])
	  		
}
