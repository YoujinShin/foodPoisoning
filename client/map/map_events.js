Template.map.events({

	'click .delete': function(event) {
		var target=event.target.id.split("delete");
		comparisons.remove({_id:target[1]});
	},
	'click .enter': function(event) {
	
	/*
		var geojson = L.geoJson(madridmuni, {
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
	*/
	}
	
	
});