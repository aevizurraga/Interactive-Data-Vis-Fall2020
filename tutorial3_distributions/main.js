const width = window.innerWidth * 0.5,
  height = window.innerHeight * 0.5,
  margin = { top: 50, bottom: 80, left: 80, right: 40 },
  radius = 4;

var div = d3.select("#d3-container")
            .append("div")
            .attr("class", "tooltip")
  
//let svg;
//let xScale;
//let yScale;

let baseball = {
  data: [],
  selectedEvent: "All",
};

d3.csv("../data/baseball_sample.csv", d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  baseball.data = raw_data;
  init();
});

function init() {
  xScale = d3
    .scaleLinear()
    .domain([0, 120])
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain([-80, 100])
    .range([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("new selected event is", this.value);
    baseball.selectedEvent = this.value;
    draw();
  });

  selectElement
    .selectAll("option")
    .data(["All", "Home Run", "Out", "Hit - Not Home Run"]) 
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("color", "white")
    .style("font-size", "12")
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("y", (margin.bottom / 2) + 20)
    .text("Launch Speed (mph)");

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("color", "white")
    .style("font-size", "12")
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("x", (-margin.left / 2) - 10)
    .attr("writing-mode", "vertical-lr")
    .text("Launch Angle");

  draw(); 
}

function draw() {
 
  let filteredData = baseball.data;
  if (baseball.selectedEvent !== "All") {
    filteredData = baseball.data.filter(d => d.event === baseball.selectedEvent);
  }

  const dot = svg
    .selectAll(".dot")
    .data(filteredData, d => d.event) 
    .join(
      enter =>
        enter
          .append("circle")
          .attr("class", "dot") 
          .attr("stroke", "black")
          .attr("fill", d => {
            if (d.event === "Home Run") return "darkblue";
            else if (d.event === "Out") return "#ff3333";
            else return "white";
          })
          .attr("r", radius)
          .attr("cx", d => xScale(d.launch_speed))
          .attr("cy", d => margin.bottom)
          .call(enter =>
            enter
              .transition()            
              .ease(d3.easeBackIn)
              .duration(1500) 
              .attr("cy", d => yScale(d.launch_angle))
          ),
      update =>
        update.call(update =>
          update
            //.transition()
            //.duration(500)
            //.attr("stroke", "black")
            //.transition()
            //.duration(500)
            //.attr("stroke", "white")
        ),
      exit =>
        exit.call(exit =>
          exit
            .transition()
            .duration(1500)
            .ease(d3.easeCircleOut)
            .attr("cy", height - margin.bottom)
            .remove()
        )
    );
}