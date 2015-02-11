Template.app.rendered = function() {
	console.log("# render viz");

	var tooltip = d3.select("body")
		.append("div")
		.attr("id", "tooltip");

	var foodType = ["Red meat", "Poultry meat", "Finfish", "Crustacean and shellfish", 
					"Eggs and egg dishes","Raw egg shell used in uncooked",
					"Milk and dairy products","Rice","Vegetables and fruit",
					"Desserts, cakes and confectionary","Condiments and snacks",
					"Mixed foods","Other foods"];

	var foodImage = ["condiment.png", "crustacean.png", "dessert.png", "eggdish.png", 
					"eggshell.png", "etc.png", "finfish.png", "milk.png", "mixfood.png", 
					"poultry.png", "redmeat.png", "rice.png", "veg.png"];

	var foodFactor = ["Cross-contamination", "Inadequate heat treatment", "Storage too long",
					  "Infected food handler", "Poor personal hygiene", "Poor hand-washing facilities"];

	var margin = { top: 30, right: 120, bottom: 30, left: 70 };

	// var width = parseInt(d3.select('#viz').style('width'), 10)-0,
	// 	width = width - margin.left - margin.right,
	// 	height = 540,
	// 	height = height - margin.top - margin.bottom;

	var width = parseInt(d3.select('#viz').style('width'), 10)-0;
	if(width < 700) { width = 700; }

		width = width - margin.left - margin.right;

	var height = 520,
		height = height - margin.top - margin.bottom;

	// var width2 = parseInt(d3.select('#viz2').style('width'), 10) - 30,
	// 	width2 = width2 - margin.left - margin.right;

	var svg = d3.select('#viz').append('svg')
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

	var g =	svg.append('g')
			.attr('transform', 'translate('+margin.left+","+margin.top+')');

	// var svg2 = d3.select('#viz2').append('svg')
	// 		.attr("width", width2 + margin.left + margin.right)
	// 		.attr("height", height + margin.top + margin.bottom);

	// var g2 = svg2.append('g')
	// 		.attr('transform', 'translate('+margin.left+","+margin.top+')');

	queue()
		.defer(d3.csv, 'foodType.csv')
		// .defer(d3.csv, 'foodFactor.csv')
		.await(makeViz);

    function makeViz(error, data, data2) {

		// var bg = g.append('rect')
		// 			.attr('x', -margin.left)
		// 			.attr('y', -margin.top)
		// 			// .attr('x', -width/24)
		// 			// .attr('y', -5)
		// 			.attr('width', width + margin.left + margin.right)
		// 			.attr('height', 420+10)
		// 			// .style('fill', '#D4CEC1')
		// 			// .style('fill', '#fff')
		// 			.style('fill', '#000')
		// 			.style('opacity', 0);

		var bg = //g.selectAll('.rect')
					g.append('rect')
					.attr('x', -margin.left)
					.attr('y', 401)
					// .attr('x', -width/24)
					// .attr('y', -5)
					.attr('width', width/12-2)
					.attr('height', width/12*1.32)
					// .style('fill', '#D4CEC1')
					// .style('fill', '#fff')
					.style('fill', '#AF5A53')
					.style("visibility", "hidden")
					.style('opacity', 1);

		// var bg2 = g2.append('rect')
		// 			.attr('x', -margin.left)
		// 			.attr('y', -margin.top)
		// 			.attr('width', width2 + margin.left + margin.right)
		// 			.attr('height', height + margin.top + margin.bottom)
		// 			.style('fill', '#D4CEC1')
		// 			.style('opacity', 0);

		// data.forEach(function(d) {
		// 	console.log(d);
		// });

		// var nest = d3.nest()
		// 			.key(function(d) { return d.Cuisine; })
		// 			.entries(type);

		var dots = g.selectAll('.dot')
						.data(data)
					.enter().append('rect')
						.attr('width', width/12)
						.attr('height', 25) //20
						.attr('x', function(d) { return getX(d.Type)-width/24; })
						.attr('y', function(d) { return getY(d.Cuisine)-5; })
						// .style('fill', '#5FB466') // green
						// .style('fill', '#AD4644') // red
						.style('fill', '#556E6F') // dark blue
						.style('fill-opacity', function(d) { return getColor(d.Value); })
					.on("mouseover", function(d) {
						d3.select(this).attr("stroke-width",3);
						d3.select(this).attr("stroke", "#AF5A53");

						// tooltip.text(d.Cuisine+" cuisine with "+ d.Type);
						tooltip.text(d.Type);
						tooltip.style("visibility", "visible");

						selectCuisine(d.Cuisine);

						bg.style("visibility", "visible");
						bg.attr("x", getX(d.Type)-width/24+1);
						// console.log(bg.attr("y"));
						// d3.select(bg).attr("x", 100);
						// console.log(d3.select(bg).attr("x"));
						
						// d3.select(bg).attr('x', function(d) { return getX(d.Type)-width/24; });
						// d3.select(this).transition().duration(300)
						// 	.attr("height", 30);
					})
					.on("mousemove", function(){
						// tooltip.style("top",0+"px").style("left",0+"px");
						tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
					})
					.on("mouseout", function(d) {
						bg.style("visibility", "hidden");
						// d3.select(this).transition().duration(300)
						// 	.attr("height", 20);
						unselectCuisine(d.Cuisine);
						d3.select(this).attr("stroke-width", 0);
						tooltip.style("visibility", "hidden");
					});

		// var dots2 = g2.selectAll('.dot')
		// 				.data(data2)
		// 			.enter().append('rect')
		// 				.attr('width', width2/5)
		// 				.attr('height', 25)
		// 				.attr('x', function(d) { return getX2(d.Factor)-width2/10; })
		// 				.attr('y', function(d) { return getY(d.Cuisine)-5; })
		// 				// .style('fill', '#5FB466')
		// 				.style('fill', '#556E6F') // dark blue
		// 				// .style('fill', '#AF5A53')
		// 				.style('fill-opacity', function(d) { return getColor2(d.Value); })
		// 			.on("mouseover", function(d) {
		// 				d3.select(this).attr("stroke-width",2);
		// 				d3.select(this).attr("stroke", "#000");

		// 				tooltip.text(d.Cuisine+" cuisine with "+ d.Factor);
		// 				tooltip.style("visibility", "visible");
		// 			})
		// 			.on("mousemove", function(){
		// 				// tooltip.style("top",0+"px").style("left",0+"px");
		// 				tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+12)+"px");
		// 			})
		// 			.on("mouseout", function(d) {
		// 				// d3.select(this).transition().duration(300)
		// 				// 	.attr("height", 20);
		// 				d3.select(this).attr("stroke-width", 0);
		// 				tooltip.style("visibility", "hidden");
		// 			});

		// var text = g.selectAll('text')
		// 				.data(foodType)
		// 			.enter().append('text')
		// 				.style("text-anchor", "end")
		// 				.attr("transform", "rotate(-90)")
		// 				.attr("x", -385)
		// 				.attr("y", function(d) { return getX(d)-width/24+10; })
		// 				// .attr("x", function(d) { return getX(d)-width/24; })
		// 				// .attr("y", 0)
		// 				.attr("font-family", 'FontAwesome')
		// 				.style('fill', '#556E6F') // dark blue
		// 				// .style('fill', '#5FB466') // green
		// 				.text(function(d){ return d; });

		var images = g.selectAll('image')
						.data(foodImage)
					.enter().append('image')
						// .attr("xlink:href", function(d) { return d.icon; })
						.attr("xlink:href",function(d) { return d; })
						.attr('x', function(d) { return getX3(d)-width/24; }) //
						.attr('y', 400)
						.attr("width", width/12-1)
						.attr("height", width/12*1.32);

		// var img_red = g.append("image")
		// 		.attr("xlink:href","redmeat.png")
  //               .attr("cx",10)
  //               .attr("cy", 60)
  //               .attr("width", 100)
  //               .attr("height", 100);

  		// var text2 = g2.selectAll('text')
				// 		.data(foodFactor)
				// 	.enter().append('text')
				// 		.style("text-anchor", "end")
				// 		// .attr("transform", "rotate(-90)")
				// 		.attr("x", function(d) { return getX2(d)-width/24+10; })
				// 		.attr("y", 400)
				// 		.attr("font-family", 'FontAwesome')
				// 		.style('fill', '#AF5A53')
				// 		.text(function(d){ return d; });

		// var text2 = g2.selectAll('text')
		// 				.data(foodFactor)
		// 			.enter().append('text')
		// 				.style("text-anchor", "end")
		// 				.attr("transform", "rotate(-90)")
		// 				.attr("x", -385)
		// 				.attr("y", function(d) { return getX2(d)-width/24+10; })
		// 				.attr("font-family", 'FontAwesome')
		// 				.style('fill', '#AF5A53')
		// 				.text(function(d){ return d; });
	}

	function getX(d) {
		var t = width/12;

		if(d=='Red meat') { return t*0; }
		else if(d=='Poultry meat') { return t*1; }
		else if(d=='Finfish') { return t*2; }
		else if(d=='Crustacean and shellfish') { return t*3; }
		else if(d=='Eggs and egg dishes') { return t*4; }
		else if(d=='Raw egg shell used in uncooked') { return t*5; }
		else if(d=='Milk and dairy products') { return t*6; }
		else if(d=='Rice') { return t*7; }
		else if(d=='Vegetables and fruit') { return t*8; }
		else if(d=='Desserts, cakes and confectionary') { return t*9; }
		else if(d=='Condiments and snacks') { return t*10; }
		else if(d=='Mixed foods') { return t*11; }
		else if(d='Other foods') { return t*12; }		
	}

	function getX3(d) {
		var t = width/12;
		
		// "condiment.png", "crustacean.png", "dessert.png", "eggdish.png", 
		// 			"eggshell.png", "etc.png", "finfish.png", "milk.png", "mixfood.png", 
		// 			"poultry.png", "redmeat.png", "rice.png", "veg.png"
		if(d=="redmeat.png") { return t*0; }
		else if(d=="poultry.png") { return t*1; }
		else if(d=="finfish.png") { return t*2; }
		else if(d=="crustacean.png") { return t*3; }
		else if(d=="eggdish.png") { return t*4; }
		else if(d=="eggshell.png") { return t*5; }
		else if(d=="milk.png") { return t*6; }
		else if(d=="rice.png") { return t*7; }
		else if(d=="veg.png") { return t*8; }
		else if(d=="dessert.png") { return t*9; }
		else if(d=="condiment.png") { return t*10; }
		else if(d=="mixfood.png") { return t*11; }
		else if(d=="etc.png") { return t*12; }		
		else { console.log(d);}
	}

	function getX2(d) {
		var t = width2/5;

		if(d=='Cross-contamination') { return t*0; }
		else if(d=='Inadequate heat treatment') { return t*1; }
		else if(d=='Storage too long') { return t*2; }
		else if(d=='Infected food handler') { return t*3; }
		else if(d=='Poor personal hygiene') { return t*4; }
		else if(d=='Poor hand-washing facilities') { return t*5; }
	}

	function getY(d) {
		// var t = height/8;
		var t = 42.5; // 42.5

		if(d=='American') { return t*0; }
		else if(d=='British') { return t*1; }
		else if(d=='Chinese') { return t*2; }
		else if(d=='Continental/ European') { return t*3; }
		else if(d=='Indian') { return t*4; }
		else if(d=='Italian') { return t*5; }
		else if(d=='Sandwich bar') { return t*6; }
		else if(d=='Seafood') { return t*7; }
		else if(d=='Other') { return t*8; }
	}

	function getColor(d) {
		return d/39;
	}

	function getColor2(d) {
		return d/80;
	}

	function selectCuisine(d) {
		if(d=='American') { $("#american").css({ 'background-color': '#AF5A53', 'color':'white' }); }
		else if(d=='British') { $("#british").css({ 'background-color': '#AF5A53', 'color':'white' }); }
		else if(d=='Chinese') { $("#chinese").css({ 'background-color': '#AF5A53', 'color':'white'});  }
		else if(d=='Continental/ European') { $("#continental").css({ 'background-color': '#AF5A53', 'color':'white' }); }
		else if(d=='Indian') { $("#indian").css({ 'background-color': '#AF5A53', 'color':'white'});  }
		else if(d=='Italian') { $("#italian").css({ 'background-color': '#AF5A53', 'color':'white' });  }
		else if(d=='Sandwich bar') { $("#sandwich").css({ 'background-color': '#AF5A53', 'color':'white' });  }
		else if(d=='Seafood') { $("#seafood").css({ 'background-color': '#AF5A53' , 'color':'white'});  }
		else if(d=='Other') { $("#other").css({ 'background-color': '#AF5A53', 'color':'white' });  }
	}

	function unselectCuisine(d) {
		if(d=='American') { $("#american").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' }); }
		else if(d=='British') { $("#british").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' }); }
		else if(d=='Chinese') { $("#chinese").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' });  }
		else if(d=='Continental/ European') { $("#continental").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' }); }
		else if(d=='Indian') { $("#indian").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' });  }
		else if(d=='Italian') { $("#italian").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' });  }
		else if(d=='Sandwich bar') { $("#sandwich").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' });  }
		else if(d=='Seafood') { $("#seafood").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' });  }
		else if(d=='Other') { $("#other").css({ 'background-color': 'rgba(85,110,111,0.1)', 'color':'#556E6F' });  }
	}

	// $( function() {
	//   	$("#american").mouseover(function(){
	// 	    $("#american").css("background-color", "#AF5A53");
	// 	    $("#american").css('color','#fff');
	// 	});
	// 	$("#american").mouseout(function(){
	// 	    $("#american").css("background-color", "rgba(85,110,111,0.1)");
	// 	    $("#american").css('color','#556E6F');
	// 	});
	// });

	// function selectCuisine(d) {
	// 	if(d=='American') { $("#american").css({ 'color': '#AF5A53', 'font-weight': 'bold' }); }
	// 	else if(d=='British') { $("#british").css({ 'color': '#AF5A53', 'font-weight': 'bold' }); }
	// 	else if(d=='Chinese') { $("#chinese").css({ 'color': '#AF5A53', 'font-weight': 'bold' });  }
	// 	else if(d=='Continental/ European') { $("#continental").css({ 'color': '#AF5A53', 'font-weight': 'bold' }); }
	// 	else if(d=='Indian') { $("#indian").css({ 'color': '#AF5A53', 'font-weight': 'bold' });  }
	// 	else if(d=='Italian') { $("#italian").css({ 'color': '#AF5A53', 'font-weight': 'bold' });  }
	// 	else if(d=='Sandwich bar') { $("#sandwich").css({ 'color': '#AF5A53', 'font-weight': 'bold' });  }
	// 	else if(d=='Seafood') { $("#seafood").css({ 'color': '#AF5A53', 'font-weight': 'bold' });  }
	// 	else if(d=='Other') { $("#other").css({ 'color': '#AF5A53', 'font-weight': 'bold' });  }
	// }

	// function unselectCuisine(d) {
	// 	if(d=='American') { $("#american").css({ 'color': '#556E6F', 'font-weight': 'normal' }); }
	// 	else if(d=='British') { $("#british").css({ 'color': '#556E6F', 'font-weight': 'normal' }); }
	// 	else if(d=='Chinese') { $("#chinese").css({ 'color': '#556E6F', 'font-weight': 'normal' });  }
	// 	else if(d=='Continental/ European') { $("#continental").css({ 'color': '#556E6F', 'font-weight': 'normal' }); }
	// 	else if(d=='Indian') { $("#indian").css({ 'color': '#556E6F', 'font-weight': 'normal' });  }
	// 	else if(d=='Italian') { $("#italian").css({ 'color': '#556E6F', 'font-weight': 'normal' });  }
	// 	else if(d=='Sandwich bar') { $("#sandwich").css({ 'color': '#556E6F', 'font-weight': 'normal' });  }
	// 	else if(d=='Seafood') { $("#seafood").css({ 'color': '#556E6F', 'font-weight': 'normal' });  }
	// 	else if(d=='Other') { $("#other").css({ 'color': '#556E6F', 'font-weight': 'normal' });  }
	// }

}
