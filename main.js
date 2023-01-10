const foods = [
    {name: 'Test', calories: 100, carbs: 10, protein: 20, fat: 2.5}
];

function calculateTotalMacros(){
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    
    for (const food of foods) {
      totalCarbs += food.carbs;
      totalProtein += food.protein;
      totalFat += food.fat;
    }
    
    return {totalProtein, totalCarbs, totalFat};
}

function calculateTotalCalories(){
    let totalCalories = 0;
    let caloriesGoal = 1900;
    
    for (const food of foods) {
      totalCalories += food.calories;
    }
    
    return {totalCalories, caloriesGoal};
}

function addFood(){
    const name = document.getElementById('name').value;
    const calories = parseFloat(document.getElementById('calories').value);
    const protein = parseFloat(document.getElementById('protein').value);
    const carbs = parseFloat(document.getElementById('carbs').value)
    const fat = parseFloat(document.getElementById('fat').value);

    if (name.trim() === '' || calories <= 0 || protein <= 0 || carbs <= 0 ||fat <= 0) {
        alert('Please enter a valid values for all the fields');
        return;
    }

    foods.push({name: name, calories: calories, carbs: carbs, protein: protein, fat: fat});
    console.log(foods)
    console.log('Total', calculateTotalCalories());
    console.log('Total', calculateTotalMacros());
    visualizeData();
}


// Experimental
function visualizeData(){
    // set the dimensions and margins of the graph
    var width = 450
    height = 450
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var data = calculateTotalMacros();

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){return d.data.key})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
}