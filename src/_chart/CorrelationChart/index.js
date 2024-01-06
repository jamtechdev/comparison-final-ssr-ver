import { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./index.css";
import { calculateNextStep } from "../utils/calculateTickStep";
import {tickValues} from '../utils/computTicks'
function CorrelationChart(props) {
  const {
    data: correlationChartData,
    height,
    width,
    chartTitle,
    xLabel,
    yLabel,
    xTick,
    yTick,
    xUnit,
    yUnit,
  } = props;

  const svgContainer = useRef();
  const maxX = d3.max(correlationChartData.map((d) => d.value));
  const minX = d3.min(correlationChartData.map((d) => d.value));
  const maxY = d3.max(correlationChartData.map((d) => Number(d.label)));
  const minY = d3.min(correlationChartData.map((d) => Number(d.label)));

  const margin = { top: 40, right: 35, bottom: 40, left: 35 };
  const {nextStepVal:yStep} =calculateNextStep(maxY,yTick)
  const {ticks:yTickValues} =tickValues(0,yTick,yStep)

  const {nextStepVal:xStep} =calculateNextStep(maxX,xTick)
  const {ticks:xTickValues} =tickValues(0,xTick,xStep)
  useEffect(() => {
    drawChart();
  }, [correlationChartData]);
  function drawChart() {
    d3.select(svgContainer.current).select("svg").remove();
    // Remove the old tooltip
    d3.select(svgContainer.current).select(".tooltip").remove();
     const translateX= margin.left+15
    const svg = d3
      .select(svgContainer.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .style("background-color", "#fff")
      .attr("transform", "translate(" + translateX + "," + margin.top + ")");

    //add tooltip
    const tooltip = d3
      .select(svgContainer.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    //.attr("transform", `translate(${svgSize / 2}px, ${svgSize / 2}px)`);

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", height - margin.top - margin.bottom)
      .attr("width", width - margin.left - margin.right)
      .style("fill", "#fff");
    // .style("stroke", "rgba(39, 48, 78, 0.1)");

    // Add X axis
    const xScale = d3
      .scaleLinear()
      .domain([0, xTickValues[xTickValues.length-1]])
      .range([margin.left, width - margin.right]);
    //xScale.nice();

    const translateXaxis = {
      y: height - margin.top - margin.bottom,
      x: -margin.left,
    };
    // const xAxisGroups = svg
    //   .append("g")
    //   .attr("transform", `translate(${translateXaxis.x},${translateXaxis.y})`)
    //   .call(
    //     d3
    //       .axisBottom(xScale)
    //       .ticks(xTick)
    //       .tickSize(-(height - margin.top - margin.bottom))
    //   );
    //const xTickValues = d3.range(0, maxX + 1, maxX / xTick);
    const xAxisGroups = svg
      .append("g")
      .attr("transform", `translate(${translateXaxis.x},${translateXaxis.y})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues(xTickValues)
          .tickFormat(customTickFormatXaxis)
          .tickSize(-(height - margin.top - margin.bottom))
      );
    xAxisGroups
      .selectAll("text")
      .attr("x", 0) // Adjust the horizontal position
      .attr("y", 10); // Adjust the vertical position
    //.style("text-anchor", "middle"); // Center the text

    //Add Y axis
    const yScale = d3
      .scaleLinear()
      .domain([0, yTickValues[yTickValues.length-1]])
      .range([height - margin.top, margin.bottom]);
   // yScale.nice();

    const translateYaxis = {
      y: -margin.top,
      x: 0,
    };
    // const yAxisGroups = svg
    //   .append("g")
    //   .attr("transform", `translate(${translateYaxis.x},${translateYaxis.y})`)
    //   .call(
    //     d3
    //       .axisLeft(yScale)
    //       .ticks(yTick)
    //       .tickSize(-(width - margin.left - margin.right))
    //   );
    //const yTickValues = d3.range(0, maxY + 1, maxY / yTick);
    const yAxisGroups = svg
      .append("g")
      .attr("transform", `translate(${translateYaxis.x},${translateYaxis.y})`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(customTickFormaYaxis)
          .tickValues(yTickValues)
          .tickSize(-(width - margin.left - margin.right))
      );
    yAxisGroups
      .selectAll("text")
      .attr("x", -10) // Adjust the horizontal position
      .attr("y", 0); // Adjust the vertical position
    // .style("text-anchor", "middle"); // Center the text

    svg.selectAll(".tick line").attr("stroke", "rgba(39, 48, 78, 0.1)");
    svg.selectAll("path").attr("display", "none");

    //x axis label
    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("x", (width - margin.left) / 2)
      .attr("y", height - margin.top + 20)
      //.attr("transform", "rotate(-90)")
      .text(xLabel);

    //y axis label
    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("x", -margin.left - 40)
      .attr("y", (height - margin.top) / 2)
      //.attr("transform", "rotate(-90)")
      .text(yLabel);

    //plot graph
    // Add dots
    const dotGroups = svg
      .append("g")
      .selectAll("dot")
      .data(correlationChartData)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d.value) - margin.left;
      })
      .attr("cy", function (d) {
        return yScale(d.label) - margin.top;
      })
      .attr("r", 7)
      .attr("class", "hover-effect")
      .style("fill", "#437ECE")
      .on("mouseover", (e, data) => {
        tooltip.transition().duration(300).style("opacity", 1);
        tooltip
          .html(
            `<div class="tooltip-font"><span style="margin-right:4px">${
              data.label
            }</span><span>${
              data.productCount ? `(${data.productCount})` : ""
            }</span></div>`
          )
          .style("left", e.clientX - 20 + "px")
          .style("top", e.clientY - 50 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(300).style("opacity", 0);
      });

    function customTickFormaYaxis(d) {
      const formateFunction = d3.format(".0f");
      return `${formateFunction(d)} ${yUnit}`;
    }
    function customTickFormatXaxis(d) {
      const formateFunction = d3.format(".0f");
      return `${formateFunction(d)} ${xUnit}`;
    }
  }
  return (
    <div
      style={{
        "align-items": "center",
        "flex-direction": "column",
        display: "flex",
      }}
    >
      <span
        style={{ "max-width": width, "text-align": "center" }}
        className="chartTitle"
      >
        {chartTitle}
      </span>
      <div ref={svgContainer} style={{ "background-color": "#fff","padding-right": "20px" }}></div>
    </div>
  );
}
export default CorrelationChart;
