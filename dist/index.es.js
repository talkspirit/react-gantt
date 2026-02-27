import { jsxs as we, jsx as d, Fragment as Pe } from "react/jsx-runtime";
import { createContext as gt, useContext as ve, useMemo as b, useState as re, useCallback as k, useRef as ee, useEffect as Z, Fragment as wt, forwardRef as ct, useImperativeHandle as at } from "react";
import { context as Ee, Button as Ue, Field as pt, Text as yt, Combo as kt, DatePicker as bt, TimePicker as vt, Locale as Tt, RichSelect as Ct, TwoState as $t, Slider as Nt, Counter as Rt, Material as Ze, Willow as Je, WillowDark as et } from "@svar-ui/react-core";
import { locate as Le, locateID as Ie, locateAttr as Mt, dateToString as Ve, locale as Fe } from "@svar-ui/lib-dom";
import { en as Ke } from "@svar-ui/gantt-locales";
import { en as qe } from "@svar-ui/core-locales";
import { EventBusRouter as Et } from "@svar-ui/lib-state";
import { prepareEditTask as dt, grid as Lt, extendDragOptions as St, isSegmentMoveAllowed as Dt, DataStore as At, normalizeLinks as Ht, normalizeZoom as It, defaultColumns as zt, parseTaskDates as tt, defaultTaskTypes as Gt, getToolbarButtons as nt, handleAction as ut, isHandledAction as ft, getMenuOptions as st, getEditorItems as Wt } from "@svar-ui/gantt-store";
import { defaultColumns as Bn, defaultEditorItems as Xn, defaultMenuOptions as Yn, defaultTaskTypes as jn, defaultToolbarButtons as qn, getEditorItems as Qn, getMenuOptions as Un, getToolbarButtons as Zn, registerScaleUnit as Jn } from "@svar-ui/gantt-store";
import { useWritableProp as Ye, useStore as A, useStoreWithCounter as je, writable as Pt, useStoreLater as Se } from "@svar-ui/lib-react";
import { hotkeys as ht } from "@svar-ui/grid-store";
import { Grid as _t, HeaderMenu as Ot } from "@svar-ui/react-grid";
import { flushSync as Vt } from "react-dom";
import { Toolbar as rt } from "@svar-ui/react-toolbar";
import { ContextMenu as Ft } from "@svar-ui/react-menu";
import { Editor as Kt, registerEditorItem as Ge } from "@svar-ui/react-editor";
import { registerEditorItem as ts } from "@svar-ui/react-editor";
const De = gt(null);
function ze(t) {
  const n = t.getAttribute("data-id"), r = parseInt(n);
  return isNaN(r) || r.toString() != n ? n : r;
}
function Bt(t, n, r) {
  const s = t.getBoundingClientRect(), o = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: s.top - o.top,
    left: s.left - o.left,
    dt: s.bottom - r.clientY,
    db: r.clientY - s.top
  };
}
function ot(t) {
  return t && t.getAttribute("data-context-id");
}
const lt = 5;
function Xt(t, n) {
  let r, s, o, R, h, f, x, E, m;
  function P(a) {
    R = a.clientX, h = a.clientY, f = {
      ...Bt(r, t, a),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function T(a) {
    r = Le(a), ot(r) && (o = ze(r), m = setTimeout(() => {
      E = !0, n && n.touchStart && n.touchStart(), P(a.touches[0]);
    }, 500), t.addEventListener("touchmove", G), t.addEventListener("contextmenu", c), window.addEventListener("touchend", I));
  }
  function c(a) {
    if (E || m)
      return a.preventDefault(), !1;
  }
  function O(a) {
    a.which === 1 && (r = Le(a), ot(r) && (o = ze(r), t.addEventListener("mousemove", S), window.addEventListener("mouseup", C), P(a)));
  }
  function L(a) {
    t.removeEventListener("mousemove", S), t.removeEventListener("touchmove", G), document.body.removeEventListener("mouseup", C), document.body.removeEventListener("touchend", I), document.body.style.userSelect = "", a && (t.removeEventListener("mousedown", O), t.removeEventListener("touchstart", T));
  }
  function _(a) {
    const B = a.clientX - R, V = a.clientY - h;
    if (!s) {
      if (Math.abs(B) < lt && Math.abs(V) < lt || n && n.start && n.start({ id: o, e: a }) === !1)
        return;
      s = r.cloneNode(!0), s.style.pointerEvents = "none", s.classList.add("wx-reorder-task"), s.style.position = "absolute", s.style.left = f.left + "px", s.style.top = f.top + "px", r.style.visibility = "hidden", r.parentNode.insertBefore(s, r);
    }
    if (s) {
      const J = Math.round(Math.max(0, f.top + V));
      if (n && n.move && n.move({ id: o, top: J, detail: x }) === !1)
        return;
      const j = n.getTask(o), Q = j.$y;
      if (!f.start && f.y == Q) return H();
      f.start = !0, f.y = j.$y - 4, s.style.top = J + "px";
      const X = document.elementFromPoint(
        a.clientX,
        a.clientY
      ), z = Le(X);
      if (z && z !== r) {
        const U = ze(z), M = z.getBoundingClientRect(), i = M.top + M.height / 2, p = a.clientY + f.db > i && z.nextElementSibling !== r, W = a.clientY - f.dt < i && z.previousElementSibling !== r;
        x?.after == U || x?.before == U ? x = null : p ? x = { id: o, after: U } : W && (x = { id: o, before: U });
      }
    }
  }
  function S(a) {
    _(a);
  }
  function G(a) {
    E ? (a.preventDefault(), _(a.touches[0])) : m && (clearTimeout(m), m = null);
  }
  function I() {
    E = null, m && (clearTimeout(m), m = null), H();
  }
  function C() {
    H();
  }
  function H() {
    r && (r.style.visibility = ""), s && (s.parentNode.removeChild(s), n && n.end && n.end({ id: o, top: f.top })), o = r = s = f = x = null, L();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", O), t.addEventListener("touchstart", T), {
    destroy() {
      L(!0);
    }
  };
}
function Yt({ row: t, column: n }) {
  const r = ve(De);
  function s(R, h) {
    return {
      justifyContent: h.align,
      paddingLeft: `${(R.$level - 1) * 20}px`
    };
  }
  const o = n && n._cell;
  return /* @__PURE__ */ we("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ d(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ d("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ d("div", { className: "wx-pqc08MHU wx-text", children: o ? /* @__PURE__ */ d(o, { row: t, column: n, api: r }) : t.text })
  ] });
}
function it({ column: t, cell: n }) {
  const r = b(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ d("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ d(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": r
    }
  ) }) : null;
}
function jt(t) {
  const {
    readonly: n,
    compactMode: r,
    width: s = 0,
    display: o = "all",
    columnWidth: R = 0,
    onTableAPIChange: h
  } = t, [f, x] = Ye(R), [E, m] = re(), P = ve(Ee.i18n), T = b(() => P.getGroup("gantt"), [P]), c = ve(De), O = A(c, "scrollTop"), L = A(c, "cellHeight"), _ = A(c, "_scrollTask"), S = A(c, "_selected"), G = A(c, "area"), I = A(c, "_tasks"), C = A(c, "_scales"), H = A(c, "columns"), a = A(c, "_sort"), B = A(c, "calendar"), V = A(c, "durationUnit"), J = A(c, "splitTasks"), [j, Q] = re(null), X = b(() => !I || !G ? [] : I.slice(G.start, G.end), [I, G]), z = k(
    (l, g) => {
      if (g === "add-task")
        c.exec(g, {
          target: l,
          task: { text: T("New Task") },
          mode: "child",
          show: !0
        });
      else if (g === "open-task") {
        const $ = X.find((e) => e.id === l);
        ($?.data || $?.lazy) && c.exec(g, { id: l, mode: !$.open });
      }
    },
    [X]
  ), U = k(
    (l) => {
      const g = Ie(l), $ = l.target.dataset.action;
      $ && l.preventDefault(), g ? $ === "add-task" || $ === "open-task" ? z(g, $) : c.exec("select-task", {
        id: g,
        toggle: l.ctrlKey || l.metaKey,
        range: l.shiftKey,
        show: !0
      }) : $ === "add-task" && z(null, $);
    },
    [c, z]
  ), M = ee(null), i = ee(null), [p, W] = re(0), [D, Y] = re(!1);
  Z(() => {
    const l = i.current;
    if (!l || typeof ResizeObserver > "u") return;
    const g = () => W(l.clientWidth);
    g();
    const $ = new ResizeObserver(g);
    return $.observe(l), () => $.disconnect();
  }, []);
  const F = ee(null), de = k(
    (l) => {
      const g = l.id, { before: $, after: e } = l, u = l.onMove;
      let y = $ || e, N = $ ? "before" : "after";
      if (u) {
        if (N === "after") {
          const q = c.getTask(y);
          q.data?.length && q.open && (N = "before", y = q.data[0].id);
        }
        F.current = { id: g, [N]: y };
      } else F.current = null;
      c.exec("move-task", {
        id: g,
        mode: N,
        target: y,
        inProgress: u
      });
    },
    [c]
  ), ue = b(() => G?.from ?? 0, [G]), fe = b(() => C?.height ?? 0, [C]), le = b(() => !r && o !== "grid" ? (f ?? 0) > (s ?? 0) : (f ?? 0) > (p ?? 0), [r, o, f, s, p]), v = b(() => {
    const l = {};
    return le && o === "all" || o === "grid" && le ? l.width = f : o === "grid" && (l.width = "100%"), l;
  }, [le, o, f]), se = b(() => j && !X.find((l) => l.id === j.id) ? [...X, j] : X, [X, j]), te = b(() => {
    let l = (H || []).map((e) => {
      e = { ...e };
      const u = e.header;
      if (typeof u == "object") {
        const y = u.text && T(u.text);
        e.header = { ...u, text: y };
      } else e.header = T(u);
      if (e.cell && e.id !== "text" && e.id !== "add-task") {
        const y = e.cell;
        e.cell = (N) => /* @__PURE__ */ d(y, { ...N, api: c });
      }
      return e;
    });
    const g = l.findIndex((e) => e.id === "text"), $ = l.findIndex((e) => e.id === "add-task");
    if (g !== -1 && (l[g].cell && (l[g]._cell = l[g].cell), l[g].cell = Yt), $ !== -1) {
      l[$].cell = l[$].cell || it;
      const e = l[$].header;
      if (typeof e != "object" && (l[$].header = { text: e }), l[$].header.cell = e.cell || it, n)
        l.splice($, 1);
      else if (r) {
        const [u] = l.splice($, 1);
        l.unshift(u);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [H, T, n, r, c]), oe = b(() => o === "all" ? `${s}px` : o === "grid" ? "calc(100% - 4px)" : te.find((l) => l.id === "add-task") ? "50px" : "0", [o, s, te]), Te = b(() => {
    if (se && a?.length) {
      const l = {};
      return a.forEach(({ key: g, order: $ }, e) => {
        l[g] = {
          order: $,
          ...a.length > 1 && { index: e }
        };
      }), l;
    }
    return {};
  }, [se, a]), be = k(() => te.some((l) => l.flexgrow && !l.hidden), []), $e = b(() => be(), [be, D]), me = b(() => {
    let l = o === "chart" ? te.filter(($) => $.id === "add-task") : te;
    const g = o === "all" ? s : p;
    if (!$e) {
      let $ = f, e = !1;
      if (te.some((u) => u.$width)) {
        let u = 0;
        $ = te.reduce((y, N) => (N.hidden || (u += N.width, y += N.$width || N.width), y), 0), u > $ && $ > g && (e = !0);
      }
      if (e || $ < g) {
        let u = 1;
        return e || (u = (g - 50) / ($ - 50 || 1)), l.map((y) => (y.id !== "add-task" && !y.hidden && (y.$width || (y.$width = y.width), y.width = y.$width * u), y));
      }
    }
    return l;
  }, [o, te, $e, f, s, p]), ke = k(
    (l) => {
      if (!be()) {
        const g = me.reduce(($, e) => (l && e.$width && (e.$width = e.width), $ + (e.hidden ? 0 : e.width)), 0);
        g !== f && x(g);
      }
      Y(!0), Y(!1);
    },
    [be, me, f, x]
  ), Ce = k(() => {
    te.filter((g) => g.flexgrow && !g.hidden).length === 1 && te.forEach((g) => {
      g.$width && !g.flexgrow && !g.hidden && (g.width = g.$width);
    });
  }, []), ie = k(
    (l) => {
      if (!n) {
        const g = Ie(l), $ = Mt(l, "data-col-id");
        !($ && te.find((u) => u.id == $))?.editor && g && c.exec("show-editor", { id: g });
      }
    },
    [c, n]
    // cols is defined later; relies on latest value at call time
  ), xe = b(
    () => Array.isArray(S) ? S.map((l) => l.id) : [],
    [S]
  ), he = k(() => {
    if (M.current && se !== null) {
      const l = M.current.querySelector(".wx-body");
      l && (l.style.top = -((O ?? 0) - (ue ?? 0)) + "px");
    }
    i.current && (i.current.scrollTop = 0);
  }, [se, O, ue]);
  Z(() => {
    M.current && he();
  }, [O, ue, he]), Z(() => {
    const l = M.current;
    if (!l) return;
    const g = l.querySelector(".wx-table-box .wx-body");
    if (!g || typeof ResizeObserver > "u") return;
    const $ = new ResizeObserver(() => {
      he();
    });
    return $.observe(g), () => {
      $.disconnect();
    };
  }, [me, v, o, oe, se, he]), Z(() => {
    if (!_ || !E) return;
    const { id: l } = _, g = E.getState().focusCell;
    g && g.row !== l && M.current && M.current.contains(document.activeElement) && E.exec("focus-cell", {
      row: l,
      column: g.column
    });
  }, [_, E]);
  const w = k(
    ({ id: l }) => {
      if (n) return !1;
      c.getTask(l).open && c.exec("open-task", { id: l, mode: !1 });
      const g = c.getState()._tasks.find(($) => $.id === l);
      if (Q(g || null), !g) return !1;
    },
    [c, n]
  ), ne = k(
    ({ id: l, top: g }) => {
      F.current ? de({ ...F.current, onMove: !1 }) : c.exec("drag-task", {
        id: l,
        top: g + (ue ?? 0),
        inProgress: !1
      }), Q(null);
    },
    [c, de, ue]
  ), ce = k(
    ({ id: l, top: g, detail: $ }) => {
      $ && de({ ...$, onMove: !0 }), c.exec("drag-task", {
        id: l,
        top: g + (ue ?? 0),
        inProgress: !0
      });
    },
    [c, de, ue]
  );
  Z(() => {
    const l = M.current;
    return l ? Xt(l, {
      start: w,
      end: ne,
      move: ce,
      getTask: c.getTask
    }).destroy : void 0;
  }, [c, w, ne, ce]);
  const K = k(
    (l) => {
      const { key: g, isInput: $ } = l;
      if (!$ && (g === "arrowup" || g === "arrowdown"))
        return l.eventSource = "grid", c.exec("hotkey", l), !1;
      if (g === "enter") {
        const e = E?.getState().focusCell;
        if (e) {
          const { row: u, column: y } = e;
          y === "add-task" ? z(u, "add-task") : y === "text" && z(u, "open-task");
        }
      }
    },
    [c, z, E]
  ), ae = ee(null), Me = () => {
    ae.current = {
      setTableAPI: m,
      handleHotkey: K,
      sortVal: a,
      api: c,
      adjustColumns: Ce,
      setColumnWidth: ke,
      tasks: X,
      calendarVal: B,
      durationUnitVal: V,
      splitTasksVal: J,
      onTableAPIChange: h
    };
  };
  Me(), Z(() => {
    Me();
  }, [
    m,
    K,
    a,
    c,
    Ce,
    ke,
    X,
    B,
    V,
    J,
    h
  ]);
  const We = k((l) => {
    m(l), l.intercept("hotkey", (g) => ae.current.handleHotkey(g)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (g) => {
      const $ = ae.current.sortVal, { key: e, add: u } = g, y = $ ? $.find((q) => q.key === e) : null;
      let N = "asc";
      return y && (N = !y || y.order === "asc" ? "desc" : "asc"), c.exec("sort-tasks", {
        key: e,
        order: N,
        add: u
      }), !1;
    }), l.on("resize-column", () => {
      ae.current.setColumnWidth(!0);
    }), l.on("hide-column", (g) => {
      g.mode || ae.current.adjustColumns(), ae.current.setColumnWidth();
    }), l.intercept("update-cell", (g) => {
      const { id: $, column: e, value: u } = g, y = ae.current.tasks.find((N) => N.id === $);
      if (y) {
        const N = { ...y };
        let q = u;
        q && !isNaN(q) && !(q instanceof Date) && (q *= 1), N[e] = q, dt(
          N,
          {
            calendar: ae.current.calendarVal,
            durationUnit: ae.current.durationUnitVal,
            splitTasks: ae.current.splitTasksVal
          },
          e
        ), c.exec("update-task", {
          id: $,
          task: N
        });
      }
      return !1;
    }), h && h(l);
  }, []);
  return /* @__PURE__ */ d(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${oe}` },
      ref: i,
      children: /* @__PURE__ */ d(
        "div",
        {
          ref: M,
          style: v,
          className: "wx-rHj6070p wx-table",
          onClick: U,
          onDoubleClick: ie,
          children: /* @__PURE__ */ d(
            _t,
            {
              init: We,
              sizes: {
                rowHeight: L,
                headerHeight: (fe ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
              data: se,
              columns: me,
              selectedRows: [...xe],
              sortMarks: Te
            }
          )
        }
      )
    }
  );
}
function qt({ borders: t = "" }) {
  const n = ve(De), r = A(n, "cellWidth"), s = A(n, "cellHeight"), o = ee(null), [R, h] = re("#e4e4e4");
  Z(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const x = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      h(x ? x.substring(x.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const f = {
    width: "100%",
    height: "100%",
    background: r != null && s != null ? `url(${Lt(r, s, R, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ d("div", { ref: o, style: f });
}
function Qt({ onSelectLink: t, selectedLink: n, readonly: r }) {
  const s = ve(De), o = A(s, "_links"), R = A(s, "criticalPath"), h = ee(null), f = k(
    (x) => {
      const E = x?.target?.classList;
      !E?.contains("wx-line") && !E?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return Z(() => {
    if (!r && n && h.current) {
      const x = (E) => {
        h.current && !h.current.contains(E.target) && f(E);
      };
      return document.addEventListener("click", x), () => {
        document.removeEventListener("click", x);
      };
    }
  }, [r, n, f]), /* @__PURE__ */ we("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((x) => {
      const E = "wx-dkx3NwEn wx-line" + (R && x.$critical ? " wx-critical" : "") + (r ? "" : " wx-line-selectable");
      return /* @__PURE__ */ d(
        "polyline",
        {
          className: E,
          points: x.$p,
          onClick: () => !r && t(x.id),
          "data-link-id": x.id
        },
        x.id
      );
    }),
    !r && n && /* @__PURE__ */ d(
      "polyline",
      {
        ref: h,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function Ut(t) {
  const { task: n, type: r } = t;
  function s(R) {
    const h = n.segments[R];
    return {
      left: `${h.$x}px`,
      top: "0px",
      width: `${h.$w}px`,
      height: "100%"
    };
  }
  function o(R) {
    if (!n.progress) return 0;
    const h = n.duration * n.progress / 100, f = n.segments;
    let x = 0, E = 0, m = null;
    do {
      const P = f[E];
      E === R && (x > h ? m = 0 : m = Math.min((h - x) / P.duration, 1) * 100), x += P.duration, E++;
    } while (m === null && E < f.length);
    return m || 0;
  }
  return /* @__PURE__ */ d("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((R, h) => /* @__PURE__ */ we(
    "div",
    {
      className: `wx-segment wx-bar wx-${r} wx-GKbcLEGA`,
      "data-segment": h,
      style: s(h),
      children: [
        n.progress ? /* @__PURE__ */ d("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ d(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${o(h)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ d("div", { className: "wx-content", children: R.text || "" })
      ]
    },
    h
  )) });
}
function Zt(t) {
  const { readonly: n, taskTemplate: r } = t, s = ve(De), [o, R] = je(s, "_tasks"), [h, f] = je(s, "_links"), x = A(s, "area"), E = A(s, "_scales"), m = A(s, "taskTypes"), P = A(s, "baselines"), T = A(s, "_selected"), c = A(s, "_scrollTask"), O = A(s, "criticalPath"), L = A(s, "tasks"), _ = A(s, "schedule"), S = A(s, "splitTasks"), G = A(s, "summary"), I = b(() => {
    if (!x || !Array.isArray(o)) return [];
    const e = x.start ?? 0, u = x.end ?? 0;
    return o.slice(e, u).map((y) => ({ ...y }));
  }, [R, x]), C = b(
    () => E.lengthUnitWidth,
    [E]
  ), H = ee(!1), [a, B] = re(void 0), [V, J] = re(null), j = ee(null), [Q, X] = re(null), z = b(() => Q && {
    ...h.find((e) => e.id === Q)
  }, [Q, f]), [U, M] = re(void 0), i = ee(null), [p, W] = re(0), D = ee(null), Y = b(() => {
    const e = D.current;
    return !!(T.length && e && e.contains(document.activeElement));
  }, [T, D.current]), F = b(() => Y && T[T.length - 1]?.id, [Y, T]);
  Z(() => {
    if (c && Y && c) {
      const { id: e } = c, u = D.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      u && u.focus({ preventScroll: !0 });
    }
  }, [c]), Z(() => {
    const e = D.current;
    if (e && (W(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const u = new ResizeObserver((y) => {
        y[0] && W(y[0].contentRect.width);
      });
      return u.observe(e), () => u.disconnect();
    }
  }, [D.current]);
  const de = k(() => {
    document.body.style.userSelect = "none";
  }, []), ue = k(() => {
    document.body.style.userSelect = "";
  }, []), fe = k(
    (e, u, y) => {
      if (u.target.classList.contains("wx-line") || (y || (y = s.getTask(ze(e))), y.type === "milestone" || y.type === "summary")) return "";
      const N = Le(u, "data-segment");
      N && (e = N);
      const { left: q, width: ge } = e.getBoundingClientRect(), pe = (u.clientX - q) / ge;
      let ye = 0.2 / (ge > 200 ? ge / 200 : 1);
      return pe < ye ? "start" : pe > 1 - ye ? "end" : "";
    },
    [s]
  ), le = k(
    (e, u) => {
      const { clientX: y } = u, N = ze(e), q = s.getTask(N), ge = u.target.classList;
      if (!u.target.closest(".wx-delete-button") && !u.target.closest("[data-interactive]") && !n) {
        if (ge.contains("wx-progress-marker")) {
          const { progress: pe } = s.getTask(N);
          j.current = {
            id: N,
            x: y,
            progress: pe,
            dx: 0,
            node: e,
            marker: u.target
          }, u.target.classList.add("wx-progress-in-drag");
        } else {
          const pe = fe(e, u, q) || "move", ye = {
            id: N,
            mode: pe,
            x: y,
            dx: 0,
            l: q.$x,
            w: q.$w
          };
          if (S && q.segments?.length) {
            const Ne = Le(u, "data-segment");
            Ne && (ye.segmentIndex = Ne.dataset.segment * 1, St(q, ye));
          }
          J(ye);
        }
        de();
      }
    },
    [s, n, fe, de, S]
  ), v = k(
    (e) => {
      if (e.button !== 0) return;
      const u = Le(e);
      u && le(u, e);
    },
    [le]
  ), se = k(
    (e) => {
      const u = Le(e);
      u && (i.current = setTimeout(() => {
        M(!0), le(u, e.touches[0]);
      }, 300));
    },
    [le]
  ), te = k((e) => {
    X(e);
  }, []), oe = k(() => {
    if (j.current) {
      const { dx: e, id: u, marker: y, value: N } = j.current;
      j.current = null, typeof N < "u" && e && s.exec("update-task", {
        id: u,
        task: { progress: N },
        inProgress: !1
      }), y.classList.remove("wx-progress-in-drag"), H.current = !0, ue();
    } else if (V) {
      const { id: e, mode: u, dx: y, l: N, w: q, start: ge, segment: pe, index: ye } = V;
      if (J(null), ge) {
        const Ne = Math.round(y / C);
        if (!Ne)
          s.exec("drag-task", {
            id: e,
            width: q,
            left: N,
            inProgress: !1,
            ...pe && { segmentIndex: ye }
          });
        else {
          let He = {}, Ae = s.getTask(e);
          pe && (Ae = Ae.segments[ye]), u === "move" ? (He.start = Ae.start, He.end = Ae.end) : He[u] = Ae[u], s.exec("update-task", {
            id: e,
            diff: Ne,
            task: He,
            ...pe && { segmentIndex: ye }
          });
        }
        H.current = !0;
      }
      ue();
    }
  }, [s, ue, V, C]), Te = k(
    (e, u) => {
      const { clientX: y } = u;
      if (!n)
        if (j.current) {
          const { node: N, x: q, id: ge } = j.current, pe = j.current.dx = y - q, ye = Math.round(pe / N.offsetWidth * 100);
          let Ne = j.current.progress + ye;
          j.current.value = Ne = Math.min(
            Math.max(0, Ne),
            100
          ), s.exec("update-task", {
            id: ge,
            task: { progress: Ne },
            inProgress: !0
          });
        } else if (V) {
          te(null);
          const { mode: N, l: q, w: ge, x: pe, id: ye, start: Ne, segment: He, index: Ae } = V, Be = s.getTask(ye), Re = y - pe, Qe = Math.round(C) || 1;
          if (!Ne && Math.abs(Re) < 20 || N === "start" && ge - Re < Qe || N === "end" && ge + Re < Qe || N === "move" && (Re < 0 && q + Re < 0 || Re > 0 && q + ge + Re > p) || V.segment && !Dt(Be, V))
            return;
          const Xe = { ...V, dx: Re };
          let _e, Oe;
          if (N === "start" ? (_e = q + Re, Oe = ge - Re) : N === "end" ? (_e = q, Oe = ge + Re) : N === "move" && (_e = q + Re, Oe = ge), s.exec("drag-task", {
            id: ye,
            width: Oe,
            left: _e,
            inProgress: !0,
            start: Ne,
            ...He && { segmentIndex: Ae }
          }), !Xe.start && (N === "move" && Be.$x == q || N !== "move" && Be.$w == ge)) {
            H.current = !0, oe();
            return;
          }
          Xe.start = !0, J(Xe);
        } else {
          const N = Le(e);
          if (N) {
            const q = s.getTask(ze(N)), pe = Le(e, "data-segment") || N, ye = fe(pe, u, q);
            pe.style.cursor = ye && !n ? "col-resize" : "pointer";
          }
        }
    },
    [
      s,
      n,
      V,
      C,
      p,
      fe,
      te,
      oe
    ]
  ), be = k(
    (e) => {
      Te(e, e);
    },
    [Te]
  ), $e = k(
    (e) => {
      U ? (e.preventDefault(), Te(e, e.touches[0])) : i.current && (clearTimeout(i.current), i.current = null);
    },
    [U, Te]
  ), me = k(() => {
    oe();
  }, [oe]), ke = k(() => {
    M(null), i.current && (clearTimeout(i.current), i.current = null), oe();
  }, [oe]);
  Z(() => (window.addEventListener("mouseup", me), () => {
    window.removeEventListener("mouseup", me);
  }), [me]);
  const Ce = k(
    (e) => {
      if (!n) {
        if (e.target.closest("[data-interactive]")) return;
        const u = Ie(e.target);
        if (u && !e.target.classList.contains("wx-link")) {
          const y = Ie(e.target, "data-segment");
          s.exec("show-editor", {
            id: u,
            ...y !== null && { segmentIndex: y }
          });
        }
      }
    },
    [s, n]
  ), ie = ["e2s", "s2s", "e2e", "s2e"], xe = k((e, u) => ie[(e ? 1 : 0) + (u ? 0 : 2)], []), he = k(
    (e, u) => {
      const y = a.id, N = a.start;
      return e === y ? !0 : !!h.find((q) => q.target == e && q.source == y && q.type === xe(N, u));
    },
    [a, f, xe]
  ), w = k(() => {
    a && B(null);
  }, [a]), ne = k(
    (e) => {
      if (H.current) {
        H.current = !1;
        return;
      }
      if (e.target.closest("[data-interactive]")) return;
      const u = Ie(e.target);
      if (u) {
        const y = e.target.classList;
        if (y.contains("wx-link")) {
          const N = y.contains("wx-left");
          if (!a) {
            B({ id: u, start: N });
            return;
          }
          a.id !== u && !he(u, N) && s.exec("add-link", {
            link: {
              source: a.id,
              target: u,
              type: xe(a.start, N)
            }
          });
        } else if (y.contains("wx-delete-button-icon"))
          s.exec("delete-link", { id: Q }), X(null);
        else {
          let N;
          const q = Le(e, "data-segment");
          q && (N = q.dataset.segment * 1), s.exec("select-task", {
            id: u,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: N
          });
        }
      }
      w();
    },
    [
      s,
      a,
      f,
      z,
      he,
      xe,
      w
    ]
  ), ce = k((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), K = k((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), ae = k(
    (e) => {
      if (U || i.current)
        return e.preventDefault(), !1;
    },
    [U]
  ), Me = b(
    () => m.map((e) => e.id),
    [m]
  ), We = k(
    (e) => {
      let u = Me.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (u = `task ${u}`), u;
    },
    [Me]
  ), l = k(
    (e) => {
      s.exec(e.action, e.data);
    },
    [s]
  ), g = k(
    (e) => O && L.byId(e).$critical,
    [O, L]
  ), $ = k(
    (e) => {
      if (_?.auto) {
        const u = L.getSummaryId(e, !0), y = L.getSummaryId(a.id, !0);
        return a?.id && !(Array.isArray(u) ? u : [u]).includes(
          a.id
        ) && !(Array.isArray(y) ? y : [y]).includes(e);
      }
      return a;
    },
    [_, L, a]
  );
  return /* @__PURE__ */ we(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${I.length ? I[0].$h : 0}px` },
      ref: D,
      onContextMenu: ae,
      onMouseDown: v,
      onMouseMove: be,
      onTouchStart: se,
      onTouchMove: $e,
      onTouchEnd: ke,
      onClick: ne,
      onDoubleClick: Ce,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ d(
          Qt,
          {
            onSelectLink: te,
            selectedLink: z,
            readonly: n
          }
        ),
        I.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const u = `wx-bar wx-${We(e.type)}` + (U && V && e.id === V.id ? " wx-touch" : "") + (a && a.id === e.id ? " wx-selected" : "") + (g(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (S && e.segments ? " wx-split" : ""), y = "wx-link wx-left" + (a ? " wx-visible" : "") + (!a || !he(e.id, !0) && $(e.id) ? " wx-target" : "") + (a && a.id === e.id && a.start ? " wx-selected" : "") + (g(e.id) ? " wx-critical" : ""), N = "wx-link wx-right" + (a ? " wx-visible" : "") + (!a || !he(e.id, !1) && $(e.id) ? " wx-target" : "") + (a && a.id === e.id && !a.start ? " wx-selected" : "") + (g(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ we(wt, { children: [
            !e.$skip && /* @__PURE__ */ we(
              "div",
              {
                className: "wx-GKbcLEGA " + u,
                style: ce(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: F === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === z?.target && z?.type[2] === "s" ? /* @__PURE__ */ d(
                    Ue,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ d("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA " + y, children: /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ we(Pe, { children: [
                    e.progress && !(S && e.segments) ? /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(S && e.segments) && !(e.type == "summary" && G?.autoProgress) ? /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    r ? /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content", children: /* @__PURE__ */ d(r, { data: e, api: s, onAction: l }) }) : S && e.segments ? /* @__PURE__ */ d(Ut, { task: e, type: We(e.type) }) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" })
                  ] }) : /* @__PURE__ */ we(Pe, { children: [
                    /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content" }),
                    r ? /* @__PURE__ */ d(r, { data: e, api: s, onAction: l }) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === z?.target && z?.type[2] === "e" ? /* @__PURE__ */ d(
                    Ue,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ d("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA " + N, children: /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            P && !e.$skip_baseline ? /* @__PURE__ */ d(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: K(e)
              }
            ) : null
          ] }, e.id);
        })
      ]
    }
  );
}
function Jt(t) {
  const { highlightTime: n } = t, r = ve(De), s = A(r, "_scales");
  return /* @__PURE__ */ d("div", { className: "wx-ZkvhDKir wx-scale", style: { width: s.width }, children: (s?.rows || []).map((o, R) => /* @__PURE__ */ d(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((h, f) => {
        const x = n ? n(h.date, h.unit) : "", E = "wx-cell " + (h.css || "") + " " + (x || "");
        return /* @__PURE__ */ d(
          "div",
          {
            className: "wx-ZkvhDKir " + E,
            style: { width: `${h.width}px` },
            children: h.value
          },
          f
        );
      })
    },
    R
  )) });
}
const en = /* @__PURE__ */ new Map();
function tn(t) {
  const n = ee(null), r = ee(0), s = ee(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), r.current++, Z(() => {
    if (o)
      return cancelAnimationFrame(s.current), s.current = requestAnimationFrame(() => {
        const R = {
          label: t,
          time: performance.now() - n.current,
          renders: r.current,
          timestamp: Date.now()
        };
        en.set(t, R), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: R })
        );
      }), () => cancelAnimationFrame(s.current);
  });
}
function nn(t) {
  const {
    readonly: n,
    fullWidth: r,
    fullHeight: s,
    taskTemplate: o,
    cellBorders: R,
    highlightTime: h
  } = t, f = ve(De), [x, E] = je(f, "_selected"), m = A(f, "scrollTop"), P = A(f, "cellHeight"), T = A(f, "cellWidth"), c = A(f, "_scales"), O = A(f, "_markers"), L = A(f, "_scrollTask"), _ = A(f, "zoom"), [S, G] = re(), I = ee(null), C = 1 + (c?.rows?.length || 0), H = b(() => {
    const i = [];
    return x && x.length && P && x.forEach((p) => {
      i.push({ height: `${P}px`, top: `${p.$y - 3}px` });
    }), i;
  }, [E, P]), a = b(
    () => Math.max(S || 0, s),
    [S, s]
  );
  Z(() => {
    const i = I.current;
    i && typeof m == "number" && (i.scrollTop = m);
  }, [m]);
  const B = () => {
    V();
  };
  function V(i) {
    const p = I.current;
    if (!p) return;
    const W = {};
    W.left = p.scrollLeft, f.exec("scroll-chart", W);
  }
  function J() {
    const i = I.current, W = Math.ceil((S || 0) / (P || 1)) + 1, D = Math.floor((i && i.scrollTop || 0) / (P || 1)), Y = Math.max(0, D - C), F = D + W + C, de = Y * (P || 0);
    f.exec("render-data", {
      start: Y,
      end: F,
      from: de
    });
  }
  Z(() => {
    J();
  }, [S, m]);
  const j = k(
    (i) => {
      if (!i) return;
      const { id: p, mode: W } = i;
      if (W.toString().indexOf("x") < 0) return;
      const D = I.current;
      if (!D) return;
      const { clientWidth: Y } = D, F = f.getTask(p);
      if (F.$x + F.$w < D.scrollLeft)
        f.exec("scroll-chart", { left: F.$x - (T || 0) }), D.scrollLeft = F.$x - (T || 0);
      else if (F.$x >= Y + D.scrollLeft) {
        const de = Y < F.$w ? T || 0 : F.$w;
        f.exec("scroll-chart", { left: F.$x - Y + de }), D.scrollLeft = F.$x - Y + de;
      }
    },
    [f, T]
  );
  Z(() => {
    j(L);
  }, [L]);
  function Q(i) {
    if (_ && (i.ctrlKey || i.metaKey)) {
      i.preventDefault();
      const p = I.current, W = -Math.sign(i.deltaY), D = i.clientX - (p ? p.getBoundingClientRect().left : 0);
      f.exec("zoom-scale", {
        dir: W,
        offset: D
      });
    }
  }
  function X(i) {
    const p = h(i.date, i.unit);
    return p ? {
      css: p,
      width: i.width
    } : null;
  }
  const z = b(() => c && (c.minUnit === "hour" || c.minUnit === "day") && h ? c.rows[c.rows.length - 1].cells.map(X) : null, [c, h]), U = k(
    (i) => {
      i.eventSource = "chart", f.exec("hotkey", i);
    },
    [f]
  );
  Z(() => {
    const i = I.current;
    if (!i) return;
    const p = () => G(i.clientHeight);
    p();
    const W = new ResizeObserver(() => p());
    return W.observe(i), () => {
      W.disconnect();
    };
  }, [I.current]);
  const M = ee(null);
  return Z(() => {
    const i = I.current;
    if (i && !M.current)
      return M.current = ht(i, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (p) => U(p)
      }), () => {
        M.current?.destroy(), M.current = null;
      };
  }, []), Z(() => {
    const i = I.current;
    if (!i) return;
    const p = Q;
    return i.addEventListener("wheel", p), () => {
      i.removeEventListener("wheel", p);
    };
  }, [Q]), tn("chart"), /* @__PURE__ */ we(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: I,
      onScroll: B,
      children: [
        /* @__PURE__ */ d(Jt, { highlightTime: h, scales: c }),
        O && O.length ? /* @__PURE__ */ d(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${a}px` },
            children: O.map((i, p) => /* @__PURE__ */ d(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${i.css || ""}`,
                style: { left: `${i.left}px` },
                children: /* @__PURE__ */ d("div", { className: "wx-mR7v2Xag wx-content", children: i.text })
              },
              p
            ))
          }
        ) : null,
        /* @__PURE__ */ we(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${r}px`, height: `${a}px` },
            children: [
              z ? /* @__PURE__ */ d(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: z.map(
                    (i, p) => i ? /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + i.css,
                        style: {
                          width: `${i.width}px`,
                          left: `${p * i.width}px`
                        }
                      },
                      p
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ d(qt, { borders: R }),
              x && x.length ? x.map(
                (i, p) => i.$y ? /* @__PURE__ */ d(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": i.id,
                    style: H[p]
                  },
                  i.id
                ) : null
              ) : null,
              /* @__PURE__ */ d(Zt, { readonly: n, taskTemplate: o })
            ]
          }
        )
      ]
    }
  );
}
function sn(t) {
  const {
    position: n = "after",
    size: r = 4,
    dir: s = "x",
    onMove: o,
    onDisplayChange: R,
    compactMode: h,
    containerWidth: f = 0,
    leftThreshold: x = 50,
    rightThreshold: E = 50
  } = t, [m, P] = Ye(t.value ?? 0), [T, c] = Ye(t.display ?? "all");
  function O(W) {
    let D = 0;
    n == "center" ? D = r / 2 : n == "before" && (D = r);
    const Y = {
      size: [r + "px", "auto"],
      p: [W - D + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (s != "x")
      for (let F in Y) Y[F] = Y[F].reverse();
    return Y;
  }
  const [L, _] = re(!1), [S, G] = re(null), I = ee(0), C = ee(), H = ee(), a = ee(T);
  Z(() => {
    a.current = T;
  }, [T]), Z(() => {
    S === null && m > 0 && G(m);
  }, [S, m]);
  function B(W) {
    return s == "x" ? W.clientX : W.clientY;
  }
  const V = k(
    (W) => {
      const D = C.current + B(W) - I.current;
      P(D);
      let Y;
      D <= x ? Y = "chart" : f - D <= E ? Y = "grid" : Y = "all", a.current !== Y && (c(Y), a.current = Y), H.current && clearTimeout(H.current), H.current = setTimeout(() => o && o(D), 100);
    },
    [f, x, E, o]
  ), J = k(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", _(!1), window.removeEventListener("mousemove", V), window.removeEventListener("mouseup", J);
  }, [V]), j = b(
    () => T !== "all" ? "auto" : s == "x" ? "ew-resize" : "ns-resize",
    [T, s]
  ), Q = k(
    (W) => {
      !h && (T === "grid" || T === "chart") || (I.current = B(W), C.current = m, _(!0), document.body.style.cursor = j, document.body.style.userSelect = "none", window.addEventListener("mousemove", V), window.addEventListener("mouseup", J));
    },
    [j, V, J, m, h, T]
  );
  function X() {
    c("all"), S !== null && (P(S), o && o(S));
  }
  function z(W) {
    if (h) {
      const D = T === "chart" ? "grid" : "chart";
      c(D), R(D);
    } else if (T === "grid" || T === "chart")
      X(), R("all");
    else {
      const D = W === "left" ? "chart" : "grid";
      c(D), R(D);
    }
  }
  function U() {
    z("left");
  }
  function M() {
    z("right");
  }
  const i = b(() => O(m), [m, n, r, s]), p = [
    "wx-resizer",
    `wx-resizer-${s}`,
    `wx-resizer-display-${T}`,
    L ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ we(
    "div",
    {
      className: "wx-pFykzMlT " + p,
      onMouseDown: Q,
      style: { width: i.size[0], height: i.size[1], cursor: j },
      children: [
        /* @__PURE__ */ we("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ d(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: U
            }
          ) }),
          /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ d(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: M
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const rn = 650;
function mt(t) {
  let n;
  function r() {
    n = new ResizeObserver((o) => {
      for (let R of o)
        if (R.target === document.body) {
          let h = R.contentRect.width <= rn;
          t(h);
        }
    }), n.observe(document.body);
  }
  function s() {
    n && (n.disconnect(), n = null);
  }
  return {
    observe: r,
    disconnect: s
  };
}
function on(t) {
  const {
    taskTemplate: n,
    readonly: r,
    cellBorders: s,
    highlightTime: o,
    onTableAPIChange: R
  } = t, h = ve(De), f = A(h, "_tasks"), x = A(h, "_scales"), E = A(h, "cellHeight"), m = A(h, "columns"), P = A(h, "_scrollTask"), T = A(h, "undo"), [c, O] = re(!1);
  let [L, _] = re(0);
  const [S, G] = re(0), [I, C] = re(0), [H, a] = re(void 0), [B, V] = re("all"), J = ee(null), j = k(
    (v) => {
      O((se) => (v !== se && (v ? (J.current = B, B === "all" && V("grid")) : (!J.current || J.current === "all") && V("all")), v));
    },
    [B]
  );
  Z(() => {
    const v = mt(j);
    return v.observe(), () => {
      v.disconnect();
    };
  }, [j]);
  const Q = b(() => {
    let v;
    return m.every((se) => se.width && !se.flexgrow) ? v = m.reduce((se, te) => se + parseInt(te.width), 0) : c && B === "chart" ? v = parseInt(m.find((se) => se.id === "action")?.width) || 50 : v = 440, L = v, v;
  }, [m, c, B]);
  Z(() => {
    _(Q);
  }, [Q]);
  const X = b(
    () => (S ?? 0) - (H ?? 0),
    [S, H]
  ), z = b(() => x.width, [x]), U = b(
    () => f.length * E,
    [f, E]
  ), M = b(
    () => x.height + U + X,
    [x, U, X]
  ), i = b(
    () => L + z,
    [L, z]
  ), p = ee(null), W = k(() => {
    Promise.resolve().then(() => {
      if ((S ?? 0) > (i ?? 0)) {
        const v = (S ?? 0) - L;
        h.exec("expand-scale", { minWidth: v });
      }
    });
  }, [S, i, L, h]);
  Z(() => {
    let v;
    return p.current && (v = new ResizeObserver(W), v.observe(p.current)), () => {
      v && v.disconnect();
    };
  }, [p.current, W]), Z(() => {
    W();
  }, [z]);
  const D = ee(null), Y = ee(null), F = k(() => {
    const v = D.current;
    v && h.exec("scroll-chart", {
      top: v.scrollTop
    });
  }, [h]), de = ee({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  Z(() => {
    de.current = {
      rTasks: f,
      rScales: x,
      rCellHeight: E,
      scrollSize: X,
      ganttDiv: D.current,
      ganttHeight: I ?? 0
    };
  }, [f, x, E, X, I]);
  const ue = k(
    (v) => {
      if (!v) return;
      const {
        rTasks: se,
        rScales: te,
        rCellHeight: oe,
        scrollSize: Te,
        ganttDiv: be,
        ganttHeight: $e
      } = de.current;
      if (!be) return;
      const { id: me } = v, ke = se.findIndex((Ce) => Ce.id === me);
      if (ke > -1) {
        const Ce = $e - te.height, ie = ke * oe, xe = be.scrollTop;
        let he = null;
        ie < xe ? he = ie : ie + oe > xe + Ce && (he = ie - Ce + oe + Te), he !== null && (h.exec("scroll-chart", { top: Math.max(he, 0) }), D.current.scrollTop = Math.max(he, 0));
      }
    },
    [h]
  );
  Z(() => {
    ue(P);
  }, [P]), Z(() => {
    const v = D.current, se = Y.current;
    if (!v || !se) return;
    const te = () => {
      Vt(() => {
        C(v.offsetHeight), G(v.offsetWidth), a(se.offsetWidth);
      });
    }, oe = new ResizeObserver(te);
    return oe.observe(v), () => oe.disconnect();
  }, [D.current]);
  const fe = ee(null), le = ee(null);
  return Z(() => {
    le.current && (le.current.destroy(), le.current = null);
    const v = fe.current;
    if (v)
      return le.current = ht(v, {
        keys: {
          "ctrl+c": !0,
          "ctrl+v": !0,
          "ctrl+x": !0,
          "ctrl+d": !0,
          backspace: !0,
          "ctrl+z": T,
          "ctrl+y": T
        },
        exec: (se) => {
          se.isInput || h.exec("hotkey", se);
        }
      }), () => {
        le.current?.destroy(), le.current = null;
      };
  }, [T]), /* @__PURE__ */ d("div", { className: "wx-jlbQoHOz wx-gantt", ref: D, onScroll: F, children: /* @__PURE__ */ d(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: M, width: "100%" },
      ref: Y,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: I,
            width: H
          },
          children: /* @__PURE__ */ we("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: fe, children: [
            m.length ? /* @__PURE__ */ we(Pe, { children: [
              /* @__PURE__ */ d(
                jt,
                {
                  display: B,
                  compactMode: c,
                  columnWidth: Q,
                  width: L,
                  readonly: r,
                  fullHeight: U,
                  onTableAPIChange: R
                }
              ),
              /* @__PURE__ */ d(
                sn,
                {
                  value: L,
                  display: B,
                  compactMode: c,
                  containerWidth: S,
                  onMove: (v) => _(v),
                  onDisplayChange: (v) => V(v)
                }
              )
            ] }) : null,
            /* @__PURE__ */ d("div", { className: "wx-jlbQoHOz wx-content", ref: p, children: /* @__PURE__ */ d(
              nn,
              {
                readonly: r,
                fullWidth: z,
                fullHeight: U,
                taskTemplate: n,
                cellBorders: s,
                highlightTime: o
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function ln(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function cn(t, n) {
  return typeof t == "function" ? t : Ve(t, n);
}
function xt(t, n) {
  return t.map(({ format: r, ...s }) => ({
    ...s,
    format: cn(r, n)
  }));
}
function an(t, n) {
  const r = ln(n);
  for (let s in r)
    r[s] = Ve(r[s], t);
  return r;
}
function dn(t, n) {
  if (!t || !t.length) return t;
  const r = Ve("%d-%m-%Y", n);
  return t.map((s) => s.template ? s : s.id === "start" || s.id == "end" ? {
    ...s,
    //store locale template for unscheduled tasks
    _template: (o) => r(o),
    template: (o) => r(o)
  } : s.id === "duration" ? {
    ...s,
    _template: (o) => o,
    template: (o) => o
  } : s);
}
function un(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((r) => ({
      ...r,
      scales: xt(r.scales, n)
    }))
  } : t;
}
const fn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), hn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], An = ct(function({
  taskTemplate: n = null,
  markers: r = [],
  taskTypes: s = Gt,
  tasks: o = [],
  selected: R = [],
  activeTask: h = null,
  links: f = [],
  scales: x = hn,
  columns: E = zt,
  start: m = null,
  end: P = null,
  lengthUnit: T = "day",
  durationUnit: c = "day",
  cellWidth: O = 100,
  cellHeight: L = 38,
  scaleHeight: _ = 36,
  readonly: S = !1,
  cellBorders: G = "full",
  zoom: I = !1,
  baselines: C = !1,
  highlightTime: H = null,
  init: a = null,
  autoScale: B = !0,
  unscheduledTasks: V = !1,
  criticalPath: J = null,
  schedule: j = { type: "forward" },
  projectStart: Q = null,
  projectEnd: X = null,
  calendar: z = null,
  undo: U = !1,
  splitTasks: M = !1,
  summary: i = null,
  _export: p = !1,
  ...W
}, D) {
  const Y = ee();
  Y.current = W;
  const F = b(() => new At(Pt), []), de = b(() => ({ ...qe, ...Ke }), []), ue = ve(Ee.i18n), fe = b(() => ue ? ue.extend(de, !0) : Fe(de), [ue, de]), le = b(() => fe.getRaw().calendar, [fe]), v = b(() => {
    let ie = {
      zoom: un(I, le),
      scales: xt(x, le),
      columns: dn(E, le),
      links: Ht(f),
      cellWidth: O
    };
    return ie.zoom && (ie = {
      ...ie,
      ...It(
        ie.zoom,
        an(le, fe.getGroup("gantt")),
        ie.scales,
        O
      )
    }), ie;
  }, [I, x, E, f, O, le, fe]), se = ee(null);
  se.current !== o && (p || tt(o, { durationUnit: c, splitTasks: M, calendar: z }), se.current = o), Z(() => {
    p || tt(o, { durationUnit: c, splitTasks: M, calendar: z });
  }, [o, c, z, M, p]);
  const te = b(() => F.in, [F]), oe = ee(null);
  oe.current === null && (oe.current = new Et((ie, xe) => {
    const he = "on" + fn(ie);
    Y.current && Y.current[he] && Y.current[he](xe);
  }), te.setNext(oe.current));
  const [Te, be] = re(null), $e = ee(null);
  $e.current = Te;
  const me = b(
    () => ({
      getState: F.getState.bind(F),
      getReactiveState: F.getReactive.bind(F),
      getStores: () => ({ data: F }),
      exec: te.exec.bind(te),
      setNext: (ie) => (oe.current = oe.current.setNext(ie), oe.current),
      intercept: te.intercept.bind(te),
      on: te.on.bind(te),
      detach: te.detach.bind(te),
      getTask: F.getTask.bind(F),
      serialize: () => F.serialize(),
      getTable: (ie) => ie ? new Promise((xe) => setTimeout(() => xe($e.current), 1)) : $e.current,
      getHistory: () => F.getHistory()
    }),
    [F, te]
  );
  at(
    D,
    () => ({
      ...me
    }),
    [me]
  );
  const ke = ee(0);
  Z(() => {
    ke.current ? F.init({
      tasks: o,
      links: v.links,
      start: m,
      columns: v.columns,
      end: P,
      lengthUnit: T,
      cellWidth: v.cellWidth,
      cellHeight: L,
      scaleHeight: _,
      scales: v.scales,
      taskTypes: s,
      zoom: v.zoom,
      selected: R,
      activeTask: h,
      baselines: C,
      autoScale: B,
      unscheduledTasks: V,
      markers: r,
      durationUnit: c,
      criticalPath: J,
      schedule: j,
      projectStart: Q,
      projectEnd: X,
      calendar: z,
      undo: U,
      _weekStart: le.weekStart,
      splitTasks: M,
      summary: i
    }) : a && a(me), ke.current++;
  }, [
    me,
    a,
    o,
    v,
    m,
    P,
    T,
    L,
    _,
    s,
    R,
    h,
    C,
    B,
    V,
    r,
    c,
    J,
    j,
    Q,
    X,
    z,
    U,
    le,
    M,
    i,
    F
  ]), ke.current === 0 && F.init({
    tasks: o,
    links: v.links,
    start: m,
    columns: v.columns,
    end: P,
    lengthUnit: T,
    cellWidth: v.cellWidth,
    cellHeight: L,
    scaleHeight: _,
    scales: v.scales,
    taskTypes: s,
    zoom: v.zoom,
    selected: R,
    activeTask: h,
    baselines: C,
    autoScale: B,
    unscheduledTasks: V,
    markers: r,
    durationUnit: c,
    criticalPath: J,
    schedule: j,
    projectStart: Q,
    projectEnd: X,
    calendar: z,
    undo: U,
    _weekStart: le.weekStart,
    splitTasks: M,
    summary: i
  });
  const Ce = b(() => z ? (ie, xe) => xe == "day" && !z.getDayHours(ie) || xe == "hour" && !z.getDayHours(ie) ? "wx-weekend" : "" : H, [z, H]);
  return /* @__PURE__ */ d(Ee.i18n.Provider, { value: fe, children: /* @__PURE__ */ d(De.Provider, { value: me, children: /* @__PURE__ */ d(
    on,
    {
      taskTemplate: n,
      readonly: S,
      cellBorders: G,
      highlightTime: Ce,
      onTableAPIChange: be
    }
  ) }) });
});
function Hn({ api: t = null, items: n = [] }) {
  const r = ve(Ee.i18n), s = b(() => r || Fe(Ke), [r]), o = b(() => s.getGroup("gantt"), [s]), R = Se(t, "_selected"), h = Se(t, "undo"), f = Se(t, "history"), x = Se(t, "splitTasks"), E = ["undo", "redo"], m = b(() => {
    const T = nt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : nt({
      undo: h,
      splitTasks: x
    })).map((O) => {
      let L = { ...O, disabled: !1 };
      return L.handler = ft(T, L.id) ? (_) => ut(t, _.id, null, o) : L.handler, L.text && (L.text = o(L.text)), L.menuText && (L.menuText = o(L.menuText)), L;
    });
  }, [n, t, o, h, x]), P = b(() => {
    const T = [];
    return m.forEach((c) => {
      const O = c.id;
      if (O === "add-task")
        T.push(c);
      else if (E.includes(O))
        E.includes(O) && T.push({
          ...c,
          disabled: c.isDisabled(f)
        });
      else {
        if (!R?.length || !t) return;
        T.push({
          ...c,
          disabled: c.isDisabled && R.some((L) => c.isDisabled(L, t.getState()))
        });
      }
    }), T.filter((c, O) => {
      if (t && c.isHidden)
        return !R.some((L) => c.isHidden(L, t.getState()));
      if (c.comp === "separator") {
        const L = T[O + 1];
        if (!L || L.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, R, f, m]);
  return r ? /* @__PURE__ */ d(rt, { items: P }) : /* @__PURE__ */ d(Ee.i18n.Provider, { value: s, children: /* @__PURE__ */ d(rt, { items: P }) });
}
const In = ct(function({
  options: n = [],
  api: r = null,
  resolver: s = null,
  filter: o = null,
  at: R = "point",
  children: h,
  onClick: f,
  css: x
}, E) {
  const m = ee(null), P = ee(null), T = ve(Ee.i18n), c = b(() => T || Fe({ ...Ke, ...qe }), [T]), O = b(() => c.getGroup("gantt"), [c]), L = Se(r, "taskTypes"), _ = Se(r, "selected"), S = Se(r, "_selected"), G = Se(r, "splitTasks"), I = Se(r, "summary"), C = b(
    () => ({
      splitTasks: G,
      taskTypes: L,
      summary: I
    }),
    [G, L, I]
  ), H = b(() => st(C), [C]);
  Z(() => {
    r && (r.on("scroll-chart", () => {
      m.current && m.current.show && m.current.show();
    }), r.on("drag-task", () => {
      m.current && m.current.show && m.current.show();
    }));
  }, [r]);
  function a(M) {
    return M.map((i) => (i = { ...i }, i.text && (i.text = O(i.text)), i.subtext && (i.subtext = O(i.subtext)), i.data && (i.data = a(i.data)), i));
  }
  function B() {
    const M = n.length ? n : st(C);
    return a(M);
  }
  const V = b(() => B(), [r, n, C, O]), J = b(
    () => S && S.length ? S : [],
    [S]
  ), j = k(
    (M, i) => {
      let p = M ? r?.getTask(M) : null;
      if (s) {
        const W = s(M, i);
        p = W === !0 ? p : W;
      }
      if (p) {
        const W = Ie(i.target, "data-segment");
        W !== null ? P.current = { id: p.id, segmentIndex: W } : P.current = p.id, (!Array.isArray(_) || !_.includes(p.id)) && r && r.exec && r.exec("select-task", { id: p.id });
      }
      return p;
    },
    [r, s, _]
  ), Q = k(
    (M) => {
      const i = M.action;
      i && (ft(H, i.id) && ut(r, i.id, P.current, O), f && f(M));
    },
    [r, O, f, H]
  ), X = k(
    (M, i) => {
      const p = J.length ? J : i ? [i] : [];
      let W = o ? p.every((D) => o(M, D)) : !0;
      if (W && (M.isHidden && (W = !p.some(
        (D) => M.isHidden(D, r.getState(), P.current)
      )), M.isDisabled)) {
        const D = p.some(
          (Y) => M.isDisabled(Y, r.getState(), P.current)
        );
        M.disabled = D;
      }
      return W;
    },
    [o, J, r]
  );
  at(E, () => ({
    show: (M, i) => {
      m.current && m.current.show && m.current.show(M, i);
    }
  }));
  const z = k((M) => {
    m.current && m.current.show && m.current.show(M);
  }, []), U = /* @__PURE__ */ we(Pe, { children: [
    /* @__PURE__ */ d(
      Ft,
      {
        filter: X,
        options: V,
        dataKey: "id",
        resolver: j,
        onClick: Q,
        at: R,
        ref: m,
        css: x
      }
    ),
    /* @__PURE__ */ d("span", { onContextMenu: z, "data-menu-ignore": "true", children: typeof h == "function" ? h() : h })
  ] });
  if (!T && Ee.i18n?.Provider) {
    const M = Ee.i18n.Provider;
    return /* @__PURE__ */ d(M, { value: c, children: U });
  }
  return U;
});
function mn({ api: t, autoSave: n, onLinksChange: r }) {
  const o = ve(Ee.i18n).getGroup("gantt"), R = A(t, "activeTask"), h = A(t, "_activeTask"), f = A(t, "_links"), x = A(t, "schedule"), E = A(t, "unscheduledTasks"), [m, P] = re();
  function T() {
    if (R) {
      const _ = f.filter((G) => G.target == R).map((G) => ({ link: G, task: t.getTask(G.source) })), S = f.filter((G) => G.source == R).map((G) => ({ link: G, task: t.getTask(G.target) }));
      return [
        { title: o("Predecessors"), data: _ },
        { title: o("Successors"), data: S }
      ];
    }
  }
  Z(() => {
    P(T());
  }, [R, f]);
  const c = b(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function O(_) {
    n ? t.exec("delete-link", { id: _ }) : (P(
      (S) => (S || []).map((G) => ({
        ...G,
        data: G.data.filter((I) => I.link.id !== _)
      }))
    ), r && r({
      id: _,
      action: "delete-link",
      data: { id: _ }
    }));
  }
  function L(_, S) {
    n ? t.exec("update-link", {
      id: _,
      link: S
    }) : (P(
      (G) => (G || []).map((I) => ({
        ...I,
        data: I.data.map(
          (C) => C.link.id === _ ? { ...C, link: { ...C.link, ...S } } : C
        )
      }))
    ), r && r({
      id: _,
      action: "update-link",
      data: {
        id: _,
        link: S
      }
    }));
  }
  return /* @__PURE__ */ d(Pe, { children: (m || []).map(
    (_, S) => _.data.length ? /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ d(Ee.fieldId.Provider, { value: null, children: /* @__PURE__ */ d(pt, { label: _.title, position: "top", children: /* @__PURE__ */ d("table", { children: /* @__PURE__ */ d("tbody", { children: _.data.map((G) => /* @__PURE__ */ we("tr", { children: [
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-task-name", children: G.task.text || "" }) }),
      x?.auto && G.link.type === "e2s" ? /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ d(
        yt,
        {
          type: "number",
          placeholder: o("Lag"),
          value: G.link.lag,
          disabled: E && h?.unscheduled,
          onChange: (I) => {
            I.input || L(G.link.id, { lag: I.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ d(
        kt,
        {
          value: G.link.type,
          placeholder: o("Select link type"),
          options: c,
          onChange: (I) => L(G.link.id, { type: I.value }),
          children: ({ option: I }) => I.label
        }
      ) }) }),
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => O(G.link.id),
          role: "button"
        }
      ) })
    ] }, G.link.id)) }) }) }) }) }, S) : null
  ) });
}
function xn(t) {
  const { value: n, time: r, format: s, onchange: o, onChange: R, ...h } = t, f = R ?? o;
  function x(E) {
    const m = new Date(E.value);
    m.setHours(n.getHours()), m.setMinutes(n.getMinutes()), f && f({ value: m });
  }
  return /* @__PURE__ */ we("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ d(
      bt,
      {
        ...h,
        value: n,
        onChange: x,
        format: s,
        buttons: ["today"],
        clear: !1
      }
    ),
    r ? /* @__PURE__ */ d(vt, { value: n, onChange: f, format: s }) : null
  ] });
}
Ge("select", Ct);
Ge("date", xn);
Ge("twostate", $t);
Ge("slider", Nt);
Ge("counter", Rt);
Ge("links", mn);
function zn({
  api: t,
  items: n = [],
  css: r = "",
  layout: s = "default",
  readonly: o = !1,
  placement: R = "sidebar",
  bottomBar: h = !0,
  topBar: f = !0,
  autoSave: x = !0,
  focus: E = !1,
  hotkeys: m = {}
}) {
  const P = ve(Ee.i18n), T = b(() => P || Fe({ ...Ke, ...qe }), [P]), c = b(() => T.getGroup("gantt"), [T]), O = T.getRaw(), L = b(() => {
    const w = O.gantt?.dateFormat || O.formats?.dateFormat;
    return Ve(w, O.calendar);
  }, [O]), _ = b(() => {
    if (f === !0 && !o) {
      const w = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: c("Delete"),
          id: "delete"
        }
      ];
      return x ? { items: w } : {
        items: [
          ...w,
          {
            comp: "button",
            type: "primary",
            text: c("Save"),
            id: "save"
          }
        ]
      };
    }
    return f;
  }, [f, o, x, c]), [S, G] = re(!1), I = b(
    () => S ? "wx-full-screen" : "",
    [S]
  ), C = k((w) => {
    G(w);
  }, []);
  Z(() => {
    const w = mt(C);
    return w.observe(), () => {
      w.disconnect();
    };
  }, [C]);
  const H = A(t, "_activeTask"), a = A(t, "activeTask"), B = A(t, "unscheduledTasks"), V = A(t, "summary"), J = A(t, "links"), j = A(t, "splitTasks"), Q = b(
    () => j && a?.segmentIndex,
    [j, a]
  ), X = b(
    () => Q || Q === 0,
    [Q]
  ), z = A(t, "taskTypes"), U = b(
    () => Wt({ unscheduledTasks: B, summary: V, taskTypes: z }),
    [B, V, z]
  ), M = A(t, "undo"), [i, p] = re({}), [W, D] = re(null), [Y, F] = re(), [de, ue] = re(null), fe = b(() => {
    if (!H) return null;
    let w;
    if (X && H.segments ? w = { ...H.segments[Q] } : w = { ...H }, o) {
      let ne = { parent: w.parent };
      return U.forEach(({ key: ce, comp: K }) => {
        if (K !== "links") {
          const ae = w[ce];
          K === "date" && ae instanceof Date ? ne[ce] = L(ae) : K === "slider" && ce === "progress" ? ne[ce] = `${ae}%` : ne[ce] = ae;
        }
      }), ne;
    }
    return w || null;
  }, [H, X, Q, o, U, L]);
  Z(() => {
    F(fe);
  }, [fe]), Z(() => {
    p({}), ue(null), D(null);
  }, [a]);
  function le(w, ne) {
    return w.map((ce) => {
      const K = { ...ce };
      if (ce.config && (K.config = { ...K.config }), K.comp === "links" && t && (K.api = t, K.autoSave = x, K.onLinksChange = te), K.comp === "select" && K.key === "type") {
        const ae = K.options ?? [];
        K.options = ae.map((Me) => ({
          ...Me,
          label: c(Me.label)
        }));
      }
      return K.comp === "slider" && K.key === "progress" && (K.labelTemplate = (ae) => `${c(K.label)} ${ae}%`), K.label && (K.label = c(K.label)), K.config?.placeholder && (K.config.placeholder = c(K.config.placeholder)), ne && (K.isDisabled && K.isDisabled(ne, t.getState()) ? K.disabled = !0 : delete K.disabled), K;
    });
  }
  const v = b(() => {
    let w = n.length ? n : U;
    return w = le(w, Y), Y ? w.filter(
      (ne) => !ne.isHidden || !ne.isHidden(Y, t.getState())
    ) : w;
  }, [n, U, Y, c, t, x]), se = b(
    () => v.map((w) => w.key),
    [v]
  );
  function te({ id: w, action: ne, data: ce }) {
    p((K) => ({
      ...K,
      [w]: { action: ne, data: ce }
    }));
  }
  const oe = k(() => {
    for (let w in i)
      if (J.byId(w)) {
        const { action: ne, data: ce } = i[w];
        t.exec(ne, ce);
      }
  }, [t, i, J]), Te = k(() => {
    const w = a?.id || a;
    if (X) {
      if (H?.segments) {
        const ne = H.segments.filter(
          (ce, K) => K !== Q
        );
        t.exec("update-task", {
          id: w,
          task: { segments: ne }
        });
      }
    } else
      t.exec("delete-task", { id: w });
  }, [t, a, X, H, Q]), be = k(() => {
    t.exec("show-editor", { id: null });
  }, [t]), $e = k(
    (w) => {
      const { item: ne, changes: ce } = w;
      ne.id === "delete" && Te(), ne.id === "save" && (ce.length ? be() : oe()), ne.comp && be();
    },
    [t, a, x, oe, Te, be]
  ), me = k(
    (w, ne, ce) => (B && w.type === "summary" && (w.unscheduled = !1), dt(w, t.getState(), ne), ce || D(!1), w),
    [B, t]
  ), ke = k(
    (w) => {
      w = {
        ...w,
        unscheduled: B && w.unscheduled && w.type !== "summary"
      }, delete w.links, delete w.data, (se.indexOf("duration") === -1 || w.segments && !w.duration) && delete w.duration;
      const ne = {
        id: a?.id || a,
        task: w,
        ...X && { segmentIndex: Q }
      };
      x && W && (ne.inProgress = W), t.exec("update-task", ne), x || oe();
    },
    [
      t,
      a,
      B,
      x,
      oe,
      se,
      X,
      Q,
      W
    ]
  ), Ce = k(
    (w) => {
      let { update: ne, key: ce, input: K } = w;
      if (K && D(!0), w.update = me({ ...ne }, ce, K), !x) F(w.update);
      else if (!de && !K) {
        const ae = v.find((l) => l.key === ce), Me = ne[ce];
        (!ae.validation || ae.validation(Me)) && (!ae.required || Me) && ke(w.update);
      }
    },
    [x, me, de, v, ke]
  ), ie = k(
    (w) => {
      x || ke(w.values);
    },
    [x, ke]
  ), xe = k((w) => {
    ue(w.errors);
  }, []), he = b(
    () => M ? {
      "ctrl+z": (w) => {
        w.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (w) => {
        w.preventDefault(), t.exec("redo");
      }
    } : {},
    [M, t]
  );
  return fe ? /* @__PURE__ */ d(Tt, { children: /* @__PURE__ */ d(
    Kt,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${I} ${r}`,
      items: v,
      values: fe,
      topBar: _,
      bottomBar: h,
      placement: R,
      layout: s,
      readonly: o,
      autoSave: x,
      focus: E,
      onAction: $e,
      onSave: ie,
      onValidation: xe,
      onChange: Ce,
      hotkeys: m && { ...he, ...m }
    }
  ) }) : null;
}
const Gn = ({ children: t, columns: n = null, api: r }) => {
  const [s, o] = re(null);
  return Z(() => {
    r && r.getTable(!0).then(o);
  }, [r]), /* @__PURE__ */ d(Ot, { api: s, columns: n, children: t });
};
function Wn(t) {
  const { api: n, content: r, children: s } = t, o = ee(null), R = ee(null), [h, f] = re({}), [x, E] = re(null), [m, P] = re({});
  function T(C) {
    for (; C; ) {
      if (C.getAttribute) {
        const H = C.getAttribute("data-tooltip-id"), a = C.getAttribute("data-tooltip-at"), B = C.getAttribute("data-tooltip");
        if (H || B) return { id: H, tooltip: B, target: C, at: a };
      }
      C = C.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  Z(() => {
    const C = R.current;
    if (C && m && (m.text || r)) {
      const H = C.getBoundingClientRect();
      let a = !1, B = m.left, V = m.top;
      H.right >= h.right && (B = h.width - H.width - 5, a = !0), H.bottom >= h.bottom && (V = m.top - (H.bottom - h.bottom + 2), a = !0), a && P((J) => J && { ...J, left: B, top: V });
    }
  }, [m, h, r]);
  const c = ee(null), O = 300, L = (C) => {
    clearTimeout(c.current), c.current = setTimeout(() => {
      C();
    }, O);
  };
  function _(C) {
    let { id: H, tooltip: a, target: B, at: V } = T(C.target);
    if (P(null), E(null), !a)
      if (H)
        a = G(H);
      else {
        clearTimeout(c.current);
        return;
      }
    const J = C.clientX;
    L(() => {
      H && E(S(I(H)));
      const j = B.getBoundingClientRect(), Q = o.current, X = Q ? Q.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let z, U;
      V === "left" ? (z = j.top + 5 - X.top, U = j.right + 5 - X.left) : (z = j.top + j.height - X.top, U = J - X.left), f(X), P({ top: z, left: U, text: a });
    });
  }
  function S(C) {
    return n?.getTask(I(C)) || null;
  }
  function G(C) {
    return S(C)?.text || "";
  }
  function I(C) {
    const H = parseInt(C);
    return isNaN(H) ? C : H;
  }
  return /* @__PURE__ */ we(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: _,
      children: [
        m && (m.text || r) ? /* @__PURE__ */ d(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: R,
            style: { top: `${m.top}px`, left: `${m.left}px` },
            children: r ? /* @__PURE__ */ d(r, { data: x }) : m.text ? /* @__PURE__ */ d("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: m.text }) : null
          }
        ) : null,
        s
      ]
    }
  );
}
function Pn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d(Ze, { fonts: t, children: n() }) : /* @__PURE__ */ d(Ze, { fonts: t });
}
function _n({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d(Je, { fonts: t, children: n }) : /* @__PURE__ */ d(Je, { fonts: t });
}
function On({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d(et, { fonts: t, children: n }) : /* @__PURE__ */ d(et, { fonts: t });
}
const gn = "2.5.2", wn = {
  version: gn
}, Vn = wn.version;
export {
  In as ContextMenu,
  zn as Editor,
  An as Gantt,
  Gn as HeaderMenu,
  Pn as Material,
  Hn as Toolbar,
  Wn as Tooltip,
  _n as Willow,
  On as WillowDark,
  Bn as defaultColumns,
  Xn as defaultEditorItems,
  Yn as defaultMenuOptions,
  jn as defaultTaskTypes,
  qn as defaultToolbarButtons,
  Qn as getEditorItems,
  Un as getMenuOptions,
  Zn as getToolbarButtons,
  ts as registerEditorItem,
  Jn as registerScaleUnit,
  Vn as version
};
//# sourceMappingURL=index.es.js.map
