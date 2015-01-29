Meteor.startup(function () {
 
    $(window).resize(function() {
      	setUiPosition();
    });
    
  	setInitParams();

});

setInitParams = function() {

	// default
	Session.set("currentCity", "madrid");
	Session.set("currentMode", "districts");
	Session.set("expert", true);
	
}


setUiPosition = function() {
	
	console.log("-- reset UI position");

}

generateId = function() {
	var id= new Mongo.ObjectID;
	return id._str;
}

