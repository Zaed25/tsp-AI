import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useTSPStore from '../store/tspStore';

const CityGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { cities, connections, path } = useTSPStore();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    svg.selectAll("*").remove();

    // Draw connections
    connections.forEach((conn) => {
      const source = cities.find(c => c.id === conn.from);
      const target = cities.find(c => c.id === conn.to);
      
      if (source && target) {
        svg.append("line")
          .attr("x1", source.x * width)
          .attr("y1", source.y * height)
          .attr("x2", target.x * width)
          .attr("y2", target.y * height)
          .attr("stroke", path.includes(conn.from) && path.includes(conn.to) ? "#4CAF50" : "#eee")
          .attr("stroke-width", 2);
      }
    });

    // Draw cities
    cities.forEach((city) => {
      const g = svg.append("g")
        .attr("transform", `translate(${city.x * width},${city.y * height})`);

      g.append("circle")
        .attr("r", 8)
        .attr("fill", path.includes(city.id) ? "#4CAF50" : "#1a73e8");

      g.append("text")
        .attr("dy", -10)
        .attr("text-anchor", "middle")
        .text(city.name)
        .attr("fill", "#333");
    });
  }, [cities, connections, path]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[600px] border border-gray-200 rounded-lg"
      viewBox="0 0 800 600"
    />
  );
};

export default CityGraph;