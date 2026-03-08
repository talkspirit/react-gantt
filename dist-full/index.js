import { jsx as p, jsxs as J, Fragment as Ve } from 'react/jsx-runtime';
import ii, {
  useState as Z,
  useEffect as X,
  useRef as B,
  createContext as tn,
  useContext as He,
  useMemo as $,
  useCallback as E,
  forwardRef as Bt,
  useImperativeHandle as Vt,
  Fragment as un,
} from 'react';
import { createPortal as ai, flushSync as li } from 'react-dom';
function rt(n, e = 'data-id') {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
function yr(n, e = 'data-id') {
  const t = rt(n, e);
  return t ? t.getAttribute(e) : null;
}
function _t(n, e = 'data-id') {
  const t = rt(n, e);
  return t ? nn(t.getAttribute(e)) : null;
}
function nn(n) {
  if (typeof n == 'string') {
    const e = n * 1;
    if (!isNaN(e)) return e;
  }
  return n;
}
function ci() {
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
var lt = ci();
function Ar(n) {
  Object.assign(lt, n);
}
function Qr(n, e, t) {
  function r(s) {
    const o = rt(s);
    if (!o) return;
    const i = nn(o.dataset.id);
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
function Us(n, e) {
  Qr(n, e, 'click'), e.dblclick && Qr(n, e.dblclick, 'dblclick');
}
function ui(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    if (n[t] === e) {
      n.splice(t, 1);
      break;
    }
}
var Gs = /* @__PURE__ */ new Date(),
  Pn = !1,
  Cn = [],
  zt = [],
  Zr = (n) => {
    if (Pn) {
      Pn = !1;
      return;
    }
    for (let e = zt.length - 1; e >= 0; e--) {
      const { node: t, date: r, props: s } = zt[e];
      if (
        !(r > Gs) &&
        !t.contains(n.target) &&
        t !== n.target &&
        (s.callback && s.callback(n), s.modal || n.defaultPrevented)
      )
        break;
    }
  },
  di = (n) => {
    (Gs = /* @__PURE__ */ new Date()), (Pn = !0);
    for (let e = zt.length - 1; e >= 0; e--) {
      const { node: t } = zt[e];
      if (!t.contains(n.target) && t !== n.target) {
        Pn = !1;
        break;
      }
    }
  };
function mn(n, e) {
  Cn.length ||
    (Cn = [
      lt.addGlobalEvent('click', Zr, n),
      lt.addGlobalEvent('contextmenu', Zr, n),
      lt.addGlobalEvent('mousedown', di, n),
    ]),
    typeof e != 'object' && (e = { callback: e });
  const t = { node: n, date: /* @__PURE__ */ new Date(), props: e };
  return (
    zt.push(t),
    {
      destroy() {
        ui(zt, t), zt.length || (Cn.forEach((r) => r()), (Cn = []));
      },
    }
  );
}
var _n = (n) => n.indexOf('bottom') !== -1,
  Nn = (n) => n.indexOf('left') !== -1,
  Mn = (n) => n.indexOf('right') !== -1,
  sr = (n) => n.indexOf('top') !== -1,
  Jr = (n) => n.indexOf('fit') !== -1,
  Tn = (n) => n.indexOf('overlap') !== -1,
  fi = (n) => n.split('-').every((e) => ['center', 'fit'].indexOf(e) > -1),
  hi = (n) => {
    const e = n.match(/(start|center|end)/);
    return e ? e[0] : null;
  };
function gi(n, e) {
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
var tt, it, an, nt;
function pi(n, e, t = 'bottom', r = 0, s = 0) {
  if (!n) return null;
  (tt = r), (it = s), (an = 'auto');
  let o = 0,
    i = 0;
  const a = mi(n),
    l = Tn(t) ? lt.getTopNode(n) : a;
  if (!a) return null;
  const c = a.getBoundingClientRect(),
    u = n.getBoundingClientRect(),
    d = l.getBoundingClientRect(),
    f = window.getComputedStyle(l),
    h = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    };
  for (const v in h) {
    const k = `border-${v}-width`;
    h[v] = parseFloat(f.getPropertyValue(k));
  }
  if (e) {
    const v = gi(e, a);
    o = Math.max(v + 1, 20);
  }
  if (e) {
    if (
      ((nt = e.getBoundingClientRect()),
      Jr(t) && (an = nt.width + 'px'),
      t !== 'point')
    )
      if (fi(t))
        Jr(t) ? (tt = 0) : ((tt = d.width / 2), (i = 1)),
          (it = (d.height - u.height) / 2);
      else {
        const v = Tn(t) ? 0 : 1;
        (tt = Mn(t) ? nt.right + v : nt.left - v),
          (it = _n(t) ? nt.bottom + 1 : nt.top);
        const k = hi(t);
        k &&
          (Mn(t) || Nn(t)
            ? k === 'center'
              ? (it -= (u.height - nt.height) / 2)
              : k === 'end' && (it -= u.height - nt.height)
            : (_n(t) || sr(t)) &&
              (k === 'center'
                ? (tt -= (u.width - nt.width) / 2)
                : k === 'end' && (tt -= u.width - nt.width),
              Tn(t) || (tt += 1)));
      }
  } else nt = { left: r, right: r, top: s, bottom: s };
  const m = (Nn(t) || Mn(t)) && (_n(t) || sr(t));
  Nn(t) && (i = 2);
  const g = tt - u.width - d.left;
  e && Nn(t) && !m && g < 0 && ((tt = nt.right), (i = 0));
  const y = tt + u.width * (1 - i / 2) - d.right;
  if (y > 0)
    if (!Mn(t)) tt = d.right - h.right - u.width;
    else {
      const v = nt.left - d.x - u.width;
      e && !Tn(t) && !m && v >= 0
        ? (tt = nt.left - u.width)
        : (tt -= y + h.right);
    }
  i && (tt = Math.round(tt - (u.width * i) / 2));
  const w = g < 0 || y > 0 || !m;
  sr(t) && ((it = nt.top - u.height), e && it < d.y && w && (it = nt.bottom));
  const x = it + u.height - d.bottom;
  return (
    x > 0 &&
      (e && _n(t) && w
        ? (it -= u.height + nt.height + 1)
        : (it -= x + h.bottom)),
    (tt -= c.left + h.left),
    (it -= c.top + h.top),
    (tt = Math.max(tt, 0) + l.scrollLeft),
    (it = Math.max(it, 0) + l.scrollTop),
    (an = an || 'auto'),
    { x: tt, y: it, z: o, width: an }
  );
}
function mi(n) {
  const e = lt.getTopNode(n);
  for (n && (n = n.parentElement); n; ) {
    const t = getComputedStyle(n).position;
    if (n === e || t === 'relative' || t === 'absolute' || t === 'fixed')
      return n;
    n = n.parentNode;
  }
  return null;
}
var es = /* @__PURE__ */ new Date().valueOf();
function Un() {
  return (es += 1), es;
}
var wi = class {
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
  Qt = [],
  ts = {
    subscribe: (n) => {
      xi();
      const e = new wi();
      return (
        Qt.push(e),
        n(e),
        () => {
          const t = Qt.findIndex((r) => r === e);
          t >= 0 && Qt.splice(t, 1);
        }
      );
    },
  },
  ns = !1;
function xi() {
  ns ||
    ((ns = !0),
    document.addEventListener('keydown', (n) => {
      if (
        Qt.length &&
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
        for (let s = Qt.length - 1; s >= 0; s--) {
          const o = Qt[s],
            i = o.store.get(r) || o.store.get(t);
          i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
        }
      }
    }));
}
function at(n) {
  return n < 10 ? '0' + n : n.toString();
}
function yi(n) {
  const e = at(n);
  return e.length == 2 ? '0' + e : e;
}
function js(n) {
  const e = Math.floor(n / 11) * 11;
  return {
    start: e,
    end: e + 11,
  };
}
function rs(n, e = 1) {
  let t = n.getDay();
  t === 0 && (t = 7), (t = (t - e + 7) % 7);
  const r = new Date(n.valueOf());
  r.setDate(n.getDate() + (3 - t));
  const s = r.getFullYear(),
    o = Math.floor((r.getTime() - new Date(s, 0, 1).getTime()) / 864e5);
  return 1 + Math.floor(o / 7);
}
var ss = ['', ''];
function vi(n, e, t) {
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
      return ((e.getHours() > 11 ? t.pm : t.am) || ss)[0];
    case '%A':
      return ((e.getHours() > 11 ? t.pm : t.am) || ss)[1];
    case '%s':
      return at(e.getSeconds());
    case '%S':
      return yi(e.getMilliseconds());
    case '%W':
      return at(rs(e));
    case '%w':
      return at(rs(e, t.weekStart ?? 1));
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
var ki = /%[a-zA-Z]/g;
function Nt(n, e) {
  return typeof n == 'function'
    ? n
    : function (t) {
        return t
          ? (t.getMonth || (t = new Date(t)), n.replace(ki, (r) => vi(r, t, e)))
          : '';
      };
}
function os(n) {
  return n && typeof n == 'object' && !Array.isArray(n);
}
function vr(n, e) {
  for (const t in e) {
    const r = e[t];
    os(n[t]) && os(r) ? (n[t] = vr({ ...n[t] }, e[t])) : (n[t] = e[t]);
  }
  return n;
}
function Ut(n) {
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
      return t ? (r = vr({ ...e }, n)) : (r = vr({ ...n }, e)), Ut(r);
    },
  };
}
function Xe(n) {
  const [e, t] = Z(n),
    r = B(n);
  return (
    X(() => {
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
function bi(n, e, t) {
  const [r, s] = Z(() => e);
  return (
    n || console.warn(`Writable ${t} is not defined`),
    X(
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
function le(n, e) {
  const t = n.getState(),
    r = n.getReactiveState();
  return bi(r[e], t[e], e);
}
function vt(n, e) {
  const [t, r] = Z(() => null);
  return (
    X(() => {
      if (!n) return;
      const s = n.getReactiveState(),
        o = s ? s[e] : null;
      return o ? o.subscribe((a) => r(() => a)) : void 0;
    }, [n, e]),
    t
  );
}
function Si(n, e) {
  const t = B(e);
  t.current = e;
  const [r, s] = Z(1);
  return (
    X(
      () =>
        n.subscribe((i) => {
          (t.current = i), s((a) => a + 1);
        }),
      [n],
    ),
    [t.current, r]
  );
}
function Jt(n, e) {
  const t = n.getState(),
    r = n.getReactiveState();
  return Si(r[e], t[e]);
}
function $i(n, e) {
  X(() => {
    const t = e.current;
    if (t)
      return ts.subscribe((r) => {
        r.configure(n, t);
      });
  }, [ts, e]);
}
function Ks(n, e) {
  return typeof n == 'function' ? (typeof e == 'object' ? n(e) : n()) : n;
}
function Xs(n) {
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
function qs(n) {
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
function is(n, e, t) {
  function r(s) {
    const o = rt(s);
    if (!o) return;
    const i = nn(o.dataset.id);
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
function Ci(n, e) {
  const t = [is(n, e, 'click')];
  return (
    e.dblclick && t.push(is(n, e.dblclick, 'dblclick')),
    () => {
      t.forEach((r) => r());
    }
  );
}
const _i = 'en-US',
  Ni = {
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
  Mi = {
    ok: 'OK',
    cancel: 'Cancel',
    select: 'Select',
    'No data': 'No data',
    'Rows per page': 'Rows per page',
    'Total pages': 'Total pages',
  },
  Ti = {
    timeFormat: '%H:%i',
    dateFormat: '%m/%d/%Y',
    monthYearFormat: '%F %Y',
    yearFormat: '%Y',
  },
  wn = {
    core: Mi,
    calendar: Ni,
    formats: Ti,
    lang: _i,
  },
  xn = tn('willow'),
  Di = tn({}),
  pt = tn(null),
  Lr = tn(null),
  st = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        fieldId: Lr,
        helpers: Di,
        i18n: pt,
        theme: xn,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
function rn(n) {
  const e = He(Lr),
    [t] = Z(() => n || (e && e()) || Un());
  return t;
}
function Ei({
  value: n = '',
  id: e,
  placeholder: t = '',
  title: r = '',
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: a,
}) {
  const l = rn(e),
    [c, u] = Xe(n),
    d = E(
      (m) => {
        const g = m.target.value;
        u(g), a && a({ value: g, input: !0 });
      },
      [a],
    ),
    f = E(
      (m) => {
        const g = m.target.value;
        u(g), a && a({ value: g });
      },
      [a],
    ),
    h = B(null);
  return (
    X(() => {
      const m = f,
        g = h.current;
      return (
        g.addEventListener('change', m),
        () => {
          g && g.removeEventListener('change', m);
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
      ref: h,
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
  return /* @__PURE__ */ J('button', {
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
function Ri({
  id: n,
  label: e = '',
  inputValue: t = '',
  value: r = !1,
  onChange: s,
  disabled: o = !1,
}) {
  const i = rn(n),
    [a, l] = Xe(r);
  return /* @__PURE__ */ J('div', {
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
      /* @__PURE__ */ J('label', {
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
function sn({
  position: n = 'bottom',
  align: e = 'start',
  autoFit: t = !0,
  onCancel: r,
  width: s = '100%',
  children: o,
}) {
  const i = B(null),
    [a, l] = Xe(n),
    [c, u] = Xe(e);
  return (
    X(() => {
      if (t) {
        const d = i.current;
        if (d) {
          const f = d.getBoundingClientRect(),
            h = lt.getTopNode(d).getBoundingClientRect();
          f.right >= h.right && u('end'), f.bottom >= h.bottom && l('top');
        }
      }
    }, [t]),
    X(() => {
      if (i.current) {
        const d = (f) => {
          r && r(f);
        };
        return mn(i.current, d).destroy;
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
function yn() {
  return Ut(wn);
}
function Ii() {
  let n = null,
    e = !1,
    t,
    r,
    s,
    o;
  const i = (u, d, f, h) => {
      (t = u), (r = d), (s = f), (o = h);
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
        f = r.findIndex((h) => h.id == d);
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
function Gn({ items: n = [], children: e, onSelect: t, onReady: r }) {
  const s = B(),
    o = B(Ii()),
    [i, a] = Z(null),
    l = B(i),
    c = (He(pt) || yn()).getGroup('core'),
    u = (f) => {
      f && f.stopPropagation(), t && t({ id: n[l.current]?.id });
    };
  X(() => {
    o.current.init(
      s.current,
      n,
      (f) => {
        a(f), (l.current = f);
      },
      u,
    );
  }, [n, s.current]),
    X(() => {
      r && r(o.current);
    }, []);
  const d = E(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null
    ? null
    : /* @__PURE__ */ p(sn, {
        onCancel: d,
        children: /* @__PURE__ */ p('div', {
          className: 'wx-233fr7 wx-list',
          ref: s,
          onClick: u,
          onMouseMove: o.current.move,
          children: n.length
            ? n.map((f, h) =>
                /* @__PURE__ */ p(
                  'div',
                  {
                    className: `wx-233fr7 wx-item ${h === i ? 'wx-focus' : ''}`,
                    'data-id': f.id,
                    children: e ? Ks(e, { option: f }) : f.label,
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
function Hi({
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
  const f = rn(e),
    h = B(null),
    m = B(null),
    [g, y] = Xe(n),
    [w, x] = Z(!1),
    [v, k] = Z(''),
    R = B(null),
    S = B(!1),
    C = $(() => {
      if (w) return v;
      if (g || g === 0) {
        const T = (r || t).find((Y) => Y.id === g);
        if (T) return T[s];
      }
      return '';
    }, [w, v, g, r, t, s]),
    H = $(
      () =>
        !C || !w
          ? t
          : t.filter((T) => T[s].toLowerCase().includes(C.toLowerCase())),
      [C, w, t, s],
    ),
    G = E(() => H.findIndex((T) => T.id === g), [H, g]),
    N = E((T) => {
      (h.current = T.navigate), (m.current = T.keydown);
    }, []),
    L = E(
      (T, Y) => {
        if (T || T === 0) {
          let ne = t.find((M) => M.id === T);
          if ((x(!1), Y && h.current(null), ne && g !== ne.id)) {
            const M = ne.id;
            y(M), d && d({ value: M });
          }
        }
        !S.current && Y && R.current.focus();
      },
      [t, g, d],
    ),
    _ = E(
      ({ id: T }) => {
        L(T, !0);
      },
      [L],
    ),
    A = E(
      (T) => {
        T && T.stopPropagation(), y(''), x(!1), d && d({ value: '' });
      },
      [d],
    ),
    O = E(
      (T) => {
        if (!t.length) return;
        if (T === '' && c) {
          A();
          return;
        }
        let Y = t.find((M) => M[s] === T);
        Y || (Y = t.find((M) => M[s].toLowerCase().includes(T.toLowerCase())));
        const ne = Y ? Y.id : g || t[0].id;
        L(ne, !1);
      },
      [t, s, c, g, L, A],
    ),
    W = E(() => {
      k(R.current.value), x(!0), H.length ? h.current(0) : h.current(null);
    }, [H.length, h]),
    P = E(() => {
      S.current = !0;
    }, []),
    U = E(() => {
      (S.current = !1),
        setTimeout(() => {
          S.current || O(C);
        }, 200);
    }, [O, C]);
  return /* @__PURE__ */ J('div', {
    className: 'wx-1j11Jk wx-combo',
    onClick: () => h.current(G()),
    onKeyDown: (T) => m.current(T, G()),
    title: i,
    children: [
      /* @__PURE__ */ p('input', {
        className: 'wx-1j11Jk wx-input ' + (l ? 'wx-error' : ''),
        id: f,
        ref: R,
        value: C,
        disabled: a,
        placeholder: o,
        onFocus: P,
        onBlur: U,
        onInput: W,
      }),
      c && !a && g
        ? /* @__PURE__ */ p('i', {
            className: 'wx-1j11Jk wx-icon wxi-close',
            onClick: A,
          })
        : /* @__PURE__ */ p('i', {
            className: 'wx-1j11Jk wx-icon wxi-angle-down',
          }),
      !a &&
        /* @__PURE__ */ p(Gn, {
          items: H,
          onReady: N,
          onSelect: _,
          children: ({ option: T }) =>
            /* @__PURE__ */ p(Ve, { children: u ? u({ option: T }) : T[s] }),
        }),
    ],
  });
}
function vn({
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
  clear: h = !1,
  onChange: m,
}) {
  const g = rn(e),
    [y, w] = Xe(n),
    x = B(null),
    v = $(
      () => (f && d.indexOf('wx-icon-left') === -1 ? 'wx-icon-right ' + d : d),
      [f, d],
    ),
    k = $(() => f && d.indexOf('wx-icon-left') !== -1, [f, d]);
  X(() => {
    const G = setTimeout(() => {
      r && x.current && x.current.focus(), s && x.current && x.current.select();
    }, 1);
    return () => clearTimeout(G);
  }, [r, s]);
  const R = E(
      (G) => {
        const N = G.target.value;
        w(N), m && m({ value: N, input: !0 });
      },
      [m],
    ),
    S = E((G) => m && m({ value: G.target.value }), [m]);
  function C(G) {
    G.stopPropagation(), w(''), m && m({ value: '' });
  }
  let H = o;
  return (
    o !== 'password' && o !== 'number' && (H = 'text'),
    X(() => {
      const G = S,
        N = x.current;
      return (
        N.addEventListener('change', G),
        () => {
          N && N.removeEventListener('change', G);
        }
      );
    }, [S]),
    /* @__PURE__ */ J('div', {
      className: `wx-hQ64J4 wx-text ${v} ${l ? 'wx-error' : ''} ${a ? 'wx-disabled' : ''} ${h ? 'wx-clear' : ''}`,
      children: [
        /* @__PURE__ */ p('input', {
          className: 'wx-hQ64J4 wx-input',
          ref: x,
          id: g,
          readOnly: t,
          disabled: a,
          placeholder: i,
          type: H,
          style: c,
          title: u,
          value: y,
          onInput: R,
        }),
        h && !a && y
          ? /* @__PURE__ */ J(Ve, {
              children: [
                /* @__PURE__ */ p('i', {
                  className: 'wx-hQ64J4 wx-icon wxi-close',
                  onClick: C,
                }),
                k &&
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
function Ai({ date: n, type: e, part: t, onShift: r }) {
  const { calendar: s, formats: o } = He(pt).getRaw(),
    i = n.getFullYear(),
    a = $(() => {
      switch (e) {
        case 'month':
          return Nt(o.monthYearFormat, s)(n);
        case 'year':
          return Nt(o.yearFormat, s)(n);
        case 'duodecade': {
          const { start: c, end: u } = js(i),
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
  return /* @__PURE__ */ J('div', {
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
function Pr({ onClick: n, children: e }) {
  return /* @__PURE__ */ p('button', {
    className: 'wx-3s8W4d wx-button',
    onClick: n,
    children: e,
  });
}
function Li({
  value: n,
  current: e,
  part: t = '',
  markers: r = null,
  onCancel: s,
  onChange: o,
}) {
  const i = (He(pt) || yn()).getRaw().calendar,
    a = (i.weekStart || 7) % 7,
    l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)),
    c = (k, R, S) =>
      new Date(
        k.getFullYear(),
        k.getMonth() + (R || 0),
        k.getDate() + (S || 0),
      );
  let u = t !== 'normal';
  function d(k) {
    const R = k.getDay();
    return R === 0 || R === 6;
  }
  function f() {
    const k = c(e, 0, 1 - e.getDate());
    return k.setDate(k.getDate() - ((k.getDay() - (a - 7)) % 7)), k;
  }
  function h() {
    const k = c(e, 1, -e.getDate());
    return k.setDate(k.getDate() + ((6 - k.getDay() + a) % 7)), k;
  }
  const m = B(0);
  function g(k, R) {
    R.timeStamp !== m.current &&
      ((m.current = R.timeStamp),
      R.stopPropagation(),
      o && o(new Date(new Date(k))),
      s && s());
  }
  const y = $(
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
      const k = f(),
        R = h(),
        S = e.getMonth();
      let C = [];
      for (let H = k; H <= R; H.setDate(H.getDate() + 1)) {
        const G = {
          day: H.getDate(),
          in: H.getMonth() === S,
          date: H.valueOf(),
        };
        let N = '';
        if (
          ((N += G.in ? '' : ' wx-inactive'),
          (N += y.indexOf(G.date) > -1 ? ' wx-selected' : ''),
          u)
        ) {
          const L = G.date == y[0],
            _ = G.date == y[1];
          L && !_ ? (N += ' wx-left') : _ && !L && (N += ' wx-right'),
            G.date > y[0] && G.date < y[1] && (N += ' wx-inrange');
        }
        if (((N += d(H) ? ' wx-weekend' : ''), r)) {
          const L = r(H);
          L && (N += ' ' + L);
        }
        C.push({ ...G, css: N });
      }
      return C;
    }, [e, y, u, r]),
    x = B(null);
  let v = B({});
  return (
    (v.current.click = g),
    X(() => {
      Us(x.current, v.current);
    }, []),
    /* @__PURE__ */ J('div', {
      children: [
        /* @__PURE__ */ p('div', {
          className: 'wx-398RBS wx-weekdays',
          children: l.map((k) =>
            /* @__PURE__ */ p(
              'div',
              { className: 'wx-398RBS wx-weekday', children: k },
              k,
            ),
          ),
        }),
        /* @__PURE__ */ p('div', {
          className: 'wx-398RBS wx-days',
          ref: x,
          children: w.map((k) =>
            /* @__PURE__ */ p(
              'div',
              {
                className: `wx-398RBS wx-day ${k.css} ${k.in ? '' : 'wx-out'}`,
                'data-id': k.date,
                children: k.day,
              },
              k.date,
            ),
          ),
        }),
      ],
    })
  );
}
function Pi({
  value: n,
  current: e,
  part: t,
  onCancel: r,
  onChange: s,
  onShift: o,
}) {
  const [i, a] = Xe(n || /* @__PURE__ */ new Date()),
    [l, c] = Xe(e || /* @__PURE__ */ new Date()),
    u = He(pt).getRaw().calendar,
    d = u.monthShort || [],
    f = $(() => l.getMonth(), [l]),
    h = E(
      (y, w) => {
        if (y != null) {
          w.stopPropagation();
          const x = new Date(l);
          x.setMonth(y), c(x), o && o({ current: x });
        }
        t === 'normal' && a(new Date(l)), r && r();
      },
      [l, t, o, r],
    ),
    m = E(() => {
      const y = new Date(Qs(i, t) || l);
      y.setMonth(l.getMonth()), y.setFullYear(l.getFullYear()), s && s(y);
    }, [i, l, t, s]),
    g = E(
      (y) => {
        const w = y.target.closest('[data-id]');
        if (w) {
          const x = parseInt(w.getAttribute('data-id'), 10);
          h(x, y);
        }
      },
      [h],
    );
  return /* @__PURE__ */ J(Ve, {
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-34U8T8 wx-months',
        onClick: g,
        children: d.map((y, w) =>
          /* @__PURE__ */ p(
            'div',
            {
              className: 'wx-34U8T8 wx-month' + (f === w ? ' wx-current' : ''),
              'data-id': w,
              children: y,
            },
            w,
          ),
        ),
      }),
      /* @__PURE__ */ p('div', {
        className: 'wx-34U8T8 wx-buttons',
        children: /* @__PURE__ */ p(Pr, { onClick: m, children: u.done }),
      }),
    ],
  });
}
const or = 'wx-1XEF33',
  Oi = ({
    value: n,
    current: e,
    onCancel: t,
    onChange: r,
    onShift: s,
    part: o,
  }) => {
    const i = He(pt).getRaw().calendar,
      [a, l] = Xe(e),
      [c, u] = Xe(n),
      d = $(() => a.getFullYear(), [a]),
      f = $(() => {
        const { start: w, end: x } = js(d),
          v = [];
        for (let k = w; k <= x; ++k) v.push(k);
        return v;
      }, [d]),
      h = {
        click: m,
      };
    function m(w, x) {
      if (w) {
        x.stopPropagation();
        const v = new Date(a);
        v.setFullYear(w), l(v), s && s({ current: v });
      }
      o === 'normal' && u(new Date(a)), t && t();
    }
    function g() {
      const w = new Date(Qs(c, o) || a);
      w.setFullYear(a.getFullYear()), r && r(w);
    }
    const y = B(null);
    return (
      X(() => {
        y.current && Us(y.current, h);
      }, []),
      /* @__PURE__ */ J(Ve, {
        children: [
          /* @__PURE__ */ p('div', {
            className: or + ' wx-years',
            ref: y,
            children: f.map((w, x) =>
              /* @__PURE__ */ p(
                'div',
                {
                  className:
                    or +
                    ` wx-year ${d == w ? 'wx-current' : ''} ${x === 0 ? 'wx-prev-decade' : ''} ${x === 11 ? 'wx-next-decade' : ''}`,
                  'data-id': w,
                  children: w,
                },
                x,
              ),
            ),
          }),
          /* @__PURE__ */ p('div', {
            className: or + ' wx-buttons',
            children: /* @__PURE__ */ p(Pr, { onClick: g, children: i.done }),
          }),
        ],
      })
    );
  },
  as = {
    month: {
      component: Li,
      next: Wi,
      prev: zi,
    },
    year: {
      component: Pi,
      next: Yi,
      prev: Fi,
    },
    duodecade: {
      component: Oi,
      next: Vi,
      prev: Bi,
    },
  };
function zi(n) {
  return (n = new Date(n)), n.setMonth(n.getMonth() - 1), n;
}
function Wi(n) {
  return (n = new Date(n)), n.setMonth(n.getMonth() + 1), n;
}
function Fi(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() - 1), n;
}
function Yi(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() + 1), n;
}
function Bi(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() - 10), n;
}
function Vi(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() + 10), n;
}
function Qs(n, e) {
  let t;
  if (e === 'normal') t = n;
  else {
    const { start: r, end: s } = n;
    e === 'left' ? (t = r) : e == 'right' ? (t = s) : (t = r && s);
  }
  return t;
}
const Ui = ['clear', 'today'];
function Gi(n) {
  if (n === 'done') return -1;
  if (n === 'clear') return null;
  if (n === 'today') return /* @__PURE__ */ new Date();
}
function ji({
  value: n,
  current: e,
  onCurrentChange: t,
  part: r = 'normal',
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: a,
}) {
  const l = He(pt).getGroup('calendar'),
    [c, u] = Z('month'),
    d = Array.isArray(o) ? o : o ? Ui : [],
    f = (w, x) => {
      w.preventDefault(), a && a({ value: x });
    },
    h = () => {
      c === 'duodecade' ? u('year') : c === 'year' && u('month');
    },
    m = (w) => {
      const { diff: x, current: v } = w;
      if (x === 0) {
        c === 'month' ? u('year') : c === 'year' && u('duodecade');
        return;
      }
      if (x) {
        const k = as[c];
        t(x > 0 ? k.next(e) : k.prev(e));
      } else v && t(v);
      i && i();
    },
    g = (w) => {
      u('month'), a && a({ select: !0, value: w });
    },
    y = $(() => as[c].component, [c]);
  return /* @__PURE__ */ p('div', {
    className: `wx-2Gr4AS wx-calendar ${r !== 'normal' && r !== 'both' ? 'wx-part' : ''}`,
    children: /* @__PURE__ */ J('div', {
      className: 'wx-2Gr4AS wx-wrap',
      children: [
        /* @__PURE__ */ p(Ai, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ J('div', {
          children: [
            /* @__PURE__ */ p(y, {
              value: n,
              current: e,
              onCurrentChange: t,
              part: r,
              markers: s,
              onCancel: h,
              onChange: g,
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
                      children: /* @__PURE__ */ p(Pr, {
                        onClick: (x) => f(x, Gi(w)),
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
function jn(n) {
  let { words: e = null, optional: t = !1, children: r } = n,
    s = He(pt);
  const o = $(() => {
    let i = s;
    return (
      (!i || !i.extend) && (i = Ut(wn)), e !== null && (i = i.extend(e, t)), i
    );
  }, [e, t, s]);
  return /* @__PURE__ */ p(pt.Provider, { value: o, children: r });
}
function ls(n, e, t, r) {
  if (!n || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), t(s);
  } else if (n.getDate() !== 1) {
    const s = new Date(n);
    s.setDate(1), t(s);
  }
}
const Ki = ['clear', 'today'];
function Zs({
  value: n,
  current: e,
  markers: t = null,
  buttons: r = Ki,
  onChange: s,
}) {
  const [o, i] = Xe(n),
    [a, l] = Xe(e);
  X(() => {
    ls(a, o, l, !1);
  }, [o, a]);
  const c = E(
      (d) => {
        const f = d.value;
        f ? (i(new Date(f)), ls(a, new Date(f), l, !0)) : i(null),
          s && s({ value: f ? new Date(f) : null });
      },
      [s, a],
    ),
    u = E(
      (d) => {
        l(d);
      },
      [l],
    );
  return a
    ? /* @__PURE__ */ p(jn, {
        children: /* @__PURE__ */ p(ji, {
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
const Xi = ['clear', 'today'];
function qi({
  value: n,
  id: e,
  disabled: t = !1,
  error: r = !1,
  width: s = 'unset',
  align: o = 'start',
  placeholder: i = '',
  format: a = '',
  buttons: l = Xi,
  css: c = '',
  title: u = '',
  editable: d = !1,
  clear: f = !1,
  onChange: h,
}) {
  const { calendar: m, formats: g } = (He(pt) || yn()).getRaw(),
    y = a || g?.dateFormat;
  let w = typeof y == 'function' ? y : Nt(y, m);
  const [x, v] = Z(n),
    [k, R] = Z(!1);
  X(() => {
    v(n);
  }, [n]);
  function S() {
    R(!1);
  }
  function C(N) {
    const L = N === x || (N && x && N.valueOf() === x.valueOf()) || (!N && !x);
    v(N), L || (h && h({ value: N })), setTimeout(S, 1);
  }
  const H = $(() => (x ? w(x) : ''), [x, w]);
  function G({ value: N, input: L }) {
    if ((!d && !f) || L) return;
    let _ = typeof d == 'function' ? d(N) : N ? new Date(N) : null;
    (_ = isNaN(_) ? x || null : _ || null), C(_);
  }
  return (
    X(() => {
      const N = S;
      return (
        window.addEventListener('scroll', N),
        () => window.removeEventListener('scroll', N)
      );
    }, []),
    /* @__PURE__ */ J('div', {
      className: 'wx-1lKOFG wx-datepicker',
      onClick: () => R(!0),
      children: [
        /* @__PURE__ */ p(vn, {
          css: c,
          title: u,
          value: H,
          id: e,
          readonly: !d,
          disabled: t,
          error: r,
          placeholder: i,
          onInput: S,
          onChange: G,
          icon: 'wxi-calendar',
          inputStyle: {
            cursor: 'pointer',
            width: '100%',
            paddingRight:
              'calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)',
          },
          clear: f,
        }),
        k &&
          !t &&
          /* @__PURE__ */ p(sn, {
            onCancel: S,
            width: s,
            align: o,
            autoFit: !!o,
            children: /* @__PURE__ */ p(Zs, {
              buttons: l,
              value: x,
              onChange: (N) => C(N.value),
            }),
          }),
      ],
    })
  );
}
function Js({
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
  const d = B(null),
    f = B(null);
  let [h, m] = Xe(n);
  function g(k) {
    (d.current = k.navigate), (f.current = k.keydown);
  }
  const y = $(
      () => (h || h === 0 ? (t || e).find((k) => k.id === h) : null),
      [h, t, e],
    ),
    w = E(
      ({ id: k }) => {
        (k || k === 0) && (m(k), d.current(null), u && u({ value: k }));
      },
      [m, u],
    ),
    x = E(
      (k) => {
        k.stopPropagation(), m(''), u && u({ value: '' });
      },
      [m, u],
    ),
    v = E(() => e.findIndex((k) => k.id === h), [e, h]);
  return /* @__PURE__ */ J('div', {
    className: `wx-2YgblL wx-richselect ${o ? 'wx-2YgblL wx-error' : ''} ${s ? 'wx-2YgblL wx-disabled' : ''} ${c ? '' : 'wx-2YgblL wx-nowrap'}`,
    title: i,
    onClick: () => d.current(v()),
    onKeyDown: (k) => f.current(k, v()),
    tabIndex: 0,
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-2YgblL wx-label',
        children: y
          ? c
            ? c(y)
            : y[a]
          : r
            ? /* @__PURE__ */ p('span', {
                className: 'wx-2YgblL wx-placeholder',
                children: r,
              })
            : ' ',
      }),
      l && !s && h
        ? /* @__PURE__ */ p('i', {
            className: 'wx-2YgblL wx-icon wxi-close',
            onClick: x,
          })
        : /* @__PURE__ */ p('i', {
            className: 'wx-2YgblL wx-icon wxi-angle-down',
          }),
      !s &&
        /* @__PURE__ */ p(Gn, {
          items: e,
          onReady: g,
          onSelect: w,
          children: ({ option: k }) => (c ? c(k) : k[a]),
        }),
    ],
  });
}
function kr({
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
  const u = rn(n),
    [d, f] = Xe(o),
    h = B({ value: d, input: d }),
    m = $(() => ((d - r) / (s - r)) * 100 + '%', [d, r, s]),
    g = $(
      () =>
        l
          ? ''
          : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`,
      [l, m],
    );
  function y({ target: v }) {
    const k = v.value * 1;
    f(k),
      c &&
        c({
          value: k,
          previous: h.current.input,
          input: !0,
        }),
      (h.current.input = k);
  }
  function w({ target: v }) {
    const k = v.value * 1;
    f(k),
      c && c({ value: k, previous: h.current.value }),
      (h.current.value = k);
  }
  X(() => {
    f(o);
  }, [o]);
  const x = B(null);
  return (
    X(() => {
      if (x.current)
        return (
          x.current.addEventListener('change', w),
          () => {
            x.current && x.current.removeEventListener('change', w);
          }
        );
    }, [x, w]),
    /* @__PURE__ */ J('div', {
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
            onInput: y,
            style: { background: g },
            ref: x,
          }),
        }),
      ],
    })
  );
}
const Qi = ({
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
  const c = rn(n),
    [u, d] = Xe(e),
    f = E(() => {
      if (a || u <= r) return;
      const y = u - t;
      d(y), l && l({ value: y });
    }, [u, a, r, t, l]),
    h = E(() => {
      if (a || u >= s) return;
      const y = u + t;
      d(y), l && l({ value: y });
    }, [u, a, s, t, l]),
    m = E(() => {
      if (!a) {
        const y = Math.round(Math.min(s, Math.max(u, r)) / t) * t,
          w = isNaN(y) ? Math.max(r, 0) : y;
        d(w), l && l({ value: w });
      }
    }, [a, u, s, r, t, l]),
    g = E(
      (y) => {
        const w = y.target.value * 1;
        d(w), l && l({ value: w, input: !0 });
      },
      [l],
    );
  return /* @__PURE__ */ J('div', {
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
        onInput: g,
      }),
      /* @__PURE__ */ p('button', {
        'aria-label': '-',
        className: 'wx-22t21n wx-btn wx-btn-inc',
        disabled: i,
        onClick: h,
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
function Zi({ notice: n = {} }) {
  function e() {
    n.remove && n.remove();
  }
  return /* @__PURE__ */ J('div', {
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
function Ji({ data: n = [] }) {
  return /* @__PURE__ */ p('div', {
    className: 'wx-3nwoO9 wx-notices',
    children: n.map((e) => /* @__PURE__ */ p(Zi, { notice: e }, e.id)),
  });
}
function ea({
  title: n = '',
  buttons: e = ['cancel', 'ok'],
  header: t,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i,
}) {
  const a = (He(pt) || yn()).getGroup('core'),
    l = B(null);
  X(() => {
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
    const h = { event: d, button: f };
    f === 'cancel' ? i && i(h) : o && o(h);
  }
  return /* @__PURE__ */ p('div', {
    className: 'wx-1FxkZa wx-modal',
    ref: l,
    tabIndex: 0,
    onKeyDown: c,
    children: /* @__PURE__ */ J('div', {
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
function ta({ children: n }, e) {
  const [t, r] = Z(null),
    [s, o] = Z([]);
  return (
    Vt(
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
            (i.id = i.id || Un()),
            (i.remove = () => o((a) => a.filter((l) => l.id !== i.id))),
            i.expire != -1 && setTimeout(i.remove, i.expire || 5100),
            o((a) => [...a, i]);
        },
      }),
      [],
    ),
    /* @__PURE__ */ J(Ve, {
      children: [
        n,
        t &&
          /* @__PURE__ */ p(ea, {
            title: t.title,
            buttons: t.buttons,
            onConfirm: t.resolve,
            onCancel: t.reject,
            children: t.message,
          }),
        /* @__PURE__ */ p(Ji, { data: s }),
      ],
    })
  );
}
Bt(ta);
function fn({
  label: n = '',
  position: e = '',
  css: t = '',
  error: r = !1,
  type: s = '',
  required: o = !1,
  children: i,
}) {
  const a = B(null),
    l = E(() => {
      if (a.current) return a.current;
      const c = Un();
      return (a.current = c), c;
    }, []);
  return /* @__PURE__ */ p(Lr.Provider, {
    value: l,
    children: /* @__PURE__ */ J('div', {
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
const eo = ({
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
    const [h, m] = Xe(n),
      g = $(() => (h ? 'pressed' : '') + (e ? ' ' + e : ''), [h, e]),
      y = E(
        (w) => {
          let x = !h;
          o && o(w), w.defaultPrevented || (m(x), f && f({ value: x }));
        },
        [h, o, f],
      );
    return h && d
      ? /* @__PURE__ */ p(Mt, {
          title: i,
          text: (h && c) || l,
          css: a,
          type: g,
          icon: (h && s) || t,
          onClick: y,
          disabled: r,
          children: Ks(d, { value: h }),
        })
      : u
        ? /* @__PURE__ */ p(Mt, {
            title: i,
            text: (h && c) || l,
            css: a,
            type: g,
            icon: (h && s) || t,
            onClick: y,
            disabled: r,
            children: u,
          })
        : /* @__PURE__ */ p(Mt, {
            title: i,
            text: (h && c) || l,
            css: a,
            type: g,
            icon: (h && s) || t,
            onClick: y,
            disabled: r,
          });
  },
  cs = new Date(0, 0, 0, 0, 0);
function na({
  value: n = cs,
  id: e,
  title: t = '',
  css: r = '',
  disabled: s = !1,
  error: o = !1,
  format: i = '',
  onChange: a,
}) {
  let [l, c] = Xe(n);
  const { calendar: u, formats: d } = (He(pt) || yn()).getRaw(),
    f = u.clockFormat == 12,
    h = 23,
    m = 59,
    g = $(() => {
      const M = i || d?.timeFormat;
      return typeof M == 'function' ? M : Nt(M, u);
    }, [i, d, u]),
    y = $(() => g(new Date(0, 0, 0, 1)).indexOf('01') != -1, [g]),
    w = (M, j) => (M < 10 && j ? `0${M}` : `${M}`).slice(-2),
    x = (M) => w(M, !0),
    v = (M) => `${M}`.replace(/[^\d]/g, '') || 0,
    k = (M) => (f && ((M = M % 12), M === 0) ? '12' : w(M, y)),
    R = E((M, j) => ((M = v(M)), Math.min(M, j)), []),
    [S, C] = Z(null),
    H = l || cs,
    G = R(H.getHours(), h),
    N = R(H.getMinutes(), m),
    L = G > 12,
    _ = k(G),
    A = x(N),
    O = $(() => g(new Date(0, 0, 0, G, N)), [G, N, g]),
    W = E(() => {
      C(!0);
    }, []),
    P = E(() => {
      const M = new Date(H);
      M.setHours(M.getHours() + (L ? -12 : 12)), c(M), a && a({ value: M });
    }, [H, L, a]),
    U = E(
      ({ value: M }) => {
        if (H.getHours() === M) return;
        const j = new Date(H);
        j.setHours(M), c(j), a && a({ value: j });
      },
      [H, a],
    ),
    T = E(
      ({ value: M }) => {
        if (H.getMinutes() === M) return;
        const j = new Date(H);
        j.setMinutes(M), c(j), a && a({ value: j });
      },
      [H, a],
    ),
    Y = E(
      (M) => (
        (M = R(M, h)),
        f && ((M = M * 1), M === 12 && (M = 0), L && (M += 12)),
        M
      ),
      [R, f, L],
    ),
    ne = E(() => {
      C(null);
    }, []);
  return /* @__PURE__ */ J('div', {
    className: `wx-7f497i wx-timepicker ${o ? 'wx-7f497i wx-error' : ''} ${s ? 'wx-7f497i wx-disabled' : ''}`,
    onClick: s ? void 0 : W,
    style: { cursor: s ? 'default' : 'pointer' },
    children: [
      /* @__PURE__ */ p(vn, {
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
        /* @__PURE__ */ p(sn, {
          onCancel: ne,
          width: 'unset',
          children: /* @__PURE__ */ J('div', {
            className: 'wx-7f497i wx-wrapper',
            children: [
              /* @__PURE__ */ J('div', {
                className: 'wx-7f497i wx-timer',
                children: [
                  /* @__PURE__ */ p('input', {
                    className: 'wx-7f497i wx-digit',
                    value: _,
                    onChange: (M) => {
                      const j = Y(M.target.value);
                      U({ value: j });
                    },
                  }),
                  /* @__PURE__ */ p('div', {
                    className: 'wx-7f497i wx-separator',
                    children: ':',
                  }),
                  /* @__PURE__ */ p('input', {
                    className: 'wx-7f497i wx-digit',
                    value: A,
                    onChange: (M) => {
                      const j = R(M.target.value, m);
                      T({ value: j });
                    },
                  }),
                  f &&
                    /* @__PURE__ */ p(eo, {
                      value: L,
                      onClick: P,
                      active: () =>
                        /* @__PURE__ */ p('span', { children: 'pm' }),
                      children: /* @__PURE__ */ p('span', { children: 'am' }),
                    }),
                ],
              }),
              /* @__PURE__ */ p(fn, {
                width: 'unset',
                children: /* @__PURE__ */ p(kr, {
                  label: u.hours,
                  value: G,
                  onChange: U,
                  max: h,
                }),
              }),
              /* @__PURE__ */ p(fn, {
                width: 'unset',
                children: /* @__PURE__ */ p(kr, {
                  label: u.minutes,
                  value: N,
                  onChange: T,
                  max: m,
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function ra({ children: n }) {
  return /* @__PURE__ */ p('div', {
    className: 'wx-KgpO9N wx-modal',
    children: /* @__PURE__ */ p('div', {
      className: 'wx-KgpO9N wx-window',
      children: n,
    }),
  });
}
function sa({ position: n = 'right', children: e, onCancel: t }) {
  const r = B(null);
  return (
    X(() => mn(r.current, t).destroy, []),
    /* @__PURE__ */ p('div', {
      ref: r,
      className: `wx-2L733M wx-sidearea wx-pos-${n}`,
      children: e,
    })
  );
}
function to({ theme: n = '', target: e, children: t }) {
  const r = B(null),
    s = B(null),
    [o, i] = Z(null);
  r.current || (r.current = document.createElement('div'));
  const a = He(xn);
  return (
    X(() => {
      i(e || oa(s.current) || lt.getTopNode(s.current));
    }, [s.current]),
    /* @__PURE__ */ J(Ve, {
      children: [
        /* @__PURE__ */ p('span', { ref: s, style: { display: 'none' } }),
        s.current && o
          ? ai(
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
function oa(n) {
  const e = lt.getTopNode(n);
  for (; n && n !== e && !n.getAttribute('data-wx-portal-root'); )
    n = n.parentNode;
  return n;
}
function ia() {
  return /* @__PURE__ */ p(Ve, {});
}
function us(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(xn.Provider, {
    value: 'material',
    children: /* @__PURE__ */ J(Ve, {
      children: [
        t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-material-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ J(Ve, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(ia, {}),
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
function no() {
  return /* @__PURE__ */ p(Ve, {});
}
function ds(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(xn.Provider, {
    value: 'willow',
    children: /* @__PURE__ */ J(Ve, {
      children: [
        t &&
          t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-willow-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ J(Ve, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(no, {}),
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
function fs(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(xn.Provider, {
    value: 'willow-dark',
    children: /* @__PURE__ */ J(Ve, {
      children: [
        t &&
          t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-willow-dark-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ J(Ve, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(no, {}),
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
Ar(lt);
const Kn = {
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
var aa = /* @__PURE__ */ new Date().valueOf(),
  la = () => aa++;
function ca(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t],
      s = e[t];
    if (!Xn(r, s)) return !1;
  }
  return !0;
}
function Xn(n, e) {
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
      for (let r = n.length - 1; r >= 0; r--) if (!Xn(n[r], e[r])) return !1;
      return !0;
    } else return ca(n, e);
  return n === e;
}
function On(n) {
  if (typeof n != 'object' || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(On);
  const e = {};
  for (const t in n) e[t] = On(n[t]);
  return e;
}
var ro = class {
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
  so = /* @__PURE__ */ new Date().valueOf(),
  ua = () => so++;
function Or() {
  return 'temp://' + so++;
}
var hs = class {
    constructor(n) {
      (this._data = n), (this._pool = /* @__PURE__ */ new Map());
      for (let e = 0; e < n.length; e++) {
        const t = n[e];
        this._pool.set(t.id, t);
      }
    }
    add(n) {
      (n = { id: ua(), ...n }), this._data.push(n), this._pool.set(n.id, n);
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
  da = class {
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
            : gs(r, t, e)
          : (r.data = [e]);
    }
    addAfter(e, t) {
      if (!t) return this.add(e, -1);
      const r = this.byId(t),
        s = this.byId(r.parent),
        o = Dn(s, r.id) + 1;
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
        o = Dn(s, r.id);
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
      const u = Dn(l, s.id);
      fa(l, u);
      const d = o ? c.data.length : Dn(c, i.id) + (t === 'after' ? 1 : 0);
      if ((gs(c, d, s), l.id === c.id && u === d)) return null;
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
      return t && oo(t, e), e;
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
function oo(n, e) {
  n.forEach((t) => {
    e.push(t), t.open === !0 && oo(t.data, e);
  });
}
function fa(n, e) {
  const t = [...n.data];
  t.splice(e, 1), (n.data = t);
}
function gs(n, e, t) {
  const r = [...n.data];
  r.splice(e, 0, t), (n.data = r);
}
function Dn(n, e) {
  return n?.data.findIndex((t) => t.id === e);
}
var io = 2,
  ha = class {
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
            i & io ? (o[d] = l.__trigger) : l.__trigger())
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
  ga = class {
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
          o.length = Math.max(...o.in.map((i) => ao(i, this._sources, 1)));
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
      const t = this._setter(e, io);
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
function ao(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => ao(o, e, t + 1));
  return Math.max(...s);
}
var pa = class {
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
function ma(n, e) {
  return typeof n == 'string'
    ? n.localeCompare(e, void 0, { numeric: !0 })
    : typeof n == 'object'
      ? n.getTime() - e.getTime()
      : (n ?? 0) - (e ?? 0);
}
function wa(n, e) {
  return typeof n == 'string'
    ? -n.localeCompare(e, void 0, { numeric: !0 })
    : typeof e == 'object'
      ? e.getTime() - n.getTime()
      : (e ?? 0) - (n ?? 0);
}
function xa({ key: n, order: e }) {
  const t = e === 'asc' ? ma : wa;
  return (r, s) => t(r[n], s[n]);
}
function ya(n) {
  if (!n || !n.length) return;
  const e = n.map((t) => xa(t));
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
function va(n, e) {
  return n.sort(ya(e));
}
let ka = class extends da {
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
    const t = e.id || Or(),
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
      (va(r, e),
      r.forEach((s) => {
        this.sortBranch(e, s.id);
      }));
  }
  serialize() {
    const e = [],
      t = this._pool.get(0).data;
    return t && lo(t, e), e;
  }
  clear() {
    this.forEach((e) => {
      this.remove(e.id);
    });
  }
};
function lo(n, e) {
  n.forEach((t) => {
    e.push(t), t.data && lo(t.data, e);
  });
}
function Pe(n) {
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
function qn(n, e) {
  const t = Pe(n);
  return isNaN(e) ? Dt(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function zr(n, e) {
  const t = Pe(n);
  if (isNaN(e)) return Dt(n, NaN);
  if (!e) return t;
  const r = t.getDate(),
    s = Dt(n, t.getTime());
  s.setMonth(t.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (t.setFullYear(s.getFullYear(), s.getMonth(), r), t);
}
function co(n, e) {
  const t = +Pe(n);
  return Dt(n, t + e);
}
const uo = 6048e5,
  ba = 864e5,
  fo = 6e4,
  ho = 36e5;
function Sa(n, e) {
  return co(n, e * ho);
}
let $a = {};
function go() {
  return $a;
}
function zn(n, e) {
  const t = go(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      t.weekStartsOn ??
      t.locale?.options?.weekStartsOn ??
      0,
    s = Pe(n),
    o = s.getDay(),
    i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function hn(n) {
  return zn(n, { weekStartsOn: 1 });
}
function Ca(n) {
  const e = Pe(n),
    t = e.getFullYear(),
    r = Dt(n, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = hn(r),
    o = Dt(n, 0);
  o.setFullYear(t, 0, 4), o.setHours(0, 0, 0, 0);
  const i = hn(o);
  return e.getTime() >= s.getTime()
    ? t + 1
    : e.getTime() >= i.getTime()
      ? t
      : t - 1;
}
function Wt(n) {
  const e = Pe(n);
  return e.setHours(0, 0, 0, 0), e;
}
function Wn(n) {
  const e = Pe(n),
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
function po(n, e) {
  const t = Wt(n),
    r = Wt(e),
    s = +t - Wn(t),
    o = +r - Wn(r);
  return Math.round((s - o) / ba);
}
function ps(n) {
  const e = Ca(n),
    t = Dt(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), hn(t);
}
function _a(n, e) {
  return co(n, e * fo);
}
function Na(n, e) {
  const t = e * 3;
  return zr(n, t);
}
function mo(n, e) {
  const t = e * 7;
  return qn(n, t);
}
function Ma(n, e) {
  return zr(n, e * 12);
}
function dn(n, e) {
  const t = Pe(n),
    r = Pe(e),
    s = t.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function Ta(n, e) {
  const t = Wt(n),
    r = Wt(e);
  return +t == +r;
}
function Wr(n, e) {
  const t = hn(n),
    r = hn(e),
    s = +t - Wn(t),
    o = +r - Wn(r);
  return Math.round((s - o) / uo);
}
function Da(n, e) {
  const t = Pe(n),
    r = Pe(e),
    s = t.getFullYear() - r.getFullYear(),
    o = t.getMonth() - r.getMonth();
  return s * 12 + o;
}
function Ea(n, e) {
  const t = Pe(n),
    r = Pe(e);
  return t.getFullYear() - r.getFullYear();
}
function Fr(n) {
  return (e) => {
    const t = (n ? Math[n] : Math.trunc)(e);
    return t === 0 ? 0 : t;
  };
}
function wo(n, e) {
  return +Pe(n) - +Pe(e);
}
function Ra(n, e, t) {
  const r = wo(n, e) / ho;
  return Fr(t?.roundingMethod)(r);
}
function Ia(n, e, t) {
  const r = wo(n, e) / fo;
  return Fr(t?.roundingMethod)(r);
}
function xo(n) {
  const e = Pe(n);
  return e.setHours(23, 59, 59, 999), e;
}
function Yr(n) {
  const e = Pe(n),
    t = e.getMonth();
  return (
    e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e
  );
}
function Ha(n) {
  const e = Pe(n);
  return +xo(e) == +Yr(e);
}
function yo(n, e) {
  const t = Pe(n),
    r = Pe(e),
    s = dn(t, r),
    o = Math.abs(Da(t, r));
  let i;
  if (o < 1) i = 0;
  else {
    t.getMonth() === 1 && t.getDate() > 27 && t.setDate(30),
      t.setMonth(t.getMonth() - s * o);
    let a = dn(t, r) === -s;
    Ha(Pe(n)) && o === 1 && dn(n, r) === 1 && (a = !1),
      (i = s * (o - Number(a)));
  }
  return i === 0 ? 0 : i;
}
function Aa(n, e, t) {
  const r = yo(n, e) / 3;
  return Fr(t?.roundingMethod)(r);
}
function La(n, e) {
  const t = Pe(n),
    r = Pe(e),
    s = dn(t, r),
    o = Math.abs(Ea(t, r));
  t.setFullYear(1584), r.setFullYear(1584);
  const i = dn(t, r) === -s,
    a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function gn(n) {
  const e = Pe(n),
    t = e.getMonth(),
    r = t - (t % 3);
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function vo(n) {
  const e = Pe(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Pa(n) {
  const e = Pe(n),
    t = e.getFullYear();
  return e.setFullYear(t + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function Oa(n) {
  const e = Pe(n),
    t = Dt(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function za(n) {
  const e = Pe(n);
  return e.setMinutes(59, 59, 999), e;
}
function Wa(n, e) {
  const t = go(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      t.weekStartsOn ??
      t.locale?.options?.weekStartsOn ??
      0,
    s = Pe(n),
    o = s.getDay(),
    i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function Br(n) {
  const e = Pe(n),
    t = e.getMonth(),
    r = t - (t % 3) + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function ko(n) {
  const e = Pe(n),
    t = e.getFullYear(),
    r = e.getMonth(),
    s = Dt(n, 0);
  return s.setFullYear(t, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Fa(n) {
  const e = Pe(n).getFullYear();
  return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
function bo(n) {
  const e = Pe(n);
  return String(new Date(e)) === 'Invalid Date' ? NaN : Fa(e) ? 366 : 365;
}
function Ya(n) {
  const e = ps(n),
    t = +ps(mo(e, 60)) - +e;
  return Math.round(t / uo);
}
function Xt(n, e) {
  const t = Pe(n),
    r = Pe(e);
  return +t == +r;
}
function Ba(n) {
  const e = Pe(n);
  return e.setMinutes(0, 0, 0), e;
}
function Va(n, e, t) {
  const r = zn(n, t),
    s = zn(e, t);
  return +r == +s;
}
function Ua(n, e) {
  const t = Pe(n),
    r = Pe(e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function Ga(n, e) {
  const t = gn(n),
    r = gn(e);
  return +t == +r;
}
function ja(n, e) {
  const t = Pe(n),
    r = Pe(e);
  return t.getFullYear() === r.getFullYear();
}
const br = {
    year: La,
    quarter: Aa,
    month: yo,
    week: Wr,
    day: po,
    hour: Ra,
    minute: Ia,
  },
  Ft = {
    year: { quarter: 4, month: 12, week: Ya, day: Ka, hour: Xa },
    quarter: { month: 3, week: qa, day: So, hour: Qa },
    month: { week: Za, day: Ja, hour: el },
    week: { day: 7, hour: 168 },
    day: { hour: 24 },
    hour: { minute: 60 },
  };
function Ka(n) {
  return n ? bo(n) : 365;
}
function Xa(n) {
  return bo(n) * 24;
}
function qa(n) {
  const e = gn(n),
    t = qn(Wt(Br(n)), 1);
  return Wr(t, e);
}
function So(n) {
  if (n) {
    const e = gn(n),
      t = Br(n);
    return po(t, e) + 1;
  }
  return 91;
}
function Qa(n) {
  return So(n) * 24;
}
function Za(n) {
  if (n) {
    const e = vo(n),
      t = qn(Wt(Yr(n)), 1);
    return Wr(t, e);
  }
  return 5;
}
function Ja(n) {
  return n ? ko(n) : 30;
}
function el(n) {
  return ko(n) * 24;
}
function Fn(n, e, t) {
  const r = Ft[n][e];
  return r ? (typeof r == 'number' ? r : r(t)) : 1;
}
function tl(n, e) {
  return n === e || !!(Ft[n] && Ft[n][e]);
}
const Yn = {
  year: Ma,
  quarter: Na,
  month: zr,
  week: mo,
  day: qn,
  hour: Sa,
  minute: _a,
};
function Vr(n, e, t) {
  if (e) {
    if (n === 'day') return (r, s) => e.getWorkingDays(s, r, !0);
    if (n === 'hour') return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => {
    const a = Ft[n]?.[o];
    return !a || typeof a == 'number' || _o(n, r, s, t)
      ? cn(n, r, s, o, i, t)
      : nl(r, s, n, o, i, t);
  };
}
function cn(n, e, t, r, s, o) {
  const i = r || n;
  let a = t,
    l = e;
  if (
    (s && ((a = Tt(i, t, o)), (l = Tt(i, e, o)), l < e && (l = kt(i)(l, 1))),
    n !== i)
  ) {
    const c = br[i](l, a),
      u = Fn(n, i, t);
    return c / u;
  } else return br[i](l, a);
}
function nl(n, e, t, r, s, o) {
  let i = 0;
  const a = Tt(t, e, o);
  if (e > a) {
    const c = Yn[t](a, 1);
    (i = cn(t, c, e, r, void 0, o)), (e = c);
  }
  let l = 0;
  return (
    _o(t, e, n, o) ||
      ((l = cn(t, Tt(t, n, o), e, void 0, void 0, o)), (e = Yn[t](e, l))),
    (l += i + cn(t, n, e, r, void 0, o)),
    !l && s && (l = cn(t, n, e, r, s, o)),
    l
  );
}
function kt(n, e) {
  if (e) {
    if (n === 'day') return (t, r) => e.addWorkingDays(t, r, !0);
    if (n === 'hour') return (t, r) => e.addWorkingHours(t, r);
  }
  return Yn[n];
}
const $o = {
  year: Oa,
  quarter: gn,
  month: vo,
  week: (n, e) => zn(n, { weekStartsOn: e }),
  day: Wt,
  hour: Ba,
};
function Tt(n, e, t) {
  const r = $o[n];
  return r ? r(e, t) : new Date(e);
}
const rl = {
    year: Pa,
    quarter: Br,
    month: Yr,
    week: (n, e) => Wa(n, { weekStartsOn: e }),
    day: xo,
    hour: za,
  },
  Co = {
    year: ja,
    quarter: Ga,
    month: Ua,
    week: (n, e, t) => Va(n, e, { weekStartsOn: t }),
    day: Ta,
  };
function _o(n, e, t, r) {
  const s = Co[n];
  return s ? s(e, t, r) : !1;
}
const sl = {
    start: $o,
    end: rl,
    add: Yn,
    isSame: Co,
    diff: br,
    smallerCount: Ft,
  },
  ms = (n) => (typeof n == 'function' ? n(/* @__PURE__ */ new Date()) : n);
function ol(n, e) {
  for (const t in e) {
    if (t === 'smallerCount') {
      const r = Object.keys(e[t])
        .sort((a, l) => xt.indexOf(a) - xt.indexOf(l))
        .shift();
      let s = xt.indexOf(r);
      const o = e[t][r],
        i = ms(o);
      for (let a = s - 1; a >= 0; a--) {
        const l = xt[a],
          c = ms(Ft[l][r]);
        if (i <= c) break;
        s = a;
      }
      xt.splice(s, 0, n);
    }
    if (t === 'biggerCount') for (const r in e[t]) Ft[r][n] = e[t][r];
    else sl[t][n] = e[t];
  }
}
function ir(n, e = 1, t) {
  return (
    t.isWorkingDay(n) ||
      (n = e > 0 ? t.getNextWorkingDay(n) : t.getPreviousWorkingDay(n)),
    n
  );
}
function il(n) {
  return (e, t) => {
    if (t > 0) for (let r = 0; r < t; r++) e = n.getNextWorkingDay(e);
    if (t < 0) for (let r = 0; r > t; r--) e = n.getPreviousWorkingDay(e);
    return e;
  };
}
function en(n) {
  const e = /* @__PURE__ */ new Date();
  return n
    .map((t) => ({ item: t, len: kt(t.unit)(e, 1) }))
    .sort((t, r) => (t.len < r.len ? -1 : 1))[0].item;
}
const xt = ['year', 'quarter', 'month', 'week', 'day', 'hour'],
  Sr = 50,
  $r = 300;
function al(n, e, t, r, s, o) {
  const i = !n || t,
    a = !e || t;
  let l = n,
    c = e,
    u = !1,
    d = !1;
  (i || a) &&
    (s?.forEach((h) => {
      i && (!l || h.start <= l) && ((l = h.start), (u = !0));
      const m = h.type === 'milestone' ? h.start : h.end;
      a && (!c || m >= c) && ((c = m), (d = !0));
    }),
    o?.forEach((h) => {
      i && (!l || h.start <= l) && ((l = h.start), (u = !0)),
        a && (!c || h.start >= c) && ((c = h.start), (d = !0));
    }));
  const f = kt(r || 'day');
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
function ll(n, e, t, r, s, o, i) {
  const a = en(i).unit,
    l = Vr(a, void 0, o),
    c = l(e, n, '', !0),
    u = Tt(a, e, o);
  (n = Tt(a, n, o)), (e = u < e ? kt(a)(u, 1) : u);
  const d = c * r,
    f = s * i.length,
    h = i.map((g) => {
      const y = [],
        w = kt(g.unit);
      let x = Tt(g.unit, n, o);
      for (; x < e; ) {
        const v = w(x, g.step),
          k = x < n ? n : x,
          R = v > e ? e : v,
          S = l(R, k, '', !0) * r,
          C = typeof g.format == 'function' ? g.format(x, v) : g.format;
        let H = '';
        g.css && (H += typeof g.css == 'function' ? g.css(x) : g.css),
          y.push({ width: S, value: C, date: k, css: H, unit: g.unit }),
          (x = v);
      }
      return { cells: y, add: w, height: s };
    });
  let m = r;
  return (
    a !== t && (m = m / Fn(a, t)),
    {
      rows: h,
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
function cl(n, e, t, r) {
  const s = typeof n == 'boolean' ? {} : n,
    o = xt.indexOf(en(t).unit);
  if ((typeof s.level > 'u' && (s.level = o), s.levels))
    s.levels.forEach((l) => {
      l.minCellWidth || (l.minCellWidth = En(s.minCellWidth, Sr)),
        l.maxCellWidth || (l.maxCellWidth = En(s.maxCellWidth, $r));
    });
  else {
    const l = [],
      c = t.length || 1,
      u = En(s.minCellWidth, Sr),
      d = En(s.maxCellWidth, $r);
    t.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }),
      xt.forEach((f, h) => {
        if (h === o) l.push({ minCellWidth: u, maxCellWidth: d, scales: t });
        else {
          const m = [];
          if (h)
            for (let g = c - 1; g > 0; g--) {
              const y = xt[h - g];
              y && m.push({ unit: y, step: 1, format: e[y] });
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
function ul(n, e, t, r, s, o, i) {
  n.level = t;
  let a;
  const l = r.scales || r,
    c = en(l).unit,
    u = dl(c, s);
  if (e === -1) {
    const h = Fn(c, s);
    a = i * h;
  } else {
    const h = Fn(en(o).unit, c);
    a = Math.round(i / h);
  }
  const d = r.minCellWidth ?? Sr,
    f = r.maxCellWidth ?? $r;
  return {
    scales: l,
    cellWidth: Math.min(f, Math.max(d, a)),
    lengthUnit: u,
    zoom: n,
  };
}
function dl(n, e) {
  const t = xt.indexOf(n),
    r = xt.indexOf(e);
  return r >= t ? (n === 'hour' ? 'hour' : 'day') : xt[r];
}
function En(n, e) {
  return n ?? e;
}
const Cr = 8,
  No = 4,
  fl = 3,
  ws = 7,
  hl = Cr + No;
function Mo(n, e, t) {
  (n.open || n.type != 'summary') &&
    n.data?.forEach((r) => {
      typeof r.$x > 'u' && Do(r, t), (r.$x += e), Mo(r, e, t);
    });
}
function _r(n, e, t, r) {
  const s = n.getSummaryId(e.id);
  if (s) {
    const o = n.byId(s),
      i = { xMin: 1 / 0, xMax: 0 };
    r && Ro(o, t),
      To(o, i, t),
      (o.$x = i.xMin),
      (o.$w = i.xMax - i.xMin),
      _r(n, o, t);
  }
}
function To(n, e, t) {
  n.data?.forEach((r) => {
    if (!r.unscheduled) {
      typeof r.$x > 'u' && Do(r, t);
      const s = r.type === 'milestone' && r.$h ? r.$h / 2 : 0;
      e.xMin > r.$x + s && (e.xMin = r.$x + s);
      const o = r.$x + r.$w - s;
      e.xMax < o && (e.xMax = o);
    }
    r.type !== 'summary' && To(r, e, t);
  });
}
function Do(n, e) {
  const { _scales: t, cellWidth: r } = e;
  (n.$x = Math.round(t.diff(n.start, t.start, t.lengthUnit) * r)),
    (n.$w = Math.round(t.diff(n.end, n.start, t.lengthUnit, !0) * r));
}
function Ur(n, e) {
  let t;
  e && (t = e.filter((s) => s.parent == n.id));
  const r = { data: t, ...n };
  if (r.data?.length)
    r.data.forEach((s) => {
      if (s.unscheduled && !s.data) return;
      (e || (s.type != 'summary' && s.data)) &&
        (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }),
        (s = Ur(s, e))),
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
function Eo(n, e, t) {
  return (
    Nr(n, e, t, !1),
    t.splitTasks &&
      n.segments?.forEach((r) => {
        Eo(r, e, { ...t, baselines: !1 }), (r.$x -= n.$x);
      }),
    t.baselines && Nr(n, e, t, !0),
    n
  );
}
function Nr(n, e, t, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: a } = t,
    { start: l, end: c, lengthUnit: u, diff: d } = i,
    f = (r ? 'base_' : '') + 'start',
    h = (r ? 'base_' : '') + 'end',
    m = '$x' + (r ? '_base' : ''),
    g = '$y' + (r ? '_base' : ''),
    y = '$w' + (r ? '_base' : ''),
    w = '$h' + (r ? '_base' : ''),
    x = '$skip' + (r ? '_baseline' : '');
  let v = n[f],
    k = n[h];
  if (r && !v) {
    n[x] = !0;
    return;
  }
  n[f] < l && (n[h] < l || Xt(n[h], l)) ? (v = k = l) : n[f] > c && (v = k = c),
    (n[m] = Math.round(d(v, l, u) * s)),
    (n[y] = Math.round(d(k, v, u, !0) * s)),
    e !== null && (n[g] = r ? n.$y + n.$h + No : o * e + fl),
    (n[w] = r ? Cr : a ? o - ws - hl : o - ws),
    n.type === 'milestone' &&
      ((n[m] = n[m] - n.$h / 2),
      (n[y] = n.$h),
      r && ((n[g] = n.$y + Cr), (n[y] = n[w] = n.$h))),
    t.unscheduledTasks && n.unscheduled && !r
      ? (n.$skip = !0)
      : (n[x] = Xt(v, k));
}
function Ro(n, e, t) {
  n.data &&
    !n.$skip &&
    ((t = t || !n.open),
    n.data.forEach((r) => {
      t && Nr(r, null, e, !1), Ro(r, e, t);
    }));
}
const ar = 20,
  gl = function (n, e, t, r, s) {
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
      const f = ml(l, c + o, u, d + o, i, a, r / 2, s),
        h = wl(u, d + o, a);
      (n.$p = `${f},${h}`), (n.$pl = pl(n.$p));
    }
    return n;
  };
function pl(n) {
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
function ml(n, e, t, r, s, o, i, a) {
  const l = ar * (s ? -1 : 1),
    c = ar * (o ? -1 : 1),
    u = n + l,
    d = t + c,
    f = [n, e, u, e, 0, 0, 0, 0, d, r, t, r],
    h = d - u;
  let m = r - e;
  const g = o === s;
  return (
    g ||
      (((d <= n + ar - 2 && o) || (d > n && !o)) &&
        (m = a ? m - i + 6 : m - i)),
    (g && o && u > d) || (g && !o && u < d)
      ? ((f[4] = f[2] + h), (f[5] = f[3]), (f[6] = f[4]), (f[7] = f[5] + m))
      : ((f[4] = f[2]), (f[5] = f[3] + m), (f[6] = f[4] + h), (f[7] = f[5])),
    f.join(',')
  );
}
function wl(n, e, t) {
  return t
    ? `${n - 5},${e - 3},${n - 5},${e + 3},${n},${e}`
    : `${n + 5},${e + 3},${n + 5},${e - 3},${n},${e}`;
}
function Io(n) {
  return n.map((e) => {
    const t = e.id || Or();
    return { ...e, id: t };
  });
}
const Ho = ['start', 'end', 'duration'];
function xl(n, e) {
  const { type: t, unscheduled: r } = n;
  return r || t === 'summary'
    ? !Ho.includes(e)
    : t === 'milestone'
      ? !['end', 'duration'].includes(e)
      : !0;
}
function yl(n, e) {
  return typeof e == 'function'
    ? e
    : Ho.includes(n)
      ? (typeof e == 'string' && (e = { type: e, config: {} }),
        e.config || (e.config = {}),
        e.type === 'datepicker' && (e.config.buttons = ['today']),
        (t, r) => (xl(t, r.id) ? e : null))
      : e;
}
function vl(n) {
  return !n || !n.length
    ? []
    : n.map((e) => {
        const t = e.align || 'left',
          r = e.id === 'add-task',
          s = !r && e.flexgrow ? e.flexgrow : null,
          o = s ? 1 : e.width || (r ? 50 : 120),
          i = e.editor && yl(e.id, e.editor);
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
const Ao = [
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
function qt(n, e, t, r) {
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
    h = !i && u.includes(e),
    m = { parent: d.includes(e), level: f[e] };
  if (((t = t || (i ? s[s.length - 1] : null)), !(!t && !h))) {
    if (
      (e !== 'paste-task' && (n._temp = null),
      a.includes(e) || h || s.length === 1)
    )
      xs(n, e, t, r);
    else if (i) {
      const g = l.includes(e) ? s : kl(s, o, m);
      c.includes(e) && g.reverse();
      const y = n.getHistory();
      y && y.startBatch(),
        g.forEach((w, x) => xs(n, e, w, r, x)),
        y && y.endBatch();
    }
  }
}
function kl(n, e, t) {
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
function xs(n, e, t, r, s) {
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
      const h = /* @__PURE__ */ new Map();
      if (
        (n._temp.forEach((m) => {
          const g = { id: m.id, target: l, mode: 'after' };
          o(m.cut ? 'move-task' : 'copy-task', g), h.set(m.id, g.id);
        }),
        !n._temp[0].cut)
      ) {
        const { links: m } = n.getState(),
          g = n._temp.map((w) => w.id),
          y = [];
        m.forEach((w) => {
          g.includes(w.source) && g.includes(w.target) && y.push(w);
        }),
          y.forEach((w) => {
            o('add-link', {
              link: {
                source: h.get(w.source),
                target: h.get(w.target),
                type: w.type,
              },
            });
          }),
          n._temp.forEach((w, x) => {
            o('select-task', { id: h.get(w.id), toggle: !!x });
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
      { segmentIndex: h } = t,
      m = f.segments.filter((g, y) => y !== h);
    o('update-task', { id: l, task: { segments: m } });
    return;
  }
  typeof a < 'u' && (u = { mode: a, ...u }),
    (c = { ...c, ...u }),
    o(i, c),
    d && o('select-task', { id: c.id, toggle: !!s });
}
function Gr(n, e) {
  return n.some((t) => (t.data ? Gr(t.data, e) : t.id === e));
}
const ys = (n, e) => kt(n, e),
  bl = (n, e) => Vr(n, e);
function Mr(n, e) {
  Array.isArray(n) &&
    (n.forEach((t) => Pt(t, e)),
    n.forEach((t) => {
      if (t.type === 'summary' && !(t.start && t.end)) {
        const { start: r, end: s } = Ur(t, n);
        (t.start = r), (t.end = s), Pt(t, e);
      }
    }));
}
function Pt(n, e) {
  n.unscheduled || vs(n, e, !1), n.base_start && vs(n, e, !0);
}
function vs(n, e, t) {
  const { calendar: r, durationUnit: s } = e,
    o = s || 'day',
    [i, a, l] = Lo(t);
  n.type === 'milestone'
    ? ((n[l] = 0), (n[a] = void 0))
    : n[i] &&
      (n[l]
        ? (n[a] = ys(o, r)(n[i], n[l]))
        : n[a]
          ? (n[l] = bl(o, r)(n[a], n[i]))
          : ((n[a] = ys(o, r)(n[i], 1)), (n[l] = 1)));
}
function Lo(n) {
  return n
    ? ['base_start', 'base_end', 'base_duration']
    : ['start', 'end', 'duration'];
}
function ks(n, e, t) {
  const [r, s, o] = Lo(t);
  (e === o || e === r) && (n[s] = null),
    e === s &&
      ((n[o] = 0), n[r] && n[r] >= n[s] && ((n[s] = null), (n[o] = 1)));
}
function Po(n, e, t) {
  ks(n, t, !1), n.base_start && ks(n, t, !0), Pt(n, e);
}
class Sl extends ha {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }),
      (this._router = new ga(
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
                const h = en(u).unit,
                  m = al(a, l, d, h, c, f);
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
                h = en(d).unit;
              tl(h, i) || (i = h);
              const m = ll(a, l, i, c, u, f, d);
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
                  .map((h, m) =>
                    Eo(h, m, {
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
                      h = o.byId(d.target);
                    return gl(d, f, h, a, l);
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
          tasks: (s) => new ka(s),
          links: (s) => new hs(s),
          columns: (s) => vl(s),
        },
      ));
    const t = (this.in = new pa());
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
          let h = !1,
            m;
          if (c.length && (o || i)) {
            const y = [...c];
            if (i) {
              const w = y[y.length - 1],
                x = u.findIndex((C) => C.id == w),
                v = u.findIndex((C) => C.id == s),
                k = Math.min(x, v),
                R = Math.max(x, v) + 1,
                S = u.slice(k, R).map((C) => C.id);
              x > v && S.reverse(),
                S.forEach((C) => {
                  y.includes(C) || y.push(C);
                });
            } else if (o) {
              const w = y.findIndex((x) => x == s);
              w === -1 ? y.push(s) : ((h = !0), y.splice(w, 1));
            }
            m = y;
          } else m = [s];
          const g = { selected: m };
          a && m.length && (g._scrollTask = { id: m[0], mode: a }),
            this.setStateAsync(g),
            !h &&
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
          (o.id = o.id || Or()),
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
          const h = u.parent === 0;
          if (f === 0 && h) {
            s.skipProvider = !0;
            return;
          }
          (f -= 1), (i = 'before');
        } else if (i === 'down') {
          const h = f === d.length - 1,
            m = u.parent === 0;
          if (h && m) {
            s.skipProvider = !0;
            return;
          }
          (f += 1), (i = 'after');
        }
        if (((a = (d[f] && d[f].id) || u.parent), a)) {
          const h = o.getBranch(a);
          let m = o.getIndexById(a),
            g = h[m];
          if (g.data) {
            if (i === 'before') {
              if (g.parent === u.parent) {
                for (; g.data; )
                  g.open || t.exec('open-task', { id: g.id, mode: !0 }),
                    (g = g.data[g.data.length - 1]);
                a = g.id;
              }
            } else if (i === 'after') {
              let x;
              g.parent === u.parent
                ? ((x = g), (g = g.data[0]), (a = g.id), (i = 'before'))
                : h.length - 1 !== m &&
                  ((x = g),
                  (m += 1),
                  (g = h[m]),
                  u.$level > g.$level && g.data
                    ? ((x = g), (g = g.data[0]), (a = g.id), (i = 'before'))
                    : (a = g.id)),
                x && !x.open && t.exec('open-task', { id: x.id, mode: !0 });
            }
          }
          const y = o.getSummaryId(u.id);
          o.move(l, i, a);
          const w = o.getSummaryId(l);
          y != w &&
            (y && this.resetSummaryDates(y, 'move-task'),
            w && this.resetSummaryDates(w, 'move-task'));
        }
      } else {
        const d = o.byId(a);
        let f = d,
          h = !1;
        for (; f.$level > u.$level; )
          (f = o.byId(f.parent)), f.id === l && (h = !0);
        if (h) return;
        const m = o.getSummaryId(u.id);
        if ((o.move(l, i, a), i == 'child')) {
          let y = d;
          for (; y.id !== 0 && !y.open; )
            t.exec('open-task', { id: y.id, mode: !0 }), (y = o.byId(y.parent));
        }
        const g = o.getSummaryId(l);
        m != g &&
          (m && this.resetSummaryDates(m, 'move-task'),
          g && this.resetSummaryDates(g, 'move-task'));
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
          { left: h, top: m, width: g, start: y, inProgress: w } = s,
          x = { _tasks: a, _selected: l };
        if (
          (typeof g < 'u' &&
            ((f.$w = g), _r(i, f, { _scales: c, cellWidth: u })),
          typeof h < 'u')
        ) {
          if (f.type === 'summary') {
            const v = h - f.$x;
            Mo(f, v, { _scales: c, cellWidth: u });
          }
          (f.$x = h), _r(i, f, { _scales: c, cellWidth: u, cellHeight: d }, !y);
        }
        typeof m < 'u' && ((f.$y = m + 4), (f.$reorder = w)), this.setState(x);
      }),
      t.on('update-task', (s) => {
        const { id: o, segmentIndex: i, diff: a, eventSource: l } = s;
        let { task: c } = s;
        const {
            tasks: u,
            _scales: d,
            durationUnit: f,
            splitTasks: h,
            calendar: m,
          } = this.getState(),
          g = u.byId(o),
          y = { durationUnit: f, calendar: m };
        if (
          l === 'add-task' ||
          l === 'copy-task' ||
          l === 'move-task' ||
          l === 'update-task' ||
          l === 'delete-task' ||
          l === 'provide-data'
        ) {
          Pt(c, y), u.update(o, c);
          return;
        }
        const w = d.lengthUnit;
        let x = kt(w);
        const v = Vr(f, m);
        if (
          (a &&
            (c.start && (c.start = x(c.start, a)),
            !i &&
              i !== 0 &&
              (c.start && c.end
                ? (c.duration = g.duration)
                : (c.start
                    ? (c.end = g.end)
                    : ((c.end = x(c.end, a)),
                      (c.start = g.start),
                      (c.duration = v(c.end, c.start))),
                  v(c.end, c.start) || (c.duration = 1)))),
          (c.type = c.type ?? g.type),
          m && c.start && (c.start = ir(c.start, a, m)),
          c.start &&
            c.end &&
            (!Xt(c.start, g.start) || !Xt(c.end, g.end)) &&
            c.type === 'summary' &&
            g.data?.length)
        ) {
          let R = a || v(c.start, g.start);
          m &&
            ((R =
              c.start > g.start ? v(c.start, g.start) : -v(g.start, c.start)),
            (x = il(m))),
            this.moveSummaryKids(
              g,
              (S) => ((S = x(S, R)), m ? ir(S, a, m) : S),
              'update-task',
            );
        }
        c.start || (c.start = g.start),
          !c.end && !c.duration && (c.duration = g.duration),
          Pt(c, y),
          u.update(o, c),
          ((m && c.type === 'summary') ||
            (c.type === 'summary' && g.type !== 'summary')) &&
            this.resetSummaryDates(o, 'update-task', !0);
        const k = u.getSummaryId(o);
        k && this.resetSummaryDates(k, 'update-task'),
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
          { target: d, mode: f, task: h, show: m, select: g = !0 } = s;
        !s.eventSource && a && (h.unscheduled = !0);
        let y = -1,
          w,
          x;
        if (
          (d
            ? ((x = o.byId(d)),
              f == 'child'
                ? ((w = x), (h.parent = w.id))
                : (x.parent !== null &&
                    ((w = o.byId(x.parent)), (h.parent = w.id)),
                  (y = o.getIndexById(d)),
                  f == 'after' && (y += 1)))
            : h.parent && (w = o.byId(h.parent)),
          !h.start)
        ) {
          if (w?.start) h.start = new Date(w.start.valueOf());
          else if (x) h.start = new Date(x.start.valueOf());
          else {
            const S = o.getBranch(0);
            let C;
            if (S?.length) {
              const H = S[S.length - 1];
              if (!H.$skip) {
                const G = new Date(H.start.valueOf());
                i.start <= G && (C = G);
              }
            }
            h.start = C || kt(l, u)(i.start, 1);
          }
          h.duration = 1;
        }
        u && (h.start = ir(h.start, 1, u)),
          this.getState().baselines &&
            ((h.base_start = h.start), (h.base_duration = h.duration)),
          Pt(h, { durationUnit: l, calendar: u });
        const v = o.add(h, y),
          k = { tasks: o };
        if (w && m) {
          for (; w && w.id; )
            t.exec('open-task', { id: w.id, mode: !0 }), (w = o.byId(w.parent));
          k._scrollTask = { id: v.id, mode: m };
        }
        s.id = v.id;
        const R = o.getSummaryId(v.id);
        R && this.resetSummaryDates(R, 'add-task'),
          this.setStateAsync(k),
          (s.id = v.id),
          (s.task = v),
          g && t.exec('select-task', { id: v.id });
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
        let h = c.getIndexById(i);
        a == 'before' && (h -= 1);
        const m = c.byId(o),
          g = c.copy(m, c.byId(i).parent, h + 1);
        (s.source = s.id),
          (s.id = g[0][1]),
          m.lazy && (s.lazy = !0),
          d != f && f && this.resetSummaryDates(f, 'copy-task');
        let y = [];
        for (let w = 1; w < g.length; w++) {
          const [x, v] = g[w];
          u.forEach((k) => {
            if (k.source === x) {
              const R = { ...k };
              delete R.target, y.push({ ...R, source: v });
            } else if (k.target === x) {
              const R = { ...k };
              delete R.source, y.push({ ...R, target: v });
            }
          });
        }
        y = y.reduce((w, x) => {
          const v = w.findIndex((k) => k.id === x.id);
          return v > -1 ? (w[v] = { ...w[v], ...x }) : w.push(x), w;
        }, []);
        for (let w = 1; w < g.length; w++) {
          const [x, v] = g[w],
            k = c.byId(v);
          t.exec('copy-task', {
            source: x,
            id: v,
            lazy: !!k.lazy,
            eventSource: 'copy-task',
            target: k.parent,
            mode: 'child',
            skipUndo: !0,
          });
        }
        y.forEach((w) => {
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
          Mr(s.data.tasks, { durationUnit: a, calendar: l }),
          o.parse(s.data.tasks, s.id),
          u.type == 'summary' && this.resetSummaryDates(u.id, 'provide-data'),
          this.setStateAsync({
            tasks: o,
            links: new hs(i.map((d) => d).concat(Io(s.data.links))),
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
        const h = f + s * 50,
          m = i.levels[i.level],
          g = s < 0 && a > m.maxCellWidth;
        if (h < m.minCellWidth || h > m.maxCellWidth || g) {
          if (!this.changeScale(i, s)) return;
        } else this.setState({ cellWidth: h, _cellWidth: h });
        const {
            _scales: y,
            _start: w,
            cellWidth: x,
            _weekStart: v,
          } = this.getState(),
          k = Tt(y.minUnit, w, v),
          R = y.diff(d, k, 'hour');
        typeof o > 'u' && (o = x);
        let S = Math.round(R * x) - o;
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
          h = kt(i.minUnit);
        let m = i.width;
        if (a && l) {
          if (m < s && m) {
            const v = s / m;
            this.setState({ cellWidth: u * v });
          }
          return !0;
        }
        let g = 0;
        for (; m < s; ) (m += u), g++;
        const y = g && l ? -g : 0,
          w = a || h(o, y);
        let x = 0;
        if (d) {
          const v = i.diff(d, w, 'hour');
          x = Math.max(0, Math.round(v * u) - (f || 0));
        }
        this.setState({ _start: w, _end: l || h(c, g), scrollLeft: x });
      }),
      t.on('sort-tasks', ({ key: s, order: o, add: i }) => {
        const a = this.getState(),
          { tasks: l } = a;
        let c = a._sort;
        const u = { key: s, order: o };
        let d = c?.length || 0;
        d && i
          ? (c.forEach((f, h) => {
              f.key === s && (d = h);
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
            qt(this, 'copy-task', null, null);
            break;
          }
          case 'ctrl+x': {
            qt(this, 'cut-task', null, null);
            break;
          }
          case 'ctrl+v': {
            qt(this, 'paste-task', null, null);
            break;
          }
          case 'ctrl+d':
          case 'backspace': {
            o.preventDefault(), qt(this, 'delete-task', null, null);
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
        l = ul(e, t, r, s, a.lengthUnit, i, o);
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
      const u = Ur({ ...l, start: void 0, end: void 0, duration: void 0 });
      if (!Xt(l.start, u.start) || !Xt(l.end, u.end)) {
        r
          ? (Pt(u, { durationUnit: o, calendar: a }), s.update(e, u))
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
    return kt('hour')(Tt(t.minUnit, r, s), Math.floor(e / o));
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
function $l(n, e, t, r) {
  if (typeof document > 'u') return '';
  const s = document.createElement('canvas');
  {
    const o = Cl(s, n, e, 1, t);
    _l(o, r, 0, n, 0, e);
  }
  return s.toDataURL();
}
function Cl(n, e, t, r, s) {
  n.setAttribute('width', (e * r).toString()),
    n.setAttribute('height', (t * r).toString());
  const o = n.getContext('2d');
  return o.translate(-0.5, -0.5), (o.strokeStyle = s), o;
}
function _l(n, e, t, r, s, o) {
  n.beginPath(),
    n.moveTo(r, s),
    n.lineTo(r, o),
    e === 'full' && n.lineTo(t, o),
    n.stroke();
}
const Qn = [
  { id: 'task', label: 'Task' },
  { id: 'summary', label: 'Summary task' },
  { id: 'milestone', label: 'Milestone' },
];
function Tr(n) {
  let e = [...Oo];
  const t = n?.taskTypes || Qn,
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
function jr(n) {
  return n.map((e) => {
    switch ((e.data && jr(e.data), e.id)) {
      case 'add-task:before':
      case 'move-task:up':
        e.isDisabled = (t, r) => Ml(t, r);
        break;
      case 'move-task:down':
        e.isDisabled = (t, r) => Tl(t, r);
        break;
      case 'indent-task:add':
        e.isDisabled = (t, r) => Dl(t, r) === t.parent;
        break;
      case 'indent-task:remove':
        e.isDisabled = (t) => Nl(t);
        break;
    }
    return e;
  });
}
function Nl(n) {
  return n.parent === 0;
}
function Ml(n, e) {
  const { _tasks: t } = e;
  return t[0]?.id === n.id;
}
function Tl(n, e) {
  const { _tasks: t } = e;
  return t[t.length - 1]?.id === n.id;
}
function Dl(n, e) {
  const { _tasks: t } = e,
    r = t.findIndex((s) => s.id === n.id);
  return t[r - 1]?.id ?? n.parent;
}
function bs(n) {
  return n && typeof n == 'object';
}
function El(n) {
  return !n.selected || n.selected.length < 2;
}
const Rl = (n) => (e) => e.type === n,
  Oo = jr([
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
        isDisabled: Rl(n.id),
      }),
    },
    {
      id: 'edit-task',
      text: 'Edit',
      icon: 'wxi-edit',
      isHidden: (n, e, t) => bs(t),
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
      isHidden: (n, e, t) => El(e) && bs(t),
    },
  ]);
function Dr(n) {
  return [...zo];
}
const zo = jr([
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
function lr(n) {
  return n.type === 'summary';
}
function cr(n) {
  return n.type === 'milestone';
}
function ur(n) {
  return typeof n.parent > 'u';
}
function dr(n, e) {
  return e.unscheduledTasks && n.unscheduled;
}
function Wo(n) {
  const e = Fo.map((r) => ({ ...r })),
    t = e.find((r) => r.key == 'type');
  return (t.options = n?.taskTypes || Qn), e;
}
const Fo = [
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
    { key: 'type', comp: 'select', label: 'Type', isHidden: (n) => ur(n) },
    {
      key: 'start',
      comp: 'date',
      label: 'Start date',
      isHidden: (n) => lr(n),
      isDisabled: dr,
    },
    {
      key: 'end',
      comp: 'date',
      label: 'End date',
      isHidden: (n) => lr(n) || cr(n),
      isDisabled: dr,
    },
    {
      key: 'duration',
      comp: 'counter',
      label: 'Duration',
      config: { min: 1 },
      isHidden: (n) => lr(n) || cr(n),
      isDisabled: dr,
    },
    {
      key: 'progress',
      comp: 'slider',
      label: 'Progress',
      config: { min: 1, max: 100 },
      isHidden: (n) => cr(n) || ur(n),
    },
    { key: 'links', comp: 'links', label: '', isHidden: (n) => ur(n) },
  ],
  Et = tn(null);
/* @__PURE__ */ new Date().valueOf();
function Il(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t],
      s = e[t];
    if (!kn(r, s)) return !1;
  }
  return !0;
}
function kn(n, e) {
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
      for (let t = n.length - 1; t >= 0; t--) if (!kn(n[t], e[t])) return !1;
      return !0;
    } else return Il(n, e);
  return n === e;
}
function Er(n) {
  if (typeof n != 'object' || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(Er);
  const e = {};
  for (const t in n) e[t] = Er(n[t]);
  return e;
}
var Yo = 2,
  Hl = class {
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
            i & Yo ? (o[d] = l.__trigger) : l.__trigger())
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
  Al = class {
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
          o.length = Math.max(...o.in.map((i) => Bo(i, this._sources, 1)));
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
      const t = this._setter(e, Yo);
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
function Bo(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => Bo(o, e, t + 1));
  return Math.max(...s);
}
var Ll = class {
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
function Pl(n) {
  return (e) => e[n];
}
function Ol(n) {
  return (e, t) => (e[n] = t);
}
function Yt(n, e) {
  return (e.getter || Pl(e.id))(n);
}
function Ss(n, e, t) {
  return (e.setter || Ol(e.id))(n, t);
}
function $s(n, e) {
  const t = document.createElement('a');
  (t.href = URL.createObjectURL(n)),
    (t.download = e),
    document.body.appendChild(t),
    t.click(),
    document.body.removeChild(t);
}
function At(n, e) {
  let t = Yt(n, e) ?? '';
  return (
    e.template && (t = e.template(t, n, e)),
    e.optionsMap &&
      (Array.isArray(t)
        ? (t = t.map((r) => e.optionsMap.get(r)))
        : (t = e.optionsMap.get(t))),
    typeof t > 'u' ? '' : t + ''
  );
}
function zl(n, e) {
  const t = /\n|"|;|,/;
  let r = '';
  const s =
      e.rows ||
      `
`,
    o = e.cols || '	',
    i = n._columns,
    a = n.flatData;
  e.header !== !1 && i[0].header && (r = Cs('header', i, r, o, s));
  for (let l = 0; l < a.length; l++) {
    const c = [];
    for (let u = 0; u < i.length; u++) {
      let d = At(a[l], i[u]);
      t.test(d) && (d = '"' + d.replace(/"/g, '""') + '"'), c.push(d);
    }
    r += (r ? s : '') + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = Cs('footer', i, r, o, s)), r;
}
function Cs(n, e, t, r, s) {
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
function Wl(n, e, t) {
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
    (_s('header', a, r, s, u, e, t),
    (i = i.concat(c.headerRowHeights.map((d) => ({ height: d })))),
    (u += a[0].header.length));
  for (let d = 0; d < l.length; d++) {
    const f = [];
    for (let h = 0; h < a.length; h++) {
      const m = l[d],
        g = a[h],
        y = Yt(m, g) ?? '';
      let w = At(m, g),
        x;
      e.cellStyle && (x = e.cellStyle(y, m, g)),
        e.cellTemplate && (w = e.cellTemplate(y, m, g) ?? w);
      const v = Vo(w, 2, x, t);
      f.push(v);
    }
    r.push(f), i.push({ height: c.rowHeight });
  }
  return (
    (u += l.length),
    e.footer !== !1 &&
      a[0].footer &&
      (_s('footer', a, r, s, u, e, t),
      (i = i.concat(c.footerRowHeights.map((d) => ({ height: d }))))),
    { cells: r, merged: s, rowSizes: i, colSizes: o, styles: t }
  );
}
function _s(n, e, t, r, s, o, i) {
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
      let h = u.text ?? '',
        m;
      o.headerCellStyle && (m = o.headerCellStyle(h, u, e[c], n)),
        o.headerCellTemplate && (h = o.headerCellTemplate(h, u, e[c], n) ?? h);
      let g;
      n == 'header'
        ? a == e[0][n].length - 1
          ? (g = 1)
          : (g = 0)
        : a
          ? (g = 4)
          : (g = 3);
      const y = Vo(h, g, m, i);
      l.push(y);
    }
    t.push(l);
  }
}
function Vo(n, e, t, r) {
  let s = e;
  if (
    (n &&
      n instanceof Date &&
      ((n = Yl(n)), (t = t || {}), (t.format = t.format || 'dd/mm/yyyy')),
    t)
  ) {
    t = { ...r[e], ...t };
    const o = r.findIndex((i) => kn(i, t));
    o < 0 ? (r.push(t), (s = r.length - 1)) : (s = o);
  }
  return { v: n + '', s };
}
function Fl(n) {
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
function Yl(n) {
  return n
    ? 25569 + (n.getTime() - n.getTimezoneOffset() * 6e4) / (86400 * 1e3)
    : null;
}
const Bl = 'portrait',
  Vl = 100,
  Ul = 'a4',
  Gl = {
    a3: { width: 11.7, height: 16.5 },
    a4: { width: 8.27, height: 11.7 },
    letter: { width: 8.5, height: 11 },
  };
function jl(n, e) {
  const t = [];
  let r = [],
    s = 0;
  const o = n.filter((a) => !a.hidden),
    i = Kl(e);
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
function Ns(n, e, t) {
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
function Kl(n) {
  const { mode: e, ppi: t, paper: r } = n,
    { width: s, height: o } = Gl[r];
  return Xl(e === 'portrait' ? s : o, t);
}
function Xl(n, e) {
  return n * e;
}
function ql(n = {}) {
  const { mode: e, ppi: t, paper: r } = n;
  return { mode: e || Bl, ppi: t || Vl, paper: r || Ul };
}
function Uo(n, e) {
  return n.flexgrow
    ? `min-width:${e}px;width:auto`
    : `width:${n.width}px; max-width:${n.width}px; height:${n.height}px`;
}
function Ql(n, e, t) {
  let r = n[t.id];
  if (t.filter.type === 'richselect' && r) {
    const s =
      t.filter.config?.options || e.find(({ id: o }) => o == t.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? '';
}
const Ms = ['resize-column', 'hide-column', 'update-cell'],
  Zl = ['delete-row', 'update-row', 'update-cell'],
  Jl = ['move-item'],
  ec = ['resize-column', 'move-item'];
let tc = class {
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
            i = Yt(s, o);
          return kn(i, e.value)
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
          if (ec.includes(t)) {
            ((r.inProgress && !this.progress[t]) ||
              typeof r.inProgress != 'boolean') &&
              (Jl.includes(t) && this.setPrev('flatData'),
              Ms.includes(t) && this.setPrev('columns')),
              (this.progress[t] = r.inProgress);
            return;
          }
          Zl.includes(t) && this.setPrev('data'),
            Ms.includes(t) && this.setPrev('columns');
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
    this._previousValues[e] = Er(this.getState()[e]);
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
function Go() {
  let n = !0;
  return (n = !1), n;
}
function jo(n, e) {
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
function nc(n, e) {
  return -jo(n, e);
}
function rc(n, e) {
  if (typeof e.sort == 'function')
    return function (r, s) {
      const o = e.sort(r, s);
      return n === 'asc' ? o : -o;
    };
  const t = n === 'asc' ? jo : nc;
  return function (r, s) {
    return t(Yt(r, e), Yt(s, e));
  };
}
function sc(n, e) {
  if (!n || !n.length) return;
  const t = n.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return rc(r.order, s);
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
const Rn = 28,
  oc = 20;
function ic() {
  if (typeof document > 'u') return 'willow';
  const n = document.querySelector('[class^="wx"][class$="theme"]');
  return n ? n.className.substring(3, n.className.length - 6) : 'willow';
}
function Bn(n, e, t, r, s) {
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
      h = Math.ceil(d.height);
    (l = Math.max(l || 0, f)), (c = Math.max(c || 0, h));
  }
  return o.remove(), { width: l, height: c };
}
function Ts(n, e, t, r, s) {
  const o = [];
  for (let i = 0; i < n.length; i++) {
    const a = n[i][e],
      l = a.length;
    for (let c = 0; c < l; c++) {
      const { text: u, vertical: d, collapsed: f, rowspan: h, css: m } = a[c];
      if (!u) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let g = 0;
      if (d && !f) {
        let y = `wx-measure-cell-${e}`;
        if (
          ((y += m ? ` ${m}` : ''),
          (g = Bn(u, y, s).width),
          (h > 1 || !a[c + 1]) && t > c + 1)
        ) {
          const w = h || t - c,
            x = o.slice(c, c + w).reduce((v, k) => v + k, 0);
          if (x < g) {
            const v = Math.ceil((g - x) / w);
            for (let k = c; k < c + w; k++) o[k] = (o[k] || r) + v;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, g);
    }
  }
  return o;
}
function ac(n, e, t) {
  const r = [],
    s = [];
  let o = 'wx-measure-cell-body';
  o += n.css ? ` ${n.css}` : '';
  for (let i = 0; i < e.length; i++) {
    const a = e[i],
      l = At(a, n);
    l &&
      (r.push(l),
      n.treetoggle
        ? s.push(
            e[i].$level * Rn + (e[i].$count ? Rn : 0) + (n.draggable ? Rn : 0),
          )
        : n.draggable && s.push(Rn));
  }
  return Bn(r, o, t, s).width;
}
function lc(n, e) {
  const t = 'wx-measure-cell-header',
    r = n.sort ? oc : 0;
  let s = n.header;
  if (typeof s == 'string') return Bn(s, t, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const a = s[i],
      l = typeof a == 'string' ? a : a.text,
      c = t + (typeof a == 'string' ? '' : ` ${a.css}`);
    let u = Bn(l, c, e).width;
    i === s.length - 1 && (u += r), (o = Math.max(o || 0, u));
  }
  return o;
}
const cc = {
  text: (n, e) =>
    n ? n.toString().toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e,
  richselect: (n, e) => (typeof e != 'number' && !e ? !0 : n == e),
};
function uc(n) {
  return cc[n];
}
let dc = class extends Hl {
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
      this._router = new Al(
        super.setState.bind(this),
        [
          {
            in: ['columns', 'sizes', '_skin'],
            out: ['_columns', '_sizes'],
            exec: (s) => {
              const { columns: o, sizes: i, _skin: a } = this.getState(),
                l = this.copyColumns(o),
                c = l.reduce((f, h) => Math.max(h.header.length, f), 0),
                u = l.reduce((f, h) => Math.max(h.footer.length, f), 0);
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
      const r = (this.in = new Ll());
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
              value: Yt(a, l) ?? '',
              renderedValue: At(a, l),
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
          if (((s.id = c.id = s.id || c.id || In()), u || d)) {
            const m = u || d,
              g = i.findIndex((y) => y.id === m);
            (i = [...i]), i.splice(g + (d ? 1 : 0), 0, s.row);
          } else i = [...i, s.row];
          const h = { data: i };
          l && (h._filterIds = [...l, s.id]),
            this.setState(h),
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
            Ss(f, d, u);
            const h = this.updateTreeRow(f);
            f.$parent === 0 && (i = h);
          } else {
            const f = i.findIndex((m) => m.id == l),
              h = { ...i[f] };
            Ss(h, d, u), (i[f] = h);
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
              const { data: h } = this.getState();
              let m = h.findIndex((y) => y.id == f[f.length - 1]),
                g = h.findIndex((y) => y.id == s);
              m > g && ([m, g] = [g, m]),
                h.slice(m, g + 1).forEach((y) => {
                  f.indexOf(y.id) === -1 && f.push(y.id);
                });
            } else if (o && this.isSelected(s)) {
              if (a === !0) return;
              f = f.filter((h) => h !== s);
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
              const { flatData: f, _skin: h } = this.getState();
              let m = f.length;
              a && (m = Math.min(a, m));
              const g = f.slice(0, m);
              c = ac(d, g, h);
            }
            if (i == 'header' || i === !0) {
              const { _skin: f } = this.getState();
              c = Math.max(lc(d, f), c);
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
            const x = [...u];
            x.sort(a), this.setState({ data: x });
            return;
          }
          const { order: f = 'asc' } = s;
          let h = l.sortMarks;
          const m = Object.keys(h),
            g = m.length;
          !i || !g || (g === 1 && h[o])
            ? (h = { [o]: { order: f } })
            : (g === 1 && (h[m[0]] = { ...h[m[0]], index: 0 }),
              (h = {
                ...h,
                [o]: {
                  order: f,
                  index: typeof i == 'number' ? i : (h[o]?.index ?? g),
                },
              }));
          const y = Object.keys(h)
            .sort((x, v) => h[x].index - h[v].index)
            .map((x) => ({ key: x, order: h[x].order }));
          this.setState({ sortMarks: h });
          const w = sc(y, c);
          if (w) {
            const x = [...u];
            d ? this.sortTree(x, w) : x.sort(w), this.setState({ data: x });
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
          const h = a ?? this.createFilter(d);
          let m = [];
          u
            ? (m = this.filterTree(c, h, m))
            : c.forEach((g) => {
                h(g) && m.push(g.id);
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
            f = u.findIndex((g) => g.id == o);
          let h;
          if (l === 'up' || l === 'down') {
            if (l === 'up') {
              if (f === 0) return;
              (h = f - 1), (l = 'before');
            } else if (l === 'down') {
              if (f === u.length - 1) return;
              (h = f + 1), (l = 'after');
            }
            a = u[h] && u[h].id;
          } else h = u.findIndex((g) => g.id == a);
          if (f === -1 || h === -1 || i === !1) return;
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
          const h = { ...f, id: In() };
          s.id = h.id;
          const m = c.findIndex((y) => y.id == i);
          if (m === -1) return;
          d.splice(m + (a === 'after' ? 1 : 0), 0, h), (d = [...d]);
          const g = { data: d };
          u && (g._filterIds = [...u, h.id]), this.setState(g);
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
                const c = zl(this.getState(), s.csv || {});
                s.download !== !1
                  ? $s(new Blob(['\uFEFF' + c], { type: 'text/csv' }), l)
                  : (s.result = c),
                  o(!0);
              } else if (a == 'xlsx') {
                let c = s.excel?.styles;
                !c && c !== !1 && (c = Fl(this.getState()._skin));
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
                    merged: h,
                    rowSizes: m,
                    colSizes: g,
                    styles: y,
                  } = Wl(this.getState(), s.excel || {}, d),
                  w =
                    s.cdn ||
                    'https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js';
                this.getXlsxWorker(w).then((x) => {
                  (x.onmessage = (v) => {
                    if (v.data.type == 'ready') {
                      const k = v.data.blob;
                      s.download !== !1 ? $s(k, l) : (s.result = k), o(!0);
                    }
                  }),
                    x.postMessage({
                      type: 'convert',
                      data: {
                        data: [
                          {
                            name: s.sheetName || 'data',
                            cells: f,
                            cols: g,
                            rows: m,
                            merged: h,
                          },
                        ],
                        styles: y,
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
                  const h = this.getNextRow(d);
                  h && ((d = h.id), (f = this.getNextEditor(h)));
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
                  const h = this.getPrevRow(d);
                  h && ((d = h.id), (f = this.getPrevEditor(h)));
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
            h = 0,
            m = 0;
          if (s.column) {
            d = 0;
            const g = o.findIndex((y) => y.id == s.column);
            h = o[g].width;
            for (let y = i.left ?? 0; y < g; y++) {
              const w = o[y];
              w.hidden || (d += w.width);
            }
          }
          if (s.row && !c) {
            const g = l.findIndex((y) => y.id == s.row);
            g >= 0 &&
              (u
                ? ((f = l
                    .slice(0, g)
                    .reduce((y, w) => y + (w.rowHeight || a.rowHeight), 0)),
                  (m = l[g].rowHeight))
                : (f = a.rowHeight * g));
          }
          this.setState({
            scroll: { top: f, left: d, width: h, height: m || a.rowHeight },
          });
        }),
        r.on('print', (s) => {
          const o = ql(s);
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
      e.hasOwnProperty('_skin') && !e._skin && (e._skin = ic()),
        e.columns &&
          e.columns.forEach((t) => {
            t.options &&
              (t.optionsMap = new Map(t.options.map((r) => [r.id, r.label])));
          }),
        kn(this.getState().data, e.data) ||
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
        Go() &&
          (e.tree && ((e.undo = !1), (e.reorder = !1)),
          e.split?.right && (e.split.right = 0)),
        e.undo &&
          !this._historyManager &&
          (this._historyManager = new tc(
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
            (f, h) => f + h,
            0,
          );
          (u.height = d), c + u.rowspan != s && u.height--;
        }
        if (u.colspan) {
          let d = i.width,
            f = i.flexgrow || 0;
          const h = u.colspan;
          for (let m = 1; m < h; m++) {
            const g = e[t + m];
            g &&
              (g.hidden
                ? (u.colspan -= 1)
                : g.flexgrow
                  ? (f += g.flexgrow)
                  : (d += g.width || o.columnWidth)),
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
      for (let t = 0; t < e.length; t++) e[t].id || (e[t].id = In());
      return e;
    }
    normalizeTreeRows(e, t, r) {
      return (
        e.forEach((s) => {
          s.id || (s.id = In()),
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
        r.push((l) => (o?.handler ? o.handler(l[s], a) : uc(i)(l[s], a)));
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
            const u = At(a, c);
            String(u).toLowerCase().includes(e) && (l[c.id] = !0);
          }),
            Object.keys(l).length && (r[a.id] = l);
        }),
        r
      );
    }
    normalizeSizes(e, t, r, s, o) {
      const i = Ts(e, 'header', r, t.headerHeight, o),
        a = Ts(e, 'footer', s, t.footerHeight, o),
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
  fc = /* @__PURE__ */ new Date().valueOf();
function In() {
  return 'temp://' + fc++;
}
function hc(n, e = 'data-id') {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
/* @__PURE__ */ new Date().valueOf();
var gc = class {
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
  Zt = [],
  pc = {
    subscribe: (n) => {
      mc();
      const e = new gc();
      return (
        Zt.push(e),
        n(e),
        () => {
          const t = Zt.findIndex((r) => r === e);
          t >= 0 && Zt.splice(t, 1);
        }
      );
    },
  },
  Ds = !1;
function mc() {
  Ds ||
    ((Ds = !0),
    document.addEventListener('keydown', (n) => {
      if (
        Zt.length &&
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
        for (let s = Zt.length - 1; s >= 0; s--) {
          const o = Zt[s],
            i = o.store.get(r) || o.store.get(t);
          i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
        }
      }
    }));
}
const wc = {
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
function Kr(n, { keys: e, exec: t }) {
  if (!e) return;
  function r(i) {
    const a = i.target;
    return (
      a.tagName === 'INPUT' ||
      a.tagName === 'TEXTAREA' ||
      hc(a, 'data-header-id')?.classList.contains('wx-filter') ||
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
  const o = pc.subscribe((i) => {
    i.configure(s, n);
  });
  return {
    destroy: () => {
      o();
    },
  };
}
function xc(n, e) {
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
function Ot(n) {
  const e = n.getAttribute('data-id'),
    t = parseInt(e);
  return isNaN(t) || t.toString() != e ? e : t;
}
function yc(n, e, t) {
  const r = n.getBoundingClientRect(),
    s = e.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - t.clientY,
    db: t.clientY - r.top,
  };
}
function Es(n) {
  return n && n.getAttribute('data-context-id');
}
const Rs = 5;
function vc(n, e) {
  let t, r, s, o, i, a, l, c, u;
  function d(S) {
    (o = S.clientX),
      (i = S.clientY),
      (a = {
        ...yc(t, n, S),
        y: e.getTask(s).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function f(S) {
    (t = rt(S)),
      Es(t) &&
        ((s = Ot(t)),
        (u = setTimeout(() => {
          (c = !0), e && e.touchStart && e.touchStart(), d(S.touches[0]);
        }, 500)),
        n.addEventListener('touchmove', x),
        n.addEventListener('contextmenu', h),
        window.addEventListener('touchend', v));
  }
  function h(S) {
    if (c || u) return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 &&
      ((t = rt(S)),
      Es(t) &&
        ((s = Ot(t)),
        n.addEventListener('mousemove', w),
        window.addEventListener('mouseup', k),
        d(S)));
  }
  function g(S) {
    n.removeEventListener('mousemove', w),
      n.removeEventListener('touchmove', x),
      document.body.removeEventListener('mouseup', k),
      document.body.removeEventListener('touchend', v),
      (document.body.style.userSelect = ''),
      S &&
        (n.removeEventListener('mousedown', m),
        n.removeEventListener('touchstart', f));
  }
  function y(S) {
    const C = S.clientX - o,
      H = S.clientY - i;
    if (!r) {
      if (
        (Math.abs(C) < Rs && Math.abs(H) < Rs) ||
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
      const G = Math.round(Math.max(0, a.top + H));
      if (e && e.move && e.move({ id: s, top: G, detail: l }) === !1) return;
      const N = e.getTask(s),
        L = N.$y;
      if (!a.start && a.y == L) return R();
      (a.start = !0), (a.y = N.$y - 4), (r.style.top = G + 'px');
      const _ = document.elementFromPoint(S.clientX, S.clientY),
        A = rt(_);
      if (A && A !== t) {
        const O = Ot(A),
          W = A.getBoundingClientRect(),
          P = W.top + W.height / 2,
          U = S.clientY + a.db > P && A.nextElementSibling !== t,
          T = S.clientY - a.dt < P && A.previousElementSibling !== t;
        l?.after == O || l?.before == O
          ? (l = null)
          : U
            ? (l = { id: s, after: O })
            : T && (l = { id: s, before: O });
      }
    }
  }
  function w(S) {
    y(S);
  }
  function x(S) {
    c
      ? (S.preventDefault(), y(S.touches[0]))
      : u && (clearTimeout(u), (u = null));
  }
  function v() {
    (c = null), u && (clearTimeout(u), (u = null)), R();
  }
  function k() {
    R();
  }
  function R() {
    t && (t.style.visibility = ''),
      r &&
        (r.parentNode.removeChild(r),
        e && e.end && e.end({ id: s, top: a.top })),
      (s = t = r = a = l = null),
      g();
  }
  return (
    n.style.position !== 'absolute' && (n.style.position = 'relative'),
    n.addEventListener('mousedown', m),
    n.addEventListener('touchstart', f),
    {
      destroy() {
        g(!0);
      },
    }
  );
}
const kc = {
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
function Ko(n, e) {
  return n.map((t) => {
    const r = e(t);
    return t.data && t.data.length && (r.data = Ko(t.data, e)), r;
  });
}
function Xo(n, e) {
  const t = [];
  return (
    n.forEach((r) => {
      if (r.data) {
        const s = Xo(r.data, e);
        s.length && t.push({ ...r, data: s });
      } else e(r) && t.push(r);
    }),
    t
  );
}
let bc = 1;
function Sc(n) {
  return Ko(n, (e) => {
    const t = { ...e, id: e.id || bc++ };
    return t.type && (t.comp = t.type), t;
  });
}
const qo = {};
function $c(n) {
  return qo[n] || n;
}
function Cc(n, e) {
  qo[n] = e;
}
function _c({ onClick: n, onShow: e, option: t }) {
  const r = B(null),
    s = E(() => {
      e(t.data ? t.id : !1, r.current);
    }, [e, t]),
    o = $(() => (t && t.comp ? $c(t.comp) : null), [t]);
  return /* @__PURE__ */ J('div', {
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
        : /* @__PURE__ */ J('span', {
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
function Xr({
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
  const [c, u] = Z(-1e4),
    [d, f] = Z(-1e4),
    [h, m] = Z(20),
    [g, y] = Z(),
    w = B(null),
    [x, v] = Z(!1),
    [k, R] = Z(null),
    S = E(() => {
      const L = pi(w.current, s, r, e, t);
      L && (u(L.x), f(L.y), m(L.z), y(L.width));
    }, [s, r, e, t]);
  X(() => {
    o && o(S);
  }, []);
  const C = E(() => {
      v(!1);
    }, []),
    H = E(() => {
      l && l({ action: null, option: null });
    }, [l]),
    G = E((L, _) => {
      v(L), R(_);
    }, []),
    N = $(() => Sc(n), [n]);
  return (
    X(() => {
      S();
    }, [s, S]),
    X(() => {
      if (w.current) return mn(w.current, { callback: H, modal: !0 }).destroy;
    }, [H]),
    /* @__PURE__ */ p('div', {
      ref: w,
      'data-wx-menu': 'true',
      className: `wx-XMmAGqVx wx-menu ${a}`,
      style: {
        position: 'absolute',
        top: d + 'px',
        left: c + 'px',
        width: g,
        zIndex: h,
      },
      onMouseLeave: C,
      children: N.map((L) =>
        /* @__PURE__ */ J(
          un,
          {
            children: [
              L.comp === 'separator'
                ? /* @__PURE__ */ p('div', {
                    className: 'wx-XMmAGqVx wx-separator',
                  })
                : /* @__PURE__ */ p(_c, {
                    option: L,
                    onShow: G,
                    onClick: (_) => {
                      if (!L.data && !_.defaultPrevented) {
                        const A = {
                          context: i,
                          action: L,
                          option: L,
                          event: _,
                        };
                        L.handler && L.handler(A),
                          l && l(A),
                          _.stopPropagation();
                      }
                    },
                  }),
              L.data && x === L.id
                ? /* @__PURE__ */ p(Xr, {
                    css: a,
                    options: L.data,
                    at: 'right-overlap',
                    parent: k,
                    context: i,
                    onClick: l,
                  })
                : null,
            ],
          },
          L.id,
        ),
      ),
    })
  );
}
const Nc = Bt(function (n, e) {
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
    [u, d] = Z(null),
    [f, h] = Z(null),
    [m, g] = Z(0),
    [y, w] = Z(0),
    x = $(() => (u !== null && i ? Xo(t, (S) => i(S, u)) : t), [u, i, t]),
    v = E(
      (S) => {
        h(null), c && c(S);
      },
      [c],
    ),
    k = E((S, C) => {
      let H = null;
      for (; S && S.dataset && !H; ) (H = S.dataset[C]), (S = S.parentNode);
      return H ? nn(H) : null;
    }, []),
    R = E(
      (S, C) => {
        if (!S) {
          h(null);
          return;
        }
        if (S.defaultPrevented) return;
        const H = S.target;
        if (H && H.dataset && H.dataset.menuIgnore) return;
        g(S.clientX + 1), w(S.clientY + 1);
        let G = typeof C < 'u' ? C : k(H, o);
        (s && ((G = s(G, S)), !G)) || (d(G), h(H), S.preventDefault());
      },
      [o, k, s],
    );
  return (
    Vt(e, () => ({ show: R }), [R]),
    /* @__PURE__ */ J(Ve, {
      children: [
        l
          ? /* @__PURE__ */ p('span', {
              onClick: R,
              'data-menu-ignore': 'true',
              children: typeof l == 'function' ? l() : l,
            })
          : null,
        f
          ? /* @__PURE__ */ p(to, {
              children: /* @__PURE__ */ p(
                Xr,
                {
                  css: a,
                  at: r,
                  top: y,
                  left: m,
                  parent: f,
                  context: u,
                  onClick: v,
                  options: x,
                },
                f,
              ),
            })
          : null,
      ],
    })
  );
});
Bt(function (n, e) {
  const {
      options: t,
      at: r = 'bottom',
      css: s = '',
      children: o,
      onClick: i,
    } = n,
    [a, l] = Z(null);
  function c(m) {
    l(null), i && i(m);
  }
  const u = E((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Vt(e, () => ({ show: u }), [u]);
  function d(m) {
    let g = m.target;
    for (; !g.dataset.menuIgnore; ) l(g), (g = g.parentNode);
  }
  const f = B(0),
    h = B(a);
  return (
    X(() => {
      h.current !== a && ((f.current += 1), (h.current = a));
    }, [a]),
    /* @__PURE__ */ J(Ve, {
      children: [
        /* @__PURE__ */ p('span', {
          onClick: d,
          'data-menu-ignore': 'true',
          children: o,
        }),
        a
          ? /* @__PURE__ */ p(to, {
              children: /* @__PURE__ */ p(
                Xr,
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
const Qo = Bt(function (n, e) {
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
      u = B(null),
      d = E((f, h) => {
        u.current.show(f, h);
      }, []);
    return (
      Vt(
        e,
        () => ({
          show: d,
        }),
        [d],
      ),
      /* @__PURE__ */ J(Ve, {
        children: [
          l
            ? /* @__PURE__ */ p('span', {
                onContextMenu: d,
                'data-menu-ignore': 'true',
                children: l,
              })
            : null,
          /* @__PURE__ */ p(Nc, {
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
  Zo = {};
function Mc(n) {
  return Zo[n] || n;
}
function on(n, e) {
  Zo[n] = e;
}
function Jo({ menu: n = !1 }) {
  return /* @__PURE__ */ p('div', {
    className: `wx-z1qpqrvg wx-separator${n ? '-menu' : ''}`,
    children: ' ',
  });
}
function ei() {
  return /* @__PURE__ */ p('div', { className: 'wx-1IhFzpJV wx-spacer' });
}
const Tc = ({ key: n, text: e, ...t }) => t;
function qr(n) {
  const { item: e = {}, menu: t = !1, values: r, onClick: s, onChange: o } = n,
    i = $(() => Mc(e.comp || 'label'), [e]),
    a = E(() => {
      e && e.handler && e.handler(e), s && s({ item: e });
    }, [e, s]),
    l = $(() => (e && e.key && r ? r[e.key] : void 0), [e, r]),
    c = E(
      ({ value: d }) => {
        e && e.handler && e.handler(e, d), o && o({ value: d, item: e });
      },
      [e, o],
    ),
    u = $(
      () => (t ? (e ? e.menuText || e.text : void 0) : e ? e.text : void 0),
      [t, e],
    );
  if (e && e.comp == 'spacer') return /* @__PURE__ */ p(ei, {});
  if (e && e.comp == 'separator') return /* @__PURE__ */ p(Jo, { menu: t });
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
        ...Tc(e),
      }),
    });
  }
}
function Vn({
  item: n,
  values: e = null,
  menu: t = !1,
  onChange: r,
  onClick: s,
}) {
  const [o, i] = Z(!0),
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
        ? /* @__PURE__ */ J(Ve, {
            children: [
              /* @__PURE__ */ J('div', {
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
                : /* @__PURE__ */ p(sn, {
                    width: '',
                    oncancel: a,
                    children: /* @__PURE__ */ p('div', {
                      className: 'wx-wSVFAGym wx-drop-group',
                      children: /* @__PURE__ */ p(Vn, {
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
        : /* @__PURE__ */ J(Ve, {
            children: [
              /* @__PURE__ */ p('div', {
                className: 'wx-wSVFAGym wx-tb-body',
                children: n.items.map((d, f) =>
                  d.items
                    ? /* @__PURE__ */ p(
                        Vn,
                        {
                          item: d,
                          values: e,
                          onClick: c,
                          onChange: r,
                        },
                        d.id || f,
                      )
                    : /* @__PURE__ */ p(
                        qr,
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
function Dc({
  items: n = [],
  css: e,
  values: t,
  width: r,
  onClick: s,
  onChange: o,
}) {
  const [i, a] = Z(void 0),
    l = B(null);
  function c() {
    a(null);
  }
  function u() {
    a(!0);
  }
  function d(f) {
    c(), s && s(f);
  }
  return /* @__PURE__ */ J('div', {
    className: `wx-Yo6BuX0p wx-menu ${e || ''}`,
    ref: l,
    'data-id': '$menu',
    children: [
      /* @__PURE__ */ p(Mt, { icon: 'wxi-dots-h', onClick: u }),
      i
        ? /* @__PURE__ */ p(sn, {
            width: `${r}px`,
            onCancel: c,
            children: /* @__PURE__ */ p('div', {
              className: 'wx-Yo6BuX0p wx-drop-menu',
              children: n.map((f, h) =>
                f.items
                  ? /* @__PURE__ */ p(
                      Vn,
                      {
                        item: f,
                        values: t,
                        menu: !0,
                        onClick: d,
                        onChange: o,
                      },
                      f.id || h,
                    )
                  : /* @__PURE__ */ p(
                      qr,
                      {
                        item: f,
                        values: t,
                        menu: !0,
                        onClick: d,
                        onChange: o,
                      },
                      f.id || h,
                    ),
              ),
            }),
          })
        : null,
    ],
  });
}
function Ec(n) {
  return (
    n.forEach((e) => {
      e.id || (e.id = Un());
    }),
    n
  );
}
function Rr(n) {
  const {
      items: e,
      menuCss: t = '',
      css: r = '',
      values: s,
      overflow: o = 'menu',
      onClick: i,
      onChange: a,
    } = n,
    [l, c] = Xe(e || []),
    [u, d] = Xe(s || null),
    f = $(() => Ec(l), [l]),
    h = B(null),
    m = B(-1),
    [g, y] = Z([]),
    w = B(f);
  X(() => {
    w.current = f;
  }, [l]);
  const x = B(o);
  X(() => {
    x.current = o;
  }, [o]);
  const v = B(g);
  X(() => {
    v.current = g;
  }, [g]);
  const k = B(!1);
  function R(N) {
    u && ((u[N.item.key] = N.value), d({ ...u })), a && a(N);
  }
  function S() {
    const N = h.current;
    if (!N) return 0;
    const L = N.children,
      _ = w.current || [];
    let A = 0;
    for (let O = 0; O < _.length; O++)
      _[O].comp !== 'spacer' &&
        ((A += L[O].clientWidth), _[O].comp === 'separator' && (A += 8));
    return A;
  }
  function C() {
    const N = h.current,
      L = w.current || [];
    if (N) {
      for (let _ = L.length - 1; _ >= 0; _--)
        if (L[_].items && !L[_].collapsed) {
          (L[_].collapsed = !0),
            (L[_].$width = N.children[_].offsetWidth),
            (k.current = !0),
            c([...L]);
          return;
        }
    }
  }
  function H(N) {
    const L = h.current,
      _ = w.current || [];
    if (L) {
      for (let A = 0; A < _.length; A++)
        if (_[A].collapsed && _[A].$width) {
          _[A].$width - L.children[A].offsetWidth < N + 10 &&
            ((_[A].collapsed = !1), (k.current = !0)),
            c([..._]);
          return;
        }
    }
  }
  function G() {
    const N = h.current;
    if (!N) return;
    const L = w.current || [],
      _ = x.current;
    if (_ === 'wrap') return;
    const A = N.clientWidth;
    if (N.scrollWidth > A) {
      if (_ === 'collapse') return C();
      const O = N.children;
      let W = 0;
      for (let P = 0; P < L.length; P++) {
        if (
          ((W += O[P].clientWidth),
          L[P].comp === 'separator' && (W += 8),
          W > A - 40)
        ) {
          if (m.current === P) return;
          m.current = P;
          const U = [];
          for (let T = P; T < L.length; T++)
            U.push(L[T]), (O[T].style.visibility = 'hidden');
          P > 0 &&
            L[P - 1].comp === 'separator' &&
            (O[P - 1].style.visibility = 'hidden'),
            y(U);
          break;
        }
        O[P].style.visibility = '';
      }
    } else {
      const O = A - S();
      if (O <= 0) return;
      if (_ === 'collapse') return H(O);
      if ((v.current || []).length) {
        m.current = null;
        const W = N.children;
        for (let P = 0; P < L.length; P++) W[P].style.visibility = '';
        y([]);
      }
    }
  }
  return (
    X(() => {
      k.current && ((k.current = !1), G());
    }, [l]),
    X(() => {
      const N = new ResizeObserver(() => G());
      return (
        h.current && N.observe(h.current),
        () => {
          N.disconnect();
        }
      );
    }, []),
    /* @__PURE__ */ J('div', {
      className: `wx-VdPSJj8y wx-toolbar ${r || ''} ${o === 'wrap' ? 'wx-wrap' : ''}`,
      ref: h,
      children: [
        f.map((N) =>
          N.items
            ? /* @__PURE__ */ p(
                Vn,
                {
                  item: N,
                  values: u,
                  onClick: i,
                  onChange: R,
                },
                N.id,
              )
            : /* @__PURE__ */ p(
                qr,
                {
                  item: N,
                  values: u,
                  onClick: i,
                  onChange: R,
                },
                N.id,
              ),
        ),
        !!g.length &&
          /* @__PURE__ */ p(Dc, {
            items: g,
            css: t,
            values: u,
            onClick: i,
            onChange: R,
          }),
      ],
    })
  );
}
function Rc(n) {
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
    ? /* @__PURE__ */ J('div', {
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
function Ic(n) {
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
function Hc(n) {
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
    ? /* @__PURE__ */ J('div', {
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
function Ac({
  id: n = '',
  text: e = '',
  css: t = '',
  icon: r = '',
  onClick: s,
}) {
  function o() {
    s && s({ id: n });
  }
  return /* @__PURE__ */ J('div', {
    className: `wx-U0Bx7pIR wx-label ${t}`,
    onClick: o,
    children: [
      r ? /* @__PURE__ */ p('i', { className: 'wx-U0Bx7pIR ' + r }) : null,
      e,
    ],
  });
}
on('button', Rc);
on('separator', Jo);
on('spacer', ei);
on('label', Ic);
on('item', Ac);
on('icon', Hc);
const ht = tn(null);
function Lc(n, e) {
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
const Is = 5,
  Pc = 700;
function Oc(n) {
  return nn(n.getAttribute('data-id'));
}
function Ln(n) {
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
function Ir(n, e) {
  const t = Ln(e);
  return { x: n.clientX - t.x, y: n.clientY - t.y };
}
function zc(n, e) {
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
  function u(C) {
    const H = rt(C);
    H &&
      ((r = {
        container: l,
        sourceNode: C.target,
        from: Oc(H),
        pos: Ir(C, n),
      }),
      (o = r.pos),
      d(C));
  }
  function d(C) {
    if (!r) return;
    const H = (r.pos = Ir(C, n));
    if (!i) {
      if (
        !a &&
        !C?.target?.getAttribute('draggable-data') &&
        Math.abs(o.x - H.x) < Is &&
        Math.abs(o.y - H.y) < Is
      )
        return;
      if (R(C) === !1) return S();
    }
    if (a) {
      const G =
          window.scrollX ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft,
        N =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      r.targetNode = document.elementFromPoint(C.pageX - G, C.pageY - N);
    } else r.targetNode = C.target;
    t.move && t.move(C, r),
      (l.style.left = -(r.offset ? r.offset.x : 0) + 'px'),
      (l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + 'px');
  }
  function f(C) {
    l.parentNode && l.parentNode.removeChild(l),
      (l.innerHTML = ''),
      i && t.end && t.end(C, r),
      (r = o = null),
      S();
  }
  function h(C) {
    (t.getReorder && !t.getReorder()) ||
      (C.button === 0 &&
        (k(C),
        window.addEventListener('mousemove', m),
        window.addEventListener('mouseup', g),
        u(C)));
  }
  function m(C) {
    d(C);
  }
  function g(C) {
    f(C);
  }
  function y(C) {
    if (t.getReorder && !t.getReorder()) return;
    (s = setTimeout(() => {
      (a = !0), u(C.touches[0]);
    }, Pc)),
      k(C);
    function H() {
      s && c(),
        C.target.removeEventListener('touchmove', w),
        C.target.removeEventListener('touchend', H),
        f(C);
    }
    C.target.addEventListener('touchmove', w),
      C.target.addEventListener('touchend', H),
      n.addEventListener('contextmenu', x);
  }
  function w(C) {
    i ? (C.preventDefault(), d(C.touches[0])) : s && c();
  }
  function x(C) {
    if (i || s) return C.preventDefault(), !1;
  }
  function v(C) {
    C.preventDefault();
  }
  function k(C) {
    if (!t.getDraggableInfo) return;
    const { hasDraggable: H } = t.getDraggableInfo();
    (!H || C.target.getAttribute('draggable-data')) &&
      ((document.body.style.userSelect = 'none'),
      (document.body.style.webkitUserSelect = 'none'));
  }
  function R(C) {
    if (((i = !0), t.start)) {
      if (t.start(C, r) === !1) return !1;
      n.appendChild(l), (document.body.style.cursor = 'move');
    }
  }
  function S(C) {
    (i = a = !1),
      (document.body.style.cursor = ''),
      (document.body.style.userSelect = ''),
      (document.body.style.webkitUserSelect = ''),
      window.removeEventListener('mousemove', m),
      window.removeEventListener('mouseup', g),
      C &&
        (n.removeEventListener('mousedown', h),
        n.removeEventListener('touchstart', y),
        n.removeEventListener('dragstart', v));
  }
  return (
    n.addEventListener('mousedown', h),
    n.addEventListener('touchstart', y),
    n.addEventListener('dragstart', v),
    {
      destroy() {
        S(!0);
      },
    }
  );
}
const Wc = 4e-3;
function Fc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1,
  };
}
function Yc(n, e, t, r) {
  const {
      node: s,
      left: o,
      top: i,
      bottom: a,
      sense: l,
      xScroll: c,
      yScroll: u,
    } = r,
    d = Ir(n, s);
  t.scrollState || (t.scrollState = Fc());
  let f = 0,
    h = 0;
  d.x < o + l ? (f = -1) : d.x > e.width - l && (f = 1),
    d.y < i + Math.round(l / 2)
      ? (h = -1)
      : d.y > e.height - a - Math.round(l / 2) && (h = 1),
    (t.scrollState.dirX !== f || t.scrollState.dirY !== h) &&
      (ti(t), (t.scrollState.dirX = f), (t.scrollState.dirY = h)),
    ((c && t.scrollState.dirX !== 0) || (u && t.scrollState.dirY !== 0)) &&
      Bc(t, r, {
        x: t.scrollState.dirX,
        y: t.scrollState.dirY,
      });
}
function Bc(n, e, t) {
  n.autoScrollTimer ||
    (n.autoScrollTimer = setTimeout(() => {
      n.activeAutoScroll = setInterval(Vc, 15, n, e, t);
    }, 250));
}
function ti(n) {
  (n.scrollSpeedFactor = 1),
    n.autoScrollTimer &&
      ((n.autoScrollTimer = clearTimeout(n.autoScrollTimer)),
      (n.activeAutoScroll = clearInterval(n.activeAutoScroll)));
}
function Vc(n, e, t) {
  const { x: r, y: s } = t;
  (n.scrollSpeedFactor += Wc), r !== 0 && Gc(n, e, r), s !== 0 && Uc(n, e, s);
}
function Uc(n, e, t) {
  const r = e.node.scrollTop;
  ni(r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t, 'scrollTop', e);
}
function Gc(n, e, t) {
  const r = e.node.scrollLeft;
  ni(r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t, 'scrollLeft', e);
}
function ni(n, e, t) {
  t.node[e] = n;
}
function Zn(n, e, t, r, s, o) {
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
function ri(n, e, t) {
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
function jc(n) {
  const {
      row: e,
      column: t,
      cellStyle: r = null,
      columnStyle: s = null,
      children: o,
    } = n,
    [i, a] = Xe(n.focusable),
    l = He(ht),
    c = le(l, 'focusCell'),
    u = le(l, 'search'),
    d = le(l, 'reorder'),
    f = $(() => u?.rows[e.id] && u.rows[e.id][t.id], [u, e.id, t.id]),
    h = $(
      () => Zn(t.width, t.flexgrow, t.fixed, t.left, t.right),
      [t.width, t.flexgrow, t.fixed, t.left, t.right],
    );
  function m(S, C) {
    let H = 'wx-cell';
    return (
      (H += t.fixed ? ' ' + (t.fixed === -1 ? 'wx-shadow' : 'wx-fixed') : ''),
      (H += S ? ' ' + S(t) : ''),
      (H += C ? ' ' + C(e, t) : ''),
      (H += t.treetoggle ? ' wx-tree-cell' : ''),
      H
    );
  }
  const g = $(() => m(s, r), [s, r, t, e]),
    y = $(
      () =>
        typeof t.draggable == 'function'
          ? t.draggable(e, t) !== !1
          : t.draggable,
      [t, e],
    ),
    w = B(null);
  X(() => {
    w.current &&
      i &&
      c?.row === e.id &&
      c?.column === t.id &&
      w.current.focus();
  }, [c, i, e.id, t.id]);
  const x = E(() => {
    i &&
      !c &&
      l.exec('focus-cell', {
        row: e.id,
        column: t.id,
        eventSource: 'focus',
      });
  }, [l, i, c, e.id, t.id]);
  X(
    () => () => {
      i && c && (l.exec('focus-cell', { eventSource: 'destroy' }), a(!1));
    },
    [l, a],
  );
  function v(S) {
    const C = new RegExp(`(${u.value.trim()})`, 'gi');
    return String(S)
      .split(C)
      .map((H) => ({ text: H, highlight: C.test(H) }));
  }
  const k = $(() => {
      const S = (t.fixed && t.fixed.left === -1) || t.fixed.right === -1,
        C = t.fixed && t.fixed.right;
      return [g, S ? 'wx-shadow' : '', C ? 'wx-fixed-right' : '']
        .filter(Boolean)
        .join(' ');
    }, [g, t]),
    R = t.cell;
  return /* @__PURE__ */ J('div', {
    className: 'wx-TSCaXsGV ' + k,
    ref: w,
    onFocus: x,
    style: h,
    'data-row-id': e.id,
    'data-col-id': t.id,
    tabIndex: i ? '0' : '-1',
    role: 'gridcell',
    'aria-colindex': t._colindex,
    'aria-readonly': t.editor ? void 0 : !0,
    children: [
      d && t.draggable
        ? y
          ? /* @__PURE__ */ p('i', {
              'draggable-data': 'true',
              className: 'wx-TSCaXsGV wx-draggable wxi-drag',
            })
          : /* @__PURE__ */ p('i', {
              className: 'wx-TSCaXsGV wx-draggable-stub',
            })
        : null,
      t.treetoggle
        ? /* @__PURE__ */ J(Ve, {
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
      R
        ? /* @__PURE__ */ p(R, {
            api: l,
            row: e,
            column: t,
            onAction: ({ action: S, data: C }) => l.exec(S, C),
          })
        : o
          ? o()
          : f
            ? /* @__PURE__ */ p('span', {
                children: v(At(e, t)).map(({ highlight: S, text: C }, H) =>
                  S
                    ? /* @__PURE__ */ p(
                        'mark',
                        { className: 'wx-TSCaXsGV wx-search', children: C },
                        H,
                      )
                    : /* @__PURE__ */ p('span', { children: C }, H),
                ),
              })
            : At(e, t),
    ],
  });
}
function Hs(n, e) {
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
function Kc({ filter: n, column: e, action: t, filterValue: r }) {
  function s({ value: o }) {
    t({ value: o, key: e.id });
  }
  return /* @__PURE__ */ p(vn, {
    ...(n.config ?? {}),
    value: r,
    onChange: s,
  });
}
function Xc({ filter: n, column: e, action: t, filterValue: r }) {
  const s = He(ht),
    o = le(s, 'flatData'),
    i = $(() => n?.config?.options || e?.options || l(), [n, e, o]),
    a = $(() => n?.config?.template, [n]);
  function l() {
    const d = [];
    return (
      o.forEach((f) => {
        const h = Yt(f, e);
        d.includes(h) || d.push(h);
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
    children: /* @__PURE__ */ p(Js, {
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
const qc = {
  text: Kc,
  richselect: Xc,
};
function Qc({ filter: n, column: e }) {
  const t = He(ht),
    r = le(t, 'filterValues');
  function s(i) {
    t.exec('filter-rows', i);
  }
  const o = $(() => qc[n.type], [n.type]);
  return /* @__PURE__ */ p(o, {
    filter: n,
    column: e,
    action: s,
    filterValue: r[e.id],
  });
}
function Zc(n) {
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
    c = He(ht),
    u = le(c, 'sortMarks'),
    d = $(() => (u ? u[t.id] : void 0), [u, t.id]),
    f = B(),
    h = E(
      (O) => {
        f.current = e.flexgrow ? O.parentNode.clientWidth : e.width;
      },
      [e.flexgrow, e.width],
    ),
    m = E(
      (O, W) => {
        c.exec('resize-column', {
          id: e.id,
          width: Math.max(1, (f.current || 0) + O),
          inProgress: W,
        });
      },
      [c, e.id],
    ),
    g = E((O) => m(O, !0), [m]),
    y = E((O) => m(O, !1), [m]),
    w = E(
      (O) => {
        if (!t.sort || e.filter) return;
        let W = d?.order;
        W && (W = W === 'asc' ? 'desc' : 'asc'),
          c.exec('sort-rows', { key: e.id, add: O.ctrlKey, order: W });
      },
      [c, e.id, e.filter, t.sort, d?.order],
    ),
    x = E(
      (O) => {
        O && O.stopPropagation(),
          c.exec('collapse-column', { id: e.id, row: r });
      },
      [c, e.id, r],
    ),
    v = E(
      (O) => {
        O.key === 'Enter' && x();
      },
      [x],
    ),
    k = E(
      (O) => {
        O.key === 'Enter' && !e.filter && w(O);
      },
      [w, e.filter],
    ),
    R = $(() => e.collapsed && t.collapsed, [e.collapsed, t.collapsed]),
    S = $(() => R && !l && e.collapsible !== 'header', [R, l, e.collapsible]),
    C = $(() => (S ? { top: -a / 2, position: 'absolute' } : {}), [S, a]),
    H = $(
      () =>
        Zn(
          e.width,
          e.flexgrow,
          t.fixed,
          t.left,
          e.right ?? t.right,
          e.height + (R && S ? a : 0),
        ),
      [
        e.width,
        e.flexgrow,
        t.fixed,
        t.left,
        e.right,
        t.right,
        e.height,
        R,
        S,
        a,
      ],
    ),
    G = $(() => ri(t, e, i), [t, e, i]),
    N = E(
      () => Object.fromEntries(Object.entries(e).filter(([O]) => O !== 'cell')),
      [e],
    ),
    L = `wx-cell ${G} ${e.css || ''} wx-collapsed`,
    _ = [
      'wx-cell',
      G,
      e.css || '',
      e.filter ? 'wx-filter' : '',
      t.fixed && t.fixed.right ? 'wx-fixed-right' : '',
    ]
      .filter(Boolean)
      .join(' '),
    A = B(null);
  return (
    X(() => {
      const O = A.current;
      if (!O) return;
      const W = Hs(O, { down: h, move: g, up: y });
      return () => {
        typeof W == 'function' && W();
      };
    }, [h, g, y, Hs]),
    R
      ? /* @__PURE__ */ p('div', {
          className: 'wx-RsQD74qC ' + L,
          style: H,
          role: 'button',
          'aria-label': `Expand column ${e.text || ''}`,
          'aria-expanded': !e.collapsed,
          tabIndex: 0,
          onKeyDown: v,
          onClick: x,
          'data-header-id': t.id,
          children: /* @__PURE__ */ p('div', {
            className: 'wx-RsQD74qC wx-text',
            style: C,
            children: e.text || '',
          }),
        })
      : /* @__PURE__ */ J('div', {
          className: 'wx-RsQD74qC ' + _,
          style: H,
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
          onKeyDown: k,
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
                  onKeyDown: v,
                  onClick: x,
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
                    onAction: ({ action: W, data: P }) => c.exec(W, P),
                  });
                })()
              : e.filter
                ? /* @__PURE__ */ p(Qc, { filter: e.filter, column: t })
                : /* @__PURE__ */ p('div', {
                    className: 'wx-RsQD74qC wx-text',
                    children: e.text || '',
                  }),
            t.resize && s && !e._hidden
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-RsQD74qC wx-grip',
                  role: 'presentation',
                  'aria-label': 'Resize column',
                  ref: A,
                  onClick: (O) => O.stopPropagation(),
                  children: /* @__PURE__ */ p('div', {}),
                })
              : null,
            o
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-RsQD74qC wx-sort',
                  children: d
                    ? /* @__PURE__ */ J(Ve, {
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
function Jc({ cell: n, column: e, row: t, columnStyle: r }) {
  const s = He(ht),
    o = $(
      () =>
        Zn(
          n?.width,
          n?.flexgrow,
          e?.fixed,
          e?.left,
          n?.right ?? e?.right,
          n?.height,
        ),
      [n?.width, n?.flexgrow, e?.fixed, e?.left, n?.right, e?.right, n?.height],
    ),
    i = $(() => ri(e, n, r), [e, n, r]),
    a = E(
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
          ? ii.createElement(n.cell, {
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
function As({
  deltaLeft: n,
  contentWidth: e,
  columns: t,
  type: r = 'header',
  columnStyle: s,
  bodyHeight: o,
}) {
  const i = He(ht),
    a = le(i, '_sizes'),
    l = le(i, 'split'),
    c = $(() => a?.[`${r}RowHeights`], [a, r]),
    u = $(() => {
      let g = [];
      if (t && t.length) {
        const y = t[0][r].length;
        for (let w = 0; w < y; w++) {
          let x = 0;
          g.push([]),
            t.forEach((v, k) => {
              const R = { ...v[r][w] };
              if ((x || g[w].push(R), R.colspan > 1)) {
                if (((x = R.colspan - 1), !Go() && v.right)) {
                  let S = v.right;
                  for (let C = 1; C < R.colspan; C++) S -= t[k + C].width;
                  R.right = S;
                }
              } else x && x--;
            });
        }
      }
      return g;
    }, [t, r]),
    d = $(() => l?.left || l?.right, [l]);
  function f(g) {
    return t.find((y) => y.id === g);
  }
  function h(g, y) {
    let w = y;
    return g.rowspan && (w += g.rowspan - 1), w === u.length - 1;
  }
  function m(g, y, w) {
    if (!w.sort) return !1;
    for (let x = u.length - 1; x >= 0; x--) {
      const v = w.header[x];
      if (!v.filter && !v._hidden) return y === x;
    }
    return h(g, y);
  }
  return /* @__PURE__ */ p('div', {
    className: `wx-sAsPVaUK wx-${r}`,
    style: { paddingLeft: `${n}px`, width: `${e}px` },
    role: 'rowgroup',
    children: u.map((g, y) =>
      /* @__PURE__ */ p(
        'div',
        {
          className:
            r === 'header' ? 'wx-sAsPVaUK wx-h-row' : 'wx-sAsPVaUK wx-f-row',
          style: { height: `${c?.[y]}px`, display: 'flex' },
          role: 'row',
          children: g.map((w) => {
            const x = f(w.id);
            return r === 'header'
              ? /* @__PURE__ */ p(
                  Zc,
                  {
                    cell: w,
                    columnStyle: s,
                    column: x,
                    row: y,
                    lastRow: h(w, y),
                    bodyHeight: o,
                    sortRow: m(w, y, x),
                    hasSplit: d,
                  },
                  w.id,
                )
              : /* @__PURE__ */ p(
                  Jc,
                  {
                    cell: w,
                    columnStyle: s,
                    column: f(w.id),
                    row: y,
                  },
                  w.id,
                );
          }),
        },
        y,
      ),
    ),
  });
}
function eu({ overlay: n }) {
  const e = He(ht);
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
function tu(n) {
  const { actions: e, editor: t } = n,
    [r, s] = Z(t?.value || ''),
    o = B(null);
  X(() => {
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
function nu({ actions: n, editor: e, onAction: t }) {
  const [r, s] = Z(e?.value),
    [o, i] = Z(e?.renderedValue),
    [a, l] = Z(e?.options || []),
    c = $(() => e?.config?.template, [e]),
    u = $(() => e?.config?.cell, [e]),
    d = $(() => (a || []).findIndex((x) => x.id === r), [a, r]),
    f = B(null),
    h = B(null),
    m = E(
      (x) => {
        (f.current = x.navigate), (h.current = x.keydown), f.current(d);
      },
      [d, f],
    ),
    g = E(
      (x) => {
        const v = x?.target?.value ?? '';
        i(v);
        const k = v
          ? (e?.options || []).filter((R) =>
              (R.label || '').toLowerCase().includes(v.toLowerCase()),
            )
          : e?.options || [];
        l(k), k.length ? f.current(-1 / 0) : f.current(null);
      },
      [e],
    ),
    y = B(null);
  X(() => {
    y.current && y.current.focus();
  }, []),
    X(() => {
      s(e?.value), i(e?.renderedValue), l(e?.options || []);
    }, [e]);
  const w = E(
    ({ id: x }) => {
      n.updateValue(x), n.save();
    },
    [n],
  );
  return /* @__PURE__ */ J(Ve, {
    children: [
      /* @__PURE__ */ p('input', {
        className: 'wx-0UYfSd1x wx-input',
        ref: y,
        value: o ?? '',
        onChange: g,
        onKeyDown: (x) => (h.current ? h.current(x, d) : void 0),
      }),
      /* @__PURE__ */ p(Gn, {
        items: a,
        onReady: m,
        onSelect: w,
        children: ({ option: x }) =>
          c
            ? c(x)
            : u
              ? /* @__PURE__ */ p(u, { data: x, onAction: t })
              : x.label,
      }),
    ],
  });
}
function ru({ actions: n, editor: e, onAction: t }) {
  const [r] = Z(() => e.value || /* @__PURE__ */ new Date()),
    [s] = Z(() => e.config?.template),
    [o] = Z(() => e.config?.cell);
  function i({ value: l }) {
    n.updateValue(l), n.save();
  }
  const a = B(null);
  return (
    X(() => {
      a.current && a.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ J(Ve, {
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
        /* @__PURE__ */ p(sn, {
          width: 'auto',
          children: /* @__PURE__ */ p(Zs, {
            value: r,
            onChange: i,
            buttons: e.config?.buttons,
          }),
        }),
      ],
    })
  );
}
function su(n) {
  const { actions: e, editor: t } = n,
    r = n.onAction ?? n.onaction,
    s = t.config || {},
    [o] = Z(t.options.find((g) => g.id === t.value)),
    [i] = Z(t.value),
    [a] = Z(t.options),
    l = $(() => a.findIndex((g) => g.id === i), [a, i]);
  function c({ id: g }) {
    e.updateValue(g), e.save();
  }
  let u;
  const [d, f] = Z();
  function h(g) {
    (u = g.navigate), f(() => g.keydown), u(l);
  }
  const m = B(null);
  return (
    X(() => {
      m.current && m.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ J(Ve, {
      children: [
        /* @__PURE__ */ p('div', {
          ref: m,
          className: 'wx-ywGRk611 wx-value',
          tabIndex: 0,
          onClick: () => e.cancel(),
          onKeyDown: (g) => {
            d(g, l), g.preventDefault();
          },
          children: s.template
            ? s.template(o)
            : s.cell
              ? (() => {
                  const g = s.cell;
                  return /* @__PURE__ */ p(g, { data: o, onAction: r });
                })()
              : /* @__PURE__ */ p('span', {
                  className: 'wx-ywGRk611 wx-text',
                  children: t.renderedValue,
                }),
        }),
        /* @__PURE__ */ p(Gn, {
          items: a,
          onReady: h,
          onSelect: c,
          children: ({ option: g }) =>
            s.template
              ? s.template(g)
              : s.cell
                ? (() => {
                    const y = s.cell;
                    return /* @__PURE__ */ p(y, { data: g, onAction: r });
                  })()
                : g.label,
        }),
      ],
    })
  );
}
const ou = {
  text: tu,
  combo: nu,
  datepicker: ru,
  richselect: su,
};
function iu({ column: n, row: e }) {
  const t = He(ht),
    r = le(t, 'editor'),
    s = E(
      (m, g) => {
        t.exec('close-editor', { ignore: m }),
          g &&
            t.exec('focus-cell', {
              ...g,
              eventSource: 'click',
            });
      },
      [t],
    ),
    o = E(
      (m) => {
        const g = m ? null : { row: r?.id, column: r?.column };
        s(!1, g);
      },
      [r, s],
    ),
    i = E(() => {
      s(!0, { row: r?.id, column: r?.column });
    }, [r, s]),
    a = E(
      (m) => {
        t.exec('editor', { value: m });
      },
      [t],
    ),
    l = E(
      (m) => {
        m.key === 'Enter' && r && i();
      },
      [r, i],
    ),
    c = $(
      () => Zn(n.width, n.flexgrow, n.fixed, n.left, n.right),
      [n.width, n.flexgrow, n.fixed, n.left, n.right],
    ),
    u = $(() => {
      let m = n.editor;
      typeof m == 'function' && (m = m(e, n));
      let g = typeof m == 'string' ? m : m.type;
      return ou[g];
    }, [n, e]),
    d = B(null);
  X(() => {
    if (!d.current) return;
    const m = mn(d.current, () => o(!0));
    return () => {
      typeof m == 'function' && m();
    };
  }, [o]),
    X(() => {
      d.current && typeof c == 'string' && d.current.setAttribute('style', c);
    }, [c]);
  const f = typeof e.$parent < 'u' ? 'gridcell' : 'cell',
    h = typeof e.$parent < 'u' ? !n.editor : void 0;
  return /* @__PURE__ */ p('div', {
    className: 'wx-8l724t2g wx-cell wx-editor',
    ref: d,
    style: typeof c == 'object' && c !== null ? c : void 0,
    role: f,
    'aria-readonly': h,
    tabIndex: -1,
    onClick: (m) => m.stopPropagation(),
    onDoubleClick: (m) => m.stopPropagation(),
    onKeyDown: l,
    children: u
      ? /* @__PURE__ */ p(u, {
          editor: r,
          actions: { save: o, cancel: i, updateValue: a },
          onAction: ({ action: m, data: g }) => t.exec(m, g),
        })
      : null,
  });
}
function Ls(n) {
  const { columns: e, type: t, columnStyle: r } = n,
    s = He(ht),
    { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? ' ' + r(c) : '';
  }
  return /* @__PURE__ */ p(Ve, {
    children: e.map((c, u) =>
      /* @__PURE__ */ p(
        'tr',
        {
          children: c.map((d) => {
            const f = i.find((g) => g.id == d.id),
              h = `wx-print-cell-${t}${l(f)}${d.filter ? ' wx-print-cell-filter' : ''}${d.vertical ? ' wx-vertical' : ''}`,
              m = d.cell;
            return /* @__PURE__ */ p(
              'th',
              {
                style: Xs(Uo(d, a.columnWidth)),
                className: 'wx-Gy81xq2u ' + h,
                rowSpan: d.rowspan,
                colSpan: d.colspan,
                children: m
                  ? /* @__PURE__ */ p(m, {
                      api: s,
                      cell: Object.fromEntries(
                        Object.entries(d).filter(([g]) => g !== 'cell'),
                      ),
                      column: f,
                      row: u,
                    })
                  : d.filter
                    ? /* @__PURE__ */ p('div', {
                        className: 'wx-Gy81xq2u wx-print-filter',
                        children: Ql(o, i, d),
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
function au(n) {
  const {
      columns: e,
      rowStyle: t,
      columnStyle: r,
      cellStyle: s,
      header: o,
      footer: i,
      reorder: a,
    } = n,
    l = He(ht),
    { flatData: c, _sizes: u } = l.getState(),
    d = o && Ns(e, 'header', u.headerRowHeights),
    f = i && Ns(e, 'footer', u.footerRowHeights);
  function h(g, y) {
    let w = '';
    return (w += r ? ' ' + r(y) : ''), (w += s ? ' ' + s(g, y) : ''), w;
  }
  function m(g, y) {
    return typeof y.draggable == 'function'
      ? y.draggable(g, y) !== !1
      : y.draggable;
  }
  return /* @__PURE__ */ J('table', {
    className: `wx-8NTMLH0z wx-print-grid ${e.some((g) => g.flexgrow) ? 'wx-flex-columns' : ''}`,
    children: [
      o
        ? /* @__PURE__ */ p('thead', {
            children: /* @__PURE__ */ p(Ls, {
              columns: d,
              type: 'header',
              columnStyle: r,
            }),
          })
        : null,
      /* @__PURE__ */ p('tbody', {
        children: c.map((g, y) =>
          /* @__PURE__ */ p(
            'tr',
            {
              className: 'wx-8NTMLH0z wx-row' + (t ? ' ' + t(g) : ''),
              style: { height: `${g.rowHeight || u.rowHeight}px` },
              children: e.map((w) =>
                w.collapsed
                  ? null
                  : /* @__PURE__ */ J(
                      'td',
                      {
                        className: `wx-8NTMLH0z wx-print-cell wx-cell ${h(g, w)}`,
                        style: Xs(Uo(w, u.columnWidth)),
                        children: [
                          a && w.draggable
                            ? /* @__PURE__ */ p('span', {
                                className: 'wx-8NTMLH0z wx-print-draggable',
                                children: m(g, w)
                                  ? /* @__PURE__ */ p('i', {
                                      className: 'wx-8NTMLH0z wxi-drag',
                                    })
                                  : null,
                              })
                            : null,
                          w.treetoggle
                            ? /* @__PURE__ */ J(Ve, {
                                children: [
                                  /* @__PURE__ */ p('span', {
                                    style: { marginLeft: g.$level * 28 + 'px' },
                                  }),
                                  g.$count
                                    ? /* @__PURE__ */ p('i', {
                                        className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${g.open !== !1 ? 'down' : 'right'}`,
                                      })
                                    : null,
                                ],
                              })
                            : null,
                          w.cell
                            ? (() => {
                                const x = w.cell;
                                return /* @__PURE__ */ p(x, {
                                  api: l,
                                  row: g,
                                  column: w,
                                });
                              })()
                            : /* @__PURE__ */ p('span', { children: At(g, w) }),
                        ],
                      },
                      w.id,
                    ),
              ),
            },
            y,
          ),
        ),
      }),
      i
        ? /* @__PURE__ */ p('tfoot', {
            children: /* @__PURE__ */ p(Ls, {
              columns: f,
              type: 'footer',
              columnStyle: r,
            }),
          })
        : null,
    ],
  });
}
function lu(n) {
  const { config: e, ...t } = n,
    r = He(ht),
    { _skin: s, _columns: o } = r.getState(),
    i = $(() => jl(o, e), []),
    a = B(null);
  return (
    X(() => {
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
            children: /* @__PURE__ */ p(au, { columns: l, ...t }),
          },
          c,
        ),
      ),
    })
  );
}
function cu(n) {
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
      responsiveLevel: h,
      hotkeys: m,
    } = n,
    g = He(ht),
    y = le(g, 'dynamic'),
    w = le(g, '_columns'),
    x = le(g, 'flatData'),
    v = le(g, 'split'),
    k = le(g, '_sizes'),
    [R, S] = Jt(g, 'selectedRows'),
    C = le(g, 'select'),
    H = le(g, 'editor'),
    G = le(g, 'tree'),
    N = le(g, 'focusCell'),
    L = le(g, '_print'),
    _ = le(g, 'undo'),
    A = le(g, 'reorder'),
    O = le(g, '_rowHeightFromData'),
    [W, P] = Z(0);
  X(() => {
    P(jt());
  }, []);
  const [U, T] = Z(0),
    [Y, ne] = Z(0),
    M = $(() => (w || []).some((I) => !I.hidden && I.flexgrow), [w]),
    j = $(() => k?.rowHeight || 0, [k]),
    pe = B(null),
    [ue, Ne] = Z(null),
    [ke, xe] = Z(null),
    we = $(() => {
      let I = [],
        ie = 0;
      return (
        v &&
          v.left &&
          ((I = (w || [])
            .slice(0, v.left)
            .filter((ye) => !ye.hidden)
            .map((ye) => ({ ...ye }))),
          I.forEach((ye) => {
            (ye.fixed = { left: 1 }), (ye.left = ie), (ie += ye.width);
          }),
          I.length && (I[I.length - 1].fixed = { left: -1 })),
        { columns: I, width: ie }
      );
    }, [v, w]),
    Ce = $(() => {
      let I = [],
        ie = 0;
      if (v && v.right) {
        I = (w || [])
          .slice(v.right * -1)
          .filter((ye) => !ye.hidden)
          .map((ye) => ({ ...ye }));
        for (let ye = I.length - 1; ye >= 0; ye--) {
          const Fe = I[ye];
          (Fe.fixed = { right: 1 }), (Fe.right = ie), (ie += Fe.width);
        }
        I.length && (I[0].fixed = { right: -1 });
      }
      return { columns: I, width: ie };
    }, [v, w]),
    Ae = $(() => {
      const I = (w || [])
        .slice(v?.left || 0, (w || []).length - (v?.right ?? 0))
        .filter((ie) => !ie.hidden);
      return (
        I.forEach((ie) => {
          ie.fixed = 0;
        }),
        I
      );
    }, [w, v]),
    $e = $(
      () => (w || []).reduce((I, ie) => (ie.hidden || (I += ie.width), I), 0),
      [w],
    ),
    Q = 1;
  function de(I, ie, ye) {
    let Fe = ie,
      qe = I;
    if (Ae.length) {
      let Ye = Ae.length;
      for (let _e = I; _e >= 0; _e--)
        Ae[_e][ye].forEach((Qe) => {
          Qe.colspan > 1 && _e > I - Qe.colspan && _e < Ye && (Ye = _e);
        });
      if (Ye !== Ae.length && Ye < I) {
        for (let _e = Ye; _e < I; _e++) Fe -= Ae[_e].width;
        qe = Ye;
      }
    }
    return { index: qe, delta: Fe };
  }
  const te = $(() => {
      let I, ie, ye;
      const Fe = U,
        qe = U + (d || 0);
      let Ye = 0,
        _e = 0,
        Qe = 0,
        ot = 0;
      Ae.forEach((z, K) => {
        Fe > Qe && ((Ye = K), (ot = Qe)),
          (Qe = Qe + z.width),
          qe > Qe && (_e = K + Q);
      });
      const ft = { header: 0, footer: 0 };
      for (let z = _e; z >= Ye; z--)
        ['header', 'footer'].forEach((K) => {
          Ae[z] &&
            Ae[z][K].forEach((oe) => {
              const fe = oe.colspan;
              if (fe && fe > 1) {
                const se = fe - (_e - z + 1);
                se > 0 && (ft[K] = Math.max(ft[K], se));
              }
            });
        });
      const Ze = de(Ye, ot, 'header'),
        ct = de(Ye, ot, 'footer'),
        Ht = Ze.delta,
        b = Ze.index,
        F = ct.delta,
        V = ct.index;
      return (
        M && $e > (d || 0)
          ? (I = ie = ye = [...we.columns, ...Ae, ...Ce.columns])
          : ((I = [...we.columns, ...Ae.slice(Ye, _e + 1), ...Ce.columns]),
            (ie = [
              ...we.columns,
              ...Ae.slice(b, _e + ft.header + 1),
              ...Ce.columns,
            ]),
            (ye = [
              ...we.columns,
              ...Ae.slice(V, _e + ft.footer + 1),
              ...Ce.columns,
            ])),
        {
          data: I || [],
          header: ie || [],
          footer: ye || [],
          d: ot,
          df: F,
          dh: Ht,
        }
      );
    }, [Ae, we, Ce, U, d, M, $e]),
    be = $(() => (e && k?.headerHeight) || 0, [e, k]),
    Me = $(() => (t && k?.footerHeight) || 0, [t, k]),
    ge = $(() => (d && f ? $e >= d : !1), [d, f, $e]),
    ze = $(() => (f || 0) - be - Me - (ge ? W : 0), [f, be, Me, ge, W]),
    ce = $(() => Math.ceil((ze || 0) / (j || 1)) + 1, [ze, j]),
    ve = B([]),
    [Oe, me] = Z(0),
    [Ue, ae] = Z(void 0),
    he = $(() => {
      let I = 0,
        ie = 0;
      const ye = 2;
      if (c) {
        let Ye = Y;
        for (; Ye > 0; ) (Ye -= ve.current[I] || j), I++;
        ie = Y - Ye;
        for (let _e = Math.max(0, I - ye - 1); _e < I; _e++)
          ie -= ve.current[I - _e] || j;
        I = Math.max(0, I - ye);
      } else {
        if (O) {
          let Ye = 0,
            _e = 0;
          for (let Ze = 0; Ze < (x || []).length; Ze++) {
            const ct = x[Ze].rowHeight || j;
            if (_e + ct > Y) {
              Ye = Ze;
              break;
            }
            _e += ct;
          }
          I = Math.max(0, Ye - ye);
          for (let Ze = 0; Ze < I; Ze++) ie += x[Ze].rowHeight || j;
          let Qe = 0,
            ot = 0;
          for (let Ze = Ye + 1; Ze < (x || []).length; Ze++) {
            const ct = x[Ze].rowHeight || j;
            if ((Qe++, ot + ct > ze)) break;
            ot += ct;
          }
          const ft = Math.min(y ? y.rowCount : (x || []).length, Ye + Qe + ye);
          return { d: ie, start: I, end: ft };
        }
        (I = Math.floor(Y / (j || 1))),
          (I = Math.max(0, I - ye)),
          (ie = I * (j || 0));
      }
      const Fe = y ? y.rowCount : (x || []).length,
        qe = Math.min(Fe, I + (ce || 0) + ye);
      return { d: ie, start: I, end: qe };
    }, [c, O, Y, j, y, x, ce, ze]),
    We = $(() => {
      const I = y ? y.rowCount : (x || []).length;
      if (c) return Oe + he.d + (I - (Ue || 0)) * (j || 0);
      if (!O) return I * (j || 0);
      let ie = 0;
      for (let ye = 0; ye < I; ye++) ie += x[ye]?.rowHeight || j;
      return ie;
    }, [y, x, j, c, O, Oe, he.d, Ue]),
    De = $(
      () => (d && f ? We + be + Me >= f - ($e >= (d || 0) ? W : 0) : !1),
      [d, f, We, be, Me, $e, W],
    ),
    Ee = $(
      () => (M && $e <= (d || 0) ? (d || 0) - 0 - (De ? W : 0) : $e),
      [M, $e, d, De, W, ge],
    ),
    Ge = $(
      () =>
        M && $e <= (d || 0) ? d || 0 : Ee < (d || 0) ? $e + (De ? W : 0) : -1,
      [M, $e, d, Ee, De, W],
    ),
    D = B({});
  X(() => {
    if (y && (D.current.start !== he.start || D.current.end !== he.end)) {
      const { start: I, end: ie } = he;
      (D.current = { start: I, end: ie }),
        g && g.exec && g.exec('request-data', { row: { start: I, end: ie } });
    }
  }, [y, he, g]);
  const q = $(
      () => (y ? x || [] : (x || []).slice(he.start, he.end)),
      [y, x, he],
    ),
    ee = $(
      () => (R || []).filter((I) => (q || []).some((ie) => ie.id === I)),
      [S, q],
    ),
    re = $(() => he.start, [he.start]),
    Se = E((I) => {
      ne(I.target.scrollTop), T(I.target.scrollLeft);
    }, []),
    Te = E((I) => {
      I.shiftKey && I.preventDefault(),
        pe.current && pe.current.focus && pe.current.focus();
    }, []),
    Le = E(() => !!(w || []).find((I) => !!I.draggable), [w]),
    Ke = B(null),
    ut = B(null),
    bt = B({
      dblclick: (I, ie) => {
        const ye = { id: I, column: yr(ie, 'data-col-id') };
        g.exec('open-editor', ye);
      },
      click: (I, ie) => {
        if (Ke.current) return;
        const ye = yr(ie, 'data-col-id');
        if (
          (N?.id !== I &&
            g.exec('focus-cell', {
              row: I,
              column: ye,
              eventSource: 'click',
            }),
          C === !1)
        )
          return;
        const Fe = s && ie.ctrlKey,
          qe = s && ie.shiftKey;
        (Fe || R.length > 1 || !R.includes(I)) &&
          g.exec('select-row', { id: I, toggle: Fe, range: qe });
      },
      'toggle-row': (I) => {
        const ie = g.getRow(I);
        g.exec(ie.open !== !1 ? 'close-row' : 'open-row', { id: I });
      },
      'ignore-click': () => !1,
    }),
    St = $(
      () => ({
        top: be,
        bottom: Me,
        left: we.width,
        xScroll: ge,
        yScroll: De,
        sense: c && ke ? ke.offsetHeight : Math.max(k?.rowHeight || 0, 40),
        node: pe.current && pe.current.firstElementChild,
      }),
      [be, Me, we.width, ge, De, c, ke, k],
    );
  function Rt(I, ie) {
    const { container: ye, sourceNode: Fe, from: qe } = ie;
    if (Le() && !Fe.getAttribute('draggable-data')) return !1;
    Ne(qe), g.getRow(qe).open && g.exec('close-row', { id: qe, nested: !0 });
    const Ye = rt(Fe, 'data-id'),
      _e = Ye.cloneNode(!0);
    _e.classList.remove('wx-selected'),
      _e
        .querySelectorAll('[tabindex]')
        .forEach((Ze) => Ze.setAttribute('tabindex', '-1')),
      ye.appendChild(_e),
      xe(_e);
    const Qe = U - te.d,
      ot = De ? W : 0;
    ye.style.width =
      Math.min((d || 0) - ot, M && $e <= (d || 0) ? Ee : Ee - ot) + Qe + 'px';
    const ft = Ln(Ye);
    (ie.offset = {
      x: Qe,
      y: -Math.round(ft.height / 2),
    }),
      ut.current || (ut.current = I.clientY);
  }
  function Jn(I, ie) {
    const { from: ye } = ie,
      Fe = ie.pos,
      qe = Ln(pe.current);
    Fe.x = qe.x;
    const Ye = St.top;
    if (Fe.y < Ye) Fe.y = Ye;
    else {
      const _e =
        qe.height - (ge && W > 0 ? W : Math.round(St.sense / 2)) - St.bottom;
      Fe.y > _e && (Fe.y = _e);
    }
    if (pe.current.contains(ie.targetNode)) {
      const _e = rt(ie.targetNode, 'data-id'),
        Qe = nn(_e?.getAttribute('data-id'));
      if (Qe && Qe !== ye) {
        ie.to = Qe;
        const ot = c ? ke?.offsetHeight : k?.rowHeight;
        if (ke && (Y === 0 || Fe.y > Ye + ot - 1)) {
          const ft = _e.getBoundingClientRect(),
            Ze = Ln(ke).y,
            ct = ft.y,
            Ht = Ze > ct ? -1 : 1,
            b = Ht === 1 ? 'after' : 'before',
            F = Math.abs(g.getRowIndex(ye) - g.getRowIndex(Qe)),
            V = F !== 1 ? (b === 'before' ? 'after' : 'before') : b;
          if (
            F === 1 &&
            ((Ht === -1 && I.clientY > ut.current) ||
              (Ht === 1 && I.clientY < ut.current))
          )
            return;
          (ut.current = I.clientY),
            g.exec('move-item', {
              id: ye,
              target: Qe,
              mode: V,
              inProgress: !0,
            });
        }
      }
      o && o({ event: I, context: ie });
    }
    Yc(I, qe, ie, St);
  }
  function Gt(I, ie) {
    const { from: ye, to: Fe } = ie;
    g.exec('move-item', {
      id: ye,
      target: Fe,
      inProgress: !1,
    }),
      (Ke.current = setTimeout(() => {
        Ke.current = 0;
      }, 1)),
      Ne(null),
      xe(null),
      (ut.current = null),
      ti(ie);
  }
  function jt() {
    const I = document.createElement('div');
    (I.style.cssText =
      'position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;'),
      document.body.appendChild(I);
    const ie = I.offsetWidth - I.clientWidth;
    return document.body.removeChild(I), ie;
  }
  const er = $(() => (Ge > 0 ? { width: `${Ge}px` } : void 0), [Ge]),
    bn = B(null);
  function tr() {
    Promise.resolve().then(() => {
      let I = 0,
        ie = re;
      const ye = bn.current;
      ye &&
        (Array.from(ye.children).forEach((Fe, qe) => {
          (ve.current[re + qe] = Fe.offsetHeight), (I += Fe.offsetHeight), ie++;
        }),
        me(I),
        ae(ie));
    });
  }
  X(() => {
    q && c && tr();
  }, [q, c, re]);
  let [dt, It] = Z();
  X(() => {
    if (N && (!C || !ee.length || ee.includes(N.row))) It({ ...N });
    else if (q.length && te.data.length) {
      if (
        !dt ||
        (ee.length && !ee.includes(dt.row)) ||
        q.findIndex((I) => I.id == dt.row) === -1 ||
        te.data.findIndex((I) => I.id == dt.column && !I.collapsed) === -1
      ) {
        const I = ee[0] || q[0].id,
          ie = te.data.findIndex((ye) => !ye.collapsed);
        It(ie !== -1 ? { row: I, column: te.data[ie].id } : null);
      }
    } else It(null);
  }, [N]);
  const Kt = B(null);
  X(() => {
    const I = pe.current;
    if (!I) return;
    const ie = Lc(I, u);
    return () => {
      typeof ie == 'function' && ie();
    };
  }, [u]);
  const $t = B({});
  Object.assign($t.current, {
    start: Rt,
    move: Jn,
    end: Gt,
    getReorder: () => A,
    getDraggableInfo: () => ({ hasDraggable: Le() }),
  }),
    X(() => {
      const I = pe.current;
      return I ? zc(I, $t).destroy : void 0;
    }, [A, pe.current]),
    X(() => {
      const I = pe.current;
      return I
        ? Kr(I, {
            keys: m !== !1 && {
              ...wc,
              'ctrl+z': _,
              'ctrl+y': _,
              ...m,
            },
            exec: (ie) => g.exec('hotkey', ie),
          }).destroy
        : void 0;
    }, [g, _, m]);
  const Ct = B({
    scroll: g.getReactiveState().scroll,
  });
  (Ct.current.getWidth = () => (d || 0) - (De ? W : 0)),
    (Ct.current.getHeight = () => ze),
    (Ct.current.getScrollMargin = () => we.width + Ce.width),
    X(() => {
      xc(Kt.current, Ct.current);
    }, []);
  const Sn = B(null);
  X(() => {
    const I = Sn.current;
    if (!I) return;
    const ie = [];
    return (
      ie.push(
        mn(I, () => g.exec('focus-cell', { eventSource: 'click' })).destroy,
      ),
      ie.push(Ci(I, bt.current)),
      () => ie.forEach((ye) => ye())
    );
  }, []);
  const nr = `wx-grid ${h ? `wx-responsive-${h}` : ''}`;
  return /* @__PURE__ */ J(Ve, {
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-4VuBwK2D ' + nr,
        style: {
          '--header-height': `${be}px`,
          '--footer-height': `${Me}px`,
          '--split-left-width': `${we.width}px`,
          '--split-right-width': `${Ce.width}px`,
        },
        children: /* @__PURE__ */ p('div', {
          ref: pe,
          className: 'wx-4VuBwK2D wx-table-box',
          style: er,
          role: G ? 'treegrid' : 'grid',
          'aria-colcount': te.data.length,
          'aria-rowcount': q.length,
          'aria-multiselectable': G && s ? !0 : void 0,
          tabIndex: -1,
          children: /* @__PURE__ */ J('div', {
            ref: Kt,
            className: 'wx-4VuBwK2D wx-scroll',
            style: {
              overflowX: ge ? 'scroll' : 'hidden',
              overflowY: De ? 'scroll' : 'hidden',
            },
            onScroll: Se,
            children: [
              e
                ? /* @__PURE__ */ p('div', {
                    className: 'wx-4VuBwK2D wx-header-wrapper',
                    children: /* @__PURE__ */ p(As, {
                      contentWidth: Ee,
                      deltaLeft: te.dh,
                      columns: te.header,
                      columnStyle: a,
                      bodyHeight: ze - +t,
                    }),
                  })
                : null,
              /* @__PURE__ */ J('div', {
                ref: Sn,
                className: 'wx-4VuBwK2D wx-body',
                style: { width: `${Ee}px`, height: `${We}px` },
                onMouseDown: (I) => Te(I),
                children: [
                  r ? /* @__PURE__ */ p(eu, { overlay: r }) : null,
                  /* @__PURE__ */ p('div', {
                    ref: bn,
                    className: 'wx-4VuBwK2D wx-data',
                    style: {
                      paddingTop: `${he.d}px`,
                      paddingLeft: `${te.d}px`,
                    },
                    children: q.map((I, ie) => {
                      const ye = R.indexOf(I.id) !== -1,
                        Fe = ue === I.id,
                        qe =
                          'wx-row' +
                          (c ? ' wx-autoheight' : '') +
                          (i ? ' ' + i(I) : '') +
                          (ye ? ' wx-selected' : '') +
                          (Fe ? ' wx-inactive' : ''),
                        Ye = c
                          ? { minHeight: `${I.rowHeight || j}px` }
                          : { height: `${I.rowHeight || j}px` };
                      return /* @__PURE__ */ p(
                        'div',
                        {
                          className: 'wx-4VuBwK2D ' + qe,
                          'data-id': I.id,
                          'data-context-id': I.id,
                          style: Ye,
                          role: 'row',
                          'aria-rowindex': ie,
                          'aria-expanded': I.open,
                          'aria-level': G ? I.$level + 1 : void 0,
                          'aria-selected': G ? ye : void 0,
                          tabIndex: -1,
                          children: te.data.map((_e) =>
                            _e.collapsed
                              ? /* @__PURE__ */ p(
                                  'div',
                                  {
                                    className:
                                      'wx-4VuBwK2D wx-cell wx-collapsed',
                                  },
                                  _e.id,
                                )
                              : H?.id === I.id && H.column == _e.id
                                ? /* @__PURE__ */ p(
                                    iu,
                                    { row: I, column: _e },
                                    _e.id,
                                  )
                                : /* @__PURE__ */ p(
                                    jc,
                                    {
                                      row: I,
                                      column: _e,
                                      columnStyle: a,
                                      cellStyle: l,
                                      reorder: A,
                                      focusable:
                                        dt?.row === I.id && dt?.column == _e.id,
                                    },
                                    _e.id,
                                  ),
                          ),
                        },
                        I.id,
                      );
                    }),
                  }),
                ],
              }),
              t && (x || []).length
                ? /* @__PURE__ */ p(As, {
                    type: 'footer',
                    contentWidth: Ee,
                    deltaLeft: te.df,
                    columns: te.footer,
                    columnStyle: a,
                  })
                : null,
            ],
          }),
        }),
      }),
      L
        ? /* @__PURE__ */ p(lu, {
            config: L,
            rowStyle: i,
            columnStyle: a,
            cellStyle: l,
            header: e,
            footer: t,
            reorder: A,
          })
        : null,
    ],
  });
}
const uu = (n) =>
    n
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  du = Bt(function (
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
      onReorder: h = null,
      autoRowHeight: m = !1,
      sizes: g,
      split: y,
      tree: w = !1,
      autoConfig: x = !1,
      init: v = null,
      responsive: k = null,
      sortMarks: R,
      undo: S = !1,
      hotkeys: C = null,
      ...H
    },
    G,
  ) {
    const N = B();
    N.current = H;
    const L = $(() => new dc(qs), []),
      _ = $(() => L.in, [L]),
      A = B(null);
    A.current === null &&
      ((A.current = new ro((we, Ce) => {
        const Ae = 'on' + uu(we);
        N.current && N.current[Ae] && N.current[Ae](Ce);
      })),
      _.setNext(A.current));
    const O = $(
        () => ({
          getState: L.getState.bind(L),
          getReactiveState: L.getReactive.bind(L),
          getStores: () => ({ data: L }),
          exec: _.exec,
          setNext: (we) => ((A.current = A.current.setNext(we)), A.current),
          intercept: _.intercept.bind(_),
          on: _.on.bind(_),
          detach: _.detach.bind(_),
          getRow: L.getRow.bind(L),
          getRowIndex: L.getRowIndex.bind(L),
          getColumn: L.getColumn.bind(L),
        }),
        [L, _],
      ),
      [W, P] = Z(0),
      [U, T] = Z(0),
      [Y, ne] = Z(null),
      [M, j] = Z(null),
      pe = $(() => {
        if (x && !e.length && n.length) {
          const we = n[0],
            Ce = [];
          for (let Ae in we)
            if (Ae !== 'id' && Ae[0] !== '$') {
              let $e = {
                id: Ae,
                header: Ae[0].toUpperCase() + Ae.slice(1),
              };
              typeof x == 'object' && ($e = { ...$e, ...x }), Ce.push($e);
            }
          return Ce;
        }
        return (M && M.columns) ?? e;
      }, [x, e, n, M]),
      ue = $(() => (M && M.sizes) ?? g, [M, g]),
      Ne = E(
        (we) => {
          if ((P(we.width), T(we.height), k)) {
            const Ce =
              Object.keys(k)
                .map(Number)
                .sort((Ae, $e) => Ae - $e)
                .find((Ae) => we.width <= Ae) ?? null;
            Ce !== Y && (j(k[Ce]), ne(Ce));
          }
        },
        [k, Y],
      ),
      ke = He(st.theme),
      xe = B(0);
    return (
      X(() => {
        if (!xe.current) v && v(O);
        else {
          const we = L.getState();
          L.init({
            data: n,
            columns: pe,
            split: y || we.split,
            sizes: ue || we.sizes,
            selectedRows: o || we.selectedRows,
            dynamic: u,
            tree: w,
            sortMarks: R || we.sortMarks,
            undo: S,
            reorder: f,
            _skin: ke,
            _select: i,
          });
        }
        xe.current++;
      }, [L, n, pe, y, ue, o, u, w, R, S, f, ke, i, v, O]),
      xe.current === 0 &&
        L.init({
          data: n,
          columns: pe,
          split: y || { left: 0 },
          sizes: ue || {},
          selectedRows: o || [],
          dynamic: u,
          tree: w,
          sortMarks: R || {},
          undo: S,
          reorder: f,
          _skin: ke,
          select: i,
        }),
      Vt(
        G,
        () => ({
          ...O,
        }),
        [O],
      ),
      /* @__PURE__ */ p(ht.Provider, {
        value: O,
        children: /* @__PURE__ */ p(jn, {
          words: kc,
          optional: !0,
          children: /* @__PURE__ */ p(cu, {
            header: l,
            footer: c,
            overlay: d,
            rowStyle: t,
            columnStyle: r,
            cellStyle: s,
            onReorder: h,
            multiselect: a,
            autoRowHeight: m,
            clientWidth: W,
            clientHeight: U,
            responsiveLevel: Y,
            resize: Ne,
            hotkeys: C,
          }),
        }),
      })
    );
  });
function fu({ item: n }) {
  return /* @__PURE__ */ J('div', {
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
function hu({ columns: n = null, api: e, children: t }) {
  X(() => {
    Cc('table-header', fu);
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
  const i = vt(e, '_columns'),
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
  return /* @__PURE__ */ p(Qo, {
    dataKey: 'headerId',
    options: a,
    onClick: s,
    at: 'point',
    resolver: o,
    children: typeof t == 'function' ? t() : t,
  });
}
Ar(lt);
function gu({ row: n, column: e }) {
  const t = He(Et);
  function r(o, i) {
    return {
      justifyContent: i.align,
      paddingLeft: `${(o.$level - 1) * 20}px`,
    };
  }
  const s = e && e._cell;
  return /* @__PURE__ */ J('div', {
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
function Ps({ column: n, cell: e }) {
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
function pu(n) {
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
    [d, f] = Xe(o),
    [h, m] = Z(),
    g = He(st.i18n),
    y = $(() => g.getGroup('gantt'), [g]),
    w = He(Et),
    x = le(w, 'scrollTop'),
    v = le(w, 'cellHeight'),
    k = le(w, '_scrollTask'),
    R = le(w, '_selected'),
    S = le(w, 'area'),
    C = le(w, '_tasks'),
    H = le(w, '_scales'),
    G = le(w, 'columns'),
    N = le(w, '_sort'),
    L = le(w, 'calendar'),
    _ = le(w, 'durationUnit'),
    A = le(w, 'splitTasks'),
    [O, W] = Z(null),
    P = $(() => {
      if (!C || !S) return [];
      if (l && c) {
        const D = /* @__PURE__ */ new Set();
        return C.filter((q) => {
          const ee = c.taskRows.get(q.id) ?? q.id;
          return D.has(ee) ? !1 : (D.add(ee), !0);
        });
      }
      return C.slice(S.start, S.end);
    }, [C, S, l, c, i]),
    U = E(
      (D, q) => {
        if (q === 'add-task')
          w.exec(q, {
            target: D,
            task: { text: y('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (q === 'open-task') {
          const ee = P.find((re) => re.id === D);
          (ee?.data || ee?.lazy) && w.exec(q, { id: D, mode: !ee.open });
        }
      },
      [P],
    ),
    T = E(
      (D) => {
        const q = _t(D),
          ee = D.target.dataset.action;
        ee && D.preventDefault(),
          q
            ? ee === 'add-task' || ee === 'open-task'
              ? U(q, ee)
              : w.exec('select-task', {
                  id: q,
                  toggle: D.ctrlKey || D.metaKey,
                  range: D.shiftKey,
                  show: !0,
                })
            : ee === 'add-task' && U(null, ee);
      },
      [w, U],
    ),
    Y = B(null),
    ne = B(null),
    [M, j] = Z(0),
    [pe, ue] = Z(!1);
  X(() => {
    const D = ne.current;
    if (!D || typeof ResizeObserver > 'u') return;
    const q = () => j(D.clientWidth);
    q();
    const ee = new ResizeObserver(q);
    return ee.observe(D), () => ee.disconnect();
  }, []);
  const Ne = B(null),
    ke = E(
      (D) => {
        const q = D.id,
          { before: ee, after: re } = D,
          Se = D.onMove;
        let Te = ee || re,
          Le = ee ? 'before' : 'after';
        if (Se) {
          if (Le === 'after') {
            const Ke = w.getTask(Te);
            Ke.data?.length &&
              Ke.open &&
              ((Le = 'before'), (Te = Ke.data[0].id));
          }
          Ne.current = { id: q, [Le]: Te };
        } else Ne.current = null;
        w.exec('move-task', {
          id: q,
          mode: Le,
          target: Te,
          inProgress: Se,
        });
      },
      [w],
    ),
    xe = $(() => S?.from ?? 0, [S]),
    we = $(() => H?.height ?? 0, [H]),
    Ce = $(
      () => (!t && s !== 'grid' ? (d ?? 0) > (r ?? 0) : (d ?? 0) > (M ?? 0)),
      [t, s, d, r, M],
    ),
    Ae = $(() => {
      const D = {};
      return (
        (Ce && s === 'all') || (s === 'grid' && Ce)
          ? (D.width = d)
          : s === 'grid' && (D.width = '100%'),
        l && i && (D.minHeight = i),
        D
      );
    }, [Ce, s, d, l, i]),
    $e = $(() => (O && !P.find((D) => D.id === O.id) ? [...P, O] : P), [P, O]),
    Q = $(() => {
      let D = (G || []).map((re) => {
        re = { ...re };
        const Se = re.header;
        if (typeof Se == 'object') {
          const Te = Se.text && y(Se.text);
          re.header = { ...Se, text: Te };
        } else re.header = y(Se);
        if (re.cell && re.id !== 'text' && re.id !== 'add-task') {
          const Te = re.cell;
          re.cell = (Le) => /* @__PURE__ */ p(Te, { ...Le, api: w });
        }
        return re;
      });
      const q = D.findIndex((re) => re.id === 'text'),
        ee = D.findIndex((re) => re.id === 'add-task');
      if (
        (q !== -1 && (D[q].cell && (D[q]._cell = D[q].cell), (D[q].cell = gu)),
        ee !== -1)
      ) {
        D[ee].cell = D[ee].cell || Ps;
        const re = D[ee].header;
        if (
          (typeof re != 'object' && (D[ee].header = { text: re }),
          (D[ee].header.cell = re.cell || Ps),
          e)
        )
          D.splice(ee, 1);
        else if (t) {
          const [Se] = D.splice(ee, 1);
          D.unshift(Se);
        }
      }
      return D.length > 0 && (D[D.length - 1].resize = !1), D;
    }, [G, y, e, t, w]),
    de = $(
      () =>
        s === 'all'
          ? `${r}px`
          : s === 'grid'
            ? 'calc(100% - 4px)'
            : Q.find((D) => D.id === 'add-task')
              ? '50px'
              : '0',
      [s, r, Q],
    ),
    te = $(() => {
      if ($e && N?.length) {
        const D = {};
        return (
          N.forEach(({ key: q, order: ee }, re) => {
            D[q] = {
              order: ee,
              ...(N.length > 1 && { index: re }),
            };
          }),
          D
        );
      }
      return {};
    }, [$e, N]),
    be = E(() => Q.some((D) => D.flexgrow && !D.hidden), []),
    Me = $(() => be(), [be, pe]),
    ge = $(() => {
      let D = s === 'chart' ? Q.filter((ee) => ee.id === 'add-task') : Q;
      const q = s === 'all' ? r : M;
      if (!Me) {
        let ee = d,
          re = !1;
        if (Q.some((Se) => Se.$width)) {
          let Se = 0;
          (ee = Q.reduce(
            (Te, Le) => (
              Le.hidden || ((Se += Le.width), (Te += Le.$width || Le.width)), Te
            ),
            0,
          )),
            Se > ee && ee > q && (re = !0);
        }
        if (re || ee < q) {
          let Se = 1;
          return (
            re || (Se = (q - 50) / (ee - 50 || 1)),
            D.map(
              (Te) => (
                Te.id !== 'add-task' &&
                  !Te.hidden &&
                  (Te.$width || (Te.$width = Te.width),
                  (Te.width = Te.$width * Se)),
                Te
              ),
            )
          );
        }
      }
      return D;
    }, [s, Q, Me, d, r, M]),
    ze = E(
      (D) => {
        if (!be()) {
          const q = ge.reduce(
            (ee, re) => (
              D && re.$width && (re.$width = re.width),
              ee + (re.hidden ? 0 : re.width)
            ),
            0,
          );
          q !== d && f(q);
        }
        ue(!0), ue(!1);
      },
      [be, ge, d, f],
    ),
    ce = E(() => {
      Q.filter((q) => q.flexgrow && !q.hidden).length === 1 &&
        Q.forEach((q) => {
          q.$width && !q.flexgrow && !q.hidden && (q.width = q.$width);
        });
    }, []),
    ve = E(
      (D) => {
        if (!e) {
          const q = _t(D),
            ee = yr(D, 'data-col-id');
          !(ee && Q.find((Se) => Se.id == ee))?.editor &&
            q &&
            w.exec('show-editor', { id: q });
        }
      },
      [w, e],
      // cols is defined later; relies on latest value at call time
    ),
    Oe = $(() => (Array.isArray(R) ? R.map((D) => D.id) : []), [R]),
    me = E(() => {
      if (Y.current && $e !== null) {
        const D = Y.current.querySelector('.wx-body');
        D &&
          (l
            ? (D.style.top = '0px')
            : (D.style.top = -((x ?? 0) - (xe ?? 0)) + 'px'));
      }
      ne.current && (ne.current.scrollTop = 0);
    }, [$e, x, xe, l]);
  X(() => {
    Y.current && me();
  }, [x, xe, me]),
    X(() => {
      const D = Y.current;
      if (!D) return;
      const q = D.querySelector('.wx-table-box .wx-body');
      if (!q || typeof ResizeObserver > 'u') return;
      const ee = new ResizeObserver(() => {
        me();
      });
      return (
        ee.observe(q),
        () => {
          ee.disconnect();
        }
      );
    }, [ge, Ae, s, de, $e, me]),
    X(() => {
      if (!k || !h) return;
      const { id: D } = k,
        q = h.getState().focusCell;
      q &&
        q.row !== D &&
        Y.current &&
        Y.current.contains(document.activeElement) &&
        h.exec('focus-cell', {
          row: D,
          column: q.column,
        });
    }, [k, h]),
    X(() => {
      if (!l) return;
      const D = Y.current;
      if (!D) return;
      const q = D.querySelector('.wx-table-box .wx-body');
      if (!q) return;
      const ee = {
        attributes: !0,
        attributeFilter: ['style'],
        childList: !0,
      };
      let re = null,
        Se;
      const Te = () => {
        Se.disconnect();
        let Le = 0;
        q.querySelectorAll('[data-id]').forEach((ut) => {
          const bt = ut.getAttribute('data-id'),
            St =
              c && bt
                ? (c.taskRows.get(bt) ?? c.taskRows.get(Number(bt)) ?? bt)
                : bt,
            Rt = (u && St && u[St]) || v;
          (ut.style.height = `${Rt}px`),
            (ut.style.minHeight = `${Rt}px`),
            (Le += Rt);
        }),
          Le > 0 && (q.style.height = `${Le}px`),
          Se.observe(q, ee);
      };
      return (
        (Se = new MutationObserver(() => {
          re && cancelAnimationFrame(re), (re = requestAnimationFrame(Te));
        })),
        Te(),
        () => {
          Se.disconnect(), re && cancelAnimationFrame(re);
        }
      );
    }, [u, l, $e, v, c]);
  const Ue = E(
      ({ id: D }) => {
        if (e) return !1;
        w.getTask(D).open && w.exec('open-task', { id: D, mode: !1 });
        const q = w.getState()._tasks.find((ee) => ee.id === D);
        if ((W(q || null), !q)) return !1;
      },
      [w, e],
    ),
    ae = E(
      ({ id: D, top: q }) => {
        Ne.current
          ? ke({ ...Ne.current, onMove: !1 })
          : w.exec('drag-task', {
              id: D,
              top: q + (xe ?? 0),
              inProgress: !1,
            }),
          W(null);
      },
      [w, ke, xe],
    ),
    he = E(
      ({ id: D, top: q, detail: ee }) => {
        ee && ke({ ...ee, onMove: !0 }),
          w.exec('drag-task', {
            id: D,
            top: q + (xe ?? 0),
            inProgress: !0,
          });
      },
      [w, ke, xe],
    );
  X(() => {
    const D = Y.current;
    return D
      ? vc(D, {
          start: Ue,
          end: ae,
          move: he,
          getTask: w.getTask,
        }).destroy
      : void 0;
  }, [w, Ue, ae, he]);
  const We = E(
      (D) => {
        const { key: q, isInput: ee } = D;
        if (!ee && (q === 'arrowup' || q === 'arrowdown'))
          return (D.eventSource = 'grid'), w.exec('hotkey', D), !1;
        if (q === 'enter') {
          const re = h?.getState().focusCell;
          if (re) {
            const { row: Se, column: Te } = re;
            Te === 'add-task'
              ? U(Se, 'add-task')
              : Te === 'text' && U(Se, 'open-task');
          }
        }
      },
      [w, U, h],
    ),
    De = B(null),
    Ee = () => {
      De.current = {
        setTableAPI: m,
        handleHotkey: We,
        sortVal: N,
        api: w,
        adjustColumns: ce,
        setColumnWidth: ze,
        tasks: P,
        calendarVal: L,
        durationUnitVal: _,
        splitTasksVal: A,
        onTableAPIChange: a,
      };
    };
  Ee(),
    X(() => {
      Ee();
    }, [m, We, N, w, ce, ze, P, L, _, A, a]);
  const Ge = E((D) => {
    m(D),
      D.intercept('hotkey', (q) => De.current.handleHotkey(q)),
      D.intercept('scroll', () => !1),
      D.intercept('select-row', () => !1),
      D.intercept('sort-rows', (q) => {
        const ee = De.current.sortVal,
          { key: re, add: Se } = q,
          Te = ee ? ee.find((Ke) => Ke.key === re) : null;
        let Le = 'asc';
        return (
          Te && (Le = !Te || Te.order === 'asc' ? 'desc' : 'asc'),
          w.exec('sort-tasks', {
            key: re,
            order: Le,
            add: Se,
          }),
          !1
        );
      }),
      D.on('resize-column', () => {
        De.current.setColumnWidth(!0);
      }),
      D.on('hide-column', (q) => {
        q.mode || De.current.adjustColumns(), De.current.setColumnWidth();
      }),
      D.intercept('update-cell', (q) => {
        const { id: ee, column: re, value: Se } = q,
          Te = De.current.tasks.find((Le) => Le.id === ee);
        if (Te) {
          const Le = { ...Te };
          let Ke = Se;
          Ke && !isNaN(Ke) && !(Ke instanceof Date) && (Ke *= 1),
            (Le[re] = Ke),
            Po(
              Le,
              {
                calendar: De.current.calendarVal,
                durationUnit: De.current.durationUnitVal,
                splitTasks: De.current.splitTasksVal,
              },
              re,
            ),
            w.exec('update-task', {
              id: ee,
              task: Le,
            });
        }
        return !1;
      }),
      a && a(D);
  }, []);
  return /* @__PURE__ */ p('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${de}` },
    ref: ne,
    children: /* @__PURE__ */ p('div', {
      ref: Y,
      style: Ae,
      className: 'wx-rHj6070p wx-table',
      onClick: T,
      onDoubleClick: ve,
      children: /* @__PURE__ */ p(du, {
        init: Ge,
        sizes: {
          rowHeight: v,
          headerHeight: (we ?? 0) - 1,
        },
        rowStyle: (D) =>
          D.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (D) =>
          `wx-rHj6070p wx-text-${D.align}${D.id === 'add-task' ? ' wx-action' : ''}`,
        data: $e,
        columns: ge,
        selectedRows: [...Oe],
        sortMarks: te,
      }),
    }),
  });
}
function mu({ borders: n = '', rowLayout: e = null }) {
  const t = He(Et),
    r = le(t, 'cellWidth'),
    s = le(t, 'cellHeight'),
    o = B(null),
    [i, a] = Z('#e4e4e4');
  X(() => {
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
      background: r != null && s != null ? `url(${$l(r, s, i, n)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ p('div', { ref: o, style: u });
  }
  const c = r
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${r - 1}px, ${i} ${r - 1}px, ${i} ${r}px)`
    : void 0;
  return /* @__PURE__ */ J('div', {
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
function pn(n) {
  const e = n.split(',').map(Number),
    t = [];
  for (let r = 0; r < e.length; r += 2) t.push([e[r], e[r + 1]]);
  return { path: t.slice(0, -3), arrow: t.slice(-3) };
}
function wu(n) {
  return n.split(',').map(Number).slice(0, -6).join(',');
}
function xu(n, e = 8) {
  if (!n) return '';
  const { path: t } = pn(n);
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
      h = Math.hypot(u, d);
    if (f === 0 || h === 0) {
      r += ` L${i[0]},${i[1]}`;
      continue;
    }
    const m = Math.min(e, f / 2, h / 2),
      g = i[0] - (l / f) * m,
      y = i[1] - (c / f) * m,
      w = i[0] + (u / h) * m,
      x = i[1] + (d / h) * m;
    (r += ` L${g},${y}`), (r += ` Q${i[0]},${i[1]} ${w},${x}`);
  }
  return (r += ` L${t[t.length - 1][0]},${t[t.length - 1][1]}`), r;
}
function yu(n, e) {
  if (!n) return '';
  const { path: t } = pn(n);
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
    const h = Math.max(40, Math.min(d * 0.3, 160)),
      m = Math.max(60, Math.min(d * 0.4, 200)),
      g = Math.max(40, Math.min(d * 0.2, 100)),
      y = i >= 0 ? 1 : -1,
      w = r[0] + (a ? h : -h),
      x = r[1] + y * g,
      v = s[0] + (l ? -m : m);
    f += ` C${w},${x} ${v},${s[1]} ${s[0]},${s[1]}`;
  } else {
    const h = Math.max(40, Math.min(u * 0.5, 150)),
      m = r[0] + (a ? h : -h),
      g = s[0] + (l ? -h : h);
    f += ` C${m},${r[1]} ${g},${s[1]} ${s[0]},${s[1]}`;
  }
  return f;
}
function vu(n, e, t) {
  return e === 'bezier' ? yu(n, t) : xu(n);
}
const Hn = 5,
  Os = 4;
function ku(n) {
  if (!n || !n.length) return n;
  const e = n.map((o) => {
      if (!o.$p) return null;
      const { path: i } = pn(o.$p);
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
          const f = Math.round((c + d) / 2 / Hn) * Hn;
          t.has(f) || t.set(f, []),
            t.get(f).push({
              linkIdx: i,
              segIdx: a,
              min: Math.min(l, u),
              max: Math.max(l, u),
              y: (c + d) / 2,
            });
        } else if (Math.abs(l - u) < 1) {
          const f = Math.round((l + u) / 2 / Hn) * Hn;
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
      const u = (c - (a - 1) / 2) * Os,
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
      const u = (c - (a - 1) / 2) * Os,
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
function An(n, e) {
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
function bu(n, e) {
  const t = e?.style || n;
  if (t === 'dashed') return '8 4';
  if (t === 'dotted') return '2 4';
}
function Su({
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
  const u = He(Et),
    [d, f] = Jt(u, '_links'),
    [h] = Jt(u, 'criticalPath'),
    m = le(u, '_tasks'),
    g = r && r !== 'squared',
    y = B(null),
    w = B(null),
    x = B(null),
    v = B(/* @__PURE__ */ new Set());
  X(() => {
    if (!s || !w.current) return;
    const _ = getComputedStyle(w.current);
    x.current = {
      task: _.getPropertyValue('--wx-gantt-task-color').trim() || null,
      summary: _.getPropertyValue('--wx-gantt-summary-color').trim() || null,
      milestone:
        _.getPropertyValue('--wx-gantt-milestone-color').trim() || null,
      link: _.getPropertyValue('--wx-gantt-link-color').trim() || '#888',
    };
  }, [s]);
  const k = $(() => {
      if (!d?.length || !m?.length) return d;
      const _ = new Set(m.map((U) => U.id)),
        A = new Map(m.map((U) => [U.id, U]));
      let O = !1;
      for (const U of d)
        if (!_.has(U.source) || !_.has(U.target)) {
          O = !0;
          break;
        }
      if (!O) return d;
      function W(U) {
        let T = u.getTask(U);
        for (; T; ) {
          if (_.has(T.id)) return A.get(T.id);
          if (!T.parent) return null;
          T = u.getTask(T.parent);
        }
        return null;
      }
      function P(U, T, Y) {
        const ne = !Y || Y[0] === 'e',
          M = !Y || Y[2] === 's',
          j = U.$h || c,
          pe = T.$h || c,
          ue = ne ? U.$x + U.$w : U.$x,
          Ne = U.$y + j / 2,
          ke = M ? T.$x : T.$x + T.$w,
          xe = T.$y + pe / 2,
          we = 5,
          Ce = M ? -1 : 1,
          Ae = ke + Ce * -10,
          $e = xe - we,
          Q = ke,
          de = xe,
          te = ke + Ce * -10,
          be = xe + we;
        return [ue, Ne, ke, xe, Ae, $e, Q, de, te, be].join(',');
      }
      return d.map((U) => {
        const T = _.has(U.source),
          Y = _.has(U.target);
        if (T && Y) return U;
        const ne = T ? A.get(U.source) : W(U.source),
          M = Y ? A.get(U.target) : W(U.target);
        if (!ne || !M || ne.id === M.id) return U;
        const j = P(ne, M, U.type);
        return { ...U, $p: j, _rerouted: !0 };
      });
    }, [d, f, m, u, c]),
    R = $(() => {
      if (!a || !l || !m?.length || !k?.length || !c) return k;
      const _ = /* @__PURE__ */ new Map();
      let A = !1;
      if (
        (m.forEach((P) => {
          const U = l.get(P.id);
          if (!U) return;
          const T = P.$y + c / 2,
            ne = U.y + U.h / 2 - T;
          Math.abs(ne) > 0.5 && (A = !0), _.set(P.id, ne);
        }),
        !A)
      )
        return k;
      const O = [];
      m.forEach((P) => {
        const U = _.get(P.id);
        U !== void 0 && O.push({ storeCenter: P.$y + c / 2, delta: U });
      }),
        O.sort((P, U) => P.storeCenter - U.storeCenter);
      function W(P) {
        let U = 0,
          T = 1 / 0;
        for (const Y of O) {
          const ne = Math.abs(P - Y.storeCenter);
          ne < T && ((T = ne), (U = Y.delta));
        }
        return U;
      }
      return k.map((P) => {
        if (!P.$p) return P;
        const U = _.get(P.source) ?? 0,
          T = _.get(P.target) ?? 0;
        if (Math.abs(U) < 0.5 && Math.abs(T) < 0.5) return P;
        const Y = P.$p.split(',').map(Number),
          ne = [...Y],
          M = Y.length - 6;
        M >= 2 && (ne[1] += U), M >= 4 && (ne[M - 1] += T);
        for (let j = 2; j < M - 2; j += 2) ne[j + 1] += W(Y[j + 1]);
        for (let j = M; j < Y.length; j += 2) ne[j + 1] += T;
        return { ...P, $p: ne.join(',') };
      });
    }, [k, f, a, l, m, c]),
    S = $(() => (!i || !R?.length ? R : ku(R)), [R, f, i]),
    C = $(() => {
      const _ = v.current,
        A = /* @__PURE__ */ new Set();
      if (S) for (const O of S) _.has(O.id) || A.add(O.id);
      return A;
    }, [S, f]);
  X(() => {
    S && (v.current = new Set(S.map((_) => _.id)));
  }, [S, f]);
  const H = E(
    (_) => {
      const A = _?.target?.classList;
      !A?.contains('wx-line') &&
        !A?.contains('wx-line-hitarea') &&
        !A?.contains('wx-delete-button') &&
        n(null);
    },
    [n],
  );
  X(() => {
    if (!t && e && y.current) {
      const _ = (A) => {
        y.current && !y.current.contains(A.target) && H(A);
      };
      return (
        document.addEventListener('click', _),
        () => {
          document.removeEventListener('click', _);
        }
      );
    }
  }, [t, e, H]);
  const G = $(() => {
      if (!s || !S?.length) return null;
      const _ = [];
      for (const A of S) {
        if (!A.$p || (h && A.$critical)) continue;
        const W = u.getTask(A.source),
          P = u.getTask(A.target),
          U = An(W, x) || x.current?.link || '#888',
          T = An(P, x) || x.current?.link || '#888',
          { path: Y } = pn(A.$p);
        if (Y.length < 2) continue;
        const ne = Y[0],
          M = Y[Y.length - 1],
          j = W?.progress ?? 0,
          pe = Math.min(100, Math.max(0, j));
        _.push(
          /* @__PURE__ */ J(
            'linearGradient',
            {
              id: `wx-link-grad-${A.id}`,
              gradientUnits: 'userSpaceOnUse',
              x1: ne[0],
              y1: ne[1],
              x2: M[0],
              y2: M[1],
              children: [
                /* @__PURE__ */ p('stop', { offset: '0%', stopColor: U }),
                pe > 0 &&
                  /* @__PURE__ */ p('stop', { offset: `${pe}%`, stopColor: U }),
                /* @__PURE__ */ p('stop', { offset: '100%', stopColor: T }),
              ],
            },
            `grad-${A.id}`,
          ),
        );
      }
      return _;
    }, [S, f, s, h, u]),
    N = (_, A) => {
      const O = h && _.$critical,
        W = C.has(_.id),
        P = _._rerouted ? '6 3' : bu(o, _),
        U = W && !A,
        T = r === 'bezier',
        ne =
          'wx-dkx3NwEn wx-line' +
          (O ? ' wx-critical' : '') +
          (!t && !A ? ' wx-line-selectable' : '') +
          (A ? ' wx-line-selected wx-line-selectable wx-delete-link' : '') +
          ' wx-line-visible' +
          (U ? (P ? ' wx-line-new-fade' : ' wx-line-new') : ''),
        M = 'wx-dkx3NwEn wx-line-hitarea';
      let j,
        pe = O
          ? 'url(#wx-arrow-critical)'
          : A
            ? 'url(#wx-arrow-selected)'
            : 'url(#wx-arrow-default)';
      if (
        (s &&
          !O &&
          !A &&
          _.$p &&
          ((j = `url(#wx-link-grad-${_.id})`),
          (pe = `url(#wx-arrow-grad-${_.id})`)),
        g)
      ) {
        const Ne = vu(_.$p, r, _.type);
        if (T && _.$p) {
          const { arrow: ke } = pn(_.$p),
            xe = ke.map((Ce) => Ce.join(',')).join(' ');
          let we;
          if (A) we = 'var(--wx-color-danger)';
          else if (O) we = 'var(--wx-gantt-link-critical-color)';
          else if (s && _.$p) {
            const Ce = u.getTask(_.target);
            we = An(Ce, x) || x.current?.link || 'var(--wx-gantt-link-color)';
          } else we = 'var(--wx-gantt-link-color)';
          return /* @__PURE__ */ J(
            un,
            {
              children: [
                /* @__PURE__ */ p('path', {
                  className: M,
                  d: Ne,
                  onClick: () => !t && !A && n(_.id),
                  'data-link-id': _.id,
                }),
                /* @__PURE__ */ p('path', {
                  ref: A ? y : void 0,
                  className: ne,
                  d: Ne,
                  stroke: j,
                  strokeDasharray: P,
                  'data-link-id': _.id,
                }),
                /* @__PURE__ */ p('polygon', {
                  points: xe,
                  fill: we,
                  className: 'wx-dkx3NwEn',
                }),
              ],
            },
            _.id,
          );
        }
        return /* @__PURE__ */ J(
          un,
          {
            children: [
              /* @__PURE__ */ p('path', {
                className: M,
                d: Ne,
                onClick: () => !t && !A && n(_.id),
                'data-link-id': _.id,
              }),
              /* @__PURE__ */ p('path', {
                ref: A ? y : void 0,
                className: ne,
                d: Ne,
                stroke: j,
                strokeDasharray: P,
                markerEnd: pe,
                'data-link-id': _.id,
              }),
            ],
          },
          _.id,
        );
      }
      const ue = wu(_.$p);
      return /* @__PURE__ */ J(
        un,
        {
          children: [
            /* @__PURE__ */ p('polyline', {
              className: M,
              points: ue,
              onClick: () => !t && !A && n(_.id),
              'data-link-id': _.id,
            }),
            /* @__PURE__ */ p('polyline', {
              ref: A ? y : void 0,
              className: ne,
              points: ue,
              stroke: j,
              strokeDasharray: P,
              markerEnd: pe,
              'data-link-id': _.id,
            }),
          ],
        },
        _.id,
      );
    },
    L = $(() => {
      if (!s || !S?.length) return null;
      const _ = [];
      for (const A of S) {
        if (!A.$p || (h && A.$critical)) continue;
        const W = u.getTask(A.target),
          P = An(W, x) || x.current?.link || '#888';
        _.push(
          /* @__PURE__ */ p(
            'marker',
            {
              id: `wx-arrow-grad-${A.id}`,
              markerWidth: '10',
              markerHeight: '8',
              refX: '10',
              refY: '4',
              orient: 'auto',
              markerUnits: 'userSpaceOnUse',
              children: /* @__PURE__ */ p('polygon', {
                points: '0,0 10,4 0,8',
                fill: P,
              }),
            },
            `arrow-grad-${A.id}`,
          ),
        );
      }
      return _;
    }, [S, f, s, h, u]);
  return /* @__PURE__ */ J('svg', {
    className: 'wx-dkx3NwEn wx-links',
    ref: w,
    children: [
      /* @__PURE__ */ J('defs', {
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
          G,
          L,
        ],
      }),
      (S || []).map((_) => N(_, !1)),
      !t && e && N(e, !0),
    ],
  });
}
function $u(n) {
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
      /* @__PURE__ */ J(
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
let fr = [],
  hr = null,
  zs = null;
const Ws = (n, e, t, r) => n < r && e > t,
  Fs = (n, e) => {
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
  Cu = (n, e, t) => {
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
  _u = (n, e, t) => {
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
function Nu(n) {
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
      linkBundling: h = !1,
    } = n,
    m = He(Et),
    [g, y] = Jt(m, '_tasks'),
    [w, x] = Jt(m, '_links'),
    v = le(m, 'area'),
    k = le(m, '_scales'),
    R = le(m, 'taskTypes'),
    S = le(m, 'baselines'),
    C = le(m, '_selected'),
    H = le(m, '_scrollTask'),
    G = le(m, 'criticalPath'),
    N = le(m, 'tasks'),
    L = le(m, 'schedule'),
    _ = le(m, 'splitTasks'),
    A = le(m, 'summary'),
    O = $(() => {
      if (!v || !Array.isArray(g)) return [];
      const b = v.start ?? 0,
        F = v.end ?? 0;
      return r && s
        ? g.map((V) => ({ ...V }))
        : g.slice(b, F).map((V) => ({ ...V }));
    }, [y, v, r, s]),
    W = le(m, 'cellHeight'),
    P = $(() => {
      if (!r || !s || !O.length) return O;
      const b = /* @__PURE__ */ new Map(),
        F = [];
      g.forEach((se) => {
        const Re = s.taskRows.get(se.id) ?? se.id;
        b.has(Re) || (b.set(Re, F.length), F.push(Re));
      });
      const V = /* @__PURE__ */ new Map();
      O.forEach((se) => {
        if (se.type === 'summary') return;
        const Re = s.taskRows.get(se.id) ?? se.id;
        V.has(Re) || V.set(Re, []), V.get(Re).push(se);
      });
      const z = /* @__PURE__ */ new Map(),
        K = /* @__PURE__ */ new Map();
      V.forEach((se, Re) => {
        const Ie = [],
          Je = [...se].sort((Be, je) => (Be.$x ?? 0) - (je.$x ?? 0));
        for (const Be of Je) {
          const je = Be.$x ?? 0,
            wt = je + (Be.$w ?? 0);
          let yt = !1;
          for (let et = 0; et < Ie.length; et++)
            if (
              !Ie[et].some((Lt) => {
                const $n = Lt.$x ?? 0,
                  rr = $n + (Lt.$w ?? 0);
                return Ws(je, wt, $n, rr);
              })
            ) {
              Ie[et].push(Be), z.set(Be.id, et), (yt = !0);
              break;
            }
          yt || (Ie.push([Be]), z.set(Be.id, Ie.length - 1));
        }
        K.set(Re, Ie.length);
      });
      const oe = /* @__PURE__ */ new Map();
      let fe = 0;
      for (const se of F) {
        oe.set(se, fe);
        const Re = (o && o[se]) || W;
        fe += Re;
      }
      return O.map((se) => {
        const Re = s.taskRows.get(se.id) ?? se.id,
          Ie = oe.get(Re) ?? 0;
        if (se.type === 'summary') {
          if ((V.get(Re) || []).length > 0 || se.barHidden)
            return { ...se, $y: Ie, $skip: !0 };
          const et = (o && o[Re]) || W,
            gt = Math.max(0, Math.floor((et - se.$h) / 2));
          return {
            ...se,
            $y: Ie + gt,
            $y_base: se.$y_base !== void 0 ? Ie + gt : void 0,
          };
        }
        const Je = K.get(Re) || 1,
          Be = z.get(se.id) ?? 0;
        if (Je > 1) {
          const gt = se.$h + 4,
            Lt = Ie + 3 + Be * gt;
          return {
            ...se,
            $y: Lt,
            $y_base: se.$y_base !== void 0 ? Lt : void 0,
          };
        }
        const je = (o && o[Re]) || W,
          wt = Math.max(0, Math.round((je - se.$h) / 2));
        return {
          ...se,
          $y: Ie + wt,
          $y_base: se.$y_base !== void 0 ? Ie + wt : void 0,
        };
      });
    }, [O, r, s, g, W, o]),
    U = $(() => {
      if (!r || !P?.length) return null;
      const b = /* @__PURE__ */ new Map();
      for (const F of P) F.$skip || b.set(F.id, { y: F.$y, h: F.$h });
      return b;
    }, [r, P]),
    T = $(() => k.lengthUnitWidth, [k]),
    Y = $(() => k.lengthUnit || 'day', [k]),
    ne = $(() => {
      const b = /* @__PURE__ */ new Set();
      if (i || !r || !s) return b;
      const F = /* @__PURE__ */ new Map();
      return (
        g.forEach((V) => {
          if (V.type === 'summary' || V.type === 'milestone') return;
          const z = s.taskRows.get(V.id) ?? V.id;
          F.has(z) || F.set(z, []), F.get(z).push(V);
        }),
        F.forEach((V) => {
          if (!(V.length < 2))
            for (let z = 0; z < V.length; z++)
              for (let K = z + 1; K < V.length; K++) {
                const oe = V[z],
                  fe = V[K];
                Ws(oe.$x, oe.$x + oe.$w, fe.$x, fe.$x + fe.$w) &&
                  (b.add(oe.id), b.add(fe.id));
              }
        }),
        b
      );
    }, [i, r, s, g, y]),
    M = $(() => {
      if (!a || !g?.length || !T) return null;
      const b = /* @__PURE__ */ new Map(),
        F = /* @__PURE__ */ new Set();
      g.forEach((z) => {
        z.type === 'summary' && F.add(z.id),
          z.parent &&
            z.parent !== 0 &&
            z.type !== 'summary' &&
            (b.has(z.parent) || b.set(z.parent, []), b.get(z.parent).push(z));
      });
      const V = /* @__PURE__ */ new Map();
      return (
        F.forEach((z) => {
          const K = b.get(z);
          if (!K?.length) return;
          const oe = /* @__PURE__ */ new Map();
          K.forEach((fe) => {
            if (fe.$x == null || fe.$w == null) return;
            const se = Math.floor(fe.$x / T),
              Re = Math.ceil((fe.$x + fe.$w) / T);
            for (let Ie = se; Ie < Re; Ie++) oe.set(Ie, (oe.get(Ie) || 0) + 1);
          }),
            oe.size > 0 && V.set(z, oe);
        }),
        V
      );
    }, [a, g, T]),
    [j, pe] = Z(null),
    ue = B(null),
    [Ne, ke] = Z(null),
    [xe, we] = Z(null),
    [Ce, Ae] = Z(null),
    $e = B(null);
  $e.current = Ce;
  const Q = B(0),
    de = B(!1),
    [te, be] = Z(void 0),
    Me = B(null),
    ge = B(null),
    ze = B(!1),
    ce = B(null),
    [ve, Oe] = Z(null),
    [me, Ue] = Z(null),
    ae = B(null),
    [he, We] = Z(null),
    De = $(
      () =>
        he && {
          ...w.find((b) => b.id === he),
        },
      [he, x],
    ),
    [Ee, Ge] = Z(void 0),
    D = B(null),
    [q, ee] = Z(0),
    re = B(null),
    Se = $(() => {
      const b = re.current;
      return !!(C.length && b && b.contains(document.activeElement));
    }, [C, re.current]),
    Te = $(() => Se && C[C.length - 1]?.id, [Se, C]);
  X(() => {
    if (H && Se && H) {
      const { id: b } = H,
        F = re.current?.querySelector(`.wx-bar[data-id='${b}']`);
      F && F.focus({ preventScroll: !0 });
    }
  }, [H]),
    X(() => {
      const b = re.current;
      if (b && (ee(b.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const F = new ResizeObserver((V) => {
          V[0] && ee(V[0].contentRect.width);
        });
        return F.observe(b), () => F.disconnect();
      }
    }, [re.current]);
  const Le = E(() => {
      document.body.style.userSelect = 'none';
    }, []),
    Ke = E(() => {
      document.body.style.userSelect = '';
    }, []),
    ut = $(() => {
      if (!r || !s || !g?.length) return /* @__PURE__ */ new Map();
      const b = /* @__PURE__ */ new Map(),
        F = /* @__PURE__ */ new Map(),
        V = [];
      return (
        g.forEach((z) => {
          const K = s.taskRows.get(z.id) ?? z.id;
          F.has(K) || (F.set(K, V.length), V.push(K));
        }),
        g.forEach((z) => {
          const K = s.taskRows.get(z.id) ?? z.id,
            oe = F.get(K) ?? 0;
          b.set(z.id, oe * W);
        }),
        b
      );
    }, [g, r, s, W]),
    bt = $(() => {
      if (!r || !s || !g?.length) return /* @__PURE__ */ new Map();
      const b = /* @__PURE__ */ new Map(),
        F = /* @__PURE__ */ new Map(),
        V = [];
      return (
        g.forEach((z) => {
          const K = s.taskRows.get(z.id) ?? z.id;
          F.has(K) || (F.set(K, V.length), V.push(K));
        }),
        g.forEach((z) => {
          const K = z.row ?? z.id;
          if (!b.has(K)) {
            const oe = s.taskRows.get(z.id) ?? z.id,
              fe = F.get(oe) ?? 0;
            b.set(K, fe * W);
          }
        }),
        b
      );
    }, [g, r, s, W]),
    St = E(
      (b) => {
        if (!re.current) return [];
        const F = Math.min(b.startX, b.currentX),
          V = Math.max(b.startX, b.currentX),
          z = Math.min(b.startY, b.currentY),
          K = Math.max(b.startY, b.currentY);
        return g.filter((oe) => {
          const fe = oe.$x,
            se = oe.$x + oe.$w,
            Ie = ut.get(oe.id) ?? oe.$y,
            Je = Ie + oe.$h;
          return fe < V && se > F && Ie < K && Je > z;
        });
      },
      [g, ut],
    ),
    Rt = E(() => {
      if (!c) return;
      const b = m.getState()._selected;
      if (!b || !b.length) return;
      const F = 864e5,
        V = b
          .map((se) => {
            if (!m.getTask(se.id)) return null;
            const Ie = g.find((rr) => rr.id === se.id);
            if (!Ie) return null;
            const {
                $x: Je,
                $y: Be,
                $h: je,
                $w: wt,
                $skip: yt,
                $level: et,
                ...gt
              } = Ie,
              Lt =
                Ie.end && Ie.start
                  ? Math.round((Ie.end.getTime() - Ie.start.getTime()) / F)
                  : 0,
              $n = Ie.start ? (Ie.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...gt,
              _durationDays: Lt,
              _startDayOfWeek: $n,
              _originalWidth: wt,
              _originalHeight: je,
            };
          })
          .filter(Boolean);
      if (!V.length) return;
      const K = V[0].parent,
        oe = V.filter((se) => se.parent === K);
      if (oe.length === 0) return;
      const fe = oe.reduce(
        (se, Re) => (Re.start && (!se || Re.start < se) ? Re.start : se),
        null,
      );
      (fr = oe.map((se) => ({
        ...se,
        _startCellOffset: Cu(se.start, fe, k),
      }))),
        (zs = K),
        (hr = fe);
    }, [c, m, g, k]),
    Jn = E(
      (b, F, V) => {
        if (!F.length || !b || V == null) return;
        const z = 864e5,
          K = m.getHistory();
        K?.startBatch();
        const oe = new Date(b);
        oe.setUTCHours(0, 0, 0, 0),
          F.forEach((fe, se) => {
            const Re = `task-${Date.now()}-${se}`,
              Ie = _u(oe, fe._startCellOffset || 0, k),
              Je = new Date(Ie.getTime() + (fe._startDayOfWeek || 0) * z);
            Je.setUTCHours(0, 0, 0, 0);
            const Be = new Date(Je.getTime() + (fe._durationDays || 7) * z);
            Be.setUTCHours(0, 0, 0, 0),
              m.exec('add-task', {
                task: {
                  id: Re,
                  text: fe.text,
                  start: Je,
                  end: Be,
                  type: fe.type || 'task',
                  parent: V,
                  row: fe.row,
                },
                target: V,
                mode: 'child',
                skipUndo: se > 0,
              });
          }),
          K?.endBatch();
      },
      [m, k],
    );
  X(
    () =>
      c
        ? m.intercept('hotkey', (F) => {
            if (F.key === 'ctrl+c' || F.key === 'meta+c') return Rt(), !1;
            if (F.key === 'ctrl+v' || F.key === 'meta+v')
              return (
                !fr.length ||
                  !hr ||
                  we({
                    tasks: fr,
                    baseDate: hr,
                    parent: zs,
                    currentX: Q.current,
                  }),
                !1
              );
          })
        : void 0,
    [c, m, Rt],
  ),
    X(() => {
      if (!xe) return;
      const b = (F) => {
        F.key === 'Escape' &&
          (F.preventDefault(), F.stopPropagation(), we(null));
      };
      return (
        document.addEventListener('keydown', b, !0),
        () => document.removeEventListener('keydown', b, !0)
      );
    }, [xe]);
  const Gt = E(
      (b, F, V) => {
        if (
          F.target.classList.contains('wx-line') ||
          (V || (V = m.getTask(Ot(b))),
          V.type === 'milestone' || V.type === 'summary')
        )
          return '';
        const z = rt(F, 'data-segment');
        z && (b = z);
        const { left: K, width: oe } = b.getBoundingClientRect(),
          fe = (F.clientX - K) / oe;
        let se = 0.2 / (oe > 200 ? oe / 200 : 1);
        return fe < se ? 'start' : fe > 1 - se ? 'end' : '';
      },
      [m],
    ),
    jt = E(
      (b, F) => {
        const { clientX: V } = F,
          z = Ot(b),
          K = m.getTask(z),
          oe = F.target.classList;
        if (
          !F.target.closest('.wx-delete-button') &&
          !F.target.closest('[data-interactive]') &&
          !(oe.contains('wx-link') || F.target.closest('.wx-link')) &&
          !e
        ) {
          if (oe.contains('wx-progress-marker')) {
            const { progress: fe } = m.getTask(z);
            (ae.current = {
              id: z,
              x: V,
              progress: fe,
              dx: 0,
              node: b,
              marker: F.target,
            }),
              F.target.classList.add('wx-progress-in-drag');
          } else {
            const fe = Gt(b, F, K) || 'move',
              se = {
                id: z,
                mode: fe,
                x: V,
                dx: 0,
                l: K.$x,
                w: K.$w,
              };
            if (_ && K.segments?.length) {
              const Re = rt(F, 'data-segment');
              Re && (se.segmentIndex = Re.dataset.segment * 1);
            }
            Ue(se);
          }
          Le();
        }
      },
      [m, e, Gt, Le, _],
    ),
    er = E(
      (b) => {
        if (b.button !== 0 || xe) return;
        const F = rt(b);
        if (!F && l && !e) {
          const V = re.current;
          if (!V) return;
          const z = V.getBoundingClientRect(),
            K = b.clientX - z.left,
            oe = b.clientY - z.top;
          if (c) {
            const se = Fs(K, k);
            se && (($e.current = se), Ae(se));
          }
          const fe = {
            startX: K,
            startY: oe,
            currentX: K,
            currentY: oe,
            ctrlKey: b.ctrlKey || b.metaKey,
          };
          pe(fe), (ue.current = fe), Le();
          return;
        }
        if (F && l && !e && C.length > 1) {
          const V = Ot(F);
          if (C.some((K) => K.id === V)) {
            ke({
              startX: b.clientX,
              ids: C.map((K) => K.id),
              tasks: C.map((K) => {
                const oe = m.getTask(K.id);
                return {
                  id: K.id,
                  start: oe.start,
                  end: oe.end,
                  $x: oe.$x,
                  $w: oe.$w,
                };
              }),
            }),
              Le();
            return;
          }
        }
        if (
          !e &&
          (b.target.classList.contains('wx-link') ||
            b.target.classList.contains('wx-inner'))
        ) {
          if (Me.current) return;
          const V = b.target.classList.contains('wx-link')
            ? b.target
            : b.target.closest('.wx-link');
          if (V) {
            const z = _t(V);
            if (z) {
              const K = V.classList.contains('wx-left'),
                oe = { id: z, start: K };
              be(oe),
                (Me.current = oe),
                (ge.current = { clientX: b.clientX, clientY: b.clientY }),
                (ze.current = !1),
                (de.current = !0),
                Le();
              return;
            }
          }
        }
        F && jt(F, b);
      },
      [jt, l, c, e, xe, k, C, m, Le],
    ),
    bn = E(
      (b) => {
        const F = rt(b);
        F &&
          (D.current = setTimeout(() => {
            Ge(!0), jt(F, b.touches[0]);
          }, 300));
      },
      [jt],
    ),
    tr = ['e2s', 's2s', 'e2e', 's2e'],
    dt = E((b, F) => tr[(b ? 1 : 0) + (F ? 0 : 2)], []),
    It = E(
      (b, F) => {
        const V = te.id,
          z = te.start;
        return b === V
          ? !0
          : !!w.find(
              (K) => K.target == b && K.source == V && K.type === dt(z, F),
            );
      },
      [te, x, dt],
    ),
    Kt = E((b) => {
      We(b);
    }, []),
    $t = E(
      (b) => {
        if (ge.current) {
          const V = ze.current;
          if (
            ((ge.current = null),
            (ze.current = !1),
            (ce.current = null),
            Oe(null),
            Ke(),
            V)
          ) {
            const z = Me.current,
              K = b || window.event,
              oe = K ? document.elementFromPoint(K.clientX, K.clientY) : null;
            if (oe && z) {
              const fe = oe.classList.contains('wx-link')
                ? oe
                : oe.closest('.wx-link');
              if (fe) {
                const se = _t(fe),
                  Re = fe.classList.contains('wx-left');
                if (se && se !== z.id) {
                  const Ie = dt(z.start, Re);
                  w.find(
                    (Be) =>
                      Be.target == se && Be.source == z.id && Be.type === Ie,
                  ) ||
                    m.exec('add-link', {
                      link: {
                        source: z.id,
                        target: se,
                        type: Ie,
                      },
                    });
                }
              }
            }
            be(null), (Me.current = null), (de.current = !0);
          }
          return;
        }
        const F = ue.current;
        if (F) {
          const V = St(F);
          F.ctrlKey
            ? V.forEach((z) => {
                m.exec('select-task', { id: z.id, toggle: !0, marquee: !0 });
              })
            : (C.length > 0 && m.exec('select-task', { id: null, marquee: !0 }),
              V.forEach((z, K) => {
                m.exec('select-task', {
                  id: z.id,
                  toggle: K > 0,
                  marquee: !0,
                });
              })),
            pe(null),
            (ue.current = null),
            Ke(),
            (de.current = !0);
          return;
        }
        if (Ne) {
          const { ids: V, tasks: z, startX: K } = Ne;
          ke(null), Ke(), (de.current = !0);
          return;
        }
        if (ae.current) {
          const { dx: V, id: z, marker: K, value: oe } = ae.current;
          (ae.current = null),
            typeof oe < 'u' &&
              V &&
              m.exec('update-task', {
                id: z,
                task: { progress: oe },
                inProgress: !1,
              }),
            K.classList.remove('wx-progress-in-drag'),
            (de.current = !0),
            Ke();
        } else if (me) {
          const {
            id: V,
            mode: z,
            dx: K,
            l: oe,
            w: fe,
            start: se,
            segment: Re,
            index: Ie,
          } = me;
          if ((Ue(null), se)) {
            const Je = Math.round(K / T);
            if (!Je)
              m.exec('drag-task', {
                id: V,
                width: fe,
                left: oe,
                inProgress: !1,
                ...(Re && { segmentIndex: Ie }),
              });
            else {
              let Be = {},
                je = m.getTask(V);
              Re && (je = je.segments[Ie]);
              const wt = 1440 * 60 * 1e3,
                et =
                  Je *
                  (Y === 'week'
                    ? 7
                    : Y === 'month'
                      ? 30
                      : Y === 'quarter'
                        ? 91
                        : Y === 'year'
                          ? 365
                          : 1) *
                  wt;
              z === 'move'
                ? ((Be.start = new Date(je.start.getTime() + et)),
                  (Be.end = new Date(je.end.getTime() + et)))
                : z === 'start'
                  ? ((Be.start = new Date(je.start.getTime() + et)),
                    (Be.end = je.end))
                  : z === 'end' &&
                    ((Be.start = je.start),
                    (Be.end = new Date(je.end.getTime() + et))),
                m.exec('update-task', {
                  id: V,
                  task: Be,
                  ...(Re && { segmentIndex: Ie }),
                });
            }
            de.current = !0;
          }
          Ke();
        }
      },
      [m, Ke, me, T, Y, dt, w],
    ),
    Ct = E(
      (b, F) => {
        const { clientX: V } = F;
        if (ge.current && re.current) {
          const z = ge.current,
            K = V - z.clientX,
            oe = F.clientY - z.clientY;
          if (!ze.current) {
            if (Math.abs(K) + Math.abs(oe) < 5) return;
            ze.current = !0;
          }
          const fe = re.current.getBoundingClientRect(),
            se = { x: V - fe.left, y: F.clientY - fe.top };
          (ce.current = se), Oe(se);
          return;
        }
        if (c && re.current) {
          const z = re.current.getBoundingClientRect();
          Q.current = V - z.left;
        }
        if (xe && re.current) {
          const z = re.current.getBoundingClientRect();
          we((K) => (K ? { ...K, currentX: V - z.left } : null));
        }
        if (j) {
          const z = re.current;
          if (!z) return;
          const K = z.getBoundingClientRect(),
            oe = V - K.left,
            fe = F.clientY - K.top;
          pe((se) => ({
            ...se,
            currentX: oe,
            currentY: fe,
          })),
            ue.current &&
              ((ue.current.currentX = oe), (ue.current.currentY = fe));
          return;
        }
        if (!e)
          if (ae.current) {
            const { node: z, x: K, id: oe } = ae.current,
              fe = (ae.current.dx = V - K),
              se = Math.round((fe / z.offsetWidth) * 100);
            let Re = ae.current.progress + se;
            (ae.current.value = Re = Math.min(Math.max(0, Re), 100)),
              m.exec('update-task', {
                id: oe,
                task: { progress: Re },
                inProgress: !0,
              });
          } else if (me) {
            Kt(null);
            const {
                mode: z,
                l: K,
                w: oe,
                x: fe,
                id: se,
                start: Re,
                segment: Ie,
                index: Je,
              } = me,
              Be = m.getTask(se),
              je = V - fe,
              wt = Math.round(T) || 1;
            if (
              (!Re && Math.abs(je) < 20) ||
              (z === 'start' && oe - je < wt) ||
              (z === 'end' && oe + je < wt) ||
              (z === 'move' &&
                ((je < 0 && K + je < 0) || (je > 0 && K + oe + je > q))) ||
              me.segment
            )
              return;
            const yt = { ...me, dx: je };
            let et, gt;
            if (
              (z === 'start'
                ? ((et = K + je), (gt = oe - je))
                : z === 'end'
                  ? ((et = K), (gt = oe + je))
                  : z === 'move' && ((et = K + je), (gt = oe)),
              m.exec('drag-task', {
                id: se,
                width: gt,
                left: et,
                inProgress: !0,
                start: Re,
                ...(Ie && { segmentIndex: Je }),
              }),
              !yt.start &&
                ((z === 'move' && Be.$x == K) || (z !== 'move' && Be.$w == oe)))
            ) {
              (de.current = !0), $t();
              return;
            }
            (yt.start = !0), Ue(yt);
          } else {
            const z = rt(b);
            if (z) {
              const K = m.getTask(Ot(z)),
                fe = rt(b, 'data-segment') || z,
                se = Gt(fe, F, K);
              fe.style.cursor = se && !e ? 'col-resize' : 'pointer';
            }
          }
      },
      [m, e, me, T, q, Gt, Kt, $t],
    ),
    Sn = E(
      (b) => {
        Ct(b, b);
      },
      [Ct],
    ),
    nr = E(
      (b) => {
        Ee
          ? (b.preventDefault(), Ct(b, b.touches[0]))
          : D.current && (clearTimeout(D.current), (D.current = null));
      },
      [Ee, Ct],
    ),
    I = E(
      (b) => {
        $t(b);
      },
      [$t],
    ),
    ie = E(
      (b) => {
        Ge(null),
          D.current && (clearTimeout(D.current), (D.current = null)),
          $t(b);
      },
      [$t],
    );
  X(
    () => (
      window.addEventListener('mouseup', I),
      () => {
        window.removeEventListener('mouseup', I);
      }
    ),
    [I],
  );
  const ye = E(
      (b) => {
        if (!e) {
          if (b.target.closest('[data-interactive]')) return;
          const F = _t(b.target);
          if (F && !b.target.classList.contains('wx-link')) {
            const V = _t(b.target, 'data-segment');
            m.exec('show-editor', {
              id: F,
              ...(V !== null && { segmentIndex: V }),
            });
          }
        }
      },
      [m, e],
    ),
    Fe = E(() => {
      te && (be(null), (Me.current = null));
    }, [te]),
    qe = E(
      (b) => {
        if (de.current) {
          de.current = !1;
          return;
        }
        if (xe && xe.currentX != null) {
          const V = Fs(xe.currentX, k);
          V && Jn(V, xe.tasks, xe.parent), we(null);
          return;
        }
        if (b.target.closest('[data-interactive]')) return;
        const F = _t(b.target);
        if (F) {
          const V = b.target.classList;
          if (V.contains('wx-link')) {
            const z = V.contains('wx-left');
            if (!te) {
              const K = { id: F, start: z };
              be(K), (Me.current = K);
              return;
            }
            te.id !== F &&
              !It(F, z) &&
              m.exec('add-link', {
                link: {
                  source: te.id,
                  target: F,
                  type: dt(te.start, z),
                },
              }),
              be(null),
              (Me.current = null);
          } else if (V.contains('wx-delete-button-icon'))
            m.exec('delete-link', { id: he }), We(null);
          else {
            let z;
            const K = rt(b, 'data-segment');
            K && (z = K.dataset.segment * 1),
              m.exec('select-task', {
                id: F,
                toggle: b.ctrlKey || b.metaKey,
                range: b.shiftKey,
                segmentIndex: z,
              });
          }
        }
        Fe();
      },
      [m, te, x, De, It, dt, Fe],
    ),
    Ye = E((b) => {
      const F = {
        left: `${b.$x}px`,
        top: `${b.$y}px`,
        width: `${b.$w}px`,
        height: `${b.$h}px`,
      };
      return b.color && (F.backgroundColor = b.color), F;
    }, []),
    _e = E(
      (b) => ({
        left: `${b.$x_base}px`,
        top: `${b.$y_base}px`,
        width: `${b.$w_base}px`,
        height: `${b.$h_base}px`,
      }),
      [],
    ),
    Qe = E(
      (b) => {
        if (Ee || D.current) return b.preventDefault(), !1;
      },
      [Ee],
    ),
    ot = $(() => R.map((b) => b.id), [R]),
    ft = E(
      (b) => {
        let F = ot.includes(b) ? b : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(b) || (F = `task ${F}`), F
        );
      },
      [ot],
    ),
    Ze = E(
      (b) => {
        m.exec(b.action, b.data);
      },
      [m],
    ),
    ct = E((b) => G && N.byId(b).$critical, [G, N]),
    Ht = E(
      (b) => {
        if (L?.auto) {
          const F = N.getSummaryId(b, !0),
            V = N.getSummaryId(te.id, !0);
          return (
            te?.id &&
            !(Array.isArray(F) ? F : [F]).includes(te.id) &&
            !(Array.isArray(V) ? V : [V]).includes(b)
          );
        }
        return te;
      },
      [L, N, te],
    );
  return /* @__PURE__ */ J('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: {
      lineHeight: `${P.length ? P[0].$h : 0}px`,
    },
    ref: re,
    onContextMenu: Qe,
    onMouseDown: er,
    onMouseMove: Sn,
    onTouchStart: bn,
    onTouchMove: nr,
    onTouchEnd: ie,
    onClick: qe,
    onDoubleClick: ye,
    onDragStart: (b) => (b.preventDefault(), !1),
    children: [
      /* @__PURE__ */ p(Su, {
        onSelectLink: Kt,
        selectedLink: De,
        readonly: e,
        linkShape: u,
        linkGradient: d,
        linkStyle: f,
        linkBundling: h,
        multiTaskRows: r,
        taskPositions: U,
        cellHeight: W,
      }),
      te &&
        ve &&
        (() => {
          const b = m.getTask(te.id);
          if (!b) return null;
          const F = te.start ? b.$x : b.$x + b.$w,
            V = b.$y + (b.$h || W) / 2;
          return /* @__PURE__ */ J('svg', {
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
                x2: ve.x,
                y2: ve.y,
                stroke: 'var(--wx-gantt-link-color)',
                strokeWidth: 2,
                strokeDasharray: '6 3',
              }),
              /* @__PURE__ */ p('circle', {
                cx: ve.x,
                cy: ve.y,
                r: 4,
                fill: 'var(--wx-gantt-link-color)',
              }),
            ],
          });
        })(),
      P.map((b) => {
        if (b.$skip && b.$skip_baseline) return null;
        const F = ne.has(b.id),
          V =
            `wx-bar wx-${ft(b.type)}` +
            (Ee && me && b.id === me.id ? ' wx-touch' : '') +
            (te && te.id === b.id ? ' wx-selected' : '') +
            (ct(b.id) ? ' wx-critical' : '') +
            (b.$reorder ? ' wx-reorder-task' : '') +
            (_ && b.segments ? ' wx-split' : '') +
            (F ? ' wx-collision' : ''),
          z =
            'wx-link wx-left' +
            (te ? ' wx-visible' : '') +
            (!te || (!It(b.id, !0) && Ht(b.id)) ? ' wx-target' : '') +
            (te && te.id === b.id && te.start ? ' wx-selected' : '') +
            (ct(b.id) ? ' wx-critical' : ''),
          K =
            'wx-link wx-right' +
            (te ? ' wx-visible' : '') +
            (!te || (!It(b.id, !1) && Ht(b.id)) ? ' wx-target' : '') +
            (te && te.id === b.id && !te.start ? ' wx-selected' : '') +
            (ct(b.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ J(
          un,
          {
            children: [
              !b.$skip &&
                /* @__PURE__ */ J('div', {
                  className: 'wx-GKbcLEGA ' + V,
                  style: Ye(b),
                  'data-tooltip-id': b.id,
                  'data-id': b.id,
                  tabIndex: Te === b.id ? 0 : -1,
                  children: [
                    e
                      ? null
                      : b.id === De?.target && De?.type[2] === 's'
                        ? /* @__PURE__ */ p(Mt, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ p('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ p('div', {
                            className: 'wx-GKbcLEGA ' + z,
                            children: /* @__PURE__ */ p('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    b.type !== 'milestone'
                      ? /* @__PURE__ */ J(Ve, {
                          children: [
                            b.progress && !(_ && b.segments)
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ p('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${b.progress}%` },
                                  }),
                                })
                              : null,
                            !e &&
                            !(_ && b.segments) &&
                            !(b.type == 'summary' && A?.autoProgress)
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${b.progress}% - 10px)`,
                                  },
                                  children: b.progress,
                                })
                              : null,
                            t
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ p(t, {
                                    data: b,
                                    api: m,
                                    onAction: Ze,
                                  }),
                                })
                              : _ && b.segments
                                ? /* @__PURE__ */ p($u, {
                                    task: b,
                                    type: ft(b.type),
                                  })
                                : /* @__PURE__ */ p('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: b.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ J(Ve, {
                          children: [
                            /* @__PURE__ */ p('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            t
                              ? /* @__PURE__ */ p(t, {
                                  data: b,
                                  api: m,
                                  onAction: Ze,
                                })
                              : /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: b.text,
                                }),
                          ],
                        }),
                    e
                      ? null
                      : b.id === De?.target && De?.type[2] === 'e'
                        ? /* @__PURE__ */ p(Mt, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ p('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ p('div', {
                            className: 'wx-GKbcLEGA ' + K,
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
                    M &&
                      b.type === 'summary' &&
                      (() => {
                        const oe = M.get(b.id),
                          fe = Math.floor(b.$x / T),
                          se = Math.ceil((b.$x + b.$w) / T);
                        return /* @__PURE__ */ p('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from(
                            { length: se - fe },
                            (Re, Ie) => {
                              const Je = fe + Ie,
                                Be = oe?.get(Je) || 0;
                              return /* @__PURE__ */ p(
                                'span',
                                {
                                  className: `wx-GKbcLEGA wx-week-count${Be === 0 ? ' wx-week-count-zero' : ''}`,
                                  style: {
                                    position: 'absolute',
                                    left: `${Je * T - b.$x}px`,
                                    width: `${T}px`,
                                    top: 0,
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  },
                                  children: Be,
                                },
                                Je,
                              );
                            },
                          ),
                        });
                      })(),
                  ],
                }),
              S && !b.$skip_baseline
                ? /* @__PURE__ */ p('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (b.type === 'milestone' ? ' wx-milestone' : ''),
                    style: _e(b),
                  })
                : null,
            ],
          },
          b.id,
        );
      }),
      j &&
        (() => {
          const b = Math.min(j.startX, j.currentX),
            F = Math.min(j.startY, j.currentY),
            V = Math.abs(j.currentX - j.startX),
            z = Math.abs(j.currentY - j.startY);
          return /* @__PURE__ */ p('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${b}px`,
              top: `${F}px`,
              width: `${V}px`,
              height: `${z}px`,
            },
          });
        })(),
      xe &&
        xe.currentX != null &&
        xe.tasks.map((b, F) => {
          const z =
              (Math.floor(xe.currentX / T) + (b._startCellOffset || 0)) * T,
            K = b._originalWidth || T,
            oe = b._originalHeight || W,
            fe = bt.get(b.row) ?? (b.$y || 0);
          return /* @__PURE__ */ p(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: z, top: fe, width: K, height: oe },
              children: /* @__PURE__ */ p('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: b.$barText || b.text,
              }),
            },
            `preview-${F}`,
          );
        }),
    ],
  });
}
function Mu(n) {
  const { highlightTime: e, onScaleClick: t } = n,
    r = He(Et),
    s = le(r, '_scales');
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
const Tu = /* @__PURE__ */ new Map();
function Du(n) {
  const e = B(null),
    t = B(0),
    r = B(null),
    s = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()),
    t.current++,
    X(() => {
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
            Tu.set(n, o),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: o }),
              );
          })),
          () => cancelAnimationFrame(r.current)
        );
    });
}
function Eu(n) {
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
      marqueeSelect: h = !1,
      copyPaste: m = !1,
      linkShape: g,
      linkGradient: y = !1,
      linkStyle: w,
      linkBundling: x = !1,
    } = n,
    v = He(Et),
    [k, R] = Jt(v, '_selected'),
    S = le(v, 'scrollTop'),
    C = le(v, 'cellHeight'),
    H = le(v, 'cellWidth'),
    G = le(v, '_scales'),
    N = le(v, '_markers'),
    L = le(v, '_scrollTask'),
    _ = le(v, 'zoom'),
    [A, O] = Z(),
    W = B(null),
    P = le(v, '_tasks'),
    U = 1 + (G?.rows?.length || 0),
    { taskYPositions: T, rowHeightMap: Y } = $(() => {
      if (!l || !c || !P?.length)
        return { taskYPositions: null, rowHeightMap: null };
      const Q = /* @__PURE__ */ new Map(),
        de = /* @__PURE__ */ new Map(),
        te = [];
      P.forEach((ge) => {
        const ze = c.taskRows.get(ge.id) ?? ge.id;
        te.includes(ze) || te.push(ze);
      });
      const be = /* @__PURE__ */ new Map();
      let Me = 0;
      for (const ge of te) {
        be.set(ge, Me);
        const ze = (u && u[ge]) || C;
        de.set(ge, ze), (Me += ze);
      }
      return (
        P.forEach((ge) => {
          const ze = c.taskRows.get(ge.id) ?? ge.id;
          Q.set(ge.id, be.get(ze) ?? 0);
        }),
        { taskYPositions: Q, rowHeightMap: de }
      );
    }, [P, l, c, C, u]),
    ne = $(() => {
      const Q = [];
      return (
        k &&
          k.length &&
          C &&
          k.forEach((de) => {
            const te = T?.get(de.id) ?? de.$y;
            let be = C;
            if (Y && c) {
              const Me = c.taskRows.get(de.id) ?? de.id;
              be = Y.get(Me) ?? C;
            }
            Q.push({ height: `${be}px`, top: `${te - 3}px` });
          }),
        Q
      );
    }, [R, C, T, Y, c]),
    M = $(() => Math.max(A || 0, r), [A, r]),
    j = $(() => {
      if (
        !u ||
        !l ||
        !c ||
        !P?.length ||
        !Object.values(u).some((te) => te !== C)
      )
        return null;
      const de = [];
      return (
        P.forEach((te) => {
          const be = c.taskRows.get(te.id) ?? te.id;
          de.includes(be) || de.push(be);
        }),
        de.map((te) => ({
          id: te,
          height: u[te] || C,
        }))
      );
    }, [P, c, u, l, C]);
  X(() => {
    const Q = W.current;
    Q && typeof S == 'number' && (Q.scrollTop = l ? 0 : S);
  }, [S, l]);
  const pe = () => {
    ue();
  };
  function ue(Q) {
    const de = W.current;
    if (!de) return;
    const te = {};
    (te.left = de.scrollLeft), v.exec('scroll-chart', te);
  }
  function Ne() {
    const Q = W.current,
      te = Math.ceil((A || 0) / (C || 1)) + 1,
      be = Math.floor(((Q && Q.scrollTop) || 0) / (C || 1)),
      Me = Math.max(0, be - U),
      ge = be + te + U,
      ze = Me * (C || 0);
    v.exec('render-data', {
      start: Me,
      end: ge,
      from: ze,
    });
  }
  X(() => {
    Ne();
  }, [A, S]);
  const ke = E(
    (Q) => {
      if (!Q) return;
      const { id: de, mode: te } = Q;
      if (te.toString().indexOf('x') < 0) return;
      const be = W.current;
      if (!be) return;
      const { clientWidth: Me } = be,
        ge = v.getTask(de);
      if (ge.$x + ge.$w < be.scrollLeft)
        v.exec('scroll-chart', { left: ge.$x - (H || 0) }),
          (be.scrollLeft = ge.$x - (H || 0));
      else if (ge.$x >= Me + be.scrollLeft) {
        const ze = Me < ge.$w ? H || 0 : ge.$w;
        v.exec('scroll-chart', { left: ge.$x - Me + ze }),
          (be.scrollLeft = ge.$x - Me + ze);
      }
    },
    [v, H],
  );
  X(() => {
    ke(L);
  }, [L]);
  function xe(Q) {
    if (_ && (Q.ctrlKey || Q.metaKey)) {
      Q.preventDefault();
      const de = W.current,
        te = -Math.sign(Q.deltaY),
        be = Q.clientX - (de ? de.getBoundingClientRect().left : 0);
      v.exec('zoom-scale', {
        dir: te,
        offset: be,
      });
    }
  }
  function we(Q) {
    const de = i(Q.date, Q.unit);
    return de
      ? {
          css: de,
          width: Q.width,
        }
      : null;
  }
  const Ce = $(
      () =>
        G && (G.minUnit === 'hour' || G.minUnit === 'day') && i
          ? G.rows[G.rows.length - 1].cells.map(we)
          : null,
      [G, i],
    ),
    Ae = E(
      (Q) => {
        (Q.eventSource = 'chart'), v.exec('hotkey', Q);
      },
      [v],
    );
  X(() => {
    const Q = W.current;
    if (!Q) return;
    const de = () => O(Q.clientHeight);
    de();
    const te = new ResizeObserver(() => de());
    return (
      te.observe(Q),
      () => {
        te.disconnect();
      }
    );
  }, [W.current]);
  const $e = B(null);
  return (
    X(() => {
      const Q = W.current;
      if (Q && !$e.current)
        return (
          ($e.current = Kr(Q, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (de) => Ae(de),
          })),
          () => {
            $e.current?.destroy(), ($e.current = null);
          }
        );
    }, []),
    X(() => {
      const Q = W.current;
      if (!Q) return;
      const de = xe;
      return (
        Q.addEventListener('wheel', de),
        () => {
          Q.removeEventListener('wheel', de);
        }
      );
    }, [xe]),
    Du('chart'),
    /* @__PURE__ */ J('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: W,
      onScroll: pe,
      children: [
        /* @__PURE__ */ p(Mu, {
          highlightTime: i,
          onScaleClick: a,
          scales: G,
        }),
        N && N.length
          ? /* @__PURE__ */ p('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${M}px` },
              children: N.map((Q, de) =>
                /* @__PURE__ */ p(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${Q.css || ''}`,
                    style: { left: `${Q.left}px` },
                    children: /* @__PURE__ */ p('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: Q.text,
                    }),
                  },
                  de,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ J('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${t}px`, height: `${M}px` },
          children: [
            Ce
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: Ce.map((Q, de) =>
                    Q
                      ? /* @__PURE__ */ p(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + Q.css,
                            style: {
                              width: `${Q.width}px`,
                              left: `${de * Q.width}px`,
                            },
                          },
                          de,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ p(mu, { borders: o, rowLayout: j }),
            k && k.length
              ? k.map((Q, de) =>
                  Q.$y
                    ? /* @__PURE__ */ p(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': Q.id,
                          style: ne[de],
                        },
                        Q.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ p(Nu, {
              readonly: e,
              taskTemplate: s,
              multiTaskRows: l,
              rowMapping: c,
              rowHeightOverrides: u,
              allowTaskIntersection: d,
              summaryBarCounts: f,
              marqueeSelect: h,
              copyPaste: m,
              linkShape: g,
              linkGradient: y,
              linkStyle: w,
              linkBundling: x,
            }),
          ],
        }),
      ],
    })
  );
}
function Ru(n) {
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
    [u, d] = Xe(n.value ?? 0),
    [f, h] = Xe(n.display ?? 'all');
  function m(T) {
    let Y = 0;
    e == 'center' ? (Y = t / 2) : e == 'before' && (Y = t);
    const ne = {
      size: [t + 'px', 'auto'],
      p: [T - Y + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (r != 'x') for (let M in ne) ne[M] = ne[M].reverse();
    return ne;
  }
  const [g, y] = Z(!1),
    [w, x] = Z(null),
    v = B(0),
    k = B(),
    R = B(),
    S = B(f);
  X(() => {
    S.current = f;
  }, [f]),
    X(() => {
      w === null && u > 0 && x(u);
    }, [w, u]);
  function C(T) {
    return r == 'x' ? T.clientX : T.clientY;
  }
  const H = E(
      (T) => {
        const Y = k.current + C(T) - v.current;
        d(Y);
        let ne;
        Y <= l ? (ne = 'chart') : a - Y <= c ? (ne = 'grid') : (ne = 'all'),
          S.current !== ne && (h(ne), (S.current = ne)),
          R.current && clearTimeout(R.current),
          (R.current = setTimeout(() => s && s(Y), 100));
      },
      [a, l, c, s],
    ),
    G = E(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        y(!1),
        window.removeEventListener('mousemove', H),
        window.removeEventListener('mouseup', G);
    }, [H]),
    N = $(
      () => (f !== 'all' ? 'auto' : r == 'x' ? 'ew-resize' : 'ns-resize'),
      [f, r],
    ),
    L = E(
      (T) => {
        (!i && (f === 'grid' || f === 'chart')) ||
          ((v.current = C(T)),
          (k.current = u),
          y(!0),
          (document.body.style.cursor = N),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', H),
          window.addEventListener('mouseup', G));
      },
      [N, H, G, u, i, f],
    );
  function _() {
    h('all'), w !== null && (d(w), s && s(w));
  }
  function A(T) {
    if (i) {
      const Y = f === 'chart' ? 'grid' : 'chart';
      h(Y), o(Y);
    } else if (f === 'grid' || f === 'chart') _(), o('all');
    else {
      const Y = T === 'left' ? 'chart' : 'grid';
      h(Y), o(Y);
    }
  }
  function O() {
    A('left');
  }
  function W() {
    A('right');
  }
  const P = $(() => m(u), [u, e, t, r]),
    U = [
      'wx-resizer',
      `wx-resizer-${r}`,
      `wx-resizer-display-${f}`,
      g ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ J('div', {
    className: 'wx-pFykzMlT ' + U,
    onMouseDown: L,
    style: { width: P.size[0], height: P.size[1], cursor: N },
    children: [
      /* @__PURE__ */ J('div', {
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
              onClick: W,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ p('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const Iu = 650;
function si(n) {
  let e;
  function t() {
    (e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= Iu;
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
const Hu = (n, e, t, r) => n < r && e > t;
function gr(n) {
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
function Au(n, e) {
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
          const d = gr(c),
            f = gr(u);
          return (d?.start ?? 0) - (f?.start ?? 0);
        });
      for (const c of l) {
        const u = gr(c);
        if (!u) {
          t.set(c.id, 0);
          continue;
        }
        let d = !1;
        for (let f = 0; f < a.length; f++)
          if (!a[f].some((m) => Hu(u.start, u.end, m.start, m.end))) {
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
function Lu(n, e, t) {
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
function Pu(n, e) {
  if (!n && !e) return null;
  const t = {};
  let r = !1;
  if (n) for (const [s, o] of Object.entries(n)) (t[s] = o), (r = !0);
  if (e)
    for (const [s, o] of Object.entries(e))
      t[s] !== void 0 ? (t[s] = Math.max(t[s], o)) : (t[s] = o), (r = !0);
  return r ? t : null;
}
function Ou(n) {
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
      copyPaste: h = !1,
      linkShape: m,
      linkGradient: g = !1,
      linkStyle: y,
      linkBundling: w = !1,
    } = n,
    x = He(Et),
    v = le(x, '_tasks'),
    k = le(x, '_scales'),
    R = le(x, 'cellHeight'),
    S = le(x, 'columns'),
    C = le(x, '_scrollTask'),
    H = le(x, 'undo'),
    G = $(() => {
      if (!a) return l;
      const ae = /* @__PURE__ */ new Map(),
        he = /* @__PURE__ */ new Map();
      return (
        v.forEach((We) => {
          const De = We.row ?? We.id;
          he.set(We.id, De),
            ae.has(De) || ae.set(De, []),
            ae.get(De).push(We.id);
        }),
        { rowMap: ae, taskRows: he }
      );
    }, [v, a, l]),
    N = $(() => {
      if (!a || !G || !v?.length) return c;
      const { rowLaneCounts: ae } = Au(v, G),
        he = R - 6,
        We = Lu(ae, R, he);
      return Pu(We, c);
    }, [v, a, G, R, c]),
    [L, _] = Z(!1);
  let [A, O] = Z(0);
  const [W, P] = Z(0),
    [U, T] = Z(0),
    [Y, ne] = Z(void 0),
    [M, j] = Z('all'),
    pe = B(null),
    ue = E(
      (ae) => {
        _(
          (he) => (
            ae !== he &&
              (ae
                ? ((pe.current = M), M === 'all' && j('grid'))
                : (!pe.current || pe.current === 'all') && j('all')),
            ae
          ),
        );
      },
      [M],
    );
  X(() => {
    const ae = si(ue);
    return (
      ae.observe(),
      () => {
        ae.disconnect();
      }
    );
  }, [ue]);
  const Ne = $(() => {
    let ae;
    return (
      S.every((he) => he.width && !he.flexgrow)
        ? (ae = S.reduce((he, We) => he + parseInt(We.width), 0))
        : L && M === 'chart'
          ? (ae = parseInt(S.find((he) => he.id === 'action')?.width) || 50)
          : (ae = 440),
      (A = ae),
      ae
    );
  }, [S, L, M]);
  X(() => {
    O(Ne);
  }, [Ne]);
  const ke = $(() => (W ?? 0) - (Y ?? 0), [W, Y]),
    xe = $(() => k.width, [k]),
    we = 14,
    Ce = $(() => {
      let ae;
      if (!a || !G) ae = v.length * R;
      else {
        const he = [];
        v.forEach((We) => {
          const De = G.taskRows.get(We.id) ?? We.id;
          he.includes(De) || he.push(De);
        }),
          (ae = 0);
        for (const We of he) ae += (N && N[We]) || R;
      }
      return ae + we;
    }, [v, R, a, G, N]),
    Ae = $(() => k.height + Ce + ke, [k, Ce, ke]),
    $e = $(() => A + xe, [A, xe]),
    Q = B(null),
    de = B(!1),
    te = B(null);
  X(() => {
    const ae = () => {
      (de.current = !0),
        clearTimeout(te.current),
        (te.current = setTimeout(() => {
          de.current = !1;
        }, 300));
    };
    return (
      x.on('zoom-scale', ae),
      x.on('set-scale', ae),
      () => {
        clearTimeout(te.current);
      }
    );
  }, [x]);
  const be = E(() => {
      Promise.resolve().then(() => {
        if (!de.current && (W ?? 0) > ($e ?? 0)) {
          const ae = (W ?? 0) - A;
          x.exec('expand-scale', { minWidth: ae });
        }
      });
    }, [W, $e, A, x]),
    Me = B(be);
  (Me.current = be),
    X(() => {
      let ae;
      return (
        Q.current &&
          ((ae = new ResizeObserver(() => Me.current())),
          ae.observe(Q.current)),
        () => {
          ae && ae.disconnect();
        }
      );
    }, [Q.current]);
  const ge = B(null),
    ze = B(null),
    ce = E(() => {
      const ae = ge.current;
      ae &&
        x.exec('scroll-chart', {
          top: ae.scrollTop,
        });
    }, [x]),
    ve = B({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  X(() => {
    ve.current = {
      rTasks: v,
      rScales: k,
      rCellHeight: R,
      scrollSize: ke,
      ganttDiv: ge.current,
      ganttHeight: U ?? 0,
    };
  }, [v, k, R, ke, U]);
  const Oe = E(
    (ae) => {
      if (!ae) return;
      const {
        rTasks: he,
        rScales: We,
        rCellHeight: De,
        scrollSize: Ee,
        ganttDiv: Ge,
        ganttHeight: D,
      } = ve.current;
      if (!Ge) return;
      const { id: q } = ae,
        ee = he.findIndex((re) => re.id === q);
      if (ee > -1) {
        const re = D - We.height,
          Se = ee * De,
          Te = Ge.scrollTop;
        let Le = null;
        Se < Te ? (Le = Se) : Se + De > Te + re && (Le = Se - re + De + Ee),
          Le !== null &&
            (x.exec('scroll-chart', { top: Math.max(Le, 0) }),
            (ge.current.scrollTop = Math.max(Le, 0)));
      }
    },
    [x],
  );
  X(() => {
    Oe(C);
  }, [C]),
    X(() => {
      const ae = ge.current,
        he = ze.current;
      if (!ae || !he) return;
      const We = () => {
          li(() => {
            T(ae.offsetHeight), P(ae.offsetWidth), ne(he.offsetWidth);
          });
        },
        De = new ResizeObserver(We);
      return De.observe(ae), () => De.disconnect();
    }, [ge.current]);
  const me = B(null),
    Ue = B(null);
  return (
    X(() => {
      Ue.current && (Ue.current.destroy(), (Ue.current = null));
      const ae = me.current;
      if (ae)
        return (
          (Ue.current = Kr(ae, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': H,
              'ctrl+y': H,
            },
            exec: (he) => {
              he.isInput || x.exec('hotkey', he);
            },
          })),
          () => {
            Ue.current?.destroy(), (Ue.current = null);
          }
        );
    }, [H]),
    /* @__PURE__ */ p('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: ge,
      onScroll: ce,
      children: /* @__PURE__ */ p('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: Ae, width: '100%' },
        ref: ze,
        children: /* @__PURE__ */ p('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: U,
            width: Y,
          },
          children: /* @__PURE__ */ J('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: me,
            children: [
              S.length
                ? /* @__PURE__ */ J(Ve, {
                    children: [
                      /* @__PURE__ */ p(pu, {
                        display: M,
                        compactMode: L,
                        columnWidth: Ne,
                        width: A,
                        readonly: t,
                        fullHeight: Ce,
                        onTableAPIChange: i,
                        multiTaskRows: a,
                        rowMapping: G,
                        rowHeightOverrides: N,
                      }),
                      /* @__PURE__ */ p(Ru, {
                        value: A,
                        display: M,
                        compactMode: L,
                        containerWidth: W,
                        onMove: (ae) => O(ae),
                        onDisplayChange: (ae) => j(ae),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ p('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: Q,
                children: /* @__PURE__ */ p(Eu, {
                  readonly: t,
                  fullWidth: xe,
                  fullHeight: Ce,
                  taskTemplate: e,
                  cellBorders: r,
                  highlightTime: s,
                  onScaleClick: o,
                  multiTaskRows: a,
                  rowMapping: G,
                  rowHeightOverrides: N,
                  allowTaskIntersection: u,
                  summaryBarCounts: d,
                  marqueeSelect: f,
                  copyPaste: h,
                  linkShape: m,
                  linkGradient: g,
                  linkStyle: y,
                  linkBundling: w,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function zu(n) {
  return {
    year: '%Y',
    quarter: `${n('Q')} %Q`,
    month: '%M',
    week: `${n('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function Wu(n, e) {
  return typeof n == 'function' ? n : Nt(n, e);
}
function oi(n, e) {
  return n.map(({ format: t, ...r }) => ({
    ...r,
    format: Wu(t, e),
  }));
}
function Fu(n, e) {
  const t = zu(e);
  for (let r in t) t[r] = Nt(t[r], n);
  return t;
}
function Yu(n, e) {
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
function Bu(n, e) {
  return n.levels
    ? {
        ...n,
        levels: n.levels.map((t) => ({
          ...t,
          scales: oi(t.scales, e),
        })),
      }
    : n;
}
const Vu = (n) =>
    n
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  Uu = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  Gu = [],
  ju = [],
  Ku = [],
  Xu = [],
  qu = { type: 'forward' },
  Qu = Bt(function (
    {
      taskTemplate: e = null,
      markers: t = Gu,
      taskTypes: r = Qn,
      tasks: s = ju,
      selected: o = Ku,
      activeTask: i = null,
      links: a = Xu,
      scales: l = Uu,
      columns: c = Ao,
      start: u = null,
      end: d = null,
      lengthUnit: f = 'day',
      durationUnit: h = 'day',
      cellWidth: m = 100,
      cellHeight: g = 38,
      scaleHeight: y = 36,
      readonly: w = !1,
      cellBorders: x = 'full',
      zoom: v = !1,
      baselines: k = !1,
      highlightTime: R = null,
      onScaleClick: S = null,
      init: C = null,
      autoScale: H = !0,
      unscheduledTasks: G = !1,
      criticalPath: N = null,
      schedule: L = qu,
      projectStart: _ = null,
      projectEnd: A = null,
      calendar: O = null,
      undo: W = !1,
      splitTasks: P = !1,
      multiTaskRows: U = !1,
      rowHeightOverrides: T = null,
      allowTaskIntersection: Y = !0,
      summaryBarCounts: ne = !1,
      marqueeSelect: M = !1,
      copyPaste: j = !1,
      linkShape: pe,
      linkGradient: ue = !1,
      linkStyle: Ne,
      linkBundling: ke = !1,
      summary: xe = null,
      _export: we = !1,
      ...Ce
    },
    Ae,
  ) {
    const $e = B();
    $e.current = Ce;
    const Q = $(() => new Sl(qs), []),
      de = $(() => ({ ...wn, ...Kn }), []),
      te = He(st.i18n),
      be = $(() => (te ? te.extend(de, !0) : Ut(de)), [te, de]),
      Me = $(() => be.getRaw().calendar, [be]),
      ge = $(() => {
        let Ee = {
          zoom: Bu(v, Me),
          scales: oi(l, Me),
          columns: Yu(c, Me),
          links: Io(a),
          cellWidth: m,
        };
        return (
          Ee.zoom &&
            (Ee = {
              ...Ee,
              ...cl(Ee.zoom, Fu(Me, be.getGroup('gantt')), Ee.scales, m),
            }),
          Ee
        );
      }, [v, l, c, a, m, Me, be]),
      ze = B(null);
    ze.current !== s &&
      (we || Mr(s, { durationUnit: h, calendar: O }), (ze.current = s)),
      X(() => {
        we || Mr(s, { durationUnit: h, calendar: O });
      }, [s, h, O, P, we]);
    const ce = $(() => {
        if (!U) return null;
        const Ee = /* @__PURE__ */ new Map(),
          Ge = /* @__PURE__ */ new Map(),
          D = (q) => {
            q.forEach((ee) => {
              const re = ee.row ?? ee.id;
              Ge.set(ee.id, re),
                Ee.has(re) || Ee.set(re, []),
                Ee.get(re).push(ee.id),
                ee.data && ee.data.length > 0 && D(ee.data);
            });
          };
        return D(s), { rowMap: Ee, taskRows: Ge };
      }, [s, U]),
      ve = $(() => Q.in, [Q]),
      Oe = B(null);
    Oe.current === null &&
      ((Oe.current = new ro((Ee, Ge) => {
        const D = 'on' + Vu(Ee);
        $e.current && $e.current[D] && $e.current[D](Ge);
      })),
      ve.setNext(Oe.current));
    const [me, Ue] = Z(null),
      ae = B(null);
    ae.current = me;
    const he = $(
      () => ({
        getState: Q.getState.bind(Q),
        getReactiveState: Q.getReactive.bind(Q),
        getStores: () => ({ data: Q }),
        exec: ve.exec.bind(ve),
        setNext: (Ee) => ((Oe.current = Oe.current.setNext(Ee)), Oe.current),
        intercept: ve.intercept.bind(ve),
        on: ve.on.bind(ve),
        detach: ve.detach.bind(ve),
        getTask: Q.getTask.bind(Q),
        serialize: () => Q.serialize(),
        getTable: (Ee) =>
          Ee
            ? new Promise((Ge) => setTimeout(() => Ge(ae.current), 1))
            : ae.current,
        getHistory: () => Q.getHistory(),
      }),
      [Q, ve],
    );
    X(() => {
      const Ee = () => {
        const { zoom: Ge, scales: D } = he.getState(),
          ee = Ge?.levels?.[Ge.level]?.scales?.[0]?.unit ?? D?.[0]?.unit;
        ee && he.exec('scale-change', { level: Ge?.level, unit: ee });
      };
      he.on('zoom-scale', Ee), he.on('set-scale', Ee);
    }, [he]),
      X(() => {
        he.intercept('set-scale', ({ unit: Ee, date: Ge }) => {
          const { zoom: D } = he.getState();
          if (!D || !D.levels) return !1;
          const q = D.levels.findIndex((Se) =>
            Se.scales.some((Te) => Te.unit === Ee),
          );
          if (q < 0) return !1;
          const ee = D.levels[q];
          if (q !== D.level) {
            const Se = Math.round((ee.minCellWidth + ee.maxCellWidth) / 2);
            he.getStores().data.setState({
              scales: ee.scales,
              cellWidth: Se,
              _cellWidth: Se,
              zoom: { ...D, level: q },
              ...(Ge ? { _scaleDate: Ge, _zoomOffset: 0 } : {}),
            });
          } else if (Ge) {
            const { _scales: Se, cellWidth: Te } = he.getState(),
              Le = Se.diff(Ge, Se.start, Se.lengthUnit),
              Ke = Math.max(0, Math.round(Le * Te));
            he.exec('scroll-chart', { left: Ke });
          }
          return !1;
        });
      }, [he]),
      Vt(
        Ae,
        () => ({
          ...he,
        }),
        [he],
      );
    const We = B(0);
    X(() => {
      We.current
        ? Q.init({
            tasks: s,
            links: ge.links,
            start: u,
            columns: ge.columns,
            end: d,
            lengthUnit: f,
            cellWidth: ge.cellWidth,
            cellHeight: g,
            scaleHeight: y,
            scales: ge.scales,
            taskTypes: r,
            zoom: ge.zoom,
            selected: o,
            activeTask: i,
            baselines: k,
            autoScale: H,
            unscheduledTasks: G,
            markers: t,
            durationUnit: h,
            criticalPath: N,
            schedule: L,
            projectStart: _,
            projectEnd: A,
            calendar: O,
            undo: W,
            _weekStart: Me.weekStart,
            splitTasks: P,
            summary: xe,
          })
        : C && C(he),
        We.current++;
    }, [
      he,
      C,
      s,
      ge,
      u,
      d,
      f,
      g,
      y,
      r,
      o,
      i,
      k,
      H,
      G,
      t,
      h,
      N,
      L,
      _,
      A,
      O,
      W,
      Me,
      P,
      xe,
      Q,
    ]),
      We.current === 0 &&
        Q.init({
          tasks: s,
          links: ge.links,
          start: u,
          columns: ge.columns,
          end: d,
          lengthUnit: f,
          cellWidth: ge.cellWidth,
          cellHeight: g,
          scaleHeight: y,
          scales: ge.scales,
          taskTypes: r,
          zoom: ge.zoom,
          selected: o,
          activeTask: i,
          baselines: k,
          autoScale: H,
          unscheduledTasks: G,
          markers: t,
          durationUnit: h,
          criticalPath: N,
          schedule: L,
          projectStart: _,
          projectEnd: A,
          calendar: O,
          undo: W,
          _weekStart: Me.weekStart,
          splitTasks: P,
          summary: xe,
        });
    const De = $(
      () =>
        O
          ? (Ee, Ge) =>
              (Ge == 'day' && !O.getDayHours(Ee)) ||
              (Ge == 'hour' && !O.getDayHours(Ee))
                ? 'wx-weekend'
                : ''
          : R,
      [O, R],
    );
    return /* @__PURE__ */ p(st.i18n.Provider, {
      value: be,
      children: /* @__PURE__ */ p(Et.Provider, {
        value: he,
        children: /* @__PURE__ */ p(Ou, {
          taskTemplate: e,
          readonly: w,
          cellBorders: x,
          highlightTime: De,
          onScaleClick: S,
          onTableAPIChange: Ue,
          multiTaskRows: U,
          rowMapping: ce,
          rowHeightOverrides: T,
          allowTaskIntersection: Y,
          summaryBarCounts: ne,
          marqueeSelect: M,
          copyPaste: j,
          linkShape: pe,
          linkGradient: ue,
          linkStyle: Ne,
          linkBundling: ke,
        }),
      }),
    });
  });
function Zu({ api: n = null, items: e = [] }) {
  const t = He(st.i18n),
    r = $(() => t || Ut(Kn), [t]),
    s = $(() => r.getGroup('gantt'), [r]),
    o = vt(n, '_selected'),
    i = vt(n, 'undo'),
    a = vt(n, 'history'),
    l = vt(n, 'splitTasks'),
    c = ['undo', 'redo'],
    u = $(() => {
      const f = Dr();
      return (e.length ? e : Dr()).map((m) => {
        let g = { ...m, disabled: !1 };
        return (
          (g.handler = Gr(f, g.id) ? (y) => qt(n, y.id, null, s) : g.handler),
          g.text && (g.text = s(g.text)),
          g.menuText && (g.menuText = s(g.menuText)),
          g
        );
      });
    }, [e, n, s, i, l]),
    d = $(() => {
      const f = [];
      return (
        u.forEach((h) => {
          const m = h.id;
          if (m === 'add-task') f.push(h);
          else if (c.includes(m))
            c.includes(m) &&
              f.push({
                ...h,
                disabled: h.isDisabled(a),
              });
          else {
            if (!o?.length || !n) return;
            f.push({
              ...h,
              disabled:
                h.isDisabled && o.some((g) => h.isDisabled(g, n.getState())),
            });
          }
        }),
        f.filter((h, m) => {
          if (n && h.isHidden)
            return !o.some((g) => h.isHidden(g, n.getState()));
          if (h.comp === 'separator') {
            const g = f[m + 1];
            if (!g || g.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [n, o, a, u]);
  return t
    ? /* @__PURE__ */ p(Rr, { items: d })
    : /* @__PURE__ */ p(st.i18n.Provider, {
        value: r,
        children: /* @__PURE__ */ p(Rr, { items: d }),
      });
}
const Ju = Bt(function (
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
    const u = B(null),
      d = B(null),
      f = He(st.i18n),
      h = $(() => f || Ut({ ...Kn, ...wn }), [f]),
      m = $(() => h.getGroup('gantt'), [h]),
      g = vt(t, 'taskTypes'),
      y = vt(t, 'selected'),
      w = vt(t, '_selected'),
      x = vt(t, 'splitTasks'),
      v = vt(t, 'summary'),
      k = $(
        () => ({
          splitTasks: x,
          taskTypes: g,
          summary: v,
        }),
        [x, g, v],
      ),
      R = $(() => Tr(k), [k]);
    X(() => {
      t &&
        (t.on('scroll-chart', () => {
          u.current && u.current.show && u.current.show();
        }),
        t.on('drag-task', () => {
          u.current && u.current.show && u.current.show();
        }));
    }, [t]);
    function S(W) {
      return W.map(
        (P) => (
          (P = { ...P }),
          P.text && (P.text = m(P.text)),
          P.subtext && (P.subtext = m(P.subtext)),
          P.data && (P.data = S(P.data)),
          P
        ),
      );
    }
    function C() {
      const W = e.length ? e : Tr(k);
      return S(W);
    }
    const H = $(() => C(), [t, e, k, m]),
      G = $(() => (w && w.length ? w : []), [w]),
      N = E(
        (W, P) => {
          let U = W ? t?.getTask(W) : null;
          if (r) {
            const T = r(W, P);
            U = T === !0 ? U : T;
          }
          if (U) {
            const T = _t(P.target, 'data-segment');
            T !== null
              ? (d.current = { id: U.id, segmentIndex: T })
              : (d.current = U.id),
              (!Array.isArray(y) || !y.includes(U.id)) &&
                t &&
                t.exec &&
                t.exec('select-task', { id: U.id });
          }
          return U;
        },
        [t, r, y],
      ),
      L = E(
        (W) => {
          const P = W.action;
          P && (Gr(R, P.id) && qt(t, P.id, d.current, m), a && a(W));
        },
        [t, m, a, R],
      ),
      _ = E(
        (W, P) => {
          const U = G.length ? G : P ? [P] : [];
          let T = s ? U.every((Y) => s(W, Y)) : !0;
          if (
            T &&
            (W.isHidden &&
              (T = !U.some((Y) => W.isHidden(Y, t.getState(), d.current))),
            W.isDisabled)
          ) {
            const Y = U.some((ne) => W.isDisabled(ne, t.getState(), d.current));
            W.disabled = Y;
          }
          return T;
        },
        [s, G, t],
      );
    Vt(c, () => ({
      show: (W, P) => {
        u.current && u.current.show && u.current.show(W, P);
      },
    }));
    const A = E((W) => {
        u.current && u.current.show && u.current.show(W);
      }, []),
      O = /* @__PURE__ */ J(Ve, {
        children: [
          /* @__PURE__ */ p(Qo, {
            filter: _,
            options: H,
            dataKey: 'id',
            resolver: N,
            onClick: L,
            at: o,
            ref: u,
            css: l,
          }),
          /* @__PURE__ */ p('span', {
            onContextMenu: A,
            'data-menu-ignore': 'true',
            children: typeof i == 'function' ? i() : i,
          }),
        ],
      });
    if (!f && st.i18n?.Provider) {
      const W = st.i18n.Provider;
      return /* @__PURE__ */ p(W, { value: h, children: O });
    }
    return O;
  }),
  Hr = {};
function Ys(n) {
  return typeof n < 'u' ? Hr[n] || n : Hr.text;
}
function mt(n, e) {
  Hr[n] = e;
}
const ed = {
  editor: {},
};
function pr(n) {
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
    c = B(null);
  X(() => {
    if (o) {
      const h = document.activeElement;
      if (h && c.current && c.current.contains(h)) return;
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
  const u = He(st.i18n),
    d = $(() => u.getGroup('editor'), [u]),
    f = $(
      () =>
        e.config[0].comp === 'readonly' &&
        e.config.every((h) => !Object.keys(t).includes(h.key)),
      [e, t],
    );
  return /* @__PURE__ */ J('div', {
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
      e.config.map((h) => {
        if (!h.hidden) {
          const { key: m, onChange: g, ...y } = h;
          if (h.comp === 'readonly' || h.comp === 'section') {
            const w = Ys(h.comp);
            return /* @__PURE__ */ p(
              w,
              {
                fieldKey: m,
                label: h.label,
                value: t[m],
                ...y,
                onClick: i,
              },
              m,
            );
          } else {
            const w = Ys(h.comp);
            return /* @__PURE__ */ J(
              'div',
              {
                children: [
                  /* @__PURE__ */ p(fn, {
                    label: h.labelTemplate
                      ? h.labelTemplate(t[m])
                      : (h.label ?? ''),
                    required: h.required,
                    children: /* @__PURE__ */ p(
                      w,
                      {
                        fieldKey: m,
                        ...y,
                        onChange:
                          g ||
                          ((x) => {
                            l &&
                              l({
                                value: x.value,
                                key: m,
                                input: x.input,
                              });
                          }),
                        label: void 0,
                        error: s && s[m],
                        value: t[m],
                      },
                      m,
                    ),
                  }),
                  s && s[m] && h.validationMessage
                    ? /* @__PURE__ */ p('div', {
                        className: 'wx-s2aE1xdZ wx-message',
                        children: h.validationMessage,
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
function td(n) {
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
function nd(n) {
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
function rd(n) {
  const e = n.map((i) => {
      const a = { ...i };
      return (
        i.config && Object.assign(a, i.config),
        (a.key = i.key || la()),
        (a.setter = i.setter || nd(i.key)),
        (a.getter = i.getter || td(i.key)),
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
          !Xn(d, f) && (d !== void 0 || f) && c.push(u.key);
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
function sd({
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
  onChange: h,
  onSave: m,
  onAction: g,
  onValidation: y,
  hotkeys: w,
}) {
  const x = He(st.i18n).getGroup('editor'),
    [v, k] = Xe(n),
    [R, S] = Z(null),
    C = $(() => {
      const M = rd(e);
      R &&
        M.config.forEach((ue) => {
          ue.comp === 'section' &&
            ue.key === R &&
            (ue.sectionMode === 'accordion'
              ? ue.activeSection ||
                (M.config.forEach((Ne) => {
                  Ne.comp === 'section' &&
                    Ne.key !== ue.key &&
                    (Ne.activeSection = !1);
                }),
                (ue.activeSection = !0))
              : (ue.activeSection = !ue.activeSection));
        });
      let j = /* @__PURE__ */ new Set(),
        pe = null;
      return (
        M.config.forEach((ue) => {
          ue.sectionMode === 'exclusive' && ue.activeSection && (pe = ue.key),
            ue.activeSection && j.add(ue.key);
        }),
        M.config.forEach((ue) => {
          ue.hidden =
            ue.hidden ||
            (r && r !== ue.batch) ||
            (pe && ue.key != pe && ue.section !== pe) ||
            (ue.section && !j.has(ue.section));
        }),
        i
          ? {
              ...M,
              config: M.config.map((ue) => ({ ...ue, comp: 'readonly' })),
              diff: () => [],
            }
          : M
      );
    }, [e, R, r, i]),
    [H, G] = Z({}),
    [N, L] = Z({}),
    _ = v;
  X(() => {
    v !== void 0 && (G(On(v)), L(On(v)), _.errors && (_.errors = P()));
  }, [v]);
  const [A, O] = Z([]);
  X(() => {
    v && O([]);
  }, [v]);
  function W(M) {
    return [...new Set(M)];
  }
  function P(M) {
    const j = C.validateValues(H, M, x);
    return Xn(j, _.errors) || (y && y({ errors: j, values: H })), j;
  }
  function U(M, j) {
    if (s && !_.errors) {
      const pe = C.setValues(v, j ?? N, M);
      k(pe), m && m({ changes: M, values: pe });
    } else O(M);
  }
  function T({ value: M, key: j, input: pe }) {
    let ue = { ...(N || {}), [j]: M };
    const Ne = {
      key: j,
      value: M,
      update: ue,
    };
    if ((pe && (Ne.input = pe), h && h(Ne), !v)) return;
    (ue = Ne.update), L(ue);
    const ke = C.diff(v, ue),
      xe = C.setValues({ ...(H || {}) }, ue, W([...ke, j]));
    if ((G(xe), ke.length)) {
      const we = s ? [] : W([...ke, ...Object.keys(_.errors ?? {}), j]);
      (_.errors = P(we)), U(ke, ue);
    } else {
      const we = Object.keys(_.errors ?? {});
      we.length && (_.errors = P(we)), O([]);
    }
  }
  function Y() {
    if (A.length && (s || (_.errors = P()), !_.errors)) {
      m &&
        m({
          changes: A,
          values: H,
        });
      const M = C.setValues(v, N, A);
      k(M), O([]), k({ ...H });
    }
  }
  function ne({ item: M }) {
    M.id === 'save' ? Y() : M.id === 'toggle-section' && S(M.key),
      g && g({ item: M, values: H, changes: A });
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
    editors: C,
    focus: o,
    hotkeys: w,
    errors: _.errors,
    onClick: ne,
    onKeyDown: ne,
    onChange: T,
    children: f,
  });
}
function od(n) {
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
    ? /* @__PURE__ */ J('div', {
        className: 'wx-bNrSbszs wx-cols',
        children: [
          /* @__PURE__ */ p('div', {
            className: 'wx-bNrSbszs wx-left',
            children: /* @__PURE__ */ p(pr, {
              editors: l[0],
              data: t,
              errors: s,
              onClick: i,
              onChange: a,
            }),
          }),
          /* @__PURE__ */ p('div', {
            className: 'wx-bNrSbszs wx-right',
            children: /* @__PURE__ */ p(pr, {
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
    : /* @__PURE__ */ p(pr, {
        editors: e,
        data: t,
        focus: o,
        errors: s,
        onClick: i,
        onChange: a,
      });
}
function Bs({
  items: n,
  values: e = null,
  top: t = !0,
  onClick: r,
  onChange: s,
}) {
  const o = E(
    ({ item: i, value: a }) => {
      s && s({ key: i.key, value: a });
    },
    [s],
  );
  return n.length
    ? /* @__PURE__ */ p('div', {
        className: `wx-66OW1j0R wx-editor-toolbar ${t ? 'wx-topbar' : 'wx-bottom'}`,
        children: /* @__PURE__ */ p(Rr, {
          items: n,
          values: e,
          onClick: r,
          onChange: o,
        }),
      })
    : null;
}
const ln = () => ({ comp: 'spacer' }),
  mr = (n) => ({
    comp: 'button',
    text: n('Cancel'),
    id: 'cancel',
  }),
  wr = (n) => ({
    type: 'primary',
    comp: 'button',
    text: n('Save'),
    id: 'save',
  }),
  Vs = () => ({
    comp: 'icon',
    icon: 'wxi-close',
    id: 'close',
  });
function xr(n) {
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
      onClick: h,
      onKeyDown: m,
      onChange: g,
      hotkeys: y,
    } = n,
    w = He(st.i18n),
    x = $(() => w.getGroup('editor'), [w]),
    v = $(() => o === !0 && i === !0, [o, i]),
    k = $(() => {
      let N = o && o.items ? o.items.map((L) => ({ ...L })) : [];
      return (
        v &&
          (u
            ? (N = [ln(), Vs()])
            : (d
                ? (N = [ln(), Vs()])
                : l !== 'modal' && (N = [ln(), mr(x), wr(x)]),
              a === 'columns' && !N.length && (N = [ln(), wr(x), mr(x)]))),
        N
      );
    }, [o, v, u, d, l, a, x]),
    R = $(() => {
      let N = i && i.items ? i.items.map((L) => ({ ...L })) : [];
      return (
        v &&
          (u ||
            (l === 'modal' && !d && (N = [ln(), wr(x), mr(x)]),
            a === 'columns' && k.length && (N = []))),
        N
      );
    }, [i, v, u, l, d, a, k, x]),
    S = $(() => [...k, ...R], [k, R]),
    C = B(null),
    H = B(null);
  H.current = (N, ...L) => {
    const _ = S.findIndex((W) => L.includes(W.id));
    if (_ === -1) return !1;
    const A = N.target,
      O = S[_];
    (N.key == 'Escape' &&
      (A.closest('.wx-combo') ||
        A.closest('.wx-multicombo') ||
        A.closest('.wx-richselect'))) ||
      (N.key == 'Delete' &&
        (A.tagName === 'INPUT' || A.tagName === 'TEXTAREA')) ||
      (N.preventDefault(), m && m({ item: O }));
  };
  const G = $(
    () =>
      y === !1
        ? {}
        : {
            'ctrl+s': (N) => H.current(N, 'save'),
            escape: (N) => H.current(N, 'cancel', 'close'),
            'ctrl+d': (N) => H.current(N, 'delete'),
            ...(y || {}),
          },
    [y],
  );
  return (
    $i(G, C),
    /* @__PURE__ */ J('div', {
      className: s ? 'wx-85HDaNoA ' + s : 'wx-85HDaNoA',
      ref: C,
      children: [
        /* @__PURE__ */ p(Bs, {
          ...(o && typeof o == 'object' ? o : {}),
          items: k,
          values: e,
          onClick: h,
          onChange: g,
        }),
        /* @__PURE__ */ J('div', {
          className: `wx-85HDaNoA wx-content${a === 'columns' ? ' wx-layout-columns' : ''}`,
          children: [
            f,
            /* @__PURE__ */ p(od, {
              editors: t,
              layout: a,
              data: e,
              focus: r,
              errors: c,
              onClick: h,
              onChange: g,
            }),
            /* @__PURE__ */ p(Bs, {
              ...(i && typeof i == 'object' ? i : {}),
              items: R,
              values: e,
              top: !1,
              onClick: h,
              onChange: g,
            }),
          ],
        }),
      ],
    })
  );
}
function id(n) {
  const { css: e, onClick: t, placement: r, ...s } = n;
  function o() {
    t && t({ item: { id: 'close' } });
  }
  return r === 'modal'
    ? /* @__PURE__ */ p(ra, {
        children: /* @__PURE__ */ p(xr, {
          css: `wx-panel ${e}`,
          onClick: t,
          placement: r,
          ...s,
        }),
      })
    : r === 'sidebar'
      ? /* @__PURE__ */ p(sa, {
          onCancel: o,
          children: /* @__PURE__ */ p(xr, {
            css: `wx-panel ${e}`,
            onClick: t,
            placement: r,
            ...s,
          }),
        })
      : /* @__PURE__ */ p(xr, {
          css: `wx-inline-form ${e}`,
          onClick: t,
          placement: r,
          ...s,
        });
}
function ad(n) {
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
      ...h
    } = n,
    m = Object.keys(h).reduce((g, y) => {
      if (/^on[a-z]/.test(y)) {
        const w = 'on' + y.charAt(2).toUpperCase() + y.slice(3);
        w in h ? (g[y] = h[y]) : (g[w] = h[y]);
      } else g[y] = h[y];
      return g;
    }, {});
  return /* @__PURE__ */ p(jn, {
    words: ed,
    optional: !0,
    children: /* @__PURE__ */ p(sd, {
      view: id,
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
function ld({ value: n, options: e, label: t }) {
  const r = He(st.i18n).getGroup('editor'),
    s = $(() => {
      let o = n;
      if ((typeof n == 'boolean' && (o = r(n ? 'Yes' : 'No')), e)) {
        const i = e.find((a) => a.id === n);
        i && (o = i.label);
      }
      return o;
    }, [n, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(fn, { label: t, children: s }) : null;
}
function cd({ fieldKey: n, label: e, activeSection: t, onClick: r }) {
  return /* @__PURE__ */ J('div', {
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
mt('text', vn);
mt('textarea', Ei);
mt('checkbox', Ri);
mt('readonly', ld);
mt('section', cd);
Ar(lt);
function ud({ api: n, autoSave: e, onLinksChange: t }) {
  const s = He(st.i18n).getGroup('gantt'),
    o = le(n, 'activeTask'),
    i = le(n, '_activeTask'),
    a = le(n, '_links'),
    l = le(n, 'schedule'),
    c = le(n, 'unscheduledTasks'),
    [u, d] = Z();
  function f() {
    if (o) {
      const y = a
          .filter((x) => x.target == o)
          .map((x) => ({ link: x, task: n.getTask(x.source) })),
        w = a
          .filter((x) => x.source == o)
          .map((x) => ({ link: x, task: n.getTask(x.target) }));
      return [
        { title: s('Predecessors'), data: y },
        { title: s('Successors'), data: w },
      ];
    }
  }
  X(() => {
    d(f());
  }, [o, a]);
  const h = $(
    () => [
      { id: 'e2s', label: s('End-to-start') },
      { id: 's2s', label: s('Start-to-start') },
      { id: 'e2e', label: s('End-to-end') },
      { id: 's2e', label: s('Start-to-end') },
    ],
    [s],
  );
  function m(y) {
    e
      ? n.exec('delete-link', { id: y })
      : (d((w) =>
          (w || []).map((x) => ({
            ...x,
            data: x.data.filter((v) => v.link.id !== y),
          })),
        ),
        t &&
          t({
            id: y,
            action: 'delete-link',
            data: { id: y },
          }));
  }
  function g(y, w) {
    e
      ? n.exec('update-link', {
          id: y,
          link: w,
        })
      : (d((x) =>
          (x || []).map((v) => ({
            ...v,
            data: v.data.map((k) =>
              k.link.id === y ? { ...k, link: { ...k.link, ...w } } : k,
            ),
          })),
        ),
        t &&
          t({
            id: y,
            action: 'update-link',
            data: {
              id: y,
              link: w,
            },
          }));
  }
  return /* @__PURE__ */ p(Ve, {
    children: (u || []).map((y, w) =>
      y.data.length
        ? /* @__PURE__ */ p(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ p(st.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ p(fn, {
                  label: y.title,
                  position: 'top',
                  children: /* @__PURE__ */ p('table', {
                    children: /* @__PURE__ */ p('tbody', {
                      children: y.data.map((x) =>
                        /* @__PURE__ */ J(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ p('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ p('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: x.task.text || '',
                                }),
                              }),
                              l?.auto && x.link.type === 'e2s'
                                ? /* @__PURE__ */ p('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ p(vn, {
                                      type: 'number',
                                      placeholder: s('Lag'),
                                      value: x.link.lag,
                                      disabled: c && i?.unscheduled,
                                      onChange: (v) => {
                                        v.input ||
                                          g(x.link.id, { lag: v.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ p('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ p('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ p(Hi, {
                                    value: x.link.type,
                                    placeholder: s('Select link type'),
                                    options: h,
                                    onChange: (v) =>
                                      g(x.link.id, { type: v.value }),
                                    children: ({ option: v }) => v.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ p('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ p('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => m(x.link.id),
                                  role: 'button',
                                }),
                              }),
                            ],
                          },
                          x.link.id,
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
function dd(n) {
  const { value: e, time: t, format: r, onchange: s, onChange: o, ...i } = n,
    a = o ?? s;
  function l(c) {
    const u = new Date(c.value);
    u.setHours(e.getHours()),
      u.setMinutes(e.getMinutes()),
      a && a({ value: u });
  }
  return /* @__PURE__ */ J('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ p(qi, {
        ...i,
        value: e,
        onChange: l,
        format: r,
        buttons: ['today'],
        clear: !1,
      }),
      t ? /* @__PURE__ */ p(na, { value: e, onChange: a, format: r }) : null,
    ],
  });
}
mt('select', Js);
mt('date', dd);
mt('twostate', eo);
mt('slider', kr);
mt('counter', Qi);
mt('links', ud);
function fd({
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
  const d = He(st.i18n),
    f = $(() => d || Ut({ ...Kn, ...wn }), [d]),
    h = $(() => f.getGroup('gantt'), [f]),
    m = f.getRaw(),
    g = $(() => {
      const ce = m.gantt?.dateFormat || m.formats?.dateFormat;
      return Nt(ce, m.calendar);
    }, [m]),
    y = $(() => {
      if (a === !0 && !s) {
        const ce = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: h('Delete'),
            id: 'delete',
          },
        ];
        return l
          ? { items: ce }
          : {
              items: [
                ...ce,
                {
                  comp: 'button',
                  type: 'primary',
                  text: h('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return a;
    }, [a, s, l, h]),
    [w, x] = Z(!1),
    v = $(() => (w ? 'wx-full-screen' : ''), [w]),
    k = E((ce) => {
      x(ce);
    }, []);
  X(() => {
    const ce = si(k);
    return (
      ce.observe(),
      () => {
        ce.disconnect();
      }
    );
  }, [k]);
  const R = le(n, '_activeTask'),
    S = le(n, 'activeTask'),
    C = le(n, 'unscheduledTasks'),
    H = le(n, 'summary'),
    G = le(n, 'links'),
    N = le(n, 'splitTasks'),
    L = $(() => N && S?.segmentIndex, [N, S]),
    _ = $(() => L || L === 0, [L]),
    A = le(n, 'taskTypes'),
    O = $(() => Wo({ taskTypes: A }), [C, H, A]),
    W = le(n, 'undo'),
    [P, U] = Z({}),
    [T, Y] = Z(null),
    [ne, M] = Z(),
    [j, pe] = Z(null),
    ue = $(() => {
      if (!R) return null;
      let ce;
      if (
        (_ && R.segments ? (ce = { ...R.segments[L] }) : (ce = { ...R }), s)
      ) {
        let ve = { parent: ce.parent };
        return (
          O.forEach(({ key: Oe, comp: me }) => {
            if (me !== 'links') {
              const Ue = ce[Oe];
              me === 'date' && Ue instanceof Date
                ? (ve[Oe] = g(Ue))
                : me === 'slider' && Oe === 'progress'
                  ? (ve[Oe] = `${Ue}%`)
                  : (ve[Oe] = Ue);
            }
          }),
          ve
        );
      }
      return ce || null;
    }, [R, _, L, s, O, g]);
  X(() => {
    M(ue);
  }, [ue]),
    X(() => {
      U({}), pe(null), Y(null);
    }, [S]);
  function Ne(ce, ve) {
    return ce.map((Oe) => {
      const me = { ...Oe };
      if (
        (Oe.config && (me.config = { ...me.config }),
        me.comp === 'links' &&
          n &&
          ((me.api = n), (me.autoSave = l), (me.onLinksChange = we)),
        me.comp === 'select' && me.key === 'type')
      ) {
        const Ue = me.options ?? [];
        me.options = Ue.map((ae) => ({
          ...ae,
          label: h(ae.label),
        }));
      }
      return (
        me.comp === 'slider' &&
          me.key === 'progress' &&
          (me.labelTemplate = (Ue) => `${h(me.label)} ${Ue}%`),
        me.label && (me.label = h(me.label)),
        me.config?.placeholder &&
          (me.config.placeholder = h(me.config.placeholder)),
        ve &&
          (me.isDisabled && me.isDisabled(ve, n.getState())
            ? (me.disabled = !0)
            : delete me.disabled),
        me
      );
    });
  }
  const ke = $(() => {
      let ce = e.length ? e : O;
      return (
        (ce = Ne(ce, ne)),
        ne
          ? ce.filter((ve) => !ve.isHidden || !ve.isHidden(ne, n.getState()))
          : ce
      );
    }, [e, O, ne, h, n, l]),
    xe = $(() => ke.map((ce) => ce.key), [ke]);
  function we({ id: ce, action: ve, data: Oe }) {
    U((me) => ({
      ...me,
      [ce]: { action: ve, data: Oe },
    }));
  }
  const Ce = E(() => {
      for (let ce in P)
        if (G.byId(ce)) {
          const { action: ve, data: Oe } = P[ce];
          n.exec(ve, Oe);
        }
    }, [n, P, G]),
    Ae = E(() => {
      const ce = S?.id || S;
      if (_) {
        if (R?.segments) {
          const ve = R.segments.filter((Oe, me) => me !== L);
          n.exec('update-task', {
            id: ce,
            task: { segments: ve },
          });
        }
      } else n.exec('delete-task', { id: ce });
    }, [n, S, _, R, L]),
    $e = E(() => {
      n.exec('show-editor', { id: null });
    }, [n]),
    Q = E(
      (ce) => {
        const { item: ve, changes: Oe } = ce;
        ve.id === 'delete' && Ae(),
          ve.id === 'save' && (Oe.length ? $e() : Ce()),
          ve.comp && $e();
      },
      [n, S, l, Ce, Ae, $e],
    ),
    de = E(
      (ce, ve, Oe) => (
        C && ce.type === 'summary' && (ce.unscheduled = !1),
        Po(ce, n.getState(), ve),
        Oe || Y(!1),
        ce
      ),
      [C, n],
    ),
    te = E(
      (ce) => {
        (ce = {
          ...ce,
          unscheduled: C && ce.unscheduled && ce.type !== 'summary',
        }),
          delete ce.links,
          delete ce.data,
          (xe.indexOf('duration') === -1 || (ce.segments && !ce.duration)) &&
            delete ce.duration;
        const ve = {
          id: S?.id || S,
          task: ce,
          ...(_ && { segmentIndex: L }),
        };
        l && T && (ve.inProgress = T), n.exec('update-task', ve), l || Ce();
      },
      [n, S, C, l, Ce, xe, _, L, T],
    ),
    be = E(
      (ce) => {
        let { update: ve, key: Oe, input: me } = ce;
        if ((me && Y(!0), (ce.update = de({ ...ve }, Oe, me)), !l))
          M(ce.update);
        else if (!j && !me) {
          const Ue = ke.find((We) => We.key === Oe),
            ae = ve[Oe];
          (!Ue.validation || Ue.validation(ae)) &&
            (!Ue.required || ae) &&
            te(ce.update);
        }
      },
      [l, de, j, ke, te],
    ),
    Me = E(
      (ce) => {
        l || te(ce.values);
      },
      [l, te],
    ),
    ge = E((ce) => {
      pe(ce.errors);
    }, []),
    ze = $(
      () =>
        W
          ? {
              'ctrl+z': (ce) => {
                ce.preventDefault(), n.exec('undo');
              },
              'ctrl+y': (ce) => {
                ce.preventDefault(), n.exec('redo');
              },
            }
          : {},
      [W, n],
    );
  return ue
    ? /* @__PURE__ */ p(jn, {
        children: /* @__PURE__ */ p(ad, {
          css: `wx-XkvqDXuw wx-gantt-editor ${v} ${t}`,
          items: ke,
          values: ue,
          topBar: y,
          bottomBar: i,
          placement: o,
          layout: r,
          readonly: s,
          autoSave: l,
          focus: c,
          onAction: Q,
          onSave: Me,
          onValidation: ge,
          onChange: be,
          hotkeys: u && { ...ze, ...u },
        }),
      })
    : null;
}
const hd = ({ children: n, columns: e = null, api: t }) => {
  const [r, s] = Z(null);
  return (
    X(() => {
      t && t.getTable(!0).then(s);
    }, [t]),
    /* @__PURE__ */ p(hu, { api: r, columns: e, children: n })
  );
};
function gd(n) {
  const { api: e, content: t, filter: r, children: s } = n,
    o = B(null),
    i = B(null),
    [a, l] = Z({}),
    [c, u] = Z(null),
    [d, f] = Z(null),
    [h, m] = Z(!1),
    g = B(null),
    y = B(!1),
    w = B(null),
    x = B(null),
    v = 300,
    k = 400;
  function R(T) {
    for (; T; ) {
      if (T.getAttribute) {
        const Y = T.getAttribute('data-tooltip-id'),
          ne = T.getAttribute('data-tooltip-at'),
          M = T.getAttribute('data-tooltip');
        if (Y || M) return { id: Y, tooltip: M, target: T, at: ne };
      }
      T = T.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  X(() => {
    const T = i.current;
    if (!h && T && d && (d.text || t)) {
      const Y = T.getBoundingClientRect();
      let ne = !1,
        M = d.left,
        j = d.top;
      Y.right >= a.right && ((M = a.width - Y.width - 5), (ne = !0)),
        Y.bottom >= a.bottom &&
          ((j = d.top - (Y.bottom - a.bottom + 2)), (ne = !0)),
        ne && f((pe) => pe && { ...pe, left: M, top: j });
    }
  }, [d, a, t, h]);
  const S = E(() => {
      clearTimeout(w.current),
        clearTimeout(x.current),
        (w.current = null),
        (x.current = null),
        (g.current = null),
        (y.current = !1),
        f(null),
        u(null),
        m(!1);
    }, []),
    C = E(() => {
      clearTimeout(x.current),
        (x.current = setTimeout(() => {
          (x.current = null), !g.current && !y.current && S();
        }, k));
    }, [S]),
    H = E(() => {
      clearTimeout(x.current), (x.current = null);
    }, []);
  function G(T) {
    if (i.current && i.current.contains(T.target)) return;
    let { id: Y, tooltip: ne, target: M, at: j } = R(T.target);
    if (!Y && !ne) {
      clearTimeout(w.current),
        (w.current = null),
        (g.current = null),
        !y.current && !x.current && C();
      return;
    }
    if ((H(), ne || (ne = W(Y)), g.current === Y)) return;
    (g.current = Y), clearTimeout(w.current), f(null), u(null), m(!1);
    const pe = T.clientX;
    w.current = setTimeout(() => {
      w.current = null;
      const ue = Y ? O(P(Y)) : null;
      if (r && ue && !r(ue)) {
        g.current = null;
        return;
      }
      ue && u(ue);
      const Ne = M.getBoundingClientRect(),
        ke = o.current,
        xe = ke
          ? ke.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let we, Ce;
      j === 'left'
        ? ((we = Ne.top + 5 - xe.top), (Ce = Ne.right + 5 - xe.left))
        : ((we = Ne.top + Ne.height - xe.top), (Ce = pe - xe.left)),
        l(xe),
        f({ top: we, left: Ce, text: ne });
    }, v);
  }
  function N() {
    (y.current = !0), H();
  }
  function L() {
    (y.current = !1), g.current || C();
  }
  function _(T) {
    const Y = T.touches[0];
    if (!Y) return;
    const { id: ne, target: M } = R(T.target);
    if (!ne) return;
    clearTimeout(w.current), clearTimeout(x.current);
    const j = O(P(ne));
    if (r && j && !r(j)) return;
    const pe = j?.text || '',
      ue = M.getBoundingClientRect(),
      Ne = o.current,
      ke = Ne
        ? Ne.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    u(j),
      l(ke),
      m(!0),
      f({
        top: ue.top - ke.top - 8,
        left: Y.clientX - ke.left,
        text: pe,
      });
  }
  function A() {
    S();
  }
  function O(T) {
    return e?.getTask(P(T)) || null;
  }
  function W(T) {
    return O(T)?.text || '';
  }
  function P(T) {
    const Y = Number(T);
    return Number.isFinite(Y) ? Y : T;
  }
  X(
    () => () => {
      clearTimeout(w.current), clearTimeout(x.current);
    },
    [],
  );
  const U = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    h ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ J('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: G,
    onTouchStart: _,
    onTouchEnd: A,
    onTouchMove: A,
    children: [
      d && (d.text || t)
        ? /* @__PURE__ */ p('div', {
            className: U,
            ref: i,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            onMouseEnter: N,
            onMouseLeave: L,
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
function pd({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(us, { fonts: n, children: e() })
    : /* @__PURE__ */ p(us, { fonts: n });
}
function md({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(ds, { fonts: n, children: e })
    : /* @__PURE__ */ p(ds, { fonts: n });
}
function wd({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(fs, { fonts: n, children: e })
    : /* @__PURE__ */ p(fs, { fonts: n });
}
const xd = '2.9.0',
  yd = {
    version: xd,
  },
  vd = yd.version,
  Id = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ContextMenu: Ju,
        Editor: fd,
        Gantt: Qu,
        HeaderMenu: hd,
        Material: pd,
        Toolbar: Zu,
        Tooltip: gd,
        Willow: md,
        WillowDark: wd,
        defaultColumns: Ao,
        defaultEditorItems: Fo,
        defaultMenuOptions: Oo,
        defaultTaskTypes: Qn,
        defaultToolbarButtons: zo,
        getEditorItems: Wo,
        getMenuOptions: Tr,
        getToolbarButtons: Dr,
        registerEditorItem: mt,
        registerScaleUnit: ol,
        version: vd,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
export { Id as default };
