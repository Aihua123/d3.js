var svgWidth = 1000;
var svgHeight = 580;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.

currentY = "healthcare"
currentX = "age"

renderChart(currentX, currentY)


function renderChart(x, y) {
    d3.select("svg").remove()
    console.log(x, y)
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top + 5})`)

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Heathcare (%)")
        .style("font-weight", "bold")
        .style("cursor", "pointer");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokes (%)")
        .style("font-weight", "bold")
        .style("cursor", "pointer");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "xAxisText")
        .text("In Poverty (%)")
        .style("font-weight", "bold")
        .style("cursor", "pointer")

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 8})`)
        .attr("class", "xAxisText")
        .text("Age (Median)")
        .style("font-weight", "bold")
        .style("cursor", "pointer")

    d3.selectAll(".xAxisText").on("click", function () {
        currentX = d3.select(this).text()
        if (currentX == "In Poverty (%)") {
            currentX = "poverty"
        } else if (currentX == "Age (Median)") {
            currentX = "age"
        }
        renderChart(currentX, currentY)
    }) //listen to x axis

    d3.selectAll(".axisText").on("click", function () {
        currentY = d3.select(this).text()
        console.log(currentY)
        if (currentY == "Lacks Heathcare (%)") {
            currentY = "healthcare"
        } else if (currentY == "Smokes (%)") {
            currentY = "smokes"
        }
        renderChart(currentX, currentY)
    }) // listen to y axis

    d3.csv("data.csv", function (data) {

        // Step 1: Parse Data/Cast as numbers
        data.forEach(function (d) {
            d[x] = +d[x];
            d[y] = +d[y];
        });

        // Step 2: Create scale functions
        var xLinearScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d[x]))
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d[y]))
            .range([height, 0]);

        // Step 3: Create axis functions     
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Step 4: Append Axes to the chart
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        // Step 5: Create Circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d[x]))
            .attr("cy", d => yLinearScale(d[y]))
            .attr("r", "12")
            .attr("fill", "#4682B4")
        // .attr("opacity", ".5")

        // Step 6: Create text inside the circle
        var textGroup = chartGroup
            .selectAll(".stateText")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "stateText")
            .attr("x", d => xLinearScale(d[x]))
            .attr("y", d => yLinearScale(d[y] - 0.16))
            .style("fill", "white").text('hi')
            .style("font-size", "9pt")
            .text(d => d.abbr)


        // // Create axes labels
        // chartGroup.append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 0 - margin.left + 40)
        //     .attr("x", 0 - (height / 2))
        //     .attr("dy", "1em")
        //     .attr("class", "axisText")
        //     .text("Lacks Heathcare (%)")
        //     .style("font-weight", "bold");

        // chartGroup.append("text")
        //     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        //     .attr("class", "axisText")
        //     .text("In Poverty (%)")
        //     .style("font-weight", "bold");

    })
}