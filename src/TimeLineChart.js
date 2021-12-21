import React from "react";
import * as d3 from "d3";

const SVG_WIDTH = 800;
const SVG_HEIGHT = 200;
const StartDate = new Date("Tue Dec 21 2021 00:00:00 GMT+0530");
const EndDate = new Date("Tue Dec 21 2021 23:59:00 GMT+0530");

const TimelineChart = () => {
  const svgRef = React.useRef(null);

  React.useEffect(() => {}, []);

  const xScale = d3
    .scaleTime()
    .domain([StartDate, EndDate])
    .range([0, SVG_WIDTH]);

  const xx = xScale.ticks(12);
  console.log(xx);
  return (
    <svg ref={svgRef} width={SVG_WIDTH} height={SVG_HEIGHT}>
      {xScale.ticks().map((tickerValue) => (
        <line
          x1={xScale(tickerValue)}
          y1="0"
          x2={xScale(tickerValue)}
          y2={SVG_HEIGHT}
          stroke="black"
        />
      ))}
    </svg>
  );
};

export default TimelineChart;
