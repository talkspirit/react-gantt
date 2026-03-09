import { jsxs as At, jsx as d, Fragment as oe } from 'react/jsx-runtime';
import {
  createContext as xn,
  useContext as Yt,
  useMemo as I,
  useState as kt,
  useCallback as K,
  useRef as st,
  useEffect as at,
  Fragment as Ce,
  forwardRef as je,
  useImperativeHandle as Qe,
} from 'react';
import {
  context as Ut,
  Button as Pe,
  Field as yn,
  Text as bn,
  Combo as vn,
  DatePicker as kn,
  TimePicker as $n,
  Locale as Tn,
  RichSelect as Mn,
  TwoState as Cn,
  Slider as Rn,
  Counter as Dn,
  Material as Ae,
  Willow as ze,
  WillowDark as _e,
} from '@svar-ui/react-core';
import {
  locate as Vt,
  locateID as Zt,
  locateAttr as En,
  dateToString as pe,
  locale as we,
} from '@svar-ui/lib-dom';
import { en as xe } from '@svar-ui/gantt-locales';
import { en as De } from '@svar-ui/core-locales';
import { EventBusRouter as Ln } from '@svar-ui/lib-state';
import {
  prepareEditTask as Ze,
  grid as Nn,
  extendDragOptions as In,
  isSegmentMoveAllowed as Sn,
  DataStore as Hn,
  normalizeLinks as Pn,
  normalizeZoom as An,
  defaultColumns as zn,
  parseTaskDates as Oe,
  defaultTaskTypes as _n,
  getToolbarButtons as We,
  handleAction as Je,
  isHandledAction as tn,
  getMenuOptions as Ge,
  getEditorItems as On,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as as,
  defaultEditorItems as us,
  defaultMenuOptions as ds,
  defaultTaskTypes as fs,
  defaultToolbarButtons as hs,
  getEditorItems as ms,
  getMenuOptions as gs,
  getToolbarButtons as ps,
  registerScaleUnit as ws,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as Re,
  useStore as J,
  useStoreWithCounter as ie,
  writable as Wn,
  useStoreLater as qt,
} from '@svar-ui/lib-react';
import { hotkeys as en } from '@svar-ui/grid-store';
import { Grid as Gn, HeaderMenu as Yn } from '@svar-ui/react-grid';
import { flushSync as Xn } from 'react-dom';
import { Toolbar as Ye } from '@svar-ui/react-toolbar';
import { ContextMenu as Bn } from '@svar-ui/react-menu';
import { Editor as Kn, registerEditorItem as re } from '@svar-ui/react-editor';
import { registerEditorItem as ys } from '@svar-ui/react-editor';
const jt = xn(null);
function te(t) {
  const r = t.getAttribute('data-id'),
    n = parseInt(r);
  return isNaN(n) || n.toString() != r ? r : n;
}
function Un(t, r, n) {
  const o = t.getBoundingClientRect(),
    s = r.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: o.top - s.top,
    left: o.left - s.left,
    dt: o.bottom - n.clientY,
    db: n.clientY - o.top,
  };
}
function Xe(t) {
  return t && t.getAttribute('data-context-id');
}
const Be = 5;
function Fn(t, r) {
  let n, o, s, i, l, h, u, g, a;
  function y(E) {
    (i = E.clientX),
      (l = E.clientY),
      (h = {
        ...Un(n, t, E),
        y: r.getTask(s).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function D(E) {
    (n = Vt(E)),
      Xe(n) &&
        ((s = te(n)),
        (a = setTimeout(() => {
          (g = !0), r && r.touchStart && r.touchStart(), y(E.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', _),
        t.addEventListener('contextmenu', z),
        window.addEventListener('touchend', Q));
  }
  function z(E) {
    if (g || a) return E.preventDefault(), !1;
  }
  function B(E) {
    E.which === 1 &&
      ((n = Vt(E)),
      Xe(n) &&
        ((s = te(n)),
        t.addEventListener('mousemove', C),
        window.addEventListener('mouseup', Y),
        y(E)));
  }
  function p(E) {
    t.removeEventListener('mousemove', C),
      t.removeEventListener('touchmove', _),
      document.body.removeEventListener('mouseup', Y),
      document.body.removeEventListener('touchend', Q),
      (document.body.style.userSelect = ''),
      E &&
        (t.removeEventListener('mousedown', B),
        t.removeEventListener('touchstart', D));
  }
  function L(E) {
    const dt = E.clientX - i,
      et = E.clientY - l;
    if (!o) {
      if (
        (Math.abs(dt) < Be && Math.abs(et) < Be) ||
        (r && r.start && r.start({ id: s, e: E }) === !1)
      )
        return;
      (o = n.cloneNode(!0)),
        (o.style.pointerEvents = 'none'),
        o.classList.add('wx-reorder-task'),
        (o.style.position = 'absolute'),
        (o.style.left = h.left + 'px'),
        (o.style.top = h.top + 'px'),
        (n.style.visibility = 'hidden'),
        n.parentNode.insertBefore(o, n);
    }
    if (o) {
      const bt = Math.round(Math.max(0, h.top + et));
      if (r && r.move && r.move({ id: s, top: bt, detail: u }) === !1) return;
      const ct = r.getTask(s),
        mt = ct.$y;
      if (!h.start && h.y == mt) return V();
      (h.start = !0), (h.y = ct.$y - 4), (o.style.top = bt + 'px');
      const T = document.elementFromPoint(E.clientX, E.clientY),
        S = Vt(T);
      if (S && S !== n) {
        const U = te(S),
          q = S.getBoundingClientRect(),
          w = q.top + q.height / 2,
          k = E.clientY + h.db > w && S.nextElementSibling !== n,
          M = E.clientY - h.dt < w && S.previousElementSibling !== n;
        u?.after == U || u?.before == U
          ? (u = null)
          : k
            ? (u = { id: s, after: U })
            : M && (u = { id: s, before: U });
      }
    }
  }
  function C(E) {
    L(E);
  }
  function _(E) {
    g
      ? (E.preventDefault(), L(E.touches[0]))
      : a && (clearTimeout(a), (a = null));
  }
  function Q() {
    (g = null), a && (clearTimeout(a), (a = null)), V();
  }
  function Y() {
    V();
  }
  function V() {
    n && (n.style.visibility = ''),
      o &&
        (o.parentNode.removeChild(o),
        r && r.end && r.end({ id: s, top: h.top })),
      (s = n = o = h = u = null),
      p();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', B),
    t.addEventListener('touchstart', D),
    {
      destroy() {
        p(!0);
      },
    }
  );
}
function Vn({ row: t, column: r }) {
  const n = Yt(jt);
  function o(i, l) {
    return {
      justifyContent: l.align,
      paddingLeft: `${(i.$level - 1) * 20}px`,
    };
  }
  const s = r && r._cell;
  return /* @__PURE__ */ At('div', {
    className: 'wx-pqc08MHU wx-content',
    style: o(t, r),
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
        children: s
          ? /* @__PURE__ */ d(s, { row: t, column: r, api: n })
          : t.text,
      }),
    ],
  });
}
function Ke({ column: t, cell: r }) {
  const n = I(() => t.id, [t?.id]);
  return r || t.id == 'add-task'
    ? /* @__PURE__ */ d('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ d('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': n,
        }),
      })
    : null;
}
function qn(t) {
  const {
      readonly: r,
      compactMode: n,
      width: o = 0,
      display: s = 'all',
      columnWidth: i = 0,
      fullHeight: l,
      onTableAPIChange: h,
      multiTaskRows: u = !1,
      rowMapping: g = null,
      rowHeightOverrides: a = null,
    } = t,
    [y, D] = Re(i),
    [z, B] = kt(),
    p = Yt(Ut.i18n),
    L = I(() => p.getGroup('gantt'), [p]),
    C = Yt(jt),
    _ = J(C, 'scrollTop'),
    Q = J(C, 'cellHeight'),
    Y = J(C, '_scrollTask'),
    V = J(C, '_selected'),
    E = J(C, 'area'),
    dt = J(C, '_tasks'),
    et = J(C, '_scales'),
    bt = J(C, 'columns'),
    ct = J(C, '_sort'),
    mt = J(C, 'calendar'),
    T = J(C, 'durationUnit'),
    S = J(C, 'splitTasks'),
    [U, q] = kt(null),
    w = I(() => {
      if (!dt || !E) return [];
      if (u && g) {
        const c = /* @__PURE__ */ new Set();
        return dt.filter((b) => {
          const O = g.taskRows.get(b.id) ?? b.id;
          return c.has(O) ? !1 : (c.add(O), !0);
        });
      }
      return dt.slice(E.start, E.end);
    }, [dt, E, u, g, l]),
    k = K(
      (c, b) => {
        if (b === 'add-task')
          C.exec(b, {
            target: c,
            task: { text: L('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (b === 'open-task') {
          const O = w.find((G) => G.id === c);
          (O?.data || O?.lazy) && C.exec(b, { id: c, mode: !O.open });
        }
      },
      [w],
    ),
    M = K(
      (c) => {
        const b = Zt(c),
          O = c.target.dataset.action;
        O && c.preventDefault(),
          b
            ? O === 'add-task' || O === 'open-task'
              ? k(b, O)
              : C.exec('select-task', {
                  id: b,
                  toggle: c.ctrlKey || c.metaKey,
                  range: c.shiftKey,
                  show: !0,
                })
            : O === 'add-task' && k(null, O);
      },
      [C, k],
    ),
    v = st(null),
    P = st(null),
    [lt, it] = kt(0),
    [gt, Lt] = kt(!1);
  at(() => {
    const c = P.current;
    if (!c || typeof ResizeObserver > 'u') return;
    const b = () => it(c.clientWidth);
    b();
    const O = new ResizeObserver(b);
    return O.observe(c), () => O.disconnect();
  }, []);
  const $t = st(null),
    Tt = K(
      (c) => {
        const b = c.id,
          { before: O, after: G } = c,
          Z = c.onMove;
        let ot = O || G,
          Rt = O ? 'before' : 'after';
        if (Z) {
          if (Rt === 'after') {
            const Ht = C.getTask(ot);
            Ht.data?.length &&
              Ht.open &&
              ((Rt = 'before'), (ot = Ht.data[0].id));
          }
          $t.current = { id: b, [Rt]: ot };
        } else $t.current = null;
        C.exec('move-task', {
          id: b,
          mode: Rt,
          target: ot,
          inProgress: Z,
        });
      },
      [C],
    ),
    xt = I(() => E?.from ?? 0, [E]),
    pt = I(() => et?.height ?? 0, [et]),
    St = I(
      () => (!n && s !== 'grid' ? (y ?? 0) > (o ?? 0) : (y ?? 0) > (lt ?? 0)),
      [n, s, y, o, lt],
    ),
    Wt = I(() => {
      const c = {};
      return (
        (St && s === 'all') || (s === 'grid' && St)
          ? (c.width = y)
          : s === 'grid' && (c.width = '100%'),
        u && l && (c.minHeight = l),
        c
      );
    }, [St, s, y, u, l]),
    zt = I(() => (U && !w.find((c) => c.id === U.id) ? [...w, U] : w), [w, U]),
    Nt = I(() => {
      let c = (bt || []).map((G) => {
        G = { ...G };
        const Z = G.header;
        if (typeof Z == 'object') {
          const ot = Z.text && L(Z.text);
          G.header = { ...Z, text: ot };
        } else G.header = L(Z);
        if (G.cell && G.id !== 'text' && G.id !== 'add-task') {
          const ot = G.cell;
          G.cell = (Rt) => /* @__PURE__ */ d(ot, { ...Rt, api: C });
        }
        return G;
      });
      const b = c.findIndex((G) => G.id === 'text'),
        O = c.findIndex((G) => G.id === 'add-task');
      if (
        (b !== -1 && (c[b].cell && (c[b]._cell = c[b].cell), (c[b].cell = Vn)),
        O !== -1)
      ) {
        c[O].cell = c[O].cell || Ke;
        const G = c[O].header;
        if (
          (typeof G != 'object' && (c[O].header = { text: G }),
          (c[O].header.cell = G.cell || Ke),
          r)
        )
          c.splice(O, 1);
        else if (n) {
          const [Z] = c.splice(O, 1);
          c.unshift(Z);
        }
      }
      return c.length > 0 && (c[c.length - 1].resize = !1), c;
    }, [bt, L, r, n, C]),
    N = I(
      () =>
        s === 'all'
          ? `${o}px`
          : s === 'grid'
            ? 'calc(100% - 4px)'
            : Nt.find((c) => c.id === 'add-task')
              ? '50px'
              : '0',
      [s, o, Nt],
    ),
    F = I(() => {
      if (zt && ct?.length) {
        const c = {};
        return (
          ct.forEach(({ key: b, order: O }, G) => {
            c[b] = {
              order: O,
              ...(ct.length > 1 && { index: G }),
            };
          }),
          c
        );
      }
      return {};
    }, [zt, ct]),
    W = K(() => Nt.some((c) => c.flexgrow && !c.hidden), []),
    wt = I(() => W(), [W, gt]),
    yt = I(() => {
      let c = s === 'chart' ? Nt.filter((O) => O.id === 'add-task') : Nt;
      const b = s === 'all' ? o : lt;
      if (!wt) {
        let O = y,
          G = !1;
        if (Nt.some((Z) => Z.$width)) {
          let Z = 0;
          (O = Nt.reduce(
            (ot, Rt) => (
              Rt.hidden || ((Z += Rt.width), (ot += Rt.$width || Rt.width)), ot
            ),
            0,
          )),
            Z > O && O > b && (G = !0);
        }
        if (G || O < b) {
          let Z = 1;
          return (
            G || (Z = (b - 50) / (O - 50 || 1)),
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
    }, [s, Nt, wt, y, o, lt]),
    nt = K(
      (c) => {
        if (!W()) {
          const b = yt.reduce(
            (O, G) => (
              c && G.$width && (G.$width = G.width),
              O + (G.hidden ? 0 : G.width)
            ),
            0,
          );
          b !== y && D(b);
        }
        Lt(!0), Lt(!1);
      },
      [W, yt, y, D],
    ),
    R = K(() => {
      Nt.filter((b) => b.flexgrow && !b.hidden).length === 1 &&
        Nt.forEach((b) => {
          b.$width && !b.flexgrow && !b.hidden && (b.width = b.$width);
        });
    }, []),
    vt = K(
      (c) => {
        if (!r) {
          const b = Zt(c),
            O = En(c, 'data-col-id');
          !(O && Nt.find((Z) => Z.id == O))?.editor &&
            b &&
            C.exec('show-editor', { id: b });
        }
      },
      [C, r],
      // cols is defined later; relies on latest value at call time
    ),
    ft = I(() => (Array.isArray(V) ? V.map((c) => c.id) : []), [V]),
    tt = K(() => {
      if (v.current && zt !== null) {
        const c = v.current.querySelector('.wx-body');
        c &&
          (u
            ? (c.style.top = '0px')
            : (c.style.top = -((_ ?? 0) - (xt ?? 0)) + 'px'));
      }
      P.current && (P.current.scrollTop = 0);
    }, [zt, _, xt, u]);
  at(() => {
    v.current && tt();
  }, [_, xt, tt]),
    at(() => {
      const c = v.current;
      if (!c) return;
      const b = c.querySelector('.wx-table-box .wx-body');
      if (!b || typeof ResizeObserver > 'u') return;
      const O = new ResizeObserver(() => {
        tt();
      });
      return (
        O.observe(b),
        () => {
          O.disconnect();
        }
      );
    }, [yt, Wt, s, N, zt, tt]),
    at(() => {
      if (!Y || !z) return;
      const { id: c } = Y,
        b = z.getState().focusCell;
      b &&
        b.row !== c &&
        v.current &&
        v.current.contains(document.activeElement) &&
        z.exec('focus-cell', {
          row: c,
          column: b.column,
        });
    }, [Y, z]),
    at(() => {
      if (!u) return;
      const c = v.current;
      if (!c) return;
      const b = c.querySelector('.wx-table-box .wx-body');
      if (!b) return;
      const O = {
        attributes: !0,
        attributeFilter: ['style'],
        childList: !0,
      };
      let G = null,
        Z;
      const ot = () => {
        Z.disconnect();
        let Rt = 0;
        b.querySelectorAll('[data-id]').forEach((Xt) => {
          const Qt = Xt.getAttribute('data-id'),
            le =
              g && Qt
                ? (g.taskRows.get(Qt) ?? g.taskRows.get(Number(Qt)) ?? Qt)
                : Qt,
            se = (a && le && a[le]) || Q;
          (Xt.style.height = `${se}px`),
            (Xt.style.minHeight = `${se}px`),
            (Rt += se);
        }),
          Rt > 0 && (b.style.height = `${Rt}px`),
          Z.observe(b, O);
      };
      return (
        (Z = new MutationObserver(() => {
          G && cancelAnimationFrame(G), (G = requestAnimationFrame(ot));
        })),
        ot(),
        () => {
          Z.disconnect(), G && cancelAnimationFrame(G);
        }
      );
    }, [a, u, zt, Q, g]);
  const Et = K(
      ({ id: c }) => {
        if (r) return !1;
        C.getTask(c).open && C.exec('open-task', { id: c, mode: !1 });
        const b = C.getState()._tasks.find((O) => O.id === c);
        if ((q(b || null), !b)) return !1;
      },
      [C, r],
    ),
    _t = K(
      ({ id: c, top: b }) => {
        $t.current
          ? Tt({ ...$t.current, onMove: !1 })
          : C.exec('drag-task', {
              id: c,
              top: b + (xt ?? 0),
              inProgress: !1,
            }),
          q(null);
      },
      [C, Tt, xt],
    ),
    X = K(
      ({ id: c, top: b, detail: O }) => {
        O && Tt({ ...O, onMove: !0 }),
          C.exec('drag-task', {
            id: c,
            top: b + (xt ?? 0),
            inProgress: !0,
          });
      },
      [C, Tt, xt],
    );
  at(() => {
    const c = v.current;
    return c
      ? Fn(c, {
          start: Et,
          end: _t,
          move: X,
          getTask: C.getTask,
        }).destroy
      : void 0;
  }, [C, Et, _t, X]);
  const rt = K(
      (c) => {
        const { key: b, isInput: O } = c;
        if (!O && (b === 'arrowup' || b === 'arrowdown'))
          return (c.eventSource = 'grid'), C.exec('hotkey', c), !1;
        if (b === 'enter') {
          const G = z?.getState().focusCell;
          if (G) {
            const { row: Z, column: ot } = G;
            ot === 'add-task'
              ? k(Z, 'add-task')
              : ot === 'text' && k(Z, 'open-task');
          }
        }
      },
      [C, k, z],
    ),
    Mt = st(null),
    Pt = () => {
      Mt.current = {
        setTableAPI: B,
        handleHotkey: rt,
        sortVal: ct,
        api: C,
        adjustColumns: R,
        setColumnWidth: nt,
        tasks: w,
        calendarVal: mt,
        durationUnitVal: T,
        splitTasksVal: S,
        onTableAPIChange: h,
      };
    };
  Pt(),
    at(() => {
      Pt();
    }, [B, rt, ct, C, R, nt, w, mt, T, S, h]);
  const Ct = K((c) => {
    B(c),
      c.intercept('hotkey', (b) => Mt.current.handleHotkey(b)),
      c.intercept('scroll', () => !1),
      c.intercept('select-row', () => !1),
      c.intercept('sort-rows', (b) => {
        const O = Mt.current.sortVal,
          { key: G, add: Z } = b,
          ot = O ? O.find((Ht) => Ht.key === G) : null;
        let Rt = 'asc';
        return (
          ot && (Rt = !ot || ot.order === 'asc' ? 'desc' : 'asc'),
          C.exec('sort-tasks', {
            key: G,
            order: Rt,
            add: Z,
          }),
          !1
        );
      }),
      c.on('resize-column', () => {
        Mt.current.setColumnWidth(!0);
      }),
      c.on('hide-column', (b) => {
        b.mode || Mt.current.adjustColumns(), Mt.current.setColumnWidth();
      }),
      c.intercept('update-cell', (b) => {
        const { id: O, column: G, value: Z } = b,
          ot = Mt.current.tasks.find((Rt) => Rt.id === O);
        if (ot) {
          const Rt = { ...ot };
          let Ht = Z;
          Ht && !isNaN(Ht) && !(Ht instanceof Date) && (Ht *= 1),
            (Rt[G] = Ht),
            Ze(
              Rt,
              {
                calendar: Mt.current.calendarVal,
                durationUnit: Mt.current.durationUnitVal,
                splitTasks: Mt.current.splitTasksVal,
              },
              G,
            ),
            C.exec('update-task', {
              id: O,
              task: Rt,
            });
        }
        return !1;
      }),
      h && h(c);
  }, []);
  return /* @__PURE__ */ d('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${N}` },
    ref: P,
    children: /* @__PURE__ */ d('div', {
      ref: v,
      style: Wt,
      className: 'wx-rHj6070p wx-table',
      onClick: M,
      onDoubleClick: vt,
      children: /* @__PURE__ */ d(Gn, {
        init: Ct,
        sizes: {
          rowHeight: Q,
          headerHeight: (pt ?? 0) - 1,
        },
        rowStyle: (c) =>
          c.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (c) =>
          `wx-rHj6070p wx-text-${c.align}${c.id === 'add-task' ? ' wx-action' : ''}`,
        data: zt,
        columns: yt,
        selectedRows: [...ft],
        sortMarks: F,
      }),
    }),
  });
}
function jn({ borders: t = '', rowLayout: r = null }) {
  const n = Yt(jt),
    o = J(n, 'cellWidth'),
    s = J(n, 'cellHeight'),
    i = st(null),
    [l, h] = kt('#e4e4e4');
  at(() => {
    if (typeof getComputedStyle < 'u' && i.current) {
      const a = getComputedStyle(i.current).getPropertyValue(
        '--wx-gantt-border',
      );
      h(a ? a.substring(a.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const u = I(() => {
    if (!r) return null;
    const a = [];
    let y = 0;
    for (const D of r) (y += D.height), a.push(y);
    return a;
  }, [r]);
  if (!u) {
    const a = {
      width: '100%',
      height: '100%',
      background: o != null && s != null ? `url(${Nn(o, s, l, t)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ d('div', { ref: i, style: a });
  }
  const g = o
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${o - 1}px, ${l} ${o - 1}px, ${l} ${o}px)`
    : void 0;
  return /* @__PURE__ */ At('div', {
    ref: i,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ d('div', {
        style: {
          width: '100%',
          height: '100%',
          background: g,
          position: 'absolute',
        },
      }),
      u.map((a, y) =>
        /* @__PURE__ */ d(
          'div',
          {
            style: {
              position: 'absolute',
              top: `${a}px`,
              width: '100%',
              height: '1px',
              backgroundColor: l,
            },
          },
          y,
        ),
      ),
    ],
  });
}
function ce(t) {
  const r = t.split(',').map(Number),
    n = [];
  for (let o = 0; o < r.length; o += 2) n.push([r[o], r[o + 1]]);
  return { path: n.slice(0, -3), arrow: n.slice(-3) };
}
function Qn(t) {
  return t.split(',').map(Number).slice(0, -6).join(',');
}
function Zn(t, r = 8) {
  if (!t) return '';
  const { path: n } = ce(t);
  if (n.length < 2) return '';
  let o = `M${n[0][0]},${n[0][1]}`;
  for (let s = 1; s < n.length - 1; s++) {
    const i = n[s - 1],
      l = n[s],
      h = n[s + 1],
      u = l[0] - i[0],
      g = l[1] - i[1],
      a = h[0] - l[0],
      y = h[1] - l[1];
    if (u === a && g === y) {
      o += ` L${l[0]},${l[1]}`;
      continue;
    }
    const D = Math.hypot(u, g),
      z = Math.hypot(a, y);
    if (D === 0 || z === 0) {
      o += ` L${l[0]},${l[1]}`;
      continue;
    }
    const B = Math.min(r, D / 2, z / 2),
      p = l[0] - (u / D) * B,
      L = l[1] - (g / D) * B,
      C = l[0] + (a / z) * B,
      _ = l[1] + (y / z) * B;
    (o += ` L${p},${L}`), (o += ` Q${l[0]},${l[1]} ${C},${_}`);
  }
  return (o += ` L${n[n.length - 1][0]},${n[n.length - 1][1]}`), o;
}
function nn(t, r) {
  if (!t) return { d: '', end: null, cp2: null };
  const { path: n } = ce(t);
  if (n.length < 2) return { d: '', end: null, cp2: null };
  const o = n[0],
    s = n[n.length - 1],
    i = s[0] - o[0],
    l = s[1] - o[1],
    h = !r || r[0] === 'e',
    u = !r || r[2] === 's',
    g = (h && u && i < 0) || (!h && !u && i > 0),
    a = Math.hypot(i, l),
    y = Math.abs(i);
  let D = `M${o[0]},${o[1]}`,
    z;
  if (g) {
    const B = Math.max(40, Math.min(y * 0.3, 160)),
      p = Math.max(60, Math.min(y * 0.4, 200)),
      L = Math.max(40, Math.min(y * 0.2, 100)),
      C = Math.abs(l),
      _ = l >= 0 ? 1 : -1,
      Q = o[0] + (h ? B : -B),
      Y = o[1] + _ * L,
      V = s[0] + (u ? -p : p),
      E = Math.max(20, Math.min(C * 0.5, 80)),
      dt = s[1] - _ * E;
    (z = [V, dt]), (D += ` C${Q},${Y} ${V},${dt} ${s[0]},${s[1]}`);
  } else {
    const B = Math.max(40, Math.min(a * 0.5, 150)),
      p = o[0] + (h ? B : -B),
      L = s[0] + (u ? -B : B);
    (z = [L, s[1]]), (D += ` C${p},${o[1]} ${L},${s[1]} ${s[0]},${s[1]}`);
  }
  return { d: D, end: s, cp2: z };
}
function Jn(t, r, n = 5) {
  const o = t[0] - r[0],
    s = t[1] - r[1],
    i = Math.hypot(o, s);
  if (i === 0) return null;
  const l = o / i,
    h = s / i,
    u = -h,
    g = l,
    a = t[0],
    y = t[1],
    D = t[0] - l * 10,
    z = t[1] - h * 10;
  return `${D - u * n},${z - g * n} ${a},${y} ${D + u * n},${z + g * n}`;
}
function tr(t, r, n) {
  return r === 'bezier' ? nn(t, n).d : Zn(t);
}
function er(t, r) {
  const { end: n, cp2: o } = nn(t, r);
  return !n || !o ? null : Jn(n, o);
}
const me = 5,
  Ue = 4;
function nr(t) {
  if (!t || !t.length) return t;
  const r = t.map((i) => {
      if (!i.$p) return null;
      const { path: l } = ce(i.$p);
      return l;
    }),
    n = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Map();
  r.forEach((i, l) => {
    if (!(!i || i.length < 2))
      for (let h = 0; h < i.length - 1; h++) {
        const [u, g] = i[h],
          [a, y] = i[h + 1];
        if (Math.abs(g - y) < 1) {
          const D = Math.round((g + y) / 2 / me) * me;
          n.has(D) || n.set(D, []),
            n.get(D).push({
              linkIdx: l,
              segIdx: h,
              min: Math.min(u, a),
              max: Math.max(u, a),
              y: (g + y) / 2,
            });
        } else if (Math.abs(u - a) < 1) {
          const D = Math.round((u + a) / 2 / me) * me;
          o.has(D) || o.set(D, []),
            o.get(D).push({
              linkIdx: l,
              segIdx: h,
              min: Math.min(g, y),
              max: Math.max(g, y),
              x: (u + a) / 2,
            });
        }
      }
  });
  const s = r.map((i) => (i ? i.map((l) => [...l]) : null));
  for (const i of o.values()) {
    if (i.length < 2) continue;
    const l = [];
    for (let u = 0; u < i.length; u++)
      for (let g = u + 1; g < i.length; g++)
        i[u].min < i[g].max &&
          i[u].max > i[g].min &&
          (l.includes(i[u]) || l.push(i[u]), l.includes(i[g]) || l.push(i[g]));
    if (l.length < 2) continue;
    const h = l.length;
    l.forEach((u, g) => {
      const a = (g - (h - 1) / 2) * Ue,
        y = s[u.linkIdx];
      y && ((y[u.segIdx][0] += a), (y[u.segIdx + 1][0] += a));
    });
  }
  for (const i of n.values()) {
    if (i.length < 2) continue;
    const l = [];
    for (let u = 0; u < i.length; u++)
      for (let g = u + 1; g < i.length; g++)
        i[u].min < i[g].max &&
          i[u].max > i[g].min &&
          (l.includes(i[u]) || l.push(i[u]), l.includes(i[g]) || l.push(i[g]));
    if (l.length < 2) continue;
    const h = l.length;
    l.forEach((u, g) => {
      const a = (g - (h - 1) / 2) * Ue,
        y = s[u.linkIdx];
      y && ((y[u.segIdx][1] += a), (y[u.segIdx + 1][1] += a));
    });
  }
  return t.map((i, l) => {
    const h = s[l];
    if (!h || !i.$p) return i;
    const g = i.$p.split(',').map(Number).slice(-6),
      a = [];
    for (const y of h) a.push(y[0], y[1]);
    return { ...i, $p: [...a, ...g].join(',') };
  });
}
function ge(t, r) {
  if (!t) return null;
  if (t.color) return t.color;
  const n = r.current;
  return n
    ? t.type === 'summary'
      ? n.summary || null
      : t.type === 'milestone'
        ? n.milestone || null
        : n.task || null
    : null;
}
function rr(t, r) {
  const n = r?.style || t;
  if (n === 'dashed') return '8 4';
  if (n === 'dotted') return '2 4';
}
function sr({
  onSelectLink: t,
  selectedLink: r,
  readonly: n,
  linkShape: o,
  linkGradient: s,
  linkStyle: i,
  linkBundling: l,
  multiTaskRows: h,
  taskPositions: u,
  cellHeight: g,
}) {
  const a = Yt(jt),
    [y, D] = ie(a, '_links'),
    [z] = ie(a, 'criticalPath'),
    B = J(a, '_tasks'),
    p = o && o !== 'squared',
    L = st(null),
    C = st(null),
    _ = st(null),
    Q = st(/* @__PURE__ */ new Set());
  at(() => {
    if (!s || !C.current) return;
    const T = getComputedStyle(C.current);
    _.current = {
      task: T.getPropertyValue('--wx-gantt-task-color').trim() || null,
      summary: T.getPropertyValue('--wx-gantt-summary-color').trim() || null,
      milestone:
        T.getPropertyValue('--wx-gantt-milestone-color').trim() || null,
      link: T.getPropertyValue('--wx-gantt-link-color').trim() || '#888',
    };
  }, [s]);
  const Y = I(() => {
      if (!y?.length || !B?.length) return y;
      const T = new Set(B.map((k) => k.id)),
        S = new Map(B.map((k) => [k.id, k]));
      let U = !1;
      for (const k of y)
        if (!T.has(k.source) || !T.has(k.target)) {
          U = !0;
          break;
        }
      if (!U) return y;
      function q(k) {
        let M = a.getTask(k);
        for (; M; ) {
          if (T.has(M.id)) return S.get(M.id);
          if (!M.parent) return null;
          M = a.getTask(M.parent);
        }
        return null;
      }
      function w(k, M, v) {
        const P = !v || v[0] === 'e',
          lt = !v || v[2] === 's',
          it = k.$h || g,
          gt = M.$h || g,
          Lt = P ? k.$x + k.$w : k.$x,
          $t = k.$y + it / 2,
          Tt = lt ? M.$x : M.$x + M.$w,
          xt = M.$y + gt / 2,
          pt = 5,
          St = lt ? -1 : 1,
          Wt = Tt + St * -10,
          zt = xt - pt,
          Nt = Tt,
          N = xt,
          F = Tt + St * -10,
          W = xt + pt;
        return [Lt, $t, Tt, xt, Wt, zt, Nt, N, F, W].join(',');
      }
      return y.map((k) => {
        const M = T.has(k.source),
          v = T.has(k.target);
        if (M && v) return k;
        const P = M ? S.get(k.source) : q(k.source),
          lt = v ? S.get(k.target) : q(k.target);
        if (!P || !lt || P.id === lt.id) return k;
        const it = w(P, lt, k.type);
        return { ...k, $p: it, _rerouted: !0 };
      });
    }, [y, D, B, a, g]),
    V = I(() => {
      if (!h || !u || !B?.length || !Y?.length || !g) return Y;
      const T = /* @__PURE__ */ new Map();
      let S = !1;
      if (
        (B.forEach((w) => {
          const k = u.get(w.id);
          if (!k) return;
          const M = w.$y + g / 2,
            P = k.y + k.h / 2 - M;
          Math.abs(P) > 0.5 && (S = !0), T.set(w.id, P);
        }),
        !S)
      )
        return Y;
      const U = [];
      B.forEach((w) => {
        const k = T.get(w.id);
        k !== void 0 && U.push({ storeCenter: w.$y + g / 2, delta: k });
      }),
        U.sort((w, k) => w.storeCenter - k.storeCenter);
      function q(w) {
        let k = 0,
          M = 1 / 0;
        for (const v of U) {
          const P = Math.abs(w - v.storeCenter);
          P < M && ((M = P), (k = v.delta));
        }
        return k;
      }
      return Y.map((w) => {
        if (!w.$p) return w;
        const k = T.get(w.source) ?? 0,
          M = T.get(w.target) ?? 0;
        if (Math.abs(k) < 0.5 && Math.abs(M) < 0.5) return w;
        const v = w.$p.split(',').map(Number),
          P = [...v],
          lt = v.length - 6;
        lt >= 2 && (P[1] += k), lt >= 4 && (P[lt - 1] += M);
        for (let it = 2; it < lt - 2; it += 2) P[it + 1] += q(v[it + 1]);
        for (let it = lt; it < v.length; it += 2) P[it + 1] += M;
        return { ...w, $p: P.join(',') };
      });
    }, [Y, D, h, u, B, g]),
    E = I(() => (!l || !V?.length ? V : nr(V)), [V, D, l]),
    dt = I(() => {
      const T = Q.current,
        S = /* @__PURE__ */ new Set();
      if (E) for (const U of E) T.has(U.id) || S.add(U.id);
      return S;
    }, [E, D]);
  at(() => {
    E && (Q.current = new Set(E.map((T) => T.id)));
  }, [E, D]);
  const et = K(
    (T) => {
      const S = T?.target?.classList;
      !S?.contains('wx-line') &&
        !S?.contains('wx-line-hitarea') &&
        !S?.contains('wx-delete-button') &&
        t(null);
    },
    [t],
  );
  at(() => {
    if (!n && r && L.current) {
      const T = (S) => {
        L.current && !L.current.contains(S.target) && et(S);
      };
      return (
        document.addEventListener('click', T),
        () => {
          document.removeEventListener('click', T);
        }
      );
    }
  }, [n, r, et]);
  const bt = I(() => {
      if (!s || !E?.length) return null;
      const T = [];
      for (const S of E) {
        if (!S.$p || (z && S.$critical)) continue;
        const q = a.getTask(S.source),
          w = a.getTask(S.target),
          k = ge(q, _) || _.current?.link || '#888',
          M = ge(w, _) || _.current?.link || '#888',
          { path: v } = ce(S.$p);
        if (v.length < 2) continue;
        const P = v[0],
          lt = v[v.length - 1],
          it = q?.progress ?? 0,
          gt = Math.min(100, Math.max(0, it));
        T.push(
          /* @__PURE__ */ At(
            'linearGradient',
            {
              id: `wx-link-grad-${S.id}`,
              gradientUnits: 'userSpaceOnUse',
              x1: P[0],
              y1: P[1],
              x2: lt[0],
              y2: lt[1],
              children: [
                /* @__PURE__ */ d('stop', { offset: '0%', stopColor: k }),
                gt > 0 &&
                  /* @__PURE__ */ d('stop', { offset: `${gt}%`, stopColor: k }),
                /* @__PURE__ */ d('stop', { offset: '100%', stopColor: M }),
              ],
            },
            `grad-${S.id}`,
          ),
        );
      }
      return T;
    }, [E, D, s, z, a]),
    ct = (T, S) => {
      const U = z && T.$critical,
        q = dt.has(T.id),
        w = T._rerouted ? '6 3' : rr(i, T),
        k = q && !S,
        M = o === 'bezier',
        P =
          'wx-dkx3NwEn wx-line' +
          (U ? ' wx-critical' : '') +
          (!n && !S ? ' wx-line-selectable' : '') +
          (S ? ' wx-line-selected wx-line-selectable wx-delete-link' : '') +
          ' wx-line-visible' +
          (k ? (w ? ' wx-line-new-fade' : ' wx-line-new') : ''),
        lt = 'wx-dkx3NwEn wx-line-hitarea';
      let it,
        gt = U
          ? 'url(#wx-arrow-critical)'
          : S
            ? 'url(#wx-arrow-selected)'
            : 'url(#wx-arrow-default)';
      if (
        (s &&
          !U &&
          !S &&
          T.$p &&
          ((it = `url(#wx-link-grad-${T.id})`),
          (gt = `url(#wx-arrow-grad-${T.id})`)),
        p)
      ) {
        const $t = tr(T.$p, o, T.type);
        if (M && T.$p) {
          const Tt =
            er(T.$p, T.type) ||
            ce(T.$p)
              .arrow.map((pt) => pt.join(','))
              .join(' ');
          let xt;
          if (S) xt = 'var(--wx-color-danger)';
          else if (U) xt = 'var(--wx-gantt-link-critical-color)';
          else if (s && T.$p) {
            const pt = a.getTask(T.target);
            xt = ge(pt, _) || _.current?.link || 'var(--wx-gantt-link-color)';
          } else xt = 'var(--wx-gantt-link-color)';
          return /* @__PURE__ */ At(
            'g',
            {
              children: [
                /* @__PURE__ */ d('path', {
                  className: lt,
                  d: $t,
                  onClick: () => !n && !S && t(T.id),
                  'data-link-id': T.id,
                }),
                /* @__PURE__ */ d('path', {
                  ref: S ? L : void 0,
                  className: P,
                  d: $t,
                  stroke: it,
                  strokeDasharray: w,
                  'data-link-id': T.id,
                }),
                /* @__PURE__ */ d('polygon', {
                  points: Tt,
                  fill: xt,
                  className:
                    'wx-dkx3NwEn wx-bezier-arrow' +
                    (S ? ' wx-bezier-arrow-selected' : ''),
                }),
              ],
            },
            T.id,
          );
        }
        return /* @__PURE__ */ At(
          Ce,
          {
            children: [
              /* @__PURE__ */ d('path', {
                className: lt,
                d: $t,
                onClick: () => !n && !S && t(T.id),
                'data-link-id': T.id,
              }),
              /* @__PURE__ */ d('path', {
                ref: S ? L : void 0,
                className: P,
                d: $t,
                stroke: it,
                strokeDasharray: w,
                markerEnd: gt,
                'data-link-id': T.id,
              }),
            ],
          },
          T.id,
        );
      }
      const Lt = Qn(T.$p);
      return /* @__PURE__ */ At(
        Ce,
        {
          children: [
            /* @__PURE__ */ d('polyline', {
              className: lt,
              points: Lt,
              onClick: () => !n && !S && t(T.id),
              'data-link-id': T.id,
            }),
            /* @__PURE__ */ d('polyline', {
              ref: S ? L : void 0,
              className: P,
              points: Lt,
              stroke: it,
              strokeDasharray: w,
              markerEnd: gt,
              'data-link-id': T.id,
            }),
          ],
        },
        T.id,
      );
    },
    mt = I(() => {
      if (!s || !E?.length) return null;
      const T = [];
      for (const S of E) {
        if (!S.$p || (z && S.$critical)) continue;
        const q = a.getTask(S.target),
          w = ge(q, _) || _.current?.link || '#888';
        T.push(
          /* @__PURE__ */ d(
            'marker',
            {
              id: `wx-arrow-grad-${S.id}`,
              markerWidth: '10',
              markerHeight: '8',
              refX: '10',
              refY: '4',
              orient: 'auto',
              markerUnits: 'userSpaceOnUse',
              children: /* @__PURE__ */ d('polygon', {
                points: '0,0 10,4 0,8',
                fill: w,
              }),
            },
            `arrow-grad-${S.id}`,
          ),
        );
      }
      return T;
    }, [E, D, s, z, a]);
  return /* @__PURE__ */ At('svg', {
    className: 'wx-dkx3NwEn wx-links',
    ref: C,
    children: [
      /* @__PURE__ */ At('defs', {
        children: [
          /* @__PURE__ */ d('marker', {
            id: 'wx-arrow-default',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ d('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill',
            }),
          }),
          /* @__PURE__ */ d('marker', {
            id: 'wx-arrow-critical',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ d('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-critical',
            }),
          }),
          /* @__PURE__ */ d('marker', {
            id: 'wx-arrow-selected',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ d('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-selected',
            }),
          }),
          /* @__PURE__ */ d('marker', {
            id: 'wx-arrow-hovered',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ d('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-hovered',
            }),
          }),
          bt,
          mt,
        ],
      }),
      (E || []).map((T) => ct(T, !1)),
      !n && r && ct(r, !0),
    ],
  });
}
function or(t) {
  const { task: r, type: n } = t;
  function o(i) {
    const l = r.segments[i];
    return {
      left: `${l.$x}px`,
      top: '0px',
      width: `${l.$w}px`,
      height: '100%',
    };
  }
  function s(i) {
    if (!r.progress) return 0;
    const l = (r.duration * r.progress) / 100,
      h = r.segments;
    let u = 0,
      g = 0,
      a = null;
    do {
      const y = h[g];
      g === i &&
        (u > l ? (a = 0) : (a = Math.min((l - u) / y.duration, 1) * 100)),
        (u += y.duration),
        g++;
    } while (a === null && g < h.length);
    return a || 0;
  }
  return /* @__PURE__ */ d('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: r.segments.map((i, l) =>
      /* @__PURE__ */ At(
        'div',
        {
          className: `wx-segment wx-bar wx-${n} wx-GKbcLEGA`,
          'data-segment': l,
          style: o(l),
          children: [
            r.progress
              ? /* @__PURE__ */ d('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ d('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${s(l)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ d('div', {
              className: 'wx-content',
              children: i.text || '',
            }),
          ],
        },
        l,
      ),
    ),
  });
}
let $e = [],
  Te = null,
  Fe = null;
const Ve = (t, r, n, o) => t < o && r > n,
  qe = (t, r) => {
    if (!r || !r.start) return null;
    const { start: n, lengthUnitWidth: o, lengthUnit: s } = r,
      i = 864e5,
      l =
        s === 'week'
          ? 7
          : s === 'month'
            ? 30
            : s === 'quarter'
              ? 91
              : s === 'year'
                ? 365
                : 1,
      h = Math.floor(t / o),
      u = new Date(n.getTime() + h * l * i);
    return u.setUTCHours(0, 0, 0, 0), u;
  },
  ir = (t, r, n) => {
    if (!n || !t || !r) return 0;
    const { lengthUnit: o } = n,
      l =
        (o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1) * 864e5;
    return Math.round((t.getTime() - r.getTime()) / l);
  },
  cr = (t, r, n) => {
    if (!n || !t) return t;
    const { lengthUnit: o } = n,
      l =
        (o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1) * 864e5,
      h = new Date(t.getTime() + r * l);
    return h.setUTCHours(0, 0, 0, 0), h;
  };
function lr(t) {
  const {
      readonly: r,
      taskTemplate: n,
      multiTaskRows: o = !1,
      rowMapping: s = null,
      rowHeightOverrides: i = null,
      allowTaskIntersection: l = !0,
      summaryBarCounts: h = !1,
      marqueeSelect: u = !1,
      copyPaste: g = !1,
      linkShape: a,
      linkGradient: y = !1,
      linkStyle: D,
      linkBundling: z = !1,
      showProgress: B = !0,
    } = t,
    p = Yt(jt),
    [L, C] = ie(p, '_tasks'),
    [_, Q] = ie(p, '_links'),
    Y = J(p, 'area'),
    V = J(p, '_scales'),
    E = J(p, 'taskTypes'),
    dt = J(p, 'baselines'),
    et = J(p, '_selected'),
    bt = J(p, '_scrollTask'),
    ct = J(p, 'criticalPath'),
    mt = J(p, 'tasks'),
    T = J(p, 'schedule'),
    S = J(p, 'splitTasks'),
    U = J(p, 'summary'),
    q = I(() => {
      if (!Y || !Array.isArray(L)) return [];
      const e = Y.start ?? 0,
        m = Y.end ?? 0;
      return o && s
        ? L.map((x) => ({ ...x }))
        : L.slice(e, m).map((x) => ({ ...x }));
    }, [C, Y, o, s]),
    w = J(p, 'cellHeight'),
    k = I(() => {
      if (!o || !s || !q.length) return q;
      const e = /* @__PURE__ */ new Map(),
        m = [];
      L.forEach((H) => {
        const ut = s.taskRows.get(H.id) ?? H.id;
        e.has(ut) || (e.set(ut, m.length), m.push(ut));
      });
      const x = /* @__PURE__ */ new Map();
      q.forEach((H) => {
        if (H.type === 'summary') return;
        const ut = s.taskRows.get(H.id) ?? H.id;
        x.has(ut) || x.set(ut, []), x.get(ut).push(H);
      });
      const f = /* @__PURE__ */ new Map(),
        $ = /* @__PURE__ */ new Map();
      x.forEach((H, ut) => {
        const ht = [],
          Ot = [...H].sort((Dt, It) => (Dt.$x ?? 0) - (It.$x ?? 0));
        for (const Dt of Ot) {
          const It = Dt.$x ?? 0,
            Kt = It + (Dt.$w ?? 0);
          let Ft = !1;
          for (let Gt = 0; Gt < ht.length; Gt++)
            if (
              !ht[Gt].some((Jt) => {
                const he = Jt.$x ?? 0,
                  ke = he + (Jt.$w ?? 0);
                return Ve(It, Kt, he, ke);
              })
            ) {
              ht[Gt].push(Dt), f.set(Dt.id, Gt), (Ft = !0);
              break;
            }
          Ft || (ht.push([Dt]), f.set(Dt.id, ht.length - 1));
        }
        $.set(ut, ht.length);
      });
      const A = /* @__PURE__ */ new Map();
      let j = 0;
      for (const H of m) {
        A.set(H, j);
        const ut = (i && i[H]) || w;
        j += ut;
      }
      return q.map((H) => {
        const ut = s.taskRows.get(H.id) ?? H.id,
          ht = A.get(ut) ?? 0;
        if (H.type === 'summary') {
          if ((x.get(ut) || []).length > 0 || H.barHidden)
            return { ...H, $y: ht, $skip: !0 };
          const Gt = (i && i[ut]) || w,
            Bt = Math.max(0, Math.floor((Gt - H.$h) / 2));
          return {
            ...H,
            $y: ht + Bt,
            $y_base: H.$y_base !== void 0 ? ht + Bt : void 0,
          };
        }
        const Ot = $.get(ut) || 1,
          Dt = f.get(H.id) ?? 0;
        if (Ot > 1) {
          const Bt = H.$h + 4,
            Jt = ht + 3 + Dt * Bt;
          return {
            ...H,
            $y: Jt,
            $y_base: H.$y_base !== void 0 ? Jt : void 0,
          };
        }
        const It = (i && i[ut]) || w,
          Kt = Math.max(0, Math.round((It - H.$h) / 2));
        return {
          ...H,
          $y: ht + Kt,
          $y_base: H.$y_base !== void 0 ? ht + Kt : void 0,
        };
      });
    }, [q, o, s, L, w, i]),
    M = I(() => {
      if (!o || !k?.length) return null;
      const e = /* @__PURE__ */ new Map();
      for (const m of k) m.$skip || e.set(m.id, { y: m.$y, h: m.$h });
      return e;
    }, [o, k]),
    v = I(() => V.lengthUnitWidth, [V]),
    P = I(() => V.lengthUnit || 'day', [V]),
    lt = I(() => {
      const e = /* @__PURE__ */ new Set();
      if (l || !o || !s) return e;
      const m = /* @__PURE__ */ new Map();
      return (
        L.forEach((x) => {
          if (x.type === 'summary' || x.type === 'milestone') return;
          const f = s.taskRows.get(x.id) ?? x.id;
          m.has(f) || m.set(f, []), m.get(f).push(x);
        }),
        m.forEach((x) => {
          if (!(x.length < 2))
            for (let f = 0; f < x.length; f++)
              for (let $ = f + 1; $ < x.length; $++) {
                const A = x[f],
                  j = x[$];
                Ve(A.$x, A.$x + A.$w, j.$x, j.$x + j.$w) &&
                  (e.add(A.id), e.add(j.id));
              }
        }),
        e
      );
    }, [l, o, s, L, C]),
    it = I(() => {
      if (!h || !L?.length || !v) return null;
      const e = /* @__PURE__ */ new Map(),
        m = /* @__PURE__ */ new Set();
      L.forEach((f) => {
        f.type === 'summary' && m.add(f.id),
          f.parent &&
            f.parent !== 0 &&
            f.type !== 'summary' &&
            (e.has(f.parent) || e.set(f.parent, []), e.get(f.parent).push(f));
      });
      const x = /* @__PURE__ */ new Map();
      return (
        m.forEach((f) => {
          const $ = e.get(f);
          if (!$?.length) return;
          const A = /* @__PURE__ */ new Map();
          $.forEach((j) => {
            if (j.$x == null || j.$w == null) return;
            const H = Math.floor(j.$x / v),
              ut = Math.ceil((j.$x + j.$w) / v);
            for (let ht = H; ht < ut; ht++) A.set(ht, (A.get(ht) || 0) + 1);
          }),
            A.size > 0 && x.set(f, A);
        }),
        x
      );
    }, [h, L, v]),
    [gt, Lt] = kt(null),
    $t = st(null),
    [Tt, xt] = kt(null),
    [pt, St] = kt(null),
    [Wt, zt] = kt(null),
    Nt = st(null);
  Nt.current = Wt;
  const N = st(0),
    F = st(!1),
    [W, wt] = kt(void 0),
    yt = st(null),
    nt = st(null),
    R = st(!1),
    vt = st(null),
    [ft, tt] = kt(null),
    [Et, _t] = kt(null),
    X = st(null),
    [rt, Mt] = kt(null),
    Pt = I(
      () =>
        rt && {
          ..._.find((e) => e.id === rt),
        },
      [rt, Q],
    ),
    [Ct, c] = kt(void 0),
    b = st(null),
    [O, G] = kt(0),
    Z = st(null),
    ot = I(() => {
      const e = Z.current;
      return !!(et.length && e && e.contains(document.activeElement));
    }, [et, Z.current]),
    Rt = I(() => ot && et[et.length - 1]?.id, [ot, et]);
  at(() => {
    if (bt && ot && bt) {
      const { id: e } = bt,
        m = Z.current?.querySelector(`.wx-bar[data-id='${e}']`);
      m && m.focus({ preventScroll: !0 });
    }
  }, [bt]),
    at(() => {
      const e = Z.current;
      if (e && (G(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const m = new ResizeObserver((x) => {
          x[0] && G(x[0].contentRect.width);
        });
        return m.observe(e), () => m.disconnect();
      }
    }, [Z.current]);
  const Ht = K(() => {
      document.body.style.userSelect = 'none';
    }, []),
    Xt = K(() => {
      document.body.style.userSelect = '';
    }, []),
    Qt = I(() => {
      if (!o || !s || !L?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        m = /* @__PURE__ */ new Map(),
        x = [];
      return (
        L.forEach((f) => {
          const $ = s.taskRows.get(f.id) ?? f.id;
          m.has($) || (m.set($, x.length), x.push($));
        }),
        L.forEach((f) => {
          const $ = s.taskRows.get(f.id) ?? f.id,
            A = m.get($) ?? 0;
          e.set(f.id, A * w);
        }),
        e
      );
    }, [L, o, s, w]),
    le = I(() => {
      if (!o || !s || !L?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        m = /* @__PURE__ */ new Map(),
        x = [];
      return (
        L.forEach((f) => {
          const $ = s.taskRows.get(f.id) ?? f.id;
          m.has($) || (m.set($, x.length), x.push($));
        }),
        L.forEach((f) => {
          const $ = f.row ?? f.id;
          if (!e.has($)) {
            const A = s.taskRows.get(f.id) ?? f.id,
              j = m.get(A) ?? 0;
            e.set($, j * w);
          }
        }),
        e
      );
    }, [L, o, s, w]),
    se = K(
      (e) => {
        if (!Z.current) return [];
        const m = Math.min(e.startX, e.currentX),
          x = Math.max(e.startX, e.currentX),
          f = Math.min(e.startY, e.currentY),
          $ = Math.max(e.startY, e.currentY);
        return L.filter((A) => {
          const j = A.$x,
            H = A.$x + A.$w,
            ht = Qt.get(A.id) ?? A.$y,
            Ot = ht + A.$h;
          return j < x && H > m && ht < $ && Ot > f;
        });
      },
      [L, Qt],
    ),
    Ee = K(() => {
      if (!g) return;
      const e = p.getState()._selected;
      if (!e || !e.length) return;
      const m = 864e5,
        x = e
          .map((H) => {
            if (!p.getTask(H.id)) return null;
            const ht = L.find((ke) => ke.id === H.id);
            if (!ht) return null;
            const {
                $x: Ot,
                $y: Dt,
                $h: It,
                $w: Kt,
                $skip: Ft,
                $level: Gt,
                ...Bt
              } = ht,
              Jt =
                ht.end && ht.start
                  ? Math.round((ht.end.getTime() - ht.start.getTime()) / m)
                  : 0,
              he = ht.start ? (ht.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...Bt,
              _durationDays: Jt,
              _startDayOfWeek: he,
              _originalWidth: Kt,
              _originalHeight: It,
            };
          })
          .filter(Boolean);
      if (!x.length) return;
      const $ = x[0].parent,
        A = x.filter((H) => H.parent === $);
      if (A.length === 0) return;
      const j = A.reduce(
        (H, ut) => (ut.start && (!H || ut.start < H) ? ut.start : H),
        null,
      );
      ($e = A.map((H) => ({
        ...H,
        _startCellOffset: ir(H.start, j, V),
      }))),
        (Fe = $),
        (Te = j);
    }, [g, p, L, V]),
    on = K(
      (e, m, x) => {
        if (!m.length || !e || x == null) return;
        const f = 864e5,
          $ = p.getHistory();
        $?.startBatch();
        const A = new Date(e);
        A.setUTCHours(0, 0, 0, 0),
          m.forEach((j, H) => {
            const ut = `task-${Date.now()}-${H}`,
              ht = cr(A, j._startCellOffset || 0, V),
              Ot = new Date(ht.getTime() + (j._startDayOfWeek || 0) * f);
            Ot.setUTCHours(0, 0, 0, 0);
            const Dt = new Date(Ot.getTime() + (j._durationDays || 7) * f);
            Dt.setUTCHours(0, 0, 0, 0),
              p.exec('add-task', {
                task: {
                  id: ut,
                  text: j.text,
                  start: Ot,
                  end: Dt,
                  type: j.type || 'task',
                  parent: x,
                  row: j.row,
                },
                target: x,
                mode: 'child',
                skipUndo: H > 0,
              });
          }),
          $?.endBatch();
      },
      [p, V],
    );
  at(
    () =>
      g
        ? p.intercept('hotkey', (m) => {
            if (m.key === 'ctrl+c' || m.key === 'meta+c') return Ee(), !1;
            if (m.key === 'ctrl+v' || m.key === 'meta+v')
              return (
                !$e.length ||
                  !Te ||
                  St({
                    tasks: $e,
                    baseDate: Te,
                    parent: Fe,
                    currentX: N.current,
                  }),
                !1
              );
          })
        : void 0,
    [g, p, Ee],
  ),
    at(() => {
      if (!pt) return;
      const e = (m) => {
        m.key === 'Escape' &&
          (m.preventDefault(), m.stopPropagation(), St(null));
      };
      return (
        document.addEventListener('keydown', e, !0),
        () => document.removeEventListener('keydown', e, !0)
      );
    }, [pt]);
  const ae = K(
      (e, m, x) => {
        if (
          m.target.classList.contains('wx-line') ||
          (x || (x = p.getTask(te(e))),
          x.type === 'milestone' || x.type === 'summary')
        )
          return '';
        const f = Vt(m, 'data-segment');
        f && (e = f);
        const { left: $, width: A } = e.getBoundingClientRect(),
          j = (m.clientX - $) / A;
        let H = 0.2 / (A > 200 ? A / 200 : 1);
        return j < H ? 'start' : j > 1 - H ? 'end' : '';
      },
      [p],
    ),
    ue = K(
      (e, m) => {
        const { clientX: x } = m,
          f = te(e),
          $ = p.getTask(f),
          A = m.target.classList;
        if (
          !m.target.closest('.wx-delete-button') &&
          !m.target.closest('[data-interactive]') &&
          !(A.contains('wx-link') || m.target.closest('.wx-link')) &&
          !r
        ) {
          if (A.contains('wx-progress-marker')) {
            const { progress: j } = p.getTask(f);
            (X.current = {
              id: f,
              x,
              progress: j,
              dx: 0,
              node: e,
              marker: m.target,
            }),
              m.target.classList.add('wx-progress-in-drag');
          } else {
            const j = ae(e, m, $) || 'move',
              H = {
                id: f,
                mode: j,
                x,
                dx: 0,
                l: $.$x,
                w: $.$w,
              };
            if (S && $.segments?.length) {
              const ut = Vt(m, 'data-segment');
              ut && ((H.segmentIndex = ut.dataset.segment * 1), In($, H));
            }
            _t(H);
          }
          Ht();
        }
      },
      [p, r, ae, Ht, S],
    ),
    cn = K(
      (e) => {
        if (e.button !== 0 || pt) return;
        const m = Vt(e);
        if (!m && u && !r) {
          const x = Z.current;
          if (!x) return;
          const f = x.getBoundingClientRect(),
            $ = e.clientX - f.left,
            A = e.clientY - f.top;
          if (g) {
            const H = qe($, V);
            H && ((Nt.current = H), zt(H));
          }
          const j = {
            startX: $,
            startY: A,
            currentX: $,
            currentY: A,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          Lt(j), ($t.current = j), Ht();
          return;
        }
        if (m && u && !r && et.length > 1) {
          const x = te(m);
          if (et.some(($) => $.id === x)) {
            xt({
              startX: e.clientX,
              ids: et.map(($) => $.id),
              tasks: et.map(($) => {
                const A = p.getTask($.id);
                return {
                  id: $.id,
                  start: A.start,
                  end: A.end,
                  $x: A.$x,
                  $w: A.$w,
                };
              }),
            }),
              Ht();
            return;
          }
        }
        if (
          !r &&
          (e.target.classList.contains('wx-link') ||
            e.target.classList.contains('wx-inner'))
        ) {
          if (yt.current) return;
          const x = e.target.classList.contains('wx-link')
            ? e.target
            : e.target.closest('.wx-link');
          if (x) {
            const f = Zt(x);
            if (f) {
              const $ = x.classList.contains('wx-left'),
                A = { id: f, start: $ };
              wt(A),
                (yt.current = A),
                (nt.current = { clientX: e.clientX, clientY: e.clientY }),
                (R.current = !1),
                (F.current = !0),
                Ht();
              return;
            }
          }
        }
        m && ue(m, e);
      },
      [ue, u, g, r, pt, V, et, p, Ht],
    ),
    ln = K(
      (e) => {
        const m = Vt(e);
        m &&
          (b.current = setTimeout(() => {
            c(!0), ue(m, e.touches[0]);
          }, 300));
      },
      [ue],
    ),
    an = ['e2s', 's2s', 'e2e', 's2e'],
    ee = K((e, m) => an[(e ? 1 : 0) + (m ? 0 : 2)], []),
    de = K(
      (e, m) => {
        const x = W.id,
          f = W.start;
        return e === x
          ? !0
          : !!_.find(
              ($) => $.target == e && $.source == x && $.type === ee(f, m),
            );
      },
      [W, Q, ee],
    ),
    ye = K((e) => {
      Mt(e);
    }, []),
    ne = K(
      (e) => {
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
            const f = yt.current,
              $ = e || window.event,
              A = $ ? document.elementFromPoint($.clientX, $.clientY) : null;
            if (A && f) {
              const j = A.classList.contains('wx-link')
                ? A
                : A.closest('.wx-link');
              if (j) {
                const H = Zt(j),
                  ut = j.classList.contains('wx-left');
                if (H && H !== f.id) {
                  const ht = ee(f.start, ut);
                  _.find(
                    (Dt) =>
                      Dt.target == H && Dt.source == f.id && Dt.type === ht,
                  ) ||
                    p.exec('add-link', {
                      link: {
                        source: f.id,
                        target: H,
                        type: ht,
                      },
                    });
                }
              }
            }
            wt(null), (yt.current = null), (F.current = !0);
          }
          return;
        }
        const m = $t.current;
        if (m) {
          const x = se(m);
          m.ctrlKey
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
            Lt(null),
            ($t.current = null),
            Xt(),
            (F.current = !0);
          return;
        }
        if (Tt) {
          const { ids: x, tasks: f, startX: $ } = Tt;
          xt(null), Xt(), (F.current = !0);
          return;
        }
        if (X.current) {
          const { dx: x, id: f, marker: $, value: A } = X.current;
          (X.current = null),
            typeof A < 'u' &&
              x &&
              p.exec('update-task', {
                id: f,
                task: { progress: A },
                inProgress: !1,
              }),
            $.classList.remove('wx-progress-in-drag'),
            (F.current = !0),
            Xt();
        } else if (Et) {
          const {
            id: x,
            mode: f,
            dx: $,
            l: A,
            w: j,
            start: H,
            segment: ut,
            index: ht,
          } = Et;
          if ((_t(null), H)) {
            const Ot = Math.round($ / v);
            if (!Ot)
              p.exec('drag-task', {
                id: x,
                width: j,
                left: A,
                inProgress: !1,
                ...(ut && { segmentIndex: ht }),
              });
            else {
              let Dt = {},
                It = p.getTask(x);
              ut && (It = It.segments[ht]);
              const Kt = 1440 * 60 * 1e3,
                Gt =
                  Ot *
                  (P === 'week'
                    ? 7
                    : P === 'month'
                      ? 30
                      : P === 'quarter'
                        ? 91
                        : P === 'year'
                          ? 365
                          : 1) *
                  Kt;
              f === 'move'
                ? ((Dt.start = new Date(It.start.getTime() + Gt)),
                  (Dt.end = new Date(It.end.getTime() + Gt)))
                : f === 'start'
                  ? ((Dt.start = new Date(It.start.getTime() + Gt)),
                    (Dt.end = It.end))
                  : f === 'end' &&
                    ((Dt.start = It.start),
                    (Dt.end = new Date(It.end.getTime() + Gt))),
                p.exec('update-task', {
                  id: x,
                  task: Dt,
                  ...(ut && { segmentIndex: ht }),
                });
            }
            F.current = !0;
          }
          Xt();
        }
      },
      [p, Xt, Et, v, P, ee, _],
    ),
    fe = K(
      (e, m) => {
        const { clientX: x } = m;
        if (nt.current && Z.current) {
          const f = nt.current,
            $ = x - f.clientX,
            A = m.clientY - f.clientY;
          if (!R.current) {
            if (Math.abs($) + Math.abs(A) < 5) return;
            R.current = !0;
          }
          const j = Z.current.getBoundingClientRect(),
            H = { x: x - j.left, y: m.clientY - j.top };
          (vt.current = H), tt(H);
          return;
        }
        if (g && Z.current) {
          const f = Z.current.getBoundingClientRect();
          N.current = x - f.left;
        }
        if (pt && Z.current) {
          const f = Z.current.getBoundingClientRect();
          St(($) => ($ ? { ...$, currentX: x - f.left } : null));
        }
        if (gt) {
          const f = Z.current;
          if (!f) return;
          const $ = f.getBoundingClientRect(),
            A = x - $.left,
            j = m.clientY - $.top;
          Lt((H) => ({
            ...H,
            currentX: A,
            currentY: j,
          })),
            $t.current &&
              (($t.current.currentX = A), ($t.current.currentY = j));
          return;
        }
        if (!r)
          if (X.current) {
            const { node: f, x: $, id: A } = X.current,
              j = (X.current.dx = x - $),
              H = Math.round((j / f.offsetWidth) * 100);
            let ut = X.current.progress + H;
            (X.current.value = ut = Math.min(Math.max(0, ut), 100)),
              p.exec('update-task', {
                id: A,
                task: { progress: ut },
                inProgress: !0,
              });
          } else if (Et) {
            ye(null);
            const {
                mode: f,
                l: $,
                w: A,
                x: j,
                id: H,
                start: ut,
                segment: ht,
                index: Ot,
              } = Et,
              Dt = p.getTask(H),
              It = x - j,
              Kt = Math.round(v) || 1;
            if (
              (!ut && Math.abs(It) < 20) ||
              (f === 'start' && A - It < Kt) ||
              (f === 'end' && A + It < Kt) ||
              (f === 'move' &&
                ((It < 0 && $ + It < 0) || (It > 0 && $ + A + It > O))) ||
              (Et.segment && !Sn(Dt, Et))
            )
              return;
            const Ft = { ...Et, dx: It };
            let Gt, Bt;
            if (
              (f === 'start'
                ? ((Gt = $ + It), (Bt = A - It))
                : f === 'end'
                  ? ((Gt = $), (Bt = A + It))
                  : f === 'move' && ((Gt = $ + It), (Bt = A)),
              p.exec('drag-task', {
                id: H,
                width: Bt,
                left: Gt,
                inProgress: !0,
                start: ut,
                ...(ht && { segmentIndex: Ot }),
              }),
              !Ft.start &&
                ((f === 'move' && Dt.$x == $) || (f !== 'move' && Dt.$w == A)))
            ) {
              (F.current = !0), ne();
              return;
            }
            (Ft.start = !0), _t(Ft);
          } else {
            const f = Vt(e);
            if (f) {
              const $ = p.getTask(te(f)),
                j = Vt(e, 'data-segment') || f,
                H = ae(j, m, $);
              j.style.cursor = H && !r ? 'col-resize' : 'pointer';
            }
          }
      },
      [p, r, Et, v, O, ae, ye, ne],
    ),
    un = K(
      (e) => {
        fe(e, e);
      },
      [fe],
    ),
    dn = K(
      (e) => {
        Ct
          ? (e.preventDefault(), fe(e, e.touches[0]))
          : b.current && (clearTimeout(b.current), (b.current = null));
      },
      [Ct, fe],
    ),
    be = K(
      (e) => {
        ne(e);
      },
      [ne],
    ),
    fn = K(
      (e) => {
        c(null),
          b.current && (clearTimeout(b.current), (b.current = null)),
          ne(e);
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
  const hn = K(
      (e) => {
        if (!r) {
          if (e.target.closest('[data-interactive]')) return;
          const m = Zt(e.target);
          if (m && !e.target.classList.contains('wx-link')) {
            const x = Zt(e.target, 'data-segment');
            p.exec('show-editor', {
              id: m,
              ...(x !== null && { segmentIndex: x }),
            });
          }
        }
      },
      [p, r],
    ),
    Le = K(() => {
      W && (wt(null), (yt.current = null));
    }, [W]),
    mn = K(
      (e) => {
        if (F.current) {
          F.current = !1;
          return;
        }
        if (pt && pt.currentX != null) {
          const x = qe(pt.currentX, V);
          x && on(x, pt.tasks, pt.parent), St(null);
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const m = Zt(e.target);
        if (m) {
          const x = e.target.classList;
          if (x.contains('wx-link')) {
            const f = x.contains('wx-left');
            if (!W) {
              const $ = { id: m, start: f };
              wt($), (yt.current = $);
              return;
            }
            W.id !== m &&
              !de(m, f) &&
              p.exec('add-link', {
                link: {
                  source: W.id,
                  target: m,
                  type: ee(W.start, f),
                },
              }),
              wt(null),
              (yt.current = null);
          } else if (x.contains('wx-delete-button-icon'))
            p.exec('delete-link', { id: rt }), Mt(null);
          else {
            let f;
            const $ = Vt(e, 'data-segment');
            $ && (f = $.dataset.segment * 1),
              p.exec('select-task', {
                id: m,
                toggle: e.ctrlKey || e.metaKey,
                range: e.shiftKey,
                segmentIndex: f,
              });
          }
        }
        Le();
      },
      [p, W, Q, Pt, de, ee, Le],
    ),
    gn = K((e) => {
      const m = {
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      };
      return e.color && (m.backgroundColor = e.color), m;
    }, []),
    pn = K(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    wn = K(
      (e) => {
        if (Ct || b.current) return e.preventDefault(), !1;
      },
      [Ct],
    ),
    Ne = I(() => E.map((e) => e.id), [E]),
    Ie = K(
      (e) => {
        let m = Ne.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (m = `task ${m}`), m
        );
      },
      [Ne],
    ),
    Se = K(
      (e) => {
        p.exec(e.action, e.data);
      },
      [p],
    ),
    ve = K((e) => ct && mt.byId(e).$critical, [ct, mt]),
    He = K(
      (e) => {
        if (T?.auto) {
          const m = mt.getSummaryId(e, !0),
            x = mt.getSummaryId(W.id, !0);
          return (
            W?.id &&
            !(Array.isArray(m) ? m : [m]).includes(W.id) &&
            !(Array.isArray(x) ? x : [x]).includes(e)
          );
        }
        return W;
      },
      [T, mt, W],
    );
  return /* @__PURE__ */ At('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: {
      lineHeight: `${k.length ? k[0].$h : 0}px`,
    },
    ref: Z,
    onContextMenu: wn,
    onMouseDown: cn,
    onMouseMove: un,
    onTouchStart: ln,
    onTouchMove: dn,
    onTouchEnd: fn,
    onClick: mn,
    onDoubleClick: hn,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ d(sr, {
        onSelectLink: ye,
        selectedLink: Pt,
        readonly: r,
        linkShape: a,
        linkGradient: y,
        linkStyle: D,
        linkBundling: z,
        multiTaskRows: o,
        taskPositions: M,
        cellHeight: w,
      }),
      W &&
        ft &&
        (() => {
          const e = p.getTask(W.id);
          if (!e) return null;
          const m = W.start ? e.$x : e.$x + e.$w,
            x = e.$y + (e.$h || w) / 2;
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
              /* @__PURE__ */ d('line', {
                x1: m,
                y1: x,
                x2: ft.x,
                y2: ft.y,
                stroke: 'var(--wx-gantt-link-color)',
                strokeWidth: 2,
                strokeDasharray: '6 3',
              }),
              /* @__PURE__ */ d('circle', {
                cx: ft.x,
                cy: ft.y,
                r: 4,
                fill: 'var(--wx-gantt-link-color)',
              }),
            ],
          });
        })(),
      k.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const m = lt.has(e.id),
          x =
            `wx-bar wx-${Ie(e.type)}` +
            (Ct && Et && e.id === Et.id ? ' wx-touch' : '') +
            (W && W.id === e.id ? ' wx-selected' : '') +
            (ve(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (S && e.segments ? ' wx-split' : '') +
            (m ? ' wx-collision' : ''),
          f =
            'wx-link wx-left' +
            (W ? ' wx-visible' : '') +
            (!W || (!de(e.id, !0) && He(e.id)) ? ' wx-target' : '') +
            (W && W.id === e.id && W.start ? ' wx-selected' : '') +
            (ve(e.id) ? ' wx-critical' : ''),
          $ =
            'wx-link wx-right' +
            (W ? ' wx-visible' : '') +
            (!W || (!de(e.id, !1) && He(e.id)) ? ' wx-target' : '') +
            (W && W.id === e.id && !W.start ? ' wx-selected' : '') +
            (ve(e.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ At(
          Ce,
          {
            children: [
              !e.$skip &&
                /* @__PURE__ */ At('div', {
                  className: 'wx-GKbcLEGA ' + x,
                  style: gn(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: Rt === e.id ? 0 : -1,
                  children: [
                    r
                      ? null
                      : e.id === Pt?.target && Pt?.type[2] === 's'
                        ? /* @__PURE__ */ d(Pe, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ d('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ d('div', {
                            className: 'wx-GKbcLEGA ' + f,
                            children: /* @__PURE__ */ d('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    e.type !== 'milestone'
                      ? /* @__PURE__ */ At(oe, {
                          children: [
                            B && e.progress && !(S && e.segments)
                              ? /* @__PURE__ */ d('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ d('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${e.progress}%` },
                                  }),
                                })
                              : null,
                            B &&
                            !r &&
                            !(S && e.segments) &&
                            !(e.type == 'summary' && U?.autoProgress)
                              ? /* @__PURE__ */ d('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${e.progress}% - 10px)`,
                                  },
                                  children: e.progress,
                                })
                              : null,
                            n
                              ? /* @__PURE__ */ d('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ d(n, {
                                    data: e,
                                    api: p,
                                    onAction: Se,
                                  }),
                                })
                              : S && e.segments
                                ? /* @__PURE__ */ d(or, {
                                    task: e,
                                    type: Ie(e.type),
                                  })
                                : /* @__PURE__ */ d('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: e.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ At(oe, {
                          children: [
                            /* @__PURE__ */ d('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            n
                              ? /* @__PURE__ */ d(n, {
                                  data: e,
                                  api: p,
                                  onAction: Se,
                                })
                              : /* @__PURE__ */ d('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: e.text,
                                }),
                          ],
                        }),
                    r
                      ? null
                      : e.id === Pt?.target && Pt?.type[2] === 'e'
                        ? /* @__PURE__ */ d(Pe, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ d('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ d('div', {
                            className: 'wx-GKbcLEGA ' + $,
                            children: /* @__PURE__ */ d('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    m &&
                      /* @__PURE__ */ d('div', {
                        className: 'wx-GKbcLEGA wx-collision-warning',
                        title:
                          'This task overlaps with another task in the same row',
                        children: '!',
                      }),
                    it &&
                      e.type === 'summary' &&
                      (() => {
                        const A = it.get(e.id),
                          j = Math.floor(e.$x / v),
                          H = Math.ceil((e.$x + e.$w) / v);
                        return /* @__PURE__ */ d('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: H - j }, (ut, ht) => {
                            const Ot = j + ht,
                              Dt = A?.get(Ot) || 0;
                            return /* @__PURE__ */ d(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${Dt === 0 ? ' wx-week-count-zero' : ''}`,
                                style: {
                                  position: 'absolute',
                                  left: `${Ot * v - e.$x}px`,
                                  width: `${v}px`,
                                  top: 0,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: Dt,
                              },
                              Ot,
                            );
                          }),
                        });
                      })(),
                  ],
                }),
              dt && !e.$skip_baseline
                ? /* @__PURE__ */ d('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (e.type === 'milestone' ? ' wx-milestone' : ''),
                    style: pn(e),
                  })
                : null,
            ],
          },
          e.id,
        );
      }),
      gt &&
        (() => {
          const e = Math.min(gt.startX, gt.currentX),
            m = Math.min(gt.startY, gt.currentY),
            x = Math.abs(gt.currentX - gt.startX),
            f = Math.abs(gt.currentY - gt.startY);
          return /* @__PURE__ */ d('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${e}px`,
              top: `${m}px`,
              width: `${x}px`,
              height: `${f}px`,
            },
          });
        })(),
      pt &&
        pt.currentX != null &&
        pt.tasks.map((e, m) => {
          const f =
              (Math.floor(pt.currentX / v) + (e._startCellOffset || 0)) * v,
            $ = e._originalWidth || v,
            A = e._originalHeight || w,
            j = le.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ d(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: f, top: j, width: $, height: A },
              children: /* @__PURE__ */ d('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: e.$barText || e.text,
              }),
            },
            `preview-${m}`,
          );
        }),
    ],
  });
}
function ar(t) {
  const { highlightTime: r, onScaleClick: n } = t,
    o = Yt(jt),
    s = J(o, '_scales');
  return /* @__PURE__ */ d('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: s.width },
    children: (s?.rows || []).map((i, l) =>
      /* @__PURE__ */ d(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${i.height}px` },
          children: (i.cells || []).map((h, u) => {
            const g = r ? r(h.date, h.unit) : '',
              a = 'wx-cell ' + (h.css || '') + ' ' + (g || '');
            return /* @__PURE__ */ d(
              'div',
              {
                className: 'wx-ZkvhDKir ' + a,
                style: {
                  width: `${h.width}px`,
                  cursor: n ? 'pointer' : void 0,
                },
                onClick: n ? (y) => n(h.date, h.unit, y.nativeEvent) : void 0,
                children: h.value,
              },
              u,
            );
          }),
        },
        l,
      ),
    ),
  });
}
const ur = /* @__PURE__ */ new Map();
function dr(t) {
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
              label: t,
              time: performance.now() - r.current,
              renders: n.current,
              timestamp: Date.now(),
            };
            ur.set(t, i),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: i }),
              );
          })),
          () => cancelAnimationFrame(o.current)
        );
    });
}
function fr(t) {
  const {
      readonly: r,
      fullWidth: n,
      fullHeight: o,
      taskTemplate: s,
      cellBorders: i,
      highlightTime: l,
      onScaleClick: h,
      multiTaskRows: u = !1,
      rowMapping: g = null,
      rowHeightOverrides: a = null,
      allowTaskIntersection: y = !0,
      summaryBarCounts: D = !1,
      marqueeSelect: z = !1,
      copyPaste: B = !1,
      linkShape: p,
      linkGradient: L = !1,
      linkStyle: C,
      linkBundling: _ = !1,
      showProgress: Q = !0,
    } = t,
    Y = Yt(jt),
    [V, E] = ie(Y, '_selected'),
    dt = J(Y, 'scrollTop'),
    et = J(Y, 'cellHeight'),
    bt = J(Y, 'cellWidth'),
    ct = J(Y, '_scales'),
    mt = J(Y, '_markers'),
    T = J(Y, '_scrollTask'),
    S = J(Y, 'zoom'),
    [U, q] = kt(),
    w = st(null),
    k = J(Y, '_tasks'),
    M = 1 + (ct?.rows?.length || 0),
    { taskYPositions: v, rowHeightMap: P } = I(() => {
      if (!u || !g || !k?.length)
        return { taskYPositions: null, rowHeightMap: null };
      const N = /* @__PURE__ */ new Map(),
        F = /* @__PURE__ */ new Map(),
        W = [];
      k.forEach((nt) => {
        const R = g.taskRows.get(nt.id) ?? nt.id;
        W.includes(R) || W.push(R);
      });
      const wt = /* @__PURE__ */ new Map();
      let yt = 0;
      for (const nt of W) {
        wt.set(nt, yt);
        const R = (a && a[nt]) || et;
        F.set(nt, R), (yt += R);
      }
      return (
        k.forEach((nt) => {
          const R = g.taskRows.get(nt.id) ?? nt.id;
          N.set(nt.id, wt.get(R) ?? 0);
        }),
        { taskYPositions: N, rowHeightMap: F }
      );
    }, [k, u, g, et, a]),
    lt = I(() => {
      const N = [];
      return (
        V &&
          V.length &&
          et &&
          V.forEach((F) => {
            const W = v?.get(F.id) ?? F.$y;
            let wt = et;
            if (P && g) {
              const yt = g.taskRows.get(F.id) ?? F.id;
              wt = P.get(yt) ?? et;
            }
            N.push({ height: `${wt}px`, top: `${W - 3}px` });
          }),
        N
      );
    }, [E, et, v, P, g]),
    it = I(() => Math.max(U || 0, o), [U, o]),
    gt = I(() => {
      if (
        !a ||
        !u ||
        !g ||
        !k?.length ||
        !Object.values(a).some((W) => W !== et)
      )
        return null;
      const F = [];
      return (
        k.forEach((W) => {
          const wt = g.taskRows.get(W.id) ?? W.id;
          F.includes(wt) || F.push(wt);
        }),
        F.map((W) => ({
          id: W,
          height: a[W] || et,
        }))
      );
    }, [k, g, a, u, et]);
  at(() => {
    const N = w.current;
    N && typeof dt == 'number' && (N.scrollTop = u ? 0 : dt);
  }, [dt, u]);
  const Lt = () => {
    $t();
  };
  function $t(N) {
    const F = w.current;
    if (!F) return;
    const W = {};
    (W.left = F.scrollLeft), Y.exec('scroll-chart', W);
  }
  function Tt() {
    const N = w.current,
      W = Math.ceil((U || 0) / (et || 1)) + 1,
      wt = Math.floor(((N && N.scrollTop) || 0) / (et || 1)),
      yt = Math.max(0, wt - M),
      nt = wt + W + M,
      R = yt * (et || 0);
    Y.exec('render-data', {
      start: yt,
      end: nt,
      from: R,
    });
  }
  at(() => {
    Tt();
  }, [U, dt]);
  const xt = K(
    (N) => {
      if (!N) return;
      const { id: F, mode: W } = N;
      if (W.toString().indexOf('x') < 0) return;
      const wt = w.current;
      if (!wt) return;
      const { clientWidth: yt } = wt,
        nt = Y.getTask(F);
      if (nt.$x + nt.$w < wt.scrollLeft)
        Y.exec('scroll-chart', { left: nt.$x - (bt || 0) }),
          (wt.scrollLeft = nt.$x - (bt || 0));
      else if (nt.$x >= yt + wt.scrollLeft) {
        const R = yt < nt.$w ? bt || 0 : nt.$w;
        Y.exec('scroll-chart', { left: nt.$x - yt + R }),
          (wt.scrollLeft = nt.$x - yt + R);
      }
    },
    [Y, bt],
  );
  at(() => {
    xt(T);
  }, [T]);
  function pt(N) {
    if (S && (N.ctrlKey || N.metaKey)) {
      N.preventDefault();
      const F = w.current,
        W = -Math.sign(N.deltaY),
        wt = N.clientX - (F ? F.getBoundingClientRect().left : 0);
      Y.exec('zoom-scale', {
        dir: W,
        offset: wt,
      });
    }
  }
  function St(N) {
    const F = l(N.date, N.unit);
    return F
      ? {
          css: F,
          width: N.width,
        }
      : null;
  }
  const Wt = I(
      () =>
        ct && (ct.minUnit === 'hour' || ct.minUnit === 'day') && l
          ? ct.rows[ct.rows.length - 1].cells.map(St)
          : null,
      [ct, l],
    ),
    zt = K(
      (N) => {
        (N.eventSource = 'chart'), Y.exec('hotkey', N);
      },
      [Y],
    );
  at(() => {
    const N = w.current;
    if (!N) return;
    const F = () => q(N.clientHeight);
    F();
    const W = new ResizeObserver(() => F());
    return (
      W.observe(N),
      () => {
        W.disconnect();
      }
    );
  }, [w.current]);
  const Nt = st(null);
  return (
    at(() => {
      const N = w.current;
      if (N && !Nt.current)
        return (
          (Nt.current = en(N, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (F) => zt(F),
          })),
          () => {
            Nt.current?.destroy(), (Nt.current = null);
          }
        );
    }, []),
    at(() => {
      const N = w.current;
      if (!N) return;
      const F = pt;
      return (
        N.addEventListener('wheel', F),
        () => {
          N.removeEventListener('wheel', F);
        }
      );
    }, [pt]),
    dr('chart'),
    /* @__PURE__ */ At('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: w,
      onScroll: Lt,
      children: [
        /* @__PURE__ */ d(ar, {
          highlightTime: l,
          onScaleClick: h,
          scales: ct,
        }),
        mt && mt.length
          ? /* @__PURE__ */ d('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${it}px` },
              children: mt.map((N, F) =>
                /* @__PURE__ */ d(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${N.css || ''}`,
                    style: { left: `${N.left}px` },
                    children: /* @__PURE__ */ d('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: N.text,
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
            Wt
              ? /* @__PURE__ */ d('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: Wt.map((N, F) =>
                    N
                      ? /* @__PURE__ */ d(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + N.css,
                            style: {
                              width: `${N.width}px`,
                              left: `${F * N.width}px`,
                            },
                          },
                          F,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ d(jn, { borders: i, rowLayout: gt }),
            V && V.length
              ? V.map((N, F) =>
                  N.$y
                    ? /* @__PURE__ */ d(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': N.id,
                          style: lt[F],
                        },
                        N.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ d(lr, {
              readonly: r,
              taskTemplate: s,
              multiTaskRows: u,
              rowMapping: g,
              rowHeightOverrides: a,
              allowTaskIntersection: y,
              summaryBarCounts: D,
              marqueeSelect: z,
              copyPaste: B,
              linkShape: p,
              linkGradient: L,
              linkStyle: C,
              linkBundling: _,
              showProgress: Q,
            }),
          ],
        }),
      ],
    })
  );
}
function hr(t) {
  const {
      position: r = 'after',
      size: n = 4,
      dir: o = 'x',
      onMove: s,
      onDisplayChange: i,
      compactMode: l,
      containerWidth: h = 0,
      leftThreshold: u = 50,
      rightThreshold: g = 50,
    } = t,
    [a, y] = Re(t.value ?? 0),
    [D, z] = Re(t.display ?? 'all');
  function B(M) {
    let v = 0;
    r == 'center' ? (v = n / 2) : r == 'before' && (v = n);
    const P = {
      size: [n + 'px', 'auto'],
      p: [M - v + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (o != 'x') for (let lt in P) P[lt] = P[lt].reverse();
    return P;
  }
  const [p, L] = kt(!1),
    [C, _] = kt(null),
    Q = st(0),
    Y = st(),
    V = st(),
    E = st(D);
  at(() => {
    E.current = D;
  }, [D]),
    at(() => {
      C === null && a > 0 && _(a);
    }, [C, a]);
  function dt(M) {
    return o == 'x' ? M.clientX : M.clientY;
  }
  const et = K(
      (M) => {
        const v = Y.current + dt(M) - Q.current;
        y(v);
        let P;
        v <= u ? (P = 'chart') : h - v <= g ? (P = 'grid') : (P = 'all'),
          E.current !== P && (z(P), (E.current = P)),
          V.current && clearTimeout(V.current),
          (V.current = setTimeout(() => s && s(v), 100));
      },
      [h, u, g, s],
    ),
    bt = K(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        L(!1),
        window.removeEventListener('mousemove', et),
        window.removeEventListener('mouseup', bt);
    }, [et]),
    ct = I(
      () => (D !== 'all' ? 'auto' : o == 'x' ? 'ew-resize' : 'ns-resize'),
      [D, o],
    ),
    mt = K(
      (M) => {
        (!l && (D === 'grid' || D === 'chart')) ||
          ((Q.current = dt(M)),
          (Y.current = a),
          L(!0),
          (document.body.style.cursor = ct),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', et),
          window.addEventListener('mouseup', bt));
      },
      [ct, et, bt, a, l, D],
    );
  function T() {
    z('all'), C !== null && (y(C), s && s(C));
  }
  function S(M) {
    if (l) {
      const v = D === 'chart' ? 'grid' : 'chart';
      z(v), i(v);
    } else if (D === 'grid' || D === 'chart') T(), i('all');
    else {
      const v = M === 'left' ? 'chart' : 'grid';
      z(v), i(v);
    }
  }
  function U() {
    S('left');
  }
  function q() {
    S('right');
  }
  const w = I(() => B(a), [a, r, n, o]),
    k = [
      'wx-resizer',
      `wx-resizer-${o}`,
      `wx-resizer-display-${D}`,
      p ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ At('div', {
    className: 'wx-pFykzMlT ' + k,
    onMouseDown: mt,
    style: { width: w.size[0], height: w.size[1], cursor: ct },
    children: [
      /* @__PURE__ */ At('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ d('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ d('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: U,
            }),
          }),
          /* @__PURE__ */ d('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ d('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: q,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ d('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const mr = 650;
function rn(t) {
  let r;
  function n() {
    (r = new ResizeObserver((s) => {
      for (let i of s)
        if (i.target === document.body) {
          let l = i.contentRect.width <= mr;
          t(l);
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
const gr = (t, r, n, o) => t < o && r > n;
function Me(t) {
  const r = t.start instanceof Date ? t.start.getTime() : 0;
  if (!r) return null;
  let n;
  return (
    t.end instanceof Date
      ? (n = t.end.getTime())
      : typeof t.duration == 'number' && t.duration > 0
        ? (n = r + t.duration * 864e5)
        : (n = r),
    { start: r, end: n }
  );
}
function pr(t, r) {
  const n = /* @__PURE__ */ new Map(),
    o = /* @__PURE__ */ new Map(),
    s = /* @__PURE__ */ new Map();
  return (
    t.forEach((i) => {
      if (i.type === 'summary') return;
      const l = r.taskRows.get(i.id) ?? i.id;
      s.has(l) || s.set(l, []), s.get(l).push(i);
    }),
    s.forEach((i, l) => {
      const h = [],
        u = [...i].sort((g, a) => {
          const y = Me(g),
            D = Me(a);
          return (y?.start ?? 0) - (D?.start ?? 0);
        });
      for (const g of u) {
        const a = Me(g);
        if (!a) {
          n.set(g.id, 0);
          continue;
        }
        let y = !1;
        for (let D = 0; D < h.length; D++)
          if (!h[D].some((B) => gr(a.start, a.end, B.start, B.end))) {
            h[D].push(a), n.set(g.id, D), (y = !0);
            break;
          }
        y || (h.push([a]), n.set(g.id, h.length - 1));
      }
      o.set(l, h.length);
    }),
    { taskLane: n, rowLaneCounts: o }
  );
}
function wr(t, r, n) {
  const o = {};
  return (
    t.forEach((l, h) => {
      if (l <= 1) return;
      const u = 6 + l * n + (l - 1) * 4;
      u > r && (o[h] = u);
    }),
    o
  );
}
function xr(t, r) {
  if (!t && !r) return null;
  const n = {};
  let o = !1;
  if (t) for (const [s, i] of Object.entries(t)) (n[s] = i), (o = !0);
  if (r)
    for (const [s, i] of Object.entries(r))
      n[s] !== void 0 ? (n[s] = Math.max(n[s], i)) : (n[s] = i), (o = !0);
  return o ? n : null;
}
function yr(t) {
  const {
      taskTemplate: r,
      readonly: n,
      cellBorders: o,
      highlightTime: s,
      onScaleClick: i,
      onTableAPIChange: l,
      multiTaskRows: h = !1,
      rowMapping: u = null,
      rowHeightOverrides: g = null,
      allowTaskIntersection: a = !0,
      summaryBarCounts: y = !1,
      marqueeSelect: D = !1,
      copyPaste: z = !1,
      linkShape: B,
      linkGradient: p = !1,
      linkStyle: L,
      linkBundling: C = !1,
      showProgress: _ = !0,
    } = t,
    Q = Yt(jt),
    Y = J(Q, '_tasks'),
    V = J(Q, '_scales'),
    E = J(Q, 'cellHeight'),
    dt = J(Q, 'columns'),
    et = J(Q, '_scrollTask'),
    bt = J(Q, 'undo'),
    ct = I(() => {
      if (!h) return u;
      const X = /* @__PURE__ */ new Map(),
        rt = /* @__PURE__ */ new Map();
      return (
        Y.forEach((Mt) => {
          const Pt = Mt.row ?? Mt.id;
          rt.set(Mt.id, Pt), X.has(Pt) || X.set(Pt, []), X.get(Pt).push(Mt.id);
        }),
        { rowMap: X, taskRows: rt }
      );
    }, [Y, h, u]),
    mt = I(() => {
      if (!h || !ct || !Y?.length) return g;
      const { rowLaneCounts: X } = pr(Y, ct),
        rt = E - 6,
        Mt = wr(X, E, rt);
      return xr(Mt, g);
    }, [Y, h, ct, E, g]),
    [T, S] = kt(!1);
  let [U, q] = kt(0);
  const [w, k] = kt(0),
    [M, v] = kt(0),
    [P, lt] = kt(void 0),
    [it, gt] = kt('all'),
    Lt = st(null),
    $t = K(
      (X) => {
        S(
          (rt) => (
            X !== rt &&
              (X
                ? ((Lt.current = it), it === 'all' && gt('grid'))
                : (!Lt.current || Lt.current === 'all') && gt('all')),
            X
          ),
        );
      },
      [it],
    );
  at(() => {
    const X = rn($t);
    return (
      X.observe(),
      () => {
        X.disconnect();
      }
    );
  }, [$t]);
  const Tt = I(() => {
    let X;
    return (
      dt.every((rt) => rt.width && !rt.flexgrow)
        ? (X = dt.reduce((rt, Mt) => rt + parseInt(Mt.width), 0))
        : T && it === 'chart'
          ? (X = parseInt(dt.find((rt) => rt.id === 'action')?.width) || 50)
          : (X = 440),
      (U = X),
      X
    );
  }, [dt, T, it]);
  at(() => {
    q(Tt);
  }, [Tt]);
  const xt = I(() => (w ?? 0) - (P ?? 0), [w, P]),
    pt = I(() => V.width, [V]),
    St = 14,
    Wt = I(() => {
      let X;
      if (!h || !ct) X = Y.length * E;
      else {
        const rt = [];
        Y.forEach((Mt) => {
          const Pt = ct.taskRows.get(Mt.id) ?? Mt.id;
          rt.includes(Pt) || rt.push(Pt);
        }),
          (X = 0);
        for (const Mt of rt) X += (mt && mt[Mt]) || E;
      }
      return X + St;
    }, [Y, E, h, ct, mt]),
    zt = I(() => V.height + Wt + xt, [V, Wt, xt]),
    Nt = I(() => U + pt, [U, pt]),
    N = st(null),
    F = st(!1),
    W = st(null);
  at(() => {
    const X = () => {
      (F.current = !0),
        clearTimeout(W.current),
        (W.current = setTimeout(() => {
          F.current = !1;
        }, 300));
    };
    return (
      Q.on('zoom-scale', X),
      Q.on('set-scale', X),
      () => {
        clearTimeout(W.current);
      }
    );
  }, [Q]);
  const wt = K(() => {
      Promise.resolve().then(() => {
        if (!F.current && (w ?? 0) > (Nt ?? 0)) {
          const X = (w ?? 0) - U;
          Q.exec('expand-scale', { minWidth: X });
        }
      });
    }, [w, Nt, U, Q]),
    yt = st(wt);
  (yt.current = wt),
    at(() => {
      let X;
      return (
        N.current &&
          ((X = new ResizeObserver(() => yt.current())), X.observe(N.current)),
        () => {
          X && X.disconnect();
        }
      );
    }, [N.current]);
  const nt = st(null),
    R = st(null),
    vt = K(() => {
      const X = nt.current;
      X &&
        Q.exec('scroll-chart', {
          top: X.scrollTop,
        });
    }, [Q]),
    ft = st({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  at(() => {
    ft.current = {
      rTasks: Y,
      rScales: V,
      rCellHeight: E,
      scrollSize: xt,
      ganttDiv: nt.current,
      ganttHeight: M ?? 0,
    };
  }, [Y, V, E, xt, M]);
  const tt = K(
    (X) => {
      if (!X) return;
      const {
        rTasks: rt,
        rScales: Mt,
        rCellHeight: Pt,
        scrollSize: Ct,
        ganttDiv: c,
        ganttHeight: b,
      } = ft.current;
      if (!c) return;
      const { id: O } = X,
        G = rt.findIndex((Z) => Z.id === O);
      if (G > -1) {
        const Z = b - Mt.height,
          ot = G * Pt,
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
      const X = nt.current,
        rt = R.current;
      if (!X || !rt) return;
      const Mt = () => {
          Xn(() => {
            v(X.offsetHeight), k(X.offsetWidth), lt(rt.offsetWidth);
          });
        },
        Pt = new ResizeObserver(Mt);
      return Pt.observe(X), () => Pt.disconnect();
    }, [nt.current]);
  const Et = st(null),
    _t = st(null);
  return (
    at(() => {
      _t.current && (_t.current.destroy(), (_t.current = null));
      const X = Et.current;
      if (X)
        return (
          (_t.current = en(X, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': bt,
              'ctrl+y': bt,
            },
            exec: (rt) => {
              rt.isInput || Q.exec('hotkey', rt);
            },
          })),
          () => {
            _t.current?.destroy(), (_t.current = null);
          }
        );
    }, [bt]),
    /* @__PURE__ */ d('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: nt,
      onScroll: vt,
      children: /* @__PURE__ */ d('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: zt, width: '100%' },
        ref: R,
        children: /* @__PURE__ */ d('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: M,
            width: P,
          },
          children: /* @__PURE__ */ At('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: Et,
            children: [
              dt.length
                ? /* @__PURE__ */ At(oe, {
                    children: [
                      /* @__PURE__ */ d(qn, {
                        display: it,
                        compactMode: T,
                        columnWidth: Tt,
                        width: U,
                        readonly: n,
                        fullHeight: Wt,
                        onTableAPIChange: l,
                        multiTaskRows: h,
                        rowMapping: ct,
                        rowHeightOverrides: mt,
                      }),
                      /* @__PURE__ */ d(hr, {
                        value: U,
                        display: it,
                        compactMode: T,
                        containerWidth: w,
                        onMove: (X) => q(X),
                        onDisplayChange: (X) => gt(X),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ d('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: N,
                children: /* @__PURE__ */ d(fr, {
                  readonly: n,
                  fullWidth: pt,
                  fullHeight: Wt,
                  taskTemplate: r,
                  cellBorders: o,
                  highlightTime: s,
                  onScaleClick: i,
                  multiTaskRows: h,
                  rowMapping: ct,
                  rowHeightOverrides: mt,
                  allowTaskIntersection: a,
                  summaryBarCounts: y,
                  marqueeSelect: D,
                  copyPaste: z,
                  linkShape: B,
                  linkGradient: p,
                  linkStyle: L,
                  linkBundling: C,
                  showProgress: _,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function br(t) {
  return {
    year: '%Y',
    quarter: `${t('Q')} %Q`,
    month: '%M',
    week: `${t('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function vr(t, r) {
  return typeof t == 'function' ? t : pe(t, r);
}
function sn(t, r) {
  return t.map(({ format: n, ...o }) => ({
    ...o,
    format: vr(n, r),
  }));
}
function kr(t, r) {
  const n = br(r);
  for (let o in n) n[o] = pe(n[o], t);
  return n;
}
function $r(t, r) {
  if (!t || !t.length) return t;
  const n = pe('%d-%m-%Y', r);
  return t.map((o) =>
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
function Tr(t, r) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((n) => ({
          ...n,
          scales: sn(n.scales, r),
        })),
      }
    : t;
}
const Mr = (t) =>
    t
      .split('-')
      .map((r) => (r ? r.charAt(0).toUpperCase() + r.slice(1) : ''))
      .join(''),
  Cr = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  Rr = [],
  Dr = [],
  Er = [],
  Lr = [],
  Nr = { type: 'forward' },
  Qr = je(function (
    {
      taskTemplate: r = null,
      markers: n = Rr,
      taskTypes: o = _n,
      tasks: s = Dr,
      selected: i = Er,
      activeTask: l = null,
      links: h = Lr,
      scales: u = Cr,
      columns: g = zn,
      start: a = null,
      end: y = null,
      lengthUnit: D = 'day',
      durationUnit: z = 'day',
      cellWidth: B = 100,
      cellHeight: p = 38,
      scaleHeight: L = 36,
      readonly: C = !1,
      cellBorders: _ = 'full',
      zoom: Q = !1,
      baselines: Y = !1,
      highlightTime: V = null,
      onScaleClick: E = null,
      init: dt = null,
      autoScale: et = !0,
      unscheduledTasks: bt = !1,
      criticalPath: ct = null,
      schedule: mt = Nr,
      projectStart: T = null,
      projectEnd: S = null,
      calendar: U = null,
      undo: q = !1,
      splitTasks: w = !1,
      multiTaskRows: k = !1,
      rowHeightOverrides: M = null,
      allowTaskIntersection: v = !0,
      summaryBarCounts: P = !1,
      marqueeSelect: lt = !1,
      copyPaste: it = !1,
      linkShape: gt,
      linkGradient: Lt = !1,
      linkStyle: $t,
      linkBundling: Tt = !1,
      showProgress: xt = !0,
      summary: pt = null,
      _export: St = !1,
      ...Wt
    },
    zt,
  ) {
    const Nt = st();
    Nt.current = Wt;
    const N = I(() => new Hn(Wn), []),
      F = I(() => ({ ...De, ...xe }), []),
      W = Yt(Ut.i18n),
      wt = I(() => (W ? W.extend(F, !0) : we(F)), [W, F]),
      yt = I(() => wt.getRaw().calendar, [wt]),
      nt = I(() => {
        let Ct = {
          zoom: Tr(Q, yt),
          scales: sn(u, yt),
          columns: $r(g, yt),
          links: Pn(h),
          cellWidth: B,
        };
        return (
          Ct.zoom &&
            (Ct = {
              ...Ct,
              ...An(Ct.zoom, kr(yt, wt.getGroup('gantt')), Ct.scales, B),
            }),
          Ct
        );
      }, [Q, u, g, h, B, yt, wt]),
      R = st(null);
    R.current !== s &&
      (St || Oe(s, { durationUnit: z, splitTasks: w, calendar: U }),
      (R.current = s)),
      at(() => {
        St || Oe(s, { durationUnit: z, splitTasks: w, calendar: U });
      }, [s, z, U, w, St]);
    const vt = I(() => {
        if (!k) return null;
        const Ct = /* @__PURE__ */ new Map(),
          c = /* @__PURE__ */ new Map(),
          b = (O) => {
            O.forEach((G) => {
              const Z = G.row ?? G.id;
              c.set(G.id, Z),
                Ct.has(Z) || Ct.set(Z, []),
                Ct.get(Z).push(G.id),
                G.data && G.data.length > 0 && b(G.data);
            });
          };
        return b(s), { rowMap: Ct, taskRows: c };
      }, [s, k]),
      ft = I(() => N.in, [N]),
      tt = st(null);
    tt.current === null &&
      ((tt.current = new Ln((Ct, c) => {
        const b = 'on' + Mr(Ct);
        Nt.current && Nt.current[b] && Nt.current[b](c);
      })),
      ft.setNext(tt.current));
    const [Et, _t] = kt(null),
      X = st(null);
    X.current = Et;
    const rt = I(
      () => ({
        getState: N.getState.bind(N),
        getReactiveState: N.getReactive.bind(N),
        getStores: () => ({ data: N }),
        exec: ft.exec.bind(ft),
        setNext: (Ct) => ((tt.current = tt.current.setNext(Ct)), tt.current),
        intercept: ft.intercept.bind(ft),
        on: ft.on.bind(ft),
        detach: ft.detach.bind(ft),
        getTask: N.getTask.bind(N),
        serialize: () => N.serialize(),
        getTable: (Ct) =>
          Ct
            ? new Promise((c) => setTimeout(() => c(X.current), 1))
            : X.current,
        getHistory: () => N.getHistory(),
      }),
      [N, ft],
    );
    at(() => {
      const Ct = () => {
        const { zoom: c, scales: b } = rt.getState(),
          G = c?.levels?.[c.level]?.scales?.[0]?.unit ?? b?.[0]?.unit;
        G && rt.exec('scale-change', { level: c?.level, unit: G });
      };
      rt.on('zoom-scale', Ct), rt.on('set-scale', Ct);
    }, [rt]),
      at(() => {
        rt.intercept('set-scale', ({ unit: Ct, date: c }) => {
          const { zoom: b } = rt.getState();
          if (!b || !b.levels) return !1;
          const O = b.levels.findIndex((ot) =>
            ot.scales.some((Rt) => Rt.unit === Ct),
          );
          if (O < 0) return !1;
          const G = b.levels[O];
          if (O !== b.level) {
            const ot = Math.round((G.minCellWidth + G.maxCellWidth) / 2);
            rt.getStores().data.setState({
              scales: G.scales,
              cellWidth: ot,
              _cellWidth: ot,
              zoom: { ...b, level: O },
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
        ? N.init({
            tasks: s,
            links: nt.links,
            start: a,
            columns: nt.columns,
            end: y,
            lengthUnit: D,
            cellWidth: nt.cellWidth,
            cellHeight: p,
            scaleHeight: L,
            scales: nt.scales,
            taskTypes: o,
            zoom: nt.zoom,
            selected: i,
            activeTask: l,
            baselines: Y,
            autoScale: et,
            unscheduledTasks: bt,
            markers: n,
            durationUnit: z,
            criticalPath: ct,
            schedule: mt,
            projectStart: T,
            projectEnd: S,
            calendar: U,
            undo: q,
            _weekStart: yt.weekStart,
            splitTasks: w,
            summary: pt,
          })
        : dt && dt(rt),
        Mt.current++;
    }, [
      rt,
      dt,
      s,
      nt,
      a,
      y,
      D,
      p,
      L,
      o,
      i,
      l,
      Y,
      et,
      bt,
      n,
      z,
      ct,
      mt,
      T,
      S,
      U,
      q,
      yt,
      w,
      pt,
      N,
    ]),
      Mt.current === 0 &&
        N.init({
          tasks: s,
          links: nt.links,
          start: a,
          columns: nt.columns,
          end: y,
          lengthUnit: D,
          cellWidth: nt.cellWidth,
          cellHeight: p,
          scaleHeight: L,
          scales: nt.scales,
          taskTypes: o,
          zoom: nt.zoom,
          selected: i,
          activeTask: l,
          baselines: Y,
          autoScale: et,
          unscheduledTasks: bt,
          markers: n,
          durationUnit: z,
          criticalPath: ct,
          schedule: mt,
          projectStart: T,
          projectEnd: S,
          calendar: U,
          undo: q,
          _weekStart: yt.weekStart,
          splitTasks: w,
          summary: pt,
        });
    const Pt = I(
      () =>
        U
          ? (Ct, c) =>
              (c == 'day' && !U.getDayHours(Ct)) ||
              (c == 'hour' && !U.getDayHours(Ct))
                ? 'wx-weekend'
                : ''
          : V,
      [U, V],
    );
    return /* @__PURE__ */ d(Ut.i18n.Provider, {
      value: wt,
      children: /* @__PURE__ */ d(jt.Provider, {
        value: rt,
        children: /* @__PURE__ */ d(yr, {
          taskTemplate: r,
          readonly: C,
          cellBorders: _,
          highlightTime: Pt,
          onScaleClick: E,
          onTableAPIChange: _t,
          multiTaskRows: k,
          rowMapping: vt,
          rowHeightOverrides: M,
          allowTaskIntersection: v,
          summaryBarCounts: P,
          marqueeSelect: lt,
          copyPaste: it,
          linkShape: gt,
          linkGradient: Lt,
          linkStyle: $t,
          linkBundling: Tt,
          showProgress: xt,
        }),
      }),
    });
  });
function Zr({ api: t = null, items: r = [] }) {
  const n = Yt(Ut.i18n),
    o = I(() => n || we(xe), [n]),
    s = I(() => o.getGroup('gantt'), [o]),
    i = qt(t, '_selected'),
    l = qt(t, 'undo'),
    h = qt(t, 'history'),
    u = qt(t, 'splitTasks'),
    g = ['undo', 'redo'],
    a = I(() => {
      const D = We({ undo: !0, splitTasks: !0 });
      return (
        r.length
          ? r
          : We({
              undo: l,
              splitTasks: u,
            })
      ).map((B) => {
        let p = { ...B, disabled: !1 };
        return (
          (p.handler = tn(D, p.id) ? (L) => Je(t, L.id, null, s) : p.handler),
          p.text && (p.text = s(p.text)),
          p.menuText && (p.menuText = s(p.menuText)),
          p
        );
      });
    }, [r, t, s, l, u]),
    y = I(() => {
      const D = [];
      return (
        a.forEach((z) => {
          const B = z.id;
          if (B === 'add-task') D.push(z);
          else if (g.includes(B))
            g.includes(B) &&
              D.push({
                ...z,
                disabled: z.isDisabled(h),
              });
          else {
            if (!i?.length || !t) return;
            D.push({
              ...z,
              disabled:
                z.isDisabled && i.some((p) => z.isDisabled(p, t.getState())),
            });
          }
        }),
        D.filter((z, B) => {
          if (t && z.isHidden)
            return !i.some((p) => z.isHidden(p, t.getState()));
          if (z.comp === 'separator') {
            const p = D[B + 1];
            if (!p || p.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, i, h, a]);
  return n
    ? /* @__PURE__ */ d(Ye, { items: y })
    : /* @__PURE__ */ d(Ut.i18n.Provider, {
        value: o,
        children: /* @__PURE__ */ d(Ye, { items: y }),
      });
}
const Jr = je(function (
  {
    options: r = [],
    api: n = null,
    resolver: o = null,
    filter: s = null,
    at: i = 'point',
    children: l,
    onClick: h,
    css: u,
  },
  g,
) {
  const a = st(null),
    y = st(null),
    D = Yt(Ut.i18n),
    z = I(() => D || we({ ...xe, ...De }), [D]),
    B = I(() => z.getGroup('gantt'), [z]),
    p = qt(n, 'taskTypes'),
    L = qt(n, 'selected'),
    C = qt(n, '_selected'),
    _ = qt(n, 'splitTasks'),
    Q = qt(n, 'summary'),
    Y = I(
      () => ({
        splitTasks: _,
        taskTypes: p,
        summary: Q,
      }),
      [_, p, Q],
    ),
    V = I(() => Ge(Y), [Y]);
  at(() => {
    n &&
      (n.on('scroll-chart', () => {
        a.current && a.current.show && a.current.show();
      }),
      n.on('drag-task', () => {
        a.current && a.current.show && a.current.show();
      }));
  }, [n]);
  function E(q) {
    return q.map(
      (w) => (
        (w = { ...w }),
        w.text && (w.text = B(w.text)),
        w.subtext && (w.subtext = B(w.subtext)),
        w.data && (w.data = E(w.data)),
        w
      ),
    );
  }
  function dt() {
    const q = r.length ? r : Ge(Y);
    return E(q);
  }
  const et = I(() => dt(), [n, r, Y, B]),
    bt = I(() => (C && C.length ? C : []), [C]),
    ct = K(
      (q, w) => {
        let k = q ? n?.getTask(q) : null;
        if (o) {
          const M = o(q, w);
          k = M === !0 ? k : M;
        }
        if (k) {
          const M = Zt(w.target, 'data-segment');
          M !== null
            ? (y.current = { id: k.id, segmentIndex: M })
            : (y.current = k.id),
            (!Array.isArray(L) || !L.includes(k.id)) &&
              n &&
              n.exec &&
              n.exec('select-task', { id: k.id });
        }
        return k;
      },
      [n, o, L],
    ),
    mt = K(
      (q) => {
        const w = q.action;
        w && (tn(V, w.id) && Je(n, w.id, y.current, B), h && h(q));
      },
      [n, B, h, V],
    ),
    T = K(
      (q, w) => {
        const k = bt.length ? bt : w ? [w] : [];
        let M = s ? k.every((v) => s(q, v)) : !0;
        if (
          M &&
          (q.isHidden &&
            (M = !k.some((v) => q.isHidden(v, n.getState(), y.current))),
          q.isDisabled)
        ) {
          const v = k.some((P) => q.isDisabled(P, n.getState(), y.current));
          q.disabled = v;
        }
        return M;
      },
      [s, bt, n],
    );
  Qe(g, () => ({
    show: (q, w) => {
      a.current && a.current.show && a.current.show(q, w);
    },
  }));
  const S = K((q) => {
      a.current && a.current.show && a.current.show(q);
    }, []),
    U = /* @__PURE__ */ At(oe, {
      children: [
        /* @__PURE__ */ d(Bn, {
          filter: T,
          options: et,
          dataKey: 'id',
          resolver: ct,
          onClick: mt,
          at: i,
          ref: a,
          css: u,
        }),
        /* @__PURE__ */ d('span', {
          onContextMenu: S,
          'data-menu-ignore': 'true',
          children: typeof l == 'function' ? l() : l,
        }),
      ],
    });
  if (!D && Ut.i18n?.Provider) {
    const q = Ut.i18n.Provider;
    return /* @__PURE__ */ d(q, { value: z, children: U });
  }
  return U;
});
function Ir({ api: t, autoSave: r, onLinksChange: n }) {
  const s = Yt(Ut.i18n).getGroup('gantt'),
    i = J(t, 'activeTask'),
    l = J(t, '_activeTask'),
    h = J(t, '_links'),
    u = J(t, 'schedule'),
    g = J(t, 'unscheduledTasks'),
    [a, y] = kt();
  function D() {
    if (i) {
      const L = h
          .filter((_) => _.target == i)
          .map((_) => ({ link: _, task: t.getTask(_.source) })),
        C = h
          .filter((_) => _.source == i)
          .map((_) => ({ link: _, task: t.getTask(_.target) }));
      return [
        { title: s('Predecessors'), data: L },
        { title: s('Successors'), data: C },
      ];
    }
  }
  at(() => {
    y(D());
  }, [i, h]);
  const z = I(
    () => [
      { id: 'e2s', label: s('End-to-start') },
      { id: 's2s', label: s('Start-to-start') },
      { id: 'e2e', label: s('End-to-end') },
      { id: 's2e', label: s('Start-to-end') },
    ],
    [s],
  );
  function B(L) {
    r
      ? t.exec('delete-link', { id: L })
      : (y((C) =>
          (C || []).map((_) => ({
            ..._,
            data: _.data.filter((Q) => Q.link.id !== L),
          })),
        ),
        n &&
          n({
            id: L,
            action: 'delete-link',
            data: { id: L },
          }));
  }
  function p(L, C) {
    r
      ? t.exec('update-link', {
          id: L,
          link: C,
        })
      : (y((_) =>
          (_ || []).map((Q) => ({
            ...Q,
            data: Q.data.map((Y) =>
              Y.link.id === L ? { ...Y, link: { ...Y.link, ...C } } : Y,
            ),
          })),
        ),
        n &&
          n({
            id: L,
            action: 'update-link',
            data: {
              id: L,
              link: C,
            },
          }));
  }
  return /* @__PURE__ */ d(oe, {
    children: (a || []).map((L, C) =>
      L.data.length
        ? /* @__PURE__ */ d(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ d(Ut.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ d(yn, {
                  label: L.title,
                  position: 'top',
                  children: /* @__PURE__ */ d('table', {
                    children: /* @__PURE__ */ d('tbody', {
                      children: L.data.map((_) =>
                        /* @__PURE__ */ At(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ d('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ d('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: _.task.text || '',
                                }),
                              }),
                              u?.auto && _.link.type === 'e2s'
                                ? /* @__PURE__ */ d('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ d(bn, {
                                      type: 'number',
                                      placeholder: s('Lag'),
                                      value: _.link.lag,
                                      disabled: g && l?.unscheduled,
                                      onChange: (Q) => {
                                        Q.input ||
                                          p(_.link.id, { lag: Q.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ d('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ d('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ d(vn, {
                                    value: _.link.type,
                                    placeholder: s('Select link type'),
                                    options: z,
                                    onChange: (Q) =>
                                      p(_.link.id, { type: Q.value }),
                                    children: ({ option: Q }) => Q.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ d('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ d('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => B(_.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          _.link.id,
                        ),
                      ),
                    }),
                  }),
                }),
              }),
            },
            C,
          )
        : null,
    ),
  });
}
function Sr(t) {
  const { value: r, time: n, format: o, onchange: s, onChange: i, ...l } = t,
    h = i ?? s;
  function u(g) {
    const a = new Date(g.value);
    a.setHours(r.getHours()),
      a.setMinutes(r.getMinutes()),
      h && h({ value: a });
  }
  return /* @__PURE__ */ At('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ d(kn, {
        ...l,
        value: r,
        onChange: u,
        format: o,
        buttons: ['today'],
        clear: !1,
      }),
      n ? /* @__PURE__ */ d($n, { value: r, onChange: h, format: o }) : null,
    ],
  });
}
re('select', Mn);
re('date', Sr);
re('twostate', Cn);
re('slider', Rn);
re('counter', Dn);
re('links', Ir);
function ts({
  api: t,
  items: r = [],
  css: n = '',
  layout: o = 'default',
  readonly: s = !1,
  placement: i = 'sidebar',
  bottomBar: l = !0,
  topBar: h = !0,
  autoSave: u = !0,
  focus: g = !1,
  hotkeys: a = {},
}) {
  const y = Yt(Ut.i18n),
    D = I(() => y || we({ ...xe, ...De }), [y]),
    z = I(() => D.getGroup('gantt'), [D]),
    B = D.getRaw(),
    p = I(() => {
      const R = B.gantt?.dateFormat || B.formats?.dateFormat;
      return pe(R, B.calendar);
    }, [B]),
    L = I(() => {
      if (h === !0 && !s) {
        const R = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: z('Delete'),
            id: 'delete',
          },
        ];
        return u
          ? { items: R }
          : {
              items: [
                ...R,
                {
                  comp: 'button',
                  type: 'primary',
                  text: z('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return h;
    }, [h, s, u, z]),
    [C, _] = kt(!1),
    Q = I(() => (C ? 'wx-full-screen' : ''), [C]),
    Y = K((R) => {
      _(R);
    }, []);
  at(() => {
    const R = rn(Y);
    return (
      R.observe(),
      () => {
        R.disconnect();
      }
    );
  }, [Y]);
  const V = J(t, '_activeTask'),
    E = J(t, 'activeTask'),
    dt = J(t, 'unscheduledTasks'),
    et = J(t, 'summary'),
    bt = J(t, 'links'),
    ct = J(t, 'splitTasks'),
    mt = I(() => ct && E?.segmentIndex, [ct, E]),
    T = I(() => mt || mt === 0, [mt]),
    S = J(t, 'taskTypes'),
    U = I(
      () => On({ unscheduledTasks: dt, summary: et, taskTypes: S }),
      [dt, et, S],
    ),
    q = J(t, 'undo'),
    [w, k] = kt({}),
    [M, v] = kt(null),
    [P, lt] = kt(),
    [it, gt] = kt(null),
    Lt = I(() => {
      if (!V) return null;
      let R;
      if ((T && V.segments ? (R = { ...V.segments[mt] }) : (R = { ...V }), s)) {
        let vt = { parent: R.parent };
        return (
          U.forEach(({ key: ft, comp: tt }) => {
            if (tt !== 'links') {
              const Et = R[ft];
              tt === 'date' && Et instanceof Date
                ? (vt[ft] = p(Et))
                : tt === 'slider' && ft === 'progress'
                  ? (vt[ft] = `${Et}%`)
                  : (vt[ft] = Et);
            }
          }),
          vt
        );
      }
      return R || null;
    }, [V, T, mt, s, U, p]);
  at(() => {
    lt(Lt);
  }, [Lt]),
    at(() => {
      k({}), gt(null), v(null);
    }, [E]);
  function $t(R, vt) {
    return R.map((ft) => {
      const tt = { ...ft };
      if (
        (ft.config && (tt.config = { ...tt.config }),
        tt.comp === 'links' &&
          t &&
          ((tt.api = t), (tt.autoSave = u), (tt.onLinksChange = pt)),
        tt.comp === 'select' && tt.key === 'type')
      ) {
        const Et = tt.options ?? [];
        tt.options = Et.map((_t) => ({
          ..._t,
          label: z(_t.label),
        }));
      }
      return (
        tt.comp === 'slider' &&
          tt.key === 'progress' &&
          (tt.labelTemplate = (Et) => `${z(tt.label)} ${Et}%`),
        tt.label && (tt.label = z(tt.label)),
        tt.config?.placeholder &&
          (tt.config.placeholder = z(tt.config.placeholder)),
        vt &&
          (tt.isDisabled && tt.isDisabled(vt, t.getState())
            ? (tt.disabled = !0)
            : delete tt.disabled),
        tt
      );
    });
  }
  const Tt = I(() => {
      let R = r.length ? r : U;
      return (
        (R = $t(R, P)),
        P ? R.filter((vt) => !vt.isHidden || !vt.isHidden(P, t.getState())) : R
      );
    }, [r, U, P, z, t, u]),
    xt = I(() => Tt.map((R) => R.key), [Tt]);
  function pt({ id: R, action: vt, data: ft }) {
    k((tt) => ({
      ...tt,
      [R]: { action: vt, data: ft },
    }));
  }
  const St = K(() => {
      for (let R in w)
        if (bt.byId(R)) {
          const { action: vt, data: ft } = w[R];
          t.exec(vt, ft);
        }
    }, [t, w, bt]),
    Wt = K(() => {
      const R = E?.id || E;
      if (T) {
        if (V?.segments) {
          const vt = V.segments.filter((ft, tt) => tt !== mt);
          t.exec('update-task', {
            id: R,
            task: { segments: vt },
          });
        }
      } else t.exec('delete-task', { id: R });
    }, [t, E, T, V, mt]),
    zt = K(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    Nt = K(
      (R) => {
        const { item: vt, changes: ft } = R;
        vt.id === 'delete' && Wt(),
          vt.id === 'save' && (ft.length ? zt() : St()),
          vt.comp && zt();
      },
      [t, E, u, St, Wt, zt],
    ),
    N = K(
      (R, vt, ft) => (
        dt && R.type === 'summary' && (R.unscheduled = !1),
        Ze(R, t.getState(), vt),
        ft || v(!1),
        R
      ),
      [dt, t],
    ),
    F = K(
      (R) => {
        (R = {
          ...R,
          unscheduled: dt && R.unscheduled && R.type !== 'summary',
        }),
          delete R.links,
          delete R.data,
          (xt.indexOf('duration') === -1 || (R.segments && !R.duration)) &&
            delete R.duration;
        const vt = {
          id: E?.id || E,
          task: R,
          ...(T && { segmentIndex: mt }),
        };
        u && M && (vt.inProgress = M), t.exec('update-task', vt), u || St();
      },
      [t, E, dt, u, St, xt, T, mt, M],
    ),
    W = K(
      (R) => {
        let { update: vt, key: ft, input: tt } = R;
        if ((tt && v(!0), (R.update = N({ ...vt }, ft, tt)), !u)) lt(R.update);
        else if (!it && !tt) {
          const Et = Tt.find((rt) => rt.key === ft),
            _t = vt[ft];
          (!Et.validation || Et.validation(_t)) &&
            (!Et.required || _t) &&
            F(R.update);
        }
      },
      [u, N, it, Tt, F],
    ),
    wt = K(
      (R) => {
        u || F(R.values);
      },
      [u, F],
    ),
    yt = K((R) => {
      gt(R.errors);
    }, []),
    nt = I(
      () =>
        q
          ? {
              'ctrl+z': (R) => {
                R.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (R) => {
                R.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [q, t],
    );
  return Lt
    ? /* @__PURE__ */ d(Tn, {
        children: /* @__PURE__ */ d(Kn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${Q} ${n}`,
          items: Tt,
          values: Lt,
          topBar: L,
          bottomBar: l,
          placement: i,
          layout: o,
          readonly: s,
          autoSave: u,
          focus: g,
          onAction: Nt,
          onSave: wt,
          onValidation: yt,
          onChange: W,
          hotkeys: a && { ...nt, ...a },
        }),
      })
    : null;
}
const es = ({ children: t, columns: r = null, api: n }) => {
  const [o, s] = kt(null);
  return (
    at(() => {
      n && n.getTable(!0).then(s);
    }, [n]),
    /* @__PURE__ */ d(Yn, { api: o, columns: r, children: t })
  );
};
function ns(t) {
  const { api: r, content: n, filter: o, children: s } = t,
    i = st(null),
    l = st(null),
    [h, u] = kt({}),
    [g, a] = kt(null),
    [y, D] = kt(null),
    [z, B] = kt(!1),
    p = st(null),
    L = st(!1),
    C = st(null),
    _ = st(null),
    Q = 300,
    Y = 400;
  function V(M) {
    for (; M; ) {
      if (M.getAttribute) {
        const v = M.getAttribute('data-tooltip-id'),
          P = M.getAttribute('data-tooltip-at'),
          lt = M.getAttribute('data-tooltip');
        if (v || lt) return { id: v, tooltip: lt, target: M, at: P };
      }
      M = M.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  at(() => {
    const M = l.current;
    if (!z && M && y && (y.text || n)) {
      const v = M.getBoundingClientRect();
      let P = !1,
        lt = y.left,
        it = y.top;
      v.right >= h.right && ((lt = h.width - v.width - 5), (P = !0)),
        v.bottom >= h.bottom &&
          ((it = y.top - (v.bottom - h.bottom + 2)), (P = !0)),
        P && D((gt) => gt && { ...gt, left: lt, top: it });
    }
  }, [y, h, n, z]);
  const E = K(() => {
      clearTimeout(C.current),
        clearTimeout(_.current),
        (C.current = null),
        (_.current = null),
        (p.current = null),
        (L.current = !1),
        D(null),
        a(null),
        B(!1);
    }, []),
    dt = K(() => {
      clearTimeout(_.current),
        (_.current = setTimeout(() => {
          (_.current = null), !p.current && !L.current && E();
        }, Y));
    }, [E]),
    et = K(() => {
      clearTimeout(_.current), (_.current = null);
    }, []);
  function bt(M) {
    if (l.current && l.current.contains(M.target)) return;
    let { id: v, tooltip: P, target: lt, at: it } = V(M.target);
    if (!v && !P) {
      clearTimeout(C.current),
        (C.current = null),
        (p.current = null),
        !L.current && !_.current && dt();
      return;
    }
    if ((et(), P || (P = q(v)), p.current === v)) return;
    (p.current = v), clearTimeout(C.current), D(null), a(null), B(!1);
    const gt = M.clientX;
    C.current = setTimeout(() => {
      C.current = null;
      const Lt = v ? U(w(v)) : null;
      if (o && Lt && !o(Lt)) {
        p.current = null;
        return;
      }
      Lt && a(Lt);
      const $t = lt.getBoundingClientRect(),
        Tt = i.current,
        xt = Tt
          ? Tt.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let pt, St;
      it === 'left'
        ? ((pt = $t.top + 5 - xt.top), (St = $t.right + 5 - xt.left))
        : ((pt = $t.top + $t.height - xt.top), (St = gt - xt.left)),
        u(xt),
        D({ top: pt, left: St, text: P });
    }, Q);
  }
  function ct() {
    (L.current = !0), et();
  }
  function mt() {
    (L.current = !1), p.current || dt();
  }
  function T(M) {
    const v = M.touches[0];
    if (!v) return;
    const { id: P, target: lt } = V(M.target);
    if (!P) return;
    clearTimeout(C.current), clearTimeout(_.current);
    const it = U(w(P));
    if (o && it && !o(it)) return;
    const gt = it?.text || '',
      Lt = lt.getBoundingClientRect(),
      $t = i.current,
      Tt = $t
        ? $t.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    a(it),
      u(Tt),
      B(!0),
      D({
        top: Lt.top - Tt.top - 8,
        left: v.clientX - Tt.left,
        text: gt,
      });
  }
  function S() {
    E();
  }
  function U(M) {
    return r?.getTask(w(M)) || null;
  }
  function q(M) {
    return U(M)?.text || '';
  }
  function w(M) {
    const v = Number(M);
    return Number.isFinite(v) ? v : M;
  }
  at(
    () => () => {
      clearTimeout(C.current), clearTimeout(_.current);
    },
    [],
  );
  const k = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    z ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ At('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: i,
    onMouseMove: bt,
    onTouchStart: T,
    onTouchEnd: S,
    onTouchMove: S,
    children: [
      y && (y.text || n)
        ? /* @__PURE__ */ d('div', {
            className: k,
            ref: l,
            style: { top: `${y.top}px`, left: `${y.left}px` },
            onMouseEnter: ct,
            onMouseLeave: mt,
            children: n
              ? /* @__PURE__ */ d(n, { data: g, api: r })
              : y.text
                ? /* @__PURE__ */ d('div', {
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
function rs({ fonts: t = !0, children: r }) {
  return r
    ? /* @__PURE__ */ d(Ae, { fonts: t, children: r() })
    : /* @__PURE__ */ d(Ae, { fonts: t });
}
function ss({ fonts: t = !0, children: r }) {
  return r
    ? /* @__PURE__ */ d(ze, { fonts: t, children: r })
    : /* @__PURE__ */ d(ze, { fonts: t });
}
function os({ fonts: t = !0, children: r }) {
  return r
    ? /* @__PURE__ */ d(_e, { fonts: t, children: r })
    : /* @__PURE__ */ d(_e, { fonts: t });
}
const Hr = '2.9.0',
  Pr = {
    version: Hr,
  },
  is = Pr.version;
export {
  Jr as ContextMenu,
  ts as Editor,
  Qr as Gantt,
  es as HeaderMenu,
  rs as Material,
  Zr as Toolbar,
  ns as Tooltip,
  ss as Willow,
  os as WillowDark,
  as as defaultColumns,
  us as defaultEditorItems,
  ds as defaultMenuOptions,
  fs as defaultTaskTypes,
  hs as defaultToolbarButtons,
  ms as getEditorItems,
  gs as getMenuOptions,
  ps as getToolbarButtons,
  ys as registerEditorItem,
  ws as registerScaleUnit,
  is as version,
};
//# sourceMappingURL=index.es.js.map
