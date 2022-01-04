import React from "react";
import * as d3 from "d3";

const data = [
  {
    name: "Alerts & Events",
    values: [
      { type: "wifi", time: new Date("Tue Dec 21 2021 10:00:00 GMT+0530") },
      { type: "wifi", time: new Date("Tue Dec 21 2021 20:10:00 GMT+0530") },
      { type: "wifi", time: new Date("Tue Dec 21 2021 08:00:00 GMT+0530") },
      { type: "wifi", time: new Date("Tue Dec 21 2021 08:30:00 GMT+0530") }
    ]
  },
  {
    name: "VPN Connection",
    values: [
      { type: "circle", time: new Date("Tue Dec 21 2021 01:00:00 GMT+0530") },
      { type: "circle", time: new Date("Tue Dec 21 2021 23:00:00 GMT+0530") },
      { type: "circle", time: new Date("Tue Dec 21 2021 18:00:00 GMT+0530") },
      {
        type: "squareWithError",
        time: new Date("Tue Dec 21 2021 23:30:00 GMT+0530")
      }
    ]
  },
  {
    name: "Online",
    values: [
      { type: "online", time: new Date("Tue Dec 21 2021 09:00:00 GMT+0530") },
      { type: "online", time: new Date("Tue Dec 21 2021 09:05:10 GMT+0530") },
      { type: "online", time: new Date("Tue Dec 21 2021 09:10:10 GMT+0530") },
      { type: "online", time: new Date("Tue Dec 21 2021 04:30:00 GMT+0530") }
    ]
  }
];

const getYaxisLabel = data.map((i) => i.name);

const Margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 80
};

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 180;
const innerWidth = SVG_WIDTH - Margin.left - Margin.right;
const innerHeight = SVG_HEIGHT - Margin.top - Margin.bottom;
const StartDate = new Date("Tue Dec 21 2021 00:00:00 GMT+0530");
const EndDate = new Date("Tue Dec 21 2021 23:59:00 GMT+0530");

const formatMillisecond = d3.timeFormat(".%L"),
  formatSecond = d3.timeFormat(":%S"),
  formatMinute = d3.timeFormat("%I:%M"),
  formatHour = d3.timeFormat("%H:%M"),
  formatDay = d3.timeFormat("%a %d"),
  formatWeek = d3.timeFormat("%b %d"),
  formatMonth = d3.timeFormat("%B"),
  formatYear = d3.timeFormat("%Y");

function multiFormat(date) {
  return (d3.timeSecond(date) < date
    ? formatMillisecond
    : d3.timeMinute(date) < date
    ? formatSecond
    : d3.timeHour(date) < date
    ? formatMinute
    : d3.timeDay(date) < date
    ? formatHour
    : d3.timeMonth(date) < date
    ? d3.timeWeek(date) < date
      ? formatDay
      : formatWeek
    : d3.timeYear(date) < date
    ? formatMonth
    : formatYear)(date);
}

const TimelineChart = () => {
  const svgRef = React.useRef(null);
  const yAxis = React.useRef(null);
  const xScale = d3
    .scaleTime()
    .domain([StartDate, EndDate])
    .range([0, innerWidth]);

  const yScale = d3
    .scalePoint()
    .domain(getYaxisLabel)
    .range([0, innerHeight])
    .padding(`0.${getYaxisLabel.length + 4}`);

  React.useEffect(() => {
    const yAxisGenerator = d3.axisLeft().scale(yScale).tickSize(0);
    d3.select(yAxis.current).call(yAxisGenerator);
  }, [yScale]);

  const getIcon = (type, iconXScale, iconYScale) => {
    switch (type) {
      case "wifi":
        return (
          <rect
            fill="red"
            x={iconXScale}
            y={iconYScale}
            width="10"
            height="10"
          />
        );
      case "circle":
        return (
          <circle fill="orange" cx={iconXScale} cy={iconYScale + 4} r="4" />
        );
      case "squareWithError":
        return (
          <g transform={`translate(${iconXScale} ${-iconYScale}`}>
            <rect
              x={0}
              y={iconYScale}
              width="8"
              height="8"
              style={{
                fill: "#CC4643",
                stroke: "#CC4643",
                strokeWidth: 1,
                fillOpacity: 0.2,
                transform: "rotate(0deg)"
              }}
            />
          </g>
        );
      case "online":
        return (
          <rect
            fill="skyblue"
            x={iconXScale}
            y={iconYScale}
            width="2"
            height="10"
          />
        );
      default:
        return (
          <rect
            fill="black"
            x={iconXScale}
            y={iconYScale}
            width="10"
            height="10"
          />
        );
    }
  };

  const plotValues = () => {
    const values = [];
    for (const item of data) {
      for (const metric of item.values) {
        const icon = getIcon(
          metric.type,
          xScale(metric.time),
          yScale(item.name) - 5
        );
        values.push(icon);
      }
    }

    return values;
  };

  return (
    <svg ref={svgRef} width={SVG_WIDTH} height={SVG_HEIGHT}>
      <g transform={`translate(${Margin.left}, ${Margin.right})`}>
        <g ref={yAxis} transform={`translate(0, 0)`}></g>
        <g className="lineAndLabel">
          {xScale
            .nice()
            .ticks(24)
            .map((tickerValue, i) => {
              const strokeColor = i === 0 ? "white" : "#ccc";
              return (
                <g
                  key={tickerValue}
                  transform={`translate(${xScale(tickerValue)}, 0)`}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2={innerHeight}
                    stroke={strokeColor}
                  />
                  {i % 4 === 0 && (
                    <text
                      x="0"
                      y={innerHeight + 10}
                      textAnchor="middle"
                      style={{ fontSize: 12, fill: "#666" }}
                    >
                      {multiFormat(tickerValue)}
                    </text>
                  )}
                </g>
              );
            })}
          <g>
            <line
              x1={-5}
              y1={innerHeight - 5}
              x2={innerWidth}
              y2={innerHeight - 5}
              stroke="#A6A6A6"
            />
          </g>
        </g>
        <g className="values">{plotValues()}</g>
      </g>
    </svg>
  );
};

export default TimelineChart;
