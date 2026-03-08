import { jsxs as At, jsx as u, Fragment as oe } from 'react/jsx-runtime';
import {
  createContext as wn,
  useContext as Yt,
  useMemo as I,
  useState as bt,
  useCallback as B,
  useRef as st,
  useEffect as at,
  Fragment as pe,
  forwardRef as je,
  useImperativeHandle as Qe,
} from 'react';
import {
  context as Ut,
  Button as Pe,
  Field as xn,
  Text as yn,
  Combo as vn,
  DatePicker as bn,
  TimePicker as kn,
  Locale as $n,
  RichSelect as Tn,
  TwoState as Mn,
  Slider as Cn,
  Counter as Rn,
  Material as Ae,
  Willow as ze,
  WillowDark as _e,
} from '@svar-ui/react-core';
import {
  locate as Vt,
  locateID as Zt,
  locateAttr as En,
  dateToString as we,
  locale as xe,
} from '@svar-ui/lib-dom';
import { en as ye } from '@svar-ui/gantt-locales';
import { en as Ee } from '@svar-ui/core-locales';
import { EventBusRouter as Dn } from '@svar-ui/lib-state';
import {
  prepareEditTask as Ze,
  grid as Ln,
  extendDragOptions as Nn,
  isSegmentMoveAllowed as In,
  DataStore as Sn,
  normalizeLinks as Hn,
  normalizeZoom as Pn,
  defaultColumns as An,
  parseTaskDates as We,
  defaultTaskTypes as zn,
  getToolbarButtons as Ge,
  handleAction as Je,
  isHandledAction as tn,
  getMenuOptions as Oe,
  getEditorItems as _n,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as cs,
  defaultEditorItems as ls,
  defaultMenuOptions as as,
  defaultTaskTypes as us,
  defaultToolbarButtons as ds,
  getEditorItems as fs,
  getMenuOptions as hs,
  getToolbarButtons as ms,
  registerScaleUnit as gs,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as Re,
  useStore as J,
  useStoreWithCounter as ie,
  writable as Wn,
  useStoreLater as qt,
} from '@svar-ui/lib-react';
import { hotkeys as en } from '@svar-ui/grid-store';
import { Grid as Gn, HeaderMenu as On } from '@svar-ui/react-grid';
import { flushSync as Yn } from 'react-dom';
import { Toolbar as Ye } from '@svar-ui/react-toolbar';
import { ContextMenu as Xn } from '@svar-ui/react-menu';
import { Editor as Bn, registerEditorItem as re } from '@svar-ui/react-editor';
import { registerEditorItem as ws } from '@svar-ui/react-editor';
const jt = wn(null);
function te(e) {
  const r = e.getAttribute('data-id'),
    n = parseInt(r);
  return isNaN(n) || n.toString() != r ? r : n;
}
function Kn(e, r, n) {
  const o = e.getBoundingClientRect(),
    s = r.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: o.top - s.top,
    left: o.left - s.left,
    dt: o.bottom - n.clientY,
    db: n.clientY - o.top,
  };
}
function Xe(e) {
  return e && e.getAttribute('data-context-id');
}
const Be = 5;
function Un(e, r) {
  let n, o, s, i, a, m, d, w, l;
  function v(D) {
    (i = D.clientX),
      (a = D.clientY),
      (m = {
        ...Kn(n, e, D),
        y: r.getTask(s).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function E(D) {
    (n = Vt(D)),
      Xe(n) &&
        ((s = te(n)),
        (l = setTimeout(() => {
          (w = !0), r && r.touchStart && r.touchStart(), v(D.touches[0]);
        }, 500)),
        e.addEventListener('touchmove', W),
        e.addEventListener('contextmenu', P),
        window.addEventListener('touchend', Q));
  }
  function P(D) {
    if (w || l) return D.preventDefault(), !1;
  }
  function K(D) {
    D.which === 1 &&
      ((n = Vt(D)),
      Xe(n) &&
        ((s = te(n)),
        e.addEventListener('mousemove', M),
        window.addEventListener('mouseup', X),
        v(D)));
  }
  function p(D) {
    e.removeEventListener('mousemove', M),
      e.removeEventListener('touchmove', W),
      document.body.removeEventListener('mouseup', X),
      document.body.removeEventListener('touchend', Q),
      (document.body.style.userSelect = ''),
      D &&
        (e.removeEventListener('mousedown', K),
        e.removeEventListener('touchstart', E));
  }
  function N(D) {
    const gt = D.clientX - i,
      et = D.clientY - a;
    if (!o) {
      if (
        (Math.abs(gt) < Be && Math.abs(et) < Be) ||
        (r && r.start && r.start({ id: s, e: D }) === !1)
      )
        return;
      (o = n.cloneNode(!0)),
        (o.style.pointerEvents = 'none'),
        o.classList.add('wx-reorder-task'),
        (o.style.position = 'absolute'),
        (o.style.left = m.left + 'px'),
        (o.style.top = m.top + 'px'),
        (n.style.visibility = 'hidden'),
        n.parentNode.insertBefore(o, n);
    }
    if (o) {
      const yt = Math.round(Math.max(0, m.top + et));
      if (r && r.move && r.move({ id: s, top: yt, detail: d }) === !1) return;
      const ct = r.getTask(s),
        ht = ct.$y;
      if (!m.start && m.y == ht) return j();
      (m.start = !0), (m.y = ct.$y - 4), (o.style.top = yt + 'px');
      const C = document.elementFromPoint(D.clientX, D.clientY),
        H = Vt(C);
      if (H && H !== n) {
        const U = te(H),
          V = H.getBoundingClientRect(),
          g = V.top + V.height / 2,
          k = D.clientY + m.db > g && H.nextElementSibling !== n,
          T = D.clientY - m.dt < g && H.previousElementSibling !== n;
        d?.after == U || d?.before == U
          ? (d = null)
          : k
            ? (d = { id: s, after: U })
            : T && (d = { id: s, before: U });
      }
    }
  }
  function M(D) {
    N(D);
  }
  function W(D) {
    w
      ? (D.preventDefault(), N(D.touches[0]))
      : l && (clearTimeout(l), (l = null));
  }
  function Q() {
    (w = null), l && (clearTimeout(l), (l = null)), j();
  }
  function X() {
    j();
  }
  function j() {
    n && (n.style.visibility = ''),
      o &&
        (o.parentNode.removeChild(o),
        r && r.end && r.end({ id: s, top: m.top })),
      (s = n = o = m = d = null),
      p();
  }
  return (
    e.style.position !== 'absolute' && (e.style.position = 'relative'),
    e.addEventListener('mousedown', K),
    e.addEventListener('touchstart', E),
    {
      destroy() {
        p(!0);
      },
    }
  );
}
function Fn({ row: e, column: r }) {
  const n = Yt(jt);
  function o(i, a) {
    return {
      justifyContent: a.align,
      paddingLeft: `${(i.$level - 1) * 20}px`,
    };
  }
  const s = r && r._cell;
  return /* @__PURE__ */ At('div', {
    className: 'wx-pqc08MHU wx-content',
    style: o(e, r),
    children: [
      e.data || e.lazy
        ? /* @__PURE__ */ u('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${e.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ u('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ u('div', {
        className: 'wx-pqc08MHU wx-text',
        children: s
          ? /* @__PURE__ */ u(s, { row: e, column: r, api: n })
          : e.text,
      }),
    ],
  });
}
function Ke({ column: e, cell: r }) {
  const n = I(() => e.id, [e?.id]);
  return r || e.id == 'add-task'
    ? /* @__PURE__ */ u('div', {
        style: { textAlign: e.align },
        children: /* @__PURE__ */ u('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': n,
        }),
      })
    : null;
}
function Vn(e) {
  const {
      readonly: r,
      compactMode: n,
      width: o = 0,
      display: s = 'all',
      columnWidth: i = 0,
      fullHeight: a,
      onTableAPIChange: m,
      multiTaskRows: d = !1,
      rowMapping: w = null,
      rowHeightOverrides: l = null,
    } = e,
    [v, E] = Re(i),
    [P, K] = bt(),
    p = Yt(Ut.i18n),
    N = I(() => p.getGroup('gantt'), [p]),
    M = Yt(jt),
    W = J(M, 'scrollTop'),
    Q = J(M, 'cellHeight'),
    X = J(M, '_scrollTask'),
    j = J(M, '_selected'),
    D = J(M, 'area'),
    gt = J(M, '_tasks'),
    et = J(M, '_scales'),
    yt = J(M, 'columns'),
    ct = J(M, '_sort'),
    ht = J(M, 'calendar'),
    C = J(M, 'durationUnit'),
    H = J(M, 'splitTasks'),
    [U, V] = bt(null),
    g = I(() => {
      if (!gt || !D) return [];
      if (d && w) {
        const c = /* @__PURE__ */ new Set();
        return gt.filter((y) => {
          const _ = w.taskRows.get(y.id) ?? y.id;
          return c.has(_) ? !1 : (c.add(_), !0);
        });
      }
      return gt.slice(D.start, D.end);
    }, [gt, D, d, w, a]),
    k = B(
      (c, y) => {
        if (y === 'add-task')
          M.exec(y, {
            target: c,
            task: { text: N('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (y === 'open-task') {
          const _ = g.find((O) => O.id === c);
          (_?.data || _?.lazy) && M.exec(y, { id: c, mode: !_.open });
        }
      },
      [g],
    ),
    T = B(
      (c) => {
        const y = Zt(c),
          _ = c.target.dataset.action;
        _ && c.preventDefault(),
          y
            ? _ === 'add-task' || _ === 'open-task'
              ? k(y, _)
              : M.exec('select-task', {
                  id: y,
                  toggle: c.ctrlKey || c.metaKey,
                  range: c.shiftKey,
                  show: !0,
                })
            : _ === 'add-task' && k(null, _);
      },
      [M, k],
    ),
    b = st(null),
    A = st(null),
    [lt, it] = bt(0),
    [pt, Nt] = bt(!1);
  at(() => {
    const c = A.current;
    if (!c || typeof ResizeObserver > 'u') return;
    const y = () => it(c.clientWidth);
    y();
    const _ = new ResizeObserver(y);
    return _.observe(c), () => _.disconnect();
  }, []);
  const kt = st(null),
    $t = B(
      (c) => {
        const y = c.id,
          { before: _, after: O } = c,
          Z = c.onMove;
        let ot = _ || O,
          Rt = _ ? 'before' : 'after';
        if (Z) {
          if (Rt === 'after') {
            const Ht = M.getTask(ot);
            Ht.data?.length &&
              Ht.open &&
              ((Rt = 'before'), (ot = Ht.data[0].id));
          }
          kt.current = { id: y, [Rt]: ot };
        } else kt.current = null;
        M.exec('move-task', {
          id: y,
          mode: Rt,
          target: ot,
          inProgress: Z,
        });
      },
      [M],
    ),
    Tt = I(() => D?.from ?? 0, [D]),
    mt = I(() => et?.height ?? 0, [et]),
    Dt = I(
      () => (!n && s !== 'grid' ? (v ?? 0) > (o ?? 0) : (v ?? 0) > (lt ?? 0)),
      [n, s, v, o, lt],
    ),
    Gt = I(() => {
      const c = {};
      return (
        (Dt && s === 'all') || (s === 'grid' && Dt)
          ? (c.width = v)
          : s === 'grid' && (c.width = '100%'),
        d && a && (c.minHeight = a),
        c
      );
    }, [Dt, s, v, d, a]),
    zt = I(() => (U && !g.find((c) => c.id === U.id) ? [...g, U] : g), [g, U]),
    It = I(() => {
      let c = (yt || []).map((O) => {
        O = { ...O };
        const Z = O.header;
        if (typeof Z == 'object') {
          const ot = Z.text && N(Z.text);
          O.header = { ...Z, text: ot };
        } else O.header = N(Z);
        if (O.cell && O.id !== 'text' && O.id !== 'add-task') {
          const ot = O.cell;
          O.cell = (Rt) => /* @__PURE__ */ u(ot, { ...Rt, api: M });
        }
        return O;
      });
      const y = c.findIndex((O) => O.id === 'text'),
        _ = c.findIndex((O) => O.id === 'add-task');
      if (
        (y !== -1 && (c[y].cell && (c[y]._cell = c[y].cell), (c[y].cell = Fn)),
        _ !== -1)
      ) {
        c[_].cell = c[_].cell || Ke;
        const O = c[_].header;
        if (
          (typeof O != 'object' && (c[_].header = { text: O }),
          (c[_].header.cell = O.cell || Ke),
          r)
        )
          c.splice(_, 1);
        else if (n) {
          const [Z] = c.splice(_, 1);
          c.unshift(Z);
        }
      }
      return c.length > 0 && (c[c.length - 1].resize = !1), c;
    }, [yt, N, r, n, M]),
    L = I(
      () =>
        s === 'all'
          ? `${o}px`
          : s === 'grid'
            ? 'calc(100% - 4px)'
            : It.find((c) => c.id === 'add-task')
              ? '50px'
              : '0',
      [s, o, It],
    ),
    F = I(() => {
      if (zt && ct?.length) {
        const c = {};
        return (
          ct.forEach(({ key: y, order: _ }, O) => {
            c[y] = {
              order: _,
              ...(ct.length > 1 && { index: O }),
            };
          }),
          c
        );
      }
      return {};
    }, [zt, ct]),
    G = B(() => It.some((c) => c.flexgrow && !c.hidden), []),
    wt = I(() => G(), [G, pt]),
    xt = I(() => {
      let c = s === 'chart' ? It.filter((_) => _.id === 'add-task') : It;
      const y = s === 'all' ? o : lt;
      if (!wt) {
        let _ = v,
          O = !1;
        if (It.some((Z) => Z.$width)) {
          let Z = 0;
          (_ = It.reduce(
            (ot, Rt) => (
              Rt.hidden || ((Z += Rt.width), (ot += Rt.$width || Rt.width)), ot
            ),
            0,
          )),
            Z > _ && _ > y && (O = !0);
        }
        if (O || _ < y) {
          let Z = 1;
          return (
            O || (Z = (y - 50) / (_ - 50 || 1)),
            c.map(
              (ot) => (
                ot.id !== 'add-task' &&
                  !ot.hidden &&
                  (ot.$width || (ot.$width = ot.width),
                  (ot.width = ot.$width * Z)),
                ot
              ),
            )
          );
        }
      }
      return c;
    }, [s, It, wt, v, o, lt]),
    nt = B(
      (c) => {
        if (!G()) {
          const y = xt.reduce(
            (_, O) => (
              c && O.$width && (O.$width = O.width),
              _ + (O.hidden ? 0 : O.width)
            ),
            0,
          );
          y !== v && E(y);
        }
        Nt(!0), Nt(!1);
      },
      [G, xt, v, E],
    ),
    R = B(() => {
      It.filter((y) => y.flexgrow && !y.hidden).length === 1 &&
        It.forEach((y) => {
          y.$width && !y.flexgrow && !y.hidden && (y.width = y.$width);
        });
    }, []),
    vt = B(
      (c) => {
        if (!r) {
          const y = Zt(c),
            _ = En(c, 'data-col-id');
          !(_ && It.find((Z) => Z.id == _))?.editor &&
            y &&
            M.exec('show-editor', { id: y });
        }
      },
      [M, r],
      // cols is defined later; relies on latest value at call time
    ),
    dt = I(() => (Array.isArray(j) ? j.map((c) => c.id) : []), [j]),
    tt = B(() => {
      if (b.current && zt !== null) {
        const c = b.current.querySelector('.wx-body');
        c &&
          (d
            ? (c.style.top = '0px')
            : (c.style.top = -((W ?? 0) - (Tt ?? 0)) + 'px'));
      }
      A.current && (A.current.scrollTop = 0);
    }, [zt, W, Tt, d]);
  at(() => {
    b.current && tt();
  }, [W, Tt, tt]),
    at(() => {
      const c = b.current;
      if (!c) return;
      const y = c.querySelector('.wx-table-box .wx-body');
      if (!y || typeof ResizeObserver > 'u') return;
      const _ = new ResizeObserver(() => {
        tt();
      });
      return (
        _.observe(y),
        () => {
          _.disconnect();
        }
      );
    }, [xt, Gt, s, L, zt, tt]),
    at(() => {
      if (!X || !P) return;
      const { id: c } = X,
        y = P.getState().focusCell;
      y &&
        y.row !== c &&
        b.current &&
        b.current.contains(document.activeElement) &&
        P.exec('focus-cell', {
          row: c,
          column: y.column,
        });
    }, [X, P]),
    at(() => {
      if (!d) return;
      const c = b.current;
      if (!c) return;
      const y = c.querySelector('.wx-table-box .wx-body');
      if (!y) return;
      const _ = {
        attributes: !0,
        attributeFilter: ['style'],
        childList: !0,
      };
      let O = null,
        Z;
      const ot = () => {
        Z.disconnect();
        let Rt = 0;
        y.querySelectorAll('[data-id]').forEach((Xt) => {
          const Qt = Xt.getAttribute('data-id'),
            le =
              w && Qt
                ? (w.taskRows.get(Qt) ?? w.taskRows.get(Number(Qt)) ?? Qt)
                : Qt,
            se = (l && le && l[le]) || Q;
          (Xt.style.height = `${se}px`),
            (Xt.style.minHeight = `${se}px`),
            (Rt += se);
        }),
          Rt > 0 && (y.style.height = `${Rt}px`),
          Z.observe(y, _);
      };
      return (
        (Z = new MutationObserver(() => {
          O && cancelAnimationFrame(O), (O = requestAnimationFrame(ot));
        })),
        ot(),
        () => {
          Z.disconnect(), O && cancelAnimationFrame(O);
        }
      );
    }, [l, d, zt, Q, w]);
  const Lt = B(
      ({ id: c }) => {
        if (r) return !1;
        M.getTask(c).open && M.exec('open-task', { id: c, mode: !1 });
        const y = M.getState()._tasks.find((_) => _.id === c);
        if ((V(y || null), !y)) return !1;
      },
      [M, r],
    ),
    _t = B(
      ({ id: c, top: y }) => {
        kt.current
          ? $t({ ...kt.current, onMove: !1 })
          : M.exec('drag-task', {
              id: c,
              top: y + (Tt ?? 0),
              inProgress: !1,
            }),
          V(null);
      },
      [M, $t, Tt],
    ),
    Y = B(
      ({ id: c, top: y, detail: _ }) => {
        _ && $t({ ..._, onMove: !0 }),
          M.exec('drag-task', {
            id: c,
            top: y + (Tt ?? 0),
            inProgress: !0,
          });
      },
      [M, $t, Tt],
    );
  at(() => {
    const c = b.current;
    return c
      ? Un(c, {
          start: Lt,
          end: _t,
          move: Y,
          getTask: M.getTask,
        }).destroy
      : void 0;
  }, [M, Lt, _t, Y]);
  const rt = B(
      (c) => {
        const { key: y, isInput: _ } = c;
        if (!_ && (y === 'arrowup' || y === 'arrowdown'))
          return (c.eventSource = 'grid'), M.exec('hotkey', c), !1;
        if (y === 'enter') {
          const O = P?.getState().focusCell;
          if (O) {
            const { row: Z, column: ot } = O;
            ot === 'add-task'
              ? k(Z, 'add-task')
              : ot === 'text' && k(Z, 'open-task');
          }
        }
      },
      [M, k, P],
    ),
    Mt = st(null),
    Pt = () => {
      Mt.current = {
        setTableAPI: K,
        handleHotkey: rt,
        sortVal: ct,
        api: M,
        adjustColumns: R,
        setColumnWidth: nt,
        tasks: g,
        calendarVal: ht,
        durationUnitVal: C,
        splitTasksVal: H,
        onTableAPIChange: m,
      };
    };
  Pt(),
    at(() => {
      Pt();
    }, [K, rt, ct, M, R, nt, g, ht, C, H, m]);
  const Ct = B((c) => {
    K(c),
      c.intercept('hotkey', (y) => Mt.current.handleHotkey(y)),
      c.intercept('scroll', () => !1),
      c.intercept('select-row', () => !1),
      c.intercept('sort-rows', (y) => {
        const _ = Mt.current.sortVal,
          { key: O, add: Z } = y,
          ot = _ ? _.find((Ht) => Ht.key === O) : null;
        let Rt = 'asc';
        return (
          ot && (Rt = !ot || ot.order === 'asc' ? 'desc' : 'asc'),
          M.exec('sort-tasks', {
            key: O,
            order: Rt,
            add: Z,
          }),
          !1
        );
      }),
      c.on('resize-column', () => {
        Mt.current.setColumnWidth(!0);
      }),
      c.on('hide-column', (y) => {
        y.mode || Mt.current.adjustColumns(), Mt.current.setColumnWidth();
      }),
      c.intercept('update-cell', (y) => {
        const { id: _, column: O, value: Z } = y,
          ot = Mt.current.tasks.find((Rt) => Rt.id === _);
        if (ot) {
          const Rt = { ...ot };
          let Ht = Z;
          Ht && !isNaN(Ht) && !(Ht instanceof Date) && (Ht *= 1),
            (Rt[O] = Ht),
            Ze(
              Rt,
              {
                calendar: Mt.current.calendarVal,
                durationUnit: Mt.current.durationUnitVal,
                splitTasks: Mt.current.splitTasksVal,
              },
              O,
            ),
            M.exec('update-task', {
              id: _,
              task: Rt,
            });
        }
        return !1;
      }),
      m && m(c);
  }, []);
  return /* @__PURE__ */ u('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${L}` },
    ref: A,
    children: /* @__PURE__ */ u('div', {
      ref: b,
      style: Gt,
      className: 'wx-rHj6070p wx-table',
      onClick: T,
      onDoubleClick: vt,
      children: /* @__PURE__ */ u(Gn, {
        init: Ct,
        sizes: {
          rowHeight: Q,
          headerHeight: (mt ?? 0) - 1,
        },
        rowStyle: (c) =>
          c.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (c) =>
          `wx-rHj6070p wx-text-${c.align}${c.id === 'add-task' ? ' wx-action' : ''}`,
        data: zt,
        columns: xt,
        selectedRows: [...dt],
        sortMarks: F,
      }),
    }),
  });
}
function qn({ borders: e = '', rowLayout: r = null }) {
  const n = Yt(jt),
    o = J(n, 'cellWidth'),
    s = J(n, 'cellHeight'),
    i = st(null),
    [a, m] = bt('#e4e4e4');
  at(() => {
    if (typeof getComputedStyle < 'u' && i.current) {
      const l = getComputedStyle(i.current).getPropertyValue(
        '--wx-gantt-border',
      );
      m(l ? l.substring(l.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const d = I(() => {
    if (!r) return null;
    const l = [];
    let v = 0;
    for (const E of r) (v += E.height), l.push(v);
    return l;
  }, [r]);
  if (!d) {
    const l = {
      width: '100%',
      height: '100%',
      background: o != null && s != null ? `url(${Ln(o, s, a, e)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ u('div', { ref: i, style: l });
  }
  const w = o
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${o - 1}px, ${a} ${o - 1}px, ${a} ${o}px)`
    : void 0;
  return /* @__PURE__ */ At('div', {
    ref: i,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ u('div', {
        style: {
          width: '100%',
          height: '100%',
          background: w,
          position: 'absolute',
        },
      }),
      d.map((l, v) =>
        /* @__PURE__ */ u(
          'div',
          {
            style: {
              position: 'absolute',
              top: `${l}px`,
              width: '100%',
              height: '1px',
              backgroundColor: a,
            },
          },
          v,
        ),
      ),
    ],
  });
}
function ce(e) {
  const r = e.split(',').map(Number),
    n = [];
  for (let o = 0; o < r.length; o += 2) n.push([r[o], r[o + 1]]);
  return { path: n.slice(0, -3), arrow: n.slice(-3) };
}
function jn(e) {
  return e.split(',').map(Number).slice(0, -6).join(',');
}
function Qn(e, r = 8) {
  if (!e) return '';
  const { path: n } = ce(e);
  if (n.length < 2) return '';
  let o = `M${n[0][0]},${n[0][1]}`;
  for (let s = 1; s < n.length - 1; s++) {
    const i = n[s - 1],
      a = n[s],
      m = n[s + 1],
      d = a[0] - i[0],
      w = a[1] - i[1],
      l = m[0] - a[0],
      v = m[1] - a[1];
    if (d === l && w === v) {
      o += ` L${a[0]},${a[1]}`;
      continue;
    }
    const E = Math.hypot(d, w),
      P = Math.hypot(l, v);
    if (E === 0 || P === 0) {
      o += ` L${a[0]},${a[1]}`;
      continue;
    }
    const K = Math.min(r, E / 2, P / 2),
      p = a[0] - (d / E) * K,
      N = a[1] - (w / E) * K,
      M = a[0] + (l / P) * K,
      W = a[1] + (v / P) * K;
    (o += ` L${p},${N}`), (o += ` Q${a[0]},${a[1]} ${M},${W}`);
  }
  return (o += ` L${n[n.length - 1][0]},${n[n.length - 1][1]}`), o;
}
function Zn(e, r) {
  if (!e) return '';
  const { path: n } = ce(e);
  if (n.length < 2) return '';
  const o = n[0],
    s = n[n.length - 1],
    i = s[0] - o[0],
    a = s[1] - o[1],
    m = !r || r[0] === 'e',
    d = !r || r[2] === 's',
    w = (m && d && i < 0) || (!m && !d && i > 0),
    l = Math.hypot(i, a),
    v = Math.abs(i);
  let E = `M${o[0]},${o[1]}`;
  if (w) {
    const P = Math.max(40, Math.min(v * 0.3, 160)),
      K = Math.max(60, Math.min(v * 0.4, 200)),
      p = Math.max(40, Math.min(v * 0.2, 100)),
      N = a >= 0 ? 1 : -1,
      M = o[0] + (m ? P : -P),
      W = o[1] + N * p,
      Q = s[0] + (d ? -K : K);
    E += ` C${M},${W} ${Q},${s[1]} ${s[0]},${s[1]}`;
  } else {
    const P = Math.max(40, Math.min(l * 0.5, 150)),
      K = o[0] + (m ? P : -P),
      p = s[0] + (d ? -P : P);
    E += ` C${K},${o[1]} ${p},${s[1]} ${s[0]},${s[1]}`;
  }
  return E;
}
function Jn(e, r, n) {
  return r === 'bezier' ? Zn(e, n) : Qn(e);
}
const me = 5,
  Ue = 4;
function tr(e) {
  if (!e || !e.length) return e;
  const r = e.map((i) => {
      if (!i.$p) return null;
      const { path: a } = ce(i.$p);
      return a;
    }),
    n = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Map();
  r.forEach((i, a) => {
    if (!(!i || i.length < 2))
      for (let m = 0; m < i.length - 1; m++) {
        const [d, w] = i[m],
          [l, v] = i[m + 1];
        if (Math.abs(w - v) < 1) {
          const E = Math.round((w + v) / 2 / me) * me;
          n.has(E) || n.set(E, []),
            n.get(E).push({
              linkIdx: a,
              segIdx: m,
              min: Math.min(d, l),
              max: Math.max(d, l),
              y: (w + v) / 2,
            });
        } else if (Math.abs(d - l) < 1) {
          const E = Math.round((d + l) / 2 / me) * me;
          o.has(E) || o.set(E, []),
            o.get(E).push({
              linkIdx: a,
              segIdx: m,
              min: Math.min(w, v),
              max: Math.max(w, v),
              x: (d + l) / 2,
            });
        }
      }
  });
  const s = r.map((i) => (i ? i.map((a) => [...a]) : null));
  for (const i of o.values()) {
    if (i.length < 2) continue;
    const a = [];
    for (let d = 0; d < i.length; d++)
      for (let w = d + 1; w < i.length; w++)
        i[d].min < i[w].max &&
          i[d].max > i[w].min &&
          (a.includes(i[d]) || a.push(i[d]), a.includes(i[w]) || a.push(i[w]));
    if (a.length < 2) continue;
    const m = a.length;
    a.forEach((d, w) => {
      const l = (w - (m - 1) / 2) * Ue,
        v = s[d.linkIdx];
      v && ((v[d.segIdx][0] += l), (v[d.segIdx + 1][0] += l));
    });
  }
  for (const i of n.values()) {
    if (i.length < 2) continue;
    const a = [];
    for (let d = 0; d < i.length; d++)
      for (let w = d + 1; w < i.length; w++)
        i[d].min < i[w].max &&
          i[d].max > i[w].min &&
          (a.includes(i[d]) || a.push(i[d]), a.includes(i[w]) || a.push(i[w]));
    if (a.length < 2) continue;
    const m = a.length;
    a.forEach((d, w) => {
      const l = (w - (m - 1) / 2) * Ue,
        v = s[d.linkIdx];
      v && ((v[d.segIdx][1] += l), (v[d.segIdx + 1][1] += l));
    });
  }
  return e.map((i, a) => {
    const m = s[a];
    if (!m || !i.$p) return i;
    const w = i.$p.split(',').map(Number).slice(-6),
      l = [];
    for (const v of m) l.push(v[0], v[1]);
    return { ...i, $p: [...l, ...w].join(',') };
  });
}
function ge(e, r) {
  if (!e) return null;
  if (e.color) return e.color;
  const n = r.current;
  return n
    ? e.type === 'summary'
      ? n.summary || null
      : e.type === 'milestone'
        ? n.milestone || null
        : n.task || null
    : null;
}
function er(e, r) {
  const n = r?.style || e;
  if (n === 'dashed') return '8 4';
  if (n === 'dotted') return '2 4';
}
function nr({
  onSelectLink: e,
  selectedLink: r,
  readonly: n,
  linkShape: o,
  linkGradient: s,
  linkStyle: i,
  linkBundling: a,
  multiTaskRows: m,
  taskPositions: d,
  cellHeight: w,
}) {
  const l = Yt(jt),
    [v, E] = ie(l, '_links'),
    [P] = ie(l, 'criticalPath'),
    K = J(l, '_tasks'),
    p = o && o !== 'squared',
    N = st(null),
    M = st(null),
    W = st(null),
    Q = st(/* @__PURE__ */ new Set());
  at(() => {
    if (!s || !M.current) return;
    const C = getComputedStyle(M.current);
    W.current = {
      task: C.getPropertyValue('--wx-gantt-task-color').trim() || null,
      summary: C.getPropertyValue('--wx-gantt-summary-color').trim() || null,
      milestone:
        C.getPropertyValue('--wx-gantt-milestone-color').trim() || null,
      link: C.getPropertyValue('--wx-gantt-link-color').trim() || '#888',
    };
  }, [s]);
  const X = I(() => {
      if (!v?.length || !K?.length) return v;
      const C = new Set(K.map((k) => k.id)),
        H = new Map(K.map((k) => [k.id, k]));
      let U = !1;
      for (const k of v)
        if (!C.has(k.source) || !C.has(k.target)) {
          U = !0;
          break;
        }
      if (!U) return v;
      function V(k) {
        let T = l.getTask(k);
        for (; T; ) {
          if (C.has(T.id)) return H.get(T.id);
          if (!T.parent) return null;
          T = l.getTask(T.parent);
        }
        return null;
      }
      function g(k, T, b) {
        const A = !b || b[0] === 'e',
          lt = !b || b[2] === 's',
          it = k.$h || w,
          pt = T.$h || w,
          Nt = A ? k.$x + k.$w : k.$x,
          kt = k.$y + it / 2,
          $t = lt ? T.$x : T.$x + T.$w,
          Tt = T.$y + pt / 2,
          mt = 5,
          Dt = lt ? -1 : 1,
          Gt = $t + Dt * -10,
          zt = Tt - mt,
          It = $t,
          L = Tt,
          F = $t + Dt * -10,
          G = Tt + mt;
        return [Nt, kt, $t, Tt, Gt, zt, It, L, F, G].join(',');
      }
      return v.map((k) => {
        const T = C.has(k.source),
          b = C.has(k.target);
        if (T && b) return k;
        const A = T ? H.get(k.source) : V(k.source),
          lt = b ? H.get(k.target) : V(k.target);
        if (!A || !lt || A.id === lt.id) return k;
        const it = g(A, lt, k.type);
        return { ...k, $p: it, _rerouted: !0 };
      });
    }, [v, E, K, l, w]),
    j = I(() => {
      if (!m || !d || !K?.length || !X?.length || !w) return X;
      const C = /* @__PURE__ */ new Map();
      let H = !1;
      if (
        (K.forEach((g) => {
          const k = d.get(g.id);
          if (!k) return;
          const T = g.$y + w / 2,
            A = k.y + k.h / 2 - T;
          Math.abs(A) > 0.5 && (H = !0), C.set(g.id, A);
        }),
        !H)
      )
        return X;
      const U = [];
      K.forEach((g) => {
        const k = C.get(g.id);
        k !== void 0 && U.push({ storeCenter: g.$y + w / 2, delta: k });
      }),
        U.sort((g, k) => g.storeCenter - k.storeCenter);
      function V(g) {
        let k = 0,
          T = 1 / 0;
        for (const b of U) {
          const A = Math.abs(g - b.storeCenter);
          A < T && ((T = A), (k = b.delta));
        }
        return k;
      }
      return X.map((g) => {
        if (!g.$p) return g;
        const k = C.get(g.source) ?? 0,
          T = C.get(g.target) ?? 0;
        if (Math.abs(k) < 0.5 && Math.abs(T) < 0.5) return g;
        const b = g.$p.split(',').map(Number),
          A = [...b],
          lt = b.length - 6;
        lt >= 2 && (A[1] += k), lt >= 4 && (A[lt - 1] += T);
        for (let it = 2; it < lt - 2; it += 2) A[it + 1] += V(b[it + 1]);
        for (let it = lt; it < b.length; it += 2) A[it + 1] += T;
        return { ...g, $p: A.join(',') };
      });
    }, [X, E, m, d, K, w]),
    D = I(() => (!a || !j?.length ? j : tr(j)), [j, E, a]),
    gt = I(() => {
      const C = Q.current,
        H = /* @__PURE__ */ new Set();
      if (D) for (const U of D) C.has(U.id) || H.add(U.id);
      return H;
    }, [D, E]);
  at(() => {
    D && (Q.current = new Set(D.map((C) => C.id)));
  }, [D, E]);
  const et = B(
    (C) => {
      const H = C?.target?.classList;
      !H?.contains('wx-line') &&
        !H?.contains('wx-line-hitarea') &&
        !H?.contains('wx-delete-button') &&
        e(null);
    },
    [e],
  );
  at(() => {
    if (!n && r && N.current) {
      const C = (H) => {
        N.current && !N.current.contains(H.target) && et(H);
      };
      return (
        document.addEventListener('click', C),
        () => {
          document.removeEventListener('click', C);
        }
      );
    }
  }, [n, r, et]);
  const yt = I(() => {
      if (!s || !D?.length) return null;
      const C = [];
      for (const H of D) {
        if (!H.$p || (P && H.$critical)) continue;
        const V = l.getTask(H.source),
          g = l.getTask(H.target),
          k = ge(V, W) || W.current?.link || '#888',
          T = ge(g, W) || W.current?.link || '#888',
          { path: b } = ce(H.$p);
        if (b.length < 2) continue;
        const A = b[0],
          lt = b[b.length - 1],
          it = V?.progress ?? 0,
          pt = Math.min(100, Math.max(0, it));
        C.push(
          /* @__PURE__ */ At(
            'linearGradient',
            {
              id: `wx-link-grad-${H.id}`,
              gradientUnits: 'userSpaceOnUse',
              x1: A[0],
              y1: A[1],
              x2: lt[0],
              y2: lt[1],
              children: [
                /* @__PURE__ */ u('stop', { offset: '0%', stopColor: k }),
                pt > 0 &&
                  /* @__PURE__ */ u('stop', { offset: `${pt}%`, stopColor: k }),
                /* @__PURE__ */ u('stop', { offset: '100%', stopColor: T }),
              ],
            },
            `grad-${H.id}`,
          ),
        );
      }
      return C;
    }, [D, E, s, P, l]),
    ct = (C, H) => {
      const U = P && C.$critical,
        V = gt.has(C.id),
        g = C._rerouted ? '6 3' : er(i, C),
        k = V && !H,
        T = o === 'bezier',
        A =
          'wx-dkx3NwEn wx-line' +
          (U ? ' wx-critical' : '') +
          (!n && !H ? ' wx-line-selectable' : '') +
          (H ? ' wx-line-selected wx-line-selectable wx-delete-link' : '') +
          ' wx-line-visible' +
          (k ? (g ? ' wx-line-new-fade' : ' wx-line-new') : ''),
        lt = 'wx-dkx3NwEn wx-line-hitarea';
      let it,
        pt = U
          ? 'url(#wx-arrow-critical)'
          : H
            ? 'url(#wx-arrow-selected)'
            : 'url(#wx-arrow-default)';
      if (
        (s &&
          !U &&
          !H &&
          C.$p &&
          ((it = `url(#wx-link-grad-${C.id})`),
          (pt = `url(#wx-arrow-grad-${C.id})`)),
        p)
      ) {
        const kt = Jn(C.$p, o, C.type);
        if (T && C.$p) {
          const { arrow: $t } = ce(C.$p),
            Tt = $t.map((Dt) => Dt.join(',')).join(' ');
          let mt;
          if (H) mt = 'var(--wx-color-danger)';
          else if (U) mt = 'var(--wx-gantt-link-critical-color)';
          else if (s && C.$p) {
            const Dt = l.getTask(C.target);
            mt = ge(Dt, W) || W.current?.link || 'var(--wx-gantt-link-color)';
          } else mt = 'var(--wx-gantt-link-color)';
          return /* @__PURE__ */ At(
            pe,
            {
              children: [
                /* @__PURE__ */ u('path', {
                  className: lt,
                  d: kt,
                  onClick: () => !n && !H && e(C.id),
                  'data-link-id': C.id,
                }),
                /* @__PURE__ */ u('path', {
                  ref: H ? N : void 0,
                  className: A,
                  d: kt,
                  stroke: it,
                  strokeDasharray: g,
                  'data-link-id': C.id,
                }),
                /* @__PURE__ */ u('polygon', {
                  points: Tt,
                  fill: mt,
                  className: 'wx-dkx3NwEn',
                }),
              ],
            },
            C.id,
          );
        }
        return /* @__PURE__ */ At(
          pe,
          {
            children: [
              /* @__PURE__ */ u('path', {
                className: lt,
                d: kt,
                onClick: () => !n && !H && e(C.id),
                'data-link-id': C.id,
              }),
              /* @__PURE__ */ u('path', {
                ref: H ? N : void 0,
                className: A,
                d: kt,
                stroke: it,
                strokeDasharray: g,
                markerEnd: pt,
                'data-link-id': C.id,
              }),
            ],
          },
          C.id,
        );
      }
      const Nt = jn(C.$p);
      return /* @__PURE__ */ At(
        pe,
        {
          children: [
            /* @__PURE__ */ u('polyline', {
              className: lt,
              points: Nt,
              onClick: () => !n && !H && e(C.id),
              'data-link-id': C.id,
            }),
            /* @__PURE__ */ u('polyline', {
              ref: H ? N : void 0,
              className: A,
              points: Nt,
              stroke: it,
              strokeDasharray: g,
              markerEnd: pt,
              'data-link-id': C.id,
            }),
          ],
        },
        C.id,
      );
    },
    ht = I(() => {
      if (!s || !D?.length) return null;
      const C = [];
      for (const H of D) {
        if (!H.$p || (P && H.$critical)) continue;
        const V = l.getTask(H.target),
          g = ge(V, W) || W.current?.link || '#888';
        C.push(
          /* @__PURE__ */ u(
            'marker',
            {
              id: `wx-arrow-grad-${H.id}`,
              markerWidth: '10',
              markerHeight: '8',
              refX: '10',
              refY: '4',
              orient: 'auto',
              markerUnits: 'userSpaceOnUse',
              children: /* @__PURE__ */ u('polygon', {
                points: '0,0 10,4 0,8',
                fill: g,
              }),
            },
            `arrow-grad-${H.id}`,
          ),
        );
      }
      return C;
    }, [D, E, s, P, l]);
  return /* @__PURE__ */ At('svg', {
    className: 'wx-dkx3NwEn wx-links',
    ref: M,
    children: [
      /* @__PURE__ */ At('defs', {
        children: [
          /* @__PURE__ */ u('marker', {
            id: 'wx-arrow-default',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ u('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill',
            }),
          }),
          /* @__PURE__ */ u('marker', {
            id: 'wx-arrow-critical',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ u('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-critical',
            }),
          }),
          /* @__PURE__ */ u('marker', {
            id: 'wx-arrow-selected',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ u('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-selected',
            }),
          }),
          /* @__PURE__ */ u('marker', {
            id: 'wx-arrow-hovered',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ u('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-hovered',
            }),
          }),
          yt,
          ht,
        ],
      }),
      (D || []).map((C) => ct(C, !1)),
      !n && r && ct(r, !0),
    ],
  });
}
function rr(e) {
  const { task: r, type: n } = e;
  function o(i) {
    const a = r.segments[i];
    return {
      left: `${a.$x}px`,
      top: '0px',
      width: `${a.$w}px`,
      height: '100%',
    };
  }
  function s(i) {
    if (!r.progress) return 0;
    const a = (r.duration * r.progress) / 100,
      m = r.segments;
    let d = 0,
      w = 0,
      l = null;
    do {
      const v = m[w];
      w === i &&
        (d > a ? (l = 0) : (l = Math.min((a - d) / v.duration, 1) * 100)),
        (d += v.duration),
        w++;
    } while (l === null && w < m.length);
    return l || 0;
  }
  return /* @__PURE__ */ u('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: r.segments.map((i, a) =>
      /* @__PURE__ */ At(
        'div',
        {
          className: `wx-segment wx-bar wx-${n} wx-GKbcLEGA`,
          'data-segment': a,
          style: o(a),
          children: [
            r.progress
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ u('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${s(a)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ u('div', {
              className: 'wx-content',
              children: i.text || '',
            }),
          ],
        },
        a,
      ),
    ),
  });
}
let Te = [],
  Me = null,
  Fe = null;
const Ve = (e, r, n, o) => e < o && r > n,
  qe = (e, r) => {
    if (!r || !r.start) return null;
    const { start: n, lengthUnitWidth: o, lengthUnit: s } = r,
      i = 864e5,
      a =
        s === 'week'
          ? 7
          : s === 'month'
            ? 30
            : s === 'quarter'
              ? 91
              : s === 'year'
                ? 365
                : 1,
      m = Math.floor(e / o),
      d = new Date(n.getTime() + m * a * i);
    return d.setUTCHours(0, 0, 0, 0), d;
  },
  sr = (e, r, n) => {
    if (!n || !e || !r) return 0;
    const { lengthUnit: o } = n,
      a =
        (o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1) * 864e5;
    return Math.round((e.getTime() - r.getTime()) / a);
  },
  or = (e, r, n) => {
    if (!n || !e) return e;
    const { lengthUnit: o } = n,
      a =
        (o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1) * 864e5,
      m = new Date(e.getTime() + r * a);
    return m.setUTCHours(0, 0, 0, 0), m;
  };
function ir(e) {
  const {
      readonly: r,
      taskTemplate: n,
      multiTaskRows: o = !1,
      rowMapping: s = null,
      rowHeightOverrides: i = null,
      allowTaskIntersection: a = !0,
      summaryBarCounts: m = !1,
      marqueeSelect: d = !1,
      copyPaste: w = !1,
      linkShape: l,
      linkGradient: v = !1,
      linkStyle: E,
      linkBundling: P = !1,
      showProgress: K = !0,
    } = e,
    p = Yt(jt),
    [N, M] = ie(p, '_tasks'),
    [W, Q] = ie(p, '_links'),
    X = J(p, 'area'),
    j = J(p, '_scales'),
    D = J(p, 'taskTypes'),
    gt = J(p, 'baselines'),
    et = J(p, '_selected'),
    yt = J(p, '_scrollTask'),
    ct = J(p, 'criticalPath'),
    ht = J(p, 'tasks'),
    C = J(p, 'schedule'),
    H = J(p, 'splitTasks'),
    U = J(p, 'summary'),
    V = I(() => {
      if (!X || !Array.isArray(N)) return [];
      const t = X.start ?? 0,
        h = X.end ?? 0;
      return o && s
        ? N.map((x) => ({ ...x }))
        : N.slice(t, h).map((x) => ({ ...x }));
    }, [M, X, o, s]),
    g = J(p, 'cellHeight'),
    k = I(() => {
      if (!o || !s || !V.length) return V;
      const t = /* @__PURE__ */ new Map(),
        h = [];
      N.forEach((S) => {
        const ut = s.taskRows.get(S.id) ?? S.id;
        t.has(ut) || (t.set(ut, h.length), h.push(ut));
      });
      const x = /* @__PURE__ */ new Map();
      V.forEach((S) => {
        if (S.type === 'summary') return;
        const ut = s.taskRows.get(S.id) ?? S.id;
        x.has(ut) || x.set(ut, []), x.get(ut).push(S);
      });
      const f = /* @__PURE__ */ new Map(),
        $ = /* @__PURE__ */ new Map();
      x.forEach((S, ut) => {
        const ft = [],
          Wt = [...S].sort((Et, St) => (Et.$x ?? 0) - (St.$x ?? 0));
        for (const Et of Wt) {
          const St = Et.$x ?? 0,
            Kt = St + (Et.$w ?? 0);
          let Ft = !1;
          for (let Ot = 0; Ot < ft.length; Ot++)
            if (
              !ft[Ot].some((Jt) => {
                const he = Jt.$x ?? 0,
                  $e = he + (Jt.$w ?? 0);
                return Ve(St, Kt, he, $e);
              })
            ) {
              ft[Ot].push(Et), f.set(Et.id, Ot), (Ft = !0);
              break;
            }
          Ft || (ft.push([Et]), f.set(Et.id, ft.length - 1));
        }
        $.set(ut, ft.length);
      });
      const z = /* @__PURE__ */ new Map();
      let q = 0;
      for (const S of h) {
        z.set(S, q);
        const ut = (i && i[S]) || g;
        q += ut;
      }
      return V.map((S) => {
        const ut = s.taskRows.get(S.id) ?? S.id,
          ft = z.get(ut) ?? 0;
        if (S.type === 'summary') {
          if ((x.get(ut) || []).length > 0 || S.barHidden)
            return { ...S, $y: ft, $skip: !0 };
          const Ot = (i && i[ut]) || g,
            Bt = Math.max(0, Math.floor((Ot - S.$h) / 2));
          return {
            ...S,
            $y: ft + Bt,
            $y_base: S.$y_base !== void 0 ? ft + Bt : void 0,
          };
        }
        const Wt = $.get(ut) || 1,
          Et = f.get(S.id) ?? 0;
        if (Wt > 1) {
          const Bt = S.$h + 4,
            Jt = ft + 3 + Et * Bt;
          return {
            ...S,
            $y: Jt,
            $y_base: S.$y_base !== void 0 ? Jt : void 0,
          };
        }
        const St = (i && i[ut]) || g,
          Kt = Math.max(0, Math.round((St - S.$h) / 2));
        return {
          ...S,
          $y: ft + Kt,
          $y_base: S.$y_base !== void 0 ? ft + Kt : void 0,
        };
      });
    }, [V, o, s, N, g, i]),
    T = I(() => {
      if (!o || !k?.length) return null;
      const t = /* @__PURE__ */ new Map();
      for (const h of k) h.$skip || t.set(h.id, { y: h.$y, h: h.$h });
      return t;
    }, [o, k]),
    b = I(() => j.lengthUnitWidth, [j]),
    A = I(() => j.lengthUnit || 'day', [j]),
    lt = I(() => {
      const t = /* @__PURE__ */ new Set();
      if (a || !o || !s) return t;
      const h = /* @__PURE__ */ new Map();
      return (
        N.forEach((x) => {
          if (x.type === 'summary' || x.type === 'milestone') return;
          const f = s.taskRows.get(x.id) ?? x.id;
          h.has(f) || h.set(f, []), h.get(f).push(x);
        }),
        h.forEach((x) => {
          if (!(x.length < 2))
            for (let f = 0; f < x.length; f++)
              for (let $ = f + 1; $ < x.length; $++) {
                const z = x[f],
                  q = x[$];
                Ve(z.$x, z.$x + z.$w, q.$x, q.$x + q.$w) &&
                  (t.add(z.id), t.add(q.id));
              }
        }),
        t
      );
    }, [a, o, s, N, M]),
    it = I(() => {
      if (!m || !N?.length || !b) return null;
      const t = /* @__PURE__ */ new Map(),
        h = /* @__PURE__ */ new Set();
      N.forEach((f) => {
        f.type === 'summary' && h.add(f.id),
          f.parent &&
            f.parent !== 0 &&
            f.type !== 'summary' &&
            (t.has(f.parent) || t.set(f.parent, []), t.get(f.parent).push(f));
      });
      const x = /* @__PURE__ */ new Map();
      return (
        h.forEach((f) => {
          const $ = t.get(f);
          if (!$?.length) return;
          const z = /* @__PURE__ */ new Map();
          $.forEach((q) => {
            if (q.$x == null || q.$w == null) return;
            const S = Math.floor(q.$x / b),
              ut = Math.ceil((q.$x + q.$w) / b);
            for (let ft = S; ft < ut; ft++) z.set(ft, (z.get(ft) || 0) + 1);
          }),
            z.size > 0 && x.set(f, z);
        }),
        x
      );
    }, [m, N, b]),
    [pt, Nt] = bt(null),
    kt = st(null),
    [$t, Tt] = bt(null),
    [mt, Dt] = bt(null),
    [Gt, zt] = bt(null),
    It = st(null);
  It.current = Gt;
  const L = st(0),
    F = st(!1),
    [G, wt] = bt(void 0),
    xt = st(null),
    nt = st(null),
    R = st(!1),
    vt = st(null),
    [dt, tt] = bt(null),
    [Lt, _t] = bt(null),
    Y = st(null),
    [rt, Mt] = bt(null),
    Pt = I(
      () =>
        rt && {
          ...W.find((t) => t.id === rt),
        },
      [rt, Q],
    ),
    [Ct, c] = bt(void 0),
    y = st(null),
    [_, O] = bt(0),
    Z = st(null),
    ot = I(() => {
      const t = Z.current;
      return !!(et.length && t && t.contains(document.activeElement));
    }, [et, Z.current]),
    Rt = I(() => ot && et[et.length - 1]?.id, [ot, et]);
  at(() => {
    if (yt && ot && yt) {
      const { id: t } = yt,
        h = Z.current?.querySelector(`.wx-bar[data-id='${t}']`);
      h && h.focus({ preventScroll: !0 });
    }
  }, [yt]),
    at(() => {
      const t = Z.current;
      if (t && (O(t.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const h = new ResizeObserver((x) => {
          x[0] && O(x[0].contentRect.width);
        });
        return h.observe(t), () => h.disconnect();
      }
    }, [Z.current]);
  const Ht = B(() => {
      document.body.style.userSelect = 'none';
    }, []),
    Xt = B(() => {
      document.body.style.userSelect = '';
    }, []),
    Qt = I(() => {
      if (!o || !s || !N?.length) return /* @__PURE__ */ new Map();
      const t = /* @__PURE__ */ new Map(),
        h = /* @__PURE__ */ new Map(),
        x = [];
      return (
        N.forEach((f) => {
          const $ = s.taskRows.get(f.id) ?? f.id;
          h.has($) || (h.set($, x.length), x.push($));
        }),
        N.forEach((f) => {
          const $ = s.taskRows.get(f.id) ?? f.id,
            z = h.get($) ?? 0;
          t.set(f.id, z * g);
        }),
        t
      );
    }, [N, o, s, g]),
    le = I(() => {
      if (!o || !s || !N?.length) return /* @__PURE__ */ new Map();
      const t = /* @__PURE__ */ new Map(),
        h = /* @__PURE__ */ new Map(),
        x = [];
      return (
        N.forEach((f) => {
          const $ = s.taskRows.get(f.id) ?? f.id;
          h.has($) || (h.set($, x.length), x.push($));
        }),
        N.forEach((f) => {
          const $ = f.row ?? f.id;
          if (!t.has($)) {
            const z = s.taskRows.get(f.id) ?? f.id,
              q = h.get(z) ?? 0;
            t.set($, q * g);
          }
        }),
        t
      );
    }, [N, o, s, g]),
    se = B(
      (t) => {
        if (!Z.current) return [];
        const h = Math.min(t.startX, t.currentX),
          x = Math.max(t.startX, t.currentX),
          f = Math.min(t.startY, t.currentY),
          $ = Math.max(t.startY, t.currentY);
        return N.filter((z) => {
          const q = z.$x,
            S = z.$x + z.$w,
            ft = Qt.get(z.id) ?? z.$y,
            Wt = ft + z.$h;
          return q < x && S > h && ft < $ && Wt > f;
        });
      },
      [N, Qt],
    ),
    De = B(() => {
      if (!w) return;
      const t = p.getState()._selected;
      if (!t || !t.length) return;
      const h = 864e5,
        x = t
          .map((S) => {
            if (!p.getTask(S.id)) return null;
            const ft = N.find(($e) => $e.id === S.id);
            if (!ft) return null;
            const {
                $x: Wt,
                $y: Et,
                $h: St,
                $w: Kt,
                $skip: Ft,
                $level: Ot,
                ...Bt
              } = ft,
              Jt =
                ft.end && ft.start
                  ? Math.round((ft.end.getTime() - ft.start.getTime()) / h)
                  : 0,
              he = ft.start ? (ft.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...Bt,
              _durationDays: Jt,
              _startDayOfWeek: he,
              _originalWidth: Kt,
              _originalHeight: St,
            };
          })
          .filter(Boolean);
      if (!x.length) return;
      const $ = x[0].parent,
        z = x.filter((S) => S.parent === $);
      if (z.length === 0) return;
      const q = z.reduce(
        (S, ut) => (ut.start && (!S || ut.start < S) ? ut.start : S),
        null,
      );
      (Te = z.map((S) => ({
        ...S,
        _startCellOffset: sr(S.start, q, j),
      }))),
        (Fe = $),
        (Me = q);
    }, [w, p, N, j]),
    sn = B(
      (t, h, x) => {
        if (!h.length || !t || x == null) return;
        const f = 864e5,
          $ = p.getHistory();
        $?.startBatch();
        const z = new Date(t);
        z.setUTCHours(0, 0, 0, 0),
          h.forEach((q, S) => {
            const ut = `task-${Date.now()}-${S}`,
              ft = or(z, q._startCellOffset || 0, j),
              Wt = new Date(ft.getTime() + (q._startDayOfWeek || 0) * f);
            Wt.setUTCHours(0, 0, 0, 0);
            const Et = new Date(Wt.getTime() + (q._durationDays || 7) * f);
            Et.setUTCHours(0, 0, 0, 0),
              p.exec('add-task', {
                task: {
                  id: ut,
                  text: q.text,
                  start: Wt,
                  end: Et,
                  type: q.type || 'task',
                  parent: x,
                  row: q.row,
                },
                target: x,
                mode: 'child',
                skipUndo: S > 0,
              });
          }),
          $?.endBatch();
      },
      [p, j],
    );
  at(
    () =>
      w
        ? p.intercept('hotkey', (h) => {
            if (h.key === 'ctrl+c' || h.key === 'meta+c') return De(), !1;
            if (h.key === 'ctrl+v' || h.key === 'meta+v')
              return (
                !Te.length ||
                  !Me ||
                  Dt({
                    tasks: Te,
                    baseDate: Me,
                    parent: Fe,
                    currentX: L.current,
                  }),
                !1
              );
          })
        : void 0,
    [w, p, De],
  ),
    at(() => {
      if (!mt) return;
      const t = (h) => {
        h.key === 'Escape' &&
          (h.preventDefault(), h.stopPropagation(), Dt(null));
      };
      return (
        document.addEventListener('keydown', t, !0),
        () => document.removeEventListener('keydown', t, !0)
      );
    }, [mt]);
  const ae = B(
      (t, h, x) => {
        if (
          h.target.classList.contains('wx-line') ||
          (x || (x = p.getTask(te(t))),
          x.type === 'milestone' || x.type === 'summary')
        )
          return '';
        const f = Vt(h, 'data-segment');
        f && (t = f);
        const { left: $, width: z } = t.getBoundingClientRect(),
          q = (h.clientX - $) / z;
        let S = 0.2 / (z > 200 ? z / 200 : 1);
        return q < S ? 'start' : q > 1 - S ? 'end' : '';
      },
      [p],
    ),
    ue = B(
      (t, h) => {
        const { clientX: x } = h,
          f = te(t),
          $ = p.getTask(f),
          z = h.target.classList;
        if (
          !h.target.closest('.wx-delete-button') &&
          !h.target.closest('[data-interactive]') &&
          !(z.contains('wx-link') || h.target.closest('.wx-link')) &&
          !r
        ) {
          if (z.contains('wx-progress-marker')) {
            const { progress: q } = p.getTask(f);
            (Y.current = {
              id: f,
              x,
              progress: q,
              dx: 0,
              node: t,
              marker: h.target,
            }),
              h.target.classList.add('wx-progress-in-drag');
          } else {
            const q = ae(t, h, $) || 'move',
              S = {
                id: f,
                mode: q,
                x,
                dx: 0,
                l: $.$x,
                w: $.$w,
              };
            if (H && $.segments?.length) {
              const ut = Vt(h, 'data-segment');
              ut && ((S.segmentIndex = ut.dataset.segment * 1), Nn($, S));
            }
            _t(S);
          }
          Ht();
        }
      },
      [p, r, ae, Ht, H],
    ),
    on = B(
      (t) => {
        if (t.button !== 0 || mt) return;
        const h = Vt(t);
        if (!h && d && !r) {
          const x = Z.current;
          if (!x) return;
          const f = x.getBoundingClientRect(),
            $ = t.clientX - f.left,
            z = t.clientY - f.top;
          if (w) {
            const S = qe($, j);
            S && ((It.current = S), zt(S));
          }
          const q = {
            startX: $,
            startY: z,
            currentX: $,
            currentY: z,
            ctrlKey: t.ctrlKey || t.metaKey,
          };
          Nt(q), (kt.current = q), Ht();
          return;
        }
        if (h && d && !r && et.length > 1) {
          const x = te(h);
          if (et.some(($) => $.id === x)) {
            Tt({
              startX: t.clientX,
              ids: et.map(($) => $.id),
              tasks: et.map(($) => {
                const z = p.getTask($.id);
                return {
                  id: $.id,
                  start: z.start,
                  end: z.end,
                  $x: z.$x,
                  $w: z.$w,
                };
              }),
            }),
              Ht();
            return;
          }
        }
        if (
          !r &&
          (t.target.classList.contains('wx-link') ||
            t.target.classList.contains('wx-inner'))
        ) {
          if (xt.current) return;
          const x = t.target.classList.contains('wx-link')
            ? t.target
            : t.target.closest('.wx-link');
          if (x) {
            const f = Zt(x);
            if (f) {
              const $ = x.classList.contains('wx-left'),
                z = { id: f, start: $ };
              wt(z),
                (xt.current = z),
                (nt.current = { clientX: t.clientX, clientY: t.clientY }),
                (R.current = !1),
                (F.current = !0),
                Ht();
              return;
            }
          }
        }
        h && ue(h, t);
      },
      [ue, d, w, r, mt, j, et, p, Ht],
    ),
    cn = B(
      (t) => {
        const h = Vt(t);
        h &&
          (y.current = setTimeout(() => {
            c(!0), ue(h, t.touches[0]);
          }, 300));
      },
      [ue],
    ),
    ln = ['e2s', 's2s', 'e2e', 's2e'],
    ee = B((t, h) => ln[(t ? 1 : 0) + (h ? 0 : 2)], []),
    de = B(
      (t, h) => {
        const x = G.id,
          f = G.start;
        return t === x
          ? !0
          : !!W.find(
              ($) => $.target == t && $.source == x && $.type === ee(f, h),
            );
      },
      [G, Q, ee],
    ),
    ve = B((t) => {
      Mt(t);
    }, []),
    ne = B(
      (t) => {
        if (nt.current) {
          const x = R.current;
          if (
            ((nt.current = null),
            (R.current = !1),
            (vt.current = null),
            tt(null),
            Xt(),
            x)
          ) {
            const f = xt.current,
              $ = t || window.event,
              z = $ ? document.elementFromPoint($.clientX, $.clientY) : null;
            if (z && f) {
              const q = z.classList.contains('wx-link')
                ? z
                : z.closest('.wx-link');
              if (q) {
                const S = Zt(q),
                  ut = q.classList.contains('wx-left');
                if (S && S !== f.id) {
                  const ft = ee(f.start, ut);
                  W.find(
                    (Et) =>
                      Et.target == S && Et.source == f.id && Et.type === ft,
                  ) ||
                    p.exec('add-link', {
                      link: {
                        source: f.id,
                        target: S,
                        type: ft,
                      },
                    });
                }
              }
            }
            wt(null), (xt.current = null), (F.current = !0);
          }
          return;
        }
        const h = kt.current;
        if (h) {
          const x = se(h);
          h.ctrlKey
            ? x.forEach((f) => {
                p.exec('select-task', { id: f.id, toggle: !0, marquee: !0 });
              })
            : (et.length > 0 &&
                p.exec('select-task', { id: null, marquee: !0 }),
              x.forEach((f, $) => {
                p.exec('select-task', {
                  id: f.id,
                  toggle: $ > 0,
                  marquee: !0,
                });
              })),
            Nt(null),
            (kt.current = null),
            Xt(),
            (F.current = !0);
          return;
        }
        if ($t) {
          const { ids: x, tasks: f, startX: $ } = $t;
          Tt(null), Xt(), (F.current = !0);
          return;
        }
        if (Y.current) {
          const { dx: x, id: f, marker: $, value: z } = Y.current;
          (Y.current = null),
            typeof z < 'u' &&
              x &&
              p.exec('update-task', {
                id: f,
                task: { progress: z },
                inProgress: !1,
              }),
            $.classList.remove('wx-progress-in-drag'),
            (F.current = !0),
            Xt();
        } else if (Lt) {
          const {
            id: x,
            mode: f,
            dx: $,
            l: z,
            w: q,
            start: S,
            segment: ut,
            index: ft,
          } = Lt;
          if ((_t(null), S)) {
            const Wt = Math.round($ / b);
            if (!Wt)
              p.exec('drag-task', {
                id: x,
                width: q,
                left: z,
                inProgress: !1,
                ...(ut && { segmentIndex: ft }),
              });
            else {
              let Et = {},
                St = p.getTask(x);
              ut && (St = St.segments[ft]);
              const Kt = 1440 * 60 * 1e3,
                Ot =
                  Wt *
                  (A === 'week'
                    ? 7
                    : A === 'month'
                      ? 30
                      : A === 'quarter'
                        ? 91
                        : A === 'year'
                          ? 365
                          : 1) *
                  Kt;
              f === 'move'
                ? ((Et.start = new Date(St.start.getTime() + Ot)),
                  (Et.end = new Date(St.end.getTime() + Ot)))
                : f === 'start'
                  ? ((Et.start = new Date(St.start.getTime() + Ot)),
                    (Et.end = St.end))
                  : f === 'end' &&
                    ((Et.start = St.start),
                    (Et.end = new Date(St.end.getTime() + Ot))),
                p.exec('update-task', {
                  id: x,
                  task: Et,
                  ...(ut && { segmentIndex: ft }),
                });
            }
            F.current = !0;
          }
          Xt();
        }
      },
      [p, Xt, Lt, b, A, ee, W],
    ),
    fe = B(
      (t, h) => {
        const { clientX: x } = h;
        if (nt.current && Z.current) {
          const f = nt.current,
            $ = x - f.clientX,
            z = h.clientY - f.clientY;
          if (!R.current) {
            if (Math.abs($) + Math.abs(z) < 5) return;
            R.current = !0;
          }
          const q = Z.current.getBoundingClientRect(),
            S = { x: x - q.left, y: h.clientY - q.top };
          (vt.current = S), tt(S);
          return;
        }
        if (w && Z.current) {
          const f = Z.current.getBoundingClientRect();
          L.current = x - f.left;
        }
        if (mt && Z.current) {
          const f = Z.current.getBoundingClientRect();
          Dt(($) => ($ ? { ...$, currentX: x - f.left } : null));
        }
        if (pt) {
          const f = Z.current;
          if (!f) return;
          const $ = f.getBoundingClientRect(),
            z = x - $.left,
            q = h.clientY - $.top;
          Nt((S) => ({
            ...S,
            currentX: z,
            currentY: q,
          })),
            kt.current &&
              ((kt.current.currentX = z), (kt.current.currentY = q));
          return;
        }
        if (!r)
          if (Y.current) {
            const { node: f, x: $, id: z } = Y.current,
              q = (Y.current.dx = x - $),
              S = Math.round((q / f.offsetWidth) * 100);
            let ut = Y.current.progress + S;
            (Y.current.value = ut = Math.min(Math.max(0, ut), 100)),
              p.exec('update-task', {
                id: z,
                task: { progress: ut },
                inProgress: !0,
              });
          } else if (Lt) {
            ve(null);
            const {
                mode: f,
                l: $,
                w: z,
                x: q,
                id: S,
                start: ut,
                segment: ft,
                index: Wt,
              } = Lt,
              Et = p.getTask(S),
              St = x - q,
              Kt = Math.round(b) || 1;
            if (
              (!ut && Math.abs(St) < 20) ||
              (f === 'start' && z - St < Kt) ||
              (f === 'end' && z + St < Kt) ||
              (f === 'move' &&
                ((St < 0 && $ + St < 0) || (St > 0 && $ + z + St > _))) ||
              (Lt.segment && !In(Et, Lt))
            )
              return;
            const Ft = { ...Lt, dx: St };
            let Ot, Bt;
            if (
              (f === 'start'
                ? ((Ot = $ + St), (Bt = z - St))
                : f === 'end'
                  ? ((Ot = $), (Bt = z + St))
                  : f === 'move' && ((Ot = $ + St), (Bt = z)),
              p.exec('drag-task', {
                id: S,
                width: Bt,
                left: Ot,
                inProgress: !0,
                start: ut,
                ...(ft && { segmentIndex: Wt }),
              }),
              !Ft.start &&
                ((f === 'move' && Et.$x == $) || (f !== 'move' && Et.$w == z)))
            ) {
              (F.current = !0), ne();
              return;
            }
            (Ft.start = !0), _t(Ft);
          } else {
            const f = Vt(t);
            if (f) {
              const $ = p.getTask(te(f)),
                q = Vt(t, 'data-segment') || f,
                S = ae(q, h, $);
              q.style.cursor = S && !r ? 'col-resize' : 'pointer';
            }
          }
      },
      [p, r, Lt, b, _, ae, ve, ne],
    ),
    an = B(
      (t) => {
        fe(t, t);
      },
      [fe],
    ),
    un = B(
      (t) => {
        Ct
          ? (t.preventDefault(), fe(t, t.touches[0]))
          : y.current && (clearTimeout(y.current), (y.current = null));
      },
      [Ct, fe],
    ),
    be = B(
      (t) => {
        ne(t);
      },
      [ne],
    ),
    dn = B(
      (t) => {
        c(null),
          y.current && (clearTimeout(y.current), (y.current = null)),
          ne(t);
      },
      [ne],
    );
  at(
    () => (
      window.addEventListener('mouseup', be),
      () => {
        window.removeEventListener('mouseup', be);
      }
    ),
    [be],
  );
  const fn = B(
      (t) => {
        if (!r) {
          if (t.target.closest('[data-interactive]')) return;
          const h = Zt(t.target);
          if (h && !t.target.classList.contains('wx-link')) {
            const x = Zt(t.target, 'data-segment');
            p.exec('show-editor', {
              id: h,
              ...(x !== null && { segmentIndex: x }),
            });
          }
        }
      },
      [p, r],
    ),
    Le = B(() => {
      G && (wt(null), (xt.current = null));
    }, [G]),
    hn = B(
      (t) => {
        if (F.current) {
          F.current = !1;
          return;
        }
        if (mt && mt.currentX != null) {
          const x = qe(mt.currentX, j);
          x && sn(x, mt.tasks, mt.parent), Dt(null);
          return;
        }
        if (t.target.closest('[data-interactive]')) return;
        const h = Zt(t.target);
        if (h) {
          const x = t.target.classList;
          if (x.contains('wx-link')) {
            const f = x.contains('wx-left');
            if (!G) {
              const $ = { id: h, start: f };
              wt($), (xt.current = $);
              return;
            }
            G.id !== h &&
              !de(h, f) &&
              p.exec('add-link', {
                link: {
                  source: G.id,
                  target: h,
                  type: ee(G.start, f),
                },
              }),
              wt(null),
              (xt.current = null);
          } else if (x.contains('wx-delete-button-icon'))
            p.exec('delete-link', { id: rt }), Mt(null);
          else {
            let f;
            const $ = Vt(t, 'data-segment');
            $ && (f = $.dataset.segment * 1),
              p.exec('select-task', {
                id: h,
                toggle: t.ctrlKey || t.metaKey,
                range: t.shiftKey,
                segmentIndex: f,
              });
          }
        }
        Le();
      },
      [p, G, Q, Pt, de, ee, Le],
    ),
    mn = B((t) => {
      const h = {
        left: `${t.$x}px`,
        top: `${t.$y}px`,
        width: `${t.$w}px`,
        height: `${t.$h}px`,
      };
      return t.color && (h.backgroundColor = t.color), h;
    }, []),
    gn = B(
      (t) => ({
        left: `${t.$x_base}px`,
        top: `${t.$y_base}px`,
        width: `${t.$w_base}px`,
        height: `${t.$h_base}px`,
      }),
      [],
    ),
    pn = B(
      (t) => {
        if (Ct || y.current) return t.preventDefault(), !1;
      },
      [Ct],
    ),
    Ne = I(() => D.map((t) => t.id), [D]),
    Ie = B(
      (t) => {
        let h = Ne.includes(t) ? t : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(t) || (h = `task ${h}`), h
        );
      },
      [Ne],
    ),
    Se = B(
      (t) => {
        p.exec(t.action, t.data);
      },
      [p],
    ),
    ke = B((t) => ct && ht.byId(t).$critical, [ct, ht]),
    He = B(
      (t) => {
        if (C?.auto) {
          const h = ht.getSummaryId(t, !0),
            x = ht.getSummaryId(G.id, !0);
          return (
            G?.id &&
            !(Array.isArray(h) ? h : [h]).includes(G.id) &&
            !(Array.isArray(x) ? x : [x]).includes(t)
          );
        }
        return G;
      },
      [C, ht, G],
    );
  return /* @__PURE__ */ At('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: {
      lineHeight: `${k.length ? k[0].$h : 0}px`,
    },
    ref: Z,
    onContextMenu: pn,
    onMouseDown: on,
    onMouseMove: an,
    onTouchStart: cn,
    onTouchMove: un,
    onTouchEnd: dn,
    onClick: hn,
    onDoubleClick: fn,
    onDragStart: (t) => (t.preventDefault(), !1),
    children: [
      /* @__PURE__ */ u(nr, {
        onSelectLink: ve,
        selectedLink: Pt,
        readonly: r,
        linkShape: l,
        linkGradient: v,
        linkStyle: E,
        linkBundling: P,
        multiTaskRows: o,
        taskPositions: T,
        cellHeight: g,
      }),
      G &&
        dt &&
        (() => {
          const t = p.getTask(G.id);
          if (!t) return null;
          const h = G.start ? t.$x : t.$x + t.$w,
            x = t.$y + (t.$h || g) / 2;
          return /* @__PURE__ */ At('svg', {
            className: 'wx-link-preview',
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 5,
            },
            children: [
              /* @__PURE__ */ u('line', {
                x1: h,
                y1: x,
                x2: dt.x,
                y2: dt.y,
                stroke: 'var(--wx-gantt-link-color)',
                strokeWidth: 2,
                strokeDasharray: '6 3',
              }),
              /* @__PURE__ */ u('circle', {
                cx: dt.x,
                cy: dt.y,
                r: 4,
                fill: 'var(--wx-gantt-link-color)',
              }),
            ],
          });
        })(),
      k.map((t) => {
        if (t.$skip && t.$skip_baseline) return null;
        const h = lt.has(t.id),
          x =
            `wx-bar wx-${Ie(t.type)}` +
            (Ct && Lt && t.id === Lt.id ? ' wx-touch' : '') +
            (G && G.id === t.id ? ' wx-selected' : '') +
            (ke(t.id) ? ' wx-critical' : '') +
            (t.$reorder ? ' wx-reorder-task' : '') +
            (H && t.segments ? ' wx-split' : '') +
            (h ? ' wx-collision' : ''),
          f =
            'wx-link wx-left' +
            (G ? ' wx-visible' : '') +
            (!G || (!de(t.id, !0) && He(t.id)) ? ' wx-target' : '') +
            (G && G.id === t.id && G.start ? ' wx-selected' : '') +
            (ke(t.id) ? ' wx-critical' : ''),
          $ =
            'wx-link wx-right' +
            (G ? ' wx-visible' : '') +
            (!G || (!de(t.id, !1) && He(t.id)) ? ' wx-target' : '') +
            (G && G.id === t.id && !G.start ? ' wx-selected' : '') +
            (ke(t.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ At(
          pe,
          {
            children: [
              !t.$skip &&
                /* @__PURE__ */ At('div', {
                  className: 'wx-GKbcLEGA ' + x,
                  style: mn(t),
                  'data-tooltip-id': t.id,
                  'data-id': t.id,
                  tabIndex: Rt === t.id ? 0 : -1,
                  children: [
                    r
                      ? null
                      : t.id === Pt?.target && Pt?.type[2] === 's'
                        ? /* @__PURE__ */ u(Pe, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ u('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ u('div', {
                            className: 'wx-GKbcLEGA ' + f,
                            children: /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    t.type !== 'milestone'
                      ? /* @__PURE__ */ At(oe, {
                          children: [
                            K && t.progress && !(H && t.segments)
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ u('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${t.progress}%` },
                                  }),
                                })
                              : null,
                            K &&
                            !r &&
                            !(H && t.segments) &&
                            !(t.type == 'summary' && U?.autoProgress)
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${t.progress}% - 10px)`,
                                  },
                                  children: t.progress,
                                })
                              : null,
                            n
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ u(n, {
                                    data: t,
                                    api: p,
                                    onAction: Se,
                                  }),
                                })
                              : H && t.segments
                                ? /* @__PURE__ */ u(rr, {
                                    task: t,
                                    type: Ie(t.type),
                                  })
                                : /* @__PURE__ */ u('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: t.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ At(oe, {
                          children: [
                            /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            n
                              ? /* @__PURE__ */ u(n, {
                                  data: t,
                                  api: p,
                                  onAction: Se,
                                })
                              : /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: t.text,
                                }),
                          ],
                        }),
                    r
                      ? null
                      : t.id === Pt?.target && Pt?.type[2] === 'e'
                        ? /* @__PURE__ */ u(Pe, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ u('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ u('div', {
                            className: 'wx-GKbcLEGA ' + $,
                            children: /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    h &&
                      /* @__PURE__ */ u('div', {
                        className: 'wx-GKbcLEGA wx-collision-warning',
                        title:
                          'This task overlaps with another task in the same row',
                        children: '!',
                      }),
                    it &&
                      t.type === 'summary' &&
                      (() => {
                        const z = it.get(t.id),
                          q = Math.floor(t.$x / b),
                          S = Math.ceil((t.$x + t.$w) / b);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: S - q }, (ut, ft) => {
                            const Wt = q + ft,
                              Et = z?.get(Wt) || 0;
                            return /* @__PURE__ */ u(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${Et === 0 ? ' wx-week-count-zero' : ''}`,
                                style: {
                                  position: 'absolute',
                                  left: `${Wt * b - t.$x}px`,
                                  width: `${b}px`,
                                  top: 0,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: Et,
                              },
                              Wt,
                            );
                          }),
                        });
                      })(),
                  ],
                }),
              gt && !t.$skip_baseline
                ? /* @__PURE__ */ u('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (t.type === 'milestone' ? ' wx-milestone' : ''),
                    style: gn(t),
                  })
                : null,
            ],
          },
          t.id,
        );
      }),
      pt &&
        (() => {
          const t = Math.min(pt.startX, pt.currentX),
            h = Math.min(pt.startY, pt.currentY),
            x = Math.abs(pt.currentX - pt.startX),
            f = Math.abs(pt.currentY - pt.startY);
          return /* @__PURE__ */ u('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${t}px`,
              top: `${h}px`,
              width: `${x}px`,
              height: `${f}px`,
            },
          });
        })(),
      mt &&
        mt.currentX != null &&
        mt.tasks.map((t, h) => {
          const f =
              (Math.floor(mt.currentX / b) + (t._startCellOffset || 0)) * b,
            $ = t._originalWidth || b,
            z = t._originalHeight || g,
            q = le.get(t.row) ?? (t.$y || 0);
          return /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: f, top: q, width: $, height: z },
              children: /* @__PURE__ */ u('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: t.$barText || t.text,
              }),
            },
            `preview-${h}`,
          );
        }),
    ],
  });
}
function cr(e) {
  const { highlightTime: r, onScaleClick: n } = e,
    o = Yt(jt),
    s = J(o, '_scales');
  return /* @__PURE__ */ u('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: s.width },
    children: (s?.rows || []).map((i, a) =>
      /* @__PURE__ */ u(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${i.height}px` },
          children: (i.cells || []).map((m, d) => {
            const w = r ? r(m.date, m.unit) : '',
              l = 'wx-cell ' + (m.css || '') + ' ' + (w || '');
            return /* @__PURE__ */ u(
              'div',
              {
                className: 'wx-ZkvhDKir ' + l,
                style: {
                  width: `${m.width}px`,
                  cursor: n ? 'pointer' : void 0,
                },
                onClick: n ? (v) => n(m.date, m.unit, v.nativeEvent) : void 0,
                children: m.value,
              },
              d,
            );
          }),
        },
        a,
      ),
    ),
  });
}
const lr = /* @__PURE__ */ new Map();
function ar(e) {
  const r = st(null),
    n = st(0),
    o = st(null),
    s = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  r.current === null && (r.current = performance.now()),
    n.current++,
    at(() => {
      if (s)
        return (
          cancelAnimationFrame(o.current),
          (o.current = requestAnimationFrame(() => {
            const i = {
              label: e,
              time: performance.now() - r.current,
              renders: n.current,
              timestamp: Date.now(),
            };
            lr.set(e, i),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: i }),
              );
          })),
          () => cancelAnimationFrame(o.current)
        );
    });
}
function ur(e) {
  const {
      readonly: r,
      fullWidth: n,
      fullHeight: o,
      taskTemplate: s,
      cellBorders: i,
      highlightTime: a,
      onScaleClick: m,
      multiTaskRows: d = !1,
      rowMapping: w = null,
      rowHeightOverrides: l = null,
      allowTaskIntersection: v = !0,
      summaryBarCounts: E = !1,
      marqueeSelect: P = !1,
      copyPaste: K = !1,
      linkShape: p,
      linkGradient: N = !1,
      linkStyle: M,
      linkBundling: W = !1,
      showProgress: Q = !0,
    } = e,
    X = Yt(jt),
    [j, D] = ie(X, '_selected'),
    gt = J(X, 'scrollTop'),
    et = J(X, 'cellHeight'),
    yt = J(X, 'cellWidth'),
    ct = J(X, '_scales'),
    ht = J(X, '_markers'),
    C = J(X, '_scrollTask'),
    H = J(X, 'zoom'),
    [U, V] = bt(),
    g = st(null),
    k = J(X, '_tasks'),
    T = 1 + (ct?.rows?.length || 0),
    { taskYPositions: b, rowHeightMap: A } = I(() => {
      if (!d || !w || !k?.length)
        return { taskYPositions: null, rowHeightMap: null };
      const L = /* @__PURE__ */ new Map(),
        F = /* @__PURE__ */ new Map(),
        G = [];
      k.forEach((nt) => {
        const R = w.taskRows.get(nt.id) ?? nt.id;
        G.includes(R) || G.push(R);
      });
      const wt = /* @__PURE__ */ new Map();
      let xt = 0;
      for (const nt of G) {
        wt.set(nt, xt);
        const R = (l && l[nt]) || et;
        F.set(nt, R), (xt += R);
      }
      return (
        k.forEach((nt) => {
          const R = w.taskRows.get(nt.id) ?? nt.id;
          L.set(nt.id, wt.get(R) ?? 0);
        }),
        { taskYPositions: L, rowHeightMap: F }
      );
    }, [k, d, w, et, l]),
    lt = I(() => {
      const L = [];
      return (
        j &&
          j.length &&
          et &&
          j.forEach((F) => {
            const G = b?.get(F.id) ?? F.$y;
            let wt = et;
            if (A && w) {
              const xt = w.taskRows.get(F.id) ?? F.id;
              wt = A.get(xt) ?? et;
            }
            L.push({ height: `${wt}px`, top: `${G - 3}px` });
          }),
        L
      );
    }, [D, et, b, A, w]),
    it = I(() => Math.max(U || 0, o), [U, o]),
    pt = I(() => {
      if (
        !l ||
        !d ||
        !w ||
        !k?.length ||
        !Object.values(l).some((G) => G !== et)
      )
        return null;
      const F = [];
      return (
        k.forEach((G) => {
          const wt = w.taskRows.get(G.id) ?? G.id;
          F.includes(wt) || F.push(wt);
        }),
        F.map((G) => ({
          id: G,
          height: l[G] || et,
        }))
      );
    }, [k, w, l, d, et]);
  at(() => {
    const L = g.current;
    L && typeof gt == 'number' && (L.scrollTop = d ? 0 : gt);
  }, [gt, d]);
  const Nt = () => {
    kt();
  };
  function kt(L) {
    const F = g.current;
    if (!F) return;
    const G = {};
    (G.left = F.scrollLeft), X.exec('scroll-chart', G);
  }
  function $t() {
    const L = g.current,
      G = Math.ceil((U || 0) / (et || 1)) + 1,
      wt = Math.floor(((L && L.scrollTop) || 0) / (et || 1)),
      xt = Math.max(0, wt - T),
      nt = wt + G + T,
      R = xt * (et || 0);
    X.exec('render-data', {
      start: xt,
      end: nt,
      from: R,
    });
  }
  at(() => {
    $t();
  }, [U, gt]);
  const Tt = B(
    (L) => {
      if (!L) return;
      const { id: F, mode: G } = L;
      if (G.toString().indexOf('x') < 0) return;
      const wt = g.current;
      if (!wt) return;
      const { clientWidth: xt } = wt,
        nt = X.getTask(F);
      if (nt.$x + nt.$w < wt.scrollLeft)
        X.exec('scroll-chart', { left: nt.$x - (yt || 0) }),
          (wt.scrollLeft = nt.$x - (yt || 0));
      else if (nt.$x >= xt + wt.scrollLeft) {
        const R = xt < nt.$w ? yt || 0 : nt.$w;
        X.exec('scroll-chart', { left: nt.$x - xt + R }),
          (wt.scrollLeft = nt.$x - xt + R);
      }
    },
    [X, yt],
  );
  at(() => {
    Tt(C);
  }, [C]);
  function mt(L) {
    if (H && (L.ctrlKey || L.metaKey)) {
      L.preventDefault();
      const F = g.current,
        G = -Math.sign(L.deltaY),
        wt = L.clientX - (F ? F.getBoundingClientRect().left : 0);
      X.exec('zoom-scale', {
        dir: G,
        offset: wt,
      });
    }
  }
  function Dt(L) {
    const F = a(L.date, L.unit);
    return F
      ? {
          css: F,
          width: L.width,
        }
      : null;
  }
  const Gt = I(
      () =>
        ct && (ct.minUnit === 'hour' || ct.minUnit === 'day') && a
          ? ct.rows[ct.rows.length - 1].cells.map(Dt)
          : null,
      [ct, a],
    ),
    zt = B(
      (L) => {
        (L.eventSource = 'chart'), X.exec('hotkey', L);
      },
      [X],
    );
  at(() => {
    const L = g.current;
    if (!L) return;
    const F = () => V(L.clientHeight);
    F();
    const G = new ResizeObserver(() => F());
    return (
      G.observe(L),
      () => {
        G.disconnect();
      }
    );
  }, [g.current]);
  const It = st(null);
  return (
    at(() => {
      const L = g.current;
      if (L && !It.current)
        return (
          (It.current = en(L, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (F) => zt(F),
          })),
          () => {
            It.current?.destroy(), (It.current = null);
          }
        );
    }, []),
    at(() => {
      const L = g.current;
      if (!L) return;
      const F = mt;
      return (
        L.addEventListener('wheel', F),
        () => {
          L.removeEventListener('wheel', F);
        }
      );
    }, [mt]),
    ar('chart'),
    /* @__PURE__ */ At('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: g,
      onScroll: Nt,
      children: [
        /* @__PURE__ */ u(cr, {
          highlightTime: a,
          onScaleClick: m,
          scales: ct,
        }),
        ht && ht.length
          ? /* @__PURE__ */ u('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${it}px` },
              children: ht.map((L, F) =>
                /* @__PURE__ */ u(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${L.css || ''}`,
                    style: { left: `${L.left}px` },
                    children: /* @__PURE__ */ u('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: L.text,
                    }),
                  },
                  F,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ At('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${n}px`, height: `${it}px` },
          children: [
            Gt
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: Gt.map((L, F) =>
                    L
                      ? /* @__PURE__ */ u(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + L.css,
                            style: {
                              width: `${L.width}px`,
                              left: `${F * L.width}px`,
                            },
                          },
                          F,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ u(qn, { borders: i, rowLayout: pt }),
            j && j.length
              ? j.map((L, F) =>
                  L.$y
                    ? /* @__PURE__ */ u(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': L.id,
                          style: lt[F],
                        },
                        L.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ u(ir, {
              readonly: r,
              taskTemplate: s,
              multiTaskRows: d,
              rowMapping: w,
              rowHeightOverrides: l,
              allowTaskIntersection: v,
              summaryBarCounts: E,
              marqueeSelect: P,
              copyPaste: K,
              linkShape: p,
              linkGradient: N,
              linkStyle: M,
              linkBundling: W,
              showProgress: Q,
            }),
          ],
        }),
      ],
    })
  );
}
function dr(e) {
  const {
      position: r = 'after',
      size: n = 4,
      dir: o = 'x',
      onMove: s,
      onDisplayChange: i,
      compactMode: a,
      containerWidth: m = 0,
      leftThreshold: d = 50,
      rightThreshold: w = 50,
    } = e,
    [l, v] = Re(e.value ?? 0),
    [E, P] = Re(e.display ?? 'all');
  function K(T) {
    let b = 0;
    r == 'center' ? (b = n / 2) : r == 'before' && (b = n);
    const A = {
      size: [n + 'px', 'auto'],
      p: [T - b + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (o != 'x') for (let lt in A) A[lt] = A[lt].reverse();
    return A;
  }
  const [p, N] = bt(!1),
    [M, W] = bt(null),
    Q = st(0),
    X = st(),
    j = st(),
    D = st(E);
  at(() => {
    D.current = E;
  }, [E]),
    at(() => {
      M === null && l > 0 && W(l);
    }, [M, l]);
  function gt(T) {
    return o == 'x' ? T.clientX : T.clientY;
  }
  const et = B(
      (T) => {
        const b = X.current + gt(T) - Q.current;
        v(b);
        let A;
        b <= d ? (A = 'chart') : m - b <= w ? (A = 'grid') : (A = 'all'),
          D.current !== A && (P(A), (D.current = A)),
          j.current && clearTimeout(j.current),
          (j.current = setTimeout(() => s && s(b), 100));
      },
      [m, d, w, s],
    ),
    yt = B(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        N(!1),
        window.removeEventListener('mousemove', et),
        window.removeEventListener('mouseup', yt);
    }, [et]),
    ct = I(
      () => (E !== 'all' ? 'auto' : o == 'x' ? 'ew-resize' : 'ns-resize'),
      [E, o],
    ),
    ht = B(
      (T) => {
        (!a && (E === 'grid' || E === 'chart')) ||
          ((Q.current = gt(T)),
          (X.current = l),
          N(!0),
          (document.body.style.cursor = ct),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', et),
          window.addEventListener('mouseup', yt));
      },
      [ct, et, yt, l, a, E],
    );
  function C() {
    P('all'), M !== null && (v(M), s && s(M));
  }
  function H(T) {
    if (a) {
      const b = E === 'chart' ? 'grid' : 'chart';
      P(b), i(b);
    } else if (E === 'grid' || E === 'chart') C(), i('all');
    else {
      const b = T === 'left' ? 'chart' : 'grid';
      P(b), i(b);
    }
  }
  function U() {
    H('left');
  }
  function V() {
    H('right');
  }
  const g = I(() => K(l), [l, r, n, o]),
    k = [
      'wx-resizer',
      `wx-resizer-${o}`,
      `wx-resizer-display-${E}`,
      p ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ At('div', {
    className: 'wx-pFykzMlT ' + k,
    onMouseDown: ht,
    style: { width: g.size[0], height: g.size[1], cursor: ct },
    children: [
      /* @__PURE__ */ At('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: U,
            }),
          }),
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: V,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ u('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const fr = 650;
function nn(e) {
  let r;
  function n() {
    (r = new ResizeObserver((s) => {
      for (let i of s)
        if (i.target === document.body) {
          let a = i.contentRect.width <= fr;
          e(a);
        }
    })),
      r.observe(document.body);
  }
  function o() {
    r && (r.disconnect(), (r = null));
  }
  return {
    observe: n,
    disconnect: o,
  };
}
const hr = (e, r, n, o) => e < o && r > n;
function Ce(e) {
  const r = e.start instanceof Date ? e.start.getTime() : 0;
  if (!r) return null;
  let n;
  return (
    e.end instanceof Date
      ? (n = e.end.getTime())
      : typeof e.duration == 'number' && e.duration > 0
        ? (n = r + e.duration * 864e5)
        : (n = r),
    { start: r, end: n }
  );
}
function mr(e, r) {
  const n = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Map(),
    s = /* @__PURE__ */ new Map();
  return (
    e.forEach((i) => {
      if (i.type === 'summary') return;
      const a = r.taskRows.get(i.id) ?? i.id;
      s.has(a) || s.set(a, []), s.get(a).push(i);
    }),
    s.forEach((i, a) => {
      const m = [],
        d = [...i].sort((w, l) => {
          const v = Ce(w),
            E = Ce(l);
          return (v?.start ?? 0) - (E?.start ?? 0);
        });
      for (const w of d) {
        const l = Ce(w);
        if (!l) {
          n.set(w.id, 0);
          continue;
        }
        let v = !1;
        for (let E = 0; E < m.length; E++)
          if (!m[E].some((K) => hr(l.start, l.end, K.start, K.end))) {
            m[E].push(l), n.set(w.id, E), (v = !0);
            break;
          }
        v || (m.push([l]), n.set(w.id, m.length - 1));
      }
      o.set(a, m.length);
    }),
    { taskLane: n, rowLaneCounts: o }
  );
}
function gr(e, r, n) {
  const o = {};
  return (
    e.forEach((a, m) => {
      if (a <= 1) return;
      const d = 6 + a * n + (a - 1) * 4;
      d > r && (o[m] = d);
    }),
    o
  );
}
function pr(e, r) {
  if (!e && !r) return null;
  const n = {};
  let o = !1;
  if (e) for (const [s, i] of Object.entries(e)) (n[s] = i), (o = !0);
  if (r)
    for (const [s, i] of Object.entries(r))
      n[s] !== void 0 ? (n[s] = Math.max(n[s], i)) : (n[s] = i), (o = !0);
  return o ? n : null;
}
function wr(e) {
  const {
      taskTemplate: r,
      readonly: n,
      cellBorders: o,
      highlightTime: s,
      onScaleClick: i,
      onTableAPIChange: a,
      multiTaskRows: m = !1,
      rowMapping: d = null,
      rowHeightOverrides: w = null,
      allowTaskIntersection: l = !0,
      summaryBarCounts: v = !1,
      marqueeSelect: E = !1,
      copyPaste: P = !1,
      linkShape: K,
      linkGradient: p = !1,
      linkStyle: N,
      linkBundling: M = !1,
      showProgress: W = !0,
    } = e,
    Q = Yt(jt),
    X = J(Q, '_tasks'),
    j = J(Q, '_scales'),
    D = J(Q, 'cellHeight'),
    gt = J(Q, 'columns'),
    et = J(Q, '_scrollTask'),
    yt = J(Q, 'undo'),
    ct = I(() => {
      if (!m) return d;
      const Y = /* @__PURE__ */ new Map(),
        rt = /* @__PURE__ */ new Map();
      return (
        X.forEach((Mt) => {
          const Pt = Mt.row ?? Mt.id;
          rt.set(Mt.id, Pt), Y.has(Pt) || Y.set(Pt, []), Y.get(Pt).push(Mt.id);
        }),
        { rowMap: Y, taskRows: rt }
      );
    }, [X, m, d]),
    ht = I(() => {
      if (!m || !ct || !X?.length) return w;
      const { rowLaneCounts: Y } = mr(X, ct),
        rt = D - 6,
        Mt = gr(Y, D, rt);
      return pr(Mt, w);
    }, [X, m, ct, D, w]),
    [C, H] = bt(!1);
  let [U, V] = bt(0);
  const [g, k] = bt(0),
    [T, b] = bt(0),
    [A, lt] = bt(void 0),
    [it, pt] = bt('all'),
    Nt = st(null),
    kt = B(
      (Y) => {
        H(
          (rt) => (
            Y !== rt &&
              (Y
                ? ((Nt.current = it), it === 'all' && pt('grid'))
                : (!Nt.current || Nt.current === 'all') && pt('all')),
            Y
          ),
        );
      },
      [it],
    );
  at(() => {
    const Y = nn(kt);
    return (
      Y.observe(),
      () => {
        Y.disconnect();
      }
    );
  }, [kt]);
  const $t = I(() => {
    let Y;
    return (
      gt.every((rt) => rt.width && !rt.flexgrow)
        ? (Y = gt.reduce((rt, Mt) => rt + parseInt(Mt.width), 0))
        : C && it === 'chart'
          ? (Y = parseInt(gt.find((rt) => rt.id === 'action')?.width) || 50)
          : (Y = 440),
      (U = Y),
      Y
    );
  }, [gt, C, it]);
  at(() => {
    V($t);
  }, [$t]);
  const Tt = I(() => (g ?? 0) - (A ?? 0), [g, A]),
    mt = I(() => j.width, [j]),
    Dt = 14,
    Gt = I(() => {
      let Y;
      if (!m || !ct) Y = X.length * D;
      else {
        const rt = [];
        X.forEach((Mt) => {
          const Pt = ct.taskRows.get(Mt.id) ?? Mt.id;
          rt.includes(Pt) || rt.push(Pt);
        }),
          (Y = 0);
        for (const Mt of rt) Y += (ht && ht[Mt]) || D;
      }
      return Y + Dt;
    }, [X, D, m, ct, ht]),
    zt = I(() => j.height + Gt + Tt, [j, Gt, Tt]),
    It = I(() => U + mt, [U, mt]),
    L = st(null),
    F = st(!1),
    G = st(null);
  at(() => {
    const Y = () => {
      (F.current = !0),
        clearTimeout(G.current),
        (G.current = setTimeout(() => {
          F.current = !1;
        }, 300));
    };
    return (
      Q.on('zoom-scale', Y),
      Q.on('set-scale', Y),
      () => {
        clearTimeout(G.current);
      }
    );
  }, [Q]);
  const wt = B(() => {
      Promise.resolve().then(() => {
        if (!F.current && (g ?? 0) > (It ?? 0)) {
          const Y = (g ?? 0) - U;
          Q.exec('expand-scale', { minWidth: Y });
        }
      });
    }, [g, It, U, Q]),
    xt = st(wt);
  (xt.current = wt),
    at(() => {
      let Y;
      return (
        L.current &&
          ((Y = new ResizeObserver(() => xt.current())), Y.observe(L.current)),
        () => {
          Y && Y.disconnect();
        }
      );
    }, [L.current]);
  const nt = st(null),
    R = st(null),
    vt = B(() => {
      const Y = nt.current;
      Y &&
        Q.exec('scroll-chart', {
          top: Y.scrollTop,
        });
    }, [Q]),
    dt = st({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  at(() => {
    dt.current = {
      rTasks: X,
      rScales: j,
      rCellHeight: D,
      scrollSize: Tt,
      ganttDiv: nt.current,
      ganttHeight: T ?? 0,
    };
  }, [X, j, D, Tt, T]);
  const tt = B(
    (Y) => {
      if (!Y) return;
      const {
        rTasks: rt,
        rScales: Mt,
        rCellHeight: Pt,
        scrollSize: Ct,
        ganttDiv: c,
        ganttHeight: y,
      } = dt.current;
      if (!c) return;
      const { id: _ } = Y,
        O = rt.findIndex((Z) => Z.id === _);
      if (O > -1) {
        const Z = y - Mt.height,
          ot = O * Pt,
          Rt = c.scrollTop;
        let Ht = null;
        ot < Rt ? (Ht = ot) : ot + Pt > Rt + Z && (Ht = ot - Z + Pt + Ct),
          Ht !== null &&
            (Q.exec('scroll-chart', { top: Math.max(Ht, 0) }),
            (nt.current.scrollTop = Math.max(Ht, 0)));
      }
    },
    [Q],
  );
  at(() => {
    tt(et);
  }, [et]),
    at(() => {
      const Y = nt.current,
        rt = R.current;
      if (!Y || !rt) return;
      const Mt = () => {
          Yn(() => {
            b(Y.offsetHeight), k(Y.offsetWidth), lt(rt.offsetWidth);
          });
        },
        Pt = new ResizeObserver(Mt);
      return Pt.observe(Y), () => Pt.disconnect();
    }, [nt.current]);
  const Lt = st(null),
    _t = st(null);
  return (
    at(() => {
      _t.current && (_t.current.destroy(), (_t.current = null));
      const Y = Lt.current;
      if (Y)
        return (
          (_t.current = en(Y, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': yt,
              'ctrl+y': yt,
            },
            exec: (rt) => {
              rt.isInput || Q.exec('hotkey', rt);
            },
          })),
          () => {
            _t.current?.destroy(), (_t.current = null);
          }
        );
    }, [yt]),
    /* @__PURE__ */ u('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: nt,
      onScroll: vt,
      children: /* @__PURE__ */ u('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: zt, width: '100%' },
        ref: R,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: T,
            width: A,
          },
          children: /* @__PURE__ */ At('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: Lt,
            children: [
              gt.length
                ? /* @__PURE__ */ At(oe, {
                    children: [
                      /* @__PURE__ */ u(Vn, {
                        display: it,
                        compactMode: C,
                        columnWidth: $t,
                        width: U,
                        readonly: n,
                        fullHeight: Gt,
                        onTableAPIChange: a,
                        multiTaskRows: m,
                        rowMapping: ct,
                        rowHeightOverrides: ht,
                      }),
                      /* @__PURE__ */ u(dr, {
                        value: U,
                        display: it,
                        compactMode: C,
                        containerWidth: g,
                        onMove: (Y) => V(Y),
                        onDisplayChange: (Y) => pt(Y),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ u('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: L,
                children: /* @__PURE__ */ u(ur, {
                  readonly: n,
                  fullWidth: mt,
                  fullHeight: Gt,
                  taskTemplate: r,
                  cellBorders: o,
                  highlightTime: s,
                  onScaleClick: i,
                  multiTaskRows: m,
                  rowMapping: ct,
                  rowHeightOverrides: ht,
                  allowTaskIntersection: l,
                  summaryBarCounts: v,
                  marqueeSelect: E,
                  copyPaste: P,
                  linkShape: K,
                  linkGradient: p,
                  linkStyle: N,
                  linkBundling: M,
                  showProgress: W,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function xr(e) {
  return {
    year: '%Y',
    quarter: `${e('Q')} %Q`,
    month: '%M',
    week: `${e('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function yr(e, r) {
  return typeof e == 'function' ? e : we(e, r);
}
function rn(e, r) {
  return e.map(({ format: n, ...o }) => ({
    ...o,
    format: yr(n, r),
  }));
}
function vr(e, r) {
  const n = xr(r);
  for (let o in n) n[o] = we(n[o], e);
  return n;
}
function br(e, r) {
  if (!e || !e.length) return e;
  const n = we('%d-%m-%Y', r);
  return e.map((o) =>
    o.template
      ? o
      : o.id === 'start' || o.id == 'end'
        ? {
            ...o,
            //store locale template for unscheduled tasks
            _template: (s) => n(s),
            template: (s) => n(s),
          }
        : o.id === 'duration'
          ? {
              ...o,
              _template: (s) => s,
              template: (s) => s,
            }
          : o,
  );
}
function kr(e, r) {
  return e.levels
    ? {
        ...e,
        levels: e.levels.map((n) => ({
          ...n,
          scales: rn(n.scales, r),
        })),
      }
    : e;
}
const $r = (e) =>
    e
      .split('-')
      .map((r) => (r ? r.charAt(0).toUpperCase() + r.slice(1) : ''))
      .join(''),
  Tr = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  Mr = [],
  Cr = [],
  Rr = [],
  Er = [],
  Dr = { type: 'forward' },
  qr = je(function (
    {
      taskTemplate: r = null,
      markers: n = Mr,
      taskTypes: o = zn,
      tasks: s = Cr,
      selected: i = Rr,
      activeTask: a = null,
      links: m = Er,
      scales: d = Tr,
      columns: w = An,
      start: l = null,
      end: v = null,
      lengthUnit: E = 'day',
      durationUnit: P = 'day',
      cellWidth: K = 100,
      cellHeight: p = 38,
      scaleHeight: N = 36,
      readonly: M = !1,
      cellBorders: W = 'full',
      zoom: Q = !1,
      baselines: X = !1,
      highlightTime: j = null,
      onScaleClick: D = null,
      init: gt = null,
      autoScale: et = !0,
      unscheduledTasks: yt = !1,
      criticalPath: ct = null,
      schedule: ht = Dr,
      projectStart: C = null,
      projectEnd: H = null,
      calendar: U = null,
      undo: V = !1,
      splitTasks: g = !1,
      multiTaskRows: k = !1,
      rowHeightOverrides: T = null,
      allowTaskIntersection: b = !0,
      summaryBarCounts: A = !1,
      marqueeSelect: lt = !1,
      copyPaste: it = !1,
      linkShape: pt,
      linkGradient: Nt = !1,
      linkStyle: kt,
      linkBundling: $t = !1,
      showProgress: Tt = !0,
      summary: mt = null,
      _export: Dt = !1,
      ...Gt
    },
    zt,
  ) {
    const It = st();
    It.current = Gt;
    const L = I(() => new Sn(Wn), []),
      F = I(() => ({ ...Ee, ...ye }), []),
      G = Yt(Ut.i18n),
      wt = I(() => (G ? G.extend(F, !0) : xe(F)), [G, F]),
      xt = I(() => wt.getRaw().calendar, [wt]),
      nt = I(() => {
        let Ct = {
          zoom: kr(Q, xt),
          scales: rn(d, xt),
          columns: br(w, xt),
          links: Hn(m),
          cellWidth: K,
        };
        return (
          Ct.zoom &&
            (Ct = {
              ...Ct,
              ...Pn(Ct.zoom, vr(xt, wt.getGroup('gantt')), Ct.scales, K),
            }),
          Ct
        );
      }, [Q, d, w, m, K, xt, wt]),
      R = st(null);
    R.current !== s &&
      (Dt || We(s, { durationUnit: P, splitTasks: g, calendar: U }),
      (R.current = s)),
      at(() => {
        Dt || We(s, { durationUnit: P, splitTasks: g, calendar: U });
      }, [s, P, U, g, Dt]);
    const vt = I(() => {
        if (!k) return null;
        const Ct = /* @__PURE__ */ new Map(),
          c = /* @__PURE__ */ new Map(),
          y = (_) => {
            _.forEach((O) => {
              const Z = O.row ?? O.id;
              c.set(O.id, Z),
                Ct.has(Z) || Ct.set(Z, []),
                Ct.get(Z).push(O.id),
                O.data && O.data.length > 0 && y(O.data);
            });
          };
        return y(s), { rowMap: Ct, taskRows: c };
      }, [s, k]),
      dt = I(() => L.in, [L]),
      tt = st(null);
    tt.current === null &&
      ((tt.current = new Dn((Ct, c) => {
        const y = 'on' + $r(Ct);
        It.current && It.current[y] && It.current[y](c);
      })),
      dt.setNext(tt.current));
    const [Lt, _t] = bt(null),
      Y = st(null);
    Y.current = Lt;
    const rt = I(
      () => ({
        getState: L.getState.bind(L),
        getReactiveState: L.getReactive.bind(L),
        getStores: () => ({ data: L }),
        exec: dt.exec.bind(dt),
        setNext: (Ct) => ((tt.current = tt.current.setNext(Ct)), tt.current),
        intercept: dt.intercept.bind(dt),
        on: dt.on.bind(dt),
        detach: dt.detach.bind(dt),
        getTask: L.getTask.bind(L),
        serialize: () => L.serialize(),
        getTable: (Ct) =>
          Ct
            ? new Promise((c) => setTimeout(() => c(Y.current), 1))
            : Y.current,
        getHistory: () => L.getHistory(),
      }),
      [L, dt],
    );
    at(() => {
      const Ct = () => {
        const { zoom: c, scales: y } = rt.getState(),
          O = c?.levels?.[c.level]?.scales?.[0]?.unit ?? y?.[0]?.unit;
        O && rt.exec('scale-change', { level: c?.level, unit: O });
      };
      rt.on('zoom-scale', Ct), rt.on('set-scale', Ct);
    }, [rt]),
      at(() => {
        rt.intercept('set-scale', ({ unit: Ct, date: c }) => {
          const { zoom: y } = rt.getState();
          if (!y || !y.levels) return !1;
          const _ = y.levels.findIndex((ot) =>
            ot.scales.some((Rt) => Rt.unit === Ct),
          );
          if (_ < 0) return !1;
          const O = y.levels[_];
          if (_ !== y.level) {
            const ot = Math.round((O.minCellWidth + O.maxCellWidth) / 2);
            rt.getStores().data.setState({
              scales: O.scales,
              cellWidth: ot,
              _cellWidth: ot,
              zoom: { ...y, level: _ },
              ...(c ? { _scaleDate: c, _zoomOffset: 0 } : {}),
            });
          } else if (c) {
            const { _scales: ot, cellWidth: Rt } = rt.getState(),
              Ht = ot.diff(c, ot.start, ot.lengthUnit),
              Xt = Math.max(0, Math.round(Ht * Rt));
            rt.exec('scroll-chart', { left: Xt });
          }
          return !1;
        });
      }, [rt]),
      Qe(
        zt,
        () => ({
          ...rt,
        }),
        [rt],
      );
    const Mt = st(0);
    at(() => {
      Mt.current
        ? L.init({
            tasks: s,
            links: nt.links,
            start: l,
            columns: nt.columns,
            end: v,
            lengthUnit: E,
            cellWidth: nt.cellWidth,
            cellHeight: p,
            scaleHeight: N,
            scales: nt.scales,
            taskTypes: o,
            zoom: nt.zoom,
            selected: i,
            activeTask: a,
            baselines: X,
            autoScale: et,
            unscheduledTasks: yt,
            markers: n,
            durationUnit: P,
            criticalPath: ct,
            schedule: ht,
            projectStart: C,
            projectEnd: H,
            calendar: U,
            undo: V,
            _weekStart: xt.weekStart,
            splitTasks: g,
            summary: mt,
          })
        : gt && gt(rt),
        Mt.current++;
    }, [
      rt,
      gt,
      s,
      nt,
      l,
      v,
      E,
      p,
      N,
      o,
      i,
      a,
      X,
      et,
      yt,
      n,
      P,
      ct,
      ht,
      C,
      H,
      U,
      V,
      xt,
      g,
      mt,
      L,
    ]),
      Mt.current === 0 &&
        L.init({
          tasks: s,
          links: nt.links,
          start: l,
          columns: nt.columns,
          end: v,
          lengthUnit: E,
          cellWidth: nt.cellWidth,
          cellHeight: p,
          scaleHeight: N,
          scales: nt.scales,
          taskTypes: o,
          zoom: nt.zoom,
          selected: i,
          activeTask: a,
          baselines: X,
          autoScale: et,
          unscheduledTasks: yt,
          markers: n,
          durationUnit: P,
          criticalPath: ct,
          schedule: ht,
          projectStart: C,
          projectEnd: H,
          calendar: U,
          undo: V,
          _weekStart: xt.weekStart,
          splitTasks: g,
          summary: mt,
        });
    const Pt = I(
      () =>
        U
          ? (Ct, c) =>
              (c == 'day' && !U.getDayHours(Ct)) ||
              (c == 'hour' && !U.getDayHours(Ct))
                ? 'wx-weekend'
                : ''
          : j,
      [U, j],
    );
    return /* @__PURE__ */ u(Ut.i18n.Provider, {
      value: wt,
      children: /* @__PURE__ */ u(jt.Provider, {
        value: rt,
        children: /* @__PURE__ */ u(wr, {
          taskTemplate: r,
          readonly: M,
          cellBorders: W,
          highlightTime: Pt,
          onScaleClick: D,
          onTableAPIChange: _t,
          multiTaskRows: k,
          rowMapping: vt,
          rowHeightOverrides: T,
          allowTaskIntersection: b,
          summaryBarCounts: A,
          marqueeSelect: lt,
          copyPaste: it,
          linkShape: pt,
          linkGradient: Nt,
          linkStyle: kt,
          linkBundling: $t,
          showProgress: Tt,
        }),
      }),
    });
  });
function jr({ api: e = null, items: r = [] }) {
  const n = Yt(Ut.i18n),
    o = I(() => n || xe(ye), [n]),
    s = I(() => o.getGroup('gantt'), [o]),
    i = qt(e, '_selected'),
    a = qt(e, 'undo'),
    m = qt(e, 'history'),
    d = qt(e, 'splitTasks'),
    w = ['undo', 'redo'],
    l = I(() => {
      const E = Ge({ undo: !0, splitTasks: !0 });
      return (
        r.length
          ? r
          : Ge({
              undo: a,
              splitTasks: d,
            })
      ).map((K) => {
        let p = { ...K, disabled: !1 };
        return (
          (p.handler = tn(E, p.id) ? (N) => Je(e, N.id, null, s) : p.handler),
          p.text && (p.text = s(p.text)),
          p.menuText && (p.menuText = s(p.menuText)),
          p
        );
      });
    }, [r, e, s, a, d]),
    v = I(() => {
      const E = [];
      return (
        l.forEach((P) => {
          const K = P.id;
          if (K === 'add-task') E.push(P);
          else if (w.includes(K))
            w.includes(K) &&
              E.push({
                ...P,
                disabled: P.isDisabled(m),
              });
          else {
            if (!i?.length || !e) return;
            E.push({
              ...P,
              disabled:
                P.isDisabled && i.some((p) => P.isDisabled(p, e.getState())),
            });
          }
        }),
        E.filter((P, K) => {
          if (e && P.isHidden)
            return !i.some((p) => P.isHidden(p, e.getState()));
          if (P.comp === 'separator') {
            const p = E[K + 1];
            if (!p || p.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [e, i, m, l]);
  return n
    ? /* @__PURE__ */ u(Ye, { items: v })
    : /* @__PURE__ */ u(Ut.i18n.Provider, {
        value: o,
        children: /* @__PURE__ */ u(Ye, { items: v }),
      });
}
const Qr = je(function (
  {
    options: r = [],
    api: n = null,
    resolver: o = null,
    filter: s = null,
    at: i = 'point',
    children: a,
    onClick: m,
    css: d,
  },
  w,
) {
  const l = st(null),
    v = st(null),
    E = Yt(Ut.i18n),
    P = I(() => E || xe({ ...ye, ...Ee }), [E]),
    K = I(() => P.getGroup('gantt'), [P]),
    p = qt(n, 'taskTypes'),
    N = qt(n, 'selected'),
    M = qt(n, '_selected'),
    W = qt(n, 'splitTasks'),
    Q = qt(n, 'summary'),
    X = I(
      () => ({
        splitTasks: W,
        taskTypes: p,
        summary: Q,
      }),
      [W, p, Q],
    ),
    j = I(() => Oe(X), [X]);
  at(() => {
    n &&
      (n.on('scroll-chart', () => {
        l.current && l.current.show && l.current.show();
      }),
      n.on('drag-task', () => {
        l.current && l.current.show && l.current.show();
      }));
  }, [n]);
  function D(V) {
    return V.map(
      (g) => (
        (g = { ...g }),
        g.text && (g.text = K(g.text)),
        g.subtext && (g.subtext = K(g.subtext)),
        g.data && (g.data = D(g.data)),
        g
      ),
    );
  }
  function gt() {
    const V = r.length ? r : Oe(X);
    return D(V);
  }
  const et = I(() => gt(), [n, r, X, K]),
    yt = I(() => (M && M.length ? M : []), [M]),
    ct = B(
      (V, g) => {
        let k = V ? n?.getTask(V) : null;
        if (o) {
          const T = o(V, g);
          k = T === !0 ? k : T;
        }
        if (k) {
          const T = Zt(g.target, 'data-segment');
          T !== null
            ? (v.current = { id: k.id, segmentIndex: T })
            : (v.current = k.id),
            (!Array.isArray(N) || !N.includes(k.id)) &&
              n &&
              n.exec &&
              n.exec('select-task', { id: k.id });
        }
        return k;
      },
      [n, o, N],
    ),
    ht = B(
      (V) => {
        const g = V.action;
        g && (tn(j, g.id) && Je(n, g.id, v.current, K), m && m(V));
      },
      [n, K, m, j],
    ),
    C = B(
      (V, g) => {
        const k = yt.length ? yt : g ? [g] : [];
        let T = s ? k.every((b) => s(V, b)) : !0;
        if (
          T &&
          (V.isHidden &&
            (T = !k.some((b) => V.isHidden(b, n.getState(), v.current))),
          V.isDisabled)
        ) {
          const b = k.some((A) => V.isDisabled(A, n.getState(), v.current));
          V.disabled = b;
        }
        return T;
      },
      [s, yt, n],
    );
  Qe(w, () => ({
    show: (V, g) => {
      l.current && l.current.show && l.current.show(V, g);
    },
  }));
  const H = B((V) => {
      l.current && l.current.show && l.current.show(V);
    }, []),
    U = /* @__PURE__ */ At(oe, {
      children: [
        /* @__PURE__ */ u(Xn, {
          filter: C,
          options: et,
          dataKey: 'id',
          resolver: ct,
          onClick: ht,
          at: i,
          ref: l,
          css: d,
        }),
        /* @__PURE__ */ u('span', {
          onContextMenu: H,
          'data-menu-ignore': 'true',
          children: typeof a == 'function' ? a() : a,
        }),
      ],
    });
  if (!E && Ut.i18n?.Provider) {
    const V = Ut.i18n.Provider;
    return /* @__PURE__ */ u(V, { value: P, children: U });
  }
  return U;
});
function Lr({ api: e, autoSave: r, onLinksChange: n }) {
  const s = Yt(Ut.i18n).getGroup('gantt'),
    i = J(e, 'activeTask'),
    a = J(e, '_activeTask'),
    m = J(e, '_links'),
    d = J(e, 'schedule'),
    w = J(e, 'unscheduledTasks'),
    [l, v] = bt();
  function E() {
    if (i) {
      const N = m
          .filter((W) => W.target == i)
          .map((W) => ({ link: W, task: e.getTask(W.source) })),
        M = m
          .filter((W) => W.source == i)
          .map((W) => ({ link: W, task: e.getTask(W.target) }));
      return [
        { title: s('Predecessors'), data: N },
        { title: s('Successors'), data: M },
      ];
    }
  }
  at(() => {
    v(E());
  }, [i, m]);
  const P = I(
    () => [
      { id: 'e2s', label: s('End-to-start') },
      { id: 's2s', label: s('Start-to-start') },
      { id: 'e2e', label: s('End-to-end') },
      { id: 's2e', label: s('Start-to-end') },
    ],
    [s],
  );
  function K(N) {
    r
      ? e.exec('delete-link', { id: N })
      : (v((M) =>
          (M || []).map((W) => ({
            ...W,
            data: W.data.filter((Q) => Q.link.id !== N),
          })),
        ),
        n &&
          n({
            id: N,
            action: 'delete-link',
            data: { id: N },
          }));
  }
  function p(N, M) {
    r
      ? e.exec('update-link', {
          id: N,
          link: M,
        })
      : (v((W) =>
          (W || []).map((Q) => ({
            ...Q,
            data: Q.data.map((X) =>
              X.link.id === N ? { ...X, link: { ...X.link, ...M } } : X,
            ),
          })),
        ),
        n &&
          n({
            id: N,
            action: 'update-link',
            data: {
              id: N,
              link: M,
            },
          }));
  }
  return /* @__PURE__ */ u(oe, {
    children: (l || []).map((N, M) =>
      N.data.length
        ? /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ u(Ut.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ u(xn, {
                  label: N.title,
                  position: 'top',
                  children: /* @__PURE__ */ u('table', {
                    children: /* @__PURE__ */ u('tbody', {
                      children: N.data.map((W) =>
                        /* @__PURE__ */ At(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: W.task.text || '',
                                }),
                              }),
                              d?.auto && W.link.type === 'e2s'
                                ? /* @__PURE__ */ u('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ u(yn, {
                                      type: 'number',
                                      placeholder: s('Lag'),
                                      value: W.link.lag,
                                      disabled: w && a?.unscheduled,
                                      onChange: (Q) => {
                                        Q.input ||
                                          p(W.link.id, { lag: Q.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ u(vn, {
                                    value: W.link.type,
                                    placeholder: s('Select link type'),
                                    options: P,
                                    onChange: (Q) =>
                                      p(W.link.id, { type: Q.value }),
                                    children: ({ option: Q }) => Q.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => K(W.link.id),
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
            M,
          )
        : null,
    ),
  });
}
function Nr(e) {
  const { value: r, time: n, format: o, onchange: s, onChange: i, ...a } = e,
    m = i ?? s;
  function d(w) {
    const l = new Date(w.value);
    l.setHours(r.getHours()),
      l.setMinutes(r.getMinutes()),
      m && m({ value: l });
  }
  return /* @__PURE__ */ At('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ u(bn, {
        ...a,
        value: r,
        onChange: d,
        format: o,
        buttons: ['today'],
        clear: !1,
      }),
      n ? /* @__PURE__ */ u(kn, { value: r, onChange: m, format: o }) : null,
    ],
  });
}
re('select', Tn);
re('date', Nr);
re('twostate', Mn);
re('slider', Cn);
re('counter', Rn);
re('links', Lr);
function Zr({
  api: e,
  items: r = [],
  css: n = '',
  layout: o = 'default',
  readonly: s = !1,
  placement: i = 'sidebar',
  bottomBar: a = !0,
  topBar: m = !0,
  autoSave: d = !0,
  focus: w = !1,
  hotkeys: l = {},
}) {
  const v = Yt(Ut.i18n),
    E = I(() => v || xe({ ...ye, ...Ee }), [v]),
    P = I(() => E.getGroup('gantt'), [E]),
    K = E.getRaw(),
    p = I(() => {
      const R = K.gantt?.dateFormat || K.formats?.dateFormat;
      return we(R, K.calendar);
    }, [K]),
    N = I(() => {
      if (m === !0 && !s) {
        const R = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: P('Delete'),
            id: 'delete',
          },
        ];
        return d
          ? { items: R }
          : {
              items: [
                ...R,
                {
                  comp: 'button',
                  type: 'primary',
                  text: P('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return m;
    }, [m, s, d, P]),
    [M, W] = bt(!1),
    Q = I(() => (M ? 'wx-full-screen' : ''), [M]),
    X = B((R) => {
      W(R);
    }, []);
  at(() => {
    const R = nn(X);
    return (
      R.observe(),
      () => {
        R.disconnect();
      }
    );
  }, [X]);
  const j = J(e, '_activeTask'),
    D = J(e, 'activeTask'),
    gt = J(e, 'unscheduledTasks'),
    et = J(e, 'summary'),
    yt = J(e, 'links'),
    ct = J(e, 'splitTasks'),
    ht = I(() => ct && D?.segmentIndex, [ct, D]),
    C = I(() => ht || ht === 0, [ht]),
    H = J(e, 'taskTypes'),
    U = I(
      () => _n({ unscheduledTasks: gt, summary: et, taskTypes: H }),
      [gt, et, H],
    ),
    V = J(e, 'undo'),
    [g, k] = bt({}),
    [T, b] = bt(null),
    [A, lt] = bt(),
    [it, pt] = bt(null),
    Nt = I(() => {
      if (!j) return null;
      let R;
      if ((C && j.segments ? (R = { ...j.segments[ht] }) : (R = { ...j }), s)) {
        let vt = { parent: R.parent };
        return (
          U.forEach(({ key: dt, comp: tt }) => {
            if (tt !== 'links') {
              const Lt = R[dt];
              tt === 'date' && Lt instanceof Date
                ? (vt[dt] = p(Lt))
                : tt === 'slider' && dt === 'progress'
                  ? (vt[dt] = `${Lt}%`)
                  : (vt[dt] = Lt);
            }
          }),
          vt
        );
      }
      return R || null;
    }, [j, C, ht, s, U, p]);
  at(() => {
    lt(Nt);
  }, [Nt]),
    at(() => {
      k({}), pt(null), b(null);
    }, [D]);
  function kt(R, vt) {
    return R.map((dt) => {
      const tt = { ...dt };
      if (
        (dt.config && (tt.config = { ...tt.config }),
        tt.comp === 'links' &&
          e &&
          ((tt.api = e), (tt.autoSave = d), (tt.onLinksChange = mt)),
        tt.comp === 'select' && tt.key === 'type')
      ) {
        const Lt = tt.options ?? [];
        tt.options = Lt.map((_t) => ({
          ..._t,
          label: P(_t.label),
        }));
      }
      return (
        tt.comp === 'slider' &&
          tt.key === 'progress' &&
          (tt.labelTemplate = (Lt) => `${P(tt.label)} ${Lt}%`),
        tt.label && (tt.label = P(tt.label)),
        tt.config?.placeholder &&
          (tt.config.placeholder = P(tt.config.placeholder)),
        vt &&
          (tt.isDisabled && tt.isDisabled(vt, e.getState())
            ? (tt.disabled = !0)
            : delete tt.disabled),
        tt
      );
    });
  }
  const $t = I(() => {
      let R = r.length ? r : U;
      return (
        (R = kt(R, A)),
        A ? R.filter((vt) => !vt.isHidden || !vt.isHidden(A, e.getState())) : R
      );
    }, [r, U, A, P, e, d]),
    Tt = I(() => $t.map((R) => R.key), [$t]);
  function mt({ id: R, action: vt, data: dt }) {
    k((tt) => ({
      ...tt,
      [R]: { action: vt, data: dt },
    }));
  }
  const Dt = B(() => {
      for (let R in g)
        if (yt.byId(R)) {
          const { action: vt, data: dt } = g[R];
          e.exec(vt, dt);
        }
    }, [e, g, yt]),
    Gt = B(() => {
      const R = D?.id || D;
      if (C) {
        if (j?.segments) {
          const vt = j.segments.filter((dt, tt) => tt !== ht);
          e.exec('update-task', {
            id: R,
            task: { segments: vt },
          });
        }
      } else e.exec('delete-task', { id: R });
    }, [e, D, C, j, ht]),
    zt = B(() => {
      e.exec('show-editor', { id: null });
    }, [e]),
    It = B(
      (R) => {
        const { item: vt, changes: dt } = R;
        vt.id === 'delete' && Gt(),
          vt.id === 'save' && (dt.length ? zt() : Dt()),
          vt.comp && zt();
      },
      [e, D, d, Dt, Gt, zt],
    ),
    L = B(
      (R, vt, dt) => (
        gt && R.type === 'summary' && (R.unscheduled = !1),
        Ze(R, e.getState(), vt),
        dt || b(!1),
        R
      ),
      [gt, e],
    ),
    F = B(
      (R) => {
        (R = {
          ...R,
          unscheduled: gt && R.unscheduled && R.type !== 'summary',
        }),
          delete R.links,
          delete R.data,
          (Tt.indexOf('duration') === -1 || (R.segments && !R.duration)) &&
            delete R.duration;
        const vt = {
          id: D?.id || D,
          task: R,
          ...(C && { segmentIndex: ht }),
        };
        d && T && (vt.inProgress = T), e.exec('update-task', vt), d || Dt();
      },
      [e, D, gt, d, Dt, Tt, C, ht, T],
    ),
    G = B(
      (R) => {
        let { update: vt, key: dt, input: tt } = R;
        if ((tt && b(!0), (R.update = L({ ...vt }, dt, tt)), !d)) lt(R.update);
        else if (!it && !tt) {
          const Lt = $t.find((rt) => rt.key === dt),
            _t = vt[dt];
          (!Lt.validation || Lt.validation(_t)) &&
            (!Lt.required || _t) &&
            F(R.update);
        }
      },
      [d, L, it, $t, F],
    ),
    wt = B(
      (R) => {
        d || F(R.values);
      },
      [d, F],
    ),
    xt = B((R) => {
      pt(R.errors);
    }, []),
    nt = I(
      () =>
        V
          ? {
              'ctrl+z': (R) => {
                R.preventDefault(), e.exec('undo');
              },
              'ctrl+y': (R) => {
                R.preventDefault(), e.exec('redo');
              },
            }
          : {},
      [V, e],
    );
  return Nt
    ? /* @__PURE__ */ u($n, {
        children: /* @__PURE__ */ u(Bn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${Q} ${n}`,
          items: $t,
          values: Nt,
          topBar: N,
          bottomBar: a,
          placement: i,
          layout: o,
          readonly: s,
          autoSave: d,
          focus: w,
          onAction: It,
          onSave: wt,
          onValidation: xt,
          onChange: G,
          hotkeys: l && { ...nt, ...l },
        }),
      })
    : null;
}
const Jr = ({ children: e, columns: r = null, api: n }) => {
  const [o, s] = bt(null);
  return (
    at(() => {
      n && n.getTable(!0).then(s);
    }, [n]),
    /* @__PURE__ */ u(On, { api: o, columns: r, children: e })
  );
};
function ts(e) {
  const { api: r, content: n, filter: o, children: s } = e,
    i = st(null),
    a = st(null),
    [m, d] = bt({}),
    [w, l] = bt(null),
    [v, E] = bt(null),
    [P, K] = bt(!1),
    p = st(null),
    N = st(!1),
    M = st(null),
    W = st(null),
    Q = 300,
    X = 400;
  function j(T) {
    for (; T; ) {
      if (T.getAttribute) {
        const b = T.getAttribute('data-tooltip-id'),
          A = T.getAttribute('data-tooltip-at'),
          lt = T.getAttribute('data-tooltip');
        if (b || lt) return { id: b, tooltip: lt, target: T, at: A };
      }
      T = T.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  at(() => {
    const T = a.current;
    if (!P && T && v && (v.text || n)) {
      const b = T.getBoundingClientRect();
      let A = !1,
        lt = v.left,
        it = v.top;
      b.right >= m.right && ((lt = m.width - b.width - 5), (A = !0)),
        b.bottom >= m.bottom &&
          ((it = v.top - (b.bottom - m.bottom + 2)), (A = !0)),
        A && E((pt) => pt && { ...pt, left: lt, top: it });
    }
  }, [v, m, n, P]);
  const D = B(() => {
      clearTimeout(M.current),
        clearTimeout(W.current),
        (M.current = null),
        (W.current = null),
        (p.current = null),
        (N.current = !1),
        E(null),
        l(null),
        K(!1);
    }, []),
    gt = B(() => {
      clearTimeout(W.current),
        (W.current = setTimeout(() => {
          (W.current = null), !p.current && !N.current && D();
        }, X));
    }, [D]),
    et = B(() => {
      clearTimeout(W.current), (W.current = null);
    }, []);
  function yt(T) {
    if (a.current && a.current.contains(T.target)) return;
    let { id: b, tooltip: A, target: lt, at: it } = j(T.target);
    if (!b && !A) {
      clearTimeout(M.current),
        (M.current = null),
        (p.current = null),
        !N.current && !W.current && gt();
      return;
    }
    if ((et(), A || (A = V(b)), p.current === b)) return;
    (p.current = b), clearTimeout(M.current), E(null), l(null), K(!1);
    const pt = T.clientX;
    M.current = setTimeout(() => {
      M.current = null;
      const Nt = b ? U(g(b)) : null;
      if (o && Nt && !o(Nt)) {
        p.current = null;
        return;
      }
      Nt && l(Nt);
      const kt = lt.getBoundingClientRect(),
        $t = i.current,
        Tt = $t
          ? $t.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let mt, Dt;
      it === 'left'
        ? ((mt = kt.top + 5 - Tt.top), (Dt = kt.right + 5 - Tt.left))
        : ((mt = kt.top + kt.height - Tt.top), (Dt = pt - Tt.left)),
        d(Tt),
        E({ top: mt, left: Dt, text: A });
    }, Q);
  }
  function ct() {
    (N.current = !0), et();
  }
  function ht() {
    (N.current = !1), p.current || gt();
  }
  function C(T) {
    const b = T.touches[0];
    if (!b) return;
    const { id: A, target: lt } = j(T.target);
    if (!A) return;
    clearTimeout(M.current), clearTimeout(W.current);
    const it = U(g(A));
    if (o && it && !o(it)) return;
    const pt = it?.text || '',
      Nt = lt.getBoundingClientRect(),
      kt = i.current,
      $t = kt
        ? kt.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    l(it),
      d($t),
      K(!0),
      E({
        top: Nt.top - $t.top - 8,
        left: b.clientX - $t.left,
        text: pt,
      });
  }
  function H() {
    D();
  }
  function U(T) {
    return r?.getTask(g(T)) || null;
  }
  function V(T) {
    return U(T)?.text || '';
  }
  function g(T) {
    const b = Number(T);
    return Number.isFinite(b) ? b : T;
  }
  at(
    () => () => {
      clearTimeout(M.current), clearTimeout(W.current);
    },
    [],
  );
  const k = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    P ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ At('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: i,
    onMouseMove: yt,
    onTouchStart: C,
    onTouchEnd: H,
    onTouchMove: H,
    children: [
      v && (v.text || n)
        ? /* @__PURE__ */ u('div', {
            className: k,
            ref: a,
            style: { top: `${v.top}px`, left: `${v.left}px` },
            onMouseEnter: ct,
            onMouseLeave: ht,
            children: n
              ? /* @__PURE__ */ u(n, { data: w, api: r })
              : v.text
                ? /* @__PURE__ */ u('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: v.text,
                  })
                : null,
          })
        : null,
      s,
    ],
  });
}
function es({ fonts: e = !0, children: r }) {
  return r
    ? /* @__PURE__ */ u(Ae, { fonts: e, children: r() })
    : /* @__PURE__ */ u(Ae, { fonts: e });
}
function ns({ fonts: e = !0, children: r }) {
  return r
    ? /* @__PURE__ */ u(ze, { fonts: e, children: r })
    : /* @__PURE__ */ u(ze, { fonts: e });
}
function rs({ fonts: e = !0, children: r }) {
  return r
    ? /* @__PURE__ */ u(_e, { fonts: e, children: r })
    : /* @__PURE__ */ u(_e, { fonts: e });
}
const Ir = '2.9.0',
  Sr = {
    version: Ir,
  },
  ss = Sr.version;
export {
  Qr as ContextMenu,
  Zr as Editor,
  qr as Gantt,
  Jr as HeaderMenu,
  es as Material,
  jr as Toolbar,
  ts as Tooltip,
  ns as Willow,
  rs as WillowDark,
  cs as defaultColumns,
  ls as defaultEditorItems,
  as as defaultMenuOptions,
  us as defaultTaskTypes,
  ds as defaultToolbarButtons,
  fs as getEditorItems,
  hs as getMenuOptions,
  ms as getToolbarButtons,
  ws as registerEditorItem,
  gs as registerScaleUnit,
  ss as version,
};
//# sourceMappingURL=index.es.js.map
