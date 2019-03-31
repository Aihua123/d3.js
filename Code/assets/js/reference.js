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
    .style("font-weight", "bold");

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)")
    .style("font-weight", "bold");

d3.selectAll(".axisText").on("click", renderChart)

function renderChart() {
    d3.csv("data.csv", function (data) {

        // Step 1: Parse Data/Cast as numbers
        data.forEach(function (d) {
            d.poverty = +d.poverty;
            d.healthcare = +d.healthcare;
        });

        // Step 2: Create scale functions
        var xLinearScale = d3.scaleLinear()
            // .domain([9, d3.max(data, d => d.poverty)])
            .domain([9, 22])
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.healthcare)])
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
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
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
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare - 0.16))
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