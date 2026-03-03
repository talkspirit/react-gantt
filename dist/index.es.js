import { jsxs as Ae, jsx as u, Fragment as et } from 'react/jsx-runtime';
import {
  createContext as Zt,
  useContext as Xe,
  useMemo as C,
  useState as ge,
  useCallback as A,
  useRef as ne,
  useEffect as se,
  Fragment as Jt,
  forwardRef as At,
  useImperativeHandle as Pt,
} from 'react';
import {
  context as Be,
  Button as bt,
  Field as en,
  Text as tn,
  Combo as nn,
  DatePicker as sn,
  TimePicker as rn,
  Locale as on,
  RichSelect as ln,
  TwoState as cn,
  Slider as an,
  Counter as un,
  Material as kt,
  Willow as Tt,
  WillowDark as $t,
} from '@svar-ui/react-core';
import {
  locate as Fe,
  locateID as Ze,
  locateAttr as dn,
  dateToString as ot,
  locale as lt,
} from '@svar-ui/lib-dom';
import { en as it } from '@svar-ui/gantt-locales';
import { en as gt } from '@svar-ui/core-locales';
import { EventBusRouter as fn } from '@svar-ui/lib-state';
import {
  prepareEditTask as Gt,
  grid as hn,
  extendDragOptions as mn,
  isSegmentMoveAllowed as gn,
  DataStore as wn,
  normalizeLinks as pn,
  normalizeZoom as xn,
  defaultColumns as yn,
  parseTaskDates as Ct,
  defaultTaskTypes as vn,
  getToolbarButtons as Mt,
  handleAction as zt,
  isHandledAction as _t,
  getMenuOptions as Rt,
  getEditorItems as bn,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as Hs,
  defaultEditorItems as As,
  defaultMenuOptions as Ps,
  defaultTaskTypes as Gs,
  defaultToolbarButtons as zs,
  getEditorItems as _s,
  getMenuOptions as Ws,
  getToolbarButtons as Os,
  registerScaleUnit as Ys,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as ht,
  useStore as X,
  useStoreWithCounter as mt,
  writable as kn,
  useStoreLater as qe,
} from '@svar-ui/lib-react';
import { hotkeys as Wt } from '@svar-ui/grid-store';
import { Grid as Tn, HeaderMenu as $n } from '@svar-ui/react-grid';
import { flushSync as Cn } from 'react-dom';
import { Toolbar as Et } from '@svar-ui/react-toolbar';
import { ContextMenu as Mn } from '@svar-ui/react-menu';
import { Editor as Rn, registerEditorItem as Je } from '@svar-ui/react-editor';
import { registerEditorItem as Ks } from '@svar-ui/react-editor';
const Ue = Zt(null);
function Qe(t) {
  const n = t.getAttribute('data-id'),
    r = parseInt(n);
  return isNaN(r) || r.toString() != n ? n : r;
}
function En(t, n, r) {
  const c = t.getBoundingClientRect(),
    o = n.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: c.top - o.top,
    left: c.left - o.left,
    dt: c.bottom - r.clientY,
    db: r.clientY - c.top,
  };
}
function Dt(t) {
  return t && t.getAttribute('data-context-id');
}
const St = 5;
function Dn(t, n) {
  let r, c, o, M, k, y, g, R, s;
  function x(E) {
    (M = E.clientX),
      (k = E.clientY),
      (y = {
        ...En(r, t, E),
        y: n.getTask(o).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function B(E) {
    (r = Fe(E)),
      Dt(r) &&
        ((o = Qe(r)),
        (s = setTimeout(() => {
          (R = !0), n && n.touchStart && n.touchStart(), x(E.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', Y),
        t.addEventListener('contextmenu', _),
        window.addEventListener('touchend', O));
  }
  function _(E) {
    if (R || s) return E.preventDefault(), !1;
  }
  function G(E) {
    E.which === 1 &&
      ((r = Fe(E)),
      Dt(r) &&
        ((o = Qe(r)),
        t.addEventListener('mousemove', m),
        window.addEventListener('mouseup', re),
        x(E)));
  }
  function v(E) {
    t.removeEventListener('mousemove', m),
      t.removeEventListener('touchmove', Y),
      document.body.removeEventListener('mouseup', re),
      document.body.removeEventListener('touchend', O),
      (document.body.style.userSelect = ''),
      E &&
        (t.removeEventListener('mousedown', G),
        t.removeEventListener('touchstart', B));
  }
  function N(E) {
    const we = E.clientX - M,
      le = E.clientY - k;
    if (!c) {
      if (
        (Math.abs(we) < St && Math.abs(le) < St) ||
        (n && n.start && n.start({ id: o, e: E }) === !1)
      )
        return;
      (c = r.cloneNode(!0)),
        (c.style.pointerEvents = 'none'),
        c.classList.add('wx-reorder-task'),
        (c.style.position = 'absolute'),
        (c.style.left = y.left + 'px'),
        (c.style.top = y.top + 'px'),
        (r.style.visibility = 'hidden'),
        r.parentNode.insertBefore(c, r);
    }
    if (c) {
      const ye = Math.round(Math.max(0, y.top + le));
      if (n && n.move && n.move({ id: o, top: ye, detail: g }) === !1) return;
      const ie = n.getTask(o),
        U = ie.$y;
      if (!y.start && y.y == U) return Z();
      (y.start = !0), (y.y = ie.$y - 4), (c.style.top = ye + 'px');
      const ue = document.elementFromPoint(E.clientX, E.clientY),
        te = Fe(ue);
      if (te && te !== r) {
        const j = Qe(te),
          J = te.getBoundingClientRect(),
          I = J.top + J.height / 2,
          F = E.clientY + y.db > I && te.nextElementSibling !== r,
          H = E.clientY - y.dt < I && te.previousElementSibling !== r;
        g?.after == j || g?.before == j
          ? (g = null)
          : F
            ? (g = { id: o, after: j })
            : H && (g = { id: o, before: j });
      }
    }
  }
  function m(E) {
    N(E);
  }
  function Y(E) {
    R
      ? (E.preventDefault(), N(E.touches[0]))
      : s && (clearTimeout(s), (s = null));
  }
  function O() {
    (R = null), s && (clearTimeout(s), (s = null)), Z();
  }
  function re() {
    Z();
  }
  function Z() {
    r && (r.style.visibility = ''),
      c &&
        (c.parentNode.removeChild(c),
        n && n.end && n.end({ id: o, top: y.top })),
      (o = r = c = y = g = null),
      v();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', G),
    t.addEventListener('touchstart', B),
    {
      destroy() {
        v(!0);
      },
    }
  );
}
function Sn({ row: t, column: n }) {
  const r = Xe(Ue);
  function c(M, k) {
    return {
      justifyContent: k.align,
      paddingLeft: `${(M.$level - 1) * 20}px`,
    };
  }
  const o = n && n._cell;
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-pqc08MHU wx-content',
    style: c(t, n),
    children: [
      t.data || t.lazy
        ? /* @__PURE__ */ u('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ u('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ u('div', {
        className: 'wx-pqc08MHU wx-text',
        children: o
          ? /* @__PURE__ */ u(o, { row: t, column: n, api: r })
          : t.text,
      }),
    ],
  });
}
function Lt({ column: t, cell: n }) {
  const r = C(() => t.id, [t?.id]);
  return n || t.id == 'add-task'
    ? /* @__PURE__ */ u('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ u('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': r,
        }),
      })
    : null;
}
function Ln(t) {
  const {
      readonly: n,
      compactMode: r,
      width: c = 0,
      display: o = 'all',
      columnWidth: M = 0,
      fullHeight: k,
      onTableAPIChange: y,
      multiTaskRows: g = !1,
      rowMapping: R = null,
      rowHeightOverrides: s = null,
    } = t,
    [x, B] = ht(M),
    [_, G] = ge(),
    v = Xe(Be.i18n),
    N = C(() => v.getGroup('gantt'), [v]),
    m = Xe(Ue),
    Y = X(m, 'scrollTop'),
    O = X(m, 'cellHeight'),
    re = X(m, '_scrollTask'),
    Z = X(m, '_selected'),
    E = X(m, 'area'),
    we = X(m, '_tasks'),
    le = X(m, '_scales'),
    ye = X(m, 'columns'),
    ie = X(m, '_sort'),
    U = X(m, 'calendar'),
    ue = X(m, 'durationUnit'),
    te = X(m, 'splitTasks'),
    [j, J] = ge(null),
    I = C(() => {
      if (!we || !E) return [];
      if (g && R) {
        const i = /* @__PURE__ */ new Set();
        return we.filter((h) => {
          const D = R.taskRows.get(h.id) ?? h.id;
          return i.has(D) ? !1 : (i.add(D), !0);
        });
      }
      return we.slice(E.start, E.end);
    }, [we, E, g, R]),
    F = A(
      (i, h) => {
        if (h === 'add-task')
          m.exec(h, {
            target: i,
            task: { text: N('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (h === 'open-task') {
          const D = I.find((V) => V.id === i);
          (D?.data || D?.lazy) && m.exec(h, { id: i, mode: !D.open });
        }
      },
      [I],
    ),
    H = A(
      (i) => {
        const h = Ze(i),
          D = i.target.dataset.action;
        D && i.preventDefault(),
          h
            ? D === 'add-task' || D === 'open-task'
              ? F(h, D)
              : m.exec('select-task', {
                  id: h,
                  toggle: i.ctrlKey || i.metaKey,
                  range: i.shiftKey,
                  show: !0,
                })
            : D === 'add-task' && F(null, D);
      },
      [m, F],
    ),
    S = ne(null),
    q = ne(null),
    [ve, fe] = ge(0),
    [Me, Te] = ge(!1);
  se(() => {
    const i = q.current;
    if (!i || typeof ResizeObserver > 'u') return;
    const h = () => fe(i.clientWidth);
    h();
    const D = new ResizeObserver(h);
    return D.observe(i), () => D.disconnect();
  }, []);
  const He = ne(null),
    pe = A(
      (i) => {
        const h = i.id,
          { before: D, after: V } = i,
          xe = i.onMove;
        let me = D || V,
          $e = D ? 'before' : 'after';
        if (xe) {
          if ($e === 'after') {
            const Pe = m.getTask(me);
            Pe.data?.length &&
              Pe.open &&
              (($e = 'before'), (me = Pe.data[0].id));
          }
          He.current = { id: h, [$e]: me };
        } else He.current = null;
        m.exec('move-task', {
          id: h,
          mode: $e,
          target: me,
          inProgress: xe,
        });
      },
      [m],
    ),
    p = C(() => E?.from ?? 0, [E]),
    T = C(() => le?.height ?? 0, [le]),
    L = C(
      () => (!r && o !== 'grid' ? (x ?? 0) > (c ?? 0) : (x ?? 0) > (ve ?? 0)),
      [r, o, x, c, ve],
    ),
    de = C(() => {
      const i = {};
      return (
        (L && o === 'all') || (o === 'grid' && L)
          ? (i.width = x)
          : o === 'grid' && (i.width = '100%'),
        i
      );
    }, [L, o, x]),
    ee = C(() => (j && !I.find((i) => i.id === j.id) ? [...I, j] : I), [I, j]),
    Q = C(() => {
      let i = (ye || []).map((V) => {
        V = { ...V };
        const xe = V.header;
        if (typeof xe == 'object') {
          const me = xe.text && N(xe.text);
          V.header = { ...xe, text: me };
        } else V.header = N(xe);
        if (V.cell && V.id !== 'text' && V.id !== 'add-task') {
          const me = V.cell;
          V.cell = ($e) => /* @__PURE__ */ u(me, { ...$e, api: m });
        }
        return V;
      });
      const h = i.findIndex((V) => V.id === 'text'),
        D = i.findIndex((V) => V.id === 'add-task');
      if (
        (h !== -1 && (i[h].cell && (i[h]._cell = i[h].cell), (i[h].cell = Sn)),
        D !== -1)
      ) {
        i[D].cell = i[D].cell || Lt;
        const V = i[D].header;
        if (
          (typeof V != 'object' && (i[D].header = { text: V }),
          (i[D].header.cell = V.cell || Lt),
          n)
        )
          i.splice(D, 1);
        else if (r) {
          const [xe] = i.splice(D, 1);
          i.unshift(xe);
        }
      }
      return i.length > 0 && (i[i.length - 1].resize = !1), i;
    }, [ye, N, n, r, m]),
    he = C(
      () =>
        o === 'all'
          ? `${c}px`
          : o === 'grid'
            ? 'calc(100% - 4px)'
            : Q.find((i) => i.id === 'add-task')
              ? '50px'
              : '0',
      [o, c, Q],
    ),
    Ge = C(() => {
      if (ee && ie?.length) {
        const i = {};
        return (
          ie.forEach(({ key: h, order: D }, V) => {
            i[h] = {
              order: D,
              ...(ie.length > 1 && { index: V }),
            };
          }),
          i
        );
      }
      return {};
    }, [ee, ie]),
    _e = A(() => Q.some((i) => i.flexgrow && !i.hidden), []),
    Re = C(() => _e(), [_e, Me]),
    Ne = C(() => {
      let i = o === 'chart' ? Q.filter((D) => D.id === 'add-task') : Q;
      const h = o === 'all' ? c : ve;
      if (!Re) {
        let D = x,
          V = !1;
        if (Q.some((xe) => xe.$width)) {
          let xe = 0;
          (D = Q.reduce(
            (me, $e) => (
              $e.hidden || ((xe += $e.width), (me += $e.$width || $e.width)), me
            ),
            0,
          )),
            xe > D && D > h && (V = !0);
        }
        if (V || D < h) {
          let xe = 1;
          return (
            V || (xe = (h - 50) / (D - 50 || 1)),
            i.map(
              (me) => (
                me.id !== 'add-task' &&
                  !me.hidden &&
                  (me.$width || (me.$width = me.width),
                  (me.width = me.$width * xe)),
                me
              ),
            )
          );
        }
      }
      return i;
    }, [o, Q, Re, x, c, ve]),
    ze = A(
      (i) => {
        if (!_e()) {
          const h = Ne.reduce(
            (D, V) => (
              i && V.$width && (V.$width = V.width),
              D + (V.hidden ? 0 : V.width)
            ),
            0,
          );
          h !== x && B(h);
        }
        Te(!0), Te(!1);
      },
      [_e, Ne, x, B],
    ),
    l = A(() => {
      Q.filter((h) => h.flexgrow && !h.hidden).length === 1 &&
        Q.forEach((h) => {
          h.$width && !h.flexgrow && !h.hidden && (h.width = h.$width);
        });
    }, []),
    z = A(
      (i) => {
        if (!n) {
          const h = Ze(i),
            D = dn(i, 'data-col-id');
          !(D && Q.find((xe) => xe.id == D))?.editor &&
            h &&
            m.exec('show-editor', { id: h });
        }
      },
      [m, n],
      // cols is defined later; relies on latest value at call time
    ),
    W = C(() => (Array.isArray(Z) ? Z.map((i) => i.id) : []), [Z]),
    b = A(() => {
      if (S.current && ee !== null) {
        const i = S.current.querySelector('.wx-body');
        i &&
          (g
            ? (i.style.top = '0px')
            : (i.style.top = -((Y ?? 0) - (p ?? 0)) + 'px'));
      }
      q.current && (q.current.scrollTop = 0);
    }, [ee, Y, p, g]);
  se(() => {
    S.current && b();
  }, [Y, p, b]),
    se(() => {
      const i = S.current;
      if (!i) return;
      const h = i.querySelector('.wx-table-box .wx-body');
      if (!h || typeof ResizeObserver > 'u') return;
      const D = new ResizeObserver(() => {
        b();
      });
      return (
        D.observe(h),
        () => {
          D.disconnect();
        }
      );
    }, [Ne, de, o, he, ee, b]),
    se(() => {
      if (!re || !_) return;
      const { id: i } = re,
        h = _.getState().focusCell;
      h &&
        h.row !== i &&
        S.current &&
        S.current.contains(document.activeElement) &&
        _.exec('focus-cell', {
          row: i,
          column: h.column,
        });
    }, [re, _]),
    se(() => {
      if (!g) return;
      const i = S.current;
      if (!i) return;
      const h = i.querySelector('.wx-table-box .wx-body');
      if (!h) return;
      let D = 0;
      h.querySelectorAll('[data-id]').forEach((xe) => {
        const me = xe.getAttribute('data-id'),
          $e = (s && me && s[me]) || O;
        (xe.style.height = `${$e}px`),
          (xe.style.minHeight = `${$e}px`),
          (D += $e);
      }),
        D > 0 && (h.style.height = `${D}px`);
    }, [s, g, ee, O]);
  const Le = A(
      ({ id: i }) => {
        if (n) return !1;
        m.getTask(i).open && m.exec('open-task', { id: i, mode: !1 });
        const h = m.getState()._tasks.find((D) => D.id === i);
        if ((J(h || null), !h)) return !1;
      },
      [m, n],
    ),
    ce = A(
      ({ id: i, top: h }) => {
        He.current
          ? pe({ ...He.current, onMove: !1 })
          : m.exec('drag-task', {
              id: i,
              top: h + (p ?? 0),
              inProgress: !1,
            }),
          J(null);
      },
      [m, pe, p],
    ),
    be = A(
      ({ id: i, top: h, detail: D }) => {
        D && pe({ ...D, onMove: !0 }),
          m.exec('drag-task', {
            id: i,
            top: h + (p ?? 0),
            inProgress: !0,
          });
      },
      [m, pe, p],
    );
  se(() => {
    const i = S.current;
    return i
      ? Dn(i, {
          start: Le,
          end: ce,
          move: be,
          getTask: m.getTask,
        }).destroy
      : void 0;
  }, [m, Le, ce, be]);
  const Ce = A(
      (i) => {
        const { key: h, isInput: D } = i;
        if (!D && (h === 'arrowup' || h === 'arrowdown'))
          return (i.eventSource = 'grid'), m.exec('hotkey', i), !1;
        if (h === 'enter') {
          const V = _?.getState().focusCell;
          if (V) {
            const { row: xe, column: me } = V;
            me === 'add-task'
              ? F(xe, 'add-task')
              : me === 'text' && F(xe, 'open-task');
          }
        }
      },
      [m, F, _],
    ),
    Ee = ne(null),
    De = () => {
      Ee.current = {
        setTableAPI: G,
        handleHotkey: Ce,
        sortVal: ie,
        api: m,
        adjustColumns: l,
        setColumnWidth: ze,
        tasks: I,
        calendarVal: U,
        durationUnitVal: ue,
        splitTasksVal: te,
        onTableAPIChange: y,
      };
    };
  De(),
    se(() => {
      De();
    }, [G, Ce, ie, m, l, ze, I, U, ue, te, y]);
  const We = A((i) => {
    G(i),
      i.intercept('hotkey', (h) => Ee.current.handleHotkey(h)),
      i.intercept('scroll', () => !1),
      i.intercept('select-row', () => !1),
      i.intercept('sort-rows', (h) => {
        const D = Ee.current.sortVal,
          { key: V, add: xe } = h,
          me = D ? D.find((Pe) => Pe.key === V) : null;
        let $e = 'asc';
        return (
          me && ($e = !me || me.order === 'asc' ? 'desc' : 'asc'),
          m.exec('sort-tasks', {
            key: V,
            order: $e,
            add: xe,
          }),
          !1
        );
      }),
      i.on('resize-column', () => {
        Ee.current.setColumnWidth(!0);
      }),
      i.on('hide-column', (h) => {
        h.mode || Ee.current.adjustColumns(), Ee.current.setColumnWidth();
      }),
      i.intercept('update-cell', (h) => {
        const { id: D, column: V, value: xe } = h,
          me = Ee.current.tasks.find(($e) => $e.id === D);
        if (me) {
          const $e = { ...me };
          let Pe = xe;
          Pe && !isNaN(Pe) && !(Pe instanceof Date) && (Pe *= 1),
            ($e[V] = Pe),
            Gt(
              $e,
              {
                calendar: Ee.current.calendarVal,
                durationUnit: Ee.current.durationUnitVal,
                splitTasks: Ee.current.splitTasksVal,
              },
              V,
            ),
            m.exec('update-task', {
              id: D,
              task: $e,
            });
        }
        return !1;
      }),
      y && y(i);
  }, []);
  return /* @__PURE__ */ u('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${he}` },
    ref: q,
    children: /* @__PURE__ */ u('div', {
      ref: S,
      style: de,
      className: 'wx-rHj6070p wx-table',
      onClick: H,
      onDoubleClick: z,
      children: /* @__PURE__ */ u(Tn, {
        init: We,
        sizes: {
          rowHeight: O,
          headerHeight: (T ?? 0) - 1,
        },
        rowStyle: (i) =>
          i.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (i) =>
          `wx-rHj6070p wx-text-${i.align}${i.id === 'add-task' ? ' wx-action' : ''}`,
        data: ee,
        columns: Ne,
        selectedRows: [...W],
        sortMarks: Ge,
      }),
    }),
  });
}
function In({ borders: t = '', rowLayout: n = null }) {
  const r = Xe(Ue),
    c = X(r, 'cellWidth'),
    o = X(r, 'cellHeight'),
    M = ne(null),
    [k, y] = ge('#e4e4e4');
  se(() => {
    if (typeof getComputedStyle < 'u' && M.current) {
      const s = getComputedStyle(M.current).getPropertyValue(
        '--wx-gantt-border',
      );
      y(s ? s.substring(s.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const g = C(() => {
    if (!n) return null;
    const s = [];
    let x = 0;
    for (const B of n) (x += B.height), s.push(x);
    return s;
  }, [n]);
  if (!g) {
    const s = {
      width: '100%',
      height: '100%',
      background: c != null && o != null ? `url(${hn(c, o, k, t)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ u('div', { ref: M, style: s });
  }
  const R = c
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${c - 1}px, ${k} ${c - 1}px, ${k} ${c}px)`
    : void 0;
  return /* @__PURE__ */ Ae('div', {
    ref: M,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ u('div', {
        style: {
          width: '100%',
          height: '100%',
          background: R,
          position: 'absolute',
        },
      }),
      g.map((s, x) =>
        /* @__PURE__ */ u(
          'div',
          {
            style: {
              position: 'absolute',
              top: `${s}px`,
              width: '100%',
              height: '1px',
              backgroundColor: k,
            },
          },
          x,
        ),
      ),
    ],
  });
}
function Nn({ onSelectLink: t, selectedLink: n, readonly: r }) {
  const c = Xe(Ue),
    o = X(c, '_links'),
    M = X(c, 'criticalPath'),
    k = ne(null),
    y = A(
      (g) => {
        const R = g?.target?.classList;
        !R?.contains('wx-line') && !R?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    se(() => {
      if (!r && n && k.current) {
        const g = (R) => {
          k.current && !k.current.contains(R.target) && y(R);
        };
        return (
          document.addEventListener('click', g),
          () => {
            document.removeEventListener('click', g);
          }
        );
      }
    }, [r, n, y]),
    /* @__PURE__ */ Ae('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (o || []).map((g) => {
          const R =
            'wx-dkx3NwEn wx-line' +
            (M && g.$critical ? ' wx-critical' : '') +
            (r ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ u(
            'polyline',
            {
              className: R,
              points: g.$p,
              onClick: () => !r && t(g.id),
              'data-link-id': g.id,
            },
            g.id,
          );
        }),
        !r &&
          n &&
          /* @__PURE__ */ u('polyline', {
            ref: k,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: n.$p,
          }),
      ],
    })
  );
}
function Hn(t) {
  const { task: n, type: r } = t;
  function c(M) {
    const k = n.segments[M];
    return {
      left: `${k.$x}px`,
      top: '0px',
      width: `${k.$w}px`,
      height: '100%',
    };
  }
  function o(M) {
    if (!n.progress) return 0;
    const k = (n.duration * n.progress) / 100,
      y = n.segments;
    let g = 0,
      R = 0,
      s = null;
    do {
      const x = y[R];
      R === M &&
        (g > k ? (s = 0) : (s = Math.min((k - g) / x.duration, 1) * 100)),
        (g += x.duration),
        R++;
    } while (s === null && R < y.length);
    return s || 0;
  }
  return /* @__PURE__ */ u('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((M, k) =>
      /* @__PURE__ */ Ae(
        'div',
        {
          className: `wx-segment wx-bar wx-${r} wx-GKbcLEGA`,
          'data-segment': k,
          style: c(k),
          children: [
            n.progress
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ u('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${o(k)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ u('div', {
              className: 'wx-content',
              children: M.text || '',
            }),
          ],
        },
        k,
      ),
    ),
  });
}
let dt = [],
  ft = null,
  It = null;
const Nt = (t, n, r, c) => t < c && n > r,
  Ht = (t, n) => {
    if (!n || !n.start) return null;
    const { start: r, lengthUnitWidth: c, lengthUnit: o } = n,
      M = 864e5,
      k =
        o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1,
      y = Math.floor(t / c),
      g = new Date(r.getTime() + y * k * M);
    return g.setUTCHours(0, 0, 0, 0), g;
  },
  An = (t, n, r) => {
    if (!r || !t || !n) return 0;
    const { lengthUnit: c } = r,
      k =
        (c === 'week'
          ? 7
          : c === 'month'
            ? 30
            : c === 'quarter'
              ? 91
              : c === 'year'
                ? 365
                : 1) * 864e5;
    return Math.round((t.getTime() - n.getTime()) / k);
  },
  Pn = (t, n, r) => {
    if (!r || !t) return t;
    const { lengthUnit: c } = r,
      k =
        (c === 'week'
          ? 7
          : c === 'month'
            ? 30
            : c === 'quarter'
              ? 91
              : c === 'year'
                ? 365
                : 1) * 864e5,
      y = new Date(t.getTime() + n * k);
    return y.setUTCHours(0, 0, 0, 0), y;
  };
function Gn(t) {
  const {
      readonly: n,
      taskTemplate: r,
      multiTaskRows: c = !1,
      rowMapping: o = null,
      rowHeightOverrides: M = null,
      allowTaskIntersection: k = !0,
      summaryBarCounts: y = !1,
      marqueeSelect: g = !1,
      copyPaste: R = !1,
    } = t,
    s = Xe(Ue),
    [x, B] = mt(s, '_tasks'),
    [_, G] = mt(s, '_links'),
    v = X(s, 'area'),
    N = X(s, '_scales'),
    m = X(s, 'taskTypes'),
    Y = X(s, 'baselines'),
    O = X(s, '_selected'),
    re = X(s, '_scrollTask'),
    Z = X(s, 'criticalPath'),
    E = X(s, 'tasks'),
    we = X(s, 'schedule'),
    le = X(s, 'splitTasks'),
    ye = X(s, 'summary'),
    ie = C(() => {
      if (!v || !Array.isArray(x)) return [];
      const e = v.start ?? 0,
        a = v.end ?? 0;
      return c && o
        ? x.map((f) => ({ ...f }))
        : x.slice(e, a).map((f) => ({ ...f }));
    }, [B, v, c, o]),
    U = X(s, 'cellHeight'),
    ue = C(() => {
      if (!c || !o || !ie.length) return ie;
      const e = /* @__PURE__ */ new Map(),
        a = [];
      x.forEach(($) => {
        const oe = o.taskRows.get($.id) ?? $.id;
        e.has(oe) || (e.set(oe, a.length), a.push(oe));
      });
      const f = /* @__PURE__ */ new Map();
      ie.forEach(($) => {
        if ($.type === 'summary') return;
        const oe = o.taskRows.get($.id) ?? $.id;
        f.has(oe) || f.set(oe, []), f.get(oe).push($);
      });
      const d = /* @__PURE__ */ new Map(),
        w = /* @__PURE__ */ new Map();
      f.forEach(($, oe) => {
        const ae = [],
          Se = [...$].sort((ke, Ie) => (ke.$x ?? 0) - (Ie.$x ?? 0));
        for (const ke of Se) {
          const Ie = ke.$x ?? 0,
            Ve = Ie + (ke.$w ?? 0);
          let Oe = !1;
          for (let Ye = 0; Ye < ae.length; Ye++)
            if (
              !ae[Ye].some((je) => {
                const rt = je.$x ?? 0,
                  ut = rt + (je.$w ?? 0);
                return Nt(Ie, Ve, rt, ut);
              })
            ) {
              ae[Ye].push(ke), d.set(ke.id, Ye), (Oe = !0);
              break;
            }
          Oe || (ae.push([ke]), d.set(ke.id, ae.length - 1));
        }
        w.set(oe, ae.length);
      });
      const P = /* @__PURE__ */ new Map();
      let K = 0;
      for (const $ of a) {
        P.set($, K);
        const oe = (M && M[$]) || U;
        K += oe;
      }
      return ie.map(($) => {
        const oe = o.taskRows.get($.id) ?? $.id,
          ae = P.get(oe) ?? 0;
        if ($.type === 'summary') {
          if ((f.get(oe) || []).length > 0) return { ...$, $y: ae, $skip: !0 };
          const Ye = (M && M[oe]) || U,
            Ke = Math.max(0, Math.floor((Ye - $.$h) / 2));
          return {
            ...$,
            $y: ae + Ke,
            $y_base: $.$y_base !== void 0 ? ae + Ke : void 0,
          };
        }
        const Se = w.get(oe) || 1,
          ke = d.get($.id) ?? 0;
        if (Se > 1) {
          const Ke = $.$h + 4,
            je = ae + 3 + ke * Ke;
          return {
            ...$,
            $y: je,
            $y_base: $.$y_base !== void 0 ? je : void 0,
          };
        }
        const Ie = (M && M[oe]) || U,
          Ve = Math.max(0, Math.round((Ie - $.$h) / 2));
        return {
          ...$,
          $y: ae + Ve,
          $y_base: $.$y_base !== void 0 ? ae + Ve : void 0,
        };
      });
    }, [ie, c, o, x, U, M]),
    te = C(() => N.lengthUnitWidth, [N]),
    j = C(() => N.lengthUnit || 'day', [N]),
    J = C(() => {
      const e = /* @__PURE__ */ new Set();
      if (k || !c || !o) return e;
      const a = /* @__PURE__ */ new Map();
      return (
        x.forEach((f) => {
          if (f.type === 'summary' || f.type === 'milestone') return;
          const d = o.taskRows.get(f.id) ?? f.id;
          a.has(d) || a.set(d, []), a.get(d).push(f);
        }),
        a.forEach((f) => {
          if (!(f.length < 2))
            for (let d = 0; d < f.length; d++)
              for (let w = d + 1; w < f.length; w++) {
                const P = f[d],
                  K = f[w];
                Nt(P.$x, P.$x + P.$w, K.$x, K.$x + K.$w) &&
                  (e.add(P.id), e.add(K.id));
              }
        }),
        e
      );
    }, [k, c, o, x, B]),
    I = C(() => {
      if (!y || !x?.length || !te) return null;
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Set();
      x.forEach((d) => {
        d.type === 'summary' && a.add(d.id),
          d.parent &&
            d.parent !== 0 &&
            d.type !== 'summary' &&
            (e.has(d.parent) || e.set(d.parent, []), e.get(d.parent).push(d));
      });
      const f = /* @__PURE__ */ new Map();
      return (
        a.forEach((d) => {
          const w = e.get(d);
          if (!w?.length) return;
          const P = /* @__PURE__ */ new Map();
          w.forEach((K) => {
            if (K.$x == null || K.$w == null) return;
            const $ = Math.floor(K.$x / te),
              oe = Math.ceil((K.$x + K.$w) / te);
            for (let ae = $; ae < oe; ae++) P.set(ae, (P.get(ae) || 0) + 1);
          }),
            P.size > 0 && f.set(d, P);
        }),
        f
      );
    }, [y, x, te]),
    [F, H] = ge(null),
    S = ne(null),
    [q, ve] = ge(null),
    [fe, Me] = ge(null),
    [Te, He] = ge(null),
    pe = ne(null);
  pe.current = Te;
  const p = ne(0),
    T = ne(!1),
    [L, de] = ge(void 0),
    [ee, Q] = ge(null),
    he = ne(null),
    [Ge, _e] = ge(null),
    Re = C(
      () =>
        Ge && {
          ..._.find((e) => e.id === Ge),
        },
      [Ge, G],
    ),
    [Ne, ze] = ge(void 0),
    l = ne(null),
    [z, W] = ge(0),
    b = ne(null),
    Le = C(() => {
      const e = b.current;
      return !!(O.length && e && e.contains(document.activeElement));
    }, [O, b.current]),
    ce = C(() => Le && O[O.length - 1]?.id, [Le, O]);
  se(() => {
    if (re && Le && re) {
      const { id: e } = re,
        a = b.current?.querySelector(`.wx-bar[data-id='${e}']`);
      a && a.focus({ preventScroll: !0 });
    }
  }, [re]),
    se(() => {
      const e = b.current;
      if (e && (W(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const a = new ResizeObserver((f) => {
          f[0] && W(f[0].contentRect.width);
        });
        return a.observe(e), () => a.disconnect();
      }
    }, [b.current]);
  const be = A(() => {
      document.body.style.userSelect = 'none';
    }, []),
    Ce = A(() => {
      document.body.style.userSelect = '';
    }, []),
    Ee = C(() => {
      if (!c || !o || !x?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        x.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id;
          a.has(w) || (a.set(w, f.length), f.push(w));
        }),
        x.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id,
            P = a.get(w) ?? 0;
          e.set(d.id, P * U);
        }),
        e
      );
    }, [x, c, o, U]),
    De = C(() => {
      if (!c || !o || !x?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        x.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id;
          a.has(w) || (a.set(w, f.length), f.push(w));
        }),
        x.forEach((d) => {
          const w = d.row ?? d.id;
          if (!e.has(w)) {
            const P = o.taskRows.get(d.id) ?? d.id,
              K = a.get(P) ?? 0;
            e.set(w, K * U);
          }
        }),
        e
      );
    }, [x, c, o, U]),
    We = A(
      (e) => {
        if (!b.current) return [];
        const a = Math.min(e.startX, e.currentX),
          f = Math.max(e.startX, e.currentX),
          d = Math.min(e.startY, e.currentY),
          w = Math.max(e.startY, e.currentY);
        return x.filter((P) => {
          const K = P.$x,
            $ = P.$x + P.$w,
            ae = Ee.get(P.id) ?? P.$y,
            Se = ae + P.$h;
          return K < f && $ > a && ae < w && Se > d;
        });
      },
      [x, Ee],
    ),
    i = A(() => {
      if (!R) return;
      const e = s.getState()._selected;
      if (!e || !e.length) return;
      const a = 864e5,
        f = e
          .map(($) => {
            if (!s.getTask($.id)) return null;
            const ae = x.find((ut) => ut.id === $.id);
            if (!ae) return null;
            const {
                $x: Se,
                $y: ke,
                $h: Ie,
                $w: Ve,
                $skip: Oe,
                $level: Ye,
                ...Ke
              } = ae,
              je =
                ae.end && ae.start
                  ? Math.round((ae.end.getTime() - ae.start.getTime()) / a)
                  : 0,
              rt = ae.start ? (ae.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...Ke,
              _durationDays: je,
              _startDayOfWeek: rt,
              _originalWidth: Ve,
              _originalHeight: Ie,
            };
          })
          .filter(Boolean);
      if (!f.length) return;
      const w = f[0].parent,
        P = f.filter(($) => $.parent === w);
      if (P.length === 0) return;
      const K = P.reduce(
        ($, oe) => (oe.start && (!$ || oe.start < $) ? oe.start : $),
        null,
      );
      (dt = P.map(($) => ({
        ...$,
        _startCellOffset: An($.start, K, N),
      }))),
        (It = w),
        (ft = K);
    }, [R, s, x, N]),
    h = A(
      (e, a, f) => {
        if (!a.length || !e || f == null) return;
        const d = 864e5,
          w = s.getHistory();
        w?.startBatch();
        const P = new Date(e);
        P.setUTCHours(0, 0, 0, 0),
          a.forEach((K, $) => {
            const oe = `task-${Date.now()}-${$}`,
              ae = Pn(P, K._startCellOffset || 0, N),
              Se = new Date(ae.getTime() + (K._startDayOfWeek || 0) * d);
            Se.setUTCHours(0, 0, 0, 0);
            const ke = new Date(Se.getTime() + (K._durationDays || 7) * d);
            ke.setUTCHours(0, 0, 0, 0),
              s.exec('add-task', {
                task: {
                  id: oe,
                  text: K.text,
                  start: Se,
                  end: ke,
                  type: K.type || 'task',
                  parent: f,
                  row: K.row,
                },
                target: f,
                mode: 'child',
                skipUndo: $ > 0,
              });
          }),
          w?.endBatch();
      },
      [s, N],
    );
  se(
    () =>
      R
        ? s.intercept('hotkey', (a) => {
            if (a.key === 'ctrl+c' || a.key === 'meta+c') return i(), !1;
            if (a.key === 'ctrl+v' || a.key === 'meta+v')
              return (
                !dt.length ||
                  !ft ||
                  Me({
                    tasks: dt,
                    baseDate: ft,
                    parent: It,
                    currentX: p.current,
                  }),
                !1
              );
          })
        : void 0,
    [R, s, i],
  ),
    se(() => {
      if (!fe) return;
      const e = (a) => {
        a.key === 'Escape' &&
          (a.preventDefault(), a.stopPropagation(), Me(null));
      };
      return (
        document.addEventListener('keydown', e, !0),
        () => document.removeEventListener('keydown', e, !0)
      );
    }, [fe]);
  const D = A(
      (e, a, f) => {
        if (
          a.target.classList.contains('wx-line') ||
          (f || (f = s.getTask(Qe(e))),
          f.type === 'milestone' || f.type === 'summary')
        )
          return '';
        const d = Fe(a, 'data-segment');
        d && (e = d);
        const { left: w, width: P } = e.getBoundingClientRect(),
          K = (a.clientX - w) / P;
        let $ = 0.2 / (P > 200 ? P / 200 : 1);
        return K < $ ? 'start' : K > 1 - $ ? 'end' : '';
      },
      [s],
    ),
    V = A(
      (e, a) => {
        const { clientX: f } = a,
          d = Qe(e),
          w = s.getTask(d),
          P = a.target.classList;
        if (
          !a.target.closest('.wx-delete-button') &&
          !a.target.closest('[data-interactive]') &&
          !n
        ) {
          if (P.contains('wx-progress-marker')) {
            const { progress: K } = s.getTask(d);
            (he.current = {
              id: d,
              x: f,
              progress: K,
              dx: 0,
              node: e,
              marker: a.target,
            }),
              a.target.classList.add('wx-progress-in-drag');
          } else {
            const K = D(e, a, w) || 'move',
              $ = {
                id: d,
                mode: K,
                x: f,
                dx: 0,
                l: w.$x,
                w: w.$w,
              };
            if (le && w.segments?.length) {
              const oe = Fe(a, 'data-segment');
              oe && (($.segmentIndex = oe.dataset.segment * 1), mn(w, $));
            }
            Q($);
          }
          be();
        }
      },
      [s, n, D, be, le],
    ),
    xe = A(
      (e) => {
        if (e.button !== 0 || fe) return;
        const a = Fe(e);
        if (!a && g && !n) {
          const f = b.current;
          if (!f) return;
          const d = f.getBoundingClientRect(),
            w = e.clientX - d.left,
            P = e.clientY - d.top;
          if (R) {
            const $ = Ht(w, N);
            $ && ((pe.current = $), He($));
          }
          const K = {
            startX: w,
            startY: P,
            currentX: w,
            currentY: P,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          H(K), (S.current = K), be();
          return;
        }
        if (a && g && !n && O.length > 1) {
          const f = Qe(a);
          if (O.some((w) => w.id === f)) {
            ve({
              startX: e.clientX,
              ids: O.map((w) => w.id),
              tasks: O.map((w) => {
                const P = s.getTask(w.id);
                return {
                  id: w.id,
                  start: P.start,
                  end: P.end,
                  $x: P.$x,
                  $w: P.$w,
                };
              }),
            }),
              be();
            return;
          }
        }
        a && V(a, e);
      },
      [V, g, R, n, fe, N, O, s, be],
    ),
    me = A(
      (e) => {
        const a = Fe(e);
        a &&
          (l.current = setTimeout(() => {
            ze(!0), V(a, e.touches[0]);
          }, 300));
      },
      [V],
    ),
    $e = A((e) => {
      _e(e);
    }, []),
    Pe = A(() => {
      const e = S.current;
      if (e) {
        const a = We(e);
        e.ctrlKey
          ? a.forEach((f) => {
              s.exec('select-task', { id: f.id, toggle: !0, marquee: !0 });
            })
          : (O.length > 0 && s.exec('select-task', { id: null, marquee: !0 }),
            a.forEach((f, d) => {
              s.exec('select-task', {
                id: f.id,
                toggle: d > 0,
                marquee: !0,
              });
            })),
          H(null),
          (S.current = null),
          Ce(),
          (T.current = !0);
        return;
      }
      if (q) {
        const { ids: a, tasks: f, startX: d } = q;
        ve(null), Ce(), (T.current = !0);
        return;
      }
      if (he.current) {
        const { dx: a, id: f, marker: d, value: w } = he.current;
        (he.current = null),
          typeof w < 'u' &&
            a &&
            s.exec('update-task', {
              id: f,
              task: { progress: w },
              inProgress: !1,
            }),
          d.classList.remove('wx-progress-in-drag'),
          (T.current = !0),
          Ce();
      } else if (ee) {
        const {
          id: a,
          mode: f,
          dx: d,
          l: w,
          w: P,
          start: K,
          segment: $,
          index: oe,
        } = ee;
        if ((Q(null), K)) {
          const ae = Math.round(d / te);
          if (!ae)
            s.exec('drag-task', {
              id: a,
              width: P,
              left: w,
              inProgress: !1,
              ...($ && { segmentIndex: oe }),
            });
          else {
            let Se = {},
              ke = s.getTask(a);
            $ && (ke = ke.segments[oe]);
            const Ie = 1440 * 60 * 1e3,
              Oe =
                ae *
                (j === 'week'
                  ? 7
                  : j === 'month'
                    ? 30
                    : j === 'quarter'
                      ? 91
                      : j === 'year'
                        ? 365
                        : 1) *
                Ie;
            f === 'move'
              ? ((Se.start = new Date(ke.start.getTime() + Oe)),
                (Se.end = new Date(ke.end.getTime() + Oe)))
              : f === 'start'
                ? ((Se.start = new Date(ke.start.getTime() + Oe)),
                  (Se.end = ke.end))
                : f === 'end' &&
                  ((Se.start = ke.start),
                  (Se.end = new Date(ke.end.getTime() + Oe))),
              s.exec('update-task', {
                id: a,
                task: Se,
                ...($ && { segmentIndex: oe }),
              });
          }
          T.current = !0;
        }
        Ce();
      }
    }, [s, Ce, ee, te, j]),
    tt = A(
      (e, a) => {
        const { clientX: f } = a;
        if (R && b.current) {
          const d = b.current.getBoundingClientRect();
          p.current = f - d.left;
        }
        if (fe && b.current) {
          const d = b.current.getBoundingClientRect();
          Me((w) => (w ? { ...w, currentX: f - d.left } : null));
        }
        if (F) {
          const d = b.current;
          if (!d) return;
          const w = d.getBoundingClientRect(),
            P = f - w.left,
            K = a.clientY - w.top;
          H(($) => ({
            ...$,
            currentX: P,
            currentY: K,
          })),
            S.current && ((S.current.currentX = P), (S.current.currentY = K));
          return;
        }
        if (!n)
          if (he.current) {
            const { node: d, x: w, id: P } = he.current,
              K = (he.current.dx = f - w),
              $ = Math.round((K / d.offsetWidth) * 100);
            let oe = he.current.progress + $;
            (he.current.value = oe = Math.min(Math.max(0, oe), 100)),
              s.exec('update-task', {
                id: P,
                task: { progress: oe },
                inProgress: !0,
              });
          } else if (ee) {
            $e(null);
            const {
                mode: d,
                l: w,
                w: P,
                x: K,
                id: $,
                start: oe,
                segment: ae,
                index: Se,
              } = ee,
              ke = s.getTask($),
              Ie = f - K,
              Ve = Math.round(te) || 1;
            if (
              (!oe && Math.abs(Ie) < 20) ||
              (d === 'start' && P - Ie < Ve) ||
              (d === 'end' && P + Ie < Ve) ||
              (d === 'move' &&
                ((Ie < 0 && w + Ie < 0) || (Ie > 0 && w + P + Ie > z))) ||
              (ee.segment && !gn(ke, ee))
            )
              return;
            const Oe = { ...ee, dx: Ie };
            let Ye, Ke;
            if (
              (d === 'start'
                ? ((Ye = w + Ie), (Ke = P - Ie))
                : d === 'end'
                  ? ((Ye = w), (Ke = P + Ie))
                  : d === 'move' && ((Ye = w + Ie), (Ke = P)),
              s.exec('drag-task', {
                id: $,
                width: Ke,
                left: Ye,
                inProgress: !0,
                start: oe,
                ...(ae && { segmentIndex: Se }),
              }),
              !Oe.start &&
                ((d === 'move' && ke.$x == w) || (d !== 'move' && ke.$w == P)))
            ) {
              (T.current = !0), Pe();
              return;
            }
            (Oe.start = !0), Q(Oe);
          } else {
            const d = Fe(e);
            if (d) {
              const w = s.getTask(Qe(d)),
                K = Fe(e, 'data-segment') || d,
                $ = D(K, a, w);
              K.style.cursor = $ && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [s, n, ee, te, z, D, $e, Pe],
    ),
    Xt = A(
      (e) => {
        tt(e, e);
      },
      [tt],
    ),
    Kt = A(
      (e) => {
        Ne
          ? (e.preventDefault(), tt(e, e.touches[0]))
          : l.current && (clearTimeout(l.current), (l.current = null));
      },
      [Ne, tt],
    ),
    ct = A(() => {
      Pe();
    }, [Pe]),
    Bt = A(() => {
      ze(null),
        l.current && (clearTimeout(l.current), (l.current = null)),
        Pe();
    }, [Pe]);
  se(
    () => (
      window.addEventListener('mouseup', ct),
      () => {
        window.removeEventListener('mouseup', ct);
      }
    ),
    [ct],
  );
  const Vt = A(
      (e) => {
        if (!n) {
          if (e.target.closest('[data-interactive]')) return;
          const a = Ze(e.target);
          if (a && !e.target.classList.contains('wx-link')) {
            const f = Ze(e.target, 'data-segment');
            s.exec('show-editor', {
              id: a,
              ...(f !== null && { segmentIndex: f }),
            });
          }
        }
      },
      [s, n],
    ),
    Ft = ['e2s', 's2s', 'e2e', 's2e'],
    nt = A((e, a) => Ft[(e ? 1 : 0) + (a ? 0 : 2)], []),
    st = A(
      (e, a) => {
        const f = L.id,
          d = L.start;
        return e === f
          ? !0
          : !!_.find(
              (w) => w.target == e && w.source == f && w.type === nt(d, a),
            );
      },
      [L, G, nt],
    ),
    wt = A(() => {
      L && de(null);
    }, [L]),
    qt = A(
      (e) => {
        if (T.current) {
          T.current = !1;
          return;
        }
        if (fe && fe.currentX != null) {
          const f = Ht(fe.currentX, N);
          f && h(f, fe.tasks, fe.parent), Me(null);
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const a = Ze(e.target);
        if (a) {
          const f = e.target.classList;
          if (f.contains('wx-link')) {
            const d = f.contains('wx-left');
            if (!L) {
              de({ id: a, start: d });
              return;
            }
            L.id !== a &&
              !st(a, d) &&
              s.exec('add-link', {
                link: {
                  source: L.id,
                  target: a,
                  type: nt(L.start, d),
                },
              });
          } else if (f.contains('wx-delete-button-icon'))
            s.exec('delete-link', { id: Ge }), _e(null);
          else {
            let d;
            const w = Fe(e, 'data-segment');
            w && (d = w.dataset.segment * 1),
              s.exec('select-task', {
                id: a,
                toggle: e.ctrlKey || e.metaKey,
                range: e.shiftKey,
                segmentIndex: d,
              });
          }
        }
        wt();
      },
      [s, L, G, Re, st, nt, wt],
    ),
    Ut = A((e) => {
      const a = {
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      };
      return e.color && (a.backgroundColor = e.color), a;
    }, []),
    jt = A(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    Qt = A(
      (e) => {
        if (Ne || l.current) return e.preventDefault(), !1;
      },
      [Ne],
    ),
    pt = C(() => m.map((e) => e.id), [m]),
    xt = A(
      (e) => {
        let a = pt.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (a = `task ${a}`), a
        );
      },
      [pt],
    ),
    yt = A(
      (e) => {
        s.exec(e.action, e.data);
      },
      [s],
    ),
    at = A((e) => Z && E.byId(e).$critical, [Z, E]),
    vt = A(
      (e) => {
        if (we?.auto) {
          const a = E.getSummaryId(e, !0),
            f = E.getSummaryId(L.id, !0);
          return (
            L?.id &&
            !(Array.isArray(a) ? a : [a]).includes(L.id) &&
            !(Array.isArray(f) ? f : [f]).includes(e)
          );
        }
        return L;
      },
      [we, E, L],
    );
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${ue.length ? ue[0].$h : 0}px` },
    ref: b,
    onContextMenu: Qt,
    onMouseDown: xe,
    onMouseMove: Xt,
    onTouchStart: me,
    onTouchMove: Kt,
    onTouchEnd: Bt,
    onClick: qt,
    onDoubleClick: Vt,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ u(Nn, {
        onSelectLink: $e,
        selectedLink: Re,
        readonly: n,
      }),
      ue.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const a = J.has(e.id),
          f =
            `wx-bar wx-${xt(e.type)}` +
            (Ne && ee && e.id === ee.id ? ' wx-touch' : '') +
            (L && L.id === e.id ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (le && e.segments ? ' wx-split' : '') +
            (a ? ' wx-collision' : ''),
          d =
            'wx-link wx-left' +
            (L ? ' wx-visible' : '') +
            (!L || (!st(e.id, !0) && vt(e.id)) ? ' wx-target' : '') +
            (L && L.id === e.id && L.start ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : ''),
          w =
            'wx-link wx-right' +
            (L ? ' wx-visible' : '') +
            (!L || (!st(e.id, !1) && vt(e.id)) ? ' wx-target' : '') +
            (L && L.id === e.id && !L.start ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ Ae(
          Jt,
          {
            children: [
              !e.$skip &&
                /* @__PURE__ */ Ae('div', {
                  className: 'wx-GKbcLEGA ' + f,
                  style: Ut(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: ce === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === Re?.target && Re?.type[2] === 's'
                        ? /* @__PURE__ */ u(bt, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ u('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ u('div', {
                            className: 'wx-GKbcLEGA ' + d,
                            children: /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    e.type !== 'milestone'
                      ? /* @__PURE__ */ Ae(et, {
                          children: [
                            e.progress && !(le && e.segments)
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ u('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${e.progress}%` },
                                  }),
                                })
                              : null,
                            !n &&
                            !(le && e.segments) &&
                            !(e.type == 'summary' && ye?.autoProgress)
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${e.progress}% - 10px)`,
                                  },
                                  children: e.progress,
                                })
                              : null,
                            r
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ u(r, {
                                    data: e,
                                    api: s,
                                    onAction: yt,
                                  }),
                                })
                              : le && e.segments
                                ? /* @__PURE__ */ u(Hn, {
                                    task: e,
                                    type: xt(e.type),
                                  })
                                : /* @__PURE__ */ u('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: e.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ Ae(et, {
                          children: [
                            /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            r
                              ? /* @__PURE__ */ u(r, {
                                  data: e,
                                  api: s,
                                  onAction: yt,
                                })
                              : /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: e.text,
                                }),
                          ],
                        }),
                    n
                      ? null
                      : e.id === Re?.target && Re?.type[2] === 'e'
                        ? /* @__PURE__ */ u(bt, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ u('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ u('div', {
                            className: 'wx-GKbcLEGA ' + w,
                            children: /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    a &&
                      /* @__PURE__ */ u('div', {
                        className: 'wx-GKbcLEGA wx-collision-warning',
                        title:
                          'This task overlaps with another task in the same row',
                        children: '!',
                      }),
                    I &&
                      e.type === 'summary' &&
                      (() => {
                        const P = I.get(e.id),
                          K = Math.floor(e.$x / te),
                          $ = Math.ceil((e.$x + e.$w) / te);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: $ - K }, (oe, ae) => {
                            const Se = K + ae,
                              ke = P?.get(Se) || 0;
                            return /* @__PURE__ */ u(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${ke === 0 ? ' wx-week-count-zero' : ''}`,
                                style: {
                                  position: 'absolute',
                                  left: `${Se * te - e.$x}px`,
                                  width: `${te}px`,
                                  top: 0,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: ke,
                              },
                              Se,
                            );
                          }),
                        });
                      })(),
                  ],
                }),
              Y && !e.$skip_baseline
                ? /* @__PURE__ */ u('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (e.type === 'milestone' ? ' wx-milestone' : ''),
                    style: jt(e),
                  })
                : null,
            ],
          },
          e.id,
        );
      }),
      F &&
        (() => {
          const e = Math.min(F.startX, F.currentX),
            a = Math.min(F.startY, F.currentY),
            f = Math.abs(F.currentX - F.startX),
            d = Math.abs(F.currentY - F.startY);
          return /* @__PURE__ */ u('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${e}px`,
              top: `${a}px`,
              width: `${f}px`,
              height: `${d}px`,
            },
          });
        })(),
      fe &&
        fe.currentX != null &&
        fe.tasks.map((e, a) => {
          const d =
              (Math.floor(fe.currentX / te) + (e._startCellOffset || 0)) * te,
            w = e._originalWidth || te,
            P = e._originalHeight || U,
            K = De.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: d, top: K, width: w, height: P },
              children: /* @__PURE__ */ u('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: e.$barText || e.text,
              }),
            },
            `preview-${a}`,
          );
        }),
    ],
  });
}
function zn(t) {
  const { highlightTime: n, onScaleClick: r } = t,
    c = Xe(Ue),
    o = X(c, '_scales');
  return /* @__PURE__ */ u('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: o.width },
    children: (o?.rows || []).map((M, k) =>
      /* @__PURE__ */ u(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${M.height}px` },
          children: (M.cells || []).map((y, g) => {
            const R = n ? n(y.date, y.unit) : '',
              s = 'wx-cell ' + (y.css || '') + ' ' + (R || '');
            return /* @__PURE__ */ u(
              'div',
              {
                className: 'wx-ZkvhDKir ' + s,
                style: {
                  width: `${y.width}px`,
                  cursor: r ? 'pointer' : void 0,
                },
                onClick: r ? (x) => r(y.date, y.unit, x.nativeEvent) : void 0,
                children: y.value,
              },
              g,
            );
          }),
        },
        k,
      ),
    ),
  });
}
const _n = /* @__PURE__ */ new Map();
function Wn(t) {
  const n = ne(null),
    r = ne(0),
    c = ne(null),
    o = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    r.current++,
    se(() => {
      if (o)
        return (
          cancelAnimationFrame(c.current),
          (c.current = requestAnimationFrame(() => {
            const M = {
              label: t,
              time: performance.now() - n.current,
              renders: r.current,
              timestamp: Date.now(),
            };
            _n.set(t, M),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: M }),
              );
          })),
          () => cancelAnimationFrame(c.current)
        );
    });
}
function On(t) {
  const {
      readonly: n,
      fullWidth: r,
      fullHeight: c,
      taskTemplate: o,
      cellBorders: M,
      highlightTime: k,
      onScaleClick: y,
      multiTaskRows: g = !1,
      rowMapping: R = null,
      rowHeightOverrides: s = null,
      allowTaskIntersection: x = !0,
      summaryBarCounts: B = !1,
      marqueeSelect: _ = !1,
      copyPaste: G = !1,
    } = t,
    v = Xe(Ue),
    [N, m] = mt(v, '_selected'),
    Y = X(v, 'scrollTop'),
    O = X(v, 'cellHeight'),
    re = X(v, 'cellWidth'),
    Z = X(v, '_scales'),
    E = X(v, '_markers'),
    we = X(v, '_scrollTask'),
    le = X(v, 'zoom'),
    [ye, ie] = ge(),
    U = ne(null),
    ue = X(v, '_tasks'),
    te = 1 + (Z?.rows?.length || 0),
    j = C(() => {
      if (!g || !R || !ue?.length) return null;
      const p = /* @__PURE__ */ new Map(),
        T = /* @__PURE__ */ new Map(),
        L = [];
      return (
        ue.forEach((de) => {
          const ee = R.taskRows.get(de.id) ?? de.id;
          T.has(ee) || (T.set(ee, L.length), L.push(ee));
        }),
        ue.forEach((de) => {
          const ee = R.taskRows.get(de.id) ?? de.id,
            Q = T.get(ee) ?? 0;
          p.set(de.id, Q * O);
        }),
        p
      );
    }, [ue, g, R, O]),
    J = C(() => {
      const p = [];
      return (
        N &&
          N.length &&
          O &&
          N.forEach((T) => {
            const L = j?.get(T.id) ?? T.$y;
            p.push({ height: `${O}px`, top: `${L - 3}px` });
          }),
        p
      );
    }, [m, O, j]),
    I = C(() => Math.max(ye || 0, c), [ye, c]),
    F = C(() => {
      if (
        !s ||
        !g ||
        !R ||
        !ue?.length ||
        !Object.values(s).some((L) => L !== O)
      )
        return null;
      const T = [];
      return (
        ue.forEach((L) => {
          const de = R.taskRows.get(L.id) ?? L.id;
          T.includes(de) || T.push(de);
        }),
        T.map((L) => ({
          id: L,
          height: s[L] || O,
        }))
      );
    }, [ue, R, s, g, O]);
  se(() => {
    const p = U.current;
    p && typeof Y == 'number' && (p.scrollTop = g ? 0 : Y);
  }, [Y, g]);
  const H = () => {
    S();
  };
  function S(p) {
    const T = U.current;
    if (!T) return;
    const L = {};
    (L.left = T.scrollLeft), v.exec('scroll-chart', L);
  }
  function q() {
    const p = U.current,
      L = Math.ceil((ye || 0) / (O || 1)) + 1,
      de = Math.floor(((p && p.scrollTop) || 0) / (O || 1)),
      ee = Math.max(0, de - te),
      Q = de + L + te,
      he = ee * (O || 0);
    v.exec('render-data', {
      start: ee,
      end: Q,
      from: he,
    });
  }
  se(() => {
    q();
  }, [ye, Y]);
  const ve = A(
    (p) => {
      if (!p) return;
      const { id: T, mode: L } = p;
      if (L.toString().indexOf('x') < 0) return;
      const de = U.current;
      if (!de) return;
      const { clientWidth: ee } = de,
        Q = v.getTask(T);
      if (Q.$x + Q.$w < de.scrollLeft)
        v.exec('scroll-chart', { left: Q.$x - (re || 0) }),
          (de.scrollLeft = Q.$x - (re || 0));
      else if (Q.$x >= ee + de.scrollLeft) {
        const he = ee < Q.$w ? re || 0 : Q.$w;
        v.exec('scroll-chart', { left: Q.$x - ee + he }),
          (de.scrollLeft = Q.$x - ee + he);
      }
    },
    [v, re],
  );
  se(() => {
    ve(we);
  }, [we]);
  function fe(p) {
    if (le && (p.ctrlKey || p.metaKey)) {
      p.preventDefault();
      const T = U.current,
        L = -Math.sign(p.deltaY),
        de = p.clientX - (T ? T.getBoundingClientRect().left : 0);
      v.exec('zoom-scale', {
        dir: L,
        offset: de,
      });
    }
  }
  function Me(p) {
    const T = k(p.date, p.unit);
    return T
      ? {
          css: T,
          width: p.width,
        }
      : null;
  }
  const Te = C(
      () =>
        Z && (Z.minUnit === 'hour' || Z.minUnit === 'day') && k
          ? Z.rows[Z.rows.length - 1].cells.map(Me)
          : null,
      [Z, k],
    ),
    He = A(
      (p) => {
        (p.eventSource = 'chart'), v.exec('hotkey', p);
      },
      [v],
    );
  se(() => {
    const p = U.current;
    if (!p) return;
    const T = () => ie(p.clientHeight);
    T();
    const L = new ResizeObserver(() => T());
    return (
      L.observe(p),
      () => {
        L.disconnect();
      }
    );
  }, [U.current]);
  const pe = ne(null);
  return (
    se(() => {
      const p = U.current;
      if (p && !pe.current)
        return (
          (pe.current = Wt(p, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (T) => He(T),
          })),
          () => {
            pe.current?.destroy(), (pe.current = null);
          }
        );
    }, []),
    se(() => {
      const p = U.current;
      if (!p) return;
      const T = fe;
      return (
        p.addEventListener('wheel', T),
        () => {
          p.removeEventListener('wheel', T);
        }
      );
    }, [fe]),
    Wn('chart'),
    /* @__PURE__ */ Ae('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: U,
      onScroll: H,
      children: [
        /* @__PURE__ */ u(zn, { highlightTime: k, onScaleClick: y, scales: Z }),
        E && E.length
          ? /* @__PURE__ */ u('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${I}px` },
              children: E.map((p, T) =>
                /* @__PURE__ */ u(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${p.css || ''}`,
                    style: { left: `${p.left}px` },
                    children: /* @__PURE__ */ u('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: p.text,
                    }),
                  },
                  T,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ Ae('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${r}px`, height: `${I}px` },
          children: [
            Te
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: Te.map((p, T) =>
                    p
                      ? /* @__PURE__ */ u(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + p.css,
                            style: {
                              width: `${p.width}px`,
                              left: `${T * p.width}px`,
                            },
                          },
                          T,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ u(In, { borders: M, rowLayout: F }),
            N && N.length
              ? N.map((p, T) =>
                  p.$y
                    ? /* @__PURE__ */ u(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': p.id,
                          style: J[T],
                        },
                        p.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ u(Gn, {
              readonly: n,
              taskTemplate: o,
              multiTaskRows: g,
              rowMapping: R,
              rowHeightOverrides: s,
              allowTaskIntersection: x,
              summaryBarCounts: B,
              marqueeSelect: _,
              copyPaste: G,
            }),
          ],
        }),
      ],
    })
  );
}
function Yn(t) {
  const {
      position: n = 'after',
      size: r = 4,
      dir: c = 'x',
      onMove: o,
      onDisplayChange: M,
      compactMode: k,
      containerWidth: y = 0,
      leftThreshold: g = 50,
      rightThreshold: R = 50,
    } = t,
    [s, x] = ht(t.value ?? 0),
    [B, _] = ht(t.display ?? 'all');
  function G(H) {
    let S = 0;
    n == 'center' ? (S = r / 2) : n == 'before' && (S = r);
    const q = {
      size: [r + 'px', 'auto'],
      p: [H - S + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (c != 'x') for (let ve in q) q[ve] = q[ve].reverse();
    return q;
  }
  const [v, N] = ge(!1),
    [m, Y] = ge(null),
    O = ne(0),
    re = ne(),
    Z = ne(),
    E = ne(B);
  se(() => {
    E.current = B;
  }, [B]),
    se(() => {
      m === null && s > 0 && Y(s);
    }, [m, s]);
  function we(H) {
    return c == 'x' ? H.clientX : H.clientY;
  }
  const le = A(
      (H) => {
        const S = re.current + we(H) - O.current;
        x(S);
        let q;
        S <= g ? (q = 'chart') : y - S <= R ? (q = 'grid') : (q = 'all'),
          E.current !== q && (_(q), (E.current = q)),
          Z.current && clearTimeout(Z.current),
          (Z.current = setTimeout(() => o && o(S), 100));
      },
      [y, g, R, o],
    ),
    ye = A(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        N(!1),
        window.removeEventListener('mousemove', le),
        window.removeEventListener('mouseup', ye);
    }, [le]),
    ie = C(
      () => (B !== 'all' ? 'auto' : c == 'x' ? 'ew-resize' : 'ns-resize'),
      [B, c],
    ),
    U = A(
      (H) => {
        (!k && (B === 'grid' || B === 'chart')) ||
          ((O.current = we(H)),
          (re.current = s),
          N(!0),
          (document.body.style.cursor = ie),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', le),
          window.addEventListener('mouseup', ye));
      },
      [ie, le, ye, s, k, B],
    );
  function ue() {
    _('all'), m !== null && (x(m), o && o(m));
  }
  function te(H) {
    if (k) {
      const S = B === 'chart' ? 'grid' : 'chart';
      _(S), M(S);
    } else if (B === 'grid' || B === 'chart') ue(), M('all');
    else {
      const S = H === 'left' ? 'chart' : 'grid';
      _(S), M(S);
    }
  }
  function j() {
    te('left');
  }
  function J() {
    te('right');
  }
  const I = C(() => G(s), [s, n, r, c]),
    F = [
      'wx-resizer',
      `wx-resizer-${c}`,
      `wx-resizer-display-${B}`,
      v ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-pFykzMlT ' + F,
    onMouseDown: U,
    style: { width: I.size[0], height: I.size[1], cursor: ie },
    children: [
      /* @__PURE__ */ Ae('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: j,
            }),
          }),
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: J,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ u('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const Xn = 650;
function Ot(t) {
  let n;
  function r() {
    (n = new ResizeObserver((o) => {
      for (let M of o)
        if (M.target === document.body) {
          let k = M.contentRect.width <= Xn;
          t(k);
        }
    })),
      n.observe(document.body);
  }
  function c() {
    n && (n.disconnect(), (n = null));
  }
  return {
    observe: r,
    disconnect: c,
  };
}
function Kn(t) {
  const {
      taskTemplate: n,
      readonly: r,
      cellBorders: c,
      highlightTime: o,
      onScaleClick: M,
      onTableAPIChange: k,
      multiTaskRows: y = !1,
      rowMapping: g = null,
      rowHeightOverrides: R = null,
      allowTaskIntersection: s = !0,
      summaryBarCounts: x = !1,
      marqueeSelect: B = !1,
      copyPaste: _ = !1,
    } = t,
    G = Xe(Ue),
    v = X(G, '_tasks'),
    N = X(G, '_scales'),
    m = X(G, 'cellHeight'),
    Y = X(G, 'columns'),
    O = X(G, '_scrollTask'),
    re = X(G, 'undo'),
    Z = C(() => {
      if (!y) return g;
      const l = /* @__PURE__ */ new Map(),
        z = /* @__PURE__ */ new Map();
      return (
        v.forEach((W) => {
          const b = W.row ?? W.id;
          z.set(W.id, b), l.has(b) || l.set(b, []), l.get(b).push(W.id);
        }),
        { rowMap: l, taskRows: z }
      );
    }, [v, y, g]),
    [E, we] = ge(!1);
  let [le, ye] = ge(0);
  const [ie, U] = ge(0),
    [ue, te] = ge(0),
    [j, J] = ge(void 0),
    [I, F] = ge('all'),
    H = ne(null),
    S = A(
      (l) => {
        we(
          (z) => (
            l !== z &&
              (l
                ? ((H.current = I), I === 'all' && F('grid'))
                : (!H.current || H.current === 'all') && F('all')),
            l
          ),
        );
      },
      [I],
    );
  se(() => {
    const l = Ot(S);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [S]);
  const q = C(() => {
    let l;
    return (
      Y.every((z) => z.width && !z.flexgrow)
        ? (l = Y.reduce((z, W) => z + parseInt(W.width), 0))
        : E && I === 'chart'
          ? (l = parseInt(Y.find((z) => z.id === 'action')?.width) || 50)
          : (l = 440),
      (le = l),
      l
    );
  }, [Y, E, I]);
  se(() => {
    ye(q);
  }, [q]);
  const ve = C(() => (ie ?? 0) - (j ?? 0), [ie, j]),
    fe = C(() => N.width, [N]),
    Me = 14,
    Te = C(() => {
      let l;
      if (!y || !Z) l = v.length * m;
      else {
        const z = [];
        v.forEach((W) => {
          const b = Z.taskRows.get(W.id) ?? W.id;
          z.includes(b) || z.push(b);
        }),
          (l = 0);
        for (const W of z) l += (R && R[W]) || m;
      }
      return l + Me;
    }, [v, m, y, Z, R]),
    He = C(() => N.height + Te + ve, [N, Te, ve]),
    pe = C(() => le + fe, [le, fe]),
    p = ne(null),
    T = ne(!1),
    L = ne(null);
  se(() => {
    const l = () => {
      (T.current = !0),
        clearTimeout(L.current),
        (L.current = setTimeout(() => {
          T.current = !1;
        }, 300));
    };
    return (
      G.on('zoom-scale', l),
      G.on('set-scale', l),
      () => {
        clearTimeout(L.current);
      }
    );
  }, [G]);
  const de = A(() => {
      Promise.resolve().then(() => {
        if (!T.current && (ie ?? 0) > (pe ?? 0)) {
          const l = (ie ?? 0) - le;
          G.exec('expand-scale', { minWidth: l });
        }
      });
    }, [ie, pe, le, G]),
    ee = ne(de);
  (ee.current = de),
    se(() => {
      let l;
      return (
        p.current &&
          ((l = new ResizeObserver(() => ee.current())), l.observe(p.current)),
        () => {
          l && l.disconnect();
        }
      );
    }, [p.current]);
  const Q = ne(null),
    he = ne(null),
    Ge = A(() => {
      const l = Q.current;
      l &&
        G.exec('scroll-chart', {
          top: l.scrollTop,
        });
    }, [G]),
    _e = ne({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  se(() => {
    _e.current = {
      rTasks: v,
      rScales: N,
      rCellHeight: m,
      scrollSize: ve,
      ganttDiv: Q.current,
      ganttHeight: ue ?? 0,
    };
  }, [v, N, m, ve, ue]);
  const Re = A(
    (l) => {
      if (!l) return;
      const {
        rTasks: z,
        rScales: W,
        rCellHeight: b,
        scrollSize: Le,
        ganttDiv: ce,
        ganttHeight: be,
      } = _e.current;
      if (!ce) return;
      const { id: Ce } = l,
        Ee = z.findIndex((De) => De.id === Ce);
      if (Ee > -1) {
        const De = be - W.height,
          We = Ee * b,
          i = ce.scrollTop;
        let h = null;
        We < i ? (h = We) : We + b > i + De && (h = We - De + b + Le),
          h !== null &&
            (G.exec('scroll-chart', { top: Math.max(h, 0) }),
            (Q.current.scrollTop = Math.max(h, 0)));
      }
    },
    [G],
  );
  se(() => {
    Re(O);
  }, [O]),
    se(() => {
      const l = Q.current,
        z = he.current;
      if (!l || !z) return;
      const W = () => {
          Cn(() => {
            te(l.offsetHeight), U(l.offsetWidth), J(z.offsetWidth);
          });
        },
        b = new ResizeObserver(W);
      return b.observe(l), () => b.disconnect();
    }, [Q.current]);
  const Ne = ne(null),
    ze = ne(null);
  return (
    se(() => {
      ze.current && (ze.current.destroy(), (ze.current = null));
      const l = Ne.current;
      if (l)
        return (
          (ze.current = Wt(l, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': re,
              'ctrl+y': re,
            },
            exec: (z) => {
              z.isInput || G.exec('hotkey', z);
            },
          })),
          () => {
            ze.current?.destroy(), (ze.current = null);
          }
        );
    }, [re]),
    /* @__PURE__ */ u('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: Q,
      onScroll: Ge,
      children: /* @__PURE__ */ u('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: He, width: '100%' },
        ref: he,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: ue,
            width: j,
          },
          children: /* @__PURE__ */ Ae('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: Ne,
            children: [
              Y.length
                ? /* @__PURE__ */ Ae(et, {
                    children: [
                      /* @__PURE__ */ u(Ln, {
                        display: I,
                        compactMode: E,
                        columnWidth: q,
                        width: le,
                        readonly: r,
                        fullHeight: Te,
                        onTableAPIChange: k,
                        multiTaskRows: y,
                        rowMapping: Z,
                        rowHeightOverrides: R,
                      }),
                      /* @__PURE__ */ u(Yn, {
                        value: le,
                        display: I,
                        compactMode: E,
                        containerWidth: ie,
                        onMove: (l) => ye(l),
                        onDisplayChange: (l) => F(l),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ u('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: p,
                children: /* @__PURE__ */ u(On, {
                  readonly: r,
                  fullWidth: fe,
                  fullHeight: Te,
                  taskTemplate: n,
                  cellBorders: c,
                  highlightTime: o,
                  onScaleClick: M,
                  multiTaskRows: y,
                  rowMapping: Z,
                  rowHeightOverrides: R,
                  allowTaskIntersection: s,
                  summaryBarCounts: x,
                  marqueeSelect: B,
                  copyPaste: _,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function Bn(t) {
  return {
    year: '%Y',
    quarter: `${t('Q')} %Q`,
    month: '%M',
    week: `${t('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function Vn(t, n) {
  return typeof t == 'function' ? t : ot(t, n);
}
function Yt(t, n) {
  return t.map(({ format: r, ...c }) => ({
    ...c,
    format: Vn(r, n),
  }));
}
function Fn(t, n) {
  const r = Bn(n);
  for (let c in r) r[c] = ot(r[c], t);
  return r;
}
function qn(t, n) {
  if (!t || !t.length) return t;
  const r = ot('%d-%m-%Y', n);
  return t.map((c) =>
    c.template
      ? c
      : c.id === 'start' || c.id == 'end'
        ? {
            ...c,
            //store locale template for unscheduled tasks
            _template: (o) => r(o),
            template: (o) => r(o),
          }
        : c.id === 'duration'
          ? {
              ...c,
              _template: (o) => o,
              template: (o) => o,
            }
          : c,
  );
}
function Un(t, n) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((r) => ({
          ...r,
          scales: Yt(r.scales, n),
        })),
      }
    : t;
}
const jn = (t) =>
    t
      .split('-')
      .map((n) => (n ? n.charAt(0).toUpperCase() + n.slice(1) : ''))
      .join(''),
  Qn = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  Zn = [],
  Jn = [],
  es = [],
  ts = [],
  ns = { type: 'forward' },
  ks = At(function (
    {
      taskTemplate: n = null,
      markers: r = Zn,
      taskTypes: c = vn,
      tasks: o = Jn,
      selected: M = es,
      activeTask: k = null,
      links: y = ts,
      scales: g = Qn,
      columns: R = yn,
      start: s = null,
      end: x = null,
      lengthUnit: B = 'day',
      durationUnit: _ = 'day',
      cellWidth: G = 100,
      cellHeight: v = 38,
      scaleHeight: N = 36,
      readonly: m = !1,
      cellBorders: Y = 'full',
      zoom: O = !1,
      baselines: re = !1,
      highlightTime: Z = null,
      onScaleClick: E = null,
      init: we = null,
      autoScale: le = !0,
      unscheduledTasks: ye = !1,
      criticalPath: ie = null,
      schedule: U = ns,
      projectStart: ue = null,
      projectEnd: te = null,
      calendar: j = null,
      undo: J = !1,
      splitTasks: I = !1,
      multiTaskRows: F = !1,
      rowHeightOverrides: H = null,
      allowTaskIntersection: S = !0,
      summaryBarCounts: q = !1,
      marqueeSelect: ve = !1,
      copyPaste: fe = !1,
      summary: Me = null,
      _export: Te = !1,
      ...He
    },
    pe,
  ) {
    const p = ne();
    p.current = He;
    const T = C(() => new wn(kn), []),
      L = C(() => ({ ...gt, ...it }), []),
      de = Xe(Be.i18n),
      ee = C(() => (de ? de.extend(L, !0) : lt(L)), [de, L]),
      Q = C(() => ee.getRaw().calendar, [ee]),
      he = C(() => {
        let ce = {
          zoom: Un(O, Q),
          scales: Yt(g, Q),
          columns: qn(R, Q),
          links: pn(y),
          cellWidth: G,
        };
        return (
          ce.zoom &&
            (ce = {
              ...ce,
              ...xn(ce.zoom, Fn(Q, ee.getGroup('gantt')), ce.scales, G),
            }),
          ce
        );
      }, [O, g, R, y, G, Q, ee]),
      Ge = ne(null);
    Ge.current !== o &&
      (Te || Ct(o, { durationUnit: _, splitTasks: I, calendar: j }),
      (Ge.current = o)),
      se(() => {
        Te || Ct(o, { durationUnit: _, splitTasks: I, calendar: j });
      }, [o, _, j, I, Te]);
    const _e = C(() => {
        if (!F) return null;
        const ce = /* @__PURE__ */ new Map(),
          be = /* @__PURE__ */ new Map(),
          Ce = (Ee) => {
            Ee.forEach((De) => {
              const We = De.row ?? De.id;
              be.set(De.id, We),
                ce.has(We) || ce.set(We, []),
                ce.get(We).push(De.id),
                De.data && De.data.length > 0 && Ce(De.data);
            });
          };
        return Ce(o), { rowMap: ce, taskRows: be };
      }, [o, F]),
      Re = C(() => T.in, [T]),
      Ne = ne(null);
    Ne.current === null &&
      ((Ne.current = new fn((ce, be) => {
        const Ce = 'on' + jn(ce);
        p.current && p.current[Ce] && p.current[Ce](be);
      })),
      Re.setNext(Ne.current));
    const [ze, l] = ge(null),
      z = ne(null);
    z.current = ze;
    const W = C(
      () => ({
        getState: T.getState.bind(T),
        getReactiveState: T.getReactive.bind(T),
        getStores: () => ({ data: T }),
        exec: Re.exec.bind(Re),
        setNext: (ce) => ((Ne.current = Ne.current.setNext(ce)), Ne.current),
        intercept: Re.intercept.bind(Re),
        on: Re.on.bind(Re),
        detach: Re.detach.bind(Re),
        getTask: T.getTask.bind(T),
        serialize: () => T.serialize(),
        getTable: (ce) =>
          ce
            ? new Promise((be) => setTimeout(() => be(z.current), 1))
            : z.current,
        getHistory: () => T.getHistory(),
      }),
      [T, Re],
    );
    se(() => {
      const ce = () => {
        const { zoom: be, scales: Ce } = W.getState(),
          De = be?.levels?.[be.level]?.scales?.[0]?.unit ?? Ce?.[0]?.unit;
        De && W.exec('scale-change', { level: be?.level, unit: De });
      };
      W.on('zoom-scale', ce), W.on('set-scale', ce);
    }, [W]),
      se(() => {
        W.intercept('set-scale', ({ unit: ce, date: be }) => {
          const { zoom: Ce } = W.getState();
          if (!Ce || !Ce.levels) return !1;
          const Ee = Ce.levels.findIndex((i) =>
            i.scales.some((h) => h.unit === ce),
          );
          if (Ee < 0) return !1;
          const De = Ce.levels[Ee];
          if (Ee !== Ce.level) {
            const i = Math.round((De.minCellWidth + De.maxCellWidth) / 2);
            W.getStores().data.setState({
              scales: De.scales,
              cellWidth: i,
              _cellWidth: i,
              zoom: { ...Ce, level: Ee },
              ...(be ? { _scaleDate: be, _zoomOffset: 0 } : {}),
            });
          } else if (be) {
            const { _scales: i, cellWidth: h } = W.getState(),
              D = i.diff(be, i.start, i.lengthUnit),
              V = Math.max(0, Math.round(D * h));
            W.exec('scroll-chart', { left: V });
          }
          return !1;
        });
      }, [W]),
      Pt(
        pe,
        () => ({
          ...W,
        }),
        [W],
      );
    const b = ne(0);
    se(() => {
      b.current
        ? T.init({
            tasks: o,
            links: he.links,
            start: s,
            columns: he.columns,
            end: x,
            lengthUnit: B,
            cellWidth: he.cellWidth,
            cellHeight: v,
            scaleHeight: N,
            scales: he.scales,
            taskTypes: c,
            zoom: he.zoom,
            selected: M,
            activeTask: k,
            baselines: re,
            autoScale: le,
            unscheduledTasks: ye,
            markers: r,
            durationUnit: _,
            criticalPath: ie,
            schedule: U,
            projectStart: ue,
            projectEnd: te,
            calendar: j,
            undo: J,
            _weekStart: Q.weekStart,
            splitTasks: I,
            summary: Me,
          })
        : we && we(W),
        b.current++;
    }, [
      W,
      we,
      o,
      he,
      s,
      x,
      B,
      v,
      N,
      c,
      M,
      k,
      re,
      le,
      ye,
      r,
      _,
      ie,
      U,
      ue,
      te,
      j,
      J,
      Q,
      I,
      Me,
      T,
    ]),
      b.current === 0 &&
        T.init({
          tasks: o,
          links: he.links,
          start: s,
          columns: he.columns,
          end: x,
          lengthUnit: B,
          cellWidth: he.cellWidth,
          cellHeight: v,
          scaleHeight: N,
          scales: he.scales,
          taskTypes: c,
          zoom: he.zoom,
          selected: M,
          activeTask: k,
          baselines: re,
          autoScale: le,
          unscheduledTasks: ye,
          markers: r,
          durationUnit: _,
          criticalPath: ie,
          schedule: U,
          projectStart: ue,
          projectEnd: te,
          calendar: j,
          undo: J,
          _weekStart: Q.weekStart,
          splitTasks: I,
          summary: Me,
        });
    const Le = C(
      () =>
        j
          ? (ce, be) =>
              (be == 'day' && !j.getDayHours(ce)) ||
              (be == 'hour' && !j.getDayHours(ce))
                ? 'wx-weekend'
                : ''
          : Z,
      [j, Z],
    );
    return /* @__PURE__ */ u(Be.i18n.Provider, {
      value: ee,
      children: /* @__PURE__ */ u(Ue.Provider, {
        value: W,
        children: /* @__PURE__ */ u(Kn, {
          taskTemplate: n,
          readonly: m,
          cellBorders: Y,
          highlightTime: Le,
          onScaleClick: E,
          onTableAPIChange: l,
          multiTaskRows: F,
          rowMapping: _e,
          rowHeightOverrides: H,
          allowTaskIntersection: S,
          summaryBarCounts: q,
          marqueeSelect: ve,
          copyPaste: fe,
        }),
      }),
    });
  });
function Ts({ api: t = null, items: n = [] }) {
  const r = Xe(Be.i18n),
    c = C(() => r || lt(it), [r]),
    o = C(() => c.getGroup('gantt'), [c]),
    M = qe(t, '_selected'),
    k = qe(t, 'undo'),
    y = qe(t, 'history'),
    g = qe(t, 'splitTasks'),
    R = ['undo', 'redo'],
    s = C(() => {
      const B = Mt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : Mt({
              undo: k,
              splitTasks: g,
            })
      ).map((G) => {
        let v = { ...G, disabled: !1 };
        return (
          (v.handler = _t(B, v.id) ? (N) => zt(t, N.id, null, o) : v.handler),
          v.text && (v.text = o(v.text)),
          v.menuText && (v.menuText = o(v.menuText)),
          v
        );
      });
    }, [n, t, o, k, g]),
    x = C(() => {
      const B = [];
      return (
        s.forEach((_) => {
          const G = _.id;
          if (G === 'add-task') B.push(_);
          else if (R.includes(G))
            R.includes(G) &&
              B.push({
                ..._,
                disabled: _.isDisabled(y),
              });
          else {
            if (!M?.length || !t) return;
            B.push({
              ..._,
              disabled:
                _.isDisabled && M.some((v) => _.isDisabled(v, t.getState())),
            });
          }
        }),
        B.filter((_, G) => {
          if (t && _.isHidden)
            return !M.some((v) => _.isHidden(v, t.getState()));
          if (_.comp === 'separator') {
            const v = B[G + 1];
            if (!v || v.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, M, y, s]);
  return r
    ? /* @__PURE__ */ u(Et, { items: x })
    : /* @__PURE__ */ u(Be.i18n.Provider, {
        value: c,
        children: /* @__PURE__ */ u(Et, { items: x }),
      });
}
const $s = At(function (
  {
    options: n = [],
    api: r = null,
    resolver: c = null,
    filter: o = null,
    at: M = 'point',
    children: k,
    onClick: y,
    css: g,
  },
  R,
) {
  const s = ne(null),
    x = ne(null),
    B = Xe(Be.i18n),
    _ = C(() => B || lt({ ...it, ...gt }), [B]),
    G = C(() => _.getGroup('gantt'), [_]),
    v = qe(r, 'taskTypes'),
    N = qe(r, 'selected'),
    m = qe(r, '_selected'),
    Y = qe(r, 'splitTasks'),
    O = qe(r, 'summary'),
    re = C(
      () => ({
        splitTasks: Y,
        taskTypes: v,
        summary: O,
      }),
      [Y, v, O],
    ),
    Z = C(() => Rt(re), [re]);
  se(() => {
    r &&
      (r.on('scroll-chart', () => {
        s.current && s.current.show && s.current.show();
      }),
      r.on('drag-task', () => {
        s.current && s.current.show && s.current.show();
      }));
  }, [r]);
  function E(J) {
    return J.map(
      (I) => (
        (I = { ...I }),
        I.text && (I.text = G(I.text)),
        I.subtext && (I.subtext = G(I.subtext)),
        I.data && (I.data = E(I.data)),
        I
      ),
    );
  }
  function we() {
    const J = n.length ? n : Rt(re);
    return E(J);
  }
  const le = C(() => we(), [r, n, re, G]),
    ye = C(() => (m && m.length ? m : []), [m]),
    ie = A(
      (J, I) => {
        let F = J ? r?.getTask(J) : null;
        if (c) {
          const H = c(J, I);
          F = H === !0 ? F : H;
        }
        if (F) {
          const H = Ze(I.target, 'data-segment');
          H !== null
            ? (x.current = { id: F.id, segmentIndex: H })
            : (x.current = F.id),
            (!Array.isArray(N) || !N.includes(F.id)) &&
              r &&
              r.exec &&
              r.exec('select-task', { id: F.id });
        }
        return F;
      },
      [r, c, N],
    ),
    U = A(
      (J) => {
        const I = J.action;
        I && (_t(Z, I.id) && zt(r, I.id, x.current, G), y && y(J));
      },
      [r, G, y, Z],
    ),
    ue = A(
      (J, I) => {
        const F = ye.length ? ye : I ? [I] : [];
        let H = o ? F.every((S) => o(J, S)) : !0;
        if (
          H &&
          (J.isHidden &&
            (H = !F.some((S) => J.isHidden(S, r.getState(), x.current))),
          J.isDisabled)
        ) {
          const S = F.some((q) => J.isDisabled(q, r.getState(), x.current));
          J.disabled = S;
        }
        return H;
      },
      [o, ye, r],
    );
  Pt(R, () => ({
    show: (J, I) => {
      s.current && s.current.show && s.current.show(J, I);
    },
  }));
  const te = A((J) => {
      s.current && s.current.show && s.current.show(J);
    }, []),
    j = /* @__PURE__ */ Ae(et, {
      children: [
        /* @__PURE__ */ u(Mn, {
          filter: ue,
          options: le,
          dataKey: 'id',
          resolver: ie,
          onClick: U,
          at: M,
          ref: s,
          css: g,
        }),
        /* @__PURE__ */ u('span', {
          onContextMenu: te,
          'data-menu-ignore': 'true',
          children: typeof k == 'function' ? k() : k,
        }),
      ],
    });
  if (!B && Be.i18n?.Provider) {
    const J = Be.i18n.Provider;
    return /* @__PURE__ */ u(J, { value: _, children: j });
  }
  return j;
});
function ss({ api: t, autoSave: n, onLinksChange: r }) {
  const o = Xe(Be.i18n).getGroup('gantt'),
    M = X(t, 'activeTask'),
    k = X(t, '_activeTask'),
    y = X(t, '_links'),
    g = X(t, 'schedule'),
    R = X(t, 'unscheduledTasks'),
    [s, x] = ge();
  function B() {
    if (M) {
      const N = y
          .filter((Y) => Y.target == M)
          .map((Y) => ({ link: Y, task: t.getTask(Y.source) })),
        m = y
          .filter((Y) => Y.source == M)
          .map((Y) => ({ link: Y, task: t.getTask(Y.target) }));
      return [
        { title: o('Predecessors'), data: N },
        { title: o('Successors'), data: m },
      ];
    }
  }
  se(() => {
    x(B());
  }, [M, y]);
  const _ = C(
    () => [
      { id: 'e2s', label: o('End-to-start') },
      { id: 's2s', label: o('Start-to-start') },
      { id: 'e2e', label: o('End-to-end') },
      { id: 's2e', label: o('Start-to-end') },
    ],
    [o],
  );
  function G(N) {
    n
      ? t.exec('delete-link', { id: N })
      : (x((m) =>
          (m || []).map((Y) => ({
            ...Y,
            data: Y.data.filter((O) => O.link.id !== N),
          })),
        ),
        r &&
          r({
            id: N,
            action: 'delete-link',
            data: { id: N },
          }));
  }
  function v(N, m) {
    n
      ? t.exec('update-link', {
          id: N,
          link: m,
        })
      : (x((Y) =>
          (Y || []).map((O) => ({
            ...O,
            data: O.data.map((re) =>
              re.link.id === N ? { ...re, link: { ...re.link, ...m } } : re,
            ),
          })),
        ),
        r &&
          r({
            id: N,
            action: 'update-link',
            data: {
              id: N,
              link: m,
            },
          }));
  }
  return /* @__PURE__ */ u(et, {
    children: (s || []).map((N, m) =>
      N.data.length
        ? /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ u(Be.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ u(en, {
                  label: N.title,
                  position: 'top',
                  children: /* @__PURE__ */ u('table', {
                    children: /* @__PURE__ */ u('tbody', {
                      children: N.data.map((Y) =>
                        /* @__PURE__ */ Ae(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: Y.task.text || '',
                                }),
                              }),
                              g?.auto && Y.link.type === 'e2s'
                                ? /* @__PURE__ */ u('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ u(tn, {
                                      type: 'number',
                                      placeholder: o('Lag'),
                                      value: Y.link.lag,
                                      disabled: R && k?.unscheduled,
                                      onChange: (O) => {
                                        O.input ||
                                          v(Y.link.id, { lag: O.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ u(nn, {
                                    value: Y.link.type,
                                    placeholder: o('Select link type'),
                                    options: _,
                                    onChange: (O) =>
                                      v(Y.link.id, { type: O.value }),
                                    children: ({ option: O }) => O.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => G(Y.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          Y.link.id,
                        ),
                      ),
                    }),
                  }),
                }),
              }),
            },
            m,
          )
        : null,
    ),
  });
}
function rs(t) {
  const { value: n, time: r, format: c, onchange: o, onChange: M, ...k } = t,
    y = M ?? o;
  function g(R) {
    const s = new Date(R.value);
    s.setHours(n.getHours()),
      s.setMinutes(n.getMinutes()),
      y && y({ value: s });
  }
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ u(sn, {
        ...k,
        value: n,
        onChange: g,
        format: c,
        buttons: ['today'],
        clear: !1,
      }),
      r ? /* @__PURE__ */ u(rn, { value: n, onChange: y, format: c }) : null,
    ],
  });
}
Je('select', ln);
Je('date', rs);
Je('twostate', cn);
Je('slider', an);
Je('counter', un);
Je('links', ss);
function Cs({
  api: t,
  items: n = [],
  css: r = '',
  layout: c = 'default',
  readonly: o = !1,
  placement: M = 'sidebar',
  bottomBar: k = !0,
  topBar: y = !0,
  autoSave: g = !0,
  focus: R = !1,
  hotkeys: s = {},
}) {
  const x = Xe(Be.i18n),
    B = C(() => x || lt({ ...it, ...gt }), [x]),
    _ = C(() => B.getGroup('gantt'), [B]),
    G = B.getRaw(),
    v = C(() => {
      const l = G.gantt?.dateFormat || G.formats?.dateFormat;
      return ot(l, G.calendar);
    }, [G]),
    N = C(() => {
      if (y === !0 && !o) {
        const l = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: _('Delete'),
            id: 'delete',
          },
        ];
        return g
          ? { items: l }
          : {
              items: [
                ...l,
                {
                  comp: 'button',
                  type: 'primary',
                  text: _('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return y;
    }, [y, o, g, _]),
    [m, Y] = ge(!1),
    O = C(() => (m ? 'wx-full-screen' : ''), [m]),
    re = A((l) => {
      Y(l);
    }, []);
  se(() => {
    const l = Ot(re);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [re]);
  const Z = X(t, '_activeTask'),
    E = X(t, 'activeTask'),
    we = X(t, 'unscheduledTasks'),
    le = X(t, 'summary'),
    ye = X(t, 'links'),
    ie = X(t, 'splitTasks'),
    U = C(() => ie && E?.segmentIndex, [ie, E]),
    ue = C(() => U || U === 0, [U]),
    te = X(t, 'taskTypes'),
    j = C(
      () => bn({ unscheduledTasks: we, summary: le, taskTypes: te }),
      [we, le, te],
    ),
    J = X(t, 'undo'),
    [I, F] = ge({}),
    [H, S] = ge(null),
    [q, ve] = ge(),
    [fe, Me] = ge(null),
    Te = C(() => {
      if (!Z) return null;
      let l;
      if ((ue && Z.segments ? (l = { ...Z.segments[U] }) : (l = { ...Z }), o)) {
        let z = { parent: l.parent };
        return (
          j.forEach(({ key: W, comp: b }) => {
            if (b !== 'links') {
              const Le = l[W];
              b === 'date' && Le instanceof Date
                ? (z[W] = v(Le))
                : b === 'slider' && W === 'progress'
                  ? (z[W] = `${Le}%`)
                  : (z[W] = Le);
            }
          }),
          z
        );
      }
      return l || null;
    }, [Z, ue, U, o, j, v]);
  se(() => {
    ve(Te);
  }, [Te]),
    se(() => {
      F({}), Me(null), S(null);
    }, [E]);
  function He(l, z) {
    return l.map((W) => {
      const b = { ...W };
      if (
        (W.config && (b.config = { ...b.config }),
        b.comp === 'links' &&
          t &&
          ((b.api = t), (b.autoSave = g), (b.onLinksChange = T)),
        b.comp === 'select' && b.key === 'type')
      ) {
        const Le = b.options ?? [];
        b.options = Le.map((ce) => ({
          ...ce,
          label: _(ce.label),
        }));
      }
      return (
        b.comp === 'slider' &&
          b.key === 'progress' &&
          (b.labelTemplate = (Le) => `${_(b.label)} ${Le}%`),
        b.label && (b.label = _(b.label)),
        b.config?.placeholder &&
          (b.config.placeholder = _(b.config.placeholder)),
        z &&
          (b.isDisabled && b.isDisabled(z, t.getState())
            ? (b.disabled = !0)
            : delete b.disabled),
        b
      );
    });
  }
  const pe = C(() => {
      let l = n.length ? n : j;
      return (
        (l = He(l, q)),
        q ? l.filter((z) => !z.isHidden || !z.isHidden(q, t.getState())) : l
      );
    }, [n, j, q, _, t, g]),
    p = C(() => pe.map((l) => l.key), [pe]);
  function T({ id: l, action: z, data: W }) {
    F((b) => ({
      ...b,
      [l]: { action: z, data: W },
    }));
  }
  const L = A(() => {
      for (let l in I)
        if (ye.byId(l)) {
          const { action: z, data: W } = I[l];
          t.exec(z, W);
        }
    }, [t, I, ye]),
    de = A(() => {
      const l = E?.id || E;
      if (ue) {
        if (Z?.segments) {
          const z = Z.segments.filter((W, b) => b !== U);
          t.exec('update-task', {
            id: l,
            task: { segments: z },
          });
        }
      } else t.exec('delete-task', { id: l });
    }, [t, E, ue, Z, U]),
    ee = A(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    Q = A(
      (l) => {
        const { item: z, changes: W } = l;
        z.id === 'delete' && de(),
          z.id === 'save' && (W.length ? ee() : L()),
          z.comp && ee();
      },
      [t, E, g, L, de, ee],
    ),
    he = A(
      (l, z, W) => (
        we && l.type === 'summary' && (l.unscheduled = !1),
        Gt(l, t.getState(), z),
        W || S(!1),
        l
      ),
      [we, t],
    ),
    Ge = A(
      (l) => {
        (l = {
          ...l,
          unscheduled: we && l.unscheduled && l.type !== 'summary',
        }),
          delete l.links,
          delete l.data,
          (p.indexOf('duration') === -1 || (l.segments && !l.duration)) &&
            delete l.duration;
        const z = {
          id: E?.id || E,
          task: l,
          ...(ue && { segmentIndex: U }),
        };
        g && H && (z.inProgress = H), t.exec('update-task', z), g || L();
      },
      [t, E, we, g, L, p, ue, U, H],
    ),
    _e = A(
      (l) => {
        let { update: z, key: W, input: b } = l;
        if ((b && S(!0), (l.update = he({ ...z }, W, b)), !g)) ve(l.update);
        else if (!fe && !b) {
          const Le = pe.find((Ce) => Ce.key === W),
            ce = z[W];
          (!Le.validation || Le.validation(ce)) &&
            (!Le.required || ce) &&
            Ge(l.update);
        }
      },
      [g, he, fe, pe, Ge],
    ),
    Re = A(
      (l) => {
        g || Ge(l.values);
      },
      [g, Ge],
    ),
    Ne = A((l) => {
      Me(l.errors);
    }, []),
    ze = C(
      () =>
        J
          ? {
              'ctrl+z': (l) => {
                l.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (l) => {
                l.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [J, t],
    );
  return Te
    ? /* @__PURE__ */ u(on, {
        children: /* @__PURE__ */ u(Rn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${O} ${r}`,
          items: pe,
          values: Te,
          topBar: N,
          bottomBar: k,
          placement: M,
          layout: c,
          readonly: o,
          autoSave: g,
          focus: R,
          onAction: Q,
          onSave: Re,
          onValidation: Ne,
          onChange: _e,
          hotkeys: s && { ...ze, ...s },
        }),
      })
    : null;
}
const Ms = ({ children: t, columns: n = null, api: r }) => {
  const [c, o] = ge(null);
  return (
    se(() => {
      r && r.getTable(!0).then(o);
    }, [r]),
    /* @__PURE__ */ u($n, { api: c, columns: n, children: t })
  );
};
function Rs(t) {
  const { api: n, content: r, children: c } = t,
    o = ne(null),
    M = ne(null),
    [k, y] = ge({}),
    [g, R] = ge(null),
    [s, x] = ge({}),
    [B, _] = ge(!1),
    G = ne(!1),
    v = ne(null);
  function N(H) {
    for (; H; ) {
      if (H.getAttribute) {
        const S = H.getAttribute('data-tooltip-id'),
          q = H.getAttribute('data-tooltip-at'),
          ve = H.getAttribute('data-tooltip');
        if (S || ve) return { id: S, tooltip: ve, target: H, at: q };
      }
      H = H.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  se(() => {
    const H = M.current;
    if (!B && H && s && (s.text || r)) {
      const S = H.getBoundingClientRect();
      let q = !1,
        ve = s.left,
        fe = s.top;
      S.right >= k.right && ((ve = k.width - S.width - 5), (q = !0)),
        S.bottom >= k.bottom &&
          ((fe = s.top - (S.bottom - k.bottom + 2)), (q = !0)),
        q && x((Me) => Me && { ...Me, left: ve, top: fe });
    }
  }, [s, k, r, B]);
  const m = ne(null),
    Y = ne(null),
    O = 300,
    re = 150,
    Z = (H) => {
      clearTimeout(m.current),
        (m.current = setTimeout(() => {
          H();
        }, O));
    };
  function E() {
    clearTimeout(m.current), (Y.current = null), x(null), R(null), _(!1);
  }
  function we() {
    clearTimeout(v.current),
      (v.current = setTimeout(() => {
        G.current || E();
      }, re));
  }
  function le() {
    clearTimeout(v.current);
  }
  function ye(H) {
    let { id: S, tooltip: q, target: ve, at: fe } = N(H.target);
    if (!S && !q) {
      clearTimeout(m.current), G.current || we();
      return;
    }
    if ((le(), q || (q = J(S)), Y.current === S && s)) return;
    (Y.current = S), x(null), R(null), _(!1);
    const Me = H.clientX;
    Z(() => {
      S && R(j(I(S)));
      const Te = ve.getBoundingClientRect(),
        He = o.current,
        pe = He
          ? He.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let p, T;
      fe === 'left'
        ? ((p = Te.top + 5 - pe.top), (T = Te.right + 5 - pe.left))
        : ((p = Te.top + Te.height - pe.top), (T = Me - pe.left)),
        y(pe),
        x({ top: p, left: T, text: q });
    });
  }
  function ie() {
    (G.current = !0), le();
  }
  function U() {
    (G.current = !1), we();
  }
  function ue(H) {
    const S = H.touches[0];
    if (!S) return;
    const { id: q, target: ve } = N(H.target);
    if (!q) return;
    clearTimeout(m.current);
    const fe = j(I(q)),
      Me = fe?.text || '',
      Te = ve.getBoundingClientRect(),
      He = o.current,
      pe = He
        ? He.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    R(fe),
      y(pe),
      _(!0),
      x({
        top: Te.top - pe.top - 8,
        left: S.clientX - pe.left,
        text: Me,
      });
  }
  function te() {
    x(null), R(null), _(!1);
  }
  function j(H) {
    return n?.getTask(I(H)) || null;
  }
  function J(H) {
    return j(H)?.text || '';
  }
  function I(H) {
    const S = Number(H);
    return Number.isFinite(S) ? S : H;
  }
  se(
    () => () => {
      clearTimeout(m.current), clearTimeout(v.current);
    },
    [],
  );
  const F = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    B ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: ye,
    onTouchStart: ue,
    onTouchEnd: te,
    onTouchMove: te,
    children: [
      s && (s.text || r)
        ? /* @__PURE__ */ u('div', {
            className: F,
            ref: M,
            style: { top: `${s.top}px`, left: `${s.left}px` },
            onMouseEnter: ie,
            onMouseLeave: U,
            children: r
              ? /* @__PURE__ */ u(r, { data: g })
              : s.text
                ? /* @__PURE__ */ u('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: s.text,
                  })
                : null,
          })
        : null,
      c,
    ],
  });
}
function Es({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ u(kt, { fonts: t, children: n() })
    : /* @__PURE__ */ u(kt, { fonts: t });
}
function Ds({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ u(Tt, { fonts: t, children: n })
    : /* @__PURE__ */ u(Tt, { fonts: t });
}
function Ss({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ u($t, { fonts: t, children: n })
    : /* @__PURE__ */ u($t, { fonts: t });
}
const os = '2.9.0',
  ls = {
    version: os,
  },
  Ls = ls.version;
export {
  $s as ContextMenu,
  Cs as Editor,
  ks as Gantt,
  Ms as HeaderMenu,
  Es as Material,
  Ts as Toolbar,
  Rs as Tooltip,
  Ds as Willow,
  Ss as WillowDark,
  Hs as defaultColumns,
  As as defaultEditorItems,
  Ps as defaultMenuOptions,
  Gs as defaultTaskTypes,
  zs as defaultToolbarButtons,
  _s as getEditorItems,
  Ws as getMenuOptions,
  Os as getToolbarButtons,
  Ks as registerEditorItem,
  Ys as registerScaleUnit,
  Ls as version,
};
//# sourceMappingURL=index.es.js.map
