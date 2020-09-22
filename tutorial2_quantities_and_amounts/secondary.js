d3.csv("../data/NYC_Settlements_Table.csv", d3.autoType).then(data => {
    console.log(data);

    data = data.sort(function (a, b) {
        return d3.descending(a.SetPerThousandPeople, b.SetPerThousandPeople);
    })
  
    const 
        margin = { top: 20, bottom: 140, left: 250, right: 90 }
        width = window.innerWidth * 0.6,
        height = window.innerHeight / 2,
        paddingInner = 0.2;

    const svg = d3
        .select("#d3-container-1")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append('g')
            .attr('transform',
                  'translate(' + margin.left + ',' + margin.top + ')');  
  
     const xScale = d3
        .scaleLinear()
        .domain([0, 11])
        .range([0, width])
;

        svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .style("text-anchor", 'middle')
        .style("font-size", "20px")
        .style("fill", "#DAE1E7");

    const yScale = d3
        .scaleBand()
        .range([0, height])
        .domain(data.map(d => d.Borough))
        .padding(.5);

        svg
        .append('g')
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .attr("transform", "translate(-2)")
        .style("text-anchor", "end")
        .style("font-size", "20px")
        .style("fill", "#DAE1E7");     

    const rect = svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => yScale(d.Borough))
        .attr("width", d => xScale(d.SetPerThousandPeople))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#DAE1E7")
        .attr("stroke", "black");

})

///////////////////////////////////////////////////////////////////////////////////////////