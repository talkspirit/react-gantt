import { jsxs as Ie, jsx as u, Fragment as et } from 'react/jsx-runtime';
import {
  createContext as Zt,
  useContext as Ye,
  useMemo as M,
  useState as me,
  useCallback as A,
  useRef as se,
  useEffect as le,
  Fragment as Jt,
  forwardRef as At,
  useImperativeHandle as Pt,
} from 'react';
import {
  context as Ke,
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
function St(t) {
  return t && t.getAttribute('data-context-id');
}
const Dt = 5;
function Sn(t, n) {
  let r, c, o, R, T, x, m, E, s;
  function p($) {
    (R = $.clientX),
      (T = $.clientY),
      (x = {
        ...En(r, t, $),
        y: n.getTask(o).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function F($) {
    (r = Fe($)),
      St(r) &&
        ((o = Qe(r)),
        (s = setTimeout(() => {
          (E = !0), n && n.touchStart && n.touchStart(), p($.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', B),
        t.addEventListener('contextmenu', z),
        window.addEventListener('touchend', O));
  }
  function z($) {
    if (E || s) return $.preventDefault(), !1;
  }
  function _($) {
    $.which === 1 &&
      ((r = Fe($)),
      St(r) &&
        ((o = Qe(r)),
        t.addEventListener('mousemove', w),
        window.addEventListener('mouseup', re),
        p($)));
  }
  function b($) {
    t.removeEventListener('mousemove', w),
      t.removeEventListener('touchmove', B),
      document.body.removeEventListener('mouseup', re),
      document.body.removeEventListener('touchend', O),
      (document.body.style.userSelect = ''),
      $ &&
        (t.removeEventListener('mousedown', _),
        t.removeEventListener('touchstart', F));
  }
  function N($) {
    const we = $.clientX - R,
      ie = $.clientY - T;
    if (!c) {
      if (
        (Math.abs(we) < Dt && Math.abs(ie) < Dt) ||
        (n && n.start && n.start({ id: o, e: $ }) === !1)
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
      const pe = Math.round(Math.max(0, x.top + ie));
      if (n && n.move && n.move({ id: o, top: pe, detail: m }) === !1) return;
      const H = n.getTask(o),
        I = H.$y;
      if (!x.start && x.y == I) return ee();
      (x.start = !0), (x.y = H.$y - 4), (c.style.top = pe + 'px');
      const J = document.elementFromPoint($.clientX, $.clientY),
        U = Fe(J);
      if (U && U !== r) {
        const j = Qe(U),
          Q = U.getBoundingClientRect(),
          k = Q.top + Q.height / 2,
          X = $.clientY + x.db > k && U.nextElementSibling !== r,
          K = $.clientY - x.dt < k && U.previousElementSibling !== r;
        m?.after == j || m?.before == j
          ? (m = null)
          : X
            ? (m = { id: o, after: j })
            : K && (m = { id: o, before: j });
      }
    }
  }
  function w($) {
    N($);
  }
  function B($) {
    E
      ? ($.preventDefault(), N($.touches[0]))
      : s && (clearTimeout(s), (s = null));
  }
  function O() {
    (E = null), s && (clearTimeout(s), (s = null)), ee();
  }
  function re() {
    ee();
  }
  function ee() {
    r && (r.style.visibility = ''),
      c &&
        (c.parentNode.removeChild(c),
        n && n.end && n.end({ id: o, top: x.top })),
      (o = r = c = x = m = null),
      b();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', _),
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
  function c(R, T) {
    return {
      justifyContent: T.align,
      paddingLeft: `${(R.$level - 1) * 20}px`,
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
  const r = M(() => t.id, [t?.id]);
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
      columnWidth: R = 0,
      fullHeight: T,
      onTableAPIChange: x,
      multiTaskRows: m = !1,
      rowMapping: E = null,
      rowHeightOverrides: s = null,
    } = t,
    [p, F] = ht(R),
    [z, _] = me(),
    b = Ye(Ke.i18n),
    N = M(() => b.getGroup('gantt'), [b]),
    w = Ye(Ue),
    B = Y(w, 'scrollTop'),
    O = Y(w, 'cellHeight'),
    re = Y(w, '_scrollTask'),
    ee = Y(w, '_selected'),
    $ = Y(w, 'area'),
    we = Y(w, '_tasks'),
    ie = Y(w, '_scales'),
    pe = Y(w, 'columns'),
    H = Y(w, '_sort'),
    I = Y(w, 'calendar'),
    J = Y(w, 'durationUnit'),
    U = Y(w, 'splitTasks'),
    [j, Q] = me(null),
    k = M(() => {
      if (!we || !$) return [];
      if (m && E) {
        const i = /* @__PURE__ */ new Set();
        return we.filter((h) => {
          const S = E.taskRows.get(h.id) ?? h.id;
          return i.has(S) ? !1 : (i.add(S), !0);
        });
      }
      return we.slice($.start, $.end);
    }, [we, $, m, E]),
    X = A(
      (i, h) => {
        if (h === 'add-task')
          w.exec(h, {
            target: i,
            task: { text: N('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (h === 'open-task') {
          const S = k.find((q) => q.id === i);
          (S?.data || S?.lazy) && w.exec(h, { id: i, mode: !S.open });
        }
      },
      [k],
    ),
    K = A(
      (i) => {
        const h = Ze(i),
          S = i.target.dataset.action;
        S && i.preventDefault(),
          h
            ? S === 'add-task' || S === 'open-task'
              ? X(h, S)
              : w.exec('select-task', {
                  id: h,
                  toggle: i.ctrlKey || i.metaKey,
                  range: i.shiftKey,
                  show: !0,
                })
            : S === 'add-task' && X(null, S);
      },
      [w, X],
    ),
    Z = se(null),
    ue = se(null),
    [De, be] = me(0),
    [Ae, Ne] = me(!1);
  le(() => {
    const i = ue.current;
    if (!i || typeof ResizeObserver > 'u') return;
    const h = () => be(i.clientWidth);
    h();
    const S = new ResizeObserver(h);
    return S.observe(i), () => S.disconnect();
  }, []);
  const ze = se(null),
    Re = A(
      (i) => {
        const h = i.id,
          { before: S, after: q } = i,
          ge = i.onMove;
        let he = S || q,
          ve = S ? 'before' : 'after';
        if (ge) {
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
          inProgress: ge,
        });
      },
      [w],
    ),
    y = M(() => $?.from ?? 0, [$]),
    D = M(() => ie?.height ?? 0, [ie]),
    L = M(
      () => (!r && o !== 'grid' ? (p ?? 0) > (c ?? 0) : (p ?? 0) > (De ?? 0)),
      [r, o, p, c, De],
    ),
    de = M(() => {
      const i = {};
      return (
        (L && o === 'all') || (o === 'grid' && L)
          ? (i.width = p)
          : o === 'grid' && (i.width = '100%'),
        i
      );
    }, [L, o, p]),
    ne = M(() => (j && !k.find((i) => i.id === j.id) ? [...k, j] : k), [k, j]),
    te = M(() => {
      let i = (pe || []).map((q) => {
        q = { ...q };
        const ge = q.header;
        if (typeof ge == 'object') {
          const he = ge.text && N(ge.text);
          q.header = { ...ge, text: he };
        } else q.header = N(ge);
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
          const [ge] = i.splice(S, 1);
          i.unshift(ge);
        }
      }
      return i.length > 0 && (i[i.length - 1].resize = !1), i;
    }, [pe, N, n, r, w]),
    fe = M(
      () =>
        o === 'all'
          ? `${c}px`
          : o === 'grid'
            ? 'calc(100% - 4px)'
            : te.find((i) => i.id === 'add-task')
              ? '50px'
              : '0',
      [o, c, te],
    ),
    Pe = M(() => {
      if (ne && H?.length) {
        const i = {};
        return (
          H.forEach(({ key: h, order: S }, q) => {
            i[h] = {
              order: S,
              ...(H.length > 1 && { index: q }),
            };
          }),
          i
        );
      }
      return {};
    }, [ne, H]),
    _e = A(() => te.some((i) => i.flexgrow && !i.hidden), []),
    Te = M(() => _e(), [_e, Ae]),
    Le = M(() => {
      let i = o === 'chart' ? te.filter((S) => S.id === 'add-task') : te;
      const h = o === 'all' ? c : De;
      if (!Te) {
        let S = p,
          q = !1;
        if (te.some((ge) => ge.$width)) {
          let ge = 0;
          (S = te.reduce(
            (he, ve) => (
              ve.hidden || ((ge += ve.width), (he += ve.$width || ve.width)), he
            ),
            0,
          )),
            ge > S && S > h && (q = !0);
        }
        if (q || S < h) {
          let ge = 1;
          return (
            q || (ge = (h - 50) / (S - 50 || 1)),
            i.map(
              (he) => (
                he.id !== 'add-task' &&
                  !he.hidden &&
                  (he.$width || (he.$width = he.width),
                  (he.width = he.$width * ge)),
                he
              ),
            )
          );
        }
      }
      return i;
    }, [o, te, Te, p, c, De]),
    Ge = A(
      (i) => {
        if (!_e()) {
          const h = Le.reduce(
            (S, q) => (
              i && q.$width && (q.$width = q.width),
              S + (q.hidden ? 0 : q.width)
            ),
            0,
          );
          h !== p && F(h);
        }
        Ne(!0), Ne(!1);
      },
      [_e, Le, p, F],
    ),
    l = A(() => {
      te.filter((h) => h.flexgrow && !h.hidden).length === 1 &&
        te.forEach((h) => {
          h.$width && !h.flexgrow && !h.hidden && (h.width = h.$width);
        });
    }, []),
    G = A(
      (i) => {
        if (!n) {
          const h = Ze(i),
            S = dn(i, 'data-col-id');
          !(S && te.find((ge) => ge.id == S))?.editor &&
            h &&
            w.exec('show-editor', { id: h });
        }
      },
      [w, n],
      // cols is defined later; relies on latest value at call time
    ),
    W = M(() => (Array.isArray(ee) ? ee.map((i) => i.id) : []), [ee]),
    v = A(() => {
      if (Z.current && ne !== null) {
        const i = Z.current.querySelector('.wx-body');
        i &&
          (m
            ? (i.style.top = '0px')
            : (i.style.top = -((B ?? 0) - (y ?? 0)) + 'px'));
      }
      ue.current && (ue.current.scrollTop = 0);
    }, [ne, B, y, m]);
  le(() => {
    Z.current && v();
  }, [B, y, v]),
    le(() => {
      const i = Z.current;
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
    }, [Le, de, o, fe, ne, v]),
    le(() => {
      if (!re || !z) return;
      const { id: i } = re,
        h = z.getState().focusCell;
      h &&
        h.row !== i &&
        Z.current &&
        Z.current.contains(document.activeElement) &&
        z.exec('focus-cell', {
          row: i,
          column: h.column,
        });
    }, [re, z]),
    le(() => {
      if (!m) return;
      const i = Z.current;
      if (!i) return;
      const h = i.querySelector('.wx-table-box .wx-body');
      if (!h) return;
      let S = 0;
      h.querySelectorAll('[data-id]').forEach((ge) => {
        const he = ge.getAttribute('data-id'),
          ve = (s && he && s[he]) || O;
        (ge.style.height = `${ve}px`),
          (ge.style.minHeight = `${ve}px`),
          (S += ve);
      }),
        S > 0 && (h.style.height = `${S}px`);
    }, [s, m, ne, O]);
  const Ee = A(
      ({ id: i }) => {
        if (n) return !1;
        w.getTask(i).open && w.exec('open-task', { id: i, mode: !1 });
        const h = w.getState()._tasks.find((S) => S.id === i);
        if ((Q(h || null), !h)) return !1;
      },
      [w, n],
    ),
    ce = A(
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
    xe = A(
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
  le(() => {
    const i = Z.current;
    return i
      ? Sn(i, {
          start: Ee,
          end: ce,
          move: xe,
          getTask: w.getTask,
        }).destroy
      : void 0;
  }, [w, Ee, ce, xe]);
  const ke = A(
      (i) => {
        const { key: h, isInput: S } = i;
        if (!S && (h === 'arrowup' || h === 'arrowdown'))
          return (i.eventSource = 'grid'), w.exec('hotkey', i), !1;
        if (h === 'enter') {
          const q = z?.getState().focusCell;
          if (q) {
            const { row: ge, column: he } = q;
            he === 'add-task'
              ? X(ge, 'add-task')
              : he === 'text' && X(ge, 'open-task');
          }
        }
      },
      [w, X, z],
    ),
    $e = se(null),
    Ce = () => {
      $e.current = {
        setTableAPI: _,
        handleHotkey: ke,
        sortVal: H,
        api: w,
        adjustColumns: l,
        setColumnWidth: Ge,
        tasks: k,
        calendarVal: I,
        durationUnitVal: J,
        splitTasksVal: U,
        onTableAPIChange: x,
      };
    };
  Ce(),
    le(() => {
      Ce();
    }, [_, ke, H, w, l, Ge, k, I, J, U, x]);
  const We = A((i) => {
    _(i),
      i.intercept('hotkey', (h) => $e.current.handleHotkey(h)),
      i.intercept('scroll', () => !1),
      i.intercept('select-row', () => !1),
      i.intercept('sort-rows', (h) => {
        const S = $e.current.sortVal,
          { key: q, add: ge } = h,
          he = S ? S.find((He) => He.key === q) : null;
        let ve = 'asc';
        return (
          he && (ve = !he || he.order === 'asc' ? 'desc' : 'asc'),
          w.exec('sort-tasks', {
            key: q,
            order: ve,
            add: ge,
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
        const { id: S, column: q, value: ge } = h,
          he = $e.current.tasks.find((ve) => ve.id === S);
        if (he) {
          const ve = { ...he };
          let He = ge;
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
      x && x(i);
  }, []);
  return /* @__PURE__ */ u('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${fe}` },
    ref: ue,
    children: /* @__PURE__ */ u('div', {
      ref: Z,
      style: de,
      className: 'wx-rHj6070p wx-table',
      onClick: K,
      onDoubleClick: G,
      children: /* @__PURE__ */ u(Tn, {
        init: We,
        sizes: {
          rowHeight: O,
          headerHeight: (D ?? 0) - 1,
        },
        rowStyle: (i) =>
          i.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (i) =>
          `wx-rHj6070p wx-text-${i.align}${i.id === 'add-task' ? ' wx-action' : ''}`,
        data: ne,
        columns: Le,
        selectedRows: [...W],
        sortMarks: Pe,
      }),
    }),
  });
}
function Nn({ borders: t = '', rowLayout: n = null }) {
  const r = Ye(Ue),
    c = Y(r, 'cellWidth'),
    o = Y(r, 'cellHeight'),
    R = se(null),
    [T, x] = me('#e4e4e4');
  le(() => {
    if (typeof getComputedStyle < 'u' && R.current) {
      const s = getComputedStyle(R.current).getPropertyValue(
        '--wx-gantt-border',
      );
      x(s ? s.substring(s.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const m = M(() => {
    if (!n) return null;
    const s = [];
    let p = 0;
    for (const F of n) (p += F.height), s.push(p);
    return s;
  }, [n]);
  if (!m) {
    const s = {
      width: '100%',
      height: '100%',
      background: c != null && o != null ? `url(${hn(c, o, T, t)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ u('div', { ref: R, style: s });
  }
  const E = c
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${c - 1}px, ${T} ${c - 1}px, ${T} ${c}px)`
    : void 0;
  return /* @__PURE__ */ Ie('div', {
    ref: R,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ u('div', {
        style: {
          width: '100%',
          height: '100%',
          background: E,
          position: 'absolute',
        },
      }),
      m.map((s, p) =>
        /* @__PURE__ */ u(
          'div',
          {
            style: {
              position: 'absolute',
              top: `${s}px`,
              width: '100%',
              height: '1px',
              backgroundColor: T,
            },
          },
          p,
        ),
      ),
    ],
  });
}
function In({ onSelectLink: t, selectedLink: n, readonly: r }) {
  const c = Ye(Ue),
    o = Y(c, '_links'),
    R = Y(c, 'criticalPath'),
    T = se(null),
    x = A(
      (m) => {
        const E = m?.target?.classList;
        !E?.contains('wx-line') && !E?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    le(() => {
      if (!r && n && T.current) {
        const m = (E) => {
          T.current && !T.current.contains(E.target) && x(E);
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
          const E =
            'wx-dkx3NwEn wx-line' +
            (R && m.$critical ? ' wx-critical' : '') +
            (r ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ u(
            'polyline',
            {
              className: E,
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
            ref: T,
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
  function c(R) {
    const T = n.segments[R];
    return {
      left: `${T.$x}px`,
      top: '0px',
      width: `${T.$w}px`,
      height: '100%',
    };
  }
  function o(R) {
    if (!n.progress) return 0;
    const T = (n.duration * n.progress) / 100,
      x = n.segments;
    let m = 0,
      E = 0,
      s = null;
    do {
      const p = x[E];
      E === R &&
        (m > T ? (s = 0) : (s = Math.min((T - m) / p.duration, 1) * 100)),
        (m += p.duration),
        E++;
    } while (s === null && E < x.length);
    return s || 0;
  }
  return /* @__PURE__ */ u('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((R, T) =>
      /* @__PURE__ */ Ie(
        'div',
        {
          className: `wx-segment wx-bar wx-${r} wx-GKbcLEGA`,
          'data-segment': T,
          style: c(T),
          children: [
            n.progress
              ? /* @__PURE__ */ u('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ u('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${o(T)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ u('div', {
              className: 'wx-content',
              children: R.text || '',
            }),
          ],
        },
        T,
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
      R = 864e5,
      T =
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
      m = new Date(r.getTime() + x * T * R);
    return m.setUTCHours(0, 0, 0, 0), m;
  },
  An = (t, n, r) => {
    if (!r || !t || !n) return 0;
    const { lengthUnit: c } = r,
      T =
        (c === 'week'
          ? 7
          : c === 'month'
            ? 30
            : c === 'quarter'
              ? 91
              : c === 'year'
                ? 365
                : 1) * 864e5;
    return Math.round((t.getTime() - n.getTime()) / T);
  },
  Pn = (t, n, r) => {
    if (!r || !t) return t;
    const { lengthUnit: c } = r,
      T =
        (c === 'week'
          ? 7
          : c === 'month'
            ? 30
            : c === 'quarter'
              ? 91
              : c === 'year'
                ? 365
                : 1) * 864e5,
      x = new Date(t.getTime() + n * T);
    return x.setUTCHours(0, 0, 0, 0), x;
  };
function Gn(t) {
  const {
      readonly: n,
      taskTemplate: r,
      multiTaskRows: c = !1,
      rowMapping: o = null,
      rowHeightOverrides: R = null,
      allowTaskIntersection: T = !0,
      summaryBarCounts: x = !1,
      marqueeSelect: m = !1,
      copyPaste: E = !1,
    } = t,
    s = Ye(Ue),
    [p, F] = mt(s, '_tasks'),
    [z, _] = mt(s, '_links'),
    b = Y(s, 'area'),
    N = Y(s, '_scales'),
    w = Y(s, 'taskTypes'),
    B = Y(s, 'baselines'),
    O = Y(s, '_selected'),
    re = Y(s, '_scrollTask'),
    ee = Y(s, 'criticalPath'),
    $ = Y(s, 'tasks'),
    we = Y(s, 'schedule'),
    ie = Y(s, 'splitTasks'),
    pe = Y(s, 'summary'),
    H = M(() => {
      if (!b || !Array.isArray(p)) return [];
      const e = b.start ?? 0,
        a = b.end ?? 0;
      return c && o
        ? p.map((f) => ({ ...f }))
        : p.slice(e, a).map((f) => ({ ...f }));
    }, [F, b, c, o]),
    I = Y(s, 'cellHeight'),
    J = M(() => {
      if (!c || !o || !H.length) return H;
      const e = /* @__PURE__ */ new Map(),
        a = [];
      p.forEach((C) => {
        const oe = o.taskRows.get(C.id) ?? C.id;
        e.has(oe) || (e.set(oe, a.length), a.push(oe));
      });
      const f = /* @__PURE__ */ new Map();
      H.forEach((C) => {
        if (C.type === 'summary') return;
        const oe = o.taskRows.get(C.id) ?? C.id;
        f.has(oe) || f.set(oe, []), f.get(oe).push(C);
      });
      const d = /* @__PURE__ */ new Map(),
        g = /* @__PURE__ */ new Map();
      f.forEach((C, oe) => {
        const ae = [],
          Me = [...C].sort((ye, Se) => (ye.$x ?? 0) - (Se.$x ?? 0));
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
      const P = /* @__PURE__ */ new Map();
      let V = 0;
      for (const C of a) {
        P.set(C, V);
        const oe = (R && R[C]) || I;
        V += oe;
      }
      return H.map((C) => {
        const oe = o.taskRows.get(C.id) ?? C.id,
          ae = P.get(oe) ?? 0;
        if (C.type === 'summary') {
          if ((f.get(oe) || []).length > 0) return { ...C, $y: ae, $skip: !0 };
          const Xe = (R && R[oe]) || I,
            Be = Math.max(0, Math.floor((Xe - C.$h) / 2));
          return {
            ...C,
            $y: ae + Be,
            $y_base: C.$y_base !== void 0 ? ae + Be : void 0,
          };
        }
        const Me = g.get(oe) || 1,
          ye = d.get(C.id) ?? 0;
        if (Me > 1) {
          const Be = C.$h + 4,
            je = ae + 3 + ye * Be;
          return {
            ...C,
            $y: je,
            $y_base: C.$y_base !== void 0 ? je : void 0,
          };
        }
        const Se = (R && R[oe]) || I,
          Ve = Math.max(0, Math.round((Se - C.$h) / 2));
        return {
          ...C,
          $y: ae + Ve,
          $y_base: C.$y_base !== void 0 ? ae + Ve : void 0,
        };
      });
    }, [H, c, o, p, I, R]),
    U = M(() => N.lengthUnitWidth, [N]),
    j = M(() => N.lengthUnit || 'day', [N]),
    Q = M(() => {
      const e = /* @__PURE__ */ new Set();
      if (T || !c || !o) return e;
      const a = /* @__PURE__ */ new Map();
      return (
        p.forEach((f) => {
          if (f.type === 'summary' || f.type === 'milestone') return;
          const d = o.taskRows.get(f.id) ?? f.id;
          a.has(d) || a.set(d, []), a.get(d).push(f);
        }),
        a.forEach((f) => {
          if (!(f.length < 2))
            for (let d = 0; d < f.length; d++)
              for (let g = d + 1; g < f.length; g++) {
                const P = f[d],
                  V = f[g];
                It(P.$x, P.$x + P.$w, V.$x, V.$x + V.$w) &&
                  (e.add(P.id), e.add(V.id));
              }
        }),
        e
      );
    }, [T, c, o, p, F]),
    k = M(() => {
      if (!x || !p?.length || !U) return null;
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Set();
      p.forEach((d) => {
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
          const P = /* @__PURE__ */ new Map();
          g.forEach((V) => {
            if (V.$x == null || V.$w == null) return;
            const C = Math.floor(V.$x / U),
              oe = Math.ceil((V.$x + V.$w) / U);
            for (let ae = C; ae < oe; ae++) P.set(ae, (P.get(ae) || 0) + 1);
          }),
            P.size > 0 && f.set(d, P);
        }),
        f
      );
    }, [x, p, U]),
    [X, K] = me(null),
    Z = se(null),
    [ue, De] = me(null),
    [be, Ae] = me(null),
    [Ne, ze] = me(null),
    Re = se(null);
  Re.current = Ne;
  const y = se(0),
    D = se(!1),
    [L, de] = me(void 0),
    [ne, te] = me(null),
    fe = se(null),
    [Pe, _e] = me(null),
    Te = M(
      () =>
        Pe && {
          ...z.find((e) => e.id === Pe),
        },
      [Pe, _],
    ),
    [Le, Ge] = me(void 0),
    l = se(null),
    [G, W] = me(0),
    v = se(null),
    Ee = M(() => {
      const e = v.current;
      return !!(O.length && e && e.contains(document.activeElement));
    }, [O, v.current]),
    ce = M(() => Ee && O[O.length - 1]?.id, [Ee, O]);
  le(() => {
    if (re && Ee && re) {
      const { id: e } = re,
        a = v.current?.querySelector(`.wx-bar[data-id='${e}']`);
      a && a.focus({ preventScroll: !0 });
    }
  }, [re]),
    le(() => {
      const e = v.current;
      if (e && (W(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const a = new ResizeObserver((f) => {
          f[0] && W(f[0].contentRect.width);
        });
        return a.observe(e), () => a.disconnect();
      }
    }, [v.current]);
  const xe = A(() => {
      document.body.style.userSelect = 'none';
    }, []),
    ke = A(() => {
      document.body.style.userSelect = '';
    }, []),
    $e = M(() => {
      if (!c || !o || !p?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        p.forEach((d) => {
          const g = o.taskRows.get(d.id) ?? d.id;
          a.has(g) || (a.set(g, f.length), f.push(g));
        }),
        p.forEach((d) => {
          const g = o.taskRows.get(d.id) ?? d.id,
            P = a.get(g) ?? 0;
          e.set(d.id, P * I);
        }),
        e
      );
    }, [p, c, o, I]),
    Ce = M(() => {
      if (!c || !o || !p?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        a = /* @__PURE__ */ new Map(),
        f = [];
      return (
        p.forEach((d) => {
          const g = o.taskRows.get(d.id) ?? d.id;
          a.has(g) || (a.set(g, f.length), f.push(g));
        }),
        p.forEach((d) => {
          const g = d.row ?? d.id;
          if (!e.has(g)) {
            const P = o.taskRows.get(d.id) ?? d.id,
              V = a.get(P) ?? 0;
            e.set(g, V * I);
          }
        }),
        e
      );
    }, [p, c, o, I]),
    We = A(
      (e) => {
        if (!v.current) return [];
        const a = Math.min(e.startX, e.currentX),
          f = Math.max(e.startX, e.currentX),
          d = Math.min(e.startY, e.currentY),
          g = Math.max(e.startY, e.currentY);
        return p.filter((P) => {
          const V = P.$x,
            C = P.$x + P.$w,
            ae = $e.get(P.id) ?? P.$y,
            Me = ae + P.$h;
          return V < f && C > a && ae < g && Me > d;
        });
      },
      [p, $e],
    ),
    i = A(() => {
      if (!E) return;
      const e = s.getState()._selected;
      if (!e || !e.length) return;
      const a = 864e5,
        f = e
          .map((C) => {
            if (!s.getTask(C.id)) return null;
            const ae = p.find((ut) => ut.id === C.id);
            if (!ae) return null;
            const {
                $x: Me,
                $y: ye,
                $h: Se,
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
              _originalHeight: Se,
            };
          })
          .filter(Boolean);
      if (!f.length) return;
      const g = f[0].parent,
        P = f.filter((C) => C.parent === g);
      if (P.length === 0) return;
      const V = P.reduce(
        (C, oe) => (oe.start && (!C || oe.start < C) ? oe.start : C),
        null,
      );
      (dt = P.map((C) => ({
        ...C,
        _startCellOffset: An(C.start, V, N),
      }))),
        (Nt = g),
        (ft = V);
    }, [E, s, p, N]),
    h = A(
      (e, a, f) => {
        if (!a.length || !e || f == null) return;
        const d = 864e5,
          g = s.getHistory();
        g?.startBatch();
        const P = new Date(e);
        P.setUTCHours(0, 0, 0, 0),
          a.forEach((V, C) => {
            const oe = `task-${Date.now()}-${C}`,
              ae = Pn(P, V._startCellOffset || 0, N),
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
                skipUndo: C > 0,
              });
          }),
          g?.endBatch();
      },
      [s, N],
    );
  le(
    () =>
      E
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
    [E, s, i],
  ),
    le(() => {
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
  const S = A(
      (e, a, f) => {
        if (
          a.target.classList.contains('wx-line') ||
          (f || (f = s.getTask(Qe(e))),
          f.type === 'milestone' || f.type === 'summary')
        )
          return '';
        const d = Fe(a, 'data-segment');
        d && (e = d);
        const { left: g, width: P } = e.getBoundingClientRect(),
          V = (a.clientX - g) / P;
        let C = 0.2 / (P > 200 ? P / 200 : 1);
        return V < C ? 'start' : V > 1 - C ? 'end' : '';
      },
      [s],
    ),
    q = A(
      (e, a) => {
        const { clientX: f } = a,
          d = Qe(e),
          g = s.getTask(d),
          P = a.target.classList;
        if (
          !a.target.closest('.wx-delete-button') &&
          !a.target.closest('[data-interactive]') &&
          !n
        ) {
          if (P.contains('wx-progress-marker')) {
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
              C = {
                id: d,
                mode: V,
                x: f,
                dx: 0,
                l: g.$x,
                w: g.$w,
              };
            if (ie && g.segments?.length) {
              const oe = Fe(a, 'data-segment');
              oe && ((C.segmentIndex = oe.dataset.segment * 1), mn(g, C));
            }
            te(C);
          }
          xe();
        }
      },
      [s, n, S, xe, ie],
    ),
    ge = A(
      (e) => {
        if (e.button !== 0 || be) return;
        const a = Fe(e);
        if (!a && m && !n) {
          const f = v.current;
          if (!f) return;
          const d = f.getBoundingClientRect(),
            g = e.clientX - d.left,
            P = e.clientY - d.top;
          if (E) {
            const C = Ht(g, N);
            C && ((Re.current = C), ze(C));
          }
          const V = {
            startX: g,
            startY: P,
            currentX: g,
            currentY: P,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          K(V), (Z.current = V), xe();
          return;
        }
        if (a && m && !n && O.length > 1) {
          const f = Qe(a);
          if (O.some((g) => g.id === f)) {
            De({
              startX: e.clientX,
              ids: O.map((g) => g.id),
              tasks: O.map((g) => {
                const P = s.getTask(g.id);
                return {
                  id: g.id,
                  start: P.start,
                  end: P.end,
                  $x: P.$x,
                  $w: P.$w,
                };
              }),
            }),
              xe();
            return;
          }
        }
        a && q(a, e);
      },
      [q, m, E, n, be, N, O, s, xe],
    ),
    he = A(
      (e) => {
        const a = Fe(e);
        a &&
          (l.current = setTimeout(() => {
            Ge(!0), q(a, e.touches[0]);
          }, 300));
      },
      [q],
    ),
    ve = A((e) => {
      _e(e);
    }, []),
    He = A(() => {
      const e = Z.current;
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
          K(null),
          (Z.current = null),
          ke(),
          (D.current = !0);
        return;
      }
      if (ue) {
        const { ids: a, tasks: f, startX: d } = ue;
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
      } else if (ne) {
        const {
          id: a,
          mode: f,
          dx: d,
          l: g,
          w: P,
          start: V,
          segment: C,
          index: oe,
        } = ne;
        if ((te(null), V)) {
          const ae = Math.round(d / U);
          if (!ae)
            s.exec('drag-task', {
              id: a,
              width: P,
              left: g,
              inProgress: !1,
              ...(C && { segmentIndex: oe }),
            });
          else {
            let Me = {},
              ye = s.getTask(a);
            C && (ye = ye.segments[oe]);
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
                ...(C && { segmentIndex: oe }),
              });
          }
          D.current = !0;
        }
        ke();
      }
    }, [s, ke, ne, U, j]),
    tt = A(
      (e, a) => {
        const { clientX: f } = a;
        if (E && v.current) {
          const d = v.current.getBoundingClientRect();
          y.current = f - d.left;
        }
        if (be && v.current) {
          const d = v.current.getBoundingClientRect();
          Ae((g) => (g ? { ...g, currentX: f - d.left } : null));
        }
        if (X) {
          const d = v.current;
          if (!d) return;
          const g = d.getBoundingClientRect(),
            P = f - g.left,
            V = a.clientY - g.top;
          K((C) => ({
            ...C,
            currentX: P,
            currentY: V,
          })),
            Z.current && ((Z.current.currentX = P), (Z.current.currentY = V));
          return;
        }
        if (!n)
          if (fe.current) {
            const { node: d, x: g, id: P } = fe.current,
              V = (fe.current.dx = f - g),
              C = Math.round((V / d.offsetWidth) * 100);
            let oe = fe.current.progress + C;
            (fe.current.value = oe = Math.min(Math.max(0, oe), 100)),
              s.exec('update-task', {
                id: P,
                task: { progress: oe },
                inProgress: !0,
              });
          } else if (ne) {
            ve(null);
            const {
                mode: d,
                l: g,
                w: P,
                x: V,
                id: C,
                start: oe,
                segment: ae,
                index: Me,
              } = ne,
              ye = s.getTask(C),
              Se = f - V,
              Ve = Math.round(U) || 1;
            if (
              (!oe && Math.abs(Se) < 20) ||
              (d === 'start' && P - Se < Ve) ||
              (d === 'end' && P + Se < Ve) ||
              (d === 'move' &&
                ((Se < 0 && g + Se < 0) || (Se > 0 && g + P + Se > G))) ||
              (ne.segment && !gn(ye, ne))
            )
              return;
            const Oe = { ...ne, dx: Se };
            let Xe, Be;
            if (
              (d === 'start'
                ? ((Xe = g + Se), (Be = P - Se))
                : d === 'end'
                  ? ((Xe = g), (Be = P + Se))
                  : d === 'move' && ((Xe = g + Se), (Be = P)),
              s.exec('drag-task', {
                id: C,
                width: Be,
                left: Xe,
                inProgress: !0,
                start: oe,
                ...(ae && { segmentIndex: Me }),
              }),
              !Oe.start &&
                ((d === 'move' && ye.$x == g) || (d !== 'move' && ye.$w == P)))
            ) {
              (D.current = !0), He();
              return;
            }
            (Oe.start = !0), te(Oe);
          } else {
            const d = Fe(e);
            if (d) {
              const g = s.getTask(Qe(d)),
                V = Fe(e, 'data-segment') || d,
                C = S(V, a, g);
              V.style.cursor = C && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [s, n, ne, U, G, S, ve, He],
    ),
    Yt = A(
      (e) => {
        tt(e, e);
      },
      [tt],
    ),
    Bt = A(
      (e) => {
        Le
          ? (e.preventDefault(), tt(e, e.touches[0]))
          : l.current && (clearTimeout(l.current), (l.current = null));
      },
      [Le, tt],
    ),
    ct = A(() => {
      He();
    }, [He]),
    Kt = A(() => {
      Ge(null),
        l.current && (clearTimeout(l.current), (l.current = null)),
        He();
    }, [He]);
  le(
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
          : !!z.find(
              (g) => g.target == e && g.source == f && g.type === nt(d, a),
            );
      },
      [L, _, nt],
    ),
    wt = A(() => {
      L && de(null);
    }, [L]),
    qt = A(
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
      [s, L, _, Te, st, nt, wt],
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
        if (Le || l.current) return e.preventDefault(), !1;
      },
      [Le],
    ),
    pt = M(() => w.map((e) => e.id), [w]),
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
    at = A((e) => ee && $.byId(e).$critical, [ee, $]),
    bt = A(
      (e) => {
        if (we?.auto) {
          const a = $.getSummaryId(e, !0),
            f = $.getSummaryId(L.id, !0);
          return (
            L?.id &&
            !(Array.isArray(a) ? a : [a]).includes(L.id) &&
            !(Array.isArray(f) ? f : [f]).includes(e)
          );
        }
        return L;
      },
      [we, $, L],
    );
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${J.length ? J[0].$h : 0}px` },
    ref: v,
    onContextMenu: Qt,
    onMouseDown: ge,
    onMouseMove: Yt,
    onTouchStart: he,
    onTouchMove: Bt,
    onTouchEnd: Kt,
    onClick: qt,
    onDoubleClick: Vt,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ u(In, {
        onSelectLink: ve,
        selectedLink: Te,
        readonly: n,
      }),
      J.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const a = Q.has(e.id),
          f =
            `wx-bar wx-${xt(e.type)}` +
            (Le && ne && e.id === ne.id ? ' wx-touch' : '') +
            (L && L.id === e.id ? ' wx-selected' : '') +
            (at(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (ie && e.segments ? ' wx-split' : '') +
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
                            e.progress && !(ie && e.segments)
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
                            !(ie && e.segments) &&
                            !(e.type == 'summary' && pe?.autoProgress)
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
                              : ie && e.segments
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
                    k &&
                      e.type === 'summary' &&
                      (() => {
                        const P = k.get(e.id),
                          V = Math.floor(e.$x / U),
                          C = Math.ceil((e.$x + e.$w) / U);
                        return /* @__PURE__ */ u('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: C - V }, (oe, ae) => {
                            const Me = V + ae,
                              ye = P?.get(Me) || 0;
                            return /* @__PURE__ */ u(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${ye === 0 ? ' wx-week-count-zero' : ''}`,
                                style: {
                                  position: 'absolute',
                                  left: `${Me * U - e.$x}px`,
                                  width: `${U}px`,
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
      X &&
        (() => {
          const e = Math.min(X.startX, X.currentX),
            a = Math.min(X.startY, X.currentY),
            f = Math.abs(X.currentX - X.startX),
            d = Math.abs(X.currentY - X.startY);
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
              (Math.floor(be.currentX / U) + (e._startCellOffset || 0)) * U,
            g = e._originalWidth || U,
            P = e._originalHeight || I,
            V = Ce.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: d, top: V, width: g, height: P },
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
    children: (o?.rows || []).map((R, T) =>
      /* @__PURE__ */ u(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${R.height}px` },
          children: (R.cells || []).map((x, m) => {
            const E = n ? n(x.date, x.unit) : '',
              s = 'wx-cell ' + (x.css || '') + ' ' + (E || '');
            return /* @__PURE__ */ u(
              'div',
              {
                className: 'wx-ZkvhDKir ' + s,
                style: {
                  width: `${x.width}px`,
                  cursor: r ? 'pointer' : void 0,
                },
                onClick: r ? (p) => r(x.date, x.unit, p.nativeEvent) : void 0,
                children: x.value,
              },
              m,
            );
          }),
        },
        T,
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
    le(() => {
      if (o)
        return (
          cancelAnimationFrame(c.current),
          (c.current = requestAnimationFrame(() => {
            const R = {
              label: t,
              time: performance.now() - n.current,
              renders: r.current,
              timestamp: Date.now(),
            };
            _n.set(t, R),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: R }),
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
      cellBorders: R,
      highlightTime: T,
      onScaleClick: x,
      multiTaskRows: m = !1,
      rowMapping: E = null,
      rowHeightOverrides: s = null,
      allowTaskIntersection: p = !0,
      summaryBarCounts: F = !1,
      marqueeSelect: z = !1,
      copyPaste: _ = !1,
    } = t,
    b = Ye(Ue),
    [N, w] = mt(b, '_selected'),
    B = Y(b, 'scrollTop'),
    O = Y(b, 'cellHeight'),
    re = Y(b, 'cellWidth'),
    ee = Y(b, '_scales'),
    $ = Y(b, '_markers'),
    we = Y(b, '_scrollTask'),
    ie = Y(b, 'zoom'),
    [pe, H] = me(),
    I = se(null),
    J = Y(b, '_tasks'),
    U = 1 + (ee?.rows?.length || 0),
    j = M(() => {
      if (!m || !E || !J?.length) return null;
      const y = /* @__PURE__ */ new Map(),
        D = /* @__PURE__ */ new Map(),
        L = [];
      return (
        J.forEach((de) => {
          const ne = E.taskRows.get(de.id) ?? de.id;
          D.has(ne) || (D.set(ne, L.length), L.push(ne));
        }),
        J.forEach((de) => {
          const ne = E.taskRows.get(de.id) ?? de.id,
            te = D.get(ne) ?? 0;
          y.set(de.id, te * O);
        }),
        y
      );
    }, [J, m, E, O]),
    Q = M(() => {
      const y = [];
      return (
        N &&
          N.length &&
          O &&
          N.forEach((D) => {
            const L = j?.get(D.id) ?? D.$y;
            y.push({ height: `${O}px`, top: `${L - 3}px` });
          }),
        y
      );
    }, [w, O, j]),
    k = M(() => Math.max(pe || 0, c), [pe, c]),
    X = M(() => {
      if (
        !s ||
        !m ||
        !E ||
        !J?.length ||
        !Object.values(s).some((L) => L !== O)
      )
        return null;
      const D = [];
      return (
        J.forEach((L) => {
          const de = E.taskRows.get(L.id) ?? L.id;
          D.includes(de) || D.push(de);
        }),
        D.map((L) => ({
          id: L,
          height: s[L] || O,
        }))
      );
    }, [J, E, s, m, O]);
  le(() => {
    const y = I.current;
    y && typeof B == 'number' && (y.scrollTop = m ? 0 : B);
  }, [B, m]);
  const K = () => {
    Z();
  };
  function Z(y) {
    const D = I.current;
    if (!D) return;
    const L = {};
    (L.left = D.scrollLeft), b.exec('scroll-chart', L);
  }
  function ue() {
    const y = I.current,
      L = Math.ceil((pe || 0) / (O || 1)) + 1,
      de = Math.floor(((y && y.scrollTop) || 0) / (O || 1)),
      ne = Math.max(0, de - U),
      te = de + L + U,
      fe = ne * (O || 0);
    b.exec('render-data', {
      start: ne,
      end: te,
      from: fe,
    });
  }
  le(() => {
    ue();
  }, [pe, B]);
  const De = A(
    (y) => {
      if (!y) return;
      const { id: D, mode: L } = y;
      if (L.toString().indexOf('x') < 0) return;
      const de = I.current;
      if (!de) return;
      const { clientWidth: ne } = de,
        te = b.getTask(D);
      if (te.$x + te.$w < de.scrollLeft)
        b.exec('scroll-chart', { left: te.$x - (re || 0) }),
          (de.scrollLeft = te.$x - (re || 0));
      else if (te.$x >= ne + de.scrollLeft) {
        const fe = ne < te.$w ? re || 0 : te.$w;
        b.exec('scroll-chart', { left: te.$x - ne + fe }),
          (de.scrollLeft = te.$x - ne + fe);
      }
    },
    [b, re],
  );
  le(() => {
    De(we);
  }, [we]);
  function be(y) {
    if (ie && (y.ctrlKey || y.metaKey)) {
      y.preventDefault();
      const D = I.current,
        L = -Math.sign(y.deltaY),
        de = y.clientX - (D ? D.getBoundingClientRect().left : 0);
      b.exec('zoom-scale', {
        dir: L,
        offset: de,
      });
    }
  }
  function Ae(y) {
    const D = T(y.date, y.unit);
    return D
      ? {
          css: D,
          width: y.width,
        }
      : null;
  }
  const Ne = M(
      () =>
        ee && (ee.minUnit === 'hour' || ee.minUnit === 'day') && T
          ? ee.rows[ee.rows.length - 1].cells.map(Ae)
          : null,
      [ee, T],
    ),
    ze = A(
      (y) => {
        (y.eventSource = 'chart'), b.exec('hotkey', y);
      },
      [b],
    );
  le(() => {
    const y = I.current;
    if (!y) return;
    const D = () => H(y.clientHeight);
    D();
    const L = new ResizeObserver(() => D());
    return (
      L.observe(y),
      () => {
        L.disconnect();
      }
    );
  }, [I.current]);
  const Re = se(null);
  return (
    le(() => {
      const y = I.current;
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
    le(() => {
      const y = I.current;
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
      ref: I,
      onScroll: K,
      children: [
        /* @__PURE__ */ u(zn, {
          highlightTime: T,
          onScaleClick: x,
          scales: ee,
        }),
        $ && $.length
          ? /* @__PURE__ */ u('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${k}px` },
              children: $.map((y, D) =>
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
          style: { width: `${r}px`, height: `${k}px` },
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
            /* @__PURE__ */ u(Nn, { borders: R, rowLayout: X }),
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
              rowMapping: E,
              rowHeightOverrides: s,
              allowTaskIntersection: p,
              summaryBarCounts: F,
              marqueeSelect: z,
              copyPaste: _,
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
      onDisplayChange: R,
      compactMode: T,
      containerWidth: x = 0,
      leftThreshold: m = 50,
      rightThreshold: E = 50,
    } = t,
    [s, p] = ht(t.value ?? 0),
    [F, z] = ht(t.display ?? 'all');
  function _(K) {
    let Z = 0;
    n == 'center' ? (Z = r / 2) : n == 'before' && (Z = r);
    const ue = {
      size: [r + 'px', 'auto'],
      p: [K - Z + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (c != 'x') for (let De in ue) ue[De] = ue[De].reverse();
    return ue;
  }
  const [b, N] = me(!1),
    [w, B] = me(null),
    O = se(0),
    re = se(),
    ee = se(),
    $ = se(F);
  le(() => {
    $.current = F;
  }, [F]),
    le(() => {
      w === null && s > 0 && B(s);
    }, [w, s]);
  function we(K) {
    return c == 'x' ? K.clientX : K.clientY;
  }
  const ie = A(
      (K) => {
        const Z = re.current + we(K) - O.current;
        p(Z);
        let ue;
        Z <= m ? (ue = 'chart') : x - Z <= E ? (ue = 'grid') : (ue = 'all'),
          $.current !== ue && (z(ue), ($.current = ue)),
          ee.current && clearTimeout(ee.current),
          (ee.current = setTimeout(() => o && o(Z), 100));
      },
      [x, m, E, o],
    ),
    pe = A(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        N(!1),
        window.removeEventListener('mousemove', ie),
        window.removeEventListener('mouseup', pe);
    }, [ie]),
    H = M(
      () => (F !== 'all' ? 'auto' : c == 'x' ? 'ew-resize' : 'ns-resize'),
      [F, c],
    ),
    I = A(
      (K) => {
        (!T && (F === 'grid' || F === 'chart')) ||
          ((O.current = we(K)),
          (re.current = s),
          N(!0),
          (document.body.style.cursor = H),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', ie),
          window.addEventListener('mouseup', pe));
      },
      [H, ie, pe, s, T, F],
    );
  function J() {
    z('all'), w !== null && (p(w), o && o(w));
  }
  function U(K) {
    if (T) {
      const Z = F === 'chart' ? 'grid' : 'chart';
      z(Z), R(Z);
    } else if (F === 'grid' || F === 'chart') J(), R('all');
    else {
      const Z = K === 'left' ? 'chart' : 'grid';
      z(Z), R(Z);
    }
  }
  function j() {
    U('left');
  }
  function Q() {
    U('right');
  }
  const k = M(() => _(s), [s, n, r, c]),
    X = [
      'wx-resizer',
      `wx-resizer-${c}`,
      `wx-resizer-display-${F}`,
      b ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-pFykzMlT ' + X,
    onMouseDown: I,
    style: { width: k.size[0], height: k.size[1], cursor: H },
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
      for (let R of o)
        if (R.target === document.body) {
          let T = R.contentRect.width <= Yn;
          t(T);
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
      onScaleClick: R,
      onTableAPIChange: T,
      multiTaskRows: x = !1,
      rowMapping: m = null,
      rowHeightOverrides: E = null,
      allowTaskIntersection: s = !0,
      summaryBarCounts: p = !1,
      marqueeSelect: F = !1,
      copyPaste: z = !1,
    } = t,
    _ = Ye(Ue),
    b = Y(_, '_tasks'),
    N = Y(_, '_scales'),
    w = Y(_, 'cellHeight'),
    B = Y(_, 'columns'),
    O = Y(_, '_scrollTask'),
    re = Y(_, 'undo'),
    ee = M(() => {
      if (!x) return m;
      const l = /* @__PURE__ */ new Map(),
        G = /* @__PURE__ */ new Map();
      return (
        b.forEach((W) => {
          const v = W.row ?? W.id;
          G.set(W.id, v), l.has(v) || l.set(v, []), l.get(v).push(W.id);
        }),
        { rowMap: l, taskRows: G }
      );
    }, [b, x, m]),
    [$, we] = me(!1);
  let [ie, pe] = me(0);
  const [H, I] = me(0),
    [J, U] = me(0),
    [j, Q] = me(void 0),
    [k, X] = me('all'),
    K = se(null),
    Z = A(
      (l) => {
        we(
          (G) => (
            l !== G &&
              (l
                ? ((K.current = k), k === 'all' && X('grid'))
                : (!K.current || K.current === 'all') && X('all')),
            l
          ),
        );
      },
      [k],
    );
  le(() => {
    const l = Ot(Z);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [Z]);
  const ue = M(() => {
    let l;
    return (
      B.every((G) => G.width && !G.flexgrow)
        ? (l = B.reduce((G, W) => G + parseInt(W.width), 0))
        : $ && k === 'chart'
          ? (l = parseInt(B.find((G) => G.id === 'action')?.width) || 50)
          : (l = 440),
      (ie = l),
      l
    );
  }, [B, $, k]);
  le(() => {
    pe(ue);
  }, [ue]);
  const De = M(() => (H ?? 0) - (j ?? 0), [H, j]),
    be = M(() => N.width, [N]),
    Ae = 14,
    Ne = M(() => {
      let l;
      if (!x || !ee) l = b.length * w;
      else {
        const G = [];
        b.forEach((W) => {
          const v = ee.taskRows.get(W.id) ?? W.id;
          G.includes(v) || G.push(v);
        }),
          (l = 0);
        for (const W of G) l += (E && E[W]) || w;
      }
      return l + Ae;
    }, [b, w, x, ee, E]),
    ze = M(() => N.height + Ne + De, [N, Ne, De]),
    Re = M(() => ie + be, [ie, be]),
    y = se(null),
    D = se(!1),
    L = se(null);
  le(() => {
    const l = () => {
      (D.current = !0),
        clearTimeout(L.current),
        (L.current = setTimeout(() => {
          D.current = !1;
        }, 300));
    };
    return (
      _.on('zoom-scale', l),
      _.on('set-scale', l),
      () => {
        clearTimeout(L.current);
      }
    );
  }, [_]);
  const de = A(() => {
      Promise.resolve().then(() => {
        if (!D.current && (H ?? 0) > (Re ?? 0)) {
          const l = (H ?? 0) - ie;
          _.exec('expand-scale', { minWidth: l });
        }
      });
    }, [H, Re, ie, _]),
    ne = se(de);
  (ne.current = de),
    le(() => {
      let l;
      return (
        y.current &&
          ((l = new ResizeObserver(() => ne.current())), l.observe(y.current)),
        () => {
          l && l.disconnect();
        }
      );
    }, [y.current]);
  const te = se(null),
    fe = se(null),
    Pe = A(() => {
      const l = te.current;
      l &&
        _.exec('scroll-chart', {
          top: l.scrollTop,
        });
    }, [_]),
    _e = se({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  le(() => {
    _e.current = {
      rTasks: b,
      rScales: N,
      rCellHeight: w,
      scrollSize: De,
      ganttDiv: te.current,
      ganttHeight: J ?? 0,
    };
  }, [b, N, w, De, J]);
  const Te = A(
    (l) => {
      if (!l) return;
      const {
        rTasks: G,
        rScales: W,
        rCellHeight: v,
        scrollSize: Ee,
        ganttDiv: ce,
        ganttHeight: xe,
      } = _e.current;
      if (!ce) return;
      const { id: ke } = l,
        $e = G.findIndex((Ce) => Ce.id === ke);
      if ($e > -1) {
        const Ce = xe - W.height,
          We = $e * v,
          i = ce.scrollTop;
        let h = null;
        We < i ? (h = We) : We + v > i + Ce && (h = We - Ce + v + Ee),
          h !== null &&
            (_.exec('scroll-chart', { top: Math.max(h, 0) }),
            (te.current.scrollTop = Math.max(h, 0)));
      }
    },
    [_],
  );
  le(() => {
    Te(O);
  }, [O]),
    le(() => {
      const l = te.current,
        G = fe.current;
      if (!l || !G) return;
      const W = () => {
          Cn(() => {
            U(l.offsetHeight), I(l.offsetWidth), Q(G.offsetWidth);
          });
        },
        v = new ResizeObserver(W);
      return v.observe(l), () => v.disconnect();
    }, [te.current]);
  const Le = se(null),
    Ge = se(null);
  return (
    le(() => {
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
            exec: (G) => {
              G.isInput || _.exec('hotkey', G);
            },
          })),
          () => {
            Ge.current?.destroy(), (Ge.current = null);
          }
        );
    }, [re]),
    /* @__PURE__ */ u('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: te,
      onScroll: Pe,
      children: /* @__PURE__ */ u('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: ze, width: '100%' },
        ref: fe,
        children: /* @__PURE__ */ u('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: J,
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
                        display: k,
                        compactMode: $,
                        columnWidth: ue,
                        width: ie,
                        readonly: r,
                        fullHeight: Ne,
                        onTableAPIChange: T,
                        multiTaskRows: x,
                        rowMapping: ee,
                        rowHeightOverrides: E,
                      }),
                      /* @__PURE__ */ u(Xn, {
                        value: ie,
                        display: k,
                        compactMode: $,
                        containerWidth: H,
                        onMove: (l) => pe(l),
                        onDisplayChange: (l) => X(l),
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
                  onScaleClick: R,
                  multiTaskRows: x,
                  rowMapping: ee,
                  rowHeightOverrides: E,
                  allowTaskIntersection: s,
                  summaryBarCounts: p,
                  marqueeSelect: F,
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
      taskTypes: c = bn,
      tasks: o = Jn,
      selected: R = es,
      activeTask: T = null,
      links: x = ts,
      scales: m = Qn,
      columns: E = yn,
      start: s = null,
      end: p = null,
      lengthUnit: F = 'day',
      durationUnit: z = 'day',
      cellWidth: _ = 100,
      cellHeight: b = 38,
      scaleHeight: N = 36,
      readonly: w = !1,
      cellBorders: B = 'full',
      zoom: O = !1,
      baselines: re = !1,
      highlightTime: ee = null,
      onScaleClick: $ = null,
      init: we = null,
      autoScale: ie = !0,
      unscheduledTasks: pe = !1,
      criticalPath: H = null,
      schedule: I = ns,
      projectStart: J = null,
      projectEnd: U = null,
      calendar: j = null,
      undo: Q = !1,
      splitTasks: k = !1,
      multiTaskRows: X = !1,
      rowHeightOverrides: K = null,
      allowTaskIntersection: Z = !0,
      summaryBarCounts: ue = !1,
      marqueeSelect: De = !1,
      copyPaste: be = !1,
      summary: Ae = null,
      _export: Ne = !1,
      ...ze
    },
    Re,
  ) {
    const y = se();
    y.current = ze;
    const D = M(() => new wn(kn), []),
      L = M(() => ({ ...gt, ...it }), []),
      de = Ye(Ke.i18n),
      ne = M(() => (de ? de.extend(L, !0) : lt(L)), [de, L]),
      te = M(() => ne.getRaw().calendar, [ne]),
      fe = M(() => {
        let ce = {
          zoom: Un(O, te),
          scales: Xt(m, te),
          columns: qn(E, te),
          links: pn(x),
          cellWidth: _,
        };
        return (
          ce.zoom &&
            (ce = {
              ...ce,
              ...xn(ce.zoom, Fn(te, ne.getGroup('gantt')), ce.scales, _),
            }),
          ce
        );
      }, [O, m, E, x, _, te, ne]),
      Pe = se(null);
    Pe.current !== o &&
      (Ne || Ct(o, { durationUnit: z, splitTasks: k, calendar: j }),
      (Pe.current = o)),
      le(() => {
        Ne || Ct(o, { durationUnit: z, splitTasks: k, calendar: j });
      }, [o, z, j, k, Ne]);
    const _e = M(() => {
        if (!X) return null;
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
      }, [o, X]),
      Te = M(() => D.in, [D]),
      Le = se(null);
    Le.current === null &&
      ((Le.current = new fn((ce, xe) => {
        const ke = 'on' + jn(ce);
        y.current && y.current[ke] && y.current[ke](xe);
      })),
      Te.setNext(Le.current));
    const [Ge, l] = me(null),
      G = se(null);
    G.current = Ge;
    const W = M(
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
            ? new Promise((xe) => setTimeout(() => xe(G.current), 1))
            : G.current,
        getHistory: () => D.getHistory(),
      }),
      [D, Te],
    );
    le(() => {
      const ce = () => {
        const { zoom: xe, scales: ke } = W.getState(),
          Ce = xe?.levels?.[xe.level]?.scales?.[0]?.unit ?? ke?.[0]?.unit;
        Ce && W.exec('scale-change', { level: xe?.level, unit: Ce });
      };
      W.on('zoom-scale', ce), W.on('set-scale', ce);
    }, [W]),
      le(() => {
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
              S = i.diff(xe, i.start, i.lengthUnit),
              q = Math.max(0, Math.round(S * h));
            W.exec('scroll-chart', { left: q });
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
    const v = se(0);
    le(() => {
      v.current
        ? D.init({
            tasks: o,
            links: fe.links,
            start: s,
            columns: fe.columns,
            end: p,
            lengthUnit: F,
            cellWidth: fe.cellWidth,
            cellHeight: b,
            scaleHeight: N,
            scales: fe.scales,
            taskTypes: c,
            zoom: fe.zoom,
            selected: R,
            activeTask: T,
            baselines: re,
            autoScale: ie,
            unscheduledTasks: pe,
            markers: r,
            durationUnit: z,
            criticalPath: H,
            schedule: I,
            projectStart: J,
            projectEnd: U,
            calendar: j,
            undo: Q,
            _weekStart: te.weekStart,
            splitTasks: k,
            summary: Ae,
          })
        : we && we(W),
        v.current++;
    }, [
      W,
      we,
      o,
      fe,
      s,
      p,
      F,
      b,
      N,
      c,
      R,
      T,
      re,
      ie,
      pe,
      r,
      z,
      H,
      I,
      J,
      U,
      j,
      Q,
      te,
      k,
      Ae,
      D,
    ]),
      v.current === 0 &&
        D.init({
          tasks: o,
          links: fe.links,
          start: s,
          columns: fe.columns,
          end: p,
          lengthUnit: F,
          cellWidth: fe.cellWidth,
          cellHeight: b,
          scaleHeight: N,
          scales: fe.scales,
          taskTypes: c,
          zoom: fe.zoom,
          selected: R,
          activeTask: T,
          baselines: re,
          autoScale: ie,
          unscheduledTasks: pe,
          markers: r,
          durationUnit: z,
          criticalPath: H,
          schedule: I,
          projectStart: J,
          projectEnd: U,
          calendar: j,
          undo: Q,
          _weekStart: te.weekStart,
          splitTasks: k,
          summary: Ae,
        });
    const Ee = M(
      () =>
        j
          ? (ce, xe) =>
              (xe == 'day' && !j.getDayHours(ce)) ||
              (xe == 'hour' && !j.getDayHours(ce))
                ? 'wx-weekend'
                : ''
          : ee,
      [j, ee],
    );
    return /* @__PURE__ */ u(Ke.i18n.Provider, {
      value: ne,
      children: /* @__PURE__ */ u(Ue.Provider, {
        value: W,
        children: /* @__PURE__ */ u(Bn, {
          taskTemplate: n,
          readonly: w,
          cellBorders: B,
          highlightTime: Ee,
          onScaleClick: $,
          onTableAPIChange: l,
          multiTaskRows: X,
          rowMapping: _e,
          rowHeightOverrides: K,
          allowTaskIntersection: Z,
          summaryBarCounts: ue,
          marqueeSelect: De,
          copyPaste: be,
        }),
      }),
    });
  });
function Ts({ api: t = null, items: n = [] }) {
  const r = Ye(Ke.i18n),
    c = M(() => r || lt(it), [r]),
    o = M(() => c.getGroup('gantt'), [c]),
    R = qe(t, '_selected'),
    T = qe(t, 'undo'),
    x = qe(t, 'history'),
    m = qe(t, 'splitTasks'),
    E = ['undo', 'redo'],
    s = M(() => {
      const F = Mt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : Mt({
              undo: T,
              splitTasks: m,
            })
      ).map((_) => {
        let b = { ..._, disabled: !1 };
        return (
          (b.handler = _t(F, b.id) ? (N) => zt(t, N.id, null, o) : b.handler),
          b.text && (b.text = o(b.text)),
          b.menuText && (b.menuText = o(b.menuText)),
          b
        );
      });
    }, [n, t, o, T, m]),
    p = M(() => {
      const F = [];
      return (
        s.forEach((z) => {
          const _ = z.id;
          if (_ === 'add-task') F.push(z);
          else if (E.includes(_))
            E.includes(_) &&
              F.push({
                ...z,
                disabled: z.isDisabled(x),
              });
          else {
            if (!R?.length || !t) return;
            F.push({
              ...z,
              disabled:
                z.isDisabled && R.some((b) => z.isDisabled(b, t.getState())),
            });
          }
        }),
        F.filter((z, _) => {
          if (t && z.isHidden)
            return !R.some((b) => z.isHidden(b, t.getState()));
          if (z.comp === 'separator') {
            const b = F[_ + 1];
            if (!b || b.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, R, x, s]);
  return r
    ? /* @__PURE__ */ u(Et, { items: p })
    : /* @__PURE__ */ u(Ke.i18n.Provider, {
        value: c,
        children: /* @__PURE__ */ u(Et, { items: p }),
      });
}
const $s = At(function (
  {
    options: n = [],
    api: r = null,
    resolver: c = null,
    filter: o = null,
    at: R = 'point',
    children: T,
    onClick: x,
    css: m,
  },
  E,
) {
  const s = se(null),
    p = se(null),
    F = Ye(Ke.i18n),
    z = M(() => F || lt({ ...it, ...gt }), [F]),
    _ = M(() => z.getGroup('gantt'), [z]),
    b = qe(r, 'taskTypes'),
    N = qe(r, 'selected'),
    w = qe(r, '_selected'),
    B = qe(r, 'splitTasks'),
    O = qe(r, 'summary'),
    re = M(
      () => ({
        splitTasks: B,
        taskTypes: b,
        summary: O,
      }),
      [B, b, O],
    ),
    ee = M(() => Rt(re), [re]);
  le(() => {
    r &&
      (r.on('scroll-chart', () => {
        s.current && s.current.show && s.current.show();
      }),
      r.on('drag-task', () => {
        s.current && s.current.show && s.current.show();
      }));
  }, [r]);
  function $(Q) {
    return Q.map(
      (k) => (
        (k = { ...k }),
        k.text && (k.text = _(k.text)),
        k.subtext && (k.subtext = _(k.subtext)),
        k.data && (k.data = $(k.data)),
        k
      ),
    );
  }
  function we() {
    const Q = n.length ? n : Rt(re);
    return $(Q);
  }
  const ie = M(() => we(), [r, n, re, _]),
    pe = M(() => (w && w.length ? w : []), [w]),
    H = A(
      (Q, k) => {
        let X = Q ? r?.getTask(Q) : null;
        if (c) {
          const K = c(Q, k);
          X = K === !0 ? X : K;
        }
        if (X) {
          const K = Ze(k.target, 'data-segment');
          K !== null
            ? (p.current = { id: X.id, segmentIndex: K })
            : (p.current = X.id),
            (!Array.isArray(N) || !N.includes(X.id)) &&
              r &&
              r.exec &&
              r.exec('select-task', { id: X.id });
        }
        return X;
      },
      [r, c, N],
    ),
    I = A(
      (Q) => {
        const k = Q.action;
        k && (_t(ee, k.id) && zt(r, k.id, p.current, _), x && x(Q));
      },
      [r, _, x, ee],
    ),
    J = A(
      (Q, k) => {
        const X = pe.length ? pe : k ? [k] : [];
        let K = o ? X.every((Z) => o(Q, Z)) : !0;
        if (
          K &&
          (Q.isHidden &&
            (K = !X.some((Z) => Q.isHidden(Z, r.getState(), p.current))),
          Q.isDisabled)
        ) {
          const Z = X.some((ue) => Q.isDisabled(ue, r.getState(), p.current));
          Q.disabled = Z;
        }
        return K;
      },
      [o, pe, r],
    );
  Pt(E, () => ({
    show: (Q, k) => {
      s.current && s.current.show && s.current.show(Q, k);
    },
  }));
  const U = A((Q) => {
      s.current && s.current.show && s.current.show(Q);
    }, []),
    j = /* @__PURE__ */ Ie(et, {
      children: [
        /* @__PURE__ */ u(Mn, {
          filter: J,
          options: ie,
          dataKey: 'id',
          resolver: H,
          onClick: I,
          at: R,
          ref: s,
          css: m,
        }),
        /* @__PURE__ */ u('span', {
          onContextMenu: U,
          'data-menu-ignore': 'true',
          children: typeof T == 'function' ? T() : T,
        }),
      ],
    });
  if (!F && Ke.i18n?.Provider) {
    const Q = Ke.i18n.Provider;
    return /* @__PURE__ */ u(Q, { value: z, children: j });
  }
  return j;
});
function ss({ api: t, autoSave: n, onLinksChange: r }) {
  const o = Ye(Ke.i18n).getGroup('gantt'),
    R = Y(t, 'activeTask'),
    T = Y(t, '_activeTask'),
    x = Y(t, '_links'),
    m = Y(t, 'schedule'),
    E = Y(t, 'unscheduledTasks'),
    [s, p] = me();
  function F() {
    if (R) {
      const N = x
          .filter((B) => B.target == R)
          .map((B) => ({ link: B, task: t.getTask(B.source) })),
        w = x
          .filter((B) => B.source == R)
          .map((B) => ({ link: B, task: t.getTask(B.target) }));
      return [
        { title: o('Predecessors'), data: N },
        { title: o('Successors'), data: w },
      ];
    }
  }
  le(() => {
    p(F());
  }, [R, x]);
  const z = M(
    () => [
      { id: 'e2s', label: o('End-to-start') },
      { id: 's2s', label: o('Start-to-start') },
      { id: 'e2e', label: o('End-to-end') },
      { id: 's2e', label: o('Start-to-end') },
    ],
    [o],
  );
  function _(N) {
    n
      ? t.exec('delete-link', { id: N })
      : (p((w) =>
          (w || []).map((B) => ({
            ...B,
            data: B.data.filter((O) => O.link.id !== N),
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
      : (p((B) =>
          (B || []).map((O) => ({
            ...O,
            data: O.data.map((re) =>
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
              children: /* @__PURE__ */ u(Ke.fieldId.Provider, {
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
                                      disabled: E && T?.unscheduled,
                                      onChange: (O) => {
                                        O.input ||
                                          b(B.link.id, { lag: O.value });
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
                                    options: z,
                                    onChange: (O) =>
                                      b(B.link.id, { type: O.value }),
                                    children: ({ option: O }) => O.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ u('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ u('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => _(B.link.id),
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
  const { value: n, time: r, format: c, onchange: o, onChange: R, ...T } = t,
    x = R ?? o;
  function m(E) {
    const s = new Date(E.value);
    s.setHours(n.getHours()),
      s.setMinutes(n.getMinutes()),
      x && x({ value: s });
  }
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ u(sn, {
        ...T,
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
  placement: R = 'sidebar',
  bottomBar: T = !0,
  topBar: x = !0,
  autoSave: m = !0,
  focus: E = !1,
  hotkeys: s = {},
}) {
  const p = Ye(Ke.i18n),
    F = M(() => p || lt({ ...it, ...gt }), [p]),
    z = M(() => F.getGroup('gantt'), [F]),
    _ = F.getRaw(),
    b = M(() => {
      const l = _.gantt?.dateFormat || _.formats?.dateFormat;
      return ot(l, _.calendar);
    }, [_]),
    N = M(() => {
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
    [w, B] = me(!1),
    O = M(() => (w ? 'wx-full-screen' : ''), [w]),
    re = A((l) => {
      B(l);
    }, []);
  le(() => {
    const l = Ot(re);
    return (
      l.observe(),
      () => {
        l.disconnect();
      }
    );
  }, [re]);
  const ee = Y(t, '_activeTask'),
    $ = Y(t, 'activeTask'),
    we = Y(t, 'unscheduledTasks'),
    ie = Y(t, 'summary'),
    pe = Y(t, 'links'),
    H = Y(t, 'splitTasks'),
    I = M(() => H && $?.segmentIndex, [H, $]),
    J = M(() => I || I === 0, [I]),
    U = Y(t, 'taskTypes'),
    j = M(
      () => vn({ unscheduledTasks: we, summary: ie, taskTypes: U }),
      [we, ie, U],
    ),
    Q = Y(t, 'undo'),
    [k, X] = me({}),
    [K, Z] = me(null),
    [ue, De] = me(),
    [be, Ae] = me(null),
    Ne = M(() => {
      if (!ee) return null;
      let l;
      if (
        (J && ee.segments ? (l = { ...ee.segments[I] }) : (l = { ...ee }), o)
      ) {
        let G = { parent: l.parent };
        return (
          j.forEach(({ key: W, comp: v }) => {
            if (v !== 'links') {
              const Ee = l[W];
              v === 'date' && Ee instanceof Date
                ? (G[W] = b(Ee))
                : v === 'slider' && W === 'progress'
                  ? (G[W] = `${Ee}%`)
                  : (G[W] = Ee);
            }
          }),
          G
        );
      }
      return l || null;
    }, [ee, J, I, o, j, b]);
  le(() => {
    De(Ne);
  }, [Ne]),
    le(() => {
      X({}), Ae(null), Z(null);
    }, [$]);
  function ze(l, G) {
    return l.map((W) => {
      const v = { ...W };
      if (
        (W.config && (v.config = { ...v.config }),
        v.comp === 'links' &&
          t &&
          ((v.api = t), (v.autoSave = m), (v.onLinksChange = D)),
        v.comp === 'select' && v.key === 'type')
      ) {
        const Ee = v.options ?? [];
        v.options = Ee.map((ce) => ({
          ...ce,
          label: z(ce.label),
        }));
      }
      return (
        v.comp === 'slider' &&
          v.key === 'progress' &&
          (v.labelTemplate = (Ee) => `${z(v.label)} ${Ee}%`),
        v.label && (v.label = z(v.label)),
        v.config?.placeholder &&
          (v.config.placeholder = z(v.config.placeholder)),
        G &&
          (v.isDisabled && v.isDisabled(G, t.getState())
            ? (v.disabled = !0)
            : delete v.disabled),
        v
      );
    });
  }
  const Re = M(() => {
      let l = n.length ? n : j;
      return (
        (l = ze(l, ue)),
        ue ? l.filter((G) => !G.isHidden || !G.isHidden(ue, t.getState())) : l
      );
    }, [n, j, ue, z, t, m]),
    y = M(() => Re.map((l) => l.key), [Re]);
  function D({ id: l, action: G, data: W }) {
    X((v) => ({
      ...v,
      [l]: { action: G, data: W },
    }));
  }
  const L = A(() => {
      for (let l in k)
        if (pe.byId(l)) {
          const { action: G, data: W } = k[l];
          t.exec(G, W);
        }
    }, [t, k, pe]),
    de = A(() => {
      const l = $?.id || $;
      if (J) {
        if (ee?.segments) {
          const G = ee.segments.filter((W, v) => v !== I);
          t.exec('update-task', {
            id: l,
            task: { segments: G },
          });
        }
      } else t.exec('delete-task', { id: l });
    }, [t, $, J, ee, I]),
    ne = A(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    te = A(
      (l) => {
        const { item: G, changes: W } = l;
        G.id === 'delete' && de(),
          G.id === 'save' && (W.length ? ne() : L()),
          G.comp && ne();
      },
      [t, $, m, L, de, ne],
    ),
    fe = A(
      (l, G, W) => (
        we && l.type === 'summary' && (l.unscheduled = !1),
        Gt(l, t.getState(), G),
        W || Z(!1),
        l
      ),
      [we, t],
    ),
    Pe = A(
      (l) => {
        (l = {
          ...l,
          unscheduled: we && l.unscheduled && l.type !== 'summary',
        }),
          delete l.links,
          delete l.data,
          (y.indexOf('duration') === -1 || (l.segments && !l.duration)) &&
            delete l.duration;
        const G = {
          id: $?.id || $,
          task: l,
          ...(J && { segmentIndex: I }),
        };
        m && K && (G.inProgress = K), t.exec('update-task', G), m || L();
      },
      [t, $, we, m, L, y, J, I, K],
    ),
    _e = A(
      (l) => {
        let { update: G, key: W, input: v } = l;
        if ((v && Z(!0), (l.update = fe({ ...G }, W, v)), !m)) De(l.update);
        else if (!be && !v) {
          const Ee = Re.find((ke) => ke.key === W),
            ce = G[W];
          (!Ee.validation || Ee.validation(ce)) &&
            (!Ee.required || ce) &&
            Pe(l.update);
        }
      },
      [m, fe, be, Re, Pe],
    ),
    Te = A(
      (l) => {
        m || Pe(l.values);
      },
      [m, Pe],
    ),
    Le = A((l) => {
      Ae(l.errors);
    }, []),
    Ge = M(
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
          css: `wx-XkvqDXuw wx-gantt-editor ${O} ${r}`,
          items: Re,
          values: Ne,
          topBar: N,
          bottomBar: T,
          placement: R,
          layout: c,
          readonly: o,
          autoSave: m,
          focus: E,
          onAction: te,
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
    le(() => {
      r && r.getTable(!0).then(o);
    }, [r]),
    /* @__PURE__ */ u($n, { api: c, columns: n, children: t })
  );
};
function Rs(t) {
  const { api: n, content: r, children: c } = t,
    o = se(null),
    R = se(null),
    [T, x] = me({}),
    [m, E] = me(null),
    [s, p] = me({}),
    [F, z] = me(!1);
  function _(H) {
    for (; H; ) {
      if (H.getAttribute) {
        const I = H.getAttribute('data-tooltip-id'),
          J = H.getAttribute('data-tooltip-at'),
          U = H.getAttribute('data-tooltip');
        if (I || U) return { id: I, tooltip: U, target: H, at: J };
      }
      H = H.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  le(() => {
    const H = R.current;
    if (!F && H && s && (s.text || r)) {
      const I = H.getBoundingClientRect();
      let J = !1,
        U = s.left,
        j = s.top;
      I.right >= T.right && ((U = T.width - I.width - 5), (J = !0)),
        I.bottom >= T.bottom &&
          ((j = s.top - (I.bottom - T.bottom + 2)), (J = !0)),
        J && p((Q) => Q && { ...Q, left: U, top: j });
    }
  }, [s, T, r, F]);
  const b = se(null),
    N = se(null),
    w = 300,
    B = (H) => {
      clearTimeout(b.current),
        (b.current = setTimeout(() => {
          H();
        }, w));
    };
  function O(H) {
    let { id: I, tooltip: J, target: U, at: j } = _(H.target);
    if (!I && !J) {
      clearTimeout(b.current), (N.current = null), p(null), E(null), z(!1);
      return;
    }
    if ((J || (J = we(I)), N.current === I && s)) {
      const k = o.current,
        X = k ? k.getBoundingClientRect() : { left: 0 };
      j !== 'left' && p((K) => K && { ...K, left: H.clientX - X.left });
      return;
    }
    (N.current = I), p(null), E(null), z(!1);
    const Q = H.clientX;
    B(() => {
      I && E($(ie(I)));
      const k = U.getBoundingClientRect(),
        X = o.current,
        K = X
          ? X.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let Z, ue;
      j === 'left'
        ? ((Z = k.top + 5 - K.top), (ue = k.right + 5 - K.left))
        : ((Z = k.top + k.height - K.top), (ue = Q - K.left)),
        x(K),
        p({ top: Z, left: ue, text: J });
    });
  }
  function re(H) {
    const I = H.touches[0];
    if (!I) return;
    const { id: J, target: U } = _(H.target);
    if (!J) return;
    clearTimeout(b.current);
    const j = $(ie(J)),
      Q = j?.text || '',
      k = U.getBoundingClientRect(),
      X = o.current,
      K = X
        ? X.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    E(j),
      x(K),
      z(!0),
      p({
        top: k.top - K.top - 8,
        left: I.clientX - K.left,
        text: Q,
      });
  }
  function ee() {
    p(null), E(null), z(!1);
  }
  function $(H) {
    return n?.getTask(ie(H)) || null;
  }
  function we(H) {
    return $(H)?.text || '';
  }
  function ie(H) {
    const I = Number(H);
    return Number.isFinite(I) ? I : H;
  }
  const pe = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    F ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: O,
    onTouchStart: re,
    onTouchEnd: ee,
    onTouchMove: ee,
    children: [
      s && (s.text || r)
        ? /* @__PURE__ */ u('div', {
            className: pe,
            ref: R,
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
  Bs as registerEditorItem,
  Xs as registerScaleUnit,
  Ls as version,
};
//# sourceMappingURL=index.es.js.map
