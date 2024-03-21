import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataItem {
  group: string;
  variable: string;
  value: string;
}

export default function Heatmap() {
  const svgRef = useRef<SVGSVGElement>(null);

  const [containerSize, setContainerSize] = useState({
    width: 650,
    height: 650,
  });

  useEffect(() => {
    const numCells = { x: 224, y: 224 };
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    const width = containerSize.width - margin.left - margin.right;
    const height = containerSize.height - margin.top - margin.bottom;

    const cellSize = {
      width: Math.min(width / numCells.x, height / numCells.y),
      height: Math.min(width / numCells.x, height / numCells.y),
    };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const myColor = d3
      .scaleLinear<string>()
      .range(['#f5f0f0', '#f20505'])
      .domain([1, 100]);

    // d3.csv(`/renderTest/data${nextArray}.csv`).then((data) => {
    d3.csv(`/RP Data/gradients.csv`).then((data) => {
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (_, i) => (i % numCells.x) * cellSize.width)
        .attr('y', (_, i) => Math.floor(i / numCells.x) * cellSize.height)
        .attr('width', cellSize.width)
        .attr('height', cellSize.height)
        .style('fill', (d) => myColor(+d.value));
    });
  });

  return <svg ref={svgRef} />;
}
