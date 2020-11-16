
var svg1 = d3.select("#d3-container-3")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

    tool = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip1")
    .style("opacity", 0)
 
var allGroup1 = ["Arson", "Burglary", "Dangerous Weapons", "FelonyAssault", "Grand Larceny", "Rape", "Robbery", "Sex Crimes"]

var x = d3.scaleBand()
  .range([margin.top/.3, width - 100 ])
  .padding(0.5);
var xAxis1 = svg1.append("g")
  .attr("transform", `translate(0,${height - margin.top - margin.top})`)
  .style("color", "whitesmoke")
  .style("font-size", ".6vw")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height - margin.top - margin.top, margin.top * 2]);
var yAxis1 = svg1.append("g")
  .attr("class", "myYaxis")
  .attr("transform", `translate(${margin.top/.3})`)
  .style("color", "whitesmoke")
  .style("font-size", ".6vw")

update = (selectedVar) => {

  d3.csv("data1/crime_whole_12.csv").then(data1 => {
    console.log(data1);

    x
    .domain(data1.map(d => d.Borough))

    xAxis1.transition().duration(500).call(d3.axisBottom(x))

    y
    .domain([0, d3.max(data1, function(d) { return +d[selectedVar] }) + (d3.max(data1, function(d) { return +d[selectedVar] })/15 )]);

    yAxis1
    .transition()
    .duration(500)
    .call(d3.axisLeft(y));

    svg1
      .append("text")
      .attr("class", "axis-label")
      //.attr("transform", "rotate(90)")
      .attr("y", "50%")
      .attr("dx", "2em")
      .style("fill", "whitesmoke")
      .style("font-size", ".9vw")
      .attr("writing-mode", "vertical-rl")
      .text("Arrests per 100,000 people")

    var u = svg1.selectAll("rect")
      .data(data1)
    
    u.enter()
      .append("rect")
      .merge(u)
        .attr("x", function(d) { return x(d.Borough); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - margin.top - margin.top - y(d[selectedVar]); })
        .attr("fill", "rgb(212, 204, 204)")
        .on("mouseover", function (d) {
          tool
            .transition()
            .duration(100)
            .style("opacity", .8)
          tool
            .html("There were " + x(d.Borough))
            .style("left", d3.select(this).attr("cx") + "px")
            .style("top", d3.select(this).attr("cy") + "px")  
      })
        .on("mouseout", function (d) {
          tool
            .transition()
            .duration(100)
            .style("opacity", 0)
      })
      
          u
          .transition();
  })
}

update("Arson")



  


  


