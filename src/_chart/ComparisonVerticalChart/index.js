import ComparisonBaseChart from "../ComparisonBaseChart";
import classnames from "classnames";
import * as d3 from "d3";

import "./index.scss";

function ComparisonVerticalChart(props) {
  const {
    svgRef,
    data,
    xScale,
    yScale,
    height,
    barClass,
    tooltipRef,
    containerId,
  } = props;
  const toolTip = d3.select(tooltipRef.current);
  const margin = { top: 20, right: 10, bottom: 60, left: 10 };
  const width = 760 - margin.left - margin.right;
  const heights = 450 - margin.top - margin.bottom;
  const svg = d3.select(svgRef.current).select("g");
  // console.log(data, "data");

  // Remove zero after decimal point
  let updatedData = data.map(({ label, ...rest }) => ({
    ...rest,
    label: label.split("-").map(Number).join("-"),
  }));

  // Bar chart Based on selected product
  let fristIndex = -1;
  let secondIndex = -1;
  let thirdIndex = -1;
  let count = 0;

  updatedData.forEach((item, index) => {
    if (item.selected === 1) {
      count++;
      if (count === 1) fristIndex = index;
      if (count === 2) secondIndex = index;
      if (count === 3) thirdIndex = index;
    }
  });
  svg
    .selectAll("bar")
    .data(updatedData)
    .enter()
    .append("rect")
    .attr("class", classnames(["bar-chart__bar rect-hover", barClass]))
    .attr("x", (d) => xScale(d.label))
    .attr("width", xScale.bandwidth())
    .attr("y", (d) => yScale(d.value))
    .attr("height", (d) => height - yScale(d.value))
    .style("fill", (d, i) => {
      if (d.selected === 1 && i === fristIndex) {
        return "#437ECE";
      } else if (d.selected === 1 && i === secondIndex) {
        return "#FF8F0B";
      } else if (d.selected === 1 && i === thirdIndex) {
        return "#28A28C";
      } else {
        return ""; // or any other default color
      }
    })
    .on("mouseover", (e, data) => {
      toolTip.transition().duration(300).style("opacity", 1);
      toolTip
        .html(
          `<div style="font-size: 14px;
      font-weight: 400;
      color: rgba(39, 48, 78, 0.8); cursor: pointer;"><span style="margin-right:8px">${
        data.value
      }% (${data.productCount ? data.productCount : "0"})</span></div>`
        )
        .style("left", e.clientX - 20 + "px")
        .style("top", e.clientY - 50 + "px");
    })

    .on("mouseout", (d, data) => {
      toolTip.transition().duration(300).style("opacity", 0);
    });
  svg
    .selectAll("bar")
    .data(updatedData)
    .enter()
    .append("rect")
    .attr("class", classnames(["bar-chart__bar rect-hover", barClass]))
    .attr("x", (d) => xScale(d.label))
    .attr("width", (d) =>
      d.productCount > 1 ? xScale.bandwidth() / 2 : xScale.bandwidth()
    )
    .attr("y", (d) => yScale(d.value))
    .attr("height", (d) => height - yScale(d.value))
    .style("fill", (d, i) => {
      if (d.selected === 1 && d.productCount == 1) {
        return "rgb(67, 126, 206)";
      } else if (d.selected === 1 && i === fristIndex && d.productCount > 1) {
        return "#FF8F0B";
      } else if (d.selected === 1 && i === secondIndex && d.productCount > 1) {
        return "#437ECE";
      } else if (d.selected === 1 && i === thirdIndex && d.productCount > 1) {
        return "#28A28C";
      } else {
        return "";
      }
    })
    .on("mouseover", (e, data) => {
      toolTip.transition().duration(300).style("opacity", 1);
      toolTip
        .html(
          `<div style="font-size: 14px;
      font-weight: 400;
      color: rgba(39, 48, 78, 0.8);"><span style="margin-right:8px">${
        data.value
      }% (${data.productCount ? data.productCount : "0"})</span></div>`
        )
        .style("left", e.clientX - 20 + "px")
        .style("top", e.clientY - 50 + "px");
    })
    .on("mouseout", (d, data) => {
      toolTip.transition().duration(300).style("opacity", 0);
    });

  // loop data and add product name with color
  const legendMainContainer = d3.select(`.barData`);
  const legendContainer = legendMainContainer
    .append("div")
    .attr("class", "legendBox");

  // remove object were products is undefined
  let filteredData = data.filter((item) => item.products !== undefined);
  const table = legendContainer.append("table");
  const tbody = table.append("tbody");
  const rows = tbody.selectAll("tr").data(filteredData).enter().append("tr");
  let color = ["#437ECE", "#FF8F0B", "black"];
  const cells = rows
    .selectAll("td")
    .data(function (d, i) {
      return [color[i], d.products];
    })
    .enter()
    .append("td")
    .each(function (d, i) {
      if (i == 0) {
        d3.select(this)
          .append("div")
          .attr("class", "legend-avatar barChartProduct")
          .style("width", "12px")
          .style("height", "12px")
          .style("background-color", d);
      }
      if (i == 1) {
        d3.select(this)
          .append("span")
          .attr("class", "legend-text barChartProduct")
          .text((d) => `${d}`);
      }
    });

  // Define margin
  // let circleMargin = 10;
  // data.forEach((d, i) => {
  //   let color = ["#437ECE", "#FF8F0B", "black"];
  //   let fillColor = d.products ? color[i] : "";

  //   if (fillColor) {
  //     svg
  //       .append("circle")
  //       .attr("cx", 20 + 600 / 50 + 479) // Adjusted for margin
  //       .attr("cy", i * 20 + circleMargin) // Adjust the y position based on index
  //       .attr("r", 10)
  //       .style("fill", fillColor)
  //       .style("opacity", "1");
  //   }
  //   svg
  //     .append("text")
  //     .attr("y", i * 20 + circleMargin + 4) // Adjust the y position based on index
  //     .attr("x", 20 + 610 / 2 + 280) // Adjusted for margin
  //     .attr("text-anchor", "end") // Center the text horizontally
  //     .append("tspan")
  //     .html(`<span>${d.products || ""}</span>`) // Display the products or an empty string if undefined
  //     .style("fill", fillColor);
  //   circleMargin = circleMargin + 10;
  // });
}

const extraProps = {
  useScaleBands: { x: true, y: false },
};

export default ComparisonBaseChart(ComparisonVerticalChart, extraProps);
