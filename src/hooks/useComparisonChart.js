import React from "react";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import { graphService } from "../_services/graph.service.js";
import ComparisonPieChart from "../_chart/ComparisonPieChart/index.js";
import ComparisonBarChart from "../_chart/ComparisonVerticalChart/index.js";
import HorizontalChart from "../_chart/HorizontalChart/index.js";
import CorrelationChart from "../_chart/CorrelationChart/index.js";
import ComparisonVerticalChart from "../_chart/ComparisonVerticalChart/index.js";
// import { ChartName } from "../_chart/data/enums/ChartName.js";

const useComparisonChart = (chartData, pageType, slug) => {
  // console.log(chartData);

  const shortCodepatternsRE = chartData;
  // console.log(shortCodepatternsRE?.type);

  useEffect(() => {
    // Function to search for the pattern
    const searchForPattern = async () => {
      const elementsWithNodeType1 =
        document.body.querySelectorAll(".addClassData");
      elementsWithNodeType1.forEach(async (element, index) => {
        const shortCode = element.textContent;
        // console.log(shortCode);
        const shortCodesMatched = chartData?.type;

        // console.log(shortCodesMatched, "checking");
        await renderGraphForMatchedShortCodePattern(
          element,
          shortCodesMatched,
          index,
          chartData
        );
      });
    };
    searchForPattern();
  }, []);
  async function renderGraphForMatchedShortCodePattern(
    element,
    shortCodesMatched,
    index,
    chartData
  ) {
    if (!chartData) {
      const containerDivss = document.getElementsByClassName("container-divs");
      for (let i = 0; i < containerDivss.length; i++) {
        containerDivss[i].remove();
      }
      return;
    } else {
      const parentDiv = document.createElement("div");
      parentDiv.classList.add("container-divs");
      // parentDiv.classList.add("shortcode_table_scroll");
      element.insertAdjacentElement("afterend", parentDiv);

      if (chartData) {
        const xAixsLabel = chartData.x_axis_label ?? "";
        const yAixsLabel = chartData.y_axis_label ?? "";
        const xAxisTitle = chartData.x_title ?? "";
        const yAxisTitle = chartData.y_title ?? "";
        const yAxisUnit = chartData.unitY ?? "";
        const xAxisUnit = chartData.unit ?? "";
        const chartTitle = chartData.title ?? "";
        const pieProductBatch = chartData.products ?? "";
        const isGeneralAttributesOfCorrelationChart_x =
          chartData.is_general_attribute_x ?? false;
        const isGeneralAttributesOfCorrelationChart_y =
          chartData.is_general_attribute_y ?? false;
        const correlation_minX = Number(chartData.rang_min_x) ?? null;
        const correlation_maxX = Number(chartData.rang_max_x) ?? null;
        const correlation_minY = Number(chartData.rang_min_y) ?? null;
        const correlation_maxY = Number(chartData.rang_max_y) ?? null;
        // console.log(chartData);
        const chartDatas = {
          data: [
            { label: "no", value: 66.7 },
            { label: "yes", value: 33.3 },
          ],
          products: [
            { product_name: "Average Title test ", color: "#FF8F0B" },
            { product_name: "DreameBot D9 Max", color: "#437ECE" },
          ],
          type: "pie-chart",
          unitY: "%",
        };
        const plotData = await regenerateData(chartData);

        // console.log(chartDatas?.color, "plotData");

        if (plotData && plotData.length > 0) {
          const container = document.createElement("div");
          container.style.padding = "10px";
          container.setAttribute("class", "chart_Append" + index);
          parentDiv.insertAdjacentElement("beforeend", container);
          const root = createRoot(container);
          const chartAppendElements = document.querySelectorAll(
            ".chart_Append" + index
          );
          const numberOfChartAppends = chartAppendElements.length;
          // console.log(chartData);
          if (numberOfChartAppends == 1) {
            // console.log(chartData?.type);
            if (chartData?.type === "pie-chart") {
              root.render(
                <ComparisonPieChart
                  data={chartData?.data}
                  pieSize={150}
                  svgSize={180}
                  innerRadius={0}
                  containerId={`pie${uuidv4()}`}
                  chartTitle={chartTitle}
                  xUnit={xAxisUnit}
                  pieProductBatch={chartData?.products}
                  // color={chartDatas?.color}
                />
              );
            }
            if (chartData?.type === "vertical-chart") {
              root.render(
                <ComparisonVerticalChart
                  svgProps={{
                    margin: {
                      top: 80,
                      bottom: 80,
                      left: 80,
                      right: 80,
                    },
                    width: 478,
                    height: 180,
                  }}
                  axisProps={{
                    xLabel: { xAixsLabel },
                    yLabel: { yAixsLabel },
                    xUnit: { xAxisUnit },
                    yUnit: { yAxisUnit },
                    drawXGridlines: true,
                    tick: 6,
                    isTextOrientationOblique:
                      plotData[0].label.length > 3 ? true : false,
                  }}
                  chartTitle={chartTitle}
                  pageType={pageType}
                  slug={slug}
                  data={chartData?.data}
                  strokeWidth={4}
                />
              );
            }
          } else {
          }
        }
      }
    }
  }

  async function regenerateData(chartData) {
    const dataForChart = [];

    if (
      chartData &&
      chartData.data &&
      chartData.data.length > 0 &&
      chartData.lable &&
      chartData.selected &&
      chartData.products &&
      (chartData.product_count || chartData.produt_name)
    ) {
      chartData.data.forEach((val, index) => {
        dataForChart.push({
          label: chartData.lable[index],
          value: Number(val),
        });
        if (chartData.product_count) {
          dataForChart[index]["productCount"] = chartData.product_count[index];
        }
        if (chartData.products) {
          dataForChart[index]["products"] = chartData.products[index];
        }
        if (chartData.selected) {
          dataForChart[index]["selected"] = chartData.selected[index];
        }
        if (chartData.produt_name)
          dataForChart[index]["productName"] = chartData.produt_name[index];
      });
    } else if (
      chartData &&
      chartData.data &&
      chartData.data.length > 0 &&
      chartData.lable
    ) {
      chartData.data.forEach((val, index) => {
        dataForChart.push({
          label: chartData.lable[index],
          value: Number(val),
        });
      });
    } else if (
      chartData &&
      chartData.data &&
      chartData.data.length > 0 &&
      chartData.label
    ) {
      chartData.data.forEach((val, index) => {
        dataForChart.push({
          label: chartData.label[index],
          value: Number(val),
        });
      });
    } else if (chartData && chartData.data && chartData.data.length > 0) {
      chartData.data.forEach((val) => {
        dataForChart.push({
          label: val,
          value: Number(val),
        });
      });
    }
    return dataForChart;
  }

  function matchShortCodePatternsAgainstText(str) {
    const results = [];
    const patternRE = /\[[^\]]*]/g;
    const patterns = str.match(patternRE);

    if (patterns && patterns.length > 0) {
      patterns.forEach((matchedPattern) => {
        const regex = new RegExp(shortCodepatternsRE?.type);
        if (regex.test(matchedPattern)) {
          results.push({
            isMatch: true,
            pattern: getTheChartTypeFromShortCodePattern(matchedPattern),
            matchedString: matchedPattern,
            chartTitle: getChartTitle(matchedPattern),
          });
        }
      });
    }
    return results;
  }

  function getTheChartTypeFromShortCodePattern(shortCodestr) {
    const semicolonIndex = shortCodestr.indexOf(";");
    let chartType = "";
    if (semicolonIndex !== -1) {
      chartType = shortCodestr.substring(1, semicolonIndex);
    }
    return chartType;
  }

  function getChartTitle(shortCodestr) {
    let chartTitle = "";
    let result = shortCodestr.slice(1, -1);
    const stringArray = result.split(";");
    if (stringArray && stringArray.length > 0 && stringArray[1]) {
      chartTitle = stringArray[1];
    }
    return chartTitle;
  }
};
export default useComparisonChart;
