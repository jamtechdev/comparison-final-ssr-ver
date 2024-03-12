import * as React from "react";
import * as d3 from "d3";

function lineChart(svgRef, lineChartData) {
  console.log(lineChartData);
  const parseDate = d3.timeParse("%Y-%m");

  const data = [
    {
      name: "Price",
      values: [
        { date: "2020-01", price: 400 },
        { date: "2020-02", price: 100 },
        { date: "2020-03", price: 200 },
        { date: "2020-04", price: 320 },
        { date: "2020-05", price: 210 },
        { date: "2020-06", price: 600 },
      ].map((line) => {
        const date = parseDate(line.date);
        console.log(date);

        return {
          date: line?.data,
          price: line.price,
        };
      }),
    },
  ];
  console.log(data);
  const svg = d3.select(svgRef.current);
  const width = 700;
  const height = 400;
  const margin = 100;
  const duration = 250;

  const lineOpacity = "1";
  const lineOpacityHover = "0.85";
  const otherLinesOpacityHover = "0.1";
  const lineStroke = "3.5";
  const lineStrokeHover = "5";

  const circleOpacity = "0.85";
  const circleOpacityOnLineHover = "0.85";
  const circleRadius = 5;
  const circleRadiusHover = 6;

  const [minX, maxX] = d3.extent(data[0].values, (d) => d.date);

  // console.log(yIntervals);
  const xScale = d3
    .scaleTime()
    .domain([minX, maxX])
    .range([0, width - margin]);

  const [minY, maxY] = d3.extent(data[0].values, (d) => d.price);
  // console.log(maxY);
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
    .tickFormat(d3.timeFormat("%b"))
    .tickPadding(15);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(margin - width)
    .tickSizeOuter(0)
    .ticks(6)
    .tickPadding(20);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("font-weight", "100")
    .attr("font-family", '"Roboto", "sans-serif"')
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("font-weight", "100")
    .attr("font-family", '"Roboto", "sans-serif"')
    .call(yAxis)
    .append("text")
    .attr("y", 15)
    .attr("transform", "rotate(-90)");

  const line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.price));

  const lines = svg
    .append("g")
    .attr("class", "lines")
    .attr("transform", `translate(${margin}, ${margin})`);

  lines
    .selectAll("line-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .on("mouseover", function (_e, d) {
      svg
        .append("text")
        .attr("class", "title-text")
        .style("fill", "#33BBFF")
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("x", (width - margin) / 2)
        .attr("y", 70);
    })
    .on("mouseout", function (_d) {
      svg.select(".title-text").remove();
    })
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.values))
    .style("stroke", "#33BBFF")
    .style("fill", "none")
    .style("opacity", lineOpacity)
    .on("mouseover", function () {
      d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
      d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
      d3.select(this)
        .style("opacity", lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
    .on("mouseout", function () {
      d3.selectAll(".line").style("opacity", lineOpacity);
      d3.selectAll(".circle").style("opacity", circleOpacity);
      d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
    });

  lines
    .selectAll("circle-group")
    .data(data)
    .enter()
    .append("g")
    .style("fill", "#33BBFF")
    .selectAll("circle")
    .data((d) => d.values)
    .enter()
    .append("g")
    .attr("class", "circle")
    .on("mouseover", function (_e, d) {
      d3.select(this)
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text")
        .text(`${d.price}`)
        .attr("x", (d) => xScale(d.date) + 5)
        .attr("y", (d) => yScale(d.price) - 10);
    })
    .on("mouseout", function () {
      d3.select(this)
        .style("cursor", "none")
        .transition()
        .duration(duration)
        .selectAll(".text")
        .remove();
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
