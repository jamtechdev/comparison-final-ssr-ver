import React, { useEffect } from "react";
import { select, scaleLinear, line } from "d3";
import * as d3 from "d3";
import "./index.css";

function Radar({ data, activeTab }) {
  // console.log(data, "neet");

  const margin = { top: 20, right: 10, bottom: 60, left: 10 };
  const width = 500 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;

  // const data = [
  //   {
  //     Battery: 8.805,
  //     Cleaning: 3.0252,
  //     Mopping: 5.2058,
  //     Navigation: 1.25,
  //     Control: 10.27,
  //     Design: 8.0481,
  //   },
  //   {
  //     Battery: 7.98,
  //     Cleaning: 4.1943,
  //     Mopping: 8.195,
  //     Navigation: 1.25,
  //     Control: 2.27,
  //     Design: 4.1809,
  //   },
  // ];

  const capitalize = (str) => {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return "";
    }
  };

  useEffect(() => {
    const svg = select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("fill", "gray");

    const attributes = Object.keys(data[0]);

    const radius = 150;

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
      // console.log(key)
      const { x, y } = cordForAngle(slice, radius);

      svg
        .append("line")
        .attr("x2", x + width / 2)
        .attr("y2", y + height / 2)
        .attr("x1", width / 2)
        .attr("y1", height / 2)
        .attr("stroke", "#D3D3D3")
        .attr("stroke-width", 1.5)
        .style("opacity", "0.3");

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
        .attr("fill", "gray");
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
        .attr("stroke", "#D3D3D3")
        .attr("stroke-width", 1.0)
        .attr("r", radAxis(el));
    });

    const lineGen = line()
      .x((d) => d.x)
      .y((d) => d.y);
    const getCoordPath = (dataPoint) => {
      let coord = [];
      for (let i = 0; i < attributes.length; i++) {
        let attr = attributes[i];
        let angle = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
        let { x, y } = cordForAngle(angle, radAxis(dataPoint[attr]));
        coord.push({ x, y, value: dataPoint[attr], attribute: attr });
      }
      return coord;
    };

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      // console.log(i);
      const cord = getCoordPath(d);

      svg
        .append("path")
        .datum(cord)
        .attr("class", `areapath`)
        .attr("d", lineGen)
        .attr("stroke-width", "1.5px")
        .attr("stroke", () =>
          data?.length > 2
            ? i === 0
              ? "#437ECE"
              : i === 1
              ? "#FF8F0B"
              : "#28A28C"
            : i === 0
            ? "#437ECE"
            : "#FF8F0B"
        )
        .attr("fill", () =>
          data?.length > 2
            ? i === 0
              ? "#437ECE"
              : i === 1
              ? "#FF8F0B"
              : "#28A28C"
            : i === 0
            ? "#437ECE"
            : "#FF8F0B"
        )
        .attr("opacity", activeTab == i ? 0.5 : 0.1)
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      cord.forEach((point, index) => {
        svg
          .append("circle")
          .attr("cx", point.x + width / 2)
          .attr("cy", point.y + height / 2)
          .attr("r", 5)
          .style(
            "fill",
            data?.length > 2
              ? i === 0
                ? "#437ECE"
                : i === 2
                ? "#FF8F0B"
                : "#28A28C"
              : i === 0
              ? "#437ECE"
              : "#FF8F0B"
          )
          .attr("opacity", activeTab == i ? 0.9 : 0.1)
          .attr("class", "data-point")
          .attr("data-value", point.value)
          .attr("data-attribute", point.attribute)
          .on("mouseover", function (event, d) {
            const value = select(this).attr("data-value");
            const attribute = select(this).attr("data-attribute");
            tooltip
              .style("display", "block")
              .style("opacity", 2)
              .html(`${attribute}: ${Math.round(value)}`)
              .style("background-color", "#437ECE")
              .style("left", event.clientX + "px")
              .style("top", event.clientY + "px")
              .style("color", "#fff");
          })
          .on("mouseout", function () {
            // Remove the tooltip and the value label on mouse leave
            // svg.selectAll(".data-point-label").remove();
            // tooltip.style("display", "none");
            tooltip.style("opacity", 0);
          });
      });
    }
  }, [activeTab]);

  return <svg viewBox={`0 0 ${width} ${height}`}></svg>;
}

export default Radar;
