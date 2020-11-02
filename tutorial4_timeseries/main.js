/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 50, bottom: 100, left: 100, right: 100 },
  radius = 8,
  default_selection = "Please Select a League";

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg;
let xScale;
let yScale;
let yAxis;


/**
 * APPLICATION STATE
 * */
let state = {
  data: [],
  selectedLeague: null,
};

/**
 * LOAD DATA
 * */
d3.csv("../data/HomeRunLeaders_1921-2019_D3.csv", d3.autotype).then(raw_data => {
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  // SCALES
  xScale = d3
    .scaleLinear()
    .domain([1920, 2020])
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain([0, 80])
    .range([height - margin.bottom, margin.top]);

  // AXES
  const 
  xAxis = d3.axisBottom(xScale)
          .tickFormat(d3.format("d"));
  yAxis = d3.axisLeft(yScale);

  // UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("new selected entity is", this.value);
    // `this` === the selectElement
    // this.value holds the dropdown value a user just selected
    state.selectedLeague = this.value;
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data([
      ...Array.from(new Set(state.data.map(d => d.League))),
      default_selection,
    ])
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  // this ensures that the selected value is the same as what we have in state when we initialize the options
  selectElement.property("value", default_selection);

  // create an svg element in our main `d3-container` element plus the axis
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("color", "#D50032")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .style("font-size", "17")
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Year");

  svg
    .append("g")
    .attr("class", "axis y-axis")
    .attr("color", "#D50032")
    .attr("transform", `translate(${margin.left},0)`)
    .style("font-size", "17")
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Home Runs");

  tool = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */

function draw() {
  // filter the data for the selectedParty
  let filteredData = [];
  if (state.selectedLeague !== null) {
    filteredData = state.data.filter(d => d.League === state.selectedLeague);
  }

  // update the scale domain (now that our data has changed)
  //yScale.domain([0, d3.max(filteredData, d => d.HomeRuns)]);

  // re-draw our yAxix since our yScale is updated with the new data
  //d3.select("g.y-axis")
    //.transition()
    //.duration(1000)
    //.call(yAxis.scale(yScale)); // this updates the yAxis' scale to be our newly updated one

  // we define our line function generator telling it how to access the x,y values for each point
  const lineFunc = d3
    .area()
    .curve(d3.curveLinear)
    .x(d => xScale(d.Year))
    .y0(yScale(0))
    .y1(d => yScale(d.HomeRuns));

  const dot = svg
    .selectAll(".dot")
    .data(filteredData, d => d.Year) // use `d.year` as the `key` to match between HTML and data elements
    .join(
      enter =>
        // enter selections -- all data elements that don't have a `.dot` element attached to them yet
        enter
          .append("circle")
          .attr("class", "dot") // Note: this is important so we can identify it in future updates
          .attr("r", radius)
          .attr("cy", d => margin.bottom) // initial value - to be transitioned
          .attr("cx", d => xScale(d.Year))

          .on("mouseover", function (d) {
            tool.transition()
              .duration(100)
              .style("opacity", .8)
            tool.html(d.PlayerName + " hit " + d.HomeRuns + " Home Runs during the " + d.Year + " season.")
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px")
          })
          
          .on("mouseout", function (d) {
            tool
              .transition()
              .duration(100)
              .style("opacity", 0)
          }),
          //Insert Transition


          //End Transition
      update => update,
      exit =>
        exit.call(exit =>
          // exit selections -- all the `.dot` element that no longer match to HTML elements
          exit
            .transition()
            .attr("cy", height - margin.bottom)
            .remove()
        )
    )
    // the '.join()' function leaves us with the 'Enter' + 'Update' selections together.
    // Now we just need move them to the right place
    .call(
      selection =>
        selection
          .transition() // initialize transition
          .duration(200) // duration 1000ms / 1s
          .attr("cy", d => yScale(d.HomeRuns)) // started from the bottom, now we're here
    );

  const line = svg
    .selectAll("path.trend")
    .data([filteredData])
    .join(
      enter =>
        enter
          .append("path")
          .attr("class", "trend")
          .attr("opacity", 0), // start them off as opacity 0 and fade them in
      update => update, // pass through the update selection
      exit => exit.remove()
    )
    .call(selection =>
      selection
        .transition() // sets the transition on the 'Enter' + 'Update' selections together.
        .duration(200)
        .attr("opacity", 1)
        .attr("d", d => lineFunc(d))
    );
}