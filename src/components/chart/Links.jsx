import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import storeContext from '../../context';
import { useStore, useStoreWithCounter } from '@svar-ui/lib-react';
import './Links.css';

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

function parsePoints(pString) {
  const nums = pString.split(',').map(Number);
  const pts = [];
  for (let i = 0; i < nums.length; i += 2) {
    pts.push([nums[i], nums[i + 1]]);
  }
  // Last 3 points are the arrowhead triangle
  return { path: pts.slice(0, -3), arrow: pts.slice(-3) };
}

/** Return only the routing path points (no arrowhead) */
function pathOnlyPoints(pString) {
  const nums = pString.split(',').map(Number);
  // Strip last 6 numbers (3 arrowhead points x 2 coords each)
  const trimmed = nums.slice(0, -6);
  return trimmed.join(',');
}

function pointsToRoundedPath(pString, radius = 8) {
  if (!pString) return '';
  const { path } = parsePoints(pString);
  if (path.length < 2) return '';

  let d = `M${path[0][0]},${path[0][1]}`;

  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    const next = path[i + 1];

    const dx1 = curr[0] - prev[0],
      dy1 = curr[1] - prev[1];
    const dx2 = next[0] - curr[0],
      dy2 = next[1] - curr[1];

    // Collinear — no corner, just line through
    if (dx1 === dx2 && dy1 === dy2) {
      d += ` L${curr[0]},${curr[1]}`;
      continue;
    }

    const len1 = Math.hypot(dx1, dy1);
    const len2 = Math.hypot(dx2, dy2);

    // Zero-length segment (duplicate waypoints) — skip rounding to avoid NaN
    if (len1 === 0 || len2 === 0) {
      d += ` L${curr[0]},${curr[1]}`;
      continue;
    }

    const r = Math.min(radius, len1 / 2, len2 / 2);

    const beforeX = curr[0] - (dx1 / len1) * r;
    const beforeY = curr[1] - (dy1 / len1) * r;
    const afterX = curr[0] + (dx2 / len2) * r;
    const afterY = curr[1] + (dy2 / len2) * r;

    d += ` L${beforeX},${beforeY}`;
    d += ` Q${curr[0]},${curr[1]} ${afterX},${afterY}`;
  }

  d += ` L${path[path.length - 1][0]},${path[path.length - 1][1]}`;
  return d;
}

function pointsToBezierPath(pString, linkType) {
  if (!pString) return { d: '', end: null, cp2: null };
  const { path } = parsePoints(pString);
  if (path.length < 2) return { d: '', end: null, cp2: null };

  const start = path[0];
  const end = path[path.length - 1];

  const dx = end[0] - start[0];
  const dy = end[1] - start[1];

  // Derive direction from link.type semantics:
  //   e prefix -> source exits RIGHT, s prefix -> source exits LEFT
  //   s suffix -> target enters LEFT, e suffix -> target enters RIGHT
  const sourceExitsRight = !linkType || linkType[0] === 'e';
  const targetEntersLeft = !linkType || linkType[2] === 's';

  // Detect "backward" links: the exit direction points AWAY from the target.
  const isBackward =
    (sourceExitsRight && targetEntersLeft && dx < 0) ||
    (!sourceExitsRight && !targetEntersLeft && dx > 0);

  const dist = Math.hypot(dx, dy);
  const absDx = Math.abs(dx);

  let d = `M${start[0]},${start[1]}`;
  let cp2;

  if (isBackward) {
    // For backward links, use reduced horizontal offset + larger vertical
    // offset so the curve departs at ~45° instead of nearly flat.
    const hOff = Math.max(40, Math.min(absDx * 0.3, 160));
    const hOff2 = Math.max(60, Math.min(absDx * 0.4, 200));
    const vOff = Math.max(40, Math.min(absDx * 0.2, 100));
    const absDy = Math.abs(dy);
    const yDir = dy >= 0 ? 1 : -1;

    const cp1x = start[0] + (sourceExitsRight ? hOff : -hOff);
    const cp1y = start[1] + yDir * vOff;
    const cp2x = end[0] + (targetEntersLeft ? -hOff2 : hOff2);
    // Offset cp2y so the curve approaches from above/below rather than
    // arriving perfectly horizontal. Scale with vertical distance.
    const cp2yOff = Math.max(20, Math.min(absDy * 0.5, 80));
    const cp2y = end[1] - yDir * cp2yOff;
    cp2 = [cp2x, cp2y];

    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${end[0]},${end[1]}`;
  } else {
    const offset = Math.max(40, Math.min(dist * 0.5, 150));
    const cp1x = start[0] + (sourceExitsRight ? offset : -offset);
    const cp2x = end[0] + (targetEntersLeft ? -offset : offset);
    cp2 = [cp2x, end[1]];

    d += ` C${cp1x},${start[1]} ${cp2x},${end[1]} ${end[0]},${end[1]}`;
  }

  return { d, end, cp2 };
}

/** Compute arrowhead triangle aligned to the bezier tangent at the endpoint. */
function bezierArrowhead(end, cp2, size = 5) {
  // Tangent at t=1 of cubic bezier is proportional to (end - cp2)
  const tx = end[0] - cp2[0];
  const ty = end[1] - cp2[1];
  const len = Math.hypot(tx, ty);
  if (len === 0) return null;
  // Unit tangent and perpendicular
  const ux = tx / len;
  const uy = ty / len;
  const px = -uy;
  const py = ux;
  // Triangle: tip at endpoint, base 10px back along tangent
  const tipX = end[0];
  const tipY = end[1];
  const baseX = end[0] - ux * 10;
  const baseY = end[1] - uy * 10;
  return `${baseX - px * size},${baseY - py * size} ${tipX},${tipY} ${baseX + px * size},${baseY + py * size}`;
}

function toPathD(pString, linkShape, linkType) {
  if (linkShape === 'bezier') {
    const result = pointsToBezierPath(pString, linkType);
    return result.d;
  }
  return pointsToRoundedPath(pString);
}

function toBezierArrow(pString, linkType) {
  const { end, cp2 } = pointsToBezierPath(pString, linkType);
  if (!end || !cp2) return null;
  return bezierArrowhead(end, cp2);
}

// ---------------------------------------------------------------------------
// Link bundling / overlap reduction (Phase 6)
// ---------------------------------------------------------------------------

const BUCKET_TOLERANCE = 5;
const NUDGE_SPACING = 4;

function nudgeLinks(links) {
  if (!links || !links.length) return links;

  // Parse all link point arrays
  const parsed = links.map((link) => {
    if (!link.$p) return null;
    const { path } = parsePoints(link.$p);
    return path;
  });

  // Extract horizontal and vertical segments
  const hBuckets = new Map(); // rounded Y -> [{linkIdx, segIdx, min, max}]
  const vBuckets = new Map(); // rounded X -> [{linkIdx, segIdx, min, max}]

  parsed.forEach((pts, linkIdx) => {
    if (!pts || pts.length < 2) return;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[i + 1];

      if (Math.abs(y1 - y2) < 1) {
        // Horizontal segment
        const bucketKey =
          Math.round((y1 + y2) / 2 / BUCKET_TOLERANCE) * BUCKET_TOLERANCE;
        if (!hBuckets.has(bucketKey)) hBuckets.set(bucketKey, []);
        hBuckets.get(bucketKey).push({
          linkIdx,
          segIdx: i,
          min: Math.min(x1, x2),
          max: Math.max(x1, x2),
          y: (y1 + y2) / 2,
        });
      } else if (Math.abs(x1 - x2) < 1) {
        // Vertical segment
        const bucketKey =
          Math.round((x1 + x2) / 2 / BUCKET_TOLERANCE) * BUCKET_TOLERANCE;
        if (!vBuckets.has(bucketKey)) vBuckets.set(bucketKey, []);
        vBuckets.get(bucketKey).push({
          linkIdx,
          segIdx: i,
          min: Math.min(y1, y2),
          max: Math.max(y1, y2),
          x: (x1 + x2) / 2,
        });
      }
    }
  });

  // Clone parsed points for mutation
  const nudged = parsed.map((pts) => (pts ? pts.map((p) => [...p]) : null));

  // Nudge overlapping vertical segments
  for (const segs of vBuckets.values()) {
    if (segs.length < 2) continue;
    // Find groups that overlap in the perpendicular (Y) range
    const overlapping = [];
    for (let i = 0; i < segs.length; i++) {
      for (let j = i + 1; j < segs.length; j++) {
        if (segs[i].min < segs[j].max && segs[i].max > segs[j].min) {
          // They overlap
          if (!overlapping.includes(segs[i])) overlapping.push(segs[i]);
          if (!overlapping.includes(segs[j])) overlapping.push(segs[j]);
        }
      }
    }
    if (overlapping.length < 2) continue;
    const n = overlapping.length;
    overlapping.forEach((seg, idx) => {
      const offset = (idx - (n - 1) / 2) * NUDGE_SPACING;
      const pts = nudged[seg.linkIdx];
      if (!pts) return;
      pts[seg.segIdx][0] += offset;
      pts[seg.segIdx + 1][0] += offset;
    });
  }

  // Nudge overlapping horizontal segments
  for (const segs of hBuckets.values()) {
    if (segs.length < 2) continue;
    const overlapping = [];
    for (let i = 0; i < segs.length; i++) {
      for (let j = i + 1; j < segs.length; j++) {
        if (segs[i].min < segs[j].max && segs[i].max > segs[j].min) {
          if (!overlapping.includes(segs[i])) overlapping.push(segs[i]);
          if (!overlapping.includes(segs[j])) overlapping.push(segs[j]);
        }
      }
    }
    if (overlapping.length < 2) continue;
    const n = overlapping.length;
    overlapping.forEach((seg, idx) => {
      const offset = (idx - (n - 1) / 2) * NUDGE_SPACING;
      const pts = nudged[seg.linkIdx];
      if (!pts) return;
      pts[seg.segIdx][1] += offset;
      pts[seg.segIdx + 1][1] += offset;
    });
  }

  // Reconstruct $p strings from nudged points (keep original arrowhead)
  return links.map((link, i) => {
    const pts = nudged[i];
    if (!pts || !link.$p) return link;

    const nums = link.$p.split(',').map(Number);
    // Last 6 numbers are the 3 arrowhead points
    const arrowNums = nums.slice(-6);
    const newNums = [];
    for (const pt of pts) {
      newNums.push(pt[0], pt[1]);
    }
    return { ...link, $p: [...newNums, ...arrowNums].join(',') };
  });
}

// ---------------------------------------------------------------------------
// Gradient helpers (Phase 3)
// ---------------------------------------------------------------------------

function resolveTaskColor(task, typeColorsRef) {
  if (!task) return null;
  // Priority: explicit task.color -> CSS var by type -> null (fallback)
  if (task.color) return task.color;
  const colors = typeColorsRef.current;
  if (!colors) return null;
  if (task.type === 'summary') return colors.summary || null;
  if (task.type === 'milestone') return colors.milestone || null;
  return colors.task || null;
}

// ---------------------------------------------------------------------------
// Dash style helpers (Phase 4)
// ---------------------------------------------------------------------------

function getDashArray(linkStyle, link) {
  const style = link?.style || linkStyle;
  if (style === 'dashed') return '8 4';
  if (style === 'dotted') return '2 4';
  return undefined;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Links({
  onSelectLink,
  selectedLink,
  readonly,
  linkShape,
  linkGradient,
  linkStyle,
  linkBundling,
  multiTaskRows,
  taskPositions,
  cellHeight,
}) {
  const api = useContext(storeContext);
  const [rawLinks, linksCounter] = useStoreWithCounter(api, '_links');
  const [criticalPath] = useStoreWithCounter(api, 'criticalPath');
  const rTasks = useStore(api, '_tasks');
  const usePath = linkShape && linkShape !== 'squared';

  const selectedLineRef = useRef(null);
  const svgRef = useRef(null);
  const typeColorsRef = useRef(null);
  const prevLinkIdsRef = useRef(new Set());

  // Read CSS variable colors once for gradient feature
  useEffect(() => {
    if (!linkGradient || !svgRef.current) return;
    const style = getComputedStyle(svgRef.current);
    typeColorsRef.current = {
      task: style.getPropertyValue('--wx-gantt-task-color').trim() || null,
      summary:
        style.getPropertyValue('--wx-gantt-summary-color').trim() || null,
      milestone:
        style.getPropertyValue('--wx-gantt-milestone-color').trim() || null,
      link: style.getPropertyValue('--wx-gantt-link-color').trim() || '#888',
    };
  }, [linkGradient]);

  // Reroute links for collapsed groups (Option A).
  // When a task is inside a collapsed group, its link endpoints vanish ($p is empty).
  // Walk up the .parent chain to find the nearest visible ancestor (summary bar)
  // and generate a synthetic $p so the link renders to/from that ancestor.
  const collapsedReroutedLinks = useMemo(() => {
    if (!rawLinks?.length || !rTasks?.length) return rawLinks;

    const visibleIds = new Set(rTasks.map((t) => t.id));
    const visibleById = new Map(rTasks.map((t) => [t.id, t]));

    // Check if any link has a non-visible endpoint
    let hasCollapsed = false;
    for (const link of rawLinks) {
      if (!visibleIds.has(link.source) || !visibleIds.has(link.target)) {
        hasCollapsed = true;
        break;
      }
    }
    if (!hasCollapsed) return rawLinks;

    // Find nearest visible ancestor by walking up .parent
    function findVisibleAncestor(taskId) {
      let task = api.getTask(taskId);
      while (task) {
        if (visibleIds.has(task.id)) return visibleById.get(task.id);
        if (!task.parent) return null;
        task = api.getTask(task.parent);
      }
      return null;
    }

    // Generate a synthetic $p string for a link between two visible tasks.
    // Format: path waypoints (x,y pairs) + 3 arrowhead points (6 numbers).
    function syntheticPath(sourceTask, targetTask, linkType) {
      const sExitsRight = !linkType || linkType[0] === 'e';
      const tEntersLeft = !linkType || linkType[2] === 's';

      const sH = sourceTask.$h || cellHeight;
      const tH = targetTask.$h || cellHeight;
      const sx = sExitsRight ? sourceTask.$x + sourceTask.$w : sourceTask.$x;
      const sy = sourceTask.$y + sH / 2;
      const tx = tEntersLeft ? targetTask.$x : targetTask.$x + targetTask.$w;
      const ty = targetTask.$y + tH / 2;

      // Arrowhead triangle pointing in the entry direction
      const arrowSize = 5;
      const arrowDir = tEntersLeft ? -1 : 1;
      const a1x = tx + arrowDir * (-10);
      const a1y = ty - arrowSize;
      const a2x = tx;
      const a2y = ty;
      const a3x = tx + arrowDir * (-10);
      const a3y = ty + arrowSize;

      // Simple 2-point path (source → target) + arrowhead
      return [sx, sy, tx, ty, a1x, a1y, a2x, a2y, a3x, a3y].join(',');
    }

    return rawLinks.map((link) => {
      const srcVisible = visibleIds.has(link.source);
      const tgtVisible = visibleIds.has(link.target);

      // Both visible — keep original
      if (srcVisible && tgtVisible) return link;

      // Find visible ancestors for collapsed endpoints
      const srcTask = srcVisible
        ? visibleById.get(link.source)
        : findVisibleAncestor(link.source);
      const tgtTask = tgtVisible
        ? visibleById.get(link.target)
        : findVisibleAncestor(link.target);

      // Can't find a visible ancestor — skip this link
      if (!srcTask || !tgtTask) return link;
      // Both rerouted to the same ancestor — skip (self-link)
      if (srcTask.id === tgtTask.id) return link;

      const $p = syntheticPath(srcTask, tgtTask, link.type);
      return { ...link, $p, _rerouted: true };
    });
  }, [rawLinks, linksCounter, rTasks, api, cellHeight]);

  // Correct link.$p Y-coordinates for multiTaskRows.
  // The store computes $p based on tree-position (each task on its own row of
  // uniform cellHeight). With multiTaskRows, Bars.jsx repositions each bar to
  // its actual lane within a grouped row. We use those final bar positions
  // (taskPositions) to compute the Y-delta for each task and shift link paths.
  const yAdjustedLinks = useMemo(() => {
    if (!multiTaskRows || !taskPositions || !rTasks?.length || !collapsedReroutedLinks?.length || !cellHeight)
      return collapsedReroutedLinks;

    // Build task-id → Y-delta: actual bar center vs store-computed center
    const taskYDelta = new Map();
    let hasAnyDelta = false;

    rTasks.forEach((task) => {
      const pos = taskPositions.get(task.id);
      if (!pos) return;
      // Store computes link endpoints at task.$y + cellHeight/2
      const storeCenter = task.$y + cellHeight / 2;
      // Actual bar center from Bars.jsx positioning
      const actualCenter = pos.y + pos.h / 2;
      const delta = actualCenter - storeCenter;
      if (Math.abs(delta) > 0.5) hasAnyDelta = true;
      taskYDelta.set(task.id, delta);
    });

    if (!hasAnyDelta) return collapsedReroutedLinks;

    // Build sorted bands for nearest-Y lookup on intermediate waypoints
    const taskBands = [];
    rTasks.forEach((task) => {
      const d = taskYDelta.get(task.id);
      if (d !== undefined) {
        taskBands.push({ storeCenter: task.$y + cellHeight / 2, delta: d });
      }
    });
    taskBands.sort((a, b) => a.storeCenter - b.storeCenter);

    function getDeltaForY(y) {
      let best = 0;
      let bestDist = Infinity;
      for (const band of taskBands) {
        const dist = Math.abs(y - band.storeCenter);
        if (dist < bestDist) { bestDist = dist; best = band.delta; }
      }
      return best;
    }

    return collapsedReroutedLinks.map((link) => {
      if (!link.$p) return link;

      const sourceDelta = taskYDelta.get(link.source) ?? 0;
      const targetDelta = taskYDelta.get(link.target) ?? 0;
      if (Math.abs(sourceDelta) < 0.5 && Math.abs(targetDelta) < 0.5)
        return link;

      const nums = link.$p.split(',').map(Number);
      const adjusted = [...nums];
      const pathLen = nums.length - 6;

      // First two Y coords belong to source task
      if (pathLen >= 2) adjusted[1] += sourceDelta;
      // Last two path Y coords (before arrowhead) belong to target task
      if (pathLen >= 4) adjusted[pathLen - 1] += targetDelta;
      // Intermediate waypoints: use nearest-band lookup
      for (let i = 2; i < pathLen - 2; i += 2) {
        adjusted[i + 1] += getDeltaForY(nums[i + 1]);
      }
      // Arrowhead points: shift by target delta
      for (let i = pathLen; i < nums.length; i += 2) {
        adjusted[i + 1] += targetDelta;
      }

      return { ...link, $p: adjusted.join(',') };
    });
  }, [collapsedReroutedLinks, linksCounter, multiTaskRows, taskPositions, rTasks, cellHeight]);

  // Apply link bundling (Phase 6)
  const links = useMemo(() => {
    if (!linkBundling || !yAdjustedLinks?.length) return yAdjustedLinks;
    return nudgeLinks(yAdjustedLinks);
  }, [yAdjustedLinks, linksCounter, linkBundling]);

  // Track new links for draw-in animation (Phase 5)
  const newLinkIds = useMemo(() => {
    const prev = prevLinkIdsRef.current;
    const ids = new Set();
    if (links) {
      for (const link of links) {
        if (!prev.has(link.id)) ids.add(link.id);
      }
    }
    return ids;
  }, [links, linksCounter]);

  useEffect(() => {
    if (links) {
      prevLinkIdsRef.current = new Set(links.map((l) => l.id));
    }
  }, [links, linksCounter]);

  const onClickOutside = useCallback(
    (event) => {
      const css = event?.target?.classList;
      if (
        !css?.contains('wx-line') &&
        !css?.contains('wx-line-hitarea') &&
        !css?.contains('wx-delete-button')
      ) {
        onSelectLink(null);
      }
    },
    [onSelectLink],
  );

  useEffect(() => {
    if (!readonly && selectedLink && selectedLineRef.current) {
      const handler = (event) => {
        if (
          selectedLineRef.current &&
          !selectedLineRef.current.contains(event.target)
        ) {
          onClickOutside(event);
        }
      };
      document.addEventListener('click', handler);
      return () => {
        document.removeEventListener('click', handler);
      };
    }
  }, [readonly, selectedLink, onClickOutside]);

  // Build gradient defs
  const gradientDefs = useMemo(() => {
    if (!linkGradient || !links?.length) return null;

    const defs = [];
    for (const link of links) {
      if (!link.$p) continue;
      const isCritical = criticalPath && link.$critical;
      if (isCritical) continue; // Critical links use solid color

      const sourceTask = api.getTask(link.source);
      const targetTask = api.getTask(link.target);
      const sourceColor =
        resolveTaskColor(sourceTask, typeColorsRef) ||
        typeColorsRef.current?.link ||
        '#888';
      const targetColor =
        resolveTaskColor(targetTask, typeColorsRef) ||
        typeColorsRef.current?.link ||
        '#888';

      const { path } = parsePoints(link.$p);
      if (path.length < 2) continue;
      const start = path[0];
      const end = path[path.length - 1];

      // Progress-based stop: source color solid up to progress%, then blend
      const progress = sourceTask?.progress ?? 0;
      const progressStop = Math.min(100, Math.max(0, progress));

      defs.push(
        <linearGradient
          key={`grad-${link.id}`}
          id={`wx-link-grad-${link.id}`}
          gradientUnits="userSpaceOnUse"
          x1={start[0]}
          y1={start[1]}
          x2={end[0]}
          y2={end[1]}
        >
          <stop offset="0%" stopColor={sourceColor} />
          {progressStop > 0 && (
            <stop offset={`${progressStop}%`} stopColor={sourceColor} />
          )}
          <stop offset="100%" stopColor={targetColor} />
        </linearGradient>,
      );
    }

    return defs;
  }, [links, linksCounter, linkGradient, criticalPath, api]);

  // Render a single link as hit area + visible line pair
  const renderLink = (link, isSelected) => {
    const isCritical = criticalPath && link.$critical;
    const isNew = newLinkIds.has(link.id);
    const dashArray = link._rerouted ? '6 3' : getDashArray(linkStyle, link);
    const useAnimation = isNew && !isSelected;
    const isBezierLink = linkShape === 'bezier';

    const baseClass =
      'wx-dkx3NwEn wx-line' +
      (isCritical ? ' wx-critical' : '') +
      (!readonly && !isSelected ? ' wx-line-selectable' : '') +
      (isSelected ? ' wx-line-selected wx-line-selectable wx-delete-link' : '');

    const visibleClass =
      baseClass +
      ' wx-line-visible' +
      (useAnimation ? (dashArray ? ' wx-line-new-fade' : ' wx-line-new') : '');

    const hitareaClass = 'wx-dkx3NwEn wx-line-hitarea';

    // Determine stroke for gradient
    let stroke = undefined;
    let markerEnd = isCritical
      ? 'url(#wx-arrow-critical)'
      : isSelected
        ? 'url(#wx-arrow-selected)'
        : 'url(#wx-arrow-default)';

    if (linkGradient && !isCritical && !isSelected && link.$p) {
      stroke = `url(#wx-link-grad-${link.id})`;
      markerEnd = `url(#wx-arrow-grad-${link.id})`;
    }

    if (usePath) {
      const d = toPathD(link.$p, linkShape, link.type);

      // For bezier, draw arrowhead as explicit filled polygon so it covers
      // the curve stroke cleanly (SVG markers can't mask the underlying path).
      if (isBezierLink && link.$p) {
        const arrowPoints = toBezierArrow(link.$p, link.type) ||
          parsePoints(link.$p).arrow.map((p) => p.join(',')).join(' ');

        // Determine arrow fill
        let arrowFill;
        if (isSelected) {
          arrowFill = 'var(--wx-color-danger)';
        } else if (isCritical) {
          arrowFill = 'var(--wx-gantt-link-critical-color)';
        } else if (linkGradient && link.$p) {
          const targetTask = api.getTask(link.target);
          arrowFill =
            resolveTaskColor(targetTask, typeColorsRef) ||
            typeColorsRef.current?.link ||
            'var(--wx-gantt-link-color)';
        } else {
          arrowFill = 'var(--wx-gantt-link-color)';
        }

        return (
          <Fragment key={link.id}>
            <path
              className={hitareaClass}
              d={d}
              onClick={() => !readonly && !isSelected && onSelectLink(link.id)}
              data-link-id={link.id}
            />
            <path
              ref={isSelected ? selectedLineRef : undefined}
              className={visibleClass}
              d={d}
              stroke={stroke}
              strokeDasharray={dashArray}
              data-link-id={link.id}
            />
            <polygon
              points={arrowPoints}
              fill={arrowFill}
              className={
                'wx-dkx3NwEn wx-bezier-arrow' +
                (isSelected ? ' wx-bezier-arrow-selected' : '')
              }
            />
          </Fragment>
        );
      }

      return (
        <Fragment key={link.id}>
          <path
            className={hitareaClass}
            d={d}
            onClick={() => !readonly && !isSelected && onSelectLink(link.id)}
            data-link-id={link.id}
          />
          <path
            ref={isSelected ? selectedLineRef : undefined}
            className={visibleClass}
            d={d}
            stroke={stroke}
            strokeDasharray={dashArray}
            markerEnd={markerEnd}
            data-link-id={link.id}
          />
        </Fragment>
      );
    }

    // Squared mode: polyline for hit area, polyline for visible
    const trimmedPoints = pathOnlyPoints(link.$p);
    return (
      <Fragment key={link.id}>
        <polyline
          className={hitareaClass}
          points={trimmedPoints}
          onClick={() => !readonly && !isSelected && onSelectLink(link.id)}
          data-link-id={link.id}
        />
        <polyline
          ref={isSelected ? selectedLineRef : undefined}
          className={visibleClass}
          points={trimmedPoints}
          stroke={stroke}
          strokeDasharray={dashArray}
          markerEnd={markerEnd}
          data-link-id={link.id}
        />
      </Fragment>
    );
  };

  // Per-link arrow markers for gradient mode (used by rounded/squared, not bezier)
  const gradientArrowDefs = useMemo(() => {
    if (!linkGradient || !links?.length) return null;

    const markers = [];
    for (const link of links) {
      if (!link.$p) continue;
      const isCritical = criticalPath && link.$critical;
      if (isCritical) continue;

      const targetTask = api.getTask(link.target);
      const targetColor =
        resolveTaskColor(targetTask, typeColorsRef) ||
        typeColorsRef.current?.link ||
        '#888';

      markers.push(
        <marker
          key={`arrow-grad-${link.id}`}
          id={`wx-arrow-grad-${link.id}`}
          markerWidth="10"
          markerHeight="8"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon points="0,0 10,4 0,8" fill={targetColor} />
        </marker>,
      );
    }

    return markers;
  }, [links, linksCounter, linkGradient, criticalPath, api]);

  return (
    <svg className="wx-dkx3NwEn wx-links" ref={svgRef}>
      <defs>
        {/* Standard arrow markers for each state */}
        <marker
          id="wx-arrow-default"
          markerWidth="10"
          markerHeight="8"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon points="0,0 10,4 0,8" className="wx-arrow-fill" />
        </marker>
        <marker
          id="wx-arrow-critical"
          markerWidth="10"
          markerHeight="8"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon points="0,0 10,4 0,8" className="wx-arrow-fill-critical" />
        </marker>
        <marker
          id="wx-arrow-selected"
          markerWidth="10"
          markerHeight="8"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon points="0,0 10,4 0,8" className="wx-arrow-fill-selected" />
        </marker>
        <marker
          id="wx-arrow-hovered"
          markerWidth="10"
          markerHeight="8"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon points="0,0 10,4 0,8" className="wx-arrow-fill-hovered" />
        </marker>

        {/* Gradient defs */}
        {gradientDefs}
        {gradientArrowDefs}
      </defs>

      {(links || []).map((link) => renderLink(link, false))}

      {!readonly && selectedLink && renderLink(selectedLink, true)}
    </svg>
  );
}
