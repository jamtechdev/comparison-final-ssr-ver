import { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./index.css";

function HorizontalChart(props) {
  const { data, height, width, chartTitle,xUnit,yUnit,rectBarWidth,rectBarPadding } = props;
  const svgContainer = useRef();
  const colors = [
    "#658fde",
    "#6d9dec",
    "#7caaef",
    "#8eb9f1",
    "#abcdf6",
    "#c9e0fa",
  ];
  const margin = { top: 20, right: 30, bottom: 20, left: 120 };
  
  const newWidth = width - margin.left - margin.right;
  const newHeight = calculateHeight(height,rectBarWidth,rectBarPadding,data.length);
  const barpadding = (rectBarPadding/(rectBarWidth+rectBarPadding)) ?? 0.5

  // const minValue = d3.min(data, (d) => d.label);
  // const maxValue = d3.max(data, (d) => d.label);
  const minValue = d3.min(data, (d) => d.value);
  const maxValue = d3.max(data, (d) => d.value);

const opacities =  uniformallyDistributeBaropacity(data.length).reverse()

  useEffect(() => {
    drawChart();
  }, [data]);
  function drawChart() {
    // const customColorScale = d3.scaleOrdinal();
    // customColorScale.range(colors);

    d3.select(svgContainer.current).select("svg").remove();

    const svg = d3
      .select(svgContainer.current)
      .append("svg")
      .attr("width", newWidth + margin.left + margin.right)
      .attr("height", newHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //setting scaling

    const xScale = d3.scaleLinear().domain([0, maxValue]).range([0, newWidth]);
    svg
      .append("g")
      .attr("transform", "translate(0," + newHeight + ")")
      // .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const yScale = d3
      .scaleBand()
      .range([0, newHeight])
      .domain(
        data.map(function (d) {
          return d.label;
        })
      )
      .padding(barpadding);

    svg
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(formateYaxisLabel)
          .tickSizeOuter(0)
          .tickSizeInner(0)
      )
      .attr("class","y-axis-tick");

    svg
      .selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", (d) => yScale(d.label))
      .attr("width", (d) => xScale(d.value) - 20)
      .attr("height", yScale.bandwidth())
      .attr("fill", "#4B90E1")
      .attr("class", "rect-size")
      .style("opacity", (d,i) => {
        return opacities[i]/100;
      });

    svg
      .selectAll(".span-label")
      .data(data)
      .enter()
      .append("text").
      attr("class",'bar-label')
      .attr("x", function (d, i) {
        return xScale(d.value); // Adjust horizontal positioning
      })
      .attr("y", function (d) {
        return yScale(d.label) + yScale.bandwidth() / 2; // Adjust vertical positioning
      })
      .text(function (d) {
        return `${d.value} ${xUnit}`;
      });

    svg.select("path").style("display", "none");
  }
  function formateYaxisLabel(d, i) {
    return `${i + 1}. ${d}`;
  }
  function uniformallyDistributeBaropacity(totalLength){
    const startValue = 20;
    const endValue = 100;
    const fixedValues = 2; 
    
    const totalValues = totalLength+fixedValues; 
    const intervalCount = totalValues - fixedValues;
    const intervalSize = (endValue - startValue) / (intervalCount - 1);
    let values = [];
    values.push(startValue);
    for (let i = 1; i < intervalCount - 1; i++) {
        // Calculate the uniformly divided values
        const val = startValue + i * intervalSize;
        values.push(val);
    }
    values.push(endValue);
    return values
   
  }
  function calculateHeight(actualHeight,width,padding,totalRectBar){
    let newHeight=actualHeight
    console.log(typeof(width),'--',typeof(padding))
    if(totalRectBar>0){
      newHeight = Number(totalRectBar)*(Number(width)+Number(padding))
    }
    console.log(newHeight,'--',totalRectBar)
    return newHeight

  }
  return (
    <div
      style={{
        "align-items": "center",
        "flex-direction": "column",
        display: "flex",
      }}
    >
      <span  style={{ "max-width": width, "text-align": "center","margin-bottom": "-10px" }} className="chartTitle">{chartTitle}</span>
      <div ref={svgContainer}></div>
    </div>
  );
}
export default HorizontalChart;
