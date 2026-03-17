import { useMemo } from 'react';
import { getData } from '../demos/data';
import { Gantt } from '../src/';

function SquaredLinks() {
  const data = useMemo(() => getData(), []);
  return <Gantt tasks={data.tasks} links={data.links} scales={data.scales} />;
}

function RoundedLinks() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="rounded"
    />
  );
}

function BezierLinks() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="bezier"
    />
  );
}

function FilledArrowsStory() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="rounded"
    />
  );
}

function GradientLinksStory() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="rounded"
      linkGradient={true}
    />
  );
}

function GradientProgressStory() {
  const data = useMemo(() => {
    const d = getData();
    // Ensure some tasks have progress for the gradient split demo
    const tasks = d.tasks.map((t, i) => ({
      ...t,
      progress: t.progress ?? (i % 3 === 0 ? 50 : i % 3 === 1 ? 80 : 0),
    }));
    return { ...d, tasks };
  }, []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="rounded"
      linkGradient={true}
    />
  );
}

function DashedLinksStory() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="rounded"
      linkStyle="dashed"
    />
  );
}

function DottedLinksStory() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="rounded"
      linkStyle="dotted"
    />
  );
}

function BundlingStory() {
  const data = useMemo(() => getData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="rounded"
      linkBundling={true}
    />
  );
}

function BezierFixedStory() {
  const data = useMemo(() => {
    const scales = [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'day', step: 1, format: '%j' },
    ];
    const tasks = [
      // --- Adjacent tasks (end touches start) ---
      { id: 1, text: 'Adjacent group', parent: 0, type: 'summary', open: true },
      { id: 10, start: new Date(2026, 3, 1), duration: 3, text: 'Task A', parent: 1 },
      { id: 11, start: new Date(2026, 3, 4), duration: 2, text: 'Task B (adjacent)', parent: 1 },

      // --- Small gap (1-2 days) ---
      { id: 2, text: 'Small gap', parent: 0, type: 'summary', open: true },
      { id: 20, start: new Date(2026, 3, 1), duration: 2, text: 'Short task', parent: 2 },
      { id: 21, start: new Date(2026, 3, 5), duration: 3, text: 'After gap', parent: 2 },

      // --- Large gap (many days apart, same row distance) ---
      { id: 3, text: 'Large gap', parent: 0, type: 'summary', open: true },
      { id: 30, start: new Date(2026, 3, 1), duration: 2, text: 'Early task', parent: 3 },
      { id: 31, start: new Date(2026, 3, 14), duration: 3, text: 'Late task (big gap)', parent: 3 },

      // --- Multi-row jump (source far above target) ---
      { id: 4, text: 'Cross-group links', parent: 0, type: 'summary', open: true },
      { id: 40, start: new Date(2026, 3, 2), duration: 4, text: 'Design phase', parent: 4 },
      { id: 41, start: new Date(2026, 3, 3), duration: 5, text: 'Research', parent: 4 },
      { id: 42, start: new Date(2026, 3, 8), duration: 3, text: 'Prototype', parent: 4 },

      // --- Overlapping tasks (source ends after target starts) ---
      { id: 5, text: 'Overlapping', parent: 0, type: 'summary', open: true },
      { id: 50, start: new Date(2026, 3, 3), duration: 8, text: 'Long running', parent: 5 },
      { id: 51, start: new Date(2026, 3, 5), duration: 3, text: 'Starts mid-way', parent: 5 },

      // --- Backward link (target is before source in time) ---
      { id: 6, text: 'Backward / s2e links', parent: 0, type: 'summary', open: true },
      { id: 60, start: new Date(2026, 3, 8), duration: 3, text: 'Later task', parent: 6 },
      { id: 61, start: new Date(2026, 3, 1), duration: 4, text: 'Earlier task', parent: 6 },

      // --- Same-row link (adjacent sibling tasks) ---
      { id: 7, text: 'Chain of 4', parent: 0, type: 'summary', open: true },
      { id: 70, start: new Date(2026, 3, 1), duration: 2, text: 'Step 1', parent: 7 },
      { id: 71, start: new Date(2026, 3, 4), duration: 2, text: 'Step 2', parent: 7 },
      { id: 72, start: new Date(2026, 3, 7), duration: 2, text: 'Step 3', parent: 7 },
      { id: 73, start: new Date(2026, 3, 10), duration: 2, text: 'Step 4', parent: 7 },

      // Milestone target
      { id: 80, start: new Date(2026, 3, 18), duration: 0, text: 'Release', parent: 0, type: 'milestone' },
    ];

    const links = [
      // Adjacent
      { id: 1, source: 10, target: 11, type: 'e2s' },
      // Small gap
      { id: 2, source: 20, target: 21, type: 'e2s' },
      // Large gap
      { id: 3, source: 30, target: 31, type: 'e2s' },
      // Cross-group (1 row apart)
      { id: 4, source: 40, target: 42, type: 'e2s' },
      // Cross-group (far jump: task A row 2 → late task row 8)
      { id: 5, source: 10, target: 42, type: 'e2s' },
      // Overlapping tasks
      { id: 6, source: 50, target: 51, type: 'e2s' },
      // Backward / s2e
      { id: 7, source: 60, target: 61, type: 's2e' },
      // Chain
      { id: 8, source: 70, target: 71, type: 'e2s' },
      { id: 9, source: 71, target: 72, type: 'e2s' },
      { id: 10, source: 72, target: 73, type: 'e2s' },
      // Chain end → milestone
      { id: 11, source: 73, target: 80, type: 'e2s' },
      // Long distance cross-group
      { id: 12, source: 21, target: 60, type: 'e2s' },
    ];

    return { tasks, links, scales };
  }, []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      linkShape="bezier"
    />
  );
}

export default {
  title: 'Gantt/Links',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Link shape styles and visual enhancements for dependency lines. Includes bezier fix, filled arrowheads, gradient colors, dash styles, draw-in animation, and link bundling.',
      },
    },
  },
};

export const Squared = {
  render: () => <SquaredLinks />,
  parameters: {
    docs: {
      description: {
        story:
          'Default link style. Dependency lines use sharp right-angle turns at each waypoint, rendered as SVG `<polyline>` elements.',
      },
    },
  },
};

export const Rounded = {
  render: () => <RoundedLinks />,
  parameters: {
    docs: {
      description: {
        story:
          'Rounded corners on dependency lines. Each right-angle turn is replaced with a smooth quadratic bezier arc. The routing path is identical to squared mode, only the corners are softened.',
      },
    },
  },
};

export const Bezier = {
  render: () => <BezierLinks />,
  parameters: {
    docs: {
      description: {
        story:
          'Smooth cubic bezier curves flowing directly from source to target. Ignores intermediate waypoints for a clean, flowing look. Control points extend horizontally for natural S-curves.',
      },
    },
  },
};

export const FilledArrows = {
  render: () => <FilledArrowsStory />,
  parameters: {
    docs: {
      description: {
        story:
          'All link shapes now use filled SVG marker arrowheads instead of the old polyline-based arrow triangles. Arrowheads automatically match the link color in all states (default, critical, selected, hovered).',
      },
    },
  },
};

export const Gradient = {
  render: () => <GradientLinksStory />,
  parameters: {
    docs: {
      description: {
        story:
          'Enable `linkGradient={true}` to color dependency lines with a gradient flowing from the source task color to the target task color. Critical and selected links override the gradient with solid colors.',
      },
    },
  },
};

export const GradientProgress = {
  render: () => <GradientProgressStory />,
  parameters: {
    docs: {
      description: {
        story:
          'Gradient links with progress-based color stops. The source task color is solid up to the task progress percentage, then blends into the target task color.',
      },
    },
  },
};

export const Dashed = {
  render: () => <DashedLinksStory />,
  parameters: {
    docs: {
      description: {
        story:
          'Set `linkStyle="dashed"` for dashed dependency lines with stroke-dasharray "8 4". Per-link override via `link.style` takes priority over the global prop.',
      },
    },
  },
};

export const Dotted = {
  render: () => <DottedLinksStory />,
  parameters: {
    docs: {
      description: {
        story:
          'Set `linkStyle="dotted"` for dotted dependency lines with stroke-dasharray "2 4".',
      },
    },
  },
};

export const BezierFixed = {
  render: () => <BezierFixedStory />,
  parameters: {
    docs: {
      description: {
        story:
          'Fixed bezier curves that derive direction from `link.type` semantics (e/s prefixes) instead of waypoint inference. The offset is now proportionally scaled: `Math.max(20, Math.min(dist * 0.4, 100))`, preventing the wild looping/overshooting seen previously.',
      },
    },
  },
};

export const Bundling = {
  render: () => <BundlingStory />,
  parameters: {
    docs: {
      description: {
        story:
          'Enable `linkBundling={true}` to spread overlapping link segments apart with 4px spacing. Uses orthogonal edge nudging to prevent parallel segments from overlapping.',
      },
    },
  },
};
