import { jsx as p, jsxs as re, Fragment as He } from 'react/jsx-runtime';
import Go, {
  useState as Q,
  useEffect as V,
  useRef as W,
  createContext as Wt,
  useContext as Se,
  useMemo as $,
  useCallback as M,
  forwardRef as Dt,
  useImperativeHandle as Et,
  Fragment as Ts,
} from 'react';
import { createPortal as Vo, flushSync as Ko } from 'react-dom';
function Qe(n, e = 'data-id') {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
function rr(n, e = 'data-id') {
  const t = Qe(n, e);
  return t ? t.getAttribute(e) : null;
}
function Ct(n, e = 'data-id') {
  const t = Qe(n, e);
  return t ? Ft(t.getAttribute(e)) : null;
}
function Ft(n) {
  if (typeof n == 'string') {
    const e = n * 1;
    if (!isNaN(e)) return e;
  }
  return n;
}
function jo() {
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
var nt = jo();
function yr(n) {
  Object.assign(nt, n);
}
function Ar(n, e, t) {
  function r(s) {
    const o = Qe(s);
    if (!o) return;
    const i = Ft(o.dataset.id);
    if (typeof e == 'function') return e(i, s);
    let l,
      a = s.target;
    for (; a != o; ) {
      if (((l = a.dataset ? a.dataset.action : null), l && e[l])) {
        e[l](i, s);
        return;
      }
      a = a.parentNode;
    }
    e[t] && e[t](i, s);
  }
  nt.addEvent(n, t, r);
}
function Ms(n, e) {
  Ar(n, e, 'click'), e.dblclick && Ar(n, e.dblclick, 'dblclick');
}
function Uo(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    if (n[t] === e) {
      n.splice(t, 1);
      break;
    }
}
var Ds = /* @__PURE__ */ new Date(),
  bn = !1,
  fn = [],
  _t = [],
  Lr = (n) => {
    if (bn) {
      bn = !1;
      return;
    }
    for (let e = _t.length - 1; e >= 0; e--) {
      const { node: t, date: r, props: s } = _t[e];
      if (
        !(r > Ds) &&
        !t.contains(n.target) &&
        t !== n.target &&
        (s.callback && s.callback(n), s.modal || n.defaultPrevented)
      )
        break;
    }
  },
  qo = (n) => {
    (Ds = /* @__PURE__ */ new Date()), (bn = !0);
    for (let e = _t.length - 1; e >= 0; e--) {
      const { node: t } = _t[e];
      if (!t.contains(n.target) && t !== n.target) {
        bn = !1;
        break;
      }
    }
  };
function tn(n, e) {
  fn.length ||
    (fn = [
      nt.addGlobalEvent('click', Lr, n),
      nt.addGlobalEvent('contextmenu', Lr, n),
      nt.addGlobalEvent('mousedown', qo, n),
    ]),
    typeof e != 'object' && (e = { callback: e });
  const t = { node: n, date: /* @__PURE__ */ new Date(), props: e };
  return (
    _t.push(t),
    {
      destroy() {
        Uo(_t, t), _t.length || (fn.forEach((r) => r()), (fn = []));
      },
    }
  );
}
var hn = (n) => n.indexOf('bottom') !== -1,
  gn = (n) => n.indexOf('left') !== -1,
  pn = (n) => n.indexOf('right') !== -1,
  Bn = (n) => n.indexOf('top') !== -1,
  Pr = (n) => n.indexOf('fit') !== -1,
  mn = (n) => n.indexOf('overlap') !== -1,
  Xo = (n) => n.split('-').every((e) => ['center', 'fit'].indexOf(e) > -1),
  Qo = (n) => {
    const e = n.match(/(start|center|end)/);
    return e ? e[0] : null;
  };
function Zo(n, e) {
  let t = 0;
  const r = nt.getTopNode(n);
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
var Ue, et, Ut, Xe;
function Jo(n, e, t = 'bottom', r = 0, s = 0) {
  if (!n) return null;
  (Ue = r), (et = s), (Ut = 'auto');
  let o = 0,
    i = 0;
  const l = ei(n),
    a = mn(t) ? nt.getTopNode(n) : l;
  if (!l) return null;
  const u = l.getBoundingClientRect(),
    c = n.getBoundingClientRect(),
    d = a.getBoundingClientRect(),
    f = window.getComputedStyle(a),
    g = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    };
  for (const k in g) {
    const b = `border-${k}-width`;
    g[k] = parseFloat(f.getPropertyValue(b));
  }
  if (e) {
    const k = Zo(e, l);
    o = Math.max(k + 1, 20);
  }
  if (e) {
    if (
      ((Xe = e.getBoundingClientRect()),
      Pr(t) && (Ut = Xe.width + 'px'),
      t !== 'point')
    )
      if (Xo(t))
        Pr(t) ? (Ue = 0) : ((Ue = d.width / 2), (i = 1)),
          (et = (d.height - c.height) / 2);
      else {
        const k = mn(t) ? 0 : 1;
        (Ue = pn(t) ? Xe.right + k : Xe.left - k),
          (et = hn(t) ? Xe.bottom + 1 : Xe.top);
        const b = Qo(t);
        b &&
          (pn(t) || gn(t)
            ? b === 'center'
              ? (et -= (c.height - Xe.height) / 2)
              : b === 'end' && (et -= c.height - Xe.height)
            : (hn(t) || Bn(t)) &&
              (b === 'center'
                ? (Ue -= (c.width - Xe.width) / 2)
                : b === 'end' && (Ue -= c.width - Xe.width),
              mn(t) || (Ue += 1)));
      }
  } else Xe = { left: r, right: r, top: s, bottom: s };
  const m = (gn(t) || pn(t)) && (hn(t) || Bn(t));
  gn(t) && (i = 2);
  const h = Ue - c.width - d.left;
  e && gn(t) && !m && h < 0 && ((Ue = Xe.right), (i = 0));
  const x = Ue + c.width * (1 - i / 2) - d.right;
  if (x > 0)
    if (!pn(t)) Ue = d.right - g.right - c.width;
    else {
      const k = Xe.left - d.x - c.width;
      e && !mn(t) && !m && k >= 0
        ? (Ue = Xe.left - c.width)
        : (Ue -= x + g.right);
    }
  i && (Ue = Math.round(Ue - (c.width * i) / 2));
  const w = h < 0 || x > 0 || !m;
  Bn(t) && ((et = Xe.top - c.height), e && et < d.y && w && (et = Xe.bottom));
  const y = et + c.height - d.bottom;
  return (
    y > 0 &&
      (e && hn(t) && w
        ? (et -= c.height + Xe.height + 1)
        : (et -= y + g.bottom)),
    (Ue -= u.left + g.left),
    (et -= u.top + g.top),
    (Ue = Math.max(Ue, 0) + a.scrollLeft),
    (et = Math.max(et, 0) + a.scrollTop),
    (Ut = Ut || 'auto'),
    { x: Ue, y: et, z: o, width: Ut }
  );
}
function ei(n) {
  const e = nt.getTopNode(n);
  for (n && (n = n.parentElement); n; ) {
    const t = getComputedStyle(n).position;
    if (n === e || t === 'relative' || t === 'absolute' || t === 'fixed')
      return n;
    n = n.parentNode;
  }
  return null;
}
var zr = /* @__PURE__ */ new Date().valueOf();
function En() {
  return (zr += 1), zr;
}
var ti = class {
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
  Pt = [],
  Or = {
    subscribe: (n) => {
      ni();
      const e = new ti();
      return (
        Pt.push(e),
        n(e),
        () => {
          const t = Pt.findIndex((r) => r === e);
          t >= 0 && Pt.splice(t, 1);
        }
      );
    },
  },
  Wr = !1;
function ni() {
  Wr ||
    ((Wr = !0),
    document.addEventListener('keydown', (n) => {
      if (
        Pt.length &&
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
        for (let s = Pt.length - 1; s >= 0; s--) {
          const o = Pt[s],
            i = o.store.get(r) || o.store.get(t);
          i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
        }
      }
    }));
}
function tt(n) {
  return n < 10 ? '0' + n : n.toString();
}
function ri(n) {
  const e = tt(n);
  return e.length == 2 ? '0' + e : e;
}
function Es(n) {
  const e = Math.floor(n / 11) * 11;
  return {
    start: e,
    end: e + 11,
  };
}
function Fr(n, e = 1) {
  let t = n.getDay();
  t === 0 && (t = 7), (t = (t - e + 7) % 7);
  const r = new Date(n.valueOf());
  r.setDate(n.getDate() + (3 - t));
  const s = r.getFullYear(),
    o = Math.floor((r.getTime() - new Date(s, 0, 1).getTime()) / 864e5);
  return 1 + Math.floor(o / 7);
}
var Yr = ['', ''];
function si(n, e, t) {
  switch (n) {
    case '%d':
      return tt(e.getDate());
    case '%m':
      return tt(e.getMonth() + 1);
    case '%j':
      return e.getDate();
    case '%n':
      return e.getMonth() + 1;
    case '%y':
      return tt(e.getFullYear() % 100);
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
      return tt(((e.getHours() + 11) % 12) + 1);
    case '%g':
      return ((e.getHours() + 11) % 12) + 1;
    case '%G':
      return e.getHours();
    case '%H':
      return tt(e.getHours());
    case '%i':
      return tt(e.getMinutes());
    case '%a':
      return ((e.getHours() > 11 ? t.pm : t.am) || Yr)[0];
    case '%A':
      return ((e.getHours() > 11 ? t.pm : t.am) || Yr)[1];
    case '%s':
      return tt(e.getSeconds());
    case '%S':
      return ri(e.getMilliseconds());
    case '%W':
      return tt(Fr(e));
    case '%w':
      return tt(Fr(e, t.weekStart ?? 1));
    case '%c': {
      let r = e.getFullYear() + '';
      return (
        (r += '-' + tt(e.getMonth() + 1)),
        (r += '-' + tt(e.getDate())),
        (r += 'T'),
        (r += tt(e.getHours())),
        (r += ':' + tt(e.getMinutes())),
        (r += ':' + tt(e.getSeconds())),
        r
      );
    }
    case '%Q':
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return n;
  }
}
var oi = /%[a-zA-Z]/g;
function ht(n, e) {
  return typeof n == 'function'
    ? n
    : function (t) {
        return t
          ? (t.getMonth || (t = new Date(t)), n.replace(oi, (r) => si(r, t, e)))
          : '';
      };
}
function Br(n) {
  return n && typeof n == 'object' && !Array.isArray(n);
}
function sr(n, e) {
  for (const t in e) {
    const r = e[t];
    Br(n[t]) && Br(r) ? (n[t] = sr({ ...n[t] }, e[t])) : (n[t] = e[t]);
  }
  return n;
}
function Rt(n) {
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
      return t ? (r = sr({ ...e }, n)) : (r = sr({ ...n }, e)), Rt(r);
    },
  };
}
function Ye(n) {
  const [e, t] = Q(n),
    r = W(n);
  return (
    V(() => {
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
function ii(n, e, t) {
  const [r, s] = Q(() => e);
  return (
    n || console.warn(`Writable ${t} is not defined`),
    V(
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
function oe(n, e) {
  const t = n.getState(),
    r = n.getReactiveState();
  return ii(r[e], t[e], e);
}
function dt(n, e) {
  const [t, r] = Q(() => null);
  return (
    V(() => {
      if (!n) return;
      const s = n.getReactiveState(),
        o = s ? s[e] : null;
      return o ? o.subscribe((l) => r(() => l)) : void 0;
    }, [n, e]),
    t
  );
}
function li(n, e) {
  const t = W(e);
  t.current = e;
  const [r, s] = Q(1);
  return (
    V(
      () =>
        n.subscribe((i) => {
          (t.current = i), s((l) => l + 1);
        }),
      [n],
    ),
    [t.current, r]
  );
}
function Sn(n, e) {
  const t = n.getState(),
    r = n.getReactiveState();
  return li(r[e], t[e]);
}
function ai(n, e) {
  V(() => {
    const t = e.current;
    if (t)
      return Or.subscribe((r) => {
        r.configure(n, t);
      });
  }, [Or, e]);
}
function Rs(n, e) {
  return typeof n == 'function' ? (typeof e == 'object' ? n(e) : n()) : n;
}
function Is(n) {
  const e = {};
  return (
    n.split(';').forEach((t) => {
      const [r, s] = t.split(':');
      if (s) {
        let o = r.trim();
        o.indexOf('-') &&
          (o = o.replace(/-([a-z])/g, (i, l) => l.toUpperCase())),
          (e[o] = s.trim());
      }
    }),
    e
  );
}
function Hs(n) {
  let e = n,
    t = [];
  return {
    subscribe: (l) => {
      t.push(l), l(e);
    },
    unsubscribe: (l) => {
      t = t.filter((a) => a !== l);
    },
    set: (l) => {
      (e = l), t.forEach((a) => a(e));
    },
    update: (l) => {
      (e = l(e)), t.forEach((a) => a(e));
    },
  };
}
function Gr(n, e, t) {
  function r(s) {
    const o = Qe(s);
    if (!o) return;
    const i = Ft(o.dataset.id);
    if (typeof e == 'function') return e(i, s);
    let l,
      a = s.target;
    for (; a != o; ) {
      if (((l = a.dataset ? a.dataset.action : null), l && e[l])) {
        e[l](i, s);
        return;
      }
      a = a.parentNode;
    }
    e[t] && e[t](i, s);
  }
  return nt.addEvent(n, t, r);
}
function ci(n, e) {
  const t = [Gr(n, e, 'click')];
  return (
    e.dblclick && t.push(Gr(n, e.dblclick, 'dblclick')),
    () => {
      t.forEach((r) => r());
    }
  );
}
const ui = 'en-US',
  di = {
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
  fi = {
    ok: 'OK',
    cancel: 'Cancel',
    select: 'Select',
    'No data': 'No data',
    'Rows per page': 'Rows per page',
    'Total pages': 'Total pages',
  },
  hi = {
    timeFormat: '%H:%i',
    dateFormat: '%m/%d/%Y',
    monthYearFormat: '%F %Y',
    yearFormat: '%Y',
  },
  nn = {
    core: fi,
    calendar: di,
    formats: hi,
    lang: ui,
  },
  rn = Wt('willow'),
  gi = Wt({}),
  it = Wt(null),
  vr = Wt(null),
  Ze = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        fieldId: vr,
        helpers: gi,
        i18n: it,
        theme: rn,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
function Yt(n) {
  const e = Se(vr),
    [t] = Q(() => n || (e && e()) || En());
  return t;
}
function pi({
  value: n = '',
  id: e,
  placeholder: t = '',
  title: r = '',
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: l,
}) {
  const a = Yt(e),
    [u, c] = Ye(n),
    d = M(
      (m) => {
        const h = m.target.value;
        c(h), l && l({ value: h, input: !0 });
      },
      [l],
    ),
    f = M(
      (m) => {
        const h = m.target.value;
        c(h), l && l({ value: h });
      },
      [l],
    ),
    g = W(null);
  return (
    V(() => {
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
      id: a,
      disabled: s,
      placeholder: t,
      readOnly: i,
      title: r,
      value: u,
      onInput: d,
      ref: g,
    })
  );
}
function gt({
  type: n = '',
  css: e = '',
  icon: t = '',
  disabled: r = !1,
  title: s = '',
  text: o = '',
  children: i,
  onClick: l,
}) {
  const a = $(() => {
      let c = n
        ? n
            .split(' ')
            .filter((d) => d !== '')
            .map((d) => 'wx-' + d)
            .join(' ')
        : '';
      return e + (e ? ' ' : '') + c;
    }, [n, e]),
    u = (c) => {
      l && l(c);
    };
  return /* @__PURE__ */ re('button', {
    title: s,
    className: `wx-2ZWgb4 wx-button ${a} ${t && !i ? 'wx-icon' : ''}`,
    disabled: r,
    onClick: u,
    children: [
      t && /* @__PURE__ */ p('i', { className: 'wx-2ZWgb4 ' + t }),
      i || o || ' ',
    ],
  });
}
function mi({
  id: n,
  label: e = '',
  inputValue: t = '',
  value: r = !1,
  onChange: s,
  disabled: o = !1,
}) {
  const i = Yt(n),
    [l, a] = Ye(r);
  return /* @__PURE__ */ re('div', {
    className: 'wx-2IvefP wx-checkbox',
    children: [
      /* @__PURE__ */ p('input', {
        type: 'checkbox',
        id: i,
        disabled: o,
        className: 'wx-2IvefP wx-check',
        checked: l,
        value: t,
        onChange: ({ target: u }) => {
          const c = u.checked;
          a(c), s && s({ value: c, inputValue: t });
        },
      }),
      /* @__PURE__ */ re('label', {
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
function Bt({
  position: n = 'bottom',
  align: e = 'start',
  autoFit: t = !0,
  onCancel: r,
  width: s = '100%',
  children: o,
}) {
  const i = W(null),
    [l, a] = Ye(n),
    [u, c] = Ye(e);
  return (
    V(() => {
      if (t) {
        const d = i.current;
        if (d) {
          const f = d.getBoundingClientRect(),
            g = nt.getTopNode(d).getBoundingClientRect();
          f.right >= g.right && c('end'), f.bottom >= g.bottom && a('top');
        }
      }
    }, [t]),
    V(() => {
      if (i.current) {
        const d = (f) => {
          r && r(f);
        };
        return tn(i.current, d).destroy;
      }
    }, [r]),
    /* @__PURE__ */ p('div', {
      ref: i,
      className: `wx-32GZ52 wx-dropdown wx-${l}-${u}`,
      style: { width: s },
      children: o,
    })
  );
}
function sn() {
  return Rt(nn);
}
function wi() {
  let n = null,
    e = !1,
    t,
    r,
    s,
    o;
  const i = (c, d, f, g) => {
      (t = c), (r = d), (s = f), (o = g);
    },
    l = (c) => {
      (n = c), (e = n !== null), s(n);
    },
    a = (c, d) => {
      if (c !== null && t) {
        const f = t.querySelectorAll('.wx-list > .wx-item')[c];
        f && (f.scrollIntoView({ block: 'nearest' }), d && d.preventDefault());
      }
    },
    u = (c, d) => {
      const f = c === null ? null : Math.max(0, Math.min(n + c, r.length - 1));
      f !== n && (l(f), t ? a(f, d) : requestAnimationFrame(() => a(f, d)));
    };
  return {
    move: (c) => {
      const d = Ct(c),
        f = r.findIndex((g) => g.id == d);
      f !== n && l(f);
    },
    keydown: (c, d) => {
      switch (c.code) {
        case 'Enter':
          e ? o() : l(0);
          break;
        case 'Space':
          e || l(0);
          break;
        case 'Escape':
          s((n = null));
          break;
        case 'Tab':
          s((n = null));
          break;
        case 'ArrowDown':
          u(e ? 1 : d || 0, c);
          break;
        case 'ArrowUp':
          u(e ? -1 : d || 0, c);
          break;
      }
    },
    init: i,
    navigate: u,
  };
}
function Rn({ items: n = [], children: e, onSelect: t, onReady: r }) {
  const s = W(),
    o = W(wi()),
    [i, l] = Q(null),
    a = W(i),
    u = (Se(it) || sn()).getGroup('core'),
    c = (f) => {
      f && f.stopPropagation(), t && t({ id: n[a.current]?.id });
    };
  V(() => {
    o.current.init(
      s.current,
      n,
      (f) => {
        l(f), (a.current = f);
      },
      c,
    );
  }, [n, s.current]),
    V(() => {
      r && r(o.current);
    }, []);
  const d = M(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null
    ? null
    : /* @__PURE__ */ p(Bt, {
        onCancel: d,
        children: /* @__PURE__ */ p('div', {
          className: 'wx-233fr7 wx-list',
          ref: s,
          onClick: c,
          onMouseMove: o.current.move,
          children: n.length
            ? n.map((f, g) =>
                /* @__PURE__ */ p(
                  'div',
                  {
                    className: `wx-233fr7 wx-item ${g === i ? 'wx-focus' : ''}`,
                    'data-id': f.id,
                    children: e ? Rs(e, { option: f }) : f.label,
                  },
                  f.id,
                ),
              )
            : /* @__PURE__ */ p('div', {
                className: 'wx-233fr7 wx-no-data',
                children: u('No data'),
              }),
        }),
      });
}
function xi({
  value: n = '',
  id: e,
  options: t = [],
  textOptions: r = null,
  textField: s = 'label',
  placeholder: o = '',
  title: i = '',
  disabled: l = !1,
  error: a = !1,
  clear: u = !1,
  children: c,
  onChange: d,
}) {
  const f = Yt(e),
    g = W(null),
    m = W(null),
    [h, x] = Ye(n),
    [w, y] = Q(!1),
    [k, b] = Q(''),
    D = W(null),
    S = W(!1),
    C = $(() => {
      if (w) return k;
      if (h || h === 0) {
        const Y = (r || t).find((U) => U.id === h);
        if (Y) return Y[s];
      }
      return '';
    }, [w, k, h, r, t, s]),
    R = $(
      () =>
        !C || !w
          ? t
          : t.filter((Y) => Y[s].toLowerCase().includes(C.toLowerCase())),
      [C, w, t, s],
    ),
    q = M(() => R.findIndex((Y) => Y.id === h), [R, h]),
    _ = M((Y) => {
      (g.current = Y.navigate), (m.current = Y.keydown);
    }, []),
    T = M(
      (Y, U) => {
        if (Y || Y === 0) {
          let ge = t.find((A) => A.id === Y);
          if ((y(!1), U && g.current(null), ge && h !== ge.id)) {
            const A = ge.id;
            x(A), d && d({ value: A });
          }
        }
        !S.current && U && D.current.focus();
      },
      [t, h, d],
    ),
    F = M(
      ({ id: Y }) => {
        T(Y, !0);
      },
      [T],
    ),
    j = M(
      (Y) => {
        Y && Y.stopPropagation(), x(''), y(!1), d && d({ value: '' });
      },
      [d],
    ),
    O = M(
      (Y) => {
        if (!t.length) return;
        if (Y === '' && u) {
          j();
          return;
        }
        let U = t.find((A) => A[s] === Y);
        U || (U = t.find((A) => A[s].toLowerCase().includes(Y.toLowerCase())));
        const ge = U ? U.id : h || t[0].id;
        T(ge, !1);
      },
      [t, s, u, h, T, j],
    ),
    J = M(() => {
      b(D.current.value), y(!0), R.length ? g.current(0) : g.current(null);
    }, [R.length, g]),
    K = M(() => {
      S.current = !0;
    }, []),
    ae = M(() => {
      (S.current = !1),
        setTimeout(() => {
          S.current || O(C);
        }, 200);
    }, [O, C]);
  return /* @__PURE__ */ re('div', {
    className: 'wx-1j11Jk wx-combo',
    onClick: () => g.current(q()),
    onKeyDown: (Y) => m.current(Y, q()),
    title: i,
    children: [
      /* @__PURE__ */ p('input', {
        className: 'wx-1j11Jk wx-input ' + (a ? 'wx-error' : ''),
        id: f,
        ref: D,
        value: C,
        disabled: l,
        placeholder: o,
        onFocus: K,
        onBlur: ae,
        onInput: J,
      }),
      u && !l && h
        ? /* @__PURE__ */ p('i', {
            className: 'wx-1j11Jk wx-icon wxi-close',
            onClick: j,
          })
        : /* @__PURE__ */ p('i', {
            className: 'wx-1j11Jk wx-icon wxi-angle-down',
          }),
      !l &&
        /* @__PURE__ */ p(Rn, {
          items: R,
          onReady: _,
          onSelect: F,
          children: ({ option: Y }) =>
            /* @__PURE__ */ p(He, { children: c ? c({ option: Y }) : Y[s] }),
        }),
    ],
  });
}
function on({
  value: n = '',
  id: e,
  readonly: t = !1,
  focus: r = !1,
  select: s = !1,
  type: o = 'text',
  placeholder: i = '',
  disabled: l = !1,
  error: a = !1,
  inputStyle: u = {},
  title: c = '',
  css: d = '',
  icon: f = '',
  clear: g = !1,
  onChange: m,
}) {
  const h = Yt(e),
    [x, w] = Ye(n),
    y = W(null),
    k = $(
      () => (f && d.indexOf('wx-icon-left') === -1 ? 'wx-icon-right ' + d : d),
      [f, d],
    ),
    b = $(() => f && d.indexOf('wx-icon-left') !== -1, [f, d]);
  V(() => {
    const q = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(q);
  }, [r, s]);
  const D = M(
      (q) => {
        const _ = q.target.value;
        w(_), m && m({ value: _, input: !0 });
      },
      [m],
    ),
    S = M((q) => m && m({ value: q.target.value }), [m]);
  function C(q) {
    q.stopPropagation(), w(''), m && m({ value: '' });
  }
  let R = o;
  return (
    o !== 'password' && o !== 'number' && (R = 'text'),
    V(() => {
      const q = S,
        _ = y.current;
      return (
        _.addEventListener('change', q),
        () => {
          _ && _.removeEventListener('change', q);
        }
      );
    }, [S]),
    /* @__PURE__ */ re('div', {
      className: `wx-hQ64J4 wx-text ${k} ${a ? 'wx-error' : ''} ${l ? 'wx-disabled' : ''} ${g ? 'wx-clear' : ''}`,
      children: [
        /* @__PURE__ */ p('input', {
          className: 'wx-hQ64J4 wx-input',
          ref: y,
          id: h,
          readOnly: t,
          disabled: l,
          placeholder: i,
          type: R,
          style: u,
          title: c,
          value: x,
          onInput: D,
        }),
        g && !l && x
          ? /* @__PURE__ */ re(He, {
              children: [
                /* @__PURE__ */ p('i', {
                  className: 'wx-hQ64J4 wx-icon wxi-close',
                  onClick: C,
                }),
                b &&
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
function yi({ date: n, type: e, part: t, onShift: r }) {
  const { calendar: s, formats: o } = Se(it).getRaw(),
    i = n.getFullYear(),
    l = $(() => {
      switch (e) {
        case 'month':
          return ht(o.monthYearFormat, s)(n);
        case 'year':
          return ht(o.yearFormat, s)(n);
        case 'duodecade': {
          const { start: u, end: c } = Es(i),
            d = ht(o.yearFormat, s);
          return `${d(new Date(u, 0, 1))} - ${d(new Date(c, 11, 31))}`;
        }
        default:
          return '';
      }
    }, [n, e, i, s, o]);
  function a() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ re('div', {
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
        onClick: a,
        children: l,
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
function kr({ onClick: n, children: e }) {
  return /* @__PURE__ */ p('button', {
    className: 'wx-3s8W4d wx-button',
    onClick: n,
    children: e,
  });
}
function vi({
  value: n,
  current: e,
  part: t = '',
  markers: r = null,
  onCancel: s,
  onChange: o,
}) {
  const i = (Se(it) || sn()).getRaw().calendar,
    l = (i.weekStart || 7) % 7,
    a = i.dayShort.slice(l).concat(i.dayShort.slice(0, l)),
    u = (b, D, S) =>
      new Date(
        b.getFullYear(),
        b.getMonth() + (D || 0),
        b.getDate() + (S || 0),
      );
  let c = t !== 'normal';
  function d(b) {
    const D = b.getDay();
    return D === 0 || D === 6;
  }
  function f() {
    const b = u(e, 0, 1 - e.getDate());
    return b.setDate(b.getDate() - ((b.getDay() - (l - 7)) % 7)), b;
  }
  function g() {
    const b = u(e, 1, -e.getDate());
    return b.setDate(b.getDate() + ((6 - b.getDay() + l) % 7)), b;
  }
  const m = W(0);
  function h(b, D) {
    D.timeStamp !== m.current &&
      ((m.current = D.timeStamp),
      D.stopPropagation(),
      o && o(new Date(new Date(b))),
      s && s());
  }
  const x = $(
      () =>
        t == 'normal'
          ? [n ? u(n).valueOf() : 0]
          : n
            ? [
                n.start ? u(n.start).valueOf() : 0,
                n.end ? u(n.end).valueOf() : 0,
              ]
            : [0, 0],
      [t, n],
    ),
    w = $(() => {
      const b = f(),
        D = g(),
        S = e.getMonth();
      let C = [];
      for (let R = b; R <= D; R.setDate(R.getDate() + 1)) {
        const q = {
          day: R.getDate(),
          in: R.getMonth() === S,
          date: R.valueOf(),
        };
        let _ = '';
        if (
          ((_ += q.in ? '' : ' wx-inactive'),
          (_ += x.indexOf(q.date) > -1 ? ' wx-selected' : ''),
          c)
        ) {
          const T = q.date == x[0],
            F = q.date == x[1];
          T && !F ? (_ += ' wx-left') : F && !T && (_ += ' wx-right'),
            q.date > x[0] && q.date < x[1] && (_ += ' wx-inrange');
        }
        if (((_ += d(R) ? ' wx-weekend' : ''), r)) {
          const T = r(R);
          T && (_ += ' ' + T);
        }
        C.push({ ...q, css: _ });
      }
      return C;
    }, [e, x, c, r]),
    y = W(null);
  let k = W({});
  return (
    (k.current.click = h),
    V(() => {
      Ms(y.current, k.current);
    }, []),
    /* @__PURE__ */ re('div', {
      children: [
        /* @__PURE__ */ p('div', {
          className: 'wx-398RBS wx-weekdays',
          children: a.map((b) =>
            /* @__PURE__ */ p(
              'div',
              { className: 'wx-398RBS wx-weekday', children: b },
              b,
            ),
          ),
        }),
        /* @__PURE__ */ p('div', {
          className: 'wx-398RBS wx-days',
          ref: y,
          children: w.map((b) =>
            /* @__PURE__ */ p(
              'div',
              {
                className: `wx-398RBS wx-day ${b.css} ${b.in ? '' : 'wx-out'}`,
                'data-id': b.date,
                children: b.day,
              },
              b.date,
            ),
          ),
        }),
      ],
    })
  );
}
function ki({
  value: n,
  current: e,
  part: t,
  onCancel: r,
  onChange: s,
  onShift: o,
}) {
  const [i, l] = Ye(n || /* @__PURE__ */ new Date()),
    [a, u] = Ye(e || /* @__PURE__ */ new Date()),
    c = Se(it).getRaw().calendar,
    d = c.monthShort || [],
    f = $(() => a.getMonth(), [a]),
    g = M(
      (x, w) => {
        if (x != null) {
          w.stopPropagation();
          const y = new Date(a);
          y.setMonth(x), u(y), o && o({ current: y });
        }
        t === 'normal' && l(new Date(a)), r && r();
      },
      [a, t, o, r],
    ),
    m = M(() => {
      const x = new Date(As(i, t) || a);
      x.setMonth(a.getMonth()), x.setFullYear(a.getFullYear()), s && s(x);
    }, [i, a, t, s]),
    h = M(
      (x) => {
        const w = x.target.closest('[data-id]');
        if (w) {
          const y = parseInt(w.getAttribute('data-id'), 10);
          g(y, x);
        }
      },
      [g],
    );
  return /* @__PURE__ */ re(He, {
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
        children: /* @__PURE__ */ p(kr, { onClick: m, children: c.done }),
      }),
    ],
  });
}
const Gn = 'wx-1XEF33',
  bi = ({
    value: n,
    current: e,
    onCancel: t,
    onChange: r,
    onShift: s,
    part: o,
  }) => {
    const i = Se(it).getRaw().calendar,
      [l, a] = Ye(e),
      [u, c] = Ye(n),
      d = $(() => l.getFullYear(), [l]),
      f = $(() => {
        const { start: w, end: y } = Es(d),
          k = [];
        for (let b = w; b <= y; ++b) k.push(b);
        return k;
      }, [d]),
      g = {
        click: m,
      };
    function m(w, y) {
      if (w) {
        y.stopPropagation();
        const k = new Date(l);
        k.setFullYear(w), a(k), s && s({ current: k });
      }
      o === 'normal' && c(new Date(l)), t && t();
    }
    function h() {
      const w = new Date(As(u, o) || l);
      w.setFullYear(l.getFullYear()), r && r(w);
    }
    const x = W(null);
    return (
      V(() => {
        x.current && Ms(x.current, g);
      }, []),
      /* @__PURE__ */ re(He, {
        children: [
          /* @__PURE__ */ p('div', {
            className: Gn + ' wx-years',
            ref: x,
            children: f.map((w, y) =>
              /* @__PURE__ */ p(
                'div',
                {
                  className:
                    Gn +
                    ` wx-year ${d == w ? 'wx-current' : ''} ${y === 0 ? 'wx-prev-decade' : ''} ${y === 11 ? 'wx-next-decade' : ''}`,
                  'data-id': w,
                  children: w,
                },
                y,
              ),
            ),
          }),
          /* @__PURE__ */ p('div', {
            className: Gn + ' wx-buttons',
            children: /* @__PURE__ */ p(kr, { onClick: h, children: i.done }),
          }),
        ],
      })
    );
  },
  Vr = {
    month: {
      component: vi,
      next: $i,
      prev: Si,
    },
    year: {
      component: ki,
      next: _i,
      prev: Ci,
    },
    duodecade: {
      component: bi,
      next: Ti,
      prev: Ni,
    },
  };
function Si(n) {
  return (n = new Date(n)), n.setMonth(n.getMonth() - 1), n;
}
function $i(n) {
  return (n = new Date(n)), n.setMonth(n.getMonth() + 1), n;
}
function Ci(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() - 1), n;
}
function _i(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() + 1), n;
}
function Ni(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() - 10), n;
}
function Ti(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() + 10), n;
}
function As(n, e) {
  let t;
  if (e === 'normal') t = n;
  else {
    const { start: r, end: s } = n;
    e === 'left' ? (t = r) : e == 'right' ? (t = s) : (t = r && s);
  }
  return t;
}
const Mi = ['clear', 'today'];
function Di(n) {
  if (n === 'done') return -1;
  if (n === 'clear') return null;
  if (n === 'today') return /* @__PURE__ */ new Date();
}
function Ei({
  value: n,
  current: e,
  onCurrentChange: t,
  part: r = 'normal',
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: l,
}) {
  const a = Se(it).getGroup('calendar'),
    [u, c] = Q('month'),
    d = Array.isArray(o) ? o : o ? Mi : [],
    f = (w, y) => {
      w.preventDefault(), l && l({ value: y });
    },
    g = () => {
      u === 'duodecade' ? c('year') : u === 'year' && c('month');
    },
    m = (w) => {
      const { diff: y, current: k } = w;
      if (y === 0) {
        u === 'month' ? c('year') : u === 'year' && c('duodecade');
        return;
      }
      if (y) {
        const b = Vr[u];
        t(y > 0 ? b.next(e) : b.prev(e));
      } else k && t(k);
      i && i();
    },
    h = (w) => {
      c('month'), l && l({ select: !0, value: w });
    },
    x = $(() => Vr[u].component, [u]);
  return /* @__PURE__ */ p('div', {
    className: `wx-2Gr4AS wx-calendar ${r !== 'normal' && r !== 'both' ? 'wx-part' : ''}`,
    children: /* @__PURE__ */ re('div', {
      className: 'wx-2Gr4AS wx-wrap',
      children: [
        /* @__PURE__ */ p(yi, { date: e, part: r, type: u, onShift: m }),
        /* @__PURE__ */ re('div', {
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
            u === 'month' &&
              d.length > 0 &&
              /* @__PURE__ */ p('div', {
                className: 'wx-2Gr4AS wx-buttons',
                children: d.map((w) =>
                  /* @__PURE__ */ p(
                    'div',
                    {
                      className: 'wx-2Gr4AS wx-button-item',
                      children: /* @__PURE__ */ p(kr, {
                        onClick: (y) => f(y, Di(w)),
                        children: a(w),
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
function In(n) {
  let { words: e = null, optional: t = !1, children: r } = n,
    s = Se(it);
  const o = $(() => {
    let i = s;
    return (
      (!i || !i.extend) && (i = Rt(nn)), e !== null && (i = i.extend(e, t)), i
    );
  }, [e, t, s]);
  return /* @__PURE__ */ p(it.Provider, { value: o, children: r });
}
function Kr(n, e, t, r) {
  if (!n || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), t(s);
  } else if (n.getDate() !== 1) {
    const s = new Date(n);
    s.setDate(1), t(s);
  }
}
const Ri = ['clear', 'today'];
function Ls({
  value: n,
  current: e,
  markers: t = null,
  buttons: r = Ri,
  onChange: s,
}) {
  const [o, i] = Ye(n),
    [l, a] = Ye(e);
  V(() => {
    Kr(l, o, a, !1);
  }, [o, l]);
  const u = M(
      (d) => {
        const f = d.value;
        f ? (i(new Date(f)), Kr(l, new Date(f), a, !0)) : i(null),
          s && s({ value: f ? new Date(f) : null });
      },
      [s, l],
    ),
    c = M(
      (d) => {
        a(d);
      },
      [a],
    );
  return l
    ? /* @__PURE__ */ p(In, {
        children: /* @__PURE__ */ p(Ei, {
          value: o,
          current: l,
          markers: t,
          buttons: r,
          onChange: u,
          onCurrentChange: c,
        }),
      })
    : null;
}
const Ii = ['clear', 'today'];
function Hi({
  value: n,
  id: e,
  disabled: t = !1,
  error: r = !1,
  width: s = 'unset',
  align: o = 'start',
  placeholder: i = '',
  format: l = '',
  buttons: a = Ii,
  css: u = '',
  title: c = '',
  editable: d = !1,
  clear: f = !1,
  onChange: g,
}) {
  const { calendar: m, formats: h } = (Se(it) || sn()).getRaw(),
    x = l || h?.dateFormat;
  let w = typeof x == 'function' ? x : ht(x, m);
  const [y, k] = Q(n),
    [b, D] = Q(!1);
  V(() => {
    k(n);
  }, [n]);
  function S() {
    D(!1);
  }
  function C(_) {
    const T = _ === y || (_ && y && _.valueOf() === y.valueOf()) || (!_ && !y);
    k(_), T || (g && g({ value: _ })), setTimeout(S, 1);
  }
  const R = $(() => (y ? w(y) : ''), [y, w]);
  function q({ value: _, input: T }) {
    if ((!d && !f) || T) return;
    let F = typeof d == 'function' ? d(_) : _ ? new Date(_) : null;
    (F = isNaN(F) ? y || null : F || null), C(F);
  }
  return (
    V(() => {
      const _ = S;
      return (
        window.addEventListener('scroll', _),
        () => window.removeEventListener('scroll', _)
      );
    }, []),
    /* @__PURE__ */ re('div', {
      className: 'wx-1lKOFG wx-datepicker',
      onClick: () => D(!0),
      children: [
        /* @__PURE__ */ p(on, {
          css: u,
          title: c,
          value: R,
          id: e,
          readonly: !d,
          disabled: t,
          error: r,
          placeholder: i,
          onInput: S,
          onChange: q,
          icon: 'wxi-calendar',
          inputStyle: {
            cursor: 'pointer',
            width: '100%',
            paddingRight:
              'calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)',
          },
          clear: f,
        }),
        b &&
          !t &&
          /* @__PURE__ */ p(Bt, {
            onCancel: S,
            width: s,
            align: o,
            autoFit: !!o,
            children: /* @__PURE__ */ p(Ls, {
              buttons: a,
              value: y,
              onChange: (_) => C(_.value),
            }),
          }),
      ],
    })
  );
}
function Ps({
  value: n = '',
  options: e = [],
  textOptions: t = null,
  placeholder: r = '',
  disabled: s = !1,
  error: o = !1,
  title: i = '',
  textField: l = 'label',
  clear: a = !1,
  children: u,
  onChange: c,
}) {
  const d = W(null),
    f = W(null);
  let [g, m] = Ye(n);
  function h(b) {
    (d.current = b.navigate), (f.current = b.keydown);
  }
  const x = $(
      () => (g || g === 0 ? (t || e).find((b) => b.id === g) : null),
      [g, t, e],
    ),
    w = M(
      ({ id: b }) => {
        (b || b === 0) && (m(b), d.current(null), c && c({ value: b }));
      },
      [m, c],
    ),
    y = M(
      (b) => {
        b.stopPropagation(), m(''), c && c({ value: '' });
      },
      [m, c],
    ),
    k = M(() => e.findIndex((b) => b.id === g), [e, g]);
  return /* @__PURE__ */ re('div', {
    className: `wx-2YgblL wx-richselect ${o ? 'wx-2YgblL wx-error' : ''} ${s ? 'wx-2YgblL wx-disabled' : ''} ${u ? '' : 'wx-2YgblL wx-nowrap'}`,
    title: i,
    onClick: () => d.current(k()),
    onKeyDown: (b) => f.current(b, k()),
    tabIndex: 0,
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-2YgblL wx-label',
        children: x
          ? u
            ? u(x)
            : x[l]
          : r
            ? /* @__PURE__ */ p('span', {
                className: 'wx-2YgblL wx-placeholder',
                children: r,
              })
            : ' ',
      }),
      a && !s && g
        ? /* @__PURE__ */ p('i', {
            className: 'wx-2YgblL wx-icon wxi-close',
            onClick: y,
          })
        : /* @__PURE__ */ p('i', {
            className: 'wx-2YgblL wx-icon wxi-angle-down',
          }),
      !s &&
        /* @__PURE__ */ p(Rn, {
          items: e,
          onReady: h,
          onSelect: w,
          children: ({ option: b }) => (u ? u(b) : b[l]),
        }),
    ],
  });
}
function or({
  id: n,
  label: e = '',
  css: t = '',
  min: r = 0,
  max: s = 100,
  value: o = 0,
  step: i = 1,
  title: l = '',
  disabled: a = !1,
  onChange: u,
}) {
  const c = Yt(n),
    [d, f] = Ye(o),
    g = W({ value: d, input: d }),
    m = $(() => ((d - r) / (s - r)) * 100 + '%', [d, r, s]),
    h = $(
      () =>
        a
          ? ''
          : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`,
      [a, m],
    );
  function x({ target: k }) {
    const b = k.value * 1;
    f(b),
      u &&
        u({
          value: b,
          previous: g.current.input,
          input: !0,
        }),
      (g.current.input = b);
  }
  function w({ target: k }) {
    const b = k.value * 1;
    f(b),
      u && u({ value: b, previous: g.current.value }),
      (g.current.value = b);
  }
  V(() => {
    f(o);
  }, [o]);
  const y = W(null);
  return (
    V(() => {
      if (y.current)
        return (
          y.current.addEventListener('change', w),
          () => {
            y.current && y.current.removeEventListener('change', w);
          }
        );
    }, [y, w]),
    /* @__PURE__ */ re('div', {
      className: `wx-2EDJ8G wx-slider ${t}`,
      title: l,
      children: [
        e &&
          /* @__PURE__ */ p('label', {
            className: 'wx-2EDJ8G wx-label',
            htmlFor: c,
            children: e,
          }),
        /* @__PURE__ */ p('div', {
          className: 'wx-2EDJ8G wx-inner',
          children: /* @__PURE__ */ p('input', {
            id: c,
            className: 'wx-2EDJ8G wx-input',
            type: 'range',
            min: r,
            max: s,
            step: i,
            disabled: a,
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
const Ai = ({
  id: n,
  value: e = 0,
  step: t = 1,
  min: r = 0,
  max: s = 1 / 0,
  error: o = !1,
  disabled: i = !1,
  readonly: l = !1,
  onChange: a,
}) => {
  const u = Yt(n),
    [c, d] = Ye(e),
    f = M(() => {
      if (l || c <= r) return;
      const x = c - t;
      d(x), a && a({ value: x });
    }, [c, l, r, t, a]),
    g = M(() => {
      if (l || c >= s) return;
      const x = c + t;
      d(x), a && a({ value: x });
    }, [c, l, s, t, a]),
    m = M(() => {
      if (!l) {
        const x = Math.round(Math.min(s, Math.max(c, r)) / t) * t,
          w = isNaN(x) ? Math.max(r, 0) : x;
        d(w), a && a({ value: w });
      }
    }, [l, c, s, r, t, a]),
    h = M(
      (x) => {
        const w = x.target.value * 1;
        d(w), a && a({ value: w, input: !0 });
      },
      [a],
    );
  return /* @__PURE__ */ re('div', {
    className: `wx-22t21n wx-counter ${i ? 'wx-disabled' : ''} ${l ? 'wx-readonly' : ''} ${o ? 'wx-error' : ''}`,
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
        id: u,
        type: 'text',
        className: 'wx-22t21n wx-input',
        disabled: i,
        readOnly: l,
        required: !0,
        value: c,
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
function Li({ notice: n = {} }) {
  function e() {
    n.remove && n.remove();
  }
  return /* @__PURE__ */ re('div', {
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
function Pi({ data: n = [] }) {
  return /* @__PURE__ */ p('div', {
    className: 'wx-3nwoO9 wx-notices',
    children: n.map((e) => /* @__PURE__ */ p(Li, { notice: e }, e.id)),
  });
}
function zi({
  title: n = '',
  buttons: e = ['cancel', 'ok'],
  header: t,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i,
}) {
  const l = (Se(it) || sn()).getGroup('core'),
    a = W(null);
  V(() => {
    a.current?.focus();
  }, []);
  function u(d) {
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
  function c(d, f) {
    const g = { event: d, button: f };
    f === 'cancel' ? i && i(g) : o && o(g);
  }
  return /* @__PURE__ */ p('div', {
    className: 'wx-1FxkZa wx-modal',
    ref: a,
    tabIndex: 0,
    onKeyDown: u,
    children: /* @__PURE__ */ re('div', {
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
                    children: /* @__PURE__ */ p(gt, {
                      type: `block ${d === 'ok' ? 'primary' : 'secondary'}`,
                      onClick: (f) => c(f, d),
                      children: l(d),
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
function Oi({ children: n }, e) {
  const [t, r] = Q(null),
    [s, o] = Q([]);
  return (
    Et(
      e,
      () => ({
        showModal: (i) => {
          const l = { ...i };
          return (
            r(l),
            new Promise((a, u) => {
              (l.resolve = (c) => {
                r(null), a(c);
              }),
                (l.reject = (c) => {
                  r(null), u(c);
                });
            })
          );
        },
        showNotice: (i) => {
          (i = { ...i }),
            (i.id = i.id || En()),
            (i.remove = () => o((l) => l.filter((a) => a.id !== i.id))),
            i.expire != -1 && setTimeout(i.remove, i.expire || 5100),
            o((l) => [...l, i]);
        },
      }),
      [],
    ),
    /* @__PURE__ */ re(He, {
      children: [
        n,
        t &&
          /* @__PURE__ */ p(zi, {
            title: t.title,
            buttons: t.buttons,
            onConfirm: t.resolve,
            onCancel: t.reject,
            children: t.message,
          }),
        /* @__PURE__ */ p(Pi, { data: s }),
      ],
    })
  );
}
Dt(Oi);
function Zt({
  label: n = '',
  position: e = '',
  css: t = '',
  error: r = !1,
  type: s = '',
  required: o = !1,
  children: i,
}) {
  const l = W(null),
    a = M(() => {
      if (l.current) return l.current;
      const u = En();
      return (l.current = u), u;
    }, []);
  return /* @__PURE__ */ p(vr.Provider, {
    value: a,
    children: /* @__PURE__ */ re('div', {
      className:
        `wx-2oVUvC wx-field wx-${e} ${t} ${r ? 'wx-error' : ''} ${o ? 'wx-required' : ''}`.trim(),
      children: [
        n &&
          /* @__PURE__ */ p('label', {
            className: 'wx-2oVUvC wx-label',
            htmlFor: l.current,
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
const zs = ({
    value: n = !1,
    type: e = '',
    icon: t = '',
    disabled: r = !1,
    iconActive: s = '',
    onClick: o,
    title: i = '',
    css: l = '',
    text: a = '',
    textActive: u = '',
    children: c,
    active: d,
    onChange: f,
  }) => {
    const [g, m] = Ye(n),
      h = $(() => (g ? 'pressed' : '') + (e ? ' ' + e : ''), [g, e]),
      x = M(
        (w) => {
          let y = !g;
          o && o(w), w.defaultPrevented || (m(y), f && f({ value: y }));
        },
        [g, o, f],
      );
    return g && d
      ? /* @__PURE__ */ p(gt, {
          title: i,
          text: (g && u) || a,
          css: l,
          type: h,
          icon: (g && s) || t,
          onClick: x,
          disabled: r,
          children: Rs(d, { value: g }),
        })
      : c
        ? /* @__PURE__ */ p(gt, {
            title: i,
            text: (g && u) || a,
            css: l,
            type: h,
            icon: (g && s) || t,
            onClick: x,
            disabled: r,
            children: c,
          })
        : /* @__PURE__ */ p(gt, {
            title: i,
            text: (g && u) || a,
            css: l,
            type: h,
            icon: (g && s) || t,
            onClick: x,
            disabled: r,
          });
  },
  jr = new Date(0, 0, 0, 0, 0);
function Wi({
  value: n = jr,
  id: e,
  title: t = '',
  css: r = '',
  disabled: s = !1,
  error: o = !1,
  format: i = '',
  onChange: l,
}) {
  let [a, u] = Ye(n);
  const { calendar: c, formats: d } = (Se(it) || sn()).getRaw(),
    f = c.clockFormat == 12,
    g = 23,
    m = 59,
    h = $(() => {
      const A = i || d?.timeFormat;
      return typeof A == 'function' ? A : ht(A, c);
    }, [i, d, c]),
    x = $(() => h(new Date(0, 0, 0, 1)).indexOf('01') != -1, [h]),
    w = (A, ee) => (A < 10 && ee ? `0${A}` : `${A}`).slice(-2),
    y = (A) => w(A, !0),
    k = (A) => `${A}`.replace(/[^\d]/g, '') || 0,
    b = (A) => (f && ((A = A % 12), A === 0) ? '12' : w(A, x)),
    D = M((A, ee) => ((A = k(A)), Math.min(A, ee)), []),
    [S, C] = Q(null),
    R = a || jr,
    q = D(R.getHours(), g),
    _ = D(R.getMinutes(), m),
    T = q > 12,
    F = b(q),
    j = y(_),
    O = $(() => h(new Date(0, 0, 0, q, _)), [q, _, h]),
    J = M(() => {
      C(!0);
    }, []),
    K = M(() => {
      const A = new Date(R);
      A.setHours(A.getHours() + (T ? -12 : 12)), u(A), l && l({ value: A });
    }, [R, T, l]),
    ae = M(
      ({ value: A }) => {
        if (R.getHours() === A) return;
        const ee = new Date(R);
        ee.setHours(A), u(ee), l && l({ value: ee });
      },
      [R, l],
    ),
    Y = M(
      ({ value: A }) => {
        if (R.getMinutes() === A) return;
        const ee = new Date(R);
        ee.setMinutes(A), u(ee), l && l({ value: ee });
      },
      [R, l],
    ),
    U = M(
      (A) => (
        (A = D(A, g)),
        f && ((A = A * 1), A === 12 && (A = 0), T && (A += 12)),
        A
      ),
      [D, f, T],
    ),
    ge = M(() => {
      C(null);
    }, []);
  return /* @__PURE__ */ re('div', {
    className: `wx-7f497i wx-timepicker ${o ? 'wx-7f497i wx-error' : ''} ${s ? 'wx-7f497i wx-disabled' : ''}`,
    onClick: s ? void 0 : J,
    style: { cursor: s ? 'default' : 'pointer' },
    children: [
      /* @__PURE__ */ p(on, {
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
        /* @__PURE__ */ p(Bt, {
          onCancel: ge,
          width: 'unset',
          children: /* @__PURE__ */ re('div', {
            className: 'wx-7f497i wx-wrapper',
            children: [
              /* @__PURE__ */ re('div', {
                className: 'wx-7f497i wx-timer',
                children: [
                  /* @__PURE__ */ p('input', {
                    className: 'wx-7f497i wx-digit',
                    value: F,
                    onChange: (A) => {
                      const ee = U(A.target.value);
                      ae({ value: ee });
                    },
                  }),
                  /* @__PURE__ */ p('div', {
                    className: 'wx-7f497i wx-separator',
                    children: ':',
                  }),
                  /* @__PURE__ */ p('input', {
                    className: 'wx-7f497i wx-digit',
                    value: j,
                    onChange: (A) => {
                      const ee = D(A.target.value, m);
                      Y({ value: ee });
                    },
                  }),
                  f &&
                    /* @__PURE__ */ p(zs, {
                      value: T,
                      onClick: K,
                      active: () =>
                        /* @__PURE__ */ p('span', { children: 'pm' }),
                      children: /* @__PURE__ */ p('span', { children: 'am' }),
                    }),
                ],
              }),
              /* @__PURE__ */ p(Zt, {
                width: 'unset',
                children: /* @__PURE__ */ p(or, {
                  label: c.hours,
                  value: q,
                  onChange: ae,
                  max: g,
                }),
              }),
              /* @__PURE__ */ p(Zt, {
                width: 'unset',
                children: /* @__PURE__ */ p(or, {
                  label: c.minutes,
                  value: _,
                  onChange: Y,
                  max: m,
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function Fi({ children: n }) {
  return /* @__PURE__ */ p('div', {
    className: 'wx-KgpO9N wx-modal',
    children: /* @__PURE__ */ p('div', {
      className: 'wx-KgpO9N wx-window',
      children: n,
    }),
  });
}
function Yi({ position: n = 'right', children: e, onCancel: t }) {
  const r = W(null);
  return (
    V(() => tn(r.current, t).destroy, []),
    /* @__PURE__ */ p('div', {
      ref: r,
      className: `wx-2L733M wx-sidearea wx-pos-${n}`,
      children: e,
    })
  );
}
function Os({ theme: n = '', target: e, children: t }) {
  const r = W(null),
    s = W(null),
    [o, i] = Q(null);
  r.current || (r.current = document.createElement('div'));
  const l = Se(rn);
  return (
    V(() => {
      i(e || Bi(s.current) || nt.getTopNode(s.current));
    }, [s.current]),
    /* @__PURE__ */ re(He, {
      children: [
        /* @__PURE__ */ p('span', { ref: s, style: { display: 'none' } }),
        s.current && o
          ? Vo(
              /* @__PURE__ */ p('div', {
                className: `wx-3ZWsT0 wx-${n || l}-theme`,
                children: t,
              }),
              o,
            )
          : null,
      ],
    })
  );
}
function Bi(n) {
  const e = nt.getTopNode(n);
  for (; n && n !== e && !n.getAttribute('data-wx-portal-root'); )
    n = n.parentNode;
  return n;
}
function Gi() {
  return /* @__PURE__ */ p(He, {});
}
function Ur(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(rn.Provider, {
    value: 'material',
    children: /* @__PURE__ */ re(He, {
      children: [
        t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-material-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ re(He, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(Gi, {}),
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
function Ws() {
  return /* @__PURE__ */ p(He, {});
}
function qr(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(rn.Provider, {
    value: 'willow',
    children: /* @__PURE__ */ re(He, {
      children: [
        t &&
          t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-willow-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ re(He, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(Ws, {}),
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
function Xr(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ p(rn.Provider, {
    value: 'willow-dark',
    children: /* @__PURE__ */ re(He, {
      children: [
        t &&
          t &&
          /* @__PURE__ */ p('div', {
            className: 'wx-theme wx-willow-dark-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ re(He, {
            children: [
              /* @__PURE__ */ p('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ p(Ws, {}),
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
yr(nt);
const Hn = {
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
var Vi = /* @__PURE__ */ new Date().valueOf(),
  Ki = () => Vi++;
function ji(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t],
      s = e[t];
    if (!An(r, s)) return !1;
  }
  return !0;
}
function An(n, e) {
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
      for (let r = n.length - 1; r >= 0; r--) if (!An(n[r], e[r])) return !1;
      return !0;
    } else return ji(n, e);
  return n === e;
}
function $n(n) {
  if (typeof n != 'object' || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map($n);
  const e = {};
  for (const t in n) e[t] = $n(n[t]);
  return e;
}
var Fs = class {
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
  Ys = /* @__PURE__ */ new Date().valueOf(),
  Ui = () => Ys++;
function br() {
  return 'temp://' + Ys++;
}
var Qr = class {
    constructor(n) {
      (this._data = n), (this._pool = /* @__PURE__ */ new Map());
      for (let e = 0; e < n.length; e++) {
        const t = n[e];
        this._pool.set(t.id, t);
      }
    }
    add(n) {
      (n = { id: Ui(), ...n }), this._data.push(n), this._pool.set(n.id, n);
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
  qi = class {
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
          l = r.get(i.parent);
        l && (l.data || (l.data = []), l.data.push(i));
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
            : Zr(r, t, e)
          : (r.data = [e]);
    }
    addAfter(e, t) {
      if (!t) return this.add(e, -1);
      const r = this.byId(t),
        s = this.byId(r.parent),
        o = wn(s, r.id) + 1;
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
        o = wn(s, r.id);
      (r = { ...r, ...t }),
        s && o >= 0 && ((s.data[o] = r), (s.data = [...s.data])),
        this._pool.set(r.id, r);
    }
    move(e, t, r) {
      const s = this._pool.get(e),
        o = t === 'child',
        i = this._pool.get(r),
        l = i.$level + (o ? 1 : 0);
      if (!s || !i) return;
      const a = this._pool.get(s.parent),
        u = o ? i : this._pool.get(i.parent);
      u.data || (u.data = []);
      const c = wn(a, s.id);
      Xi(a, c);
      const d = o ? u.data.length : wn(u, i.id) + (t === 'after' ? 1 : 0);
      if ((Zr(u, d, s), a.id === u.id && c === d)) return null;
      (s.parent = u.id),
        s.$level !== l && ((s.$level = l), this.setLevel(s, l + 1, !0)),
        this.update(s.id, s),
        this._clearBranch(a);
    }
    _clearBranch(e) {
      e.data &&
        !e.data.length &&
        (e.open && delete e.open, this.update(e.id, { data: null }));
    }
    toArray() {
      const e = [],
        t = this._pool.get(0).data;
      return t && Bs(t, e), e;
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
function Bs(n, e) {
  n.forEach((t) => {
    e.push(t), t.open === !0 && Bs(t.data, e);
  });
}
function Xi(n, e) {
  const t = [...n.data];
  t.splice(e, 1), (n.data = t);
}
function Zr(n, e, t) {
  const r = [...n.data];
  r.splice(e, 0, t), (n.data = r);
}
function wn(n, e) {
  return n?.data.findIndex((t) => t.id === e);
}
var Gs = 2,
  Qi = class {
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
      for (const l in e) {
        const a = t[l],
          u = r[l],
          c = e[l];
        if (
          a &&
          ((u === c && typeof c != 'object') ||
            (c instanceof Date &&
              u instanceof Date &&
              u.getTime() === c.getTime()))
        )
          continue;
        const d = s + (s ? '.' : '') + l;
        a
          ? (a.__parse(c, d, o, i) && (r[l] = c),
            i & Gs ? (o[d] = a.__trigger) : a.__trigger())
          : (c && c.__reactive
              ? (t[l] = this._wrapNested(c, c, d, o))
              : (t[l] = this._wrapWritable(c)),
            (r[l] = c)),
          (o[d] = o[d] || null);
      }
    }
    _wrapNested(e, t, r, s) {
      const o = this._wrapWritable(e);
      return (
        this._wrapProperties(e, o, t, r, s, 0),
        (o.__parse = (i, l, a, u) => (
          this._wrapProperties(i, o, t, l, a, u), !1
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
  Zi = class {
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
            const l = this._triggers.get(i) || [];
            l.push(o), this._triggers.set(i, l);
          }),
            o.out.forEach((i) => {
              const l = this._sources.get(i) || {};
              o.in.forEach((a) => (l[a] = !0)), this._sources.set(i, l);
            });
        }),
        this._routes.forEach((o) => {
          o.length = Math.max(...o.in.map((i) => Vs(i, this._sources, 1)));
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
      const t = this._setter(e, Gs);
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
          l = this._triggers.get(i);
        l &&
          l.forEach((a) => {
            t.indexOf(a) == -1 && t.push(a);
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
function Vs(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => Vs(o, e, t + 1));
  return Math.max(...s);
}
var Ji = class {
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
function el(n, e) {
  return typeof n == 'string'
    ? n.localeCompare(e, void 0, { numeric: !0 })
    : typeof n == 'object'
      ? n.getTime() - e.getTime()
      : (n ?? 0) - (e ?? 0);
}
function tl(n, e) {
  return typeof n == 'string'
    ? -n.localeCompare(e, void 0, { numeric: !0 })
    : typeof e == 'object'
      ? e.getTime() - n.getTime()
      : (e ?? 0) - (n ?? 0);
}
function nl({ key: n, order: e }) {
  const t = e === 'asc' ? el : tl;
  return (r, s) => t(r[n], s[n]);
}
function rl(n) {
  if (!n || !n.length) return;
  const e = n.map((t) => nl(t));
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
function sl(n, e) {
  return n.sort(rl(e));
}
let ol = class extends qi {
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
      e.data?.forEach((i, l) => {
        const a = this.copy(i, s.id, l);
        o = o.concat(a);
      }),
      o
    );
  }
  normalizeTask(e) {
    const t = e.id || br(),
      r = e.parent || 0,
      s = e.text || '',
      o = e.type || 'task',
      i = e.progress || 0,
      l = e.details || '',
      a = { ...e, id: t, text: s, parent: r, progress: i, type: o, details: l };
    return (
      e.segments && (a.segments = e.segments.map((u) => ({ ...u }))),
      e.segments && (a.segments = e.segments.map((u) => ({ ...u }))),
      a
    );
  }
  getSummaryId(e, t = !1) {
    const r = this._pool.get(e);
    if (!r.parent) return null;
    const s = this._pool.get(r.parent);
    if (t) {
      let o = e,
        i = this.getSummaryId(o);
      const l = [];
      for (; i; ) (o = i), l.push(i), (i = this.getSummaryId(o));
      return l;
    }
    return s.type === 'summary' ? s.id : this.getSummaryId(s.id);
  }
  sort(e) {
    (this._sort = e), e && this.sortBranch(e, 0);
  }
  sortBranch(e, t) {
    const r = this._pool.get(t || 0).data;
    r &&
      (sl(r, e),
      r.forEach((s) => {
        this.sortBranch(e, s.id);
      }));
  }
  serialize() {
    const e = [],
      t = this._pool.get(0).data;
    return t && Ks(t, e), e;
  }
  clear() {
    this.forEach((e) => {
      this.remove(e.id);
    });
  }
};
function Ks(n, e) {
  n.forEach((t) => {
    e.push(t), t.data && Ks(t.data, e);
  });
}
function Ce(n) {
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
function mt(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
function Ln(n, e) {
  const t = Ce(n);
  return isNaN(e) ? mt(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function Sr(n, e) {
  const t = Ce(n);
  if (isNaN(e)) return mt(n, NaN);
  if (!e) return t;
  const r = t.getDate(),
    s = mt(n, t.getTime());
  s.setMonth(t.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (t.setFullYear(s.getFullYear(), s.getMonth(), r), t);
}
function js(n, e) {
  const t = +Ce(n);
  return mt(n, t + e);
}
const Us = 6048e5,
  il = 864e5,
  qs = 6e4,
  Xs = 36e5;
function ll(n, e) {
  return js(n, e * Xs);
}
let al = {};
function Qs() {
  return al;
}
function Cn(n, e) {
  const t = Qs(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      t.weekStartsOn ??
      t.locale?.options?.weekStartsOn ??
      0,
    s = Ce(n),
    o = s.getDay(),
    i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Jt(n) {
  return Cn(n, { weekStartsOn: 1 });
}
function cl(n) {
  const e = Ce(n),
    t = e.getFullYear(),
    r = mt(n, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Jt(r),
    o = mt(n, 0);
  o.setFullYear(t, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Jt(o);
  return e.getTime() >= s.getTime()
    ? t + 1
    : e.getTime() >= i.getTime()
      ? t
      : t - 1;
}
function Nt(n) {
  const e = Ce(n);
  return e.setHours(0, 0, 0, 0), e;
}
function _n(n) {
  const e = Ce(n),
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
function Zs(n, e) {
  const t = Nt(n),
    r = Nt(e),
    s = +t - _n(t),
    o = +r - _n(r);
  return Math.round((s - o) / il);
}
function Jr(n) {
  const e = cl(n),
    t = mt(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), Jt(t);
}
function ul(n, e) {
  return js(n, e * qs);
}
function dl(n, e) {
  const t = e * 3;
  return Sr(n, t);
}
function Js(n, e) {
  const t = e * 7;
  return Ln(n, t);
}
function fl(n, e) {
  return Sr(n, e * 12);
}
function Qt(n, e) {
  const t = Ce(n),
    r = Ce(e),
    s = t.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function hl(n, e) {
  const t = Nt(n),
    r = Nt(e);
  return +t == +r;
}
function $r(n, e) {
  const t = Jt(n),
    r = Jt(e),
    s = +t - _n(t),
    o = +r - _n(r);
  return Math.round((s - o) / Us);
}
function gl(n, e) {
  const t = Ce(n),
    r = Ce(e),
    s = t.getFullYear() - r.getFullYear(),
    o = t.getMonth() - r.getMonth();
  return s * 12 + o;
}
function pl(n, e) {
  const t = Ce(n),
    r = Ce(e);
  return t.getFullYear() - r.getFullYear();
}
function Cr(n) {
  return (e) => {
    const t = (n ? Math[n] : Math.trunc)(e);
    return t === 0 ? 0 : t;
  };
}
function eo(n, e) {
  return +Ce(n) - +Ce(e);
}
function ml(n, e, t) {
  const r = eo(n, e) / Xs;
  return Cr(t?.roundingMethod)(r);
}
function wl(n, e, t) {
  const r = eo(n, e) / qs;
  return Cr(t?.roundingMethod)(r);
}
function to(n) {
  const e = Ce(n);
  return e.setHours(23, 59, 59, 999), e;
}
function _r(n) {
  const e = Ce(n),
    t = e.getMonth();
  return (
    e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e
  );
}
function xl(n) {
  const e = Ce(n);
  return +to(e) == +_r(e);
}
function no(n, e) {
  const t = Ce(n),
    r = Ce(e),
    s = Qt(t, r),
    o = Math.abs(gl(t, r));
  let i;
  if (o < 1) i = 0;
  else {
    t.getMonth() === 1 && t.getDate() > 27 && t.setDate(30),
      t.setMonth(t.getMonth() - s * o);
    let l = Qt(t, r) === -s;
    xl(Ce(n)) && o === 1 && Qt(n, r) === 1 && (l = !1),
      (i = s * (o - Number(l)));
  }
  return i === 0 ? 0 : i;
}
function yl(n, e, t) {
  const r = no(n, e) / 3;
  return Cr(t?.roundingMethod)(r);
}
function vl(n, e) {
  const t = Ce(n),
    r = Ce(e),
    s = Qt(t, r),
    o = Math.abs(pl(t, r));
  t.setFullYear(1584), r.setFullYear(1584);
  const i = Qt(t, r) === -s,
    l = s * (o - +i);
  return l === 0 ? 0 : l;
}
function en(n) {
  const e = Ce(n),
    t = e.getMonth(),
    r = t - (t % 3);
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function ro(n) {
  const e = Ce(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function kl(n) {
  const e = Ce(n),
    t = e.getFullYear();
  return e.setFullYear(t + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function bl(n) {
  const e = Ce(n),
    t = mt(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function Sl(n) {
  const e = Ce(n);
  return e.setMinutes(59, 59, 999), e;
}
function $l(n, e) {
  const t = Qs(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      t.weekStartsOn ??
      t.locale?.options?.weekStartsOn ??
      0,
    s = Ce(n),
    o = s.getDay(),
    i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function Nr(n) {
  const e = Ce(n),
    t = e.getMonth(),
    r = t - (t % 3) + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function so(n) {
  const e = Ce(n),
    t = e.getFullYear(),
    r = e.getMonth(),
    s = mt(n, 0);
  return s.setFullYear(t, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Cl(n) {
  const e = Ce(n).getFullYear();
  return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
function oo(n) {
  const e = Ce(n);
  return String(new Date(e)) === 'Invalid Date' ? NaN : Cl(e) ? 366 : 365;
}
function _l(n) {
  const e = Jr(n),
    t = +Jr(Js(e, 60)) - +e;
  return Math.round(t / Us);
}
function At(n, e) {
  const t = Ce(n),
    r = Ce(e);
  return +t == +r;
}
function Nl(n) {
  const e = Ce(n);
  return e.setMinutes(0, 0, 0), e;
}
function Tl(n, e, t) {
  const r = Cn(n, t),
    s = Cn(e, t);
  return +r == +s;
}
function Ml(n, e) {
  const t = Ce(n),
    r = Ce(e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function Dl(n, e) {
  const t = en(n),
    r = en(e);
  return +t == +r;
}
function El(n, e) {
  const t = Ce(n),
    r = Ce(e);
  return t.getFullYear() === r.getFullYear();
}
const ir = {
    year: vl,
    quarter: yl,
    month: no,
    week: $r,
    day: Zs,
    hour: ml,
    minute: wl,
  },
  Tt = {
    year: { quarter: 4, month: 12, week: _l, day: Rl, hour: Il },
    quarter: { month: 3, week: Hl, day: io, hour: Al },
    month: { week: Ll, day: Pl, hour: zl },
    week: { day: 7, hour: 168 },
    day: { hour: 24 },
    hour: { minute: 60 },
  };
function Rl(n) {
  return n ? oo(n) : 365;
}
function Il(n) {
  return oo(n) * 24;
}
function Hl(n) {
  const e = en(n),
    t = Ln(Nt(Nr(n)), 1);
  return $r(t, e);
}
function io(n) {
  if (n) {
    const e = en(n),
      t = Nr(n);
    return Zs(t, e) + 1;
  }
  return 91;
}
function Al(n) {
  return io(n) * 24;
}
function Ll(n) {
  if (n) {
    const e = ro(n),
      t = Ln(Nt(_r(n)), 1);
    return $r(t, e);
  }
  return 5;
}
function Pl(n) {
  return n ? so(n) : 30;
}
function zl(n) {
  return so(n) * 24;
}
function Nn(n, e, t) {
  const r = Tt[n][e];
  return r ? (typeof r == 'number' ? r : r(t)) : 1;
}
function Ol(n, e) {
  return n === e || !!(Tt[n] && Tt[n][e]);
}
const Tn = {
  year: fl,
  quarter: dl,
  month: Sr,
  week: Js,
  day: Ln,
  hour: ll,
  minute: ul,
};
function Tr(n, e, t) {
  if (e) {
    if (n === 'day') return (r, s) => e.getWorkingDays(s, r, !0);
    if (n === 'hour') return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => {
    const l = Tt[n]?.[o];
    return !l || typeof l == 'number' || co(n, r, s, t)
      ? Xt(n, r, s, o, i, t)
      : Wl(r, s, n, o, i, t);
  };
}
function Xt(n, e, t, r, s, o) {
  const i = r || n;
  let l = t,
    a = e;
  if (
    (s && ((l = pt(i, t, o)), (a = pt(i, e, o)), a < e && (a = ft(i)(a, 1))),
    n !== i)
  ) {
    const u = ir[i](a, l),
      c = Nn(n, i, t);
    return u / c;
  } else return ir[i](a, l);
}
function Wl(n, e, t, r, s, o) {
  let i = 0;
  const l = pt(t, e, o);
  if (e > l) {
    const u = Tn[t](l, 1);
    (i = Xt(t, u, e, r, void 0, o)), (e = u);
  }
  let a = 0;
  return (
    co(t, e, n, o) ||
      ((a = Xt(t, pt(t, n, o), e, void 0, void 0, o)), (e = Tn[t](e, a))),
    (a += i + Xt(t, n, e, r, void 0, o)),
    !a && s && (a = Xt(t, n, e, r, s, o)),
    a
  );
}
function ft(n, e) {
  if (e) {
    if (n === 'day') return (t, r) => e.addWorkingDays(t, r, !0);
    if (n === 'hour') return (t, r) => e.addWorkingHours(t, r);
  }
  return Tn[n];
}
const lo = {
  year: bl,
  quarter: en,
  month: ro,
  week: (n, e) => Cn(n, { weekStartsOn: e }),
  day: Nt,
  hour: Nl,
};
function pt(n, e, t) {
  const r = lo[n];
  return r ? r(e, t) : new Date(e);
}
const Fl = {
    year: kl,
    quarter: Nr,
    month: _r,
    week: (n, e) => $l(n, { weekStartsOn: e }),
    day: to,
    hour: Sl,
  },
  ao = {
    year: El,
    quarter: Dl,
    month: Ml,
    week: (n, e, t) => Tl(n, e, { weekStartsOn: t }),
    day: hl,
  };
function co(n, e, t, r) {
  const s = ao[n];
  return s ? s(e, t, r) : !1;
}
const Yl = {
    start: lo,
    end: Fl,
    add: Tn,
    isSame: ao,
    diff: ir,
    smallerCount: Tt,
  },
  es = (n) => (typeof n == 'function' ? n(/* @__PURE__ */ new Date()) : n);
function Bl(n, e) {
  for (const t in e) {
    if (t === 'smallerCount') {
      const r = Object.keys(e[t])
        .sort((l, a) => ct.indexOf(l) - ct.indexOf(a))
        .shift();
      let s = ct.indexOf(r);
      const o = e[t][r],
        i = es(o);
      for (let l = s - 1; l >= 0; l--) {
        const a = ct[l],
          u = es(Tt[a][r]);
        if (i <= u) break;
        s = l;
      }
      ct.splice(s, 0, n);
    }
    if (t === 'biggerCount') for (const r in e[t]) Tt[r][n] = e[t][r];
    else Yl[t][n] = e[t];
  }
}
function Vn(n, e = 1, t) {
  return (
    t.isWorkingDay(n) ||
      (n = e > 0 ? t.getNextWorkingDay(n) : t.getPreviousWorkingDay(n)),
    n
  );
}
function Gl(n) {
  return (e, t) => {
    if (t > 0) for (let r = 0; r < t; r++) e = n.getNextWorkingDay(e);
    if (t < 0) for (let r = 0; r > t; r--) e = n.getPreviousWorkingDay(e);
    return e;
  };
}
function Ot(n) {
  const e = /* @__PURE__ */ new Date();
  return n
    .map((t) => ({ item: t, len: ft(t.unit)(e, 1) }))
    .sort((t, r) => (t.len < r.len ? -1 : 1))[0].item;
}
const ct = ['year', 'quarter', 'month', 'week', 'day', 'hour'],
  lr = 50,
  ar = 300;
function Vl(n, e, t, r, s, o) {
  const i = !n || t,
    l = !e || t;
  let a = n,
    u = e,
    c = !1,
    d = !1;
  (i || l) &&
    (s?.forEach((g) => {
      i && (!a || g.start <= a) && ((a = g.start), (c = !0));
      const m = g.type === 'milestone' ? g.start : g.end;
      l && (!u || m >= u) && ((u = m), (d = !0));
    }),
    o?.forEach((g) => {
      i && (!a || g.start <= a) && ((a = g.start), (c = !0)),
        l && (!u || g.start >= u) && ((u = g.start), (d = !0));
    }));
  const f = ft(r || 'day');
  return (
    a
      ? c && (a = f(a, -1))
      : u
        ? (a = f(u, -30))
        : (a = /* @__PURE__ */ new Date()),
    u ? d && (u = f(u, 1)) : (u = f(a, 30)),
    { _start: a, _end: u }
  );
}
function Kl(n, e, t, r, s, o, i) {
  const l = Ot(i).unit,
    a = Tr(l, void 0, o),
    u = a(e, n, '', !0),
    c = pt(l, e, o);
  (n = pt(l, n, o)), (e = c < e ? ft(l)(c, 1) : c);
  const d = u * r,
    f = s * i.length,
    g = i.map((h) => {
      const x = [],
        w = ft(h.unit);
      let y = pt(h.unit, n, o);
      for (; y < e; ) {
        const k = w(y, h.step),
          b = y < n ? n : y,
          D = k > e ? e : k,
          S = a(D, b, '', !0) * r,
          C = typeof h.format == 'function' ? h.format(y, k) : h.format;
        let R = '';
        h.css && (R += typeof h.css == 'function' ? h.css(y) : h.css),
          x.push({ width: S, value: C, date: b, css: R, unit: h.unit }),
          (y = k);
      }
      return { cells: x, add: w, height: s };
    });
  let m = r;
  return (
    l !== t && (m = m / Nn(l, t)),
    {
      rows: g,
      width: d,
      height: f,
      diff: a,
      start: n,
      end: e,
      lengthUnit: t,
      minUnit: l,
      lengthUnitWidth: m,
    }
  );
}
function jl(n, e, t, r) {
  const s = typeof n == 'boolean' ? {} : n,
    o = ct.indexOf(Ot(t).unit);
  if ((typeof s.level > 'u' && (s.level = o), s.levels))
    s.levels.forEach((a) => {
      a.minCellWidth || (a.minCellWidth = xn(s.minCellWidth, lr)),
        a.maxCellWidth || (a.maxCellWidth = xn(s.maxCellWidth, ar));
    });
  else {
    const a = [],
      u = t.length || 1,
      c = xn(s.minCellWidth, lr),
      d = xn(s.maxCellWidth, ar);
    t.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }),
      ct.forEach((f, g) => {
        if (g === o) a.push({ minCellWidth: c, maxCellWidth: d, scales: t });
        else {
          const m = [];
          if (g)
            for (let h = u - 1; h > 0; h--) {
              const x = ct[g - h];
              x && m.push({ unit: x, step: 1, format: e[x] });
            }
          m.push({ unit: f, step: 1, format: e[f] }),
            a.push({ minCellWidth: c, maxCellWidth: d, scales: m });
        }
      }),
      (s.levels = a);
  }
  s.levels[s.level] || (s.level = 0);
  const i = s.levels[s.level],
    l = Math.min(Math.max(r, i.minCellWidth), i.maxCellWidth);
  return { zoom: s, scales: i.scales, cellWidth: l };
}
function Ul(n, e, t, r, s, o, i) {
  n.level = t;
  let l;
  const a = r.scales || r,
    u = Ot(a).unit,
    c = ql(u, s);
  if (e === -1) {
    const g = Nn(u, s);
    l = i * g;
  } else {
    const g = Nn(Ot(o).unit, u);
    l = Math.round(i / g);
  }
  const d = r.minCellWidth ?? lr,
    f = r.maxCellWidth ?? ar;
  return {
    scales: a,
    cellWidth: Math.min(f, Math.max(d, l)),
    lengthUnit: c,
    zoom: n,
  };
}
function ql(n, e) {
  const t = ct.indexOf(n),
    r = ct.indexOf(e);
  return r >= t ? (n === 'hour' ? 'hour' : 'day') : ct[r];
}
function xn(n, e) {
  return n ?? e;
}
const cr = 8,
  uo = 4,
  Xl = 3,
  ts = 7,
  Ql = cr + uo;
function fo(n, e, t) {
  (n.open || n.type != 'summary') &&
    n.data?.forEach((r) => {
      typeof r.$x > 'u' && go(r, t), (r.$x += e), fo(r, e, t);
    });
}
function ur(n, e, t, r) {
  const s = n.getSummaryId(e.id);
  if (s) {
    const o = n.byId(s),
      i = { xMin: 1 / 0, xMax: 0 };
    r && mo(o, t),
      ho(o, i, t),
      (o.$x = i.xMin),
      (o.$w = i.xMax - i.xMin),
      ur(n, o, t);
  }
}
function ho(n, e, t) {
  n.data?.forEach((r) => {
    if (!r.unscheduled) {
      typeof r.$x > 'u' && go(r, t);
      const s = r.type === 'milestone' && r.$h ? r.$h / 2 : 0;
      e.xMin > r.$x + s && (e.xMin = r.$x + s);
      const o = r.$x + r.$w - s;
      e.xMax < o && (e.xMax = o);
    }
    r.type !== 'summary' && ho(r, e, t);
  });
}
function go(n, e) {
  const { _scales: t, cellWidth: r } = e;
  (n.$x = Math.round(t.diff(n.start, t.start, t.lengthUnit) * r)),
    (n.$w = Math.round(t.diff(n.end, n.start, t.lengthUnit, !0) * r));
}
function Mr(n, e) {
  let t;
  e && (t = e.filter((s) => s.parent == n.id));
  const r = { data: t, ...n };
  if (r.data?.length)
    r.data.forEach((s) => {
      if (s.unscheduled && !s.data) return;
      (e || (s.type != 'summary' && s.data)) &&
        (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }),
        (s = Mr(s, e))),
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
function po(n, e, t) {
  return (
    dr(n, e, t, !1),
    t.splitTasks &&
      n.segments?.forEach((r) => {
        po(r, e, { ...t, baselines: !1 }), (r.$x -= n.$x);
      }),
    t.baselines && dr(n, e, t, !0),
    n
  );
}
function dr(n, e, t, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: l } = t,
    { start: a, end: u, lengthUnit: c, diff: d } = i,
    f = (r ? 'base_' : '') + 'start',
    g = (r ? 'base_' : '') + 'end',
    m = '$x' + (r ? '_base' : ''),
    h = '$y' + (r ? '_base' : ''),
    x = '$w' + (r ? '_base' : ''),
    w = '$h' + (r ? '_base' : ''),
    y = '$skip' + (r ? '_baseline' : '');
  let k = n[f],
    b = n[g];
  if (r && !k) {
    n[y] = !0;
    return;
  }
  n[f] < a && (n[g] < a || At(n[g], a)) ? (k = b = a) : n[f] > u && (k = b = u),
    (n[m] = Math.round(d(k, a, c) * s)),
    (n[x] = Math.round(d(b, k, c, !0) * s)),
    e !== null && (n[h] = r ? n.$y + n.$h + uo : o * e + Xl),
    (n[w] = r ? cr : l ? o - ts - Ql : o - ts),
    n.type === 'milestone' &&
      ((n[m] = n[m] - n.$h / 2),
      (n[x] = n.$h),
      r && ((n[h] = n.$y + cr), (n[x] = n[w] = n.$h))),
    t.unscheduledTasks && n.unscheduled && !r
      ? (n.$skip = !0)
      : (n[y] = At(k, b));
}
function mo(n, e, t) {
  n.data &&
    !n.$skip &&
    ((t = t || !n.open),
    n.data.forEach((r) => {
      t && dr(r, null, e, !1), mo(r, e, t);
    }));
}
const Kn = 20,
  Zl = function (n, e, t, r, s) {
    const o = Math.round(r / 2) - 3;
    if (!e || !t || !e.$y || !t.$y || e.$skip || t.$skip)
      return (n.$p = ''), (n.$pl = 0), n;
    let i = !1,
      l = !1;
    switch (n.type) {
      case 'e2s':
        l = !0;
        break;
      case 's2s':
        (i = !0), (l = !0);
        break;
      case 's2e':
        i = !0;
        break;
    }
    const a = i ? e.$x : e.$x + e.$w,
      u = s ? e.$y - 7 : e.$y,
      c = l ? t.$x : t.$x + t.$w,
      d = s ? t.$y - 7 : t.$y;
    if (a !== c || u !== d) {
      const f = ea(a, u + o, c, d + o, i, l, r / 2, s),
        g = ta(c, d + o, l);
      (n.$p = `${f},${g}`), (n.$pl = Jl(n.$p));
    }
    return n;
  };
function Jl(n) {
  const e = n.split(',').map(Number),
    t = [];
  for (let s = 0; s < e.length; s += 2)
    s + 1 < e.length && t.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < t.length - 1; s++) {
    const [o, i] = t[s],
      [l, a] = t[s + 1];
    r += Math.hypot(l - o, a - i);
  }
  return r;
}
function ea(n, e, t, r, s, o, i, l) {
  const a = Kn * (s ? -1 : 1),
    u = Kn * (o ? -1 : 1),
    c = n + a,
    d = t + u,
    f = [n, e, c, e, 0, 0, 0, 0, d, r, t, r],
    g = d - c;
  let m = r - e;
  const h = o === s;
  return (
    h ||
      (((d <= n + Kn - 2 && o) || (d > n && !o)) &&
        (m = l ? m - i + 6 : m - i)),
    (h && o && c > d) || (h && !o && c < d)
      ? ((f[4] = f[2] + g), (f[5] = f[3]), (f[6] = f[4]), (f[7] = f[5] + m))
      : ((f[4] = f[2]), (f[5] = f[3] + m), (f[6] = f[4] + g), (f[7] = f[5])),
    f.join(',')
  );
}
function ta(n, e, t) {
  return t
    ? `${n - 5},${e - 3},${n - 5},${e + 3},${n},${e}`
    : `${n + 5},${e + 3},${n + 5},${e - 3},${n},${e}`;
}
function wo(n) {
  return n.map((e) => {
    const t = e.id || br();
    return { ...e, id: t };
  });
}
const xo = ['start', 'end', 'duration'];
function na(n, e) {
  const { type: t, unscheduled: r } = n;
  return r || t === 'summary'
    ? !xo.includes(e)
    : t === 'milestone'
      ? !['end', 'duration'].includes(e)
      : !0;
}
function ra(n, e) {
  return typeof e == 'function'
    ? e
    : xo.includes(n)
      ? (typeof e == 'string' && (e = { type: e, config: {} }),
        e.config || (e.config = {}),
        e.type === 'datepicker' && (e.config.buttons = ['today']),
        (t, r) => (na(t, r.id) ? e : null))
      : e;
}
function sa(n) {
  return !n || !n.length
    ? []
    : n.map((e) => {
        const t = e.align || 'left',
          r = e.id === 'add-task',
          s = !r && e.flexgrow ? e.flexgrow : null,
          o = s ? 1 : e.width || (r ? 50 : 120),
          i = e.editor && ra(e.id, e.editor);
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
const yo = [
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
function Lt(n, e, t, r) {
  const { selected: s, tasks: o } = n.getState(),
    i = s.length,
    l = ['edit-task', 'paste-task', 'edit-task:task', 'edit-task:segment'],
    a = ['copy-task', 'cut-task'],
    u = [
      'copy-task',
      'cut-task',
      'delete-task',
      'indent-task:remove',
      'move-task:down',
    ],
    c = ['add-task', 'undo', 'redo'],
    d = ['indent-task:add', 'move-task:down', 'move-task:up'],
    f = { 'indent-task:remove': 2 },
    g = !i && c.includes(e),
    m = { parent: d.includes(e), level: f[e] };
  if (((t = t || (i ? s[s.length - 1] : null)), !(!t && !g))) {
    if (
      (e !== 'paste-task' && (n._temp = null),
      l.includes(e) || g || s.length === 1)
    )
      ns(n, e, t, r);
    else if (i) {
      const h = a.includes(e) ? s : oa(s, o, m);
      u.includes(e) && h.reverse();
      const x = n.getHistory();
      x && x.startBatch(),
        h.forEach((w, y) => ns(n, e, w, r, y)),
        x && x.endBatch();
    }
  }
}
function oa(n, e, t) {
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
function ns(n, e, t, r, s) {
  const o = n.exec ? n.exec : n.in.exec;
  let i = e.split(':')[0],
    l = e.split(':')[1];
  const a = t?.id || t;
  let u = { id: a },
    c = {},
    d = !1;
  if (i == 'copy-task' || i == 'cut-task') {
    n._temp || (n._temp = []), n._temp.push({ id: a, cut: i == 'cut-task' });
    return;
  } else if (i == 'paste-task') {
    if (n._temp && n._temp.length) {
      const f = n.getHistory();
      f && f.startBatch();
      const g = /* @__PURE__ */ new Map();
      if (
        (n._temp.forEach((m) => {
          const h = { id: m.id, target: a, mode: 'after' };
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
      ? ((c = {
          task: { type: 'task', text: r('New Task') },
          target: a,
          show: !0,
          select: !1,
        }),
        (u = {}),
        (d = !0))
      : i === 'edit-task'
        ? ((i = 'show-editor'),
          l === 'segment' && typeof t == 'object' && (c = t))
        : i === 'convert-task'
          ? ((i = 'update-task'), (c = { task: { type: l } }), (l = void 0))
          : i === 'indent-task' && (l = l === 'add');
  if (i === 'split-task' && typeof t == 'object') c = t;
  else if (i === 'delete-task' && l === 'segment' && typeof t == 'object') {
    const f = n.getTask(a),
      { segmentIndex: g } = t,
      m = f.segments.filter((h, x) => x !== g);
    o('update-task', { id: a, task: { segments: m } });
    return;
  }
  typeof l < 'u' && (c = { mode: l, ...c }),
    (u = { ...u, ...c }),
    o(i, u),
    d && o('select-task', { id: u.id, toggle: !!s });
}
function Dr(n, e) {
  return n.some((t) => (t.data ? Dr(t.data, e) : t.id === e));
}
const rs = (n, e) => ft(n, e),
  ia = (n, e) => Tr(n, e);
function fr(n, e) {
  Array.isArray(n) &&
    (n.forEach((t) => St(t, e)),
    n.forEach((t) => {
      if (t.type === 'summary' && !(t.start && t.end)) {
        const { start: r, end: s } = Mr(t, n);
        (t.start = r), (t.end = s), St(t, e);
      }
    }));
}
function St(n, e) {
  n.unscheduled || ss(n, e, !1), n.base_start && ss(n, e, !0);
}
function ss(n, e, t) {
  const { calendar: r, durationUnit: s } = e,
    o = s || 'day',
    [i, l, a] = vo(t);
  n.type === 'milestone'
    ? ((n[a] = 0), (n[l] = void 0))
    : n[i] &&
      (n[a]
        ? (n[l] = rs(o, r)(n[i], n[a]))
        : n[l]
          ? (n[a] = ia(o, r)(n[l], n[i]))
          : ((n[l] = rs(o, r)(n[i], 1)), (n[a] = 1)));
}
function vo(n) {
  return n
    ? ['base_start', 'base_end', 'base_duration']
    : ['start', 'end', 'duration'];
}
function os(n, e, t) {
  const [r, s, o] = vo(t);
  (e === o || e === r) && (n[s] = null),
    e === s &&
      ((n[o] = 0), n[r] && n[r] >= n[s] && ((n[s] = null), (n[o] = 1)));
}
function ko(n, e, t) {
  os(n, t, !1), n.base_start && os(n, t, !0), St(n, e);
}
class la extends Qi {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }),
      (this._router = new Zi(
        super.setState.bind(this),
        [
          {
            in: ['tasks', 'start', 'end', 'scales', 'autoScale', 'markers'],
            out: ['_start', '_end'],
            exec: (s) => {
              const {
                _end: o,
                _start: i,
                start: l,
                end: a,
                tasks: u,
                scales: c,
                autoScale: d,
                markers: f,
              } = this.getState();
              if (!l || !a || d) {
                const g = Ot(c).unit,
                  m = Vl(l, a, d, g, u, f);
                (m._end != o || m._start != i) && this.setState(m, s);
              } else this.setState({ _start: l, _end: a }, s);
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
                  _start: l,
                  _end: a,
                  cellWidth: u,
                  scaleHeight: c,
                  scales: d,
                  _weekStart: f,
                } = o,
                g = Ot(d).unit;
              Ol(g, i) || (i = g);
              const m = Kl(l, a, i, u, c, f, d);
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
                  tasks: l,
                  _scales: a,
                  baselines: u,
                  splitTasks: c,
                  unscheduledTasks: d,
                } = this.getState(),
                f = l
                  .toArray()
                  .map((g, m) =>
                    po(g, m, {
                      cellWidth: o,
                      cellHeight: i,
                      _scales: a,
                      baselines: u,
                      splitTasks: c,
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
                  cellHeight: l,
                  baselines: a,
                  criticalPath: u,
                } = this.getState(),
                c = i
                  .map((d) => {
                    const f = o.byId(d.source),
                      g = o.byId(d.target);
                    return Zl(d, f, g, l, a);
                  })
                  .toSorted((d, f) =>
                    u
                      ? !!d.$critical == !!f.$critical
                        ? f.$pl - d.$pl
                        : d.$critical
                          ? 1
                          : -1
                      : f.$pl - d.$pl,
                  )
                  .filter((d) => d !== null);
              this.setState({ _links: c }, s);
            },
          },
          {
            in: ['tasks', 'activeTask'],
            out: ['_activeTask'],
            exec: (s) => {
              const o = this.getState();
              let { activeTask: i } = o;
              i && typeof i == 'object' && (i = i.id);
              const l = o.tasks.byId(i);
              this.setState({ _activeTask: l || null }, s);
            },
          },
          {
            in: ['tasks', 'selected'],
            out: ['_selected'],
            exec: (s) => {
              const { tasks: o, selected: i } = this.getState(),
                l = i.map((a) => o.byId(a)).filter((a) => !!a);
              this.setState({ _selected: l }, s);
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
          tasks: (s) => new ol(s),
          links: (s) => new Qr(s),
          columns: (s) => sa(s),
        },
      ));
    const t = (this.in = new Ji());
    t.on('show-editor', (s) => {
      const { splitTasks: o } = this.getState();
      if (o) {
        const { id: i, segmentIndex: l } = s;
        if (i && (l || l === 0)) {
          this.setStateAsync({ activeTask: { id: i, segmentIndex: l } });
          return;
        }
      }
      this.setStateAsync({ activeTask: s.id });
    }),
      t.on(
        'select-task',
        ({ id: s, toggle: o, range: i, show: l, segmentIndex: a }) => {
          const {
            selected: u,
            _tasks: c,
            activeTask: d,
            splitTasks: f,
          } = this.getState();
          let g = !1,
            m;
          if (u.length && (o || i)) {
            const x = [...u];
            if (i) {
              const w = x[x.length - 1],
                y = c.findIndex((C) => C.id == w),
                k = c.findIndex((C) => C.id == s),
                b = Math.min(y, k),
                D = Math.max(y, k) + 1,
                S = c.slice(b, D).map((C) => C.id);
              y > k && S.reverse(),
                S.forEach((C) => {
                  x.includes(C) || x.push(C);
                });
            } else if (o) {
              const w = x.findIndex((y) => y == s);
              w === -1 ? x.push(s) : ((g = !0), x.splice(w, 1));
            }
            m = x;
          } else m = [s];
          const h = { selected: m };
          l && m.length && (h._scrollTask = { id: m[0], mode: l }),
            this.setStateAsync(h),
            !g &&
              d &&
              (d !== s || f) &&
              t.exec('show-editor', { id: s, ...(f && { segmentIndex: a }) });
        },
      ),
      t.on('delete-link', ({ id: s }) => {
        const { links: o } = this.getState();
        o.remove(s), this.setStateAsync({ links: o });
      }),
      t.on('update-link', (s) => {
        const { links: o } = this.getState(),
          i = s.id;
        let l = s.link;
        o.update(i, l),
          (l = o.byId(i)),
          !l.lag && l.lag !== 0 && delete l.lag,
          this.setStateAsync({ links: o }),
          (s.link = l);
      }),
      t.on('add-link', (s) => {
        const { link: o } = s,
          { links: i } = this.getState();
        !o.source ||
          !o.target ||
          (o.type || (o.type = 'e2s'),
          (o.id = o.id || br()),
          i.add(o),
          this.setStateAsync({ links: i }),
          (s.id = o.id),
          (s.link = i.byId(o.id)));
      });
    let r = null;
    t.on('move-task', (s) => {
      const { tasks: o } = this.getState();
      let { mode: i, target: l } = s;
      const { id: a, inProgress: u } = s,
        c = o.byId(a);
      if (
        (typeof u > 'u'
          ? (s.source = c.parent)
          : (s.source = r = r ?? c.parent),
        u === !1)
      ) {
        o.update(c.id, { $reorder: !1 }),
          this.setState({ tasks: o }),
          (r = null);
        return;
      }
      if (l === a || o.contains(a, l)) {
        s.skipProvider = !0;
        return;
      }
      if (i === 'up' || i === 'down') {
        const d = o.getBranch(a);
        let f = o.getIndexById(a);
        if (i === 'up') {
          const g = c.parent === 0;
          if (f === 0 && g) {
            s.skipProvider = !0;
            return;
          }
          (f -= 1), (i = 'before');
        } else if (i === 'down') {
          const g = f === d.length - 1,
            m = c.parent === 0;
          if (g && m) {
            s.skipProvider = !0;
            return;
          }
          (f += 1), (i = 'after');
        }
        if (((l = (d[f] && d[f].id) || c.parent), l)) {
          const g = o.getBranch(l);
          let m = o.getIndexById(l),
            h = g[m];
          if (h.data) {
            if (i === 'before') {
              if (h.parent === c.parent) {
                for (; h.data; )
                  h.open || t.exec('open-task', { id: h.id, mode: !0 }),
                    (h = h.data[h.data.length - 1]);
                l = h.id;
              }
            } else if (i === 'after') {
              let y;
              h.parent === c.parent
                ? ((y = h), (h = h.data[0]), (l = h.id), (i = 'before'))
                : g.length - 1 !== m &&
                  ((y = h),
                  (m += 1),
                  (h = g[m]),
                  c.$level > h.$level && h.data
                    ? ((y = h), (h = h.data[0]), (l = h.id), (i = 'before'))
                    : (l = h.id)),
                y && !y.open && t.exec('open-task', { id: y.id, mode: !0 });
            }
          }
          const x = o.getSummaryId(c.id);
          o.move(a, i, l);
          const w = o.getSummaryId(a);
          x != w &&
            (x && this.resetSummaryDates(x, 'move-task'),
            w && this.resetSummaryDates(w, 'move-task'));
        }
      } else {
        const d = o.byId(l);
        let f = d,
          g = !1;
        for (; f.$level > c.$level; )
          (f = o.byId(f.parent)), f.id === a && (g = !0);
        if (g) return;
        const m = o.getSummaryId(c.id);
        if ((o.move(a, i, l), i == 'child')) {
          let x = d;
          for (; x.id !== 0 && !x.open; )
            t.exec('open-task', { id: x.id, mode: !0 }), (x = o.byId(x.parent));
        }
        const h = o.getSummaryId(a);
        m != h &&
          (m && this.resetSummaryDates(m, 'move-task'),
          h && this.resetSummaryDates(h, 'move-task'));
      }
      u ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }),
        (s.target = l),
        (s.mode = i);
    }),
      t.on('drag-task', (s) => {
        const o = this.getState(),
          {
            tasks: i,
            _tasks: l,
            _selected: a,
            _scales: u,
            cellWidth: c,
            cellHeight: d,
          } = o,
          f = i.byId(s.id),
          { left: g, top: m, width: h, start: x, inProgress: w } = s,
          y = { _tasks: l, _selected: a };
        if (
          (typeof h < 'u' &&
            ((f.$w = h), ur(i, f, { _scales: u, cellWidth: c })),
          typeof g < 'u')
        ) {
          if (f.type === 'summary') {
            const k = g - f.$x;
            fo(f, k, { _scales: u, cellWidth: c });
          }
          (f.$x = g), ur(i, f, { _scales: u, cellWidth: c, cellHeight: d }, !x);
        }
        typeof m < 'u' && ((f.$y = m + 4), (f.$reorder = w)), this.setState(y);
      }),
      t.on('update-task', (s) => {
        const { id: o, segmentIndex: i, diff: l, eventSource: a } = s;
        let { task: u } = s;
        const {
            tasks: c,
            _scales: d,
            durationUnit: f,
            splitTasks: g,
            calendar: m,
          } = this.getState(),
          h = c.byId(o),
          x = { durationUnit: f, calendar: m };
        if (
          a === 'add-task' ||
          a === 'copy-task' ||
          a === 'move-task' ||
          a === 'update-task' ||
          a === 'delete-task' ||
          a === 'provide-data'
        ) {
          St(u, x), c.update(o, u);
          return;
        }
        const w = d.lengthUnit;
        let y = ft(w);
        const k = Tr(f, m);
        if (
          (l &&
            (u.start && (u.start = y(u.start, l)),
            !i &&
              i !== 0 &&
              (u.start && u.end
                ? (u.duration = h.duration)
                : (u.start
                    ? (u.end = h.end)
                    : ((u.end = y(u.end, l)),
                      (u.start = h.start),
                      (u.duration = k(u.end, u.start))),
                  k(u.end, u.start) || (u.duration = 1)))),
          (u.type = u.type ?? h.type),
          m && u.start && (u.start = Vn(u.start, l, m)),
          u.start &&
            u.end &&
            (!At(u.start, h.start) || !At(u.end, h.end)) &&
            u.type === 'summary' &&
            h.data?.length)
        ) {
          let D = l || k(u.start, h.start);
          m &&
            ((D =
              u.start > h.start ? k(u.start, h.start) : -k(h.start, u.start)),
            (y = Gl(m))),
            this.moveSummaryKids(
              h,
              (S) => ((S = y(S, D)), m ? Vn(S, l, m) : S),
              'update-task',
            );
        }
        u.start || (u.start = h.start),
          !u.end && !u.duration && (u.duration = h.duration),
          St(u, x),
          c.update(o, u),
          ((m && u.type === 'summary') ||
            (u.type === 'summary' && h.type !== 'summary')) &&
            this.resetSummaryDates(o, 'update-task', !0);
        const b = c.getSummaryId(o);
        b && this.resetSummaryDates(b, 'update-task'),
          this.setStateAsync({ tasks: c }),
          (s.task = c.byId(o));
      }),
      t.on('add-task', (s) => {
        const {
            tasks: o,
            _scales: i,
            unscheduledTasks: l,
            durationUnit: a,
            splitTasks: u,
            calendar: c,
          } = this.getState(),
          { target: d, mode: f, task: g, show: m, select: h = !0 } = s;
        !s.eventSource && l && (g.unscheduled = !0);
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
            let C;
            if (S?.length) {
              const R = S[S.length - 1];
              if (!R.$skip) {
                const q = new Date(R.start.valueOf());
                i.start <= q && (C = q);
              }
            }
            g.start = C || ft(a, c)(i.start, 1);
          }
          g.duration = 1;
        }
        c && (g.start = Vn(g.start, 1, c)),
          this.getState().baselines &&
            ((g.base_start = g.start), (g.base_duration = g.duration)),
          St(g, { durationUnit: a, calendar: c });
        const k = o.add(g, x),
          b = { tasks: o };
        if (w && m) {
          for (; w && w.id; )
            t.exec('open-task', { id: w.id, mode: !0 }), (w = o.byId(w.parent));
          b._scrollTask = { id: k.id, mode: m };
        }
        s.id = k.id;
        const D = o.getSummaryId(k.id);
        D && this.resetSummaryDates(D, 'add-task'),
          this.setStateAsync(b),
          (s.id = k.id),
          (s.task = k),
          h && t.exec('select-task', { id: k.id });
      }),
      t.on('delete-task', (s) => {
        const { id: o } = s,
          { tasks: i, links: l, selected: a } = this.getState();
        s.source = i.byId(o).parent;
        const u = i.getSummaryId(o),
          c = [o];
        i.eachChild((f) => c.push(f.id), o),
          l.filter((f) => !(c.includes(f.source) || c.includes(f.target)));
        const d = { tasks: i, links: l };
        a.includes(o) && (d.selected = a.filter((f) => f !== o)),
          i.remove(o),
          u && this.resetSummaryDates(u, 'delete-task'),
          this.setStateAsync(d);
      }),
      t.on('indent-task', ({ id: s, mode: o }) => {
        const { tasks: i } = this.getState();
        if (o) {
          const l = i.getBranch(s)[i.getIndexById(s) - 1];
          l && t.exec('move-task', { id: s, mode: 'child', target: l.id });
        } else {
          const l = i.byId(s),
            a = i.byId(l.parent);
          a &&
            a.parent !== null &&
            t.exec('move-task', { id: s, mode: 'after', target: l.parent });
        }
      }),
      t.on('copy-task', (s) => {
        const { id: o, target: i, mode: l, eventSource: a } = s;
        if (a === 'copy-task') return;
        const { tasks: u, links: c } = this.getState();
        if (u.contains(o, i)) {
          s.skipProvider = !0;
          return;
        }
        const d = u.getSummaryId(o),
          f = u.getSummaryId(i);
        let g = u.getIndexById(i);
        l == 'before' && (g -= 1);
        const m = u.byId(o),
          h = u.copy(m, u.byId(i).parent, g + 1);
        (s.source = s.id),
          (s.id = h[0][1]),
          m.lazy && (s.lazy = !0),
          d != f && f && this.resetSummaryDates(f, 'copy-task');
        let x = [];
        for (let w = 1; w < h.length; w++) {
          const [y, k] = h[w];
          c.forEach((b) => {
            if (b.source === y) {
              const D = { ...b };
              delete D.target, x.push({ ...D, source: k });
            } else if (b.target === y) {
              const D = { ...b };
              delete D.source, x.push({ ...D, target: k });
            }
          });
        }
        x = x.reduce((w, y) => {
          const k = w.findIndex((b) => b.id === y.id);
          return k > -1 ? (w[k] = { ...w[k], ...y }) : w.push(y), w;
        }, []);
        for (let w = 1; w < h.length; w++) {
          const [y, k] = h[w],
            b = u.byId(k);
          t.exec('copy-task', {
            source: y,
            id: k,
            lazy: !!b.lazy,
            eventSource: 'copy-task',
            target: b.parent,
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
          this.setStateAsync({ tasks: u });
      }),
      t.on('open-task', ({ id: s, mode: o }) => {
        const { tasks: i } = this.getState(),
          l = i.byId(s);
        l.lazy
          ? t.exec('request-data', { id: l.id })
          : (i.toArray().forEach((a) => (a.$y = 0)),
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
            durationUnit: l,
            calendar: a,
            splitTasks: u,
          } = this.getState(),
          c = o.byId(s.id);
        c.lazy ? ((c.lazy = !1), (c.open = !0)) : (c.data = []),
          fr(s.data.tasks, { durationUnit: l, calendar: a }),
          o.parse(s.data.tasks, s.id),
          c.type == 'summary' && this.resetSummaryDates(c.id, 'provide-data'),
          this.setStateAsync({
            tasks: o,
            links: new Qr(i.map((d) => d).concat(wo(s.data.links))),
          });
      }),
      t.on('zoom-scale', ({ dir: s, offset: o }) => {
        const {
            zoom: i,
            cellWidth: l,
            _cellWidth: a,
            scrollLeft: u,
          } = this.getState(),
          c = o + u,
          d = this.calcScaleDate(c);
        let f = l;
        s < 0 && (f = a || l);
        const g = f + s * 50,
          m = i.levels[i.level],
          h = s < 0 && l > m.maxCellWidth;
        if (g < m.minCellWidth || g > m.maxCellWidth || h) {
          if (!this.changeScale(i, s)) return;
        } else this.setState({ cellWidth: g, _cellWidth: g });
        const {
            _scales: x,
            _start: w,
            cellWidth: y,
            _weekStart: k,
          } = this.getState(),
          b = pt(x.minUnit, w, k),
          D = x.diff(d, b, 'hour');
        typeof o > 'u' && (o = y);
        let S = Math.round(D * y) - o;
        S < 0 && (S = 0),
          this.setState({ scrollLeft: S, _scaleDate: d, _zoomOffset: o });
      }),
      t.on('expand-scale', ({ minWidth: s }) => {
        const {
            _start: o,
            _scales: i,
            start: l,
            end: a,
            _end: u,
            cellWidth: c,
            _scaleDate: d,
            _zoomOffset: f,
          } = this.getState(),
          g = ft(i.minUnit);
        let m = i.width;
        if (l && a) {
          if (m < s && m) {
            const k = s / m;
            this.setState({ cellWidth: c * k });
          }
          return !0;
        }
        let h = 0;
        for (; m < s; ) (m += c), h++;
        const x = h && a ? -h : 0,
          w = l || g(o, x);
        let y = 0;
        if (d) {
          const k = i.diff(d, w, 'hour');
          y = Math.max(0, Math.round(k * c) - (f || 0));
        }
        this.setState({ _start: w, _end: a || g(u, h), scrollLeft: y });
      }),
      t.on('sort-tasks', ({ key: s, order: o, add: i }) => {
        const l = this.getState(),
          { tasks: a } = l;
        let u = l._sort;
        const c = { key: s, order: o };
        let d = u?.length || 0;
        d && i
          ? (u.forEach((f, g) => {
              f.key === s && (d = g);
            }),
            (u[d] = c))
          : (u = [c]),
          a.sort(u),
          this.setState({ _sort: u, tasks: a });
      }),
      t.on('hotkey', ({ key: s, event: o, eventSource: i }) => {
        switch (s) {
          case 'arrowup':
          case 'arrowdown': {
            const { selected: l, _tasks: a } = this.getState();
            o.preventDefault();
            const u = l.length;
            let c;
            if (
              (s === 'arrowup'
                ? (c = u ? this.getPrevRow(l[u - 1])?.id : a[a.length - 1]?.id)
                : (c = u ? this.getNextRow(l[u - 1])?.id : a[0]?.id),
              c)
            ) {
              const d = i === 'chart' ? 'xy' : !0;
              this.in.exec('select-task', { id: c, show: d });
            }
            break;
          }
          case 'ctrl+c': {
            Lt(this, 'copy-task', null, null);
            break;
          }
          case 'ctrl+x': {
            Lt(this, 'cut-task', null, null);
            break;
          }
          case 'ctrl+v': {
            Lt(this, 'paste-task', null, null);
            break;
          }
          case 'ctrl+d':
          case 'backspace': {
            o.preventDefault(), Lt(this, 'delete-task', null, null);
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
      const { cellWidth: o, scales: i, _scales: l } = this.getState(),
        a = Ul(e, t, r, s, l.lengthUnit, i, o);
      return (a._cellWidth = a.cellWidth), this.setState(a), !0;
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
        calendar: l,
      } = this.getState(),
      a = s.byId(e),
      u = a.data;
    if (u?.length && this.isScheduled(u)) {
      const c = Mr({ ...a, start: void 0, end: void 0, duration: void 0 });
      if (!At(a.start, c.start) || !At(a.end, c.end)) {
        r
          ? (St(c, { durationUnit: o, calendar: l }), s.update(e, c))
          : this.in.exec('update-task', {
              id: e,
              task: c,
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
    return ft('hour')(pt(t.minUnit, r, s), Math.floor(e / o));
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
function aa(n, e, t, r) {
  if (typeof document > 'u') return '';
  const s = document.createElement('canvas');
  {
    const o = ca(s, n, e, 1, t);
    ua(o, r, 0, n, 0, e);
  }
  return s.toDataURL();
}
function ca(n, e, t, r, s) {
  n.setAttribute('width', (e * r).toString()),
    n.setAttribute('height', (t * r).toString());
  const o = n.getContext('2d');
  return o.translate(-0.5, -0.5), (o.strokeStyle = s), o;
}
function ua(n, e, t, r, s, o) {
  n.beginPath(),
    n.moveTo(r, s),
    n.lineTo(r, o),
    e === 'full' && n.lineTo(t, o),
    n.stroke();
}
const Pn = [
  { id: 'task', label: 'Task' },
  { id: 'summary', label: 'Summary task' },
  { id: 'milestone', label: 'Milestone' },
];
function hr(n) {
  let e = [...bo];
  const t = n?.taskTypes || Pn,
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
function Er(n) {
  return n.map((e) => {
    switch ((e.data && Er(e.data), e.id)) {
      case 'add-task:before':
      case 'move-task:up':
        e.isDisabled = (t, r) => fa(t, r);
        break;
      case 'move-task:down':
        e.isDisabled = (t, r) => ha(t, r);
        break;
      case 'indent-task:add':
        e.isDisabled = (t, r) => ga(t, r) === t.parent;
        break;
      case 'indent-task:remove':
        e.isDisabled = (t) => da(t);
        break;
    }
    return e;
  });
}
function da(n) {
  return n.parent === 0;
}
function fa(n, e) {
  const { _tasks: t } = e;
  return t[0]?.id === n.id;
}
function ha(n, e) {
  const { _tasks: t } = e;
  return t[t.length - 1]?.id === n.id;
}
function ga(n, e) {
  const { _tasks: t } = e,
    r = t.findIndex((s) => s.id === n.id);
  return t[r - 1]?.id ?? n.parent;
}
function is(n) {
  return n && typeof n == 'object';
}
function pa(n) {
  return !n.selected || n.selected.length < 2;
}
const ma = (n) => (e) => e.type === n,
  bo = Er([
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
        isDisabled: ma(n.id),
      }),
    },
    {
      id: 'edit-task',
      text: 'Edit',
      icon: 'wxi-edit',
      isHidden: (n, e, t) => is(t),
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
      isHidden: (n, e, t) => pa(e) && is(t),
    },
  ]);
function gr(n) {
  return [...So];
}
const So = Er([
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
function jn(n) {
  return n.type === 'summary';
}
function Un(n) {
  return n.type === 'milestone';
}
function qn(n) {
  return typeof n.parent > 'u';
}
function Xn(n, e) {
  return e.unscheduledTasks && n.unscheduled;
}
function $o(n) {
  const e = Co.map((r) => ({ ...r })),
    t = e.find((r) => r.key == 'type');
  return (t.options = n?.taskTypes || Pn), e;
}
const Co = [
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
    { key: 'type', comp: 'select', label: 'Type', isHidden: (n) => qn(n) },
    {
      key: 'start',
      comp: 'date',
      label: 'Start date',
      isHidden: (n) => jn(n),
      isDisabled: Xn,
    },
    {
      key: 'end',
      comp: 'date',
      label: 'End date',
      isHidden: (n) => jn(n) || Un(n),
      isDisabled: Xn,
    },
    {
      key: 'duration',
      comp: 'counter',
      label: 'Duration',
      config: { min: 1 },
      isHidden: (n) => jn(n) || Un(n),
      isDisabled: Xn,
    },
    {
      key: 'progress',
      comp: 'slider',
      label: 'Progress',
      config: { min: 1, max: 100 },
      isHidden: (n) => Un(n) || qn(n),
    },
    { key: 'links', comp: 'links', label: '', isHidden: (n) => qn(n) },
  ],
  wt = Wt(null);
/* @__PURE__ */ new Date().valueOf();
function wa(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t],
      s = e[t];
    if (!ln(r, s)) return !1;
  }
  return !0;
}
function ln(n, e) {
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
      for (let t = n.length - 1; t >= 0; t--) if (!ln(n[t], e[t])) return !1;
      return !0;
    } else return wa(n, e);
  return n === e;
}
function pr(n) {
  if (typeof n != 'object' || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(pr);
  const e = {};
  for (const t in n) e[t] = pr(n[t]);
  return e;
}
var _o = 2,
  xa = class {
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
      for (const l in e) {
        const a = t[l],
          u = r[l],
          c = e[l];
        if (
          a &&
          ((u === c && typeof c != 'object') ||
            (c instanceof Date &&
              u instanceof Date &&
              u.getTime() === c.getTime()))
        )
          continue;
        const d = s + (s ? '.' : '') + l;
        a
          ? (a.__parse(c, d, o, i) && (r[l] = c),
            i & _o ? (o[d] = a.__trigger) : a.__trigger())
          : (c && c.__reactive
              ? (t[l] = this._wrapNested(c, c, d, o))
              : (t[l] = this._wrapWritable(c)),
            (r[l] = c)),
          (o[d] = o[d] || null);
      }
    }
    _wrapNested(e, t, r, s) {
      const o = this._wrapWritable(e);
      return (
        this._wrapProperties(e, o, t, r, s, 0),
        (o.__parse = (i, l, a, u) => (
          this._wrapProperties(i, o, t, l, a, u), !1
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
  ya = class {
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
            const l = this._triggers.get(i) || [];
            l.push(o), this._triggers.set(i, l);
          }),
            o.out.forEach((i) => {
              const l = this._sources.get(i) || {};
              o.in.forEach((a) => (l[a] = !0)), this._sources.set(i, l);
            });
        }),
        this._routes.forEach((o) => {
          o.length = Math.max(...o.in.map((i) => No(i, this._sources, 1)));
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
      const t = this._setter(e, _o);
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
          l = this._triggers.get(i);
        l &&
          l.forEach((a) => {
            t.indexOf(a) == -1 && t.push(a);
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
function No(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => No(o, e, t + 1));
  return Math.max(...s);
}
var va = class {
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
function ka(n) {
  return (e) => e[n];
}
function ba(n) {
  return (e, t) => (e[n] = t);
}
function Mt(n, e) {
  return (e.getter || ka(e.id))(n);
}
function ls(n, e, t) {
  return (e.setter || ba(e.id))(n, t);
}
function as(n, e) {
  const t = document.createElement('a');
  (t.href = URL.createObjectURL(n)),
    (t.download = e),
    document.body.appendChild(t),
    t.click(),
    document.body.removeChild(t);
}
function yt(n, e) {
  let t = Mt(n, e) ?? '';
  return (
    e.template && (t = e.template(t, n, e)),
    e.optionsMap &&
      (Array.isArray(t)
        ? (t = t.map((r) => e.optionsMap.get(r)))
        : (t = e.optionsMap.get(t))),
    typeof t > 'u' ? '' : t + ''
  );
}
function Sa(n, e) {
  const t = /\n|"|;|,/;
  let r = '';
  const s =
      e.rows ||
      `
`,
    o = e.cols || '	',
    i = n._columns,
    l = n.flatData;
  e.header !== !1 && i[0].header && (r = cs('header', i, r, o, s));
  for (let a = 0; a < l.length; a++) {
    const u = [];
    for (let c = 0; c < i.length; c++) {
      let d = yt(l[a], i[c]);
      t.test(d) && (d = '"' + d.replace(/"/g, '""') + '"'), u.push(d);
    }
    r += (r ? s : '') + u.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = cs('footer', i, r, o, s)), r;
}
function cs(n, e, t, r, s) {
  const o = /\n|"|;|,/;
  for (let i = 0; i < e[0][n].length; i++) {
    const l = [];
    for (let a = 0; a < e.length; a++) {
      let u = (e[a][n][i].text || '') + '';
      o.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), l.push(u);
    }
    t += (t ? s : '') + l.join(r);
  }
  return t;
}
function $a(n, e, t) {
  const r = [],
    s = [],
    o = [];
  let i = [];
  const l = n._columns,
    a = n.flatData,
    u = n._sizes;
  for (const d of l) o.push({ width: d.flexgrow ? u.columnWidth : d.width });
  let c = 0;
  e.header !== !1 &&
    l[0].header &&
    (us('header', l, r, s, c, e, t),
    (i = i.concat(u.headerRowHeights.map((d) => ({ height: d })))),
    (c += l[0].header.length));
  for (let d = 0; d < a.length; d++) {
    const f = [];
    for (let g = 0; g < l.length; g++) {
      const m = a[d],
        h = l[g],
        x = Mt(m, h) ?? '';
      let w = yt(m, h),
        y;
      e.cellStyle && (y = e.cellStyle(x, m, h)),
        e.cellTemplate && (w = e.cellTemplate(x, m, h) ?? w);
      const k = To(w, 2, y, t);
      f.push(k);
    }
    r.push(f), i.push({ height: u.rowHeight });
  }
  return (
    (c += a.length),
    e.footer !== !1 &&
      l[0].footer &&
      (us('footer', l, r, s, c, e, t),
      (i = i.concat(u.footerRowHeights.map((d) => ({ height: d }))))),
    { cells: r, merged: s, rowSizes: i, colSizes: o, styles: t }
  );
}
function us(n, e, t, r, s, o, i) {
  for (let l = 0; l < e[0][n].length; l++) {
    const a = [];
    for (let u = 0; u < e.length; u++) {
      const c = e[u][n][l],
        d = c.colspan ? c.colspan - 1 : 0,
        f = c.rowspan ? c.rowspan - 1 : 0;
      (d || f) &&
        r.push({
          from: { row: l + s, column: u },
          to: { row: l + s + f, column: u + d },
        });
      let g = c.text ?? '',
        m;
      o.headerCellStyle && (m = o.headerCellStyle(g, c, e[u], n)),
        o.headerCellTemplate && (g = o.headerCellTemplate(g, c, e[u], n) ?? g);
      let h;
      n == 'header'
        ? l == e[0][n].length - 1
          ? (h = 1)
          : (h = 0)
        : l
          ? (h = 4)
          : (h = 3);
      const x = To(g, h, m, i);
      a.push(x);
    }
    t.push(a);
  }
}
function To(n, e, t, r) {
  let s = e;
  if (
    (n &&
      n instanceof Date &&
      ((n = _a(n)), (t = t || {}), (t.format = t.format || 'dd/mm/yyyy')),
    t)
  ) {
    t = { ...r[e], ...t };
    const o = r.findIndex((i) => ln(i, t));
    o < 0 ? (r.push(t), (s = r.length - 1)) : (s = o);
  }
  return { v: n + '', s };
}
function Ca(n) {
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
    l = '0.5px solid ' + o[n],
    a = { verticalAlign: 'center', align: 'left' },
    u = {
      fontWeight: 'bold',
      color: i,
      background: r[n],
      ...a,
      borderBottom: l,
      borderRight: l,
    };
  return {
    cell: {
      color: i,
      background: t[n],
      borderBottom: s[n],
      borderRight: s[n],
      ...a,
    },
    header: { ...u },
    footer: { ...u },
  };
}
function _a(n) {
  return n
    ? 25569 + (n.getTime() - n.getTimezoneOffset() * 6e4) / (86400 * 1e3)
    : null;
}
const Na = 'portrait',
  Ta = 100,
  Ma = 'a4',
  Da = {
    a3: { width: 11.7, height: 16.5 },
    a4: { width: 8.27, height: 11.7 },
    letter: { width: 8.5, height: 11 },
  };
function Ea(n, e) {
  const t = [];
  let r = [],
    s = 0;
  const o = n.filter((l) => !l.hidden),
    i = Ra(e);
  return (
    o.forEach((l, a) => {
      s + l.width <= i
        ? ((s += l.width), r.push(l))
        : (r.length && t.push(r), (r = [l]), (s = l.width)),
        a === o.length - 1 && r.length && t.push(r);
    }),
    t
  );
}
function ds(n, e, t) {
  const r = [];
  return (
    n.forEach((s, o) => {
      const i = s[e];
      for (let l = 0; l < t.length; l++) {
        r[l] || (r[l] = []);
        const a = { ...i[l] };
        if (r[l][o] !== null) {
          if (!o && !a.rowspan && !a.colspan) {
            let u = 1,
              c = n[o + u][e][l],
              d = a.width;
            for (; !c.rowspan && !c.colspan; )
              u++, (c = n[o + u][e][l]), (d += c.width);
            (a.colspan = u), (a.width = d), (a.height = t[l]);
          }
          if ((r[l].push(a), !a.collapsed && a.colspan > 1)) {
            let u = a.colspan - 1;
            if (a.colspan + o > n.length) {
              const c = a.colspan - (a.colspan + o - n.length);
              (a.colspan = c),
                (a.width = n
                  .slice(o, o + u + 1)
                  .reduce((d, f) => d + f.width, 0)),
                c > 1 && (u = c - 1);
            }
            for (let c = 0; c < u; c++) r[l].push(null);
          }
          if (a.rowspan > 1) {
            const u = a.rowspan;
            for (let c = 1; c < u; c++)
              r[l + c] || (r[l + c] = []), r[l + c].push(null);
          }
        }
      }
      if (s.collapsed)
        for (let l = 0; l < r.length; l++) {
          const a = r[l],
            u = a[o];
          if (u && u.collapsed) {
            if (((a[o] = null), !l)) break;
          } else {
            const c = u || a.findLast((d) => d?.colspan >= 1);
            c && ((c.colspan = c.colspan - 1), (c.width = c.width - s.width));
          }
        }
    }),
    r.map((s) => s.filter((o) => o && o.colspan !== 0))
  );
}
function Ra(n) {
  const { mode: e, ppi: t, paper: r } = n,
    { width: s, height: o } = Da[r];
  return Ia(e === 'portrait' ? s : o, t);
}
function Ia(n, e) {
  return n * e;
}
function Ha(n = {}) {
  const { mode: e, ppi: t, paper: r } = n;
  return { mode: e || Na, ppi: t || Ta, paper: r || Ma };
}
function Mo(n, e) {
  return n.flexgrow
    ? `min-width:${e}px;width:auto`
    : `width:${n.width}px; max-width:${n.width}px; height:${n.height}px`;
}
function Aa(n, e, t) {
  let r = n[t.id];
  if (t.filter.type === 'richselect' && r) {
    const s =
      t.filter.config?.options || e.find(({ id: o }) => o == t.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? '';
}
const fs = ['resize-column', 'hide-column', 'update-cell'],
  La = ['delete-row', 'update-row', 'update-cell'],
  Pa = ['move-item'],
  za = ['resize-column', 'move-item'];
let Oa = class {
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
            i = Mt(s, o);
          return ln(i, e.value)
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
            i = o.findIndex((l) => l.id == t);
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
          if (za.includes(t)) {
            ((r.inProgress && !this.progress[t]) ||
              typeof r.inProgress != 'boolean') &&
              (Pa.includes(t) && this.setPrev('flatData'),
              fs.includes(t) && this.setPrev('columns')),
              (this.progress[t] = r.inProgress);
            return;
          }
          La.includes(t) && this.setPrev('data'),
            fs.includes(t) && this.setPrev('columns');
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
    this._previousValues[e] = pr(this.getState()[e]);
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
function Do() {
  let n = !0;
  return (n = !1), n;
}
function Eo(n, e) {
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
function Wa(n, e) {
  return -Eo(n, e);
}
function Fa(n, e) {
  if (typeof e.sort == 'function')
    return function (r, s) {
      const o = e.sort(r, s);
      return n === 'asc' ? o : -o;
    };
  const t = n === 'asc' ? Eo : Wa;
  return function (r, s) {
    return t(Mt(r, e), Mt(s, e));
  };
}
function Ya(n, e) {
  if (!n || !n.length) return;
  const t = n.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Fa(r.order, s);
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
const yn = 28,
  Ba = 20;
function Ga() {
  if (typeof document > 'u') return 'willow';
  const n = document.querySelector('[class^="wx"][class$="theme"]');
  return n ? n.className.substring(3, n.className.length - 6) : 'willow';
}
function Mn(n, e, t, r, s) {
  const o = document.createElement('div'),
    i = document.createElement('div'),
    l = document.body;
  s = s ? `${s}px` : 'auto';
  let a, u;
  (i.className = e),
    o.classList.add(`wx-${t}-theme`),
    (o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`),
    o.appendChild(i),
    l.appendChild(o),
    typeof n != 'object' && (n = [n]);
  for (let c = 0; c < n.length; c++) {
    i.innerText = n[c] + '';
    const d = o.getBoundingClientRect(),
      f = Math.ceil(d.width) + (r && r.length ? r[c] : 0),
      g = Math.ceil(d.height);
    (a = Math.max(a || 0, f)), (u = Math.max(u || 0, g));
  }
  return o.remove(), { width: a, height: u };
}
function hs(n, e, t, r, s) {
  const o = [];
  for (let i = 0; i < n.length; i++) {
    const l = n[i][e],
      a = l.length;
    for (let u = 0; u < a; u++) {
      const { text: c, vertical: d, collapsed: f, rowspan: g, css: m } = l[u];
      if (!c) {
        o[u] = Math.max(o[u] || 0, r);
        continue;
      }
      let h = 0;
      if (d && !f) {
        let x = `wx-measure-cell-${e}`;
        if (
          ((x += m ? ` ${m}` : ''),
          (h = Mn(c, x, s).width),
          (g > 1 || !l[u + 1]) && t > u + 1)
        ) {
          const w = g || t - u,
            y = o.slice(u, u + w).reduce((k, b) => k + b, 0);
          if (y < h) {
            const k = Math.ceil((h - y) / w);
            for (let b = u; b < u + w; b++) o[b] = (o[b] || r) + k;
          }
          continue;
        }
      }
      o[u] = Math.max(o[u] || r, h);
    }
  }
  return o;
}
function Va(n, e, t) {
  const r = [],
    s = [];
  let o = 'wx-measure-cell-body';
  o += n.css ? ` ${n.css}` : '';
  for (let i = 0; i < e.length; i++) {
    const l = e[i],
      a = yt(l, n);
    a &&
      (r.push(a),
      n.treetoggle
        ? s.push(
            e[i].$level * yn + (e[i].$count ? yn : 0) + (n.draggable ? yn : 0),
          )
        : n.draggable && s.push(yn));
  }
  return Mn(r, o, t, s).width;
}
function Ka(n, e) {
  const t = 'wx-measure-cell-header',
    r = n.sort ? Ba : 0;
  let s = n.header;
  if (typeof s == 'string') return Mn(s, t, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const l = s[i],
      a = typeof l == 'string' ? l : l.text,
      u = t + (typeof l == 'string' ? '' : ` ${l.css}`);
    let c = Mn(a, u, e).width;
    i === s.length - 1 && (c += r), (o = Math.max(o || 0, c));
  }
  return o;
}
const ja = {
  text: (n, e) =>
    n ? n.toString().toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e,
  richselect: (n, e) => (typeof e != 'number' && !e ? !0 : n == e),
};
function Ua(n) {
  return ja[n];
}
let qa = class extends xa {
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
      this._router = new ya(
        super.setState.bind(this),
        [
          {
            in: ['columns', 'sizes', '_skin'],
            out: ['_columns', '_sizes'],
            exec: (s) => {
              const { columns: o, sizes: i, _skin: l } = this.getState(),
                a = this.copyColumns(o),
                u = a.reduce((f, g) => Math.max(g.header.length, f), 0),
                c = a.reduce((f, g) => Math.max(g.footer.length, f), 0);
              a.forEach(this.setCollapsibleColumns);
              const d = this.normalizeSizes(a, i, u, c, l);
              for (let f = 0; f < a.length; f++)
                this.normalizeColumns(a, f, 'header', u, d),
                  this.normalizeColumns(a, f, 'footer', c, d);
              this.setState({ _columns: a, _sizes: d }, s);
            },
          },
          {
            in: ['data', 'tree', '_filterIds'],
            out: ['flatData', '_rowHeightFromData'],
            exec: (s) => {
              const {
                  data: o,
                  tree: i,
                  dynamic: l,
                  _filterIds: a,
                } = this.getState(),
                u = a && new Set(a),
                c = i
                  ? this.flattenRows(o, [], a)
                  : u
                    ? o.filter((f) => u.has(f.id))
                    : o,
                d = !l && c.some((f) => f.rowHeight);
              this.setState({ flatData: c, _rowHeightFromData: d }, s);
            },
          },
        ],
        { sizes: (s) => ({ ...t, ...s }) },
      );
      const r = (this.in = new va());
      r.on('close-editor', ({ ignore: s }) => {
        const { editor: o } = this.getState();
        o && (s || r.exec('update-cell', o), this.setState({ editor: null }));
      }),
        r.on('open-editor', ({ id: s, column: o }) => {
          let i = this.getState().editor;
          i && r.exec('close-editor', {});
          const l = this.getRow(s),
            a = o ? this.getColumn(o) : this.getNextEditor(l);
          if (a?.editor) {
            let u = a.editor;
            if ((typeof u == 'function' && (u = u(l, a)), !u)) return;
            (i = {
              column: a.id,
              id: s,
              value: Mt(l, a) ?? '',
              renderedValue: yt(l, a),
            }),
              typeof u == 'object' &&
                u.config &&
                ((i.config = u.config),
                u.config.options && (i.options = u.config.options)),
              a.options && !i.options && (i.options = a.options),
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
          const { select: l, _filterIds: a } = o,
            { row: u, before: c, after: d, select: f } = s;
          if (((s.id = u.id = s.id || u.id || vn()), c || d)) {
            const m = c || d,
              h = i.findIndex((x) => x.id === m);
            (i = [...i]), i.splice(h + (d ? 1 : 0), 0, s.row);
          } else i = [...i, s.row];
          const g = { data: i };
          a && (g._filterIds = [...a, s.id]),
            this.setState(g),
            !(typeof f == 'boolean' && !f) &&
              (f || l) &&
              r.exec('select-row', { id: u.id, show: !0 });
        }),
        r.on('delete-row', (s) => {
          const {
              data: o,
              selectedRows: i,
              focusCell: l,
              editor: a,
            } = this.getState(),
            { id: u } = s,
            c = { data: o.filter((d) => d.id !== u) };
          this.isSelected(u) && (c.selectedRows = i.filter((d) => d !== u)),
            a?.id == u && (c.editor = null),
            this.setState(c),
            l?.row === u &&
              this.in.exec('focus-cell', { eventSource: 'delete-row' });
        }),
        r.on('update-cell', (s) => {
          const o = this.getState();
          let { data: i } = o;
          i = [...i];
          const { tree: l } = o,
            { id: a, column: u, value: c } = s,
            d = this.getColumn(u);
          if (l) {
            const f = { ...this._branches[a] };
            ls(f, d, c);
            const g = this.updateTreeRow(f);
            f.$parent === 0 && (i = g);
          } else {
            const f = i.findIndex((m) => m.id == a),
              g = { ...i[f] };
            ls(g, d, c), (i[f] = g);
          }
          this.setState({ data: i });
        }),
        r.on('update-row', (s) => {
          let { data: o } = this.getState();
          const { id: i, row: l } = s,
            a = o.findIndex((u) => u.id == i);
          (o = [...o]), (o[a] = { ...o[a], ...l }), this.setState({ data: o });
        }),
        r.on(
          'select-row',
          ({ id: s, toggle: o, range: i, mode: l, show: a, column: u }) => {
            const c = this.getState(),
              { focusCell: d } = c;
            let { selectedRows: f } = c;
            if ((f.length || (i = o = !1), i)) {
              const { data: g } = this.getState();
              let m = g.findIndex((x) => x.id == f[f.length - 1]),
                h = g.findIndex((x) => x.id == s);
              m > h && ([m, h] = [h, m]),
                g.slice(m, h + 1).forEach((x) => {
                  f.indexOf(x.id) === -1 && f.push(x.id);
                });
            } else if (o && this.isSelected(s)) {
              if (l === !0) return;
              f = f.filter((g) => g !== s);
            } else if (o) {
              if (l === !1) return;
              f.push(s);
            } else f = [s];
            this.setState({ selectedRows: [...f] }),
              d?.row !== s &&
                this.in.exec('focus-cell', { eventSource: 'select-row' }),
              a && this.in.exec('scroll', { row: s, column: u });
          },
        ),
        this.in.on('focus-cell', (s) => {
          const { row: o, column: i, eventSource: l } = s,
            { _columns: a, split: u } = this.getState();
          o && i
            ? (this.setState({ focusCell: { row: o, column: i } }),
              l !== 'click' &&
                ((!u.left || a.findIndex((c) => c.id == s.column) >= u.left) &&
                (!u.right ||
                  a.findIndex((c) => c.id == s.column) < a.length - u.right)
                  ? this.in.exec('scroll', { row: o, column: i })
                  : this.in.exec('scroll', { row: o })))
            : this.setState({ focusCell: null });
        }),
        r.on('resize-column', (s) => {
          const { id: o, auto: i, maxRows: l, inProgress: a } = s;
          if (a === !1) return;
          let u = s.width || 0;
          const c = [...this.getState().columns],
            d = c.find((f) => f.id == o);
          if (i) {
            if (i == 'data' || i === !0) {
              const { flatData: f, _skin: g } = this.getState();
              let m = f.length;
              l && (m = Math.min(l, m));
              const h = f.slice(0, m);
              u = Va(d, h, g);
            }
            if (i == 'header' || i === !0) {
              const { _skin: f } = this.getState();
              u = Math.max(Ka(d, f), u);
            }
          }
          (d.width = Math.max(17, u)),
            delete d.flexgrow,
            this.setState({ columns: c });
        }),
        r.on('hide-column', (s) => {
          const { id: o, mode: i } = s,
            l = [...this.getState().columns],
            a = l.find((c) => c.id == o),
            u = l.reduce((c, d) => c + (d.hidden ? 0 : 1), 0);
          !i || u > 1
            ? ((a.hidden = !a.hidden), this.setState({ columns: l }))
            : (s.skipUndo = !0);
        }),
        r.on('sort-rows', (s) => {
          const { key: o, add: i, sort: l } = s,
            a = this.getState(),
            { columns: u, data: c, tree: d } = a;
          if (l) {
            const y = [...c];
            y.sort(l), this.setState({ data: y });
            return;
          }
          const { order: f = 'asc' } = s;
          let g = a.sortMarks;
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
            .sort((y, k) => g[y].index - g[k].index)
            .map((y) => ({ key: y, order: g[y].order }));
          this.setState({ sortMarks: g });
          const w = Ya(x, u);
          if (w) {
            const y = [...c];
            d ? this.sortTree(y, w) : y.sort(w), this.setState({ data: y });
          }
        }),
        r.on('filter-rows', (s) => {
          const { value: o, key: i, filter: l } = s;
          if (!Object.keys(s).length) {
            this.setState({ filterValues: {}, _filterIds: null });
            return;
          }
          const a = this.getState(),
            { data: u, tree: c } = a;
          let d = a.filterValues;
          const f = {};
          i && ((d = { ...d, [i]: o }), (f.filterValues = d));
          const g = l ?? this.createFilter(d);
          let m = [];
          c
            ? (m = this.filterTree(u, g, m))
            : u.forEach((h) => {
                g(h) && m.push(h.id);
              }),
            (f._filterIds = m),
            this.setState(f);
        }),
        r.on('collapse-column', (s) => {
          const { id: o, row: i, mode: l } = s,
            a = [...this.getState().columns],
            u = this.getColumn(o).header,
            c = Array.isArray(u) ? u[i] : u;
          typeof c == 'object' &&
            ((c.collapsed = l ?? !c.collapsed), this.setState({ columns: a }));
        }),
        r.on('move-item', (s) => {
          const { id: o, inProgress: i } = s;
          let { target: l, mode: a = 'after' } = s;
          const { data: u, flatData: c, tree: d } = this.getState(),
            f = c.findIndex((h) => h.id == o);
          let g;
          if (a === 'up' || a === 'down') {
            if (a === 'up') {
              if (f === 0) return;
              (g = f - 1), (a = 'before');
            } else if (a === 'down') {
              if (f === c.length - 1) return;
              (g = f + 1), (a = 'after');
            }
            l = c[g] && c[g].id;
          } else g = c.findIndex((h) => h.id == l);
          if (f === -1 || g === -1 || i === !1) return;
          let m;
          d ? (m = this.moveItem(o, l, u, a)) : (m = this.moveItem(o, l, u, a)),
            this.setState({ data: d ? this.normalizeTreeRows(m) : m });
        }),
        r.on('copy-row', (s) => {
          const { id: o, target: i, mode: l = 'after' } = s,
            a = this.getState(),
            { flatData: u, _filterIds: c } = a;
          let { data: d } = a;
          const f = this.getRow(o);
          if (!f) return;
          const g = { ...f, id: vn() };
          s.id = g.id;
          const m = u.findIndex((x) => x.id == i);
          if (m === -1) return;
          d.splice(m + (l === 'after' ? 1 : 0), 0, g), (d = [...d]);
          const h = { data: d };
          c && (h._filterIds = [...c, g.id]), this.setState(h);
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
              const l = s.format || 'csv',
                a = `${s.fileName || 'data'}.${l}`;
              if (l == 'csv') {
                const u = Sa(this.getState(), s.csv || {});
                s.download !== !1
                  ? as(new Blob(['\uFEFF' + u], { type: 'text/csv' }), a)
                  : (s.result = u),
                  o(!0);
              } else if (l == 'xlsx') {
                let u = s.excel?.styles;
                !u && u !== !1 && (u = Ca(this.getState()._skin));
                const c = u,
                  d = c
                    ? [
                        { ...c.header },
                        { ...(c.lastHeaderCell || c.header) },
                        { ...c.cell },
                        { ...(c.firstFooterCell || c.footer) },
                        { ...c.footer },
                      ]
                    : Array(5).fill({}),
                  {
                    cells: f,
                    merged: g,
                    rowSizes: m,
                    colSizes: h,
                    styles: x,
                  } = $a(this.getState(), s.excel || {}, d),
                  w =
                    s.cdn ||
                    'https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js';
                this.getXlsxWorker(w).then((y) => {
                  (y.onmessage = (k) => {
                    if (k.data.type == 'ready') {
                      const b = k.data.blob;
                      s.download !== !1 ? as(b, a) : (s.result = b), o(!0);
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
            l = this.searchRows(o, i);
          this.setState({ search: { value: o, rows: l } });
        }),
        r.on('hotkey', ({ key: s, event: o, isInput: i }) => {
          switch (s) {
            case 'arrowup': {
              const { flatData: l, focusCell: a, select: u } = this.getState();
              if ((o.preventDefault(), i)) return;
              const c = a ? a.column : this._getFirstVisibleColumn()?.id,
                d = a ? this.getPrevRow(a.row)?.id : l[l.length - 1]?.id;
              c &&
                d &&
                (this.in.exec('focus-cell', {
                  row: d,
                  column: c,
                  eventSource: 'key',
                }),
                u && this.in.exec('select-row', { id: d }));
              break;
            }
            case 'arrowdown': {
              const { flatData: l, focusCell: a, select: u } = this.getState();
              if ((o.preventDefault(), i)) return;
              const c = a ? a.column : this._getFirstVisibleColumn()?.id,
                d = a ? this.getNextRow(a.row)?.id : l[0]?.id;
              c &&
                d &&
                (this.in.exec('focus-cell', {
                  row: d,
                  column: c,
                  eventSource: 'key',
                }),
                u && this.in.exec('select-row', { id: d }));
              break;
            }
            case 'arrowright': {
              const { focusCell: l } = this.getState();
              if (i) return;
              if ((o.preventDefault(), l)) {
                const a = this.getNextColumn(l.column, !0)?.id;
                a &&
                  this.in.exec('focus-cell', {
                    row: l.row,
                    column: a,
                    eventSource: 'key',
                  });
              }
              break;
            }
            case 'arrowleft': {
              const { focusCell: l } = this.getState();
              if (i) return;
              if ((o.preventDefault(), l)) {
                const a = this.getPrevColumn(l.column, !0)?.id;
                a &&
                  this.in.exec('focus-cell', {
                    row: l.row,
                    column: a,
                    eventSource: 'key',
                  });
              }
              break;
            }
            case 'tab': {
              const { editor: l, focusCell: a, select: u } = this.getState();
              if (l) {
                o.preventDefault();
                const c = l.column;
                let d = l.id,
                  f = this.getNextEditor(this.getRow(d), this.getColumn(c));
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
                  u &&
                    !this.isSelected(d) &&
                    this.in.exec('select-row', { id: d }));
              } else a && this.in.exec('focus-cell', { eventSource: 'key' });
              break;
            }
            case 'shift+tab': {
              const { editor: l, focusCell: a, select: u } = this.getState();
              if (l) {
                o.preventDefault();
                const c = l.column;
                let d = l.id,
                  f = this.getPrevEditor(this.getRow(d), this.getColumn(c));
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
                  u &&
                    !this.isSelected(d) &&
                    this.in.exec('select-row', { id: d }));
              } else a && this.in.exec('focus-cell', { eventSource: 'key' });
              break;
            }
            case 'escape': {
              const { editor: l } = this.getState();
              l &&
                (this.in.exec('close-editor', { ignore: !0 }),
                this.in.exec('focus-cell', {
                  row: l.id,
                  column: l.column,
                  eventSource: 'key',
                }));
              break;
            }
            case 'f2': {
              const { editor: l, focusCell: a } = this.getState();
              !l &&
                a &&
                this.in.exec('open-editor', { id: a.row, column: a.column });
              break;
            }
            case 'enter': {
              const { focusCell: l, tree: a } = this.getState();
              if (!i && a && l && this.getColumn(l.column).treetoggle) {
                const u = this.getRow(l.row);
                if (!u.data) return;
                this.in.exec(u.open ? 'close-row' : 'open-row', {
                  id: l.row,
                  nested: !0,
                });
              }
              break;
            }
            case 'home': {
              const { editor: l, focusCell: a } = this.getState();
              if (!l && a) {
                o.preventDefault();
                const u = this._getFirstVisibleColumn()?.id;
                this.in.exec('focus-cell', {
                  row: a.row,
                  column: u,
                  eventSource: 'key',
                });
              }
              break;
            }
            case 'ctrl+home': {
              const {
                editor: l,
                focusCell: a,
                flatData: u,
                select: c,
              } = this.getState();
              if (!l && a) {
                o.preventDefault();
                const d = u[0]?.id,
                  f = this._getFirstVisibleColumn()?.id;
                d &&
                  f &&
                  (this.in.exec('focus-cell', {
                    row: d,
                    column: f,
                    eventSource: 'key',
                  }),
                  c &&
                    !this.isSelected(d) &&
                    this.in.exec('select-row', { id: d }));
              }
              break;
            }
            case 'end': {
              const { editor: l, focusCell: a } = this.getState();
              if (!l && a) {
                o.preventDefault();
                const u = this._getLastVisibleColumn()?.id,
                  c = a.row;
                this.in.exec('focus-cell', {
                  row: c,
                  column: u,
                  eventSource: 'key',
                });
              }
              break;
            }
            case 'ctrl+end': {
              const {
                editor: l,
                focusCell: a,
                flatData: u,
                select: c,
              } = this.getState();
              if (!l && a) {
                o.preventDefault();
                const d = u.at(-1).id,
                  f = this._getLastVisibleColumn()?.id;
                d &&
                  f &&
                  (this.in.exec('focus-cell', {
                    row: d,
                    column: f,
                    eventSource: 'key',
                  }),
                  c &&
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
            _sizes: l,
            flatData: a,
            dynamic: u,
            _rowHeightFromData: c,
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
          if (s.row && !u) {
            const h = a.findIndex((x) => x.id == s.row);
            h >= 0 &&
              (c
                ? ((f = a
                    .slice(0, h)
                    .reduce((x, w) => x + (w.rowHeight || l.rowHeight), 0)),
                  (m = a[h].rowHeight))
                : (f = l.rowHeight * h));
          }
          this.setState({
            scroll: { top: f, left: d, width: g, height: m || l.rowHeight },
          });
        }),
        r.on('print', (s) => {
          const o = Ha(s);
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
      e.hasOwnProperty('_skin') && !e._skin && (e._skin = Ga()),
        e.columns &&
          e.columns.forEach((t) => {
            t.options &&
              (t.optionsMap = new Map(t.options.map((r) => [r.id, r.label])));
          }),
        ln(this.getState().data, e.data) ||
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
        Do() &&
          (e.tree && ((e.undo = !1), (e.reorder = !1)),
          e.split?.right && (e.split.right = 0)),
        e.undo &&
          !this._historyManager &&
          (this._historyManager = new Oa(
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
          const l = this.toggleKids(i, t, r);
          e === 0 && (o = l);
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
            l = s === 'before' ? o : o + 1;
          if (i.data) {
            if (s === 'before') {
              const a = o > 0 ? e[o - 1] : null;
              return (
                a?.data && a.open
                  ? (e[o - 1] = { ...a, data: [...a.data, r] })
                  : e.splice(l, 0, r),
                !0
              );
            } else if (i.open)
              return (e[o] = { ...i, data: [r, ...i.data] }), !0;
          }
          return e.splice(l, 0, r), !0;
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
            const a = s.length - o;
            (s = s.slice(0, o + 1)), (s[o].rowspan = a);
          }
          const l = i.colspan;
          if (l) {
            const a = s[o + 1];
            let u = 1;
            a && a.colspan && !a.collapsed && (u = a.colspan);
            for (let c = u; c < l; c++) {
              const d = r[t + c];
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
      const l = i[r],
        a = o[`${r}RowHeights`];
      for (let u = 0; u < s; u++) {
        const c = l[u];
        (c.id = i.id),
          u === l.length - 1 &&
            (c.rowspan = c.rowspan ? Math.min(c.rowspan, s - u) : s - u);
        for (let d = 1; d < c.rowspan; d++) {
          l.splice(u + d, 0, { _hidden: !0 });
          for (let f = 1; f < c.colspan; f++) e[t + f][r].splice(u + d, 0, {});
        }
        if (c.rowspan) {
          const d = (c.rowspan === s ? a : a.slice(u, c.rowspan + u)).reduce(
            (f, g) => f + g,
            0,
          );
          (c.height = d), u + c.rowspan != s && c.height--;
        }
        if (c.colspan) {
          let d = i.width,
            f = i.flexgrow || 0;
          const g = c.colspan;
          for (let m = 1; m < g; m++) {
            const h = e[t + m];
            h &&
              (h.hidden
                ? (c.colspan -= 1)
                : h.flexgrow
                  ? (f += h.flexgrow)
                  : (d += h.width || o.columnWidth)),
              f ? (c.flexgrow = f) : (c.width = d);
          }
        } else (c.width = i.width), (c.flexgrow = i.flexgrow);
        r === 'header' &&
          c.filter &&
          typeof c.filter == 'string' &&
          (c.filter = { type: c.filter });
      }
      l.length > s && (l.length = s), (i[r] = l);
    }
    normalizeRows(e) {
      for (let t = 0; t < e.length; t++) e[t].id || (e[t].id = vn());
      return e;
    }
    normalizeTreeRows(e, t, r) {
      return (
        e.forEach((s) => {
          s.id || (s.id = vn()),
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
            .find((a) => a.id == s)
            .header.find((a) => a.filter).filter,
          l = e[s];
        r.push((a) => (o?.handler ? o.handler(a[s], l) : Ua(i)(a[s], l)));
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
        i = t ? o.filter((l) => t[l.id]) : o;
      return (
        s.forEach((l) => {
          const a = {};
          i.forEach((u) => {
            const c = yt(l, u);
            String(c).toLowerCase().includes(e) && (a[u.id] = !0);
          }),
            Object.keys(a).length && (r[l.id] = a);
        }),
        r
      );
    }
    normalizeSizes(e, t, r, s, o) {
      const i = hs(e, 'header', r, t.headerHeight, o),
        l = hs(e, 'footer', s, t.footerHeight, o),
        a = i.reduce((c, d) => c + d, 0),
        u = l.reduce((c, d) => c + d, 0);
      return {
        ...t,
        headerRowHeights: i,
        footerRowHeights: l,
        headerHeight: a,
        footerHeight: u,
      };
    }
  },
  Xa = /* @__PURE__ */ new Date().valueOf();
function vn() {
  return 'temp://' + Xa++;
}
function Qa(n, e = 'data-id') {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
/* @__PURE__ */ new Date().valueOf();
var Za = class {
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
  zt = [],
  Ja = {
    subscribe: (n) => {
      ec();
      const e = new Za();
      return (
        zt.push(e),
        n(e),
        () => {
          const t = zt.findIndex((r) => r === e);
          t >= 0 && zt.splice(t, 1);
        }
      );
    },
  },
  gs = !1;
function ec() {
  gs ||
    ((gs = !0),
    document.addEventListener('keydown', (n) => {
      if (
        zt.length &&
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
        for (let s = zt.length - 1; s >= 0; s--) {
          const o = zt[s],
            i = o.store.get(r) || o.store.get(t);
          i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
        }
      }
    }));
}
const tc = {
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
function Rr(n, { keys: e, exec: t }) {
  if (!e) return;
  function r(i) {
    const l = i.target;
    return (
      l.tagName === 'INPUT' ||
      l.tagName === 'TEXTAREA' ||
      Qa(l, 'data-header-id')?.classList.contains('wx-filter') ||
      !!l.closest('.wx-cell.wx-editor')
    );
  }
  const s = {};
  for (const i in e) {
    const l = e[i];
    typeof l < 'u' &&
      (typeof l == 'function'
        ? (s[i] = l)
        : l &&
          (s[i] = (a) => {
            const u = r(a);
            t({ key: i, event: a, isInput: u });
          }));
  }
  const o = Ja.subscribe((i) => {
    i.configure(s, n);
  });
  return {
    destroy: () => {
      o();
    },
  };
}
function nc(n, e) {
  let t = null;
  e.scroll.subscribe((r) => {
    if (!r || r === t) return;
    t = r;
    const { left: s, top: o, height: i, width: l } = r,
      a = e.getHeight(),
      u = e.getWidth(),
      c = e.getScrollMargin();
    if (o >= 0) {
      const d = n.scrollTop;
      o < d ? (n.scrollTop = o) : o + i > d + a && (n.scrollTop = o - a + i);
    }
    if (s >= 0) {
      const d = n.scrollLeft;
      s < d
        ? (n.scrollLeft = s)
        : s + l > d + u - c && (n.scrollLeft = s - u + l + c);
    }
  });
}
function $t(n) {
  const e = n.getAttribute('data-id'),
    t = parseInt(e);
  return isNaN(t) || t.toString() != e ? e : t;
}
function rc(n, e, t) {
  const r = n.getBoundingClientRect(),
    s = e.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - t.clientY,
    db: t.clientY - r.top,
  };
}
function ps(n) {
  return n && n.getAttribute('data-context-id');
}
const ms = 5;
function sc(n, e) {
  let t, r, s, o, i, l, a, u, c;
  function d(S) {
    (o = S.clientX),
      (i = S.clientY),
      (l = {
        ...rc(t, n, S),
        y: e.getTask(s).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function f(S) {
    (t = Qe(S)),
      ps(t) &&
        ((s = $t(t)),
        (c = setTimeout(() => {
          (u = !0), e && e.touchStart && e.touchStart(), d(S.touches[0]);
        }, 500)),
        n.addEventListener('touchmove', y),
        n.addEventListener('contextmenu', g),
        window.addEventListener('touchend', k));
  }
  function g(S) {
    if (u || c) return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 &&
      ((t = Qe(S)),
      ps(t) &&
        ((s = $t(t)),
        n.addEventListener('mousemove', w),
        window.addEventListener('mouseup', b),
        d(S)));
  }
  function h(S) {
    n.removeEventListener('mousemove', w),
      n.removeEventListener('touchmove', y),
      document.body.removeEventListener('mouseup', b),
      document.body.removeEventListener('touchend', k),
      (document.body.style.userSelect = ''),
      S &&
        (n.removeEventListener('mousedown', m),
        n.removeEventListener('touchstart', f));
  }
  function x(S) {
    const C = S.clientX - o,
      R = S.clientY - i;
    if (!r) {
      if (
        (Math.abs(C) < ms && Math.abs(R) < ms) ||
        (e && e.start && e.start({ id: s, e: S }) === !1)
      )
        return;
      (r = t.cloneNode(!0)),
        (r.style.pointerEvents = 'none'),
        r.classList.add('wx-reorder-task'),
        (r.style.position = 'absolute'),
        (r.style.left = l.left + 'px'),
        (r.style.top = l.top + 'px'),
        (t.style.visibility = 'hidden'),
        t.parentNode.insertBefore(r, t);
    }
    if (r) {
      const q = Math.round(Math.max(0, l.top + R));
      if (e && e.move && e.move({ id: s, top: q, detail: a }) === !1) return;
      const _ = e.getTask(s),
        T = _.$y;
      if (!l.start && l.y == T) return D();
      (l.start = !0), (l.y = _.$y - 4), (r.style.top = q + 'px');
      const F = document.elementFromPoint(S.clientX, S.clientY),
        j = Qe(F);
      if (j && j !== t) {
        const O = $t(j),
          J = j.getBoundingClientRect(),
          K = J.top + J.height / 2,
          ae = S.clientY + l.db > K && j.nextElementSibling !== t,
          Y = S.clientY - l.dt < K && j.previousElementSibling !== t;
        a?.after == O || a?.before == O
          ? (a = null)
          : ae
            ? (a = { id: s, after: O })
            : Y && (a = { id: s, before: O });
      }
    }
  }
  function w(S) {
    x(S);
  }
  function y(S) {
    u
      ? (S.preventDefault(), x(S.touches[0]))
      : c && (clearTimeout(c), (c = null));
  }
  function k() {
    (u = null), c && (clearTimeout(c), (c = null)), D();
  }
  function b() {
    D();
  }
  function D() {
    t && (t.style.visibility = ''),
      r &&
        (r.parentNode.removeChild(r),
        e && e.end && e.end({ id: s, top: l.top })),
      (s = t = r = l = a = null),
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
const oc = {
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
function Ro(n, e) {
  return n.map((t) => {
    const r = e(t);
    return t.data && t.data.length && (r.data = Ro(t.data, e)), r;
  });
}
function Io(n, e) {
  const t = [];
  return (
    n.forEach((r) => {
      if (r.data) {
        const s = Io(r.data, e);
        s.length && t.push({ ...r, data: s });
      } else e(r) && t.push(r);
    }),
    t
  );
}
let ic = 1;
function lc(n) {
  return Ro(n, (e) => {
    const t = { ...e, id: e.id || ic++ };
    return t.type && (t.comp = t.type), t;
  });
}
const Ho = {};
function ac(n) {
  return Ho[n] || n;
}
function cc(n, e) {
  Ho[n] = e;
}
function uc({ onClick: n, onShow: e, option: t }) {
  const r = W(null),
    s = M(() => {
      e(t.data ? t.id : !1, r.current);
    }, [e, t]),
    o = $(() => (t && t.comp ? ac(t.comp) : null), [t]);
  return /* @__PURE__ */ re('div', {
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
        : /* @__PURE__ */ re('span', {
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
function Ir({
  options: n,
  left: e = 0,
  top: t = 0,
  at: r = 'bottom',
  parent: s = null,
  mount: o = null,
  context: i = null,
  css: l = '',
  onClick: a,
}) {
  const [u, c] = Q(-1e4),
    [d, f] = Q(-1e4),
    [g, m] = Q(20),
    [h, x] = Q(),
    w = W(null),
    [y, k] = Q(!1),
    [b, D] = Q(null),
    S = M(() => {
      const T = Jo(w.current, s, r, e, t);
      T && (c(T.x), f(T.y), m(T.z), x(T.width));
    }, [s, r, e, t]);
  V(() => {
    o && o(S);
  }, []);
  const C = M(() => {
      k(!1);
    }, []),
    R = M(() => {
      a && a({ action: null, option: null });
    }, [a]),
    q = M((T, F) => {
      k(T), D(F);
    }, []),
    _ = $(() => lc(n), [n]);
  return (
    V(() => {
      S();
    }, [s, S]),
    V(() => {
      if (w.current) return tn(w.current, { callback: R, modal: !0 }).destroy;
    }, [R]),
    /* @__PURE__ */ p('div', {
      ref: w,
      'data-wx-menu': 'true',
      className: `wx-XMmAGqVx wx-menu ${l}`,
      style: {
        position: 'absolute',
        top: d + 'px',
        left: u + 'px',
        width: h,
        zIndex: g,
      },
      onMouseLeave: C,
      children: _.map((T) =>
        /* @__PURE__ */ re(
          Ts,
          {
            children: [
              T.comp === 'separator'
                ? /* @__PURE__ */ p('div', {
                    className: 'wx-XMmAGqVx wx-separator',
                  })
                : /* @__PURE__ */ p(uc, {
                    option: T,
                    onShow: q,
                    onClick: (F) => {
                      if (!T.data && !F.defaultPrevented) {
                        const j = {
                          context: i,
                          action: T,
                          option: T,
                          event: F,
                        };
                        T.handler && T.handler(j),
                          a && a(j),
                          F.stopPropagation();
                      }
                    },
                  }),
              T.data && y === T.id
                ? /* @__PURE__ */ p(Ir, {
                    css: l,
                    options: T.data,
                    at: 'right-overlap',
                    parent: b,
                    context: i,
                    onClick: a,
                  })
                : null,
            ],
          },
          T.id,
        ),
      ),
    })
  );
}
const dc = Dt(function (n, e) {
  const {
      options: t,
      at: r = 'bottom',
      resolver: s = null,
      dataKey: o = 'contextId',
      filter: i = null,
      css: l = '',
      children: a,
      onClick: u,
    } = n,
    [c, d] = Q(null),
    [f, g] = Q(null),
    [m, h] = Q(0),
    [x, w] = Q(0),
    y = $(() => (c !== null && i ? Io(t, (S) => i(S, c)) : t), [c, i, t]),
    k = M(
      (S) => {
        g(null), u && u(S);
      },
      [u],
    ),
    b = M((S, C) => {
      let R = null;
      for (; S && S.dataset && !R; ) (R = S.dataset[C]), (S = S.parentNode);
      return R ? Ft(R) : null;
    }, []),
    D = M(
      (S, C) => {
        if (!S) {
          g(null);
          return;
        }
        if (S.defaultPrevented) return;
        const R = S.target;
        if (R && R.dataset && R.dataset.menuIgnore) return;
        h(S.clientX + 1), w(S.clientY + 1);
        let q = typeof C < 'u' ? C : b(R, o);
        (s && ((q = s(q, S)), !q)) || (d(q), g(R), S.preventDefault());
      },
      [o, b, s],
    );
  return (
    Et(e, () => ({ show: D }), [D]),
    /* @__PURE__ */ re(He, {
      children: [
        a
          ? /* @__PURE__ */ p('span', {
              onClick: D,
              'data-menu-ignore': 'true',
              children: typeof a == 'function' ? a() : a,
            })
          : null,
        f
          ? /* @__PURE__ */ p(Os, {
              children: /* @__PURE__ */ p(
                Ir,
                {
                  css: l,
                  at: r,
                  top: x,
                  left: m,
                  parent: f,
                  context: c,
                  onClick: k,
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
Dt(function (n, e) {
  const {
      options: t,
      at: r = 'bottom',
      css: s = '',
      children: o,
      onClick: i,
    } = n,
    [l, a] = Q(null);
  function u(m) {
    a(null), i && i(m);
  }
  const c = M((m) => {
    a(m.target), m.preventDefault();
  }, []);
  Et(e, () => ({ show: c }), [c]);
  function d(m) {
    let h = m.target;
    for (; !h.dataset.menuIgnore; ) a(h), (h = h.parentNode);
  }
  const f = W(0),
    g = W(l);
  return (
    V(() => {
      g.current !== l && ((f.current += 1), (g.current = l));
    }, [l]),
    /* @__PURE__ */ re(He, {
      children: [
        /* @__PURE__ */ p('span', {
          onClick: d,
          'data-menu-ignore': 'true',
          children: o,
        }),
        l
          ? /* @__PURE__ */ p(Os, {
              children: /* @__PURE__ */ p(
                Ir,
                {
                  css: s,
                  at: r,
                  parent: l,
                  options: t,
                  onClick: u,
                },
                f.current,
              ),
            })
          : null,
      ],
    })
  );
});
const Ao = Dt(function (n, e) {
    const {
        options: t,
        at: r = 'bottom',
        resolver: s = null,
        dataKey: o = 'contextId',
        filter: i = null,
        css: l = '',
        children: a,
        onClick: u,
      } = n,
      c = W(null),
      d = M((f, g) => {
        c.current.show(f, g);
      }, []);
    return (
      Et(
        e,
        () => ({
          show: d,
        }),
        [d],
      ),
      /* @__PURE__ */ re(He, {
        children: [
          a
            ? /* @__PURE__ */ p('span', {
                onContextMenu: d,
                'data-menu-ignore': 'true',
                children: a,
              })
            : null,
          /* @__PURE__ */ p(dc, {
            css: l,
            at: r,
            options: t,
            resolver: s,
            dataKey: o,
            filter: i,
            ref: c,
            onClick: u,
          }),
        ],
      })
    );
  }),
  Lo = {};
function fc(n) {
  return Lo[n] || n;
}
function Gt(n, e) {
  Lo[n] = e;
}
function Po({ menu: n = !1 }) {
  return /* @__PURE__ */ p('div', {
    className: `wx-z1qpqrvg wx-separator${n ? '-menu' : ''}`,
    children: ' ',
  });
}
function zo() {
  return /* @__PURE__ */ p('div', { className: 'wx-1IhFzpJV wx-spacer' });
}
const hc = ({ key: n, text: e, ...t }) => t;
function Hr(n) {
  const { item: e = {}, menu: t = !1, values: r, onClick: s, onChange: o } = n,
    i = $(() => fc(e.comp || 'label'), [e]),
    l = M(() => {
      e && e.handler && e.handler(e), s && s({ item: e });
    }, [e, s]),
    a = $(() => (e && e.key && r ? r[e.key] : void 0), [e, r]),
    u = M(
      ({ value: d }) => {
        e && e.handler && e.handler(e, d), o && o({ value: d, item: e });
      },
      [e, o],
    ),
    c = $(
      () => (t ? (e ? e.menuText || e.text : void 0) : e ? e.text : void 0),
      [t, e],
    );
  if (e && e.comp == 'spacer') return /* @__PURE__ */ p(zo, {});
  if (e && e.comp == 'separator') return /* @__PURE__ */ p(Po, { menu: t });
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
        value: a,
        onChange: u,
        onClick: l,
        text: c,
        menu: t,
        ...hc(e),
      }),
    });
  }
}
function Dn({
  item: n,
  values: e = null,
  menu: t = !1,
  onChange: r,
  onClick: s,
}) {
  const [o, i] = Q(!0),
    l = () => i(!0),
    a = () => i(!1),
    u = (d) => {
      l(), s && s(d);
    },
    c = [
      'wx-wSVFAGym',
      'wx-tb-group',
      n.css || '',
      n.layout == 'column' ? 'wx-column' : '',
      n.collapsed && !t ? 'wx-group-collapsed' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ p('div', {
    className: c,
    children:
      n.collapsed && !t
        ? /* @__PURE__ */ re(He, {
            children: [
              /* @__PURE__ */ re('div', {
                className: 'wx-wSVFAGym wx-collapsed',
                onClick: a,
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
                : /* @__PURE__ */ p(Bt, {
                    width: '',
                    oncancel: l,
                    children: /* @__PURE__ */ p('div', {
                      className: 'wx-wSVFAGym wx-drop-group',
                      children: /* @__PURE__ */ p(Dn, {
                        item: { ...n, text: '', collapsed: !1 },
                        values: e,
                        menu: t,
                        onChange: r,
                        onClick: u,
                      }),
                    }),
                  }),
            ],
          })
        : /* @__PURE__ */ re(He, {
            children: [
              /* @__PURE__ */ p('div', {
                className: 'wx-wSVFAGym wx-tb-body',
                children: n.items.map((d, f) =>
                  d.items
                    ? /* @__PURE__ */ p(
                        Dn,
                        {
                          item: d,
                          values: e,
                          onClick: u,
                          onChange: r,
                        },
                        d.id || f,
                      )
                    : /* @__PURE__ */ p(
                        Hr,
                        {
                          item: d,
                          values: e,
                          onClick: u,
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
function gc({
  items: n = [],
  css: e,
  values: t,
  width: r,
  onClick: s,
  onChange: o,
}) {
  const [i, l] = Q(void 0),
    a = W(null);
  function u() {
    l(null);
  }
  function c() {
    l(!0);
  }
  function d(f) {
    u(), s && s(f);
  }
  return /* @__PURE__ */ re('div', {
    className: `wx-Yo6BuX0p wx-menu ${e || ''}`,
    ref: a,
    'data-id': '$menu',
    children: [
      /* @__PURE__ */ p(gt, { icon: 'wxi-dots-h', onClick: c }),
      i
        ? /* @__PURE__ */ p(Bt, {
            width: `${r}px`,
            onCancel: u,
            children: /* @__PURE__ */ p('div', {
              className: 'wx-Yo6BuX0p wx-drop-menu',
              children: n.map((f, g) =>
                f.items
                  ? /* @__PURE__ */ p(
                      Dn,
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
                      Hr,
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
function pc(n) {
  return (
    n.forEach((e) => {
      e.id || (e.id = En());
    }),
    n
  );
}
function mr(n) {
  const {
      items: e,
      menuCss: t = '',
      css: r = '',
      values: s,
      overflow: o = 'menu',
      onClick: i,
      onChange: l,
    } = n,
    [a, u] = Ye(e || []),
    [c, d] = Ye(s || null),
    f = $(() => pc(a), [a]),
    g = W(null),
    m = W(-1),
    [h, x] = Q([]),
    w = W(f);
  V(() => {
    w.current = f;
  }, [a]);
  const y = W(o);
  V(() => {
    y.current = o;
  }, [o]);
  const k = W(h);
  V(() => {
    k.current = h;
  }, [h]);
  const b = W(!1);
  function D(_) {
    c && ((c[_.item.key] = _.value), d({ ...c })), l && l(_);
  }
  function S() {
    const _ = g.current;
    if (!_) return 0;
    const T = _.children,
      F = w.current || [];
    let j = 0;
    for (let O = 0; O < F.length; O++)
      F[O].comp !== 'spacer' &&
        ((j += T[O].clientWidth), F[O].comp === 'separator' && (j += 8));
    return j;
  }
  function C() {
    const _ = g.current,
      T = w.current || [];
    if (_) {
      for (let F = T.length - 1; F >= 0; F--)
        if (T[F].items && !T[F].collapsed) {
          (T[F].collapsed = !0),
            (T[F].$width = _.children[F].offsetWidth),
            (b.current = !0),
            u([...T]);
          return;
        }
    }
  }
  function R(_) {
    const T = g.current,
      F = w.current || [];
    if (T) {
      for (let j = 0; j < F.length; j++)
        if (F[j].collapsed && F[j].$width) {
          F[j].$width - T.children[j].offsetWidth < _ + 10 &&
            ((F[j].collapsed = !1), (b.current = !0)),
            u([...F]);
          return;
        }
    }
  }
  function q() {
    const _ = g.current;
    if (!_) return;
    const T = w.current || [],
      F = y.current;
    if (F === 'wrap') return;
    const j = _.clientWidth;
    if (_.scrollWidth > j) {
      if (F === 'collapse') return C();
      const O = _.children;
      let J = 0;
      for (let K = 0; K < T.length; K++) {
        if (
          ((J += O[K].clientWidth),
          T[K].comp === 'separator' && (J += 8),
          J > j - 40)
        ) {
          if (m.current === K) return;
          m.current = K;
          const ae = [];
          for (let Y = K; Y < T.length; Y++)
            ae.push(T[Y]), (O[Y].style.visibility = 'hidden');
          K > 0 &&
            T[K - 1].comp === 'separator' &&
            (O[K - 1].style.visibility = 'hidden'),
            x(ae);
          break;
        }
        O[K].style.visibility = '';
      }
    } else {
      const O = j - S();
      if (O <= 0) return;
      if (F === 'collapse') return R(O);
      if ((k.current || []).length) {
        m.current = null;
        const J = _.children;
        for (let K = 0; K < T.length; K++) J[K].style.visibility = '';
        x([]);
      }
    }
  }
  return (
    V(() => {
      b.current && ((b.current = !1), q());
    }, [a]),
    V(() => {
      const _ = new ResizeObserver(() => q());
      return (
        g.current && _.observe(g.current),
        () => {
          _.disconnect();
        }
      );
    }, []),
    /* @__PURE__ */ re('div', {
      className: `wx-VdPSJj8y wx-toolbar ${r || ''} ${o === 'wrap' ? 'wx-wrap' : ''}`,
      ref: g,
      children: [
        f.map((_) =>
          _.items
            ? /* @__PURE__ */ p(
                Dn,
                {
                  item: _,
                  values: c,
                  onClick: i,
                  onChange: D,
                },
                _.id,
              )
            : /* @__PURE__ */ p(
                Hr,
                {
                  item: _,
                  values: c,
                  onClick: i,
                  onChange: D,
                },
                _.id,
              ),
        ),
        !!h.length &&
          /* @__PURE__ */ p(gc, {
            items: h,
            css: t,
            values: c,
            onClick: i,
            onChange: D,
          }),
      ],
    })
  );
}
function mc(n) {
  const {
    icon: e,
    text: t = '',
    css: r,
    type: s,
    disabled: o,
    menu: i,
    onClick: l,
  } = n;
  return i
    ? /* @__PURE__ */ re('div', {
        className: 'wx-HXpG4gnx wx-item',
        onClick: l,
        children: [
          /* @__PURE__ */ p('i', {
            className: `wx-HXpG4gnx ${e || 'wxi-empty'} ${r || ''}`,
          }),
          t,
        ],
      })
    : /* @__PURE__ */ p(gt, {
        icon: e,
        type: s,
        css: r,
        text: t,
        disabled: o,
        onClick: l,
      });
}
function wc(n) {
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
function xc(n) {
  const {
    icon: e,
    text: t,
    css: r,
    type: s,
    disabled: o,
    menu: i,
    onClick: l,
  } = n;
  return i
    ? /* @__PURE__ */ re('div', {
        className: 'wx-3cuSqONJ wx-item',
        onClick: l,
        children: [
          e
            ? /* @__PURE__ */ p('i', {
                className: `wx-3cuSqONJ ${e || ''} ${r || ''}`,
              })
            : null,
          t,
        ],
      })
    : /* @__PURE__ */ p(gt, {
        icon: e,
        type: s,
        css: r,
        title: t,
        disabled: o,
        onClick: l,
      });
}
function yc({
  id: n = '',
  text: e = '',
  css: t = '',
  icon: r = '',
  onClick: s,
}) {
  function o() {
    s && s({ id: n });
  }
  return /* @__PURE__ */ re('div', {
    className: `wx-U0Bx7pIR wx-label ${t}`,
    onClick: o,
    children: [
      r ? /* @__PURE__ */ p('i', { className: 'wx-U0Bx7pIR ' + r }) : null,
      e,
    ],
  });
}
Gt('button', mc);
Gt('separator', Po);
Gt('spacer', zo);
Gt('label', wc);
Gt('item', yc);
Gt('icon', xc);
const ot = Wt(null);
function vc(n, e) {
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
const ws = 5,
  kc = 700;
function bc(n) {
  return Ft(n.getAttribute('data-id'));
}
function kn(n) {
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
function wr(n, e) {
  const t = kn(e);
  return { x: n.clientX - t.x, y: n.clientY - t.y };
}
function Sc(n, e) {
  const t = e.current;
  let r = null,
    s,
    o,
    i = !1,
    l = !1;
  const a = document.createElement('DIV');
  (a.className = 'wx-drag-zone'), a.setAttribute('tabindex', -1);
  function u() {
    clearTimeout(s), (s = null);
  }
  function c(C) {
    const R = Qe(C);
    R &&
      ((r = {
        container: a,
        sourceNode: C.target,
        from: bc(R),
        pos: wr(C, n),
      }),
      (o = r.pos),
      d(C));
  }
  function d(C) {
    if (!r) return;
    const R = (r.pos = wr(C, n));
    if (!i) {
      if (
        !l &&
        !C?.target?.getAttribute('draggable-data') &&
        Math.abs(o.x - R.x) < ws &&
        Math.abs(o.y - R.y) < ws
      )
        return;
      if (D(C) === !1) return S();
    }
    if (l) {
      const q =
          window.scrollX ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft,
        _ =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      r.targetNode = document.elementFromPoint(C.pageX - q, C.pageY - _);
    } else r.targetNode = C.target;
    t.move && t.move(C, r),
      (a.style.left = -(r.offset ? r.offset.x : 0) + 'px'),
      (a.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + 'px');
  }
  function f(C) {
    a.parentNode && a.parentNode.removeChild(a),
      (a.innerHTML = ''),
      i && t.end && t.end(C, r),
      (r = o = null),
      S();
  }
  function g(C) {
    (t.getReorder && !t.getReorder()) ||
      (C.button === 0 &&
        (b(C),
        window.addEventListener('mousemove', m),
        window.addEventListener('mouseup', h),
        c(C)));
  }
  function m(C) {
    d(C);
  }
  function h(C) {
    f(C);
  }
  function x(C) {
    if (t.getReorder && !t.getReorder()) return;
    (s = setTimeout(() => {
      (l = !0), c(C.touches[0]);
    }, kc)),
      b(C);
    function R() {
      s && u(),
        C.target.removeEventListener('touchmove', w),
        C.target.removeEventListener('touchend', R),
        f(C);
    }
    C.target.addEventListener('touchmove', w),
      C.target.addEventListener('touchend', R),
      n.addEventListener('contextmenu', y);
  }
  function w(C) {
    i ? (C.preventDefault(), d(C.touches[0])) : s && u();
  }
  function y(C) {
    if (i || s) return C.preventDefault(), !1;
  }
  function k(C) {
    C.preventDefault();
  }
  function b(C) {
    if (!t.getDraggableInfo) return;
    const { hasDraggable: R } = t.getDraggableInfo();
    (!R || C.target.getAttribute('draggable-data')) &&
      ((document.body.style.userSelect = 'none'),
      (document.body.style.webkitUserSelect = 'none'));
  }
  function D(C) {
    if (((i = !0), t.start)) {
      if (t.start(C, r) === !1) return !1;
      n.appendChild(a), (document.body.style.cursor = 'move');
    }
  }
  function S(C) {
    (i = l = !1),
      (document.body.style.cursor = ''),
      (document.body.style.userSelect = ''),
      (document.body.style.webkitUserSelect = ''),
      window.removeEventListener('mousemove', m),
      window.removeEventListener('mouseup', h),
      C &&
        (n.removeEventListener('mousedown', g),
        n.removeEventListener('touchstart', x),
        n.removeEventListener('dragstart', k));
  }
  return (
    n.addEventListener('mousedown', g),
    n.addEventListener('touchstart', x),
    n.addEventListener('dragstart', k),
    {
      destroy() {
        S(!0);
      },
    }
  );
}
const $c = 4e-3;
function Cc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1,
  };
}
function _c(n, e, t, r) {
  const {
      node: s,
      left: o,
      top: i,
      bottom: l,
      sense: a,
      xScroll: u,
      yScroll: c,
    } = r,
    d = wr(n, s);
  t.scrollState || (t.scrollState = Cc());
  let f = 0,
    g = 0;
  d.x < o + a ? (f = -1) : d.x > e.width - a && (f = 1),
    d.y < i + Math.round(a / 2)
      ? (g = -1)
      : d.y > e.height - l - Math.round(a / 2) && (g = 1),
    (t.scrollState.dirX !== f || t.scrollState.dirY !== g) &&
      (Oo(t), (t.scrollState.dirX = f), (t.scrollState.dirY = g)),
    ((u && t.scrollState.dirX !== 0) || (c && t.scrollState.dirY !== 0)) &&
      Nc(t, r, {
        x: t.scrollState.dirX,
        y: t.scrollState.dirY,
      });
}
function Nc(n, e, t) {
  n.autoScrollTimer ||
    (n.autoScrollTimer = setTimeout(() => {
      n.activeAutoScroll = setInterval(Tc, 15, n, e, t);
    }, 250));
}
function Oo(n) {
  (n.scrollSpeedFactor = 1),
    n.autoScrollTimer &&
      ((n.autoScrollTimer = clearTimeout(n.autoScrollTimer)),
      (n.activeAutoScroll = clearInterval(n.activeAutoScroll)));
}
function Tc(n, e, t) {
  const { x: r, y: s } = t;
  (n.scrollSpeedFactor += $c), r !== 0 && Dc(n, e, r), s !== 0 && Mc(n, e, s);
}
function Mc(n, e, t) {
  const r = e.node.scrollTop;
  Wo(r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t, 'scrollTop', e);
}
function Dc(n, e, t) {
  const r = e.node.scrollLeft;
  Wo(r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t, 'scrollLeft', e);
}
function Wo(n, e, t) {
  t.node[e] = n;
}
function zn(n, e, t, r, s, o) {
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
function Fo(n, e, t) {
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
function Ec(n) {
  const {
      row: e,
      column: t,
      cellStyle: r = null,
      columnStyle: s = null,
      children: o,
    } = n,
    [i, l] = Ye(n.focusable),
    a = Se(ot),
    u = oe(a, 'focusCell'),
    c = oe(a, 'search'),
    d = oe(a, 'reorder'),
    f = $(() => c?.rows[e.id] && c.rows[e.id][t.id], [c, e.id, t.id]),
    g = $(
      () => zn(t.width, t.flexgrow, t.fixed, t.left, t.right),
      [t.width, t.flexgrow, t.fixed, t.left, t.right],
    );
  function m(S, C) {
    let R = 'wx-cell';
    return (
      (R += t.fixed ? ' ' + (t.fixed === -1 ? 'wx-shadow' : 'wx-fixed') : ''),
      (R += S ? ' ' + S(t) : ''),
      (R += C ? ' ' + C(e, t) : ''),
      (R += t.treetoggle ? ' wx-tree-cell' : ''),
      R
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
    w = W(null);
  V(() => {
    w.current &&
      i &&
      u?.row === e.id &&
      u?.column === t.id &&
      w.current.focus();
  }, [u, i, e.id, t.id]);
  const y = M(() => {
    i &&
      !u &&
      a.exec('focus-cell', {
        row: e.id,
        column: t.id,
        eventSource: 'focus',
      });
  }, [a, i, u, e.id, t.id]);
  V(
    () => () => {
      i && u && (a.exec('focus-cell', { eventSource: 'destroy' }), l(!1));
    },
    [a, l],
  );
  function k(S) {
    const C = new RegExp(`(${c.value.trim()})`, 'gi');
    return String(S)
      .split(C)
      .map((R) => ({ text: R, highlight: C.test(R) }));
  }
  const b = $(() => {
      const S = (t.fixed && t.fixed.left === -1) || t.fixed.right === -1,
        C = t.fixed && t.fixed.right;
      return [h, S ? 'wx-shadow' : '', C ? 'wx-fixed-right' : '']
        .filter(Boolean)
        .join(' ');
    }, [h, t]),
    D = t.cell;
  return /* @__PURE__ */ re('div', {
    className: 'wx-TSCaXsGV ' + b,
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
        ? /* @__PURE__ */ re(He, {
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
      D
        ? /* @__PURE__ */ p(D, {
            api: a,
            row: e,
            column: t,
            onAction: ({ action: S, data: C }) => a.exec(S, C),
          })
        : o
          ? o()
          : f
            ? /* @__PURE__ */ p('span', {
                children: k(yt(e, t)).map(({ highlight: S, text: C }, R) =>
                  S
                    ? /* @__PURE__ */ p(
                        'mark',
                        { className: 'wx-TSCaXsGV wx-search', children: C },
                        R,
                      )
                    : /* @__PURE__ */ p('span', { children: C }, R),
                ),
              })
            : yt(e, t),
    ],
  });
}
function xs(n, e) {
  let t, r;
  function s(l) {
    (t = l.clientX),
      (n.style.opacity = 1),
      (document.body.style.cursor = 'ew-resize'),
      (document.body.style.userSelect = 'none'),
      window.addEventListener('mousemove', o),
      window.addEventListener('mouseup', i),
      e && e.down && e.down(n);
  }
  function o(l) {
    (r = l.clientX - t), e && e.move && e.move(r);
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
function Rc({ filter: n, column: e, action: t, filterValue: r }) {
  function s({ value: o }) {
    t({ value: o, key: e.id });
  }
  return /* @__PURE__ */ p(on, {
    ...(n.config ?? {}),
    value: r,
    onChange: s,
  });
}
function Ic({ filter: n, column: e, action: t, filterValue: r }) {
  const s = Se(ot),
    o = oe(s, 'flatData'),
    i = $(() => n?.config?.options || e?.options || a(), [n, e, o]),
    l = $(() => n?.config?.template, [n]);
  function a() {
    const d = [];
    return (
      o.forEach((f) => {
        const g = Mt(f, e);
        d.includes(g) || d.push(g);
      }),
      d.map((f) => ({ id: f, label: f }))
    );
  }
  function u({ value: d }) {
    t({ value: d, key: e.id });
  }
  function c(d) {
    d.key !== 'Tab' && d.preventDefault();
  }
  return /* @__PURE__ */ p('div', {
    style: { width: '100%' },
    onKeyDown: c,
    children: /* @__PURE__ */ p(Ps, {
      placeholder: '',
      clear: !0,
      ...(n?.config ?? {}),
      options: i,
      value: r,
      onChange: u,
      children: (d) => (l ? l(d) : d.label),
    }),
  });
}
const Hc = {
  text: Rc,
  richselect: Ic,
};
function Ac({ filter: n, column: e }) {
  const t = Se(ot),
    r = oe(t, 'filterValues');
  function s(i) {
    t.exec('filter-rows', i);
  }
  const o = $(() => Hc[n.type], [n.type]);
  return /* @__PURE__ */ p(o, {
    filter: n,
    column: e,
    action: s,
    filterValue: r[e.id],
  });
}
function Lc(n) {
  const {
      cell: e,
      column: t,
      row: r,
      lastRow: s,
      sortRow: o,
      columnStyle: i,
      bodyHeight: l,
      hasSplit: a,
    } = n,
    u = Se(ot),
    c = oe(u, 'sortMarks'),
    d = $(() => (c ? c[t.id] : void 0), [c, t.id]),
    f = W(),
    g = M(
      (O) => {
        f.current = e.flexgrow ? O.parentNode.clientWidth : e.width;
      },
      [e.flexgrow, e.width],
    ),
    m = M(
      (O, J) => {
        u.exec('resize-column', {
          id: e.id,
          width: Math.max(1, (f.current || 0) + O),
          inProgress: J,
        });
      },
      [u, e.id],
    ),
    h = M((O) => m(O, !0), [m]),
    x = M((O) => m(O, !1), [m]),
    w = M(
      (O) => {
        if (!t.sort || e.filter) return;
        let J = d?.order;
        J && (J = J === 'asc' ? 'desc' : 'asc'),
          u.exec('sort-rows', { key: e.id, add: O.ctrlKey, order: J });
      },
      [u, e.id, e.filter, t.sort, d?.order],
    ),
    y = M(
      (O) => {
        O && O.stopPropagation(),
          u.exec('collapse-column', { id: e.id, row: r });
      },
      [u, e.id, r],
    ),
    k = M(
      (O) => {
        O.key === 'Enter' && y();
      },
      [y],
    ),
    b = M(
      (O) => {
        O.key === 'Enter' && !e.filter && w(O);
      },
      [w, e.filter],
    ),
    D = $(() => e.collapsed && t.collapsed, [e.collapsed, t.collapsed]),
    S = $(() => D && !a && e.collapsible !== 'header', [D, a, e.collapsible]),
    C = $(() => (S ? { top: -l / 2, position: 'absolute' } : {}), [S, l]),
    R = $(
      () =>
        zn(
          e.width,
          e.flexgrow,
          t.fixed,
          t.left,
          e.right ?? t.right,
          e.height + (D && S ? l : 0),
        ),
      [
        e.width,
        e.flexgrow,
        t.fixed,
        t.left,
        e.right,
        t.right,
        e.height,
        D,
        S,
        l,
      ],
    ),
    q = $(() => Fo(t, e, i), [t, e, i]),
    _ = M(
      () => Object.fromEntries(Object.entries(e).filter(([O]) => O !== 'cell')),
      [e],
    ),
    T = `wx-cell ${q} ${e.css || ''} wx-collapsed`,
    F = [
      'wx-cell',
      q,
      e.css || '',
      e.filter ? 'wx-filter' : '',
      t.fixed && t.fixed.right ? 'wx-fixed-right' : '',
    ]
      .filter(Boolean)
      .join(' '),
    j = W(null);
  return (
    V(() => {
      const O = j.current;
      if (!O) return;
      const J = xs(O, { down: g, move: h, up: x });
      return () => {
        typeof J == 'function' && J();
      };
    }, [g, h, x, xs]),
    D
      ? /* @__PURE__ */ p('div', {
          className: 'wx-RsQD74qC ' + T,
          style: R,
          role: 'button',
          'aria-label': `Expand column ${e.text || ''}`,
          'aria-expanded': !e.collapsed,
          tabIndex: 0,
          onKeyDown: k,
          onClick: y,
          'data-header-id': t.id,
          children: /* @__PURE__ */ p('div', {
            className: 'wx-RsQD74qC wx-text',
            style: C,
            children: e.text || '',
          }),
        })
      : /* @__PURE__ */ re('div', {
          className: 'wx-RsQD74qC ' + F,
          style: R,
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
          onKeyDown: b,
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
                  onKeyDown: k,
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
                    api: u,
                    cell: _(),
                    column: t,
                    row: r,
                    onAction: ({ action: J, data: K }) => u.exec(J, K),
                  });
                })()
              : e.filter
                ? /* @__PURE__ */ p(Ac, { filter: e.filter, column: t })
                : /* @__PURE__ */ p('div', {
                    className: 'wx-RsQD74qC wx-text',
                    children: e.text || '',
                  }),
            t.resize && s && !e._hidden
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-RsQD74qC wx-grip',
                  role: 'presentation',
                  'aria-label': 'Resize column',
                  ref: j,
                  onClick: (O) => O.stopPropagation(),
                  children: /* @__PURE__ */ p('div', {}),
                })
              : null,
            o
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-RsQD74qC wx-sort',
                  children: d
                    ? /* @__PURE__ */ re(He, {
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
function Pc({ cell: n, column: e, row: t, columnStyle: r }) {
  const s = Se(ot),
    o = $(
      () =>
        zn(
          n?.width,
          n?.flexgrow,
          e?.fixed,
          e?.left,
          n?.right ?? e?.right,
          n?.height,
        ),
      [n?.width, n?.flexgrow, e?.fixed, e?.left, n?.right, e?.right, n?.height],
    ),
    i = $(() => Fo(e, n, r), [e, n, r]),
    l = M(
      () =>
        Object.fromEntries(
          Object.entries(n || {}).filter(([u]) => u !== 'cell'),
        ),
      [n],
    ),
    a =
      `wx-6Sdi3Dfd wx-cell ${i || ''} ${n?.css || ''}` +
      (e?.fixed && e?.fixed.right ? ' wx-fixed-right' : '');
  return /* @__PURE__ */ p('div', {
    className: a,
    style: o,
    children:
      !e?.collapsed && !n?.collapsed
        ? n?.cell
          ? Go.createElement(n.cell, {
              api: s,
              cell: l(),
              column: e,
              row: t,
              onAction: ({ action: u, data: c }) => s.exec(u, c),
            })
          : /* @__PURE__ */ p('div', {
              className: 'wx-6Sdi3Dfd wx-text',
              children: n?.text || '',
            })
        : null,
  });
}
function ys({
  deltaLeft: n,
  contentWidth: e,
  columns: t,
  type: r = 'header',
  columnStyle: s,
  bodyHeight: o,
}) {
  const i = Se(ot),
    l = oe(i, '_sizes'),
    a = oe(i, 'split'),
    u = $(() => l?.[`${r}RowHeights`], [l, r]),
    c = $(() => {
      let h = [];
      if (t && t.length) {
        const x = t[0][r].length;
        for (let w = 0; w < x; w++) {
          let y = 0;
          h.push([]),
            t.forEach((k, b) => {
              const D = { ...k[r][w] };
              if ((y || h[w].push(D), D.colspan > 1)) {
                if (((y = D.colspan - 1), !Do() && k.right)) {
                  let S = k.right;
                  for (let C = 1; C < D.colspan; C++) S -= t[b + C].width;
                  D.right = S;
                }
              } else y && y--;
            });
        }
      }
      return h;
    }, [t, r]),
    d = $(() => a?.left || a?.right, [a]);
  function f(h) {
    return t.find((x) => x.id === h);
  }
  function g(h, x) {
    let w = x;
    return h.rowspan && (w += h.rowspan - 1), w === c.length - 1;
  }
  function m(h, x, w) {
    if (!w.sort) return !1;
    for (let y = c.length - 1; y >= 0; y--) {
      const k = w.header[y];
      if (!k.filter && !k._hidden) return x === y;
    }
    return g(h, x);
  }
  return /* @__PURE__ */ p('div', {
    className: `wx-sAsPVaUK wx-${r}`,
    style: { paddingLeft: `${n}px`, width: `${e}px` },
    role: 'rowgroup',
    children: c.map((h, x) =>
      /* @__PURE__ */ p(
        'div',
        {
          className:
            r === 'header' ? 'wx-sAsPVaUK wx-h-row' : 'wx-sAsPVaUK wx-f-row',
          style: { height: `${u?.[x]}px`, display: 'flex' },
          role: 'row',
          children: h.map((w) => {
            const y = f(w.id);
            return r === 'header'
              ? /* @__PURE__ */ p(
                  Lc,
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
                  Pc,
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
function zc({ overlay: n }) {
  const e = Se(ot);
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
function Oc(n) {
  const { actions: e, editor: t } = n,
    [r, s] = Q(t?.value || ''),
    o = W(null);
  V(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function l({ key: a }) {
    a === 'Enter' && e.save();
  }
  return /* @__PURE__ */ p('input', {
    className: 'wx-e7Ao5ejY wx-text',
    onInput: i,
    onKeyDown: l,
    ref: o,
    type: 'text',
    value: r,
  });
}
function Wc({ actions: n, editor: e, onAction: t }) {
  const [r, s] = Q(e?.value),
    [o, i] = Q(e?.renderedValue),
    [l, a] = Q(e?.options || []),
    u = $(() => e?.config?.template, [e]),
    c = $(() => e?.config?.cell, [e]),
    d = $(() => (l || []).findIndex((y) => y.id === r), [l, r]),
    f = W(null),
    g = W(null),
    m = M(
      (y) => {
        (f.current = y.navigate), (g.current = y.keydown), f.current(d);
      },
      [d, f],
    ),
    h = M(
      (y) => {
        const k = y?.target?.value ?? '';
        i(k);
        const b = k
          ? (e?.options || []).filter((D) =>
              (D.label || '').toLowerCase().includes(k.toLowerCase()),
            )
          : e?.options || [];
        a(b), b.length ? f.current(-1 / 0) : f.current(null);
      },
      [e],
    ),
    x = W(null);
  V(() => {
    x.current && x.current.focus();
  }, []),
    V(() => {
      s(e?.value), i(e?.renderedValue), a(e?.options || []);
    }, [e]);
  const w = M(
    ({ id: y }) => {
      n.updateValue(y), n.save();
    },
    [n],
  );
  return /* @__PURE__ */ re(He, {
    children: [
      /* @__PURE__ */ p('input', {
        className: 'wx-0UYfSd1x wx-input',
        ref: x,
        value: o ?? '',
        onChange: h,
        onKeyDown: (y) => (g.current ? g.current(y, d) : void 0),
      }),
      /* @__PURE__ */ p(Rn, {
        items: l,
        onReady: m,
        onSelect: w,
        children: ({ option: y }) =>
          u
            ? u(y)
            : c
              ? /* @__PURE__ */ p(c, { data: y, onAction: t })
              : y.label,
      }),
    ],
  });
}
function Fc({ actions: n, editor: e, onAction: t }) {
  const [r] = Q(() => e.value || /* @__PURE__ */ new Date()),
    [s] = Q(() => e.config?.template),
    [o] = Q(() => e.config?.cell);
  function i({ value: a }) {
    n.updateValue(a), n.save();
  }
  const l = W(null);
  return (
    V(() => {
      l.current && l.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ re(He, {
      children: [
        /* @__PURE__ */ p('div', {
          className: 'wx-lNWNYUb6 wx-value',
          ref: l,
          tabIndex: 0,
          onClick: () => n.cancel(),
          onKeyDown: (a) => a.preventDefault(),
          children: s
            ? s(r)
            : o
              ? /* @__PURE__ */ p(o, { data: e.value, onAction: t })
              : /* @__PURE__ */ p('span', {
                  className: 'wx-lNWNYUb6 wx-text',
                  children: e.renderedValue,
                }),
        }),
        /* @__PURE__ */ p(Bt, {
          width: 'auto',
          children: /* @__PURE__ */ p(Ls, {
            value: r,
            onChange: i,
            buttons: e.config?.buttons,
          }),
        }),
      ],
    })
  );
}
function Yc(n) {
  const { actions: e, editor: t } = n,
    r = n.onAction ?? n.onaction,
    s = t.config || {},
    [o] = Q(t.options.find((h) => h.id === t.value)),
    [i] = Q(t.value),
    [l] = Q(t.options),
    a = $(() => l.findIndex((h) => h.id === i), [l, i]);
  function u({ id: h }) {
    e.updateValue(h), e.save();
  }
  let c;
  const [d, f] = Q();
  function g(h) {
    (c = h.navigate), f(() => h.keydown), c(a);
  }
  const m = W(null);
  return (
    V(() => {
      m.current && m.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ re(He, {
      children: [
        /* @__PURE__ */ p('div', {
          ref: m,
          className: 'wx-ywGRk611 wx-value',
          tabIndex: 0,
          onClick: () => e.cancel(),
          onKeyDown: (h) => {
            d(h, a), h.preventDefault();
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
        /* @__PURE__ */ p(Rn, {
          items: l,
          onReady: g,
          onSelect: u,
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
const Bc = {
  text: Oc,
  combo: Wc,
  datepicker: Fc,
  richselect: Yc,
};
function Gc({ column: n, row: e }) {
  const t = Se(ot),
    r = oe(t, 'editor'),
    s = M(
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
    o = M(
      (m) => {
        const h = m ? null : { row: r?.id, column: r?.column };
        s(!1, h);
      },
      [r, s],
    ),
    i = M(() => {
      s(!0, { row: r?.id, column: r?.column });
    }, [r, s]),
    l = M(
      (m) => {
        t.exec('editor', { value: m });
      },
      [t],
    ),
    a = M(
      (m) => {
        m.key === 'Enter' && r && i();
      },
      [r, i],
    ),
    u = $(
      () => zn(n.width, n.flexgrow, n.fixed, n.left, n.right),
      [n.width, n.flexgrow, n.fixed, n.left, n.right],
    ),
    c = $(() => {
      let m = n.editor;
      typeof m == 'function' && (m = m(e, n));
      let h = typeof m == 'string' ? m : m.type;
      return Bc[h];
    }, [n, e]),
    d = W(null);
  V(() => {
    if (!d.current) return;
    const m = tn(d.current, () => o(!0));
    return () => {
      typeof m == 'function' && m();
    };
  }, [o]),
    V(() => {
      d.current && typeof u == 'string' && d.current.setAttribute('style', u);
    }, [u]);
  const f = typeof e.$parent < 'u' ? 'gridcell' : 'cell',
    g = typeof e.$parent < 'u' ? !n.editor : void 0;
  return /* @__PURE__ */ p('div', {
    className: 'wx-8l724t2g wx-cell wx-editor',
    ref: d,
    style: typeof u == 'object' && u !== null ? u : void 0,
    role: f,
    'aria-readonly': g,
    tabIndex: -1,
    onClick: (m) => m.stopPropagation(),
    onDoubleClick: (m) => m.stopPropagation(),
    onKeyDown: a,
    children: c
      ? /* @__PURE__ */ p(c, {
          editor: r,
          actions: { save: o, cancel: i, updateValue: l },
          onAction: ({ action: m, data: h }) => t.exec(m, h),
        })
      : null,
  });
}
function vs(n) {
  const { columns: e, type: t, columnStyle: r } = n,
    s = Se(ot),
    { filterValues: o, _columns: i, _sizes: l } = s.getState();
  function a(u) {
    return r ? ' ' + r(u) : '';
  }
  return /* @__PURE__ */ p(He, {
    children: e.map((u, c) =>
      /* @__PURE__ */ p(
        'tr',
        {
          children: u.map((d) => {
            const f = i.find((h) => h.id == d.id),
              g = `wx-print-cell-${t}${a(f)}${d.filter ? ' wx-print-cell-filter' : ''}${d.vertical ? ' wx-vertical' : ''}`,
              m = d.cell;
            return /* @__PURE__ */ p(
              'th',
              {
                style: Is(Mo(d, l.columnWidth)),
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
                      row: c,
                    })
                  : d.filter
                    ? /* @__PURE__ */ p('div', {
                        className: 'wx-Gy81xq2u wx-print-filter',
                        children: Aa(o, i, d),
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
        c,
      ),
    ),
  });
}
function Vc(n) {
  const {
      columns: e,
      rowStyle: t,
      columnStyle: r,
      cellStyle: s,
      header: o,
      footer: i,
      reorder: l,
    } = n,
    a = Se(ot),
    { flatData: u, _sizes: c } = a.getState(),
    d = o && ds(e, 'header', c.headerRowHeights),
    f = i && ds(e, 'footer', c.footerRowHeights);
  function g(h, x) {
    let w = '';
    return (w += r ? ' ' + r(x) : ''), (w += s ? ' ' + s(h, x) : ''), w;
  }
  function m(h, x) {
    return typeof x.draggable == 'function'
      ? x.draggable(h, x) !== !1
      : x.draggable;
  }
  return /* @__PURE__ */ re('table', {
    className: `wx-8NTMLH0z wx-print-grid ${e.some((h) => h.flexgrow) ? 'wx-flex-columns' : ''}`,
    children: [
      o
        ? /* @__PURE__ */ p('thead', {
            children: /* @__PURE__ */ p(vs, {
              columns: d,
              type: 'header',
              columnStyle: r,
            }),
          })
        : null,
      /* @__PURE__ */ p('tbody', {
        children: u.map((h, x) =>
          /* @__PURE__ */ p(
            'tr',
            {
              className: 'wx-8NTMLH0z wx-row' + (t ? ' ' + t(h) : ''),
              style: { height: `${h.rowHeight || c.rowHeight}px` },
              children: e.map((w) =>
                w.collapsed
                  ? null
                  : /* @__PURE__ */ re(
                      'td',
                      {
                        className: `wx-8NTMLH0z wx-print-cell wx-cell ${g(h, w)}`,
                        style: Is(Mo(w, c.columnWidth)),
                        children: [
                          l && w.draggable
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
                            ? /* @__PURE__ */ re(He, {
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
                                  api: a,
                                  row: h,
                                  column: w,
                                });
                              })()
                            : /* @__PURE__ */ p('span', { children: yt(h, w) }),
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
            children: /* @__PURE__ */ p(vs, {
              columns: f,
              type: 'footer',
              columnStyle: r,
            }),
          })
        : null,
    ],
  });
}
function Kc(n) {
  const { config: e, ...t } = n,
    r = Se(ot),
    { _skin: s, _columns: o } = r.getState(),
    i = $(() => Ea(o, e), []),
    l = W(null);
  return (
    V(() => {
      const a = document.body;
      a.classList.add('wx-print');
      const u = l.current;
      if (!u) return;
      const c = u.cloneNode(!0);
      a.appendChild(c);
      const d = `@media print { @page { size: ${e.paper} ${e.mode}; }`,
        f = document.createElement('style');
      f.setAttribute('type', 'text/css'),
        f.setAttribute('media', 'print'),
        document.getElementsByTagName('head')[0].appendChild(f),
        f.appendChild(document.createTextNode(d)),
        window.print(),
        f.remove(),
        a.classList.remove('wx-print'),
        c.remove();
    }, []),
    /* @__PURE__ */ p('div', {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: l,
      children: i.map((a, u) =>
        /* @__PURE__ */ p(
          'div',
          {
            className: 'wx-4zwCKA7C wx-print-grid-wrapper',
            children: /* @__PURE__ */ p(Vc, { columns: a, ...t }),
          },
          u,
        ),
      ),
    })
  );
}
function jc(n) {
  const {
      header: e,
      footer: t,
      overlay: r,
      multiselect: s,
      onreorder: o,
      rowStyle: i,
      columnStyle: l,
      cellStyle: a,
      autoRowHeight: u,
      resize: c,
      clientWidth: d,
      clientHeight: f,
      responsiveLevel: g,
      hotkeys: m,
    } = n,
    h = Se(ot),
    x = oe(h, 'dynamic'),
    w = oe(h, '_columns'),
    y = oe(h, 'flatData'),
    k = oe(h, 'split'),
    b = oe(h, '_sizes'),
    [D, S] = Sn(h, 'selectedRows'),
    C = oe(h, 'select'),
    R = oe(h, 'editor'),
    q = oe(h, 'tree'),
    _ = oe(h, 'focusCell'),
    T = oe(h, '_print'),
    F = oe(h, 'undo'),
    j = oe(h, 'reorder'),
    O = oe(h, '_rowHeightFromData'),
    [J, K] = Q(0);
  V(() => {
    K(Fn());
  }, []);
  const [ae, Y] = Q(0),
    [U, ge] = Q(0),
    A = $(() => (w || []).some((E) => !E.hidden && E.flexgrow), [w]),
    ee = $(() => b?.rowHeight || 0, [b]),
    xe = W(null),
    [ue, Me] = Q(null),
    [ke, X] = Q(null),
    B = $(() => {
      let E = [],
        se = 0;
      return (
        k &&
          k.left &&
          ((E = (w || [])
            .slice(0, k.left)
            .filter((v) => !v.hidden)
            .map((v) => ({ ...v }))),
          E.forEach((v) => {
            (v.fixed = { left: 1 }), (v.left = se), (se += v.width);
          }),
          E.length && (E[E.length - 1].fixed = { left: -1 })),
        { columns: E, width: se }
      );
    }, [k, w]),
    Z = $(() => {
      let E = [],
        se = 0;
      if (k && k.right) {
        E = (w || [])
          .slice(k.right * -1)
          .filter((v) => !v.hidden)
          .map((v) => ({ ...v }));
        for (let v = E.length - 1; v >= 0; v--) {
          const N = E[v];
          (N.fixed = { right: 1 }), (N.right = se), (se += N.width);
        }
        E.length && (E[0].fixed = { right: -1 });
      }
      return { columns: E, width: se };
    }, [k, w]),
    he = $(() => {
      const E = (w || [])
        .slice(k?.left || 0, (w || []).length - (k?.right ?? 0))
        .filter((se) => !se.hidden);
      return (
        E.forEach((se) => {
          se.fixed = 0;
        }),
        E
      );
    }, [w, k]),
    de = $(
      () => (w || []).reduce((E, se) => (se.hidden || (E += se.width), E), 0),
      [w],
    ),
    ve = 1;
  function _e(E, se, v) {
    let N = se,
      z = E;
    if (he.length) {
      let I = he.length;
      for (let P = E; P >= 0; P--)
        he[P][v].forEach((te) => {
          te.colspan > 1 && P > E - te.colspan && P < I && (I = P);
        });
      if (I !== he.length && I < E) {
        for (let P = I; P < E; P++) N -= he[P].width;
        z = I;
      }
    }
    return { index: z, delta: N };
  }
  const Oe = $(() => {
      let E, se, v;
      const N = ae,
        z = ae + (d || 0);
      let I = 0,
        P = 0,
        te = 0,
        ce = 0;
      he.forEach((Ke, je) => {
        N > te && ((I = je), (ce = te)),
          (te = te + Ke.width),
          z > te && (P = je + ve);
      });
      const ne = { header: 0, footer: 0 };
      for (let Ke = P; Ke >= I; Ke--)
        ['header', 'footer'].forEach((je) => {
          he[Ke] &&
            he[Ke][je].forEach((st) => {
              const at = st.colspan;
              if (at && at > 1) {
                const bt = at - (P - Ke + 1);
                bt > 0 && (ne[je] = Math.max(ne[je], bt));
              }
            });
        });
      const me = _e(I, ce, 'header'),
        ye = _e(I, ce, 'footer'),
        ze = me.delta,
        Ee = me.index,
        We = ye.delta,
        rt = ye.index;
      return (
        A && de > (d || 0)
          ? (E = se = v = [...B.columns, ...he, ...Z.columns])
          : ((E = [...B.columns, ...he.slice(I, P + 1), ...Z.columns]),
            (se = [
              ...B.columns,
              ...he.slice(Ee, P + ne.header + 1),
              ...Z.columns,
            ]),
            (v = [
              ...B.columns,
              ...he.slice(rt, P + ne.footer + 1),
              ...Z.columns,
            ])),
        {
          data: E || [],
          header: se || [],
          footer: v || [],
          d: ce,
          df: We,
          dh: ze,
        }
      );
    }, [he, B, Z, ae, d, A, de]),
    Ve = $(() => (e && b?.headerHeight) || 0, [e, b]),
    Re = $(() => (t && b?.footerHeight) || 0, [t, b]),
    Pe = $(() => (d && f ? de >= d : !1), [d, f, de]),
    Be = $(() => (f || 0) - Ve - Re - (Pe ? J : 0), [f, Ve, Re, Pe, J]),
    H = $(() => Math.ceil((Be || 0) / (ee || 1)) + 1, [Be, ee]),
    fe = W([]),
    [pe, ie] = Q(0),
    [Fe, $e] = Q(void 0),
    be = $(() => {
      let E = 0,
        se = 0;
      const v = 2;
      if (u) {
        let I = U;
        for (; I > 0; ) (I -= fe.current[E] || ee), E++;
        se = U - I;
        for (let P = Math.max(0, E - v - 1); P < E; P++)
          se -= fe.current[E - P] || ee;
        E = Math.max(0, E - v);
      } else {
        if (O) {
          let I = 0,
            P = 0;
          for (let me = 0; me < (y || []).length; me++) {
            const ye = y[me].rowHeight || ee;
            if (P + ye > U) {
              I = me;
              break;
            }
            P += ye;
          }
          E = Math.max(0, I - v);
          for (let me = 0; me < E; me++) se += y[me].rowHeight || ee;
          let te = 0,
            ce = 0;
          for (let me = I + 1; me < (y || []).length; me++) {
            const ye = y[me].rowHeight || ee;
            if ((te++, ce + ye > Be)) break;
            ce += ye;
          }
          const ne = Math.min(x ? x.rowCount : (y || []).length, I + te + v);
          return { d: se, start: E, end: ne };
        }
        (E = Math.floor(U / (ee || 1))),
          (E = Math.max(0, E - v)),
          (se = E * (ee || 0));
      }
      const N = x ? x.rowCount : (y || []).length,
        z = Math.min(N, E + (H || 0) + v);
      return { d: se, start: E, end: z };
    }, [u, O, U, ee, x, y, H, Be]),
    Ae = $(() => {
      const E = x ? x.rowCount : (y || []).length;
      if (u) return pe + be.d + (E - (Fe || 0)) * (ee || 0);
      if (!O) return E * (ee || 0);
      let se = 0;
      for (let v = 0; v < E; v++) se += y[v]?.rowHeight || ee;
      return se;
    }, [x, y, ee, u, O, pe, be.d, Fe]),
    De = $(
      () => (d && f ? Ae + Ve + Re >= f - (de >= (d || 0) ? J : 0) : !1),
      [d, f, Ae, Ve, Re, de, J],
    ),
    Ie = $(
      () => (A && de <= (d || 0) ? (d || 0) - 0 - (De ? J : 0) : de),
      [A, de, d, De, J, Pe],
    ),
    qe = $(
      () =>
        A && de <= (d || 0) ? d || 0 : Ie < (d || 0) ? de + (De ? J : 0) : -1,
      [A, de, d, Ie, De, J],
    ),
    L = W({});
  V(() => {
    if (x && (L.current.start !== be.start || L.current.end !== be.end)) {
      const { start: E, end: se } = be;
      (L.current = { start: E, end: se }),
        h && h.exec && h.exec('request-data', { row: { start: E, end: se } });
    }
  }, [x, be, h]);
  const G = $(
      () => (x ? y || [] : (y || []).slice(be.start, be.end)),
      [x, y, be],
    ),
    le = $(
      () => (D || []).filter((E) => (G || []).some((se) => se.id === E)),
      [S, G],
    ),
    we = $(() => be.start, [be.start]),
    Te = M((E) => {
      ge(E.target.scrollTop), Y(E.target.scrollLeft);
    }, []),
    Ne = M((E) => {
      E.shiftKey && E.preventDefault(),
        xe.current && xe.current.focus && xe.current.focus();
    }, []),
    Le = M(() => !!(w || []).find((E) => !!E.draggable), [w]),
    Ge = W(null),
    Je = W(null),
    It = W({
      dblclick: (E, se) => {
        const v = { id: E, column: rr(se, 'data-col-id') };
        h.exec('open-editor', v);
      },
      click: (E, se) => {
        if (Ge.current) return;
        const v = rr(se, 'data-col-id');
        if (
          (_?.id !== E &&
            h.exec('focus-cell', {
              row: E,
              column: v,
              eventSource: 'click',
            }),
          C === !1)
        )
          return;
        const N = s && se.ctrlKey,
          z = s && se.shiftKey;
        (N || D.length > 1 || !D.includes(E)) &&
          h.exec('select-row', { id: E, toggle: N, range: z });
      },
      'toggle-row': (E) => {
        const se = h.getRow(E);
        h.exec(se.open !== !1 ? 'close-row' : 'open-row', { id: E });
      },
      'ignore-click': () => !1,
    }),
    ut = $(
      () => ({
        top: Ve,
        bottom: Re,
        left: B.width,
        xScroll: Pe,
        yScroll: De,
        sense: u && ke ? ke.offsetHeight : Math.max(b?.rowHeight || 0, 40),
        node: xe.current && xe.current.firstElementChild,
      }),
      [Ve, Re, B.width, Pe, De, u, ke, b],
    );
  function Vt(E, se) {
    const { container: v, sourceNode: N, from: z } = se;
    if (Le() && !N.getAttribute('draggable-data')) return !1;
    Me(z), h.getRow(z).open && h.exec('close-row', { id: z, nested: !0 });
    const I = Qe(N, 'data-id'),
      P = I.cloneNode(!0);
    P.classList.remove('wx-selected'),
      P.querySelectorAll('[tabindex]').forEach((me) =>
        me.setAttribute('tabindex', '-1'),
      ),
      v.appendChild(P),
      X(P);
    const te = ae - Oe.d,
      ce = De ? J : 0;
    v.style.width =
      Math.min((d || 0) - ce, A && de <= (d || 0) ? Ie : Ie - ce) + te + 'px';
    const ne = kn(I);
    (se.offset = {
      x: te,
      y: -Math.round(ne.height / 2),
    }),
      Je.current || (Je.current = E.clientY);
  }
  function On(E, se) {
    const { from: v } = se,
      N = se.pos,
      z = kn(xe.current);
    N.x = z.x;
    const I = ut.top;
    if (N.y < I) N.y = I;
    else {
      const P =
        z.height - (Pe && J > 0 ? J : Math.round(ut.sense / 2)) - ut.bottom;
      N.y > P && (N.y = P);
    }
    if (xe.current.contains(se.targetNode)) {
      const P = Qe(se.targetNode, 'data-id'),
        te = Ft(P?.getAttribute('data-id'));
      if (te && te !== v) {
        se.to = te;
        const ce = u ? ke?.offsetHeight : b?.rowHeight;
        if (ke && (U === 0 || N.y > I + ce - 1)) {
          const ne = P.getBoundingClientRect(),
            me = kn(ke).y,
            ye = ne.y,
            ze = me > ye ? -1 : 1,
            Ee = ze === 1 ? 'after' : 'before',
            We = Math.abs(h.getRowIndex(v) - h.getRowIndex(te)),
            rt = We !== 1 ? (Ee === 'before' ? 'after' : 'before') : Ee;
          if (
            We === 1 &&
            ((ze === -1 && E.clientY > Je.current) ||
              (ze === 1 && E.clientY < Je.current))
          )
            return;
          (Je.current = E.clientY),
            h.exec('move-item', {
              id: v,
              target: te,
              mode: rt,
              inProgress: !0,
            });
        }
      }
      o && o({ event: E, context: se });
    }
    _c(E, z, se, ut);
  }
  function Wn(E, se) {
    const { from: v, to: N } = se;
    h.exec('move-item', {
      id: v,
      target: N,
      inProgress: !1,
    }),
      (Ge.current = setTimeout(() => {
        Ge.current = 0;
      }, 1)),
      Me(null),
      X(null),
      (Je.current = null),
      Oo(se);
  }
  function Fn() {
    const E = document.createElement('div');
    (E.style.cssText =
      'position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;'),
      document.body.appendChild(E);
    const se = E.offsetWidth - E.clientWidth;
    return document.body.removeChild(E), se;
  }
  const Ht = $(() => (qe > 0 ? { width: `${qe}px` } : void 0), [qe]),
    vt = W(null);
  function an() {
    Promise.resolve().then(() => {
      let E = 0,
        se = we;
      const v = vt.current;
      v &&
        (Array.from(v.children).forEach((N, z) => {
          (fe.current[we + z] = N.offsetHeight), (E += N.offsetHeight), se++;
        }),
        ie(E),
        $e(se));
    });
  }
  V(() => {
    G && u && an();
  }, [G, u, we]);
  let [xt, Kt] = Q();
  V(() => {
    if (_ && (!C || !le.length || le.includes(_.row))) Kt({ ..._ });
    else if (G.length && Oe.data.length) {
      if (
        !xt ||
        (le.length && !le.includes(xt.row)) ||
        G.findIndex((E) => E.id == xt.row) === -1 ||
        Oe.data.findIndex((E) => E.id == xt.column && !E.collapsed) === -1
      ) {
        const E = le[0] || G[0].id,
          se = Oe.data.findIndex((v) => !v.collapsed);
        Kt(se !== -1 ? { row: E, column: Oe.data[se].id } : null);
      }
    } else Kt(null);
  }, [_]);
  const cn = W(null);
  V(() => {
    const E = xe.current;
    if (!E) return;
    const se = vc(E, c);
    return () => {
      typeof se == 'function' && se();
    };
  }, [c]);
  const un = W({});
  Object.assign(un.current, {
    start: Vt,
    move: On,
    end: Wn,
    getReorder: () => j,
    getDraggableInfo: () => ({ hasDraggable: Le() }),
  }),
    V(() => {
      const E = xe.current;
      return E ? Sc(E, un).destroy : void 0;
    }, [j, xe.current]),
    V(() => {
      const E = xe.current;
      return E
        ? Rr(E, {
            keys: m !== !1 && {
              ...tc,
              'ctrl+z': F,
              'ctrl+y': F,
              ...m,
            },
            exec: (se) => h.exec('hotkey', se),
          }).destroy
        : void 0;
    }, [h, F, m]);
  const kt = W({
    scroll: h.getReactiveState().scroll,
  });
  (kt.current.getWidth = () => (d || 0) - (De ? J : 0)),
    (kt.current.getHeight = () => Be),
    (kt.current.getScrollMargin = () => B.width + Z.width),
    V(() => {
      nc(cn.current, kt.current);
    }, []);
  const jt = W(null);
  V(() => {
    const E = jt.current;
    if (!E) return;
    const se = [];
    return (
      se.push(
        tn(E, () => h.exec('focus-cell', { eventSource: 'click' })).destroy,
      ),
      se.push(ci(E, It.current)),
      () => se.forEach((v) => v())
    );
  }, []);
  const dn = `wx-grid ${g ? `wx-responsive-${g}` : ''}`;
  return /* @__PURE__ */ re(He, {
    children: [
      /* @__PURE__ */ p('div', {
        className: 'wx-4VuBwK2D ' + dn,
        style: {
          '--header-height': `${Ve}px`,
          '--footer-height': `${Re}px`,
          '--split-left-width': `${B.width}px`,
          '--split-right-width': `${Z.width}px`,
        },
        children: /* @__PURE__ */ p('div', {
          ref: xe,
          className: 'wx-4VuBwK2D wx-table-box',
          style: Ht,
          role: q ? 'treegrid' : 'grid',
          'aria-colcount': Oe.data.length,
          'aria-rowcount': G.length,
          'aria-multiselectable': q && s ? !0 : void 0,
          tabIndex: -1,
          children: /* @__PURE__ */ re('div', {
            ref: cn,
            className: 'wx-4VuBwK2D wx-scroll',
            style: {
              overflowX: Pe ? 'scroll' : 'hidden',
              overflowY: De ? 'scroll' : 'hidden',
            },
            onScroll: Te,
            children: [
              e
                ? /* @__PURE__ */ p('div', {
                    className: 'wx-4VuBwK2D wx-header-wrapper',
                    children: /* @__PURE__ */ p(ys, {
                      contentWidth: Ie,
                      deltaLeft: Oe.dh,
                      columns: Oe.header,
                      columnStyle: l,
                      bodyHeight: Be - +t,
                    }),
                  })
                : null,
              /* @__PURE__ */ re('div', {
                ref: jt,
                className: 'wx-4VuBwK2D wx-body',
                style: { width: `${Ie}px`, height: `${Ae}px` },
                onMouseDown: (E) => Ne(E),
                children: [
                  r ? /* @__PURE__ */ p(zc, { overlay: r }) : null,
                  /* @__PURE__ */ p('div', {
                    ref: vt,
                    className: 'wx-4VuBwK2D wx-data',
                    style: {
                      paddingTop: `${be.d}px`,
                      paddingLeft: `${Oe.d}px`,
                    },
                    children: G.map((E, se) => {
                      const v = D.indexOf(E.id) !== -1,
                        N = ue === E.id,
                        z =
                          'wx-row' +
                          (u ? ' wx-autoheight' : '') +
                          (i ? ' ' + i(E) : '') +
                          (v ? ' wx-selected' : '') +
                          (N ? ' wx-inactive' : ''),
                        I = u
                          ? { minHeight: `${E.rowHeight || ee}px` }
                          : { height: `${E.rowHeight || ee}px` };
                      return /* @__PURE__ */ p(
                        'div',
                        {
                          className: 'wx-4VuBwK2D ' + z,
                          'data-id': E.id,
                          'data-context-id': E.id,
                          style: I,
                          role: 'row',
                          'aria-rowindex': se,
                          'aria-expanded': E.open,
                          'aria-level': q ? E.$level + 1 : void 0,
                          'aria-selected': q ? v : void 0,
                          tabIndex: -1,
                          children: Oe.data.map((P) =>
                            P.collapsed
                              ? /* @__PURE__ */ p(
                                  'div',
                                  {
                                    className:
                                      'wx-4VuBwK2D wx-cell wx-collapsed',
                                  },
                                  P.id,
                                )
                              : R?.id === E.id && R.column == P.id
                                ? /* @__PURE__ */ p(
                                    Gc,
                                    { row: E, column: P },
                                    P.id,
                                  )
                                : /* @__PURE__ */ p(
                                    Ec,
                                    {
                                      row: E,
                                      column: P,
                                      columnStyle: l,
                                      cellStyle: a,
                                      reorder: j,
                                      focusable:
                                        xt?.row === E.id && xt?.column == P.id,
                                    },
                                    P.id,
                                  ),
                          ),
                        },
                        E.id,
                      );
                    }),
                  }),
                ],
              }),
              t && (y || []).length
                ? /* @__PURE__ */ p(ys, {
                    type: 'footer',
                    contentWidth: Ie,
                    deltaLeft: Oe.df,
                    columns: Oe.footer,
                    columnStyle: l,
                  })
                : null,
            ],
          }),
        }),
      }),
      T
        ? /* @__PURE__ */ p(Kc, {
            config: T,
            rowStyle: i,
            columnStyle: l,
            cellStyle: a,
            header: e,
            footer: t,
            reorder: j,
          })
        : null,
    ],
  });
}
const Uc = (n) =>
    n
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  qc = Dt(function (
    {
      data: n = [],
      columns: e = [],
      rowStyle: t = null,
      columnStyle: r = null,
      cellStyle: s = null,
      selectedRows: o,
      select: i = !0,
      multiselect: l = !1,
      header: a = !0,
      footer: u = !1,
      dynamic: c = null,
      overlay: d = null,
      reorder: f = !1,
      onReorder: g = null,
      autoRowHeight: m = !1,
      sizes: h,
      split: x,
      tree: w = !1,
      autoConfig: y = !1,
      init: k = null,
      responsive: b = null,
      sortMarks: D,
      undo: S = !1,
      hotkeys: C = null,
      ...R
    },
    q,
  ) {
    const _ = W();
    _.current = R;
    const T = $(() => new qa(Hs), []),
      F = $(() => T.in, [T]),
      j = W(null);
    j.current === null &&
      ((j.current = new Fs((B, Z) => {
        const he = 'on' + Uc(B);
        _.current && _.current[he] && _.current[he](Z);
      })),
      F.setNext(j.current));
    const O = $(
        () => ({
          getState: T.getState.bind(T),
          getReactiveState: T.getReactive.bind(T),
          getStores: () => ({ data: T }),
          exec: F.exec,
          setNext: (B) => ((j.current = j.current.setNext(B)), j.current),
          intercept: F.intercept.bind(F),
          on: F.on.bind(F),
          detach: F.detach.bind(F),
          getRow: T.getRow.bind(T),
          getRowIndex: T.getRowIndex.bind(T),
          getColumn: T.getColumn.bind(T),
        }),
        [T, F],
      ),
      [J, K] = Q(0),
      [ae, Y] = Q(0),
      [U, ge] = Q(null),
      [A, ee] = Q(null),
      xe = $(() => {
        if (y && !e.length && n.length) {
          const B = n[0],
            Z = [];
          for (let he in B)
            if (he !== 'id' && he[0] !== '$') {
              let de = {
                id: he,
                header: he[0].toUpperCase() + he.slice(1),
              };
              typeof y == 'object' && (de = { ...de, ...y }), Z.push(de);
            }
          return Z;
        }
        return (A && A.columns) ?? e;
      }, [y, e, n, A]),
      ue = $(() => (A && A.sizes) ?? h, [A, h]),
      Me = M(
        (B) => {
          if ((K(B.width), Y(B.height), b)) {
            const Z =
              Object.keys(b)
                .map(Number)
                .sort((he, de) => he - de)
                .find((he) => B.width <= he) ?? null;
            Z !== U && (ee(b[Z]), ge(Z));
          }
        },
        [b, U],
      ),
      ke = Se(Ze.theme),
      X = W(0);
    return (
      V(() => {
        if (!X.current) k && k(O);
        else {
          const B = T.getState();
          T.init({
            data: n,
            columns: xe,
            split: x || B.split,
            sizes: ue || B.sizes,
            selectedRows: o || B.selectedRows,
            dynamic: c,
            tree: w,
            sortMarks: D || B.sortMarks,
            undo: S,
            reorder: f,
            _skin: ke,
            _select: i,
          });
        }
        X.current++;
      }, [T, n, xe, x, ue, o, c, w, D, S, f, ke, i, k, O]),
      X.current === 0 &&
        T.init({
          data: n,
          columns: xe,
          split: x || { left: 0 },
          sizes: ue || {},
          selectedRows: o || [],
          dynamic: c,
          tree: w,
          sortMarks: D || {},
          undo: S,
          reorder: f,
          _skin: ke,
          select: i,
        }),
      Et(
        q,
        () => ({
          ...O,
        }),
        [O],
      ),
      /* @__PURE__ */ p(ot.Provider, {
        value: O,
        children: /* @__PURE__ */ p(In, {
          words: oc,
          optional: !0,
          children: /* @__PURE__ */ p(jc, {
            header: a,
            footer: u,
            overlay: d,
            rowStyle: t,
            columnStyle: r,
            cellStyle: s,
            onReorder: g,
            multiselect: l,
            autoRowHeight: m,
            clientWidth: J,
            clientHeight: ae,
            responsiveLevel: U,
            resize: Me,
            hotkeys: C,
          }),
        }),
      })
    );
  });
function Xc({ item: n }) {
  return /* @__PURE__ */ re('div', {
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
function Qc({ columns: n = null, api: e, children: t }) {
  V(() => {
    cc('table-header', Xc);
  }, []);
  function r(a) {
    for (let u = a.header.length - 1; u >= 0; u--) {
      const c = a.header[u].text;
      if (c) return c;
    }
    return a.id;
  }
  function s(a) {
    const u = a.action;
    u && e.exec('hide-column', { id: u.id, mode: !u.hidden });
  }
  function o(a) {
    return a;
  }
  const i = dt(e, '_columns'),
    l = $(() => {
      if (e) {
        const a = Array.isArray(i) ? i : [];
        return (n ? a.filter((u) => n[u.id]) : a).map((u) => {
          const c = r(u);
          return {
            id: u.id,
            text: c,
            type: 'table-header',
            hidden: u.hidden,
          };
        });
      } else return [];
    }, [e, n, i]);
  return /* @__PURE__ */ p(Ao, {
    dataKey: 'headerId',
    options: l,
    onClick: s,
    at: 'point',
    resolver: o,
    children: typeof t == 'function' ? t() : t,
  });
}
yr(nt);
function Zc({ row: n, column: e }) {
  const t = Se(wt);
  function r(o, i) {
    return {
      justifyContent: i.align,
      paddingLeft: `${(o.$level - 1) * 20}px`,
    };
  }
  const s = e && e._cell;
  return /* @__PURE__ */ re('div', {
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
function ks({ column: n, cell: e }) {
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
function Jc(n) {
  const {
      readonly: e,
      compactMode: t,
      width: r = 0,
      display: s = 'all',
      columnWidth: o = 0,
      fullHeight: i,
      onTableAPIChange: l,
      multiTaskRows: a = !1,
      rowMapping: u = null,
      rowHeightOverrides: c = null,
    } = n,
    [d, f] = Ye(o),
    [g, m] = Q(),
    h = Se(Ze.i18n),
    x = $(() => h.getGroup('gantt'), [h]),
    w = Se(wt),
    y = oe(w, 'scrollTop'),
    k = oe(w, 'cellHeight'),
    b = oe(w, '_scrollTask'),
    D = oe(w, '_selected'),
    S = oe(w, 'area'),
    C = oe(w, '_tasks'),
    R = oe(w, '_scales'),
    q = oe(w, 'columns'),
    _ = oe(w, '_sort'),
    T = oe(w, 'calendar'),
    F = oe(w, 'durationUnit'),
    j = oe(w, 'splitTasks'),
    [O, J] = Q(null),
    K = $(() => {
      if (!C || !S) return [];
      if (a && u) {
        const L = /* @__PURE__ */ new Set();
        return C.filter((G) => {
          const le = u.taskRows.get(G.id) ?? G.id;
          return L.has(le) ? !1 : (L.add(le), !0);
        });
      }
      return C.slice(S.start, S.end);
    }, [C, S, a, u]),
    ae = M(
      (L, G) => {
        if (G === 'add-task')
          w.exec(G, {
            target: L,
            task: { text: x('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (G === 'open-task') {
          const le = K.find((we) => we.id === L);
          (le?.data || le?.lazy) && w.exec(G, { id: L, mode: !le.open });
        }
      },
      [K],
    ),
    Y = M(
      (L) => {
        const G = Ct(L),
          le = L.target.dataset.action;
        le && L.preventDefault(),
          G
            ? le === 'add-task' || le === 'open-task'
              ? ae(G, le)
              : w.exec('select-task', {
                  id: G,
                  toggle: L.ctrlKey || L.metaKey,
                  range: L.shiftKey,
                  show: !0,
                })
            : le === 'add-task' && ae(null, le);
      },
      [w, ae],
    ),
    U = W(null),
    ge = W(null),
    [A, ee] = Q(0),
    [xe, ue] = Q(!1);
  V(() => {
    const L = ge.current;
    if (!L || typeof ResizeObserver > 'u') return;
    const G = () => ee(L.clientWidth);
    G();
    const le = new ResizeObserver(G);
    return le.observe(L), () => le.disconnect();
  }, []);
  const Me = W(null),
    ke = M(
      (L) => {
        const G = L.id,
          { before: le, after: we } = L,
          Te = L.onMove;
        let Ne = le || we,
          Le = le ? 'before' : 'after';
        if (Te) {
          if (Le === 'after') {
            const Ge = w.getTask(Ne);
            Ge.data?.length &&
              Ge.open &&
              ((Le = 'before'), (Ne = Ge.data[0].id));
          }
          Me.current = { id: G, [Le]: Ne };
        } else Me.current = null;
        w.exec('move-task', {
          id: G,
          mode: Le,
          target: Ne,
          inProgress: Te,
        });
      },
      [w],
    ),
    X = $(() => S?.from ?? 0, [S]),
    B = $(() => R?.height ?? 0, [R]),
    Z = $(
      () => (!t && s !== 'grid' ? (d ?? 0) > (r ?? 0) : (d ?? 0) > (A ?? 0)),
      [t, s, d, r, A],
    ),
    he = $(() => {
      const L = {};
      return (
        (Z && s === 'all') || (s === 'grid' && Z)
          ? (L.width = d)
          : s === 'grid' && (L.width = '100%'),
        L
      );
    }, [Z, s, d]),
    de = $(() => (O && !K.find((L) => L.id === O.id) ? [...K, O] : K), [K, O]),
    ve = $(() => {
      let L = (q || []).map((we) => {
        we = { ...we };
        const Te = we.header;
        if (typeof Te == 'object') {
          const Ne = Te.text && x(Te.text);
          we.header = { ...Te, text: Ne };
        } else we.header = x(Te);
        if (we.cell && we.id !== 'text' && we.id !== 'add-task') {
          const Ne = we.cell;
          we.cell = (Le) => /* @__PURE__ */ p(Ne, { ...Le, api: w });
        }
        return we;
      });
      const G = L.findIndex((we) => we.id === 'text'),
        le = L.findIndex((we) => we.id === 'add-task');
      if (
        (G !== -1 && (L[G].cell && (L[G]._cell = L[G].cell), (L[G].cell = Zc)),
        le !== -1)
      ) {
        L[le].cell = L[le].cell || ks;
        const we = L[le].header;
        if (
          (typeof we != 'object' && (L[le].header = { text: we }),
          (L[le].header.cell = we.cell || ks),
          e)
        )
          L.splice(le, 1);
        else if (t) {
          const [Te] = L.splice(le, 1);
          L.unshift(Te);
        }
      }
      return L.length > 0 && (L[L.length - 1].resize = !1), L;
    }, [q, x, e, t, w]),
    _e = $(
      () =>
        s === 'all'
          ? `${r}px`
          : s === 'grid'
            ? 'calc(100% - 4px)'
            : ve.find((L) => L.id === 'add-task')
              ? '50px'
              : '0',
      [s, r, ve],
    ),
    Oe = $(() => {
      if (de && _?.length) {
        const L = {};
        return (
          _.forEach(({ key: G, order: le }, we) => {
            L[G] = {
              order: le,
              ...(_.length > 1 && { index: we }),
            };
          }),
          L
        );
      }
      return {};
    }, [de, _]),
    Ve = M(() => ve.some((L) => L.flexgrow && !L.hidden), []),
    Re = $(() => Ve(), [Ve, xe]),
    Pe = $(() => {
      let L = s === 'chart' ? ve.filter((le) => le.id === 'add-task') : ve;
      const G = s === 'all' ? r : A;
      if (!Re) {
        let le = d,
          we = !1;
        if (ve.some((Te) => Te.$width)) {
          let Te = 0;
          (le = ve.reduce(
            (Ne, Le) => (
              Le.hidden || ((Te += Le.width), (Ne += Le.$width || Le.width)), Ne
            ),
            0,
          )),
            Te > le && le > G && (we = !0);
        }
        if (we || le < G) {
          let Te = 1;
          return (
            we || (Te = (G - 50) / (le - 50 || 1)),
            L.map(
              (Ne) => (
                Ne.id !== 'add-task' &&
                  !Ne.hidden &&
                  (Ne.$width || (Ne.$width = Ne.width),
                  (Ne.width = Ne.$width * Te)),
                Ne
              ),
            )
          );
        }
      }
      return L;
    }, [s, ve, Re, d, r, A]),
    Be = M(
      (L) => {
        if (!Ve()) {
          const G = Pe.reduce(
            (le, we) => (
              L && we.$width && (we.$width = we.width),
              le + (we.hidden ? 0 : we.width)
            ),
            0,
          );
          G !== d && f(G);
        }
        ue(!0), ue(!1);
      },
      [Ve, Pe, d, f],
    ),
    H = M(() => {
      ve.filter((G) => G.flexgrow && !G.hidden).length === 1 &&
        ve.forEach((G) => {
          G.$width && !G.flexgrow && !G.hidden && (G.width = G.$width);
        });
    }, []),
    fe = M(
      (L) => {
        if (!e) {
          const G = Ct(L),
            le = rr(L, 'data-col-id');
          !(le && ve.find((Te) => Te.id == le))?.editor &&
            G &&
            w.exec('show-editor', { id: G });
        }
      },
      [w, e],
      // cols is defined later; relies on latest value at call time
    ),
    pe = $(() => (Array.isArray(D) ? D.map((L) => L.id) : []), [D]),
    ie = M(() => {
      if (U.current && de !== null) {
        const L = U.current.querySelector('.wx-body');
        L &&
          (a
            ? (L.style.top = '0px')
            : (L.style.top = -((y ?? 0) - (X ?? 0)) + 'px'));
      }
      ge.current && (ge.current.scrollTop = 0);
    }, [de, y, X, a]);
  V(() => {
    U.current && ie();
  }, [y, X, ie]),
    V(() => {
      const L = U.current;
      if (!L) return;
      const G = L.querySelector('.wx-table-box .wx-body');
      if (!G || typeof ResizeObserver > 'u') return;
      const le = new ResizeObserver(() => {
        ie();
      });
      return (
        le.observe(G),
        () => {
          le.disconnect();
        }
      );
    }, [Pe, he, s, _e, de, ie]),
    V(() => {
      if (!b || !g) return;
      const { id: L } = b,
        G = g.getState().focusCell;
      G &&
        G.row !== L &&
        U.current &&
        U.current.contains(document.activeElement) &&
        g.exec('focus-cell', {
          row: L,
          column: G.column,
        });
    }, [b, g]),
    V(() => {
      if (!a) return;
      const L = U.current;
      if (!L) return;
      const G = L.querySelector('.wx-table-box .wx-body');
      if (!G) return;
      const le = {
          attributes: !0,
          attributeFilter: ['style'],
          childList: !0,
        },
        we = () => {
          Ne.disconnect();
          let Le = 0;
          G.querySelectorAll('[data-id]').forEach((Je) => {
            const It = Je.getAttribute('data-id'),
              ut = (c && It && c[It]) || k;
            (Je.style.height = `${ut}px`),
              (Je.style.minHeight = `${ut}px`),
              (Le += ut);
          }),
            Le > 0 && (G.style.height = `${Le}px`),
            Ne.observe(G, le);
        };
      let Te = null;
      const Ne = new MutationObserver(() => {
        Te && cancelAnimationFrame(Te), (Te = requestAnimationFrame(we));
      });
      return (
        we(),
        () => {
          Ne.disconnect(), Te && cancelAnimationFrame(Te);
        }
      );
    }, [c, a, de, k]);
  const Fe = M(
      ({ id: L }) => {
        if (e) return !1;
        w.getTask(L).open && w.exec('open-task', { id: L, mode: !1 });
        const G = w.getState()._tasks.find((le) => le.id === L);
        if ((J(G || null), !G)) return !1;
      },
      [w, e],
    ),
    $e = M(
      ({ id: L, top: G }) => {
        Me.current
          ? ke({ ...Me.current, onMove: !1 })
          : w.exec('drag-task', {
              id: L,
              top: G + (X ?? 0),
              inProgress: !1,
            }),
          J(null);
      },
      [w, ke, X],
    ),
    be = M(
      ({ id: L, top: G, detail: le }) => {
        le && ke({ ...le, onMove: !0 }),
          w.exec('drag-task', {
            id: L,
            top: G + (X ?? 0),
            inProgress: !0,
          });
      },
      [w, ke, X],
    );
  V(() => {
    const L = U.current;
    return L
      ? sc(L, {
          start: Fe,
          end: $e,
          move: be,
          getTask: w.getTask,
        }).destroy
      : void 0;
  }, [w, Fe, $e, be]);
  const Ae = M(
      (L) => {
        const { key: G, isInput: le } = L;
        if (!le && (G === 'arrowup' || G === 'arrowdown'))
          return (L.eventSource = 'grid'), w.exec('hotkey', L), !1;
        if (G === 'enter') {
          const we = g?.getState().focusCell;
          if (we) {
            const { row: Te, column: Ne } = we;
            Ne === 'add-task'
              ? ae(Te, 'add-task')
              : Ne === 'text' && ae(Te, 'open-task');
          }
        }
      },
      [w, ae, g],
    ),
    De = W(null),
    Ie = () => {
      De.current = {
        setTableAPI: m,
        handleHotkey: Ae,
        sortVal: _,
        api: w,
        adjustColumns: H,
        setColumnWidth: Be,
        tasks: K,
        calendarVal: T,
        durationUnitVal: F,
        splitTasksVal: j,
        onTableAPIChange: l,
      };
    };
  Ie(),
    V(() => {
      Ie();
    }, [m, Ae, _, w, H, Be, K, T, F, j, l]);
  const qe = M((L) => {
    m(L),
      L.intercept('hotkey', (G) => De.current.handleHotkey(G)),
      L.intercept('scroll', () => !1),
      L.intercept('select-row', () => !1),
      L.intercept('sort-rows', (G) => {
        const le = De.current.sortVal,
          { key: we, add: Te } = G,
          Ne = le ? le.find((Ge) => Ge.key === we) : null;
        let Le = 'asc';
        return (
          Ne && (Le = !Ne || Ne.order === 'asc' ? 'desc' : 'asc'),
          w.exec('sort-tasks', {
            key: we,
            order: Le,
            add: Te,
          }),
          !1
        );
      }),
      L.on('resize-column', () => {
        De.current.setColumnWidth(!0);
      }),
      L.on('hide-column', (G) => {
        G.mode || De.current.adjustColumns(), De.current.setColumnWidth();
      }),
      L.intercept('update-cell', (G) => {
        const { id: le, column: we, value: Te } = G,
          Ne = De.current.tasks.find((Le) => Le.id === le);
        if (Ne) {
          const Le = { ...Ne };
          let Ge = Te;
          Ge && !isNaN(Ge) && !(Ge instanceof Date) && (Ge *= 1),
            (Le[we] = Ge),
            ko(
              Le,
              {
                calendar: De.current.calendarVal,
                durationUnit: De.current.durationUnitVal,
                splitTasks: De.current.splitTasksVal,
              },
              we,
            ),
            w.exec('update-task', {
              id: le,
              task: Le,
            });
        }
        return !1;
      }),
      l && l(L);
  }, []);
  return /* @__PURE__ */ p('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${_e}` },
    ref: ge,
    children: /* @__PURE__ */ p('div', {
      ref: U,
      style: he,
      className: 'wx-rHj6070p wx-table',
      onClick: Y,
      onDoubleClick: fe,
      children: /* @__PURE__ */ p(qc, {
        init: qe,
        sizes: {
          rowHeight: k,
          headerHeight: (B ?? 0) - 1,
        },
        rowStyle: (L) =>
          L.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (L) =>
          `wx-rHj6070p wx-text-${L.align}${L.id === 'add-task' ? ' wx-action' : ''}`,
        data: de,
        columns: Pe,
        selectedRows: [...pe],
        sortMarks: Oe,
      }),
    }),
  });
}
function eu({ borders: n = '', rowLayout: e = null }) {
  const t = Se(wt),
    r = oe(t, 'cellWidth'),
    s = oe(t, 'cellHeight'),
    o = W(null),
    [i, l] = Q('#e4e4e4');
  V(() => {
    if (typeof getComputedStyle < 'u' && o.current) {
      const c = getComputedStyle(o.current).getPropertyValue(
        '--wx-gantt-border',
      );
      l(c ? c.substring(c.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const a = $(() => {
    if (!e) return null;
    const c = [];
    let d = 0;
    for (const f of e) (d += f.height), c.push(d);
    return c;
  }, [e]);
  if (!a) {
    const c = {
      width: '100%',
      height: '100%',
      background: r != null && s != null ? `url(${aa(r, s, i, n)})` : void 0,
      position: 'absolute',
    };
    return /* @__PURE__ */ p('div', { ref: o, style: c });
  }
  const u = r
    ? `repeating-linear-gradient(to right, transparent 0px, transparent ${r - 1}px, ${i} ${r - 1}px, ${i} ${r}px)`
    : void 0;
  return /* @__PURE__ */ re('div', {
    ref: o,
    style: { width: '100%', height: '100%', position: 'absolute' },
    children: [
      /* @__PURE__ */ p('div', {
        style: {
          width: '100%',
          height: '100%',
          background: u,
          position: 'absolute',
        },
      }),
      a.map((c, d) =>
        /* @__PURE__ */ p(
          'div',
          {
            style: {
              position: 'absolute',
              top: `${c}px`,
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
function tu({ onSelectLink: n, selectedLink: e, readonly: t }) {
  const r = Se(wt),
    s = oe(r, '_links'),
    o = oe(r, 'criticalPath'),
    i = W(null),
    l = M(
      (a) => {
        const u = a?.target?.classList;
        !u?.contains('wx-line') && !u?.contains('wx-delete-button') && n(null);
      },
      [n],
    );
  return (
    V(() => {
      if (!t && e && i.current) {
        const a = (u) => {
          i.current && !i.current.contains(u.target) && l(u);
        };
        return (
          document.addEventListener('click', a),
          () => {
            document.removeEventListener('click', a);
          }
        );
      }
    }, [t, e, l]),
    /* @__PURE__ */ re('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (s || []).map((a) => {
          const u =
            'wx-dkx3NwEn wx-line' +
            (o && a.$critical ? ' wx-critical' : '') +
            (t ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ p(
            'polyline',
            {
              className: u,
              points: a.$p,
              onClick: () => !t && n(a.id),
              'data-link-id': a.id,
            },
            a.id,
          );
        }),
        !t &&
          e &&
          /* @__PURE__ */ p('polyline', {
            ref: i,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: e.$p,
          }),
      ],
    })
  );
}
function nu(n) {
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
      l = e.segments;
    let a = 0,
      u = 0,
      c = null;
    do {
      const d = l[u];
      u === o &&
        (a > i ? (c = 0) : (c = Math.min((i - a) / d.duration, 1) * 100)),
        (a += d.duration),
        u++;
    } while (c === null && u < l.length);
    return c || 0;
  }
  return /* @__PURE__ */ p('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: e.segments.map((o, i) =>
      /* @__PURE__ */ re(
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
let Qn = [],
  Zn = null,
  bs = null;
const Ss = (n, e, t, r) => n < r && e > t,
  $s = (n, e) => {
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
      l = Math.floor(n / r),
      a = new Date(t.getTime() + l * i * o);
    return a.setUTCHours(0, 0, 0, 0), a;
  },
  ru = (n, e, t) => {
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
  su = (n, e, t) => {
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
      l = new Date(n.getTime() + e * i);
    return l.setUTCHours(0, 0, 0, 0), l;
  };
function ou(n) {
  const {
      readonly: e,
      taskTemplate: t,
      multiTaskRows: r = !1,
      rowMapping: s = null,
      rowHeightOverrides: o = null,
      allowTaskIntersection: i = !0,
      summaryBarCounts: l = !1,
      marqueeSelect: a = !1,
      copyPaste: u = !1,
    } = n,
    c = Se(wt),
    [d, f] = Sn(c, '_tasks'),
    [g, m] = Sn(c, '_links'),
    h = oe(c, 'area'),
    x = oe(c, '_scales'),
    w = oe(c, 'taskTypes'),
    y = oe(c, 'baselines'),
    k = oe(c, '_selected'),
    b = oe(c, '_scrollTask'),
    D = oe(c, 'criticalPath'),
    S = oe(c, 'tasks'),
    C = oe(c, 'schedule'),
    R = oe(c, 'splitTasks'),
    q = oe(c, 'summary'),
    _ = $(() => {
      if (!h || !Array.isArray(d)) return [];
      const v = h.start ?? 0,
        N = h.end ?? 0;
      return r && s
        ? d.map((z) => ({ ...z }))
        : d.slice(v, N).map((z) => ({ ...z }));
    }, [f, h, r, s]),
    T = oe(c, 'cellHeight'),
    F = $(() => {
      if (!r || !s || !_.length) return _;
      const v = /* @__PURE__ */ new Map(),
        N = [];
      d.forEach((ne) => {
        const me = s.taskRows.get(ne.id) ?? ne.id;
        v.has(me) || (v.set(me, N.length), N.push(me));
      });
      const z = /* @__PURE__ */ new Map();
      _.forEach((ne) => {
        if (ne.type === 'summary') return;
        const me = s.taskRows.get(ne.id) ?? ne.id;
        z.has(me) || z.set(me, []), z.get(me).push(ne);
      });
      const I = /* @__PURE__ */ new Map(),
        P = /* @__PURE__ */ new Map();
      z.forEach((ne, me) => {
        const ye = [],
          ze = [...ne].sort((Ee, We) => (Ee.$x ?? 0) - (We.$x ?? 0));
        for (const Ee of ze) {
          const We = Ee.$x ?? 0,
            rt = We + (Ee.$w ?? 0);
          let Ke = !1;
          for (let je = 0; je < ye.length; je++)
            if (
              !ye[je].some((at) => {
                const bt = at.$x ?? 0,
                  Yn = bt + (at.$w ?? 0);
                return Ss(We, rt, bt, Yn);
              })
            ) {
              ye[je].push(Ee), I.set(Ee.id, je), (Ke = !0);
              break;
            }
          Ke || (ye.push([Ee]), I.set(Ee.id, ye.length - 1));
        }
        P.set(me, ye.length);
      });
      const te = /* @__PURE__ */ new Map();
      let ce = 0;
      for (const ne of N) {
        te.set(ne, ce);
        const me = (o && o[ne]) || T;
        ce += me;
      }
      return _.map((ne) => {
        const me = s.taskRows.get(ne.id) ?? ne.id,
          ye = te.get(me) ?? 0;
        if (ne.type === 'summary') {
          if ((z.get(me) || []).length > 0) return { ...ne, $y: ye, $skip: !0 };
          const je = (o && o[me]) || T,
            st = Math.max(0, Math.floor((je - ne.$h) / 2));
          return {
            ...ne,
            $y: ye + st,
            $y_base: ne.$y_base !== void 0 ? ye + st : void 0,
          };
        }
        const ze = P.get(me) || 1,
          Ee = I.get(ne.id) ?? 0;
        if (ze > 1) {
          const st = ne.$h + 4,
            at = ye + 3 + Ee * st;
          return {
            ...ne,
            $y: at,
            $y_base: ne.$y_base !== void 0 ? at : void 0,
          };
        }
        const We = (o && o[me]) || T,
          rt = Math.max(0, Math.round((We - ne.$h) / 2));
        return {
          ...ne,
          $y: ye + rt,
          $y_base: ne.$y_base !== void 0 ? ye + rt : void 0,
        };
      });
    }, [_, r, s, d, T, o]),
    j = $(() => x.lengthUnitWidth, [x]),
    O = $(() => x.lengthUnit || 'day', [x]),
    J = $(() => {
      const v = /* @__PURE__ */ new Set();
      if (i || !r || !s) return v;
      const N = /* @__PURE__ */ new Map();
      return (
        d.forEach((z) => {
          if (z.type === 'summary' || z.type === 'milestone') return;
          const I = s.taskRows.get(z.id) ?? z.id;
          N.has(I) || N.set(I, []), N.get(I).push(z);
        }),
        N.forEach((z) => {
          if (!(z.length < 2))
            for (let I = 0; I < z.length; I++)
              for (let P = I + 1; P < z.length; P++) {
                const te = z[I],
                  ce = z[P];
                Ss(te.$x, te.$x + te.$w, ce.$x, ce.$x + ce.$w) &&
                  (v.add(te.id), v.add(ce.id));
              }
        }),
        v
      );
    }, [i, r, s, d, f]),
    K = $(() => {
      if (!l || !d?.length || !j) return null;
      const v = /* @__PURE__ */ new Map(),
        N = /* @__PURE__ */ new Set();
      d.forEach((I) => {
        I.type === 'summary' && N.add(I.id),
          I.parent &&
            I.parent !== 0 &&
            I.type !== 'summary' &&
            (v.has(I.parent) || v.set(I.parent, []), v.get(I.parent).push(I));
      });
      const z = /* @__PURE__ */ new Map();
      return (
        N.forEach((I) => {
          const P = v.get(I);
          if (!P?.length) return;
          const te = /* @__PURE__ */ new Map();
          P.forEach((ce) => {
            if (ce.$x == null || ce.$w == null) return;
            const ne = Math.floor(ce.$x / j),
              me = Math.ceil((ce.$x + ce.$w) / j);
            for (let ye = ne; ye < me; ye++) te.set(ye, (te.get(ye) || 0) + 1);
          }),
            te.size > 0 && z.set(I, te);
        }),
        z
      );
    }, [l, d, j]),
    [ae, Y] = Q(null),
    U = W(null),
    [ge, A] = Q(null),
    [ee, xe] = Q(null),
    [ue, Me] = Q(null),
    ke = W(null);
  ke.current = ue;
  const X = W(0),
    B = W(!1),
    [Z, he] = Q(void 0),
    [de, ve] = Q(null),
    _e = W(null),
    [Oe, Ve] = Q(null),
    Re = $(
      () =>
        Oe && {
          ...g.find((v) => v.id === Oe),
        },
      [Oe, m],
    ),
    [Pe, Be] = Q(void 0),
    H = W(null),
    [fe, pe] = Q(0),
    ie = W(null),
    Fe = $(() => {
      const v = ie.current;
      return !!(k.length && v && v.contains(document.activeElement));
    }, [k, ie.current]),
    $e = $(() => Fe && k[k.length - 1]?.id, [Fe, k]);
  V(() => {
    if (b && Fe && b) {
      const { id: v } = b,
        N = ie.current?.querySelector(`.wx-bar[data-id='${v}']`);
      N && N.focus({ preventScroll: !0 });
    }
  }, [b]),
    V(() => {
      const v = ie.current;
      if (v && (pe(v.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const N = new ResizeObserver((z) => {
          z[0] && pe(z[0].contentRect.width);
        });
        return N.observe(v), () => N.disconnect();
      }
    }, [ie.current]);
  const be = M(() => {
      document.body.style.userSelect = 'none';
    }, []),
    Ae = M(() => {
      document.body.style.userSelect = '';
    }, []),
    De = $(() => {
      if (!r || !s || !d?.length) return /* @__PURE__ */ new Map();
      const v = /* @__PURE__ */ new Map(),
        N = /* @__PURE__ */ new Map(),
        z = [];
      return (
        d.forEach((I) => {
          const P = s.taskRows.get(I.id) ?? I.id;
          N.has(P) || (N.set(P, z.length), z.push(P));
        }),
        d.forEach((I) => {
          const P = s.taskRows.get(I.id) ?? I.id,
            te = N.get(P) ?? 0;
          v.set(I.id, te * T);
        }),
        v
      );
    }, [d, r, s, T]),
    Ie = $(() => {
      if (!r || !s || !d?.length) return /* @__PURE__ */ new Map();
      const v = /* @__PURE__ */ new Map(),
        N = /* @__PURE__ */ new Map(),
        z = [];
      return (
        d.forEach((I) => {
          const P = s.taskRows.get(I.id) ?? I.id;
          N.has(P) || (N.set(P, z.length), z.push(P));
        }),
        d.forEach((I) => {
          const P = I.row ?? I.id;
          if (!v.has(P)) {
            const te = s.taskRows.get(I.id) ?? I.id,
              ce = N.get(te) ?? 0;
            v.set(P, ce * T);
          }
        }),
        v
      );
    }, [d, r, s, T]),
    qe = M(
      (v) => {
        if (!ie.current) return [];
        const N = Math.min(v.startX, v.currentX),
          z = Math.max(v.startX, v.currentX),
          I = Math.min(v.startY, v.currentY),
          P = Math.max(v.startY, v.currentY);
        return d.filter((te) => {
          const ce = te.$x,
            ne = te.$x + te.$w,
            ye = De.get(te.id) ?? te.$y,
            ze = ye + te.$h;
          return ce < z && ne > N && ye < P && ze > I;
        });
      },
      [d, De],
    ),
    L = M(() => {
      if (!u) return;
      const v = c.getState()._selected;
      if (!v || !v.length) return;
      const N = 864e5,
        z = v
          .map((ne) => {
            if (!c.getTask(ne.id)) return null;
            const ye = d.find((Yn) => Yn.id === ne.id);
            if (!ye) return null;
            const {
                $x: ze,
                $y: Ee,
                $h: We,
                $w: rt,
                $skip: Ke,
                $level: je,
                ...st
              } = ye,
              at =
                ye.end && ye.start
                  ? Math.round((ye.end.getTime() - ye.start.getTime()) / N)
                  : 0,
              bt = ye.start ? (ye.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...st,
              _durationDays: at,
              _startDayOfWeek: bt,
              _originalWidth: rt,
              _originalHeight: We,
            };
          })
          .filter(Boolean);
      if (!z.length) return;
      const P = z[0].parent,
        te = z.filter((ne) => ne.parent === P);
      if (te.length === 0) return;
      const ce = te.reduce(
        (ne, me) => (me.start && (!ne || me.start < ne) ? me.start : ne),
        null,
      );
      (Qn = te.map((ne) => ({
        ...ne,
        _startCellOffset: ru(ne.start, ce, x),
      }))),
        (bs = P),
        (Zn = ce);
    }, [u, c, d, x]),
    G = M(
      (v, N, z) => {
        if (!N.length || !v || z == null) return;
        const I = 864e5,
          P = c.getHistory();
        P?.startBatch();
        const te = new Date(v);
        te.setUTCHours(0, 0, 0, 0),
          N.forEach((ce, ne) => {
            const me = `task-${Date.now()}-${ne}`,
              ye = su(te, ce._startCellOffset || 0, x),
              ze = new Date(ye.getTime() + (ce._startDayOfWeek || 0) * I);
            ze.setUTCHours(0, 0, 0, 0);
            const Ee = new Date(ze.getTime() + (ce._durationDays || 7) * I);
            Ee.setUTCHours(0, 0, 0, 0),
              c.exec('add-task', {
                task: {
                  id: me,
                  text: ce.text,
                  start: ze,
                  end: Ee,
                  type: ce.type || 'task',
                  parent: z,
                  row: ce.row,
                },
                target: z,
                mode: 'child',
                skipUndo: ne > 0,
              });
          }),
          P?.endBatch();
      },
      [c, x],
    );
  V(
    () =>
      u
        ? c.intercept('hotkey', (N) => {
            if (N.key === 'ctrl+c' || N.key === 'meta+c') return L(), !1;
            if (N.key === 'ctrl+v' || N.key === 'meta+v')
              return (
                !Qn.length ||
                  !Zn ||
                  xe({
                    tasks: Qn,
                    baseDate: Zn,
                    parent: bs,
                    currentX: X.current,
                  }),
                !1
              );
          })
        : void 0,
    [u, c, L],
  ),
    V(() => {
      if (!ee) return;
      const v = (N) => {
        N.key === 'Escape' &&
          (N.preventDefault(), N.stopPropagation(), xe(null));
      };
      return (
        document.addEventListener('keydown', v, !0),
        () => document.removeEventListener('keydown', v, !0)
      );
    }, [ee]);
  const le = M(
      (v, N, z) => {
        if (
          N.target.classList.contains('wx-line') ||
          (z || (z = c.getTask($t(v))),
          z.type === 'milestone' || z.type === 'summary')
        )
          return '';
        const I = Qe(N, 'data-segment');
        I && (v = I);
        const { left: P, width: te } = v.getBoundingClientRect(),
          ce = (N.clientX - P) / te;
        let ne = 0.2 / (te > 200 ? te / 200 : 1);
        return ce < ne ? 'start' : ce > 1 - ne ? 'end' : '';
      },
      [c],
    ),
    we = M(
      (v, N) => {
        const { clientX: z } = N,
          I = $t(v),
          P = c.getTask(I),
          te = N.target.classList;
        if (
          !N.target.closest('.wx-delete-button') &&
          !N.target.closest('[data-interactive]') &&
          !(te.contains('wx-link') || N.target.closest('.wx-link')) &&
          !e
        ) {
          if (te.contains('wx-progress-marker')) {
            const { progress: ce } = c.getTask(I);
            (_e.current = {
              id: I,
              x: z,
              progress: ce,
              dx: 0,
              node: v,
              marker: N.target,
            }),
              N.target.classList.add('wx-progress-in-drag');
          } else {
            const ce = le(v, N, P) || 'move',
              ne = {
                id: I,
                mode: ce,
                x: z,
                dx: 0,
                l: P.$x,
                w: P.$w,
              };
            if (R && P.segments?.length) {
              const me = Qe(N, 'data-segment');
              me && (ne.segmentIndex = me.dataset.segment * 1);
            }
            ve(ne);
          }
          be();
        }
      },
      [c, e, le, be, R],
    ),
    Te = M(
      (v) => {
        if (v.button !== 0 || ee) return;
        const N = Qe(v);
        if (!N && a && !e) {
          const z = ie.current;
          if (!z) return;
          const I = z.getBoundingClientRect(),
            P = v.clientX - I.left,
            te = v.clientY - I.top;
          if (u) {
            const ne = $s(P, x);
            ne && ((ke.current = ne), Me(ne));
          }
          const ce = {
            startX: P,
            startY: te,
            currentX: P,
            currentY: te,
            ctrlKey: v.ctrlKey || v.metaKey,
          };
          Y(ce), (U.current = ce), be();
          return;
        }
        if (N && a && !e && k.length > 1) {
          const z = $t(N);
          if (k.some((P) => P.id === z)) {
            A({
              startX: v.clientX,
              ids: k.map((P) => P.id),
              tasks: k.map((P) => {
                const te = c.getTask(P.id);
                return {
                  id: P.id,
                  start: te.start,
                  end: te.end,
                  $x: te.$x,
                  $w: te.$w,
                };
              }),
            }),
              be();
            return;
          }
        }
        N && we(N, v);
      },
      [we, a, u, e, ee, x, k, c, be],
    ),
    Ne = M(
      (v) => {
        const N = Qe(v);
        N &&
          (H.current = setTimeout(() => {
            Be(!0), we(N, v.touches[0]);
          }, 300));
      },
      [we],
    ),
    Le = M((v) => {
      Ve(v);
    }, []),
    Ge = M(() => {
      const v = U.current;
      if (v) {
        const N = qe(v);
        v.ctrlKey
          ? N.forEach((z) => {
              c.exec('select-task', { id: z.id, toggle: !0, marquee: !0 });
            })
          : (k.length > 0 && c.exec('select-task', { id: null, marquee: !0 }),
            N.forEach((z, I) => {
              c.exec('select-task', {
                id: z.id,
                toggle: I > 0,
                marquee: !0,
              });
            })),
          Y(null),
          (U.current = null),
          Ae(),
          (B.current = !0);
        return;
      }
      if (ge) {
        const { ids: N, tasks: z, startX: I } = ge;
        A(null), Ae(), (B.current = !0);
        return;
      }
      if (_e.current) {
        const { dx: N, id: z, marker: I, value: P } = _e.current;
        (_e.current = null),
          typeof P < 'u' &&
            N &&
            c.exec('update-task', {
              id: z,
              task: { progress: P },
              inProgress: !1,
            }),
          I.classList.remove('wx-progress-in-drag'),
          (B.current = !0),
          Ae();
      } else if (de) {
        const {
          id: N,
          mode: z,
          dx: I,
          l: P,
          w: te,
          start: ce,
          segment: ne,
          index: me,
        } = de;
        if ((ve(null), ce)) {
          const ye = Math.round(I / j);
          if (!ye)
            c.exec('drag-task', {
              id: N,
              width: te,
              left: P,
              inProgress: !1,
              ...(ne && { segmentIndex: me }),
            });
          else {
            let ze = {},
              Ee = c.getTask(N);
            ne && (Ee = Ee.segments[me]);
            const We = 1440 * 60 * 1e3,
              Ke =
                ye *
                (O === 'week'
                  ? 7
                  : O === 'month'
                    ? 30
                    : O === 'quarter'
                      ? 91
                      : O === 'year'
                        ? 365
                        : 1) *
                We;
            z === 'move'
              ? ((ze.start = new Date(Ee.start.getTime() + Ke)),
                (ze.end = new Date(Ee.end.getTime() + Ke)))
              : z === 'start'
                ? ((ze.start = new Date(Ee.start.getTime() + Ke)),
                  (ze.end = Ee.end))
                : z === 'end' &&
                  ((ze.start = Ee.start),
                  (ze.end = new Date(Ee.end.getTime() + Ke))),
              c.exec('update-task', {
                id: N,
                task: ze,
                ...(ne && { segmentIndex: me }),
              });
          }
          B.current = !0;
        }
        Ae();
      }
    }, [c, Ae, de, j, O]),
    Je = M(
      (v, N) => {
        const { clientX: z } = N;
        if (u && ie.current) {
          const I = ie.current.getBoundingClientRect();
          X.current = z - I.left;
        }
        if (ee && ie.current) {
          const I = ie.current.getBoundingClientRect();
          xe((P) => (P ? { ...P, currentX: z - I.left } : null));
        }
        if (ae) {
          const I = ie.current;
          if (!I) return;
          const P = I.getBoundingClientRect(),
            te = z - P.left,
            ce = N.clientY - P.top;
          Y((ne) => ({
            ...ne,
            currentX: te,
            currentY: ce,
          })),
            U.current && ((U.current.currentX = te), (U.current.currentY = ce));
          return;
        }
        if (!e)
          if (_e.current) {
            const { node: I, x: P, id: te } = _e.current,
              ce = (_e.current.dx = z - P),
              ne = Math.round((ce / I.offsetWidth) * 100);
            let me = _e.current.progress + ne;
            (_e.current.value = me = Math.min(Math.max(0, me), 100)),
              c.exec('update-task', {
                id: te,
                task: { progress: me },
                inProgress: !0,
              });
          } else if (de) {
            Le(null);
            const {
                mode: I,
                l: P,
                w: te,
                x: ce,
                id: ne,
                start: me,
                segment: ye,
                index: ze,
              } = de,
              Ee = c.getTask(ne),
              We = z - ce,
              rt = Math.round(j) || 1;
            if (
              (!me && Math.abs(We) < 20) ||
              (I === 'start' && te - We < rt) ||
              (I === 'end' && te + We < rt) ||
              (I === 'move' &&
                ((We < 0 && P + We < 0) || (We > 0 && P + te + We > fe))) ||
              de.segment
            )
              return;
            const Ke = { ...de, dx: We };
            let je, st;
            if (
              (I === 'start'
                ? ((je = P + We), (st = te - We))
                : I === 'end'
                  ? ((je = P), (st = te + We))
                  : I === 'move' && ((je = P + We), (st = te)),
              c.exec('drag-task', {
                id: ne,
                width: st,
                left: je,
                inProgress: !0,
                start: me,
                ...(ye && { segmentIndex: ze }),
              }),
              !Ke.start &&
                ((I === 'move' && Ee.$x == P) || (I !== 'move' && Ee.$w == te)))
            ) {
              (B.current = !0), Ge();
              return;
            }
            (Ke.start = !0), ve(Ke);
          } else {
            const I = Qe(v);
            if (I) {
              const P = c.getTask($t(I)),
                ce = Qe(v, 'data-segment') || I,
                ne = le(ce, N, P);
              ce.style.cursor = ne && !e ? 'col-resize' : 'pointer';
            }
          }
      },
      [c, e, de, j, fe, le, Le, Ge],
    ),
    It = M(
      (v) => {
        Je(v, v);
      },
      [Je],
    ),
    ut = M(
      (v) => {
        Pe
          ? (v.preventDefault(), Je(v, v.touches[0]))
          : H.current && (clearTimeout(H.current), (H.current = null));
      },
      [Pe, Je],
    ),
    Vt = M(() => {
      Ge();
    }, [Ge]),
    On = M(() => {
      Be(null),
        H.current && (clearTimeout(H.current), (H.current = null)),
        Ge();
    }, [Ge]);
  V(
    () => (
      window.addEventListener('mouseup', Vt),
      () => {
        window.removeEventListener('mouseup', Vt);
      }
    ),
    [Vt],
  );
  const Wn = M(
      (v) => {
        if (!e) {
          if (v.target.closest('[data-interactive]')) return;
          const N = Ct(v.target);
          if (N && !v.target.classList.contains('wx-link')) {
            const z = Ct(v.target, 'data-segment');
            c.exec('show-editor', {
              id: N,
              ...(z !== null && { segmentIndex: z }),
            });
          }
        }
      },
      [c, e],
    ),
    Fn = ['e2s', 's2s', 'e2e', 's2e'],
    Ht = M((v, N) => Fn[(v ? 1 : 0) + (N ? 0 : 2)], []),
    vt = M(
      (v, N) => {
        const z = Z.id,
          I = Z.start;
        return v === z
          ? !0
          : !!g.find(
              (P) => P.target == v && P.source == z && P.type === Ht(I, N),
            );
      },
      [Z, m, Ht],
    ),
    an = M(() => {
      Z && he(null);
    }, [Z]),
    xt = M(
      (v) => {
        if (B.current) {
          B.current = !1;
          return;
        }
        if (ee && ee.currentX != null) {
          const z = $s(ee.currentX, x);
          z && G(z, ee.tasks, ee.parent), xe(null);
          return;
        }
        if (v.target.closest('[data-interactive]')) return;
        const N = Ct(v.target);
        if (N) {
          const z = v.target.classList;
          if (z.contains('wx-link')) {
            const I = z.contains('wx-left');
            if (!Z) {
              he({ id: N, start: I });
              return;
            }
            Z.id !== N &&
              !vt(N, I) &&
              c.exec('add-link', {
                link: {
                  source: Z.id,
                  target: N,
                  type: Ht(Z.start, I),
                },
              });
          } else if (z.contains('wx-delete-button-icon'))
            c.exec('delete-link', { id: Oe }), Ve(null);
          else {
            let I;
            const P = Qe(v, 'data-segment');
            P && (I = P.dataset.segment * 1),
              c.exec('select-task', {
                id: N,
                toggle: v.ctrlKey || v.metaKey,
                range: v.shiftKey,
                segmentIndex: I,
              });
          }
        }
        an();
      },
      [c, Z, m, Re, vt, Ht, an],
    ),
    Kt = M((v) => {
      const N = {
        left: `${v.$x}px`,
        top: `${v.$y}px`,
        width: `${v.$w}px`,
        height: `${v.$h}px`,
      };
      return v.color && (N.backgroundColor = v.color), N;
    }, []),
    cn = M(
      (v) => ({
        left: `${v.$x_base}px`,
        top: `${v.$y_base}px`,
        width: `${v.$w_base}px`,
        height: `${v.$h_base}px`,
      }),
      [],
    ),
    un = M(
      (v) => {
        if (Pe || H.current) return v.preventDefault(), !1;
      },
      [Pe],
    ),
    kt = $(() => w.map((v) => v.id), [w]),
    jt = M(
      (v) => {
        let N = kt.includes(v) ? v : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(v) || (N = `task ${N}`), N
        );
      },
      [kt],
    ),
    dn = M(
      (v) => {
        c.exec(v.action, v.data);
      },
      [c],
    ),
    E = M((v) => D && S.byId(v).$critical, [D, S]),
    se = M(
      (v) => {
        if (C?.auto) {
          const N = S.getSummaryId(v, !0),
            z = S.getSummaryId(Z.id, !0);
          return (
            Z?.id &&
            !(Array.isArray(N) ? N : [N]).includes(Z.id) &&
            !(Array.isArray(z) ? z : [z]).includes(v)
          );
        }
        return Z;
      },
      [C, S, Z],
    );
  return /* @__PURE__ */ re('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${F.length ? F[0].$h : 0}px` },
    ref: ie,
    onContextMenu: un,
    onMouseDown: Te,
    onMouseMove: It,
    onTouchStart: Ne,
    onTouchMove: ut,
    onTouchEnd: On,
    onClick: xt,
    onDoubleClick: Wn,
    onDragStart: (v) => (v.preventDefault(), !1),
    children: [
      /* @__PURE__ */ p(tu, {
        onSelectLink: Le,
        selectedLink: Re,
        readonly: e,
      }),
      F.map((v) => {
        if (v.$skip && v.$skip_baseline) return null;
        const N = J.has(v.id),
          z =
            `wx-bar wx-${jt(v.type)}` +
            (Pe && de && v.id === de.id ? ' wx-touch' : '') +
            (Z && Z.id === v.id ? ' wx-selected' : '') +
            (E(v.id) ? ' wx-critical' : '') +
            (v.$reorder ? ' wx-reorder-task' : '') +
            (R && v.segments ? ' wx-split' : '') +
            (N ? ' wx-collision' : ''),
          I =
            'wx-link wx-left' +
            (Z ? ' wx-visible' : '') +
            (!Z || (!vt(v.id, !0) && se(v.id)) ? ' wx-target' : '') +
            (Z && Z.id === v.id && Z.start ? ' wx-selected' : '') +
            (E(v.id) ? ' wx-critical' : ''),
          P =
            'wx-link wx-right' +
            (Z ? ' wx-visible' : '') +
            (!Z || (!vt(v.id, !1) && se(v.id)) ? ' wx-target' : '') +
            (Z && Z.id === v.id && !Z.start ? ' wx-selected' : '') +
            (E(v.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ re(
          Ts,
          {
            children: [
              !v.$skip &&
                /* @__PURE__ */ re('div', {
                  className: 'wx-GKbcLEGA ' + z,
                  style: Kt(v),
                  'data-tooltip-id': v.id,
                  'data-id': v.id,
                  tabIndex: $e === v.id ? 0 : -1,
                  children: [
                    e
                      ? null
                      : v.id === Re?.target && Re?.type[2] === 's'
                        ? /* @__PURE__ */ p(gt, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ p('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ p('div', {
                            className: 'wx-GKbcLEGA ' + I,
                            children: /* @__PURE__ */ p('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    v.type !== 'milestone'
                      ? /* @__PURE__ */ re(He, {
                          children: [
                            v.progress && !(R && v.segments)
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ p('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${v.progress}%` },
                                  }),
                                })
                              : null,
                            !e &&
                            !(R && v.segments) &&
                            !(v.type == 'summary' && q?.autoProgress)
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${v.progress}% - 10px)`,
                                  },
                                  children: v.progress,
                                })
                              : null,
                            t
                              ? /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ p(t, {
                                    data: v,
                                    api: c,
                                    onAction: dn,
                                  }),
                                })
                              : R && v.segments
                                ? /* @__PURE__ */ p(nu, {
                                    task: v,
                                    type: jt(v.type),
                                  })
                                : /* @__PURE__ */ p('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: v.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ re(He, {
                          children: [
                            /* @__PURE__ */ p('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            t
                              ? /* @__PURE__ */ p(t, {
                                  data: v,
                                  api: c,
                                  onAction: dn,
                                })
                              : /* @__PURE__ */ p('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: v.text,
                                }),
                          ],
                        }),
                    e
                      ? null
                      : v.id === Re?.target && Re?.type[2] === 'e'
                        ? /* @__PURE__ */ p(gt, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ p('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ p('div', {
                            className: 'wx-GKbcLEGA ' + P,
                            children: /* @__PURE__ */ p('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    N &&
                      /* @__PURE__ */ p('div', {
                        className: 'wx-GKbcLEGA wx-collision-warning',
                        title:
                          'This task overlaps with another task in the same row',
                        children: '!',
                      }),
                    K &&
                      v.type === 'summary' &&
                      (() => {
                        const te = K.get(v.id),
                          ce = Math.floor(v.$x / j),
                          ne = Math.ceil((v.$x + v.$w) / j);
                        return /* @__PURE__ */ p('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from(
                            { length: ne - ce },
                            (me, ye) => {
                              const ze = ce + ye,
                                Ee = te?.get(ze) || 0;
                              return /* @__PURE__ */ p(
                                'span',
                                {
                                  className: `wx-GKbcLEGA wx-week-count${Ee === 0 ? ' wx-week-count-zero' : ''}`,
                                  style: {
                                    position: 'absolute',
                                    left: `${ze * j - v.$x}px`,
                                    width: `${j}px`,
                                    top: 0,
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  },
                                  children: Ee,
                                },
                                ze,
                              );
                            },
                          ),
                        });
                      })(),
                  ],
                }),
              y && !v.$skip_baseline
                ? /* @__PURE__ */ p('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (v.type === 'milestone' ? ' wx-milestone' : ''),
                    style: cn(v),
                  })
                : null,
            ],
          },
          v.id,
        );
      }),
      ae &&
        (() => {
          const v = Math.min(ae.startX, ae.currentX),
            N = Math.min(ae.startY, ae.currentY),
            z = Math.abs(ae.currentX - ae.startX),
            I = Math.abs(ae.currentY - ae.startY);
          return /* @__PURE__ */ p('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${v}px`,
              top: `${N}px`,
              width: `${z}px`,
              height: `${I}px`,
            },
          });
        })(),
      ee &&
        ee.currentX != null &&
        ee.tasks.map((v, N) => {
          const I =
              (Math.floor(ee.currentX / j) + (v._startCellOffset || 0)) * j,
            P = v._originalWidth || j,
            te = v._originalHeight || T,
            ce = Ie.get(v.row) ?? (v.$y || 0);
          return /* @__PURE__ */ p(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: I, top: ce, width: P, height: te },
              children: /* @__PURE__ */ p('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: v.$barText || v.text,
              }),
            },
            `preview-${N}`,
          );
        }),
    ],
  });
}
function iu(n) {
  const { highlightTime: e, onScaleClick: t } = n,
    r = Se(wt),
    s = oe(r, '_scales');
  return /* @__PURE__ */ p('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: s.width },
    children: (s?.rows || []).map((o, i) =>
      /* @__PURE__ */ p(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${o.height}px` },
          children: (o.cells || []).map((l, a) => {
            const u = e ? e(l.date, l.unit) : '',
              c = 'wx-cell ' + (l.css || '') + ' ' + (u || '');
            return /* @__PURE__ */ p(
              'div',
              {
                className: 'wx-ZkvhDKir ' + c,
                style: {
                  width: `${l.width}px`,
                  cursor: t ? 'pointer' : void 0,
                },
                onClick: t ? (d) => t(l.date, l.unit, d.nativeEvent) : void 0,
                children: l.value,
              },
              a,
            );
          }),
        },
        i,
      ),
    ),
  });
}
const lu = /* @__PURE__ */ new Map();
function au(n) {
  const e = W(null),
    t = W(0),
    r = W(null),
    s = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()),
    t.current++,
    V(() => {
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
            lu.set(n, o),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: o }),
              );
          })),
          () => cancelAnimationFrame(r.current)
        );
    });
}
function cu(n) {
  const {
      readonly: e,
      fullWidth: t,
      fullHeight: r,
      taskTemplate: s,
      cellBorders: o,
      highlightTime: i,
      onScaleClick: l,
      multiTaskRows: a = !1,
      rowMapping: u = null,
      rowHeightOverrides: c = null,
      allowTaskIntersection: d = !0,
      summaryBarCounts: f = !1,
      marqueeSelect: g = !1,
      copyPaste: m = !1,
    } = n,
    h = Se(wt),
    [x, w] = Sn(h, '_selected'),
    y = oe(h, 'scrollTop'),
    k = oe(h, 'cellHeight'),
    b = oe(h, 'cellWidth'),
    D = oe(h, '_scales'),
    S = oe(h, '_markers'),
    C = oe(h, '_scrollTask'),
    R = oe(h, 'zoom'),
    [q, _] = Q(),
    T = W(null),
    F = oe(h, '_tasks'),
    j = 1 + (D?.rows?.length || 0),
    O = $(() => {
      if (!a || !u || !F?.length) return null;
      const X = /* @__PURE__ */ new Map(),
        B = /* @__PURE__ */ new Map(),
        Z = [];
      return (
        F.forEach((he) => {
          const de = u.taskRows.get(he.id) ?? he.id;
          B.has(de) || (B.set(de, Z.length), Z.push(de));
        }),
        F.forEach((he) => {
          const de = u.taskRows.get(he.id) ?? he.id,
            ve = B.get(de) ?? 0;
          X.set(he.id, ve * k);
        }),
        X
      );
    }, [F, a, u, k]),
    J = $(() => {
      const X = [];
      return (
        x &&
          x.length &&
          k &&
          x.forEach((B) => {
            const Z = O?.get(B.id) ?? B.$y;
            X.push({ height: `${k}px`, top: `${Z - 3}px` });
          }),
        X
      );
    }, [w, k, O]),
    K = $(() => Math.max(q || 0, r), [q, r]),
    ae = $(() => {
      if (
        !c ||
        !a ||
        !u ||
        !F?.length ||
        !Object.values(c).some((Z) => Z !== k)
      )
        return null;
      const B = [];
      return (
        F.forEach((Z) => {
          const he = u.taskRows.get(Z.id) ?? Z.id;
          B.includes(he) || B.push(he);
        }),
        B.map((Z) => ({
          id: Z,
          height: c[Z] || k,
        }))
      );
    }, [F, u, c, a, k]);
  V(() => {
    const X = T.current;
    X && typeof y == 'number' && (X.scrollTop = a ? 0 : y);
  }, [y, a]);
  const Y = () => {
    U();
  };
  function U(X) {
    const B = T.current;
    if (!B) return;
    const Z = {};
    (Z.left = B.scrollLeft), h.exec('scroll-chart', Z);
  }
  function ge() {
    const X = T.current,
      Z = Math.ceil((q || 0) / (k || 1)) + 1,
      he = Math.floor(((X && X.scrollTop) || 0) / (k || 1)),
      de = Math.max(0, he - j),
      ve = he + Z + j,
      _e = de * (k || 0);
    h.exec('render-data', {
      start: de,
      end: ve,
      from: _e,
    });
  }
  V(() => {
    ge();
  }, [q, y]);
  const A = M(
    (X) => {
      if (!X) return;
      const { id: B, mode: Z } = X;
      if (Z.toString().indexOf('x') < 0) return;
      const he = T.current;
      if (!he) return;
      const { clientWidth: de } = he,
        ve = h.getTask(B);
      if (ve.$x + ve.$w < he.scrollLeft)
        h.exec('scroll-chart', { left: ve.$x - (b || 0) }),
          (he.scrollLeft = ve.$x - (b || 0));
      else if (ve.$x >= de + he.scrollLeft) {
        const _e = de < ve.$w ? b || 0 : ve.$w;
        h.exec('scroll-chart', { left: ve.$x - de + _e }),
          (he.scrollLeft = ve.$x - de + _e);
      }
    },
    [h, b],
  );
  V(() => {
    A(C);
  }, [C]);
  function ee(X) {
    if (R && (X.ctrlKey || X.metaKey)) {
      X.preventDefault();
      const B = T.current,
        Z = -Math.sign(X.deltaY),
        he = X.clientX - (B ? B.getBoundingClientRect().left : 0);
      h.exec('zoom-scale', {
        dir: Z,
        offset: he,
      });
    }
  }
  function xe(X) {
    const B = i(X.date, X.unit);
    return B
      ? {
          css: B,
          width: X.width,
        }
      : null;
  }
  const ue = $(
      () =>
        D && (D.minUnit === 'hour' || D.minUnit === 'day') && i
          ? D.rows[D.rows.length - 1].cells.map(xe)
          : null,
      [D, i],
    ),
    Me = M(
      (X) => {
        (X.eventSource = 'chart'), h.exec('hotkey', X);
      },
      [h],
    );
  V(() => {
    const X = T.current;
    if (!X) return;
    const B = () => _(X.clientHeight);
    B();
    const Z = new ResizeObserver(() => B());
    return (
      Z.observe(X),
      () => {
        Z.disconnect();
      }
    );
  }, [T.current]);
  const ke = W(null);
  return (
    V(() => {
      const X = T.current;
      if (X && !ke.current)
        return (
          (ke.current = Rr(X, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (B) => Me(B),
          })),
          () => {
            ke.current?.destroy(), (ke.current = null);
          }
        );
    }, []),
    V(() => {
      const X = T.current;
      if (!X) return;
      const B = ee;
      return (
        X.addEventListener('wheel', B),
        () => {
          X.removeEventListener('wheel', B);
        }
      );
    }, [ee]),
    au('chart'),
    /* @__PURE__ */ re('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: T,
      onScroll: Y,
      children: [
        /* @__PURE__ */ p(iu, { highlightTime: i, onScaleClick: l, scales: D }),
        S && S.length
          ? /* @__PURE__ */ p('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${K}px` },
              children: S.map((X, B) =>
                /* @__PURE__ */ p(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${X.css || ''}`,
                    style: { left: `${X.left}px` },
                    children: /* @__PURE__ */ p('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: X.text,
                    }),
                  },
                  B,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ re('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${t}px`, height: `${K}px` },
          children: [
            ue
              ? /* @__PURE__ */ p('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: ue.map((X, B) =>
                    X
                      ? /* @__PURE__ */ p(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + X.css,
                            style: {
                              width: `${X.width}px`,
                              left: `${B * X.width}px`,
                            },
                          },
                          B,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ p(eu, { borders: o, rowLayout: ae }),
            x && x.length
              ? x.map((X, B) =>
                  X.$y
                    ? /* @__PURE__ */ p(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': X.id,
                          style: J[B],
                        },
                        X.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ p(ou, {
              readonly: e,
              taskTemplate: s,
              multiTaskRows: a,
              rowMapping: u,
              rowHeightOverrides: c,
              allowTaskIntersection: d,
              summaryBarCounts: f,
              marqueeSelect: g,
              copyPaste: m,
            }),
          ],
        }),
      ],
    })
  );
}
function uu(n) {
  const {
      position: e = 'after',
      size: t = 4,
      dir: r = 'x',
      onMove: s,
      onDisplayChange: o,
      compactMode: i,
      containerWidth: l = 0,
      leftThreshold: a = 50,
      rightThreshold: u = 50,
    } = n,
    [c, d] = Ye(n.value ?? 0),
    [f, g] = Ye(n.display ?? 'all');
  function m(Y) {
    let U = 0;
    e == 'center' ? (U = t / 2) : e == 'before' && (U = t);
    const ge = {
      size: [t + 'px', 'auto'],
      p: [Y - U + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (r != 'x') for (let A in ge) ge[A] = ge[A].reverse();
    return ge;
  }
  const [h, x] = Q(!1),
    [w, y] = Q(null),
    k = W(0),
    b = W(),
    D = W(),
    S = W(f);
  V(() => {
    S.current = f;
  }, [f]),
    V(() => {
      w === null && c > 0 && y(c);
    }, [w, c]);
  function C(Y) {
    return r == 'x' ? Y.clientX : Y.clientY;
  }
  const R = M(
      (Y) => {
        const U = b.current + C(Y) - k.current;
        d(U);
        let ge;
        U <= a ? (ge = 'chart') : l - U <= u ? (ge = 'grid') : (ge = 'all'),
          S.current !== ge && (g(ge), (S.current = ge)),
          D.current && clearTimeout(D.current),
          (D.current = setTimeout(() => s && s(U), 100));
      },
      [l, a, u, s],
    ),
    q = M(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        x(!1),
        window.removeEventListener('mousemove', R),
        window.removeEventListener('mouseup', q);
    }, [R]),
    _ = $(
      () => (f !== 'all' ? 'auto' : r == 'x' ? 'ew-resize' : 'ns-resize'),
      [f, r],
    ),
    T = M(
      (Y) => {
        (!i && (f === 'grid' || f === 'chart')) ||
          ((k.current = C(Y)),
          (b.current = c),
          x(!0),
          (document.body.style.cursor = _),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', R),
          window.addEventListener('mouseup', q));
      },
      [_, R, q, c, i, f],
    );
  function F() {
    g('all'), w !== null && (d(w), s && s(w));
  }
  function j(Y) {
    if (i) {
      const U = f === 'chart' ? 'grid' : 'chart';
      g(U), o(U);
    } else if (f === 'grid' || f === 'chart') F(), o('all');
    else {
      const U = Y === 'left' ? 'chart' : 'grid';
      g(U), o(U);
    }
  }
  function O() {
    j('left');
  }
  function J() {
    j('right');
  }
  const K = $(() => m(c), [c, e, t, r]),
    ae = [
      'wx-resizer',
      `wx-resizer-${r}`,
      `wx-resizer-display-${f}`,
      h ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ re('div', {
    className: 'wx-pFykzMlT ' + ae,
    onMouseDown: T,
    style: { width: K.size[0], height: K.size[1], cursor: _ },
    children: [
      /* @__PURE__ */ re('div', {
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
              onClick: J,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ p('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const du = 650;
function Yo(n) {
  let e;
  function t() {
    (e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= du;
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
function fu(n) {
  const {
      taskTemplate: e,
      readonly: t,
      cellBorders: r,
      highlightTime: s,
      onScaleClick: o,
      onTableAPIChange: i,
      multiTaskRows: l = !1,
      rowMapping: a = null,
      rowHeightOverrides: u = null,
      allowTaskIntersection: c = !0,
      summaryBarCounts: d = !1,
      marqueeSelect: f = !1,
      copyPaste: g = !1,
    } = n,
    m = Se(wt),
    h = oe(m, '_tasks'),
    x = oe(m, '_scales'),
    w = oe(m, 'cellHeight'),
    y = oe(m, 'columns'),
    k = oe(m, '_scrollTask'),
    b = oe(m, 'undo'),
    D = $(() => {
      if (!l) return a;
      const H = /* @__PURE__ */ new Map(),
        fe = /* @__PURE__ */ new Map();
      return (
        h.forEach((pe) => {
          const ie = pe.row ?? pe.id;
          fe.set(pe.id, ie), H.has(ie) || H.set(ie, []), H.get(ie).push(pe.id);
        }),
        { rowMap: H, taskRows: fe }
      );
    }, [h, l, a]),
    [S, C] = Q(!1);
  let [R, q] = Q(0);
  const [_, T] = Q(0),
    [F, j] = Q(0),
    [O, J] = Q(void 0),
    [K, ae] = Q('all'),
    Y = W(null),
    U = M(
      (H) => {
        C(
          (fe) => (
            H !== fe &&
              (H
                ? ((Y.current = K), K === 'all' && ae('grid'))
                : (!Y.current || Y.current === 'all') && ae('all')),
            H
          ),
        );
      },
      [K],
    );
  V(() => {
    const H = Yo(U);
    return (
      H.observe(),
      () => {
        H.disconnect();
      }
    );
  }, [U]);
  const ge = $(() => {
    let H;
    return (
      y.every((fe) => fe.width && !fe.flexgrow)
        ? (H = y.reduce((fe, pe) => fe + parseInt(pe.width), 0))
        : S && K === 'chart'
          ? (H = parseInt(y.find((fe) => fe.id === 'action')?.width) || 50)
          : (H = 440),
      (R = H),
      H
    );
  }, [y, S, K]);
  V(() => {
    q(ge);
  }, [ge]);
  const A = $(() => (_ ?? 0) - (O ?? 0), [_, O]),
    ee = $(() => x.width, [x]),
    xe = 14,
    ue = $(() => {
      let H;
      if (!l || !D) H = h.length * w;
      else {
        const fe = [];
        h.forEach((pe) => {
          const ie = D.taskRows.get(pe.id) ?? pe.id;
          fe.includes(ie) || fe.push(ie);
        }),
          (H = 0);
        for (const pe of fe) H += (u && u[pe]) || w;
      }
      return H + xe;
    }, [h, w, l, D, u]),
    Me = $(() => x.height + ue + A, [x, ue, A]),
    ke = $(() => R + ee, [R, ee]),
    X = W(null),
    B = W(!1),
    Z = W(null);
  V(() => {
    const H = () => {
      (B.current = !0),
        clearTimeout(Z.current),
        (Z.current = setTimeout(() => {
          B.current = !1;
        }, 300));
    };
    return (
      m.on('zoom-scale', H),
      m.on('set-scale', H),
      () => {
        clearTimeout(Z.current);
      }
    );
  }, [m]);
  const he = M(() => {
      Promise.resolve().then(() => {
        if (!B.current && (_ ?? 0) > (ke ?? 0)) {
          const H = (_ ?? 0) - R;
          m.exec('expand-scale', { minWidth: H });
        }
      });
    }, [_, ke, R, m]),
    de = W(he);
  (de.current = he),
    V(() => {
      let H;
      return (
        X.current &&
          ((H = new ResizeObserver(() => de.current())), H.observe(X.current)),
        () => {
          H && H.disconnect();
        }
      );
    }, [X.current]);
  const ve = W(null),
    _e = W(null),
    Oe = M(() => {
      const H = ve.current;
      H &&
        m.exec('scroll-chart', {
          top: H.scrollTop,
        });
    }, [m]),
    Ve = W({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  V(() => {
    Ve.current = {
      rTasks: h,
      rScales: x,
      rCellHeight: w,
      scrollSize: A,
      ganttDiv: ve.current,
      ganttHeight: F ?? 0,
    };
  }, [h, x, w, A, F]);
  const Re = M(
    (H) => {
      if (!H) return;
      const {
        rTasks: fe,
        rScales: pe,
        rCellHeight: ie,
        scrollSize: Fe,
        ganttDiv: $e,
        ganttHeight: be,
      } = Ve.current;
      if (!$e) return;
      const { id: Ae } = H,
        De = fe.findIndex((Ie) => Ie.id === Ae);
      if (De > -1) {
        const Ie = be - pe.height,
          qe = De * ie,
          L = $e.scrollTop;
        let G = null;
        qe < L ? (G = qe) : qe + ie > L + Ie && (G = qe - Ie + ie + Fe),
          G !== null &&
            (m.exec('scroll-chart', { top: Math.max(G, 0) }),
            (ve.current.scrollTop = Math.max(G, 0)));
      }
    },
    [m],
  );
  V(() => {
    Re(k);
  }, [k]),
    V(() => {
      const H = ve.current,
        fe = _e.current;
      if (!H || !fe) return;
      const pe = () => {
          Ko(() => {
            j(H.offsetHeight), T(H.offsetWidth), J(fe.offsetWidth);
          });
        },
        ie = new ResizeObserver(pe);
      return ie.observe(H), () => ie.disconnect();
    }, [ve.current]);
  const Pe = W(null),
    Be = W(null);
  return (
    V(() => {
      Be.current && (Be.current.destroy(), (Be.current = null));
      const H = Pe.current;
      if (H)
        return (
          (Be.current = Rr(H, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': b,
              'ctrl+y': b,
            },
            exec: (fe) => {
              fe.isInput || m.exec('hotkey', fe);
            },
          })),
          () => {
            Be.current?.destroy(), (Be.current = null);
          }
        );
    }, [b]),
    /* @__PURE__ */ p('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: ve,
      onScroll: Oe,
      children: /* @__PURE__ */ p('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: Me, width: '100%' },
        ref: _e,
        children: /* @__PURE__ */ p('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: F,
            width: O,
          },
          children: /* @__PURE__ */ re('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: Pe,
            children: [
              y.length
                ? /* @__PURE__ */ re(He, {
                    children: [
                      /* @__PURE__ */ p(Jc, {
                        display: K,
                        compactMode: S,
                        columnWidth: ge,
                        width: R,
                        readonly: t,
                        fullHeight: ue,
                        onTableAPIChange: i,
                        multiTaskRows: l,
                        rowMapping: D,
                        rowHeightOverrides: u,
                      }),
                      /* @__PURE__ */ p(uu, {
                        value: R,
                        display: K,
                        compactMode: S,
                        containerWidth: _,
                        onMove: (H) => q(H),
                        onDisplayChange: (H) => ae(H),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ p('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: X,
                children: /* @__PURE__ */ p(cu, {
                  readonly: t,
                  fullWidth: ee,
                  fullHeight: ue,
                  taskTemplate: e,
                  cellBorders: r,
                  highlightTime: s,
                  onScaleClick: o,
                  multiTaskRows: l,
                  rowMapping: D,
                  rowHeightOverrides: u,
                  allowTaskIntersection: c,
                  summaryBarCounts: d,
                  marqueeSelect: f,
                  copyPaste: g,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function hu(n) {
  return {
    year: '%Y',
    quarter: `${n('Q')} %Q`,
    month: '%M',
    week: `${n('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function gu(n, e) {
  return typeof n == 'function' ? n : ht(n, e);
}
function Bo(n, e) {
  return n.map(({ format: t, ...r }) => ({
    ...r,
    format: gu(t, e),
  }));
}
function pu(n, e) {
  const t = hu(e);
  for (let r in t) t[r] = ht(t[r], n);
  return t;
}
function mu(n, e) {
  if (!n || !n.length) return n;
  const t = ht('%d-%m-%Y', e);
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
function wu(n, e) {
  return n.levels
    ? {
        ...n,
        levels: n.levels.map((t) => ({
          ...t,
          scales: Bo(t.scales, e),
        })),
      }
    : n;
}
const xu = (n) =>
    n
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  yu = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  vu = [],
  ku = [],
  bu = [],
  Su = [],
  $u = { type: 'forward' },
  Cu = Dt(function (
    {
      taskTemplate: e = null,
      markers: t = vu,
      taskTypes: r = Pn,
      tasks: s = ku,
      selected: o = bu,
      activeTask: i = null,
      links: l = Su,
      scales: a = yu,
      columns: u = yo,
      start: c = null,
      end: d = null,
      lengthUnit: f = 'day',
      durationUnit: g = 'day',
      cellWidth: m = 100,
      cellHeight: h = 38,
      scaleHeight: x = 36,
      readonly: w = !1,
      cellBorders: y = 'full',
      zoom: k = !1,
      baselines: b = !1,
      highlightTime: D = null,
      onScaleClick: S = null,
      init: C = null,
      autoScale: R = !0,
      unscheduledTasks: q = !1,
      criticalPath: _ = null,
      schedule: T = $u,
      projectStart: F = null,
      projectEnd: j = null,
      calendar: O = null,
      undo: J = !1,
      splitTasks: K = !1,
      multiTaskRows: ae = !1,
      rowHeightOverrides: Y = null,
      allowTaskIntersection: U = !0,
      summaryBarCounts: ge = !1,
      marqueeSelect: A = !1,
      copyPaste: ee = !1,
      summary: xe = null,
      _export: ue = !1,
      ...Me
    },
    ke,
  ) {
    const X = W();
    X.current = Me;
    const B = $(() => new la(Hs), []),
      Z = $(() => ({ ...nn, ...Hn }), []),
      he = Se(Ze.i18n),
      de = $(() => (he ? he.extend(Z, !0) : Rt(Z)), [he, Z]),
      ve = $(() => de.getRaw().calendar, [de]),
      _e = $(() => {
        let $e = {
          zoom: wu(k, ve),
          scales: Bo(a, ve),
          columns: mu(u, ve),
          links: wo(l),
          cellWidth: m,
        };
        return (
          $e.zoom &&
            ($e = {
              ...$e,
              ...jl($e.zoom, pu(ve, de.getGroup('gantt')), $e.scales, m),
            }),
          $e
        );
      }, [k, a, u, l, m, ve, de]),
      Oe = W(null);
    Oe.current !== s &&
      (ue || fr(s, { durationUnit: g, calendar: O }), (Oe.current = s)),
      V(() => {
        ue || fr(s, { durationUnit: g, calendar: O });
      }, [s, g, O, K, ue]);
    const Ve = $(() => {
        if (!ae) return null;
        const $e = /* @__PURE__ */ new Map(),
          be = /* @__PURE__ */ new Map(),
          Ae = (De) => {
            De.forEach((Ie) => {
              const qe = Ie.row ?? Ie.id;
              be.set(Ie.id, qe),
                $e.has(qe) || $e.set(qe, []),
                $e.get(qe).push(Ie.id),
                Ie.data && Ie.data.length > 0 && Ae(Ie.data);
            });
          };
        return Ae(s), { rowMap: $e, taskRows: be };
      }, [s, ae]),
      Re = $(() => B.in, [B]),
      Pe = W(null);
    Pe.current === null &&
      ((Pe.current = new Fs(($e, be) => {
        const Ae = 'on' + xu($e);
        X.current && X.current[Ae] && X.current[Ae](be);
      })),
      Re.setNext(Pe.current));
    const [Be, H] = Q(null),
      fe = W(null);
    fe.current = Be;
    const pe = $(
      () => ({
        getState: B.getState.bind(B),
        getReactiveState: B.getReactive.bind(B),
        getStores: () => ({ data: B }),
        exec: Re.exec.bind(Re),
        setNext: ($e) => ((Pe.current = Pe.current.setNext($e)), Pe.current),
        intercept: Re.intercept.bind(Re),
        on: Re.on.bind(Re),
        detach: Re.detach.bind(Re),
        getTask: B.getTask.bind(B),
        serialize: () => B.serialize(),
        getTable: ($e) =>
          $e
            ? new Promise((be) => setTimeout(() => be(fe.current), 1))
            : fe.current,
        getHistory: () => B.getHistory(),
      }),
      [B, Re],
    );
    V(() => {
      const $e = () => {
        const { zoom: be, scales: Ae } = pe.getState(),
          Ie = be?.levels?.[be.level]?.scales?.[0]?.unit ?? Ae?.[0]?.unit;
        Ie && pe.exec('scale-change', { level: be?.level, unit: Ie });
      };
      pe.on('zoom-scale', $e), pe.on('set-scale', $e);
    }, [pe]),
      V(() => {
        pe.intercept('set-scale', ({ unit: $e, date: be }) => {
          const { zoom: Ae } = pe.getState();
          if (!Ae || !Ae.levels) return !1;
          const De = Ae.levels.findIndex((L) =>
            L.scales.some((G) => G.unit === $e),
          );
          if (De < 0) return !1;
          const Ie = Ae.levels[De];
          if (De !== Ae.level) {
            const L = Math.round((Ie.minCellWidth + Ie.maxCellWidth) / 2);
            pe.getStores().data.setState({
              scales: Ie.scales,
              cellWidth: L,
              _cellWidth: L,
              zoom: { ...Ae, level: De },
              ...(be ? { _scaleDate: be, _zoomOffset: 0 } : {}),
            });
          } else if (be) {
            const { _scales: L, cellWidth: G } = pe.getState(),
              le = L.diff(be, L.start, L.lengthUnit),
              we = Math.max(0, Math.round(le * G));
            pe.exec('scroll-chart', { left: we });
          }
          return !1;
        });
      }, [pe]),
      Et(
        ke,
        () => ({
          ...pe,
        }),
        [pe],
      );
    const ie = W(0);
    V(() => {
      ie.current
        ? B.init({
            tasks: s,
            links: _e.links,
            start: c,
            columns: _e.columns,
            end: d,
            lengthUnit: f,
            cellWidth: _e.cellWidth,
            cellHeight: h,
            scaleHeight: x,
            scales: _e.scales,
            taskTypes: r,
            zoom: _e.zoom,
            selected: o,
            activeTask: i,
            baselines: b,
            autoScale: R,
            unscheduledTasks: q,
            markers: t,
            durationUnit: g,
            criticalPath: _,
            schedule: T,
            projectStart: F,
            projectEnd: j,
            calendar: O,
            undo: J,
            _weekStart: ve.weekStart,
            splitTasks: K,
            summary: xe,
          })
        : C && C(pe),
        ie.current++;
    }, [
      pe,
      C,
      s,
      _e,
      c,
      d,
      f,
      h,
      x,
      r,
      o,
      i,
      b,
      R,
      q,
      t,
      g,
      _,
      T,
      F,
      j,
      O,
      J,
      ve,
      K,
      xe,
      B,
    ]),
      ie.current === 0 &&
        B.init({
          tasks: s,
          links: _e.links,
          start: c,
          columns: _e.columns,
          end: d,
          lengthUnit: f,
          cellWidth: _e.cellWidth,
          cellHeight: h,
          scaleHeight: x,
          scales: _e.scales,
          taskTypes: r,
          zoom: _e.zoom,
          selected: o,
          activeTask: i,
          baselines: b,
          autoScale: R,
          unscheduledTasks: q,
          markers: t,
          durationUnit: g,
          criticalPath: _,
          schedule: T,
          projectStart: F,
          projectEnd: j,
          calendar: O,
          undo: J,
          _weekStart: ve.weekStart,
          splitTasks: K,
          summary: xe,
        });
    const Fe = $(
      () =>
        O
          ? ($e, be) =>
              (be == 'day' && !O.getDayHours($e)) ||
              (be == 'hour' && !O.getDayHours($e))
                ? 'wx-weekend'
                : ''
          : D,
      [O, D],
    );
    return /* @__PURE__ */ p(Ze.i18n.Provider, {
      value: de,
      children: /* @__PURE__ */ p(wt.Provider, {
        value: pe,
        children: /* @__PURE__ */ p(fu, {
          taskTemplate: e,
          readonly: w,
          cellBorders: y,
          highlightTime: Fe,
          onScaleClick: S,
          onTableAPIChange: H,
          multiTaskRows: ae,
          rowMapping: Ve,
          rowHeightOverrides: Y,
          allowTaskIntersection: U,
          summaryBarCounts: ge,
          marqueeSelect: A,
          copyPaste: ee,
        }),
      }),
    });
  });
function _u({ api: n = null, items: e = [] }) {
  const t = Se(Ze.i18n),
    r = $(() => t || Rt(Hn), [t]),
    s = $(() => r.getGroup('gantt'), [r]),
    o = dt(n, '_selected'),
    i = dt(n, 'undo'),
    l = dt(n, 'history'),
    a = dt(n, 'splitTasks'),
    u = ['undo', 'redo'],
    c = $(() => {
      const f = gr();
      return (e.length ? e : gr()).map((m) => {
        let h = { ...m, disabled: !1 };
        return (
          (h.handler = Dr(f, h.id) ? (x) => Lt(n, x.id, null, s) : h.handler),
          h.text && (h.text = s(h.text)),
          h.menuText && (h.menuText = s(h.menuText)),
          h
        );
      });
    }, [e, n, s, i, a]),
    d = $(() => {
      const f = [];
      return (
        c.forEach((g) => {
          const m = g.id;
          if (m === 'add-task') f.push(g);
          else if (u.includes(m))
            u.includes(m) &&
              f.push({
                ...g,
                disabled: g.isDisabled(l),
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
    }, [n, o, l, c]);
  return t
    ? /* @__PURE__ */ p(mr, { items: d })
    : /* @__PURE__ */ p(Ze.i18n.Provider, {
        value: r,
        children: /* @__PURE__ */ p(mr, { items: d }),
      });
}
const Nu = Dt(function (
    {
      options: e = [],
      api: t = null,
      resolver: r = null,
      filter: s = null,
      at: o = 'point',
      children: i,
      onClick: l,
      css: a,
    },
    u,
  ) {
    const c = W(null),
      d = W(null),
      f = Se(Ze.i18n),
      g = $(() => f || Rt({ ...Hn, ...nn }), [f]),
      m = $(() => g.getGroup('gantt'), [g]),
      h = dt(t, 'taskTypes'),
      x = dt(t, 'selected'),
      w = dt(t, '_selected'),
      y = dt(t, 'splitTasks'),
      k = dt(t, 'summary'),
      b = $(
        () => ({
          splitTasks: y,
          taskTypes: h,
          summary: k,
        }),
        [y, h, k],
      ),
      D = $(() => hr(b), [b]);
    V(() => {
      t &&
        (t.on('scroll-chart', () => {
          c.current && c.current.show && c.current.show();
        }),
        t.on('drag-task', () => {
          c.current && c.current.show && c.current.show();
        }));
    }, [t]);
    function S(J) {
      return J.map(
        (K) => (
          (K = { ...K }),
          K.text && (K.text = m(K.text)),
          K.subtext && (K.subtext = m(K.subtext)),
          K.data && (K.data = S(K.data)),
          K
        ),
      );
    }
    function C() {
      const J = e.length ? e : hr(b);
      return S(J);
    }
    const R = $(() => C(), [t, e, b, m]),
      q = $(() => (w && w.length ? w : []), [w]),
      _ = M(
        (J, K) => {
          let ae = J ? t?.getTask(J) : null;
          if (r) {
            const Y = r(J, K);
            ae = Y === !0 ? ae : Y;
          }
          if (ae) {
            const Y = Ct(K.target, 'data-segment');
            Y !== null
              ? (d.current = { id: ae.id, segmentIndex: Y })
              : (d.current = ae.id),
              (!Array.isArray(x) || !x.includes(ae.id)) &&
                t &&
                t.exec &&
                t.exec('select-task', { id: ae.id });
          }
          return ae;
        },
        [t, r, x],
      ),
      T = M(
        (J) => {
          const K = J.action;
          K && (Dr(D, K.id) && Lt(t, K.id, d.current, m), l && l(J));
        },
        [t, m, l, D],
      ),
      F = M(
        (J, K) => {
          const ae = q.length ? q : K ? [K] : [];
          let Y = s ? ae.every((U) => s(J, U)) : !0;
          if (
            Y &&
            (J.isHidden &&
              (Y = !ae.some((U) => J.isHidden(U, t.getState(), d.current))),
            J.isDisabled)
          ) {
            const U = ae.some((ge) =>
              J.isDisabled(ge, t.getState(), d.current),
            );
            J.disabled = U;
          }
          return Y;
        },
        [s, q, t],
      );
    Et(u, () => ({
      show: (J, K) => {
        c.current && c.current.show && c.current.show(J, K);
      },
    }));
    const j = M((J) => {
        c.current && c.current.show && c.current.show(J);
      }, []),
      O = /* @__PURE__ */ re(He, {
        children: [
          /* @__PURE__ */ p(Ao, {
            filter: F,
            options: R,
            dataKey: 'id',
            resolver: _,
            onClick: T,
            at: o,
            ref: c,
            css: a,
          }),
          /* @__PURE__ */ p('span', {
            onContextMenu: j,
            'data-menu-ignore': 'true',
            children: typeof i == 'function' ? i() : i,
          }),
        ],
      });
    if (!f && Ze.i18n?.Provider) {
      const J = Ze.i18n.Provider;
      return /* @__PURE__ */ p(J, { value: g, children: O });
    }
    return O;
  }),
  xr = {};
function Cs(n) {
  return typeof n < 'u' ? xr[n] || n : xr.text;
}
function lt(n, e) {
  xr[n] = e;
}
const Tu = {
  editor: {},
};
function Jn(n) {
  const {
      editors: e,
      data: t,
      css: r = '',
      errors: s,
      focus: o = !1,
      onClick: i,
      children: l,
      onChange: a,
    } = n,
    u = W(null);
  V(() => {
    if (o) {
      const g = document.activeElement;
      if (g && u.current && u.current.contains(g)) return;
      const m = u.current
        ? u.current.querySelector(
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
  const c = Se(Ze.i18n),
    d = $(() => c.getGroup('editor'), [c]),
    f = $(
      () =>
        e.config[0].comp === 'readonly' &&
        e.config.every((g) => !Object.keys(t).includes(g.key)),
      [e, t],
    );
  return /* @__PURE__ */ re('div', {
    className: 'wx-s2aE1xdZ wx-sections ' + r,
    ref: u,
    children: [
      l,
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
            const w = Cs(g.comp);
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
            const w = Cs(g.comp);
            return /* @__PURE__ */ re(
              'div',
              {
                children: [
                  /* @__PURE__ */ p(Zt, {
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
                            a &&
                              a({
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
function Mu(n) {
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
function Du(n) {
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
function Eu(n) {
  const e = n.map((i) => {
      const l = { ...i };
      return (
        i.config && Object.assign(l, i.config),
        (l.key = i.key || Ki()),
        (l.setter = i.setter || Du(i.key)),
        (l.getter = i.getter || Mu(i.key)),
        l
      );
    }),
    t = (i) => {
      const l = {};
      return (
        e.forEach((a) => {
          a.comp !== 'section' &&
            (a.getter ? (l[a.key] = a.getter(i)) : (l[a.key] = i[a.key]));
        }),
        l
      );
    },
    r = (i, l, a) => (
      (a.length ? a.map((u) => e.find((c) => c.key === u)) : e).forEach((u) => {
        u.setter ? u.setter(i, l[u.key]) : (i[u.key] = l[u.key]);
      }),
      i
    ),
    s = (i, l) => {
      const a = t(i),
        u = [];
      return (
        e.forEach((c) => {
          const d = a[c.key],
            f = l[c.key];
          !An(d, f) && (d !== void 0 || f) && u.push(c.key);
        }),
        u
      );
    },
    o = (i, l, a) => {
      let u = 0;
      const c = {};
      return (
        (l?.length ? l.map((d) => e.find((f) => f.key === d)) : e).forEach(
          (d) => {
            d.required && !i[d.key]
              ? ((c[d.key] = {
                  errorType: 'required',
                }),
                (d.validationMessage =
                  d.validationMessage ?? a('This field is required')),
                u++)
              : d.validation &&
                !d.validation(i[d.key]) &&
                ((c[d.key] = {
                  errorType: 'validation',
                }),
                (d.validationMessage =
                  d.validationMessage ?? a('Invalid value')),
                u++);
          },
        ),
        u > 0 ? c : null
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
function Ru({
  values: n,
  items: e,
  css: t,
  activeBatch: r,
  autoSave: s,
  focus: o,
  readonly: i,
  topBar: l = !0,
  bottomBar: a = !0,
  layout: u = 'default',
  placement: c = 'inline',
  view: d,
  children: f,
  onChange: g,
  onSave: m,
  onAction: h,
  onValidation: x,
  hotkeys: w,
}) {
  const y = Se(Ze.i18n).getGroup('editor'),
    [k, b] = Ye(n),
    [D, S] = Q(null),
    C = $(() => {
      const A = Eu(e);
      D &&
        A.config.forEach((ue) => {
          ue.comp === 'section' &&
            ue.key === D &&
            (ue.sectionMode === 'accordion'
              ? ue.activeSection ||
                (A.config.forEach((Me) => {
                  Me.comp === 'section' &&
                    Me.key !== ue.key &&
                    (Me.activeSection = !1);
                }),
                (ue.activeSection = !0))
              : (ue.activeSection = !ue.activeSection));
        });
      let ee = /* @__PURE__ */ new Set(),
        xe = null;
      return (
        A.config.forEach((ue) => {
          ue.sectionMode === 'exclusive' && ue.activeSection && (xe = ue.key),
            ue.activeSection && ee.add(ue.key);
        }),
        A.config.forEach((ue) => {
          ue.hidden =
            ue.hidden ||
            (r && r !== ue.batch) ||
            (xe && ue.key != xe && ue.section !== xe) ||
            (ue.section && !ee.has(ue.section));
        }),
        i
          ? {
              ...A,
              config: A.config.map((ue) => ({ ...ue, comp: 'readonly' })),
              diff: () => [],
            }
          : A
      );
    }, [e, D, r, i]),
    [R, q] = Q({}),
    [_, T] = Q({}),
    F = k;
  V(() => {
    k !== void 0 && (q($n(k)), T($n(k)), F.errors && (F.errors = K()));
  }, [k]);
  const [j, O] = Q([]);
  V(() => {
    k && O([]);
  }, [k]);
  function J(A) {
    return [...new Set(A)];
  }
  function K(A) {
    const ee = C.validateValues(R, A, y);
    return An(ee, F.errors) || (x && x({ errors: ee, values: R })), ee;
  }
  function ae(A, ee) {
    if (s && !F.errors) {
      const xe = C.setValues(k, ee ?? _, A);
      b(xe), m && m({ changes: A, values: xe });
    } else O(A);
  }
  function Y({ value: A, key: ee, input: xe }) {
    let ue = { ...(_ || {}), [ee]: A };
    const Me = {
      key: ee,
      value: A,
      update: ue,
    };
    if ((xe && (Me.input = xe), g && g(Me), !k)) return;
    (ue = Me.update), T(ue);
    const ke = C.diff(k, ue),
      X = C.setValues({ ...(R || {}) }, ue, J([...ke, ee]));
    if ((q(X), ke.length)) {
      const B = s ? [] : J([...ke, ...Object.keys(F.errors ?? {}), ee]);
      (F.errors = K(B)), ae(ke, ue);
    } else {
      const B = Object.keys(F.errors ?? {});
      B.length && (F.errors = K(B)), O([]);
    }
  }
  function U() {
    if (j.length && (s || (F.errors = K()), !F.errors)) {
      m &&
        m({
          changes: j,
          values: R,
        });
      const A = C.setValues(k, _, j);
      b(A), O([]), b({ ...R });
    }
  }
  function ge({ item: A }) {
    A.id === 'save' ? U() : A.id === 'toggle-section' && S(A.key),
      h && h({ item: A, values: R, changes: j });
  }
  return /* @__PURE__ */ p(d, {
    topBar: l,
    bottomBar: a,
    placement: c,
    layout: u,
    readonly: i,
    autoSave: s,
    css: t,
    data: _,
    editors: C,
    focus: o,
    hotkeys: w,
    errors: F.errors,
    onClick: ge,
    onKeyDown: ge,
    onChange: Y,
    children: f,
  });
}
function Iu(n) {
  const {
      editors: e,
      data: t,
      layout: r,
      errors: s,
      focus: o,
      onClick: i,
      onChange: l,
    } = n,
    a = $(() => {
      let u = [];
      if (
        r === 'columns' &&
        ((u = [
          { ...e, config: [] },
          { ...e, config: [] },
        ]),
        e.config.forEach((c) => {
          const d = c.column === 'left' ? 0 : 1;
          u[d].config.push(c);
        }),
        u[0].config.length)
      ) {
        const c = u[0].config[0];
        c.comp === 'text' &&
          (u[0][0] = {
            ...c,
            css: 'title',
            label: '',
          });
      }
      return u;
    }, [r, e]);
  return r === 'columns'
    ? /* @__PURE__ */ re('div', {
        className: 'wx-bNrSbszs wx-cols',
        children: [
          /* @__PURE__ */ p('div', {
            className: 'wx-bNrSbszs wx-left',
            children: /* @__PURE__ */ p(Jn, {
              editors: a[0],
              data: t,
              errors: s,
              onClick: i,
              onChange: l,
            }),
          }),
          /* @__PURE__ */ p('div', {
            className: 'wx-bNrSbszs wx-right',
            children: /* @__PURE__ */ p(Jn, {
              editors: a[1],
              data: t,
              focus: o,
              errors: s,
              onClick: i,
              onChange: l,
            }),
          }),
        ],
      })
    : /* @__PURE__ */ p(Jn, {
        editors: e,
        data: t,
        focus: o,
        errors: s,
        onClick: i,
        onChange: l,
      });
}
function _s({
  items: n,
  values: e = null,
  top: t = !0,
  onClick: r,
  onChange: s,
}) {
  const o = M(
    ({ item: i, value: l }) => {
      s && s({ key: i.key, value: l });
    },
    [s],
  );
  return n.length
    ? /* @__PURE__ */ p('div', {
        className: `wx-66OW1j0R wx-editor-toolbar ${t ? 'wx-topbar' : 'wx-bottom'}`,
        children: /* @__PURE__ */ p(mr, {
          items: n,
          values: e,
          onClick: r,
          onChange: o,
        }),
      })
    : null;
}
const qt = () => ({ comp: 'spacer' }),
  er = (n) => ({
    comp: 'button',
    text: n('Cancel'),
    id: 'cancel',
  }),
  tr = (n) => ({
    type: 'primary',
    comp: 'button',
    text: n('Save'),
    id: 'save',
  }),
  Ns = () => ({
    comp: 'icon',
    icon: 'wxi-close',
    id: 'close',
  });
function nr(n) {
  const {
      data: e,
      editors: t,
      focus: r,
      css: s,
      topBar: o,
      bottomBar: i,
      layout: l,
      placement: a,
      errors: u,
      readonly: c,
      autoSave: d,
      children: f,
      onClick: g,
      onKeyDown: m,
      onChange: h,
      hotkeys: x,
    } = n,
    w = Se(Ze.i18n),
    y = $(() => w.getGroup('editor'), [w]),
    k = $(() => o === !0 && i === !0, [o, i]),
    b = $(() => {
      let _ = o && o.items ? o.items.map((T) => ({ ...T })) : [];
      return (
        k &&
          (c
            ? (_ = [qt(), Ns()])
            : (d
                ? (_ = [qt(), Ns()])
                : a !== 'modal' && (_ = [qt(), er(y), tr(y)]),
              l === 'columns' && !_.length && (_ = [qt(), tr(y), er(y)]))),
        _
      );
    }, [o, k, c, d, a, l, y]),
    D = $(() => {
      let _ = i && i.items ? i.items.map((T) => ({ ...T })) : [];
      return (
        k &&
          (c ||
            (a === 'modal' && !d && (_ = [qt(), tr(y), er(y)]),
            l === 'columns' && b.length && (_ = []))),
        _
      );
    }, [i, k, c, a, d, l, b, y]),
    S = $(() => [...b, ...D], [b, D]),
    C = W(null),
    R = W(null);
  R.current = (_, ...T) => {
    const F = S.findIndex((J) => T.includes(J.id));
    if (F === -1) return !1;
    const j = _.target,
      O = S[F];
    (_.key == 'Escape' &&
      (j.closest('.wx-combo') ||
        j.closest('.wx-multicombo') ||
        j.closest('.wx-richselect'))) ||
      (_.key == 'Delete' &&
        (j.tagName === 'INPUT' || j.tagName === 'TEXTAREA')) ||
      (_.preventDefault(), m && m({ item: O }));
  };
  const q = $(
    () =>
      x === !1
        ? {}
        : {
            'ctrl+s': (_) => R.current(_, 'save'),
            escape: (_) => R.current(_, 'cancel', 'close'),
            'ctrl+d': (_) => R.current(_, 'delete'),
            ...(x || {}),
          },
    [x],
  );
  return (
    ai(q, C),
    /* @__PURE__ */ re('div', {
      className: s ? 'wx-85HDaNoA ' + s : 'wx-85HDaNoA',
      ref: C,
      children: [
        /* @__PURE__ */ p(_s, {
          ...(o && typeof o == 'object' ? o : {}),
          items: b,
          values: e,
          onClick: g,
          onChange: h,
        }),
        /* @__PURE__ */ re('div', {
          className: `wx-85HDaNoA wx-content${l === 'columns' ? ' wx-layout-columns' : ''}`,
          children: [
            f,
            /* @__PURE__ */ p(Iu, {
              editors: t,
              layout: l,
              data: e,
              focus: r,
              errors: u,
              onClick: g,
              onChange: h,
            }),
            /* @__PURE__ */ p(_s, {
              ...(i && typeof i == 'object' ? i : {}),
              items: D,
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
function Hu(n) {
  const { css: e, onClick: t, placement: r, ...s } = n;
  function o() {
    t && t({ item: { id: 'close' } });
  }
  return r === 'modal'
    ? /* @__PURE__ */ p(Fi, {
        children: /* @__PURE__ */ p(nr, {
          css: `wx-panel ${e}`,
          onClick: t,
          placement: r,
          ...s,
        }),
      })
    : r === 'sidebar'
      ? /* @__PURE__ */ p(Yi, {
          onCancel: o,
          children: /* @__PURE__ */ p(nr, {
            css: `wx-panel ${e}`,
            onClick: t,
            placement: r,
            ...s,
          }),
        })
      : /* @__PURE__ */ p(nr, {
          css: `wx-inline-form ${e}`,
          onClick: t,
          placement: r,
          ...s,
        });
}
function Au(n) {
  const {
      values: e = {},
      items: t = [],
      css: r = '',
      activeBatch: s = null,
      topBar: o = !0,
      bottomBar: i = !0,
      focus: l = !1,
      autoSave: a = !1,
      layout: u = 'default',
      readonly: c = !1,
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
  return /* @__PURE__ */ p(In, {
    words: Tu,
    optional: !0,
    children: /* @__PURE__ */ p(Ru, {
      view: Hu,
      values: e,
      items: t,
      css: r,
      activeBatch: s,
      topBar: o,
      bottomBar: i,
      focus: l,
      autoSave: a,
      layout: u,
      readonly: c,
      placement: d,
      ...m,
      children: f,
    }),
  });
}
function Lu({ value: n, options: e, label: t }) {
  const r = Se(Ze.i18n).getGroup('editor'),
    s = $(() => {
      let o = n;
      if ((typeof n == 'boolean' && (o = r(n ? 'Yes' : 'No')), e)) {
        const i = e.find((l) => l.id === n);
        i && (o = i.label);
      }
      return o;
    }, [n, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(Zt, { label: t, children: s }) : null;
}
function Pu({ fieldKey: n, label: e, activeSection: t, onClick: r }) {
  return /* @__PURE__ */ re('div', {
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
lt('text', on);
lt('textarea', pi);
lt('checkbox', mi);
lt('readonly', Lu);
lt('section', Pu);
yr(nt);
function zu({ api: n, autoSave: e, onLinksChange: t }) {
  const s = Se(Ze.i18n).getGroup('gantt'),
    o = oe(n, 'activeTask'),
    i = oe(n, '_activeTask'),
    l = oe(n, '_links'),
    a = oe(n, 'schedule'),
    u = oe(n, 'unscheduledTasks'),
    [c, d] = Q();
  function f() {
    if (o) {
      const x = l
          .filter((y) => y.target == o)
          .map((y) => ({ link: y, task: n.getTask(y.source) })),
        w = l
          .filter((y) => y.source == o)
          .map((y) => ({ link: y, task: n.getTask(y.target) }));
      return [
        { title: s('Predecessors'), data: x },
        { title: s('Successors'), data: w },
      ];
    }
  }
  V(() => {
    d(f());
  }, [o, l]);
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
            data: y.data.filter((k) => k.link.id !== x),
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
          (y || []).map((k) => ({
            ...k,
            data: k.data.map((b) =>
              b.link.id === x ? { ...b, link: { ...b.link, ...w } } : b,
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
  return /* @__PURE__ */ p(He, {
    children: (c || []).map((x, w) =>
      x.data.length
        ? /* @__PURE__ */ p(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ p(Ze.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ p(Zt, {
                  label: x.title,
                  position: 'top',
                  children: /* @__PURE__ */ p('table', {
                    children: /* @__PURE__ */ p('tbody', {
                      children: x.data.map((y) =>
                        /* @__PURE__ */ re(
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
                              a?.auto && y.link.type === 'e2s'
                                ? /* @__PURE__ */ p('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ p(on, {
                                      type: 'number',
                                      placeholder: s('Lag'),
                                      value: y.link.lag,
                                      disabled: u && i?.unscheduled,
                                      onChange: (k) => {
                                        k.input ||
                                          h(y.link.id, { lag: k.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ p('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ p('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ p(xi, {
                                    value: y.link.type,
                                    placeholder: s('Select link type'),
                                    options: g,
                                    onChange: (k) =>
                                      h(y.link.id, { type: k.value }),
                                    children: ({ option: k }) => k.label,
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
function Ou(n) {
  const { value: e, time: t, format: r, onchange: s, onChange: o, ...i } = n,
    l = o ?? s;
  function a(u) {
    const c = new Date(u.value);
    c.setHours(e.getHours()),
      c.setMinutes(e.getMinutes()),
      l && l({ value: c });
  }
  return /* @__PURE__ */ re('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ p(Hi, {
        ...i,
        value: e,
        onChange: a,
        format: r,
        buttons: ['today'],
        clear: !1,
      }),
      t ? /* @__PURE__ */ p(Wi, { value: e, onChange: l, format: r }) : null,
    ],
  });
}
lt('select', Ps);
lt('date', Ou);
lt('twostate', zs);
lt('slider', or);
lt('counter', Ai);
lt('links', zu);
function Wu({
  api: n,
  items: e = [],
  css: t = '',
  layout: r = 'default',
  readonly: s = !1,
  placement: o = 'sidebar',
  bottomBar: i = !0,
  topBar: l = !0,
  autoSave: a = !0,
  focus: u = !1,
  hotkeys: c = {},
}) {
  const d = Se(Ze.i18n),
    f = $(() => d || Rt({ ...Hn, ...nn }), [d]),
    g = $(() => f.getGroup('gantt'), [f]),
    m = f.getRaw(),
    h = $(() => {
      const H = m.gantt?.dateFormat || m.formats?.dateFormat;
      return ht(H, m.calendar);
    }, [m]),
    x = $(() => {
      if (l === !0 && !s) {
        const H = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: g('Delete'),
            id: 'delete',
          },
        ];
        return a
          ? { items: H }
          : {
              items: [
                ...H,
                {
                  comp: 'button',
                  type: 'primary',
                  text: g('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return l;
    }, [l, s, a, g]),
    [w, y] = Q(!1),
    k = $(() => (w ? 'wx-full-screen' : ''), [w]),
    b = M((H) => {
      y(H);
    }, []);
  V(() => {
    const H = Yo(b);
    return (
      H.observe(),
      () => {
        H.disconnect();
      }
    );
  }, [b]);
  const D = oe(n, '_activeTask'),
    S = oe(n, 'activeTask'),
    C = oe(n, 'unscheduledTasks'),
    R = oe(n, 'summary'),
    q = oe(n, 'links'),
    _ = oe(n, 'splitTasks'),
    T = $(() => _ && S?.segmentIndex, [_, S]),
    F = $(() => T || T === 0, [T]),
    j = oe(n, 'taskTypes'),
    O = $(() => $o({ taskTypes: j }), [C, R, j]),
    J = oe(n, 'undo'),
    [K, ae] = Q({}),
    [Y, U] = Q(null),
    [ge, A] = Q(),
    [ee, xe] = Q(null),
    ue = $(() => {
      if (!D) return null;
      let H;
      if ((F && D.segments ? (H = { ...D.segments[T] }) : (H = { ...D }), s)) {
        let fe = { parent: H.parent };
        return (
          O.forEach(({ key: pe, comp: ie }) => {
            if (ie !== 'links') {
              const Fe = H[pe];
              ie === 'date' && Fe instanceof Date
                ? (fe[pe] = h(Fe))
                : ie === 'slider' && pe === 'progress'
                  ? (fe[pe] = `${Fe}%`)
                  : (fe[pe] = Fe);
            }
          }),
          fe
        );
      }
      return H || null;
    }, [D, F, T, s, O, h]);
  V(() => {
    A(ue);
  }, [ue]),
    V(() => {
      ae({}), xe(null), U(null);
    }, [S]);
  function Me(H, fe) {
    return H.map((pe) => {
      const ie = { ...pe };
      if (
        (pe.config && (ie.config = { ...ie.config }),
        ie.comp === 'links' &&
          n &&
          ((ie.api = n), (ie.autoSave = a), (ie.onLinksChange = B)),
        ie.comp === 'select' && ie.key === 'type')
      ) {
        const Fe = ie.options ?? [];
        ie.options = Fe.map(($e) => ({
          ...$e,
          label: g($e.label),
        }));
      }
      return (
        ie.comp === 'slider' &&
          ie.key === 'progress' &&
          (ie.labelTemplate = (Fe) => `${g(ie.label)} ${Fe}%`),
        ie.label && (ie.label = g(ie.label)),
        ie.config?.placeholder &&
          (ie.config.placeholder = g(ie.config.placeholder)),
        fe &&
          (ie.isDisabled && ie.isDisabled(fe, n.getState())
            ? (ie.disabled = !0)
            : delete ie.disabled),
        ie
      );
    });
  }
  const ke = $(() => {
      let H = e.length ? e : O;
      return (
        (H = Me(H, ge)),
        ge
          ? H.filter((fe) => !fe.isHidden || !fe.isHidden(ge, n.getState()))
          : H
      );
    }, [e, O, ge, g, n, a]),
    X = $(() => ke.map((H) => H.key), [ke]);
  function B({ id: H, action: fe, data: pe }) {
    ae((ie) => ({
      ...ie,
      [H]: { action: fe, data: pe },
    }));
  }
  const Z = M(() => {
      for (let H in K)
        if (q.byId(H)) {
          const { action: fe, data: pe } = K[H];
          n.exec(fe, pe);
        }
    }, [n, K, q]),
    he = M(() => {
      const H = S?.id || S;
      if (F) {
        if (D?.segments) {
          const fe = D.segments.filter((pe, ie) => ie !== T);
          n.exec('update-task', {
            id: H,
            task: { segments: fe },
          });
        }
      } else n.exec('delete-task', { id: H });
    }, [n, S, F, D, T]),
    de = M(() => {
      n.exec('show-editor', { id: null });
    }, [n]),
    ve = M(
      (H) => {
        const { item: fe, changes: pe } = H;
        fe.id === 'delete' && he(),
          fe.id === 'save' && (pe.length ? de() : Z()),
          fe.comp && de();
      },
      [n, S, a, Z, he, de],
    ),
    _e = M(
      (H, fe, pe) => (
        C && H.type === 'summary' && (H.unscheduled = !1),
        ko(H, n.getState(), fe),
        pe || U(!1),
        H
      ),
      [C, n],
    ),
    Oe = M(
      (H) => {
        (H = {
          ...H,
          unscheduled: C && H.unscheduled && H.type !== 'summary',
        }),
          delete H.links,
          delete H.data,
          (X.indexOf('duration') === -1 || (H.segments && !H.duration)) &&
            delete H.duration;
        const fe = {
          id: S?.id || S,
          task: H,
          ...(F && { segmentIndex: T }),
        };
        a && Y && (fe.inProgress = Y), n.exec('update-task', fe), a || Z();
      },
      [n, S, C, a, Z, X, F, T, Y],
    ),
    Ve = M(
      (H) => {
        let { update: fe, key: pe, input: ie } = H;
        if ((ie && U(!0), (H.update = _e({ ...fe }, pe, ie)), !a)) A(H.update);
        else if (!ee && !ie) {
          const Fe = ke.find((Ae) => Ae.key === pe),
            $e = fe[pe];
          (!Fe.validation || Fe.validation($e)) &&
            (!Fe.required || $e) &&
            Oe(H.update);
        }
      },
      [a, _e, ee, ke, Oe],
    ),
    Re = M(
      (H) => {
        a || Oe(H.values);
      },
      [a, Oe],
    ),
    Pe = M((H) => {
      xe(H.errors);
    }, []),
    Be = $(
      () =>
        J
          ? {
              'ctrl+z': (H) => {
                H.preventDefault(), n.exec('undo');
              },
              'ctrl+y': (H) => {
                H.preventDefault(), n.exec('redo');
              },
            }
          : {},
      [J, n],
    );
  return ue
    ? /* @__PURE__ */ p(In, {
        children: /* @__PURE__ */ p(Au, {
          css: `wx-XkvqDXuw wx-gantt-editor ${k} ${t}`,
          items: ke,
          values: ue,
          topBar: x,
          bottomBar: i,
          placement: o,
          layout: r,
          readonly: s,
          autoSave: a,
          focus: u,
          onAction: ve,
          onSave: Re,
          onValidation: Pe,
          onChange: Ve,
          hotkeys: c && { ...Be, ...c },
        }),
      })
    : null;
}
const Fu = ({ children: n, columns: e = null, api: t }) => {
  const [r, s] = Q(null);
  return (
    V(() => {
      t && t.getTable(!0).then(s);
    }, [t]),
    /* @__PURE__ */ p(Qc, { api: r, columns: e, children: n })
  );
};
function Yu(n) {
  const { api: e, content: t, filter: r, children: s } = n,
    o = W(null),
    i = W(null),
    [l, a] = Q({}),
    [u, c] = Q(null),
    [d, f] = Q(null),
    [g, m] = Q(!1),
    h = W(null),
    x = W(!1),
    w = W(null),
    y = W(null),
    k = 300,
    b = 400;
  function D(Y) {
    for (; Y; ) {
      if (Y.getAttribute) {
        const U = Y.getAttribute('data-tooltip-id'),
          ge = Y.getAttribute('data-tooltip-at'),
          A = Y.getAttribute('data-tooltip');
        if (U || A) return { id: U, tooltip: A, target: Y, at: ge };
      }
      Y = Y.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  V(() => {
    const Y = i.current;
    if (!g && Y && d && (d.text || t)) {
      const U = Y.getBoundingClientRect();
      let ge = !1,
        A = d.left,
        ee = d.top;
      U.right >= l.right && ((A = l.width - U.width - 5), (ge = !0)),
        U.bottom >= l.bottom &&
          ((ee = d.top - (U.bottom - l.bottom + 2)), (ge = !0)),
        ge && f((xe) => xe && { ...xe, left: A, top: ee });
    }
  }, [d, l, t, g]);
  const S = M(() => {
      clearTimeout(w.current),
        clearTimeout(y.current),
        (w.current = null),
        (y.current = null),
        (h.current = null),
        (x.current = !1),
        f(null),
        c(null),
        m(!1);
    }, []),
    C = M(() => {
      clearTimeout(y.current),
        (y.current = setTimeout(() => {
          (y.current = null), !h.current && !x.current && S();
        }, b));
    }, [S]),
    R = M(() => {
      clearTimeout(y.current), (y.current = null);
    }, []);
  function q(Y) {
    if (i.current && i.current.contains(Y.target)) return;
    let { id: U, tooltip: ge, target: A, at: ee } = D(Y.target);
    if (!U && !ge) {
      clearTimeout(w.current),
        (w.current = null),
        (h.current = null),
        !x.current && !y.current && C();
      return;
    }
    if ((R(), ge || (ge = J(U)), h.current === U)) return;
    (h.current = U), clearTimeout(w.current), f(null), c(null), m(!1);
    const xe = Y.clientX;
    w.current = setTimeout(() => {
      w.current = null;
      const ue = U ? O(K(U)) : null;
      if (r && ue && !r(ue)) {
        h.current = null;
        return;
      }
      ue && c(ue);
      const Me = A.getBoundingClientRect(),
        ke = o.current,
        X = ke
          ? ke.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let B, Z;
      ee === 'left'
        ? ((B = Me.top + 5 - X.top), (Z = Me.right + 5 - X.left))
        : ((B = Me.top + Me.height - X.top), (Z = xe - X.left)),
        a(X),
        f({ top: B, left: Z, text: ge });
    }, k);
  }
  function _() {
    (x.current = !0), R();
  }
  function T() {
    (x.current = !1), h.current || C();
  }
  function F(Y) {
    const U = Y.touches[0];
    if (!U) return;
    const { id: ge, target: A } = D(Y.target);
    if (!ge) return;
    clearTimeout(w.current), clearTimeout(y.current);
    const ee = O(K(ge));
    if (r && ee && !r(ee)) return;
    const xe = ee?.text || '',
      ue = A.getBoundingClientRect(),
      Me = o.current,
      ke = Me
        ? Me.getBoundingClientRect()
        : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    c(ee),
      a(ke),
      m(!0),
      f({
        top: ue.top - ke.top - 8,
        left: U.clientX - ke.left,
        text: xe,
      });
  }
  function j() {
    S();
  }
  function O(Y) {
    return e?.getTask(K(Y)) || null;
  }
  function J(Y) {
    return O(Y)?.text || '';
  }
  function K(Y) {
    const U = Number(Y);
    return Number.isFinite(U) ? U : Y;
  }
  V(
    () => () => {
      clearTimeout(w.current), clearTimeout(y.current);
    },
    [],
  );
  const ae = [
    'wx-KG0Lwsqo',
    'wx-gantt-tooltip',
    g ? 'wx-gantt-tooltip--touch' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return /* @__PURE__ */ re('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: o,
    onMouseMove: q,
    onTouchStart: F,
    onTouchEnd: j,
    onTouchMove: j,
    children: [
      d && (d.text || t)
        ? /* @__PURE__ */ p('div', {
            className: ae,
            ref: i,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            onMouseEnter: _,
            onMouseLeave: T,
            children: t
              ? /* @__PURE__ */ p(t, { data: u, api: e })
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
function Bu({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(Ur, { fonts: n, children: e() })
    : /* @__PURE__ */ p(Ur, { fonts: n });
}
function Gu({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(qr, { fonts: n, children: e })
    : /* @__PURE__ */ p(qr, { fonts: n });
}
function Vu({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ p(Xr, { fonts: n, children: e })
    : /* @__PURE__ */ p(Xr, { fonts: n });
}
const Ku = '2.9.0',
  ju = {
    version: Ku,
  },
  Uu = ju.version,
  ld = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ContextMenu: Nu,
        Editor: Wu,
        Gantt: Cu,
        HeaderMenu: Fu,
        Material: Bu,
        Toolbar: _u,
        Tooltip: Yu,
        Willow: Gu,
        WillowDark: Vu,
        defaultColumns: yo,
        defaultEditorItems: Co,
        defaultMenuOptions: bo,
        defaultTaskTypes: Pn,
        defaultToolbarButtons: So,
        getEditorItems: $o,
        getMenuOptions: hr,
        getToolbarButtons: gr,
        registerEditorItem: lt,
        registerScaleUnit: Bl,
        version: Uu,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
export { ld as default };
