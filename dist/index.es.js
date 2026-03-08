import { jsxs as zt, jsx as u, Fragment as oe } from 'react/jsx-runtime';
import {
  createContext as pn,
  useContext as Yt,
  useMemo as P,
  useState as kt,
  useCallback as K,
  useRef as rt,
  useEffect as ut,
  Fragment as pe,
  forwardRef as qe,
  useImperativeHandle as je,
} from 'react';
import {
  context as Kt,
  Button as He,
  Field as wn,
  Text as xn,
  Combo as yn,
  DatePicker as vn,
  TimePicker as bn,
  Locale as kn,
  RichSelect as $n,
  TwoState as Tn,
  Slider as Mn,
  Counter as Cn,
  Material as Pe,
  Willow as Ae,
  WillowDark as ze,
} from '@svar-ui/react-core';
import {
  locate as Ft,
  locateID as jt,
  locateAttr as Rn,
  dateToString as we,
  locale as xe,
} from '@svar-ui/lib-dom';
import { en as ye } from '@svar-ui/gantt-locales';
import { en as Ee } from '@svar-ui/core-locales';
import { EventBusRouter as En } from '@svar-ui/lib-state';
import {
  prepareEditTask as Qe,
  grid as Dn,
  extendDragOptions as Ln,
  isSegmentMoveAllowed as Nn,
  DataStore as In,
  normalizeLinks as Sn,
  normalizeZoom as Hn,
  defaultColumns as Pn,
  parseTaskDates as _e,
  defaultTaskTypes as An,
  getToolbarButtons as We,
  handleAction as Ze,
  isHandledAction as Je,
  getMenuOptions as Ge,
  getEditorItems as zn,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as is,
  defaultEditorItems as cs,
  defaultMenuOptions as ls,
  defaultTaskTypes as as,
  defaultToolbarButtons as us,
  getEditorItems as ds,
  getMenuOptions as fs,
  getToolbarButtons as hs,
  registerScaleUnit as ms,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as Re,
  useStore as tt,
  useStoreWithCounter as ie,
  writable as _n,
  useStoreLater as Vt,
} from '@svar-ui/lib-react';
import { hotkeys as tn } from '@svar-ui/grid-store';
import { Grid as Wn, HeaderMenu as Gn } from '@svar-ui/react-grid';
import { flushSync as On } from 'react-dom';
import { Toolbar as Oe } from '@svar-ui/react-toolbar';
import { ContextMenu as Yn } from '@svar-ui/react-menu';
import { Editor as Xn, registerEditorItem as se } from '@svar-ui/react-editor';
import { registerEditorItem as ps } from '@svar-ui/react-editor';
const qt = pn(null);
function Jt(e) {
  const r = e.getAttribute('data-id'),
    n = parseInt(r);
  return isNaN(n) || n.toString() != r ? r : n;
}
function Bn(e, r, n) {
  const o = e.getBoundingClientRect(),
    s = r.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: o.top - s.top,
    left: o.left - s.left,
    dt: o.bottom - n.clientY,
    db: n.clientY - o.top,
  };
}
function Ye(e) {
  return e && e.getAttribute('data-context-id');
}
const Xe = 5;
function Kn(e, r) {
  let n, o, s, c, a, g, d, p, l;
  function y(L) {
    (c = L.clientX),
      (a = L.clientY),
      (g = {
        ...Bn(n, e, L),
        y: r.getTask(s).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function E(L) {
    (n = Ft(L)),
      Ye(n) &&
        ((s = Jt(n)),
        (l = setTimeout(() => {
          (p = !0), r && r.touchStart && r.touchStart(), y(L.touches[0]);
        }, 500)),
        e.addEventListener('touchmove', D),
        e.addEventListener('contextmenu', z),
        window.addEventListener('touchend', X));
  }
  function z(L) {
    if (p || l) return L.preventDefault(), !1;
  }
  function f(L) {
    L.which === 1 &&
      ((n = Ft(L)),
      Ye(n) &&
        ((s = Jt(n)),
        e.addEventListener('mousemove', b),
        window.addEventListener('mouseup', j),
        y(L)));
  }
  function H(L) {
    e.removeEventListener('mousemove', b),
      e.removeEventListener('touchmove', D),
      document.body.removeEventListener('mouseup', j),
      document.body.removeEventListener('touchend', X),
      (document.body.style.userSelect = ''),
      L &&
        (e.removeEventListener('mousedown', f),
        e.removeEventListener('touchstart', E));
  }
  function F(L) {
    const J = L.clientX - c,
      pt = L.clientY - a;
    if (!o) {
      if (
        (Math.abs(J) < Xe && Math.abs(pt) < Xe) ||
        (r && r.start && r.start({ id: s, e: L }) === !1)
      )
        return;
      (o = n.cloneNode(!0)),
        (o.style.pointerEvents = 'none'),
        o.classList.add('wx-reorder-task'),
        (o.style.position = 'absolute'),
        (o.style.left = g.left + 'px'),
        (o.style.top = g.top + 'px'),
        (n.style.visibility = 'hidden'),
        n.parentNode.insertBefore(o, n);
    }
    if (o) {
      const at = Math.round(Math.max(0, g.top + pt));
      if (r && r.move && r.move({ id: s, top: at, detail: d }) === !1) return;
      const ht = r.getTask(s),
        xt = ht.$y;
      if (!g.start && g.y == xt) return lt();
      (g.start = !0), (g.y = ht.$y - 4), (o.style.top = at + 'px');
      const M = document.elementFromPoint(L.clientX, L.clientY),
        N = Ft(M);
      if (N && N !== n) {
        const V = Jt(N),
          I = N.getBoundingClientRect(),
          v = I.top + I.height / 2,
          C = L.clientY + g.db > v && N.nextElementSibling !== n,
          w = L.clientY - g.dt < v && N.previousElementSibling !== n;
        d?.after == V || d?.before == V
          ? (d = null)
          : C
            ? (d = { id: s, after: V })
            : w && (d = { id: s, before: V });
      }
    }
  }
  function b(L) {
    F(L);
  }
  function D(L) {
    p
      ? (L.preventDefault(), F(L.touches[0]))
      : l && (clearTimeout(l), (l = null));
  }
  function X() {
    (p = null), l && (clearTimeout(l), (l = null)), lt();
  }
  function j() {
    lt();
  }
  function lt() {
    n && (n.style.visibility = ''),
      o &&
        (o.parentNode.removeChild(o),
        r && r.end && r.end({ id: s, top: g.top })),
      (s = n = o = g = d = null),
      H();
  }
  return (
    e.style.position !== 'absolute' && (e.style.position = 'relative'),
    e.addEventListener('mousedown', f),
    e.addEventListener('touchstart', E),
    {
      destroy() {
        H(!0);
      },
    }
  );
}
function Un({ row: e, column: r }) {
  const n = Yt(qt);
  function o(c, a) {
    return {
      justifyContent: a.align,
      paddingLeft: `${(c.$level - 1) * 20}px`,
    };
  }
  const s = r && r._cell;
  return /* @__PURE__ */ zt('div', {
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
function Be({ column: e, cell: r }) {
  const n = P(() => e.id, [e?.id]);
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
function Fn(e) {
  const {
      readonly: r,
      compactMode: n,
      width: o = 0,
      display: s = 'all',
      columnWidth: c = 0,
      fullHeight: a,
      onTableAPIChange: g,
      multiTaskRows: d = !1,
      rowMapping: p = null,
      rowHeightOverrides: l = null,
    } = e,
    [y, E] = Re(c),
    [z, f] = kt(),
    H = Yt(Kt.i18n),
    F = P(() => H.getGroup('gantt'), [H]),
    b = Yt(qt),
    D = tt(b, 'scrollTop'),
    X = tt(b, 'cellHeight'),
    j = tt(b, '_scrollTask'),
    lt = tt(b, '_selected'),
    L = tt(b, 'area'),
    J = tt(b, '_tasks'),
    pt = tt(b, '_scales'),
    at = tt(b, 'columns'),
    ht = tt(b, '_sort'),
    xt = tt(b, 'calendar'),
    M = tt(b, 'durationUnit'),
    N = tt(b, 'splitTasks'),
    [V, I] = kt(null),
    v = P(() => {
      if (!J || !L) return [];
      if (d && p) {
        const i = /* @__PURE__ */ new Set();
        return J.filter((R) => {
          const S = p.taskRows.get(R.id) ?? R.id;
          return i.has(S) ? !1 : (i.add(S), !0);
        });
      }
      return J.slice(L.start, L.end);
    }, [J, L, d, p, a]),
    C = K(
      (i, R) => {
        if (R === 'add-task')
          b.exec(R, {
            target: i,
            task: { text: F('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (R === 'open-task') {
          const S = v.find((_) => _.id === i);
          (S?.data || S?.lazy) && b.exec(R, { id: i, mode: !S.open });
        }
      },
      [v],
    ),
    w = K(
      (i) => {
        const R = jt(i),
          S = i.target.dataset.action;
        S && i.preventDefault(),
          R
            ? S === 'add-task' || S === 'open-task'
              ? C(R, S)
              : b.exec('select-task', {
                  id: R,
                  toggle: i.ctrlKey || i.metaKey,
                  range: i.shiftKey,
                  show: !0,
                })
            : S === 'add-task' && C(null, S);
      },
      [b, C],
    ),
    $ = rt(null),
    B = rt(null),
    [Z, nt] = kt(0),
    [Mt, Ct] = kt(!1);
  ut(() => {
    const i = B.current;
    if (!i || typeof ResizeObserver > 'u') return;
    const R = () => nt(i.clientWidth);
    R();
    const S = new ResizeObserver(R);
    return S.observe(i), () => S.disconnect();
  }, []);
  const Et = rt(null),
    vt = K(
      (i) => {
        const R = i.id,
          { before: S, after: _ } = i,
          it = i.onMove;
        let mt = S || _,
          wt = S ? 'before' : 'after';
        if (it) {
          if (wt === 'after') {
            const _t = b.getTask(mt);
            _t.data?.length &&
              _t.open &&
              ((wt = 'before'), (mt = _t.data[0].id));
          }
          Et.current = { id: R, [wt]: mt };
        } else Et.current = null;
        b.exec('move-task', {
          id: R,
          mode: wt,
          target: mt,
          inProgress: it,
        });
      },
      [b],
    ),
    ct = P(() => L?.from ?? 0, [L]),
    Nt = P(() => pt?.height ?? 0, [pt]),
    Dt = P(
      () => (!n && s !== 'grid' ? (y ?? 0) > (o ?? 0) : (y ?? 0) > (Z ?? 0)),
      [n, s, y, o, Z],
    ),
    Ot = P(() => {
      const i = {};
      return (
        (Dt && s === 'all') || (s === 'grid' && Dt)
          ? (i.width = y)
          : s === 'grid' && (i.width = '100%'),
        d && a && (i.minHeight = a),
        i
      );
    }, [Dt, s, y, d, a]),
    It = P(() => (V && !v.find((i) => i.id === V.id) ? [...v, V] : v), [v, V]),
    T = P(() => {
      let i = (at || []).map((_) => {
        _ = { ..._ };
        const it = _.header;
        if (typeof it == 'object') {
          const mt = it.text && F(it.text);
          _.header = { ...it, text: mt };
        } else _.header = F(it);
        if (_.cell && _.id !== 'text' && _.id !== 'add-task') {
          const mt = _.cell;
          _.cell = (wt) => /* @__PURE__ */ u(mt, { ...wt, api: b });
        }
        return _;
      });
      const R = i.findIndex((_) => _.id === 'text'),
        S = i.findIndex((_) => _.id === 'add-task');
      if (
        (R !== -1 && (i[R].cell && (i[R]._cell = i[R].cell), (i[R].cell = Un)),
        S !== -1)
      ) {
        i[S].cell = i[S].cell || Be;
        const _ = i[S].header;
        if (
          (typeof _ != 'object' && (i[S].header = { text: _ }),
          (i[S].header.cell = _.cell || Be),
          r)
        )
          i.splice(S, 1);
        else if (n) {
          const [it] = i.splice(S, 1);
          i.unshift(it);
        }
      }
      return i.length > 0 && (i[i.length - 1].resize = !1), i;
    }, [at, F, r, n, b]),
    U = P(
      () =>
        s === 'all'
          ? `${o}px`
          : s === 'grid'
            ? 'calc(100% - 4px)'
            : T.find((i) => i.id === 'add-task')
              ? '50px'
              : '0',
      [s, o, T],
    ),
    O = P(() => {
      if (It && ht?.length) {
        const i = {};
        return (
          ht.forEach(({ key: R, order: S }, _) => {
            i[R] = {
              order: S,
              ...(ht.length > 1 && { index: _ }),
            };
          }),
          i
        );
      }
      return {};
    }, [It, ht]),
    dt = K(() => T.some((i) => i.flexgrow && !i.hidden), []),
    yt = P(() => dt(), [dt, Mt]),
    et = P(() => {
      let i = s === 'chart' ? T.filter((S) => S.id === 'add-task') : T;
      const R = s === 'all' ? o : Z;
      if (!yt) {
        let S = y,
          _ = !1;
        if (T.some((it) => it.$width)) {
          let it = 0;
          (S = T.reduce(
            (mt, wt) => (
              wt.hidden || ((it += wt.width), (mt += wt.$width || wt.width)), mt
            ),
            0,
          )),
            it > S && S > R && (_ = !0);
        }
        if (_ || S < R) {
          let it = 1;
          return (
            _ || (it = (R - 50) / (S - 50 || 1)),
            i.map(
              (mt) => (
                mt.id !== 'add-task' &&
                  !mt.hidden &&
                  (mt.$width || (mt.$width = mt.width),
                  (mt.width = mt.$width * it)),
                mt
              ),
            )
          );
        }
      }
      return i;
    }, [s, T, yt, y, o, Z]),
    St = K(
      (i) => {
        if (!dt()) {
          const R = et.reduce(
            (S, _) => (
              i && _.$width && (_.$width = _.width),
              S + (_.hidden ? 0 : _.width)
            ),
            0,
          );
          R !== y && E(R);
        }
        Ct(!0), Ct(!1);
      },
      [dt, et, y, E],
    ),
    Y = K(() => {
      T.filter((R) => R.flexgrow && !R.hidden).length === 1 &&
        T.forEach((R) => {
          R.$width && !R.flexgrow && !R.hidden && (R.width = R.$width);
        });
    }, []),
    ot = K(
      (i) => {
        if (!r) {
          const R = jt(i),
            S = Rn(i, 'data-col-id');
          !(S && T.find((it) => it.id == S))?.editor &&
            R &&
            b.exec('show-editor', { id: R });
        }
      },
      [b, r],
      // cols is defined later; relies on latest value at call time
    ),
    $t = P(() => (Array.isArray(lt) ? lt.map((i) => i.id) : []), [lt]),
    Q = K(() => {
      if ($.current && It !== null) {
        const i = $.current.querySelector('.wx-body');
        i &&
          (d
            ? (i.style.top = '0px')
            : (i.style.top = -((D ?? 0) - (ct ?? 0)) + 'px'));
      }
      B.current && (B.current.scrollTop = 0);
    }, [It, D, ct, d]);
  ut(() => {
    $.current && Q();
  }, [D, ct, Q]),
    ut(() => {
      const i = $.current;
      if (!i) return;
      const R = i.querySelector('.wx-table-box .wx-body');
      if (!R || typeof ResizeObserver > 'u') return;
      const S = new ResizeObserver(() => {
        Q();
      });
      return (
        S.observe(R),
        () => {
          S.disconnect();
        }
      );
    }, [et, Ot, s, U, It, Q]),
    ut(() => {
      if (!j || !z) return;
      const { id: i } = j,
        R = z.getState().focusCell;
      R &&
        R.row !== i &&
        $.current &&
        $.current.contains(document.activeElement) &&
        z.exec('focus-cell', {
          row: i,
          column: R.column,
        });
    }, [j, z]),
    ut(() => {
      if (!d) return;
      const i = $.current;
      if (!i) return;
      const R = i.querySelector('.wx-table-box .wx-body');
      if (!R) return;
      const S = {
        attributes: !0,
        attributeFilter: ['style'],
        childList: !0,
      };
      let _ = null,
        it;
      const mt = () => {
        it.disconnect();
        let wt = 0;
        R.querySelectorAll('[data-id]').forEach((te) => {
          const Qt = te.getAttribute('data-id'),
            le =
              p && Qt
                ? (p.taskRows.get(Qt) ?? p.taskRows.get(Number(Qt)) ?? Qt)
                : Qt,
            ee = (l && le && l[le]) || X;
          (te.style.height = `${ee}px`),
            (te.style.minHeight = `${ee}px`),
            (wt += ee);
        }),
          wt > 0 && (R.style.height = `${wt}px`),
          it.observe(R, S);
      };
      return (
        (it = new MutationObserver(() => {
          _ && cancelAnimationFrame(_), (_ = requestAnimationFrame(mt));
        })),
        mt(),
        () => {
          it.disconnect(), _ && cancelAnimationFrame(_);
        }
      );
    }, [l, d, It, X, p]);
  const Pt = K(
      ({ id: i }) => {
        if (r) return !1;
        b.getTask(i).open && b.exec('open-task', { id: i, mode: !1 });
        const R = b.getState()._tasks.find((S) => S.id === i);
        if ((I(R || null), !R)) return !1;
      },
      [b, r],
    ),
    G = K(
      ({ id: i, top: R }) => {
        Et.current
          ? vt({ ...Et.current, onMove: !1 })
          : b.exec('drag-task', {
              id: i,
              top: R + (ct ?? 0),
              inProgress: !1,
            }),
          I(null);
      },
      [b, vt, ct],
    ),
    st = K(
      ({ id: i, top: R, detail: S }) => {
        S && vt({ ...S, onMove: !0 }),
          b.exec('drag-task', {
            id: i,
            top: R + (ct ?? 0),
            inProgress: !0,
          });
      },
      [b, vt, ct],
    );
  ut(() => {
    const i = $.current;
    return i
      ? Kn(i, {
          start: Pt,
          end: G,
          move: st,
          getTask: b.getTask,
        }).destroy
      : void 0;
  }, [b, Pt, G, st]);
  const Ht = K(
      (i) => {
        const { key: R, isInput: S } = i;
        if (!S && (R === 'arrowup' || R === 'arrowdown'))
          return (i.eventSource = 'grid'), b.exec('hotkey', i), !1;
        if (R === 'enter') {
          const _ = z?.getState().focusCell;
          if (_) {
            const { row: it, column: mt } = _;
            mt === 'add-task'
              ? C(it, 'add-task')
              : mt === 'text' && C(it, 'open-task');
          }
        }
      },
      [b, C, z],
    ),
    Tt = rt(null),
    bt = () => {
      Tt.current = {
        setTableAPI: f,
        handleHotkey: Ht,
        sortVal: ht,
        api: b,
        adjustColumns: Y,
        setColumnWidth: St,
        tasks: v,
        calendarVal: xt,
        durationUnitVal: M,
        splitTasksVal: N,
        onTableAPIChange: g,
      };
    };
  bt(),
    ut(() => {
      bt();
    }, [f, Ht, ht, b, Y, St, v, xt, M, N, g]);
  const At = K((i) => {
    f(i),
      i.intercept('hotkey', (R) => Tt.current.handleHotkey(R)),
      i.intercept('scroll', () => !1),
      i.intercept('select-row', () => !1),
      i.intercept('sort-rows', (R) => {
        const S = Tt.current.sortVal,
          { key: _, add: it } = R,
          mt = S ? S.find((_t) => _t.key === _) : null;
        let wt = 'asc';
        return (
          mt && (wt = !mt || mt.order === 'asc' ? 'desc' : 'asc'),
          b.exec('sort-tasks', {
            key: _,
            order: wt,
            add: it,
          }),
          !1
        );
      }),
      i.on('resize-column', () => {
        Tt.current.setColumnWidth(!0);
      }),
      i.on('hide-column', (R) => {
        R.mode || Tt.current.adjustColumns(), Tt.current.setColumnWidth();
      }),
      i.intercept('update-cell', (R) => {
        const { id: S, column: _, value: it } = R,
          mt = Tt.current.tasks.find((wt) => wt.id === S);
        if (mt) {
          const wt = { ...mt };
          let _t = it;
          _t && !isNaN(_t) && !(_t instanceof Date) && (_t *= 1),
            (wt[_] = _t),
            Qe(
              wt,
              {
                calendar: Tt.current.calendarVal,
                durationUnit: Tt.current.durationUnitVal,
                splitTasks: Tt.current.splitTasksVal,
              },
              _,
            ),
            b.exec('update-task', {
              id: S,
              task: wt,
            });
        }
        return !1;
      }),
      g && g(i);
  }, []);
  return /* @__PURE__ */ u('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${U}` },
    ref: B,
    children: /* @__PURE__ */ u('div', {
      ref: $,
      style: Ot,
      className: 'wx-rHj6070p wx-table',
      onClick: w,
      onDoubleClick: ot,
      children: /* @__PURE__ */ u(Wn, {
        init: At,
        sizes: {
          rowHeight: X,
          headerHeight: (Nt ?? 0) - 1,
        },
        rowStyle: (i) =>
          i.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (i) =>
          `wx-rHj6070p wx-text-${i.align}${i.id === 'add-task' ? ' wx-action' : ''}`,
        data: It,
        columns: et,
        selectedRows: [...$t],
        sortMarks: O,
      }),
    }),
  });
}
function Vn({ borders: e = '', rowLayout: r = null }) {
  const n = Yt(qt),
    o = tt(n, 'cellWidth'),
    s = tt(n, 'cellHeight'),
    c = rt(null),
    [a, g] = kt('#e4e4e4');
  ut(() => {
    if (typeof getComputedStyle < 'u' && c.current) {
      const l = getComputedStyle(c.current).getPropertyValue(
        '--wx-gantt-border',
      );
      g(l ? l.substring(l.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const d = P(() => {
    if (!r) return null;
    const l = [];
    let y = 0;
    for (const E of r) (y += E.height), l.push(y);
    return l;
  }, [r]);
  if (!d) {
    const l = {
      width: '100%',
      height: '100%',
      background: o != null && s != null ? `url(${Dn(o, s, a, e)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ u('div', { ref: c, style: l });
  }
  const p = o
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${o - 1}px, ${a} ${o - 1}px, ${a} ${o}px)`
    : void 0;
  return /* @__PURE__ */ zt('div', {
    ref: c,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ u('div', {
        style: {
          width: '100%',
          height: '100%',
          background: p,
          position: 'absolute',
        },
      }),
      d.map((l, y) =>
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
          y,
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
function qn(e) {
  return e.split(',').map(Number).slice(0, -6).join(',');
}
function jn(e, r = 8) {
  if (!e) return '';
  const { path: n } = ce(e);
  if (n.length < 2) return '';
  let o = `M${n[0][0]},${n[0][1]}`;
  for (let s = 1; s < n.length - 1; s++) {
    const c = n[s - 1],
      a = n[s],
      g = n[s + 1],
      d = a[0] - c[0],
      p = a[1] - c[1],
      l = g[0] - a[0],
      y = g[1] - a[1];
    if (d === l && p === y) {
      o += ` L${a[0]},${a[1]}`;
      continue;
    }
    const E = Math.hypot(d, p),
      z = Math.hypot(l, y);
    if (E === 0 || z === 0) {
      o += ` L${a[0]},${a[1]}`;
      continue;
    }
    const f = Math.min(r, E / 2, z / 2),
      H = a[0] - (d / E) * f,
      F = a[1] - (p / E) * f,
      b = a[0] + (l / z) * f,
      D = a[1] + (y / z) * f;
    (o += ` L${H},${F}`), (o += ` Q${a[0]},${a[1]} ${b},${D}`);
  }
  return (o += ` L${n[n.length - 1][0]},${n[n.length - 1][1]}`), o;
}
function Qn(e, r) {
  if (!e) return '';
  const { path: n } = ce(e);
  if (n.length < 2) return '';
  const o = n[0],
    s = n[n.length - 1],
    c = s[0] - o[0],
    a = s[1] - o[1],
    g = !r || r[0] === 'e',
    d = !r || r[2] === 's',
    p = (g && d && c < 0) || (!g && !d && c > 0),
    l = Math.hypot(c, a),
    y = Math.abs(c);
  let E = `M${o[0]},${o[1]}`;
  if (p) {
    const z = Math.max(40, Math.min(y * 0.3, 160)),
      f = Math.max(60, Math.min(y * 0.4, 200)),
      H = Math.max(40, Math.min(y * 0.2, 100)),
      F = a >= 0 ? 1 : -1,
      b = o[0] + (g ? z : -z),
      D = o[1] + F * H,
      X = s[0] + (d ? -f : f);
    E += ` C${b},${D} ${X},${s[1]} ${s[0]},${s[1]}`;
  } else {
    const z = Math.max(40, Math.min(l * 0.5, 150)),
      f = o[0] + (g ? z : -z),
      H = s[0] + (d ? -z : z);
    E += ` C${f},${o[1]} ${H},${s[1]} ${s[0]},${s[1]}`;
  }
  return E;
}
function Zn(e, r, n) {
  return r === 'bezier' ? Qn(e, n) : jn(e);
}
const me = 5,
  Ke = 4;
function Jn(e) {
  if (!e || !e.length) return e;
  const r = e.map((c) => {
      if (!c.$p) return null;
      const { path: a } = ce(c.$p);
      return a;
    }),
    n = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Map();
  r.forEach((c, a) => {
    if (!(!c || c.length < 2))
      for (let g = 0; g < c.length - 1; g++) {
        const [d, p] = c[g],
          [l, y] = c[g + 1];
        if (Math.abs(p - y) < 1) {
          const E = Math.round((p + y) / 2 / me) * me;
          n.has(E) || n.set(E, []),
            n.get(E).push({
              linkIdx: a,
              segIdx: g,
              min: Math.min(d, l),
              max: Math.max(d, l),
              y: (p + y) / 2,
            });
        } else if (Math.abs(d - l) < 1) {
          const E = Math.round((d + l) / 2 / me) * me;
          o.has(E) || o.set(E, []),
            o.get(E).push({
              linkIdx: a,
              segIdx: g,
              min: Math.min(p, y),
              max: Math.max(p, y),
              x: (d + l) / 2,
            });
        }
      }
  });
  const s = r.map((c) => (c ? c.map((a) => [...a]) : null));
  for (const c of o.values()) {
    if (c.length < 2) continue;
    const a = [];
    for (let d = 0; d < c.length; d++)
      for (let p = d + 1; p < c.length; p++)
        c[d].min < c[p].max &&
          c[d].max > c[p].min &&
          (a.includes(c[d]) || a.push(c[d]), a.includes(c[p]) || a.push(c[p]));
    if (a.length < 2) continue;
    const g = a.length;
    a.forEach((d, p) => {
      const l = (p - (g - 1) / 2) * Ke,
        y = s[d.linkIdx];
      y && ((y[d.segIdx][0] += l), (y[d.segIdx + 1][0] += l));
    });
  }
  for (const c of n.values()) {
    if (c.length < 2) continue;
    const a = [];
    for (let d = 0; d < c.length; d++)
      for (let p = d + 1; p < c.length; p++)
        c[d].min < c[p].max &&
          c[d].max > c[p].min &&
          (a.includes(c[d]) || a.push(c[d]), a.includes(c[p]) || a.push(c[p]));
    if (a.length < 2) continue;
    const g = a.length;
    a.forEach((d, p) => {
      const l = (p - (g - 1) / 2) * Ke,
        y = s[d.linkIdx];
      y && ((y[d.segIdx][1] += l), (y[d.segIdx + 1][1] += l));
    });
  }
  return e.map((c, a) => {
    const g = s[a];
    if (!g || !c.$p) return c;
    const p = c.$p.split(',').map(Number).slice(-6),
      l = [];
    for (const y of g) l.push(y[0], y[1]);
    return { ...c, $p: [...l, ...p].join(',') };
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
function tr(e, r) {
  const n = r?.style || e;
  if (n === 'dashed') return '8 4';
  if (n === 'dotted') return '2 4';
}
function er({
  onSelectLink: e,
  selectedLink: r,
  readonly: n,
  linkShape: o,
  linkGradient: s,
  linkStyle: c,
  linkBundling: a,
  multiTaskRows: g,
  taskPositions: d,
  cellHeight: p,
}) {
  const l = Yt(qt),
    [y, E] = ie(l, '_links'),
    [z] = ie(l, 'criticalPath'),
    f = tt(l, '_tasks'),
    H = o && o !== 'squared',
    F = rt(null),
    b = rt(null),
    D = rt(null),
    X = rt(/* @__PURE__ */ new Set());
  ut(() => {
    if (!s || !b.current) return;
    const M = getComputedStyle(b.current);
    D.current = {
      task: M.getPropertyValue('--wx-gantt-task-color').trim() || null,
      summary: M.getPropertyValue('--wx-gantt-summary-color').trim() || null,
      milestone:
        M.getPropertyValue('--wx-gantt-milestone-color').trim() || null,
      link: M.getPropertyValue('--wx-gantt-link-color').trim() || '#888',
    };
  }, [s]);
  const j = P(() => {
      if (!y?.length || !f?.length) return y;
      const M = new Set(f.map((C) => C.id)),
        N = new Map(f.map((C) => [C.id, C]));
      let V = !1;
      for (const C of y)
        if (!M.has(C.source) || !M.has(C.target)) {
          V = !0;
          break;
        }
      if (!V) return y;
      function I(C) {
        let w = l.getTask(C);
        for (; w; ) {
          if (M.has(w.id)) return N.get(w.id);
          if (!w.parent) return null;
          w = l.getTask(w.parent);
        }
        return null;
      }
      function v(C, w, $) {
        const B = !$ || $[0] === 'e',
          Z = !$ || $[2] === 's',
          nt = C.$h || p,
          Mt = w.$h || p,
          Ct = B ? C.$x + C.$w : C.$x,
          Et = C.$y + nt / 2,
          vt = Z ? w.$x : w.$x + w.$w,
          ct = w.$y + Mt / 2,
          Nt = 5,
          Dt = Z ? -1 : 1,
          Ot = vt + Dt * -10,
          It = ct - Nt,
          T = vt,
          U = ct,
          O = vt + Dt * -10,
          dt = ct + Nt;
        return [Ct, Et, vt, ct, Ot, It, T, U, O, dt].join(',');
      }
      return y.map((C) => {
        const w = M.has(C.source),
          $ = M.has(C.target);
        if (w && $) return C;
        const B = w ? N.get(C.source) : I(C.source),
          Z = $ ? N.get(C.target) : I(C.target);
        if (!B || !Z || B.id === Z.id) return C;
        const nt = v(B, Z, C.type);
        return { ...C, $p: nt, _rerouted: !0 };
      });
    }, [y, E, f, l, p]),
    lt = P(() => {
      if (!g || !d || !f?.length || !j?.length || !p) return j;
      const M = /* @__PURE__ */ new Map();
      let N = !1;
      if (
        (f.forEach((v) => {
          const C = d.get(v.id);
          if (!C) return;
          const w = v.$y + p / 2,
            B = C.y + C.h / 2 - w;
          Math.abs(B) > 0.5 && (N = !0), M.set(v.id, B);
        }),
        !N)
      )
        return j;
      const V = [];
      f.forEach((v) => {
        const C = M.get(v.id);
        C !== void 0 && V.push({ storeCenter: v.$y + p / 2, delta: C });
      }),
        V.sort((v, C) => v.storeCenter - C.storeCenter);
      function I(v) {
        let C = 0,
          w = 1 / 0;
        for (const $ of V) {
          const B = Math.abs(v - $.storeCenter);
          B < w && ((w = B), (C = $.delta));
        }
        return C;
      }
      return j.map((v) => {
        if (!v.$p) return v;
        const C = M.get(v.source) ?? 0,
          w = M.get(v.target) ?? 0;
        if (Math.abs(C) < 0.5 && Math.abs(w) < 0.5) return v;
        const $ = v.$p.split(',').map(Number),
          B = [...$],
          Z = $.length - 6;
        Z >= 2 && (B[1] += C), Z >= 4 && (B[Z - 1] += w);
        for (let nt = 2; nt < Z - 2; nt += 2) B[nt + 1] += I($[nt + 1]);
        for (let nt = Z; nt < $.length; nt += 2) B[nt + 1] += w;
        return { ...v, $p: B.join(',') };
      });
    }, [j, E, g, d, f, p]),
    L = P(() => (!a || !lt?.length ? lt : Jn(lt)), [lt, E, a]),
    J = P(() => {
      const M = X.current,
        N = /* @__PURE__ */ new Set();
      if (L) for (const V of L) M.has(V.id) || N.add(V.id);
      return N;
    }, [L, E]);
  ut(() => {
    L && (X.current = new Set(L.map((M) => M.id)));
  }, [L, E]);
  const pt = K(
    (M) => {
      const N = M?.target?.classList;
      !N?.contains('wx-line') &&
        !N?.contains('wx-line-hitarea') &&
        !N?.contains('wx-delete-button') &&
        e(null);
    },
    [e],
  );
  ut(() => {
    if (!n && r && F.current) {
      const M = (N) => {
        F.current && !F.current.contains(N.target) && pt(N);
      };
      return (
        document.addEventListener('click', M),
        () => {
          document.removeEventListener('click', M);
        }
      );
    }
  }, [n, r, pt]);
  const at = P(() => {
      if (!s || !L?.length) return null;
      const M = [];
      for (const N of L) {
        if (!N.$p || (z && N.$critical)) continue;
        const I = l.getTask(N.source),
          v = l.getTask(N.target),
          C = ge(I, D) || D.current?.link || '#888',
          w = ge(v, D) || D.current?.link || '#888',
          { path: $ } = ce(N.$p);
        if ($.length < 2) continue;
        const B = $[0],
          Z = $[$.length - 1],
          nt = I?.progress ?? 0,
          Mt = Math.min(100, Math.max(0, nt));
        M.push(
          /* @__PURE__ */ zt(
            'linearGradient',
            {
              id: `wx-link-grad-${N.id}`,
              gradientUnits: 'userSpaceOnUse',
              x1: B[0],
              y1: B[1],
              x2: Z[0],
              y2: Z[1],
              children: [
                /* @__PURE__ */ u('stop', { offset: '0%', stopColor: C }),
                Mt > 0 &&
                  /* @__PURE__ */ u('stop', { offset: `${Mt}%`, stopColor: C }),
                /* @__PURE__ */ u('stop', { offset: '100%', stopColor: w }),
              ],
            },
            `grad-${N.id}`,
          ),
        );
      }
      return M;
    }, [L, E, s, z, l]),
    ht = (M, N) => {
      const V = z && M.$critical,
        I = J.has(M.id),
        v = M._rerouted ? '6 3' : tr(c, M),
        C = I && !N,
        w = o === 'bezier',
        B =
          'wx-dkx3NwEn wx-line' +
          (V ? ' wx-critical' : '') +
          (!n && !N ? ' wx-line-selectable' : '') +
          (N ? ' wx-line-selected wx-line-selectable wx-delete-link' : '') +
          ' wx-line-visible' +
          (C ? (v ? ' wx-line-new-fade' : ' wx-line-new') : ''),
        Z = 'wx-dkx3NwEn wx-line-hitarea';
      let nt,
        Mt = V
          ? 'url(#wx-arrow-critical)'
          : N
            ? 'url(#wx-arrow-selected)'
            : 'url(#wx-arrow-default)';
      if (
        (s &&
          !V &&
          !N &&
          M.$p &&
          ((nt = `url(#wx-link-grad-${M.id})`),
          (Mt = `url(#wx-arrow-grad-${M.id})`)),
        H)
      ) {
        const Et = Zn(M.$p, o, M.type);
        if (w && M.$p) {
          const { arrow: vt } = ce(M.$p),
            ct = vt.map((Dt) => Dt.join(',')).join(' ');
          let Nt;
          if (N) Nt = 'var(--wx-color-danger)';
          else if (V) Nt = 'var(--wx-gantt-link-critical-color)';
          else if (s && M.$p) {
            const Dt = l.getTask(M.target);
            Nt = ge(Dt, D) || D.current?.link || 'var(--wx-gantt-link-color)';
          } else Nt = 'var(--wx-gantt-link-color)';
          return /* @__PURE__ */ zt(
            pe,
            {
              children: [
                /* @__PURE__ */ u('path', {
                  className: Z,
                  d: Et,
                  onClick: () => !n && !N && e(M.id),
                  'data-link-id': M.id,
                }),
                /* @__PURE__ */ u('path', {
                  ref: N ? F : void 0,
                  className: B,
                  d: Et,
                  stroke: nt,
                  strokeDasharray: v,
                  'data-link-id': M.id,
                }),
                /* @__PURE__ */ u('polygon', {
                  points: ct,
                  fill: Nt,
                  className: 'wx-dkx3NwEn',
                }),
              ],
            },
            M.id,
          );
        }
        return /* @__PURE__ */ zt(
          pe,
          {
            children: [
              /* @__PURE__ */ u('path', {
                className: Z,
                d: Et,
                onClick: () => !n && !N && e(M.id),
                'data-link-id': M.id,
              }),
              /* @__PURE__ */ u('path', {
                ref: N ? F : void 0,
                className: B,
                d: Et,
                stroke: nt,
                strokeDasharray: v,
                markerEnd: Mt,
                'data-link-id': M.id,
              }),
            ],
          },
          M.id,
        );
      }
      const Ct = qn(M.$p);
      return /* @__PURE__ */ zt(
        pe,
        {
          children: [
            /* @__PURE__ */ u('polyline', {
              className: Z,
              points: Ct,
              onClick: () => !n && !N && e(M.id),
              'data-link-id': M.id,
            }),
            /* @__PURE__ */ u('polyline', {
              ref: N ? F : void 0,
              className: B,
              points: Ct,
              stroke: nt,
              strokeDasharray: v,
              markerEnd: Mt,
              'data-link-id': M.id,
            }),
          ],
        },
        M.id,
      );
    },
    xt = P(() => {
      if (!s || !L?.length) return null;
      const M = [];
      for (const N of L) {
        if (!N.$p || (z && N.$critical)) continue;
        const I = l.getTask(N.target),
          v = ge(I, D) || D.current?.link || '#888';
        M.push(
          /* @__PURE__ */ u(
            'marker',
            {
              id: `wx-arrow-grad-${N.id}`,
              markerWidth: '10',
              markerHeight: '8',
              refX: '10',
              refY: '4',
              orient: 'auto',
              markerUnits: 'userSpaceOnUse',
              children: /* @__PURE__ */ u('polygon', {
                points: '0,0 10,4 0,8',
                fill: v,
              }),
            },
            `arrow-grad-${N.id}`,
          ),
        );
      }
      return M;
    }, [L, E, s, z, l]);
  return /* @__PURE__ */ zt('svg', {
    className: 'wx-dkx3NwEn wx-links',
    ref: b,
    children: [
      /* @__PURE__ */ zt('defs', {
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
          at,
          xt,
        ],
      }),
      (L || []).map((M) => ht(M, !1)),
      !n && r && ht(r, !0),
    ],
  });
}
function nr(e) {
  const { task: r, type: n } = e;
  function o(c) {
    const a = r.segments[c];
    return {
      left: `${a.$x}px`,
      top: '0px',
      width: `${a.$w}px`,
      height: '100%',
    };
  }
  function s(c) {
    if (!r.progress) return 0;
    const a = (r.duration * r.progress) / 100,
      g = r.segments;
    let d = 0,
      p = 0,
      l = null;
    do {
      const y = g[p];
      p === c &&
        (d > a ? (l = 0) : (l = Math.min((a - d) / y.duration, 1) * 100)),
        (d += y.duration),
        p++;
    } while (l === null && p < g.length);
    return l || 0;
  }
  return /* @__PURE__ */ u('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: r.segments.map((c, a) =>
      /* @__PURE__ */ zt(
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
              children: c.text || '',
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
  Ue = null;
const Fe = (e, r, n, o) => e < o && r > n,
  Ve = (e, r) => {
    if (!r || !r.start) return null;
    const { start: n, lengthUnitWidth: o, lengthUnit: s } = r,
      c = 864e5,
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
      g = Math.floor(e / o),
      d = new Date(n.getTime() + g * a * c);
    return d.setUTCHours(0, 0, 0, 0), d;
  },
  rr = (e, r, n) => {
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
  sr = (e, r, n) => {
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
      g = new Date(e.getTime() + r * a);
    return g.setUTCHours(0, 0, 0, 0), g;
  };
function or(e) {
  const {
      readonly: r,
      taskTemplate: n,
      multiTaskRows: o = !1,
      rowMapping: s = null,
      rowHeightOverrides: c = null,
      allowTaskIntersection: a = !0,
      summaryBarCounts: g = !1,
      marqueeSelect: d = !1,
      copyPaste: p = !1,
      linkShape: l,
      linkGradient: y = !1,
      linkStyle: E,
      linkBundling: z = !1,
    } = e,
    f = Yt(qt),
    [H, F] = ie(f, '_tasks'),
    [b, D] = ie(f, '_links'),
    X = tt(f, 'area'),
    j = tt(f, '_scales'),
    lt = tt(f, 'taskTypes'),
    L = tt(f, 'baselines'),
    J = tt(f, '_selected'),
    pt = tt(f, '_scrollTask'),
    at = tt(f, 'criticalPath'),
    ht = tt(f, 'tasks'),
    xt = tt(f, 'schedule'),
    M = tt(f, 'splitTasks'),
    N = tt(f, 'summary'),
    V = P(() => {
      if (!X || !Array.isArray(H)) return [];
      const t = X.start ?? 0,
        m = X.end ?? 0;
      return o && s
        ? H.map((x) => ({ ...x }))
        : H.slice(t, m).map((x) => ({ ...x }));
    }, [F, X, o, s]),
    I = tt(f, 'cellHeight'),
    v = P(() => {
      if (!o || !s || !V.length) return V;
      const t = /* @__PURE__ */ new Map(),
        m = [];
      H.forEach((A) => {
        const ft = s.taskRows.get(A.id) ?? A.id;
        t.has(ft) || (t.set(ft, m.length), m.push(ft));
      });
      const x = /* @__PURE__ */ new Map();
      V.forEach((A) => {
        if (A.type === 'summary') return;
        const ft = s.taskRows.get(A.id) ?? A.id;
        x.has(ft) || x.set(ft, []), x.get(ft).push(A);
      });
      const h = /* @__PURE__ */ new Map(),
        k = /* @__PURE__ */ new Map();
      x.forEach((A, ft) => {
        const gt = [],
          Wt = [...A].sort((Rt, Lt) => (Rt.$x ?? 0) - (Lt.$x ?? 0));
        for (const Rt of Wt) {
          const Lt = Rt.$x ?? 0,
            Bt = Lt + (Rt.$w ?? 0);
          let Ut = !1;
          for (let Gt = 0; Gt < gt.length; Gt++)
            if (
              !gt[Gt].some((Zt) => {
                const he = Zt.$x ?? 0,
                  $e = he + (Zt.$w ?? 0);
                return Fe(Lt, Bt, he, $e);
              })
            ) {
              gt[Gt].push(Rt), h.set(Rt.id, Gt), (Ut = !0);
              break;
            }
          Ut || (gt.push([Rt]), h.set(Rt.id, gt.length - 1));
        }
        k.set(ft, gt.length);
      });
      const W = /* @__PURE__ */ new Map();
      let q = 0;
      for (const A of m) {
        W.set(A, q);
        const ft = (c && c[A]) || I;
        q += ft;
      }
      return V.map((A) => {
        const ft = s.taskRows.get(A.id) ?? A.id,
          gt = W.get(ft) ?? 0;
        if (A.type === 'summary') {
          if ((x.get(ft) || []).length > 0 || A.barHidden)
            return { ...A, $y: gt, $skip: !0 };
          const Gt = (c && c[ft]) || I,
            Xt = Math.max(0, Math.floor((Gt - A.$h) / 2));
          return {
            ...A,
            $y: gt + Xt,
            $y_base: A.$y_base !== void 0 ? gt + Xt : void 0,
          };
        }
        const Wt = k.get(ft) || 1,
          Rt = h.get(A.id) ?? 0;
        if (Wt > 1) {
          const Xt = A.$h + 4,
            Zt = gt + 3 + Rt * Xt;
          return {
            ...A,
            $y: Zt,
            $y_base: A.$y_base !== void 0 ? Zt : void 0,
          };
        }
        const Lt = (c && c[ft]) || I,
          Bt = Math.max(0, Math.round((Lt - A.$h) / 2));
        return {
          ...A,
          $y: gt + Bt,
          $y_base: A.$y_base !== void 0 ? gt + Bt : void 0,
        };
      });
    }, [V, o, s, H, I, c]),
    C = P(() => {
      if (!o || !v?.length) return null;
      const t = /* @__PURE__ */ new Map();
      for (const m of v) m.$skip || t.set(m.id, { y: m.$y, h: m.$h });
      return t;
    }, [o, v]),
    w = P(() => j.lengthUnitWidth, [j]),
    $ = P(() => j.lengthUnit || 'day', [j]),
    B = P(() => {
      const t = /* @__PURE__ */ new Set();
      if (a || !o || !s) return t;
      const m = /* @__PURE__ */ new Map();
      return (
        H.forEach((x) => {
          if (x.type === 'summary' || x.type === 'milestone') return;
          const h = s.taskRows.get(x.id) ?? x.id;
          m.has(h) || m.set(h, []), m.get(h).push(x);
        }),
        m.forEach((x) => {
          if (!(x.length < 2))
            for (let h = 0; h < x.length; h++)
              for (let k = h + 1; k < x.length; k++) {
                const W = x[h],
                  q = x[k];
                Fe(W.$x, W.$x + W.$w, q.$x, q.$x + q.$w) &&
                  (t.add(W.id), t.add(q.id));
              }
        }),
        t
      );
    }, [a, o, s, H, F]),
    Z = P(() => {
      if (!g || !H?.length || !w) return null;
      const t = /* @__PURE__ */ new Map(),
        m = /* @__PURE__ */ new Set();
      H.forEach((h) => {
        h.type === 'summary' && m.add(h.id),
          h.parent &&
            h.parent !== 0 &&
            h.type !== 'summary' &&
            (t.has(h.parent) || t.set(h.parent, []), t.get(h.parent).push(h));
      });
      const x = /* @__PURE__ */ new Map();
      return (
        m.forEach((h) => {
          const k = t.get(h);
          if (!k?.length) return;
          const W = /* @__PURE__ */ new Map();
          k.forEach((q) => {
            if (q.$x == null || q.$w == null) return;
            const A = Math.floor(q.$x / w),
              ft = Math.ceil((q.$x + q.$w) / w);
            for (let gt = A; gt < ft; gt++) W.set(gt, (W.get(gt) || 0) + 1);
          }),
            W.size > 0 && x.set(h, W);
        }),
        x
      );
    }, [g, H, w]),
    [nt, Mt] = kt(null),
    Ct = rt(null),
    [Et, vt] = kt(null),
    [ct, Nt] = kt(null),
    [Dt, Ot] = kt(null),
    It = rt(null);
  It.current = Dt;
  const T = rt(0),
    U = rt(!1),
    [O, dt] = kt(void 0),
    yt = rt(null),
    et = rt(null),
    St = rt(!1),
    Y = rt(null),
    [ot, $t] = kt(null),
    [Q, Pt] = kt(null),
    G = rt(null),
    [st, Ht] = kt(null),
    Tt = P(
      () =>
        st && {
          ...b.find((t) => t.id === st),
        },
      [st, D],
    ),
    [bt, At] = kt(void 0),
    i = rt(null),
    [R, S] = kt(0),
    _ = rt(null),
    it = P(() => {
      const t = _.current;
      return !!(J.length && t && t.contains(document.activeElement));
    }, [J, _.current]),
    mt = P(() => it && J[J.length - 1]?.id, [it, J]);
  ut(() => {
    if (pt && it && pt) {
      const { id: t } = pt,
        m = _.current?.querySelector(`.wx-bar[data-id='${t}']`);
      m && m.focus({ preventScroll: !0 });
    }
  }, [pt]),
    ut(() => {
      const t = _.current;
      if (t && (S(t.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const m = new ResizeObserver((x) => {
          x[0] && S(x[0].contentRect.width);
        });
        return m.observe(t), () => m.disconnect();
      }
    }, [_.current]);
  const wt = K(() => {
      document.body.style.userSelect = 'none';
    }, []),
    _t = K(() => {
      document.body.style.userSelect = '';
    }, []),
    te = P(() => {
      if (!o || !s || !H?.length) return /* @__PURE__ */ new Map();
      const t = /* @__PURE__ */ new Map(),
        m = /* @__PURE__ */ new Map(),
        x = [];
      return (
        H.forEach((h) => {
          const k = s.taskRows.get(h.id) ?? h.id;
          m.has(k) || (m.set(k, x.length), x.push(k));
        }),
        H.forEach((h) => {
          const k = s.taskRows.get(h.id) ?? h.id,
            W = m.get(k) ?? 0;
          t.set(h.id, W * I);
        }),
        t
      );
    }, [H, o, s, I]),
    Qt = P(() => {
      if (!o || !s || !H?.length) return /* @__PURE__ */ new Map();
      const t = /* @__PURE__ */ new Map(),
        m = /* @__PURE__ */ new Map(),
        x = [];
      return (
        H.forEach((h) => {
          const k = s.taskRows.get(h.id) ?? h.id;
          m.has(k) || (m.set(k, x.length), x.push(k));
        }),
        H.forEach((h) => {
          const k = h.row ?? h.id;
          if (!t.has(k)) {
            const W = s.taskRows.get(h.id) ?? h.id,
              q = m.get(W) ?? 0;
            t.set(k, q * I);
          }
        }),
        t
      );
    }, [H, o, s, I]),
    le = K(
      (t) => {
        if (!_.current) return [];
        const m = Math.min(t.startX, t.currentX),
          x = Math.max(t.startX, t.currentX),
          h = Math.min(t.startY, t.currentY),
          k = Math.max(t.startY, t.currentY);
        return H.filter((W) => {
          const q = W.$x,
            A = W.$x + W.$w,
            gt = te.get(W.id) ?? W.$y,
            Wt = gt + W.$h;
          return q < x && A > m && gt < k && Wt > h;
        });
      },
      [H, te],
    ),
    ee = K(() => {
      if (!p) return;
      const t = f.getState()._selected;
      if (!t || !t.length) return;
      const m = 864e5,
        x = t
          .map((A) => {
            if (!f.getTask(A.id)) return null;
            const gt = H.find(($e) => $e.id === A.id);
            if (!gt) return null;
            const {
                $x: Wt,
                $y: Rt,
                $h: Lt,
                $w: Bt,
                $skip: Ut,
                $level: Gt,
                ...Xt
              } = gt,
              Zt =
                gt.end && gt.start
                  ? Math.round((gt.end.getTime() - gt.start.getTime()) / m)
                  : 0,
              he = gt.start ? (gt.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...Xt,
              _durationDays: Zt,
              _startDayOfWeek: he,
              _originalWidth: Bt,
              _originalHeight: Lt,
            };
          })
          .filter(Boolean);
      if (!x.length) return;
      const k = x[0].parent,
        W = x.filter((A) => A.parent === k);
      if (W.length === 0) return;
      const q = W.reduce(
        (A, ft) => (ft.start && (!A || ft.start < A) ? ft.start : A),
        null,
      );
      (Te = W.map((A) => ({
        ...A,
        _startCellOffset: rr(A.start, q, j),
      }))),
        (Ue = k),
        (Me = q);
    }, [p, f, H, j]),
    rn = K(
      (t, m, x) => {
        if (!m.length || !t || x == null) return;
        const h = 864e5,
          k = f.getHistory();
        k?.startBatch();
        const W = new Date(t);
        W.setUTCHours(0, 0, 0, 0),
          m.forEach((q, A) => {
            const ft = `task-${Date.now()}-${A}`,
              gt = sr(W, q._startCellOffset || 0, j),
              Wt = new Date(gt.getTime() + (q._startDayOfWeek || 0) * h);
            Wt.setUTCHours(0, 0, 0, 0);
            const Rt = new Date(Wt.getTime() + (q._durationDays || 7) * h);
            Rt.setUTCHours(0, 0, 0, 0),
              f.exec('add-task', {
                task: {
                  id: ft,
                  text: q.text,
                  start: Wt,
                  end: Rt,
                  type: q.type || 'task',
                  parent: x,
                  row: q.row,
                },
                target: x,
                mode: 'child',
                skipUndo: A > 0,
              });
          }),
          k?.endBatch();
      },
      [f, j],
    );
  ut(
    () =>
      p
        ? f.intercept('hotkey', (m) => {
            if (m.key === 'ctrl+c' || m.key === 'meta+c') return ee(), !1;
            if (m.key === 'ctrl+v' || m.key === 'meta+v')
              return (
                !Te.length ||
                  !Me ||
                  Nt({
                    tasks: Te,
                    baseDate: Me,
                    parent: Ue,
                    currentX: T.current,
                  }),
                !1
              );
          })
        : void 0,
    [p, f, ee],
  ),
    ut(() => {
      if (!ct) return;
      const t = (m) => {
        m.key === 'Escape' &&
          (m.preventDefault(), m.stopPropagation(), Nt(null));
      };
      return (
        document.addEventListener('keydown', t, !0),
        () => document.removeEventListener('keydown', t, !0)
      );
    }, [ct]);
  const ae = K(
      (t, m, x) => {
        if (
          m.target.classList.contains('wx-line') ||
          (x || (x = f.getTask(Jt(t))),
          x.type === 'milestone' || x.type === 'summary')
        )
          return '';
        const h = Ft(m, 'data-segment');
        h && (t = h);
        const { left: k, width: W } = t.getBoundingClientRect(),
          q = (m.clientX - k) / W;
        let A = 0.2 / (W > 200 ? W / 200 : 1);
        return q < A ? 'start' : q > 1 - A ? 'end' : '';
      },
      [f],
    ),
    ue = K(
      (t, m) => {
        const { clientX: x } = m,
          h = Jt(t),
          k = f.getTask(h),
          W = m.target.classList;
        if (
          !m.target.closest('.wx-delete-button') &&
          !m.target.closest('[data-interactive]') &&
          !(W.contains('wx-link') || m.target.closest('.wx-link')) &&
          !r
        ) {
          if (W.contains('wx-progress-marker')) {
            const { progress: q } = f.getTask(h);
            (G.current = {
              id: h,
              x,
              progress: q,
              dx: 0,
              node: t,
              marker: m.target,
            }),
              m.target.classList.add('wx-progress-in-drag');
          } else {
            const q = ae(t, m, k) || 'move',
              A = {
                id: h,
                mode: q,
                x,
                dx: 0,
                l: k.$x,
                w: k.$w,
              };
            if (M && k.segments?.length) {
              const ft = Ft(m, 'data-segment');
              ft && ((A.segmentIndex = ft.dataset.segment * 1), Ln(k, A));
            }
            Pt(A);
          }
          wt();
        }
      },
      [f, r, ae, wt, M],
    ),
    sn = K(
      (t) => {
        if (t.button !== 0 || ct) return;
        const m = Ft(t);
        if (!m && d && !r) {
          const x = _.current;
          if (!x) return;
          const h = x.getBoundingClientRect(),
            k = t.clientX - h.left,
            W = t.clientY - h.top;
          if (p) {
            const A = Ve(k, j);
            A && ((It.current = A), Ot(A));
          }
          const q = {
            startX: k,
            startY: W,
            currentX: k,
            currentY: W,
            ctrlKey: t.ctrlKey || t.metaKey,
          };
          Mt(q), (Ct.current = q), wt();
          return;
        }
        if (m && d && !r && J.length > 1) {
          const x = Jt(m);
          if (J.some((k) => k.id === x)) {
            vt({
              startX: t.clientX,
              ids: J.map((k) => k.id),
              tasks: J.map((k) => {
                const W = f.getTask(k.id);
                return {
                  id: k.id,
                  start: W.start,
                  end: W.end,
                  $x: W.$x,
                  $w: W.$w,
                };
              }),
            }),
              wt();
            return;
          }
        }
        if (
          !r &&
          (t.target.classList.contains('wx-link') ||
            t.target.classList.contains('wx-inner'))
        ) {
          if (yt.current) return;
          const x = t.target.classList.contains('wx-link')
            ? t.target
            : t.target.closest('.wx-link');
          if (x) {
            const h = jt(x);
            if (h) {
              const k = x.classList.contains('wx-left'),
                W = { id: h, start: k };
              dt(W),
                (yt.current = W),
                (et.current = { clientX: t.clientX, clientY: t.clientY }),
                (St.current = !1),
                (U.current = !0),
                wt();
              return;
            }
          }
        }
        m && ue(m, t);
      },
      [ue, d, p, r, ct, j, J, f, wt],
    ),
    on = K(
      (t) => {
        const m = Ft(t);
        m &&
          (i.current = setTimeout(() => {
            At(!0), ue(m, t.touches[0]);
          }, 300));
      },
      [ue],
    ),
    cn = ['e2s', 's2s', 'e2e', 's2e'],
    ne = K((t, m) => cn[(t ? 1 : 0) + (m ? 0 : 2)], []),
    de = K(
      (t, m) => {
        const x = O.id,
          h = O.start;
        return t === x
          ? !0
          : !!b.find(
              (k) => k.target == t && k.source == x && k.type === ne(h, m),
            );
      },
      [O, D, ne],
    ),
    ve = K((t) => {
      Ht(t);
    }, []),
    re = K(
      (t) => {
        if (et.current) {
          const x = St.current;
          if (
            ((et.current = null),
            (St.current = !1),
            (Y.current = null),
            $t(null),
            _t(),
            x)
          ) {
            const h = yt.current,
              k = t || window.event,
              W = k ? document.elementFromPoint(k.clientX, k.clientY) : null;
            if (W && h) {
              const q = W.classList.contains('wx-link')
                ? W
                : W.closest('.wx-link');
              if (q) {
                const A = jt(q),
                  ft = q.classList.contains('wx-left');
                if (A && A !== h.id) {
                  const gt = ne(h.start, ft);
                  b.find(
                    (Rt) =>
                      Rt.target == A && Rt.source == h.id && Rt.type === gt,
                  ) ||
                    f.exec('add-link', {
                      link: {
                        source: h.id,
                        target: A,
                        type: gt,
                      },
                    });
                }
              }
            }
            dt(null), (yt.current = null), (U.current = !0);
          }
          return;
        }
        const m = Ct.current;
        if (m) {
          const x = le(m);
          m.ctrlKey
            ? x.forEach((h) => {
                f.exec('select-task', { id: h.id, toggle: !0, marquee: !0 });
              })
            : (J.length > 0 && f.exec('select-task', { id: null, marquee: !0 }),
              x.forEach((h, k) => {
                f.exec('select-task', {
                  id: h.id,
                  toggle: k > 0,
                  marquee: !0,
                });
              })),
            Mt(null),
            (Ct.current = null),
            _t(),
            (U.current = !0);
          return;
        }
        if (Et) {
          const { ids: x, tasks: h, startX: k } = Et;
          vt(null), _t(), (U.current = !0);
          return;
        }
        if (G.current) {
          const { dx: x, id: h, marker: k, value: W } = G.current;
          (G.current = null),
            typeof W < 'u' &&
              x &&
              f.exec('update-task', {
                id: h,
                task: { progress: W },
                inProgress: !1,
              }),
            k.classList.remove('wx-progress-in-drag'),
            (U.current = !0),
            _t();
        } else if (Q) {
          const {
            id: x,
            mode: h,
            dx: k,
            l: W,
            w: q,
            start: A,
            segment: ft,
            index: gt,
          } = Q;
          if ((Pt(null), A)) {
            const Wt = Math.round(k / w);
            if (!Wt)
              f.exec('drag-task', {
                id: x,
                width: q,
                left: W,
                inProgress: !1,
                ...(ft && { segmentIndex: gt }),
              });
            else {
              let Rt = {},
                Lt = f.getTask(x);
              ft && (Lt = Lt.segments[gt]);
              const Bt = 1440 * 60 * 1e3,
                Gt =
                  Wt *
                  ($ === 'week'
                    ? 7
                    : $ === 'month'
                      ? 30
                      : $ === 'quarter'
                        ? 91
                        : $ === 'year'
                          ? 365
                          : 1) *
                  Bt;
              h === 'move'
                ? ((Rt.start = new Date(Lt.start.getTime() + Gt)),
                  (Rt.end = new Date(Lt.end.getTime() + Gt)))
                : h === 'start'
                  ? ((Rt.start = new Date(Lt.start.getTime() + Gt)),
                    (Rt.end = Lt.end))
                  : h === 'end' &&
                    ((Rt.start = Lt.start),
                    (Rt.end = new Date(Lt.end.getTime() + Gt))),
                f.exec('update-task', {
                  id: x,
                  task: Rt,
                  ...(ft && { segmentIndex: gt }),
                });
            }
            U.current = !0;
          }
          _t();
        }
      },
      [f, _t, Q, w, $, ne, b],
    ),
    fe = K(
      (t, m) => {
        const { clientX: x } = m;
        if (et.current && _.current) {
          const h = et.current,
            k = x - h.clientX,
            W = m.clientY - h.clientY;
          if (!St.current) {
            if (Math.abs(k) + Math.abs(W) < 5) return;
            St.current = !0;
          }
          const q = _.current.getBoundingClientRect(),
            A = { x: x - q.left, y: m.clientY - q.top };
          (Y.current = A), $t(A);
          return;
        }
        if (p && _.current) {
          const h = _.current.getBoundingClientRect();
          T.current = x - h.left;
        }
        if (ct && _.current) {
          const h = _.current.getBoundingClientRect();
          Nt((k) => (k ? { ...k, currentX: x - h.left } : null));
        }
        if (nt) {
          const h = _.current;
          if (!h) return;
          const k = h.getBoundingClientRect(),
            W = x - k.left,
            q = m.clientY - k.top;
          Mt((A) => ({
            ...A,
            currentX: W,
            currentY: q,
          })),
            Ct.current &&
              ((Ct.current.currentX = W), (Ct.current.currentY = q));
          return;
        }
        if (!r)
          if (G.current) {
            const { node: h, x: k, id: W } = G.current,
              q = (G.current.dx = x - k),
              A = Math.round((q / h.offsetWidth) * 100);
            let ft = G.current.progress + A;
            (G.current.value = ft = Math.min(Math.max(0, ft), 100)),
              f.exec('update-task', {
                id: W,
                task: { progress: ft },
                inProgress: !0,
              });
          } else if (Q) {
            ve(null);
            const {
                mode: h,
                l: k,
                w: W,
                x: q,
                id: A,
                start: ft,
                segment: gt,
                index: Wt,
              } = Q,
              Rt = f.getTask(A),
              Lt = x - q,
              Bt = Math.round(w) || 1;
            if (
              (!ft && Math.abs(Lt) < 20) ||
              (h === 'start' && W - Lt < Bt) ||
              (h === 'end' && W + Lt < Bt) ||
              (h === 'move' &&
                ((Lt < 0 && k + Lt < 0) || (Lt > 0 && k + W + Lt > R))) ||
              (Q.segment && !Nn(Rt, Q))
            )
              return;
            const Ut = { ...Q, dx: Lt };
            let Gt, Xt;
            if (
              (h === 'start'
                ? ((Gt = k + Lt), (Xt = W - Lt))
                : h === 'end'
                  ? ((Gt = k), (Xt = W + Lt))
                  : h === 'move' && ((Gt = k + Lt), (Xt = W)),
              f.exec('drag-task', {
                id: A,
                width: Xt,
                left: Gt,
                inProgress: !0,
                start: ft,
                ...(gt && { segmentIndex: Wt }),
              }),
              !Ut.start &&
                ((h === 'move' && Rt.$x == k) || (h !== 'move' && Rt.$w == W)))
            ) {
              (U.current = !0), re();
              return;
            }
            (Ut.start = !0), Pt(Ut);
          } else {
            const h = Ft(t);
            if (h) {
              const k = f.getTask(Jt(h)),
                q = Ft(t, 'data-segment') || h,
                A = ae(q, m, k);
              q.style.cursor = A && !r ? 'col-resize' : 'pointer';
            }
          }
      },
      [f, r, Q, w, R, ae, ve, re],
    ),
    ln = K(
      (t) => {
        fe(t, t);
      },
      [fe],
    ),
    an = K(
      (t) => {
        bt
          ? (t.preventDefault(), fe(t, t.touches[0]))
          : i.current && (clearTimeout(i.current), (i.current = null));
      },
      [bt, fe],
    ),
    be = K(
      (t) => {
        re(t);
      },
      [re],
    ),
    un = K(
      (t) => {
        At(null),
          i.current && (clearTimeout(i.current), (i.current = null)),
          re(t);
      },
      [re],
    );
  ut(
    () => (
      window.addEventListener('mouseup', be),
      () => {
        window.removeEventListener('mouseup', be);
      }
    ),
    [be],
  );
  const dn = K(
      (t) => {
        if (!r) {
          if (t.target.closest('[data-interactive]')) return;
          const m = jt(t.target);
          if (m && !t.target.classList.contains('wx-link')) {
            const x = jt(t.target, 'data-segment');
            f.exec('show-editor', {
              id: m,
              ...(x !== null && { segmentIndex: x }),
            });
          }
        }
      },
      [f, r],
    ),
    De = K(() => {
      O && (dt(null), (yt.current = null));
    }, [O]),
    fn = K(
      (t) => {
        if (U.current) {
          U.current = !1;
          return;
        }
        if (ct && ct.currentX != null) {
          const x = Ve(ct.currentX, j);
          x && rn(x, ct.tasks, ct.parent), Nt(null);
          return;
        }
        if (t.target.closest('[data-interactive]')) return;
        const m = jt(t.target);
        if (m) {
          const x = t.target.classList;
          if (x.contains('wx-link')) {
            const h = x.contains('wx-left');
            if (!O) {
              const k = { id: m, start: h };
              dt(k), (yt.current = k);
              return;
            }
            O.id !== m &&
              !de(m, h) &&
              f.exec('add-link', {
                link: {
                  source: O.id,
                  target: m,
                  type: ne(O.start, h),
                },
              }),
              dt(null),
              (yt.current = null);
          } else if (x.contains('wx-delete-button-icon'))
            f.exec('delete-link', { id: st }), Ht(null);
          else {
            let h;
            const k = Ft(t, 'data-segment');
            k && (h = k.dataset.segment * 1),
              f.exec('select-task', {
                id: m,
                toggle: t.ctrlKey || t.metaKey,
                range: t.shiftKey,
                segmentIndex: h,
              });
          }
        }
        De();
      },
      [f, O, D, Tt, de, ne, De],
    ),
    hn = K((t) => {
      const m = {
        left: `${t.$x}px`,
        top: `${t.$y}px`,
        width: `${t.$w}px`,
        height: `${t.$h}px`,
      };
      return t.color && (m.backgroundColor = t.color), m;
    }, []),
    mn = K(
      (t) => ({
        left: `${t.$x_base}px`,
        top: `${t.$y_base}px`,
        width: `${t.$w_base}px`,
        height: `${t.$h_base}px`,
      }),
      [],
    ),
    gn = K(
      (t) => {
        if (bt || i.current) return t.preventDefault(), !1;
      },
      [bt],
    ),
    Le = P(() => lt.map((t) => t.id), [lt]),
    Ne = K(
      (t) => {
        let m = Le.includes(t) ? t : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(t) || (m = `task ${m}`), m
        );
      },
      [Le],
    ),
    Ie = K(
      (t) => {
        f.exec(t.action, t.data);
      },
      [f],
    ),
    ke = K((t) => at && ht.byId(t).$critical, [at, ht]),
    Se = K(
      (t) => {
        if (xt?.auto) {
          const m = ht.getSummaryId(t, !0),
            x = ht.getSummaryId(O.id, !0);
          return (
            O?.id &&
            !(Array.isArray(m) ? m : [m]).includes(O.id) &&
            !(Array.isArray(x) ? x : [x]).includes(t)
          );
        }
        return O;
      },
      [xt, ht, O],
    );
  return /* @__PURE__ */ zt('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: {
      lineHeight: `${v.length ? v[0].$h : 0}px`,
    },
    ref: _,
    onContextMenu: gn,
    onMouseDown: sn,
    onMouseMove: ln,
    onTouchStart: on,
    onTouchMove: an,
    onTouchEnd: un,
    onClick: fn,
    onDoubleClick: dn,
    onDragStart: (t) => (t.preventDefault(), !1),
    children: [
      /* @__PURE__ */ u(er, {
        onSelectLink: ve,
        selectedLink: Tt,
        readonly: r,
        linkShape: l,
        linkGradient: y,
        linkStyle: E,
        linkBundling: z,
        multiTaskRows: o,
        taskPositions: C,
        cellHeight: I,
      }),
      O &&
        ot &&
        (() => {
          const t = f.getTask(O.id);
          if (!t) return null;
          const m = O.start ? t.$x : t.$x + t.$w,
            x = t.$y + (t.$h || I) / 2;
          return /* @__PURE__ */ zt('svg', {
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
                x1: m,
                y1: x,
                x2: ot.x,
                y2: ot.y,
                stroke: 'var(--wx-gantt-link-color)',
                strokeWidth: 2,
                strokeDasharray: '6 3',
              }),
              /* @__PURE__ */ u('circle', {
                cx: ot.x,
                cy: ot.y,
                r: 4,
                fill: 'var(--wx-gantt-link-color)',
              }),
            ],
          });
        })(),
      v.map((t) => {
        if (t.$skip && t.$skip_baseline) return null;
        const m = B.has(t.id),
          x =
            `wx-bar wx-${Ne(t.type)}` +
            (bt && Q && t.id === Q.id ? ' wx-touch' : '') +
            (O && O.id === t.id ? ' wx-selected' : '') +
            (ke(t.id) ? ' wx-critical' : '') +
            (t.$reorder ? ' wx-reorder-task' : '') +
            (M && t.segments ? ' wx-split' : '') +
            (m ? ' wx-collision' : ''),
          h =
            'wx-link wx-left' +
            (O ? ' wx-visible' : '') +
            (!O || (!de(t.id, !0) && Se(t.id)) ? ' wx-target' : '') +
            (O && O.id === t.id && O.start ? ' wx-selected' : '') +
            (ke(t.id) ? ' wx-critical' : ''),
          k =
            'wx-link wx-right' +
            (O ? ' wx-visible' : '') +
            (!O || (!de(t.id, !1) && Se(t.id)) ? ' wx-target' : '') +
            (O && O.id === t.id && !O.start ? ' wx-selected' : '') +
            (ke(t.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ zt(
          pe,
          {
            children: [
              !t.$skip &&
                /* @__PURE__ */ zt('div', {
                  className: 'wx-GKbcLEGA ' + x,
                  style: hn(t),
                  'data-tooltip-id': t.id,
                  'data-id': t.id,
                  tabIndex: mt === t.id ? 0 : -1,
                  children: [
                    r
                      ? null
                      : t.id === Tt?.target && Tt?.type[2] === 's'
                        ? /* @__PURE__ */ u(He, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ u('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ u('div', {
                            className: 'wx-GKbcLEGA ' + h,
                            children: /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    t.type !== 'milestone'
                      ? /* @__PURE__ */ zt(oe, {
                          children: [
                            t.progress && !(M && t.segments)
                              ? /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ u('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${t.progress}%` },
                                  }),
                                })
                              : null,
                            !r &&
                            !(M && t.segments) &&
                            !(t.type == 'summary' && N?.autoProgress)
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
                                    api: f,
                                    onAction: Ie,
                                  }),
                                })
                              : M && t.segments
                                ? /* @__PURE__ */ u(nr, {
                                    task: t,
                                    type: Ne(t.type),
                                  })
                                : /* @__PURE__ */ u('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: t.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ zt(oe, {
                          children: [
                            /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            n
                              ? /* @__PURE__ */ u(n, {
                                  data: t,
                                  api: f,
                                  onAction: Ie,
                                })
                              : /* @__PURE__ */ u('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: t.text,
                                }),
                          ],
                        }),
                    r
                      ? null
                      : t.id === Tt?.target && Tt?.type[2] === 'e'
                        ? /* @__PURE__ */ u(He, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ u('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ u('div', {
                            className: 'wx-GKbcLEGA ' + k,
                            children: /* @__PURE__ */ u('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    m &&
                      /* @__PURE__ */ u('div', {
                        className: 'wx-GKbcLEGA wx-collision-warning',
                        title:
                          'This task overlaps with another task in the same row',
                        children: '!',
                      }),
                    Z &&
                      t.type === 'summary' &&
                      (() => {
                        const W = Z.get(t.id),
                          q = Math.floor(t.$x / w),
                          A = Math.ceil((t.$x + t.$w) / w);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: A - q }, (ft, gt) => {
                            const Wt = q + gt,
                              Rt = W?.get(Wt) || 0;
                            return /* @__PURE__ */ u(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${Rt === 0 ? ' wx-week-count-zero' : ''}`,
                                style: {
                                  position: 'absolute',
                                  left: `${Wt * w - t.$x}px`,
                                  width: `${w}px`,
                                  top: 0,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: Rt,
                              },
                              Wt,
                            );
                          }),
                        });
                      })(),
                  ],
                }),
              L && !t.$skip_baseline
                ? /* @__PURE__ */ u('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (t.type === 'milestone' ? ' wx-milestone' : ''),
                    style: mn(t),
                  })
                : null,
            ],
          },
          t.id,
        );
      }),
      nt &&
        (() => {
          const t = Math.min(nt.startX, nt.currentX),
            m = Math.min(nt.startY, nt.currentY),
            x = Math.abs(nt.currentX - nt.startX),
            h = Math.abs(nt.currentY - nt.startY);
          return /* @__PURE__ */ u('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${t}px`,
              top: `${m}px`,
              width: `${x}px`,
              height: `${h}px`,
            },
          });
        })(),
      ct &&
        ct.currentX != null &&
        ct.tasks.map((t, m) => {
          const h =
              (Math.floor(ct.currentX / w) + (t._startCellOffset || 0)) * w,
            k = t._originalWidth || w,
            W = t._originalHeight || I,
            q = Qt.get(t.row) ?? (t.$y || 0);
          return /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: h, top: q, width: k, height: W },
              children: /* @__PURE__ */ u('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: t.$barText || t.text,
              }),
            },
            `preview-${m}`,
          );
        }),
    ],
  });
}
function ir(e) {
  const { highlightTime: r, onScaleClick: n } = e,
    o = Yt(qt),
    s = tt(o, '_scales');
  return /* @__PURE__ */ u('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: s.width },
    children: (s?.rows || []).map((c, a) =>
      /* @__PURE__ */ u(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${c.height}px` },
          children: (c.cells || []).map((g, d) => {
            const p = r ? r(g.date, g.unit) : '',
              l = 'wx-cell ' + (g.css || '') + ' ' + (p || '');
            return /* @__PURE__ */ u(
              'div',
              {
                className: 'wx-ZkvhDKir ' + l,
                style: {
                  width: `${g.width}px`,
                  cursor: n ? 'pointer' : void 0,
                },
                onClick: n ? (y) => n(g.date, g.unit, y.nativeEvent) : void 0,
                children: g.value,
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
const cr = /* @__PURE__ */ new Map();
function lr(e) {
  const r = rt(null),
    n = rt(0),
    o = rt(null),
    s = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  r.current === null && (r.current = performance.now()),
    n.current++,
    ut(() => {
      if (s)
        return (
          cancelAnimationFrame(o.current),
          (o.current = requestAnimationFrame(() => {
            const c = {
              label: e,
              time: performance.now() - r.current,
              renders: n.current,
              timestamp: Date.now(),
            };
            cr.set(e, c),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: c }),
              );
          })),
          () => cancelAnimationFrame(o.current)
        );
    });
}
function ar(e) {
  const {
      readonly: r,
      fullWidth: n,
      fullHeight: o,
      taskTemplate: s,
      cellBorders: c,
      highlightTime: a,
      onScaleClick: g,
      multiTaskRows: d = !1,
      rowMapping: p = null,
      rowHeightOverrides: l = null,
      allowTaskIntersection: y = !0,
      summaryBarCounts: E = !1,
      marqueeSelect: z = !1,
      copyPaste: f = !1,
      linkShape: H,
      linkGradient: F = !1,
      linkStyle: b,
      linkBundling: D = !1,
    } = e,
    X = Yt(qt),
    [j, lt] = ie(X, '_selected'),
    L = tt(X, 'scrollTop'),
    J = tt(X, 'cellHeight'),
    pt = tt(X, 'cellWidth'),
    at = tt(X, '_scales'),
    ht = tt(X, '_markers'),
    xt = tt(X, '_scrollTask'),
    M = tt(X, 'zoom'),
    [N, V] = kt(),
    I = rt(null),
    v = tt(X, '_tasks'),
    C = 1 + (at?.rows?.length || 0),
    { taskYPositions: w, rowHeightMap: $ } = P(() => {
      if (!d || !p || !v?.length)
        return { taskYPositions: null, rowHeightMap: null };
      const T = /* @__PURE__ */ new Map(),
        U = /* @__PURE__ */ new Map(),
        O = [];
      v.forEach((et) => {
        const St = p.taskRows.get(et.id) ?? et.id;
        O.includes(St) || O.push(St);
      });
      const dt = /* @__PURE__ */ new Map();
      let yt = 0;
      for (const et of O) {
        dt.set(et, yt);
        const St = (l && l[et]) || J;
        U.set(et, St), (yt += St);
      }
      return (
        v.forEach((et) => {
          const St = p.taskRows.get(et.id) ?? et.id;
          T.set(et.id, dt.get(St) ?? 0);
        }),
        { taskYPositions: T, rowHeightMap: U }
      );
    }, [v, d, p, J, l]),
    B = P(() => {
      const T = [];
      return (
        j &&
          j.length &&
          J &&
          j.forEach((U) => {
            const O = w?.get(U.id) ?? U.$y;
            let dt = J;
            if ($ && p) {
              const yt = p.taskRows.get(U.id) ?? U.id;
              dt = $.get(yt) ?? J;
            }
            T.push({ height: `${dt}px`, top: `${O - 3}px` });
          }),
        T
      );
    }, [lt, J, w, $, p]),
    Z = P(() => Math.max(N || 0, o), [N, o]),
    nt = P(() => {
      if (
        !l ||
        !d ||
        !p ||
        !v?.length ||
        !Object.values(l).some((O) => O !== J)
      )
        return null;
      const U = [];
      return (
        v.forEach((O) => {
          const dt = p.taskRows.get(O.id) ?? O.id;
          U.includes(dt) || U.push(dt);
        }),
        U.map((O) => ({
          id: O,
          height: l[O] || J,
        }))
      );
    }, [v, p, l, d, J]);
  ut(() => {
    const T = I.current;
    T && typeof L == 'number' && (T.scrollTop = d ? 0 : L);
  }, [L, d]);
  const Mt = () => {
    Ct();
  };
  function Ct(T) {
    const U = I.current;
    if (!U) return;
    const O = {};
    (O.left = U.scrollLeft), X.exec('scroll-chart', O);
  }
  function Et() {
    const T = I.current,
      O = Math.ceil((N || 0) / (J || 1)) + 1,
      dt = Math.floor(((T && T.scrollTop) || 0) / (J || 1)),
      yt = Math.max(0, dt - C),
      et = dt + O + C,
      St = yt * (J || 0);
    X.exec('render-data', {
      start: yt,
      end: et,
      from: St,
    });
  }
  ut(() => {
    Et();
  }, [N, L]);
  const vt = K(
    (T) => {
      if (!T) return;
      const { id: U, mode: O } = T;
      if (O.toString().indexOf('x') < 0) return;
      const dt = I.current;
      if (!dt) return;
      const { clientWidth: yt } = dt,
        et = X.getTask(U);
      if (et.$x + et.$w < dt.scrollLeft)
        X.exec('scroll-chart', { left: et.$x - (pt || 0) }),
          (dt.scrollLeft = et.$x - (pt || 0));
      else if (et.$x >= yt + dt.scrollLeft) {
        const St = yt < et.$w ? pt || 0 : et.$w;
        X.exec('scroll-chart', { left: et.$x - yt + St }),
          (dt.scrollLeft = et.$x - yt + St);
      }
    },
    [X, pt],
  );
  ut(() => {
    vt(xt);
  }, [xt]);
  function ct(T) {
    if (M && (T.ctrlKey || T.metaKey)) {
      T.preventDefault();
      const U = I.current,
        O = -Math.sign(T.deltaY),
        dt = T.clientX - (U ? U.getBoundingClientRect().left : 0);
      X.exec('zoom-scale', {
        dir: O,
        offset: dt,
      });
    }
  }
  function Nt(T) {
    const U = a(T.date, T.unit);
    return U
      ? {
          css: U,
          width: T.width,
        }
      : null;
  }
  const Dt = P(
      () =>
        at && (at.minUnit === 'hour' || at.minUnit === 'day') && a
          ? at.rows[at.rows.length - 1].cells.map(Nt)
          : null,
      [at, a],
    ),
    Ot = K(
      (T) => {
        (T.eventSource = 'chart'), X.exec('hotkey', T);
      },
      [X],
    );
  ut(() => {
    const T = I.current;
    if (!T) return;
    const U = () => V(T.clientHeight);
    U();
    const O = new ResizeObserver(() => U());
    return (
      O.observe(T),
      () => {
        O.disconnect();
      }
    );
  }, [I.current]);
  const It = rt(null);
  return (
    ut(() => {
      const T = I.current;
      if (T && !It.current)
        return (
          (It.current = tn(T, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (U) => Ot(U),
          })),
          () => {
            It.current?.destroy(), (It.current = null);
          }
        );
    }, []),
    ut(() => {
      const T = I.current;
      if (!T) return;
      const U = ct;
      return (
        T.addEventListener('wheel', U),
        () => {
          T.removeEventListener('wheel', U);
        }
      );
    }, [ct]),
    lr('chart'),
    /* @__PURE__ */ zt('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: I,
      onScroll: Mt,
      children: [
        /* @__PURE__ */ u(ir, {
          highlightTime: a,
          onScaleClick: g,
          scales: at,
        }),
        ht && ht.length
          ? /* @__PURE__ */ u('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${Z}px` },
              children: ht.map((T, U) =>
                /* @__PURE__ */ u(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${T.css || ''}`,
                    style: { left: `${T.left}px` },
                    children: /* @__PURE__ */ u('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: T.text,
                    }),
                  },
                  U,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ zt('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${n}px`, height: `${Z}px` },
          children: [
            Dt
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: Dt.map((T, U) =>
                    T
                      ? /* @__PURE__ */ u(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + T.css,
                            style: {
                              width: `${T.width}px`,
                              left: `${U * T.width}px`,
                            },
                          },
                          U,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ u(Vn, { borders: c, rowLayout: nt }),
            j && j.length
              ? j.map((T, U) =>
                  T.$y
                    ? /* @__PURE__ */ u(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': T.id,
                          style: B[U],
                        },
                        T.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ u(or, {
              readonly: r,
              taskTemplate: s,
              multiTaskRows: d,
              rowMapping: p,
              rowHeightOverrides: l,
              allowTaskIntersection: y,
              summaryBarCounts: E,
              marqueeSelect: z,
              copyPaste: f,
              linkShape: H,
              linkGradient: F,
              linkStyle: b,
              linkBundling: D,
            }),
          ],
        }),
      ],
    })
  );
}
function ur(e) {
  const {
      position: r = 'after',
      size: n = 4,
      dir: o = 'x',
      onMove: s,
      onDisplayChange: c,
      compactMode: a,
      containerWidth: g = 0,
      leftThreshold: d = 50,
      rightThreshold: p = 50,
    } = e,
    [l, y] = Re(e.value ?? 0),
    [E, z] = Re(e.display ?? 'all');
  function f(w) {
    let $ = 0;
    r == 'center' ? ($ = n / 2) : r == 'before' && ($ = n);
    const B = {
      size: [n + 'px', 'auto'],
      p: [w - $ + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (o != 'x') for (let Z in B) B[Z] = B[Z].reverse();
    return B;
  }
  const [H, F] = kt(!1),
    [b, D] = kt(null),
    X = rt(0),
    j = rt(),
    lt = rt(),
    L = rt(E);
  ut(() => {
    L.current = E;
  }, [E]),
    ut(() => {
      b === null && l > 0 && D(l);
    }, [b, l]);
  function J(w) {
    return o == 'x' ? w.clientX : w.clientY;
  }
  const pt = K(
      (w) => {
        const $ = j.current + J(w) - X.current;
        y($);
        let B;
        $ <= d ? (B = 'chart') : g - $ <= p ? (B = 'grid') : (B = 'all'),
          L.current !== B && (z(B), (L.current = B)),
          lt.current && clearTimeout(lt.current),
          (lt.current = setTimeout(() => s && s($), 100));
      },
      [g, d, p, s],
    ),
    at = K(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        F(!1),
        window.removeEventListener('mousemove', pt),
        window.removeEventListener('mouseup', at);
    }, [pt]),
    ht = P(
      () => (E !== 'all' ? 'auto' : o == 'x' ? 'ew-resize' : 'ns-resize'),
      [E, o],
    ),
    xt = K(
      (w) => {
        (!a && (E === 'grid' || E === 'chart')) ||
          ((X.current = J(w)),
          (j.current = l),
          F(!0),
          (document.body.style.cursor = ht),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', pt),
          window.addEventListener('mouseup', at));
      },
      [ht, pt, at, l, a, E],
    );
  function M() {
    z('all'), b !== null && (y(b), s && s(b));
  }
  function N(w) {
    if (a) {
      const $ = E === 'chart' ? 'grid' : 'chart';
      z($), c($);
    } else if (E === 'grid' || E === 'chart') M(), c('all');
    else {
      const $ = w === 'left' ? 'chart' : 'grid';
      z($), c($);
    }
  }
  function V() {
    N('left');
  }
  function I() {
    N('right');
  }
  const v = P(() => f(l), [l, r, n, o]),
    C = [
      'wx-resizer',
      `wx-resizer-${o}`,
      `wx-resizer-display-${E}`,
      H ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ zt('div', {
    className: 'wx-pFykzMlT ' + C,
    onMouseDown: xt,
    style: { width: v.size[0], height: v.size[1], cursor: ht },
    children: [
      /* @__PURE__ */ zt('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: V,
            }),
          }),
          /* @__PURE__ */ u('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ u('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: I,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ u('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const dr = 650;
function en(e) {
  let r;
  function n() {
    (r = new ResizeObserver((s) => {
      for (let c of s)
        if (c.target === document.body) {
          let a = c.contentRect.width <= dr;
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
const fr = (e, r, n, o) => e < o && r > n;
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
function hr(e, r) {
  const n = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Map(),
    s = /* @__PURE__ */ new Map();
  return (
    e.forEach((c) => {
      if (c.type === 'summary') return;
      const a = r.taskRows.get(c.id) ?? c.id;
      s.has(a) || s.set(a, []), s.get(a).push(c);
    }),
    s.forEach((c, a) => {
      const g = [],
        d = [...c].sort((p, l) => {
          const y = Ce(p),
            E = Ce(l);
          return (y?.start ?? 0) - (E?.start ?? 0);
        });
      for (const p of d) {
        const l = Ce(p);
        if (!l) {
          n.set(p.id, 0);
          continue;
        }
        let y = !1;
        for (let E = 0; E < g.length; E++)
          if (!g[E].some((f) => fr(l.start, l.end, f.start, f.end))) {
            g[E].push(l), n.set(p.id, E), (y = !0);
            break;
          }
        y || (g.push([l]), n.set(p.id, g.length - 1));
      }
      o.set(a, g.length);
    }),
    { taskLane: n, rowLaneCounts: o }
  );
}
function mr(e, r, n) {
  const o = {};
  return (
    e.forEach((a, g) => {
      if (a <= 1) return;
      const d = 6 + a * n + (a - 1) * 4;
      d > r && (o[g] = d);
    }),
    o
  );
}
function gr(e, r) {
  if (!e && !r) return null;
  const n = {};
  let o = !1;
  if (e) for (const [s, c] of Object.entries(e)) (n[s] = c), (o = !0);
  if (r)
    for (const [s, c] of Object.entries(r))
      n[s] !== void 0 ? (n[s] = Math.max(n[s], c)) : (n[s] = c), (o = !0);
  return o ? n : null;
}
function pr(e) {
  const {
      taskTemplate: r,
      readonly: n,
      cellBorders: o,
      highlightTime: s,
      onScaleClick: c,
      onTableAPIChange: a,
      multiTaskRows: g = !1,
      rowMapping: d = null,
      rowHeightOverrides: p = null,
      allowTaskIntersection: l = !0,
      summaryBarCounts: y = !1,
      marqueeSelect: E = !1,
      copyPaste: z = !1,
      linkShape: f,
      linkGradient: H = !1,
      linkStyle: F,
      linkBundling: b = !1,
    } = e,
    D = Yt(qt),
    X = tt(D, '_tasks'),
    j = tt(D, '_scales'),
    lt = tt(D, 'cellHeight'),
    L = tt(D, 'columns'),
    J = tt(D, '_scrollTask'),
    pt = tt(D, 'undo'),
    at = P(() => {
      if (!g) return d;
      const G = /* @__PURE__ */ new Map(),
        st = /* @__PURE__ */ new Map();
      return (
        X.forEach((Ht) => {
          const Tt = Ht.row ?? Ht.id;
          st.set(Ht.id, Tt), G.has(Tt) || G.set(Tt, []), G.get(Tt).push(Ht.id);
        }),
        { rowMap: G, taskRows: st }
      );
    }, [X, g, d]),
    ht = P(() => {
      if (!g || !at || !X?.length) return p;
      const { rowLaneCounts: G } = hr(X, at),
        st = lt - 6,
        Ht = mr(G, lt, st);
      return gr(Ht, p);
    }, [X, g, at, lt, p]),
    [xt, M] = kt(!1);
  let [N, V] = kt(0);
  const [I, v] = kt(0),
    [C, w] = kt(0),
    [$, B] = kt(void 0),
    [Z, nt] = kt('all'),
    Mt = rt(null),
    Ct = K(
      (G) => {
        M(
          (st) => (
            G !== st &&
              (G
                ? ((Mt.current = Z), Z === 'all' && nt('grid'))
                : (!Mt.current || Mt.current === 'all') && nt('all')),
            G
          ),
        );
      },
      [Z],
    );
  ut(() => {
    const G = en(Ct);
    return (
      G.observe(),
      () => {
        G.disconnect();
      }
    );
  }, [Ct]);
  const Et = P(() => {
    let G;
    return (
      L.every((st) => st.width && !st.flexgrow)
        ? (G = L.reduce((st, Ht) => st + parseInt(Ht.width), 0))
        : xt && Z === 'chart'
          ? (G = parseInt(L.find((st) => st.id === 'action')?.width) || 50)
          : (G = 440),
      (N = G),
      G
    );
  }, [L, xt, Z]);
  ut(() => {
    V(Et);
  }, [Et]);
  const vt = P(() => (I ?? 0) - ($ ?? 0), [I, $]),
    ct = P(() => j.width, [j]),
    Nt = 14,
    Dt = P(() => {
      let G;
      if (!g || !at) G = X.length * lt;
      else {
        const st = [];
        X.forEach((Ht) => {
          const Tt = at.taskRows.get(Ht.id) ?? Ht.id;
          st.includes(Tt) || st.push(Tt);
        }),
          (G = 0);
        for (const Ht of st) G += (ht && ht[Ht]) || lt;
      }
      return G + Nt;
    }, [X, lt, g, at, ht]),
    Ot = P(() => j.height + Dt + vt, [j, Dt, vt]),
    It = P(() => N + ct, [N, ct]),
    T = rt(null),
    U = rt(!1),
    O = rt(null);
  ut(() => {
    const G = () => {
      (U.current = !0),
        clearTimeout(O.current),
        (O.current = setTimeout(() => {
          U.current = !1;
        }, 300));
    };
    return (
      D.on('zoom-scale', G),
      D.on('set-scale', G),
      () => {
        clearTimeout(O.current);
      }
    );
  }, [D]);
  const dt = K(() => {
      Promise.resolve().then(() => {
        if (!U.current && (I ?? 0) > (It ?? 0)) {
          const G = (I ?? 0) - N;
          D.exec('expand-scale', { minWidth: G });
        }
      });
    }, [I, It, N, D]),
    yt = rt(dt);
  (yt.current = dt),
    ut(() => {
      let G;
      return (
        T.current &&
          ((G = new ResizeObserver(() => yt.current())), G.observe(T.current)),
        () => {
          G && G.disconnect();
        }
      );
    }, [T.current]);
  const et = rt(null),
    St = rt(null),
    Y = K(() => {
      const G = et.current;
      G &&
        D.exec('scroll-chart', {
          top: G.scrollTop,
        });
    }, [D]),
    ot = rt({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  ut(() => {
    ot.current = {
      rTasks: X,
      rScales: j,
      rCellHeight: lt,
      scrollSize: vt,
      ganttDiv: et.current,
      ganttHeight: C ?? 0,
    };
  }, [X, j, lt, vt, C]);
  const $t = K(
    (G) => {
      if (!G) return;
      const {
        rTasks: st,
        rScales: Ht,
        rCellHeight: Tt,
        scrollSize: bt,
        ganttDiv: At,
        ganttHeight: i,
      } = ot.current;
      if (!At) return;
      const { id: R } = G,
        S = st.findIndex((_) => _.id === R);
      if (S > -1) {
        const _ = i - Ht.height,
          it = S * Tt,
          mt = At.scrollTop;
        let wt = null;
        it < mt ? (wt = it) : it + Tt > mt + _ && (wt = it - _ + Tt + bt),
          wt !== null &&
            (D.exec('scroll-chart', { top: Math.max(wt, 0) }),
            (et.current.scrollTop = Math.max(wt, 0)));
      }
    },
    [D],
  );
  ut(() => {
    $t(J);
  }, [J]),
    ut(() => {
      const G = et.current,
        st = St.current;
      if (!G || !st) return;
      const Ht = () => {
          On(() => {
            w(G.offsetHeight), v(G.offsetWidth), B(st.offsetWidth);
          });
        },
        Tt = new ResizeObserver(Ht);
      return Tt.observe(G), () => Tt.disconnect();
    }, [et.current]);
  const Q = rt(null),
    Pt = rt(null);
  return (
    ut(() => {
      Pt.current && (Pt.current.destroy(), (Pt.current = null));
      const G = Q.current;
      if (G)
        return (
          (Pt.current = tn(G, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': pt,
              'ctrl+y': pt,
            },
            exec: (st) => {
              st.isInput || D.exec('hotkey', st);
            },
          })),
          () => {
            Pt.current?.destroy(), (Pt.current = null);
          }
        );
    }, [pt]),
    /* @__PURE__ */ u('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: et,
      onScroll: Y,
      children: /* @__PURE__ */ u('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: Ot, width: '100%' },
        ref: St,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: C,
            width: $,
          },
          children: /* @__PURE__ */ zt('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: Q,
            children: [
              L.length
                ? /* @__PURE__ */ zt(oe, {
                    children: [
                      /* @__PURE__ */ u(Fn, {
                        display: Z,
                        compactMode: xt,
                        columnWidth: Et,
                        width: N,
                        readonly: n,
                        fullHeight: Dt,
                        onTableAPIChange: a,
                        multiTaskRows: g,
                        rowMapping: at,
                        rowHeightOverrides: ht,
                      }),
                      /* @__PURE__ */ u(ur, {
                        value: N,
                        display: Z,
                        compactMode: xt,
                        containerWidth: I,
                        onMove: (G) => V(G),
                        onDisplayChange: (G) => nt(G),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ u('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: T,
                children: /* @__PURE__ */ u(ar, {
                  readonly: n,
                  fullWidth: ct,
                  fullHeight: Dt,
                  taskTemplate: r,
                  cellBorders: o,
                  highlightTime: s,
                  onScaleClick: c,
                  multiTaskRows: g,
                  rowMapping: at,
                  rowHeightOverrides: ht,
                  allowTaskIntersection: l,
                  summaryBarCounts: y,
                  marqueeSelect: E,
                  copyPaste: z,
                  linkShape: f,
                  linkGradient: H,
                  linkStyle: F,
                  linkBundling: b,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function wr(e) {
  return {
    year: '%Y',
    quarter: `${e('Q')} %Q`,
    month: '%M',
    week: `${e('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function xr(e, r) {
  return typeof e == 'function' ? e : we(e, r);
}
function nn(e, r) {
  return e.map(({ format: n, ...o }) => ({
    ...o,
    format: xr(n, r),
  }));
}
function yr(e, r) {
  const n = wr(r);
  for (let o in n) n[o] = we(n[o], e);
  return n;
}
function vr(e, r) {
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
function br(e, r) {
  return e.levels
    ? {
        ...e,
        levels: e.levels.map((n) => ({
          ...n,
          scales: nn(n.scales, r),
        })),
      }
    : e;
}
const kr = (e) =>
    e
      .split('-')
      .map((r) => (r ? r.charAt(0).toUpperCase() + r.slice(1) : ''))
      .join(''),
  $r = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  Tr = [],
  Mr = [],
  Cr = [],
  Rr = [],
  Er = { type: 'forward' },
  Vr = qe(function (
    {
      taskTemplate: r = null,
      markers: n = Tr,
      taskTypes: o = An,
      tasks: s = Mr,
      selected: c = Cr,
      activeTask: a = null,
      links: g = Rr,
      scales: d = $r,
      columns: p = Pn,
      start: l = null,
      end: y = null,
      lengthUnit: E = 'day',
      durationUnit: z = 'day',
      cellWidth: f = 100,
      cellHeight: H = 38,
      scaleHeight: F = 36,
      readonly: b = !1,
      cellBorders: D = 'full',
      zoom: X = !1,
      baselines: j = !1,
      highlightTime: lt = null,
      onScaleClick: L = null,
      init: J = null,
      autoScale: pt = !0,
      unscheduledTasks: at = !1,
      criticalPath: ht = null,
      schedule: xt = Er,
      projectStart: M = null,
      projectEnd: N = null,
      calendar: V = null,
      undo: I = !1,
      splitTasks: v = !1,
      multiTaskRows: C = !1,
      rowHeightOverrides: w = null,
      allowTaskIntersection: $ = !0,
      summaryBarCounts: B = !1,
      marqueeSelect: Z = !1,
      copyPaste: nt = !1,
      linkShape: Mt,
      linkGradient: Ct = !1,
      linkStyle: Et,
      linkBundling: vt = !1,
      summary: ct = null,
      _export: Nt = !1,
      ...Dt
    },
    Ot,
  ) {
    const It = rt();
    It.current = Dt;
    const T = P(() => new In(_n), []),
      U = P(() => ({ ...Ee, ...ye }), []),
      O = Yt(Kt.i18n),
      dt = P(() => (O ? O.extend(U, !0) : xe(U)), [O, U]),
      yt = P(() => dt.getRaw().calendar, [dt]),
      et = P(() => {
        let bt = {
          zoom: br(X, yt),
          scales: nn(d, yt),
          columns: vr(p, yt),
          links: Sn(g),
          cellWidth: f,
        };
        return (
          bt.zoom &&
            (bt = {
              ...bt,
              ...Hn(bt.zoom, yr(yt, dt.getGroup('gantt')), bt.scales, f),
            }),
          bt
        );
      }, [X, d, p, g, f, yt, dt]),
      St = rt(null);
    St.current !== s &&
      (Nt || _e(s, { durationUnit: z, splitTasks: v, calendar: V }),
      (St.current = s)),
      ut(() => {
        Nt || _e(s, { durationUnit: z, splitTasks: v, calendar: V });
      }, [s, z, V, v, Nt]);
    const Y = P(() => {
        if (!C) return null;
        const bt = /* @__PURE__ */ new Map(),
          At = /* @__PURE__ */ new Map(),
          i = (R) => {
            R.forEach((S) => {
              const _ = S.row ?? S.id;
              At.set(S.id, _),
                bt.has(_) || bt.set(_, []),
                bt.get(_).push(S.id),
                S.data && S.data.length > 0 && i(S.data);
            });
          };
        return i(s), { rowMap: bt, taskRows: At };
      }, [s, C]),
      ot = P(() => T.in, [T]),
      $t = rt(null);
    $t.current === null &&
      (($t.current = new En((bt, At) => {
        const i = 'on' + kr(bt);
        It.current && It.current[i] && It.current[i](At);
      })),
      ot.setNext($t.current));
    const [Q, Pt] = kt(null),
      G = rt(null);
    G.current = Q;
    const st = P(
      () => ({
        getState: T.getState.bind(T),
        getReactiveState: T.getReactive.bind(T),
        getStores: () => ({ data: T }),
        exec: ot.exec.bind(ot),
        setNext: (bt) => (($t.current = $t.current.setNext(bt)), $t.current),
        intercept: ot.intercept.bind(ot),
        on: ot.on.bind(ot),
        detach: ot.detach.bind(ot),
        getTask: T.getTask.bind(T),
        serialize: () => T.serialize(),
        getTable: (bt) =>
          bt
            ? new Promise((At) => setTimeout(() => At(G.current), 1))
            : G.current,
        getHistory: () => T.getHistory(),
      }),
      [T, ot],
    );
    ut(() => {
      const bt = () => {
        const { zoom: At, scales: i } = st.getState(),
          S = At?.levels?.[At.level]?.scales?.[0]?.unit ?? i?.[0]?.unit;
        S && st.exec('scale-change', { level: At?.level, unit: S });
      };
      st.on('zoom-scale', bt), st.on('set-scale', bt);
    }, [st]),
      ut(() => {
        st.intercept('set-scale', ({ unit: bt, date: At }) => {
          const { zoom: i } = st.getState();
          if (!i || !i.levels) return !1;
          const R = i.levels.findIndex((it) =>
            it.scales.some((mt) => mt.unit === bt),
          );
          if (R < 0) return !1;
          const S = i.levels[R];
          if (R !== i.level) {
            const it = Math.round((S.minCellWidth + S.maxCellWidth) / 2);
            st.getStores().data.setState({
              scales: S.scales,
              cellWidth: it,
              _cellWidth: it,
              zoom: { ...i, level: R },
              ...(At ? { _scaleDate: At, _zoomOffset: 0 } : {}),
            });
          } else if (At) {
            const { _scales: it, cellWidth: mt } = st.getState(),
              wt = it.diff(At, it.start, it.lengthUnit),
              _t = Math.max(0, Math.round(wt * mt));
            st.exec('scroll-chart', { left: _t });
          }
          return !1;
        });
      }, [st]),
      je(
        Ot,
        () => ({
          ...st,
        }),
        [st],
      );
    const Ht = rt(0);
    ut(() => {
      Ht.current
        ? T.init({
            tasks: s,
            links: et.links,
            start: l,
            columns: et.columns,
            end: y,
            lengthUnit: E,
            cellWidth: et.cellWidth,
            cellHeight: H,
            scaleHeight: F,
            scales: et.scales,
            taskTypes: o,
            zoom: et.zoom,
            selected: c,
            activeTask: a,
            baselines: j,
            autoScale: pt,
            unscheduledTasks: at,
            markers: n,
            durationUnit: z,
            criticalPath: ht,
            schedule: xt,
            projectStart: M,
            projectEnd: N,
            calendar: V,
            undo: I,
            _weekStart: yt.weekStart,
            splitTasks: v,
            summary: ct,
          })
        : J && J(st),
        Ht.current++;
    }, [
      st,
      J,
      s,
      et,
      l,
      y,
      E,
      H,
      F,
      o,
      c,
      a,
      j,
      pt,
      at,
      n,
      z,
      ht,
      xt,
      M,
      N,
      V,
      I,
      yt,
      v,
      ct,
      T,
    ]),
      Ht.current === 0 &&
        T.init({
          tasks: s,
          links: et.links,
          start: l,
          columns: et.columns,
          end: y,
          lengthUnit: E,
          cellWidth: et.cellWidth,
          cellHeight: H,
          scaleHeight: F,
          scales: et.scales,
          taskTypes: o,
          zoom: et.zoom,
          selected: c,
          activeTask: a,
          baselines: j,
          autoScale: pt,
          unscheduledTasks: at,
          markers: n,
          durationUnit: z,
          criticalPath: ht,
          schedule: xt,
          projectStart: M,
          projectEnd: N,
          calendar: V,
          undo: I,
          _weekStart: yt.weekStart,
          splitTasks: v,
          summary: ct,
        });
    const Tt = P(
      () =>
        V
          ? (bt, At) =>
              (At == 'day' && !V.getDayHours(bt)) ||
              (At == 'hour' && !V.getDayHours(bt))
                ? 'wx-weekend'
                : ''
          : lt,
      [V, lt],
    );
    return /* @__PURE__ */ u(Kt.i18n.Provider, {
      value: dt,
      children: /* @__PURE__ */ u(qt.Provider, {
        value: st,
        children: /* @__PURE__ */ u(pr, {
          taskTemplate: r,
          readonly: b,
          cellBorders: D,
          highlightTime: Tt,
          onScaleClick: L,
          onTableAPIChange: Pt,
          multiTaskRows: C,
          rowMapping: Y,
          rowHeightOverrides: w,
          allowTaskIntersection: $,
          summaryBarCounts: B,
          marqueeSelect: Z,
          copyPaste: nt,
          linkShape: Mt,
          linkGradient: Ct,
          linkStyle: Et,
          linkBundling: vt,
        }),
      }),
    });
  });
function qr({ api: e = null, items: r = [] }) {
  const n = Yt(Kt.i18n),
    o = P(() => n || xe(ye), [n]),
    s = P(() => o.getGroup('gantt'), [o]),
    c = Vt(e, '_selected'),
    a = Vt(e, 'undo'),
    g = Vt(e, 'history'),
    d = Vt(e, 'splitTasks'),
    p = ['undo', 'redo'],
    l = P(() => {
      const E = We({ undo: !0, splitTasks: !0 });
      return (
        r.length
          ? r
          : We({
              undo: a,
              splitTasks: d,
            })
      ).map((f) => {
        let H = { ...f, disabled: !1 };
        return (
          (H.handler = Je(E, H.id) ? (F) => Ze(e, F.id, null, s) : H.handler),
          H.text && (H.text = s(H.text)),
          H.menuText && (H.menuText = s(H.menuText)),
          H
        );
      });
    }, [r, e, s, a, d]),
    y = P(() => {
      const E = [];
      return (
        l.forEach((z) => {
          const f = z.id;
          if (f === 'add-task') E.push(z);
          else if (p.includes(f))
            p.includes(f) &&
              E.push({
                ...z,
                disabled: z.isDisabled(g),
              });
          else {
            if (!c?.length || !e) return;
            E.push({
              ...z,
              disabled:
                z.isDisabled && c.some((H) => z.isDisabled(H, e.getState())),
            });
          }
        }),
        E.filter((z, f) => {
          if (e && z.isHidden)
            return !c.some((H) => z.isHidden(H, e.getState()));
          if (z.comp === 'separator') {
            const H = E[f + 1];
            if (!H || H.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [e, c, g, l]);
  return n
    ? /* @__PURE__ */ u(Oe, { items: y })
    : /* @__PURE__ */ u(Kt.i18n.Provider, {
        value: o,
        children: /* @__PURE__ */ u(Oe, { items: y }),
      });
}
const jr = qe(function (
  {
    options: r = [],
    api: n = null,
    resolver: o = null,
    filter: s = null,
    at: c = 'point',
    children: a,
    onClick: g,
    css: d,
  },
  p,
) {
  const l = rt(null),
    y = rt(null),
    E = Yt(Kt.i18n),
    z = P(() => E || xe({ ...ye, ...Ee }), [E]),
    f = P(() => z.getGroup('gantt'), [z]),
    H = Vt(n, 'taskTypes'),
    F = Vt(n, 'selected'),
    b = Vt(n, '_selected'),
    D = Vt(n, 'splitTasks'),
    X = Vt(n, 'summary'),
    j = P(
      () => ({
        splitTasks: D,
        taskTypes: H,
        summary: X,
      }),
      [D, H, X],
    ),
    lt = P(() => Ge(j), [j]);
  ut(() => {
    n &&
      (n.on('scroll-chart', () => {
        l.current && l.current.show && l.current.show();
      }),
      n.on('drag-task', () => {
        l.current && l.current.show && l.current.show();
      }));
  }, [n]);
  function L(I) {
    return I.map(
      (v) => (
        (v = { ...v }),
        v.text && (v.text = f(v.text)),
        v.subtext && (v.subtext = f(v.subtext)),
        v.data && (v.data = L(v.data)),
        v
      ),
    );
  }
  function J() {
    const I = r.length ? r : Ge(j);
    return L(I);
  }
  const pt = P(() => J(), [n, r, j, f]),
    at = P(() => (b && b.length ? b : []), [b]),
    ht = K(
      (I, v) => {
        let C = I ? n?.getTask(I) : null;
        if (o) {
          const w = o(I, v);
          C = w === !0 ? C : w;
        }
        if (C) {
          const w = jt(v.target, 'data-segment');
          w !== null
            ? (y.current = { id: C.id, segmentIndex: w })
            : (y.current = C.id),
            (!Array.isArray(F) || !F.includes(C.id)) &&
              n &&
              n.exec &&
              n.exec('select-task', { id: C.id });
        }
        return C;
      },
      [n, o, F],
    ),
    xt = K(
      (I) => {
        const v = I.action;
        v && (Je(lt, v.id) && Ze(n, v.id, y.current, f), g && g(I));
      },
      [n, f, g, lt],
    ),
    M = K(
      (I, v) => {
        const C = at.length ? at : v ? [v] : [];
        let w = s ? C.every(($) => s(I, $)) : !0;
        if (
          w &&
          (I.isHidden &&
            (w = !C.some(($) => I.isHidden($, n.getState(), y.current))),
          I.isDisabled)
        ) {
          const $ = C.some((B) => I.isDisabled(B, n.getState(), y.current));
          I.disabled = $;
        }
        return w;
      },
      [s, at, n],
    );
  je(p, () => ({
    show: (I, v) => {
      l.current && l.current.show && l.current.show(I, v);
    },
  }));
  const N = K((I) => {
      l.current && l.current.show && l.current.show(I);
    }, []),
    V = /* @__PURE__ */ zt(oe, {
      children: [
        /* @__PURE__ */ u(Yn, {
          filter: M,
          options: pt,
          dataKey: 'id',
          resolver: ht,
          onClick: xt,
          at: c,
          ref: l,
          css: d,
        }),
        /* @__PURE__ */ u('span', {
          onContextMenu: N,
          'data-menu-ignore': 'true',
          children: typeof a == 'function' ? a() : a,
        }),
      ],
    });
  if (!E && Kt.i18n?.Provider) {
    const I = Kt.i18n.Provider;
    return /* @__PURE__ */ u(I, { value: z, children: V });
  }
  return V;
});
function Dr({ api: e, autoSave: r, onLinksChange: n }) {
  const s = Yt(Kt.i18n).getGroup('gantt'),
    c = tt(e, 'activeTask'),
    a = tt(e, '_activeTask'),
    g = tt(e, '_links'),
    d = tt(e, 'schedule'),
    p = tt(e, 'unscheduledTasks'),
    [l, y] = kt();
  function E() {
    if (c) {
      const F = g
          .filter((D) => D.target == c)
          .map((D) => ({ link: D, task: e.getTask(D.source) })),
        b = g
          .filter((D) => D.source == c)
          .map((D) => ({ link: D, task: e.getTask(D.target) }));
      return [
        { title: s('Predecessors'), data: F },
        { title: s('Successors'), data: b },
      ];
    }
  }
  ut(() => {
    y(E());
  }, [c, g]);
  const z = P(
    () => [
      { id: 'e2s', label: s('End-to-start') },
      { id: 's2s', label: s('Start-to-start') },
      { id: 'e2e', label: s('End-to-end') },
      { id: 's2e', label: s('Start-to-end') },
    ],
    [s],
  );
  function f(F) {
    r
      ? e.exec('delete-link', { id: F })
      : (y((b) =>
          (b || []).map((D) => ({
            ...D,
            data: D.data.filter((X) => X.link.id !== F),
          })),
        ),
        n &&
          n({
            id: F,
            action: 'delete-link',
            data: { id: F },
          }));
  }
  function H(F, b) {
    r
      ? e.exec('update-link', {
          id: F,
          link: b,
        })
      : (y((D) =>
          (D || []).map((X) => ({
            ...X,
            data: X.data.map((j) =>
              j.link.id === F ? { ...j, link: { ...j.link, ...b } } : j,
            ),
          })),
        ),
        n &&
          n({
            id: F,
            action: 'update-link',
            data: {
              id: F,
              link: b,
            },
          }));
  }
  return /* @__PURE__ */ u(oe, {
    children: (l || []).map((F, b) =>
      F.data.length
        ? /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ u(Kt.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ u(wn, {
                  label: F.title,
                  position: 'top',
                  children: /* @__PURE__ */ u('table', {
                    children: /* @__PURE__ */ u('tbody', {
                      children: F.data.map((D) =>
                        /* @__PURE__ */ zt(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: D.task.text || '',
                                }),
                              }),
                              d?.auto && D.link.type === 'e2s'
                                ? /* @__PURE__ */ u('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ u(xn, {
                                      type: 'number',
                                      placeholder: s('Lag'),
                                      value: D.link.lag,
                                      disabled: p && a?.unscheduled,
                                      onChange: (X) => {
                                        X.input ||
                                          H(D.link.id, { lag: X.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ u(yn, {
                                    value: D.link.type,
                                    placeholder: s('Select link type'),
                                    options: z,
                                    onChange: (X) =>
                                      H(D.link.id, { type: X.value }),
                                    children: ({ option: X }) => X.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => f(D.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          D.link.id,
                        ),
                      ),
                    }),
                  }),
                }),
              }),
            },
            b,
          )
        : null,
    ),
  });
}
function Lr(e) {
  const { value: r, time: n, format: o, onchange: s, onChange: c, ...a } = e,
    g = c ?? s;
  function d(p) {
    const l = new Date(p.value);
    l.setHours(r.getHours()),
      l.setMinutes(r.getMinutes()),
      g && g({ value: l });
  }
  return /* @__PURE__ */ zt('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ u(vn, {
        ...a,
        value: r,
        onChange: d,
        format: o,
        buttons: ['today'],
        clear: !1,
      }),
      n ? /* @__PURE__ */ u(bn, { value: r, onChange: g, format: o }) : null,
    ],
  });
}
se('select', $n);
se('date', Lr);
se('twostate', Tn);
se('slider', Mn);
se('counter', Cn);
se('links', Dr);
function Qr({
  api: e,
  items: r = [],
  css: n = '',
  layout: o = 'default',
  readonly: s = !1,
  placement: c = 'sidebar',
  bottomBar: a = !0,
  topBar: g = !0,
  autoSave: d = !0,
  focus: p = !1,
  hotkeys: l = {},
}) {
  const y = Yt(Kt.i18n),
    E = P(() => y || xe({ ...ye, ...Ee }), [y]),
    z = P(() => E.getGroup('gantt'), [E]),
    f = E.getRaw(),
    H = P(() => {
      const Y = f.gantt?.dateFormat || f.formats?.dateFormat;
      return we(Y, f.calendar);
    }, [f]),
    F = P(() => {
      if (g === !0 && !s) {
        const Y = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: z('Delete'),
            id: 'delete',
          },
        ];
        return d
          ? { items: Y }
          : {
              items: [
                ...Y,
                {
                  comp: 'button',
                  type: 'primary',
                  text: z('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return g;
    }, [g, s, d, z]),
    [b, D] = kt(!1),
    X = P(() => (b ? 'wx-full-screen' : ''), [b]),
    j = K((Y) => {
      D(Y);
    }, []);
  ut(() => {
    const Y = en(j);
    return (
      Y.observe(),
      () => {
        Y.disconnect();
      }
    );
  }, [j]);
  const lt = tt(e, '_activeTask'),
    L = tt(e, 'activeTask'),
    J = tt(e, 'unscheduledTasks'),
    pt = tt(e, 'summary'),
    at = tt(e, 'links'),
    ht = tt(e, 'splitTasks'),
    xt = P(() => ht && L?.segmentIndex, [ht, L]),
    M = P(() => xt || xt === 0, [xt]),
    N = tt(e, 'taskTypes'),
    V = P(
      () => zn({ unscheduledTasks: J, summary: pt, taskTypes: N }),
      [J, pt, N],
    ),
    I = tt(e, 'undo'),
    [v, C] = kt({}),
    [w, $] = kt(null),
    [B, Z] = kt(),
    [nt, Mt] = kt(null),
    Ct = P(() => {
      if (!lt) return null;
      let Y;
      if (
        (M && lt.segments ? (Y = { ...lt.segments[xt] }) : (Y = { ...lt }), s)
      ) {
        let ot = { parent: Y.parent };
        return (
          V.forEach(({ key: $t, comp: Q }) => {
            if (Q !== 'links') {
              const Pt = Y[$t];
              Q === 'date' && Pt instanceof Date
                ? (ot[$t] = H(Pt))
                : Q === 'slider' && $t === 'progress'
                  ? (ot[$t] = `${Pt}%`)
                  : (ot[$t] = Pt);
            }
          }),
          ot
        );
      }
      return Y || null;
    }, [lt, M, xt, s, V, H]);
  ut(() => {
    Z(Ct);
  }, [Ct]),
    ut(() => {
      C({}), Mt(null), $(null);
    }, [L]);
  function Et(Y, ot) {
    return Y.map(($t) => {
      const Q = { ...$t };
      if (
        ($t.config && (Q.config = { ...Q.config }),
        Q.comp === 'links' &&
          e &&
          ((Q.api = e), (Q.autoSave = d), (Q.onLinksChange = Nt)),
        Q.comp === 'select' && Q.key === 'type')
      ) {
        const Pt = Q.options ?? [];
        Q.options = Pt.map((G) => ({
          ...G,
          label: z(G.label),
        }));
      }
      return (
        Q.comp === 'slider' &&
          Q.key === 'progress' &&
          (Q.labelTemplate = (Pt) => `${z(Q.label)} ${Pt}%`),
        Q.label && (Q.label = z(Q.label)),
        Q.config?.placeholder &&
          (Q.config.placeholder = z(Q.config.placeholder)),
        ot &&
          (Q.isDisabled && Q.isDisabled(ot, e.getState())
            ? (Q.disabled = !0)
            : delete Q.disabled),
        Q
      );
    });
  }
  const vt = P(() => {
      let Y = r.length ? r : V;
      return (
        (Y = Et(Y, B)),
        B ? Y.filter((ot) => !ot.isHidden || !ot.isHidden(B, e.getState())) : Y
      );
    }, [r, V, B, z, e, d]),
    ct = P(() => vt.map((Y) => Y.key), [vt]);
  function Nt({ id: Y, action: ot, data: $t }) {
    C((Q) => ({
      ...Q,
      [Y]: { action: ot, data: $t },
    }));
  }
  const Dt = K(() => {
      for (let Y in v)
        if (at.byId(Y)) {
          const { action: ot, data: $t } = v[Y];
          e.exec(ot, $t);
        }
    }, [e, v, at]),
    Ot = K(() => {
      const Y = L?.id || L;
      if (M) {
        if (lt?.segments) {
          const ot = lt.segments.filter(($t, Q) => Q !== xt);
          e.exec('update-task', {
            id: Y,
            task: { segments: ot },
          });
        }
      } else e.exec('delete-task', { id: Y });
    }, [e, L, M, lt, xt]),
    It = K(() => {
      e.exec('show-editor', { id: null });
    }, [e]),
    T = K(
      (Y) => {
        const { item: ot, changes: $t } = Y;
        ot.id === 'delete' && Ot(),
          ot.id === 'save' && ($t.length ? It() : Dt()),
          ot.comp && It();
      },
      [e, L, d, Dt, Ot, It],
    ),
    U = K(
      (Y, ot, $t) => (
        J && Y.type === 'summary' && (Y.unscheduled = !1),
        Qe(Y, e.getState(), ot),
        $t || $(!1),
        Y
      ),
      [J, e],
    ),
    O = K(
      (Y) => {
        (Y = {
          ...Y,
          unscheduled: J && Y.unscheduled && Y.type !== 'summary',
        }),
          delete Y.links,
          delete Y.data,
          (ct.indexOf('duration') === -1 || (Y.segments && !Y.duration)) &&
            delete Y.duration;
        const ot = {
          id: L?.id || L,
          task: Y,
          ...(M && { segmentIndex: xt }),
        };
        d && w && (ot.inProgress = w), e.exec('update-task', ot), d || Dt();
      },
      [e, L, J, d, Dt, ct, M, xt, w],
    ),
    dt = K(
      (Y) => {
        let { update: ot, key: $t, input: Q } = Y;
        if ((Q && $(!0), (Y.update = U({ ...ot }, $t, Q)), !d)) Z(Y.update);
        else if (!nt && !Q) {
          const Pt = vt.find((Ht) => Ht.key === $t),
            G = ot[$t];
          (!Pt.validation || Pt.validation(G)) &&
            (!Pt.required || G) &&
            O(Y.update);
        }
      },
      [d, U, nt, vt, O],
    ),
    yt = K(
      (Y) => {
        d || O(Y.values);
      },
      [d, O],
    ),
    et = K((Y) => {
      Mt(Y.errors);
    }, []),
    St = P(
      () =>
        I
          ? {
              'ctrl+z': (Y) => {
                Y.preventDefault(), e.exec('undo');
              },
              'ctrl+y': (Y) => {
                Y.preventDefault(), e.exec('redo');
              },
            }
          : {},
      [I, e],
    );
  return Ct
    ? /* @__PURE__ */ u(kn, {
        children: /* @__PURE__ */ u(Xn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${X} ${n}`,
          items: vt,
          values: Ct,
          topBar: F,
          bottomBar: a,
          placement: c,
          layout: o,
          readonly: s,
          autoSave: d,
          focus: p,
          onAction: T,
          onSave: yt,
          onValidation: et,
          onChange: dt,
          hotkeys: l && { ...St, ...l },
        }),
      })
    : null;
}
const Zr = ({ children: e, columns: r = null, api: n }) => {
  const [o, s] = kt(null);
  return (
    ut(() => {
      n && n.getTable(!0).then(s);
    }, [n]),
    /* @__PURE__ */ u(Gn, { api: o, columns: r, children: e })
  );
};
function Jr(e) {
  const { api: r, content: n, filter: o, children: s } = e,
    c = rt(null),
    a = rt(null),
    [g, d] = kt({}),
    [p, l] = kt(null),
    [y, E] = kt(null),
    [z, f] = kt(!1),
    H = rt(null),
    F = rt(!1),
    b = rt(null),
    D = rt(null),
    X = 300,
    j = 400;
  function lt(w) {
    for (; w; ) {
      if (w.getAttribute) {
        const $ = w.getAttribute('data-tooltip-id'),
          B = w.getAttribute('data-tooltip-at'),
          Z = w.getAttribute('data-tooltip');
        if ($ || Z) return { id: $, tooltip: Z, target: w, at: B };
      }
      w = w.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  ut(() => {
    const w = a.current;
    if (!z && w && y && (y.text || n)) {
      const $ = w.getBoundingClientRect();
      let B = !1,
        Z = y.left,
        nt = y.top;
      $.right >= g.right && ((Z = g.width - $.width - 5), (B = !0)),
        $.bottom >= g.bottom &&
          ((nt = y.top - ($.bottom - g.bottom + 2)), (B = !0)),
        B && E((Mt) => Mt && { ...Mt, left: Z, top: nt });
    }
  }, [y, g, n, z]);
  const L = K(() => {
      clearTimeout(b.current),
        clearTimeout(D.current),
        (b.current = null),
        (D.current = null),
        (H.current = null),
        (F.current = !1),
        E(null),
        l(null),
        f(!1);
    }, []),
    J = K(() => {
      clearTimeout(D.current),
        (D.current = setTimeout(() => {
          (D.current = null), !H.current && !F.current && L();
        }, j));
    }, [L]),
    pt = K(() => {
      clearTimeout(D.current), (D.current = null);
    }, []);
  function at(w) {
    if (a.current && a.current.contains(w.target)) return;
    let { id: $, tooltip: B, target: Z, at: nt } = lt(w.target);
    if (!$ && !B) {
      clearTimeout(b.current),
        (b.current = null),
        (H.current = null),
        !F.current && !D.current && J();
      return;
    }
    if ((pt(), B || (B = I($)), H.current === $)) return;
    (H.current = $), clearTimeout(b.current), E(null), l(null), f(!1);
    const Mt = w.clientX;
    b.current = setTimeout(() => {
      b.current = null;
      const Ct = $ ? V(v($)) : null;
      if (o && Ct && !o(Ct)) {
        H.current = null;
        return;
      }
      Ct && l(Ct);
      const Et = Z.getBoundingClientRect(),
        vt = c.current,
        ct = vt
          ? vt.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let Nt, Dt;
      nt === 'left'
        ? ((Nt = Et.top + 5 - ct.top), (Dt = Et.right + 5 - ct.left))
        : ((Nt = Et.top + Et.height - ct.top), (Dt = Mt - ct.left)),
        d(ct),
        E({ top: Nt, left: Dt, text: B });
    }, X);
  }
  function ht() {
    (F.current = !0), pt();
  }
  function xt() {
    (F.current = !1), H.current || J();
  }
  function M(w) {
    const $ = w.touches[0];
    if (!$) return;
    const { id: B, target: Z } = lt(w.target);
    if (!B) return;
    clearTimeout(b.current), clearTimeout(D.current);
    const nt = V(v(B));
    if (o && nt && !o(nt)) return;
    const Mt = nt?.text || '',
      Ct = Z.getBoundingClientRect(),
      Et = c.current,
      vt = Et
        ? Et.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    l(nt),
      d(vt),
      f(!0),
      E({
        top: Ct.top - vt.top - 8,
        left: $.clientX - vt.left,
        text: Mt,
      });
  }
  function N() {
    L();
  }
  function V(w) {
    return r?.getTask(v(w)) || null;
  }
  function I(w) {
    return V(w)?.text || '';
  }
  function v(w) {
    const $ = Number(w);
    return Number.isFinite($) ? $ : w;
  }
  ut(
    () => () => {
      clearTimeout(b.current), clearTimeout(D.current);
    },
    [],
  );
  const C = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    z ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ zt('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: c,
    onMouseMove: at,
    onTouchStart: M,
    onTouchEnd: N,
    onTouchMove: N,
    children: [
      y && (y.text || n)
        ? /* @__PURE__ */ u('div', {
            className: C,
            ref: a,
            style: { top: `${y.top}px`, left: `${y.left}px` },
            onMouseEnter: ht,
            onMouseLeave: xt,
            children: n
              ? /* @__PURE__ */ u(n, { data: p, api: r })
              : y.text
                ? /* @__PURE__ */ u('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: y.text,
                  })
                : null,
          })
        : null,
      s,
    ],
  });
}
function ts({ fonts: e = !0, children: r }) {
  return r
    ? /* @__PURE__ */ u(Pe, { fonts: e, children: r() })
    : /* @__PURE__ */ u(Pe, { fonts: e });
}
function es({ fonts: e = !0, children: r }) {
  return r
    ? /* @__PURE__ */ u(Ae, { fonts: e, children: r })
    : /* @__PURE__ */ u(Ae, { fonts: e });
}
function ns({ fonts: e = !0, children: r }) {
  return r
    ? /* @__PURE__ */ u(ze, { fonts: e, children: r })
    : /* @__PURE__ */ u(ze, { fonts: e });
}
const Nr = '2.9.0',
  Ir = {
    version: Nr,
  },
  rs = Ir.version;
export {
  jr as ContextMenu,
  Qr as Editor,
  Vr as Gantt,
  Zr as HeaderMenu,
  ts as Material,
  qr as Toolbar,
  Jr as Tooltip,
  es as Willow,
  ns as WillowDark,
  is as defaultColumns,
  cs as defaultEditorItems,
  ls as defaultMenuOptions,
  as as defaultTaskTypes,
  us as defaultToolbarButtons,
  ds as getEditorItems,
  fs as getMenuOptions,
  hs as getToolbarButtons,
  ps as registerEditorItem,
  ms as registerScaleUnit,
  rs as version,
};
//# sourceMappingURL=index.es.js.map
