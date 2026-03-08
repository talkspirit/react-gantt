/**
 * Shared lane-packing utilities for multiTaskRows mode.
 *
 * These pure functions are used by Layout.jsx to compute automatic row heights.
 * Lane packing uses task date ranges for overlap detection (not pixel positions)
 * so it works reliably on the first render before SVAR computes $x/$w.
 */

/**
 * Check if two ranges overlap.
 */
export const rangesOverlap = (start1, end1, start2, end2) => {
  return start1 < end2 && end1 > start2;
};

/**
 * Get the start/end timestamps for a task.
 * Handles both { start, end } and { start, duration } formats.
 */
function getTaskRange(task) {
  const start = task.start instanceof Date ? task.start.getTime() : 0;
  if (!start) return null;

  let end;
  if (task.end instanceof Date) {
    end = task.end.getTime();
  } else if (typeof task.duration === 'number' && task.duration > 0) {
    end = start + task.duration * 86400000;
  } else {
    // Milestones or tasks without duration — point in time
    end = start;
  }

  return { start, end };
}

/**
 * Greedy first-fit lane-packing based on task date ranges.
 *
 * Assign each task to the lowest lane where its date range doesn't overlap
 * with already-placed tasks in that lane.
 *
 * @param {Array} tasks - Flat array of tasks with start/end or start/duration
 * @param {{ rowMap: Map, taskRows: Map }} rowMapping - Row grouping info
 * @returns {{ taskLane: Map<id, number>, rowLaneCounts: Map<rowId, number> }}
 */
export function computeLanePacking(tasks, rowMapping) {
  const taskLane = new Map();
  const rowLaneCounts = new Map();

  // Group non-summary tasks per row
  const rowTasks = new Map();
  tasks.forEach((task) => {
    if (task.type === 'summary') return;
    const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
    if (!rowTasks.has(rowId)) rowTasks.set(rowId, []);
    rowTasks.get(rowId).push(task);
  });

  rowTasks.forEach((tasksInRow, rowId) => {
    const lanes = [];
    // Sort by start date for greedy first-fit
    const sorted = [...tasksInRow].sort((a, b) => {
      const ra = getTaskRange(a);
      const rb = getTaskRange(b);
      return (ra?.start ?? 0) - (rb?.start ?? 0);
    });
    for (const t of sorted) {
      const range = getTaskRange(t);
      if (!range) {
        taskLane.set(t.id, 0);
        continue;
      }
      let placed = false;
      for (let li = 0; li < lanes.length; li++) {
        const conflict = lanes[li].some((existing) =>
          rangesOverlap(range.start, range.end, existing.start, existing.end),
        );
        if (!conflict) {
          lanes[li].push(range);
          taskLane.set(t.id, li);
          placed = true;
          break;
        }
      }
      if (!placed) {
        lanes.push([range]);
        taskLane.set(t.id, lanes.length - 1);
      }
    }
    rowLaneCounts.set(rowId, lanes.length);
  });

  return { taskLane, rowLaneCounts };
}

/**
 * Compute automatic row heights based on lane counts.
 *
 * Formula: 2 * outerMargin + laneCount * barHeight + (laneCount - 1) * gap
 * Only returns entries for rows with >1 lane (single-lane rows use cellHeight).
 *
 * @param {Map<rowId, number>} rowLaneCounts
 * @param {number} cellHeight - Default row height
 * @param {number} barHeight - Height of a single task bar
 * @returns {Object} rowId → pixel height (only for multi-lane rows)
 */
export function computeAutoRowHeights(rowLaneCounts, cellHeight, barHeight) {
  const overrides = {};
  const gap = 4;
  const outerMargin = 3;

  rowLaneCounts.forEach((laneCount, rowId) => {
    if (laneCount <= 1) return;
    const height =
      2 * outerMargin + laneCount * barHeight + (laneCount - 1) * gap;
    // Only override if taller than default cellHeight
    if (height > cellHeight) {
      overrides[rowId] = height;
    }
  });

  return overrides;
}

/**
 * Merge auto-computed overrides with user-supplied overrides.
 * Uses Math.max per key so bars never clip (auto wins if user is smaller,
 * user wins if they want intentionally taller rows).
 *
 * @param {Object|null} autoOverrides - From computeAutoRowHeights
 * @param {Object|null} userOverrides - From the rowHeightOverrides prop
 * @returns {Object|null} Merged overrides, or null if empty
 */
export function mergeRowHeightOverrides(autoOverrides, userOverrides) {
  if (!autoOverrides && !userOverrides) return null;

  const merged = {};
  let hasAny = false;

  if (autoOverrides) {
    for (const [key, value] of Object.entries(autoOverrides)) {
      merged[key] = value;
      hasAny = true;
    }
  }

  if (userOverrides) {
    for (const [key, value] of Object.entries(userOverrides)) {
      if (merged[key] !== undefined) {
        merged[key] = Math.max(merged[key], value);
      } else {
        merged[key] = value;
      }
      hasAny = true;
    }
  }

  return hasAny ? merged : null;
}
