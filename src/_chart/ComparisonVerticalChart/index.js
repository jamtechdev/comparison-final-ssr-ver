import ComparisonBaseChart from "../ComparisonBaseChart";
import classnames from "classnames";
import * as d3 from "d3";

import "./index.scss";

function ComparisonVerticalChart(props) {
  const { svgRef, data, xScale, yScale, height, barClass, tooltipRef } = props;
  const toolTip = d3.select(tooltipRef.current);
  const svg = d3.select(svgRef.current).select("g");

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
    svg
    .selectAll("bar")
    .data(updatedData)
    .enter()
    .append("rect")
    .attr("class", classnames(["bar-chart__bar rect-hover", barClass]))
    .attr("x", (d) => xScale(d.label))
    .attr("width",(d)=> d.productCount > 1  ? xScale.bandwidth()/2 :xScale.bandwidth() )
    .attr("y", (d) => yScale(d.value))
    .attr("height", (d) => height - yScale(d.value))
    .style("fill", (d, i) => {
      if(d.selected === 1 && d.productCount == 1) {
        return "#000";
      }
        else if (d.selected === 1 && i === fristIndex && d.productCount > 1) {
        return "#FF8F0B";
      }
       else if (d.selected === 1 && i === secondIndex && d.productCount > 1) {
        return "#437ECE";
      } else if (d.selected === 1 && i === thirdIndex && d.productCount > 1) {
        return "#28A28C";
      }else{
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
}

const extraProps = {
  useScaleBands: { x: true, y: false },
};

export default ComparisonBaseChart(ComparisonVerticalChart, extraProps);
