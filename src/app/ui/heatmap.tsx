import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataItem {
  group: string; // Assume these are now dynamic based on the number of cells you need
  variable: string;
  value: string;
}

export default function Heatmap() {
  const svgRef = useRef<SVGSVGElement>(null);
  // Assuming containerSize is the dynamic size of your container
  const [containerSize, setContainerSize] = useState({ width: 800, height: 800 });

  useEffect(() => {
    // Placeholder for the number of cells you want, this would be dynamic in a real scenario
    const numCells = { x: 224, y: 224 }; // For illustration, we'll work with a smaller grid
    const margin = { top: 10, right: 10, bottom: 10, left: 40 };
    const width = containerSize.width - margin.left - margin.right;
    const height = containerSize.height - margin.top - margin.bottom;

    const cellSize = {
      width: width / numCells.x,
      height: height / numCells.y,
    };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Generating a grid of data points (for illustration)
    const data = Array.from({ length: numCells.x * numCells.y }, (_, index) => ({
      group: `Group ${index % numCells.x}`,
      variable: `Var ${Math.floor(index / numCells.y)}`,
      value: String(Math.random() * 100),
    }));

    const myColor = d3
      .scaleLinear<string>()
      .range(['#fde0dd', '#c51b8a']) // Example gradient
      .domain([1, 100]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, i) => (i % numCells.x) * cellSize.width)
      .attr('y', (_, i) => Math.floor(i / numCells.x) * cellSize.height)
      .attr('width', cellSize.width)
      .attr('height', cellSize.height)
      .style('fill', d => myColor(+d.value));

  }, [containerSize]); // Re-run effect if containerSize changes

  return <svg ref={svgRef}></svg>;
}
