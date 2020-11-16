const 
  width = window.innerWidth * .40,
  height = window.innerHeight * .6,
  margin = { top: height/20, bottom: 0, left: 50, right: 50};
  


d3.csv("data1/crime_whole_12.csv").then(data => {
    console.log(data);


    svg = d3
    .select("#d3-container-1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

const xScale0 = d3
    .scaleBand()
    .range([100, width - 100])
    .domain(data.map(d => d.Borough))
    .padding(.85)

const yScale = d3
    .scaleLinear()
    .range([height - margin.top, 50])
    .domain([0, 1200])

const xAxis = d3
    .axisBottom(xScale0)

    svg
      .append('g')
      .attr("class", "xaxis")
      .attr("transform", `translate(0,${height - margin.top})`)
      .style("font-size", ".6vw")
      .call(xAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("x", "50%")
      .attr("dy", "3em")
      .text("Borough")
      .style("fill", "white")
      .style("font-size", "10");

const yAxis = d3
    .axisLeft(yScale)
    //.ticks(2)

    svg
      .append('g')
      .attr("class", "yaxis")
      .attr("transform", `translate(${margin.top}), 150`)
      .style("font-size", "20")
      .call(yAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("y", "50%")
      .attr("dx", "-4em")
      .attr("writing-mode", "vertical-rl")
      .text("Arrests (per 100,000 people)")
      .style("font-size", "12")
      .style("fill", "white");


    tool = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip1")
      .style("opacity", 0)

    var bars = xScale0.bandwidth()
///////////////////////////////////////////////////
svg
    .selectAll(".rect1")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "rect1")
    .attr("x", d => xScale0(d.Borough) - (width/25))
    .attr("y", d => yScale(d.FelonyAssault))
    .attr("width", bars)
    .attr("height", d => { return height - margin.top - yScale(d.FelonyAssault)})
    .attr("fill", "#263238")
    .attr("stroke", "white")
    .on("mouseover", function (d) {
      tool.transition()
          .duration(100)
          .style("opacity", .8)
      tool.html("There were " + d.FelonyAssault + " arrests for Felony Assault per 100,000 people in the " + d.Borough + " borough.")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px")  
  })
  .on("mouseout", function (d) {
    tool
      .transition()
      .duration(100)
      .style("opacity", 0)
  });

svg 
    .selectAll(".rect2")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "rect2")
    .attr("x", d => xScale0(d.Borough))
    .attr("y", d => yScale(d.DangerousWeapons))
    .attr("width", bars)
    .attr("height", d => { return height - margin.top - yScale(d.DangerousWeapons)})
    .attr("fill", "#546e7a")
    .attr("stroke", "white")
    .on("mouseover", function (d) {
        tool.transition()
            .duration(100)
            .style("opacity", .8)
        tool.html("There were " + d.DangerousWeapons + " arrests for Dangerous Weapons per 100,000 people in the " + d.Borough + " borough.")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px")  
    })
    .on("mouseout", function (d) {
      tool
        .transition()
        .duration(100)
        .style("opacity", 0)
    });

svg 
    .selectAll(".rect4")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "rect4")
    .attr("x", d => xScale0(d.Borough) + (width/25))
    .attr("y", d => yScale(d.GrandLarceny))
    .attr("width", bars)
    .attr("height", d => { return height - margin.top - yScale(d.GrandLarceny)})
    .attr("fill", "#90a4ae")
    .attr("stroke", "white")
    .on("mouseover", function (d) {
      tool.transition()
          .duration(100)
          .style("opacity", .8)
      tool.html("There were " + d.GrandLarceny + " arrests for Grand Larceny per 100,000 people in the " + d.Borough + " borough.")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px")  
  })
  .on("mouseout", function (d) {
    tool
      .transition()
      .duration(100)
      .style("opacity", 0)
  });


svg 
    .selectAll(".rect3")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "rect3")
    .attr("x", d => xScale0(d.Borough) + (width/13))
    .attr("y", d => yScale(d.Robbery))
    .attr("width", bars)
    .attr("height", d => { return height - margin.top - yScale(d.Robbery)})
    .attr("fill", "#cfd8dc")
    .attr("stroke", "white")
    .on("mouseover", function (d) {
      tool.transition()
          .duration(100)
          .style("opacity", .8)
      tool.html("There were " + d.Robbery + " arrests for Rape per 100,000 people in the " + d.Borough + " borough.")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px")
      d3.select(this)
        .style("fill", "#222222")  
  })
  
  .on("mouseout", function (d) {
    tool
      .transition()
      .duration(100)
      .style("opacity", 0)
    d3.select(this)
      .style("fill", "cfd8dc")
  });


svg 
  .append("line")
  .attr("x1", 360)
  .attr("x2", 360)
  .attr("y1", height - margin.top)
  .attr("y2", 0)
  .style("stroke-width", 5)
  .style("stroke", "#222222")
  .style("fill", "none");


  svg 
  .append("line")
  .attr("x1", 545)
  .attr("x2", 545)
  .attr("y1", height - margin.top)
  .attr("y2", 0)
  .style("stroke-width", 5)
  .style("stroke", "#222222")
  .style("fill", "none");

  svg 
  .append("line")
  .attr("x1", 730)
  .attr("x2", 730)
  .attr("y1", height - margin.top)
  .attr("y2", 0)
  .style("stroke-width", 5)
  .style("stroke", "#222222")
  .style("fill", "none");

  svg 
  .append("line")
  .attr("x1", 915)
  .attr("x2", 915)
  .attr("y1", height - margin.top)
  .attr("y2", 0)
  .style("stroke-width", 5)
  .style("stroke", "#222222")
  .style("fill", "none");
})