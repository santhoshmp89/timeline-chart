import React from "react";
import * as d3 from "d3";

const Margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 20
};
const SVG_WIDTH = 800;
const SVG_HEIGHT = 300;
const innerWidth = SVG_WIDTH - Margin.left - Margin.right;
const innerHeight = SVG_HEIGHT - Margin.top - Margin.bottom;
const StartDate = new Date("Tue Dec 21 2021 00:00:00 GMT+0530");
const EndDate = new Date("Tue Dec 21 2021 23:59:00 GMT+0530");
const format = d3.timeFormat("%H:%M");

const TimelineChart = () => {
  const svgRef = React.useRef(null);
  // const svgElement = d3.select(svgRef.current);
  React.useEffect(() => {}, []);

  const xScale = d3
    .scaleTime()
    .domain([StartDate, EndDate])
    .range([0, innerWidth]);

  // const xAxisGenerator = d3
  //   .axisBottom()
  //   .scale(xScale)
  //   .ticks(d3.timeHour.every(4));

  // if (svgElement) {
  //   svgElement
  //     .append("g")
  //     .attr("transform", "translate(0, " + SVG_HEIGHT + ")")
  //     .call(xAxisGenerator);
  // }

  return (
    <svg ref={svgRef} width={SVG_WIDTH} height={SVG_HEIGHT}>
      <g transform={`translate(${Margin.left}, ${Margin.right})`}>
        {xScale
          .nice()
          .ticks(24)
          .map((tickerValue) => (
            <g
              key={tickerValue}
              transform={`translate(${xScale(tickerValue)}, 0)`}
            >
              <line x1="0" y1="0" x2="0" y2={innerHeight} stroke="#ccc" />
              <text
                x="0"
                y={innerHeight + 10}
                textAnchor="middle"
                style={{ fontSize: 9 }}
              >
                {format(tickerValue)}
              </text>
            </g>
          ))}
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
