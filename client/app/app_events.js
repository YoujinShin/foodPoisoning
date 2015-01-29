Template.app.events({

	'click .addObject': function(event) {
		comparisons.insert({param1:"anothertest"});
	},
	'click .deleteObject': function(event) {
		console.log("delete object");
		// getting the id of the object I clicked on
		var id=event.target.id;
		// deleting only this object
		comparisons.remove({_id:id});
	}
	
});