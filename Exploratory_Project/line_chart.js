d3.csv("data1/crime_per_year.csv").then(data => {
  console.log(data);

  svg = d3
    .select("#d3-container-2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

var allGroup = ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"]

  d3.select("#selectButton")
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; }) 
    .attr("value", function (d) { return d; }); 
  
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

const yAxis = d3
    .axisLeft(yScale)

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

  function update(selectedGroup) {

    var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })

    line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(function(d) { return xScale(+d.year)})
          .y(function(d) { return yScale(+d.value) })
        )
        .attr("stroke", "white")
  }

  d3.select("#selectButton").on("change", function(d) {
      var selectedOption = d3.select(this).property("value")
      update(selectedOption)
  })
  
})
					