


d3.csv("Police_Settlements_1.csv").then(data => {
    console.log("data", data);

    const table = d3.select("#d3-table");
  
    
    const thead = table.append("thead");
    thead
      .append("tr")
      .append("th")
      .attr("colspan", "6")
      .text("Claims Records")
      .style("font-size", "17px");
  
    thead
      .append("tr")
      .selectAll("th")
      .data(data.columns)
      .join("td")
      .text(d => d)
      .style("font-weight", "bold");
  
    const rows = table
      .append("tbody")
      .selectAll("tr")
      .data(data)
      .join("tr");
  
    
    rows
      .selectAll("td")
      .data(d => Object.values(d))
      .join("td")
      .style("background-color", d => d > 20000 ? '#F1C5AE' : null)
      .text(d => d);
  });


  