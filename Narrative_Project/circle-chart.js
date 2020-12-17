const 
width3 = (innerWidth * .99), 
height3 = ((innerHeight * .85) / 2);

var svg2 = d3
            .select("#circle1")
            .append("svg")
            .attr("width", width3)
            .attr("height", height3)

d3.csv("fish_meal.csv").then(data => {
    console.log(data);

var colorbarchart2 = d3.scaleSequential(d3.interpolateBlues)
                        .domain(
                            [d3.min(data, function (d) {return +d.growth2; }),
                                d3.max(data, function (d) {return +d.growth2; })])
                        
var xscale2 = d3
                .scaleLinear()
                .domain([1964, 2020])
                .range([width3*.05, width3*.95]);
                
var yscale2 = d3 
                .scaleLinear()
                .domain([4, -4])
                .range([height3*.1, height3 * .9]);

var xaxis2 = svg2
                .append("g")
                .call(d3.axisBottom(xscale2).tickValues(["1964", "1972", "1982", "1997", "2020"])
                .tickFormat(d3.format("d")))
                .attr("transform", `translate(0, ${height3 * .5})`)
                .style("color", "whitesmoke")
                .style("font-size", ".6vw")

var yaxis2 = svg2
                .append("g")
                .call(d3.axisLeft(yscale2))
                .style("color", "rgb(43, 43, 43")
                .style("font-size", ".6vw")

var tool = d3.select("body").append("div").attr("class", "toolTip");

var circle1 = svg2.selectAll("circle1")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) {return xscale2(d.Year); })
                .attr("cy", function(d) {return yscale2(0); })
                .attr("r", (d => d.growth2))
                .style("fill", function (d) {
                    if (d.value == "positive") {
                        return "dodgerblue"
                    };
                    return "darkorange";
                    })
                .style("opacity", function(d) {
                    if (d.value == "positive") {
                        return 0
                    };
                    return .3;
                })
                .on("mousemove", function (d) {
                    tool.style("left", d3.event.pageX + 10 + "px")
                    tool.style("top", d3.event.pageY - 20 + "px")
                    tool.style("display", "inline-block");
                    tool.html("Year: " + d.Year + "<br>" + "Exports decreased by " + d.growth2 + "%");
                }).on("mouseout", function (d) {
                    tool.style("display", "none");
                });;             
})


