import React, { useEffect, useRef } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import PieChart from "@/_chart/PieChart";
import { ChartName } from "@/_chart/data/enums/ChartName";
import CorrelationChart from "@/_chart/CorrelationChart";
import VerticalChart from "@/_chart/VerticalChart";
import HorizontalChart from "@/_chart/HorizontalChart";

const GraphReplacer = () => {
  const observer = useRef(null);

  const renderGraphForMatchedShortCodePattern = async (element, shortCode) => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("container-div");
    element.insertAdjacentElement("afterend", parentDiv);

    for (let idx = 0; idx < shortCode?.length; idx++) {
      if (shortCode[idx]?.isMatch && element.nodeType === Node.ELEMENT_NODE) {
        try {
          const response = await axios.get(
            `https://panel.mondopedia.it/api/v1/generate-graph?graph_shortcode=${shortCode[idx].matchedString}`,
            {
              headers: {
                Authorization: `Bearer Jf8r1Xp0rTVbdz4jIOXpkxGEmE3oVc7VlqAGyKCJksKf4SboPfOhrdPy7Wz5W3U2`,
                "Content-Type": "application/json",
              },
            }
          );
          const chartData = response?.data?.data;
          if (chartData && chartData.data && chartData.data.length > 0) {
            const chartTitle = chartData.title ?? "";
            const yAxisUnit = chartData.unitY ?? "";
            const xAxisUnit = chartData.unit ?? "";
            const plotData = await regenerateData(chartData);
            if (plotData && plotData.length > 0) {
              const container = document.createElement("div");
              container.style.padding = "20px";
              container.setAttribute("class", `chart_Append${idx}`);
              parentDiv.insertAdjacentElement("beforeend", container);
              const root = createRoot(container);

              if (shortCode[idx].pattern == ChartName.PieChart) {
                root.render(
                  <PieChart
                    data={plotData}
                    pieSize={150}
                    svgSize={180}
                    innerRadius={0}
                    containerId={`pie${uuidv4()}`}
                    chartTitle={chartTitle}
                    xUnit={xAxisUnit}
                  />
                );
              }
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    // Remove the original shortcode placeholder element
    element.remove();
  };

  const regenerateData = async (chartData) => {
    const dataForChart = [];

    if (
      chartData &&
      chartData.data &&
      chartData.data.length > 0 &&
      chartData.lable &&
      (chartData.product_count || chartData.produt_name)
    ) {
      chartData.data.forEach((val, index) => {
        dataForChart.push({
          label: chartData.lable[index],
          value: val,
        });
        if (chartData.product_count) {
          dataForChart[index]["productCount"] = chartData.product_count[index];
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
          value: val,
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
          value: val,
        });
      });
    } else if (chartData && chartData.data && chartData.data.length > 0) {
      chartData.data.forEach((val) => {
        dataForChart.push({
          label: val,
          value: val,
        });
      });
    }
    return dataForChart;
  };

  const matchShortCodePatternsAgainstText = (str) => {
    const shortCodepatternsRE =
      /\[(pie-chart|vertical-chart|horizontal-chart|correlation-chart);.*\]/;
    const results = [];
    const patternRE = /\[[^\]]*]/g;
    const patterns = str.match(patternRE);

    if (patterns) {
      patterns.forEach((matchedPattern) => {
        const regex = new RegExp(shortCodepatternsRE);
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
  };

  const getTheChartTypeFromShortCodePattern = (shortCodestr) => {
    const semicolonIndex = shortCodestr.indexOf(";");
    let chartType = "";
    if (semicolonIndex !== -1) {
      chartType = shortCodestr.substring(1, semicolonIndex);
    }
    return chartType;
  };

  const getChartTitle = (shortCodestr) => {
    let chartTitle = "";
    let result = shortCodestr.slice(1, -1);
    const stringArray = result.split(";");
    if (stringArray && stringArray.length > 0 && stringArray[1]) {
      chartTitle = stringArray[1];
    }
    return chartTitle;
  };

  useEffect(() => {
    const handleIntersect = async (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const shortCode = element.getAttribute("data-shortcode");
          const matchedShortCode = matchShortCodePatternsAgainstText(shortCode);
          if (matchedShortCode && !element.classList.contains("render-chart")) {
            element.classList.add("render-chart");
            renderGraphForMatchedShortCodePattern(element, matchedShortCode);
            observerInstance.unobserve(element);
          }
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });
    setTimeout(() => {
      const elementsWithNodeType =
        document.querySelectorAll("[data-shortcode]");
      console.log("Observed elements:", elementsWithNodeType);
      elementsWithNodeType.forEach((element) => {
        observer.current.observe(element);
      });
    }, 3000);

    // const elementsWithNodeType1 = document.querySelectorAll(".chart-placeholder");
    // console.log('Observed elements:', elementsWithNodeType1);
    // elementsWithNodeType1.forEach((element) => {
    //   observer.current.observe(element);
    // });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  });

  return null;
};

export default GraphReplacer;
