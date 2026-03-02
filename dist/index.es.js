import { jsxs as Ce, jsx as i, Fragment as Ye } from 'react/jsx-runtime';
import {
  createContext as vt,
  useContext as Ne,
  useMemo as v,
  useState as he,
  useCallback as C,
  useRef as re,
  useEffect as te,
  Fragment as bt,
  forwardRef as ht,
  useImperativeHandle as mt,
} from 'react';
import {
  context as Ae,
  Button as nt,
  Field as Tt,
  Text as Ct,
  Combo as Mt,
  DatePicker as $t,
  TimePicker as Rt,
  Locale as Nt,
  RichSelect as St,
  TwoState as Et,
  Slider as Lt,
  Counter as It,
  Material as st,
  Willow as rt,
  WillowDark as ot,
} from '@svar-ui/react-core';
import {
  locate as He,
  locateID as Oe,
  locateAttr as Dt,
  dateToString as qe,
  locale as Qe,
} from '@svar-ui/lib-dom';
import { en as Ue } from '@svar-ui/gantt-locales';
import { en as tt } from '@svar-ui/core-locales';
import { EventBusRouter as At } from '@svar-ui/lib-state';
import {
  prepareEditTask as gt,
  grid as zt,
  extendDragOptions as Ht,
  isSegmentMoveAllowed as Gt,
  DataStore as Wt,
  normalizeLinks as _t,
  normalizeZoom as Pt,
  defaultColumns as Ot,
  parseTaskDates as lt,
  defaultTaskTypes as Vt,
  getToolbarButtons as it,
  handleAction as xt,
  isHandledAction as wt,
  getMenuOptions as ct,
  getEditorItems as Ft,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as Qn,
  defaultEditorItems as Un,
  defaultMenuOptions as Zn,
  defaultTaskTypes as Jn,
  defaultToolbarButtons as es,
  getEditorItems as ts,
  getMenuOptions as ns,
  getToolbarButtons as ss,
  registerScaleUnit as rs,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as Je,
  useStore as A,
  useStoreWithCounter as et,
  writable as Kt,
  useStoreLater as We,
} from '@svar-ui/lib-react';
import { hotkeys as pt } from '@svar-ui/grid-store';
import { Grid as Bt, HeaderMenu as Yt } from '@svar-ui/react-grid';
import { flushSync as jt } from 'react-dom';
import { Toolbar as at } from '@svar-ui/react-toolbar';
import { ContextMenu as Xt } from '@svar-ui/react-menu';
import { Editor as qt, registerEditorItem as Fe } from '@svar-ui/react-editor';
import { registerEditorItem as ls } from '@svar-ui/react-editor';
const _e = vt(null);
function Ve(t) {
  const n = t.getAttribute('data-id'),
    s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function Qt(t, n, s) {
  const a = t.getBoundingClientRect(),
    r = n.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: a.top - r.top,
    left: a.left - r.left,
    dt: a.bottom - s.clientY,
    db: s.clientY - a.top,
  };
}
function dt(t) {
  return t && t.getAttribute('data-context-id');
}
const ut = 5;
function Ut(t, n) {
  let s, a, r, d, w, y, x, g, l;
  function $(f) {
    (d = f.clientX),
      (w = f.clientY),
      (y = {
        ...Qt(s, t, f),
        y: n.getTask(r).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function z(f) {
    (s = He(f)),
      dt(s) &&
        ((r = Ve(s)),
        (l = setTimeout(() => {
          (g = !0), n && n.touchStart && n.touchStart(), $(f.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', P),
        t.addEventListener('contextmenu', M),
        window.addEventListener('touchend', O));
  }
  function M(f) {
    if (g || l) return f.preventDefault(), !1;
  }
  function H(f) {
    f.which === 1 &&
      ((s = He(f)),
      dt(s) &&
        ((r = Ve(s)),
        t.addEventListener('mousemove', V),
        window.addEventListener('mouseup', T),
        $(f)));
  }
  function u(f) {
    t.removeEventListener('mousemove', V),
      t.removeEventListener('touchmove', P),
      document.body.removeEventListener('mouseup', T),
      document.body.removeEventListener('touchend', O),
      (document.body.style.userSelect = ''),
      f &&
        (t.removeEventListener('mousedown', H),
        t.removeEventListener('touchstart', z));
  }
  function L(f) {
    const J = f.clientX - d,
      ne = f.clientY - w;
    if (!a) {
      if (
        (Math.abs(J) < ut && Math.abs(ne) < ut) ||
        (n && n.start && n.start({ id: r, e: f }) === !1)
      )
        return;
      (a = s.cloneNode(!0)),
        (a.style.pointerEvents = 'none'),
        a.classList.add('wx-reorder-task'),
        (a.style.position = 'absolute'),
        (a.style.left = y.left + 'px'),
        (a.style.top = y.top + 'px'),
        (s.style.visibility = 'hidden'),
        s.parentNode.insertBefore(a, s);
    }
    if (a) {
      const ee = Math.round(Math.max(0, y.top + ne));
      if (n && n.move && n.move({ id: r, top: ee, detail: x }) === !1) return;
      const le = n.getTask(r),
        b = le.$y;
      if (!y.start && y.y == b) return I();
      (y.start = !0), (y.y = le.$y - 4), (a.style.top = ee + 'px');
      const se = document.elementFromPoint(f.clientX, f.clientY),
        X = He(se);
      if (X && X !== s) {
        const K = Ve(X),
          E = X.getBoundingClientRect(),
          D = E.top + E.height / 2,
          q = f.clientY + y.db > D && X.nextElementSibling !== s,
          W = f.clientY - y.dt < D && X.previousElementSibling !== s;
        x?.after == K || x?.before == K
          ? (x = null)
          : q
            ? (x = { id: r, after: K })
            : W && (x = { id: r, before: K });
      }
    }
  }
  function V(f) {
    L(f);
  }
  function P(f) {
    g
      ? (f.preventDefault(), L(f.touches[0]))
      : l && (clearTimeout(l), (l = null));
  }
  function O() {
    (g = null), l && (clearTimeout(l), (l = null)), I();
  }
  function T() {
    I();
  }
  function I() {
    s && (s.style.visibility = ''),
      a &&
        (a.parentNode.removeChild(a),
        n && n.end && n.end({ id: r, top: y.top })),
      (r = s = a = y = x = null),
      u();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', H),
    t.addEventListener('touchstart', z),
    {
      destroy() {
        u(!0);
      },
    }
  );
}
function Zt({ row: t, column: n }) {
  const s = Ne(_e);
  function a(d, w) {
    return {
      justifyContent: w.align,
      paddingLeft: `${(d.$level - 1) * 20}px`,
    };
  }
  const r = n && n._cell;
  return /* @__PURE__ */ Ce('div', {
    className: 'wx-pqc08MHU wx-content',
    style: a(t, n),
    children: [
      t.data || t.lazy
        ? /* @__PURE__ */ i('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ i('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ i('div', {
        className: 'wx-pqc08MHU wx-text',
        children: r
          ? /* @__PURE__ */ i(r, { row: t, column: n, api: s })
          : t.text,
      }),
    ],
  });
}
function ft({ column: t, cell: n }) {
  const s = v(() => t.id, [t?.id]);
  return n || t.id == 'add-task'
    ? /* @__PURE__ */ i('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ i('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': s,
        }),
      })
    : null;
}
function Jt(t) {
  const {
      readonly: n,
      compactMode: s,
      width: a = 0,
      display: r = 'all',
      columnWidth: d = 0,
      onTableAPIChange: w,
      multiTaskRows: y = !1,
      rowMapping: x = null,
    } = t,
    [g, l] = Je(d),
    [$, z] = he(),
    M = Ne(Ae.i18n),
    H = v(() => M.getGroup('gantt'), [M]),
    u = Ne(_e),
    L = A(u, 'scrollTop'),
    V = A(u, 'cellHeight'),
    P = A(u, '_scrollTask'),
    O = A(u, '_selected'),
    T = A(u, 'area'),
    I = A(u, '_tasks'),
    f = A(u, '_scales'),
    J = A(u, 'columns'),
    ne = A(u, '_sort'),
    ee = A(u, 'calendar'),
    le = A(u, 'durationUnit'),
    b = A(u, 'splitTasks'),
    [se, X] = he(null),
    K = v(
      () => (!I || !T ? [] : y && x ? I : I.slice(T.start, T.end)),
      [I, T, y, x],
    ),
    E = C(
      (o, p) => {
        if (p === 'add-task')
          u.exec(p, {
            target: o,
            task: { text: H('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (p === 'open-task') {
          const S = K.find((F) => F.id === o);
          (S?.data || S?.lazy) && u.exec(p, { id: o, mode: !S.open });
        }
      },
      [K],
    ),
    D = C(
      (o) => {
        const p = Oe(o),
          S = o.target.dataset.action;
        S && o.preventDefault(),
          p
            ? S === 'add-task' || S === 'open-task'
              ? E(p, S)
              : u.exec('select-task', {
                  id: p,
                  toggle: o.ctrlKey || o.metaKey,
                  range: o.shiftKey,
                  show: !0,
                })
            : S === 'add-task' && E(null, S);
      },
      [u, E],
    ),
    q = re(null),
    W = re(null),
    [Q, ie] = he(0),
    [h, G] = he(!1);
  te(() => {
    const o = W.current;
    if (!o || typeof ResizeObserver > 'u') return;
    const p = () => ie(o.clientWidth);
    p();
    const S = new ResizeObserver(p);
    return S.observe(o), () => S.disconnect();
  }, []);
  const _ = re(null),
    U = C(
      (o) => {
        const p = o.id,
          { before: S, after: F } = o,
          ue = o.onMove;
        let ae = S || F,
          e = S ? 'before' : 'after';
        if (ue) {
          if (e === 'after') {
            const m = u.getTask(ae);
            m.data?.length && m.open && ((e = 'before'), (ae = m.data[0].id));
          }
          _.current = { id: p, [e]: ae };
        } else _.current = null;
        u.exec('move-task', {
          id: p,
          mode: e,
          target: ae,
          inProgress: ue,
        });
      },
      [u],
    ),
    ce = v(() => T?.from ?? 0, [T]),
    de = v(() => f?.height ?? 0, [f]),
    ge = v(
      () => (!s && r !== 'grid' ? (g ?? 0) > (a ?? 0) : (g ?? 0) > (Q ?? 0)),
      [s, r, g, a, Q],
    ),
    ye = v(() => {
      const o = {};
      return (
        (ge && r === 'all') || (r === 'grid' && ge)
          ? (o.width = g)
          : r === 'grid' && (o.width = '100%'),
        o
      );
    }, [ge, r, g]),
    me = v(
      () => (se && !K.find((o) => o.id === se.id) ? [...K, se] : K),
      [K, se],
    ),
    k = v(() => {
      let o = (J || []).map((F) => {
        F = { ...F };
        const ue = F.header;
        if (typeof ue == 'object') {
          const ae = ue.text && H(ue.text);
          F.header = { ...ue, text: ae };
        } else F.header = H(ue);
        if (F.cell && F.id !== 'text' && F.id !== 'add-task') {
          const ae = F.cell;
          F.cell = (e) => /* @__PURE__ */ i(ae, { ...e, api: u });
        }
        return F;
      });
      const p = o.findIndex((F) => F.id === 'text'),
        S = o.findIndex((F) => F.id === 'add-task');
      if (
        (p !== -1 && (o[p].cell && (o[p]._cell = o[p].cell), (o[p].cell = Zt)),
        S !== -1)
      ) {
        o[S].cell = o[S].cell || ft;
        const F = o[S].header;
        if (
          (typeof F != 'object' && (o[S].header = { text: F }),
          (o[S].header.cell = F.cell || ft),
          n)
        )
          o.splice(S, 1);
        else if (s) {
          const [ue] = o.splice(S, 1);
          o.unshift(ue);
        }
      }
      return o.length > 0 && (o[o.length - 1].resize = !1), o;
    }, [J, H, n, s, u]),
    Z = v(
      () =>
        r === 'all'
          ? `${a}px`
          : r === 'grid'
            ? 'calc(100% - 4px)'
            : k.find((o) => o.id === 'add-task')
              ? '50px'
              : '0',
      [r, a, k],
    ),
    xe = v(() => {
      if (me && ne?.length) {
        const o = {};
        return (
          ne.forEach(({ key: p, order: S }, F) => {
            o[p] = {
              order: S,
              ...(ne.length > 1 && { index: F }),
            };
          }),
          o
        );
      }
      return {};
    }, [me, ne]),
    we = C(() => k.some((o) => o.flexgrow && !o.hidden), []),
    ve = v(() => we(), [we, h]),
    be = v(() => {
      let o = r === 'chart' ? k.filter((S) => S.id === 'add-task') : k;
      const p = r === 'all' ? a : Q;
      if (!ve) {
        let S = g,
          F = !1;
        if (k.some((ue) => ue.$width)) {
          let ue = 0;
          (S = k.reduce(
            (ae, e) => (
              e.hidden || ((ue += e.width), (ae += e.$width || e.width)), ae
            ),
            0,
          )),
            ue > S && S > p && (F = !0);
        }
        if (F || S < p) {
          let ue = 1;
          return (
            F || (ue = (p - 50) / (S - 50 || 1)),
            o.map(
              (ae) => (
                ae.id !== 'add-task' &&
                  !ae.hidden &&
                  (ae.$width || (ae.$width = ae.width),
                  (ae.width = ae.$width * ue)),
                ae
              ),
            )
          );
        }
      }
      return o;
    }, [r, k, ve, g, a, Q]),
    pe = C(
      (o) => {
        if (!we()) {
          const p = be.reduce(
            (S, F) => (
              o && F.$width && (F.$width = F.width),
              S + (F.hidden ? 0 : F.width)
            ),
            0,
          );
          p !== g && l(p);
        }
        G(!0), G(!1);
      },
      [we, be, g, l],
    ),
    Ee = C(() => {
      k.filter((p) => p.flexgrow && !p.hidden).length === 1 &&
        k.forEach((p) => {
          p.$width && !p.flexgrow && !p.hidden && (p.width = p.$width);
        });
    }, []),
    Le = C(
      (o) => {
        if (!n) {
          const p = Oe(o),
            S = Dt(o, 'data-col-id');
          !(S && k.find((ue) => ue.id == S))?.editor &&
            p &&
            u.exec('show-editor', { id: p });
        }
      },
      [u, n],
      // cols is defined later; relies on latest value at call time
    ),
    c = v(() => (Array.isArray(O) ? O.map((o) => o.id) : []), [O]),
    R = C(() => {
      if (q.current && me !== null) {
        const o = q.current.querySelector('.wx-body');
        o && (o.style.top = -((L ?? 0) - (ce ?? 0)) + 'px');
      }
      W.current && (W.current.scrollTop = 0);
    }, [me, L, ce]);
  te(() => {
    q.current && R();
  }, [L, ce, R]),
    te(() => {
      const o = q.current;
      if (!o) return;
      const p = o.querySelector('.wx-table-box .wx-body');
      if (!p || typeof ResizeObserver > 'u') return;
      const S = new ResizeObserver(() => {
        R();
      });
      return (
        S.observe(p),
        () => {
          S.disconnect();
        }
      );
    }, [be, ye, r, Z, me, R]),
    te(() => {
      if (!P || !$) return;
      const { id: o } = P,
        p = $.getState().focusCell;
      p &&
        p.row !== o &&
        q.current &&
        q.current.contains(document.activeElement) &&
        $.exec('focus-cell', {
          row: o,
          column: p.column,
        });
    }, [P, $]);
  const Y = C(
      ({ id: o }) => {
        if (n) return !1;
        u.getTask(o).open && u.exec('open-task', { id: o, mode: !1 });
        const p = u.getState()._tasks.find((S) => S.id === o);
        if ((X(p || null), !p)) return !1;
      },
      [u, n],
    ),
    N = C(
      ({ id: o, top: p }) => {
        _.current
          ? U({ ..._.current, onMove: !1 })
          : u.exec('drag-task', {
              id: o,
              top: p + (ce ?? 0),
              inProgress: !1,
            }),
          X(null);
      },
      [u, U, ce],
    ),
    oe = C(
      ({ id: o, top: p, detail: S }) => {
        S && U({ ...S, onMove: !0 }),
          u.exec('drag-task', {
            id: o,
            top: p + (ce ?? 0),
            inProgress: !0,
          });
      },
      [u, U, ce],
    );
  te(() => {
    const o = q.current;
    return o
      ? Ut(o, {
          start: Y,
          end: N,
          move: oe,
          getTask: u.getTask,
        }).destroy
      : void 0;
  }, [u, Y, N, oe]);
  const Me = C(
      (o) => {
        const { key: p, isInput: S } = o;
        if (!S && (p === 'arrowup' || p === 'arrowdown'))
          return (o.eventSource = 'grid'), u.exec('hotkey', o), !1;
        if (p === 'enter') {
          const F = $?.getState().focusCell;
          if (F) {
            const { row: ue, column: ae } = F;
            ae === 'add-task'
              ? E(ue, 'add-task')
              : ae === 'text' && E(ue, 'open-task');
          }
        }
      },
      [u, E, $],
    ),
    ke = re(null),
    De = () => {
      ke.current = {
        setTableAPI: z,
        handleHotkey: Me,
        sortVal: ne,
        api: u,
        adjustColumns: Ee,
        setColumnWidth: pe,
        tasks: K,
        calendarVal: ee,
        durationUnitVal: le,
        splitTasksVal: b,
        onTableAPIChange: w,
      };
    };
  De(),
    te(() => {
      De();
    }, [z, Me, ne, u, Ee, pe, K, ee, le, b, w]);
  const Ke = C((o) => {
    z(o),
      o.intercept('hotkey', (p) => ke.current.handleHotkey(p)),
      o.intercept('scroll', () => !1),
      o.intercept('select-row', () => !1),
      o.intercept('sort-rows', (p) => {
        const S = ke.current.sortVal,
          { key: F, add: ue } = p,
          ae = S ? S.find((m) => m.key === F) : null;
        let e = 'asc';
        return (
          ae && (e = !ae || ae.order === 'asc' ? 'desc' : 'asc'),
          u.exec('sort-tasks', {
            key: F,
            order: e,
            add: ue,
          }),
          !1
        );
      }),
      o.on('resize-column', () => {
        ke.current.setColumnWidth(!0);
      }),
      o.on('hide-column', (p) => {
        p.mode || ke.current.adjustColumns(), ke.current.setColumnWidth();
      }),
      o.intercept('update-cell', (p) => {
        const { id: S, column: F, value: ue } = p,
          ae = ke.current.tasks.find((e) => e.id === S);
        if (ae) {
          const e = { ...ae };
          let m = ue;
          m && !isNaN(m) && !(m instanceof Date) && (m *= 1),
            (e[F] = m),
            gt(
              e,
              {
                calendar: ke.current.calendarVal,
                durationUnit: ke.current.durationUnitVal,
                splitTasks: ke.current.splitTasksVal,
              },
              F,
            ),
            u.exec('update-task', {
              id: S,
              task: e,
            });
        }
        return !1;
      }),
      w && w(o);
  }, []);
  return /* @__PURE__ */ i('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${Z}` },
    ref: W,
    children: /* @__PURE__ */ i('div', {
      ref: q,
      style: ye,
      className: 'wx-rHj6070p wx-table',
      onClick: D,
      onDoubleClick: Le,
      children: /* @__PURE__ */ i(Bt, {
        init: Ke,
        sizes: {
          rowHeight: V,
          headerHeight: (de ?? 0) - 1,
        },
        rowStyle: (o) =>
          o.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (o) =>
          `wx-rHj6070p wx-text-${o.align}${o.id === 'add-task' ? ' wx-action' : ''}`,
        data: me,
        columns: be,
        selectedRows: [...c],
        sortMarks: xe,
      }),
    }),
  });
}
function en({ borders: t = '' }) {
  const n = Ne(_e),
    s = A(n, 'cellWidth'),
    a = A(n, 'cellHeight'),
    r = re(null),
    [d, w] = he('#e4e4e4');
  te(() => {
    if (typeof getComputedStyle < 'u' && r.current) {
      const x = getComputedStyle(r.current).getPropertyValue(
        '--wx-gantt-border',
      );
      w(x ? x.substring(x.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const y = {
    width: '100%',
    height: '100%',
    background: s != null && a != null ? `url(${zt(s, a, d, t)})` : void 0,
    position: 'absolute',
  };
  return /* @__PURE__ */ i('div', { ref: r, style: y });
}
function tn({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const a = Ne(_e),
    r = A(a, '_links'),
    d = A(a, 'criticalPath'),
    w = re(null),
    y = C(
      (x) => {
        const g = x?.target?.classList;
        !g?.contains('wx-line') && !g?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    te(() => {
      if (!s && n && w.current) {
        const x = (g) => {
          w.current && !w.current.contains(g.target) && y(g);
        };
        return (
          document.addEventListener('click', x),
          () => {
            document.removeEventListener('click', x);
          }
        );
      }
    }, [s, n, y]),
    /* @__PURE__ */ Ce('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (r || []).map((x) => {
          const g =
            'wx-dkx3NwEn wx-line' +
            (d && x.$critical ? ' wx-critical' : '') +
            (s ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ i(
            'polyline',
            {
              className: g,
              points: x.$p,
              onClick: () => !s && t(x.id),
              'data-link-id': x.id,
            },
            x.id,
          );
        }),
        !s &&
          n &&
          /* @__PURE__ */ i('polyline', {
            ref: w,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: n.$p,
          }),
      ],
    })
  );
}
function nn(t) {
  const { task: n, type: s } = t;
  function a(d) {
    const w = n.segments[d];
    return {
      left: `${w.$x}px`,
      top: '0px',
      width: `${w.$w}px`,
      height: '100%',
    };
  }
  function r(d) {
    if (!n.progress) return 0;
    const w = (n.duration * n.progress) / 100,
      y = n.segments;
    let x = 0,
      g = 0,
      l = null;
    do {
      const $ = y[g];
      g === d &&
        (x > w ? (l = 0) : (l = Math.min((w - x) / $.duration, 1) * 100)),
        (x += $.duration),
        g++;
    } while (l === null && g < y.length);
    return l || 0;
  }
  return /* @__PURE__ */ i('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((d, w) =>
      /* @__PURE__ */ Ce(
        'div',
        {
          className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
          'data-segment': w,
          style: a(w),
          children: [
            n.progress
              ? /* @__PURE__ */ i('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ i('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${r(w)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ i('div', {
              className: 'wx-content',
              children: d.text || '',
            }),
          ],
        },
        w,
      ),
    ),
  });
}
function sn(t) {
  const {
      readonly: n,
      taskTemplate: s,
      multiTaskRows: a = !1,
      rowMapping: r = null,
    } = t,
    d = Ne(_e),
    [w, y] = et(d, '_tasks'),
    [x, g] = et(d, '_links'),
    l = A(d, 'area'),
    $ = A(d, '_scales'),
    z = A(d, 'taskTypes'),
    M = A(d, 'baselines'),
    H = A(d, '_selected'),
    u = A(d, '_scrollTask'),
    L = A(d, 'criticalPath'),
    V = A(d, 'tasks'),
    P = A(d, 'schedule'),
    O = A(d, 'splitTasks'),
    T = A(d, 'summary'),
    I = v(() => {
      if (!l || !Array.isArray(w)) return [];
      const e = l.start ?? 0,
        m = l.end ?? 0;
      return a && r
        ? w.map((B) => ({ ...B }))
        : w.slice(e, m).map((B) => ({ ...B }));
    }, [y, l, a, r]),
    f = A(d, 'cellHeight'),
    J = v(() => {
      if (!a || !r || !I.length) return I;
      const e = /* @__PURE__ */ new Map(),
        m = [];
      return (
        w.forEach((B) => {
          const j = r.taskRows.get(B.id) ?? B.id;
          e.has(j) || (e.set(j, m.length), m.push(j));
        }),
        I.map((B) => {
          const j = r.taskRows.get(B.id) ?? B.id,
            fe = e.get(j) ?? 0;
          return {
            ...B,
            $y: fe * f,
            $y_base: B.$y_base !== void 0 ? fe * f : void 0,
          };
        })
      );
    }, [I, a, r, w, f]),
    ne = v(() => $.lengthUnitWidth, [$]),
    ee = v(() => $.lengthUnit || 'day', [$]),
    le = re(!1),
    [b, se] = he(void 0),
    [X, K] = he(null),
    E = re(null),
    [D, q] = he(null),
    W = v(
      () =>
        D && {
          ...x.find((e) => e.id === D),
        },
      [D, g],
    ),
    [Q, ie] = he(void 0),
    h = re(null),
    [G, _] = he(0),
    U = re(null),
    ce = v(() => {
      const e = U.current;
      return !!(H.length && e && e.contains(document.activeElement));
    }, [H, U.current]),
    de = v(() => ce && H[H.length - 1]?.id, [ce, H]);
  te(() => {
    if (u && ce && u) {
      const { id: e } = u,
        m = U.current?.querySelector(`.wx-bar[data-id='${e}']`);
      m && m.focus({ preventScroll: !0 });
    }
  }, [u]),
    te(() => {
      const e = U.current;
      if (e && (_(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const m = new ResizeObserver((B) => {
          B[0] && _(B[0].contentRect.width);
        });
        return m.observe(e), () => m.disconnect();
      }
    }, [U.current]);
  const ge = C(() => {
      document.body.style.userSelect = 'none';
    }, []),
    ye = C(() => {
      document.body.style.userSelect = '';
    }, []),
    me = C(
      (e, m, B) => {
        if (
          m.target.classList.contains('wx-line') ||
          (B || (B = d.getTask(Ve(e))),
          B.type === 'milestone' || B.type === 'summary')
        )
          return '';
        const j = He(m, 'data-segment');
        j && (e = j);
        const { left: fe, width: Te } = e.getBoundingClientRect(),
          $e = (m.clientX - fe) / Te;
        let Re = 0.2 / (Te > 200 ? Te / 200 : 1);
        return $e < Re ? 'start' : $e > 1 - Re ? 'end' : '';
      },
      [d],
    ),
    k = C(
      (e, m) => {
        const { clientX: B } = m,
          j = Ve(e),
          fe = d.getTask(j),
          Te = m.target.classList;
        if (
          !m.target.closest('.wx-delete-button') &&
          !m.target.closest('[data-interactive]') &&
          !n
        ) {
          if (Te.contains('wx-progress-marker')) {
            const { progress: $e } = d.getTask(j);
            (E.current = {
              id: j,
              x: B,
              progress: $e,
              dx: 0,
              node: e,
              marker: m.target,
            }),
              m.target.classList.add('wx-progress-in-drag');
          } else {
            const $e = me(e, m, fe) || 'move',
              Re = {
                id: j,
                mode: $e,
                x: B,
                dx: 0,
                l: fe.$x,
                w: fe.$w,
              };
            if (O && fe.segments?.length) {
              const Ie = He(m, 'data-segment');
              Ie && ((Re.segmentIndex = Ie.dataset.segment * 1), Ht(fe, Re));
            }
            K(Re);
          }
          ge();
        }
      },
      [d, n, me, ge, O],
    ),
    Z = C(
      (e) => {
        if (e.button !== 0) return;
        const m = He(e);
        m && k(m, e);
      },
      [k],
    ),
    xe = C(
      (e) => {
        const m = He(e);
        m &&
          (h.current = setTimeout(() => {
            ie(!0), k(m, e.touches[0]);
          }, 300));
      },
      [k],
    ),
    we = C((e) => {
      q(e);
    }, []),
    ve = C(() => {
      if (E.current) {
        const { dx: e, id: m, marker: B, value: j } = E.current;
        (E.current = null),
          typeof j < 'u' &&
            e &&
            d.exec('update-task', {
              id: m,
              task: { progress: j },
              inProgress: !1,
            }),
          B.classList.remove('wx-progress-in-drag'),
          (le.current = !0),
          ye();
      } else if (X) {
        const {
          id: e,
          mode: m,
          dx: B,
          l: j,
          w: fe,
          start: Te,
          segment: $e,
          index: Re,
        } = X;
        if ((K(null), Te)) {
          const Ie = Math.round(B / ne);
          if (!Ie)
            d.exec('drag-task', {
              id: e,
              width: fe,
              left: j,
              inProgress: !1,
              ...($e && { segmentIndex: Re }),
            });
          else {
            let Ge = {},
              ze = d.getTask(e);
            $e && (ze = ze.segments[Re]);
            const Be = 1440 * 60 * 1e3,
              Pe =
                Ie *
                (ee === 'week'
                  ? 7
                  : ee === 'month'
                    ? 30
                    : ee === 'quarter'
                      ? 91
                      : ee === 'year'
                        ? 365
                        : 1) *
                Be;
            m === 'move'
              ? ((Ge.start = new Date(ze.start.getTime() + Pe)),
                (Ge.end = new Date(ze.end.getTime() + Pe)))
              : m === 'start'
                ? ((Ge.start = new Date(ze.start.getTime() + Pe)),
                  (Ge.end = ze.end))
                : m === 'end' &&
                  ((Ge.start = ze.start),
                  (Ge.end = new Date(ze.end.getTime() + Pe))),
              d.exec('update-task', {
                id: e,
                task: Ge,
                ...($e && { segmentIndex: Re }),
              });
          }
          le.current = !0;
        }
        ye();
      }
    }, [d, ye, X, ne, ee]),
    be = C(
      (e, m) => {
        const { clientX: B } = m;
        if (!n)
          if (E.current) {
            const { node: j, x: fe, id: Te } = E.current,
              $e = (E.current.dx = B - fe),
              Re = Math.round(($e / j.offsetWidth) * 100);
            let Ie = E.current.progress + Re;
            (E.current.value = Ie = Math.min(Math.max(0, Ie), 100)),
              d.exec('update-task', {
                id: Te,
                task: { progress: Ie },
                inProgress: !0,
              });
          } else if (X) {
            we(null);
            const {
                mode: j,
                l: fe,
                w: Te,
                x: $e,
                id: Re,
                start: Ie,
                segment: Ge,
                index: ze,
              } = X,
              Be = d.getTask(Re),
              Se = B - $e,
              Pe = Math.round(ne) || 1;
            if (
              (!Ie && Math.abs(Se) < 20) ||
              (j === 'start' && Te - Se < Pe) ||
              (j === 'end' && Te + Se < Pe) ||
              (j === 'move' &&
                ((Se < 0 && fe + Se < 0) || (Se > 0 && fe + Te + Se > G))) ||
              (X.segment && !Gt(Be, X))
            )
              return;
            const Ze = { ...X, dx: Se };
            let je, Xe;
            if (
              (j === 'start'
                ? ((je = fe + Se), (Xe = Te - Se))
                : j === 'end'
                  ? ((je = fe), (Xe = Te + Se))
                  : j === 'move' && ((je = fe + Se), (Xe = Te)),
              d.exec('drag-task', {
                id: Re,
                width: Xe,
                left: je,
                inProgress: !0,
                start: Ie,
                ...(Ge && { segmentIndex: ze }),
              }),
              !Ze.start &&
                ((j === 'move' && Be.$x == fe) ||
                  (j !== 'move' && Be.$w == Te)))
            ) {
              (le.current = !0), ve();
              return;
            }
            (Ze.start = !0), K(Ze);
          } else {
            const j = He(e);
            if (j) {
              const fe = d.getTask(Ve(j)),
                $e = He(e, 'data-segment') || j,
                Re = me($e, m, fe);
              $e.style.cursor = Re && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [d, n, X, ne, G, me, we, ve],
    ),
    pe = C(
      (e) => {
        be(e, e);
      },
      [be],
    ),
    Ee = C(
      (e) => {
        Q
          ? (e.preventDefault(), be(e, e.touches[0]))
          : h.current && (clearTimeout(h.current), (h.current = null));
      },
      [Q, be],
    ),
    Le = C(() => {
      ve();
    }, [ve]),
    c = C(() => {
      ie(null),
        h.current && (clearTimeout(h.current), (h.current = null)),
        ve();
    }, [ve]);
  te(
    () => (
      window.addEventListener('mouseup', Le),
      () => {
        window.removeEventListener('mouseup', Le);
      }
    ),
    [Le],
  );
  const R = C(
      (e) => {
        if (!n) {
          if (e.target.closest('[data-interactive]')) return;
          const m = Oe(e.target);
          if (m && !e.target.classList.contains('wx-link')) {
            const B = Oe(e.target, 'data-segment');
            d.exec('show-editor', {
              id: m,
              ...(B !== null && { segmentIndex: B }),
            });
          }
        }
      },
      [d, n],
    ),
    Y = ['e2s', 's2s', 'e2e', 's2e'],
    N = C((e, m) => Y[(e ? 1 : 0) + (m ? 0 : 2)], []),
    oe = C(
      (e, m) => {
        const B = b.id,
          j = b.start;
        return e === B
          ? !0
          : !!x.find(
              (fe) => fe.target == e && fe.source == B && fe.type === N(j, m),
            );
      },
      [b, g, N],
    ),
    Me = C(() => {
      b && se(null);
    }, [b]),
    ke = C(
      (e) => {
        if (le.current) {
          le.current = !1;
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const m = Oe(e.target);
        if (m) {
          const B = e.target.classList;
          if (B.contains('wx-link')) {
            const j = B.contains('wx-left');
            if (!b) {
              se({ id: m, start: j });
              return;
            }
            b.id !== m &&
              !oe(m, j) &&
              d.exec('add-link', {
                link: {
                  source: b.id,
                  target: m,
                  type: N(b.start, j),
                },
              });
          } else if (B.contains('wx-delete-button-icon'))
            d.exec('delete-link', { id: D }), q(null);
          else {
            let j;
            const fe = He(e, 'data-segment');
            fe && (j = fe.dataset.segment * 1),
              d.exec('select-task', {
                id: m,
                toggle: e.ctrlKey || e.metaKey,
                range: e.shiftKey,
                segmentIndex: j,
              });
          }
        }
        Me();
      },
      [d, b, g, W, oe, N, Me],
    ),
    De = C(
      (e) => ({
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      }),
      [],
    ),
    Ke = C(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    o = C(
      (e) => {
        if (Q || h.current) return e.preventDefault(), !1;
      },
      [Q],
    ),
    p = v(() => z.map((e) => e.id), [z]),
    S = C(
      (e) => {
        let m = p.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (m = `task ${m}`), m
        );
      },
      [p],
    ),
    F = C(
      (e) => {
        d.exec(e.action, e.data);
      },
      [d],
    ),
    ue = C((e) => L && V.byId(e).$critical, [L, V]),
    ae = C(
      (e) => {
        if (P?.auto) {
          const m = V.getSummaryId(e, !0),
            B = V.getSummaryId(b.id, !0);
          return (
            b?.id &&
            !(Array.isArray(m) ? m : [m]).includes(b.id) &&
            !(Array.isArray(B) ? B : [B]).includes(e)
          );
        }
        return b;
      },
      [P, V, b],
    );
  return /* @__PURE__ */ Ce('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${J.length ? J[0].$h : 0}px` },
    ref: U,
    onContextMenu: o,
    onMouseDown: Z,
    onMouseMove: pe,
    onTouchStart: xe,
    onTouchMove: Ee,
    onTouchEnd: c,
    onClick: ke,
    onDoubleClick: R,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ i(tn, {
        onSelectLink: we,
        selectedLink: W,
        readonly: n,
      }),
      J.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const m =
            `wx-bar wx-${S(e.type)}` +
            (Q && X && e.id === X.id ? ' wx-touch' : '') +
            (b && b.id === e.id ? ' wx-selected' : '') +
            (ue(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (O && e.segments ? ' wx-split' : ''),
          B =
            'wx-link wx-left' +
            (b ? ' wx-visible' : '') +
            (!b || (!oe(e.id, !0) && ae(e.id)) ? ' wx-target' : '') +
            (b && b.id === e.id && b.start ? ' wx-selected' : '') +
            (ue(e.id) ? ' wx-critical' : ''),
          j =
            'wx-link wx-right' +
            (b ? ' wx-visible' : '') +
            (!b || (!oe(e.id, !1) && ae(e.id)) ? ' wx-target' : '') +
            (b && b.id === e.id && !b.start ? ' wx-selected' : '') +
            (ue(e.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ Ce(
          bt,
          {
            children: [
              !e.$skip &&
                /* @__PURE__ */ Ce('div', {
                  className: 'wx-GKbcLEGA ' + m,
                  style: De(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: de === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === W?.target && W?.type[2] === 's'
                        ? /* @__PURE__ */ i(nt, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ i('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ i('div', {
                            className: 'wx-GKbcLEGA ' + B,
                            children: /* @__PURE__ */ i('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    e.type !== 'milestone'
                      ? /* @__PURE__ */ Ce(Ye, {
                          children: [
                            e.progress && !(O && e.segments)
                              ? /* @__PURE__ */ i('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ i('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${e.progress}%` },
                                  }),
                                })
                              : null,
                            !n &&
                            !(O && e.segments) &&
                            !(e.type == 'summary' && T?.autoProgress)
                              ? /* @__PURE__ */ i('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${e.progress}% - 10px)`,
                                  },
                                  children: e.progress,
                                })
                              : null,
                            s
                              ? /* @__PURE__ */ i('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ i(s, {
                                    data: e,
                                    api: d,
                                    onAction: F,
                                  }),
                                })
                              : O && e.segments
                                ? /* @__PURE__ */ i(nn, {
                                    task: e,
                                    type: S(e.type),
                                  })
                                : /* @__PURE__ */ i('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: e.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ Ce(Ye, {
                          children: [
                            /* @__PURE__ */ i('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            s
                              ? /* @__PURE__ */ i(s, {
                                  data: e,
                                  api: d,
                                  onAction: F,
                                })
                              : /* @__PURE__ */ i('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: e.text,
                                }),
                          ],
                        }),
                    n
                      ? null
                      : e.id === W?.target && W?.type[2] === 'e'
                        ? /* @__PURE__ */ i(nt, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ i('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ i('div', {
                            className: 'wx-GKbcLEGA ' + j,
                            children: /* @__PURE__ */ i('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                  ],
                }),
              M && !e.$skip_baseline
                ? /* @__PURE__ */ i('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (e.type === 'milestone' ? ' wx-milestone' : ''),
                    style: Ke(e),
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
function rn(t) {
  const { highlightTime: n, onScaleClick: s } = t,
    a = Ne(_e),
    r = A(a, '_scales');
  return /* @__PURE__ */ i('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: r.width },
    children: (r?.rows || []).map((d, w) =>
      /* @__PURE__ */ i(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${d.height}px` },
          children: (d.cells || []).map((y, x) => {
            const g = n ? n(y.date, y.unit) : '',
              l = 'wx-cell ' + (y.css || '') + ' ' + (g || '');
            return /* @__PURE__ */ i(
              'div',
              {
                className: 'wx-ZkvhDKir ' + l,
                style: {
                  width: `${y.width}px`,
                  cursor: s ? 'pointer' : void 0,
                },
                onClick: s ? ($) => s(y.date, y.unit, $.nativeEvent) : void 0,
                children: y.value,
              },
              x,
            );
          }),
        },
        w,
      ),
    ),
  });
}
const on = /* @__PURE__ */ new Map();
function ln(t) {
  const n = re(null),
    s = re(0),
    a = re(null),
    r = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    s.current++,
    te(() => {
      if (r)
        return (
          cancelAnimationFrame(a.current),
          (a.current = requestAnimationFrame(() => {
            const d = {
              label: t,
              time: performance.now() - n.current,
              renders: s.current,
              timestamp: Date.now(),
            };
            on.set(t, d),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: d }),
              );
          })),
          () => cancelAnimationFrame(a.current)
        );
    });
}
function cn(t) {
  const {
      readonly: n,
      fullWidth: s,
      fullHeight: a,
      taskTemplate: r,
      cellBorders: d,
      highlightTime: w,
      onScaleClick: y,
      multiTaskRows: x = !1,
      rowMapping: g = null,
    } = t,
    l = Ne(_e),
    [$, z] = et(l, '_selected'),
    M = A(l, 'scrollTop'),
    H = A(l, 'cellHeight'),
    u = A(l, 'cellWidth'),
    L = A(l, '_scales'),
    V = A(l, '_markers'),
    P = A(l, '_scrollTask'),
    O = A(l, 'zoom'),
    [T, I] = he(),
    f = re(null),
    J = A(l, '_tasks'),
    ne = 1 + (L?.rows?.length || 0),
    ee = v(() => {
      if (!x || !g || !J?.length) return null;
      const h = /* @__PURE__ */ new Map(),
        G = /* @__PURE__ */ new Map(),
        _ = [];
      return (
        J.forEach((U) => {
          const ce = g.taskRows.get(U.id) ?? U.id;
          G.has(ce) || (G.set(ce, _.length), _.push(ce));
        }),
        J.forEach((U) => {
          const ce = g.taskRows.get(U.id) ?? U.id,
            de = G.get(ce) ?? 0;
          h.set(U.id, de * H);
        }),
        h
      );
    }, [J, x, g, H]),
    le = v(() => {
      const h = [];
      return (
        $ &&
          $.length &&
          H &&
          $.forEach((G) => {
            const _ = ee?.get(G.id) ?? G.$y;
            h.push({ height: `${H}px`, top: `${_ - 3}px` });
          }),
        h
      );
    }, [z, H, ee]),
    b = v(() => Math.max(T || 0, a), [T, a]);
  te(() => {
    const h = f.current;
    h && typeof M == 'number' && (h.scrollTop = M);
  }, [M]);
  const se = () => {
    X();
  };
  function X(h) {
    const G = f.current;
    if (!G) return;
    const _ = {};
    (_.left = G.scrollLeft), l.exec('scroll-chart', _);
  }
  function K() {
    const h = f.current,
      _ = Math.ceil((T || 0) / (H || 1)) + 1,
      U = Math.floor(((h && h.scrollTop) || 0) / (H || 1)),
      ce = Math.max(0, U - ne),
      de = U + _ + ne,
      ge = ce * (H || 0);
    l.exec('render-data', {
      start: ce,
      end: de,
      from: ge,
    });
  }
  te(() => {
    K();
  }, [T, M]);
  const E = C(
    (h) => {
      if (!h) return;
      const { id: G, mode: _ } = h;
      if (_.toString().indexOf('x') < 0) return;
      const U = f.current;
      if (!U) return;
      const { clientWidth: ce } = U,
        de = l.getTask(G);
      if (de.$x + de.$w < U.scrollLeft)
        l.exec('scroll-chart', { left: de.$x - (u || 0) }),
          (U.scrollLeft = de.$x - (u || 0));
      else if (de.$x >= ce + U.scrollLeft) {
        const ge = ce < de.$w ? u || 0 : de.$w;
        l.exec('scroll-chart', { left: de.$x - ce + ge }),
          (U.scrollLeft = de.$x - ce + ge);
      }
    },
    [l, u],
  );
  te(() => {
    E(P);
  }, [P]);
  function D(h) {
    if (O && (h.ctrlKey || h.metaKey)) {
      h.preventDefault();
      const G = f.current,
        _ = -Math.sign(h.deltaY),
        U = h.clientX - (G ? G.getBoundingClientRect().left : 0);
      l.exec('zoom-scale', {
        dir: _,
        offset: U,
      });
    }
  }
  function q(h) {
    const G = w(h.date, h.unit);
    return G
      ? {
          css: G,
          width: h.width,
        }
      : null;
  }
  const W = v(
      () =>
        L && (L.minUnit === 'hour' || L.minUnit === 'day') && w
          ? L.rows[L.rows.length - 1].cells.map(q)
          : null,
      [L, w],
    ),
    Q = C(
      (h) => {
        (h.eventSource = 'chart'), l.exec('hotkey', h);
      },
      [l],
    );
  te(() => {
    const h = f.current;
    if (!h) return;
    const G = () => I(h.clientHeight);
    G();
    const _ = new ResizeObserver(() => G());
    return (
      _.observe(h),
      () => {
        _.disconnect();
      }
    );
  }, [f.current]);
  const ie = re(null);
  return (
    te(() => {
      const h = f.current;
      if (h && !ie.current)
        return (
          (ie.current = pt(h, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (G) => Q(G),
          })),
          () => {
            ie.current?.destroy(), (ie.current = null);
          }
        );
    }, []),
    te(() => {
      const h = f.current;
      if (!h) return;
      const G = D;
      return (
        h.addEventListener('wheel', G),
        () => {
          h.removeEventListener('wheel', G);
        }
      );
    }, [D]),
    ln('chart'),
    /* @__PURE__ */ Ce('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: f,
      onScroll: se,
      children: [
        /* @__PURE__ */ i(rn, { highlightTime: w, onScaleClick: y, scales: L }),
        V && V.length
          ? /* @__PURE__ */ i('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${b}px` },
              children: V.map((h, G) =>
                /* @__PURE__ */ i(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${h.css || ''}`,
                    style: { left: `${h.left}px` },
                    children: /* @__PURE__ */ i('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: h.text,
                    }),
                  },
                  G,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ Ce('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${s}px`, height: `${b}px` },
          children: [
            W
              ? /* @__PURE__ */ i('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: W.map((h, G) =>
                    h
                      ? /* @__PURE__ */ i(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + h.css,
                            style: {
                              width: `${h.width}px`,
                              left: `${G * h.width}px`,
                            },
                          },
                          G,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ i(en, { borders: d }),
            $ && $.length
              ? $.map((h, G) =>
                  h.$y
                    ? /* @__PURE__ */ i(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': h.id,
                          style: le[G],
                        },
                        h.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ i(sn, {
              readonly: n,
              taskTemplate: r,
              multiTaskRows: x,
              rowMapping: g,
            }),
          ],
        }),
      ],
    })
  );
}
function an(t) {
  const {
      position: n = 'after',
      size: s = 4,
      dir: a = 'x',
      onMove: r,
      onDisplayChange: d,
      compactMode: w,
      containerWidth: y = 0,
      leftThreshold: x = 50,
      rightThreshold: g = 50,
    } = t,
    [l, $] = Je(t.value ?? 0),
    [z, M] = Je(t.display ?? 'all');
  function H(W) {
    let Q = 0;
    n == 'center' ? (Q = s / 2) : n == 'before' && (Q = s);
    const ie = {
      size: [s + 'px', 'auto'],
      p: [W - Q + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (a != 'x') for (let h in ie) ie[h] = ie[h].reverse();
    return ie;
  }
  const [u, L] = he(!1),
    [V, P] = he(null),
    O = re(0),
    T = re(),
    I = re(),
    f = re(z);
  te(() => {
    f.current = z;
  }, [z]),
    te(() => {
      V === null && l > 0 && P(l);
    }, [V, l]);
  function J(W) {
    return a == 'x' ? W.clientX : W.clientY;
  }
  const ne = C(
      (W) => {
        const Q = T.current + J(W) - O.current;
        $(Q);
        let ie;
        Q <= x ? (ie = 'chart') : y - Q <= g ? (ie = 'grid') : (ie = 'all'),
          f.current !== ie && (M(ie), (f.current = ie)),
          I.current && clearTimeout(I.current),
          (I.current = setTimeout(() => r && r(Q), 100));
      },
      [y, x, g, r],
    ),
    ee = C(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        L(!1),
        window.removeEventListener('mousemove', ne),
        window.removeEventListener('mouseup', ee);
    }, [ne]),
    le = v(
      () => (z !== 'all' ? 'auto' : a == 'x' ? 'ew-resize' : 'ns-resize'),
      [z, a],
    ),
    b = C(
      (W) => {
        (!w && (z === 'grid' || z === 'chart')) ||
          ((O.current = J(W)),
          (T.current = l),
          L(!0),
          (document.body.style.cursor = le),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', ne),
          window.addEventListener('mouseup', ee));
      },
      [le, ne, ee, l, w, z],
    );
  function se() {
    M('all'), V !== null && ($(V), r && r(V));
  }
  function X(W) {
    if (w) {
      const Q = z === 'chart' ? 'grid' : 'chart';
      M(Q), d(Q);
    } else if (z === 'grid' || z === 'chart') se(), d('all');
    else {
      const Q = W === 'left' ? 'chart' : 'grid';
      M(Q), d(Q);
    }
  }
  function K() {
    X('left');
  }
  function E() {
    X('right');
  }
  const D = v(() => H(l), [l, n, s, a]),
    q = [
      'wx-resizer',
      `wx-resizer-${a}`,
      `wx-resizer-display-${z}`,
      u ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ce('div', {
    className: 'wx-pFykzMlT ' + q,
    onMouseDown: b,
    style: { width: D.size[0], height: D.size[1], cursor: le },
    children: [
      /* @__PURE__ */ Ce('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ i('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ i('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: K,
            }),
          }),
          /* @__PURE__ */ i('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ i('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: E,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ i('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const dn = 650;
function yt(t) {
  let n;
  function s() {
    (n = new ResizeObserver((r) => {
      for (let d of r)
        if (d.target === document.body) {
          let w = d.contentRect.width <= dn;
          t(w);
        }
    })),
      n.observe(document.body);
  }
  function a() {
    n && (n.disconnect(), (n = null));
  }
  return {
    observe: s,
    disconnect: a,
  };
}
function un(t) {
  const {
      taskTemplate: n,
      readonly: s,
      cellBorders: a,
      highlightTime: r,
      onScaleClick: d,
      onTableAPIChange: w,
      multiTaskRows: y = !1,
      rowMapping: x = null,
    } = t,
    g = Ne(_e),
    l = A(g, '_tasks'),
    $ = A(g, '_scales'),
    z = A(g, 'cellHeight'),
    M = A(g, 'columns'),
    H = A(g, '_scrollTask'),
    u = A(g, 'undo'),
    L = v(() => {
      if (!y) return x;
      const k = /* @__PURE__ */ new Map(),
        Z = /* @__PURE__ */ new Map();
      return (
        l.forEach((xe) => {
          const we = xe.row ?? xe.id;
          Z.set(xe.id, we), k.has(we) || k.set(we, []), k.get(we).push(xe.id);
        }),
        { rowMap: k, taskRows: Z }
      );
    }, [l, y, x]),
    [V, P] = he(!1);
  let [O, T] = he(0);
  const [I, f] = he(0),
    [J, ne] = he(0),
    [ee, le] = he(void 0),
    [b, se] = he('all'),
    X = re(null),
    K = C(
      (k) => {
        P(
          (Z) => (
            k !== Z &&
              (k
                ? ((X.current = b), b === 'all' && se('grid'))
                : (!X.current || X.current === 'all') && se('all')),
            k
          ),
        );
      },
      [b],
    );
  te(() => {
    const k = yt(K);
    return (
      k.observe(),
      () => {
        k.disconnect();
      }
    );
  }, [K]);
  const E = v(() => {
    let k;
    return (
      M.every((Z) => Z.width && !Z.flexgrow)
        ? (k = M.reduce((Z, xe) => Z + parseInt(xe.width), 0))
        : V && b === 'chart'
          ? (k = parseInt(M.find((Z) => Z.id === 'action')?.width) || 50)
          : (k = 440),
      (O = k),
      k
    );
  }, [M, V, b]);
  te(() => {
    T(E);
  }, [E]);
  const D = v(() => (I ?? 0) - (ee ?? 0), [I, ee]),
    q = v(() => $.width, [$]),
    W = v(() => {
      if (!y || !L) return l.length * z;
      const k = /* @__PURE__ */ new Set();
      return (
        l.forEach((Z) => {
          const xe = L.taskRows.get(Z.id) ?? Z.id;
          k.add(xe);
        }),
        k.size * z
      );
    }, [l, z, y, L]),
    Q = v(() => $.height + W + D, [$, W, D]),
    ie = v(() => O + q, [O, q]),
    h = re(null),
    G = C(() => {
      Promise.resolve().then(() => {
        if ((I ?? 0) > (ie ?? 0)) {
          const k = (I ?? 0) - O;
          g.exec('expand-scale', { minWidth: k });
        }
      });
    }, [I, ie, O, g]);
  te(() => {
    let k;
    return (
      h.current && ((k = new ResizeObserver(G)), k.observe(h.current)),
      () => {
        k && k.disconnect();
      }
    );
  }, [h.current, G]),
    te(() => {
      G();
    }, [q]);
  const _ = re(null),
    U = re(null),
    ce = C(() => {
      const k = _.current;
      k &&
        g.exec('scroll-chart', {
          top: k.scrollTop,
        });
    }, [g]),
    de = re({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  te(() => {
    de.current = {
      rTasks: l,
      rScales: $,
      rCellHeight: z,
      scrollSize: D,
      ganttDiv: _.current,
      ganttHeight: J ?? 0,
    };
  }, [l, $, z, D, J]);
  const ge = C(
    (k) => {
      if (!k) return;
      const {
        rTasks: Z,
        rScales: xe,
        rCellHeight: we,
        scrollSize: ve,
        ganttDiv: be,
        ganttHeight: pe,
      } = de.current;
      if (!be) return;
      const { id: Ee } = k,
        Le = Z.findIndex((c) => c.id === Ee);
      if (Le > -1) {
        const c = pe - xe.height,
          R = Le * we,
          Y = be.scrollTop;
        let N = null;
        R < Y ? (N = R) : R + we > Y + c && (N = R - c + we + ve),
          N !== null &&
            (g.exec('scroll-chart', { top: Math.max(N, 0) }),
            (_.current.scrollTop = Math.max(N, 0)));
      }
    },
    [g],
  );
  te(() => {
    ge(H);
  }, [H]),
    te(() => {
      const k = _.current,
        Z = U.current;
      if (!k || !Z) return;
      const xe = () => {
          jt(() => {
            ne(k.offsetHeight), f(k.offsetWidth), le(Z.offsetWidth);
          });
        },
        we = new ResizeObserver(xe);
      return we.observe(k), () => we.disconnect();
    }, [_.current]);
  const ye = re(null),
    me = re(null);
  return (
    te(() => {
      me.current && (me.current.destroy(), (me.current = null));
      const k = ye.current;
      if (k)
        return (
          (me.current = pt(k, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': u,
              'ctrl+y': u,
            },
            exec: (Z) => {
              Z.isInput || g.exec('hotkey', Z);
            },
          })),
          () => {
            me.current?.destroy(), (me.current = null);
          }
        );
    }, [u]),
    /* @__PURE__ */ i('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: _,
      onScroll: ce,
      children: /* @__PURE__ */ i('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: Q, width: '100%' },
        ref: U,
        children: /* @__PURE__ */ i('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: J,
            width: ee,
          },
          children: /* @__PURE__ */ Ce('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: ye,
            children: [
              M.length
                ? /* @__PURE__ */ Ce(Ye, {
                    children: [
                      /* @__PURE__ */ i(Jt, {
                        display: b,
                        compactMode: V,
                        columnWidth: E,
                        width: O,
                        readonly: s,
                        fullHeight: W,
                        onTableAPIChange: w,
                        multiTaskRows: y,
                        rowMapping: L,
                      }),
                      /* @__PURE__ */ i(an, {
                        value: O,
                        display: b,
                        compactMode: V,
                        containerWidth: I,
                        onMove: (k) => T(k),
                        onDisplayChange: (k) => se(k),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ i('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: h,
                children: /* @__PURE__ */ i(cn, {
                  readonly: s,
                  fullWidth: q,
                  fullHeight: W,
                  taskTemplate: n,
                  cellBorders: a,
                  highlightTime: r,
                  onScaleClick: d,
                  multiTaskRows: y,
                  rowMapping: L,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function fn(t) {
  return {
    year: '%Y',
    quarter: `${t('Q')} %Q`,
    month: '%M',
    week: `${t('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function hn(t, n) {
  return typeof t == 'function' ? t : qe(t, n);
}
function kt(t, n) {
  return t.map(({ format: s, ...a }) => ({
    ...a,
    format: hn(s, n),
  }));
}
function mn(t, n) {
  const s = fn(n);
  for (let a in s) s[a] = qe(s[a], t);
  return s;
}
function gn(t, n) {
  if (!t || !t.length) return t;
  const s = qe('%d-%m-%Y', n);
  return t.map((a) =>
    a.template
      ? a
      : a.id === 'start' || a.id == 'end'
        ? {
            ...a,
            //store locale template for unscheduled tasks
            _template: (r) => s(r),
            template: (r) => s(r),
          }
        : a.id === 'duration'
          ? {
              ...a,
              _template: (r) => r,
              template: (r) => r,
            }
          : a,
  );
}
function xn(t, n) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((s) => ({
          ...s,
          scales: kt(s.scales, n),
        })),
      }
    : t;
}
const wn = (t) =>
    t
      .split('-')
      .map((n) => (n ? n.charAt(0).toUpperCase() + n.slice(1) : ''))
      .join(''),
  pn = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  Wn = ht(function (
    {
      taskTemplate: n = null,
      markers: s = [],
      taskTypes: a = Vt,
      tasks: r = [],
      selected: d = [],
      activeTask: w = null,
      links: y = [],
      scales: x = pn,
      columns: g = Ot,
      start: l = null,
      end: $ = null,
      lengthUnit: z = 'day',
      durationUnit: M = 'day',
      cellWidth: H = 100,
      cellHeight: u = 38,
      scaleHeight: L = 36,
      readonly: V = !1,
      cellBorders: P = 'full',
      zoom: O = !1,
      baselines: T = !1,
      highlightTime: I = null,
      onScaleClick: f = null,
      init: J = null,
      autoScale: ne = !0,
      unscheduledTasks: ee = !1,
      criticalPath: le = null,
      schedule: b = { type: 'forward' },
      projectStart: se = null,
      projectEnd: X = null,
      calendar: K = null,
      undo: E = !1,
      splitTasks: D = !1,
      multiTaskRows: q = !1,
      summary: W = null,
      _export: Q = !1,
      ...ie
    },
    h,
  ) {
    const G = re();
    G.current = ie;
    const _ = v(() => new Wt(Kt), []),
      U = v(() => ({ ...tt, ...Ue }), []),
      ce = Ne(Ae.i18n),
      de = v(() => (ce ? ce.extend(U, !0) : Qe(U)), [ce, U]),
      ge = v(() => de.getRaw().calendar, [de]),
      ye = v(() => {
        let c = {
          zoom: xn(O, ge),
          scales: kt(x, ge),
          columns: gn(g, ge),
          links: _t(y),
          cellWidth: H,
        };
        return (
          c.zoom &&
            (c = {
              ...c,
              ...Pt(c.zoom, mn(ge, de.getGroup('gantt')), c.scales, H),
            }),
          c
        );
      }, [O, x, g, y, H, ge, de]),
      me = re(null);
    me.current !== r &&
      (Q || lt(r, { durationUnit: M, splitTasks: D, calendar: K }),
      (me.current = r)),
      te(() => {
        Q || lt(r, { durationUnit: M, splitTasks: D, calendar: K });
      }, [r, M, K, D, Q]);
    const k = v(() => {
        if (!q) return null;
        const c = /* @__PURE__ */ new Map(),
          R = /* @__PURE__ */ new Map(),
          Y = (N) => {
            N.forEach((oe) => {
              const Me = oe.row ?? oe.id;
              R.set(oe.id, Me),
                c.has(Me) || c.set(Me, []),
                c.get(Me).push(oe.id),
                oe.data && oe.data.length > 0 && Y(oe.data);
            });
          };
        return Y(r), { rowMap: c, taskRows: R };
      }, [r, q]),
      Z = v(() => _.in, [_]),
      xe = re(null);
    xe.current === null &&
      ((xe.current = new At((c, R) => {
        const Y = 'on' + wn(c);
        G.current && G.current[Y] && G.current[Y](R);
      })),
      Z.setNext(xe.current));
    const [we, ve] = he(null),
      be = re(null);
    be.current = we;
    const pe = v(
      () => ({
        getState: _.getState.bind(_),
        getReactiveState: _.getReactive.bind(_),
        getStores: () => ({ data: _ }),
        exec: Z.exec.bind(Z),
        setNext: (c) => ((xe.current = xe.current.setNext(c)), xe.current),
        intercept: Z.intercept.bind(Z),
        on: Z.on.bind(Z),
        detach: Z.detach.bind(Z),
        getTask: _.getTask.bind(_),
        serialize: () => _.serialize(),
        getTable: (c) =>
          c
            ? new Promise((R) => setTimeout(() => R(be.current), 1))
            : be.current,
        getHistory: () => _.getHistory(),
      }),
      [_, Z],
    );
    te(() => {
      const c = () => {
        const { zoom: R, scales: Y } = pe.getState(),
          oe = R?.levels?.[R.level]?.scales?.[0]?.unit ?? Y?.[0]?.unit;
        oe && pe.exec('scale-change', { level: R?.level, unit: oe });
      };
      pe.on('zoom-scale', c), pe.on('set-scale', c);
    }, [pe]),
      te(() => {
        pe.intercept('set-scale', ({ unit: c, date: R }) => {
          const { zoom: Y } = pe.getState();
          if (!Y || !Y.levels) return !1;
          const N = Y.levels.findIndex((ke) =>
            ke.scales.some((De) => De.unit === c),
          );
          if (N < 0) return !1;
          const oe = Y.levels[N];
          if (N !== Y.level) {
            const ke = Math.round((oe.minCellWidth + oe.maxCellWidth) / 2);
            pe.getStores().data.setState({
              scales: oe.scales,
              cellWidth: ke,
              _cellWidth: ke,
              zoom: { ...Y, level: N },
              ...(R ? { _scaleDate: R, _zoomOffset: 0 } : {}),
            });
          } else if (R) {
            const { _scales: ke, cellWidth: De } = pe.getState(),
              Ke = ke.diff(R, ke.start, ke.lengthUnit),
              o = Math.max(0, Math.round(Ke * De));
            pe.exec('scroll-chart', { left: o });
          }
          return !1;
        });
      }, [pe]),
      mt(
        h,
        () => ({
          ...pe,
        }),
        [pe],
      );
    const Ee = re(0);
    te(() => {
      Ee.current
        ? _.init({
            tasks: r,
            links: ye.links,
            start: l,
            columns: ye.columns,
            end: $,
            lengthUnit: z,
            cellWidth: ye.cellWidth,
            cellHeight: u,
            scaleHeight: L,
            scales: ye.scales,
            taskTypes: a,
            zoom: ye.zoom,
            selected: d,
            activeTask: w,
            baselines: T,
            autoScale: ne,
            unscheduledTasks: ee,
            markers: s,
            durationUnit: M,
            criticalPath: le,
            schedule: b,
            projectStart: se,
            projectEnd: X,
            calendar: K,
            undo: E,
            _weekStart: ge.weekStart,
            splitTasks: D,
            summary: W,
          })
        : J && J(pe),
        Ee.current++;
    }, [
      pe,
      J,
      r,
      ye,
      l,
      $,
      z,
      u,
      L,
      a,
      d,
      w,
      T,
      ne,
      ee,
      s,
      M,
      le,
      b,
      se,
      X,
      K,
      E,
      ge,
      D,
      W,
      _,
    ]),
      Ee.current === 0 &&
        _.init({
          tasks: r,
          links: ye.links,
          start: l,
          columns: ye.columns,
          end: $,
          lengthUnit: z,
          cellWidth: ye.cellWidth,
          cellHeight: u,
          scaleHeight: L,
          scales: ye.scales,
          taskTypes: a,
          zoom: ye.zoom,
          selected: d,
          activeTask: w,
          baselines: T,
          autoScale: ne,
          unscheduledTasks: ee,
          markers: s,
          durationUnit: M,
          criticalPath: le,
          schedule: b,
          projectStart: se,
          projectEnd: X,
          calendar: K,
          undo: E,
          _weekStart: ge.weekStart,
          splitTasks: D,
          summary: W,
        });
    const Le = v(
      () =>
        K
          ? (c, R) =>
              (R == 'day' && !K.getDayHours(c)) ||
              (R == 'hour' && !K.getDayHours(c))
                ? 'wx-weekend'
                : ''
          : I,
      [K, I],
    );
    return /* @__PURE__ */ i(Ae.i18n.Provider, {
      value: de,
      children: /* @__PURE__ */ i(_e.Provider, {
        value: pe,
        children: /* @__PURE__ */ i(un, {
          taskTemplate: n,
          readonly: V,
          cellBorders: P,
          highlightTime: Le,
          onScaleClick: f,
          onTableAPIChange: ve,
          multiTaskRows: q,
          rowMapping: k,
        }),
      }),
    });
  });
function _n({ api: t = null, items: n = [] }) {
  const s = Ne(Ae.i18n),
    a = v(() => s || Qe(Ue), [s]),
    r = v(() => a.getGroup('gantt'), [a]),
    d = We(t, '_selected'),
    w = We(t, 'undo'),
    y = We(t, 'history'),
    x = We(t, 'splitTasks'),
    g = ['undo', 'redo'],
    l = v(() => {
      const z = it({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : it({
              undo: w,
              splitTasks: x,
            })
      ).map((H) => {
        let u = { ...H, disabled: !1 };
        return (
          (u.handler = wt(z, u.id) ? (L) => xt(t, L.id, null, r) : u.handler),
          u.text && (u.text = r(u.text)),
          u.menuText && (u.menuText = r(u.menuText)),
          u
        );
      });
    }, [n, t, r, w, x]),
    $ = v(() => {
      const z = [];
      return (
        l.forEach((M) => {
          const H = M.id;
          if (H === 'add-task') z.push(M);
          else if (g.includes(H))
            g.includes(H) &&
              z.push({
                ...M,
                disabled: M.isDisabled(y),
              });
          else {
            if (!d?.length || !t) return;
            z.push({
              ...M,
              disabled:
                M.isDisabled && d.some((u) => M.isDisabled(u, t.getState())),
            });
          }
        }),
        z.filter((M, H) => {
          if (t && M.isHidden)
            return !d.some((u) => M.isHidden(u, t.getState()));
          if (M.comp === 'separator') {
            const u = z[H + 1];
            if (!u || u.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, d, y, l]);
  return s
    ? /* @__PURE__ */ i(at, { items: $ })
    : /* @__PURE__ */ i(Ae.i18n.Provider, {
        value: a,
        children: /* @__PURE__ */ i(at, { items: $ }),
      });
}
const Pn = ht(function (
  {
    options: n = [],
    api: s = null,
    resolver: a = null,
    filter: r = null,
    at: d = 'point',
    children: w,
    onClick: y,
    css: x,
  },
  g,
) {
  const l = re(null),
    $ = re(null),
    z = Ne(Ae.i18n),
    M = v(() => z || Qe({ ...Ue, ...tt }), [z]),
    H = v(() => M.getGroup('gantt'), [M]),
    u = We(s, 'taskTypes'),
    L = We(s, 'selected'),
    V = We(s, '_selected'),
    P = We(s, 'splitTasks'),
    O = We(s, 'summary'),
    T = v(
      () => ({
        splitTasks: P,
        taskTypes: u,
        summary: O,
      }),
      [P, u, O],
    ),
    I = v(() => ct(T), [T]);
  te(() => {
    s &&
      (s.on('scroll-chart', () => {
        l.current && l.current.show && l.current.show();
      }),
      s.on('drag-task', () => {
        l.current && l.current.show && l.current.show();
      }));
  }, [s]);
  function f(E) {
    return E.map(
      (D) => (
        (D = { ...D }),
        D.text && (D.text = H(D.text)),
        D.subtext && (D.subtext = H(D.subtext)),
        D.data && (D.data = f(D.data)),
        D
      ),
    );
  }
  function J() {
    const E = n.length ? n : ct(T);
    return f(E);
  }
  const ne = v(() => J(), [s, n, T, H]),
    ee = v(() => (V && V.length ? V : []), [V]),
    le = C(
      (E, D) => {
        let q = E ? s?.getTask(E) : null;
        if (a) {
          const W = a(E, D);
          q = W === !0 ? q : W;
        }
        if (q) {
          const W = Oe(D.target, 'data-segment');
          W !== null
            ? ($.current = { id: q.id, segmentIndex: W })
            : ($.current = q.id),
            (!Array.isArray(L) || !L.includes(q.id)) &&
              s &&
              s.exec &&
              s.exec('select-task', { id: q.id });
        }
        return q;
      },
      [s, a, L],
    ),
    b = C(
      (E) => {
        const D = E.action;
        D && (wt(I, D.id) && xt(s, D.id, $.current, H), y && y(E));
      },
      [s, H, y, I],
    ),
    se = C(
      (E, D) => {
        const q = ee.length ? ee : D ? [D] : [];
        let W = r ? q.every((Q) => r(E, Q)) : !0;
        if (
          W &&
          (E.isHidden &&
            (W = !q.some((Q) => E.isHidden(Q, s.getState(), $.current))),
          E.isDisabled)
        ) {
          const Q = q.some((ie) => E.isDisabled(ie, s.getState(), $.current));
          E.disabled = Q;
        }
        return W;
      },
      [r, ee, s],
    );
  mt(g, () => ({
    show: (E, D) => {
      l.current && l.current.show && l.current.show(E, D);
    },
  }));
  const X = C((E) => {
      l.current && l.current.show && l.current.show(E);
    }, []),
    K = /* @__PURE__ */ Ce(Ye, {
      children: [
        /* @__PURE__ */ i(Xt, {
          filter: se,
          options: ne,
          dataKey: 'id',
          resolver: le,
          onClick: b,
          at: d,
          ref: l,
          css: x,
        }),
        /* @__PURE__ */ i('span', {
          onContextMenu: X,
          'data-menu-ignore': 'true',
          children: typeof w == 'function' ? w() : w,
        }),
      ],
    });
  if (!z && Ae.i18n?.Provider) {
    const E = Ae.i18n.Provider;
    return /* @__PURE__ */ i(E, { value: M, children: K });
  }
  return K;
});
function yn({ api: t, autoSave: n, onLinksChange: s }) {
  const r = Ne(Ae.i18n).getGroup('gantt'),
    d = A(t, 'activeTask'),
    w = A(t, '_activeTask'),
    y = A(t, '_links'),
    x = A(t, 'schedule'),
    g = A(t, 'unscheduledTasks'),
    [l, $] = he();
  function z() {
    if (d) {
      const L = y
          .filter((P) => P.target == d)
          .map((P) => ({ link: P, task: t.getTask(P.source) })),
        V = y
          .filter((P) => P.source == d)
          .map((P) => ({ link: P, task: t.getTask(P.target) }));
      return [
        { title: r('Predecessors'), data: L },
        { title: r('Successors'), data: V },
      ];
    }
  }
  te(() => {
    $(z());
  }, [d, y]);
  const M = v(
    () => [
      { id: 'e2s', label: r('End-to-start') },
      { id: 's2s', label: r('Start-to-start') },
      { id: 'e2e', label: r('End-to-end') },
      { id: 's2e', label: r('Start-to-end') },
    ],
    [r],
  );
  function H(L) {
    n
      ? t.exec('delete-link', { id: L })
      : ($((V) =>
          (V || []).map((P) => ({
            ...P,
            data: P.data.filter((O) => O.link.id !== L),
          })),
        ),
        s &&
          s({
            id: L,
            action: 'delete-link',
            data: { id: L },
          }));
  }
  function u(L, V) {
    n
      ? t.exec('update-link', {
          id: L,
          link: V,
        })
      : ($((P) =>
          (P || []).map((O) => ({
            ...O,
            data: O.data.map((T) =>
              T.link.id === L ? { ...T, link: { ...T.link, ...V } } : T,
            ),
          })),
        ),
        s &&
          s({
            id: L,
            action: 'update-link',
            data: {
              id: L,
              link: V,
            },
          }));
  }
  return /* @__PURE__ */ i(Ye, {
    children: (l || []).map((L, V) =>
      L.data.length
        ? /* @__PURE__ */ i(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ i(Ae.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ i(Tt, {
                  label: L.title,
                  position: 'top',
                  children: /* @__PURE__ */ i('table', {
                    children: /* @__PURE__ */ i('tbody', {
                      children: L.data.map((P) =>
                        /* @__PURE__ */ Ce(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ i('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ i('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: P.task.text || '',
                                }),
                              }),
                              x?.auto && P.link.type === 'e2s'
                                ? /* @__PURE__ */ i('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ i(Ct, {
                                      type: 'number',
                                      placeholder: r('Lag'),
                                      value: P.link.lag,
                                      disabled: g && w?.unscheduled,
                                      onChange: (O) => {
                                        O.input ||
                                          u(P.link.id, { lag: O.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ i('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ i('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ i(Mt, {
                                    value: P.link.type,
                                    placeholder: r('Select link type'),
                                    options: M,
                                    onChange: (O) =>
                                      u(P.link.id, { type: O.value }),
                                    children: ({ option: O }) => O.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ i('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ i('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => H(P.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          P.link.id,
                        ),
                      ),
                    }),
                  }),
                }),
              }),
            },
            V,
          )
        : null,
    ),
  });
}
function kn(t) {
  const { value: n, time: s, format: a, onchange: r, onChange: d, ...w } = t,
    y = d ?? r;
  function x(g) {
    const l = new Date(g.value);
    l.setHours(n.getHours()),
      l.setMinutes(n.getMinutes()),
      y && y({ value: l });
  }
  return /* @__PURE__ */ Ce('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ i($t, {
        ...w,
        value: n,
        onChange: x,
        format: a,
        buttons: ['today'],
        clear: !1,
      }),
      s ? /* @__PURE__ */ i(Rt, { value: n, onChange: y, format: a }) : null,
    ],
  });
}
Fe('select', St);
Fe('date', kn);
Fe('twostate', Et);
Fe('slider', Lt);
Fe('counter', It);
Fe('links', yn);
function On({
  api: t,
  items: n = [],
  css: s = '',
  layout: a = 'default',
  readonly: r = !1,
  placement: d = 'sidebar',
  bottomBar: w = !0,
  topBar: y = !0,
  autoSave: x = !0,
  focus: g = !1,
  hotkeys: l = {},
}) {
  const $ = Ne(Ae.i18n),
    z = v(() => $ || Qe({ ...Ue, ...tt }), [$]),
    M = v(() => z.getGroup('gantt'), [z]),
    H = z.getRaw(),
    u = v(() => {
      const c = H.gantt?.dateFormat || H.formats?.dateFormat;
      return qe(c, H.calendar);
    }, [H]),
    L = v(() => {
      if (y === !0 && !r) {
        const c = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: M('Delete'),
            id: 'delete',
          },
        ];
        return x
          ? { items: c }
          : {
              items: [
                ...c,
                {
                  comp: 'button',
                  type: 'primary',
                  text: M('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return y;
    }, [y, r, x, M]),
    [V, P] = he(!1),
    O = v(() => (V ? 'wx-full-screen' : ''), [V]),
    T = C((c) => {
      P(c);
    }, []);
  te(() => {
    const c = yt(T);
    return (
      c.observe(),
      () => {
        c.disconnect();
      }
    );
  }, [T]);
  const I = A(t, '_activeTask'),
    f = A(t, 'activeTask'),
    J = A(t, 'unscheduledTasks'),
    ne = A(t, 'summary'),
    ee = A(t, 'links'),
    le = A(t, 'splitTasks'),
    b = v(() => le && f?.segmentIndex, [le, f]),
    se = v(() => b || b === 0, [b]),
    X = A(t, 'taskTypes'),
    K = v(
      () => Ft({ unscheduledTasks: J, summary: ne, taskTypes: X }),
      [J, ne, X],
    ),
    E = A(t, 'undo'),
    [D, q] = he({}),
    [W, Q] = he(null),
    [ie, h] = he(),
    [G, _] = he(null),
    U = v(() => {
      if (!I) return null;
      let c;
      if ((se && I.segments ? (c = { ...I.segments[b] }) : (c = { ...I }), r)) {
        let R = { parent: c.parent };
        return (
          K.forEach(({ key: Y, comp: N }) => {
            if (N !== 'links') {
              const oe = c[Y];
              N === 'date' && oe instanceof Date
                ? (R[Y] = u(oe))
                : N === 'slider' && Y === 'progress'
                  ? (R[Y] = `${oe}%`)
                  : (R[Y] = oe);
            }
          }),
          R
        );
      }
      return c || null;
    }, [I, se, b, r, K, u]);
  te(() => {
    h(U);
  }, [U]),
    te(() => {
      q({}), _(null), Q(null);
    }, [f]);
  function ce(c, R) {
    return c.map((Y) => {
      const N = { ...Y };
      if (
        (Y.config && (N.config = { ...N.config }),
        N.comp === 'links' &&
          t &&
          ((N.api = t), (N.autoSave = x), (N.onLinksChange = ye)),
        N.comp === 'select' && N.key === 'type')
      ) {
        const oe = N.options ?? [];
        N.options = oe.map((Me) => ({
          ...Me,
          label: M(Me.label),
        }));
      }
      return (
        N.comp === 'slider' &&
          N.key === 'progress' &&
          (N.labelTemplate = (oe) => `${M(N.label)} ${oe}%`),
        N.label && (N.label = M(N.label)),
        N.config?.placeholder &&
          (N.config.placeholder = M(N.config.placeholder)),
        R &&
          (N.isDisabled && N.isDisabled(R, t.getState())
            ? (N.disabled = !0)
            : delete N.disabled),
        N
      );
    });
  }
  const de = v(() => {
      let c = n.length ? n : K;
      return (
        (c = ce(c, ie)),
        ie ? c.filter((R) => !R.isHidden || !R.isHidden(ie, t.getState())) : c
      );
    }, [n, K, ie, M, t, x]),
    ge = v(() => de.map((c) => c.key), [de]);
  function ye({ id: c, action: R, data: Y }) {
    q((N) => ({
      ...N,
      [c]: { action: R, data: Y },
    }));
  }
  const me = C(() => {
      for (let c in D)
        if (ee.byId(c)) {
          const { action: R, data: Y } = D[c];
          t.exec(R, Y);
        }
    }, [t, D, ee]),
    k = C(() => {
      const c = f?.id || f;
      if (se) {
        if (I?.segments) {
          const R = I.segments.filter((Y, N) => N !== b);
          t.exec('update-task', {
            id: c,
            task: { segments: R },
          });
        }
      } else t.exec('delete-task', { id: c });
    }, [t, f, se, I, b]),
    Z = C(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    xe = C(
      (c) => {
        const { item: R, changes: Y } = c;
        R.id === 'delete' && k(),
          R.id === 'save' && (Y.length ? Z() : me()),
          R.comp && Z();
      },
      [t, f, x, me, k, Z],
    ),
    we = C(
      (c, R, Y) => (
        J && c.type === 'summary' && (c.unscheduled = !1),
        gt(c, t.getState(), R),
        Y || Q(!1),
        c
      ),
      [J, t],
    ),
    ve = C(
      (c) => {
        (c = {
          ...c,
          unscheduled: J && c.unscheduled && c.type !== 'summary',
        }),
          delete c.links,
          delete c.data,
          (ge.indexOf('duration') === -1 || (c.segments && !c.duration)) &&
            delete c.duration;
        const R = {
          id: f?.id || f,
          task: c,
          ...(se && { segmentIndex: b }),
        };
        x && W && (R.inProgress = W), t.exec('update-task', R), x || me();
      },
      [t, f, J, x, me, ge, se, b, W],
    ),
    be = C(
      (c) => {
        let { update: R, key: Y, input: N } = c;
        if ((N && Q(!0), (c.update = we({ ...R }, Y, N)), !x)) h(c.update);
        else if (!G && !N) {
          const oe = de.find((De) => De.key === Y),
            Me = R[Y];
          (!oe.validation || oe.validation(Me)) &&
            (!oe.required || Me) &&
            ve(c.update);
        }
      },
      [x, we, G, de, ve],
    ),
    pe = C(
      (c) => {
        x || ve(c.values);
      },
      [x, ve],
    ),
    Ee = C((c) => {
      _(c.errors);
    }, []),
    Le = v(
      () =>
        E
          ? {
              'ctrl+z': (c) => {
                c.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (c) => {
                c.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [E, t],
    );
  return U
    ? /* @__PURE__ */ i(Nt, {
        children: /* @__PURE__ */ i(qt, {
          css: `wx-XkvqDXuw wx-gantt-editor ${O} ${s}`,
          items: de,
          values: U,
          topBar: L,
          bottomBar: w,
          placement: d,
          layout: a,
          readonly: r,
          autoSave: x,
          focus: g,
          onAction: xe,
          onSave: pe,
          onValidation: Ee,
          onChange: be,
          hotkeys: l && { ...Le, ...l },
        }),
      })
    : null;
}
const Vn = ({ children: t, columns: n = null, api: s }) => {
  const [a, r] = he(null);
  return (
    te(() => {
      s && s.getTable(!0).then(r);
    }, [s]),
    /* @__PURE__ */ i(Yt, { api: a, columns: n, children: t })
  );
};
function Fn(t) {
  const { api: n, content: s, children: a } = t,
    r = re(null),
    d = re(null),
    [w, y] = he({}),
    [x, g] = he(null),
    [l, $] = he({});
  function z(T) {
    for (; T; ) {
      if (T.getAttribute) {
        const I = T.getAttribute('data-tooltip-id'),
          f = T.getAttribute('data-tooltip-at'),
          J = T.getAttribute('data-tooltip');
        if (I || J) return { id: I, tooltip: J, target: T, at: f };
      }
      T = T.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  te(() => {
    const T = d.current;
    if (T && l && (l.text || s)) {
      const I = T.getBoundingClientRect();
      let f = !1,
        J = l.left,
        ne = l.top;
      I.right >= w.right && ((J = w.width - I.width - 5), (f = !0)),
        I.bottom >= w.bottom &&
          ((ne = l.top - (I.bottom - w.bottom + 2)), (f = !0)),
        f && $((ee) => ee && { ...ee, left: J, top: ne });
    }
  }, [l, w, s]);
  const M = re(null),
    H = 300,
    u = (T) => {
      clearTimeout(M.current),
        (M.current = setTimeout(() => {
          T();
        }, H));
    };
  function L(T) {
    let { id: I, tooltip: f, target: J, at: ne } = z(T.target);
    if (($(null), g(null), !f))
      if (I) f = P(I);
      else {
        clearTimeout(M.current);
        return;
      }
    const ee = T.clientX;
    u(() => {
      I && g(V(O(I)));
      const le = J.getBoundingClientRect(),
        b = r.current,
        se = b
          ? b.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let X, K;
      ne === 'left'
        ? ((X = le.top + 5 - se.top), (K = le.right + 5 - se.left))
        : ((X = le.top + le.height - se.top), (K = ee - se.left)),
        y(se),
        $({ top: X, left: K, text: f });
    });
  }
  function V(T) {
    return n?.getTask(O(T)) || null;
  }
  function P(T) {
    return V(T)?.text || '';
  }
  function O(T) {
    const I = parseInt(T);
    return isNaN(I) ? T : I;
  }
  return /* @__PURE__ */ Ce('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: r,
    onMouseMove: L,
    children: [
      l && (l.text || s)
        ? /* @__PURE__ */ i('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: d,
            style: { top: `${l.top}px`, left: `${l.left}px` },
            children: s
              ? /* @__PURE__ */ i(s, { data: x })
              : l.text
                ? /* @__PURE__ */ i('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: l.text,
                  })
                : null,
          })
        : null,
      a,
    ],
  });
}
function Kn({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ i(st, { fonts: t, children: n() })
    : /* @__PURE__ */ i(st, { fonts: t });
}
function Bn({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ i(rt, { fonts: t, children: n })
    : /* @__PURE__ */ i(rt, { fonts: t });
}
function Yn({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ i(ot, { fonts: t, children: n })
    : /* @__PURE__ */ i(ot, { fonts: t });
}
const vn = '2.5.2',
  bn = {
    version: vn,
  },
  jn = bn.version;
export {
  Pn as ContextMenu,
  On as Editor,
  Wn as Gantt,
  Vn as HeaderMenu,
  Kn as Material,
  _n as Toolbar,
  Fn as Tooltip,
  Bn as Willow,
  Yn as WillowDark,
  Qn as defaultColumns,
  Un as defaultEditorItems,
  Zn as defaultMenuOptions,
  Jn as defaultTaskTypes,
  es as defaultToolbarButtons,
  ts as getEditorItems,
  ns as getMenuOptions,
  ss as getToolbarButtons,
  ls as registerEditorItem,
  rs as registerScaleUnit,
  jn as version,
};
//# sourceMappingURL=index.es.js.map
