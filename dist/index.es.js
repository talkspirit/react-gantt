import { jsxs as we, jsx as d, Fragment as _e } from 'react/jsx-runtime';
import {
  createContext as gt,
  useContext as ve,
  useMemo as b,
  useState as oe,
  useCallback as k,
  useRef as te,
  useEffect as Q,
  Fragment as wt,
  forwardRef as ct,
  useImperativeHandle as at,
} from 'react';
import {
  context as Re,
  Button as Ue,
  Field as pt,
  Text as yt,
  Combo as kt,
  DatePicker as bt,
  TimePicker as vt,
  Locale as Tt,
  RichSelect as Ct,
  TwoState as $t,
  Slider as Nt,
  Counter as Mt,
  Material as Ze,
  Willow as Je,
  WillowDark as et,
} from '@svar-ui/react-core';
import {
  locate as Le,
  locateID as ze,
  locateAttr as St,
  dateToString as Ve,
  locale as Fe,
} from '@svar-ui/lib-dom';
import { en as Ke } from '@svar-ui/gantt-locales';
import { en as qe } from '@svar-ui/core-locales';
import { EventBusRouter as Rt } from '@svar-ui/lib-state';
import {
  prepareEditTask as dt,
  grid as Lt,
  extendDragOptions as Et,
  isSegmentMoveAllowed as Dt,
  DataStore as At,
  normalizeLinks as It,
  normalizeZoom as Ht,
  defaultColumns as zt,
  parseTaskDates as tt,
  defaultTaskTypes as Gt,
  getToolbarButtons as nt,
  handleAction as ut,
  isHandledAction as ft,
  getMenuOptions as st,
  getEditorItems as Wt,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as Bn,
  defaultEditorItems as Xn,
  defaultMenuOptions as Yn,
  defaultTaskTypes as jn,
  defaultToolbarButtons as qn,
  getEditorItems as Qn,
  getMenuOptions as Un,
  getToolbarButtons as Zn,
  registerScaleUnit as Jn,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as Ye,
  useStore as A,
  useStoreWithCounter as je,
  writable as _t,
  useStoreLater as Ee,
} from '@svar-ui/lib-react';
import { hotkeys as ht } from '@svar-ui/grid-store';
import { Grid as Pt, HeaderMenu as Ot } from '@svar-ui/react-grid';
import { flushSync as Vt } from 'react-dom';
import { Toolbar as rt } from '@svar-ui/react-toolbar';
import { ContextMenu as Ft } from '@svar-ui/react-menu';
import { Editor as Kt, registerEditorItem as We } from '@svar-ui/react-editor';
import { registerEditorItem as ts } from '@svar-ui/react-editor';
const De = gt(null);
function Ge(t) {
  const n = t.getAttribute('data-id'),
    r = parseInt(n);
  return isNaN(r) || r.toString() != n ? n : r;
}
function Bt(t, n, r) {
  const s = t.getBoundingClientRect(),
    o = n.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: s.top - o.top,
    left: s.left - o.left,
    dt: s.bottom - r.clientY,
    db: r.clientY - s.top,
  };
}
function ot(t) {
  return t && t.getAttribute('data-context-id');
}
const lt = 5;
function Xt(t, n) {
  let r, s, o, M, h, f, x, R, m;
  function P(a) {
    (M = a.clientX),
      (h = a.clientY),
      (f = {
        ...Bt(r, t, a),
        y: n.getTask(o).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function T(a) {
    (r = Le(a)),
      ot(r) &&
        ((o = Ge(r)),
        (m = setTimeout(() => {
          (R = !0), n && n.touchStart && n.touchStart(), P(a.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', W),
        t.addEventListener('contextmenu', c),
        window.addEventListener('touchend', H));
  }
  function c(a) {
    if (R || m) return a.preventDefault(), !1;
  }
  function V(a) {
    a.which === 1 &&
      ((r = Le(a)),
      ot(r) &&
        ((o = Ge(r)),
        t.addEventListener('mousemove', E),
        window.addEventListener('mouseup', C),
        P(a)));
  }
  function L(a) {
    t.removeEventListener('mousemove', E),
      t.removeEventListener('touchmove', W),
      document.body.removeEventListener('mouseup', C),
      document.body.removeEventListener('touchend', H),
      (document.body.style.userSelect = ''),
      a &&
        (t.removeEventListener('mousedown', V),
        t.removeEventListener('touchstart', T));
  }
  function O(a) {
    const B = a.clientX - M,
      F = a.clientY - h;
    if (!s) {
      if (
        (Math.abs(B) < lt && Math.abs(F) < lt) ||
        (n && n.start && n.start({ id: o, e: a }) === !1)
      )
        return;
      (s = r.cloneNode(!0)),
        (s.style.pointerEvents = 'none'),
        s.classList.add('wx-reorder-task'),
        (s.style.position = 'absolute'),
        (s.style.left = f.left + 'px'),
        (s.style.top = f.top + 'px'),
        (r.style.visibility = 'hidden'),
        r.parentNode.insertBefore(s, r);
    }
    if (s) {
      const ee = Math.round(Math.max(0, f.top + F));
      if (n && n.move && n.move({ id: o, top: ee, detail: x }) === !1) return;
      const j = n.getTask(o),
        U = j.$y;
      if (!f.start && f.y == U) return I();
      (f.start = !0), (f.y = j.$y - 4), (s.style.top = ee + 'px');
      const X = document.elementFromPoint(a.clientX, a.clientY),
        z = Le(X);
      if (z && z !== r) {
        const Z = Ge(z),
          S = z.getBoundingClientRect(),
          i = S.top + S.height / 2,
          p = a.clientY + f.db > i && z.nextElementSibling !== r,
          _ = a.clientY - f.dt < i && z.previousElementSibling !== r;
        x?.after == Z || x?.before == Z
          ? (x = null)
          : p
            ? (x = { id: o, after: Z })
            : _ && (x = { id: o, before: Z });
      }
    }
  }
  function E(a) {
    O(a);
  }
  function W(a) {
    R
      ? (a.preventDefault(), O(a.touches[0]))
      : m && (clearTimeout(m), (m = null));
  }
  function H() {
    (R = null), m && (clearTimeout(m), (m = null)), I();
  }
  function C() {
    I();
  }
  function I() {
    r && (r.style.visibility = ''),
      s &&
        (s.parentNode.removeChild(s),
        n && n.end && n.end({ id: o, top: f.top })),
      (o = r = s = f = x = null),
      L();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', V),
    t.addEventListener('touchstart', T),
    {
      destroy() {
        L(!0);
      },
    }
  );
}
function Yt({ row: t, column: n }) {
  const r = ve(De);
  function s(M, h) {
    return {
      justifyContent: h.align,
      paddingLeft: `${(M.$level - 1) * 20}px`,
    };
  }
  const o = n && n._cell;
  return /* @__PURE__ */ we('div', {
    className: 'wx-pqc08MHU wx-content',
    style: s(t, n),
    children: [
      t.data || t.lazy
        ? /* @__PURE__ */ d('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ d('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ d('div', {
        className: 'wx-pqc08MHU wx-text',
        children: o
          ? /* @__PURE__ */ d(o, { row: t, column: n, api: r })
          : t.text,
      }),
    ],
  });
}
function it({ column: t, cell: n }) {
  const r = b(() => t.id, [t?.id]);
  return n || t.id == 'add-task'
    ? /* @__PURE__ */ d('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ d('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': r,
        }),
      })
    : null;
}
function jt(t) {
  const {
      readonly: n,
      compactMode: r,
      width: s = 0,
      display: o = 'all',
      columnWidth: M = 0,
      onTableAPIChange: h,
    } = t,
    [f, x] = Ye(M),
    [R, m] = oe(),
    P = ve(Re.i18n),
    T = b(() => P.getGroup('gantt'), [P]),
    c = ve(De),
    V = A(c, 'scrollTop'),
    L = A(c, 'cellHeight'),
    O = A(c, '_scrollTask'),
    E = A(c, '_selected'),
    W = A(c, 'area'),
    H = A(c, '_tasks'),
    C = A(c, '_scales'),
    I = A(c, 'columns'),
    a = A(c, '_sort'),
    B = A(c, 'calendar'),
    F = A(c, 'durationUnit'),
    ee = A(c, 'splitTasks'),
    [j, U] = oe(null),
    X = b(() => (!H || !W ? [] : H.slice(W.start, W.end)), [H, W]),
    z = k(
      (l, w) => {
        if (w === 'add-task')
          c.exec(w, {
            target: l,
            task: { text: T('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (w === 'open-task') {
          const $ = X.find((e) => e.id === l);
          ($?.data || $?.lazy) && c.exec(w, { id: l, mode: !$.open });
        }
      },
      [X],
    ),
    Z = k(
      (l) => {
        const w = ze(l),
          $ = l.target.dataset.action;
        $ && l.preventDefault(),
          w
            ? $ === 'add-task' || $ === 'open-task'
              ? z(w, $)
              : c.exec('select-task', {
                  id: w,
                  toggle: l.ctrlKey || l.metaKey,
                  range: l.shiftKey,
                  show: !0,
                })
            : $ === 'add-task' && z(null, $);
      },
      [c, z],
    ),
    S = te(null),
    i = te(null),
    [p, _] = oe(0),
    [D, Y] = oe(!1);
  Q(() => {
    const l = i.current;
    if (!l || typeof ResizeObserver > 'u') return;
    const w = () => _(l.clientWidth);
    w();
    const $ = new ResizeObserver(w);
    return $.observe(l), () => $.disconnect();
  }, []);
  const K = te(null),
    he = k(
      (l) => {
        const w = l.id,
          { before: $, after: e } = l,
          u = l.onMove;
        let y = $ || e,
          N = $ ? 'before' : 'after';
        if (u) {
          if (N === 'after') {
            const q = c.getTask(y);
            q.data?.length && q.open && ((N = 'before'), (y = q.data[0].id));
          }
          K.current = { id: w, [N]: y };
        } else K.current = null;
        c.exec('move-task', {
          id: w,
          mode: N,
          target: y,
          inProgress: u,
        });
      },
      [c],
    ),
    me = b(() => W?.from ?? 0, [W]),
    xe = b(() => C?.height ?? 0, [C]),
    de = b(
      () => (!r && o !== 'grid' ? (f ?? 0) > (s ?? 0) : (f ?? 0) > (p ?? 0)),
      [r, o, f, s, p],
    ),
    v = b(() => {
      const l = {};
      return (
        (de && o === 'all') || (o === 'grid' && de)
          ? (l.width = f)
          : o === 'grid' && (l.width = '100%'),
        l
      );
    }, [de, o, f]),
    se = b(() => (j && !X.find((l) => l.id === j.id) ? [...X, j] : X), [X, j]),
    ne = b(() => {
      let l = (I || []).map((e) => {
        e = { ...e };
        const u = e.header;
        if (typeof u == 'object') {
          const y = u.text && T(u.text);
          e.header = { ...u, text: y };
        } else e.header = T(u);
        if (e.cell && e.id !== 'text' && e.id !== 'add-task') {
          const y = e.cell;
          e.cell = (N) => /* @__PURE__ */ d(y, { ...N, api: c });
        }
        return e;
      });
      const w = l.findIndex((e) => e.id === 'text'),
        $ = l.findIndex((e) => e.id === 'add-task');
      if (
        (w !== -1 && (l[w].cell && (l[w]._cell = l[w].cell), (l[w].cell = Yt)),
        $ !== -1)
      ) {
        l[$].cell = l[$].cell || it;
        const e = l[$].header;
        if (
          (typeof e != 'object' && (l[$].header = { text: e }),
          (l[$].header.cell = e.cell || it),
          n)
        )
          l.splice($, 1);
        else if (r) {
          const [u] = l.splice($, 1);
          l.unshift(u);
        }
      }
      return l.length > 0 && (l[l.length - 1].resize = !1), l;
    }, [I, T, n, r, c]),
    le = b(
      () =>
        o === 'all'
          ? `${s}px`
          : o === 'grid'
            ? 'calc(100% - 4px)'
            : ne.find((l) => l.id === 'add-task')
              ? '50px'
              : '0',
      [o, s, ne],
    ),
    Te = b(() => {
      if (se && a?.length) {
        const l = {};
        return (
          a.forEach(({ key: w, order: $ }, e) => {
            l[w] = {
              order: $,
              ...(a.length > 1 && { index: e }),
            };
          }),
          l
        );
      }
      return {};
    }, [se, a]),
    be = k(() => ne.some((l) => l.flexgrow && !l.hidden), []),
    Ne = b(() => be(), [be, D]),
    ue = b(() => {
      let l = o === 'chart' ? ne.filter(($) => $.id === 'add-task') : ne;
      const w = o === 'all' ? s : p;
      if (!Ne) {
        let $ = f,
          e = !1;
        if (ne.some((u) => u.$width)) {
          let u = 0;
          ($ = ne.reduce(
            (y, N) => (
              N.hidden || ((u += N.width), (y += N.$width || N.width)), y
            ),
            0,
          )),
            u > $ && $ > w && (e = !0);
        }
        if (e || $ < w) {
          let u = 1;
          return (
            e || (u = (w - 50) / ($ - 50 || 1)),
            l.map(
              (y) => (
                y.id !== 'add-task' &&
                  !y.hidden &&
                  (y.$width || (y.$width = y.width), (y.width = y.$width * u)),
                y
              ),
            )
          );
        }
      }
      return l;
    }, [o, ne, Ne, f, s, p]),
    ke = k(
      (l) => {
        if (!be()) {
          const w = ue.reduce(
            ($, e) => (
              l && e.$width && (e.$width = e.width),
              $ + (e.hidden ? 0 : e.width)
            ),
            0,
          );
          w !== f && x(w);
        }
        Y(!0), Y(!1);
      },
      [be, ue, f, x],
    ),
    Ce = k(() => {
      ne.filter((w) => w.flexgrow && !w.hidden).length === 1 &&
        ne.forEach((w) => {
          w.$width && !w.flexgrow && !w.hidden && (w.width = w.$width);
        });
    }, []),
    ie = k(
      (l) => {
        if (!n) {
          const w = ze(l),
            $ = St(l, 'data-col-id');
          !($ && ne.find((u) => u.id == $))?.editor &&
            w &&
            c.exec('show-editor', { id: w });
        }
      },
      [c, n],
      // cols is defined later; relies on latest value at call time
    ),
    fe = b(() => (Array.isArray(E) ? E.map((l) => l.id) : []), [E]),
    ce = k(() => {
      if (S.current && se !== null) {
        const l = S.current.querySelector('.wx-body');
        l && (l.style.top = -((V ?? 0) - (me ?? 0)) + 'px');
      }
      i.current && (i.current.scrollTop = 0);
    }, [se, V, me]);
  Q(() => {
    S.current && ce();
  }, [V, me, ce]),
    Q(() => {
      const l = S.current;
      if (!l) return;
      const w = l.querySelector('.wx-table-box .wx-body');
      if (!w || typeof ResizeObserver > 'u') return;
      const $ = new ResizeObserver(() => {
        ce();
      });
      return (
        $.observe(w),
        () => {
          $.disconnect();
        }
      );
    }, [ue, v, o, le, se, ce]),
    Q(() => {
      if (!O || !R) return;
      const { id: l } = O,
        w = R.getState().focusCell;
      w &&
        w.row !== l &&
        S.current &&
        S.current.contains(document.activeElement) &&
        R.exec('focus-cell', {
          row: l,
          column: w.column,
        });
    }, [O, R]);
  const g = k(
      ({ id: l }) => {
        if (n) return !1;
        c.getTask(l).open && c.exec('open-task', { id: l, mode: !1 });
        const w = c.getState()._tasks.find(($) => $.id === l);
        if ((U(w || null), !w)) return !1;
      },
      [c, n],
    ),
    J = k(
      ({ id: l, top: w }) => {
        K.current
          ? he({ ...K.current, onMove: !1 })
          : c.exec('drag-task', {
              id: l,
              top: w + (me ?? 0),
              inProgress: !1,
            }),
          U(null);
      },
      [c, he, me],
    ),
    ae = k(
      ({ id: l, top: w, detail: $ }) => {
        $ && he({ ...$, onMove: !0 }),
          c.exec('drag-task', {
            id: l,
            top: w + (me ?? 0),
            inProgress: !0,
          });
      },
      [c, he, me],
    );
  Q(() => {
    const l = S.current;
    return l
      ? Xt(l, {
          start: g,
          end: J,
          move: ae,
          getTask: c.getTask,
        }).destroy
      : void 0;
  }, [c, g, J, ae]);
  const G = k(
      (l) => {
        const { key: w, isInput: $ } = l;
        if (!$ && (w === 'arrowup' || w === 'arrowdown'))
          return (l.eventSource = 'grid'), c.exec('hotkey', l), !1;
        if (w === 'enter') {
          const e = R?.getState().focusCell;
          if (e) {
            const { row: u, column: y } = e;
            y === 'add-task'
              ? z(u, 'add-task')
              : y === 'text' && z(u, 'open-task');
          }
        }
      },
      [c, z, R],
    ),
    re = te(null),
    $e = () => {
      re.current = {
        setTableAPI: m,
        handleHotkey: G,
        sortVal: a,
        api: c,
        adjustColumns: Ce,
        setColumnWidth: ke,
        tasks: X,
        calendarVal: B,
        durationUnitVal: F,
        splitTasksVal: ee,
        onTableAPIChange: h,
      };
    };
  $e(),
    Q(() => {
      $e();
    }, [m, G, a, c, Ce, ke, X, B, F, ee, h]);
  const Ae = k((l) => {
    m(l),
      l.intercept('hotkey', (w) => re.current.handleHotkey(w)),
      l.intercept('scroll', () => !1),
      l.intercept('select-row', () => !1),
      l.intercept('sort-rows', (w) => {
        const $ = re.current.sortVal,
          { key: e, add: u } = w,
          y = $ ? $.find((q) => q.key === e) : null;
        let N = 'asc';
        return (
          y && (N = !y || y.order === 'asc' ? 'desc' : 'asc'),
          c.exec('sort-tasks', {
            key: e,
            order: N,
            add: u,
          }),
          !1
        );
      }),
      l.on('resize-column', () => {
        re.current.setColumnWidth(!0);
      }),
      l.on('hide-column', (w) => {
        w.mode || re.current.adjustColumns(), re.current.setColumnWidth();
      }),
      l.intercept('update-cell', (w) => {
        const { id: $, column: e, value: u } = w,
          y = re.current.tasks.find((N) => N.id === $);
        if (y) {
          const N = { ...y };
          let q = u;
          q && !isNaN(q) && !(q instanceof Date) && (q *= 1),
            (N[e] = q),
            dt(
              N,
              {
                calendar: re.current.calendarVal,
                durationUnit: re.current.durationUnitVal,
                splitTasks: re.current.splitTasksVal,
              },
              e,
            ),
            c.exec('update-task', {
              id: $,
              task: N,
            });
        }
        return !1;
      }),
      h && h(l);
  }, []);
  return /* @__PURE__ */ d('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${le}` },
    ref: i,
    children: /* @__PURE__ */ d('div', {
      ref: S,
      style: v,
      className: 'wx-rHj6070p wx-table',
      onClick: Z,
      onDoubleClick: ie,
      children: /* @__PURE__ */ d(Pt, {
        init: Ae,
        sizes: {
          rowHeight: L,
          headerHeight: (xe ?? 0) - 1,
        },
        rowStyle: (l) =>
          l.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (l) =>
          `wx-rHj6070p wx-text-${l.align}${l.id === 'add-task' ? ' wx-action' : ''}`,
        data: se,
        columns: ue,
        selectedRows: [...fe],
        sortMarks: Te,
      }),
    }),
  });
}
function qt({ borders: t = '' }) {
  const n = ve(De),
    r = A(n, 'cellWidth'),
    s = A(n, 'cellHeight'),
    o = te(null),
    [M, h] = oe('#e4e4e4');
  Q(() => {
    if (typeof getComputedStyle < 'u' && o.current) {
      const x = getComputedStyle(o.current).getPropertyValue(
        '--wx-gantt-border',
      );
      h(x ? x.substring(x.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const f = {
    width: '100%',
    height: '100%',
    background: r != null && s != null ? `url(${Lt(r, s, M, t)})` : void 0,
    position: 'absolute',
  };
  return /* @__PURE__ */ d('div', { ref: o, style: f });
}
function Qt({ onSelectLink: t, selectedLink: n, readonly: r }) {
  const s = ve(De),
    o = A(s, '_links'),
    M = A(s, 'criticalPath'),
    h = te(null),
    f = k(
      (x) => {
        const R = x?.target?.classList;
        !R?.contains('wx-line') && !R?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    Q(() => {
      if (!r && n && h.current) {
        const x = (R) => {
          h.current && !h.current.contains(R.target) && f(R);
        };
        return (
          document.addEventListener('click', x),
          () => {
            document.removeEventListener('click', x);
          }
        );
      }
    }, [r, n, f]),
    /* @__PURE__ */ we('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (o || []).map((x) => {
          const R =
            'wx-dkx3NwEn wx-line' +
            (M && x.$critical ? ' wx-critical' : '') +
            (r ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ d(
            'polyline',
            {
              className: R,
              points: x.$p,
              onClick: () => !r && t(x.id),
              'data-link-id': x.id,
            },
            x.id,
          );
        }),
        !r &&
          n &&
          /* @__PURE__ */ d('polyline', {
            ref: h,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: n.$p,
          }),
      ],
    })
  );
}
function Ut(t) {
  const { task: n, type: r } = t;
  function s(M) {
    const h = n.segments[M];
    return {
      left: `${h.$x}px`,
      top: '0px',
      width: `${h.$w}px`,
      height: '100%',
    };
  }
  function o(M) {
    if (!n.progress) return 0;
    const h = (n.duration * n.progress) / 100,
      f = n.segments;
    let x = 0,
      R = 0,
      m = null;
    do {
      const P = f[R];
      R === M &&
        (x > h ? (m = 0) : (m = Math.min((h - x) / P.duration, 1) * 100)),
        (x += P.duration),
        R++;
    } while (m === null && R < f.length);
    return m || 0;
  }
  return /* @__PURE__ */ d('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((M, h) =>
      /* @__PURE__ */ we(
        'div',
        {
          className: `wx-segment wx-bar wx-${r} wx-GKbcLEGA`,
          'data-segment': h,
          style: s(h),
          children: [
            n.progress
              ? /* @__PURE__ */ d('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ d('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${o(h)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ d('div', {
              className: 'wx-content',
              children: M.text || '',
            }),
          ],
        },
        h,
      ),
    ),
  });
}
function Zt(t) {
  const { readonly: n, taskTemplate: r } = t,
    s = ve(De),
    [o, M] = je(s, '_tasks'),
    [h, f] = je(s, '_links'),
    x = A(s, 'area'),
    R = A(s, '_scales'),
    m = A(s, 'taskTypes'),
    P = A(s, 'baselines'),
    T = A(s, '_selected'),
    c = A(s, '_scrollTask'),
    V = A(s, 'criticalPath'),
    L = A(s, 'tasks'),
    O = A(s, 'schedule'),
    E = A(s, 'splitTasks'),
    W = A(s, 'summary'),
    H = b(() => {
      if (!x || !Array.isArray(o)) return [];
      const e = x.start ?? 0,
        u = x.end ?? 0;
      return o.slice(e, u).map((y) => ({ ...y }));
    }, [M, x]),
    C = b(() => R.lengthUnitWidth, [R]),
    I = te(!1),
    [a, B] = oe(void 0),
    [F, ee] = oe(null),
    j = te(null),
    [U, X] = oe(null),
    z = b(
      () =>
        U && {
          ...h.find((e) => e.id === U),
        },
      [U, f],
    ),
    [Z, S] = oe(void 0),
    i = te(null),
    [p, _] = oe(0),
    D = te(null),
    Y = b(() => {
      const e = D.current;
      return !!(T.length && e && e.contains(document.activeElement));
    }, [T, D.current]),
    K = b(() => Y && T[T.length - 1]?.id, [Y, T]);
  Q(() => {
    if (c && Y && c) {
      const { id: e } = c,
        u = D.current?.querySelector(`.wx-bar[data-id='${e}']`);
      u && u.focus({ preventScroll: !0 });
    }
  }, [c]),
    Q(() => {
      const e = D.current;
      if (e && (_(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const u = new ResizeObserver((y) => {
          y[0] && _(y[0].contentRect.width);
        });
        return u.observe(e), () => u.disconnect();
      }
    }, [D.current]);
  const he = k(() => {
      document.body.style.userSelect = 'none';
    }, []),
    me = k(() => {
      document.body.style.userSelect = '';
    }, []),
    xe = k(
      (e, u, y) => {
        if (
          u.target.classList.contains('wx-line') ||
          (y || (y = s.getTask(Ge(e))),
          y.type === 'milestone' || y.type === 'summary')
        )
          return '';
        const N = Le(u, 'data-segment');
        N && (e = N);
        const { left: q, width: ge } = e.getBoundingClientRect(),
          pe = (u.clientX - q) / ge;
        let ye = 0.2 / (ge > 200 ? ge / 200 : 1);
        return pe < ye ? 'start' : pe > 1 - ye ? 'end' : '';
      },
      [s],
    ),
    de = k(
      (e, u) => {
        const { clientX: y } = u,
          N = Ge(e),
          q = s.getTask(N),
          ge = u.target.classList;
        if (
          !u.target.closest('.wx-delete-button') &&
          !u.target.closest('[data-interactive]') &&
          !n
        ) {
          if (ge.contains('wx-progress-marker')) {
            const { progress: pe } = s.getTask(N);
            (j.current = {
              id: N,
              x: y,
              progress: pe,
              dx: 0,
              node: e,
              marker: u.target,
            }),
              u.target.classList.add('wx-progress-in-drag');
          } else {
            const pe = xe(e, u, q) || 'move',
              ye = {
                id: N,
                mode: pe,
                x: y,
                dx: 0,
                l: q.$x,
                w: q.$w,
              };
            if (E && q.segments?.length) {
              const Me = Le(u, 'data-segment');
              Me && ((ye.segmentIndex = Me.dataset.segment * 1), Et(q, ye));
            }
            ee(ye);
          }
          he();
        }
      },
      [s, n, xe, he, E],
    ),
    v = k(
      (e) => {
        if (e.button !== 0) return;
        const u = Le(e);
        u && de(u, e);
      },
      [de],
    ),
    se = k(
      (e) => {
        const u = Le(e);
        u &&
          (i.current = setTimeout(() => {
            S(!0), de(u, e.touches[0]);
          }, 300));
      },
      [de],
    ),
    ne = k((e) => {
      X(e);
    }, []),
    le = k(() => {
      if (j.current) {
        const { dx: e, id: u, marker: y, value: N } = j.current;
        (j.current = null),
          typeof N < 'u' &&
            e &&
            s.exec('update-task', {
              id: u,
              task: { progress: N },
              inProgress: !1,
            }),
          y.classList.remove('wx-progress-in-drag'),
          (I.current = !0),
          me();
      } else if (F) {
        const {
          id: e,
          mode: u,
          dx: y,
          l: N,
          w: q,
          start: ge,
          segment: pe,
          index: ye,
        } = F;
        if ((ee(null), ge)) {
          const Me = Math.round(y / C);
          if (!Me)
            s.exec('drag-task', {
              id: e,
              width: q,
              left: N,
              inProgress: !1,
              ...(pe && { segmentIndex: ye }),
            });
          else {
            let He = {},
              Ie = s.getTask(e);
            pe && (Ie = Ie.segments[ye]),
              u === 'move'
                ? ((He.start = Ie.start), (He.end = Ie.end))
                : (He[u] = Ie[u]),
              s.exec('update-task', {
                id: e,
                diff: Me,
                task: He,
                ...(pe && { segmentIndex: ye }),
              });
          }
          I.current = !0;
        }
        me();
      }
    }, [s, me, F, C]),
    Te = k(
      (e, u) => {
        const { clientX: y } = u;
        if (!n)
          if (j.current) {
            const { node: N, x: q, id: ge } = j.current,
              pe = (j.current.dx = y - q),
              ye = Math.round((pe / N.offsetWidth) * 100);
            let Me = j.current.progress + ye;
            (j.current.value = Me = Math.min(Math.max(0, Me), 100)),
              s.exec('update-task', {
                id: ge,
                task: { progress: Me },
                inProgress: !0,
              });
          } else if (F) {
            ne(null);
            const {
                mode: N,
                l: q,
                w: ge,
                x: pe,
                id: ye,
                start: Me,
                segment: He,
                index: Ie,
              } = F,
              Be = s.getTask(ye),
              Se = y - pe,
              Qe = Math.round(C) || 1;
            if (
              (!Me && Math.abs(Se) < 20) ||
              (N === 'start' && ge - Se < Qe) ||
              (N === 'end' && ge + Se < Qe) ||
              (N === 'move' &&
                ((Se < 0 && q + Se < 0) || (Se > 0 && q + ge + Se > p))) ||
              (F.segment && !Dt(Be, F))
            )
              return;
            const Xe = { ...F, dx: Se };
            let Pe, Oe;
            if (
              (N === 'start'
                ? ((Pe = q + Se), (Oe = ge - Se))
                : N === 'end'
                  ? ((Pe = q), (Oe = ge + Se))
                  : N === 'move' && ((Pe = q + Se), (Oe = ge)),
              s.exec('drag-task', {
                id: ye,
                width: Oe,
                left: Pe,
                inProgress: !0,
                start: Me,
                ...(He && { segmentIndex: Ie }),
              }),
              !Xe.start &&
                ((N === 'move' && Be.$x == q) || (N !== 'move' && Be.$w == ge)))
            ) {
              (I.current = !0), le();
              return;
            }
            (Xe.start = !0), ee(Xe);
          } else {
            const N = Le(e);
            if (N) {
              const q = s.getTask(Ge(N)),
                pe = Le(e, 'data-segment') || N,
                ye = xe(pe, u, q);
              pe.style.cursor = ye && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [s, n, F, C, p, xe, ne, le],
    ),
    be = k(
      (e) => {
        Te(e, e);
      },
      [Te],
    ),
    Ne = k(
      (e) => {
        Z
          ? (e.preventDefault(), Te(e, e.touches[0]))
          : i.current && (clearTimeout(i.current), (i.current = null));
      },
      [Z, Te],
    ),
    ue = k(() => {
      le();
    }, [le]),
    ke = k(() => {
      S(null), i.current && (clearTimeout(i.current), (i.current = null)), le();
    }, [le]);
  Q(
    () => (
      window.addEventListener('mouseup', ue),
      () => {
        window.removeEventListener('mouseup', ue);
      }
    ),
    [ue],
  );
  const Ce = k(
      (e) => {
        if (!n) {
          if (e.target.closest('[data-interactive]')) return;
          const u = ze(e.target);
          if (u && !e.target.classList.contains('wx-link')) {
            const y = ze(e.target, 'data-segment');
            s.exec('show-editor', {
              id: u,
              ...(y !== null && { segmentIndex: y }),
            });
          }
        }
      },
      [s, n],
    ),
    ie = ['e2s', 's2s', 'e2e', 's2e'],
    fe = k((e, u) => ie[(e ? 1 : 0) + (u ? 0 : 2)], []),
    ce = k(
      (e, u) => {
        const y = a.id,
          N = a.start;
        return e === y
          ? !0
          : !!h.find(
              (q) => q.target == e && q.source == y && q.type === fe(N, u),
            );
      },
      [a, f, fe],
    ),
    g = k(() => {
      a && B(null);
    }, [a]),
    J = k(
      (e) => {
        if (I.current) {
          I.current = !1;
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const u = ze(e.target);
        if (u) {
          const y = e.target.classList;
          if (y.contains('wx-link')) {
            const N = y.contains('wx-left');
            if (!a) {
              B({ id: u, start: N });
              return;
            }
            a.id !== u &&
              !ce(u, N) &&
              s.exec('add-link', {
                link: {
                  source: a.id,
                  target: u,
                  type: fe(a.start, N),
                },
              });
          } else if (y.contains('wx-delete-button-icon'))
            s.exec('delete-link', { id: U }), X(null);
          else {
            let N;
            const q = Le(e, 'data-segment');
            q && (N = q.dataset.segment * 1),
              s.exec('select-task', {
                id: u,
                toggle: e.ctrlKey || e.metaKey,
                range: e.shiftKey,
                segmentIndex: N,
              });
          }
        }
        g();
      },
      [s, a, f, z, ce, fe, g],
    ),
    ae = k(
      (e) => ({
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      }),
      [],
    ),
    G = k(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    re = k(
      (e) => {
        if (Z || i.current) return e.preventDefault(), !1;
      },
      [Z],
    ),
    $e = b(() => m.map((e) => e.id), [m]),
    Ae = k(
      (e) => {
        let u = $e.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (u = `task ${u}`), u
        );
      },
      [$e],
    ),
    l = k(
      (e) => {
        s.exec(e.action, e.data);
      },
      [s],
    ),
    w = k((e) => V && L.byId(e).$critical, [V, L]),
    $ = k(
      (e) => {
        if (O?.auto) {
          const u = L.getSummaryId(e, !0),
            y = L.getSummaryId(a.id, !0);
          return (
            a?.id &&
            !(Array.isArray(u) ? u : [u]).includes(a.id) &&
            !(Array.isArray(y) ? y : [y]).includes(e)
          );
        }
        return a;
      },
      [O, L, a],
    );
  return /* @__PURE__ */ we('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${H.length ? H[0].$h : 0}px` },
    ref: D,
    onContextMenu: re,
    onMouseDown: v,
    onMouseMove: be,
    onTouchStart: se,
    onTouchMove: Ne,
    onTouchEnd: ke,
    onClick: J,
    onDoubleClick: Ce,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ d(Qt, {
        onSelectLink: ne,
        selectedLink: z,
        readonly: n,
      }),
      H.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const u =
            `wx-bar wx-${Ae(e.type)}` +
            (Z && F && e.id === F.id ? ' wx-touch' : '') +
            (a && a.id === e.id ? ' wx-selected' : '') +
            (w(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (E && e.segments ? ' wx-split' : ''),
          y =
            'wx-link wx-left' +
            (a ? ' wx-visible' : '') +
            (!a || (!ce(e.id, !0) && $(e.id)) ? ' wx-target' : '') +
            (a && a.id === e.id && a.start ? ' wx-selected' : '') +
            (w(e.id) ? ' wx-critical' : ''),
          N =
            'wx-link wx-right' +
            (a ? ' wx-visible' : '') +
            (!a || (!ce(e.id, !1) && $(e.id)) ? ' wx-target' : '') +
            (a && a.id === e.id && !a.start ? ' wx-selected' : '') +
            (w(e.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ we(
          wt,
          {
            children: [
              !e.$skip &&
                /* @__PURE__ */ we('div', {
                  className: 'wx-GKbcLEGA ' + u,
                  style: ae(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: K === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === z?.target && z?.type[2] === 's'
                        ? /* @__PURE__ */ d(Ue, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ d('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ d('div', {
                            className: 'wx-GKbcLEGA ' + y,
                            children: /* @__PURE__ */ d('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    e.type !== 'milestone'
                      ? /* @__PURE__ */ we(_e, {
                          children: [
                            e.progress && !(E && e.segments)
                              ? /* @__PURE__ */ d('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ d('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${e.progress}%` },
                                  }),
                                })
                              : null,
                            !n &&
                            !(E && e.segments) &&
                            !(e.type == 'summary' && W?.autoProgress)
                              ? /* @__PURE__ */ d('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${e.progress}% - 10px)`,
                                  },
                                  children: e.progress,
                                })
                              : null,
                            r
                              ? /* @__PURE__ */ d('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ d(r, {
                                    data: e,
                                    api: s,
                                    onAction: l,
                                  }),
                                })
                              : E && e.segments
                                ? /* @__PURE__ */ d(Ut, {
                                    task: e,
                                    type: Ae(e.type),
                                  })
                                : /* @__PURE__ */ d('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: e.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ we(_e, {
                          children: [
                            /* @__PURE__ */ d('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            r
                              ? /* @__PURE__ */ d(r, {
                                  data: e,
                                  api: s,
                                  onAction: l,
                                })
                              : /* @__PURE__ */ d('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: e.text,
                                }),
                          ],
                        }),
                    n
                      ? null
                      : e.id === z?.target && z?.type[2] === 'e'
                        ? /* @__PURE__ */ d(Ue, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ d('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ d('div', {
                            className: 'wx-GKbcLEGA ' + N,
                            children: /* @__PURE__ */ d('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                  ],
                }),
              P && !e.$skip_baseline
                ? /* @__PURE__ */ d('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (e.type === 'milestone' ? ' wx-milestone' : ''),
                    style: G(e),
                  })
                : null,
            ],
          },
          e.id,
        );
      }),
    ],
  });
}
function Jt(t) {
  const { highlightTime: n } = t,
    r = ve(De),
    s = A(r, '_scales');
  return /* @__PURE__ */ d('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: s.width },
    children: (s?.rows || []).map((o, M) =>
      /* @__PURE__ */ d(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${o.height}px` },
          children: (o.cells || []).map((h, f) => {
            const x = n ? n(h.date, h.unit) : '',
              R = 'wx-cell ' + (h.css || '') + ' ' + (x || '');
            return /* @__PURE__ */ d(
              'div',
              {
                className: 'wx-ZkvhDKir ' + R,
                style: { width: `${h.width}px` },
                children: h.value,
              },
              f,
            );
          }),
        },
        M,
      ),
    ),
  });
}
const en = /* @__PURE__ */ new Map();
function tn(t) {
  const n = te(null),
    r = te(0),
    s = te(null),
    o = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    r.current++,
    Q(() => {
      if (o)
        return (
          cancelAnimationFrame(s.current),
          (s.current = requestAnimationFrame(() => {
            const M = {
              label: t,
              time: performance.now() - n.current,
              renders: r.current,
              timestamp: Date.now(),
            };
            en.set(t, M),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: M }),
              );
          })),
          () => cancelAnimationFrame(s.current)
        );
    });
}
function nn(t) {
  const {
      readonly: n,
      fullWidth: r,
      fullHeight: s,
      taskTemplate: o,
      cellBorders: M,
      highlightTime: h,
    } = t,
    f = ve(De),
    [x, R] = je(f, '_selected'),
    m = A(f, 'scrollTop'),
    P = A(f, 'cellHeight'),
    T = A(f, 'cellWidth'),
    c = A(f, '_scales'),
    V = A(f, '_markers'),
    L = A(f, '_scrollTask'),
    O = A(f, 'zoom'),
    [E, W] = oe(),
    H = te(null),
    C = 1 + (c?.rows?.length || 0),
    I = b(() => {
      const i = [];
      return (
        x &&
          x.length &&
          P &&
          x.forEach((p) => {
            i.push({ height: `${P}px`, top: `${p.$y - 3}px` });
          }),
        i
      );
    }, [R, P]),
    a = b(() => Math.max(E || 0, s), [E, s]);
  Q(() => {
    const i = H.current;
    i && typeof m == 'number' && (i.scrollTop = m);
  }, [m]);
  const B = () => {
    F();
  };
  function F(i) {
    const p = H.current;
    if (!p) return;
    const _ = {};
    (_.left = p.scrollLeft), f.exec('scroll-chart', _);
  }
  function ee() {
    const i = H.current,
      _ = Math.ceil((E || 0) / (P || 1)) + 1,
      D = Math.floor(((i && i.scrollTop) || 0) / (P || 1)),
      Y = Math.max(0, D - C),
      K = D + _ + C,
      he = Y * (P || 0);
    f.exec('render-data', {
      start: Y,
      end: K,
      from: he,
    });
  }
  Q(() => {
    ee();
  }, [E, m]);
  const j = k(
    (i) => {
      if (!i) return;
      const { id: p, mode: _ } = i;
      if (_.toString().indexOf('x') < 0) return;
      const D = H.current;
      if (!D) return;
      const { clientWidth: Y } = D,
        K = f.getTask(p);
      if (K.$x + K.$w < D.scrollLeft)
        f.exec('scroll-chart', { left: K.$x - (T || 0) }),
          (D.scrollLeft = K.$x - (T || 0));
      else if (K.$x >= Y + D.scrollLeft) {
        const he = Y < K.$w ? T || 0 : K.$w;
        f.exec('scroll-chart', { left: K.$x - Y + he }),
          (D.scrollLeft = K.$x - Y + he);
      }
    },
    [f, T],
  );
  Q(() => {
    j(L);
  }, [L]);
  function U(i) {
    if (O && (i.ctrlKey || i.metaKey)) {
      i.preventDefault();
      const p = H.current,
        _ = -Math.sign(i.deltaY),
        D = i.clientX - (p ? p.getBoundingClientRect().left : 0);
      f.exec('zoom-scale', {
        dir: _,
        offset: D,
      });
    }
  }
  function X(i) {
    const p = h(i.date, i.unit);
    return p
      ? {
          css: p,
          width: i.width,
        }
      : null;
  }
  const z = b(
      () =>
        c && (c.minUnit === 'hour' || c.minUnit === 'day') && h
          ? c.rows[c.rows.length - 1].cells.map(X)
          : null,
      [c, h],
    ),
    Z = k(
      (i) => {
        (i.eventSource = 'chart'), f.exec('hotkey', i);
      },
      [f],
    );
  Q(() => {
    const i = H.current;
    if (!i) return;
    const p = () => W(i.clientHeight);
    p();
    const _ = new ResizeObserver(() => p());
    return (
      _.observe(i),
      () => {
        _.disconnect();
      }
    );
  }, [H.current]);
  const S = te(null);
  return (
    Q(() => {
      const i = H.current;
      if (i && !S.current)
        return (
          (S.current = ht(i, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (p) => Z(p),
          })),
          () => {
            S.current?.destroy(), (S.current = null);
          }
        );
    }, []),
    Q(() => {
      const i = H.current;
      if (!i) return;
      const p = U;
      return (
        i.addEventListener('wheel', p),
        () => {
          i.removeEventListener('wheel', p);
        }
      );
    }, [U]),
    tn('chart'),
    /* @__PURE__ */ we('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: H,
      onScroll: B,
      children: [
        /* @__PURE__ */ d(Jt, { highlightTime: h, scales: c }),
        V && V.length
          ? /* @__PURE__ */ d('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${a}px` },
              children: V.map((i, p) =>
                /* @__PURE__ */ d(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${i.css || ''}`,
                    style: { left: `${i.left}px` },
                    children: /* @__PURE__ */ d('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: i.text,
                    }),
                  },
                  p,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ we('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${r}px`, height: `${a}px` },
          children: [
            z
              ? /* @__PURE__ */ d('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: z.map((i, p) =>
                    i
                      ? /* @__PURE__ */ d(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + i.css,
                            style: {
                              width: `${i.width}px`,
                              left: `${p * i.width}px`,
                            },
                          },
                          p,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ d(qt, { borders: M }),
            x && x.length
              ? x.map((i, p) =>
                  i.$y
                    ? /* @__PURE__ */ d(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': i.id,
                          style: I[p],
                        },
                        i.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ d(Zt, { readonly: n, taskTemplate: o }),
          ],
        }),
      ],
    })
  );
}
function sn(t) {
  const {
      position: n = 'after',
      size: r = 4,
      dir: s = 'x',
      onMove: o,
      onDisplayChange: M,
      compactMode: h,
      containerWidth: f = 0,
      leftThreshold: x = 50,
      rightThreshold: R = 50,
    } = t,
    [m, P] = Ye(t.value ?? 0),
    [T, c] = Ye(t.display ?? 'all');
  function V(_) {
    let D = 0;
    n == 'center' ? (D = r / 2) : n == 'before' && (D = r);
    const Y = {
      size: [r + 'px', 'auto'],
      p: [_ - D + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (s != 'x') for (let K in Y) Y[K] = Y[K].reverse();
    return Y;
  }
  const [L, O] = oe(!1),
    [E, W] = oe(null),
    H = te(0),
    C = te(),
    I = te(),
    a = te(T);
  Q(() => {
    a.current = T;
  }, [T]),
    Q(() => {
      E === null && m > 0 && W(m);
    }, [E, m]);
  function B(_) {
    return s == 'x' ? _.clientX : _.clientY;
  }
  const F = k(
      (_) => {
        const D = C.current + B(_) - H.current;
        P(D);
        let Y;
        D <= x ? (Y = 'chart') : f - D <= R ? (Y = 'grid') : (Y = 'all'),
          a.current !== Y && (c(Y), (a.current = Y)),
          I.current && clearTimeout(I.current),
          (I.current = setTimeout(() => o && o(D), 100));
      },
      [f, x, R, o],
    ),
    ee = k(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        O(!1),
        window.removeEventListener('mousemove', F),
        window.removeEventListener('mouseup', ee);
    }, [F]),
    j = b(
      () => (T !== 'all' ? 'auto' : s == 'x' ? 'ew-resize' : 'ns-resize'),
      [T, s],
    ),
    U = k(
      (_) => {
        (!h && (T === 'grid' || T === 'chart')) ||
          ((H.current = B(_)),
          (C.current = m),
          O(!0),
          (document.body.style.cursor = j),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', F),
          window.addEventListener('mouseup', ee));
      },
      [j, F, ee, m, h, T],
    );
  function X() {
    c('all'), E !== null && (P(E), o && o(E));
  }
  function z(_) {
    if (h) {
      const D = T === 'chart' ? 'grid' : 'chart';
      c(D), M(D);
    } else if (T === 'grid' || T === 'chart') X(), M('all');
    else {
      const D = _ === 'left' ? 'chart' : 'grid';
      c(D), M(D);
    }
  }
  function Z() {
    z('left');
  }
  function S() {
    z('right');
  }
  const i = b(() => V(m), [m, n, r, s]),
    p = [
      'wx-resizer',
      `wx-resizer-${s}`,
      `wx-resizer-display-${T}`,
      L ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ we('div', {
    className: 'wx-pFykzMlT ' + p,
    onMouseDown: U,
    style: { width: i.size[0], height: i.size[1], cursor: j },
    children: [
      /* @__PURE__ */ we('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ d('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ d('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: Z,
            }),
          }),
          /* @__PURE__ */ d('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ d('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: S,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ d('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const rn = 650;
function mt(t) {
  let n;
  function r() {
    (n = new ResizeObserver((o) => {
      for (let M of o)
        if (M.target === document.body) {
          let h = M.contentRect.width <= rn;
          t(h);
        }
    })),
      n.observe(document.body);
  }
  function s() {
    n && (n.disconnect(), (n = null));
  }
  return {
    observe: r,
    disconnect: s,
  };
}
function on(t) {
  const {
      taskTemplate: n,
      readonly: r,
      cellBorders: s,
      highlightTime: o,
      onTableAPIChange: M,
    } = t,
    h = ve(De),
    f = A(h, '_tasks'),
    x = A(h, '_scales'),
    R = A(h, 'cellHeight'),
    m = A(h, 'columns'),
    P = A(h, '_scrollTask'),
    T = A(h, 'undo'),
    [c, V] = oe(!1);
  let [L, O] = oe(0);
  const [E, W] = oe(0),
    [H, C] = oe(0),
    [I, a] = oe(void 0),
    [B, F] = oe('all'),
    ee = te(null),
    j = k(
      (v) => {
        V(
          (se) => (
            v !== se &&
              (v
                ? ((ee.current = B), B === 'all' && F('grid'))
                : (!ee.current || ee.current === 'all') && F('all')),
            v
          ),
        );
      },
      [B],
    );
  Q(() => {
    const v = mt(j);
    return (
      v.observe(),
      () => {
        v.disconnect();
      }
    );
  }, [j]);
  const U = b(() => {
    let v;
    return (
      m.every((se) => se.width && !se.flexgrow)
        ? (v = m.reduce((se, ne) => se + parseInt(ne.width), 0))
        : c && B === 'chart'
          ? (v = parseInt(m.find((se) => se.id === 'action')?.width) || 50)
          : (v = 440),
      (L = v),
      v
    );
  }, [m, c, B]);
  Q(() => {
    O(U);
  }, [U]);
  const X = b(() => (E ?? 0) - (I ?? 0), [E, I]),
    z = b(() => x.width, [x]),
    Z = b(() => f.length * R, [f, R]),
    S = b(() => x.height + Z + X, [x, Z, X]),
    i = b(() => L + z, [L, z]),
    p = te(null),
    _ = k(() => {
      Promise.resolve().then(() => {
        if ((E ?? 0) > (i ?? 0)) {
          const v = (E ?? 0) - L;
          h.exec('expand-scale', { minWidth: v });
        }
      });
    }, [E, i, L, h]);
  Q(() => {
    let v;
    return (
      p.current && ((v = new ResizeObserver(_)), v.observe(p.current)),
      () => {
        v && v.disconnect();
      }
    );
  }, [p.current, _]),
    Q(() => {
      _();
    }, [z]);
  const D = te(null),
    Y = te(null),
    K = k(() => {
      const v = D.current;
      v &&
        h.exec('scroll-chart', {
          top: v.scrollTop,
        });
    }, [h]),
    he = te({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  Q(() => {
    he.current = {
      rTasks: f,
      rScales: x,
      rCellHeight: R,
      scrollSize: X,
      ganttDiv: D.current,
      ganttHeight: H ?? 0,
    };
  }, [f, x, R, X, H]);
  const me = k(
    (v) => {
      if (!v) return;
      const {
        rTasks: se,
        rScales: ne,
        rCellHeight: le,
        scrollSize: Te,
        ganttDiv: be,
        ganttHeight: Ne,
      } = he.current;
      if (!be) return;
      const { id: ue } = v,
        ke = se.findIndex((Ce) => Ce.id === ue);
      if (ke > -1) {
        const Ce = Ne - ne.height,
          ie = ke * le,
          fe = be.scrollTop;
        let ce = null;
        ie < fe ? (ce = ie) : ie + le > fe + Ce && (ce = ie - Ce + le + Te),
          ce !== null &&
            (h.exec('scroll-chart', { top: Math.max(ce, 0) }),
            (D.current.scrollTop = Math.max(ce, 0)));
      }
    },
    [h],
  );
  Q(() => {
    me(P);
  }, [P]),
    Q(() => {
      const v = D.current,
        se = Y.current;
      if (!v || !se) return;
      const ne = () => {
          Vt(() => {
            C(v.offsetHeight), W(v.offsetWidth), a(se.offsetWidth);
          });
        },
        le = new ResizeObserver(ne);
      return le.observe(v), () => le.disconnect();
    }, [D.current]);
  const xe = te(null),
    de = te(null);
  return (
    Q(() => {
      de.current && (de.current.destroy(), (de.current = null));
      const v = xe.current;
      if (v)
        return (
          (de.current = ht(v, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': T,
              'ctrl+y': T,
            },
            exec: (se) => {
              se.isInput || h.exec('hotkey', se);
            },
          })),
          () => {
            de.current?.destroy(), (de.current = null);
          }
        );
    }, [T]),
    /* @__PURE__ */ d('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: D,
      onScroll: K,
      children: /* @__PURE__ */ d('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: S, width: '100%' },
        ref: Y,
        children: /* @__PURE__ */ d('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: H,
            width: I,
          },
          children: /* @__PURE__ */ we('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: xe,
            children: [
              m.length
                ? /* @__PURE__ */ we(_e, {
                    children: [
                      /* @__PURE__ */ d(jt, {
                        display: B,
                        compactMode: c,
                        columnWidth: U,
                        width: L,
                        readonly: r,
                        fullHeight: Z,
                        onTableAPIChange: M,
                      }),
                      /* @__PURE__ */ d(sn, {
                        value: L,
                        display: B,
                        compactMode: c,
                        containerWidth: E,
                        onMove: (v) => O(v),
                        onDisplayChange: (v) => F(v),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ d('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: p,
                children: /* @__PURE__ */ d(nn, {
                  readonly: r,
                  fullWidth: z,
                  fullHeight: Z,
                  taskTemplate: n,
                  cellBorders: s,
                  highlightTime: o,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function ln(t) {
  return {
    year: '%Y',
    quarter: `${t('Q')} %Q`,
    month: '%M',
    week: `${t('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function cn(t, n) {
  return typeof t == 'function' ? t : Ve(t, n);
}
function xt(t, n) {
  return t.map(({ format: r, ...s }) => ({
    ...s,
    format: cn(r, n),
  }));
}
function an(t, n) {
  const r = ln(n);
  for (let s in r) r[s] = Ve(r[s], t);
  return r;
}
function dn(t, n) {
  if (!t || !t.length) return t;
  const r = Ve('%d-%m-%Y', n);
  return t.map((s) =>
    s.template
      ? s
      : s.id === 'start' || s.id == 'end'
        ? {
            ...s,
            //store locale template for unscheduled tasks
            _template: (o) => r(o),
            template: (o) => r(o),
          }
        : s.id === 'duration'
          ? {
              ...s,
              _template: (o) => o,
              template: (o) => o,
            }
          : s,
  );
}
function un(t, n) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((r) => ({
          ...r,
          scales: xt(r.scales, n),
        })),
      }
    : t;
}
const fn = (t) =>
    t
      .split('-')
      .map((n) => (n ? n.charAt(0).toUpperCase() + n.slice(1) : ''))
      .join(''),
  hn = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  An = ct(function (
    {
      taskTemplate: n = null,
      markers: r = [],
      taskTypes: s = Gt,
      tasks: o = [],
      selected: M = [],
      activeTask: h = null,
      links: f = [],
      scales: x = hn,
      columns: R = zt,
      start: m = null,
      end: P = null,
      lengthUnit: T = 'day',
      durationUnit: c = 'day',
      cellWidth: V = 100,
      cellHeight: L = 38,
      scaleHeight: O = 36,
      readonly: E = !1,
      cellBorders: W = 'full',
      zoom: H = !1,
      baselines: C = !1,
      highlightTime: I = null,
      init: a = null,
      autoScale: B = !0,
      unscheduledTasks: F = !1,
      criticalPath: ee = null,
      schedule: j = { type: 'forward' },
      projectStart: U = null,
      projectEnd: X = null,
      calendar: z = null,
      undo: Z = !1,
      splitTasks: S = !1,
      summary: i = null,
      _export: p = !1,
      ..._
    },
    D,
  ) {
    const Y = te();
    Y.current = _;
    const K = b(() => new At(_t), []),
      he = b(() => ({ ...qe, ...Ke }), []),
      me = ve(Re.i18n),
      xe = b(() => (me ? me.extend(he, !0) : Fe(he)), [me, he]),
      de = b(() => xe.getRaw().calendar, [xe]),
      v = b(() => {
        let ie = {
          zoom: un(H, de),
          scales: xt(x, de),
          columns: dn(R, de),
          links: It(f),
          cellWidth: V,
        };
        return (
          ie.zoom &&
            (ie = {
              ...ie,
              ...Ht(ie.zoom, an(de, xe.getGroup('gantt')), ie.scales, V),
            }),
          ie
        );
      }, [H, x, R, f, V, de, xe]),
      se = te(null);
    se.current !== o &&
      (p || tt(o, { durationUnit: c, splitTasks: S, calendar: z }),
      (se.current = o)),
      Q(() => {
        p || tt(o, { durationUnit: c, splitTasks: S, calendar: z });
      }, [o, c, z, S, p]);
    const ne = b(() => K.in, [K]),
      le = te(null);
    le.current === null &&
      ((le.current = new Rt((ie, fe) => {
        const ce = 'on' + fn(ie);
        Y.current && Y.current[ce] && Y.current[ce](fe);
      })),
      ne.setNext(le.current));
    const [Te, be] = oe(null),
      Ne = te(null);
    Ne.current = Te;
    const ue = b(
      () => ({
        getState: K.getState.bind(K),
        getReactiveState: K.getReactive.bind(K),
        getStores: () => ({ data: K }),
        exec: ne.exec.bind(ne),
        setNext: (ie) => ((le.current = le.current.setNext(ie)), le.current),
        intercept: ne.intercept.bind(ne),
        on: ne.on.bind(ne),
        detach: ne.detach.bind(ne),
        getTask: K.getTask.bind(K),
        serialize: () => K.serialize(),
        getTable: (ie) =>
          ie
            ? new Promise((fe) => setTimeout(() => fe(Ne.current), 1))
            : Ne.current,
        getHistory: () => K.getHistory(),
      }),
      [K, ne],
    );
    Q(() => {
      ue.intercept('set-scale', ({ unit: ie, date: fe }) => {
        const { zoom: ce } = ue.getState();
        if (!ce || !ce.levels) return !1;
        const g = ce.levels.findIndex((G) =>
          G.scales.some((re) => re.unit === ie),
        );
        if (g < 0) return !1;
        const J = ce.levels[g];
        if (g !== ce.level) {
          const G = Math.round((J.minCellWidth + J.maxCellWidth) / 2);
          ue.getStores().data.setState({
            scales: J.scales,
            cellWidth: G,
            _cellWidth: G,
            zoom: { ...ce, level: g },
            ...(fe ? { _scaleDate: fe, _zoomOffset: 0 } : {}),
          });
        } else if (fe) {
          const { _scales: G, cellWidth: re } = ue.getState(),
            $e = G.diff(fe, G.start, G.lengthUnit),
            Ae = Math.max(0, Math.round($e * re));
          ue.exec('scroll-chart', { left: Ae });
        }
        return !1;
      });
    }, [ue]),
      at(
        D,
        () => ({
          ...ue,
        }),
        [ue],
      );
    const ke = te(0);
    Q(() => {
      ke.current
        ? K.init({
            tasks: o,
            links: v.links,
            start: m,
            columns: v.columns,
            end: P,
            lengthUnit: T,
            cellWidth: v.cellWidth,
            cellHeight: L,
            scaleHeight: O,
            scales: v.scales,
            taskTypes: s,
            zoom: v.zoom,
            selected: M,
            activeTask: h,
            baselines: C,
            autoScale: B,
            unscheduledTasks: F,
            markers: r,
            durationUnit: c,
            criticalPath: ee,
            schedule: j,
            projectStart: U,
            projectEnd: X,
            calendar: z,
            undo: Z,
            _weekStart: de.weekStart,
            splitTasks: S,
            summary: i,
          })
        : a && a(ue),
        ke.current++;
    }, [
      ue,
      a,
      o,
      v,
      m,
      P,
      T,
      L,
      O,
      s,
      M,
      h,
      C,
      B,
      F,
      r,
      c,
      ee,
      j,
      U,
      X,
      z,
      Z,
      de,
      S,
      i,
      K,
    ]),
      ke.current === 0 &&
        K.init({
          tasks: o,
          links: v.links,
          start: m,
          columns: v.columns,
          end: P,
          lengthUnit: T,
          cellWidth: v.cellWidth,
          cellHeight: L,
          scaleHeight: O,
          scales: v.scales,
          taskTypes: s,
          zoom: v.zoom,
          selected: M,
          activeTask: h,
          baselines: C,
          autoScale: B,
          unscheduledTasks: F,
          markers: r,
          durationUnit: c,
          criticalPath: ee,
          schedule: j,
          projectStart: U,
          projectEnd: X,
          calendar: z,
          undo: Z,
          _weekStart: de.weekStart,
          splitTasks: S,
          summary: i,
        });
    const Ce = b(
      () =>
        z
          ? (ie, fe) =>
              (fe == 'day' && !z.getDayHours(ie)) ||
              (fe == 'hour' && !z.getDayHours(ie))
                ? 'wx-weekend'
                : ''
          : I,
      [z, I],
    );
    return /* @__PURE__ */ d(Re.i18n.Provider, {
      value: xe,
      children: /* @__PURE__ */ d(De.Provider, {
        value: ue,
        children: /* @__PURE__ */ d(on, {
          taskTemplate: n,
          readonly: E,
          cellBorders: W,
          highlightTime: Ce,
          onTableAPIChange: be,
        }),
      }),
    });
  });
function In({ api: t = null, items: n = [] }) {
  const r = ve(Re.i18n),
    s = b(() => r || Fe(Ke), [r]),
    o = b(() => s.getGroup('gantt'), [s]),
    M = Ee(t, '_selected'),
    h = Ee(t, 'undo'),
    f = Ee(t, 'history'),
    x = Ee(t, 'splitTasks'),
    R = ['undo', 'redo'],
    m = b(() => {
      const T = nt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : nt({
              undo: h,
              splitTasks: x,
            })
      ).map((V) => {
        let L = { ...V, disabled: !1 };
        return (
          (L.handler = ft(T, L.id) ? (O) => ut(t, O.id, null, o) : L.handler),
          L.text && (L.text = o(L.text)),
          L.menuText && (L.menuText = o(L.menuText)),
          L
        );
      });
    }, [n, t, o, h, x]),
    P = b(() => {
      const T = [];
      return (
        m.forEach((c) => {
          const V = c.id;
          if (V === 'add-task') T.push(c);
          else if (R.includes(V))
            R.includes(V) &&
              T.push({
                ...c,
                disabled: c.isDisabled(f),
              });
          else {
            if (!M?.length || !t) return;
            T.push({
              ...c,
              disabled:
                c.isDisabled && M.some((L) => c.isDisabled(L, t.getState())),
            });
          }
        }),
        T.filter((c, V) => {
          if (t && c.isHidden)
            return !M.some((L) => c.isHidden(L, t.getState()));
          if (c.comp === 'separator') {
            const L = T[V + 1];
            if (!L || L.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, M, f, m]);
  return r
    ? /* @__PURE__ */ d(rt, { items: P })
    : /* @__PURE__ */ d(Re.i18n.Provider, {
        value: s,
        children: /* @__PURE__ */ d(rt, { items: P }),
      });
}
const Hn = ct(function (
  {
    options: n = [],
    api: r = null,
    resolver: s = null,
    filter: o = null,
    at: M = 'point',
    children: h,
    onClick: f,
    css: x,
  },
  R,
) {
  const m = te(null),
    P = te(null),
    T = ve(Re.i18n),
    c = b(() => T || Fe({ ...Ke, ...qe }), [T]),
    V = b(() => c.getGroup('gantt'), [c]),
    L = Ee(r, 'taskTypes'),
    O = Ee(r, 'selected'),
    E = Ee(r, '_selected'),
    W = Ee(r, 'splitTasks'),
    H = Ee(r, 'summary'),
    C = b(
      () => ({
        splitTasks: W,
        taskTypes: L,
        summary: H,
      }),
      [W, L, H],
    ),
    I = b(() => st(C), [C]);
  Q(() => {
    r &&
      (r.on('scroll-chart', () => {
        m.current && m.current.show && m.current.show();
      }),
      r.on('drag-task', () => {
        m.current && m.current.show && m.current.show();
      }));
  }, [r]);
  function a(S) {
    return S.map(
      (i) => (
        (i = { ...i }),
        i.text && (i.text = V(i.text)),
        i.subtext && (i.subtext = V(i.subtext)),
        i.data && (i.data = a(i.data)),
        i
      ),
    );
  }
  function B() {
    const S = n.length ? n : st(C);
    return a(S);
  }
  const F = b(() => B(), [r, n, C, V]),
    ee = b(() => (E && E.length ? E : []), [E]),
    j = k(
      (S, i) => {
        let p = S ? r?.getTask(S) : null;
        if (s) {
          const _ = s(S, i);
          p = _ === !0 ? p : _;
        }
        if (p) {
          const _ = ze(i.target, 'data-segment');
          _ !== null
            ? (P.current = { id: p.id, segmentIndex: _ })
            : (P.current = p.id),
            (!Array.isArray(O) || !O.includes(p.id)) &&
              r &&
              r.exec &&
              r.exec('select-task', { id: p.id });
        }
        return p;
      },
      [r, s, O],
    ),
    U = k(
      (S) => {
        const i = S.action;
        i && (ft(I, i.id) && ut(r, i.id, P.current, V), f && f(S));
      },
      [r, V, f, I],
    ),
    X = k(
      (S, i) => {
        const p = ee.length ? ee : i ? [i] : [];
        let _ = o ? p.every((D) => o(S, D)) : !0;
        if (
          _ &&
          (S.isHidden &&
            (_ = !p.some((D) => S.isHidden(D, r.getState(), P.current))),
          S.isDisabled)
        ) {
          const D = p.some((Y) => S.isDisabled(Y, r.getState(), P.current));
          S.disabled = D;
        }
        return _;
      },
      [o, ee, r],
    );
  at(R, () => ({
    show: (S, i) => {
      m.current && m.current.show && m.current.show(S, i);
    },
  }));
  const z = k((S) => {
      m.current && m.current.show && m.current.show(S);
    }, []),
    Z = /* @__PURE__ */ we(_e, {
      children: [
        /* @__PURE__ */ d(Ft, {
          filter: X,
          options: F,
          dataKey: 'id',
          resolver: j,
          onClick: U,
          at: M,
          ref: m,
          css: x,
        }),
        /* @__PURE__ */ d('span', {
          onContextMenu: z,
          'data-menu-ignore': 'true',
          children: typeof h == 'function' ? h() : h,
        }),
      ],
    });
  if (!T && Re.i18n?.Provider) {
    const S = Re.i18n.Provider;
    return /* @__PURE__ */ d(S, { value: c, children: Z });
  }
  return Z;
});
function mn({ api: t, autoSave: n, onLinksChange: r }) {
  const o = ve(Re.i18n).getGroup('gantt'),
    M = A(t, 'activeTask'),
    h = A(t, '_activeTask'),
    f = A(t, '_links'),
    x = A(t, 'schedule'),
    R = A(t, 'unscheduledTasks'),
    [m, P] = oe();
  function T() {
    if (M) {
      const O = f
          .filter((W) => W.target == M)
          .map((W) => ({ link: W, task: t.getTask(W.source) })),
        E = f
          .filter((W) => W.source == M)
          .map((W) => ({ link: W, task: t.getTask(W.target) }));
      return [
        { title: o('Predecessors'), data: O },
        { title: o('Successors'), data: E },
      ];
    }
  }
  Q(() => {
    P(T());
  }, [M, f]);
  const c = b(
    () => [
      { id: 'e2s', label: o('End-to-start') },
      { id: 's2s', label: o('Start-to-start') },
      { id: 'e2e', label: o('End-to-end') },
      { id: 's2e', label: o('Start-to-end') },
    ],
    [o],
  );
  function V(O) {
    n
      ? t.exec('delete-link', { id: O })
      : (P((E) =>
          (E || []).map((W) => ({
            ...W,
            data: W.data.filter((H) => H.link.id !== O),
          })),
        ),
        r &&
          r({
            id: O,
            action: 'delete-link',
            data: { id: O },
          }));
  }
  function L(O, E) {
    n
      ? t.exec('update-link', {
          id: O,
          link: E,
        })
      : (P((W) =>
          (W || []).map((H) => ({
            ...H,
            data: H.data.map((C) =>
              C.link.id === O ? { ...C, link: { ...C.link, ...E } } : C,
            ),
          })),
        ),
        r &&
          r({
            id: O,
            action: 'update-link',
            data: {
              id: O,
              link: E,
            },
          }));
  }
  return /* @__PURE__ */ d(_e, {
    children: (m || []).map((O, E) =>
      O.data.length
        ? /* @__PURE__ */ d(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ d(Re.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ d(pt, {
                  label: O.title,
                  position: 'top',
                  children: /* @__PURE__ */ d('table', {
                    children: /* @__PURE__ */ d('tbody', {
                      children: O.data.map((W) =>
                        /* @__PURE__ */ we(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ d('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ d('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: W.task.text || '',
                                }),
                              }),
                              x?.auto && W.link.type === 'e2s'
                                ? /* @__PURE__ */ d('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ d(yt, {
                                      type: 'number',
                                      placeholder: o('Lag'),
                                      value: W.link.lag,
                                      disabled: R && h?.unscheduled,
                                      onChange: (H) => {
                                        H.input ||
                                          L(W.link.id, { lag: H.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ d('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ d('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ d(kt, {
                                    value: W.link.type,
                                    placeholder: o('Select link type'),
                                    options: c,
                                    onChange: (H) =>
                                      L(W.link.id, { type: H.value }),
                                    children: ({ option: H }) => H.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ d('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ d('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => V(W.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          W.link.id,
                        ),
                      ),
                    }),
                  }),
                }),
              }),
            },
            E,
          )
        : null,
    ),
  });
}
function xn(t) {
  const { value: n, time: r, format: s, onchange: o, onChange: M, ...h } = t,
    f = M ?? o;
  function x(R) {
    const m = new Date(R.value);
    m.setHours(n.getHours()),
      m.setMinutes(n.getMinutes()),
      f && f({ value: m });
  }
  return /* @__PURE__ */ we('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ d(bt, {
        ...h,
        value: n,
        onChange: x,
        format: s,
        buttons: ['today'],
        clear: !1,
      }),
      r ? /* @__PURE__ */ d(vt, { value: n, onChange: f, format: s }) : null,
    ],
  });
}
We('select', Ct);
We('date', xn);
We('twostate', $t);
We('slider', Nt);
We('counter', Mt);
We('links', mn);
function zn({
  api: t,
  items: n = [],
  css: r = '',
  layout: s = 'default',
  readonly: o = !1,
  placement: M = 'sidebar',
  bottomBar: h = !0,
  topBar: f = !0,
  autoSave: x = !0,
  focus: R = !1,
  hotkeys: m = {},
}) {
  const P = ve(Re.i18n),
    T = b(() => P || Fe({ ...Ke, ...qe }), [P]),
    c = b(() => T.getGroup('gantt'), [T]),
    V = T.getRaw(),
    L = b(() => {
      const g = V.gantt?.dateFormat || V.formats?.dateFormat;
      return Ve(g, V.calendar);
    }, [V]),
    O = b(() => {
      if (f === !0 && !o) {
        const g = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: c('Delete'),
            id: 'delete',
          },
        ];
        return x
          ? { items: g }
          : {
              items: [
                ...g,
                {
                  comp: 'button',
                  type: 'primary',
                  text: c('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return f;
    }, [f, o, x, c]),
    [E, W] = oe(!1),
    H = b(() => (E ? 'wx-full-screen' : ''), [E]),
    C = k((g) => {
      W(g);
    }, []);
  Q(() => {
    const g = mt(C);
    return (
      g.observe(),
      () => {
        g.disconnect();
      }
    );
  }, [C]);
  const I = A(t, '_activeTask'),
    a = A(t, 'activeTask'),
    B = A(t, 'unscheduledTasks'),
    F = A(t, 'summary'),
    ee = A(t, 'links'),
    j = A(t, 'splitTasks'),
    U = b(() => j && a?.segmentIndex, [j, a]),
    X = b(() => U || U === 0, [U]),
    z = A(t, 'taskTypes'),
    Z = b(
      () => Wt({ unscheduledTasks: B, summary: F, taskTypes: z }),
      [B, F, z],
    ),
    S = A(t, 'undo'),
    [i, p] = oe({}),
    [_, D] = oe(null),
    [Y, K] = oe(),
    [he, me] = oe(null),
    xe = b(() => {
      if (!I) return null;
      let g;
      if ((X && I.segments ? (g = { ...I.segments[U] }) : (g = { ...I }), o)) {
        let J = { parent: g.parent };
        return (
          Z.forEach(({ key: ae, comp: G }) => {
            if (G !== 'links') {
              const re = g[ae];
              G === 'date' && re instanceof Date
                ? (J[ae] = L(re))
                : G === 'slider' && ae === 'progress'
                  ? (J[ae] = `${re}%`)
                  : (J[ae] = re);
            }
          }),
          J
        );
      }
      return g || null;
    }, [I, X, U, o, Z, L]);
  Q(() => {
    K(xe);
  }, [xe]),
    Q(() => {
      p({}), me(null), D(null);
    }, [a]);
  function de(g, J) {
    return g.map((ae) => {
      const G = { ...ae };
      if (
        (ae.config && (G.config = { ...G.config }),
        G.comp === 'links' &&
          t &&
          ((G.api = t), (G.autoSave = x), (G.onLinksChange = ne)),
        G.comp === 'select' && G.key === 'type')
      ) {
        const re = G.options ?? [];
        G.options = re.map(($e) => ({
          ...$e,
          label: c($e.label),
        }));
      }
      return (
        G.comp === 'slider' &&
          G.key === 'progress' &&
          (G.labelTemplate = (re) => `${c(G.label)} ${re}%`),
        G.label && (G.label = c(G.label)),
        G.config?.placeholder &&
          (G.config.placeholder = c(G.config.placeholder)),
        J &&
          (G.isDisabled && G.isDisabled(J, t.getState())
            ? (G.disabled = !0)
            : delete G.disabled),
        G
      );
    });
  }
  const v = b(() => {
      let g = n.length ? n : Z;
      return (
        (g = de(g, Y)),
        Y ? g.filter((J) => !J.isHidden || !J.isHidden(Y, t.getState())) : g
      );
    }, [n, Z, Y, c, t, x]),
    se = b(() => v.map((g) => g.key), [v]);
  function ne({ id: g, action: J, data: ae }) {
    p((G) => ({
      ...G,
      [g]: { action: J, data: ae },
    }));
  }
  const le = k(() => {
      for (let g in i)
        if (ee.byId(g)) {
          const { action: J, data: ae } = i[g];
          t.exec(J, ae);
        }
    }, [t, i, ee]),
    Te = k(() => {
      const g = a?.id || a;
      if (X) {
        if (I?.segments) {
          const J = I.segments.filter((ae, G) => G !== U);
          t.exec('update-task', {
            id: g,
            task: { segments: J },
          });
        }
      } else t.exec('delete-task', { id: g });
    }, [t, a, X, I, U]),
    be = k(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    Ne = k(
      (g) => {
        const { item: J, changes: ae } = g;
        J.id === 'delete' && Te(),
          J.id === 'save' && (ae.length ? be() : le()),
          J.comp && be();
      },
      [t, a, x, le, Te, be],
    ),
    ue = k(
      (g, J, ae) => (
        B && g.type === 'summary' && (g.unscheduled = !1),
        dt(g, t.getState(), J),
        ae || D(!1),
        g
      ),
      [B, t],
    ),
    ke = k(
      (g) => {
        (g = {
          ...g,
          unscheduled: B && g.unscheduled && g.type !== 'summary',
        }),
          delete g.links,
          delete g.data,
          (se.indexOf('duration') === -1 || (g.segments && !g.duration)) &&
            delete g.duration;
        const J = {
          id: a?.id || a,
          task: g,
          ...(X && { segmentIndex: U }),
        };
        x && _ && (J.inProgress = _), t.exec('update-task', J), x || le();
      },
      [t, a, B, x, le, se, X, U, _],
    ),
    Ce = k(
      (g) => {
        let { update: J, key: ae, input: G } = g;
        if ((G && D(!0), (g.update = ue({ ...J }, ae, G)), !x)) K(g.update);
        else if (!he && !G) {
          const re = v.find((l) => l.key === ae),
            $e = J[ae];
          (!re.validation || re.validation($e)) &&
            (!re.required || $e) &&
            ke(g.update);
        }
      },
      [x, ue, he, v, ke],
    ),
    ie = k(
      (g) => {
        x || ke(g.values);
      },
      [x, ke],
    ),
    fe = k((g) => {
      me(g.errors);
    }, []),
    ce = b(
      () =>
        S
          ? {
              'ctrl+z': (g) => {
                g.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (g) => {
                g.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [S, t],
    );
  return xe
    ? /* @__PURE__ */ d(Tt, {
        children: /* @__PURE__ */ d(Kt, {
          css: `wx-XkvqDXuw wx-gantt-editor ${H} ${r}`,
          items: v,
          values: xe,
          topBar: O,
          bottomBar: h,
          placement: M,
          layout: s,
          readonly: o,
          autoSave: x,
          focus: R,
          onAction: Ne,
          onSave: ie,
          onValidation: fe,
          onChange: Ce,
          hotkeys: m && { ...ce, ...m },
        }),
      })
    : null;
}
const Gn = ({ children: t, columns: n = null, api: r }) => {
  const [s, o] = oe(null);
  return (
    Q(() => {
      r && r.getTable(!0).then(o);
    }, [r]),
    /* @__PURE__ */ d(Ot, { api: s, columns: n, children: t })
  );
};
function Wn(t) {
  const { api: n, content: r, children: s } = t,
    o = te(null),
    M = te(null),
    [h, f] = oe({}),
    [x, R] = oe(null),
    [m, P] = oe({});
  function T(C) {
    for (; C; ) {
      if (C.getAttribute) {
        const I = C.getAttribute('data-tooltip-id'),
          a = C.getAttribute('data-tooltip-at'),
          B = C.getAttribute('data-tooltip');
        if (I || B) return { id: I, tooltip: B, target: C, at: a };
      }
      C = C.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  Q(() => {
    const C = M.current;
    if (C && m && (m.text || r)) {
      const I = C.getBoundingClientRect();
      let a = !1,
        B = m.left,
        F = m.top;
      I.right >= h.right && ((B = h.width - I.width - 5), (a = !0)),
        I.bottom >= h.bottom &&
          ((F = m.top - (I.bottom - h.bottom + 2)), (a = !0)),
        a && P((ee) => ee && { ...ee, left: B, top: F });
    }
  }, [m, h, r]);
  const c = te(null),
    V = 300,
    L = (C) => {
      clearTimeout(c.current),
        (c.current = setTimeout(() => {
          C();
        }, V));
    };
  function O(C) {
    let { id: I, tooltip: a, target: B, at: F } = T(C.target);
    if ((P(null), R(null), !a))
      if (I) a = W(I);
      else {
        clearTimeout(c.current);
        return;
      }
    const ee = C.clientX;
    L(() => {
      I && R(E(H(I)));
      const j = B.getBoundingClientRect(),
        U = o.current,
        X = U
          ? U.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let z, Z;
      F === 'left'
        ? ((z = j.top + 5 - X.top), (Z = j.right + 5 - X.left))
        : ((z = j.top + j.height - X.top), (Z = ee - X.left)),
        f(X),
        P({ top: z, left: Z, text: a });
    });
  }
  function E(C) {
    return n?.getTask(H(C)) || null;
  }
  function W(C) {
    return E(C)?.text || '';
  }
  function H(C) {
    const I = parseInt(C);
    return isNaN(I) ? C : I;
  }
  return /* @__PURE__ */ we('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: O,
    children: [
      m && (m.text || r)
        ? /* @__PURE__ */ d('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: M,
            style: { top: `${m.top}px`, left: `${m.left}px` },
            children: r
              ? /* @__PURE__ */ d(r, { data: x })
              : m.text
                ? /* @__PURE__ */ d('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: m.text,
                  })
                : null,
          })
        : null,
      s,
    ],
  });
}
function _n({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ d(Ze, { fonts: t, children: n() })
    : /* @__PURE__ */ d(Ze, { fonts: t });
}
function Pn({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ d(Je, { fonts: t, children: n })
    : /* @__PURE__ */ d(Je, { fonts: t });
}
function On({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ d(et, { fonts: t, children: n })
    : /* @__PURE__ */ d(et, { fonts: t });
}
const gn = '2.5.2',
  wn = {
    version: gn,
  },
  Vn = wn.version;
export {
  Hn as ContextMenu,
  zn as Editor,
  An as Gantt,
  Gn as HeaderMenu,
  _n as Material,
  In as Toolbar,
  Wn as Tooltip,
  Pn as Willow,
  On as WillowDark,
  Bn as defaultColumns,
  Xn as defaultEditorItems,
  Yn as defaultMenuOptions,
  jn as defaultTaskTypes,
  qn as defaultToolbarButtons,
  Qn as getEditorItems,
  Un as getMenuOptions,
  Zn as getToolbarButtons,
  ts as registerEditorItem,
  Jn as registerScaleUnit,
  Vn as version,
};
//# sourceMappingURL=index.es.js.map
