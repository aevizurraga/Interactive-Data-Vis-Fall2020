
const  width1 = (innerWidth * .8), 
       height1 = (innerHeight * .4);
       minwidth = (innerWidth * .4),
       minheight = (innerHeight * .4);

var svg = d3.select("#trial")
            .append("svg")
            .attr("width", width1)
            .attr("height", height1)

d3.csv('fishmeal_top_25.csv').then(data => { 

    var color = d3.scaleSequential(d3.interpolateBlues)
    .domain(
        [d3.min(data, function (d) {return +d.value; }),
         d3.max(data, function (d) {return +d.value; })])

    var root = d3
        .stratify()
        .id(function (d) {return d.Country; })
        .parentId(function (d) {return d.parent; })
        (data);

    console.log(data);

    root.sum(function (d) {return +d.value; })

        d3.treemap().size([width1, height1]).padding(1)(root)

        console.log(root.leaves())

    var tool = d3.select("body").append("div").attr("class", "toolTip");

        svg.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr("x", function (d) {return d.x0; })
            .attr("y", function (d) {return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("stroke-width", ".07em")
            .style("fill", function (d) {return color(+d.value); })
            .on("mousemove", function (d) {
              tool.style("left", d3.event.pageX + 10 + "px")
              tool.style("top", d3.event.pageY - 20 + "px")
              tool.style("display", "inline-block");
              tool.html("Country: " + d.data.Country +  "<br>" + "Produced " + d.value + ",000 metric tons of fishmeal");
          }).on("mouseout", function (d) {
              tool.style("display", "none");
          });;

        svg.selectAll("text")
            .data(root.leaves())
            .enter()
            .append("text")
              .attr("x", function(d){ return d.x0 + 5})    
              .attr("y", function(d){ return d.y0 + 20})   
              .text(function(d){ return d.data.Country})
              .attr("font-size", ".8em")
              .attr("fill", function(d) {
                  if (d.value == 1100) {return "whitesmoke"}
                    else {return "black"};
                  })
              .style("opacity", function (d) {
                if (d.value  <= 100) {
                    return 0
                  };
                  return 1;
                });
})