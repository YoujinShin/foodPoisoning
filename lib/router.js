// we define the main "container"

Router.configure({
  layoutTemplate: 'layout'
});

// we define new "routes" (/something)
Router.map(function () {

  // the default route is for the main page
  this.route('home', {
    path: '/', // http://localhost/app
    template: 'app', // it uses the template named "app"
    onBeforeAction: function() {
		// first, we create a local collection
		comparisons = new Meteor.Collection(null);
		// I insert a first value
		comparisons.insert({param:1});
		// continue to data 
		this.next();
    },
    data: function() {

		// it will return the result of the collection called comparisons
    	return comparisons.find().fetch();
    	
    },
    action: function () {
    
       	 if (this.ready()) {
        	// render the page
          	this.render();
     	 }
    }
    
  });
 
 });