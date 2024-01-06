// @flow weak
import React, { useEffect } from "react";
import * as d3 from "d3";
import "./index.css";
function PieChart(props) {
  const { pieSize, svgSize, data, containerId, innerRadius, chartTitle } =
    props;

  const outerRadius = pieSize / 2;
  const center = svgSize / 2;

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    // Remove the old chart
    d3.select(`#${containerId}`).select("svg").remove();

    // Remove the old tooltip
    d3.select(`#${containerId}`).select(".tooltip").remove();

    const margin = {
      top: 20,
      right: 50,
      bottom: 20,
      left: 50,
    };

    const yMinValue = d3.min(data, (d) => d.value);
    const yMaxValue = d3.max(data, (d) => d.value);
    const fixedColors = [
      "#437ECE",
      "#99D1FF",
      "#154B76",
      "#1D9CFF",
      "#96DCF2",
      "#D8E5ED",
      "#E7F4FF",
    ]
    const customColorScale = d3.scaleOrdinal();
    customColorScale.domain(data.map(d => d.label))
    customColorScale.range([...fixedColors,...Array(Math.max(0, data.length - fixedColors.length)).fill().map(() => d3.interpolateSpectral(Math.random()))]);

    const svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", svgSize + margin.left + margin.right)
      .attr("height", svgSize + margin.top + margin.bottom);

    const g = svg.append("g");
    g.attr("class", "sectors").attr(
      "transform",
      `translate(${center + margin.left}, ${center + margin.top})`
    );

    const arcGeneral = d3
      .arc()
      .innerRadius(innerRadius || 0)
      .outerRadius(outerRadius);

    // const arcHover = d3
    //   .arc()
    //   .innerRadius(innerRadius || 0)
    //   .outerRadius(outerRadius + 10);

    const arcHover = d3
      .arc()
      .innerRadius(0)
      .outerRadius(outerRadius + 10);

    const pie = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = g.selectAll("pie").data(pie(data)).enter().append("g");

    // Append tooltip
    const tooltip = d3
      .select(`#${containerId}`)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .attr("transform", `translate(${svgSize / 2}px, ${svgSize / 2}px)`);

    arc
      .append("path")
      .attr("d", arcGeneral)
      .attr("class", "arc")
      .style("fill", (d) => customColorScale(d.data.label))
      .style("stroke", "#ffffff")
      .style("stroke-width", 2)
      .on("mouseover", (e, data) => {
        d3.select(this).transition().duration(300).attr("e", arcHover);
        tooltip.transition().duration(300).style("opacity", 1);
        tooltip
          .html(
            `<div style="height:20px; width:20px;margin-right:6px; border-radius:100%;background-color:${customColorScale(
              data.data.label
            )}"></div><div style="font-size: 14px;
          font-weight: 400;
          color: rgba(39, 48, 78, 0.8);"><span style="margin-right:8px">${
            data.data.value
          }%</span><span>${data.data.label}</span></div>`
          )
          .style("left", e.clientX - 20 + "px")
          .style("top", e.clientY - 50 + "px");
      })
      .on("mouseout", (d, data) => {
        d3.select(this).transition().duration(300).attr("d", arcGeneral);
        tooltip.transition().duration(300).style("opacity", 0);
      });

    //const label = d3.arc().outerRadius(outerRadius).innerRadius(innerRadius);
    // const text = arc
    //   .append("text")
    //   .attr("text-anchor", "middle")
    //   .attr("alignment-baseline", "middle")
    //   .text((d) => d.data.label)
    //   .style("fill", "#ffffff");
    // text.attr("transform", (d) => {
    //   const [x, y] = label.centroid(d);
    //   return `translate(${x}, ${y})`;
    // });
    // const labelsData = [];
    // text.each((d, i, texts) => {
    //   labelsData.push({
    //     el: texts[i],
    //     centroid: label.centroid(d),
    //     startAngle: d.startAngle,
    //     endAngle: d.endAngle,
    //   });
    // });
    const legendMainContainer = d3.select(`#${containerId}`);
    const legendContainer = legendMainContainer
      .append("div")
      .attr("class", "legendBox");

    // const legendItems = legendContainer
    //   .selectAll("div") // Create a selection of <div> elements
    //   .data(data) // Bind data to the selection
    //   .enter()
    //   .append("div")
    //   .attr("class", "legend-item");

    // legendItems
    //   .append("div")
    //   .style("width", "12px") // Customize the width of the colored square
    //   .style("height", "12px") // Customize the height of the colored square
    //   .style("background-color", (d) => customColorScale(d.value));

    const table = legendContainer.append("table");
    const tbody = table.append("tbody");

    // Append the data rows
    const rows = tbody.selectAll("tr").data(data).enter().append("tr");
    const cells = rows
      .selectAll("td")
      .data(function (d) {
        return [customColorScale(d.label), d.value, d.label];
      })
      .enter()
      .append("td")
      .each(function (d, i) {
        if (i == 0) {
          d3.select(this)
            .append("div")
            .attr("class","legend-avatar")
            .style("width", "12px") 
            .style("height", "12px") 
            .style("background-color", d);
        }
        if (i == 1) {
          d3.select(this).append('span').attr("class","legend-text").text((d) => `${d}%`);
        }
        if (i == 2) {
          d3.select(this).append('span').attr("class","legend-text").text((d) => `${d}`);
        }
      });

    // legendItems
    //   .append("span")
    //   .attr("class", "legendItemsDigit")
    //   .text((d) => `${d.value}%`);
    // legendItems.append("span").text((d) => `${d.label}`);
  }

  return (
    <div
      style={{
        "align-items": "center",
        "flex-direction": "column",
        display: "flex",
      }}
    >
      <span className="chartTitle" style={{"margin-bottom":"-15px"}}>{chartTitle}</span>
      <div id={containerId} className="pieChart"></div>
    </div>
  );
}

export default PieChart;
