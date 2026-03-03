import { jsxs as Ae, jsx as u, Fragment as et } from 'react/jsx-runtime';
import {
  createContext as Zt,
  useContext as Xe,
  useMemo as R,
  useState as ge,
  useCallback as I,
  useRef as te,
  useEffect as re,
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
  let r, c, o, $, C, x, g, D, s;
  function y(E) {
    ($ = E.clientX),
      (C = E.clientY),
      (x = {
        ...En(r, t, E),
        y: n.getTask(o).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function V(E) {
    (r = Fe(E)),
      Dt(r) &&
        ((o = Qe(r)),
        (s = setTimeout(() => {
          (D = !0), n && n.touchStart && n.touchStart(), y(E.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', B),
        t.addEventListener('contextmenu', W),
        window.addEventListener('touchend', Y));
  }
  function W(E) {
    if (D || s) return E.preventDefault(), !1;
  }
  function P(E) {
    E.which === 1 &&
      ((r = Fe(E)),
      Dt(r) &&
        ((o = Qe(r)),
        t.addEventListener('mousemove', h),
        window.addEventListener('mouseup', se),
        y(E)));
  }
  function v(E) {
    t.removeEventListener('mousemove', h),
      t.removeEventListener('touchmove', B),
      document.body.removeEventListener('mouseup', se),
      document.body.removeEventListener('touchend', Y),
      (document.body.style.userSelect = ''),
      E &&
        (t.removeEventListener('mousedown', P),
        t.removeEventListener('touchstart', V));
  }
  function k(E) {
    const we = E.clientX - $,
      ae = E.clientY - C;
    if (!c) {
      if (
        (Math.abs(we) < St && Math.abs(ae) < St) ||
        (n && n.start && n.start({ id: o, e: E }) === !1)
      )
        return;
      (c = r.cloneNode(!0)),
        (c.style.pointerEvents = 'none'),
        c.classList.add('wx-reorder-task'),
        (c.style.position = 'absolute'),
        (c.style.left = x.left + 'px'),
        (c.style.top = x.top + 'px'),
        (r.style.visibility = 'hidden'),
        r.parentNode.insertBefore(c, r);
    }
    if (c) {
      const xe = Math.round(Math.max(0, x.top + ae));
      if (n && n.move && n.move({ id: o, top: xe, detail: g }) === !1) return;
      const le = n.getTask(o),
        j = le.$y;
      if (!x.start && x.y == j) return q();
      (x.start = !0), (x.y = le.$y - 4), (c.style.top = xe + 'px');
      const ue = document.elementFromPoint(E.clientX, E.clientY),
        Z = Fe(ue);
      if (Z && Z !== r) {
        const ee = Qe(Z),
          U = Z.getBoundingClientRect(),
          H = U.top + U.height / 2,
          T = E.clientY + x.db > H && Z.nextElementSibling !== r,
          _ = E.clientY - x.dt < H && Z.previousElementSibling !== r;
        g?.after == ee || g?.before == ee
          ? (g = null)
          : T
            ? (g = { id: o, after: ee })
            : _ && (g = { id: o, before: ee });
      }
    }
  }
  function h(E) {
    k(E);
  }
  function B(E) {
    D
      ? (E.preventDefault(), k(E.touches[0]))
      : s && (clearTimeout(s), (s = null));
  }
  function Y() {
    (D = null), s && (clearTimeout(s), (s = null)), q();
  }
  function se() {
    q();
  }
  function q() {
    r && (r.style.visibility = ''),
      c &&
        (c.parentNode.removeChild(c),
        n && n.end && n.end({ id: o, top: x.top })),
      (o = r = c = x = g = null),
      v();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', P),
    t.addEventListener('touchstart', V),
    {
      destroy() {
        v(!0);
      },
    }
  );
}
function Sn({ row: t, column: n }) {
  const r = Xe(Ue);
  function c($, C) {
    return {
      justifyContent: C.align,
      paddingLeft: `${($.$level - 1) * 20}px`,
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
  const r = R(() => t.id, [t?.id]);
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
      columnWidth: $ = 0,
      fullHeight: C,
      onTableAPIChange: x,
      multiTaskRows: g = !1,
      rowMapping: D = null,
      rowHeightOverrides: s = null,
    } = t,
    [y, V] = ht($),
    [W, P] = ge(),
    v = Xe(Ke.i18n),
    k = R(() => v.getGroup('gantt'), [v]),
    h = Xe(Ue),
    B = X(h, 'scrollTop'),
    Y = X(h, 'cellHeight'),
    se = X(h, '_scrollTask'),
    q = X(h, '_selected'),
    E = X(h, 'area'),
    we = X(h, '_tasks'),
    ae = X(h, '_scales'),
    xe = X(h, 'columns'),
    le = X(h, '_sort'),
    j = X(h, 'calendar'),
    ue = X(h, 'durationUnit'),
    Z = X(h, 'splitTasks'),
    [ee, U] = ge(null),
    H = R(() => {
      if (!we || !E) return [];
      if (g && D) {
        const i = /* @__PURE__ */ new Set();
        return we.filter((m) => {
          const S = D.taskRows.get(m.id) ?? m.id;
          return i.has(S) ? !1 : (i.add(S), !0);
        });
      }
      return we.slice(E.start, E.end);
    }, [we, E, g, D]),
    T = I(
      (i, m) => {
        if (m === 'add-task')
          h.exec(m, {
            target: i,
            task: { text: k('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (m === 'open-task') {
          const S = H.find((F) => F.id === i);
          (S?.data || S?.lazy) && h.exec(m, { id: i, mode: !S.open });
        }
      },
      [H],
    ),
    _ = I(
      (i) => {
        const m = Ze(i),
          S = i.target.dataset.action;
        S && i.preventDefault(),
          m
            ? S === 'add-task' || S === 'open-task'
              ? T(m, S)
              : h.exec('select-task', {
                  id: m,
                  toggle: i.ctrlKey || i.metaKey,
                  range: i.shiftKey,
                  show: !0,
                })
            : S === 'add-task' && T(null, S);
      },
      [h, T],
    ),
    G = te(null),
    ne = te(null),
    [ye, fe] = ge(0),
    [Me, Te] = ge(!1);
  re(() => {
    const i = ne.current;
    if (!i || typeof ResizeObserver > 'u') return;
    const m = () => fe(i.clientWidth);
    m();
    const S = new ResizeObserver(m);
    return S.observe(i), () => S.disconnect();
  }, []);
  const Re = te(null),
    $e = I(
      (i) => {
        const m = i.id,
          { before: S, after: F } = i,
          pe = i.onMove;
        let me = S || F,
          ke = S ? 'before' : 'after';
        if (pe) {
          if (ke === 'after') {
            const Pe = h.getTask(me);
            Pe.data?.length &&
              Pe.open &&
              ((ke = 'before'), (me = Pe.data[0].id));
          }
          Re.current = { id: m, [ke]: me };
        } else Re.current = null;
        h.exec('move-task', {
          id: m,
          mode: ke,
          target: me,
          inProgress: pe,
        });
      },
      [h],
    ),
    p = R(() => E?.from ?? 0, [E]),
    L = R(() => ae?.height ?? 0, [ae]),
    N = R(
      () => (!r && o !== 'grid' ? (y ?? 0) > (c ?? 0) : (y ?? 0) > (ye ?? 0)),
      [r, o, y, c, ye],
    ),
    de = R(() => {
      const i = {};
      return (
        (N && o === 'all') || (o === 'grid' && N)
          ? (i.width = y)
          : o === 'grid' && (i.width = '100%'),
        i
      );
    }, [N, o, y]),
    J = R(
      () => (ee && !H.find((i) => i.id === ee.id) ? [...H, ee] : H),
      [H, ee],
    ),
    Q = R(() => {
      let i = (xe || []).map((F) => {
        F = { ...F };
        const pe = F.header;
        if (typeof pe == 'object') {
          const me = pe.text && k(pe.text);
          F.header = { ...pe, text: me };
        } else F.header = k(pe);
        if (F.cell && F.id !== 'text' && F.id !== 'add-task') {
          const me = F.cell;
          F.cell = (ke) => /* @__PURE__ */ u(me, { ...ke, api: h });
        }
        return F;
      });
      const m = i.findIndex((F) => F.id === 'text'),
        S = i.findIndex((F) => F.id === 'add-task');
      if (
        (m !== -1 && (i[m].cell && (i[m]._cell = i[m].cell), (i[m].cell = Sn)),
        S !== -1)
      ) {
        i[S].cell = i[S].cell || Lt;
        const F = i[S].header;
        if (
          (typeof F != 'object' && (i[S].header = { text: F }),
          (i[S].header.cell = F.cell || Lt),
          n)
        )
          i.splice(S, 1);
        else if (r) {
          const [pe] = i.splice(S, 1);
          i.unshift(pe);
        }
      }
      return i.length > 0 && (i[i.length - 1].resize = !1), i;
    }, [xe, k, n, r, h]),
    he = R(
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
    Ge = R(() => {
      if (J && le?.length) {
        const i = {};
        return (
          le.forEach(({ key: m, order: S }, F) => {
            i[m] = {
              order: S,
              ...(le.length > 1 && { index: F }),
            };
          }),
          i
        );
      }
      return {};
    }, [J, le]),
    ze = I(() => Q.some((i) => i.flexgrow && !i.hidden), []),
    Ee = R(() => ze(), [ze, Me]),
    He = R(() => {
      let i = o === 'chart' ? Q.filter((S) => S.id === 'add-task') : Q;
      const m = o === 'all' ? c : ye;
      if (!Ee) {
        let S = y,
          F = !1;
        if (Q.some((pe) => pe.$width)) {
          let pe = 0;
          (S = Q.reduce(
            (me, ke) => (
              ke.hidden || ((pe += ke.width), (me += ke.$width || ke.width)), me
            ),
            0,
          )),
            pe > S && S > m && (F = !0);
        }
        if (F || S < m) {
          let pe = 1;
          return (
            F || (pe = (m - 50) / (S - 50 || 1)),
            i.map(
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
      return i;
    }, [o, Q, Ee, y, c, ye]),
    _e = I(
      (i) => {
        if (!ze()) {
          const m = He.reduce(
            (S, F) => (
              i && F.$width && (F.$width = F.width),
              S + (F.hidden ? 0 : F.width)
            ),
            0,
          );
          m !== y && V(m);
        }
        Te(!0), Te(!1);
      },
      [ze, He, y, V],
    ),
    l = I(() => {
      Q.filter((m) => m.flexgrow && !m.hidden).length === 1 &&
        Q.forEach((m) => {
          m.$width && !m.flexgrow && !m.hidden && (m.width = m.$width);
        });
    }, []),
    z = I(
      (i) => {
        if (!n) {
          const m = Ze(i),
            S = dn(i, 'data-col-id');
          !(S && Q.find((pe) => pe.id == S))?.editor &&
            m &&
            h.exec('show-editor', { id: m });
        }
      },
      [h, n],
      // cols is defined later; relies on latest value at call time
    ),
    O = R(() => (Array.isArray(q) ? q.map((i) => i.id) : []), [q]),
    b = I(() => {
      if (G.current && J !== null) {
        const i = G.current.querySelector('.wx-body');
        i &&
          (g
            ? (i.style.top = '0px')
            : (i.style.top = -((B ?? 0) - (p ?? 0)) + 'px'));
      }
      ne.current && (ne.current.scrollTop = 0);
    }, [J, B, p, g]);
  re(() => {
    G.current && b();
  }, [B, p, b]),
    re(() => {
      const i = G.current;
      if (!i) return;
      const m = i.querySelector('.wx-table-box .wx-body');
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
    }, [He, de, o, he, J, b]),
    re(() => {
      if (!se || !W) return;
      const { id: i } = se,
        m = W.getState().focusCell;
      m &&
        m.row !== i &&
        G.current &&
        G.current.contains(document.activeElement) &&
        W.exec('focus-cell', {
          row: i,
          column: m.column,
        });
    }, [se, W]),
    re(() => {
      if (!g) return;
      const i = G.current;
      if (!i) return;
      const m = i.querySelector('.wx-table-box .wx-body');
      if (!m) return;
      let S = 0;
      m.querySelectorAll('[data-id]').forEach((pe) => {
        const me = pe.getAttribute('data-id'),
          ke = (s && me && s[me]) || Y;
        (pe.style.height = `${ke}px`),
          (pe.style.minHeight = `${ke}px`),
          (S += ke);
      }),
        S > 0 && (m.style.height = `${S}px`);
    }, [s, g, J, Y]);
  const Ne = I(
      ({ id: i }) => {
        if (n) return !1;
        h.getTask(i).open && h.exec('open-task', { id: i, mode: !1 });
        const m = h.getState()._tasks.find((S) => S.id === i);
        if ((U(m || null), !m)) return !1;
      },
      [h, n],
    ),
    ie = I(
      ({ id: i, top: m }) => {
        Re.current
          ? $e({ ...Re.current, onMove: !1 })
          : h.exec('drag-task', {
              id: i,
              top: m + (p ?? 0),
              inProgress: !1,
            }),
          U(null);
      },
      [h, $e, p],
    ),
    ve = I(
      ({ id: i, top: m, detail: S }) => {
        S && $e({ ...S, onMove: !0 }),
          h.exec('drag-task', {
            id: i,
            top: m + (p ?? 0),
            inProgress: !0,
          });
      },
      [h, $e, p],
    );
  re(() => {
    const i = G.current;
    return i
      ? Dn(i, {
          start: Ne,
          end: ie,
          move: ve,
          getTask: h.getTask,
        }).destroy
      : void 0;
  }, [h, Ne, ie, ve]);
  const Ce = I(
      (i) => {
        const { key: m, isInput: S } = i;
        if (!S && (m === 'arrowup' || m === 'arrowdown'))
          return (i.eventSource = 'grid'), h.exec('hotkey', i), !1;
        if (m === 'enter') {
          const F = W?.getState().focusCell;
          if (F) {
            const { row: pe, column: me } = F;
            me === 'add-task'
              ? T(pe, 'add-task')
              : me === 'text' && T(pe, 'open-task');
          }
        }
      },
      [h, T, W],
    ),
    De = te(null),
    Se = () => {
      De.current = {
        setTableAPI: P,
        handleHotkey: Ce,
        sortVal: le,
        api: h,
        adjustColumns: l,
        setColumnWidth: _e,
        tasks: H,
        calendarVal: j,
        durationUnitVal: ue,
        splitTasksVal: Z,
        onTableAPIChange: x,
      };
    };
  Se(),
    re(() => {
      Se();
    }, [P, Ce, le, h, l, _e, H, j, ue, Z, x]);
  const We = I((i) => {
    P(i),
      i.intercept('hotkey', (m) => De.current.handleHotkey(m)),
      i.intercept('scroll', () => !1),
      i.intercept('select-row', () => !1),
      i.intercept('sort-rows', (m) => {
        const S = De.current.sortVal,
          { key: F, add: pe } = m,
          me = S ? S.find((Pe) => Pe.key === F) : null;
        let ke = 'asc';
        return (
          me && (ke = !me || me.order === 'asc' ? 'desc' : 'asc'),
          h.exec('sort-tasks', {
            key: F,
            order: ke,
            add: pe,
          }),
          !1
        );
      }),
      i.on('resize-column', () => {
        De.current.setColumnWidth(!0);
      }),
      i.on('hide-column', (m) => {
        m.mode || De.current.adjustColumns(), De.current.setColumnWidth();
      }),
      i.intercept('update-cell', (m) => {
        const { id: S, column: F, value: pe } = m,
          me = De.current.tasks.find((ke) => ke.id === S);
        if (me) {
          const ke = { ...me };
          let Pe = pe;
          Pe && !isNaN(Pe) && !(Pe instanceof Date) && (Pe *= 1),
            (ke[F] = Pe),
            Gt(
              ke,
              {
                calendar: De.current.calendarVal,
                durationUnit: De.current.durationUnitVal,
                splitTasks: De.current.splitTasksVal,
              },
              F,
            ),
            h.exec('update-task', {
              id: S,
              task: ke,
            });
        }
        return !1;
      }),
      x && x(i);
  }, []);
  return /* @__PURE__ */ u('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${he}` },
    ref: ne,
    children: /* @__PURE__ */ u('div', {
      ref: G,
      style: de,
      className: 'wx-rHj6070p wx-table',
      onClick: _,
      onDoubleClick: z,
      children: /* @__PURE__ */ u(Tn, {
        init: We,
        sizes: {
          rowHeight: Y,
          headerHeight: (L ?? 0) - 1,
        },
        rowStyle: (i) =>
          i.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (i) =>
          `wx-rHj6070p wx-text-${i.align}${i.id === 'add-task' ? ' wx-action' : ''}`,
        data: J,
        columns: He,
        selectedRows: [...O],
        sortMarks: Ge,
      }),
    }),
  });
}
function Nn({ borders: t = '', rowLayout: n = null }) {
  const r = Xe(Ue),
    c = X(r, 'cellWidth'),
    o = X(r, 'cellHeight'),
    $ = te(null),
    [C, x] = ge('#e4e4e4');
  re(() => {
    if (typeof getComputedStyle < 'u' && $.current) {
      const s = getComputedStyle($.current).getPropertyValue(
        '--wx-gantt-border',
      );
      x(s ? s.substring(s.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const g = R(() => {
    if (!n) return null;
    const s = [];
    let y = 0;
    for (const V of n) (y += V.height), s.push(y);
    return s;
  }, [n]);
  if (!g) {
    const s = {
      width: '100%',
      height: '100%',
      background: c != null && o != null ? `url(${hn(c, o, C, t)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ u('div', { ref: $, style: s });
  }
  const D = c
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${c - 1}px, ${C} ${c - 1}px, ${C} ${c}px)`
    : void 0;
  return /* @__PURE__ */ Ae('div', {
    ref: $,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ u('div', {
        style: {
          width: '100%',
          height: '100%',
          background: D,
          position: 'absolute',
        },
      }),
      g.map((s, y) =>
        /* @__PURE__ */ u(
          'div',
          {
            style: {
              position: 'absolute',
              top: `${s}px`,
              width: '100%',
              height: '1px',
              backgroundColor: C,
            },
          },
          y,
        ),
      ),
    ],
  });
}
function In({ onSelectLink: t, selectedLink: n, readonly: r }) {
  const c = Xe(Ue),
    o = X(c, '_links'),
    $ = X(c, 'criticalPath'),
    C = te(null),
    x = I(
      (g) => {
        const D = g?.target?.classList;
        !D?.contains('wx-line') && !D?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    re(() => {
      if (!r && n && C.current) {
        const g = (D) => {
          C.current && !C.current.contains(D.target) && x(D);
        };
        return (
          document.addEventListener('click', g),
          () => {
            document.removeEventListener('click', g);
          }
        );
      }
    }, [r, n, x]),
    /* @__PURE__ */ Ae('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (o || []).map((g) => {
          const D =
            'wx-dkx3NwEn wx-line' +
            ($ && g.$critical ? ' wx-critical' : '') +
            (r ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ u(
            'polyline',
            {
              className: D,
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
            ref: C,
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
  function c($) {
    const C = n.segments[$];
    return {
      left: `${C.$x}px`,
      top: '0px',
      width: `${C.$w}px`,
      height: '100%',
    };
  }
  function o($) {
    if (!n.progress) return 0;
    const C = (n.duration * n.progress) / 100,
      x = n.segments;
    let g = 0,
      D = 0,
      s = null;
    do {
      const y = x[D];
      D === $ &&
        (g > C ? (s = 0) : (s = Math.min((C - g) / y.duration, 1) * 100)),
        (g += y.duration),
        D++;
    } while (s === null && D < x.length);
    return s || 0;
  }
  return /* @__PURE__ */ u('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map(($, C) =>
      /* @__PURE__ */ Ae(
        'div',
        {
          className: `wx-segment wx-bar wx-${r} wx-GKbcLEGA`,
          'data-segment': C,
          style: c(C),
          children: [
            n.progress
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ u('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${o(C)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ u('div', {
              className: 'wx-content',
              children: $.text || '',
            }),
          ],
        },
        C,
      ),
    ),
  });
}
let dt = [],
  ft = null,
  Nt = null;
const It = (t, n, r, c) => t < c && n > r,
  Ht = (t, n) => {
    if (!n || !n.start) return null;
    const { start: r, lengthUnitWidth: c, lengthUnit: o } = n,
      $ = 864e5,
      C =
        o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1,
      x = Math.floor(t / c),
      g = new Date(r.getTime() + x * C * $);
    return g.setUTCHours(0, 0, 0, 0), g;
  },
  An = (t, n, r) => {
    if (!r || !t || !n) return 0;
    const { lengthUnit: c } = r,
      C =
        (c === 'week'
          ? 7
          : c === 'month'
            ? 30
            : c === 'quarter'
              ? 91
              : c === 'year'
                ? 365
                : 1) * 864e5;
    return Math.round((t.getTime() - n.getTime()) / C);
  },
  Pn = (t, n, r) => {
    if (!r || !t) return t;
    const { lengthUnit: c } = r,
      C =
        (c === 'week'
          ? 7
          : c === 'month'
            ? 30
            : c === 'quarter'
              ? 91
              : c === 'year'
                ? 365
                : 1) * 864e5,
      x = new Date(t.getTime() + n * C);
    return x.setUTCHours(0, 0, 0, 0), x;
  };
function Gn(t) {
  const {
      readonly: n,
      taskTemplate: r,
      multiTaskRows: c = !1,
      rowMapping: o = null,
      rowHeightOverrides: $ = null,
      allowTaskIntersection: C = !0,
      summaryBarCounts: x = !1,
      marqueeSelect: g = !1,
      copyPaste: D = !1,
    } = t,
    s = Xe(Ue),
    [y, V] = mt(s, '_tasks'),
    [W, P] = mt(s, '_links'),
    v = X(s, 'area'),
    k = X(s, '_scales'),
    h = X(s, 'taskTypes'),
    B = X(s, 'baselines'),
    Y = X(s, '_selected'),
    se = X(s, '_scrollTask'),
    q = X(s, 'criticalPath'),
    E = X(s, 'tasks'),
    we = X(s, 'schedule'),
    ae = X(s, 'splitTasks'),
    xe = X(s, 'summary'),
    le = R(() => {
      if (!v || !Array.isArray(y)) return [];
      const e = v.start ?? 0,
        a = v.end ?? 0;
      return c && o
        ? y.map((f) => ({ ...f }))
        : y.slice(e, a).map((f) => ({ ...f }));
    }, [V, v, c, o]),
    j = X(s, 'cellHeight'),
    ue = R(() => {
      if (!c || !o || !le.length) return le;
      const e = /* @__PURE__ */ new Map(),
        a = [];
      y.forEach((M) => {
        const oe = o.taskRows.get(M.id) ?? M.id;
        e.has(oe) || (e.set(oe, a.length), a.push(oe));
      });
      const f = /* @__PURE__ */ new Map();
      le.forEach((M) => {
        if (M.type === 'summary') return;
        const oe = o.taskRows.get(M.id) ?? M.id;
        f.has(oe) || f.set(oe, []), f.get(oe).push(M);
      });
      const d = /* @__PURE__ */ new Map(),
        w = /* @__PURE__ */ new Map();
      f.forEach((M, oe) => {
        const ce = [],
          Le = [...M].sort((be, Ie) => (be.$x ?? 0) - (Ie.$x ?? 0));
        for (const be of Le) {
          const Ie = be.$x ?? 0,
            Ve = Ie + (be.$w ?? 0);
          let Oe = !1;
          for (let Ye = 0; Ye < ce.length; Ye++)
            if (
              !ce[Ye].some((je) => {
                const rt = je.$x ?? 0,
                  ut = rt + (je.$w ?? 0);
                return It(Ie, Ve, rt, ut);
              })
            ) {
              ce[Ye].push(be), d.set(be.id, Ye), (Oe = !0);
              break;
            }
          Oe || (ce.push([be]), d.set(be.id, ce.length - 1));
        }
        w.set(oe, ce.length);
      });
      const A = /* @__PURE__ */ new Map();
      let K = 0;
      for (const M of a) {
        A.set(M, K);
        const oe = ($ && $[M]) || j;
        K += oe;
      }
      return le.map((M) => {
        const oe = o.taskRows.get(M.id) ?? M.id,
          ce = A.get(oe) ?? 0;
        if (M.type === 'summary') {
          if ((f.get(oe) || []).length > 0) return { ...M, $y: ce, $skip: !0 };
          const Ye = ($ && $[oe]) || j,
            Be = Math.max(0, Math.floor((Ye - M.$h) / 2));
          return {
            ...M,
            $y: ce + Be,
            $y_base: M.$y_base !== void 0 ? ce + Be : void 0,
          };
        }
        const Le = w.get(oe) || 1,
          be = d.get(M.id) ?? 0;
        if (Le > 1) {
          const Be = M.$h + 4,
            je = ce + 3 + be * Be;
          return {
            ...M,
            $y: je,
            $y_base: M.$y_base !== void 0 ? je : void 0,
          };
        }
        const Ie = ($ && $[oe]) || j,
          Ve = Math.max(0, Math.round((Ie - M.$h) / 2));
        return {
          ...M,
          $y: ce + Ve,
          $y_base: M.$y_base !== void 0 ? ce + Ve : void 0,
        };
      });
    }, [le, c, o, y, j, $]),
    Z = R(() => k.lengthUnitWidth, [k]),
    ee = R(() => k.lengthUnit || 'day', [k]),
    U = R(() => {
      const e = /* @__PURE__ */ new Set();
      if (C || !c || !o) return e;
      const a = /* @__PURE__ */ new Map();
      return (
        y.forEach((f) => {
          if (f.type === 'summary' || f.type === 'milestone') return;
          const d = o.taskRows.get(f.id) ?? f.id;
          a.has(d) || a.set(d, []), a.get(d).push(f);
        }),
        a.forEach((f) => {
          if (!(f.length < 2))
            for (let d = 0; d < f.length; d++)
              for (let w = d + 1; w < f.length; w++) {
                const A = f[d],
                  K = f[w];
                It(A.$x, A.$x + A.$w, K.$x, K.$x + K.$w) &&
                  (e.add(A.id), e.add(K.id));
              }
        }),
        e
      );
    }, [C, c, o, y, V]),
    H = R(() => {
      if (!x || !y?.length || !Z) return null;
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Set();
      y.forEach((d) => {
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
          const A = /* @__PURE__ */ new Map();
          w.forEach((K) => {
            if (K.$x == null || K.$w == null) return;
            const M = Math.floor(K.$x / Z),
              oe = Math.ceil((K.$x + K.$w) / Z);
            for (let ce = M; ce < oe; ce++) A.set(ce, (A.get(ce) || 0) + 1);
          }),
            A.size > 0 && f.set(d, A);
        }),
        f
      );
    }, [x, y, Z]),
    [T, _] = ge(null),
    G = te(null),
    [ne, ye] = ge(null),
    [fe, Me] = ge(null),
    [Te, Re] = ge(null),
    $e = te(null);
  $e.current = Te;
  const p = te(0),
    L = te(!1),
    [N, de] = ge(void 0),
    [J, Q] = ge(null),
    he = te(null),
    [Ge, ze] = ge(null),
    Ee = R(
      () =>
        Ge && {
          ...W.find((e) => e.id === Ge),
        },
      [Ge, P],
    ),
    [He, _e] = ge(void 0),
    l = te(null),
    [z, O] = ge(0),
    b = te(null),
    Ne = R(() => {
      const e = b.current;
      return !!(Y.length && e && e.contains(document.activeElement));
    }, [Y, b.current]),
    ie = R(() => Ne && Y[Y.length - 1]?.id, [Ne, Y]);
  re(() => {
    if (se && Ne && se) {
      const { id: e } = se,
        a = b.current?.querySelector(`.wx-bar[data-id='${e}']`);
      a && a.focus({ preventScroll: !0 });
    }
  }, [se]),
    re(() => {
      const e = b.current;
      if (e && (O(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const a = new ResizeObserver((f) => {
          f[0] && O(f[0].contentRect.width);
        });
        return a.observe(e), () => a.disconnect();
      }
    }, [b.current]);
  const ve = I(() => {
      document.body.style.userSelect = 'none';
    }, []),
    Ce = I(() => {
      document.body.style.userSelect = '';
    }, []),
    De = R(() => {
      if (!c || !o || !y?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        y.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id;
          a.has(w) || (a.set(w, f.length), f.push(w));
        }),
        y.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id,
            A = a.get(w) ?? 0;
          e.set(d.id, A * j);
        }),
        e
      );
    }, [y, c, o, j]),
    Se = R(() => {
      if (!c || !o || !y?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        y.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id;
          a.has(w) || (a.set(w, f.length), f.push(w));
        }),
        y.forEach((d) => {
          const w = d.row ?? d.id;
          if (!e.has(w)) {
            const A = o.taskRows.get(d.id) ?? d.id,
              K = a.get(A) ?? 0;
            e.set(w, K * j);
          }
        }),
        e
      );
    }, [y, c, o, j]),
    We = I(
      (e) => {
        if (!b.current) return [];
        const a = Math.min(e.startX, e.currentX),
          f = Math.max(e.startX, e.currentX),
          d = Math.min(e.startY, e.currentY),
          w = Math.max(e.startY, e.currentY);
        return y.filter((A) => {
          const K = A.$x,
            M = A.$x + A.$w,
            ce = De.get(A.id) ?? A.$y,
            Le = ce + A.$h;
          return K < f && M > a && ce < w && Le > d;
        });
      },
      [y, De],
    ),
    i = I(() => {
      if (!D) return;
      const e = s.getState()._selected;
      if (!e || !e.length) return;
      const a = 864e5,
        f = e
          .map((M) => {
            if (!s.getTask(M.id)) return null;
            const ce = y.find((ut) => ut.id === M.id);
            if (!ce) return null;
            const {
                $x: Le,
                $y: be,
                $h: Ie,
                $w: Ve,
                $skip: Oe,
                $level: Ye,
                ...Be
              } = ce,
              je =
                ce.end && ce.start
                  ? Math.round((ce.end.getTime() - ce.start.getTime()) / a)
                  : 0,
              rt = ce.start ? (ce.start.getUTCDay() + 6) % 7 : 0;
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
        A = f.filter((M) => M.parent === w);
      if (A.length === 0) return;
      const K = A.reduce(
        (M, oe) => (oe.start && (!M || oe.start < M) ? oe.start : M),
        null,
      );
      (dt = A.map((M) => ({
        ...M,
        _startCellOffset: An(M.start, K, k),
      }))),
        (Nt = w),
        (ft = K);
    }, [D, s, y, k]),
    m = I(
      (e, a, f) => {
        if (!a.length || !e || f == null) return;
        const d = 864e5,
          w = s.getHistory();
        w?.startBatch();
        const A = new Date(e);
        A.setUTCHours(0, 0, 0, 0),
          a.forEach((K, M) => {
            const oe = `task-${Date.now()}-${M}`,
              ce = Pn(A, K._startCellOffset || 0, k),
              Le = new Date(ce.getTime() + (K._startDayOfWeek || 0) * d);
            Le.setUTCHours(0, 0, 0, 0);
            const be = new Date(Le.getTime() + (K._durationDays || 7) * d);
            be.setUTCHours(0, 0, 0, 0),
              s.exec('add-task', {
                task: {
                  id: oe,
                  text: K.text,
                  start: Le,
                  end: be,
                  type: K.type || 'task',
                  parent: f,
                  row: K.row,
                },
                target: f,
                mode: 'child',
                skipUndo: M > 0,
              });
          }),
          w?.endBatch();
      },
      [s, k],
    );
  re(
    () =>
      D
        ? s.intercept('hotkey', (a) => {
            if (a.key === 'ctrl+c' || a.key === 'meta+c') return i(), !1;
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
    [D, s, i],
  ),
    re(() => {
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
  const S = I(
      (e, a, f) => {
        if (
          a.target.classList.contains('wx-line') ||
          (f || (f = s.getTask(Qe(e))),
          f.type === 'milestone' || f.type === 'summary')
        )
          return '';
        const d = Fe(a, 'data-segment');
        d && (e = d);
        const { left: w, width: A } = e.getBoundingClientRect(),
          K = (a.clientX - w) / A;
        let M = 0.2 / (A > 200 ? A / 200 : 1);
        return K < M ? 'start' : K > 1 - M ? 'end' : '';
      },
      [s],
    ),
    F = I(
      (e, a) => {
        const { clientX: f } = a,
          d = Qe(e),
          w = s.getTask(d),
          A = a.target.classList;
        if (
          !a.target.closest('.wx-delete-button') &&
          !a.target.closest('[data-interactive]') &&
          !n
        ) {
          if (A.contains('wx-progress-marker')) {
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
            const K = S(e, a, w) || 'move',
              M = {
                id: d,
                mode: K,
                x: f,
                dx: 0,
                l: w.$x,
                w: w.$w,
              };
            if (ae && w.segments?.length) {
              const oe = Fe(a, 'data-segment');
              oe && ((M.segmentIndex = oe.dataset.segment * 1), mn(w, M));
            }
            Q(M);
          }
          ve();
        }
      },
      [s, n, S, ve, ae],
    ),
    pe = I(
      (e) => {
        if (e.button !== 0 || fe) return;
        const a = Fe(e);
        if (!a && g && !n) {
          const f = b.current;
          if (!f) return;
          const d = f.getBoundingClientRect(),
            w = e.clientX - d.left,
            A = e.clientY - d.top;
          if (D) {
            const M = Ht(w, k);
            M && (($e.current = M), Re(M));
          }
          const K = {
            startX: w,
            startY: A,
            currentX: w,
            currentY: A,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          _(K), (G.current = K), ve();
          return;
        }
        if (a && g && !n && Y.length > 1) {
          const f = Qe(a);
          if (Y.some((w) => w.id === f)) {
            ye({
              startX: e.clientX,
              ids: Y.map((w) => w.id),
              tasks: Y.map((w) => {
                const A = s.getTask(w.id);
                return {
                  id: w.id,
                  start: A.start,
                  end: A.end,
                  $x: A.$x,
                  $w: A.$w,
                };
              }),
            }),
              ve();
            return;
          }
        }
        a && F(a, e);
      },
      [F, g, D, n, fe, k, Y, s, ve],
    ),
    me = I(
      (e) => {
        const a = Fe(e);
        a &&
          (l.current = setTimeout(() => {
            _e(!0), F(a, e.touches[0]);
          }, 300));
      },
      [F],
    ),
    ke = I((e) => {
      ze(e);
    }, []),
    Pe = I(() => {
      const e = G.current;
      if (e) {
        const a = We(e);
        e.ctrlKey
          ? a.forEach((f) => {
              s.exec('select-task', { id: f.id, toggle: !0, marquee: !0 });
            })
          : (Y.length > 0 && s.exec('select-task', { id: null, marquee: !0 }),
            a.forEach((f, d) => {
              s.exec('select-task', {
                id: f.id,
                toggle: d > 0,
                marquee: !0,
              });
            })),
          _(null),
          (G.current = null),
          Ce(),
          (L.current = !0);
        return;
      }
      if (ne) {
        const { ids: a, tasks: f, startX: d } = ne;
        ye(null), Ce(), (L.current = !0);
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
          (L.current = !0),
          Ce();
      } else if (J) {
        const {
          id: a,
          mode: f,
          dx: d,
          l: w,
          w: A,
          start: K,
          segment: M,
          index: oe,
        } = J;
        if ((Q(null), K)) {
          const ce = Math.round(d / Z);
          if (!ce)
            s.exec('drag-task', {
              id: a,
              width: A,
              left: w,
              inProgress: !1,
              ...(M && { segmentIndex: oe }),
            });
          else {
            let Le = {},
              be = s.getTask(a);
            M && (be = be.segments[oe]);
            const Ie = 1440 * 60 * 1e3,
              Oe =
                ce *
                (ee === 'week'
                  ? 7
                  : ee === 'month'
                    ? 30
                    : ee === 'quarter'
                      ? 91
                      : ee === 'year'
                        ? 365
                        : 1) *
                Ie;
            f === 'move'
              ? ((Le.start = new Date(be.start.getTime() + Oe)),
                (Le.end = new Date(be.end.getTime() + Oe)))
              : f === 'start'
                ? ((Le.start = new Date(be.start.getTime() + Oe)),
                  (Le.end = be.end))
                : f === 'end' &&
                  ((Le.start = be.start),
                  (Le.end = new Date(be.end.getTime() + Oe))),
              s.exec('update-task', {
                id: a,
                task: Le,
                ...(M && { segmentIndex: oe }),
              });
          }
          L.current = !0;
        }
        Ce();
      }
    }, [s, Ce, J, Z, ee]),
    tt = I(
      (e, a) => {
        const { clientX: f } = a;
        if (D && b.current) {
          const d = b.current.getBoundingClientRect();
          p.current = f - d.left;
        }
        if (fe && b.current) {
          const d = b.current.getBoundingClientRect();
          Me((w) => (w ? { ...w, currentX: f - d.left } : null));
        }
        if (T) {
          const d = b.current;
          if (!d) return;
          const w = d.getBoundingClientRect(),
            A = f - w.left,
            K = a.clientY - w.top;
          _((M) => ({
            ...M,
            currentX: A,
            currentY: K,
          })),
            G.current && ((G.current.currentX = A), (G.current.currentY = K));
          return;
        }
        if (!n)
          if (he.current) {
            const { node: d, x: w, id: A } = he.current,
              K = (he.current.dx = f - w),
              M = Math.round((K / d.offsetWidth) * 100);
            let oe = he.current.progress + M;
            (he.current.value = oe = Math.min(Math.max(0, oe), 100)),
              s.exec('update-task', {
                id: A,
                task: { progress: oe },
                inProgress: !0,
              });
          } else if (J) {
            ke(null);
            const {
                mode: d,
                l: w,
                w: A,
                x: K,
                id: M,
                start: oe,
                segment: ce,
                index: Le,
              } = J,
              be = s.getTask(M),
              Ie = f - K,
              Ve = Math.round(Z) || 1;
            if (
              (!oe && Math.abs(Ie) < 20) ||
              (d === 'start' && A - Ie < Ve) ||
              (d === 'end' && A + Ie < Ve) ||
              (d === 'move' &&
                ((Ie < 0 && w + Ie < 0) || (Ie > 0 && w + A + Ie > z))) ||
              (J.segment && !gn(be, J))
            )
              return;
            const Oe = { ...J, dx: Ie };
            let Ye, Be;
            if (
              (d === 'start'
                ? ((Ye = w + Ie), (Be = A - Ie))
                : d === 'end'
                  ? ((Ye = w), (Be = A + Ie))
                  : d === 'move' && ((Ye = w + Ie), (Be = A)),
              s.exec('drag-task', {
                id: M,
                width: Be,
                left: Ye,
                inProgress: !0,
                start: oe,
                ...(ce && { segmentIndex: Le }),
              }),
              !Oe.start &&
                ((d === 'move' && be.$x == w) || (d !== 'move' && be.$w == A)))
            ) {
              (L.current = !0), Pe();
              return;
            }
            (Oe.start = !0), Q(Oe);
          } else {
            const d = Fe(e);
            if (d) {
              const w = s.getTask(Qe(d)),
                K = Fe(e, 'data-segment') || d,
                M = S(K, a, w);
              K.style.cursor = M && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [s, n, J, Z, z, S, ke, Pe],
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
  re(
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
    nt = I((e, a) => Ft[(e ? 1 : 0) + (a ? 0 : 2)], []),
    st = I(
      (e, a) => {
        const f = N.id,
          d = N.start;
        return e === f
          ? !0
          : !!W.find(
              (w) => w.target == e && w.source == f && w.type === nt(d, a),
            );
      },
      [N, P, nt],
    ),
    wt = I(() => {
      N && de(null);
    }, [N]),
    qt = I(
      (e) => {
        if (L.current) {
          L.current = !1;
          return;
        }
        if (fe && fe.currentX != null) {
          const f = Ht(fe.currentX, k);
          f && m(f, fe.tasks, fe.parent), Me(null);
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const a = Ze(e.target);
        if (a) {
          const f = e.target.classList;
          if (f.contains('wx-link')) {
            const d = f.contains('wx-left');
            if (!N) {
              de({ id: a, start: d });
              return;
            }
            N.id !== a &&
              !st(a, d) &&
              s.exec('add-link', {
                link: {
                  source: N.id,
                  target: a,
                  type: nt(N.start, d),
                },
              });
          } else if (f.contains('wx-delete-button-icon'))
            s.exec('delete-link', { id: Ge }), ze(null);
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
      [s, N, P, Ee, st, nt, wt],
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
    pt = R(() => h.map((e) => e.id), [h]),
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
        s.exec(e.action, e.data);
      },
      [s],
    ),
    at = I((e) => q && E.byId(e).$critical, [q, E]),
    vt = I(
      (e) => {
        if (we?.auto) {
          const a = E.getSummaryId(e, !0),
            f = E.getSummaryId(N.id, !0);
          return (
            N?.id &&
            !(Array.isArray(a) ? a : [a]).includes(N.id) &&
            !(Array.isArray(f) ? f : [f]).includes(e)
          );
        }
        return N;
      },
      [we, E, N],
    );
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${ue.length ? ue[0].$h : 0}px` },
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
        onSelectLink: ke,
        selectedLink: Ee,
        readonly: n,
      }),
      ue.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const a = U.has(e.id),
          f =
            `wx-bar wx-${xt(e.type)}` +
            (He && J && e.id === J.id ? ' wx-touch' : '') +
            (N && N.id === e.id ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (ae && e.segments ? ' wx-split' : '') +
            (a ? ' wx-collision' : ''),
          d =
            'wx-link wx-left' +
            (N ? ' wx-visible' : '') +
            (!N || (!st(e.id, !0) && vt(e.id)) ? ' wx-target' : '') +
            (N && N.id === e.id && N.start ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : ''),
          w =
            'wx-link wx-right' +
            (N ? ' wx-visible' : '') +
            (!N || (!st(e.id, !1) && vt(e.id)) ? ' wx-target' : '') +
            (N && N.id === e.id && !N.start ? ' wx-selected' : '') +
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
                  tabIndex: ie === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === Ee?.target && Ee?.type[2] === 's'
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
                            e.progress && !(ae && e.segments)
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
                            !(ae && e.segments) &&
                            !(e.type == 'summary' && xe?.autoProgress)
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
                              : ae && e.segments
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
                      : e.id === Ee?.target && Ee?.type[2] === 'e'
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
                    H &&
                      e.type === 'summary' &&
                      (() => {
                        const A = H.get(e.id),
                          K = Math.floor(e.$x / Z),
                          M = Math.ceil((e.$x + e.$w) / Z);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: M - K }, (oe, ce) => {
                            const Le = K + ce,
                              be = A?.get(Le) || 0;
                            return /* @__PURE__ */ u(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${be === 0 ? ' wx-week-count-zero' : ''}`,
                                style: {
                                  position: 'absolute',
                                  left: `${Le * Z - e.$x}px`,
                                  width: `${Z}px`,
                                  top: 0,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: be,
                              },
                              Le,
                            );
                          }),
                        });
                      })(),
                  ],
                }),
              B && !e.$skip_baseline
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
      T &&
        (() => {
          const e = Math.min(T.startX, T.currentX),
            a = Math.min(T.startY, T.currentY),
            f = Math.abs(T.currentX - T.startX),
            d = Math.abs(T.currentY - T.startY);
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
              (Math.floor(fe.currentX / Z) + (e._startCellOffset || 0)) * Z,
            w = e._originalWidth || Z,
            A = e._originalHeight || j,
            K = Se.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: d, top: K, width: w, height: A },
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
  const { highlightTime: n, onScaleClick: r } = t,
    c = Xe(Ue),
    o = X(c, '_scales');
  return /* @__PURE__ */ u('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: o.width },
    children: (o?.rows || []).map(($, C) =>
      /* @__PURE__ */ u(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${$.height}px` },
          children: ($.cells || []).map((x, g) => {
            const D = n ? n(x.date, x.unit) : '',
              s = 'wx-cell ' + (x.css || '') + ' ' + (D || '');
            return /* @__PURE__ */ u(
              'div',
              {
                className: 'wx-ZkvhDKir ' + s,
                style: {
                  width: `${x.width}px`,
                  cursor: r ? 'pointer' : void 0,
                },
                onClick: r ? (y) => r(x.date, x.unit, y.nativeEvent) : void 0,
                children: x.value,
              },
              g,
            );
          }),
        },
        C,
      ),
    ),
  });
}
const zn = /* @__PURE__ */ new Map();
function Wn(t) {
  const n = te(null),
    r = te(0),
    c = te(null),
    o = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    r.current++,
    re(() => {
      if (o)
        return (
          cancelAnimationFrame(c.current),
          (c.current = requestAnimationFrame(() => {
            const $ = {
              label: t,
              time: performance.now() - n.current,
              renders: r.current,
              timestamp: Date.now(),
            };
            zn.set(t, $),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: $ }),
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
      cellBorders: $,
      highlightTime: C,
      onScaleClick: x,
      multiTaskRows: g = !1,
      rowMapping: D = null,
      rowHeightOverrides: s = null,
      allowTaskIntersection: y = !0,
      summaryBarCounts: V = !1,
      marqueeSelect: W = !1,
      copyPaste: P = !1,
    } = t,
    v = Xe(Ue),
    [k, h] = mt(v, '_selected'),
    B = X(v, 'scrollTop'),
    Y = X(v, 'cellHeight'),
    se = X(v, 'cellWidth'),
    q = X(v, '_scales'),
    E = X(v, '_markers'),
    we = X(v, '_scrollTask'),
    ae = X(v, 'zoom'),
    [xe, le] = ge(),
    j = te(null),
    ue = X(v, '_tasks'),
    Z = 1 + (q?.rows?.length || 0),
    ee = R(() => {
      if (!g || !D || !ue?.length) return null;
      const p = /* @__PURE__ */ new Map(),
        L = /* @__PURE__ */ new Map(),
        N = [];
      return (
        ue.forEach((de) => {
          const J = D.taskRows.get(de.id) ?? de.id;
          L.has(J) || (L.set(J, N.length), N.push(J));
        }),
        ue.forEach((de) => {
          const J = D.taskRows.get(de.id) ?? de.id,
            Q = L.get(J) ?? 0;
          p.set(de.id, Q * Y);
        }),
        p
      );
    }, [ue, g, D, Y]),
    U = R(() => {
      const p = [];
      return (
        k &&
          k.length &&
          Y &&
          k.forEach((L) => {
            const N = ee?.get(L.id) ?? L.$y;
            p.push({ height: `${Y}px`, top: `${N - 3}px` });
          }),
        p
      );
    }, [h, Y, ee]),
    H = R(() => Math.max(xe || 0, c), [xe, c]),
    T = R(() => {
      if (
        !s ||
        !g ||
        !D ||
        !ue?.length ||
        !Object.values(s).some((N) => N !== Y)
      )
        return null;
      const L = [];
      return (
        ue.forEach((N) => {
          const de = D.taskRows.get(N.id) ?? N.id;
          L.includes(de) || L.push(de);
        }),
        L.map((N) => ({
          id: N,
          height: s[N] || Y,
        }))
      );
    }, [ue, D, s, g, Y]);
  re(() => {
    const p = j.current;
    p && typeof B == 'number' && (p.scrollTop = g ? 0 : B);
  }, [B, g]);
  const _ = () => {
    G();
  };
  function G(p) {
    const L = j.current;
    if (!L) return;
    const N = {};
    (N.left = L.scrollLeft), v.exec('scroll-chart', N);
  }
  function ne() {
    const p = j.current,
      N = Math.ceil((xe || 0) / (Y || 1)) + 1,
      de = Math.floor(((p && p.scrollTop) || 0) / (Y || 1)),
      J = Math.max(0, de - Z),
      Q = de + N + Z,
      he = J * (Y || 0);
    v.exec('render-data', {
      start: J,
      end: Q,
      from: he,
    });
  }
  re(() => {
    ne();
  }, [xe, B]);
  const ye = I(
    (p) => {
      if (!p) return;
      const { id: L, mode: N } = p;
      if (N.toString().indexOf('x') < 0) return;
      const de = j.current;
      if (!de) return;
      const { clientWidth: J } = de,
        Q = v.getTask(L);
      if (Q.$x + Q.$w < de.scrollLeft)
        v.exec('scroll-chart', { left: Q.$x - (se || 0) }),
          (de.scrollLeft = Q.$x - (se || 0));
      else if (Q.$x >= J + de.scrollLeft) {
        const he = J < Q.$w ? se || 0 : Q.$w;
        v.exec('scroll-chart', { left: Q.$x - J + he }),
          (de.scrollLeft = Q.$x - J + he);
      }
    },
    [v, se],
  );
  re(() => {
    ye(we);
  }, [we]);
  function fe(p) {
    if (ae && (p.ctrlKey || p.metaKey)) {
      p.preventDefault();
      const L = j.current,
        N = -Math.sign(p.deltaY),
        de = p.clientX - (L ? L.getBoundingClientRect().left : 0);
      v.exec('zoom-scale', {
        dir: N,
        offset: de,
      });
    }
  }
  function Me(p) {
    const L = C(p.date, p.unit);
    return L
      ? {
          css: L,
          width: p.width,
        }
      : null;
  }
  const Te = R(
      () =>
        q && (q.minUnit === 'hour' || q.minUnit === 'day') && C
          ? q.rows[q.rows.length - 1].cells.map(Me)
          : null,
      [q, C],
    ),
    Re = I(
      (p) => {
        (p.eventSource = 'chart'), v.exec('hotkey', p);
      },
      [v],
    );
  re(() => {
    const p = j.current;
    if (!p) return;
    const L = () => le(p.clientHeight);
    L();
    const N = new ResizeObserver(() => L());
    return (
      N.observe(p),
      () => {
        N.disconnect();
      }
    );
  }, [j.current]);
  const $e = te(null);
  return (
    re(() => {
      const p = j.current;
      if (p && !$e.current)
        return (
          ($e.current = Wt(p, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (L) => Re(L),
          })),
          () => {
            $e.current?.destroy(), ($e.current = null);
          }
        );
    }, []),
    re(() => {
      const p = j.current;
      if (!p) return;
      const L = fe;
      return (
        p.addEventListener('wheel', L),
        () => {
          p.removeEventListener('wheel', L);
        }
      );
    }, [fe]),
    Wn('chart'),
    /* @__PURE__ */ Ae('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: j,
      onScroll: _,
      children: [
        /* @__PURE__ */ u(_n, { highlightTime: C, onScaleClick: x, scales: q }),
        E && E.length
          ? /* @__PURE__ */ u('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${H}px` },
              children: E.map((p, L) =>
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
                  L,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ Ae('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${r}px`, height: `${H}px` },
          children: [
            Te
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: Te.map((p, L) =>
                    p
                      ? /* @__PURE__ */ u(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + p.css,
                            style: {
                              width: `${p.width}px`,
                              left: `${L * p.width}px`,
                            },
                          },
                          L,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ u(Nn, { borders: $, rowLayout: T }),
            k && k.length
              ? k.map((p, L) =>
                  p.$y
                    ? /* @__PURE__ */ u(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': p.id,
                          style: U[L],
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
              rowMapping: D,
              rowHeightOverrides: s,
              allowTaskIntersection: y,
              summaryBarCounts: V,
              marqueeSelect: W,
              copyPaste: P,
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
      onDisplayChange: $,
      compactMode: C,
      containerWidth: x = 0,
      leftThreshold: g = 50,
      rightThreshold: D = 50,
    } = t,
    [s, y] = ht(t.value ?? 0),
    [V, W] = ht(t.display ?? 'all');
  function P(_) {
    let G = 0;
    n == 'center' ? (G = r / 2) : n == 'before' && (G = r);
    const ne = {
      size: [r + 'px', 'auto'],
      p: [_ - G + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (c != 'x') for (let ye in ne) ne[ye] = ne[ye].reverse();
    return ne;
  }
  const [v, k] = ge(!1),
    [h, B] = ge(null),
    Y = te(0),
    se = te(),
    q = te(),
    E = te(V);
  re(() => {
    E.current = V;
  }, [V]),
    re(() => {
      h === null && s > 0 && B(s);
    }, [h, s]);
  function we(_) {
    return c == 'x' ? _.clientX : _.clientY;
  }
  const ae = I(
      (_) => {
        const G = se.current + we(_) - Y.current;
        y(G);
        let ne;
        G <= g ? (ne = 'chart') : x - G <= D ? (ne = 'grid') : (ne = 'all'),
          E.current !== ne && (W(ne), (E.current = ne)),
          q.current && clearTimeout(q.current),
          (q.current = setTimeout(() => o && o(G), 100));
      },
      [x, g, D, o],
    ),
    xe = I(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        k(!1),
        window.removeEventListener('mousemove', ae),
        window.removeEventListener('mouseup', xe);
    }, [ae]),
    le = R(
      () => (V !== 'all' ? 'auto' : c == 'x' ? 'ew-resize' : 'ns-resize'),
      [V, c],
    ),
    j = I(
      (_) => {
        (!C && (V === 'grid' || V === 'chart')) ||
          ((Y.current = we(_)),
          (se.current = s),
          k(!0),
          (document.body.style.cursor = le),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', ae),
          window.addEventListener('mouseup', xe));
      },
      [le, ae, xe, s, C, V],
    );
  function ue() {
    W('all'), h !== null && (y(h), o && o(h));
  }
  function Z(_) {
    if (C) {
      const G = V === 'chart' ? 'grid' : 'chart';
      W(G), $(G);
    } else if (V === 'grid' || V === 'chart') ue(), $('all');
    else {
      const G = _ === 'left' ? 'chart' : 'grid';
      W(G), $(G);
    }
  }
  function ee() {
    Z('left');
  }
  function U() {
    Z('right');
  }
  const H = R(() => P(s), [s, n, r, c]),
    T = [
      'wx-resizer',
      `wx-resizer-${c}`,
      `wx-resizer-display-${V}`,
      v ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-pFykzMlT ' + T,
    onMouseDown: j,
    style: { width: H.size[0], height: H.size[1], cursor: le },
    children: [
      /* @__PURE__ */ Ae('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: ee,
            }),
          }),
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: U,
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
      for (let $ of o)
        if ($.target === document.body) {
          let C = $.contentRect.width <= Xn;
          t(C);
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
      onScaleClick: $,
      onTableAPIChange: C,
      multiTaskRows: x = !1,
      rowMapping: g = null,
      rowHeightOverrides: D = null,
      allowTaskIntersection: s = !0,
      summaryBarCounts: y = !1,
      marqueeSelect: V = !1,
      copyPaste: W = !1,
    } = t,
    P = Xe(Ue),
    v = X(P, '_tasks'),
    k = X(P, '_scales'),
    h = X(P, 'cellHeight'),
    B = X(P, 'columns'),
    Y = X(P, '_scrollTask'),
    se = X(P, 'undo'),
    q = R(() => {
      if (!x) return g;
      const l = /* @__PURE__ */ new Map(),
        z = /* @__PURE__ */ new Map();
      return (
        v.forEach((O) => {
          const b = O.row ?? O.id;
          z.set(O.id, b), l.has(b) || l.set(b, []), l.get(b).push(O.id);
        }),
        { rowMap: l, taskRows: z }
      );
    }, [v, x, g]),
    [E, we] = ge(!1);
  let [ae, xe] = ge(0);
  const [le, j] = ge(0),
    [ue, Z] = ge(0),
    [ee, U] = ge(void 0),
    [H, T] = ge('all'),
    _ = te(null),
    G = I(
      (l) => {
        we(
          (z) => (
            l !== z &&
              (l
                ? ((_.current = H), H === 'all' && T('grid'))
                : (!_.current || _.current === 'all') && T('all')),
            l
          ),
        );
      },
      [H],
    );
  re(() => {
    const l = Ot(G);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [G]);
  const ne = R(() => {
    let l;
    return (
      B.every((z) => z.width && !z.flexgrow)
        ? (l = B.reduce((z, O) => z + parseInt(O.width), 0))
        : E && H === 'chart'
          ? (l = parseInt(B.find((z) => z.id === 'action')?.width) || 50)
          : (l = 440),
      (ae = l),
      l
    );
  }, [B, E, H]);
  re(() => {
    xe(ne);
  }, [ne]);
  const ye = R(() => (le ?? 0) - (ee ?? 0), [le, ee]),
    fe = R(() => k.width, [k]),
    Me = 14,
    Te = R(() => {
      let l;
      if (!x || !q) l = v.length * h;
      else {
        const z = [];
        v.forEach((O) => {
          const b = q.taskRows.get(O.id) ?? O.id;
          z.includes(b) || z.push(b);
        }),
          (l = 0);
        for (const O of z) l += (D && D[O]) || h;
      }
      return l + Me;
    }, [v, h, x, q, D]),
    Re = R(() => k.height + Te + ye, [k, Te, ye]),
    $e = R(() => ae + fe, [ae, fe]),
    p = te(null),
    L = te(!1),
    N = te(null);
  re(() => {
    const l = () => {
      (L.current = !0),
        clearTimeout(N.current),
        (N.current = setTimeout(() => {
          L.current = !1;
        }, 300));
    };
    return (
      P.on('zoom-scale', l),
      P.on('set-scale', l),
      () => {
        clearTimeout(N.current);
      }
    );
  }, [P]);
  const de = I(() => {
      Promise.resolve().then(() => {
        if (!L.current && (le ?? 0) > ($e ?? 0)) {
          const l = (le ?? 0) - ae;
          P.exec('expand-scale', { minWidth: l });
        }
      });
    }, [le, $e, ae, P]),
    J = te(de);
  (J.current = de),
    re(() => {
      let l;
      return (
        p.current &&
          ((l = new ResizeObserver(() => J.current())), l.observe(p.current)),
        () => {
          l && l.disconnect();
        }
      );
    }, [p.current]);
  const Q = te(null),
    he = te(null),
    Ge = I(() => {
      const l = Q.current;
      l &&
        P.exec('scroll-chart', {
          top: l.scrollTop,
        });
    }, [P]),
    ze = te({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  re(() => {
    ze.current = {
      rTasks: v,
      rScales: k,
      rCellHeight: h,
      scrollSize: ye,
      ganttDiv: Q.current,
      ganttHeight: ue ?? 0,
    };
  }, [v, k, h, ye, ue]);
  const Ee = I(
    (l) => {
      if (!l) return;
      const {
        rTasks: z,
        rScales: O,
        rCellHeight: b,
        scrollSize: Ne,
        ganttDiv: ie,
        ganttHeight: ve,
      } = ze.current;
      if (!ie) return;
      const { id: Ce } = l,
        De = z.findIndex((Se) => Se.id === Ce);
      if (De > -1) {
        const Se = ve - O.height,
          We = De * b,
          i = ie.scrollTop;
        let m = null;
        We < i ? (m = We) : We + b > i + Se && (m = We - Se + b + Ne),
          m !== null &&
            (P.exec('scroll-chart', { top: Math.max(m, 0) }),
            (Q.current.scrollTop = Math.max(m, 0)));
      }
    },
    [P],
  );
  re(() => {
    Ee(Y);
  }, [Y]),
    re(() => {
      const l = Q.current,
        z = he.current;
      if (!l || !z) return;
      const O = () => {
          Cn(() => {
            Z(l.offsetHeight), j(l.offsetWidth), U(z.offsetWidth);
          });
        },
        b = new ResizeObserver(O);
      return b.observe(l), () => b.disconnect();
    }, [Q.current]);
  const He = te(null),
    _e = te(null);
  return (
    re(() => {
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
              'ctrl+z': se,
              'ctrl+y': se,
            },
            exec: (z) => {
              z.isInput || P.exec('hotkey', z);
            },
          })),
          () => {
            _e.current?.destroy(), (_e.current = null);
          }
        );
    }, [se]),
    /* @__PURE__ */ u('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: Q,
      onScroll: Ge,
      children: /* @__PURE__ */ u('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: Re, width: '100%' },
        ref: he,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: ue,
            width: ee,
          },
          children: /* @__PURE__ */ Ae('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: He,
            children: [
              B.length
                ? /* @__PURE__ */ Ae(et, {
                    children: [
                      /* @__PURE__ */ u(Ln, {
                        display: H,
                        compactMode: E,
                        columnWidth: ne,
                        width: ae,
                        readonly: r,
                        fullHeight: Te,
                        onTableAPIChange: C,
                        multiTaskRows: x,
                        rowMapping: q,
                        rowHeightOverrides: D,
                      }),
                      /* @__PURE__ */ u(Yn, {
                        value: ae,
                        display: H,
                        compactMode: E,
                        containerWidth: le,
                        onMove: (l) => xe(l),
                        onDisplayChange: (l) => T(l),
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
                  onScaleClick: $,
                  multiTaskRows: x,
                  rowMapping: q,
                  rowHeightOverrides: D,
                  allowTaskIntersection: s,
                  summaryBarCounts: y,
                  marqueeSelect: V,
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
      selected: $ = es,
      activeTask: C = null,
      links: x = ts,
      scales: g = Qn,
      columns: D = yn,
      start: s = null,
      end: y = null,
      lengthUnit: V = 'day',
      durationUnit: W = 'day',
      cellWidth: P = 100,
      cellHeight: v = 38,
      scaleHeight: k = 36,
      readonly: h = !1,
      cellBorders: B = 'full',
      zoom: Y = !1,
      baselines: se = !1,
      highlightTime: q = null,
      onScaleClick: E = null,
      init: we = null,
      autoScale: ae = !0,
      unscheduledTasks: xe = !1,
      criticalPath: le = null,
      schedule: j = ns,
      projectStart: ue = null,
      projectEnd: Z = null,
      calendar: ee = null,
      undo: U = !1,
      splitTasks: H = !1,
      multiTaskRows: T = !1,
      rowHeightOverrides: _ = null,
      allowTaskIntersection: G = !0,
      summaryBarCounts: ne = !1,
      marqueeSelect: ye = !1,
      copyPaste: fe = !1,
      summary: Me = null,
      _export: Te = !1,
      ...Re
    },
    $e,
  ) {
    const p = te();
    p.current = Re;
    const L = R(() => new wn(kn), []),
      N = R(() => ({ ...gt, ...it }), []),
      de = Xe(Ke.i18n),
      J = R(() => (de ? de.extend(N, !0) : lt(N)), [de, N]),
      Q = R(() => J.getRaw().calendar, [J]),
      he = R(() => {
        let ie = {
          zoom: Un(Y, Q),
          scales: Yt(g, Q),
          columns: qn(D, Q),
          links: pn(x),
          cellWidth: P,
        };
        return (
          ie.zoom &&
            (ie = {
              ...ie,
              ...xn(ie.zoom, Fn(Q, J.getGroup('gantt')), ie.scales, P),
            }),
          ie
        );
      }, [Y, g, D, x, P, Q, J]),
      Ge = te(null);
    Ge.current !== o &&
      (Te || Ct(o, { durationUnit: W, splitTasks: H, calendar: ee }),
      (Ge.current = o)),
      re(() => {
        Te || Ct(o, { durationUnit: W, splitTasks: H, calendar: ee });
      }, [o, W, ee, H, Te]);
    const ze = R(() => {
        if (!T) return null;
        const ie = /* @__PURE__ */ new Map(),
          ve = /* @__PURE__ */ new Map(),
          Ce = (De) => {
            De.forEach((Se) => {
              const We = Se.row ?? Se.id;
              ve.set(Se.id, We),
                ie.has(We) || ie.set(We, []),
                ie.get(We).push(Se.id),
                Se.data && Se.data.length > 0 && Ce(Se.data);
            });
          };
        return Ce(o), { rowMap: ie, taskRows: ve };
      }, [o, T]),
      Ee = R(() => L.in, [L]),
      He = te(null);
    He.current === null &&
      ((He.current = new fn((ie, ve) => {
        const Ce = 'on' + jn(ie);
        p.current && p.current[Ce] && p.current[Ce](ve);
      })),
      Ee.setNext(He.current));
    const [_e, l] = ge(null),
      z = te(null);
    z.current = _e;
    const O = R(
      () => ({
        getState: L.getState.bind(L),
        getReactiveState: L.getReactive.bind(L),
        getStores: () => ({ data: L }),
        exec: Ee.exec.bind(Ee),
        setNext: (ie) => ((He.current = He.current.setNext(ie)), He.current),
        intercept: Ee.intercept.bind(Ee),
        on: Ee.on.bind(Ee),
        detach: Ee.detach.bind(Ee),
        getTask: L.getTask.bind(L),
        serialize: () => L.serialize(),
        getTable: (ie) =>
          ie
            ? new Promise((ve) => setTimeout(() => ve(z.current), 1))
            : z.current,
        getHistory: () => L.getHistory(),
      }),
      [L, Ee],
    );
    re(() => {
      const ie = () => {
        const { zoom: ve, scales: Ce } = O.getState(),
          Se = ve?.levels?.[ve.level]?.scales?.[0]?.unit ?? Ce?.[0]?.unit;
        Se && O.exec('scale-change', { level: ve?.level, unit: Se });
      };
      O.on('zoom-scale', ie), O.on('set-scale', ie);
    }, [O]),
      re(() => {
        O.intercept('set-scale', ({ unit: ie, date: ve }) => {
          const { zoom: Ce } = O.getState();
          if (!Ce || !Ce.levels) return !1;
          const De = Ce.levels.findIndex((i) =>
            i.scales.some((m) => m.unit === ie),
          );
          if (De < 0) return !1;
          const Se = Ce.levels[De];
          if (De !== Ce.level) {
            const i = Math.round((Se.minCellWidth + Se.maxCellWidth) / 2);
            O.getStores().data.setState({
              scales: Se.scales,
              cellWidth: i,
              _cellWidth: i,
              zoom: { ...Ce, level: De },
              ...(ve ? { _scaleDate: ve, _zoomOffset: 0 } : {}),
            });
          } else if (ve) {
            const { _scales: i, cellWidth: m } = O.getState(),
              S = i.diff(ve, i.start, i.lengthUnit),
              F = Math.max(0, Math.round(S * m));
            O.exec('scroll-chart', { left: F });
          }
          return !1;
        });
      }, [O]),
      Pt(
        $e,
        () => ({
          ...O,
        }),
        [O],
      );
    const b = te(0);
    re(() => {
      b.current
        ? L.init({
            tasks: o,
            links: he.links,
            start: s,
            columns: he.columns,
            end: y,
            lengthUnit: V,
            cellWidth: he.cellWidth,
            cellHeight: v,
            scaleHeight: k,
            scales: he.scales,
            taskTypes: c,
            zoom: he.zoom,
            selected: $,
            activeTask: C,
            baselines: se,
            autoScale: ae,
            unscheduledTasks: xe,
            markers: r,
            durationUnit: W,
            criticalPath: le,
            schedule: j,
            projectStart: ue,
            projectEnd: Z,
            calendar: ee,
            undo: U,
            _weekStart: Q.weekStart,
            splitTasks: H,
            summary: Me,
          })
        : we && we(O),
        b.current++;
    }, [
      O,
      we,
      o,
      he,
      s,
      y,
      V,
      v,
      k,
      c,
      $,
      C,
      se,
      ae,
      xe,
      r,
      W,
      le,
      j,
      ue,
      Z,
      ee,
      U,
      Q,
      H,
      Me,
      L,
    ]),
      b.current === 0 &&
        L.init({
          tasks: o,
          links: he.links,
          start: s,
          columns: he.columns,
          end: y,
          lengthUnit: V,
          cellWidth: he.cellWidth,
          cellHeight: v,
          scaleHeight: k,
          scales: he.scales,
          taskTypes: c,
          zoom: he.zoom,
          selected: $,
          activeTask: C,
          baselines: se,
          autoScale: ae,
          unscheduledTasks: xe,
          markers: r,
          durationUnit: W,
          criticalPath: le,
          schedule: j,
          projectStart: ue,
          projectEnd: Z,
          calendar: ee,
          undo: U,
          _weekStart: Q.weekStart,
          splitTasks: H,
          summary: Me,
        });
    const Ne = R(
      () =>
        ee
          ? (ie, ve) =>
              (ve == 'day' && !ee.getDayHours(ie)) ||
              (ve == 'hour' && !ee.getDayHours(ie))
                ? 'wx-weekend'
                : ''
          : q,
      [ee, q],
    );
    return /* @__PURE__ */ u(Ke.i18n.Provider, {
      value: J,
      children: /* @__PURE__ */ u(Ue.Provider, {
        value: O,
        children: /* @__PURE__ */ u(Bn, {
          taskTemplate: n,
          readonly: h,
          cellBorders: B,
          highlightTime: Ne,
          onScaleClick: E,
          onTableAPIChange: l,
          multiTaskRows: T,
          rowMapping: ze,
          rowHeightOverrides: _,
          allowTaskIntersection: G,
          summaryBarCounts: ne,
          marqueeSelect: ye,
          copyPaste: fe,
        }),
      }),
    });
  });
function Ts({ api: t = null, items: n = [] }) {
  const r = Xe(Ke.i18n),
    c = R(() => r || lt(it), [r]),
    o = R(() => c.getGroup('gantt'), [c]),
    $ = qe(t, '_selected'),
    C = qe(t, 'undo'),
    x = qe(t, 'history'),
    g = qe(t, 'splitTasks'),
    D = ['undo', 'redo'],
    s = R(() => {
      const V = Mt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : Mt({
              undo: C,
              splitTasks: g,
            })
      ).map((P) => {
        let v = { ...P, disabled: !1 };
        return (
          (v.handler = zt(V, v.id) ? (k) => _t(t, k.id, null, o) : v.handler),
          v.text && (v.text = o(v.text)),
          v.menuText && (v.menuText = o(v.menuText)),
          v
        );
      });
    }, [n, t, o, C, g]),
    y = R(() => {
      const V = [];
      return (
        s.forEach((W) => {
          const P = W.id;
          if (P === 'add-task') V.push(W);
          else if (D.includes(P))
            D.includes(P) &&
              V.push({
                ...W,
                disabled: W.isDisabled(x),
              });
          else {
            if (!$?.length || !t) return;
            V.push({
              ...W,
              disabled:
                W.isDisabled && $.some((v) => W.isDisabled(v, t.getState())),
            });
          }
        }),
        V.filter((W, P) => {
          if (t && W.isHidden)
            return !$.some((v) => W.isHidden(v, t.getState()));
          if (W.comp === 'separator') {
            const v = V[P + 1];
            if (!v || v.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, $, x, s]);
  return r
    ? /* @__PURE__ */ u(Et, { items: y })
    : /* @__PURE__ */ u(Ke.i18n.Provider, {
        value: c,
        children: /* @__PURE__ */ u(Et, { items: y }),
      });
}
const $s = At(function (
  {
    options: n = [],
    api: r = null,
    resolver: c = null,
    filter: o = null,
    at: $ = 'point',
    children: C,
    onClick: x,
    css: g,
  },
  D,
) {
  const s = te(null),
    y = te(null),
    V = Xe(Ke.i18n),
    W = R(() => V || lt({ ...it, ...gt }), [V]),
    P = R(() => W.getGroup('gantt'), [W]),
    v = qe(r, 'taskTypes'),
    k = qe(r, 'selected'),
    h = qe(r, '_selected'),
    B = qe(r, 'splitTasks'),
    Y = qe(r, 'summary'),
    se = R(
      () => ({
        splitTasks: B,
        taskTypes: v,
        summary: Y,
      }),
      [B, v, Y],
    ),
    q = R(() => Rt(se), [se]);
  re(() => {
    r &&
      (r.on('scroll-chart', () => {
        s.current && s.current.show && s.current.show();
      }),
      r.on('drag-task', () => {
        s.current && s.current.show && s.current.show();
      }));
  }, [r]);
  function E(U) {
    return U.map(
      (H) => (
        (H = { ...H }),
        H.text && (H.text = P(H.text)),
        H.subtext && (H.subtext = P(H.subtext)),
        H.data && (H.data = E(H.data)),
        H
      ),
    );
  }
  function we() {
    const U = n.length ? n : Rt(se);
    return E(U);
  }
  const ae = R(() => we(), [r, n, se, P]),
    xe = R(() => (h && h.length ? h : []), [h]),
    le = I(
      (U, H) => {
        let T = U ? r?.getTask(U) : null;
        if (c) {
          const _ = c(U, H);
          T = _ === !0 ? T : _;
        }
        if (T) {
          const _ = Ze(H.target, 'data-segment');
          _ !== null
            ? (y.current = { id: T.id, segmentIndex: _ })
            : (y.current = T.id),
            (!Array.isArray(k) || !k.includes(T.id)) &&
              r &&
              r.exec &&
              r.exec('select-task', { id: T.id });
        }
        return T;
      },
      [r, c, k],
    ),
    j = I(
      (U) => {
        const H = U.action;
        H && (zt(q, H.id) && _t(r, H.id, y.current, P), x && x(U));
      },
      [r, P, x, q],
    ),
    ue = I(
      (U, H) => {
        const T = xe.length ? xe : H ? [H] : [];
        let _ = o ? T.every((G) => o(U, G)) : !0;
        if (
          _ &&
          (U.isHidden &&
            (_ = !T.some((G) => U.isHidden(G, r.getState(), y.current))),
          U.isDisabled)
        ) {
          const G = T.some((ne) => U.isDisabled(ne, r.getState(), y.current));
          U.disabled = G;
        }
        return _;
      },
      [o, xe, r],
    );
  Pt(D, () => ({
    show: (U, H) => {
      s.current && s.current.show && s.current.show(U, H);
    },
  }));
  const Z = I((U) => {
      s.current && s.current.show && s.current.show(U);
    }, []),
    ee = /* @__PURE__ */ Ae(et, {
      children: [
        /* @__PURE__ */ u(Mn, {
          filter: ue,
          options: ae,
          dataKey: 'id',
          resolver: le,
          onClick: j,
          at: $,
          ref: s,
          css: g,
        }),
        /* @__PURE__ */ u('span', {
          onContextMenu: Z,
          'data-menu-ignore': 'true',
          children: typeof C == 'function' ? C() : C,
        }),
      ],
    });
  if (!V && Ke.i18n?.Provider) {
    const U = Ke.i18n.Provider;
    return /* @__PURE__ */ u(U, { value: W, children: ee });
  }
  return ee;
});
function ss({ api: t, autoSave: n, onLinksChange: r }) {
  const o = Xe(Ke.i18n).getGroup('gantt'),
    $ = X(t, 'activeTask'),
    C = X(t, '_activeTask'),
    x = X(t, '_links'),
    g = X(t, 'schedule'),
    D = X(t, 'unscheduledTasks'),
    [s, y] = ge();
  function V() {
    if ($) {
      const k = x
          .filter((B) => B.target == $)
          .map((B) => ({ link: B, task: t.getTask(B.source) })),
        h = x
          .filter((B) => B.source == $)
          .map((B) => ({ link: B, task: t.getTask(B.target) }));
      return [
        { title: o('Predecessors'), data: k },
        { title: o('Successors'), data: h },
      ];
    }
  }
  re(() => {
    y(V());
  }, [$, x]);
  const W = R(
    () => [
      { id: 'e2s', label: o('End-to-start') },
      { id: 's2s', label: o('Start-to-start') },
      { id: 'e2e', label: o('End-to-end') },
      { id: 's2e', label: o('Start-to-end') },
    ],
    [o],
  );
  function P(k) {
    n
      ? t.exec('delete-link', { id: k })
      : (y((h) =>
          (h || []).map((B) => ({
            ...B,
            data: B.data.filter((Y) => Y.link.id !== k),
          })),
        ),
        r &&
          r({
            id: k,
            action: 'delete-link',
            data: { id: k },
          }));
  }
  function v(k, h) {
    n
      ? t.exec('update-link', {
          id: k,
          link: h,
        })
      : (y((B) =>
          (B || []).map((Y) => ({
            ...Y,
            data: Y.data.map((se) =>
              se.link.id === k ? { ...se, link: { ...se.link, ...h } } : se,
            ),
          })),
        ),
        r &&
          r({
            id: k,
            action: 'update-link',
            data: {
              id: k,
              link: h,
            },
          }));
  }
  return /* @__PURE__ */ u(et, {
    children: (s || []).map((k, h) =>
      k.data.length
        ? /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ u(Ke.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ u(en, {
                  label: k.title,
                  position: 'top',
                  children: /* @__PURE__ */ u('table', {
                    children: /* @__PURE__ */ u('tbody', {
                      children: k.data.map((B) =>
                        /* @__PURE__ */ Ae(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: B.task.text || '',
                                }),
                              }),
                              g?.auto && B.link.type === 'e2s'
                                ? /* @__PURE__ */ u('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ u(tn, {
                                      type: 'number',
                                      placeholder: o('Lag'),
                                      value: B.link.lag,
                                      disabled: D && C?.unscheduled,
                                      onChange: (Y) => {
                                        Y.input ||
                                          v(B.link.id, { lag: Y.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ u(nn, {
                                    value: B.link.type,
                                    placeholder: o('Select link type'),
                                    options: W,
                                    onChange: (Y) =>
                                      v(B.link.id, { type: Y.value }),
                                    children: ({ option: Y }) => Y.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => P(B.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          B.link.id,
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
  const { value: n, time: r, format: c, onchange: o, onChange: $, ...C } = t,
    x = $ ?? o;
  function g(D) {
    const s = new Date(D.value);
    s.setHours(n.getHours()),
      s.setMinutes(n.getMinutes()),
      x && x({ value: s });
  }
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ u(sn, {
        ...C,
        value: n,
        onChange: g,
        format: c,
        buttons: ['today'],
        clear: !1,
      }),
      r ? /* @__PURE__ */ u(rn, { value: n, onChange: x, format: c }) : null,
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
  placement: $ = 'sidebar',
  bottomBar: C = !0,
  topBar: x = !0,
  autoSave: g = !0,
  focus: D = !1,
  hotkeys: s = {},
}) {
  const y = Xe(Ke.i18n),
    V = R(() => y || lt({ ...it, ...gt }), [y]),
    W = R(() => V.getGroup('gantt'), [V]),
    P = V.getRaw(),
    v = R(() => {
      const l = P.gantt?.dateFormat || P.formats?.dateFormat;
      return ot(l, P.calendar);
    }, [P]),
    k = R(() => {
      if (x === !0 && !o) {
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
        return g
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
      return x;
    }, [x, o, g, W]),
    [h, B] = ge(!1),
    Y = R(() => (h ? 'wx-full-screen' : ''), [h]),
    se = I((l) => {
      B(l);
    }, []);
  re(() => {
    const l = Ot(se);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [se]);
  const q = X(t, '_activeTask'),
    E = X(t, 'activeTask'),
    we = X(t, 'unscheduledTasks'),
    ae = X(t, 'summary'),
    xe = X(t, 'links'),
    le = X(t, 'splitTasks'),
    j = R(() => le && E?.segmentIndex, [le, E]),
    ue = R(() => j || j === 0, [j]),
    Z = X(t, 'taskTypes'),
    ee = R(
      () => bn({ unscheduledTasks: we, summary: ae, taskTypes: Z }),
      [we, ae, Z],
    ),
    U = X(t, 'undo'),
    [H, T] = ge({}),
    [_, G] = ge(null),
    [ne, ye] = ge(),
    [fe, Me] = ge(null),
    Te = R(() => {
      if (!q) return null;
      let l;
      if ((ue && q.segments ? (l = { ...q.segments[j] }) : (l = { ...q }), o)) {
        let z = { parent: l.parent };
        return (
          ee.forEach(({ key: O, comp: b }) => {
            if (b !== 'links') {
              const Ne = l[O];
              b === 'date' && Ne instanceof Date
                ? (z[O] = v(Ne))
                : b === 'slider' && O === 'progress'
                  ? (z[O] = `${Ne}%`)
                  : (z[O] = Ne);
            }
          }),
          z
        );
      }
      return l || null;
    }, [q, ue, j, o, ee, v]);
  re(() => {
    ye(Te);
  }, [Te]),
    re(() => {
      T({}), Me(null), G(null);
    }, [E]);
  function Re(l, z) {
    return l.map((O) => {
      const b = { ...O };
      if (
        (O.config && (b.config = { ...b.config }),
        b.comp === 'links' &&
          t &&
          ((b.api = t), (b.autoSave = g), (b.onLinksChange = L)),
        b.comp === 'select' && b.key === 'type')
      ) {
        const Ne = b.options ?? [];
        b.options = Ne.map((ie) => ({
          ...ie,
          label: W(ie.label),
        }));
      }
      return (
        b.comp === 'slider' &&
          b.key === 'progress' &&
          (b.labelTemplate = (Ne) => `${W(b.label)} ${Ne}%`),
        b.label && (b.label = W(b.label)),
        b.config?.placeholder &&
          (b.config.placeholder = W(b.config.placeholder)),
        z &&
          (b.isDisabled && b.isDisabled(z, t.getState())
            ? (b.disabled = !0)
            : delete b.disabled),
        b
      );
    });
  }
  const $e = R(() => {
      let l = n.length ? n : ee;
      return (
        (l = Re(l, ne)),
        ne ? l.filter((z) => !z.isHidden || !z.isHidden(ne, t.getState())) : l
      );
    }, [n, ee, ne, W, t, g]),
    p = R(() => $e.map((l) => l.key), [$e]);
  function L({ id: l, action: z, data: O }) {
    T((b) => ({
      ...b,
      [l]: { action: z, data: O },
    }));
  }
  const N = I(() => {
      for (let l in H)
        if (xe.byId(l)) {
          const { action: z, data: O } = H[l];
          t.exec(z, O);
        }
    }, [t, H, xe]),
    de = I(() => {
      const l = E?.id || E;
      if (ue) {
        if (q?.segments) {
          const z = q.segments.filter((O, b) => b !== j);
          t.exec('update-task', {
            id: l,
            task: { segments: z },
          });
        }
      } else t.exec('delete-task', { id: l });
    }, [t, E, ue, q, j]),
    J = I(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    Q = I(
      (l) => {
        const { item: z, changes: O } = l;
        z.id === 'delete' && de(),
          z.id === 'save' && (O.length ? J() : N()),
          z.comp && J();
      },
      [t, E, g, N, de, J],
    ),
    he = I(
      (l, z, O) => (
        we && l.type === 'summary' && (l.unscheduled = !1),
        Gt(l, t.getState(), z),
        O || G(!1),
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
        const z = {
          id: E?.id || E,
          task: l,
          ...(ue && { segmentIndex: j }),
        };
        g && _ && (z.inProgress = _), t.exec('update-task', z), g || N();
      },
      [t, E, we, g, N, p, ue, j, _],
    ),
    ze = I(
      (l) => {
        let { update: z, key: O, input: b } = l;
        if ((b && G(!0), (l.update = he({ ...z }, O, b)), !g)) ye(l.update);
        else if (!fe && !b) {
          const Ne = $e.find((Ce) => Ce.key === O),
            ie = z[O];
          (!Ne.validation || Ne.validation(ie)) &&
            (!Ne.required || ie) &&
            Ge(l.update);
        }
      },
      [g, he, fe, $e, Ge],
    ),
    Ee = I(
      (l) => {
        g || Ge(l.values);
      },
      [g, Ge],
    ),
    He = I((l) => {
      Me(l.errors);
    }, []),
    _e = R(
      () =>
        U
          ? {
              'ctrl+z': (l) => {
                l.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (l) => {
                l.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [U, t],
    );
  return Te
    ? /* @__PURE__ */ u(on, {
        children: /* @__PURE__ */ u(Rn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${Y} ${r}`,
          items: $e,
          values: Te,
          topBar: k,
          bottomBar: C,
          placement: $,
          layout: c,
          readonly: o,
          autoSave: g,
          focus: D,
          onAction: Q,
          onSave: Ee,
          onValidation: He,
          onChange: ze,
          hotkeys: s && { ..._e, ...s },
        }),
      })
    : null;
}
const Ms = ({ children: t, columns: n = null, api: r }) => {
  const [c, o] = ge(null);
  return (
    re(() => {
      r && r.getTable(!0).then(o);
    }, [r]),
    /* @__PURE__ */ u($n, { api: c, columns: n, children: t })
  );
};
function Rs(t) {
  const { api: n, content: r, children: c } = t,
    o = te(null),
    $ = te(null),
    [C, x] = ge({}),
    [g, D] = ge(null),
    [s, y] = ge(null),
    [V, W] = ge(!1),
    P = te(null),
    v = te(!1),
    k = te(null),
    h = te(null),
    B = 300,
    Y = 400;
  function se(T) {
    for (; T; ) {
      if (T.getAttribute) {
        const _ = T.getAttribute('data-tooltip-id'),
          G = T.getAttribute('data-tooltip-at'),
          ne = T.getAttribute('data-tooltip');
        if (_ || ne) return { id: _, tooltip: ne, target: T, at: G };
      }
      T = T.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  re(() => {
    const T = $.current;
    if (!V && T && s && (s.text || r)) {
      const _ = T.getBoundingClientRect();
      let G = !1,
        ne = s.left,
        ye = s.top;
      _.right >= C.right && ((ne = C.width - _.width - 5), (G = !0)),
        _.bottom >= C.bottom &&
          ((ye = s.top - (_.bottom - C.bottom + 2)), (G = !0)),
        G && y((fe) => fe && { ...fe, left: ne, top: ye });
    }
  }, [s, C, r, V]);
  const q = I(() => {
      clearTimeout(k.current),
        clearTimeout(h.current),
        (k.current = null),
        (h.current = null),
        (P.current = null),
        (v.current = !1),
        y(null),
        D(null),
        W(!1);
    }, []),
    E = I(() => {
      clearTimeout(h.current),
        (h.current = setTimeout(() => {
          (h.current = null), !P.current && !v.current && q();
        }, Y));
    }, [q]),
    we = I(() => {
      clearTimeout(h.current), (h.current = null);
    }, []);
  function ae(T) {
    if ($.current && $.current.contains(T.target)) return;
    let { id: _, tooltip: G, target: ne, at: ye } = se(T.target);
    if (!_ && !G) {
      clearTimeout(k.current),
        (k.current = null),
        (P.current = null),
        !v.current && !h.current && E();
      return;
    }
    if ((we(), G || (G = ee(_)), P.current === _)) return;
    (P.current = _), clearTimeout(k.current), y(null), D(null), W(!1);
    const fe = T.clientX;
    k.current = setTimeout(() => {
      (k.current = null), _ && D(Z(U(_)));
      const Me = ne.getBoundingClientRect(),
        Te = o.current,
        Re = Te
          ? Te.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let $e, p;
      ye === 'left'
        ? (($e = Me.top + 5 - Re.top), (p = Me.right + 5 - Re.left))
        : (($e = Me.top + Me.height - Re.top), (p = fe - Re.left)),
        x(Re),
        y({ top: $e, left: p, text: G });
    }, B);
  }
  function xe() {
    (v.current = !0), we();
  }
  function le() {
    (v.current = !1), P.current || E();
  }
  function j(T) {
    const _ = T.touches[0];
    if (!_) return;
    const { id: G, target: ne } = se(T.target);
    if (!G) return;
    clearTimeout(k.current), clearTimeout(h.current);
    const ye = Z(U(G)),
      fe = ye?.text || '',
      Me = ne.getBoundingClientRect(),
      Te = o.current,
      Re = Te
        ? Te.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    D(ye),
      x(Re),
      W(!0),
      y({
        top: Me.top - Re.top - 8,
        left: _.clientX - Re.left,
        text: fe,
      });
  }
  function ue() {
    q();
  }
  function Z(T) {
    return n?.getTask(U(T)) || null;
  }
  function ee(T) {
    return Z(T)?.text || '';
  }
  function U(T) {
    const _ = Number(T);
    return Number.isFinite(_) ? _ : T;
  }
  re(
    () => () => {
      clearTimeout(k.current), clearTimeout(h.current);
    },
    [],
  );
  const H = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    V ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: ae,
    onTouchStart: j,
    onTouchEnd: ue,
    onTouchMove: ue,
    children: [
      s && (s.text || r)
        ? /* @__PURE__ */ u('div', {
            className: H,
            ref: $,
            style: { top: `${s.top}px`, left: `${s.left}px` },
            onMouseEnter: xe,
            onMouseLeave: le,
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
  _s as defaultToolbarButtons,
  zs as getEditorItems,
  Ws as getMenuOptions,
  Os as getToolbarButtons,
  Bs as registerEditorItem,
  Ys as registerScaleUnit,
  Ls as version,
};
//# sourceMappingURL=index.es.js.map
