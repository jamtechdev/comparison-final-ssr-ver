import React, { useRef, useEffect } from "react";
import { select, scaleLinear, line } from "d3";
import * as d3 from "d3";
import "./index.css";

function Radar({ data }) {
  console.log(data)
  
  const containerRef = useRef(null);
  const margin = { top: 20, right: 10, bottom: 60, left: 10 };
  const width = 500 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;

  // const data = [
  //   {
  //     pace: 0.85,
  //     shooting: 0.92,
  //     passing: 0.91,
  //     dribbling: 0.95,
  //     physical: 0.65,
  //   },
  //   {
  //     pace: 0.89,
  //     shooting: 0.93,
  //     passing: 0.81,
  //     dribbling: 0.89,
  //     physical: 0.77,
  //   },
  // ];
  // const data = [
  //   {
  //     Battery: 0.805,
  //     Cleaning: 1.0252,
  //     Mopping: 0.2058,
  //     Navigation: 1.25,
  //     Control: 1.27,
  //     Design: 0.0481,
  //   },
  //   {
  //     Battery: 2.98,
  //     Cleaning: 4.1943,
  //     Mopping: 8.195,
  //     Navigation: 1.25,
  //     Control: 2.27,
  //     Design: 4.1809,
  //   },
  // ];

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const svg = select(containerRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("fill", "gray");

    const attributes = Object.keys(data[0]);

    const radius = 200;

    // const { min, max } = data.reduce(
    //   (acc, curr) => {
    //     const currValues = Object.values(curr);
    //     const currMin = Math.min(...currValues);
    //     const currMax = Math.max(...currValues);
    //     return {
    //       min: Math.min(currMin, acc.min),
    //       max: Math.max(currMax, acc.max),
    //     };
    //   },
    //   { min: Infinity, max: -Infinity }
    // );
    const min = 0;
    const max = 10;

    const radAxis = scaleLinear().domain([min, max]).range([0, radius]);

    const cordForAngle = (angle, len) => {
      const x = Math.cos(angle) * len;
      const y = Math.sin(angle) * len;
      return { x, y };
    };

    const tooltip = d3
    .select(`.graph-tab-content`)
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none");

    for (let i = 0; i < attributes.length; i++) {
      const slice = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
      const key = attributes[i];
      const { x, y } = cordForAngle(slice, radius);

      svg
        .append("line")
        .attr("x2", x + width / 2)
        .attr("y2", y + height / 2)
        .attr("x1", width / 2)
        .attr("y1", height / 2)
        .attr("stroke", "#00dd")
        .attr("stroke-width", 1.5)
        .style("opacity", "0.1");

      svg
        .append("text")
        .attr("x", x + width / 2)
        .attr("y", y + height / 2)
        .text(capitalize(key))
        .style("text-anchor", (d) =>
          i === 0
            ? "end"
            : i === 1
            ? "end"
            : i === 2
            ? "end"
            : i === 2
            ? "end"
            : null
        )
        .attr("dx", (d) =>
          i === 0
            ? "0.7em"
            : i === 1
            ? "-0.7em"
            : i === 2
            ? "-0.5em"
            : i === 3
            ? "0.3em"
            : "0.6em"
        )
        .attr("dy", (d) =>
          i === 0
            ? "1.3em"
            : i === 1
            ? "0.4em"
            : i === 2
            ? "-0.5em"
            : i === 3
            ? "-0.5em"
            : "0.4em"
        )
        .attr("fill", "black");
    }
    const numTicks = 10; // Number of ticks
    const tickIncrement = (max - min) / (numTicks - 1); // Calculate the tick increment
    const ticks = Array.from(
      { length: numTicks },
      (_, index) => min + tickIncrement * index
    ); // Generate an array of ticks

    ticks.forEach((el) => {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 - radAxis(el) - 0.85)
        .text(Math.round(el))
        .attr("fill", "black")
        .attr("stroke", "none")
        .attr("opacity", "0.5")
        .style("text-anchor", "middle")
        .style("font-size", "0.825rem");
    });

    ticks.forEach((el) => {
      svg
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 1.0)
        .attr("r", radAxis(el));
    });

    const lineGen = line()
      .x((d) => d.x)
      .y((d) => d.y);

    const getCoordPath = (dataPoint) => {
      const coord = [];
      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        const angle = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
        coord.push(cordForAngle(angle, radAxis(dataPoint[attr])));
      }
      return coord;
    };

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const cord = getCoordPath(d);

      svg
        .append("path")
        .datum(cord)
        .attr("class", "areapath")
        .attr("d", lineGen)
        .attr("stroke-width", 1.5)
        .attr("stroke", "none")
        .attr("fill", () => (i === 0 ? "#FF0" : "#ff0000"))
        .attr("opacity", 0.1)
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      cord.forEach((point, index) => {
        svg
          .append("circle")
          .attr("cx", point.x + width / 2)
          .attr("cy", point.y + height / 2)
          .attr("r", 4)
          .attr("fill", "white")
          .attr("stroke", "#437ece")
          .attr("stroke-width", 1.5)
          .on("mouseover", function (d) {
            console.log(d,"mouse hoverfc " )
            tooltip
              .style("display", "block")
              .html(`<div style="font-size: 14px;><h1>${attributes[index]}: ${data[i][attributes[index]]} </h1> </div>`)
              .style("left", d.clientX - 20 + "px")
              .style("top", d.clientY - 50 + "px")
              .style("color", "#ff0000");
          })
          .on("mouseout", function () {
            tooltip.style("display", "none");
          });
      });
    }
  }, []);

  return <svg viewBox={`0 0 ${width} ${height}`} ref={containerRef}></svg>;
}

export default Radar;
