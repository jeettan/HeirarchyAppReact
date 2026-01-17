import { useEffect, useState, useCallback } from "react";

type ParentChild = {
  parentName: string;
  parentId: number | null;
  childId: number;
};

interface HierarchyArrowsProps {
  parentChild: ParentChild[];
}

type LineData = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export default function HierarchyArrows({ parentChild }: HierarchyArrowsProps) {
  const [lines, setLines] = useState<LineData[]>([]);
  const [svgHeight, setSvgHeight] = useState(
    document.documentElement.scrollHeight
  );

  const getArrowPoints = (
    parentId: number | null,
    childId: number
  ): LineData | null => {
    if (parentId == null) return null;

    const parentEl = document.getElementById(`position-${parentId}`);
    const childEl = document.getElementById(`position-${childId}`);

    if (!parentEl || !childEl) return null;

    const p = parentEl.getBoundingClientRect();
    const c = childEl.getBoundingClientRect();

    const OFFSET_CENTER = 30;
    const OFFSET_Y = 18;

    return {
      x1: p.right + window.scrollX - OFFSET_CENTER,
      y1: p.top + p.height / 2 + window.scrollY + OFFSET_Y,

      x2: c.left + window.scrollX + OFFSET_CENTER,
      y2: c.top + c.height / 2 + window.scrollY - OFFSET_Y,
    };
  };

  const recalcLines = useCallback(() => {
    const nextLines: LineData[] = [];

    parentChild.forEach((rel) => {
      const points = getArrowPoints(rel.parentId, rel.childId);
      if (points) nextLines.push(points);
    });

    setLines(nextLines);
    setSvgHeight(document.documentElement.scrollHeight);
  }, [parentChild]);

  useEffect(() => {
    recalcLines();

    window.addEventListener("resize", recalcLines);
    window.addEventListener("scroll", recalcLines);

    const observer = new ResizeObserver(recalcLines);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", recalcLines);
      window.removeEventListener("scroll", recalcLines);
      observer.disconnect();
    };
  }, [recalcLines]);

  return (
    <svg
      width="100%"
      height={svgHeight}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    >
      <defs>
        <marker
          id="arrow-head"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#8B0000" />
        </marker>
      </defs>

      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#8B0000"
          strokeWidth={2}
          markerEnd="url(#arrow-head)"
        />
      ))}
    </svg>
  );
}
