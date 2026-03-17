import { useMemo, useState, useCallback } from 'react';
import { Gantt, ContextMenu } from '../src/';

const scales = [
  { unit: 'month', step: 1, format: '%F %Y' },
  { unit: 'day', step: 1, format: '%j' },
];

function getGroupedData() {
  const tasks = [
    // Design group — summary + children share row: 'design'
    {
      id: 1,
      text: 'Design',
      parent: 0,
      type: 'summary',
      open: true,
      row: 'design',
    },
    {
      id: 10,
      start: new Date(2026, 3, 2),
      duration: 4,
      text: 'Wireframes',
      progress: 80,
      parent: 1,
      type: 'task',
      row: 'design',
    },
    {
      id: 11,
      start: new Date(2026, 3, 4),
      duration: 3,
      text: 'Mockups',
      progress: 50,
      parent: 1,
      type: 'task',
      row: 'design',
    },
    {
      id: 12,
      start: new Date(2026, 3, 8),
      duration: 2,
      text: 'Design review',
      progress: 0,
      parent: 1,
      type: 'task',
      row: 'design',
    },

    // Development group — summary + children share row: 'dev'
    {
      id: 2,
      text: 'Development',
      parent: 0,
      type: 'summary',
      open: true,
      row: 'dev',
    },
    {
      id: 20,
      start: new Date(2026, 3, 6),
      duration: 5,
      text: 'Frontend',
      progress: 30,
      parent: 2,
      type: 'task',
      row: 'dev',
    },
    {
      id: 21,
      start: new Date(2026, 3, 7),
      duration: 6,
      text: 'Backend',
      progress: 20,
      parent: 2,
      type: 'task',
      row: 'dev',
    },
    {
      id: 22,
      start: new Date(2026, 3, 10),
      duration: 3,
      text: 'API integration',
      progress: 0,
      parent: 2,
      type: 'task',
      row: 'dev',
    },
    {
      id: 23,
      start: new Date(2026, 3, 14),
      duration: 2,
      text: 'Code review',
      progress: 0,
      parent: 2,
      type: 'task',
      row: 'dev',
    },

    // QA group — summary + children share row: 'qa'
    {
      id: 3,
      text: 'QA',
      parent: 0,
      type: 'summary',
      open: true,
      row: 'qa',
    },
    {
      id: 30,
      start: new Date(2026, 3, 12),
      duration: 4,
      text: 'Unit tests',
      progress: 10,
      parent: 3,
      type: 'task',
      row: 'qa',
    },
    {
      id: 31,
      start: new Date(2026, 3, 13),
      duration: 5,
      text: 'Integration tests',
      progress: 0,
      parent: 3,
      type: 'task',
      row: 'qa',
    },
    {
      id: 32,
      start: new Date(2026, 3, 18),
      duration: 2,
      text: 'Regression tests',
      progress: 0,
      parent: 3,
      type: 'task',
      row: 'qa',
    },

    // Standalone milestone — no row property, uses task.id as row
    {
      id: 4,
      start: new Date(2026, 3, 22),
      text: 'Release v1.0',
      progress: 0,
      parent: 0,
      type: 'milestone',
    },
  ];

  const links = [
    { id: 1, source: 10, target: 11, type: 'e2s' },
    { id: 2, source: 12, target: 20, type: 'e2s' },
    { id: 3, source: 20, target: 30, type: 'e2s' },
    { id: 4, source: 32, target: 4, type: 'e2s' },
  ];

  return { tasks, links, scales };
}

function getSeparateRowData() {
  // Each child has its own row in the grid (standard tree with parent).
  // No `row` property on children — they each get their own grid row.
  // Summary bars are visible on their own row above the children.
  const tasks = [
    // Design group
    {
      id: 1,
      text: 'Design',
      parent: 0,
      type: 'summary',
      open: true,
    },
    {
      id: 10,
      start: new Date(2026, 3, 2),
      duration: 4,
      text: 'Wireframes',
      progress: 80,
      parent: 1,
      type: 'task',
    },
    {
      id: 11,
      start: new Date(2026, 3, 4),
      duration: 3,
      text: 'Mockups',
      progress: 50,
      parent: 1,
      type: 'task',
    },
    {
      id: 12,
      start: new Date(2026, 3, 8),
      duration: 2,
      text: 'Design review',
      progress: 0,
      parent: 1,
      type: 'task',
    },

    // Development group
    {
      id: 2,
      text: 'Development',
      parent: 0,
      type: 'summary',
      open: true,
    },
    {
      id: 20,
      start: new Date(2026, 3, 6),
      duration: 5,
      text: 'Frontend',
      progress: 30,
      parent: 2,
      type: 'task',
    },
    {
      id: 21,
      start: new Date(2026, 3, 7),
      duration: 6,
      text: 'Backend',
      progress: 20,
      parent: 2,
      type: 'task',
    },
    {
      id: 22,
      start: new Date(2026, 3, 10),
      duration: 3,
      text: 'API integration',
      progress: 0,
      parent: 2,
      type: 'task',
    },
    {
      id: 23,
      start: new Date(2026, 3, 14),
      duration: 2,
      text: 'Code review',
      progress: 0,
      parent: 2,
      type: 'task',
    },

    // QA group
    {
      id: 3,
      text: 'QA',
      parent: 0,
      type: 'summary',
      open: true,
    },
    {
      id: 30,
      start: new Date(2026, 3, 12),
      duration: 4,
      text: 'Unit tests',
      progress: 10,
      parent: 3,
      type: 'task',
    },
    {
      id: 31,
      start: new Date(2026, 3, 13),
      duration: 5,
      text: 'Integration tests',
      progress: 0,
      parent: 3,
      type: 'task',
    },
    {
      id: 32,
      start: new Date(2026, 3, 18),
      duration: 2,
      text: 'Regression tests',
      progress: 0,
      parent: 3,
      type: 'task',
    },

    // Standalone milestone
    {
      id: 4,
      start: new Date(2026, 3, 22),
      text: 'Release v1.0',
      progress: 0,
      parent: 0,
      type: 'milestone',
    },
  ];

  const links = [
    { id: 1, source: 10, target: 11, type: 'e2s' },
    { id: 2, source: 12, target: 20, type: 'e2s' },
    { id: 3, source: 20, target: 30, type: 'e2s' },
    { id: 4, source: 32, target: 4, type: 'e2s' },
  ];

  return { tasks, links, scales };
}

// --- Simple stories (no api tracking) ---

function BasicGantt() {
  const data = useMemo(() => getGroupedData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      multiTaskRows
    />
  );
}

function SeparateRowsGantt() {
  const data = useMemo(() => getSeparateRowData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      multiTaskRows
    />
  );
}

function RowHeightOverridesGantt() {
  const data = useMemo(() => getGroupedData(), []);
  const rowHeightOverrides = useMemo(
    () => ({
      dev: 120,
      qa: 90,
    }),
    [],
  );
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      multiTaskRows
      rowHeightOverrides={rowHeightOverrides}
    />
  );
}

function ManyOverlapsGantt() {
  const data = useMemo(() => {
    const tasks = [
      {
        id: 1,
        text: 'Sprint 1',
        parent: 0,
        type: 'summary',
        open: true,
        row: 'sprint1',
      },
      {
        id: 10,
        start: new Date(2026, 3, 1),
        duration: 8,
        text: 'Auth service',
        progress: 60,
        parent: 1,
        type: 'task',
        row: 'sprint1',
      },
      {
        id: 11,
        start: new Date(2026, 3, 2),
        duration: 6,
        text: 'User profiles',
        progress: 40,
        parent: 1,
        type: 'task',
        row: 'sprint1',
      },
      {
        id: 12,
        start: new Date(2026, 3, 3),
        duration: 5,
        text: 'Notifications',
        progress: 20,
        parent: 1,
        type: 'task',
        row: 'sprint1',
      },
      {
        id: 13,
        start: new Date(2026, 3, 1),
        duration: 4,
        text: 'Dashboard',
        progress: 80,
        parent: 1,
        type: 'task',
        row: 'sprint1',
      },
      {
        id: 14,
        start: new Date(2026, 3, 4),
        duration: 7,
        text: 'API gateway',
        progress: 10,
        parent: 1,
        type: 'task',
        row: 'sprint1',
      },
      {
        id: 15,
        start: new Date(2026, 3, 2),
        duration: 3,
        text: 'DB migration',
        progress: 100,
        parent: 1,
        type: 'task',
        row: 'sprint1',
      },
      {
        id: 16,
        start: new Date(2026, 3, 5),
        duration: 4,
        text: 'Search index',
        progress: 0,
        parent: 1,
        type: 'task',
        row: 'sprint1',
      },
      {
        id: 17,
        start: new Date(2026, 3, 1),
        duration: 10,
        text: 'CI/CD pipeline',
        progress: 50,
        parent: 1,
        type: 'task',
        row: 'sprint1',
      },
      // A second row with fewer tasks for contrast
      {
        id: 2,
        text: 'Sprint 2',
        parent: 0,
        type: 'summary',
        open: true,
        row: 'sprint2',
      },
      {
        id: 20,
        start: new Date(2026, 3, 12),
        duration: 5,
        text: 'Performance tuning',
        progress: 0,
        parent: 2,
        type: 'task',
        row: 'sprint2',
      },
      {
        id: 21,
        start: new Date(2026, 3, 14),
        duration: 3,
        text: 'Load testing',
        progress: 0,
        parent: 2,
        type: 'task',
        row: 'sprint2',
      },
    ];
    return { tasks, links: [], scales };
  }, []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      multiTaskRows
    />
  );
}

function CollapsibleSectionsGantt() {
  const [collapsedSections, setCollapsedSections] = useState(
    () => new Set(['section-design']),
  );

  const toggleCollapse = useCallback((sectionId) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  // Source data — section definitions with child tasks
  const allSections = useMemo(
    () => [
      {
        id: 'section-design',
        name: 'Design',
        tasks: [
          {
            id: 10,
            start: new Date(2026, 3, 2),
            duration: 4,
            text: 'Wireframes',
            progress: 80,
          },
          {
            id: 11,
            start: new Date(2026, 3, 4),
            duration: 3,
            text: 'Mockups',
            progress: 50,
          },
          {
            id: 12,
            start: new Date(2026, 3, 8),
            duration: 2,
            text: 'Design review',
            progress: 0,
          },
        ],
      },
      {
        id: 'section-dev',
        name: 'Development',
        tasks: [
          {
            id: 20,
            start: new Date(2026, 3, 6),
            duration: 5,
            text: 'Frontend',
            progress: 30,
          },
          {
            id: 21,
            start: new Date(2026, 3, 7),
            duration: 6,
            text: 'Backend',
            progress: 20,
          },
          {
            id: 22,
            start: new Date(2026, 3, 10),
            duration: 3,
            text: 'API integration',
            progress: 0,
          },
          {
            id: 23,
            start: new Date(2026, 3, 14),
            duration: 2,
            text: 'Code review',
            progress: 0,
          },
        ],
      },
      {
        id: 'section-qa',
        name: 'QA',
        tasks: [
          {
            id: 30,
            start: new Date(2026, 3, 12),
            duration: 4,
            text: 'Unit tests',
            progress: 10,
          },
          {
            id: 31,
            start: new Date(2026, 3, 13),
            duration: 5,
            text: 'Integration tests',
            progress: 0,
          },
          {
            id: 32,
            start: new Date(2026, 3, 18),
            duration: 2,
            text: 'Regression tests',
            progress: 0,
          },
        ],
      },
    ],
    [],
  );

  // Build fully flat task list — no SVAR tree (no `parent`/`open`).
  // Collapsed: header + children share `row` → lane-packed on one chart row.
  // Expanded: header alone on its row, each child gets its own row (no `row`).
  // Summary bars hidden via `barHidden`.
  const tasks = useMemo(() => {
    const rows = [];

    for (const section of allSections) {
      const isCollapsed = collapsedSections.has(section.id);

      // Compute span for the section header (SVAR requires dates on summary)
      const starts = section.tasks.map((t) => t.start.getTime());
      const ends = section.tasks.map(
        (t) => t.start.getTime() + t.duration * 86400000,
      );

      if (isCollapsed) {
        // Header + children all share the same `row`
        rows.push({
          id: section.id,
          text: section.name,
          type: 'summary',
          barHidden: true,
          row: section.id,
          start: new Date(Math.min(...starts)),
          end: new Date(Math.max(...ends)),
        });
        for (const task of section.tasks) {
          rows.push({ ...task, type: 'task', row: section.id });
        }
      } else {
        // Header on its own row, each child on a separate row
        rows.push({
          id: section.id,
          text: section.name,
          type: 'summary',
          start: new Date(Math.min(...starts)),
          end: new Date(Math.max(...ends)),
        });
        for (const task of section.tasks) {
          rows.push({ ...task, type: 'task' });
        }
      }
    }

    return rows;
  }, [allSections, collapsedSections]);

  // Custom cell for the text column: toggle arrow + indentation
  const sectionIds = useMemo(
    () => new Set(allSections.map((s) => s.id)),
    [allSections],
  );

  const TextCellContent = useCallback(
    ({ row }) => {
      if (sectionIds.has(row.id)) {
        const isCollapsed = collapsedSections.has(row.id);
        return (
          <span
            style={{ cursor: 'pointer', fontWeight: 600 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse(row.id);
            }}
          >
            {isCollapsed ? '\u25B6' : '\u25BC'} {row.text}
          </span>
        );
      }
      return <span style={{ paddingLeft: 16 }}>{row.text}</span>;
    },
    [sectionIds, collapsedSections, toggleCollapse],
  );

  const links = useMemo(
    () => [
      { id: 1, source: 10, target: 11, type: 'e2s' },
      { id: 2, source: 11, target: 12, type: 'e2s' },
      { id: 3, source: 12, target: 20, type: 'e2s' },
      { id: 4, source: 20, target: 21, type: 'e2s' },
      { id: 5, source: 21, target: 22, type: 'e2s' },
      { id: 6, source: 22, target: 23, type: 'e2s' },
      { id: 7, source: 23, target: 30, type: 'e2s' },
      { id: 8, source: 30, target: 31, type: 'e2s' },
      { id: 9, source: 31, target: 32, type: 'e2s' },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        id: 'text',
        header: 'Task Name',
        flexgrow: 1,
        cell: TextCellContent,
      },
    ],
    [TextCellContent],
  );

  return (
    <Gantt
      tasks={tasks}
      links={links}
      scales={scales}
      columns={columns}
      multiTaskRows
    />
  );
}

function CollisionDetectionGantt() {
  const data = useMemo(() => getGroupedData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      multiTaskRows
      allowTaskIntersection={false}
    />
  );
}

function SummaryBarCountsGantt() {
  const data = useMemo(() => getSeparateRowData(), []);
  return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      multiTaskRows
      summaryBarCounts
    />
  );
}

// --- Interactive stories (with api + ContextMenu) ---

function MarqueeSelectGantt() {
  const data = useMemo(() => getGroupedData(), []);
  const [api, setApi] = useState();

  const init = useCallback((api) => {
    setApi(api);
  }, []);

  return (
    <ContextMenu api={api}>
      <Gantt
        init={init}
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        multiTaskRows
        marqueeSelect
      />
    </ContextMenu>
  );
}

function CopyPasteGantt() {
  const data = useMemo(() => getGroupedData(), []);
  const [api, setApi] = useState();

  const init = useCallback((api) => {
    setApi(api);
  }, []);

  return (
    <ContextMenu api={api}>
      <Gantt
        init={init}
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        multiTaskRows
        copyPaste
      />
    </ContextMenu>
  );
}

// --- Story config ---

export default {
  title: 'Gantt/Multi-Task Rows',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Group multiple tasks onto the same visual row using the `task.row` property. Tasks with the same `row` value are lane-packed — overlapping tasks stack vertically into sub-lanes within the row.',
      },
    },
  },
};

export const Basic = {
  render: () => <BasicGantt />,
  parameters: {
    docs: {
      description: {
        story:
          "Children share their summary's `row` value so they appear on the same visual line. Summary bars are hidden; overlapping children stack into lanes. Row heights auto-expand to fit all lanes.",
      },
    },
  },
};

export const SeparateRows = {
  render: () => <SeparateRowsGantt />,
  parameters: {
    docs: {
      description: {
        story:
          'Standard tree layout: each child task gets its own row in the grid. Summary bars span across the group. Contrast with Basic where children share a single row via `task.row`.',
      },
    },
  },
};

export const RowHeightOverrides = {
  render: () => <RowHeightOverridesGantt />,
  parameters: {
    docs: {
      description: {
        story:
          'Use `rowHeightOverrides` to set custom pixel heights for specific rows. Here, the dev row is 120px and the QA row is 90px. User overrides are merged with auto-computed lane heights using `Math.max` — auto wins if the user value would clip bars, user wins for intentionally taller rows.',
      },
    },
  },
};

export const CollisionDetection = {
  render: () => <CollisionDetectionGantt />,
  parameters: {
    docs: {
      description: {
        story:
          'With `allowTaskIntersection={false}`, overlapping tasks in the same row display red collision borders to indicate scheduling conflicts.',
      },
    },
  },
};

export const MarqueeSelect = {
  render: () => <MarqueeSelectGantt />,
  parameters: {
    docs: {
      description: {
        story:
          'Click and drag on the chart area to draw a selection rectangle. All tasks within the rectangle are selected. Works across multi-task row lanes.',
      },
    },
  },
};

export const CopyPaste = {
  render: () => <CopyPasteGantt />,
  parameters: {
    docs: {
      description: {
        story:
          'Select a task, press Ctrl+C to copy, then click on the chart to paste a duplicate. Copied tasks inherit the `row` property of the source.',
      },
    },
  },
};

export const ManyOverlaps = {
  render: () => <ManyOverlapsGantt />,
  parameters: {
    docs: {
      description: {
        story:
          'Stress-test with 8 heavily overlapping tasks in one row. Auto row-height expansion accommodates all lanes without any user-supplied overrides.',
      },
    },
  },
};

export const CollapsibleSections = {
  render: () => <CollapsibleSectionsGantt />,
  parameters: {
    docs: {
      description: {
        story:
          'Mirrors the workspace project pattern: sections toggle between expanded (normal tree) and collapsed (all children on one row with lane packing). Click section names to toggle. `multiTaskRows` is only enabled when at least one section is collapsed.',
      },
    },
  },
};

export const SummaryBarCounts = {
  render: () => <SummaryBarCountsGantt />,
  parameters: {
    docs: {
      description: {
        story:
          'With `summaryBarCounts` enabled on separate-row data, visible summary bars display a count badge showing the number of child tasks.',
      },
    },
  },
};
