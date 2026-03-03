import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import storeContext from '../../context';
import { grid } from '@svar-ui/gantt-store';
import { useStore } from '@svar-ui/lib-react';

function CellGrid({ borders = '', rowLayout = null }) {
  const api = useContext(storeContext);
  const cellWidth = useStore(api, 'cellWidth');
  const cellHeight = useStore(api, 'cellHeight');

  const nodeRef = useRef(null);
  const [color, setColor] = useState('#e4e4e4');

  useEffect(() => {
    if (typeof getComputedStyle !== 'undefined' && nodeRef.current) {
      const border = getComputedStyle(nodeRef.current).getPropertyValue(
        '--wx-gantt-border',
      );
      setColor(border ? border.substring(border.indexOf('#')) : '#1d1e261a');
    }
  }, []);

  // When rowLayout is provided (variable row heights), compute horizontal
  // line positions instead of relying on the tiling SVG pattern.
  const rowLines = useMemo(() => {
    if (!rowLayout) return null;
    const lines = [];
    let y = 0;
    for (const row of rowLayout) {
      y += row.height;
      lines.push(y);
    }
    return lines;
  }, [rowLayout]);

  // Uniform grid: single tiling SVG background for both vertical + horizontal lines
  if (!rowLines) {
    const style = {
      width: '100%',
      height: '100%',
      background:
        cellWidth != null && cellHeight != null
          ? `url(${grid(cellWidth, cellHeight, color, borders)})`
          : undefined,
      position: 'absolute',
    };
    return <div ref={nodeRef} style={style} />;
  }

  // Variable row heights: vertical column lines via repeating-linear-gradient,
  // horizontal row lines via absolutely positioned DOM elements.
  const verticalBg = cellWidth
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${cellWidth - 1}px, ${color} ${cellWidth - 1}px, ${color} ${cellWidth}px)`
    : undefined;

  return (
    <div ref={nodeRef} style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <div style={{ width: '100%', height: '100%', background: verticalBg, position: 'absolute' }} />
      {rowLines.map((lineY, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${lineY}px`,
            width: '100%',
            height: '1px',
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

export default CellGrid;
