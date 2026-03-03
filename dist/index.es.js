import { jsxs as Ie, jsx as u, Fragment as et } from 'react/jsx-runtime';
import {
  createContext as Zt,
  useContext as Ye,
  useMemo as $,
  useState as me,
  useCallback as I,
  useRef as le,
  useEffect as ie,
  Fragment as Jt,
  forwardRef as At,
  useImperativeHandle as Pt,
} from 'react';
import {
  context as Be,
  Button as vt,
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
  defaultTaskTypes as bn,
  getToolbarButtons as Mt,
  handleAction as zt,
  isHandledAction as _t,
  getMenuOptions as Rt,
  getEditorItems as vn,
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
  useStore as K,
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
  let r, c, o, C, k, p, m, R, s;
  function x(M) {
    (C = M.clientX),
      (k = M.clientY),
      (p = {
        ...En(r, t, M),
        y: n.getTask(o).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function F(M) {
    (r = Fe(M)),
      St(r) &&
        ((o = Qe(r)),
        (s = setTimeout(() => {
          (R = !0), n && n.touchStart && n.touchStart(), x(M.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', B),
        t.addEventListener('contextmenu', P),
        window.addEventListener('touchend', _));
  }
  function P(M) {
    if (R || s) return M.preventDefault(), !1;
  }
  function G(M) {
    M.which === 1 &&
      ((r = Fe(M)),
      St(r) &&
        ((o = Qe(r)),
        t.addEventListener('mousemove', w),
        window.addEventListener('mouseup', re),
        x(M)));
  }
  function b(M) {
    t.removeEventListener('mousemove', w),
      t.removeEventListener('touchmove', B),
      document.body.removeEventListener('mouseup', re),
      document.body.removeEventListener('touchend', _),
      (document.body.style.userSelect = ''),
      M &&
        (t.removeEventListener('mousedown', G),
        t.removeEventListener('touchstart', F));
  }
  function N(M) {
    const ge = M.clientX - C,
      ue = M.clientY - k;
    if (!c) {
      if (
        (Math.abs(ge) < Dt && Math.abs(ue) < Dt) ||
        (n && n.start && n.start({ id: o, e: M }) === !1)
      )
        return;
      (c = r.cloneNode(!0)),
        (c.style.pointerEvents = 'none'),
        c.classList.add('wx-reorder-task'),
        (c.style.position = 'absolute'),
        (c.style.left = p.left + 'px'),
        (c.style.top = p.top + 'px'),
        (r.style.visibility = 'hidden'),
        r.parentNode.insertBefore(c, r);
    }
    if (c) {
      const X = Math.round(Math.max(0, p.top + ue));
      if (n && n.move && n.move({ id: o, top: X, detail: m }) === !1) return;
      const Y = n.getTask(o),
        W = Y.$y;
      if (!p.start && p.y == W) return J();
      (p.start = !0), (p.y = Y.$y - 4), (c.style.top = X + 'px');
      const ne = document.elementFromPoint(M.clientX, M.clientY),
        Z = Fe(ne);
      if (Z && Z !== r) {
        const j = Qe(Z),
          Q = Z.getBoundingClientRect(),
          E = Q.top + Q.height / 2,
          O = M.clientY + p.db > E && Z.nextElementSibling !== r,
          se = M.clientY - p.dt < E && Z.previousElementSibling !== r;
        m?.after == j || m?.before == j
          ? (m = null)
          : O
            ? (m = { id: o, after: j })
            : se && (m = { id: o, before: j });
      }
    }
  }
  function w(M) {
    N(M);
  }
  function B(M) {
    R
      ? (M.preventDefault(), N(M.touches[0]))
      : s && (clearTimeout(s), (s = null));
  }
  function _() {
    (R = null), s && (clearTimeout(s), (s = null)), J();
  }
  function re() {
    J();
  }
  function J() {
    r && (r.style.visibility = ''),
      c &&
        (c.parentNode.removeChild(c),
        n && n.end && n.end({ id: o, top: p.top })),
      (o = r = c = p = m = null),
      b();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', G),
    t.addEventListener('touchstart', F),
    {
      destroy() {
        b(!0);
      },
    }
  );
}
function Dn({ row: t, column: n }) {
  const r = Ye(Ue);
  function c(C, k) {
    return {
      justifyContent: k.align,
      paddingLeft: `${(C.$level - 1) * 20}px`,
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
      columnWidth: C = 0,
      fullHeight: k,
      onTableAPIChange: p,
      multiTaskRows: m = !1,
      rowMapping: R = null,
      rowHeightOverrides: s = null,
    } = t,
    [x, F] = ht(C),
    [P, G] = me(),
    b = Ye(Be.i18n),
    N = $(() => b.getGroup('gantt'), [b]),
    w = Ye(Ue),
    B = K(w, 'scrollTop'),
    _ = K(w, 'cellHeight'),
    re = K(w, '_scrollTask'),
    J = K(w, '_selected'),
    M = K(w, 'area'),
    ge = K(w, '_tasks'),
    ue = K(w, '_scales'),
    X = K(w, 'columns'),
    Y = K(w, '_sort'),
    W = K(w, 'calendar'),
    ne = K(w, 'durationUnit'),
    Z = K(w, 'splitTasks'),
    [j, Q] = me(null),
    E = $(() => {
      if (!ge || !M) return [];
      if (m && R) {
        const i = /* @__PURE__ */ new Set();
        return ge.filter((h) => {
          const S = R.taskRows.get(h.id) ?? h.id;
          return i.has(S) ? !1 : (i.add(S), !0);
        });
      }
      return ge.slice(M.start, M.end);
    }, [ge, M, m, R]),
    O = I(
      (i, h) => {
        if (h === 'add-task')
          w.exec(h, {
            target: i,
            task: { text: N('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (h === 'open-task') {
          const S = E.find((q) => q.id === i);
          (S?.data || S?.lazy) && w.exec(h, { id: i, mode: !S.open });
        }
      },
      [E],
    ),
    se = I(
      (i) => {
        const h = Ze(i),
          S = i.target.dataset.action;
        S && i.preventDefault(),
          h
            ? S === 'add-task' || S === 'open-task'
              ? O(h, S)
              : w.exec('select-task', {
                  id: h,
                  toggle: i.ctrlKey || i.metaKey,
                  range: i.shiftKey,
                  show: !0,
                })
            : S === 'add-task' && O(null, S);
      },
      [w, O],
    ),
    U = le(null),
    we = le(null),
    [De, be] = me(0),
    [Ae, Ne] = me(!1);
  ie(() => {
    const i = we.current;
    if (!i || typeof ResizeObserver > 'u') return;
    const h = () => be(i.clientWidth);
    h();
    const S = new ResizeObserver(h);
    return S.observe(i), () => S.disconnect();
  }, []);
  const ze = le(null),
    Re = I(
      (i) => {
        const h = i.id,
          { before: S, after: q } = i,
          pe = i.onMove;
        let he = S || q,
          ve = S ? 'before' : 'after';
        if (pe) {
          if (ve === 'after') {
            const He = w.getTask(he);
            He.data?.length &&
              He.open &&
              ((ve = 'before'), (he = He.data[0].id));
          }
          ze.current = { id: h, [ve]: he };
        } else ze.current = null;
        w.exec('move-task', {
          id: h,
          mode: ve,
          target: he,
          inProgress: pe,
        });
      },
      [w],
    ),
    y = $(() => M?.from ?? 0, [M]),
    D = $(() => ue?.height ?? 0, [ue]),
    L = $(
      () => (!r && o !== 'grid' ? (x ?? 0) > (c ?? 0) : (x ?? 0) > (De ?? 0)),
      [r, o, x, c, De],
    ),
    de = $(() => {
      const i = {};
      return (
        (L && o === 'all') || (o === 'grid' && L)
          ? (i.width = x)
          : o === 'grid' && (i.width = '100%'),
        i
      );
    }, [L, o, x]),
    te = $(() => (j && !E.find((i) => i.id === j.id) ? [...E, j] : E), [E, j]),
    ee = $(() => {
      let i = (X || []).map((q) => {
        q = { ...q };
        const pe = q.header;
        if (typeof pe == 'object') {
          const he = pe.text && N(pe.text);
          q.header = { ...pe, text: he };
        } else q.header = N(pe);
        if (q.cell && q.id !== 'text' && q.id !== 'add-task') {
          const he = q.cell;
          q.cell = (ve) => /* @__PURE__ */ u(he, { ...ve, api: w });
        }
        return q;
      });
      const h = i.findIndex((q) => q.id === 'text'),
        S = i.findIndex((q) => q.id === 'add-task');
      if (
        (h !== -1 && (i[h].cell && (i[h]._cell = i[h].cell), (i[h].cell = Dn)),
        S !== -1)
      ) {
        i[S].cell = i[S].cell || Lt;
        const q = i[S].header;
        if (
          (typeof q != 'object' && (i[S].header = { text: q }),
          (i[S].header.cell = q.cell || Lt),
          n)
        )
          i.splice(S, 1);
        else if (r) {
          const [pe] = i.splice(S, 1);
          i.unshift(pe);
        }
      }
      return i.length > 0 && (i[i.length - 1].resize = !1), i;
    }, [X, N, n, r, w]),
    fe = $(
      () =>
        o === 'all'
          ? `${c}px`
          : o === 'grid'
            ? 'calc(100% - 4px)'
            : ee.find((i) => i.id === 'add-task')
              ? '50px'
              : '0',
      [o, c, ee],
    ),
    Pe = $(() => {
      if (te && Y?.length) {
        const i = {};
        return (
          Y.forEach(({ key: h, order: S }, q) => {
            i[h] = {
              order: S,
              ...(Y.length > 1 && { index: q }),
            };
          }),
          i
        );
      }
      return {};
    }, [te, Y]),
    _e = I(() => ee.some((i) => i.flexgrow && !i.hidden), []),
    Te = $(() => _e(), [_e, Ae]),
    Le = $(() => {
      let i = o === 'chart' ? ee.filter((S) => S.id === 'add-task') : ee;
      const h = o === 'all' ? c : De;
      if (!Te) {
        let S = x,
          q = !1;
        if (ee.some((pe) => pe.$width)) {
          let pe = 0;
          (S = ee.reduce(
            (he, ve) => (
              ve.hidden || ((pe += ve.width), (he += ve.$width || ve.width)), he
            ),
            0,
          )),
            pe > S && S > h && (q = !0);
        }
        if (q || S < h) {
          let pe = 1;
          return (
            q || (pe = (h - 50) / (S - 50 || 1)),
            i.map(
              (he) => (
                he.id !== 'add-task' &&
                  !he.hidden &&
                  (he.$width || (he.$width = he.width),
                  (he.width = he.$width * pe)),
                he
              ),
            )
          );
        }
      }
      return i;
    }, [o, ee, Te, x, c, De]),
    Ge = I(
      (i) => {
        if (!_e()) {
          const h = Le.reduce(
            (S, q) => (
              i && q.$width && (q.$width = q.width),
              S + (q.hidden ? 0 : q.width)
            ),
            0,
          );
          h !== x && F(h);
        }
        Ne(!0), Ne(!1);
      },
      [_e, Le, x, F],
    ),
    l = I(() => {
      ee.filter((h) => h.flexgrow && !h.hidden).length === 1 &&
        ee.forEach((h) => {
          h.$width && !h.flexgrow && !h.hidden && (h.width = h.$width);
        });
    }, []),
    A = I(
      (i) => {
        if (!n) {
          const h = Ze(i),
            S = dn(i, 'data-col-id');
          !(S && ee.find((pe) => pe.id == S))?.editor &&
            h &&
            w.exec('show-editor', { id: h });
        }
      },
      [w, n],
      // cols is defined later; relies on latest value at call time
    ),
    z = $(() => (Array.isArray(J) ? J.map((i) => i.id) : []), [J]),
    v = I(() => {
      if (U.current && te !== null) {
        const i = U.current.querySelector('.wx-body');
        i &&
          (m
            ? (i.style.top = '0px')
            : (i.style.top = -((B ?? 0) - (y ?? 0)) + 'px'));
      }
      we.current && (we.current.scrollTop = 0);
    }, [te, B, y, m]);
  ie(() => {
    U.current && v();
  }, [B, y, v]),
    ie(() => {
      const i = U.current;
      if (!i) return;
      const h = i.querySelector('.wx-table-box .wx-body');
      if (!h || typeof ResizeObserver > 'u') return;
      const S = new ResizeObserver(() => {
        v();
      });
      return (
        S.observe(h),
        () => {
          S.disconnect();
        }
      );
    }, [Le, de, o, fe, te, v]),
    ie(() => {
      if (!re || !P) return;
      const { id: i } = re,
        h = P.getState().focusCell;
      h &&
        h.row !== i &&
        U.current &&
        U.current.contains(document.activeElement) &&
        P.exec('focus-cell', {
          row: i,
          column: h.column,
        });
    }, [re, P]),
    ie(() => {
      if (!m) return;
      const i = U.current;
      if (!i) return;
      const h = i.querySelector('.wx-table-box .wx-body');
      if (!h) return;
      let S = 0;
      h.querySelectorAll('[data-id]').forEach((pe) => {
        const he = pe.getAttribute('data-id'),
          ve = (s && he && s[he]) || _;
        (pe.style.height = `${ve}px`),
          (pe.style.minHeight = `${ve}px`),
          (S += ve);
      }),
        S > 0 && (h.style.height = `${S}px`);
    }, [s, m, te, _]);
  const Ee = I(
      ({ id: i }) => {
        if (n) return !1;
        w.getTask(i).open && w.exec('open-task', { id: i, mode: !1 });
        const h = w.getState()._tasks.find((S) => S.id === i);
        if ((Q(h || null), !h)) return !1;
      },
      [w, n],
    ),
    ce = I(
      ({ id: i, top: h }) => {
        ze.current
          ? Re({ ...ze.current, onMove: !1 })
          : w.exec('drag-task', {
              id: i,
              top: h + (y ?? 0),
              inProgress: !1,
            }),
          Q(null);
      },
      [w, Re, y],
    ),
    xe = I(
      ({ id: i, top: h, detail: S }) => {
        S && Re({ ...S, onMove: !0 }),
          w.exec('drag-task', {
            id: i,
            top: h + (y ?? 0),
            inProgress: !0,
          });
      },
      [w, Re, y],
    );
  ie(() => {
    const i = U.current;
    return i
      ? Sn(i, {
          start: Ee,
          end: ce,
          move: xe,
          getTask: w.getTask,
        }).destroy
      : void 0;
  }, [w, Ee, ce, xe]);
  const ke = I(
      (i) => {
        const { key: h, isInput: S } = i;
        if (!S && (h === 'arrowup' || h === 'arrowdown'))
          return (i.eventSource = 'grid'), w.exec('hotkey', i), !1;
        if (h === 'enter') {
          const q = P?.getState().focusCell;
          if (q) {
            const { row: pe, column: he } = q;
            he === 'add-task'
              ? O(pe, 'add-task')
              : he === 'text' && O(pe, 'open-task');
          }
        }
      },
      [w, O, P],
    ),
    $e = le(null),
    Ce = () => {
      $e.current = {
        setTableAPI: G,
        handleHotkey: ke,
        sortVal: Y,
        api: w,
        adjustColumns: l,
        setColumnWidth: Ge,
        tasks: E,
        calendarVal: W,
        durationUnitVal: ne,
        splitTasksVal: Z,
        onTableAPIChange: p,
      };
    };
  Ce(),
    ie(() => {
      Ce();
    }, [G, ke, Y, w, l, Ge, E, W, ne, Z, p]);
  const We = I((i) => {
    G(i),
      i.intercept('hotkey', (h) => $e.current.handleHotkey(h)),
      i.intercept('scroll', () => !1),
      i.intercept('select-row', () => !1),
      i.intercept('sort-rows', (h) => {
        const S = $e.current.sortVal,
          { key: q, add: pe } = h,
          he = S ? S.find((He) => He.key === q) : null;
        let ve = 'asc';
        return (
          he && (ve = !he || he.order === 'asc' ? 'desc' : 'asc'),
          w.exec('sort-tasks', {
            key: q,
            order: ve,
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
        const { id: S, column: q, value: pe } = h,
          he = $e.current.tasks.find((ve) => ve.id === S);
        if (he) {
          const ve = { ...he };
          let He = pe;
          He && !isNaN(He) && !(He instanceof Date) && (He *= 1),
            (ve[q] = He),
            Gt(
              ve,
              {
                calendar: $e.current.calendarVal,
                durationUnit: $e.current.durationUnitVal,
                splitTasks: $e.current.splitTasksVal,
              },
              q,
            ),
            w.exec('update-task', {
              id: S,
              task: ve,
            });
        }
        return !1;
      }),
      p && p(i);
  }, []);
  return /* @__PURE__ */ u('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${fe}` },
    ref: we,
    children: /* @__PURE__ */ u('div', {
      ref: U,
      style: de,
      className: 'wx-rHj6070p wx-table',
      onClick: se,
      onDoubleClick: A,
      children: /* @__PURE__ */ u(Tn, {
        init: We,
        sizes: {
          rowHeight: _,
          headerHeight: (D ?? 0) - 1,
        },
        rowStyle: (i) =>
          i.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (i) =>
          `wx-rHj6070p wx-text-${i.align}${i.id === 'add-task' ? ' wx-action' : ''}`,
        data: te,
        columns: Le,
        selectedRows: [...z],
        sortMarks: Pe,
      }),
    }),
  });
}
function Nn({ borders: t = '', rowLayout: n = null }) {
  const r = Ye(Ue),
    c = K(r, 'cellWidth'),
    o = K(r, 'cellHeight'),
    C = le(null),
    [k, p] = me('#e4e4e4');
  ie(() => {
    if (typeof getComputedStyle < 'u' && C.current) {
      const s = getComputedStyle(C.current).getPropertyValue(
        '--wx-gantt-border',
      );
      p(s ? s.substring(s.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const m = $(() => {
    if (!n) return null;
    const s = [];
    let x = 0;
    for (const F of n) (x += F.height), s.push(x);
    return s;
  }, [n]);
  if (!m) {
    const s = {
      width: '100%',
      height: '100%',
      background: c != null && o != null ? `url(${hn(c, o, k, t)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ u('div', { ref: C, style: s });
  }
  const R = c
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${c - 1}px, ${k} ${c - 1}px, ${k} ${c}px)`
    : void 0;
  return /* @__PURE__ */ Ie('div', {
    ref: C,
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
      m.map((s, x) =>
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
function In({ onSelectLink: t, selectedLink: n, readonly: r }) {
  const c = Ye(Ue),
    o = K(c, '_links'),
    C = K(c, 'criticalPath'),
    k = le(null),
    p = I(
      (m) => {
        const R = m?.target?.classList;
        !R?.contains('wx-line') && !R?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    ie(() => {
      if (!r && n && k.current) {
        const m = (R) => {
          k.current && !k.current.contains(R.target) && p(R);
        };
        return (
          document.addEventListener('click', m),
          () => {
            document.removeEventListener('click', m);
          }
        );
      }
    }, [r, n, p]),
    /* @__PURE__ */ Ie('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (o || []).map((m) => {
          const R =
            'wx-dkx3NwEn wx-line' +
            (C && m.$critical ? ' wx-critical' : '') +
            (r ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ u(
            'polyline',
            {
              className: R,
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
  function c(C) {
    const k = n.segments[C];
    return {
      left: `${k.$x}px`,
      top: '0px',
      width: `${k.$w}px`,
      height: '100%',
    };
  }
  function o(C) {
    if (!n.progress) return 0;
    const k = (n.duration * n.progress) / 100,
      p = n.segments;
    let m = 0,
      R = 0,
      s = null;
    do {
      const x = p[R];
      R === C &&
        (m > k ? (s = 0) : (s = Math.min((k - m) / x.duration, 1) * 100)),
        (m += x.duration),
        R++;
    } while (s === null && R < p.length);
    return s || 0;
  }
  return /* @__PURE__ */ u('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((C, k) =>
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
              children: C.text || '',
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
      C = 864e5,
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
      p = Math.floor(t / c),
      m = new Date(r.getTime() + p * k * C);
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
      p = new Date(t.getTime() + n * k);
    return p.setUTCHours(0, 0, 0, 0), p;
  };
function Gn(t) {
  const {
      readonly: n,
      taskTemplate: r,
      multiTaskRows: c = !1,
      rowMapping: o = null,
      rowHeightOverrides: C = null,
      allowTaskIntersection: k = !0,
      summaryBarCounts: p = !1,
      marqueeSelect: m = !1,
      copyPaste: R = !1,
    } = t,
    s = Ye(Ue),
    [x, F] = mt(s, '_tasks'),
    [P, G] = mt(s, '_links'),
    b = K(s, 'area'),
    N = K(s, '_scales'),
    w = K(s, 'taskTypes'),
    B = K(s, 'baselines'),
    _ = K(s, '_selected'),
    re = K(s, '_scrollTask'),
    J = K(s, 'criticalPath'),
    M = K(s, 'tasks'),
    ge = K(s, 'schedule'),
    ue = K(s, 'splitTasks'),
    X = K(s, 'summary'),
    Y = $(() => {
      if (!b || !Array.isArray(x)) return [];
      const e = b.start ?? 0,
        a = b.end ?? 0;
      return c && o
        ? x.map((f) => ({ ...f }))
        : x.slice(e, a).map((f) => ({ ...f }));
    }, [F, b, c, o]),
    W = K(s, 'cellHeight'),
    ne = $(() => {
      if (!c || !o || !Y.length) return Y;
      const e = /* @__PURE__ */ new Map(),
        a = [];
      x.forEach((T) => {
        const oe = o.taskRows.get(T.id) ?? T.id;
        e.has(oe) || (e.set(oe, a.length), a.push(oe));
      });
      const f = /* @__PURE__ */ new Map();
      Y.forEach((T) => {
        if (T.type === 'summary') return;
        const oe = o.taskRows.get(T.id) ?? T.id;
        f.has(oe) || f.set(oe, []), f.get(oe).push(T);
      });
      const d = /* @__PURE__ */ new Map(),
        g = /* @__PURE__ */ new Map();
      f.forEach((T, oe) => {
        const ae = [],
          Me = [...T].sort((ye, Se) => (ye.$x ?? 0) - (Se.$x ?? 0));
        for (const ye of Me) {
          const Se = ye.$x ?? 0,
            Ve = Se + (ye.$w ?? 0);
          let Oe = !1;
          for (let Xe = 0; Xe < ae.length; Xe++)
            if (
              !ae[Xe].some((je) => {
                const rt = je.$x ?? 0,
                  ut = rt + (je.$w ?? 0);
                return It(Se, Ve, rt, ut);
              })
            ) {
              ae[Xe].push(ye), d.set(ye.id, Xe), (Oe = !0);
              break;
            }
          Oe || (ae.push([ye]), d.set(ye.id, ae.length - 1));
        }
        g.set(oe, ae.length);
      });
      const H = /* @__PURE__ */ new Map();
      let V = 0;
      for (const T of a) {
        H.set(T, V);
        const oe = (C && C[T]) || W;
        V += oe;
      }
      return Y.map((T) => {
        const oe = o.taskRows.get(T.id) ?? T.id,
          ae = H.get(oe) ?? 0;
        if (T.type === 'summary') {
          if ((f.get(oe) || []).length > 0) return { ...T, $y: ae, $skip: !0 };
          const Xe = (C && C[oe]) || W,
            Ke = Math.max(0, Math.floor((Xe - T.$h) / 2));
          return {
            ...T,
            $y: ae + Ke,
            $y_base: T.$y_base !== void 0 ? ae + Ke : void 0,
          };
        }
        const Me = g.get(oe) || 1,
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
        const Se = (C && C[oe]) || W,
          Ve = Math.max(0, Math.round((Se - T.$h) / 2));
        return {
          ...T,
          $y: ae + Ve,
          $y_base: T.$y_base !== void 0 ? ae + Ve : void 0,
        };
      });
    }, [Y, c, o, x, W, C]),
    Z = $(() => N.lengthUnitWidth, [N]),
    j = $(() => N.lengthUnit || 'day', [N]),
    Q = $(() => {
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
              for (let g = d + 1; g < f.length; g++) {
                const H = f[d],
                  V = f[g];
                It(H.$x, H.$x + H.$w, V.$x, V.$x + V.$w) &&
                  (e.add(H.id), e.add(V.id));
              }
        }),
        e
      );
    }, [k, c, o, x, F]),
    E = $(() => {
      if (!p || !x?.length || !Z) return null;
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
          const g = e.get(d);
          if (!g?.length) return;
          const H = /* @__PURE__ */ new Map();
          g.forEach((V) => {
            if (V.$x == null || V.$w == null) return;
            const T = Math.floor(V.$x / Z),
              oe = Math.ceil((V.$x + V.$w) / Z);
            for (let ae = T; ae < oe; ae++) H.set(ae, (H.get(ae) || 0) + 1);
          }),
            H.size > 0 && f.set(d, H);
        }),
        f
      );
    }, [p, x, Z]),
    [O, se] = me(null),
    U = le(null),
    [we, De] = me(null),
    [be, Ae] = me(null),
    [Ne, ze] = me(null),
    Re = le(null);
  Re.current = Ne;
  const y = le(0),
    D = le(!1),
    [L, de] = me(void 0),
    [te, ee] = me(null),
    fe = le(null),
    [Pe, _e] = me(null),
    Te = $(
      () =>
        Pe && {
          ...P.find((e) => e.id === Pe),
        },
      [Pe, G],
    ),
    [Le, Ge] = me(void 0),
    l = le(null),
    [A, z] = me(0),
    v = le(null),
    Ee = $(() => {
      const e = v.current;
      return !!(_.length && e && e.contains(document.activeElement));
    }, [_, v.current]),
    ce = $(() => Ee && _[_.length - 1]?.id, [Ee, _]);
  ie(() => {
    if (re && Ee && re) {
      const { id: e } = re,
        a = v.current?.querySelector(`.wx-bar[data-id='${e}']`);
      a && a.focus({ preventScroll: !0 });
    }
  }, [re]),
    ie(() => {
      const e = v.current;
      if (e && (z(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const a = new ResizeObserver((f) => {
          f[0] && z(f[0].contentRect.width);
        });
        return a.observe(e), () => a.disconnect();
      }
    }, [v.current]);
  const xe = I(() => {
      document.body.style.userSelect = 'none';
    }, []),
    ke = I(() => {
      document.body.style.userSelect = '';
    }, []),
    $e = $(() => {
      if (!c || !o || !x?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        x.forEach((d) => {
          const g = o.taskRows.get(d.id) ?? d.id;
          a.has(g) || (a.set(g, f.length), f.push(g));
        }),
        x.forEach((d) => {
          const g = o.taskRows.get(d.id) ?? d.id,
            H = a.get(g) ?? 0;
          e.set(d.id, H * W);
        }),
        e
      );
    }, [x, c, o, W]),
    Ce = $(() => {
      if (!c || !o || !x?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        x.forEach((d) => {
          const g = o.taskRows.get(d.id) ?? d.id;
          a.has(g) || (a.set(g, f.length), f.push(g));
        }),
        x.forEach((d) => {
          const g = d.row ?? d.id;
          if (!e.has(g)) {
            const H = o.taskRows.get(d.id) ?? d.id,
              V = a.get(H) ?? 0;
            e.set(g, V * W);
          }
        }),
        e
      );
    }, [x, c, o, W]),
    We = I(
      (e) => {
        if (!v.current) return [];
        const a = Math.min(e.startX, e.currentX),
          f = Math.max(e.startX, e.currentX),
          d = Math.min(e.startY, e.currentY),
          g = Math.max(e.startY, e.currentY);
        return x.filter((H) => {
          const V = H.$x,
            T = H.$x + H.$w,
            ae = $e.get(H.id) ?? H.$y,
            Me = ae + H.$h;
          return V < f && T > a && ae < g && Me > d;
        });
      },
      [x, $e],
    ),
    i = I(() => {
      if (!R) return;
      const e = s.getState()._selected;
      if (!e || !e.length) return;
      const a = 864e5,
        f = e
          .map((T) => {
            if (!s.getTask(T.id)) return null;
            const ae = x.find((ut) => ut.id === T.id);
            if (!ae) return null;
            const {
                $x: Me,
                $y: ye,
                $h: Se,
                $w: Ve,
                $skip: Oe,
                $level: Xe,
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
      const g = f[0].parent,
        H = f.filter((T) => T.parent === g);
      if (H.length === 0) return;
      const V = H.reduce(
        (T, oe) => (oe.start && (!T || oe.start < T) ? oe.start : T),
        null,
      );
      (dt = H.map((T) => ({
        ...T,
        _startCellOffset: An(T.start, V, N),
      }))),
        (Nt = g),
        (ft = V);
    }, [R, s, x, N]),
    h = I(
      (e, a, f) => {
        if (!a.length || !e || f == null) return;
        const d = 864e5,
          g = s.getHistory();
        g?.startBatch();
        const H = new Date(e);
        H.setUTCHours(0, 0, 0, 0),
          a.forEach((V, T) => {
            const oe = `task-${Date.now()}-${T}`,
              ae = Pn(H, V._startCellOffset || 0, N),
              Me = new Date(ae.getTime() + (V._startDayOfWeek || 0) * d);
            Me.setUTCHours(0, 0, 0, 0);
            const ye = new Date(Me.getTime() + (V._durationDays || 7) * d);
            ye.setUTCHours(0, 0, 0, 0),
              s.exec('add-task', {
                task: {
                  id: oe,
                  text: V.text,
                  start: Me,
                  end: ye,
                  type: V.type || 'task',
                  parent: f,
                  row: V.row,
                },
                target: f,
                mode: 'child',
                skipUndo: T > 0,
              });
          }),
          g?.endBatch();
      },
      [s, N],
    );
  ie(
    () =>
      R
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
    [R, s, i],
  ),
    ie(() => {
      if (!be) return;
      const e = (a) => {
        a.key === 'Escape' &&
          (a.preventDefault(), a.stopPropagation(), Ae(null));
      };
      return (
        document.addEventListener('keydown', e, !0),
        () => document.removeEventListener('keydown', e, !0)
      );
    }, [be]);
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
        const { left: g, width: H } = e.getBoundingClientRect(),
          V = (a.clientX - g) / H;
        let T = 0.2 / (H > 200 ? H / 200 : 1);
        return V < T ? 'start' : V > 1 - T ? 'end' : '';
      },
      [s],
    ),
    q = I(
      (e, a) => {
        const { clientX: f } = a,
          d = Qe(e),
          g = s.getTask(d),
          H = a.target.classList;
        if (
          !a.target.closest('.wx-delete-button') &&
          !a.target.closest('[data-interactive]') &&
          !n
        ) {
          if (H.contains('wx-progress-marker')) {
            const { progress: V } = s.getTask(d);
            (fe.current = {
              id: d,
              x: f,
              progress: V,
              dx: 0,
              node: e,
              marker: a.target,
            }),
              a.target.classList.add('wx-progress-in-drag');
          } else {
            const V = S(e, a, g) || 'move',
              T = {
                id: d,
                mode: V,
                x: f,
                dx: 0,
                l: g.$x,
                w: g.$w,
              };
            if (ue && g.segments?.length) {
              const oe = Fe(a, 'data-segment');
              oe && ((T.segmentIndex = oe.dataset.segment * 1), mn(g, T));
            }
            ee(T);
          }
          xe();
        }
      },
      [s, n, S, xe, ue],
    ),
    pe = I(
      (e) => {
        if (e.button !== 0 || be) return;
        const a = Fe(e);
        if (!a && m && !n) {
          const f = v.current;
          if (!f) return;
          const d = f.getBoundingClientRect(),
            g = e.clientX - d.left,
            H = e.clientY - d.top;
          if (R) {
            const T = Ht(g, N);
            T && ((Re.current = T), ze(T));
          }
          const V = {
            startX: g,
            startY: H,
            currentX: g,
            currentY: H,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          se(V), (U.current = V), xe();
          return;
        }
        if (a && m && !n && _.length > 1) {
          const f = Qe(a);
          if (_.some((g) => g.id === f)) {
            De({
              startX: e.clientX,
              ids: _.map((g) => g.id),
              tasks: _.map((g) => {
                const H = s.getTask(g.id);
                return {
                  id: g.id,
                  start: H.start,
                  end: H.end,
                  $x: H.$x,
                  $w: H.$w,
                };
              }),
            }),
              xe();
            return;
          }
        }
        a && q(a, e);
      },
      [q, m, R, n, be, N, _, s, xe],
    ),
    he = I(
      (e) => {
        const a = Fe(e);
        a &&
          (l.current = setTimeout(() => {
            Ge(!0), q(a, e.touches[0]);
          }, 300));
      },
      [q],
    ),
    ve = I((e) => {
      _e(e);
    }, []),
    He = I(() => {
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
          se(null),
          (U.current = null),
          ke(),
          (D.current = !0);
        return;
      }
      if (we) {
        const { ids: a, tasks: f, startX: d } = we;
        De(null), ke(), (D.current = !0);
        return;
      }
      if (fe.current) {
        const { dx: a, id: f, marker: d, value: g } = fe.current;
        (fe.current = null),
          typeof g < 'u' &&
            a &&
            s.exec('update-task', {
              id: f,
              task: { progress: g },
              inProgress: !1,
            }),
          d.classList.remove('wx-progress-in-drag'),
          (D.current = !0),
          ke();
      } else if (te) {
        const {
          id: a,
          mode: f,
          dx: d,
          l: g,
          w: H,
          start: V,
          segment: T,
          index: oe,
        } = te;
        if ((ee(null), V)) {
          const ae = Math.round(d / Z);
          if (!ae)
            s.exec('drag-task', {
              id: a,
              width: H,
              left: g,
              inProgress: !1,
              ...(T && { segmentIndex: oe }),
            });
          else {
            let Me = {},
              ye = s.getTask(a);
            T && (ye = ye.segments[oe]);
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
                ...(T && { segmentIndex: oe }),
              });
          }
          D.current = !0;
        }
        ke();
      }
    }, [s, ke, te, Z, j]),
    tt = I(
      (e, a) => {
        const { clientX: f } = a;
        if (R && v.current) {
          const d = v.current.getBoundingClientRect();
          y.current = f - d.left;
        }
        if (be && v.current) {
          const d = v.current.getBoundingClientRect();
          Ae((g) => (g ? { ...g, currentX: f - d.left } : null));
        }
        if (O) {
          const d = v.current;
          if (!d) return;
          const g = d.getBoundingClientRect(),
            H = f - g.left,
            V = a.clientY - g.top;
          se((T) => ({
            ...T,
            currentX: H,
            currentY: V,
          })),
            U.current && ((U.current.currentX = H), (U.current.currentY = V));
          return;
        }
        if (!n)
          if (fe.current) {
            const { node: d, x: g, id: H } = fe.current,
              V = (fe.current.dx = f - g),
              T = Math.round((V / d.offsetWidth) * 100);
            let oe = fe.current.progress + T;
            (fe.current.value = oe = Math.min(Math.max(0, oe), 100)),
              s.exec('update-task', {
                id: H,
                task: { progress: oe },
                inProgress: !0,
              });
          } else if (te) {
            ve(null);
            const {
                mode: d,
                l: g,
                w: H,
                x: V,
                id: T,
                start: oe,
                segment: ae,
                index: Me,
              } = te,
              ye = s.getTask(T),
              Se = f - V,
              Ve = Math.round(Z) || 1;
            if (
              (!oe && Math.abs(Se) < 20) ||
              (d === 'start' && H - Se < Ve) ||
              (d === 'end' && H + Se < Ve) ||
              (d === 'move' &&
                ((Se < 0 && g + Se < 0) || (Se > 0 && g + H + Se > A))) ||
              (te.segment && !gn(ye, te))
            )
              return;
            const Oe = { ...te, dx: Se };
            let Xe, Ke;
            if (
              (d === 'start'
                ? ((Xe = g + Se), (Ke = H - Se))
                : d === 'end'
                  ? ((Xe = g), (Ke = H + Se))
                  : d === 'move' && ((Xe = g + Se), (Ke = H)),
              s.exec('drag-task', {
                id: T,
                width: Ke,
                left: Xe,
                inProgress: !0,
                start: oe,
                ...(ae && { segmentIndex: Me }),
              }),
              !Oe.start &&
                ((d === 'move' && ye.$x == g) || (d !== 'move' && ye.$w == H)))
            ) {
              (D.current = !0), He();
              return;
            }
            (Oe.start = !0), ee(Oe);
          } else {
            const d = Fe(e);
            if (d) {
              const g = s.getTask(Qe(d)),
                V = Fe(e, 'data-segment') || d,
                T = S(V, a, g);
              V.style.cursor = T && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [s, n, te, Z, A, S, ve, He],
    ),
    Yt = I(
      (e) => {
        tt(e, e);
      },
      [tt],
    ),
    Kt = I(
      (e) => {
        Le
          ? (e.preventDefault(), tt(e, e.touches[0]))
          : l.current && (clearTimeout(l.current), (l.current = null));
      },
      [Le, tt],
    ),
    ct = I(() => {
      He();
    }, [He]),
    Bt = I(() => {
      Ge(null),
        l.current && (clearTimeout(l.current), (l.current = null)),
        He();
    }, [He]);
  ie(
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
        const f = L.id,
          d = L.start;
        return e === f
          ? !0
          : !!P.find(
              (g) => g.target == e && g.source == f && g.type === nt(d, a),
            );
      },
      [L, G, nt],
    ),
    wt = I(() => {
      L && de(null);
    }, [L]),
    qt = I(
      (e) => {
        if (D.current) {
          D.current = !1;
          return;
        }
        if (be && be.currentX != null) {
          const f = Ht(be.currentX, N);
          f && h(f, be.tasks, be.parent), Ae(null);
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
            s.exec('delete-link', { id: Pe }), _e(null);
          else {
            let d;
            const g = Fe(e, 'data-segment');
            g && (d = g.dataset.segment * 1),
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
      [s, L, G, Te, st, nt, wt],
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
        if (Le || l.current) return e.preventDefault(), !1;
      },
      [Le],
    ),
    pt = $(() => w.map((e) => e.id), [w]),
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
    at = I((e) => J && M.byId(e).$critical, [J, M]),
    bt = I(
      (e) => {
        if (ge?.auto) {
          const a = M.getSummaryId(e, !0),
            f = M.getSummaryId(L.id, !0);
          return (
            L?.id &&
            !(Array.isArray(a) ? a : [a]).includes(L.id) &&
            !(Array.isArray(f) ? f : [f]).includes(e)
          );
        }
        return L;
      },
      [ge, M, L],
    );
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${ne.length ? ne[0].$h : 0}px` },
    ref: v,
    onContextMenu: Qt,
    onMouseDown: pe,
    onMouseMove: Yt,
    onTouchStart: he,
    onTouchMove: Kt,
    onTouchEnd: Bt,
    onClick: qt,
    onDoubleClick: Vt,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ u(In, {
        onSelectLink: ve,
        selectedLink: Te,
        readonly: n,
      }),
      ne.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const a = Q.has(e.id),
          f =
            `wx-bar wx-${xt(e.type)}` +
            (Le && te && e.id === te.id ? ' wx-touch' : '') +
            (L && L.id === e.id ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (ue && e.segments ? ' wx-split' : '') +
            (a ? ' wx-collision' : ''),
          d =
            'wx-link wx-left' +
            (L ? ' wx-visible' : '') +
            (!L || (!st(e.id, !0) && bt(e.id)) ? ' wx-target' : '') +
            (L && L.id === e.id && L.start ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : ''),
          g =
            'wx-link wx-right' +
            (L ? ' wx-visible' : '') +
            (!L || (!st(e.id, !1) && bt(e.id)) ? ' wx-target' : '') +
            (L && L.id === e.id && !L.start ? ' wx-selected' : '') +
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
                        ? /* @__PURE__ */ u(vt, {
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
                            e.progress && !(ue && e.segments)
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
                            !(ue && e.segments) &&
                            !(e.type == 'summary' && X?.autoProgress)
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
                              : ue && e.segments
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
                        ? /* @__PURE__ */ u(vt, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ u('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ u('div', {
                            className: 'wx-GKbcLEGA ' + g,
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
                    E &&
                      e.type === 'summary' &&
                      (() => {
                        const H = E.get(e.id),
                          V = Math.floor(e.$x / Z),
                          T = Math.ceil((e.$x + e.$w) / Z);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: T - V }, (oe, ae) => {
                            const Me = V + ae,
                              ye = H?.get(Me) || 0;
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
      O &&
        (() => {
          const e = Math.min(O.startX, O.currentX),
            a = Math.min(O.startY, O.currentY),
            f = Math.abs(O.currentX - O.startX),
            d = Math.abs(O.currentY - O.startY);
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
      be &&
        be.currentX != null &&
        be.tasks.map((e, a) => {
          const d =
              (Math.floor(be.currentX / Z) + (e._startCellOffset || 0)) * Z,
            g = e._originalWidth || Z,
            H = e._originalHeight || W,
            V = Ce.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: d, top: V, width: g, height: H },
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
    o = K(c, '_scales');
  return /* @__PURE__ */ u('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: o.width },
    children: (o?.rows || []).map((C, k) =>
      /* @__PURE__ */ u(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${C.height}px` },
          children: (C.cells || []).map((p, m) => {
            const R = n ? n(p.date, p.unit) : '',
              s = 'wx-cell ' + (p.css || '') + ' ' + (R || '');
            return /* @__PURE__ */ u(
              'div',
              {
                className: 'wx-ZkvhDKir ' + s,
                style: {
                  width: `${p.width}px`,
                  cursor: r ? 'pointer' : void 0,
                },
                onClick: r ? (x) => r(p.date, p.unit, x.nativeEvent) : void 0,
                children: p.value,
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
  const n = le(null),
    r = le(0),
    c = le(null),
    o = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    r.current++,
    ie(() => {
      if (o)
        return (
          cancelAnimationFrame(c.current),
          (c.current = requestAnimationFrame(() => {
            const C = {
              label: t,
              time: performance.now() - n.current,
              renders: r.current,
              timestamp: Date.now(),
            };
            _n.set(t, C),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: C }),
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
      cellBorders: C,
      highlightTime: k,
      onScaleClick: p,
      multiTaskRows: m = !1,
      rowMapping: R = null,
      rowHeightOverrides: s = null,
      allowTaskIntersection: x = !0,
      summaryBarCounts: F = !1,
      marqueeSelect: P = !1,
      copyPaste: G = !1,
    } = t,
    b = Ye(Ue),
    [N, w] = mt(b, '_selected'),
    B = K(b, 'scrollTop'),
    _ = K(b, 'cellHeight'),
    re = K(b, 'cellWidth'),
    J = K(b, '_scales'),
    M = K(b, '_markers'),
    ge = K(b, '_scrollTask'),
    ue = K(b, 'zoom'),
    [X, Y] = me(),
    W = le(null),
    ne = K(b, '_tasks'),
    Z = 1 + (J?.rows?.length || 0),
    j = $(() => {
      if (!m || !R || !ne?.length) return null;
      const y = /* @__PURE__ */ new Map(),
        D = /* @__PURE__ */ new Map(),
        L = [];
      return (
        ne.forEach((de) => {
          const te = R.taskRows.get(de.id) ?? de.id;
          D.has(te) || (D.set(te, L.length), L.push(te));
        }),
        ne.forEach((de) => {
          const te = R.taskRows.get(de.id) ?? de.id,
            ee = D.get(te) ?? 0;
          y.set(de.id, ee * _);
        }),
        y
      );
    }, [ne, m, R, _]),
    Q = $(() => {
      const y = [];
      return (
        N &&
          N.length &&
          _ &&
          N.forEach((D) => {
            const L = j?.get(D.id) ?? D.$y;
            y.push({ height: `${_}px`, top: `${L - 3}px` });
          }),
        y
      );
    }, [w, _, j]),
    E = $(() => Math.max(X || 0, c), [X, c]),
    O = $(() => {
      if (
        !s ||
        !m ||
        !R ||
        !ne?.length ||
        !Object.values(s).some((L) => L !== _)
      )
        return null;
      const D = [];
      return (
        ne.forEach((L) => {
          const de = R.taskRows.get(L.id) ?? L.id;
          D.includes(de) || D.push(de);
        }),
        D.map((L) => ({
          id: L,
          height: s[L] || _,
        }))
      );
    }, [ne, R, s, m, _]);
  ie(() => {
    const y = W.current;
    y && typeof B == 'number' && (y.scrollTop = m ? 0 : B);
  }, [B, m]);
  const se = () => {
    U();
  };
  function U(y) {
    const D = W.current;
    if (!D) return;
    const L = {};
    (L.left = D.scrollLeft), b.exec('scroll-chart', L);
  }
  function we() {
    const y = W.current,
      L = Math.ceil((X || 0) / (_ || 1)) + 1,
      de = Math.floor(((y && y.scrollTop) || 0) / (_ || 1)),
      te = Math.max(0, de - Z),
      ee = de + L + Z,
      fe = te * (_ || 0);
    b.exec('render-data', {
      start: te,
      end: ee,
      from: fe,
    });
  }
  ie(() => {
    we();
  }, [X, B]);
  const De = I(
    (y) => {
      if (!y) return;
      const { id: D, mode: L } = y;
      if (L.toString().indexOf('x') < 0) return;
      const de = W.current;
      if (!de) return;
      const { clientWidth: te } = de,
        ee = b.getTask(D);
      if (ee.$x + ee.$w < de.scrollLeft)
        b.exec('scroll-chart', { left: ee.$x - (re || 0) }),
          (de.scrollLeft = ee.$x - (re || 0));
      else if (ee.$x >= te + de.scrollLeft) {
        const fe = te < ee.$w ? re || 0 : ee.$w;
        b.exec('scroll-chart', { left: ee.$x - te + fe }),
          (de.scrollLeft = ee.$x - te + fe);
      }
    },
    [b, re],
  );
  ie(() => {
    De(ge);
  }, [ge]);
  function be(y) {
    if (ue && (y.ctrlKey || y.metaKey)) {
      y.preventDefault();
      const D = W.current,
        L = -Math.sign(y.deltaY),
        de = y.clientX - (D ? D.getBoundingClientRect().left : 0);
      b.exec('zoom-scale', {
        dir: L,
        offset: de,
      });
    }
  }
  function Ae(y) {
    const D = k(y.date, y.unit);
    return D
      ? {
          css: D,
          width: y.width,
        }
      : null;
  }
  const Ne = $(
      () =>
        J && (J.minUnit === 'hour' || J.minUnit === 'day') && k
          ? J.rows[J.rows.length - 1].cells.map(Ae)
          : null,
      [J, k],
    ),
    ze = I(
      (y) => {
        (y.eventSource = 'chart'), b.exec('hotkey', y);
      },
      [b],
    );
  ie(() => {
    const y = W.current;
    if (!y) return;
    const D = () => Y(y.clientHeight);
    D();
    const L = new ResizeObserver(() => D());
    return (
      L.observe(y),
      () => {
        L.disconnect();
      }
    );
  }, [W.current]);
  const Re = le(null);
  return (
    ie(() => {
      const y = W.current;
      if (y && !Re.current)
        return (
          (Re.current = Wt(y, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (D) => ze(D),
          })),
          () => {
            Re.current?.destroy(), (Re.current = null);
          }
        );
    }, []),
    ie(() => {
      const y = W.current;
      if (!y) return;
      const D = be;
      return (
        y.addEventListener('wheel', D),
        () => {
          y.removeEventListener('wheel', D);
        }
      );
    }, [be]),
    Wn('chart'),
    /* @__PURE__ */ Ie('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: W,
      onScroll: se,
      children: [
        /* @__PURE__ */ u(zn, { highlightTime: k, onScaleClick: p, scales: J }),
        M && M.length
          ? /* @__PURE__ */ u('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${E}px` },
              children: M.map((y, D) =>
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
                  D,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ Ie('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${r}px`, height: `${E}px` },
          children: [
            Ne
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: Ne.map((y, D) =>
                    y
                      ? /* @__PURE__ */ u(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + y.css,
                            style: {
                              width: `${y.width}px`,
                              left: `${D * y.width}px`,
                            },
                          },
                          D,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ u(Nn, { borders: C, rowLayout: O }),
            N && N.length
              ? N.map((y, D) =>
                  y.$y
                    ? /* @__PURE__ */ u(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': y.id,
                          style: Q[D],
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
              rowMapping: R,
              rowHeightOverrides: s,
              allowTaskIntersection: x,
              summaryBarCounts: F,
              marqueeSelect: P,
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
      onDisplayChange: C,
      compactMode: k,
      containerWidth: p = 0,
      leftThreshold: m = 50,
      rightThreshold: R = 50,
    } = t,
    [s, x] = ht(t.value ?? 0),
    [F, P] = ht(t.display ?? 'all');
  function G(se) {
    let U = 0;
    n == 'center' ? (U = r / 2) : n == 'before' && (U = r);
    const we = {
      size: [r + 'px', 'auto'],
      p: [se - U + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (c != 'x') for (let De in we) we[De] = we[De].reverse();
    return we;
  }
  const [b, N] = me(!1),
    [w, B] = me(null),
    _ = le(0),
    re = le(),
    J = le(),
    M = le(F);
  ie(() => {
    M.current = F;
  }, [F]),
    ie(() => {
      w === null && s > 0 && B(s);
    }, [w, s]);
  function ge(se) {
    return c == 'x' ? se.clientX : se.clientY;
  }
  const ue = I(
      (se) => {
        const U = re.current + ge(se) - _.current;
        x(U);
        let we;
        U <= m ? (we = 'chart') : p - U <= R ? (we = 'grid') : (we = 'all'),
          M.current !== we && (P(we), (M.current = we)),
          J.current && clearTimeout(J.current),
          (J.current = setTimeout(() => o && o(U), 100));
      },
      [p, m, R, o],
    ),
    X = I(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        N(!1),
        window.removeEventListener('mousemove', ue),
        window.removeEventListener('mouseup', X);
    }, [ue]),
    Y = $(
      () => (F !== 'all' ? 'auto' : c == 'x' ? 'ew-resize' : 'ns-resize'),
      [F, c],
    ),
    W = I(
      (se) => {
        (!k && (F === 'grid' || F === 'chart')) ||
          ((_.current = ge(se)),
          (re.current = s),
          N(!0),
          (document.body.style.cursor = Y),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', ue),
          window.addEventListener('mouseup', X));
      },
      [Y, ue, X, s, k, F],
    );
  function ne() {
    P('all'), w !== null && (x(w), o && o(w));
  }
  function Z(se) {
    if (k) {
      const U = F === 'chart' ? 'grid' : 'chart';
      P(U), C(U);
    } else if (F === 'grid' || F === 'chart') ne(), C('all');
    else {
      const U = se === 'left' ? 'chart' : 'grid';
      P(U), C(U);
    }
  }
  function j() {
    Z('left');
  }
  function Q() {
    Z('right');
  }
  const E = $(() => G(s), [s, n, r, c]),
    O = [
      'wx-resizer',
      `wx-resizer-${c}`,
      `wx-resizer-display-${F}`,
      b ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-pFykzMlT ' + O,
    onMouseDown: W,
    style: { width: E.size[0], height: E.size[1], cursor: Y },
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
              onClick: Q,
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
      for (let C of o)
        if (C.target === document.body) {
          let k = C.contentRect.width <= Yn;
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
      onScaleClick: C,
      onTableAPIChange: k,
      multiTaskRows: p = !1,
      rowMapping: m = null,
      rowHeightOverrides: R = null,
      allowTaskIntersection: s = !0,
      summaryBarCounts: x = !1,
      marqueeSelect: F = !1,
      copyPaste: P = !1,
    } = t,
    G = Ye(Ue),
    b = K(G, '_tasks'),
    N = K(G, '_scales'),
    w = K(G, 'cellHeight'),
    B = K(G, 'columns'),
    _ = K(G, '_scrollTask'),
    re = K(G, 'undo'),
    J = $(() => {
      if (!p) return m;
      const l = /* @__PURE__ */ new Map(),
        A = /* @__PURE__ */ new Map();
      return (
        b.forEach((z) => {
          const v = z.row ?? z.id;
          A.set(z.id, v), l.has(v) || l.set(v, []), l.get(v).push(z.id);
        }),
        { rowMap: l, taskRows: A }
      );
    }, [b, p, m]),
    [M, ge] = me(!1);
  let [ue, X] = me(0);
  const [Y, W] = me(0),
    [ne, Z] = me(0),
    [j, Q] = me(void 0),
    [E, O] = me('all'),
    se = le(null),
    U = I(
      (l) => {
        ge(
          (A) => (
            l !== A &&
              (l
                ? ((se.current = E), E === 'all' && O('grid'))
                : (!se.current || se.current === 'all') && O('all')),
            l
          ),
        );
      },
      [E],
    );
  ie(() => {
    const l = Ot(U);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [U]);
  const we = $(() => {
    let l;
    return (
      B.every((A) => A.width && !A.flexgrow)
        ? (l = B.reduce((A, z) => A + parseInt(z.width), 0))
        : M && E === 'chart'
          ? (l = parseInt(B.find((A) => A.id === 'action')?.width) || 50)
          : (l = 440),
      (ue = l),
      l
    );
  }, [B, M, E]);
  ie(() => {
    X(we);
  }, [we]);
  const De = $(() => (Y ?? 0) - (j ?? 0), [Y, j]),
    be = $(() => N.width, [N]),
    Ae = 14,
    Ne = $(() => {
      let l;
      if (!p || !J) l = b.length * w;
      else {
        const A = [];
        b.forEach((z) => {
          const v = J.taskRows.get(z.id) ?? z.id;
          A.includes(v) || A.push(v);
        }),
          (l = 0);
        for (const z of A) l += (R && R[z]) || w;
      }
      return l + Ae;
    }, [b, w, p, J, R]),
    ze = $(() => N.height + Ne + De, [N, Ne, De]),
    Re = $(() => ue + be, [ue, be]),
    y = le(null),
    D = le(!1),
    L = le(null);
  ie(() => {
    const l = () => {
      (D.current = !0),
        clearTimeout(L.current),
        (L.current = setTimeout(() => {
          D.current = !1;
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
  const de = I(() => {
      Promise.resolve().then(() => {
        if (!D.current && (Y ?? 0) > (Re ?? 0)) {
          const l = (Y ?? 0) - ue;
          G.exec('expand-scale', { minWidth: l });
        }
      });
    }, [Y, Re, ue, G]),
    te = le(de);
  (te.current = de),
    ie(() => {
      let l;
      return (
        y.current &&
          ((l = new ResizeObserver(() => te.current())), l.observe(y.current)),
        () => {
          l && l.disconnect();
        }
      );
    }, [y.current]);
  const ee = le(null),
    fe = le(null),
    Pe = I(() => {
      const l = ee.current;
      l &&
        G.exec('scroll-chart', {
          top: l.scrollTop,
        });
    }, [G]),
    _e = le({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  ie(() => {
    _e.current = {
      rTasks: b,
      rScales: N,
      rCellHeight: w,
      scrollSize: De,
      ganttDiv: ee.current,
      ganttHeight: ne ?? 0,
    };
  }, [b, N, w, De, ne]);
  const Te = I(
    (l) => {
      if (!l) return;
      const {
        rTasks: A,
        rScales: z,
        rCellHeight: v,
        scrollSize: Ee,
        ganttDiv: ce,
        ganttHeight: xe,
      } = _e.current;
      if (!ce) return;
      const { id: ke } = l,
        $e = A.findIndex((Ce) => Ce.id === ke);
      if ($e > -1) {
        const Ce = xe - z.height,
          We = $e * v,
          i = ce.scrollTop;
        let h = null;
        We < i ? (h = We) : We + v > i + Ce && (h = We - Ce + v + Ee),
          h !== null &&
            (G.exec('scroll-chart', { top: Math.max(h, 0) }),
            (ee.current.scrollTop = Math.max(h, 0)));
      }
    },
    [G],
  );
  ie(() => {
    Te(_);
  }, [_]),
    ie(() => {
      const l = ee.current,
        A = fe.current;
      if (!l || !A) return;
      const z = () => {
          Cn(() => {
            Z(l.offsetHeight), W(l.offsetWidth), Q(A.offsetWidth);
          });
        },
        v = new ResizeObserver(z);
      return v.observe(l), () => v.disconnect();
    }, [ee.current]);
  const Le = le(null),
    Ge = le(null);
  return (
    ie(() => {
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
              'ctrl+z': re,
              'ctrl+y': re,
            },
            exec: (A) => {
              A.isInput || G.exec('hotkey', A);
            },
          })),
          () => {
            Ge.current?.destroy(), (Ge.current = null);
          }
        );
    }, [re]),
    /* @__PURE__ */ u('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: ee,
      onScroll: Pe,
      children: /* @__PURE__ */ u('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: ze, width: '100%' },
        ref: fe,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: ne,
            width: j,
          },
          children: /* @__PURE__ */ Ie('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: Le,
            children: [
              B.length
                ? /* @__PURE__ */ Ie(et, {
                    children: [
                      /* @__PURE__ */ u(Ln, {
                        display: E,
                        compactMode: M,
                        columnWidth: we,
                        width: ue,
                        readonly: r,
                        fullHeight: Ne,
                        onTableAPIChange: k,
                        multiTaskRows: p,
                        rowMapping: J,
                        rowHeightOverrides: R,
                      }),
                      /* @__PURE__ */ u(Xn, {
                        value: ue,
                        display: E,
                        compactMode: M,
                        containerWidth: Y,
                        onMove: (l) => X(l),
                        onDisplayChange: (l) => O(l),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ u('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: y,
                children: /* @__PURE__ */ u(On, {
                  readonly: r,
                  fullWidth: be,
                  fullHeight: Ne,
                  taskTemplate: n,
                  cellBorders: c,
                  highlightTime: o,
                  onScaleClick: C,
                  multiTaskRows: p,
                  rowMapping: J,
                  rowHeightOverrides: R,
                  allowTaskIntersection: s,
                  summaryBarCounts: x,
                  marqueeSelect: F,
                  copyPaste: P,
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
function Xt(t, n) {
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
      taskTypes: c = bn,
      tasks: o = Jn,
      selected: C = es,
      activeTask: k = null,
      links: p = ts,
      scales: m = Qn,
      columns: R = yn,
      start: s = null,
      end: x = null,
      lengthUnit: F = 'day',
      durationUnit: P = 'day',
      cellWidth: G = 100,
      cellHeight: b = 38,
      scaleHeight: N = 36,
      readonly: w = !1,
      cellBorders: B = 'full',
      zoom: _ = !1,
      baselines: re = !1,
      highlightTime: J = null,
      onScaleClick: M = null,
      init: ge = null,
      autoScale: ue = !0,
      unscheduledTasks: X = !1,
      criticalPath: Y = null,
      schedule: W = ns,
      projectStart: ne = null,
      projectEnd: Z = null,
      calendar: j = null,
      undo: Q = !1,
      splitTasks: E = !1,
      multiTaskRows: O = !1,
      rowHeightOverrides: se = null,
      allowTaskIntersection: U = !0,
      summaryBarCounts: we = !1,
      marqueeSelect: De = !1,
      copyPaste: be = !1,
      summary: Ae = null,
      _export: Ne = !1,
      ...ze
    },
    Re,
  ) {
    const y = le();
    y.current = ze;
    const D = $(() => new wn(kn), []),
      L = $(() => ({ ...gt, ...it }), []),
      de = Ye(Be.i18n),
      te = $(() => (de ? de.extend(L, !0) : lt(L)), [de, L]),
      ee = $(() => te.getRaw().calendar, [te]),
      fe = $(() => {
        let ce = {
          zoom: Un(_, ee),
          scales: Xt(m, ee),
          columns: qn(R, ee),
          links: pn(p),
          cellWidth: G,
        };
        return (
          ce.zoom &&
            (ce = {
              ...ce,
              ...xn(ce.zoom, Fn(ee, te.getGroup('gantt')), ce.scales, G),
            }),
          ce
        );
      }, [_, m, R, p, G, ee, te]),
      Pe = le(null);
    Pe.current !== o &&
      (Ne || Ct(o, { durationUnit: P, splitTasks: E, calendar: j }),
      (Pe.current = o)),
      ie(() => {
        Ne || Ct(o, { durationUnit: P, splitTasks: E, calendar: j });
      }, [o, P, j, E, Ne]);
    const _e = $(() => {
        if (!O) return null;
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
      }, [o, O]),
      Te = $(() => D.in, [D]),
      Le = le(null);
    Le.current === null &&
      ((Le.current = new fn((ce, xe) => {
        const ke = 'on' + jn(ce);
        y.current && y.current[ke] && y.current[ke](xe);
      })),
      Te.setNext(Le.current));
    const [Ge, l] = me(null),
      A = le(null);
    A.current = Ge;
    const z = $(
      () => ({
        getState: D.getState.bind(D),
        getReactiveState: D.getReactive.bind(D),
        getStores: () => ({ data: D }),
        exec: Te.exec.bind(Te),
        setNext: (ce) => ((Le.current = Le.current.setNext(ce)), Le.current),
        intercept: Te.intercept.bind(Te),
        on: Te.on.bind(Te),
        detach: Te.detach.bind(Te),
        getTask: D.getTask.bind(D),
        serialize: () => D.serialize(),
        getTable: (ce) =>
          ce
            ? new Promise((xe) => setTimeout(() => xe(A.current), 1))
            : A.current,
        getHistory: () => D.getHistory(),
      }),
      [D, Te],
    );
    ie(() => {
      const ce = () => {
        const { zoom: xe, scales: ke } = z.getState(),
          Ce = xe?.levels?.[xe.level]?.scales?.[0]?.unit ?? ke?.[0]?.unit;
        Ce && z.exec('scale-change', { level: xe?.level, unit: Ce });
      };
      z.on('zoom-scale', ce), z.on('set-scale', ce);
    }, [z]),
      ie(() => {
        z.intercept('set-scale', ({ unit: ce, date: xe }) => {
          const { zoom: ke } = z.getState();
          if (!ke || !ke.levels) return !1;
          const $e = ke.levels.findIndex((i) =>
            i.scales.some((h) => h.unit === ce),
          );
          if ($e < 0) return !1;
          const Ce = ke.levels[$e];
          if ($e !== ke.level) {
            const i = Math.round((Ce.minCellWidth + Ce.maxCellWidth) / 2);
            z.getStores().data.setState({
              scales: Ce.scales,
              cellWidth: i,
              _cellWidth: i,
              zoom: { ...ke, level: $e },
              ...(xe ? { _scaleDate: xe, _zoomOffset: 0 } : {}),
            });
          } else if (xe) {
            const { _scales: i, cellWidth: h } = z.getState(),
              S = i.diff(xe, i.start, i.lengthUnit),
              q = Math.max(0, Math.round(S * h));
            z.exec('scroll-chart', { left: q });
          }
          return !1;
        });
      }, [z]),
      Pt(
        Re,
        () => ({
          ...z,
        }),
        [z],
      );
    const v = le(0);
    ie(() => {
      v.current
        ? D.init({
            tasks: o,
            links: fe.links,
            start: s,
            columns: fe.columns,
            end: x,
            lengthUnit: F,
            cellWidth: fe.cellWidth,
            cellHeight: b,
            scaleHeight: N,
            scales: fe.scales,
            taskTypes: c,
            zoom: fe.zoom,
            selected: C,
            activeTask: k,
            baselines: re,
            autoScale: ue,
            unscheduledTasks: X,
            markers: r,
            durationUnit: P,
            criticalPath: Y,
            schedule: W,
            projectStart: ne,
            projectEnd: Z,
            calendar: j,
            undo: Q,
            _weekStart: ee.weekStart,
            splitTasks: E,
            summary: Ae,
          })
        : ge && ge(z),
        v.current++;
    }, [
      z,
      ge,
      o,
      fe,
      s,
      x,
      F,
      b,
      N,
      c,
      C,
      k,
      re,
      ue,
      X,
      r,
      P,
      Y,
      W,
      ne,
      Z,
      j,
      Q,
      ee,
      E,
      Ae,
      D,
    ]),
      v.current === 0 &&
        D.init({
          tasks: o,
          links: fe.links,
          start: s,
          columns: fe.columns,
          end: x,
          lengthUnit: F,
          cellWidth: fe.cellWidth,
          cellHeight: b,
          scaleHeight: N,
          scales: fe.scales,
          taskTypes: c,
          zoom: fe.zoom,
          selected: C,
          activeTask: k,
          baselines: re,
          autoScale: ue,
          unscheduledTasks: X,
          markers: r,
          durationUnit: P,
          criticalPath: Y,
          schedule: W,
          projectStart: ne,
          projectEnd: Z,
          calendar: j,
          undo: Q,
          _weekStart: ee.weekStart,
          splitTasks: E,
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
          : J,
      [j, J],
    );
    return /* @__PURE__ */ u(Be.i18n.Provider, {
      value: te,
      children: /* @__PURE__ */ u(Ue.Provider, {
        value: z,
        children: /* @__PURE__ */ u(Kn, {
          taskTemplate: n,
          readonly: w,
          cellBorders: B,
          highlightTime: Ee,
          onScaleClick: M,
          onTableAPIChange: l,
          multiTaskRows: O,
          rowMapping: _e,
          rowHeightOverrides: se,
          allowTaskIntersection: U,
          summaryBarCounts: we,
          marqueeSelect: De,
          copyPaste: be,
        }),
      }),
    });
  });
function Ts({ api: t = null, items: n = [] }) {
  const r = Ye(Be.i18n),
    c = $(() => r || lt(it), [r]),
    o = $(() => c.getGroup('gantt'), [c]),
    C = qe(t, '_selected'),
    k = qe(t, 'undo'),
    p = qe(t, 'history'),
    m = qe(t, 'splitTasks'),
    R = ['undo', 'redo'],
    s = $(() => {
      const F = Mt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : Mt({
              undo: k,
              splitTasks: m,
            })
      ).map((G) => {
        let b = { ...G, disabled: !1 };
        return (
          (b.handler = _t(F, b.id) ? (N) => zt(t, N.id, null, o) : b.handler),
          b.text && (b.text = o(b.text)),
          b.menuText && (b.menuText = o(b.menuText)),
          b
        );
      });
    }, [n, t, o, k, m]),
    x = $(() => {
      const F = [];
      return (
        s.forEach((P) => {
          const G = P.id;
          if (G === 'add-task') F.push(P);
          else if (R.includes(G))
            R.includes(G) &&
              F.push({
                ...P,
                disabled: P.isDisabled(p),
              });
          else {
            if (!C?.length || !t) return;
            F.push({
              ...P,
              disabled:
                P.isDisabled && C.some((b) => P.isDisabled(b, t.getState())),
            });
          }
        }),
        F.filter((P, G) => {
          if (t && P.isHidden)
            return !C.some((b) => P.isHidden(b, t.getState()));
          if (P.comp === 'separator') {
            const b = F[G + 1];
            if (!b || b.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, C, p, s]);
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
    at: C = 'point',
    children: k,
    onClick: p,
    css: m,
  },
  R,
) {
  const s = le(null),
    x = le(null),
    F = Ye(Be.i18n),
    P = $(() => F || lt({ ...it, ...gt }), [F]),
    G = $(() => P.getGroup('gantt'), [P]),
    b = qe(r, 'taskTypes'),
    N = qe(r, 'selected'),
    w = qe(r, '_selected'),
    B = qe(r, 'splitTasks'),
    _ = qe(r, 'summary'),
    re = $(
      () => ({
        splitTasks: B,
        taskTypes: b,
        summary: _,
      }),
      [B, b, _],
    ),
    J = $(() => Rt(re), [re]);
  ie(() => {
    r &&
      (r.on('scroll-chart', () => {
        s.current && s.current.show && s.current.show();
      }),
      r.on('drag-task', () => {
        s.current && s.current.show && s.current.show();
      }));
  }, [r]);
  function M(Q) {
    return Q.map(
      (E) => (
        (E = { ...E }),
        E.text && (E.text = G(E.text)),
        E.subtext && (E.subtext = G(E.subtext)),
        E.data && (E.data = M(E.data)),
        E
      ),
    );
  }
  function ge() {
    const Q = n.length ? n : Rt(re);
    return M(Q);
  }
  const ue = $(() => ge(), [r, n, re, G]),
    X = $(() => (w && w.length ? w : []), [w]),
    Y = I(
      (Q, E) => {
        let O = Q ? r?.getTask(Q) : null;
        if (c) {
          const se = c(Q, E);
          O = se === !0 ? O : se;
        }
        if (O) {
          const se = Ze(E.target, 'data-segment');
          se !== null
            ? (x.current = { id: O.id, segmentIndex: se })
            : (x.current = O.id),
            (!Array.isArray(N) || !N.includes(O.id)) &&
              r &&
              r.exec &&
              r.exec('select-task', { id: O.id });
        }
        return O;
      },
      [r, c, N],
    ),
    W = I(
      (Q) => {
        const E = Q.action;
        E && (_t(J, E.id) && zt(r, E.id, x.current, G), p && p(Q));
      },
      [r, G, p, J],
    ),
    ne = I(
      (Q, E) => {
        const O = X.length ? X : E ? [E] : [];
        let se = o ? O.every((U) => o(Q, U)) : !0;
        if (
          se &&
          (Q.isHidden &&
            (se = !O.some((U) => Q.isHidden(U, r.getState(), x.current))),
          Q.isDisabled)
        ) {
          const U = O.some((we) => Q.isDisabled(we, r.getState(), x.current));
          Q.disabled = U;
        }
        return se;
      },
      [o, X, r],
    );
  Pt(R, () => ({
    show: (Q, E) => {
      s.current && s.current.show && s.current.show(Q, E);
    },
  }));
  const Z = I((Q) => {
      s.current && s.current.show && s.current.show(Q);
    }, []),
    j = /* @__PURE__ */ Ie(et, {
      children: [
        /* @__PURE__ */ u(Mn, {
          filter: ne,
          options: ue,
          dataKey: 'id',
          resolver: Y,
          onClick: W,
          at: C,
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
  if (!F && Be.i18n?.Provider) {
    const Q = Be.i18n.Provider;
    return /* @__PURE__ */ u(Q, { value: P, children: j });
  }
  return j;
});
function ss({ api: t, autoSave: n, onLinksChange: r }) {
  const o = Ye(Be.i18n).getGroup('gantt'),
    C = K(t, 'activeTask'),
    k = K(t, '_activeTask'),
    p = K(t, '_links'),
    m = K(t, 'schedule'),
    R = K(t, 'unscheduledTasks'),
    [s, x] = me();
  function F() {
    if (C) {
      const N = p
          .filter((B) => B.target == C)
          .map((B) => ({ link: B, task: t.getTask(B.source) })),
        w = p
          .filter((B) => B.source == C)
          .map((B) => ({ link: B, task: t.getTask(B.target) }));
      return [
        { title: o('Predecessors'), data: N },
        { title: o('Successors'), data: w },
      ];
    }
  }
  ie(() => {
    x(F());
  }, [C, p]);
  const P = $(
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
      : (x((w) =>
          (w || []).map((B) => ({
            ...B,
            data: B.data.filter((_) => _.link.id !== N),
          })),
        ),
        r &&
          r({
            id: N,
            action: 'delete-link',
            data: { id: N },
          }));
  }
  function b(N, w) {
    n
      ? t.exec('update-link', {
          id: N,
          link: w,
        })
      : (x((B) =>
          (B || []).map((_) => ({
            ..._,
            data: _.data.map((re) =>
              re.link.id === N ? { ...re, link: { ...re.link, ...w } } : re,
            ),
          })),
        ),
        r &&
          r({
            id: N,
            action: 'update-link',
            data: {
              id: N,
              link: w,
            },
          }));
  }
  return /* @__PURE__ */ u(et, {
    children: (s || []).map((N, w) =>
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
                      children: N.data.map((B) =>
                        /* @__PURE__ */ Ie(
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
                              m?.auto && B.link.type === 'e2s'
                                ? /* @__PURE__ */ u('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ u(tn, {
                                      type: 'number',
                                      placeholder: o('Lag'),
                                      value: B.link.lag,
                                      disabled: R && k?.unscheduled,
                                      onChange: (_) => {
                                        _.input ||
                                          b(B.link.id, { lag: _.value });
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
                                    options: P,
                                    onChange: (_) =>
                                      b(B.link.id, { type: _.value }),
                                    children: ({ option: _ }) => _.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => G(B.link.id),
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
            w,
          )
        : null,
    ),
  });
}
function rs(t) {
  const { value: n, time: r, format: c, onchange: o, onChange: C, ...k } = t,
    p = C ?? o;
  function m(R) {
    const s = new Date(R.value);
    s.setHours(n.getHours()),
      s.setMinutes(n.getMinutes()),
      p && p({ value: s });
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
      r ? /* @__PURE__ */ u(rn, { value: n, onChange: p, format: c }) : null,
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
  placement: C = 'sidebar',
  bottomBar: k = !0,
  topBar: p = !0,
  autoSave: m = !0,
  focus: R = !1,
  hotkeys: s = {},
}) {
  const x = Ye(Be.i18n),
    F = $(() => x || lt({ ...it, ...gt }), [x]),
    P = $(() => F.getGroup('gantt'), [F]),
    G = F.getRaw(),
    b = $(() => {
      const l = G.gantt?.dateFormat || G.formats?.dateFormat;
      return ot(l, G.calendar);
    }, [G]),
    N = $(() => {
      if (p === !0 && !o) {
        const l = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: P('Delete'),
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
                  text: P('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return p;
    }, [p, o, m, P]),
    [w, B] = me(!1),
    _ = $(() => (w ? 'wx-full-screen' : ''), [w]),
    re = I((l) => {
      B(l);
    }, []);
  ie(() => {
    const l = Ot(re);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [re]);
  const J = K(t, '_activeTask'),
    M = K(t, 'activeTask'),
    ge = K(t, 'unscheduledTasks'),
    ue = K(t, 'summary'),
    X = K(t, 'links'),
    Y = K(t, 'splitTasks'),
    W = $(() => Y && M?.segmentIndex, [Y, M]),
    ne = $(() => W || W === 0, [W]),
    Z = K(t, 'taskTypes'),
    j = $(
      () => vn({ unscheduledTasks: ge, summary: ue, taskTypes: Z }),
      [ge, ue, Z],
    ),
    Q = K(t, 'undo'),
    [E, O] = me({}),
    [se, U] = me(null),
    [we, De] = me(),
    [be, Ae] = me(null),
    Ne = $(() => {
      if (!J) return null;
      let l;
      if ((ne && J.segments ? (l = { ...J.segments[W] }) : (l = { ...J }), o)) {
        let A = { parent: l.parent };
        return (
          j.forEach(({ key: z, comp: v }) => {
            if (v !== 'links') {
              const Ee = l[z];
              v === 'date' && Ee instanceof Date
                ? (A[z] = b(Ee))
                : v === 'slider' && z === 'progress'
                  ? (A[z] = `${Ee}%`)
                  : (A[z] = Ee);
            }
          }),
          A
        );
      }
      return l || null;
    }, [J, ne, W, o, j, b]);
  ie(() => {
    De(Ne);
  }, [Ne]),
    ie(() => {
      O({}), Ae(null), U(null);
    }, [M]);
  function ze(l, A) {
    return l.map((z) => {
      const v = { ...z };
      if (
        (z.config && (v.config = { ...v.config }),
        v.comp === 'links' &&
          t &&
          ((v.api = t), (v.autoSave = m), (v.onLinksChange = D)),
        v.comp === 'select' && v.key === 'type')
      ) {
        const Ee = v.options ?? [];
        v.options = Ee.map((ce) => ({
          ...ce,
          label: P(ce.label),
        }));
      }
      return (
        v.comp === 'slider' &&
          v.key === 'progress' &&
          (v.labelTemplate = (Ee) => `${P(v.label)} ${Ee}%`),
        v.label && (v.label = P(v.label)),
        v.config?.placeholder &&
          (v.config.placeholder = P(v.config.placeholder)),
        A &&
          (v.isDisabled && v.isDisabled(A, t.getState())
            ? (v.disabled = !0)
            : delete v.disabled),
        v
      );
    });
  }
  const Re = $(() => {
      let l = n.length ? n : j;
      return (
        (l = ze(l, we)),
        we ? l.filter((A) => !A.isHidden || !A.isHidden(we, t.getState())) : l
      );
    }, [n, j, we, P, t, m]),
    y = $(() => Re.map((l) => l.key), [Re]);
  function D({ id: l, action: A, data: z }) {
    O((v) => ({
      ...v,
      [l]: { action: A, data: z },
    }));
  }
  const L = I(() => {
      for (let l in E)
        if (X.byId(l)) {
          const { action: A, data: z } = E[l];
          t.exec(A, z);
        }
    }, [t, E, X]),
    de = I(() => {
      const l = M?.id || M;
      if (ne) {
        if (J?.segments) {
          const A = J.segments.filter((z, v) => v !== W);
          t.exec('update-task', {
            id: l,
            task: { segments: A },
          });
        }
      } else t.exec('delete-task', { id: l });
    }, [t, M, ne, J, W]),
    te = I(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    ee = I(
      (l) => {
        const { item: A, changes: z } = l;
        A.id === 'delete' && de(),
          A.id === 'save' && (z.length ? te() : L()),
          A.comp && te();
      },
      [t, M, m, L, de, te],
    ),
    fe = I(
      (l, A, z) => (
        ge && l.type === 'summary' && (l.unscheduled = !1),
        Gt(l, t.getState(), A),
        z || U(!1),
        l
      ),
      [ge, t],
    ),
    Pe = I(
      (l) => {
        (l = {
          ...l,
          unscheduled: ge && l.unscheduled && l.type !== 'summary',
        }),
          delete l.links,
          delete l.data,
          (y.indexOf('duration') === -1 || (l.segments && !l.duration)) &&
            delete l.duration;
        const A = {
          id: M?.id || M,
          task: l,
          ...(ne && { segmentIndex: W }),
        };
        m && se && (A.inProgress = se), t.exec('update-task', A), m || L();
      },
      [t, M, ge, m, L, y, ne, W, se],
    ),
    _e = I(
      (l) => {
        let { update: A, key: z, input: v } = l;
        if ((v && U(!0), (l.update = fe({ ...A }, z, v)), !m)) De(l.update);
        else if (!be && !v) {
          const Ee = Re.find((ke) => ke.key === z),
            ce = A[z];
          (!Ee.validation || Ee.validation(ce)) &&
            (!Ee.required || ce) &&
            Pe(l.update);
        }
      },
      [m, fe, be, Re, Pe],
    ),
    Te = I(
      (l) => {
        m || Pe(l.values);
      },
      [m, Pe],
    ),
    Le = I((l) => {
      Ae(l.errors);
    }, []),
    Ge = $(
      () =>
        Q
          ? {
              'ctrl+z': (l) => {
                l.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (l) => {
                l.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [Q, t],
    );
  return Ne
    ? /* @__PURE__ */ u(on, {
        children: /* @__PURE__ */ u(Rn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${_} ${r}`,
          items: Re,
          values: Ne,
          topBar: N,
          bottomBar: k,
          placement: C,
          layout: c,
          readonly: o,
          autoSave: m,
          focus: R,
          onAction: ee,
          onSave: Te,
          onValidation: Le,
          onChange: _e,
          hotkeys: s && { ...Ge, ...s },
        }),
      })
    : null;
}
const Ms = ({ children: t, columns: n = null, api: r }) => {
  const [c, o] = me(null);
  return (
    ie(() => {
      r && r.getTable(!0).then(o);
    }, [r]),
    /* @__PURE__ */ u($n, { api: c, columns: n, children: t })
  );
};
function Rs(t) {
  const { api: n, content: r, children: c } = t,
    o = le(null),
    C = le(null),
    [k, p] = me({}),
    [m, R] = me(null),
    [s, x] = me({}),
    [F, P] = me(!1);
  function G(X) {
    for (; X; ) {
      if (X.getAttribute) {
        const Y = X.getAttribute('data-tooltip-id'),
          W = X.getAttribute('data-tooltip-at'),
          ne = X.getAttribute('data-tooltip');
        if (Y || ne) return { id: Y, tooltip: ne, target: X, at: W };
      }
      X = X.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  ie(() => {
    const X = C.current;
    if (!F && X && s && (s.text || r)) {
      const Y = X.getBoundingClientRect();
      let W = !1,
        ne = s.left,
        Z = s.top;
      Y.right >= k.right && ((ne = k.width - Y.width - 5), (W = !0)),
        Y.bottom >= k.bottom &&
          ((Z = s.top - (Y.bottom - k.bottom + 2)), (W = !0)),
        W && x((j) => j && { ...j, left: ne, top: Z });
    }
  }, [s, k, r, F]);
  const b = le(null),
    N = 300,
    w = (X) => {
      clearTimeout(b.current),
        (b.current = setTimeout(() => {
          X();
        }, N));
    };
  function B(X) {
    let { id: Y, tooltip: W, target: ne, at: Z } = G(X.target);
    if ((x(null), R(null), P(!1), !W))
      if (Y) W = M(Y);
      else {
        clearTimeout(b.current);
        return;
      }
    const j = X.clientX;
    w(() => {
      Y && R(J(ge(Y)));
      const Q = ne.getBoundingClientRect(),
        E = o.current,
        O = E
          ? E.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let se, U;
      Z === 'left'
        ? ((se = Q.top + 5 - O.top), (U = Q.right + 5 - O.left))
        : ((se = Q.top + Q.height - O.top), (U = j - O.left)),
        p(O),
        x({ top: se, left: U, text: W });
    });
  }
  function _(X) {
    const Y = X.touches[0];
    if (!Y) return;
    const { id: W, target: ne } = G(X.target);
    if (!W) return;
    clearTimeout(b.current);
    const Z = J(ge(W)),
      j = Z?.text || '',
      Q = ne.getBoundingClientRect(),
      E = o.current,
      O = E
        ? E.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    R(Z),
      p(O),
      P(!0),
      x({
        top: Q.top - O.top - 8,
        left: Y.clientX - O.left,
        text: j,
      });
  }
  function re() {
    x(null), R(null), P(!1);
  }
  function J(X) {
    return n?.getTask(ge(X)) || null;
  }
  function M(X) {
    return J(X)?.text || '';
  }
  function ge(X) {
    const Y = Number(X);
    return Number.isFinite(Y) ? Y : X;
  }
  const ue = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    F ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: B,
    onTouchStart: _,
    onTouchEnd: re,
    onTouchMove: re,
    children: [
      s && (s.text || r)
        ? /* @__PURE__ */ u('div', {
            className: ue,
            ref: C,
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
  Xs as registerScaleUnit,
  Ls as version,
};
//# sourceMappingURL=index.es.js.map
