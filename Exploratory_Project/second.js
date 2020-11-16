//Read the data
d3.csv("data1/crime_per_year.csv").then(data => {
  console.log(data);

svg = d3.select("#d3-container-2")
.append("svg")
.attr("width", width)
.attr("height", height)

  // List of groups (here I have one group per column)
  var allGroup = ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"]

  // add the options to the button
  d3.select("#selectButton")
    .selectAll('myOptions')
     .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }); // corresponding value returned by the button

  // A color scale: one color for each group

  
const xScale = d3
  .scaleBand()
  .range([margin.top/.3, width - 100 ])
  .domain(data.map(d => d.year))
  .padding(1)

const yScale = d3
  .scaleLinear()
  .range([height - margin.top - margin.top, margin.top * 2])
  .domain([0, 900])

const xAxis = d3
  .axisBottom(xScale)

  svg
    .append('g')
    .attr("class", "xaxis")
    .attr("transform", `translate(0,${height - margin.top - margin.top})`)
    .style("font-size", ".6vw")
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Year")
    .style("fill", "whitesmoke")
    .style("font-size", ".9vw");

const yAxis = d3
  .axisLeft(yScale)
  //.ticks(2)

  svg
    .append('g')
    .attr("class", "yaxis")
    .attr("transform",`translate(${margin.top/.3})`)
    .style("font-size", ".6vw")
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("dx", "-4em")
    .attr("writing-mode", "vertical-rl")
    .text("Arrests (per 100,000 people)")
    .style("fill", "whitesmoke")
    .style("font-size", ".9vw");

  

  // Initialize line with group a
  var line = svg
    .append('g')
    .append("path")
      .datum(data)
      .attr("d", d3.line()
        .x(function(d) { return xScale(+d.year)})
        .y(function(d) { return yScale(+d.Bronx) })
      )
      .attr("stroke", "white")
      .style("stroke-width", 5)
      .style("fill","none")

  // A function that update the chart
  function update(selectedGroup) {

    // Create new data with the selection?
    var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })

    // Give these new data to update line
    line
        .datum(dataFilter)
        .transition()
        .duration(500)
        .attr("d", d3.line()
          .x(function(d) { return xScale(+d.year)})
          .y(function(d) { return yScale(+d.value) })
        )
        .attr("stroke", "white")
  }

  // When the button is changed, run the updateChart function
  d3.select("#selectButton").on("change", function(d) {
      var selectedOption = d3.select(this).property("value")
      update(selectedOption)
  })
  
})
					