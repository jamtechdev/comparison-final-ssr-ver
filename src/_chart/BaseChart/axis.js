import React, { forwardRef, useEffect } from "react";
import * as d3 from "d3";
import classnames from "classnames";
import { calculateNextStep } from "../utils/calculateTickStep";
import {tickValues} from '../utils/computTicks'
function drawAxis(config) {
  const {
    margin,
    width,
    height,
    drawXAxis,
    drawYAxis,
    drawXGridlines,
    drawYGridlines,
    xLabel,
    yLabel,
    xUnit,
    yUnit,
    axisClass,
    gridClass,
    data,
    svgRef,
    xScale,
    yScale,
    tick,
    isTextOrientationOblique,
  } = config;
  
  const maxY = d3.max(data.map((d) => Number(d.value)));
  const {nextStepVal:step} =calculateNextStep(maxY,tick)
  const {ticks:yTickValues} =tickValues(0,tick,step)
  yScale.domain([0, yTickValues[yTickValues.length-1]]); //Reset yscal domain
  const svg = d3.select(svgRef.current).select("g");
  if (drawYGridlines) {
    svg
      .append("g")
      .attr("class", classnames(["base__gridlines gridlines__y", gridClass]))
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));
  }

  if (drawXGridlines) {
    const xgridGroups = svg
      .append("g")
      .attr("class", classnames(["base__gridlines gridlines__x", gridClass]))
      //.call(d3.axisLeft(yScale).ticks(tick).tickSize(-width).tickFormat(""));
      .call(
        d3
          .axisLeft(yScale)
          .tickValues(yTickValues)
          .tickSize(-width)
          .tickFormat("")
      );
  }

  if (isTextOrientationOblique) {
    svg
      .append("g")
      .attr(
        "class",
        classnames(["base__axis axis__x moreDigit fontStyle", axisClass])
      )
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(customTickFormatXaxis));
  } else {
    svg
      .append("g")
      .attr("class", classnames(["base__axis axis__x fontStyle", axisClass]))
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(customTickFormatXaxis));
  }

  svg
    .append("g")
    .attr("class", classnames(["base__axis axis__y fontStyle", axisClass]))
    .call(
      d3
        .axisLeft(yScale)
        //.ticks(tick)
        .tickValues(yTickValues)
        // .tickSize(10)
        .tickFormat(customTickFormaYaxis)
    );

  if (xLabel.xAixsLabel)
    svg
      .append("text")
      .attr("class", "base__axis-label axis__x-label axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.top / 2)
      .text(xLabel.xAixsLabel);

  yLabel.yAixsLabel = yLabel.yAixsLabel ? yLabel.yAixsLabel : "%";
  if (yLabel.yAixsLabel)
    svg
      .append("text")
      .attr("class", "base__axis-label axis__y-label axis-label")
      .attr("text-anchor", "middle")
      .attr("x", -margin.left / 2 - 20)
      .attr("y", height / 2)
      //.attr("transform", "rotate(-90)")
      .text(yLabel.yAixsLabel);

  function customTickFormaYaxis(d) {
    return `${d} ${yUnit.yAxisUnit}`;
  }
  function customTickFormatXaxis(d) {
    return `${d} ${xUnit.xAxisUnit}`;
  }
}

export default drawAxis;
