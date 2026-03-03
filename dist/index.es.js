import { jsxs as Ae, jsx as u, Fragment as et } from 'react/jsx-runtime';
import {
  createContext as Zt,
  useContext as Xe,
  useMemo as M,
  useState as ge,
  useCallback as I,
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
  handleAction as _t,
  isHandledAction as zt,
  getMenuOptions as Rt,
  getEditorItems as bn,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as Hs,
  defaultEditorItems as As,
  defaultMenuOptions as Ps,
  defaultTaskTypes as Gs,
  defaultToolbarButtons as _s,
  getEditorItems as zs,
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
import { registerEditorItem as Bs } from '@svar-ui/react-editor';
const Ue = Zt(null);
function Qe(t) {
  const n = t.getAttribute('data-id'),
    s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function En(t, n, s) {
  const i = t.getBoundingClientRect(),
    o = n.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: i.top - o.top,
    left: i.left - o.left,
    dt: i.bottom - s.clientY,
    db: s.clientY - i.top,
  };
}
function Dt(t) {
  return t && t.getAttribute('data-context-id');
}
const St = 5;
function Dn(t, n) {
  let s, i, o, R, E, y, w, H, r;
  function g(k) {
    (R = k.clientX),
      (E = k.clientY),
      (y = {
        ...En(s, t, k),
        y: n.getTask(o).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function B(k) {
    (s = Fe(k)),
      Dt(s) &&
        ((o = Qe(s)),
        (r = setTimeout(() => {
          (H = !0), n && n.touchStart && n.touchStart(), g(k.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', G),
        t.addEventListener('contextmenu', W),
        window.addEventListener('touchend', Y));
  }
  function W(k) {
    if (H || r) return k.preventDefault(), !1;
  }
  function z(k) {
    k.which === 1 &&
      ((s = Fe(k)),
      Dt(s) &&
        ((o = Qe(s)),
        t.addEventListener('mousemove', h),
        window.addEventListener('mouseup', re),
        g(k)));
  }
  function v(k) {
    t.removeEventListener('mousemove', h),
      t.removeEventListener('touchmove', G),
      document.body.removeEventListener('mouseup', re),
      document.body.removeEventListener('touchend', Y),
      (document.body.style.userSelect = ''),
      k &&
        (t.removeEventListener('mousedown', z),
        t.removeEventListener('touchstart', B));
  }
  function D(k) {
    const we = k.clientX - R,
      le = k.clientY - E;
    if (!i) {
      if (
        (Math.abs(we) < St && Math.abs(le) < St) ||
        (n && n.start && n.start({ id: o, e: k }) === !1)
      )
        return;
      (i = s.cloneNode(!0)),
        (i.style.pointerEvents = 'none'),
        i.classList.add('wx-reorder-task'),
        (i.style.position = 'absolute'),
        (i.style.left = y.left + 'px'),
        (i.style.top = y.top + 'px'),
        (s.style.visibility = 'hidden'),
        s.parentNode.insertBefore(i, s);
    }
    if (i) {
      const xe = Math.round(Math.max(0, y.top + le));
      if (n && n.move && n.move({ id: o, top: xe, detail: w }) === !1) return;
      const ie = n.getTask(o),
        j = ie.$y;
      if (!y.start && y.y == j) return U();
      (y.start = !0), (y.y = ie.$y - 4), (i.style.top = xe + 'px');
      const de = document.elementFromPoint(k.clientX, k.clientY),
        te = Fe(de);
      if (te && te !== s) {
        const Q = Qe(te),
          J = te.getBoundingClientRect(),
          N = J.top + J.height / 2,
          F = k.clientY + y.db > N && te.nextElementSibling !== s,
          A = k.clientY - y.dt < N && te.previousElementSibling !== s;
        w?.after == Q || w?.before == Q
          ? (w = null)
          : F
            ? (w = { id: o, after: Q })
            : A && (w = { id: o, before: Q });
      }
    }
  }
  function h(k) {
    D(k);
  }
  function G(k) {
    H
      ? (k.preventDefault(), D(k.touches[0]))
      : r && (clearTimeout(r), (r = null));
  }
  function Y() {
    (H = null), r && (clearTimeout(r), (r = null)), U();
  }
  function re() {
    U();
  }
  function U() {
    s && (s.style.visibility = ''),
      i &&
        (i.parentNode.removeChild(i),
        n && n.end && n.end({ id: o, top: y.top })),
      (o = s = i = y = w = null),
      v();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', z),
    t.addEventListener('touchstart', B),
    {
      destroy() {
        v(!0);
      },
    }
  );
}
function Sn({ row: t, column: n }) {
  const s = Xe(Ue);
  function i(R, E) {
    return {
      justifyContent: E.align,
      paddingLeft: `${(R.$level - 1) * 20}px`,
    };
  }
  const o = n && n._cell;
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-pqc08MHU wx-content',
    style: i(t, n),
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
          ? /* @__PURE__ */ u(o, { row: t, column: n, api: s })
          : t.text,
      }),
    ],
  });
}
function Lt({ column: t, cell: n }) {
  const s = M(() => t.id, [t?.id]);
  return n || t.id == 'add-task'
    ? /* @__PURE__ */ u('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ u('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': s,
        }),
      })
    : null;
}
function Ln(t) {
  const {
      readonly: n,
      compactMode: s,
      width: i = 0,
      display: o = 'all',
      columnWidth: R = 0,
      fullHeight: E,
      onTableAPIChange: y,
      multiTaskRows: w = !1,
      rowMapping: H = null,
      rowHeightOverrides: r = null,
    } = t,
    [g, B] = ht(R),
    [W, z] = ge(),
    v = Xe(Ke.i18n),
    D = M(() => v.getGroup('gantt'), [v]),
    h = Xe(Ue),
    G = X(h, 'scrollTop'),
    Y = X(h, 'cellHeight'),
    re = X(h, '_scrollTask'),
    U = X(h, '_selected'),
    k = X(h, 'area'),
    we = X(h, '_tasks'),
    le = X(h, '_scales'),
    xe = X(h, 'columns'),
    ie = X(h, '_sort'),
    j = X(h, 'calendar'),
    de = X(h, 'durationUnit'),
    te = X(h, 'splitTasks'),
    [Q, J] = ge(null),
    N = M(() => {
      if (!we || !k) return [];
      if (w && H) {
        const c = /* @__PURE__ */ new Set();
        return we.filter((m) => {
          const S = H.taskRows.get(m.id) ?? m.id;
          return c.has(S) ? !1 : (c.add(S), !0);
        });
      }
      return we.slice(k.start, k.end);
    }, [we, k, w, H]),
    F = I(
      (c, m) => {
        if (m === 'add-task')
          h.exec(m, {
            target: c,
            task: { text: D('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (m === 'open-task') {
          const S = N.find((V) => V.id === c);
          (S?.data || S?.lazy) && h.exec(m, { id: c, mode: !S.open });
        }
      },
      [N],
    ),
    A = I(
      (c) => {
        const m = Ze(c),
          S = c.target.dataset.action;
        S && c.preventDefault(),
          m
            ? S === 'add-task' || S === 'open-task'
              ? F(m, S)
              : h.exec('select-task', {
                  id: m,
                  toggle: c.ctrlKey || c.metaKey,
                  range: c.shiftKey,
                  show: !0,
                })
            : S === 'add-task' && F(null, S);
      },
      [h, F],
    ),
    L = ne(null),
    q = ne(null),
    [ye, ue] = ge(0),
    [Me, Te] = ge(!1);
  se(() => {
    const c = q.current;
    if (!c || typeof ResizeObserver > 'u') return;
    const m = () => ue(c.clientWidth);
    m();
    const S = new ResizeObserver(m);
    return S.observe(c), () => S.disconnect();
  }, []);
  const Ie = ne(null),
    ve = I(
      (c) => {
        const m = c.id,
          { before: S, after: V } = c,
          pe = c.onMove;
        let me = S || V,
          $e = S ? 'before' : 'after';
        if (pe) {
          if ($e === 'after') {
            const Pe = h.getTask(me);
            Pe.data?.length &&
              Pe.open &&
              (($e = 'before'), (me = Pe.data[0].id));
          }
          Ie.current = { id: m, [$e]: me };
        } else Ie.current = null;
        h.exec('move-task', {
          id: m,
          mode: $e,
          target: me,
          inProgress: pe,
        });
      },
      [h],
    ),
    p = M(() => k?.from ?? 0, [k]),
    T = M(() => le?.height ?? 0, [le]),
    $ = M(
      () => (!s && o !== 'grid' ? (g ?? 0) > (i ?? 0) : (g ?? 0) > (ye ?? 0)),
      [s, o, g, i, ye],
    ),
    fe = M(() => {
      const c = {};
      return (
        ($ && o === 'all') || (o === 'grid' && $)
          ? (c.width = g)
          : o === 'grid' && (c.width = '100%'),
        c
      );
    }, [$, o, g]),
    ee = M(() => (Q && !N.find((c) => c.id === Q.id) ? [...N, Q] : N), [N, Q]),
    Z = M(() => {
      let c = (xe || []).map((V) => {
        V = { ...V };
        const pe = V.header;
        if (typeof pe == 'object') {
          const me = pe.text && D(pe.text);
          V.header = { ...pe, text: me };
        } else V.header = D(pe);
        if (V.cell && V.id !== 'text' && V.id !== 'add-task') {
          const me = V.cell;
          V.cell = ($e) => /* @__PURE__ */ u(me, { ...$e, api: h });
        }
        return V;
      });
      const m = c.findIndex((V) => V.id === 'text'),
        S = c.findIndex((V) => V.id === 'add-task');
      if (
        (m !== -1 && (c[m].cell && (c[m]._cell = c[m].cell), (c[m].cell = Sn)),
        S !== -1)
      ) {
        c[S].cell = c[S].cell || Lt;
        const V = c[S].header;
        if (
          (typeof V != 'object' && (c[S].header = { text: V }),
          (c[S].header.cell = V.cell || Lt),
          n)
        )
          c.splice(S, 1);
        else if (s) {
          const [pe] = c.splice(S, 1);
          c.unshift(pe);
        }
      }
      return c.length > 0 && (c[c.length - 1].resize = !1), c;
    }, [xe, D, n, s, h]),
    he = M(
      () =>
        o === 'all'
          ? `${i}px`
          : o === 'grid'
            ? 'calc(100% - 4px)'
            : Z.find((c) => c.id === 'add-task')
              ? '50px'
              : '0',
      [o, i, Z],
    ),
    Ge = M(() => {
      if (ee && ie?.length) {
        const c = {};
        return (
          ie.forEach(({ key: m, order: S }, V) => {
            c[m] = {
              order: S,
              ...(ie.length > 1 && { index: V }),
            };
          }),
          c
        );
      }
      return {};
    }, [ee, ie]),
    ze = I(() => Z.some((c) => c.flexgrow && !c.hidden), []),
    Re = M(() => ze(), [ze, Me]),
    He = M(() => {
      let c = o === 'chart' ? Z.filter((S) => S.id === 'add-task') : Z;
      const m = o === 'all' ? i : ye;
      if (!Re) {
        let S = g,
          V = !1;
        if (Z.some((pe) => pe.$width)) {
          let pe = 0;
          (S = Z.reduce(
            (me, $e) => (
              $e.hidden || ((pe += $e.width), (me += $e.$width || $e.width)), me
            ),
            0,
          )),
            pe > S && S > m && (V = !0);
        }
        if (V || S < m) {
          let pe = 1;
          return (
            V || (pe = (m - 50) / (S - 50 || 1)),
            c.map(
              (me) => (
                me.id !== 'add-task' &&
                  !me.hidden &&
                  (me.$width || (me.$width = me.width),
                  (me.width = me.$width * pe)),
                me
              ),
            )
          );
        }
      }
      return c;
    }, [o, Z, Re, g, i, ye]),
    _e = I(
      (c) => {
        if (!ze()) {
          const m = He.reduce(
            (S, V) => (
              c && V.$width && (V.$width = V.width),
              S + (V.hidden ? 0 : V.width)
            ),
            0,
          );
          m !== g && B(m);
        }
        Te(!0), Te(!1);
      },
      [ze, He, g, B],
    ),
    l = I(() => {
      Z.filter((m) => m.flexgrow && !m.hidden).length === 1 &&
        Z.forEach((m) => {
          m.$width && !m.flexgrow && !m.hidden && (m.width = m.$width);
        });
    }, []),
    _ = I(
      (c) => {
        if (!n) {
          const m = Ze(c),
            S = dn(c, 'data-col-id');
          !(S && Z.find((pe) => pe.id == S))?.editor &&
            m &&
            h.exec('show-editor', { id: m });
        }
      },
      [h, n],
      // cols is defined later; relies on latest value at call time
    ),
    O = M(() => (Array.isArray(U) ? U.map((c) => c.id) : []), [U]),
    b = I(() => {
      if (L.current && ee !== null) {
        const c = L.current.querySelector('.wx-body');
        c &&
          (w
            ? (c.style.top = '0px')
            : (c.style.top = -((G ?? 0) - (p ?? 0)) + 'px'));
      }
      q.current && (q.current.scrollTop = 0);
    }, [ee, G, p, w]);
  se(() => {
    L.current && b();
  }, [G, p, b]),
    se(() => {
      const c = L.current;
      if (!c) return;
      const m = c.querySelector('.wx-table-box .wx-body');
      if (!m || typeof ResizeObserver > 'u') return;
      const S = new ResizeObserver(() => {
        b();
      });
      return (
        S.observe(m),
        () => {
          S.disconnect();
        }
      );
    }, [He, fe, o, he, ee, b]),
    se(() => {
      if (!re || !W) return;
      const { id: c } = re,
        m = W.getState().focusCell;
      m &&
        m.row !== c &&
        L.current &&
        L.current.contains(document.activeElement) &&
        W.exec('focus-cell', {
          row: c,
          column: m.column,
        });
    }, [re, W]),
    se(() => {
      if (!w) return;
      const c = L.current;
      if (!c) return;
      const m = c.querySelector('.wx-table-box .wx-body');
      if (!m) return;
      let S = 0;
      m.querySelectorAll('[data-id]').forEach((pe) => {
        const me = pe.getAttribute('data-id'),
          $e = (r && me && r[me]) || Y;
        (pe.style.height = `${$e}px`),
          (pe.style.minHeight = `${$e}px`),
          (S += $e);
      }),
        S > 0 && (m.style.height = `${S}px`);
    }, [r, w, ee, Y]);
  const Le = I(
      ({ id: c }) => {
        if (n) return !1;
        h.getTask(c).open && h.exec('open-task', { id: c, mode: !1 });
        const m = h.getState()._tasks.find((S) => S.id === c);
        if ((J(m || null), !m)) return !1;
      },
      [h, n],
    ),
    ce = I(
      ({ id: c, top: m }) => {
        Ie.current
          ? ve({ ...Ie.current, onMove: !1 })
          : h.exec('drag-task', {
              id: c,
              top: m + (p ?? 0),
              inProgress: !1,
            }),
          J(null);
      },
      [h, ve, p],
    ),
    be = I(
      ({ id: c, top: m, detail: S }) => {
        S && ve({ ...S, onMove: !0 }),
          h.exec('drag-task', {
            id: c,
            top: m + (p ?? 0),
            inProgress: !0,
          });
      },
      [h, ve, p],
    );
  se(() => {
    const c = L.current;
    return c
      ? Dn(c, {
          start: Le,
          end: ce,
          move: be,
          getTask: h.getTask,
        }).destroy
      : void 0;
  }, [h, Le, ce, be]);
  const Ce = I(
      (c) => {
        const { key: m, isInput: S } = c;
        if (!S && (m === 'arrowup' || m === 'arrowdown'))
          return (c.eventSource = 'grid'), h.exec('hotkey', c), !1;
        if (m === 'enter') {
          const V = W?.getState().focusCell;
          if (V) {
            const { row: pe, column: me } = V;
            me === 'add-task'
              ? F(pe, 'add-task')
              : me === 'text' && F(pe, 'open-task');
          }
        }
      },
      [h, F, W],
    ),
    Ee = ne(null),
    De = () => {
      Ee.current = {
        setTableAPI: z,
        handleHotkey: Ce,
        sortVal: ie,
        api: h,
        adjustColumns: l,
        setColumnWidth: _e,
        tasks: N,
        calendarVal: j,
        durationUnitVal: de,
        splitTasksVal: te,
        onTableAPIChange: y,
      };
    };
  De(),
    se(() => {
      De();
    }, [z, Ce, ie, h, l, _e, N, j, de, te, y]);
  const We = I((c) => {
    z(c),
      c.intercept('hotkey', (m) => Ee.current.handleHotkey(m)),
      c.intercept('scroll', () => !1),
      c.intercept('select-row', () => !1),
      c.intercept('sort-rows', (m) => {
        const S = Ee.current.sortVal,
          { key: V, add: pe } = m,
          me = S ? S.find((Pe) => Pe.key === V) : null;
        let $e = 'asc';
        return (
          me && ($e = !me || me.order === 'asc' ? 'desc' : 'asc'),
          h.exec('sort-tasks', {
            key: V,
            order: $e,
            add: pe,
          }),
          !1
        );
      }),
      c.on('resize-column', () => {
        Ee.current.setColumnWidth(!0);
      }),
      c.on('hide-column', (m) => {
        m.mode || Ee.current.adjustColumns(), Ee.current.setColumnWidth();
      }),
      c.intercept('update-cell', (m) => {
        const { id: S, column: V, value: pe } = m,
          me = Ee.current.tasks.find(($e) => $e.id === S);
        if (me) {
          const $e = { ...me };
          let Pe = pe;
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
            h.exec('update-task', {
              id: S,
              task: $e,
            });
        }
        return !1;
      }),
      y && y(c);
  }, []);
  return /* @__PURE__ */ u('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${he}` },
    ref: q,
    children: /* @__PURE__ */ u('div', {
      ref: L,
      style: fe,
      className: 'wx-rHj6070p wx-table',
      onClick: A,
      onDoubleClick: _,
      children: /* @__PURE__ */ u(Tn, {
        init: We,
        sizes: {
          rowHeight: Y,
          headerHeight: (T ?? 0) - 1,
        },
        rowStyle: (c) =>
          c.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (c) =>
          `wx-rHj6070p wx-text-${c.align}${c.id === 'add-task' ? ' wx-action' : ''}`,
        data: ee,
        columns: He,
        selectedRows: [...O],
        sortMarks: Ge,
      }),
    }),
  });
}
function Nn({ borders: t = '', rowLayout: n = null }) {
  const s = Xe(Ue),
    i = X(s, 'cellWidth'),
    o = X(s, 'cellHeight'),
    R = ne(null),
    [E, y] = ge('#e4e4e4');
  se(() => {
    if (typeof getComputedStyle < 'u' && R.current) {
      const r = getComputedStyle(R.current).getPropertyValue(
        '--wx-gantt-border',
      );
      y(r ? r.substring(r.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const w = M(() => {
    if (!n) return null;
    const r = [];
    let g = 0;
    for (const B of n) (g += B.height), r.push(g);
    return r;
  }, [n]);
  if (!w) {
    const r = {
      width: '100%',
      height: '100%',
      background: i != null && o != null ? `url(${hn(i, o, E, t)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ u('div', { ref: R, style: r });
  }
  const H = i
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${i - 1}px, ${E} ${i - 1}px, ${E} ${i}px)`
    : void 0;
  return /* @__PURE__ */ Ae('div', {
    ref: R,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ u('div', {
        style: {
          width: '100%',
          height: '100%',
          background: H,
          position: 'absolute',
        },
      }),
      w.map((r, g) =>
        /* @__PURE__ */ u(
          'div',
          {
            style: {
              position: 'absolute',
              top: `${r}px`,
              width: '100%',
              height: '1px',
              backgroundColor: E,
            },
          },
          g,
        ),
      ),
    ],
  });
}
function In({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const i = Xe(Ue),
    o = X(i, '_links'),
    R = X(i, 'criticalPath'),
    E = ne(null),
    y = I(
      (w) => {
        const H = w?.target?.classList;
        !H?.contains('wx-line') && !H?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    se(() => {
      if (!s && n && E.current) {
        const w = (H) => {
          E.current && !E.current.contains(H.target) && y(H);
        };
        return (
          document.addEventListener('click', w),
          () => {
            document.removeEventListener('click', w);
          }
        );
      }
    }, [s, n, y]),
    /* @__PURE__ */ Ae('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (o || []).map((w) => {
          const H =
            'wx-dkx3NwEn wx-line' +
            (R && w.$critical ? ' wx-critical' : '') +
            (s ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ u(
            'polyline',
            {
              className: H,
              points: w.$p,
              onClick: () => !s && t(w.id),
              'data-link-id': w.id,
            },
            w.id,
          );
        }),
        !s &&
          n &&
          /* @__PURE__ */ u('polyline', {
            ref: E,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: n.$p,
          }),
      ],
    })
  );
}
function Hn(t) {
  const { task: n, type: s } = t;
  function i(R) {
    const E = n.segments[R];
    return {
      left: `${E.$x}px`,
      top: '0px',
      width: `${E.$w}px`,
      height: '100%',
    };
  }
  function o(R) {
    if (!n.progress) return 0;
    const E = (n.duration * n.progress) / 100,
      y = n.segments;
    let w = 0,
      H = 0,
      r = null;
    do {
      const g = y[H];
      H === R &&
        (w > E ? (r = 0) : (r = Math.min((E - w) / g.duration, 1) * 100)),
        (w += g.duration),
        H++;
    } while (r === null && H < y.length);
    return r || 0;
  }
  return /* @__PURE__ */ u('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((R, E) =>
      /* @__PURE__ */ Ae(
        'div',
        {
          className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
          'data-segment': E,
          style: i(E),
          children: [
            n.progress
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ u('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${o(E)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ u('div', {
              className: 'wx-content',
              children: R.text || '',
            }),
          ],
        },
        E,
      ),
    ),
  });
}
let dt = [],
  ft = null,
  Nt = null;
const It = (t, n, s, i) => t < i && n > s,
  Ht = (t, n) => {
    if (!n || !n.start) return null;
    const { start: s, lengthUnitWidth: i, lengthUnit: o } = n,
      R = 864e5,
      E =
        o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1,
      y = Math.floor(t / i),
      w = new Date(s.getTime() + y * E * R);
    return w.setUTCHours(0, 0, 0, 0), w;
  },
  An = (t, n, s) => {
    if (!s || !t || !n) return 0;
    const { lengthUnit: i } = s,
      E =
        (i === 'week'
          ? 7
          : i === 'month'
            ? 30
            : i === 'quarter'
              ? 91
              : i === 'year'
                ? 365
                : 1) * 864e5;
    return Math.round((t.getTime() - n.getTime()) / E);
  },
  Pn = (t, n, s) => {
    if (!s || !t) return t;
    const { lengthUnit: i } = s,
      E =
        (i === 'week'
          ? 7
          : i === 'month'
            ? 30
            : i === 'quarter'
              ? 91
              : i === 'year'
                ? 365
                : 1) * 864e5,
      y = new Date(t.getTime() + n * E);
    return y.setUTCHours(0, 0, 0, 0), y;
  };
function Gn(t) {
  const {
      readonly: n,
      taskTemplate: s,
      multiTaskRows: i = !1,
      rowMapping: o = null,
      rowHeightOverrides: R = null,
      allowTaskIntersection: E = !0,
      summaryBarCounts: y = !1,
      marqueeSelect: w = !1,
      copyPaste: H = !1,
    } = t,
    r = Xe(Ue),
    [g, B] = mt(r, '_tasks'),
    [W, z] = mt(r, '_links'),
    v = X(r, 'area'),
    D = X(r, '_scales'),
    h = X(r, 'taskTypes'),
    G = X(r, 'baselines'),
    Y = X(r, '_selected'),
    re = X(r, '_scrollTask'),
    U = X(r, 'criticalPath'),
    k = X(r, 'tasks'),
    we = X(r, 'schedule'),
    le = X(r, 'splitTasks'),
    xe = X(r, 'summary'),
    ie = M(() => {
      if (!v || !Array.isArray(g)) return [];
      const e = v.start ?? 0,
        a = v.end ?? 0;
      return i && o
        ? g.map((f) => ({ ...f }))
        : g.slice(e, a).map((f) => ({ ...f }));
    }, [B, v, i, o]),
    j = X(r, 'cellHeight'),
    de = M(() => {
      if (!i || !o || !ie.length) return ie;
      const e = /* @__PURE__ */ new Map(),
        a = [];
      g.forEach((C) => {
        const oe = o.taskRows.get(C.id) ?? C.id;
        e.has(oe) || (e.set(oe, a.length), a.push(oe));
      });
      const f = /* @__PURE__ */ new Map();
      ie.forEach((C) => {
        if (C.type === 'summary') return;
        const oe = o.taskRows.get(C.id) ?? C.id;
        f.has(oe) || f.set(oe, []), f.get(oe).push(C);
      });
      const d = /* @__PURE__ */ new Map(),
        x = /* @__PURE__ */ new Map();
      f.forEach((C, oe) => {
        const ae = [],
          Se = [...C].sort((ke, Ne) => (ke.$x ?? 0) - (Ne.$x ?? 0));
        for (const ke of Se) {
          const Ne = ke.$x ?? 0,
            Ve = Ne + (ke.$w ?? 0);
          let Oe = !1;
          for (let Ye = 0; Ye < ae.length; Ye++)
            if (
              !ae[Ye].some((je) => {
                const rt = je.$x ?? 0,
                  ut = rt + (je.$w ?? 0);
                return It(Ne, Ve, rt, ut);
              })
            ) {
              ae[Ye].push(ke), d.set(ke.id, Ye), (Oe = !0);
              break;
            }
          Oe || (ae.push([ke]), d.set(ke.id, ae.length - 1));
        }
        x.set(oe, ae.length);
      });
      const P = /* @__PURE__ */ new Map();
      let K = 0;
      for (const C of a) {
        P.set(C, K);
        const oe = (R && R[C]) || j;
        K += oe;
      }
      return ie.map((C) => {
        const oe = o.taskRows.get(C.id) ?? C.id,
          ae = P.get(oe) ?? 0;
        if (C.type === 'summary') {
          if ((f.get(oe) || []).length > 0) return { ...C, $y: ae, $skip: !0 };
          const Ye = (R && R[oe]) || j,
            Be = Math.max(0, Math.floor((Ye - C.$h) / 2));
          return {
            ...C,
            $y: ae + Be,
            $y_base: C.$y_base !== void 0 ? ae + Be : void 0,
          };
        }
        const Se = x.get(oe) || 1,
          ke = d.get(C.id) ?? 0;
        if (Se > 1) {
          const Be = C.$h + 4,
            je = ae + 3 + ke * Be;
          return {
            ...C,
            $y: je,
            $y_base: C.$y_base !== void 0 ? je : void 0,
          };
        }
        const Ne = (R && R[oe]) || j,
          Ve = Math.max(0, Math.round((Ne - C.$h) / 2));
        return {
          ...C,
          $y: ae + Ve,
          $y_base: C.$y_base !== void 0 ? ae + Ve : void 0,
        };
      });
    }, [ie, i, o, g, j, R]),
    te = M(() => D.lengthUnitWidth, [D]),
    Q = M(() => D.lengthUnit || 'day', [D]),
    J = M(() => {
      const e = /* @__PURE__ */ new Set();
      if (E || !i || !o) return e;
      const a = /* @__PURE__ */ new Map();
      return (
        g.forEach((f) => {
          if (f.type === 'summary' || f.type === 'milestone') return;
          const d = o.taskRows.get(f.id) ?? f.id;
          a.has(d) || a.set(d, []), a.get(d).push(f);
        }),
        a.forEach((f) => {
          if (!(f.length < 2))
            for (let d = 0; d < f.length; d++)
              for (let x = d + 1; x < f.length; x++) {
                const P = f[d],
                  K = f[x];
                It(P.$x, P.$x + P.$w, K.$x, K.$x + K.$w) &&
                  (e.add(P.id), e.add(K.id));
              }
        }),
        e
      );
    }, [E, i, o, g, B]),
    N = M(() => {
      if (!y || !g?.length || !te) return null;
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Set();
      g.forEach((d) => {
        d.type === 'summary' && a.add(d.id),
          d.parent &&
            d.parent !== 0 &&
            d.type !== 'summary' &&
            (e.has(d.parent) || e.set(d.parent, []), e.get(d.parent).push(d));
      });
      const f = /* @__PURE__ */ new Map();
      return (
        a.forEach((d) => {
          const x = e.get(d);
          if (!x?.length) return;
          const P = /* @__PURE__ */ new Map();
          x.forEach((K) => {
            if (K.$x == null || K.$w == null) return;
            const C = Math.floor(K.$x / te),
              oe = Math.ceil((K.$x + K.$w) / te);
            for (let ae = C; ae < oe; ae++) P.set(ae, (P.get(ae) || 0) + 1);
          }),
            P.size > 0 && f.set(d, P);
        }),
        f
      );
    }, [y, g, te]),
    [F, A] = ge(null),
    L = ne(null),
    [q, ye] = ge(null),
    [ue, Me] = ge(null),
    [Te, Ie] = ge(null),
    ve = ne(null);
  ve.current = Te;
  const p = ne(0),
    T = ne(!1),
    [$, fe] = ge(void 0),
    [ee, Z] = ge(null),
    he = ne(null),
    [Ge, ze] = ge(null),
    Re = M(
      () =>
        Ge && {
          ...W.find((e) => e.id === Ge),
        },
      [Ge, z],
    ),
    [He, _e] = ge(void 0),
    l = ne(null),
    [_, O] = ge(0),
    b = ne(null),
    Le = M(() => {
      const e = b.current;
      return !!(Y.length && e && e.contains(document.activeElement));
    }, [Y, b.current]),
    ce = M(() => Le && Y[Y.length - 1]?.id, [Le, Y]);
  se(() => {
    if (re && Le && re) {
      const { id: e } = re,
        a = b.current?.querySelector(`.wx-bar[data-id='${e}']`);
      a && a.focus({ preventScroll: !0 });
    }
  }, [re]),
    se(() => {
      const e = b.current;
      if (e && (O(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const a = new ResizeObserver((f) => {
          f[0] && O(f[0].contentRect.width);
        });
        return a.observe(e), () => a.disconnect();
      }
    }, [b.current]);
  const be = I(() => {
      document.body.style.userSelect = 'none';
    }, []),
    Ce = I(() => {
      document.body.style.userSelect = '';
    }, []),
    Ee = M(() => {
      if (!i || !o || !g?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        g.forEach((d) => {
          const x = o.taskRows.get(d.id) ?? d.id;
          a.has(x) || (a.set(x, f.length), f.push(x));
        }),
        g.forEach((d) => {
          const x = o.taskRows.get(d.id) ?? d.id,
            P = a.get(x) ?? 0;
          e.set(d.id, P * j);
        }),
        e
      );
    }, [g, i, o, j]),
    De = M(() => {
      if (!i || !o || !g?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        g.forEach((d) => {
          const x = o.taskRows.get(d.id) ?? d.id;
          a.has(x) || (a.set(x, f.length), f.push(x));
        }),
        g.forEach((d) => {
          const x = d.row ?? d.id;
          if (!e.has(x)) {
            const P = o.taskRows.get(d.id) ?? d.id,
              K = a.get(P) ?? 0;
            e.set(x, K * j);
          }
        }),
        e
      );
    }, [g, i, o, j]),
    We = I(
      (e) => {
        if (!b.current) return [];
        const a = Math.min(e.startX, e.currentX),
          f = Math.max(e.startX, e.currentX),
          d = Math.min(e.startY, e.currentY),
          x = Math.max(e.startY, e.currentY);
        return g.filter((P) => {
          const K = P.$x,
            C = P.$x + P.$w,
            ae = Ee.get(P.id) ?? P.$y,
            Se = ae + P.$h;
          return K < f && C > a && ae < x && Se > d;
        });
      },
      [g, Ee],
    ),
    c = I(() => {
      if (!H) return;
      const e = r.getState()._selected;
      if (!e || !e.length) return;
      const a = 864e5,
        f = e
          .map((C) => {
            if (!r.getTask(C.id)) return null;
            const ae = g.find((ut) => ut.id === C.id);
            if (!ae) return null;
            const {
                $x: Se,
                $y: ke,
                $h: Ne,
                $w: Ve,
                $skip: Oe,
                $level: Ye,
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
              _originalHeight: Ne,
            };
          })
          .filter(Boolean);
      if (!f.length) return;
      const x = f[0].parent,
        P = f.filter((C) => C.parent === x);
      if (P.length === 0) return;
      const K = P.reduce(
        (C, oe) => (oe.start && (!C || oe.start < C) ? oe.start : C),
        null,
      );
      (dt = P.map((C) => ({
        ...C,
        _startCellOffset: An(C.start, K, D),
      }))),
        (Nt = x),
        (ft = K);
    }, [H, r, g, D]),
    m = I(
      (e, a, f) => {
        if (!a.length || !e || f == null) return;
        const d = 864e5,
          x = r.getHistory();
        x?.startBatch();
        const P = new Date(e);
        P.setUTCHours(0, 0, 0, 0),
          a.forEach((K, C) => {
            const oe = `task-${Date.now()}-${C}`,
              ae = Pn(P, K._startCellOffset || 0, D),
              Se = new Date(ae.getTime() + (K._startDayOfWeek || 0) * d);
            Se.setUTCHours(0, 0, 0, 0);
            const ke = new Date(Se.getTime() + (K._durationDays || 7) * d);
            ke.setUTCHours(0, 0, 0, 0),
              r.exec('add-task', {
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
                skipUndo: C > 0,
              });
          }),
          x?.endBatch();
      },
      [r, D],
    );
  se(
    () =>
      H
        ? r.intercept('hotkey', (a) => {
            if (a.key === 'ctrl+c' || a.key === 'meta+c') return c(), !1;
            if (a.key === 'ctrl+v' || a.key === 'meta+v')
              return (
                !dt.length ||
                  !ft ||
                  Me({
                    tasks: dt,
                    baseDate: ft,
                    parent: Nt,
                    currentX: p.current,
                  }),
                !1
              );
          })
        : void 0,
    [H, r, c],
  ),
    se(() => {
      if (!ue) return;
      const e = (a) => {
        a.key === 'Escape' &&
          (a.preventDefault(), a.stopPropagation(), Me(null));
      };
      return (
        document.addEventListener('keydown', e, !0),
        () => document.removeEventListener('keydown', e, !0)
      );
    }, [ue]);
  const S = I(
      (e, a, f) => {
        if (
          a.target.classList.contains('wx-line') ||
          (f || (f = r.getTask(Qe(e))),
          f.type === 'milestone' || f.type === 'summary')
        )
          return '';
        const d = Fe(a, 'data-segment');
        d && (e = d);
        const { left: x, width: P } = e.getBoundingClientRect(),
          K = (a.clientX - x) / P;
        let C = 0.2 / (P > 200 ? P / 200 : 1);
        return K < C ? 'start' : K > 1 - C ? 'end' : '';
      },
      [r],
    ),
    V = I(
      (e, a) => {
        const { clientX: f } = a,
          d = Qe(e),
          x = r.getTask(d),
          P = a.target.classList;
        if (
          !a.target.closest('.wx-delete-button') &&
          !a.target.closest('[data-interactive]') &&
          !n
        ) {
          if (P.contains('wx-progress-marker')) {
            const { progress: K } = r.getTask(d);
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
            const K = S(e, a, x) || 'move',
              C = {
                id: d,
                mode: K,
                x: f,
                dx: 0,
                l: x.$x,
                w: x.$w,
              };
            if (le && x.segments?.length) {
              const oe = Fe(a, 'data-segment');
              oe && ((C.segmentIndex = oe.dataset.segment * 1), mn(x, C));
            }
            Z(C);
          }
          be();
        }
      },
      [r, n, S, be, le],
    ),
    pe = I(
      (e) => {
        if (e.button !== 0 || ue) return;
        const a = Fe(e);
        if (!a && w && !n) {
          const f = b.current;
          if (!f) return;
          const d = f.getBoundingClientRect(),
            x = e.clientX - d.left,
            P = e.clientY - d.top;
          if (H) {
            const C = Ht(x, D);
            C && ((ve.current = C), Ie(C));
          }
          const K = {
            startX: x,
            startY: P,
            currentX: x,
            currentY: P,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          A(K), (L.current = K), be();
          return;
        }
        if (a && w && !n && Y.length > 1) {
          const f = Qe(a);
          if (Y.some((x) => x.id === f)) {
            ye({
              startX: e.clientX,
              ids: Y.map((x) => x.id),
              tasks: Y.map((x) => {
                const P = r.getTask(x.id);
                return {
                  id: x.id,
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
      [V, w, H, n, ue, D, Y, r, be],
    ),
    me = I(
      (e) => {
        const a = Fe(e);
        a &&
          (l.current = setTimeout(() => {
            _e(!0), V(a, e.touches[0]);
          }, 300));
      },
      [V],
    ),
    $e = I((e) => {
      ze(e);
    }, []),
    Pe = I(() => {
      const e = L.current;
      if (e) {
        const a = We(e);
        e.ctrlKey
          ? a.forEach((f) => {
              r.exec('select-task', { id: f.id, toggle: !0, marquee: !0 });
            })
          : (Y.length > 0 && r.exec('select-task', { id: null, marquee: !0 }),
            a.forEach((f, d) => {
              r.exec('select-task', {
                id: f.id,
                toggle: d > 0,
                marquee: !0,
              });
            })),
          A(null),
          (L.current = null),
          Ce(),
          (T.current = !0);
        return;
      }
      if (q) {
        const { ids: a, tasks: f, startX: d } = q;
        ye(null), Ce(), (T.current = !0);
        return;
      }
      if (he.current) {
        const { dx: a, id: f, marker: d, value: x } = he.current;
        (he.current = null),
          typeof x < 'u' &&
            a &&
            r.exec('update-task', {
              id: f,
              task: { progress: x },
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
          l: x,
          w: P,
          start: K,
          segment: C,
          index: oe,
        } = ee;
        if ((Z(null), K)) {
          const ae = Math.round(d / te);
          if (!ae)
            r.exec('drag-task', {
              id: a,
              width: P,
              left: x,
              inProgress: !1,
              ...(C && { segmentIndex: oe }),
            });
          else {
            let Se = {},
              ke = r.getTask(a);
            C && (ke = ke.segments[oe]);
            const Ne = 1440 * 60 * 1e3,
              Oe =
                ae *
                (Q === 'week'
                  ? 7
                  : Q === 'month'
                    ? 30
                    : Q === 'quarter'
                      ? 91
                      : Q === 'year'
                        ? 365
                        : 1) *
                Ne;
            f === 'move'
              ? ((Se.start = new Date(ke.start.getTime() + Oe)),
                (Se.end = new Date(ke.end.getTime() + Oe)))
              : f === 'start'
                ? ((Se.start = new Date(ke.start.getTime() + Oe)),
                  (Se.end = ke.end))
                : f === 'end' &&
                  ((Se.start = ke.start),
                  (Se.end = new Date(ke.end.getTime() + Oe))),
              r.exec('update-task', {
                id: a,
                task: Se,
                ...(C && { segmentIndex: oe }),
              });
          }
          T.current = !0;
        }
        Ce();
      }
    }, [r, Ce, ee, te, Q]),
    tt = I(
      (e, a) => {
        const { clientX: f } = a;
        if (H && b.current) {
          const d = b.current.getBoundingClientRect();
          p.current = f - d.left;
        }
        if (ue && b.current) {
          const d = b.current.getBoundingClientRect();
          Me((x) => (x ? { ...x, currentX: f - d.left } : null));
        }
        if (F) {
          const d = b.current;
          if (!d) return;
          const x = d.getBoundingClientRect(),
            P = f - x.left,
            K = a.clientY - x.top;
          A((C) => ({
            ...C,
            currentX: P,
            currentY: K,
          })),
            L.current && ((L.current.currentX = P), (L.current.currentY = K));
          return;
        }
        if (!n)
          if (he.current) {
            const { node: d, x, id: P } = he.current,
              K = (he.current.dx = f - x),
              C = Math.round((K / d.offsetWidth) * 100);
            let oe = he.current.progress + C;
            (he.current.value = oe = Math.min(Math.max(0, oe), 100)),
              r.exec('update-task', {
                id: P,
                task: { progress: oe },
                inProgress: !0,
              });
          } else if (ee) {
            $e(null);
            const {
                mode: d,
                l: x,
                w: P,
                x: K,
                id: C,
                start: oe,
                segment: ae,
                index: Se,
              } = ee,
              ke = r.getTask(C),
              Ne = f - K,
              Ve = Math.round(te) || 1;
            if (
              (!oe && Math.abs(Ne) < 20) ||
              (d === 'start' && P - Ne < Ve) ||
              (d === 'end' && P + Ne < Ve) ||
              (d === 'move' &&
                ((Ne < 0 && x + Ne < 0) || (Ne > 0 && x + P + Ne > _))) ||
              (ee.segment && !gn(ke, ee))
            )
              return;
            const Oe = { ...ee, dx: Ne };
            let Ye, Be;
            if (
              (d === 'start'
                ? ((Ye = x + Ne), (Be = P - Ne))
                : d === 'end'
                  ? ((Ye = x), (Be = P + Ne))
                  : d === 'move' && ((Ye = x + Ne), (Be = P)),
              r.exec('drag-task', {
                id: C,
                width: Be,
                left: Ye,
                inProgress: !0,
                start: oe,
                ...(ae && { segmentIndex: Se }),
              }),
              !Oe.start &&
                ((d === 'move' && ke.$x == x) || (d !== 'move' && ke.$w == P)))
            ) {
              (T.current = !0), Pe();
              return;
            }
            (Oe.start = !0), Z(Oe);
          } else {
            const d = Fe(e);
            if (d) {
              const x = r.getTask(Qe(d)),
                K = Fe(e, 'data-segment') || d,
                C = S(K, a, x);
              K.style.cursor = C && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [r, n, ee, te, _, S, $e, Pe],
    ),
    Xt = I(
      (e) => {
        tt(e, e);
      },
      [tt],
    ),
    Bt = I(
      (e) => {
        He
          ? (e.preventDefault(), tt(e, e.touches[0]))
          : l.current && (clearTimeout(l.current), (l.current = null));
      },
      [He, tt],
    ),
    ct = I(() => {
      Pe();
    }, [Pe]),
    Kt = I(() => {
      _e(null),
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
  const Vt = I(
      (e) => {
        if (!n) {
          if (e.target.closest('[data-interactive]')) return;
          const a = Ze(e.target);
          if (a && !e.target.classList.contains('wx-link')) {
            const f = Ze(e.target, 'data-segment');
            r.exec('show-editor', {
              id: a,
              ...(f !== null && { segmentIndex: f }),
            });
          }
        }
      },
      [r, n],
    ),
    Ft = ['e2s', 's2s', 'e2e', 's2e'],
    nt = I((e, a) => Ft[(e ? 1 : 0) + (a ? 0 : 2)], []),
    st = I(
      (e, a) => {
        const f = $.id,
          d = $.start;
        return e === f
          ? !0
          : !!W.find(
              (x) => x.target == e && x.source == f && x.type === nt(d, a),
            );
      },
      [$, z, nt],
    ),
    wt = I(() => {
      $ && fe(null);
    }, [$]),
    qt = I(
      (e) => {
        if (T.current) {
          T.current = !1;
          return;
        }
        if (ue && ue.currentX != null) {
          const f = Ht(ue.currentX, D);
          f && m(f, ue.tasks, ue.parent), Me(null);
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const a = Ze(e.target);
        if (a) {
          const f = e.target.classList;
          if (f.contains('wx-link')) {
            const d = f.contains('wx-left');
            if (!$) {
              fe({ id: a, start: d });
              return;
            }
            $.id !== a &&
              !st(a, d) &&
              r.exec('add-link', {
                link: {
                  source: $.id,
                  target: a,
                  type: nt($.start, d),
                },
              });
          } else if (f.contains('wx-delete-button-icon'))
            r.exec('delete-link', { id: Ge }), ze(null);
          else {
            let d;
            const x = Fe(e, 'data-segment');
            x && (d = x.dataset.segment * 1),
              r.exec('select-task', {
                id: a,
                toggle: e.ctrlKey || e.metaKey,
                range: e.shiftKey,
                segmentIndex: d,
              });
          }
        }
        wt();
      },
      [r, $, z, Re, st, nt, wt],
    ),
    Ut = I((e) => {
      const a = {
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      };
      return e.color && (a.backgroundColor = e.color), a;
    }, []),
    jt = I(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    Qt = I(
      (e) => {
        if (He || l.current) return e.preventDefault(), !1;
      },
      [He],
    ),
    pt = M(() => h.map((e) => e.id), [h]),
    xt = I(
      (e) => {
        let a = pt.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (a = `task ${a}`), a
        );
      },
      [pt],
    ),
    yt = I(
      (e) => {
        r.exec(e.action, e.data);
      },
      [r],
    ),
    at = I((e) => U && k.byId(e).$critical, [U, k]),
    vt = I(
      (e) => {
        if (we?.auto) {
          const a = k.getSummaryId(e, !0),
            f = k.getSummaryId($.id, !0);
          return (
            $?.id &&
            !(Array.isArray(a) ? a : [a]).includes($.id) &&
            !(Array.isArray(f) ? f : [f]).includes(e)
          );
        }
        return $;
      },
      [we, k, $],
    );
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${de.length ? de[0].$h : 0}px` },
    ref: b,
    onContextMenu: Qt,
    onMouseDown: pe,
    onMouseMove: Xt,
    onTouchStart: me,
    onTouchMove: Bt,
    onTouchEnd: Kt,
    onClick: qt,
    onDoubleClick: Vt,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ u(In, {
        onSelectLink: $e,
        selectedLink: Re,
        readonly: n,
      }),
      de.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const a = J.has(e.id),
          f =
            `wx-bar wx-${xt(e.type)}` +
            (He && ee && e.id === ee.id ? ' wx-touch' : '') +
            ($ && $.id === e.id ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (le && e.segments ? ' wx-split' : '') +
            (a ? ' wx-collision' : ''),
          d =
            'wx-link wx-left' +
            ($ ? ' wx-visible' : '') +
            (!$ || (!st(e.id, !0) && vt(e.id)) ? ' wx-target' : '') +
            ($ && $.id === e.id && $.start ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : ''),
          x =
            'wx-link wx-right' +
            ($ ? ' wx-visible' : '') +
            (!$ || (!st(e.id, !1) && vt(e.id)) ? ' wx-target' : '') +
            ($ && $.id === e.id && !$.start ? ' wx-selected' : '') +
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
                            !(e.type == 'summary' && xe?.autoProgress)
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${e.progress}% - 10px)`,
                                  },
                                  children: e.progress,
                                })
                              : null,
                            s
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ u(s, {
                                    data: e,
                                    api: r,
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
                            s
                              ? /* @__PURE__ */ u(s, {
                                  data: e,
                                  api: r,
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
                            className: 'wx-GKbcLEGA ' + x,
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
                    N &&
                      e.type === 'summary' &&
                      (() => {
                        const P = N.get(e.id),
                          K = Math.floor(e.$x / te),
                          C = Math.ceil((e.$x + e.$w) / te);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: C - K }, (oe, ae) => {
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
              G && !e.$skip_baseline
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
      ue &&
        ue.currentX != null &&
        ue.tasks.map((e, a) => {
          const d =
              (Math.floor(ue.currentX / te) + (e._startCellOffset || 0)) * te,
            x = e._originalWidth || te,
            P = e._originalHeight || j,
            K = De.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: d, top: K, width: x, height: P },
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
function _n(t) {
  const { highlightTime: n, onScaleClick: s } = t,
    i = Xe(Ue),
    o = X(i, '_scales');
  return /* @__PURE__ */ u('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: o.width },
    children: (o?.rows || []).map((R, E) =>
      /* @__PURE__ */ u(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${R.height}px` },
          children: (R.cells || []).map((y, w) => {
            const H = n ? n(y.date, y.unit) : '',
              r = 'wx-cell ' + (y.css || '') + ' ' + (H || '');
            return /* @__PURE__ */ u(
              'div',
              {
                className: 'wx-ZkvhDKir ' + r,
                style: {
                  width: `${y.width}px`,
                  cursor: s ? 'pointer' : void 0,
                },
                onClick: s ? (g) => s(y.date, y.unit, g.nativeEvent) : void 0,
                children: y.value,
              },
              w,
            );
          }),
        },
        E,
      ),
    ),
  });
}
const zn = /* @__PURE__ */ new Map();
function Wn(t) {
  const n = ne(null),
    s = ne(0),
    i = ne(null),
    o = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    s.current++,
    se(() => {
      if (o)
        return (
          cancelAnimationFrame(i.current),
          (i.current = requestAnimationFrame(() => {
            const R = {
              label: t,
              time: performance.now() - n.current,
              renders: s.current,
              timestamp: Date.now(),
            };
            zn.set(t, R),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: R }),
              );
          })),
          () => cancelAnimationFrame(i.current)
        );
    });
}
function On(t) {
  const {
      readonly: n,
      fullWidth: s,
      fullHeight: i,
      taskTemplate: o,
      cellBorders: R,
      highlightTime: E,
      onScaleClick: y,
      multiTaskRows: w = !1,
      rowMapping: H = null,
      rowHeightOverrides: r = null,
      allowTaskIntersection: g = !0,
      summaryBarCounts: B = !1,
      marqueeSelect: W = !1,
      copyPaste: z = !1,
    } = t,
    v = Xe(Ue),
    [D, h] = mt(v, '_selected'),
    G = X(v, 'scrollTop'),
    Y = X(v, 'cellHeight'),
    re = X(v, 'cellWidth'),
    U = X(v, '_scales'),
    k = X(v, '_markers'),
    we = X(v, '_scrollTask'),
    le = X(v, 'zoom'),
    [xe, ie] = ge(),
    j = ne(null),
    de = X(v, '_tasks'),
    te = 1 + (U?.rows?.length || 0),
    Q = M(() => {
      if (!w || !H || !de?.length) return null;
      const p = /* @__PURE__ */ new Map(),
        T = /* @__PURE__ */ new Map(),
        $ = [];
      return (
        de.forEach((fe) => {
          const ee = H.taskRows.get(fe.id) ?? fe.id;
          T.has(ee) || (T.set(ee, $.length), $.push(ee));
        }),
        de.forEach((fe) => {
          const ee = H.taskRows.get(fe.id) ?? fe.id,
            Z = T.get(ee) ?? 0;
          p.set(fe.id, Z * Y);
        }),
        p
      );
    }, [de, w, H, Y]),
    J = M(() => {
      const p = [];
      return (
        D &&
          D.length &&
          Y &&
          D.forEach((T) => {
            const $ = Q?.get(T.id) ?? T.$y;
            p.push({ height: `${Y}px`, top: `${$ - 3}px` });
          }),
        p
      );
    }, [h, Y, Q]),
    N = M(() => Math.max(xe || 0, i), [xe, i]),
    F = M(() => {
      if (
        !r ||
        !w ||
        !H ||
        !de?.length ||
        !Object.values(r).some(($) => $ !== Y)
      )
        return null;
      const T = [];
      return (
        de.forEach(($) => {
          const fe = H.taskRows.get($.id) ?? $.id;
          T.includes(fe) || T.push(fe);
        }),
        T.map(($) => ({
          id: $,
          height: r[$] || Y,
        }))
      );
    }, [de, H, r, w, Y]);
  se(() => {
    const p = j.current;
    p && typeof G == 'number' && (p.scrollTop = w ? 0 : G);
  }, [G, w]);
  const A = () => {
    L();
  };
  function L(p) {
    const T = j.current;
    if (!T) return;
    const $ = {};
    ($.left = T.scrollLeft), v.exec('scroll-chart', $);
  }
  function q() {
    const p = j.current,
      $ = Math.ceil((xe || 0) / (Y || 1)) + 1,
      fe = Math.floor(((p && p.scrollTop) || 0) / (Y || 1)),
      ee = Math.max(0, fe - te),
      Z = fe + $ + te,
      he = ee * (Y || 0);
    v.exec('render-data', {
      start: ee,
      end: Z,
      from: he,
    });
  }
  se(() => {
    q();
  }, [xe, G]);
  const ye = I(
    (p) => {
      if (!p) return;
      const { id: T, mode: $ } = p;
      if ($.toString().indexOf('x') < 0) return;
      const fe = j.current;
      if (!fe) return;
      const { clientWidth: ee } = fe,
        Z = v.getTask(T);
      if (Z.$x + Z.$w < fe.scrollLeft)
        v.exec('scroll-chart', { left: Z.$x - (re || 0) }),
          (fe.scrollLeft = Z.$x - (re || 0));
      else if (Z.$x >= ee + fe.scrollLeft) {
        const he = ee < Z.$w ? re || 0 : Z.$w;
        v.exec('scroll-chart', { left: Z.$x - ee + he }),
          (fe.scrollLeft = Z.$x - ee + he);
      }
    },
    [v, re],
  );
  se(() => {
    ye(we);
  }, [we]);
  function ue(p) {
    if (le && (p.ctrlKey || p.metaKey)) {
      p.preventDefault();
      const T = j.current,
        $ = -Math.sign(p.deltaY),
        fe = p.clientX - (T ? T.getBoundingClientRect().left : 0);
      v.exec('zoom-scale', {
        dir: $,
        offset: fe,
      });
    }
  }
  function Me(p) {
    const T = E(p.date, p.unit);
    return T
      ? {
          css: T,
          width: p.width,
        }
      : null;
  }
  const Te = M(
      () =>
        U && (U.minUnit === 'hour' || U.minUnit === 'day') && E
          ? U.rows[U.rows.length - 1].cells.map(Me)
          : null,
      [U, E],
    ),
    Ie = I(
      (p) => {
        (p.eventSource = 'chart'), v.exec('hotkey', p);
      },
      [v],
    );
  se(() => {
    const p = j.current;
    if (!p) return;
    const T = () => ie(p.clientHeight);
    T();
    const $ = new ResizeObserver(() => T());
    return (
      $.observe(p),
      () => {
        $.disconnect();
      }
    );
  }, [j.current]);
  const ve = ne(null);
  return (
    se(() => {
      const p = j.current;
      if (p && !ve.current)
        return (
          (ve.current = Wt(p, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (T) => Ie(T),
          })),
          () => {
            ve.current?.destroy(), (ve.current = null);
          }
        );
    }, []),
    se(() => {
      const p = j.current;
      if (!p) return;
      const T = ue;
      return (
        p.addEventListener('wheel', T),
        () => {
          p.removeEventListener('wheel', T);
        }
      );
    }, [ue]),
    Wn('chart'),
    /* @__PURE__ */ Ae('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: j,
      onScroll: A,
      children: [
        /* @__PURE__ */ u(_n, { highlightTime: E, onScaleClick: y, scales: U }),
        k && k.length
          ? /* @__PURE__ */ u('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${N}px` },
              children: k.map((p, T) =>
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
          style: { width: `${s}px`, height: `${N}px` },
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
            /* @__PURE__ */ u(Nn, { borders: R, rowLayout: F }),
            D && D.length
              ? D.map((p, T) =>
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
              multiTaskRows: w,
              rowMapping: H,
              rowHeightOverrides: r,
              allowTaskIntersection: g,
              summaryBarCounts: B,
              marqueeSelect: W,
              copyPaste: z,
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
      size: s = 4,
      dir: i = 'x',
      onMove: o,
      onDisplayChange: R,
      compactMode: E,
      containerWidth: y = 0,
      leftThreshold: w = 50,
      rightThreshold: H = 50,
    } = t,
    [r, g] = ht(t.value ?? 0),
    [B, W] = ht(t.display ?? 'all');
  function z(A) {
    let L = 0;
    n == 'center' ? (L = s / 2) : n == 'before' && (L = s);
    const q = {
      size: [s + 'px', 'auto'],
      p: [A - L + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (i != 'x') for (let ye in q) q[ye] = q[ye].reverse();
    return q;
  }
  const [v, D] = ge(!1),
    [h, G] = ge(null),
    Y = ne(0),
    re = ne(),
    U = ne(),
    k = ne(B);
  se(() => {
    k.current = B;
  }, [B]),
    se(() => {
      h === null && r > 0 && G(r);
    }, [h, r]);
  function we(A) {
    return i == 'x' ? A.clientX : A.clientY;
  }
  const le = I(
      (A) => {
        const L = re.current + we(A) - Y.current;
        g(L);
        let q;
        L <= w ? (q = 'chart') : y - L <= H ? (q = 'grid') : (q = 'all'),
          k.current !== q && (W(q), (k.current = q)),
          U.current && clearTimeout(U.current),
          (U.current = setTimeout(() => o && o(L), 100));
      },
      [y, w, H, o],
    ),
    xe = I(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        D(!1),
        window.removeEventListener('mousemove', le),
        window.removeEventListener('mouseup', xe);
    }, [le]),
    ie = M(
      () => (B !== 'all' ? 'auto' : i == 'x' ? 'ew-resize' : 'ns-resize'),
      [B, i],
    ),
    j = I(
      (A) => {
        (!E && (B === 'grid' || B === 'chart')) ||
          ((Y.current = we(A)),
          (re.current = r),
          D(!0),
          (document.body.style.cursor = ie),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', le),
          window.addEventListener('mouseup', xe));
      },
      [ie, le, xe, r, E, B],
    );
  function de() {
    W('all'), h !== null && (g(h), o && o(h));
  }
  function te(A) {
    if (E) {
      const L = B === 'chart' ? 'grid' : 'chart';
      W(L), R(L);
    } else if (B === 'grid' || B === 'chart') de(), R('all');
    else {
      const L = A === 'left' ? 'chart' : 'grid';
      W(L), R(L);
    }
  }
  function Q() {
    te('left');
  }
  function J() {
    te('right');
  }
  const N = M(() => z(r), [r, n, s, i]),
    F = [
      'wx-resizer',
      `wx-resizer-${i}`,
      `wx-resizer-display-${B}`,
      v ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-pFykzMlT ' + F,
    onMouseDown: j,
    style: { width: N.size[0], height: N.size[1], cursor: ie },
    children: [
      /* @__PURE__ */ Ae('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: Q,
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
  function s() {
    (n = new ResizeObserver((o) => {
      for (let R of o)
        if (R.target === document.body) {
          let E = R.contentRect.width <= Xn;
          t(E);
        }
    })),
      n.observe(document.body);
  }
  function i() {
    n && (n.disconnect(), (n = null));
  }
  return {
    observe: s,
    disconnect: i,
  };
}
function Bn(t) {
  const {
      taskTemplate: n,
      readonly: s,
      cellBorders: i,
      highlightTime: o,
      onScaleClick: R,
      onTableAPIChange: E,
      multiTaskRows: y = !1,
      rowMapping: w = null,
      rowHeightOverrides: H = null,
      allowTaskIntersection: r = !0,
      summaryBarCounts: g = !1,
      marqueeSelect: B = !1,
      copyPaste: W = !1,
    } = t,
    z = Xe(Ue),
    v = X(z, '_tasks'),
    D = X(z, '_scales'),
    h = X(z, 'cellHeight'),
    G = X(z, 'columns'),
    Y = X(z, '_scrollTask'),
    re = X(z, 'undo'),
    U = M(() => {
      if (!y) return w;
      const l = /* @__PURE__ */ new Map(),
        _ = /* @__PURE__ */ new Map();
      return (
        v.forEach((O) => {
          const b = O.row ?? O.id;
          _.set(O.id, b), l.has(b) || l.set(b, []), l.get(b).push(O.id);
        }),
        { rowMap: l, taskRows: _ }
      );
    }, [v, y, w]),
    [k, we] = ge(!1);
  let [le, xe] = ge(0);
  const [ie, j] = ge(0),
    [de, te] = ge(0),
    [Q, J] = ge(void 0),
    [N, F] = ge('all'),
    A = ne(null),
    L = I(
      (l) => {
        we(
          (_) => (
            l !== _ &&
              (l
                ? ((A.current = N), N === 'all' && F('grid'))
                : (!A.current || A.current === 'all') && F('all')),
            l
          ),
        );
      },
      [N],
    );
  se(() => {
    const l = Ot(L);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [L]);
  const q = M(() => {
    let l;
    return (
      G.every((_) => _.width && !_.flexgrow)
        ? (l = G.reduce((_, O) => _ + parseInt(O.width), 0))
        : k && N === 'chart'
          ? (l = parseInt(G.find((_) => _.id === 'action')?.width) || 50)
          : (l = 440),
      (le = l),
      l
    );
  }, [G, k, N]);
  se(() => {
    xe(q);
  }, [q]);
  const ye = M(() => (ie ?? 0) - (Q ?? 0), [ie, Q]),
    ue = M(() => D.width, [D]),
    Me = 14,
    Te = M(() => {
      let l;
      if (!y || !U) l = v.length * h;
      else {
        const _ = [];
        v.forEach((O) => {
          const b = U.taskRows.get(O.id) ?? O.id;
          _.includes(b) || _.push(b);
        }),
          (l = 0);
        for (const O of _) l += (H && H[O]) || h;
      }
      return l + Me;
    }, [v, h, y, U, H]),
    Ie = M(() => D.height + Te + ye, [D, Te, ye]),
    ve = M(() => le + ue, [le, ue]),
    p = ne(null),
    T = ne(!1),
    $ = ne(null);
  se(() => {
    const l = () => {
      (T.current = !0),
        clearTimeout($.current),
        ($.current = setTimeout(() => {
          T.current = !1;
        }, 300));
    };
    return (
      z.on('zoom-scale', l),
      z.on('set-scale', l),
      () => {
        clearTimeout($.current);
      }
    );
  }, [z]);
  const fe = I(() => {
      Promise.resolve().then(() => {
        if (!T.current && (ie ?? 0) > (ve ?? 0)) {
          const l = (ie ?? 0) - le;
          z.exec('expand-scale', { minWidth: l });
        }
      });
    }, [ie, ve, le, z]),
    ee = ne(fe);
  (ee.current = fe),
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
  const Z = ne(null),
    he = ne(null),
    Ge = I(() => {
      const l = Z.current;
      l &&
        z.exec('scroll-chart', {
          top: l.scrollTop,
        });
    }, [z]),
    ze = ne({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  se(() => {
    ze.current = {
      rTasks: v,
      rScales: D,
      rCellHeight: h,
      scrollSize: ye,
      ganttDiv: Z.current,
      ganttHeight: de ?? 0,
    };
  }, [v, D, h, ye, de]);
  const Re = I(
    (l) => {
      if (!l) return;
      const {
        rTasks: _,
        rScales: O,
        rCellHeight: b,
        scrollSize: Le,
        ganttDiv: ce,
        ganttHeight: be,
      } = ze.current;
      if (!ce) return;
      const { id: Ce } = l,
        Ee = _.findIndex((De) => De.id === Ce);
      if (Ee > -1) {
        const De = be - O.height,
          We = Ee * b,
          c = ce.scrollTop;
        let m = null;
        We < c ? (m = We) : We + b > c + De && (m = We - De + b + Le),
          m !== null &&
            (z.exec('scroll-chart', { top: Math.max(m, 0) }),
            (Z.current.scrollTop = Math.max(m, 0)));
      }
    },
    [z],
  );
  se(() => {
    Re(Y);
  }, [Y]),
    se(() => {
      const l = Z.current,
        _ = he.current;
      if (!l || !_) return;
      const O = () => {
          Cn(() => {
            te(l.offsetHeight), j(l.offsetWidth), J(_.offsetWidth);
          });
        },
        b = new ResizeObserver(O);
      return b.observe(l), () => b.disconnect();
    }, [Z.current]);
  const He = ne(null),
    _e = ne(null);
  return (
    se(() => {
      _e.current && (_e.current.destroy(), (_e.current = null));
      const l = He.current;
      if (l)
        return (
          (_e.current = Wt(l, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': re,
              'ctrl+y': re,
            },
            exec: (_) => {
              _.isInput || z.exec('hotkey', _);
            },
          })),
          () => {
            _e.current?.destroy(), (_e.current = null);
          }
        );
    }, [re]),
    /* @__PURE__ */ u('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: Z,
      onScroll: Ge,
      children: /* @__PURE__ */ u('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: Ie, width: '100%' },
        ref: he,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: de,
            width: Q,
          },
          children: /* @__PURE__ */ Ae('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: He,
            children: [
              G.length
                ? /* @__PURE__ */ Ae(et, {
                    children: [
                      /* @__PURE__ */ u(Ln, {
                        display: N,
                        compactMode: k,
                        columnWidth: q,
                        width: le,
                        readonly: s,
                        fullHeight: Te,
                        onTableAPIChange: E,
                        multiTaskRows: y,
                        rowMapping: U,
                        rowHeightOverrides: H,
                      }),
                      /* @__PURE__ */ u(Yn, {
                        value: le,
                        display: N,
                        compactMode: k,
                        containerWidth: ie,
                        onMove: (l) => xe(l),
                        onDisplayChange: (l) => F(l),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ u('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: p,
                children: /* @__PURE__ */ u(On, {
                  readonly: s,
                  fullWidth: ue,
                  fullHeight: Te,
                  taskTemplate: n,
                  cellBorders: i,
                  highlightTime: o,
                  onScaleClick: R,
                  multiTaskRows: y,
                  rowMapping: U,
                  rowHeightOverrides: H,
                  allowTaskIntersection: r,
                  summaryBarCounts: g,
                  marqueeSelect: B,
                  copyPaste: W,
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
function Yt(t, n) {
  return t.map(({ format: s, ...i }) => ({
    ...i,
    format: Vn(s, n),
  }));
}
function Fn(t, n) {
  const s = Kn(n);
  for (let i in s) s[i] = ot(s[i], t);
  return s;
}
function qn(t, n) {
  if (!t || !t.length) return t;
  const s = ot('%d-%m-%Y', n);
  return t.map((i) =>
    i.template
      ? i
      : i.id === 'start' || i.id == 'end'
        ? {
            ...i,
            //store locale template for unscheduled tasks
            _template: (o) => s(o),
            template: (o) => s(o),
          }
        : i.id === 'duration'
          ? {
              ...i,
              _template: (o) => o,
              template: (o) => o,
            }
          : i,
  );
}
function Un(t, n) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((s) => ({
          ...s,
          scales: Yt(s.scales, n),
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
      markers: s = Zn,
      taskTypes: i = vn,
      tasks: o = Jn,
      selected: R = es,
      activeTask: E = null,
      links: y = ts,
      scales: w = Qn,
      columns: H = yn,
      start: r = null,
      end: g = null,
      lengthUnit: B = 'day',
      durationUnit: W = 'day',
      cellWidth: z = 100,
      cellHeight: v = 38,
      scaleHeight: D = 36,
      readonly: h = !1,
      cellBorders: G = 'full',
      zoom: Y = !1,
      baselines: re = !1,
      highlightTime: U = null,
      onScaleClick: k = null,
      init: we = null,
      autoScale: le = !0,
      unscheduledTasks: xe = !1,
      criticalPath: ie = null,
      schedule: j = ns,
      projectStart: de = null,
      projectEnd: te = null,
      calendar: Q = null,
      undo: J = !1,
      splitTasks: N = !1,
      multiTaskRows: F = !1,
      rowHeightOverrides: A = null,
      allowTaskIntersection: L = !0,
      summaryBarCounts: q = !1,
      marqueeSelect: ye = !1,
      copyPaste: ue = !1,
      summary: Me = null,
      _export: Te = !1,
      ...Ie
    },
    ve,
  ) {
    const p = ne();
    p.current = Ie;
    const T = M(() => new wn(kn), []),
      $ = M(() => ({ ...gt, ...it }), []),
      fe = Xe(Ke.i18n),
      ee = M(() => (fe ? fe.extend($, !0) : lt($)), [fe, $]),
      Z = M(() => ee.getRaw().calendar, [ee]),
      he = M(() => {
        let ce = {
          zoom: Un(Y, Z),
          scales: Yt(w, Z),
          columns: qn(H, Z),
          links: pn(y),
          cellWidth: z,
        };
        return (
          ce.zoom &&
            (ce = {
              ...ce,
              ...xn(ce.zoom, Fn(Z, ee.getGroup('gantt')), ce.scales, z),
            }),
          ce
        );
      }, [Y, w, H, y, z, Z, ee]),
      Ge = ne(null);
    Ge.current !== o &&
      (Te || Ct(o, { durationUnit: W, splitTasks: N, calendar: Q }),
      (Ge.current = o)),
      se(() => {
        Te || Ct(o, { durationUnit: W, splitTasks: N, calendar: Q });
      }, [o, W, Q, N, Te]);
    const ze = M(() => {
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
      Re = M(() => T.in, [T]),
      He = ne(null);
    He.current === null &&
      ((He.current = new fn((ce, be) => {
        const Ce = 'on' + jn(ce);
        p.current && p.current[Ce] && p.current[Ce](be);
      })),
      Re.setNext(He.current));
    const [_e, l] = ge(null),
      _ = ne(null);
    _.current = _e;
    const O = M(
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
            ? new Promise((be) => setTimeout(() => be(_.current), 1))
            : _.current,
        getHistory: () => T.getHistory(),
      }),
      [T, Re],
    );
    se(() => {
      const ce = () => {
        const { zoom: be, scales: Ce } = O.getState(),
          De = be?.levels?.[be.level]?.scales?.[0]?.unit ?? Ce?.[0]?.unit;
        De && O.exec('scale-change', { level: be?.level, unit: De });
      };
      O.on('zoom-scale', ce), O.on('set-scale', ce);
    }, [O]),
      se(() => {
        O.intercept('set-scale', ({ unit: ce, date: be }) => {
          const { zoom: Ce } = O.getState();
          if (!Ce || !Ce.levels) return !1;
          const Ee = Ce.levels.findIndex((c) =>
            c.scales.some((m) => m.unit === ce),
          );
          if (Ee < 0) return !1;
          const De = Ce.levels[Ee];
          if (Ee !== Ce.level) {
            const c = Math.round((De.minCellWidth + De.maxCellWidth) / 2);
            O.getStores().data.setState({
              scales: De.scales,
              cellWidth: c,
              _cellWidth: c,
              zoom: { ...Ce, level: Ee },
              ...(be ? { _scaleDate: be, _zoomOffset: 0 } : {}),
            });
          } else if (be) {
            const { _scales: c, cellWidth: m } = O.getState(),
              S = c.diff(be, c.start, c.lengthUnit),
              V = Math.max(0, Math.round(S * m));
            O.exec('scroll-chart', { left: V });
          }
          return !1;
        });
      }, [O]),
      Pt(
        ve,
        () => ({
          ...O,
        }),
        [O],
      );
    const b = ne(0);
    se(() => {
      b.current
        ? T.init({
            tasks: o,
            links: he.links,
            start: r,
            columns: he.columns,
            end: g,
            lengthUnit: B,
            cellWidth: he.cellWidth,
            cellHeight: v,
            scaleHeight: D,
            scales: he.scales,
            taskTypes: i,
            zoom: he.zoom,
            selected: R,
            activeTask: E,
            baselines: re,
            autoScale: le,
            unscheduledTasks: xe,
            markers: s,
            durationUnit: W,
            criticalPath: ie,
            schedule: j,
            projectStart: de,
            projectEnd: te,
            calendar: Q,
            undo: J,
            _weekStart: Z.weekStart,
            splitTasks: N,
            summary: Me,
          })
        : we && we(O),
        b.current++;
    }, [
      O,
      we,
      o,
      he,
      r,
      g,
      B,
      v,
      D,
      i,
      R,
      E,
      re,
      le,
      xe,
      s,
      W,
      ie,
      j,
      de,
      te,
      Q,
      J,
      Z,
      N,
      Me,
      T,
    ]),
      b.current === 0 &&
        T.init({
          tasks: o,
          links: he.links,
          start: r,
          columns: he.columns,
          end: g,
          lengthUnit: B,
          cellWidth: he.cellWidth,
          cellHeight: v,
          scaleHeight: D,
          scales: he.scales,
          taskTypes: i,
          zoom: he.zoom,
          selected: R,
          activeTask: E,
          baselines: re,
          autoScale: le,
          unscheduledTasks: xe,
          markers: s,
          durationUnit: W,
          criticalPath: ie,
          schedule: j,
          projectStart: de,
          projectEnd: te,
          calendar: Q,
          undo: J,
          _weekStart: Z.weekStart,
          splitTasks: N,
          summary: Me,
        });
    const Le = M(
      () =>
        Q
          ? (ce, be) =>
              (be == 'day' && !Q.getDayHours(ce)) ||
              (be == 'hour' && !Q.getDayHours(ce))
                ? 'wx-weekend'
                : ''
          : U,
      [Q, U],
    );
    return /* @__PURE__ */ u(Ke.i18n.Provider, {
      value: ee,
      children: /* @__PURE__ */ u(Ue.Provider, {
        value: O,
        children: /* @__PURE__ */ u(Bn, {
          taskTemplate: n,
          readonly: h,
          cellBorders: G,
          highlightTime: Le,
          onScaleClick: k,
          onTableAPIChange: l,
          multiTaskRows: F,
          rowMapping: ze,
          rowHeightOverrides: A,
          allowTaskIntersection: L,
          summaryBarCounts: q,
          marqueeSelect: ye,
          copyPaste: ue,
        }),
      }),
    });
  });
function Ts({ api: t = null, items: n = [] }) {
  const s = Xe(Ke.i18n),
    i = M(() => s || lt(it), [s]),
    o = M(() => i.getGroup('gantt'), [i]),
    R = qe(t, '_selected'),
    E = qe(t, 'undo'),
    y = qe(t, 'history'),
    w = qe(t, 'splitTasks'),
    H = ['undo', 'redo'],
    r = M(() => {
      const B = Mt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : Mt({
              undo: E,
              splitTasks: w,
            })
      ).map((z) => {
        let v = { ...z, disabled: !1 };
        return (
          (v.handler = zt(B, v.id) ? (D) => _t(t, D.id, null, o) : v.handler),
          v.text && (v.text = o(v.text)),
          v.menuText && (v.menuText = o(v.menuText)),
          v
        );
      });
    }, [n, t, o, E, w]),
    g = M(() => {
      const B = [];
      return (
        r.forEach((W) => {
          const z = W.id;
          if (z === 'add-task') B.push(W);
          else if (H.includes(z))
            H.includes(z) &&
              B.push({
                ...W,
                disabled: W.isDisabled(y),
              });
          else {
            if (!R?.length || !t) return;
            B.push({
              ...W,
              disabled:
                W.isDisabled && R.some((v) => W.isDisabled(v, t.getState())),
            });
          }
        }),
        B.filter((W, z) => {
          if (t && W.isHidden)
            return !R.some((v) => W.isHidden(v, t.getState()));
          if (W.comp === 'separator') {
            const v = B[z + 1];
            if (!v || v.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, R, y, r]);
  return s
    ? /* @__PURE__ */ u(Et, { items: g })
    : /* @__PURE__ */ u(Ke.i18n.Provider, {
        value: i,
        children: /* @__PURE__ */ u(Et, { items: g }),
      });
}
const $s = At(function (
  {
    options: n = [],
    api: s = null,
    resolver: i = null,
    filter: o = null,
    at: R = 'point',
    children: E,
    onClick: y,
    css: w,
  },
  H,
) {
  const r = ne(null),
    g = ne(null),
    B = Xe(Ke.i18n),
    W = M(() => B || lt({ ...it, ...gt }), [B]),
    z = M(() => W.getGroup('gantt'), [W]),
    v = qe(s, 'taskTypes'),
    D = qe(s, 'selected'),
    h = qe(s, '_selected'),
    G = qe(s, 'splitTasks'),
    Y = qe(s, 'summary'),
    re = M(
      () => ({
        splitTasks: G,
        taskTypes: v,
        summary: Y,
      }),
      [G, v, Y],
    ),
    U = M(() => Rt(re), [re]);
  se(() => {
    s &&
      (s.on('scroll-chart', () => {
        r.current && r.current.show && r.current.show();
      }),
      s.on('drag-task', () => {
        r.current && r.current.show && r.current.show();
      }));
  }, [s]);
  function k(J) {
    return J.map(
      (N) => (
        (N = { ...N }),
        N.text && (N.text = z(N.text)),
        N.subtext && (N.subtext = z(N.subtext)),
        N.data && (N.data = k(N.data)),
        N
      ),
    );
  }
  function we() {
    const J = n.length ? n : Rt(re);
    return k(J);
  }
  const le = M(() => we(), [s, n, re, z]),
    xe = M(() => (h && h.length ? h : []), [h]),
    ie = I(
      (J, N) => {
        let F = J ? s?.getTask(J) : null;
        if (i) {
          const A = i(J, N);
          F = A === !0 ? F : A;
        }
        if (F) {
          const A = Ze(N.target, 'data-segment');
          A !== null
            ? (g.current = { id: F.id, segmentIndex: A })
            : (g.current = F.id),
            (!Array.isArray(D) || !D.includes(F.id)) &&
              s &&
              s.exec &&
              s.exec('select-task', { id: F.id });
        }
        return F;
      },
      [s, i, D],
    ),
    j = I(
      (J) => {
        const N = J.action;
        N && (zt(U, N.id) && _t(s, N.id, g.current, z), y && y(J));
      },
      [s, z, y, U],
    ),
    de = I(
      (J, N) => {
        const F = xe.length ? xe : N ? [N] : [];
        let A = o ? F.every((L) => o(J, L)) : !0;
        if (
          A &&
          (J.isHidden &&
            (A = !F.some((L) => J.isHidden(L, s.getState(), g.current))),
          J.isDisabled)
        ) {
          const L = F.some((q) => J.isDisabled(q, s.getState(), g.current));
          J.disabled = L;
        }
        return A;
      },
      [o, xe, s],
    );
  Pt(H, () => ({
    show: (J, N) => {
      r.current && r.current.show && r.current.show(J, N);
    },
  }));
  const te = I((J) => {
      r.current && r.current.show && r.current.show(J);
    }, []),
    Q = /* @__PURE__ */ Ae(et, {
      children: [
        /* @__PURE__ */ u(Mn, {
          filter: de,
          options: le,
          dataKey: 'id',
          resolver: ie,
          onClick: j,
          at: R,
          ref: r,
          css: w,
        }),
        /* @__PURE__ */ u('span', {
          onContextMenu: te,
          'data-menu-ignore': 'true',
          children: typeof E == 'function' ? E() : E,
        }),
      ],
    });
  if (!B && Ke.i18n?.Provider) {
    const J = Ke.i18n.Provider;
    return /* @__PURE__ */ u(J, { value: W, children: Q });
  }
  return Q;
});
function ss({ api: t, autoSave: n, onLinksChange: s }) {
  const o = Xe(Ke.i18n).getGroup('gantt'),
    R = X(t, 'activeTask'),
    E = X(t, '_activeTask'),
    y = X(t, '_links'),
    w = X(t, 'schedule'),
    H = X(t, 'unscheduledTasks'),
    [r, g] = ge();
  function B() {
    if (R) {
      const D = y
          .filter((G) => G.target == R)
          .map((G) => ({ link: G, task: t.getTask(G.source) })),
        h = y
          .filter((G) => G.source == R)
          .map((G) => ({ link: G, task: t.getTask(G.target) }));
      return [
        { title: o('Predecessors'), data: D },
        { title: o('Successors'), data: h },
      ];
    }
  }
  se(() => {
    g(B());
  }, [R, y]);
  const W = M(
    () => [
      { id: 'e2s', label: o('End-to-start') },
      { id: 's2s', label: o('Start-to-start') },
      { id: 'e2e', label: o('End-to-end') },
      { id: 's2e', label: o('Start-to-end') },
    ],
    [o],
  );
  function z(D) {
    n
      ? t.exec('delete-link', { id: D })
      : (g((h) =>
          (h || []).map((G) => ({
            ...G,
            data: G.data.filter((Y) => Y.link.id !== D),
          })),
        ),
        s &&
          s({
            id: D,
            action: 'delete-link',
            data: { id: D },
          }));
  }
  function v(D, h) {
    n
      ? t.exec('update-link', {
          id: D,
          link: h,
        })
      : (g((G) =>
          (G || []).map((Y) => ({
            ...Y,
            data: Y.data.map((re) =>
              re.link.id === D ? { ...re, link: { ...re.link, ...h } } : re,
            ),
          })),
        ),
        s &&
          s({
            id: D,
            action: 'update-link',
            data: {
              id: D,
              link: h,
            },
          }));
  }
  return /* @__PURE__ */ u(et, {
    children: (r || []).map((D, h) =>
      D.data.length
        ? /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ u(Ke.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ u(en, {
                  label: D.title,
                  position: 'top',
                  children: /* @__PURE__ */ u('table', {
                    children: /* @__PURE__ */ u('tbody', {
                      children: D.data.map((G) =>
                        /* @__PURE__ */ Ae(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: G.task.text || '',
                                }),
                              }),
                              w?.auto && G.link.type === 'e2s'
                                ? /* @__PURE__ */ u('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ u(tn, {
                                      type: 'number',
                                      placeholder: o('Lag'),
                                      value: G.link.lag,
                                      disabled: H && E?.unscheduled,
                                      onChange: (Y) => {
                                        Y.input ||
                                          v(G.link.id, { lag: Y.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ u(nn, {
                                    value: G.link.type,
                                    placeholder: o('Select link type'),
                                    options: W,
                                    onChange: (Y) =>
                                      v(G.link.id, { type: Y.value }),
                                    children: ({ option: Y }) => Y.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => z(G.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          G.link.id,
                        ),
                      ),
                    }),
                  }),
                }),
              }),
            },
            h,
          )
        : null,
    ),
  });
}
function rs(t) {
  const { value: n, time: s, format: i, onchange: o, onChange: R, ...E } = t,
    y = R ?? o;
  function w(H) {
    const r = new Date(H.value);
    r.setHours(n.getHours()),
      r.setMinutes(n.getMinutes()),
      y && y({ value: r });
  }
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ u(sn, {
        ...E,
        value: n,
        onChange: w,
        format: i,
        buttons: ['today'],
        clear: !1,
      }),
      s ? /* @__PURE__ */ u(rn, { value: n, onChange: y, format: i }) : null,
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
  css: s = '',
  layout: i = 'default',
  readonly: o = !1,
  placement: R = 'sidebar',
  bottomBar: E = !0,
  topBar: y = !0,
  autoSave: w = !0,
  focus: H = !1,
  hotkeys: r = {},
}) {
  const g = Xe(Ke.i18n),
    B = M(() => g || lt({ ...it, ...gt }), [g]),
    W = M(() => B.getGroup('gantt'), [B]),
    z = B.getRaw(),
    v = M(() => {
      const l = z.gantt?.dateFormat || z.formats?.dateFormat;
      return ot(l, z.calendar);
    }, [z]),
    D = M(() => {
      if (y === !0 && !o) {
        const l = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: W('Delete'),
            id: 'delete',
          },
        ];
        return w
          ? { items: l }
          : {
              items: [
                ...l,
                {
                  comp: 'button',
                  type: 'primary',
                  text: W('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return y;
    }, [y, o, w, W]),
    [h, G] = ge(!1),
    Y = M(() => (h ? 'wx-full-screen' : ''), [h]),
    re = I((l) => {
      G(l);
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
  const U = X(t, '_activeTask'),
    k = X(t, 'activeTask'),
    we = X(t, 'unscheduledTasks'),
    le = X(t, 'summary'),
    xe = X(t, 'links'),
    ie = X(t, 'splitTasks'),
    j = M(() => ie && k?.segmentIndex, [ie, k]),
    de = M(() => j || j === 0, [j]),
    te = X(t, 'taskTypes'),
    Q = M(
      () => bn({ unscheduledTasks: we, summary: le, taskTypes: te }),
      [we, le, te],
    ),
    J = X(t, 'undo'),
    [N, F] = ge({}),
    [A, L] = ge(null),
    [q, ye] = ge(),
    [ue, Me] = ge(null),
    Te = M(() => {
      if (!U) return null;
      let l;
      if ((de && U.segments ? (l = { ...U.segments[j] }) : (l = { ...U }), o)) {
        let _ = { parent: l.parent };
        return (
          Q.forEach(({ key: O, comp: b }) => {
            if (b !== 'links') {
              const Le = l[O];
              b === 'date' && Le instanceof Date
                ? (_[O] = v(Le))
                : b === 'slider' && O === 'progress'
                  ? (_[O] = `${Le}%`)
                  : (_[O] = Le);
            }
          }),
          _
        );
      }
      return l || null;
    }, [U, de, j, o, Q, v]);
  se(() => {
    ye(Te);
  }, [Te]),
    se(() => {
      F({}), Me(null), L(null);
    }, [k]);
  function Ie(l, _) {
    return l.map((O) => {
      const b = { ...O };
      if (
        (O.config && (b.config = { ...b.config }),
        b.comp === 'links' &&
          t &&
          ((b.api = t), (b.autoSave = w), (b.onLinksChange = T)),
        b.comp === 'select' && b.key === 'type')
      ) {
        const Le = b.options ?? [];
        b.options = Le.map((ce) => ({
          ...ce,
          label: W(ce.label),
        }));
      }
      return (
        b.comp === 'slider' &&
          b.key === 'progress' &&
          (b.labelTemplate = (Le) => `${W(b.label)} ${Le}%`),
        b.label && (b.label = W(b.label)),
        b.config?.placeholder &&
          (b.config.placeholder = W(b.config.placeholder)),
        _ &&
          (b.isDisabled && b.isDisabled(_, t.getState())
            ? (b.disabled = !0)
            : delete b.disabled),
        b
      );
    });
  }
  const ve = M(() => {
      let l = n.length ? n : Q;
      return (
        (l = Ie(l, q)),
        q ? l.filter((_) => !_.isHidden || !_.isHidden(q, t.getState())) : l
      );
    }, [n, Q, q, W, t, w]),
    p = M(() => ve.map((l) => l.key), [ve]);
  function T({ id: l, action: _, data: O }) {
    F((b) => ({
      ...b,
      [l]: { action: _, data: O },
    }));
  }
  const $ = I(() => {
      for (let l in N)
        if (xe.byId(l)) {
          const { action: _, data: O } = N[l];
          t.exec(_, O);
        }
    }, [t, N, xe]),
    fe = I(() => {
      const l = k?.id || k;
      if (de) {
        if (U?.segments) {
          const _ = U.segments.filter((O, b) => b !== j);
          t.exec('update-task', {
            id: l,
            task: { segments: _ },
          });
        }
      } else t.exec('delete-task', { id: l });
    }, [t, k, de, U, j]),
    ee = I(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    Z = I(
      (l) => {
        const { item: _, changes: O } = l;
        _.id === 'delete' && fe(),
          _.id === 'save' && (O.length ? ee() : $()),
          _.comp && ee();
      },
      [t, k, w, $, fe, ee],
    ),
    he = I(
      (l, _, O) => (
        we && l.type === 'summary' && (l.unscheduled = !1),
        Gt(l, t.getState(), _),
        O || L(!1),
        l
      ),
      [we, t],
    ),
    Ge = I(
      (l) => {
        (l = {
          ...l,
          unscheduled: we && l.unscheduled && l.type !== 'summary',
        }),
          delete l.links,
          delete l.data,
          (p.indexOf('duration') === -1 || (l.segments && !l.duration)) &&
            delete l.duration;
        const _ = {
          id: k?.id || k,
          task: l,
          ...(de && { segmentIndex: j }),
        };
        w && A && (_.inProgress = A), t.exec('update-task', _), w || $();
      },
      [t, k, we, w, $, p, de, j, A],
    ),
    ze = I(
      (l) => {
        let { update: _, key: O, input: b } = l;
        if ((b && L(!0), (l.update = he({ ..._ }, O, b)), !w)) ye(l.update);
        else if (!ue && !b) {
          const Le = ve.find((Ce) => Ce.key === O),
            ce = _[O];
          (!Le.validation || Le.validation(ce)) &&
            (!Le.required || ce) &&
            Ge(l.update);
        }
      },
      [w, he, ue, ve, Ge],
    ),
    Re = I(
      (l) => {
        w || Ge(l.values);
      },
      [w, Ge],
    ),
    He = I((l) => {
      Me(l.errors);
    }, []),
    _e = M(
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
          css: `wx-XkvqDXuw wx-gantt-editor ${Y} ${s}`,
          items: ve,
          values: Te,
          topBar: D,
          bottomBar: E,
          placement: R,
          layout: i,
          readonly: o,
          autoSave: w,
          focus: H,
          onAction: Z,
          onSave: Re,
          onValidation: He,
          onChange: ze,
          hotkeys: r && { ..._e, ...r },
        }),
      })
    : null;
}
const Ms = ({ children: t, columns: n = null, api: s }) => {
  const [i, o] = ge(null);
  return (
    se(() => {
      s && s.getTable(!0).then(o);
    }, [s]),
    /* @__PURE__ */ u($n, { api: i, columns: n, children: t })
  );
};
function Rs(t) {
  const { api: n, content: s, filter: i, children: o } = t,
    R = ne(null),
    E = ne(null),
    [y, w] = ge({}),
    [H, r] = ge(null),
    [g, B] = ge(null),
    [W, z] = ge(!1),
    v = ne(null),
    D = ne(!1),
    h = ne(null),
    G = ne(null),
    Y = 300,
    re = 400;
  function U(A) {
    for (; A; ) {
      if (A.getAttribute) {
        const L = A.getAttribute('data-tooltip-id'),
          q = A.getAttribute('data-tooltip-at'),
          ye = A.getAttribute('data-tooltip');
        if (L || ye) return { id: L, tooltip: ye, target: A, at: q };
      }
      A = A.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  se(() => {
    const A = E.current;
    if (!W && A && g && (g.text || s)) {
      const L = A.getBoundingClientRect();
      let q = !1,
        ye = g.left,
        ue = g.top;
      L.right >= y.right && ((ye = y.width - L.width - 5), (q = !0)),
        L.bottom >= y.bottom &&
          ((ue = g.top - (L.bottom - y.bottom + 2)), (q = !0)),
        q && B((Me) => Me && { ...Me, left: ye, top: ue });
    }
  }, [g, y, s, W]);
  const k = I(() => {
      clearTimeout(h.current),
        clearTimeout(G.current),
        (h.current = null),
        (G.current = null),
        (v.current = null),
        (D.current = !1),
        B(null),
        r(null),
        z(!1);
    }, []),
    we = I(() => {
      clearTimeout(G.current),
        (G.current = setTimeout(() => {
          (G.current = null), !v.current && !D.current && k();
        }, re));
    }, [k]),
    le = I(() => {
      clearTimeout(G.current), (G.current = null);
    }, []);
  function xe(A) {
    if (E.current && E.current.contains(A.target)) return;
    let { id: L, tooltip: q, target: ye, at: ue } = U(A.target);
    if (!L && !q) {
      clearTimeout(h.current),
        (h.current = null),
        (v.current = null),
        !D.current && !G.current && we();
      return;
    }
    if ((le(), q || (q = J(L)), v.current === L)) return;
    (v.current = L), clearTimeout(h.current), B(null), r(null), z(!1);
    const Me = A.clientX;
    h.current = setTimeout(() => {
      h.current = null;
      const Te = L ? Q(N(L)) : null;
      if (i && Te && !i(Te)) {
        v.current = null;
        return;
      }
      Te && r(Te);
      const Ie = ye.getBoundingClientRect(),
        ve = R.current,
        p = ve
          ? ve.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let T, $;
      ue === 'left'
        ? ((T = Ie.top + 5 - p.top), ($ = Ie.right + 5 - p.left))
        : ((T = Ie.top + Ie.height - p.top), ($ = Me - p.left)),
        w(p),
        B({ top: T, left: $, text: q });
    }, Y);
  }
  function ie() {
    (D.current = !0), le();
  }
  function j() {
    (D.current = !1), v.current || we();
  }
  function de(A) {
    const L = A.touches[0];
    if (!L) return;
    const { id: q, target: ye } = U(A.target);
    if (!q) return;
    clearTimeout(h.current), clearTimeout(G.current);
    const ue = Q(N(q));
    if (i && ue && !i(ue)) return;
    const Me = ue?.text || '',
      Te = ye.getBoundingClientRect(),
      Ie = R.current,
      ve = Ie
        ? Ie.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    r(ue),
      w(ve),
      z(!0),
      B({
        top: Te.top - ve.top - 8,
        left: L.clientX - ve.left,
        text: Me,
      });
  }
  function te() {
    k();
  }
  function Q(A) {
    return n?.getTask(N(A)) || null;
  }
  function J(A) {
    return Q(A)?.text || '';
  }
  function N(A) {
    const L = Number(A);
    return Number.isFinite(L) ? L : A;
  }
  se(
    () => () => {
      clearTimeout(h.current), clearTimeout(G.current);
    },
    [],
  );
  const F = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    W ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: R,
    onMouseMove: xe,
    onTouchStart: de,
    onTouchEnd: te,
    onTouchMove: te,
    children: [
      g && (g.text || s)
        ? /* @__PURE__ */ u('div', {
            className: F,
            ref: E,
            style: { top: `${g.top}px`, left: `${g.left}px` },
            onMouseEnter: ie,
            onMouseLeave: j,
            children: s
              ? /* @__PURE__ */ u(s, { data: H, api: n })
              : g.text
                ? /* @__PURE__ */ u('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: g.text,
                  })
                : null,
          })
        : null,
      o,
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
  _s as defaultToolbarButtons,
  zs as getEditorItems,
  Ws as getMenuOptions,
  Os as getToolbarButtons,
  Bs as registerEditorItem,
  Ys as registerScaleUnit,
  Ls as version,
};
//# sourceMappingURL=index.es.js.map
