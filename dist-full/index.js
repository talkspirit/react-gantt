import { jsx as p, jsxs as ee, Fragment as Ue } from 'react/jsx-runtime';
import ai, {
  useState as J,
  useEffect as j,
  useRef as Y,
  createContext as rn,
  useContext as Ie,
  useMemo as $,
  useCallback as R,
  forwardRef as Ut,
  useImperativeHandle as Gt,
  Fragment as fn,
} from 'react';
import { createPortal as li, flushSync as ci } from 'react-dom';
function st(n, e = 'data-id') {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
function vr(n, e = 'data-id') {
  const t = st(n, e);
  return t ? t.getAttribute(e) : null;
}
function _t(n, e = 'data-id') {
  const t = st(n, e);
  return t ? sn(t.getAttribute(e)) : null;
}
function sn(n) {
  if (typeof n == 'string') {
    const e = n * 1;
    if (!isNaN(e)) return e;
  }
  return n;
}
function ui() {
  return {
    detect: () => !0,
    addEvent: function (n, e, t) {
      return n.addEventListener(e, t), () => n.removeEventListener(e, t);
    },
    addGlobalEvent: function (n, e) {
      return (
        document.addEventListener(n, e),
        () => document.removeEventListener(n, e)
      );
    },
    getTopNode: function () {
      return window.document.body;
    },
  };
}
var lt = ui();
function Lr(n) {
  Object.assign(lt, n);
}
function Zr(n, e, t) {
  function r(s) {
    const o = st(s);
    if (!o) return;
    const i = sn(o.dataset.id);
    if (typeof e == 'function') return e(i, s);
    let a,
      l = s.target;
    for (; l != o; ) {
      if (((a = l.dataset ? l.dataset.action : null), a && e[a])) {
        e[a](i, s);
        return;
      }
      l = l.parentNode;
    }
    e[t] && e[t](i, s);
  }
  lt.addEvent(n, t, r);
}
function Gs(n, e) {
  Zr(n, e, 'click'), e.dblclick && Zr(n, e.dblclick, 'dblclick');
}
function di(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    if (n[t] === e) {
      n.splice(t, 1);
      break;
    }
}
var js = /* @__PURE__ */ new Date(),
  zn = !1,
  Nn = [],
  Ft = [],
  Jr = (n) => {
    if (zn) {
      zn = !1;
      return;
    }
    for (let e = Ft.length - 1; e >= 0; e--) {
      const { node: t, date: r, props: s } = Ft[e];
      if (
        !(r > js) &&
        !t.contains(n.target) &&
        t !== n.target &&
        (s.callback && s.callback(n), s.modal || n.defaultPrevented)
      )
        break;
    }
  },
  fi = (n) => {
    (js = /* @__PURE__ */ new Date()), (zn = !0);
    for (let e = Ft.length - 1; e >= 0; e--) {
      const { node: t } = Ft[e];
      if (!t.contains(n.target) && t !== n.target) {
        zn = !1;
        break;
      }
    }
  };
function xn(n, e) {
  Nn.length ||
    (Nn = [
      lt.addGlobalEvent('click', Jr, n),
      lt.addGlobalEvent('contextmenu', Jr, n),
      lt.addGlobalEvent('mousedown', fi, n),
    ]),
    typeof e != 'object' && (e = { callback: e });
  const t = { node: n, date: /* @__PURE__ */ new Date(), props: e };
  return (
    Ft.push(t),
    {
      destroy() {
        di(Ft, t), Ft.length || (Nn.forEach((r) => r()), (Nn = []));
      },
    }
  );
}
var Mn = (n) => n.indexOf('bottom') !== -1,
  Tn = (n) => n.indexOf('left') !== -1,
  Dn = (n) => n.indexOf('right') !== -1,
  or = (n) => n.indexOf('top') !== -1,
  es = (n) => n.indexOf('fit') !== -1,
  En = (n) => n.indexOf('overlap') !== -1,
  hi = (n) => n.split('-').every((e) => ['center', 'fit'].indexOf(e) > -1),
  gi = (n) => {
    const e = n.match(/(start|center|end)/);
    return e ? e[0] : null;
  };
function pi(n, e) {
  let t = 0;
  const r = lt.getTopNode(n);
  for (; n && n !== r; ) {
    const s = getComputedStyle(n).position;
    if (
      ((s === 'absolute' || s === 'relative' || s === 'fixed') &&
        (t = parseInt(getComputedStyle(n).zIndex) || 0),
      (n = n.parentNode),
      n === e)
    )
      break;
  }
  return t;
}
var nt, it, cn, rt;
function mi(n, e, t = 'bottom', r = 0, s = 0) {
  if (!n) return null;
  (nt = r), (it = s), (cn = 'auto');
  let o = 0,
    i = 0;
  const a = wi(n),
    l = En(t) ? lt.getTopNode(n) : a;
  if (!a) return null;
  const c = a.getBoundingClientRect(),
    u = n.getBoundingClientRect(),
    d = l.getBoundingClientRect(),
    f = window.getComputedStyle(l),
    g = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    };
  for (const b in g) {
    const v = `border-${b}-width`;
    g[b] = parseFloat(f.getPropertyValue(v));
  }
  if (e) {
    const b = pi(e, a);
    o = Math.max(b + 1, 20);
  }
  if (e) {
    if (
      ((rt = e.getBoundingClientRect()),
      es(t) && (cn = rt.width + 'px'),
      t !== 'point')
    )
      if (hi(t))
        es(t) ? (nt = 0) : ((nt = d.width / 2), (i = 1)),
          (it = (d.height - u.height) / 2);
      else {
        const b = En(t) ? 0 : 1;
        (nt = Dn(t) ? rt.right + b : rt.left - b),
          (it = Mn(t) ? rt.bottom + 1 : rt.top);
        const v = gi(t);
        v &&
          (Dn(t) || Tn(t)
            ? v === 'center'
              ? (it -= (u.height - rt.height) / 2)
              : v === 'end' && (it -= u.height - rt.height)
            : (Mn(t) || or(t)) &&
              (v === 'center'
                ? (nt -= (u.width - rt.width) / 2)
                : v === 'end' && (nt -= u.width - rt.width),
              En(t) || (nt += 1)));
      }
  } else rt = { left: r, right: r, top: s, bottom: s };
  const m = (Tn(t) || Dn(t)) && (Mn(t) || or(t));
  Tn(t) && (i = 2);
  const h = nt - u.width - d.left;
  e && Tn(t) && !m && h < 0 && ((nt = rt.right), (i = 0));
  const x = nt + u.width * (1 - i / 2) - d.right;
  if (x > 0)
    if (!Dn(t)) nt = d.right - g.right - u.width;
    else {
      const b = rt.left - d.x - u.width;
      e && !En(t) && !m && b >= 0
        ? (nt = rt.left - u.width)
        : (nt -= x + g.right);
    }
  i && (nt = Math.round(nt - (u.width * i) / 2));
  const w = h < 0 || x > 0 || !m;
  or(t) && ((it = rt.top - u.height), e && it < d.y && w && (it = rt.bottom));
  const y = it + u.height - d.bottom;
  return (
    y > 0 &&
      (e && Mn(t) && w
        ? (it -= u.height + rt.height + 1)
        : (it -= y + g.bottom)),
    (nt -= c.left + g.left),
    (it -= c.top + g.top),
    (nt = Math.max(nt, 0) + l.scrollLeft),
    (it = Math.max(it, 0) + l.scrollTop),
    (cn = cn || 'auto'),
    { x: nt, y: it, z: o, width: cn }
  );
}
function wi(n) {
  const e = lt.getTopNode(n);
  for (n && (n = n.parentElement); n; ) {
    const t = getComputedStyle(n).position;
    if (n === e || t === 'relative' || t === 'absolute' || t === 'fixed')
      return n;
    n = n.parentNode;
  }
  return null;
}
var ts = /* @__PURE__ */ new Date().valueOf();
function jn() {
  return (ts += 1), ts;
}
var xi = class {
    constructor() {
      this.store = /* @__PURE__ */ new Map();
    }
    configure(n, e) {
      this.node = e;
      for (const t in n)
        if (n[t]) {
          const r = t.toLowerCase().replace(/[ ]/g, ''),
            s = n[t];
          this.store.set(r, s);
        }
    }
  },
  Jt = [],
  ns = {
    subscribe: (n) => {
      yi();
      const e = new xi();
      return (
        Jt.push(e),
        n(e),
        () => {
          const t = Jt.findIndex((r) => r === e);
          t >= 0 && Jt.splice(t, 1);
        }
      );
    },
  },
  rs = !1;
function yi() {
  rs ||
    ((rs = !0),
    document.addEventListener('keydown', (n) => {
      if (
        Jt.length &&
        (n.ctrlKey ||
          n.altKey ||
          n.metaKey ||
          n.shiftKey ||
          n.key.length > 1 ||
          n.key === ' ')
      ) {
        const e = [];
        n.ctrlKey && e.push('ctrl'),
          n.altKey && e.push('alt'),
          n.metaKey && e.push('meta'),
          n.shiftKey && e.push('shift');
        let t = n.code.replace('Key', '').toLocaleLowerCase();
        n.key === ' ' && (t = 'space'), e.push(t);
        const r = e.join('+');
        for (let s = Jt.length - 1; s >= 0; s--) {
          const o = Jt[s],
            i = o.store.get(r) || o.store.get(t);
          i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
        }
      }
    }));
}
function at(n) {
  return n < 10 ? '0' + n : n.toString();
}
function vi(n) {
  const e = at(n);
  return e.length == 2 ? '0' + e : e;
}
function Ks(n) {
  const e = Math.floor(n / 11) * 11;
  return {
    start: e,
    end: e + 11,
  };
}
function ss(n, e = 1) {
  let t = n.getDay();
  t === 0 && (t = 7), (t = (t - e + 7) % 7);
  const r = new Date(n.valueOf());
  r.setDate(n.getDate() + (3 - t));
  const s = r.getFullYear(),
    o = Math.floor((r.getTime() - new Date(s, 0, 1).getTime()) / 864e5);
  return 1 + Math.floor(o / 7);
}
var os = ['', ''];
function ki(n, e, t) {
  switch (n) {
    case '%d':
      return at(e.getDate());
    case '%m':
      return at(e.getMonth() + 1);
    case '%j':
      return e.getDate();
    case '%n':
      return e.getMonth() + 1;
    case '%y':
      return at(e.getFullYear() % 100);
    case '%Y':
      return e.getFullYear();
    case '%D':
      return t.dayShort[e.getDay()];
    case '%l':
      return t.dayFull[e.getDay()];
    case '%M':
      return t.monthShort[e.getMonth()];
    case '%F':
      return t.monthFull[e.getMonth()];
    case '%h':
      return at(((e.getHours() + 11) % 12) + 1);
    case '%g':
      return ((e.getHours() + 11) % 12) + 1;
    case '%G':
      return e.getHours();
    case '%H':
      return at(e.getHours());
    case '%i':
      return at(e.getMinutes());
    case '%a':
      return ((e.getHours() > 11 ? t.pm : t.am) || os)[0];
    case '%A':
      return ((e.getHours() > 11 ? t.pm : t.am) || os)[1];
    case '%s':
      return at(e.getSeconds());
    case '%S':
      return vi(e.getMilliseconds());
    case '%W':
      return at(ss(e));
    case '%w':
      return at(ss(e, t.weekStart ?? 1));
    case '%c': {
      let r = e.getFullYear() + '';
      return (
        (r += '-' + at(e.getMonth() + 1)),
        (r += '-' + at(e.getDate())),
        (r += 'T'),
        (r += at(e.getHours())),
        (r += ':' + at(e.getMinutes())),
        (r += ':' + at(e.getSeconds())),
        r
      );
    }
    case '%Q':
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return n;
  }
}
var bi = /%[a-zA-Z]/g;
function Nt(n, e) {
  return typeof n == 'function'
    ? n
    : function (t) {
        return t
          ? (t.getMonth || (t = new Date(t)), n.replace(bi, (r) => ki(r, t, e)))
          : '';
      };
}
function is(n) {
  return n && typeof n == 'object' && !Array.isArray(n);
}
function kr(n, e) {
  for (const t in e) {
    const r = e[t];
    is(n[t]) && is(r) ? (n[t] = kr({ ...n[t] }, e[t])) : (n[t] = e[t]);
  }
  return n;
}
function jt(n) {
  return {
    getGroup(e) {
      const t = n[e];
      return (r) => (t && t[r]) || r;
    },
    getRaw() {
      return n;
    },
    extend(e, t) {
      if (!e) return this;
      let r;
      return t ? (r = kr({ ...e }, n)) : (r = kr({ ...n }, e)), jt(r);
    },
  };
}
function Ke(n) {
  const [e, t] = J(n),
    r = Y(n);
  return (
    j(() => {
      if (r.current !== n) {
        if (
          Array.isArray(r.current) &&
          Array.isArray(n) &&
          r.current.length === 0 &&
          n.length === 0
        )
          return;
        (r.current = n), t(n);
      }
    }, [n]),
    [e, t]
  );
}
function Si(n, e, t) {
  const [r, s] = J(() => e);
  return (
    n || console.warn(`Writable ${t} is not defined`),
    j(
      () =>
        n
          ? n.subscribe((i) => {
              s(() => i);
            })
          : void 0,
      [n],
    ),
    r
  );
}
function ce(n, e) {
  const t = n.getState(),
    r = n.getReactiveState();
  return Si(r[e], t[e], e);
}
function bt(n, e) {
  const [t, r] = J(() => null);
  return (
    j(() => {
      if (!n) return;
      const s = n.getReactiveState(),
        o = s ? s[e] : null;
      return o ? o.subscribe((a) => r(() => a)) : void 0;
    }, [n, e]),
    t
  );
}
function $i(n, e) {
  const t = Y(e);
  t.current = e;
  const [r, s] = J(1);
  return (
    j(
      () =>
        n.subscribe((i) => {
          (t.current = i), s((a) => a + 1);
        }),
      [n],
    ),
    [t.current, r]
  );
}
function tn(n, e) {
  const t = n.getState(),
    r = n.getReactiveState();
  return $i(r[e], t[e]);
}
function Ci(n, e) {
  j(() => {
    const t = e.current;
    if (t)
      return ns.subscribe((r) => {
        r.configure(n, t);
      });
  }, [ns, e]);
}
function Xs(n, e) {
  return typeof n == 'function' ? (typeof e == 'object' ? n(e) : n()) : n;
}
function qs(n) {
  const e = {};
  return (
    n.split(';').forEach((t) => {
      const [r, s] = t.split(':');
      if (s) {
        let o = r.trim();
        o.indexOf('-') &&
          (o = o.replace(/-([a-z])/g, (i, a) => a.toUpperCase())),
          (e[o] = s.trim());
      }
    }),
    e
  );
}
function Qs(n) {
  let e = n,
    t = [];
  return {
    subscribe: (a) => {
      t.push(a), a(e);
    },
    unsubscribe: (a) => {
      t = t.filter((l) => l !== a);
    },
    set: (a) => {
      (e = a), t.forEach((l) => l(e));
    },
    update: (a) => {
      (e = a(e)), t.forEach((l) => l(e));
    },
  };
}
function as(n, e, t) {
  function r(s) {
    const o = st(s);
    if (!o) return;
    const i = sn(o.dataset.id);
    if (typeof e == 'function') return e(i, s);
    let a,
      l = s.target;
    for (; l != o; ) {
      if (((a = l.dataset ? l.dataset.action : null), a && e[a])) {
        e[a](i, s);
        return;
      }
      l = l.parentNode;
    }
    e[t] && e[t](i, s);
  }
  return lt.addEvent(n, t, r);
}
function _i(n, e) {
  const t = [as(n, e, 'click')];
  return (
    e.dblclick && t.push(as(n, e.dblclick, 'dblclick')),
    () => {
      t.forEach((r) => r());
    }
  );
}
const Ni = 'en-US',
  Mi = {
    monthFull: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayFull: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    hours: 'Hours',
    minutes: 'Minutes',
    done: 'Done',
    clear: 'Clear',
    today: 'Today',
    am: ['am', 'AM'],
    pm: ['pm', 'PM'],
    weekStart: 0,
    clockFormat: 24,
  },
  Ti = {
    ok: 'OK',
    cancel: 'Cancel',
    select: 'Select',
    'No data': 'No data',
    'Rows per page': 'Rows per page',
    'Total pages': 'Total pages',
  },
  Di = {
    timeFormat: '%H:%i',
    dateFormat: '%m/%d/%Y',
    monthYearFormat: '%F %Y',
    yearFormat: '%Y',
  },
  yn = {
    core: Ti,
    calendar: Mi,
    formats: Di,
    lang: Ni,
  },
  vn = rn('willow'),
  Ei = rn({}),
  gt = rn(null),
  Pr = rn(null),
  ot = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        fieldId: Pr,
        helpers: Ei,
        i18n: gt,
        theme: vn,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
function on(n) {
  const e = Ie(Pr),
    [t] = J(() => n || (e && e()) || jn());
  return t;
}
function Ri({
  value: n = '',
  id: e,
  placeholder: t = '',
  title: r = '',
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: a,
}) {
  const l = on(e),
    [c, u] = Ke(n),
    d = R(
      (m) => {
        const h = m.target.value;
        u(h), a && a({ value: h, input: !0 });
      },
      [a],
    ),
    f = R(
      (m) => {
        const h = m.target.value;
        u(h), a && a({ value: h });
      },
      [a],
    ),
    g = Y(null);
  return (
    j(() => {
      const m = f,
        h = g.current;
      return (
        h.addEventListener('change', m),
        () => {
          h && h.removeEventListener('change', m);
        }
      );
    }, [f]),
    /* @__PURE__ */ p('textarea', {
      className: `wx-3yFVAC wx-textarea ${o ? 'wx-error' : ''}`,
      id: l,
      disabled: s,
      placeholder: t,
      readOnly: i,
      title: r,
      value: c,
      onInput: d,
      ref: g,
    })
  );
}
function Mt({
  type: n = '',
  css: e = '',
  icon: t = '',
  disabled: r = !1,
  title: s = '',
  text: o = '',
  children: i,
  onClick: a,
}) {
  const l = $(() => {
      let u = n
        ? n
            .split(' ')
            .filter((d) => d !== '')
            .map((d) => 'wx-' + d)
            .join(' ')
        : '';
      return e + (e ? ' ' : '') + u;
    }, [n, e]),
    c = (u) => {
      a && a(u);
    };
  return /* @__PURE__ */ ee('button', {
    title: s,
    className: `wx-2ZWgb4 wx-button ${l} ${t && !i ? 'wx-icon' : ''}`,
    disabled: r,
    onClick: c,
    children: [
      t && /* @__PURE__ */ p('i', { className: 'wx-2ZWgb4 ' + t }),
      i || o || ' ',
    ],
  });
}
function Ii({
  id: n,
  label: e = '',
  inputValue: t = '',
  value: r = !1,
  onChange: s,
  disabled: o = !1,
}) {
  const i = on(n),
    [a, l] = Ke(r);
  return /* @__PURE__ */ ee('div', {
    className: 'wx-2IvefP wx-checkbox',
    children: [
      /* @__PURE__ */ p('input', {
        type: 'checkbox',
        id: i,
        disabled: o,
        className: 'wx-2IvefP wx-check',
        checked: a,
        value: t,
        onChange: ({ target: c }) => {
          const u = c.checked;
          l(u), s && s({ value: u, inputValue: t });
        },
      }),
      /* @__PURE__ */ ee('label', {
        htmlFor: i,
        className: 'wx-2IvefP wx-label',
        children: [
          /* @__PURE__ */ p('span', { className: 'wx-2IvefP wx-before' }),
          e &&
            /* @__PURE__ */ p('span', {
              className: 'wx-2IvefP wx-after',
              children: e,
            }),
        ],
      }),
    ],
  });
}
function an({
  position: n = 'bottom',
  align: e = 'start',
  autoFit: t = !0,
  onCancel: r,
  width: s = '100%',
  children: o,
}) {
  const i = Y(null),
    [a, l] = Ke(n),
    [c, u] = Ke(e);
  return (
    j(() => {
      if (t) {
        const d = i.current;
        if (d) {
          const f = d.getBoundingClientRect(),
            g = lt.getTopNode(d).getBoundingClientRect();
          f.right >= g.right && u('end'), f.bottom >= g.bottom && l('top');
        }
      }
    }, [t]),
    j(() => {
      if (i.current) {
        const d = (f) => {
          r && r(f);
        };
        return xn(i.current, d).destroy;
      }
    }, [r]),
    /* @__PURE__ */ p('div', {
      ref: i,
      className: `wx-32GZ52 wx-dropdown wx-${a}-${c}`,
      style: { width: s },
      children: o,
    })
  );
}
function kn() {
  return jt(yn);
}
function Hi() {
  let n = null,
    e = !1,
    t,
    r,
    s,
    o;
  const i = (u, d, f, g) => {
      (t = u), (r = d), (s = f), (o = g);
    },
    a = (u) => {
      (n = u), (e = n !== null), s(n);
    },
    l = (u, d) => {
      if (u !== null && t) {
        const f = t.querySelectorAll('.wx-list > .wx-item')[u];
        f && (f.scrollIntoView({ block: 'nearest' }), d && d.preventDefault());
      }
    },
    c = (u, d) => {
      const f = u === null ? null : Math.max(0, Math.min(n + u, r.length - 1));
      f !== n && (a(f), t ? l(f, d) : requestAnimationFrame(() => l(f, d)));
    };
  return {
    move: (u) => {
      const d = _t(u),
        f = r.findIndex((g) => g.id == d);
      f !== n && a(f);
    },
    keydown: (u, d) => {
      switch (u.code) {
        case 'Enter':
          e ? o() : a(0);
          break;
        case 'Space':
          e || a(0);
          break;
        case 'Escape':
          s((n = null));
          break;
        case 'Tab':
          s((n = null));
          break;
        case 'ArrowDown':
          c(e ? 1 : d || 0, u);
          break;
        case 'ArrowUp':
          c(e ? -1 : d || 0, u);
          break;
      }
    },
    init: i,
    navigate: c,
  };
}
function Kn({ items: n = [], children: e, onSelect: t, onReady: r }) {
  const s = Y(),
    o = Y(Hi()),
    [i, a] = J(null),
    l = Y(i),
    c = (Ie(gt) || kn()).getGroup('core'),
    u = (f) => {
      f && f.stopPropagation(), t && t({ id: n[l.current]?.id });
    };
  j(() => {
    o.current.init(
      s.current,
      n,
      (f) => {
        a(f), (l.current = f);
      },
      u,
    );
  }, [n, s.current]),
    j(() => {
      r && r(o.current);
    }, []);
  const d = R(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null
    ? null
    : /* @__PURE__ */ p(an, {
        onCancel: d,
        children: /* @__PURE__ */ p('div', {
          className: 'wx-233fr7 wx-list',
          ref: s,
          onClick: u,
          onMouseMove: o.current.move,
          children: n.length
            ? n.map((f, g) =>
                /* @__PURE__ */ p(
                  'div',
                  {
                    className: `wx-233fr7 wx-item ${g === i ? 'wx-focus' : ''}`,
                    'data-id': f.id,
                    children: e ? Xs(e, { option: f }) : f.label,
                  },
                  f.id,
                ),
              )
            : /* @__PURE__ */ p('div', {
                className: 'wx-233fr7 wx-no-data',
                children: c('No data'),
              }),
        }),
      });
}
function Ai({
  value: n = '',
  id: e,
  options: t = [],
  textOptions: r = null,
  textField: s = 'label',
  placeholder: o = '',
  title: i = '',
  disabled: a = !1,
  error: l = !1,
  clear: c = !1,
  children: u,
  onChange: d,
}) {
  const f = on(e),
    g = Y(null),
    m = Y(null),
    [h, x] = Ke(n),
    [w, y] = J(!1),
    [b, v] = J(''),
    M = Y(null),
    S = Y(!1),
    _ = $(() => {
      if (w) return b;
      if (h || h === 0) {
        const H = (r || t).find((z) => z.id === h);
        if (H) return H[s];
      }
      return '';
    }, [w, b, h, r, t, s]),
    T = $(
      () =>
        !_ || !w
          ? t
          : t.filter((H) => H[s].toLowerCase().includes(_.toLowerCase())),
      [_, w, t, s],
    ),
    X = R(() => T.findIndex((H) => H.id === h), [T, h]),
    N = R((H) => {
      (g.current = H.navigate), (m.current = H.keydown);
    }, []),
    A = R(
      (H, z) => {
        if (H || H === 0) {
          let Z = t.find((E) => E.id === H);
          if ((y(!1), z && g.current(null), Z && h !== Z.id)) {
            const E = Z.id;
            x(E), d && d({ value: E });
          }
        }
        !S.current && z && M.current.focus();
      },
      [t, h, d],
    ),
    C = R(
      ({ id: H }) => {
        A(H, !0);
      },
      [A],
    ),
    P = R(
      (H) => {
        H && H.stopPropagation(), x(''), y(!1), d && d({ value: '' });
      },
      [d],
    ),
    O = R(
      (H) => {
        if (!t.length) return;
        if (H === '' && c) {
          P();
          return;
        }
        let z = t.find((E) => E[s] === H);
        z || (z = t.find((E) => E[s].toLowerCase().includes(H.toLowerCase())));
        const Z = z ? z.id : h || t[0].id;
        A(Z, !1);
      },
      [t, s, c, h, A, P],
    ),
    G = R(() => {
      v(M.current.value), y(!0), T.length ? g.current(0) : g.current(null);
    }, [T.length, g]),
    D = R(() => {
      S.current = !0;
    }, []),
    B = R(() => {
      (S.current = !1),
        setTimeout(() => {
          S.current || O(_);
        }, 200);
    }, [O, _]);
  return /* @__PURE__ */ ee('div', {
    className: 'wx-1j11Jk wx-combo',
    onClick: () => g.current(X()),
    onKeyDown: (H) => m.current(H, X()),
    title: i,
    children: [
      /* @__PURE__ */ p('input', {
        className: 'wx-1j11Jk wx-input ' + (l ? 'wx-error' : ''),
        id: f,
        ref: M,
        value: _,
        disabled: a,
        placeholder: o,
        onFocus: D,
        onBlur: B,
        onInput: G,
      }),
      c && !a && h
        ? /* @__PURE__ */ p('i', {
            className: 'wx-1j11Jk wx-icon wxi-close',
            onClick: P,
          })
        : /* @__PURE__ */ p('i', {
            className: 'wx-1j11Jk wx-icon wxi-angle-down',
          }),
      !a &&
        /* @__PURE__ */ p(Kn, {
          items: T,
          onReady: N,
          onSelect: C,
          children: ({ option: H }) =>
            /* @__PURE__ */ p(Ue, { children: u ? u({ option: H }) : H[s] }),
        }),
    ],
  });
}
function bn({
  value: n = '',
  id: e,
  readonly: t = !1,
  focus: r = !1,
  select: s = !1,
  type: o = 'text',
  placeholder: i = '',
  disabled: a = !1,
  error: l = !1,
  inputStyle: c = {},
  title: u = '',
  css: d = '',
  icon: f = '',
  clear: g = !1,
  onChange: m,
}) {
  const h = on(e),
    [x, w] = Ke(n),
    y = Y(null),
    b = $(
      () => (f && d.indexOf('wx-icon-left') === -1 ? 'wx-icon-right ' + d : d),
      [f, d],
    ),
    v = $(() => f && d.indexOf('wx-icon-left') !== -1, [f, d]);
  j(() => {
    const X = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(X);
  }, [r, s]);
  const M = R(
      (X) => {
        const N = X.target.value;
        w(N), m && m({ value: N, input: !0 });
      },
      [m],
    ),
    S = R((X) => m && m({ value: X.target.value }), [m]);
  function _(X) {
    X.stopPropagation(), w(''), m && m({ value: '' });
  }
  let T = o;
  return (
    o !== 'password' && o !== 'number' && (T = 'text'),
    j(() => {
      const X = S,
        N = y.current;
      return (
        N.addEventListener('change', X),
        () => {
          N && N.removeEventListener('change', X);
        }
      );
    }, [S]),
    /* @__PURE__ */ ee('div', {
      className: `wx-hQ64J4 wx-text ${b} ${l ? 'wx-error' : ''} ${a ? 'wx-disabled' : ''} ${g ? 'wx-clear' : ''}`,
      children: [
        /* @__PURE__ */ p('input', {
          className: 'wx-hQ64J4 wx-input',
          ref: y,
          id: h,
          readOnly: t,
          disabled: a,
          placeholder: i,
          type: T,
          style: c,
          title: u,
          value: x,
          onInput: M,
        }),
        g && !a && x
          ? /* @__PURE__ */ ee(Ue, {
              children: [
                /* @__PURE__ */ p('i', {
                  className: 'wx-hQ64J4 wx-icon wxi-close',
                  onClick: _,
                }),
                v &&
                  /* @__PURE__ */ p('i', {
                    className: `wx-hQ64J4 wx-icon ${f}`,
                  }),
              ],
            })
          : f
            ? /* @__PURE__ */ p('i', { className: `wx-hQ64J4 wx-icon ${f}` })
            : null,
      ],
    })
  );
}
function Li({ date: n, type: e, part: t, onShift: r }) {
  const { calendar: s, formats: o } = Ie(gt).getRaw(),
    i = n.getFullYear(),
    a = $(() => {
      switch (e) {
        case 'month':
          return Nt(o.monthYearFormat, s)(n);
        case 'year':
          return Nt(o.yearFormat, s)(n);
        case 'duodecade': {
          const { start: c, end: u } = Ks(i),
            d = Nt(o.yearFormat, s);
          return `${d(new Date(c, 0, 1))} - ${d(new Date(u, 11, 31))}`;
        }
        default:
          return '';
      }
    }, [n, e, i, s, o]);
  function l() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ ee('div', {
    className: 'wx-8HQVQV wx-header',
    children: [
      t !== 'right'
        ? /* @__PURE__ */ p('i', {
            className: 'wx-8HQVQV wx-pager wxi-angle-left',
            onClick: () => r && r({ diff: -1, type: e }),
          })
        : /* @__PURE__ */ p('span', { className: 'wx-8HQVQV wx-spacer' }),
      /* @__PURE__ */ p('span', {
        className: 'wx-8HQVQV wx-label',
        onClick: l,
        children: a,
      }),
      t !== 'left'
        ? /* @__PURE__ */ p('i', {
            className: 'wx-8HQVQV wx-pager wxi-angle-right',
            onClick: () => r && r({ diff: 1, type: e }),
          })
        : /* @__PURE__ */ p('span', { className: 'wx-8HQVQV wx-spacer' }),
    ],
  });
}
function Or({ onClick: n, children: e }) {
  return /* @__PURE__ */ p('button', {
    className: 'wx-3s8W4d wx-button',
    onClick: n,
    children: e,
  });
}
function Pi({
  value: n,
  current: e,
  part: t = '',
  markers: r = null,
  onCancel: s,
  onChange: o,
}) {
  const i = (Ie(gt) || kn()).getRaw().calendar,
    a = (i.weekStart || 7) % 7,
    l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)),
    c = (v, M, S) =>
      new Date(
        v.getFullYear(),
        v.getMonth() + (M || 0),
        v.getDate() + (S || 0),
      );
  let u = t !== 'normal';
  function d(v) {
    const M = v.getDay();
    return M === 0 || M === 6;
  }
  function f() {
    const v = c(e, 0, 1 - e.getDate());
    return v.setDate(v.getDate() - ((v.getDay() - (a - 7)) % 7)), v;
  }
  function g() {
    const v = c(e, 1, -e.getDate());
    return v.setDate(v.getDate() + ((6 - v.getDay() + a) % 7)), v;
  }
  const m = Y(0);
  function h(v, M) {
    M.timeStamp !== m.current &&
      ((m.current = M.timeStamp),
      M.stopPropagation(),
      o && o(new Date(new Date(v))),
      s && s());
  }
  const x = $(
      () =>
        t == 'normal'
          ? [n ? c(n).valueOf() : 0]
          : n
            ? [
                n.start ? c(n.start).valueOf() : 0,
                n.end ? c(n.end).valueOf() : 0,
              ]
            : [0, 0],
      [t, n],
    ),
    w = $(() => {
      const v = f(),
        M = g(),
        S = e.getMonth();
      let _ = [];
      for (let T = v; T <= M; T.setDate(T.getDate() + 1)) {
        const X = {
          day: T.getDate(),
          in: T.getMonth() === S,
          date: T.valueOf(),
        };
        let N = '';
        if (
          ((N += X.in ? '' : ' wx-inactive'),
          (N += x.indexOf(X.date) > -1 ? ' wx-selected' : ''),
          u)
        ) {
          const A = X.date == x[0],
            C = X.date == x[1];
          A && !C ? (N += ' wx-left') : C && !A && (N += ' wx-right'),
            X.date > x[0] && X.date < x[1] && (N += ' wx-inrange');
        }
        if (((N += d(T) ? ' wx-weekend' : ''), r)) {
          const A = r(T);
          A && (N += ' ' + A);
        }
        _.push({ ...X, css: N });
      }
      return _;
    }, [e, x, u, r]),
    y = Y(null);
  let b = Y({});
  return (
    (b.current.click = h),
    j(() => {
      Gs(y.current, b.current);
    }, []),
    /* @__PURE__ */ ee('div', {
      children: [
        /* @__PURE__ */ p('div', {
          className: 'wx-398RBS wx-weekdays',
          children: l.map((v) =>
            /* @__PURE__ */ p(
              'div',
              { className: 'wx-398RBS wx-weekday', children: v },
              v,
            ),
          ),
        }),
        /* @__PURE__ */ p('div', {
          className: 'wx-398RBS wx-days',
          ref: y,
          children: w.map((v) =>
            /* @__PURE__ */ p(
              'div',
              {
                className: `wx-398RBS wx-day ${v.css} ${v.in ? '' : 'wx-out'}`,
                'data-id': v.date,
                children: v.day,
              },
              v.date,
            ),
          ),
        }),
      ],
    })
  );
}
function Oi({
  value: n,
  current: e,
  part: t,
  onCancel: r,
  onChange: s,
  onShift: o,
}) {
  const [i, a] = Ke(n || /* @__PURE__ */ new Date()),
    [l, c] = Ke(e || /* @__PURE__ */ new Date()),
    u = Ie(gt).getRaw().calendar,
    d = u.monthShort || [],
    f = $(() => l.getMonth(), [l]),
    g = R(
      (x, w) => {
        if (x != null) {
          w.stopPropagation();
          const y = new Date(l);
          y.setMonth(x), c(y), o && o({ current: y });
        }
        t === 'normal' && a(new Date(l)), r && r();
      },
      [l, t, o, r],
    ),
    m = R(() => {
      const x = new Date(Zs(i, t) || l);
      x.setMonth(l.getMonth()), x.setFullYear(l.getFullYear()), s && s(x);
    }, [i, l, t, s]),
    h = R(
      (x) => {
        const w = x.target.closest('[data-id]');
        if (w) {
          const y = parseInt(w.getAttribute('data-id'), 10);
          g(y, x);
        }
      },
      [g],
    );
  return /* @__PURE__ */ ee(Ue, {
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-34U8T8 wx-months',
        onClick: h,
        children: d.map((x, w) =>
          /* @__PURE__ */ p(
            'div',
            {
              className: 'wx-34U8T8 wx-month' + (f === w ? ' wx-current' : ''),
              'data-id': w,
              children: x,
            },
            w,
          ),
        ),
      }),
      /* @__PURE__ */ p('div', {
        className: 'wx-34U8T8 wx-buttons',
        children: /* @__PURE__ */ p(Or, { onClick: m, children: u.done }),
      }),
    ],
  });
}
const ir = 'wx-1XEF33',
  zi = ({
    value: n,
    current: e,
    onCancel: t,
    onChange: r,
    onShift: s,
    part: o,
  }) => {
    const i = Ie(gt).getRaw().calendar,
      [a, l] = Ke(e),
      [c, u] = Ke(n),
      d = $(() => a.getFullYear(), [a]),
      f = $(() => {
        const { start: w, end: y } = Ks(d),
          b = [];
        for (let v = w; v <= y; ++v) b.push(v);
        return b;
      }, [d]),
      g = {
        click: m,
      };
    function m(w, y) {
      if (w) {
        y.stopPropagation();
        const b = new Date(a);
        b.setFullYear(w), l(b), s && s({ current: b });
      }
      o === 'normal' && u(new Date(a)), t && t();
    }
    function h() {
      const w = new Date(Zs(c, o) || a);
      w.setFullYear(a.getFullYear()), r && r(w);
    }
    const x = Y(null);
    return (
      j(() => {
        x.current && Gs(x.current, g);
      }, []),
      /* @__PURE__ */ ee(Ue, {
        children: [
          /* @__PURE__ */ p('div', {
            className: ir + ' wx-years',
            ref: x,
            children: f.map((w, y) =>
              /* @__PURE__ */ p(
                'div',
                {
                  className:
                    ir +
                    ` wx-year ${d == w ? 'wx-current' : ''} ${y === 0 ? 'wx-prev-decade' : ''} ${y === 11 ? 'wx-next-decade' : ''}`,
                  'data-id': w,
                  children: w,
                },
                y,
              ),
            ),
          }),
          /* @__PURE__ */ p('div', {
            className: ir + ' wx-buttons',
            children: /* @__PURE__ */ p(Or, { onClick: h, children: i.done }),
          }),
        ],
      })
    );
  },
  ls = {
    month: {
      component: Pi,
      next: Fi,
      prev: Wi,
    },
    year: {
      component: Oi,
      next: Bi,
      prev: Yi,
    },
    duodecade: {
      component: zi,
      next: Ui,
      prev: Vi,
    },
  };
function Wi(n) {
  return (n = new Date(n)), n.setMonth(n.getMonth() - 1), n;
}
function Fi(n) {
  return (n = new Date(n)), n.setMonth(n.getMonth() + 1), n;
}
function Yi(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() - 1), n;
}
function Bi(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() + 1), n;
}
function Vi(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() - 10), n;
}
function Ui(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() + 10), n;
}
function Zs(n, e) {
  let t;
  if (e === 'normal') t = n;
  else {
    const { start: r, end: s } = n;
    e === 'left' ? (t = r) : e == 'right' ? (t = s) : (t = r && s);
  }
  return t;
}
const Gi = ['clear', 'today'];
function ji(n) {
  if (n === 'done') return -1;
  if (n === 'clear') return null;
  if (n === 'today') return /* @__PURE__ */ new Date();
}
function Ki({
  value: n,
  current: e,
  onCurrentChange: t,
  part: r = 'normal',
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: a,
}) {
  const l = Ie(gt).getGroup('calendar'),
    [c, u] = J('month'),
    d = Array.isArray(o) ? o : o ? Gi : [],
    f = (w, y) => {
      w.preventDefault(), a && a({ value: y });
    },
    g = () => {
      c === 'duodecade' ? u('year') : c === 'year' && u('month');
    },
    m = (w) => {
      const { diff: y, current: b } = w;
      if (y === 0) {
        c === 'month' ? u('year') : c === 'year' && u('duodecade');
        return;
      }
      if (y) {
        const v = ls[c];
        t(y > 0 ? v.next(e) : v.prev(e));
      } else b && t(b);
      i && i();
    },
    h = (w) => {
      u('month'), a && a({ select: !0, value: w });
    },
    x = $(() => ls[c].component, [c]);
  return /* @__PURE__ */ p('div', {
    className: `wx-2Gr4AS wx-calendar ${r !== 'normal' && r !== 'both' ? 'wx-part' : ''}`,
    children: /* @__PURE__ */ ee('div', {
      className: 'wx-2Gr4AS wx-wrap',
      children: [
        /* @__PURE__ */ p(Li, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ ee('div', {
          children: [
            /* @__PURE__ */ p(x, {
              value: n,
              current: e,
              onCurrentChange: t,
              part: r,
              markers: s,
              onCancel: g,
              onChange: h,
              onShift: m,
            }),
            c === 'month' &&
              d.length > 0 &&
              /* @__PURE__ */ p('div', {
                className: 'wx-2Gr4AS wx-buttons',
                children: d.map((w) =>
                  /* @__PURE__ */ p(
                    'div',
                    {
                      className: 'wx-2Gr4AS wx-button-item',
                      children: /* @__PURE__ */ p(Or, {
                        onClick: (y) => f(y, ji(w)),
                        children: l(w),
                      }),
                    },
                    w,
                  ),
                ),
              }),
          ],
        }),
      ],
    }),
  });
}
function Xn(n) {
  let { words: e = null, optional: t = !1, children: r } = n,
    s = Ie(gt);
  const o = $(() => {
    let i = s;
    return (
      (!i || !i.extend) && (i = jt(yn)), e !== null && (i = i.extend(e, t)), i
    );
  }, [e, t, s]);
  return /* @__PURE__ */ p(gt.Provider, { value: o, children: r });
}
function cs(n, e, t, r) {
  if (!n || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), t(s);
  } else if (n.getDate() !== 1) {
    const s = new Date(n);
    s.setDate(1), t(s);
  }
}
const Xi = ['clear', 'today'];
function Js({
  value: n,
  current: e,
  markers: t = null,
  buttons: r = Xi,
  onChange: s,
}) {
  const [o, i] = Ke(n),
    [a, l] = Ke(e);
  j(() => {
    cs(a, o, l, !1);
  }, [o, a]);
  const c = R(
      (d) => {
        const f = d.value;
        f ? (i(new Date(f)), cs(a, new Date(f), l, !0)) : i(null),
          s && s({ value: f ? new Date(f) : null });
      },
      [s, a],
    ),
    u = R(
      (d) => {
        l(d);
      },
      [l],
    );
  return a
    ? /* @__PURE__ */ p(Xn, {
        children: /* @__PURE__ */ p(Ki, {
          value: o,
          current: a,
          markers: t,
          buttons: r,
          onChange: c,
          onCurrentChange: u,
        }),
      })
    : null;
}
const qi = ['clear', 'today'];
function Qi({
  value: n,
  id: e,
  disabled: t = !1,
  error: r = !1,
  width: s = 'unset',
  align: o = 'start',
  placeholder: i = '',
  format: a = '',
  buttons: l = qi,
  css: c = '',
  title: u = '',
  editable: d = !1,
  clear: f = !1,
  onChange: g,
}) {
  const { calendar: m, formats: h } = (Ie(gt) || kn()).getRaw(),
    x = a || h?.dateFormat;
  let w = typeof x == 'function' ? x : Nt(x, m);
  const [y, b] = J(n),
    [v, M] = J(!1);
  j(() => {
    b(n);
  }, [n]);
  function S() {
    M(!1);
  }
  function _(N) {
    const A = N === y || (N && y && N.valueOf() === y.valueOf()) || (!N && !y);
    b(N), A || (g && g({ value: N })), setTimeout(S, 1);
  }
  const T = $(() => (y ? w(y) : ''), [y, w]);
  function X({ value: N, input: A }) {
    if ((!d && !f) || A) return;
    let C = typeof d == 'function' ? d(N) : N ? new Date(N) : null;
    (C = isNaN(C) ? y || null : C || null), _(C);
  }
  return (
    j(() => {
      const N = S;
      return (
        window.addEventListener('scroll', N),
        () => window.removeEventListener('scroll', N)
      );
    }, []),
    /* @__PURE__ */ ee('div', {
      className: 'wx-1lKOFG wx-datepicker',
      onClick: () => M(!0),
      children: [
        /* @__PURE__ */ p(bn, {
          css: c,
          title: u,
          value: T,
          id: e,
          readonly: !d,
          disabled: t,
          error: r,
          placeholder: i,
          onInput: S,
          onChange: X,
          icon: 'wxi-calendar',
          inputStyle: {
            cursor: 'pointer',
            width: '100%',
            paddingRight:
              'calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)',
          },
          clear: f,
        }),
        v &&
          !t &&
          /* @__PURE__ */ p(an, {
            onCancel: S,
            width: s,
            align: o,
            autoFit: !!o,
            children: /* @__PURE__ */ p(Js, {
              buttons: l,
              value: y,
              onChange: (N) => _(N.value),
            }),
          }),
      ],
    })
  );
}
function eo({
  value: n = '',
  options: e = [],
  textOptions: t = null,
  placeholder: r = '',
  disabled: s = !1,
  error: o = !1,
  title: i = '',
  textField: a = 'label',
  clear: l = !1,
  children: c,
  onChange: u,
}) {
  const d = Y(null),
    f = Y(null);
  let [g, m] = Ke(n);
  function h(v) {
    (d.current = v.navigate), (f.current = v.keydown);
  }
  const x = $(
      () => (g || g === 0 ? (t || e).find((v) => v.id === g) : null),
      [g, t, e],
    ),
    w = R(
      ({ id: v }) => {
        (v || v === 0) && (m(v), d.current(null), u && u({ value: v }));
      },
      [m, u],
    ),
    y = R(
      (v) => {
        v.stopPropagation(), m(''), u && u({ value: '' });
      },
      [m, u],
    ),
    b = R(() => e.findIndex((v) => v.id === g), [e, g]);
  return /* @__PURE__ */ ee('div', {
    className: `wx-2YgblL wx-richselect ${o ? 'wx-2YgblL wx-error' : ''} ${s ? 'wx-2YgblL wx-disabled' : ''} ${c ? '' : 'wx-2YgblL wx-nowrap'}`,
    title: i,
    onClick: () => d.current(b()),
    onKeyDown: (v) => f.current(v, b()),
    tabIndex: 0,
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-2YgblL wx-label',
        children: x
          ? c
            ? c(x)
            : x[a]
          : r
            ? /* @__PURE__ */ p('span', {
                className: 'wx-2YgblL wx-placeholder',
                children: r,
              })
            : ' ',
      }),
      l && !s && g
        ? /* @__PURE__ */ p('i', {
            className: 'wx-2YgblL wx-icon wxi-close',
            onClick: y,
          })
        : /* @__PURE__ */ p('i', {
            className: 'wx-2YgblL wx-icon wxi-angle-down',
          }),
      !s &&
        /* @__PURE__ */ p(Kn, {
          items: e,
          onReady: h,
          onSelect: w,
          children: ({ option: v }) => (c ? c(v) : v[a]),
        }),
    ],
  });
}
function br({
  id: n,
  label: e = '',
  css: t = '',
  min: r = 0,
  max: s = 100,
  value: o = 0,
  step: i = 1,
  title: a = '',
  disabled: l = !1,
  onChange: c,
}) {
  const u = on(n),
    [d, f] = Ke(o),
    g = Y({ value: d, input: d }),
    m = $(() => ((d - r) / (s - r)) * 100 + '%', [d, r, s]),
    h = $(
      () =>
        l
          ? ''
          : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`,
      [l, m],
    );
  function x({ target: b }) {
    const v = b.value * 1;
    f(v),
      c &&
        c({
          value: v,
          previous: g.current.input,
          input: !0,
        }),
      (g.current.input = v);
  }
  function w({ target: b }) {
    const v = b.value * 1;
    f(v),
      c && c({ value: v, previous: g.current.value }),
      (g.current.value = v);
  }
  j(() => {
    f(o);
  }, [o]);
  const y = Y(null);
  return (
    j(() => {
      if (y.current)
        return (
          y.current.addEventListener('change', w),
          () => {
            y.current && y.current.removeEventListener('change', w);
          }
        );
    }, [y, w]),
    /* @__PURE__ */ ee('div', {
      className: `wx-2EDJ8G wx-slider ${t}`,
      title: a,
      children: [
        e &&
          /* @__PURE__ */ p('label', {
            className: 'wx-2EDJ8G wx-label',
            htmlFor: u,
            children: e,
          }),
        /* @__PURE__ */ p('div', {
          className: 'wx-2EDJ8G wx-inner',
          children: /* @__PURE__ */ p('input', {
            id: u,
            className: 'wx-2EDJ8G wx-input',
            type: 'range',
            min: r,
            max: s,
            step: i,
            disabled: l,
            value: d,
            onInput: x,
            style: { background: h },
            ref: y,
          }),
        }),
      ],
    })
  );
}
const Zi = ({
  id: n,
  value: e = 0,
  step: t = 1,
  min: r = 0,
  max: s = 1 / 0,
  error: o = !1,
  disabled: i = !1,
  readonly: a = !1,
  onChange: l,
}) => {
  const c = on(n),
    [u, d] = Ke(e),
    f = R(() => {
      if (a || u <= r) return;
      const x = u - t;
      d(x), l && l({ value: x });
    }, [u, a, r, t, l]),
    g = R(() => {
      if (a || u >= s) return;
      const x = u + t;
      d(x), l && l({ value: x });
    }, [u, a, s, t, l]),
    m = R(() => {
      if (!a) {
        const x = Math.round(Math.min(s, Math.max(u, r)) / t) * t,
          w = isNaN(x) ? Math.max(r, 0) : x;
        d(w), l && l({ value: w });
      }
    }, [a, u, s, r, t, l]),
    h = R(
      (x) => {
        const w = x.target.value * 1;
        d(w), l && l({ value: w, input: !0 });
      },
      [l],
    );
  return /* @__PURE__ */ ee('div', {
    className: `wx-22t21n wx-counter ${i ? 'wx-disabled' : ''} ${a ? 'wx-readonly' : ''} ${o ? 'wx-error' : ''}`,
    children: [
      /* @__PURE__ */ p('button', {
        'aria-label': '-',
        className: 'wx-22t21n wx-btn wx-btn-dec',
        disabled: i,
        onClick: f,
        children: /* @__PURE__ */ p('svg', {
          className: 'wx-22t21n wx-dec',
          width: '12',
          height: '2',
          viewBox: '0 0 12 2',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          children: /* @__PURE__ */ p('path', {
            d: 'M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z',
          }),
        }),
      }),
      /* @__PURE__ */ p('input', {
        id: c,
        type: 'text',
        className: 'wx-22t21n wx-input',
        disabled: i,
        readOnly: a,
        required: !0,
        value: u,
        onBlur: m,
        onInput: h,
      }),
      /* @__PURE__ */ p('button', {
        'aria-label': '-',
        className: 'wx-22t21n wx-btn wx-btn-inc',
        disabled: i,
        onClick: g,
        children: /* @__PURE__ */ p('svg', {
          className: 'wx-22t21n wx-inc',
          width: '12',
          height: '12',
          viewBox: '0 0 12 12',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          children: /* @__PURE__ */ p('path', {
            d: `M11.2501
								6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z`,
          }),
        }),
      }),
    ],
  });
};
function Ji({ notice: n = {} }) {
  function e() {
    n.remove && n.remove();
  }
  return /* @__PURE__ */ ee('div', {
    className: `wx-11sNg5 wx-notice wx-${n.type ? n.type : ''}`,
    role: 'status',
    'aria-live': 'polite',
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-11sNg5 wx-text',
        children: n.text,
      }),
      /* @__PURE__ */ p('div', {
        className: 'wx-11sNg5 wx-button',
        children: /* @__PURE__ */ p('i', {
          className: 'wx-11sNg5 wxi-close',
          onClick: e,
        }),
      }),
    ],
  });
}
function ea({ data: n = [] }) {
  return /* @__PURE__ */ p('div', {
    className: 'wx-3nwoO9 wx-notices',
    children: n.map((e) => /* @__PURE__ */ p(Ji, { notice: e }, e.id)),
  });
}
function ta({
  title: n = '',
  buttons: e = ['cancel', 'ok'],
  header: t,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i,
}) {
  const a = (Ie(gt) || kn()).getGroup('core'),
    l = Y(null);
  j(() => {
    l.current?.focus();
  }, []);
  function c(d) {
    switch (d.code) {
      case 'Enter': {
        const f = d.target.tagName;
        if (f === 'TEXTAREA' || f === 'BUTTON') return;
        o && o({ event: d });
        break;
      }
      case 'Escape':
        i && i({ event: d });
        break;
    }
  }
  function u(d, f) {
    const g = { event: d, button: f };
    f === 'cancel' ? i && i(g) : o && o(g);
  }
  return /* @__PURE__ */ p('div', {
    className: 'wx-1FxkZa wx-modal',
    ref: l,
    tabIndex: 0,
    onKeyDown: c,
    children: /* @__PURE__ */ ee('div', {
      className: 'wx-1FxkZa wx-window',
      children: [
        t ||
          (n
            ? /* @__PURE__ */ p('div', {
                className: 'wx-1FxkZa wx-header',
                children: n,
              })
            : null),
        /* @__PURE__ */ p('div', { children: r }),
        s ||
          (e &&
            /* @__PURE__ */ p('div', {
              className: 'wx-1FxkZa wx-buttons',
              children: e.map((d) =>
                /* @__PURE__ */ p(
                  'div',
                  {
                    className: 'wx-1FxkZa wx-button',
                    children: /* @__PURE__ */ p(Mt, {
                      type: `block ${d === 'ok' ? 'primary' : 'secondary'}`,
                      onClick: (f) => u(f, d),
                      children: a(d),
                    }),
                  },
                  d,
                ),
              ),
            })),
      ],
    }),
  });
}
function na({ children: n }, e) {
  const [t, r] = J(null),
    [s, o] = J([]);
  return (
    Gt(
      e,
      () => ({
        showModal: (i) => {
          const a = { ...i };
          return (
            r(a),
            new Promise((l, c) => {
              (a.resolve = (u) => {
                r(null), l(u);
              }),
                (a.reject = (u) => {
                  r(null), c(u);
                });
            })
          );
        },
        showNotice: (i) => {
          (i = { ...i }),
            (i.id = i.id || jn()),
            (i.remove = () => o((a) => a.filter((l) => l.id !== i.id))),
            i.expire != -1 && setTimeout(i.remove, i.expire || 5100),
            o((a) => [...a, i]);
        },
      }),
      [],
    ),
    /* @__PURE__ */ ee(Ue, {
      children: [
        n,
        t &&
          /* @__PURE__ */ p(ta, {
            title: t.title,
            buttons: t.buttons,
            onConfirm: t.resolve,
            onCancel: t.reject,
            children: t.message,
          }),
        /* @__PURE__ */ p(ea, { data: s }),
      ],
    })
  );
}
Ut(na);
function gn({
  label: n = '',
  position: e = '',
  css: t = '',
  error: r = !1,
  type: s = '',
  required: o = !1,
  children: i,
}) {
  const a = Y(null),
    l = R(() => {
      if (a.current) return a.current;
      const c = jn();
      return (a.current = c), c;
    }, []);
  return /* @__PURE__ */ p(Pr.Provider, {
    value: l,
    children: /* @__PURE__ */ ee('div', {
      className:
        `wx-2oVUvC wx-field wx-${e} ${t} ${r ? 'wx-error' : ''} ${o ? 'wx-required' : ''}`.trim(),
      children: [
        n &&
          /* @__PURE__ */ p('label', {
            className: 'wx-2oVUvC wx-label',
            htmlFor: a.current,
            children: n,
          }),
        /* @__PURE__ */ p('div', {
          className: `wx-2oVUvC wx-field-control wx-${s}`,
          children: i,
        }),
      ],
    }),
  });
}
const to = ({
    value: n = !1,
    type: e = '',
    icon: t = '',
    disabled: r = !1,
    iconActive: s = '',
    onClick: o,
    title: i = '',
    css: a = '',
    text: l = '',
    textActive: c = '',
    children: u,
    active: d,
    onChange: f,
  }) => {
    const [g, m] = Ke(n),
      h = $(() => (g ? 'pressed' : '') + (e ? ' ' + e : ''), [g, e]),
      x = R(
        (w) => {
          let y = !g;
          o && o(w), w.defaultPrevented || (m(y), f && f({ value: y }));
        },
        [g, o, f],
      );
    return g && d
      ? /* @__PURE__ */ p(Mt, {
          title: i,
          text: (g && c) || l,
          css: a,
          type: h,
          icon: (g && s) || t,
          onClick: x,
          disabled: r,
          children: Xs(d, { value: g }),
        })
      : u
        ? /* @__PURE__ */ p(Mt, {
            title: i,
            text: (g && c) || l,
            css: a,
            type: h,
            icon: (g && s) || t,
            onClick: x,
            disabled: r,
            children: u,
          })
        : /* @__PURE__ */ p(Mt, {
            title: i,
            text: (g && c) || l,
            css: a,
            type: h,
            icon: (g && s) || t,
            onClick: x,
            disabled: r,
          });
  },
  us = new Date(0, 0, 0, 0, 0);
function ra({
  value: n = us,
  id: e,
  title: t = '',
  css: r = '',
  disabled: s = !1,
  error: o = !1,
  format: i = '',
  onChange: a,
}) {
  let [l, c] = Ke(n);
  const { calendar: u, formats: d } = (Ie(gt) || kn()).getRaw(),
    f = u.clockFormat == 12,
    g = 23,
    m = 59,
    h = $(() => {
      const E = i || d?.timeFormat;
      return typeof E == 'function' ? E : Nt(E, u);
    }, [i, d, u]),
    x = $(() => h(new Date(0, 0, 0, 1)).indexOf('01') != -1, [h]),
    w = (E, K) => (E < 10 && K ? `0${E}` : `${E}`).slice(-2),
    y = (E) => w(E, !0),
    b = (E) => `${E}`.replace(/[^\d]/g, '') || 0,
    v = (E) => (f && ((E = E % 12), E === 0) ? '12' : w(E, x)),
    M = R((E, K) => ((E = b(E)), Math.min(E, K)), []),
    [S, _] = J(null),
    T = l || us,
    X = M(T.getHours(), g),
    N = M(T.getMinutes(), m),
    A = X > 12,
    C = v(X),
    P = y(N),
    O = $(() => h(new Date(0, 0, 0, X, N)), [X, N, h]),
    G = R(() => {
      _(!0);
    }, []),
    D = R(() => {
      const E = new Date(T);
      E.setHours(E.getHours() + (A ? -12 : 12)), c(E), a && a({ value: E });
    }, [T, A, a]),
    B = R(
      ({ value: E }) => {
        if (T.getHours() === E) return;
        const K = new Date(T);
        K.setHours(E), c(K), a && a({ value: K });
      },
      [T, a],
    ),
    H = R(
      ({ value: E }) => {
        if (T.getMinutes() === E) return;
        const K = new Date(T);
        K.setMinutes(E), c(K), a && a({ value: K });
      },
      [T, a],
    ),
    z = R(
      (E) => (
        (E = M(E, g)),
        f && ((E = E * 1), E === 12 && (E = 0), A && (E += 12)),
        E
      ),
      [M, f, A],
    ),
    Z = R(() => {
      _(null);
    }, []);
  return /* @__PURE__ */ ee('div', {
    className: `wx-7f497i wx-timepicker ${o ? 'wx-7f497i wx-error' : ''} ${s ? 'wx-7f497i wx-disabled' : ''}`,
    onClick: s ? void 0 : G,
    style: { cursor: s ? 'default' : 'pointer' },
    children: [
      /* @__PURE__ */ p(bn, {
        id: e,
        css: r,
        title: t,
        value: O,
        readonly: !0,
        disabled: s,
        error: o,
        icon: 'wxi-clock',
        inputStyle: {
          cursor: 'pointer',
          width: '100%',
          paddingRight:
            'calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)',
        },
      }),
      S &&
        !s &&
        /* @__PURE__ */ p(an, {
          onCancel: Z,
          width: 'unset',
          children: /* @__PURE__ */ ee('div', {
            className: 'wx-7f497i wx-wrapper',
            children: [
              /* @__PURE__ */ ee('div', {
                className: 'wx-7f497i wx-timer',
                children: [
                  /* @__PURE__ */ p('input', {
                    className: 'wx-7f497i wx-digit',
                    value: C,
                    onChange: (E) => {
                      const K = z(E.target.value);
                      B({ value: K });
                    },
                  }),
                  /* @__PURE__ */ p('div', {
                    className: 'wx-7f497i wx-separator',
                    children: ':',
                  }),
                  /* @__PURE__ */ p('input', {
                    className: 'wx-7f497i wx-digit',
                    value: P,
                    onChange: (E) => {
                      const K = M(E.target.value, m);
                      H({ value: K });
                    },
                  }),
                  f &&
                    /* @__PURE__ */ p(to, {
                      value: A,
                      onClick: D,
                      active: () =>
                        /* @__PURE__ */ p('span', { children: 'pm' }),
                      children: /* @__PURE__ */ p('span', { children: 'am' }),
                    }),
                ],
              }),
              /* @__PURE__ */ p(gn, {
                width: 'unset',
                children: /* @__PURE__ */ p(br, {
                  label: u.hours,
                  value: X,
                  onChange: B,
                  max: g,
                }),
              }),
              /* @__PURE__ */ p(gn, {
                width: 'unset',
                children: /* @__PURE__ */ p(br, {
                  label: u.minutes,
                  value: N,
                  onChange: H,
                  max: m,
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function sa({ children: n }) {
  return /* @__PURE__ */ p('div', {
    className: 'wx-KgpO9N wx-modal',
    children: /* @__PURE__ */ p('div', {
      className: 'wx-KgpO9N wx-window',
      children: n,
    }),
  });
}
function oa({ position: n = 'right', children: e, onCancel: t }) {
  const r = Y(null);
  return (
    j(() => xn(r.current, t).destroy, []),
    /* @__PURE__ */ p('div', {
      ref: r,
      className: `wx-2L733M wx-sidearea wx-pos-${n}`,
      children: e,
    })
  );
}
function no({ theme: n = '', target: e, children: t }) {
  const r = Y(null),
    s = Y(null),
    [o, i] = J(null);
  r.current || (r.current = document.createElement('div'));
  const a = Ie(vn);
  return (
    j(() => {
      i(e || ia(s.current) || lt.getTopNode(s.current));
    }, [s.current]),
    /* @__PURE__ */ ee(Ue, {
      children: [
        /* @__PURE__ */ p('span', { ref: s, style: { display: 'none' } }),
        s.current && o
          ? li(
              /* @__PURE__ */ p('div', {
                className: `wx-3ZWsT0 wx-${n || a}-theme`,
                children: t,
              }),
              o,
            )
          : null,
      ],
    })
  );
}
function ia(n) {
  const e = lt.getTopNode(n);
  for (; n && n !== e && !n.getAttribute('data-wx-portal-root'); )
    n = n.parentNode;
  return n;
}
function aa() {
  return /* @__PURE__ */ p(Ue, {});
}
function ds(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(vn.Provider, {
    value: 'material',
    children: /* @__PURE__ */ ee(Ue, {
      children: [
        t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-material-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ ee(Ue, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(aa, {}),
              /* @__PURE__ */ p('link', {
                rel: 'stylesheet',
                href: 'https://cdn.svar.dev/fonts/wxi/wx-icons.css',
              }),
            ],
          }),
      ],
    }),
  });
}
function ro() {
  return /* @__PURE__ */ p(Ue, {});
}
function fs(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(vn.Provider, {
    value: 'willow',
    children: /* @__PURE__ */ ee(Ue, {
      children: [
        t &&
          t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-willow-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ ee(Ue, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(ro, {}),
              /* @__PURE__ */ p('link', {
                rel: 'stylesheet',
                href: 'https://cdn.svar.dev/fonts/wxi/wx-icons.css',
              }),
            ],
          }),
      ],
    }),
  });
}
function hs(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(vn.Provider, {
    value: 'willow-dark',
    children: /* @__PURE__ */ ee(Ue, {
      children: [
        t &&
          t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-willow-dark-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ ee(Ue, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(ro, {}),
              /* @__PURE__ */ p('link', {
                rel: 'stylesheet',
                href: 'https://cdn.svar.dev/fonts/wxi/wx-icons.css',
              }),
            ],
          }),
      ],
    }),
  });
}
Lr(lt);
const qn = {
  gantt: {
    // Header / sidebar
    'Task name': 'Task name',
    'Start date': 'Start date',
    'Add task': 'Add task',
    Duration: 'Duration',
    Task: 'Task',
    Milestone: 'Milestone',
    'Summary task': 'Summary task',
    // Sidebar
    Save: 'Save',
    Delete: 'Delete',
    Name: 'Name',
    Description: 'Description',
    'Select type': 'Select type',
    Type: 'Type',
    'End date': 'End date',
    Progress: 'Progress',
    Predecessors: 'Predecessors',
    Successors: 'Successors',
    'Add task name': 'Add task name',
    'Add description': 'Add description',
    'Select link type': 'Select link type',
    'End-to-start': 'End-to-start',
    'Start-to-start': 'Start-to-start',
    'End-to-end': 'End-to-end',
    'Start-to-end': 'Start-to-end',
    // Context menu / toolbar
    Add: 'Add',
    'Child task': 'Child task',
    'Task above': 'Task above',
    'Task below': 'Task below',
    'Convert to': 'Convert to',
    Edit: 'Edit',
    Cut: 'Cut',
    Copy: 'Copy',
    Paste: 'Paste',
    Move: 'Move',
    Up: 'Up',
    Down: 'Down',
    Indent: 'Indent',
    Outdent: 'Outdent',
    'Split task': 'Split task',
    Segment: 'Segment',
    // Toolbar
    'New task': 'New task',
    'Move up': 'Move up',
    'Move down': 'Move down',
    Undo: 'Undo',
    Redo: 'Redo',
    // Formats
    Week: 'Week',
    Q: 'Quarter',
  },
};
var la = /* @__PURE__ */ new Date().valueOf(),
  ca = () => la++;
function ua(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t],
      s = e[t];
    if (!Qn(r, s)) return !1;
  }
  return !0;
}
function Qn(n, e) {
  if (
    typeof n == 'number' ||
    typeof n == 'string' ||
    typeof n == 'boolean' ||
    n === null
  )
    return n === e;
  if (
    typeof n != typeof e ||
    ((n === null || e === null) && n !== e) ||
    (n instanceof Date && e instanceof Date && n.getTime() !== e.getTime())
  )
    return !1;
  if (typeof n == 'object')
    if (Array.isArray(n) && Array.isArray(e)) {
      if (n.length !== e.length) return !1;
      for (let r = n.length - 1; r >= 0; r--) if (!Qn(n[r], e[r])) return !1;
      return !0;
    } else return ua(n, e);
  return n === e;
}
function Wn(n) {
  if (typeof n != 'object' || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(Wn);
  const e = {};
  for (const t in n) e[t] = Wn(n[t]);
  return e;
}
var so = class {
    constructor(n) {
      (this._nextHandler = null),
        (this._dispatch = n),
        (this.exec = this.exec.bind(this));
    }
    async exec(n, e) {
      return (
        this._dispatch(n, e),
        this._nextHandler && (await this._nextHandler.exec(n, e)),
        e
      );
    }
    setNext(n) {
      return (this._nextHandler = n);
    }
  },
  oo = /* @__PURE__ */ new Date().valueOf(),
  da = () => oo++;
function zr() {
  return 'temp://' + oo++;
}
var gs = class {
    constructor(n) {
      (this._data = n), (this._pool = /* @__PURE__ */ new Map());
      for (let e = 0; e < n.length; e++) {
        const t = n[e];
        this._pool.set(t.id, t);
      }
    }
    add(n) {
      (n = { id: da(), ...n }), this._data.push(n), this._pool.set(n.id, n);
    }
    update(n, e) {
      const t = this._data.findIndex((s) => s.id == n),
        r = { ...this._data[t], ...e };
      (this._data[t] = r), this._pool.set(r.id, r);
    }
    remove(n) {
      (this._data = this._data.filter((e) => e.id != n)), this._pool.delete(n);
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
  },
  fa = class {
    constructor(e) {
      const t = { id: 0, $level: 0, data: [], parent: null },
        r = /* @__PURE__ */ new Map();
      r.set(0, t), (this._pool = r), e && e.length && this.parse(e, 0);
    }
    parse(e, t) {
      const r = this._pool;
      for (let o = 0; o < e.length; o++) {
        const i = e[o];
        (i.parent = i.parent || t), (i.data = null), r.set(i.id, i);
      }
      for (let o = 0; o < e.length; o++) {
        const i = e[o],
          a = r.get(i.parent);
        a && (a.data || (a.data = []), a.data.push(i));
      }
      const s = r.get(t);
      this.setLevel(s, s.$level + 1, !1);
    }
    add(e, t) {
      const r = this._pool.get(e.parent || 0);
      (e.$level = r.$level + 1),
        this._pool.set(e.id, e),
        r.data
          ? t === -1
            ? (r.data = [...r.data, e])
            : ps(r, t, e)
          : (r.data = [e]);
    }
    addAfter(e, t) {
      if (!t) return this.add(e, -1);
      const r = this.byId(t),
        s = this.byId(r.parent),
        o = Rn(s, r.id) + 1;
      (e.parent = s.id), (e.$level = s.$level + 1), this.add(e, o);
    }
    remove(e) {
      const t = this._pool.get(e);
      this._remove(t);
      const r = this._pool.get(t.parent);
      (r.data = r.data.filter((s) => s.id != e)), this._clearBranch(r);
    }
    _remove(e) {
      e.data && e.data.forEach((t) => this._remove(t)), this._pool.delete(e.id);
    }
    update(e, t) {
      let r = this._pool.get(e);
      const s = this._pool.get(r.parent),
        o = Rn(s, r.id);
      (r = { ...r, ...t }),
        s && o >= 0 && ((s.data[o] = r), (s.data = [...s.data])),
        this._pool.set(r.id, r);
    }
    move(e, t, r) {
      const s = this._pool.get(e),
        o = t === 'child',
        i = this._pool.get(r),
        a = i.$level + (o ? 1 : 0);
      if (!s || !i) return;
      const l = this._pool.get(s.parent),
        c = o ? i : this._pool.get(i.parent);
      c.data || (c.data = []);
      const u = Rn(l, s.id);
      ha(l, u);
      const d = o ? c.data.length : Rn(c, i.id) + (t === 'after' ? 1 : 0);
      if ((ps(c, d, s), l.id === c.id && u === d)) return null;
      (s.parent = c.id),
        s.$level !== a && ((s.$level = a), this.setLevel(s, a + 1, !0)),
        this.update(s.id, s),
        this._clearBranch(l);
    }
    _clearBranch(e) {
      e.data &&
        !e.data.length &&
        (e.open && delete e.open, this.update(e.id, { data: null }));
    }
    toArray() {
      const e = [],
        t = this._pool.get(0).data;
      return t && io(t, e), e;
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
      !r ||
        !r.data ||
        r.data.forEach((s, o) => {
          e(this.byId(s.id), o), this.eachChild(e, s.id);
        });
    }
    setLevel(e, t, r) {
      e.data &&
        (e.data = e.data.map(
          (s) => (
            r && ((s = { ...s }), this._pool.set(s.id, s)),
            (s.$level = t),
            s.data && this.setLevel(s, t + 1, r),
            s
          ),
        ));
    }
  };
function io(n, e) {
  n.forEach((t) => {
    e.push(t), t.open === !0 && io(t.data, e);
  });
}
function ha(n, e) {
  const t = [...n.data];
  t.splice(e, 1), (n.data = t);
}
function ps(n, e, t) {
  const r = [...n.data];
  r.splice(e, 0, t), (n.data = r);
}
function Rn(n, e) {
  return n?.data.findIndex((t) => t.id === e);
}
var ao = 2,
  ga = class {
    constructor(e) {
      e && ((this._writable = e.writable), (this._async = e.async)),
        (this._values = {}),
        (this._state = {});
    }
    setState(e, t = 0) {
      const r = {};
      return this._wrapProperties(e, this._state, this._values, '', r, t), r;
    }
    getState() {
      return this._values;
    }
    getReactive() {
      return this._state;
    }
    _wrapProperties(e, t, r, s, o, i) {
      for (const a in e) {
        const l = t[a],
          c = r[a],
          u = e[a];
        if (
          l &&
          ((c === u && typeof u != 'object') ||
            (u instanceof Date &&
              c instanceof Date &&
              c.getTime() === u.getTime()))
        )
          continue;
        const d = s + (s ? '.' : '') + a;
        l
          ? (l.__parse(u, d, o, i) && (r[a] = u),
            i & ao ? (o[d] = l.__trigger) : l.__trigger())
          : (u && u.__reactive
              ? (t[a] = this._wrapNested(u, u, d, o))
              : (t[a] = this._wrapWritable(u)),
            (r[a] = u)),
          (o[d] = o[d] || null);
      }
    }
    _wrapNested(e, t, r, s) {
      const o = this._wrapWritable(e);
      return (
        this._wrapProperties(e, o, t, r, s, 0),
        (o.__parse = (i, a, l, c) => (
          this._wrapProperties(i, o, t, a, l, c), !1
        )),
        o
      );
    }
    _wrapWritable(e) {
      const t = [],
        r = function () {
          for (let s = 0; s < t.length; s++) t[s](e);
        };
      return {
        subscribe: (s) => (
          t.push(s),
          this._async ? setTimeout(s, 1, e) : s(e),
          () => {
            const o = t.indexOf(s);
            o >= 0 && t.splice(o, 1);
          }
        ),
        __trigger: () => {
          t.length && (this._async ? setTimeout(r, 1) : r());
        },
        __parse: function (s) {
          return (e = s), !0;
        },
      };
    }
  },
  pa = class {
    constructor(e, t, r, s) {
      typeof e == 'function'
        ? (this._setter = e)
        : (this._setter = e.setState.bind(e)),
        (this._routes = t),
        (this._parsers = r),
        (this._prev = {}),
        (this._triggers = /* @__PURE__ */ new Map()),
        (this._sources = /* @__PURE__ */ new Map()),
        this._routes.forEach((o) => {
          o.in.forEach((i) => {
            const a = this._triggers.get(i) || [];
            a.push(o), this._triggers.set(i, a);
          }),
            o.out.forEach((i) => {
              const a = this._sources.get(i) || {};
              o.in.forEach((l) => (a[l] = !0)), this._sources.set(i, a);
            });
        }),
        this._routes.forEach((o) => {
          o.length = Math.max(...o.in.map((i) => lo(i, this._sources, 1)));
        }),
        (this._bus = s);
    }
    init(e) {
      const t = {};
      for (const r in e)
        if (this._prev[r] !== e[r]) {
          const s = this._parsers[r];
          t[r] = s ? s(e[r]) : e[r];
        }
      (this._prev = this._prev ? { ...this._prev, ...e } : { ...e }),
        this.setState(t),
        this._bus && this._bus.exec('init-state', t);
    }
    setStateAsync(e) {
      const t = this._setter(e, ao);
      return (
        this._async
          ? Object.assign(this._async.signals, t)
          : (this._async = {
              signals: t,
              timer: setTimeout(this._applyState.bind(this), 1),
            }),
        t
      );
    }
    _applyState() {
      const e = this._async;
      if (e) {
        (this._async = null), this._triggerUpdates(e.signals, []);
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
      const r = Object.keys(e),
        s = !t.length;
      t = t || [];
      for (let o = 0; o < r.length; o++) {
        const i = r[o],
          a = this._triggers.get(i);
        a &&
          a.forEach((l) => {
            t.indexOf(l) == -1 && t.push(l);
          });
      }
      s && this._execNext(t);
    }
    _execNext(e) {
      for (; e.length; ) {
        e.sort((r, s) => (r.length < s.length ? 1 : -1));
        const t = e[e.length - 1];
        e.splice(e.length - 1), t.exec(e);
      }
    }
  };
function lo(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => lo(o, e, t + 1));
  return Math.max(...s);
}
var ma = class {
  constructor() {
    (this._nextHandler = null),
      (this._handlers = {}),
      (this._tag = /* @__PURE__ */ new WeakMap()),
      (this.exec = this.exec.bind(this));
  }
  on(e, t, r) {
    let s = this._handlers[e];
    s
      ? r && r.intercept
        ? s.unshift(t)
        : s.push(t)
      : (s = this._handlers[e] = [t]),
      r && r.tag && this._tag.set(t, r.tag);
  }
  intercept(e, t, r) {
    this.on(e, t, { ...r, intercept: !0 });
  }
  detach(e) {
    for (const t in this._handlers) {
      const r = this._handlers[t];
      for (let s = r.length - 1; s >= 0; s--)
        this._tag.get(r[s]) === e && r.splice(s, 1);
    }
  }
  async exec(e, t) {
    const r = this._handlers[e];
    if (r)
      for (let s = 0; s < r.length; s++) {
        const o = r[s](t);
        if (o === !1 || (o && o.then && (await o) === !1)) return;
      }
    return this._nextHandler && (await this._nextHandler.exec(e, t)), t;
  }
  setNext(e) {
    return (this._nextHandler = e);
  }
};
function wa(n, e) {
  return typeof n == 'string'
    ? n.localeCompare(e, void 0, { numeric: !0 })
    : typeof n == 'object'
      ? n.getTime() - e.getTime()
      : (n ?? 0) - (e ?? 0);
}
function xa(n, e) {
  return typeof n == 'string'
    ? -n.localeCompare(e, void 0, { numeric: !0 })
    : typeof e == 'object'
      ? e.getTime() - n.getTime()
      : (e ?? 0) - (n ?? 0);
}
function ya({ key: n, order: e }) {
  const t = e === 'asc' ? wa : xa;
  return (r, s) => t(r[n], s[n]);
}
function va(n) {
  if (!n || !n.length) return;
  const e = n.map((t) => ya(t));
  return n.length === 1
    ? e[0]
    : function (t, r) {
        for (let s = 0; s < e.length; s++) {
          const o = e[s](t, r);
          if (o !== 0) return o;
        }
        return 0;
      };
}
function ka(n, e) {
  return n.sort(va(e));
}
let ba = class extends fa {
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
    if (r)
      for (let o = 0; o < r.length; o++) {
        if (r[o].id === t) {
          s = !0;
          break;
        }
        if (r[o].data && ((s = this.contains(r[o].id, t)), s)) break;
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
    return (
      e.data?.forEach((i, a) => {
        const l = this.copy(i, s.id, a);
        o = o.concat(l);
      }),
      o
    );
  }
  normalizeTask(e) {
    const t = e.id || zr(),
      r = e.parent || 0,
      s = e.text || '',
      o = e.type || 'task',
      i = e.progress || 0,
      a = e.details || '',
      l = { ...e, id: t, text: s, parent: r, progress: i, type: o, details: a };
    return (
      e.segments && (l.segments = e.segments.map((c) => ({ ...c }))),
      e.segments && (l.segments = e.segments.map((c) => ({ ...c }))),
      l
    );
  }
  getSummaryId(e, t = !1) {
    const r = this._pool.get(e);
    if (!r.parent) return null;
    const s = this._pool.get(r.parent);
    if (t) {
      let o = e,
        i = this.getSummaryId(o);
      const a = [];
      for (; i; ) (o = i), a.push(i), (i = this.getSummaryId(o));
      return a;
    }
    return s.type === 'summary' ? s.id : this.getSummaryId(s.id);
  }
  sort(e) {
    (this._sort = e), e && this.sortBranch(e, 0);
  }
  sortBranch(e, t) {
    const r = this._pool.get(t || 0).data;
    r &&
      (ka(r, e),
      r.forEach((s) => {
        this.sortBranch(e, s.id);
      }));
  }
  serialize() {
    const e = [],
      t = this._pool.get(0).data;
    return t && co(t, e), e;
  }
  clear() {
    this.forEach((e) => {
      this.remove(e.id);
    });
  }
};
function co(n, e) {
  n.forEach((t) => {
    e.push(t), t.data && co(t.data, e);
  });
}
function Le(n) {
  const e = Object.prototype.toString.call(n);
  return n instanceof Date || (typeof n == 'object' && e === '[object Date]')
    ? new n.constructor(+n)
    : typeof n == 'number' ||
        e === '[object Number]' ||
        typeof n == 'string' ||
        e === '[object String]'
      ? new Date(n)
      : /* @__PURE__ */ new Date(NaN);
}
function Dt(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
function Zn(n, e) {
  const t = Le(n);
  return isNaN(e) ? Dt(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function Wr(n, e) {
  const t = Le(n);
  if (isNaN(e)) return Dt(n, NaN);
  if (!e) return t;
  const r = t.getDate(),
    s = Dt(n, t.getTime());
  s.setMonth(t.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (t.setFullYear(s.getFullYear(), s.getMonth(), r), t);
}
function uo(n, e) {
  const t = +Le(n);
  return Dt(n, t + e);
}
const fo = 6048e5,
  Sa = 864e5,
  ho = 6e4,
  go = 36e5;
function $a(n, e) {
  return uo(n, e * go);
}
let Ca = {};
function po() {
  return Ca;
}
function Fn(n, e) {
  const t = po(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      t.weekStartsOn ??
      t.locale?.options?.weekStartsOn ??
      0,
    s = Le(n),
    o = s.getDay(),
    i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function pn(n) {
  return Fn(n, { weekStartsOn: 1 });
}
function _a(n) {
  const e = Le(n),
    t = e.getFullYear(),
    r = Dt(n, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = pn(r),
    o = Dt(n, 0);
  o.setFullYear(t, 0, 4), o.setHours(0, 0, 0, 0);
  const i = pn(o);
  return e.getTime() >= s.getTime()
    ? t + 1
    : e.getTime() >= i.getTime()
      ? t
      : t - 1;
}
function Yt(n) {
  const e = Le(n);
  return e.setHours(0, 0, 0, 0), e;
}
function Yn(n) {
  const e = Le(n),
    t = new Date(
      Date.UTC(
        e.getFullYear(),
        e.getMonth(),
        e.getDate(),
        e.getHours(),
        e.getMinutes(),
        e.getSeconds(),
        e.getMilliseconds(),
      ),
    );
  return t.setUTCFullYear(e.getFullYear()), +n - +t;
}
function mo(n, e) {
  const t = Yt(n),
    r = Yt(e),
    s = +t - Yn(t),
    o = +r - Yn(r);
  return Math.round((s - o) / Sa);
}
function ms(n) {
  const e = _a(n),
    t = Dt(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), pn(t);
}
function Na(n, e) {
  return uo(n, e * ho);
}
function Ma(n, e) {
  const t = e * 3;
  return Wr(n, t);
}
function wo(n, e) {
  const t = e * 7;
  return Zn(n, t);
}
function Ta(n, e) {
  return Wr(n, e * 12);
}
function hn(n, e) {
  const t = Le(n),
    r = Le(e),
    s = t.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function Da(n, e) {
  const t = Yt(n),
    r = Yt(e);
  return +t == +r;
}
function Fr(n, e) {
  const t = pn(n),
    r = pn(e),
    s = +t - Yn(t),
    o = +r - Yn(r);
  return Math.round((s - o) / fo);
}
function Ea(n, e) {
  const t = Le(n),
    r = Le(e),
    s = t.getFullYear() - r.getFullYear(),
    o = t.getMonth() - r.getMonth();
  return s * 12 + o;
}
function Ra(n, e) {
  const t = Le(n),
    r = Le(e);
  return t.getFullYear() - r.getFullYear();
}
function Yr(n) {
  return (e) => {
    const t = (n ? Math[n] : Math.trunc)(e);
    return t === 0 ? 0 : t;
  };
}
function xo(n, e) {
  return +Le(n) - +Le(e);
}
function Ia(n, e, t) {
  const r = xo(n, e) / go;
  return Yr(t?.roundingMethod)(r);
}
function Ha(n, e, t) {
  const r = xo(n, e) / ho;
  return Yr(t?.roundingMethod)(r);
}
function yo(n) {
  const e = Le(n);
  return e.setHours(23, 59, 59, 999), e;
}
function Br(n) {
  const e = Le(n),
    t = e.getMonth();
  return (
    e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e
  );
}
function Aa(n) {
  const e = Le(n);
  return +yo(e) == +Br(e);
}
function vo(n, e) {
  const t = Le(n),
    r = Le(e),
    s = hn(t, r),
    o = Math.abs(Ea(t, r));
  let i;
  if (o < 1) i = 0;
  else {
    t.getMonth() === 1 && t.getDate() > 27 && t.setDate(30),
      t.setMonth(t.getMonth() - s * o);
    let a = hn(t, r) === -s;
    Aa(Le(n)) && o === 1 && hn(n, r) === 1 && (a = !1),
      (i = s * (o - Number(a)));
  }
  return i === 0 ? 0 : i;
}
function La(n, e, t) {
  const r = vo(n, e) / 3;
  return Yr(t?.roundingMethod)(r);
}
function Pa(n, e) {
  const t = Le(n),
    r = Le(e),
    s = hn(t, r),
    o = Math.abs(Ra(t, r));
  t.setFullYear(1584), r.setFullYear(1584);
  const i = hn(t, r) === -s,
    a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function mn(n) {
  const e = Le(n),
    t = e.getMonth(),
    r = t - (t % 3);
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function ko(n) {
  const e = Le(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Oa(n) {
  const e = Le(n),
    t = e.getFullYear();
  return e.setFullYear(t + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function za(n) {
  const e = Le(n),
    t = Dt(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function Wa(n) {
  const e = Le(n);
  return e.setMinutes(59, 59, 999), e;
}
function Fa(n, e) {
  const t = po(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      t.weekStartsOn ??
      t.locale?.options?.weekStartsOn ??
      0,
    s = Le(n),
    o = s.getDay(),
    i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function Vr(n) {
  const e = Le(n),
    t = e.getMonth(),
    r = t - (t % 3) + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function bo(n) {
  const e = Le(n),
    t = e.getFullYear(),
    r = e.getMonth(),
    s = Dt(n, 0);
  return s.setFullYear(t, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Ya(n) {
  const e = Le(n).getFullYear();
  return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
function So(n) {
  const e = Le(n);
  return String(new Date(e)) === 'Invalid Date' ? NaN : Ya(e) ? 366 : 365;
}
function Ba(n) {
  const e = ms(n),
    t = +ms(wo(e, 60)) - +e;
  return Math.round(t / fo);
}
function Qt(n, e) {
  const t = Le(n),
    r = Le(e);
  return +t == +r;
}
function Va(n) {
  const e = Le(n);
  return e.setMinutes(0, 0, 0), e;
}
function Ua(n, e, t) {
  const r = Fn(n, t),
    s = Fn(e, t);
  return +r == +s;
}
function Ga(n, e) {
  const t = Le(n),
    r = Le(e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function ja(n, e) {
  const t = mn(n),
    r = mn(e);
  return +t == +r;
}
function Ka(n, e) {
  const t = Le(n),
    r = Le(e);
  return t.getFullYear() === r.getFullYear();
}
const Sr = {
    year: Pa,
    quarter: La,
    month: vo,
    week: Fr,
    day: mo,
    hour: Ia,
    minute: Ha,
  },
  Bt = {
    year: { quarter: 4, month: 12, week: Ba, day: Xa, hour: qa },
    quarter: { month: 3, week: Qa, day: $o, hour: Za },
    month: { week: Ja, day: el, hour: tl },
    week: { day: 7, hour: 168 },
    day: { hour: 24 },
    hour: { minute: 60 },
  };
function Xa(n) {
  return n ? So(n) : 365;
}
function qa(n) {
  return So(n) * 24;
}
function Qa(n) {
  const e = mn(n),
    t = Zn(Yt(Vr(n)), 1);
  return Fr(t, e);
}
function $o(n) {
  if (n) {
    const e = mn(n),
      t = Vr(n);
    return mo(t, e) + 1;
  }
  return 91;
}
function Za(n) {
  return $o(n) * 24;
}
function Ja(n) {
  if (n) {
    const e = ko(n),
      t = Zn(Yt(Br(n)), 1);
    return Fr(t, e);
  }
  return 5;
}
function el(n) {
  return n ? bo(n) : 30;
}
function tl(n) {
  return bo(n) * 24;
}
function Bn(n, e, t) {
  const r = Bt[n][e];
  return r ? (typeof r == 'number' ? r : r(t)) : 1;
}
function nl(n, e) {
  return n === e || !!(Bt[n] && Bt[n][e]);
}
const Vn = {
  year: Ta,
  quarter: Ma,
  month: Wr,
  week: wo,
  day: Zn,
  hour: $a,
  minute: Na,
};
function Ur(n, e, t) {
  if (e) {
    if (n === 'day') return (r, s) => e.getWorkingDays(s, r, !0);
    if (n === 'hour') return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => {
    const a = Bt[n]?.[o];
    return !a || typeof a == 'number' || No(n, r, s, t)
      ? dn(n, r, s, o, i, t)
      : rl(r, s, n, o, i, t);
  };
}
function dn(n, e, t, r, s, o) {
  const i = r || n;
  let a = t,
    l = e;
  if (
    (s && ((a = Tt(i, t, o)), (l = Tt(i, e, o)), l < e && (l = St(i)(l, 1))),
    n !== i)
  ) {
    const c = Sr[i](l, a),
      u = Bn(n, i, t);
    return c / u;
  } else return Sr[i](l, a);
}
function rl(n, e, t, r, s, o) {
  let i = 0;
  const a = Tt(t, e, o);
  if (e > a) {
    const c = Vn[t](a, 1);
    (i = dn(t, c, e, r, void 0, o)), (e = c);
  }
  let l = 0;
  return (
    No(t, e, n, o) ||
      ((l = dn(t, Tt(t, n, o), e, void 0, void 0, o)), (e = Vn[t](e, l))),
    (l += i + dn(t, n, e, r, void 0, o)),
    !l && s && (l = dn(t, n, e, r, s, o)),
    l
  );
}
function St(n, e) {
  if (e) {
    if (n === 'day') return (t, r) => e.addWorkingDays(t, r, !0);
    if (n === 'hour') return (t, r) => e.addWorkingHours(t, r);
  }
  return Vn[n];
}
const Co = {
  year: za,
  quarter: mn,
  month: ko,
  week: (n, e) => Fn(n, { weekStartsOn: e }),
  day: Yt,
  hour: Va,
};
function Tt(n, e, t) {
  const r = Co[n];
  return r ? r(e, t) : new Date(e);
}
const sl = {
    year: Oa,
    quarter: Vr,
    month: Br,
    week: (n, e) => Fa(n, { weekStartsOn: e }),
    day: yo,
    hour: Wa,
  },
  _o = {
    year: Ka,
    quarter: ja,
    month: Ga,
    week: (n, e, t) => Ua(n, e, { weekStartsOn: t }),
    day: Da,
  };
function No(n, e, t, r) {
  const s = _o[n];
  return s ? s(e, t, r) : !1;
}
const ol = {
    start: Co,
    end: sl,
    add: Vn,
    isSame: _o,
    diff: Sr,
    smallerCount: Bt,
  },
  ws = (n) => (typeof n == 'function' ? n(/* @__PURE__ */ new Date()) : n);
function il(n, e) {
  for (const t in e) {
    if (t === 'smallerCount') {
      const r = Object.keys(e[t])
        .sort((a, l) => xt.indexOf(a) - xt.indexOf(l))
        .shift();
      let s = xt.indexOf(r);
      const o = e[t][r],
        i = ws(o);
      for (let a = s - 1; a >= 0; a--) {
        const l = xt[a],
          c = ws(Bt[l][r]);
        if (i <= c) break;
        s = a;
      }
      xt.splice(s, 0, n);
    }
    if (t === 'biggerCount') for (const r in e[t]) Bt[r][n] = e[t][r];
    else ol[t][n] = e[t];
  }
}
function ar(n, e = 1, t) {
  return (
    t.isWorkingDay(n) ||
      (n = e > 0 ? t.getNextWorkingDay(n) : t.getPreviousWorkingDay(n)),
    n
  );
}
function al(n) {
  return (e, t) => {
    if (t > 0) for (let r = 0; r < t; r++) e = n.getNextWorkingDay(e);
    if (t < 0) for (let r = 0; r > t; r--) e = n.getPreviousWorkingDay(e);
    return e;
  };
}
function nn(n) {
  const e = /* @__PURE__ */ new Date();
  return n
    .map((t) => ({ item: t, len: St(t.unit)(e, 1) }))
    .sort((t, r) => (t.len < r.len ? -1 : 1))[0].item;
}
const xt = ['year', 'quarter', 'month', 'week', 'day', 'hour'],
  $r = 50,
  Cr = 300;
function ll(n, e, t, r, s, o) {
  const i = !n || t,
    a = !e || t;
  let l = n,
    c = e,
    u = !1,
    d = !1;
  (i || a) &&
    (s?.forEach((g) => {
      i && (!l || g.start <= l) && ((l = g.start), (u = !0));
      const m = g.type === 'milestone' ? g.start : g.end;
      a && (!c || m >= c) && ((c = m), (d = !0));
    }),
    o?.forEach((g) => {
      i && (!l || g.start <= l) && ((l = g.start), (u = !0)),
        a && (!c || g.start >= c) && ((c = g.start), (d = !0));
    }));
  const f = St(r || 'day');
  return (
    l
      ? u && (l = f(l, -1))
      : c
        ? (l = f(c, -30))
        : (l = /* @__PURE__ */ new Date()),
    c ? d && (c = f(c, 1)) : (c = f(l, 30)),
    { _start: l, _end: c }
  );
}
function cl(n, e, t, r, s, o, i) {
  const a = nn(i).unit,
    l = Ur(a, void 0, o),
    c = l(e, n, '', !0),
    u = Tt(a, e, o);
  (n = Tt(a, n, o)), (e = u < e ? St(a)(u, 1) : u);
  const d = c * r,
    f = s * i.length,
    g = i.map((h) => {
      const x = [],
        w = St(h.unit);
      let y = Tt(h.unit, n, o);
      for (; y < e; ) {
        const b = w(y, h.step),
          v = y < n ? n : y,
          M = b > e ? e : b,
          S = l(M, v, '', !0) * r,
          _ = typeof h.format == 'function' ? h.format(y, b) : h.format;
        let T = '';
        h.css && (T += typeof h.css == 'function' ? h.css(y) : h.css),
          x.push({ width: S, value: _, date: v, css: T, unit: h.unit }),
          (y = b);
      }
      return { cells: x, add: w, height: s };
    });
  let m = r;
  return (
    a !== t && (m = m / Bn(a, t)),
    {
      rows: g,
      width: d,
      height: f,
      diff: l,
      start: n,
      end: e,
      lengthUnit: t,
      minUnit: a,
      lengthUnitWidth: m,
    }
  );
}
function ul(n, e, t, r) {
  const s = typeof n == 'boolean' ? {} : n,
    o = xt.indexOf(nn(t).unit);
  if ((typeof s.level > 'u' && (s.level = o), s.levels))
    s.levels.forEach((l) => {
      l.minCellWidth || (l.minCellWidth = In(s.minCellWidth, $r)),
        l.maxCellWidth || (l.maxCellWidth = In(s.maxCellWidth, Cr));
    });
  else {
    const l = [],
      c = t.length || 1,
      u = In(s.minCellWidth, $r),
      d = In(s.maxCellWidth, Cr);
    t.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }),
      xt.forEach((f, g) => {
        if (g === o) l.push({ minCellWidth: u, maxCellWidth: d, scales: t });
        else {
          const m = [];
          if (g)
            for (let h = c - 1; h > 0; h--) {
              const x = xt[g - h];
              x && m.push({ unit: x, step: 1, format: e[x] });
            }
          m.push({ unit: f, step: 1, format: e[f] }),
            l.push({ minCellWidth: u, maxCellWidth: d, scales: m });
        }
      }),
      (s.levels = l);
  }
  s.levels[s.level] || (s.level = 0);
  const i = s.levels[s.level],
    a = Math.min(Math.max(r, i.minCellWidth), i.maxCellWidth);
  return { zoom: s, scales: i.scales, cellWidth: a };
}
function dl(n, e, t, r, s, o, i) {
  n.level = t;
  let a;
  const l = r.scales || r,
    c = nn(l).unit,
    u = fl(c, s);
  if (e === -1) {
    const g = Bn(c, s);
    a = i * g;
  } else {
    const g = Bn(nn(o).unit, c);
    a = Math.round(i / g);
  }
  const d = r.minCellWidth ?? $r,
    f = r.maxCellWidth ?? Cr;
  return {
    scales: l,
    cellWidth: Math.min(f, Math.max(d, a)),
    lengthUnit: u,
    zoom: n,
  };
}
function fl(n, e) {
  const t = xt.indexOf(n),
    r = xt.indexOf(e);
  return r >= t ? (n === 'hour' ? 'hour' : 'day') : xt[r];
}
function In(n, e) {
  return n ?? e;
}
const _r = 8,
  Mo = 4,
  hl = 3,
  xs = 7,
  gl = _r + Mo;
function To(n, e, t) {
  (n.open || n.type != 'summary') &&
    n.data?.forEach((r) => {
      typeof r.$x > 'u' && Eo(r, t), (r.$x += e), To(r, e, t);
    });
}
function Nr(n, e, t, r) {
  const s = n.getSummaryId(e.id);
  if (s) {
    const o = n.byId(s),
      i = { xMin: 1 / 0, xMax: 0 };
    r && Io(o, t),
      Do(o, i, t),
      (o.$x = i.xMin),
      (o.$w = i.xMax - i.xMin),
      Nr(n, o, t);
  }
}
function Do(n, e, t) {
  n.data?.forEach((r) => {
    if (!r.unscheduled) {
      typeof r.$x > 'u' && Eo(r, t);
      const s = r.type === 'milestone' && r.$h ? r.$h / 2 : 0;
      e.xMin > r.$x + s && (e.xMin = r.$x + s);
      const o = r.$x + r.$w - s;
      e.xMax < o && (e.xMax = o);
    }
    r.type !== 'summary' && Do(r, e, t);
  });
}
function Eo(n, e) {
  const { _scales: t, cellWidth: r } = e;
  (n.$x = Math.round(t.diff(n.start, t.start, t.lengthUnit) * r)),
    (n.$w = Math.round(t.diff(n.end, n.start, t.lengthUnit, !0) * r));
}
function Gr(n, e) {
  let t;
  e && (t = e.filter((s) => s.parent == n.id));
  const r = { data: t, ...n };
  if (r.data?.length)
    r.data.forEach((s) => {
      if (s.unscheduled && !s.data) return;
      (e || (s.type != 'summary' && s.data)) &&
        (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }),
        (s = Gr(s, e))),
        s.start &&
          (!r.start || r.start > s.start) &&
          (r.start = new Date(s.start));
      const o = s.end || s.start;
      o && (!r.end || r.end < o) && (r.end = new Date(o));
    });
  else if (n.type === 'summary')
    throw Error(
      'Summary tasks must have start and end dates if they have no subtasks',
    );
  return r;
}
function Ro(n, e, t) {
  return (
    Mr(n, e, t, !1),
    t.splitTasks &&
      n.segments?.forEach((r) => {
        Ro(r, e, { ...t, baselines: !1 }), (r.$x -= n.$x);
      }),
    t.baselines && Mr(n, e, t, !0),
    n
  );
}
function Mr(n, e, t, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: a } = t,
    { start: l, end: c, lengthUnit: u, diff: d } = i,
    f = (r ? 'base_' : '') + 'start',
    g = (r ? 'base_' : '') + 'end',
    m = '$x' + (r ? '_base' : ''),
    h = '$y' + (r ? '_base' : ''),
    x = '$w' + (r ? '_base' : ''),
    w = '$h' + (r ? '_base' : ''),
    y = '$skip' + (r ? '_baseline' : '');
  let b = n[f],
    v = n[g];
  if (r && !b) {
    n[y] = !0;
    return;
  }
  n[f] < l && (n[g] < l || Qt(n[g], l)) ? (b = v = l) : n[f] > c && (b = v = c),
    (n[m] = Math.round(d(b, l, u) * s)),
    (n[x] = Math.round(d(v, b, u, !0) * s)),
    e !== null && (n[h] = r ? n.$y + n.$h + Mo : o * e + hl),
    (n[w] = r ? _r : a ? o - xs - gl : o - xs),
    n.type === 'milestone' &&
      ((n[m] = n[m] - n.$h / 2),
      (n[x] = n.$h),
      r && ((n[h] = n.$y + _r), (n[x] = n[w] = n.$h))),
    t.unscheduledTasks && n.unscheduled && !r
      ? (n.$skip = !0)
      : (n[y] = Qt(b, v));
}
function Io(n, e, t) {
  n.data &&
    !n.$skip &&
    ((t = t || !n.open),
    n.data.forEach((r) => {
      t && Mr(r, null, e, !1), Io(r, e, t);
    }));
}
const lr = 20,
  pl = function (n, e, t, r, s) {
    const o = Math.round(r / 2) - 3;
    if (!e || !t || !e.$y || !t.$y || e.$skip || t.$skip)
      return (n.$p = ''), (n.$pl = 0), n;
    let i = !1,
      a = !1;
    switch (n.type) {
      case 'e2s':
        a = !0;
        break;
      case 's2s':
        (i = !0), (a = !0);
        break;
      case 's2e':
        i = !0;
        break;
    }
    const l = i ? e.$x : e.$x + e.$w,
      c = s ? e.$y - 7 : e.$y,
      u = a ? t.$x : t.$x + t.$w,
      d = s ? t.$y - 7 : t.$y;
    if (l !== u || c !== d) {
      const f = wl(l, c + o, u, d + o, i, a, r / 2, s),
        g = xl(u, d + o, a);
      (n.$p = `${f},${g}`), (n.$pl = ml(n.$p));
    }
    return n;
  };
function ml(n) {
  const e = n.split(',').map(Number),
    t = [];
  for (let s = 0; s < e.length; s += 2)
    s + 1 < e.length && t.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < t.length - 1; s++) {
    const [o, i] = t[s],
      [a, l] = t[s + 1];
    r += Math.hypot(a - o, l - i);
  }
  return r;
}
function wl(n, e, t, r, s, o, i, a) {
  const l = lr * (s ? -1 : 1),
    c = lr * (o ? -1 : 1),
    u = n + l,
    d = t + c,
    f = [n, e, u, e, 0, 0, 0, 0, d, r, t, r],
    g = d - u;
  let m = r - e;
  const h = o === s;
  return (
    h ||
      (((d <= n + lr - 2 && o) || (d > n && !o)) &&
        (m = a ? m - i + 6 : m - i)),
    (h && o && u > d) || (h && !o && u < d)
      ? ((f[4] = f[2] + g), (f[5] = f[3]), (f[6] = f[4]), (f[7] = f[5] + m))
      : ((f[4] = f[2]), (f[5] = f[3] + m), (f[6] = f[4] + g), (f[7] = f[5])),
    f.join(',')
  );
}
function xl(n, e, t) {
  return t
    ? `${n - 5},${e - 3},${n - 5},${e + 3},${n},${e}`
    : `${n + 5},${e + 3},${n + 5},${e - 3},${n},${e}`;
}
function Ho(n) {
  return n.map((e) => {
    const t = e.id || zr();
    return { ...e, id: t };
  });
}
const Ao = ['start', 'end', 'duration'];
function yl(n, e) {
  const { type: t, unscheduled: r } = n;
  return r || t === 'summary'
    ? !Ao.includes(e)
    : t === 'milestone'
      ? !['end', 'duration'].includes(e)
      : !0;
}
function vl(n, e) {
  return typeof e == 'function'
    ? e
    : Ao.includes(n)
      ? (typeof e == 'string' && (e = { type: e, config: {} }),
        e.config || (e.config = {}),
        e.type === 'datepicker' && (e.config.buttons = ['today']),
        (t, r) => (yl(t, r.id) ? e : null))
      : e;
}
function kl(n) {
  return !n || !n.length
    ? []
    : n.map((e) => {
        const t = e.align || 'left',
          r = e.id === 'add-task',
          s = !r && e.flexgrow ? e.flexgrow : null,
          o = s ? 1 : e.width || (r ? 50 : 120),
          i = e.editor && vl(e.id, e.editor);
        return {
          width: o,
          align: t,
          header: e.header,
          id: e.id,
          template: e.template,
          _template: e._template,
          ...(s && { flexgrow: s }),
          cell: e.cell,
          resize: e.resize ?? !0,
          sort: e.sort ?? !r,
          ...(i && { editor: i }),
          ...(e.options && { options: e.options }),
        };
      });
}
const Lo = [
  { id: 'text', header: 'Task name', flexgrow: 1, sort: !0 },
  { id: 'start', header: 'Start date', align: 'center', sort: !0 },
  { id: 'duration', header: 'Duration', width: 100, align: 'center', sort: !0 },
  {
    id: 'add-task',
    header: 'Add task',
    width: 50,
    align: 'center',
    sort: !1,
    resize: !1,
  },
];
function Zt(n, e, t, r) {
  const { selected: s, tasks: o } = n.getState(),
    i = s.length,
    a = ['edit-task', 'paste-task', 'edit-task:task', 'edit-task:segment'],
    l = ['copy-task', 'cut-task'],
    c = [
      'copy-task',
      'cut-task',
      'delete-task',
      'indent-task:remove',
      'move-task:down',
    ],
    u = ['add-task', 'undo', 'redo'],
    d = ['indent-task:add', 'move-task:down', 'move-task:up'],
    f = { 'indent-task:remove': 2 },
    g = !i && u.includes(e),
    m = { parent: d.includes(e), level: f[e] };
  if (((t = t || (i ? s[s.length - 1] : null)), !(!t && !g))) {
    if (
      (e !== 'paste-task' && (n._temp = null),
      a.includes(e) || g || s.length === 1)
    )
      ys(n, e, t, r);
    else if (i) {
      const h = l.includes(e) ? s : bl(s, o, m);
      c.includes(e) && h.reverse();
      const x = n.getHistory();
      x && x.startBatch(),
        h.forEach((w, y) => ys(n, e, w, r, y)),
        x && x.endBatch();
    }
  }
}
function bl(n, e, t) {
  let r = n.map((s) => {
    const o = e.byId(s);
    return {
      id: s,
      level: o.$level,
      parent: o.parent,
      index: e.getIndexById(s),
    };
  });
  return (
    (t.parent || t.level) &&
      (r = r.filter(
        (s) => (t.level && s.level <= t.level) || !n.includes(s.parent),
      )),
    r.sort((s, o) => s.level - o.level || s.index - o.index),
    r.map((s) => s.id)
  );
}
function ys(n, e, t, r, s) {
  const o = n.exec ? n.exec : n.in.exec;
  let i = e.split(':')[0],
    a = e.split(':')[1];
  const l = t?.id || t;
  let c = { id: l },
    u = {},
    d = !1;
  if (i == 'copy-task' || i == 'cut-task') {
    n._temp || (n._temp = []), n._temp.push({ id: l, cut: i == 'cut-task' });
    return;
  } else if (i == 'paste-task') {
    if (n._temp && n._temp.length) {
      const f = n.getHistory();
      f && f.startBatch();
      const g = /* @__PURE__ */ new Map();
      if (
        (n._temp.forEach((m) => {
          const h = { id: m.id, target: l, mode: 'after' };
          o(m.cut ? 'move-task' : 'copy-task', h), g.set(m.id, h.id);
        }),
        !n._temp[0].cut)
      ) {
        const { links: m } = n.getState(),
          h = n._temp.map((w) => w.id),
          x = [];
        m.forEach((w) => {
          h.includes(w.source) && h.includes(w.target) && x.push(w);
        }),
          x.forEach((w) => {
            o('add-link', {
              link: {
                source: g.get(w.source),
                target: g.get(w.target),
                type: w.type,
              },
            });
          }),
          n._temp.forEach((w, y) => {
            o('select-task', { id: g.get(w.id), toggle: !!y });
          });
      }
      f && f.endBatch(), (n._temp = null);
    }
    return;
  } else
    i === 'add-task'
      ? ((u = {
          task: { type: 'task', text: r('New Task') },
          target: l,
          show: !0,
          select: !1,
        }),
        (c = {}),
        (d = !0))
      : i === 'edit-task'
        ? ((i = 'show-editor'),
          a === 'segment' && typeof t == 'object' && (u = t))
        : i === 'convert-task'
          ? ((i = 'update-task'), (u = { task: { type: a } }), (a = void 0))
          : i === 'indent-task' && (a = a === 'add');
  if (i === 'split-task' && typeof t == 'object') u = t;
  else if (i === 'delete-task' && a === 'segment' && typeof t == 'object') {
    const f = n.getTask(l),
      { segmentIndex: g } = t,
      m = f.segments.filter((h, x) => x !== g);
    o('update-task', { id: l, task: { segments: m } });
    return;
  }
  typeof a < 'u' && (u = { mode: a, ...u }),
    (c = { ...c, ...u }),
    o(i, c),
    d && o('select-task', { id: c.id, toggle: !!s });
}
function jr(n, e) {
  return n.some((t) => (t.data ? jr(t.data, e) : t.id === e));
}
const vs = (n, e) => St(n, e),
  Sl = (n, e) => Ur(n, e);
function Tr(n, e) {
  Array.isArray(n) &&
    (n.forEach((t) => zt(t, e)),
    n.forEach((t) => {
      if (t.type === 'summary' && !(t.start && t.end)) {
        const { start: r, end: s } = Gr(t, n);
        (t.start = r), (t.end = s), zt(t, e);
      }
    }));
}
function zt(n, e) {
  n.unscheduled || ks(n, e, !1), n.base_start && ks(n, e, !0);
}
function ks(n, e, t) {
  const { calendar: r, durationUnit: s } = e,
    o = s || 'day',
    [i, a, l] = Po(t);
  n.type === 'milestone'
    ? ((n[l] = 0), (n[a] = void 0))
    : n[i] &&
      (n[l]
        ? (n[a] = vs(o, r)(n[i], n[l]))
        : n[a]
          ? (n[l] = Sl(o, r)(n[a], n[i]))
          : ((n[a] = vs(o, r)(n[i], 1)), (n[l] = 1)));
}
function Po(n) {
  return n
    ? ['base_start', 'base_end', 'base_duration']
    : ['start', 'end', 'duration'];
}
function bs(n, e, t) {
  const [r, s, o] = Po(t);
  (e === o || e === r) && (n[s] = null),
    e === s &&
      ((n[o] = 0), n[r] && n[r] >= n[s] && ((n[s] = null), (n[o] = 1)));
}
function Oo(n, e, t) {
  bs(n, t, !1), n.base_start && bs(n, t, !0), zt(n, e);
}
class $l extends ga {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }),
      (this._router = new pa(
        super.setState.bind(this),
        [
          {
            in: ['tasks', 'start', 'end', 'scales', 'autoScale', 'markers'],
            out: ['_start', '_end'],
            exec: (s) => {
              const {
                _end: o,
                _start: i,
                start: a,
                end: l,
                tasks: c,
                scales: u,
                autoScale: d,
                markers: f,
              } = this.getState();
              if (!a || !l || d) {
                const g = nn(u).unit,
                  m = ll(a, l, d, g, c, f);
                (m._end != o || m._start != i) && this.setState(m, s);
              } else this.setState({ _start: a, _end: l }, s);
            },
          },
          {
            in: [
              '_start',
              '_end',
              'cellWidth',
              'scaleHeight',
              'scales',
              'lengthUnit',
              '_weekStart',
            ],
            out: ['_scales'],
            exec: (s) => {
              const o = this.getState();
              let { lengthUnit: i } = o;
              const {
                  _start: a,
                  _end: l,
                  cellWidth: c,
                  scaleHeight: u,
                  scales: d,
                  _weekStart: f,
                } = o,
                g = nn(d).unit;
              nl(g, i) || (i = g);
              const m = cl(a, l, i, c, u, f, d);
              this.setState({ _scales: m }, s);
            },
          },
          {
            in: [
              '_scales',
              'tasks',
              'cellHeight',
              'baselines',
              'unscheduledTasks',
            ],
            out: ['_tasks'],
            exec: (s) => {
              const {
                  cellWidth: o,
                  cellHeight: i,
                  tasks: a,
                  _scales: l,
                  baselines: c,
                  splitTasks: u,
                  unscheduledTasks: d,
                } = this.getState(),
                f = a
                  .toArray()
                  .map((g, m) =>
                    Ro(g, m, {
                      cellWidth: o,
                      cellHeight: i,
                      _scales: l,
                      baselines: c,
                      splitTasks: u,
                      unscheduledTasks: d,
                    }),
                  );
              this.setState({ _tasks: f }, s);
            },
          },
          {
            in: ['_tasks', 'links', 'cellHeight'],
            out: ['_links'],
            exec: (s) => {
              const {
                  tasks: o,
                  links: i,
                  cellHeight: a,
                  baselines: l,
                  criticalPath: c,
                } = this.getState(),
                u = i
                  .map((d) => {
                    const f = o.byId(d.source),
                      g = o.byId(d.target);
                    return pl(d, f, g, a, l);
                  })
                  .toSorted((d, f) =>
                    c
                      ? !!d.$critical == !!f.$critical
                        ? f.$pl - d.$pl
                        : d.$critical
                          ? 1
                          : -1
                      : f.$pl - d.$pl,
                  )
                  .filter((d) => d !== null);
              this.setState({ _links: u }, s);
            },
          },
          {
            in: ['tasks', 'activeTask'],
            out: ['_activeTask'],
            exec: (s) => {
              const o = this.getState();
              let { activeTask: i } = o;
              i && typeof i == 'object' && (i = i.id);
              const a = o.tasks.byId(i);
              this.setState({ _activeTask: a || null }, s);
            },
          },
          {
            in: ['tasks', 'selected'],
            out: ['_selected'],
            exec: (s) => {
              const { tasks: o, selected: i } = this.getState(),
                a = i.map((l) => o.byId(l)).filter((l) => !!l);
              this.setState({ _selected: a }, s);
            },
          },
          {
            in: ['start', 'end'],
            out: ['cellWidth'],
            exec: (s) => {
              const { _cellWidth: o, cellWidth: i } = this.getState();
              o != i && this.setState({ cellWidth: o }, s);
            },
          },
        ],
        {
          tasks: (s) => new ba(s),
          links: (s) => new gs(s),
          columns: (s) => kl(s),
        },
      ));
    const t = (this.in = new ma());
    t.on('show-editor', (s) => {
      const { splitTasks: o } = this.getState();
      if (o) {
        const { id: i, segmentIndex: a } = s;
        if (i && (a || a === 0)) {
          this.setStateAsync({ activeTask: { id: i, segmentIndex: a } });
          return;
        }
      }
      this.setStateAsync({ activeTask: s.id });
    }),
      t.on(
        'select-task',
        ({ id: s, toggle: o, range: i, show: a, segmentIndex: l }) => {
          const {
            selected: c,
            _tasks: u,
            activeTask: d,
            splitTasks: f,
          } = this.getState();
          let g = !1,
            m;
          if (c.length && (o || i)) {
            const x = [...c];
            if (i) {
              const w = x[x.length - 1],
                y = u.findIndex((_) => _.id == w),
                b = u.findIndex((_) => _.id == s),
                v = Math.min(y, b),
                M = Math.max(y, b) + 1,
                S = u.slice(v, M).map((_) => _.id);
              y > b && S.reverse(),
                S.forEach((_) => {
                  x.includes(_) || x.push(_);
                });
            } else if (o) {
              const w = x.findIndex((y) => y == s);
              w === -1 ? x.push(s) : ((g = !0), x.splice(w, 1));
            }
            m = x;
          } else m = [s];
          const h = { selected: m };
          a && m.length && (h._scrollTask = { id: m[0], mode: a }),
            this.setStateAsync(h),
            !g &&
              d &&
              (d !== s || f) &&
              t.exec('show-editor', { id: s, ...(f && { segmentIndex: l }) });
        },
      ),
      t.on('delete-link', ({ id: s }) => {
        const { links: o } = this.getState();
        o.remove(s), this.setStateAsync({ links: o });
      }),
      t.on('update-link', (s) => {
        const { links: o } = this.getState(),
          i = s.id;
        let a = s.link;
        o.update(i, a),
          (a = o.byId(i)),
          !a.lag && a.lag !== 0 && delete a.lag,
          this.setStateAsync({ links: o }),
          (s.link = a);
      }),
      t.on('add-link', (s) => {
        const { link: o } = s,
          { links: i } = this.getState();
        !o.source ||
          !o.target ||
          (o.type || (o.type = 'e2s'),
          (o.id = o.id || zr()),
          i.add(o),
          this.setStateAsync({ links: i }),
          (s.id = o.id),
          (s.link = i.byId(o.id)));
      });
    let r = null;
    t.on('move-task', (s) => {
      const { tasks: o } = this.getState();
      let { mode: i, target: a } = s;
      const { id: l, inProgress: c } = s,
        u = o.byId(l);
      if (
        (typeof c > 'u'
          ? (s.source = u.parent)
          : (s.source = r = r ?? u.parent),
        c === !1)
      ) {
        o.update(u.id, { $reorder: !1 }),
          this.setState({ tasks: o }),
          (r = null);
        return;
      }
      if (a === l || o.contains(l, a)) {
        s.skipProvider = !0;
        return;
      }
      if (i === 'up' || i === 'down') {
        const d = o.getBranch(l);
        let f = o.getIndexById(l);
        if (i === 'up') {
          const g = u.parent === 0;
          if (f === 0 && g) {
            s.skipProvider = !0;
            return;
          }
          (f -= 1), (i = 'before');
        } else if (i === 'down') {
          const g = f === d.length - 1,
            m = u.parent === 0;
          if (g && m) {
            s.skipProvider = !0;
            return;
          }
          (f += 1), (i = 'after');
        }
        if (((a = (d[f] && d[f].id) || u.parent), a)) {
          const g = o.getBranch(a);
          let m = o.getIndexById(a),
            h = g[m];
          if (h.data) {
            if (i === 'before') {
              if (h.parent === u.parent) {
                for (; h.data; )
                  h.open || t.exec('open-task', { id: h.id, mode: !0 }),
                    (h = h.data[h.data.length - 1]);
                a = h.id;
              }
            } else if (i === 'after') {
              let y;
              h.parent === u.parent
                ? ((y = h), (h = h.data[0]), (a = h.id), (i = 'before'))
                : g.length - 1 !== m &&
                  ((y = h),
                  (m += 1),
                  (h = g[m]),
                  u.$level > h.$level && h.data
                    ? ((y = h), (h = h.data[0]), (a = h.id), (i = 'before'))
                    : (a = h.id)),
                y && !y.open && t.exec('open-task', { id: y.id, mode: !0 });
            }
          }
          const x = o.getSummaryId(u.id);
          o.move(l, i, a);
          const w = o.getSummaryId(l);
          x != w &&
            (x && this.resetSummaryDates(x, 'move-task'),
            w && this.resetSummaryDates(w, 'move-task'));
        }
      } else {
        const d = o.byId(a);
        let f = d,
          g = !1;
        for (; f.$level > u.$level; )
          (f = o.byId(f.parent)), f.id === l && (g = !0);
        if (g) return;
        const m = o.getSummaryId(u.id);
        if ((o.move(l, i, a), i == 'child')) {
          let x = d;
          for (; x.id !== 0 && !x.open; )
            t.exec('open-task', { id: x.id, mode: !0 }), (x = o.byId(x.parent));
        }
        const h = o.getSummaryId(l);
        m != h &&
          (m && this.resetSummaryDates(m, 'move-task'),
          h && this.resetSummaryDates(h, 'move-task'));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }),
        (s.target = a),
        (s.mode = i);
    }),
      t.on('drag-task', (s) => {
        const o = this.getState(),
          {
            tasks: i,
            _tasks: a,
            _selected: l,
            _scales: c,
            cellWidth: u,
            cellHeight: d,
          } = o,
          f = i.byId(s.id),
          { left: g, top: m, width: h, start: x, inProgress: w } = s,
          y = { _tasks: a, _selected: l };
        if (
          (typeof h < 'u' &&
            ((f.$w = h), Nr(i, f, { _scales: c, cellWidth: u })),
          typeof g < 'u')
        ) {
          if (f.type === 'summary') {
            const b = g - f.$x;
            To(f, b, { _scales: c, cellWidth: u });
          }
          (f.$x = g), Nr(i, f, { _scales: c, cellWidth: u, cellHeight: d }, !x);
        }
        typeof m < 'u' && ((f.$y = m + 4), (f.$reorder = w)), this.setState(y);
      }),
      t.on('update-task', (s) => {
        const { id: o, segmentIndex: i, diff: a, eventSource: l } = s;
        let { task: c } = s;
        const {
            tasks: u,
            _scales: d,
            durationUnit: f,
            splitTasks: g,
            calendar: m,
          } = this.getState(),
          h = u.byId(o),
          x = { durationUnit: f, calendar: m };
        if (
          l === 'add-task' ||
          l === 'copy-task' ||
          l === 'move-task' ||
          l === 'update-task' ||
          l === 'delete-task' ||
          l === 'provide-data'
        ) {
          zt(c, x), u.update(o, c);
          return;
        }
        const w = d.lengthUnit;
        let y = St(w);
        const b = Ur(f, m);
        if (
          (a &&
            (c.start && (c.start = y(c.start, a)),
            !i &&
              i !== 0 &&
              (c.start && c.end
                ? (c.duration = h.duration)
                : (c.start
                    ? (c.end = h.end)
                    : ((c.end = y(c.end, a)),
                      (c.start = h.start),
                      (c.duration = b(c.end, c.start))),
                  b(c.end, c.start) || (c.duration = 1)))),
          (c.type = c.type ?? h.type),
          m && c.start && (c.start = ar(c.start, a, m)),
          c.start &&
            c.end &&
            (!Qt(c.start, h.start) || !Qt(c.end, h.end)) &&
            c.type === 'summary' &&
            h.data?.length)
        ) {
          let M = a || b(c.start, h.start);
          m &&
            ((M =
              c.start > h.start ? b(c.start, h.start) : -b(h.start, c.start)),
            (y = al(m))),
            this.moveSummaryKids(
              h,
              (S) => ((S = y(S, M)), m ? ar(S, a, m) : S),
              'update-task',
            );
        }
        c.start || (c.start = h.start),
          !c.end && !c.duration && (c.duration = h.duration),
          zt(c, x),
          u.update(o, c),
          ((m && c.type === 'summary') ||
            (c.type === 'summary' && h.type !== 'summary')) &&
            this.resetSummaryDates(o, 'update-task', !0);
        const v = u.getSummaryId(o);
        v && this.resetSummaryDates(v, 'update-task'),
          this.setStateAsync({ tasks: u }),
          (s.task = u.byId(o));
      }),
      t.on('add-task', (s) => {
        const {
            tasks: o,
            _scales: i,
            unscheduledTasks: a,
            durationUnit: l,
            splitTasks: c,
            calendar: u,
          } = this.getState(),
          { target: d, mode: f, task: g, show: m, select: h = !0 } = s;
        !s.eventSource && a && (g.unscheduled = !0);
        let x = -1,
          w,
          y;
        if (
          (d
            ? ((y = o.byId(d)),
              f == 'child'
                ? ((w = y), (g.parent = w.id))
                : (y.parent !== null &&
                    ((w = o.byId(y.parent)), (g.parent = w.id)),
                  (x = o.getIndexById(d)),
                  f == 'after' && (x += 1)))
            : g.parent && (w = o.byId(g.parent)),
          !g.start)
        ) {
          if (w?.start) g.start = new Date(w.start.valueOf());
          else if (y) g.start = new Date(y.start.valueOf());
          else {
            const S = o.getBranch(0);
            let _;
            if (S?.length) {
              const T = S[S.length - 1];
              if (!T.$skip) {
                const X = new Date(T.start.valueOf());
                i.start <= X && (_ = X);
              }
            }
            g.start = _ || St(l, u)(i.start, 1);
          }
          g.duration = 1;
        }
        u && (g.start = ar(g.start, 1, u)),
          this.getState().baselines &&
            ((g.base_start = g.start), (g.base_duration = g.duration)),
          zt(g, { durationUnit: l, calendar: u });
        const b = o.add(g, x),
          v = { tasks: o };
        if (w && m) {
          for (; w && w.id; )
            t.exec('open-task', { id: w.id, mode: !0 }), (w = o.byId(w.parent));
          v._scrollTask = { id: b.id, mode: m };
        }
        s.id = b.id;
        const M = o.getSummaryId(b.id);
        M && this.resetSummaryDates(M, 'add-task'),
          this.setStateAsync(v),
          (s.id = b.id),
          (s.task = b),
          h && t.exec('select-task', { id: b.id });
      }),
      t.on('delete-task', (s) => {
        const { id: o } = s,
          { tasks: i, links: a, selected: l } = this.getState();
        s.source = i.byId(o).parent;
        const c = i.getSummaryId(o),
          u = [o];
        i.eachChild((f) => u.push(f.id), o),
          a.filter((f) => !(u.includes(f.source) || u.includes(f.target)));
        const d = { tasks: i, links: a };
        l.includes(o) && (d.selected = l.filter((f) => f !== o)),
          i.remove(o),
          c && this.resetSummaryDates(c, 'delete-task'),
          this.setStateAsync(d);
      }),
      t.on('indent-task', ({ id: s, mode: o }) => {
        const { tasks: i } = this.getState();
        if (o) {
          const a = i.getBranch(s)[i.getIndexById(s) - 1];
          a && t.exec('move-task', { id: s, mode: 'child', target: a.id });
        } else {
          const a = i.byId(s),
            l = i.byId(a.parent);
          l &&
            l.parent !== null &&
            t.exec('move-task', { id: s, mode: 'after', target: a.parent });
        }
      }),
      t.on('copy-task', (s) => {
        const { id: o, target: i, mode: a, eventSource: l } = s;
        if (l === 'copy-task') return;
        const { tasks: c, links: u } = this.getState();
        if (c.contains(o, i)) {
          s.skipProvider = !0;
          return;
        }
        const d = c.getSummaryId(o),
          f = c.getSummaryId(i);
        let g = c.getIndexById(i);
        a == 'before' && (g -= 1);
        const m = c.byId(o),
          h = c.copy(m, c.byId(i).parent, g + 1);
        (s.source = s.id),
          (s.id = h[0][1]),
          m.lazy && (s.lazy = !0),
          d != f && f && this.resetSummaryDates(f, 'copy-task');
        let x = [];
        for (let w = 1; w < h.length; w++) {
          const [y, b] = h[w];
          u.forEach((v) => {
            if (v.source === y) {
              const M = { ...v };
              delete M.target, x.push({ ...M, source: b });
            } else if (v.target === y) {
              const M = { ...v };
              delete M.source, x.push({ ...M, target: b });
            }
          });
        }
        x = x.reduce((w, y) => {
          const b = w.findIndex((v) => v.id === y.id);
          return b > -1 ? (w[b] = { ...w[b], ...y }) : w.push(y), w;
        }, []);
        for (let w = 1; w < h.length; w++) {
          const [y, b] = h[w],
            v = c.byId(b);
          t.exec('copy-task', {
            source: y,
            id: b,
            lazy: !!v.lazy,
            eventSource: 'copy-task',
            target: v.parent,
            mode: 'child',
            skipUndo: !0,
          });
        }
        x.forEach((w) => {
          t.exec('add-link', {
            link: { source: w.source, target: w.target, type: w.type },
            eventSource: 'copy-task',
            skipUndo: !0,
          });
        }),
          this.setStateAsync({ tasks: c });
      }),
      t.on('open-task', ({ id: s, mode: o }) => {
        const { tasks: i } = this.getState(),
          a = i.byId(s);
        a.lazy
          ? t.exec('request-data', { id: a.id })
          : (i.toArray().forEach((l) => (l.$y = 0)),
            i.update(s, { open: o }),
            this.setState({ tasks: i }));
      }),
      t.on('scroll-chart', ({ left: s, top: o }) => {
        if (!isNaN(s)) {
          const i = this.calcScaleDate(s);
          this.setState({ scrollLeft: s, _scaleDate: i });
        }
        isNaN(o) || this.setState({ scrollTop: o });
      }),
      t.on('render-data', (s) => {
        this.setState({ area: s });
      }),
      t.on('provide-data', (s) => {
        const {
            tasks: o,
            links: i,
            durationUnit: a,
            calendar: l,
            splitTasks: c,
          } = this.getState(),
          u = o.byId(s.id);
        u.lazy ? ((u.lazy = !1), (u.open = !0)) : (u.data = []),
          Tr(s.data.tasks, { durationUnit: a, calendar: l }),
          o.parse(s.data.tasks, s.id),
          u.type == 'summary' && this.resetSummaryDates(u.id, 'provide-data'),
          this.setStateAsync({
            tasks: o,
            links: new gs(i.map((d) => d).concat(Ho(s.data.links))),
          });
      }),
      t.on('zoom-scale', ({ dir: s, offset: o }) => {
        const {
            zoom: i,
            cellWidth: a,
            _cellWidth: l,
            scrollLeft: c,
          } = this.getState(),
          u = o + c,
          d = this.calcScaleDate(u);
        let f = a;
        s < 0 && (f = l || a);
        const g = f + s * 50,
          m = i.levels[i.level],
          h = s < 0 && a > m.maxCellWidth;
        if (g < m.minCellWidth || g > m.maxCellWidth || h) {
          if (!this.changeScale(i, s)) return;
        } else this.setState({ cellWidth: g, _cellWidth: g });
        const {
            _scales: x,
            _start: w,
            cellWidth: y,
            _weekStart: b,
          } = this.getState(),
          v = Tt(x.minUnit, w, b),
          M = x.diff(d, v, 'hour');
        typeof o > 'u' && (o = y);
        let S = Math.round(M * y) - o;
        S < 0 && (S = 0),
          this.setState({ scrollLeft: S, _scaleDate: d, _zoomOffset: o });
      }),
      t.on('expand-scale', ({ minWidth: s }) => {
        const {
            _start: o,
            _scales: i,
            start: a,
            end: l,
            _end: c,
            cellWidth: u,
            _scaleDate: d,
            _zoomOffset: f,
          } = this.getState(),
          g = St(i.minUnit);
        let m = i.width;
        if (a && l) {
          if (m < s && m) {
            const b = s / m;
            this.setState({ cellWidth: u * b });
          }
          return !0;
        }
        let h = 0;
        for (; m < s; ) (m += u), h++;
        const x = h && l ? -h : 0,
          w = a || g(o, x);
        let y = 0;
        if (d) {
          const b = i.diff(d, w, 'hour');
          y = Math.max(0, Math.round(b * u) - (f || 0));
        }
        this.setState({ _start: w, _end: l || g(c, h), scrollLeft: y });
      }),
      t.on('sort-tasks', ({ key: s, order: o, add: i }) => {
        const a = this.getState(),
          { tasks: l } = a;
        let c = a._sort;
        const u = { key: s, order: o };
        let d = c?.length || 0;
        d && i
          ? (c.forEach((f, g) => {
              f.key === s && (d = g);
            }),
            (c[d] = u))
          : (c = [u]),
          l.sort(c),
          this.setState({ _sort: c, tasks: l });
      }),
      t.on('hotkey', ({ key: s, event: o, eventSource: i }) => {
        switch (s) {
          case 'arrowup':
          case 'arrowdown': {
            const { selected: a, _tasks: l } = this.getState();
            o.preventDefault();
            const c = a.length;
            let u;
            if (
              (s === 'arrowup'
                ? (u = c ? this.getPrevRow(a[c - 1])?.id : l[l.length - 1]?.id)
                : (u = c ? this.getNextRow(a[c - 1])?.id : l[0]?.id),
              u)
            ) {
              const d = i === 'chart' ? 'xy' : !0;
              this.in.exec('select-task', { id: u, show: d });
            }
            break;
          }
          case 'ctrl+c': {
            Zt(this, 'copy-task', null, null);
            break;
          }
          case 'ctrl+x': {
            Zt(this, 'cut-task', null, null);
            break;
          }
          case 'ctrl+v': {
            Zt(this, 'paste-task', null, null);
            break;
          }
          case 'ctrl+d':
          case 'backspace': {
            o.preventDefault(), Zt(this, 'delete-task', null, null);
            break;
          }
          case 'ctrl+z': {
            this.in.exec('undo', {});
            break;
          }
          case 'ctrl+y': {
            this.in.exec('redo', {});
            break;
          }
        }
      });
  }
  init(e) {
    const t = this.getState().area
      ? {}
      : { scrollLeft: 0, scrollTop: 0, area: { from: 0, start: 0, end: 0 } };
    e.cellWidth && (e._cellWidth = e.cellWidth),
      (e._sort = null),
      (e.unscheduledTasks = !1),
      (e.baselines = !1),
      (e.markers = []),
      (e._markers = []),
      (e.undo = !1),
      (e.schedule = {}),
      (e.criticalPath = null),
      (e.splitTasks = !1),
      (e.summary = {}),
      Array.isArray(e.tasks) && this.getHistory()?.resetHistory(),
      this._router.init({
        _scrollTask: null,
        selected: [],
        markers: [],
        autoScale: !0,
        durationUnit: 'day',
        ...t,
        ...e,
      });
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
    return this.getState().undo ? this._modules.get('historyManager') : null;
  }
  serialize() {
    return this.getState().tasks.serialize();
  }
  changeScale(e, t) {
    const r = e.level + t,
      s = e.levels[r];
    if (s) {
      const { cellWidth: o, scales: i, _scales: a } = this.getState(),
        l = dl(e, t, r, s, a.lengthUnit, i, o);
      return (l._cellWidth = l.cellWidth), this.setState(l), !0;
    }
    return !1;
  }
  isScheduled(e) {
    return this.getState().unscheduledTasks
      ? e.some((t) => !t.unscheduled || (t.data && this.isScheduled(t.data)))
      : !0;
  }
  resetSummaryDates(e, t, r) {
    const {
        tasks: s,
        durationUnit: o,
        splitTasks: i,
        calendar: a,
      } = this.getState(),
      l = s.byId(e),
      c = l.data;
    if (c?.length && this.isScheduled(c)) {
      const u = Gr({ ...l, start: void 0, end: void 0, duration: void 0 });
      if (!Qt(l.start, u.start) || !Qt(l.end, u.end)) {
        r
          ? (zt(u, { durationUnit: o, calendar: a }), s.update(e, u))
          : this.in.exec('update-task', {
              id: e,
              task: u,
              eventSource: t,
              skipUndo: !0,
            });
        const d = s.getSummaryId(e);
        d && this.resetSummaryDates(d, t);
      }
    }
  }
  moveSummaryKids(e, t, r) {
    const { tasks: s } = this.getState();
    e.data.forEach((o) => {
      const i = { ...s.byId(o.id), start: t(o.start) };
      delete i.end,
        delete i.id,
        this.in.exec('update-task', {
          id: o.id,
          task: i,
          eventSource: r,
          skipUndo: !0,
        }),
        o.data?.length && this.moveSummaryKids(o, t, r);
    });
  }
  calcScaleDate(e) {
    const { _scales: t, _start: r, _weekStart: s } = this.getState(),
      o = t.lengthUnit === 'day' ? t.lengthUnitWidth / 24 : t.lengthUnitWidth;
    return St('hour')(Tt(t.minUnit, r, s), Math.floor(e / o));
  }
  getNextRow(e) {
    const t = this.getState()._tasks,
      r = t.findIndex((s) => s.id == e);
    return t[r + 1];
  }
  getPrevRow(e) {
    const t = this.getState()._tasks,
      r = t.findIndex((s) => s.id == e);
    return t[r - 1];
  }
}
function Cl(n, e, t, r) {
  if (typeof document > 'u') return '';
  const s = document.createElement('canvas');
  {
    const o = _l(s, n, e, 1, t);
    Nl(o, r, 0, n, 0, e);
  }
  return s.toDataURL();
}
function _l(n, e, t, r, s) {
  n.setAttribute('width', (e * r).toString()),
    n.setAttribute('height', (t * r).toString());
  const o = n.getContext('2d');
  return o.translate(-0.5, -0.5), (o.strokeStyle = s), o;
}
function Nl(n, e, t, r, s, o) {
  n.beginPath(),
    n.moveTo(r, s),
    n.lineTo(r, o),
    e === 'full' && n.lineTo(t, o),
    n.stroke();
}
const Jn = [
  { id: 'task', label: 'Task' },
  { id: 'summary', label: 'Summary task' },
  { id: 'milestone', label: 'Milestone' },
];
function Dr(n) {
  let e = [...zo];
  const t = n?.taskTypes || Jn,
    r = e.find((s) => s.id == 'convert-task');
  return (
    (r.data = []),
    t.forEach((s) => {
      (!n?.summary?.autoConvert || s.id !== 'summary') &&
        r.data.push(r.dataFactory(s));
    }),
    e
  );
}
function Kr(n) {
  return n.map((e) => {
    switch ((e.data && Kr(e.data), e.id)) {
      case 'add-task:before':
      case 'move-task:up':
        e.isDisabled = (t, r) => Tl(t, r);
        break;
      case 'move-task:down':
        e.isDisabled = (t, r) => Dl(t, r);
        break;
      case 'indent-task:add':
        e.isDisabled = (t, r) => El(t, r) === t.parent;
        break;
      case 'indent-task:remove':
        e.isDisabled = (t) => Ml(t);
        break;
    }
    return e;
  });
}
function Ml(n) {
  return n.parent === 0;
}
function Tl(n, e) {
  const { _tasks: t } = e;
  return t[0]?.id === n.id;
}
function Dl(n, e) {
  const { _tasks: t } = e;
  return t[t.length - 1]?.id === n.id;
}
function El(n, e) {
  const { _tasks: t } = e,
    r = t.findIndex((s) => s.id === n.id);
  return t[r - 1]?.id ?? n.parent;
}
function Ss(n) {
  return n && typeof n == 'object';
}
function Rl(n) {
  return !n.selected || n.selected.length < 2;
}
const Il = (n) => (e) => e.type === n,
  zo = Kr([
    {
      id: 'add-task',
      text: 'Add',
      icon: 'wxi-plus',
      data: [
        { id: 'add-task:child', text: 'Child task' },
        { id: 'add-task:before', text: 'Task above' },
        { id: 'add-task:after', text: 'Task below' },
      ],
    },
    { type: 'separator' },
    {
      id: 'convert-task',
      text: 'Convert to',
      icon: 'wxi-swap-horizontal',
      dataFactory: (n) => ({
        id: `convert-task:${n.id}`,
        text: `${n.label}`,
        isDisabled: Il(n.id),
      }),
    },
    {
      id: 'edit-task',
      text: 'Edit',
      icon: 'wxi-edit',
      isHidden: (n, e, t) => Ss(t),
    },
    { type: 'separator' },
    { id: 'cut-task', text: 'Cut', icon: 'wxi-content-cut', subtext: 'Ctrl+X' },
    {
      id: 'copy-task',
      text: 'Copy',
      icon: 'wxi-content-copy',
      subtext: 'Ctrl+C',
    },
    {
      id: 'paste-task',
      text: 'Paste',
      icon: 'wxi-content-paste',
      subtext: 'Ctrl+V',
    },
    {
      id: 'move-task',
      text: 'Move',
      icon: 'wxi-swap-vertical',
      data: [
        { id: 'move-task:up', text: 'Up' },
        { id: 'move-task:down', text: 'Down' },
      ],
    },
    { type: 'separator' },
    { id: 'indent-task:add', text: 'Indent', icon: 'wxi-indent' },
    { id: 'indent-task:remove', text: 'Outdent', icon: 'wxi-unindent' },
    { type: 'separator' },
    {
      id: 'delete-task',
      icon: 'wxi-delete',
      text: 'Delete',
      subtext: 'Ctrl+D / BS',
      isHidden: (n, e, t) => Rl(e) && Ss(t),
    },
  ]);
function Er(n) {
  return [...Wo];
}
const Wo = Kr([
  {
    id: 'add-task',
    comp: 'button',
    icon: 'wxi-plus',
    text: 'New task',
    type: 'primary',
  },
  {
    id: 'edit-task',
    comp: 'icon',
    icon: 'wxi-edit',
    menuText: 'Edit',
    text: 'Ctrl+E',
  },
  {
    id: 'delete-task',
    comp: 'icon',
    icon: 'wxi-delete',
    menuText: 'Delete',
    text: 'Ctrl+D, Backspace',
  },
  { comp: 'separator' },
  {
    id: 'move-task:up',
    comp: 'icon',
    icon: 'wxi-angle-up',
    menuText: 'Move up',
  },
  {
    id: 'move-task:down',
    comp: 'icon',
    icon: 'wxi-angle-down',
    menuText: 'Move down',
  },
  { comp: 'separator' },
  {
    id: 'copy-task',
    comp: 'icon',
    icon: 'wxi-content-copy',
    menuText: 'Copy',
    text: 'Ctrl+V',
  },
  {
    id: 'cut-task',
    comp: 'icon',
    icon: 'wxi-content-cut',
    menuText: 'Cut',
    text: 'Ctrl+X',
  },
  {
    id: 'paste-task',
    comp: 'icon',
    icon: 'wxi-content-paste',
    menuText: 'Paste',
    text: 'Ctrl+V',
  },
  { comp: 'separator' },
  {
    id: 'indent-task:add',
    comp: 'icon',
    icon: 'wxi-indent',
    menuText: 'Indent',
  },
  {
    id: 'indent-task:remove',
    comp: 'icon',
    icon: 'wxi-unindent',
    menuText: 'Outdent',
  },
]);
function cr(n) {
  return n.type === 'summary';
}
function ur(n) {
  return n.type === 'milestone';
}
function dr(n) {
  return typeof n.parent > 'u';
}
function fr(n, e) {
  return e.unscheduledTasks && n.unscheduled;
}
function Fo(n) {
  const e = Yo.map((r) => ({ ...r })),
    t = e.find((r) => r.key == 'type');
  return (t.options = n?.taskTypes || Jn), e;
}
const Yo = [
    {
      key: 'text',
      comp: 'text',
      label: 'Name',
      config: { placeholder: 'Add task name' },
    },
    {
      key: 'details',
      comp: 'textarea',
      label: 'Description',
      config: { placeholder: 'Add description' },
    },
    { key: 'type', comp: 'select', label: 'Type', isHidden: (n) => dr(n) },
    {
      key: 'start',
      comp: 'date',
      label: 'Start date',
      isHidden: (n) => cr(n),
      isDisabled: fr,
    },
    {
      key: 'end',
      comp: 'date',
      label: 'End date',
      isHidden: (n) => cr(n) || ur(n),
      isDisabled: fr,
    },
    {
      key: 'duration',
      comp: 'counter',
      label: 'Duration',
      config: { min: 1 },
      isHidden: (n) => cr(n) || ur(n),
      isDisabled: fr,
    },
    {
      key: 'progress',
      comp: 'slider',
      label: 'Progress',
      config: { min: 1, max: 100 },
      isHidden: (n) => ur(n) || dr(n),
    },
    { key: 'links', comp: 'links', label: '', isHidden: (n) => dr(n) },
  ],
  Et = rn(null);
/* @__PURE__ */ new Date().valueOf();
function Hl(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t],
      s = e[t];
    if (!Sn(r, s)) return !1;
  }
  return !0;
}
function Sn(n, e) {
  if (
    typeof n == 'number' ||
    typeof n == 'string' ||
    typeof n == 'boolean' ||
    n === null
  )
    return n === e;
  if (
    typeof n != typeof e ||
    ((n === null || e === null) && n !== e) ||
    (n instanceof Date && e instanceof Date && n.getTime() !== e.getTime())
  )
    return !1;
  if (typeof n == 'object')
    if (Array.isArray(n) && Array.isArray(e)) {
      if (n.length !== e.length) return !1;
      for (let t = n.length - 1; t >= 0; t--) if (!Sn(n[t], e[t])) return !1;
      return !0;
    } else return Hl(n, e);
  return n === e;
}
function Rr(n) {
  if (typeof n != 'object' || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(Rr);
  const e = {};
  for (const t in n) e[t] = Rr(n[t]);
  return e;
}
var Bo = 2,
  Al = class {
    constructor(e) {
      e && ((this._writable = e.writable), (this._async = e.async)),
        (this._values = {}),
        (this._state = {});
    }
    setState(e, t = 0) {
      const r = {};
      return this._wrapProperties(e, this._state, this._values, '', r, t), r;
    }
    getState() {
      return this._values;
    }
    getReactive() {
      return this._state;
    }
    _wrapProperties(e, t, r, s, o, i) {
      for (const a in e) {
        const l = t[a],
          c = r[a],
          u = e[a];
        if (
          l &&
          ((c === u && typeof u != 'object') ||
            (u instanceof Date &&
              c instanceof Date &&
              c.getTime() === u.getTime()))
        )
          continue;
        const d = s + (s ? '.' : '') + a;
        l
          ? (l.__parse(u, d, o, i) && (r[a] = u),
            i & Bo ? (o[d] = l.__trigger) : l.__trigger())
          : (u && u.__reactive
              ? (t[a] = this._wrapNested(u, u, d, o))
              : (t[a] = this._wrapWritable(u)),
            (r[a] = u)),
          (o[d] = o[d] || null);
      }
    }
    _wrapNested(e, t, r, s) {
      const o = this._wrapWritable(e);
      return (
        this._wrapProperties(e, o, t, r, s, 0),
        (o.__parse = (i, a, l, c) => (
          this._wrapProperties(i, o, t, a, l, c), !1
        )),
        o
      );
    }
    _wrapWritable(e) {
      const t = [],
        r = function () {
          for (let s = 0; s < t.length; s++) t[s](e);
        };
      return {
        subscribe: (s) => (
          t.push(s),
          this._async ? setTimeout(s, 1, e) : s(e),
          () => {
            const o = t.indexOf(s);
            o >= 0 && t.splice(o, 1);
          }
        ),
        __trigger: () => {
          t.length && (this._async ? setTimeout(r, 1) : r());
        },
        __parse: function (s) {
          return (e = s), !0;
        },
      };
    }
  },
  Ll = class {
    constructor(e, t, r, s) {
      typeof e == 'function'
        ? (this._setter = e)
        : (this._setter = e.setState.bind(e)),
        (this._routes = t),
        (this._parsers = r),
        (this._prev = {}),
        (this._triggers = /* @__PURE__ */ new Map()),
        (this._sources = /* @__PURE__ */ new Map()),
        this._routes.forEach((o) => {
          o.in.forEach((i) => {
            const a = this._triggers.get(i) || [];
            a.push(o), this._triggers.set(i, a);
          }),
            o.out.forEach((i) => {
              const a = this._sources.get(i) || {};
              o.in.forEach((l) => (a[l] = !0)), this._sources.set(i, a);
            });
        }),
        this._routes.forEach((o) => {
          o.length = Math.max(...o.in.map((i) => Vo(i, this._sources, 1)));
        }),
        (this._bus = s);
    }
    init(e) {
      const t = {};
      for (const r in e)
        if (this._prev[r] !== e[r]) {
          const s = this._parsers[r];
          t[r] = s ? s(e[r]) : e[r];
        }
      (this._prev = this._prev ? { ...this._prev, ...e } : { ...e }),
        this.setState(t),
        this._bus && this._bus.exec('init-state', t);
    }
    setStateAsync(e) {
      const t = this._setter(e, Bo);
      return (
        this._async
          ? Object.assign(this._async.signals, t)
          : (this._async = {
              signals: t,
              timer: setTimeout(this._applyState.bind(this), 1),
            }),
        t
      );
    }
    _applyState() {
      const e = this._async;
      if (e) {
        (this._async = null), this._triggerUpdates(e.signals, []);
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
      const r = Object.keys(e),
        s = !t.length;
      t = t || [];
      for (let o = 0; o < r.length; o++) {
        const i = r[o],
          a = this._triggers.get(i);
        a &&
          a.forEach((l) => {
            t.indexOf(l) == -1 && t.push(l);
          });
      }
      s && this._execNext(t);
    }
    _execNext(e) {
      for (; e.length; ) {
        e.sort((r, s) => (r.length < s.length ? 1 : -1));
        const t = e[e.length - 1];
        e.splice(e.length - 1), t.exec(e);
      }
    }
  };
function Vo(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => Vo(o, e, t + 1));
  return Math.max(...s);
}
var Pl = class {
  constructor() {
    (this._nextHandler = null),
      (this._handlers = {}),
      (this._tag = /* @__PURE__ */ new WeakMap()),
      (this.exec = this.exec.bind(this));
  }
  on(n, e, t) {
    let r = this._handlers[n];
    r
      ? t && t.intercept
        ? r.unshift(e)
        : r.push(e)
      : (r = this._handlers[n] = [e]),
      t && t.tag && this._tag.set(e, t.tag);
  }
  intercept(n, e, t) {
    this.on(n, e, { ...t, intercept: !0 });
  }
  detach(n) {
    for (const e in this._handlers) {
      const t = this._handlers[e];
      for (let r = t.length - 1; r >= 0; r--)
        this._tag.get(t[r]) === n && t.splice(r, 1);
    }
  }
  async exec(n, e) {
    const t = this._handlers[n];
    if (t)
      for (let r = 0; r < t.length; r++) {
        const s = t[r](e);
        if (s === !1 || (s && s.then && (await s) === !1)) return;
      }
    return this._nextHandler && (await this._nextHandler.exec(n, e)), e;
  }
  setNext(n) {
    return (this._nextHandler = n);
  }
};
function Ol(n) {
  return (e) => e[n];
}
function zl(n) {
  return (e, t) => (e[n] = t);
}
function Vt(n, e) {
  return (e.getter || Ol(e.id))(n);
}
function $s(n, e, t) {
  return (e.setter || zl(e.id))(n, t);
}
function Cs(n, e) {
  const t = document.createElement('a');
  (t.href = URL.createObjectURL(n)),
    (t.download = e),
    document.body.appendChild(t),
    t.click(),
    document.body.removeChild(t);
}
function It(n, e) {
  let t = Vt(n, e) ?? '';
  return (
    e.template && (t = e.template(t, n, e)),
    e.optionsMap &&
      (Array.isArray(t)
        ? (t = t.map((r) => e.optionsMap.get(r)))
        : (t = e.optionsMap.get(t))),
    typeof t > 'u' ? '' : t + ''
  );
}
function Wl(n, e) {
  const t = /\n|"|;|,/;
  let r = '';
  const s =
      e.rows ||
      `
`,
    o = e.cols || '	',
    i = n._columns,
    a = n.flatData;
  e.header !== !1 && i[0].header && (r = _s('header', i, r, o, s));
  for (let l = 0; l < a.length; l++) {
    const c = [];
    for (let u = 0; u < i.length; u++) {
      let d = It(a[l], i[u]);
      t.test(d) && (d = '"' + d.replace(/"/g, '""') + '"'), c.push(d);
    }
    r += (r ? s : '') + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = _s('footer', i, r, o, s)), r;
}
function _s(n, e, t, r, s) {
  const o = /\n|"|;|,/;
  for (let i = 0; i < e[0][n].length; i++) {
    const a = [];
    for (let l = 0; l < e.length; l++) {
      let c = (e[l][n][i].text || '') + '';
      o.test(c) && (c = '"' + c.replace(/"/g, '""') + '"'), a.push(c);
    }
    t += (t ? s : '') + a.join(r);
  }
  return t;
}
function Fl(n, e, t) {
  const r = [],
    s = [],
    o = [];
  let i = [];
  const a = n._columns,
    l = n.flatData,
    c = n._sizes;
  for (const d of a) o.push({ width: d.flexgrow ? c.columnWidth : d.width });
  let u = 0;
  e.header !== !1 &&
    a[0].header &&
    (Ns('header', a, r, s, u, e, t),
    (i = i.concat(c.headerRowHeights.map((d) => ({ height: d })))),
    (u += a[0].header.length));
  for (let d = 0; d < l.length; d++) {
    const f = [];
    for (let g = 0; g < a.length; g++) {
      const m = l[d],
        h = a[g],
        x = Vt(m, h) ?? '';
      let w = It(m, h),
        y;
      e.cellStyle && (y = e.cellStyle(x, m, h)),
        e.cellTemplate && (w = e.cellTemplate(x, m, h) ?? w);
      const b = Uo(w, 2, y, t);
      f.push(b);
    }
    r.push(f), i.push({ height: c.rowHeight });
  }
  return (
    (u += l.length),
    e.footer !== !1 &&
      a[0].footer &&
      (Ns('footer', a, r, s, u, e, t),
      (i = i.concat(c.footerRowHeights.map((d) => ({ height: d }))))),
    { cells: r, merged: s, rowSizes: i, colSizes: o, styles: t }
  );
}
function Ns(n, e, t, r, s, o, i) {
  for (let a = 0; a < e[0][n].length; a++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const u = e[c][n][a],
        d = u.colspan ? u.colspan - 1 : 0,
        f = u.rowspan ? u.rowspan - 1 : 0;
      (d || f) &&
        r.push({
          from: { row: a + s, column: c },
          to: { row: a + s + f, column: c + d },
        });
      let g = u.text ?? '',
        m;
      o.headerCellStyle && (m = o.headerCellStyle(g, u, e[c], n)),
        o.headerCellTemplate && (g = o.headerCellTemplate(g, u, e[c], n) ?? g);
      let h;
      n == 'header'
        ? a == e[0][n].length - 1
          ? (h = 1)
          : (h = 0)
        : a
          ? (h = 4)
          : (h = 3);
      const x = Uo(g, h, m, i);
      l.push(x);
    }
    t.push(l);
  }
}
function Uo(n, e, t, r) {
  let s = e;
  if (
    (n &&
      n instanceof Date &&
      ((n = Bl(n)), (t = t || {}), (t.format = t.format || 'dd/mm/yyyy')),
    t)
  ) {
    t = { ...r[e], ...t };
    const o = r.findIndex((i) => Sn(i, t));
    o < 0 ? (r.push(t), (s = r.length - 1)) : (s = o);
  }
  return { v: n + '', s };
}
function Yl(n) {
  const e = {
      material: '#000000',
      willow: '#000000',
      'willow-dark': '#ffffff',
    },
    t = { material: 'none', willow: 'none', 'willow-dark': '#2a2b2d' },
    r = { material: '#fafafb', willow: '#f2f3f7', 'willow-dark': '#20262b' },
    s = {
      material: '0.5px solid #dfdfdf',
      willow: '0.5px solid #e6e6e6',
      'willow-dark': '0.5px solid #384047',
    },
    o = { material: '#dfdfdf', willow: '#e6e6e6', 'willow-dark': '#384047' },
    i = e[n],
    a = '0.5px solid ' + o[n],
    l = { verticalAlign: 'center', align: 'left' },
    c = {
      fontWeight: 'bold',
      color: i,
      background: r[n],
      ...l,
      borderBottom: a,
      borderRight: a,
    };
  return {
    cell: {
      color: i,
      background: t[n],
      borderBottom: s[n],
      borderRight: s[n],
      ...l,
    },
    header: { ...c },
    footer: { ...c },
  };
}
function Bl(n) {
  return n
    ? 25569 + (n.getTime() - n.getTimezoneOffset() * 6e4) / (86400 * 1e3)
    : null;
}
const Vl = 'portrait',
  Ul = 100,
  Gl = 'a4',
  jl = {
    a3: { width: 11.7, height: 16.5 },
    a4: { width: 8.27, height: 11.7 },
    letter: { width: 8.5, height: 11 },
  };
function Kl(n, e) {
  const t = [];
  let r = [],
    s = 0;
  const o = n.filter((a) => !a.hidden),
    i = Xl(e);
  return (
    o.forEach((a, l) => {
      s + a.width <= i
        ? ((s += a.width), r.push(a))
        : (r.length && t.push(r), (r = [a]), (s = a.width)),
        l === o.length - 1 && r.length && t.push(r);
    }),
    t
  );
}
function Ms(n, e, t) {
  const r = [];
  return (
    n.forEach((s, o) => {
      const i = s[e];
      for (let a = 0; a < t.length; a++) {
        r[a] || (r[a] = []);
        const l = { ...i[a] };
        if (r[a][o] !== null) {
          if (!o && !l.rowspan && !l.colspan) {
            let c = 1,
              u = n[o + c][e][a],
              d = l.width;
            for (; !u.rowspan && !u.colspan; )
              c++, (u = n[o + c][e][a]), (d += u.width);
            (l.colspan = c), (l.width = d), (l.height = t[a]);
          }
          if ((r[a].push(l), !l.collapsed && l.colspan > 1)) {
            let c = l.colspan - 1;
            if (l.colspan + o > n.length) {
              const u = l.colspan - (l.colspan + o - n.length);
              (l.colspan = u),
                (l.width = n
                  .slice(o, o + c + 1)
                  .reduce((d, f) => d + f.width, 0)),
                u > 1 && (c = u - 1);
            }
            for (let u = 0; u < c; u++) r[a].push(null);
          }
          if (l.rowspan > 1) {
            const c = l.rowspan;
            for (let u = 1; u < c; u++)
              r[a + u] || (r[a + u] = []), r[a + u].push(null);
          }
        }
      }
      if (s.collapsed)
        for (let a = 0; a < r.length; a++) {
          const l = r[a],
            c = l[o];
          if (c && c.collapsed) {
            if (((l[o] = null), !a)) break;
          } else {
            const u = c || l.findLast((d) => d?.colspan >= 1);
            u && ((u.colspan = u.colspan - 1), (u.width = u.width - s.width));
          }
        }
    }),
    r.map((s) => s.filter((o) => o && o.colspan !== 0))
  );
}
function Xl(n) {
  const { mode: e, ppi: t, paper: r } = n,
    { width: s, height: o } = jl[r];
  return ql(e === 'portrait' ? s : o, t);
}
function ql(n, e) {
  return n * e;
}
function Ql(n = {}) {
  const { mode: e, ppi: t, paper: r } = n;
  return { mode: e || Vl, ppi: t || Ul, paper: r || Gl };
}
function Go(n, e) {
  return n.flexgrow
    ? `min-width:${e}px;width:auto`
    : `width:${n.width}px; max-width:${n.width}px; height:${n.height}px`;
}
function Zl(n, e, t) {
  let r = n[t.id];
  if (t.filter.type === 'richselect' && r) {
    const s =
      t.filter.config?.options || e.find(({ id: o }) => o == t.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? '';
}
const Ts = ['resize-column', 'hide-column', 'update-cell'],
  Jl = ['delete-row', 'update-row', 'update-cell'],
  ec = ['move-item'],
  tc = ['resize-column', 'move-item'];
let nc = class {
  undo = [];
  redo = [];
  progress = {};
  in;
  getState;
  setState;
  _previousValues = {};
  constructor(e, t, r) {
    (this.in = e),
      (this.getState = t),
      (this.setState = r),
      this.setHandlers(),
      this.resetStateHistory();
  }
  getHandlers() {
    return {
      'add-row': {
        handler: (e) => ({
          action: 'delete-row',
          data: { id: e.id },
          source: { action: 'add-row', data: e },
        }),
      },
      'delete-row': {
        handler: (e) => {
          const { id: t } = e,
            { data: r } = this.getPrev(),
            s = r.findIndex((o) => o.id == t);
          return {
            action: 'add-row',
            data: {
              id: t,
              row: r[s],
              before: s < r.length - 1 ? r[s + 1].id : void 0,
            },
            source: { action: 'delete-row', data: e },
          };
        },
      },
      'update-cell': {
        handler: (e) => {
          const { id: t, column: r } = e,
            s = this.getRow(t),
            o = this.getColumn(r),
            i = Vt(s, o);
          return Sn(i, e.value)
            ? null
            : {
                action: 'update-cell',
                data: { id: t, column: r, value: i },
                source: { action: 'update-cell', data: e },
              };
        },
      },
      'update-row': {
        handler: (e) => {
          const { id: t, row: r } = e,
            s = this.getRow(t);
          for (const o in r) Object.keys(s).includes(o) || (s[o] = void 0);
          return {
            action: 'update-row',
            data: { id: t, row: s },
            source: { action: 'update-row', data: e },
          };
        },
      },
      'copy-row': {
        handler: (e) => {
          const { id: t } = e,
            { data: r } = this.getState(),
            s = r.findIndex((i) => i.id == t),
            o = r[s];
          return {
            action: 'delete-row',
            data: { id: t },
            source: {
              action: 'add-row',
              data: {
                id: t,
                row: o,
                before: s < r.length - 1 ? r[s + 1].id : void 0,
              },
            },
          };
        },
      },
      'resize-column': {
        handler: (e) => {
          const { id: t, width: r } = e,
            s = this.getColumn(t),
            { _sizes: o } = this.getState();
          return {
            action: 'resize-column',
            data: { id: t, width: s.width ?? o.columnWidth },
            source: { action: 'resize-column', data: { id: t, width: r } },
          };
        },
      },
      'hide-column': {
        handler: (e) => {
          const { id: t } = e,
            r = this.getColumn(t);
          return {
            action: 'hide-column',
            data: { id: t, mode: r.hidden },
            source: { action: 'hide-column', data: e },
          };
        },
      },
      'collapse-column': {
        handler: (e) => {
          const { id: t, row: r, mode: s } = e;
          return {
            action: 'collapse-column',
            data: { id: t, row: r, mode: typeof s == 'boolean' ? !s : s },
            source: { action: 'collapse-column', data: e },
          };
        },
      },
      'move-item': {
        handler: (e) => {
          const { id: t, target: r, mode: s } = e,
            { flatData: o } = this.getPrev(),
            i = o.findIndex((a) => a.id == t);
          return {
            action: 'move-item',
            data: {
              id: t,
              target: o[i + (i ? -1 : 1)].id,
              mode: i ? 'after' : 'before',
            },
            source: {
              action: 'move-item',
              data: { id: t, target: r, mode: s },
            },
          };
        },
      },
      'open-row': {
        handler: (e) => {
          const { id: t, nested: r } = e;
          return {
            action: 'close-row',
            data: { id: t, nested: r },
            source: { action: 'open-row', data: e },
          };
        },
      },
      'close-row': {
        handler: (e) => {
          const { id: t, nested: r } = e;
          return {
            action: 'open-row',
            data: { id: t, nested: r },
            source: { action: 'close-row', data: e },
          };
        },
      },
    };
  }
  resetHistory() {
    (this.undo = []),
      (this.redo = []),
      (this.progress = {}),
      this.resetStateHistory();
  }
  getPrev() {
    return this._previousValues;
  }
  setHandlers() {
    const e = this.getHandlers();
    for (const t in e)
      this.in.intercept(t, (r) => {
        if (
          !(r.eventSource === 'undo' || r.eventSource === 'redo' || r.skipUndo)
        ) {
          if (tc.includes(t)) {
            ((r.inProgress && !this.progress[t]) ||
              typeof r.inProgress != 'boolean') &&
              (ec.includes(t) && this.setPrev('flatData'),
              Ts.includes(t) && this.setPrev('columns')),
              (this.progress[t] = r.inProgress);
            return;
          }
          Jl.includes(t) && this.setPrev('data'),
            Ts.includes(t) && this.setPrev('columns');
        }
      }),
        this.in.on(t, (r) => {
          if (
            r.eventSource === 'undo' ||
            r.eventSource === 'redo' ||
            r.skipUndo ||
            r.inProgress
          )
            return;
          const s = e[t].handler(r);
          s && this.addToHistory(s);
        });
  }
  setPrev(e) {
    this._previousValues[e] = Rr(this.getState()[e]);
  }
  addToHistory(e) {
    this.undo.push(e), (this.redo = []), this.setStateHistory();
  }
  handleUndo() {
    if (!this.undo.length) return;
    const e = this.undo.pop();
    this.redo.push({ ...e.source, source: e }),
      this.in.exec(e.action, { ...e.data, eventSource: 'undo' }),
      this.setStateHistory();
  }
  handleRedo() {
    if (!this.redo.length) return;
    const e = this.redo.pop();
    this.undo.push({ ...e.source, source: e }),
      this.in.exec(e.action, { ...e.data, eventSource: 'redo' }),
      this.setStateHistory();
  }
  resetStateHistory() {
    this.setState({ history: { undo: 0, redo: 0 } });
  }
  setStateHistory() {
    this.setState({
      history: { undo: this.undo.length, redo: this.redo.length },
    });
  }
  getRow(e) {
    const { data: t } = this.getPrev();
    return this.getState().tree
      ? this.getTreeRow(t, e)
      : t.find((r) => r.id == e);
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
function jo() {
  let n = !0;
  return (n = !1), n;
}
function Ko(n, e) {
  return typeof n > 'u' || n === null
    ? -1
    : typeof e > 'u' || e === null
      ? 1
      : n === e
        ? 0
        : n > e
          ? 1
          : -1;
}
function rc(n, e) {
  return -Ko(n, e);
}
function sc(n, e) {
  if (typeof e.sort == 'function')
    return function (r, s) {
      const o = e.sort(r, s);
      return n === 'asc' ? o : -o;
    };
  const t = n === 'asc' ? Ko : rc;
  return function (r, s) {
    return t(Vt(r, e), Vt(s, e));
  };
}
function oc(n, e) {
  if (!n || !n.length) return;
  const t = n.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return sc(r.order, s);
  });
  return n.length === 1
    ? t[0]
    : function (r, s) {
        for (let o = 0; o < t.length; o++) {
          const i = t[o](r, s);
          if (i !== 0) return i;
        }
        return 0;
      };
}
const Hn = 28,
  ic = 20;
function ac() {
  if (typeof document > 'u') return 'willow';
  const n = document.querySelector('[class^="wx"][class$="theme"]');
  return n ? n.className.substring(3, n.className.length - 6) : 'willow';
}
function Un(n, e, t, r, s) {
  const o = document.createElement('div'),
    i = document.createElement('div'),
    a = document.body;
  s = s ? `${s}px` : 'auto';
  let l, c;
  (i.className = e),
    o.classList.add(`wx-${t}-theme`),
    (o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`),
    o.appendChild(i),
    a.appendChild(o),
    typeof n != 'object' && (n = [n]);
  for (let u = 0; u < n.length; u++) {
    i.innerText = n[u] + '';
    const d = o.getBoundingClientRect(),
      f = Math.ceil(d.width) + (r && r.length ? r[u] : 0),
      g = Math.ceil(d.height);
    (l = Math.max(l || 0, f)), (c = Math.max(c || 0, g));
  }
  return o.remove(), { width: l, height: c };
}
function Ds(n, e, t, r, s) {
  const o = [];
  for (let i = 0; i < n.length; i++) {
    const a = n[i][e],
      l = a.length;
    for (let c = 0; c < l; c++) {
      const { text: u, vertical: d, collapsed: f, rowspan: g, css: m } = a[c];
      if (!u) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let h = 0;
      if (d && !f) {
        let x = `wx-measure-cell-${e}`;
        if (
          ((x += m ? ` ${m}` : ''),
          (h = Un(u, x, s).width),
          (g > 1 || !a[c + 1]) && t > c + 1)
        ) {
          const w = g || t - c,
            y = o.slice(c, c + w).reduce((b, v) => b + v, 0);
          if (y < h) {
            const b = Math.ceil((h - y) / w);
            for (let v = c; v < c + w; v++) o[v] = (o[v] || r) + b;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, h);
    }
  }
  return o;
}
function lc(n, e, t) {
  const r = [],
    s = [];
  let o = 'wx-measure-cell-body';
  o += n.css ? ` ${n.css}` : '';
  for (let i = 0; i < e.length; i++) {
    const a = e[i],
      l = It(a, n);
    l &&
      (r.push(l),
      n.treetoggle
        ? s.push(
            e[i].$level * Hn + (e[i].$count ? Hn : 0) + (n.draggable ? Hn : 0),
          )
        : n.draggable && s.push(Hn));
  }
  return Un(r, o, t, s).width;
}
function cc(n, e) {
  const t = 'wx-measure-cell-header',
    r = n.sort ? ic : 0;
  let s = n.header;
  if (typeof s == 'string') return Un(s, t, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const a = s[i],
      l = typeof a == 'string' ? a : a.text,
      c = t + (typeof a == 'string' ? '' : ` ${a.css}`);
    let u = Un(l, c, e).width;
    i === s.length - 1 && (u += r), (o = Math.max(o || 0, u));
  }
  return o;
}
const uc = {
  text: (n, e) =>
    n ? n.toString().toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e,
  richselect: (n, e) => (typeof e != 'number' && !e ? !0 : n == e),
};
function dc(n) {
  return uc[n];
}
let fc = class extends Al {
    in;
    _router;
    _branches;
    _xlsxWorker;
    _historyManager;
    constructor(e) {
      super({ writable: e, async: !1 });
      const t = {
        rowHeight: 37,
        columnWidth: 160,
        headerHeight: 36,
        footerHeight: 36,
      };
      this._router = new Ll(
        super.setState.bind(this),
        [
          {
            in: ['columns', 'sizes', '_skin'],
            out: ['_columns', '_sizes'],
            exec: (s) => {
              const { columns: o, sizes: i, _skin: a } = this.getState(),
                l = this.copyColumns(o),
                c = l.reduce((f, g) => Math.max(g.header.length, f), 0),
                u = l.reduce((f, g) => Math.max(g.footer.length, f), 0);
              l.forEach(this.setCollapsibleColumns);
              const d = this.normalizeSizes(l, i, c, u, a);
              for (let f = 0; f < l.length; f++)
                this.normalizeColumns(l, f, 'header', c, d),
                  this.normalizeColumns(l, f, 'footer', u, d);
              this.setState({ _columns: l, _sizes: d }, s);
            },
          },
          {
            in: ['data', 'tree', '_filterIds'],
            out: ['flatData', '_rowHeightFromData'],
            exec: (s) => {
              const {
                  data: o,
                  tree: i,
                  dynamic: a,
                  _filterIds: l,
                } = this.getState(),
                c = l && new Set(l),
                u = i
                  ? this.flattenRows(o, [], l)
                  : c
                    ? o.filter((f) => c.has(f.id))
                    : o,
                d = !a && u.some((f) => f.rowHeight);
              this.setState({ flatData: u, _rowHeightFromData: d }, s);
            },
          },
        ],
        { sizes: (s) => ({ ...t, ...s }) },
      );
      const r = (this.in = new Pl());
      r.on('close-editor', ({ ignore: s }) => {
        const { editor: o } = this.getState();
        o && (s || r.exec('update-cell', o), this.setState({ editor: null }));
      }),
        r.on('open-editor', ({ id: s, column: o }) => {
          let i = this.getState().editor;
          i && r.exec('close-editor', {});
          const a = this.getRow(s),
            l = o ? this.getColumn(o) : this.getNextEditor(a);
          if (l?.editor) {
            let c = l.editor;
            if ((typeof c == 'function' && (c = c(a, l)), !c)) return;
            (i = {
              column: l.id,
              id: s,
              value: Vt(a, l) ?? '',
              renderedValue: It(a, l),
            }),
              typeof c == 'object' &&
                c.config &&
                ((i.config = c.config),
                c.config.options && (i.options = c.config.options)),
              l.options && !i.options && (i.options = l.options),
              this.setState({ editor: i });
          }
        }),
        r.on('editor', ({ value: s }) => {
          const o = this.getState().editor;
          o && ((o.value = s), this.setState({ editor: o }));
        }),
        r.on('add-row', (s) => {
          const o = this.getState();
          let { data: i } = o;
          const { select: a, _filterIds: l } = o,
            { row: c, before: u, after: d, select: f } = s;
          if (((s.id = c.id = s.id || c.id || An()), u || d)) {
            const m = u || d,
              h = i.findIndex((x) => x.id === m);
            (i = [...i]), i.splice(h + (d ? 1 : 0), 0, s.row);
          } else i = [...i, s.row];
          const g = { data: i };
          l && (g._filterIds = [...l, s.id]),
            this.setState(g),
            !(typeof f == 'boolean' && !f) &&
              (f || a) &&
              r.exec('select-row', { id: c.id, show: !0 });
        }),
        r.on('delete-row', (s) => {
          const {
              data: o,
              selectedRows: i,
              focusCell: a,
              editor: l,
            } = this.getState(),
            { id: c } = s,
            u = { data: o.filter((d) => d.id !== c) };
          this.isSelected(c) && (u.selectedRows = i.filter((d) => d !== c)),
            l?.id == c && (u.editor = null),
            this.setState(u),
            a?.row === c &&
              this.in.exec('focus-cell', { eventSource: 'delete-row' });
        }),
        r.on('update-cell', (s) => {
          const o = this.getState();
          let { data: i } = o;
          i = [...i];
          const { tree: a } = o,
            { id: l, column: c, value: u } = s,
            d = this.getColumn(c);
          if (a) {
            const f = { ...this._branches[l] };
            $s(f, d, u);
            const g = this.updateTreeRow(f);
            f.$parent === 0 && (i = g);
          } else {
            const f = i.findIndex((m) => m.id == l),
              g = { ...i[f] };
            $s(g, d, u), (i[f] = g);
          }
          this.setState({ data: i });
        }),
        r.on('update-row', (s) => {
          let { data: o } = this.getState();
          const { id: i, row: a } = s,
            l = o.findIndex((c) => c.id == i);
          (o = [...o]), (o[l] = { ...o[l], ...a }), this.setState({ data: o });
        }),
        r.on(
          'select-row',
          ({ id: s, toggle: o, range: i, mode: a, show: l, column: c }) => {
            const u = this.getState(),
              { focusCell: d } = u;
            let { selectedRows: f } = u;
            if ((f.length || (i = o = !1), i)) {
              const { data: g } = this.getState();
              let m = g.findIndex((x) => x.id == f[f.length - 1]),
                h = g.findIndex((x) => x.id == s);
              m > h && ([m, h] = [h, m]),
                g.slice(m, h + 1).forEach((x) => {
                  f.indexOf(x.id) === -1 && f.push(x.id);
                });
            } else if (o && this.isSelected(s)) {
              if (a === !0) return;
              f = f.filter((g) => g !== s);
            } else if (o) {
              if (a === !1) return;
              f.push(s);
            } else f = [s];
            this.setState({ selectedRows: [...f] }),
              d?.row !== s &&
                this.in.exec('focus-cell', { eventSource: 'select-row' }),
              l && this.in.exec('scroll', { row: s, column: c });
          },
        ),
        this.in.on('focus-cell', (s) => {
          const { row: o, column: i, eventSource: a } = s,
            { _columns: l, split: c } = this.getState();
          o && i
            ? (this.setState({ focusCell: { row: o, column: i } }),
              a !== 'click' &&
                ((!c.left || l.findIndex((u) => u.id == s.column) >= c.left) &&
                (!c.right ||
                  l.findIndex((u) => u.id == s.column) < l.length - c.right)
                  ? this.in.exec('scroll', { row: o, column: i })
                  : this.in.exec('scroll', { row: o })))
            : this.setState({ focusCell: null });
        }),
        r.on('resize-column', (s) => {
          const { id: o, auto: i, maxRows: a, inProgress: l } = s;
          if (l === !1) return;
          let c = s.width || 0;
          const u = [...this.getState().columns],
            d = u.find((f) => f.id == o);
          if (i) {
            if (i == 'data' || i === !0) {
              const { flatData: f, _skin: g } = this.getState();
              let m = f.length;
              a && (m = Math.min(a, m));
              const h = f.slice(0, m);
              c = lc(d, h, g);
            }
            if (i == 'header' || i === !0) {
              const { _skin: f } = this.getState();
              c = Math.max(cc(d, f), c);
            }
          }
          (d.width = Math.max(17, c)),
            delete d.flexgrow,
            this.setState({ columns: u });
        }),
        r.on('hide-column', (s) => {
          const { id: o, mode: i } = s,
            a = [...this.getState().columns],
            l = a.find((u) => u.id == o),
            c = a.reduce((u, d) => u + (d.hidden ? 0 : 1), 0);
          !i || c > 1
            ? ((l.hidden = !l.hidden), this.setState({ columns: a }))
            : (s.skipUndo = !0);
        }),
        r.on('sort-rows', (s) => {
          const { key: o, add: i, sort: a } = s,
            l = this.getState(),
            { columns: c, data: u, tree: d } = l;
          if (a) {
            const y = [...u];
            y.sort(a), this.setState({ data: y });
            return;
          }
          const { order: f = 'asc' } = s;
          let g = l.sortMarks;
          const m = Object.keys(g),
            h = m.length;
          !i || !h || (h === 1 && g[o])
            ? (g = { [o]: { order: f } })
            : (h === 1 && (g[m[0]] = { ...g[m[0]], index: 0 }),
              (g = {
                ...g,
                [o]: {
                  order: f,
                  index: typeof i == 'number' ? i : (g[o]?.index ?? h),
                },
              }));
          const x = Object.keys(g)
            .sort((y, b) => g[y].index - g[b].index)
            .map((y) => ({ key: y, order: g[y].order }));
          this.setState({ sortMarks: g });
          const w = oc(x, c);
          if (w) {
            const y = [...u];
            d ? this.sortTree(y, w) : y.sort(w), this.setState({ data: y });
          }
        }),
        r.on('filter-rows', (s) => {
          const { value: o, key: i, filter: a } = s;
          if (!Object.keys(s).length) {
            this.setState({ filterValues: {}, _filterIds: null });
            return;
          }
          const l = this.getState(),
            { data: c, tree: u } = l;
          let d = l.filterValues;
          const f = {};
          i && ((d = { ...d, [i]: o }), (f.filterValues = d));
          const g = a ?? this.createFilter(d);
          let m = [];
          u
            ? (m = this.filterTree(c, g, m))
            : c.forEach((h) => {
                g(h) && m.push(h.id);
              }),
            (f._filterIds = m),
            this.setState(f);
        }),
        r.on('collapse-column', (s) => {
          const { id: o, row: i, mode: a } = s,
            l = [...this.getState().columns],
            c = this.getColumn(o).header,
            u = Array.isArray(c) ? c[i] : c;
          typeof u == 'object' &&
            ((u.collapsed = a ?? !u.collapsed), this.setState({ columns: l }));
        }),
        r.on('move-item', (s) => {
          const { id: o, inProgress: i } = s;
          let { target: a, mode: l = 'after' } = s;
          const { data: c, flatData: u, tree: d } = this.getState(),
            f = u.findIndex((h) => h.id == o);
          let g;
          if (l === 'up' || l === 'down') {
            if (l === 'up') {
              if (f === 0) return;
              (g = f - 1), (l = 'before');
            } else if (l === 'down') {
              if (f === u.length - 1) return;
              (g = f + 1), (l = 'after');
            }
            a = u[g] && u[g].id;
          } else g = u.findIndex((h) => h.id == a);
          if (f === -1 || g === -1 || i === !1) return;
          let m;
          d ? (m = this.moveItem(o, a, c, l)) : (m = this.moveItem(o, a, c, l)),
            this.setState({ data: d ? this.normalizeTreeRows(m) : m });
        }),
        r.on('copy-row', (s) => {
          const { id: o, target: i, mode: a = 'after' } = s,
            l = this.getState(),
            { flatData: c, _filterIds: u } = l;
          let { data: d } = l;
          const f = this.getRow(o);
          if (!f) return;
          const g = { ...f, id: An() };
          s.id = g.id;
          const m = c.findIndex((x) => x.id == i);
          if (m === -1) return;
          d.splice(m + (a === 'after' ? 1 : 0), 0, g), (d = [...d]);
          const h = { data: d };
          u && (h._filterIds = [...u, g.id]), this.setState(h);
        }),
        r.on('open-row', (s) => {
          const { id: o, nested: i } = s;
          this.toggleBranch(o, !0, i);
        }),
        r.on('close-row', (s) => {
          const { id: o, nested: i } = s;
          this.toggleBranch(o, !1, i);
        }),
        r.on(
          'export-data',
          (s) =>
            new Promise((o, i) => {
              const a = s.format || 'csv',
                l = `${s.fileName || 'data'}.${a}`;
              if (a == 'csv') {
                const c = Wl(this.getState(), s.csv || {});
                s.download !== !1
                  ? Cs(new Blob(['\uFEFF' + c], { type: 'text/csv' }), l)
                  : (s.result = c),
                  o(!0);
              } else if (a == 'xlsx') {
                let c = s.excel?.styles;
                !c && c !== !1 && (c = Yl(this.getState()._skin));
                const u = c,
                  d = u
                    ? [
                        { ...u.header },
                        { ...(u.lastHeaderCell || u.header) },
                        { ...u.cell },
                        { ...(u.firstFooterCell || u.footer) },
                        { ...u.footer },
                      ]
                    : Array(5).fill({}),
                  {
                    cells: f,
                    merged: g,
                    rowSizes: m,
                    colSizes: h,
                    styles: x,
                  } = Fl(this.getState(), s.excel || {}, d),
                  w =
                    s.cdn ||
                    'https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js';
                this.getXlsxWorker(w).then((y) => {
                  (y.onmessage = (b) => {
                    if (b.data.type == 'ready') {
                      const v = b.data.blob;
                      s.download !== !1 ? Cs(v, l) : (s.result = v), o(!0);
                    }
                  }),
                    y.postMessage({
                      type: 'convert',
                      data: {
                        data: [
                          {
                            name: s.sheetName || 'data',
                            cells: f,
                            cols: h,
                            rows: m,
                            merged: g,
                          },
                        ],
                        styles: x,
                      },
                    });
                });
              } else i();
            }),
        ),
        r.on('search-rows', (s) => {
          const { search: o, columns: i } = s,
            a = this.searchRows(o, i);
          this.setState({ search: { value: o, rows: a } });
        }),
        r.on('hotkey', ({ key: s, event: o, isInput: i }) => {
          switch (s) {
            case 'arrowup': {
              const { flatData: a, focusCell: l, select: c } = this.getState();
              if ((o.preventDefault(), i)) return;
              const u = l ? l.column : this._getFirstVisibleColumn()?.id,
                d = l ? this.getPrevRow(l.row)?.id : a[a.length - 1]?.id;
              u &&
                d &&
                (this.in.exec('focus-cell', {
                  row: d,
                  column: u,
                  eventSource: 'key',
                }),
                c && this.in.exec('select-row', { id: d }));
              break;
            }
            case 'arrowdown': {
              const { flatData: a, focusCell: l, select: c } = this.getState();
              if ((o.preventDefault(), i)) return;
              const u = l ? l.column : this._getFirstVisibleColumn()?.id,
                d = l ? this.getNextRow(l.row)?.id : a[0]?.id;
              u &&
                d &&
                (this.in.exec('focus-cell', {
                  row: d,
                  column: u,
                  eventSource: 'key',
                }),
                c && this.in.exec('select-row', { id: d }));
              break;
            }
            case 'arrowright': {
              const { focusCell: a } = this.getState();
              if (i) return;
              if ((o.preventDefault(), a)) {
                const l = this.getNextColumn(a.column, !0)?.id;
                l &&
                  this.in.exec('focus-cell', {
                    row: a.row,
                    column: l,
                    eventSource: 'key',
                  });
              }
              break;
            }
            case 'arrowleft': {
              const { focusCell: a } = this.getState();
              if (i) return;
              if ((o.preventDefault(), a)) {
                const l = this.getPrevColumn(a.column, !0)?.id;
                l &&
                  this.in.exec('focus-cell', {
                    row: a.row,
                    column: l,
                    eventSource: 'key',
                  });
              }
              break;
            }
            case 'tab': {
              const { editor: a, focusCell: l, select: c } = this.getState();
              if (a) {
                o.preventDefault();
                const u = a.column;
                let d = a.id,
                  f = this.getNextEditor(this.getRow(d), this.getColumn(u));
                if (!f) {
                  const g = this.getNextRow(d);
                  g && ((d = g.id), (f = this.getNextEditor(g)));
                }
                f &&
                  (this.in.exec('open-editor', { id: d, column: f.id }),
                  this.in.exec('focus-cell', {
                    row: d,
                    column: f.id,
                    eventSource: 'key',
                  }),
                  c &&
                    !this.isSelected(d) &&
                    this.in.exec('select-row', { id: d }));
              } else l && this.in.exec('focus-cell', { eventSource: 'key' });
              break;
            }
            case 'shift+tab': {
              const { editor: a, focusCell: l, select: c } = this.getState();
              if (a) {
                o.preventDefault();
                const u = a.column;
                let d = a.id,
                  f = this.getPrevEditor(this.getRow(d), this.getColumn(u));
                if (!f) {
                  const g = this.getPrevRow(d);
                  g && ((d = g.id), (f = this.getPrevEditor(g)));
                }
                f &&
                  (this.in.exec('open-editor', { id: d, column: f.id }),
                  this.in.exec('focus-cell', {
                    row: d,
                    column: f.id,
                    eventSource: 'key',
                  }),
                  c &&
                    !this.isSelected(d) &&
                    this.in.exec('select-row', { id: d }));
              } else l && this.in.exec('focus-cell', { eventSource: 'key' });
              break;
            }
            case 'escape': {
              const { editor: a } = this.getState();
              a &&
                (this.in.exec('close-editor', { ignore: !0 }),
                this.in.exec('focus-cell', {
                  row: a.id,
                  column: a.column,
                  eventSource: 'key',
                }));
              break;
            }
            case 'f2': {
              const { editor: a, focusCell: l } = this.getState();
              !a &&
                l &&
                this.in.exec('open-editor', { id: l.row, column: l.column });
              break;
            }
            case 'enter': {
              const { focusCell: a, tree: l } = this.getState();
              if (!i && l && a && this.getColumn(a.column).treetoggle) {
                const c = this.getRow(a.row);
                if (!c.data) return;
                this.in.exec(c.open ? 'close-row' : 'open-row', {
                  id: a.row,
                  nested: !0,
                });
              }
              break;
            }
            case 'home': {
              const { editor: a, focusCell: l } = this.getState();
              if (!a && l) {
                o.preventDefault();
                const c = this._getFirstVisibleColumn()?.id;
                this.in.exec('focus-cell', {
                  row: l.row,
                  column: c,
                  eventSource: 'key',
                });
              }
              break;
            }
            case 'ctrl+home': {
              const {
                editor: a,
                focusCell: l,
                flatData: c,
                select: u,
              } = this.getState();
              if (!a && l) {
                o.preventDefault();
                const d = c[0]?.id,
                  f = this._getFirstVisibleColumn()?.id;
                d &&
                  f &&
                  (this.in.exec('focus-cell', {
                    row: d,
                    column: f,
                    eventSource: 'key',
                  }),
                  u &&
                    !this.isSelected(d) &&
                    this.in.exec('select-row', { id: d }));
              }
              break;
            }
            case 'end': {
              const { editor: a, focusCell: l } = this.getState();
              if (!a && l) {
                o.preventDefault();
                const c = this._getLastVisibleColumn()?.id,
                  u = l.row;
                this.in.exec('focus-cell', {
                  row: u,
                  column: c,
                  eventSource: 'key',
                });
              }
              break;
            }
            case 'ctrl+end': {
              const {
                editor: a,
                focusCell: l,
                flatData: c,
                select: u,
              } = this.getState();
              if (!a && l) {
                o.preventDefault();
                const d = c.at(-1).id,
                  f = this._getLastVisibleColumn()?.id;
                d &&
                  f &&
                  (this.in.exec('focus-cell', {
                    row: d,
                    column: f,
                    eventSource: 'key',
                  }),
                  u &&
                    !this.isSelected(d) &&
                    this.in.exec('select-row', { id: d }));
              }
              break;
            }
            case 'ctrl+z': {
              this.in.exec('undo', {});
              break;
            }
            case 'ctrl+y': {
              this.in.exec('redo', {});
              break;
            }
          }
        }),
        r.on('scroll', (s) => {
          const {
            _columns: o,
            split: i,
            _sizes: a,
            flatData: l,
            dynamic: c,
            _rowHeightFromData: u,
          } = this.getState();
          let d = -1,
            f = -1,
            g = 0,
            m = 0;
          if (s.column) {
            d = 0;
            const h = o.findIndex((x) => x.id == s.column);
            g = o[h].width;
            for (let x = i.left ?? 0; x < h; x++) {
              const w = o[x];
              w.hidden || (d += w.width);
            }
          }
          if (s.row && !c) {
            const h = l.findIndex((x) => x.id == s.row);
            h >= 0 &&
              (u
                ? ((f = l
                    .slice(0, h)
                    .reduce((x, w) => x + (w.rowHeight || a.rowHeight), 0)),
                  (m = l[h].rowHeight))
                : (f = a.rowHeight * h));
          }
          this.setState({
            scroll: { top: f, left: d, width: g, height: m || a.rowHeight },
          });
        }),
        r.on('print', (s) => {
          const o = Ql(s);
          this.setState({ _print: o }), this.setStateAsync({ _print: null });
        }),
        r.on('undo', () => {
          this._historyManager?.handleUndo();
        }),
        r.on('redo', () => {
          this._historyManager?.handleRedo();
        }),
        this.initOnce();
    }
    getXlsxWorker(e) {
      if (!this._xlsxWorker) {
        const t = window.URL.createObjectURL(
          new Blob([`importScripts('${e}');`], { type: 'text/javascript' }),
        );
        this._xlsxWorker = new Promise((r) => {
          const s = new Worker(t);
          s.addEventListener('message', (o) => {
            o.data.type === 'init' && r(s);
          });
        });
      }
      return this._xlsxWorker;
    }
    initOnce() {
      const e = {
        sortMarks: {},
        _filterIds: null,
        data: [],
        filterValues: {},
        scroll: null,
        editor: null,
        focusCell: null,
        _print: null,
        history: { undo: 0, redo: 0 },
        search: null,
      };
      this._router.init(e);
    }
    init(e) {
      e.hasOwnProperty('_skin') && !e._skin && (e._skin = ac()),
        e.columns &&
          e.columns.forEach((t) => {
            t.options &&
              (t.optionsMap = new Map(t.options.map((r) => [r.id, r.label])));
          }),
        Sn(this.getState().data, e.data) ||
          (e.tree
            ? ((this._branches = { 0: { data: e.data } }),
              (e.data = this.normalizeTreeRows(e.data)))
            : (e.data = this.normalizeRows(e.data)),
          this.setState({
            _filterIds: null,
            filterValues: {},
            sortMarks: {},
            search: null,
          }),
          this._historyManager && this._historyManager.resetHistory()),
        jo() &&
          (e.tree && ((e.undo = !1), (e.reorder = !1)),
          e.split?.right && (e.split.right = 0)),
        e.undo &&
          !this._historyManager &&
          (this._historyManager = new nc(
            this.in,
            this.getState.bind(this),
            this.setState.bind(this),
          )),
        this._router.init({ ...e });
    }
    setState(e, t) {
      return this._router.setState(e, t);
    }
    setStateAsync(e) {
      this._router.setStateAsync(e);
    }
    getRow(e) {
      const { tree: t } = this.getState();
      return t
        ? this._branches[e]
        : this.getState().data.find((r) => r.id == e);
    }
    getRowIndex(e, t) {
      return t || (t = this.getState().flatData), t.findIndex((r) => r.id == e);
    }
    getNextRow(e) {
      const t = this.getState().flatData,
        r = this.getRowIndex(e, t);
      return t[r + 1];
    }
    getPrevRow(e) {
      const t = this.getState().flatData,
        r = this.getRowIndex(e, t);
      return t[r - 1];
    }
    getColumn(e) {
      return this.getState().columns.find((t) => t.id == e);
    }
    getNextColumn(e, t) {
      const r = this.getState()._columns,
        s = r.findIndex((o) => o.id == e);
      return t ? this._getFirstVisibleColumn(s + 1) : r[s + 1];
    }
    getPrevColumn(e, t) {
      const r = this.getState()._columns,
        s = r.findIndex((o) => o.id == e);
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
      return !r || s ? !1 : typeof r == 'function' ? r(e, t) : !0;
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
      let s = this._branches[e],
        { data: o } = this.getState();
      if (((o = [...o]), e !== 0)) {
        s = { ...s, open: t };
        const i = this.updateTreeRow(s);
        s.$parent === 0 && (o = i);
      }
      r &&
        s.data?.length &&
        s.data.forEach((i) => {
          const a = this.toggleKids(i, t, r);
          e === 0 && (o = a);
        }),
        this.setState({ data: o });
    }
    toggleKids(e, t, r) {
      e = { ...e, open: t };
      const s = this.updateTreeRow(e);
      return (
        r &&
          e.data?.length &&
          e.data.forEach((o) => {
            this.toggleKids(o, t, r);
          }),
        s
      );
    }
    updateTreeRow(e) {
      const t = e.id;
      this._branches[t] = e;
      const r = this._branches[e.$parent],
        s = r.data.findIndex((o) => o.id == t);
      return (r.data = [...r.data]), (r.data[s] = e), r.data;
    }
    isSelected(e) {
      return this.getState().selectedRows.indexOf(e) !== -1;
    }
    findAndRemove(e, t) {
      for (let r = 0; r < e.length; r++) {
        if (e[r].id == t) return e.splice(r, 1)[0];
        if (e[r].data) {
          const s = [...e[r].data],
            o = this.findAndRemove(s, t);
          if (o) return (e[r] = { ...e[r], data: s }), o;
        }
      }
      return null;
    }
    insertItem(e, t, r, s) {
      for (let o = 0; o < e.length; o++) {
        if (e[o].id == t) {
          const i = e[o],
            a = s === 'before' ? o : o + 1;
          if (i.data) {
            if (s === 'before') {
              const l = o > 0 ? e[o - 1] : null;
              return (
                l?.data && l.open
                  ? (e[o - 1] = { ...l, data: [...l.data, r] })
                  : e.splice(a, 0, r),
                !0
              );
            } else if (i.open)
              return (e[o] = { ...i, data: [r, ...i.data] }), !0;
          }
          return e.splice(a, 0, r), !0;
        }
        if (
          e[o].data &&
          ((e[o] = { ...e[o], data: [...e[o].data] }),
          this.insertItem(e[o].data, t, r, s))
        )
          return !0;
      }
      return !1;
    }
    moveItem(e, t, r, s) {
      const o = [...r],
        i = this.findAndRemove(o, e);
      return this.insertItem(o, t, i, s), o;
    }
    copyColumns(e) {
      const t = [];
      for (let r = 0; r < e.length; r++) {
        const s = { ...e[r] };
        this.copyHeaderFooter(s, 'header'),
          this.copyHeaderFooter(s, 'footer'),
          (t[r] = s);
      }
      return t;
    }
    copyHeaderFooter(e, t) {
      let r = e[t];
      (r = Array.isArray(r) ? [...r] : [r]),
        r.forEach((s, o) => {
          r[o] = typeof s == 'string' ? { text: s } : { ...s };
        }),
        (e[t] = r);
    }
    setCollapsibleColumns(e, t, r) {
      let s = e.header;
      for (let o = 0; o < s.length; o++) {
        const i = s[o];
        if (i.collapsible && i.collapsed) {
          if (i.collapsible !== 'first') {
            (e.collapsed = !0), (e.width = 36), (i.vertical = !0);
            const l = s.length - o;
            (s = s.slice(0, o + 1)), (s[o].rowspan = l);
          }
          const a = i.colspan;
          if (a) {
            const l = s[o + 1];
            let c = 1;
            l && l.colspan && !l.collapsed && (c = l.colspan);
            for (let u = c; u < a; u++) {
              const d = r[t + u];
              d && (d.hidden = !0);
            }
          }
        }
      }
    }
    normalizeColumns(e, t, r, s, o) {
      const i = e[t];
      i.width || (i.width = i.flexgrow ? 17 : o.columnWidth),
        (i._colindex = t + 1);
      const a = i[r],
        l = o[`${r}RowHeights`];
      for (let c = 0; c < s; c++) {
        const u = a[c];
        (u.id = i.id),
          c === a.length - 1 &&
            (u.rowspan = u.rowspan ? Math.min(u.rowspan, s - c) : s - c);
        for (let d = 1; d < u.rowspan; d++) {
          a.splice(c + d, 0, { _hidden: !0 });
          for (let f = 1; f < u.colspan; f++) e[t + f][r].splice(c + d, 0, {});
        }
        if (u.rowspan) {
          const d = (u.rowspan === s ? l : l.slice(c, u.rowspan + c)).reduce(
            (f, g) => f + g,
            0,
          );
          (u.height = d), c + u.rowspan != s && u.height--;
        }
        if (u.colspan) {
          let d = i.width,
            f = i.flexgrow || 0;
          const g = u.colspan;
          for (let m = 1; m < g; m++) {
            const h = e[t + m];
            h &&
              (h.hidden
                ? (u.colspan -= 1)
                : h.flexgrow
                  ? (f += h.flexgrow)
                  : (d += h.width || o.columnWidth)),
              f ? (u.flexgrow = f) : (u.width = d);
          }
        } else (u.width = i.width), (u.flexgrow = i.flexgrow);
        r === 'header' &&
          u.filter &&
          typeof u.filter == 'string' &&
          (u.filter = { type: u.filter });
      }
      a.length > s && (a.length = s), (i[r] = a);
    }
    normalizeRows(e) {
      for (let t = 0; t < e.length; t++) e[t].id || (e[t].id = An());
      return e;
    }
    normalizeTreeRows(e, t, r) {
      return (
        e.forEach((s) => {
          s.id || (s.id = An()),
            (s.$level = t || 0),
            (s.$parent = r || 0),
            (this._branches[s.id] = s),
            s.data &&
              (s.data.length
                ? ((s.$count = s.data.length),
                  this.normalizeTreeRows(s.data, s.$level + 1, s.id))
                : (delete s.data, delete s.$count, delete s.open));
        }),
        e
      );
    }
    sortTree(e, t) {
      e.sort(t),
        e.forEach((r) => {
          r.data && this.sortTree(r.data, t);
        });
    }
    filterTree(e, t, r) {
      return (
        e.forEach((s) => {
          t(s) && r.push(s.id), s.data && this.filterTree(s.data, t, r);
        }),
        r
      );
    }
    flattenRows(e, t, r) {
      const s = t;
      return (
        e.forEach((o) => {
          (!r || r.includes(o.id)) && s.push(o),
            o.data?.length && o.open !== !1 && this.flattenRows(o.data, s, r);
        }),
        s
      );
    }
    createFilter(e) {
      const { _columns: t } = this.getState(),
        r = [];
      for (const s in e) {
        const { config: o, type: i } = t
            .find((l) => l.id == s)
            .header.find((l) => l.filter).filter,
          a = e[s];
        r.push((l) => (o?.handler ? o.handler(l[s], a) : dc(i)(l[s], a)));
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
      const { flatData: s, columns: o } = this.getState(),
        i = t ? o.filter((a) => t[a.id]) : o;
      return (
        s.forEach((a) => {
          const l = {};
          i.forEach((c) => {
            const u = It(a, c);
            String(u).toLowerCase().includes(e) && (l[c.id] = !0);
          }),
            Object.keys(l).length && (r[a.id] = l);
        }),
        r
      );
    }
    normalizeSizes(e, t, r, s, o) {
      const i = Ds(e, 'header', r, t.headerHeight, o),
        a = Ds(e, 'footer', s, t.footerHeight, o),
        l = i.reduce((u, d) => u + d, 0),
        c = a.reduce((u, d) => u + d, 0);
      return {
        ...t,
        headerRowHeights: i,
        footerRowHeights: a,
        headerHeight: l,
        footerHeight: c,
      };
    }
  },
  hc = /* @__PURE__ */ new Date().valueOf();
function An() {
  return 'temp://' + hc++;
}
function gc(n, e = 'data-id') {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
/* @__PURE__ */ new Date().valueOf();
var pc = class {
    constructor() {
      this.store = /* @__PURE__ */ new Map();
    }
    configure(n, e) {
      this.node = e;
      for (const t in n)
        if (n[t]) {
          const r = t.toLowerCase().replace(/[ ]/g, ''),
            s = n[t];
          this.store.set(r, s);
        }
    }
  },
  en = [],
  mc = {
    subscribe: (n) => {
      wc();
      const e = new pc();
      return (
        en.push(e),
        n(e),
        () => {
          const t = en.findIndex((r) => r === e);
          t >= 0 && en.splice(t, 1);
        }
      );
    },
  },
  Es = !1;
function wc() {
  Es ||
    ((Es = !0),
    document.addEventListener('keydown', (n) => {
      if (
        en.length &&
        (n.ctrlKey ||
          n.altKey ||
          n.metaKey ||
          n.shiftKey ||
          n.key.length > 1 ||
          n.key === ' ')
      ) {
        const e = [];
        n.ctrlKey && e.push('ctrl'),
          n.altKey && e.push('alt'),
          n.metaKey && e.push('meta'),
          n.shiftKey && e.push('shift');
        let t = n.code.replace('Key', '').toLocaleLowerCase();
        n.key === ' ' && (t = 'space'), e.push(t);
        const r = e.join('+');
        for (let s = en.length - 1; s >= 0; s--) {
          const o = en[s],
            i = o.store.get(r) || o.store.get(t);
          i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
        }
      }
    }));
}
const xc = {
  tab: !0,
  'shift+tab': !0,
  arrowup: !0,
  arrowdown: !0,
  arrowright: !0,
  arrowleft: !0,
  enter: !0,
  escape: !0,
  f2: !0,
  home: !0,
  end: !0,
  'ctrl+home': !0,
  'ctrl+end': !0,
  'ctrl+z': !0,
  'ctrl+y': !0,
};
function Xr(n, { keys: e, exec: t }) {
  if (!e) return;
  function r(i) {
    const a = i.target;
    return (
      a.tagName === 'INPUT' ||
      a.tagName === 'TEXTAREA' ||
      gc(a, 'data-header-id')?.classList.contains('wx-filter') ||
      !!a.closest('.wx-cell.wx-editor')
    );
  }
  const s = {};
  for (const i in e) {
    const a = e[i];
    typeof a < 'u' &&
      (typeof a == 'function'
        ? (s[i] = a)
        : a &&
          (s[i] = (l) => {
            const c = r(l);
            t({ key: i, event: l, isInput: c });
          }));
  }
  const o = mc.subscribe((i) => {
    i.configure(s, n);
  });
  return {
    destroy: () => {
      o();
    },
  };
}
function yc(n, e) {
  let t = null;
  e.scroll.subscribe((r) => {
    if (!r || r === t) return;
    t = r;
    const { left: s, top: o, height: i, width: a } = r,
      l = e.getHeight(),
      c = e.getWidth(),
      u = e.getScrollMargin();
    if (o >= 0) {
      const d = n.scrollTop;
      o < d ? (n.scrollTop = o) : o + i > d + l && (n.scrollTop = o - l + i);
    }
    if (s >= 0) {
      const d = n.scrollLeft;
      s < d
        ? (n.scrollLeft = s)
        : s + a > d + c - u && (n.scrollLeft = s - c + a + u);
    }
  });
}
function Wt(n) {
  const e = n.getAttribute('data-id'),
    t = parseInt(e);
  return isNaN(t) || t.toString() != e ? e : t;
}
function vc(n, e, t) {
  const r = n.getBoundingClientRect(),
    s = e.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - t.clientY,
    db: t.clientY - r.top,
  };
}
function Rs(n) {
  return n && n.getAttribute('data-context-id');
}
const Is = 5;
function kc(n, e) {
  let t, r, s, o, i, a, l, c, u;
  function d(S) {
    (o = S.clientX),
      (i = S.clientY),
      (a = {
        ...vc(t, n, S),
        y: e.getTask(s).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function f(S) {
    (t = st(S)),
      Rs(t) &&
        ((s = Wt(t)),
        (u = setTimeout(() => {
          (c = !0), e && e.touchStart && e.touchStart(), d(S.touches[0]);
        }, 500)),
        n.addEventListener('touchmove', y),
        n.addEventListener('contextmenu', g),
        window.addEventListener('touchend', b));
  }
  function g(S) {
    if (c || u) return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 &&
      ((t = st(S)),
      Rs(t) &&
        ((s = Wt(t)),
        n.addEventListener('mousemove', w),
        window.addEventListener('mouseup', v),
        d(S)));
  }
  function h(S) {
    n.removeEventListener('mousemove', w),
      n.removeEventListener('touchmove', y),
      document.body.removeEventListener('mouseup', v),
      document.body.removeEventListener('touchend', b),
      (document.body.style.userSelect = ''),
      S &&
        (n.removeEventListener('mousedown', m),
        n.removeEventListener('touchstart', f));
  }
  function x(S) {
    const _ = S.clientX - o,
      T = S.clientY - i;
    if (!r) {
      if (
        (Math.abs(_) < Is && Math.abs(T) < Is) ||
        (e && e.start && e.start({ id: s, e: S }) === !1)
      )
        return;
      (r = t.cloneNode(!0)),
        (r.style.pointerEvents = 'none'),
        r.classList.add('wx-reorder-task'),
        (r.style.position = 'absolute'),
        (r.style.left = a.left + 'px'),
        (r.style.top = a.top + 'px'),
        (t.style.visibility = 'hidden'),
        t.parentNode.insertBefore(r, t);
    }
    if (r) {
      const X = Math.round(Math.max(0, a.top + T));
      if (e && e.move && e.move({ id: s, top: X, detail: l }) === !1) return;
      const N = e.getTask(s),
        A = N.$y;
      if (!a.start && a.y == A) return M();
      (a.start = !0), (a.y = N.$y - 4), (r.style.top = X + 'px');
      const C = document.elementFromPoint(S.clientX, S.clientY),
        P = st(C);
      if (P && P !== t) {
        const O = Wt(P),
          G = P.getBoundingClientRect(),
          D = G.top + G.height / 2,
          B = S.clientY + a.db > D && P.nextElementSibling !== t,
          H = S.clientY - a.dt < D && P.previousElementSibling !== t;
        l?.after == O || l?.before == O
          ? (l = null)
          : B
            ? (l = { id: s, after: O })
            : H && (l = { id: s, before: O });
      }
    }
  }
  function w(S) {
    x(S);
  }
  function y(S) {
    c
      ? (S.preventDefault(), x(S.touches[0]))
      : u && (clearTimeout(u), (u = null));
  }
  function b() {
    (c = null), u && (clearTimeout(u), (u = null)), M();
  }
  function v() {
    M();
  }
  function M() {
    t && (t.style.visibility = ''),
      r &&
        (r.parentNode.removeChild(r),
        e && e.end && e.end({ id: s, top: a.top })),
      (s = t = r = a = l = null),
      h();
  }
  return (
    n.style.position !== 'absolute' && (n.style.position = 'relative'),
    n.addEventListener('mousedown', m),
    n.addEventListener('touchstart', f),
    {
      destroy() {
        h(!0);
      },
    }
  );
}
const bc = {
  grid: {
    'Add before': 'Add before',
    'Add after': 'Add after',
    Copy: 'Copy',
    Cut: 'Cut',
    Paste: 'Paste',
    Delete: 'Delete',
    'New row': 'New row',
    'Move up': 'Move up',
    'Move down': 'Move down',
    Undo: 'Undo',
    Redo: 'Redo',
  },
};
function Xo(n, e) {
  return n.map((t) => {
    const r = e(t);
    return t.data && t.data.length && (r.data = Xo(t.data, e)), r;
  });
}
function qo(n, e) {
  const t = [];
  return (
    n.forEach((r) => {
      if (r.data) {
        const s = qo(r.data, e);
        s.length && t.push({ ...r, data: s });
      } else e(r) && t.push(r);
    }),
    t
  );
}
let Sc = 1;
function $c(n) {
  return Xo(n, (e) => {
    const t = { ...e, id: e.id || Sc++ };
    return t.type && (t.comp = t.type), t;
  });
}
const Qo = {};
function Cc(n) {
  return Qo[n] || n;
}
function _c(n, e) {
  Qo[n] = e;
}
function Nc({ onClick: n, onShow: e, option: t }) {
  const r = Y(null),
    s = R(() => {
      e(t.data ? t.id : !1, r.current);
    }, [e, t]),
    o = $(() => (t && t.comp ? Cc(t.comp) : null), [t]);
  return /* @__PURE__ */ ee('div', {
    ref: r,
    className: `wx-cDCz9rZQ wx-option ${t.css || ''} ${t.disabled ? 'wx-disabled' : ''}`,
    'data-id': t.id,
    onMouseEnter: s,
    onClick: n,
    children: [
      t.icon
        ? /* @__PURE__ */ p('i', { className: `wx-cDCz9rZQ wx-icon ${t.icon}` })
        : null,
      t.comp
        ? o
          ? /* @__PURE__ */ p(o, { item: t, option: t })
          : null
        : /* @__PURE__ */ ee('span', {
            className: 'wx-cDCz9rZQ wx-value',
            children: [' ', t.text, ' '],
          }),
      t.subtext
        ? /* @__PURE__ */ p('span', {
            className: 'wx-cDCz9rZQ wx-subtext',
            children: t.subtext,
          })
        : null,
      t.data
        ? /* @__PURE__ */ p('i', {
            className: 'wx-cDCz9rZQ wx-sub-icon wxi-angle-right',
          })
        : null,
    ],
  });
}
function qr({
  options: n,
  left: e = 0,
  top: t = 0,
  at: r = 'bottom',
  parent: s = null,
  mount: o = null,
  context: i = null,
  css: a = '',
  onClick: l,
}) {
  const [c, u] = J(-1e4),
    [d, f] = J(-1e4),
    [g, m] = J(20),
    [h, x] = J(),
    w = Y(null),
    [y, b] = J(!1),
    [v, M] = J(null),
    S = R(() => {
      const A = mi(w.current, s, r, e, t);
      A && (u(A.x), f(A.y), m(A.z), x(A.width));
    }, [s, r, e, t]);
  j(() => {
    o && o(S);
  }, []);
  const _ = R(() => {
      b(!1);
    }, []),
    T = R(() => {
      l && l({ action: null, option: null });
    }, [l]),
    X = R((A, C) => {
      b(A), M(C);
    }, []),
    N = $(() => $c(n), [n]);
  return (
    j(() => {
      S();
    }, [s, S]),
    j(() => {
      if (w.current) return xn(w.current, { callback: T, modal: !0 }).destroy;
    }, [T]),
    /* @__PURE__ */ p('div', {
      ref: w,
      'data-wx-menu': 'true',
      className: `wx-XMmAGqVx wx-menu ${a}`,
      style: {
        position: 'absolute',
        top: d + 'px',
        left: c + 'px',
        width: h,
        zIndex: g,
      },
      onMouseLeave: _,
      children: N.map((A) =>
        /* @__PURE__ */ ee(
          fn,
          {
            children: [
              A.comp === 'separator'
                ? /* @__PURE__ */ p('div', {
                    className: 'wx-XMmAGqVx wx-separator',
                  })
                : /* @__PURE__ */ p(Nc, {
                    option: A,
                    onShow: X,
                    onClick: (C) => {
                      if (!A.data && !C.defaultPrevented) {
                        const P = {
                          context: i,
                          action: A,
                          option: A,
                          event: C,
                        };
                        A.handler && A.handler(P),
                          l && l(P),
                          C.stopPropagation();
                      }
                    },
                  }),
              A.data && y === A.id
                ? /* @__PURE__ */ p(qr, {
                    css: a,
                    options: A.data,
                    at: 'right-overlap',
                    parent: v,
                    context: i,
                    onClick: l,
                  })
                : null,
            ],
          },
          A.id,
        ),
      ),
    })
  );
}
const Mc = Ut(function (n, e) {
  const {
      options: t,
      at: r = 'bottom',
      resolver: s = null,
      dataKey: o = 'contextId',
      filter: i = null,
      css: a = '',
      children: l,
      onClick: c,
    } = n,
    [u, d] = J(null),
    [f, g] = J(null),
    [m, h] = J(0),
    [x, w] = J(0),
    y = $(() => (u !== null && i ? qo(t, (S) => i(S, u)) : t), [u, i, t]),
    b = R(
      (S) => {
        g(null), c && c(S);
      },
      [c],
    ),
    v = R((S, _) => {
      let T = null;
      for (; S && S.dataset && !T; ) (T = S.dataset[_]), (S = S.parentNode);
      return T ? sn(T) : null;
    }, []),
    M = R(
      (S, _) => {
        if (!S) {
          g(null);
          return;
        }
        if (S.defaultPrevented) return;
        const T = S.target;
        if (T && T.dataset && T.dataset.menuIgnore) return;
        h(S.clientX + 1), w(S.clientY + 1);
        let X = typeof _ < 'u' ? _ : v(T, o);
        (s && ((X = s(X, S)), !X)) || (d(X), g(T), S.preventDefault());
      },
      [o, v, s],
    );
  return (
    Gt(e, () => ({ show: M }), [M]),
    /* @__PURE__ */ ee(Ue, {
      children: [
        l
          ? /* @__PURE__ */ p('span', {
              onClick: M,
              'data-menu-ignore': 'true',
              children: typeof l == 'function' ? l() : l,
            })
          : null,
        f
          ? /* @__PURE__ */ p(no, {
              children: /* @__PURE__ */ p(
                qr,
                {
                  css: a,
                  at: r,
                  top: x,
                  left: m,
                  parent: f,
                  context: u,
                  onClick: b,
                  options: y,
                },
                f,
              ),
            })
          : null,
      ],
    })
  );
});
Ut(function (n, e) {
  const {
      options: t,
      at: r = 'bottom',
      css: s = '',
      children: o,
      onClick: i,
    } = n,
    [a, l] = J(null);
  function c(m) {
    l(null), i && i(m);
  }
  const u = R((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Gt(e, () => ({ show: u }), [u]);
  function d(m) {
    let h = m.target;
    for (; !h.dataset.menuIgnore; ) l(h), (h = h.parentNode);
  }
  const f = Y(0),
    g = Y(a);
  return (
    j(() => {
      g.current !== a && ((f.current += 1), (g.current = a));
    }, [a]),
    /* @__PURE__ */ ee(Ue, {
      children: [
        /* @__PURE__ */ p('span', {
          onClick: d,
          'data-menu-ignore': 'true',
          children: o,
        }),
        a
          ? /* @__PURE__ */ p(no, {
              children: /* @__PURE__ */ p(
                qr,
                {
                  css: s,
                  at: r,
                  parent: a,
                  options: t,
                  onClick: c,
                },
                f.current,
              ),
            })
          : null,
      ],
    })
  );
});
const Zo = Ut(function (n, e) {
    const {
        options: t,
        at: r = 'bottom',
        resolver: s = null,
        dataKey: o = 'contextId',
        filter: i = null,
        css: a = '',
        children: l,
        onClick: c,
      } = n,
      u = Y(null),
      d = R((f, g) => {
        u.current.show(f, g);
      }, []);
    return (
      Gt(
        e,
        () => ({
          show: d,
        }),
        [d],
      ),
      /* @__PURE__ */ ee(Ue, {
        children: [
          l
            ? /* @__PURE__ */ p('span', {
                onContextMenu: d,
                'data-menu-ignore': 'true',
                children: l,
              })
            : null,
          /* @__PURE__ */ p(Mc, {
            css: a,
            at: r,
            options: t,
            resolver: s,
            dataKey: o,
            filter: i,
            ref: u,
            onClick: c,
          }),
        ],
      })
    );
  }),
  Jo = {};
function Tc(n) {
  return Jo[n] || n;
}
function ln(n, e) {
  Jo[n] = e;
}
function ei({ menu: n = !1 }) {
  return /* @__PURE__ */ p('div', {
    className: `wx-z1qpqrvg wx-separator${n ? '-menu' : ''}`,
    children: ' ',
  });
}
function ti() {
  return /* @__PURE__ */ p('div', { className: 'wx-1IhFzpJV wx-spacer' });
}
const Dc = ({ key: n, text: e, ...t }) => t;
function Qr(n) {
  const { item: e = {}, menu: t = !1, values: r, onClick: s, onChange: o } = n,
    i = $(() => Tc(e.comp || 'label'), [e]),
    a = R(() => {
      e && e.handler && e.handler(e), s && s({ item: e });
    }, [e, s]),
    l = $(() => (e && e.key && r ? r[e.key] : void 0), [e, r]),
    c = R(
      ({ value: d }) => {
        e && e.handler && e.handler(e, d), o && o({ value: d, item: e });
      },
      [e, o],
    ),
    u = $(
      () => (t ? (e ? e.menuText || e.text : void 0) : e ? e.text : void 0),
      [t, e],
    );
  if (e && e.comp == 'spacer') return /* @__PURE__ */ p(ti, {});
  if (e && e.comp == 'separator') return /* @__PURE__ */ p(ei, { menu: t });
  {
    const d = i,
      f = [
        'wx-tb-element',
        e && e.css ? e.css : '',
        e && e.spacer ? 'wx-spacer' : '',
        t ? 'wx-menu' : '',
      ]
        .filter(Boolean)
        .join(' ');
    return /* @__PURE__ */ p('div', {
      className: 'wx-KVAsgMam ' + f,
      'data-id': e ? e.id : void 0,
      children: /* @__PURE__ */ p(d, {
        value: l,
        onChange: c,
        onClick: a,
        text: u,
        menu: t,
        ...Dc(e),
      }),
    });
  }
}
function Gn({
  item: n,
  values: e = null,
  menu: t = !1,
  onChange: r,
  onClick: s,
}) {
  const [o, i] = J(!0),
    a = () => i(!0),
    l = () => i(!1),
    c = (d) => {
      a(), s && s(d);
    },
    u = [
      'wx-wSVFAGym',
      'wx-tb-group',
      n.css || '',
      n.layout == 'column' ? 'wx-column' : '',
      n.collapsed && !t ? 'wx-group-collapsed' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ p('div', {
    className: u,
    children:
      n.collapsed && !t
        ? /* @__PURE__ */ ee(Ue, {
            children: [
              /* @__PURE__ */ ee('div', {
                className: 'wx-wSVFAGym wx-collapsed',
                onClick: l,
                children: [
                  n.icon
                    ? /* @__PURE__ */ p('i', {
                        className: `wx-wSVFAGym icon ${n.icon}`,
                      })
                    : null,
                  n.text
                    ? /* @__PURE__ */ p('div', {
                        className: 'wx-wSVFAGym wx-label-text',
                        children: n.text,
                      })
                    : null,
                  n.text && !n.icon
                    ? /* @__PURE__ */ p('i', {
                        className: 'wx-wSVFAGym wx-label-arrow wxi-angle-down',
                      })
                    : null,
                ],
              }),
              o
                ? null
                : /* @__PURE__ */ p(an, {
                    width: '',
                    oncancel: a,
                    children: /* @__PURE__ */ p('div', {
                      className: 'wx-wSVFAGym wx-drop-group',
                      children: /* @__PURE__ */ p(Gn, {
                        item: { ...n, text: '', collapsed: !1 },
                        values: e,
                        menu: t,
                        onChange: r,
                        onClick: c,
                      }),
                    }),
                  }),
            ],
          })
        : /* @__PURE__ */ ee(Ue, {
            children: [
              /* @__PURE__ */ p('div', {
                className: 'wx-wSVFAGym wx-tb-body',
                children: n.items.map((d, f) =>
                  d.items
                    ? /* @__PURE__ */ p(
                        Gn,
                        {
                          item: d,
                          values: e,
                          onClick: c,
                          onChange: r,
                        },
                        d.id || f,
                      )
                    : /* @__PURE__ */ p(
                        Qr,
                        {
                          item: d,
                          values: e,
                          onClick: c,
                          onChange: r,
                        },
                        d.id || f,
                      ),
                ),
              }),
              n.text
                ? /* @__PURE__ */ p('div', {
                    className: 'wx-wSVFAGym wx-label',
                    children: n.text,
                  })
                : null,
            ],
          }),
  });
}
function Ec({
  items: n = [],
  css: e,
  values: t,
  width: r,
  onClick: s,
  onChange: o,
}) {
  const [i, a] = J(void 0),
    l = Y(null);
  function c() {
    a(null);
  }
  function u() {
    a(!0);
  }
  function d(f) {
    c(), s && s(f);
  }
  return /* @__PURE__ */ ee('div', {
    className: `wx-Yo6BuX0p wx-menu ${e || ''}`,
    ref: l,
    'data-id': '$menu',
    children: [
      /* @__PURE__ */ p(Mt, { icon: 'wxi-dots-h', onClick: u }),
      i
        ? /* @__PURE__ */ p(an, {
            width: `${r}px`,
            onCancel: c,
            children: /* @__PURE__ */ p('div', {
              className: 'wx-Yo6BuX0p wx-drop-menu',
              children: n.map((f, g) =>
                f.items
                  ? /* @__PURE__ */ p(
                      Gn,
                      {
                        item: f,
                        values: t,
                        menu: !0,
                        onClick: d,
                        onChange: o,
                      },
                      f.id || g,
                    )
                  : /* @__PURE__ */ p(
                      Qr,
                      {
                        item: f,
                        values: t,
                        menu: !0,
                        onClick: d,
                        onChange: o,
                      },
                      f.id || g,
                    ),
              ),
            }),
          })
        : null,
    ],
  });
}
function Rc(n) {
  return (
    n.forEach((e) => {
      e.id || (e.id = jn());
    }),
    n
  );
}
function Ir(n) {
  const {
      items: e,
      menuCss: t = '',
      css: r = '',
      values: s,
      overflow: o = 'menu',
      onClick: i,
      onChange: a,
    } = n,
    [l, c] = Ke(e || []),
    [u, d] = Ke(s || null),
    f = $(() => Rc(l), [l]),
    g = Y(null),
    m = Y(-1),
    [h, x] = J([]),
    w = Y(f);
  j(() => {
    w.current = f;
  }, [l]);
  const y = Y(o);
  j(() => {
    y.current = o;
  }, [o]);
  const b = Y(h);
  j(() => {
    b.current = h;
  }, [h]);
  const v = Y(!1);
  function M(N) {
    u && ((u[N.item.key] = N.value), d({ ...u })), a && a(N);
  }
  function S() {
    const N = g.current;
    if (!N) return 0;
    const A = N.children,
      C = w.current || [];
    let P = 0;
    for (let O = 0; O < C.length; O++)
      C[O].comp !== 'spacer' &&
        ((P += A[O].clientWidth), C[O].comp === 'separator' && (P += 8));
    return P;
  }
  function _() {
    const N = g.current,
      A = w.current || [];
    if (N) {
      for (let C = A.length - 1; C >= 0; C--)
        if (A[C].items && !A[C].collapsed) {
          (A[C].collapsed = !0),
            (A[C].$width = N.children[C].offsetWidth),
            (v.current = !0),
            c([...A]);
          return;
        }
    }
  }
  function T(N) {
    const A = g.current,
      C = w.current || [];
    if (A) {
      for (let P = 0; P < C.length; P++)
        if (C[P].collapsed && C[P].$width) {
          C[P].$width - A.children[P].offsetWidth < N + 10 &&
            ((C[P].collapsed = !1), (v.current = !0)),
            c([...C]);
          return;
        }
    }
  }
  function X() {
    const N = g.current;
    if (!N) return;
    const A = w.current || [],
      C = y.current;
    if (C === 'wrap') return;
    const P = N.clientWidth;
    if (N.scrollWidth > P) {
      if (C === 'collapse') return _();
      const O = N.children;
      let G = 0;
      for (let D = 0; D < A.length; D++) {
        if (
          ((G += O[D].clientWidth),
          A[D].comp === 'separator' && (G += 8),
          G > P - 40)
        ) {
          if (m.current === D) return;
          m.current = D;
          const B = [];
          for (let H = D; H < A.length; H++)
            B.push(A[H]), (O[H].style.visibility = 'hidden');
          D > 0 &&
            A[D - 1].comp === 'separator' &&
            (O[D - 1].style.visibility = 'hidden'),
            x(B);
          break;
        }
        O[D].style.visibility = '';
      }
    } else {
      const O = P - S();
      if (O <= 0) return;
      if (C === 'collapse') return T(O);
      if ((b.current || []).length) {
        m.current = null;
        const G = N.children;
        for (let D = 0; D < A.length; D++) G[D].style.visibility = '';
        x([]);
      }
    }
  }
  return (
    j(() => {
      v.current && ((v.current = !1), X());
    }, [l]),
    j(() => {
      const N = new ResizeObserver(() => X());
      return (
        g.current && N.observe(g.current),
        () => {
          N.disconnect();
        }
      );
    }, []),
    /* @__PURE__ */ ee('div', {
      className: `wx-VdPSJj8y wx-toolbar ${r || ''} ${o === 'wrap' ? 'wx-wrap' : ''}`,
      ref: g,
      children: [
        f.map((N) =>
          N.items
            ? /* @__PURE__ */ p(
                Gn,
                {
                  item: N,
                  values: u,
                  onClick: i,
                  onChange: M,
                },
                N.id,
              )
            : /* @__PURE__ */ p(
                Qr,
                {
                  item: N,
                  values: u,
                  onClick: i,
                  onChange: M,
                },
                N.id,
              ),
        ),
        !!h.length &&
          /* @__PURE__ */ p(Ec, {
            items: h,
            css: t,
            values: u,
            onClick: i,
            onChange: M,
          }),
      ],
    })
  );
}
function Ic(n) {
  const {
    icon: e,
    text: t = '',
    css: r,
    type: s,
    disabled: o,
    menu: i,
    onClick: a,
  } = n;
  return i
    ? /* @__PURE__ */ ee('div', {
        className: 'wx-HXpG4gnx wx-item',
        onClick: a,
        children: [
          /* @__PURE__ */ p('i', {
            className: `wx-HXpG4gnx ${e || 'wxi-empty'} ${r || ''}`,
          }),
          t,
        ],
      })
    : /* @__PURE__ */ p(Mt, {
        icon: e,
        type: s,
        css: r,
        text: t,
        disabled: o,
        onClick: a,
      });
}
function Hc(n) {
  const { text: e, value: t, children: r } = n;
  return r
    ? /* @__PURE__ */ p('div', {
        className: 'wx-PTEZGYcj wx-label',
        children: r(),
      })
    : /* @__PURE__ */ p('div', {
        className: 'wx-PTEZGYcj wx-label',
        children: t || e,
      });
}
function Ac(n) {
  const {
    icon: e,
    text: t,
    css: r,
    type: s,
    disabled: o,
    menu: i,
    onClick: a,
  } = n;
  return i
    ? /* @__PURE__ */ ee('div', {
        className: 'wx-3cuSqONJ wx-item',
        onClick: a,
        children: [
          e
            ? /* @__PURE__ */ p('i', {
                className: `wx-3cuSqONJ ${e || ''} ${r || ''}`,
              })
            : null,
          t,
        ],
      })
    : /* @__PURE__ */ p(Mt, {
        icon: e,
        type: s,
        css: r,
        title: t,
        disabled: o,
        onClick: a,
      });
}
function Lc({
  id: n = '',
  text: e = '',
  css: t = '',
  icon: r = '',
  onClick: s,
}) {
  function o() {
    s && s({ id: n });
  }
  return /* @__PURE__ */ ee('div', {
    className: `wx-U0Bx7pIR wx-label ${t}`,
    onClick: o,
    children: [
      r ? /* @__PURE__ */ p('i', { className: 'wx-U0Bx7pIR ' + r }) : null,
      e,
    ],
  });
}
ln('button', Ic);
ln('separator', ei);
ln('spacer', ti);
ln('label', Hc);
ln('item', Lc);
ln('icon', Ac);
const ft = rn(null);
function Pc(n, e) {
  const t = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return (
    t.observe(n.parentNode),
    {
      destroy() {
        t.disconnect();
      },
    }
  );
}
const Hs = 5,
  Oc = 700;
function zc(n) {
  return sn(n.getAttribute('data-id'));
}
function On(n) {
  const e = n.getBoundingClientRect(),
    t = document.body,
    r = e.top + t.scrollTop - t.clientTop || 0,
    s = e.left + t.scrollLeft - t.clientLeft || 0;
  return {
    y: Math.round(r),
    x: Math.round(s),
    width: n.offsetWidth,
    height: n.offsetHeight,
  };
}
function Hr(n, e) {
  const t = On(e);
  return { x: n.clientX - t.x, y: n.clientY - t.y };
}
function Wc(n, e) {
  const t = e.current;
  let r = null,
    s,
    o,
    i = !1,
    a = !1;
  const l = document.createElement('DIV');
  (l.className = 'wx-drag-zone'), l.setAttribute('tabindex', -1);
  function c() {
    clearTimeout(s), (s = null);
  }
  function u(_) {
    const T = st(_);
    T &&
      ((r = {
        container: l,
        sourceNode: _.target,
        from: zc(T),
        pos: Hr(_, n),
      }),
      (o = r.pos),
      d(_));
  }
  function d(_) {
    if (!r) return;
    const T = (r.pos = Hr(_, n));
    if (!i) {
      if (
        !a &&
        !_?.target?.getAttribute('draggable-data') &&
        Math.abs(o.x - T.x) < Hs &&
        Math.abs(o.y - T.y) < Hs
      )
        return;
      if (M(_) === !1) return S();
    }
    if (a) {
      const X =
          window.scrollX ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft,
        N =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      r.targetNode = document.elementFromPoint(_.pageX - X, _.pageY - N);
    } else r.targetNode = _.target;
    t.move && t.move(_, r),
      (l.style.left = -(r.offset ? r.offset.x : 0) + 'px'),
      (l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + 'px');
  }
  function f(_) {
    l.parentNode && l.parentNode.removeChild(l),
      (l.innerHTML = ''),
      i && t.end && t.end(_, r),
      (r = o = null),
      S();
  }
  function g(_) {
    (t.getReorder && !t.getReorder()) ||
      (_.button === 0 &&
        (v(_),
        window.addEventListener('mousemove', m),
        window.addEventListener('mouseup', h),
        u(_)));
  }
  function m(_) {
    d(_);
  }
  function h(_) {
    f(_);
  }
  function x(_) {
    if (t.getReorder && !t.getReorder()) return;
    (s = setTimeout(() => {
      (a = !0), u(_.touches[0]);
    }, Oc)),
      v(_);
    function T() {
      s && c(),
        _.target.removeEventListener('touchmove', w),
        _.target.removeEventListener('touchend', T),
        f(_);
    }
    _.target.addEventListener('touchmove', w),
      _.target.addEventListener('touchend', T),
      n.addEventListener('contextmenu', y);
  }
  function w(_) {
    i ? (_.preventDefault(), d(_.touches[0])) : s && c();
  }
  function y(_) {
    if (i || s) return _.preventDefault(), !1;
  }
  function b(_) {
    _.preventDefault();
  }
  function v(_) {
    if (!t.getDraggableInfo) return;
    const { hasDraggable: T } = t.getDraggableInfo();
    (!T || _.target.getAttribute('draggable-data')) &&
      ((document.body.style.userSelect = 'none'),
      (document.body.style.webkitUserSelect = 'none'));
  }
  function M(_) {
    if (((i = !0), t.start)) {
      if (t.start(_, r) === !1) return !1;
      n.appendChild(l), (document.body.style.cursor = 'move');
    }
  }
  function S(_) {
    (i = a = !1),
      (document.body.style.cursor = ''),
      (document.body.style.userSelect = ''),
      (document.body.style.webkitUserSelect = ''),
      window.removeEventListener('mousemove', m),
      window.removeEventListener('mouseup', h),
      _ &&
        (n.removeEventListener('mousedown', g),
        n.removeEventListener('touchstart', x),
        n.removeEventListener('dragstart', b));
  }
  return (
    n.addEventListener('mousedown', g),
    n.addEventListener('touchstart', x),
    n.addEventListener('dragstart', b),
    {
      destroy() {
        S(!0);
      },
    }
  );
}
const Fc = 4e-3;
function Yc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1,
  };
}
function Bc(n, e, t, r) {
  const {
      node: s,
      left: o,
      top: i,
      bottom: a,
      sense: l,
      xScroll: c,
      yScroll: u,
    } = r,
    d = Hr(n, s);
  t.scrollState || (t.scrollState = Yc());
  let f = 0,
    g = 0;
  d.x < o + l ? (f = -1) : d.x > e.width - l && (f = 1),
    d.y < i + Math.round(l / 2)
      ? (g = -1)
      : d.y > e.height - a - Math.round(l / 2) && (g = 1),
    (t.scrollState.dirX !== f || t.scrollState.dirY !== g) &&
      (ni(t), (t.scrollState.dirX = f), (t.scrollState.dirY = g)),
    ((c && t.scrollState.dirX !== 0) || (u && t.scrollState.dirY !== 0)) &&
      Vc(t, r, {
        x: t.scrollState.dirX,
        y: t.scrollState.dirY,
      });
}
function Vc(n, e, t) {
  n.autoScrollTimer ||
    (n.autoScrollTimer = setTimeout(() => {
      n.activeAutoScroll = setInterval(Uc, 15, n, e, t);
    }, 250));
}
function ni(n) {
  (n.scrollSpeedFactor = 1),
    n.autoScrollTimer &&
      ((n.autoScrollTimer = clearTimeout(n.autoScrollTimer)),
      (n.activeAutoScroll = clearInterval(n.activeAutoScroll)));
}
function Uc(n, e, t) {
  const { x: r, y: s } = t;
  (n.scrollSpeedFactor += Fc), r !== 0 && jc(n, e, r), s !== 0 && Gc(n, e, s);
}
function Gc(n, e, t) {
  const r = e.node.scrollTop;
  ri(r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t, 'scrollTop', e);
}
function jc(n, e, t) {
  const r = e.node.scrollLeft;
  ri(r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t, 'scrollLeft', e);
}
function ri(n, e, t) {
  t.node[e] = n;
}
function er(n, e, t, r, s, o) {
  const i = {};
  return (
    n && ((i.width = `${n}px`), (i.minWidth = `${n}px`)),
    e && (i.flexGrow = e),
    o && (i.height = `${o}px`),
    t &&
      ((i.position = 'sticky'),
      t.left && (i.left = `${r}px`),
      t.right && (i.right = `${s}px`)),
    i
  );
}
function si(n, e, t) {
  let r = '';
  if (n.fixed)
    for (const s in n.fixed)
      r += n.fixed[s] === -1 ? 'wx-shadow ' : 'wx-fixed ';
  return (
    (r += e.rowspan > 1 ? 'wx-rowspan ' : ''),
    (r += e.colspan > 1 ? 'wx-colspan ' : ''),
    (r += e.vertical ? 'wx-vertical ' : ''),
    (r += t ? t(n) + ' ' : ''),
    r
  );
}
function Kc(n) {
  const {
      row: e,
      column: t,
      cellStyle: r = null,
      columnStyle: s = null,
      children: o,
    } = n,
    [i, a] = Ke(n.focusable),
    l = Ie(ft),
    c = ce(l, 'focusCell'),
    u = ce(l, 'search'),
    d = ce(l, 'reorder'),
    f = $(() => u?.rows[e.id] && u.rows[e.id][t.id], [u, e.id, t.id]),
    g = $(
      () => er(t.width, t.flexgrow, t.fixed, t.left, t.right),
      [t.width, t.flexgrow, t.fixed, t.left, t.right],
    );
  function m(S, _) {
    let T = 'wx-cell';
    return (
      (T += t.fixed ? ' ' + (t.fixed === -1 ? 'wx-shadow' : 'wx-fixed') : ''),
      (T += S ? ' ' + S(t) : ''),
      (T += _ ? ' ' + _(e, t) : ''),
      (T += t.treetoggle ? ' wx-tree-cell' : ''),
      T
    );
  }
  const h = $(() => m(s, r), [s, r, t, e]),
    x = $(
      () =>
        typeof t.draggable == 'function'
          ? t.draggable(e, t) !== !1
          : t.draggable,
      [t, e],
    ),
    w = Y(null);
  j(() => {
    w.current &&
      i &&
      c?.row === e.id &&
      c?.column === t.id &&
      w.current.focus();
  }, [c, i, e.id, t.id]);
  const y = R(() => {
    i &&
      !c &&
      l.exec('focus-cell', {
        row: e.id,
        column: t.id,
        eventSource: 'focus',
      });
  }, [l, i, c, e.id, t.id]);
  j(
    () => () => {
      i && c && (l.exec('focus-cell', { eventSource: 'destroy' }), a(!1));
    },
    [l, a],
  );
  function b(S) {
    const _ = new RegExp(`(${u.value.trim()})`, 'gi');
    return String(S)
      .split(_)
      .map((T) => ({ text: T, highlight: _.test(T) }));
  }
  const v = $(() => {
      const S = (t.fixed && t.fixed.left === -1) || t.fixed.right === -1,
        _ = t.fixed && t.fixed.right;
      return [h, S ? 'wx-shadow' : '', _ ? 'wx-fixed-right' : '']
        .filter(Boolean)
        .join(' ');
    }, [h, t]),
    M = t.cell;
  return /* @__PURE__ */ ee('div', {
    className: 'wx-TSCaXsGV ' + v,
    ref: w,
    onFocus: y,
    style: g,
    'data-row-id': e.id,
    'data-col-id': t.id,
    tabIndex: i ? '0' : '-1',
    role: 'gridcell',
    'aria-colindex': t._colindex,
    'aria-readonly': t.editor ? void 0 : !0,
    children: [
      d && t.draggable
        ? x
          ? /* @__PURE__ */ p('i', {
              'draggable-data': 'true',
              className: 'wx-TSCaXsGV wx-draggable wxi-drag',
            })
          : /* @__PURE__ */ p('i', {
              className: 'wx-TSCaXsGV wx-draggable-stub',
            })
        : null,
      t.treetoggle
        ? /* @__PURE__ */ ee(Ue, {
            children: [
              /* @__PURE__ */ p('span', {
                style: { marginLeft: `${e.$level * 28}px` },
              }),
              e.$count
                ? /* @__PURE__ */ p('i', {
                    'data-action': 'toggle-row',
                    className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? 'down' : 'right'}`,
                  })
                : null,
            ],
          })
        : null,
      M
        ? /* @__PURE__ */ p(M, {
            api: l,
            row: e,
            column: t,
            onAction: ({ action: S, data: _ }) => l.exec(S, _),
          })
        : o
          ? o()
          : f
            ? /* @__PURE__ */ p('span', {
                children: b(It(e, t)).map(({ highlight: S, text: _ }, T) =>
                  S
                    ? /* @__PURE__ */ p(
                        'mark',
                        { className: 'wx-TSCaXsGV wx-search', children: _ },
                        T,
                      )
                    : /* @__PURE__ */ p('span', { children: _ }, T),
                ),
              })
            : It(e, t),
    ],
  });
}
function As(n, e) {
  let t, r;
  function s(a) {
    (t = a.clientX),
      (n.style.opacity = 1),
      (document.body.style.cursor = 'ew-resize'),
      (document.body.style.userSelect = 'none'),
      window.addEventListener('mousemove', o),
      window.addEventListener('mouseup', i),
      e && e.down && e.down(n);
  }
  function o(a) {
    (r = a.clientX - t), e && e.move && e.move(r);
  }
  function i() {
    (n.style.opacity = ''),
      (document.body.style.cursor = ''),
      (document.body.style.userSelect = ''),
      e && e.up && e.up(r),
      window.removeEventListener('mousemove', o),
      window.removeEventListener('mouseup', i);
  }
  return (
    n.addEventListener('mousedown', s),
    {
      destroy() {
        n.removeEventListener('mousedown', s);
      },
    }
  );
}
function Xc({ filter: n, column: e, action: t, filterValue: r }) {
  function s({ value: o }) {
    t({ value: o, key: e.id });
  }
  return /* @__PURE__ */ p(bn, {
    ...(n.config ?? {}),
    value: r,
    onChange: s,
  });
}
function qc({ filter: n, column: e, action: t, filterValue: r }) {
  const s = Ie(ft),
    o = ce(s, 'flatData'),
    i = $(() => n?.config?.options || e?.options || l(), [n, e, o]),
    a = $(() => n?.config?.template, [n]);
  function l() {
    const d = [];
    return (
      o.forEach((f) => {
        const g = Vt(f, e);
        d.includes(g) || d.push(g);
      }),
      d.map((f) => ({ id: f, label: f }))
    );
  }
  function c({ value: d }) {
    t({ value: d, key: e.id });
  }
  function u(d) {
    d.key !== 'Tab' && d.preventDefault();
  }
  return /* @__PURE__ */ p('div', {
    style: { width: '100%' },
    onKeyDown: u,
    children: /* @__PURE__ */ p(eo, {
      placeholder: '',
      clear: !0,
      ...(n?.config ?? {}),
      options: i,
      value: r,
      onChange: c,
      children: (d) => (a ? a(d) : d.label),
    }),
  });
}
const Qc = {
  text: Xc,
  richselect: qc,
};
function Zc({ filter: n, column: e }) {
  const t = Ie(ft),
    r = ce(t, 'filterValues');
  function s(i) {
    t.exec('filter-rows', i);
  }
  const o = $(() => Qc[n.type], [n.type]);
  return /* @__PURE__ */ p(o, {
    filter: n,
    column: e,
    action: s,
    filterValue: r[e.id],
  });
}
function Jc(n) {
  const {
      cell: e,
      column: t,
      row: r,
      lastRow: s,
      sortRow: o,
      columnStyle: i,
      bodyHeight: a,
      hasSplit: l,
    } = n,
    c = Ie(ft),
    u = ce(c, 'sortMarks'),
    d = $(() => (u ? u[t.id] : void 0), [u, t.id]),
    f = Y(),
    g = R(
      (O) => {
        f.current = e.flexgrow ? O.parentNode.clientWidth : e.width;
      },
      [e.flexgrow, e.width],
    ),
    m = R(
      (O, G) => {
        c.exec('resize-column', {
          id: e.id,
          width: Math.max(1, (f.current || 0) + O),
          inProgress: G,
        });
      },
      [c, e.id],
    ),
    h = R((O) => m(O, !0), [m]),
    x = R((O) => m(O, !1), [m]),
    w = R(
      (O) => {
        if (!t.sort || e.filter) return;
        let G = d?.order;
        G && (G = G === 'asc' ? 'desc' : 'asc'),
          c.exec('sort-rows', { key: e.id, add: O.ctrlKey, order: G });
      },
      [c, e.id, e.filter, t.sort, d?.order],
    ),
    y = R(
      (O) => {
        O && O.stopPropagation(),
          c.exec('collapse-column', { id: e.id, row: r });
      },
      [c, e.id, r],
    ),
    b = R(
      (O) => {
        O.key === 'Enter' && y();
      },
      [y],
    ),
    v = R(
      (O) => {
        O.key === 'Enter' && !e.filter && w(O);
      },
      [w, e.filter],
    ),
    M = $(() => e.collapsed && t.collapsed, [e.collapsed, t.collapsed]),
    S = $(() => M && !l && e.collapsible !== 'header', [M, l, e.collapsible]),
    _ = $(() => (S ? { top: -a / 2, position: 'absolute' } : {}), [S, a]),
    T = $(
      () =>
        er(
          e.width,
          e.flexgrow,
          t.fixed,
          t.left,
          e.right ?? t.right,
          e.height + (M && S ? a : 0),
        ),
      [
        e.width,
        e.flexgrow,
        t.fixed,
        t.left,
        e.right,
        t.right,
        e.height,
        M,
        S,
        a,
      ],
    ),
    X = $(() => si(t, e, i), [t, e, i]),
    N = R(
      () => Object.fromEntries(Object.entries(e).filter(([O]) => O !== 'cell')),
      [e],
    ),
    A = `wx-cell ${X} ${e.css || ''} wx-collapsed`,
    C = [
      'wx-cell',
      X,
      e.css || '',
      e.filter ? 'wx-filter' : '',
      t.fixed && t.fixed.right ? 'wx-fixed-right' : '',
    ]
      .filter(Boolean)
      .join(' '),
    P = Y(null);
  return (
    j(() => {
      const O = P.current;
      if (!O) return;
      const G = As(O, { down: g, move: h, up: x });
      return () => {
        typeof G == 'function' && G();
      };
    }, [g, h, x, As]),
    M
      ? /* @__PURE__ */ p('div', {
          className: 'wx-RsQD74qC ' + A,
          style: T,
          role: 'button',
          'aria-label': `Expand column ${e.text || ''}`,
          'aria-expanded': !e.collapsed,
          tabIndex: 0,
          onKeyDown: b,
          onClick: y,
          'data-header-id': t.id,
          children: /* @__PURE__ */ p('div', {
            className: 'wx-RsQD74qC wx-text',
            style: _,
            children: e.text || '',
          }),
        })
      : /* @__PURE__ */ ee('div', {
          className: 'wx-RsQD74qC ' + C,
          style: T,
          onClick: w,
          'data-header-id': t.id,
          tabIndex: !e._hidden && t.sort && !e.filter ? 0 : void 0,
          role: 'columnheader',
          'aria-colindex': e._colindex,
          'aria-colspan': e.colspan > 1 ? e.colspan : void 0,
          'aria-rowspan': e.rowspan > 1 ? e.rowspan : void 0,
          'aria-sort':
            !d?.order || e.filter
              ? 'none'
              : d?.order === 'asc'
                ? 'ascending'
                : 'descending',
          onKeyDown: v,
          children: [
            e.collapsible
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-RsQD74qC wx-collapse',
                  role: 'button',
                  'aria-label': e.collapsed
                    ? 'Expand column'
                    : 'Collapse column',
                  'aria-expanded': !e.collapsed,
                  tabIndex: 0,
                  onKeyDown: b,
                  onClick: y,
                  children: /* @__PURE__ */ p('i', {
                    className: `wx-RsQD74qC wxi-angle-${e.collapsed ? 'down' : 'right'}`,
                  }),
                })
              : null,
            e.cell
              ? (() => {
                  const O = e.cell;
                  return /* @__PURE__ */ p(O, {
                    api: c,
                    cell: N(),
                    column: t,
                    row: r,
                    onAction: ({ action: G, data: D }) => c.exec(G, D),
                  });
                })()
              : e.filter
                ? /* @__PURE__ */ p(Zc, { filter: e.filter, column: t })
                : /* @__PURE__ */ p('div', {
                    className: 'wx-RsQD74qC wx-text',
                    children: e.text || '',
                  }),
            t.resize && s && !e._hidden
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-RsQD74qC wx-grip',
                  role: 'presentation',
                  'aria-label': 'Resize column',
                  ref: P,
                  onClick: (O) => O.stopPropagation(),
                  children: /* @__PURE__ */ p('div', {}),
                })
              : null,
            o
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-RsQD74qC wx-sort',
                  children: d
                    ? /* @__PURE__ */ ee(Ue, {
                        children: [
                          typeof d.index < 'u'
                            ? /* @__PURE__ */ p('div', {
                                className: 'wx-RsQD74qC wx-order',
                                children: d.index + 1,
                              })
                            : null,
                          /* @__PURE__ */ p('i', {
                            className: `wx-RsQD74qC wxi-arrow-${d.order === 'asc' ? 'up' : 'down'}`,
                          }),
                        ],
                      })
                    : null,
                })
              : null,
          ],
        })
  );
}
function eu({ cell: n, column: e, row: t, columnStyle: r }) {
  const s = Ie(ft),
    o = $(
      () =>
        er(
          n?.width,
          n?.flexgrow,
          e?.fixed,
          e?.left,
          n?.right ?? e?.right,
          n?.height,
        ),
      [n?.width, n?.flexgrow, e?.fixed, e?.left, n?.right, e?.right, n?.height],
    ),
    i = $(() => si(e, n, r), [e, n, r]),
    a = R(
      () =>
        Object.fromEntries(
          Object.entries(n || {}).filter(([c]) => c !== 'cell'),
        ),
      [n],
    ),
    l =
      `wx-6Sdi3Dfd wx-cell ${i || ''} ${n?.css || ''}` +
      (e?.fixed && e?.fixed.right ? ' wx-fixed-right' : '');
  return /* @__PURE__ */ p('div', {
    className: l,
    style: o,
    children:
      !e?.collapsed && !n?.collapsed
        ? n?.cell
          ? ai.createElement(n.cell, {
              api: s,
              cell: a(),
              column: e,
              row: t,
              onAction: ({ action: c, data: u }) => s.exec(c, u),
            })
          : /* @__PURE__ */ p('div', {
              className: 'wx-6Sdi3Dfd wx-text',
              children: n?.text || '',
            })
        : null,
  });
}
function Ls({
  deltaLeft: n,
  contentWidth: e,
  columns: t,
  type: r = 'header',
  columnStyle: s,
  bodyHeight: o,
}) {
  const i = Ie(ft),
    a = ce(i, '_sizes'),
    l = ce(i, 'split'),
    c = $(() => a?.[`${r}RowHeights`], [a, r]),
    u = $(() => {
      let h = [];
      if (t && t.length) {
        const x = t[0][r].length;
        for (let w = 0; w < x; w++) {
          let y = 0;
          h.push([]),
            t.forEach((b, v) => {
              const M = { ...b[r][w] };
              if ((y || h[w].push(M), M.colspan > 1)) {
                if (((y = M.colspan - 1), !jo() && b.right)) {
                  let S = b.right;
                  for (let _ = 1; _ < M.colspan; _++) S -= t[v + _].width;
                  M.right = S;
                }
              } else y && y--;
            });
        }
      }
      return h;
    }, [t, r]),
    d = $(() => l?.left || l?.right, [l]);
  function f(h) {
    return t.find((x) => x.id === h);
  }
  function g(h, x) {
    let w = x;
    return h.rowspan && (w += h.rowspan - 1), w === u.length - 1;
  }
  function m(h, x, w) {
    if (!w.sort) return !1;
    for (let y = u.length - 1; y >= 0; y--) {
      const b = w.header[y];
      if (!b.filter && !b._hidden) return x === y;
    }
    return g(h, x);
  }
  return /* @__PURE__ */ p('div', {
    className: `wx-sAsPVaUK wx-${r}`,
    style: { paddingLeft: `${n}px`, width: `${e}px` },
    role: 'rowgroup',
    children: u.map((h, x) =>
      /* @__PURE__ */ p(
        'div',
        {
          className:
            r === 'header' ? 'wx-sAsPVaUK wx-h-row' : 'wx-sAsPVaUK wx-f-row',
          style: { height: `${c?.[x]}px`, display: 'flex' },
          role: 'row',
          children: h.map((w) => {
            const y = f(w.id);
            return r === 'header'
              ? /* @__PURE__ */ p(
                  Jc,
                  {
                    cell: w,
                    columnStyle: s,
                    column: y,
                    row: x,
                    lastRow: g(w, x),
                    bodyHeight: o,
                    sortRow: m(w, x, y),
                    hasSplit: d,
                  },
                  w.id,
                )
              : /* @__PURE__ */ p(
                  eu,
                  {
                    cell: w,
                    columnStyle: s,
                    column: f(w.id),
                    row: x,
                  },
                  w.id,
                );
          }),
        },
        x,
      ),
    ),
  });
}
function tu({ overlay: n }) {
  const e = Ie(ft);
  function t(s) {
    return typeof s == 'function';
  }
  const r = n;
  return /* @__PURE__ */ p('div', {
    className: 'wx-1ty666CQ wx-overlay',
    children: t(n)
      ? /* @__PURE__ */ p(r, {
          onAction: ({ action: s, data: o }) => e.exec(s, o),
        })
      : n,
  });
}
function nu(n) {
  const { actions: e, editor: t } = n,
    [r, s] = J(t?.value || ''),
    o = Y(null);
  j(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function a({ key: l }) {
    l === 'Enter' && e.save();
  }
  return /* @__PURE__ */ p('input', {
    className: 'wx-e7Ao5ejY wx-text',
    onInput: i,
    onKeyDown: a,
    ref: o,
    type: 'text',
    value: r,
  });
}
function ru({ actions: n, editor: e, onAction: t }) {
  const [r, s] = J(e?.value),
    [o, i] = J(e?.renderedValue),
    [a, l] = J(e?.options || []),
    c = $(() => e?.config?.template, [e]),
    u = $(() => e?.config?.cell, [e]),
    d = $(() => (a || []).findIndex((y) => y.id === r), [a, r]),
    f = Y(null),
    g = Y(null),
    m = R(
      (y) => {
        (f.current = y.navigate), (g.current = y.keydown), f.current(d);
      },
      [d, f],
    ),
    h = R(
      (y) => {
        const b = y?.target?.value ?? '';
        i(b);
        const v = b
          ? (e?.options || []).filter((M) =>
              (M.label || '').toLowerCase().includes(b.toLowerCase()),
            )
          : e?.options || [];
        l(v), v.length ? f.current(-1 / 0) : f.current(null);
      },
      [e],
    ),
    x = Y(null);
  j(() => {
    x.current && x.current.focus();
  }, []),
    j(() => {
      s(e?.value), i(e?.renderedValue), l(e?.options || []);
    }, [e]);
  const w = R(
    ({ id: y }) => {
      n.updateValue(y), n.save();
    },
    [n],
  );
  return /* @__PURE__ */ ee(Ue, {
    children: [
      /* @__PURE__ */ p('input', {
        className: 'wx-0UYfSd1x wx-input',
        ref: x,
        value: o ?? '',
        onChange: h,
        onKeyDown: (y) => (g.current ? g.current(y, d) : void 0),
      }),
      /* @__PURE__ */ p(Kn, {
        items: a,
        onReady: m,
        onSelect: w,
        children: ({ option: y }) =>
          c
            ? c(y)
            : u
              ? /* @__PURE__ */ p(u, { data: y, onAction: t })
              : y.label,
      }),
    ],
  });
}
function su({ actions: n, editor: e, onAction: t }) {
  const [r] = J(() => e.value || /* @__PURE__ */ new Date()),
    [s] = J(() => e.config?.template),
    [o] = J(() => e.config?.cell);
  function i({ value: l }) {
    n.updateValue(l), n.save();
  }
  const a = Y(null);
  return (
    j(() => {
      a.current && a.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ ee(Ue, {
      children: [
        /* @__PURE__ */ p('div', {
          className: 'wx-lNWNYUb6 wx-value',
          ref: a,
          tabIndex: 0,
          onClick: () => n.cancel(),
          onKeyDown: (l) => l.preventDefault(),
          children: s
            ? s(r)
            : o
              ? /* @__PURE__ */ p(o, { data: e.value, onAction: t })
              : /* @__PURE__ */ p('span', {
                  className: 'wx-lNWNYUb6 wx-text',
                  children: e.renderedValue,
                }),
        }),
        /* @__PURE__ */ p(an, {
          width: 'auto',
          children: /* @__PURE__ */ p(Js, {
            value: r,
            onChange: i,
            buttons: e.config?.buttons,
          }),
        }),
      ],
    })
  );
}
function ou(n) {
  const { actions: e, editor: t } = n,
    r = n.onAction ?? n.onaction,
    s = t.config || {},
    [o] = J(t.options.find((h) => h.id === t.value)),
    [i] = J(t.value),
    [a] = J(t.options),
    l = $(() => a.findIndex((h) => h.id === i), [a, i]);
  function c({ id: h }) {
    e.updateValue(h), e.save();
  }
  let u;
  const [d, f] = J();
  function g(h) {
    (u = h.navigate), f(() => h.keydown), u(l);
  }
  const m = Y(null);
  return (
    j(() => {
      m.current && m.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ ee(Ue, {
      children: [
        /* @__PURE__ */ p('div', {
          ref: m,
          className: 'wx-ywGRk611 wx-value',
          tabIndex: 0,
          onClick: () => e.cancel(),
          onKeyDown: (h) => {
            d(h, l), h.preventDefault();
          },
          children: s.template
            ? s.template(o)
            : s.cell
              ? (() => {
                  const h = s.cell;
                  return /* @__PURE__ */ p(h, { data: o, onAction: r });
                })()
              : /* @__PURE__ */ p('span', {
                  className: 'wx-ywGRk611 wx-text',
                  children: t.renderedValue,
                }),
        }),
        /* @__PURE__ */ p(Kn, {
          items: a,
          onReady: g,
          onSelect: c,
          children: ({ option: h }) =>
            s.template
              ? s.template(h)
              : s.cell
                ? (() => {
                    const x = s.cell;
                    return /* @__PURE__ */ p(x, { data: h, onAction: r });
                  })()
                : h.label,
        }),
      ],
    })
  );
}
const iu = {
  text: nu,
  combo: ru,
  datepicker: su,
  richselect: ou,
};
function au({ column: n, row: e }) {
  const t = Ie(ft),
    r = ce(t, 'editor'),
    s = R(
      (m, h) => {
        t.exec('close-editor', { ignore: m }),
          h &&
            t.exec('focus-cell', {
              ...h,
              eventSource: 'click',
            });
      },
      [t],
    ),
    o = R(
      (m) => {
        const h = m ? null : { row: r?.id, column: r?.column };
        s(!1, h);
      },
      [r, s],
    ),
    i = R(() => {
      s(!0, { row: r?.id, column: r?.column });
    }, [r, s]),
    a = R(
      (m) => {
        t.exec('editor', { value: m });
      },
      [t],
    ),
    l = R(
      (m) => {
        m.key === 'Enter' && r && i();
      },
      [r, i],
    ),
    c = $(
      () => er(n.width, n.flexgrow, n.fixed, n.left, n.right),
      [n.width, n.flexgrow, n.fixed, n.left, n.right],
    ),
    u = $(() => {
      let m = n.editor;
      typeof m == 'function' && (m = m(e, n));
      let h = typeof m == 'string' ? m : m.type;
      return iu[h];
    }, [n, e]),
    d = Y(null);
  j(() => {
    if (!d.current) return;
    const m = xn(d.current, () => o(!0));
    return () => {
      typeof m == 'function' && m();
    };
  }, [o]),
    j(() => {
      d.current && typeof c == 'string' && d.current.setAttribute('style', c);
    }, [c]);
  const f = typeof e.$parent < 'u' ? 'gridcell' : 'cell',
    g = typeof e.$parent < 'u' ? !n.editor : void 0;
  return /* @__PURE__ */ p('div', {
    className: 'wx-8l724t2g wx-cell wx-editor',
    ref: d,
    style: typeof c == 'object' && c !== null ? c : void 0,
    role: f,
    'aria-readonly': g,
    tabIndex: -1,
    onClick: (m) => m.stopPropagation(),
    onDoubleClick: (m) => m.stopPropagation(),
    onKeyDown: l,
    children: u
      ? /* @__PURE__ */ p(u, {
          editor: r,
          actions: { save: o, cancel: i, updateValue: a },
          onAction: ({ action: m, data: h }) => t.exec(m, h),
        })
      : null,
  });
}
function Ps(n) {
  const { columns: e, type: t, columnStyle: r } = n,
    s = Ie(ft),
    { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? ' ' + r(c) : '';
  }
  return /* @__PURE__ */ p(Ue, {
    children: e.map((c, u) =>
      /* @__PURE__ */ p(
        'tr',
        {
          children: c.map((d) => {
            const f = i.find((h) => h.id == d.id),
              g = `wx-print-cell-${t}${l(f)}${d.filter ? ' wx-print-cell-filter' : ''}${d.vertical ? ' wx-vertical' : ''}`,
              m = d.cell;
            return /* @__PURE__ */ p(
              'th',
              {
                style: qs(Go(d, a.columnWidth)),
                className: 'wx-Gy81xq2u ' + g,
                rowSpan: d.rowspan,
                colSpan: d.colspan,
                children: m
                  ? /* @__PURE__ */ p(m, {
                      api: s,
                      cell: Object.fromEntries(
                        Object.entries(d).filter(([h]) => h !== 'cell'),
                      ),
                      column: f,
                      row: u,
                    })
                  : d.filter
                    ? /* @__PURE__ */ p('div', {
                        className: 'wx-Gy81xq2u wx-print-filter',
                        children: Zl(o, i, d),
                      })
                    : /* @__PURE__ */ p('div', {
                        className: 'wx-Gy81xq2u wx-text',
                        children: d.text ?? '',
                      }),
              },
              d.id,
            );
          }),
        },
        u,
      ),
    ),
  });
}
function lu(n) {
  const {
      columns: e,
      rowStyle: t,
      columnStyle: r,
      cellStyle: s,
      header: o,
      footer: i,
      reorder: a,
    } = n,
    l = Ie(ft),
    { flatData: c, _sizes: u } = l.getState(),
    d = o && Ms(e, 'header', u.headerRowHeights),
    f = i && Ms(e, 'footer', u.footerRowHeights);
  function g(h, x) {
    let w = '';
    return (w += r ? ' ' + r(x) : ''), (w += s ? ' ' + s(h, x) : ''), w;
  }
  function m(h, x) {
    return typeof x.draggable == 'function'
      ? x.draggable(h, x) !== !1
      : x.draggable;
  }
  return /* @__PURE__ */ ee('table', {
    className: `wx-8NTMLH0z wx-print-grid ${e.some((h) => h.flexgrow) ? 'wx-flex-columns' : ''}`,
    children: [
      o
        ? /* @__PURE__ */ p('thead', {
            children: /* @__PURE__ */ p(Ps, {
              columns: d,
              type: 'header',
              columnStyle: r,
            }),
          })
        : null,
      /* @__PURE__ */ p('tbody', {
        children: c.map((h, x) =>
          /* @__PURE__ */ p(
            'tr',
            {
              className: 'wx-8NTMLH0z wx-row' + (t ? ' ' + t(h) : ''),
              style: { height: `${h.rowHeight || u.rowHeight}px` },
              children: e.map((w) =>
                w.collapsed
                  ? null
                  : /* @__PURE__ */ ee(
                      'td',
                      {
                        className: `wx-8NTMLH0z wx-print-cell wx-cell ${g(h, w)}`,
                        style: qs(Go(w, u.columnWidth)),
                        children: [
                          a && w.draggable
                            ? /* @__PURE__ */ p('span', {
                                className: 'wx-8NTMLH0z wx-print-draggable',
                                children: m(h, w)
                                  ? /* @__PURE__ */ p('i', {
                                      className: 'wx-8NTMLH0z wxi-drag',
                                    })
                                  : null,
                              })
                            : null,
                          w.treetoggle
                            ? /* @__PURE__ */ ee(Ue, {
                                children: [
                                  /* @__PURE__ */ p('span', {
                                    style: { marginLeft: h.$level * 28 + 'px' },
                                  }),
                                  h.$count
                                    ? /* @__PURE__ */ p('i', {
                                        className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${h.open !== !1 ? 'down' : 'right'}`,
                                      })
                                    : null,
                                ],
                              })
                            : null,
                          w.cell
                            ? (() => {
                                const y = w.cell;
                                return /* @__PURE__ */ p(y, {
                                  api: l,
                                  row: h,
                                  column: w,
                                });
                              })()
                            : /* @__PURE__ */ p('span', { children: It(h, w) }),
                        ],
                      },
                      w.id,
                    ),
              ),
            },
            x,
          ),
        ),
      }),
      i
        ? /* @__PURE__ */ p('tfoot', {
            children: /* @__PURE__ */ p(Ps, {
              columns: f,
              type: 'footer',
              columnStyle: r,
            }),
          })
        : null,
    ],
  });
}
function cu(n) {
  const { config: e, ...t } = n,
    r = Ie(ft),
    { _skin: s, _columns: o } = r.getState(),
    i = $(() => Kl(o, e), []),
    a = Y(null);
  return (
    j(() => {
      const l = document.body;
      l.classList.add('wx-print');
      const c = a.current;
      if (!c) return;
      const u = c.cloneNode(!0);
      l.appendChild(u);
      const d = `@media print { @page { size: ${e.paper} ${e.mode}; }`,
        f = document.createElement('style');
      f.setAttribute('type', 'text/css'),
        f.setAttribute('media', 'print'),
        document.getElementsByTagName('head')[0].appendChild(f),
        f.appendChild(document.createTextNode(d)),
        window.print(),
        f.remove(),
        l.classList.remove('wx-print'),
        u.remove();
    }, []),
    /* @__PURE__ */ p('div', {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: a,
      children: i.map((l, c) =>
        /* @__PURE__ */ p(
          'div',
          {
            className: 'wx-4zwCKA7C wx-print-grid-wrapper',
            children: /* @__PURE__ */ p(lu, { columns: l, ...t }),
          },
          c,
        ),
      ),
    })
  );
}
function uu(n) {
  const {
      header: e,
      footer: t,
      overlay: r,
      multiselect: s,
      onreorder: o,
      rowStyle: i,
      columnStyle: a,
      cellStyle: l,
      autoRowHeight: c,
      resize: u,
      clientWidth: d,
      clientHeight: f,
      responsiveLevel: g,
      hotkeys: m,
    } = n,
    h = Ie(ft),
    x = ce(h, 'dynamic'),
    w = ce(h, '_columns'),
    y = ce(h, 'flatData'),
    b = ce(h, 'split'),
    v = ce(h, '_sizes'),
    [M, S] = tn(h, 'selectedRows'),
    _ = ce(h, 'select'),
    T = ce(h, 'editor'),
    X = ce(h, 'tree'),
    N = ce(h, 'focusCell'),
    A = ce(h, '_print'),
    C = ce(h, 'undo'),
    P = ce(h, 'reorder'),
    O = ce(h, '_rowHeightFromData'),
    [G, D] = J(0);
  j(() => {
    D(Kt());
  }, []);
  const [B, H] = J(0),
    [z, Z] = J(0),
    E = $(() => (w || []).some((L) => !L.hidden && L.flexgrow), [w]),
    K = $(() => v?.rowHeight || 0, [v]),
    he = Y(null),
    [fe, Se] = J(null),
    [ke, De] = J(null),
    de = $(() => {
      let L = [],
        ie = 0;
      return (
        b &&
          b.left &&
          ((L = (w || [])
            .slice(0, b.left)
            .filter((we) => !we.hidden)
            .map((we) => ({ ...we }))),
          L.forEach((we) => {
            (we.fixed = { left: 1 }), (we.left = ie), (ie += we.width);
          }),
          L.length && (L[L.length - 1].fixed = { left: -1 })),
        { columns: L, width: ie }
      );
    }, [b, w]),
    be = $(() => {
      let L = [],
        ie = 0;
      if (b && b.right) {
        L = (w || [])
          .slice(b.right * -1)
          .filter((we) => !we.hidden)
          .map((we) => ({ ...we }));
        for (let we = L.length - 1; we >= 0; we--) {
          const Ye = L[we];
          (Ye.fixed = { right: 1 }), (Ye.right = ie), (ie += Ye.width);
        }
        L.length && (L[0].fixed = { right: -1 });
      }
      return { columns: L, width: ie };
    }, [b, w]),
    _e = $(() => {
      const L = (w || [])
        .slice(b?.left || 0, (w || []).length - (b?.right ?? 0))
        .filter((ie) => !ie.hidden);
      return (
        L.forEach((ie) => {
          ie.fixed = 0;
        }),
        L
      );
    }, [w, b]),
    He = $(
      () => (w || []).reduce((L, ie) => (ie.hidden || (L += ie.width), L), 0),
      [w],
    ),
    Fe = 1;
  function te(L, ie, we) {
    let Ye = ie,
      qe = L;
    if (_e.length) {
      let Be = _e.length;
      for (let Me = L; Me >= 0; Me--)
        _e[Me][we].forEach((Qe) => {
          Qe.colspan > 1 && Me > L - Qe.colspan && Me < Be && (Be = Me);
        });
      if (Be !== _e.length && Be < L) {
        for (let Me = Be; Me < L; Me++) Ye -= _e[Me].width;
        qe = Be;
      }
    }
    return { index: qe, delta: Ye };
  }
  const le = $(() => {
      let L, ie, we;
      const Ye = B,
        qe = B + (d || 0);
      let Be = 0,
        Me = 0,
        Qe = 0,
        ct = 0;
      _e.forEach((V, W) => {
        Ye > Qe && ((Be = W), (ct = Qe)),
          (Qe = Qe + V.width),
          qe > Qe && (Me = W + Fe);
      });
      const ut = { header: 0, footer: 0 };
      for (let V = Me; V >= Be; V--)
        ['header', 'footer'].forEach((W) => {
          _e[V] &&
            _e[V][W].forEach((q) => {
              const re = q.colspan;
              if (re && re > 1) {
                const ge = re - (Me - V + 1);
                ge > 0 && (ut[W] = Math.max(ut[W], ge));
              }
            });
        });
      const Ze = te(Be, ct, 'header'),
        dt = te(Be, ct, 'footer'),
        Ct = Ze.delta,
        Pt = Ze.index,
        k = dt.delta,
        F = dt.index;
      return (
        E && He > (d || 0)
          ? (L = ie = we = [...de.columns, ..._e, ...be.columns])
          : ((L = [...de.columns, ..._e.slice(Be, Me + 1), ...be.columns]),
            (ie = [
              ...de.columns,
              ..._e.slice(Pt, Me + ut.header + 1),
              ...be.columns,
            ]),
            (we = [
              ...de.columns,
              ..._e.slice(F, Me + ut.footer + 1),
              ...be.columns,
            ])),
        {
          data: L || [],
          header: ie || [],
          footer: we || [],
          d: ct,
          df: k,
          dh: Ct,
        }
      );
    }, [_e, de, be, B, d, E, He]),
    se = $(() => (e && v?.headerHeight) || 0, [e, v]),
    $e = $(() => (t && v?.footerHeight) || 0, [t, v]),
    Ce = $(() => (d && f ? He >= d : !1), [d, f, He]),
    me = $(() => (f || 0) - se - $e - (Ce ? G : 0), [f, se, $e, Ce, G]),
    Q = $(() => Math.ceil((me || 0) / (K || 1)) + 1, [me, K]),
    Ae = Y([]),
    [Ne, xe] = J(0),
    [ze, Xe] = J(void 0),
    ne = $(() => {
      let L = 0,
        ie = 0;
      const we = 2;
      if (c) {
        let Be = z;
        for (; Be > 0; ) (Be -= Ae.current[L] || K), L++;
        ie = z - Be;
        for (let Me = Math.max(0, L - we - 1); Me < L; Me++)
          ie -= Ae.current[L - Me] || K;
        L = Math.max(0, L - we);
      } else {
        if (O) {
          let Be = 0,
            Me = 0;
          for (let Ze = 0; Ze < (y || []).length; Ze++) {
            const dt = y[Ze].rowHeight || K;
            if (Me + dt > z) {
              Be = Ze;
              break;
            }
            Me += dt;
          }
          L = Math.max(0, Be - we);
          for (let Ze = 0; Ze < L; Ze++) ie += y[Ze].rowHeight || K;
          let Qe = 0,
            ct = 0;
          for (let Ze = Be + 1; Ze < (y || []).length; Ze++) {
            const dt = y[Ze].rowHeight || K;
            if ((Qe++, ct + dt > me)) break;
            ct += dt;
          }
          const ut = Math.min(x ? x.rowCount : (y || []).length, Be + Qe + we);
          return { d: ie, start: L, end: ut };
        }
        (L = Math.floor(z / (K || 1))),
          (L = Math.max(0, L - we)),
          (ie = L * (K || 0));
      }
      const Ye = x ? x.rowCount : (y || []).length,
        qe = Math.min(Ye, L + (Q || 0) + we);
      return { d: ie, start: L, end: qe };
    }, [c, O, z, K, x, y, Q, me]),
    ye = $(() => {
      const L = x ? x.rowCount : (y || []).length;
      if (c) return Ne + ne.d + (L - (ze || 0)) * (K || 0);
      if (!O) return L * (K || 0);
      let ie = 0;
      for (let we = 0; we < L; we++) ie += y[we]?.rowHeight || K;
      return ie;
    }, [x, y, K, c, O, Ne, ne.d, ze]),
    Te = $(
      () => (d && f ? ye + se + $e >= f - (He >= (d || 0) ? G : 0) : !1),
      [d, f, ye, se, $e, He, G],
    ),
    We = $(
      () => (E && He <= (d || 0) ? (d || 0) - 0 - (Te ? G : 0) : He),
      [E, He, d, Te, G, Ce],
    ),
    Pe = $(
      () =>
        E && He <= (d || 0) ? d || 0 : We < (d || 0) ? He + (Te ? G : 0) : -1,
      [E, He, d, We, Te, G],
    ),
    I = Y({});
  j(() => {
    if (x && (I.current.start !== ne.start || I.current.end !== ne.end)) {
      const { start: L, end: ie } = ne;
      (I.current = { start: L, end: ie }),
        h && h.exec && h.exec('request-data', { row: { start: L, end: ie } });
    }
  }, [x, ne, h]);
  const U = $(
      () => (x ? y || [] : (y || []).slice(ne.start, ne.end)),
      [x, y, ne],
    ),
    oe = $(
      () => (M || []).filter((L) => (U || []).some((ie) => ie.id === L)),
      [S, U],
    ),
    ue = $(() => ne.start, [ne.start]),
    pe = R((L) => {
      Z(L.target.scrollTop), H(L.target.scrollLeft);
    }, []),
    ve = R((L) => {
      L.shiftKey && L.preventDefault(),
        he.current && he.current.focus && he.current.focus();
    }, []),
    Oe = R(() => !!(w || []).find((L) => !!L.draggable), [w]),
    Ge = Y(null),
    et = Y(null),
    yt = Y({
      dblclick: (L, ie) => {
        const we = { id: L, column: vr(ie, 'data-col-id') };
        h.exec('open-editor', we);
      },
      click: (L, ie) => {
        if (Ge.current) return;
        const we = vr(ie, 'data-col-id');
        if (
          (N?.id !== L &&
            h.exec('focus-cell', {
              row: L,
              column: we,
              eventSource: 'click',
            }),
          _ === !1)
        )
          return;
        const Ye = s && ie.ctrlKey,
          qe = s && ie.shiftKey;
        (Ye || M.length > 1 || !M.includes(L)) &&
          h.exec('select-row', { id: L, toggle: Ye, range: qe });
      },
      'toggle-row': (L) => {
        const ie = h.getRow(L);
        h.exec(ie.open !== !1 ? 'close-row' : 'open-row', { id: L });
      },
      'ignore-click': () => !1,
    }),
    $t = $(
      () => ({
        top: se,
        bottom: $e,
        left: de.width,
        xScroll: Ce,
        yScroll: Te,
        sense: c && ke ? ke.offsetHeight : Math.max(v?.rowHeight || 0, 40),
        node: he.current && he.current.firstElementChild,
      }),
      [se, $e, de.width, Ce, Te, c, ke, v],
    );
  function Ht(L, ie) {
    const { container: we, sourceNode: Ye, from: qe } = ie;
    if (Oe() && !Ye.getAttribute('draggable-data')) return !1;
    Se(qe), h.getRow(qe).open && h.exec('close-row', { id: qe, nested: !0 });
    const Be = st(Ye, 'data-id'),
      Me = Be.cloneNode(!0);
    Me.classList.remove('wx-selected'),
      Me.querySelectorAll('[tabindex]').forEach((Ze) =>
        Ze.setAttribute('tabindex', '-1'),
      ),
      we.appendChild(Me),
      De(Me);
    const Qe = B - le.d,
      ct = Te ? G : 0;
    we.style.width =
      Math.min((d || 0) - ct, E && He <= (d || 0) ? We : We - ct) + Qe + 'px';
    const ut = On(Be);
    (ie.offset = {
      x: Qe,
      y: -Math.round(ut.height / 2),
    }),
      et.current || (et.current = L.clientY);
  }
  function $n(L, ie) {
    const { from: we } = ie,
      Ye = ie.pos,
      qe = On(he.current);
    Ye.x = qe.x;
    const Be = $t.top;
    if (Ye.y < Be) Ye.y = Be;
    else {
      const Me =
        qe.height - (Ce && G > 0 ? G : Math.round($t.sense / 2)) - $t.bottom;
      Ye.y > Me && (Ye.y = Me);
    }
    if (he.current.contains(ie.targetNode)) {
      const Me = st(ie.targetNode, 'data-id'),
        Qe = sn(Me?.getAttribute('data-id'));
      if (Qe && Qe !== we) {
        ie.to = Qe;
        const ct = c ? ke?.offsetHeight : v?.rowHeight;
        if (ke && (z === 0 || Ye.y > Be + ct - 1)) {
          const ut = Me.getBoundingClientRect(),
            Ze = On(ke).y,
            dt = ut.y,
            Ct = Ze > dt ? -1 : 1,
            Pt = Ct === 1 ? 'after' : 'before',
            k = Math.abs(h.getRowIndex(we) - h.getRowIndex(Qe)),
            F = k !== 1 ? (Pt === 'before' ? 'after' : 'before') : Pt;
          if (
            k === 1 &&
            ((Ct === -1 && L.clientY > et.current) ||
              (Ct === 1 && L.clientY < et.current))
          )
            return;
          (et.current = L.clientY),
            h.exec('move-item', {
              id: we,
              target: Qe,
              mode: F,
              inProgress: !0,
            });
        }
      }
      o && o({ event: L, context: ie });
    }
    Bc(L, qe, ie, $t);
  }
  function tr(L, ie) {
    const { from: we, to: Ye } = ie;
    h.exec('move-item', {
      id: we,
      target: Ye,
      inProgress: !1,
    }),
      (Ge.current = setTimeout(() => {
        Ge.current = 0;
      }, 1)),
      Se(null),
      De(null),
      (et.current = null),
      ni(ie);
  }
  function Kt() {
    const L = document.createElement('div');
    (L.style.cssText =
      'position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;'),
      document.body.appendChild(L);
    const ie = L.offsetWidth - L.clientWidth;
    return document.body.removeChild(L), ie;
  }
  const Xt = $(() => (Pe > 0 ? { width: `${Pe}px` } : void 0), [Pe]),
    Cn = Y(null);
  function nr() {
    Promise.resolve().then(() => {
      let L = 0,
        ie = ue;
      const we = Cn.current;
      we &&
        (Array.from(we.children).forEach((Ye, qe) => {
          (Ae.current[ue + qe] = Ye.offsetHeight), (L += Ye.offsetHeight), ie++;
        }),
        xe(L),
        Xe(ie));
    });
  }
  j(() => {
    U && c && nr();
  }, [U, c, ue]);
  let [Rt, vt] = J();
  j(() => {
    if (N && (!_ || !oe.length || oe.includes(N.row))) vt({ ...N });
    else if (U.length && le.data.length) {
      if (
        !Rt ||
        (oe.length && !oe.includes(Rt.row)) ||
        U.findIndex((L) => L.id == Rt.row) === -1 ||
        le.data.findIndex((L) => L.id == Rt.column && !L.collapsed) === -1
      ) {
        const L = oe[0] || U[0].id,
          ie = le.data.findIndex((we) => !we.collapsed);
        vt(ie !== -1 ? { row: L, column: le.data[ie].id } : null);
      }
    } else vt(null);
  }, [N]);
  const At = Y(null);
  j(() => {
    const L = he.current;
    if (!L) return;
    const ie = Pc(L, u);
    return () => {
      typeof ie == 'function' && ie();
    };
  }, [u]);
  const qt = Y({});
  Object.assign(qt.current, {
    start: Ht,
    move: $n,
    end: tr,
    getReorder: () => P,
    getDraggableInfo: () => ({ hasDraggable: Oe() }),
  }),
    j(() => {
      const L = he.current;
      return L ? Wc(L, qt).destroy : void 0;
    }, [P, he.current]),
    j(() => {
      const L = he.current;
      return L
        ? Xr(L, {
            keys: m !== !1 && {
              ...xc,
              'ctrl+z': C,
              'ctrl+y': C,
              ...m,
            },
            exec: (ie) => h.exec('hotkey', ie),
          }).destroy
        : void 0;
    }, [h, C, m]);
  const mt = Y({
    scroll: h.getReactiveState().scroll,
  });
  (mt.current.getWidth = () => (d || 0) - (Te ? G : 0)),
    (mt.current.getHeight = () => me),
    (mt.current.getScrollMargin = () => de.width + be.width),
    j(() => {
      yc(At.current, mt.current);
    }, []);
  const Lt = Y(null);
  j(() => {
    const L = Lt.current;
    if (!L) return;
    const ie = [];
    return (
      ie.push(
        xn(L, () => h.exec('focus-cell', { eventSource: 'click' })).destroy,
      ),
      ie.push(_i(L, yt.current)),
      () => ie.forEach((we) => we())
    );
  }, []);
  const rr = `wx-grid ${g ? `wx-responsive-${g}` : ''}`;
  return /* @__PURE__ */ ee(Ue, {
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-4VuBwK2D ' + rr,
        style: {
          '--header-height': `${se}px`,
          '--footer-height': `${$e}px`,
          '--split-left-width': `${de.width}px`,
          '--split-right-width': `${be.width}px`,
        },
        children: /* @__PURE__ */ p('div', {
          ref: he,
          className: 'wx-4VuBwK2D wx-table-box',
          style: Xt,
          role: X ? 'treegrid' : 'grid',
          'aria-colcount': le.data.length,
          'aria-rowcount': U.length,
          'aria-multiselectable': X && s ? !0 : void 0,
          tabIndex: -1,
          children: /* @__PURE__ */ ee('div', {
            ref: At,
            className: 'wx-4VuBwK2D wx-scroll',
            style: {
              overflowX: Ce ? 'scroll' : 'hidden',
              overflowY: Te ? 'scroll' : 'hidden',
            },
            onScroll: pe,
            children: [
              e
                ? /* @__PURE__ */ p('div', {
                    className: 'wx-4VuBwK2D wx-header-wrapper',
                    children: /* @__PURE__ */ p(Ls, {
                      contentWidth: We,
                      deltaLeft: le.dh,
                      columns: le.header,
                      columnStyle: a,
                      bodyHeight: me - +t,
                    }),
                  })
                : null,
              /* @__PURE__ */ ee('div', {
                ref: Lt,
                className: 'wx-4VuBwK2D wx-body',
                style: { width: `${We}px`, height: `${ye}px` },
                onMouseDown: (L) => ve(L),
                children: [
                  r ? /* @__PURE__ */ p(tu, { overlay: r }) : null,
                  /* @__PURE__ */ p('div', {
                    ref: Cn,
                    className: 'wx-4VuBwK2D wx-data',
                    style: {
                      paddingTop: `${ne.d}px`,
                      paddingLeft: `${le.d}px`,
                    },
                    children: U.map((L, ie) => {
                      const we = M.indexOf(L.id) !== -1,
                        Ye = fe === L.id,
                        qe =
                          'wx-row' +
                          (c ? ' wx-autoheight' : '') +
                          (i ? ' ' + i(L) : '') +
                          (we ? ' wx-selected' : '') +
                          (Ye ? ' wx-inactive' : ''),
                        Be = c
                          ? { minHeight: `${L.rowHeight || K}px` }
                          : { height: `${L.rowHeight || K}px` };
                      return /* @__PURE__ */ p(
                        'div',
                        {
                          className: 'wx-4VuBwK2D ' + qe,
                          'data-id': L.id,
                          'data-context-id': L.id,
                          style: Be,
                          role: 'row',
                          'aria-rowindex': ie,
                          'aria-expanded': L.open,
                          'aria-level': X ? L.$level + 1 : void 0,
                          'aria-selected': X ? we : void 0,
                          tabIndex: -1,
                          children: le.data.map((Me) =>
                            Me.collapsed
                              ? /* @__PURE__ */ p(
                                  'div',
                                  {
                                    className:
                                      'wx-4VuBwK2D wx-cell wx-collapsed',
                                  },
                                  Me.id,
                                )
                              : T?.id === L.id && T.column == Me.id
                                ? /* @__PURE__ */ p(
                                    au,
                                    { row: L, column: Me },
                                    Me.id,
                                  )
                                : /* @__PURE__ */ p(
                                    Kc,
                                    {
                                      row: L,
                                      column: Me,
                                      columnStyle: a,
                                      cellStyle: l,
                                      reorder: P,
                                      focusable:
                                        Rt?.row === L.id && Rt?.column == Me.id,
                                    },
                                    Me.id,
                                  ),
                          ),
                        },
                        L.id,
                      );
                    }),
                  }),
                ],
              }),
              t && (y || []).length
                ? /* @__PURE__ */ p(Ls, {
                    type: 'footer',
                    contentWidth: We,
                    deltaLeft: le.df,
                    columns: le.footer,
                    columnStyle: a,
                  })
                : null,
            ],
          }),
        }),
      }),
      A
        ? /* @__PURE__ */ p(cu, {
            config: A,
            rowStyle: i,
            columnStyle: a,
            cellStyle: l,
            header: e,
            footer: t,
            reorder: P,
          })
        : null,
    ],
  });
}
const du = (n) =>
    n
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  fu = Ut(function (
    {
      data: n = [],
      columns: e = [],
      rowStyle: t = null,
      columnStyle: r = null,
      cellStyle: s = null,
      selectedRows: o,
      select: i = !0,
      multiselect: a = !1,
      header: l = !0,
      footer: c = !1,
      dynamic: u = null,
      overlay: d = null,
      reorder: f = !1,
      onReorder: g = null,
      autoRowHeight: m = !1,
      sizes: h,
      split: x,
      tree: w = !1,
      autoConfig: y = !1,
      init: b = null,
      responsive: v = null,
      sortMarks: M,
      undo: S = !1,
      hotkeys: _ = null,
      ...T
    },
    X,
  ) {
    const N = Y();
    N.current = T;
    const A = $(() => new fc(Qs), []),
      C = $(() => A.in, [A]),
      P = Y(null);
    P.current === null &&
      ((P.current = new so((de, be) => {
        const _e = 'on' + du(de);
        N.current && N.current[_e] && N.current[_e](be);
      })),
      C.setNext(P.current));
    const O = $(
        () => ({
          getState: A.getState.bind(A),
          getReactiveState: A.getReactive.bind(A),
          getStores: () => ({ data: A }),
          exec: C.exec,
          setNext: (de) => ((P.current = P.current.setNext(de)), P.current),
          intercept: C.intercept.bind(C),
          on: C.on.bind(C),
          detach: C.detach.bind(C),
          getRow: A.getRow.bind(A),
          getRowIndex: A.getRowIndex.bind(A),
          getColumn: A.getColumn.bind(A),
        }),
        [A, C],
      ),
      [G, D] = J(0),
      [B, H] = J(0),
      [z, Z] = J(null),
      [E, K] = J(null),
      he = $(() => {
        if (y && !e.length && n.length) {
          const de = n[0],
            be = [];
          for (let _e in de)
            if (_e !== 'id' && _e[0] !== '$') {
              let He = {
                id: _e,
                header: _e[0].toUpperCase() + _e.slice(1),
              };
              typeof y == 'object' && (He = { ...He, ...y }), be.push(He);
            }
          return be;
        }
        return (E && E.columns) ?? e;
      }, [y, e, n, E]),
      fe = $(() => (E && E.sizes) ?? h, [E, h]),
      Se = R(
        (de) => {
          if ((D(de.width), H(de.height), v)) {
            const be =
              Object.keys(v)
                .map(Number)
                .sort((_e, He) => _e - He)
                .find((_e) => de.width <= _e) ?? null;
            be !== z && (K(v[be]), Z(be));
          }
        },
        [v, z],
      ),
      ke = Ie(ot.theme),
      De = Y(0);
    return (
      j(() => {
        if (!De.current) b && b(O);
        else {
          const de = A.getState();
          A.init({
            data: n,
            columns: he,
            split: x || de.split,
            sizes: fe || de.sizes,
            selectedRows: o || de.selectedRows,
            dynamic: u,
            tree: w,
            sortMarks: M || de.sortMarks,
            undo: S,
            reorder: f,
            _skin: ke,
            _select: i,
          });
        }
        De.current++;
      }, [A, n, he, x, fe, o, u, w, M, S, f, ke, i, b, O]),
      De.current === 0 &&
        A.init({
          data: n,
          columns: he,
          split: x || { left: 0 },
          sizes: fe || {},
          selectedRows: o || [],
          dynamic: u,
          tree: w,
          sortMarks: M || {},
          undo: S,
          reorder: f,
          _skin: ke,
          select: i,
        }),
      Gt(
        X,
        () => ({
          ...O,
        }),
        [O],
      ),
      /* @__PURE__ */ p(ft.Provider, {
        value: O,
        children: /* @__PURE__ */ p(Xn, {
          words: bc,
          optional: !0,
          children: /* @__PURE__ */ p(uu, {
            header: l,
            footer: c,
            overlay: d,
            rowStyle: t,
            columnStyle: r,
            cellStyle: s,
            onReorder: g,
            multiselect: a,
            autoRowHeight: m,
            clientWidth: G,
            clientHeight: B,
            responsiveLevel: z,
            resize: Se,
            hotkeys: _,
          }),
        }),
      })
    );
  });
function hu({ item: n }) {
  return /* @__PURE__ */ ee('div', {
    tabIndex: -1,
    role: 'menuitem',
    'aria-label': n.hidden ? `Show ${n.text} column` : `Hide ${n.text} column`,
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-v13lZxja wx-icon' + (n.hidden ? ' wx-hidden' : ''),
        children: /* @__PURE__ */ p('i', { className: 'wx-v13lZxja wxi-eye' }),
      }),
      /* @__PURE__ */ p('span', { children: n.text }),
    ],
  });
}
function gu({ columns: n = null, api: e, children: t }) {
  j(() => {
    _c('table-header', hu);
  }, []);
  function r(l) {
    for (let c = l.header.length - 1; c >= 0; c--) {
      const u = l.header[c].text;
      if (u) return u;
    }
    return l.id;
  }
  function s(l) {
    const c = l.action;
    c && e.exec('hide-column', { id: c.id, mode: !c.hidden });
  }
  function o(l) {
    return l;
  }
  const i = bt(e, '_columns'),
    a = $(() => {
      if (e) {
        const l = Array.isArray(i) ? i : [];
        return (n ? l.filter((c) => n[c.id]) : l).map((c) => {
          const u = r(c);
          return {
            id: c.id,
            text: u,
            type: 'table-header',
            hidden: c.hidden,
          };
        });
      } else return [];
    }, [e, n, i]);
  return /* @__PURE__ */ p(Zo, {
    dataKey: 'headerId',
    options: a,
    onClick: s,
    at: 'point',
    resolver: o,
    children: typeof t == 'function' ? t() : t,
  });
}
Lr(lt);
function pu({ row: n, column: e }) {
  const t = Ie(Et);
  function r(o, i) {
    return {
      justifyContent: i.align,
      paddingLeft: `${(o.$level - 1) * 20}px`,
    };
  }
  const s = e && e._cell;
  return /* @__PURE__ */ ee('div', {
    className: 'wx-pqc08MHU wx-content',
    style: r(n, e),
    children: [
      n.data || n.lazy
        ? /* @__PURE__ */ p('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${n.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ p('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ p('div', {
        className: 'wx-pqc08MHU wx-text',
        children: s
          ? /* @__PURE__ */ p(s, { row: n, column: e, api: t })
          : n.text,
      }),
    ],
  });
}
function Os({ column: n, cell: e }) {
  const t = $(() => n.id, [n?.id]);
  return e || n.id == 'add-task'
    ? /* @__PURE__ */ p('div', {
        style: { textAlign: n.align },
        children: /* @__PURE__ */ p('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': t,
        }),
      })
    : null;
}
function mu(n) {
  const {
      readonly: e,
      compactMode: t,
      width: r = 0,
      display: s = 'all',
      columnWidth: o = 0,
      fullHeight: i,
      onTableAPIChange: a,
      multiTaskRows: l = !1,
      rowMapping: c = null,
      rowHeightOverrides: u = null,
    } = n,
    [d, f] = Ke(o),
    [g, m] = J(),
    h = Ie(ot.i18n),
    x = $(() => h.getGroup('gantt'), [h]),
    w = Ie(Et),
    y = ce(w, 'scrollTop'),
    b = ce(w, 'cellHeight'),
    v = ce(w, '_scrollTask'),
    M = ce(w, '_selected'),
    S = ce(w, 'area'),
    _ = ce(w, '_tasks'),
    T = ce(w, '_scales'),
    X = ce(w, 'columns'),
    N = ce(w, '_sort'),
    A = ce(w, 'calendar'),
    C = ce(w, 'durationUnit'),
    P = ce(w, 'splitTasks'),
    [O, G] = J(null),
    D = $(() => {
      if (!_ || !S) return [];
      if (l && c) {
        const I = /* @__PURE__ */ new Set();
        return _.filter((U) => {
          const oe = c.taskRows.get(U.id) ?? U.id;
          return I.has(oe) ? !1 : (I.add(oe), !0);
        });
      }
      return _.slice(S.start, S.end);
    }, [_, S, l, c, i]),
    B = R(
      (I, U) => {
        if (U === 'add-task')
          w.exec(U, {
            target: I,
            task: { text: x('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (U === 'open-task') {
          const oe = D.find((ue) => ue.id === I);
          (oe?.data || oe?.lazy) && w.exec(U, { id: I, mode: !oe.open });
        }
      },
      [D],
    ),
    H = R(
      (I) => {
        const U = _t(I),
          oe = I.target.dataset.action;
        oe && I.preventDefault(),
          U
            ? oe === 'add-task' || oe === 'open-task'
              ? B(U, oe)
              : w.exec('select-task', {
                  id: U,
                  toggle: I.ctrlKey || I.metaKey,
                  range: I.shiftKey,
                  show: !0,
                })
            : oe === 'add-task' && B(null, oe);
      },
      [w, B],
    ),
    z = Y(null),
    Z = Y(null),
    [E, K] = J(0),
    [he, fe] = J(!1);
  j(() => {
    const I = Z.current;
    if (!I || typeof ResizeObserver > 'u') return;
    const U = () => K(I.clientWidth);
    U();
    const oe = new ResizeObserver(U);
    return oe.observe(I), () => oe.disconnect();
  }, []);
  const Se = Y(null),
    ke = R(
      (I) => {
        const U = I.id,
          { before: oe, after: ue } = I,
          pe = I.onMove;
        let ve = oe || ue,
          Oe = oe ? 'before' : 'after';
        if (pe) {
          if (Oe === 'after') {
            const Ge = w.getTask(ve);
            Ge.data?.length &&
              Ge.open &&
              ((Oe = 'before'), (ve = Ge.data[0].id));
          }
          Se.current = { id: U, [Oe]: ve };
        } else Se.current = null;
        w.exec('move-task', {
          id: U,
          mode: Oe,
          target: ve,
          inProgress: pe,
        });
      },
      [w],
    ),
    De = $(() => S?.from ?? 0, [S]),
    de = $(() => T?.height ?? 0, [T]),
    be = $(
      () => (!t && s !== 'grid' ? (d ?? 0) > (r ?? 0) : (d ?? 0) > (E ?? 0)),
      [t, s, d, r, E],
    ),
    _e = $(() => {
      const I = {};
      return (
        (be && s === 'all') || (s === 'grid' && be)
          ? (I.width = d)
          : s === 'grid' && (I.width = '100%'),
        l && i && (I.minHeight = i),
        I
      );
    }, [be, s, d, l, i]),
    He = $(() => (O && !D.find((I) => I.id === O.id) ? [...D, O] : D), [D, O]),
    Fe = $(() => {
      let I = (X || []).map((ue) => {
        ue = { ...ue };
        const pe = ue.header;
        if (typeof pe == 'object') {
          const ve = pe.text && x(pe.text);
          ue.header = { ...pe, text: ve };
        } else ue.header = x(pe);
        if (ue.cell && ue.id !== 'text' && ue.id !== 'add-task') {
          const ve = ue.cell;
          ue.cell = (Oe) => /* @__PURE__ */ p(ve, { ...Oe, api: w });
        }
        return ue;
      });
      const U = I.findIndex((ue) => ue.id === 'text'),
        oe = I.findIndex((ue) => ue.id === 'add-task');
      if (
        (U !== -1 && (I[U].cell && (I[U]._cell = I[U].cell), (I[U].cell = pu)),
        oe !== -1)
      ) {
        I[oe].cell = I[oe].cell || Os;
        const ue = I[oe].header;
        if (
          (typeof ue != 'object' && (I[oe].header = { text: ue }),
          (I[oe].header.cell = ue.cell || Os),
          e)
        )
          I.splice(oe, 1);
        else if (t) {
          const [pe] = I.splice(oe, 1);
          I.unshift(pe);
        }
      }
      return I.length > 0 && (I[I.length - 1].resize = !1), I;
    }, [X, x, e, t, w]),
    te = $(
      () =>
        s === 'all'
          ? `${r}px`
          : s === 'grid'
            ? 'calc(100% - 4px)'
            : Fe.find((I) => I.id === 'add-task')
              ? '50px'
              : '0',
      [s, r, Fe],
    ),
    le = $(() => {
      if (He && N?.length) {
        const I = {};
        return (
          N.forEach(({ key: U, order: oe }, ue) => {
            I[U] = {
              order: oe,
              ...(N.length > 1 && { index: ue }),
            };
          }),
          I
        );
      }
      return {};
    }, [He, N]),
    se = R(() => Fe.some((I) => I.flexgrow && !I.hidden), []),
    $e = $(() => se(), [se, he]),
    Ce = $(() => {
      let I = s === 'chart' ? Fe.filter((oe) => oe.id === 'add-task') : Fe;
      const U = s === 'all' ? r : E;
      if (!$e) {
        let oe = d,
          ue = !1;
        if (Fe.some((pe) => pe.$width)) {
          let pe = 0;
          (oe = Fe.reduce(
            (ve, Oe) => (
              Oe.hidden || ((pe += Oe.width), (ve += Oe.$width || Oe.width)), ve
            ),
            0,
          )),
            pe > oe && oe > U && (ue = !0);
        }
        if (ue || oe < U) {
          let pe = 1;
          return (
            ue || (pe = (U - 50) / (oe - 50 || 1)),
            I.map(
              (ve) => (
                ve.id !== 'add-task' &&
                  !ve.hidden &&
                  (ve.$width || (ve.$width = ve.width),
                  (ve.width = ve.$width * pe)),
                ve
              ),
            )
          );
        }
      }
      return I;
    }, [s, Fe, $e, d, r, E]),
    me = R(
      (I) => {
        if (!se()) {
          const U = Ce.reduce(
            (oe, ue) => (
              I && ue.$width && (ue.$width = ue.width),
              oe + (ue.hidden ? 0 : ue.width)
            ),
            0,
          );
          U !== d && f(U);
        }
        fe(!0), fe(!1);
      },
      [se, Ce, d, f],
    ),
    Q = R(() => {
      Fe.filter((U) => U.flexgrow && !U.hidden).length === 1 &&
        Fe.forEach((U) => {
          U.$width && !U.flexgrow && !U.hidden && (U.width = U.$width);
        });
    }, []),
    Ae = R(
      (I) => {
        if (!e) {
          const U = _t(I),
            oe = vr(I, 'data-col-id');
          !(oe && Fe.find((pe) => pe.id == oe))?.editor &&
            U &&
            w.exec('show-editor', { id: U });
        }
      },
      [w, e],
      // cols is defined later; relies on latest value at call time
    ),
    Ne = $(() => (Array.isArray(M) ? M.map((I) => I.id) : []), [M]),
    xe = R(() => {
      if (z.current && He !== null) {
        const I = z.current.querySelector('.wx-body');
        I &&
          (l
            ? (I.style.top = '0px')
            : (I.style.top = -((y ?? 0) - (De ?? 0)) + 'px'));
      }
      Z.current && (Z.current.scrollTop = 0);
    }, [He, y, De, l]);
  j(() => {
    z.current && xe();
  }, [y, De, xe]),
    j(() => {
      const I = z.current;
      if (!I) return;
      const U = I.querySelector('.wx-table-box .wx-body');
      if (!U || typeof ResizeObserver > 'u') return;
      const oe = new ResizeObserver(() => {
        xe();
      });
      return (
        oe.observe(U),
        () => {
          oe.disconnect();
        }
      );
    }, [Ce, _e, s, te, He, xe]),
    j(() => {
      if (!v || !g) return;
      const { id: I } = v,
        U = g.getState().focusCell;
      U &&
        U.row !== I &&
        z.current &&
        z.current.contains(document.activeElement) &&
        g.exec('focus-cell', {
          row: I,
          column: U.column,
        });
    }, [v, g]),
    j(() => {
      if (!l) return;
      const I = z.current;
      if (!I) return;
      const U = I.querySelector('.wx-table-box .wx-body');
      if (!U) return;
      const oe = {
        attributes: !0,
        attributeFilter: ['style'],
        childList: !0,
      };
      let ue = null,
        pe;
      const ve = () => {
        pe.disconnect();
        let Oe = 0;
        U.querySelectorAll('[data-id]').forEach((et) => {
          const yt = et.getAttribute('data-id'),
            $t =
              c && yt
                ? (c.taskRows.get(yt) ?? c.taskRows.get(Number(yt)) ?? yt)
                : yt,
            Ht = (u && $t && u[$t]) || b;
          (et.style.height = `${Ht}px`),
            (et.style.minHeight = `${Ht}px`),
            (Oe += Ht);
        }),
          Oe > 0 && (U.style.height = `${Oe}px`),
          pe.observe(U, oe);
      };
      return (
        (pe = new MutationObserver(() => {
          ue && cancelAnimationFrame(ue), (ue = requestAnimationFrame(ve));
        })),
        ve(),
        () => {
          pe.disconnect(), ue && cancelAnimationFrame(ue);
        }
      );
    }, [u, l, He, b, c]);
  const ze = R(
      ({ id: I }) => {
        if (e) return !1;
        w.getTask(I).open && w.exec('open-task', { id: I, mode: !1 });
        const U = w.getState()._tasks.find((oe) => oe.id === I);
        if ((G(U || null), !U)) return !1;
      },
      [w, e],
    ),
    Xe = R(
      ({ id: I, top: U }) => {
        Se.current
          ? ke({ ...Se.current, onMove: !1 })
          : w.exec('drag-task', {
              id: I,
              top: U + (De ?? 0),
              inProgress: !1,
            }),
          G(null);
      },
      [w, ke, De],
    ),
    ne = R(
      ({ id: I, top: U, detail: oe }) => {
        oe && ke({ ...oe, onMove: !0 }),
          w.exec('drag-task', {
            id: I,
            top: U + (De ?? 0),
            inProgress: !0,
          });
      },
      [w, ke, De],
    );
  j(() => {
    const I = z.current;
    return I
      ? kc(I, {
          start: ze,
          end: Xe,
          move: ne,
          getTask: w.getTask,
        }).destroy
      : void 0;
  }, [w, ze, Xe, ne]);
  const ye = R(
      (I) => {
        const { key: U, isInput: oe } = I;
        if (!oe && (U === 'arrowup' || U === 'arrowdown'))
          return (I.eventSource = 'grid'), w.exec('hotkey', I), !1;
        if (U === 'enter') {
          const ue = g?.getState().focusCell;
          if (ue) {
            const { row: pe, column: ve } = ue;
            ve === 'add-task'
              ? B(pe, 'add-task')
              : ve === 'text' && B(pe, 'open-task');
          }
        }
      },
      [w, B, g],
    ),
    Te = Y(null),
    We = () => {
      Te.current = {
        setTableAPI: m,
        handleHotkey: ye,
        sortVal: N,
        api: w,
        adjustColumns: Q,
        setColumnWidth: me,
        tasks: D,
        calendarVal: A,
        durationUnitVal: C,
        splitTasksVal: P,
        onTableAPIChange: a,
      };
    };
  We(),
    j(() => {
      We();
    }, [m, ye, N, w, Q, me, D, A, C, P, a]);
  const Pe = R((I) => {
    m(I),
      I.intercept('hotkey', (U) => Te.current.handleHotkey(U)),
      I.intercept('scroll', () => !1),
      I.intercept('select-row', () => !1),
      I.intercept('sort-rows', (U) => {
        const oe = Te.current.sortVal,
          { key: ue, add: pe } = U,
          ve = oe ? oe.find((Ge) => Ge.key === ue) : null;
        let Oe = 'asc';
        return (
          ve && (Oe = !ve || ve.order === 'asc' ? 'desc' : 'asc'),
          w.exec('sort-tasks', {
            key: ue,
            order: Oe,
            add: pe,
          }),
          !1
        );
      }),
      I.on('resize-column', () => {
        Te.current.setColumnWidth(!0);
      }),
      I.on('hide-column', (U) => {
        U.mode || Te.current.adjustColumns(), Te.current.setColumnWidth();
      }),
      I.intercept('update-cell', (U) => {
        const { id: oe, column: ue, value: pe } = U,
          ve = Te.current.tasks.find((Oe) => Oe.id === oe);
        if (ve) {
          const Oe = { ...ve };
          let Ge = pe;
          Ge && !isNaN(Ge) && !(Ge instanceof Date) && (Ge *= 1),
            (Oe[ue] = Ge),
            Oo(
              Oe,
              {
                calendar: Te.current.calendarVal,
                durationUnit: Te.current.durationUnitVal,
                splitTasks: Te.current.splitTasksVal,
              },
              ue,
            ),
            w.exec('update-task', {
              id: oe,
              task: Oe,
            });
        }
        return !1;
      }),
      a && a(I);
  }, []);
  return /* @__PURE__ */ p('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${te}` },
    ref: Z,
    children: /* @__PURE__ */ p('div', {
      ref: z,
      style: _e,
      className: 'wx-rHj6070p wx-table',
      onClick: H,
      onDoubleClick: Ae,
      children: /* @__PURE__ */ p(fu, {
        init: Pe,
        sizes: {
          rowHeight: b,
          headerHeight: (de ?? 0) - 1,
        },
        rowStyle: (I) =>
          I.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (I) =>
          `wx-rHj6070p wx-text-${I.align}${I.id === 'add-task' ? ' wx-action' : ''}`,
        data: He,
        columns: Ce,
        selectedRows: [...Ne],
        sortMarks: le,
      }),
    }),
  });
}
function wu({ borders: n = '', rowLayout: e = null }) {
  const t = Ie(Et),
    r = ce(t, 'cellWidth'),
    s = ce(t, 'cellHeight'),
    o = Y(null),
    [i, a] = J('#e4e4e4');
  j(() => {
    if (typeof getComputedStyle < 'u' && o.current) {
      const u = getComputedStyle(o.current).getPropertyValue(
        '--wx-gantt-border',
      );
      a(u ? u.substring(u.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const l = $(() => {
    if (!e) return null;
    const u = [];
    let d = 0;
    for (const f of e) (d += f.height), u.push(d);
    return u;
  }, [e]);
  if (!l) {
    const u = {
      width: '100%',
      height: '100%',
      background: r != null && s != null ? `url(${Cl(r, s, i, n)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ p('div', { ref: o, style: u });
  }
  const c = r
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${r - 1}px, ${i} ${r - 1}px, ${i} ${r}px)`
    : void 0;
  return /* @__PURE__ */ ee('div', {
    ref: o,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ p('div', {
        style: {
          width: '100%',
          height: '100%',
          background: c,
          position: 'absolute',
        },
      }),
      l.map((u, d) =>
        /* @__PURE__ */ p(
          'div',
          {
            style: {
              position: 'absolute',
              top: `${u}px`,
              width: '100%',
              height: '1px',
              backgroundColor: i,
            },
          },
          d,
        ),
      ),
    ],
  });
}
function wn(n) {
  const e = n.split(',').map(Number),
    t = [];
  for (let r = 0; r < e.length; r += 2) t.push([e[r], e[r + 1]]);
  return { path: t.slice(0, -3), arrow: t.slice(-3) };
}
function xu(n) {
  return n.split(',').map(Number).slice(0, -6).join(',');
}
function yu(n, e = 8) {
  if (!n) return '';
  const { path: t } = wn(n);
  if (t.length < 2) return '';
  let r = `M${t[0][0]},${t[0][1]}`;
  for (let s = 1; s < t.length - 1; s++) {
    const o = t[s - 1],
      i = t[s],
      a = t[s + 1],
      l = i[0] - o[0],
      c = i[1] - o[1],
      u = a[0] - i[0],
      d = a[1] - i[1];
    if (l === u && c === d) {
      r += ` L${i[0]},${i[1]}`;
      continue;
    }
    const f = Math.hypot(l, c),
      g = Math.hypot(u, d);
    if (f === 0 || g === 0) {
      r += ` L${i[0]},${i[1]}`;
      continue;
    }
    const m = Math.min(e, f / 2, g / 2),
      h = i[0] - (l / f) * m,
      x = i[1] - (c / f) * m,
      w = i[0] + (u / g) * m,
      y = i[1] + (d / g) * m;
    (r += ` L${h},${x}`), (r += ` Q${i[0]},${i[1]} ${w},${y}`);
  }
  return (r += ` L${t[t.length - 1][0]},${t[t.length - 1][1]}`), r;
}
function vu(n, e) {
  if (!n) return '';
  const { path: t } = wn(n);
  if (t.length < 2) return '';
  const r = t[0],
    s = t[t.length - 1],
    o = s[0] - r[0],
    i = s[1] - r[1],
    a = !e || e[0] === 'e',
    l = !e || e[2] === 's',
    c = (a && l && o < 0) || (!a && !l && o > 0),
    u = Math.hypot(o, i),
    d = Math.abs(o);
  let f = `M${r[0]},${r[1]}`;
  if (c) {
    const g = Math.max(40, Math.min(d * 0.3, 160)),
      m = Math.max(60, Math.min(d * 0.4, 200)),
      h = Math.max(40, Math.min(d * 0.2, 100)),
      x = Math.abs(i),
      w = i >= 0 ? 1 : -1,
      y = r[0] + (a ? g : -g),
      b = r[1] + w * h,
      v = s[0] + (l ? -m : m),
      M = Math.max(20, Math.min(x * 0.5, 80)),
      S = s[1] - w * M;
    f += ` C${y},${b} ${v},${S} ${s[0]},${s[1]}`;
  } else {
    const g = Math.max(40, Math.min(u * 0.5, 150)),
      m = r[0] + (a ? g : -g),
      h = s[0] + (l ? -g : g);
    f += ` C${m},${r[1]} ${h},${s[1]} ${s[0]},${s[1]}`;
  }
  return f;
}
function ku(n, e, t) {
  return e === 'bezier' ? vu(n, t) : yu(n);
}
const Ln = 5,
  zs = 4;
function bu(n) {
  if (!n || !n.length) return n;
  const e = n.map((o) => {
      if (!o.$p) return null;
      const { path: i } = wn(o.$p);
      return i;
    }),
    t = /* @__PURE__ */ new Map(),
    r = /* @__PURE__ */ new Map();
  e.forEach((o, i) => {
    if (!(!o || o.length < 2))
      for (let a = 0; a < o.length - 1; a++) {
        const [l, c] = o[a],
          [u, d] = o[a + 1];
        if (Math.abs(c - d) < 1) {
          const f = Math.round((c + d) / 2 / Ln) * Ln;
          t.has(f) || t.set(f, []),
            t.get(f).push({
              linkIdx: i,
              segIdx: a,
              min: Math.min(l, u),
              max: Math.max(l, u),
              y: (c + d) / 2,
            });
        } else if (Math.abs(l - u) < 1) {
          const f = Math.round((l + u) / 2 / Ln) * Ln;
          r.has(f) || r.set(f, []),
            r.get(f).push({
              linkIdx: i,
              segIdx: a,
              min: Math.min(c, d),
              max: Math.max(c, d),
              x: (l + u) / 2,
            });
        }
      }
  });
  const s = e.map((o) => (o ? o.map((i) => [...i]) : null));
  for (const o of r.values()) {
    if (o.length < 2) continue;
    const i = [];
    for (let l = 0; l < o.length; l++)
      for (let c = l + 1; c < o.length; c++)
        o[l].min < o[c].max &&
          o[l].max > o[c].min &&
          (i.includes(o[l]) || i.push(o[l]), i.includes(o[c]) || i.push(o[c]));
    if (i.length < 2) continue;
    const a = i.length;
    i.forEach((l, c) => {
      const u = (c - (a - 1) / 2) * zs,
        d = s[l.linkIdx];
      d && ((d[l.segIdx][0] += u), (d[l.segIdx + 1][0] += u));
    });
  }
  for (const o of t.values()) {
    if (o.length < 2) continue;
    const i = [];
    for (let l = 0; l < o.length; l++)
      for (let c = l + 1; c < o.length; c++)
        o[l].min < o[c].max &&
          o[l].max > o[c].min &&
          (i.includes(o[l]) || i.push(o[l]), i.includes(o[c]) || i.push(o[c]));
    if (i.length < 2) continue;
    const a = i.length;
    i.forEach((l, c) => {
      const u = (c - (a - 1) / 2) * zs,
        d = s[l.linkIdx];
      d && ((d[l.segIdx][1] += u), (d[l.segIdx + 1][1] += u));
    });
  }
  return n.map((o, i) => {
    const a = s[i];
    if (!a || !o.$p) return o;
    const c = o.$p.split(',').map(Number).slice(-6),
      u = [];
    for (const d of a) u.push(d[0], d[1]);
    return { ...o, $p: [...u, ...c].join(',') };
  });
}
function Pn(n, e) {
  if (!n) return null;
  if (n.color) return n.color;
  const t = e.current;
  return t
    ? n.type === 'summary'
      ? t.summary || null
      : n.type === 'milestone'
        ? t.milestone || null
        : t.task || null
    : null;
}
function Su(n, e) {
  const t = e?.style || n;
  if (t === 'dashed') return '8 4';
  if (t === 'dotted') return '2 4';
}
function $u({
  onSelectLink: n,
  selectedLink: e,
  readonly: t,
  linkShape: r,
  linkGradient: s,
  linkStyle: o,
  linkBundling: i,
  multiTaskRows: a,
  taskPositions: l,
  cellHeight: c,
}) {
  const u = Ie(Et),
    [d, f] = tn(u, '_links'),
    [g] = tn(u, 'criticalPath'),
    m = ce(u, '_tasks'),
    h = r && r !== 'squared',
    x = Y(null),
    w = Y(null),
    y = Y(null),
    b = Y(/* @__PURE__ */ new Set());
  j(() => {
    if (!s || !w.current) return;
    const C = getComputedStyle(w.current);
    y.current = {
      task: C.getPropertyValue('--wx-gantt-task-color').trim() || null,
      summary: C.getPropertyValue('--wx-gantt-summary-color').trim() || null,
      milestone:
        C.getPropertyValue('--wx-gantt-milestone-color').trim() || null,
      link: C.getPropertyValue('--wx-gantt-link-color').trim() || '#888',
    };
  }, [s]);
  const v = $(() => {
      if (!d?.length || !m?.length) return d;
      const C = new Set(m.map((B) => B.id)),
        P = new Map(m.map((B) => [B.id, B]));
      let O = !1;
      for (const B of d)
        if (!C.has(B.source) || !C.has(B.target)) {
          O = !0;
          break;
        }
      if (!O) return d;
      function G(B) {
        let H = u.getTask(B);
        for (; H; ) {
          if (C.has(H.id)) return P.get(H.id);
          if (!H.parent) return null;
          H = u.getTask(H.parent);
        }
        return null;
      }
      function D(B, H, z) {
        const Z = !z || z[0] === 'e',
          E = !z || z[2] === 's',
          K = B.$h || c,
          he = H.$h || c,
          fe = Z ? B.$x + B.$w : B.$x,
          Se = B.$y + K / 2,
          ke = E ? H.$x : H.$x + H.$w,
          De = H.$y + he / 2,
          de = 5,
          be = E ? -1 : 1,
          _e = ke + be * -10,
          He = De - de,
          Fe = ke,
          te = De,
          le = ke + be * -10,
          se = De + de;
        return [fe, Se, ke, De, _e, He, Fe, te, le, se].join(',');
      }
      return d.map((B) => {
        const H = C.has(B.source),
          z = C.has(B.target);
        if (H && z) return B;
        const Z = H ? P.get(B.source) : G(B.source),
          E = z ? P.get(B.target) : G(B.target);
        if (!Z || !E || Z.id === E.id) return B;
        const K = D(Z, E, B.type);
        return { ...B, $p: K, _rerouted: !0 };
      });
    }, [d, f, m, u, c]),
    M = $(() => {
      if (!a || !l || !m?.length || !v?.length || !c) return v;
      const C = /* @__PURE__ */ new Map();
      let P = !1;
      if (
        (m.forEach((D) => {
          const B = l.get(D.id);
          if (!B) return;
          const H = D.$y + c / 2,
            Z = B.y + B.h / 2 - H;
          Math.abs(Z) > 0.5 && (P = !0), C.set(D.id, Z);
        }),
        !P)
      )
        return v;
      const O = [];
      m.forEach((D) => {
        const B = C.get(D.id);
        B !== void 0 && O.push({ storeCenter: D.$y + c / 2, delta: B });
      }),
        O.sort((D, B) => D.storeCenter - B.storeCenter);
      function G(D) {
        let B = 0,
          H = 1 / 0;
        for (const z of O) {
          const Z = Math.abs(D - z.storeCenter);
          Z < H && ((H = Z), (B = z.delta));
        }
        return B;
      }
      return v.map((D) => {
        if (!D.$p) return D;
        const B = C.get(D.source) ?? 0,
          H = C.get(D.target) ?? 0;
        if (Math.abs(B) < 0.5 && Math.abs(H) < 0.5) return D;
        const z = D.$p.split(',').map(Number),
          Z = [...z],
          E = z.length - 6;
        E >= 2 && (Z[1] += B), E >= 4 && (Z[E - 1] += H);
        for (let K = 2; K < E - 2; K += 2) Z[K + 1] += G(z[K + 1]);
        for (let K = E; K < z.length; K += 2) Z[K + 1] += H;
        return { ...D, $p: Z.join(',') };
      });
    }, [v, f, a, l, m, c]),
    S = $(() => (!i || !M?.length ? M : bu(M)), [M, f, i]),
    _ = $(() => {
      const C = b.current,
        P = /* @__PURE__ */ new Set();
      if (S) for (const O of S) C.has(O.id) || P.add(O.id);
      return P;
    }, [S, f]);
  j(() => {
    S && (b.current = new Set(S.map((C) => C.id)));
  }, [S, f]);
  const T = R(
    (C) => {
      const P = C?.target?.classList;
      !P?.contains('wx-line') &&
        !P?.contains('wx-line-hitarea') &&
        !P?.contains('wx-delete-button') &&
        n(null);
    },
    [n],
  );
  j(() => {
    if (!t && e && x.current) {
      const C = (P) => {
        x.current && !x.current.contains(P.target) && T(P);
      };
      return (
        document.addEventListener('click', C),
        () => {
          document.removeEventListener('click', C);
        }
      );
    }
  }, [t, e, T]);
  const X = $(() => {
      if (!s || !S?.length) return null;
      const C = [];
      for (const P of S) {
        if (!P.$p || (g && P.$critical)) continue;
        const G = u.getTask(P.source),
          D = u.getTask(P.target),
          B = Pn(G, y) || y.current?.link || '#888',
          H = Pn(D, y) || y.current?.link || '#888',
          { path: z } = wn(P.$p);
        if (z.length < 2) continue;
        const Z = z[0],
          E = z[z.length - 1],
          K = G?.progress ?? 0,
          he = Math.min(100, Math.max(0, K));
        C.push(
          /* @__PURE__ */ ee(
            'linearGradient',
            {
              id: `wx-link-grad-${P.id}`,
              gradientUnits: 'userSpaceOnUse',
              x1: Z[0],
              y1: Z[1],
              x2: E[0],
              y2: E[1],
              children: [
                /* @__PURE__ */ p('stop', { offset: '0%', stopColor: B }),
                he > 0 &&
                  /* @__PURE__ */ p('stop', { offset: `${he}%`, stopColor: B }),
                /* @__PURE__ */ p('stop', { offset: '100%', stopColor: H }),
              ],
            },
            `grad-${P.id}`,
          ),
        );
      }
      return C;
    }, [S, f, s, g, u]),
    N = (C, P) => {
      const O = g && C.$critical,
        G = _.has(C.id),
        D = C._rerouted ? '6 3' : Su(o, C),
        B = G && !P,
        H = r === 'bezier',
        Z =
          'wx-dkx3NwEn wx-line' +
          (O ? ' wx-critical' : '') +
          (!t && !P ? ' wx-line-selectable' : '') +
          (P ? ' wx-line-selected wx-line-selectable wx-delete-link' : '') +
          ' wx-line-visible' +
          (B ? (D ? ' wx-line-new-fade' : ' wx-line-new') : ''),
        E = 'wx-dkx3NwEn wx-line-hitarea';
      let K,
        he = O
          ? 'url(#wx-arrow-critical)'
          : P
            ? 'url(#wx-arrow-selected)'
            : 'url(#wx-arrow-default)';
      if (
        (s &&
          !O &&
          !P &&
          C.$p &&
          ((K = `url(#wx-link-grad-${C.id})`),
          (he = `url(#wx-arrow-grad-${C.id})`)),
        h)
      ) {
        const Se = ku(C.$p, r, C.type);
        if (H && C.$p) {
          const { arrow: ke } = wn(C.$p),
            De = ke.map((be) => be.join(',')).join(' ');
          let de;
          if (P) de = 'var(--wx-color-danger)';
          else if (O) de = 'var(--wx-gantt-link-critical-color)';
          else if (s && C.$p) {
            const be = u.getTask(C.target);
            de = Pn(be, y) || y.current?.link || 'var(--wx-gantt-link-color)';
          } else de = 'var(--wx-gantt-link-color)';
          return /* @__PURE__ */ ee(
            fn,
            {
              children: [
                /* @__PURE__ */ p('path', {
                  className: E,
                  d: Se,
                  onClick: () => !t && !P && n(C.id),
                  'data-link-id': C.id,
                }),
                /* @__PURE__ */ p('path', {
                  ref: P ? x : void 0,
                  className: Z,
                  d: Se,
                  stroke: K,
                  strokeDasharray: D,
                  'data-link-id': C.id,
                }),
                /* @__PURE__ */ p('polygon', {
                  points: De,
                  fill: de,
                  className: 'wx-dkx3NwEn',
                }),
              ],
            },
            C.id,
          );
        }
        return /* @__PURE__ */ ee(
          fn,
          {
            children: [
              /* @__PURE__ */ p('path', {
                className: E,
                d: Se,
                onClick: () => !t && !P && n(C.id),
                'data-link-id': C.id,
              }),
              /* @__PURE__ */ p('path', {
                ref: P ? x : void 0,
                className: Z,
                d: Se,
                stroke: K,
                strokeDasharray: D,
                markerEnd: he,
                'data-link-id': C.id,
              }),
            ],
          },
          C.id,
        );
      }
      const fe = xu(C.$p);
      return /* @__PURE__ */ ee(
        fn,
        {
          children: [
            /* @__PURE__ */ p('polyline', {
              className: E,
              points: fe,
              onClick: () => !t && !P && n(C.id),
              'data-link-id': C.id,
            }),
            /* @__PURE__ */ p('polyline', {
              ref: P ? x : void 0,
              className: Z,
              points: fe,
              stroke: K,
              strokeDasharray: D,
              markerEnd: he,
              'data-link-id': C.id,
            }),
          ],
        },
        C.id,
      );
    },
    A = $(() => {
      if (!s || !S?.length) return null;
      const C = [];
      for (const P of S) {
        if (!P.$p || (g && P.$critical)) continue;
        const G = u.getTask(P.target),
          D = Pn(G, y) || y.current?.link || '#888';
        C.push(
          /* @__PURE__ */ p(
            'marker',
            {
              id: `wx-arrow-grad-${P.id}`,
              markerWidth: '10',
              markerHeight: '8',
              refX: '10',
              refY: '4',
              orient: 'auto',
              markerUnits: 'userSpaceOnUse',
              children: /* @__PURE__ */ p('polygon', {
                points: '0,0 10,4 0,8',
                fill: D,
              }),
            },
            `arrow-grad-${P.id}`,
          ),
        );
      }
      return C;
    }, [S, f, s, g, u]);
  return /* @__PURE__ */ ee('svg', {
    className: 'wx-dkx3NwEn wx-links',
    ref: w,
    children: [
      /* @__PURE__ */ ee('defs', {
        children: [
          /* @__PURE__ */ p('marker', {
            id: 'wx-arrow-default',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ p('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill',
            }),
          }),
          /* @__PURE__ */ p('marker', {
            id: 'wx-arrow-critical',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ p('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-critical',
            }),
          }),
          /* @__PURE__ */ p('marker', {
            id: 'wx-arrow-selected',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ p('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-selected',
            }),
          }),
          /* @__PURE__ */ p('marker', {
            id: 'wx-arrow-hovered',
            markerWidth: '10',
            markerHeight: '8',
            refX: '10',
            refY: '4',
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
            children: /* @__PURE__ */ p('polygon', {
              points: '0,0 10,4 0,8',
              className: 'wx-arrow-fill-hovered',
            }),
          }),
          X,
          A,
        ],
      }),
      (S || []).map((C) => N(C, !1)),
      !t && e && N(e, !0),
    ],
  });
}
function Cu(n) {
  const { task: e, type: t } = n;
  function r(o) {
    const i = e.segments[o];
    return {
      left: `${i.$x}px`,
      top: '0px',
      width: `${i.$w}px`,
      height: '100%',
    };
  }
  function s(o) {
    if (!e.progress) return 0;
    const i = (e.duration * e.progress) / 100,
      a = e.segments;
    let l = 0,
      c = 0,
      u = null;
    do {
      const d = a[c];
      c === o &&
        (l > i ? (u = 0) : (u = Math.min((i - l) / d.duration, 1) * 100)),
        (l += d.duration),
        c++;
    } while (u === null && c < a.length);
    return u || 0;
  }
  return /* @__PURE__ */ p('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: e.segments.map((o, i) =>
      /* @__PURE__ */ ee(
        'div',
        {
          className: `wx-segment wx-bar wx-${t} wx-GKbcLEGA`,
          'data-segment': i,
          style: r(i),
          children: [
            e.progress
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ p('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${s(i)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ p('div', {
              className: 'wx-content',
              children: o.text || '',
            }),
          ],
        },
        i,
      ),
    ),
  });
}
let hr = [],
  gr = null,
  Ws = null;
const Fs = (n, e, t, r) => n < r && e > t,
  Ys = (n, e) => {
    if (!e || !e.start) return null;
    const { start: t, lengthUnitWidth: r, lengthUnit: s } = e,
      o = 864e5,
      i =
        s === 'week'
          ? 7
          : s === 'month'
            ? 30
            : s === 'quarter'
              ? 91
              : s === 'year'
                ? 365
                : 1,
      a = Math.floor(n / r),
      l = new Date(t.getTime() + a * i * o);
    return l.setUTCHours(0, 0, 0, 0), l;
  },
  _u = (n, e, t) => {
    if (!t || !n || !e) return 0;
    const { lengthUnit: r } = t,
      i =
        (r === 'week'
          ? 7
          : r === 'month'
            ? 30
            : r === 'quarter'
              ? 91
              : r === 'year'
                ? 365
                : 1) * 864e5;
    return Math.round((n.getTime() - e.getTime()) / i);
  },
  Nu = (n, e, t) => {
    if (!t || !n) return n;
    const { lengthUnit: r } = t,
      i =
        (r === 'week'
          ? 7
          : r === 'month'
            ? 30
            : r === 'quarter'
              ? 91
              : r === 'year'
                ? 365
                : 1) * 864e5,
      a = new Date(n.getTime() + e * i);
    return a.setUTCHours(0, 0, 0, 0), a;
  };
function Mu(n) {
  const {
      readonly: e,
      taskTemplate: t,
      multiTaskRows: r = !1,
      rowMapping: s = null,
      rowHeightOverrides: o = null,
      allowTaskIntersection: i = !0,
      summaryBarCounts: a = !1,
      marqueeSelect: l = !1,
      copyPaste: c = !1,
      linkShape: u,
      linkGradient: d = !1,
      linkStyle: f,
      linkBundling: g = !1,
      showProgress: m = !0,
    } = n,
    h = Ie(Et),
    [x, w] = tn(h, '_tasks'),
    [y, b] = tn(h, '_links'),
    v = ce(h, 'area'),
    M = ce(h, '_scales'),
    S = ce(h, 'taskTypes'),
    _ = ce(h, 'baselines'),
    T = ce(h, '_selected'),
    X = ce(h, '_scrollTask'),
    N = ce(h, 'criticalPath'),
    A = ce(h, 'tasks'),
    C = ce(h, 'schedule'),
    P = ce(h, 'splitTasks'),
    O = ce(h, 'summary'),
    G = $(() => {
      if (!v || !Array.isArray(x)) return [];
      const k = v.start ?? 0,
        F = v.end ?? 0;
      return r && s
        ? x.map((V) => ({ ...V }))
        : x.slice(k, F).map((V) => ({ ...V }));
    }, [w, v, r, s]),
    D = ce(h, 'cellHeight'),
    B = $(() => {
      if (!r || !s || !G.length) return G;
      const k = /* @__PURE__ */ new Map(),
        F = [];
      x.forEach((ae) => {
        const Ee = s.taskRows.get(ae.id) ?? ae.id;
        k.has(Ee) || (k.set(Ee, F.length), F.push(Ee));
      });
      const V = /* @__PURE__ */ new Map();
      G.forEach((ae) => {
        if (ae.type === 'summary') return;
        const Ee = s.taskRows.get(ae.id) ?? ae.id;
        V.has(Ee) || V.set(Ee, []), V.get(Ee).push(ae);
      });
      const W = /* @__PURE__ */ new Map(),
        q = /* @__PURE__ */ new Map();
      V.forEach((ae, Ee) => {
        const Re = [],
          Je = [...ae].sort((Ve, je) => (Ve.$x ?? 0) - (je.$x ?? 0));
        for (const Ve of Je) {
          const je = Ve.$x ?? 0,
            wt = je + (Ve.$w ?? 0);
          let kt = !1;
          for (let tt = 0; tt < Re.length; tt++)
            if (
              !Re[tt].some((Ot) => {
                const _n = Ot.$x ?? 0,
                  sr = _n + (Ot.$w ?? 0);
                return Fs(je, wt, _n, sr);
              })
            ) {
              Re[tt].push(Ve), W.set(Ve.id, tt), (kt = !0);
              break;
            }
          kt || (Re.push([Ve]), W.set(Ve.id, Re.length - 1));
        }
        q.set(Ee, Re.length);
      });
      const re = /* @__PURE__ */ new Map();
      let ge = 0;
      for (const ae of F) {
        re.set(ae, ge);
        const Ee = (o && o[ae]) || D;
        ge += Ee;
      }
      return G.map((ae) => {
        const Ee = s.taskRows.get(ae.id) ?? ae.id,
          Re = re.get(Ee) ?? 0;
        if (ae.type === 'summary') {
          if ((V.get(Ee) || []).length > 0 || ae.barHidden)
            return { ...ae, $y: Re, $skip: !0 };
          const tt = (o && o[Ee]) || D,
            ht = Math.max(0, Math.floor((tt - ae.$h) / 2));
          return {
            ...ae,
            $y: Re + ht,
            $y_base: ae.$y_base !== void 0 ? Re + ht : void 0,
          };
        }
        const Je = q.get(Ee) || 1,
          Ve = W.get(ae.id) ?? 0;
        if (Je > 1) {
          const ht = ae.$h + 4,
            Ot = Re + 3 + Ve * ht;
          return {
            ...ae,
            $y: Ot,
            $y_base: ae.$y_base !== void 0 ? Ot : void 0,
          };
        }
        const je = (o && o[Ee]) || D,
          wt = Math.max(0, Math.round((je - ae.$h) / 2));
        return {
          ...ae,
          $y: Re + wt,
          $y_base: ae.$y_base !== void 0 ? Re + wt : void 0,
        };
      });
    }, [G, r, s, x, D, o]),
    H = $(() => {
      if (!r || !B?.length) return null;
      const k = /* @__PURE__ */ new Map();
      for (const F of B) F.$skip || k.set(F.id, { y: F.$y, h: F.$h });
      return k;
    }, [r, B]),
    z = $(() => M.lengthUnitWidth, [M]),
    Z = $(() => M.lengthUnit || 'day', [M]),
    E = $(() => {
      const k = /* @__PURE__ */ new Set();
      if (i || !r || !s) return k;
      const F = /* @__PURE__ */ new Map();
      return (
        x.forEach((V) => {
          if (V.type === 'summary' || V.type === 'milestone') return;
          const W = s.taskRows.get(V.id) ?? V.id;
          F.has(W) || F.set(W, []), F.get(W).push(V);
        }),
        F.forEach((V) => {
          if (!(V.length < 2))
            for (let W = 0; W < V.length; W++)
              for (let q = W + 1; q < V.length; q++) {
                const re = V[W],
                  ge = V[q];
                Fs(re.$x, re.$x + re.$w, ge.$x, ge.$x + ge.$w) &&
                  (k.add(re.id), k.add(ge.id));
              }
        }),
        k
      );
    }, [i, r, s, x, w]),
    K = $(() => {
      if (!a || !x?.length || !z) return null;
      const k = /* @__PURE__ */ new Map(),
        F = /* @__PURE__ */ new Set();
      x.forEach((W) => {
        W.type === 'summary' && F.add(W.id),
          W.parent &&
            W.parent !== 0 &&
            W.type !== 'summary' &&
            (k.has(W.parent) || k.set(W.parent, []), k.get(W.parent).push(W));
      });
      const V = /* @__PURE__ */ new Map();
      return (
        F.forEach((W) => {
          const q = k.get(W);
          if (!q?.length) return;
          const re = /* @__PURE__ */ new Map();
          q.forEach((ge) => {
            if (ge.$x == null || ge.$w == null) return;
            const ae = Math.floor(ge.$x / z),
              Ee = Math.ceil((ge.$x + ge.$w) / z);
            for (let Re = ae; Re < Ee; Re++) re.set(Re, (re.get(Re) || 0) + 1);
          }),
            re.size > 0 && V.set(W, re);
        }),
        V
      );
    }, [a, x, z]),
    [he, fe] = J(null),
    Se = Y(null),
    [ke, De] = J(null),
    [de, be] = J(null),
    [_e, He] = J(null),
    Fe = Y(null);
  Fe.current = _e;
  const te = Y(0),
    le = Y(!1),
    [se, $e] = J(void 0),
    Ce = Y(null),
    me = Y(null),
    Q = Y(!1),
    Ae = Y(null),
    [Ne, xe] = J(null),
    [ze, Xe] = J(null),
    ne = Y(null),
    [ye, Te] = J(null),
    We = $(
      () =>
        ye && {
          ...y.find((k) => k.id === ye),
        },
      [ye, b],
    ),
    [Pe, I] = J(void 0),
    U = Y(null),
    [oe, ue] = J(0),
    pe = Y(null),
    ve = $(() => {
      const k = pe.current;
      return !!(T.length && k && k.contains(document.activeElement));
    }, [T, pe.current]),
    Oe = $(() => ve && T[T.length - 1]?.id, [ve, T]);
  j(() => {
    if (X && ve && X) {
      const { id: k } = X,
        F = pe.current?.querySelector(`.wx-bar[data-id='${k}']`);
      F && F.focus({ preventScroll: !0 });
    }
  }, [X]),
    j(() => {
      const k = pe.current;
      if (k && (ue(k.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const F = new ResizeObserver((V) => {
          V[0] && ue(V[0].contentRect.width);
        });
        return F.observe(k), () => F.disconnect();
      }
    }, [pe.current]);
  const Ge = R(() => {
      document.body.style.userSelect = 'none';
    }, []),
    et = R(() => {
      document.body.style.userSelect = '';
    }, []),
    yt = $(() => {
      if (!r || !s || !x?.length) return /* @__PURE__ */ new Map();
      const k = /* @__PURE__ */ new Map(),
        F = /* @__PURE__ */ new Map(),
        V = [];
      return (
        x.forEach((W) => {
          const q = s.taskRows.get(W.id) ?? W.id;
          F.has(q) || (F.set(q, V.length), V.push(q));
        }),
        x.forEach((W) => {
          const q = s.taskRows.get(W.id) ?? W.id,
            re = F.get(q) ?? 0;
          k.set(W.id, re * D);
        }),
        k
      );
    }, [x, r, s, D]),
    $t = $(() => {
      if (!r || !s || !x?.length) return /* @__PURE__ */ new Map();
      const k = /* @__PURE__ */ new Map(),
        F = /* @__PURE__ */ new Map(),
        V = [];
      return (
        x.forEach((W) => {
          const q = s.taskRows.get(W.id) ?? W.id;
          F.has(q) || (F.set(q, V.length), V.push(q));
        }),
        x.forEach((W) => {
          const q = W.row ?? W.id;
          if (!k.has(q)) {
            const re = s.taskRows.get(W.id) ?? W.id,
              ge = F.get(re) ?? 0;
            k.set(q, ge * D);
          }
        }),
        k
      );
    }, [x, r, s, D]),
    Ht = R(
      (k) => {
        if (!pe.current) return [];
        const F = Math.min(k.startX, k.currentX),
          V = Math.max(k.startX, k.currentX),
          W = Math.min(k.startY, k.currentY),
          q = Math.max(k.startY, k.currentY);
        return x.filter((re) => {
          const ge = re.$x,
            ae = re.$x + re.$w,
            Re = yt.get(re.id) ?? re.$y,
            Je = Re + re.$h;
          return ge < V && ae > F && Re < q && Je > W;
        });
      },
      [x, yt],
    ),
    $n = R(() => {
      if (!c) return;
      const k = h.getState()._selected;
      if (!k || !k.length) return;
      const F = 864e5,
        V = k
          .map((ae) => {
            if (!h.getTask(ae.id)) return null;
            const Re = x.find((sr) => sr.id === ae.id);
            if (!Re) return null;
            const {
                $x: Je,
                $y: Ve,
                $h: je,
                $w: wt,
                $skip: kt,
                $level: tt,
                ...ht
              } = Re,
              Ot =
                Re.end && Re.start
                  ? Math.round((Re.end.getTime() - Re.start.getTime()) / F)
                  : 0,
              _n = Re.start ? (Re.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...ht,
              _durationDays: Ot,
              _startDayOfWeek: _n,
              _originalWidth: wt,
              _originalHeight: je,
            };
          })
          .filter(Boolean);
      if (!V.length) return;
      const q = V[0].parent,
        re = V.filter((ae) => ae.parent === q);
      if (re.length === 0) return;
      const ge = re.reduce(
        (ae, Ee) => (Ee.start && (!ae || Ee.start < ae) ? Ee.start : ae),
        null,
      );
      (hr = re.map((ae) => ({
        ...ae,
        _startCellOffset: _u(ae.start, ge, M),
      }))),
        (Ws = q),
        (gr = ge);
    }, [c, h, x, M]),
    tr = R(
      (k, F, V) => {
        if (!F.length || !k || V == null) return;
        const W = 864e5,
          q = h.getHistory();
        q?.startBatch();
        const re = new Date(k);
        re.setUTCHours(0, 0, 0, 0),
          F.forEach((ge, ae) => {
            const Ee = `task-${Date.now()}-${ae}`,
              Re = Nu(re, ge._startCellOffset || 0, M),
              Je = new Date(Re.getTime() + (ge._startDayOfWeek || 0) * W);
            Je.setUTCHours(0, 0, 0, 0);
            const Ve = new Date(Je.getTime() + (ge._durationDays || 7) * W);
            Ve.setUTCHours(0, 0, 0, 0),
              h.exec('add-task', {
                task: {
                  id: Ee,
                  text: ge.text,
                  start: Je,
                  end: Ve,
                  type: ge.type || 'task',
                  parent: V,
                  row: ge.row,
                },
                target: V,
                mode: 'child',
                skipUndo: ae > 0,
              });
          }),
          q?.endBatch();
      },
      [h, M],
    );
  j(
    () =>
      c
        ? h.intercept('hotkey', (F) => {
            if (F.key === 'ctrl+c' || F.key === 'meta+c') return $n(), !1;
            if (F.key === 'ctrl+v' || F.key === 'meta+v')
              return (
                !hr.length ||
                  !gr ||
                  be({
                    tasks: hr,
                    baseDate: gr,
                    parent: Ws,
                    currentX: te.current,
                  }),
                !1
              );
          })
        : void 0,
    [c, h, $n],
  ),
    j(() => {
      if (!de) return;
      const k = (F) => {
        F.key === 'Escape' &&
          (F.preventDefault(), F.stopPropagation(), be(null));
      };
      return (
        document.addEventListener('keydown', k, !0),
        () => document.removeEventListener('keydown', k, !0)
      );
    }, [de]);
  const Kt = R(
      (k, F, V) => {
        if (
          F.target.classList.contains('wx-line') ||
          (V || (V = h.getTask(Wt(k))),
          V.type === 'milestone' || V.type === 'summary')
        )
          return '';
        const W = st(F, 'data-segment');
        W && (k = W);
        const { left: q, width: re } = k.getBoundingClientRect(),
          ge = (F.clientX - q) / re;
        let ae = 0.2 / (re > 200 ? re / 200 : 1);
        return ge < ae ? 'start' : ge > 1 - ae ? 'end' : '';
      },
      [h],
    ),
    Xt = R(
      (k, F) => {
        const { clientX: V } = F,
          W = Wt(k),
          q = h.getTask(W),
          re = F.target.classList;
        if (
          !F.target.closest('.wx-delete-button') &&
          !F.target.closest('[data-interactive]') &&
          !(re.contains('wx-link') || F.target.closest('.wx-link')) &&
          !e
        ) {
          if (re.contains('wx-progress-marker')) {
            const { progress: ge } = h.getTask(W);
            (ne.current = {
              id: W,
              x: V,
              progress: ge,
              dx: 0,
              node: k,
              marker: F.target,
            }),
              F.target.classList.add('wx-progress-in-drag');
          } else {
            const ge = Kt(k, F, q) || 'move',
              ae = {
                id: W,
                mode: ge,
                x: V,
                dx: 0,
                l: q.$x,
                w: q.$w,
              };
            if (P && q.segments?.length) {
              const Ee = st(F, 'data-segment');
              Ee && (ae.segmentIndex = Ee.dataset.segment * 1);
            }
            Xe(ae);
          }
          Ge();
        }
      },
      [h, e, Kt, Ge, P],
    ),
    Cn = R(
      (k) => {
        if (k.button !== 0 || de) return;
        const F = st(k);
        if (!F && l && !e) {
          const V = pe.current;
          if (!V) return;
          const W = V.getBoundingClientRect(),
            q = k.clientX - W.left,
            re = k.clientY - W.top;
          if (c) {
            const ae = Ys(q, M);
            ae && ((Fe.current = ae), He(ae));
          }
          const ge = {
            startX: q,
            startY: re,
            currentX: q,
            currentY: re,
            ctrlKey: k.ctrlKey || k.metaKey,
          };
          fe(ge), (Se.current = ge), Ge();
          return;
        }
        if (F && l && !e && T.length > 1) {
          const V = Wt(F);
          if (T.some((q) => q.id === V)) {
            De({
              startX: k.clientX,
              ids: T.map((q) => q.id),
              tasks: T.map((q) => {
                const re = h.getTask(q.id);
                return {
                  id: q.id,
                  start: re.start,
                  end: re.end,
                  $x: re.$x,
                  $w: re.$w,
                };
              }),
            }),
              Ge();
            return;
          }
        }
        if (
          !e &&
          (k.target.classList.contains('wx-link') ||
            k.target.classList.contains('wx-inner'))
        ) {
          if (Ce.current) return;
          const V = k.target.classList.contains('wx-link')
            ? k.target
            : k.target.closest('.wx-link');
          if (V) {
            const W = _t(V);
            if (W) {
              const q = V.classList.contains('wx-left'),
                re = { id: W, start: q };
              $e(re),
                (Ce.current = re),
                (me.current = { clientX: k.clientX, clientY: k.clientY }),
                (Q.current = !1),
                (le.current = !0),
                Ge();
              return;
            }
          }
        }
        F && Xt(F, k);
      },
      [Xt, l, c, e, de, M, T, h, Ge],
    ),
    nr = R(
      (k) => {
        const F = st(k);
        F &&
          (U.current = setTimeout(() => {
            I(!0), Xt(F, k.touches[0]);
          }, 300));
      },
      [Xt],
    ),
    Rt = ['e2s', 's2s', 'e2e', 's2e'],
    vt = R((k, F) => Rt[(k ? 1 : 0) + (F ? 0 : 2)], []),
    At = R(
      (k, F) => {
        const V = se.id,
          W = se.start;
        return k === V
          ? !0
          : !!y.find(
              (q) => q.target == k && q.source == V && q.type === vt(W, F),
            );
      },
      [se, b, vt],
    ),
    qt = R((k) => {
      Te(k);
    }, []),
    mt = R(
      (k) => {
        if (me.current) {
          const V = Q.current;
          if (
            ((me.current = null),
            (Q.current = !1),
            (Ae.current = null),
            xe(null),
            et(),
            V)
          ) {
            const W = Ce.current,
              q = k || window.event,
              re = q ? document.elementFromPoint(q.clientX, q.clientY) : null;
            if (re && W) {
              const ge = re.classList.contains('wx-link')
                ? re
                : re.closest('.wx-link');
              if (ge) {
                const ae = _t(ge),
                  Ee = ge.classList.contains('wx-left');
                if (ae && ae !== W.id) {
                  const Re = vt(W.start, Ee);
                  y.find(
                    (Ve) =>
                      Ve.target == ae && Ve.source == W.id && Ve.type === Re,
                  ) ||
                    h.exec('add-link', {
                      link: {
                        source: W.id,
                        target: ae,
                        type: Re,
                      },
                    });
                }
              }
            }
            $e(null), (Ce.current = null), (le.current = !0);
          }
          return;
        }
        const F = Se.current;
        if (F) {
          const V = Ht(F);
          F.ctrlKey
            ? V.forEach((W) => {
                h.exec('select-task', { id: W.id, toggle: !0, marquee: !0 });
              })
            : (T.length > 0 && h.exec('select-task', { id: null, marquee: !0 }),
              V.forEach((W, q) => {
                h.exec('select-task', {
                  id: W.id,
                  toggle: q > 0,
                  marquee: !0,
                });
              })),
            fe(null),
            (Se.current = null),
            et(),
            (le.current = !0);
          return;
        }
        if (ke) {
          const { ids: V, tasks: W, startX: q } = ke;
          De(null), et(), (le.current = !0);
          return;
        }
        if (ne.current) {
          const { dx: V, id: W, marker: q, value: re } = ne.current;
          (ne.current = null),
            typeof re < 'u' &&
              V &&
              h.exec('update-task', {
                id: W,
                task: { progress: re },
                inProgress: !1,
              }),
            q.classList.remove('wx-progress-in-drag'),
            (le.current = !0),
            et();
        } else if (ze) {
          const {
            id: V,
            mode: W,
            dx: q,
            l: re,
            w: ge,
            start: ae,
            segment: Ee,
            index: Re,
          } = ze;
          if ((Xe(null), ae)) {
            const Je = Math.round(q / z);
            if (!Je)
              h.exec('drag-task', {
                id: V,
                width: ge,
                left: re,
                inProgress: !1,
                ...(Ee && { segmentIndex: Re }),
              });
            else {
              let Ve = {},
                je = h.getTask(V);
              Ee && (je = je.segments[Re]);
              const wt = 1440 * 60 * 1e3,
                tt =
                  Je *
                  (Z === 'week'
                    ? 7
                    : Z === 'month'
                      ? 30
                      : Z === 'quarter'
                        ? 91
                        : Z === 'year'
                          ? 365
                          : 1) *
                  wt;
              W === 'move'
                ? ((Ve.start = new Date(je.start.getTime() + tt)),
                  (Ve.end = new Date(je.end.getTime() + tt)))
                : W === 'start'
                  ? ((Ve.start = new Date(je.start.getTime() + tt)),
                    (Ve.end = je.end))
                  : W === 'end' &&
                    ((Ve.start = je.start),
                    (Ve.end = new Date(je.end.getTime() + tt))),
                h.exec('update-task', {
                  id: V,
                  task: Ve,
                  ...(Ee && { segmentIndex: Re }),
                });
            }
            le.current = !0;
          }
          et();
        }
      },
      [h, et, ze, z, Z, vt, y],
    ),
    Lt = R(
      (k, F) => {
        const { clientX: V } = F;
        if (me.current && pe.current) {
          const W = me.current,
            q = V - W.clientX,
            re = F.clientY - W.clientY;
          if (!Q.current) {
            if (Math.abs(q) + Math.abs(re) < 5) return;
            Q.current = !0;
          }
          const ge = pe.current.getBoundingClientRect(),
            ae = { x: V - ge.left, y: F.clientY - ge.top };
          (Ae.current = ae), xe(ae);
          return;
        }
        if (c && pe.current) {
          const W = pe.current.getBoundingClientRect();
          te.current = V - W.left;
        }
        if (de && pe.current) {
          const W = pe.current.getBoundingClientRect();
          be((q) => (q ? { ...q, currentX: V - W.left } : null));
        }
        if (he) {
          const W = pe.current;
          if (!W) return;
          const q = W.getBoundingClientRect(),
            re = V - q.left,
            ge = F.clientY - q.top;
          fe((ae) => ({
            ...ae,
            currentX: re,
            currentY: ge,
          })),
            Se.current &&
              ((Se.current.currentX = re), (Se.current.currentY = ge));
          return;
        }
        if (!e)
          if (ne.current) {
            const { node: W, x: q, id: re } = ne.current,
              ge = (ne.current.dx = V - q),
              ae = Math.round((ge / W.offsetWidth) * 100);
            let Ee = ne.current.progress + ae;
            (ne.current.value = Ee = Math.min(Math.max(0, Ee), 100)),
              h.exec('update-task', {
                id: re,
                task: { progress: Ee },
                inProgress: !0,
              });
          } else if (ze) {
            qt(null);
            const {
                mode: W,
                l: q,
                w: re,
                x: ge,
                id: ae,
                start: Ee,
                segment: Re,
                index: Je,
              } = ze,
              Ve = h.getTask(ae),
              je = V - ge,
              wt = Math.round(z) || 1;
            if (
              (!Ee && Math.abs(je) < 20) ||
              (W === 'start' && re - je < wt) ||
              (W === 'end' && re + je < wt) ||
              (W === 'move' &&
                ((je < 0 && q + je < 0) || (je > 0 && q + re + je > oe))) ||
              ze.segment
            )
              return;
            const kt = { ...ze, dx: je };
            let tt, ht;
            if (
              (W === 'start'
                ? ((tt = q + je), (ht = re - je))
                : W === 'end'
                  ? ((tt = q), (ht = re + je))
                  : W === 'move' && ((tt = q + je), (ht = re)),
              h.exec('drag-task', {
                id: ae,
                width: ht,
                left: tt,
                inProgress: !0,
                start: Ee,
                ...(Re && { segmentIndex: Je }),
              }),
              !kt.start &&
                ((W === 'move' && Ve.$x == q) || (W !== 'move' && Ve.$w == re)))
            ) {
              (le.current = !0), mt();
              return;
            }
            (kt.start = !0), Xe(kt);
          } else {
            const W = st(k);
            if (W) {
              const q = h.getTask(Wt(W)),
                ge = st(k, 'data-segment') || W,
                ae = Kt(ge, F, q);
              ge.style.cursor = ae && !e ? 'col-resize' : 'pointer';
            }
          }
      },
      [h, e, ze, z, oe, Kt, qt, mt],
    ),
    rr = R(
      (k) => {
        Lt(k, k);
      },
      [Lt],
    ),
    L = R(
      (k) => {
        Pe
          ? (k.preventDefault(), Lt(k, k.touches[0]))
          : U.current && (clearTimeout(U.current), (U.current = null));
      },
      [Pe, Lt],
    ),
    ie = R(
      (k) => {
        mt(k);
      },
      [mt],
    ),
    we = R(
      (k) => {
        I(null),
          U.current && (clearTimeout(U.current), (U.current = null)),
          mt(k);
      },
      [mt],
    );
  j(
    () => (
      window.addEventListener('mouseup', ie),
      () => {
        window.removeEventListener('mouseup', ie);
      }
    ),
    [ie],
  );
  const Ye = R(
      (k) => {
        if (!e) {
          if (k.target.closest('[data-interactive]')) return;
          const F = _t(k.target);
          if (F && !k.target.classList.contains('wx-link')) {
            const V = _t(k.target, 'data-segment');
            h.exec('show-editor', {
              id: F,
              ...(V !== null && { segmentIndex: V }),
            });
          }
        }
      },
      [h, e],
    ),
    qe = R(() => {
      se && ($e(null), (Ce.current = null));
    }, [se]),
    Be = R(
      (k) => {
        if (le.current) {
          le.current = !1;
          return;
        }
        if (de && de.currentX != null) {
          const V = Ys(de.currentX, M);
          V && tr(V, de.tasks, de.parent), be(null);
          return;
        }
        if (k.target.closest('[data-interactive]')) return;
        const F = _t(k.target);
        if (F) {
          const V = k.target.classList;
          if (V.contains('wx-link')) {
            const W = V.contains('wx-left');
            if (!se) {
              const q = { id: F, start: W };
              $e(q), (Ce.current = q);
              return;
            }
            se.id !== F &&
              !At(F, W) &&
              h.exec('add-link', {
                link: {
                  source: se.id,
                  target: F,
                  type: vt(se.start, W),
                },
              }),
              $e(null),
              (Ce.current = null);
          } else if (V.contains('wx-delete-button-icon'))
            h.exec('delete-link', { id: ye }), Te(null);
          else {
            let W;
            const q = st(k, 'data-segment');
            q && (W = q.dataset.segment * 1),
              h.exec('select-task', {
                id: F,
                toggle: k.ctrlKey || k.metaKey,
                range: k.shiftKey,
                segmentIndex: W,
              });
          }
        }
        qe();
      },
      [h, se, b, We, At, vt, qe],
    ),
    Me = R((k) => {
      const F = {
        left: `${k.$x}px`,
        top: `${k.$y}px`,
        width: `${k.$w}px`,
        height: `${k.$h}px`,
      };
      return k.color && (F.backgroundColor = k.color), F;
    }, []),
    Qe = R(
      (k) => ({
        left: `${k.$x_base}px`,
        top: `${k.$y_base}px`,
        width: `${k.$w_base}px`,
        height: `${k.$h_base}px`,
      }),
      [],
    ),
    ct = R(
      (k) => {
        if (Pe || U.current) return k.preventDefault(), !1;
      },
      [Pe],
    ),
    ut = $(() => S.map((k) => k.id), [S]),
    Ze = R(
      (k) => {
        let F = ut.includes(k) ? k : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(k) || (F = `task ${F}`), F
        );
      },
      [ut],
    ),
    dt = R(
      (k) => {
        h.exec(k.action, k.data);
      },
      [h],
    ),
    Ct = R((k) => N && A.byId(k).$critical, [N, A]),
    Pt = R(
      (k) => {
        if (C?.auto) {
          const F = A.getSummaryId(k, !0),
            V = A.getSummaryId(se.id, !0);
          return (
            se?.id &&
            !(Array.isArray(F) ? F : [F]).includes(se.id) &&
            !(Array.isArray(V) ? V : [V]).includes(k)
          );
        }
        return se;
      },
      [C, A, se],
    );
  return /* @__PURE__ */ ee('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: {
      lineHeight: `${B.length ? B[0].$h : 0}px`,
    },
    ref: pe,
    onContextMenu: ct,
    onMouseDown: Cn,
    onMouseMove: rr,
    onTouchStart: nr,
    onTouchMove: L,
    onTouchEnd: we,
    onClick: Be,
    onDoubleClick: Ye,
    onDragStart: (k) => (k.preventDefault(), !1),
    children: [
      /* @__PURE__ */ p($u, {
        onSelectLink: qt,
        selectedLink: We,
        readonly: e,
        linkShape: u,
        linkGradient: d,
        linkStyle: f,
        linkBundling: g,
        multiTaskRows: r,
        taskPositions: H,
        cellHeight: D,
      }),
      se &&
        Ne &&
        (() => {
          const k = h.getTask(se.id);
          if (!k) return null;
          const F = se.start ? k.$x : k.$x + k.$w,
            V = k.$y + (k.$h || D) / 2;
          return /* @__PURE__ */ ee('svg', {
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
              /* @__PURE__ */ p('line', {
                x1: F,
                y1: V,
                x2: Ne.x,
                y2: Ne.y,
                stroke: 'var(--wx-gantt-link-color)',
                strokeWidth: 2,
                strokeDasharray: '6 3',
              }),
              /* @__PURE__ */ p('circle', {
                cx: Ne.x,
                cy: Ne.y,
                r: 4,
                fill: 'var(--wx-gantt-link-color)',
              }),
            ],
          });
        })(),
      B.map((k) => {
        if (k.$skip && k.$skip_baseline) return null;
        const F = E.has(k.id),
          V =
            `wx-bar wx-${Ze(k.type)}` +
            (Pe && ze && k.id === ze.id ? ' wx-touch' : '') +
            (se && se.id === k.id ? ' wx-selected' : '') +
            (Ct(k.id) ? ' wx-critical' : '') +
            (k.$reorder ? ' wx-reorder-task' : '') +
            (P && k.segments ? ' wx-split' : '') +
            (F ? ' wx-collision' : ''),
          W =
            'wx-link wx-left' +
            (se ? ' wx-visible' : '') +
            (!se || (!At(k.id, !0) && Pt(k.id)) ? ' wx-target' : '') +
            (se && se.id === k.id && se.start ? ' wx-selected' : '') +
            (Ct(k.id) ? ' wx-critical' : ''),
          q =
            'wx-link wx-right' +
            (se ? ' wx-visible' : '') +
            (!se || (!At(k.id, !1) && Pt(k.id)) ? ' wx-target' : '') +
            (se && se.id === k.id && !se.start ? ' wx-selected' : '') +
            (Ct(k.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ ee(
          fn,
          {
            children: [
              !k.$skip &&
                /* @__PURE__ */ ee('div', {
                  className: 'wx-GKbcLEGA ' + V,
                  style: Me(k),
                  'data-tooltip-id': k.id,
                  'data-id': k.id,
                  tabIndex: Oe === k.id ? 0 : -1,
                  children: [
                    e
                      ? null
                      : k.id === We?.target && We?.type[2] === 's'
                        ? /* @__PURE__ */ p(Mt, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ p('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ p('div', {
                            className: 'wx-GKbcLEGA ' + W,
                            children: /* @__PURE__ */ p('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    k.type !== 'milestone'
                      ? /* @__PURE__ */ ee(Ue, {
                          children: [
                            m && k.progress && !(P && k.segments)
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ p('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${k.progress}%` },
                                  }),
                                })
                              : null,
                            m &&
                            !e &&
                            !(P && k.segments) &&
                            !(k.type == 'summary' && O?.autoProgress)
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${k.progress}% - 10px)`,
                                  },
                                  children: k.progress,
                                })
                              : null,
                            t
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ p(t, {
                                    data: k,
                                    api: h,
                                    onAction: dt,
                                  }),
                                })
                              : P && k.segments
                                ? /* @__PURE__ */ p(Cu, {
                                    task: k,
                                    type: Ze(k.type),
                                  })
                                : /* @__PURE__ */ p('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: k.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ ee(Ue, {
                          children: [
                            /* @__PURE__ */ p('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            t
                              ? /* @__PURE__ */ p(t, {
                                  data: k,
                                  api: h,
                                  onAction: dt,
                                })
                              : /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: k.text,
                                }),
                          ],
                        }),
                    e
                      ? null
                      : k.id === We?.target && We?.type[2] === 'e'
                        ? /* @__PURE__ */ p(Mt, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ p('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ p('div', {
                            className: 'wx-GKbcLEGA ' + q,
                            children: /* @__PURE__ */ p('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    F &&
                      /* @__PURE__ */ p('div', {
                        className: 'wx-GKbcLEGA wx-collision-warning',
                        title:
                          'This task overlaps with another task in the same row',
                        children: '!',
                      }),
                    K &&
                      k.type === 'summary' &&
                      (() => {
                        const re = K.get(k.id),
                          ge = Math.floor(k.$x / z),
                          ae = Math.ceil((k.$x + k.$w) / z);
                        return /* @__PURE__ */ p('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from(
                            { length: ae - ge },
                            (Ee, Re) => {
                              const Je = ge + Re,
                                Ve = re?.get(Je) || 0;
                              return /* @__PURE__ */ p(
                                'span',
                                {
                                  className: `wx-GKbcLEGA wx-week-count${Ve === 0 ? ' wx-week-count-zero' : ''}`,
                                  style: {
                                    position: 'absolute',
                                    left: `${Je * z - k.$x}px`,
                                    width: `${z}px`,
                                    top: 0,
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  },
                                  children: Ve,
                                },
                                Je,
                              );
                            },
                          ),
                        });
                      })(),
                  ],
                }),
              _ && !k.$skip_baseline
                ? /* @__PURE__ */ p('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (k.type === 'milestone' ? ' wx-milestone' : ''),
                    style: Qe(k),
                  })
                : null,
            ],
          },
          k.id,
        );
      }),
      he &&
        (() => {
          const k = Math.min(he.startX, he.currentX),
            F = Math.min(he.startY, he.currentY),
            V = Math.abs(he.currentX - he.startX),
            W = Math.abs(he.currentY - he.startY);
          return /* @__PURE__ */ p('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${k}px`,
              top: `${F}px`,
              width: `${V}px`,
              height: `${W}px`,
            },
          });
        })(),
      de &&
        de.currentX != null &&
        de.tasks.map((k, F) => {
          const W =
              (Math.floor(de.currentX / z) + (k._startCellOffset || 0)) * z,
            q = k._originalWidth || z,
            re = k._originalHeight || D,
            ge = $t.get(k.row) ?? (k.$y || 0);
          return /* @__PURE__ */ p(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: W, top: ge, width: q, height: re },
              children: /* @__PURE__ */ p('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: k.$barText || k.text,
              }),
            },
            `preview-${F}`,
          );
        }),
    ],
  });
}
function Tu(n) {
  const { highlightTime: e, onScaleClick: t } = n,
    r = Ie(Et),
    s = ce(r, '_scales');
  return /* @__PURE__ */ p('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: s.width },
    children: (s?.rows || []).map((o, i) =>
      /* @__PURE__ */ p(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${o.height}px` },
          children: (o.cells || []).map((a, l) => {
            const c = e ? e(a.date, a.unit) : '',
              u = 'wx-cell ' + (a.css || '') + ' ' + (c || '');
            return /* @__PURE__ */ p(
              'div',
              {
                className: 'wx-ZkvhDKir ' + u,
                style: {
                  width: `${a.width}px`,
                  cursor: t ? 'pointer' : void 0,
                },
                onClick: t ? (d) => t(a.date, a.unit, d.nativeEvent) : void 0,
                children: a.value,
              },
              l,
            );
          }),
        },
        i,
      ),
    ),
  });
}
const Du = /* @__PURE__ */ new Map();
function Eu(n) {
  const e = Y(null),
    t = Y(0),
    r = Y(null),
    s = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()),
    t.current++,
    j(() => {
      if (s)
        return (
          cancelAnimationFrame(r.current),
          (r.current = requestAnimationFrame(() => {
            const o = {
              label: n,
              time: performance.now() - e.current,
              renders: t.current,
              timestamp: Date.now(),
            };
            Du.set(n, o),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: o }),
              );
          })),
          () => cancelAnimationFrame(r.current)
        );
    });
}
function Ru(n) {
  const {
      readonly: e,
      fullWidth: t,
      fullHeight: r,
      taskTemplate: s,
      cellBorders: o,
      highlightTime: i,
      onScaleClick: a,
      multiTaskRows: l = !1,
      rowMapping: c = null,
      rowHeightOverrides: u = null,
      allowTaskIntersection: d = !0,
      summaryBarCounts: f = !1,
      marqueeSelect: g = !1,
      copyPaste: m = !1,
      linkShape: h,
      linkGradient: x = !1,
      linkStyle: w,
      linkBundling: y = !1,
      showProgress: b = !0,
    } = n,
    v = Ie(Et),
    [M, S] = tn(v, '_selected'),
    _ = ce(v, 'scrollTop'),
    T = ce(v, 'cellHeight'),
    X = ce(v, 'cellWidth'),
    N = ce(v, '_scales'),
    A = ce(v, '_markers'),
    C = ce(v, '_scrollTask'),
    P = ce(v, 'zoom'),
    [O, G] = J(),
    D = Y(null),
    B = ce(v, '_tasks'),
    H = 1 + (N?.rows?.length || 0),
    { taskYPositions: z, rowHeightMap: Z } = $(() => {
      if (!l || !c || !B?.length)
        return { taskYPositions: null, rowHeightMap: null };
      const te = /* @__PURE__ */ new Map(),
        le = /* @__PURE__ */ new Map(),
        se = [];
      B.forEach((me) => {
        const Q = c.taskRows.get(me.id) ?? me.id;
        se.includes(Q) || se.push(Q);
      });
      const $e = /* @__PURE__ */ new Map();
      let Ce = 0;
      for (const me of se) {
        $e.set(me, Ce);
        const Q = (u && u[me]) || T;
        le.set(me, Q), (Ce += Q);
      }
      return (
        B.forEach((me) => {
          const Q = c.taskRows.get(me.id) ?? me.id;
          te.set(me.id, $e.get(Q) ?? 0);
        }),
        { taskYPositions: te, rowHeightMap: le }
      );
    }, [B, l, c, T, u]),
    E = $(() => {
      const te = [];
      return (
        M &&
          M.length &&
          T &&
          M.forEach((le) => {
            const se = z?.get(le.id) ?? le.$y;
            let $e = T;
            if (Z && c) {
              const Ce = c.taskRows.get(le.id) ?? le.id;
              $e = Z.get(Ce) ?? T;
            }
            te.push({ height: `${$e}px`, top: `${se - 3}px` });
          }),
        te
      );
    }, [S, T, z, Z, c]),
    K = $(() => Math.max(O || 0, r), [O, r]),
    he = $(() => {
      if (
        !u ||
        !l ||
        !c ||
        !B?.length ||
        !Object.values(u).some((se) => se !== T)
      )
        return null;
      const le = [];
      return (
        B.forEach((se) => {
          const $e = c.taskRows.get(se.id) ?? se.id;
          le.includes($e) || le.push($e);
        }),
        le.map((se) => ({
          id: se,
          height: u[se] || T,
        }))
      );
    }, [B, c, u, l, T]);
  j(() => {
    const te = D.current;
    te && typeof _ == 'number' && (te.scrollTop = l ? 0 : _);
  }, [_, l]);
  const fe = () => {
    Se();
  };
  function Se(te) {
    const le = D.current;
    if (!le) return;
    const se = {};
    (se.left = le.scrollLeft), v.exec('scroll-chart', se);
  }
  function ke() {
    const te = D.current,
      se = Math.ceil((O || 0) / (T || 1)) + 1,
      $e = Math.floor(((te && te.scrollTop) || 0) / (T || 1)),
      Ce = Math.max(0, $e - H),
      me = $e + se + H,
      Q = Ce * (T || 0);
    v.exec('render-data', {
      start: Ce,
      end: me,
      from: Q,
    });
  }
  j(() => {
    ke();
  }, [O, _]);
  const De = R(
    (te) => {
      if (!te) return;
      const { id: le, mode: se } = te;
      if (se.toString().indexOf('x') < 0) return;
      const $e = D.current;
      if (!$e) return;
      const { clientWidth: Ce } = $e,
        me = v.getTask(le);
      if (me.$x + me.$w < $e.scrollLeft)
        v.exec('scroll-chart', { left: me.$x - (X || 0) }),
          ($e.scrollLeft = me.$x - (X || 0));
      else if (me.$x >= Ce + $e.scrollLeft) {
        const Q = Ce < me.$w ? X || 0 : me.$w;
        v.exec('scroll-chart', { left: me.$x - Ce + Q }),
          ($e.scrollLeft = me.$x - Ce + Q);
      }
    },
    [v, X],
  );
  j(() => {
    De(C);
  }, [C]);
  function de(te) {
    if (P && (te.ctrlKey || te.metaKey)) {
      te.preventDefault();
      const le = D.current,
        se = -Math.sign(te.deltaY),
        $e = te.clientX - (le ? le.getBoundingClientRect().left : 0);
      v.exec('zoom-scale', {
        dir: se,
        offset: $e,
      });
    }
  }
  function be(te) {
    const le = i(te.date, te.unit);
    return le
      ? {
          css: le,
          width: te.width,
        }
      : null;
  }
  const _e = $(
      () =>
        N && (N.minUnit === 'hour' || N.minUnit === 'day') && i
          ? N.rows[N.rows.length - 1].cells.map(be)
          : null,
      [N, i],
    ),
    He = R(
      (te) => {
        (te.eventSource = 'chart'), v.exec('hotkey', te);
      },
      [v],
    );
  j(() => {
    const te = D.current;
    if (!te) return;
    const le = () => G(te.clientHeight);
    le();
    const se = new ResizeObserver(() => le());
    return (
      se.observe(te),
      () => {
        se.disconnect();
      }
    );
  }, [D.current]);
  const Fe = Y(null);
  return (
    j(() => {
      const te = D.current;
      if (te && !Fe.current)
        return (
          (Fe.current = Xr(te, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (le) => He(le),
          })),
          () => {
            Fe.current?.destroy(), (Fe.current = null);
          }
        );
    }, []),
    j(() => {
      const te = D.current;
      if (!te) return;
      const le = de;
      return (
        te.addEventListener('wheel', le),
        () => {
          te.removeEventListener('wheel', le);
        }
      );
    }, [de]),
    Eu('chart'),
    /* @__PURE__ */ ee('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: D,
      onScroll: fe,
      children: [
        /* @__PURE__ */ p(Tu, {
          highlightTime: i,
          onScaleClick: a,
          scales: N,
        }),
        A && A.length
          ? /* @__PURE__ */ p('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${K}px` },
              children: A.map((te, le) =>
                /* @__PURE__ */ p(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${te.css || ''}`,
                    style: { left: `${te.left}px` },
                    children: /* @__PURE__ */ p('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: te.text,
                    }),
                  },
                  le,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ ee('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${t}px`, height: `${K}px` },
          children: [
            _e
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: _e.map((te, le) =>
                    te
                      ? /* @__PURE__ */ p(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + te.css,
                            style: {
                              width: `${te.width}px`,
                              left: `${le * te.width}px`,
                            },
                          },
                          le,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ p(wu, { borders: o, rowLayout: he }),
            M && M.length
              ? M.map((te, le) =>
                  te.$y
                    ? /* @__PURE__ */ p(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': te.id,
                          style: E[le],
                        },
                        te.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ p(Mu, {
              readonly: e,
              taskTemplate: s,
              multiTaskRows: l,
              rowMapping: c,
              rowHeightOverrides: u,
              allowTaskIntersection: d,
              summaryBarCounts: f,
              marqueeSelect: g,
              copyPaste: m,
              linkShape: h,
              linkGradient: x,
              linkStyle: w,
              linkBundling: y,
              showProgress: b,
            }),
          ],
        }),
      ],
    })
  );
}
function Iu(n) {
  const {
      position: e = 'after',
      size: t = 4,
      dir: r = 'x',
      onMove: s,
      onDisplayChange: o,
      compactMode: i,
      containerWidth: a = 0,
      leftThreshold: l = 50,
      rightThreshold: c = 50,
    } = n,
    [u, d] = Ke(n.value ?? 0),
    [f, g] = Ke(n.display ?? 'all');
  function m(H) {
    let z = 0;
    e == 'center' ? (z = t / 2) : e == 'before' && (z = t);
    const Z = {
      size: [t + 'px', 'auto'],
      p: [H - z + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (r != 'x') for (let E in Z) Z[E] = Z[E].reverse();
    return Z;
  }
  const [h, x] = J(!1),
    [w, y] = J(null),
    b = Y(0),
    v = Y(),
    M = Y(),
    S = Y(f);
  j(() => {
    S.current = f;
  }, [f]),
    j(() => {
      w === null && u > 0 && y(u);
    }, [w, u]);
  function _(H) {
    return r == 'x' ? H.clientX : H.clientY;
  }
  const T = R(
      (H) => {
        const z = v.current + _(H) - b.current;
        d(z);
        let Z;
        z <= l ? (Z = 'chart') : a - z <= c ? (Z = 'grid') : (Z = 'all'),
          S.current !== Z && (g(Z), (S.current = Z)),
          M.current && clearTimeout(M.current),
          (M.current = setTimeout(() => s && s(z), 100));
      },
      [a, l, c, s],
    ),
    X = R(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        x(!1),
        window.removeEventListener('mousemove', T),
        window.removeEventListener('mouseup', X);
    }, [T]),
    N = $(
      () => (f !== 'all' ? 'auto' : r == 'x' ? 'ew-resize' : 'ns-resize'),
      [f, r],
    ),
    A = R(
      (H) => {
        (!i && (f === 'grid' || f === 'chart')) ||
          ((b.current = _(H)),
          (v.current = u),
          x(!0),
          (document.body.style.cursor = N),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', T),
          window.addEventListener('mouseup', X));
      },
      [N, T, X, u, i, f],
    );
  function C() {
    g('all'), w !== null && (d(w), s && s(w));
  }
  function P(H) {
    if (i) {
      const z = f === 'chart' ? 'grid' : 'chart';
      g(z), o(z);
    } else if (f === 'grid' || f === 'chart') C(), o('all');
    else {
      const z = H === 'left' ? 'chart' : 'grid';
      g(z), o(z);
    }
  }
  function O() {
    P('left');
  }
  function G() {
    P('right');
  }
  const D = $(() => m(u), [u, e, t, r]),
    B = [
      'wx-resizer',
      `wx-resizer-${r}`,
      `wx-resizer-display-${f}`,
      h ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ ee('div', {
    className: 'wx-pFykzMlT ' + B,
    onMouseDown: A,
    style: { width: D.size[0], height: D.size[1], cursor: N },
    children: [
      /* @__PURE__ */ ee('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ p('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ p('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: O,
            }),
          }),
          /* @__PURE__ */ p('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ p('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: G,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ p('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const Hu = 650;
function oi(n) {
  let e;
  function t() {
    (e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= Hu;
          n(i);
        }
    })),
      e.observe(document.body);
  }
  function r() {
    e && (e.disconnect(), (e = null));
  }
  return {
    observe: t,
    disconnect: r,
  };
}
const Au = (n, e, t, r) => n < r && e > t;
function pr(n) {
  const e = n.start instanceof Date ? n.start.getTime() : 0;
  if (!e) return null;
  let t;
  return (
    n.end instanceof Date
      ? (t = n.end.getTime())
      : typeof n.duration == 'number' && n.duration > 0
        ? (t = e + n.duration * 864e5)
        : (t = e),
    { start: e, end: t }
  );
}
function Lu(n, e) {
  const t = /* @__PURE__ */ new Map(),
    r = /* @__PURE__ */ new Map(),
    s = /* @__PURE__ */ new Map();
  return (
    n.forEach((o) => {
      if (o.type === 'summary') return;
      const i = e.taskRows.get(o.id) ?? o.id;
      s.has(i) || s.set(i, []), s.get(i).push(o);
    }),
    s.forEach((o, i) => {
      const a = [],
        l = [...o].sort((c, u) => {
          const d = pr(c),
            f = pr(u);
          return (d?.start ?? 0) - (f?.start ?? 0);
        });
      for (const c of l) {
        const u = pr(c);
        if (!u) {
          t.set(c.id, 0);
          continue;
        }
        let d = !1;
        for (let f = 0; f < a.length; f++)
          if (!a[f].some((m) => Au(u.start, u.end, m.start, m.end))) {
            a[f].push(u), t.set(c.id, f), (d = !0);
            break;
          }
        d || (a.push([u]), t.set(c.id, a.length - 1));
      }
      r.set(i, a.length);
    }),
    { taskLane: t, rowLaneCounts: r }
  );
}
function Pu(n, e, t) {
  const r = {};
  return (
    n.forEach((i, a) => {
      if (i <= 1) return;
      const l = 6 + i * t + (i - 1) * 4;
      l > e && (r[a] = l);
    }),
    r
  );
}
function Ou(n, e) {
  if (!n && !e) return null;
  const t = {};
  let r = !1;
  if (n) for (const [s, o] of Object.entries(n)) (t[s] = o), (r = !0);
  if (e)
    for (const [s, o] of Object.entries(e))
      t[s] !== void 0 ? (t[s] = Math.max(t[s], o)) : (t[s] = o), (r = !0);
  return r ? t : null;
}
function zu(n) {
  const {
      taskTemplate: e,
      readonly: t,
      cellBorders: r,
      highlightTime: s,
      onScaleClick: o,
      onTableAPIChange: i,
      multiTaskRows: a = !1,
      rowMapping: l = null,
      rowHeightOverrides: c = null,
      allowTaskIntersection: u = !0,
      summaryBarCounts: d = !1,
      marqueeSelect: f = !1,
      copyPaste: g = !1,
      linkShape: m,
      linkGradient: h = !1,
      linkStyle: x,
      linkBundling: w = !1,
      showProgress: y = !0,
    } = n,
    b = Ie(Et),
    v = ce(b, '_tasks'),
    M = ce(b, '_scales'),
    S = ce(b, 'cellHeight'),
    _ = ce(b, 'columns'),
    T = ce(b, '_scrollTask'),
    X = ce(b, 'undo'),
    N = $(() => {
      if (!a) return l;
      const ne = /* @__PURE__ */ new Map(),
        ye = /* @__PURE__ */ new Map();
      return (
        v.forEach((Te) => {
          const We = Te.row ?? Te.id;
          ye.set(Te.id, We),
            ne.has(We) || ne.set(We, []),
            ne.get(We).push(Te.id);
        }),
        { rowMap: ne, taskRows: ye }
      );
    }, [v, a, l]),
    A = $(() => {
      if (!a || !N || !v?.length) return c;
      const { rowLaneCounts: ne } = Lu(v, N),
        ye = S - 6,
        Te = Pu(ne, S, ye);
      return Ou(Te, c);
    }, [v, a, N, S, c]),
    [C, P] = J(!1);
  let [O, G] = J(0);
  const [D, B] = J(0),
    [H, z] = J(0),
    [Z, E] = J(void 0),
    [K, he] = J('all'),
    fe = Y(null),
    Se = R(
      (ne) => {
        P(
          (ye) => (
            ne !== ye &&
              (ne
                ? ((fe.current = K), K === 'all' && he('grid'))
                : (!fe.current || fe.current === 'all') && he('all')),
            ne
          ),
        );
      },
      [K],
    );
  j(() => {
    const ne = oi(Se);
    return (
      ne.observe(),
      () => {
        ne.disconnect();
      }
    );
  }, [Se]);
  const ke = $(() => {
    let ne;
    return (
      _.every((ye) => ye.width && !ye.flexgrow)
        ? (ne = _.reduce((ye, Te) => ye + parseInt(Te.width), 0))
        : C && K === 'chart'
          ? (ne = parseInt(_.find((ye) => ye.id === 'action')?.width) || 50)
          : (ne = 440),
      (O = ne),
      ne
    );
  }, [_, C, K]);
  j(() => {
    G(ke);
  }, [ke]);
  const De = $(() => (D ?? 0) - (Z ?? 0), [D, Z]),
    de = $(() => M.width, [M]),
    be = 14,
    _e = $(() => {
      let ne;
      if (!a || !N) ne = v.length * S;
      else {
        const ye = [];
        v.forEach((Te) => {
          const We = N.taskRows.get(Te.id) ?? Te.id;
          ye.includes(We) || ye.push(We);
        }),
          (ne = 0);
        for (const Te of ye) ne += (A && A[Te]) || S;
      }
      return ne + be;
    }, [v, S, a, N, A]),
    He = $(() => M.height + _e + De, [M, _e, De]),
    Fe = $(() => O + de, [O, de]),
    te = Y(null),
    le = Y(!1),
    se = Y(null);
  j(() => {
    const ne = () => {
      (le.current = !0),
        clearTimeout(se.current),
        (se.current = setTimeout(() => {
          le.current = !1;
        }, 300));
    };
    return (
      b.on('zoom-scale', ne),
      b.on('set-scale', ne),
      () => {
        clearTimeout(se.current);
      }
    );
  }, [b]);
  const $e = R(() => {
      Promise.resolve().then(() => {
        if (!le.current && (D ?? 0) > (Fe ?? 0)) {
          const ne = (D ?? 0) - O;
          b.exec('expand-scale', { minWidth: ne });
        }
      });
    }, [D, Fe, O, b]),
    Ce = Y($e);
  (Ce.current = $e),
    j(() => {
      let ne;
      return (
        te.current &&
          ((ne = new ResizeObserver(() => Ce.current())),
          ne.observe(te.current)),
        () => {
          ne && ne.disconnect();
        }
      );
    }, [te.current]);
  const me = Y(null),
    Q = Y(null),
    Ae = R(() => {
      const ne = me.current;
      ne &&
        b.exec('scroll-chart', {
          top: ne.scrollTop,
        });
    }, [b]),
    Ne = Y({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  j(() => {
    Ne.current = {
      rTasks: v,
      rScales: M,
      rCellHeight: S,
      scrollSize: De,
      ganttDiv: me.current,
      ganttHeight: H ?? 0,
    };
  }, [v, M, S, De, H]);
  const xe = R(
    (ne) => {
      if (!ne) return;
      const {
        rTasks: ye,
        rScales: Te,
        rCellHeight: We,
        scrollSize: Pe,
        ganttDiv: I,
        ganttHeight: U,
      } = Ne.current;
      if (!I) return;
      const { id: oe } = ne,
        ue = ye.findIndex((pe) => pe.id === oe);
      if (ue > -1) {
        const pe = U - Te.height,
          ve = ue * We,
          Oe = I.scrollTop;
        let Ge = null;
        ve < Oe ? (Ge = ve) : ve + We > Oe + pe && (Ge = ve - pe + We + Pe),
          Ge !== null &&
            (b.exec('scroll-chart', { top: Math.max(Ge, 0) }),
            (me.current.scrollTop = Math.max(Ge, 0)));
      }
    },
    [b],
  );
  j(() => {
    xe(T);
  }, [T]),
    j(() => {
      const ne = me.current,
        ye = Q.current;
      if (!ne || !ye) return;
      const Te = () => {
          ci(() => {
            z(ne.offsetHeight), B(ne.offsetWidth), E(ye.offsetWidth);
          });
        },
        We = new ResizeObserver(Te);
      return We.observe(ne), () => We.disconnect();
    }, [me.current]);
  const ze = Y(null),
    Xe = Y(null);
  return (
    j(() => {
      Xe.current && (Xe.current.destroy(), (Xe.current = null));
      const ne = ze.current;
      if (ne)
        return (
          (Xe.current = Xr(ne, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': X,
              'ctrl+y': X,
            },
            exec: (ye) => {
              ye.isInput || b.exec('hotkey', ye);
            },
          })),
          () => {
            Xe.current?.destroy(), (Xe.current = null);
          }
        );
    }, [X]),
    /* @__PURE__ */ p('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: me,
      onScroll: Ae,
      children: /* @__PURE__ */ p('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: He, width: '100%' },
        ref: Q,
        children: /* @__PURE__ */ p('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: H,
            width: Z,
          },
          children: /* @__PURE__ */ ee('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: ze,
            children: [
              _.length
                ? /* @__PURE__ */ ee(Ue, {
                    children: [
                      /* @__PURE__ */ p(mu, {
                        display: K,
                        compactMode: C,
                        columnWidth: ke,
                        width: O,
                        readonly: t,
                        fullHeight: _e,
                        onTableAPIChange: i,
                        multiTaskRows: a,
                        rowMapping: N,
                        rowHeightOverrides: A,
                      }),
                      /* @__PURE__ */ p(Iu, {
                        value: O,
                        display: K,
                        compactMode: C,
                        containerWidth: D,
                        onMove: (ne) => G(ne),
                        onDisplayChange: (ne) => he(ne),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ p('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: te,
                children: /* @__PURE__ */ p(Ru, {
                  readonly: t,
                  fullWidth: de,
                  fullHeight: _e,
                  taskTemplate: e,
                  cellBorders: r,
                  highlightTime: s,
                  onScaleClick: o,
                  multiTaskRows: a,
                  rowMapping: N,
                  rowHeightOverrides: A,
                  allowTaskIntersection: u,
                  summaryBarCounts: d,
                  marqueeSelect: f,
                  copyPaste: g,
                  linkShape: m,
                  linkGradient: h,
                  linkStyle: x,
                  linkBundling: w,
                  showProgress: y,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function Wu(n) {
  return {
    year: '%Y',
    quarter: `${n('Q')} %Q`,
    month: '%M',
    week: `${n('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function Fu(n, e) {
  return typeof n == 'function' ? n : Nt(n, e);
}
function ii(n, e) {
  return n.map(({ format: t, ...r }) => ({
    ...r,
    format: Fu(t, e),
  }));
}
function Yu(n, e) {
  const t = Wu(e);
  for (let r in t) t[r] = Nt(t[r], n);
  return t;
}
function Bu(n, e) {
  if (!n || !n.length) return n;
  const t = Nt('%d-%m-%Y', e);
  return n.map((r) =>
    r.template
      ? r
      : r.id === 'start' || r.id == 'end'
        ? {
            ...r,
            //store locale template for unscheduled tasks
            _template: (s) => t(s),
            template: (s) => t(s),
          }
        : r.id === 'duration'
          ? {
              ...r,
              _template: (s) => s,
              template: (s) => s,
            }
          : r,
  );
}
function Vu(n, e) {
  return n.levels
    ? {
        ...n,
        levels: n.levels.map((t) => ({
          ...t,
          scales: ii(t.scales, e),
        })),
      }
    : n;
}
const Uu = (n) =>
    n
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  Gu = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  ju = [],
  Ku = [],
  Xu = [],
  qu = [],
  Qu = { type: 'forward' },
  Zu = Ut(function (
    {
      taskTemplate: e = null,
      markers: t = ju,
      taskTypes: r = Jn,
      tasks: s = Ku,
      selected: o = Xu,
      activeTask: i = null,
      links: a = qu,
      scales: l = Gu,
      columns: c = Lo,
      start: u = null,
      end: d = null,
      lengthUnit: f = 'day',
      durationUnit: g = 'day',
      cellWidth: m = 100,
      cellHeight: h = 38,
      scaleHeight: x = 36,
      readonly: w = !1,
      cellBorders: y = 'full',
      zoom: b = !1,
      baselines: v = !1,
      highlightTime: M = null,
      onScaleClick: S = null,
      init: _ = null,
      autoScale: T = !0,
      unscheduledTasks: X = !1,
      criticalPath: N = null,
      schedule: A = Qu,
      projectStart: C = null,
      projectEnd: P = null,
      calendar: O = null,
      undo: G = !1,
      splitTasks: D = !1,
      multiTaskRows: B = !1,
      rowHeightOverrides: H = null,
      allowTaskIntersection: z = !0,
      summaryBarCounts: Z = !1,
      marqueeSelect: E = !1,
      copyPaste: K = !1,
      linkShape: he,
      linkGradient: fe = !1,
      linkStyle: Se,
      linkBundling: ke = !1,
      showProgress: De = !0,
      summary: de = null,
      _export: be = !1,
      ..._e
    },
    He,
  ) {
    const Fe = Y();
    Fe.current = _e;
    const te = $(() => new $l(Qs), []),
      le = $(() => ({ ...yn, ...qn }), []),
      se = Ie(ot.i18n),
      $e = $(() => (se ? se.extend(le, !0) : jt(le)), [se, le]),
      Ce = $(() => $e.getRaw().calendar, [$e]),
      me = $(() => {
        let Pe = {
          zoom: Vu(b, Ce),
          scales: ii(l, Ce),
          columns: Bu(c, Ce),
          links: Ho(a),
          cellWidth: m,
        };
        return (
          Pe.zoom &&
            (Pe = {
              ...Pe,
              ...ul(Pe.zoom, Yu(Ce, $e.getGroup('gantt')), Pe.scales, m),
            }),
          Pe
        );
      }, [b, l, c, a, m, Ce, $e]),
      Q = Y(null);
    Q.current !== s &&
      (be || Tr(s, { durationUnit: g, calendar: O }), (Q.current = s)),
      j(() => {
        be || Tr(s, { durationUnit: g, calendar: O });
      }, [s, g, O, D, be]);
    const Ae = $(() => {
        if (!B) return null;
        const Pe = /* @__PURE__ */ new Map(),
          I = /* @__PURE__ */ new Map(),
          U = (oe) => {
            oe.forEach((ue) => {
              const pe = ue.row ?? ue.id;
              I.set(ue.id, pe),
                Pe.has(pe) || Pe.set(pe, []),
                Pe.get(pe).push(ue.id),
                ue.data && ue.data.length > 0 && U(ue.data);
            });
          };
        return U(s), { rowMap: Pe, taskRows: I };
      }, [s, B]),
      Ne = $(() => te.in, [te]),
      xe = Y(null);
    xe.current === null &&
      ((xe.current = new so((Pe, I) => {
        const U = 'on' + Uu(Pe);
        Fe.current && Fe.current[U] && Fe.current[U](I);
      })),
      Ne.setNext(xe.current));
    const [ze, Xe] = J(null),
      ne = Y(null);
    ne.current = ze;
    const ye = $(
      () => ({
        getState: te.getState.bind(te),
        getReactiveState: te.getReactive.bind(te),
        getStores: () => ({ data: te }),
        exec: Ne.exec.bind(Ne),
        setNext: (Pe) => ((xe.current = xe.current.setNext(Pe)), xe.current),
        intercept: Ne.intercept.bind(Ne),
        on: Ne.on.bind(Ne),
        detach: Ne.detach.bind(Ne),
        getTask: te.getTask.bind(te),
        serialize: () => te.serialize(),
        getTable: (Pe) =>
          Pe
            ? new Promise((I) => setTimeout(() => I(ne.current), 1))
            : ne.current,
        getHistory: () => te.getHistory(),
      }),
      [te, Ne],
    );
    j(() => {
      const Pe = () => {
        const { zoom: I, scales: U } = ye.getState(),
          ue = I?.levels?.[I.level]?.scales?.[0]?.unit ?? U?.[0]?.unit;
        ue && ye.exec('scale-change', { level: I?.level, unit: ue });
      };
      ye.on('zoom-scale', Pe), ye.on('set-scale', Pe);
    }, [ye]),
      j(() => {
        ye.intercept('set-scale', ({ unit: Pe, date: I }) => {
          const { zoom: U } = ye.getState();
          if (!U || !U.levels) return !1;
          const oe = U.levels.findIndex((ve) =>
            ve.scales.some((Oe) => Oe.unit === Pe),
          );
          if (oe < 0) return !1;
          const ue = U.levels[oe];
          if (oe !== U.level) {
            const ve = Math.round((ue.minCellWidth + ue.maxCellWidth) / 2);
            ye.getStores().data.setState({
              scales: ue.scales,
              cellWidth: ve,
              _cellWidth: ve,
              zoom: { ...U, level: oe },
              ...(I ? { _scaleDate: I, _zoomOffset: 0 } : {}),
            });
          } else if (I) {
            const { _scales: ve, cellWidth: Oe } = ye.getState(),
              Ge = ve.diff(I, ve.start, ve.lengthUnit),
              et = Math.max(0, Math.round(Ge * Oe));
            ye.exec('scroll-chart', { left: et });
          }
          return !1;
        });
      }, [ye]),
      Gt(
        He,
        () => ({
          ...ye,
        }),
        [ye],
      );
    const Te = Y(0);
    j(() => {
      Te.current
        ? te.init({
            tasks: s,
            links: me.links,
            start: u,
            columns: me.columns,
            end: d,
            lengthUnit: f,
            cellWidth: me.cellWidth,
            cellHeight: h,
            scaleHeight: x,
            scales: me.scales,
            taskTypes: r,
            zoom: me.zoom,
            selected: o,
            activeTask: i,
            baselines: v,
            autoScale: T,
            unscheduledTasks: X,
            markers: t,
            durationUnit: g,
            criticalPath: N,
            schedule: A,
            projectStart: C,
            projectEnd: P,
            calendar: O,
            undo: G,
            _weekStart: Ce.weekStart,
            splitTasks: D,
            summary: de,
          })
        : _ && _(ye),
        Te.current++;
    }, [
      ye,
      _,
      s,
      me,
      u,
      d,
      f,
      h,
      x,
      r,
      o,
      i,
      v,
      T,
      X,
      t,
      g,
      N,
      A,
      C,
      P,
      O,
      G,
      Ce,
      D,
      de,
      te,
    ]),
      Te.current === 0 &&
        te.init({
          tasks: s,
          links: me.links,
          start: u,
          columns: me.columns,
          end: d,
          lengthUnit: f,
          cellWidth: me.cellWidth,
          cellHeight: h,
          scaleHeight: x,
          scales: me.scales,
          taskTypes: r,
          zoom: me.zoom,
          selected: o,
          activeTask: i,
          baselines: v,
          autoScale: T,
          unscheduledTasks: X,
          markers: t,
          durationUnit: g,
          criticalPath: N,
          schedule: A,
          projectStart: C,
          projectEnd: P,
          calendar: O,
          undo: G,
          _weekStart: Ce.weekStart,
          splitTasks: D,
          summary: de,
        });
    const We = $(
      () =>
        O
          ? (Pe, I) =>
              (I == 'day' && !O.getDayHours(Pe)) ||
              (I == 'hour' && !O.getDayHours(Pe))
                ? 'wx-weekend'
                : ''
          : M,
      [O, M],
    );
    return /* @__PURE__ */ p(ot.i18n.Provider, {
      value: $e,
      children: /* @__PURE__ */ p(Et.Provider, {
        value: ye,
        children: /* @__PURE__ */ p(zu, {
          taskTemplate: e,
          readonly: w,
          cellBorders: y,
          highlightTime: We,
          onScaleClick: S,
          onTableAPIChange: Xe,
          multiTaskRows: B,
          rowMapping: Ae,
          rowHeightOverrides: H,
          allowTaskIntersection: z,
          summaryBarCounts: Z,
          marqueeSelect: E,
          copyPaste: K,
          linkShape: he,
          linkGradient: fe,
          linkStyle: Se,
          linkBundling: ke,
          showProgress: De,
        }),
      }),
    });
  });
function Ju({ api: n = null, items: e = [] }) {
  const t = Ie(ot.i18n),
    r = $(() => t || jt(qn), [t]),
    s = $(() => r.getGroup('gantt'), [r]),
    o = bt(n, '_selected'),
    i = bt(n, 'undo'),
    a = bt(n, 'history'),
    l = bt(n, 'splitTasks'),
    c = ['undo', 'redo'],
    u = $(() => {
      const f = Er();
      return (e.length ? e : Er()).map((m) => {
        let h = { ...m, disabled: !1 };
        return (
          (h.handler = jr(f, h.id) ? (x) => Zt(n, x.id, null, s) : h.handler),
          h.text && (h.text = s(h.text)),
          h.menuText && (h.menuText = s(h.menuText)),
          h
        );
      });
    }, [e, n, s, i, l]),
    d = $(() => {
      const f = [];
      return (
        u.forEach((g) => {
          const m = g.id;
          if (m === 'add-task') f.push(g);
          else if (c.includes(m))
            c.includes(m) &&
              f.push({
                ...g,
                disabled: g.isDisabled(a),
              });
          else {
            if (!o?.length || !n) return;
            f.push({
              ...g,
              disabled:
                g.isDisabled && o.some((h) => g.isDisabled(h, n.getState())),
            });
          }
        }),
        f.filter((g, m) => {
          if (n && g.isHidden)
            return !o.some((h) => g.isHidden(h, n.getState()));
          if (g.comp === 'separator') {
            const h = f[m + 1];
            if (!h || h.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [n, o, a, u]);
  return t
    ? /* @__PURE__ */ p(Ir, { items: d })
    : /* @__PURE__ */ p(ot.i18n.Provider, {
        value: r,
        children: /* @__PURE__ */ p(Ir, { items: d }),
      });
}
const ed = Ut(function (
    {
      options: e = [],
      api: t = null,
      resolver: r = null,
      filter: s = null,
      at: o = 'point',
      children: i,
      onClick: a,
      css: l,
    },
    c,
  ) {
    const u = Y(null),
      d = Y(null),
      f = Ie(ot.i18n),
      g = $(() => f || jt({ ...qn, ...yn }), [f]),
      m = $(() => g.getGroup('gantt'), [g]),
      h = bt(t, 'taskTypes'),
      x = bt(t, 'selected'),
      w = bt(t, '_selected'),
      y = bt(t, 'splitTasks'),
      b = bt(t, 'summary'),
      v = $(
        () => ({
          splitTasks: y,
          taskTypes: h,
          summary: b,
        }),
        [y, h, b],
      ),
      M = $(() => Dr(v), [v]);
    j(() => {
      t &&
        (t.on('scroll-chart', () => {
          u.current && u.current.show && u.current.show();
        }),
        t.on('drag-task', () => {
          u.current && u.current.show && u.current.show();
        }));
    }, [t]);
    function S(G) {
      return G.map(
        (D) => (
          (D = { ...D }),
          D.text && (D.text = m(D.text)),
          D.subtext && (D.subtext = m(D.subtext)),
          D.data && (D.data = S(D.data)),
          D
        ),
      );
    }
    function _() {
      const G = e.length ? e : Dr(v);
      return S(G);
    }
    const T = $(() => _(), [t, e, v, m]),
      X = $(() => (w && w.length ? w : []), [w]),
      N = R(
        (G, D) => {
          let B = G ? t?.getTask(G) : null;
          if (r) {
            const H = r(G, D);
            B = H === !0 ? B : H;
          }
          if (B) {
            const H = _t(D.target, 'data-segment');
            H !== null
              ? (d.current = { id: B.id, segmentIndex: H })
              : (d.current = B.id),
              (!Array.isArray(x) || !x.includes(B.id)) &&
                t &&
                t.exec &&
                t.exec('select-task', { id: B.id });
          }
          return B;
        },
        [t, r, x],
      ),
      A = R(
        (G) => {
          const D = G.action;
          D && (jr(M, D.id) && Zt(t, D.id, d.current, m), a && a(G));
        },
        [t, m, a, M],
      ),
      C = R(
        (G, D) => {
          const B = X.length ? X : D ? [D] : [];
          let H = s ? B.every((z) => s(G, z)) : !0;
          if (
            H &&
            (G.isHidden &&
              (H = !B.some((z) => G.isHidden(z, t.getState(), d.current))),
            G.isDisabled)
          ) {
            const z = B.some((Z) => G.isDisabled(Z, t.getState(), d.current));
            G.disabled = z;
          }
          return H;
        },
        [s, X, t],
      );
    Gt(c, () => ({
      show: (G, D) => {
        u.current && u.current.show && u.current.show(G, D);
      },
    }));
    const P = R((G) => {
        u.current && u.current.show && u.current.show(G);
      }, []),
      O = /* @__PURE__ */ ee(Ue, {
        children: [
          /* @__PURE__ */ p(Zo, {
            filter: C,
            options: T,
            dataKey: 'id',
            resolver: N,
            onClick: A,
            at: o,
            ref: u,
            css: l,
          }),
          /* @__PURE__ */ p('span', {
            onContextMenu: P,
            'data-menu-ignore': 'true',
            children: typeof i == 'function' ? i() : i,
          }),
        ],
      });
    if (!f && ot.i18n?.Provider) {
      const G = ot.i18n.Provider;
      return /* @__PURE__ */ p(G, { value: g, children: O });
    }
    return O;
  }),
  Ar = {};
function Bs(n) {
  return typeof n < 'u' ? Ar[n] || n : Ar.text;
}
function pt(n, e) {
  Ar[n] = e;
}
const td = {
  editor: {},
};
function mr(n) {
  const {
      editors: e,
      data: t,
      css: r = '',
      errors: s,
      focus: o = !1,
      onClick: i,
      children: a,
      onChange: l,
    } = n,
    c = Y(null);
  j(() => {
    if (o) {
      const g = document.activeElement;
      if (g && c.current && c.current.contains(g)) return;
      const m = c.current
        ? c.current.querySelector(
            'input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
          )
        : null;
      m &&
        setTimeout(() => {
          typeof m.select == 'function' && m.select(),
            typeof m.focus == 'function' && m.focus();
        }, 300);
    }
  }, []);
  const u = Ie(ot.i18n),
    d = $(() => u.getGroup('editor'), [u]),
    f = $(
      () =>
        e.config[0].comp === 'readonly' &&
        e.config.every((g) => !Object.keys(t).includes(g.key)),
      [e, t],
    );
  return /* @__PURE__ */ ee('div', {
    className: 'wx-s2aE1xdZ wx-sections ' + r,
    ref: c,
    children: [
      a,
      f
        ? /* @__PURE__ */ p('div', {
            className: 'wx-s2aE1xdZ wx-overlay',
            children: d('No data'),
          })
        : null,
      e.config.map((g) => {
        if (!g.hidden) {
          const { key: m, onChange: h, ...x } = g;
          if (g.comp === 'readonly' || g.comp === 'section') {
            const w = Bs(g.comp);
            return /* @__PURE__ */ p(
              w,
              {
                fieldKey: m,
                label: g.label,
                value: t[m],
                ...x,
                onClick: i,
              },
              m,
            );
          } else {
            const w = Bs(g.comp);
            return /* @__PURE__ */ ee(
              'div',
              {
                children: [
                  /* @__PURE__ */ p(gn, {
                    label: g.labelTemplate
                      ? g.labelTemplate(t[m])
                      : (g.label ?? ''),
                    required: g.required,
                    children: /* @__PURE__ */ p(
                      w,
                      {
                        fieldKey: m,
                        ...x,
                        onChange:
                          h ||
                          ((y) => {
                            l &&
                              l({
                                value: y.value,
                                key: m,
                                input: y.input,
                              });
                          }),
                        label: void 0,
                        error: s && s[m],
                        value: t[m],
                      },
                      m,
                    ),
                  }),
                  s && s[m] && g.validationMessage
                    ? /* @__PURE__ */ p('div', {
                        className: 'wx-s2aE1xdZ wx-message',
                        children: g.validationMessage,
                      })
                    : null,
                ],
              },
              m,
            );
          }
        }
        return null;
      }),
    ],
  });
}
function nd(n) {
  if (typeof n == 'string' && n.includes('.')) {
    const e = n.split('.');
    return (t) => {
      let r = t;
      return (
        e.forEach((s) => {
          r = r[s];
        }),
        r
      );
    };
  }
  return (e) => e[n];
}
function rd(n) {
  if (typeof n == 'string' && n.includes('.')) {
    const e = n.split('.');
    return (t, r) => {
      let s = t;
      e.forEach((o, i) => {
        i === e.length - 1 ? (s[o] = r) : (s = s[o]);
      });
    };
  }
  return (e, t) => (e[n] = t);
}
function sd(n) {
  const e = n.map((i) => {
      const a = { ...i };
      return (
        i.config && Object.assign(a, i.config),
        (a.key = i.key || ca()),
        (a.setter = i.setter || rd(i.key)),
        (a.getter = i.getter || nd(i.key)),
        a
      );
    }),
    t = (i) => {
      const a = {};
      return (
        e.forEach((l) => {
          l.comp !== 'section' &&
            (l.getter ? (a[l.key] = l.getter(i)) : (a[l.key] = i[l.key]));
        }),
        a
      );
    },
    r = (i, a, l) => (
      (l.length ? l.map((c) => e.find((u) => u.key === c)) : e).forEach((c) => {
        c.setter ? c.setter(i, a[c.key]) : (i[c.key] = a[c.key]);
      }),
      i
    ),
    s = (i, a) => {
      const l = t(i),
        c = [];
      return (
        e.forEach((u) => {
          const d = l[u.key],
            f = a[u.key];
          !Qn(d, f) && (d !== void 0 || f) && c.push(u.key);
        }),
        c
      );
    },
    o = (i, a, l) => {
      let c = 0;
      const u = {};
      return (
        (a?.length ? a.map((d) => e.find((f) => f.key === d)) : e).forEach(
          (d) => {
            d.required && !i[d.key]
              ? ((u[d.key] = {
                  errorType: 'required',
                }),
                (d.validationMessage =
                  d.validationMessage ?? l('This field is required')),
                c++)
              : d.validation &&
                !d.validation(i[d.key]) &&
                ((u[d.key] = {
                  errorType: 'validation',
                }),
                (d.validationMessage =
                  d.validationMessage ?? l('Invalid value')),
                c++);
          },
        ),
        c > 0 ? u : null
      );
    };
  return {
    config: e.filter((i) => i.comp !== 'hidden'),
    getValues: t,
    setValues: r,
    diff: s,
    validateValues: o,
  };
}
function od({
  values: n,
  items: e,
  css: t,
  activeBatch: r,
  autoSave: s,
  focus: o,
  readonly: i,
  topBar: a = !0,
  bottomBar: l = !0,
  layout: c = 'default',
  placement: u = 'inline',
  view: d,
  children: f,
  onChange: g,
  onSave: m,
  onAction: h,
  onValidation: x,
  hotkeys: w,
}) {
  const y = Ie(ot.i18n).getGroup('editor'),
    [b, v] = Ke(n),
    [M, S] = J(null),
    _ = $(() => {
      const E = sd(e);
      M &&
        E.config.forEach((fe) => {
          fe.comp === 'section' &&
            fe.key === M &&
            (fe.sectionMode === 'accordion'
              ? fe.activeSection ||
                (E.config.forEach((Se) => {
                  Se.comp === 'section' &&
                    Se.key !== fe.key &&
                    (Se.activeSection = !1);
                }),
                (fe.activeSection = !0))
              : (fe.activeSection = !fe.activeSection));
        });
      let K = /* @__PURE__ */ new Set(),
        he = null;
      return (
        E.config.forEach((fe) => {
          fe.sectionMode === 'exclusive' && fe.activeSection && (he = fe.key),
            fe.activeSection && K.add(fe.key);
        }),
        E.config.forEach((fe) => {
          fe.hidden =
            fe.hidden ||
            (r && r !== fe.batch) ||
            (he && fe.key != he && fe.section !== he) ||
            (fe.section && !K.has(fe.section));
        }),
        i
          ? {
              ...E,
              config: E.config.map((fe) => ({ ...fe, comp: 'readonly' })),
              diff: () => [],
            }
          : E
      );
    }, [e, M, r, i]),
    [T, X] = J({}),
    [N, A] = J({}),
    C = b;
  j(() => {
    b !== void 0 && (X(Wn(b)), A(Wn(b)), C.errors && (C.errors = D()));
  }, [b]);
  const [P, O] = J([]);
  j(() => {
    b && O([]);
  }, [b]);
  function G(E) {
    return [...new Set(E)];
  }
  function D(E) {
    const K = _.validateValues(T, E, y);
    return Qn(K, C.errors) || (x && x({ errors: K, values: T })), K;
  }
  function B(E, K) {
    if (s && !C.errors) {
      const he = _.setValues(b, K ?? N, E);
      v(he), m && m({ changes: E, values: he });
    } else O(E);
  }
  function H({ value: E, key: K, input: he }) {
    let fe = { ...(N || {}), [K]: E };
    const Se = {
      key: K,
      value: E,
      update: fe,
    };
    if ((he && (Se.input = he), g && g(Se), !b)) return;
    (fe = Se.update), A(fe);
    const ke = _.diff(b, fe),
      De = _.setValues({ ...(T || {}) }, fe, G([...ke, K]));
    if ((X(De), ke.length)) {
      const de = s ? [] : G([...ke, ...Object.keys(C.errors ?? {}), K]);
      (C.errors = D(de)), B(ke, fe);
    } else {
      const de = Object.keys(C.errors ?? {});
      de.length && (C.errors = D(de)), O([]);
    }
  }
  function z() {
    if (P.length && (s || (C.errors = D()), !C.errors)) {
      m &&
        m({
          changes: P,
          values: T,
        });
      const E = _.setValues(b, N, P);
      v(E), O([]), v({ ...T });
    }
  }
  function Z({ item: E }) {
    E.id === 'save' ? z() : E.id === 'toggle-section' && S(E.key),
      h && h({ item: E, values: T, changes: P });
  }
  return /* @__PURE__ */ p(d, {
    topBar: a,
    bottomBar: l,
    placement: u,
    layout: c,
    readonly: i,
    autoSave: s,
    css: t,
    data: N,
    editors: _,
    focus: o,
    hotkeys: w,
    errors: C.errors,
    onClick: Z,
    onKeyDown: Z,
    onChange: H,
    children: f,
  });
}
function id(n) {
  const {
      editors: e,
      data: t,
      layout: r,
      errors: s,
      focus: o,
      onClick: i,
      onChange: a,
    } = n,
    l = $(() => {
      let c = [];
      if (
        r === 'columns' &&
        ((c = [
          { ...e, config: [] },
          { ...e, config: [] },
        ]),
        e.config.forEach((u) => {
          const d = u.column === 'left' ? 0 : 1;
          c[d].config.push(u);
        }),
        c[0].config.length)
      ) {
        const u = c[0].config[0];
        u.comp === 'text' &&
          (c[0][0] = {
            ...u,
            css: 'title',
            label: '',
          });
      }
      return c;
    }, [r, e]);
  return r === 'columns'
    ? /* @__PURE__ */ ee('div', {
        className: 'wx-bNrSbszs wx-cols',
        children: [
          /* @__PURE__ */ p('div', {
            className: 'wx-bNrSbszs wx-left',
            children: /* @__PURE__ */ p(mr, {
              editors: l[0],
              data: t,
              errors: s,
              onClick: i,
              onChange: a,
            }),
          }),
          /* @__PURE__ */ p('div', {
            className: 'wx-bNrSbszs wx-right',
            children: /* @__PURE__ */ p(mr, {
              editors: l[1],
              data: t,
              focus: o,
              errors: s,
              onClick: i,
              onChange: a,
            }),
          }),
        ],
      })
    : /* @__PURE__ */ p(mr, {
        editors: e,
        data: t,
        focus: o,
        errors: s,
        onClick: i,
        onChange: a,
      });
}
function Vs({
  items: n,
  values: e = null,
  top: t = !0,
  onClick: r,
  onChange: s,
}) {
  const o = R(
    ({ item: i, value: a }) => {
      s && s({ key: i.key, value: a });
    },
    [s],
  );
  return n.length
    ? /* @__PURE__ */ p('div', {
        className: `wx-66OW1j0R wx-editor-toolbar ${t ? 'wx-topbar' : 'wx-bottom'}`,
        children: /* @__PURE__ */ p(Ir, {
          items: n,
          values: e,
          onClick: r,
          onChange: o,
        }),
      })
    : null;
}
const un = () => ({ comp: 'spacer' }),
  wr = (n) => ({
    comp: 'button',
    text: n('Cancel'),
    id: 'cancel',
  }),
  xr = (n) => ({
    type: 'primary',
    comp: 'button',
    text: n('Save'),
    id: 'save',
  }),
  Us = () => ({
    comp: 'icon',
    icon: 'wxi-close',
    id: 'close',
  });
function yr(n) {
  const {
      data: e,
      editors: t,
      focus: r,
      css: s,
      topBar: o,
      bottomBar: i,
      layout: a,
      placement: l,
      errors: c,
      readonly: u,
      autoSave: d,
      children: f,
      onClick: g,
      onKeyDown: m,
      onChange: h,
      hotkeys: x,
    } = n,
    w = Ie(ot.i18n),
    y = $(() => w.getGroup('editor'), [w]),
    b = $(() => o === !0 && i === !0, [o, i]),
    v = $(() => {
      let N = o && o.items ? o.items.map((A) => ({ ...A })) : [];
      return (
        b &&
          (u
            ? (N = [un(), Us()])
            : (d
                ? (N = [un(), Us()])
                : l !== 'modal' && (N = [un(), wr(y), xr(y)]),
              a === 'columns' && !N.length && (N = [un(), xr(y), wr(y)]))),
        N
      );
    }, [o, b, u, d, l, a, y]),
    M = $(() => {
      let N = i && i.items ? i.items.map((A) => ({ ...A })) : [];
      return (
        b &&
          (u ||
            (l === 'modal' && !d && (N = [un(), xr(y), wr(y)]),
            a === 'columns' && v.length && (N = []))),
        N
      );
    }, [i, b, u, l, d, a, v, y]),
    S = $(() => [...v, ...M], [v, M]),
    _ = Y(null),
    T = Y(null);
  T.current = (N, ...A) => {
    const C = S.findIndex((G) => A.includes(G.id));
    if (C === -1) return !1;
    const P = N.target,
      O = S[C];
    (N.key == 'Escape' &&
      (P.closest('.wx-combo') ||
        P.closest('.wx-multicombo') ||
        P.closest('.wx-richselect'))) ||
      (N.key == 'Delete' &&
        (P.tagName === 'INPUT' || P.tagName === 'TEXTAREA')) ||
      (N.preventDefault(), m && m({ item: O }));
  };
  const X = $(
    () =>
      x === !1
        ? {}
        : {
            'ctrl+s': (N) => T.current(N, 'save'),
            escape: (N) => T.current(N, 'cancel', 'close'),
            'ctrl+d': (N) => T.current(N, 'delete'),
            ...(x || {}),
          },
    [x],
  );
  return (
    Ci(X, _),
    /* @__PURE__ */ ee('div', {
      className: s ? 'wx-85HDaNoA ' + s : 'wx-85HDaNoA',
      ref: _,
      children: [
        /* @__PURE__ */ p(Vs, {
          ...(o && typeof o == 'object' ? o : {}),
          items: v,
          values: e,
          onClick: g,
          onChange: h,
        }),
        /* @__PURE__ */ ee('div', {
          className: `wx-85HDaNoA wx-content${a === 'columns' ? ' wx-layout-columns' : ''}`,
          children: [
            f,
            /* @__PURE__ */ p(id, {
              editors: t,
              layout: a,
              data: e,
              focus: r,
              errors: c,
              onClick: g,
              onChange: h,
            }),
            /* @__PURE__ */ p(Vs, {
              ...(i && typeof i == 'object' ? i : {}),
              items: M,
              values: e,
              top: !1,
              onClick: g,
              onChange: h,
            }),
          ],
        }),
      ],
    })
  );
}
function ad(n) {
  const { css: e, onClick: t, placement: r, ...s } = n;
  function o() {
    t && t({ item: { id: 'close' } });
  }
  return r === 'modal'
    ? /* @__PURE__ */ p(sa, {
        children: /* @__PURE__ */ p(yr, {
          css: `wx-panel ${e}`,
          onClick: t,
          placement: r,
          ...s,
        }),
      })
    : r === 'sidebar'
      ? /* @__PURE__ */ p(oa, {
          onCancel: o,
          children: /* @__PURE__ */ p(yr, {
            css: `wx-panel ${e}`,
            onClick: t,
            placement: r,
            ...s,
          }),
        })
      : /* @__PURE__ */ p(yr, {
          css: `wx-inline-form ${e}`,
          onClick: t,
          placement: r,
          ...s,
        });
}
function ld(n) {
  const {
      values: e = {},
      items: t = [],
      css: r = '',
      activeBatch: s = null,
      topBar: o = !0,
      bottomBar: i = !0,
      focus: a = !1,
      autoSave: l = !1,
      layout: c = 'default',
      readonly: u = !1,
      placement: d = 'inline',
      children: f,
      ...g
    } = n,
    m = Object.keys(g).reduce((h, x) => {
      if (/^on[a-z]/.test(x)) {
        const w = 'on' + x.charAt(2).toUpperCase() + x.slice(3);
        w in g ? (h[x] = g[x]) : (h[w] = g[x]);
      } else h[x] = g[x];
      return h;
    }, {});
  return /* @__PURE__ */ p(Xn, {
    words: td,
    optional: !0,
    children: /* @__PURE__ */ p(od, {
      view: ad,
      values: e,
      items: t,
      css: r,
      activeBatch: s,
      topBar: o,
      bottomBar: i,
      focus: a,
      autoSave: l,
      layout: c,
      readonly: u,
      placement: d,
      ...m,
      children: f,
    }),
  });
}
function cd({ value: n, options: e, label: t }) {
  const r = Ie(ot.i18n).getGroup('editor'),
    s = $(() => {
      let o = n;
      if ((typeof n == 'boolean' && (o = r(n ? 'Yes' : 'No')), e)) {
        const i = e.find((a) => a.id === n);
        i && (o = i.label);
      }
      return o;
    }, [n, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(gn, { label: t, children: s }) : null;
}
function ud({ fieldKey: n, label: e, activeSection: t, onClick: r }) {
  return /* @__PURE__ */ ee('div', {
    className: `wx-OmgQq65I wx-section${t ? ' wx-section-active' : ''}`,
    onClick: () =>
      r &&
      r({
        item: { id: 'toggle-section', key: t ? null : n },
      }),
    children: [
      /* @__PURE__ */ p('h3', { children: e }),
      /* @__PURE__ */ p('i', {
        className: `wx-OmgQq65I wxi-angle-${t ? 'down' : 'right'} wx-icon`,
      }),
    ],
  });
}
pt('text', bn);
pt('textarea', Ri);
pt('checkbox', Ii);
pt('readonly', cd);
pt('section', ud);
Lr(lt);
function dd({ api: n, autoSave: e, onLinksChange: t }) {
  const s = Ie(ot.i18n).getGroup('gantt'),
    o = ce(n, 'activeTask'),
    i = ce(n, '_activeTask'),
    a = ce(n, '_links'),
    l = ce(n, 'schedule'),
    c = ce(n, 'unscheduledTasks'),
    [u, d] = J();
  function f() {
    if (o) {
      const x = a
          .filter((y) => y.target == o)
          .map((y) => ({ link: y, task: n.getTask(y.source) })),
        w = a
          .filter((y) => y.source == o)
          .map((y) => ({ link: y, task: n.getTask(y.target) }));
      return [
        { title: s('Predecessors'), data: x },
        { title: s('Successors'), data: w },
      ];
    }
  }
  j(() => {
    d(f());
  }, [o, a]);
  const g = $(
    () => [
      { id: 'e2s', label: s('End-to-start') },
      { id: 's2s', label: s('Start-to-start') },
      { id: 'e2e', label: s('End-to-end') },
      { id: 's2e', label: s('Start-to-end') },
    ],
    [s],
  );
  function m(x) {
    e
      ? n.exec('delete-link', { id: x })
      : (d((w) =>
          (w || []).map((y) => ({
            ...y,
            data: y.data.filter((b) => b.link.id !== x),
          })),
        ),
        t &&
          t({
            id: x,
            action: 'delete-link',
            data: { id: x },
          }));
  }
  function h(x, w) {
    e
      ? n.exec('update-link', {
          id: x,
          link: w,
        })
      : (d((y) =>
          (y || []).map((b) => ({
            ...b,
            data: b.data.map((v) =>
              v.link.id === x ? { ...v, link: { ...v.link, ...w } } : v,
            ),
          })),
        ),
        t &&
          t({
            id: x,
            action: 'update-link',
            data: {
              id: x,
              link: w,
            },
          }));
  }
  return /* @__PURE__ */ p(Ue, {
    children: (u || []).map((x, w) =>
      x.data.length
        ? /* @__PURE__ */ p(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ p(ot.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ p(gn, {
                  label: x.title,
                  position: 'top',
                  children: /* @__PURE__ */ p('table', {
                    children: /* @__PURE__ */ p('tbody', {
                      children: x.data.map((y) =>
                        /* @__PURE__ */ ee(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ p('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ p('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: y.task.text || '',
                                }),
                              }),
                              l?.auto && y.link.type === 'e2s'
                                ? /* @__PURE__ */ p('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ p(bn, {
                                      type: 'number',
                                      placeholder: s('Lag'),
                                      value: y.link.lag,
                                      disabled: c && i?.unscheduled,
                                      onChange: (b) => {
                                        b.input ||
                                          h(y.link.id, { lag: b.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ p('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ p('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ p(Ai, {
                                    value: y.link.type,
                                    placeholder: s('Select link type'),
                                    options: g,
                                    onChange: (b) =>
                                      h(y.link.id, { type: b.value }),
                                    children: ({ option: b }) => b.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ p('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ p('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => m(y.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          y.link.id,
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
function fd(n) {
  const { value: e, time: t, format: r, onchange: s, onChange: o, ...i } = n,
    a = o ?? s;
  function l(c) {
    const u = new Date(c.value);
    u.setHours(e.getHours()),
      u.setMinutes(e.getMinutes()),
      a && a({ value: u });
  }
  return /* @__PURE__ */ ee('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ p(Qi, {
        ...i,
        value: e,
        onChange: l,
        format: r,
        buttons: ['today'],
        clear: !1,
      }),
      t ? /* @__PURE__ */ p(ra, { value: e, onChange: a, format: r }) : null,
    ],
  });
}
pt('select', eo);
pt('date', fd);
pt('twostate', to);
pt('slider', br);
pt('counter', Zi);
pt('links', dd);
function hd({
  api: n,
  items: e = [],
  css: t = '',
  layout: r = 'default',
  readonly: s = !1,
  placement: o = 'sidebar',
  bottomBar: i = !0,
  topBar: a = !0,
  autoSave: l = !0,
  focus: c = !1,
  hotkeys: u = {},
}) {
  const d = Ie(ot.i18n),
    f = $(() => d || jt({ ...qn, ...yn }), [d]),
    g = $(() => f.getGroup('gantt'), [f]),
    m = f.getRaw(),
    h = $(() => {
      const Q = m.gantt?.dateFormat || m.formats?.dateFormat;
      return Nt(Q, m.calendar);
    }, [m]),
    x = $(() => {
      if (a === !0 && !s) {
        const Q = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: g('Delete'),
            id: 'delete',
          },
        ];
        return l
          ? { items: Q }
          : {
              items: [
                ...Q,
                {
                  comp: 'button',
                  type: 'primary',
                  text: g('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return a;
    }, [a, s, l, g]),
    [w, y] = J(!1),
    b = $(() => (w ? 'wx-full-screen' : ''), [w]),
    v = R((Q) => {
      y(Q);
    }, []);
  j(() => {
    const Q = oi(v);
    return (
      Q.observe(),
      () => {
        Q.disconnect();
      }
    );
  }, [v]);
  const M = ce(n, '_activeTask'),
    S = ce(n, 'activeTask'),
    _ = ce(n, 'unscheduledTasks'),
    T = ce(n, 'summary'),
    X = ce(n, 'links'),
    N = ce(n, 'splitTasks'),
    A = $(() => N && S?.segmentIndex, [N, S]),
    C = $(() => A || A === 0, [A]),
    P = ce(n, 'taskTypes'),
    O = $(() => Fo({ taskTypes: P }), [_, T, P]),
    G = ce(n, 'undo'),
    [D, B] = J({}),
    [H, z] = J(null),
    [Z, E] = J(),
    [K, he] = J(null),
    fe = $(() => {
      if (!M) return null;
      let Q;
      if ((C && M.segments ? (Q = { ...M.segments[A] }) : (Q = { ...M }), s)) {
        let Ae = { parent: Q.parent };
        return (
          O.forEach(({ key: Ne, comp: xe }) => {
            if (xe !== 'links') {
              const ze = Q[Ne];
              xe === 'date' && ze instanceof Date
                ? (Ae[Ne] = h(ze))
                : xe === 'slider' && Ne === 'progress'
                  ? (Ae[Ne] = `${ze}%`)
                  : (Ae[Ne] = ze);
            }
          }),
          Ae
        );
      }
      return Q || null;
    }, [M, C, A, s, O, h]);
  j(() => {
    E(fe);
  }, [fe]),
    j(() => {
      B({}), he(null), z(null);
    }, [S]);
  function Se(Q, Ae) {
    return Q.map((Ne) => {
      const xe = { ...Ne };
      if (
        (Ne.config && (xe.config = { ...xe.config }),
        xe.comp === 'links' &&
          n &&
          ((xe.api = n), (xe.autoSave = l), (xe.onLinksChange = de)),
        xe.comp === 'select' && xe.key === 'type')
      ) {
        const ze = xe.options ?? [];
        xe.options = ze.map((Xe) => ({
          ...Xe,
          label: g(Xe.label),
        }));
      }
      return (
        xe.comp === 'slider' &&
          xe.key === 'progress' &&
          (xe.labelTemplate = (ze) => `${g(xe.label)} ${ze}%`),
        xe.label && (xe.label = g(xe.label)),
        xe.config?.placeholder &&
          (xe.config.placeholder = g(xe.config.placeholder)),
        Ae &&
          (xe.isDisabled && xe.isDisabled(Ae, n.getState())
            ? (xe.disabled = !0)
            : delete xe.disabled),
        xe
      );
    });
  }
  const ke = $(() => {
      let Q = e.length ? e : O;
      return (
        (Q = Se(Q, Z)),
        Z ? Q.filter((Ae) => !Ae.isHidden || !Ae.isHidden(Z, n.getState())) : Q
      );
    }, [e, O, Z, g, n, l]),
    De = $(() => ke.map((Q) => Q.key), [ke]);
  function de({ id: Q, action: Ae, data: Ne }) {
    B((xe) => ({
      ...xe,
      [Q]: { action: Ae, data: Ne },
    }));
  }
  const be = R(() => {
      for (let Q in D)
        if (X.byId(Q)) {
          const { action: Ae, data: Ne } = D[Q];
          n.exec(Ae, Ne);
        }
    }, [n, D, X]),
    _e = R(() => {
      const Q = S?.id || S;
      if (C) {
        if (M?.segments) {
          const Ae = M.segments.filter((Ne, xe) => xe !== A);
          n.exec('update-task', {
            id: Q,
            task: { segments: Ae },
          });
        }
      } else n.exec('delete-task', { id: Q });
    }, [n, S, C, M, A]),
    He = R(() => {
      n.exec('show-editor', { id: null });
    }, [n]),
    Fe = R(
      (Q) => {
        const { item: Ae, changes: Ne } = Q;
        Ae.id === 'delete' && _e(),
          Ae.id === 'save' && (Ne.length ? He() : be()),
          Ae.comp && He();
      },
      [n, S, l, be, _e, He],
    ),
    te = R(
      (Q, Ae, Ne) => (
        _ && Q.type === 'summary' && (Q.unscheduled = !1),
        Oo(Q, n.getState(), Ae),
        Ne || z(!1),
        Q
      ),
      [_, n],
    ),
    le = R(
      (Q) => {
        (Q = {
          ...Q,
          unscheduled: _ && Q.unscheduled && Q.type !== 'summary',
        }),
          delete Q.links,
          delete Q.data,
          (De.indexOf('duration') === -1 || (Q.segments && !Q.duration)) &&
            delete Q.duration;
        const Ae = {
          id: S?.id || S,
          task: Q,
          ...(C && { segmentIndex: A }),
        };
        l && H && (Ae.inProgress = H), n.exec('update-task', Ae), l || be();
      },
      [n, S, _, l, be, De, C, A, H],
    ),
    se = R(
      (Q) => {
        let { update: Ae, key: Ne, input: xe } = Q;
        if ((xe && z(!0), (Q.update = te({ ...Ae }, Ne, xe)), !l)) E(Q.update);
        else if (!K && !xe) {
          const ze = ke.find((ye) => ye.key === Ne),
            Xe = Ae[Ne];
          (!ze.validation || ze.validation(Xe)) &&
            (!ze.required || Xe) &&
            le(Q.update);
        }
      },
      [l, te, K, ke, le],
    ),
    $e = R(
      (Q) => {
        l || le(Q.values);
      },
      [l, le],
    ),
    Ce = R((Q) => {
      he(Q.errors);
    }, []),
    me = $(
      () =>
        G
          ? {
              'ctrl+z': (Q) => {
                Q.preventDefault(), n.exec('undo');
              },
              'ctrl+y': (Q) => {
                Q.preventDefault(), n.exec('redo');
              },
            }
          : {},
      [G, n],
    );
  return fe
    ? /* @__PURE__ */ p(Xn, {
        children: /* @__PURE__ */ p(ld, {
          css: `wx-XkvqDXuw wx-gantt-editor ${b} ${t}`,
          items: ke,
          values: fe,
          topBar: x,
          bottomBar: i,
          placement: o,
          layout: r,
          readonly: s,
          autoSave: l,
          focus: c,
          onAction: Fe,
          onSave: $e,
          onValidation: Ce,
          onChange: se,
          hotkeys: u && { ...me, ...u },
        }),
      })
    : null;
}
const gd = ({ children: n, columns: e = null, api: t }) => {
  const [r, s] = J(null);
  return (
    j(() => {
      t && t.getTable(!0).then(s);
    }, [t]),
    /* @__PURE__ */ p(gu, { api: r, columns: e, children: n })
  );
};
function pd(n) {
  const { api: e, content: t, filter: r, children: s } = n,
    o = Y(null),
    i = Y(null),
    [a, l] = J({}),
    [c, u] = J(null),
    [d, f] = J(null),
    [g, m] = J(!1),
    h = Y(null),
    x = Y(!1),
    w = Y(null),
    y = Y(null),
    b = 300,
    v = 400;
  function M(H) {
    for (; H; ) {
      if (H.getAttribute) {
        const z = H.getAttribute('data-tooltip-id'),
          Z = H.getAttribute('data-tooltip-at'),
          E = H.getAttribute('data-tooltip');
        if (z || E) return { id: z, tooltip: E, target: H, at: Z };
      }
      H = H.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  j(() => {
    const H = i.current;
    if (!g && H && d && (d.text || t)) {
      const z = H.getBoundingClientRect();
      let Z = !1,
        E = d.left,
        K = d.top;
      z.right >= a.right && ((E = a.width - z.width - 5), (Z = !0)),
        z.bottom >= a.bottom &&
          ((K = d.top - (z.bottom - a.bottom + 2)), (Z = !0)),
        Z && f((he) => he && { ...he, left: E, top: K });
    }
  }, [d, a, t, g]);
  const S = R(() => {
      clearTimeout(w.current),
        clearTimeout(y.current),
        (w.current = null),
        (y.current = null),
        (h.current = null),
        (x.current = !1),
        f(null),
        u(null),
        m(!1);
    }, []),
    _ = R(() => {
      clearTimeout(y.current),
        (y.current = setTimeout(() => {
          (y.current = null), !h.current && !x.current && S();
        }, v));
    }, [S]),
    T = R(() => {
      clearTimeout(y.current), (y.current = null);
    }, []);
  function X(H) {
    if (i.current && i.current.contains(H.target)) return;
    let { id: z, tooltip: Z, target: E, at: K } = M(H.target);
    if (!z && !Z) {
      clearTimeout(w.current),
        (w.current = null),
        (h.current = null),
        !x.current && !y.current && _();
      return;
    }
    if ((T(), Z || (Z = G(z)), h.current === z)) return;
    (h.current = z), clearTimeout(w.current), f(null), u(null), m(!1);
    const he = H.clientX;
    w.current = setTimeout(() => {
      w.current = null;
      const fe = z ? O(D(z)) : null;
      if (r && fe && !r(fe)) {
        h.current = null;
        return;
      }
      fe && u(fe);
      const Se = E.getBoundingClientRect(),
        ke = o.current,
        De = ke
          ? ke.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let de, be;
      K === 'left'
        ? ((de = Se.top + 5 - De.top), (be = Se.right + 5 - De.left))
        : ((de = Se.top + Se.height - De.top), (be = he - De.left)),
        l(De),
        f({ top: de, left: be, text: Z });
    }, b);
  }
  function N() {
    (x.current = !0), T();
  }
  function A() {
    (x.current = !1), h.current || _();
  }
  function C(H) {
    const z = H.touches[0];
    if (!z) return;
    const { id: Z, target: E } = M(H.target);
    if (!Z) return;
    clearTimeout(w.current), clearTimeout(y.current);
    const K = O(D(Z));
    if (r && K && !r(K)) return;
    const he = K?.text || '',
      fe = E.getBoundingClientRect(),
      Se = o.current,
      ke = Se
        ? Se.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    u(K),
      l(ke),
      m(!0),
      f({
        top: fe.top - ke.top - 8,
        left: z.clientX - ke.left,
        text: he,
      });
  }
  function P() {
    S();
  }
  function O(H) {
    return e?.getTask(D(H)) || null;
  }
  function G(H) {
    return O(H)?.text || '';
  }
  function D(H) {
    const z = Number(H);
    return Number.isFinite(z) ? z : H;
  }
  j(
    () => () => {
      clearTimeout(w.current), clearTimeout(y.current);
    },
    [],
  );
  const B = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    g ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ ee('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: X,
    onTouchStart: C,
    onTouchEnd: P,
    onTouchMove: P,
    children: [
      d && (d.text || t)
        ? /* @__PURE__ */ p('div', {
            className: B,
            ref: i,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            onMouseEnter: N,
            onMouseLeave: A,
            children: t
              ? /* @__PURE__ */ p(t, { data: c, api: e })
              : d.text
                ? /* @__PURE__ */ p('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: d.text,
                  })
                : null,
          })
        : null,
      s,
    ],
  });
}
function md({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(ds, { fonts: n, children: e() })
    : /* @__PURE__ */ p(ds, { fonts: n });
}
function wd({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(fs, { fonts: n, children: e })
    : /* @__PURE__ */ p(fs, { fonts: n });
}
function xd({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(hs, { fonts: n, children: e })
    : /* @__PURE__ */ p(hs, { fonts: n });
}
const yd = '2.9.0',
  vd = {
    version: yd,
  },
  kd = vd.version,
  Hd = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ContextMenu: ed,
        Editor: hd,
        Gantt: Zu,
        HeaderMenu: gd,
        Material: md,
        Toolbar: Ju,
        Tooltip: pd,
        Willow: wd,
        WillowDark: xd,
        defaultColumns: Lo,
        defaultEditorItems: Yo,
        defaultMenuOptions: zo,
        defaultTaskTypes: Jn,
        defaultToolbarButtons: Wo,
        getEditorItems: Fo,
        getMenuOptions: Dr,
        getToolbarButtons: Er,
        registerEditorItem: pt,
        registerScaleUnit: il,
        version: kd,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
export { Hd as default };
