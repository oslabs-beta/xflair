import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { buildLayerTree } from '../lib/layerUtils';

interface props {
  data: string;
}

const CollapsibleTree = ({ data }: props) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const margin = { top: 20, right: 400, bottom: 30, left: 90 };
    const width = 1300 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tree = d3.tree().size([height, width]);

    const processedData = buildLayerTree(
      data.split('\n').filter((layer: string) => layer.trim() !== '')
    );

    // Modify the root node to start with children hidden
    const root = d3.hierarchy(processedData, (d) => d.children);
    root.x0 = height / 2;
    root.y0 = 0;
    if (root.children) {
      root.children.forEach(collapse);
    }

    let d3IdCounter = 0;

    update(root);

    function update(source) {
      const duration = 750;
      const nodes = tree(root).descendants();
      const links = nodes.slice(1);

      // Nodes
      const nodeData = svg
        .selectAll('g.node')
        .data(nodes, (d) => d.id || (d.id = ++d3IdCounter));

      // Remove nodes that are no longer present
      nodeData.exit().remove();

      // Enter any new nodes at the parent's previous position
      const nodeEnter = nodeData
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
        .on('click', click);

      nodeEnter
        .append('circle')
        .attr('r', 1e-6)
        .attr('class', 'fill-white stroke-blue-500 stroke-2');

      nodeEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('x', (d) => (d.children || d._children ? -13 : 13))
        .attr('text-anchor', (d) =>
          d.children || d._children ? 'end' : 'start'
        )
        .attr('class', 'text-base')
        .text((d) => d.data.name)
        .style('fill-opacity', 1e-6);

      // Transition nodes to their new position
      const nodeUpdate = nodeEnter
        .merge(nodeData)
        .transition()
        .duration(duration)
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      nodeUpdate
        .select('circle')
        .attr('r', 10)
        .style('fill', (d) => (d._children ? 'lightsteelblue' : '#fff'));

      nodeUpdate.select('text').style('fill-opacity', 1);

      // Links
      const linkData = svg.selectAll('path.link').data(links, (d) => d.id);

      linkData
        .enter()
        .insert('path', 'g')
        .attr('class', 'link fill-none stroke-gray-300 stroke-width-1.5')
        .attr('d', (d) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      linkData
        .transition()
        .duration(duration)
        .attr('d', (d) => diagonal(d, d.parent));

      // Remove exiting links
      linkData
        .exit()
        .transition()
        .duration(duration)
        .attr('d', (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      // Stash the old positions for transition
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function click(event, d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function diagonal(s, d) {
      return `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;
    }

    return () => {
      // Cleanup D3 elements if needed
      svg.selectAll('*').remove();
    };
  }, [data]);

  return (
    <div style={{ overflowY: 'auto', maxHeight: '800px' }}>
      <svg ref={svgRef} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default CollapsibleTree;
