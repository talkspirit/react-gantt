import { jsxs as Ie, jsx as u, Fragment as et } from 'react/jsx-runtime';
import {
  createContext as Zt,
  useContext as Xe,
  useMemo as $,
  useState as we,
  useCallback as N,
  useRef as se,
  useEffect as re,
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
function St(t) {
  return t && t.getAttribute('data-context-id');
}
const Dt = 5;
function Sn(t, n) {
  let r, c, o, M, k, x, m, D, s;
  function v(p) {
    (M = p.clientX),
      (k = p.clientY),
      (x = {
        ...En(r, t, p),
        y: n.getTask(o).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function V(p) {
    (r = Fe(p)),
      St(r) &&
        ((o = Qe(r)),
        (s = setTimeout(() => {
          (D = !0), n && n.touchStart && n.touchStart(), v(p.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', X),
        t.addEventListener('contextmenu', z),
        window.addEventListener('touchend', _));
  }
  function z(p) {
    if (D || s) return p.preventDefault(), !1;
  }
  function O(p) {
    p.which === 1 &&
      ((r = Fe(p)),
      St(r) &&
        ((o = Qe(r)),
        t.addEventListener('mousemove', g),
        window.addEventListener('mouseup', I),
        v(p)));
  }
  function C(p) {
    t.removeEventListener('mousemove', g),
      t.removeEventListener('touchmove', X),
      document.body.removeEventListener('mouseup', I),
      document.body.removeEventListener('touchend', _),
      (document.body.style.userSelect = ''),
      p &&
        (t.removeEventListener('mousedown', O),
        t.removeEventListener('touchstart', V));
  }
  function L(p) {
    const ue = p.clientX - M,
      oe = p.clientY - k;
    if (!c) {
      if (
        (Math.abs(ue) < Dt && Math.abs(oe) < Dt) ||
        (n && n.start && n.start({ id: o, e: p }) === !1)
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
      const fe = Math.round(Math.max(0, x.top + oe));
      if (n && n.move && n.move({ id: o, top: fe, detail: m }) === !1) return;
      const te = n.getTask(o),
        F = te.$y;
      if (!x.start && x.y == F) return G();
      (x.start = !0), (x.y = te.$y - 4), (c.style.top = fe + 'px');
      const le = document.elementFromPoint(p.clientX, p.clientY),
        Z = Fe(le);
      if (Z && Z !== r) {
        const j = Qe(Z),
          ee = Z.getBoundingClientRect(),
          H = ee.top + ee.height / 2,
          q = p.clientY + x.db > H && Z.nextElementSibling !== r,
          ie = p.clientY - x.dt < H && Z.previousElementSibling !== r;
        m?.after == j || m?.before == j
          ? (m = null)
          : q
            ? (m = { id: o, after: j })
            : ie && (m = { id: o, before: j });
      }
    }
  }
  function g(p) {
    L(p);
  }
  function X(p) {
    D
      ? (p.preventDefault(), L(p.touches[0]))
      : s && (clearTimeout(s), (s = null));
  }
  function _() {
    (D = null), s && (clearTimeout(s), (s = null)), G();
  }
  function I() {
    G();
  }
  function G() {
    r && (r.style.visibility = ''),
      c &&
        (c.parentNode.removeChild(c),
        n && n.end && n.end({ id: o, top: x.top })),
      (o = r = c = x = m = null),
      C();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', O),
    t.addEventListener('touchstart', V),
    {
      destroy() {
        C(!0);
      },
    }
  );
}
function Dn({ row: t, column: n }) {
  const r = Xe(Ue);
  function c(M, k) {
    return {
      justifyContent: k.align,
      paddingLeft: `${(M.$level - 1) * 20}px`,
    };
  }
  const o = n && n._cell;
  return /* @__PURE__ */ Ie('div', {
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
  const r = $(() => t.id, [t?.id]);
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
      onTableAPIChange: x,
      multiTaskRows: m = !1,
      rowMapping: D = null,
      rowHeightOverrides: s = null,
    } = t,
    [v, V] = ht(M),
    [z, O] = we(),
    C = Xe(Be.i18n),
    L = $(() => C.getGroup('gantt'), [C]),
    g = Xe(Ue),
    X = Y(g, 'scrollTop'),
    _ = Y(g, 'cellHeight'),
    I = Y(g, '_scrollTask'),
    G = Y(g, '_selected'),
    p = Y(g, 'area'),
    ue = Y(g, '_tasks'),
    oe = Y(g, '_scales'),
    fe = Y(g, 'columns'),
    te = Y(g, '_sort'),
    F = Y(g, 'calendar'),
    le = Y(g, 'durationUnit'),
    Z = Y(g, 'splitTasks'),
    [j, ee] = we(null),
    H = $(() => {
      if (!ue || !p) return [];
      if (m && D) {
        const i = /* @__PURE__ */ new Set();
        return ue.filter((h) => {
          const R = D.taskRows.get(h.id) ?? h.id;
          return i.has(R) ? !1 : (i.add(R), !0);
        });
      }
      return ue.slice(p.start, p.end);
    }, [ue, p, m, D]),
    q = N(
      (i, h) => {
        if (h === 'add-task')
          g.exec(h, {
            target: i,
            task: { text: L('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (h === 'open-task') {
          const R = H.find((B) => B.id === i);
          (R?.data || R?.lazy) && g.exec(h, { id: i, mode: !R.open });
        }
      },
      [H],
    ),
    ie = N(
      (i) => {
        const h = Ze(i),
          R = i.target.dataset.action;
        R && i.preventDefault(),
          h
            ? R === 'add-task' || R === 'open-task'
              ? q(h, R)
              : g.exec('select-task', {
                  id: h,
                  toggle: i.ctrlKey || i.metaKey,
                  range: i.shiftKey,
                  show: !0,
                })
            : R === 'add-task' && q(null, R);
      },
      [g, q],
    ),
    U = se(null),
    ge = se(null),
    [De, ve] = we(0),
    [Ae, Ne] = we(!1);
  re(() => {
    const i = ge.current;
    if (!i || typeof ResizeObserver > 'u') return;
    const h = () => ve(i.clientWidth);
    h();
    const R = new ResizeObserver(h);
    return R.observe(i), () => R.disconnect();
  }, []);
  const ze = se(null),
    Re = N(
      (i) => {
        const h = i.id,
          { before: R, after: B } = i,
          pe = i.onMove;
        let me = R || B,
          be = R ? 'before' : 'after';
        if (pe) {
          if (be === 'after') {
            const He = g.getTask(me);
            He.data?.length &&
              He.open &&
              ((be = 'before'), (me = He.data[0].id));
          }
          ze.current = { id: h, [be]: me };
        } else ze.current = null;
        g.exec('move-task', {
          id: h,
          mode: be,
          target: me,
          inProgress: pe,
        });
      },
      [g],
    ),
    y = $(() => p?.from ?? 0, [p]),
    E = $(() => oe?.height ?? 0, [oe]),
    S = $(
      () => (!r && o !== 'grid' ? (v ?? 0) > (c ?? 0) : (v ?? 0) > (De ?? 0)),
      [r, o, v, c, De],
    ),
    de = $(() => {
      const i = {};
      return (
        (S && o === 'all') || (o === 'grid' && S)
          ? (i.width = v)
          : o === 'grid' && (i.width = '100%'),
        i
      );
    }, [S, o, v]),
    J = $(() => (j && !H.find((i) => i.id === j.id) ? [...H, j] : H), [H, j]),
    Q = $(() => {
      let i = (fe || []).map((B) => {
        B = { ...B };
        const pe = B.header;
        if (typeof pe == 'object') {
          const me = pe.text && L(pe.text);
          B.header = { ...pe, text: me };
        } else B.header = L(pe);
        if (B.cell && B.id !== 'text' && B.id !== 'add-task') {
          const me = B.cell;
          B.cell = (be) => /* @__PURE__ */ u(me, { ...be, api: g });
        }
        return B;
      });
      const h = i.findIndex((B) => B.id === 'text'),
        R = i.findIndex((B) => B.id === 'add-task');
      if (
        (h !== -1 && (i[h].cell && (i[h]._cell = i[h].cell), (i[h].cell = Dn)),
        R !== -1)
      ) {
        i[R].cell = i[R].cell || Lt;
        const B = i[R].header;
        if (
          (typeof B != 'object' && (i[R].header = { text: B }),
          (i[R].header.cell = B.cell || Lt),
          n)
        )
          i.splice(R, 1);
        else if (r) {
          const [pe] = i.splice(R, 1);
          i.unshift(pe);
        }
      }
      return i.length > 0 && (i[i.length - 1].resize = !1), i;
    }, [fe, L, n, r, g]),
    he = $(
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
    Pe = $(() => {
      if (J && te?.length) {
        const i = {};
        return (
          te.forEach(({ key: h, order: R }, B) => {
            i[h] = {
              order: R,
              ...(te.length > 1 && { index: B }),
            };
          }),
          i
        );
      }
      return {};
    }, [J, te]),
    _e = N(() => Q.some((i) => i.flexgrow && !i.hidden), []),
    Te = $(() => _e(), [_e, Ae]),
    Le = $(() => {
      let i = o === 'chart' ? Q.filter((R) => R.id === 'add-task') : Q;
      const h = o === 'all' ? c : De;
      if (!Te) {
        let R = v,
          B = !1;
        if (Q.some((pe) => pe.$width)) {
          let pe = 0;
          (R = Q.reduce(
            (me, be) => (
              be.hidden || ((pe += be.width), (me += be.$width || be.width)), me
            ),
            0,
          )),
            pe > R && R > h && (B = !0);
        }
        if (B || R < h) {
          let pe = 1;
          return (
            B || (pe = (h - 50) / (R - 50 || 1)),
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
    }, [o, Q, Te, v, c, De]),
    Ge = N(
      (i) => {
        if (!_e()) {
          const h = Le.reduce(
            (R, B) => (
              i && B.$width && (B.$width = B.width),
              R + (B.hidden ? 0 : B.width)
            ),
            0,
          );
          h !== v && V(h);
        }
        Ne(!0), Ne(!1);
      },
      [_e, Le, v, V],
    ),
    l = N(() => {
      Q.filter((h) => h.flexgrow && !h.hidden).length === 1 &&
        Q.forEach((h) => {
          h.$width && !h.flexgrow && !h.hidden && (h.width = h.$width);
        });
    }, []),
    P = N(
      (i) => {
        if (!n) {
          const h = Ze(i),
            R = dn(i, 'data-col-id');
          !(R && Q.find((pe) => pe.id == R))?.editor &&
            h &&
            g.exec('show-editor', { id: h });
        }
      },
      [g, n],
      // cols is defined later; relies on latest value at call time
    ),
    W = $(() => (Array.isArray(G) ? G.map((i) => i.id) : []), [G]),
    b = N(() => {
      if (U.current && J !== null) {
        const i = U.current.querySelector('.wx-body');
        i &&
          (m
            ? (i.style.top = '0px')
            : (i.style.top = -((X ?? 0) - (y ?? 0)) + 'px'));
      }
      ge.current && (ge.current.scrollTop = 0);
    }, [J, X, y, m]);
  re(() => {
    U.current && b();
  }, [X, y, b]),
    re(() => {
      const i = U.current;
      if (!i) return;
      const h = i.querySelector('.wx-table-box .wx-body');
      if (!h || typeof ResizeObserver > 'u') return;
      const R = new ResizeObserver(() => {
        b();
      });
      return (
        R.observe(h),
        () => {
          R.disconnect();
        }
      );
    }, [Le, de, o, he, J, b]),
    re(() => {
      if (!I || !z) return;
      const { id: i } = I,
        h = z.getState().focusCell;
      h &&
        h.row !== i &&
        U.current &&
        U.current.contains(document.activeElement) &&
        z.exec('focus-cell', {
          row: i,
          column: h.column,
        });
    }, [I, z]),
    re(() => {
      if (!m) return;
      const i = U.current;
      if (!i) return;
      const h = i.querySelector('.wx-table-box .wx-body');
      if (!h) return;
      let R = 0;
      h.querySelectorAll('[data-id]').forEach((pe) => {
        const me = pe.getAttribute('data-id'),
          be = (s && me && s[me]) || _;
        (pe.style.height = `${be}px`),
          (pe.style.minHeight = `${be}px`),
          (R += be);
      }),
        R > 0 && (h.style.height = `${R}px`);
    }, [s, m, J, _]);
  const Ee = N(
      ({ id: i }) => {
        if (n) return !1;
        g.getTask(i).open && g.exec('open-task', { id: i, mode: !1 });
        const h = g.getState()._tasks.find((R) => R.id === i);
        if ((ee(h || null), !h)) return !1;
      },
      [g, n],
    ),
    ce = N(
      ({ id: i, top: h }) => {
        ze.current
          ? Re({ ...ze.current, onMove: !1 })
          : g.exec('drag-task', {
              id: i,
              top: h + (y ?? 0),
              inProgress: !1,
            }),
          ee(null);
      },
      [g, Re, y],
    ),
    xe = N(
      ({ id: i, top: h, detail: R }) => {
        R && Re({ ...R, onMove: !0 }),
          g.exec('drag-task', {
            id: i,
            top: h + (y ?? 0),
            inProgress: !0,
          });
      },
      [g, Re, y],
    );
  re(() => {
    const i = U.current;
    return i
      ? Sn(i, {
          start: Ee,
          end: ce,
          move: xe,
          getTask: g.getTask,
        }).destroy
      : void 0;
  }, [g, Ee, ce, xe]);
  const ke = N(
      (i) => {
        const { key: h, isInput: R } = i;
        if (!R && (h === 'arrowup' || h === 'arrowdown'))
          return (i.eventSource = 'grid'), g.exec('hotkey', i), !1;
        if (h === 'enter') {
          const B = z?.getState().focusCell;
          if (B) {
            const { row: pe, column: me } = B;
            me === 'add-task'
              ? q(pe, 'add-task')
              : me === 'text' && q(pe, 'open-task');
          }
        }
      },
      [g, q, z],
    ),
    $e = se(null),
    Ce = () => {
      $e.current = {
        setTableAPI: O,
        handleHotkey: ke,
        sortVal: te,
        api: g,
        adjustColumns: l,
        setColumnWidth: Ge,
        tasks: H,
        calendarVal: F,
        durationUnitVal: le,
        splitTasksVal: Z,
        onTableAPIChange: x,
      };
    };
  Ce(),
    re(() => {
      Ce();
    }, [O, ke, te, g, l, Ge, H, F, le, Z, x]);
  const We = N((i) => {
    O(i),
      i.intercept('hotkey', (h) => $e.current.handleHotkey(h)),
      i.intercept('scroll', () => !1),
      i.intercept('select-row', () => !1),
      i.intercept('sort-rows', (h) => {
        const R = $e.current.sortVal,
          { key: B, add: pe } = h,
          me = R ? R.find((He) => He.key === B) : null;
        let be = 'asc';
        return (
          me && (be = !me || me.order === 'asc' ? 'desc' : 'asc'),
          g.exec('sort-tasks', {
            key: B,
            order: be,
            add: pe,
          }),
          !1
        );
      }),
      i.on('resize-column', () => {
        $e.current.setColumnWidth(!0);
      }),
      i.on('hide-column', (h) => {
        h.mode || $e.current.adjustColumns(), $e.current.setColumnWidth();
      }),
      i.intercept('update-cell', (h) => {
        const { id: R, column: B, value: pe } = h,
          me = $e.current.tasks.find((be) => be.id === R);
        if (me) {
          const be = { ...me };
          let He = pe;
          He && !isNaN(He) && !(He instanceof Date) && (He *= 1),
            (be[B] = He),
            Gt(
              be,
              {
                calendar: $e.current.calendarVal,
                durationUnit: $e.current.durationUnitVal,
                splitTasks: $e.current.splitTasksVal,
              },
              B,
            ),
            g.exec('update-task', {
              id: R,
              task: be,
            });
        }
        return !1;
      }),
      x && x(i);
  }, []);
  return /* @__PURE__ */ u('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${he}` },
    ref: ge,
    children: /* @__PURE__ */ u('div', {
      ref: U,
      style: de,
      className: 'wx-rHj6070p wx-table',
      onClick: ie,
      onDoubleClick: P,
      children: /* @__PURE__ */ u(Tn, {
        init: We,
        sizes: {
          rowHeight: _,
          headerHeight: (E ?? 0) - 1,
        },
        rowStyle: (i) =>
          i.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (i) =>
          `wx-rHj6070p wx-text-${i.align}${i.id === 'add-task' ? ' wx-action' : ''}`,
        data: J,
        columns: Le,
        selectedRows: [...W],
        sortMarks: Pe,
      }),
    }),
  });
}
function Nn({ borders: t = '', rowLayout: n = null }) {
  const r = Xe(Ue),
    c = Y(r, 'cellWidth'),
    o = Y(r, 'cellHeight'),
    M = se(null),
    [k, x] = we('#e4e4e4');
  re(() => {
    if (typeof getComputedStyle < 'u' && M.current) {
      const s = getComputedStyle(M.current).getPropertyValue(
        '--wx-gantt-border',
      );
      x(s ? s.substring(s.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const m = $(() => {
    if (!n) return null;
    const s = [];
    let v = 0;
    for (const V of n) (v += V.height), s.push(v);
    return s;
  }, [n]);
  if (!m) {
    const s = {
      width: '100%',
      height: '100%',
      background: c != null && o != null ? `url(${hn(c, o, k, t)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ u('div', { ref: M, style: s });
  }
  const D = c
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${c - 1}px, ${k} ${c - 1}px, ${k} ${c}px)`
    : void 0;
  return /* @__PURE__ */ Ie('div', {
    ref: M,
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
      m.map((s, v) =>
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
          v,
        ),
      ),
    ],
  });
}
function In({ onSelectLink: t, selectedLink: n, readonly: r }) {
  const c = Xe(Ue),
    o = Y(c, '_links'),
    M = Y(c, 'criticalPath'),
    k = se(null),
    x = N(
      (m) => {
        const D = m?.target?.classList;
        !D?.contains('wx-line') && !D?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    re(() => {
      if (!r && n && k.current) {
        const m = (D) => {
          k.current && !k.current.contains(D.target) && x(D);
        };
        return (
          document.addEventListener('click', m),
          () => {
            document.removeEventListener('click', m);
          }
        );
      }
    }, [r, n, x]),
    /* @__PURE__ */ Ie('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (o || []).map((m) => {
          const D =
            'wx-dkx3NwEn wx-line' +
            (M && m.$critical ? ' wx-critical' : '') +
            (r ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ u(
            'polyline',
            {
              className: D,
              points: m.$p,
              onClick: () => !r && t(m.id),
              'data-link-id': m.id,
            },
            m.id,
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
      x = n.segments;
    let m = 0,
      D = 0,
      s = null;
    do {
      const v = x[D];
      D === M &&
        (m > k ? (s = 0) : (s = Math.min((k - m) / v.duration, 1) * 100)),
        (m += v.duration),
        D++;
    } while (s === null && D < x.length);
    return s || 0;
  }
  return /* @__PURE__ */ u('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((M, k) =>
      /* @__PURE__ */ Ie(
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
  Nt = null;
const It = (t, n, r, c) => t < c && n > r,
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
      x = Math.floor(t / c),
      m = new Date(r.getTime() + x * k * M);
    return m.setUTCHours(0, 0, 0, 0), m;
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
      x = new Date(t.getTime() + n * k);
    return x.setUTCHours(0, 0, 0, 0), x;
  };
function Gn(t) {
  const {
      readonly: n,
      taskTemplate: r,
      multiTaskRows: c = !1,
      rowMapping: o = null,
      rowHeightOverrides: M = null,
      allowTaskIntersection: k = !0,
      summaryBarCounts: x = !1,
      marqueeSelect: m = !1,
      copyPaste: D = !1,
    } = t,
    s = Xe(Ue),
    [v, V] = mt(s, '_tasks'),
    [z, O] = mt(s, '_links'),
    C = Y(s, 'area'),
    L = Y(s, '_scales'),
    g = Y(s, 'taskTypes'),
    X = Y(s, 'baselines'),
    _ = Y(s, '_selected'),
    I = Y(s, '_scrollTask'),
    G = Y(s, 'criticalPath'),
    p = Y(s, 'tasks'),
    ue = Y(s, 'schedule'),
    oe = Y(s, 'splitTasks'),
    fe = Y(s, 'summary'),
    te = $(() => {
      if (!C || !Array.isArray(v)) return [];
      const e = C.start ?? 0,
        a = C.end ?? 0;
      return c && o
        ? v.map((f) => ({ ...f }))
        : v.slice(e, a).map((f) => ({ ...f }));
    }, [V, C, c, o]),
    F = Y(s, 'cellHeight'),
    le = $(() => {
      if (!c || !o || !te.length) return te;
      const e = /* @__PURE__ */ new Map(),
        a = [];
      v.forEach((T) => {
        const ne = o.taskRows.get(T.id) ?? T.id;
        e.has(ne) || (e.set(ne, a.length), a.push(ne));
      });
      const f = /* @__PURE__ */ new Map();
      te.forEach((T) => {
        if (T.type === 'summary') return;
        const ne = o.taskRows.get(T.id) ?? T.id;
        f.has(ne) || f.set(ne, []), f.get(ne).push(T);
      });
      const d = /* @__PURE__ */ new Map(),
        w = /* @__PURE__ */ new Map();
      f.forEach((T, ne) => {
        const ae = [],
          Me = [...T].sort((ye, Se) => (ye.$x ?? 0) - (Se.$x ?? 0));
        for (const ye of Me) {
          const Se = ye.$x ?? 0,
            Ve = Se + (ye.$w ?? 0);
          let Oe = !1;
          for (let Ye = 0; Ye < ae.length; Ye++)
            if (
              !ae[Ye].some((je) => {
                const rt = je.$x ?? 0,
                  ut = rt + (je.$w ?? 0);
                return It(Se, Ve, rt, ut);
              })
            ) {
              ae[Ye].push(ye), d.set(ye.id, Ye), (Oe = !0);
              break;
            }
          Oe || (ae.push([ye]), d.set(ye.id, ae.length - 1));
        }
        w.set(ne, ae.length);
      });
      const A = /* @__PURE__ */ new Map();
      let K = 0;
      for (const T of a) {
        A.set(T, K);
        const ne = (M && M[T]) || F;
        K += ne;
      }
      return te.map((T) => {
        const ne = o.taskRows.get(T.id) ?? T.id,
          ae = A.get(ne) ?? 0;
        if (T.type === 'summary') {
          if ((f.get(ne) || []).length > 0) return { ...T, $y: ae, $skip: !0 };
          const Ye = (M && M[ne]) || F,
            Ke = Math.max(0, Math.floor((Ye - T.$h) / 2));
          return {
            ...T,
            $y: ae + Ke,
            $y_base: T.$y_base !== void 0 ? ae + Ke : void 0,
          };
        }
        const Me = w.get(ne) || 1,
          ye = d.get(T.id) ?? 0;
        if (Me > 1) {
          const Ke = T.$h + 4,
            je = ae + 3 + ye * Ke;
          return {
            ...T,
            $y: je,
            $y_base: T.$y_base !== void 0 ? je : void 0,
          };
        }
        const Se = (M && M[ne]) || F,
          Ve = Math.max(0, Math.round((Se - T.$h) / 2));
        return {
          ...T,
          $y: ae + Ve,
          $y_base: T.$y_base !== void 0 ? ae + Ve : void 0,
        };
      });
    }, [te, c, o, v, F, M]),
    Z = $(() => L.lengthUnitWidth, [L]),
    j = $(() => L.lengthUnit || 'day', [L]),
    ee = $(() => {
      const e = /* @__PURE__ */ new Set();
      if (k || !c || !o) return e;
      const a = /* @__PURE__ */ new Map();
      return (
        v.forEach((f) => {
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
    }, [k, c, o, v, V]),
    H = $(() => {
      if (!x || !v?.length || !Z) return null;
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Set();
      v.forEach((d) => {
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
            const T = Math.floor(K.$x / Z),
              ne = Math.ceil((K.$x + K.$w) / Z);
            for (let ae = T; ae < ne; ae++) A.set(ae, (A.get(ae) || 0) + 1);
          }),
            A.size > 0 && f.set(d, A);
        }),
        f
      );
    }, [x, v, Z]),
    [q, ie] = we(null),
    U = se(null),
    [ge, De] = we(null),
    [ve, Ae] = we(null),
    [Ne, ze] = we(null),
    Re = se(null);
  Re.current = Ne;
  const y = se(0),
    E = se(!1),
    [S, de] = we(void 0),
    [J, Q] = we(null),
    he = se(null),
    [Pe, _e] = we(null),
    Te = $(
      () =>
        Pe && {
          ...z.find((e) => e.id === Pe),
        },
      [Pe, O],
    ),
    [Le, Ge] = we(void 0),
    l = se(null),
    [P, W] = we(0),
    b = se(null),
    Ee = $(() => {
      const e = b.current;
      return !!(_.length && e && e.contains(document.activeElement));
    }, [_, b.current]),
    ce = $(() => Ee && _[_.length - 1]?.id, [Ee, _]);
  re(() => {
    if (I && Ee && I) {
      const { id: e } = I,
        a = b.current?.querySelector(`.wx-bar[data-id='${e}']`);
      a && a.focus({ preventScroll: !0 });
    }
  }, [I]),
    re(() => {
      const e = b.current;
      if (e && (W(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const a = new ResizeObserver((f) => {
          f[0] && W(f[0].contentRect.width);
        });
        return a.observe(e), () => a.disconnect();
      }
    }, [b.current]);
  const xe = N(() => {
      document.body.style.userSelect = 'none';
    }, []),
    ke = N(() => {
      document.body.style.userSelect = '';
    }, []),
    $e = $(() => {
      if (!c || !o || !v?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        v.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id;
          a.has(w) || (a.set(w, f.length), f.push(w));
        }),
        v.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id,
            A = a.get(w) ?? 0;
          e.set(d.id, A * F);
        }),
        e
      );
    }, [v, c, o, F]),
    Ce = $(() => {
      if (!c || !o || !v?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        v.forEach((d) => {
          const w = o.taskRows.get(d.id) ?? d.id;
          a.has(w) || (a.set(w, f.length), f.push(w));
        }),
        v.forEach((d) => {
          const w = d.row ?? d.id;
          if (!e.has(w)) {
            const A = o.taskRows.get(d.id) ?? d.id,
              K = a.get(A) ?? 0;
            e.set(w, K * F);
          }
        }),
        e
      );
    }, [v, c, o, F]),
    We = N(
      (e) => {
        if (!b.current) return [];
        const a = Math.min(e.startX, e.currentX),
          f = Math.max(e.startX, e.currentX),
          d = Math.min(e.startY, e.currentY),
          w = Math.max(e.startY, e.currentY);
        return v.filter((A) => {
          const K = A.$x,
            T = A.$x + A.$w,
            ae = $e.get(A.id) ?? A.$y,
            Me = ae + A.$h;
          return K < f && T > a && ae < w && Me > d;
        });
      },
      [v, $e],
    ),
    i = N(() => {
      if (!D) return;
      const e = s.getState()._selected;
      if (!e || !e.length) return;
      const a = 864e5,
        f = e
          .map((T) => {
            if (!s.getTask(T.id)) return null;
            const ae = v.find((ut) => ut.id === T.id);
            if (!ae) return null;
            const {
                $x: Me,
                $y: ye,
                $h: Se,
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
              _originalHeight: Se,
            };
          })
          .filter(Boolean);
      if (!f.length) return;
      const w = f[0].parent,
        A = f.filter((T) => T.parent === w);
      if (A.length === 0) return;
      const K = A.reduce(
        (T, ne) => (ne.start && (!T || ne.start < T) ? ne.start : T),
        null,
      );
      (dt = A.map((T) => ({
        ...T,
        _startCellOffset: An(T.start, K, L),
      }))),
        (Nt = w),
        (ft = K);
    }, [D, s, v, L]),
    h = N(
      (e, a, f) => {
        if (!a.length || !e || f == null) return;
        const d = 864e5,
          w = s.getHistory();
        w?.startBatch();
        const A = new Date(e);
        A.setUTCHours(0, 0, 0, 0),
          a.forEach((K, T) => {
            const ne = `task-${Date.now()}-${T}`,
              ae = Pn(A, K._startCellOffset || 0, L),
              Me = new Date(ae.getTime() + (K._startDayOfWeek || 0) * d);
            Me.setUTCHours(0, 0, 0, 0);
            const ye = new Date(Me.getTime() + (K._durationDays || 7) * d);
            ye.setUTCHours(0, 0, 0, 0),
              s.exec('add-task', {
                task: {
                  id: ne,
                  text: K.text,
                  start: Me,
                  end: ye,
                  type: K.type || 'task',
                  parent: f,
                  row: K.row,
                },
                target: f,
                mode: 'child',
                skipUndo: T > 0,
              });
          }),
          w?.endBatch();
      },
      [s, L],
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
                  Ae({
                    tasks: dt,
                    baseDate: ft,
                    parent: Nt,
                    currentX: y.current,
                  }),
                !1
              );
          })
        : void 0,
    [D, s, i],
  ),
    re(() => {
      if (!ve) return;
      const e = (a) => {
        a.key === 'Escape' &&
          (a.preventDefault(), a.stopPropagation(), Ae(null));
      };
      return (
        document.addEventListener('keydown', e, !0),
        () => document.removeEventListener('keydown', e, !0)
      );
    }, [ve]);
  const R = N(
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
        let T = 0.2 / (A > 200 ? A / 200 : 1);
        return K < T ? 'start' : K > 1 - T ? 'end' : '';
      },
      [s],
    ),
    B = N(
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
            const K = R(e, a, w) || 'move',
              T = {
                id: d,
                mode: K,
                x: f,
                dx: 0,
                l: w.$x,
                w: w.$w,
              };
            if (oe && w.segments?.length) {
              const ne = Fe(a, 'data-segment');
              ne && ((T.segmentIndex = ne.dataset.segment * 1), mn(w, T));
            }
            Q(T);
          }
          xe();
        }
      },
      [s, n, R, xe, oe],
    ),
    pe = N(
      (e) => {
        if (e.button !== 0 || ve) return;
        const a = Fe(e);
        if (!a && m && !n) {
          const f = b.current;
          if (!f) return;
          const d = f.getBoundingClientRect(),
            w = e.clientX - d.left,
            A = e.clientY - d.top;
          if (D) {
            const T = Ht(w, L);
            T && ((Re.current = T), ze(T));
          }
          const K = {
            startX: w,
            startY: A,
            currentX: w,
            currentY: A,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          ie(K), (U.current = K), xe();
          return;
        }
        if (a && m && !n && _.length > 1) {
          const f = Qe(a);
          if (_.some((w) => w.id === f)) {
            De({
              startX: e.clientX,
              ids: _.map((w) => w.id),
              tasks: _.map((w) => {
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
              xe();
            return;
          }
        }
        a && B(a, e);
      },
      [B, m, D, n, ve, L, _, s, xe],
    ),
    me = N(
      (e) => {
        const a = Fe(e);
        a &&
          (l.current = setTimeout(() => {
            Ge(!0), B(a, e.touches[0]);
          }, 300));
      },
      [B],
    ),
    be = N((e) => {
      _e(e);
    }, []),
    He = N(() => {
      const e = U.current;
      if (e) {
        const a = We(e);
        e.ctrlKey
          ? a.forEach((f) => {
              s.exec('select-task', { id: f.id, toggle: !0, marquee: !0 });
            })
          : (_.length > 0 && s.exec('select-task', { id: null, marquee: !0 }),
            a.forEach((f, d) => {
              s.exec('select-task', {
                id: f.id,
                toggle: d > 0,
                marquee: !0,
              });
            })),
          ie(null),
          (U.current = null),
          ke(),
          (E.current = !0);
        return;
      }
      if (ge) {
        const { ids: a, tasks: f, startX: d } = ge;
        De(null), ke(), (E.current = !0);
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
          (E.current = !0),
          ke();
      } else if (J) {
        const {
          id: a,
          mode: f,
          dx: d,
          l: w,
          w: A,
          start: K,
          segment: T,
          index: ne,
        } = J;
        if ((Q(null), K)) {
          const ae = Math.round(d / Z);
          if (!ae)
            s.exec('drag-task', {
              id: a,
              width: A,
              left: w,
              inProgress: !1,
              ...(T && { segmentIndex: ne }),
            });
          else {
            let Me = {},
              ye = s.getTask(a);
            T && (ye = ye.segments[ne]);
            const Se = 1440 * 60 * 1e3,
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
                Se;
            f === 'move'
              ? ((Me.start = new Date(ye.start.getTime() + Oe)),
                (Me.end = new Date(ye.end.getTime() + Oe)))
              : f === 'start'
                ? ((Me.start = new Date(ye.start.getTime() + Oe)),
                  (Me.end = ye.end))
                : f === 'end' &&
                  ((Me.start = ye.start),
                  (Me.end = new Date(ye.end.getTime() + Oe))),
              s.exec('update-task', {
                id: a,
                task: Me,
                ...(T && { segmentIndex: ne }),
              });
          }
          E.current = !0;
        }
        ke();
      }
    }, [s, ke, J, Z, j]),
    tt = N(
      (e, a) => {
        const { clientX: f } = a;
        if (D && b.current) {
          const d = b.current.getBoundingClientRect();
          y.current = f - d.left;
        }
        if (ve && b.current) {
          const d = b.current.getBoundingClientRect();
          Ae((w) => (w ? { ...w, currentX: f - d.left } : null));
        }
        if (q) {
          const d = b.current;
          if (!d) return;
          const w = d.getBoundingClientRect(),
            A = f - w.left,
            K = a.clientY - w.top;
          ie((T) => ({
            ...T,
            currentX: A,
            currentY: K,
          })),
            U.current && ((U.current.currentX = A), (U.current.currentY = K));
          return;
        }
        if (!n)
          if (he.current) {
            const { node: d, x: w, id: A } = he.current,
              K = (he.current.dx = f - w),
              T = Math.round((K / d.offsetWidth) * 100);
            let ne = he.current.progress + T;
            (he.current.value = ne = Math.min(Math.max(0, ne), 100)),
              s.exec('update-task', {
                id: A,
                task: { progress: ne },
                inProgress: !0,
              });
          } else if (J) {
            be(null);
            const {
                mode: d,
                l: w,
                w: A,
                x: K,
                id: T,
                start: ne,
                segment: ae,
                index: Me,
              } = J,
              ye = s.getTask(T),
              Se = f - K,
              Ve = Math.round(Z) || 1;
            if (
              (!ne && Math.abs(Se) < 20) ||
              (d === 'start' && A - Se < Ve) ||
              (d === 'end' && A + Se < Ve) ||
              (d === 'move' &&
                ((Se < 0 && w + Se < 0) || (Se > 0 && w + A + Se > P))) ||
              (J.segment && !gn(ye, J))
            )
              return;
            const Oe = { ...J, dx: Se };
            let Ye, Ke;
            if (
              (d === 'start'
                ? ((Ye = w + Se), (Ke = A - Se))
                : d === 'end'
                  ? ((Ye = w), (Ke = A + Se))
                  : d === 'move' && ((Ye = w + Se), (Ke = A)),
              s.exec('drag-task', {
                id: T,
                width: Ke,
                left: Ye,
                inProgress: !0,
                start: ne,
                ...(ae && { segmentIndex: Me }),
              }),
              !Oe.start &&
                ((d === 'move' && ye.$x == w) || (d !== 'move' && ye.$w == A)))
            ) {
              (E.current = !0), He();
              return;
            }
            (Oe.start = !0), Q(Oe);
          } else {
            const d = Fe(e);
            if (d) {
              const w = s.getTask(Qe(d)),
                K = Fe(e, 'data-segment') || d,
                T = R(K, a, w);
              K.style.cursor = T && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [s, n, J, Z, P, R, be, He],
    ),
    Xt = N(
      (e) => {
        tt(e, e);
      },
      [tt],
    ),
    Kt = N(
      (e) => {
        Le
          ? (e.preventDefault(), tt(e, e.touches[0]))
          : l.current && (clearTimeout(l.current), (l.current = null));
      },
      [Le, tt],
    ),
    ct = N(() => {
      He();
    }, [He]),
    Bt = N(() => {
      Ge(null),
        l.current && (clearTimeout(l.current), (l.current = null)),
        He();
    }, [He]);
  re(
    () => (
      window.addEventListener('mouseup', ct),
      () => {
        window.removeEventListener('mouseup', ct);
      }
    ),
    [ct],
  );
  const Vt = N(
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
    nt = N((e, a) => Ft[(e ? 1 : 0) + (a ? 0 : 2)], []),
    st = N(
      (e, a) => {
        const f = S.id,
          d = S.start;
        return e === f
          ? !0
          : !!z.find(
              (w) => w.target == e && w.source == f && w.type === nt(d, a),
            );
      },
      [S, O, nt],
    ),
    wt = N(() => {
      S && de(null);
    }, [S]),
    qt = N(
      (e) => {
        if (E.current) {
          E.current = !1;
          return;
        }
        if (ve && ve.currentX != null) {
          const f = Ht(ve.currentX, L);
          f && h(f, ve.tasks, ve.parent), Ae(null);
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const a = Ze(e.target);
        if (a) {
          const f = e.target.classList;
          if (f.contains('wx-link')) {
            const d = f.contains('wx-left');
            if (!S) {
              de({ id: a, start: d });
              return;
            }
            S.id !== a &&
              !st(a, d) &&
              s.exec('add-link', {
                link: {
                  source: S.id,
                  target: a,
                  type: nt(S.start, d),
                },
              });
          } else if (f.contains('wx-delete-button-icon'))
            s.exec('delete-link', { id: Pe }), _e(null);
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
      [s, S, O, Te, st, nt, wt],
    ),
    Ut = N((e) => {
      const a = {
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      };
      return e.color && (a.backgroundColor = e.color), a;
    }, []),
    jt = N(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    Qt = N(
      (e) => {
        if (Le || l.current) return e.preventDefault(), !1;
      },
      [Le],
    ),
    pt = $(() => g.map((e) => e.id), [g]),
    xt = N(
      (e) => {
        let a = pt.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (a = `task ${a}`), a
        );
      },
      [pt],
    ),
    yt = N(
      (e) => {
        s.exec(e.action, e.data);
      },
      [s],
    ),
    at = N((e) => G && p.byId(e).$critical, [G, p]),
    vt = N(
      (e) => {
        if (ue?.auto) {
          const a = p.getSummaryId(e, !0),
            f = p.getSummaryId(S.id, !0);
          return (
            S?.id &&
            !(Array.isArray(a) ? a : [a]).includes(S.id) &&
            !(Array.isArray(f) ? f : [f]).includes(e)
          );
        }
        return S;
      },
      [ue, p, S],
    );
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${le.length ? le[0].$h : 0}px` },
    ref: b,
    onContextMenu: Qt,
    onMouseDown: pe,
    onMouseMove: Xt,
    onTouchStart: me,
    onTouchMove: Kt,
    onTouchEnd: Bt,
    onClick: qt,
    onDoubleClick: Vt,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ u(In, {
        onSelectLink: be,
        selectedLink: Te,
        readonly: n,
      }),
      le.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const a = ee.has(e.id),
          f =
            `wx-bar wx-${xt(e.type)}` +
            (Le && J && e.id === J.id ? ' wx-touch' : '') +
            (S && S.id === e.id ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (oe && e.segments ? ' wx-split' : '') +
            (a ? ' wx-collision' : ''),
          d =
            'wx-link wx-left' +
            (S ? ' wx-visible' : '') +
            (!S || (!st(e.id, !0) && vt(e.id)) ? ' wx-target' : '') +
            (S && S.id === e.id && S.start ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : ''),
          w =
            'wx-link wx-right' +
            (S ? ' wx-visible' : '') +
            (!S || (!st(e.id, !1) && vt(e.id)) ? ' wx-target' : '') +
            (S && S.id === e.id && !S.start ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ Ie(
          Jt,
          {
            children: [
              !e.$skip &&
                /* @__PURE__ */ Ie('div', {
                  className: 'wx-GKbcLEGA ' + f,
                  style: Ut(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: ce === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === Te?.target && Te?.type[2] === 's'
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
                      ? /* @__PURE__ */ Ie(et, {
                          children: [
                            e.progress && !(oe && e.segments)
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
                            !(oe && e.segments) &&
                            !(e.type == 'summary' && fe?.autoProgress)
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
                              : oe && e.segments
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
                      : /* @__PURE__ */ Ie(et, {
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
                      : e.id === Te?.target && Te?.type[2] === 'e'
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
                          T = Math.ceil((e.$x + e.$w) / Z);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: T - K }, (ne, ae) => {
                            const Me = K + ae,
                              ye = A?.get(Me) || 0;
                            return /* @__PURE__ */ u(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${ye === 0 ? ' wx-week-count-zero' : ''}`,
                                style: {
                                  position: 'absolute',
                                  left: `${Me * Z - e.$x}px`,
                                  width: `${Z}px`,
                                  top: 0,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: ye,
                              },
                              Me,
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
      q &&
        (() => {
          const e = Math.min(q.startX, q.currentX),
            a = Math.min(q.startY, q.currentY),
            f = Math.abs(q.currentX - q.startX),
            d = Math.abs(q.currentY - q.startY);
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
      ve &&
        ve.currentX != null &&
        ve.tasks.map((e, a) => {
          const d =
              (Math.floor(ve.currentX / Z) + (e._startCellOffset || 0)) * Z,
            w = e._originalWidth || Z,
            A = e._originalHeight || F,
            K = Ce.get(e.row) ?? (e.$y || 0);
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
function zn(t) {
  const { highlightTime: n, onScaleClick: r } = t,
    c = Xe(Ue),
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
          children: (M.cells || []).map((x, m) => {
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
                onClick: r ? (v) => r(x.date, x.unit, v.nativeEvent) : void 0,
                children: x.value,
              },
              m,
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
  const n = se(null),
    r = se(0),
    c = se(null),
    o = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    r.current++,
    re(() => {
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
      onScaleClick: x,
      multiTaskRows: m = !1,
      rowMapping: D = null,
      rowHeightOverrides: s = null,
      allowTaskIntersection: v = !0,
      summaryBarCounts: V = !1,
      marqueeSelect: z = !1,
      copyPaste: O = !1,
    } = t,
    C = Xe(Ue),
    [L, g] = mt(C, '_selected'),
    X = Y(C, 'scrollTop'),
    _ = Y(C, 'cellHeight'),
    I = Y(C, 'cellWidth'),
    G = Y(C, '_scales'),
    p = Y(C, '_markers'),
    ue = Y(C, '_scrollTask'),
    oe = Y(C, 'zoom'),
    [fe, te] = we(),
    F = se(null),
    le = Y(C, '_tasks'),
    Z = 1 + (G?.rows?.length || 0),
    j = $(() => {
      if (!m || !D || !le?.length) return null;
      const y = /* @__PURE__ */ new Map(),
        E = /* @__PURE__ */ new Map(),
        S = [];
      return (
        le.forEach((de) => {
          const J = D.taskRows.get(de.id) ?? de.id;
          E.has(J) || (E.set(J, S.length), S.push(J));
        }),
        le.forEach((de) => {
          const J = D.taskRows.get(de.id) ?? de.id,
            Q = E.get(J) ?? 0;
          y.set(de.id, Q * _);
        }),
        y
      );
    }, [le, m, D, _]),
    ee = $(() => {
      const y = [];
      return (
        L &&
          L.length &&
          _ &&
          L.forEach((E) => {
            const S = j?.get(E.id) ?? E.$y;
            y.push({ height: `${_}px`, top: `${S - 3}px` });
          }),
        y
      );
    }, [g, _, j]),
    H = $(() => Math.max(fe || 0, c), [fe, c]),
    q = $(() => {
      if (
        !s ||
        !m ||
        !D ||
        !le?.length ||
        !Object.values(s).some((S) => S !== _)
      )
        return null;
      const E = [];
      return (
        le.forEach((S) => {
          const de = D.taskRows.get(S.id) ?? S.id;
          E.includes(de) || E.push(de);
        }),
        E.map((S) => ({
          id: S,
          height: s[S] || _,
        }))
      );
    }, [le, D, s, m, _]);
  re(() => {
    const y = F.current;
    y && typeof X == 'number' && (y.scrollTop = m ? 0 : X);
  }, [X, m]);
  const ie = () => {
    U();
  };
  function U(y) {
    const E = F.current;
    if (!E) return;
    const S = {};
    (S.left = E.scrollLeft), C.exec('scroll-chart', S);
  }
  function ge() {
    const y = F.current,
      S = Math.ceil((fe || 0) / (_ || 1)) + 1,
      de = Math.floor(((y && y.scrollTop) || 0) / (_ || 1)),
      J = Math.max(0, de - Z),
      Q = de + S + Z,
      he = J * (_ || 0);
    C.exec('render-data', {
      start: J,
      end: Q,
      from: he,
    });
  }
  re(() => {
    ge();
  }, [fe, X]);
  const De = N(
    (y) => {
      if (!y) return;
      const { id: E, mode: S } = y;
      if (S.toString().indexOf('x') < 0) return;
      const de = F.current;
      if (!de) return;
      const { clientWidth: J } = de,
        Q = C.getTask(E);
      if (Q.$x + Q.$w < de.scrollLeft)
        C.exec('scroll-chart', { left: Q.$x - (I || 0) }),
          (de.scrollLeft = Q.$x - (I || 0));
      else if (Q.$x >= J + de.scrollLeft) {
        const he = J < Q.$w ? I || 0 : Q.$w;
        C.exec('scroll-chart', { left: Q.$x - J + he }),
          (de.scrollLeft = Q.$x - J + he);
      }
    },
    [C, I],
  );
  re(() => {
    De(ue);
  }, [ue]);
  function ve(y) {
    if (oe && (y.ctrlKey || y.metaKey)) {
      y.preventDefault();
      const E = F.current,
        S = -Math.sign(y.deltaY),
        de = y.clientX - (E ? E.getBoundingClientRect().left : 0);
      C.exec('zoom-scale', {
        dir: S,
        offset: de,
      });
    }
  }
  function Ae(y) {
    const E = k(y.date, y.unit);
    return E
      ? {
          css: E,
          width: y.width,
        }
      : null;
  }
  const Ne = $(
      () =>
        G && (G.minUnit === 'hour' || G.minUnit === 'day') && k
          ? G.rows[G.rows.length - 1].cells.map(Ae)
          : null,
      [G, k],
    ),
    ze = N(
      (y) => {
        (y.eventSource = 'chart'), C.exec('hotkey', y);
      },
      [C],
    );
  re(() => {
    const y = F.current;
    if (!y) return;
    const E = () => te(y.clientHeight);
    E();
    const S = new ResizeObserver(() => E());
    return (
      S.observe(y),
      () => {
        S.disconnect();
      }
    );
  }, [F.current]);
  const Re = se(null);
  return (
    re(() => {
      const y = F.current;
      if (y && !Re.current)
        return (
          (Re.current = Wt(y, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (E) => ze(E),
          })),
          () => {
            Re.current?.destroy(), (Re.current = null);
          }
        );
    }, []),
    re(() => {
      const y = F.current;
      if (!y) return;
      const E = ve;
      return (
        y.addEventListener('wheel', E),
        () => {
          y.removeEventListener('wheel', E);
        }
      );
    }, [ve]),
    Wn('chart'),
    /* @__PURE__ */ Ie('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: F,
      onScroll: ie,
      children: [
        /* @__PURE__ */ u(zn, { highlightTime: k, onScaleClick: x, scales: G }),
        p && p.length
          ? /* @__PURE__ */ u('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${H}px` },
              children: p.map((y, E) =>
                /* @__PURE__ */ u(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${y.css || ''}`,
                    style: { left: `${y.left}px` },
                    children: /* @__PURE__ */ u('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: y.text,
                    }),
                  },
                  E,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ Ie('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${r}px`, height: `${H}px` },
          children: [
            Ne
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: Ne.map((y, E) =>
                    y
                      ? /* @__PURE__ */ u(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + y.css,
                            style: {
                              width: `${y.width}px`,
                              left: `${E * y.width}px`,
                            },
                          },
                          E,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ u(Nn, { borders: M, rowLayout: q }),
            L && L.length
              ? L.map((y, E) =>
                  y.$y
                    ? /* @__PURE__ */ u(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': y.id,
                          style: ee[E],
                        },
                        y.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ u(Gn, {
              readonly: n,
              taskTemplate: o,
              multiTaskRows: m,
              rowMapping: D,
              rowHeightOverrides: s,
              allowTaskIntersection: v,
              summaryBarCounts: V,
              marqueeSelect: z,
              copyPaste: O,
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
      containerWidth: x = 0,
      leftThreshold: m = 50,
      rightThreshold: D = 50,
    } = t,
    [s, v] = ht(t.value ?? 0),
    [V, z] = ht(t.display ?? 'all');
  function O(ie) {
    let U = 0;
    n == 'center' ? (U = r / 2) : n == 'before' && (U = r);
    const ge = {
      size: [r + 'px', 'auto'],
      p: [ie - U + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (c != 'x') for (let De in ge) ge[De] = ge[De].reverse();
    return ge;
  }
  const [C, L] = we(!1),
    [g, X] = we(null),
    _ = se(0),
    I = se(),
    G = se(),
    p = se(V);
  re(() => {
    p.current = V;
  }, [V]),
    re(() => {
      g === null && s > 0 && X(s);
    }, [g, s]);
  function ue(ie) {
    return c == 'x' ? ie.clientX : ie.clientY;
  }
  const oe = N(
      (ie) => {
        const U = I.current + ue(ie) - _.current;
        v(U);
        let ge;
        U <= m ? (ge = 'chart') : x - U <= D ? (ge = 'grid') : (ge = 'all'),
          p.current !== ge && (z(ge), (p.current = ge)),
          G.current && clearTimeout(G.current),
          (G.current = setTimeout(() => o && o(U), 100));
      },
      [x, m, D, o],
    ),
    fe = N(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        L(!1),
        window.removeEventListener('mousemove', oe),
        window.removeEventListener('mouseup', fe);
    }, [oe]),
    te = $(
      () => (V !== 'all' ? 'auto' : c == 'x' ? 'ew-resize' : 'ns-resize'),
      [V, c],
    ),
    F = N(
      (ie) => {
        (!k && (V === 'grid' || V === 'chart')) ||
          ((_.current = ue(ie)),
          (I.current = s),
          L(!0),
          (document.body.style.cursor = te),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', oe),
          window.addEventListener('mouseup', fe));
      },
      [te, oe, fe, s, k, V],
    );
  function le() {
    z('all'), g !== null && (v(g), o && o(g));
  }
  function Z(ie) {
    if (k) {
      const U = V === 'chart' ? 'grid' : 'chart';
      z(U), M(U);
    } else if (V === 'grid' || V === 'chart') le(), M('all');
    else {
      const U = ie === 'left' ? 'chart' : 'grid';
      z(U), M(U);
    }
  }
  function j() {
    Z('left');
  }
  function ee() {
    Z('right');
  }
  const H = $(() => O(s), [s, n, r, c]),
    q = [
      'wx-resizer',
      `wx-resizer-${c}`,
      `wx-resizer-display-${V}`,
      C ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-pFykzMlT ' + q,
    onMouseDown: F,
    style: { width: H.size[0], height: H.size[1], cursor: te },
    children: [
      /* @__PURE__ */ Ie('div', {
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
              onClick: ee,
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
      multiTaskRows: x = !1,
      rowMapping: m = null,
      rowHeightOverrides: D = null,
      allowTaskIntersection: s = !0,
      summaryBarCounts: v = !1,
      marqueeSelect: V = !1,
      copyPaste: z = !1,
    } = t,
    O = Xe(Ue),
    C = Y(O, '_tasks'),
    L = Y(O, '_scales'),
    g = Y(O, 'cellHeight'),
    X = Y(O, 'columns'),
    _ = Y(O, '_scrollTask'),
    I = Y(O, 'undo'),
    G = $(() => {
      if (!x) return m;
      const l = /* @__PURE__ */ new Map(),
        P = /* @__PURE__ */ new Map();
      return (
        C.forEach((W) => {
          const b = W.row ?? W.id;
          P.set(W.id, b), l.has(b) || l.set(b, []), l.get(b).push(W.id);
        }),
        { rowMap: l, taskRows: P }
      );
    }, [C, x, m]),
    [p, ue] = we(!1);
  let [oe, fe] = we(0);
  const [te, F] = we(0),
    [le, Z] = we(0),
    [j, ee] = we(void 0),
    [H, q] = we('all'),
    ie = se(null),
    U = N(
      (l) => {
        ue(
          (P) => (
            l !== P &&
              (l
                ? ((ie.current = H), H === 'all' && q('grid'))
                : (!ie.current || ie.current === 'all') && q('all')),
            l
          ),
        );
      },
      [H],
    );
  re(() => {
    const l = Ot(U);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [U]);
  const ge = $(() => {
    let l;
    return (
      X.every((P) => P.width && !P.flexgrow)
        ? (l = X.reduce((P, W) => P + parseInt(W.width), 0))
        : p && H === 'chart'
          ? (l = parseInt(X.find((P) => P.id === 'action')?.width) || 50)
          : (l = 440),
      (oe = l),
      l
    );
  }, [X, p, H]);
  re(() => {
    fe(ge);
  }, [ge]);
  const De = $(() => (te ?? 0) - (j ?? 0), [te, j]),
    ve = $(() => L.width, [L]),
    Ae = 14,
    Ne = $(() => {
      let l;
      if (!x || !G) l = C.length * g;
      else {
        const P = [];
        C.forEach((W) => {
          const b = G.taskRows.get(W.id) ?? W.id;
          P.includes(b) || P.push(b);
        }),
          (l = 0);
        for (const W of P) l += (D && D[W]) || g;
      }
      return l + Ae;
    }, [C, g, x, G, D]),
    ze = $(() => L.height + Ne + De, [L, Ne, De]),
    Re = $(() => oe + ve, [oe, ve]),
    y = se(null),
    E = se(!1),
    S = se(null);
  re(() => {
    const l = () => {
      (E.current = !0),
        clearTimeout(S.current),
        (S.current = setTimeout(() => {
          E.current = !1;
        }, 300));
    };
    return (
      O.on('zoom-scale', l),
      O.on('set-scale', l),
      () => {
        clearTimeout(S.current);
      }
    );
  }, [O]);
  const de = N(() => {
      Promise.resolve().then(() => {
        if (!E.current && (te ?? 0) > (Re ?? 0)) {
          const l = (te ?? 0) - oe;
          O.exec('expand-scale', { minWidth: l });
        }
      });
    }, [te, Re, oe, O]),
    J = se(de);
  (J.current = de),
    re(() => {
      let l;
      return (
        y.current &&
          ((l = new ResizeObserver(() => J.current())), l.observe(y.current)),
        () => {
          l && l.disconnect();
        }
      );
    }, [y.current]);
  const Q = se(null),
    he = se(null),
    Pe = N(() => {
      const l = Q.current;
      l &&
        O.exec('scroll-chart', {
          top: l.scrollTop,
        });
    }, [O]),
    _e = se({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  re(() => {
    _e.current = {
      rTasks: C,
      rScales: L,
      rCellHeight: g,
      scrollSize: De,
      ganttDiv: Q.current,
      ganttHeight: le ?? 0,
    };
  }, [C, L, g, De, le]);
  const Te = N(
    (l) => {
      if (!l) return;
      const {
        rTasks: P,
        rScales: W,
        rCellHeight: b,
        scrollSize: Ee,
        ganttDiv: ce,
        ganttHeight: xe,
      } = _e.current;
      if (!ce) return;
      const { id: ke } = l,
        $e = P.findIndex((Ce) => Ce.id === ke);
      if ($e > -1) {
        const Ce = xe - W.height,
          We = $e * b,
          i = ce.scrollTop;
        let h = null;
        We < i ? (h = We) : We + b > i + Ce && (h = We - Ce + b + Ee),
          h !== null &&
            (O.exec('scroll-chart', { top: Math.max(h, 0) }),
            (Q.current.scrollTop = Math.max(h, 0)));
      }
    },
    [O],
  );
  re(() => {
    Te(_);
  }, [_]),
    re(() => {
      const l = Q.current,
        P = he.current;
      if (!l || !P) return;
      const W = () => {
          Cn(() => {
            Z(l.offsetHeight), F(l.offsetWidth), ee(P.offsetWidth);
          });
        },
        b = new ResizeObserver(W);
      return b.observe(l), () => b.disconnect();
    }, [Q.current]);
  const Le = se(null),
    Ge = se(null);
  return (
    re(() => {
      Ge.current && (Ge.current.destroy(), (Ge.current = null));
      const l = Le.current;
      if (l)
        return (
          (Ge.current = Wt(l, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': I,
              'ctrl+y': I,
            },
            exec: (P) => {
              P.isInput || O.exec('hotkey', P);
            },
          })),
          () => {
            Ge.current?.destroy(), (Ge.current = null);
          }
        );
    }, [I]),
    /* @__PURE__ */ u('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: Q,
      onScroll: Pe,
      children: /* @__PURE__ */ u('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: ze, width: '100%' },
        ref: he,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: le,
            width: j,
          },
          children: /* @__PURE__ */ Ie('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: Le,
            children: [
              X.length
                ? /* @__PURE__ */ Ie(et, {
                    children: [
                      /* @__PURE__ */ u(Ln, {
                        display: H,
                        compactMode: p,
                        columnWidth: ge,
                        width: oe,
                        readonly: r,
                        fullHeight: Ne,
                        onTableAPIChange: k,
                        multiTaskRows: x,
                        rowMapping: G,
                        rowHeightOverrides: D,
                      }),
                      /* @__PURE__ */ u(Yn, {
                        value: oe,
                        display: H,
                        compactMode: p,
                        containerWidth: te,
                        onMove: (l) => fe(l),
                        onDisplayChange: (l) => q(l),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ u('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: y,
                children: /* @__PURE__ */ u(On, {
                  readonly: r,
                  fullWidth: ve,
                  fullHeight: Ne,
                  taskTemplate: n,
                  cellBorders: c,
                  highlightTime: o,
                  onScaleClick: M,
                  multiTaskRows: x,
                  rowMapping: G,
                  rowHeightOverrides: D,
                  allowTaskIntersection: s,
                  summaryBarCounts: v,
                  marqueeSelect: V,
                  copyPaste: z,
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
      links: x = ts,
      scales: m = Qn,
      columns: D = yn,
      start: s = null,
      end: v = null,
      lengthUnit: V = 'day',
      durationUnit: z = 'day',
      cellWidth: O = 100,
      cellHeight: C = 38,
      scaleHeight: L = 36,
      readonly: g = !1,
      cellBorders: X = 'full',
      zoom: _ = !1,
      baselines: I = !1,
      highlightTime: G = null,
      onScaleClick: p = null,
      init: ue = null,
      autoScale: oe = !0,
      unscheduledTasks: fe = !1,
      criticalPath: te = null,
      schedule: F = ns,
      projectStart: le = null,
      projectEnd: Z = null,
      calendar: j = null,
      undo: ee = !1,
      splitTasks: H = !1,
      multiTaskRows: q = !1,
      rowHeightOverrides: ie = null,
      allowTaskIntersection: U = !0,
      summaryBarCounts: ge = !1,
      marqueeSelect: De = !1,
      copyPaste: ve = !1,
      summary: Ae = null,
      _export: Ne = !1,
      ...ze
    },
    Re,
  ) {
    const y = se();
    y.current = ze;
    const E = $(() => new wn(kn), []),
      S = $(() => ({ ...gt, ...it }), []),
      de = Xe(Be.i18n),
      J = $(() => (de ? de.extend(S, !0) : lt(S)), [de, S]),
      Q = $(() => J.getRaw().calendar, [J]),
      he = $(() => {
        let ce = {
          zoom: Un(_, Q),
          scales: Yt(m, Q),
          columns: qn(D, Q),
          links: pn(x),
          cellWidth: O,
        };
        return (
          ce.zoom &&
            (ce = {
              ...ce,
              ...xn(ce.zoom, Fn(Q, J.getGroup('gantt')), ce.scales, O),
            }),
          ce
        );
      }, [_, m, D, x, O, Q, J]),
      Pe = se(null);
    Pe.current !== o &&
      (Ne || Ct(o, { durationUnit: z, splitTasks: H, calendar: j }),
      (Pe.current = o)),
      re(() => {
        Ne || Ct(o, { durationUnit: z, splitTasks: H, calendar: j });
      }, [o, z, j, H, Ne]);
    const _e = $(() => {
        if (!q) return null;
        const ce = /* @__PURE__ */ new Map(),
          xe = /* @__PURE__ */ new Map(),
          ke = ($e) => {
            $e.forEach((Ce) => {
              const We = Ce.row ?? Ce.id;
              xe.set(Ce.id, We),
                ce.has(We) || ce.set(We, []),
                ce.get(We).push(Ce.id),
                Ce.data && Ce.data.length > 0 && ke(Ce.data);
            });
          };
        return ke(o), { rowMap: ce, taskRows: xe };
      }, [o, q]),
      Te = $(() => E.in, [E]),
      Le = se(null);
    Le.current === null &&
      ((Le.current = new fn((ce, xe) => {
        const ke = 'on' + jn(ce);
        y.current && y.current[ke] && y.current[ke](xe);
      })),
      Te.setNext(Le.current));
    const [Ge, l] = we(null),
      P = se(null);
    P.current = Ge;
    const W = $(
      () => ({
        getState: E.getState.bind(E),
        getReactiveState: E.getReactive.bind(E),
        getStores: () => ({ data: E }),
        exec: Te.exec.bind(Te),
        setNext: (ce) => ((Le.current = Le.current.setNext(ce)), Le.current),
        intercept: Te.intercept.bind(Te),
        on: Te.on.bind(Te),
        detach: Te.detach.bind(Te),
        getTask: E.getTask.bind(E),
        serialize: () => E.serialize(),
        getTable: (ce) =>
          ce
            ? new Promise((xe) => setTimeout(() => xe(P.current), 1))
            : P.current,
        getHistory: () => E.getHistory(),
      }),
      [E, Te],
    );
    re(() => {
      const ce = () => {
        const { zoom: xe, scales: ke } = W.getState(),
          Ce = xe?.levels?.[xe.level]?.scales?.[0]?.unit ?? ke?.[0]?.unit;
        Ce && W.exec('scale-change', { level: xe?.level, unit: Ce });
      };
      W.on('zoom-scale', ce), W.on('set-scale', ce);
    }, [W]),
      re(() => {
        W.intercept('set-scale', ({ unit: ce, date: xe }) => {
          const { zoom: ke } = W.getState();
          if (!ke || !ke.levels) return !1;
          const $e = ke.levels.findIndex((i) =>
            i.scales.some((h) => h.unit === ce),
          );
          if ($e < 0) return !1;
          const Ce = ke.levels[$e];
          if ($e !== ke.level) {
            const i = Math.round((Ce.minCellWidth + Ce.maxCellWidth) / 2);
            W.getStores().data.setState({
              scales: Ce.scales,
              cellWidth: i,
              _cellWidth: i,
              zoom: { ...ke, level: $e },
              ...(xe ? { _scaleDate: xe, _zoomOffset: 0 } : {}),
            });
          } else if (xe) {
            const { _scales: i, cellWidth: h } = W.getState(),
              R = i.diff(xe, i.start, i.lengthUnit),
              B = Math.max(0, Math.round(R * h));
            W.exec('scroll-chart', { left: B });
          }
          return !1;
        });
      }, [W]),
      Pt(
        Re,
        () => ({
          ...W,
        }),
        [W],
      );
    const b = se(0);
    re(() => {
      b.current
        ? E.init({
            tasks: o,
            links: he.links,
            start: s,
            columns: he.columns,
            end: v,
            lengthUnit: V,
            cellWidth: he.cellWidth,
            cellHeight: C,
            scaleHeight: L,
            scales: he.scales,
            taskTypes: c,
            zoom: he.zoom,
            selected: M,
            activeTask: k,
            baselines: I,
            autoScale: oe,
            unscheduledTasks: fe,
            markers: r,
            durationUnit: z,
            criticalPath: te,
            schedule: F,
            projectStart: le,
            projectEnd: Z,
            calendar: j,
            undo: ee,
            _weekStart: Q.weekStart,
            splitTasks: H,
            summary: Ae,
          })
        : ue && ue(W),
        b.current++;
    }, [
      W,
      ue,
      o,
      he,
      s,
      v,
      V,
      C,
      L,
      c,
      M,
      k,
      I,
      oe,
      fe,
      r,
      z,
      te,
      F,
      le,
      Z,
      j,
      ee,
      Q,
      H,
      Ae,
      E,
    ]),
      b.current === 0 &&
        E.init({
          tasks: o,
          links: he.links,
          start: s,
          columns: he.columns,
          end: v,
          lengthUnit: V,
          cellWidth: he.cellWidth,
          cellHeight: C,
          scaleHeight: L,
          scales: he.scales,
          taskTypes: c,
          zoom: he.zoom,
          selected: M,
          activeTask: k,
          baselines: I,
          autoScale: oe,
          unscheduledTasks: fe,
          markers: r,
          durationUnit: z,
          criticalPath: te,
          schedule: F,
          projectStart: le,
          projectEnd: Z,
          calendar: j,
          undo: ee,
          _weekStart: Q.weekStart,
          splitTasks: H,
          summary: Ae,
        });
    const Ee = $(
      () =>
        j
          ? (ce, xe) =>
              (xe == 'day' && !j.getDayHours(ce)) ||
              (xe == 'hour' && !j.getDayHours(ce))
                ? 'wx-weekend'
                : ''
          : G,
      [j, G],
    );
    return /* @__PURE__ */ u(Be.i18n.Provider, {
      value: J,
      children: /* @__PURE__ */ u(Ue.Provider, {
        value: W,
        children: /* @__PURE__ */ u(Kn, {
          taskTemplate: n,
          readonly: g,
          cellBorders: X,
          highlightTime: Ee,
          onScaleClick: p,
          onTableAPIChange: l,
          multiTaskRows: q,
          rowMapping: _e,
          rowHeightOverrides: ie,
          allowTaskIntersection: U,
          summaryBarCounts: ge,
          marqueeSelect: De,
          copyPaste: ve,
        }),
      }),
    });
  });
function Ts({ api: t = null, items: n = [] }) {
  const r = Xe(Be.i18n),
    c = $(() => r || lt(it), [r]),
    o = $(() => c.getGroup('gantt'), [c]),
    M = qe(t, '_selected'),
    k = qe(t, 'undo'),
    x = qe(t, 'history'),
    m = qe(t, 'splitTasks'),
    D = ['undo', 'redo'],
    s = $(() => {
      const V = Mt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : Mt({
              undo: k,
              splitTasks: m,
            })
      ).map((O) => {
        let C = { ...O, disabled: !1 };
        return (
          (C.handler = _t(V, C.id) ? (L) => zt(t, L.id, null, o) : C.handler),
          C.text && (C.text = o(C.text)),
          C.menuText && (C.menuText = o(C.menuText)),
          C
        );
      });
    }, [n, t, o, k, m]),
    v = $(() => {
      const V = [];
      return (
        s.forEach((z) => {
          const O = z.id;
          if (O === 'add-task') V.push(z);
          else if (D.includes(O))
            D.includes(O) &&
              V.push({
                ...z,
                disabled: z.isDisabled(x),
              });
          else {
            if (!M?.length || !t) return;
            V.push({
              ...z,
              disabled:
                z.isDisabled && M.some((C) => z.isDisabled(C, t.getState())),
            });
          }
        }),
        V.filter((z, O) => {
          if (t && z.isHidden)
            return !M.some((C) => z.isHidden(C, t.getState()));
          if (z.comp === 'separator') {
            const C = V[O + 1];
            if (!C || C.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, M, x, s]);
  return r
    ? /* @__PURE__ */ u(Et, { items: v })
    : /* @__PURE__ */ u(Be.i18n.Provider, {
        value: c,
        children: /* @__PURE__ */ u(Et, { items: v }),
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
    onClick: x,
    css: m,
  },
  D,
) {
  const s = se(null),
    v = se(null),
    V = Xe(Be.i18n),
    z = $(() => V || lt({ ...it, ...gt }), [V]),
    O = $(() => z.getGroup('gantt'), [z]),
    C = qe(r, 'taskTypes'),
    L = qe(r, 'selected'),
    g = qe(r, '_selected'),
    X = qe(r, 'splitTasks'),
    _ = qe(r, 'summary'),
    I = $(
      () => ({
        splitTasks: X,
        taskTypes: C,
        summary: _,
      }),
      [X, C, _],
    ),
    G = $(() => Rt(I), [I]);
  re(() => {
    r &&
      (r.on('scroll-chart', () => {
        s.current && s.current.show && s.current.show();
      }),
      r.on('drag-task', () => {
        s.current && s.current.show && s.current.show();
      }));
  }, [r]);
  function p(ee) {
    return ee.map(
      (H) => (
        (H = { ...H }),
        H.text && (H.text = O(H.text)),
        H.subtext && (H.subtext = O(H.subtext)),
        H.data && (H.data = p(H.data)),
        H
      ),
    );
  }
  function ue() {
    const ee = n.length ? n : Rt(I);
    return p(ee);
  }
  const oe = $(() => ue(), [r, n, I, O]),
    fe = $(() => (g && g.length ? g : []), [g]),
    te = N(
      (ee, H) => {
        let q = ee ? r?.getTask(ee) : null;
        if (c) {
          const ie = c(ee, H);
          q = ie === !0 ? q : ie;
        }
        if (q) {
          const ie = Ze(H.target, 'data-segment');
          ie !== null
            ? (v.current = { id: q.id, segmentIndex: ie })
            : (v.current = q.id),
            (!Array.isArray(L) || !L.includes(q.id)) &&
              r &&
              r.exec &&
              r.exec('select-task', { id: q.id });
        }
        return q;
      },
      [r, c, L],
    ),
    F = N(
      (ee) => {
        const H = ee.action;
        H && (_t(G, H.id) && zt(r, H.id, v.current, O), x && x(ee));
      },
      [r, O, x, G],
    ),
    le = N(
      (ee, H) => {
        const q = fe.length ? fe : H ? [H] : [];
        let ie = o ? q.every((U) => o(ee, U)) : !0;
        if (
          ie &&
          (ee.isHidden &&
            (ie = !q.some((U) => ee.isHidden(U, r.getState(), v.current))),
          ee.isDisabled)
        ) {
          const U = q.some((ge) => ee.isDisabled(ge, r.getState(), v.current));
          ee.disabled = U;
        }
        return ie;
      },
      [o, fe, r],
    );
  Pt(D, () => ({
    show: (ee, H) => {
      s.current && s.current.show && s.current.show(ee, H);
    },
  }));
  const Z = N((ee) => {
      s.current && s.current.show && s.current.show(ee);
    }, []),
    j = /* @__PURE__ */ Ie(et, {
      children: [
        /* @__PURE__ */ u(Mn, {
          filter: le,
          options: oe,
          dataKey: 'id',
          resolver: te,
          onClick: F,
          at: M,
          ref: s,
          css: m,
        }),
        /* @__PURE__ */ u('span', {
          onContextMenu: Z,
          'data-menu-ignore': 'true',
          children: typeof k == 'function' ? k() : k,
        }),
      ],
    });
  if (!V && Be.i18n?.Provider) {
    const ee = Be.i18n.Provider;
    return /* @__PURE__ */ u(ee, { value: z, children: j });
  }
  return j;
});
function ss({ api: t, autoSave: n, onLinksChange: r }) {
  const o = Xe(Be.i18n).getGroup('gantt'),
    M = Y(t, 'activeTask'),
    k = Y(t, '_activeTask'),
    x = Y(t, '_links'),
    m = Y(t, 'schedule'),
    D = Y(t, 'unscheduledTasks'),
    [s, v] = we();
  function V() {
    if (M) {
      const L = x
          .filter((X) => X.target == M)
          .map((X) => ({ link: X, task: t.getTask(X.source) })),
        g = x
          .filter((X) => X.source == M)
          .map((X) => ({ link: X, task: t.getTask(X.target) }));
      return [
        { title: o('Predecessors'), data: L },
        { title: o('Successors'), data: g },
      ];
    }
  }
  re(() => {
    v(V());
  }, [M, x]);
  const z = $(
    () => [
      { id: 'e2s', label: o('End-to-start') },
      { id: 's2s', label: o('Start-to-start') },
      { id: 'e2e', label: o('End-to-end') },
      { id: 's2e', label: o('Start-to-end') },
    ],
    [o],
  );
  function O(L) {
    n
      ? t.exec('delete-link', { id: L })
      : (v((g) =>
          (g || []).map((X) => ({
            ...X,
            data: X.data.filter((_) => _.link.id !== L),
          })),
        ),
        r &&
          r({
            id: L,
            action: 'delete-link',
            data: { id: L },
          }));
  }
  function C(L, g) {
    n
      ? t.exec('update-link', {
          id: L,
          link: g,
        })
      : (v((X) =>
          (X || []).map((_) => ({
            ..._,
            data: _.data.map((I) =>
              I.link.id === L ? { ...I, link: { ...I.link, ...g } } : I,
            ),
          })),
        ),
        r &&
          r({
            id: L,
            action: 'update-link',
            data: {
              id: L,
              link: g,
            },
          }));
  }
  return /* @__PURE__ */ u(et, {
    children: (s || []).map((L, g) =>
      L.data.length
        ? /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ u(Be.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ u(en, {
                  label: L.title,
                  position: 'top',
                  children: /* @__PURE__ */ u('table', {
                    children: /* @__PURE__ */ u('tbody', {
                      children: L.data.map((X) =>
                        /* @__PURE__ */ Ie(
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
                              m?.auto && X.link.type === 'e2s'
                                ? /* @__PURE__ */ u('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ u(tn, {
                                      type: 'number',
                                      placeholder: o('Lag'),
                                      value: X.link.lag,
                                      disabled: D && k?.unscheduled,
                                      onChange: (_) => {
                                        _.input ||
                                          C(X.link.id, { lag: _.value });
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
                                    options: z,
                                    onChange: (_) =>
                                      C(X.link.id, { type: _.value }),
                                    children: ({ option: _ }) => _.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => O(X.link.id),
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
            g,
          )
        : null,
    ),
  });
}
function rs(t) {
  const { value: n, time: r, format: c, onchange: o, onChange: M, ...k } = t,
    x = M ?? o;
  function m(D) {
    const s = new Date(D.value);
    s.setHours(n.getHours()),
      s.setMinutes(n.getMinutes()),
      x && x({ value: s });
  }
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ u(sn, {
        ...k,
        value: n,
        onChange: m,
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
  placement: M = 'sidebar',
  bottomBar: k = !0,
  topBar: x = !0,
  autoSave: m = !0,
  focus: D = !1,
  hotkeys: s = {},
}) {
  const v = Xe(Be.i18n),
    V = $(() => v || lt({ ...it, ...gt }), [v]),
    z = $(() => V.getGroup('gantt'), [V]),
    O = V.getRaw(),
    C = $(() => {
      const l = O.gantt?.dateFormat || O.formats?.dateFormat;
      return ot(l, O.calendar);
    }, [O]),
    L = $(() => {
      if (x === !0 && !o) {
        const l = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: z('Delete'),
            id: 'delete',
          },
        ];
        return m
          ? { items: l }
          : {
              items: [
                ...l,
                {
                  comp: 'button',
                  type: 'primary',
                  text: z('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return x;
    }, [x, o, m, z]),
    [g, X] = we(!1),
    _ = $(() => (g ? 'wx-full-screen' : ''), [g]),
    I = N((l) => {
      X(l);
    }, []);
  re(() => {
    const l = Ot(I);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [I]);
  const G = Y(t, '_activeTask'),
    p = Y(t, 'activeTask'),
    ue = Y(t, 'unscheduledTasks'),
    oe = Y(t, 'summary'),
    fe = Y(t, 'links'),
    te = Y(t, 'splitTasks'),
    F = $(() => te && p?.segmentIndex, [te, p]),
    le = $(() => F || F === 0, [F]),
    Z = Y(t, 'taskTypes'),
    j = $(
      () => bn({ unscheduledTasks: ue, summary: oe, taskTypes: Z }),
      [ue, oe, Z],
    ),
    ee = Y(t, 'undo'),
    [H, q] = we({}),
    [ie, U] = we(null),
    [ge, De] = we(),
    [ve, Ae] = we(null),
    Ne = $(() => {
      if (!G) return null;
      let l;
      if ((le && G.segments ? (l = { ...G.segments[F] }) : (l = { ...G }), o)) {
        let P = { parent: l.parent };
        return (
          j.forEach(({ key: W, comp: b }) => {
            if (b !== 'links') {
              const Ee = l[W];
              b === 'date' && Ee instanceof Date
                ? (P[W] = C(Ee))
                : b === 'slider' && W === 'progress'
                  ? (P[W] = `${Ee}%`)
                  : (P[W] = Ee);
            }
          }),
          P
        );
      }
      return l || null;
    }, [G, le, F, o, j, C]);
  re(() => {
    De(Ne);
  }, [Ne]),
    re(() => {
      q({}), Ae(null), U(null);
    }, [p]);
  function ze(l, P) {
    return l.map((W) => {
      const b = { ...W };
      if (
        (W.config && (b.config = { ...b.config }),
        b.comp === 'links' &&
          t &&
          ((b.api = t), (b.autoSave = m), (b.onLinksChange = E)),
        b.comp === 'select' && b.key === 'type')
      ) {
        const Ee = b.options ?? [];
        b.options = Ee.map((ce) => ({
          ...ce,
          label: z(ce.label),
        }));
      }
      return (
        b.comp === 'slider' &&
          b.key === 'progress' &&
          (b.labelTemplate = (Ee) => `${z(b.label)} ${Ee}%`),
        b.label && (b.label = z(b.label)),
        b.config?.placeholder &&
          (b.config.placeholder = z(b.config.placeholder)),
        P &&
          (b.isDisabled && b.isDisabled(P, t.getState())
            ? (b.disabled = !0)
            : delete b.disabled),
        b
      );
    });
  }
  const Re = $(() => {
      let l = n.length ? n : j;
      return (
        (l = ze(l, ge)),
        ge ? l.filter((P) => !P.isHidden || !P.isHidden(ge, t.getState())) : l
      );
    }, [n, j, ge, z, t, m]),
    y = $(() => Re.map((l) => l.key), [Re]);
  function E({ id: l, action: P, data: W }) {
    q((b) => ({
      ...b,
      [l]: { action: P, data: W },
    }));
  }
  const S = N(() => {
      for (let l in H)
        if (fe.byId(l)) {
          const { action: P, data: W } = H[l];
          t.exec(P, W);
        }
    }, [t, H, fe]),
    de = N(() => {
      const l = p?.id || p;
      if (le) {
        if (G?.segments) {
          const P = G.segments.filter((W, b) => b !== F);
          t.exec('update-task', {
            id: l,
            task: { segments: P },
          });
        }
      } else t.exec('delete-task', { id: l });
    }, [t, p, le, G, F]),
    J = N(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    Q = N(
      (l) => {
        const { item: P, changes: W } = l;
        P.id === 'delete' && de(),
          P.id === 'save' && (W.length ? J() : S()),
          P.comp && J();
      },
      [t, p, m, S, de, J],
    ),
    he = N(
      (l, P, W) => (
        ue && l.type === 'summary' && (l.unscheduled = !1),
        Gt(l, t.getState(), P),
        W || U(!1),
        l
      ),
      [ue, t],
    ),
    Pe = N(
      (l) => {
        (l = {
          ...l,
          unscheduled: ue && l.unscheduled && l.type !== 'summary',
        }),
          delete l.links,
          delete l.data,
          (y.indexOf('duration') === -1 || (l.segments && !l.duration)) &&
            delete l.duration;
        const P = {
          id: p?.id || p,
          task: l,
          ...(le && { segmentIndex: F }),
        };
        m && ie && (P.inProgress = ie), t.exec('update-task', P), m || S();
      },
      [t, p, ue, m, S, y, le, F, ie],
    ),
    _e = N(
      (l) => {
        let { update: P, key: W, input: b } = l;
        if ((b && U(!0), (l.update = he({ ...P }, W, b)), !m)) De(l.update);
        else if (!ve && !b) {
          const Ee = Re.find((ke) => ke.key === W),
            ce = P[W];
          (!Ee.validation || Ee.validation(ce)) &&
            (!Ee.required || ce) &&
            Pe(l.update);
        }
      },
      [m, he, ve, Re, Pe],
    ),
    Te = N(
      (l) => {
        m || Pe(l.values);
      },
      [m, Pe],
    ),
    Le = N((l) => {
      Ae(l.errors);
    }, []),
    Ge = $(
      () =>
        ee
          ? {
              'ctrl+z': (l) => {
                l.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (l) => {
                l.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [ee, t],
    );
  return Ne
    ? /* @__PURE__ */ u(on, {
        children: /* @__PURE__ */ u(Rn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${_} ${r}`,
          items: Re,
          values: Ne,
          topBar: L,
          bottomBar: k,
          placement: M,
          layout: c,
          readonly: o,
          autoSave: m,
          focus: D,
          onAction: Q,
          onSave: Te,
          onValidation: Le,
          onChange: _e,
          hotkeys: s && { ...Ge, ...s },
        }),
      })
    : null;
}
const Ms = ({ children: t, columns: n = null, api: r }) => {
  const [c, o] = we(null);
  return (
    re(() => {
      r && r.getTable(!0).then(o);
    }, [r]),
    /* @__PURE__ */ u($n, { api: c, columns: n, children: t })
  );
};
function Rs(t) {
  const { api: n, content: r, children: c } = t,
    o = se(null),
    M = se(null),
    [k, x] = we({}),
    [m, D] = we(null),
    [s, v] = we({});
  function V(I) {
    for (; I; ) {
      if (I.getAttribute) {
        const G = I.getAttribute('data-tooltip-id'),
          p = I.getAttribute('data-tooltip-at'),
          ue = I.getAttribute('data-tooltip');
        if (G || ue) return { id: G, tooltip: ue, target: I, at: p };
      }
      I = I.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  re(() => {
    const I = M.current;
    if (I && s && (s.text || r)) {
      const G = I.getBoundingClientRect();
      let p = !1,
        ue = s.left,
        oe = s.top;
      G.right >= k.right && ((ue = k.width - G.width - 5), (p = !0)),
        G.bottom >= k.bottom &&
          ((oe = s.top - (G.bottom - k.bottom + 2)), (p = !0)),
        p && v((fe) => fe && { ...fe, left: ue, top: oe });
    }
  }, [s, k, r]);
  const z = se(null),
    O = 300,
    C = (I) => {
      clearTimeout(z.current),
        (z.current = setTimeout(() => {
          I();
        }, O));
    };
  function L(I) {
    let { id: G, tooltip: p, target: ue, at: oe } = V(I.target);
    if ((v(null), D(null), !p))
      if (G) p = X(G);
      else {
        clearTimeout(z.current);
        return;
      }
    const fe = I.clientX;
    C(() => {
      G && D(g(_(G)));
      const te = ue.getBoundingClientRect(),
        F = o.current,
        le = F
          ? F.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let Z, j;
      oe === 'left'
        ? ((Z = te.top + 5 - le.top), (j = te.right + 5 - le.left))
        : ((Z = te.top + te.height - le.top), (j = fe - le.left)),
        x(le),
        v({ top: Z, left: j, text: p });
    });
  }
  function g(I) {
    return n?.getTask(_(I)) || null;
  }
  function X(I) {
    return g(I)?.text || '';
  }
  function _(I) {
    const G = parseInt(I);
    return isNaN(G) ? I : G;
  }
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: L,
    children: [
      s && (s.text || r)
        ? /* @__PURE__ */ u('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: M,
            style: { top: `${s.top}px`, left: `${s.left}px` },
            children: r
              ? /* @__PURE__ */ u(r, { data: m })
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
function Ss({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ u(Tt, { fonts: t, children: n })
    : /* @__PURE__ */ u(Tt, { fonts: t });
}
function Ds({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ u($t, { fonts: t, children: n })
    : /* @__PURE__ */ u($t, { fonts: t });
}
const os = '2.8.2',
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
  Ss as Willow,
  Ds as WillowDark,
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
