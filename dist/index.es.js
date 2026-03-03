import { jsxs as Ae, jsx as u, Fragment as et } from 'react/jsx-runtime';
import {
  createContext as Zt,
  useContext as Ye,
  useMemo as C,
  useState as we,
  useCallback as A,
  useRef as ne,
  useEffect as se,
  Fragment as Jt,
  forwardRef as At,
  useImperativeHandle as Pt,
} from 'react';
import {
  context as Ke,
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
  registerScaleUnit as Xs,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as ht,
  useStore as Y,
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
import { registerEditorItem as Bs } from '@svar-ui/react-editor';
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
  function K(E) {
    (r = Fe(E)),
      Dt(r) &&
        ((o = Qe(r)),
        (s = setTimeout(() => {
          (R = !0), n && n.touchStart && n.touchStart(), x(E.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', X),
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
      t.removeEventListener('touchmove', X),
      document.body.removeEventListener('mouseup', re),
      document.body.removeEventListener('touchend', O),
      (document.body.style.userSelect = ''),
      E &&
        (t.removeEventListener('mousedown', G),
        t.removeEventListener('touchstart', K));
  }
  function H(E) {
    const pe = E.clientX - M,
      le = E.clientY - k;
    if (!c) {
      if (
        (Math.abs(pe) < St && Math.abs(le) < St) ||
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
          N = E.clientY - y.dt < I && te.previousElementSibling !== r;
        g?.after == j || g?.before == j
          ? (g = null)
          : F
            ? (g = { id: o, after: j })
            : N && (g = { id: o, before: j });
      }
    }
  }
  function m(E) {
    H(E);
  }
  function X(E) {
    R
      ? (E.preventDefault(), H(E.touches[0]))
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
    t.addEventListener('touchstart', K),
    {
      destroy() {
        v(!0);
      },
    }
  );
}
function Sn({ row: t, column: n }) {
  const r = Ye(Ue);
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
    [x, K] = ht(M),
    [_, G] = we(),
    v = Ye(Ke.i18n),
    H = C(() => v.getGroup('gantt'), [v]),
    m = Ye(Ue),
    X = Y(m, 'scrollTop'),
    O = Y(m, 'cellHeight'),
    re = Y(m, '_scrollTask'),
    Z = Y(m, '_selected'),
    E = Y(m, 'area'),
    pe = Y(m, '_tasks'),
    le = Y(m, '_scales'),
    ye = Y(m, 'columns'),
    ie = Y(m, '_sort'),
    U = Y(m, 'calendar'),
    ue = Y(m, 'durationUnit'),
    te = Y(m, 'splitTasks'),
    [j, J] = we(null),
    I = C(() => {
      if (!pe || !E) return [];
      if (g && R) {
        const i = /* @__PURE__ */ new Set();
        return pe.filter((h) => {
          const D = R.taskRows.get(h.id) ?? h.id;
          return i.has(D) ? !1 : (i.add(D), !0);
        });
      }
      return pe.slice(E.start, E.end);
    }, [pe, E, g, R]),
    F = A(
      (i, h) => {
        if (h === 'add-task')
          m.exec(h, {
            target: i,
            task: { text: H('New Task') },
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
    N = A(
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
    [ve, de] = we(0),
    [Me, be] = we(!1);
  se(() => {
    const i = q.current;
    if (!i || typeof ResizeObserver > 'u') return;
    const h = () => de(i.clientWidth);
    h();
    const D = new ResizeObserver(h);
    return D.observe(i), () => D.disconnect();
  }, []);
  const Ne = ne(null),
    fe = A(
      (i) => {
        const h = i.id,
          { before: D, after: V } = i,
          xe = i.onMove;
        let ge = D || V,
          $e = D ? 'before' : 'after';
        if (xe) {
          if ($e === 'after') {
            const Pe = m.getTask(ge);
            Pe.data?.length &&
              Pe.open &&
              (($e = 'before'), (ge = Pe.data[0].id));
          }
          Ne.current = { id: h, [$e]: ge };
        } else Ne.current = null;
        m.exec('move-task', {
          id: h,
          mode: $e,
          target: ge,
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
    he = C(() => {
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
          const ge = xe.text && H(xe.text);
          V.header = { ...xe, text: ge };
        } else V.header = H(xe);
        if (V.cell && V.id !== 'text' && V.id !== 'add-task') {
          const ge = V.cell;
          V.cell = ($e) => /* @__PURE__ */ u(ge, { ...$e, api: m });
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
    }, [ye, H, n, r, m]),
    me = C(
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
    He = C(() => {
      let i = o === 'chart' ? Q.filter((D) => D.id === 'add-task') : Q;
      const h = o === 'all' ? c : ve;
      if (!Re) {
        let D = x,
          V = !1;
        if (Q.some((xe) => xe.$width)) {
          let xe = 0;
          (D = Q.reduce(
            (ge, $e) => (
              $e.hidden || ((xe += $e.width), (ge += $e.$width || $e.width)), ge
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
              (ge) => (
                ge.id !== 'add-task' &&
                  !ge.hidden &&
                  (ge.$width || (ge.$width = ge.width),
                  (ge.width = ge.$width * xe)),
                ge
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
          const h = He.reduce(
            (D, V) => (
              i && V.$width && (V.$width = V.width),
              D + (V.hidden ? 0 : V.width)
            ),
            0,
          );
          h !== x && K(h);
        }
        be(!0), be(!1);
      },
      [_e, He, x, K],
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
            : (i.style.top = -((X ?? 0) - (p ?? 0)) + 'px'));
      }
      q.current && (q.current.scrollTop = 0);
    }, [ee, X, p, g]);
  se(() => {
    S.current && b();
  }, [X, p, b]),
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
    }, [He, he, o, me, ee, b]),
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
        const ge = xe.getAttribute('data-id'),
          $e = (s && ge && s[ge]) || O;
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
        Ne.current
          ? fe({ ...Ne.current, onMove: !1 })
          : m.exec('drag-task', {
              id: i,
              top: h + (p ?? 0),
              inProgress: !1,
            }),
          J(null);
      },
      [m, fe, p],
    ),
    ke = A(
      ({ id: i, top: h, detail: D }) => {
        D && fe({ ...D, onMove: !0 }),
          m.exec('drag-task', {
            id: i,
            top: h + (p ?? 0),
            inProgress: !0,
          });
      },
      [m, fe, p],
    );
  se(() => {
    const i = S.current;
    return i
      ? Dn(i, {
          start: Le,
          end: ce,
          move: ke,
          getTask: m.getTask,
        }).destroy
      : void 0;
  }, [m, Le, ce, ke]);
  const Ce = A(
      (i) => {
        const { key: h, isInput: D } = i;
        if (!D && (h === 'arrowup' || h === 'arrowdown'))
          return (i.eventSource = 'grid'), m.exec('hotkey', i), !1;
        if (h === 'enter') {
          const V = _?.getState().focusCell;
          if (V) {
            const { row: xe, column: ge } = V;
            ge === 'add-task'
              ? F(xe, 'add-task')
              : ge === 'text' && F(xe, 'open-task');
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
          ge = D ? D.find((Pe) => Pe.key === V) : null;
        let $e = 'asc';
        return (
          ge && ($e = !ge || ge.order === 'asc' ? 'desc' : 'asc'),
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
          ge = Ee.current.tasks.find(($e) => $e.id === D);
        if (ge) {
          const $e = { ...ge };
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
    style: { flex: `0 0 ${me}` },
    ref: q,
    children: /* @__PURE__ */ u('div', {
      ref: S,
      style: he,
      className: 'wx-rHj6070p wx-table',
      onClick: N,
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
        columns: He,
        selectedRows: [...W],
        sortMarks: Ge,
      }),
    }),
  });
}
function In({ borders: t = '', rowLayout: n = null }) {
  const r = Ye(Ue),
    c = Y(r, 'cellWidth'),
    o = Y(r, 'cellHeight'),
    M = ne(null),
    [k, y] = we('#e4e4e4');
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
    for (const K of n) (x += K.height), s.push(x);
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
  const c = Ye(Ue),
    o = Y(c, '_links'),
    M = Y(c, 'criticalPath'),
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
    s = Ye(Ue),
    [x, K] = mt(s, '_tasks'),
    [_, G] = mt(s, '_links'),
    v = Y(s, 'area'),
    H = Y(s, '_scales'),
    m = Y(s, 'taskTypes'),
    X = Y(s, 'baselines'),
    O = Y(s, '_selected'),
    re = Y(s, '_scrollTask'),
    Z = Y(s, 'criticalPath'),
    E = Y(s, 'tasks'),
    pe = Y(s, 'schedule'),
    le = Y(s, 'splitTasks'),
    ye = Y(s, 'summary'),
    ie = C(() => {
      if (!v || !Array.isArray(x)) return [];
      const e = v.start ?? 0,
        a = v.end ?? 0;
      return c && o
        ? x.map((f) => ({ ...f }))
        : x.slice(e, a).map((f) => ({ ...f }));
    }, [K, v, c, o]),
    U = Y(s, 'cellHeight'),
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
          Se = [...$].sort((Te, Ie) => (Te.$x ?? 0) - (Ie.$x ?? 0));
        for (const Te of Se) {
          const Ie = Te.$x ?? 0,
            Ve = Ie + (Te.$w ?? 0);
          let Oe = !1;
          for (let Xe = 0; Xe < ae.length; Xe++)
            if (
              !ae[Xe].some((je) => {
                const rt = je.$x ?? 0,
                  ut = rt + (je.$w ?? 0);
                return Nt(Ie, Ve, rt, ut);
              })
            ) {
              ae[Xe].push(Te), d.set(Te.id, Xe), (Oe = !0);
              break;
            }
          Oe || (ae.push([Te]), d.set(Te.id, ae.length - 1));
        }
        w.set(oe, ae.length);
      });
      const P = /* @__PURE__ */ new Map();
      let B = 0;
      for (const $ of a) {
        P.set($, B);
        const oe = (M && M[$]) || U;
        B += oe;
      }
      return ie.map(($) => {
        const oe = o.taskRows.get($.id) ?? $.id,
          ae = P.get(oe) ?? 0;
        if ($.type === 'summary') {
          if ((f.get(oe) || []).length > 0) return { ...$, $y: ae, $skip: !0 };
          const Xe = (M && M[oe]) || U,
            Be = Math.max(0, Math.floor((Xe - $.$h) / 2));
          return {
            ...$,
            $y: ae + Be,
            $y_base: $.$y_base !== void 0 ? ae + Be : void 0,
          };
        }
        const Se = w.get(oe) || 1,
          Te = d.get($.id) ?? 0;
        if (Se > 1) {
          const Be = $.$h + 4,
            je = ae + 3 + Te * Be;
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
    te = C(() => H.lengthUnitWidth, [H]),
    j = C(() => H.lengthUnit || 'day', [H]),
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
                  B = f[w];
                Nt(P.$x, P.$x + P.$w, B.$x, B.$x + B.$w) &&
                  (e.add(P.id), e.add(B.id));
              }
        }),
        e
      );
    }, [k, c, o, x, K]),
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
          w.forEach((B) => {
            if (B.$x == null || B.$w == null) return;
            const $ = Math.floor(B.$x / te),
              oe = Math.ceil((B.$x + B.$w) / te);
            for (let ae = $; ae < oe; ae++) P.set(ae, (P.get(ae) || 0) + 1);
          }),
            P.size > 0 && f.set(d, P);
        }),
        f
      );
    }, [y, x, te]),
    [F, N] = we(null),
    S = ne(null),
    [q, ve] = we(null),
    [de, Me] = we(null),
    [be, Ne] = we(null),
    fe = ne(null);
  fe.current = be;
  const p = ne(0),
    T = ne(!1),
    [L, he] = we(void 0),
    [ee, Q] = we(null),
    me = ne(null),
    [Ge, _e] = we(null),
    Re = C(
      () =>
        Ge && {
          ..._.find((e) => e.id === Ge),
        },
      [Ge, G],
    ),
    [He, ze] = we(void 0),
    l = ne(null),
    [z, W] = we(0),
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
  const ke = A(() => {
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
              B = a.get(P) ?? 0;
            e.set(w, B * U);
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
          const B = P.$x,
            $ = P.$x + P.$w,
            ae = Ee.get(P.id) ?? P.$y,
            Se = ae + P.$h;
          return B < f && $ > a && ae < w && Se > d;
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
                $y: Te,
                $h: Ie,
                $w: Ve,
                $skip: Oe,
                $level: Xe,
                ...Be
              } = ae,
              je =
                ae.end && ae.start
                  ? Math.round((ae.end.getTime() - ae.start.getTime()) / a)
                  : 0,
              rt = ae.start ? (ae.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...Be,
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
      const B = P.reduce(
        ($, oe) => (oe.start && (!$ || oe.start < $) ? oe.start : $),
        null,
      );
      (dt = P.map(($) => ({
        ...$,
        _startCellOffset: An($.start, B, H),
      }))),
        (It = w),
        (ft = B);
    }, [R, s, x, H]),
    h = A(
      (e, a, f) => {
        if (!a.length || !e || f == null) return;
        const d = 864e5,
          w = s.getHistory();
        w?.startBatch();
        const P = new Date(e);
        P.setUTCHours(0, 0, 0, 0),
          a.forEach((B, $) => {
            const oe = `task-${Date.now()}-${$}`,
              ae = Pn(P, B._startCellOffset || 0, H),
              Se = new Date(ae.getTime() + (B._startDayOfWeek || 0) * d);
            Se.setUTCHours(0, 0, 0, 0);
            const Te = new Date(Se.getTime() + (B._durationDays || 7) * d);
            Te.setUTCHours(0, 0, 0, 0),
              s.exec('add-task', {
                task: {
                  id: oe,
                  text: B.text,
                  start: Se,
                  end: Te,
                  type: B.type || 'task',
                  parent: f,
                  row: B.row,
                },
                target: f,
                mode: 'child',
                skipUndo: $ > 0,
              });
          }),
          w?.endBatch();
      },
      [s, H],
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
      if (!de) return;
      const e = (a) => {
        a.key === 'Escape' &&
          (a.preventDefault(), a.stopPropagation(), Me(null));
      };
      return (
        document.addEventListener('keydown', e, !0),
        () => document.removeEventListener('keydown', e, !0)
      );
    }, [de]);
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
          B = (a.clientX - w) / P;
        let $ = 0.2 / (P > 200 ? P / 200 : 1);
        return B < $ ? 'start' : B > 1 - $ ? 'end' : '';
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
            const { progress: B } = s.getTask(d);
            (me.current = {
              id: d,
              x: f,
              progress: B,
              dx: 0,
              node: e,
              marker: a.target,
            }),
              a.target.classList.add('wx-progress-in-drag');
          } else {
            const B = D(e, a, w) || 'move',
              $ = {
                id: d,
                mode: B,
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
          ke();
        }
      },
      [s, n, D, ke, le],
    ),
    xe = A(
      (e) => {
        if (e.button !== 0 || de) return;
        const a = Fe(e);
        if (!a && g && !n) {
          const f = b.current;
          if (!f) return;
          const d = f.getBoundingClientRect(),
            w = e.clientX - d.left,
            P = e.clientY - d.top;
          if (R) {
            const $ = Ht(w, H);
            $ && ((fe.current = $), Ne($));
          }
          const B = {
            startX: w,
            startY: P,
            currentX: w,
            currentY: P,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          N(B), (S.current = B), ke();
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
              ke();
            return;
          }
        }
        a && V(a, e);
      },
      [V, g, R, n, de, H, O, s, ke],
    ),
    ge = A(
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
          N(null),
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
      if (me.current) {
        const { dx: a, id: f, marker: d, value: w } = me.current;
        (me.current = null),
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
          start: B,
          segment: $,
          index: oe,
        } = ee;
        if ((Q(null), B)) {
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
              Te = s.getTask(a);
            $ && (Te = Te.segments[oe]);
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
              ? ((Se.start = new Date(Te.start.getTime() + Oe)),
                (Se.end = new Date(Te.end.getTime() + Oe)))
              : f === 'start'
                ? ((Se.start = new Date(Te.start.getTime() + Oe)),
                  (Se.end = Te.end))
                : f === 'end' &&
                  ((Se.start = Te.start),
                  (Se.end = new Date(Te.end.getTime() + Oe))),
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
        if (de && b.current) {
          const d = b.current.getBoundingClientRect();
          Me((w) => (w ? { ...w, currentX: f - d.left } : null));
        }
        if (F) {
          const d = b.current;
          if (!d) return;
          const w = d.getBoundingClientRect(),
            P = f - w.left,
            B = a.clientY - w.top;
          N(($) => ({
            ...$,
            currentX: P,
            currentY: B,
          })),
            S.current && ((S.current.currentX = P), (S.current.currentY = B));
          return;
        }
        if (!n)
          if (me.current) {
            const { node: d, x: w, id: P } = me.current,
              B = (me.current.dx = f - w),
              $ = Math.round((B / d.offsetWidth) * 100);
            let oe = me.current.progress + $;
            (me.current.value = oe = Math.min(Math.max(0, oe), 100)),
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
                x: B,
                id: $,
                start: oe,
                segment: ae,
                index: Se,
              } = ee,
              Te = s.getTask($),
              Ie = f - B,
              Ve = Math.round(te) || 1;
            if (
              (!oe && Math.abs(Ie) < 20) ||
              (d === 'start' && P - Ie < Ve) ||
              (d === 'end' && P + Ie < Ve) ||
              (d === 'move' &&
                ((Ie < 0 && w + Ie < 0) || (Ie > 0 && w + P + Ie > z))) ||
              (ee.segment && !gn(Te, ee))
            )
              return;
            const Oe = { ...ee, dx: Ie };
            let Xe, Be;
            if (
              (d === 'start'
                ? ((Xe = w + Ie), (Be = P - Ie))
                : d === 'end'
                  ? ((Xe = w), (Be = P + Ie))
                  : d === 'move' && ((Xe = w + Ie), (Be = P)),
              s.exec('drag-task', {
                id: $,
                width: Be,
                left: Xe,
                inProgress: !0,
                start: oe,
                ...(ae && { segmentIndex: Se }),
              }),
              !Oe.start &&
                ((d === 'move' && Te.$x == w) || (d !== 'move' && Te.$w == P)))
            ) {
              (T.current = !0), Pe();
              return;
            }
            (Oe.start = !0), Q(Oe);
          } else {
            const d = Fe(e);
            if (d) {
              const w = s.getTask(Qe(d)),
                B = Fe(e, 'data-segment') || d,
                $ = D(B, a, w);
              B.style.cursor = $ && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [s, n, ee, te, z, D, $e, Pe],
    ),
    Yt = A(
      (e) => {
        tt(e, e);
      },
      [tt],
    ),
    Bt = A(
      (e) => {
        He
          ? (e.preventDefault(), tt(e, e.touches[0]))
          : l.current && (clearTimeout(l.current), (l.current = null));
      },
      [He, tt],
    ),
    ct = A(() => {
      Pe();
    }, [Pe]),
    Kt = A(() => {
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
      L && he(null);
    }, [L]),
    qt = A(
      (e) => {
        if (T.current) {
          T.current = !1;
          return;
        }
        if (de && de.currentX != null) {
          const f = Ht(de.currentX, H);
          f && h(f, de.tasks, de.parent), Me(null);
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const a = Ze(e.target);
        if (a) {
          const f = e.target.classList;
          if (f.contains('wx-link')) {
            const d = f.contains('wx-left');
            if (!L) {
              he({ id: a, start: d });
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
        if (He || l.current) return e.preventDefault(), !1;
      },
      [He],
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
        if (pe?.auto) {
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
      [pe, E, L],
    );
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${ue.length ? ue[0].$h : 0}px` },
    ref: b,
    onContextMenu: Qt,
    onMouseDown: xe,
    onMouseMove: Yt,
    onTouchStart: ge,
    onTouchMove: Bt,
    onTouchEnd: Kt,
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
            (He && ee && e.id === ee.id ? ' wx-touch' : '') +
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
                          B = Math.floor(e.$x / te),
                          $ = Math.ceil((e.$x + e.$w) / te);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: $ - B }, (oe, ae) => {
                            const Se = B + ae,
                              Te = P?.get(Se) || 0;
                            return /* @__PURE__ */ u(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${Te === 0 ? ' wx-week-count-zero' : ''}`,
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
                                children: Te,
                              },
                              Se,
                            );
                          }),
                        });
                      })(),
                  ],
                }),
              X && !e.$skip_baseline
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
      de &&
        de.currentX != null &&
        de.tasks.map((e, a) => {
          const d =
              (Math.floor(de.currentX / te) + (e._startCellOffset || 0)) * te,
            w = e._originalWidth || te,
            P = e._originalHeight || U,
            B = De.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: d, top: B, width: w, height: P },
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
    c = Ye(Ue),
    o = Y(c, '_scales');
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
      summaryBarCounts: K = !1,
      marqueeSelect: _ = !1,
      copyPaste: G = !1,
    } = t,
    v = Ye(Ue),
    [H, m] = mt(v, '_selected'),
    X = Y(v, 'scrollTop'),
    O = Y(v, 'cellHeight'),
    re = Y(v, 'cellWidth'),
    Z = Y(v, '_scales'),
    E = Y(v, '_markers'),
    pe = Y(v, '_scrollTask'),
    le = Y(v, 'zoom'),
    [ye, ie] = we(),
    U = ne(null),
    ue = Y(v, '_tasks'),
    te = 1 + (Z?.rows?.length || 0),
    j = C(() => {
      if (!g || !R || !ue?.length) return null;
      const p = /* @__PURE__ */ new Map(),
        T = /* @__PURE__ */ new Map(),
        L = [];
      return (
        ue.forEach((he) => {
          const ee = R.taskRows.get(he.id) ?? he.id;
          T.has(ee) || (T.set(ee, L.length), L.push(ee));
        }),
        ue.forEach((he) => {
          const ee = R.taskRows.get(he.id) ?? he.id,
            Q = T.get(ee) ?? 0;
          p.set(he.id, Q * O);
        }),
        p
      );
    }, [ue, g, R, O]),
    J = C(() => {
      const p = [];
      return (
        H &&
          H.length &&
          O &&
          H.forEach((T) => {
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
          const he = R.taskRows.get(L.id) ?? L.id;
          T.includes(he) || T.push(he);
        }),
        T.map((L) => ({
          id: L,
          height: s[L] || O,
        }))
      );
    }, [ue, R, s, g, O]);
  se(() => {
    const p = U.current;
    p && typeof X == 'number' && (p.scrollTop = g ? 0 : X);
  }, [X, g]);
  const N = () => {
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
      he = Math.floor(((p && p.scrollTop) || 0) / (O || 1)),
      ee = Math.max(0, he - te),
      Q = he + L + te,
      me = ee * (O || 0);
    v.exec('render-data', {
      start: ee,
      end: Q,
      from: me,
    });
  }
  se(() => {
    q();
  }, [ye, X]);
  const ve = A(
    (p) => {
      if (!p) return;
      const { id: T, mode: L } = p;
      if (L.toString().indexOf('x') < 0) return;
      const he = U.current;
      if (!he) return;
      const { clientWidth: ee } = he,
        Q = v.getTask(T);
      if (Q.$x + Q.$w < he.scrollLeft)
        v.exec('scroll-chart', { left: Q.$x - (re || 0) }),
          (he.scrollLeft = Q.$x - (re || 0));
      else if (Q.$x >= ee + he.scrollLeft) {
        const me = ee < Q.$w ? re || 0 : Q.$w;
        v.exec('scroll-chart', { left: Q.$x - ee + me }),
          (he.scrollLeft = Q.$x - ee + me);
      }
    },
    [v, re],
  );
  se(() => {
    ve(pe);
  }, [pe]);
  function de(p) {
    if (le && (p.ctrlKey || p.metaKey)) {
      p.preventDefault();
      const T = U.current,
        L = -Math.sign(p.deltaY),
        he = p.clientX - (T ? T.getBoundingClientRect().left : 0);
      v.exec('zoom-scale', {
        dir: L,
        offset: he,
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
  const be = C(
      () =>
        Z && (Z.minUnit === 'hour' || Z.minUnit === 'day') && k
          ? Z.rows[Z.rows.length - 1].cells.map(Me)
          : null,
      [Z, k],
    ),
    Ne = A(
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
  const fe = ne(null);
  return (
    se(() => {
      const p = U.current;
      if (p && !fe.current)
        return (
          (fe.current = Wt(p, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (T) => Ne(T),
          })),
          () => {
            fe.current?.destroy(), (fe.current = null);
          }
        );
    }, []),
    se(() => {
      const p = U.current;
      if (!p) return;
      const T = de;
      return (
        p.addEventListener('wheel', T),
        () => {
          p.removeEventListener('wheel', T);
        }
      );
    }, [de]),
    Wn('chart'),
    /* @__PURE__ */ Ae('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: U,
      onScroll: N,
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
            be
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: be.map((p, T) =>
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
            H && H.length
              ? H.map((p, T) =>
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
              summaryBarCounts: K,
              marqueeSelect: _,
              copyPaste: G,
            }),
          ],
        }),
      ],
    })
  );
}
function Xn(t) {
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
    [K, _] = ht(t.display ?? 'all');
  function G(N) {
    let S = 0;
    n == 'center' ? (S = r / 2) : n == 'before' && (S = r);
    const q = {
      size: [r + 'px', 'auto'],
      p: [N - S + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (c != 'x') for (let ve in q) q[ve] = q[ve].reverse();
    return q;
  }
  const [v, H] = we(!1),
    [m, X] = we(null),
    O = ne(0),
    re = ne(),
    Z = ne(),
    E = ne(K);
  se(() => {
    E.current = K;
  }, [K]),
    se(() => {
      m === null && s > 0 && X(s);
    }, [m, s]);
  function pe(N) {
    return c == 'x' ? N.clientX : N.clientY;
  }
  const le = A(
      (N) => {
        const S = re.current + pe(N) - O.current;
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
        H(!1),
        window.removeEventListener('mousemove', le),
        window.removeEventListener('mouseup', ye);
    }, [le]),
    ie = C(
      () => (K !== 'all' ? 'auto' : c == 'x' ? 'ew-resize' : 'ns-resize'),
      [K, c],
    ),
    U = A(
      (N) => {
        (!k && (K === 'grid' || K === 'chart')) ||
          ((O.current = pe(N)),
          (re.current = s),
          H(!0),
          (document.body.style.cursor = ie),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', le),
          window.addEventListener('mouseup', ye));
      },
      [ie, le, ye, s, k, K],
    );
  function ue() {
    _('all'), m !== null && (x(m), o && o(m));
  }
  function te(N) {
    if (k) {
      const S = K === 'chart' ? 'grid' : 'chart';
      _(S), M(S);
    } else if (K === 'grid' || K === 'chart') ue(), M('all');
    else {
      const S = N === 'left' ? 'chart' : 'grid';
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
      `wx-resizer-display-${K}`,
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
const Yn = 650;
function Ot(t) {
  let n;
  function r() {
    (n = new ResizeObserver((o) => {
      for (let M of o)
        if (M.target === document.body) {
          let k = M.contentRect.width <= Yn;
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
function Bn(t) {
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
      marqueeSelect: K = !1,
      copyPaste: _ = !1,
    } = t,
    G = Ye(Ue),
    v = Y(G, '_tasks'),
    H = Y(G, '_scales'),
    m = Y(G, 'cellHeight'),
    X = Y(G, 'columns'),
    O = Y(G, '_scrollTask'),
    re = Y(G, 'undo'),
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
    [E, pe] = we(!1);
  let [le, ye] = we(0);
  const [ie, U] = we(0),
    [ue, te] = we(0),
    [j, J] = we(void 0),
    [I, F] = we('all'),
    N = ne(null),
    S = A(
      (l) => {
        pe(
          (z) => (
            l !== z &&
              (l
                ? ((N.current = I), I === 'all' && F('grid'))
                : (!N.current || N.current === 'all') && F('all')),
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
      X.every((z) => z.width && !z.flexgrow)
        ? (l = X.reduce((z, W) => z + parseInt(W.width), 0))
        : E && I === 'chart'
          ? (l = parseInt(X.find((z) => z.id === 'action')?.width) || 50)
          : (l = 440),
      (le = l),
      l
    );
  }, [X, E, I]);
  se(() => {
    ye(q);
  }, [q]);
  const ve = C(() => (ie ?? 0) - (j ?? 0), [ie, j]),
    de = C(() => H.width, [H]),
    Me = 14,
    be = C(() => {
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
    Ne = C(() => H.height + be + ve, [H, be, ve]),
    fe = C(() => le + de, [le, de]),
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
  const he = A(() => {
      Promise.resolve().then(() => {
        if (!T.current && (ie ?? 0) > (fe ?? 0)) {
          const l = (ie ?? 0) - le;
          G.exec('expand-scale', { minWidth: l });
        }
      });
    }, [ie, fe, le, G]),
    ee = ne(he);
  (ee.current = he),
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
    me = ne(null),
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
      rScales: H,
      rCellHeight: m,
      scrollSize: ve,
      ganttDiv: Q.current,
      ganttHeight: ue ?? 0,
    };
  }, [v, H, m, ve, ue]);
  const Re = A(
    (l) => {
      if (!l) return;
      const {
        rTasks: z,
        rScales: W,
        rCellHeight: b,
        scrollSize: Le,
        ganttDiv: ce,
        ganttHeight: ke,
      } = _e.current;
      if (!ce) return;
      const { id: Ce } = l,
        Ee = z.findIndex((De) => De.id === Ce);
      if (Ee > -1) {
        const De = ke - W.height,
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
        z = me.current;
      if (!l || !z) return;
      const W = () => {
          Cn(() => {
            te(l.offsetHeight), U(l.offsetWidth), J(z.offsetWidth);
          });
        },
        b = new ResizeObserver(W);
      return b.observe(l), () => b.disconnect();
    }, [Q.current]);
  const He = ne(null),
    ze = ne(null);
  return (
    se(() => {
      ze.current && (ze.current.destroy(), (ze.current = null));
      const l = He.current;
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
        style: { height: Ne, width: '100%' },
        ref: me,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: ue,
            width: j,
          },
          children: /* @__PURE__ */ Ae('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: He,
            children: [
              X.length
                ? /* @__PURE__ */ Ae(et, {
                    children: [
                      /* @__PURE__ */ u(Ln, {
                        display: I,
                        compactMode: E,
                        columnWidth: q,
                        width: le,
                        readonly: r,
                        fullHeight: be,
                        onTableAPIChange: k,
                        multiTaskRows: y,
                        rowMapping: Z,
                        rowHeightOverrides: R,
                      }),
                      /* @__PURE__ */ u(Xn, {
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
                  fullWidth: de,
                  fullHeight: be,
                  taskTemplate: n,
                  cellBorders: c,
                  highlightTime: o,
                  onScaleClick: M,
                  multiTaskRows: y,
                  rowMapping: Z,
                  rowHeightOverrides: R,
                  allowTaskIntersection: s,
                  summaryBarCounts: x,
                  marqueeSelect: K,
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
function Kn(t) {
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
function Xt(t, n) {
  return t.map(({ format: r, ...c }) => ({
    ...c,
    format: Vn(r, n),
  }));
}
function Fn(t, n) {
  const r = Kn(n);
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
          scales: Xt(r.scales, n),
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
      lengthUnit: K = 'day',
      durationUnit: _ = 'day',
      cellWidth: G = 100,
      cellHeight: v = 38,
      scaleHeight: H = 36,
      readonly: m = !1,
      cellBorders: X = 'full',
      zoom: O = !1,
      baselines: re = !1,
      highlightTime: Z = null,
      onScaleClick: E = null,
      init: pe = null,
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
      rowHeightOverrides: N = null,
      allowTaskIntersection: S = !0,
      summaryBarCounts: q = !1,
      marqueeSelect: ve = !1,
      copyPaste: de = !1,
      summary: Me = null,
      _export: be = !1,
      ...Ne
    },
    fe,
  ) {
    const p = ne();
    p.current = Ne;
    const T = C(() => new wn(kn), []),
      L = C(() => ({ ...gt, ...it }), []),
      he = Ye(Ke.i18n),
      ee = C(() => (he ? he.extend(L, !0) : lt(L)), [he, L]),
      Q = C(() => ee.getRaw().calendar, [ee]),
      me = C(() => {
        let ce = {
          zoom: Un(O, Q),
          scales: Xt(g, Q),
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
      (be || Ct(o, { durationUnit: _, splitTasks: I, calendar: j }),
      (Ge.current = o)),
      se(() => {
        be || Ct(o, { durationUnit: _, splitTasks: I, calendar: j });
      }, [o, _, j, I, be]);
    const _e = C(() => {
        if (!F) return null;
        const ce = /* @__PURE__ */ new Map(),
          ke = /* @__PURE__ */ new Map(),
          Ce = (Ee) => {
            Ee.forEach((De) => {
              const We = De.row ?? De.id;
              ke.set(De.id, We),
                ce.has(We) || ce.set(We, []),
                ce.get(We).push(De.id),
                De.data && De.data.length > 0 && Ce(De.data);
            });
          };
        return Ce(o), { rowMap: ce, taskRows: ke };
      }, [o, F]),
      Re = C(() => T.in, [T]),
      He = ne(null);
    He.current === null &&
      ((He.current = new fn((ce, ke) => {
        const Ce = 'on' + jn(ce);
        p.current && p.current[Ce] && p.current[Ce](ke);
      })),
      Re.setNext(He.current));
    const [ze, l] = we(null),
      z = ne(null);
    z.current = ze;
    const W = C(
      () => ({
        getState: T.getState.bind(T),
        getReactiveState: T.getReactive.bind(T),
        getStores: () => ({ data: T }),
        exec: Re.exec.bind(Re),
        setNext: (ce) => ((He.current = He.current.setNext(ce)), He.current),
        intercept: Re.intercept.bind(Re),
        on: Re.on.bind(Re),
        detach: Re.detach.bind(Re),
        getTask: T.getTask.bind(T),
        serialize: () => T.serialize(),
        getTable: (ce) =>
          ce
            ? new Promise((ke) => setTimeout(() => ke(z.current), 1))
            : z.current,
        getHistory: () => T.getHistory(),
      }),
      [T, Re],
    );
    se(() => {
      const ce = () => {
        const { zoom: ke, scales: Ce } = W.getState(),
          De = ke?.levels?.[ke.level]?.scales?.[0]?.unit ?? Ce?.[0]?.unit;
        De && W.exec('scale-change', { level: ke?.level, unit: De });
      };
      W.on('zoom-scale', ce), W.on('set-scale', ce);
    }, [W]),
      se(() => {
        W.intercept('set-scale', ({ unit: ce, date: ke }) => {
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
              ...(ke ? { _scaleDate: ke, _zoomOffset: 0 } : {}),
            });
          } else if (ke) {
            const { _scales: i, cellWidth: h } = W.getState(),
              D = i.diff(ke, i.start, i.lengthUnit),
              V = Math.max(0, Math.round(D * h));
            W.exec('scroll-chart', { left: V });
          }
          return !1;
        });
      }, [W]),
      Pt(
        fe,
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
            links: me.links,
            start: s,
            columns: me.columns,
            end: x,
            lengthUnit: K,
            cellWidth: me.cellWidth,
            cellHeight: v,
            scaleHeight: H,
            scales: me.scales,
            taskTypes: c,
            zoom: me.zoom,
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
        : pe && pe(W),
        b.current++;
    }, [
      W,
      pe,
      o,
      me,
      s,
      x,
      K,
      v,
      H,
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
          links: me.links,
          start: s,
          columns: me.columns,
          end: x,
          lengthUnit: K,
          cellWidth: me.cellWidth,
          cellHeight: v,
          scaleHeight: H,
          scales: me.scales,
          taskTypes: c,
          zoom: me.zoom,
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
          ? (ce, ke) =>
              (ke == 'day' && !j.getDayHours(ce)) ||
              (ke == 'hour' && !j.getDayHours(ce))
                ? 'wx-weekend'
                : ''
          : Z,
      [j, Z],
    );
    return /* @__PURE__ */ u(Ke.i18n.Provider, {
      value: ee,
      children: /* @__PURE__ */ u(Ue.Provider, {
        value: W,
        children: /* @__PURE__ */ u(Bn, {
          taskTemplate: n,
          readonly: m,
          cellBorders: X,
          highlightTime: Le,
          onScaleClick: E,
          onTableAPIChange: l,
          multiTaskRows: F,
          rowMapping: _e,
          rowHeightOverrides: N,
          allowTaskIntersection: S,
          summaryBarCounts: q,
          marqueeSelect: ve,
          copyPaste: de,
        }),
      }),
    });
  });
function Ts({ api: t = null, items: n = [] }) {
  const r = Ye(Ke.i18n),
    c = C(() => r || lt(it), [r]),
    o = C(() => c.getGroup('gantt'), [c]),
    M = qe(t, '_selected'),
    k = qe(t, 'undo'),
    y = qe(t, 'history'),
    g = qe(t, 'splitTasks'),
    R = ['undo', 'redo'],
    s = C(() => {
      const K = Mt({ undo: !0, splitTasks: !0 });
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
          (v.handler = _t(K, v.id) ? (H) => zt(t, H.id, null, o) : v.handler),
          v.text && (v.text = o(v.text)),
          v.menuText && (v.menuText = o(v.menuText)),
          v
        );
      });
    }, [n, t, o, k, g]),
    x = C(() => {
      const K = [];
      return (
        s.forEach((_) => {
          const G = _.id;
          if (G === 'add-task') K.push(_);
          else if (R.includes(G))
            R.includes(G) &&
              K.push({
                ..._,
                disabled: _.isDisabled(y),
              });
          else {
            if (!M?.length || !t) return;
            K.push({
              ..._,
              disabled:
                _.isDisabled && M.some((v) => _.isDisabled(v, t.getState())),
            });
          }
        }),
        K.filter((_, G) => {
          if (t && _.isHidden)
            return !M.some((v) => _.isHidden(v, t.getState()));
          if (_.comp === 'separator') {
            const v = K[G + 1];
            if (!v || v.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, M, y, s]);
  return r
    ? /* @__PURE__ */ u(Et, { items: x })
    : /* @__PURE__ */ u(Ke.i18n.Provider, {
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
    K = Ye(Ke.i18n),
    _ = C(() => K || lt({ ...it, ...gt }), [K]),
    G = C(() => _.getGroup('gantt'), [_]),
    v = qe(r, 'taskTypes'),
    H = qe(r, 'selected'),
    m = qe(r, '_selected'),
    X = qe(r, 'splitTasks'),
    O = qe(r, 'summary'),
    re = C(
      () => ({
        splitTasks: X,
        taskTypes: v,
        summary: O,
      }),
      [X, v, O],
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
  function pe() {
    const J = n.length ? n : Rt(re);
    return E(J);
  }
  const le = C(() => pe(), [r, n, re, G]),
    ye = C(() => (m && m.length ? m : []), [m]),
    ie = A(
      (J, I) => {
        let F = J ? r?.getTask(J) : null;
        if (c) {
          const N = c(J, I);
          F = N === !0 ? F : N;
        }
        if (F) {
          const N = Ze(I.target, 'data-segment');
          N !== null
            ? (x.current = { id: F.id, segmentIndex: N })
            : (x.current = F.id),
            (!Array.isArray(H) || !H.includes(F.id)) &&
              r &&
              r.exec &&
              r.exec('select-task', { id: F.id });
        }
        return F;
      },
      [r, c, H],
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
        let N = o ? F.every((S) => o(J, S)) : !0;
        if (
          N &&
          (J.isHidden &&
            (N = !F.some((S) => J.isHidden(S, r.getState(), x.current))),
          J.isDisabled)
        ) {
          const S = F.some((q) => J.isDisabled(q, r.getState(), x.current));
          J.disabled = S;
        }
        return N;
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
  if (!K && Ke.i18n?.Provider) {
    const J = Ke.i18n.Provider;
    return /* @__PURE__ */ u(J, { value: _, children: j });
  }
  return j;
});
function ss({ api: t, autoSave: n, onLinksChange: r }) {
  const o = Ye(Ke.i18n).getGroup('gantt'),
    M = Y(t, 'activeTask'),
    k = Y(t, '_activeTask'),
    y = Y(t, '_links'),
    g = Y(t, 'schedule'),
    R = Y(t, 'unscheduledTasks'),
    [s, x] = we();
  function K() {
    if (M) {
      const H = y
          .filter((X) => X.target == M)
          .map((X) => ({ link: X, task: t.getTask(X.source) })),
        m = y
          .filter((X) => X.source == M)
          .map((X) => ({ link: X, task: t.getTask(X.target) }));
      return [
        { title: o('Predecessors'), data: H },
        { title: o('Successors'), data: m },
      ];
    }
  }
  se(() => {
    x(K());
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
  function G(H) {
    n
      ? t.exec('delete-link', { id: H })
      : (x((m) =>
          (m || []).map((X) => ({
            ...X,
            data: X.data.filter((O) => O.link.id !== H),
          })),
        ),
        r &&
          r({
            id: H,
            action: 'delete-link',
            data: { id: H },
          }));
  }
  function v(H, m) {
    n
      ? t.exec('update-link', {
          id: H,
          link: m,
        })
      : (x((X) =>
          (X || []).map((O) => ({
            ...O,
            data: O.data.map((re) =>
              re.link.id === H ? { ...re, link: { ...re.link, ...m } } : re,
            ),
          })),
        ),
        r &&
          r({
            id: H,
            action: 'update-link',
            data: {
              id: H,
              link: m,
            },
          }));
  }
  return /* @__PURE__ */ u(et, {
    children: (s || []).map((H, m) =>
      H.data.length
        ? /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ u(Ke.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ u(en, {
                  label: H.title,
                  position: 'top',
                  children: /* @__PURE__ */ u('table', {
                    children: /* @__PURE__ */ u('tbody', {
                      children: H.data.map((X) =>
                        /* @__PURE__ */ Ae(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: X.task.text || '',
                                }),
                              }),
                              g?.auto && X.link.type === 'e2s'
                                ? /* @__PURE__ */ u('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ u(tn, {
                                      type: 'number',
                                      placeholder: o('Lag'),
                                      value: X.link.lag,
                                      disabled: R && k?.unscheduled,
                                      onChange: (O) => {
                                        O.input ||
                                          v(X.link.id, { lag: O.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ u(nn, {
                                    value: X.link.type,
                                    placeholder: o('Select link type'),
                                    options: _,
                                    onChange: (O) =>
                                      v(X.link.id, { type: O.value }),
                                    children: ({ option: O }) => O.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => G(X.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          X.link.id,
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
  const x = Ye(Ke.i18n),
    K = C(() => x || lt({ ...it, ...gt }), [x]),
    _ = C(() => K.getGroup('gantt'), [K]),
    G = K.getRaw(),
    v = C(() => {
      const l = G.gantt?.dateFormat || G.formats?.dateFormat;
      return ot(l, G.calendar);
    }, [G]),
    H = C(() => {
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
    [m, X] = we(!1),
    O = C(() => (m ? 'wx-full-screen' : ''), [m]),
    re = A((l) => {
      X(l);
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
  const Z = Y(t, '_activeTask'),
    E = Y(t, 'activeTask'),
    pe = Y(t, 'unscheduledTasks'),
    le = Y(t, 'summary'),
    ye = Y(t, 'links'),
    ie = Y(t, 'splitTasks'),
    U = C(() => ie && E?.segmentIndex, [ie, E]),
    ue = C(() => U || U === 0, [U]),
    te = Y(t, 'taskTypes'),
    j = C(
      () => bn({ unscheduledTasks: pe, summary: le, taskTypes: te }),
      [pe, le, te],
    ),
    J = Y(t, 'undo'),
    [I, F] = we({}),
    [N, S] = we(null),
    [q, ve] = we(),
    [de, Me] = we(null),
    be = C(() => {
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
    ve(be);
  }, [be]),
    se(() => {
      F({}), Me(null), S(null);
    }, [E]);
  function Ne(l, z) {
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
  const fe = C(() => {
      let l = n.length ? n : j;
      return (
        (l = Ne(l, q)),
        q ? l.filter((z) => !z.isHidden || !z.isHidden(q, t.getState())) : l
      );
    }, [n, j, q, _, t, g]),
    p = C(() => fe.map((l) => l.key), [fe]);
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
    he = A(() => {
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
        z.id === 'delete' && he(),
          z.id === 'save' && (W.length ? ee() : L()),
          z.comp && ee();
      },
      [t, E, g, L, he, ee],
    ),
    me = A(
      (l, z, W) => (
        pe && l.type === 'summary' && (l.unscheduled = !1),
        Gt(l, t.getState(), z),
        W || S(!1),
        l
      ),
      [pe, t],
    ),
    Ge = A(
      (l) => {
        (l = {
          ...l,
          unscheduled: pe && l.unscheduled && l.type !== 'summary',
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
        g && N && (z.inProgress = N), t.exec('update-task', z), g || L();
      },
      [t, E, pe, g, L, p, ue, U, N],
    ),
    _e = A(
      (l) => {
        let { update: z, key: W, input: b } = l;
        if ((b && S(!0), (l.update = me({ ...z }, W, b)), !g)) ve(l.update);
        else if (!de && !b) {
          const Le = fe.find((Ce) => Ce.key === W),
            ce = z[W];
          (!Le.validation || Le.validation(ce)) &&
            (!Le.required || ce) &&
            Ge(l.update);
        }
      },
      [g, me, de, fe, Ge],
    ),
    Re = A(
      (l) => {
        g || Ge(l.values);
      },
      [g, Ge],
    ),
    He = A((l) => {
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
  return be
    ? /* @__PURE__ */ u(on, {
        children: /* @__PURE__ */ u(Rn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${O} ${r}`,
          items: fe,
          values: be,
          topBar: H,
          bottomBar: k,
          placement: M,
          layout: c,
          readonly: o,
          autoSave: g,
          focus: R,
          onAction: Q,
          onSave: Re,
          onValidation: He,
          onChange: _e,
          hotkeys: s && { ...ze, ...s },
        }),
      })
    : null;
}
const Ms = ({ children: t, columns: n = null, api: r }) => {
  const [c, o] = we(null);
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
    [k, y] = we({}),
    [g, R] = we(null),
    [s, x] = we({}),
    [K, _] = we(!1),
    G = ne(!1),
    v = ne(null);
  function H(N) {
    for (; N; ) {
      if (N.getAttribute) {
        const S = N.getAttribute('data-tooltip-id'),
          q = N.getAttribute('data-tooltip-at'),
          ve = N.getAttribute('data-tooltip');
        if (S || ve) return { id: S, tooltip: ve, target: N, at: q };
      }
      N = N.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  se(() => {
    const N = M.current;
    if (!K && N && s && (s.text || r)) {
      const S = N.getBoundingClientRect();
      let q = !1,
        ve = s.left,
        de = s.top;
      S.right >= k.right && ((ve = k.width - S.width - 5), (q = !0)),
        S.bottom >= k.bottom &&
          ((de = s.top - (S.bottom - k.bottom + 2)), (q = !0)),
        q && x((Me) => Me && { ...Me, left: ve, top: de });
    }
  }, [s, k, r, K]);
  const m = ne(null),
    X = ne(null),
    O = 300,
    re = 150,
    Z = (N) => {
      clearTimeout(m.current),
        (m.current = setTimeout(() => {
          N();
        }, O));
    };
  function E() {
    clearTimeout(m.current), (X.current = null), x(null), R(null), _(!1);
  }
  function pe() {
    clearTimeout(v.current),
      (v.current = setTimeout(() => {
        G.current || E();
      }, re));
  }
  function le() {
    clearTimeout(v.current);
  }
  function ye(N) {
    let { id: S, tooltip: q, target: ve, at: de } = H(N.target);
    if (!S && !q) {
      clearTimeout(m.current), G.current || pe();
      return;
    }
    if ((le(), q || (q = J(S)), X.current === S && s)) {
      const be = o.current,
        Ne = be ? be.getBoundingClientRect() : { left: 0 };
      de !== 'left' && x((fe) => fe && { ...fe, left: N.clientX - Ne.left });
      return;
    }
    (X.current = S), x(null), R(null), _(!1);
    const Me = N.clientX;
    Z(() => {
      S && R(j(I(S)));
      const be = ve.getBoundingClientRect(),
        Ne = o.current,
        fe = Ne
          ? Ne.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let p, T;
      de === 'left'
        ? ((p = be.top + 5 - fe.top), (T = be.right + 5 - fe.left))
        : ((p = be.top + be.height - fe.top), (T = Me - fe.left)),
        y(fe),
        x({ top: p, left: T, text: q });
    });
  }
  function ie() {
    (G.current = !0), le();
  }
  function U() {
    (G.current = !1), pe();
  }
  function ue(N) {
    const S = N.touches[0];
    if (!S) return;
    const { id: q, target: ve } = H(N.target);
    if (!q) return;
    clearTimeout(m.current);
    const de = j(I(q)),
      Me = de?.text || '',
      be = ve.getBoundingClientRect(),
      Ne = o.current,
      fe = Ne
        ? Ne.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    R(de),
      y(fe),
      _(!0),
      x({
        top: be.top - fe.top - 8,
        left: S.clientX - fe.left,
        text: Me,
      });
  }
  function te() {
    x(null), R(null), _(!1);
  }
  function j(N) {
    return n?.getTask(I(N)) || null;
  }
  function J(N) {
    return j(N)?.text || '';
  }
  function I(N) {
    const S = Number(N);
    return Number.isFinite(S) ? S : N;
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
    K ? 'wx-gantt-tooltip--touch' : '',
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
  Bs as registerEditorItem,
  Xs as registerScaleUnit,
  Ls as version,
};
//# sourceMappingURL=index.es.js.map
