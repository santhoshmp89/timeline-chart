import React from "react";
import * as d3 from "d3";

const SVG_WIDTH = 800;
const SVG_HEIGHT = 200;
const StartDate = new Date("Tue Dec 21 2021 00:00:00 GMT+0530");
const EndDate = new Date("Tue Dec 21 2021 24:00:00 GMT+0530");
const format = d3.timeFormat("%I %p");
const Margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};

const TimelineChart = () => {
  const svgRef = React.useRef(null);
  const svgElement = d3.select(svgRef.current);
  React.useEffect(() => {}, []);

  const xScale = d3
    .scaleTime()
    .domain([StartDate, EndDate])
    .range([Margin.left, SVG_WIDTH - Margin.right]);

  const xAxisGenerator = d3.axisBottom(xScale);
  svgElement.append("g").call(xAxisGenerator);

  return (
    <svg ref={svgRef} width={SVG_WIDTH} height={SVG_HEIGHT}>
      {xScale.ticks(12).map((tickerValue) => (
        <g key={tickerValue} transform={`translate(${xScale(tickerValue)}, 0)`}>
          <line x1="0" y1="0" x2="0" y2={SVG_HEIGHT} stroke="black" />
          {/* <text x="0" y={SVG_HEIGHT} textAnchor="middle">{format(tickerValue)}</text> */}
        </g>
      ))}
    </svg>
  );
};

export default TimelineChart;
