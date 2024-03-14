import * as React from "react";
import * as d3 from "d3";

function lineChart(svgRef, lineChartData) {
  const parseDate = d3.timeParse("%Y-%m-%d");

  // console.log(lineChartData);
  const data = lineChartData?.lineChartData.map((chartData) => ({
    name: chartData.name,
    values: chartData.values.map((value) => ({
      date: parseDate(value.date),
      price: value.price,
    })),
  }));

  // console.log(data);

  const svg = d3.select(svgRef.current);
  const width = 850;
  const height = 350;
  const margin = 100;
  const duration = 250;

  const lineOpacity = "2.5";
  const lineOpacityHover = "0.5";
  const otherLinesOpacityHover = "0";
  const lineStroke = "2.5";
  const lineStrokeHover = "2.5";

  const circleOpacity = "0.85";
  const circleOpacityOnLineHover = "0.85";
  const circleRadius = 5;
  const circleRadiusHover = 6;

  const [minX, maxX] = d3.extent(data[0].values, (d) => d.date);

  // console.log(yIntervals);
  const xScale = d3
    .scaleTime()
    .domain([d3.timeWeek.offset(maxX, -24), maxX]) // Show data for the last 24 weeks
    .range([0, width - margin]);

  const [minY, maxY] = d3.extent(data[0].values, (d) => d.price);
  const maxDifference = maxY / 15;
  const maxInterval = Math.round(maxY + maxDifference);
  const minInterval = Math.max(0, Math.round(minY - maxDifference));
  const intervalDifference = (maxInterval - minInterval) / 5;

  const yIntervals = [
    maxInterval,
    maxInterval - intervalDifference,
    maxInterval - 2 * intervalDifference,
    maxInterval - 3 * intervalDifference,
    maxInterval - 4 * intervalDifference,
    maxInterval - 5 * intervalDifference,
  ];
  // [0, 200, 400, 600, 800, 980];
  // console.log(yIntervals);

  // Day
  const yScale = d3
    .scaleLinear()
    .domain([minY, maxY])
    .range([height - margin, 0]);

  svg
    .attr("width", width + margin + "px")
    .attr("height", height + margin + "px")
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(height - margin)
    .tickSizeOuter(0)
    .tickFormat(d3.timeFormat("%Y-%m-%d"))
    .tickPadding(15)
    .ticks(4);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(margin - width) // Keep ticks for labels (optional)
    .tickSizeOuter(0)
    .tickValues(yIntervals)
    .tickPadding(20);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(${margin}, ${margin})`)
    // .attr("font-weight", "100")
    .style("stroke", "#27314BB2")
    .attr("x", 1200)

    .style("opacity", 1)
    // .style("color", "red")
    // .attr("font-family", '"Roboto", "sans-serif"')
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("font-weight", "100")
    .style("stroke", "#27314BB2") // Set the stroke color of the axis lines to grey
    .style("opacity", 1)

    // .attr("font-family", '"Roboto", "sans-serif"')
    .call(yAxis)
    .append("text")
    .attr("y", 900)
    .attr("transform", "rotate(-90)");

  const line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.price));

  const lines = svg
    .append("g")
    .attr("class", "lines")
    .attr("transform", `translate(${margin}, ${margin})`)
    .style("stroke", "#437ECE")
    .style("opacity", 0.8);

  lines
    .selectAll("line-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.values))
    .style("stroke", "#437ECE")
    .style("stroke-width", 2.5)
    .style("fill", "none")
    .style("opacity", 5)
    .on("mouseover", function () {
      // d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
      d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
      d3.select(this)
        .style("opacity", lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
    .on("mouseout", function () {
      // d3.selectAll(".line").style("opacity", lineOpacity);
      d3.selectAll(".circle").style("opacity", circleOpacity);
      d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
    });

  const tooltip = d3
    .selectAll(`.chart__data`)
    .append("div")
    .attr("class", "tooltip")
    .style("display", "none");

  lines
    .selectAll("circle-group")
    .data(data)
    .enter()
    .append("g")
    .style("fill", "#437ECE")
    .selectAll("circle")
    .data((d) => d.values)
    .enter()
    .append("g")
    .attr("class", "circle")
    .on("mouseover", function (_e, d) {
      d3.select(this)
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text");
      // .attr("x", (d) => xScale(d.date) + 5)
      // .attr("y", (d) => yScale(d.price) - 10);
      const formatDate = d3.timeFormat("%Y-%m-%d");
      // const formatDate = d3.timeFormat("%d.%m.%y");
      tooltip
        .style("display", "block")
        .style("opacity", 1)
        .html(
          `<div style="font-size: 15px"> <b style="opacity: 0.6">${
            d.price
          } € </b>   <i style="opacity: 0.5">(${formatDate(
            d?.date
          )} )</i> </div>`
        )
        .style("background-color", "white")
        .style("left", event.clientX + "px")
        .style("top", event.clientY + "px")
        .style("color", "#000");
      // .text(`${d.price}`)
    })
    .on("mouseout", function () {
      d3.select(this)
        .style("cursor", "none")
        .transition()
        .duration(duration)
        .selectAll(".text");
      tooltip.style("opacity", 0);
    })
    .append("circle")
    .attr("cx", (d) => xScale(d.date))
    .attr("cy", (d) => yScale(d.price))
    .attr("r", circleRadius)
    .style("opacity", circleOpacity)
    .on("mouseover", function () {
      d3.select(this)
        .transition()
        .duration(duration)
        .attr("r", circleRadiusHover);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(duration).attr("r", circleRadius);
    });
}

const DrawChart = (lineChartData) => {
  const svg = React.useRef(null);
  React.useEffect(() => {
    lineChart(svg, lineChartData);
  }, [svg]);

  return <svg ref={svg} />;
};

export default DrawChart;
