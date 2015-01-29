Template.app.rendered = function() {
	console.log("# render viz");

	var foodType = ["Red meat", "Poultry meat", "Finfish", "Crustacean and shellfish", 
					"Eggs and egg dishes","Raw egg shell used in uncooked",
					"Milk and dairy products","Rice","Vegetables and fruit",
					"Desserts, cakes and confectionary","Condiments and snacks",
					"Mixed foods","Other foods"];

	var foodFactor = ["Cross-contamination", "Inadequate heat treatment", "Storage too long",
					  "Infected food handler", "Poor personal hygiene", "Poor hand-washing facilities"];

	var margin = { top: 30, right: 40, bottom: 30, left: 40 };

	var width = parseInt(d3.select('#viz').style('width'), 10) - 30,
		width = width - margin.left - margin.right,
		height = 700,
		height = height - margin.top - margin.bottom;

	var width2 = parseInt(d3.select('#viz2').style('width'), 10) - 30,
		width2 = width2 - margin.left - margin.right;

	var svg = d3.select('#viz').append('svg')
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

	var g =	svg.append('g')
			.attr('transform', 'translate('+margin.left+","+margin.top+')');

	var svg2 = d3.select('#viz2').append('svg')
			.attr("width", width2 + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

	var g2 = svg2.append('g')
			.attr('transform', 'translate('+margin.left+","+margin.top+')');

	queue()
		.defer(d3.csv, 'foodType.csv')
		.defer(d3.csv, 'foodFactor.csv')
		.await(makeViz);

    function makeViz(error, data, data2) {

		var bg = g.append('rect')
					.attr('x', -margin.left)
					.attr('y', -margin.top)
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.style('fill', '#D4CEC1')
					.style('opacity', 0);

		var bg2 = g2.append('rect')
					.attr('x', -margin.left)
					.attr('y', -margin.top)
					.attr('width', width2 + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.style('fill', '#D4CEC1')
					.style('opacity', 0);

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
						.attr('height', 6)
						.attr('x', function(d) { return getX(d.Type)-width/24; })
						.attr('y', function(d) { return getY(d.Cuisine)-3; })
						// .style('fill', '#5FB466') // green
						// .style('fill', '#AD4644') // red
						.style('fill', '#556E6F') // dark blue
						.style('opacity', function(d) { return getColor(d.Value); });

		var dots2 = g2.selectAll('.dot')
						.data(data2)
					.enter().append('rect')
						.attr('width', width2/5)
						.attr('height', 6)
						.attr('x', function(d) { return getX2(d.Factor)-width2/10; })
						.attr('y', function(d) { return getY(d.Cuisine)-3; })
						// .style('fill', '#5FB466')
						.style('fill', '#AF5A53')
						.style('opacity', function(d) { return getColor2(d.Value); });

		var text = g.selectAll('text')
						.data(foodType)
					.enter().append('text')
						.style("text-anchor", "end")
						.attr("transform", "rotate(-90)")
						.attr("x", -380)
						.attr("y", function(d) { return getX(d)-width/24+10; })
						// .attr("x", function(d) { return getX(d)-width/24; })
						// .attr("y", 0)
						.attr("font-family", 'FontAwesome')
						.style('fill', '#556E6F')
						.text(function(d){ return d; });

		var text2 = g2.selectAll('text')
						.data(foodFactor)
					.enter().append('text')
						.style("text-anchor", "end")
						.attr("transform", "rotate(-90)")
						.attr("x", -380)
						.attr("y", function(d) { return getX2(d)-width/24+10; })
						.attr("font-family", 'FontAwesome')
						.style('fill', '#AF5A53')
						.text(function(d){ return d; });


		// var dots = g.selectAll('.dot')
		// 				.data(data)
		// 			.enter().append('circle')
		// 				.attr('r', 10)
		// 				.attr('cx', function(d) { return getX(d.Type); })
		// 				.attr('cy', function(d) { return getY(d.Cuisine); })
		// 				.style('fill', '#5FB466')
		// 				.style('opacity', function(d) { return getColor(d.Value); });

		// var dots2 = g2.selectAll('.dot')
		// 				.data(data2)
		// 			.enter().append('circle')
		// 				.attr('r', 10)
		// 				.attr('cx', function(d) { return getX2(d.Factor); })
		// 				.attr('cy', function(d) { return getY(d.Cuisine); })
		// 				.style('fill', '#5FB466')
		// 				.style('opacity', function(d) { return getColor2(d.Value); });
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
		var t = 42.5;

		if(d=='American') { return t*0; }
		else if(d=='British') { return t*1; }
		else if(d=='Chinese') { return t*2; }
		else if(d=='Continental/ European') { return t*3; }
		else if(d=='Indian') { return t*4; }
		else if(d=='Italian') { return t*5; }
		else if(d=='Sandwich bar') { return t*6; }
		else if(d=='Seafood') { return t*7; }
		else if(d=='Other cuisines') { return t*8; }
	}

	function getColor(d) {
		return d/39;
	}

	function getColor2(d) {
		return d/80;
	}

}
