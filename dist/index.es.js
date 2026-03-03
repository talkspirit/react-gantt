import { jsxs as Ae, jsx as a, Fragment as Ze } from 'react/jsx-runtime';
import {
  createContext as jt,
  useContext as We,
  useMemo as b,
  useState as we,
  useCallback as R,
  useRef as ce,
  useEffect as oe,
  Fragment as Qt,
  forwardRef as St,
  useImperativeHandle as Nt,
} from 'react';
import {
  context as _e,
  Button as xt,
  Field as Zt,
  Text as Jt,
  Combo as en,
  DatePicker as tn,
  TimePicker as nn,
  Locale as sn,
  RichSelect as rn,
  TwoState as on,
  Slider as ln,
  Counter as cn,
  Material as pt,
  Willow as yt,
  WillowDark as kt,
} from '@svar-ui/react-core';
import {
  locate as Oe,
  locateID as qe,
  locateAttr as an,
  dateToString as nt,
  locale as st,
} from '@svar-ui/lib-dom';
import { en as rt } from '@svar-ui/gantt-locales';
import { en as dt } from '@svar-ui/core-locales';
import { EventBusRouter as un } from '@svar-ui/lib-state';
import {
  prepareEditTask as It,
  grid as dn,
  extendDragOptions as fn,
  isSegmentMoveAllowed as hn,
  DataStore as mn,
  normalizeLinks as gn,
  normalizeZoom as wn,
  defaultColumns as xn,
  parseTaskDates as vt,
  defaultTaskTypes as pn,
  getToolbarButtons as bt,
  handleAction as Lt,
  isHandledAction as At,
  getMenuOptions as Tt,
  getEditorItems as yn,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as Es,
  defaultEditorItems as Ds,
  defaultMenuOptions as Ss,
  defaultTaskTypes as Ns,
  defaultToolbarButtons as Is,
  getEditorItems as Ls,
  getMenuOptions as As,
  getToolbarButtons as Ps,
  registerScaleUnit as Hs,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as at,
  useStore as H,
  useStoreWithCounter as ut,
  writable as kn,
  useStoreLater as Ke,
} from '@svar-ui/lib-react';
import { hotkeys as Pt } from '@svar-ui/grid-store';
import { Grid as vn, HeaderMenu as bn } from '@svar-ui/react-grid';
import { flushSync as Tn } from 'react-dom';
import { Toolbar as Ct } from '@svar-ui/react-toolbar';
import { ContextMenu as Cn } from '@svar-ui/react-menu';
import { Editor as $n, registerEditorItem as Ue } from '@svar-ui/react-editor';
import { registerEditorItem as zs } from '@svar-ui/react-editor';
const Ye = jt(null);
function Be(t) {
  const n = t.getAttribute('data-id'),
    s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function Mn(t, n, s) {
  const o = t.getBoundingClientRect(),
    r = n.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: o.top - r.top,
    left: o.left - r.left,
    dt: o.bottom - s.clientY,
    db: s.clientY - o.top,
  };
}
function $t(t) {
  return t && t.getAttribute('data-context-id');
}
const Mt = 5;
function Rn(t, n) {
  let s, o, r, E, y, x, g, l, h;
  function V($) {
    (E = $.clientX),
      (y = $.clientY),
      (x = {
        ...Mn(s, t, $),
        y: n.getTask(r).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function X($) {
    (s = Oe($)),
      $t(s) &&
        ((r = Be(s)),
        (h = setTimeout(() => {
          (l = !0), n && n.touchStart && n.touchStart(), V($.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', M),
        t.addEventListener('contextmenu', T),
        window.addEventListener('touchend', Q));
  }
  function T($) {
    if (l || h) return $.preventDefault(), !1;
  }
  function C($) {
    $.which === 1 &&
      ((s = Oe($)),
      $t(s) &&
        ((r = Be(s)),
        t.addEventListener('mousemove', j),
        window.addEventListener('mouseup', v),
        V($)));
  }
  function d($) {
    t.removeEventListener('mousemove', j),
      t.removeEventListener('touchmove', M),
      document.body.removeEventListener('mouseup', v),
      document.body.removeEventListener('touchend', Q),
      (document.body.style.userSelect = ''),
      $ &&
        (t.removeEventListener('mousedown', C),
        t.removeEventListener('touchstart', X));
  }
  function K($) {
    const Z = $.clientX - E,
      ae = $.clientY - y;
    if (!o) {
      if (
        (Math.abs(Z) < Mt && Math.abs(ae) < Mt) ||
        (n && n.start && n.start({ id: r, e: $ }) === !1)
      )
        return;
      (o = s.cloneNode(!0)),
        (o.style.pointerEvents = 'none'),
        o.classList.add('wx-reorder-task'),
        (o.style.position = 'absolute'),
        (o.style.left = x.left + 'px'),
        (o.style.top = x.top + 'px'),
        (s.style.visibility = 'hidden'),
        s.parentNode.insertBefore(o, s);
    }
    if (o) {
      const le = Math.round(Math.max(0, x.top + ae));
      if (n && n.move && n.move({ id: r, top: le, detail: g }) === !1) return;
      const J = n.getTask(r),
        ue = J.$y;
      if (!x.start && x.y == ue) return I();
      (x.start = !0), (x.y = J.$y - 4), (o.style.top = le + 'px');
      const F = document.elementFromPoint($.clientX, $.clientY),
        de = Oe(F);
      if (de && de !== s) {
        const ne = Be(de),
          P = de.getBoundingClientRect(),
          N = P.top + P.height / 2,
          re = $.clientY + x.db > N && de.nextElementSibling !== s,
          ee = $.clientY - x.dt < N && de.previousElementSibling !== s;
        g?.after == ne || g?.before == ne
          ? (g = null)
          : re
            ? (g = { id: r, after: ne })
            : ee && (g = { id: r, before: ne });
      }
    }
  }
  function j($) {
    K($);
  }
  function M($) {
    l
      ? ($.preventDefault(), K($.touches[0]))
      : h && (clearTimeout(h), (h = null));
  }
  function Q() {
    (l = null), h && (clearTimeout(h), (h = null)), I();
  }
  function v() {
    I();
  }
  function I() {
    s && (s.style.visibility = ''),
      o &&
        (o.parentNode.removeChild(o),
        n && n.end && n.end({ id: r, top: x.top })),
      (r = s = o = x = g = null),
      d();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', C),
    t.addEventListener('touchstart', X),
    {
      destroy() {
        d(!0);
      },
    }
  );
}
function En({ row: t, column: n }) {
  const s = We(Ye);
  function o(E, y) {
    return {
      justifyContent: y.align,
      paddingLeft: `${(E.$level - 1) * 20}px`,
    };
  }
  const r = n && n._cell;
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-pqc08MHU wx-content',
    style: o(t, n),
    children: [
      t.data || t.lazy
        ? /* @__PURE__ */ a('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ a('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ a('div', {
        className: 'wx-pqc08MHU wx-text',
        children: r
          ? /* @__PURE__ */ a(r, { row: t, column: n, api: s })
          : t.text,
      }),
    ],
  });
}
function Rt({ column: t, cell: n }) {
  const s = b(() => t.id, [t?.id]);
  return n || t.id == 'add-task'
    ? /* @__PURE__ */ a('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ a('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': s,
        }),
      })
    : null;
}
function Dn(t) {
  const {
      readonly: n,
      compactMode: s,
      width: o = 0,
      display: r = 'all',
      columnWidth: E = 0,
      onTableAPIChange: y,
      multiTaskRows: x = !1,
      rowMapping: g = null,
    } = t,
    [l, h] = at(E),
    [V, X] = we(),
    T = We(_e.i18n),
    C = b(() => T.getGroup('gantt'), [T]),
    d = We(Ye),
    K = H(d, 'scrollTop'),
    j = H(d, 'cellHeight'),
    M = H(d, '_scrollTask'),
    Q = H(d, '_selected'),
    v = H(d, 'area'),
    I = H(d, '_tasks'),
    $ = H(d, '_scales'),
    Z = H(d, 'columns'),
    ae = H(d, '_sort'),
    le = H(d, 'calendar'),
    J = H(d, 'durationUnit'),
    ue = H(d, 'splitTasks'),
    [F, de] = we(null),
    ne = b(
      () => (!I || !v ? [] : x && g ? I : I.slice(v.start, v.end)),
      [I, v, x, g],
    ),
    P = R(
      (i, w) => {
        if (w === 'add-task')
          d.exec(w, {
            target: i,
            task: { text: C('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (w === 'open-task') {
          const D = ne.find((_) => _.id === i);
          (D?.data || D?.lazy) && d.exec(w, { id: i, mode: !D.open });
        }
      },
      [ne],
    ),
    N = R(
      (i) => {
        const w = qe(i),
          D = i.target.dataset.action;
        D && i.preventDefault(),
          w
            ? D === 'add-task' || D === 'open-task'
              ? P(w, D)
              : d.exec('select-task', {
                  id: w,
                  toggle: i.ctrlKey || i.metaKey,
                  range: i.shiftKey,
                  show: !0,
                })
            : D === 'add-task' && P(null, D);
      },
      [d, P],
    ),
    re = ce(null),
    ee = ce(null),
    [ie, xe] = we(0),
    [ye, $e] = we(!1);
  oe(() => {
    const i = ee.current;
    if (!i || typeof ResizeObserver > 'u') return;
    const w = () => xe(i.clientWidth);
    w();
    const D = new ResizeObserver(w);
    return D.observe(i), () => D.disconnect();
  }, []);
  const Pe = ce(null),
    Ee = R(
      (i) => {
        const w = i.id,
          { before: D, after: _ } = i,
          ge = i.onMove;
        let pe = D || _,
          Re = D ? 'before' : 'after';
        if (ge) {
          if (Re === 'after') {
            const ze = d.getTask(pe);
            ze.data?.length &&
              ze.open &&
              ((Re = 'before'), (pe = ze.data[0].id));
          }
          Pe.current = { id: w, [Re]: pe };
        } else Pe.current = null;
        d.exec('move-task', {
          id: w,
          mode: Re,
          target: pe,
          inProgress: ge,
        });
      },
      [d],
    ),
    k = b(() => v?.from ?? 0, [v]),
    W = b(() => $?.height ?? 0, [$]),
    z = b(
      () => (!s && r !== 'grid' ? (l ?? 0) > (o ?? 0) : (l ?? 0) > (ie ?? 0)),
      [s, r, l, o, ie],
    ),
    L = b(() => {
      const i = {};
      return (
        (z && r === 'all') || (r === 'grid' && z)
          ? (i.width = l)
          : r === 'grid' && (i.width = '100%'),
        i
      );
    }, [z, r, l]),
    me = b(
      () => (F && !ne.find((i) => i.id === F.id) ? [...ne, F] : ne),
      [ne, F],
    ),
    Y = b(() => {
      let i = (Z || []).map((_) => {
        _ = { ..._ };
        const ge = _.header;
        if (typeof ge == 'object') {
          const pe = ge.text && C(ge.text);
          _.header = { ...ge, text: pe };
        } else _.header = C(ge);
        if (_.cell && _.id !== 'text' && _.id !== 'add-task') {
          const pe = _.cell;
          _.cell = (Re) => /* @__PURE__ */ a(pe, { ...Re, api: d });
        }
        return _;
      });
      const w = i.findIndex((_) => _.id === 'text'),
        D = i.findIndex((_) => _.id === 'add-task');
      if (
        (w !== -1 && (i[w].cell && (i[w]._cell = i[w].cell), (i[w].cell = En)),
        D !== -1)
      ) {
        i[D].cell = i[D].cell || Rt;
        const _ = i[D].header;
        if (
          (typeof _ != 'object' && (i[D].header = { text: _ }),
          (i[D].header.cell = _.cell || Rt),
          n)
        )
          i.splice(D, 1);
        else if (s) {
          const [ge] = i.splice(D, 1);
          i.unshift(ge);
        }
      }
      return i.length > 0 && (i[i.length - 1].resize = !1), i;
    }, [Z, C, n, s, d]),
    be = b(
      () =>
        r === 'all'
          ? `${o}px`
          : r === 'grid'
            ? 'calc(100% - 4px)'
            : Y.find((i) => i.id === 'add-task')
              ? '50px'
              : '0',
      [r, o, Y],
    ),
    ve = b(() => {
      if (me && ae?.length) {
        const i = {};
        return (
          ae.forEach(({ key: w, order: D }, _) => {
            i[w] = {
              order: D,
              ...(ae.length > 1 && { index: _ }),
            };
          }),
          i
        );
      }
      return {};
    }, [me, ae]),
    Me = R(() => Y.some((i) => i.flexgrow && !i.hidden), []),
    A = b(() => Me(), [Me, ye]),
    U = b(() => {
      let i = r === 'chart' ? Y.filter((D) => D.id === 'add-task') : Y;
      const w = r === 'all' ? o : ie;
      if (!A) {
        let D = l,
          _ = !1;
        if (Y.some((ge) => ge.$width)) {
          let ge = 0;
          (D = Y.reduce(
            (pe, Re) => (
              Re.hidden || ((ge += Re.width), (pe += Re.$width || Re.width)), pe
            ),
            0,
          )),
            ge > D && D > w && (_ = !0);
        }
        if (_ || D < w) {
          let ge = 1;
          return (
            _ || (ge = (w - 50) / (D - 50 || 1)),
            i.map(
              (pe) => (
                pe.id !== 'add-task' &&
                  !pe.hidden &&
                  (pe.$width || (pe.$width = pe.width),
                  (pe.width = pe.$width * ge)),
                pe
              ),
            )
          );
        }
      }
      return i;
    }, [r, Y, A, l, o, ie]),
    ke = R(
      (i) => {
        if (!Me()) {
          const w = U.reduce(
            (D, _) => (
              i && _.$width && (_.$width = _.width),
              D + (_.hidden ? 0 : _.width)
            ),
            0,
          );
          w !== l && h(w);
        }
        $e(!0), $e(!1);
      },
      [Me, U, l, h],
    ),
    De = R(() => {
      Y.filter((w) => w.flexgrow && !w.hidden).length === 1 &&
        Y.forEach((w) => {
          w.$width && !w.flexgrow && !w.hidden && (w.width = w.$width);
        });
    }, []),
    He = R(
      (i) => {
        if (!n) {
          const w = qe(i),
            D = an(i, 'data-col-id');
          !(D && Y.find((ge) => ge.id == D))?.editor &&
            w &&
            d.exec('show-editor', { id: w });
        }
      },
      [d, n],
      // cols is defined later; relies on latest value at call time
    ),
    p = b(() => (Array.isArray(Q) ? Q.map((i) => i.id) : []), [Q]),
    G = R(() => {
      if (re.current && me !== null) {
        const i = re.current.querySelector('.wx-body');
        i && (i.style.top = -((K ?? 0) - (k ?? 0)) + 'px');
      }
      ee.current && (ee.current.scrollTop = 0);
    }, [me, K, k]);
  oe(() => {
    re.current && G();
  }, [K, k, G]),
    oe(() => {
      const i = re.current;
      if (!i) return;
      const w = i.querySelector('.wx-table-box .wx-body');
      if (!w || typeof ResizeObserver > 'u') return;
      const D = new ResizeObserver(() => {
        G();
      });
      return (
        D.observe(w),
        () => {
          D.disconnect();
        }
      );
    }, [U, L, r, be, me, G]),
    oe(() => {
      if (!M || !V) return;
      const { id: i } = M,
        w = V.getState().focusCell;
      w &&
        w.row !== i &&
        re.current &&
        re.current.contains(document.activeElement) &&
        V.exec('focus-cell', {
          row: i,
          column: w.column,
        });
    }, [M, V]);
  const se = R(
      ({ id: i }) => {
        if (n) return !1;
        d.getTask(i).open && d.exec('open-task', { id: i, mode: !1 });
        const w = d.getState()._tasks.find((D) => D.id === i);
        if ((de(w || null), !w)) return !1;
      },
      [d, n],
    ),
    B = R(
      ({ id: i, top: w }) => {
        Pe.current
          ? Ee({ ...Pe.current, onMove: !1 })
          : d.exec('drag-task', {
              id: i,
              top: w + (k ?? 0),
              inProgress: !1,
            }),
          de(null);
      },
      [d, Ee, k],
    ),
    q = R(
      ({ id: i, top: w, detail: D }) => {
        D && Ee({ ...D, onMove: !0 }),
          d.exec('drag-task', {
            id: i,
            top: w + (k ?? 0),
            inProgress: !0,
          });
      },
      [d, Ee, k],
    );
  oe(() => {
    const i = re.current;
    return i
      ? Rn(i, {
          start: se,
          end: B,
          move: q,
          getTask: d.getTask,
        }).destroy
      : void 0;
  }, [d, se, B, q]);
  const fe = R(
      (i) => {
        const { key: w, isInput: D } = i;
        if (!D && (w === 'arrowup' || w === 'arrowdown'))
          return (i.eventSource = 'grid'), d.exec('hotkey', i), !1;
        if (w === 'enter') {
          const _ = V?.getState().focusCell;
          if (_) {
            const { row: ge, column: pe } = _;
            pe === 'add-task'
              ? P(ge, 'add-task')
              : pe === 'text' && P(ge, 'open-task');
          }
        }
      },
      [d, P, V],
    ),
    he = ce(null),
    Se = () => {
      he.current = {
        setTableAPI: X,
        handleHotkey: fe,
        sortVal: ae,
        api: d,
        adjustColumns: De,
        setColumnWidth: ke,
        tasks: ne,
        calendarVal: le,
        durationUnitVal: J,
        splitTasksVal: ue,
        onTableAPIChange: y,
      };
    };
  Se(),
    oe(() => {
      Se();
    }, [X, fe, ae, d, De, ke, ne, le, J, ue, y]);
  const Le = R((i) => {
    X(i),
      i.intercept('hotkey', (w) => he.current.handleHotkey(w)),
      i.intercept('scroll', () => !1),
      i.intercept('select-row', () => !1),
      i.intercept('sort-rows', (w) => {
        const D = he.current.sortVal,
          { key: _, add: ge } = w,
          pe = D ? D.find((ze) => ze.key === _) : null;
        let Re = 'asc';
        return (
          pe && (Re = !pe || pe.order === 'asc' ? 'desc' : 'asc'),
          d.exec('sort-tasks', {
            key: _,
            order: Re,
            add: ge,
          }),
          !1
        );
      }),
      i.on('resize-column', () => {
        he.current.setColumnWidth(!0);
      }),
      i.on('hide-column', (w) => {
        w.mode || he.current.adjustColumns(), he.current.setColumnWidth();
      }),
      i.intercept('update-cell', (w) => {
        const { id: D, column: _, value: ge } = w,
          pe = he.current.tasks.find((Re) => Re.id === D);
        if (pe) {
          const Re = { ...pe };
          let ze = ge;
          ze && !isNaN(ze) && !(ze instanceof Date) && (ze *= 1),
            (Re[_] = ze),
            It(
              Re,
              {
                calendar: he.current.calendarVal,
                durationUnit: he.current.durationUnitVal,
                splitTasks: he.current.splitTasksVal,
              },
              _,
            ),
            d.exec('update-task', {
              id: D,
              task: Re,
            });
        }
        return !1;
      }),
      y && y(i);
  }, []);
  return /* @__PURE__ */ a('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${be}` },
    ref: ee,
    children: /* @__PURE__ */ a('div', {
      ref: re,
      style: L,
      className: 'wx-rHj6070p wx-table',
      onClick: N,
      onDoubleClick: He,
      children: /* @__PURE__ */ a(vn, {
        init: Le,
        sizes: {
          rowHeight: j,
          headerHeight: (W ?? 0) - 1,
        },
        rowStyle: (i) =>
          i.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (i) =>
          `wx-rHj6070p wx-text-${i.align}${i.id === 'add-task' ? ' wx-action' : ''}`,
        data: me,
        columns: U,
        selectedRows: [...p],
        sortMarks: ve,
      }),
    }),
  });
}
function Sn({ borders: t = '' }) {
  const n = We(Ye),
    s = H(n, 'cellWidth'),
    o = H(n, 'cellHeight'),
    r = ce(null),
    [E, y] = we('#e4e4e4');
  oe(() => {
    if (typeof getComputedStyle < 'u' && r.current) {
      const g = getComputedStyle(r.current).getPropertyValue(
        '--wx-gantt-border',
      );
      y(g ? g.substring(g.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const x = {
    width: '100%',
    height: '100%',
    background: s != null && o != null ? `url(${dn(s, o, E, t)})` : void 0,
    position: 'absolute',
  };
  return /* @__PURE__ */ a('div', { ref: r, style: x });
}
function Nn({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const o = We(Ye),
    r = H(o, '_links'),
    E = H(o, 'criticalPath'),
    y = ce(null),
    x = R(
      (g) => {
        const l = g?.target?.classList;
        !l?.contains('wx-line') && !l?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    oe(() => {
      if (!s && n && y.current) {
        const g = (l) => {
          y.current && !y.current.contains(l.target) && x(l);
        };
        return (
          document.addEventListener('click', g),
          () => {
            document.removeEventListener('click', g);
          }
        );
      }
    }, [s, n, x]),
    /* @__PURE__ */ Ae('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (r || []).map((g) => {
          const l =
            'wx-dkx3NwEn wx-line' +
            (E && g.$critical ? ' wx-critical' : '') +
            (s ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ a(
            'polyline',
            {
              className: l,
              points: g.$p,
              onClick: () => !s && t(g.id),
              'data-link-id': g.id,
            },
            g.id,
          );
        }),
        !s &&
          n &&
          /* @__PURE__ */ a('polyline', {
            ref: y,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: n.$p,
          }),
      ],
    })
  );
}
function In(t) {
  const { task: n, type: s } = t;
  function o(E) {
    const y = n.segments[E];
    return {
      left: `${y.$x}px`,
      top: '0px',
      width: `${y.$w}px`,
      height: '100%',
    };
  }
  function r(E) {
    if (!n.progress) return 0;
    const y = (n.duration * n.progress) / 100,
      x = n.segments;
    let g = 0,
      l = 0,
      h = null;
    do {
      const V = x[l];
      l === E &&
        (g > y ? (h = 0) : (h = Math.min((y - g) / V.duration, 1) * 100)),
        (g += V.duration),
        l++;
    } while (h === null && l < x.length);
    return h || 0;
  }
  return /* @__PURE__ */ a('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((E, y) =>
      /* @__PURE__ */ Ae(
        'div',
        {
          className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
          'data-segment': y,
          style: o(y),
          children: [
            n.progress
              ? /* @__PURE__ */ a('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ a('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${r(y)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ a('div', {
              className: 'wx-content',
              children: E.text || '',
            }),
          ],
        },
        y,
      ),
    ),
  });
}
let it = [],
  ct = null,
  Et = null;
const Ln = (t, n, s, o) => t < o && n > s,
  Dt = (t, n) => {
    if (!n || !n.start) return null;
    const { start: s, lengthUnitWidth: o, lengthUnit: r } = n,
      E = 864e5,
      y =
        r === 'week'
          ? 7
          : r === 'month'
            ? 30
            : r === 'quarter'
              ? 91
              : r === 'year'
                ? 365
                : 1,
      x = Math.floor(t / o),
      g = new Date(s.getTime() + x * y * E);
    return g.setUTCHours(0, 0, 0, 0), g;
  },
  An = (t, n, s) => {
    if (!s || !t || !n) return 0;
    const { lengthUnit: o } = s,
      y =
        (o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1) * 864e5;
    return Math.round((t.getTime() - n.getTime()) / y);
  },
  Pn = (t, n, s) => {
    if (!s || !t) return t;
    const { lengthUnit: o } = s,
      y =
        (o === 'week'
          ? 7
          : o === 'month'
            ? 30
            : o === 'quarter'
              ? 91
              : o === 'year'
                ? 365
                : 1) * 864e5,
      x = new Date(t.getTime() + n * y);
    return x.setUTCHours(0, 0, 0, 0), x;
  };
function Hn(t) {
  const {
      readonly: n,
      taskTemplate: s,
      multiTaskRows: o = !1,
      rowMapping: r = null,
      allowTaskIntersection: E = !0,
      summaryBarCounts: y = !1,
      marqueeSelect: x = !1,
      copyPaste: g = !1,
    } = t,
    l = We(Ye),
    [h, V] = ut(l, '_tasks'),
    [X, T] = ut(l, '_links'),
    C = H(l, 'area'),
    d = H(l, '_scales'),
    K = H(l, 'taskTypes'),
    j = H(l, 'baselines'),
    M = H(l, '_selected'),
    Q = H(l, '_scrollTask'),
    v = H(l, 'criticalPath'),
    I = H(l, 'tasks'),
    $ = H(l, 'schedule'),
    Z = H(l, 'splitTasks'),
    ae = H(l, 'summary'),
    le = b(() => {
      if (!C || !Array.isArray(h)) return [];
      const e = C.start ?? 0,
        c = C.end ?? 0;
      return o && r
        ? h.map((f) => ({ ...f }))
        : h.slice(e, c).map((f) => ({ ...f }));
    }, [V, C, o, r]),
    J = H(l, 'cellHeight'),
    ue = b(() => {
      if (!o || !r || !le.length) return le;
      const e = /* @__PURE__ */ new Map(),
        c = [];
      return (
        h.forEach((f) => {
          const u = r.taskRows.get(f.id) ?? f.id;
          e.has(u) || (e.set(u, c.length), c.push(u));
        }),
        le.map((f) => {
          const u = r.taskRows.get(f.id) ?? f.id,
            m = e.get(u) ?? 0;
          return {
            ...f,
            $y: m * J,
            $y_base: f.$y_base !== void 0 ? m * J : void 0,
          };
        })
      );
    }, [le, o, r, h, J]),
    F = b(() => d.lengthUnitWidth, [d]),
    de = b(() => d.lengthUnit || 'day', [d]),
    ne = b(() => {
      const e = /* @__PURE__ */ new Set();
      if (E || !o || !r) return e;
      const c = /* @__PURE__ */ new Map();
      return (
        h.forEach((f) => {
          if (f.type === 'summary' || f.type === 'milestone') return;
          const u = r.taskRows.get(f.id) ?? f.id;
          c.has(u) || c.set(u, []), c.get(u).push(f);
        }),
        c.forEach((f) => {
          if (!(f.length < 2))
            for (let u = 0; u < f.length; u++)
              for (let m = u + 1; m < f.length; m++) {
                const S = f[u],
                  O = f[m];
                Ln(S.$x, S.$x + S.$w, O.$x, O.$x + O.$w) &&
                  (e.add(S.id), e.add(O.id));
              }
        }),
        e
      );
    }, [E, o, r, h, V]),
    P = b(() => {
      if (!y || !h?.length || !F) return null;
      const e = /* @__PURE__ */ new Map(),
        c = /* @__PURE__ */ new Set();
      h.forEach((u) => {
        u.type === 'summary' && c.add(u.id),
          u.parent &&
            u.parent !== 0 &&
            u.type !== 'summary' &&
            (e.has(u.parent) || e.set(u.parent, []), e.get(u.parent).push(u));
      });
      const f = /* @__PURE__ */ new Map();
      return (
        c.forEach((u) => {
          const m = e.get(u);
          if (!m?.length) return;
          const S = /* @__PURE__ */ new Map();
          m.forEach((O) => {
            if (O.$x == null || O.$w == null) return;
            const te = Math.floor(O.$x / F),
              Ce = Math.ceil((O.$x + O.$w) / F);
            for (let Te = te; Te < Ce; Te++) S.set(Te, (S.get(Te) || 0) + 1);
          }),
            S.size > 0 && f.set(u, S);
        }),
        f
      );
    }, [y, h, F]),
    [N, re] = we(null),
    ee = ce(null),
    [ie, xe] = we(null),
    [ye, $e] = we(null),
    [Pe, Ee] = we(null),
    k = ce(null);
  k.current = Pe;
  const W = ce(0),
    z = ce(!1),
    [L, me] = we(void 0),
    [Y, be] = we(null),
    ve = ce(null),
    [Me, A] = we(null),
    U = b(
      () =>
        Me && {
          ...X.find((e) => e.id === Me),
        },
      [Me, T],
    ),
    [ke, De] = we(void 0),
    He = ce(null),
    [p, G] = we(0),
    se = ce(null),
    B = b(() => {
      const e = se.current;
      return !!(M.length && e && e.contains(document.activeElement));
    }, [M, se.current]),
    q = b(() => B && M[M.length - 1]?.id, [B, M]);
  oe(() => {
    if (Q && B && Q) {
      const { id: e } = Q,
        c = se.current?.querySelector(`.wx-bar[data-id='${e}']`);
      c && c.focus({ preventScroll: !0 });
    }
  }, [Q]),
    oe(() => {
      const e = se.current;
      if (e && (G(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const c = new ResizeObserver((f) => {
          f[0] && G(f[0].contentRect.width);
        });
        return c.observe(e), () => c.disconnect();
      }
    }, [se.current]);
  const fe = R(() => {
      document.body.style.userSelect = 'none';
    }, []),
    he = R(() => {
      document.body.style.userSelect = '';
    }, []),
    Se = b(() => {
      if (!o || !r || !h?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        c = /* @__PURE__ */ new Map(),
        f = [];
      return (
        h.forEach((u) => {
          const m = r.taskRows.get(u.id) ?? u.id;
          c.has(m) || (c.set(m, f.length), f.push(m));
        }),
        h.forEach((u) => {
          const m = r.taskRows.get(u.id) ?? u.id,
            S = c.get(m) ?? 0;
          e.set(u.id, S * J);
        }),
        e
      );
    }, [h, o, r, J]),
    Le = b(() => {
      if (!o || !r || !h?.length) return /* @__PURE__ */ new Map();
      const e = /* @__PURE__ */ new Map(),
        c = /* @__PURE__ */ new Map(),
        f = [];
      return (
        h.forEach((u) => {
          const m = r.taskRows.get(u.id) ?? u.id;
          c.has(m) || (c.set(m, f.length), f.push(m));
        }),
        h.forEach((u) => {
          const m = u.row ?? u.id;
          if (!e.has(m)) {
            const S = r.taskRows.get(u.id) ?? u.id,
              O = c.get(S) ?? 0;
            e.set(m, O * J);
          }
        }),
        e
      );
    }, [h, o, r, J]),
    i = R(
      (e) => {
        if (!se.current) return [];
        const c = Math.min(e.startX, e.currentX),
          f = Math.max(e.startX, e.currentX),
          u = Math.min(e.startY, e.currentY),
          m = Math.max(e.startY, e.currentY);
        return h.filter((S) => {
          const O = S.$x,
            te = S.$x + S.$w,
            Te = Se.get(S.id) ?? S.$y,
            Ne = Te + S.$h;
          return O < f && te > c && Te < m && Ne > u;
        });
      },
      [h, Se],
    ),
    w = R(() => {
      if (!g) return;
      const e = l.getState()._selected;
      if (!e || !e.length) return;
      const c = 864e5,
        f = e
          .map((te) => {
            if (!l.getTask(te.id)) return null;
            const Te = h.find((Ut) => Ut.id === te.id);
            if (!Te) return null;
            const {
                $x: Ne,
                $y: Ie,
                $h: Ge,
                $w: je,
                $skip: Xe,
                $level: Qe,
                ...Fe
              } = Te,
              Ft =
                Te.end && Te.start
                  ? Math.round((Te.end.getTime() - Te.start.getTime()) / c)
                  : 0,
              qt = Te.start ? (Te.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...Fe,
              _durationDays: Ft,
              _startDayOfWeek: qt,
              _originalWidth: je,
              _originalHeight: Ge,
            };
          })
          .filter(Boolean);
      if (!f.length) return;
      const m = f[0].parent,
        S = f.filter((te) => te.parent === m);
      if (S.length === 0) return;
      const O = S.reduce(
        (te, Ce) => (Ce.start && (!te || Ce.start < te) ? Ce.start : te),
        null,
      );
      (it = S.map((te) => ({
        ...te,
        _startCellOffset: An(te.start, O, d),
      }))),
        (Et = m),
        (ct = O);
    }, [g, l, h, d]),
    D = R(
      (e, c, f) => {
        if (!c.length || !e || f == null) return;
        const u = 864e5,
          m = l.getHistory();
        m?.startBatch();
        const S = new Date(e);
        S.setUTCHours(0, 0, 0, 0),
          c.forEach((O, te) => {
            const Ce = `task-${Date.now()}-${te}`,
              Te = Pn(S, O._startCellOffset || 0, d),
              Ne = new Date(Te.getTime() + (O._startDayOfWeek || 0) * u);
            Ne.setUTCHours(0, 0, 0, 0);
            const Ie = new Date(Ne.getTime() + (O._durationDays || 7) * u);
            Ie.setUTCHours(0, 0, 0, 0),
              l.exec('add-task', {
                task: {
                  id: Ce,
                  text: O.text,
                  start: Ne,
                  end: Ie,
                  type: O.type || 'task',
                  parent: f,
                  row: O.row,
                },
                target: f,
                mode: 'child',
                skipUndo: te > 0,
              });
          }),
          m?.endBatch();
      },
      [l, d],
    );
  oe(
    () =>
      g
        ? l.intercept('hotkey', (c) => {
            if (c.key === 'ctrl+c' || c.key === 'meta+c') return w(), !1;
            if (c.key === 'ctrl+v' || c.key === 'meta+v')
              return (
                !it.length ||
                  !ct ||
                  $e({
                    tasks: it,
                    baseDate: ct,
                    parent: Et,
                    currentX: W.current,
                  }),
                !1
              );
          })
        : void 0,
    [g, l, w],
  ),
    oe(() => {
      if (!ye) return;
      const e = (c) => {
        c.key === 'Escape' &&
          (c.preventDefault(), c.stopPropagation(), $e(null));
      };
      return (
        document.addEventListener('keydown', e, !0),
        () => document.removeEventListener('keydown', e, !0)
      );
    }, [ye]);
  const _ = R(
      (e, c, f) => {
        if (
          c.target.classList.contains('wx-line') ||
          (f || (f = l.getTask(Be(e))),
          f.type === 'milestone' || f.type === 'summary')
        )
          return '';
        const u = Oe(c, 'data-segment');
        u && (e = u);
        const { left: m, width: S } = e.getBoundingClientRect(),
          O = (c.clientX - m) / S;
        let te = 0.2 / (S > 200 ? S / 200 : 1);
        return O < te ? 'start' : O > 1 - te ? 'end' : '';
      },
      [l],
    ),
    ge = R(
      (e, c) => {
        const { clientX: f } = c,
          u = Be(e),
          m = l.getTask(u),
          S = c.target.classList;
        if (
          !c.target.closest('.wx-delete-button') &&
          !c.target.closest('[data-interactive]') &&
          !n
        ) {
          if (S.contains('wx-progress-marker')) {
            const { progress: O } = l.getTask(u);
            (ve.current = {
              id: u,
              x: f,
              progress: O,
              dx: 0,
              node: e,
              marker: c.target,
            }),
              c.target.classList.add('wx-progress-in-drag');
          } else {
            const O = _(e, c, m) || 'move',
              te = {
                id: u,
                mode: O,
                x: f,
                dx: 0,
                l: m.$x,
                w: m.$w,
              };
            if (Z && m.segments?.length) {
              const Ce = Oe(c, 'data-segment');
              Ce && ((te.segmentIndex = Ce.dataset.segment * 1), fn(m, te));
            }
            be(te);
          }
          fe();
        }
      },
      [l, n, _, fe, Z],
    ),
    pe = R(
      (e) => {
        if (e.button !== 0 || ye) return;
        const c = Oe(e);
        if (!c && x && !n) {
          const f = se.current;
          if (!f) return;
          const u = f.getBoundingClientRect(),
            m = e.clientX - u.left,
            S = e.clientY - u.top;
          if (g) {
            const te = Dt(m, d);
            te && ((k.current = te), Ee(te));
          }
          const O = {
            startX: m,
            startY: S,
            currentX: m,
            currentY: S,
            ctrlKey: e.ctrlKey || e.metaKey,
          };
          re(O), (ee.current = O), fe();
          return;
        }
        if (c && x && !n && M.length > 1) {
          const f = Be(c);
          if (M.some((m) => m.id === f)) {
            xe({
              startX: e.clientX,
              ids: M.map((m) => m.id),
              tasks: M.map((m) => {
                const S = l.getTask(m.id);
                return {
                  id: m.id,
                  start: S.start,
                  end: S.end,
                  $x: S.$x,
                  $w: S.$w,
                };
              }),
            }),
              fe();
            return;
          }
        }
        c && ge(c, e);
      },
      [ge, x, g, n, ye, d, M, l, fe],
    ),
    Re = R(
      (e) => {
        const c = Oe(e);
        c &&
          (He.current = setTimeout(() => {
            De(!0), ge(c, e.touches[0]);
          }, 300));
      },
      [ge],
    ),
    ze = R((e) => {
      A(e);
    }, []),
    Ve = R(() => {
      const e = ee.current;
      if (e) {
        const c = i(e);
        e.ctrlKey
          ? c.forEach((f) => {
              l.exec('select-task', { id: f.id, toggle: !0, marquee: !0 });
            })
          : (M.length > 0 && l.exec('select-task', { id: null, marquee: !0 }),
            c.forEach((f, u) => {
              l.exec('select-task', {
                id: f.id,
                toggle: u > 0,
                marquee: !0,
              });
            })),
          re(null),
          (ee.current = null),
          he(),
          (z.current = !0);
        return;
      }
      if (ie) {
        const { ids: c, tasks: f, startX: u } = ie;
        xe(null), he(), (z.current = !0);
        return;
      }
      if (ve.current) {
        const { dx: c, id: f, marker: u, value: m } = ve.current;
        (ve.current = null),
          typeof m < 'u' &&
            c &&
            l.exec('update-task', {
              id: f,
              task: { progress: m },
              inProgress: !1,
            }),
          u.classList.remove('wx-progress-in-drag'),
          (z.current = !0),
          he();
      } else if (Y) {
        const {
          id: c,
          mode: f,
          dx: u,
          l: m,
          w: S,
          start: O,
          segment: te,
          index: Ce,
        } = Y;
        if ((be(null), O)) {
          const Te = Math.round(u / F);
          if (!Te)
            l.exec('drag-task', {
              id: c,
              width: S,
              left: m,
              inProgress: !1,
              ...(te && { segmentIndex: Ce }),
            });
          else {
            let Ne = {},
              Ie = l.getTask(c);
            te && (Ie = Ie.segments[Ce]);
            const Ge = 1440 * 60 * 1e3,
              Xe =
                Te *
                (de === 'week'
                  ? 7
                  : de === 'month'
                    ? 30
                    : de === 'quarter'
                      ? 91
                      : de === 'year'
                        ? 365
                        : 1) *
                Ge;
            f === 'move'
              ? ((Ne.start = new Date(Ie.start.getTime() + Xe)),
                (Ne.end = new Date(Ie.end.getTime() + Xe)))
              : f === 'start'
                ? ((Ne.start = new Date(Ie.start.getTime() + Xe)),
                  (Ne.end = Ie.end))
                : f === 'end' &&
                  ((Ne.start = Ie.start),
                  (Ne.end = new Date(Ie.end.getTime() + Xe))),
              l.exec('update-task', {
                id: c,
                task: Ne,
                ...(te && { segmentIndex: Ce }),
              });
          }
          z.current = !0;
        }
        he();
      }
    }, [l, he, Y, F, de]),
    Je = R(
      (e, c) => {
        const { clientX: f } = c;
        if (g && se.current) {
          const u = se.current.getBoundingClientRect();
          W.current = f - u.left;
        }
        if (ye && se.current) {
          const u = se.current.getBoundingClientRect();
          $e((m) => (m ? { ...m, currentX: f - u.left } : null));
        }
        if (N) {
          const u = se.current;
          if (!u) return;
          const m = u.getBoundingClientRect(),
            S = f - m.left,
            O = c.clientY - m.top;
          re((te) => ({
            ...te,
            currentX: S,
            currentY: O,
          })),
            ee.current &&
              ((ee.current.currentX = S), (ee.current.currentY = O));
          return;
        }
        if (!n)
          if (ve.current) {
            const { node: u, x: m, id: S } = ve.current,
              O = (ve.current.dx = f - m),
              te = Math.round((O / u.offsetWidth) * 100);
            let Ce = ve.current.progress + te;
            (ve.current.value = Ce = Math.min(Math.max(0, Ce), 100)),
              l.exec('update-task', {
                id: S,
                task: { progress: Ce },
                inProgress: !0,
              });
          } else if (Y) {
            ze(null);
            const {
                mode: u,
                l: m,
                w: S,
                x: O,
                id: te,
                start: Ce,
                segment: Te,
                index: Ne,
              } = Y,
              Ie = l.getTask(te),
              Ge = f - O,
              je = Math.round(F) || 1;
            if (
              (!Ce && Math.abs(Ge) < 20) ||
              (u === 'start' && S - Ge < je) ||
              (u === 'end' && S + Ge < je) ||
              (u === 'move' &&
                ((Ge < 0 && m + Ge < 0) || (Ge > 0 && m + S + Ge > p))) ||
              (Y.segment && !hn(Ie, Y))
            )
              return;
            const Xe = { ...Y, dx: Ge };
            let Qe, Fe;
            if (
              (u === 'start'
                ? ((Qe = m + Ge), (Fe = S - Ge))
                : u === 'end'
                  ? ((Qe = m), (Fe = S + Ge))
                  : u === 'move' && ((Qe = m + Ge), (Fe = S)),
              l.exec('drag-task', {
                id: te,
                width: Fe,
                left: Qe,
                inProgress: !0,
                start: Ce,
                ...(Te && { segmentIndex: Ne }),
              }),
              !Xe.start &&
                ((u === 'move' && Ie.$x == m) || (u !== 'move' && Ie.$w == S)))
            ) {
              (z.current = !0), Ve();
              return;
            }
            (Xe.start = !0), be(Xe);
          } else {
            const u = Oe(e);
            if (u) {
              const m = l.getTask(Be(u)),
                O = Oe(e, 'data-segment') || u,
                te = _(O, c, m);
              O.style.cursor = te && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [l, n, Y, F, p, _, ze, Ve],
    ),
    zt = R(
      (e) => {
        Je(e, e);
      },
      [Je],
    ),
    Wt = R(
      (e) => {
        ke
          ? (e.preventDefault(), Je(e, e.touches[0]))
          : He.current && (clearTimeout(He.current), (He.current = null));
      },
      [ke, Je],
    ),
    ot = R(() => {
      Ve();
    }, [Ve]),
    _t = R(() => {
      De(null),
        He.current && (clearTimeout(He.current), (He.current = null)),
        Ve();
    }, [Ve]);
  oe(
    () => (
      window.addEventListener('mouseup', ot),
      () => {
        window.removeEventListener('mouseup', ot);
      }
    ),
    [ot],
  );
  const Ot = R(
      (e) => {
        if (!n) {
          if (e.target.closest('[data-interactive]')) return;
          const c = qe(e.target);
          if (c && !e.target.classList.contains('wx-link')) {
            const f = qe(e.target, 'data-segment');
            l.exec('show-editor', {
              id: c,
              ...(f !== null && { segmentIndex: f }),
            });
          }
        }
      },
      [l, n],
    ),
    Xt = ['e2s', 's2s', 'e2e', 's2e'],
    et = R((e, c) => Xt[(e ? 1 : 0) + (c ? 0 : 2)], []),
    tt = R(
      (e, c) => {
        const f = L.id,
          u = L.start;
        return e === f
          ? !0
          : !!X.find(
              (m) => m.target == e && m.source == f && m.type === et(u, c),
            );
      },
      [L, T, et],
    ),
    ft = R(() => {
      L && me(null);
    }, [L]),
    Kt = R(
      (e) => {
        if (z.current) {
          z.current = !1;
          return;
        }
        if (ye && ye.currentX != null) {
          const f = Dt(ye.currentX, d);
          f && D(f, ye.tasks, ye.parent), $e(null);
          return;
        }
        if (e.target.closest('[data-interactive]')) return;
        const c = qe(e.target);
        if (c) {
          const f = e.target.classList;
          if (f.contains('wx-link')) {
            const u = f.contains('wx-left');
            if (!L) {
              me({ id: c, start: u });
              return;
            }
            L.id !== c &&
              !tt(c, u) &&
              l.exec('add-link', {
                link: {
                  source: L.id,
                  target: c,
                  type: et(L.start, u),
                },
              });
          } else if (f.contains('wx-delete-button-icon'))
            l.exec('delete-link', { id: Me }), A(null);
          else {
            let u;
            const m = Oe(e, 'data-segment');
            m && (u = m.dataset.segment * 1),
              l.exec('select-task', {
                id: c,
                toggle: e.ctrlKey || e.metaKey,
                range: e.shiftKey,
                segmentIndex: u,
              });
          }
        }
        ft();
      },
      [l, L, T, U, tt, et, ft],
    ),
    Yt = R(
      (e) => ({
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      }),
      [],
    ),
    Bt = R(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    Vt = R(
      (e) => {
        if (ke || He.current) return e.preventDefault(), !1;
      },
      [ke],
    ),
    ht = b(() => K.map((e) => e.id), [K]),
    mt = R(
      (e) => {
        let c = ht.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (c = `task ${c}`), c
        );
      },
      [ht],
    ),
    gt = R(
      (e) => {
        l.exec(e.action, e.data);
      },
      [l],
    ),
    lt = R((e) => v && I.byId(e).$critical, [v, I]),
    wt = R(
      (e) => {
        if ($?.auto) {
          const c = I.getSummaryId(e, !0),
            f = I.getSummaryId(L.id, !0);
          return (
            L?.id &&
            !(Array.isArray(c) ? c : [c]).includes(L.id) &&
            !(Array.isArray(f) ? f : [f]).includes(e)
          );
        }
        return L;
      },
      [$, I, L],
    );
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${ue.length ? ue[0].$h : 0}px` },
    ref: se,
    onContextMenu: Vt,
    onMouseDown: pe,
    onMouseMove: zt,
    onTouchStart: Re,
    onTouchMove: Wt,
    onTouchEnd: _t,
    onClick: Kt,
    onDoubleClick: Ot,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ a(Nn, {
        onSelectLink: ze,
        selectedLink: U,
        readonly: n,
      }),
      ue.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const c = ne.has(e.id),
          f =
            `wx-bar wx-${mt(e.type)}` +
            (ke && Y && e.id === Y.id ? ' wx-touch' : '') +
            (L && L.id === e.id ? ' wx-selected' : '') +
            (lt(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (Z && e.segments ? ' wx-split' : '') +
            (c ? ' wx-collision' : ''),
          u =
            'wx-link wx-left' +
            (L ? ' wx-visible' : '') +
            (!L || (!tt(e.id, !0) && wt(e.id)) ? ' wx-target' : '') +
            (L && L.id === e.id && L.start ? ' wx-selected' : '') +
            (lt(e.id) ? ' wx-critical' : ''),
          m =
            'wx-link wx-right' +
            (L ? ' wx-visible' : '') +
            (!L || (!tt(e.id, !1) && wt(e.id)) ? ' wx-target' : '') +
            (L && L.id === e.id && !L.start ? ' wx-selected' : '') +
            (lt(e.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ Ae(
          Qt,
          {
            children: [
              !e.$skip &&
                /* @__PURE__ */ Ae('div', {
                  className: 'wx-GKbcLEGA ' + f,
                  style: Yt(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: q === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === U?.target && U?.type[2] === 's'
                        ? /* @__PURE__ */ a(xt, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ a('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ a('div', {
                            className: 'wx-GKbcLEGA ' + u,
                            children: /* @__PURE__ */ a('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    e.type !== 'milestone'
                      ? /* @__PURE__ */ Ae(Ze, {
                          children: [
                            e.progress && !(Z && e.segments)
                              ? /* @__PURE__ */ a('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ a('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${e.progress}%` },
                                  }),
                                })
                              : null,
                            !n &&
                            !(Z && e.segments) &&
                            !(e.type == 'summary' && ae?.autoProgress)
                              ? /* @__PURE__ */ a('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${e.progress}% - 10px)`,
                                  },
                                  children: e.progress,
                                })
                              : null,
                            s
                              ? /* @__PURE__ */ a('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ a(s, {
                                    data: e,
                                    api: l,
                                    onAction: gt,
                                  }),
                                })
                              : Z && e.segments
                                ? /* @__PURE__ */ a(In, {
                                    task: e,
                                    type: mt(e.type),
                                  })
                                : /* @__PURE__ */ a('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: e.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ Ae(Ze, {
                          children: [
                            /* @__PURE__ */ a('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            s
                              ? /* @__PURE__ */ a(s, {
                                  data: e,
                                  api: l,
                                  onAction: gt,
                                })
                              : /* @__PURE__ */ a('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: e.text,
                                }),
                          ],
                        }),
                    n
                      ? null
                      : e.id === U?.target && U?.type[2] === 'e'
                        ? /* @__PURE__ */ a(xt, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ a('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ a('div', {
                            className: 'wx-GKbcLEGA ' + m,
                            children: /* @__PURE__ */ a('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    c &&
                      /* @__PURE__ */ a('div', {
                        className: 'wx-GKbcLEGA wx-collision-warning',
                        title:
                          'This task overlaps with another task in the same row',
                        children: '!',
                      }),
                    P &&
                      e.type === 'summary' &&
                      (() => {
                        const S = P.get(e.id),
                          O = Math.floor(e.$x / F),
                          te = Math.ceil((e.$x + e.$w) / F);
                        return /* @__PURE__ */ a('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from({ length: te - O }, (Ce, Te) => {
                            const Ne = O + Te,
                              Ie = S?.get(Ne) || 0;
                            return /* @__PURE__ */ a(
                              'span',
                              {
                                className: `wx-GKbcLEGA wx-week-count${Ie === 0 ? ' wx-week-count-zero' : ''}`,
                                style: {
                                  position: 'absolute',
                                  left: `${Ne * F - e.$x}px`,
                                  width: `${F}px`,
                                  top: 0,
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                children: Ie,
                              },
                              Ne,
                            );
                          }),
                        });
                      })(),
                  ],
                }),
              j && !e.$skip_baseline
                ? /* @__PURE__ */ a('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (e.type === 'milestone' ? ' wx-milestone' : ''),
                    style: Bt(e),
                  })
                : null,
            ],
          },
          e.id,
        );
      }),
      N &&
        (() => {
          const e = Math.min(N.startX, N.currentX),
            c = Math.min(N.startY, N.currentY),
            f = Math.abs(N.currentX - N.startX),
            u = Math.abs(N.currentY - N.startY);
          return /* @__PURE__ */ a('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${e}px`,
              top: `${c}px`,
              width: `${f}px`,
              height: `${u}px`,
            },
          });
        })(),
      ye &&
        ye.currentX != null &&
        ye.tasks.map((e, c) => {
          const u =
              (Math.floor(ye.currentX / F) + (e._startCellOffset || 0)) * F,
            m = e._originalWidth || F,
            S = e._originalHeight || J,
            O = Le.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ a(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: u, top: O, width: m, height: S },
              children: /* @__PURE__ */ a('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: e.$barText || e.text,
              }),
            },
            `preview-${c}`,
          );
        }),
    ],
  });
}
function Gn(t) {
  const { highlightTime: n, onScaleClick: s } = t,
    o = We(Ye),
    r = H(o, '_scales');
  return /* @__PURE__ */ a('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: r.width },
    children: (r?.rows || []).map((E, y) =>
      /* @__PURE__ */ a(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${E.height}px` },
          children: (E.cells || []).map((x, g) => {
            const l = n ? n(x.date, x.unit) : '',
              h = 'wx-cell ' + (x.css || '') + ' ' + (l || '');
            return /* @__PURE__ */ a(
              'div',
              {
                className: 'wx-ZkvhDKir ' + h,
                style: {
                  width: `${x.width}px`,
                  cursor: s ? 'pointer' : void 0,
                },
                onClick: s ? (V) => s(x.date, x.unit, V.nativeEvent) : void 0,
                children: x.value,
              },
              g,
            );
          }),
        },
        y,
      ),
    ),
  });
}
const zn = /* @__PURE__ */ new Map();
function Wn(t) {
  const n = ce(null),
    s = ce(0),
    o = ce(null),
    r = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    s.current++,
    oe(() => {
      if (r)
        return (
          cancelAnimationFrame(o.current),
          (o.current = requestAnimationFrame(() => {
            const E = {
              label: t,
              time: performance.now() - n.current,
              renders: s.current,
              timestamp: Date.now(),
            };
            zn.set(t, E),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: E }),
              );
          })),
          () => cancelAnimationFrame(o.current)
        );
    });
}
function _n(t) {
  const {
      readonly: n,
      fullWidth: s,
      fullHeight: o,
      taskTemplate: r,
      cellBorders: E,
      highlightTime: y,
      onScaleClick: x,
      multiTaskRows: g = !1,
      rowMapping: l = null,
      allowTaskIntersection: h = !0,
      summaryBarCounts: V = !1,
      marqueeSelect: X = !1,
      copyPaste: T = !1,
    } = t,
    C = We(Ye),
    [d, K] = ut(C, '_selected'),
    j = H(C, 'scrollTop'),
    M = H(C, 'cellHeight'),
    Q = H(C, 'cellWidth'),
    v = H(C, '_scales'),
    I = H(C, '_markers'),
    $ = H(C, '_scrollTask'),
    Z = H(C, 'zoom'),
    [ae, le] = we(),
    J = ce(null),
    ue = H(C, '_tasks'),
    F = 1 + (v?.rows?.length || 0),
    de = b(() => {
      if (!g || !l || !ue?.length) return null;
      const k = /* @__PURE__ */ new Map(),
        W = /* @__PURE__ */ new Map(),
        z = [];
      return (
        ue.forEach((L) => {
          const me = l.taskRows.get(L.id) ?? L.id;
          W.has(me) || (W.set(me, z.length), z.push(me));
        }),
        ue.forEach((L) => {
          const me = l.taskRows.get(L.id) ?? L.id,
            Y = W.get(me) ?? 0;
          k.set(L.id, Y * M);
        }),
        k
      );
    }, [ue, g, l, M]),
    ne = b(() => {
      const k = [];
      return (
        d &&
          d.length &&
          M &&
          d.forEach((W) => {
            const z = de?.get(W.id) ?? W.$y;
            k.push({ height: `${M}px`, top: `${z - 3}px` });
          }),
        k
      );
    }, [K, M, de]),
    P = b(() => Math.max(ae || 0, o), [ae, o]);
  oe(() => {
    const k = J.current;
    k && typeof j == 'number' && (k.scrollTop = j);
  }, [j]);
  const N = () => {
    re();
  };
  function re(k) {
    const W = J.current;
    if (!W) return;
    const z = {};
    (z.left = W.scrollLeft), C.exec('scroll-chart', z);
  }
  function ee() {
    const k = J.current,
      z = Math.ceil((ae || 0) / (M || 1)) + 1,
      L = Math.floor(((k && k.scrollTop) || 0) / (M || 1)),
      me = Math.max(0, L - F),
      Y = L + z + F,
      be = me * (M || 0);
    C.exec('render-data', {
      start: me,
      end: Y,
      from: be,
    });
  }
  oe(() => {
    ee();
  }, [ae, j]);
  const ie = R(
    (k) => {
      if (!k) return;
      const { id: W, mode: z } = k;
      if (z.toString().indexOf('x') < 0) return;
      const L = J.current;
      if (!L) return;
      const { clientWidth: me } = L,
        Y = C.getTask(W);
      if (Y.$x + Y.$w < L.scrollLeft)
        C.exec('scroll-chart', { left: Y.$x - (Q || 0) }),
          (L.scrollLeft = Y.$x - (Q || 0));
      else if (Y.$x >= me + L.scrollLeft) {
        const be = me < Y.$w ? Q || 0 : Y.$w;
        C.exec('scroll-chart', { left: Y.$x - me + be }),
          (L.scrollLeft = Y.$x - me + be);
      }
    },
    [C, Q],
  );
  oe(() => {
    ie($);
  }, [$]);
  function xe(k) {
    if (Z && (k.ctrlKey || k.metaKey)) {
      k.preventDefault();
      const W = J.current,
        z = -Math.sign(k.deltaY),
        L = k.clientX - (W ? W.getBoundingClientRect().left : 0);
      C.exec('zoom-scale', {
        dir: z,
        offset: L,
      });
    }
  }
  function ye(k) {
    const W = y(k.date, k.unit);
    return W
      ? {
          css: W,
          width: k.width,
        }
      : null;
  }
  const $e = b(
      () =>
        v && (v.minUnit === 'hour' || v.minUnit === 'day') && y
          ? v.rows[v.rows.length - 1].cells.map(ye)
          : null,
      [v, y],
    ),
    Pe = R(
      (k) => {
        (k.eventSource = 'chart'), C.exec('hotkey', k);
      },
      [C],
    );
  oe(() => {
    const k = J.current;
    if (!k) return;
    const W = () => le(k.clientHeight);
    W();
    const z = new ResizeObserver(() => W());
    return (
      z.observe(k),
      () => {
        z.disconnect();
      }
    );
  }, [J.current]);
  const Ee = ce(null);
  return (
    oe(() => {
      const k = J.current;
      if (k && !Ee.current)
        return (
          (Ee.current = Pt(k, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (W) => Pe(W),
          })),
          () => {
            Ee.current?.destroy(), (Ee.current = null);
          }
        );
    }, []),
    oe(() => {
      const k = J.current;
      if (!k) return;
      const W = xe;
      return (
        k.addEventListener('wheel', W),
        () => {
          k.removeEventListener('wheel', W);
        }
      );
    }, [xe]),
    Wn('chart'),
    /* @__PURE__ */ Ae('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: J,
      onScroll: N,
      children: [
        /* @__PURE__ */ a(Gn, { highlightTime: y, onScaleClick: x, scales: v }),
        I && I.length
          ? /* @__PURE__ */ a('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${P}px` },
              children: I.map((k, W) =>
                /* @__PURE__ */ a(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${k.css || ''}`,
                    style: { left: `${k.left}px` },
                    children: /* @__PURE__ */ a('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: k.text,
                    }),
                  },
                  W,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ Ae('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${s}px`, height: `${P}px` },
          children: [
            $e
              ? /* @__PURE__ */ a('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: $e.map((k, W) =>
                    k
                      ? /* @__PURE__ */ a(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + k.css,
                            style: {
                              width: `${k.width}px`,
                              left: `${W * k.width}px`,
                            },
                          },
                          W,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ a(Sn, { borders: E }),
            d && d.length
              ? d.map((k, W) =>
                  k.$y
                    ? /* @__PURE__ */ a(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': k.id,
                          style: ne[W],
                        },
                        k.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ a(Hn, {
              readonly: n,
              taskTemplate: r,
              multiTaskRows: g,
              rowMapping: l,
              allowTaskIntersection: h,
              summaryBarCounts: V,
              marqueeSelect: X,
              copyPaste: T,
            }),
          ],
        }),
      ],
    })
  );
}
function On(t) {
  const {
      position: n = 'after',
      size: s = 4,
      dir: o = 'x',
      onMove: r,
      onDisplayChange: E,
      compactMode: y,
      containerWidth: x = 0,
      leftThreshold: g = 50,
      rightThreshold: l = 50,
    } = t,
    [h, V] = at(t.value ?? 0),
    [X, T] = at(t.display ?? 'all');
  function C(ee) {
    let ie = 0;
    n == 'center' ? (ie = s / 2) : n == 'before' && (ie = s);
    const xe = {
      size: [s + 'px', 'auto'],
      p: [ee - ie + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (o != 'x') for (let ye in xe) xe[ye] = xe[ye].reverse();
    return xe;
  }
  const [d, K] = we(!1),
    [j, M] = we(null),
    Q = ce(0),
    v = ce(),
    I = ce(),
    $ = ce(X);
  oe(() => {
    $.current = X;
  }, [X]),
    oe(() => {
      j === null && h > 0 && M(h);
    }, [j, h]);
  function Z(ee) {
    return o == 'x' ? ee.clientX : ee.clientY;
  }
  const ae = R(
      (ee) => {
        const ie = v.current + Z(ee) - Q.current;
        V(ie);
        let xe;
        ie <= g ? (xe = 'chart') : x - ie <= l ? (xe = 'grid') : (xe = 'all'),
          $.current !== xe && (T(xe), ($.current = xe)),
          I.current && clearTimeout(I.current),
          (I.current = setTimeout(() => r && r(ie), 100));
      },
      [x, g, l, r],
    ),
    le = R(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        K(!1),
        window.removeEventListener('mousemove', ae),
        window.removeEventListener('mouseup', le);
    }, [ae]),
    J = b(
      () => (X !== 'all' ? 'auto' : o == 'x' ? 'ew-resize' : 'ns-resize'),
      [X, o],
    ),
    ue = R(
      (ee) => {
        (!y && (X === 'grid' || X === 'chart')) ||
          ((Q.current = Z(ee)),
          (v.current = h),
          K(!0),
          (document.body.style.cursor = J),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', ae),
          window.addEventListener('mouseup', le));
      },
      [J, ae, le, h, y, X],
    );
  function F() {
    T('all'), j !== null && (V(j), r && r(j));
  }
  function de(ee) {
    if (y) {
      const ie = X === 'chart' ? 'grid' : 'chart';
      T(ie), E(ie);
    } else if (X === 'grid' || X === 'chart') F(), E('all');
    else {
      const ie = ee === 'left' ? 'chart' : 'grid';
      T(ie), E(ie);
    }
  }
  function ne() {
    de('left');
  }
  function P() {
    de('right');
  }
  const N = b(() => C(h), [h, n, s, o]),
    re = [
      'wx-resizer',
      `wx-resizer-${o}`,
      `wx-resizer-display-${X}`,
      d ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-pFykzMlT ' + re,
    onMouseDown: ue,
    style: { width: N.size[0], height: N.size[1], cursor: J },
    children: [
      /* @__PURE__ */ Ae('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ a('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ a('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: ne,
            }),
          }),
          /* @__PURE__ */ a('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ a('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: P,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ a('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const Xn = 650;
function Ht(t) {
  let n;
  function s() {
    (n = new ResizeObserver((r) => {
      for (let E of r)
        if (E.target === document.body) {
          let y = E.contentRect.width <= Xn;
          t(y);
        }
    })),
      n.observe(document.body);
  }
  function o() {
    n && (n.disconnect(), (n = null));
  }
  return {
    observe: s,
    disconnect: o,
  };
}
function Kn(t) {
  const {
      taskTemplate: n,
      readonly: s,
      cellBorders: o,
      highlightTime: r,
      onScaleClick: E,
      onTableAPIChange: y,
      multiTaskRows: x = !1,
      rowMapping: g = null,
      allowTaskIntersection: l = !0,
      summaryBarCounts: h = !1,
      marqueeSelect: V = !1,
      copyPaste: X = !1,
    } = t,
    T = We(Ye),
    C = H(T, '_tasks'),
    d = H(T, '_scales'),
    K = H(T, 'cellHeight'),
    j = H(T, 'columns'),
    M = H(T, '_scrollTask'),
    Q = H(T, 'undo'),
    v = b(() => {
      if (!x) return g;
      const A = /* @__PURE__ */ new Map(),
        U = /* @__PURE__ */ new Map();
      return (
        C.forEach((ke) => {
          const De = ke.row ?? ke.id;
          U.set(ke.id, De), A.has(De) || A.set(De, []), A.get(De).push(ke.id);
        }),
        { rowMap: A, taskRows: U }
      );
    }, [C, x, g]),
    [I, $] = we(!1);
  let [Z, ae] = we(0);
  const [le, J] = we(0),
    [ue, F] = we(0),
    [de, ne] = we(void 0),
    [P, N] = we('all'),
    re = ce(null),
    ee = R(
      (A) => {
        $(
          (U) => (
            A !== U &&
              (A
                ? ((re.current = P), P === 'all' && N('grid'))
                : (!re.current || re.current === 'all') && N('all')),
            A
          ),
        );
      },
      [P],
    );
  oe(() => {
    const A = Ht(ee);
    return (
      A.observe(),
      () => {
        A.disconnect();
      }
    );
  }, [ee]);
  const ie = b(() => {
    let A;
    return (
      j.every((U) => U.width && !U.flexgrow)
        ? (A = j.reduce((U, ke) => U + parseInt(ke.width), 0))
        : I && P === 'chart'
          ? (A = parseInt(j.find((U) => U.id === 'action')?.width) || 50)
          : (A = 440),
      (Z = A),
      A
    );
  }, [j, I, P]);
  oe(() => {
    ae(ie);
  }, [ie]);
  const xe = b(() => (le ?? 0) - (de ?? 0), [le, de]),
    ye = b(() => d.width, [d]),
    $e = b(() => {
      if (!x || !v) return C.length * K;
      const A = /* @__PURE__ */ new Set();
      return (
        C.forEach((U) => {
          const ke = v.taskRows.get(U.id) ?? U.id;
          A.add(ke);
        }),
        A.size * K
      );
    }, [C, K, x, v]),
    Pe = b(() => d.height + $e + xe, [d, $e, xe]),
    Ee = b(() => Z + ye, [Z, ye]),
    k = ce(null),
    W = R(() => {
      Promise.resolve().then(() => {
        if ((le ?? 0) > (Ee ?? 0)) {
          const A = (le ?? 0) - Z;
          T.exec('expand-scale', { minWidth: A });
        }
      });
    }, [le, Ee, Z, T]);
  oe(() => {
    let A;
    return (
      k.current && ((A = new ResizeObserver(W)), A.observe(k.current)),
      () => {
        A && A.disconnect();
      }
    );
  }, [k.current, W]),
    oe(() => {
      W();
    }, [ye]);
  const z = ce(null),
    L = ce(null),
    me = R(() => {
      const A = z.current;
      A &&
        T.exec('scroll-chart', {
          top: A.scrollTop,
        });
    }, [T]),
    Y = ce({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  oe(() => {
    Y.current = {
      rTasks: C,
      rScales: d,
      rCellHeight: K,
      scrollSize: xe,
      ganttDiv: z.current,
      ganttHeight: ue ?? 0,
    };
  }, [C, d, K, xe, ue]);
  const be = R(
    (A) => {
      if (!A) return;
      const {
        rTasks: U,
        rScales: ke,
        rCellHeight: De,
        scrollSize: He,
        ganttDiv: p,
        ganttHeight: G,
      } = Y.current;
      if (!p) return;
      const { id: se } = A,
        B = U.findIndex((q) => q.id === se);
      if (B > -1) {
        const q = G - ke.height,
          fe = B * De,
          he = p.scrollTop;
        let Se = null;
        fe < he ? (Se = fe) : fe + De > he + q && (Se = fe - q + De + He),
          Se !== null &&
            (T.exec('scroll-chart', { top: Math.max(Se, 0) }),
            (z.current.scrollTop = Math.max(Se, 0)));
      }
    },
    [T],
  );
  oe(() => {
    be(M);
  }, [M]),
    oe(() => {
      const A = z.current,
        U = L.current;
      if (!A || !U) return;
      const ke = () => {
          Tn(() => {
            F(A.offsetHeight), J(A.offsetWidth), ne(U.offsetWidth);
          });
        },
        De = new ResizeObserver(ke);
      return De.observe(A), () => De.disconnect();
    }, [z.current]);
  const ve = ce(null),
    Me = ce(null);
  return (
    oe(() => {
      Me.current && (Me.current.destroy(), (Me.current = null));
      const A = ve.current;
      if (A)
        return (
          (Me.current = Pt(A, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': Q,
              'ctrl+y': Q,
            },
            exec: (U) => {
              U.isInput || T.exec('hotkey', U);
            },
          })),
          () => {
            Me.current?.destroy(), (Me.current = null);
          }
        );
    }, [Q]),
    /* @__PURE__ */ a('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: z,
      onScroll: me,
      children: /* @__PURE__ */ a('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: Pe, width: '100%' },
        ref: L,
        children: /* @__PURE__ */ a('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: ue,
            width: de,
          },
          children: /* @__PURE__ */ Ae('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: ve,
            children: [
              j.length
                ? /* @__PURE__ */ Ae(Ze, {
                    children: [
                      /* @__PURE__ */ a(Dn, {
                        display: P,
                        compactMode: I,
                        columnWidth: ie,
                        width: Z,
                        readonly: s,
                        fullHeight: $e,
                        onTableAPIChange: y,
                        multiTaskRows: x,
                        rowMapping: v,
                      }),
                      /* @__PURE__ */ a(On, {
                        value: Z,
                        display: P,
                        compactMode: I,
                        containerWidth: le,
                        onMove: (A) => ae(A),
                        onDisplayChange: (A) => N(A),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ a('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: k,
                children: /* @__PURE__ */ a(_n, {
                  readonly: s,
                  fullWidth: ye,
                  fullHeight: $e,
                  taskTemplate: n,
                  cellBorders: o,
                  highlightTime: r,
                  onScaleClick: E,
                  multiTaskRows: x,
                  rowMapping: v,
                  allowTaskIntersection: l,
                  summaryBarCounts: h,
                  marqueeSelect: V,
                  copyPaste: X,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function Yn(t) {
  return {
    year: '%Y',
    quarter: `${t('Q')} %Q`,
    month: '%M',
    week: `${t('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function Bn(t, n) {
  return typeof t == 'function' ? t : nt(t, n);
}
function Gt(t, n) {
  return t.map(({ format: s, ...o }) => ({
    ...o,
    format: Bn(s, n),
  }));
}
function Vn(t, n) {
  const s = Yn(n);
  for (let o in s) s[o] = nt(s[o], t);
  return s;
}
function Fn(t, n) {
  if (!t || !t.length) return t;
  const s = nt('%d-%m-%Y', n);
  return t.map((o) =>
    o.template
      ? o
      : o.id === 'start' || o.id == 'end'
        ? {
            ...o,
            //store locale template for unscheduled tasks
            _template: (r) => s(r),
            template: (r) => s(r),
          }
        : o.id === 'duration'
          ? {
              ...o,
              _template: (r) => r,
              template: (r) => r,
            }
          : o,
  );
}
function qn(t, n) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((s) => ({
          ...s,
          scales: Gt(s.scales, n),
        })),
      }
    : t;
}
const Un = (t) =>
    t
      .split('-')
      .map((n) => (n ? n.charAt(0).toUpperCase() + n.slice(1) : ''))
      .join(''),
  jn = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  ws = St(function (
    {
      taskTemplate: n = null,
      markers: s = [],
      taskTypes: o = pn,
      tasks: r = [],
      selected: E = [],
      activeTask: y = null,
      links: x = [],
      scales: g = jn,
      columns: l = xn,
      start: h = null,
      end: V = null,
      lengthUnit: X = 'day',
      durationUnit: T = 'day',
      cellWidth: C = 100,
      cellHeight: d = 38,
      scaleHeight: K = 36,
      readonly: j = !1,
      cellBorders: M = 'full',
      zoom: Q = !1,
      baselines: v = !1,
      highlightTime: I = null,
      onScaleClick: $ = null,
      init: Z = null,
      autoScale: ae = !0,
      unscheduledTasks: le = !1,
      criticalPath: J = null,
      schedule: ue = { type: 'forward' },
      projectStart: F = null,
      projectEnd: de = null,
      calendar: ne = null,
      undo: P = !1,
      splitTasks: N = !1,
      multiTaskRows: re = !1,
      allowTaskIntersection: ee = !0,
      summaryBarCounts: ie = !1,
      marqueeSelect: xe = !1,
      copyPaste: ye = !1,
      summary: $e = null,
      _export: Pe = !1,
      ...Ee
    },
    k,
  ) {
    const W = ce();
    W.current = Ee;
    const z = b(() => new mn(kn), []),
      L = b(() => ({ ...dt, ...rt }), []),
      me = We(_e.i18n),
      Y = b(() => (me ? me.extend(L, !0) : st(L)), [me, L]),
      be = b(() => Y.getRaw().calendar, [Y]),
      ve = b(() => {
        let q = {
          zoom: qn(Q, be),
          scales: Gt(g, be),
          columns: Fn(l, be),
          links: gn(x),
          cellWidth: C,
        };
        return (
          q.zoom &&
            (q = {
              ...q,
              ...wn(q.zoom, Vn(be, Y.getGroup('gantt')), q.scales, C),
            }),
          q
        );
      }, [Q, g, l, x, C, be, Y]),
      Me = ce(null);
    Me.current !== r &&
      (Pe || vt(r, { durationUnit: T, splitTasks: N, calendar: ne }),
      (Me.current = r)),
      oe(() => {
        Pe || vt(r, { durationUnit: T, splitTasks: N, calendar: ne });
      }, [r, T, ne, N, Pe]);
    const A = b(() => {
        if (!re) return null;
        const q = /* @__PURE__ */ new Map(),
          fe = /* @__PURE__ */ new Map(),
          he = (Se) => {
            Se.forEach((Le) => {
              const i = Le.row ?? Le.id;
              fe.set(Le.id, i),
                q.has(i) || q.set(i, []),
                q.get(i).push(Le.id),
                Le.data && Le.data.length > 0 && he(Le.data);
            });
          };
        return he(r), { rowMap: q, taskRows: fe };
      }, [r, re]),
      U = b(() => z.in, [z]),
      ke = ce(null);
    ke.current === null &&
      ((ke.current = new un((q, fe) => {
        const he = 'on' + Un(q);
        W.current && W.current[he] && W.current[he](fe);
      })),
      U.setNext(ke.current));
    const [De, He] = we(null),
      p = ce(null);
    p.current = De;
    const G = b(
      () => ({
        getState: z.getState.bind(z),
        getReactiveState: z.getReactive.bind(z),
        getStores: () => ({ data: z }),
        exec: U.exec.bind(U),
        setNext: (q) => ((ke.current = ke.current.setNext(q)), ke.current),
        intercept: U.intercept.bind(U),
        on: U.on.bind(U),
        detach: U.detach.bind(U),
        getTask: z.getTask.bind(z),
        serialize: () => z.serialize(),
        getTable: (q) =>
          q
            ? new Promise((fe) => setTimeout(() => fe(p.current), 1))
            : p.current,
        getHistory: () => z.getHistory(),
      }),
      [z, U],
    );
    oe(() => {
      const q = () => {
        const { zoom: fe, scales: he } = G.getState(),
          Le = fe?.levels?.[fe.level]?.scales?.[0]?.unit ?? he?.[0]?.unit;
        Le && G.exec('scale-change', { level: fe?.level, unit: Le });
      };
      G.on('zoom-scale', q), G.on('set-scale', q);
    }, [G]),
      oe(() => {
        G.intercept('set-scale', ({ unit: q, date: fe }) => {
          const { zoom: he } = G.getState();
          if (!he || !he.levels) return !1;
          const Se = he.levels.findIndex((w) =>
            w.scales.some((D) => D.unit === q),
          );
          if (Se < 0) return !1;
          const Le = he.levels[Se];
          if (Se !== he.level) {
            const w = Math.round((Le.minCellWidth + Le.maxCellWidth) / 2);
            G.getStores().data.setState({
              scales: Le.scales,
              cellWidth: w,
              _cellWidth: w,
              zoom: { ...he, level: Se },
              ...(fe ? { _scaleDate: fe, _zoomOffset: 0 } : {}),
            });
          } else if (fe) {
            const { _scales: w, cellWidth: D } = G.getState(),
              _ = w.diff(fe, w.start, w.lengthUnit),
              ge = Math.max(0, Math.round(_ * D));
            G.exec('scroll-chart', { left: ge });
          }
          return !1;
        });
      }, [G]),
      Nt(
        k,
        () => ({
          ...G,
        }),
        [G],
      );
    const se = ce(0);
    oe(() => {
      se.current
        ? z.init({
            tasks: r,
            links: ve.links,
            start: h,
            columns: ve.columns,
            end: V,
            lengthUnit: X,
            cellWidth: ve.cellWidth,
            cellHeight: d,
            scaleHeight: K,
            scales: ve.scales,
            taskTypes: o,
            zoom: ve.zoom,
            selected: E,
            activeTask: y,
            baselines: v,
            autoScale: ae,
            unscheduledTasks: le,
            markers: s,
            durationUnit: T,
            criticalPath: J,
            schedule: ue,
            projectStart: F,
            projectEnd: de,
            calendar: ne,
            undo: P,
            _weekStart: be.weekStart,
            splitTasks: N,
            summary: $e,
          })
        : Z && Z(G),
        se.current++;
    }, [
      G,
      Z,
      r,
      ve,
      h,
      V,
      X,
      d,
      K,
      o,
      E,
      y,
      v,
      ae,
      le,
      s,
      T,
      J,
      ue,
      F,
      de,
      ne,
      P,
      be,
      N,
      $e,
      z,
    ]),
      se.current === 0 &&
        z.init({
          tasks: r,
          links: ve.links,
          start: h,
          columns: ve.columns,
          end: V,
          lengthUnit: X,
          cellWidth: ve.cellWidth,
          cellHeight: d,
          scaleHeight: K,
          scales: ve.scales,
          taskTypes: o,
          zoom: ve.zoom,
          selected: E,
          activeTask: y,
          baselines: v,
          autoScale: ae,
          unscheduledTasks: le,
          markers: s,
          durationUnit: T,
          criticalPath: J,
          schedule: ue,
          projectStart: F,
          projectEnd: de,
          calendar: ne,
          undo: P,
          _weekStart: be.weekStart,
          splitTasks: N,
          summary: $e,
        });
    const B = b(
      () =>
        ne
          ? (q, fe) =>
              (fe == 'day' && !ne.getDayHours(q)) ||
              (fe == 'hour' && !ne.getDayHours(q))
                ? 'wx-weekend'
                : ''
          : I,
      [ne, I],
    );
    return /* @__PURE__ */ a(_e.i18n.Provider, {
      value: Y,
      children: /* @__PURE__ */ a(Ye.Provider, {
        value: G,
        children: /* @__PURE__ */ a(Kn, {
          taskTemplate: n,
          readonly: j,
          cellBorders: M,
          highlightTime: B,
          onScaleClick: $,
          onTableAPIChange: He,
          multiTaskRows: re,
          rowMapping: A,
          allowTaskIntersection: ee,
          summaryBarCounts: ie,
          marqueeSelect: xe,
          copyPaste: ye,
        }),
      }),
    });
  });
function xs({ api: t = null, items: n = [] }) {
  const s = We(_e.i18n),
    o = b(() => s || st(rt), [s]),
    r = b(() => o.getGroup('gantt'), [o]),
    E = Ke(t, '_selected'),
    y = Ke(t, 'undo'),
    x = Ke(t, 'history'),
    g = Ke(t, 'splitTasks'),
    l = ['undo', 'redo'],
    h = b(() => {
      const X = bt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : bt({
              undo: y,
              splitTasks: g,
            })
      ).map((C) => {
        let d = { ...C, disabled: !1 };
        return (
          (d.handler = At(X, d.id) ? (K) => Lt(t, K.id, null, r) : d.handler),
          d.text && (d.text = r(d.text)),
          d.menuText && (d.menuText = r(d.menuText)),
          d
        );
      });
    }, [n, t, r, y, g]),
    V = b(() => {
      const X = [];
      return (
        h.forEach((T) => {
          const C = T.id;
          if (C === 'add-task') X.push(T);
          else if (l.includes(C))
            l.includes(C) &&
              X.push({
                ...T,
                disabled: T.isDisabled(x),
              });
          else {
            if (!E?.length || !t) return;
            X.push({
              ...T,
              disabled:
                T.isDisabled && E.some((d) => T.isDisabled(d, t.getState())),
            });
          }
        }),
        X.filter((T, C) => {
          if (t && T.isHidden)
            return !E.some((d) => T.isHidden(d, t.getState()));
          if (T.comp === 'separator') {
            const d = X[C + 1];
            if (!d || d.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, E, x, h]);
  return s
    ? /* @__PURE__ */ a(Ct, { items: V })
    : /* @__PURE__ */ a(_e.i18n.Provider, {
        value: o,
        children: /* @__PURE__ */ a(Ct, { items: V }),
      });
}
const ps = St(function (
  {
    options: n = [],
    api: s = null,
    resolver: o = null,
    filter: r = null,
    at: E = 'point',
    children: y,
    onClick: x,
    css: g,
  },
  l,
) {
  const h = ce(null),
    V = ce(null),
    X = We(_e.i18n),
    T = b(() => X || st({ ...rt, ...dt }), [X]),
    C = b(() => T.getGroup('gantt'), [T]),
    d = Ke(s, 'taskTypes'),
    K = Ke(s, 'selected'),
    j = Ke(s, '_selected'),
    M = Ke(s, 'splitTasks'),
    Q = Ke(s, 'summary'),
    v = b(
      () => ({
        splitTasks: M,
        taskTypes: d,
        summary: Q,
      }),
      [M, d, Q],
    ),
    I = b(() => Tt(v), [v]);
  oe(() => {
    s &&
      (s.on('scroll-chart', () => {
        h.current && h.current.show && h.current.show();
      }),
      s.on('drag-task', () => {
        h.current && h.current.show && h.current.show();
      }));
  }, [s]);
  function $(P) {
    return P.map(
      (N) => (
        (N = { ...N }),
        N.text && (N.text = C(N.text)),
        N.subtext && (N.subtext = C(N.subtext)),
        N.data && (N.data = $(N.data)),
        N
      ),
    );
  }
  function Z() {
    const P = n.length ? n : Tt(v);
    return $(P);
  }
  const ae = b(() => Z(), [s, n, v, C]),
    le = b(() => (j && j.length ? j : []), [j]),
    J = R(
      (P, N) => {
        let re = P ? s?.getTask(P) : null;
        if (o) {
          const ee = o(P, N);
          re = ee === !0 ? re : ee;
        }
        if (re) {
          const ee = qe(N.target, 'data-segment');
          ee !== null
            ? (V.current = { id: re.id, segmentIndex: ee })
            : (V.current = re.id),
            (!Array.isArray(K) || !K.includes(re.id)) &&
              s &&
              s.exec &&
              s.exec('select-task', { id: re.id });
        }
        return re;
      },
      [s, o, K],
    ),
    ue = R(
      (P) => {
        const N = P.action;
        N && (At(I, N.id) && Lt(s, N.id, V.current, C), x && x(P));
      },
      [s, C, x, I],
    ),
    F = R(
      (P, N) => {
        const re = le.length ? le : N ? [N] : [];
        let ee = r ? re.every((ie) => r(P, ie)) : !0;
        if (
          ee &&
          (P.isHidden &&
            (ee = !re.some((ie) => P.isHidden(ie, s.getState(), V.current))),
          P.isDisabled)
        ) {
          const ie = re.some((xe) => P.isDisabled(xe, s.getState(), V.current));
          P.disabled = ie;
        }
        return ee;
      },
      [r, le, s],
    );
  Nt(l, () => ({
    show: (P, N) => {
      h.current && h.current.show && h.current.show(P, N);
    },
  }));
  const de = R((P) => {
      h.current && h.current.show && h.current.show(P);
    }, []),
    ne = /* @__PURE__ */ Ae(Ze, {
      children: [
        /* @__PURE__ */ a(Cn, {
          filter: F,
          options: ae,
          dataKey: 'id',
          resolver: J,
          onClick: ue,
          at: E,
          ref: h,
          css: g,
        }),
        /* @__PURE__ */ a('span', {
          onContextMenu: de,
          'data-menu-ignore': 'true',
          children: typeof y == 'function' ? y() : y,
        }),
      ],
    });
  if (!X && _e.i18n?.Provider) {
    const P = _e.i18n.Provider;
    return /* @__PURE__ */ a(P, { value: T, children: ne });
  }
  return ne;
});
function Qn({ api: t, autoSave: n, onLinksChange: s }) {
  const r = We(_e.i18n).getGroup('gantt'),
    E = H(t, 'activeTask'),
    y = H(t, '_activeTask'),
    x = H(t, '_links'),
    g = H(t, 'schedule'),
    l = H(t, 'unscheduledTasks'),
    [h, V] = we();
  function X() {
    if (E) {
      const K = x
          .filter((M) => M.target == E)
          .map((M) => ({ link: M, task: t.getTask(M.source) })),
        j = x
          .filter((M) => M.source == E)
          .map((M) => ({ link: M, task: t.getTask(M.target) }));
      return [
        { title: r('Predecessors'), data: K },
        { title: r('Successors'), data: j },
      ];
    }
  }
  oe(() => {
    V(X());
  }, [E, x]);
  const T = b(
    () => [
      { id: 'e2s', label: r('End-to-start') },
      { id: 's2s', label: r('Start-to-start') },
      { id: 'e2e', label: r('End-to-end') },
      { id: 's2e', label: r('Start-to-end') },
    ],
    [r],
  );
  function C(K) {
    n
      ? t.exec('delete-link', { id: K })
      : (V((j) =>
          (j || []).map((M) => ({
            ...M,
            data: M.data.filter((Q) => Q.link.id !== K),
          })),
        ),
        s &&
          s({
            id: K,
            action: 'delete-link',
            data: { id: K },
          }));
  }
  function d(K, j) {
    n
      ? t.exec('update-link', {
          id: K,
          link: j,
        })
      : (V((M) =>
          (M || []).map((Q) => ({
            ...Q,
            data: Q.data.map((v) =>
              v.link.id === K ? { ...v, link: { ...v.link, ...j } } : v,
            ),
          })),
        ),
        s &&
          s({
            id: K,
            action: 'update-link',
            data: {
              id: K,
              link: j,
            },
          }));
  }
  return /* @__PURE__ */ a(Ze, {
    children: (h || []).map((K, j) =>
      K.data.length
        ? /* @__PURE__ */ a(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ a(_e.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ a(Zt, {
                  label: K.title,
                  position: 'top',
                  children: /* @__PURE__ */ a('table', {
                    children: /* @__PURE__ */ a('tbody', {
                      children: K.data.map((M) =>
                        /* @__PURE__ */ Ae(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ a('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ a('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: M.task.text || '',
                                }),
                              }),
                              g?.auto && M.link.type === 'e2s'
                                ? /* @__PURE__ */ a('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ a(Jt, {
                                      type: 'number',
                                      placeholder: r('Lag'),
                                      value: M.link.lag,
                                      disabled: l && y?.unscheduled,
                                      onChange: (Q) => {
                                        Q.input ||
                                          d(M.link.id, { lag: Q.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ a('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ a('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ a(en, {
                                    value: M.link.type,
                                    placeholder: r('Select link type'),
                                    options: T,
                                    onChange: (Q) =>
                                      d(M.link.id, { type: Q.value }),
                                    children: ({ option: Q }) => Q.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ a('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ a('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => C(M.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          M.link.id,
                        ),
                      ),
                    }),
                  }),
                }),
              }),
            },
            j,
          )
        : null,
    ),
  });
}
function Zn(t) {
  const { value: n, time: s, format: o, onchange: r, onChange: E, ...y } = t,
    x = E ?? r;
  function g(l) {
    const h = new Date(l.value);
    h.setHours(n.getHours()),
      h.setMinutes(n.getMinutes()),
      x && x({ value: h });
  }
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ a(tn, {
        ...y,
        value: n,
        onChange: g,
        format: o,
        buttons: ['today'],
        clear: !1,
      }),
      s ? /* @__PURE__ */ a(nn, { value: n, onChange: x, format: o }) : null,
    ],
  });
}
Ue('select', rn);
Ue('date', Zn);
Ue('twostate', on);
Ue('slider', ln);
Ue('counter', cn);
Ue('links', Qn);
function ys({
  api: t,
  items: n = [],
  css: s = '',
  layout: o = 'default',
  readonly: r = !1,
  placement: E = 'sidebar',
  bottomBar: y = !0,
  topBar: x = !0,
  autoSave: g = !0,
  focus: l = !1,
  hotkeys: h = {},
}) {
  const V = We(_e.i18n),
    X = b(() => V || st({ ...rt, ...dt }), [V]),
    T = b(() => X.getGroup('gantt'), [X]),
    C = X.getRaw(),
    d = b(() => {
      const p = C.gantt?.dateFormat || C.formats?.dateFormat;
      return nt(p, C.calendar);
    }, [C]),
    K = b(() => {
      if (x === !0 && !r) {
        const p = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: T('Delete'),
            id: 'delete',
          },
        ];
        return g
          ? { items: p }
          : {
              items: [
                ...p,
                {
                  comp: 'button',
                  type: 'primary',
                  text: T('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return x;
    }, [x, r, g, T]),
    [j, M] = we(!1),
    Q = b(() => (j ? 'wx-full-screen' : ''), [j]),
    v = R((p) => {
      M(p);
    }, []);
  oe(() => {
    const p = Ht(v);
    return (
      p.observe(),
      () => {
        p.disconnect();
      }
    );
  }, [v]);
  const I = H(t, '_activeTask'),
    $ = H(t, 'activeTask'),
    Z = H(t, 'unscheduledTasks'),
    ae = H(t, 'summary'),
    le = H(t, 'links'),
    J = H(t, 'splitTasks'),
    ue = b(() => J && $?.segmentIndex, [J, $]),
    F = b(() => ue || ue === 0, [ue]),
    de = H(t, 'taskTypes'),
    ne = b(
      () => yn({ unscheduledTasks: Z, summary: ae, taskTypes: de }),
      [Z, ae, de],
    ),
    P = H(t, 'undo'),
    [N, re] = we({}),
    [ee, ie] = we(null),
    [xe, ye] = we(),
    [$e, Pe] = we(null),
    Ee = b(() => {
      if (!I) return null;
      let p;
      if ((F && I.segments ? (p = { ...I.segments[ue] }) : (p = { ...I }), r)) {
        let G = { parent: p.parent };
        return (
          ne.forEach(({ key: se, comp: B }) => {
            if (B !== 'links') {
              const q = p[se];
              B === 'date' && q instanceof Date
                ? (G[se] = d(q))
                : B === 'slider' && se === 'progress'
                  ? (G[se] = `${q}%`)
                  : (G[se] = q);
            }
          }),
          G
        );
      }
      return p || null;
    }, [I, F, ue, r, ne, d]);
  oe(() => {
    ye(Ee);
  }, [Ee]),
    oe(() => {
      re({}), Pe(null), ie(null);
    }, [$]);
  function k(p, G) {
    return p.map((se) => {
      const B = { ...se };
      if (
        (se.config && (B.config = { ...B.config }),
        B.comp === 'links' &&
          t &&
          ((B.api = t), (B.autoSave = g), (B.onLinksChange = L)),
        B.comp === 'select' && B.key === 'type')
      ) {
        const q = B.options ?? [];
        B.options = q.map((fe) => ({
          ...fe,
          label: T(fe.label),
        }));
      }
      return (
        B.comp === 'slider' &&
          B.key === 'progress' &&
          (B.labelTemplate = (q) => `${T(B.label)} ${q}%`),
        B.label && (B.label = T(B.label)),
        B.config?.placeholder &&
          (B.config.placeholder = T(B.config.placeholder)),
        G &&
          (B.isDisabled && B.isDisabled(G, t.getState())
            ? (B.disabled = !0)
            : delete B.disabled),
        B
      );
    });
  }
  const W = b(() => {
      let p = n.length ? n : ne;
      return (
        (p = k(p, xe)),
        xe ? p.filter((G) => !G.isHidden || !G.isHidden(xe, t.getState())) : p
      );
    }, [n, ne, xe, T, t, g]),
    z = b(() => W.map((p) => p.key), [W]);
  function L({ id: p, action: G, data: se }) {
    re((B) => ({
      ...B,
      [p]: { action: G, data: se },
    }));
  }
  const me = R(() => {
      for (let p in N)
        if (le.byId(p)) {
          const { action: G, data: se } = N[p];
          t.exec(G, se);
        }
    }, [t, N, le]),
    Y = R(() => {
      const p = $?.id || $;
      if (F) {
        if (I?.segments) {
          const G = I.segments.filter((se, B) => B !== ue);
          t.exec('update-task', {
            id: p,
            task: { segments: G },
          });
        }
      } else t.exec('delete-task', { id: p });
    }, [t, $, F, I, ue]),
    be = R(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    ve = R(
      (p) => {
        const { item: G, changes: se } = p;
        G.id === 'delete' && Y(),
          G.id === 'save' && (se.length ? be() : me()),
          G.comp && be();
      },
      [t, $, g, me, Y, be],
    ),
    Me = R(
      (p, G, se) => (
        Z && p.type === 'summary' && (p.unscheduled = !1),
        It(p, t.getState(), G),
        se || ie(!1),
        p
      ),
      [Z, t],
    ),
    A = R(
      (p) => {
        (p = {
          ...p,
          unscheduled: Z && p.unscheduled && p.type !== 'summary',
        }),
          delete p.links,
          delete p.data,
          (z.indexOf('duration') === -1 || (p.segments && !p.duration)) &&
            delete p.duration;
        const G = {
          id: $?.id || $,
          task: p,
          ...(F && { segmentIndex: ue }),
        };
        g && ee && (G.inProgress = ee), t.exec('update-task', G), g || me();
      },
      [t, $, Z, g, me, z, F, ue, ee],
    ),
    U = R(
      (p) => {
        let { update: G, key: se, input: B } = p;
        if ((B && ie(!0), (p.update = Me({ ...G }, se, B)), !g)) ye(p.update);
        else if (!$e && !B) {
          const q = W.find((Se) => Se.key === se),
            fe = G[se];
          (!q.validation || q.validation(fe)) &&
            (!q.required || fe) &&
            A(p.update);
        }
      },
      [g, Me, $e, W, A],
    ),
    ke = R(
      (p) => {
        g || A(p.values);
      },
      [g, A],
    ),
    De = R((p) => {
      Pe(p.errors);
    }, []),
    He = b(
      () =>
        P
          ? {
              'ctrl+z': (p) => {
                p.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (p) => {
                p.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [P, t],
    );
  return Ee
    ? /* @__PURE__ */ a(sn, {
        children: /* @__PURE__ */ a($n, {
          css: `wx-XkvqDXuw wx-gantt-editor ${Q} ${s}`,
          items: W,
          values: Ee,
          topBar: K,
          bottomBar: y,
          placement: E,
          layout: o,
          readonly: r,
          autoSave: g,
          focus: l,
          onAction: ve,
          onSave: ke,
          onValidation: De,
          onChange: U,
          hotkeys: h && { ...He, ...h },
        }),
      })
    : null;
}
const ks = ({ children: t, columns: n = null, api: s }) => {
  const [o, r] = we(null);
  return (
    oe(() => {
      s && s.getTable(!0).then(r);
    }, [s]),
    /* @__PURE__ */ a(bn, { api: o, columns: n, children: t })
  );
};
function vs(t) {
  const { api: n, content: s, children: o } = t,
    r = ce(null),
    E = ce(null),
    [y, x] = we({}),
    [g, l] = we(null),
    [h, V] = we({});
  function X(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const I = v.getAttribute('data-tooltip-id'),
          $ = v.getAttribute('data-tooltip-at'),
          Z = v.getAttribute('data-tooltip');
        if (I || Z) return { id: I, tooltip: Z, target: v, at: $ };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  oe(() => {
    const v = E.current;
    if (v && h && (h.text || s)) {
      const I = v.getBoundingClientRect();
      let $ = !1,
        Z = h.left,
        ae = h.top;
      I.right >= y.right && ((Z = y.width - I.width - 5), ($ = !0)),
        I.bottom >= y.bottom &&
          ((ae = h.top - (I.bottom - y.bottom + 2)), ($ = !0)),
        $ && V((le) => le && { ...le, left: Z, top: ae });
    }
  }, [h, y, s]);
  const T = ce(null),
    C = 300,
    d = (v) => {
      clearTimeout(T.current),
        (T.current = setTimeout(() => {
          v();
        }, C));
    };
  function K(v) {
    let { id: I, tooltip: $, target: Z, at: ae } = X(v.target);
    if ((V(null), l(null), !$))
      if (I) $ = M(I);
      else {
        clearTimeout(T.current);
        return;
      }
    const le = v.clientX;
    d(() => {
      I && l(j(Q(I)));
      const J = Z.getBoundingClientRect(),
        ue = r.current,
        F = ue
          ? ue.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let de, ne;
      ae === 'left'
        ? ((de = J.top + 5 - F.top), (ne = J.right + 5 - F.left))
        : ((de = J.top + J.height - F.top), (ne = le - F.left)),
        x(F),
        V({ top: de, left: ne, text: $ });
    });
  }
  function j(v) {
    return n?.getTask(Q(v)) || null;
  }
  function M(v) {
    return j(v)?.text || '';
  }
  function Q(v) {
    const I = parseInt(v);
    return isNaN(I) ? v : I;
  }
  return /* @__PURE__ */ Ae('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: r,
    onMouseMove: K,
    children: [
      h && (h.text || s)
        ? /* @__PURE__ */ a('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: E,
            style: { top: `${h.top}px`, left: `${h.left}px` },
            children: s
              ? /* @__PURE__ */ a(s, { data: g })
              : h.text
                ? /* @__PURE__ */ a('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: h.text,
                  })
                : null,
          })
        : null,
      o,
    ],
  });
}
function bs({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ a(pt, { fonts: t, children: n() })
    : /* @__PURE__ */ a(pt, { fonts: t });
}
function Ts({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ a(yt, { fonts: t, children: n })
    : /* @__PURE__ */ a(yt, { fonts: t });
}
function Cs({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ a(kt, { fonts: t, children: n })
    : /* @__PURE__ */ a(kt, { fonts: t });
}
const Jn = '2.6.0',
  es = {
    version: Jn,
  },
  $s = es.version;
export {
  ps as ContextMenu,
  ys as Editor,
  ws as Gantt,
  ks as HeaderMenu,
  bs as Material,
  xs as Toolbar,
  vs as Tooltip,
  Ts as Willow,
  Cs as WillowDark,
  Es as defaultColumns,
  Ds as defaultEditorItems,
  Ss as defaultMenuOptions,
  Ns as defaultTaskTypes,
  Is as defaultToolbarButtons,
  Ls as getEditorItems,
  As as getMenuOptions,
  Ps as getToolbarButtons,
  zs as registerEditorItem,
  Hs as registerScaleUnit,
  $s as version,
};
//# sourceMappingURL=index.es.js.map
