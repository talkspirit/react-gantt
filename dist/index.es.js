import { jsxs as we, jsx as d, Fragment as _e } from 'react/jsx-runtime';
import {
  createContext as gt,
  useContext as ve,
  useMemo as b,
  useState as ie,
  useCallback as k,
  useRef as te,
  useEffect as U,
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
  Counter as St,
  Material as Ze,
  Willow as Je,
  WillowDark as et,
} from '@svar-ui/react-core';
import {
  locate as Le,
  locateID as He,
  locateAttr as Mt,
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
  normalizeLinks as zt,
  normalizeZoom as It,
  defaultColumns as Ht,
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
  let r, s, o, S, h, f, x, R, m;
  function P(a) {
    (S = a.clientX),
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
        window.addEventListener('touchend', I));
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
      document.body.removeEventListener('touchend', I),
      (document.body.style.userSelect = ''),
      a &&
        (t.removeEventListener('mousedown', V),
        t.removeEventListener('touchstart', T));
  }
  function O(a) {
    const B = a.clientX - S,
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
        Z = j.$y;
      if (!f.start && f.y == Z) return z();
      (f.start = !0), (f.y = j.$y - 4), (s.style.top = ee + 'px');
      const X = document.elementFromPoint(a.clientX, a.clientY),
        H = Le(X);
      if (H && H !== r) {
        const J = Ge(H),
          M = H.getBoundingClientRect(),
          i = M.top + M.height / 2,
          p = a.clientY + f.db > i && H.nextElementSibling !== r,
          _ = a.clientY - f.dt < i && H.previousElementSibling !== r;
        x?.after == J || x?.before == J
          ? (x = null)
          : p
            ? (x = { id: o, after: J })
            : _ && (x = { id: o, before: J });
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
  function I() {
    (R = null), m && (clearTimeout(m), (m = null)), z();
  }
  function C() {
    z();
  }
  function z() {
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
  function s(S, h) {
    return {
      justifyContent: h.align,
      paddingLeft: `${(S.$level - 1) * 20}px`,
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
      columnWidth: S = 0,
      onTableAPIChange: h,
    } = t,
    [f, x] = Ye(S),
    [R, m] = ie(),
    P = ve(Re.i18n),
    T = b(() => P.getGroup('gantt'), [P]),
    c = ve(De),
    V = A(c, 'scrollTop'),
    L = A(c, 'cellHeight'),
    O = A(c, '_scrollTask'),
    E = A(c, '_selected'),
    W = A(c, 'area'),
    I = A(c, '_tasks'),
    C = A(c, '_scales'),
    z = A(c, 'columns'),
    a = A(c, '_sort'),
    B = A(c, 'calendar'),
    F = A(c, 'durationUnit'),
    ee = A(c, 'splitTasks'),
    [j, Z] = ie(null),
    X = b(() => (!I || !W ? [] : I.slice(W.start, W.end)), [I, W]),
    H = k(
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
    J = k(
      (l) => {
        const w = He(l),
          $ = l.target.dataset.action;
        $ && l.preventDefault(),
          w
            ? $ === 'add-task' || $ === 'open-task'
              ? H(w, $)
              : c.exec('select-task', {
                  id: w,
                  toggle: l.ctrlKey || l.metaKey,
                  range: l.shiftKey,
                  show: !0,
                })
            : $ === 'add-task' && H(null, $);
      },
      [c, H],
    ),
    M = te(null),
    i = te(null),
    [p, _] = ie(0),
    [D, Y] = ie(!1);
  U(() => {
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
            const Q = c.getTask(y);
            Q.data?.length && Q.open && ((N = 'before'), (y = Q.data[0].id));
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
    fe = b(
      () => (!r && o !== 'grid' ? (f ?? 0) > (s ?? 0) : (f ?? 0) > (p ?? 0)),
      [r, o, f, s, p],
    ),
    v = b(() => {
      const l = {};
      return (
        (fe && o === 'all') || (o === 'grid' && fe)
          ? (l.width = f)
          : o === 'grid' && (l.width = '100%'),
        l
      );
    }, [fe, o, f]),
    se = b(() => (j && !X.find((l) => l.id === j.id) ? [...X, j] : X), [X, j]),
    ne = b(() => {
      let l = (z || []).map((e) => {
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
    }, [z, T, n, r, c]),
    ae = b(
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
    oe = b(() => {
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
          const w = oe.reduce(
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
      [be, oe, f, x],
    ),
    Ce = k(() => {
      ne.filter((w) => w.flexgrow && !w.hidden).length === 1 &&
        ne.forEach((w) => {
          w.$width && !w.flexgrow && !w.hidden && (w.width = w.$width);
        });
    }, []),
    re = k(
      (l) => {
        if (!n) {
          const w = He(l),
            $ = Mt(l, 'data-col-id');
          !($ && ne.find((u) => u.id == $))?.editor &&
            w &&
            c.exec('show-editor', { id: w });
        }
      },
      [c, n],
      // cols is defined later; relies on latest value at call time
    ),
    de = b(() => (Array.isArray(E) ? E.map((l) => l.id) : []), [E]),
    ce = k(() => {
      if (M.current && se !== null) {
        const l = M.current.querySelector('.wx-body');
        l && (l.style.top = -((V ?? 0) - (me ?? 0)) + 'px');
      }
      i.current && (i.current.scrollTop = 0);
    }, [se, V, me]);
  U(() => {
    M.current && ce();
  }, [V, me, ce]),
    U(() => {
      const l = M.current;
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
    }, [oe, v, o, ae, se, ce]),
    U(() => {
      if (!O || !R) return;
      const { id: l } = O,
        w = R.getState().focusCell;
      w &&
        w.row !== l &&
        M.current &&
        M.current.contains(document.activeElement) &&
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
        if ((Z(w || null), !w)) return !1;
      },
      [c, n],
    ),
    q = k(
      ({ id: l, top: w }) => {
        K.current
          ? he({ ...K.current, onMove: !1 })
          : c.exec('drag-task', {
              id: l,
              top: w + (me ?? 0),
              inProgress: !1,
            }),
          Z(null);
      },
      [c, he, me],
    ),
    ue = k(
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
  U(() => {
    const l = M.current;
    return l
      ? Xt(l, {
          start: g,
          end: q,
          move: ue,
          getTask: c.getTask,
        }).destroy
      : void 0;
  }, [c, g, q, ue]);
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
              ? H(u, 'add-task')
              : y === 'text' && H(u, 'open-task');
          }
        }
      },
      [c, H, R],
    ),
    le = te(null),
    $e = () => {
      le.current = {
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
    U(() => {
      $e();
    }, [m, G, a, c, Ce, ke, X, B, F, ee, h]);
  const Ae = k((l) => {
    m(l),
      l.intercept('hotkey', (w) => le.current.handleHotkey(w)),
      l.intercept('scroll', () => !1),
      l.intercept('select-row', () => !1),
      l.intercept('sort-rows', (w) => {
        const $ = le.current.sortVal,
          { key: e, add: u } = w,
          y = $ ? $.find((Q) => Q.key === e) : null;
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
        le.current.setColumnWidth(!0);
      }),
      l.on('hide-column', (w) => {
        w.mode || le.current.adjustColumns(), le.current.setColumnWidth();
      }),
      l.intercept('update-cell', (w) => {
        const { id: $, column: e, value: u } = w,
          y = le.current.tasks.find((N) => N.id === $);
        if (y) {
          const N = { ...y };
          let Q = u;
          Q && !isNaN(Q) && !(Q instanceof Date) && (Q *= 1),
            (N[e] = Q),
            dt(
              N,
              {
                calendar: le.current.calendarVal,
                durationUnit: le.current.durationUnitVal,
                splitTasks: le.current.splitTasksVal,
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
    style: { flex: `0 0 ${ae}` },
    ref: i,
    children: /* @__PURE__ */ d('div', {
      ref: M,
      style: v,
      className: 'wx-rHj6070p wx-table',
      onClick: J,
      onDoubleClick: re,
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
        columns: oe,
        selectedRows: [...de],
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
    [S, h] = ie('#e4e4e4');
  U(() => {
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
    background: r != null && s != null ? `url(${Lt(r, s, S, t)})` : void 0,
    position: 'absolute',
  };
  return /* @__PURE__ */ d('div', { ref: o, style: f });
}
function Qt({ onSelectLink: t, selectedLink: n, readonly: r }) {
  const s = ve(De),
    o = A(s, '_links'),
    S = A(s, 'criticalPath'),
    h = te(null),
    f = k(
      (x) => {
        const R = x?.target?.classList;
        !R?.contains('wx-line') && !R?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    U(() => {
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
            (S && x.$critical ? ' wx-critical' : '') +
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
  function s(S) {
    const h = n.segments[S];
    return {
      left: `${h.$x}px`,
      top: '0px',
      width: `${h.$w}px`,
      height: '100%',
    };
  }
  function o(S) {
    if (!n.progress) return 0;
    const h = (n.duration * n.progress) / 100,
      f = n.segments;
    let x = 0,
      R = 0,
      m = null;
    do {
      const P = f[R];
      R === S &&
        (x > h ? (m = 0) : (m = Math.min((h - x) / P.duration, 1) * 100)),
        (x += P.duration),
        R++;
    } while (m === null && R < f.length);
    return m || 0;
  }
  return /* @__PURE__ */ d('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((S, h) =>
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
              children: S.text || '',
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
    [o, S] = je(s, '_tasks'),
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
    I = b(() => {
      if (!x || !Array.isArray(o)) return [];
      const e = x.start ?? 0,
        u = x.end ?? 0;
      return o.slice(e, u).map((y) => ({ ...y }));
    }, [S, x]),
    C = b(() => R.lengthUnitWidth, [R]),
    z = te(!1),
    [a, B] = ie(void 0),
    [F, ee] = ie(null),
    j = te(null),
    [Z, X] = ie(null),
    H = b(
      () =>
        Z && {
          ...h.find((e) => e.id === Z),
        },
      [Z, f],
    ),
    [J, M] = ie(void 0),
    i = te(null),
    [p, _] = ie(0),
    D = te(null),
    Y = b(() => {
      const e = D.current;
      return !!(T.length && e && e.contains(document.activeElement));
    }, [T, D.current]),
    K = b(() => Y && T[T.length - 1]?.id, [Y, T]);
  U(() => {
    if (c && Y && c) {
      const { id: e } = c,
        u = D.current?.querySelector(`.wx-bar[data-id='${e}']`);
      u && u.focus({ preventScroll: !0 });
    }
  }, [c]),
    U(() => {
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
        const { left: Q, width: ge } = e.getBoundingClientRect(),
          pe = (u.clientX - Q) / ge;
        let ye = 0.2 / (ge > 200 ? ge / 200 : 1);
        return pe < ye ? 'start' : pe > 1 - ye ? 'end' : '';
      },
      [s],
    ),
    fe = k(
      (e, u) => {
        const { clientX: y } = u,
          N = Ge(e),
          Q = s.getTask(N),
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
            const pe = xe(e, u, Q) || 'move',
              ye = {
                id: N,
                mode: pe,
                x: y,
                dx: 0,
                l: Q.$x,
                w: Q.$w,
              };
            if (E && Q.segments?.length) {
              const Se = Le(u, 'data-segment');
              Se && ((ye.segmentIndex = Se.dataset.segment * 1), Et(Q, ye));
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
        u && fe(u, e);
      },
      [fe],
    ),
    se = k(
      (e) => {
        const u = Le(e);
        u &&
          (i.current = setTimeout(() => {
            M(!0), fe(u, e.touches[0]);
          }, 300));
      },
      [fe],
    ),
    ne = k((e) => {
      X(e);
    }, []),
    ae = k(() => {
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
          (z.current = !0),
          me();
      } else if (F) {
        const {
          id: e,
          mode: u,
          dx: y,
          l: N,
          w: Q,
          start: ge,
          segment: pe,
          index: ye,
        } = F;
        if ((ee(null), ge)) {
          const Se = Math.round(y / C);
          if (!Se)
            s.exec('drag-task', {
              id: e,
              width: Q,
              left: N,
              inProgress: !1,
              ...(pe && { segmentIndex: ye }),
            });
          else {
            let Ie = {},
              ze = s.getTask(e);
            pe && (ze = ze.segments[ye]),
              u === 'move'
                ? ((Ie.start = ze.start), (Ie.end = ze.end))
                : (Ie[u] = ze[u]),
              s.exec('update-task', {
                id: e,
                diff: Se,
                task: Ie,
                ...(pe && { segmentIndex: ye }),
              });
          }
          z.current = !0;
        }
        me();
      }
    }, [s, me, F, C]),
    Te = k(
      (e, u) => {
        const { clientX: y } = u;
        if (!n)
          if (j.current) {
            const { node: N, x: Q, id: ge } = j.current,
              pe = (j.current.dx = y - Q),
              ye = Math.round((pe / N.offsetWidth) * 100);
            let Se = j.current.progress + ye;
            (j.current.value = Se = Math.min(Math.max(0, Se), 100)),
              s.exec('update-task', {
                id: ge,
                task: { progress: Se },
                inProgress: !0,
              });
          } else if (F) {
            ne(null);
            const {
                mode: N,
                l: Q,
                w: ge,
                x: pe,
                id: ye,
                start: Se,
                segment: Ie,
                index: ze,
              } = F,
              Be = s.getTask(ye),
              Me = y - pe,
              Qe = Math.round(C) || 1;
            if (
              (!Se && Math.abs(Me) < 20) ||
              (N === 'start' && ge - Me < Qe) ||
              (N === 'end' && ge + Me < Qe) ||
              (N === 'move' &&
                ((Me < 0 && Q + Me < 0) || (Me > 0 && Q + ge + Me > p))) ||
              (F.segment && !Dt(Be, F))
            )
              return;
            const Xe = { ...F, dx: Me };
            let Pe, Oe;
            if (
              (N === 'start'
                ? ((Pe = Q + Me), (Oe = ge - Me))
                : N === 'end'
                  ? ((Pe = Q), (Oe = ge + Me))
                  : N === 'move' && ((Pe = Q + Me), (Oe = ge)),
              s.exec('drag-task', {
                id: ye,
                width: Oe,
                left: Pe,
                inProgress: !0,
                start: Se,
                ...(Ie && { segmentIndex: ze }),
              }),
              !Xe.start &&
                ((N === 'move' && Be.$x == Q) || (N !== 'move' && Be.$w == ge)))
            ) {
              (z.current = !0), ae();
              return;
            }
            (Xe.start = !0), ee(Xe);
          } else {
            const N = Le(e);
            if (N) {
              const Q = s.getTask(Ge(N)),
                pe = Le(e, 'data-segment') || N,
                ye = xe(pe, u, Q);
              pe.style.cursor = ye && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [s, n, F, C, p, xe, ne, ae],
    ),
    be = k(
      (e) => {
        Te(e, e);
      },
      [Te],
    ),
    Ne = k(
      (e) => {
        J
          ? (e.preventDefault(), Te(e, e.touches[0]))
          : i.current && (clearTimeout(i.current), (i.current = null));
      },
      [J, Te],
    ),
    oe = k(() => {
      ae();
    }, [ae]),
    ke = k(() => {
      M(null), i.current && (clearTimeout(i.current), (i.current = null)), ae();
    }, [ae]);
  U(
    () => (
      window.addEventListener('mouseup', oe),
      () => {
        window.removeEventListener('mouseup', oe);
      }
    ),
    [oe],
  );
  const Ce = k(
      (e) => {
        if (!n) {
          if (e.target.closest('[data-interactive]')) return;
          const u = He(e.target);
          if (u && !e.target.classList.contains('wx-link')) {
            const y = He(e.target, 'data-segment');
            s.exec('show-editor', {
              id: u,
              ...(y !== null && { segmentIndex: y }),
            });
          }
        }
      },
      [s, n],
    ),
    re = ['e2s', 's2s', 'e2e', 's2e'],
    de = k((e, u) => re[(e ? 1 : 0) + (u ? 0 : 2)], []),
    ce = k(
      (e, u) => {
        const y = a.id,
          N = a.start;
        return e === y
          ? !0
          : !!h.find(
              (Q) => Q.target == e && Q.source == y && Q.type === de(N, u),
            );
      },
      [a, f, de],
    ),
    g = k(() => {
      a && B(null);
    }, [a]),
    q = k(
      (e) => {
        if (z.current) {
          z.current = !1;
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const u = He(e.target);
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
                  type: de(a.start, N),
                },
              });
          } else if (y.contains('wx-delete-button-icon'))
            s.exec('delete-link', { id: Z }), X(null);
          else {
            let N;
            const Q = Le(e, 'data-segment');
            Q && (N = Q.dataset.segment * 1),
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
      [s, a, f, H, ce, de, g],
    ),
    ue = k(
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
    le = k(
      (e) => {
        if (J || i.current) return e.preventDefault(), !1;
      },
      [J],
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
    style: { lineHeight: `${I.length ? I[0].$h : 0}px` },
    ref: D,
    onContextMenu: le,
    onMouseDown: v,
    onMouseMove: be,
    onTouchStart: se,
    onTouchMove: Ne,
    onTouchEnd: ke,
    onClick: q,
    onDoubleClick: Ce,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ d(Qt, {
        onSelectLink: ne,
        selectedLink: H,
        readonly: n,
      }),
      I.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const u =
            `wx-bar wx-${Ae(e.type)}` +
            (J && F && e.id === F.id ? ' wx-touch' : '') +
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
                  style: ue(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: K === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === H?.target && H?.type[2] === 's'
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
                      : e.id === H?.target && H?.type[2] === 'e'
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
    children: (s?.rows || []).map((o, S) =>
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
        S,
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
    U(() => {
      if (o)
        return (
          cancelAnimationFrame(s.current),
          (s.current = requestAnimationFrame(() => {
            const S = {
              label: t,
              time: performance.now() - n.current,
              renders: r.current,
              timestamp: Date.now(),
            };
            en.set(t, S),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: S }),
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
      cellBorders: S,
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
    [E, W] = ie(),
    I = te(null),
    C = 1 + (c?.rows?.length || 0),
    z = b(() => {
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
  U(() => {
    const i = I.current;
    i && typeof m == 'number' && (i.scrollTop = m);
  }, [m]);
  const B = () => {
    F();
  };
  function F(i) {
    const p = I.current;
    if (!p) return;
    const _ = {};
    (_.left = p.scrollLeft), f.exec('scroll-chart', _);
  }
  function ee() {
    const i = I.current,
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
  U(() => {
    ee();
  }, [E, m]);
  const j = k(
    (i) => {
      if (!i) return;
      const { id: p, mode: _ } = i;
      if (_.toString().indexOf('x') < 0) return;
      const D = I.current;
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
  U(() => {
    j(L);
  }, [L]);
  function Z(i) {
    if (O && (i.ctrlKey || i.metaKey)) {
      i.preventDefault();
      const p = I.current,
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
  const H = b(
      () =>
        c && (c.minUnit === 'hour' || c.minUnit === 'day') && h
          ? c.rows[c.rows.length - 1].cells.map(X)
          : null,
      [c, h],
    ),
    J = k(
      (i) => {
        (i.eventSource = 'chart'), f.exec('hotkey', i);
      },
      [f],
    );
  U(() => {
    const i = I.current;
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
  }, [I.current]);
  const M = te(null);
  return (
    U(() => {
      const i = I.current;
      if (i && !M.current)
        return (
          (M.current = ht(i, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (p) => J(p),
          })),
          () => {
            M.current?.destroy(), (M.current = null);
          }
        );
    }, []),
    U(() => {
      const i = I.current;
      if (!i) return;
      const p = Z;
      return (
        i.addEventListener('wheel', p),
        () => {
          i.removeEventListener('wheel', p);
        }
      );
    }, [Z]),
    tn('chart'),
    /* @__PURE__ */ we('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: I,
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
            H
              ? /* @__PURE__ */ d('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: H.map((i, p) =>
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
            /* @__PURE__ */ d(qt, { borders: S }),
            x && x.length
              ? x.map((i, p) =>
                  i.$y
                    ? /* @__PURE__ */ d(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': i.id,
                          style: z[p],
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
      onDisplayChange: S,
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
  const [L, O] = ie(!1),
    [E, W] = ie(null),
    I = te(0),
    C = te(),
    z = te(),
    a = te(T);
  U(() => {
    a.current = T;
  }, [T]),
    U(() => {
      E === null && m > 0 && W(m);
    }, [E, m]);
  function B(_) {
    return s == 'x' ? _.clientX : _.clientY;
  }
  const F = k(
      (_) => {
        const D = C.current + B(_) - I.current;
        P(D);
        let Y;
        D <= x ? (Y = 'chart') : f - D <= R ? (Y = 'grid') : (Y = 'all'),
          a.current !== Y && (c(Y), (a.current = Y)),
          z.current && clearTimeout(z.current),
          (z.current = setTimeout(() => o && o(D), 100));
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
    Z = k(
      (_) => {
        (!h && (T === 'grid' || T === 'chart')) ||
          ((I.current = B(_)),
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
  function H(_) {
    if (h) {
      const D = T === 'chart' ? 'grid' : 'chart';
      c(D), S(D);
    } else if (T === 'grid' || T === 'chart') X(), S('all');
    else {
      const D = _ === 'left' ? 'chart' : 'grid';
      c(D), S(D);
    }
  }
  function J() {
    H('left');
  }
  function M() {
    H('right');
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
    onMouseDown: Z,
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
              onClick: J,
            }),
          }),
          /* @__PURE__ */ d('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ d('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: M,
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
      for (let S of o)
        if (S.target === document.body) {
          let h = S.contentRect.width <= rn;
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
      onTableAPIChange: S,
    } = t,
    h = ve(De),
    f = A(h, '_tasks'),
    x = A(h, '_scales'),
    R = A(h, 'cellHeight'),
    m = A(h, 'columns'),
    P = A(h, '_scrollTask'),
    T = A(h, 'undo'),
    [c, V] = ie(!1);
  let [L, O] = ie(0);
  const [E, W] = ie(0),
    [I, C] = ie(0),
    [z, a] = ie(void 0),
    [B, F] = ie('all'),
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
  U(() => {
    const v = mt(j);
    return (
      v.observe(),
      () => {
        v.disconnect();
      }
    );
  }, [j]);
  const Z = b(() => {
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
  U(() => {
    O(Z);
  }, [Z]);
  const X = b(() => (E ?? 0) - (z ?? 0), [E, z]),
    H = b(() => x.width, [x]),
    J = b(() => f.length * R, [f, R]),
    M = b(() => x.height + J + X, [x, J, X]),
    i = b(() => L + H, [L, H]),
    p = te(null),
    _ = k(() => {
      Promise.resolve().then(() => {
        if ((E ?? 0) > (i ?? 0)) {
          const v = (E ?? 0) - L;
          h.exec('expand-scale', { minWidth: v });
        }
      });
    }, [E, i, L, h]);
  U(() => {
    let v;
    return (
      p.current && ((v = new ResizeObserver(_)), v.observe(p.current)),
      () => {
        v && v.disconnect();
      }
    );
  }, [p.current, _]),
    U(() => {
      _();
    }, [H]);
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
  U(() => {
    he.current = {
      rTasks: f,
      rScales: x,
      rCellHeight: R,
      scrollSize: X,
      ganttDiv: D.current,
      ganttHeight: I ?? 0,
    };
  }, [f, x, R, X, I]);
  const me = k(
    (v) => {
      if (!v) return;
      const {
        rTasks: se,
        rScales: ne,
        rCellHeight: ae,
        scrollSize: Te,
        ganttDiv: be,
        ganttHeight: Ne,
      } = he.current;
      if (!be) return;
      const { id: oe } = v,
        ke = se.findIndex((Ce) => Ce.id === oe);
      if (ke > -1) {
        const Ce = Ne - ne.height,
          re = ke * ae,
          de = be.scrollTop;
        let ce = null;
        re < de ? (ce = re) : re + ae > de + Ce && (ce = re - Ce + ae + Te),
          ce !== null &&
            (h.exec('scroll-chart', { top: Math.max(ce, 0) }),
            (D.current.scrollTop = Math.max(ce, 0)));
      }
    },
    [h],
  );
  U(() => {
    me(P);
  }, [P]),
    U(() => {
      const v = D.current,
        se = Y.current;
      if (!v || !se) return;
      const ne = () => {
          Vt(() => {
            C(v.offsetHeight), W(v.offsetWidth), a(se.offsetWidth);
          });
        },
        ae = new ResizeObserver(ne);
      return ae.observe(v), () => ae.disconnect();
    }, [D.current]);
  const xe = te(null),
    fe = te(null);
  return (
    U(() => {
      fe.current && (fe.current.destroy(), (fe.current = null));
      const v = xe.current;
      if (v)
        return (
          (fe.current = ht(v, {
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
            fe.current?.destroy(), (fe.current = null);
          }
        );
    }, [T]),
    /* @__PURE__ */ d('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: D,
      onScroll: K,
      children: /* @__PURE__ */ d('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: M, width: '100%' },
        ref: Y,
        children: /* @__PURE__ */ d('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: I,
            width: z,
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
                        columnWidth: Z,
                        width: L,
                        readonly: r,
                        fullHeight: J,
                        onTableAPIChange: S,
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
                  fullWidth: H,
                  fullHeight: J,
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
      selected: S = [],
      activeTask: h = null,
      links: f = [],
      scales: x = hn,
      columns: R = Ht,
      start: m = null,
      end: P = null,
      lengthUnit: T = 'day',
      durationUnit: c = 'day',
      cellWidth: V = 100,
      cellHeight: L = 38,
      scaleHeight: O = 36,
      readonly: E = !1,
      cellBorders: W = 'full',
      zoom: I = !1,
      baselines: C = !1,
      highlightTime: z = null,
      init: a = null,
      autoScale: B = !0,
      unscheduledTasks: F = !1,
      criticalPath: ee = null,
      schedule: j = { type: 'forward' },
      projectStart: Z = null,
      projectEnd: X = null,
      calendar: H = null,
      undo: J = !1,
      splitTasks: M = !1,
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
      fe = b(() => xe.getRaw().calendar, [xe]),
      v = b(() => {
        let re = {
          zoom: un(I, fe),
          scales: xt(x, fe),
          columns: dn(R, fe),
          links: zt(f),
          cellWidth: V,
        };
        return (
          re.zoom &&
            (re = {
              ...re,
              ...It(re.zoom, an(fe, xe.getGroup('gantt')), re.scales, V),
            }),
          re
        );
      }, [I, x, R, f, V, fe, xe]),
      se = te(null);
    se.current !== o &&
      (p || tt(o, { durationUnit: c, splitTasks: M, calendar: H }),
      (se.current = o)),
      U(() => {
        p || tt(o, { durationUnit: c, splitTasks: M, calendar: H });
      }, [o, c, H, M, p]);
    const ne = b(() => K.in, [K]),
      ae = te(null);
    ae.current === null &&
      ((ae.current = new Rt((re, de) => {
        const ce = 'on' + fn(re);
        Y.current && Y.current[ce] && Y.current[ce](de);
      })),
      ne.setNext(ae.current));
    const [Te, be] = ie(null),
      Ne = te(null);
    Ne.current = Te;
    const oe = b(
      () => ({
        getState: K.getState.bind(K),
        getReactiveState: K.getReactive.bind(K),
        getStores: () => ({ data: K }),
        exec: ne.exec.bind(ne),
        setNext: (re) => ((ae.current = ae.current.setNext(re)), ae.current),
        intercept: ne.intercept.bind(ne),
        on: ne.on.bind(ne),
        detach: ne.detach.bind(ne),
        getTask: K.getTask.bind(K),
        serialize: () => K.serialize(),
        getTable: (re) =>
          re
            ? new Promise((de) => setTimeout(() => de(Ne.current), 1))
            : Ne.current,
        getHistory: () => K.getHistory(),
      }),
      [K, ne],
    );
    U(() => {
      const re = () => {
        const { zoom: de, scales: ce } = oe.getState(),
          q = de?.levels?.[de.level]?.scales?.[0]?.unit ?? ce?.[0]?.unit;
        q && oe.exec('scale-change', { level: de?.level, unit: q });
      };
      oe.on('zoom-scale', re), oe.on('set-scale', re);
    }, [oe]),
      U(() => {
        oe.intercept('set-scale', ({ unit: re, date: de }) => {
          const { zoom: ce } = oe.getState();
          if (!ce || !ce.levels) return !1;
          const g = ce.levels.findIndex((G) =>
            G.scales.some((le) => le.unit === re),
          );
          if (g < 0) return !1;
          const q = ce.levels[g];
          if (g !== ce.level) {
            const G = Math.round((q.minCellWidth + q.maxCellWidth) / 2);
            oe.getStores().data.setState({
              scales: q.scales,
              cellWidth: G,
              _cellWidth: G,
              zoom: { ...ce, level: g },
              ...(de ? { _scaleDate: de, _zoomOffset: 0 } : {}),
            });
          } else if (de) {
            const { _scales: G, cellWidth: le } = oe.getState(),
              $e = G.diff(de, G.start, G.lengthUnit),
              Ae = Math.max(0, Math.round($e * le));
            oe.exec('scroll-chart', { left: Ae });
          }
          return !1;
        });
      }, [oe]),
      at(
        D,
        () => ({
          ...oe,
        }),
        [oe],
      );
    const ke = te(0);
    U(() => {
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
            selected: S,
            activeTask: h,
            baselines: C,
            autoScale: B,
            unscheduledTasks: F,
            markers: r,
            durationUnit: c,
            criticalPath: ee,
            schedule: j,
            projectStart: Z,
            projectEnd: X,
            calendar: H,
            undo: J,
            _weekStart: fe.weekStart,
            splitTasks: M,
            summary: i,
          })
        : a && a(oe),
        ke.current++;
    }, [
      oe,
      a,
      o,
      v,
      m,
      P,
      T,
      L,
      O,
      s,
      S,
      h,
      C,
      B,
      F,
      r,
      c,
      ee,
      j,
      Z,
      X,
      H,
      J,
      fe,
      M,
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
          selected: S,
          activeTask: h,
          baselines: C,
          autoScale: B,
          unscheduledTasks: F,
          markers: r,
          durationUnit: c,
          criticalPath: ee,
          schedule: j,
          projectStart: Z,
          projectEnd: X,
          calendar: H,
          undo: J,
          _weekStart: fe.weekStart,
          splitTasks: M,
          summary: i,
        });
    const Ce = b(
      () =>
        H
          ? (re, de) =>
              (de == 'day' && !H.getDayHours(re)) ||
              (de == 'hour' && !H.getDayHours(re))
                ? 'wx-weekend'
                : ''
          : z,
      [H, z],
    );
    return /* @__PURE__ */ d(Re.i18n.Provider, {
      value: xe,
      children: /* @__PURE__ */ d(De.Provider, {
        value: oe,
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
function zn({ api: t = null, items: n = [] }) {
  const r = ve(Re.i18n),
    s = b(() => r || Fe(Ke), [r]),
    o = b(() => s.getGroup('gantt'), [s]),
    S = Ee(t, '_selected'),
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
            if (!S?.length || !t) return;
            T.push({
              ...c,
              disabled:
                c.isDisabled && S.some((L) => c.isDisabled(L, t.getState())),
            });
          }
        }),
        T.filter((c, V) => {
          if (t && c.isHidden)
            return !S.some((L) => c.isHidden(L, t.getState()));
          if (c.comp === 'separator') {
            const L = T[V + 1];
            if (!L || L.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, S, f, m]);
  return r
    ? /* @__PURE__ */ d(rt, { items: P })
    : /* @__PURE__ */ d(Re.i18n.Provider, {
        value: s,
        children: /* @__PURE__ */ d(rt, { items: P }),
      });
}
const In = ct(function (
  {
    options: n = [],
    api: r = null,
    resolver: s = null,
    filter: o = null,
    at: S = 'point',
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
    I = Ee(r, 'summary'),
    C = b(
      () => ({
        splitTasks: W,
        taskTypes: L,
        summary: I,
      }),
      [W, L, I],
    ),
    z = b(() => st(C), [C]);
  U(() => {
    r &&
      (r.on('scroll-chart', () => {
        m.current && m.current.show && m.current.show();
      }),
      r.on('drag-task', () => {
        m.current && m.current.show && m.current.show();
      }));
  }, [r]);
  function a(M) {
    return M.map(
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
    const M = n.length ? n : st(C);
    return a(M);
  }
  const F = b(() => B(), [r, n, C, V]),
    ee = b(() => (E && E.length ? E : []), [E]),
    j = k(
      (M, i) => {
        let p = M ? r?.getTask(M) : null;
        if (s) {
          const _ = s(M, i);
          p = _ === !0 ? p : _;
        }
        if (p) {
          const _ = He(i.target, 'data-segment');
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
    Z = k(
      (M) => {
        const i = M.action;
        i && (ft(z, i.id) && ut(r, i.id, P.current, V), f && f(M));
      },
      [r, V, f, z],
    ),
    X = k(
      (M, i) => {
        const p = ee.length ? ee : i ? [i] : [];
        let _ = o ? p.every((D) => o(M, D)) : !0;
        if (
          _ &&
          (M.isHidden &&
            (_ = !p.some((D) => M.isHidden(D, r.getState(), P.current))),
          M.isDisabled)
        ) {
          const D = p.some((Y) => M.isDisabled(Y, r.getState(), P.current));
          M.disabled = D;
        }
        return _;
      },
      [o, ee, r],
    );
  at(R, () => ({
    show: (M, i) => {
      m.current && m.current.show && m.current.show(M, i);
    },
  }));
  const H = k((M) => {
      m.current && m.current.show && m.current.show(M);
    }, []),
    J = /* @__PURE__ */ we(_e, {
      children: [
        /* @__PURE__ */ d(Ft, {
          filter: X,
          options: F,
          dataKey: 'id',
          resolver: j,
          onClick: Z,
          at: S,
          ref: m,
          css: x,
        }),
        /* @__PURE__ */ d('span', {
          onContextMenu: H,
          'data-menu-ignore': 'true',
          children: typeof h == 'function' ? h() : h,
        }),
      ],
    });
  if (!T && Re.i18n?.Provider) {
    const M = Re.i18n.Provider;
    return /* @__PURE__ */ d(M, { value: c, children: J });
  }
  return J;
});
function mn({ api: t, autoSave: n, onLinksChange: r }) {
  const o = ve(Re.i18n).getGroup('gantt'),
    S = A(t, 'activeTask'),
    h = A(t, '_activeTask'),
    f = A(t, '_links'),
    x = A(t, 'schedule'),
    R = A(t, 'unscheduledTasks'),
    [m, P] = ie();
  function T() {
    if (S) {
      const O = f
          .filter((W) => W.target == S)
          .map((W) => ({ link: W, task: t.getTask(W.source) })),
        E = f
          .filter((W) => W.source == S)
          .map((W) => ({ link: W, task: t.getTask(W.target) }));
      return [
        { title: o('Predecessors'), data: O },
        { title: o('Successors'), data: E },
      ];
    }
  }
  U(() => {
    P(T());
  }, [S, f]);
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
            data: W.data.filter((I) => I.link.id !== O),
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
          (W || []).map((I) => ({
            ...I,
            data: I.data.map((C) =>
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
                                      onChange: (I) => {
                                        I.input ||
                                          L(W.link.id, { lag: I.value });
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
                                    onChange: (I) =>
                                      L(W.link.id, { type: I.value }),
                                    children: ({ option: I }) => I.label,
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
  const { value: n, time: r, format: s, onchange: o, onChange: S, ...h } = t,
    f = S ?? o;
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
We('counter', St);
We('links', mn);
function Hn({
  api: t,
  items: n = [],
  css: r = '',
  layout: s = 'default',
  readonly: o = !1,
  placement: S = 'sidebar',
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
    [E, W] = ie(!1),
    I = b(() => (E ? 'wx-full-screen' : ''), [E]),
    C = k((g) => {
      W(g);
    }, []);
  U(() => {
    const g = mt(C);
    return (
      g.observe(),
      () => {
        g.disconnect();
      }
    );
  }, [C]);
  const z = A(t, '_activeTask'),
    a = A(t, 'activeTask'),
    B = A(t, 'unscheduledTasks'),
    F = A(t, 'summary'),
    ee = A(t, 'links'),
    j = A(t, 'splitTasks'),
    Z = b(() => j && a?.segmentIndex, [j, a]),
    X = b(() => Z || Z === 0, [Z]),
    H = A(t, 'taskTypes'),
    J = b(
      () => Wt({ unscheduledTasks: B, summary: F, taskTypes: H }),
      [B, F, H],
    ),
    M = A(t, 'undo'),
    [i, p] = ie({}),
    [_, D] = ie(null),
    [Y, K] = ie(),
    [he, me] = ie(null),
    xe = b(() => {
      if (!z) return null;
      let g;
      if ((X && z.segments ? (g = { ...z.segments[Z] }) : (g = { ...z }), o)) {
        let q = { parent: g.parent };
        return (
          J.forEach(({ key: ue, comp: G }) => {
            if (G !== 'links') {
              const le = g[ue];
              G === 'date' && le instanceof Date
                ? (q[ue] = L(le))
                : G === 'slider' && ue === 'progress'
                  ? (q[ue] = `${le}%`)
                  : (q[ue] = le);
            }
          }),
          q
        );
      }
      return g || null;
    }, [z, X, Z, o, J, L]);
  U(() => {
    K(xe);
  }, [xe]),
    U(() => {
      p({}), me(null), D(null);
    }, [a]);
  function fe(g, q) {
    return g.map((ue) => {
      const G = { ...ue };
      if (
        (ue.config && (G.config = { ...G.config }),
        G.comp === 'links' &&
          t &&
          ((G.api = t), (G.autoSave = x), (G.onLinksChange = ne)),
        G.comp === 'select' && G.key === 'type')
      ) {
        const le = G.options ?? [];
        G.options = le.map(($e) => ({
          ...$e,
          label: c($e.label),
        }));
      }
      return (
        G.comp === 'slider' &&
          G.key === 'progress' &&
          (G.labelTemplate = (le) => `${c(G.label)} ${le}%`),
        G.label && (G.label = c(G.label)),
        G.config?.placeholder &&
          (G.config.placeholder = c(G.config.placeholder)),
        q &&
          (G.isDisabled && G.isDisabled(q, t.getState())
            ? (G.disabled = !0)
            : delete G.disabled),
        G
      );
    });
  }
  const v = b(() => {
      let g = n.length ? n : J;
      return (
        (g = fe(g, Y)),
        Y ? g.filter((q) => !q.isHidden || !q.isHidden(Y, t.getState())) : g
      );
    }, [n, J, Y, c, t, x]),
    se = b(() => v.map((g) => g.key), [v]);
  function ne({ id: g, action: q, data: ue }) {
    p((G) => ({
      ...G,
      [g]: { action: q, data: ue },
    }));
  }
  const ae = k(() => {
      for (let g in i)
        if (ee.byId(g)) {
          const { action: q, data: ue } = i[g];
          t.exec(q, ue);
        }
    }, [t, i, ee]),
    Te = k(() => {
      const g = a?.id || a;
      if (X) {
        if (z?.segments) {
          const q = z.segments.filter((ue, G) => G !== Z);
          t.exec('update-task', {
            id: g,
            task: { segments: q },
          });
        }
      } else t.exec('delete-task', { id: g });
    }, [t, a, X, z, Z]),
    be = k(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    Ne = k(
      (g) => {
        const { item: q, changes: ue } = g;
        q.id === 'delete' && Te(),
          q.id === 'save' && (ue.length ? be() : ae()),
          q.comp && be();
      },
      [t, a, x, ae, Te, be],
    ),
    oe = k(
      (g, q, ue) => (
        B && g.type === 'summary' && (g.unscheduled = !1),
        dt(g, t.getState(), q),
        ue || D(!1),
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
        const q = {
          id: a?.id || a,
          task: g,
          ...(X && { segmentIndex: Z }),
        };
        x && _ && (q.inProgress = _), t.exec('update-task', q), x || ae();
      },
      [t, a, B, x, ae, se, X, Z, _],
    ),
    Ce = k(
      (g) => {
        let { update: q, key: ue, input: G } = g;
        if ((G && D(!0), (g.update = oe({ ...q }, ue, G)), !x)) K(g.update);
        else if (!he && !G) {
          const le = v.find((l) => l.key === ue),
            $e = q[ue];
          (!le.validation || le.validation($e)) &&
            (!le.required || $e) &&
            ke(g.update);
        }
      },
      [x, oe, he, v, ke],
    ),
    re = k(
      (g) => {
        x || ke(g.values);
      },
      [x, ke],
    ),
    de = k((g) => {
      me(g.errors);
    }, []),
    ce = b(
      () =>
        M
          ? {
              'ctrl+z': (g) => {
                g.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (g) => {
                g.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [M, t],
    );
  return xe
    ? /* @__PURE__ */ d(Tt, {
        children: /* @__PURE__ */ d(Kt, {
          css: `wx-XkvqDXuw wx-gantt-editor ${I} ${r}`,
          items: v,
          values: xe,
          topBar: O,
          bottomBar: h,
          placement: S,
          layout: s,
          readonly: o,
          autoSave: x,
          focus: R,
          onAction: Ne,
          onSave: re,
          onValidation: de,
          onChange: Ce,
          hotkeys: m && { ...ce, ...m },
        }),
      })
    : null;
}
const Gn = ({ children: t, columns: n = null, api: r }) => {
  const [s, o] = ie(null);
  return (
    U(() => {
      r && r.getTable(!0).then(o);
    }, [r]),
    /* @__PURE__ */ d(Ot, { api: s, columns: n, children: t })
  );
};
function Wn(t) {
  const { api: n, content: r, children: s } = t,
    o = te(null),
    S = te(null),
    [h, f] = ie({}),
    [x, R] = ie(null),
    [m, P] = ie({});
  function T(C) {
    for (; C; ) {
      if (C.getAttribute) {
        const z = C.getAttribute('data-tooltip-id'),
          a = C.getAttribute('data-tooltip-at'),
          B = C.getAttribute('data-tooltip');
        if (z || B) return { id: z, tooltip: B, target: C, at: a };
      }
      C = C.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  U(() => {
    const C = S.current;
    if (C && m && (m.text || r)) {
      const z = C.getBoundingClientRect();
      let a = !1,
        B = m.left,
        F = m.top;
      z.right >= h.right && ((B = h.width - z.width - 5), (a = !0)),
        z.bottom >= h.bottom &&
          ((F = m.top - (z.bottom - h.bottom + 2)), (a = !0)),
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
    let { id: z, tooltip: a, target: B, at: F } = T(C.target);
    if ((P(null), R(null), !a))
      if (z) a = W(z);
      else {
        clearTimeout(c.current);
        return;
      }
    const ee = C.clientX;
    L(() => {
      z && R(E(I(z)));
      const j = B.getBoundingClientRect(),
        Z = o.current,
        X = Z
          ? Z.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, J;
      F === 'left'
        ? ((H = j.top + 5 - X.top), (J = j.right + 5 - X.left))
        : ((H = j.top + j.height - X.top), (J = ee - X.left)),
        f(X),
        P({ top: H, left: J, text: a });
    });
  }
  function E(C) {
    return n?.getTask(I(C)) || null;
  }
  function W(C) {
    return E(C)?.text || '';
  }
  function I(C) {
    const z = parseInt(C);
    return isNaN(z) ? C : z;
  }
  return /* @__PURE__ */ we('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: O,
    children: [
      m && (m.text || r)
        ? /* @__PURE__ */ d('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: S,
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
  In as ContextMenu,
  Hn as Editor,
  An as Gantt,
  Gn as HeaderMenu,
  _n as Material,
  zn as Toolbar,
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
