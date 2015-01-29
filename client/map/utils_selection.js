
onEachFeature = function(feature, layer) {

	// bind events
	layer.on({
		mouseover: mouseOverLayer,
		mouseout: mouseOutLayer,
		click: mouseClickLayer
	});
	
	// set style
	setLayerStyle(layer, "default");
	
	// bind label
	layer.bindLabel(feature.properties.NAME_2);
	
}

mouseOverLayer = function(e) {

	var infos=getInfos(e);
	
	// change only if layer is not selected
	if(infos.style.active==false) {
		setLayerStyle(e.target, "over");
	}
	
	// bring to front
	e.target.bringToFront();
	
}

mouseOutLayer = function(e) {
	
	var infos=getInfos(e);
	
	// change only if layer is not selected
	if(infos.style.active==false) {
		setLayerStyle(e.target, "out");
	}
}

mouseClickLayer = function(e) {

	var infos=getInfos(e);
	var layer=mapObjects[infos.mapId]._layers[infos.id];
	
	// check is multi selection is allowed
	if(Session.equals("expert", true)) {
		
		if(infos.style.active) {
			// unselect
			setLayerStyle(layer, "unselect");
			
			// update
			comparisons.update(
				{_id:infos.mapId}, 
				{ $pull:
					{ selection: 
						{ id: infos.id }
					},
				  $set: {
				  	lastClicked: infos.id
				  }
				}
			);

			 
		} else {
			// select
			setLayerStyle(layer, "select");
			
			// update
			comparisons.update(
				{_id:infos.mapId}, 
				{ $push: {
					selection: infos
					},
				  $set: {
				  	lastClicked: infos.id
				  }
				} 
			);

		}
		
	} else {

		if(infos.style.active) {
			// unselect
			setLayerStyle(layer, "unselect");
		} else {
			// select
			setLayerStyle(layer, "select");
			
			// disable last clicked polygon
			var lastClicked=comparisons.find({_id:infos.mapId}).fetch()[0];

			if(lastClicked && _.size(lastClicked)>0) {
				if(lastClicked.lastClicked) {
					if(lastClicked.lastClicked!=infos.id) {
						// get layer
						var oldLayer=mapObjects[infos.mapId]._layers[lastClicked.lastClicked];
	
						// change style
						setLayerStyle(oldLayer, "unselect");
					}
				}
			}
			
		}
		
		// update
		comparisons.update(
			{_id:infos.mapId}, 
			{ $set: {
				selection: infos,
				lastClicked: infos.id
				} 
			} 
		);
	
	}


	// send the query with the map id
	sendQuery(infos.mapId);
	
		
}


getInfos = function(e) {

	// if it is a multipolygon
	if(e.target.options==undefined) {
		var style;
		
		// loop through all polygons
		_.each(e.target._layers, function(value, index) {
			// keep style of the first one
			style=value.options;
			return false;
		});
		
		var mapId=e.target._map._container.id.split("map");
		
		// get parent layer id
		return {
			style:style,
			id:parseInt(e.target._leaflet_id),
			mapId:mapId[1],
			multipolygon:true,
			properties:e.target.feature.properties
		}
	} else {
	
		var mapId=e.target._map._container.id.split("map");
		
		return {
			style: e.target.options,
			id: parseInt(e.target._leaflet_id),
			mapId:mapId[1],
			multipolygon:false,
			properties:e.target.feature.properties
		}
	}

}
