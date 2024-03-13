import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function Heatmap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const width = 900 - margin.left - margin.right;
    const height = 900 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const rowData = Array.from(Array(224).keys()).map((el) => `r${el}`);

    const colData = Array.from(Array(224).keys()).map((el) => `c${el}`);

    const x = d3.scaleBand().range([0, width]).domain(rowData).padding(0.01);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleBand().range([height, 0]).domain(colData).padding(0.01);

    svg.append('g').call(d3.axisLeft(y));

    const myColor = d3
      .scaleLinear<string, number>()
      .range(['white', '#69b3a2'])
      .domain([1, 100]);

    d3.csv('/heatmap_data.csv').then((data) => {
      svg
        .selectAll()
        .data(data, (d: any) => d.group + ':' + d.variable)
        .enter()
        .append('rect')
        .attr('x', (d: any) => x(d.group))
        .attr('y', (d: any) => y(d.variable))
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', (d: any) => myColor(+d.value));
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}
