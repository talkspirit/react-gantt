import { jsx as g, jsxs as Y, Fragment as ve } from "react/jsx-runtime";
import Wo, { useState as j, useEffect as P, useRef as W, createContext as It, useContext as he, useMemo as _, useCallback as E, forwardRef as vt, useImperativeHandle as kt, Fragment as ys } from "react";
import { createPortal as Fo, flushSync as Oo } from "react-dom";
function Oe(n, e = "data-id") {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e))
      return t;
    t = t.parentNode;
  }
  return null;
}
function Kn(n, e = "data-id") {
  const t = Oe(n, e);
  return t ? t.getAttribute(e) : null;
}
function gt(n, e = "data-id") {
  const t = Oe(n, e);
  return t ? At(t.getAttribute(e)) : null;
}
function At(n) {
  if (typeof n == "string") {
    const e = n * 1;
    if (!isNaN(e)) return e;
  }
  return n;
}
function Po() {
  return {
    detect: () => !0,
    addEvent: function(n, e, t) {
      return n.addEventListener(e, t), () => n.removeEventListener(e, t);
    },
    addGlobalEvent: function(n, e) {
      return document.addEventListener(n, e), () => document.removeEventListener(n, e);
    },
    getTopNode: function() {
      return window.document.body;
    }
  };
}
var Be = Po();
function ar(n) {
  Object.assign(Be, n);
}
function Dr(n, e, t) {
  function r(s) {
    const o = Oe(s);
    if (!o) return;
    const i = At(o.dataset.id);
    if (typeof e == "function") return e(i, s);
    let l, a = s.target;
    for (; a != o; ) {
      if (l = a.dataset ? a.dataset.action : null, l && e[l]) {
        e[l](i, s);
        return;
      }
      a = a.parentNode;
    }
    e[t] && e[t](i, s);
  }
  Be.addEvent(n, t, r);
}
function vs(n, e) {
  Dr(n, e, "click"), e.dblclick && Dr(n, e.dblclick, "dblclick");
}
function Vo(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    if (n[t] === e) {
      n.splice(t, 1);
      break;
    }
}
var ks = /* @__PURE__ */ new Date(), pn = !1, rn = [], mt = [], Mr = (n) => {
  if (pn) {
    pn = !1;
    return;
  }
  for (let e = mt.length - 1; e >= 0; e--) {
    const { node: t, date: r, props: s } = mt[e];
    if (!(r > ks) && !t.contains(n.target) && t !== n.target && (s.callback && s.callback(n), s.modal || n.defaultPrevented))
      break;
  }
}, Go = (n) => {
  ks = /* @__PURE__ */ new Date(), pn = !0;
  for (let e = mt.length - 1; e >= 0; e--) {
    const { node: t } = mt[e];
    if (!t.contains(n.target) && t !== n.target) {
      pn = !1;
      break;
    }
  }
};
function Yt(n, e) {
  rn.length || (rn = [
    Be.addGlobalEvent("click", Mr, n),
    Be.addGlobalEvent("contextmenu", Mr, n),
    Be.addGlobalEvent("mousedown", Go, n)
  ]), typeof e != "object" && (e = { callback: e });
  const t = { node: n, date: /* @__PURE__ */ new Date(), props: e };
  return mt.push(t), {
    destroy() {
      Vo(mt, t), mt.length || (rn.forEach((r) => r()), rn = []);
    }
  };
}
var sn = (n) => n.indexOf("bottom") !== -1, on = (n) => n.indexOf("left") !== -1, ln = (n) => n.indexOf("right") !== -1, An = (n) => n.indexOf("top") !== -1, Er = (n) => n.indexOf("fit") !== -1, an = (n) => n.indexOf("overlap") !== -1, jo = (n) => n.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), Bo = (n) => {
  const e = n.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function Ko(n, e) {
  let t = 0;
  const r = Be.getTopNode(n);
  for (; n && n !== r; ) {
    const s = getComputedStyle(n).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (t = parseInt(getComputedStyle(n).zIndex) || 0), n = n.parentNode, n === e) break;
  }
  return t;
}
var ze, Ge, Ot, Fe;
function Yo(n, e, t = "bottom", r = 0, s = 0) {
  if (!n) return null;
  ze = r, Ge = s, Ot = "auto";
  let o = 0, i = 0;
  const l = Uo(n), a = an(t) ? Be.getTopNode(n) : l;
  if (!l) return null;
  const c = l.getBoundingClientRect(), d = n.getBoundingClientRect(), u = a.getBoundingClientRect(), h = window.getComputedStyle(a), f = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  };
  for (const k in f) {
    const v = `border-${k}-width`;
    f[k] = parseFloat(h.getPropertyValue(v));
  }
  if (e) {
    const k = Ko(e, l);
    o = Math.max(k + 1, 20);
  }
  if (e) {
    if (Fe = e.getBoundingClientRect(), Er(t) && (Ot = Fe.width + "px"), t !== "point")
      if (jo(t))
        Er(t) ? ze = 0 : (ze = u.width / 2, i = 1), Ge = (u.height - d.height) / 2;
      else {
        const k = an(t) ? 0 : 1;
        ze = ln(t) ? Fe.right + k : Fe.left - k, Ge = sn(t) ? Fe.bottom + 1 : Fe.top;
        const v = Bo(t);
        v && (ln(t) || on(t) ? v === "center" ? Ge -= (d.height - Fe.height) / 2 : v === "end" && (Ge -= d.height - Fe.height) : (sn(t) || An(t)) && (v === "center" ? ze -= (d.width - Fe.width) / 2 : v === "end" && (ze -= d.width - Fe.width), an(t) || (ze += 1)));
      }
  } else Fe = { left: r, right: r, top: s, bottom: s };
  const m = (on(t) || ln(t)) && (sn(t) || An(t));
  on(t) && (i = 2);
  const p = ze - d.width - u.left;
  e && on(t) && !m && p < 0 && (ze = Fe.right, i = 0);
  const x = ze + d.width * (1 - i / 2) - u.right;
  if (x > 0)
    if (!ln(t))
      ze = u.right - f.right - d.width;
    else {
      const k = Fe.left - u.x - d.width;
      e && !an(t) && !m && k >= 0 ? ze = Fe.left - d.width : ze -= x + f.right;
    }
  i && (ze = Math.round(ze - d.width * i / 2));
  const w = p < 0 || x > 0 || !m;
  An(t) && (Ge = Fe.top - d.height, e && Ge < u.y && w && (Ge = Fe.bottom));
  const y = Ge + d.height - u.bottom;
  return y > 0 && (e && sn(t) && w ? Ge -= d.height + Fe.height + 1 : Ge -= y + f.bottom), ze -= c.left + f.left, Ge -= c.top + f.top, ze = Math.max(ze, 0) + a.scrollLeft, Ge = Math.max(Ge, 0) + a.scrollTop, Ot = Ot || "auto", { x: ze, y: Ge, z: o, width: Ot };
}
function Uo(n) {
  const e = Be.getTopNode(n);
  for (n && (n = n.parentElement); n; ) {
    const t = getComputedStyle(n).position;
    if (n === e || t === "relative" || t === "absolute" || t === "fixed")
      return n;
    n = n.parentNode;
  }
  return null;
}
var Rr = (/* @__PURE__ */ new Date()).valueOf();
function Sn() {
  return Rr += 1, Rr;
}
var qo = class {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  configure(n, e) {
    this.node = e;
    for (const t in n)
      if (n[t]) {
        const r = t.toLowerCase().replace(/[ ]/g, ""), s = n[t];
        this.store.set(r, s);
      }
  }
}, Dt = [], Ir = {
  subscribe: (n) => {
    Xo();
    const e = new qo();
    return Dt.push(e), n(e), () => {
      const t = Dt.findIndex((r) => r === e);
      t >= 0 && Dt.splice(t, 1);
    };
  }
}, Ar = !1;
function Xo() {
  Ar || (Ar = !0, document.addEventListener("keydown", (n) => {
    if (Dt.length && (n.ctrlKey || n.altKey || n.metaKey || n.shiftKey || n.key.length > 1 || n.key === " ")) {
      const e = [];
      n.ctrlKey && e.push("ctrl"), n.altKey && e.push("alt"), n.metaKey && e.push("meta"), n.shiftKey && e.push("shift");
      let t = n.code.replace("Key", "").toLocaleLowerCase();
      n.key === " " && (t = "space"), e.push(t);
      const r = e.join("+");
      for (let s = Dt.length - 1; s >= 0; s--) {
        const o = Dt[s], i = o.store.get(r) || o.store.get(t);
        i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
      }
    }
  }));
}
function je(n) {
  return n < 10 ? "0" + n : n.toString();
}
function Qo(n) {
  const e = je(n);
  return e.length == 2 ? "0" + e : e;
}
function bs(n) {
  const e = Math.floor(n / 11) * 11;
  return {
    start: e,
    end: e + 11
  };
}
function Hr(n, e = 1) {
  let t = n.getDay();
  t === 0 && (t = 7), t = (t - e + 7) % 7;
  const r = new Date(n.valueOf());
  r.setDate(n.getDate() + (3 - t));
  const s = r.getFullYear(), o = Math.floor(
    (r.getTime() - new Date(s, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(o / 7);
}
var Lr = ["", ""];
function Zo(n, e, t) {
  switch (n) {
    case "%d":
      return je(e.getDate());
    case "%m":
      return je(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return je(e.getFullYear() % 100);
    case "%Y":
      return e.getFullYear();
    case "%D":
      return t.dayShort[e.getDay()];
    case "%l":
      return t.dayFull[e.getDay()];
    case "%M":
      return t.monthShort[e.getMonth()];
    case "%F":
      return t.monthFull[e.getMonth()];
    case "%h":
      return je((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return je(e.getHours());
    case "%i":
      return je(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? t.pm : t.am) || Lr)[0];
    case "%A":
      return ((e.getHours() > 11 ? t.pm : t.am) || Lr)[1];
    case "%s":
      return je(e.getSeconds());
    case "%S":
      return Qo(e.getMilliseconds());
    case "%W":
      return je(Hr(e));
    case "%w":
      return je(Hr(e, t.weekStart ?? 1));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + je(e.getMonth() + 1), r += "-" + je(e.getDate()), r += "T", r += je(e.getHours()), r += ":" + je(e.getMinutes()), r += ":" + je(e.getSeconds()), r;
    }
    case "%Q":
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return n;
  }
}
var Jo = /%[a-zA-Z]/g;
function it(n, e) {
  return typeof n == "function" ? n : function(t) {
    return t ? (t.getMonth || (t = new Date(t)), n.replace(
      Jo,
      (r) => Zo(r, t, e)
    )) : "";
  };
}
function zr(n) {
  return n && typeof n == "object" && !Array.isArray(n);
}
function Yn(n, e) {
  for (const t in e) {
    const r = e[t];
    zr(n[t]) && zr(r) ? n[t] = Yn(
      { ...n[t] },
      e[t]
    ) : n[t] = e[t];
  }
  return n;
}
function bt(n) {
  return {
    getGroup(e) {
      const t = n[e];
      return (r) => t && t[r] || r;
    },
    getRaw() {
      return n;
    },
    extend(e, t) {
      if (!e) return this;
      let r;
      return t ? r = Yn({ ...e }, n) : r = Yn({ ...n }, e), bt(r);
    }
  };
}
function Te(n) {
  const [e, t] = j(n), r = W(n);
  return P(() => {
    if (r.current !== n) {
      if (Array.isArray(r.current) && Array.isArray(n) && r.current.length === 0 && n.length === 0)
        return;
      r.current = n, t(n);
    }
  }, [n]), [e, t];
}
function ei(n, e, t) {
  const [r, s] = j(() => e);
  return n || console.warn(`Writable ${t} is not defined`), P(() => n ? n.subscribe((i) => {
    s(() => i);
  }) : void 0, [n]), r;
}
function Q(n, e) {
  const t = n.getState(), r = n.getReactiveState();
  return ei(r[e], t[e], e);
}
function rt(n, e) {
  const [t, r] = j(() => null);
  return P(() => {
    if (!n) return;
    const s = n.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((l) => r(() => l)) : void 0;
  }, [n, e]), t;
}
function ti(n, e) {
  const t = W(e);
  t.current = e;
  const [r, s] = j(1);
  return P(() => n.subscribe((i) => {
    t.current = i, s((l) => l + 1);
  }), [n]), [t.current, r];
}
function gn(n, e) {
  const t = n.getState(), r = n.getReactiveState();
  return ti(r[e], t[e]);
}
function ni(n, e) {
  P(() => {
    const t = e.current;
    if (t)
      return Ir.subscribe((r) => {
        r.configure(n, t);
      });
  }, [Ir, e]);
}
function Ss(n, e) {
  return typeof n == "function" ? typeof e == "object" ? n(e) : n() : n;
}
function $s(n) {
  const e = {};
  return n.split(";").forEach((t) => {
    const [r, s] = t.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (i, l) => l.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function _s(n) {
  let e = n, t = [];
  return {
    subscribe: (l) => {
      t.push(l), l(e);
    },
    unsubscribe: (l) => {
      t = t.filter((a) => a !== l);
    },
    set: (l) => {
      e = l, t.forEach((a) => a(e));
    },
    update: (l) => {
      e = l(e), t.forEach((a) => a(e));
    }
  };
}
function Wr(n, e, t) {
  function r(s) {
    const o = Oe(s);
    if (!o) return;
    const i = At(o.dataset.id);
    if (typeof e == "function") return e(i, s);
    let l, a = s.target;
    for (; a != o; ) {
      if (l = a.dataset ? a.dataset.action : null, l && e[l]) {
        e[l](i, s);
        return;
      }
      a = a.parentNode;
    }
    e[t] && e[t](i, s);
  }
  return Be.addEvent(n, t, r);
}
function ri(n, e) {
  const t = [Wr(n, e, "click")];
  return e.dblclick && t.push(Wr(n, e.dblclick, "dblclick")), () => {
    t.forEach((r) => r());
  };
}
const si = "en-US", oi = {
  monthFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  dayFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hours: "Hours",
  minutes: "Minutes",
  done: "Done",
  clear: "Clear",
  today: "Today",
  am: ["am", "AM"],
  pm: ["pm", "PM"],
  weekStart: 0,
  clockFormat: 24
}, ii = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, li = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, Ut = {
  core: ii,
  calendar: oi,
  formats: li,
  lang: si
}, qt = It("willow"), ai = It({}), Ze = It(null), cr = It(null), Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: cr,
  helpers: ai,
  i18n: Ze,
  theme: qt
}, Symbol.toStringTag, { value: "Module" }));
function Ht(n) {
  const e = he(cr), [t] = j(() => n || e && e() || Sn());
  return t;
}
function ci({
  value: n = "",
  id: e,
  placeholder: t = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: l
}) {
  const a = Ht(e), [c, d] = Te(n), u = E(
    (m) => {
      const p = m.target.value;
      d(p), l && l({ value: p, input: !0 });
    },
    [l]
  ), h = E(
    (m) => {
      const p = m.target.value;
      d(p), l && l({ value: p });
    },
    [l]
  ), f = W(null);
  return P(() => {
    const m = h, p = f.current;
    return p.addEventListener("change", m), () => {
      p && p.removeEventListener("change", m);
    };
  }, [h]), /* @__PURE__ */ g(
    "textarea",
    {
      className: `wx-3yFVAC wx-textarea ${o ? "wx-error" : ""}`,
      id: a,
      disabled: s,
      placeholder: t,
      readOnly: i,
      title: r,
      value: c,
      onInput: u,
      ref: f
    }
  );
}
function lt({
  type: n = "",
  css: e = "",
  icon: t = "",
  disabled: r = !1,
  title: s = "",
  text: o = "",
  children: i,
  onClick: l
}) {
  const a = _(() => {
    let d = n ? n.split(" ").filter((u) => u !== "").map((u) => "wx-" + u).join(" ") : "";
    return e + (e ? " " : "") + d;
  }, [n, e]), c = (d) => {
    l && l(d);
  };
  return /* @__PURE__ */ Y(
    "button",
    {
      title: s,
      className: `wx-2ZWgb4 wx-button ${a} ${t && !i ? "wx-icon" : ""}`,
      disabled: r,
      onClick: c,
      children: [
        t && /* @__PURE__ */ g("i", { className: "wx-2ZWgb4 " + t }),
        i || o || " "
      ]
    }
  );
}
function di({
  id: n,
  label: e = "",
  inputValue: t = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const i = Ht(n), [l, a] = Te(r);
  return /* @__PURE__ */ Y("div", { className: "wx-2IvefP wx-checkbox", children: [
    /* @__PURE__ */ g(
      "input",
      {
        type: "checkbox",
        id: i,
        disabled: o,
        className: "wx-2IvefP wx-check",
        checked: l,
        value: t,
        onChange: ({ target: c }) => {
          const d = c.checked;
          a(d), s && s({ value: d, inputValue: t });
        }
      }
    ),
    /* @__PURE__ */ Y("label", { htmlFor: i, className: "wx-2IvefP wx-label", children: [
      /* @__PURE__ */ g("span", { className: "wx-2IvefP wx-before" }),
      e && /* @__PURE__ */ g("span", { className: "wx-2IvefP wx-after", children: e })
    ] })
  ] });
}
function Lt({
  position: n = "bottom",
  align: e = "start",
  autoFit: t = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const i = W(null), [l, a] = Te(n), [c, d] = Te(e);
  return P(() => {
    if (t) {
      const u = i.current;
      if (u) {
        const h = u.getBoundingClientRect(), f = Be.getTopNode(u).getBoundingClientRect();
        h.right >= f.right && d("end"), h.bottom >= f.bottom && a("top");
      }
    }
  }, [t]), P(() => {
    if (i.current) {
      const u = (h) => {
        r && r(h);
      };
      return Yt(i.current, u).destroy;
    }
  }, [r]), /* @__PURE__ */ g(
    "div",
    {
      ref: i,
      className: `wx-32GZ52 wx-dropdown wx-${l}-${c}`,
      style: { width: s },
      children: o
    }
  );
}
function Xt() {
  return bt(Ut);
}
function ui() {
  let n = null, e = !1, t, r, s, o;
  const i = (d, u, h, f) => {
    t = d, r = u, s = h, o = f;
  }, l = (d) => {
    n = d, e = n !== null, s(n);
  }, a = (d, u) => {
    if (d !== null && t) {
      const h = t.querySelectorAll(".wx-list > .wx-item")[d];
      h && (h.scrollIntoView({ block: "nearest" }), u && u.preventDefault());
    }
  }, c = (d, u) => {
    const h = d === null ? null : Math.max(0, Math.min(n + d, r.length - 1));
    h !== n && (l(h), t ? a(h, u) : requestAnimationFrame(() => a(h, u)));
  };
  return { move: (d) => {
    const u = gt(d), h = r.findIndex((f) => f.id == u);
    h !== n && l(h);
  }, keydown: (d, u) => {
    switch (d.code) {
      case "Enter":
        e ? o() : l(0);
        break;
      case "Space":
        e || l(0);
        break;
      case "Escape":
        s(n = null);
        break;
      case "Tab":
        s(n = null);
        break;
      case "ArrowDown":
        c(e ? 1 : u || 0, d);
        break;
      case "ArrowUp":
        c(e ? -1 : u || 0, d);
        break;
    }
  }, init: i, navigate: c };
}
function $n({
  items: n = [],
  children: e,
  onSelect: t,
  onReady: r
}) {
  const s = W(), o = W(ui()), [i, l] = j(null), a = W(i), c = (he(Ze) || Xt()).getGroup("core"), d = (h) => {
    h && h.stopPropagation(), t && t({ id: n[a.current]?.id });
  };
  P(() => {
    o.current.init(
      s.current,
      n,
      (h) => {
        l(h), a.current = h;
      },
      d
    );
  }, [n, s.current]), P(() => {
    r && r(o.current);
  }, []);
  const u = E(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null ? null : /* @__PURE__ */ g(Lt, { onCancel: u, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-233fr7 wx-list",
      ref: s,
      onClick: d,
      onMouseMove: o.current.move,
      children: n.length ? n.map((h, f) => /* @__PURE__ */ g(
        "div",
        {
          className: `wx-233fr7 wx-item ${f === i ? "wx-focus" : ""}`,
          "data-id": h.id,
          children: e ? Ss(e, { option: h }) : h.label
        },
        h.id
      )) : /* @__PURE__ */ g("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function hi({
  value: n = "",
  id: e,
  options: t = [],
  textOptions: r = null,
  textField: s = "label",
  placeholder: o = "",
  title: i = "",
  disabled: l = !1,
  error: a = !1,
  clear: c = !1,
  children: d,
  onChange: u
}) {
  const h = Ht(e), f = W(null), m = W(null), [p, x] = Te(n), [w, y] = j(!1), [k, v] = j(""), N = W(null), b = W(!1), $ = _(() => {
    if (w) return k;
    if (p || p === 0) {
      const V = (r || t).find((U) => U.id === p);
      if (V) return V[s];
    }
    return "";
  }, [w, k, p, r, t, s]), D = _(() => !$ || !w ? t : t.filter(
    (V) => V[s].toLowerCase().includes($.toLowerCase())
  ), [$, w, t, s]), O = E(
    () => D.findIndex((V) => V.id === p),
    [D, p]
  ), C = E((V) => {
    f.current = V.navigate, m.current = V.keydown;
  }, []), I = E(
    (V, U) => {
      if (V || V === 0) {
        let oe = t.find((T) => T.id === V);
        if (y(!1), U && f.current(null), oe && p !== oe.id) {
          const T = oe.id;
          x(T), u && u({ value: T });
        }
      }
      !b.current && U && N.current.focus();
    },
    [t, p, u]
  ), A = E(
    ({ id: V }) => {
      I(V, !0);
    },
    [I]
  ), L = E(
    (V) => {
      V && V.stopPropagation(), x(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), z = E(
    (V) => {
      if (!t.length) return;
      if (V === "" && c) {
        L();
        return;
      }
      let U = t.find((T) => T[s] === V);
      U || (U = t.find(
        (T) => T[s].toLowerCase().includes(V.toLowerCase())
      ));
      const oe = U ? U.id : p || t[0].id;
      I(oe, !1);
    },
    [t, s, c, p, I, L]
  ), F = E(() => {
    v(N.current.value), y(!0), D.length ? f.current(0) : f.current(null);
  }, [D.length, f]), M = E(() => {
    b.current = !0;
  }, []), B = E(() => {
    b.current = !1, setTimeout(() => {
      b.current || z($);
    }, 200);
  }, [z, $]);
  return /* @__PURE__ */ Y(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => f.current(O()),
      onKeyDown: (V) => m.current(V, O()),
      title: i,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (a ? "wx-error" : ""),
            id: h,
            ref: N,
            value: $,
            disabled: l,
            placeholder: o,
            onFocus: M,
            onBlur: B,
            onInput: F
          }
        ),
        c && !l && p ? /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: L }) : /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !l && /* @__PURE__ */ g($n, { items: D, onReady: C, onSelect: A, children: ({ option: V }) => /* @__PURE__ */ g(ve, { children: d ? d({ option: V }) : V[s] }) })
      ]
    }
  );
}
function Qt({
  value: n = "",
  id: e,
  readonly: t = !1,
  focus: r = !1,
  select: s = !1,
  type: o = "text",
  placeholder: i = "",
  disabled: l = !1,
  error: a = !1,
  inputStyle: c = {},
  title: d = "",
  css: u = "",
  icon: h = "",
  clear: f = !1,
  onChange: m
}) {
  const p = Ht(e), [x, w] = Te(n), y = W(null), k = _(
    () => h && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [h, u]
  ), v = _(
    () => h && u.indexOf("wx-icon-left") !== -1,
    [h, u]
  );
  P(() => {
    const O = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(O);
  }, [r, s]);
  const N = E(
    (O) => {
      const C = O.target.value;
      w(C), m && m({ value: C, input: !0 });
    },
    [m]
  ), b = E(
    (O) => m && m({ value: O.target.value }),
    [m]
  );
  function $(O) {
    O.stopPropagation(), w(""), m && m({ value: "" });
  }
  let D = o;
  return o !== "password" && o !== "number" && (D = "text"), P(() => {
    const O = b, C = y.current;
    return C.addEventListener("change", O), () => {
      C && C.removeEventListener("change", O);
    };
  }, [b]), /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-hQ64J4 wx-text ${k} ${a ? "wx-error" : ""} ${l ? "wx-disabled" : ""} ${f ? "wx-clear" : ""}`,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-hQ64J4 wx-input",
            ref: y,
            id: p,
            readOnly: t,
            disabled: l,
            placeholder: i,
            type: D,
            style: c,
            title: d,
            value: x,
            onInput: N
          }
        ),
        f && !l && x ? /* @__PURE__ */ Y(ve, { children: [
          /* @__PURE__ */ g("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: $ }),
          v && /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${h}` })
        ] }) : h ? /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${h}` }) : null
      ]
    }
  );
}
function fi({ date: n, type: e, part: t, onShift: r }) {
  const { calendar: s, formats: o } = he(Ze).getRaw(), i = n.getFullYear(), l = _(() => {
    switch (e) {
      case "month":
        return it(o.monthYearFormat, s)(n);
      case "year":
        return it(o.yearFormat, s)(n);
      case "duodecade": {
        const { start: c, end: d } = bs(i), u = it(o.yearFormat, s);
        return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [n, e, i, s, o]);
  function a() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ Y("div", { className: "wx-8HQVQV wx-header", children: [
    t !== "right" ? /* @__PURE__ */ g(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-left",
        onClick: () => r && r({ diff: -1, type: e })
      }
    ) : /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-spacer" }),
    /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-label", onClick: a, children: l }),
    t !== "left" ? /* @__PURE__ */ g(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-right",
        onClick: () => r && r({ diff: 1, type: e })
      }
    ) : /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-spacer" })
  ] });
}
function dr({ onClick: n, children: e }) {
  return /* @__PURE__ */ g("button", { className: "wx-3s8W4d wx-button", onClick: n, children: e });
}
function pi({
  value: n,
  current: e,
  part: t = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const i = (he(Ze) || Xt()).getRaw().calendar, l = (i.weekStart || 7) % 7, a = i.dayShort.slice(l).concat(i.dayShort.slice(0, l)), c = (v, N, b) => new Date(
    v.getFullYear(),
    v.getMonth() + (N || 0),
    v.getDate() + (b || 0)
  );
  let d = t !== "normal";
  function u(v) {
    const N = v.getDay();
    return N === 0 || N === 6;
  }
  function h() {
    const v = c(e, 0, 1 - e.getDate());
    return v.setDate(v.getDate() - (v.getDay() - (l - 7)) % 7), v;
  }
  function f() {
    const v = c(e, 1, -e.getDate());
    return v.setDate(v.getDate() + (6 - v.getDay() + l) % 7), v;
  }
  const m = W(0);
  function p(v, N) {
    N.timeStamp !== m.current && (m.current = N.timeStamp, N.stopPropagation(), o && o(new Date(new Date(v))), s && s());
  }
  const x = _(() => t == "normal" ? [n ? c(n).valueOf() : 0] : n ? [
    n.start ? c(n.start).valueOf() : 0,
    n.end ? c(n.end).valueOf() : 0
  ] : [0, 0], [t, n]), w = _(() => {
    const v = h(), N = f(), b = e.getMonth();
    let $ = [];
    for (let D = v; D <= N; D.setDate(D.getDate() + 1)) {
      const O = {
        day: D.getDate(),
        in: D.getMonth() === b,
        date: D.valueOf()
      };
      let C = "";
      if (C += O.in ? "" : " wx-inactive", C += x.indexOf(O.date) > -1 ? " wx-selected" : "", d) {
        const I = O.date == x[0], A = O.date == x[1];
        I && !A ? C += " wx-left" : A && !I && (C += " wx-right"), O.date > x[0] && O.date < x[1] && (C += " wx-inrange");
      }
      if (C += u(D) ? " wx-weekend" : "", r) {
        const I = r(D);
        I && (C += " " + I);
      }
      $.push({ ...O, css: C });
    }
    return $;
  }, [e, x, d, r]), y = W(null);
  let k = W({});
  return k.current.click = p, P(() => {
    vs(y.current, k.current);
  }, []), /* @__PURE__ */ Y("div", { children: [
    /* @__PURE__ */ g("div", { className: "wx-398RBS wx-weekdays", children: a.map((v) => /* @__PURE__ */ g("div", { className: "wx-398RBS wx-weekday", children: v }, v)) }),
    /* @__PURE__ */ g("div", { className: "wx-398RBS wx-days", ref: y, children: w.map((v) => /* @__PURE__ */ g(
      "div",
      {
        className: `wx-398RBS wx-day ${v.css} ${v.in ? "" : "wx-out"}`,
        "data-id": v.date,
        children: v.day
      },
      v.date
    )) })
  ] });
}
function gi({
  value: n,
  current: e,
  part: t,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [i, l] = Te(n || /* @__PURE__ */ new Date()), [a, c] = Te(e || /* @__PURE__ */ new Date()), d = he(Ze).getRaw().calendar, u = d.monthShort || [], h = _(() => a.getMonth(), [a]), f = E(
    (x, w) => {
      if (x != null) {
        w.stopPropagation();
        const y = new Date(a);
        y.setMonth(x), c(y), o && o({ current: y });
      }
      t === "normal" && l(new Date(a)), r && r();
    },
    [a, t, o, r]
  ), m = E(() => {
    const x = new Date(Cs(i, t) || a);
    x.setMonth(a.getMonth()), x.setFullYear(a.getFullYear()), s && s(x);
  }, [i, a, t, s]), p = E(
    (x) => {
      const w = x.target.closest("[data-id]");
      if (w) {
        const y = parseInt(w.getAttribute("data-id"), 10);
        f(y, x);
      }
    },
    [f]
  );
  return /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-months", onClick: p, children: u.map((x, w) => /* @__PURE__ */ g(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (h === w ? " wx-current" : ""),
        "data-id": w,
        children: x
      },
      w
    )) }),
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ g(dr, { onClick: m, children: d.done }) })
  ] });
}
const Hn = "wx-1XEF33", mi = ({ value: n, current: e, onCancel: t, onChange: r, onShift: s, part: o }) => {
  const i = he(Ze).getRaw().calendar, [l, a] = Te(e), [c, d] = Te(n), u = _(() => l.getFullYear(), [l]), h = _(() => {
    const { start: w, end: y } = bs(u), k = [];
    for (let v = w; v <= y; ++v)
      k.push(v);
    return k;
  }, [u]), f = {
    click: m
  };
  function m(w, y) {
    if (w) {
      y.stopPropagation();
      const k = new Date(l);
      k.setFullYear(w), a(k), s && s({ current: k });
    }
    o === "normal" && d(new Date(l)), t && t();
  }
  function p() {
    const w = new Date(Cs(c, o) || l);
    w.setFullYear(l.getFullYear()), r && r(w);
  }
  const x = W(null);
  return P(() => {
    x.current && vs(x.current, f);
  }, []), /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g("div", { className: Hn + " wx-years", ref: x, children: h.map((w, y) => /* @__PURE__ */ g(
      "div",
      {
        className: Hn + ` wx-year ${u == w ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": w,
        children: w
      },
      y
    )) }),
    /* @__PURE__ */ g("div", { className: Hn + " wx-buttons", children: /* @__PURE__ */ g(dr, { onClick: p, children: i.done }) })
  ] });
}, Fr = {
  month: {
    component: pi,
    next: xi,
    prev: wi
  },
  year: {
    component: gi,
    next: vi,
    prev: yi
  },
  duodecade: {
    component: mi,
    next: bi,
    prev: ki
  }
};
function wi(n) {
  return n = new Date(n), n.setMonth(n.getMonth() - 1), n;
}
function xi(n) {
  return n = new Date(n), n.setMonth(n.getMonth() + 1), n;
}
function yi(n) {
  return n = new Date(n), n.setFullYear(n.getFullYear() - 1), n;
}
function vi(n) {
  return n = new Date(n), n.setFullYear(n.getFullYear() + 1), n;
}
function ki(n) {
  return n = new Date(n), n.setFullYear(n.getFullYear() - 10), n;
}
function bi(n) {
  return n = new Date(n), n.setFullYear(n.getFullYear() + 10), n;
}
function Cs(n, e) {
  let t;
  if (e === "normal") t = n;
  else {
    const { start: r, end: s } = n;
    e === "left" ? t = r : e == "right" ? t = s : t = r && s;
  }
  return t;
}
const Si = ["clear", "today"];
function $i(n) {
  if (n === "done") return -1;
  if (n === "clear") return null;
  if (n === "today") return /* @__PURE__ */ new Date();
}
function _i({
  value: n,
  current: e,
  onCurrentChange: t,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: l
}) {
  const a = he(Ze).getGroup("calendar"), [c, d] = j("month"), u = Array.isArray(o) ? o : o ? Si : [], h = (w, y) => {
    w.preventDefault(), l && l({ value: y });
  }, f = () => {
    c === "duodecade" ? d("year") : c === "year" && d("month");
  }, m = (w) => {
    const { diff: y, current: k } = w;
    if (y === 0) {
      c === "month" ? d("year") : c === "year" && d("duodecade");
      return;
    }
    if (y) {
      const v = Fr[c];
      t(y > 0 ? v.next(e) : v.prev(e));
    } else k && t(k);
    i && i();
  }, p = (w) => {
    d("month"), l && l({ select: !0, value: w });
  }, x = _(() => Fr[c].component, [c]);
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ Y("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ g(fi, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ Y("div", { children: [
          /* @__PURE__ */ g(
            x,
            {
              value: n,
              current: e,
              onCurrentChange: t,
              part: r,
              markers: s,
              onCancel: f,
              onChange: p,
              onShift: m
            }
          ),
          c === "month" && u.length > 0 && /* @__PURE__ */ g("div", { className: "wx-2Gr4AS wx-buttons", children: u.map((w) => /* @__PURE__ */ g("div", { className: "wx-2Gr4AS wx-button-item", children: /* @__PURE__ */ g(
            dr,
            {
              onClick: (y) => h(y, $i(w)),
              children: a(w)
            }
          ) }, w)) })
        ] })
      ] })
    }
  );
}
function _n(n) {
  let { words: e = null, optional: t = !1, children: r } = n, s = he(Ze);
  const o = _(() => {
    let i = s;
    return (!i || !i.extend) && (i = bt(Ut)), e !== null && (i = i.extend(e, t)), i;
  }, [e, t, s]);
  return /* @__PURE__ */ g(Ze.Provider, { value: o, children: r });
}
function Or(n, e, t, r) {
  if (!n || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), t(s);
  } else if (n.getDate() !== 1) {
    const s = new Date(n);
    s.setDate(1), t(s);
  }
}
const Ci = ["clear", "today"];
function Ns({
  value: n,
  current: e,
  markers: t = null,
  buttons: r = Ci,
  onChange: s
}) {
  const [o, i] = Te(n), [l, a] = Te(e);
  P(() => {
    Or(l, o, a, !1);
  }, [o, l]);
  const c = E(
    (u) => {
      const h = u.value;
      h ? (i(new Date(h)), Or(l, new Date(h), a, !0)) : i(null), s && s({ value: h ? new Date(h) : null });
    },
    [s, l]
  ), d = E(
    (u) => {
      a(u);
    },
    [a]
  );
  return l ? /* @__PURE__ */ g(_n, { children: /* @__PURE__ */ g(
    _i,
    {
      value: o,
      current: l,
      markers: t,
      buttons: r,
      onChange: c,
      onCurrentChange: d
    }
  ) }) : null;
}
const Ni = ["clear", "today"];
function Ti({
  value: n,
  id: e,
  disabled: t = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: i = "",
  format: l = "",
  buttons: a = Ni,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: h = !1,
  onChange: f
}) {
  const { calendar: m, formats: p } = (he(Ze) || Xt()).getRaw(), x = l || p?.dateFormat;
  let w = typeof x == "function" ? x : it(x, m);
  const [y, k] = j(n), [v, N] = j(!1);
  P(() => {
    k(n);
  }, [n]);
  function b() {
    N(!1);
  }
  function $(C) {
    const I = C === y || C && y && C.valueOf() === y.valueOf() || !C && !y;
    k(C), I || f && f({ value: C }), setTimeout(b, 1);
  }
  const D = _(
    () => y ? w(y) : "",
    [y, w]
  );
  function O({ value: C, input: I }) {
    if (!u && !h || I) return;
    let A = typeof u == "function" ? u(C) : C ? new Date(C) : null;
    A = isNaN(A) ? y || null : A || null, $(A);
  }
  return P(() => {
    const C = b;
    return window.addEventListener("scroll", C), () => window.removeEventListener("scroll", C);
  }, []), /* @__PURE__ */ Y("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => N(!0), children: [
    /* @__PURE__ */ g(
      Qt,
      {
        css: c,
        title: d,
        value: D,
        id: e,
        readonly: !u,
        disabled: t,
        error: r,
        placeholder: i,
        onInput: b,
        onChange: O,
        icon: "wxi-calendar",
        inputStyle: {
          cursor: "pointer",
          width: "100%",
          paddingRight: "calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)"
        },
        clear: h
      }
    ),
    v && !t && /* @__PURE__ */ g(
      Lt,
      {
        onCancel: b,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ g(
          Ns,
          {
            buttons: a,
            value: y,
            onChange: (C) => $(C.value)
          }
        )
      }
    )
  ] });
}
function Ts({
  value: n = "",
  options: e = [],
  textOptions: t = null,
  placeholder: r = "",
  disabled: s = !1,
  error: o = !1,
  title: i = "",
  textField: l = "label",
  clear: a = !1,
  children: c,
  onChange: d
}) {
  const u = W(null), h = W(null);
  let [f, m] = Te(n);
  function p(v) {
    u.current = v.navigate, h.current = v.keydown;
  }
  const x = _(() => f || f === 0 ? (t || e).find((v) => v.id === f) : null, [f, t, e]), w = E(
    ({ id: v }) => {
      (v || v === 0) && (m(v), u.current(null), d && d({ value: v }));
    },
    [m, d]
  ), y = E(
    (v) => {
      v.stopPropagation(), m(""), d && d({ value: "" });
    },
    [m, d]
  ), k = E(() => e.findIndex((v) => v.id === f), [e, f]);
  return /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: i,
      onClick: () => u.current(k()),
      onKeyDown: (v) => h.current(v, k()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ g("div", { className: "wx-2YgblL wx-label", children: x ? c ? c(x) : x[l] : r ? /* @__PURE__ */ g("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        a && !s && f ? /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ g($n, { items: e, onReady: p, onSelect: w, children: ({ option: v }) => c ? c(v) : v[l] })
      ]
    }
  );
}
function Un({
  id: n,
  label: e = "",
  css: t = "",
  min: r = 0,
  max: s = 100,
  value: o = 0,
  step: i = 1,
  title: l = "",
  disabled: a = !1,
  onChange: c
}) {
  const d = Ht(n), [u, h] = Te(o), f = W({ value: u, input: u }), m = _(
    () => (u - r) / (s - r) * 100 + "%",
    [u, r, s]
  ), p = _(() => a ? "" : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`, [a, m]);
  function x({ target: k }) {
    const v = k.value * 1;
    h(v), c && c({
      value: v,
      previous: f.current.input,
      input: !0
    }), f.current.input = v;
  }
  function w({ target: k }) {
    const v = k.value * 1;
    h(v), c && c({ value: v, previous: f.current.value }), f.current.value = v;
  }
  P(() => {
    h(o);
  }, [o]);
  const y = W(null);
  return P(() => {
    if (y.current)
      return y.current.addEventListener("change", w), () => {
        y.current && y.current.removeEventListener("change", w);
      };
  }, [y, w]), /* @__PURE__ */ Y("div", { className: `wx-2EDJ8G wx-slider ${t}`, title: l, children: [
    e && /* @__PURE__ */ g("label", { className: "wx-2EDJ8G wx-label", htmlFor: d, children: e }),
    /* @__PURE__ */ g("div", { className: "wx-2EDJ8G wx-inner", children: /* @__PURE__ */ g(
      "input",
      {
        id: d,
        className: "wx-2EDJ8G wx-input",
        type: "range",
        min: r,
        max: s,
        step: i,
        disabled: a,
        value: u,
        onInput: x,
        style: { background: p },
        ref: y
      }
    ) })
  ] });
}
const Di = ({
  id: n,
  value: e = 0,
  step: t = 1,
  min: r = 0,
  max: s = 1 / 0,
  error: o = !1,
  disabled: i = !1,
  readonly: l = !1,
  onChange: a
}) => {
  const c = Ht(n), [d, u] = Te(e), h = E(() => {
    if (l || d <= r) return;
    const x = d - t;
    u(x), a && a({ value: x });
  }, [d, l, r, t, a]), f = E(() => {
    if (l || d >= s) return;
    const x = d + t;
    u(x), a && a({ value: x });
  }, [d, l, s, t, a]), m = E(() => {
    if (!l) {
      const x = Math.round(Math.min(s, Math.max(d, r)) / t) * t, w = isNaN(x) ? Math.max(r, 0) : x;
      u(w), a && a({ value: w });
    }
  }, [l, d, s, r, t, a]), p = E(
    (x) => {
      const w = x.target.value * 1;
      u(w), a && a({ value: w, input: !0 });
    },
    [a]
  );
  return /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-22t21n wx-counter ${i ? "wx-disabled" : ""} ${l ? "wx-readonly" : ""} ${o ? "wx-error" : ""}`,
      children: [
        /* @__PURE__ */ g(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-dec",
            disabled: i,
            onClick: h,
            children: /* @__PURE__ */ g(
              "svg",
              {
                className: "wx-22t21n wx-dec",
                width: "12",
                height: "2",
                viewBox: "0 0 12 2",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ g("path", { d: "M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z" })
              }
            )
          }
        ),
        /* @__PURE__ */ g(
          "input",
          {
            id: c,
            type: "text",
            className: "wx-22t21n wx-input",
            disabled: i,
            readOnly: l,
            required: !0,
            value: d,
            onBlur: m,
            onInput: p
          }
        ),
        /* @__PURE__ */ g(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-inc",
            disabled: i,
            onClick: f,
            children: /* @__PURE__ */ g(
              "svg",
              {
                className: "wx-22t21n wx-inc",
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ g(
                  "path",
                  {
                    d: `M11.2501
								6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z`
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
};
function Mi({ notice: n = {} }) {
  function e() {
    n.remove && n.remove();
  }
  return /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-11sNg5 wx-notice wx-${n.type ? n.type : ""}`,
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ g("div", { className: "wx-11sNg5 wx-text", children: n.text }),
        /* @__PURE__ */ g("div", { className: "wx-11sNg5 wx-button", children: /* @__PURE__ */ g("i", { className: "wx-11sNg5 wxi-close", onClick: e }) })
      ]
    }
  );
}
function Ei({ data: n = [] }) {
  return /* @__PURE__ */ g("div", { className: "wx-3nwoO9 wx-notices", children: n.map((e) => /* @__PURE__ */ g(Mi, { notice: e }, e.id)) });
}
function Ri({
  title: n = "",
  buttons: e = ["cancel", "ok"],
  header: t,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i
}) {
  const l = (he(Ze) || Xt()).getGroup("core"), a = W(null);
  P(() => {
    a.current?.focus();
  }, []);
  function c(u) {
    switch (u.code) {
      case "Enter": {
        const h = u.target.tagName;
        if (h === "TEXTAREA" || h === "BUTTON") return;
        o && o({ event: u });
        break;
      }
      case "Escape":
        i && i({ event: u });
        break;
    }
  }
  function d(u, h) {
    const f = { event: u, button: h };
    h === "cancel" ? i && i(f) : o && o(f);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-1FxkZa wx-modal",
      ref: a,
      tabIndex: 0,
      onKeyDown: c,
      children: /* @__PURE__ */ Y("div", { className: "wx-1FxkZa wx-window", children: [
        t || (n ? /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-header", children: n }) : null),
        /* @__PURE__ */ g("div", { children: r }),
        s || e && /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-buttons", children: e.map((u) => /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-button", children: /* @__PURE__ */ g(
          lt,
          {
            type: `block ${u === "ok" ? "primary" : "secondary"}`,
            onClick: (h) => d(h, u),
            children: l(u)
          }
        ) }, u)) })
      ] })
    }
  );
}
function Ii({ children: n }, e) {
  const [t, r] = j(null), [s, o] = j([]);
  return kt(
    e,
    () => ({
      showModal: (i) => {
        const l = { ...i };
        return r(l), new Promise((a, c) => {
          l.resolve = (d) => {
            r(null), a(d);
          }, l.reject = (d) => {
            r(null), c(d);
          };
        });
      },
      showNotice: (i) => {
        i = { ...i }, i.id = i.id || Sn(), i.remove = () => o((l) => l.filter((a) => a.id !== i.id)), i.expire != -1 && setTimeout(i.remove, i.expire || 5100), o((l) => [...l, i]);
      }
    }),
    []
  ), /* @__PURE__ */ Y(ve, { children: [
    n,
    t && /* @__PURE__ */ g(
      Ri,
      {
        title: t.title,
        buttons: t.buttons,
        onConfirm: t.resolve,
        onCancel: t.reject,
        children: t.message
      }
    ),
    /* @__PURE__ */ g(Ei, { data: s })
  ] });
}
vt(Ii);
function jt({
  label: n = "",
  position: e = "",
  css: t = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const l = W(null), a = E(() => {
    if (l.current) return l.current;
    const c = Sn();
    return l.current = c, c;
  }, []);
  return /* @__PURE__ */ g(cr.Provider, { value: a, children: /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${t} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        n && /* @__PURE__ */ g("label", { className: "wx-2oVUvC wx-label", htmlFor: l.current, children: n }),
        /* @__PURE__ */ g("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: i })
      ]
    }
  ) });
}
const Ds = ({
  value: n = !1,
  type: e = "",
  icon: t = "",
  disabled: r = !1,
  iconActive: s = "",
  onClick: o,
  title: i = "",
  css: l = "",
  text: a = "",
  textActive: c = "",
  children: d,
  active: u,
  onChange: h
}) => {
  const [f, m] = Te(n), p = _(() => (f ? "pressed" : "") + (e ? " " + e : ""), [f, e]), x = E(
    (w) => {
      let y = !f;
      o && o(w), w.defaultPrevented || (m(y), h && h({ value: y }));
    },
    [f, o, h]
  );
  return f && u ? /* @__PURE__ */ g(
    lt,
    {
      title: i,
      text: f && c || a,
      css: l,
      type: p,
      icon: f && s || t,
      onClick: x,
      disabled: r,
      children: Ss(u, { value: f })
    }
  ) : d ? /* @__PURE__ */ g(
    lt,
    {
      title: i,
      text: f && c || a,
      css: l,
      type: p,
      icon: f && s || t,
      onClick: x,
      disabled: r,
      children: d
    }
  ) : /* @__PURE__ */ g(
    lt,
    {
      title: i,
      text: f && c || a,
      css: l,
      type: p,
      icon: f && s || t,
      onClick: x,
      disabled: r
    }
  );
}, Pr = new Date(0, 0, 0, 0, 0);
function Ai({
  value: n = Pr,
  id: e,
  title: t = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: l
}) {
  let [a, c] = Te(n);
  const { calendar: d, formats: u } = (he(Ze) || Xt()).getRaw(), h = d.clockFormat == 12, f = 23, m = 59, p = _(() => {
    const T = i || u?.timeFormat;
    return typeof T == "function" ? T : it(T, d);
  }, [i, u, d]), x = _(() => p(new Date(0, 0, 0, 1)).indexOf("01") != -1, [p]), w = (T, ee) => (T < 10 && ee ? `0${T}` : `${T}`).slice(-2), y = (T) => w(T, !0), k = (T) => `${T}`.replace(/[^\d]/g, "") || 0, v = (T) => h && (T = T % 12, T === 0) ? "12" : w(T, x), N = E((T, ee) => (T = k(T), Math.min(T, ee)), []), [b, $] = j(null), D = a || Pr, O = N(D.getHours(), f), C = N(D.getMinutes(), m), I = O > 12, A = v(O), L = y(C), z = _(
    () => p(new Date(0, 0, 0, O, C)),
    [O, C, p]
  ), F = E(() => {
    $(!0);
  }, []), M = E(() => {
    const T = new Date(D);
    T.setHours(T.getHours() + (I ? -12 : 12)), c(T), l && l({ value: T });
  }, [D, I, l]), B = E(
    ({ value: T }) => {
      if (D.getHours() === T) return;
      const ee = new Date(D);
      ee.setHours(T), c(ee), l && l({ value: ee });
    },
    [D, l]
  ), V = E(
    ({ value: T }) => {
      if (D.getMinutes() === T) return;
      const ee = new Date(D);
      ee.setMinutes(T), c(ee), l && l({ value: ee });
    },
    [D, l]
  ), U = E(
    (T) => (T = N(T, f), h && (T = T * 1, T === 12 && (T = 0), I && (T += 12)), T),
    [N, h, I]
  ), oe = E(() => {
    $(null);
  }, []);
  return /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : F,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ g(
          Qt,
          {
            id: e,
            css: r,
            title: t,
            value: z,
            readonly: !0,
            disabled: s,
            error: o,
            icon: "wxi-clock",
            inputStyle: {
              cursor: "pointer",
              width: "100%",
              paddingRight: "calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)"
            }
          }
        ),
        b && !s && /* @__PURE__ */ g(Lt, { onCancel: oe, width: "unset", children: /* @__PURE__ */ Y("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ Y("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: A,
                onChange: (T) => {
                  const ee = U(T.target.value);
                  B({ value: ee });
                }
              }
            ),
            /* @__PURE__ */ g("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: L,
                onChange: (T) => {
                  const ee = N(T.target.value, m);
                  V({ value: ee });
                }
              }
            ),
            h && /* @__PURE__ */ g(
              Ds,
              {
                value: I,
                onClick: M,
                active: () => /* @__PURE__ */ g("span", { children: "pm" }),
                children: /* @__PURE__ */ g("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ g(jt, { width: "unset", children: /* @__PURE__ */ g(
            Un,
            {
              label: d.hours,
              value: O,
              onChange: B,
              max: f
            }
          ) }),
          /* @__PURE__ */ g(jt, { width: "unset", children: /* @__PURE__ */ g(
            Un,
            {
              label: d.minutes,
              value: C,
              onChange: V,
              max: m
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Hi({ children: n }) {
  return /* @__PURE__ */ g("div", { className: "wx-KgpO9N wx-modal", children: /* @__PURE__ */ g("div", { className: "wx-KgpO9N wx-window", children: n }) });
}
function Li({ position: n = "right", children: e, onCancel: t }) {
  const r = W(null);
  return P(() => Yt(r.current, t).destroy, []), /* @__PURE__ */ g("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${n}`, children: e });
}
function Ms({ theme: n = "", target: e, children: t }) {
  const r = W(null), s = W(null), [o, i] = j(null);
  r.current || (r.current = document.createElement("div"));
  const l = he(qt);
  return P(() => {
    i(
      e || zi(s.current) || Be.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g("span", { ref: s, style: { display: "none" } }),
    s.current && o ? Fo(
      /* @__PURE__ */ g(
        "div",
        {
          className: `wx-3ZWsT0 wx-${n || l}-theme`,
          children: t
        }
      ),
      o
    ) : null
  ] });
}
function zi(n) {
  const e = Be.getTopNode(n);
  for (; n && n !== e && !n.getAttribute("data-wx-portal-root"); )
    n = n.parentNode;
  return n;
}
function Wi() {
  return /* @__PURE__ */ g(ve, {});
}
function Vr(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ g(qt.Provider, { value: "material", children: /* @__PURE__ */ Y(ve, { children: [
    t && /* @__PURE__ */ g("div", { className: "wx-theme wx-material-theme", children: t }),
    e && /* @__PURE__ */ Y(ve, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Wi, {}),
      /* @__PURE__ */ g(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
function Es() {
  return /* @__PURE__ */ g(ve, {});
}
function Gr(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ g(qt.Provider, { value: "willow", children: /* @__PURE__ */ Y(ve, { children: [
    t && t && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-theme", children: t }),
    e && /* @__PURE__ */ Y(ve, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Es, {}),
      /* @__PURE__ */ g(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
function jr(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ g(qt.Provider, { value: "willow-dark", children: /* @__PURE__ */ Y(ve, { children: [
    t && t && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-dark-theme", children: t }),
    e && /* @__PURE__ */ Y(ve, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Es, {}),
      /* @__PURE__ */ g(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
ar(Be);
const Cn = {
  gantt: {
    // Header / sidebar
    "Task name": "Task name",
    "Start date": "Start date",
    "Add task": "Add task",
    Duration: "Duration",
    Task: "Task",
    Milestone: "Milestone",
    "Summary task": "Summary task",
    // Sidebar
    Save: "Save",
    Delete: "Delete",
    Name: "Name",
    Description: "Description",
    "Select type": "Select type",
    Type: "Type",
    "End date": "End date",
    Progress: "Progress",
    Predecessors: "Predecessors",
    Successors: "Successors",
    "Add task name": "Add task name",
    "Add description": "Add description",
    "Select link type": "Select link type",
    "End-to-start": "End-to-start",
    "Start-to-start": "Start-to-start",
    "End-to-end": "End-to-end",
    "Start-to-end": "Start-to-end",
    // Context menu / toolbar
    Add: "Add",
    "Child task": "Child task",
    "Task above": "Task above",
    "Task below": "Task below",
    "Convert to": "Convert to",
    Edit: "Edit",
    Cut: "Cut",
    Copy: "Copy",
    Paste: "Paste",
    Move: "Move",
    Up: "Up",
    Down: "Down",
    Indent: "Indent",
    Outdent: "Outdent",
    "Split task": "Split task",
    Segment: "Segment",
    // Toolbar
    "New task": "New task",
    "Move up": "Move up",
    "Move down": "Move down",
    Undo: "Undo",
    Redo: "Redo",
    // Formats
    Week: "Week",
    Q: "Quarter"
  }
};
var Fi = (/* @__PURE__ */ new Date()).valueOf(), Oi = () => Fi++;
function Pi(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t], s = e[t];
    if (!Nn(r, s)) return !1;
  }
  return !0;
}
function Nn(n, e) {
  if (typeof n == "number" || typeof n == "string" || typeof n == "boolean" || n === null) return n === e;
  if (typeof n != typeof e || (n === null || e === null) && n !== e || n instanceof Date && e instanceof Date && n.getTime() !== e.getTime())
    return !1;
  if (typeof n == "object")
    if (Array.isArray(n) && Array.isArray(e)) {
      if (n.length !== e.length) return !1;
      for (let r = n.length - 1; r >= 0; r--)
        if (!Nn(n[r], e[r])) return !1;
      return !0;
    } else
      return Pi(n, e);
  return n === e;
}
function mn(n) {
  if (typeof n != "object" || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(mn);
  const e = {};
  for (const t in n)
    e[t] = mn(n[t]);
  return e;
}
var Rs = class {
  constructor(n) {
    this._nextHandler = null, this._dispatch = n, this.exec = this.exec.bind(this);
  }
  async exec(n, e) {
    return this._dispatch(n, e), this._nextHandler && await this._nextHandler.exec(n, e), e;
  }
  setNext(n) {
    return this._nextHandler = n;
  }
}, Is = (/* @__PURE__ */ new Date()).valueOf(), Vi = () => Is++;
function ur() {
  return "temp://" + Is++;
}
var Br = class {
  constructor(n) {
    this._data = n, this._pool = /* @__PURE__ */ new Map();
    for (let e = 0; e < n.length; e++) {
      const t = n[e];
      this._pool.set(t.id, t);
    }
  }
  add(n) {
    n = { id: Vi(), ...n }, this._data.push(n), this._pool.set(n.id, n);
  }
  update(n, e) {
    const t = this._data.findIndex((s) => s.id == n), r = { ...this._data[t], ...e };
    this._data[t] = r, this._pool.set(r.id, r);
  }
  remove(n) {
    this._data = this._data.filter((e) => e.id != n), this._pool.delete(n);
  }
  filter(n) {
    this._data = this._data.filter((e) => {
      const t = n(e);
      return t || this._pool.delete(e.id), t;
    });
  }
  byId(n) {
    return this._pool.get(n);
  }
  map(n) {
    return this._data.map(n);
  }
  forEach(n) {
    this._data.forEach(n);
  }
}, Gi = class {
  constructor(e) {
    const t = { id: 0, $level: 0, data: [], parent: null }, r = /* @__PURE__ */ new Map();
    r.set(0, t), this._pool = r, e && e.length && this.parse(e, 0);
  }
  parse(e, t) {
    const r = this._pool;
    for (let o = 0; o < e.length; o++) {
      const i = e[o];
      i.parent = i.parent || t, i.data = null, r.set(i.id, i);
    }
    for (let o = 0; o < e.length; o++) {
      const i = e[o], l = r.get(i.parent);
      l && (l.data || (l.data = []), l.data.push(i));
    }
    const s = r.get(t);
    this.setLevel(s, s.$level + 1, !1);
  }
  add(e, t) {
    const r = this._pool.get(e.parent || 0);
    e.$level = r.$level + 1, this._pool.set(e.id, e), r.data ? t === -1 ? r.data = [...r.data, e] : Kr(r, t, e) : r.data = [e];
  }
  addAfter(e, t) {
    if (!t) return this.add(e, -1);
    const r = this.byId(t), s = this.byId(r.parent), o = cn(s, r.id) + 1;
    e.parent = s.id, e.$level = s.$level + 1, this.add(e, o);
  }
  remove(e) {
    const t = this._pool.get(e);
    this._remove(t);
    const r = this._pool.get(t.parent);
    r.data = r.data.filter((s) => s.id != e), this._clearBranch(r);
  }
  _remove(e) {
    e.data && e.data.forEach((t) => this._remove(t)), this._pool.delete(e.id);
  }
  update(e, t) {
    let r = this._pool.get(e);
    const s = this._pool.get(r.parent), o = cn(s, r.id);
    r = { ...r, ...t }, s && o >= 0 && (s.data[o] = r, s.data = [...s.data]), this._pool.set(r.id, r);
  }
  move(e, t, r) {
    const s = this._pool.get(e), o = t === "child", i = this._pool.get(r), l = i.$level + (o ? 1 : 0);
    if (!s || !i) return;
    const a = this._pool.get(s.parent), c = o ? i : this._pool.get(i.parent);
    c.data || (c.data = []);
    const d = cn(a, s.id);
    ji(a, d);
    const u = o ? c.data.length : cn(c, i.id) + (t === "after" ? 1 : 0);
    if (Kr(c, u, s), a.id === c.id && d === u) return null;
    s.parent = c.id, s.$level !== l && (s.$level = l, this.setLevel(s, l + 1, !0)), this.update(s.id, s), this._clearBranch(a);
  }
  _clearBranch(e) {
    e.data && !e.data.length && (e.open && delete e.open, this.update(e.id, { data: null }));
  }
  toArray() {
    const e = [], t = this._pool.get(0).data;
    return t && As(t, e), e;
  }
  byId(e) {
    return this._pool.get(e);
  }
  getBranch(e) {
    return this._pool.get(e).data;
  }
  forEach(e) {
    this._pool.forEach((t, r) => {
      r !== 0 && e(t);
    });
  }
  eachChild(e, t) {
    const r = this.byId(t);
    !r || !r.data || r.data.forEach((s, o) => {
      e(this.byId(s.id), o), this.eachChild(e, s.id);
    });
  }
  setLevel(e, t, r) {
    e.data && (e.data = e.data.map((s) => (r && (s = { ...s }, this._pool.set(s.id, s)), s.$level = t, s.data && this.setLevel(s, t + 1, r), s)));
  }
};
function As(n, e) {
  n.forEach((t) => {
    e.push(t), t.open === !0 && As(t.data, e);
  });
}
function ji(n, e) {
  const t = [...n.data];
  t.splice(e, 1), n.data = t;
}
function Kr(n, e, t) {
  const r = [...n.data];
  r.splice(e, 0, t), n.data = r;
}
function cn(n, e) {
  return n?.data.findIndex((t) => t.id === e);
}
var Hs = 2, Bi = class {
  constructor(e) {
    e && (this._writable = e.writable, this._async = e.async), this._values = {}, this._state = {};
  }
  setState(e, t = 0) {
    const r = {};
    return this._wrapProperties(e, this._state, this._values, "", r, t), r;
  }
  getState() {
    return this._values;
  }
  getReactive() {
    return this._state;
  }
  _wrapProperties(e, t, r, s, o, i) {
    for (const l in e) {
      const a = t[l], c = r[l], d = e[l];
      if (a && (c === d && typeof d != "object" || d instanceof Date && c instanceof Date && c.getTime() === d.getTime())) continue;
      const u = s + (s ? "." : "") + l;
      a ? (a.__parse(d, u, o, i) && (r[l] = d), i & Hs ? o[u] = a.__trigger : a.__trigger()) : (d && d.__reactive ? t[l] = this._wrapNested(d, d, u, o) : t[l] = this._wrapWritable(d), r[l] = d), o[u] = o[u] || null;
    }
  }
  _wrapNested(e, t, r, s) {
    const o = this._wrapWritable(e);
    return this._wrapProperties(e, o, t, r, s, 0), o.__parse = (i, l, a, c) => (this._wrapProperties(i, o, t, l, a, c), !1), o;
  }
  _wrapWritable(e) {
    const t = [], r = function() {
      for (let s = 0; s < t.length; s++) t[s](e);
    };
    return { subscribe: (s) => (t.push(s), this._async ? setTimeout(s, 1, e) : s(e), () => {
      const o = t.indexOf(s);
      o >= 0 && t.splice(o, 1);
    }), __trigger: () => {
      t.length && (this._async ? setTimeout(r, 1) : r());
    }, __parse: function(s) {
      return e = s, !0;
    } };
  }
}, Ki = class {
  constructor(e, t, r, s) {
    typeof e == "function" ? this._setter = e : this._setter = e.setState.bind(e), this._routes = t, this._parsers = r, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((o) => {
      o.in.forEach((i) => {
        const l = this._triggers.get(i) || [];
        l.push(o), this._triggers.set(i, l);
      }), o.out.forEach((i) => {
        const l = this._sources.get(i) || {};
        o.in.forEach((a) => l[a] = !0), this._sources.set(i, l);
      });
    }), this._routes.forEach((o) => {
      o.length = Math.max(...o.in.map((i) => Ls(i, this._sources, 1)));
    }), this._bus = s;
  }
  init(e) {
    const t = {};
    for (const r in e) if (this._prev[r] !== e[r]) {
      const s = this._parsers[r];
      t[r] = s ? s(e[r]) : e[r];
    }
    this._prev = this._prev ? { ...this._prev, ...e } : { ...e }, this.setState(t), this._bus && this._bus.exec("init-state", t);
  }
  setStateAsync(e) {
    const t = this._setter(e, Hs);
    return this._async ? Object.assign(this._async.signals, t) : this._async = { signals: t, timer: setTimeout(this._applyState.bind(this), 1) }, t;
  }
  _applyState() {
    const e = this._async;
    if (e) {
      this._async = null, this._triggerUpdates(e.signals, []);
      for (const t in e.signals) {
        const r = e.signals[t];
        r && r();
      }
    }
  }
  setState(e, t = []) {
    const r = this._setter(e);
    return this._triggerUpdates(r, t), r;
  }
  _triggerUpdates(e, t) {
    const r = Object.keys(e), s = !t.length;
    t = t || [];
    for (let o = 0; o < r.length; o++) {
      const i = r[o], l = this._triggers.get(i);
      l && l.forEach((a) => {
        t.indexOf(a) == -1 && t.push(a);
      });
    }
    s && this._execNext(t);
  }
  _execNext(e) {
    for (; e.length; ) {
      e.sort((r, s) => r.length < s.length ? 1 : -1);
      const t = e[e.length - 1];
      e.splice(e.length - 1), t.exec(e);
    }
  }
};
function Ls(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => Ls(o, e, t + 1));
  return Math.max(...s);
}
var Yi = class {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(e, t, r) {
    let s = this._handlers[e];
    s ? r && r.intercept ? s.unshift(t) : s.push(t) : s = this._handlers[e] = [t], r && r.tag && this._tag.set(t, r.tag);
  }
  intercept(e, t, r) {
    this.on(e, t, { ...r, intercept: !0 });
  }
  detach(e) {
    for (const t in this._handlers) {
      const r = this._handlers[t];
      for (let s = r.length - 1; s >= 0; s--) this._tag.get(r[s]) === e && r.splice(s, 1);
    }
  }
  async exec(e, t) {
    const r = this._handlers[e];
    if (r) for (let s = 0; s < r.length; s++) {
      const o = r[s](t);
      if (o === !1 || o && o.then && await o === !1) return;
    }
    return this._nextHandler && await this._nextHandler.exec(e, t), t;
  }
  setNext(e) {
    return this._nextHandler = e;
  }
};
function Ui(n, e) {
  return typeof n == "string" ? n.localeCompare(e, void 0, { numeric: !0 }) : typeof n == "object" ? n.getTime() - e.getTime() : (n ?? 0) - (e ?? 0);
}
function qi(n, e) {
  return typeof n == "string" ? -n.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - n.getTime() : (e ?? 0) - (n ?? 0);
}
function Xi({ key: n, order: e }) {
  const t = e === "asc" ? Ui : qi;
  return (r, s) => t(r[n], s[n]);
}
function Qi(n) {
  if (!n || !n.length) return;
  const e = n.map((t) => Xi(t));
  return n.length === 1 ? e[0] : function(t, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](t, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function Zi(n, e) {
  return n.sort(Qi(e));
}
let Ji = class extends Gi {
  _sort;
  constructor(e) {
    super(), this.parse(e, 0);
  }
  parse(e, t) {
    if (!e || !e.length) return;
    const r = e.map((s) => this.normalizeTask(s));
    super.parse(r, t), this._sort && this.sortBranch(this._sort, t);
  }
  getBranch(e) {
    const t = this._pool.get(e);
    return this._pool.get(t.parent || 0).data;
  }
  contains(e, t) {
    const r = this._pool.get(e).data;
    let s = !1;
    if (r) for (let o = 0; o < r.length; o++) {
      if (r[o].id === t) {
        s = !0;
        break;
      }
      if (r[o].data && (s = this.contains(r[o].id, t), s)) break;
    }
    return s;
  }
  getIndexById(e) {
    return this.getBranch(e).findIndex((t) => t.id === e);
  }
  add(e, t) {
    const r = this.normalizeTask(e);
    return super.add(r, t), r;
  }
  copy(e, t, r) {
    const s = this.add({ ...e, id: null, data: null, parent: t }, r);
    let o = [[e.id, s.id]];
    return e.data?.forEach((i, l) => {
      const a = this.copy(i, s.id, l);
      o = o.concat(a);
    }), o;
  }
  normalizeTask(e) {
    const t = e.id || ur(), r = e.parent || 0, s = e.text || "", o = e.type || "task", i = e.progress || 0, l = e.details || "", a = { ...e, id: t, text: s, parent: r, progress: i, type: o, details: l };
    return e.segments && (a.segments = e.segments.map((c) => ({ ...c }))), e.segments && (a.segments = e.segments.map((c) => ({ ...c }))), a;
  }
  getSummaryId(e, t = !1) {
    const r = this._pool.get(e);
    if (!r.parent) return null;
    const s = this._pool.get(r.parent);
    if (t) {
      let o = e, i = this.getSummaryId(o);
      const l = [];
      for (; i; ) o = i, l.push(i), i = this.getSummaryId(o);
      return l;
    }
    return s.type === "summary" ? s.id : this.getSummaryId(s.id);
  }
  sort(e) {
    this._sort = e, e && this.sortBranch(e, 0);
  }
  sortBranch(e, t) {
    const r = this._pool.get(t || 0).data;
    r && (Zi(r, e), r.forEach((s) => {
      this.sortBranch(e, s.id);
    }));
  }
  serialize() {
    const e = [], t = this._pool.get(0).data;
    return t && zs(t, e), e;
  }
  clear() {
    this.forEach((e) => {
      this.remove(e.id);
    });
  }
};
function zs(n, e) {
  n.forEach((t) => {
    e.push(t), t.data && zs(t.data, e);
  });
}
function ge(n) {
  const e = Object.prototype.toString.call(n);
  return n instanceof Date || typeof n == "object" && e === "[object Date]" ? new n.constructor(+n) : typeof n == "number" || e === "[object Number]" || typeof n == "string" || e === "[object String]" ? new Date(n) : /* @__PURE__ */ new Date(NaN);
}
function ct(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
function Tn(n, e) {
  const t = ge(n);
  return isNaN(e) ? ct(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function hr(n, e) {
  const t = ge(n);
  if (isNaN(e)) return ct(n, NaN);
  if (!e) return t;
  const r = t.getDate(), s = ct(n, t.getTime());
  s.setMonth(t.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (t.setFullYear(s.getFullYear(), s.getMonth(), r), t);
}
function Ws(n, e) {
  const t = +ge(n);
  return ct(n, t + e);
}
const Fs = 6048e5, el = 864e5, Os = 6e4, Ps = 36e5;
function tl(n, e) {
  return Ws(n, e * Ps);
}
let nl = {};
function Vs() {
  return nl;
}
function wn(n, e) {
  const t = Vs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? t.weekStartsOn ?? t.locale?.options?.weekStartsOn ?? 0, s = ge(n), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Bt(n) {
  return wn(n, { weekStartsOn: 1 });
}
function rl(n) {
  const e = ge(n), t = e.getFullYear(), r = ct(n, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Bt(r), o = ct(n, 0);
  o.setFullYear(t, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Bt(o);
  return e.getTime() >= s.getTime() ? t + 1 : e.getTime() >= i.getTime() ? t : t - 1;
}
function wt(n) {
  const e = ge(n);
  return e.setHours(0, 0, 0, 0), e;
}
function xn(n) {
  const e = ge(n), t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +n - +t;
}
function Gs(n, e) {
  const t = wt(n), r = wt(e), s = +t - xn(t), o = +r - xn(r);
  return Math.round((s - o) / el);
}
function Yr(n) {
  const e = rl(n), t = ct(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), Bt(t);
}
function sl(n, e) {
  return Ws(n, e * Os);
}
function ol(n, e) {
  const t = e * 3;
  return hr(n, t);
}
function js(n, e) {
  const t = e * 7;
  return Tn(n, t);
}
function il(n, e) {
  return hr(n, e * 12);
}
function Gt(n, e) {
  const t = ge(n), r = ge(e), s = t.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function ll(n, e) {
  const t = wt(n), r = wt(e);
  return +t == +r;
}
function fr(n, e) {
  const t = Bt(n), r = Bt(e), s = +t - xn(t), o = +r - xn(r);
  return Math.round((s - o) / Fs);
}
function al(n, e) {
  const t = ge(n), r = ge(e), s = t.getFullYear() - r.getFullYear(), o = t.getMonth() - r.getMonth();
  return s * 12 + o;
}
function cl(n, e) {
  const t = ge(n), r = ge(e);
  return t.getFullYear() - r.getFullYear();
}
function pr(n) {
  return (e) => {
    const t = (n ? Math[n] : Math.trunc)(e);
    return t === 0 ? 0 : t;
  };
}
function Bs(n, e) {
  return +ge(n) - +ge(e);
}
function dl(n, e, t) {
  const r = Bs(n, e) / Ps;
  return pr(t?.roundingMethod)(r);
}
function ul(n, e, t) {
  const r = Bs(n, e) / Os;
  return pr(t?.roundingMethod)(r);
}
function Ks(n) {
  const e = ge(n);
  return e.setHours(23, 59, 59, 999), e;
}
function gr(n) {
  const e = ge(n), t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function hl(n) {
  const e = ge(n);
  return +Ks(e) == +gr(e);
}
function Ys(n, e) {
  const t = ge(n), r = ge(e), s = Gt(t, r), o = Math.abs(al(t, r));
  let i;
  if (o < 1) i = 0;
  else {
    t.getMonth() === 1 && t.getDate() > 27 && t.setDate(30), t.setMonth(t.getMonth() - s * o);
    let l = Gt(t, r) === -s;
    hl(ge(n)) && o === 1 && Gt(n, r) === 1 && (l = !1), i = s * (o - Number(l));
  }
  return i === 0 ? 0 : i;
}
function fl(n, e, t) {
  const r = Ys(n, e) / 3;
  return pr(t?.roundingMethod)(r);
}
function pl(n, e) {
  const t = ge(n), r = ge(e), s = Gt(t, r), o = Math.abs(cl(t, r));
  t.setFullYear(1584), r.setFullYear(1584);
  const i = Gt(t, r) === -s, l = s * (o - +i);
  return l === 0 ? 0 : l;
}
function Kt(n) {
  const e = ge(n), t = e.getMonth(), r = t - t % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function Us(n) {
  const e = ge(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function gl(n) {
  const e = ge(n), t = e.getFullYear();
  return e.setFullYear(t + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function ml(n) {
  const e = ge(n), t = ct(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function wl(n) {
  const e = ge(n);
  return e.setMinutes(59, 59, 999), e;
}
function xl(n, e) {
  const t = Vs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? t.weekStartsOn ?? t.locale?.options?.weekStartsOn ?? 0, s = ge(n), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function mr(n) {
  const e = ge(n), t = e.getMonth(), r = t - t % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function qs(n) {
  const e = ge(n), t = e.getFullYear(), r = e.getMonth(), s = ct(n, 0);
  return s.setFullYear(t, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function yl(n) {
  const e = ge(n).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Xs(n) {
  const e = ge(n);
  return String(new Date(e)) === "Invalid Date" ? NaN : yl(e) ? 366 : 365;
}
function vl(n) {
  const e = Yr(n), t = +Yr(js(e, 60)) - +e;
  return Math.round(t / Fs);
}
function Nt(n, e) {
  const t = ge(n), r = ge(e);
  return +t == +r;
}
function kl(n) {
  const e = ge(n);
  return e.setMinutes(0, 0, 0), e;
}
function bl(n, e, t) {
  const r = wn(n, t), s = wn(e, t);
  return +r == +s;
}
function Sl(n, e) {
  const t = ge(n), r = ge(e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function $l(n, e) {
  const t = Kt(n), r = Kt(e);
  return +t == +r;
}
function _l(n, e) {
  const t = ge(n), r = ge(e);
  return t.getFullYear() === r.getFullYear();
}
const qn = { year: pl, quarter: fl, month: Ys, week: fr, day: Gs, hour: dl, minute: ul }, xt = { year: { quarter: 4, month: 12, week: vl, day: Cl, hour: Nl }, quarter: { month: 3, week: Tl, day: Qs, hour: Dl }, month: { week: Ml, day: El, hour: Rl }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Cl(n) {
  return n ? Xs(n) : 365;
}
function Nl(n) {
  return Xs(n) * 24;
}
function Tl(n) {
  const e = Kt(n), t = Tn(wt(mr(n)), 1);
  return fr(t, e);
}
function Qs(n) {
  if (n) {
    const e = Kt(n), t = mr(n);
    return Gs(t, e) + 1;
  }
  return 91;
}
function Dl(n) {
  return Qs(n) * 24;
}
function Ml(n) {
  if (n) {
    const e = Us(n), t = Tn(wt(gr(n)), 1);
    return fr(t, e);
  }
  return 5;
}
function El(n) {
  return n ? qs(n) : 30;
}
function Rl(n) {
  return qs(n) * 24;
}
function yn(n, e, t) {
  const r = xt[n][e];
  return r ? typeof r == "number" ? r : r(t) : 1;
}
function Il(n, e) {
  return n === e || !!(xt[n] && xt[n][e]);
}
const vn = { year: il, quarter: ol, month: hr, week: js, day: Tn, hour: tl, minute: sl };
function wr(n, e, t) {
  if (e) {
    if (n === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (n === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => {
    const l = xt[n]?.[o];
    return !l || typeof l == "number" || eo(n, r, s, t) ? Vt(n, r, s, o, i, t) : Al(r, s, n, o, i, t);
  };
}
function Vt(n, e, t, r, s, o) {
  const i = r || n;
  let l = t, a = e;
  if (s && (l = at(i, t, o), a = at(i, e, o), a < e && (a = st(i)(a, 1))), n !== i) {
    const c = qn[i](a, l), d = yn(n, i, t);
    return c / d;
  } else return qn[i](a, l);
}
function Al(n, e, t, r, s, o) {
  let i = 0;
  const l = at(t, e, o);
  if (e > l) {
    const c = vn[t](l, 1);
    i = Vt(t, c, e, r, void 0, o), e = c;
  }
  let a = 0;
  return eo(t, e, n, o) || (a = Vt(t, at(t, n, o), e, void 0, void 0, o), e = vn[t](e, a)), a += i + Vt(t, n, e, r, void 0, o), !a && s && (a = Vt(t, n, e, r, s, o)), a;
}
function st(n, e) {
  if (e) {
    if (n === "day") return (t, r) => e.addWorkingDays(t, r, !0);
    if (n === "hour") return (t, r) => e.addWorkingHours(t, r);
  }
  return vn[n];
}
const Zs = { year: ml, quarter: Kt, month: Us, week: (n, e) => wn(n, { weekStartsOn: e }), day: wt, hour: kl };
function at(n, e, t) {
  const r = Zs[n];
  return r ? r(e, t) : new Date(e);
}
const Hl = { year: gl, quarter: mr, month: gr, week: (n, e) => xl(n, { weekStartsOn: e }), day: Ks, hour: wl }, Js = { year: _l, quarter: $l, month: Sl, week: (n, e, t) => bl(n, e, { weekStartsOn: t }), day: ll };
function eo(n, e, t, r) {
  const s = Js[n];
  return s ? s(e, t, r) : !1;
}
const Ll = { start: Zs, end: Hl, add: vn, isSame: Js, diff: qn, smallerCount: xt }, Ur = (n) => typeof n == "function" ? n(/* @__PURE__ */ new Date()) : n;
function zl(n, e) {
  for (const t in e) {
    if (t === "smallerCount") {
      const r = Object.keys(e[t]).sort((l, a) => et.indexOf(l) - et.indexOf(a)).shift();
      let s = et.indexOf(r);
      const o = e[t][r], i = Ur(o);
      for (let l = s - 1; l >= 0; l--) {
        const a = et[l], c = Ur(xt[a][r]);
        if (i <= c) break;
        s = l;
      }
      et.splice(s, 0, n);
    }
    if (t === "biggerCount") for (const r in e[t]) xt[r][n] = e[t][r];
    else Ll[t][n] = e[t];
  }
}
function Ln(n, e = 1, t) {
  return t.isWorkingDay(n) || (n = e > 0 ? t.getNextWorkingDay(n) : t.getPreviousWorkingDay(n)), n;
}
function Wl(n) {
  return (e, t) => {
    if (t > 0) for (let r = 0; r < t; r++) e = n.getNextWorkingDay(e);
    if (t < 0) for (let r = 0; r > t; r--) e = n.getPreviousWorkingDay(e);
    return e;
  };
}
function Rt(n) {
  const e = /* @__PURE__ */ new Date();
  return n.map((t) => ({ item: t, len: st(t.unit)(e, 1) })).sort((t, r) => t.len < r.len ? -1 : 1)[0].item;
}
const et = ["year", "quarter", "month", "week", "day", "hour"], Xn = 50, Qn = 300;
function Fl(n, e, t, r, s, o) {
  const i = !n || t, l = !e || t;
  let a = n, c = e, d = !1, u = !1;
  (i || l) && (s?.forEach((f) => {
    i && (!a || f.start <= a) && (a = f.start, d = !0);
    const m = f.type === "milestone" ? f.start : f.end;
    l && (!c || m >= c) && (c = m, u = !0);
  }), o?.forEach((f) => {
    i && (!a || f.start <= a) && (a = f.start, d = !0), l && (!c || f.start >= c) && (c = f.start, u = !0);
  }));
  const h = st(r || "day");
  return a ? d && (a = h(a, -1)) : c ? a = h(c, -30) : a = /* @__PURE__ */ new Date(), c ? u && (c = h(c, 1)) : c = h(a, 30), { _start: a, _end: c };
}
function Ol(n, e, t, r, s, o, i) {
  const l = Rt(i).unit, a = wr(l, void 0, o), c = a(e, n, "", !0), d = at(l, e, o);
  n = at(l, n, o), e = d < e ? st(l)(d, 1) : d;
  const u = c * r, h = s * i.length, f = i.map((p) => {
    const x = [], w = st(p.unit);
    let y = at(p.unit, n, o);
    for (; y < e; ) {
      const k = w(y, p.step), v = y < n ? n : y, N = k > e ? e : k, b = a(N, v, "", !0) * r, $ = typeof p.format == "function" ? p.format(y, k) : p.format;
      let D = "";
      p.css && (D += typeof p.css == "function" ? p.css(y) : p.css), x.push({ width: b, value: $, date: v, css: D, unit: p.unit }), y = k;
    }
    return { cells: x, add: w, height: s };
  });
  let m = r;
  return l !== t && (m = m / yn(l, t)), { rows: f, width: u, height: h, diff: a, start: n, end: e, lengthUnit: t, minUnit: l, lengthUnitWidth: m };
}
function Pl(n, e, t, r) {
  const s = typeof n == "boolean" ? {} : n, o = et.indexOf(Rt(t).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((a) => {
    a.minCellWidth || (a.minCellWidth = dn(s.minCellWidth, Xn)), a.maxCellWidth || (a.maxCellWidth = dn(s.maxCellWidth, Qn));
  });
  else {
    const a = [], c = t.length || 1, d = dn(s.minCellWidth, Xn), u = dn(s.maxCellWidth, Qn);
    t.forEach((h) => {
      h.format && !e[h.unit] && (e[h.unit] = h.format);
    }), et.forEach((h, f) => {
      if (f === o) a.push({ minCellWidth: d, maxCellWidth: u, scales: t });
      else {
        const m = [];
        if (f) for (let p = c - 1; p > 0; p--) {
          const x = et[f - p];
          x && m.push({ unit: x, step: 1, format: e[x] });
        }
        m.push({ unit: h, step: 1, format: e[h] }), a.push({ minCellWidth: d, maxCellWidth: u, scales: m });
      }
    }), s.levels = a;
  }
  s.levels[s.level] || (s.level = 0);
  const i = s.levels[s.level], l = Math.min(Math.max(r, i.minCellWidth), i.maxCellWidth);
  return { zoom: s, scales: i.scales, cellWidth: l };
}
function Vl(n, e, t, r, s, o, i) {
  n.level = t;
  let l;
  const a = r.scales || r, c = Rt(a).unit, d = Gl(c, s);
  if (e === -1) {
    const f = yn(c, s);
    l = i * f;
  } else {
    const f = yn(Rt(o).unit, c);
    l = Math.round(i / f);
  }
  const u = r.minCellWidth ?? Xn, h = r.maxCellWidth ?? Qn;
  return { scales: a, cellWidth: Math.min(h, Math.max(u, l)), lengthUnit: d, zoom: n };
}
function Gl(n, e) {
  const t = et.indexOf(n), r = et.indexOf(e);
  return r >= t ? n === "hour" ? "hour" : "day" : et[r];
}
function dn(n, e) {
  return n ?? e;
}
const Zn = 8, to = 4, jl = 3, qr = 7, Bl = Zn + to;
function no(n, e, t) {
  (n.open || n.type != "summary") && n.data?.forEach((r) => {
    typeof r.$x > "u" && so(r, t), r.$x += e, no(r, e, t);
  });
}
function Jn(n, e, t, r) {
  const s = n.getSummaryId(e.id);
  if (s) {
    const o = n.byId(s), i = { xMin: 1 / 0, xMax: 0 };
    r && io(o, t), ro(o, i, t), o.$x = i.xMin, o.$w = i.xMax - i.xMin, Jn(n, o, t);
  }
}
function ro(n, e, t) {
  n.data?.forEach((r) => {
    if (!r.unscheduled) {
      typeof r.$x > "u" && so(r, t);
      const s = r.type === "milestone" && r.$h ? r.$h / 2 : 0;
      e.xMin > r.$x + s && (e.xMin = r.$x + s);
      const o = r.$x + r.$w - s;
      e.xMax < o && (e.xMax = o);
    }
    r.type !== "summary" && ro(r, e, t);
  });
}
function so(n, e) {
  const { _scales: t, cellWidth: r } = e;
  n.$x = Math.round(t.diff(n.start, t.start, t.lengthUnit) * r), n.$w = Math.round(t.diff(n.end, n.start, t.lengthUnit, !0) * r);
}
function xr(n, e) {
  let t;
  e && (t = e.filter((s) => s.parent == n.id));
  const r = { data: t, ...n };
  if (r.data?.length) r.data.forEach((s) => {
    if (s.unscheduled && !s.data) return;
    (e || s.type != "summary" && s.data) && (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }), s = xr(s, e)), s.start && (!r.start || r.start > s.start) && (r.start = new Date(s.start));
    const o = s.end || s.start;
    o && (!r.end || r.end < o) && (r.end = new Date(o));
  });
  else if (n.type === "summary") throw Error("Summary tasks must have start and end dates if they have no subtasks");
  return r;
}
function oo(n, e, t) {
  return er(n, e, t, !1), t.splitTasks && n.segments?.forEach((r) => {
    oo(r, e, { ...t, baselines: !1 }), r.$x -= n.$x;
  }), t.baselines && er(n, e, t, !0), n;
}
function er(n, e, t, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: l } = t, { start: a, end: c, lengthUnit: d, diff: u } = i, h = (r ? "base_" : "") + "start", f = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), p = "$y" + (r ? "_base" : ""), x = "$w" + (r ? "_base" : ""), w = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let k = n[h], v = n[f];
  if (r && !k) {
    n[y] = !0;
    return;
  }
  n[h] < a && (n[f] < a || Nt(n[f], a)) ? k = v = a : n[h] > c && (k = v = c), n[m] = Math.round(u(k, a, d) * s), n[x] = Math.round(u(v, k, d, !0) * s), e !== null && (n[p] = r ? n.$y + n.$h + to : o * e + jl), n[w] = r ? Zn : l ? o - qr - Bl : o - qr, n.type === "milestone" && (n[m] = n[m] - n.$h / 2, n[x] = n.$h, r && (n[p] = n.$y + Zn, n[x] = n[w] = n.$h)), t.unscheduledTasks && n.unscheduled && !r ? n.$skip = !0 : n[y] = Nt(k, v);
}
function io(n, e, t) {
  n.data && !n.$skip && (t = t || !n.open, n.data.forEach((r) => {
    t && er(r, null, e, !1), io(r, e, t);
  }));
}
const zn = 20, Kl = function(n, e, t, r, s) {
  const o = Math.round(r / 2) - 3;
  if (!e || !t || !e.$y || !t.$y || e.$skip || t.$skip) return n.$p = "", n.$pl = 0, n;
  let i = !1, l = !1;
  switch (n.type) {
    case "e2s":
      l = !0;
      break;
    case "s2s":
      i = !0, l = !0;
      break;
    case "s2e":
      i = !0;
      break;
  }
  const a = i ? e.$x : e.$x + e.$w, c = s ? e.$y - 7 : e.$y, d = l ? t.$x : t.$x + t.$w, u = s ? t.$y - 7 : t.$y;
  if (a !== d || c !== u) {
    const h = Ul(a, c + o, d, u + o, i, l, r / 2, s), f = ql(d, u + o, l);
    n.$p = `${h},${f}`, n.$pl = Yl(n.$p);
  }
  return n;
};
function Yl(n) {
  const e = n.split(",").map(Number), t = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && t.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < t.length - 1; s++) {
    const [o, i] = t[s], [l, a] = t[s + 1];
    r += Math.hypot(l - o, a - i);
  }
  return r;
}
function Ul(n, e, t, r, s, o, i, l) {
  const a = zn * (s ? -1 : 1), c = zn * (o ? -1 : 1), d = n + a, u = t + c, h = [n, e, d, e, 0, 0, 0, 0, u, r, t, r], f = u - d;
  let m = r - e;
  const p = o === s;
  return p || (u <= n + zn - 2 && o || u > n && !o) && (m = l ? m - i + 6 : m - i), p && o && d > u || p && !o && d < u ? (h[4] = h[2] + f, h[5] = h[3], h[6] = h[4], h[7] = h[5] + m) : (h[4] = h[2], h[5] = h[3] + m, h[6] = h[4] + f, h[7] = h[5]), h.join(",");
}
function ql(n, e, t) {
  return t ? `${n - 5},${e - 3},${n - 5},${e + 3},${n},${e}` : `${n + 5},${e + 3},${n + 5},${e - 3},${n},${e}`;
}
function lo(n) {
  return n.map((e) => {
    const t = e.id || ur();
    return { ...e, id: t };
  });
}
const ao = ["start", "end", "duration"];
function Xl(n, e) {
  const { type: t, unscheduled: r } = n;
  return r || t === "summary" ? !ao.includes(e) : t === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function Ql(n, e) {
  return typeof e == "function" ? e : ao.includes(n) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (t, r) => Xl(t, r.id) ? e : null) : e;
}
function Zl(n) {
  return !n || !n.length ? [] : n.map((e) => {
    const t = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), i = e.editor && Ql(e.id, e.editor);
    return { width: o, align: t, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...i && { editor: i }, ...e.options && { options: e.options } };
  });
}
const co = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function Tt(n, e, t, r) {
  const { selected: s, tasks: o } = n.getState(), i = s.length, l = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], a = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], h = { "indent-task:remove": 2 }, f = !i && d.includes(e), m = { parent: u.includes(e), level: h[e] };
  if (t = t || (i ? s[s.length - 1] : null), !(!t && !f)) {
    if (e !== "paste-task" && (n._temp = null), l.includes(e) || f || s.length === 1) Xr(n, e, t, r);
    else if (i) {
      const p = a.includes(e) ? s : Jl(s, o, m);
      c.includes(e) && p.reverse();
      const x = n.getHistory();
      x && x.startBatch(), p.forEach((w, y) => Xr(n, e, w, r, y)), x && x.endBatch();
    }
  }
}
function Jl(n, e, t) {
  let r = n.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (t.parent || t.level) && (r = r.filter((s) => t.level && s.level <= t.level || !n.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function Xr(n, e, t, r, s) {
  const o = n.exec ? n.exec : n.in.exec;
  let i = e.split(":")[0], l = e.split(":")[1];
  const a = t?.id || t;
  let c = { id: a }, d = {}, u = !1;
  if (i == "copy-task" || i == "cut-task") {
    n._temp || (n._temp = []), n._temp.push({ id: a, cut: i == "cut-task" });
    return;
  } else if (i == "paste-task") {
    if (n._temp && n._temp.length) {
      const h = n.getHistory();
      h && h.startBatch();
      const f = /* @__PURE__ */ new Map();
      if (n._temp.forEach((m) => {
        const p = { id: m.id, target: a, mode: "after" };
        o(m.cut ? "move-task" : "copy-task", p), f.set(m.id, p.id);
      }), !n._temp[0].cut) {
        const { links: m } = n.getState(), p = n._temp.map((w) => w.id), x = [];
        m.forEach((w) => {
          p.includes(w.source) && p.includes(w.target) && x.push(w);
        }), x.forEach((w) => {
          o("add-link", { link: { source: f.get(w.source), target: f.get(w.target), type: w.type } });
        }), n._temp.forEach((w, y) => {
          o("select-task", { id: f.get(w.id), toggle: !!y });
        });
      }
      h && h.endBatch(), n._temp = null;
    }
    return;
  } else i === "add-task" ? (d = { task: { type: "task", text: r("New Task") }, target: a, show: !0, select: !1 }, c = {}, u = !0) : i === "edit-task" ? (i = "show-editor", l === "segment" && typeof t == "object" && (d = t)) : i === "convert-task" ? (i = "update-task", d = { task: { type: l } }, l = void 0) : i === "indent-task" && (l = l === "add");
  if (i === "split-task" && typeof t == "object") d = t;
  else if (i === "delete-task" && l === "segment" && typeof t == "object") {
    const h = n.getTask(a), { segmentIndex: f } = t, m = h.segments.filter((p, x) => x !== f);
    o("update-task", { id: a, task: { segments: m } });
    return;
  }
  typeof l < "u" && (d = { mode: l, ...d }), c = { ...c, ...d }, o(i, c), u && o("select-task", { id: c.id, toggle: !!s });
}
function yr(n, e) {
  return n.some((t) => t.data ? yr(t.data, e) : t.id === e);
}
const Qr = (n, e) => st(n, e), ea = (n, e) => wr(n, e);
function tr(n, e) {
  Array.isArray(n) && (n.forEach((t) => pt(t, e)), n.forEach((t) => {
    if (t.type === "summary" && !(t.start && t.end)) {
      const { start: r, end: s } = xr(t, n);
      t.start = r, t.end = s, pt(t, e);
    }
  }));
}
function pt(n, e) {
  n.unscheduled || Zr(n, e, !1), n.base_start && Zr(n, e, !0);
}
function Zr(n, e, t) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [i, l, a] = uo(t);
  n.type === "milestone" ? (n[a] = 0, n[l] = void 0) : n[i] && (n[a] ? n[l] = Qr(o, r)(n[i], n[a]) : n[l] ? n[a] = ea(o, r)(n[l], n[i]) : (n[l] = Qr(o, r)(n[i], 1), n[a] = 1));
}
function uo(n) {
  return n ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function Jr(n, e, t) {
  const [r, s, o] = uo(t);
  (e === o || e === r) && (n[s] = null), e === s && (n[o] = 0, n[r] && n[r] >= n[s] && (n[s] = null, n[o] = 1));
}
function ho(n, e, t) {
  Jr(n, t, !1), n.base_start && Jr(n, t, !0), pt(n, e);
}
class ta extends Bi {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new Ki(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale", "markers"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: i, start: l, end: a, tasks: c, scales: d, autoScale: u, markers: h } = this.getState();
      if (!l || !a || u) {
        const f = Rt(d).unit, m = Fl(l, a, u, f, c, h);
        (m._end != o || m._start != i) && this.setState(m, s);
      } else this.setState({ _start: l, _end: a }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: l, _end: a, cellWidth: c, scaleHeight: d, scales: u, _weekStart: h } = o, f = Rt(u).unit;
      Il(f, i) || (i = f);
      const m = Ol(l, a, i, c, d, h, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: l, _scales: a, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), h = l.toArray().map((f, m) => oo(f, m, { cellWidth: o, cellHeight: i, _scales: a, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: h }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: l, baselines: a, criticalPath: c } = this.getState(), d = i.map((u) => {
        const h = o.byId(u.source), f = o.byId(u.target);
        return Kl(u, h, f, l, a);
      }).toSorted((u, h) => c ? !!u.$critical == !!h.$critical ? h.$pl - u.$pl : u.$critical ? 1 : -1 : h.$pl - u.$pl).filter((u) => u !== null);
      this.setState({ _links: d }, s);
    } }, { in: ["tasks", "activeTask"], out: ["_activeTask"], exec: (s) => {
      const o = this.getState();
      let { activeTask: i } = o;
      i && typeof i == "object" && (i = i.id);
      const l = o.tasks.byId(i);
      this.setState({ _activeTask: l || null }, s);
    } }, { in: ["tasks", "selected"], out: ["_selected"], exec: (s) => {
      const { tasks: o, selected: i } = this.getState(), l = i.map((a) => o.byId(a)).filter((a) => !!a);
      this.setState({ _selected: l }, s);
    } }, { in: ["start", "end"], out: ["cellWidth"], exec: (s) => {
      const { _cellWidth: o, cellWidth: i } = this.getState();
      o != i && this.setState({ cellWidth: o }, s);
    } }], { tasks: (s) => new Ji(s), links: (s) => new Br(s), columns: (s) => Zl(s) });
    const t = this.in = new Yi();
    t.on("show-editor", (s) => {
      const { splitTasks: o } = this.getState();
      if (o) {
        const { id: i, segmentIndex: l } = s;
        if (i && (l || l === 0)) {
          this.setStateAsync({ activeTask: { id: i, segmentIndex: l } });
          return;
        }
      }
      this.setStateAsync({ activeTask: s.id });
    }), t.on("select-task", ({ id: s, toggle: o, range: i, show: l, segmentIndex: a }) => {
      const { selected: c, _tasks: d, activeTask: u, splitTasks: h } = this.getState();
      let f = !1, m;
      if (c.length && (o || i)) {
        const x = [...c];
        if (i) {
          const w = x[x.length - 1], y = d.findIndex(($) => $.id == w), k = d.findIndex(($) => $.id == s), v = Math.min(y, k), N = Math.max(y, k) + 1, b = d.slice(v, N).map(($) => $.id);
          y > k && b.reverse(), b.forEach(($) => {
            x.includes($) || x.push($);
          });
        } else if (o) {
          const w = x.findIndex((y) => y == s);
          w === -1 ? x.push(s) : (f = !0, x.splice(w, 1));
        }
        m = x;
      } else m = [s];
      const p = { selected: m };
      l && m.length && (p._scrollTask = { id: m[0], mode: l }), this.setStateAsync(p), !f && u && (u !== s || h) && t.exec("show-editor", { id: s, ...h && { segmentIndex: a } });
    }), t.on("delete-link", ({ id: s }) => {
      const { links: o } = this.getState();
      o.remove(s), this.setStateAsync({ links: o });
    }), t.on("update-link", (s) => {
      const { links: o } = this.getState(), i = s.id;
      let l = s.link;
      o.update(i, l), l = o.byId(i), !l.lag && l.lag !== 0 && delete l.lag, this.setStateAsync({ links: o }), s.link = l;
    }), t.on("add-link", (s) => {
      const { link: o } = s, { links: i } = this.getState();
      !o.source || !o.target || (o.type || (o.type = "e2s"), o.id = o.id || ur(), i.add(o), this.setStateAsync({ links: i }), s.id = o.id, s.link = i.byId(o.id));
    });
    let r = null;
    t.on("move-task", (s) => {
      const { tasks: o } = this.getState();
      let { mode: i, target: l } = s;
      const { id: a, inProgress: c } = s, d = o.byId(a);
      if (typeof c > "u" ? s.source = d.parent : s.source = r = r ?? d.parent, c === !1) {
        o.update(d.id, { $reorder: !1 }), this.setState({ tasks: o }), r = null;
        return;
      }
      if (l === a || o.contains(a, l)) {
        s.skipProvider = !0;
        return;
      }
      if (i === "up" || i === "down") {
        const u = o.getBranch(a);
        let h = o.getIndexById(a);
        if (i === "up") {
          const f = d.parent === 0;
          if (h === 0 && f) {
            s.skipProvider = !0;
            return;
          }
          h -= 1, i = "before";
        } else if (i === "down") {
          const f = h === u.length - 1, m = d.parent === 0;
          if (f && m) {
            s.skipProvider = !0;
            return;
          }
          h += 1, i = "after";
        }
        if (l = u[h] && u[h].id || d.parent, l) {
          const f = o.getBranch(l);
          let m = o.getIndexById(l), p = f[m];
          if (p.data) {
            if (i === "before") {
              if (p.parent === d.parent) {
                for (; p.data; ) p.open || t.exec("open-task", { id: p.id, mode: !0 }), p = p.data[p.data.length - 1];
                l = p.id;
              }
            } else if (i === "after") {
              let y;
              p.parent === d.parent ? (y = p, p = p.data[0], l = p.id, i = "before") : f.length - 1 !== m && (y = p, m += 1, p = f[m], d.$level > p.$level && p.data ? (y = p, p = p.data[0], l = p.id, i = "before") : l = p.id), y && !y.open && t.exec("open-task", { id: y.id, mode: !0 });
            }
          }
          const x = o.getSummaryId(d.id);
          o.move(a, i, l);
          const w = o.getSummaryId(a);
          x != w && (x && this.resetSummaryDates(x, "move-task"), w && this.resetSummaryDates(w, "move-task"));
        }
      } else {
        const u = o.byId(l);
        let h = u, f = !1;
        for (; h.$level > d.$level; ) h = o.byId(h.parent), h.id === a && (f = !0);
        if (f) return;
        const m = o.getSummaryId(d.id);
        if (o.move(a, i, l), i == "child") {
          let x = u;
          for (; x.id !== 0 && !x.open; ) t.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        }
        const p = o.getSummaryId(a);
        m != p && (m && this.resetSummaryDates(m, "move-task"), p && this.resetSummaryDates(p, "move-task"));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }), s.target = l, s.mode = i;
    }), t.on("drag-task", (s) => {
      const o = this.getState(), { tasks: i, _tasks: l, _selected: a, _scales: c, cellWidth: d, cellHeight: u } = o, h = i.byId(s.id), { left: f, top: m, width: p, start: x, inProgress: w } = s, y = { _tasks: l, _selected: a };
      if (typeof p < "u" && (h.$w = p, Jn(i, h, { _scales: c, cellWidth: d })), typeof f < "u") {
        if (h.type === "summary") {
          const k = f - h.$x;
          no(h, k, { _scales: c, cellWidth: d });
        }
        h.$x = f, Jn(i, h, { _scales: c, cellWidth: d, cellHeight: u }, !x);
      }
      typeof m < "u" && (h.$y = m + 4, h.$reorder = w), this.setState(y);
    }), t.on("update-task", (s) => {
      const { id: o, segmentIndex: i, diff: l, eventSource: a } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: h, splitTasks: f, calendar: m } = this.getState(), p = d.byId(o), x = { durationUnit: h, calendar: m };
      if (a === "add-task" || a === "copy-task" || a === "move-task" || a === "update-task" || a === "delete-task" || a === "provide-data") {
        pt(c, x), d.update(o, c);
        return;
      }
      const w = u.lengthUnit;
      let y = st(w);
      const k = wr(h, m);
      if (l && (c.start && (c.start = y(c.start, l)), !i && i !== 0 && (c.start && c.end ? c.duration = p.duration : (c.start ? c.end = p.end : (c.end = y(c.end, l), c.start = p.start, c.duration = k(c.end, c.start)), k(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? p.type, m && c.start && (c.start = Ln(c.start, l, m)), c.start && c.end && (!Nt(c.start, p.start) || !Nt(c.end, p.end)) && c.type === "summary" && p.data?.length) {
        let N = l || k(c.start, p.start);
        m && (N = c.start > p.start ? k(c.start, p.start) : -k(p.start, c.start), y = Wl(m)), this.moveSummaryKids(p, (b) => (b = y(b, N), m ? Ln(b, l, m) : b), "update-task");
      }
      c.start || (c.start = p.start), !c.end && !c.duration && (c.duration = p.duration), pt(c, x), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && p.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
      const v = d.getSummaryId(o);
      v && this.resetSummaryDates(v, "update-task"), this.setStateAsync({ tasks: d }), s.task = d.byId(o);
    }), t.on("add-task", (s) => {
      const { tasks: o, _scales: i, unscheduledTasks: l, durationUnit: a, splitTasks: c, calendar: d } = this.getState(), { target: u, mode: h, task: f, show: m, select: p = !0 } = s;
      !s.eventSource && l && (f.unscheduled = !0);
      let x = -1, w, y;
      if (u ? (y = o.byId(u), h == "child" ? (w = y, f.parent = w.id) : (y.parent !== null && (w = o.byId(y.parent), f.parent = w.id), x = o.getIndexById(u), h == "after" && (x += 1))) : f.parent && (w = o.byId(f.parent)), !f.start) {
        if (w?.start) f.start = new Date(w.start.valueOf());
        else if (y) f.start = new Date(y.start.valueOf());
        else {
          const b = o.getBranch(0);
          let $;
          if (b?.length) {
            const D = b[b.length - 1];
            if (!D.$skip) {
              const O = new Date(D.start.valueOf());
              i.start <= O && ($ = O);
            }
          }
          f.start = $ || st(a, d)(i.start, 1);
        }
        f.duration = 1;
      }
      d && (f.start = Ln(f.start, 1, d)), this.getState().baselines && (f.base_start = f.start, f.base_duration = f.duration), pt(f, { durationUnit: a, calendar: d });
      const k = o.add(f, x), v = { tasks: o };
      if (w && m) {
        for (; w && w.id; ) t.exec("open-task", { id: w.id, mode: !0 }), w = o.byId(w.parent);
        v._scrollTask = { id: k.id, mode: m };
      }
      s.id = k.id;
      const N = o.getSummaryId(k.id);
      N && this.resetSummaryDates(N, "add-task"), this.setStateAsync(v), s.id = k.id, s.task = k, p && t.exec("select-task", { id: k.id });
    }), t.on("delete-task", (s) => {
      const { id: o } = s, { tasks: i, links: l, selected: a } = this.getState();
      s.source = i.byId(o).parent;
      const c = i.getSummaryId(o), d = [o];
      i.eachChild((h) => d.push(h.id), o), l.filter((h) => !(d.includes(h.source) || d.includes(h.target)));
      const u = { tasks: i, links: l };
      a.includes(o) && (u.selected = a.filter((h) => h !== o)), i.remove(o), c && this.resetSummaryDates(c, "delete-task"), this.setStateAsync(u);
    }), t.on("indent-task", ({ id: s, mode: o }) => {
      const { tasks: i } = this.getState();
      if (o) {
        const l = i.getBranch(s)[i.getIndexById(s) - 1];
        l && t.exec("move-task", { id: s, mode: "child", target: l.id });
      } else {
        const l = i.byId(s), a = i.byId(l.parent);
        a && a.parent !== null && t.exec("move-task", { id: s, mode: "after", target: l.parent });
      }
    }), t.on("copy-task", (s) => {
      const { id: o, target: i, mode: l, eventSource: a } = s;
      if (a === "copy-task") return;
      const { tasks: c, links: d } = this.getState();
      if (c.contains(o, i)) {
        s.skipProvider = !0;
        return;
      }
      const u = c.getSummaryId(o), h = c.getSummaryId(i);
      let f = c.getIndexById(i);
      l == "before" && (f -= 1);
      const m = c.byId(o), p = c.copy(m, c.byId(i).parent, f + 1);
      s.source = s.id, s.id = p[0][1], m.lazy && (s.lazy = !0), u != h && h && this.resetSummaryDates(h, "copy-task");
      let x = [];
      for (let w = 1; w < p.length; w++) {
        const [y, k] = p[w];
        d.forEach((v) => {
          if (v.source === y) {
            const N = { ...v };
            delete N.target, x.push({ ...N, source: k });
          } else if (v.target === y) {
            const N = { ...v };
            delete N.source, x.push({ ...N, target: k });
          }
        });
      }
      x = x.reduce((w, y) => {
        const k = w.findIndex((v) => v.id === y.id);
        return k > -1 ? w[k] = { ...w[k], ...y } : w.push(y), w;
      }, []);
      for (let w = 1; w < p.length; w++) {
        const [y, k] = p[w], v = c.byId(k);
        t.exec("copy-task", { source: y, id: k, lazy: !!v.lazy, eventSource: "copy-task", target: v.parent, mode: "child", skipUndo: !0 });
      }
      x.forEach((w) => {
        t.exec("add-link", { link: { source: w.source, target: w.target, type: w.type }, eventSource: "copy-task", skipUndo: !0 });
      }), this.setStateAsync({ tasks: c });
    }), t.on("open-task", ({ id: s, mode: o }) => {
      const { tasks: i } = this.getState(), l = i.byId(s);
      l.lazy ? t.exec("request-data", { id: l.id }) : (i.toArray().forEach((a) => a.$y = 0), i.update(s, { open: o }), this.setState({ tasks: i }));
    }), t.on("scroll-chart", ({ left: s, top: o }) => {
      if (!isNaN(s)) {
        const i = this.calcScaleDate(s);
        this.setState({ scrollLeft: s, _scaleDate: i });
      }
      isNaN(o) || this.setState({ scrollTop: o });
    }), t.on("render-data", (s) => {
      this.setState({ area: s });
    }), t.on("provide-data", (s) => {
      const { tasks: o, links: i, durationUnit: l, calendar: a, splitTasks: c } = this.getState(), d = o.byId(s.id);
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], tr(s.data.tasks, { durationUnit: l, calendar: a }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new Br(i.map((u) => u).concat(lo(s.data.links))) });
    }), t.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: i, cellWidth: l, _cellWidth: a, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let h = l;
      s < 0 && (h = a || l);
      const f = h + s * 50, m = i.levels[i.level], p = s < 0 && l > m.maxCellWidth;
      if (f < m.minCellWidth || f > m.maxCellWidth || p) {
        if (!this.changeScale(i, s)) return;
      } else this.setState({ cellWidth: f, _cellWidth: f });
      const { _scales: x, _start: w, cellWidth: y, _weekStart: k } = this.getState(), v = at(x.minUnit, w, k), N = x.diff(u, v, "hour");
      typeof o > "u" && (o = y);
      let b = Math.round(N * y) - o;
      b < 0 && (b = 0), this.setState({ scrollLeft: b, _scaleDate: u, _zoomOffset: o });
    }), t.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: i, start: l, end: a, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: h } = this.getState(), f = st(i.minUnit);
      let m = i.width;
      if (l && a) {
        if (m < s && m) {
          const k = s / m;
          this.setState({ cellWidth: d * k });
        }
        return !0;
      }
      let p = 0;
      for (; m < s; ) m += d, p++;
      const x = p && a ? -p : 0, w = l || f(o, x);
      let y = 0;
      if (u) {
        const k = i.diff(u, w, "hour");
        y = Math.max(0, Math.round(k * d) - (h || 0));
      }
      this.setState({ _start: w, _end: a || f(c, p), scrollLeft: y });
    }), t.on("sort-tasks", ({ key: s, order: o, add: i }) => {
      const l = this.getState(), { tasks: a } = l;
      let c = l._sort;
      const d = { key: s, order: o };
      let u = c?.length || 0;
      u && i ? (c.forEach((h, f) => {
        h.key === s && (u = f);
      }), c[u] = d) : c = [d], a.sort(c), this.setState({ _sort: c, tasks: a });
    }), t.on("hotkey", ({ key: s, event: o, eventSource: i }) => {
      switch (s) {
        case "arrowup":
        case "arrowdown": {
          const { selected: l, _tasks: a } = this.getState();
          o.preventDefault();
          const c = l.length;
          let d;
          if (s === "arrowup" ? d = c ? this.getPrevRow(l[c - 1])?.id : a[a.length - 1]?.id : d = c ? this.getNextRow(l[c - 1])?.id : a[0]?.id, d) {
            const u = i === "chart" ? "xy" : !0;
            this.in.exec("select-task", { id: d, show: u });
          }
          break;
        }
        case "ctrl+c": {
          Tt(this, "copy-task", null, null);
          break;
        }
        case "ctrl+x": {
          Tt(this, "cut-task", null, null);
          break;
        }
        case "ctrl+v": {
          Tt(this, "paste-task", null, null);
          break;
        }
        case "ctrl+d":
        case "backspace": {
          o.preventDefault(), Tt(this, "delete-task", null, null);
          break;
        }
        case "ctrl+z": {
          this.in.exec("undo", {});
          break;
        }
        case "ctrl+y": {
          this.in.exec("redo", {});
          break;
        }
      }
    });
  }
  init(e) {
    const t = this.getState().area ? {} : { scrollLeft: 0, scrollTop: 0, area: { from: 0, start: 0, end: 0 } };
    e.cellWidth && (e._cellWidth = e.cellWidth), e._sort = null, e.unscheduledTasks = !1, e.baselines = !1, e.markers = [], e._markers = [], e.undo = !1, e.schedule = {}, e.criticalPath = null, e.splitTasks = !1, e.summary = {}, Array.isArray(e.tasks) && this.getHistory()?.resetHistory(), this._router.init({ _scrollTask: null, selected: [], markers: [], autoScale: !0, durationUnit: "day", ...t, ...e });
  }
  setState(e, t) {
    return this._router.setState(e, t);
  }
  setStateAsync(e) {
    this._router.setStateAsync(e);
  }
  getTask(e) {
    const { tasks: t } = this.getState();
    return t.byId(e);
  }
  getHistory() {
    return this.getState().undo ? this._modules.get("historyManager") : null;
  }
  serialize() {
    return this.getState().tasks.serialize();
  }
  changeScale(e, t) {
    const r = e.level + t, s = e.levels[r];
    if (s) {
      const { cellWidth: o, scales: i, _scales: l } = this.getState(), a = Vl(e, t, r, s, l.lengthUnit, i, o);
      return a._cellWidth = a.cellWidth, this.setState(a), !0;
    }
    return !1;
  }
  isScheduled(e) {
    return this.getState().unscheduledTasks ? e.some((t) => !t.unscheduled || t.data && this.isScheduled(t.data)) : !0;
  }
  resetSummaryDates(e, t, r) {
    const { tasks: s, durationUnit: o, splitTasks: i, calendar: l } = this.getState(), a = s.byId(e), c = a.data;
    if (c?.length && this.isScheduled(c)) {
      const d = xr({ ...a, start: void 0, end: void 0, duration: void 0 });
      if (!Nt(a.start, d.start) || !Nt(a.end, d.end)) {
        r ? (pt(d, { durationUnit: o, calendar: l }), s.update(e, d)) : this.in.exec("update-task", { id: e, task: d, eventSource: t, skipUndo: !0 });
        const u = s.getSummaryId(e);
        u && this.resetSummaryDates(u, t);
      }
    }
  }
  moveSummaryKids(e, t, r) {
    const { tasks: s } = this.getState();
    e.data.forEach((o) => {
      const i = { ...s.byId(o.id), start: t(o.start) };
      delete i.end, delete i.id, this.in.exec("update-task", { id: o.id, task: i, eventSource: r, skipUndo: !0 }), o.data?.length && this.moveSummaryKids(o, t, r);
    });
  }
  calcScaleDate(e) {
    const { _scales: t, _start: r, _weekStart: s } = this.getState(), o = t.lengthUnit === "day" ? t.lengthUnitWidth / 24 : t.lengthUnitWidth;
    return st("hour")(at(t.minUnit, r, s), Math.floor(e / o));
  }
  getNextRow(e) {
    const t = this.getState()._tasks, r = t.findIndex((s) => s.id == e);
    return t[r + 1];
  }
  getPrevRow(e) {
    const t = this.getState()._tasks, r = t.findIndex((s) => s.id == e);
    return t[r - 1];
  }
}
function na(n, e, t, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = ra(s, n, e, 1, t);
    sa(o, r, 0, n, 0, e);
  }
  return s.toDataURL();
}
function ra(n, e, t, r, s) {
  n.setAttribute("width", (e * r).toString()), n.setAttribute("height", (t * r).toString());
  const o = n.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function sa(n, e, t, r, s, o) {
  n.beginPath(), n.moveTo(r, s), n.lineTo(r, o), e === "full" && n.lineTo(t, o), n.stroke();
}
const Dn = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }];
function nr(n) {
  let e = [...fo];
  const t = n?.taskTypes || Dn, r = e.find((s) => s.id == "convert-task");
  return r.data = [], t.forEach((s) => {
    (!n?.summary?.autoConvert || s.id !== "summary") && r.data.push(r.dataFactory(s));
  }), e;
}
function vr(n) {
  return n.map((e) => {
    switch (e.data && vr(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.isDisabled = (t, r) => ia(t, r);
        break;
      case "move-task:down":
        e.isDisabled = (t, r) => la(t, r);
        break;
      case "indent-task:add":
        e.isDisabled = (t, r) => aa(t, r) === t.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (t) => oa(t);
        break;
    }
    return e;
  });
}
function oa(n) {
  return n.parent === 0;
}
function ia(n, e) {
  const { _tasks: t } = e;
  return t[0]?.id === n.id;
}
function la(n, e) {
  const { _tasks: t } = e;
  return t[t.length - 1]?.id === n.id;
}
function aa(n, e) {
  const { _tasks: t } = e, r = t.findIndex((s) => s.id === n.id);
  return t[r - 1]?.id ?? n.parent;
}
function es(n) {
  return n && typeof n == "object";
}
function ca(n) {
  return !n.selected || n.selected.length < 2;
}
const da = (n) => (e) => e.type === n, fo = vr([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (n) => ({ id: `convert-task:${n.id}`, text: `${n.label}`, isDisabled: da(n.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (n, e, t) => es(t) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (n, e, t) => ca(e) && es(t) }]);
function rr(n) {
  return [...po];
}
const po = vr([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
function Wn(n) {
  return n.type === "summary";
}
function Fn(n) {
  return n.type === "milestone";
}
function On(n) {
  return typeof n.parent > "u";
}
function Pn(n, e) {
  return e.unscheduledTasks && n.unscheduled;
}
function go(n) {
  const e = mo.map((r) => ({ ...r })), t = e.find((r) => r.key == "type");
  return t.options = n?.taskTypes || Dn, e;
}
const mo = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (n) => On(n) }, { key: "start", comp: "date", label: "Start date", isHidden: (n) => Wn(n), isDisabled: Pn }, { key: "end", comp: "date", label: "End date", isHidden: (n) => Wn(n) || Fn(n), isDisabled: Pn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (n) => Wn(n) || Fn(n), isDisabled: Pn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (n) => Fn(n) || On(n) }, { key: "links", comp: "links", label: "", isHidden: (n) => On(n) }], ut = It(null);
(/* @__PURE__ */ new Date()).valueOf();
function ua(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t], s = e[t];
    if (!Zt(r, s)) return !1;
  }
  return !0;
}
function Zt(n, e) {
  if (typeof n == "number" || typeof n == "string" || typeof n == "boolean" || n === null) return n === e;
  if (typeof n != typeof e || (n === null || e === null) && n !== e || n instanceof Date && e instanceof Date && n.getTime() !== e.getTime()) return !1;
  if (typeof n == "object") if (Array.isArray(n) && Array.isArray(e)) {
    if (n.length !== e.length) return !1;
    for (let t = n.length - 1; t >= 0; t--) if (!Zt(n[t], e[t])) return !1;
    return !0;
  } else return ua(n, e);
  return n === e;
}
function sr(n) {
  if (typeof n != "object" || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(sr);
  const e = {};
  for (const t in n) e[t] = sr(n[t]);
  return e;
}
var wo = 2, ha = class {
  constructor(e) {
    e && (this._writable = e.writable, this._async = e.async), this._values = {}, this._state = {};
  }
  setState(e, t = 0) {
    const r = {};
    return this._wrapProperties(e, this._state, this._values, "", r, t), r;
  }
  getState() {
    return this._values;
  }
  getReactive() {
    return this._state;
  }
  _wrapProperties(e, t, r, s, o, i) {
    for (const l in e) {
      const a = t[l], c = r[l], d = e[l];
      if (a && (c === d && typeof d != "object" || d instanceof Date && c instanceof Date && c.getTime() === d.getTime())) continue;
      const u = s + (s ? "." : "") + l;
      a ? (a.__parse(d, u, o, i) && (r[l] = d), i & wo ? o[u] = a.__trigger : a.__trigger()) : (d && d.__reactive ? t[l] = this._wrapNested(d, d, u, o) : t[l] = this._wrapWritable(d), r[l] = d), o[u] = o[u] || null;
    }
  }
  _wrapNested(e, t, r, s) {
    const o = this._wrapWritable(e);
    return this._wrapProperties(e, o, t, r, s, 0), o.__parse = (i, l, a, c) => (this._wrapProperties(i, o, t, l, a, c), !1), o;
  }
  _wrapWritable(e) {
    const t = [], r = function() {
      for (let s = 0; s < t.length; s++) t[s](e);
    };
    return { subscribe: (s) => (t.push(s), this._async ? setTimeout(s, 1, e) : s(e), () => {
      const o = t.indexOf(s);
      o >= 0 && t.splice(o, 1);
    }), __trigger: () => {
      t.length && (this._async ? setTimeout(r, 1) : r());
    }, __parse: function(s) {
      return e = s, !0;
    } };
  }
}, fa = class {
  constructor(e, t, r, s) {
    typeof e == "function" ? this._setter = e : this._setter = e.setState.bind(e), this._routes = t, this._parsers = r, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((o) => {
      o.in.forEach((i) => {
        const l = this._triggers.get(i) || [];
        l.push(o), this._triggers.set(i, l);
      }), o.out.forEach((i) => {
        const l = this._sources.get(i) || {};
        o.in.forEach((a) => l[a] = !0), this._sources.set(i, l);
      });
    }), this._routes.forEach((o) => {
      o.length = Math.max(...o.in.map((i) => xo(i, this._sources, 1)));
    }), this._bus = s;
  }
  init(e) {
    const t = {};
    for (const r in e) if (this._prev[r] !== e[r]) {
      const s = this._parsers[r];
      t[r] = s ? s(e[r]) : e[r];
    }
    this._prev = this._prev ? { ...this._prev, ...e } : { ...e }, this.setState(t), this._bus && this._bus.exec("init-state", t);
  }
  setStateAsync(e) {
    const t = this._setter(e, wo);
    return this._async ? Object.assign(this._async.signals, t) : this._async = { signals: t, timer: setTimeout(this._applyState.bind(this), 1) }, t;
  }
  _applyState() {
    const e = this._async;
    if (e) {
      this._async = null, this._triggerUpdates(e.signals, []);
      for (const t in e.signals) {
        const r = e.signals[t];
        r && r();
      }
    }
  }
  setState(e, t = []) {
    const r = this._setter(e);
    return this._triggerUpdates(r, t), r;
  }
  _triggerUpdates(e, t) {
    const r = Object.keys(e), s = !t.length;
    t = t || [];
    for (let o = 0; o < r.length; o++) {
      const i = r[o], l = this._triggers.get(i);
      l && l.forEach((a) => {
        t.indexOf(a) == -1 && t.push(a);
      });
    }
    s && this._execNext(t);
  }
  _execNext(e) {
    for (; e.length; ) {
      e.sort((r, s) => r.length < s.length ? 1 : -1);
      const t = e[e.length - 1];
      e.splice(e.length - 1), t.exec(e);
    }
  }
};
function xo(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => xo(o, e, t + 1));
  return Math.max(...s);
}
var pa = class {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(n, e, t) {
    let r = this._handlers[n];
    r ? t && t.intercept ? r.unshift(e) : r.push(e) : r = this._handlers[n] = [e], t && t.tag && this._tag.set(e, t.tag);
  }
  intercept(n, e, t) {
    this.on(n, e, { ...t, intercept: !0 });
  }
  detach(n) {
    for (const e in this._handlers) {
      const t = this._handlers[e];
      for (let r = t.length - 1; r >= 0; r--) this._tag.get(t[r]) === n && t.splice(r, 1);
    }
  }
  async exec(n, e) {
    const t = this._handlers[n];
    if (t) for (let r = 0; r < t.length; r++) {
      const s = t[r](e);
      if (s === !1 || s && s.then && await s === !1) return;
    }
    return this._nextHandler && await this._nextHandler.exec(n, e), e;
  }
  setNext(n) {
    return this._nextHandler = n;
  }
};
function ga(n) {
  return (e) => e[n];
}
function ma(n) {
  return (e, t) => e[n] = t;
}
function yt(n, e) {
  return (e.getter || ga(e.id))(n);
}
function ts(n, e, t) {
  return (e.setter || ma(e.id))(n, t);
}
function ns(n, e) {
  const t = document.createElement("a");
  t.href = URL.createObjectURL(n), t.download = e, document.body.appendChild(t), t.click(), document.body.removeChild(t);
}
function dt(n, e) {
  let t = yt(n, e) ?? "";
  return e.template && (t = e.template(t, n, e)), e.optionsMap && (Array.isArray(t) ? t = t.map((r) => e.optionsMap.get(r)) : t = e.optionsMap.get(t)), typeof t > "u" ? "" : t + "";
}
function wa(n, e) {
  const t = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", i = n._columns, l = n.flatData;
  e.header !== !1 && i[0].header && (r = rs("header", i, r, o, s));
  for (let a = 0; a < l.length; a++) {
    const c = [];
    for (let d = 0; d < i.length; d++) {
      let u = dt(l[a], i[d]);
      t.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = rs("footer", i, r, o, s)), r;
}
function rs(n, e, t, r, s) {
  const o = /\n|"|;|,/;
  for (let i = 0; i < e[0][n].length; i++) {
    const l = [];
    for (let a = 0; a < e.length; a++) {
      let c = (e[a][n][i].text || "") + "";
      o.test(c) && (c = '"' + c.replace(/"/g, '""') + '"'), l.push(c);
    }
    t += (t ? s : "") + l.join(r);
  }
  return t;
}
function xa(n, e, t) {
  const r = [], s = [], o = [];
  let i = [];
  const l = n._columns, a = n.flatData, c = n._sizes;
  for (const u of l) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && l[0].header && (ss("header", l, r, s, d, e, t), i = i.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += l[0].header.length);
  for (let u = 0; u < a.length; u++) {
    const h = [];
    for (let f = 0; f < l.length; f++) {
      const m = a[u], p = l[f], x = yt(m, p) ?? "";
      let w = dt(m, p), y;
      e.cellStyle && (y = e.cellStyle(x, m, p)), e.cellTemplate && (w = e.cellTemplate(x, m, p) ?? w);
      const k = yo(w, 2, y, t);
      h.push(k);
    }
    r.push(h), i.push({ height: c.rowHeight });
  }
  return d += a.length, e.footer !== !1 && l[0].footer && (ss("footer", l, r, s, d, e, t), i = i.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: t };
}
function ss(n, e, t, r, s, o, i) {
  for (let l = 0; l < e[0][n].length; l++) {
    const a = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][n][l], u = d.colspan ? d.colspan - 1 : 0, h = d.rowspan ? d.rowspan - 1 : 0;
      (u || h) && r.push({ from: { row: l + s, column: c }, to: { row: l + s + h, column: c + u } });
      let f = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(f, d, e[c], n)), o.headerCellTemplate && (f = o.headerCellTemplate(f, d, e[c], n) ?? f);
      let p;
      n == "header" ? l == e[0][n].length - 1 ? p = 1 : p = 0 : l ? p = 4 : p = 3;
      const x = yo(f, p, m, i);
      a.push(x);
    }
    t.push(a);
  }
}
function yo(n, e, t, r) {
  let s = e;
  if (n && n instanceof Date && (n = va(n), t = t || {}, t.format = t.format || "dd/mm/yyyy"), t) {
    t = { ...r[e], ...t };
    const o = r.findIndex((i) => Zt(i, t));
    o < 0 ? (r.push(t), s = r.length - 1) : s = o;
  }
  return { v: n + "", s };
}
function ya(n) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, t = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, i = e[n], l = "0.5px solid " + o[n], a = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: i, background: r[n], ...a, borderBottom: l, borderRight: l };
  return { cell: { color: i, background: t[n], borderBottom: s[n], borderRight: s[n], ...a }, header: { ...c }, footer: { ...c } };
}
function va(n) {
  return n ? 25569 + (n.getTime() - n.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const ka = "portrait", ba = 100, Sa = "a4", $a = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function _a(n, e) {
  const t = [];
  let r = [], s = 0;
  const o = n.filter((l) => !l.hidden), i = Ca(e);
  return o.forEach((l, a) => {
    s + l.width <= i ? (s += l.width, r.push(l)) : (r.length && t.push(r), r = [l], s = l.width), a === o.length - 1 && r.length && t.push(r);
  }), t;
}
function os(n, e, t) {
  const r = [];
  return n.forEach((s, o) => {
    const i = s[e];
    for (let l = 0; l < t.length; l++) {
      r[l] || (r[l] = []);
      const a = { ...i[l] };
      if (r[l][o] !== null) {
        if (!o && !a.rowspan && !a.colspan) {
          let c = 1, d = n[o + c][e][l], u = a.width;
          for (; !d.rowspan && !d.colspan; ) c++, d = n[o + c][e][l], u += d.width;
          a.colspan = c, a.width = u, a.height = t[l];
        }
        if (r[l].push(a), !a.collapsed && a.colspan > 1) {
          let c = a.colspan - 1;
          if (a.colspan + o > n.length) {
            const d = a.colspan - (a.colspan + o - n.length);
            a.colspan = d, a.width = n.slice(o, o + c + 1).reduce((u, h) => u + h.width, 0), d > 1 && (c = d - 1);
          }
          for (let d = 0; d < c; d++) r[l].push(null);
        }
        if (a.rowspan > 1) {
          const c = a.rowspan;
          for (let d = 1; d < c; d++) r[l + d] || (r[l + d] = []), r[l + d].push(null);
        }
      }
    }
    if (s.collapsed) for (let l = 0; l < r.length; l++) {
      const a = r[l], c = a[o];
      if (c && c.collapsed) {
        if (a[o] = null, !l) break;
      } else {
        const d = c || a.findLast((u) => u?.colspan >= 1);
        d && (d.colspan = d.colspan - 1, d.width = d.width - s.width);
      }
    }
  }), r.map((s) => s.filter((o) => o && o.colspan !== 0));
}
function Ca(n) {
  const { mode: e, ppi: t, paper: r } = n, { width: s, height: o } = $a[r];
  return Na(e === "portrait" ? s : o, t);
}
function Na(n, e) {
  return n * e;
}
function Ta(n = {}) {
  const { mode: e, ppi: t, paper: r } = n;
  return { mode: e || ka, ppi: t || ba, paper: r || Sa };
}
function vo(n, e) {
  return n.flexgrow ? `min-width:${e}px;width:auto` : `width:${n.width}px; max-width:${n.width}px; height:${n.height}px`;
}
function Da(n, e, t) {
  let r = n[t.id];
  if (t.filter.type === "richselect" && r) {
    const s = t.filter.config?.options || e.find(({ id: o }) => o == t.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const is = ["resize-column", "hide-column", "update-cell"], Ma = ["delete-row", "update-row", "update-cell"], Ea = ["move-item"], Ra = ["resize-column", "move-item"];
let Ia = class {
  undo = [];
  redo = [];
  progress = {};
  in;
  getState;
  setState;
  _previousValues = {};
  constructor(e, t, r) {
    this.in = e, this.getState = t, this.setState = r, this.setHandlers(), this.resetStateHistory();
  }
  getHandlers() {
    return { "add-row": { handler: (e) => ({ action: "delete-row", data: { id: e.id }, source: { action: "add-row", data: e } }) }, "delete-row": { handler: (e) => {
      const { id: t } = e, { data: r } = this.getPrev(), s = r.findIndex((o) => o.id == t);
      return { action: "add-row", data: { id: t, row: r[s], before: s < r.length - 1 ? r[s + 1].id : void 0 }, source: { action: "delete-row", data: e } };
    } }, "update-cell": { handler: (e) => {
      const { id: t, column: r } = e, s = this.getRow(t), o = this.getColumn(r), i = yt(s, o);
      return Zt(i, e.value) ? null : { action: "update-cell", data: { id: t, column: r, value: i }, source: { action: "update-cell", data: e } };
    } }, "update-row": { handler: (e) => {
      const { id: t, row: r } = e, s = this.getRow(t);
      for (const o in r) Object.keys(s).includes(o) || (s[o] = void 0);
      return { action: "update-row", data: { id: t, row: s }, source: { action: "update-row", data: e } };
    } }, "copy-row": { handler: (e) => {
      const { id: t } = e, { data: r } = this.getState(), s = r.findIndex((i) => i.id == t), o = r[s];
      return { action: "delete-row", data: { id: t }, source: { action: "add-row", data: { id: t, row: o, before: s < r.length - 1 ? r[s + 1].id : void 0 } } };
    } }, "resize-column": { handler: (e) => {
      const { id: t, width: r } = e, s = this.getColumn(t), { _sizes: o } = this.getState();
      return { action: "resize-column", data: { id: t, width: s.width ?? o.columnWidth }, source: { action: "resize-column", data: { id: t, width: r } } };
    } }, "hide-column": { handler: (e) => {
      const { id: t } = e, r = this.getColumn(t);
      return { action: "hide-column", data: { id: t, mode: r.hidden }, source: { action: "hide-column", data: e } };
    } }, "collapse-column": { handler: (e) => {
      const { id: t, row: r, mode: s } = e;
      return { action: "collapse-column", data: { id: t, row: r, mode: typeof s == "boolean" ? !s : s }, source: { action: "collapse-column", data: e } };
    } }, "move-item": { handler: (e) => {
      const { id: t, target: r, mode: s } = e, { flatData: o } = this.getPrev(), i = o.findIndex((l) => l.id == t);
      return { action: "move-item", data: { id: t, target: o[i + (i ? -1 : 1)].id, mode: i ? "after" : "before" }, source: { action: "move-item", data: { id: t, target: r, mode: s } } };
    } }, "open-row": { handler: (e) => {
      const { id: t, nested: r } = e;
      return { action: "close-row", data: { id: t, nested: r }, source: { action: "open-row", data: e } };
    } }, "close-row": { handler: (e) => {
      const { id: t, nested: r } = e;
      return { action: "open-row", data: { id: t, nested: r }, source: { action: "close-row", data: e } };
    } } };
  }
  resetHistory() {
    this.undo = [], this.redo = [], this.progress = {}, this.resetStateHistory();
  }
  getPrev() {
    return this._previousValues;
  }
  setHandlers() {
    const e = this.getHandlers();
    for (const t in e) this.in.intercept(t, (r) => {
      if (!(r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo)) {
        if (Ra.includes(t)) {
          (r.inProgress && !this.progress[t] || typeof r.inProgress != "boolean") && (Ea.includes(t) && this.setPrev("flatData"), is.includes(t) && this.setPrev("columns")), this.progress[t] = r.inProgress;
          return;
        }
        Ma.includes(t) && this.setPrev("data"), is.includes(t) && this.setPrev("columns");
      }
    }), this.in.on(t, (r) => {
      if (r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo || r.inProgress) return;
      const s = e[t].handler(r);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = sr(this.getState()[e]);
  }
  addToHistory(e) {
    this.undo.push(e), this.redo = [], this.setStateHistory();
  }
  handleUndo() {
    if (!this.undo.length) return;
    const e = this.undo.pop();
    this.redo.push({ ...e.source, source: e }), this.in.exec(e.action, { ...e.data, eventSource: "undo" }), this.setStateHistory();
  }
  handleRedo() {
    if (!this.redo.length) return;
    const e = this.redo.pop();
    this.undo.push({ ...e.source, source: e }), this.in.exec(e.action, { ...e.data, eventSource: "redo" }), this.setStateHistory();
  }
  resetStateHistory() {
    this.setState({ history: { undo: 0, redo: 0 } });
  }
  setStateHistory() {
    this.setState({ history: { undo: this.undo.length, redo: this.redo.length } });
  }
  getRow(e) {
    const { data: t } = this.getPrev();
    return this.getState().tree ? this.getTreeRow(t, e) : t.find((r) => r.id == e);
  }
  getTreeRow(e, t) {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id == t) return e[r];
      if (e[r].data) {
        const s = this.getTreeRow(e[r].data, t);
        if (s) return s;
      }
    }
    return null;
  }
  getColumn(e) {
    const { columns: t } = this.getPrev();
    return t.find((r) => r.id == e);
  }
};
function ko() {
  let n = !0;
  return n = !1, n;
}
function bo(n, e) {
  return typeof n > "u" || n === null ? -1 : typeof e > "u" || e === null ? 1 : n === e ? 0 : n > e ? 1 : -1;
}
function Aa(n, e) {
  return -bo(n, e);
}
function Ha(n, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return n === "asc" ? o : -o;
  };
  const t = n === "asc" ? bo : Aa;
  return function(r, s) {
    return t(yt(r, e), yt(s, e));
  };
}
function La(n, e) {
  if (!n || !n.length) return;
  const t = n.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Ha(r.order, s);
  });
  return n.length === 1 ? t[0] : function(r, s) {
    for (let o = 0; o < t.length; o++) {
      const i = t[o](r, s);
      if (i !== 0) return i;
    }
    return 0;
  };
}
const un = 28, za = 20;
function Wa() {
  if (typeof document > "u") return "willow";
  const n = document.querySelector('[class^="wx"][class$="theme"]');
  return n ? n.className.substring(3, n.className.length - 6) : "willow";
}
function kn(n, e, t, r, s) {
  const o = document.createElement("div"), i = document.createElement("div"), l = document.body;
  s = s ? `${s}px` : "auto";
  let a, c;
  i.className = e, o.classList.add(`wx-${t}-theme`), o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`, o.appendChild(i), l.appendChild(o), typeof n != "object" && (n = [n]);
  for (let d = 0; d < n.length; d++) {
    i.innerText = n[d] + "";
    const u = o.getBoundingClientRect(), h = Math.ceil(u.width) + (r && r.length ? r[d] : 0), f = Math.ceil(u.height);
    a = Math.max(a || 0, h), c = Math.max(c || 0, f);
  }
  return o.remove(), { width: a, height: c };
}
function ls(n, e, t, r, s) {
  const o = [];
  for (let i = 0; i < n.length; i++) {
    const l = n[i][e], a = l.length;
    for (let c = 0; c < a; c++) {
      const { text: d, vertical: u, collapsed: h, rowspan: f, css: m } = l[c];
      if (!d) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let p = 0;
      if (u && !h) {
        let x = `wx-measure-cell-${e}`;
        if (x += m ? ` ${m}` : "", p = kn(d, x, s).width, (f > 1 || !l[c + 1]) && t > c + 1) {
          const w = f || t - c, y = o.slice(c, c + w).reduce((k, v) => k + v, 0);
          if (y < p) {
            const k = Math.ceil((p - y) / w);
            for (let v = c; v < c + w; v++) o[v] = (o[v] || r) + k;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, p);
    }
  }
  return o;
}
function Fa(n, e, t) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += n.css ? ` ${n.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const l = e[i], a = dt(l, n);
    a && (r.push(a), n.treetoggle ? s.push(e[i].$level * un + (e[i].$count ? un : 0) + (n.draggable ? un : 0)) : n.draggable && s.push(un));
  }
  return kn(r, o, t, s).width;
}
function Oa(n, e) {
  const t = "wx-measure-cell-header", r = n.sort ? za : 0;
  let s = n.header;
  if (typeof s == "string") return kn(s, t, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const l = s[i], a = typeof l == "string" ? l : l.text, c = t + (typeof l == "string" ? "" : ` ${l.css}`);
    let d = kn(a, c, e).width;
    i === s.length - 1 && (d += r), o = Math.max(o || 0, d);
  }
  return o;
}
const Pa = { text: (n, e) => n ? n.toString().toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (n, e) => typeof e != "number" && !e ? !0 : n == e };
function Va(n) {
  return Pa[n];
}
let Ga = class extends ha {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const t = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new fa(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: i, _skin: l } = this.getState(), a = this.copyColumns(o), c = a.reduce((h, f) => Math.max(f.header.length, h), 0), d = a.reduce((h, f) => Math.max(f.footer.length, h), 0);
      a.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(a, i, c, d, l);
      for (let h = 0; h < a.length; h++) this.normalizeColumns(a, h, "header", c, u), this.normalizeColumns(a, h, "footer", d, u);
      this.setState({ _columns: a, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: i, dynamic: l, _filterIds: a } = this.getState(), c = a && new Set(a), d = i ? this.flattenRows(o, [], a) : c ? o.filter((h) => c.has(h.id)) : o, u = !l && d.some((h) => h.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...t, ...s }) });
    const r = this.in = new pa();
    r.on("close-editor", ({ ignore: s }) => {
      const { editor: o } = this.getState();
      o && (s || r.exec("update-cell", o), this.setState({ editor: null }));
    }), r.on("open-editor", ({ id: s, column: o }) => {
      let i = this.getState().editor;
      i && r.exec("close-editor", {});
      const l = this.getRow(s), a = o ? this.getColumn(o) : this.getNextEditor(l);
      if (a?.editor) {
        let c = a.editor;
        if (typeof c == "function" && (c = c(l, a)), !c) return;
        i = { column: a.id, id: s, value: yt(l, a) ?? "", renderedValue: dt(l, a) }, typeof c == "object" && c.config && (i.config = c.config, c.config.options && (i.options = c.config.options)), a.options && !i.options && (i.options = a.options), this.setState({ editor: i });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: i } = o;
      const { select: l, _filterIds: a } = o, { row: c, before: d, after: u, select: h } = s;
      if (s.id = c.id = s.id || c.id || hn(), d || u) {
        const m = d || u, p = i.findIndex((x) => x.id === m);
        i = [...i], i.splice(p + (u ? 1 : 0), 0, s.row);
      } else i = [...i, s.row];
      const f = { data: i };
      a && (f._filterIds = [...a, s.id]), this.setState(f), !(typeof h == "boolean" && !h) && (h || l) && r.exec("select-row", { id: c.id, show: !0 });
    }), r.on("delete-row", (s) => {
      const { data: o, selectedRows: i, focusCell: l, editor: a } = this.getState(), { id: c } = s, d = { data: o.filter((u) => u.id !== c) };
      this.isSelected(c) && (d.selectedRows = i.filter((u) => u !== c)), a?.id == c && (d.editor = null), this.setState(d), l?.row === c && this.in.exec("focus-cell", { eventSource: "delete-row" });
    }), r.on("update-cell", (s) => {
      const o = this.getState();
      let { data: i } = o;
      i = [...i];
      const { tree: l } = o, { id: a, column: c, value: d } = s, u = this.getColumn(c);
      if (l) {
        const h = { ...this._branches[a] };
        ts(h, u, d);
        const f = this.updateTreeRow(h);
        h.$parent === 0 && (i = f);
      } else {
        const h = i.findIndex((m) => m.id == a), f = { ...i[h] };
        ts(f, u, d), i[h] = f;
      }
      this.setState({ data: i });
    }), r.on("update-row", (s) => {
      let { data: o } = this.getState();
      const { id: i, row: l } = s, a = o.findIndex((c) => c.id == i);
      o = [...o], o[a] = { ...o[a], ...l }, this.setState({ data: o });
    }), r.on("select-row", ({ id: s, toggle: o, range: i, mode: l, show: a, column: c }) => {
      const d = this.getState(), { focusCell: u } = d;
      let { selectedRows: h } = d;
      if (h.length || (i = o = !1), i) {
        const { data: f } = this.getState();
        let m = f.findIndex((x) => x.id == h[h.length - 1]), p = f.findIndex((x) => x.id == s);
        m > p && ([m, p] = [p, m]), f.slice(m, p + 1).forEach((x) => {
          h.indexOf(x.id) === -1 && h.push(x.id);
        });
      } else if (o && this.isSelected(s)) {
        if (l === !0) return;
        h = h.filter((f) => f !== s);
      } else if (o) {
        if (l === !1) return;
        h.push(s);
      } else h = [s];
      this.setState({ selectedRows: [...h] }), u?.row !== s && this.in.exec("focus-cell", { eventSource: "select-row" }), a && this.in.exec("scroll", { row: s, column: c });
    }), this.in.on("focus-cell", (s) => {
      const { row: o, column: i, eventSource: l } = s, { _columns: a, split: c } = this.getState();
      o && i ? (this.setState({ focusCell: { row: o, column: i } }), l !== "click" && ((!c.left || a.findIndex((d) => d.id == s.column) >= c.left) && (!c.right || a.findIndex((d) => d.id == s.column) < a.length - c.right) ? this.in.exec("scroll", { row: o, column: i }) : this.in.exec("scroll", { row: o }))) : this.setState({ focusCell: null });
    }), r.on("resize-column", (s) => {
      const { id: o, auto: i, maxRows: l, inProgress: a } = s;
      if (a === !1) return;
      let c = s.width || 0;
      const d = [...this.getState().columns], u = d.find((h) => h.id == o);
      if (i) {
        if (i == "data" || i === !0) {
          const { flatData: h, _skin: f } = this.getState();
          let m = h.length;
          l && (m = Math.min(l, m));
          const p = h.slice(0, m);
          c = Fa(u, p, f);
        }
        if (i == "header" || i === !0) {
          const { _skin: h } = this.getState();
          c = Math.max(Oa(u, h), c);
        }
      }
      u.width = Math.max(17, c), delete u.flexgrow, this.setState({ columns: d });
    }), r.on("hide-column", (s) => {
      const { id: o, mode: i } = s, l = [...this.getState().columns], a = l.find((d) => d.id == o), c = l.reduce((d, u) => d + (u.hidden ? 0 : 1), 0);
      !i || c > 1 ? (a.hidden = !a.hidden, this.setState({ columns: l })) : s.skipUndo = !0;
    }), r.on("sort-rows", (s) => {
      const { key: o, add: i, sort: l } = s, a = this.getState(), { columns: c, data: d, tree: u } = a;
      if (l) {
        const y = [...d];
        y.sort(l), this.setState({ data: y });
        return;
      }
      const { order: h = "asc" } = s;
      let f = a.sortMarks;
      const m = Object.keys(f), p = m.length;
      !i || !p || p === 1 && f[o] ? f = { [o]: { order: h } } : (p === 1 && (f[m[0]] = { ...f[m[0]], index: 0 }), f = { ...f, [o]: { order: h, index: typeof i == "number" ? i : f[o]?.index ?? p } });
      const x = Object.keys(f).sort((y, k) => f[y].index - f[k].index).map((y) => ({ key: y, order: f[y].order }));
      this.setState({ sortMarks: f });
      const w = La(x, c);
      if (w) {
        const y = [...d];
        u ? this.sortTree(y, w) : y.sort(w), this.setState({ data: y });
      }
    }), r.on("filter-rows", (s) => {
      const { value: o, key: i, filter: l } = s;
      if (!Object.keys(s).length) {
        this.setState({ filterValues: {}, _filterIds: null });
        return;
      }
      const a = this.getState(), { data: c, tree: d } = a;
      let u = a.filterValues;
      const h = {};
      i && (u = { ...u, [i]: o }, h.filterValues = u);
      const f = l ?? this.createFilter(u);
      let m = [];
      d ? m = this.filterTree(c, f, m) : c.forEach((p) => {
        f(p) && m.push(p.id);
      }), h._filterIds = m, this.setState(h);
    }), r.on("collapse-column", (s) => {
      const { id: o, row: i, mode: l } = s, a = [...this.getState().columns], c = this.getColumn(o).header, d = Array.isArray(c) ? c[i] : c;
      typeof d == "object" && (d.collapsed = l ?? !d.collapsed, this.setState({ columns: a }));
    }), r.on("move-item", (s) => {
      const { id: o, inProgress: i } = s;
      let { target: l, mode: a = "after" } = s;
      const { data: c, flatData: d, tree: u } = this.getState(), h = d.findIndex((p) => p.id == o);
      let f;
      if (a === "up" || a === "down") {
        if (a === "up") {
          if (h === 0) return;
          f = h - 1, a = "before";
        } else if (a === "down") {
          if (h === d.length - 1) return;
          f = h + 1, a = "after";
        }
        l = d[f] && d[f].id;
      } else f = d.findIndex((p) => p.id == l);
      if (h === -1 || f === -1 || i === !1) return;
      let m;
      u ? m = this.moveItem(o, l, c, a) : m = this.moveItem(o, l, c, a), this.setState({ data: u ? this.normalizeTreeRows(m) : m });
    }), r.on("copy-row", (s) => {
      const { id: o, target: i, mode: l = "after" } = s, a = this.getState(), { flatData: c, _filterIds: d } = a;
      let { data: u } = a;
      const h = this.getRow(o);
      if (!h) return;
      const f = { ...h, id: hn() };
      s.id = f.id;
      const m = c.findIndex((x) => x.id == i);
      if (m === -1) return;
      u.splice(m + (l === "after" ? 1 : 0), 0, f), u = [...u];
      const p = { data: u };
      d && (p._filterIds = [...d, f.id]), this.setState(p);
    }), r.on("open-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !0, i);
    }), r.on("close-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !1, i);
    }), r.on("export-data", (s) => new Promise((o, i) => {
      const l = s.format || "csv", a = `${s.fileName || "data"}.${l}`;
      if (l == "csv") {
        const c = wa(this.getState(), s.csv || {});
        s.download !== !1 ? ns(new Blob(["\uFEFF" + c], { type: "text/csv" }), a) : s.result = c, o(!0);
      } else if (l == "xlsx") {
        let c = s.excel?.styles;
        !c && c !== !1 && (c = ya(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: h, merged: f, rowSizes: m, colSizes: p, styles: x } = xa(this.getState(), s.excel || {}, u), w = s.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(w).then((y) => {
          y.onmessage = (k) => {
            if (k.data.type == "ready") {
              const v = k.data.blob;
              s.download !== !1 ? ns(v, a) : s.result = v, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: s.sheetName || "data", cells: h, cols: p, rows: m, merged: f }], styles: x } });
        });
      } else i();
    })), r.on("search-rows", (s) => {
      const { search: o, columns: i } = s, l = this.searchRows(o, i);
      this.setState({ search: { value: o, rows: l } });
    }), r.on("hotkey", ({ key: s, event: o, isInput: i }) => {
      switch (s) {
        case "arrowup": {
          const { flatData: l, focusCell: a, select: c } = this.getState();
          if (o.preventDefault(), i) return;
          const d = a ? a.column : this._getFirstVisibleColumn()?.id, u = a ? this.getPrevRow(a.row)?.id : l[l.length - 1]?.id;
          d && u && (this.in.exec("focus-cell", { row: u, column: d, eventSource: "key" }), c && this.in.exec("select-row", { id: u }));
          break;
        }
        case "arrowdown": {
          const { flatData: l, focusCell: a, select: c } = this.getState();
          if (o.preventDefault(), i) return;
          const d = a ? a.column : this._getFirstVisibleColumn()?.id, u = a ? this.getNextRow(a.row)?.id : l[0]?.id;
          d && u && (this.in.exec("focus-cell", { row: u, column: d, eventSource: "key" }), c && this.in.exec("select-row", { id: u }));
          break;
        }
        case "arrowright": {
          const { focusCell: l } = this.getState();
          if (i) return;
          if (o.preventDefault(), l) {
            const a = this.getNextColumn(l.column, !0)?.id;
            a && this.in.exec("focus-cell", { row: l.row, column: a, eventSource: "key" });
          }
          break;
        }
        case "arrowleft": {
          const { focusCell: l } = this.getState();
          if (i) return;
          if (o.preventDefault(), l) {
            const a = this.getPrevColumn(l.column, !0)?.id;
            a && this.in.exec("focus-cell", { row: l.row, column: a, eventSource: "key" });
          }
          break;
        }
        case "tab": {
          const { editor: l, focusCell: a, select: c } = this.getState();
          if (l) {
            o.preventDefault();
            const d = l.column;
            let u = l.id, h = this.getNextEditor(this.getRow(u), this.getColumn(d));
            if (!h) {
              const f = this.getNextRow(u);
              f && (u = f.id, h = this.getNextEditor(f));
            }
            h && (this.in.exec("open-editor", { id: u, column: h.id }), this.in.exec("focus-cell", { row: u, column: h.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else a && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "shift+tab": {
          const { editor: l, focusCell: a, select: c } = this.getState();
          if (l) {
            o.preventDefault();
            const d = l.column;
            let u = l.id, h = this.getPrevEditor(this.getRow(u), this.getColumn(d));
            if (!h) {
              const f = this.getPrevRow(u);
              f && (u = f.id, h = this.getPrevEditor(f));
            }
            h && (this.in.exec("open-editor", { id: u, column: h.id }), this.in.exec("focus-cell", { row: u, column: h.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else a && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "escape": {
          const { editor: l } = this.getState();
          l && (this.in.exec("close-editor", { ignore: !0 }), this.in.exec("focus-cell", { row: l.id, column: l.column, eventSource: "key" }));
          break;
        }
        case "f2": {
          const { editor: l, focusCell: a } = this.getState();
          !l && a && this.in.exec("open-editor", { id: a.row, column: a.column });
          break;
        }
        case "enter": {
          const { focusCell: l, tree: a } = this.getState();
          if (!i && a && l && this.getColumn(l.column).treetoggle) {
            const c = this.getRow(l.row);
            if (!c.data) return;
            this.in.exec(c.open ? "close-row" : "open-row", { id: l.row, nested: !0 });
          }
          break;
        }
        case "home": {
          const { editor: l, focusCell: a } = this.getState();
          if (!l && a) {
            o.preventDefault();
            const c = this._getFirstVisibleColumn()?.id;
            this.in.exec("focus-cell", { row: a.row, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+home": {
          const { editor: l, focusCell: a, flatData: c, select: d } = this.getState();
          if (!l && a) {
            o.preventDefault();
            const u = c[0]?.id, h = this._getFirstVisibleColumn()?.id;
            u && h && (this.in.exec("focus-cell", { row: u, column: h, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          }
          break;
        }
        case "end": {
          const { editor: l, focusCell: a } = this.getState();
          if (!l && a) {
            o.preventDefault();
            const c = this._getLastVisibleColumn()?.id, d = a.row;
            this.in.exec("focus-cell", { row: d, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+end": {
          const { editor: l, focusCell: a, flatData: c, select: d } = this.getState();
          if (!l && a) {
            o.preventDefault();
            const u = c.at(-1).id, h = this._getLastVisibleColumn()?.id;
            u && h && (this.in.exec("focus-cell", { row: u, column: h, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          }
          break;
        }
        case "ctrl+z": {
          this.in.exec("undo", {});
          break;
        }
        case "ctrl+y": {
          this.in.exec("redo", {});
          break;
        }
      }
    }), r.on("scroll", (s) => {
      const { _columns: o, split: i, _sizes: l, flatData: a, dynamic: c, _rowHeightFromData: d } = this.getState();
      let u = -1, h = -1, f = 0, m = 0;
      if (s.column) {
        u = 0;
        const p = o.findIndex((x) => x.id == s.column);
        f = o[p].width;
        for (let x = i.left ?? 0; x < p; x++) {
          const w = o[x];
          w.hidden || (u += w.width);
        }
      }
      if (s.row && !c) {
        const p = a.findIndex((x) => x.id == s.row);
        p >= 0 && (d ? (h = a.slice(0, p).reduce((x, w) => x + (w.rowHeight || l.rowHeight), 0), m = a[p].rowHeight) : h = l.rowHeight * p);
      }
      this.setState({ scroll: { top: h, left: u, width: f, height: m || l.rowHeight } });
    }), r.on("print", (s) => {
      const o = Ta(s);
      this.setState({ _print: o }), this.setStateAsync({ _print: null });
    }), r.on("undo", () => {
      this._historyManager?.handleUndo();
    }), r.on("redo", () => {
      this._historyManager?.handleRedo();
    }), this.initOnce();
  }
  getXlsxWorker(e) {
    if (!this._xlsxWorker) {
      const t = window.URL.createObjectURL(new Blob([`importScripts('${e}');`], { type: "text/javascript" }));
      this._xlsxWorker = new Promise((r) => {
        const s = new Worker(t);
        s.addEventListener("message", (o) => {
          o.data.type === "init" && r(s);
        });
      });
    }
    return this._xlsxWorker;
  }
  initOnce() {
    const e = { sortMarks: {}, _filterIds: null, data: [], filterValues: {}, scroll: null, editor: null, focusCell: null, _print: null, history: { undo: 0, redo: 0 }, search: null };
    this._router.init(e);
  }
  init(e) {
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Wa()), e.columns && e.columns.forEach((t) => {
      t.options && (t.optionsMap = new Map(t.options.map((r) => [r.id, r.label])));
    }), Zt(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), ko() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Ia(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
  }
  setState(e, t) {
    return this._router.setState(e, t);
  }
  setStateAsync(e) {
    this._router.setStateAsync(e);
  }
  getRow(e) {
    const { tree: t } = this.getState();
    return t ? this._branches[e] : this.getState().data.find((r) => r.id == e);
  }
  getRowIndex(e, t) {
    return t || (t = this.getState().flatData), t.findIndex((r) => r.id == e);
  }
  getNextRow(e) {
    const t = this.getState().flatData, r = this.getRowIndex(e, t);
    return t[r + 1];
  }
  getPrevRow(e) {
    const t = this.getState().flatData, r = this.getRowIndex(e, t);
    return t[r - 1];
  }
  getColumn(e) {
    return this.getState().columns.find((t) => t.id == e);
  }
  getNextColumn(e, t) {
    const r = this.getState()._columns, s = r.findIndex((o) => o.id == e);
    return t ? this._getFirstVisibleColumn(s + 1) : r[s + 1];
  }
  getPrevColumn(e, t) {
    const r = this.getState()._columns, s = r.findIndex((o) => o.id == e);
    return t ? this._getLastVisibleColumn(s - 1) : r[s - 1];
  }
  _getFirstVisibleColumn(e) {
    const t = this.getState()._columns;
    let r = e ?? 0;
    for (; r < t.length && (t[r]?.hidden || t[r]?.collapsed); ) r++;
    return t[r];
  }
  _getLastVisibleColumn(e) {
    const t = this.getState()._columns;
    let r = e ?? t.length - 1;
    for (; r < t.length && (t[r]?.hidden || t[r]?.collapsed); ) r--;
    return t[r];
  }
  isCellEditable(e, t) {
    const { editor: r, hidden: s } = t;
    return !r || s ? !1 : typeof r == "function" ? r(e, t) : !0;
  }
  getNextEditor(e, t) {
    let r = this.getState().columns;
    if (t) {
      const s = r.findIndex((o) => o.id == t.id);
      r = r.slice(s + 1);
    }
    return r.find((s) => this.isCellEditable(e, s));
  }
  getPrevEditor(e, t) {
    let r = this.getState().columns;
    if (t) {
      const s = r.findLastIndex((o) => o.id == t.id);
      r = r.slice(0, s);
    }
    return r.findLast((s) => this.isCellEditable(e, s));
  }
  toggleBranch(e, t, r) {
    let s = this._branches[e], { data: o } = this.getState();
    if (o = [...o], e !== 0) {
      s = { ...s, open: t };
      const i = this.updateTreeRow(s);
      s.$parent === 0 && (o = i);
    }
    r && s.data?.length && s.data.forEach((i) => {
      const l = this.toggleKids(i, t, r);
      e === 0 && (o = l);
    }), this.setState({ data: o });
  }
  toggleKids(e, t, r) {
    e = { ...e, open: t };
    const s = this.updateTreeRow(e);
    return r && e.data?.length && e.data.forEach((o) => {
      this.toggleKids(o, t, r);
    }), s;
  }
  updateTreeRow(e) {
    const t = e.id;
    this._branches[t] = e;
    const r = this._branches[e.$parent], s = r.data.findIndex((o) => o.id == t);
    return r.data = [...r.data], r.data[s] = e, r.data;
  }
  isSelected(e) {
    return this.getState().selectedRows.indexOf(e) !== -1;
  }
  findAndRemove(e, t) {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id == t) return e.splice(r, 1)[0];
      if (e[r].data) {
        const s = [...e[r].data], o = this.findAndRemove(s, t);
        if (o) return e[r] = { ...e[r], data: s }, o;
      }
    }
    return null;
  }
  insertItem(e, t, r, s) {
    for (let o = 0; o < e.length; o++) {
      if (e[o].id == t) {
        const i = e[o], l = s === "before" ? o : o + 1;
        if (i.data) {
          if (s === "before") {
            const a = o > 0 ? e[o - 1] : null;
            return a?.data && a.open ? e[o - 1] = { ...a, data: [...a.data, r] } : e.splice(l, 0, r), !0;
          } else if (i.open) return e[o] = { ...i, data: [r, ...i.data] }, !0;
        }
        return e.splice(l, 0, r), !0;
      }
      if (e[o].data && (e[o] = { ...e[o], data: [...e[o].data] }, this.insertItem(e[o].data, t, r, s))) return !0;
    }
    return !1;
  }
  moveItem(e, t, r, s) {
    const o = [...r], i = this.findAndRemove(o, e);
    return this.insertItem(o, t, i, s), o;
  }
  copyColumns(e) {
    const t = [];
    for (let r = 0; r < e.length; r++) {
      const s = { ...e[r] };
      this.copyHeaderFooter(s, "header"), this.copyHeaderFooter(s, "footer"), t[r] = s;
    }
    return t;
  }
  copyHeaderFooter(e, t) {
    let r = e[t];
    r = Array.isArray(r) ? [...r] : [r], r.forEach((s, o) => {
      r[o] = typeof s == "string" ? { text: s } : { ...s };
    }), e[t] = r;
  }
  setCollapsibleColumns(e, t, r) {
    let s = e.header;
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      if (i.collapsible && i.collapsed) {
        if (i.collapsible !== "first") {
          e.collapsed = !0, e.width = 36, i.vertical = !0;
          const a = s.length - o;
          s = s.slice(0, o + 1), s[o].rowspan = a;
        }
        const l = i.colspan;
        if (l) {
          const a = s[o + 1];
          let c = 1;
          a && a.colspan && !a.collapsed && (c = a.colspan);
          for (let d = c; d < l; d++) {
            const u = r[t + d];
            u && (u.hidden = !0);
          }
        }
      }
    }
  }
  normalizeColumns(e, t, r, s, o) {
    const i = e[t];
    i.width || (i.width = i.flexgrow ? 17 : o.columnWidth), i._colindex = t + 1;
    const l = i[r], a = o[`${r}RowHeights`];
    for (let c = 0; c < s; c++) {
      const d = l[c];
      d.id = i.id, c === l.length - 1 && (d.rowspan = d.rowspan ? Math.min(d.rowspan, s - c) : s - c);
      for (let u = 1; u < d.rowspan; u++) {
        l.splice(c + u, 0, { _hidden: !0 });
        for (let h = 1; h < d.colspan; h++) e[t + h][r].splice(c + u, 0, {});
      }
      if (d.rowspan) {
        const u = (d.rowspan === s ? a : a.slice(c, d.rowspan + c)).reduce((h, f) => h + f, 0);
        d.height = u, c + d.rowspan != s && d.height--;
      }
      if (d.colspan) {
        let u = i.width, h = i.flexgrow || 0;
        const f = d.colspan;
        for (let m = 1; m < f; m++) {
          const p = e[t + m];
          p && (p.hidden ? d.colspan -= 1 : p.flexgrow ? h += p.flexgrow : u += p.width || o.columnWidth), h ? d.flexgrow = h : d.width = u;
        }
      } else d.width = i.width, d.flexgrow = i.flexgrow;
      r === "header" && d.filter && typeof d.filter == "string" && (d.filter = { type: d.filter });
    }
    l.length > s && (l.length = s), i[r] = l;
  }
  normalizeRows(e) {
    for (let t = 0; t < e.length; t++) e[t].id || (e[t].id = hn());
    return e;
  }
  normalizeTreeRows(e, t, r) {
    return e.forEach((s) => {
      s.id || (s.id = hn()), s.$level = t || 0, s.$parent = r || 0, this._branches[s.id] = s, s.data && (s.data.length ? (s.$count = s.data.length, this.normalizeTreeRows(s.data, s.$level + 1, s.id)) : (delete s.data, delete s.$count, delete s.open));
    }), e;
  }
  sortTree(e, t) {
    e.sort(t), e.forEach((r) => {
      r.data && this.sortTree(r.data, t);
    });
  }
  filterTree(e, t, r) {
    return e.forEach((s) => {
      t(s) && r.push(s.id), s.data && this.filterTree(s.data, t, r);
    }), r;
  }
  flattenRows(e, t, r) {
    const s = t;
    return e.forEach((o) => {
      (!r || r.includes(o.id)) && s.push(o), o.data?.length && o.open !== !1 && this.flattenRows(o.data, s, r);
    }), s;
  }
  createFilter(e) {
    const { _columns: t } = this.getState(), r = [];
    for (const s in e) {
      const { config: o, type: i } = t.find((a) => a.id == s).header.find((a) => a.filter).filter, l = e[s];
      r.push((a) => o?.handler ? o.handler(a[s], l) : Va(i)(a[s], l));
    }
    return (s) => {
      for (let o = 0; o < r.length; o++) if (!r[o](s)) return !1;
      return !0;
    };
  }
  searchRows(e, t) {
    e = e.trim().toLowerCase();
    const r = {};
    if (!e) return r;
    const { flatData: s, columns: o } = this.getState(), i = t ? o.filter((l) => t[l.id]) : o;
    return s.forEach((l) => {
      const a = {};
      i.forEach((c) => {
        const d = dt(l, c);
        String(d).toLowerCase().includes(e) && (a[c.id] = !0);
      }), Object.keys(a).length && (r[l.id] = a);
    }), r;
  }
  normalizeSizes(e, t, r, s, o) {
    const i = ls(e, "header", r, t.headerHeight, o), l = ls(e, "footer", s, t.footerHeight, o), a = i.reduce((d, u) => d + u, 0), c = l.reduce((d, u) => d + u, 0);
    return { ...t, headerRowHeights: i, footerRowHeights: l, headerHeight: a, footerHeight: c };
  }
}, ja = (/* @__PURE__ */ new Date()).valueOf();
function hn() {
  return "temp://" + ja++;
}
function Ba(n, e = "data-id") {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var Ka = class {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  configure(n, e) {
    this.node = e;
    for (const t in n) if (n[t]) {
      const r = t.toLowerCase().replace(/[ ]/g, ""), s = n[t];
      this.store.set(r, s);
    }
  }
}, Mt = [], Ya = { subscribe: (n) => {
  Ua();
  const e = new Ka();
  return Mt.push(e), n(e), () => {
    const t = Mt.findIndex((r) => r === e);
    t >= 0 && Mt.splice(t, 1);
  };
} }, as = !1;
function Ua() {
  as || (as = !0, document.addEventListener("keydown", (n) => {
    if (Mt.length && (n.ctrlKey || n.altKey || n.metaKey || n.shiftKey || n.key.length > 1 || n.key === " ")) {
      const e = [];
      n.ctrlKey && e.push("ctrl"), n.altKey && e.push("alt"), n.metaKey && e.push("meta"), n.shiftKey && e.push("shift");
      let t = n.code.replace("Key", "").toLocaleLowerCase();
      n.key === " " && (t = "space"), e.push(t);
      const r = e.join("+");
      for (let s = Mt.length - 1; s >= 0; s--) {
        const o = Mt[s], i = o.store.get(r) || o.store.get(t);
        i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
      }
    }
  }));
}
const qa = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function kr(n, { keys: e, exec: t }) {
  if (!e) return;
  function r(i) {
    const l = i.target;
    return l.tagName === "INPUT" || l.tagName === "TEXTAREA" || Ba(l, "data-header-id")?.classList.contains("wx-filter") || !!l.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const i in e) {
    const l = e[i];
    typeof l < "u" && (typeof l == "function" ? s[i] = l : l && (s[i] = (a) => {
      const c = r(a);
      t({ key: i, event: a, isInput: c });
    }));
  }
  const o = Ya.subscribe((i) => {
    i.configure(s, n);
  });
  return { destroy: () => {
    o();
  } };
}
function Xa(n, e) {
  let t = null;
  e.scroll.subscribe((r) => {
    if (!r || r === t) return;
    t = r;
    const { left: s, top: o, height: i, width: l } = r, a = e.getHeight(), c = e.getWidth(), d = e.getScrollMargin();
    if (o >= 0) {
      const u = n.scrollTop;
      o < u ? n.scrollTop = o : o + i > u + a && (n.scrollTop = o - a + i);
    }
    if (s >= 0) {
      const u = n.scrollLeft;
      s < u ? n.scrollLeft = s : s + l > u + c - d && (n.scrollLeft = s - c + l + d);
    }
  });
}
function Et(n) {
  const e = n.getAttribute("data-id"), t = parseInt(e);
  return isNaN(t) || t.toString() != e ? e : t;
}
function Qa(n, e, t) {
  const r = n.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - t.clientY,
    db: t.clientY - r.top
  };
}
function cs(n) {
  return n && n.getAttribute("data-context-id");
}
const ds = 5;
function Za(n, e) {
  let t, r, s, o, i, l, a, c, d;
  function u(b) {
    o = b.clientX, i = b.clientY, l = {
      ...Qa(t, n, b),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function h(b) {
    t = Oe(b), cs(t) && (s = Et(t), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(b.touches[0]);
    }, 500), n.addEventListener("touchmove", y), n.addEventListener("contextmenu", f), window.addEventListener("touchend", k));
  }
  function f(b) {
    if (c || d)
      return b.preventDefault(), !1;
  }
  function m(b) {
    b.which === 1 && (t = Oe(b), cs(t) && (s = Et(t), n.addEventListener("mousemove", w), window.addEventListener("mouseup", v), u(b)));
  }
  function p(b) {
    n.removeEventListener("mousemove", w), n.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", k), document.body.style.userSelect = "", b && (n.removeEventListener("mousedown", m), n.removeEventListener("touchstart", h));
  }
  function x(b) {
    const $ = b.clientX - o, D = b.clientY - i;
    if (!r) {
      if (Math.abs($) < ds && Math.abs(D) < ds || e && e.start && e.start({ id: s, e: b }) === !1)
        return;
      r = t.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = l.left + "px", r.style.top = l.top + "px", t.style.visibility = "hidden", t.parentNode.insertBefore(r, t);
    }
    if (r) {
      const O = Math.round(Math.max(0, l.top + D));
      if (e && e.move && e.move({ id: s, top: O, detail: a }) === !1)
        return;
      const C = e.getTask(s), I = C.$y;
      if (!l.start && l.y == I) return N();
      l.start = !0, l.y = C.$y - 4, r.style.top = O + "px";
      const A = document.elementFromPoint(
        b.clientX,
        b.clientY
      ), L = Oe(A);
      if (L && L !== t) {
        const z = Et(L), F = L.getBoundingClientRect(), M = F.top + F.height / 2, B = b.clientY + l.db > M && L.nextElementSibling !== t, V = b.clientY - l.dt < M && L.previousElementSibling !== t;
        a?.after == z || a?.before == z ? a = null : B ? a = { id: s, after: z } : V && (a = { id: s, before: z });
      }
    }
  }
  function w(b) {
    x(b);
  }
  function y(b) {
    c ? (b.preventDefault(), x(b.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function k() {
    c = null, d && (clearTimeout(d), d = null), N();
  }
  function v() {
    N();
  }
  function N() {
    t && (t.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: l.top })), s = t = r = l = a = null, p();
  }
  return n.style.position !== "absolute" && (n.style.position = "relative"), n.addEventListener("mousedown", m), n.addEventListener("touchstart", h), {
    destroy() {
      p(!0);
    }
  };
}
const Ja = {
  grid: {
    "Add before": "Add before",
    "Add after": "Add after",
    Copy: "Copy",
    Cut: "Cut",
    Paste: "Paste",
    Delete: "Delete",
    "New row": "New row",
    "Move up": "Move up",
    "Move down": "Move down",
    Undo: "Undo",
    Redo: "Redo"
  }
};
function So(n, e) {
  return n.map((t) => {
    const r = e(t);
    return t.data && t.data.length && (r.data = So(t.data, e)), r;
  });
}
function $o(n, e) {
  const t = [];
  return n.forEach((r) => {
    if (r.data) {
      const s = $o(r.data, e);
      s.length && t.push({ ...r, data: s });
    } else
      e(r) && t.push(r);
  }), t;
}
let ec = 1;
function tc(n) {
  return So(n, (e) => {
    const t = { ...e, id: e.id || ec++ };
    return t.type && (t.comp = t.type), t;
  });
}
const _o = {};
function nc(n) {
  return _o[n] || n;
}
function rc(n, e) {
  _o[n] = e;
}
function sc({ onClick: n, onShow: e, option: t }) {
  const r = W(null), s = E(() => {
    e(t.data ? t.id : !1, r.current);
  }, [e, t]), o = _(() => t && t.comp ? nc(t.comp) : null, [t]);
  return /* @__PURE__ */ Y(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${t.css || ""} ${t.disabled ? "wx-disabled" : ""}`,
      "data-id": t.id,
      onMouseEnter: s,
      onClick: n,
      children: [
        t.icon ? /* @__PURE__ */ g("i", { className: `wx-cDCz9rZQ wx-icon ${t.icon}` }) : null,
        t.comp ? o ? /* @__PURE__ */ g(o, { item: t, option: t }) : null : /* @__PURE__ */ Y("span", { className: "wx-cDCz9rZQ wx-value", children: [
          " ",
          t.text,
          " "
        ] }),
        t.subtext ? /* @__PURE__ */ g("span", { className: "wx-cDCz9rZQ wx-subtext", children: t.subtext }) : null,
        t.data ? /* @__PURE__ */ g("i", { className: "wx-cDCz9rZQ wx-sub-icon wxi-angle-right" }) : null
      ]
    }
  );
}
function br({
  options: n,
  left: e = 0,
  top: t = 0,
  at: r = "bottom",
  parent: s = null,
  mount: o = null,
  context: i = null,
  css: l = "",
  onClick: a
}) {
  const [c, d] = j(-1e4), [u, h] = j(-1e4), [f, m] = j(20), [p, x] = j(), w = W(null), [y, k] = j(!1), [v, N] = j(null), b = E(() => {
    const I = Yo(w.current, s, r, e, t);
    I && (d(I.x), h(I.y), m(I.z), x(I.width));
  }, [s, r, e, t]);
  P(() => {
    o && o(b);
  }, []);
  const $ = E(() => {
    k(!1);
  }, []), D = E(() => {
    a && a({ action: null, option: null });
  }, [a]), O = E((I, A) => {
    k(I), N(A);
  }, []), C = _(() => tc(n), [n]);
  return P(() => {
    b();
  }, [s, b]), P(() => {
    if (w.current)
      return Yt(w.current, { callback: D, modal: !0 }).destroy;
  }, [D]), /* @__PURE__ */ g(
    "div",
    {
      ref: w,
      "data-wx-menu": "true",
      className: `wx-XMmAGqVx wx-menu ${l}`,
      style: {
        position: "absolute",
        top: u + "px",
        left: c + "px",
        width: p,
        zIndex: f
      },
      onMouseLeave: $,
      children: C.map((I) => /* @__PURE__ */ Y(ys, { children: [
        I.comp === "separator" ? /* @__PURE__ */ g("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ g(
          sc,
          {
            option: I,
            onShow: O,
            onClick: (A) => {
              if (!I.data && !A.defaultPrevented) {
                const L = { context: i, action: I, option: I, event: A };
                I.handler && I.handler(L), a && a(L), A.stopPropagation();
              }
            }
          }
        ),
        I.data && y === I.id ? /* @__PURE__ */ g(
          br,
          {
            css: l,
            options: I.data,
            at: "right-overlap",
            parent: v,
            context: i,
            onClick: a
          }
        ) : null
      ] }, I.id))
    }
  );
}
const oc = vt(function(n, e) {
  const {
    options: t,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: l = "",
    children: a,
    onClick: c
  } = n, [d, u] = j(null), [h, f] = j(null), [m, p] = j(0), [x, w] = j(0), y = _(() => d !== null && i ? $o(t, (b) => i(b, d)) : t, [d, i, t]), k = E(
    (b) => {
      f(null), c && c(b);
    },
    [c]
  ), v = E((b, $) => {
    let D = null;
    for (; b && b.dataset && !D; )
      D = b.dataset[$], b = b.parentNode;
    return D ? At(D) : null;
  }, []), N = E(
    (b, $) => {
      if (!b) {
        f(null);
        return;
      }
      if (b.defaultPrevented) return;
      const D = b.target;
      if (D && D.dataset && D.dataset.menuIgnore) return;
      p(b.clientX + 1), w(b.clientY + 1);
      let O = typeof $ < "u" ? $ : v(D, o);
      s && (O = s(O, b), !O) || (u(O), f(D), b.preventDefault());
    },
    [o, v, s]
  );
  return kt(e, () => ({ show: N }), [N]), /* @__PURE__ */ Y(ve, { children: [
    a ? /* @__PURE__ */ g("span", { onClick: N, "data-menu-ignore": "true", children: typeof a == "function" ? a() : a }) : null,
    h ? /* @__PURE__ */ g(Ms, { children: /* @__PURE__ */ g(
      br,
      {
        css: l,
        at: r,
        top: x,
        left: m,
        parent: h,
        context: d,
        onClick: k,
        options: y
      },
      h
    ) }) : null
  ] });
});
vt(function(n, e) {
  const { options: t, at: r = "bottom", css: s = "", children: o, onClick: i } = n, [l, a] = j(null);
  function c(m) {
    a(null), i && i(m);
  }
  const d = E((m) => {
    a(m.target), m.preventDefault();
  }, []);
  kt(e, () => ({ show: d }), [d]);
  function u(m) {
    let p = m.target;
    for (; !p.dataset.menuIgnore; )
      a(p), p = p.parentNode;
  }
  const h = W(0), f = W(l);
  return P(() => {
    f.current !== l && (h.current += 1, f.current = l);
  }, [l]), /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    l ? /* @__PURE__ */ g(Ms, { children: /* @__PURE__ */ g(
      br,
      {
        css: s,
        at: r,
        parent: l,
        options: t,
        onClick: c
      },
      h.current
    ) }) : null
  ] });
});
const Co = vt(function(n, e) {
  const {
    options: t,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: l = "",
    children: a,
    onClick: c
  } = n, d = W(null), u = E((h, f) => {
    d.current.show(h, f);
  }, []);
  return kt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ Y(ve, { children: [
    a ? /* @__PURE__ */ g("span", { onContextMenu: u, "data-menu-ignore": "true", children: a }) : null,
    /* @__PURE__ */ g(
      oc,
      {
        css: l,
        at: r,
        options: t,
        resolver: s,
        dataKey: o,
        filter: i,
        ref: d,
        onClick: c
      }
    )
  ] });
}), No = {};
function ic(n) {
  return No[n] || n;
}
function zt(n, e) {
  No[n] = e;
}
function To({ menu: n = !1 }) {
  return /* @__PURE__ */ g("div", { className: `wx-z1qpqrvg wx-separator${n ? "-menu" : ""}`, children: " " });
}
function Do() {
  return /* @__PURE__ */ g("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const lc = ({ key: n, text: e, ...t }) => t;
function Sr(n) {
  const { item: e = {}, menu: t = !1, values: r, onClick: s, onChange: o } = n, i = _(
    () => ic(e.comp || "label"),
    [e]
  ), l = E(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), a = _(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = E(
    ({ value: u }) => {
      e && e.handler && e.handler(e, u), o && o({ value: u, item: e });
    },
    [e, o]
  ), d = _(() => t ? e ? e.menuText || e.text : void 0 : e ? e.text : void 0, [t, e]);
  if (e && e.comp == "spacer")
    return /* @__PURE__ */ g(Do, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ g(To, { menu: t });
  {
    const u = i, h = [
      "wx-tb-element",
      e && e.css ? e.css : "",
      e && e.spacer ? "wx-spacer" : "",
      t ? "wx-menu" : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ g(
      "div",
      {
        className: "wx-KVAsgMam " + h,
        "data-id": e ? e.id : void 0,
        children: /* @__PURE__ */ g(
          u,
          {
            value: a,
            onChange: c,
            onClick: l,
            text: d,
            menu: t,
            ...lc(e)
          }
        )
      }
    );
  }
}
function bn({
  item: n,
  values: e = null,
  menu: t = !1,
  onChange: r,
  onClick: s
}) {
  const [o, i] = j(!0), l = () => i(!0), a = () => i(!1), c = (u) => {
    l(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    n.css || "",
    n.layout == "column" ? "wx-column" : "",
    n.collapsed && !t ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g("div", { className: d, children: n.collapsed && !t ? /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ Y("div", { className: "wx-wSVFAGym wx-collapsed", onClick: a, children: [
      n.icon ? /* @__PURE__ */ g("i", { className: `wx-wSVFAGym icon ${n.icon}` }) : null,
      n.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label-text", children: n.text }) : null,
      n.text && !n.icon ? /* @__PURE__ */ g("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ g(Lt, { width: "", oncancel: l, children: /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ g(
      bn,
      {
        item: { ...n, text: "", collapsed: !1 },
        values: e,
        menu: t,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-tb-body", children: n.items.map(
      (u, h) => u.items ? /* @__PURE__ */ g(
        bn,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || h
      ) : /* @__PURE__ */ g(
        Sr,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || h
      )
    ) }),
    n.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label", children: n.text }) : null
  ] }) });
}
function ac({ items: n = [], css: e, values: t, width: r, onClick: s, onChange: o }) {
  const [i, l] = j(void 0), a = W(null);
  function c() {
    l(null);
  }
  function d() {
    l(!0);
  }
  function u(h) {
    c(), s && s(h);
  }
  return /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: a,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ g(lt, { icon: "wxi-dots-h", onClick: d }),
        i ? /* @__PURE__ */ g(Lt, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ g("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: n.map(
          (h, f) => h.items ? /* @__PURE__ */ g(
            bn,
            {
              item: h,
              values: t,
              menu: !0,
              onClick: u,
              onChange: o
            },
            h.id || f
          ) : /* @__PURE__ */ g(
            Sr,
            {
              item: h,
              values: t,
              menu: !0,
              onClick: u,
              onChange: o
            },
            h.id || f
          )
        ) }) }) : null
      ]
    }
  );
}
function cc(n) {
  return n.forEach((e) => {
    e.id || (e.id = Sn());
  }), n;
}
function or(n) {
  const {
    items: e,
    menuCss: t = "",
    css: r = "",
    values: s,
    overflow: o = "menu",
    onClick: i,
    onChange: l
  } = n, [a, c] = Te(e || []), [d, u] = Te(s || null), h = _(() => cc(a), [a]), f = W(null), m = W(-1), [p, x] = j([]), w = W(h);
  P(() => {
    w.current = h;
  }, [a]);
  const y = W(o);
  P(() => {
    y.current = o;
  }, [o]);
  const k = W(p);
  P(() => {
    k.current = p;
  }, [p]);
  const v = W(!1);
  function N(C) {
    d && (d[C.item.key] = C.value, u({ ...d })), l && l(C);
  }
  function b() {
    const C = f.current;
    if (!C) return 0;
    const I = C.children, A = w.current || [];
    let L = 0;
    for (let z = 0; z < A.length; z++)
      A[z].comp !== "spacer" && (L += I[z].clientWidth, A[z].comp === "separator" && (L += 8));
    return L;
  }
  function $() {
    const C = f.current, I = w.current || [];
    if (C) {
      for (let A = I.length - 1; A >= 0; A--)
        if (I[A].items && !I[A].collapsed) {
          I[A].collapsed = !0, I[A].$width = C.children[A].offsetWidth, v.current = !0, c([...I]);
          return;
        }
    }
  }
  function D(C) {
    const I = f.current, A = w.current || [];
    if (I) {
      for (let L = 0; L < A.length; L++)
        if (A[L].collapsed && A[L].$width) {
          A[L].$width - I.children[L].offsetWidth < C + 10 && (A[L].collapsed = !1, v.current = !0), c([...A]);
          return;
        }
    }
  }
  function O() {
    const C = f.current;
    if (!C) return;
    const I = w.current || [], A = y.current;
    if (A === "wrap") return;
    const L = C.clientWidth;
    if (C.scrollWidth > L) {
      if (A === "collapse") return $();
      const z = C.children;
      let F = 0;
      for (let M = 0; M < I.length; M++) {
        if (F += z[M].clientWidth, I[M].comp === "separator" && (F += 8), F > L - 40) {
          if (m.current === M) return;
          m.current = M;
          const B = [];
          for (let V = M; V < I.length; V++)
            B.push(I[V]), z[V].style.visibility = "hidden";
          M > 0 && I[M - 1].comp === "separator" && (z[M - 1].style.visibility = "hidden"), x(B);
          break;
        }
        z[M].style.visibility = "";
      }
    } else {
      const z = L - b();
      if (z <= 0) return;
      if (A === "collapse") return D(z);
      if ((k.current || []).length) {
        m.current = null;
        const F = C.children;
        for (let M = 0; M < I.length; M++)
          F[M].style.visibility = "";
        x([]);
      }
    }
  }
  return P(() => {
    v.current && (v.current = !1, O());
  }, [a]), P(() => {
    const C = new ResizeObserver(() => O());
    return f.current && C.observe(f.current), () => {
      C.disconnect();
    };
  }, []), /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: f,
      children: [
        h.map(
          (C) => C.items ? /* @__PURE__ */ g(
            bn,
            {
              item: C,
              values: d,
              onClick: i,
              onChange: N
            },
            C.id
          ) : /* @__PURE__ */ g(
            Sr,
            {
              item: C,
              values: d,
              onClick: i,
              onChange: N
            },
            C.id
          )
        ),
        !!p.length && /* @__PURE__ */ g(
          ac,
          {
            items: p,
            css: t,
            values: d,
            onClick: i,
            onChange: N
          }
        )
      ]
    }
  );
}
function dc(n) {
  const { icon: e, text: t = "", css: r, type: s, disabled: o, menu: i, onClick: l } = n;
  return i ? /* @__PURE__ */ Y("div", { className: "wx-HXpG4gnx wx-item", onClick: l, children: [
    /* @__PURE__ */ g("i", { className: `wx-HXpG4gnx ${e || "wxi-empty"} ${r || ""}` }),
    t
  ] }) : /* @__PURE__ */ g(
    lt,
    {
      icon: e,
      type: s,
      css: r,
      text: t,
      disabled: o,
      onClick: l
    }
  );
}
function uc(n) {
  const { text: e, value: t, children: r } = n;
  return r ? /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: t || e });
}
function hc(n) {
  const { icon: e, text: t, css: r, type: s, disabled: o, menu: i, onClick: l } = n;
  return i ? /* @__PURE__ */ Y("div", { className: "wx-3cuSqONJ wx-item", onClick: l, children: [
    e ? /* @__PURE__ */ g("i", { className: `wx-3cuSqONJ ${e || ""} ${r || ""}` }) : null,
    t
  ] }) : /* @__PURE__ */ g(
    lt,
    {
      icon: e,
      type: s,
      css: r,
      title: t,
      disabled: o,
      onClick: l
    }
  );
}
function fc({ id: n = "", text: e = "", css: t = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: n });
  }
  return /* @__PURE__ */ Y("div", { className: `wx-U0Bx7pIR wx-label ${t}`, onClick: o, children: [
    r ? /* @__PURE__ */ g("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
zt("button", dc);
zt("separator", To);
zt("spacer", Do);
zt("label", uc);
zt("item", fc);
zt("icon", hc);
const Xe = It(null);
function pc(n, e) {
  const t = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return t.observe(n.parentNode), {
    destroy() {
      t.disconnect();
    }
  };
}
const us = 5, gc = 700;
function mc(n) {
  return At(n.getAttribute("data-id"));
}
function fn(n) {
  const e = n.getBoundingClientRect(), t = document.body, r = e.top + t.scrollTop - t.clientTop || 0, s = e.left + t.scrollLeft - t.clientLeft || 0;
  return {
    y: Math.round(r),
    x: Math.round(s),
    width: n.offsetWidth,
    height: n.offsetHeight
  };
}
function ir(n, e) {
  const t = fn(e);
  return { x: n.clientX - t.x, y: n.clientY - t.y };
}
function wc(n, e) {
  const t = e.current;
  let r = null, s, o, i = !1, l = !1;
  const a = document.createElement("DIV");
  a.className = "wx-drag-zone", a.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d($) {
    const D = Oe($);
    D && (r = {
      container: a,
      sourceNode: $.target,
      from: mc(D),
      pos: ir($, n)
    }, o = r.pos, u($));
  }
  function u($) {
    if (!r) return;
    const D = r.pos = ir($, n);
    if (!i) {
      if (!l && !$?.target?.getAttribute("draggable-data") && Math.abs(o.x - D.x) < us && Math.abs(o.y - D.y) < us)
        return;
      if (N($) === !1) return b();
    }
    if (l) {
      const O = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, C = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        $.pageX - O,
        $.pageY - C
      );
    } else r.targetNode = $.target;
    t.move && t.move($, r), a.style.left = -(r.offset ? r.offset.x : 0) + "px", a.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function h($) {
    a.parentNode && a.parentNode.removeChild(a), a.innerHTML = "", i && t.end && t.end($, r), r = o = null, b();
  }
  function f($) {
    t.getReorder && !t.getReorder() || $.button === 0 && (v($), window.addEventListener("mousemove", m), window.addEventListener("mouseup", p), d($));
  }
  function m($) {
    u($);
  }
  function p($) {
    h($);
  }
  function x($) {
    if (t.getReorder && !t.getReorder()) return;
    s = setTimeout(() => {
      l = !0, d($.touches[0]);
    }, gc), v($);
    function D() {
      s && c(), $.target.removeEventListener("touchmove", w), $.target.removeEventListener("touchend", D), h($);
    }
    $.target.addEventListener("touchmove", w), $.target.addEventListener("touchend", D), n.addEventListener("contextmenu", y);
  }
  function w($) {
    i ? ($.preventDefault(), u($.touches[0])) : s && c();
  }
  function y($) {
    if (i || s)
      return $.preventDefault(), !1;
  }
  function k($) {
    $.preventDefault();
  }
  function v($) {
    if (!t.getDraggableInfo) return;
    const { hasDraggable: D } = t.getDraggableInfo();
    (!D || $.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function N($) {
    if (i = !0, t.start) {
      if (t.start($, r) === !1) return !1;
      n.appendChild(a), document.body.style.cursor = "move";
    }
  }
  function b($) {
    i = l = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", p), $ && (n.removeEventListener("mousedown", f), n.removeEventListener("touchstart", x), n.removeEventListener("dragstart", k));
  }
  return n.addEventListener("mousedown", f), n.addEventListener("touchstart", x), n.addEventListener("dragstart", k), {
    destroy() {
      b(!0);
    }
  };
}
const xc = 4e-3;
function yc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function vc(n, e, t, r) {
  const { node: s, left: o, top: i, bottom: l, sense: a, xScroll: c, yScroll: d } = r, u = ir(n, s);
  t.scrollState || (t.scrollState = yc());
  let h = 0, f = 0;
  u.x < o + a ? h = -1 : u.x > e.width - a && (h = 1), u.y < i + Math.round(a / 2) ? f = -1 : u.y > e.height - l - Math.round(a / 2) && (f = 1), (t.scrollState.dirX !== h || t.scrollState.dirY !== f) && (Mo(t), t.scrollState.dirX = h, t.scrollState.dirY = f), (c && t.scrollState.dirX !== 0 || d && t.scrollState.dirY !== 0) && kc(t, r, {
    x: t.scrollState.dirX,
    y: t.scrollState.dirY
  });
}
function kc(n, e, t) {
  n.autoScrollTimer || (n.autoScrollTimer = setTimeout(() => {
    n.activeAutoScroll = setInterval(
      bc,
      15,
      n,
      e,
      t
    );
  }, 250));
}
function Mo(n) {
  n.scrollSpeedFactor = 1, n.autoScrollTimer && (n.autoScrollTimer = clearTimeout(n.autoScrollTimer), n.activeAutoScroll = clearInterval(n.activeAutoScroll));
}
function bc(n, e, t) {
  const { x: r, y: s } = t;
  n.scrollSpeedFactor += xc, r !== 0 && $c(n, e, r), s !== 0 && Sc(n, e, s);
}
function Sc(n, e, t) {
  const r = e.node.scrollTop;
  Eo(
    r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t,
    "scrollTop",
    e
  );
}
function $c(n, e, t) {
  const r = e.node.scrollLeft;
  Eo(
    r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t,
    "scrollLeft",
    e
  );
}
function Eo(n, e, t) {
  t.node[e] = n;
}
function Mn(n, e, t, r, s, o) {
  const i = {};
  return n && (i.width = `${n}px`, i.minWidth = `${n}px`), e && (i.flexGrow = e), o && (i.height = `${o}px`), t && (i.position = "sticky", t.left && (i.left = `${r}px`), t.right && (i.right = `${s}px`)), i;
}
function Ro(n, e, t) {
  let r = "";
  if (n.fixed)
    for (const s in n.fixed)
      r += n.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += t ? t(n) + " " : "", r;
}
function _c(n) {
  const {
    row: e,
    column: t,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = n, [i, l] = Te(n.focusable), a = he(Xe), c = Q(a, "focusCell"), d = Q(a, "search"), u = Q(a, "reorder"), h = _(
    () => d?.rows[e.id] && d.rows[e.id][t.id],
    [d, e.id, t.id]
  ), f = _(
    () => Mn(
      t.width,
      t.flexgrow,
      t.fixed,
      t.left,
      t.right
    ),
    [t.width, t.flexgrow, t.fixed, t.left, t.right]
  );
  function m(b, $) {
    let D = "wx-cell";
    return D += t.fixed ? " " + (t.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", D += b ? " " + b(t) : "", D += $ ? " " + $(e, t) : "", D += t.treetoggle ? " wx-tree-cell" : "", D;
  }
  const p = _(
    () => m(s, r),
    [s, r, t, e]
  ), x = _(() => typeof t.draggable == "function" ? t.draggable(e, t) !== !1 : t.draggable, [t, e]), w = W(null);
  P(() => {
    w.current && i && c?.row === e.id && c?.column === t.id && w.current.focus();
  }, [c, i, e.id, t.id]);
  const y = E(() => {
    i && !c && a.exec("focus-cell", {
      row: e.id,
      column: t.id,
      eventSource: "focus"
    });
  }, [a, i, c, e.id, t.id]);
  P(() => () => {
    i && c && (a.exec("focus-cell", { eventSource: "destroy" }), l(!1));
  }, [a, l]);
  function k(b) {
    const $ = new RegExp(`(${d.value.trim()})`, "gi");
    return String(b).split($).map((D) => ({ text: D, highlight: $.test(D) }));
  }
  const v = _(() => {
    const b = t.fixed && t.fixed.left === -1 || t.fixed.right === -1, $ = t.fixed && t.fixed.right;
    return [
      p,
      b ? "wx-shadow" : "",
      $ ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [p, t]), N = t.cell;
  return /* @__PURE__ */ Y(
    "div",
    {
      className: "wx-TSCaXsGV " + v,
      ref: w,
      onFocus: y,
      style: f,
      "data-row-id": e.id,
      "data-col-id": t.id,
      tabIndex: i ? "0" : "-1",
      role: "gridcell",
      "aria-colindex": t._colindex,
      "aria-readonly": t.editor ? void 0 : !0,
      children: [
        u && t.draggable ? x ? /* @__PURE__ */ g(
          "i",
          {
            "draggable-data": "true",
            className: "wx-TSCaXsGV wx-draggable wxi-drag"
          }
        ) : /* @__PURE__ */ g("i", { className: "wx-TSCaXsGV wx-draggable-stub" }) : null,
        t.treetoggle ? /* @__PURE__ */ Y(ve, { children: [
          /* @__PURE__ */ g("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ g(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        N ? /* @__PURE__ */ g(
          N,
          {
            api: a,
            row: e,
            column: t,
            onAction: ({ action: b, data: $ }) => a.exec(b, $)
          }
        ) : o ? o() : h ? /* @__PURE__ */ g("span", { children: k(dt(e, t)).map(
          ({ highlight: b, text: $ }, D) => b ? /* @__PURE__ */ g("mark", { className: "wx-TSCaXsGV wx-search", children: $ }, D) : /* @__PURE__ */ g("span", { children: $ }, D)
        ) }) : dt(e, t)
      ]
    }
  );
}
function hs(n, e) {
  let t, r;
  function s(l) {
    t = l.clientX, n.style.opacity = 1, document.body.style.cursor = "ew-resize", document.body.style.userSelect = "none", window.addEventListener("mousemove", o), window.addEventListener("mouseup", i), e && e.down && e.down(n);
  }
  function o(l) {
    r = l.clientX - t, e && e.move && e.move(r);
  }
  function i() {
    n.style.opacity = "", document.body.style.cursor = "", document.body.style.userSelect = "", e && e.up && e.up(r), window.removeEventListener("mousemove", o), window.removeEventListener("mouseup", i);
  }
  return n.addEventListener("mousedown", s), {
    destroy() {
      n.removeEventListener("mousedown", s);
    }
  };
}
function Cc({ filter: n, column: e, action: t, filterValue: r }) {
  function s({ value: o }) {
    t({ value: o, key: e.id });
  }
  return /* @__PURE__ */ g(
    Qt,
    {
      ...n.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function Nc({ filter: n, column: e, action: t, filterValue: r }) {
  const s = he(Xe), o = Q(s, "flatData"), i = _(
    () => n?.config?.options || e?.options || a(),
    [n, e, o]
  ), l = _(() => n?.config?.template, [n]);
  function a() {
    const u = [];
    return o.forEach((h) => {
      const f = yt(h, e);
      u.includes(f) || u.push(f);
    }), u.map((h) => ({ id: h, label: h }));
  }
  function c({ value: u }) {
    t({ value: u, key: e.id });
  }
  function d(u) {
    u.key !== "Tab" && u.preventDefault();
  }
  return /* @__PURE__ */ g("div", { style: { width: "100%" }, onKeyDown: d, children: /* @__PURE__ */ g(
    Ts,
    {
      placeholder: "",
      clear: !0,
      ...n?.config ?? {},
      options: i,
      value: r,
      onChange: c,
      children: (u) => l ? l(u) : u.label
    }
  ) });
}
const Tc = {
  text: Cc,
  richselect: Nc
};
function Dc({ filter: n, column: e }) {
  const t = he(Xe), r = Q(t, "filterValues");
  function s(i) {
    t.exec("filter-rows", i);
  }
  const o = _(() => Tc[n.type], [n.type]);
  return /* @__PURE__ */ g(
    o,
    {
      filter: n,
      column: e,
      action: s,
      filterValue: r[e.id]
    }
  );
}
function Mc(n) {
  const {
    cell: e,
    column: t,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: i,
    bodyHeight: l,
    hasSplit: a
  } = n, c = he(Xe), d = Q(c, "sortMarks"), u = _(() => d ? d[t.id] : void 0, [d, t.id]), h = W(), f = E(
    (z) => {
      h.current = e.flexgrow ? z.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = E(
    (z, F) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (h.current || 0) + z),
        inProgress: F
      });
    },
    [c, e.id]
  ), p = E((z) => m(z, !0), [m]), x = E((z) => m(z, !1), [m]), w = E(
    (z) => {
      if (!t.sort || e.filter) return;
      let F = u?.order;
      F && (F = F === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: z.ctrlKey, order: F });
    },
    [c, e.id, e.filter, t.sort, u?.order]
  ), y = E(
    (z) => {
      z && z.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), k = E(
    (z) => {
      z.key === "Enter" && y();
    },
    [y]
  ), v = E(
    (z) => {
      z.key === "Enter" && !e.filter && w(z);
    },
    [w, e.filter]
  ), N = _(
    () => e.collapsed && t.collapsed,
    [e.collapsed, t.collapsed]
  ), b = _(
    () => N && !a && e.collapsible !== "header",
    [N, a, e.collapsible]
  ), $ = _(
    () => b ? { top: -l / 2, position: "absolute" } : {},
    [b, l]
  ), D = _(
    () => Mn(
      e.width,
      e.flexgrow,
      t.fixed,
      t.left,
      e.right ?? t.right,
      e.height + (N && b ? l : 0)
    ),
    [
      e.width,
      e.flexgrow,
      t.fixed,
      t.left,
      e.right,
      t.right,
      e.height,
      N,
      b,
      l
    ]
  ), O = _(
    () => Ro(t, e, i),
    [t, e, i]
  ), C = E(() => Object.fromEntries(
    Object.entries(e).filter(([z]) => z !== "cell")
  ), [e]), I = `wx-cell ${O} ${e.css || ""} wx-collapsed`, A = [
    "wx-cell",
    O,
    e.css || "",
    e.filter ? "wx-filter" : "",
    t.fixed && t.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), L = W(null);
  return P(() => {
    const z = L.current;
    if (!z) return;
    const F = hs(z, { down: f, move: p, up: x });
    return () => {
      typeof F == "function" && F();
    };
  }, [f, p, x, hs]), N ? /* @__PURE__ */ g(
    "div",
    {
      className: "wx-RsQD74qC " + I,
      style: D,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: k,
      onClick: y,
      "data-header-id": t.id,
      children: /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", style: $, children: e.text || "" })
    }
  ) : /* @__PURE__ */ Y(
    "div",
    {
      className: "wx-RsQD74qC " + A,
      style: D,
      onClick: w,
      "data-header-id": t.id,
      tabIndex: !e._hidden && t.sort && !e.filter ? 0 : void 0,
      role: "columnheader",
      "aria-colindex": e._colindex,
      "aria-colspan": e.colspan > 1 ? e.colspan : void 0,
      "aria-rowspan": e.rowspan > 1 ? e.rowspan : void 0,
      "aria-sort": !u?.order || e.filter ? "none" : u?.order === "asc" ? "ascending" : "descending",
      onKeyDown: v,
      children: [
        e.collapsible ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-RsQD74qC wx-collapse",
            role: "button",
            "aria-label": e.collapsed ? "Expand column" : "Collapse column",
            "aria-expanded": !e.collapsed,
            tabIndex: 0,
            onKeyDown: k,
            onClick: y,
            children: /* @__PURE__ */ g(
              "i",
              {
                className: `wx-RsQD74qC wxi-angle-${e.collapsed ? "down" : "right"}`
              }
            )
          }
        ) : null,
        e.cell ? (() => {
          const z = e.cell;
          return /* @__PURE__ */ g(
            z,
            {
              api: c,
              cell: C(),
              column: t,
              row: r,
              onAction: ({ action: F, data: M }) => c.exec(F, M)
            }
          );
        })() : e.filter ? /* @__PURE__ */ g(Dc, { filter: e.filter, column: t }) : /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        t.resize && s && !e._hidden ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: L,
            onClick: (z) => z.stopPropagation(),
            children: /* @__PURE__ */ g("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ Y(ve, { children: [
          typeof u.index < "u" ? /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-order", children: u.index + 1 }) : null,
          /* @__PURE__ */ g(
            "i",
            {
              className: `wx-RsQD74qC wxi-arrow-${u.order === "asc" ? "up" : "down"}`
            }
          )
        ] }) : null }) : null
      ]
    }
  );
}
function Ec({ cell: n, column: e, row: t, columnStyle: r }) {
  const s = he(Xe), o = _(
    () => Mn(
      n?.width,
      n?.flexgrow,
      e?.fixed,
      e?.left,
      n?.right ?? e?.right,
      n?.height
    ),
    [
      n?.width,
      n?.flexgrow,
      e?.fixed,
      e?.left,
      n?.right,
      e?.right,
      n?.height
    ]
  ), i = _(
    () => Ro(e, n, r),
    [e, n, r]
  ), l = E(() => Object.fromEntries(
    Object.entries(n || {}).filter(([c]) => c !== "cell")
  ), [n]), a = `wx-6Sdi3Dfd wx-cell ${i || ""} ${n?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ g("div", { className: a, style: o, children: !e?.collapsed && !n?.collapsed ? n?.cell ? Wo.createElement(n.cell, {
    api: s,
    cell: l(),
    column: e,
    row: t,
    onAction: ({ action: c, data: d }) => s.exec(c, d)
  }) : /* @__PURE__ */ g("div", { className: "wx-6Sdi3Dfd wx-text", children: n?.text || "" }) : null });
}
function fs({
  deltaLeft: n,
  contentWidth: e,
  columns: t,
  type: r = "header",
  columnStyle: s,
  bodyHeight: o
}) {
  const i = he(Xe), l = Q(i, "_sizes"), a = Q(i, "split"), c = _(() => l?.[`${r}RowHeights`], [l, r]), d = _(() => {
    let p = [];
    if (t && t.length) {
      const x = t[0][r].length;
      for (let w = 0; w < x; w++) {
        let y = 0;
        p.push([]), t.forEach((k, v) => {
          const N = { ...k[r][w] };
          if (y || p[w].push(N), N.colspan > 1) {
            if (y = N.colspan - 1, !ko() && k.right) {
              let b = k.right;
              for (let $ = 1; $ < N.colspan; $++)
                b -= t[v + $].width;
              N.right = b;
            }
          } else y && y--;
        });
      }
    }
    return p;
  }, [t, r]), u = _(() => a?.left || a?.right, [a]);
  function h(p) {
    return t.find((x) => x.id === p);
  }
  function f(p, x) {
    let w = x;
    return p.rowspan && (w += p.rowspan - 1), w === d.length - 1;
  }
  function m(p, x, w) {
    if (!w.sort) return !1;
    for (let y = d.length - 1; y >= 0; y--) {
      const k = w.header[y];
      if (!k.filter && !k._hidden) return x === y;
    }
    return f(p, x);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-sAsPVaUK wx-${r}`,
      style: { paddingLeft: `${n}px`, width: `${e}px` },
      role: "rowgroup",
      children: d.map((p, x) => /* @__PURE__ */ g(
        "div",
        {
          className: r === "header" ? "wx-sAsPVaUK wx-h-row" : "wx-sAsPVaUK wx-f-row",
          style: { height: `${c?.[x]}px`, display: "flex" },
          role: "row",
          children: p.map((w) => {
            const y = h(w.id);
            return r === "header" ? /* @__PURE__ */ g(
              Mc,
              {
                cell: w,
                columnStyle: s,
                column: y,
                row: x,
                lastRow: f(w, x),
                bodyHeight: o,
                sortRow: m(w, x, y),
                hasSplit: u
              },
              w.id
            ) : /* @__PURE__ */ g(
              Ec,
              {
                cell: w,
                columnStyle: s,
                column: h(w.id),
                row: x
              },
              w.id
            );
          })
        },
        x
      ))
    }
  );
}
function Rc({ overlay: n }) {
  const e = he(Xe);
  function t(s) {
    return typeof s == "function";
  }
  const r = n;
  return /* @__PURE__ */ g("div", { className: "wx-1ty666CQ wx-overlay", children: t(n) ? /* @__PURE__ */ g(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : n });
}
function Ic(n) {
  const { actions: e, editor: t } = n, [r, s] = j(t?.value || ""), o = W(null);
  P(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function l({ key: a }) {
    a === "Enter" && e.save();
  }
  return /* @__PURE__ */ g(
    "input",
    {
      className: "wx-e7Ao5ejY wx-text",
      onInput: i,
      onKeyDown: l,
      ref: o,
      type: "text",
      value: r
    }
  );
}
function Ac({ actions: n, editor: e, onAction: t }) {
  const [r, s] = j(e?.value), [o, i] = j(e?.renderedValue), [l, a] = j(e?.options || []), c = _(() => e?.config?.template, [e]), d = _(() => e?.config?.cell, [e]), u = _(() => (l || []).findIndex((y) => y.id === r), [l, r]), h = W(null), f = W(null), m = E(
    (y) => {
      h.current = y.navigate, f.current = y.keydown, h.current(u);
    },
    [u, h]
  ), p = E(
    (y) => {
      const k = y?.target?.value ?? "";
      i(k);
      const v = k ? (e?.options || []).filter(
        (N) => (N.label || "").toLowerCase().includes(k.toLowerCase())
      ) : e?.options || [];
      a(v), v.length ? h.current(-1 / 0) : h.current(null);
    },
    [e]
  ), x = W(null);
  P(() => {
    x.current && x.current.focus();
  }, []), P(() => {
    s(e?.value), i(e?.renderedValue), a(e?.options || []);
  }, [e]);
  const w = E(
    ({ id: y }) => {
      n.updateValue(y), n.save();
    },
    [n]
  );
  return /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g(
      "input",
      {
        className: "wx-0UYfSd1x wx-input",
        ref: x,
        value: o ?? "",
        onChange: p,
        onKeyDown: (y) => f.current ? f.current(y, u) : void 0
      }
    ),
    /* @__PURE__ */ g(
      $n,
      {
        items: l,
        onReady: m,
        onSelect: w,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ g(d, { data: y, onAction: t }) : y.label
      }
    )
  ] });
}
function Hc({ actions: n, editor: e, onAction: t }) {
  const [r] = j(() => e.value || /* @__PURE__ */ new Date()), [s] = j(() => e.config?.template), [o] = j(() => e.config?.cell);
  function i({ value: a }) {
    n.updateValue(a), n.save();
  }
  const l = W(null);
  return P(() => {
    l.current && l.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-lNWNYUb6 wx-value",
        ref: l,
        tabIndex: 0,
        onClick: () => n.cancel(),
        onKeyDown: (a) => a.preventDefault(),
        children: s ? s(r) : o ? /* @__PURE__ */ g(o, { data: e.value, onAction: t }) : /* @__PURE__ */ g("span", { className: "wx-lNWNYUb6 wx-text", children: e.renderedValue })
      }
    ),
    /* @__PURE__ */ g(Lt, { width: "auto", children: /* @__PURE__ */ g(
      Ns,
      {
        value: r,
        onChange: i,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Lc(n) {
  const { actions: e, editor: t } = n, r = n.onAction ?? n.onaction, s = t.config || {}, [o] = j(
    t.options.find((p) => p.id === t.value)
  ), [i] = j(t.value), [l] = j(t.options), a = _(
    () => l.findIndex((p) => p.id === i),
    [l, i]
  );
  function c({ id: p }) {
    e.updateValue(p), e.save();
  }
  let d;
  const [u, h] = j();
  function f(p) {
    d = p.navigate, h(() => p.keydown), d(a);
  }
  const m = W(null);
  return P(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        ref: m,
        className: "wx-ywGRk611 wx-value",
        tabIndex: 0,
        onClick: () => e.cancel(),
        onKeyDown: (p) => {
          u(p, a), p.preventDefault();
        },
        children: s.template ? s.template(o) : s.cell ? (() => {
          const p = s.cell;
          return /* @__PURE__ */ g(p, { data: o, onAction: r });
        })() : /* @__PURE__ */ g("span", { className: "wx-ywGRk611 wx-text", children: t.renderedValue })
      }
    ),
    /* @__PURE__ */ g($n, { items: l, onReady: f, onSelect: c, children: ({ option: p }) => s.template ? s.template(p) : s.cell ? (() => {
      const x = s.cell;
      return /* @__PURE__ */ g(x, { data: p, onAction: r });
    })() : p.label })
  ] });
}
const zc = {
  text: Ic,
  combo: Ac,
  datepicker: Hc,
  richselect: Lc
};
function Wc({ column: n, row: e }) {
  const t = he(Xe), r = Q(t, "editor"), s = E(
    (m, p) => {
      t.exec("close-editor", { ignore: m }), p && t.exec("focus-cell", {
        ...p,
        eventSource: "click"
      });
    },
    [t]
  ), o = E(
    (m) => {
      const p = m ? null : { row: r?.id, column: r?.column };
      s(!1, p);
    },
    [r, s]
  ), i = E(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), l = E(
    (m) => {
      t.exec("editor", { value: m });
    },
    [t]
  ), a = E(
    (m) => {
      m.key === "Enter" && r && i();
    },
    [r, i]
  ), c = _(
    () => Mn(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  ), d = _(() => {
    let m = n.editor;
    typeof m == "function" && (m = m(e, n));
    let p = typeof m == "string" ? m : m.type;
    return zc[p];
  }, [n, e]), u = W(null);
  P(() => {
    if (!u.current) return;
    const m = Yt(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), P(() => {
    u.current && typeof c == "string" && u.current.setAttribute("style", c);
  }, [c]);
  const h = typeof e.$parent < "u" ? "gridcell" : "cell", f = typeof e.$parent < "u" ? !n.editor : void 0;
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-8l724t2g wx-cell wx-editor",
      ref: u,
      style: typeof c == "object" && c !== null ? c : void 0,
      role: h,
      "aria-readonly": f,
      tabIndex: -1,
      onClick: (m) => m.stopPropagation(),
      onDoubleClick: (m) => m.stopPropagation(),
      onKeyDown: a,
      children: d ? /* @__PURE__ */ g(
        d,
        {
          editor: r,
          actions: { save: o, cancel: i, updateValue: l },
          onAction: ({ action: m, data: p }) => t.exec(m, p)
        }
      ) : null
    }
  );
}
function ps(n) {
  const { columns: e, type: t, columnStyle: r } = n, s = he(Xe), { filterValues: o, _columns: i, _sizes: l } = s.getState();
  function a(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ g(ve, { children: e.map((c, d) => /* @__PURE__ */ g("tr", { children: c.map((u) => {
    const h = i.find((p) => p.id == u.id), f = `wx-print-cell-${t}${a(h)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ g(
      "th",
      {
        style: $s(vo(u, l.columnWidth)),
        className: "wx-Gy81xq2u " + f,
        rowSpan: u.rowspan,
        colSpan: u.colspan,
        children: m ? /* @__PURE__ */ g(
          m,
          {
            api: s,
            cell: Object.fromEntries(
              Object.entries(u).filter(([p]) => p !== "cell")
            ),
            column: h,
            row: d
          }
        ) : u.filter ? /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-print-filter", children: Da(o, i, u) }) : /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function Fc(n) {
  const { columns: e, rowStyle: t, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: l } = n, a = he(Xe), { flatData: c, _sizes: d } = a.getState(), u = o && os(e, "header", d.headerRowHeights), h = i && os(e, "footer", d.footerRowHeights);
  function f(p, x) {
    let w = "";
    return w += r ? " " + r(x) : "", w += s ? " " + s(p, x) : "", w;
  }
  function m(p, x) {
    return typeof x.draggable == "function" ? x.draggable(p, x) !== !1 : x.draggable;
  }
  return /* @__PURE__ */ Y(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((p) => p.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ g("thead", { children: /* @__PURE__ */ g(
          ps,
          {
            columns: u,
            type: "header",
            columnStyle: r
          }
        ) }) : null,
        /* @__PURE__ */ g("tbody", { children: c.map((p, x) => /* @__PURE__ */ g(
          "tr",
          {
            className: "wx-8NTMLH0z wx-row" + (t ? " " + t(p) : ""),
            style: { height: `${p.rowHeight || d.rowHeight}px` },
            children: e.map(
              (w) => w.collapsed ? null : /* @__PURE__ */ Y(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${f(p, w)}`,
                  style: $s(
                    vo(w, d.columnWidth)
                  ),
                  children: [
                    l && w.draggable ? /* @__PURE__ */ g("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(p, w) ? /* @__PURE__ */ g("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    w.treetoggle ? /* @__PURE__ */ Y(ve, { children: [
                      /* @__PURE__ */ g(
                        "span",
                        {
                          style: { marginLeft: p.$level * 28 + "px" }
                        }
                      ),
                      p.$count ? /* @__PURE__ */ g(
                        "i",
                        {
                          className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${p.open !== !1 ? "down" : "right"}`
                        }
                      ) : null
                    ] }) : null,
                    w.cell ? (() => {
                      const y = w.cell;
                      return /* @__PURE__ */ g(y, { api: a, row: p, column: w });
                    })() : /* @__PURE__ */ g("span", { children: dt(p, w) })
                  ]
                },
                w.id
              )
            )
          },
          x
        )) }),
        i ? /* @__PURE__ */ g("tfoot", { children: /* @__PURE__ */ g(
          ps,
          {
            columns: h,
            type: "footer",
            columnStyle: r
          }
        ) }) : null
      ]
    }
  );
}
function Oc(n) {
  const { config: e, ...t } = n, r = he(Xe), { _skin: s, _columns: o } = r.getState(), i = _(() => _a(o, e), []), l = W(null);
  return P(() => {
    const a = document.body;
    a.classList.add("wx-print");
    const c = l.current;
    if (!c) return;
    const d = c.cloneNode(!0);
    a.appendChild(d);
    const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`, h = document.createElement("style");
    h.setAttribute("type", "text/css"), h.setAttribute("media", "print"), document.getElementsByTagName("head")[0].appendChild(h), h.appendChild(document.createTextNode(u)), window.print(), h.remove(), a.classList.remove("wx-print"), d.remove();
  }, []), /* @__PURE__ */ g(
    "div",
    {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: l,
      children: i.map((a, c) => /* @__PURE__ */ g("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ g(Fc, { columns: a, ...t }) }, c))
    }
  );
}
function Pc(n) {
  const {
    header: e,
    footer: t,
    overlay: r,
    multiselect: s,
    onreorder: o,
    rowStyle: i,
    columnStyle: l,
    cellStyle: a,
    autoRowHeight: c,
    resize: d,
    clientWidth: u,
    clientHeight: h,
    responsiveLevel: f,
    hotkeys: m
  } = n, p = he(Xe), x = Q(p, "dynamic"), w = Q(p, "_columns"), y = Q(p, "flatData"), k = Q(p, "split"), v = Q(p, "_sizes"), [N, b] = gn(p, "selectedRows"), $ = Q(p, "select"), D = Q(p, "editor"), O = Q(p, "tree"), C = Q(p, "focusCell"), I = Q(p, "_print"), A = Q(p, "undo"), L = Q(p, "reorder"), z = Q(p, "_rowHeightFromData"), [F, M] = j(0);
  P(() => {
    M(St());
  }, []);
  const [B, V] = j(0), [U, oe] = j(0), T = _(() => (w || []).some((R) => !R.hidden && R.flexgrow), [w]), ee = _(() => v?.rowHeight || 0, [v]), le = W(null), [se, me] = j(null), [q, fe] = j(null), ne = _(() => {
    let R = [], X = 0;
    return k && k.left && (R = (w || []).slice(0, k.left).filter((ie) => !ie.hidden).map((ie) => ({ ...ie })), R.forEach((ie) => {
      ie.fixed = { left: 1 }, ie.left = X, X += ie.width;
    }), R.length && (R[R.length - 1].fixed = { left: -1 })), { columns: R, width: X };
  }, [k, w]), ae = _(() => {
    let R = [], X = 0;
    if (k && k.right) {
      R = (w || []).slice(k.right * -1).filter((ie) => !ie.hidden).map((ie) => ({ ...ie }));
      for (let ie = R.length - 1; ie >= 0; ie--) {
        const ke = R[ie];
        ke.fixed = { right: 1 }, ke.right = X, X += ke.width;
      }
      R.length && (R[0].fixed = { right: -1 });
    }
    return { columns: R, width: X };
  }, [k, w]), pe = _(() => {
    const R = (w || []).slice(k?.left || 0, (w || []).length - (k?.right ?? 0)).filter((X) => !X.hidden);
    return R.forEach((X) => {
      X.fixed = 0;
    }), R;
  }, [w, k]), xe = _(() => (w || []).reduce((R, X) => (X.hidden || (R += X.width), R), 0), [w]), Ke = 1;
  function De(R, X, ie) {
    let ke = X, Re = R;
    if (pe.length) {
      let be = pe.length;
      for (let de = R; de >= 0; de--)
        pe[de][ie].forEach((Ie) => {
          Ie.colspan > 1 && de > R - Ie.colspan && de < be && (be = de);
        });
      if (be !== pe.length && be < R) {
        for (let de = be; de < R; de++)
          ke -= pe[de].width;
        Re = be;
      }
    }
    return { index: Re, delta: ke };
  }
  const Se = _(() => {
    let R, X, ie;
    const ke = B, Re = B + (u || 0);
    let be = 0, de = 0, Ie = 0, Qe = 0;
    pe.forEach((ft, Ct) => {
      ke > Ie && (be = Ct, Qe = Ie), Ie = Ie + ft.width, Re > Ie && (de = Ct + Ke);
    });
    const tt = { header: 0, footer: 0 };
    for (let ft = de; ft >= be; ft--)
      ["header", "footer"].forEach((Ct) => {
        pe[ft] && pe[ft][Ct].forEach((zo) => {
          const In = zo.colspan;
          if (In && In > 1) {
            const Tr = In - (de - ft + 1);
            Tr > 0 && (tt[Ct] = Math.max(tt[Ct], Tr));
          }
        });
      });
    const Le = De(be, Qe, "header"), nt = De(be, Qe, "footer"), Ft = Le.delta, tn = Le.index, nn = nt.delta, Rn = nt.index;
    return T && xe > (u || 0) ? R = X = ie = [...ne.columns, ...pe, ...ae.columns] : (R = [
      ...ne.columns,
      ...pe.slice(be, de + 1),
      ...ae.columns
    ], X = [
      ...ne.columns,
      ...pe.slice(tn, de + tt.header + 1),
      ...ae.columns
    ], ie = [
      ...ne.columns,
      ...pe.slice(Rn, de + tt.footer + 1),
      ...ae.columns
    ]), {
      data: R || [],
      header: X || [],
      footer: ie || [],
      d: Qe,
      df: nn,
      dh: Ft
    };
  }, [
    pe,
    ne,
    ae,
    B,
    u,
    T,
    xe
  ]), Me = _(
    () => e && v?.headerHeight || 0,
    [e, v]
  ), ye = _(
    () => t && v?.footerHeight || 0,
    [t, v]
  ), Ne = _(() => u && h ? xe >= u : !1, [u, h, xe]), Ce = _(() => (h || 0) - Me - ye - (Ne ? F : 0), [h, Me, ye, Ne, F]), J = _(() => Math.ceil((Ce || 0) / (ee || 1)) + 1, [Ce, ee]), we = W([]), [$e, ce] = j(0), [_e, Ue] = j(void 0), We = _(() => {
    let R = 0, X = 0;
    const ie = 2;
    if (c) {
      let be = U;
      for (; be > 0; )
        be -= we.current[R] || ee, R++;
      X = U - be;
      for (let de = Math.max(0, R - ie - 1); de < R; de++)
        X -= we.current[R - de] || ee;
      R = Math.max(0, R - ie);
    } else {
      if (z) {
        let be = 0, de = 0;
        for (let Le = 0; Le < (y || []).length; Le++) {
          const nt = y[Le].rowHeight || ee;
          if (de + nt > U) {
            be = Le;
            break;
          }
          de += nt;
        }
        R = Math.max(0, be - ie);
        for (let Le = 0; Le < R; Le++)
          X += y[Le].rowHeight || ee;
        let Ie = 0, Qe = 0;
        for (let Le = be + 1; Le < (y || []).length; Le++) {
          const nt = y[Le].rowHeight || ee;
          if (Ie++, Qe + nt > Ce)
            break;
          Qe += nt;
        }
        const tt = Math.min(
          x ? x.rowCount : (y || []).length,
          be + Ie + ie
        );
        return { d: X, start: R, end: tt };
      }
      R = Math.floor(U / (ee || 1)), R = Math.max(0, R - ie), X = R * (ee || 0);
    }
    const ke = x ? x.rowCount : (y || []).length, Re = Math.min(ke, R + (J || 0) + ie);
    return { d: X, start: R, end: Re };
  }, [c, z, U, ee, x, y, J, Ce]), H = _(() => {
    const R = x ? x.rowCount : (y || []).length;
    if (c)
      return $e + We.d + (R - (_e || 0)) * (ee || 0);
    if (!z)
      return R * (ee || 0);
    let X = 0;
    for (let ie = 0; ie < R; ie++)
      X += y[ie]?.rowHeight || ee;
    return X;
  }, [
    x,
    y,
    ee,
    c,
    z,
    $e,
    We.d,
    _e
  ]), K = _(() => u && h ? H + Me + ye >= h - (xe >= (u || 0) ? F : 0) : !1, [
    u,
    h,
    H,
    Me,
    ye,
    xe,
    F
  ]), te = _(() => T && xe <= (u || 0) ? (u || 0) - 0 - (K ? F : 0) : xe, [T, xe, u, K, F, Ne]), S = _(() => T && xe <= (u || 0) ? u || 0 : te < (u || 0) ? xe + (K ? F : 0) : -1, [T, xe, u, te, K, F]), G = W({});
  P(() => {
    if (x && (G.current.start !== We.start || G.current.end !== We.end)) {
      const { start: R, end: X } = We;
      G.current = { start: R, end: X }, p && p.exec && p.exec("request-data", { row: { start: R, end: X } });
    }
  }, [x, We, p]);
  const Z = _(() => x ? y || [] : (y || []).slice(We.start, We.end), [x, y, We]), re = _(() => (N || []).filter(
    (R) => (Z || []).some((X) => X.id === R)
  ), [b, Z]), ue = _(() => We.start, [We.start]), Ee = E((R) => {
    oe(R.target.scrollTop), V(R.target.scrollLeft);
  }, []), Ae = E((R) => {
    R.shiftKey && R.preventDefault(), le.current && le.current.focus && le.current.focus();
  }, []), He = E(() => !!(w || []).find((R) => !!R.draggable), [w]), Pe = W(null), qe = W(null), ot = W({
    dblclick: (R, X) => {
      const ie = { id: R, column: Kn(X, "data-col-id") };
      p.exec("open-editor", ie);
    },
    click: (R, X) => {
      if (Pe.current) return;
      const ie = Kn(X, "data-col-id");
      if (C?.id !== R && p.exec("focus-cell", {
        row: R,
        column: ie,
        eventSource: "click"
      }), $ === !1) return;
      const ke = s && X.ctrlKey, Re = s && X.shiftKey;
      (ke || N.length > 1 || !N.includes(R)) && p.exec("select-row", { id: R, toggle: ke, range: Re });
    },
    "toggle-row": (R) => {
      const X = p.getRow(R);
      p.exec(X.open !== !1 ? "close-row" : "open-row", { id: R });
    },
    "ignore-click": () => !1
  }), ht = _(() => ({
    top: Me,
    bottom: ye,
    left: ne.width,
    xScroll: Ne,
    yScroll: K,
    sense: c && q ? q.offsetHeight : Math.max(v?.rowHeight || 0, 40),
    node: le.current && le.current.firstElementChild
  }), [
    Me,
    ye,
    ne.width,
    Ne,
    K,
    c,
    q,
    v
  ]);
  function Ye(R, X) {
    const { container: ie, sourceNode: ke, from: Re } = X;
    if (He() && !ke.getAttribute("draggable-data"))
      return !1;
    me(Re), p.getRow(Re).open && p.exec("close-row", { id: Re, nested: !0 });
    const be = Oe(ke, "data-id"), de = be.cloneNode(!0);
    de.classList.remove("wx-selected"), de.querySelectorAll("[tabindex]").forEach((Le) => Le.setAttribute("tabindex", "-1")), ie.appendChild(de), fe(de);
    const Ie = B - Se.d, Qe = K ? F : 0;
    ie.style.width = Math.min(
      (u || 0) - Qe,
      T && xe <= (u || 0) ? te : te - Qe
    ) + Ie + "px";
    const tt = fn(be);
    X.offset = {
      x: Ie,
      y: -Math.round(tt.height / 2)
    }, qe.current || (qe.current = R.clientY);
  }
  function Jt(R, X) {
    const { from: ie } = X, ke = X.pos, Re = fn(le.current);
    ke.x = Re.x;
    const be = ht.top;
    if (ke.y < be) ke.y = be;
    else {
      const de = Re.height - (Ne && F > 0 ? F : Math.round(ht.sense / 2)) - ht.bottom;
      ke.y > de && (ke.y = de);
    }
    if (le.current.contains(X.targetNode)) {
      const de = Oe(X.targetNode, "data-id"), Ie = At(de?.getAttribute("data-id"));
      if (Ie && Ie !== ie) {
        X.to = Ie;
        const Qe = c ? q?.offsetHeight : v?.rowHeight;
        if (q && (U === 0 || ke.y > be + Qe - 1)) {
          const tt = de.getBoundingClientRect(), Le = fn(q).y, nt = tt.y, Ft = Le > nt ? -1 : 1, tn = Ft === 1 ? "after" : "before", nn = Math.abs(p.getRowIndex(ie) - p.getRowIndex(Ie)), Rn = nn !== 1 ? tn === "before" ? "after" : "before" : tn;
          if (nn === 1 && (Ft === -1 && R.clientY > qe.current || Ft === 1 && R.clientY < qe.current))
            return;
          qe.current = R.clientY, p.exec("move-item", {
            id: ie,
            target: Ie,
            mode: Rn,
            inProgress: !0
          });
        }
      }
      o && o({ event: R, context: X });
    }
    vc(R, Re, X, ht);
  }
  function Wt(R, X) {
    const { from: ie, to: ke } = X;
    p.exec("move-item", {
      id: ie,
      target: ke,
      inProgress: !1
    }), Pe.current = setTimeout(() => {
      Pe.current = 0;
    }, 1), me(null), fe(null), qe.current = null, Mo(X);
  }
  function St() {
    const R = document.createElement("div");
    R.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(R);
    const X = R.offsetWidth - R.clientWidth;
    return document.body.removeChild(R), X;
  }
  const $t = _(() => S > 0 ? { width: `${S}px` } : void 0, [S]), $r = W(null);
  function Ho() {
    Promise.resolve().then(() => {
      let R = 0, X = ue;
      const ie = $r.current;
      ie && (Array.from(ie.children).forEach((ke, Re) => {
        we.current[ue + Re] = ke.offsetHeight, R += ke.offsetHeight, X++;
      }), ce(R), Ue(X));
    });
  }
  P(() => {
    Z && c && Ho();
  }, [Z, c, ue]);
  let [_t, En] = j();
  P(() => {
    if (C && (!$ || !re.length || re.includes(C.row)))
      En({ ...C });
    else if (Z.length && Se.data.length) {
      if (!_t || re.length && !re.includes(_t.row) || Z.findIndex((R) => R.id == _t.row) === -1 || Se.data.findIndex(
        (R) => R.id == _t.column && !R.collapsed
      ) === -1) {
        const R = re[0] || Z[0].id, X = Se.data.findIndex((ie) => !ie.collapsed);
        En(X !== -1 ? { row: R, column: Se.data[X].id } : null);
      }
    } else En(null);
  }, [C]);
  const _r = W(null);
  P(() => {
    const R = le.current;
    if (!R) return;
    const X = pc(R, d);
    return () => {
      typeof X == "function" && X();
    };
  }, [d]);
  const Cr = W({});
  Object.assign(Cr.current, {
    start: Ye,
    move: Jt,
    end: Wt,
    getReorder: () => L,
    getDraggableInfo: () => ({ hasDraggable: He() })
  }), P(() => {
    const R = le.current;
    return R ? wc(R, Cr).destroy : void 0;
  }, [L, le.current]), P(() => {
    const R = le.current;
    return R ? kr(R, {
      keys: m !== !1 && {
        ...qa,
        "ctrl+z": A,
        "ctrl+y": A,
        ...m
      },
      exec: (X) => p.exec("hotkey", X)
    }).destroy : void 0;
  }, [p, A, m]);
  const en = W({
    scroll: p.getReactiveState().scroll
  });
  en.current.getWidth = () => (u || 0) - (K ? F : 0), en.current.getHeight = () => Ce, en.current.getScrollMargin = () => ne.width + ae.width, P(() => {
    Xa(_r.current, en.current);
  }, []);
  const Nr = W(null);
  P(() => {
    const R = Nr.current;
    if (!R) return;
    const X = [];
    return X.push(
      Yt(R, () => p.exec("focus-cell", { eventSource: "click" })).destroy
    ), X.push(ri(R, ot.current)), () => X.forEach((ie) => ie());
  }, []);
  const Lo = `wx-grid ${f ? `wx-responsive-${f}` : ""}`;
  return /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-4VuBwK2D " + Lo,
        style: {
          "--header-height": `${Me}px`,
          "--footer-height": `${ye}px`,
          "--split-left-width": `${ne.width}px`,
          "--split-right-width": `${ae.width}px`
        },
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: le,
            className: "wx-4VuBwK2D wx-table-box",
            style: $t,
            role: O ? "treegrid" : "grid",
            "aria-colcount": Se.data.length,
            "aria-rowcount": Z.length,
            "aria-multiselectable": O && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ Y(
              "div",
              {
                ref: _r,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: Ne ? "scroll" : "hidden",
                  overflowY: K ? "scroll" : "hidden"
                },
                onScroll: Ee,
                children: [
                  e ? /* @__PURE__ */ g("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ g(
                    fs,
                    {
                      contentWidth: te,
                      deltaLeft: Se.dh,
                      columns: Se.header,
                      columnStyle: l,
                      bodyHeight: Ce - +t
                    }
                  ) }) : null,
                  /* @__PURE__ */ Y(
                    "div",
                    {
                      ref: Nr,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${te}px`, height: `${H}px` },
                      onMouseDown: (R) => Ae(R),
                      children: [
                        r ? /* @__PURE__ */ g(Rc, { overlay: r }) : null,
                        /* @__PURE__ */ g(
                          "div",
                          {
                            ref: $r,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${We.d}px`,
                              paddingLeft: `${Se.d}px`
                            },
                            children: Z.map((R, X) => {
                              const ie = N.indexOf(R.id) !== -1, ke = se === R.id, Re = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(R) : "") + (ie ? " wx-selected" : "") + (ke ? " wx-inactive" : ""), be = c ? { minHeight: `${R.rowHeight || ee}px` } : { height: `${R.rowHeight || ee}px` };
                              return /* @__PURE__ */ g(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + Re,
                                  "data-id": R.id,
                                  "data-context-id": R.id,
                                  style: be,
                                  role: "row",
                                  "aria-rowindex": X,
                                  "aria-expanded": R.open,
                                  "aria-level": O ? R.$level + 1 : void 0,
                                  "aria-selected": O ? ie : void 0,
                                  tabIndex: -1,
                                  children: Se.data.map((de) => de.collapsed ? /* @__PURE__ */ g(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    de.id
                                  ) : D?.id === R.id && D.column == de.id ? /* @__PURE__ */ g(Wc, { row: R, column: de }, de.id) : /* @__PURE__ */ g(
                                    _c,
                                    {
                                      row: R,
                                      column: de,
                                      columnStyle: l,
                                      cellStyle: a,
                                      reorder: L,
                                      focusable: _t?.row === R.id && _t?.column == de.id
                                    },
                                    de.id
                                  ))
                                },
                                R.id
                              );
                            })
                          }
                        )
                      ]
                    }
                  ),
                  t && (y || []).length ? /* @__PURE__ */ g(
                    fs,
                    {
                      type: "footer",
                      contentWidth: te,
                      deltaLeft: Se.df,
                      columns: Se.footer,
                      columnStyle: l
                    }
                  ) : null
                ]
              }
            )
          }
        )
      }
    ),
    I ? /* @__PURE__ */ g(
      Oc,
      {
        config: I,
        rowStyle: i,
        columnStyle: l,
        cellStyle: a,
        header: e,
        footer: t,
        reorder: L
      }
    ) : null
  ] });
}
const Vc = (n) => n.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Gc = vt(function({
  data: n = [],
  columns: e = [],
  rowStyle: t = null,
  columnStyle: r = null,
  cellStyle: s = null,
  selectedRows: o,
  select: i = !0,
  multiselect: l = !1,
  header: a = !0,
  footer: c = !1,
  dynamic: d = null,
  overlay: u = null,
  reorder: h = !1,
  onReorder: f = null,
  autoRowHeight: m = !1,
  sizes: p,
  split: x,
  tree: w = !1,
  autoConfig: y = !1,
  init: k = null,
  responsive: v = null,
  sortMarks: N,
  undo: b = !1,
  hotkeys: $ = null,
  ...D
}, O) {
  const C = W();
  C.current = D;
  const I = _(() => new Ga(_s), []), A = _(() => I.in, [I]), L = W(null);
  L.current === null && (L.current = new Rs((ne, ae) => {
    const pe = "on" + Vc(ne);
    C.current && C.current[pe] && C.current[pe](ae);
  }), A.setNext(L.current));
  const z = _(
    () => ({
      getState: I.getState.bind(I),
      getReactiveState: I.getReactive.bind(I),
      getStores: () => ({ data: I }),
      exec: A.exec,
      setNext: (ne) => (L.current = L.current.setNext(ne), L.current),
      intercept: A.intercept.bind(A),
      on: A.on.bind(A),
      detach: A.detach.bind(A),
      getRow: I.getRow.bind(I),
      getRowIndex: I.getRowIndex.bind(I),
      getColumn: I.getColumn.bind(I)
    }),
    [I, A]
  ), [F, M] = j(0), [B, V] = j(0), [U, oe] = j(null), [T, ee] = j(null), le = _(() => {
    if (y && !e.length && n.length) {
      const ne = n[0], ae = [];
      for (let pe in ne)
        if (pe !== "id" && pe[0] !== "$") {
          let xe = {
            id: pe,
            header: pe[0].toUpperCase() + pe.slice(1)
          };
          typeof y == "object" && (xe = { ...xe, ...y }), ae.push(xe);
        }
      return ae;
    }
    return (T && T.columns) ?? e;
  }, [y, e, n, T]), se = _(
    () => (T && T.sizes) ?? p,
    [T, p]
  ), me = E(
    (ne) => {
      if (M(ne.width), V(ne.height), v) {
        const ae = Object.keys(v).map(Number).sort((pe, xe) => pe - xe).find((pe) => ne.width <= pe) ?? null;
        ae !== U && (ee(v[ae]), oe(ae));
      }
    },
    [v, U]
  ), q = he(Ve.theme), fe = W(0);
  return P(() => {
    if (!fe.current)
      k && k(z);
    else {
      const ne = I.getState();
      I.init({
        data: n,
        columns: le,
        split: x || ne.split,
        sizes: se || ne.sizes,
        selectedRows: o || ne.selectedRows,
        dynamic: d,
        tree: w,
        sortMarks: N || ne.sortMarks,
        undo: b,
        reorder: h,
        _skin: q,
        _select: i
      });
    }
    fe.current++;
  }, [
    I,
    n,
    le,
    x,
    se,
    o,
    d,
    w,
    N,
    b,
    h,
    q,
    i,
    k,
    z
  ]), fe.current === 0 && I.init({
    data: n,
    columns: le,
    split: x || { left: 0 },
    sizes: se || {},
    selectedRows: o || [],
    dynamic: d,
    tree: w,
    sortMarks: N || {},
    undo: b,
    reorder: h,
    _skin: q,
    select: i
  }), kt(
    O,
    () => ({
      ...z
    }),
    [z]
  ), /* @__PURE__ */ g(Xe.Provider, { value: z, children: /* @__PURE__ */ g(_n, { words: Ja, optional: !0, children: /* @__PURE__ */ g(
    Pc,
    {
      header: a,
      footer: c,
      overlay: u,
      rowStyle: t,
      columnStyle: r,
      cellStyle: s,
      onReorder: f,
      multiselect: l,
      autoRowHeight: m,
      clientWidth: F,
      clientHeight: B,
      responsiveLevel: U,
      resize: me,
      hotkeys: $
    }
  ) }) });
});
function jc({ item: n }) {
  return /* @__PURE__ */ Y(
    "div",
    {
      tabIndex: -1,
      role: "menuitem",
      "aria-label": n.hidden ? `Show ${n.text} column` : `Hide ${n.text} column`,
      children: [
        /* @__PURE__ */ g(
          "div",
          {
            className: "wx-v13lZxja wx-icon" + (n.hidden ? " wx-hidden" : ""),
            children: /* @__PURE__ */ g("i", { className: "wx-v13lZxja wxi-eye" })
          }
        ),
        /* @__PURE__ */ g("span", { children: n.text })
      ]
    }
  );
}
function Bc({ columns: n = null, api: e, children: t }) {
  P(() => {
    rc("table-header", jc);
  }, []);
  function r(a) {
    for (let c = a.header.length - 1; c >= 0; c--) {
      const d = a.header[c].text;
      if (d) return d;
    }
    return a.id;
  }
  function s(a) {
    const c = a.action;
    c && e.exec("hide-column", { id: c.id, mode: !c.hidden });
  }
  function o(a) {
    return a;
  }
  const i = rt(e, "_columns"), l = _(() => {
    if (e) {
      const a = Array.isArray(i) ? i : [];
      return (n ? a.filter((c) => n[c.id]) : a).map((c) => {
        const d = r(c);
        return {
          id: c.id,
          text: d,
          type: "table-header",
          hidden: c.hidden
        };
      });
    } else
      return [];
  }, [e, n, i]);
  return /* @__PURE__ */ g(
    Co,
    {
      dataKey: "headerId",
      options: l,
      onClick: s,
      at: "point",
      resolver: o,
      children: typeof t == "function" ? t() : t
    }
  );
}
ar(Be);
function Kc({ row: n, column: e }) {
  function t(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ Y("div", { className: "wx-pqc08MHU wx-content", style: t(n, e), children: [
    n.data || n.lazy ? /* @__PURE__ */ g(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${n.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ g("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ g("div", { className: "wx-pqc08MHU wx-text", children: r ? /* @__PURE__ */ g(r, { row: n, column: e }) : n.text })
  ] });
}
function gs({ column: n, cell: e }) {
  const t = _(() => n.id, [n?.id]);
  return e || n.id == "add-task" ? /* @__PURE__ */ g("div", { style: { textAlign: n.align }, children: /* @__PURE__ */ g(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": t
    }
  ) }) : null;
}
function Yc(n) {
  const {
    readonly: e,
    compactMode: t,
    width: r = 0,
    display: s = "all",
    columnWidth: o = 0,
    onTableAPIChange: i
  } = n, [l, a] = Te(o), [c, d] = j(), u = he(Ve.i18n), h = _(() => u.getGroup("gantt"), [u]), f = he(ut), m = Q(f, "scrollTop"), p = Q(f, "cellHeight"), x = Q(f, "_scrollTask"), w = Q(f, "_selected"), y = Q(f, "area"), k = Q(f, "_tasks"), v = Q(f, "_scales"), N = Q(f, "columns"), b = Q(f, "_sort"), $ = Q(f, "calendar"), D = Q(f, "durationUnit"), O = Q(f, "splitTasks"), [C, I] = j(null), A = _(() => !k || !y ? [] : k.slice(y.start, y.end), [k, y]), L = E(
    (H, K) => {
      if (K === "add-task")
        f.exec(K, {
          target: H,
          task: { text: h("New Task") },
          mode: "child",
          show: !0
        });
      else if (K === "open-task") {
        const te = A.find((S) => S.id === H);
        (te?.data || te?.lazy) && f.exec(K, { id: H, mode: !te.open });
      }
    },
    [A]
  ), z = E(
    (H) => {
      const K = gt(H), te = H.target.dataset.action;
      te && H.preventDefault(), K ? te === "add-task" || te === "open-task" ? L(K, te) : f.exec("select-task", {
        id: K,
        toggle: H.ctrlKey || H.metaKey,
        range: H.shiftKey,
        show: !0
      }) : te === "add-task" && L(null, te);
    },
    [f, L]
  ), F = W(null), M = W(null), [B, V] = j(0), [U, oe] = j(!1);
  P(() => {
    const H = M.current;
    if (!H || typeof ResizeObserver > "u") return;
    const K = () => V(H.clientWidth);
    K();
    const te = new ResizeObserver(K);
    return te.observe(H), () => te.disconnect();
  }, []);
  const T = W(null), ee = E(
    (H) => {
      const K = H.id, { before: te, after: S } = H, G = H.onMove;
      let Z = te || S, re = te ? "before" : "after";
      if (G) {
        if (re === "after") {
          const ue = f.getTask(Z);
          ue.data?.length && ue.open && (re = "before", Z = ue.data[0].id);
        }
        T.current = { id: K, [re]: Z };
      } else T.current = null;
      f.exec("move-task", {
        id: K,
        mode: re,
        target: Z,
        inProgress: G
      });
    },
    [f]
  ), le = _(() => y?.from ?? 0, [y]), se = _(() => v?.height ?? 0, [v]), me = _(() => !t && s !== "grid" ? (l ?? 0) > (r ?? 0) : (l ?? 0) > (B ?? 0), [t, s, l, r, B]), q = _(() => {
    const H = {};
    return me && s === "all" || s === "grid" && me ? H.width = l : s === "grid" && (H.width = "100%"), H;
  }, [me, s, l]), fe = _(() => C && !A.find((H) => H.id === C.id) ? [...A, C] : A, [A, C]), ne = _(() => {
    let H = (N || []).map((S) => {
      S = { ...S };
      const G = S.header;
      if (typeof G == "object") {
        const Z = G.text && h(G.text);
        S.header = { ...G, text: Z };
      } else S.header = h(G);
      return S;
    });
    const K = H.findIndex((S) => S.id === "text"), te = H.findIndex((S) => S.id === "add-task");
    if (K !== -1 && (H[K].cell && (H[K]._cell = H[K].cell), H[K].cell = Kc), te !== -1) {
      H[te].cell = H[te].cell || gs;
      const S = H[te].header;
      if (typeof S != "object" && (H[te].header = { text: S }), H[te].header.cell = S.cell || gs, e)
        H.splice(te, 1);
      else if (t) {
        const [G] = H.splice(te, 1);
        H.unshift(G);
      }
    }
    return H.length > 0 && (H[H.length - 1].resize = !1), H;
  }, [N, h, e, t]), ae = _(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : ne.find((H) => H.id === "add-task") ? "50px" : "0", [s, r, ne]), pe = _(() => {
    if (fe && b?.length) {
      const H = {};
      return b.forEach(({ key: K, order: te }, S) => {
        H[K] = {
          order: te,
          ...b.length > 1 && { index: S }
        };
      }), H;
    }
    return {};
  }, [fe, b]), xe = E(() => ne.some((H) => H.flexgrow && !H.hidden), []), Ke = _(() => xe(), [xe, U]), De = _(() => {
    let H = s === "chart" ? ne.filter((te) => te.id === "add-task") : ne;
    const K = s === "all" ? r : B;
    if (!Ke) {
      let te = l, S = !1;
      if (ne.some((G) => G.$width)) {
        let G = 0;
        te = ne.reduce((Z, re) => (re.hidden || (G += re.width, Z += re.$width || re.width), Z), 0), G > te && te > K && (S = !0);
      }
      if (S || te < K) {
        let G = 1;
        return S || (G = (K - 50) / (te - 50 || 1)), H.map((Z) => (Z.id !== "add-task" && !Z.hidden && (Z.$width || (Z.$width = Z.width), Z.width = Z.$width * G), Z));
      }
    }
    return H;
  }, [s, ne, Ke, l, r, B]), Se = E(
    (H) => {
      if (!xe()) {
        const K = De.reduce((te, S) => (H && S.$width && (S.$width = S.width), te + (S.hidden ? 0 : S.width)), 0);
        K !== l && a(K);
      }
      oe(!0), oe(!1);
    },
    [xe, De, l, a]
  ), Me = E(() => {
    ne.filter((K) => K.flexgrow && !K.hidden).length === 1 && ne.forEach((K) => {
      K.$width && !K.flexgrow && !K.hidden && (K.width = K.$width);
    });
  }, []), ye = E(
    (H) => {
      if (!e) {
        const K = gt(H), te = Kn(H, "data-col-id");
        !(te && ne.find((G) => G.id == te))?.editor && K && f.exec("show-editor", { id: K });
      }
    },
    [f, e]
    // cols is defined later; relies on latest value at call time
  ), Ne = _(
    () => Array.isArray(w) ? w.map((H) => H.id) : [],
    [w]
  ), Ce = E(() => {
    if (F.current && fe !== null) {
      const H = F.current.querySelector(".wx-body");
      H && (H.style.top = -((m ?? 0) - (le ?? 0)) + "px");
    }
    M.current && (M.current.scrollTop = 0);
  }, [fe, m, le]);
  P(() => {
    F.current && Ce();
  }, [m, le, Ce]), P(() => {
    const H = F.current;
    if (!H) return;
    const K = H.querySelector(".wx-table-box .wx-body");
    if (!K || typeof ResizeObserver > "u") return;
    const te = new ResizeObserver(() => {
      Ce();
    });
    return te.observe(K), () => {
      te.disconnect();
    };
  }, [De, q, s, ae, fe, Ce]), P(() => {
    if (!x || !c) return;
    const { id: H } = x, K = c.getState().focusCell;
    K && K.row !== H && F.current && F.current.contains(document.activeElement) && c.exec("focus-cell", {
      row: H,
      column: K.column
    });
  }, [x, c]);
  const J = E(
    ({ id: H }) => {
      if (e) return !1;
      f.getTask(H).open && f.exec("open-task", { id: H, mode: !1 });
      const K = f.getState()._tasks.find((te) => te.id === H);
      if (I(K || null), !K) return !1;
    },
    [f, e]
  ), we = E(
    ({ id: H, top: K }) => {
      T.current ? ee({ ...T.current, onMove: !1 }) : f.exec("drag-task", {
        id: H,
        top: K + (le ?? 0),
        inProgress: !1
      }), I(null);
    },
    [f, ee, le]
  ), $e = E(
    ({ id: H, top: K, detail: te }) => {
      te && ee({ ...te, onMove: !0 }), f.exec("drag-task", {
        id: H,
        top: K + (le ?? 0),
        inProgress: !0
      });
    },
    [f, ee, le]
  );
  P(() => {
    const H = F.current;
    return H ? Za(H, {
      start: J,
      end: we,
      move: $e,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, J, we, $e]);
  const ce = E(
    (H) => {
      const { key: K, isInput: te } = H;
      if (!te && (K === "arrowup" || K === "arrowdown"))
        return H.eventSource = "grid", f.exec("hotkey", H), !1;
      if (K === "enter") {
        const S = c?.getState().focusCell;
        if (S) {
          const { row: G, column: Z } = S;
          Z === "add-task" ? L(G, "add-task") : Z === "text" && L(G, "open-task");
        }
      }
    },
    [f, L, c]
  ), _e = W(null), Ue = () => {
    _e.current = {
      setTableAPI: d,
      handleHotkey: ce,
      sortVal: b,
      api: f,
      adjustColumns: Me,
      setColumnWidth: Se,
      tasks: A,
      calendarVal: $,
      durationUnitVal: D,
      splitTasksVal: O,
      onTableAPIChange: i
    };
  };
  Ue(), P(() => {
    Ue();
  }, [
    d,
    ce,
    b,
    f,
    Me,
    Se,
    A,
    $,
    D,
    O,
    i
  ]);
  const We = E((H) => {
    d(H), H.intercept("hotkey", (K) => _e.current.handleHotkey(K)), H.intercept("scroll", () => !1), H.intercept("select-row", () => !1), H.intercept("sort-rows", (K) => {
      const te = _e.current.sortVal, { key: S, add: G } = K, Z = te ? te.find((ue) => ue.key === S) : null;
      let re = "asc";
      return Z && (re = !Z || Z.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
        key: S,
        order: re,
        add: G
      }), !1;
    }), H.on("resize-column", () => {
      _e.current.setColumnWidth(!0);
    }), H.on("hide-column", (K) => {
      K.mode || _e.current.adjustColumns(), _e.current.setColumnWidth();
    }), H.intercept("update-cell", (K) => {
      const { id: te, column: S, value: G } = K, Z = _e.current.tasks.find((re) => re.id === te);
      if (Z) {
        const re = { ...Z };
        let ue = G;
        ue && !isNaN(ue) && !(ue instanceof Date) && (ue *= 1), re[S] = ue, ho(
          re,
          {
            calendar: _e.current.calendarVal,
            durationUnit: _e.current.durationUnitVal,
            splitTasks: _e.current.splitTasksVal
          },
          S
        ), f.exec("update-task", {
          id: te,
          task: re
        });
      }
      return !1;
    }), i && i(H);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ae}` },
      ref: M,
      children: /* @__PURE__ */ g(
        "div",
        {
          ref: F,
          style: q,
          className: "wx-rHj6070p wx-table",
          onClick: z,
          onDoubleClick: ye,
          children: /* @__PURE__ */ g(
            Gc,
            {
              init: We,
              sizes: {
                rowHeight: p,
                headerHeight: (se ?? 0) - 1
              },
              rowStyle: (H) => H.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (H) => `wx-rHj6070p wx-text-${H.align}${H.id === "add-task" ? " wx-action" : ""}`,
              data: fe,
              columns: De,
              selectedRows: [...Ne],
              sortMarks: pe
            }
          )
        }
      )
    }
  );
}
function Uc({ borders: n = "" }) {
  const e = he(ut), t = Q(e, "cellWidth"), r = Q(e, "cellHeight"), s = W(null), [o, i] = j("#e4e4e4");
  P(() => {
    if (typeof getComputedStyle < "u" && s.current) {
      const a = getComputedStyle(s.current).getPropertyValue(
        "--wx-gantt-border"
      );
      i(a ? a.substring(a.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const l = {
    width: "100%",
    height: "100%",
    background: t != null && r != null ? `url(${na(t, r, o, n)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ g("div", { ref: s, style: l });
}
function qc({ onSelectLink: n, selectedLink: e, readonly: t }) {
  const r = he(ut), s = Q(r, "_links"), o = Q(r, "criticalPath"), i = W(null), l = E(
    (a) => {
      const c = a?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && n(null);
    },
    [n]
  );
  return P(() => {
    if (!t && e && i.current) {
      const a = (c) => {
        i.current && !i.current.contains(c.target) && l(c);
      };
      return document.addEventListener("click", a), () => {
        document.removeEventListener("click", a);
      };
    }
  }, [t, e, l]), /* @__PURE__ */ Y("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (s || []).map((a) => {
      const c = "wx-dkx3NwEn wx-line" + (o && a.$critical ? " wx-critical" : "") + (t ? "" : " wx-line-selectable");
      return /* @__PURE__ */ g(
        "polyline",
        {
          className: c,
          points: a.$p,
          onClick: () => !t && n(a.id),
          "data-link-id": a.id
        },
        a.id
      );
    }),
    !t && e && /* @__PURE__ */ g(
      "polyline",
      {
        ref: i,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: e.$p
      }
    )
  ] });
}
function Xc(n) {
  const { task: e, type: t } = n;
  function r(o) {
    const i = e.segments[o];
    return {
      left: `${i.$x}px`,
      top: "0px",
      width: `${i.$w}px`,
      height: "100%"
    };
  }
  function s(o) {
    if (!e.progress) return 0;
    const i = e.duration * e.progress / 100, l = e.segments;
    let a = 0, c = 0, d = null;
    do {
      const u = l[c];
      c === o && (a > i ? d = 0 : d = Math.min((i - a) / u.duration, 1) * 100), a += u.duration, c++;
    } while (d === null && c < l.length);
    return d || 0;
  }
  return /* @__PURE__ */ g("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, i) => /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-segment wx-bar wx-${t} wx-GKbcLEGA`,
      "data-segment": i,
      style: r(i),
      children: [
        e.progress ? /* @__PURE__ */ g("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ g(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${s(i)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ g("div", { className: "wx-content", children: o.text || "" })
      ]
    },
    i
  )) });
}
function Qc(n) {
  const { readonly: e, taskTemplate: t } = n, r = he(ut), [s, o] = gn(r, "_tasks"), [i, l] = gn(r, "_links"), a = Q(r, "area"), c = Q(r, "_scales"), d = Q(r, "taskTypes"), u = Q(r, "baselines"), h = Q(r, "_selected"), f = Q(r, "_scrollTask"), m = Q(r, "criticalPath"), p = Q(r, "tasks"), x = Q(r, "schedule"), w = Q(r, "splitTasks"), y = Q(r, "summary"), k = _(() => {
    if (!a || !Array.isArray(s)) return [];
    const S = a.start ?? 0, G = a.end ?? 0;
    return s.slice(S, G).map((Z) => ({ ...Z }));
  }, [o, a]), v = _(
    () => c.lengthUnitWidth,
    [c]
  ), N = W(!1), [b, $] = j(void 0), [D, O] = j(null), C = W(null), [I, A] = j(null), L = _(() => I && {
    ...i.find((S) => S.id === I)
  }, [I, l]), [z, F] = j(void 0), M = W(null), [B, V] = j(0), U = W(null), oe = _(() => {
    const S = U.current;
    return !!(h.length && S && S.contains(document.activeElement));
  }, [h, U.current]), T = _(() => oe && h[h.length - 1]?.id, [oe, h]);
  P(() => {
    if (f && oe && f) {
      const { id: S } = f, G = U.current?.querySelector(
        `.wx-bar[data-id='${S}']`
      );
      G && G.focus({ preventScroll: !0 });
    }
  }, [f]), P(() => {
    const S = U.current;
    if (S && (V(S.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const G = new ResizeObserver((Z) => {
        Z[0] && V(Z[0].contentRect.width);
      });
      return G.observe(S), () => G.disconnect();
    }
  }, [U.current]);
  const ee = E(() => {
    document.body.style.userSelect = "none";
  }, []), le = E(() => {
    document.body.style.userSelect = "";
  }, []), se = E(
    (S, G, Z) => {
      if (G.target.classList.contains("wx-line") || (Z || (Z = r.getTask(Et(S))), Z.type === "milestone" || Z.type === "summary")) return "";
      const re = Oe(G, "data-segment");
      re && (S = re);
      const { left: ue, width: Ee } = S.getBoundingClientRect(), Ae = (G.clientX - ue) / Ee;
      let He = 0.2 / (Ee > 200 ? Ee / 200 : 1);
      return Ae < He ? "start" : Ae > 1 - He ? "end" : "";
    },
    [r]
  ), me = E(
    (S, G) => {
      const { clientX: Z } = G, re = Et(S), ue = r.getTask(re), Ee = G.target.classList;
      if (!G.target.closest(".wx-delete-button") && !G.target.closest("[data-interactive]") && !e) {
        if (Ee.contains("wx-progress-marker")) {
          const { progress: Ae } = r.getTask(re);
          C.current = {
            id: re,
            x: Z,
            progress: Ae,
            dx: 0,
            node: S,
            marker: G.target
          }, G.target.classList.add("wx-progress-in-drag");
        } else {
          const Ae = se(S, G, ue) || "move", He = {
            id: re,
            mode: Ae,
            x: Z,
            dx: 0,
            l: ue.$x,
            w: ue.$w
          };
          if (w && ue.segments?.length) {
            const Pe = Oe(G, "data-segment");
            Pe && (He.segmentIndex = Pe.dataset.segment * 1);
          }
          O(He);
        }
        ee();
      }
    },
    [r, e, se, ee, w]
  ), q = E(
    (S) => {
      if (S.button !== 0) return;
      const G = Oe(S);
      G && me(G, S);
    },
    [me]
  ), fe = E(
    (S) => {
      const G = Oe(S);
      G && (M.current = setTimeout(() => {
        F(!0), me(G, S.touches[0]);
      }, 300));
    },
    [me]
  ), ne = E((S) => {
    A(S);
  }, []), ae = E(() => {
    if (C.current) {
      const { dx: S, id: G, marker: Z, value: re } = C.current;
      C.current = null, typeof re < "u" && S && r.exec("update-task", {
        id: G,
        task: { progress: re },
        inProgress: !1
      }), Z.classList.remove("wx-progress-in-drag"), N.current = !0, le();
    } else if (D) {
      const { id: S, mode: G, dx: Z, l: re, w: ue, start: Ee, segment: Ae, index: He } = D;
      if (O(null), Ee) {
        const Pe = Math.round(Z / v);
        if (!Pe)
          r.exec("drag-task", {
            id: S,
            width: ue,
            left: re,
            inProgress: !1,
            ...Ae && { segmentIndex: He }
          });
        else {
          let qe = {}, ot = r.getTask(S);
          Ae && (ot = ot.segments[He]), G === "move" ? (qe.start = ot.start, qe.end = ot.end) : qe[G] = ot[G], r.exec("update-task", {
            id: S,
            diff: Pe,
            task: qe,
            ...Ae && { segmentIndex: He }
          });
        }
        N.current = !0;
      }
      le();
    }
  }, [r, le, D, v]), pe = E(
    (S, G) => {
      const { clientX: Z } = G;
      if (!e)
        if (C.current) {
          const { node: re, x: ue, id: Ee } = C.current, Ae = C.current.dx = Z - ue, He = Math.round(Ae / re.offsetWidth * 100);
          let Pe = C.current.progress + He;
          C.current.value = Pe = Math.min(
            Math.max(0, Pe),
            100
          ), r.exec("update-task", {
            id: Ee,
            task: { progress: Pe },
            inProgress: !0
          });
        } else if (D) {
          ne(null);
          const { mode: re, l: ue, w: Ee, x: Ae, id: He, start: Pe, segment: qe, index: ot } = D, ht = r.getTask(He), Ye = Z - Ae, Jt = Math.round(v) || 1;
          if (!Pe && Math.abs(Ye) < 20 || re === "start" && Ee - Ye < Jt || re === "end" && Ee + Ye < Jt || re === "move" && (Ye < 0 && ue + Ye < 0 || Ye > 0 && ue + Ee + Ye > B) || D.segment)
            return;
          const Wt = { ...D, dx: Ye };
          let St, $t;
          if (re === "start" ? (St = ue + Ye, $t = Ee - Ye) : re === "end" ? (St = ue, $t = Ee + Ye) : re === "move" && (St = ue + Ye, $t = Ee), r.exec("drag-task", {
            id: He,
            width: $t,
            left: St,
            inProgress: !0,
            start: Pe,
            ...qe && { segmentIndex: ot }
          }), !Wt.start && (re === "move" && ht.$x == ue || re !== "move" && ht.$w == Ee)) {
            N.current = !0, ae();
            return;
          }
          Wt.start = !0, O(Wt);
        } else {
          const re = Oe(S);
          if (re) {
            const ue = r.getTask(Et(re)), Ae = Oe(S, "data-segment") || re, He = se(Ae, G, ue);
            Ae.style.cursor = He && !e ? "col-resize" : "pointer";
          }
        }
    },
    [
      r,
      e,
      D,
      v,
      B,
      se,
      ne,
      ae
    ]
  ), xe = E(
    (S) => {
      pe(S, S);
    },
    [pe]
  ), Ke = E(
    (S) => {
      z ? (S.preventDefault(), pe(S, S.touches[0])) : M.current && (clearTimeout(M.current), M.current = null);
    },
    [z, pe]
  ), De = E(() => {
    ae();
  }, [ae]), Se = E(() => {
    F(null), M.current && (clearTimeout(M.current), M.current = null), ae();
  }, [ae]);
  P(() => (window.addEventListener("mouseup", De), () => {
    window.removeEventListener("mouseup", De);
  }), [De]);
  const Me = E(
    (S) => {
      if (!e) {
        if (S.target.closest("[data-interactive]")) return;
        const G = gt(S.target);
        if (G && !S.target.classList.contains("wx-link")) {
          const Z = gt(S.target, "data-segment");
          r.exec("show-editor", {
            id: G,
            ...Z !== null && { segmentIndex: Z }
          });
        }
      }
    },
    [r, e]
  ), ye = ["e2s", "s2s", "e2e", "s2e"], Ne = E((S, G) => ye[(S ? 1 : 0) + (G ? 0 : 2)], []), Ce = E(
    (S, G) => {
      const Z = b.id, re = b.start;
      return S === Z ? !0 : !!i.find((ue) => ue.target == S && ue.source == Z && ue.type === Ne(re, G));
    },
    [b, l, Ne]
  ), J = E(() => {
    b && $(null);
  }, [b]), we = E(
    (S) => {
      if (N.current) {
        N.current = !1;
        return;
      }
      if (S.target.closest("[data-interactive]")) return;
      const G = gt(S.target);
      if (G) {
        const Z = S.target.classList;
        if (Z.contains("wx-link")) {
          const re = Z.contains("wx-left");
          if (!b) {
            $({ id: G, start: re });
            return;
          }
          b.id !== G && !Ce(G, re) && r.exec("add-link", {
            link: {
              source: b.id,
              target: G,
              type: Ne(b.start, re)
            }
          });
        } else if (Z.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: I }), A(null);
        else {
          let re;
          const ue = Oe(S, "data-segment");
          ue && (re = ue.dataset.segment * 1), r.exec("select-task", {
            id: G,
            toggle: S.ctrlKey || S.metaKey,
            range: S.shiftKey,
            segmentIndex: re
          });
        }
      }
      J();
    },
    [
      r,
      b,
      l,
      L,
      Ce,
      Ne,
      J
    ]
  ), $e = E((S) => ({
    left: `${S.$x}px`,
    top: `${S.$y}px`,
    width: `${S.$w}px`,
    height: `${S.$h}px`
  }), []), ce = E((S) => ({
    left: `${S.$x_base}px`,
    top: `${S.$y_base}px`,
    width: `${S.$w_base}px`,
    height: `${S.$h_base}px`
  }), []), _e = E(
    (S) => {
      if (z || M.current)
        return S.preventDefault(), !1;
    },
    [z]
  ), Ue = _(
    () => d.map((S) => S.id),
    [d]
  ), We = E(
    (S) => {
      let G = Ue.includes(S) ? S : "task";
      return ["task", "milestone", "summary"].includes(S) || (G = `task ${G}`), G;
    },
    [Ue]
  ), H = E(
    (S) => {
      r.exec(S.action, S.data);
    },
    [r]
  ), K = E(
    (S) => m && p.byId(S).$critical,
    [m, p]
  ), te = E(
    (S) => {
      if (x?.auto) {
        const G = p.getSummaryId(S, !0), Z = p.getSummaryId(b.id, !0);
        return b?.id && !(Array.isArray(G) ? G : [G]).includes(
          b.id
        ) && !(Array.isArray(Z) ? Z : [Z]).includes(S);
      }
      return b;
    },
    [x, p, b]
  );
  return /* @__PURE__ */ Y(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${k.length ? k[0].$h : 0}px` },
      ref: U,
      onContextMenu: _e,
      onMouseDown: q,
      onMouseMove: xe,
      onTouchStart: fe,
      onTouchMove: Ke,
      onTouchEnd: Se,
      onClick: we,
      onDoubleClick: Me,
      onDragStart: (S) => (S.preventDefault(), !1),
      children: [
        /* @__PURE__ */ g(
          qc,
          {
            onSelectLink: ne,
            selectedLink: L,
            readonly: e
          }
        ),
        k.map((S) => {
          if (S.$skip && S.$skip_baseline) return null;
          const G = `wx-bar wx-${We(S.type)}` + (z && D && S.id === D.id ? " wx-touch" : "") + (b && b.id === S.id ? " wx-selected" : "") + (K(S.id) ? " wx-critical" : "") + (S.$reorder ? " wx-reorder-task" : "") + (w && S.segments ? " wx-split" : ""), Z = "wx-link wx-left" + (b ? " wx-visible" : "") + (!b || !Ce(S.id, !0) && te(S.id) ? " wx-target" : "") + (b && b.id === S.id && b.start ? " wx-selected" : "") + (K(S.id) ? " wx-critical" : ""), re = "wx-link wx-right" + (b ? " wx-visible" : "") + (!b || !Ce(S.id, !1) && te(S.id) ? " wx-target" : "") + (b && b.id === S.id && !b.start ? " wx-selected" : "") + (K(S.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Y(ys, { children: [
            !S.$skip && /* @__PURE__ */ Y(
              "div",
              {
                className: "wx-GKbcLEGA " + G,
                style: $e(S),
                "data-tooltip-id": S.id,
                "data-id": S.id,
                tabIndex: T === S.id ? 0 : -1,
                children: [
                  e ? null : S.id === L?.target && L?.type[2] === "s" ? /* @__PURE__ */ g(
                    lt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + Z, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  S.type !== "milestone" ? /* @__PURE__ */ Y(ve, { children: [
                    S.progress && !(w && S.segments) ? /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${S.progress}%` }
                      }
                    ) }) : null,
                    !e && !(w && S.segments) && !(S.type == "summary" && y?.autoProgress) ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${S.progress}% - 10px)` },
                        children: S.progress
                      }
                    ) : null,
                    t ? /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content", children: /* @__PURE__ */ g(t, { data: S, api: r, onAction: H }) }) : w && S.segments ? /* @__PURE__ */ g(Xc, { task: S, type: We(S.type) }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content", children: S.text || "" })
                  ] }) : /* @__PURE__ */ Y(ve, { children: [
                    /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content" }),
                    t ? /* @__PURE__ */ g(t, { data: S, api: r, onAction: H }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-text-out", children: S.text })
                  ] }),
                  e ? null : S.id === L?.target && L?.type[2] === "e" ? /* @__PURE__ */ g(
                    lt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + re, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            u && !S.$skip_baseline ? /* @__PURE__ */ g(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (S.type === "milestone" ? " wx-milestone" : ""),
                style: ce(S)
              }
            ) : null
          ] }, S.id);
        })
      ]
    }
  );
}
function Zc(n) {
  const { highlightTime: e } = n, t = he(ut), r = Q(t, "_scales");
  return /* @__PURE__ */ g("div", { className: "wx-ZkvhDKir wx-scale", style: { width: r.width }, children: (r?.rows || []).map((s, o) => /* @__PURE__ */ g(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${s.height}px` },
      children: (s.cells || []).map((i, l) => {
        const a = e ? e(i.date, i.unit) : "", c = "wx-cell " + (i.css || "") + " " + (a || "");
        return /* @__PURE__ */ g(
          "div",
          {
            className: "wx-ZkvhDKir " + c,
            style: { width: `${i.width}px` },
            children: i.value
          },
          l
        );
      })
    },
    o
  )) });
}
const Jc = /* @__PURE__ */ new Map();
function ed(n) {
  const e = W(null), t = W(0), r = W(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), t.current++, P(() => {
    if (s)
      return cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        const o = {
          label: n,
          time: performance.now() - e.current,
          renders: t.current,
          timestamp: Date.now()
        };
        Jc.set(n, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function td(n) {
  const {
    readonly: e,
    fullWidth: t,
    fullHeight: r,
    taskTemplate: s,
    cellBorders: o,
    highlightTime: i
  } = n, l = he(ut), [a, c] = gn(l, "_selected"), d = Q(l, "scrollTop"), u = Q(l, "cellHeight"), h = Q(l, "cellWidth"), f = Q(l, "_scales"), m = Q(l, "_markers"), p = Q(l, "_scrollTask"), x = Q(l, "zoom"), [w, y] = j(), k = W(null), v = 1 + (f?.rows?.length || 0), N = _(() => {
    const M = [];
    return a && a.length && u && a.forEach((B) => {
      M.push({ height: `${u}px`, top: `${B.$y - 3}px` });
    }), M;
  }, [c, u]), b = _(
    () => Math.max(w || 0, r),
    [w, r]
  );
  P(() => {
    const M = k.current;
    M && typeof d == "number" && (M.scrollTop = d);
  }, [d]);
  const $ = () => {
    D();
  };
  function D(M) {
    const B = k.current;
    if (!B) return;
    const V = {};
    V.left = B.scrollLeft, l.exec("scroll-chart", V);
  }
  function O() {
    const M = k.current, V = Math.ceil((w || 0) / (u || 1)) + 1, U = Math.floor((M && M.scrollTop || 0) / (u || 1)), oe = Math.max(0, U - v), T = U + V + v, ee = oe * (u || 0);
    l.exec("render-data", {
      start: oe,
      end: T,
      from: ee
    });
  }
  P(() => {
    O();
  }, [w, d]);
  const C = E(
    (M) => {
      if (!M) return;
      const { id: B, mode: V } = M;
      if (V.toString().indexOf("x") < 0) return;
      const U = k.current;
      if (!U) return;
      const { clientWidth: oe } = U, T = l.getTask(B);
      if (T.$x + T.$w < U.scrollLeft)
        l.exec("scroll-chart", { left: T.$x - (h || 0) }), U.scrollLeft = T.$x - (h || 0);
      else if (T.$x >= oe + U.scrollLeft) {
        const ee = oe < T.$w ? h || 0 : T.$w;
        l.exec("scroll-chart", { left: T.$x - oe + ee }), U.scrollLeft = T.$x - oe + ee;
      }
    },
    [l, h]
  );
  P(() => {
    C(p);
  }, [p]);
  function I(M) {
    if (x && (M.ctrlKey || M.metaKey)) {
      M.preventDefault();
      const B = k.current, V = -Math.sign(M.deltaY), U = M.clientX - (B ? B.getBoundingClientRect().left : 0);
      l.exec("zoom-scale", {
        dir: V,
        offset: U
      });
    }
  }
  function A(M) {
    const B = i(M.date, M.unit);
    return B ? {
      css: B,
      width: M.width
    } : null;
  }
  const L = _(() => f && (f.minUnit === "hour" || f.minUnit === "day") && i ? f.rows[f.rows.length - 1].cells.map(A) : null, [f, i]), z = E(
    (M) => {
      M.eventSource = "chart", l.exec("hotkey", M);
    },
    [l]
  );
  P(() => {
    const M = k.current;
    if (!M) return;
    const B = () => y(M.clientHeight);
    B();
    const V = new ResizeObserver(() => B());
    return V.observe(M), () => {
      V.disconnect();
    };
  }, [k.current]);
  const F = W(null);
  return P(() => {
    const M = k.current;
    if (M && !F.current)
      return F.current = kr(M, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (B) => z(B)
      }), () => {
        F.current?.destroy(), F.current = null;
      };
  }, []), P(() => {
    const M = k.current;
    if (!M) return;
    const B = I;
    return M.addEventListener("wheel", B), () => {
      M.removeEventListener("wheel", B);
    };
  }, [I]), ed("chart"), /* @__PURE__ */ Y(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: k,
      onScroll: $,
      children: [
        /* @__PURE__ */ g(Zc, { highlightTime: i, scales: f }),
        m && m.length ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${b}px` },
            children: m.map((M, B) => /* @__PURE__ */ g(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${M.css || ""}`,
                style: { left: `${M.left}px` },
                children: /* @__PURE__ */ g("div", { className: "wx-mR7v2Xag wx-content", children: M.text })
              },
              B
            ))
          }
        ) : null,
        /* @__PURE__ */ Y(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${t}px`, height: `${b}px` },
            children: [
              L ? /* @__PURE__ */ g(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: L.map(
                    (M, B) => M ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + M.css,
                        style: {
                          width: `${M.width}px`,
                          left: `${B * M.width}px`
                        }
                      },
                      B
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ g(Uc, { borders: o }),
              a && a.length ? a.map(
                (M, B) => M.$y ? /* @__PURE__ */ g(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": M.id,
                    style: N[B]
                  },
                  M.id
                ) : null
              ) : null,
              /* @__PURE__ */ g(Qc, { readonly: e, taskTemplate: s })
            ]
          }
        )
      ]
    }
  );
}
function nd(n) {
  const {
    position: e = "after",
    size: t = 4,
    dir: r = "x",
    onMove: s,
    onDisplayChange: o,
    compactMode: i,
    containerWidth: l = 0,
    leftThreshold: a = 50,
    rightThreshold: c = 50
  } = n, [d, u] = Te(n.value ?? 0), [h, f] = Te(n.display ?? "all");
  function m(V) {
    let U = 0;
    e == "center" ? U = t / 2 : e == "before" && (U = t);
    const oe = {
      size: [t + "px", "auto"],
      p: [V - U + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let T in oe) oe[T] = oe[T].reverse();
    return oe;
  }
  const [p, x] = j(!1), [w, y] = j(null), k = W(0), v = W(), N = W(), b = W(h);
  P(() => {
    b.current = h;
  }, [h]), P(() => {
    w === null && d > 0 && y(d);
  }, [w, d]);
  function $(V) {
    return r == "x" ? V.clientX : V.clientY;
  }
  const D = E(
    (V) => {
      const U = v.current + $(V) - k.current;
      u(U);
      let oe;
      U <= a ? oe = "chart" : l - U <= c ? oe = "grid" : oe = "all", b.current !== oe && (f(oe), b.current = oe), N.current && clearTimeout(N.current), N.current = setTimeout(() => s && s(U), 100);
    },
    [l, a, c, s]
  ), O = E(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", x(!1), window.removeEventListener("mousemove", D), window.removeEventListener("mouseup", O);
  }, [D]), C = _(
    () => h !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [h, r]
  ), I = E(
    (V) => {
      !i && (h === "grid" || h === "chart") || (k.current = $(V), v.current = d, x(!0), document.body.style.cursor = C, document.body.style.userSelect = "none", window.addEventListener("mousemove", D), window.addEventListener("mouseup", O));
    },
    [C, D, O, d, i, h]
  );
  function A() {
    f("all"), w !== null && (u(w), s && s(w));
  }
  function L(V) {
    if (i) {
      const U = h === "chart" ? "grid" : "chart";
      f(U), o(U);
    } else if (h === "grid" || h === "chart")
      A(), o("all");
    else {
      const U = V === "left" ? "chart" : "grid";
      f(U), o(U);
    }
  }
  function z() {
    L("left");
  }
  function F() {
    L("right");
  }
  const M = _(() => m(d), [d, e, t, r]), B = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${h}`,
    p ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Y(
    "div",
    {
      className: "wx-pFykzMlT " + B,
      onMouseDown: I,
      style: { width: M.size[0], height: M.size[1], cursor: C },
      children: [
        /* @__PURE__ */ Y("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ g(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: z
            }
          ) }),
          /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ g(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: F
            }
          ) })
        ] }),
        /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const rd = 650;
function Io(n) {
  let e;
  function t() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= rd;
          n(i);
        }
    }), e.observe(document.body);
  }
  function r() {
    e && (e.disconnect(), e = null);
  }
  return {
    observe: t,
    disconnect: r
  };
}
function sd(n) {
  const {
    taskTemplate: e,
    readonly: t,
    cellBorders: r,
    highlightTime: s,
    onTableAPIChange: o
  } = n, i = he(ut), l = Q(i, "_tasks"), a = Q(i, "_scales"), c = Q(i, "cellHeight"), d = Q(i, "columns"), u = Q(i, "_scrollTask"), h = Q(i, "undo"), [f, m] = j(!1);
  let [p, x] = j(0);
  const [w, y] = j(0), [k, v] = j(0), [N, b] = j(void 0), [$, D] = j("all"), O = W(null), C = E(
    (q) => {
      m((fe) => (q !== fe && (q ? (O.current = $, $ === "all" && D("grid")) : (!O.current || O.current === "all") && D("all")), q));
    },
    [$]
  );
  P(() => {
    const q = Io(C);
    return q.observe(), () => {
      q.disconnect();
    };
  }, [C]);
  const I = _(() => {
    let q;
    return d.every((fe) => fe.width && !fe.flexgrow) ? q = d.reduce((fe, ne) => fe + parseInt(ne.width), 0) : f && $ === "chart" ? q = parseInt(d.find((fe) => fe.id === "action")?.width) || 50 : q = 440, p = q, q;
  }, [d, f, $]);
  P(() => {
    x(I);
  }, [I]);
  const A = _(
    () => (w ?? 0) - (N ?? 0),
    [w, N]
  ), L = _(() => a.width, [a]), z = _(
    () => l.length * c,
    [l, c]
  ), F = _(
    () => a.height + z + A,
    [a, z, A]
  ), M = _(
    () => p + L,
    [p, L]
  ), B = W(null), V = E(() => {
    Promise.resolve().then(() => {
      if ((w ?? 0) > (M ?? 0)) {
        const q = (w ?? 0) - p;
        i.exec("expand-scale", { minWidth: q });
      }
    });
  }, [w, M, p, i]);
  P(() => {
    let q;
    return B.current && (q = new ResizeObserver(V), q.observe(B.current)), () => {
      q && q.disconnect();
    };
  }, [B.current, V]), P(() => {
    V();
  }, [L]);
  const U = W(null), oe = W(null), T = E(() => {
    const q = U.current;
    q && i.exec("scroll-chart", {
      top: q.scrollTop
    });
  }, [i]), ee = W({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  P(() => {
    ee.current = {
      rTasks: l,
      rScales: a,
      rCellHeight: c,
      scrollSize: A,
      ganttDiv: U.current,
      ganttHeight: k ?? 0
    };
  }, [l, a, c, A, k]);
  const le = E(
    (q) => {
      if (!q) return;
      const {
        rTasks: fe,
        rScales: ne,
        rCellHeight: ae,
        scrollSize: pe,
        ganttDiv: xe,
        ganttHeight: Ke
      } = ee.current;
      if (!xe) return;
      const { id: De } = q, Se = fe.findIndex((Me) => Me.id === De);
      if (Se > -1) {
        const Me = Ke - ne.height, ye = Se * ae, Ne = xe.scrollTop;
        let Ce = null;
        ye < Ne ? Ce = ye : ye + ae > Ne + Me && (Ce = ye - Me + ae + pe), Ce !== null && (i.exec("scroll-chart", { top: Math.max(Ce, 0) }), U.current.scrollTop = Math.max(Ce, 0));
      }
    },
    [i]
  );
  P(() => {
    le(u);
  }, [u]), P(() => {
    const q = U.current, fe = oe.current;
    if (!q || !fe) return;
    const ne = () => {
      Oo(() => {
        v(q.offsetHeight), y(q.offsetWidth), b(fe.offsetWidth);
      });
    }, ae = new ResizeObserver(ne);
    return ae.observe(q), () => ae.disconnect();
  }, [U.current]);
  const se = W(null), me = W(null);
  return P(() => {
    me.current && (me.current.destroy(), me.current = null);
    const q = se.current;
    if (q)
      return me.current = kr(q, {
        keys: {
          "ctrl+c": !0,
          "ctrl+v": !0,
          "ctrl+x": !0,
          "ctrl+d": !0,
          backspace: !0,
          "ctrl+z": h,
          "ctrl+y": h
        },
        exec: (fe) => {
          fe.isInput || i.exec("hotkey", fe);
        }
      }), () => {
        me.current?.destroy(), me.current = null;
      };
  }, [h]), /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-gantt", ref: U, onScroll: T, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: F, width: "100%" },
      ref: oe,
      children: /* @__PURE__ */ g(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: k,
            width: N
          },
          children: /* @__PURE__ */ Y("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: se, children: [
            d.length ? /* @__PURE__ */ Y(ve, { children: [
              /* @__PURE__ */ g(
                Yc,
                {
                  display: $,
                  compactMode: f,
                  columnWidth: I,
                  width: p,
                  readonly: t,
                  fullHeight: z,
                  onTableAPIChange: o
                }
              ),
              /* @__PURE__ */ g(
                nd,
                {
                  value: p,
                  display: $,
                  compactMode: f,
                  containerWidth: w,
                  onMove: (q) => x(q),
                  onDisplayChange: (q) => D(q)
                }
              )
            ] }) : null,
            /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-content", ref: B, children: /* @__PURE__ */ g(
              td,
              {
                readonly: t,
                fullWidth: L,
                fullHeight: z,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function od(n) {
  return {
    year: "%Y",
    quarter: `${n("Q")} %Q`,
    month: "%M",
    week: `${n("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function id(n, e) {
  return typeof n == "function" ? n : it(n, e);
}
function Ao(n, e) {
  return n.map(({ format: t, ...r }) => ({
    ...r,
    format: id(t, e)
  }));
}
function ld(n, e) {
  const t = od(e);
  for (let r in t)
    t[r] = it(t[r], n);
  return t;
}
function ad(n, e) {
  if (!n || !n.length) return n;
  const t = it("%d-%m-%Y", e);
  return n.map((r) => r.template ? r : r.id === "start" || r.id == "end" ? {
    ...r,
    //store locale template for unscheduled tasks
    _template: (s) => t(s),
    template: (s) => t(s)
  } : r.id === "duration" ? {
    ...r,
    _template: (s) => s,
    template: (s) => s
  } : r);
}
function cd(n, e) {
  return n.levels ? {
    ...n,
    levels: n.levels.map((t) => ({
      ...t,
      scales: Ao(t.scales, e)
    }))
  } : n;
}
const dd = (n) => n.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), ud = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], hd = vt(function({
  taskTemplate: e = null,
  markers: t = [],
  taskTypes: r = Dn,
  tasks: s = [],
  selected: o = [],
  activeTask: i = null,
  links: l = [],
  scales: a = ud,
  columns: c = co,
  start: d = null,
  end: u = null,
  lengthUnit: h = "day",
  durationUnit: f = "day",
  cellWidth: m = 100,
  cellHeight: p = 38,
  scaleHeight: x = 36,
  readonly: w = !1,
  cellBorders: y = "full",
  zoom: k = !1,
  baselines: v = !1,
  highlightTime: N = null,
  init: b = null,
  autoScale: $ = !0,
  unscheduledTasks: D = !1,
  criticalPath: O = null,
  schedule: C = { type: "forward" },
  projectStart: I = null,
  projectEnd: A = null,
  calendar: L = null,
  undo: z = !1,
  splitTasks: F = !1,
  summary: M = null,
  _export: B = !1,
  ...V
}, U) {
  const oe = W();
  oe.current = V;
  const T = _(() => new ta(_s), []), ee = _(() => ({ ...Ut, ...Cn }), []), le = he(Ve.i18n), se = _(() => le ? le.extend(ee, !0) : bt(ee), [le, ee]), me = _(() => se.getRaw().calendar, [se]), q = _(() => {
    let ye = {
      zoom: cd(k, me),
      scales: Ao(a, me),
      columns: ad(c, me),
      links: lo(l),
      cellWidth: m
    };
    return ye.zoom && (ye = {
      ...ye,
      ...Pl(
        ye.zoom,
        ld(me, se.getGroup("gantt")),
        ye.scales,
        m
      )
    }), ye;
  }, [k, a, c, l, m, me, se]), fe = W(null);
  fe.current !== s && (B || tr(s, { durationUnit: f, calendar: L }), fe.current = s), P(() => {
    B || tr(s, { durationUnit: f, calendar: L });
  }, [s, f, L, F, B]);
  const ne = _(() => T.in, [T]), ae = W(null);
  ae.current === null && (ae.current = new Rs((ye, Ne) => {
    const Ce = "on" + dd(ye);
    oe.current && oe.current[Ce] && oe.current[Ce](Ne);
  }), ne.setNext(ae.current));
  const [pe, xe] = j(null), Ke = W(null);
  Ke.current = pe;
  const De = _(
    () => ({
      getState: T.getState.bind(T),
      getReactiveState: T.getReactive.bind(T),
      getStores: () => ({ data: T }),
      exec: ne.exec,
      setNext: (ye) => (ae.current = ae.current.setNext(ye), ae.current),
      intercept: ne.intercept.bind(ne),
      on: ne.on.bind(ne),
      detach: ne.detach.bind(ne),
      getTask: T.getTask.bind(T),
      serialize: () => T.serialize(),
      getTable: (ye) => ye ? new Promise((Ne) => setTimeout(() => Ne(Ke.current), 1)) : Ke.current,
      getHistory: () => T.getHistory()
    }),
    [T, ne]
  );
  kt(
    U,
    () => ({
      ...De
    }),
    [De]
  );
  const Se = W(0);
  P(() => {
    Se.current ? T.init({
      tasks: s,
      links: q.links,
      start: d,
      columns: q.columns,
      end: u,
      lengthUnit: h,
      cellWidth: q.cellWidth,
      cellHeight: p,
      scaleHeight: x,
      scales: q.scales,
      taskTypes: r,
      zoom: q.zoom,
      selected: o,
      activeTask: i,
      baselines: v,
      autoScale: $,
      unscheduledTasks: D,
      markers: t,
      durationUnit: f,
      criticalPath: O,
      schedule: C,
      projectStart: I,
      projectEnd: A,
      calendar: L,
      undo: z,
      _weekStart: me.weekStart,
      splitTasks: F,
      summary: M
    }) : b && b(De), Se.current++;
  }, [
    De,
    b,
    s,
    q,
    d,
    u,
    h,
    p,
    x,
    r,
    o,
    i,
    v,
    $,
    D,
    t,
    f,
    O,
    C,
    I,
    A,
    L,
    z,
    me,
    F,
    M,
    T
  ]), Se.current === 0 && T.init({
    tasks: s,
    links: q.links,
    start: d,
    columns: q.columns,
    end: u,
    lengthUnit: h,
    cellWidth: q.cellWidth,
    cellHeight: p,
    scaleHeight: x,
    scales: q.scales,
    taskTypes: r,
    zoom: q.zoom,
    selected: o,
    activeTask: i,
    baselines: v,
    autoScale: $,
    unscheduledTasks: D,
    markers: t,
    durationUnit: f,
    criticalPath: O,
    schedule: C,
    projectStart: I,
    projectEnd: A,
    calendar: L,
    undo: z,
    _weekStart: me.weekStart,
    splitTasks: F,
    summary: M
  });
  const Me = _(() => L ? (ye, Ne) => Ne == "day" && !L.getDayHours(ye) || Ne == "hour" && !L.getDayHours(ye) ? "wx-weekend" : "" : N, [L, N]);
  return /* @__PURE__ */ g(Ve.i18n.Provider, { value: se, children: /* @__PURE__ */ g(ut.Provider, { value: De, children: /* @__PURE__ */ g(
    sd,
    {
      taskTemplate: e,
      readonly: w,
      cellBorders: y,
      highlightTime: Me,
      onTableAPIChange: xe
    }
  ) }) });
});
function fd({ api: n = null, items: e = [] }) {
  const t = he(Ve.i18n), r = _(() => t || bt(Cn), [t]), s = _(() => r.getGroup("gantt"), [r]), o = rt(n, "_selected"), i = rt(n, "undo"), l = rt(n, "history"), a = rt(n, "splitTasks"), c = ["undo", "redo"], d = _(() => {
    const h = rr();
    return (e.length ? e : rr()).map((m) => {
      let p = { ...m, disabled: !1 };
      return p.handler = yr(h, p.id) ? (x) => Tt(n, x.id, null, s) : p.handler, p.text && (p.text = s(p.text)), p.menuText && (p.menuText = s(p.menuText)), p;
    });
  }, [e, n, s, i, a]), u = _(() => {
    const h = [];
    return d.forEach((f) => {
      const m = f.id;
      if (m === "add-task")
        h.push(f);
      else if (c.includes(m))
        c.includes(m) && h.push({
          ...f,
          disabled: f.isDisabled(l)
        });
      else {
        if (!o?.length || !n) return;
        h.push({
          ...f,
          disabled: f.isDisabled && o.some((p) => f.isDisabled(p, n.getState()))
        });
      }
    }), h.filter((f, m) => {
      if (n && f.isHidden)
        return !o.some((p) => f.isHidden(p, n.getState()));
      if (f.comp === "separator") {
        const p = h[m + 1];
        if (!p || p.comp === "separator") return !1;
      }
      return !0;
    });
  }, [n, o, l, d]);
  return t ? /* @__PURE__ */ g(or, { items: u }) : /* @__PURE__ */ g(Ve.i18n.Provider, { value: r, children: /* @__PURE__ */ g(or, { items: u }) });
}
const pd = vt(function({
  options: e = [],
  api: t = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: i,
  onClick: l,
  css: a
}, c) {
  const d = W(null), u = W(null), h = he(Ve.i18n), f = _(() => h || bt({ ...Cn, ...Ut }), [h]), m = _(() => f.getGroup("gantt"), [f]), p = rt(t, "taskTypes"), x = rt(t, "selected"), w = rt(t, "_selected"), y = rt(t, "splitTasks"), k = rt(t, "summary"), v = _(
    () => ({
      splitTasks: y,
      taskTypes: p,
      summary: k
    }),
    [y, p, k]
  ), N = _(() => nr(v), [v]);
  P(() => {
    t && (t.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), t.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [t]);
  function b(F) {
    return F.map((M) => (M = { ...M }, M.text && (M.text = m(M.text)), M.subtext && (M.subtext = m(M.subtext)), M.data && (M.data = b(M.data)), M));
  }
  function $() {
    const F = e.length ? e : nr(v);
    return b(F);
  }
  const D = _(() => $(), [t, e, v, m]), O = _(
    () => w && w.length ? w : [],
    [w]
  ), C = E(
    (F, M) => {
      let B = F ? t?.getTask(F) : null;
      if (r) {
        const V = r(F, M);
        B = V === !0 ? B : V;
      }
      if (B) {
        const V = gt(M.target, "data-segment");
        V !== null ? u.current = { id: B.id, segmentIndex: V } : u.current = B.id, (!Array.isArray(x) || !x.includes(B.id)) && t && t.exec && t.exec("select-task", { id: B.id });
      }
      return B;
    },
    [t, r, x]
  ), I = E(
    (F) => {
      const M = F.action;
      M && (yr(N, M.id) && Tt(t, M.id, u.current, m), l && l(F));
    },
    [t, m, l, N]
  ), A = E(
    (F, M) => {
      const B = O.length ? O : M ? [M] : [];
      let V = s ? B.every((U) => s(F, U)) : !0;
      if (V && (F.isHidden && (V = !B.some(
        (U) => F.isHidden(U, t.getState(), u.current)
      )), F.isDisabled)) {
        const U = B.some(
          (oe) => F.isDisabled(oe, t.getState(), u.current)
        );
        F.disabled = U;
      }
      return V;
    },
    [s, O, t]
  );
  kt(c, () => ({
    show: (F, M) => {
      d.current && d.current.show && d.current.show(F, M);
    }
  }));
  const L = E((F) => {
    d.current && d.current.show && d.current.show(F);
  }, []), z = /* @__PURE__ */ Y(ve, { children: [
    /* @__PURE__ */ g(
      Co,
      {
        filter: A,
        options: D,
        dataKey: "id",
        resolver: C,
        onClick: I,
        at: o,
        ref: d,
        css: a
      }
    ),
    /* @__PURE__ */ g("span", { onContextMenu: L, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!h && Ve.i18n?.Provider) {
    const F = Ve.i18n.Provider;
    return /* @__PURE__ */ g(F, { value: f, children: z });
  }
  return z;
}), lr = {};
function ms(n) {
  return typeof n < "u" ? lr[n] || n : lr.text;
}
function Je(n, e) {
  lr[n] = e;
}
const gd = {
  editor: {}
};
function Vn(n) {
  const {
    editors: e,
    data: t,
    css: r = "",
    errors: s,
    focus: o = !1,
    onClick: i,
    children: l,
    onChange: a
  } = n, c = W(null);
  P(() => {
    if (o) {
      const f = document.activeElement;
      if (f && c.current && c.current.contains(f)) return;
      const m = c.current ? c.current.querySelector(
        "input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
      ) : null;
      m && setTimeout(() => {
        typeof m.select == "function" && m.select(), typeof m.focus == "function" && m.focus();
      }, 300);
    }
  }, []);
  const d = he(Ve.i18n), u = _(() => d.getGroup("editor"), [d]), h = _(
    () => e.config[0].comp === "readonly" && e.config.every((f) => !Object.keys(t).includes(f.key)),
    [e, t]
  );
  return /* @__PURE__ */ Y("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    l,
    h ? /* @__PURE__ */ g("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((f) => {
      if (!f.hidden) {
        const { key: m, onChange: p, ...x } = f;
        if (f.comp === "readonly" || f.comp === "section") {
          const w = ms(f.comp);
          return /* @__PURE__ */ g(
            w,
            {
              fieldKey: m,
              label: f.label,
              value: t[m],
              ...x,
              onClick: i
            },
            m
          );
        } else {
          const w = ms(f.comp);
          return /* @__PURE__ */ Y("div", { children: [
            /* @__PURE__ */ g(
              jt,
              {
                label: f.labelTemplate ? f.labelTemplate(t[m]) : f.label ?? "",
                required: f.required,
                children: /* @__PURE__ */ g(
                  w,
                  {
                    fieldKey: m,
                    ...x,
                    onChange: p || ((y) => {
                      a && a({
                        value: y.value,
                        key: m,
                        input: y.input
                      });
                    }),
                    label: void 0,
                    error: s && s[m],
                    value: t[m]
                  },
                  m
                )
              }
            ),
            s && s[m] && f.validationMessage ? /* @__PURE__ */ g("div", { className: "wx-s2aE1xdZ wx-message", children: f.validationMessage }) : null
          ] }, m);
        }
      }
      return null;
    })
  ] });
}
function md(n) {
  if (typeof n == "string" && n.includes(".")) {
    const e = n.split(".");
    return (t) => {
      let r = t;
      return e.forEach((s) => {
        r = r[s];
      }), r;
    };
  }
  return (e) => e[n];
}
function wd(n) {
  if (typeof n == "string" && n.includes(".")) {
    const e = n.split(".");
    return (t, r) => {
      let s = t;
      e.forEach((o, i) => {
        i === e.length - 1 ? s[o] = r : s = s[o];
      });
    };
  }
  return (e, t) => e[n] = t;
}
function xd(n) {
  const e = n.map((i) => {
    const l = { ...i };
    return i.config && Object.assign(l, i.config), l.key = i.key || Oi(), l.setter = i.setter || wd(i.key), l.getter = i.getter || md(i.key), l;
  }), t = (i) => {
    const l = {};
    return e.forEach((a) => {
      a.comp !== "section" && (a.getter ? l[a.key] = a.getter(i) : l[a.key] = i[a.key]);
    }), l;
  }, r = (i, l, a) => ((a.length ? a.map((c) => e.find((d) => d.key === c)) : e).forEach((c) => {
    c.setter ? c.setter(i, l[c.key]) : i[c.key] = l[c.key];
  }), i), s = (i, l) => {
    const a = t(i), c = [];
    return e.forEach((d) => {
      const u = a[d.key], h = l[d.key];
      !Nn(u, h) && (u !== void 0 || h) && c.push(d.key);
    }), c;
  }, o = (i, l, a) => {
    let c = 0;
    const d = {};
    return (l?.length ? l.map((u) => e.find((h) => h.key === u)) : e).forEach((u) => {
      u.required && !i[u.key] ? (d[u.key] = {
        errorType: "required"
      }, u.validationMessage = u.validationMessage ?? a("This field is required"), c++) : u.validation && !u.validation(i[u.key]) && (d[u.key] = {
        errorType: "validation"
      }, u.validationMessage = u.validationMessage ?? a("Invalid value"), c++);
    }), c > 0 ? d : null;
  };
  return {
    config: e.filter((i) => i.comp !== "hidden"),
    getValues: t,
    setValues: r,
    diff: s,
    validateValues: o
  };
}
function yd({
  values: n,
  items: e,
  css: t,
  activeBatch: r,
  autoSave: s,
  focus: o,
  readonly: i,
  topBar: l = !0,
  bottomBar: a = !0,
  layout: c = "default",
  placement: d = "inline",
  view: u,
  children: h,
  onChange: f,
  onSave: m,
  onAction: p,
  onValidation: x,
  hotkeys: w
}) {
  const y = he(Ve.i18n).getGroup("editor"), [k, v] = Te(n), [N, b] = j(null), $ = _(() => {
    const T = xd(e);
    N && T.config.forEach((se) => {
      se.comp === "section" && se.key === N && (se.sectionMode === "accordion" ? se.activeSection || (T.config.forEach((me) => {
        me.comp === "section" && me.key !== se.key && (me.activeSection = !1);
      }), se.activeSection = !0) : se.activeSection = !se.activeSection);
    });
    let ee = /* @__PURE__ */ new Set(), le = null;
    return T.config.forEach((se) => {
      se.sectionMode === "exclusive" && se.activeSection && (le = se.key), se.activeSection && ee.add(se.key);
    }), T.config.forEach((se) => {
      se.hidden = se.hidden || r && r !== se.batch || le && se.key != le && se.section !== le || se.section && !ee.has(se.section);
    }), i ? {
      ...T,
      config: T.config.map((se) => ({ ...se, comp: "readonly" })),
      diff: () => []
    } : T;
  }, [e, N, r, i]), [D, O] = j({}), [C, I] = j({}), A = k;
  P(() => {
    k !== void 0 && (O(mn(k)), I(mn(k)), A.errors && (A.errors = M()));
  }, [k]);
  const [L, z] = j([]);
  P(() => {
    k && z([]);
  }, [k]);
  function F(T) {
    return [...new Set(T)];
  }
  function M(T) {
    const ee = $.validateValues(D, T, y);
    return Nn(ee, A.errors) || x && x({ errors: ee, values: D }), ee;
  }
  function B(T, ee) {
    if (s && !A.errors) {
      const le = $.setValues(k, ee ?? C, T);
      v(le), m && m({ changes: T, values: le });
    } else
      z(T);
  }
  function V({ value: T, key: ee, input: le }) {
    let se = { ...C || {}, [ee]: T };
    const me = {
      key: ee,
      value: T,
      update: se
    };
    if (le && (me.input = le), f && f(me), !k) return;
    se = me.update, I(se);
    const q = $.diff(k, se), fe = $.setValues(
      { ...D || {} },
      se,
      F([...q, ee])
    );
    if (O(fe), q.length) {
      const ne = s ? [] : F([...q, ...Object.keys(A.errors ?? {}), ee]);
      A.errors = M(ne), B(q, se);
    } else {
      const ne = Object.keys(A.errors ?? {});
      ne.length && (A.errors = M(ne)), z([]);
    }
  }
  function U() {
    if (L.length && (s || (A.errors = M()), !A.errors)) {
      m && m({
        changes: L,
        values: D
      });
      const T = $.setValues(k, C, L);
      v(T), z([]), v({ ...D });
    }
  }
  function oe({ item: T }) {
    T.id === "save" ? U() : T.id === "toggle-section" && b(T.key), p && p({ item: T, values: D, changes: L });
  }
  return /* @__PURE__ */ g(
    u,
    {
      topBar: l,
      bottomBar: a,
      placement: d,
      layout: c,
      readonly: i,
      autoSave: s,
      css: t,
      data: C,
      editors: $,
      focus: o,
      hotkeys: w,
      errors: A.errors,
      onClick: oe,
      onKeyDown: oe,
      onChange: V,
      children: h
    }
  );
}
function vd(n) {
  const { editors: e, data: t, layout: r, errors: s, focus: o, onClick: i, onChange: l } = n, a = _(() => {
    let c = [];
    if (r === "columns" && (c = [
      { ...e, config: [] },
      { ...e, config: [] }
    ], e.config.forEach((d) => {
      const u = d.column === "left" ? 0 : 1;
      c[u].config.push(d);
    }), c[0].config.length)) {
      const d = c[0].config[0];
      d.comp === "text" && (c[0][0] = {
        ...d,
        css: "title",
        label: ""
      });
    }
    return c;
  }, [r, e]);
  return r === "columns" ? /* @__PURE__ */ Y("div", { className: "wx-bNrSbszs wx-cols", children: [
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-left", children: /* @__PURE__ */ g(
      Vn,
      {
        editors: a[0],
        data: t,
        errors: s,
        onClick: i,
        onChange: l
      }
    ) }),
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ g(
      Vn,
      {
        editors: a[1],
        data: t,
        focus: o,
        errors: s,
        onClick: i,
        onChange: l
      }
    ) })
  ] }) : /* @__PURE__ */ g(
    Vn,
    {
      editors: e,
      data: t,
      focus: o,
      errors: s,
      onClick: i,
      onChange: l
    }
  );
}
function ws({
  items: n,
  values: e = null,
  top: t = !0,
  onClick: r,
  onChange: s
}) {
  const o = E(
    ({ item: i, value: l }) => {
      s && s({ key: i.key, value: l });
    },
    [s]
  );
  return n.length ? /* @__PURE__ */ g(
    "div",
    {
      className: `wx-66OW1j0R wx-editor-toolbar ${t ? "wx-topbar" : "wx-bottom"}`,
      children: /* @__PURE__ */ g(
        or,
        {
          items: n,
          values: e,
          onClick: r,
          onChange: o
        }
      )
    }
  ) : null;
}
const Pt = () => ({ comp: "spacer" }), Gn = (n) => ({
  comp: "button",
  text: n("Cancel"),
  id: "cancel"
}), jn = (n) => ({
  type: "primary",
  comp: "button",
  text: n("Save"),
  id: "save"
}), xs = () => ({
  comp: "icon",
  icon: "wxi-close",
  id: "close"
});
function Bn(n) {
  const {
    data: e,
    editors: t,
    focus: r,
    css: s,
    topBar: o,
    bottomBar: i,
    layout: l,
    placement: a,
    errors: c,
    readonly: d,
    autoSave: u,
    children: h,
    onClick: f,
    onKeyDown: m,
    onChange: p,
    hotkeys: x
  } = n, w = he(Ve.i18n), y = _(() => w.getGroup("editor"), [w]), k = _(
    () => o === !0 && i === !0,
    [o, i]
  ), v = _(() => {
    let C = o && o.items ? o.items.map((I) => ({ ...I })) : [];
    return k && (d ? C = [Pt(), xs()] : (u ? C = [Pt(), xs()] : a !== "modal" && (C = [Pt(), Gn(y), jn(y)]), l === "columns" && !C.length && (C = [Pt(), jn(y), Gn(y)]))), C;
  }, [o, k, d, u, a, l, y]), N = _(() => {
    let C = i && i.items ? i.items.map((I) => ({ ...I })) : [];
    return k && (d || (a === "modal" && !u && (C = [Pt(), jn(y), Gn(y)]), l === "columns" && v.length && (C = []))), C;
  }, [i, k, d, a, u, l, v, y]), b = _(() => [...v, ...N], [v, N]), $ = W(null), D = W(null);
  D.current = (C, ...I) => {
    const A = b.findIndex((F) => I.includes(F.id));
    if (A === -1) return !1;
    const L = C.target, z = b[A];
    C.key == "Escape" && (L.closest(".wx-combo") || L.closest(".wx-multicombo") || L.closest(".wx-richselect")) || C.key == "Delete" && (L.tagName === "INPUT" || L.tagName === "TEXTAREA") || (C.preventDefault(), m && m({ item: z }));
  };
  const O = _(() => x === !1 ? {} : {
    "ctrl+s": (C) => D.current(C, "save"),
    escape: (C) => D.current(C, "cancel", "close"),
    "ctrl+d": (C) => D.current(C, "delete"),
    ...x || {}
  }, [x]);
  return ni(O, $), /* @__PURE__ */ Y("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: $, children: [
    /* @__PURE__ */ g(
      ws,
      {
        ...o && typeof o == "object" ? o : {},
        items: v,
        values: e,
        onClick: f,
        onChange: p
      }
    ),
    /* @__PURE__ */ Y(
      "div",
      {
        className: `wx-85HDaNoA wx-content${l === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          h,
          /* @__PURE__ */ g(
            vd,
            {
              editors: t,
              layout: l,
              data: e,
              focus: r,
              errors: c,
              onClick: f,
              onChange: p
            }
          ),
          /* @__PURE__ */ g(
            ws,
            {
              ...i && typeof i == "object" ? i : {},
              items: N,
              values: e,
              top: !1,
              onClick: f,
              onChange: p
            }
          )
        ]
      }
    )
  ] });
}
function kd(n) {
  const { css: e, onClick: t, placement: r, ...s } = n;
  function o() {
    t && t({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ g(Hi, { children: /* @__PURE__ */ g(
    Bn,
    {
      css: `wx-panel ${e}`,
      onClick: t,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ g(Li, { onCancel: o, children: /* @__PURE__ */ g(
    Bn,
    {
      css: `wx-panel ${e}`,
      onClick: t,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ g(
    Bn,
    {
      css: `wx-inline-form ${e}`,
      onClick: t,
      placement: r,
      ...s
    }
  );
}
function bd(n) {
  const {
    values: e = {},
    items: t = [],
    css: r = "",
    activeBatch: s = null,
    topBar: o = !0,
    bottomBar: i = !0,
    focus: l = !1,
    autoSave: a = !1,
    layout: c = "default",
    readonly: d = !1,
    placement: u = "inline",
    children: h,
    ...f
  } = n, m = Object.keys(f).reduce((p, x) => {
    if (/^on[a-z]/.test(x)) {
      const w = "on" + x.charAt(2).toUpperCase() + x.slice(3);
      w in f ? p[x] = f[x] : p[w] = f[x];
    } else
      p[x] = f[x];
    return p;
  }, {});
  return /* @__PURE__ */ g(_n, { words: gd, optional: !0, children: /* @__PURE__ */ g(
    yd,
    {
      view: kd,
      values: e,
      items: t,
      css: r,
      activeBatch: s,
      topBar: o,
      bottomBar: i,
      focus: l,
      autoSave: a,
      layout: c,
      readonly: d,
      placement: u,
      ...m,
      children: h
    }
  ) });
}
function Sd({ value: n, options: e, label: t }) {
  const r = he(Ve.i18n).getGroup("editor"), s = _(() => {
    let o = n;
    if (typeof n == "boolean" && (o = r(n ? "Yes" : "No")), e) {
      const i = e.find((l) => l.id === n);
      i && (o = i.label);
    }
    return o;
  }, [n, e, r]);
  return s || s === 0 ? /* @__PURE__ */ g(jt, { label: t, children: s }) : null;
}
function $d({ fieldKey: n, label: e, activeSection: t, onClick: r }) {
  return /* @__PURE__ */ Y(
    "div",
    {
      className: `wx-OmgQq65I wx-section${t ? " wx-section-active" : ""}`,
      onClick: () => r && r({
        item: { id: "toggle-section", key: t ? null : n }
      }),
      children: [
        /* @__PURE__ */ g("h3", { children: e }),
        /* @__PURE__ */ g(
          "i",
          {
            className: `wx-OmgQq65I wxi-angle-${t ? "down" : "right"} wx-icon`
          }
        )
      ]
    }
  );
}
Je("text", Qt);
Je("textarea", ci);
Je("checkbox", di);
Je("readonly", Sd);
Je("section", $d);
ar(Be);
function _d({ api: n, autoSave: e, onLinksChange: t }) {
  const s = he(Ve.i18n).getGroup("gantt"), o = Q(n, "activeTask"), i = Q(n, "_activeTask"), l = Q(n, "_links"), a = Q(n, "schedule"), c = Q(n, "unscheduledTasks"), [d, u] = j();
  function h() {
    if (o) {
      const x = l.filter((y) => y.target == o).map((y) => ({ link: y, task: n.getTask(y.source) })), w = l.filter((y) => y.source == o).map((y) => ({ link: y, task: n.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: x },
        { title: s("Successors"), data: w }
      ];
    }
  }
  P(() => {
    u(h());
  }, [o, l]);
  const f = _(
    () => [
      { id: "e2s", label: s("End-to-start") },
      { id: "s2s", label: s("Start-to-start") },
      { id: "e2e", label: s("End-to-end") },
      { id: "s2e", label: s("Start-to-end") }
    ],
    [s]
  );
  function m(x) {
    e ? n.exec("delete-link", { id: x }) : (u(
      (w) => (w || []).map((y) => ({
        ...y,
        data: y.data.filter((k) => k.link.id !== x)
      }))
    ), t && t({
      id: x,
      action: "delete-link",
      data: { id: x }
    }));
  }
  function p(x, w) {
    e ? n.exec("update-link", {
      id: x,
      link: w
    }) : (u(
      (y) => (y || []).map((k) => ({
        ...k,
        data: k.data.map(
          (v) => v.link.id === x ? { ...v, link: { ...v.link, ...w } } : v
        )
      }))
    ), t && t({
      id: x,
      action: "update-link",
      data: {
        id: x,
        link: w
      }
    }));
  }
  return /* @__PURE__ */ g(ve, { children: (d || []).map(
    (x, w) => x.data.length ? /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ g(Ve.fieldId.Provider, { value: null, children: /* @__PURE__ */ g(jt, { label: x.title, position: "top", children: /* @__PURE__ */ g("table", { children: /* @__PURE__ */ g("tbody", { children: x.data.map((y) => /* @__PURE__ */ Y("tr", { children: [
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      a?.auto && y.link.type === "e2s" ? /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ g(
        Qt,
        {
          type: "number",
          placeholder: s("Lag"),
          value: y.link.lag,
          disabled: c && i?.unscheduled,
          onChange: (k) => {
            k.input || p(y.link.id, { lag: k.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ g(
        hi,
        {
          value: y.link.type,
          placeholder: s("Select link type"),
          options: f,
          onChange: (k) => p(y.link.id, { type: k.value }),
          children: ({ option: k }) => k.label
        }
      ) }) }),
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => m(y.link.id),
          role: "button"
        }
      ) })
    ] }, y.link.id)) }) }) }) }) }, w) : null
  ) });
}
function Cd(n) {
  const { value: e, time: t, format: r, onchange: s, onChange: o, ...i } = n, l = o ?? s;
  function a(c) {
    const d = new Date(c.value);
    d.setHours(e.getHours()), d.setMinutes(e.getMinutes()), l && l({ value: d });
  }
  return /* @__PURE__ */ Y("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ g(
      Ti,
      {
        ...i,
        value: e,
        onChange: a,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    t ? /* @__PURE__ */ g(Ai, { value: e, onChange: l, format: r }) : null
  ] });
}
Je("select", Ts);
Je("date", Cd);
Je("twostate", Ds);
Je("slider", Un);
Je("counter", Di);
Je("links", _d);
function Nd({
  api: n,
  items: e = [],
  css: t = "",
  layout: r = "default",
  readonly: s = !1,
  placement: o = "sidebar",
  bottomBar: i = !0,
  topBar: l = !0,
  autoSave: a = !0,
  focus: c = !1,
  hotkeys: d = {}
}) {
  const u = he(Ve.i18n), h = _(() => u || bt({ ...Cn, ...Ut }), [u]), f = _(() => h.getGroup("gantt"), [h]), m = h.getRaw(), p = _(() => {
    const J = m.gantt?.dateFormat || m.formats?.dateFormat;
    return it(J, m.calendar);
  }, [m]), x = _(() => {
    if (l === !0 && !s) {
      const J = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: f("Delete"),
          id: "delete"
        }
      ];
      return a ? { items: J } : {
        items: [
          ...J,
          {
            comp: "button",
            type: "primary",
            text: f("Save"),
            id: "save"
          }
        ]
      };
    }
    return l;
  }, [l, s, a, f]), [w, y] = j(!1), k = _(
    () => w ? "wx-full-screen" : "",
    [w]
  ), v = E((J) => {
    y(J);
  }, []);
  P(() => {
    const J = Io(v);
    return J.observe(), () => {
      J.disconnect();
    };
  }, [v]);
  const N = Q(n, "_activeTask"), b = Q(n, "activeTask"), $ = Q(n, "unscheduledTasks"), D = Q(n, "summary"), O = Q(n, "links"), C = Q(n, "splitTasks"), I = _(
    () => C && b?.segmentIndex,
    [C, b]
  ), A = _(
    () => I || I === 0,
    [I]
  ), L = Q(n, "taskTypes"), z = _(
    () => go({ taskTypes: L }),
    [$, D, L]
  ), F = Q(n, "undo"), [M, B] = j({}), [V, U] = j(null), [oe, T] = j(), [ee, le] = j(null), se = _(() => {
    if (!N) return null;
    let J;
    if (A && N.segments ? J = { ...N.segments[I] } : J = { ...N }, s) {
      let we = { parent: J.parent };
      return z.forEach(({ key: $e, comp: ce }) => {
        if (ce !== "links") {
          const _e = J[$e];
          ce === "date" && _e instanceof Date ? we[$e] = p(_e) : ce === "slider" && $e === "progress" ? we[$e] = `${_e}%` : we[$e] = _e;
        }
      }), we;
    }
    return J || null;
  }, [N, A, I, s, z, p]);
  P(() => {
    T(se);
  }, [se]), P(() => {
    B({}), le(null), U(null);
  }, [b]);
  function me(J, we) {
    return J.map(($e) => {
      const ce = { ...$e };
      if ($e.config && (ce.config = { ...ce.config }), ce.comp === "links" && n && (ce.api = n, ce.autoSave = a, ce.onLinksChange = ne), ce.comp === "select" && ce.key === "type") {
        const _e = ce.options ?? [];
        ce.options = _e.map((Ue) => ({
          ...Ue,
          label: f(Ue.label)
        }));
      }
      return ce.comp === "slider" && ce.key === "progress" && (ce.labelTemplate = (_e) => `${f(ce.label)} ${_e}%`), ce.label && (ce.label = f(ce.label)), ce.config?.placeholder && (ce.config.placeholder = f(ce.config.placeholder)), we && (ce.isDisabled && ce.isDisabled(we, n.getState()) ? ce.disabled = !0 : delete ce.disabled), ce;
    });
  }
  const q = _(() => {
    let J = e.length ? e : z;
    return J = me(J, oe), oe ? J.filter(
      (we) => !we.isHidden || !we.isHidden(oe, n.getState())
    ) : J;
  }, [e, z, oe, f, n, a]), fe = _(
    () => q.map((J) => J.key),
    [q]
  );
  function ne({ id: J, action: we, data: $e }) {
    B((ce) => ({
      ...ce,
      [J]: { action: we, data: $e }
    }));
  }
  const ae = E(() => {
    for (let J in M)
      if (O.byId(J)) {
        const { action: we, data: $e } = M[J];
        n.exec(we, $e);
      }
  }, [n, M, O]), pe = E(() => {
    const J = b?.id || b;
    if (A) {
      if (N?.segments) {
        const we = N.segments.filter(
          ($e, ce) => ce !== I
        );
        n.exec("update-task", {
          id: J,
          task: { segments: we }
        });
      }
    } else
      n.exec("delete-task", { id: J });
  }, [n, b, A, N, I]), xe = E(() => {
    n.exec("show-editor", { id: null });
  }, [n]), Ke = E(
    (J) => {
      const { item: we, changes: $e } = J;
      we.id === "delete" && pe(), we.id === "save" && ($e.length ? xe() : ae()), we.comp && xe();
    },
    [n, b, a, ae, pe, xe]
  ), De = E(
    (J, we, $e) => ($ && J.type === "summary" && (J.unscheduled = !1), ho(J, n.getState(), we), $e || U(!1), J),
    [$, n]
  ), Se = E(
    (J) => {
      J = {
        ...J,
        unscheduled: $ && J.unscheduled && J.type !== "summary"
      }, delete J.links, delete J.data, (fe.indexOf("duration") === -1 || J.segments && !J.duration) && delete J.duration;
      const we = {
        id: b?.id || b,
        task: J,
        ...A && { segmentIndex: I }
      };
      a && V && (we.inProgress = V), n.exec("update-task", we), a || ae();
    },
    [
      n,
      b,
      $,
      a,
      ae,
      fe,
      A,
      I,
      V
    ]
  ), Me = E(
    (J) => {
      let { update: we, key: $e, input: ce } = J;
      if (ce && U(!0), J.update = De({ ...we }, $e, ce), !a) T(J.update);
      else if (!ee && !ce) {
        const _e = q.find((H) => H.key === $e), Ue = we[$e];
        (!_e.validation || _e.validation(Ue)) && (!_e.required || Ue) && Se(J.update);
      }
    },
    [a, De, ee, q, Se]
  ), ye = E(
    (J) => {
      a || Se(J.values);
    },
    [a, Se]
  ), Ne = E((J) => {
    le(J.errors);
  }, []), Ce = _(
    () => F ? {
      "ctrl+z": (J) => {
        J.preventDefault(), n.exec("undo");
      },
      "ctrl+y": (J) => {
        J.preventDefault(), n.exec("redo");
      }
    } : {},
    [F, n]
  );
  return se ? /* @__PURE__ */ g(_n, { children: /* @__PURE__ */ g(
    bd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${k} ${t}`,
      items: q,
      values: se,
      topBar: x,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: a,
      focus: c,
      onAction: Ke,
      onSave: ye,
      onValidation: Ne,
      onChange: Me,
      hotkeys: d && { ...Ce, ...d }
    }
  ) }) : null;
}
const Td = ({ children: n, columns: e = null, api: t }) => {
  const [r, s] = j(null);
  return P(() => {
    t && t.getTable(!0).then(s);
  }, [t]), /* @__PURE__ */ g(Bc, { api: r, columns: e, children: n });
};
function Dd(n) {
  const { api: e, content: t, children: r } = n, s = W(null), o = W(null), [i, l] = j({}), [a, c] = j(null), [d, u] = j({});
  function h(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const N = v.getAttribute("data-tooltip-id"), b = v.getAttribute("data-tooltip-at"), $ = v.getAttribute("data-tooltip");
        if (N || $) return { id: N, tooltip: $, target: v, at: b };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  P(() => {
    const v = o.current;
    if (v && d && (d.text || t)) {
      const N = v.getBoundingClientRect();
      let b = !1, $ = d.left, D = d.top;
      N.right >= i.right && ($ = i.width - N.width - 5, b = !0), N.bottom >= i.bottom && (D = d.top - (N.bottom - i.bottom + 2), b = !0), b && u((O) => O && { ...O, left: $, top: D });
    }
  }, [d, i, t]);
  const f = W(null), m = 300, p = (v) => {
    clearTimeout(f.current), f.current = setTimeout(() => {
      v();
    }, m);
  };
  function x(v) {
    let { id: N, tooltip: b, target: $, at: D } = h(v.target);
    if (u(null), c(null), !b)
      if (N)
        b = y(N);
      else {
        clearTimeout(f.current);
        return;
      }
    const O = v.clientX;
    p(() => {
      N && c(w(k(N)));
      const C = $.getBoundingClientRect(), I = s.current, A = I ? I.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let L, z;
      D === "left" ? (L = C.top + 5 - A.top, z = C.right + 5 - A.left) : (L = C.top + C.height - A.top, z = O - A.left), l(A), u({ top: L, left: z, text: b });
    });
  }
  function w(v) {
    return e?.getTask(k(v)) || null;
  }
  function y(v) {
    return w(v)?.text || "";
  }
  function k(v) {
    const N = parseInt(v);
    return isNaN(N) ? v : N;
  }
  return /* @__PURE__ */ Y(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: s,
      onMouseMove: x,
      children: [
        d && (d.text || t) ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: o,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            children: t ? /* @__PURE__ */ g(t, { data: a }) : d.text ? /* @__PURE__ */ g("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: d.text }) : null
          }
        ) : null,
        r
      ]
    }
  );
}
function Md({ fonts: n = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Vr, { fonts: n, children: e() }) : /* @__PURE__ */ g(Vr, { fonts: n });
}
function Ed({ fonts: n = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Gr, { fonts: n, children: e }) : /* @__PURE__ */ g(Gr, { fonts: n });
}
function Rd({ fonts: n = !0, children: e }) {
  return e ? /* @__PURE__ */ g(jr, { fonts: n, children: e }) : /* @__PURE__ */ g(jr, { fonts: n });
}
const Id = "2.5.2", Ad = {
  version: Id
}, Hd = Ad.version, Ud = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: pd,
  Editor: Nd,
  Gantt: hd,
  HeaderMenu: Td,
  Material: Md,
  Toolbar: fd,
  Tooltip: Dd,
  Willow: Ed,
  WillowDark: Rd,
  defaultColumns: co,
  defaultEditorItems: mo,
  defaultMenuOptions: fo,
  defaultTaskTypes: Dn,
  defaultToolbarButtons: po,
  getEditorItems: go,
  getMenuOptions: nr,
  getToolbarButtons: rr,
  registerEditorItem: Je,
  registerScaleUnit: zl,
  version: Hd
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ud as default
};
