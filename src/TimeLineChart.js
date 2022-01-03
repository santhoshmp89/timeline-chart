import React from "react";
import * as d3 from "d3";

const data = [
  {
    name: "Alerts & Events",
    metrics: [
      { date: new Date("Tue Dec 21 2021 10:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 20:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 08:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 08:30:00 GMT+0530") }
    ]
  },
  {
    name: "VPN Connection",
    metrics: [
      { date: new Date("Tue Dec 21 2021 11:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 23:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 18:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 23:30:00 GMT+0530") }
    ]
  },
  {
    name: "Online",
    metrics: [
      { date: new Date("Tue Dec 21 2021 09:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 01:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 03:00:00 GMT+0530") },
      { date: new Date("Tue Dec 21 2021 04:30:00 GMT+0530") }
    ]
  }
];

const getYaxisLabel = ["Alerts", "VPN Connection", "Online"];

const Margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 80
};
const SVG_WIDTH = 1200;
const SVG_HEIGHT = 300;
const innerWidth = SVG_WIDTH - Margin.left - Margin.right;
const innerHeight = SVG_HEIGHT - Margin.top - Margin.bottom;
const StartDate = new Date("Tue Dec 21 2021 00:00:00 GMT+0530");
const EndDate = new Date("Tue Dec 21 2021 23:59:00 GMT+0530");

const formatMillisecond = d3.timeFormat(".%L"),
  formatSecond = d3.timeFormat(":%S"),
  formatMinute = d3.timeFormat("%I:%M"),
  formatHour = d3.timeFormat("%I:%M"),
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
  // const svgElement = d3.select(svgRef.current);
  const xScale = d3
    .scaleTime()
    .domain([StartDate, EndDate])
    .range([0, innerWidth]);

  const yScale = d3
    .scalePoint()
    .domain(getYaxisLabel)
    .range([0, innerHeight])
    .padding(`0.${getYaxisLabel.length + 1}`);
  console.log(innerHeight);
  React.useEffect(() => {
    const yAxisGenerator = d3
      .axisLeft()
      .scale(yScale)
      .tickPadding([10])
      .tickSizeInner([10])
      .tickSize(0);
    d3.select(yAxis.current).call(yAxisGenerator);
  }, [data]);

  return (
    <svg ref={svgRef} width={SVG_WIDTH} height={SVG_HEIGHT}>
      <g transform={`translate(${Margin.left}, ${Margin.right})`}>
        <g ref={yAxis} transform={`translate(0, 0)`}></g>
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
                    style={{ fontSize: 9 }}
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
            stroke="black"
          />
        </g>
      </g>
    </svg>
  );
};

export default TimelineChart;
