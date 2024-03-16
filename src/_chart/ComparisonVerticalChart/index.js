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
    slug,
  } = props;
  const toolTip = d3.select(tooltipRef.current);
  const margin = { top: 20, right: 10, bottom: 60, left: 10 };
  const width = 500 - margin.left - margin.right;
  const heights = 450 - margin.top - margin.bottom;
  const svg = d3.select(svgRef.current).select("g");
  // console.log(data, "data");

  // Remove zero after decimal point
  // let updatedData = data.map(({ label, ...rest }) => ({
  //   ...rest,
  //   label: label.split("-").map(Number).join("-"),
  // }));

  // console.log(updatedData);
  const slugsExtract = slug.split("-vs-");
  // console.log(slugsExtract);

  let updatedData = [
    {
      value: 40,
      productCount: 2,
      products: "",
      product_url: [""],
      product_id: [0],
      selected: 0,
      label: "0-2",
    },
    {
      value: 0,
      productCount: 0,
      products: "AIRROBO T10+",
      selected: 0,
      label: "2-3",
    },
    {
      value: 0,
      productCount: 0,
      products: "amarey A90+",
      selected: 0,
      label: "3-4",
    },
    {
      value: 0,
      productCount: 0,
      products: undefined,
      selected: 0,
      label: "4-5",
    },
    {
      value: 55,
      productCount: 0,
      product_url: [""],
      product_id: [0],
      selected: 0,

      label: "5-6",
    },
    {
      value: 60,
      productCount: 3,
      products: undefined,
      product_url: ["product2", "product3", "product1"],
      product_id: [2, 1, 3],
      selected: 3,
      label: "6-7",
    },
    {
      value: 0,
      productCount: 0,
      products: undefined,
      selected: 0,
      label: "7-8",
    },
    {
      value: 0,
      productCount: 0,
      products: undefined,
      selected: 0,
      label: "8-9",
    },
    {
      value: 0,
      productCount: 0,
      products: undefined,
      selected: 0,
      label: "9-10",
    },
  ];
  // console.log(slug);
  // console.log(updatedData)

  // Bar chart Valur Based on selected product
  let fristIndex = -1;
  let secondIndex = -1;
  let thirdIndex = -1;
  let count = 0;

  updatedData.forEach((item, index) => {
    if (item.selected === 1) {
      count++;
      // console.log(item);
      // console.log(count, index);
      if (count === 1) fristIndex = index;
      if (count === 2) secondIndex = index;
      if (count === 3) thirdIndex = index;
    }
  });

  // console.log(fristIndex, secondIndex, thirdIndex);
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
      if (d.selected === 1 && d.product_id?.[0] === 1) {
        return "rgb(67, 126, 206)";
      } else if (d.selected === 1 && d.product_id?.[0] === 2) {
        return "#FF8F0B";
      } else if (d.selected === 1 && d.product_id?.[0] === 3) {
        return "#28a28c";
      } else if (d.selected === 2 && d.product_id?.length === 2) {
        return d.product_id[0] === 1
          ? "rgb(67, 126, 206)"
          : d.product_id[0] === 2
          ? "#ff8f0b"
          : "#28a28c";
      } else if (d.selected === 3 && d.product_id?.length === 3) {
        return d.product_id[2] === 1
          ? "rgb(67, 126, 206)"
          : d.product_id[2] === 2
          ? "#ff8f0b"
          : "#28a28c";
      } else {
        return "purple"; // or any other default color
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
      d.selected === 3 ? xScale.bandwidth() / 1.5 : xScale.bandwidth()
    )
    .attr("y", (d) => yScale(d.value))
    .attr("height", (d) => height - yScale(d.value))
    .style("fill", (d, i) => {
      if (d.selected === 1 && d.product_id?.[0] === 1) {
        return "rgb(67, 126, 206)";
      } else if (d.selected === 1 && d.product_id?.[0] === 2) {
        return "#FF8F0B";
      } else if (d.selected === 1 && d.product_id?.[0] === 3) {
        return "#28a28c";
      } else if (d.selected === 2 && d.product_id?.length === 2) {
        return d.product_id[1] === 1
          ? "rgb(67, 126, 206)"
          : d.product_id[1] === 2
          ? "#ff8f0b"
          : "#28a28c";
      } else if (d.selected === 3 && d.product_id?.length === 3) {
        return d.product_id[1] === 1
          ? "rgb(67, 126, 206)"
          : d.product_id[1] === 2
          ? "#ff8f0b"
          : "#28a28c";
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
      d.selected === 2
        ? xScale.bandwidth() / 2
        : d.selected === 3
        ? xScale.bandwidth() / 3
        : xScale.bandwidth()
    )
    .attr("y", (d) => yScale(d.value))
    .attr("height", (d) => height - yScale(d.value))
    .style("fill", (d, i) => {
      console.log(d.product_id);
      if (d.selected === 1 && d.product_id?.[0] === 1) {
        return "rgb(67, 126, 206)";
      } else if (d.selected === 1 && d.product_id?.[0] === 2) {
        return "#FF8F0B";
      } else if (d.selected === 1 && d.product_id?.[0] === 3) {
        return "#28a28c";
      } else if (d.selected === 2 && d.product_id?.length === 2) {
        return d.product_id[0] === 1
          ? "rgb(67, 126, 206)"
          : d.product_id[0] === 2
          ? "#ff8f0b"
          : "#28a28c";
      } else if (d.selected === 3 && d.product_id?.length === 3) {
        return d.product_id[0] === 1
          ? "rgb(67, 126, 206)"
          : d.product_id[0] === 2
          ? "#ff8f0b"
          : "#28a28c";
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

  // loop data and add product name with color
  const legendMainContainer = d3
    .select(`.chart_Append0`)
    .attr("class", "parentBarDiv");

  const legendContainer = legendMainContainer
    .append("div")
    .attr("class", "legendBoxBarChart");

  // remove object were products is undefined
  let filteredData = data.filter((item) => item.products !== undefined);
  const table = legendContainer.append("table");
  const tbody = table.append("tbody");
  const rows = tbody.selectAll("tr").data(filteredData).enter().append("tr");
  let color = ["#437ECE", "#FF8F0B", "rgb(40, 162, 140)"];
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
}

const extraProps = {
  useScaleBands: { x: true, y: false },
};

export default ComparisonBaseChart(ComparisonVerticalChart, extraProps);
