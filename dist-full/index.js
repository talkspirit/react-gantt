import { jsx as g, jsxs as Z, Fragment as Re } from 'react/jsx-runtime';
import Go, {
  useState as U,
  useEffect as G,
  useRef as W,
  createContext as Pt,
  useContext as $e,
  useMemo as $,
  useCallback as E,
  forwardRef as Nt,
  useImperativeHandle as Tt,
  Fragment as _s,
} from 'react';
import { createPortal as Vo, flushSync as Bo } from 'react-dom';
function Xe(n, e = 'data-id') {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
function nr(n, e = 'data-id') {
  const t = Xe(n, e);
  return t ? t.getAttribute(e) : null;
}
function bt(n, e = 'data-id') {
  const t = Xe(n, e);
  return t ? zt(t.getAttribute(e)) : null;
}
function zt(n) {
  if (typeof n == 'string') {
    const e = n * 1;
    if (!isNaN(e)) return e;
  }
  return n;
}
function Ko() {
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
var Je = Ko();
function xr(n) {
  Object.assign(Je, n);
}
function Hr(n, e, t) {
  function r(s) {
    const o = Xe(s);
    if (!o) return;
    const i = zt(o.dataset.id);
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
  Je.addEvent(n, t, r);
}
function Ns(n, e) {
  Hr(n, e, 'click'), e.dblclick && Hr(n, e.dblclick, 'dblclick');
}
function Uo(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    if (n[t] === e) {
      n.splice(t, 1);
      break;
    }
}
var Ts = /* @__PURE__ */ new Date(),
  kn = !1,
  un = [],
  St = [],
  Ar = (n) => {
    if (kn) {
      kn = !1;
      return;
    }
    for (let e = St.length - 1; e >= 0; e--) {
      const { node: t, date: r, props: s } = St[e];
      if (
        !(r > Ts) &&
        !t.contains(n.target) &&
        t !== n.target &&
        (s.callback && s.callback(n), s.modal || n.defaultPrevented)
      )
        break;
    }
  },
  jo = (n) => {
    (Ts = /* @__PURE__ */ new Date()), (kn = !0);
    for (let e = St.length - 1; e >= 0; e--) {
      const { node: t } = St[e];
      if (!t.contains(n.target) && t !== n.target) {
        kn = !1;
        break;
      }
    }
  };
function Jt(n, e) {
  un.length ||
    (un = [
      Je.addGlobalEvent('click', Ar, n),
      Je.addGlobalEvent('contextmenu', Ar, n),
      Je.addGlobalEvent('mousedown', jo, n),
    ]),
    typeof e != 'object' && (e = { callback: e });
  const t = { node: n, date: /* @__PURE__ */ new Date(), props: e };
  return (
    St.push(t),
    {
      destroy() {
        Uo(St, t), St.length || (un.forEach((r) => r()), (un = []));
      },
    }
  );
}
var fn = (n) => n.indexOf('bottom') !== -1,
  hn = (n) => n.indexOf('left') !== -1,
  pn = (n) => n.indexOf('right') !== -1,
  Yn = (n) => n.indexOf('top') !== -1,
  Lr = (n) => n.indexOf('fit') !== -1,
  gn = (n) => n.indexOf('overlap') !== -1,
  Xo = (n) => n.split('-').every((e) => ['center', 'fit'].indexOf(e) > -1),
  qo = (n) => {
    const e = n.match(/(start|center|end)/);
    return e ? e[0] : null;
  };
function Qo(n, e) {
  let t = 0;
  const r = Je.getTopNode(n);
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
var Be, Qe, Kt, je;
function Zo(n, e, t = 'bottom', r = 0, s = 0) {
  if (!n) return null;
  (Be = r), (Qe = s), (Kt = 'auto');
  let o = 0,
    i = 0;
  const l = Jo(n),
    a = gn(t) ? Je.getTopNode(n) : l;
  if (!l) return null;
  const d = l.getBoundingClientRect(),
    c = n.getBoundingClientRect(),
    u = a.getBoundingClientRect(),
    f = window.getComputedStyle(a),
    p = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    };
  for (const b in p) {
    const k = `border-${b}-width`;
    p[b] = parseFloat(f.getPropertyValue(k));
  }
  if (e) {
    const b = Qo(e, l);
    o = Math.max(b + 1, 20);
  }
  if (e) {
    if (
      ((je = e.getBoundingClientRect()),
      Lr(t) && (Kt = je.width + 'px'),
      t !== 'point')
    )
      if (Xo(t))
        Lr(t) ? (Be = 0) : ((Be = u.width / 2), (i = 1)),
          (Qe = (u.height - c.height) / 2);
      else {
        const b = gn(t) ? 0 : 1;
        (Be = pn(t) ? je.right + b : je.left - b),
          (Qe = fn(t) ? je.bottom + 1 : je.top);
        const k = qo(t);
        k &&
          (pn(t) || hn(t)
            ? k === 'center'
              ? (Qe -= (c.height - je.height) / 2)
              : k === 'end' && (Qe -= c.height - je.height)
            : (fn(t) || Yn(t)) &&
              (k === 'center'
                ? (Be -= (c.width - je.width) / 2)
                : k === 'end' && (Be -= c.width - je.width),
              gn(t) || (Be += 1)));
      }
  } else je = { left: r, right: r, top: s, bottom: s };
  const w = (hn(t) || pn(t)) && (fn(t) || Yn(t));
  hn(t) && (i = 2);
  const h = Be - c.width - u.left;
  e && hn(t) && !w && h < 0 && ((Be = je.right), (i = 0));
  const m = Be + c.width * (1 - i / 2) - u.right;
  if (m > 0)
    if (!pn(t)) Be = u.right - p.right - c.width;
    else {
      const b = je.left - u.x - c.width;
      e && !gn(t) && !w && b >= 0
        ? (Be = je.left - c.width)
        : (Be -= m + p.right);
    }
  i && (Be = Math.round(Be - (c.width * i) / 2));
  const x = h < 0 || m > 0 || !w;
  Yn(t) && ((Qe = je.top - c.height), e && Qe < u.y && x && (Qe = je.bottom));
  const y = Qe + c.height - u.bottom;
  return (
    y > 0 &&
      (e && fn(t) && x
        ? (Qe -= c.height + je.height + 1)
        : (Qe -= y + p.bottom)),
    (Be -= d.left + p.left),
    (Qe -= d.top + p.top),
    (Be = Math.max(Be, 0) + a.scrollLeft),
    (Qe = Math.max(Qe, 0) + a.scrollTop),
    (Kt = Kt || 'auto'),
    { x: Be, y: Qe, z: o, width: Kt }
  );
}
function Jo(n) {
  const e = Je.getTopNode(n);
  for (n && (n = n.parentElement); n; ) {
    const t = getComputedStyle(n).position;
    if (n === e || t === 'relative' || t === 'absolute' || t === 'fixed')
      return n;
    n = n.parentNode;
  }
  return null;
}
var Pr = /* @__PURE__ */ new Date().valueOf();
function Dn() {
  return (Pr += 1), Pr;
}
var ei = class {
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
  Ht = [],
  zr = {
    subscribe: (n) => {
      ti();
      const e = new ei();
      return (
        Ht.push(e),
        n(e),
        () => {
          const t = Ht.findIndex((r) => r === e);
          t >= 0 && Ht.splice(t, 1);
        }
      );
    },
  },
  Or = !1;
function ti() {
  Or ||
    ((Or = !0),
    document.addEventListener('keydown', (n) => {
      if (
        Ht.length &&
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
        for (let s = Ht.length - 1; s >= 0; s--) {
          const o = Ht[s],
            i = o.store.get(r) || o.store.get(t);
          i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
        }
      }
    }));
}
function Ze(n) {
  return n < 10 ? '0' + n : n.toString();
}
function ni(n) {
  const e = Ze(n);
  return e.length == 2 ? '0' + e : e;
}
function Ms(n) {
  const e = Math.floor(n / 11) * 11;
  return {
    start: e,
    end: e + 11,
  };
}
function Wr(n, e = 1) {
  let t = n.getDay();
  t === 0 && (t = 7), (t = (t - e + 7) % 7);
  const r = new Date(n.valueOf());
  r.setDate(n.getDate() + (3 - t));
  const s = r.getFullYear(),
    o = Math.floor((r.getTime() - new Date(s, 0, 1).getTime()) / 864e5);
  return 1 + Math.floor(o / 7);
}
var Fr = ['', ''];
function ri(n, e, t) {
  switch (n) {
    case '%d':
      return Ze(e.getDate());
    case '%m':
      return Ze(e.getMonth() + 1);
    case '%j':
      return e.getDate();
    case '%n':
      return e.getMonth() + 1;
    case '%y':
      return Ze(e.getFullYear() % 100);
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
      return Ze(((e.getHours() + 11) % 12) + 1);
    case '%g':
      return ((e.getHours() + 11) % 12) + 1;
    case '%G':
      return e.getHours();
    case '%H':
      return Ze(e.getHours());
    case '%i':
      return Ze(e.getMinutes());
    case '%a':
      return ((e.getHours() > 11 ? t.pm : t.am) || Fr)[0];
    case '%A':
      return ((e.getHours() > 11 ? t.pm : t.am) || Fr)[1];
    case '%s':
      return Ze(e.getSeconds());
    case '%S':
      return ni(e.getMilliseconds());
    case '%W':
      return Ze(Wr(e));
    case '%w':
      return Ze(Wr(e, t.weekStart ?? 1));
    case '%c': {
      let r = e.getFullYear() + '';
      return (
        (r += '-' + Ze(e.getMonth() + 1)),
        (r += '-' + Ze(e.getDate())),
        (r += 'T'),
        (r += Ze(e.getHours())),
        (r += ':' + Ze(e.getMinutes())),
        (r += ':' + Ze(e.getSeconds())),
        r
      );
    }
    case '%Q':
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return n;
  }
}
var si = /%[a-zA-Z]/g;
function dt(n, e) {
  return typeof n == 'function'
    ? n
    : function (t) {
        return t
          ? (t.getMonth || (t = new Date(t)), n.replace(si, (r) => ri(r, t, e)))
          : '';
      };
}
function Yr(n) {
  return n && typeof n == 'object' && !Array.isArray(n);
}
function rr(n, e) {
  for (const t in e) {
    const r = e[t];
    Yr(n[t]) && Yr(r) ? (n[t] = rr({ ...n[t] }, e[t])) : (n[t] = e[t]);
  }
  return n;
}
function Mt(n) {
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
      return t ? (r = rr({ ...e }, n)) : (r = rr({ ...n }, e)), Mt(r);
    },
  };
}
function Ve(n) {
  const [e, t] = U(n),
    r = W(n);
  return (
    G(() => {
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
function oi(n, e, t) {
  const [r, s] = U(() => e);
  return (
    n || console.warn(`Writable ${t} is not defined`),
    G(
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
function re(n, e) {
  const t = n.getState(),
    r = n.getReactiveState();
  return oi(r[e], t[e], e);
}
function lt(n, e) {
  const [t, r] = U(() => null);
  return (
    G(() => {
      if (!n) return;
      const s = n.getReactiveState(),
        o = s ? s[e] : null;
      return o ? o.subscribe((l) => r(() => l)) : void 0;
    }, [n, e]),
    t
  );
}
function ii(n, e) {
  const t = W(e);
  t.current = e;
  const [r, s] = U(1);
  return (
    G(
      () =>
        n.subscribe((i) => {
          (t.current = i), s((l) => l + 1);
        }),
      [n],
    ),
    [t.current, r]
  );
}
function bn(n, e) {
  const t = n.getState(),
    r = n.getReactiveState();
  return ii(r[e], t[e]);
}
function li(n, e) {
  G(() => {
    const t = e.current;
    if (t)
      return zr.subscribe((r) => {
        r.configure(n, t);
      });
  }, [zr, e]);
}
function Ds(n, e) {
  return typeof n == 'function' ? (typeof e == 'object' ? n(e) : n()) : n;
}
function Es(n) {
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
function Is(n) {
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
    const o = Xe(s);
    if (!o) return;
    const i = zt(o.dataset.id);
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
  return Je.addEvent(n, t, r);
}
function ai(n, e) {
  const t = [Gr(n, e, 'click')];
  return (
    e.dblclick && t.push(Gr(n, e.dblclick, 'dblclick')),
    () => {
      t.forEach((r) => r());
    }
  );
}
const ci = 'en-US',
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
  ui = {
    ok: 'OK',
    cancel: 'Cancel',
    select: 'Select',
    'No data': 'No data',
    'Rows per page': 'Rows per page',
    'Total pages': 'Total pages',
  },
  fi = {
    timeFormat: '%H:%i',
    dateFormat: '%m/%d/%Y',
    monthYearFormat: '%F %Y',
    yearFormat: '%Y',
  },
  en = {
    core: ui,
    calendar: di,
    formats: fi,
    lang: ci,
  },
  tn = Pt('willow'),
  hi = Pt({}),
  nt = Pt(null),
  yr = Pt(null),
  qe = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        fieldId: yr,
        helpers: hi,
        i18n: nt,
        theme: tn,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
function Ot(n) {
  const e = $e(yr),
    [t] = U(() => n || (e && e()) || Dn());
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
  const a = Ot(e),
    [d, c] = Ve(n),
    u = E(
      (w) => {
        const h = w.target.value;
        c(h), l && l({ value: h, input: !0 });
      },
      [l],
    ),
    f = E(
      (w) => {
        const h = w.target.value;
        c(h), l && l({ value: h });
      },
      [l],
    ),
    p = W(null);
  return (
    G(() => {
      const w = f,
        h = p.current;
      return (
        h.addEventListener('change', w),
        () => {
          h && h.removeEventListener('change', w);
        }
      );
    }, [f]),
    /* @__PURE__ */ g('textarea', {
      className: `wx-3yFVAC wx-textarea ${o ? 'wx-error' : ''}`,
      id: a,
      disabled: s,
      placeholder: t,
      readOnly: i,
      title: r,
      value: d,
      onInput: u,
      ref: p,
    })
  );
}
function ut({
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
            .filter((u) => u !== '')
            .map((u) => 'wx-' + u)
            .join(' ')
        : '';
      return e + (e ? ' ' : '') + c;
    }, [n, e]),
    d = (c) => {
      l && l(c);
    };
  return /* @__PURE__ */ Z('button', {
    title: s,
    className: `wx-2ZWgb4 wx-button ${a} ${t && !i ? 'wx-icon' : ''}`,
    disabled: r,
    onClick: d,
    children: [
      t && /* @__PURE__ */ g('i', { className: 'wx-2ZWgb4 ' + t }),
      i || o || ' ',
    ],
  });
}
function gi({
  id: n,
  label: e = '',
  inputValue: t = '',
  value: r = !1,
  onChange: s,
  disabled: o = !1,
}) {
  const i = Ot(n),
    [l, a] = Ve(r);
  return /* @__PURE__ */ Z('div', {
    className: 'wx-2IvefP wx-checkbox',
    children: [
      /* @__PURE__ */ g('input', {
        type: 'checkbox',
        id: i,
        disabled: o,
        className: 'wx-2IvefP wx-check',
        checked: l,
        value: t,
        onChange: ({ target: d }) => {
          const c = d.checked;
          a(c), s && s({ value: c, inputValue: t });
        },
      }),
      /* @__PURE__ */ Z('label', {
        htmlFor: i,
        className: 'wx-2IvefP wx-label',
        children: [
          /* @__PURE__ */ g('span', { className: 'wx-2IvefP wx-before' }),
          e &&
            /* @__PURE__ */ g('span', {
              className: 'wx-2IvefP wx-after',
              children: e,
            }),
        ],
      }),
    ],
  });
}
function Wt({
  position: n = 'bottom',
  align: e = 'start',
  autoFit: t = !0,
  onCancel: r,
  width: s = '100%',
  children: o,
}) {
  const i = W(null),
    [l, a] = Ve(n),
    [d, c] = Ve(e);
  return (
    G(() => {
      if (t) {
        const u = i.current;
        if (u) {
          const f = u.getBoundingClientRect(),
            p = Je.getTopNode(u).getBoundingClientRect();
          f.right >= p.right && c('end'), f.bottom >= p.bottom && a('top');
        }
      }
    }, [t]),
    G(() => {
      if (i.current) {
        const u = (f) => {
          r && r(f);
        };
        return Jt(i.current, u).destroy;
      }
    }, [r]),
    /* @__PURE__ */ g('div', {
      ref: i,
      className: `wx-32GZ52 wx-dropdown wx-${l}-${d}`,
      style: { width: s },
      children: o,
    })
  );
}
function nn() {
  return Mt(en);
}
function mi() {
  let n = null,
    e = !1,
    t,
    r,
    s,
    o;
  const i = (c, u, f, p) => {
      (t = c), (r = u), (s = f), (o = p);
    },
    l = (c) => {
      (n = c), (e = n !== null), s(n);
    },
    a = (c, u) => {
      if (c !== null && t) {
        const f = t.querySelectorAll('.wx-list > .wx-item')[c];
        f && (f.scrollIntoView({ block: 'nearest' }), u && u.preventDefault());
      }
    },
    d = (c, u) => {
      const f = c === null ? null : Math.max(0, Math.min(n + c, r.length - 1));
      f !== n && (l(f), t ? a(f, u) : requestAnimationFrame(() => a(f, u)));
    };
  return {
    move: (c) => {
      const u = bt(c),
        f = r.findIndex((p) => p.id == u);
      f !== n && l(f);
    },
    keydown: (c, u) => {
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
          d(e ? 1 : u || 0, c);
          break;
        case 'ArrowUp':
          d(e ? -1 : u || 0, c);
          break;
      }
    },
    init: i,
    navigate: d,
  };
}
function En({ items: n = [], children: e, onSelect: t, onReady: r }) {
  const s = W(),
    o = W(mi()),
    [i, l] = U(null),
    a = W(i),
    d = ($e(nt) || nn()).getGroup('core'),
    c = (f) => {
      f && f.stopPropagation(), t && t({ id: n[a.current]?.id });
    };
  G(() => {
    o.current.init(
      s.current,
      n,
      (f) => {
        l(f), (a.current = f);
      },
      c,
    );
  }, [n, s.current]),
    G(() => {
      r && r(o.current);
    }, []);
  const u = E(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null
    ? null
    : /* @__PURE__ */ g(Wt, {
        onCancel: u,
        children: /* @__PURE__ */ g('div', {
          className: 'wx-233fr7 wx-list',
          ref: s,
          onClick: c,
          onMouseMove: o.current.move,
          children: n.length
            ? n.map((f, p) =>
                /* @__PURE__ */ g(
                  'div',
                  {
                    className: `wx-233fr7 wx-item ${p === i ? 'wx-focus' : ''}`,
                    'data-id': f.id,
                    children: e ? Ds(e, { option: f }) : f.label,
                  },
                  f.id,
                ),
              )
            : /* @__PURE__ */ g('div', {
                className: 'wx-233fr7 wx-no-data',
                children: d('No data'),
              }),
        }),
      });
}
function wi({
  value: n = '',
  id: e,
  options: t = [],
  textOptions: r = null,
  textField: s = 'label',
  placeholder: o = '',
  title: i = '',
  disabled: l = !1,
  error: a = !1,
  clear: d = !1,
  children: c,
  onChange: u,
}) {
  const f = Ot(e),
    p = W(null),
    w = W(null),
    [h, m] = Ve(n),
    [x, y] = U(!1),
    [b, k] = U(''),
    _ = W(null),
    S = W(!1),
    C = $(() => {
      if (x) return b;
      if (h || h === 0) {
        const j = (r || t).find((ae) => ae.id === h);
        if (j) return j[s];
      }
      return '';
    }, [x, b, h, r, t, s]),
    D = $(
      () =>
        !C || !x
          ? t
          : t.filter((j) => j[s].toLowerCase().includes(C.toLowerCase())),
      [C, x, t, s],
    ),
    F = E(() => D.findIndex((j) => j.id === h), [D, h]),
    N = E((j) => {
      (p.current = j.navigate), (w.current = j.keydown);
    }, []),
    T = E(
      (j, ae) => {
        if (j || j === 0) {
          let ye = t.find((L) => L.id === j);
          if ((y(!1), ae && p.current(null), ye && h !== ye.id)) {
            const L = ye.id;
            m(L), u && u({ value: L });
          }
        }
        !S.current && ae && _.current.focus();
      },
      [t, h, u],
    ),
    z = E(
      ({ id: j }) => {
        T(j, !0);
      },
      [T],
    ),
    Y = E(
      (j) => {
        j && j.stopPropagation(), m(''), y(!1), u && u({ value: '' });
      },
      [u],
    ),
    O = E(
      (j) => {
        if (!t.length) return;
        if (j === '' && d) {
          Y();
          return;
        }
        let ae = t.find((L) => L[s] === j);
        ae ||
          (ae = t.find((L) => L[s].toLowerCase().includes(j.toLowerCase())));
        const ye = ae ? ae.id : h || t[0].id;
        T(ye, !1);
      },
      [t, s, d, h, T, Y],
    ),
    V = E(() => {
      k(_.current.value), y(!0), D.length ? p.current(0) : p.current(null);
    }, [D.length, p]),
    K = E(() => {
      S.current = !0;
    }, []),
    ue = E(() => {
      (S.current = !1),
        setTimeout(() => {
          S.current || O(C);
        }, 200);
    }, [O, C]);
  return /* @__PURE__ */ Z('div', {
    className: 'wx-1j11Jk wx-combo',
    onClick: () => p.current(F()),
    onKeyDown: (j) => w.current(j, F()),
    title: i,
    children: [
      /* @__PURE__ */ g('input', {
        className: 'wx-1j11Jk wx-input ' + (a ? 'wx-error' : ''),
        id: f,
        ref: _,
        value: C,
        disabled: l,
        placeholder: o,
        onFocus: K,
        onBlur: ue,
        onInput: V,
      }),
      d && !l && h
        ? /* @__PURE__ */ g('i', {
            className: 'wx-1j11Jk wx-icon wxi-close',
            onClick: Y,
          })
        : /* @__PURE__ */ g('i', {
            className: 'wx-1j11Jk wx-icon wxi-angle-down',
          }),
      !l &&
        /* @__PURE__ */ g(En, {
          items: D,
          onReady: N,
          onSelect: z,
          children: ({ option: j }) =>
            /* @__PURE__ */ g(Re, { children: c ? c({ option: j }) : j[s] }),
        }),
    ],
  });
}
function rn({
  value: n = '',
  id: e,
  readonly: t = !1,
  focus: r = !1,
  select: s = !1,
  type: o = 'text',
  placeholder: i = '',
  disabled: l = !1,
  error: a = !1,
  inputStyle: d = {},
  title: c = '',
  css: u = '',
  icon: f = '',
  clear: p = !1,
  onChange: w,
}) {
  const h = Ot(e),
    [m, x] = Ve(n),
    y = W(null),
    b = $(
      () => (f && u.indexOf('wx-icon-left') === -1 ? 'wx-icon-right ' + u : u),
      [f, u],
    ),
    k = $(() => f && u.indexOf('wx-icon-left') !== -1, [f, u]);
  G(() => {
    const F = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(F);
  }, [r, s]);
  const _ = E(
      (F) => {
        const N = F.target.value;
        x(N), w && w({ value: N, input: !0 });
      },
      [w],
    ),
    S = E((F) => w && w({ value: F.target.value }), [w]);
  function C(F) {
    F.stopPropagation(), x(''), w && w({ value: '' });
  }
  let D = o;
  return (
    o !== 'password' && o !== 'number' && (D = 'text'),
    G(() => {
      const F = S,
        N = y.current;
      return (
        N.addEventListener('change', F),
        () => {
          N && N.removeEventListener('change', F);
        }
      );
    }, [S]),
    /* @__PURE__ */ Z('div', {
      className: `wx-hQ64J4 wx-text ${b} ${a ? 'wx-error' : ''} ${l ? 'wx-disabled' : ''} ${p ? 'wx-clear' : ''}`,
      children: [
        /* @__PURE__ */ g('input', {
          className: 'wx-hQ64J4 wx-input',
          ref: y,
          id: h,
          readOnly: t,
          disabled: l,
          placeholder: i,
          type: D,
          style: d,
          title: c,
          value: m,
          onInput: _,
        }),
        p && !l && m
          ? /* @__PURE__ */ Z(Re, {
              children: [
                /* @__PURE__ */ g('i', {
                  className: 'wx-hQ64J4 wx-icon wxi-close',
                  onClick: C,
                }),
                k &&
                  /* @__PURE__ */ g('i', {
                    className: `wx-hQ64J4 wx-icon ${f}`,
                  }),
              ],
            })
          : f
            ? /* @__PURE__ */ g('i', { className: `wx-hQ64J4 wx-icon ${f}` })
            : null,
      ],
    })
  );
}
function xi({ date: n, type: e, part: t, onShift: r }) {
  const { calendar: s, formats: o } = $e(nt).getRaw(),
    i = n.getFullYear(),
    l = $(() => {
      switch (e) {
        case 'month':
          return dt(o.monthYearFormat, s)(n);
        case 'year':
          return dt(o.yearFormat, s)(n);
        case 'duodecade': {
          const { start: d, end: c } = Ms(i),
            u = dt(o.yearFormat, s);
          return `${u(new Date(d, 0, 1))} - ${u(new Date(c, 11, 31))}`;
        }
        default:
          return '';
      }
    }, [n, e, i, s, o]);
  function a() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ Z('div', {
    className: 'wx-8HQVQV wx-header',
    children: [
      t !== 'right'
        ? /* @__PURE__ */ g('i', {
            className: 'wx-8HQVQV wx-pager wxi-angle-left',
            onClick: () => r && r({ diff: -1, type: e }),
          })
        : /* @__PURE__ */ g('span', { className: 'wx-8HQVQV wx-spacer' }),
      /* @__PURE__ */ g('span', {
        className: 'wx-8HQVQV wx-label',
        onClick: a,
        children: l,
      }),
      t !== 'left'
        ? /* @__PURE__ */ g('i', {
            className: 'wx-8HQVQV wx-pager wxi-angle-right',
            onClick: () => r && r({ diff: 1, type: e }),
          })
        : /* @__PURE__ */ g('span', { className: 'wx-8HQVQV wx-spacer' }),
    ],
  });
}
function vr({ onClick: n, children: e }) {
  return /* @__PURE__ */ g('button', {
    className: 'wx-3s8W4d wx-button',
    onClick: n,
    children: e,
  });
}
function yi({
  value: n,
  current: e,
  part: t = '',
  markers: r = null,
  onCancel: s,
  onChange: o,
}) {
  const i = ($e(nt) || nn()).getRaw().calendar,
    l = (i.weekStart || 7) % 7,
    a = i.dayShort.slice(l).concat(i.dayShort.slice(0, l)),
    d = (k, _, S) =>
      new Date(
        k.getFullYear(),
        k.getMonth() + (_ || 0),
        k.getDate() + (S || 0),
      );
  let c = t !== 'normal';
  function u(k) {
    const _ = k.getDay();
    return _ === 0 || _ === 6;
  }
  function f() {
    const k = d(e, 0, 1 - e.getDate());
    return k.setDate(k.getDate() - ((k.getDay() - (l - 7)) % 7)), k;
  }
  function p() {
    const k = d(e, 1, -e.getDate());
    return k.setDate(k.getDate() + ((6 - k.getDay() + l) % 7)), k;
  }
  const w = W(0);
  function h(k, _) {
    _.timeStamp !== w.current &&
      ((w.current = _.timeStamp),
      _.stopPropagation(),
      o && o(new Date(new Date(k))),
      s && s());
  }
  const m = $(
      () =>
        t == 'normal'
          ? [n ? d(n).valueOf() : 0]
          : n
            ? [
                n.start ? d(n.start).valueOf() : 0,
                n.end ? d(n.end).valueOf() : 0,
              ]
            : [0, 0],
      [t, n],
    ),
    x = $(() => {
      const k = f(),
        _ = p(),
        S = e.getMonth();
      let C = [];
      for (let D = k; D <= _; D.setDate(D.getDate() + 1)) {
        const F = {
          day: D.getDate(),
          in: D.getMonth() === S,
          date: D.valueOf(),
        };
        let N = '';
        if (
          ((N += F.in ? '' : ' wx-inactive'),
          (N += m.indexOf(F.date) > -1 ? ' wx-selected' : ''),
          c)
        ) {
          const T = F.date == m[0],
            z = F.date == m[1];
          T && !z ? (N += ' wx-left') : z && !T && (N += ' wx-right'),
            F.date > m[0] && F.date < m[1] && (N += ' wx-inrange');
        }
        if (((N += u(D) ? ' wx-weekend' : ''), r)) {
          const T = r(D);
          T && (N += ' ' + T);
        }
        C.push({ ...F, css: N });
      }
      return C;
    }, [e, m, c, r]),
    y = W(null);
  let b = W({});
  return (
    (b.current.click = h),
    G(() => {
      Ns(y.current, b.current);
    }, []),
    /* @__PURE__ */ Z('div', {
      children: [
        /* @__PURE__ */ g('div', {
          className: 'wx-398RBS wx-weekdays',
          children: a.map((k) =>
            /* @__PURE__ */ g(
              'div',
              { className: 'wx-398RBS wx-weekday', children: k },
              k,
            ),
          ),
        }),
        /* @__PURE__ */ g('div', {
          className: 'wx-398RBS wx-days',
          ref: y,
          children: x.map((k) =>
            /* @__PURE__ */ g(
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
function vi({
  value: n,
  current: e,
  part: t,
  onCancel: r,
  onChange: s,
  onShift: o,
}) {
  const [i, l] = Ve(n || /* @__PURE__ */ new Date()),
    [a, d] = Ve(e || /* @__PURE__ */ new Date()),
    c = $e(nt).getRaw().calendar,
    u = c.monthShort || [],
    f = $(() => a.getMonth(), [a]),
    p = E(
      (m, x) => {
        if (m != null) {
          x.stopPropagation();
          const y = new Date(a);
          y.setMonth(m), d(y), o && o({ current: y });
        }
        t === 'normal' && l(new Date(a)), r && r();
      },
      [a, t, o, r],
    ),
    w = E(() => {
      const m = new Date(Rs(i, t) || a);
      m.setMonth(a.getMonth()), m.setFullYear(a.getFullYear()), s && s(m);
    }, [i, a, t, s]),
    h = E(
      (m) => {
        const x = m.target.closest('[data-id]');
        if (x) {
          const y = parseInt(x.getAttribute('data-id'), 10);
          p(y, m);
        }
      },
      [p],
    );
  return /* @__PURE__ */ Z(Re, {
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-34U8T8 wx-months',
        onClick: h,
        children: u.map((m, x) =>
          /* @__PURE__ */ g(
            'div',
            {
              className: 'wx-34U8T8 wx-month' + (f === x ? ' wx-current' : ''),
              'data-id': x,
              children: m,
            },
            x,
          ),
        ),
      }),
      /* @__PURE__ */ g('div', {
        className: 'wx-34U8T8 wx-buttons',
        children: /* @__PURE__ */ g(vr, { onClick: w, children: c.done }),
      }),
    ],
  });
}
const Gn = 'wx-1XEF33',
  ki = ({
    value: n,
    current: e,
    onCancel: t,
    onChange: r,
    onShift: s,
    part: o,
  }) => {
    const i = $e(nt).getRaw().calendar,
      [l, a] = Ve(e),
      [d, c] = Ve(n),
      u = $(() => l.getFullYear(), [l]),
      f = $(() => {
        const { start: x, end: y } = Ms(u),
          b = [];
        for (let k = x; k <= y; ++k) b.push(k);
        return b;
      }, [u]),
      p = {
        click: w,
      };
    function w(x, y) {
      if (x) {
        y.stopPropagation();
        const b = new Date(l);
        b.setFullYear(x), a(b), s && s({ current: b });
      }
      o === 'normal' && c(new Date(l)), t && t();
    }
    function h() {
      const x = new Date(Rs(d, o) || l);
      x.setFullYear(l.getFullYear()), r && r(x);
    }
    const m = W(null);
    return (
      G(() => {
        m.current && Ns(m.current, p);
      }, []),
      /* @__PURE__ */ Z(Re, {
        children: [
          /* @__PURE__ */ g('div', {
            className: Gn + ' wx-years',
            ref: m,
            children: f.map((x, y) =>
              /* @__PURE__ */ g(
                'div',
                {
                  className:
                    Gn +
                    ` wx-year ${u == x ? 'wx-current' : ''} ${y === 0 ? 'wx-prev-decade' : ''} ${y === 11 ? 'wx-next-decade' : ''}`,
                  'data-id': x,
                  children: x,
                },
                y,
              ),
            ),
          }),
          /* @__PURE__ */ g('div', {
            className: Gn + ' wx-buttons',
            children: /* @__PURE__ */ g(vr, { onClick: h, children: i.done }),
          }),
        ],
      })
    );
  },
  Vr = {
    month: {
      component: yi,
      next: Si,
      prev: bi,
    },
    year: {
      component: vi,
      next: Ci,
      prev: $i,
    },
    duodecade: {
      component: ki,
      next: Ni,
      prev: _i,
    },
  };
function bi(n) {
  return (n = new Date(n)), n.setMonth(n.getMonth() - 1), n;
}
function Si(n) {
  return (n = new Date(n)), n.setMonth(n.getMonth() + 1), n;
}
function $i(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() - 1), n;
}
function Ci(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() + 1), n;
}
function _i(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() - 10), n;
}
function Ni(n) {
  return (n = new Date(n)), n.setFullYear(n.getFullYear() + 10), n;
}
function Rs(n, e) {
  let t;
  if (e === 'normal') t = n;
  else {
    const { start: r, end: s } = n;
    e === 'left' ? (t = r) : e == 'right' ? (t = s) : (t = r && s);
  }
  return t;
}
const Ti = ['clear', 'today'];
function Mi(n) {
  if (n === 'done') return -1;
  if (n === 'clear') return null;
  if (n === 'today') return /* @__PURE__ */ new Date();
}
function Di({
  value: n,
  current: e,
  onCurrentChange: t,
  part: r = 'normal',
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: l,
}) {
  const a = $e(nt).getGroup('calendar'),
    [d, c] = U('month'),
    u = Array.isArray(o) ? o : o ? Ti : [],
    f = (x, y) => {
      x.preventDefault(), l && l({ value: y });
    },
    p = () => {
      d === 'duodecade' ? c('year') : d === 'year' && c('month');
    },
    w = (x) => {
      const { diff: y, current: b } = x;
      if (y === 0) {
        d === 'month' ? c('year') : d === 'year' && c('duodecade');
        return;
      }
      if (y) {
        const k = Vr[d];
        t(y > 0 ? k.next(e) : k.prev(e));
      } else b && t(b);
      i && i();
    },
    h = (x) => {
      c('month'), l && l({ select: !0, value: x });
    },
    m = $(() => Vr[d].component, [d]);
  return /* @__PURE__ */ g('div', {
    className: `wx-2Gr4AS wx-calendar ${r !== 'normal' && r !== 'both' ? 'wx-part' : ''}`,
    children: /* @__PURE__ */ Z('div', {
      className: 'wx-2Gr4AS wx-wrap',
      children: [
        /* @__PURE__ */ g(xi, { date: e, part: r, type: d, onShift: w }),
        /* @__PURE__ */ Z('div', {
          children: [
            /* @__PURE__ */ g(m, {
              value: n,
              current: e,
              onCurrentChange: t,
              part: r,
              markers: s,
              onCancel: p,
              onChange: h,
              onShift: w,
            }),
            d === 'month' &&
              u.length > 0 &&
              /* @__PURE__ */ g('div', {
                className: 'wx-2Gr4AS wx-buttons',
                children: u.map((x) =>
                  /* @__PURE__ */ g(
                    'div',
                    {
                      className: 'wx-2Gr4AS wx-button-item',
                      children: /* @__PURE__ */ g(vr, {
                        onClick: (y) => f(y, Mi(x)),
                        children: a(x),
                      }),
                    },
                    x,
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
    s = $e(nt);
  const o = $(() => {
    let i = s;
    return (
      (!i || !i.extend) && (i = Mt(en)), e !== null && (i = i.extend(e, t)), i
    );
  }, [e, t, s]);
  return /* @__PURE__ */ g(nt.Provider, { value: o, children: r });
}
function Br(n, e, t, r) {
  if (!n || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), t(s);
  } else if (n.getDate() !== 1) {
    const s = new Date(n);
    s.setDate(1), t(s);
  }
}
const Ei = ['clear', 'today'];
function Hs({
  value: n,
  current: e,
  markers: t = null,
  buttons: r = Ei,
  onChange: s,
}) {
  const [o, i] = Ve(n),
    [l, a] = Ve(e);
  G(() => {
    Br(l, o, a, !1);
  }, [o, l]);
  const d = E(
      (u) => {
        const f = u.value;
        f ? (i(new Date(f)), Br(l, new Date(f), a, !0)) : i(null),
          s && s({ value: f ? new Date(f) : null });
      },
      [s, l],
    ),
    c = E(
      (u) => {
        a(u);
      },
      [a],
    );
  return l
    ? /* @__PURE__ */ g(In, {
        children: /* @__PURE__ */ g(Di, {
          value: o,
          current: l,
          markers: t,
          buttons: r,
          onChange: d,
          onCurrentChange: c,
        }),
      })
    : null;
}
const Ii = ['clear', 'today'];
function Ri({
  value: n,
  id: e,
  disabled: t = !1,
  error: r = !1,
  width: s = 'unset',
  align: o = 'start',
  placeholder: i = '',
  format: l = '',
  buttons: a = Ii,
  css: d = '',
  title: c = '',
  editable: u = !1,
  clear: f = !1,
  onChange: p,
}) {
  const { calendar: w, formats: h } = ($e(nt) || nn()).getRaw(),
    m = l || h?.dateFormat;
  let x = typeof m == 'function' ? m : dt(m, w);
  const [y, b] = U(n),
    [k, _] = U(!1);
  G(() => {
    b(n);
  }, [n]);
  function S() {
    _(!1);
  }
  function C(N) {
    const T = N === y || (N && y && N.valueOf() === y.valueOf()) || (!N && !y);
    b(N), T || (p && p({ value: N })), setTimeout(S, 1);
  }
  const D = $(() => (y ? x(y) : ''), [y, x]);
  function F({ value: N, input: T }) {
    if ((!u && !f) || T) return;
    let z = typeof u == 'function' ? u(N) : N ? new Date(N) : null;
    (z = isNaN(z) ? y || null : z || null), C(z);
  }
  return (
    G(() => {
      const N = S;
      return (
        window.addEventListener('scroll', N),
        () => window.removeEventListener('scroll', N)
      );
    }, []),
    /* @__PURE__ */ Z('div', {
      className: 'wx-1lKOFG wx-datepicker',
      onClick: () => _(!0),
      children: [
        /* @__PURE__ */ g(rn, {
          css: d,
          title: c,
          value: D,
          id: e,
          readonly: !u,
          disabled: t,
          error: r,
          placeholder: i,
          onInput: S,
          onChange: F,
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
          /* @__PURE__ */ g(Wt, {
            onCancel: S,
            width: s,
            align: o,
            autoFit: !!o,
            children: /* @__PURE__ */ g(Hs, {
              buttons: a,
              value: y,
              onChange: (N) => C(N.value),
            }),
          }),
      ],
    })
  );
}
function As({
  value: n = '',
  options: e = [],
  textOptions: t = null,
  placeholder: r = '',
  disabled: s = !1,
  error: o = !1,
  title: i = '',
  textField: l = 'label',
  clear: a = !1,
  children: d,
  onChange: c,
}) {
  const u = W(null),
    f = W(null);
  let [p, w] = Ve(n);
  function h(k) {
    (u.current = k.navigate), (f.current = k.keydown);
  }
  const m = $(
      () => (p || p === 0 ? (t || e).find((k) => k.id === p) : null),
      [p, t, e],
    ),
    x = E(
      ({ id: k }) => {
        (k || k === 0) && (w(k), u.current(null), c && c({ value: k }));
      },
      [w, c],
    ),
    y = E(
      (k) => {
        k.stopPropagation(), w(''), c && c({ value: '' });
      },
      [w, c],
    ),
    b = E(() => e.findIndex((k) => k.id === p), [e, p]);
  return /* @__PURE__ */ Z('div', {
    className: `wx-2YgblL wx-richselect ${o ? 'wx-2YgblL wx-error' : ''} ${s ? 'wx-2YgblL wx-disabled' : ''} ${d ? '' : 'wx-2YgblL wx-nowrap'}`,
    title: i,
    onClick: () => u.current(b()),
    onKeyDown: (k) => f.current(k, b()),
    tabIndex: 0,
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-2YgblL wx-label',
        children: m
          ? d
            ? d(m)
            : m[l]
          : r
            ? /* @__PURE__ */ g('span', {
                className: 'wx-2YgblL wx-placeholder',
                children: r,
              })
            : ' ',
      }),
      a && !s && p
        ? /* @__PURE__ */ g('i', {
            className: 'wx-2YgblL wx-icon wxi-close',
            onClick: y,
          })
        : /* @__PURE__ */ g('i', {
            className: 'wx-2YgblL wx-icon wxi-angle-down',
          }),
      !s &&
        /* @__PURE__ */ g(En, {
          items: e,
          onReady: h,
          onSelect: x,
          children: ({ option: k }) => (d ? d(k) : k[l]),
        }),
    ],
  });
}
function sr({
  id: n,
  label: e = '',
  css: t = '',
  min: r = 0,
  max: s = 100,
  value: o = 0,
  step: i = 1,
  title: l = '',
  disabled: a = !1,
  onChange: d,
}) {
  const c = Ot(n),
    [u, f] = Ve(o),
    p = W({ value: u, input: u }),
    w = $(() => ((u - r) / (s - r)) * 100 + '%', [u, r, s]),
    h = $(
      () =>
        a
          ? ''
          : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${w}, var(--wx-slider-background) ${w} 100%)`,
      [a, w],
    );
  function m({ target: b }) {
    const k = b.value * 1;
    f(k),
      d &&
        d({
          value: k,
          previous: p.current.input,
          input: !0,
        }),
      (p.current.input = k);
  }
  function x({ target: b }) {
    const k = b.value * 1;
    f(k),
      d && d({ value: k, previous: p.current.value }),
      (p.current.value = k);
  }
  G(() => {
    f(o);
  }, [o]);
  const y = W(null);
  return (
    G(() => {
      if (y.current)
        return (
          y.current.addEventListener('change', x),
          () => {
            y.current && y.current.removeEventListener('change', x);
          }
        );
    }, [y, x]),
    /* @__PURE__ */ Z('div', {
      className: `wx-2EDJ8G wx-slider ${t}`,
      title: l,
      children: [
        e &&
          /* @__PURE__ */ g('label', {
            className: 'wx-2EDJ8G wx-label',
            htmlFor: c,
            children: e,
          }),
        /* @__PURE__ */ g('div', {
          className: 'wx-2EDJ8G wx-inner',
          children: /* @__PURE__ */ g('input', {
            id: c,
            className: 'wx-2EDJ8G wx-input',
            type: 'range',
            min: r,
            max: s,
            step: i,
            disabled: a,
            value: u,
            onInput: m,
            style: { background: h },
            ref: y,
          }),
        }),
      ],
    })
  );
}
const Hi = ({
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
  const d = Ot(n),
    [c, u] = Ve(e),
    f = E(() => {
      if (l || c <= r) return;
      const m = c - t;
      u(m), a && a({ value: m });
    }, [c, l, r, t, a]),
    p = E(() => {
      if (l || c >= s) return;
      const m = c + t;
      u(m), a && a({ value: m });
    }, [c, l, s, t, a]),
    w = E(() => {
      if (!l) {
        const m = Math.round(Math.min(s, Math.max(c, r)) / t) * t,
          x = isNaN(m) ? Math.max(r, 0) : m;
        u(x), a && a({ value: x });
      }
    }, [l, c, s, r, t, a]),
    h = E(
      (m) => {
        const x = m.target.value * 1;
        u(x), a && a({ value: x, input: !0 });
      },
      [a],
    );
  return /* @__PURE__ */ Z('div', {
    className: `wx-22t21n wx-counter ${i ? 'wx-disabled' : ''} ${l ? 'wx-readonly' : ''} ${o ? 'wx-error' : ''}`,
    children: [
      /* @__PURE__ */ g('button', {
        'aria-label': '-',
        className: 'wx-22t21n wx-btn wx-btn-dec',
        disabled: i,
        onClick: f,
        children: /* @__PURE__ */ g('svg', {
          className: 'wx-22t21n wx-dec',
          width: '12',
          height: '2',
          viewBox: '0 0 12 2',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          children: /* @__PURE__ */ g('path', {
            d: 'M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z',
          }),
        }),
      }),
      /* @__PURE__ */ g('input', {
        id: d,
        type: 'text',
        className: 'wx-22t21n wx-input',
        disabled: i,
        readOnly: l,
        required: !0,
        value: c,
        onBlur: w,
        onInput: h,
      }),
      /* @__PURE__ */ g('button', {
        'aria-label': '-',
        className: 'wx-22t21n wx-btn wx-btn-inc',
        disabled: i,
        onClick: p,
        children: /* @__PURE__ */ g('svg', {
          className: 'wx-22t21n wx-inc',
          width: '12',
          height: '12',
          viewBox: '0 0 12 12',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          children: /* @__PURE__ */ g('path', {
            d: `M11.2501
								6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z`,
          }),
        }),
      }),
    ],
  });
};
function Ai({ notice: n = {} }) {
  function e() {
    n.remove && n.remove();
  }
  return /* @__PURE__ */ Z('div', {
    className: `wx-11sNg5 wx-notice wx-${n.type ? n.type : ''}`,
    role: 'status',
    'aria-live': 'polite',
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-11sNg5 wx-text',
        children: n.text,
      }),
      /* @__PURE__ */ g('div', {
        className: 'wx-11sNg5 wx-button',
        children: /* @__PURE__ */ g('i', {
          className: 'wx-11sNg5 wxi-close',
          onClick: e,
        }),
      }),
    ],
  });
}
function Li({ data: n = [] }) {
  return /* @__PURE__ */ g('div', {
    className: 'wx-3nwoO9 wx-notices',
    children: n.map((e) => /* @__PURE__ */ g(Ai, { notice: e }, e.id)),
  });
}
function Pi({
  title: n = '',
  buttons: e = ['cancel', 'ok'],
  header: t,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i,
}) {
  const l = ($e(nt) || nn()).getGroup('core'),
    a = W(null);
  G(() => {
    a.current?.focus();
  }, []);
  function d(u) {
    switch (u.code) {
      case 'Enter': {
        const f = u.target.tagName;
        if (f === 'TEXTAREA' || f === 'BUTTON') return;
        o && o({ event: u });
        break;
      }
      case 'Escape':
        i && i({ event: u });
        break;
    }
  }
  function c(u, f) {
    const p = { event: u, button: f };
    f === 'cancel' ? i && i(p) : o && o(p);
  }
  return /* @__PURE__ */ g('div', {
    className: 'wx-1FxkZa wx-modal',
    ref: a,
    tabIndex: 0,
    onKeyDown: d,
    children: /* @__PURE__ */ Z('div', {
      className: 'wx-1FxkZa wx-window',
      children: [
        t ||
          (n
            ? /* @__PURE__ */ g('div', {
                className: 'wx-1FxkZa wx-header',
                children: n,
              })
            : null),
        /* @__PURE__ */ g('div', { children: r }),
        s ||
          (e &&
            /* @__PURE__ */ g('div', {
              className: 'wx-1FxkZa wx-buttons',
              children: e.map((u) =>
                /* @__PURE__ */ g(
                  'div',
                  {
                    className: 'wx-1FxkZa wx-button',
                    children: /* @__PURE__ */ g(ut, {
                      type: `block ${u === 'ok' ? 'primary' : 'secondary'}`,
                      onClick: (f) => c(f, u),
                      children: l(u),
                    }),
                  },
                  u,
                ),
              ),
            })),
      ],
    }),
  });
}
function zi({ children: n }, e) {
  const [t, r] = U(null),
    [s, o] = U([]);
  return (
    Tt(
      e,
      () => ({
        showModal: (i) => {
          const l = { ...i };
          return (
            r(l),
            new Promise((a, d) => {
              (l.resolve = (c) => {
                r(null), a(c);
              }),
                (l.reject = (c) => {
                  r(null), d(c);
                });
            })
          );
        },
        showNotice: (i) => {
          (i = { ...i }),
            (i.id = i.id || Dn()),
            (i.remove = () => o((l) => l.filter((a) => a.id !== i.id))),
            i.expire != -1 && setTimeout(i.remove, i.expire || 5100),
            o((l) => [...l, i]);
        },
      }),
      [],
    ),
    /* @__PURE__ */ Z(Re, {
      children: [
        n,
        t &&
          /* @__PURE__ */ g(Pi, {
            title: t.title,
            buttons: t.buttons,
            onConfirm: t.resolve,
            onCancel: t.reject,
            children: t.message,
          }),
        /* @__PURE__ */ g(Li, { data: s }),
      ],
    })
  );
}
Nt(zi);
function qt({
  label: n = '',
  position: e = '',
  css: t = '',
  error: r = !1,
  type: s = '',
  required: o = !1,
  children: i,
}) {
  const l = W(null),
    a = E(() => {
      if (l.current) return l.current;
      const d = Dn();
      return (l.current = d), d;
    }, []);
  return /* @__PURE__ */ g(yr.Provider, {
    value: a,
    children: /* @__PURE__ */ Z('div', {
      className:
        `wx-2oVUvC wx-field wx-${e} ${t} ${r ? 'wx-error' : ''} ${o ? 'wx-required' : ''}`.trim(),
      children: [
        n &&
          /* @__PURE__ */ g('label', {
            className: 'wx-2oVUvC wx-label',
            htmlFor: l.current,
            children: n,
          }),
        /* @__PURE__ */ g('div', {
          className: `wx-2oVUvC wx-field-control wx-${s}`,
          children: i,
        }),
      ],
    }),
  });
}
const Ls = ({
    value: n = !1,
    type: e = '',
    icon: t = '',
    disabled: r = !1,
    iconActive: s = '',
    onClick: o,
    title: i = '',
    css: l = '',
    text: a = '',
    textActive: d = '',
    children: c,
    active: u,
    onChange: f,
  }) => {
    const [p, w] = Ve(n),
      h = $(() => (p ? 'pressed' : '') + (e ? ' ' + e : ''), [p, e]),
      m = E(
        (x) => {
          let y = !p;
          o && o(x), x.defaultPrevented || (w(y), f && f({ value: y }));
        },
        [p, o, f],
      );
    return p && u
      ? /* @__PURE__ */ g(ut, {
          title: i,
          text: (p && d) || a,
          css: l,
          type: h,
          icon: (p && s) || t,
          onClick: m,
          disabled: r,
          children: Ds(u, { value: p }),
        })
      : c
        ? /* @__PURE__ */ g(ut, {
            title: i,
            text: (p && d) || a,
            css: l,
            type: h,
            icon: (p && s) || t,
            onClick: m,
            disabled: r,
            children: c,
          })
        : /* @__PURE__ */ g(ut, {
            title: i,
            text: (p && d) || a,
            css: l,
            type: h,
            icon: (p && s) || t,
            onClick: m,
            disabled: r,
          });
  },
  Kr = new Date(0, 0, 0, 0, 0);
function Oi({
  value: n = Kr,
  id: e,
  title: t = '',
  css: r = '',
  disabled: s = !1,
  error: o = !1,
  format: i = '',
  onChange: l,
}) {
  let [a, d] = Ve(n);
  const { calendar: c, formats: u } = ($e(nt) || nn()).getRaw(),
    f = c.clockFormat == 12,
    p = 23,
    w = 59,
    h = $(() => {
      const L = i || u?.timeFormat;
      return typeof L == 'function' ? L : dt(L, c);
    }, [i, u, c]),
    m = $(() => h(new Date(0, 0, 0, 1)).indexOf('01') != -1, [h]),
    x = (L, se) => (L < 10 && se ? `0${L}` : `${L}`).slice(-2),
    y = (L) => x(L, !0),
    b = (L) => `${L}`.replace(/[^\d]/g, '') || 0,
    k = (L) => (f && ((L = L % 12), L === 0) ? '12' : x(L, m)),
    _ = E((L, se) => ((L = b(L)), Math.min(L, se)), []),
    [S, C] = U(null),
    D = a || Kr,
    F = _(D.getHours(), p),
    N = _(D.getMinutes(), w),
    T = F > 12,
    z = k(F),
    Y = y(N),
    O = $(() => h(new Date(0, 0, 0, F, N)), [F, N, h]),
    V = E(() => {
      C(!0);
    }, []),
    K = E(() => {
      const L = new Date(D);
      L.setHours(L.getHours() + (T ? -12 : 12)), d(L), l && l({ value: L });
    }, [D, T, l]),
    ue = E(
      ({ value: L }) => {
        if (D.getHours() === L) return;
        const se = new Date(D);
        se.setHours(L), d(se), l && l({ value: se });
      },
      [D, l],
    ),
    j = E(
      ({ value: L }) => {
        if (D.getMinutes() === L) return;
        const se = new Date(D);
        se.setMinutes(L), d(se), l && l({ value: se });
      },
      [D, l],
    ),
    ae = E(
      (L) => (
        (L = _(L, p)),
        f && ((L = L * 1), L === 12 && (L = 0), T && (L += 12)),
        L
      ),
      [_, f, T],
    ),
    ye = E(() => {
      C(null);
    }, []);
  return /* @__PURE__ */ Z('div', {
    className: `wx-7f497i wx-timepicker ${o ? 'wx-7f497i wx-error' : ''} ${s ? 'wx-7f497i wx-disabled' : ''}`,
    onClick: s ? void 0 : V,
    style: { cursor: s ? 'default' : 'pointer' },
    children: [
      /* @__PURE__ */ g(rn, {
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
        /* @__PURE__ */ g(Wt, {
          onCancel: ye,
          width: 'unset',
          children: /* @__PURE__ */ Z('div', {
            className: 'wx-7f497i wx-wrapper',
            children: [
              /* @__PURE__ */ Z('div', {
                className: 'wx-7f497i wx-timer',
                children: [
                  /* @__PURE__ */ g('input', {
                    className: 'wx-7f497i wx-digit',
                    value: z,
                    onChange: (L) => {
                      const se = ae(L.target.value);
                      ue({ value: se });
                    },
                  }),
                  /* @__PURE__ */ g('div', {
                    className: 'wx-7f497i wx-separator',
                    children: ':',
                  }),
                  /* @__PURE__ */ g('input', {
                    className: 'wx-7f497i wx-digit',
                    value: Y,
                    onChange: (L) => {
                      const se = _(L.target.value, w);
                      j({ value: se });
                    },
                  }),
                  f &&
                    /* @__PURE__ */ g(Ls, {
                      value: T,
                      onClick: K,
                      active: () =>
                        /* @__PURE__ */ g('span', { children: 'pm' }),
                      children: /* @__PURE__ */ g('span', { children: 'am' }),
                    }),
                ],
              }),
              /* @__PURE__ */ g(qt, {
                width: 'unset',
                children: /* @__PURE__ */ g(sr, {
                  label: c.hours,
                  value: F,
                  onChange: ue,
                  max: p,
                }),
              }),
              /* @__PURE__ */ g(qt, {
                width: 'unset',
                children: /* @__PURE__ */ g(sr, {
                  label: c.minutes,
                  value: N,
                  onChange: j,
                  max: w,
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function Wi({ children: n }) {
  return /* @__PURE__ */ g('div', {
    className: 'wx-KgpO9N wx-modal',
    children: /* @__PURE__ */ g('div', {
      className: 'wx-KgpO9N wx-window',
      children: n,
    }),
  });
}
function Fi({ position: n = 'right', children: e, onCancel: t }) {
  const r = W(null);
  return (
    G(() => Jt(r.current, t).destroy, []),
    /* @__PURE__ */ g('div', {
      ref: r,
      className: `wx-2L733M wx-sidearea wx-pos-${n}`,
      children: e,
    })
  );
}
function Ps({ theme: n = '', target: e, children: t }) {
  const r = W(null),
    s = W(null),
    [o, i] = U(null);
  r.current || (r.current = document.createElement('div'));
  const l = $e(tn);
  return (
    G(() => {
      i(e || Yi(s.current) || Je.getTopNode(s.current));
    }, [s.current]),
    /* @__PURE__ */ Z(Re, {
      children: [
        /* @__PURE__ */ g('span', { ref: s, style: { display: 'none' } }),
        s.current && o
          ? Vo(
              /* @__PURE__ */ g('div', {
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
function Yi(n) {
  const e = Je.getTopNode(n);
  for (; n && n !== e && !n.getAttribute('data-wx-portal-root'); )
    n = n.parentNode;
  return n;
}
function Gi() {
  return /* @__PURE__ */ g(Re, {});
}
function Ur(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ g(tn.Provider, {
    value: 'material',
    children: /* @__PURE__ */ Z(Re, {
      children: [
        t &&
          /* @__PURE__ */ g('div', {
            className: 'wx-theme wx-material-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ Z(Re, {
            children: [
              /* @__PURE__ */ g('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ g(Gi, {}),
              /* @__PURE__ */ g('link', {
                rel: 'stylesheet',
                href: 'https://cdn.svar.dev/fonts/wxi/wx-icons.css',
              }),
            ],
          }),
      ],
    }),
  });
}
function zs() {
  return /* @__PURE__ */ g(Re, {});
}
function jr(n) {
  const { fonts: e = !0, children: t } = n;
  return /* @__PURE__ */ g(tn.Provider, {
    value: 'willow',
    children: /* @__PURE__ */ Z(Re, {
      children: [
        t &&
          t &&
          /* @__PURE__ */ g('div', {
            className: 'wx-theme wx-willow-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ Z(Re, {
            children: [
              /* @__PURE__ */ g('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ g(zs, {}),
              /* @__PURE__ */ g('link', {
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
  return /* @__PURE__ */ g(tn.Provider, {
    value: 'willow-dark',
    children: /* @__PURE__ */ Z(Re, {
      children: [
        t &&
          t &&
          /* @__PURE__ */ g('div', {
            className: 'wx-theme wx-willow-dark-theme',
            children: t,
          }),
        e &&
          /* @__PURE__ */ Z(Re, {
            children: [
              /* @__PURE__ */ g('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ g(zs, {}),
              /* @__PURE__ */ g('link', {
                rel: 'stylesheet',
                href: 'https://cdn.svar.dev/fonts/wxi/wx-icons.css',
              }),
            ],
          }),
      ],
    }),
  });
}
xr(Je);
const Rn = {
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
  Bi = () => Vi++;
function Ki(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t],
      s = e[t];
    if (!Hn(r, s)) return !1;
  }
  return !0;
}
function Hn(n, e) {
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
      for (let r = n.length - 1; r >= 0; r--) if (!Hn(n[r], e[r])) return !1;
      return !0;
    } else return Ki(n, e);
  return n === e;
}
function Sn(n) {
  if (typeof n != 'object' || n === null) return n;
  if (n instanceof Date) return new Date(n);
  if (n instanceof Array) return n.map(Sn);
  const e = {};
  for (const t in n) e[t] = Sn(n[t]);
  return e;
}
var Os = class {
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
  Ws = /* @__PURE__ */ new Date().valueOf(),
  Ui = () => Ws++;
function kr() {
  return 'temp://' + Ws++;
}
var qr = class {
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
  ji = class {
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
            : Qr(r, t, e)
          : (r.data = [e]);
    }
    addAfter(e, t) {
      if (!t) return this.add(e, -1);
      const r = this.byId(t),
        s = this.byId(r.parent),
        o = mn(s, r.id) + 1;
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
        o = mn(s, r.id);
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
        d = o ? i : this._pool.get(i.parent);
      d.data || (d.data = []);
      const c = mn(a, s.id);
      Xi(a, c);
      const u = o ? d.data.length : mn(d, i.id) + (t === 'after' ? 1 : 0);
      if ((Qr(d, u, s), a.id === d.id && c === u)) return null;
      (s.parent = d.id),
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
      return t && Fs(t, e), e;
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
function Fs(n, e) {
  n.forEach((t) => {
    e.push(t), t.open === !0 && Fs(t.data, e);
  });
}
function Xi(n, e) {
  const t = [...n.data];
  t.splice(e, 1), (n.data = t);
}
function Qr(n, e, t) {
  const r = [...n.data];
  r.splice(e, 0, t), (n.data = r);
}
function mn(n, e) {
  return n?.data.findIndex((t) => t.id === e);
}
var Ys = 2,
  qi = class {
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
          d = r[l],
          c = e[l];
        if (
          a &&
          ((d === c && typeof c != 'object') ||
            (c instanceof Date &&
              d instanceof Date &&
              d.getTime() === c.getTime()))
        )
          continue;
        const u = s + (s ? '.' : '') + l;
        a
          ? (a.__parse(c, u, o, i) && (r[l] = c),
            i & Ys ? (o[u] = a.__trigger) : a.__trigger())
          : (c && c.__reactive
              ? (t[l] = this._wrapNested(c, c, u, o))
              : (t[l] = this._wrapWritable(c)),
            (r[l] = c)),
          (o[u] = o[u] || null);
      }
    }
    _wrapNested(e, t, r, s) {
      const o = this._wrapWritable(e);
      return (
        this._wrapProperties(e, o, t, r, s, 0),
        (o.__parse = (i, l, a, d) => (
          this._wrapProperties(i, o, t, l, a, d), !1
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
  Qi = class {
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
          o.length = Math.max(...o.in.map((i) => Gs(i, this._sources, 1)));
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
      const t = this._setter(e, Ys);
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
function Gs(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => Gs(o, e, t + 1));
  return Math.max(...s);
}
var Zi = class {
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
function Ji(n, e) {
  return typeof n == 'string'
    ? n.localeCompare(e, void 0, { numeric: !0 })
    : typeof n == 'object'
      ? n.getTime() - e.getTime()
      : (n ?? 0) - (e ?? 0);
}
function el(n, e) {
  return typeof n == 'string'
    ? -n.localeCompare(e, void 0, { numeric: !0 })
    : typeof e == 'object'
      ? e.getTime() - n.getTime()
      : (e ?? 0) - (n ?? 0);
}
function tl({ key: n, order: e }) {
  const t = e === 'asc' ? Ji : el;
  return (r, s) => t(r[n], s[n]);
}
function nl(n) {
  if (!n || !n.length) return;
  const e = n.map((t) => tl(t));
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
function rl(n, e) {
  return n.sort(nl(e));
}
let sl = class extends ji {
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
    const t = e.id || kr(),
      r = e.parent || 0,
      s = e.text || '',
      o = e.type || 'task',
      i = e.progress || 0,
      l = e.details || '',
      a = { ...e, id: t, text: s, parent: r, progress: i, type: o, details: l };
    return (
      e.segments && (a.segments = e.segments.map((d) => ({ ...d }))),
      e.segments && (a.segments = e.segments.map((d) => ({ ...d }))),
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
      (rl(r, e),
      r.forEach((s) => {
        this.sortBranch(e, s.id);
      }));
  }
  serialize() {
    const e = [],
      t = this._pool.get(0).data;
    return t && Vs(t, e), e;
  }
  clear() {
    this.forEach((e) => {
      this.remove(e.id);
    });
  }
};
function Vs(n, e) {
  n.forEach((t) => {
    e.push(t), t.data && Vs(t.data, e);
  });
}
function Ne(n) {
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
function ht(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
function An(n, e) {
  const t = Ne(n);
  return isNaN(e) ? ht(n, NaN) : (e && t.setDate(t.getDate() + e), t);
}
function br(n, e) {
  const t = Ne(n);
  if (isNaN(e)) return ht(n, NaN);
  if (!e) return t;
  const r = t.getDate(),
    s = ht(n, t.getTime());
  s.setMonth(t.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (t.setFullYear(s.getFullYear(), s.getMonth(), r), t);
}
function Bs(n, e) {
  const t = +Ne(n);
  return ht(n, t + e);
}
const Ks = 6048e5,
  ol = 864e5,
  Us = 6e4,
  js = 36e5;
function il(n, e) {
  return Bs(n, e * js);
}
let ll = {};
function Xs() {
  return ll;
}
function $n(n, e) {
  const t = Xs(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      t.weekStartsOn ??
      t.locale?.options?.weekStartsOn ??
      0,
    s = Ne(n),
    o = s.getDay(),
    i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Qt(n) {
  return $n(n, { weekStartsOn: 1 });
}
function al(n) {
  const e = Ne(n),
    t = e.getFullYear(),
    r = ht(n, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Qt(r),
    o = ht(n, 0);
  o.setFullYear(t, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Qt(o);
  return e.getTime() >= s.getTime()
    ? t + 1
    : e.getTime() >= i.getTime()
      ? t
      : t - 1;
}
function $t(n) {
  const e = Ne(n);
  return e.setHours(0, 0, 0, 0), e;
}
function Cn(n) {
  const e = Ne(n),
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
function qs(n, e) {
  const t = $t(n),
    r = $t(e),
    s = +t - Cn(t),
    o = +r - Cn(r);
  return Math.round((s - o) / ol);
}
function Zr(n) {
  const e = al(n),
    t = ht(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), Qt(t);
}
function cl(n, e) {
  return Bs(n, e * Us);
}
function dl(n, e) {
  const t = e * 3;
  return br(n, t);
}
function Qs(n, e) {
  const t = e * 7;
  return An(n, t);
}
function ul(n, e) {
  return br(n, e * 12);
}
function Xt(n, e) {
  const t = Ne(n),
    r = Ne(e),
    s = t.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function fl(n, e) {
  const t = $t(n),
    r = $t(e);
  return +t == +r;
}
function Sr(n, e) {
  const t = Qt(n),
    r = Qt(e),
    s = +t - Cn(t),
    o = +r - Cn(r);
  return Math.round((s - o) / Ks);
}
function hl(n, e) {
  const t = Ne(n),
    r = Ne(e),
    s = t.getFullYear() - r.getFullYear(),
    o = t.getMonth() - r.getMonth();
  return s * 12 + o;
}
function pl(n, e) {
  const t = Ne(n),
    r = Ne(e);
  return t.getFullYear() - r.getFullYear();
}
function $r(n) {
  return (e) => {
    const t = (n ? Math[n] : Math.trunc)(e);
    return t === 0 ? 0 : t;
  };
}
function Zs(n, e) {
  return +Ne(n) - +Ne(e);
}
function gl(n, e, t) {
  const r = Zs(n, e) / js;
  return $r(t?.roundingMethod)(r);
}
function ml(n, e, t) {
  const r = Zs(n, e) / Us;
  return $r(t?.roundingMethod)(r);
}
function Js(n) {
  const e = Ne(n);
  return e.setHours(23, 59, 59, 999), e;
}
function Cr(n) {
  const e = Ne(n),
    t = e.getMonth();
  return (
    e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e
  );
}
function wl(n) {
  const e = Ne(n);
  return +Js(e) == +Cr(e);
}
function eo(n, e) {
  const t = Ne(n),
    r = Ne(e),
    s = Xt(t, r),
    o = Math.abs(hl(t, r));
  let i;
  if (o < 1) i = 0;
  else {
    t.getMonth() === 1 && t.getDate() > 27 && t.setDate(30),
      t.setMonth(t.getMonth() - s * o);
    let l = Xt(t, r) === -s;
    wl(Ne(n)) && o === 1 && Xt(n, r) === 1 && (l = !1),
      (i = s * (o - Number(l)));
  }
  return i === 0 ? 0 : i;
}
function xl(n, e, t) {
  const r = eo(n, e) / 3;
  return $r(t?.roundingMethod)(r);
}
function yl(n, e) {
  const t = Ne(n),
    r = Ne(e),
    s = Xt(t, r),
    o = Math.abs(pl(t, r));
  t.setFullYear(1584), r.setFullYear(1584);
  const i = Xt(t, r) === -s,
    l = s * (o - +i);
  return l === 0 ? 0 : l;
}
function Zt(n) {
  const e = Ne(n),
    t = e.getMonth(),
    r = t - (t % 3);
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function to(n) {
  const e = Ne(n);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function vl(n) {
  const e = Ne(n),
    t = e.getFullYear();
  return e.setFullYear(t + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function kl(n) {
  const e = Ne(n),
    t = ht(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
function bl(n) {
  const e = Ne(n);
  return e.setMinutes(59, 59, 999), e;
}
function Sl(n, e) {
  const t = Xs(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      t.weekStartsOn ??
      t.locale?.options?.weekStartsOn ??
      0,
    s = Ne(n),
    o = s.getDay(),
    i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function _r(n) {
  const e = Ne(n),
    t = e.getMonth(),
    r = t - (t % 3) + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function no(n) {
  const e = Ne(n),
    t = e.getFullYear(),
    r = e.getMonth(),
    s = ht(n, 0);
  return s.setFullYear(t, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function $l(n) {
  const e = Ne(n).getFullYear();
  return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
function ro(n) {
  const e = Ne(n);
  return String(new Date(e)) === 'Invalid Date' ? NaN : $l(e) ? 366 : 365;
}
function Cl(n) {
  const e = Zr(n),
    t = +Zr(Qs(e, 60)) - +e;
  return Math.round(t / Ks);
}
function It(n, e) {
  const t = Ne(n),
    r = Ne(e);
  return +t == +r;
}
function _l(n) {
  const e = Ne(n);
  return e.setMinutes(0, 0, 0), e;
}
function Nl(n, e, t) {
  const r = $n(n, t),
    s = $n(e, t);
  return +r == +s;
}
function Tl(n, e) {
  const t = Ne(n),
    r = Ne(e);
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
function Ml(n, e) {
  const t = Zt(n),
    r = Zt(e);
  return +t == +r;
}
function Dl(n, e) {
  const t = Ne(n),
    r = Ne(e);
  return t.getFullYear() === r.getFullYear();
}
const or = {
    year: yl,
    quarter: xl,
    month: eo,
    week: Sr,
    day: qs,
    hour: gl,
    minute: ml,
  },
  Ct = {
    year: { quarter: 4, month: 12, week: Cl, day: El, hour: Il },
    quarter: { month: 3, week: Rl, day: so, hour: Hl },
    month: { week: Al, day: Ll, hour: Pl },
    week: { day: 7, hour: 168 },
    day: { hour: 24 },
    hour: { minute: 60 },
  };
function El(n) {
  return n ? ro(n) : 365;
}
function Il(n) {
  return ro(n) * 24;
}
function Rl(n) {
  const e = Zt(n),
    t = An($t(_r(n)), 1);
  return Sr(t, e);
}
function so(n) {
  if (n) {
    const e = Zt(n),
      t = _r(n);
    return qs(t, e) + 1;
  }
  return 91;
}
function Hl(n) {
  return so(n) * 24;
}
function Al(n) {
  if (n) {
    const e = to(n),
      t = An($t(Cr(n)), 1);
    return Sr(t, e);
  }
  return 5;
}
function Ll(n) {
  return n ? no(n) : 30;
}
function Pl(n) {
  return no(n) * 24;
}
function _n(n, e, t) {
  const r = Ct[n][e];
  return r ? (typeof r == 'number' ? r : r(t)) : 1;
}
function zl(n, e) {
  return n === e || !!(Ct[n] && Ct[n][e]);
}
const Nn = {
  year: ul,
  quarter: dl,
  month: br,
  week: Qs,
  day: An,
  hour: il,
  minute: cl,
};
function Nr(n, e, t) {
  if (e) {
    if (n === 'day') return (r, s) => e.getWorkingDays(s, r, !0);
    if (n === 'hour') return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => {
    const l = Ct[n]?.[o];
    return !l || typeof l == 'number' || lo(n, r, s, t)
      ? jt(n, r, s, o, i, t)
      : Ol(r, s, n, o, i, t);
  };
}
function jt(n, e, t, r, s, o) {
  const i = r || n;
  let l = t,
    a = e;
  if (
    (s && ((l = ft(i, t, o)), (a = ft(i, e, o)), a < e && (a = at(i)(a, 1))),
    n !== i)
  ) {
    const d = or[i](a, l),
      c = _n(n, i, t);
    return d / c;
  } else return or[i](a, l);
}
function Ol(n, e, t, r, s, o) {
  let i = 0;
  const l = ft(t, e, o);
  if (e > l) {
    const d = Nn[t](l, 1);
    (i = jt(t, d, e, r, void 0, o)), (e = d);
  }
  let a = 0;
  return (
    lo(t, e, n, o) ||
      ((a = jt(t, ft(t, n, o), e, void 0, void 0, o)), (e = Nn[t](e, a))),
    (a += i + jt(t, n, e, r, void 0, o)),
    !a && s && (a = jt(t, n, e, r, s, o)),
    a
  );
}
function at(n, e) {
  if (e) {
    if (n === 'day') return (t, r) => e.addWorkingDays(t, r, !0);
    if (n === 'hour') return (t, r) => e.addWorkingHours(t, r);
  }
  return Nn[n];
}
const oo = {
  year: kl,
  quarter: Zt,
  month: to,
  week: (n, e) => $n(n, { weekStartsOn: e }),
  day: $t,
  hour: _l,
};
function ft(n, e, t) {
  const r = oo[n];
  return r ? r(e, t) : new Date(e);
}
const Wl = {
    year: vl,
    quarter: _r,
    month: Cr,
    week: (n, e) => Sl(n, { weekStartsOn: e }),
    day: Js,
    hour: bl,
  },
  io = {
    year: Dl,
    quarter: Ml,
    month: Tl,
    week: (n, e, t) => Nl(n, e, { weekStartsOn: t }),
    day: fl,
  };
function lo(n, e, t, r) {
  const s = io[n];
  return s ? s(e, t, r) : !1;
}
const Fl = {
    start: oo,
    end: Wl,
    add: Nn,
    isSame: io,
    diff: or,
    smallerCount: Ct,
  },
  Jr = (n) => (typeof n == 'function' ? n(/* @__PURE__ */ new Date()) : n);
function Yl(n, e) {
  for (const t in e) {
    if (t === 'smallerCount') {
      const r = Object.keys(e[t])
        .sort((l, a) => ot.indexOf(l) - ot.indexOf(a))
        .shift();
      let s = ot.indexOf(r);
      const o = e[t][r],
        i = Jr(o);
      for (let l = s - 1; l >= 0; l--) {
        const a = ot[l],
          d = Jr(Ct[a][r]);
        if (i <= d) break;
        s = l;
      }
      ot.splice(s, 0, n);
    }
    if (t === 'biggerCount') for (const r in e[t]) Ct[r][n] = e[t][r];
    else Fl[t][n] = e[t];
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
function Lt(n) {
  const e = /* @__PURE__ */ new Date();
  return n
    .map((t) => ({ item: t, len: at(t.unit)(e, 1) }))
    .sort((t, r) => (t.len < r.len ? -1 : 1))[0].item;
}
const ot = ['year', 'quarter', 'month', 'week', 'day', 'hour'],
  ir = 50,
  lr = 300;
function Vl(n, e, t, r, s, o) {
  const i = !n || t,
    l = !e || t;
  let a = n,
    d = e,
    c = !1,
    u = !1;
  (i || l) &&
    (s?.forEach((p) => {
      i && (!a || p.start <= a) && ((a = p.start), (c = !0));
      const w = p.type === 'milestone' ? p.start : p.end;
      l && (!d || w >= d) && ((d = w), (u = !0));
    }),
    o?.forEach((p) => {
      i && (!a || p.start <= a) && ((a = p.start), (c = !0)),
        l && (!d || p.start >= d) && ((d = p.start), (u = !0));
    }));
  const f = at(r || 'day');
  return (
    a
      ? c && (a = f(a, -1))
      : d
        ? (a = f(d, -30))
        : (a = /* @__PURE__ */ new Date()),
    d ? u && (d = f(d, 1)) : (d = f(a, 30)),
    { _start: a, _end: d }
  );
}
function Bl(n, e, t, r, s, o, i) {
  const l = Lt(i).unit,
    a = Nr(l, void 0, o),
    d = a(e, n, '', !0),
    c = ft(l, e, o);
  (n = ft(l, n, o)), (e = c < e ? at(l)(c, 1) : c);
  const u = d * r,
    f = s * i.length,
    p = i.map((h) => {
      const m = [],
        x = at(h.unit);
      let y = ft(h.unit, n, o);
      for (; y < e; ) {
        const b = x(y, h.step),
          k = y < n ? n : y,
          _ = b > e ? e : b,
          S = a(_, k, '', !0) * r,
          C = typeof h.format == 'function' ? h.format(y, b) : h.format;
        let D = '';
        h.css && (D += typeof h.css == 'function' ? h.css(y) : h.css),
          m.push({ width: S, value: C, date: k, css: D, unit: h.unit }),
          (y = b);
      }
      return { cells: m, add: x, height: s };
    });
  let w = r;
  return (
    l !== t && (w = w / _n(l, t)),
    {
      rows: p,
      width: u,
      height: f,
      diff: a,
      start: n,
      end: e,
      lengthUnit: t,
      minUnit: l,
      lengthUnitWidth: w,
    }
  );
}
function Kl(n, e, t, r) {
  const s = typeof n == 'boolean' ? {} : n,
    o = ot.indexOf(Lt(t).unit);
  if ((typeof s.level > 'u' && (s.level = o), s.levels))
    s.levels.forEach((a) => {
      a.minCellWidth || (a.minCellWidth = wn(s.minCellWidth, ir)),
        a.maxCellWidth || (a.maxCellWidth = wn(s.maxCellWidth, lr));
    });
  else {
    const a = [],
      d = t.length || 1,
      c = wn(s.minCellWidth, ir),
      u = wn(s.maxCellWidth, lr);
    t.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }),
      ot.forEach((f, p) => {
        if (p === o) a.push({ minCellWidth: c, maxCellWidth: u, scales: t });
        else {
          const w = [];
          if (p)
            for (let h = d - 1; h > 0; h--) {
              const m = ot[p - h];
              m && w.push({ unit: m, step: 1, format: e[m] });
            }
          w.push({ unit: f, step: 1, format: e[f] }),
            a.push({ minCellWidth: c, maxCellWidth: u, scales: w });
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
    d = Lt(a).unit,
    c = jl(d, s);
  if (e === -1) {
    const p = _n(d, s);
    l = i * p;
  } else {
    const p = _n(Lt(o).unit, d);
    l = Math.round(i / p);
  }
  const u = r.minCellWidth ?? ir,
    f = r.maxCellWidth ?? lr;
  return {
    scales: a,
    cellWidth: Math.min(f, Math.max(u, l)),
    lengthUnit: c,
    zoom: n,
  };
}
function jl(n, e) {
  const t = ot.indexOf(n),
    r = ot.indexOf(e);
  return r >= t ? (n === 'hour' ? 'hour' : 'day') : ot[r];
}
function wn(n, e) {
  return n ?? e;
}
const ar = 8,
  ao = 4,
  Xl = 3,
  es = 7,
  ql = ar + ao;
function co(n, e, t) {
  (n.open || n.type != 'summary') &&
    n.data?.forEach((r) => {
      typeof r.$x > 'u' && fo(r, t), (r.$x += e), co(r, e, t);
    });
}
function cr(n, e, t, r) {
  const s = n.getSummaryId(e.id);
  if (s) {
    const o = n.byId(s),
      i = { xMin: 1 / 0, xMax: 0 };
    r && po(o, t),
      uo(o, i, t),
      (o.$x = i.xMin),
      (o.$w = i.xMax - i.xMin),
      cr(n, o, t);
  }
}
function uo(n, e, t) {
  n.data?.forEach((r) => {
    if (!r.unscheduled) {
      typeof r.$x > 'u' && fo(r, t);
      const s = r.type === 'milestone' && r.$h ? r.$h / 2 : 0;
      e.xMin > r.$x + s && (e.xMin = r.$x + s);
      const o = r.$x + r.$w - s;
      e.xMax < o && (e.xMax = o);
    }
    r.type !== 'summary' && uo(r, e, t);
  });
}
function fo(n, e) {
  const { _scales: t, cellWidth: r } = e;
  (n.$x = Math.round(t.diff(n.start, t.start, t.lengthUnit) * r)),
    (n.$w = Math.round(t.diff(n.end, n.start, t.lengthUnit, !0) * r));
}
function Tr(n, e) {
  let t;
  e && (t = e.filter((s) => s.parent == n.id));
  const r = { data: t, ...n };
  if (r.data?.length)
    r.data.forEach((s) => {
      if (s.unscheduled && !s.data) return;
      (e || (s.type != 'summary' && s.data)) &&
        (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }),
        (s = Tr(s, e))),
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
function ho(n, e, t) {
  return (
    dr(n, e, t, !1),
    t.splitTasks &&
      n.segments?.forEach((r) => {
        ho(r, e, { ...t, baselines: !1 }), (r.$x -= n.$x);
      }),
    t.baselines && dr(n, e, t, !0),
    n
  );
}
function dr(n, e, t, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: l } = t,
    { start: a, end: d, lengthUnit: c, diff: u } = i,
    f = (r ? 'base_' : '') + 'start',
    p = (r ? 'base_' : '') + 'end',
    w = '$x' + (r ? '_base' : ''),
    h = '$y' + (r ? '_base' : ''),
    m = '$w' + (r ? '_base' : ''),
    x = '$h' + (r ? '_base' : ''),
    y = '$skip' + (r ? '_baseline' : '');
  let b = n[f],
    k = n[p];
  if (r && !b) {
    n[y] = !0;
    return;
  }
  n[f] < a && (n[p] < a || It(n[p], a)) ? (b = k = a) : n[f] > d && (b = k = d),
    (n[w] = Math.round(u(b, a, c) * s)),
    (n[m] = Math.round(u(k, b, c, !0) * s)),
    e !== null && (n[h] = r ? n.$y + n.$h + ao : o * e + Xl),
    (n[x] = r ? ar : l ? o - es - ql : o - es),
    n.type === 'milestone' &&
      ((n[w] = n[w] - n.$h / 2),
      (n[m] = n.$h),
      r && ((n[h] = n.$y + ar), (n[m] = n[x] = n.$h))),
    t.unscheduledTasks && n.unscheduled && !r
      ? (n.$skip = !0)
      : (n[y] = It(b, k));
}
function po(n, e, t) {
  n.data &&
    !n.$skip &&
    ((t = t || !n.open),
    n.data.forEach((r) => {
      t && dr(r, null, e, !1), po(r, e, t);
    }));
}
const Bn = 20,
  Ql = function (n, e, t, r, s) {
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
      d = s ? e.$y - 7 : e.$y,
      c = l ? t.$x : t.$x + t.$w,
      u = s ? t.$y - 7 : t.$y;
    if (a !== c || d !== u) {
      const f = Jl(a, d + o, c, u + o, i, l, r / 2, s),
        p = ea(c, u + o, l);
      (n.$p = `${f},${p}`), (n.$pl = Zl(n.$p));
    }
    return n;
  };
function Zl(n) {
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
function Jl(n, e, t, r, s, o, i, l) {
  const a = Bn * (s ? -1 : 1),
    d = Bn * (o ? -1 : 1),
    c = n + a,
    u = t + d,
    f = [n, e, c, e, 0, 0, 0, 0, u, r, t, r],
    p = u - c;
  let w = r - e;
  const h = o === s;
  return (
    h ||
      (((u <= n + Bn - 2 && o) || (u > n && !o)) &&
        (w = l ? w - i + 6 : w - i)),
    (h && o && c > u) || (h && !o && c < u)
      ? ((f[4] = f[2] + p), (f[5] = f[3]), (f[6] = f[4]), (f[7] = f[5] + w))
      : ((f[4] = f[2]), (f[5] = f[3] + w), (f[6] = f[4] + p), (f[7] = f[5])),
    f.join(',')
  );
}
function ea(n, e, t) {
  return t
    ? `${n - 5},${e - 3},${n - 5},${e + 3},${n},${e}`
    : `${n + 5},${e + 3},${n + 5},${e - 3},${n},${e}`;
}
function go(n) {
  return n.map((e) => {
    const t = e.id || kr();
    return { ...e, id: t };
  });
}
const mo = ['start', 'end', 'duration'];
function ta(n, e) {
  const { type: t, unscheduled: r } = n;
  return r || t === 'summary'
    ? !mo.includes(e)
    : t === 'milestone'
      ? !['end', 'duration'].includes(e)
      : !0;
}
function na(n, e) {
  return typeof e == 'function'
    ? e
    : mo.includes(n)
      ? (typeof e == 'string' && (e = { type: e, config: {} }),
        e.config || (e.config = {}),
        e.type === 'datepicker' && (e.config.buttons = ['today']),
        (t, r) => (ta(t, r.id) ? e : null))
      : e;
}
function ra(n) {
  return !n || !n.length
    ? []
    : n.map((e) => {
        const t = e.align || 'left',
          r = e.id === 'add-task',
          s = !r && e.flexgrow ? e.flexgrow : null,
          o = s ? 1 : e.width || (r ? 50 : 120),
          i = e.editor && na(e.id, e.editor);
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
const wo = [
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
function Rt(n, e, t, r) {
  const { selected: s, tasks: o } = n.getState(),
    i = s.length,
    l = ['edit-task', 'paste-task', 'edit-task:task', 'edit-task:segment'],
    a = ['copy-task', 'cut-task'],
    d = [
      'copy-task',
      'cut-task',
      'delete-task',
      'indent-task:remove',
      'move-task:down',
    ],
    c = ['add-task', 'undo', 'redo'],
    u = ['indent-task:add', 'move-task:down', 'move-task:up'],
    f = { 'indent-task:remove': 2 },
    p = !i && c.includes(e),
    w = { parent: u.includes(e), level: f[e] };
  if (((t = t || (i ? s[s.length - 1] : null)), !(!t && !p))) {
    if (
      (e !== 'paste-task' && (n._temp = null),
      l.includes(e) || p || s.length === 1)
    )
      ts(n, e, t, r);
    else if (i) {
      const h = a.includes(e) ? s : sa(s, o, w);
      d.includes(e) && h.reverse();
      const m = n.getHistory();
      m && m.startBatch(),
        h.forEach((x, y) => ts(n, e, x, r, y)),
        m && m.endBatch();
    }
  }
}
function sa(n, e, t) {
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
function ts(n, e, t, r, s) {
  const o = n.exec ? n.exec : n.in.exec;
  let i = e.split(':')[0],
    l = e.split(':')[1];
  const a = t?.id || t;
  let d = { id: a },
    c = {},
    u = !1;
  if (i == 'copy-task' || i == 'cut-task') {
    n._temp || (n._temp = []), n._temp.push({ id: a, cut: i == 'cut-task' });
    return;
  } else if (i == 'paste-task') {
    if (n._temp && n._temp.length) {
      const f = n.getHistory();
      f && f.startBatch();
      const p = /* @__PURE__ */ new Map();
      if (
        (n._temp.forEach((w) => {
          const h = { id: w.id, target: a, mode: 'after' };
          o(w.cut ? 'move-task' : 'copy-task', h), p.set(w.id, h.id);
        }),
        !n._temp[0].cut)
      ) {
        const { links: w } = n.getState(),
          h = n._temp.map((x) => x.id),
          m = [];
        w.forEach((x) => {
          h.includes(x.source) && h.includes(x.target) && m.push(x);
        }),
          m.forEach((x) => {
            o('add-link', {
              link: {
                source: p.get(x.source),
                target: p.get(x.target),
                type: x.type,
              },
            });
          }),
          n._temp.forEach((x, y) => {
            o('select-task', { id: p.get(x.id), toggle: !!y });
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
        (d = {}),
        (u = !0))
      : i === 'edit-task'
        ? ((i = 'show-editor'),
          l === 'segment' && typeof t == 'object' && (c = t))
        : i === 'convert-task'
          ? ((i = 'update-task'), (c = { task: { type: l } }), (l = void 0))
          : i === 'indent-task' && (l = l === 'add');
  if (i === 'split-task' && typeof t == 'object') c = t;
  else if (i === 'delete-task' && l === 'segment' && typeof t == 'object') {
    const f = n.getTask(a),
      { segmentIndex: p } = t,
      w = f.segments.filter((h, m) => m !== p);
    o('update-task', { id: a, task: { segments: w } });
    return;
  }
  typeof l < 'u' && (c = { mode: l, ...c }),
    (d = { ...d, ...c }),
    o(i, d),
    u && o('select-task', { id: d.id, toggle: !!s });
}
function Mr(n, e) {
  return n.some((t) => (t.data ? Mr(t.data, e) : t.id === e));
}
const ns = (n, e) => at(n, e),
  oa = (n, e) => Nr(n, e);
function ur(n, e) {
  Array.isArray(n) &&
    (n.forEach((t) => vt(t, e)),
    n.forEach((t) => {
      if (t.type === 'summary' && !(t.start && t.end)) {
        const { start: r, end: s } = Tr(t, n);
        (t.start = r), (t.end = s), vt(t, e);
      }
    }));
}
function vt(n, e) {
  n.unscheduled || rs(n, e, !1), n.base_start && rs(n, e, !0);
}
function rs(n, e, t) {
  const { calendar: r, durationUnit: s } = e,
    o = s || 'day',
    [i, l, a] = xo(t);
  n.type === 'milestone'
    ? ((n[a] = 0), (n[l] = void 0))
    : n[i] &&
      (n[a]
        ? (n[l] = ns(o, r)(n[i], n[a]))
        : n[l]
          ? (n[a] = oa(o, r)(n[l], n[i]))
          : ((n[l] = ns(o, r)(n[i], 1)), (n[a] = 1)));
}
function xo(n) {
  return n
    ? ['base_start', 'base_end', 'base_duration']
    : ['start', 'end', 'duration'];
}
function ss(n, e, t) {
  const [r, s, o] = xo(t);
  (e === o || e === r) && (n[s] = null),
    e === s &&
      ((n[o] = 0), n[r] && n[r] >= n[s] && ((n[s] = null), (n[o] = 1)));
}
function yo(n, e, t) {
  ss(n, t, !1), n.base_start && ss(n, t, !0), vt(n, e);
}
class ia extends qi {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }),
      (this._router = new Qi(
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
                tasks: d,
                scales: c,
                autoScale: u,
                markers: f,
              } = this.getState();
              if (!l || !a || u) {
                const p = Lt(c).unit,
                  w = Vl(l, a, u, p, d, f);
                (w._end != o || w._start != i) && this.setState(w, s);
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
                  cellWidth: d,
                  scaleHeight: c,
                  scales: u,
                  _weekStart: f,
                } = o,
                p = Lt(u).unit;
              zl(p, i) || (i = p);
              const w = Bl(l, a, i, d, c, f, u);
              this.setState({ _scales: w }, s);
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
                  baselines: d,
                  splitTasks: c,
                  unscheduledTasks: u,
                } = this.getState(),
                f = l
                  .toArray()
                  .map((p, w) =>
                    ho(p, w, {
                      cellWidth: o,
                      cellHeight: i,
                      _scales: a,
                      baselines: d,
                      splitTasks: c,
                      unscheduledTasks: u,
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
                  criticalPath: d,
                } = this.getState(),
                c = i
                  .map((u) => {
                    const f = o.byId(u.source),
                      p = o.byId(u.target);
                    return Ql(u, f, p, l, a);
                  })
                  .toSorted((u, f) =>
                    d
                      ? !!u.$critical == !!f.$critical
                        ? f.$pl - u.$pl
                        : u.$critical
                          ? 1
                          : -1
                      : f.$pl - u.$pl,
                  )
                  .filter((u) => u !== null);
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
          tasks: (s) => new sl(s),
          links: (s) => new qr(s),
          columns: (s) => ra(s),
        },
      ));
    const t = (this.in = new Zi());
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
            selected: d,
            _tasks: c,
            activeTask: u,
            splitTasks: f,
          } = this.getState();
          let p = !1,
            w;
          if (d.length && (o || i)) {
            const m = [...d];
            if (i) {
              const x = m[m.length - 1],
                y = c.findIndex((C) => C.id == x),
                b = c.findIndex((C) => C.id == s),
                k = Math.min(y, b),
                _ = Math.max(y, b) + 1,
                S = c.slice(k, _).map((C) => C.id);
              y > b && S.reverse(),
                S.forEach((C) => {
                  m.includes(C) || m.push(C);
                });
            } else if (o) {
              const x = m.findIndex((y) => y == s);
              x === -1 ? m.push(s) : ((p = !0), m.splice(x, 1));
            }
            w = m;
          } else w = [s];
          const h = { selected: w };
          l && w.length && (h._scrollTask = { id: w[0], mode: l }),
            this.setStateAsync(h),
            !p &&
              u &&
              (u !== s || f) &&
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
          (o.id = o.id || kr()),
          i.add(o),
          this.setStateAsync({ links: i }),
          (s.id = o.id),
          (s.link = i.byId(o.id)));
      });
    let r = null;
    t.on('move-task', (s) => {
      const { tasks: o } = this.getState();
      let { mode: i, target: l } = s;
      const { id: a, inProgress: d } = s,
        c = o.byId(a);
      if (
        (typeof d > 'u'
          ? (s.source = c.parent)
          : (s.source = r = r ?? c.parent),
        d === !1)
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
        const u = o.getBranch(a);
        let f = o.getIndexById(a);
        if (i === 'up') {
          const p = c.parent === 0;
          if (f === 0 && p) {
            s.skipProvider = !0;
            return;
          }
          (f -= 1), (i = 'before');
        } else if (i === 'down') {
          const p = f === u.length - 1,
            w = c.parent === 0;
          if (p && w) {
            s.skipProvider = !0;
            return;
          }
          (f += 1), (i = 'after');
        }
        if (((l = (u[f] && u[f].id) || c.parent), l)) {
          const p = o.getBranch(l);
          let w = o.getIndexById(l),
            h = p[w];
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
                : p.length - 1 !== w &&
                  ((y = h),
                  (w += 1),
                  (h = p[w]),
                  c.$level > h.$level && h.data
                    ? ((y = h), (h = h.data[0]), (l = h.id), (i = 'before'))
                    : (l = h.id)),
                y && !y.open && t.exec('open-task', { id: y.id, mode: !0 });
            }
          }
          const m = o.getSummaryId(c.id);
          o.move(a, i, l);
          const x = o.getSummaryId(a);
          m != x &&
            (m && this.resetSummaryDates(m, 'move-task'),
            x && this.resetSummaryDates(x, 'move-task'));
        }
      } else {
        const u = o.byId(l);
        let f = u,
          p = !1;
        for (; f.$level > c.$level; )
          (f = o.byId(f.parent)), f.id === a && (p = !0);
        if (p) return;
        const w = o.getSummaryId(c.id);
        if ((o.move(a, i, l), i == 'child')) {
          let m = u;
          for (; m.id !== 0 && !m.open; )
            t.exec('open-task', { id: m.id, mode: !0 }), (m = o.byId(m.parent));
        }
        const h = o.getSummaryId(a);
        w != h &&
          (w && this.resetSummaryDates(w, 'move-task'),
          h && this.resetSummaryDates(h, 'move-task'));
      }
      d ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }),
        (s.target = l),
        (s.mode = i);
    }),
      t.on('drag-task', (s) => {
        const o = this.getState(),
          {
            tasks: i,
            _tasks: l,
            _selected: a,
            _scales: d,
            cellWidth: c,
            cellHeight: u,
          } = o,
          f = i.byId(s.id),
          { left: p, top: w, width: h, start: m, inProgress: x } = s,
          y = { _tasks: l, _selected: a };
        if (
          (typeof h < 'u' &&
            ((f.$w = h), cr(i, f, { _scales: d, cellWidth: c })),
          typeof p < 'u')
        ) {
          if (f.type === 'summary') {
            const b = p - f.$x;
            co(f, b, { _scales: d, cellWidth: c });
          }
          (f.$x = p), cr(i, f, { _scales: d, cellWidth: c, cellHeight: u }, !m);
        }
        typeof w < 'u' && ((f.$y = w + 4), (f.$reorder = x)), this.setState(y);
      }),
      t.on('update-task', (s) => {
        const { id: o, segmentIndex: i, diff: l, eventSource: a } = s;
        let { task: d } = s;
        const {
            tasks: c,
            _scales: u,
            durationUnit: f,
            splitTasks: p,
            calendar: w,
          } = this.getState(),
          h = c.byId(o),
          m = { durationUnit: f, calendar: w };
        if (
          a === 'add-task' ||
          a === 'copy-task' ||
          a === 'move-task' ||
          a === 'update-task' ||
          a === 'delete-task' ||
          a === 'provide-data'
        ) {
          vt(d, m), c.update(o, d);
          return;
        }
        const x = u.lengthUnit;
        let y = at(x);
        const b = Nr(f, w);
        if (
          (l &&
            (d.start && (d.start = y(d.start, l)),
            !i &&
              i !== 0 &&
              (d.start && d.end
                ? (d.duration = h.duration)
                : (d.start
                    ? (d.end = h.end)
                    : ((d.end = y(d.end, l)),
                      (d.start = h.start),
                      (d.duration = b(d.end, d.start))),
                  b(d.end, d.start) || (d.duration = 1)))),
          (d.type = d.type ?? h.type),
          w && d.start && (d.start = Vn(d.start, l, w)),
          d.start &&
            d.end &&
            (!It(d.start, h.start) || !It(d.end, h.end)) &&
            d.type === 'summary' &&
            h.data?.length)
        ) {
          let _ = l || b(d.start, h.start);
          w &&
            ((_ =
              d.start > h.start ? b(d.start, h.start) : -b(h.start, d.start)),
            (y = Gl(w))),
            this.moveSummaryKids(
              h,
              (S) => ((S = y(S, _)), w ? Vn(S, l, w) : S),
              'update-task',
            );
        }
        d.start || (d.start = h.start),
          !d.end && !d.duration && (d.duration = h.duration),
          vt(d, m),
          c.update(o, d),
          ((w && d.type === 'summary') ||
            (d.type === 'summary' && h.type !== 'summary')) &&
            this.resetSummaryDates(o, 'update-task', !0);
        const k = c.getSummaryId(o);
        k && this.resetSummaryDates(k, 'update-task'),
          this.setStateAsync({ tasks: c }),
          (s.task = c.byId(o));
      }),
      t.on('add-task', (s) => {
        const {
            tasks: o,
            _scales: i,
            unscheduledTasks: l,
            durationUnit: a,
            splitTasks: d,
            calendar: c,
          } = this.getState(),
          { target: u, mode: f, task: p, show: w, select: h = !0 } = s;
        !s.eventSource && l && (p.unscheduled = !0);
        let m = -1,
          x,
          y;
        if (
          (u
            ? ((y = o.byId(u)),
              f == 'child'
                ? ((x = y), (p.parent = x.id))
                : (y.parent !== null &&
                    ((x = o.byId(y.parent)), (p.parent = x.id)),
                  (m = o.getIndexById(u)),
                  f == 'after' && (m += 1)))
            : p.parent && (x = o.byId(p.parent)),
          !p.start)
        ) {
          if (x?.start) p.start = new Date(x.start.valueOf());
          else if (y) p.start = new Date(y.start.valueOf());
          else {
            const S = o.getBranch(0);
            let C;
            if (S?.length) {
              const D = S[S.length - 1];
              if (!D.$skip) {
                const F = new Date(D.start.valueOf());
                i.start <= F && (C = F);
              }
            }
            p.start = C || at(a, c)(i.start, 1);
          }
          p.duration = 1;
        }
        c && (p.start = Vn(p.start, 1, c)),
          this.getState().baselines &&
            ((p.base_start = p.start), (p.base_duration = p.duration)),
          vt(p, { durationUnit: a, calendar: c });
        const b = o.add(p, m),
          k = { tasks: o };
        if (x && w) {
          for (; x && x.id; )
            t.exec('open-task', { id: x.id, mode: !0 }), (x = o.byId(x.parent));
          k._scrollTask = { id: b.id, mode: w };
        }
        s.id = b.id;
        const _ = o.getSummaryId(b.id);
        _ && this.resetSummaryDates(_, 'add-task'),
          this.setStateAsync(k),
          (s.id = b.id),
          (s.task = b),
          h && t.exec('select-task', { id: b.id });
      }),
      t.on('delete-task', (s) => {
        const { id: o } = s,
          { tasks: i, links: l, selected: a } = this.getState();
        s.source = i.byId(o).parent;
        const d = i.getSummaryId(o),
          c = [o];
        i.eachChild((f) => c.push(f.id), o),
          l.filter((f) => !(c.includes(f.source) || c.includes(f.target)));
        const u = { tasks: i, links: l };
        a.includes(o) && (u.selected = a.filter((f) => f !== o)),
          i.remove(o),
          d && this.resetSummaryDates(d, 'delete-task'),
          this.setStateAsync(u);
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
        const { tasks: d, links: c } = this.getState();
        if (d.contains(o, i)) {
          s.skipProvider = !0;
          return;
        }
        const u = d.getSummaryId(o),
          f = d.getSummaryId(i);
        let p = d.getIndexById(i);
        l == 'before' && (p -= 1);
        const w = d.byId(o),
          h = d.copy(w, d.byId(i).parent, p + 1);
        (s.source = s.id),
          (s.id = h[0][1]),
          w.lazy && (s.lazy = !0),
          u != f && f && this.resetSummaryDates(f, 'copy-task');
        let m = [];
        for (let x = 1; x < h.length; x++) {
          const [y, b] = h[x];
          c.forEach((k) => {
            if (k.source === y) {
              const _ = { ...k };
              delete _.target, m.push({ ..._, source: b });
            } else if (k.target === y) {
              const _ = { ...k };
              delete _.source, m.push({ ..._, target: b });
            }
          });
        }
        m = m.reduce((x, y) => {
          const b = x.findIndex((k) => k.id === y.id);
          return b > -1 ? (x[b] = { ...x[b], ...y }) : x.push(y), x;
        }, []);
        for (let x = 1; x < h.length; x++) {
          const [y, b] = h[x],
            k = d.byId(b);
          t.exec('copy-task', {
            source: y,
            id: b,
            lazy: !!k.lazy,
            eventSource: 'copy-task',
            target: k.parent,
            mode: 'child',
            skipUndo: !0,
          });
        }
        m.forEach((x) => {
          t.exec('add-link', {
            link: { source: x.source, target: x.target, type: x.type },
            eventSource: 'copy-task',
            skipUndo: !0,
          });
        }),
          this.setStateAsync({ tasks: d });
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
            splitTasks: d,
          } = this.getState(),
          c = o.byId(s.id);
        c.lazy ? ((c.lazy = !1), (c.open = !0)) : (c.data = []),
          ur(s.data.tasks, { durationUnit: l, calendar: a }),
          o.parse(s.data.tasks, s.id),
          c.type == 'summary' && this.resetSummaryDates(c.id, 'provide-data'),
          this.setStateAsync({
            tasks: o,
            links: new qr(i.map((u) => u).concat(go(s.data.links))),
          });
      }),
      t.on('zoom-scale', ({ dir: s, offset: o }) => {
        const {
            zoom: i,
            cellWidth: l,
            _cellWidth: a,
            scrollLeft: d,
          } = this.getState(),
          c = o + d,
          u = this.calcScaleDate(c);
        let f = l;
        s < 0 && (f = a || l);
        const p = f + s * 50,
          w = i.levels[i.level],
          h = s < 0 && l > w.maxCellWidth;
        if (p < w.minCellWidth || p > w.maxCellWidth || h) {
          if (!this.changeScale(i, s)) return;
        } else this.setState({ cellWidth: p, _cellWidth: p });
        const {
            _scales: m,
            _start: x,
            cellWidth: y,
            _weekStart: b,
          } = this.getState(),
          k = ft(m.minUnit, x, b),
          _ = m.diff(u, k, 'hour');
        typeof o > 'u' && (o = y);
        let S = Math.round(_ * y) - o;
        S < 0 && (S = 0),
          this.setState({ scrollLeft: S, _scaleDate: u, _zoomOffset: o });
      }),
      t.on('expand-scale', ({ minWidth: s }) => {
        const {
            _start: o,
            _scales: i,
            start: l,
            end: a,
            _end: d,
            cellWidth: c,
            _scaleDate: u,
            _zoomOffset: f,
          } = this.getState(),
          p = at(i.minUnit);
        let w = i.width;
        if (l && a) {
          if (w < s && w) {
            const b = s / w;
            this.setState({ cellWidth: c * b });
          }
          return !0;
        }
        let h = 0;
        for (; w < s; ) (w += c), h++;
        const m = h && a ? -h : 0,
          x = l || p(o, m);
        let y = 0;
        if (u) {
          const b = i.diff(u, x, 'hour');
          y = Math.max(0, Math.round(b * c) - (f || 0));
        }
        this.setState({ _start: x, _end: a || p(d, h), scrollLeft: y });
      }),
      t.on('sort-tasks', ({ key: s, order: o, add: i }) => {
        const l = this.getState(),
          { tasks: a } = l;
        let d = l._sort;
        const c = { key: s, order: o };
        let u = d?.length || 0;
        u && i
          ? (d.forEach((f, p) => {
              f.key === s && (u = p);
            }),
            (d[u] = c))
          : (d = [c]),
          a.sort(d),
          this.setState({ _sort: d, tasks: a });
      }),
      t.on('hotkey', ({ key: s, event: o, eventSource: i }) => {
        switch (s) {
          case 'arrowup':
          case 'arrowdown': {
            const { selected: l, _tasks: a } = this.getState();
            o.preventDefault();
            const d = l.length;
            let c;
            if (
              (s === 'arrowup'
                ? (c = d ? this.getPrevRow(l[d - 1])?.id : a[a.length - 1]?.id)
                : (c = d ? this.getNextRow(l[d - 1])?.id : a[0]?.id),
              c)
            ) {
              const u = i === 'chart' ? 'xy' : !0;
              this.in.exec('select-task', { id: c, show: u });
            }
            break;
          }
          case 'ctrl+c': {
            Rt(this, 'copy-task', null, null);
            break;
          }
          case 'ctrl+x': {
            Rt(this, 'cut-task', null, null);
            break;
          }
          case 'ctrl+v': {
            Rt(this, 'paste-task', null, null);
            break;
          }
          case 'ctrl+d':
          case 'backspace': {
            o.preventDefault(), Rt(this, 'delete-task', null, null);
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
      d = a.data;
    if (d?.length && this.isScheduled(d)) {
      const c = Tr({ ...a, start: void 0, end: void 0, duration: void 0 });
      if (!It(a.start, c.start) || !It(a.end, c.end)) {
        r
          ? (vt(c, { durationUnit: o, calendar: l }), s.update(e, c))
          : this.in.exec('update-task', {
              id: e,
              task: c,
              eventSource: t,
              skipUndo: !0,
            });
        const u = s.getSummaryId(e);
        u && this.resetSummaryDates(u, t);
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
    return at('hour')(ft(t.minUnit, r, s), Math.floor(e / o));
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
function la(n, e, t, r) {
  if (typeof document > 'u') return '';
  const s = document.createElement('canvas');
  {
    const o = aa(s, n, e, 1, t);
    ca(o, r, 0, n, 0, e);
  }
  return s.toDataURL();
}
function aa(n, e, t, r, s) {
  n.setAttribute('width', (e * r).toString()),
    n.setAttribute('height', (t * r).toString());
  const o = n.getContext('2d');
  return o.translate(-0.5, -0.5), (o.strokeStyle = s), o;
}
function ca(n, e, t, r, s, o) {
  n.beginPath(),
    n.moveTo(r, s),
    n.lineTo(r, o),
    e === 'full' && n.lineTo(t, o),
    n.stroke();
}
const Ln = [
  { id: 'task', label: 'Task' },
  { id: 'summary', label: 'Summary task' },
  { id: 'milestone', label: 'Milestone' },
];
function fr(n) {
  let e = [...vo];
  const t = n?.taskTypes || Ln,
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
function Dr(n) {
  return n.map((e) => {
    switch ((e.data && Dr(e.data), e.id)) {
      case 'add-task:before':
      case 'move-task:up':
        e.isDisabled = (t, r) => ua(t, r);
        break;
      case 'move-task:down':
        e.isDisabled = (t, r) => fa(t, r);
        break;
      case 'indent-task:add':
        e.isDisabled = (t, r) => ha(t, r) === t.parent;
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
function ua(n, e) {
  const { _tasks: t } = e;
  return t[0]?.id === n.id;
}
function fa(n, e) {
  const { _tasks: t } = e;
  return t[t.length - 1]?.id === n.id;
}
function ha(n, e) {
  const { _tasks: t } = e,
    r = t.findIndex((s) => s.id === n.id);
  return t[r - 1]?.id ?? n.parent;
}
function os(n) {
  return n && typeof n == 'object';
}
function pa(n) {
  return !n.selected || n.selected.length < 2;
}
const ga = (n) => (e) => e.type === n,
  vo = Dr([
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
        isDisabled: ga(n.id),
      }),
    },
    {
      id: 'edit-task',
      text: 'Edit',
      icon: 'wxi-edit',
      isHidden: (n, e, t) => os(t),
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
      isHidden: (n, e, t) => pa(e) && os(t),
    },
  ]);
function hr(n) {
  return [...ko];
}
const ko = Dr([
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
function Kn(n) {
  return n.type === 'summary';
}
function Un(n) {
  return n.type === 'milestone';
}
function jn(n) {
  return typeof n.parent > 'u';
}
function Xn(n, e) {
  return e.unscheduledTasks && n.unscheduled;
}
function bo(n) {
  const e = So.map((r) => ({ ...r })),
    t = e.find((r) => r.key == 'type');
  return (t.options = n?.taskTypes || Ln), e;
}
const So = [
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
    { key: 'type', comp: 'select', label: 'Type', isHidden: (n) => jn(n) },
    {
      key: 'start',
      comp: 'date',
      label: 'Start date',
      isHidden: (n) => Kn(n),
      isDisabled: Xn,
    },
    {
      key: 'end',
      comp: 'date',
      label: 'End date',
      isHidden: (n) => Kn(n) || Un(n),
      isDisabled: Xn,
    },
    {
      key: 'duration',
      comp: 'counter',
      label: 'Duration',
      config: { min: 1 },
      isHidden: (n) => Kn(n) || Un(n),
      isDisabled: Xn,
    },
    {
      key: 'progress',
      comp: 'slider',
      label: 'Progress',
      config: { min: 1, max: 100 },
      isHidden: (n) => Un(n) || jn(n),
    },
    { key: 'links', comp: 'links', label: '', isHidden: (n) => jn(n) },
  ],
  pt = Pt(null);
/* @__PURE__ */ new Date().valueOf();
function ma(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length) return !1;
  for (const t in e) {
    const r = n[t],
      s = e[t];
    if (!sn(r, s)) return !1;
  }
  return !0;
}
function sn(n, e) {
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
      for (let t = n.length - 1; t >= 0; t--) if (!sn(n[t], e[t])) return !1;
      return !0;
    } else return ma(n, e);
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
var $o = 2,
  wa = class {
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
          d = r[l],
          c = e[l];
        if (
          a &&
          ((d === c && typeof c != 'object') ||
            (c instanceof Date &&
              d instanceof Date &&
              d.getTime() === c.getTime()))
        )
          continue;
        const u = s + (s ? '.' : '') + l;
        a
          ? (a.__parse(c, u, o, i) && (r[l] = c),
            i & $o ? (o[u] = a.__trigger) : a.__trigger())
          : (c && c.__reactive
              ? (t[l] = this._wrapNested(c, c, u, o))
              : (t[l] = this._wrapWritable(c)),
            (r[l] = c)),
          (o[u] = o[u] || null);
      }
    }
    _wrapNested(e, t, r, s) {
      const o = this._wrapWritable(e);
      return (
        this._wrapProperties(e, o, t, r, s, 0),
        (o.__parse = (i, l, a, d) => (
          this._wrapProperties(i, o, t, l, a, d), !1
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
  xa = class {
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
          o.length = Math.max(...o.in.map((i) => Co(i, this._sources, 1)));
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
      const t = this._setter(e, $o);
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
function Co(n, e, t) {
  const r = e.get(n);
  if (!r) return t;
  const s = Object.keys(r).map((o) => Co(o, e, t + 1));
  return Math.max(...s);
}
var ya = class {
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
function va(n) {
  return (e) => e[n];
}
function ka(n) {
  return (e, t) => (e[n] = t);
}
function _t(n, e) {
  return (e.getter || va(e.id))(n);
}
function is(n, e, t) {
  return (e.setter || ka(e.id))(n, t);
}
function ls(n, e) {
  const t = document.createElement('a');
  (t.href = URL.createObjectURL(n)),
    (t.download = e),
    document.body.appendChild(t),
    t.click(),
    document.body.removeChild(t);
}
function wt(n, e) {
  let t = _t(n, e) ?? '';
  return (
    e.template && (t = e.template(t, n, e)),
    e.optionsMap &&
      (Array.isArray(t)
        ? (t = t.map((r) => e.optionsMap.get(r)))
        : (t = e.optionsMap.get(t))),
    typeof t > 'u' ? '' : t + ''
  );
}
function ba(n, e) {
  const t = /\n|"|;|,/;
  let r = '';
  const s =
      e.rows ||
      `
`,
    o = e.cols || '	',
    i = n._columns,
    l = n.flatData;
  e.header !== !1 && i[0].header && (r = as('header', i, r, o, s));
  for (let a = 0; a < l.length; a++) {
    const d = [];
    for (let c = 0; c < i.length; c++) {
      let u = wt(l[a], i[c]);
      t.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), d.push(u);
    }
    r += (r ? s : '') + d.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = as('footer', i, r, o, s)), r;
}
function as(n, e, t, r, s) {
  const o = /\n|"|;|,/;
  for (let i = 0; i < e[0][n].length; i++) {
    const l = [];
    for (let a = 0; a < e.length; a++) {
      let d = (e[a][n][i].text || '') + '';
      o.test(d) && (d = '"' + d.replace(/"/g, '""') + '"'), l.push(d);
    }
    t += (t ? s : '') + l.join(r);
  }
  return t;
}
function Sa(n, e, t) {
  const r = [],
    s = [],
    o = [];
  let i = [];
  const l = n._columns,
    a = n.flatData,
    d = n._sizes;
  for (const u of l) o.push({ width: u.flexgrow ? d.columnWidth : u.width });
  let c = 0;
  e.header !== !1 &&
    l[0].header &&
    (cs('header', l, r, s, c, e, t),
    (i = i.concat(d.headerRowHeights.map((u) => ({ height: u })))),
    (c += l[0].header.length));
  for (let u = 0; u < a.length; u++) {
    const f = [];
    for (let p = 0; p < l.length; p++) {
      const w = a[u],
        h = l[p],
        m = _t(w, h) ?? '';
      let x = wt(w, h),
        y;
      e.cellStyle && (y = e.cellStyle(m, w, h)),
        e.cellTemplate && (x = e.cellTemplate(m, w, h) ?? x);
      const b = _o(x, 2, y, t);
      f.push(b);
    }
    r.push(f), i.push({ height: d.rowHeight });
  }
  return (
    (c += a.length),
    e.footer !== !1 &&
      l[0].footer &&
      (cs('footer', l, r, s, c, e, t),
      (i = i.concat(d.footerRowHeights.map((u) => ({ height: u }))))),
    { cells: r, merged: s, rowSizes: i, colSizes: o, styles: t }
  );
}
function cs(n, e, t, r, s, o, i) {
  for (let l = 0; l < e[0][n].length; l++) {
    const a = [];
    for (let d = 0; d < e.length; d++) {
      const c = e[d][n][l],
        u = c.colspan ? c.colspan - 1 : 0,
        f = c.rowspan ? c.rowspan - 1 : 0;
      (u || f) &&
        r.push({
          from: { row: l + s, column: d },
          to: { row: l + s + f, column: d + u },
        });
      let p = c.text ?? '',
        w;
      o.headerCellStyle && (w = o.headerCellStyle(p, c, e[d], n)),
        o.headerCellTemplate && (p = o.headerCellTemplate(p, c, e[d], n) ?? p);
      let h;
      n == 'header'
        ? l == e[0][n].length - 1
          ? (h = 1)
          : (h = 0)
        : l
          ? (h = 4)
          : (h = 3);
      const m = _o(p, h, w, i);
      a.push(m);
    }
    t.push(a);
  }
}
function _o(n, e, t, r) {
  let s = e;
  if (
    (n &&
      n instanceof Date &&
      ((n = Ca(n)), (t = t || {}), (t.format = t.format || 'dd/mm/yyyy')),
    t)
  ) {
    t = { ...r[e], ...t };
    const o = r.findIndex((i) => sn(i, t));
    o < 0 ? (r.push(t), (s = r.length - 1)) : (s = o);
  }
  return { v: n + '', s };
}
function $a(n) {
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
    d = {
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
    header: { ...d },
    footer: { ...d },
  };
}
function Ca(n) {
  return n
    ? 25569 + (n.getTime() - n.getTimezoneOffset() * 6e4) / (86400 * 1e3)
    : null;
}
const _a = 'portrait',
  Na = 100,
  Ta = 'a4',
  Ma = {
    a3: { width: 11.7, height: 16.5 },
    a4: { width: 8.27, height: 11.7 },
    letter: { width: 8.5, height: 11 },
  };
function Da(n, e) {
  const t = [];
  let r = [],
    s = 0;
  const o = n.filter((l) => !l.hidden),
    i = Ea(e);
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
            let d = 1,
              c = n[o + d][e][l],
              u = a.width;
            for (; !c.rowspan && !c.colspan; )
              d++, (c = n[o + d][e][l]), (u += c.width);
            (a.colspan = d), (a.width = u), (a.height = t[l]);
          }
          if ((r[l].push(a), !a.collapsed && a.colspan > 1)) {
            let d = a.colspan - 1;
            if (a.colspan + o > n.length) {
              const c = a.colspan - (a.colspan + o - n.length);
              (a.colspan = c),
                (a.width = n
                  .slice(o, o + d + 1)
                  .reduce((u, f) => u + f.width, 0)),
                c > 1 && (d = c - 1);
            }
            for (let c = 0; c < d; c++) r[l].push(null);
          }
          if (a.rowspan > 1) {
            const d = a.rowspan;
            for (let c = 1; c < d; c++)
              r[l + c] || (r[l + c] = []), r[l + c].push(null);
          }
        }
      }
      if (s.collapsed)
        for (let l = 0; l < r.length; l++) {
          const a = r[l],
            d = a[o];
          if (d && d.collapsed) {
            if (((a[o] = null), !l)) break;
          } else {
            const c = d || a.findLast((u) => u?.colspan >= 1);
            c && ((c.colspan = c.colspan - 1), (c.width = c.width - s.width));
          }
        }
    }),
    r.map((s) => s.filter((o) => o && o.colspan !== 0))
  );
}
function Ea(n) {
  const { mode: e, ppi: t, paper: r } = n,
    { width: s, height: o } = Ma[r];
  return Ia(e === 'portrait' ? s : o, t);
}
function Ia(n, e) {
  return n * e;
}
function Ra(n = {}) {
  const { mode: e, ppi: t, paper: r } = n;
  return { mode: e || _a, ppi: t || Na, paper: r || Ta };
}
function No(n, e) {
  return n.flexgrow
    ? `min-width:${e}px;width:auto`
    : `width:${n.width}px; max-width:${n.width}px; height:${n.height}px`;
}
function Ha(n, e, t) {
  let r = n[t.id];
  if (t.filter.type === 'richselect' && r) {
    const s =
      t.filter.config?.options || e.find(({ id: o }) => o == t.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? '';
}
const us = ['resize-column', 'hide-column', 'update-cell'],
  Aa = ['delete-row', 'update-row', 'update-cell'],
  La = ['move-item'],
  Pa = ['resize-column', 'move-item'];
let za = class {
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
            i = _t(s, o);
          return sn(i, e.value)
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
          if (Pa.includes(t)) {
            ((r.inProgress && !this.progress[t]) ||
              typeof r.inProgress != 'boolean') &&
              (La.includes(t) && this.setPrev('flatData'),
              us.includes(t) && this.setPrev('columns')),
              (this.progress[t] = r.inProgress);
            return;
          }
          Aa.includes(t) && this.setPrev('data'),
            us.includes(t) && this.setPrev('columns');
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
function To() {
  let n = !0;
  return (n = !1), n;
}
function Mo(n, e) {
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
function Oa(n, e) {
  return -Mo(n, e);
}
function Wa(n, e) {
  if (typeof e.sort == 'function')
    return function (r, s) {
      const o = e.sort(r, s);
      return n === 'asc' ? o : -o;
    };
  const t = n === 'asc' ? Mo : Oa;
  return function (r, s) {
    return t(_t(r, e), _t(s, e));
  };
}
function Fa(n, e) {
  if (!n || !n.length) return;
  const t = n.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Wa(r.order, s);
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
const xn = 28,
  Ya = 20;
function Ga() {
  if (typeof document > 'u') return 'willow';
  const n = document.querySelector('[class^="wx"][class$="theme"]');
  return n ? n.className.substring(3, n.className.length - 6) : 'willow';
}
function Tn(n, e, t, r, s) {
  const o = document.createElement('div'),
    i = document.createElement('div'),
    l = document.body;
  s = s ? `${s}px` : 'auto';
  let a, d;
  (i.className = e),
    o.classList.add(`wx-${t}-theme`),
    (o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`),
    o.appendChild(i),
    l.appendChild(o),
    typeof n != 'object' && (n = [n]);
  for (let c = 0; c < n.length; c++) {
    i.innerText = n[c] + '';
    const u = o.getBoundingClientRect(),
      f = Math.ceil(u.width) + (r && r.length ? r[c] : 0),
      p = Math.ceil(u.height);
    (a = Math.max(a || 0, f)), (d = Math.max(d || 0, p));
  }
  return o.remove(), { width: a, height: d };
}
function fs(n, e, t, r, s) {
  const o = [];
  for (let i = 0; i < n.length; i++) {
    const l = n[i][e],
      a = l.length;
    for (let d = 0; d < a; d++) {
      const { text: c, vertical: u, collapsed: f, rowspan: p, css: w } = l[d];
      if (!c) {
        o[d] = Math.max(o[d] || 0, r);
        continue;
      }
      let h = 0;
      if (u && !f) {
        let m = `wx-measure-cell-${e}`;
        if (
          ((m += w ? ` ${w}` : ''),
          (h = Tn(c, m, s).width),
          (p > 1 || !l[d + 1]) && t > d + 1)
        ) {
          const x = p || t - d,
            y = o.slice(d, d + x).reduce((b, k) => b + k, 0);
          if (y < h) {
            const b = Math.ceil((h - y) / x);
            for (let k = d; k < d + x; k++) o[k] = (o[k] || r) + b;
          }
          continue;
        }
      }
      o[d] = Math.max(o[d] || r, h);
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
      a = wt(l, n);
    a &&
      (r.push(a),
      n.treetoggle
        ? s.push(
            e[i].$level * xn + (e[i].$count ? xn : 0) + (n.draggable ? xn : 0),
          )
        : n.draggable && s.push(xn));
  }
  return Tn(r, o, t, s).width;
}
function Ba(n, e) {
  const t = 'wx-measure-cell-header',
    r = n.sort ? Ya : 0;
  let s = n.header;
  if (typeof s == 'string') return Tn(s, t, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const l = s[i],
      a = typeof l == 'string' ? l : l.text,
      d = t + (typeof l == 'string' ? '' : ` ${l.css}`);
    let c = Tn(a, d, e).width;
    i === s.length - 1 && (c += r), (o = Math.max(o || 0, c));
  }
  return o;
}
const Ka = {
  text: (n, e) =>
    n ? n.toString().toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e,
  richselect: (n, e) => (typeof e != 'number' && !e ? !0 : n == e),
};
function Ua(n) {
  return Ka[n];
}
let ja = class extends wa {
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
      this._router = new xa(
        super.setState.bind(this),
        [
          {
            in: ['columns', 'sizes', '_skin'],
            out: ['_columns', '_sizes'],
            exec: (s) => {
              const { columns: o, sizes: i, _skin: l } = this.getState(),
                a = this.copyColumns(o),
                d = a.reduce((f, p) => Math.max(p.header.length, f), 0),
                c = a.reduce((f, p) => Math.max(p.footer.length, f), 0);
              a.forEach(this.setCollapsibleColumns);
              const u = this.normalizeSizes(a, i, d, c, l);
              for (let f = 0; f < a.length; f++)
                this.normalizeColumns(a, f, 'header', d, u),
                  this.normalizeColumns(a, f, 'footer', c, u);
              this.setState({ _columns: a, _sizes: u }, s);
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
                d = a && new Set(a),
                c = i
                  ? this.flattenRows(o, [], a)
                  : d
                    ? o.filter((f) => d.has(f.id))
                    : o,
                u = !l && c.some((f) => f.rowHeight);
              this.setState({ flatData: c, _rowHeightFromData: u }, s);
            },
          },
        ],
        { sizes: (s) => ({ ...t, ...s }) },
      );
      const r = (this.in = new ya());
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
            let d = a.editor;
            if ((typeof d == 'function' && (d = d(l, a)), !d)) return;
            (i = {
              column: a.id,
              id: s,
              value: _t(l, a) ?? '',
              renderedValue: wt(l, a),
            }),
              typeof d == 'object' &&
                d.config &&
                ((i.config = d.config),
                d.config.options && (i.options = d.config.options)),
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
            { row: d, before: c, after: u, select: f } = s;
          if (((s.id = d.id = s.id || d.id || yn()), c || u)) {
            const w = c || u,
              h = i.findIndex((m) => m.id === w);
            (i = [...i]), i.splice(h + (u ? 1 : 0), 0, s.row);
          } else i = [...i, s.row];
          const p = { data: i };
          a && (p._filterIds = [...a, s.id]),
            this.setState(p),
            !(typeof f == 'boolean' && !f) &&
              (f || l) &&
              r.exec('select-row', { id: d.id, show: !0 });
        }),
        r.on('delete-row', (s) => {
          const {
              data: o,
              selectedRows: i,
              focusCell: l,
              editor: a,
            } = this.getState(),
            { id: d } = s,
            c = { data: o.filter((u) => u.id !== d) };
          this.isSelected(d) && (c.selectedRows = i.filter((u) => u !== d)),
            a?.id == d && (c.editor = null),
            this.setState(c),
            l?.row === d &&
              this.in.exec('focus-cell', { eventSource: 'delete-row' });
        }),
        r.on('update-cell', (s) => {
          const o = this.getState();
          let { data: i } = o;
          i = [...i];
          const { tree: l } = o,
            { id: a, column: d, value: c } = s,
            u = this.getColumn(d);
          if (l) {
            const f = { ...this._branches[a] };
            is(f, u, c);
            const p = this.updateTreeRow(f);
            f.$parent === 0 && (i = p);
          } else {
            const f = i.findIndex((w) => w.id == a),
              p = { ...i[f] };
            is(p, u, c), (i[f] = p);
          }
          this.setState({ data: i });
        }),
        r.on('update-row', (s) => {
          let { data: o } = this.getState();
          const { id: i, row: l } = s,
            a = o.findIndex((d) => d.id == i);
          (o = [...o]), (o[a] = { ...o[a], ...l }), this.setState({ data: o });
        }),
        r.on(
          'select-row',
          ({ id: s, toggle: o, range: i, mode: l, show: a, column: d }) => {
            const c = this.getState(),
              { focusCell: u } = c;
            let { selectedRows: f } = c;
            if ((f.length || (i = o = !1), i)) {
              const { data: p } = this.getState();
              let w = p.findIndex((m) => m.id == f[f.length - 1]),
                h = p.findIndex((m) => m.id == s);
              w > h && ([w, h] = [h, w]),
                p.slice(w, h + 1).forEach((m) => {
                  f.indexOf(m.id) === -1 && f.push(m.id);
                });
            } else if (o && this.isSelected(s)) {
              if (l === !0) return;
              f = f.filter((p) => p !== s);
            } else if (o) {
              if (l === !1) return;
              f.push(s);
            } else f = [s];
            this.setState({ selectedRows: [...f] }),
              u?.row !== s &&
                this.in.exec('focus-cell', { eventSource: 'select-row' }),
              a && this.in.exec('scroll', { row: s, column: d });
          },
        ),
        this.in.on('focus-cell', (s) => {
          const { row: o, column: i, eventSource: l } = s,
            { _columns: a, split: d } = this.getState();
          o && i
            ? (this.setState({ focusCell: { row: o, column: i } }),
              l !== 'click' &&
                ((!d.left || a.findIndex((c) => c.id == s.column) >= d.left) &&
                (!d.right ||
                  a.findIndex((c) => c.id == s.column) < a.length - d.right)
                  ? this.in.exec('scroll', { row: o, column: i })
                  : this.in.exec('scroll', { row: o })))
            : this.setState({ focusCell: null });
        }),
        r.on('resize-column', (s) => {
          const { id: o, auto: i, maxRows: l, inProgress: a } = s;
          if (a === !1) return;
          let d = s.width || 0;
          const c = [...this.getState().columns],
            u = c.find((f) => f.id == o);
          if (i) {
            if (i == 'data' || i === !0) {
              const { flatData: f, _skin: p } = this.getState();
              let w = f.length;
              l && (w = Math.min(l, w));
              const h = f.slice(0, w);
              d = Va(u, h, p);
            }
            if (i == 'header' || i === !0) {
              const { _skin: f } = this.getState();
              d = Math.max(Ba(u, f), d);
            }
          }
          (u.width = Math.max(17, d)),
            delete u.flexgrow,
            this.setState({ columns: c });
        }),
        r.on('hide-column', (s) => {
          const { id: o, mode: i } = s,
            l = [...this.getState().columns],
            a = l.find((c) => c.id == o),
            d = l.reduce((c, u) => c + (u.hidden ? 0 : 1), 0);
          !i || d > 1
            ? ((a.hidden = !a.hidden), this.setState({ columns: l }))
            : (s.skipUndo = !0);
        }),
        r.on('sort-rows', (s) => {
          const { key: o, add: i, sort: l } = s,
            a = this.getState(),
            { columns: d, data: c, tree: u } = a;
          if (l) {
            const y = [...c];
            y.sort(l), this.setState({ data: y });
            return;
          }
          const { order: f = 'asc' } = s;
          let p = a.sortMarks;
          const w = Object.keys(p),
            h = w.length;
          !i || !h || (h === 1 && p[o])
            ? (p = { [o]: { order: f } })
            : (h === 1 && (p[w[0]] = { ...p[w[0]], index: 0 }),
              (p = {
                ...p,
                [o]: {
                  order: f,
                  index: typeof i == 'number' ? i : (p[o]?.index ?? h),
                },
              }));
          const m = Object.keys(p)
            .sort((y, b) => p[y].index - p[b].index)
            .map((y) => ({ key: y, order: p[y].order }));
          this.setState({ sortMarks: p });
          const x = Fa(m, d);
          if (x) {
            const y = [...c];
            u ? this.sortTree(y, x) : y.sort(x), this.setState({ data: y });
          }
        }),
        r.on('filter-rows', (s) => {
          const { value: o, key: i, filter: l } = s;
          if (!Object.keys(s).length) {
            this.setState({ filterValues: {}, _filterIds: null });
            return;
          }
          const a = this.getState(),
            { data: d, tree: c } = a;
          let u = a.filterValues;
          const f = {};
          i && ((u = { ...u, [i]: o }), (f.filterValues = u));
          const p = l ?? this.createFilter(u);
          let w = [];
          c
            ? (w = this.filterTree(d, p, w))
            : d.forEach((h) => {
                p(h) && w.push(h.id);
              }),
            (f._filterIds = w),
            this.setState(f);
        }),
        r.on('collapse-column', (s) => {
          const { id: o, row: i, mode: l } = s,
            a = [...this.getState().columns],
            d = this.getColumn(o).header,
            c = Array.isArray(d) ? d[i] : d;
          typeof c == 'object' &&
            ((c.collapsed = l ?? !c.collapsed), this.setState({ columns: a }));
        }),
        r.on('move-item', (s) => {
          const { id: o, inProgress: i } = s;
          let { target: l, mode: a = 'after' } = s;
          const { data: d, flatData: c, tree: u } = this.getState(),
            f = c.findIndex((h) => h.id == o);
          let p;
          if (a === 'up' || a === 'down') {
            if (a === 'up') {
              if (f === 0) return;
              (p = f - 1), (a = 'before');
            } else if (a === 'down') {
              if (f === c.length - 1) return;
              (p = f + 1), (a = 'after');
            }
            l = c[p] && c[p].id;
          } else p = c.findIndex((h) => h.id == l);
          if (f === -1 || p === -1 || i === !1) return;
          let w;
          u ? (w = this.moveItem(o, l, d, a)) : (w = this.moveItem(o, l, d, a)),
            this.setState({ data: u ? this.normalizeTreeRows(w) : w });
        }),
        r.on('copy-row', (s) => {
          const { id: o, target: i, mode: l = 'after' } = s,
            a = this.getState(),
            { flatData: d, _filterIds: c } = a;
          let { data: u } = a;
          const f = this.getRow(o);
          if (!f) return;
          const p = { ...f, id: yn() };
          s.id = p.id;
          const w = d.findIndex((m) => m.id == i);
          if (w === -1) return;
          u.splice(w + (l === 'after' ? 1 : 0), 0, p), (u = [...u]);
          const h = { data: u };
          c && (h._filterIds = [...c, p.id]), this.setState(h);
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
                const d = ba(this.getState(), s.csv || {});
                s.download !== !1
                  ? ls(new Blob(['\uFEFF' + d], { type: 'text/csv' }), a)
                  : (s.result = d),
                  o(!0);
              } else if (l == 'xlsx') {
                let d = s.excel?.styles;
                !d && d !== !1 && (d = $a(this.getState()._skin));
                const c = d,
                  u = c
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
                    merged: p,
                    rowSizes: w,
                    colSizes: h,
                    styles: m,
                  } = Sa(this.getState(), s.excel || {}, u),
                  x =
                    s.cdn ||
                    'https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js';
                this.getXlsxWorker(x).then((y) => {
                  (y.onmessage = (b) => {
                    if (b.data.type == 'ready') {
                      const k = b.data.blob;
                      s.download !== !1 ? ls(k, a) : (s.result = k), o(!0);
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
                            rows: w,
                            merged: p,
                          },
                        ],
                        styles: m,
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
              const { flatData: l, focusCell: a, select: d } = this.getState();
              if ((o.preventDefault(), i)) return;
              const c = a ? a.column : this._getFirstVisibleColumn()?.id,
                u = a ? this.getPrevRow(a.row)?.id : l[l.length - 1]?.id;
              c &&
                u &&
                (this.in.exec('focus-cell', {
                  row: u,
                  column: c,
                  eventSource: 'key',
                }),
                d && this.in.exec('select-row', { id: u }));
              break;
            }
            case 'arrowdown': {
              const { flatData: l, focusCell: a, select: d } = this.getState();
              if ((o.preventDefault(), i)) return;
              const c = a ? a.column : this._getFirstVisibleColumn()?.id,
                u = a ? this.getNextRow(a.row)?.id : l[0]?.id;
              c &&
                u &&
                (this.in.exec('focus-cell', {
                  row: u,
                  column: c,
                  eventSource: 'key',
                }),
                d && this.in.exec('select-row', { id: u }));
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
              const { editor: l, focusCell: a, select: d } = this.getState();
              if (l) {
                o.preventDefault();
                const c = l.column;
                let u = l.id,
                  f = this.getNextEditor(this.getRow(u), this.getColumn(c));
                if (!f) {
                  const p = this.getNextRow(u);
                  p && ((u = p.id), (f = this.getNextEditor(p)));
                }
                f &&
                  (this.in.exec('open-editor', { id: u, column: f.id }),
                  this.in.exec('focus-cell', {
                    row: u,
                    column: f.id,
                    eventSource: 'key',
                  }),
                  d &&
                    !this.isSelected(u) &&
                    this.in.exec('select-row', { id: u }));
              } else a && this.in.exec('focus-cell', { eventSource: 'key' });
              break;
            }
            case 'shift+tab': {
              const { editor: l, focusCell: a, select: d } = this.getState();
              if (l) {
                o.preventDefault();
                const c = l.column;
                let u = l.id,
                  f = this.getPrevEditor(this.getRow(u), this.getColumn(c));
                if (!f) {
                  const p = this.getPrevRow(u);
                  p && ((u = p.id), (f = this.getPrevEditor(p)));
                }
                f &&
                  (this.in.exec('open-editor', { id: u, column: f.id }),
                  this.in.exec('focus-cell', {
                    row: u,
                    column: f.id,
                    eventSource: 'key',
                  }),
                  d &&
                    !this.isSelected(u) &&
                    this.in.exec('select-row', { id: u }));
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
                const d = this.getRow(l.row);
                if (!d.data) return;
                this.in.exec(d.open ? 'close-row' : 'open-row', {
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
                const d = this._getFirstVisibleColumn()?.id;
                this.in.exec('focus-cell', {
                  row: a.row,
                  column: d,
                  eventSource: 'key',
                });
              }
              break;
            }
            case 'ctrl+home': {
              const {
                editor: l,
                focusCell: a,
                flatData: d,
                select: c,
              } = this.getState();
              if (!l && a) {
                o.preventDefault();
                const u = d[0]?.id,
                  f = this._getFirstVisibleColumn()?.id;
                u &&
                  f &&
                  (this.in.exec('focus-cell', {
                    row: u,
                    column: f,
                    eventSource: 'key',
                  }),
                  c &&
                    !this.isSelected(u) &&
                    this.in.exec('select-row', { id: u }));
              }
              break;
            }
            case 'end': {
              const { editor: l, focusCell: a } = this.getState();
              if (!l && a) {
                o.preventDefault();
                const d = this._getLastVisibleColumn()?.id,
                  c = a.row;
                this.in.exec('focus-cell', {
                  row: c,
                  column: d,
                  eventSource: 'key',
                });
              }
              break;
            }
            case 'ctrl+end': {
              const {
                editor: l,
                focusCell: a,
                flatData: d,
                select: c,
              } = this.getState();
              if (!l && a) {
                o.preventDefault();
                const u = d.at(-1).id,
                  f = this._getLastVisibleColumn()?.id;
                u &&
                  f &&
                  (this.in.exec('focus-cell', {
                    row: u,
                    column: f,
                    eventSource: 'key',
                  }),
                  c &&
                    !this.isSelected(u) &&
                    this.in.exec('select-row', { id: u }));
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
            dynamic: d,
            _rowHeightFromData: c,
          } = this.getState();
          let u = -1,
            f = -1,
            p = 0,
            w = 0;
          if (s.column) {
            u = 0;
            const h = o.findIndex((m) => m.id == s.column);
            p = o[h].width;
            for (let m = i.left ?? 0; m < h; m++) {
              const x = o[m];
              x.hidden || (u += x.width);
            }
          }
          if (s.row && !d) {
            const h = a.findIndex((m) => m.id == s.row);
            h >= 0 &&
              (c
                ? ((f = a
                    .slice(0, h)
                    .reduce((m, x) => m + (x.rowHeight || l.rowHeight), 0)),
                  (w = a[h].rowHeight))
                : (f = l.rowHeight * h));
          }
          this.setState({
            scroll: { top: f, left: u, width: p, height: w || l.rowHeight },
          });
        }),
        r.on('print', (s) => {
          const o = Ra(s);
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
        sn(this.getState().data, e.data) ||
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
        To() &&
          (e.tree && ((e.undo = !1), (e.reorder = !1)),
          e.split?.right && (e.split.right = 0)),
        e.undo &&
          !this._historyManager &&
          (this._historyManager = new za(
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
            let d = 1;
            a && a.colspan && !a.collapsed && (d = a.colspan);
            for (let c = d; c < l; c++) {
              const u = r[t + c];
              u && (u.hidden = !0);
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
      for (let d = 0; d < s; d++) {
        const c = l[d];
        (c.id = i.id),
          d === l.length - 1 &&
            (c.rowspan = c.rowspan ? Math.min(c.rowspan, s - d) : s - d);
        for (let u = 1; u < c.rowspan; u++) {
          l.splice(d + u, 0, { _hidden: !0 });
          for (let f = 1; f < c.colspan; f++) e[t + f][r].splice(d + u, 0, {});
        }
        if (c.rowspan) {
          const u = (c.rowspan === s ? a : a.slice(d, c.rowspan + d)).reduce(
            (f, p) => f + p,
            0,
          );
          (c.height = u), d + c.rowspan != s && c.height--;
        }
        if (c.colspan) {
          let u = i.width,
            f = i.flexgrow || 0;
          const p = c.colspan;
          for (let w = 1; w < p; w++) {
            const h = e[t + w];
            h &&
              (h.hidden
                ? (c.colspan -= 1)
                : h.flexgrow
                  ? (f += h.flexgrow)
                  : (u += h.width || o.columnWidth)),
              f ? (c.flexgrow = f) : (c.width = u);
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
      for (let t = 0; t < e.length; t++) e[t].id || (e[t].id = yn());
      return e;
    }
    normalizeTreeRows(e, t, r) {
      return (
        e.forEach((s) => {
          s.id || (s.id = yn()),
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
          i.forEach((d) => {
            const c = wt(l, d);
            String(c).toLowerCase().includes(e) && (a[d.id] = !0);
          }),
            Object.keys(a).length && (r[l.id] = a);
        }),
        r
      );
    }
    normalizeSizes(e, t, r, s, o) {
      const i = fs(e, 'header', r, t.headerHeight, o),
        l = fs(e, 'footer', s, t.footerHeight, o),
        a = i.reduce((c, u) => c + u, 0),
        d = l.reduce((c, u) => c + u, 0);
      return {
        ...t,
        headerRowHeights: i,
        footerRowHeights: l,
        headerHeight: a,
        footerHeight: d,
      };
    }
  },
  Xa = /* @__PURE__ */ new Date().valueOf();
function yn() {
  return 'temp://' + Xa++;
}
function qa(n, e = 'data-id') {
  let t = n;
  for (!t.tagName && n.target && (t = n.target); t; ) {
    if (t.getAttribute && t.getAttribute(e)) return t;
    t = t.parentNode;
  }
  return null;
}
/* @__PURE__ */ new Date().valueOf();
var Qa = class {
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
  At = [],
  Za = {
    subscribe: (n) => {
      Ja();
      const e = new Qa();
      return (
        At.push(e),
        n(e),
        () => {
          const t = At.findIndex((r) => r === e);
          t >= 0 && At.splice(t, 1);
        }
      );
    },
  },
  hs = !1;
function Ja() {
  hs ||
    ((hs = !0),
    document.addEventListener('keydown', (n) => {
      if (
        At.length &&
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
        for (let s = At.length - 1; s >= 0; s--) {
          const o = At[s],
            i = o.store.get(r) || o.store.get(t);
          i && o.node.contains(n.target) && i(n, { key: r, evKey: t });
        }
      }
    }));
}
const ec = {
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
function Er(n, { keys: e, exec: t }) {
  if (!e) return;
  function r(i) {
    const l = i.target;
    return (
      l.tagName === 'INPUT' ||
      l.tagName === 'TEXTAREA' ||
      qa(l, 'data-header-id')?.classList.contains('wx-filter') ||
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
            const d = r(a);
            t({ key: i, event: a, isInput: d });
          }));
  }
  const o = Za.subscribe((i) => {
    i.configure(s, n);
  });
  return {
    destroy: () => {
      o();
    },
  };
}
function tc(n, e) {
  let t = null;
  e.scroll.subscribe((r) => {
    if (!r || r === t) return;
    t = r;
    const { left: s, top: o, height: i, width: l } = r,
      a = e.getHeight(),
      d = e.getWidth(),
      c = e.getScrollMargin();
    if (o >= 0) {
      const u = n.scrollTop;
      o < u ? (n.scrollTop = o) : o + i > u + a && (n.scrollTop = o - a + i);
    }
    if (s >= 0) {
      const u = n.scrollLeft;
      s < u
        ? (n.scrollLeft = s)
        : s + l > u + d - c && (n.scrollLeft = s - d + l + c);
    }
  });
}
function kt(n) {
  const e = n.getAttribute('data-id'),
    t = parseInt(e);
  return isNaN(t) || t.toString() != e ? e : t;
}
function nc(n, e, t) {
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
const gs = 5;
function rc(n, e) {
  let t, r, s, o, i, l, a, d, c;
  function u(S) {
    (o = S.clientX),
      (i = S.clientY),
      (l = {
        ...nc(t, n, S),
        y: e.getTask(s).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function f(S) {
    (t = Xe(S)),
      ps(t) &&
        ((s = kt(t)),
        (c = setTimeout(() => {
          (d = !0), e && e.touchStart && e.touchStart(), u(S.touches[0]);
        }, 500)),
        n.addEventListener('touchmove', y),
        n.addEventListener('contextmenu', p),
        window.addEventListener('touchend', b));
  }
  function p(S) {
    if (d || c) return S.preventDefault(), !1;
  }
  function w(S) {
    S.which === 1 &&
      ((t = Xe(S)),
      ps(t) &&
        ((s = kt(t)),
        n.addEventListener('mousemove', x),
        window.addEventListener('mouseup', k),
        u(S)));
  }
  function h(S) {
    n.removeEventListener('mousemove', x),
      n.removeEventListener('touchmove', y),
      document.body.removeEventListener('mouseup', k),
      document.body.removeEventListener('touchend', b),
      (document.body.style.userSelect = ''),
      S &&
        (n.removeEventListener('mousedown', w),
        n.removeEventListener('touchstart', f));
  }
  function m(S) {
    const C = S.clientX - o,
      D = S.clientY - i;
    if (!r) {
      if (
        (Math.abs(C) < gs && Math.abs(D) < gs) ||
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
      const F = Math.round(Math.max(0, l.top + D));
      if (e && e.move && e.move({ id: s, top: F, detail: a }) === !1) return;
      const N = e.getTask(s),
        T = N.$y;
      if (!l.start && l.y == T) return _();
      (l.start = !0), (l.y = N.$y - 4), (r.style.top = F + 'px');
      const z = document.elementFromPoint(S.clientX, S.clientY),
        Y = Xe(z);
      if (Y && Y !== t) {
        const O = kt(Y),
          V = Y.getBoundingClientRect(),
          K = V.top + V.height / 2,
          ue = S.clientY + l.db > K && Y.nextElementSibling !== t,
          j = S.clientY - l.dt < K && Y.previousElementSibling !== t;
        a?.after == O || a?.before == O
          ? (a = null)
          : ue
            ? (a = { id: s, after: O })
            : j && (a = { id: s, before: O });
      }
    }
  }
  function x(S) {
    m(S);
  }
  function y(S) {
    d
      ? (S.preventDefault(), m(S.touches[0]))
      : c && (clearTimeout(c), (c = null));
  }
  function b() {
    (d = null), c && (clearTimeout(c), (c = null)), _();
  }
  function k() {
    _();
  }
  function _() {
    t && (t.style.visibility = ''),
      r &&
        (r.parentNode.removeChild(r),
        e && e.end && e.end({ id: s, top: l.top })),
      (s = t = r = l = a = null),
      h();
  }
  return (
    n.style.position !== 'absolute' && (n.style.position = 'relative'),
    n.addEventListener('mousedown', w),
    n.addEventListener('touchstart', f),
    {
      destroy() {
        h(!0);
      },
    }
  );
}
const sc = {
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
function Do(n, e) {
  return n.map((t) => {
    const r = e(t);
    return t.data && t.data.length && (r.data = Do(t.data, e)), r;
  });
}
function Eo(n, e) {
  const t = [];
  return (
    n.forEach((r) => {
      if (r.data) {
        const s = Eo(r.data, e);
        s.length && t.push({ ...r, data: s });
      } else e(r) && t.push(r);
    }),
    t
  );
}
let oc = 1;
function ic(n) {
  return Do(n, (e) => {
    const t = { ...e, id: e.id || oc++ };
    return t.type && (t.comp = t.type), t;
  });
}
const Io = {};
function lc(n) {
  return Io[n] || n;
}
function ac(n, e) {
  Io[n] = e;
}
function cc({ onClick: n, onShow: e, option: t }) {
  const r = W(null),
    s = E(() => {
      e(t.data ? t.id : !1, r.current);
    }, [e, t]),
    o = $(() => (t && t.comp ? lc(t.comp) : null), [t]);
  return /* @__PURE__ */ Z('div', {
    ref: r,
    className: `wx-cDCz9rZQ wx-option ${t.css || ''} ${t.disabled ? 'wx-disabled' : ''}`,
    'data-id': t.id,
    onMouseEnter: s,
    onClick: n,
    children: [
      t.icon
        ? /* @__PURE__ */ g('i', { className: `wx-cDCz9rZQ wx-icon ${t.icon}` })
        : null,
      t.comp
        ? o
          ? /* @__PURE__ */ g(o, { item: t, option: t })
          : null
        : /* @__PURE__ */ Z('span', {
            className: 'wx-cDCz9rZQ wx-value',
            children: [' ', t.text, ' '],
          }),
      t.subtext
        ? /* @__PURE__ */ g('span', {
            className: 'wx-cDCz9rZQ wx-subtext',
            children: t.subtext,
          })
        : null,
      t.data
        ? /* @__PURE__ */ g('i', {
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
  const [d, c] = U(-1e4),
    [u, f] = U(-1e4),
    [p, w] = U(20),
    [h, m] = U(),
    x = W(null),
    [y, b] = U(!1),
    [k, _] = U(null),
    S = E(() => {
      const T = Zo(x.current, s, r, e, t);
      T && (c(T.x), f(T.y), w(T.z), m(T.width));
    }, [s, r, e, t]);
  G(() => {
    o && o(S);
  }, []);
  const C = E(() => {
      b(!1);
    }, []),
    D = E(() => {
      a && a({ action: null, option: null });
    }, [a]),
    F = E((T, z) => {
      b(T), _(z);
    }, []),
    N = $(() => ic(n), [n]);
  return (
    G(() => {
      S();
    }, [s, S]),
    G(() => {
      if (x.current) return Jt(x.current, { callback: D, modal: !0 }).destroy;
    }, [D]),
    /* @__PURE__ */ g('div', {
      ref: x,
      'data-wx-menu': 'true',
      className: `wx-XMmAGqVx wx-menu ${l}`,
      style: {
        position: 'absolute',
        top: u + 'px',
        left: d + 'px',
        width: h,
        zIndex: p,
      },
      onMouseLeave: C,
      children: N.map((T) =>
        /* @__PURE__ */ Z(
          _s,
          {
            children: [
              T.comp === 'separator'
                ? /* @__PURE__ */ g('div', {
                    className: 'wx-XMmAGqVx wx-separator',
                  })
                : /* @__PURE__ */ g(cc, {
                    option: T,
                    onShow: F,
                    onClick: (z) => {
                      if (!T.data && !z.defaultPrevented) {
                        const Y = {
                          context: i,
                          action: T,
                          option: T,
                          event: z,
                        };
                        T.handler && T.handler(Y),
                          a && a(Y),
                          z.stopPropagation();
                      }
                    },
                  }),
              T.data && y === T.id
                ? /* @__PURE__ */ g(Ir, {
                    css: l,
                    options: T.data,
                    at: 'right-overlap',
                    parent: k,
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
const dc = Nt(function (n, e) {
  const {
      options: t,
      at: r = 'bottom',
      resolver: s = null,
      dataKey: o = 'contextId',
      filter: i = null,
      css: l = '',
      children: a,
      onClick: d,
    } = n,
    [c, u] = U(null),
    [f, p] = U(null),
    [w, h] = U(0),
    [m, x] = U(0),
    y = $(() => (c !== null && i ? Eo(t, (S) => i(S, c)) : t), [c, i, t]),
    b = E(
      (S) => {
        p(null), d && d(S);
      },
      [d],
    ),
    k = E((S, C) => {
      let D = null;
      for (; S && S.dataset && !D; ) (D = S.dataset[C]), (S = S.parentNode);
      return D ? zt(D) : null;
    }, []),
    _ = E(
      (S, C) => {
        if (!S) {
          p(null);
          return;
        }
        if (S.defaultPrevented) return;
        const D = S.target;
        if (D && D.dataset && D.dataset.menuIgnore) return;
        h(S.clientX + 1), x(S.clientY + 1);
        let F = typeof C < 'u' ? C : k(D, o);
        (s && ((F = s(F, S)), !F)) || (u(F), p(D), S.preventDefault());
      },
      [o, k, s],
    );
  return (
    Tt(e, () => ({ show: _ }), [_]),
    /* @__PURE__ */ Z(Re, {
      children: [
        a
          ? /* @__PURE__ */ g('span', {
              onClick: _,
              'data-menu-ignore': 'true',
              children: typeof a == 'function' ? a() : a,
            })
          : null,
        f
          ? /* @__PURE__ */ g(Ps, {
              children: /* @__PURE__ */ g(
                Ir,
                {
                  css: l,
                  at: r,
                  top: m,
                  left: w,
                  parent: f,
                  context: c,
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
Nt(function (n, e) {
  const {
      options: t,
      at: r = 'bottom',
      css: s = '',
      children: o,
      onClick: i,
    } = n,
    [l, a] = U(null);
  function d(w) {
    a(null), i && i(w);
  }
  const c = E((w) => {
    a(w.target), w.preventDefault();
  }, []);
  Tt(e, () => ({ show: c }), [c]);
  function u(w) {
    let h = w.target;
    for (; !h.dataset.menuIgnore; ) a(h), (h = h.parentNode);
  }
  const f = W(0),
    p = W(l);
  return (
    G(() => {
      p.current !== l && ((f.current += 1), (p.current = l));
    }, [l]),
    /* @__PURE__ */ Z(Re, {
      children: [
        /* @__PURE__ */ g('span', {
          onClick: u,
          'data-menu-ignore': 'true',
          children: o,
        }),
        l
          ? /* @__PURE__ */ g(Ps, {
              children: /* @__PURE__ */ g(
                Ir,
                {
                  css: s,
                  at: r,
                  parent: l,
                  options: t,
                  onClick: d,
                },
                f.current,
              ),
            })
          : null,
      ],
    })
  );
});
const Ro = Nt(function (n, e) {
    const {
        options: t,
        at: r = 'bottom',
        resolver: s = null,
        dataKey: o = 'contextId',
        filter: i = null,
        css: l = '',
        children: a,
        onClick: d,
      } = n,
      c = W(null),
      u = E((f, p) => {
        c.current.show(f, p);
      }, []);
    return (
      Tt(
        e,
        () => ({
          show: u,
        }),
        [u],
      ),
      /* @__PURE__ */ Z(Re, {
        children: [
          a
            ? /* @__PURE__ */ g('span', {
                onContextMenu: u,
                'data-menu-ignore': 'true',
                children: a,
              })
            : null,
          /* @__PURE__ */ g(dc, {
            css: l,
            at: r,
            options: t,
            resolver: s,
            dataKey: o,
            filter: i,
            ref: c,
            onClick: d,
          }),
        ],
      })
    );
  }),
  Ho = {};
function uc(n) {
  return Ho[n] || n;
}
function Ft(n, e) {
  Ho[n] = e;
}
function Ao({ menu: n = !1 }) {
  return /* @__PURE__ */ g('div', {
    className: `wx-z1qpqrvg wx-separator${n ? '-menu' : ''}`,
    children: ' ',
  });
}
function Lo() {
  return /* @__PURE__ */ g('div', { className: 'wx-1IhFzpJV wx-spacer' });
}
const fc = ({ key: n, text: e, ...t }) => t;
function Rr(n) {
  const { item: e = {}, menu: t = !1, values: r, onClick: s, onChange: o } = n,
    i = $(() => uc(e.comp || 'label'), [e]),
    l = E(() => {
      e && e.handler && e.handler(e), s && s({ item: e });
    }, [e, s]),
    a = $(() => (e && e.key && r ? r[e.key] : void 0), [e, r]),
    d = E(
      ({ value: u }) => {
        e && e.handler && e.handler(e, u), o && o({ value: u, item: e });
      },
      [e, o],
    ),
    c = $(
      () => (t ? (e ? e.menuText || e.text : void 0) : e ? e.text : void 0),
      [t, e],
    );
  if (e && e.comp == 'spacer') return /* @__PURE__ */ g(Lo, {});
  if (e && e.comp == 'separator') return /* @__PURE__ */ g(Ao, { menu: t });
  {
    const u = i,
      f = [
        'wx-tb-element',
        e && e.css ? e.css : '',
        e && e.spacer ? 'wx-spacer' : '',
        t ? 'wx-menu' : '',
      ]
        .filter(Boolean)
        .join(' ');
    return /* @__PURE__ */ g('div', {
      className: 'wx-KVAsgMam ' + f,
      'data-id': e ? e.id : void 0,
      children: /* @__PURE__ */ g(u, {
        value: a,
        onChange: d,
        onClick: l,
        text: c,
        menu: t,
        ...fc(e),
      }),
    });
  }
}
function Mn({
  item: n,
  values: e = null,
  menu: t = !1,
  onChange: r,
  onClick: s,
}) {
  const [o, i] = U(!0),
    l = () => i(!0),
    a = () => i(!1),
    d = (u) => {
      l(), s && s(u);
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
  return /* @__PURE__ */ g('div', {
    className: c,
    children:
      n.collapsed && !t
        ? /* @__PURE__ */ Z(Re, {
            children: [
              /* @__PURE__ */ Z('div', {
                className: 'wx-wSVFAGym wx-collapsed',
                onClick: a,
                children: [
                  n.icon
                    ? /* @__PURE__ */ g('i', {
                        className: `wx-wSVFAGym icon ${n.icon}`,
                      })
                    : null,
                  n.text
                    ? /* @__PURE__ */ g('div', {
                        className: 'wx-wSVFAGym wx-label-text',
                        children: n.text,
                      })
                    : null,
                  n.text && !n.icon
                    ? /* @__PURE__ */ g('i', {
                        className: 'wx-wSVFAGym wx-label-arrow wxi-angle-down',
                      })
                    : null,
                ],
              }),
              o
                ? null
                : /* @__PURE__ */ g(Wt, {
                    width: '',
                    oncancel: l,
                    children: /* @__PURE__ */ g('div', {
                      className: 'wx-wSVFAGym wx-drop-group',
                      children: /* @__PURE__ */ g(Mn, {
                        item: { ...n, text: '', collapsed: !1 },
                        values: e,
                        menu: t,
                        onChange: r,
                        onClick: d,
                      }),
                    }),
                  }),
            ],
          })
        : /* @__PURE__ */ Z(Re, {
            children: [
              /* @__PURE__ */ g('div', {
                className: 'wx-wSVFAGym wx-tb-body',
                children: n.items.map((u, f) =>
                  u.items
                    ? /* @__PURE__ */ g(
                        Mn,
                        {
                          item: u,
                          values: e,
                          onClick: d,
                          onChange: r,
                        },
                        u.id || f,
                      )
                    : /* @__PURE__ */ g(
                        Rr,
                        {
                          item: u,
                          values: e,
                          onClick: d,
                          onChange: r,
                        },
                        u.id || f,
                      ),
                ),
              }),
              n.text
                ? /* @__PURE__ */ g('div', {
                    className: 'wx-wSVFAGym wx-label',
                    children: n.text,
                  })
                : null,
            ],
          }),
  });
}
function hc({
  items: n = [],
  css: e,
  values: t,
  width: r,
  onClick: s,
  onChange: o,
}) {
  const [i, l] = U(void 0),
    a = W(null);
  function d() {
    l(null);
  }
  function c() {
    l(!0);
  }
  function u(f) {
    d(), s && s(f);
  }
  return /* @__PURE__ */ Z('div', {
    className: `wx-Yo6BuX0p wx-menu ${e || ''}`,
    ref: a,
    'data-id': '$menu',
    children: [
      /* @__PURE__ */ g(ut, { icon: 'wxi-dots-h', onClick: c }),
      i
        ? /* @__PURE__ */ g(Wt, {
            width: `${r}px`,
            onCancel: d,
            children: /* @__PURE__ */ g('div', {
              className: 'wx-Yo6BuX0p wx-drop-menu',
              children: n.map((f, p) =>
                f.items
                  ? /* @__PURE__ */ g(
                      Mn,
                      {
                        item: f,
                        values: t,
                        menu: !0,
                        onClick: u,
                        onChange: o,
                      },
                      f.id || p,
                    )
                  : /* @__PURE__ */ g(
                      Rr,
                      {
                        item: f,
                        values: t,
                        menu: !0,
                        onClick: u,
                        onChange: o,
                      },
                      f.id || p,
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
      e.id || (e.id = Dn());
    }),
    n
  );
}
function gr(n) {
  const {
      items: e,
      menuCss: t = '',
      css: r = '',
      values: s,
      overflow: o = 'menu',
      onClick: i,
      onChange: l,
    } = n,
    [a, d] = Ve(e || []),
    [c, u] = Ve(s || null),
    f = $(() => pc(a), [a]),
    p = W(null),
    w = W(-1),
    [h, m] = U([]),
    x = W(f);
  G(() => {
    x.current = f;
  }, [a]);
  const y = W(o);
  G(() => {
    y.current = o;
  }, [o]);
  const b = W(h);
  G(() => {
    b.current = h;
  }, [h]);
  const k = W(!1);
  function _(N) {
    c && ((c[N.item.key] = N.value), u({ ...c })), l && l(N);
  }
  function S() {
    const N = p.current;
    if (!N) return 0;
    const T = N.children,
      z = x.current || [];
    let Y = 0;
    for (let O = 0; O < z.length; O++)
      z[O].comp !== 'spacer' &&
        ((Y += T[O].clientWidth), z[O].comp === 'separator' && (Y += 8));
    return Y;
  }
  function C() {
    const N = p.current,
      T = x.current || [];
    if (N) {
      for (let z = T.length - 1; z >= 0; z--)
        if (T[z].items && !T[z].collapsed) {
          (T[z].collapsed = !0),
            (T[z].$width = N.children[z].offsetWidth),
            (k.current = !0),
            d([...T]);
          return;
        }
    }
  }
  function D(N) {
    const T = p.current,
      z = x.current || [];
    if (T) {
      for (let Y = 0; Y < z.length; Y++)
        if (z[Y].collapsed && z[Y].$width) {
          z[Y].$width - T.children[Y].offsetWidth < N + 10 &&
            ((z[Y].collapsed = !1), (k.current = !0)),
            d([...z]);
          return;
        }
    }
  }
  function F() {
    const N = p.current;
    if (!N) return;
    const T = x.current || [],
      z = y.current;
    if (z === 'wrap') return;
    const Y = N.clientWidth;
    if (N.scrollWidth > Y) {
      if (z === 'collapse') return C();
      const O = N.children;
      let V = 0;
      for (let K = 0; K < T.length; K++) {
        if (
          ((V += O[K].clientWidth),
          T[K].comp === 'separator' && (V += 8),
          V > Y - 40)
        ) {
          if (w.current === K) return;
          w.current = K;
          const ue = [];
          for (let j = K; j < T.length; j++)
            ue.push(T[j]), (O[j].style.visibility = 'hidden');
          K > 0 &&
            T[K - 1].comp === 'separator' &&
            (O[K - 1].style.visibility = 'hidden'),
            m(ue);
          break;
        }
        O[K].style.visibility = '';
      }
    } else {
      const O = Y - S();
      if (O <= 0) return;
      if (z === 'collapse') return D(O);
      if ((b.current || []).length) {
        w.current = null;
        const V = N.children;
        for (let K = 0; K < T.length; K++) V[K].style.visibility = '';
        m([]);
      }
    }
  }
  return (
    G(() => {
      k.current && ((k.current = !1), F());
    }, [a]),
    G(() => {
      const N = new ResizeObserver(() => F());
      return (
        p.current && N.observe(p.current),
        () => {
          N.disconnect();
        }
      );
    }, []),
    /* @__PURE__ */ Z('div', {
      className: `wx-VdPSJj8y wx-toolbar ${r || ''} ${o === 'wrap' ? 'wx-wrap' : ''}`,
      ref: p,
      children: [
        f.map((N) =>
          N.items
            ? /* @__PURE__ */ g(
                Mn,
                {
                  item: N,
                  values: c,
                  onClick: i,
                  onChange: _,
                },
                N.id,
              )
            : /* @__PURE__ */ g(
                Rr,
                {
                  item: N,
                  values: c,
                  onClick: i,
                  onChange: _,
                },
                N.id,
              ),
        ),
        !!h.length &&
          /* @__PURE__ */ g(hc, {
            items: h,
            css: t,
            values: c,
            onClick: i,
            onChange: _,
          }),
      ],
    })
  );
}
function gc(n) {
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
    ? /* @__PURE__ */ Z('div', {
        className: 'wx-HXpG4gnx wx-item',
        onClick: l,
        children: [
          /* @__PURE__ */ g('i', {
            className: `wx-HXpG4gnx ${e || 'wxi-empty'} ${r || ''}`,
          }),
          t,
        ],
      })
    : /* @__PURE__ */ g(ut, {
        icon: e,
        type: s,
        css: r,
        text: t,
        disabled: o,
        onClick: l,
      });
}
function mc(n) {
  const { text: e, value: t, children: r } = n;
  return r
    ? /* @__PURE__ */ g('div', {
        className: 'wx-PTEZGYcj wx-label',
        children: r(),
      })
    : /* @__PURE__ */ g('div', {
        className: 'wx-PTEZGYcj wx-label',
        children: t || e,
      });
}
function wc(n) {
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
    ? /* @__PURE__ */ Z('div', {
        className: 'wx-3cuSqONJ wx-item',
        onClick: l,
        children: [
          e
            ? /* @__PURE__ */ g('i', {
                className: `wx-3cuSqONJ ${e || ''} ${r || ''}`,
              })
            : null,
          t,
        ],
      })
    : /* @__PURE__ */ g(ut, {
        icon: e,
        type: s,
        css: r,
        title: t,
        disabled: o,
        onClick: l,
      });
}
function xc({
  id: n = '',
  text: e = '',
  css: t = '',
  icon: r = '',
  onClick: s,
}) {
  function o() {
    s && s({ id: n });
  }
  return /* @__PURE__ */ Z('div', {
    className: `wx-U0Bx7pIR wx-label ${t}`,
    onClick: o,
    children: [
      r ? /* @__PURE__ */ g('i', { className: 'wx-U0Bx7pIR ' + r }) : null,
      e,
    ],
  });
}
Ft('button', gc);
Ft('separator', Ao);
Ft('spacer', Lo);
Ft('label', mc);
Ft('item', xc);
Ft('icon', wc);
const et = Pt(null);
function yc(n, e) {
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
const ms = 5,
  vc = 700;
function kc(n) {
  return zt(n.getAttribute('data-id'));
}
function vn(n) {
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
function mr(n, e) {
  const t = vn(e);
  return { x: n.clientX - t.x, y: n.clientY - t.y };
}
function bc(n, e) {
  const t = e.current;
  let r = null,
    s,
    o,
    i = !1,
    l = !1;
  const a = document.createElement('DIV');
  (a.className = 'wx-drag-zone'), a.setAttribute('tabindex', -1);
  function d() {
    clearTimeout(s), (s = null);
  }
  function c(C) {
    const D = Xe(C);
    D &&
      ((r = {
        container: a,
        sourceNode: C.target,
        from: kc(D),
        pos: mr(C, n),
      }),
      (o = r.pos),
      u(C));
  }
  function u(C) {
    if (!r) return;
    const D = (r.pos = mr(C, n));
    if (!i) {
      if (
        !l &&
        !C?.target?.getAttribute('draggable-data') &&
        Math.abs(o.x - D.x) < ms &&
        Math.abs(o.y - D.y) < ms
      )
        return;
      if (_(C) === !1) return S();
    }
    if (l) {
      const F =
          window.scrollX ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft,
        N =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      r.targetNode = document.elementFromPoint(C.pageX - F, C.pageY - N);
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
  function p(C) {
    (t.getReorder && !t.getReorder()) ||
      (C.button === 0 &&
        (k(C),
        window.addEventListener('mousemove', w),
        window.addEventListener('mouseup', h),
        c(C)));
  }
  function w(C) {
    u(C);
  }
  function h(C) {
    f(C);
  }
  function m(C) {
    if (t.getReorder && !t.getReorder()) return;
    (s = setTimeout(() => {
      (l = !0), c(C.touches[0]);
    }, vc)),
      k(C);
    function D() {
      s && d(),
        C.target.removeEventListener('touchmove', x),
        C.target.removeEventListener('touchend', D),
        f(C);
    }
    C.target.addEventListener('touchmove', x),
      C.target.addEventListener('touchend', D),
      n.addEventListener('contextmenu', y);
  }
  function x(C) {
    i ? (C.preventDefault(), u(C.touches[0])) : s && d();
  }
  function y(C) {
    if (i || s) return C.preventDefault(), !1;
  }
  function b(C) {
    C.preventDefault();
  }
  function k(C) {
    if (!t.getDraggableInfo) return;
    const { hasDraggable: D } = t.getDraggableInfo();
    (!D || C.target.getAttribute('draggable-data')) &&
      ((document.body.style.userSelect = 'none'),
      (document.body.style.webkitUserSelect = 'none'));
  }
  function _(C) {
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
      window.removeEventListener('mousemove', w),
      window.removeEventListener('mouseup', h),
      C &&
        (n.removeEventListener('mousedown', p),
        n.removeEventListener('touchstart', m),
        n.removeEventListener('dragstart', b));
  }
  return (
    n.addEventListener('mousedown', p),
    n.addEventListener('touchstart', m),
    n.addEventListener('dragstart', b),
    {
      destroy() {
        S(!0);
      },
    }
  );
}
const Sc = 4e-3;
function $c() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1,
  };
}
function Cc(n, e, t, r) {
  const {
      node: s,
      left: o,
      top: i,
      bottom: l,
      sense: a,
      xScroll: d,
      yScroll: c,
    } = r,
    u = mr(n, s);
  t.scrollState || (t.scrollState = $c());
  let f = 0,
    p = 0;
  u.x < o + a ? (f = -1) : u.x > e.width - a && (f = 1),
    u.y < i + Math.round(a / 2)
      ? (p = -1)
      : u.y > e.height - l - Math.round(a / 2) && (p = 1),
    (t.scrollState.dirX !== f || t.scrollState.dirY !== p) &&
      (Po(t), (t.scrollState.dirX = f), (t.scrollState.dirY = p)),
    ((d && t.scrollState.dirX !== 0) || (c && t.scrollState.dirY !== 0)) &&
      _c(t, r, {
        x: t.scrollState.dirX,
        y: t.scrollState.dirY,
      });
}
function _c(n, e, t) {
  n.autoScrollTimer ||
    (n.autoScrollTimer = setTimeout(() => {
      n.activeAutoScroll = setInterval(Nc, 15, n, e, t);
    }, 250));
}
function Po(n) {
  (n.scrollSpeedFactor = 1),
    n.autoScrollTimer &&
      ((n.autoScrollTimer = clearTimeout(n.autoScrollTimer)),
      (n.activeAutoScroll = clearInterval(n.activeAutoScroll)));
}
function Nc(n, e, t) {
  const { x: r, y: s } = t;
  (n.scrollSpeedFactor += Sc), r !== 0 && Mc(n, e, r), s !== 0 && Tc(n, e, s);
}
function Tc(n, e, t) {
  const r = e.node.scrollTop;
  zo(r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t, 'scrollTop', e);
}
function Mc(n, e, t) {
  const r = e.node.scrollLeft;
  zo(r + Math.round(e.sense / 3) * n.scrollSpeedFactor * t, 'scrollLeft', e);
}
function zo(n, e, t) {
  t.node[e] = n;
}
function Pn(n, e, t, r, s, o) {
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
function Oo(n, e, t) {
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
function Dc(n) {
  const {
      row: e,
      column: t,
      cellStyle: r = null,
      columnStyle: s = null,
      children: o,
    } = n,
    [i, l] = Ve(n.focusable),
    a = $e(et),
    d = re(a, 'focusCell'),
    c = re(a, 'search'),
    u = re(a, 'reorder'),
    f = $(() => c?.rows[e.id] && c.rows[e.id][t.id], [c, e.id, t.id]),
    p = $(
      () => Pn(t.width, t.flexgrow, t.fixed, t.left, t.right),
      [t.width, t.flexgrow, t.fixed, t.left, t.right],
    );
  function w(S, C) {
    let D = 'wx-cell';
    return (
      (D += t.fixed ? ' ' + (t.fixed === -1 ? 'wx-shadow' : 'wx-fixed') : ''),
      (D += S ? ' ' + S(t) : ''),
      (D += C ? ' ' + C(e, t) : ''),
      (D += t.treetoggle ? ' wx-tree-cell' : ''),
      D
    );
  }
  const h = $(() => w(s, r), [s, r, t, e]),
    m = $(
      () =>
        typeof t.draggable == 'function'
          ? t.draggable(e, t) !== !1
          : t.draggable,
      [t, e],
    ),
    x = W(null);
  G(() => {
    x.current &&
      i &&
      d?.row === e.id &&
      d?.column === t.id &&
      x.current.focus();
  }, [d, i, e.id, t.id]);
  const y = E(() => {
    i &&
      !d &&
      a.exec('focus-cell', {
        row: e.id,
        column: t.id,
        eventSource: 'focus',
      });
  }, [a, i, d, e.id, t.id]);
  G(
    () => () => {
      i && d && (a.exec('focus-cell', { eventSource: 'destroy' }), l(!1));
    },
    [a, l],
  );
  function b(S) {
    const C = new RegExp(`(${c.value.trim()})`, 'gi');
    return String(S)
      .split(C)
      .map((D) => ({ text: D, highlight: C.test(D) }));
  }
  const k = $(() => {
      const S = (t.fixed && t.fixed.left === -1) || t.fixed.right === -1,
        C = t.fixed && t.fixed.right;
      return [h, S ? 'wx-shadow' : '', C ? 'wx-fixed-right' : '']
        .filter(Boolean)
        .join(' ');
    }, [h, t]),
    _ = t.cell;
  return /* @__PURE__ */ Z('div', {
    className: 'wx-TSCaXsGV ' + k,
    ref: x,
    onFocus: y,
    style: p,
    'data-row-id': e.id,
    'data-col-id': t.id,
    tabIndex: i ? '0' : '-1',
    role: 'gridcell',
    'aria-colindex': t._colindex,
    'aria-readonly': t.editor ? void 0 : !0,
    children: [
      u && t.draggable
        ? m
          ? /* @__PURE__ */ g('i', {
              'draggable-data': 'true',
              className: 'wx-TSCaXsGV wx-draggable wxi-drag',
            })
          : /* @__PURE__ */ g('i', {
              className: 'wx-TSCaXsGV wx-draggable-stub',
            })
        : null,
      t.treetoggle
        ? /* @__PURE__ */ Z(Re, {
            children: [
              /* @__PURE__ */ g('span', {
                style: { marginLeft: `${e.$level * 28}px` },
              }),
              e.$count
                ? /* @__PURE__ */ g('i', {
                    'data-action': 'toggle-row',
                    className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? 'down' : 'right'}`,
                  })
                : null,
            ],
          })
        : null,
      _
        ? /* @__PURE__ */ g(_, {
            api: a,
            row: e,
            column: t,
            onAction: ({ action: S, data: C }) => a.exec(S, C),
          })
        : o
          ? o()
          : f
            ? /* @__PURE__ */ g('span', {
                children: b(wt(e, t)).map(({ highlight: S, text: C }, D) =>
                  S
                    ? /* @__PURE__ */ g(
                        'mark',
                        { className: 'wx-TSCaXsGV wx-search', children: C },
                        D,
                      )
                    : /* @__PURE__ */ g('span', { children: C }, D),
                ),
              })
            : wt(e, t),
    ],
  });
}
function ws(n, e) {
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
function Ec({ filter: n, column: e, action: t, filterValue: r }) {
  function s({ value: o }) {
    t({ value: o, key: e.id });
  }
  return /* @__PURE__ */ g(rn, {
    ...(n.config ?? {}),
    value: r,
    onChange: s,
  });
}
function Ic({ filter: n, column: e, action: t, filterValue: r }) {
  const s = $e(et),
    o = re(s, 'flatData'),
    i = $(() => n?.config?.options || e?.options || a(), [n, e, o]),
    l = $(() => n?.config?.template, [n]);
  function a() {
    const u = [];
    return (
      o.forEach((f) => {
        const p = _t(f, e);
        u.includes(p) || u.push(p);
      }),
      u.map((f) => ({ id: f, label: f }))
    );
  }
  function d({ value: u }) {
    t({ value: u, key: e.id });
  }
  function c(u) {
    u.key !== 'Tab' && u.preventDefault();
  }
  return /* @__PURE__ */ g('div', {
    style: { width: '100%' },
    onKeyDown: c,
    children: /* @__PURE__ */ g(As, {
      placeholder: '',
      clear: !0,
      ...(n?.config ?? {}),
      options: i,
      value: r,
      onChange: d,
      children: (u) => (l ? l(u) : u.label),
    }),
  });
}
const Rc = {
  text: Ec,
  richselect: Ic,
};
function Hc({ filter: n, column: e }) {
  const t = $e(et),
    r = re(t, 'filterValues');
  function s(i) {
    t.exec('filter-rows', i);
  }
  const o = $(() => Rc[n.type], [n.type]);
  return /* @__PURE__ */ g(o, {
    filter: n,
    column: e,
    action: s,
    filterValue: r[e.id],
  });
}
function Ac(n) {
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
    d = $e(et),
    c = re(d, 'sortMarks'),
    u = $(() => (c ? c[t.id] : void 0), [c, t.id]),
    f = W(),
    p = E(
      (O) => {
        f.current = e.flexgrow ? O.parentNode.clientWidth : e.width;
      },
      [e.flexgrow, e.width],
    ),
    w = E(
      (O, V) => {
        d.exec('resize-column', {
          id: e.id,
          width: Math.max(1, (f.current || 0) + O),
          inProgress: V,
        });
      },
      [d, e.id],
    ),
    h = E((O) => w(O, !0), [w]),
    m = E((O) => w(O, !1), [w]),
    x = E(
      (O) => {
        if (!t.sort || e.filter) return;
        let V = u?.order;
        V && (V = V === 'asc' ? 'desc' : 'asc'),
          d.exec('sort-rows', { key: e.id, add: O.ctrlKey, order: V });
      },
      [d, e.id, e.filter, t.sort, u?.order],
    ),
    y = E(
      (O) => {
        O && O.stopPropagation(),
          d.exec('collapse-column', { id: e.id, row: r });
      },
      [d, e.id, r],
    ),
    b = E(
      (O) => {
        O.key === 'Enter' && y();
      },
      [y],
    ),
    k = E(
      (O) => {
        O.key === 'Enter' && !e.filter && x(O);
      },
      [x, e.filter],
    ),
    _ = $(() => e.collapsed && t.collapsed, [e.collapsed, t.collapsed]),
    S = $(() => _ && !a && e.collapsible !== 'header', [_, a, e.collapsible]),
    C = $(() => (S ? { top: -l / 2, position: 'absolute' } : {}), [S, l]),
    D = $(
      () =>
        Pn(
          e.width,
          e.flexgrow,
          t.fixed,
          t.left,
          e.right ?? t.right,
          e.height + (_ && S ? l : 0),
        ),
      [
        e.width,
        e.flexgrow,
        t.fixed,
        t.left,
        e.right,
        t.right,
        e.height,
        _,
        S,
        l,
      ],
    ),
    F = $(() => Oo(t, e, i), [t, e, i]),
    N = E(
      () => Object.fromEntries(Object.entries(e).filter(([O]) => O !== 'cell')),
      [e],
    ),
    T = `wx-cell ${F} ${e.css || ''} wx-collapsed`,
    z = [
      'wx-cell',
      F,
      e.css || '',
      e.filter ? 'wx-filter' : '',
      t.fixed && t.fixed.right ? 'wx-fixed-right' : '',
    ]
      .filter(Boolean)
      .join(' '),
    Y = W(null);
  return (
    G(() => {
      const O = Y.current;
      if (!O) return;
      const V = ws(O, { down: p, move: h, up: m });
      return () => {
        typeof V == 'function' && V();
      };
    }, [p, h, m, ws]),
    _
      ? /* @__PURE__ */ g('div', {
          className: 'wx-RsQD74qC ' + T,
          style: D,
          role: 'button',
          'aria-label': `Expand column ${e.text || ''}`,
          'aria-expanded': !e.collapsed,
          tabIndex: 0,
          onKeyDown: b,
          onClick: y,
          'data-header-id': t.id,
          children: /* @__PURE__ */ g('div', {
            className: 'wx-RsQD74qC wx-text',
            style: C,
            children: e.text || '',
          }),
        })
      : /* @__PURE__ */ Z('div', {
          className: 'wx-RsQD74qC ' + z,
          style: D,
          onClick: x,
          'data-header-id': t.id,
          tabIndex: !e._hidden && t.sort && !e.filter ? 0 : void 0,
          role: 'columnheader',
          'aria-colindex': e._colindex,
          'aria-colspan': e.colspan > 1 ? e.colspan : void 0,
          'aria-rowspan': e.rowspan > 1 ? e.rowspan : void 0,
          'aria-sort':
            !u?.order || e.filter
              ? 'none'
              : u?.order === 'asc'
                ? 'ascending'
                : 'descending',
          onKeyDown: k,
          children: [
            e.collapsible
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-RsQD74qC wx-collapse',
                  role: 'button',
                  'aria-label': e.collapsed
                    ? 'Expand column'
                    : 'Collapse column',
                  'aria-expanded': !e.collapsed,
                  tabIndex: 0,
                  onKeyDown: b,
                  onClick: y,
                  children: /* @__PURE__ */ g('i', {
                    className: `wx-RsQD74qC wxi-angle-${e.collapsed ? 'down' : 'right'}`,
                  }),
                })
              : null,
            e.cell
              ? (() => {
                  const O = e.cell;
                  return /* @__PURE__ */ g(O, {
                    api: d,
                    cell: N(),
                    column: t,
                    row: r,
                    onAction: ({ action: V, data: K }) => d.exec(V, K),
                  });
                })()
              : e.filter
                ? /* @__PURE__ */ g(Hc, { filter: e.filter, column: t })
                : /* @__PURE__ */ g('div', {
                    className: 'wx-RsQD74qC wx-text',
                    children: e.text || '',
                  }),
            t.resize && s && !e._hidden
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-RsQD74qC wx-grip',
                  role: 'presentation',
                  'aria-label': 'Resize column',
                  ref: Y,
                  onClick: (O) => O.stopPropagation(),
                  children: /* @__PURE__ */ g('div', {}),
                })
              : null,
            o
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-RsQD74qC wx-sort',
                  children: u
                    ? /* @__PURE__ */ Z(Re, {
                        children: [
                          typeof u.index < 'u'
                            ? /* @__PURE__ */ g('div', {
                                className: 'wx-RsQD74qC wx-order',
                                children: u.index + 1,
                              })
                            : null,
                          /* @__PURE__ */ g('i', {
                            className: `wx-RsQD74qC wxi-arrow-${u.order === 'asc' ? 'up' : 'down'}`,
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
function Lc({ cell: n, column: e, row: t, columnStyle: r }) {
  const s = $e(et),
    o = $(
      () =>
        Pn(
          n?.width,
          n?.flexgrow,
          e?.fixed,
          e?.left,
          n?.right ?? e?.right,
          n?.height,
        ),
      [n?.width, n?.flexgrow, e?.fixed, e?.left, n?.right, e?.right, n?.height],
    ),
    i = $(() => Oo(e, n, r), [e, n, r]),
    l = E(
      () =>
        Object.fromEntries(
          Object.entries(n || {}).filter(([d]) => d !== 'cell'),
        ),
      [n],
    ),
    a =
      `wx-6Sdi3Dfd wx-cell ${i || ''} ${n?.css || ''}` +
      (e?.fixed && e?.fixed.right ? ' wx-fixed-right' : '');
  return /* @__PURE__ */ g('div', {
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
              onAction: ({ action: d, data: c }) => s.exec(d, c),
            })
          : /* @__PURE__ */ g('div', {
              className: 'wx-6Sdi3Dfd wx-text',
              children: n?.text || '',
            })
        : null,
  });
}
function xs({
  deltaLeft: n,
  contentWidth: e,
  columns: t,
  type: r = 'header',
  columnStyle: s,
  bodyHeight: o,
}) {
  const i = $e(et),
    l = re(i, '_sizes'),
    a = re(i, 'split'),
    d = $(() => l?.[`${r}RowHeights`], [l, r]),
    c = $(() => {
      let h = [];
      if (t && t.length) {
        const m = t[0][r].length;
        for (let x = 0; x < m; x++) {
          let y = 0;
          h.push([]),
            t.forEach((b, k) => {
              const _ = { ...b[r][x] };
              if ((y || h[x].push(_), _.colspan > 1)) {
                if (((y = _.colspan - 1), !To() && b.right)) {
                  let S = b.right;
                  for (let C = 1; C < _.colspan; C++) S -= t[k + C].width;
                  _.right = S;
                }
              } else y && y--;
            });
        }
      }
      return h;
    }, [t, r]),
    u = $(() => a?.left || a?.right, [a]);
  function f(h) {
    return t.find((m) => m.id === h);
  }
  function p(h, m) {
    let x = m;
    return h.rowspan && (x += h.rowspan - 1), x === c.length - 1;
  }
  function w(h, m, x) {
    if (!x.sort) return !1;
    for (let y = c.length - 1; y >= 0; y--) {
      const b = x.header[y];
      if (!b.filter && !b._hidden) return m === y;
    }
    return p(h, m);
  }
  return /* @__PURE__ */ g('div', {
    className: `wx-sAsPVaUK wx-${r}`,
    style: { paddingLeft: `${n}px`, width: `${e}px` },
    role: 'rowgroup',
    children: c.map((h, m) =>
      /* @__PURE__ */ g(
        'div',
        {
          className:
            r === 'header' ? 'wx-sAsPVaUK wx-h-row' : 'wx-sAsPVaUK wx-f-row',
          style: { height: `${d?.[m]}px`, display: 'flex' },
          role: 'row',
          children: h.map((x) => {
            const y = f(x.id);
            return r === 'header'
              ? /* @__PURE__ */ g(
                  Ac,
                  {
                    cell: x,
                    columnStyle: s,
                    column: y,
                    row: m,
                    lastRow: p(x, m),
                    bodyHeight: o,
                    sortRow: w(x, m, y),
                    hasSplit: u,
                  },
                  x.id,
                )
              : /* @__PURE__ */ g(
                  Lc,
                  {
                    cell: x,
                    columnStyle: s,
                    column: f(x.id),
                    row: m,
                  },
                  x.id,
                );
          }),
        },
        m,
      ),
    ),
  });
}
function Pc({ overlay: n }) {
  const e = $e(et);
  function t(s) {
    return typeof s == 'function';
  }
  const r = n;
  return /* @__PURE__ */ g('div', {
    className: 'wx-1ty666CQ wx-overlay',
    children: t(n)
      ? /* @__PURE__ */ g(r, {
          onAction: ({ action: s, data: o }) => e.exec(s, o),
        })
      : n,
  });
}
function zc(n) {
  const { actions: e, editor: t } = n,
    [r, s] = U(t?.value || ''),
    o = W(null);
  G(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function l({ key: a }) {
    a === 'Enter' && e.save();
  }
  return /* @__PURE__ */ g('input', {
    className: 'wx-e7Ao5ejY wx-text',
    onInput: i,
    onKeyDown: l,
    ref: o,
    type: 'text',
    value: r,
  });
}
function Oc({ actions: n, editor: e, onAction: t }) {
  const [r, s] = U(e?.value),
    [o, i] = U(e?.renderedValue),
    [l, a] = U(e?.options || []),
    d = $(() => e?.config?.template, [e]),
    c = $(() => e?.config?.cell, [e]),
    u = $(() => (l || []).findIndex((y) => y.id === r), [l, r]),
    f = W(null),
    p = W(null),
    w = E(
      (y) => {
        (f.current = y.navigate), (p.current = y.keydown), f.current(u);
      },
      [u, f],
    ),
    h = E(
      (y) => {
        const b = y?.target?.value ?? '';
        i(b);
        const k = b
          ? (e?.options || []).filter((_) =>
              (_.label || '').toLowerCase().includes(b.toLowerCase()),
            )
          : e?.options || [];
        a(k), k.length ? f.current(-1 / 0) : f.current(null);
      },
      [e],
    ),
    m = W(null);
  G(() => {
    m.current && m.current.focus();
  }, []),
    G(() => {
      s(e?.value), i(e?.renderedValue), a(e?.options || []);
    }, [e]);
  const x = E(
    ({ id: y }) => {
      n.updateValue(y), n.save();
    },
    [n],
  );
  return /* @__PURE__ */ Z(Re, {
    children: [
      /* @__PURE__ */ g('input', {
        className: 'wx-0UYfSd1x wx-input',
        ref: m,
        value: o ?? '',
        onChange: h,
        onKeyDown: (y) => (p.current ? p.current(y, u) : void 0),
      }),
      /* @__PURE__ */ g(En, {
        items: l,
        onReady: w,
        onSelect: x,
        children: ({ option: y }) =>
          d
            ? d(y)
            : c
              ? /* @__PURE__ */ g(c, { data: y, onAction: t })
              : y.label,
      }),
    ],
  });
}
function Wc({ actions: n, editor: e, onAction: t }) {
  const [r] = U(() => e.value || /* @__PURE__ */ new Date()),
    [s] = U(() => e.config?.template),
    [o] = U(() => e.config?.cell);
  function i({ value: a }) {
    n.updateValue(a), n.save();
  }
  const l = W(null);
  return (
    G(() => {
      l.current && l.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ Z(Re, {
      children: [
        /* @__PURE__ */ g('div', {
          className: 'wx-lNWNYUb6 wx-value',
          ref: l,
          tabIndex: 0,
          onClick: () => n.cancel(),
          onKeyDown: (a) => a.preventDefault(),
          children: s
            ? s(r)
            : o
              ? /* @__PURE__ */ g(o, { data: e.value, onAction: t })
              : /* @__PURE__ */ g('span', {
                  className: 'wx-lNWNYUb6 wx-text',
                  children: e.renderedValue,
                }),
        }),
        /* @__PURE__ */ g(Wt, {
          width: 'auto',
          children: /* @__PURE__ */ g(Hs, {
            value: r,
            onChange: i,
            buttons: e.config?.buttons,
          }),
        }),
      ],
    })
  );
}
function Fc(n) {
  const { actions: e, editor: t } = n,
    r = n.onAction ?? n.onaction,
    s = t.config || {},
    [o] = U(t.options.find((h) => h.id === t.value)),
    [i] = U(t.value),
    [l] = U(t.options),
    a = $(() => l.findIndex((h) => h.id === i), [l, i]);
  function d({ id: h }) {
    e.updateValue(h), e.save();
  }
  let c;
  const [u, f] = U();
  function p(h) {
    (c = h.navigate), f(() => h.keydown), c(a);
  }
  const w = W(null);
  return (
    G(() => {
      w.current && w.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ Z(Re, {
      children: [
        /* @__PURE__ */ g('div', {
          ref: w,
          className: 'wx-ywGRk611 wx-value',
          tabIndex: 0,
          onClick: () => e.cancel(),
          onKeyDown: (h) => {
            u(h, a), h.preventDefault();
          },
          children: s.template
            ? s.template(o)
            : s.cell
              ? (() => {
                  const h = s.cell;
                  return /* @__PURE__ */ g(h, { data: o, onAction: r });
                })()
              : /* @__PURE__ */ g('span', {
                  className: 'wx-ywGRk611 wx-text',
                  children: t.renderedValue,
                }),
        }),
        /* @__PURE__ */ g(En, {
          items: l,
          onReady: p,
          onSelect: d,
          children: ({ option: h }) =>
            s.template
              ? s.template(h)
              : s.cell
                ? (() => {
                    const m = s.cell;
                    return /* @__PURE__ */ g(m, { data: h, onAction: r });
                  })()
                : h.label,
        }),
      ],
    })
  );
}
const Yc = {
  text: zc,
  combo: Oc,
  datepicker: Wc,
  richselect: Fc,
};
function Gc({ column: n, row: e }) {
  const t = $e(et),
    r = re(t, 'editor'),
    s = E(
      (w, h) => {
        t.exec('close-editor', { ignore: w }),
          h &&
            t.exec('focus-cell', {
              ...h,
              eventSource: 'click',
            });
      },
      [t],
    ),
    o = E(
      (w) => {
        const h = w ? null : { row: r?.id, column: r?.column };
        s(!1, h);
      },
      [r, s],
    ),
    i = E(() => {
      s(!0, { row: r?.id, column: r?.column });
    }, [r, s]),
    l = E(
      (w) => {
        t.exec('editor', { value: w });
      },
      [t],
    ),
    a = E(
      (w) => {
        w.key === 'Enter' && r && i();
      },
      [r, i],
    ),
    d = $(
      () => Pn(n.width, n.flexgrow, n.fixed, n.left, n.right),
      [n.width, n.flexgrow, n.fixed, n.left, n.right],
    ),
    c = $(() => {
      let w = n.editor;
      typeof w == 'function' && (w = w(e, n));
      let h = typeof w == 'string' ? w : w.type;
      return Yc[h];
    }, [n, e]),
    u = W(null);
  G(() => {
    if (!u.current) return;
    const w = Jt(u.current, () => o(!0));
    return () => {
      typeof w == 'function' && w();
    };
  }, [o]),
    G(() => {
      u.current && typeof d == 'string' && u.current.setAttribute('style', d);
    }, [d]);
  const f = typeof e.$parent < 'u' ? 'gridcell' : 'cell',
    p = typeof e.$parent < 'u' ? !n.editor : void 0;
  return /* @__PURE__ */ g('div', {
    className: 'wx-8l724t2g wx-cell wx-editor',
    ref: u,
    style: typeof d == 'object' && d !== null ? d : void 0,
    role: f,
    'aria-readonly': p,
    tabIndex: -1,
    onClick: (w) => w.stopPropagation(),
    onDoubleClick: (w) => w.stopPropagation(),
    onKeyDown: a,
    children: c
      ? /* @__PURE__ */ g(c, {
          editor: r,
          actions: { save: o, cancel: i, updateValue: l },
          onAction: ({ action: w, data: h }) => t.exec(w, h),
        })
      : null,
  });
}
function ys(n) {
  const { columns: e, type: t, columnStyle: r } = n,
    s = $e(et),
    { filterValues: o, _columns: i, _sizes: l } = s.getState();
  function a(d) {
    return r ? ' ' + r(d) : '';
  }
  return /* @__PURE__ */ g(Re, {
    children: e.map((d, c) =>
      /* @__PURE__ */ g(
        'tr',
        {
          children: d.map((u) => {
            const f = i.find((h) => h.id == u.id),
              p = `wx-print-cell-${t}${a(f)}${u.filter ? ' wx-print-cell-filter' : ''}${u.vertical ? ' wx-vertical' : ''}`,
              w = u.cell;
            return /* @__PURE__ */ g(
              'th',
              {
                style: Es(No(u, l.columnWidth)),
                className: 'wx-Gy81xq2u ' + p,
                rowSpan: u.rowspan,
                colSpan: u.colspan,
                children: w
                  ? /* @__PURE__ */ g(w, {
                      api: s,
                      cell: Object.fromEntries(
                        Object.entries(u).filter(([h]) => h !== 'cell'),
                      ),
                      column: f,
                      row: c,
                    })
                  : u.filter
                    ? /* @__PURE__ */ g('div', {
                        className: 'wx-Gy81xq2u wx-print-filter',
                        children: Ha(o, i, u),
                      })
                    : /* @__PURE__ */ g('div', {
                        className: 'wx-Gy81xq2u wx-text',
                        children: u.text ?? '',
                      }),
              },
              u.id,
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
    a = $e(et),
    { flatData: d, _sizes: c } = a.getState(),
    u = o && ds(e, 'header', c.headerRowHeights),
    f = i && ds(e, 'footer', c.footerRowHeights);
  function p(h, m) {
    let x = '';
    return (x += r ? ' ' + r(m) : ''), (x += s ? ' ' + s(h, m) : ''), x;
  }
  function w(h, m) {
    return typeof m.draggable == 'function'
      ? m.draggable(h, m) !== !1
      : m.draggable;
  }
  return /* @__PURE__ */ Z('table', {
    className: `wx-8NTMLH0z wx-print-grid ${e.some((h) => h.flexgrow) ? 'wx-flex-columns' : ''}`,
    children: [
      o
        ? /* @__PURE__ */ g('thead', {
            children: /* @__PURE__ */ g(ys, {
              columns: u,
              type: 'header',
              columnStyle: r,
            }),
          })
        : null,
      /* @__PURE__ */ g('tbody', {
        children: d.map((h, m) =>
          /* @__PURE__ */ g(
            'tr',
            {
              className: 'wx-8NTMLH0z wx-row' + (t ? ' ' + t(h) : ''),
              style: { height: `${h.rowHeight || c.rowHeight}px` },
              children: e.map((x) =>
                x.collapsed
                  ? null
                  : /* @__PURE__ */ Z(
                      'td',
                      {
                        className: `wx-8NTMLH0z wx-print-cell wx-cell ${p(h, x)}`,
                        style: Es(No(x, c.columnWidth)),
                        children: [
                          l && x.draggable
                            ? /* @__PURE__ */ g('span', {
                                className: 'wx-8NTMLH0z wx-print-draggable',
                                children: w(h, x)
                                  ? /* @__PURE__ */ g('i', {
                                      className: 'wx-8NTMLH0z wxi-drag',
                                    })
                                  : null,
                              })
                            : null,
                          x.treetoggle
                            ? /* @__PURE__ */ Z(Re, {
                                children: [
                                  /* @__PURE__ */ g('span', {
                                    style: { marginLeft: h.$level * 28 + 'px' },
                                  }),
                                  h.$count
                                    ? /* @__PURE__ */ g('i', {
                                        className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${h.open !== !1 ? 'down' : 'right'}`,
                                      })
                                    : null,
                                ],
                              })
                            : null,
                          x.cell
                            ? (() => {
                                const y = x.cell;
                                return /* @__PURE__ */ g(y, {
                                  api: a,
                                  row: h,
                                  column: x,
                                });
                              })()
                            : /* @__PURE__ */ g('span', { children: wt(h, x) }),
                        ],
                      },
                      x.id,
                    ),
              ),
            },
            m,
          ),
        ),
      }),
      i
        ? /* @__PURE__ */ g('tfoot', {
            children: /* @__PURE__ */ g(ys, {
              columns: f,
              type: 'footer',
              columnStyle: r,
            }),
          })
        : null,
    ],
  });
}
function Bc(n) {
  const { config: e, ...t } = n,
    r = $e(et),
    { _skin: s, _columns: o } = r.getState(),
    i = $(() => Da(o, e), []),
    l = W(null);
  return (
    G(() => {
      const a = document.body;
      a.classList.add('wx-print');
      const d = l.current;
      if (!d) return;
      const c = d.cloneNode(!0);
      a.appendChild(c);
      const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`,
        f = document.createElement('style');
      f.setAttribute('type', 'text/css'),
        f.setAttribute('media', 'print'),
        document.getElementsByTagName('head')[0].appendChild(f),
        f.appendChild(document.createTextNode(u)),
        window.print(),
        f.remove(),
        a.classList.remove('wx-print'),
        c.remove();
    }, []),
    /* @__PURE__ */ g('div', {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: l,
      children: i.map((a, d) =>
        /* @__PURE__ */ g(
          'div',
          {
            className: 'wx-4zwCKA7C wx-print-grid-wrapper',
            children: /* @__PURE__ */ g(Vc, { columns: a, ...t }),
          },
          d,
        ),
      ),
    })
  );
}
function Kc(n) {
  const {
      header: e,
      footer: t,
      overlay: r,
      multiselect: s,
      onreorder: o,
      rowStyle: i,
      columnStyle: l,
      cellStyle: a,
      autoRowHeight: d,
      resize: c,
      clientWidth: u,
      clientHeight: f,
      responsiveLevel: p,
      hotkeys: w,
    } = n,
    h = $e(et),
    m = re(h, 'dynamic'),
    x = re(h, '_columns'),
    y = re(h, 'flatData'),
    b = re(h, 'split'),
    k = re(h, '_sizes'),
    [_, S] = bn(h, 'selectedRows'),
    C = re(h, 'select'),
    D = re(h, 'editor'),
    F = re(h, 'tree'),
    N = re(h, 'focusCell'),
    T = re(h, '_print'),
    z = re(h, 'undo'),
    Y = re(h, 'reorder'),
    O = re(h, '_rowHeightFromData'),
    [V, K] = U(0);
  G(() => {
    K(Fn());
  }, []);
  const [ue, j] = U(0),
    [ae, ye] = U(0),
    L = $(() => (x || []).some((I) => !I.hidden && I.flexgrow), [x]),
    se = $(() => k?.rowHeight || 0, [k]),
    xe = W(null),
    [ge, He] = U(null),
    [B, fe] = U(null),
    Q = $(() => {
      let I = [],
        te = 0;
      return (
        b &&
          b.left &&
          ((I = (x || [])
            .slice(0, b.left)
            .filter((v) => !v.hidden)
            .map((v) => ({ ...v }))),
          I.forEach((v) => {
            (v.fixed = { left: 1 }), (v.left = te), (te += v.width);
          }),
          I.length && (I[I.length - 1].fixed = { left: -1 })),
        { columns: I, width: te }
      );
    }, [b, x]),
    ne = $(() => {
      let I = [],
        te = 0;
      if (b && b.right) {
        I = (x || [])
          .slice(b.right * -1)
          .filter((v) => !v.hidden)
          .map((v) => ({ ...v }));
        for (let v = I.length - 1; v >= 0; v--) {
          const M = I[v];
          (M.fixed = { right: 1 }), (M.right = te), (te += M.width);
        }
        I.length && (I[0].fixed = { right: -1 });
      }
      return { columns: I, width: te };
    }, [b, x]),
    he = $(() => {
      const I = (x || [])
        .slice(b?.left || 0, (x || []).length - (b?.right ?? 0))
        .filter((te) => !te.hidden);
      return (
        I.forEach((te) => {
          te.fixed = 0;
        }),
        I
      );
    }, [x, b]),
    le = $(
      () => (x || []).reduce((I, te) => (te.hidden || (I += te.width), I), 0),
      [x],
    ),
    Oe = 1;
  function Ie(I, te, v) {
    let M = te,
      P = I;
    if (he.length) {
      let R = he.length;
      for (let H = I; H >= 0; H--)
        he[H][v].forEach((q) => {
          q.colspan > 1 && H > I - q.colspan && H < R && (R = H);
        });
      if (R !== he.length && R < I) {
        for (let H = R; H < I; H++) M -= he[H].width;
        P = R;
      }
    }
    return { index: P, delta: M };
  }
  const De = $(() => {
      let I, te, v;
      const M = ue,
        P = ue + (u || 0);
      let R = 0,
        H = 0,
        q = 0,
        ee = 0;
      he.forEach((Ue, tt) => {
        M > q && ((R = tt), (ee = q)),
          (q = q + Ue.width),
          P > q && (H = tt + Oe);
      });
      const ie = { header: 0, footer: 0 };
      for (let Ue = H; Ue >= R; Ue--)
        ['header', 'footer'].forEach((tt) => {
          he[Ue] &&
            he[Ue][tt].forEach((mt) => {
              const Bt = mt.colspan;
              if (Bt && Bt > 1) {
                const dn = Bt - (H - Ue + 1);
                dn > 0 && (ie[tt] = Math.max(ie[tt], dn));
              }
            });
        });
      const ve = Ie(R, ee, 'header'),
        Te = Ie(R, ee, 'footer'),
        Le = ve.delta,
        Fe = ve.index,
        Ye = Te.delta,
        ct = Te.index;
      return (
        L && le > (u || 0)
          ? (I = te = v = [...Q.columns, ...he, ...ne.columns])
          : ((I = [...Q.columns, ...he.slice(R, H + 1), ...ne.columns]),
            (te = [
              ...Q.columns,
              ...he.slice(Fe, H + ie.header + 1),
              ...ne.columns,
            ]),
            (v = [
              ...Q.columns,
              ...he.slice(ct, H + ie.footer + 1),
              ...ne.columns,
            ])),
        {
          data: I || [],
          header: te || [],
          footer: v || [],
          d: ee,
          df: Ye,
          dh: Le,
        }
      );
    }, [he, Q, ne, ue, u, L, le]),
    ce = $(() => (e && k?.headerHeight) || 0, [e, k]),
    me = $(() => (t && k?.footerHeight) || 0, [t, k]),
    Ce = $(() => (u && f ? le >= u : !1), [u, f, le]),
    Ae = $(() => (f || 0) - ce - me - (Ce ? V : 0), [f, ce, me, Ce, V]),
    J = $(() => Math.ceil((Ae || 0) / (se || 1)) + 1, [Ae, se]),
    be = W([]),
    [we, de] = U(0),
    [ze, Se] = U(void 0),
    ke = $(() => {
      let I = 0,
        te = 0;
      const v = 2;
      if (d) {
        let R = ae;
        for (; R > 0; ) (R -= be.current[I] || se), I++;
        te = ae - R;
        for (let H = Math.max(0, I - v - 1); H < I; H++)
          te -= be.current[I - H] || se;
        I = Math.max(0, I - v);
      } else {
        if (O) {
          let R = 0,
            H = 0;
          for (let ve = 0; ve < (y || []).length; ve++) {
            const Te = y[ve].rowHeight || se;
            if (H + Te > ae) {
              R = ve;
              break;
            }
            H += Te;
          }
          I = Math.max(0, R - v);
          for (let ve = 0; ve < I; ve++) te += y[ve].rowHeight || se;
          let q = 0,
            ee = 0;
          for (let ve = R + 1; ve < (y || []).length; ve++) {
            const Te = y[ve].rowHeight || se;
            if ((q++, ee + Te > Ae)) break;
            ee += Te;
          }
          const ie = Math.min(m ? m.rowCount : (y || []).length, R + q + v);
          return { d: te, start: I, end: ie };
        }
        (I = Math.floor(ae / (se || 1))),
          (I = Math.max(0, I - v)),
          (te = I * (se || 0));
      }
      const M = m ? m.rowCount : (y || []).length,
        P = Math.min(M, I + (J || 0) + v);
      return { d: te, start: I, end: P };
    }, [d, O, ae, se, m, y, J, Ae]),
    _e = $(() => {
      const I = m ? m.rowCount : (y || []).length;
      if (d) return we + ke.d + (I - (ze || 0)) * (se || 0);
      if (!O) return I * (se || 0);
      let te = 0;
      for (let v = 0; v < I; v++) te += y[v]?.rowHeight || se;
      return te;
    }, [m, y, se, d, O, we, ke.d, ze]),
    Pe = $(
      () => (u && f ? _e + ce + me >= f - (le >= (u || 0) ? V : 0) : !1),
      [u, f, _e, ce, me, le, V],
    ),
    We = $(
      () => (L && le <= (u || 0) ? (u || 0) - 0 - (Pe ? V : 0) : le),
      [L, le, u, Pe, V, Ce],
    ),
    A = $(
      () =>
        L && le <= (u || 0) ? u || 0 : We < (u || 0) ? le + (Pe ? V : 0) : -1,
      [L, le, u, We, Pe, V],
    ),
    X = W({});
  G(() => {
    if (m && (X.current.start !== ke.start || X.current.end !== ke.end)) {
      const { start: I, end: te } = ke;
      (X.current = { start: I, end: te }),
        h && h.exec && h.exec('request-data', { row: { start: I, end: te } });
    }
  }, [m, ke, h]);
  const oe = $(
      () => (m ? y || [] : (y || []).slice(ke.start, ke.end)),
      [m, y, ke],
    ),
    pe = $(
      () => (_ || []).filter((I) => (oe || []).some((te) => te.id === I)),
      [S, oe],
    ),
    Me = $(() => ke.start, [ke.start]),
    Ee = E((I) => {
      ye(I.target.scrollTop), j(I.target.scrollLeft);
    }, []),
    Ge = E((I) => {
      I.shiftKey && I.preventDefault(),
        xe.current && xe.current.focus && xe.current.focus();
    }, []),
    Ke = E(() => !!(x || []).find((I) => !!I.draggable), [x]),
    it = W(null),
    st = W(null),
    zn = W({
      dblclick: (I, te) => {
        const v = { id: I, column: nr(te, 'data-col-id') };
        h.exec('open-editor', v);
      },
      click: (I, te) => {
        if (it.current) return;
        const v = nr(te, 'data-col-id');
        if (
          (N?.id !== I &&
            h.exec('focus-cell', {
              row: I,
              column: v,
              eventSource: 'click',
            }),
          C === !1)
        )
          return;
        const M = s && te.ctrlKey,
          P = s && te.shiftKey;
        (M || _.length > 1 || !_.includes(I)) &&
          h.exec('select-row', { id: I, toggle: M, range: P });
      },
      'toggle-row': (I) => {
        const te = h.getRow(I);
        h.exec(te.open !== !1 ? 'close-row' : 'open-row', { id: I });
      },
      'ignore-click': () => !1,
    }),
    Dt = $(
      () => ({
        top: ce,
        bottom: me,
        left: Q.width,
        xScroll: Ce,
        yScroll: Pe,
        sense: d && B ? B.offsetHeight : Math.max(k?.rowHeight || 0, 40),
        node: xe.current && xe.current.firstElementChild,
      }),
      [ce, me, Q.width, Ce, Pe, d, B, k],
    );
  function Yt(I, te) {
    const { container: v, sourceNode: M, from: P } = te;
    if (Ke() && !M.getAttribute('draggable-data')) return !1;
    He(P), h.getRow(P).open && h.exec('close-row', { id: P, nested: !0 });
    const R = Xe(M, 'data-id'),
      H = R.cloneNode(!0);
    H.classList.remove('wx-selected'),
      H.querySelectorAll('[tabindex]').forEach((ve) =>
        ve.setAttribute('tabindex', '-1'),
      ),
      v.appendChild(H),
      fe(H);
    const q = ue - De.d,
      ee = Pe ? V : 0;
    v.style.width =
      Math.min((u || 0) - ee, L && le <= (u || 0) ? We : We - ee) + q + 'px';
    const ie = vn(R);
    (te.offset = {
      x: q,
      y: -Math.round(ie.height / 2),
    }),
      st.current || (st.current = I.clientY);
  }
  function On(I, te) {
    const { from: v } = te,
      M = te.pos,
      P = vn(xe.current);
    M.x = P.x;
    const R = Dt.top;
    if (M.y < R) M.y = R;
    else {
      const H =
        P.height - (Ce && V > 0 ? V : Math.round(Dt.sense / 2)) - Dt.bottom;
      M.y > H && (M.y = H);
    }
    if (xe.current.contains(te.targetNode)) {
      const H = Xe(te.targetNode, 'data-id'),
        q = zt(H?.getAttribute('data-id'));
      if (q && q !== v) {
        te.to = q;
        const ee = d ? B?.offsetHeight : k?.rowHeight;
        if (B && (ae === 0 || M.y > R + ee - 1)) {
          const ie = H.getBoundingClientRect(),
            ve = vn(B).y,
            Te = ie.y,
            Le = ve > Te ? -1 : 1,
            Fe = Le === 1 ? 'after' : 'before',
            Ye = Math.abs(h.getRowIndex(v) - h.getRowIndex(q)),
            ct = Ye !== 1 ? (Fe === 'before' ? 'after' : 'before') : Fe;
          if (
            Ye === 1 &&
            ((Le === -1 && I.clientY > st.current) ||
              (Le === 1 && I.clientY < st.current))
          )
            return;
          (st.current = I.clientY),
            h.exec('move-item', {
              id: v,
              target: q,
              mode: ct,
              inProgress: !0,
            });
        }
      }
      o && o({ event: I, context: te });
    }
    Cc(I, P, te, Dt);
  }
  function Wn(I, te) {
    const { from: v, to: M } = te;
    h.exec('move-item', {
      id: v,
      target: M,
      inProgress: !1,
    }),
      (it.current = setTimeout(() => {
        it.current = 0;
      }, 1)),
      He(null),
      fe(null),
      (st.current = null),
      Po(te);
  }
  function Fn() {
    const I = document.createElement('div');
    (I.style.cssText =
      'position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;'),
      document.body.appendChild(I);
    const te = I.offsetWidth - I.clientWidth;
    return document.body.removeChild(I), te;
  }
  const Et = $(() => (A > 0 ? { width: `${A}px` } : void 0), [A]),
    xt = W(null);
  function on() {
    Promise.resolve().then(() => {
      let I = 0,
        te = Me;
      const v = xt.current;
      v &&
        (Array.from(v.children).forEach((M, P) => {
          (be.current[Me + P] = M.offsetHeight), (I += M.offsetHeight), te++;
        }),
        de(I),
        Se(te));
    });
  }
  G(() => {
    oe && d && on();
  }, [oe, d, Me]);
  let [gt, Gt] = U();
  G(() => {
    if (N && (!C || !pe.length || pe.includes(N.row))) Gt({ ...N });
    else if (oe.length && De.data.length) {
      if (
        !gt ||
        (pe.length && !pe.includes(gt.row)) ||
        oe.findIndex((I) => I.id == gt.row) === -1 ||
        De.data.findIndex((I) => I.id == gt.column && !I.collapsed) === -1
      ) {
        const I = pe[0] || oe[0].id,
          te = De.data.findIndex((v) => !v.collapsed);
        Gt(te !== -1 ? { row: I, column: De.data[te].id } : null);
      }
    } else Gt(null);
  }, [N]);
  const ln = W(null);
  G(() => {
    const I = xe.current;
    if (!I) return;
    const te = yc(I, c);
    return () => {
      typeof te == 'function' && te();
    };
  }, [c]);
  const an = W({});
  Object.assign(an.current, {
    start: Yt,
    move: On,
    end: Wn,
    getReorder: () => Y,
    getDraggableInfo: () => ({ hasDraggable: Ke() }),
  }),
    G(() => {
      const I = xe.current;
      return I ? bc(I, an).destroy : void 0;
    }, [Y, xe.current]),
    G(() => {
      const I = xe.current;
      return I
        ? Er(I, {
            keys: w !== !1 && {
              ...ec,
              'ctrl+z': z,
              'ctrl+y': z,
              ...w,
            },
            exec: (te) => h.exec('hotkey', te),
          }).destroy
        : void 0;
    }, [h, z, w]);
  const yt = W({
    scroll: h.getReactiveState().scroll,
  });
  (yt.current.getWidth = () => (u || 0) - (Pe ? V : 0)),
    (yt.current.getHeight = () => Ae),
    (yt.current.getScrollMargin = () => Q.width + ne.width),
    G(() => {
      tc(ln.current, yt.current);
    }, []);
  const Vt = W(null);
  G(() => {
    const I = Vt.current;
    if (!I) return;
    const te = [];
    return (
      te.push(
        Jt(I, () => h.exec('focus-cell', { eventSource: 'click' })).destroy,
      ),
      te.push(ai(I, zn.current)),
      () => te.forEach((v) => v())
    );
  }, []);
  const cn = `wx-grid ${p ? `wx-responsive-${p}` : ''}`;
  return /* @__PURE__ */ Z(Re, {
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-4VuBwK2D ' + cn,
        style: {
          '--header-height': `${ce}px`,
          '--footer-height': `${me}px`,
          '--split-left-width': `${Q.width}px`,
          '--split-right-width': `${ne.width}px`,
        },
        children: /* @__PURE__ */ g('div', {
          ref: xe,
          className: 'wx-4VuBwK2D wx-table-box',
          style: Et,
          role: F ? 'treegrid' : 'grid',
          'aria-colcount': De.data.length,
          'aria-rowcount': oe.length,
          'aria-multiselectable': F && s ? !0 : void 0,
          tabIndex: -1,
          children: /* @__PURE__ */ Z('div', {
            ref: ln,
            className: 'wx-4VuBwK2D wx-scroll',
            style: {
              overflowX: Ce ? 'scroll' : 'hidden',
              overflowY: Pe ? 'scroll' : 'hidden',
            },
            onScroll: Ee,
            children: [
              e
                ? /* @__PURE__ */ g('div', {
                    className: 'wx-4VuBwK2D wx-header-wrapper',
                    children: /* @__PURE__ */ g(xs, {
                      contentWidth: We,
                      deltaLeft: De.dh,
                      columns: De.header,
                      columnStyle: l,
                      bodyHeight: Ae - +t,
                    }),
                  })
                : null,
              /* @__PURE__ */ Z('div', {
                ref: Vt,
                className: 'wx-4VuBwK2D wx-body',
                style: { width: `${We}px`, height: `${_e}px` },
                onMouseDown: (I) => Ge(I),
                children: [
                  r ? /* @__PURE__ */ g(Pc, { overlay: r }) : null,
                  /* @__PURE__ */ g('div', {
                    ref: xt,
                    className: 'wx-4VuBwK2D wx-data',
                    style: {
                      paddingTop: `${ke.d}px`,
                      paddingLeft: `${De.d}px`,
                    },
                    children: oe.map((I, te) => {
                      const v = _.indexOf(I.id) !== -1,
                        M = ge === I.id,
                        P =
                          'wx-row' +
                          (d ? ' wx-autoheight' : '') +
                          (i ? ' ' + i(I) : '') +
                          (v ? ' wx-selected' : '') +
                          (M ? ' wx-inactive' : ''),
                        R = d
                          ? { minHeight: `${I.rowHeight || se}px` }
                          : { height: `${I.rowHeight || se}px` };
                      return /* @__PURE__ */ g(
                        'div',
                        {
                          className: 'wx-4VuBwK2D ' + P,
                          'data-id': I.id,
                          'data-context-id': I.id,
                          style: R,
                          role: 'row',
                          'aria-rowindex': te,
                          'aria-expanded': I.open,
                          'aria-level': F ? I.$level + 1 : void 0,
                          'aria-selected': F ? v : void 0,
                          tabIndex: -1,
                          children: De.data.map((H) =>
                            H.collapsed
                              ? /* @__PURE__ */ g(
                                  'div',
                                  {
                                    className:
                                      'wx-4VuBwK2D wx-cell wx-collapsed',
                                  },
                                  H.id,
                                )
                              : D?.id === I.id && D.column == H.id
                                ? /* @__PURE__ */ g(
                                    Gc,
                                    { row: I, column: H },
                                    H.id,
                                  )
                                : /* @__PURE__ */ g(
                                    Dc,
                                    {
                                      row: I,
                                      column: H,
                                      columnStyle: l,
                                      cellStyle: a,
                                      reorder: Y,
                                      focusable:
                                        gt?.row === I.id && gt?.column == H.id,
                                    },
                                    H.id,
                                  ),
                          ),
                        },
                        I.id,
                      );
                    }),
                  }),
                ],
              }),
              t && (y || []).length
                ? /* @__PURE__ */ g(xs, {
                    type: 'footer',
                    contentWidth: We,
                    deltaLeft: De.df,
                    columns: De.footer,
                    columnStyle: l,
                  })
                : null,
            ],
          }),
        }),
      }),
      T
        ? /* @__PURE__ */ g(Bc, {
            config: T,
            rowStyle: i,
            columnStyle: l,
            cellStyle: a,
            header: e,
            footer: t,
            reorder: Y,
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
  jc = Nt(function (
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
      footer: d = !1,
      dynamic: c = null,
      overlay: u = null,
      reorder: f = !1,
      onReorder: p = null,
      autoRowHeight: w = !1,
      sizes: h,
      split: m,
      tree: x = !1,
      autoConfig: y = !1,
      init: b = null,
      responsive: k = null,
      sortMarks: _,
      undo: S = !1,
      hotkeys: C = null,
      ...D
    },
    F,
  ) {
    const N = W();
    N.current = D;
    const T = $(() => new ja(Is), []),
      z = $(() => T.in, [T]),
      Y = W(null);
    Y.current === null &&
      ((Y.current = new Os((Q, ne) => {
        const he = 'on' + Uc(Q);
        N.current && N.current[he] && N.current[he](ne);
      })),
      z.setNext(Y.current));
    const O = $(
        () => ({
          getState: T.getState.bind(T),
          getReactiveState: T.getReactive.bind(T),
          getStores: () => ({ data: T }),
          exec: z.exec,
          setNext: (Q) => ((Y.current = Y.current.setNext(Q)), Y.current),
          intercept: z.intercept.bind(z),
          on: z.on.bind(z),
          detach: z.detach.bind(z),
          getRow: T.getRow.bind(T),
          getRowIndex: T.getRowIndex.bind(T),
          getColumn: T.getColumn.bind(T),
        }),
        [T, z],
      ),
      [V, K] = U(0),
      [ue, j] = U(0),
      [ae, ye] = U(null),
      [L, se] = U(null),
      xe = $(() => {
        if (y && !e.length && n.length) {
          const Q = n[0],
            ne = [];
          for (let he in Q)
            if (he !== 'id' && he[0] !== '$') {
              let le = {
                id: he,
                header: he[0].toUpperCase() + he.slice(1),
              };
              typeof y == 'object' && (le = { ...le, ...y }), ne.push(le);
            }
          return ne;
        }
        return (L && L.columns) ?? e;
      }, [y, e, n, L]),
      ge = $(() => (L && L.sizes) ?? h, [L, h]),
      He = E(
        (Q) => {
          if ((K(Q.width), j(Q.height), k)) {
            const ne =
              Object.keys(k)
                .map(Number)
                .sort((he, le) => he - le)
                .find((he) => Q.width <= he) ?? null;
            ne !== ae && (se(k[ne]), ye(ne));
          }
        },
        [k, ae],
      ),
      B = $e(qe.theme),
      fe = W(0);
    return (
      G(() => {
        if (!fe.current) b && b(O);
        else {
          const Q = T.getState();
          T.init({
            data: n,
            columns: xe,
            split: m || Q.split,
            sizes: ge || Q.sizes,
            selectedRows: o || Q.selectedRows,
            dynamic: c,
            tree: x,
            sortMarks: _ || Q.sortMarks,
            undo: S,
            reorder: f,
            _skin: B,
            _select: i,
          });
        }
        fe.current++;
      }, [T, n, xe, m, ge, o, c, x, _, S, f, B, i, b, O]),
      fe.current === 0 &&
        T.init({
          data: n,
          columns: xe,
          split: m || { left: 0 },
          sizes: ge || {},
          selectedRows: o || [],
          dynamic: c,
          tree: x,
          sortMarks: _ || {},
          undo: S,
          reorder: f,
          _skin: B,
          select: i,
        }),
      Tt(
        F,
        () => ({
          ...O,
        }),
        [O],
      ),
      /* @__PURE__ */ g(et.Provider, {
        value: O,
        children: /* @__PURE__ */ g(In, {
          words: sc,
          optional: !0,
          children: /* @__PURE__ */ g(Kc, {
            header: a,
            footer: d,
            overlay: u,
            rowStyle: t,
            columnStyle: r,
            cellStyle: s,
            onReorder: p,
            multiselect: l,
            autoRowHeight: w,
            clientWidth: V,
            clientHeight: ue,
            responsiveLevel: ae,
            resize: He,
            hotkeys: C,
          }),
        }),
      })
    );
  });
function Xc({ item: n }) {
  return /* @__PURE__ */ Z('div', {
    tabIndex: -1,
    role: 'menuitem',
    'aria-label': n.hidden ? `Show ${n.text} column` : `Hide ${n.text} column`,
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-v13lZxja wx-icon' + (n.hidden ? ' wx-hidden' : ''),
        children: /* @__PURE__ */ g('i', { className: 'wx-v13lZxja wxi-eye' }),
      }),
      /* @__PURE__ */ g('span', { children: n.text }),
    ],
  });
}
function qc({ columns: n = null, api: e, children: t }) {
  G(() => {
    ac('table-header', Xc);
  }, []);
  function r(a) {
    for (let d = a.header.length - 1; d >= 0; d--) {
      const c = a.header[d].text;
      if (c) return c;
    }
    return a.id;
  }
  function s(a) {
    const d = a.action;
    d && e.exec('hide-column', { id: d.id, mode: !d.hidden });
  }
  function o(a) {
    return a;
  }
  const i = lt(e, '_columns'),
    l = $(() => {
      if (e) {
        const a = Array.isArray(i) ? i : [];
        return (n ? a.filter((d) => n[d.id]) : a).map((d) => {
          const c = r(d);
          return {
            id: d.id,
            text: c,
            type: 'table-header',
            hidden: d.hidden,
          };
        });
      } else return [];
    }, [e, n, i]);
  return /* @__PURE__ */ g(Ro, {
    dataKey: 'headerId',
    options: l,
    onClick: s,
    at: 'point',
    resolver: o,
    children: typeof t == 'function' ? t() : t,
  });
}
xr(Je);
function Qc({ row: n, column: e }) {
  const t = $e(pt);
  function r(o, i) {
    return {
      justifyContent: i.align,
      paddingLeft: `${(o.$level - 1) * 20}px`,
    };
  }
  const s = e && e._cell;
  return /* @__PURE__ */ Z('div', {
    className: 'wx-pqc08MHU wx-content',
    style: r(n, e),
    children: [
      n.data || n.lazy
        ? /* @__PURE__ */ g('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${n.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ g('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ g('div', {
        className: 'wx-pqc08MHU wx-text',
        children: s
          ? /* @__PURE__ */ g(s, { row: n, column: e, api: t })
          : n.text,
      }),
    ],
  });
}
function vs({ column: n, cell: e }) {
  const t = $(() => n.id, [n?.id]);
  return e || n.id == 'add-task'
    ? /* @__PURE__ */ g('div', {
        style: { textAlign: n.align },
        children: /* @__PURE__ */ g('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': t,
        }),
      })
    : null;
}
function Zc(n) {
  const {
      readonly: e,
      compactMode: t,
      width: r = 0,
      display: s = 'all',
      columnWidth: o = 0,
      onTableAPIChange: i,
      multiTaskRows: l = !1,
      rowMapping: a = null,
      rowHeightOverrides: d = null,
    } = n,
    [c, u] = Ve(o),
    [f, p] = U(),
    w = $e(qe.i18n),
    h = $(() => w.getGroup('gantt'), [w]),
    m = $e(pt),
    x = re(m, 'scrollTop'),
    y = re(m, 'cellHeight'),
    b = re(m, '_scrollTask'),
    k = re(m, '_selected'),
    _ = re(m, 'area'),
    S = re(m, '_tasks'),
    C = re(m, '_scales'),
    D = re(m, 'columns'),
    F = re(m, '_sort'),
    N = re(m, 'calendar'),
    T = re(m, 'durationUnit'),
    z = re(m, 'splitTasks'),
    [Y, O] = U(null),
    V = $(() => {
      if (!S || !_) return [];
      if (l && a) {
        const A = /* @__PURE__ */ new Set();
        return S.filter((X) => {
          const oe = a.taskRows.get(X.id) ?? X.id;
          return A.has(oe) ? !1 : (A.add(oe), !0);
        });
      }
      return S.slice(_.start, _.end);
    }, [S, _, l, a]),
    K = E(
      (A, X) => {
        if (X === 'add-task')
          m.exec(X, {
            target: A,
            task: { text: h('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (X === 'open-task') {
          const oe = V.find((pe) => pe.id === A);
          (oe?.data || oe?.lazy) && m.exec(X, { id: A, mode: !oe.open });
        }
      },
      [V],
    ),
    ue = E(
      (A) => {
        const X = bt(A),
          oe = A.target.dataset.action;
        oe && A.preventDefault(),
          X
            ? oe === 'add-task' || oe === 'open-task'
              ? K(X, oe)
              : m.exec('select-task', {
                  id: X,
                  toggle: A.ctrlKey || A.metaKey,
                  range: A.shiftKey,
                  show: !0,
                })
            : oe === 'add-task' && K(null, oe);
      },
      [m, K],
    ),
    j = W(null),
    ae = W(null),
    [ye, L] = U(0),
    [se, xe] = U(!1);
  G(() => {
    const A = ae.current;
    if (!A || typeof ResizeObserver > 'u') return;
    const X = () => L(A.clientWidth);
    X();
    const oe = new ResizeObserver(X);
    return oe.observe(A), () => oe.disconnect();
  }, []);
  const ge = W(null),
    He = E(
      (A) => {
        const X = A.id,
          { before: oe, after: pe } = A,
          Me = A.onMove;
        let Ee = oe || pe,
          Ge = oe ? 'before' : 'after';
        if (Me) {
          if (Ge === 'after') {
            const Ke = m.getTask(Ee);
            Ke.data?.length &&
              Ke.open &&
              ((Ge = 'before'), (Ee = Ke.data[0].id));
          }
          ge.current = { id: X, [Ge]: Ee };
        } else ge.current = null;
        m.exec('move-task', {
          id: X,
          mode: Ge,
          target: Ee,
          inProgress: Me,
        });
      },
      [m],
    ),
    B = $(() => _?.from ?? 0, [_]),
    fe = $(() => C?.height ?? 0, [C]),
    Q = $(
      () => (!t && s !== 'grid' ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (ye ?? 0)),
      [t, s, c, r, ye],
    ),
    ne = $(() => {
      const A = {};
      return (
        (Q && s === 'all') || (s === 'grid' && Q)
          ? (A.width = c)
          : s === 'grid' && (A.width = '100%'),
        A
      );
    }, [Q, s, c]),
    he = $(() => (Y && !V.find((A) => A.id === Y.id) ? [...V, Y] : V), [V, Y]),
    le = $(() => {
      let A = (D || []).map((pe) => {
        pe = { ...pe };
        const Me = pe.header;
        if (typeof Me == 'object') {
          const Ee = Me.text && h(Me.text);
          pe.header = { ...Me, text: Ee };
        } else pe.header = h(Me);
        if (pe.cell && pe.id !== 'text' && pe.id !== 'add-task') {
          const Ee = pe.cell;
          pe.cell = (Ge) => /* @__PURE__ */ g(Ee, { ...Ge, api: m });
        }
        return pe;
      });
      const X = A.findIndex((pe) => pe.id === 'text'),
        oe = A.findIndex((pe) => pe.id === 'add-task');
      if (
        (X !== -1 && (A[X].cell && (A[X]._cell = A[X].cell), (A[X].cell = Qc)),
        oe !== -1)
      ) {
        A[oe].cell = A[oe].cell || vs;
        const pe = A[oe].header;
        if (
          (typeof pe != 'object' && (A[oe].header = { text: pe }),
          (A[oe].header.cell = pe.cell || vs),
          e)
        )
          A.splice(oe, 1);
        else if (t) {
          const [Me] = A.splice(oe, 1);
          A.unshift(Me);
        }
      }
      return A.length > 0 && (A[A.length - 1].resize = !1), A;
    }, [D, h, e, t, m]),
    Oe = $(
      () =>
        s === 'all'
          ? `${r}px`
          : s === 'grid'
            ? 'calc(100% - 4px)'
            : le.find((A) => A.id === 'add-task')
              ? '50px'
              : '0',
      [s, r, le],
    ),
    Ie = $(() => {
      if (he && F?.length) {
        const A = {};
        return (
          F.forEach(({ key: X, order: oe }, pe) => {
            A[X] = {
              order: oe,
              ...(F.length > 1 && { index: pe }),
            };
          }),
          A
        );
      }
      return {};
    }, [he, F]),
    De = E(() => le.some((A) => A.flexgrow && !A.hidden), []),
    ce = $(() => De(), [De, se]),
    me = $(() => {
      let A = s === 'chart' ? le.filter((oe) => oe.id === 'add-task') : le;
      const X = s === 'all' ? r : ye;
      if (!ce) {
        let oe = c,
          pe = !1;
        if (le.some((Me) => Me.$width)) {
          let Me = 0;
          (oe = le.reduce(
            (Ee, Ge) => (
              Ge.hidden || ((Me += Ge.width), (Ee += Ge.$width || Ge.width)), Ee
            ),
            0,
          )),
            Me > oe && oe > X && (pe = !0);
        }
        if (pe || oe < X) {
          let Me = 1;
          return (
            pe || (Me = (X - 50) / (oe - 50 || 1)),
            A.map(
              (Ee) => (
                Ee.id !== 'add-task' &&
                  !Ee.hidden &&
                  (Ee.$width || (Ee.$width = Ee.width),
                  (Ee.width = Ee.$width * Me)),
                Ee
              ),
            )
          );
        }
      }
      return A;
    }, [s, le, ce, c, r, ye]),
    Ce = E(
      (A) => {
        if (!De()) {
          const X = me.reduce(
            (oe, pe) => (
              A && pe.$width && (pe.$width = pe.width),
              oe + (pe.hidden ? 0 : pe.width)
            ),
            0,
          );
          X !== c && u(X);
        }
        xe(!0), xe(!1);
      },
      [De, me, c, u],
    ),
    Ae = E(() => {
      le.filter((X) => X.flexgrow && !X.hidden).length === 1 &&
        le.forEach((X) => {
          X.$width && !X.flexgrow && !X.hidden && (X.width = X.$width);
        });
    }, []),
    J = E(
      (A) => {
        if (!e) {
          const X = bt(A),
            oe = nr(A, 'data-col-id');
          !(oe && le.find((Me) => Me.id == oe))?.editor &&
            X &&
            m.exec('show-editor', { id: X });
        }
      },
      [m, e],
      // cols is defined later; relies on latest value at call time
    ),
    be = $(() => (Array.isArray(k) ? k.map((A) => A.id) : []), [k]),
    we = E(() => {
      if (j.current && he !== null) {
        const A = j.current.querySelector('.wx-body');
        A && (A.style.top = -((x ?? 0) - (B ?? 0)) + 'px');
      }
      ae.current && (ae.current.scrollTop = 0);
    }, [he, x, B]);
  G(() => {
    j.current && we();
  }, [x, B, we]),
    G(() => {
      const A = j.current;
      if (!A) return;
      const X = A.querySelector('.wx-table-box .wx-body');
      if (!X || typeof ResizeObserver > 'u') return;
      const oe = new ResizeObserver(() => {
        we();
      });
      return (
        oe.observe(X),
        () => {
          oe.disconnect();
        }
      );
    }, [me, ne, s, Oe, he, we]),
    G(() => {
      if (!b || !f) return;
      const { id: A } = b,
        X = f.getState().focusCell;
      X &&
        X.row !== A &&
        j.current &&
        j.current.contains(document.activeElement) &&
        f.exec('focus-cell', {
          row: A,
          column: X.column,
        });
    }, [b, f]);
  const de = E(
      ({ id: A }) => {
        if (e) return !1;
        m.getTask(A).open && m.exec('open-task', { id: A, mode: !1 });
        const X = m.getState()._tasks.find((oe) => oe.id === A);
        if ((O(X || null), !X)) return !1;
      },
      [m, e],
    ),
    ze = E(
      ({ id: A, top: X }) => {
        ge.current
          ? He({ ...ge.current, onMove: !1 })
          : m.exec('drag-task', {
              id: A,
              top: X + (B ?? 0),
              inProgress: !1,
            }),
          O(null);
      },
      [m, He, B],
    ),
    Se = E(
      ({ id: A, top: X, detail: oe }) => {
        oe && He({ ...oe, onMove: !0 }),
          m.exec('drag-task', {
            id: A,
            top: X + (B ?? 0),
            inProgress: !0,
          });
      },
      [m, He, B],
    );
  G(() => {
    const A = j.current;
    return A
      ? rc(A, {
          start: de,
          end: ze,
          move: Se,
          getTask: m.getTask,
        }).destroy
      : void 0;
  }, [m, de, ze, Se]);
  const ke = E(
      (A) => {
        const { key: X, isInput: oe } = A;
        if (!oe && (X === 'arrowup' || X === 'arrowdown'))
          return (A.eventSource = 'grid'), m.exec('hotkey', A), !1;
        if (X === 'enter') {
          const pe = f?.getState().focusCell;
          if (pe) {
            const { row: Me, column: Ee } = pe;
            Ee === 'add-task'
              ? K(Me, 'add-task')
              : Ee === 'text' && K(Me, 'open-task');
          }
        }
      },
      [m, K, f],
    ),
    _e = W(null),
    Pe = () => {
      _e.current = {
        setTableAPI: p,
        handleHotkey: ke,
        sortVal: F,
        api: m,
        adjustColumns: Ae,
        setColumnWidth: Ce,
        tasks: V,
        calendarVal: N,
        durationUnitVal: T,
        splitTasksVal: z,
        onTableAPIChange: i,
      };
    };
  Pe(),
    G(() => {
      Pe();
    }, [p, ke, F, m, Ae, Ce, V, N, T, z, i]);
  const We = E((A) => {
    p(A),
      A.intercept('hotkey', (X) => _e.current.handleHotkey(X)),
      A.intercept('scroll', () => !1),
      A.intercept('select-row', () => !1),
      A.intercept('sort-rows', (X) => {
        const oe = _e.current.sortVal,
          { key: pe, add: Me } = X,
          Ee = oe ? oe.find((Ke) => Ke.key === pe) : null;
        let Ge = 'asc';
        return (
          Ee && (Ge = !Ee || Ee.order === 'asc' ? 'desc' : 'asc'),
          m.exec('sort-tasks', {
            key: pe,
            order: Ge,
            add: Me,
          }),
          !1
        );
      }),
      A.on('resize-column', () => {
        _e.current.setColumnWidth(!0);
      }),
      A.on('hide-column', (X) => {
        X.mode || _e.current.adjustColumns(), _e.current.setColumnWidth();
      }),
      A.intercept('update-cell', (X) => {
        const { id: oe, column: pe, value: Me } = X,
          Ee = _e.current.tasks.find((Ge) => Ge.id === oe);
        if (Ee) {
          const Ge = { ...Ee };
          let Ke = Me;
          Ke && !isNaN(Ke) && !(Ke instanceof Date) && (Ke *= 1),
            (Ge[pe] = Ke),
            yo(
              Ge,
              {
                calendar: _e.current.calendarVal,
                durationUnit: _e.current.durationUnitVal,
                splitTasks: _e.current.splitTasksVal,
              },
              pe,
            ),
            m.exec('update-task', {
              id: oe,
              task: Ge,
            });
        }
        return !1;
      }),
      i && i(A);
  }, []);
  return /* @__PURE__ */ g('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${Oe}` },
    ref: ae,
    children: /* @__PURE__ */ g('div', {
      ref: j,
      style: ne,
      className: 'wx-rHj6070p wx-table',
      onClick: ue,
      onDoubleClick: J,
      children: /* @__PURE__ */ g(jc, {
        init: We,
        sizes: {
          rowHeight: y,
          headerHeight: (fe ?? 0) - 1,
        },
        rowStyle: (A) =>
          A.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (A) =>
          `wx-rHj6070p wx-text-${A.align}${A.id === 'add-task' ? ' wx-action' : ''}`,
        data: he,
        columns: me,
        selectedRows: [...be],
        sortMarks: Ie,
      }),
    }),
  });
}
function Jc({ borders: n = '' }) {
  const e = $e(pt),
    t = re(e, 'cellWidth'),
    r = re(e, 'cellHeight'),
    s = W(null),
    [o, i] = U('#e4e4e4');
  G(() => {
    if (typeof getComputedStyle < 'u' && s.current) {
      const a = getComputedStyle(s.current).getPropertyValue(
        '--wx-gantt-border',
      );
      i(a ? a.substring(a.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const l = {
    width: '100%',
    height: '100%',
    background: t != null && r != null ? `url(${la(t, r, o, n)})` : void 0,
    position: 'absolute',
  };
  return /* @__PURE__ */ g('div', { ref: s, style: l });
}
function ed({ onSelectLink: n, selectedLink: e, readonly: t }) {
  const r = $e(pt),
    s = re(r, '_links'),
    o = re(r, 'criticalPath'),
    i = W(null),
    l = E(
      (a) => {
        const d = a?.target?.classList;
        !d?.contains('wx-line') && !d?.contains('wx-delete-button') && n(null);
      },
      [n],
    );
  return (
    G(() => {
      if (!t && e && i.current) {
        const a = (d) => {
          i.current && !i.current.contains(d.target) && l(d);
        };
        return (
          document.addEventListener('click', a),
          () => {
            document.removeEventListener('click', a);
          }
        );
      }
    }, [t, e, l]),
    /* @__PURE__ */ Z('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (s || []).map((a) => {
          const d =
            'wx-dkx3NwEn wx-line' +
            (o && a.$critical ? ' wx-critical' : '') +
            (t ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ g(
            'polyline',
            {
              className: d,
              points: a.$p,
              onClick: () => !t && n(a.id),
              'data-link-id': a.id,
            },
            a.id,
          );
        }),
        !t &&
          e &&
          /* @__PURE__ */ g('polyline', {
            ref: i,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: e.$p,
          }),
      ],
    })
  );
}
function td(n) {
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
      d = 0,
      c = null;
    do {
      const u = l[d];
      d === o &&
        (a > i ? (c = 0) : (c = Math.min((i - a) / u.duration, 1) * 100)),
        (a += u.duration),
        d++;
    } while (c === null && d < l.length);
    return c || 0;
  }
  return /* @__PURE__ */ g('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: e.segments.map((o, i) =>
      /* @__PURE__ */ Z(
        'div',
        {
          className: `wx-segment wx-bar wx-${t} wx-GKbcLEGA`,
          'data-segment': i,
          style: r(i),
          children: [
            e.progress
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ g('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${s(i)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ g('div', {
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
let qn = [],
  Qn = null,
  ks = null;
const nd = (n, e, t, r) => n < r && e > t,
  bs = (n, e) => {
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
  rd = (n, e, t) => {
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
  sd = (n, e, t) => {
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
function od(n) {
  const {
      readonly: e,
      taskTemplate: t,
      multiTaskRows: r = !1,
      rowMapping: s = null,
      rowHeightOverrides: o = null,
      allowTaskIntersection: i = !0,
      summaryBarCounts: l = !1,
      marqueeSelect: a = !1,
      copyPaste: d = !1,
    } = n,
    c = $e(pt),
    [u, f] = bn(c, '_tasks'),
    [p, w] = bn(c, '_links'),
    h = re(c, 'area'),
    m = re(c, '_scales'),
    x = re(c, 'taskTypes'),
    y = re(c, 'baselines'),
    b = re(c, '_selected'),
    k = re(c, '_scrollTask'),
    _ = re(c, 'criticalPath'),
    S = re(c, 'tasks'),
    C = re(c, 'schedule'),
    D = re(c, 'splitTasks'),
    F = re(c, 'summary'),
    N = $(() => {
      if (!h || !Array.isArray(u)) return [];
      const v = h.start ?? 0,
        M = h.end ?? 0;
      return r && s
        ? u.map((P) => ({ ...P }))
        : u.slice(v, M).map((P) => ({ ...P }));
    }, [f, h, r, s]),
    T = re(c, 'cellHeight'),
    z = $(() => {
      if (!r || !s || !N.length) return N;
      const v = /* @__PURE__ */ new Map(),
        M = [];
      u.forEach((ee) => {
        const ie = s.taskRows.get(ee.id) ?? ee.id;
        v.has(ie) || (v.set(ie, M.length), M.push(ie));
      });
      const P = /* @__PURE__ */ new Map();
      N.forEach((ee) => {
        const ie = s.taskRows.get(ee.id) ?? ee.id;
        P.set(ie, (P.get(ie) || 0) + 1);
      });
      const R = /* @__PURE__ */ new Map(),
        H = /* @__PURE__ */ new Map();
      let q = 0;
      for (const ee of M) {
        H.set(ee, q);
        const ie = (o && o[ee]) || T;
        q += ie;
      }
      return N.map((ee) => {
        const ie = s.taskRows.get(ee.id) ?? ee.id,
          ve = H.get(ie) ?? 0,
          Te = P.get(ie) || 1,
          Le = R.get(ie) || 0;
        if ((R.set(ie, Le + 1), Te > 1)) {
          const Fe = (o && o[ie]) || T,
            Ye = Math.floor(Fe / Te);
          return {
            ...ee,
            $y: ve + Le * Ye,
            $h: Ye - 2,
            $y_base: ee.$y_base !== void 0 ? ve + Le * Ye : void 0,
          };
        }
        return {
          ...ee,
          $y: ve,
          $y_base: ee.$y_base !== void 0 ? ve : void 0,
        };
      });
    }, [N, r, s, u, T, o]),
    Y = $(() => m.lengthUnitWidth, [m]),
    O = $(() => m.lengthUnit || 'day', [m]),
    V = $(() => {
      const v = /* @__PURE__ */ new Set();
      if (i || !r || !s) return v;
      const M = /* @__PURE__ */ new Map();
      return (
        u.forEach((P) => {
          if (P.type === 'summary' || P.type === 'milestone') return;
          const R = s.taskRows.get(P.id) ?? P.id;
          M.has(R) || M.set(R, []), M.get(R).push(P);
        }),
        M.forEach((P) => {
          if (!(P.length < 2))
            for (let R = 0; R < P.length; R++)
              for (let H = R + 1; H < P.length; H++) {
                const q = P[R],
                  ee = P[H];
                nd(q.$x, q.$x + q.$w, ee.$x, ee.$x + ee.$w) &&
                  (v.add(q.id), v.add(ee.id));
              }
        }),
        v
      );
    }, [i, r, s, u, f]),
    K = $(() => {
      if (!l || !u?.length || !Y) return null;
      const v = /* @__PURE__ */ new Map(),
        M = /* @__PURE__ */ new Set();
      u.forEach((R) => {
        R.type === 'summary' && M.add(R.id),
          R.parent &&
            R.parent !== 0 &&
            R.type !== 'summary' &&
            (v.has(R.parent) || v.set(R.parent, []), v.get(R.parent).push(R));
      });
      const P = /* @__PURE__ */ new Map();
      return (
        M.forEach((R) => {
          const H = v.get(R);
          if (!H?.length) return;
          const q = /* @__PURE__ */ new Map();
          H.forEach((ee) => {
            if (ee.$x == null || ee.$w == null) return;
            const ie = Math.floor(ee.$x / Y),
              ve = Math.ceil((ee.$x + ee.$w) / Y);
            for (let Te = ie; Te < ve; Te++) q.set(Te, (q.get(Te) || 0) + 1);
          }),
            q.size > 0 && P.set(R, q);
        }),
        P
      );
    }, [l, u, Y]),
    [ue, j] = U(null),
    ae = W(null),
    [ye, L] = U(null),
    [se, xe] = U(null),
    [ge, He] = U(null),
    B = W(null);
  B.current = ge;
  const fe = W(0),
    Q = W(!1),
    [ne, he] = U(void 0),
    [le, Oe] = U(null),
    Ie = W(null),
    [De, ce] = U(null),
    me = $(
      () =>
        De && {
          ...p.find((v) => v.id === De),
        },
      [De, w],
    ),
    [Ce, Ae] = U(void 0),
    J = W(null),
    [be, we] = U(0),
    de = W(null),
    ze = $(() => {
      const v = de.current;
      return !!(b.length && v && v.contains(document.activeElement));
    }, [b, de.current]),
    Se = $(() => ze && b[b.length - 1]?.id, [ze, b]);
  G(() => {
    if (k && ze && k) {
      const { id: v } = k,
        M = de.current?.querySelector(`.wx-bar[data-id='${v}']`);
      M && M.focus({ preventScroll: !0 });
    }
  }, [k]),
    G(() => {
      const v = de.current;
      if (v && (we(v.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const M = new ResizeObserver((P) => {
          P[0] && we(P[0].contentRect.width);
        });
        return M.observe(v), () => M.disconnect();
      }
    }, [de.current]);
  const ke = E(() => {
      document.body.style.userSelect = 'none';
    }, []),
    _e = E(() => {
      document.body.style.userSelect = '';
    }, []),
    Pe = $(() => {
      if (!r || !s || !u?.length) return /* @__PURE__ */ new Map();
      const v = /* @__PURE__ */ new Map(),
        M = /* @__PURE__ */ new Map(),
        P = [];
      return (
        u.forEach((R) => {
          const H = s.taskRows.get(R.id) ?? R.id;
          M.has(H) || (M.set(H, P.length), P.push(H));
        }),
        u.forEach((R) => {
          const H = s.taskRows.get(R.id) ?? R.id,
            q = M.get(H) ?? 0;
          v.set(R.id, q * T);
        }),
        v
      );
    }, [u, r, s, T]),
    We = $(() => {
      if (!r || !s || !u?.length) return /* @__PURE__ */ new Map();
      const v = /* @__PURE__ */ new Map(),
        M = /* @__PURE__ */ new Map(),
        P = [];
      return (
        u.forEach((R) => {
          const H = s.taskRows.get(R.id) ?? R.id;
          M.has(H) || (M.set(H, P.length), P.push(H));
        }),
        u.forEach((R) => {
          const H = R.row ?? R.id;
          if (!v.has(H)) {
            const q = s.taskRows.get(R.id) ?? R.id,
              ee = M.get(q) ?? 0;
            v.set(H, ee * T);
          }
        }),
        v
      );
    }, [u, r, s, T]),
    A = E(
      (v) => {
        if (!de.current) return [];
        const M = Math.min(v.startX, v.currentX),
          P = Math.max(v.startX, v.currentX),
          R = Math.min(v.startY, v.currentY),
          H = Math.max(v.startY, v.currentY);
        return u.filter((q) => {
          const ee = q.$x,
            ie = q.$x + q.$w,
            Te = Pe.get(q.id) ?? q.$y,
            Le = Te + q.$h;
          return ee < P && ie > M && Te < H && Le > R;
        });
      },
      [u, Pe],
    ),
    X = E(() => {
      if (!d) return;
      const v = c.getState()._selected;
      if (!v || !v.length) return;
      const M = 864e5,
        P = v
          .map((ie) => {
            if (!c.getTask(ie.id)) return null;
            const Te = u.find((Yo) => Yo.id === ie.id);
            if (!Te) return null;
            const {
                $x: Le,
                $y: Fe,
                $h: Ye,
                $w: ct,
                $skip: Ue,
                $level: tt,
                ...mt
              } = Te,
              Bt =
                Te.end && Te.start
                  ? Math.round((Te.end.getTime() - Te.start.getTime()) / M)
                  : 0,
              dn = Te.start ? (Te.start.getUTCDay() + 6) % 7 : 0;
            return {
              ...mt,
              _durationDays: Bt,
              _startDayOfWeek: dn,
              _originalWidth: ct,
              _originalHeight: Ye,
            };
          })
          .filter(Boolean);
      if (!P.length) return;
      const H = P[0].parent,
        q = P.filter((ie) => ie.parent === H);
      if (q.length === 0) return;
      const ee = q.reduce(
        (ie, ve) => (ve.start && (!ie || ve.start < ie) ? ve.start : ie),
        null,
      );
      (qn = q.map((ie) => ({
        ...ie,
        _startCellOffset: rd(ie.start, ee, m),
      }))),
        (ks = H),
        (Qn = ee);
    }, [d, c, u, m]),
    oe = E(
      (v, M, P) => {
        if (!M.length || !v || P == null) return;
        const R = 864e5,
          H = c.getHistory();
        H?.startBatch();
        const q = new Date(v);
        q.setUTCHours(0, 0, 0, 0),
          M.forEach((ee, ie) => {
            const ve = `task-${Date.now()}-${ie}`,
              Te = sd(q, ee._startCellOffset || 0, m),
              Le = new Date(Te.getTime() + (ee._startDayOfWeek || 0) * R);
            Le.setUTCHours(0, 0, 0, 0);
            const Fe = new Date(Le.getTime() + (ee._durationDays || 7) * R);
            Fe.setUTCHours(0, 0, 0, 0),
              c.exec('add-task', {
                task: {
                  id: ve,
                  text: ee.text,
                  start: Le,
                  end: Fe,
                  type: ee.type || 'task',
                  parent: P,
                  row: ee.row,
                },
                target: P,
                mode: 'child',
                skipUndo: ie > 0,
              });
          }),
          H?.endBatch();
      },
      [c, m],
    );
  G(
    () =>
      d
        ? c.intercept('hotkey', (M) => {
            if (M.key === 'ctrl+c' || M.key === 'meta+c') return X(), !1;
            if (M.key === 'ctrl+v' || M.key === 'meta+v')
              return (
                !qn.length ||
                  !Qn ||
                  xe({
                    tasks: qn,
                    baseDate: Qn,
                    parent: ks,
                    currentX: fe.current,
                  }),
                !1
              );
          })
        : void 0,
    [d, c, X],
  ),
    G(() => {
      if (!se) return;
      const v = (M) => {
        M.key === 'Escape' &&
          (M.preventDefault(), M.stopPropagation(), xe(null));
      };
      return (
        document.addEventListener('keydown', v, !0),
        () => document.removeEventListener('keydown', v, !0)
      );
    }, [se]);
  const pe = E(
      (v, M, P) => {
        if (
          M.target.classList.contains('wx-line') ||
          (P || (P = c.getTask(kt(v))),
          P.type === 'milestone' || P.type === 'summary')
        )
          return '';
        const R = Xe(M, 'data-segment');
        R && (v = R);
        const { left: H, width: q } = v.getBoundingClientRect(),
          ee = (M.clientX - H) / q;
        let ie = 0.2 / (q > 200 ? q / 200 : 1);
        return ee < ie ? 'start' : ee > 1 - ie ? 'end' : '';
      },
      [c],
    ),
    Me = E(
      (v, M) => {
        const { clientX: P } = M,
          R = kt(v),
          H = c.getTask(R),
          q = M.target.classList;
        if (
          !M.target.closest('.wx-delete-button') &&
          !M.target.closest('[data-interactive]') &&
          !e
        ) {
          if (q.contains('wx-progress-marker')) {
            const { progress: ee } = c.getTask(R);
            (Ie.current = {
              id: R,
              x: P,
              progress: ee,
              dx: 0,
              node: v,
              marker: M.target,
            }),
              M.target.classList.add('wx-progress-in-drag');
          } else {
            const ee = pe(v, M, H) || 'move',
              ie = {
                id: R,
                mode: ee,
                x: P,
                dx: 0,
                l: H.$x,
                w: H.$w,
              };
            if (D && H.segments?.length) {
              const ve = Xe(M, 'data-segment');
              ve && (ie.segmentIndex = ve.dataset.segment * 1);
            }
            Oe(ie);
          }
          ke();
        }
      },
      [c, e, pe, ke, D],
    ),
    Ee = E(
      (v) => {
        if (v.button !== 0 || se) return;
        const M = Xe(v);
        if (!M && a && !e) {
          const P = de.current;
          if (!P) return;
          const R = P.getBoundingClientRect(),
            H = v.clientX - R.left,
            q = v.clientY - R.top;
          if (d) {
            const ie = bs(H, m);
            ie && ((B.current = ie), He(ie));
          }
          const ee = {
            startX: H,
            startY: q,
            currentX: H,
            currentY: q,
            ctrlKey: v.ctrlKey || v.metaKey,
          };
          j(ee), (ae.current = ee), ke();
          return;
        }
        if (M && a && !e && b.length > 1) {
          const P = kt(M);
          if (b.some((H) => H.id === P)) {
            L({
              startX: v.clientX,
              ids: b.map((H) => H.id),
              tasks: b.map((H) => {
                const q = c.getTask(H.id);
                return {
                  id: H.id,
                  start: q.start,
                  end: q.end,
                  $x: q.$x,
                  $w: q.$w,
                };
              }),
            }),
              ke();
            return;
          }
        }
        M && Me(M, v);
      },
      [Me, a, d, e, se, m, b, c, ke],
    ),
    Ge = E(
      (v) => {
        const M = Xe(v);
        M &&
          (J.current = setTimeout(() => {
            Ae(!0), Me(M, v.touches[0]);
          }, 300));
      },
      [Me],
    ),
    Ke = E((v) => {
      ce(v);
    }, []),
    it = E(() => {
      const v = ae.current;
      if (v) {
        const M = A(v);
        v.ctrlKey
          ? M.forEach((P) => {
              c.exec('select-task', { id: P.id, toggle: !0, marquee: !0 });
            })
          : (b.length > 0 && c.exec('select-task', { id: null, marquee: !0 }),
            M.forEach((P, R) => {
              c.exec('select-task', {
                id: P.id,
                toggle: R > 0,
                marquee: !0,
              });
            })),
          j(null),
          (ae.current = null),
          _e(),
          (Q.current = !0);
        return;
      }
      if (ye) {
        const { ids: M, tasks: P, startX: R } = ye;
        L(null), _e(), (Q.current = !0);
        return;
      }
      if (Ie.current) {
        const { dx: M, id: P, marker: R, value: H } = Ie.current;
        (Ie.current = null),
          typeof H < 'u' &&
            M &&
            c.exec('update-task', {
              id: P,
              task: { progress: H },
              inProgress: !1,
            }),
          R.classList.remove('wx-progress-in-drag'),
          (Q.current = !0),
          _e();
      } else if (le) {
        const {
          id: M,
          mode: P,
          dx: R,
          l: H,
          w: q,
          start: ee,
          segment: ie,
          index: ve,
        } = le;
        if ((Oe(null), ee)) {
          const Te = Math.round(R / Y);
          if (!Te)
            c.exec('drag-task', {
              id: M,
              width: q,
              left: H,
              inProgress: !1,
              ...(ie && { segmentIndex: ve }),
            });
          else {
            let Le = {},
              Fe = c.getTask(M);
            ie && (Fe = Fe.segments[ve]);
            const Ye = 1440 * 60 * 1e3,
              Ue =
                Te *
                (O === 'week'
                  ? 7
                  : O === 'month'
                    ? 30
                    : O === 'quarter'
                      ? 91
                      : O === 'year'
                        ? 365
                        : 1) *
                Ye;
            P === 'move'
              ? ((Le.start = new Date(Fe.start.getTime() + Ue)),
                (Le.end = new Date(Fe.end.getTime() + Ue)))
              : P === 'start'
                ? ((Le.start = new Date(Fe.start.getTime() + Ue)),
                  (Le.end = Fe.end))
                : P === 'end' &&
                  ((Le.start = Fe.start),
                  (Le.end = new Date(Fe.end.getTime() + Ue))),
              c.exec('update-task', {
                id: M,
                task: Le,
                ...(ie && { segmentIndex: ve }),
              });
          }
          Q.current = !0;
        }
        _e();
      }
    }, [c, _e, le, Y, O]),
    st = E(
      (v, M) => {
        const { clientX: P } = M;
        if (d && de.current) {
          const R = de.current.getBoundingClientRect();
          fe.current = P - R.left;
        }
        if (se && de.current) {
          const R = de.current.getBoundingClientRect();
          xe((H) => (H ? { ...H, currentX: P - R.left } : null));
        }
        if (ue) {
          const R = de.current;
          if (!R) return;
          const H = R.getBoundingClientRect(),
            q = P - H.left,
            ee = M.clientY - H.top;
          j((ie) => ({
            ...ie,
            currentX: q,
            currentY: ee,
          })),
            ae.current &&
              ((ae.current.currentX = q), (ae.current.currentY = ee));
          return;
        }
        if (!e)
          if (Ie.current) {
            const { node: R, x: H, id: q } = Ie.current,
              ee = (Ie.current.dx = P - H),
              ie = Math.round((ee / R.offsetWidth) * 100);
            let ve = Ie.current.progress + ie;
            (Ie.current.value = ve = Math.min(Math.max(0, ve), 100)),
              c.exec('update-task', {
                id: q,
                task: { progress: ve },
                inProgress: !0,
              });
          } else if (le) {
            Ke(null);
            const {
                mode: R,
                l: H,
                w: q,
                x: ee,
                id: ie,
                start: ve,
                segment: Te,
                index: Le,
              } = le,
              Fe = c.getTask(ie),
              Ye = P - ee,
              ct = Math.round(Y) || 1;
            if (
              (!ve && Math.abs(Ye) < 20) ||
              (R === 'start' && q - Ye < ct) ||
              (R === 'end' && q + Ye < ct) ||
              (R === 'move' &&
                ((Ye < 0 && H + Ye < 0) || (Ye > 0 && H + q + Ye > be))) ||
              le.segment
            )
              return;
            const Ue = { ...le, dx: Ye };
            let tt, mt;
            if (
              (R === 'start'
                ? ((tt = H + Ye), (mt = q - Ye))
                : R === 'end'
                  ? ((tt = H), (mt = q + Ye))
                  : R === 'move' && ((tt = H + Ye), (mt = q)),
              c.exec('drag-task', {
                id: ie,
                width: mt,
                left: tt,
                inProgress: !0,
                start: ve,
                ...(Te && { segmentIndex: Le }),
              }),
              !Ue.start &&
                ((R === 'move' && Fe.$x == H) || (R !== 'move' && Fe.$w == q)))
            ) {
              (Q.current = !0), it();
              return;
            }
            (Ue.start = !0), Oe(Ue);
          } else {
            const R = Xe(v);
            if (R) {
              const H = c.getTask(kt(R)),
                ee = Xe(v, 'data-segment') || R,
                ie = pe(ee, M, H);
              ee.style.cursor = ie && !e ? 'col-resize' : 'pointer';
            }
          }
      },
      [c, e, le, Y, be, pe, Ke, it],
    ),
    zn = E(
      (v) => {
        st(v, v);
      },
      [st],
    ),
    Dt = E(
      (v) => {
        Ce
          ? (v.preventDefault(), st(v, v.touches[0]))
          : J.current && (clearTimeout(J.current), (J.current = null));
      },
      [Ce, st],
    ),
    Yt = E(() => {
      it();
    }, [it]),
    On = E(() => {
      Ae(null),
        J.current && (clearTimeout(J.current), (J.current = null)),
        it();
    }, [it]);
  G(
    () => (
      window.addEventListener('mouseup', Yt),
      () => {
        window.removeEventListener('mouseup', Yt);
      }
    ),
    [Yt],
  );
  const Wn = E(
      (v) => {
        if (!e) {
          if (v.target.closest('[data-interactive]')) return;
          const M = bt(v.target);
          if (M && !v.target.classList.contains('wx-link')) {
            const P = bt(v.target, 'data-segment');
            c.exec('show-editor', {
              id: M,
              ...(P !== null && { segmentIndex: P }),
            });
          }
        }
      },
      [c, e],
    ),
    Fn = ['e2s', 's2s', 'e2e', 's2e'],
    Et = E((v, M) => Fn[(v ? 1 : 0) + (M ? 0 : 2)], []),
    xt = E(
      (v, M) => {
        const P = ne.id,
          R = ne.start;
        return v === P
          ? !0
          : !!p.find(
              (H) => H.target == v && H.source == P && H.type === Et(R, M),
            );
      },
      [ne, w, Et],
    ),
    on = E(() => {
      ne && he(null);
    }, [ne]),
    gt = E(
      (v) => {
        if (Q.current) {
          Q.current = !1;
          return;
        }
        if (se && se.currentX != null) {
          const P = bs(se.currentX, m);
          P && oe(P, se.tasks, se.parent), xe(null);
          return;
        }
        if (v.target.closest('[data-interactive]')) return;
        const M = bt(v.target);
        if (M) {
          const P = v.target.classList;
          if (P.contains('wx-link')) {
            const R = P.contains('wx-left');
            if (!ne) {
              he({ id: M, start: R });
              return;
            }
            ne.id !== M &&
              !xt(M, R) &&
              c.exec('add-link', {
                link: {
                  source: ne.id,
                  target: M,
                  type: Et(ne.start, R),
                },
              });
          } else if (P.contains('wx-delete-button-icon'))
            c.exec('delete-link', { id: De }), ce(null);
          else {
            let R;
            const H = Xe(v, 'data-segment');
            H && (R = H.dataset.segment * 1),
              c.exec('select-task', {
                id: M,
                toggle: v.ctrlKey || v.metaKey,
                range: v.shiftKey,
                segmentIndex: R,
              });
          }
        }
        on();
      },
      [c, ne, w, me, xt, Et, on],
    ),
    Gt = E(
      (v) => ({
        left: `${v.$x}px`,
        top: `${v.$y}px`,
        width: `${v.$w}px`,
        height: `${v.$h}px`,
      }),
      [],
    ),
    ln = E(
      (v) => ({
        left: `${v.$x_base}px`,
        top: `${v.$y_base}px`,
        width: `${v.$w_base}px`,
        height: `${v.$h_base}px`,
      }),
      [],
    ),
    an = E(
      (v) => {
        if (Ce || J.current) return v.preventDefault(), !1;
      },
      [Ce],
    ),
    yt = $(() => x.map((v) => v.id), [x]),
    Vt = E(
      (v) => {
        let M = yt.includes(v) ? v : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(v) || (M = `task ${M}`), M
        );
      },
      [yt],
    ),
    cn = E(
      (v) => {
        c.exec(v.action, v.data);
      },
      [c],
    ),
    I = E((v) => _ && S.byId(v).$critical, [_, S]),
    te = E(
      (v) => {
        if (C?.auto) {
          const M = S.getSummaryId(v, !0),
            P = S.getSummaryId(ne.id, !0);
          return (
            ne?.id &&
            !(Array.isArray(M) ? M : [M]).includes(ne.id) &&
            !(Array.isArray(P) ? P : [P]).includes(v)
          );
        }
        return ne;
      },
      [C, S, ne],
    );
  return /* @__PURE__ */ Z('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${z.length ? z[0].$h : 0}px` },
    ref: de,
    onContextMenu: an,
    onMouseDown: Ee,
    onMouseMove: zn,
    onTouchStart: Ge,
    onTouchMove: Dt,
    onTouchEnd: On,
    onClick: gt,
    onDoubleClick: Wn,
    onDragStart: (v) => (v.preventDefault(), !1),
    children: [
      /* @__PURE__ */ g(ed, {
        onSelectLink: Ke,
        selectedLink: me,
        readonly: e,
      }),
      z.map((v) => {
        if (v.$skip && v.$skip_baseline) return null;
        const M = V.has(v.id),
          P =
            `wx-bar wx-${Vt(v.type)}` +
            (Ce && le && v.id === le.id ? ' wx-touch' : '') +
            (ne && ne.id === v.id ? ' wx-selected' : '') +
            (I(v.id) ? ' wx-critical' : '') +
            (v.$reorder ? ' wx-reorder-task' : '') +
            (D && v.segments ? ' wx-split' : '') +
            (M ? ' wx-collision' : ''),
          R =
            'wx-link wx-left' +
            (ne ? ' wx-visible' : '') +
            (!ne || (!xt(v.id, !0) && te(v.id)) ? ' wx-target' : '') +
            (ne && ne.id === v.id && ne.start ? ' wx-selected' : '') +
            (I(v.id) ? ' wx-critical' : ''),
          H =
            'wx-link wx-right' +
            (ne ? ' wx-visible' : '') +
            (!ne || (!xt(v.id, !1) && te(v.id)) ? ' wx-target' : '') +
            (ne && ne.id === v.id && !ne.start ? ' wx-selected' : '') +
            (I(v.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ Z(
          _s,
          {
            children: [
              !v.$skip &&
                /* @__PURE__ */ Z('div', {
                  className: 'wx-GKbcLEGA ' + P,
                  style: Gt(v),
                  'data-tooltip-id': v.id,
                  'data-id': v.id,
                  tabIndex: Se === v.id ? 0 : -1,
                  children: [
                    e
                      ? null
                      : v.id === me?.target && me?.type[2] === 's'
                        ? /* @__PURE__ */ g(ut, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ g('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ g('div', {
                            className: 'wx-GKbcLEGA ' + R,
                            children: /* @__PURE__ */ g('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    v.type !== 'milestone'
                      ? /* @__PURE__ */ Z(Re, {
                          children: [
                            v.progress && !(D && v.segments)
                              ? /* @__PURE__ */ g('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ g('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${v.progress}%` },
                                  }),
                                })
                              : null,
                            !e &&
                            !(D && v.segments) &&
                            !(v.type == 'summary' && F?.autoProgress)
                              ? /* @__PURE__ */ g('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${v.progress}% - 10px)`,
                                  },
                                  children: v.progress,
                                })
                              : null,
                            t
                              ? /* @__PURE__ */ g('div', {
                                  className: 'wx-GKbcLEGA wx-content',
                                  children: /* @__PURE__ */ g(t, {
                                    data: v,
                                    api: c,
                                    onAction: cn,
                                  }),
                                })
                              : D && v.segments
                                ? /* @__PURE__ */ g(td, {
                                    task: v,
                                    type: Vt(v.type),
                                  })
                                : /* @__PURE__ */ g('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: v.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ Z(Re, {
                          children: [
                            /* @__PURE__ */ g('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            t
                              ? /* @__PURE__ */ g(t, {
                                  data: v,
                                  api: c,
                                  onAction: cn,
                                })
                              : /* @__PURE__ */ g('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: v.text,
                                }),
                          ],
                        }),
                    e
                      ? null
                      : v.id === me?.target && me?.type[2] === 'e'
                        ? /* @__PURE__ */ g(ut, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ g('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ g('div', {
                            className: 'wx-GKbcLEGA ' + H,
                            children: /* @__PURE__ */ g('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    M &&
                      /* @__PURE__ */ g('div', {
                        className: 'wx-GKbcLEGA wx-collision-warning',
                        title:
                          'This task overlaps with another task in the same row',
                        children: '!',
                      }),
                    K &&
                      v.type === 'summary' &&
                      (() => {
                        const q = K.get(v.id),
                          ee = Math.floor(v.$x / Y),
                          ie = Math.ceil((v.$x + v.$w) / Y);
                        return /* @__PURE__ */ g('div', {
                          className: 'wx-GKbcLEGA wx-summary-week-counts',
                          children: Array.from(
                            { length: ie - ee },
                            (ve, Te) => {
                              const Le = ee + Te,
                                Fe = q?.get(Le) || 0;
                              return /* @__PURE__ */ g(
                                'span',
                                {
                                  className: `wx-GKbcLEGA wx-week-count${Fe === 0 ? ' wx-week-count-zero' : ''}`,
                                  style: {
                                    position: 'absolute',
                                    left: `${Le * Y - v.$x}px`,
                                    width: `${Y}px`,
                                    top: 0,
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  },
                                  children: Fe,
                                },
                                Le,
                              );
                            },
                          ),
                        });
                      })(),
                  ],
                }),
              y && !v.$skip_baseline
                ? /* @__PURE__ */ g('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (v.type === 'milestone' ? ' wx-milestone' : ''),
                    style: ln(v),
                  })
                : null,
            ],
          },
          v.id,
        );
      }),
      ue &&
        (() => {
          const v = Math.min(ue.startX, ue.currentX),
            M = Math.min(ue.startY, ue.currentY),
            P = Math.abs(ue.currentX - ue.startX),
            R = Math.abs(ue.currentY - ue.startY);
          return /* @__PURE__ */ g('div', {
            className: 'wx-GKbcLEGA wx-marquee-selection',
            style: {
              left: `${v}px`,
              top: `${M}px`,
              width: `${P}px`,
              height: `${R}px`,
            },
          });
        })(),
      se &&
        se.currentX != null &&
        se.tasks.map((v, M) => {
          const R =
              (Math.floor(se.currentX / Y) + (v._startCellOffset || 0)) * Y,
            H = v._originalWidth || Y,
            q = v._originalHeight || T,
            ee = We.get(v.row) ?? (v.$y || 0);
          return /* @__PURE__ */ g(
            'div',
            {
              className: 'wx-GKbcLEGA wx-bar wx-task wx-paste-preview',
              style: { left: R, top: ee, width: H, height: q },
              children: /* @__PURE__ */ g('div', {
                className: 'wx-GKbcLEGA wx-content',
                children: v.$barText || v.text,
              }),
            },
            `preview-${M}`,
          );
        }),
    ],
  });
}
function id(n) {
  const { highlightTime: e, onScaleClick: t } = n,
    r = $e(pt),
    s = re(r, '_scales');
  return /* @__PURE__ */ g('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: s.width },
    children: (s?.rows || []).map((o, i) =>
      /* @__PURE__ */ g(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${o.height}px` },
          children: (o.cells || []).map((l, a) => {
            const d = e ? e(l.date, l.unit) : '',
              c = 'wx-cell ' + (l.css || '') + ' ' + (d || '');
            return /* @__PURE__ */ g(
              'div',
              {
                className: 'wx-ZkvhDKir ' + c,
                style: {
                  width: `${l.width}px`,
                  cursor: t ? 'pointer' : void 0,
                },
                onClick: t ? (u) => t(l.date, l.unit, u.nativeEvent) : void 0,
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
const ld = /* @__PURE__ */ new Map();
function ad(n) {
  const e = W(null),
    t = W(0),
    r = W(null),
    s = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()),
    t.current++,
    G(() => {
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
            ld.set(n, o),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: o }),
              );
          })),
          () => cancelAnimationFrame(r.current)
        );
    });
}
function cd(n) {
  const {
      readonly: e,
      fullWidth: t,
      fullHeight: r,
      taskTemplate: s,
      cellBorders: o,
      highlightTime: i,
      onScaleClick: l,
      multiTaskRows: a = !1,
      rowMapping: d = null,
      rowHeightOverrides: c = null,
      allowTaskIntersection: u = !0,
      summaryBarCounts: f = !1,
      marqueeSelect: p = !1,
      copyPaste: w = !1,
    } = n,
    h = $e(pt),
    [m, x] = bn(h, '_selected'),
    y = re(h, 'scrollTop'),
    b = re(h, 'cellHeight'),
    k = re(h, 'cellWidth'),
    _ = re(h, '_scales'),
    S = re(h, '_markers'),
    C = re(h, '_scrollTask'),
    D = re(h, 'zoom'),
    [F, N] = U(),
    T = W(null),
    z = re(h, '_tasks'),
    Y = 1 + (_?.rows?.length || 0),
    O = $(() => {
      if (!a || !d || !z?.length) return null;
      const B = /* @__PURE__ */ new Map(),
        fe = /* @__PURE__ */ new Map(),
        Q = [];
      return (
        z.forEach((ne) => {
          const he = d.taskRows.get(ne.id) ?? ne.id;
          fe.has(he) || (fe.set(he, Q.length), Q.push(he));
        }),
        z.forEach((ne) => {
          const he = d.taskRows.get(ne.id) ?? ne.id,
            le = fe.get(he) ?? 0;
          B.set(ne.id, le * b);
        }),
        B
      );
    }, [z, a, d, b]),
    V = $(() => {
      const B = [];
      return (
        m &&
          m.length &&
          b &&
          m.forEach((fe) => {
            const Q = O?.get(fe.id) ?? fe.$y;
            B.push({ height: `${b}px`, top: `${Q - 3}px` });
          }),
        B
      );
    }, [x, b, O]),
    K = $(() => Math.max(F || 0, r), [F, r]);
  G(() => {
    const B = T.current;
    B && typeof y == 'number' && (B.scrollTop = y);
  }, [y]);
  const ue = () => {
    j();
  };
  function j(B) {
    const fe = T.current;
    if (!fe) return;
    const Q = {};
    (Q.left = fe.scrollLeft), h.exec('scroll-chart', Q);
  }
  function ae() {
    const B = T.current,
      Q = Math.ceil((F || 0) / (b || 1)) + 1,
      ne = Math.floor(((B && B.scrollTop) || 0) / (b || 1)),
      he = Math.max(0, ne - Y),
      le = ne + Q + Y,
      Oe = he * (b || 0);
    h.exec('render-data', {
      start: he,
      end: le,
      from: Oe,
    });
  }
  G(() => {
    ae();
  }, [F, y]);
  const ye = E(
    (B) => {
      if (!B) return;
      const { id: fe, mode: Q } = B;
      if (Q.toString().indexOf('x') < 0) return;
      const ne = T.current;
      if (!ne) return;
      const { clientWidth: he } = ne,
        le = h.getTask(fe);
      if (le.$x + le.$w < ne.scrollLeft)
        h.exec('scroll-chart', { left: le.$x - (k || 0) }),
          (ne.scrollLeft = le.$x - (k || 0));
      else if (le.$x >= he + ne.scrollLeft) {
        const Oe = he < le.$w ? k || 0 : le.$w;
        h.exec('scroll-chart', { left: le.$x - he + Oe }),
          (ne.scrollLeft = le.$x - he + Oe);
      }
    },
    [h, k],
  );
  G(() => {
    ye(C);
  }, [C]);
  function L(B) {
    if (D && (B.ctrlKey || B.metaKey)) {
      B.preventDefault();
      const fe = T.current,
        Q = -Math.sign(B.deltaY),
        ne = B.clientX - (fe ? fe.getBoundingClientRect().left : 0);
      h.exec('zoom-scale', {
        dir: Q,
        offset: ne,
      });
    }
  }
  function se(B) {
    const fe = i(B.date, B.unit);
    return fe
      ? {
          css: fe,
          width: B.width,
        }
      : null;
  }
  const xe = $(
      () =>
        _ && (_.minUnit === 'hour' || _.minUnit === 'day') && i
          ? _.rows[_.rows.length - 1].cells.map(se)
          : null,
      [_, i],
    ),
    ge = E(
      (B) => {
        (B.eventSource = 'chart'), h.exec('hotkey', B);
      },
      [h],
    );
  G(() => {
    const B = T.current;
    if (!B) return;
    const fe = () => N(B.clientHeight);
    fe();
    const Q = new ResizeObserver(() => fe());
    return (
      Q.observe(B),
      () => {
        Q.disconnect();
      }
    );
  }, [T.current]);
  const He = W(null);
  return (
    G(() => {
      const B = T.current;
      if (B && !He.current)
        return (
          (He.current = Er(B, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (fe) => ge(fe),
          })),
          () => {
            He.current?.destroy(), (He.current = null);
          }
        );
    }, []),
    G(() => {
      const B = T.current;
      if (!B) return;
      const fe = L;
      return (
        B.addEventListener('wheel', fe),
        () => {
          B.removeEventListener('wheel', fe);
        }
      );
    }, [L]),
    ad('chart'),
    /* @__PURE__ */ Z('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: T,
      onScroll: ue,
      children: [
        /* @__PURE__ */ g(id, { highlightTime: i, onScaleClick: l, scales: _ }),
        S && S.length
          ? /* @__PURE__ */ g('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${K}px` },
              children: S.map((B, fe) =>
                /* @__PURE__ */ g(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${B.css || ''}`,
                    style: { left: `${B.left}px` },
                    children: /* @__PURE__ */ g('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: B.text,
                    }),
                  },
                  fe,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ Z('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${t}px`, height: `${K}px` },
          children: [
            xe
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: xe.map((B, fe) =>
                    B
                      ? /* @__PURE__ */ g(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + B.css,
                            style: {
                              width: `${B.width}px`,
                              left: `${fe * B.width}px`,
                            },
                          },
                          fe,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ g(Jc, { borders: o }),
            m && m.length
              ? m.map((B, fe) =>
                  B.$y
                    ? /* @__PURE__ */ g(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': B.id,
                          style: V[fe],
                        },
                        B.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ g(od, {
              readonly: e,
              taskTemplate: s,
              multiTaskRows: a,
              rowMapping: d,
              rowHeightOverrides: c,
              allowTaskIntersection: u,
              summaryBarCounts: f,
              marqueeSelect: p,
              copyPaste: w,
            }),
          ],
        }),
      ],
    })
  );
}
function dd(n) {
  const {
      position: e = 'after',
      size: t = 4,
      dir: r = 'x',
      onMove: s,
      onDisplayChange: o,
      compactMode: i,
      containerWidth: l = 0,
      leftThreshold: a = 50,
      rightThreshold: d = 50,
    } = n,
    [c, u] = Ve(n.value ?? 0),
    [f, p] = Ve(n.display ?? 'all');
  function w(j) {
    let ae = 0;
    e == 'center' ? (ae = t / 2) : e == 'before' && (ae = t);
    const ye = {
      size: [t + 'px', 'auto'],
      p: [j - ae + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (r != 'x') for (let L in ye) ye[L] = ye[L].reverse();
    return ye;
  }
  const [h, m] = U(!1),
    [x, y] = U(null),
    b = W(0),
    k = W(),
    _ = W(),
    S = W(f);
  G(() => {
    S.current = f;
  }, [f]),
    G(() => {
      x === null && c > 0 && y(c);
    }, [x, c]);
  function C(j) {
    return r == 'x' ? j.clientX : j.clientY;
  }
  const D = E(
      (j) => {
        const ae = k.current + C(j) - b.current;
        u(ae);
        let ye;
        ae <= a ? (ye = 'chart') : l - ae <= d ? (ye = 'grid') : (ye = 'all'),
          S.current !== ye && (p(ye), (S.current = ye)),
          _.current && clearTimeout(_.current),
          (_.current = setTimeout(() => s && s(ae), 100));
      },
      [l, a, d, s],
    ),
    F = E(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        m(!1),
        window.removeEventListener('mousemove', D),
        window.removeEventListener('mouseup', F);
    }, [D]),
    N = $(
      () => (f !== 'all' ? 'auto' : r == 'x' ? 'ew-resize' : 'ns-resize'),
      [f, r],
    ),
    T = E(
      (j) => {
        (!i && (f === 'grid' || f === 'chart')) ||
          ((b.current = C(j)),
          (k.current = c),
          m(!0),
          (document.body.style.cursor = N),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', D),
          window.addEventListener('mouseup', F));
      },
      [N, D, F, c, i, f],
    );
  function z() {
    p('all'), x !== null && (u(x), s && s(x));
  }
  function Y(j) {
    if (i) {
      const ae = f === 'chart' ? 'grid' : 'chart';
      p(ae), o(ae);
    } else if (f === 'grid' || f === 'chart') z(), o('all');
    else {
      const ae = j === 'left' ? 'chart' : 'grid';
      p(ae), o(ae);
    }
  }
  function O() {
    Y('left');
  }
  function V() {
    Y('right');
  }
  const K = $(() => w(c), [c, e, t, r]),
    ue = [
      'wx-resizer',
      `wx-resizer-${r}`,
      `wx-resizer-display-${f}`,
      h ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Z('div', {
    className: 'wx-pFykzMlT ' + ue,
    onMouseDown: T,
    style: { width: K.size[0], height: K.size[1], cursor: N },
    children: [
      /* @__PURE__ */ Z('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ g('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ g('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: O,
            }),
          }),
          /* @__PURE__ */ g('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ g('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: V,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ g('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const ud = 650;
function Wo(n) {
  let e;
  function t() {
    (e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= ud;
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
function fd(n) {
  const {
      taskTemplate: e,
      readonly: t,
      cellBorders: r,
      highlightTime: s,
      onScaleClick: o,
      onTableAPIChange: i,
      multiTaskRows: l = !1,
      rowMapping: a = null,
      rowHeightOverrides: d = null,
      allowTaskIntersection: c = !0,
      summaryBarCounts: u = !1,
      marqueeSelect: f = !1,
      copyPaste: p = !1,
    } = n,
    w = $e(pt),
    h = re(w, '_tasks'),
    m = re(w, '_scales'),
    x = re(w, 'cellHeight'),
    y = re(w, 'columns'),
    b = re(w, '_scrollTask'),
    k = re(w, 'undo'),
    _ = $(() => {
      if (!l) return a;
      const ce = /* @__PURE__ */ new Map(),
        me = /* @__PURE__ */ new Map();
      return (
        h.forEach((Ce) => {
          const Ae = Ce.row ?? Ce.id;
          me.set(Ce.id, Ae),
            ce.has(Ae) || ce.set(Ae, []),
            ce.get(Ae).push(Ce.id);
        }),
        { rowMap: ce, taskRows: me }
      );
    }, [h, l, a]),
    [S, C] = U(!1);
  let [D, F] = U(0);
  const [N, T] = U(0),
    [z, Y] = U(0),
    [O, V] = U(void 0),
    [K, ue] = U('all'),
    j = W(null),
    ae = E(
      (ce) => {
        C(
          (me) => (
            ce !== me &&
              (ce
                ? ((j.current = K), K === 'all' && ue('grid'))
                : (!j.current || j.current === 'all') && ue('all')),
            ce
          ),
        );
      },
      [K],
    );
  G(() => {
    const ce = Wo(ae);
    return (
      ce.observe(),
      () => {
        ce.disconnect();
      }
    );
  }, [ae]);
  const ye = $(() => {
    let ce;
    return (
      y.every((me) => me.width && !me.flexgrow)
        ? (ce = y.reduce((me, Ce) => me + parseInt(Ce.width), 0))
        : S && K === 'chart'
          ? (ce = parseInt(y.find((me) => me.id === 'action')?.width) || 50)
          : (ce = 440),
      (D = ce),
      ce
    );
  }, [y, S, K]);
  G(() => {
    F(ye);
  }, [ye]);
  const L = $(() => (N ?? 0) - (O ?? 0), [N, O]),
    se = $(() => m.width, [m]),
    xe = $(() => {
      if (!l || !_) return h.length * x;
      const ce = [];
      h.forEach((Ce) => {
        const Ae = _.taskRows.get(Ce.id) ?? Ce.id;
        ce.includes(Ae) || ce.push(Ae);
      });
      let me = 0;
      for (const Ce of ce) me += (d && d[Ce]) || x;
      return me;
    }, [h, x, l, _, d]),
    ge = $(() => m.height + xe + L, [m, xe, L]),
    He = $(() => D + se, [D, se]),
    B = W(null),
    fe = E(() => {
      Promise.resolve().then(() => {
        if ((N ?? 0) > (He ?? 0)) {
          const ce = (N ?? 0) - D;
          w.exec('expand-scale', { minWidth: ce });
        }
      });
    }, [N, He, D, w]);
  G(() => {
    let ce;
    return (
      B.current && ((ce = new ResizeObserver(fe)), ce.observe(B.current)),
      () => {
        ce && ce.disconnect();
      }
    );
  }, [B.current, fe]),
    G(() => {
      fe();
    }, [se]);
  const Q = W(null),
    ne = W(null),
    he = E(() => {
      const ce = Q.current;
      ce &&
        w.exec('scroll-chart', {
          top: ce.scrollTop,
        });
    }, [w]),
    le = W({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  G(() => {
    le.current = {
      rTasks: h,
      rScales: m,
      rCellHeight: x,
      scrollSize: L,
      ganttDiv: Q.current,
      ganttHeight: z ?? 0,
    };
  }, [h, m, x, L, z]);
  const Oe = E(
    (ce) => {
      if (!ce) return;
      const {
        rTasks: me,
        rScales: Ce,
        rCellHeight: Ae,
        scrollSize: J,
        ganttDiv: be,
        ganttHeight: we,
      } = le.current;
      if (!be) return;
      const { id: de } = ce,
        ze = me.findIndex((Se) => Se.id === de);
      if (ze > -1) {
        const Se = we - Ce.height,
          ke = ze * Ae,
          _e = be.scrollTop;
        let Pe = null;
        ke < _e ? (Pe = ke) : ke + Ae > _e + Se && (Pe = ke - Se + Ae + J),
          Pe !== null &&
            (w.exec('scroll-chart', { top: Math.max(Pe, 0) }),
            (Q.current.scrollTop = Math.max(Pe, 0)));
      }
    },
    [w],
  );
  G(() => {
    Oe(b);
  }, [b]),
    G(() => {
      const ce = Q.current,
        me = ne.current;
      if (!ce || !me) return;
      const Ce = () => {
          Bo(() => {
            Y(ce.offsetHeight), T(ce.offsetWidth), V(me.offsetWidth);
          });
        },
        Ae = new ResizeObserver(Ce);
      return Ae.observe(ce), () => Ae.disconnect();
    }, [Q.current]);
  const Ie = W(null),
    De = W(null);
  return (
    G(() => {
      De.current && (De.current.destroy(), (De.current = null));
      const ce = Ie.current;
      if (ce)
        return (
          (De.current = Er(ce, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': k,
              'ctrl+y': k,
            },
            exec: (me) => {
              me.isInput || w.exec('hotkey', me);
            },
          })),
          () => {
            De.current?.destroy(), (De.current = null);
          }
        );
    }, [k]),
    /* @__PURE__ */ g('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: Q,
      onScroll: he,
      children: /* @__PURE__ */ g('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: ge, width: '100%' },
        ref: ne,
        children: /* @__PURE__ */ g('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: z,
            width: O,
          },
          children: /* @__PURE__ */ Z('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: Ie,
            children: [
              y.length
                ? /* @__PURE__ */ Z(Re, {
                    children: [
                      /* @__PURE__ */ g(Zc, {
                        display: K,
                        compactMode: S,
                        columnWidth: ye,
                        width: D,
                        readonly: t,
                        fullHeight: xe,
                        onTableAPIChange: i,
                        multiTaskRows: l,
                        rowMapping: _,
                        rowHeightOverrides: d,
                      }),
                      /* @__PURE__ */ g(dd, {
                        value: D,
                        display: K,
                        compactMode: S,
                        containerWidth: N,
                        onMove: (ce) => F(ce),
                        onDisplayChange: (ce) => ue(ce),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ g('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: B,
                children: /* @__PURE__ */ g(cd, {
                  readonly: t,
                  fullWidth: se,
                  fullHeight: xe,
                  taskTemplate: e,
                  cellBorders: r,
                  highlightTime: s,
                  onScaleClick: o,
                  multiTaskRows: l,
                  rowMapping: _,
                  rowHeightOverrides: d,
                  allowTaskIntersection: c,
                  summaryBarCounts: u,
                  marqueeSelect: f,
                  copyPaste: p,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function hd(n) {
  return {
    year: '%Y',
    quarter: `${n('Q')} %Q`,
    month: '%M',
    week: `${n('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function pd(n, e) {
  return typeof n == 'function' ? n : dt(n, e);
}
function Fo(n, e) {
  return n.map(({ format: t, ...r }) => ({
    ...r,
    format: pd(t, e),
  }));
}
function gd(n, e) {
  const t = hd(e);
  for (let r in t) t[r] = dt(t[r], n);
  return t;
}
function md(n, e) {
  if (!n || !n.length) return n;
  const t = dt('%d-%m-%Y', e);
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
function wd(n, e) {
  return n.levels
    ? {
        ...n,
        levels: n.levels.map((t) => ({
          ...t,
          scales: Fo(t.scales, e),
        })),
      }
    : n;
}
const xd = (n) =>
    n
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  yd = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  vd = Nt(function (
    {
      taskTemplate: e = null,
      markers: t = [],
      taskTypes: r = Ln,
      tasks: s = [],
      selected: o = [],
      activeTask: i = null,
      links: l = [],
      scales: a = yd,
      columns: d = wo,
      start: c = null,
      end: u = null,
      lengthUnit: f = 'day',
      durationUnit: p = 'day',
      cellWidth: w = 100,
      cellHeight: h = 38,
      scaleHeight: m = 36,
      readonly: x = !1,
      cellBorders: y = 'full',
      zoom: b = !1,
      baselines: k = !1,
      highlightTime: _ = null,
      onScaleClick: S = null,
      init: C = null,
      autoScale: D = !0,
      unscheduledTasks: F = !1,
      criticalPath: N = null,
      schedule: T = { type: 'forward' },
      projectStart: z = null,
      projectEnd: Y = null,
      calendar: O = null,
      undo: V = !1,
      splitTasks: K = !1,
      multiTaskRows: ue = !1,
      rowHeightOverrides: j = null,
      allowTaskIntersection: ae = !0,
      summaryBarCounts: ye = !1,
      marqueeSelect: L = !1,
      copyPaste: se = !1,
      summary: xe = null,
      _export: ge = !1,
      ...He
    },
    B,
  ) {
    const fe = W();
    fe.current = He;
    const Q = $(() => new ia(Is), []),
      ne = $(() => ({ ...en, ...Rn }), []),
      he = $e(qe.i18n),
      le = $(() => (he ? he.extend(ne, !0) : Mt(ne)), [he, ne]),
      Oe = $(() => le.getRaw().calendar, [le]),
      Ie = $(() => {
        let Se = {
          zoom: wd(b, Oe),
          scales: Fo(a, Oe),
          columns: md(d, Oe),
          links: go(l),
          cellWidth: w,
        };
        return (
          Se.zoom &&
            (Se = {
              ...Se,
              ...Kl(Se.zoom, gd(Oe, le.getGroup('gantt')), Se.scales, w),
            }),
          Se
        );
      }, [b, a, d, l, w, Oe, le]),
      De = W(null);
    De.current !== s &&
      (ge || ur(s, { durationUnit: p, calendar: O }), (De.current = s)),
      G(() => {
        ge || ur(s, { durationUnit: p, calendar: O });
      }, [s, p, O, K, ge]);
    const ce = $(() => {
        if (!ue) return null;
        const Se = /* @__PURE__ */ new Map(),
          ke = /* @__PURE__ */ new Map(),
          _e = (Pe) => {
            Pe.forEach((We) => {
              const A = We.row ?? We.id;
              ke.set(We.id, A),
                Se.has(A) || Se.set(A, []),
                Se.get(A).push(We.id),
                We.data && We.data.length > 0 && _e(We.data);
            });
          };
        return _e(s), { rowMap: Se, taskRows: ke };
      }, [s, ue]),
      me = $(() => Q.in, [Q]),
      Ce = W(null);
    Ce.current === null &&
      ((Ce.current = new Os((Se, ke) => {
        const _e = 'on' + xd(Se);
        fe.current && fe.current[_e] && fe.current[_e](ke);
      })),
      me.setNext(Ce.current));
    const [Ae, J] = U(null),
      be = W(null);
    be.current = Ae;
    const we = $(
      () => ({
        getState: Q.getState.bind(Q),
        getReactiveState: Q.getReactive.bind(Q),
        getStores: () => ({ data: Q }),
        exec: me.exec.bind(me),
        setNext: (Se) => ((Ce.current = Ce.current.setNext(Se)), Ce.current),
        intercept: me.intercept.bind(me),
        on: me.on.bind(me),
        detach: me.detach.bind(me),
        getTask: Q.getTask.bind(Q),
        serialize: () => Q.serialize(),
        getTable: (Se) =>
          Se
            ? new Promise((ke) => setTimeout(() => ke(be.current), 1))
            : be.current,
        getHistory: () => Q.getHistory(),
      }),
      [Q, me],
    );
    G(() => {
      const Se = () => {
        const { zoom: ke, scales: _e } = we.getState(),
          We = ke?.levels?.[ke.level]?.scales?.[0]?.unit ?? _e?.[0]?.unit;
        We && we.exec('scale-change', { level: ke?.level, unit: We });
      };
      we.on('zoom-scale', Se), we.on('set-scale', Se);
    }, [we]),
      G(() => {
        we.intercept('set-scale', ({ unit: Se, date: ke }) => {
          const { zoom: _e } = we.getState();
          if (!_e || !_e.levels) return !1;
          const Pe = _e.levels.findIndex((X) =>
            X.scales.some((oe) => oe.unit === Se),
          );
          if (Pe < 0) return !1;
          const We = _e.levels[Pe];
          if (Pe !== _e.level) {
            const X = Math.round((We.minCellWidth + We.maxCellWidth) / 2);
            we.getStores().data.setState({
              scales: We.scales,
              cellWidth: X,
              _cellWidth: X,
              zoom: { ..._e, level: Pe },
              ...(ke ? { _scaleDate: ke, _zoomOffset: 0 } : {}),
            });
          } else if (ke) {
            const { _scales: X, cellWidth: oe } = we.getState(),
              pe = X.diff(ke, X.start, X.lengthUnit),
              Me = Math.max(0, Math.round(pe * oe));
            we.exec('scroll-chart', { left: Me });
          }
          return !1;
        });
      }, [we]),
      Tt(
        B,
        () => ({
          ...we,
        }),
        [we],
      );
    const de = W(0);
    G(() => {
      de.current
        ? Q.init({
            tasks: s,
            links: Ie.links,
            start: c,
            columns: Ie.columns,
            end: u,
            lengthUnit: f,
            cellWidth: Ie.cellWidth,
            cellHeight: h,
            scaleHeight: m,
            scales: Ie.scales,
            taskTypes: r,
            zoom: Ie.zoom,
            selected: o,
            activeTask: i,
            baselines: k,
            autoScale: D,
            unscheduledTasks: F,
            markers: t,
            durationUnit: p,
            criticalPath: N,
            schedule: T,
            projectStart: z,
            projectEnd: Y,
            calendar: O,
            undo: V,
            _weekStart: Oe.weekStart,
            splitTasks: K,
            summary: xe,
          })
        : C && C(we),
        de.current++;
    }, [
      we,
      C,
      s,
      Ie,
      c,
      u,
      f,
      h,
      m,
      r,
      o,
      i,
      k,
      D,
      F,
      t,
      p,
      N,
      T,
      z,
      Y,
      O,
      V,
      Oe,
      K,
      xe,
      Q,
    ]),
      de.current === 0 &&
        Q.init({
          tasks: s,
          links: Ie.links,
          start: c,
          columns: Ie.columns,
          end: u,
          lengthUnit: f,
          cellWidth: Ie.cellWidth,
          cellHeight: h,
          scaleHeight: m,
          scales: Ie.scales,
          taskTypes: r,
          zoom: Ie.zoom,
          selected: o,
          activeTask: i,
          baselines: k,
          autoScale: D,
          unscheduledTasks: F,
          markers: t,
          durationUnit: p,
          criticalPath: N,
          schedule: T,
          projectStart: z,
          projectEnd: Y,
          calendar: O,
          undo: V,
          _weekStart: Oe.weekStart,
          splitTasks: K,
          summary: xe,
        });
    const ze = $(
      () =>
        O
          ? (Se, ke) =>
              (ke == 'day' && !O.getDayHours(Se)) ||
              (ke == 'hour' && !O.getDayHours(Se))
                ? 'wx-weekend'
                : ''
          : _,
      [O, _],
    );
    return /* @__PURE__ */ g(qe.i18n.Provider, {
      value: le,
      children: /* @__PURE__ */ g(pt.Provider, {
        value: we,
        children: /* @__PURE__ */ g(fd, {
          taskTemplate: e,
          readonly: x,
          cellBorders: y,
          highlightTime: ze,
          onScaleClick: S,
          onTableAPIChange: J,
          multiTaskRows: ue,
          rowMapping: ce,
          rowHeightOverrides: j,
          allowTaskIntersection: ae,
          summaryBarCounts: ye,
          marqueeSelect: L,
          copyPaste: se,
        }),
      }),
    });
  });
function kd({ api: n = null, items: e = [] }) {
  const t = $e(qe.i18n),
    r = $(() => t || Mt(Rn), [t]),
    s = $(() => r.getGroup('gantt'), [r]),
    o = lt(n, '_selected'),
    i = lt(n, 'undo'),
    l = lt(n, 'history'),
    a = lt(n, 'splitTasks'),
    d = ['undo', 'redo'],
    c = $(() => {
      const f = hr();
      return (e.length ? e : hr()).map((w) => {
        let h = { ...w, disabled: !1 };
        return (
          (h.handler = Mr(f, h.id) ? (m) => Rt(n, m.id, null, s) : h.handler),
          h.text && (h.text = s(h.text)),
          h.menuText && (h.menuText = s(h.menuText)),
          h
        );
      });
    }, [e, n, s, i, a]),
    u = $(() => {
      const f = [];
      return (
        c.forEach((p) => {
          const w = p.id;
          if (w === 'add-task') f.push(p);
          else if (d.includes(w))
            d.includes(w) &&
              f.push({
                ...p,
                disabled: p.isDisabled(l),
              });
          else {
            if (!o?.length || !n) return;
            f.push({
              ...p,
              disabled:
                p.isDisabled && o.some((h) => p.isDisabled(h, n.getState())),
            });
          }
        }),
        f.filter((p, w) => {
          if (n && p.isHidden)
            return !o.some((h) => p.isHidden(h, n.getState()));
          if (p.comp === 'separator') {
            const h = f[w + 1];
            if (!h || h.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [n, o, l, c]);
  return t
    ? /* @__PURE__ */ g(gr, { items: u })
    : /* @__PURE__ */ g(qe.i18n.Provider, {
        value: r,
        children: /* @__PURE__ */ g(gr, { items: u }),
      });
}
const bd = Nt(function (
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
    d,
  ) {
    const c = W(null),
      u = W(null),
      f = $e(qe.i18n),
      p = $(() => f || Mt({ ...Rn, ...en }), [f]),
      w = $(() => p.getGroup('gantt'), [p]),
      h = lt(t, 'taskTypes'),
      m = lt(t, 'selected'),
      x = lt(t, '_selected'),
      y = lt(t, 'splitTasks'),
      b = lt(t, 'summary'),
      k = $(
        () => ({
          splitTasks: y,
          taskTypes: h,
          summary: b,
        }),
        [y, h, b],
      ),
      _ = $(() => fr(k), [k]);
    G(() => {
      t &&
        (t.on('scroll-chart', () => {
          c.current && c.current.show && c.current.show();
        }),
        t.on('drag-task', () => {
          c.current && c.current.show && c.current.show();
        }));
    }, [t]);
    function S(V) {
      return V.map(
        (K) => (
          (K = { ...K }),
          K.text && (K.text = w(K.text)),
          K.subtext && (K.subtext = w(K.subtext)),
          K.data && (K.data = S(K.data)),
          K
        ),
      );
    }
    function C() {
      const V = e.length ? e : fr(k);
      return S(V);
    }
    const D = $(() => C(), [t, e, k, w]),
      F = $(() => (x && x.length ? x : []), [x]),
      N = E(
        (V, K) => {
          let ue = V ? t?.getTask(V) : null;
          if (r) {
            const j = r(V, K);
            ue = j === !0 ? ue : j;
          }
          if (ue) {
            const j = bt(K.target, 'data-segment');
            j !== null
              ? (u.current = { id: ue.id, segmentIndex: j })
              : (u.current = ue.id),
              (!Array.isArray(m) || !m.includes(ue.id)) &&
                t &&
                t.exec &&
                t.exec('select-task', { id: ue.id });
          }
          return ue;
        },
        [t, r, m],
      ),
      T = E(
        (V) => {
          const K = V.action;
          K && (Mr(_, K.id) && Rt(t, K.id, u.current, w), l && l(V));
        },
        [t, w, l, _],
      ),
      z = E(
        (V, K) => {
          const ue = F.length ? F : K ? [K] : [];
          let j = s ? ue.every((ae) => s(V, ae)) : !0;
          if (
            j &&
            (V.isHidden &&
              (j = !ue.some((ae) => V.isHidden(ae, t.getState(), u.current))),
            V.isDisabled)
          ) {
            const ae = ue.some((ye) =>
              V.isDisabled(ye, t.getState(), u.current),
            );
            V.disabled = ae;
          }
          return j;
        },
        [s, F, t],
      );
    Tt(d, () => ({
      show: (V, K) => {
        c.current && c.current.show && c.current.show(V, K);
      },
    }));
    const Y = E((V) => {
        c.current && c.current.show && c.current.show(V);
      }, []),
      O = /* @__PURE__ */ Z(Re, {
        children: [
          /* @__PURE__ */ g(Ro, {
            filter: z,
            options: D,
            dataKey: 'id',
            resolver: N,
            onClick: T,
            at: o,
            ref: c,
            css: a,
          }),
          /* @__PURE__ */ g('span', {
            onContextMenu: Y,
            'data-menu-ignore': 'true',
            children: typeof i == 'function' ? i() : i,
          }),
        ],
      });
    if (!f && qe.i18n?.Provider) {
      const V = qe.i18n.Provider;
      return /* @__PURE__ */ g(V, { value: p, children: O });
    }
    return O;
  }),
  wr = {};
function Ss(n) {
  return typeof n < 'u' ? wr[n] || n : wr.text;
}
function rt(n, e) {
  wr[n] = e;
}
const Sd = {
  editor: {},
};
function Zn(n) {
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
    d = W(null);
  G(() => {
    if (o) {
      const p = document.activeElement;
      if (p && d.current && d.current.contains(p)) return;
      const w = d.current
        ? d.current.querySelector(
            'input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
          )
        : null;
      w &&
        setTimeout(() => {
          typeof w.select == 'function' && w.select(),
            typeof w.focus == 'function' && w.focus();
        }, 300);
    }
  }, []);
  const c = $e(qe.i18n),
    u = $(() => c.getGroup('editor'), [c]),
    f = $(
      () =>
        e.config[0].comp === 'readonly' &&
        e.config.every((p) => !Object.keys(t).includes(p.key)),
      [e, t],
    );
  return /* @__PURE__ */ Z('div', {
    className: 'wx-s2aE1xdZ wx-sections ' + r,
    ref: d,
    children: [
      l,
      f
        ? /* @__PURE__ */ g('div', {
            className: 'wx-s2aE1xdZ wx-overlay',
            children: u('No data'),
          })
        : null,
      e.config.map((p) => {
        if (!p.hidden) {
          const { key: w, onChange: h, ...m } = p;
          if (p.comp === 'readonly' || p.comp === 'section') {
            const x = Ss(p.comp);
            return /* @__PURE__ */ g(
              x,
              {
                fieldKey: w,
                label: p.label,
                value: t[w],
                ...m,
                onClick: i,
              },
              w,
            );
          } else {
            const x = Ss(p.comp);
            return /* @__PURE__ */ Z(
              'div',
              {
                children: [
                  /* @__PURE__ */ g(qt, {
                    label: p.labelTemplate
                      ? p.labelTemplate(t[w])
                      : (p.label ?? ''),
                    required: p.required,
                    children: /* @__PURE__ */ g(
                      x,
                      {
                        fieldKey: w,
                        ...m,
                        onChange:
                          h ||
                          ((y) => {
                            a &&
                              a({
                                value: y.value,
                                key: w,
                                input: y.input,
                              });
                          }),
                        label: void 0,
                        error: s && s[w],
                        value: t[w],
                      },
                      w,
                    ),
                  }),
                  s && s[w] && p.validationMessage
                    ? /* @__PURE__ */ g('div', {
                        className: 'wx-s2aE1xdZ wx-message',
                        children: p.validationMessage,
                      })
                    : null,
                ],
              },
              w,
            );
          }
        }
        return null;
      }),
    ],
  });
}
function $d(n) {
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
function Cd(n) {
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
function _d(n) {
  const e = n.map((i) => {
      const l = { ...i };
      return (
        i.config && Object.assign(l, i.config),
        (l.key = i.key || Bi()),
        (l.setter = i.setter || Cd(i.key)),
        (l.getter = i.getter || $d(i.key)),
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
      (a.length ? a.map((d) => e.find((c) => c.key === d)) : e).forEach((d) => {
        d.setter ? d.setter(i, l[d.key]) : (i[d.key] = l[d.key]);
      }),
      i
    ),
    s = (i, l) => {
      const a = t(i),
        d = [];
      return (
        e.forEach((c) => {
          const u = a[c.key],
            f = l[c.key];
          !Hn(u, f) && (u !== void 0 || f) && d.push(c.key);
        }),
        d
      );
    },
    o = (i, l, a) => {
      let d = 0;
      const c = {};
      return (
        (l?.length ? l.map((u) => e.find((f) => f.key === u)) : e).forEach(
          (u) => {
            u.required && !i[u.key]
              ? ((c[u.key] = {
                  errorType: 'required',
                }),
                (u.validationMessage =
                  u.validationMessage ?? a('This field is required')),
                d++)
              : u.validation &&
                !u.validation(i[u.key]) &&
                ((c[u.key] = {
                  errorType: 'validation',
                }),
                (u.validationMessage =
                  u.validationMessage ?? a('Invalid value')),
                d++);
          },
        ),
        d > 0 ? c : null
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
function Nd({
  values: n,
  items: e,
  css: t,
  activeBatch: r,
  autoSave: s,
  focus: o,
  readonly: i,
  topBar: l = !0,
  bottomBar: a = !0,
  layout: d = 'default',
  placement: c = 'inline',
  view: u,
  children: f,
  onChange: p,
  onSave: w,
  onAction: h,
  onValidation: m,
  hotkeys: x,
}) {
  const y = $e(qe.i18n).getGroup('editor'),
    [b, k] = Ve(n),
    [_, S] = U(null),
    C = $(() => {
      const L = _d(e);
      _ &&
        L.config.forEach((ge) => {
          ge.comp === 'section' &&
            ge.key === _ &&
            (ge.sectionMode === 'accordion'
              ? ge.activeSection ||
                (L.config.forEach((He) => {
                  He.comp === 'section' &&
                    He.key !== ge.key &&
                    (He.activeSection = !1);
                }),
                (ge.activeSection = !0))
              : (ge.activeSection = !ge.activeSection));
        });
      let se = /* @__PURE__ */ new Set(),
        xe = null;
      return (
        L.config.forEach((ge) => {
          ge.sectionMode === 'exclusive' && ge.activeSection && (xe = ge.key),
            ge.activeSection && se.add(ge.key);
        }),
        L.config.forEach((ge) => {
          ge.hidden =
            ge.hidden ||
            (r && r !== ge.batch) ||
            (xe && ge.key != xe && ge.section !== xe) ||
            (ge.section && !se.has(ge.section));
        }),
        i
          ? {
              ...L,
              config: L.config.map((ge) => ({ ...ge, comp: 'readonly' })),
              diff: () => [],
            }
          : L
      );
    }, [e, _, r, i]),
    [D, F] = U({}),
    [N, T] = U({}),
    z = b;
  G(() => {
    b !== void 0 && (F(Sn(b)), T(Sn(b)), z.errors && (z.errors = K()));
  }, [b]);
  const [Y, O] = U([]);
  G(() => {
    b && O([]);
  }, [b]);
  function V(L) {
    return [...new Set(L)];
  }
  function K(L) {
    const se = C.validateValues(D, L, y);
    return Hn(se, z.errors) || (m && m({ errors: se, values: D })), se;
  }
  function ue(L, se) {
    if (s && !z.errors) {
      const xe = C.setValues(b, se ?? N, L);
      k(xe), w && w({ changes: L, values: xe });
    } else O(L);
  }
  function j({ value: L, key: se, input: xe }) {
    let ge = { ...(N || {}), [se]: L };
    const He = {
      key: se,
      value: L,
      update: ge,
    };
    if ((xe && (He.input = xe), p && p(He), !b)) return;
    (ge = He.update), T(ge);
    const B = C.diff(b, ge),
      fe = C.setValues({ ...(D || {}) }, ge, V([...B, se]));
    if ((F(fe), B.length)) {
      const Q = s ? [] : V([...B, ...Object.keys(z.errors ?? {}), se]);
      (z.errors = K(Q)), ue(B, ge);
    } else {
      const Q = Object.keys(z.errors ?? {});
      Q.length && (z.errors = K(Q)), O([]);
    }
  }
  function ae() {
    if (Y.length && (s || (z.errors = K()), !z.errors)) {
      w &&
        w({
          changes: Y,
          values: D,
        });
      const L = C.setValues(b, N, Y);
      k(L), O([]), k({ ...D });
    }
  }
  function ye({ item: L }) {
    L.id === 'save' ? ae() : L.id === 'toggle-section' && S(L.key),
      h && h({ item: L, values: D, changes: Y });
  }
  return /* @__PURE__ */ g(u, {
    topBar: l,
    bottomBar: a,
    placement: c,
    layout: d,
    readonly: i,
    autoSave: s,
    css: t,
    data: N,
    editors: C,
    focus: o,
    hotkeys: x,
    errors: z.errors,
    onClick: ye,
    onKeyDown: ye,
    onChange: j,
    children: f,
  });
}
function Td(n) {
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
      let d = [];
      if (
        r === 'columns' &&
        ((d = [
          { ...e, config: [] },
          { ...e, config: [] },
        ]),
        e.config.forEach((c) => {
          const u = c.column === 'left' ? 0 : 1;
          d[u].config.push(c);
        }),
        d[0].config.length)
      ) {
        const c = d[0].config[0];
        c.comp === 'text' &&
          (d[0][0] = {
            ...c,
            css: 'title',
            label: '',
          });
      }
      return d;
    }, [r, e]);
  return r === 'columns'
    ? /* @__PURE__ */ Z('div', {
        className: 'wx-bNrSbszs wx-cols',
        children: [
          /* @__PURE__ */ g('div', {
            className: 'wx-bNrSbszs wx-left',
            children: /* @__PURE__ */ g(Zn, {
              editors: a[0],
              data: t,
              errors: s,
              onClick: i,
              onChange: l,
            }),
          }),
          /* @__PURE__ */ g('div', {
            className: 'wx-bNrSbszs wx-right',
            children: /* @__PURE__ */ g(Zn, {
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
    : /* @__PURE__ */ g(Zn, {
        editors: e,
        data: t,
        focus: o,
        errors: s,
        onClick: i,
        onChange: l,
      });
}
function $s({
  items: n,
  values: e = null,
  top: t = !0,
  onClick: r,
  onChange: s,
}) {
  const o = E(
    ({ item: i, value: l }) => {
      s && s({ key: i.key, value: l });
    },
    [s],
  );
  return n.length
    ? /* @__PURE__ */ g('div', {
        className: `wx-66OW1j0R wx-editor-toolbar ${t ? 'wx-topbar' : 'wx-bottom'}`,
        children: /* @__PURE__ */ g(gr, {
          items: n,
          values: e,
          onClick: r,
          onChange: o,
        }),
      })
    : null;
}
const Ut = () => ({ comp: 'spacer' }),
  Jn = (n) => ({
    comp: 'button',
    text: n('Cancel'),
    id: 'cancel',
  }),
  er = (n) => ({
    type: 'primary',
    comp: 'button',
    text: n('Save'),
    id: 'save',
  }),
  Cs = () => ({
    comp: 'icon',
    icon: 'wxi-close',
    id: 'close',
  });
function tr(n) {
  const {
      data: e,
      editors: t,
      focus: r,
      css: s,
      topBar: o,
      bottomBar: i,
      layout: l,
      placement: a,
      errors: d,
      readonly: c,
      autoSave: u,
      children: f,
      onClick: p,
      onKeyDown: w,
      onChange: h,
      hotkeys: m,
    } = n,
    x = $e(qe.i18n),
    y = $(() => x.getGroup('editor'), [x]),
    b = $(() => o === !0 && i === !0, [o, i]),
    k = $(() => {
      let N = o && o.items ? o.items.map((T) => ({ ...T })) : [];
      return (
        b &&
          (c
            ? (N = [Ut(), Cs()])
            : (u
                ? (N = [Ut(), Cs()])
                : a !== 'modal' && (N = [Ut(), Jn(y), er(y)]),
              l === 'columns' && !N.length && (N = [Ut(), er(y), Jn(y)]))),
        N
      );
    }, [o, b, c, u, a, l, y]),
    _ = $(() => {
      let N = i && i.items ? i.items.map((T) => ({ ...T })) : [];
      return (
        b &&
          (c ||
            (a === 'modal' && !u && (N = [Ut(), er(y), Jn(y)]),
            l === 'columns' && k.length && (N = []))),
        N
      );
    }, [i, b, c, a, u, l, k, y]),
    S = $(() => [...k, ..._], [k, _]),
    C = W(null),
    D = W(null);
  D.current = (N, ...T) => {
    const z = S.findIndex((V) => T.includes(V.id));
    if (z === -1) return !1;
    const Y = N.target,
      O = S[z];
    (N.key == 'Escape' &&
      (Y.closest('.wx-combo') ||
        Y.closest('.wx-multicombo') ||
        Y.closest('.wx-richselect'))) ||
      (N.key == 'Delete' &&
        (Y.tagName === 'INPUT' || Y.tagName === 'TEXTAREA')) ||
      (N.preventDefault(), w && w({ item: O }));
  };
  const F = $(
    () =>
      m === !1
        ? {}
        : {
            'ctrl+s': (N) => D.current(N, 'save'),
            escape: (N) => D.current(N, 'cancel', 'close'),
            'ctrl+d': (N) => D.current(N, 'delete'),
            ...(m || {}),
          },
    [m],
  );
  return (
    li(F, C),
    /* @__PURE__ */ Z('div', {
      className: s ? 'wx-85HDaNoA ' + s : 'wx-85HDaNoA',
      ref: C,
      children: [
        /* @__PURE__ */ g($s, {
          ...(o && typeof o == 'object' ? o : {}),
          items: k,
          values: e,
          onClick: p,
          onChange: h,
        }),
        /* @__PURE__ */ Z('div', {
          className: `wx-85HDaNoA wx-content${l === 'columns' ? ' wx-layout-columns' : ''}`,
          children: [
            f,
            /* @__PURE__ */ g(Td, {
              editors: t,
              layout: l,
              data: e,
              focus: r,
              errors: d,
              onClick: p,
              onChange: h,
            }),
            /* @__PURE__ */ g($s, {
              ...(i && typeof i == 'object' ? i : {}),
              items: _,
              values: e,
              top: !1,
              onClick: p,
              onChange: h,
            }),
          ],
        }),
      ],
    })
  );
}
function Md(n) {
  const { css: e, onClick: t, placement: r, ...s } = n;
  function o() {
    t && t({ item: { id: 'close' } });
  }
  return r === 'modal'
    ? /* @__PURE__ */ g(Wi, {
        children: /* @__PURE__ */ g(tr, {
          css: `wx-panel ${e}`,
          onClick: t,
          placement: r,
          ...s,
        }),
      })
    : r === 'sidebar'
      ? /* @__PURE__ */ g(Fi, {
          onCancel: o,
          children: /* @__PURE__ */ g(tr, {
            css: `wx-panel ${e}`,
            onClick: t,
            placement: r,
            ...s,
          }),
        })
      : /* @__PURE__ */ g(tr, {
          css: `wx-inline-form ${e}`,
          onClick: t,
          placement: r,
          ...s,
        });
}
function Dd(n) {
  const {
      values: e = {},
      items: t = [],
      css: r = '',
      activeBatch: s = null,
      topBar: o = !0,
      bottomBar: i = !0,
      focus: l = !1,
      autoSave: a = !1,
      layout: d = 'default',
      readonly: c = !1,
      placement: u = 'inline',
      children: f,
      ...p
    } = n,
    w = Object.keys(p).reduce((h, m) => {
      if (/^on[a-z]/.test(m)) {
        const x = 'on' + m.charAt(2).toUpperCase() + m.slice(3);
        x in p ? (h[m] = p[m]) : (h[x] = p[m]);
      } else h[m] = p[m];
      return h;
    }, {});
  return /* @__PURE__ */ g(In, {
    words: Sd,
    optional: !0,
    children: /* @__PURE__ */ g(Nd, {
      view: Md,
      values: e,
      items: t,
      css: r,
      activeBatch: s,
      topBar: o,
      bottomBar: i,
      focus: l,
      autoSave: a,
      layout: d,
      readonly: c,
      placement: u,
      ...w,
      children: f,
    }),
  });
}
function Ed({ value: n, options: e, label: t }) {
  const r = $e(qe.i18n).getGroup('editor'),
    s = $(() => {
      let o = n;
      if ((typeof n == 'boolean' && (o = r(n ? 'Yes' : 'No')), e)) {
        const i = e.find((l) => l.id === n);
        i && (o = i.label);
      }
      return o;
    }, [n, e, r]);
  return s || s === 0 ? /* @__PURE__ */ g(qt, { label: t, children: s }) : null;
}
function Id({ fieldKey: n, label: e, activeSection: t, onClick: r }) {
  return /* @__PURE__ */ Z('div', {
    className: `wx-OmgQq65I wx-section${t ? ' wx-section-active' : ''}`,
    onClick: () =>
      r &&
      r({
        item: { id: 'toggle-section', key: t ? null : n },
      }),
    children: [
      /* @__PURE__ */ g('h3', { children: e }),
      /* @__PURE__ */ g('i', {
        className: `wx-OmgQq65I wxi-angle-${t ? 'down' : 'right'} wx-icon`,
      }),
    ],
  });
}
rt('text', rn);
rt('textarea', pi);
rt('checkbox', gi);
rt('readonly', Ed);
rt('section', Id);
xr(Je);
function Rd({ api: n, autoSave: e, onLinksChange: t }) {
  const s = $e(qe.i18n).getGroup('gantt'),
    o = re(n, 'activeTask'),
    i = re(n, '_activeTask'),
    l = re(n, '_links'),
    a = re(n, 'schedule'),
    d = re(n, 'unscheduledTasks'),
    [c, u] = U();
  function f() {
    if (o) {
      const m = l
          .filter((y) => y.target == o)
          .map((y) => ({ link: y, task: n.getTask(y.source) })),
        x = l
          .filter((y) => y.source == o)
          .map((y) => ({ link: y, task: n.getTask(y.target) }));
      return [
        { title: s('Predecessors'), data: m },
        { title: s('Successors'), data: x },
      ];
    }
  }
  G(() => {
    u(f());
  }, [o, l]);
  const p = $(
    () => [
      { id: 'e2s', label: s('End-to-start') },
      { id: 's2s', label: s('Start-to-start') },
      { id: 'e2e', label: s('End-to-end') },
      { id: 's2e', label: s('Start-to-end') },
    ],
    [s],
  );
  function w(m) {
    e
      ? n.exec('delete-link', { id: m })
      : (u((x) =>
          (x || []).map((y) => ({
            ...y,
            data: y.data.filter((b) => b.link.id !== m),
          })),
        ),
        t &&
          t({
            id: m,
            action: 'delete-link',
            data: { id: m },
          }));
  }
  function h(m, x) {
    e
      ? n.exec('update-link', {
          id: m,
          link: x,
        })
      : (u((y) =>
          (y || []).map((b) => ({
            ...b,
            data: b.data.map((k) =>
              k.link.id === m ? { ...k, link: { ...k.link, ...x } } : k,
            ),
          })),
        ),
        t &&
          t({
            id: m,
            action: 'update-link',
            data: {
              id: m,
              link: x,
            },
          }));
  }
  return /* @__PURE__ */ g(Re, {
    children: (c || []).map((m, x) =>
      m.data.length
        ? /* @__PURE__ */ g(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ g(qe.fieldId.Provider, {
                value: null,
                children: /* @__PURE__ */ g(qt, {
                  label: m.title,
                  position: 'top',
                  children: /* @__PURE__ */ g('table', {
                    children: /* @__PURE__ */ g('tbody', {
                      children: m.data.map((y) =>
                        /* @__PURE__ */ Z(
                          'tr',
                          {
                            children: [
                              /* @__PURE__ */ g('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ g('div', {
                                  className: 'wx-j93aYGQf wx-task-name',
                                  children: y.task.text || '',
                                }),
                              }),
                              a?.auto && y.link.type === 'e2s'
                                ? /* @__PURE__ */ g('td', {
                                    className:
                                      'wx-j93aYGQf wx-cell wx-link-lag',
                                    children: /* @__PURE__ */ g(rn, {
                                      type: 'number',
                                      placeholder: s('Lag'),
                                      value: y.link.lag,
                                      disabled: d && i?.unscheduled,
                                      onChange: (b) => {
                                        b.input ||
                                          h(y.link.id, { lag: b.value });
                                      },
                                    }),
                                  })
                                : null,
                              /* @__PURE__ */ g('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ g('div', {
                                  className: 'wx-j93aYGQf wx-wrapper',
                                  children: /* @__PURE__ */ g(wi, {
                                    value: y.link.type,
                                    placeholder: s('Select link type'),
                                    options: p,
                                    onChange: (b) =>
                                      h(y.link.id, { type: b.value }),
                                    children: ({ option: b }) => b.label,
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ g('td', {
                                className: 'wx-j93aYGQf wx-cell',
                                children: /* @__PURE__ */ g('i', {
                                  className:
                                    'wx-j93aYGQf wxi-delete wx-delete-icon',
                                  onClick: () => w(y.link.id),
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
            x,
          )
        : null,
    ),
  });
}
function Hd(n) {
  const { value: e, time: t, format: r, onchange: s, onChange: o, ...i } = n,
    l = o ?? s;
  function a(d) {
    const c = new Date(d.value);
    c.setHours(e.getHours()),
      c.setMinutes(e.getMinutes()),
      l && l({ value: c });
  }
  return /* @__PURE__ */ Z('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ g(Ri, {
        ...i,
        value: e,
        onChange: a,
        format: r,
        buttons: ['today'],
        clear: !1,
      }),
      t ? /* @__PURE__ */ g(Oi, { value: e, onChange: l, format: r }) : null,
    ],
  });
}
rt('select', As);
rt('date', Hd);
rt('twostate', Ls);
rt('slider', sr);
rt('counter', Hi);
rt('links', Rd);
function Ad({
  api: n,
  items: e = [],
  css: t = '',
  layout: r = 'default',
  readonly: s = !1,
  placement: o = 'sidebar',
  bottomBar: i = !0,
  topBar: l = !0,
  autoSave: a = !0,
  focus: d = !1,
  hotkeys: c = {},
}) {
  const u = $e(qe.i18n),
    f = $(() => u || Mt({ ...Rn, ...en }), [u]),
    p = $(() => f.getGroup('gantt'), [f]),
    w = f.getRaw(),
    h = $(() => {
      const J = w.gantt?.dateFormat || w.formats?.dateFormat;
      return dt(J, w.calendar);
    }, [w]),
    m = $(() => {
      if (l === !0 && !s) {
        const J = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: p('Delete'),
            id: 'delete',
          },
        ];
        return a
          ? { items: J }
          : {
              items: [
                ...J,
                {
                  comp: 'button',
                  type: 'primary',
                  text: p('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return l;
    }, [l, s, a, p]),
    [x, y] = U(!1),
    b = $(() => (x ? 'wx-full-screen' : ''), [x]),
    k = E((J) => {
      y(J);
    }, []);
  G(() => {
    const J = Wo(k);
    return (
      J.observe(),
      () => {
        J.disconnect();
      }
    );
  }, [k]);
  const _ = re(n, '_activeTask'),
    S = re(n, 'activeTask'),
    C = re(n, 'unscheduledTasks'),
    D = re(n, 'summary'),
    F = re(n, 'links'),
    N = re(n, 'splitTasks'),
    T = $(() => N && S?.segmentIndex, [N, S]),
    z = $(() => T || T === 0, [T]),
    Y = re(n, 'taskTypes'),
    O = $(() => bo({ taskTypes: Y }), [C, D, Y]),
    V = re(n, 'undo'),
    [K, ue] = U({}),
    [j, ae] = U(null),
    [ye, L] = U(),
    [se, xe] = U(null),
    ge = $(() => {
      if (!_) return null;
      let J;
      if ((z && _.segments ? (J = { ..._.segments[T] }) : (J = { ..._ }), s)) {
        let be = { parent: J.parent };
        return (
          O.forEach(({ key: we, comp: de }) => {
            if (de !== 'links') {
              const ze = J[we];
              de === 'date' && ze instanceof Date
                ? (be[we] = h(ze))
                : de === 'slider' && we === 'progress'
                  ? (be[we] = `${ze}%`)
                  : (be[we] = ze);
            }
          }),
          be
        );
      }
      return J || null;
    }, [_, z, T, s, O, h]);
  G(() => {
    L(ge);
  }, [ge]),
    G(() => {
      ue({}), xe(null), ae(null);
    }, [S]);
  function He(J, be) {
    return J.map((we) => {
      const de = { ...we };
      if (
        (we.config && (de.config = { ...de.config }),
        de.comp === 'links' &&
          n &&
          ((de.api = n), (de.autoSave = a), (de.onLinksChange = Q)),
        de.comp === 'select' && de.key === 'type')
      ) {
        const ze = de.options ?? [];
        de.options = ze.map((Se) => ({
          ...Se,
          label: p(Se.label),
        }));
      }
      return (
        de.comp === 'slider' &&
          de.key === 'progress' &&
          (de.labelTemplate = (ze) => `${p(de.label)} ${ze}%`),
        de.label && (de.label = p(de.label)),
        de.config?.placeholder &&
          (de.config.placeholder = p(de.config.placeholder)),
        be &&
          (de.isDisabled && de.isDisabled(be, n.getState())
            ? (de.disabled = !0)
            : delete de.disabled),
        de
      );
    });
  }
  const B = $(() => {
      let J = e.length ? e : O;
      return (
        (J = He(J, ye)),
        ye
          ? J.filter((be) => !be.isHidden || !be.isHidden(ye, n.getState()))
          : J
      );
    }, [e, O, ye, p, n, a]),
    fe = $(() => B.map((J) => J.key), [B]);
  function Q({ id: J, action: be, data: we }) {
    ue((de) => ({
      ...de,
      [J]: { action: be, data: we },
    }));
  }
  const ne = E(() => {
      for (let J in K)
        if (F.byId(J)) {
          const { action: be, data: we } = K[J];
          n.exec(be, we);
        }
    }, [n, K, F]),
    he = E(() => {
      const J = S?.id || S;
      if (z) {
        if (_?.segments) {
          const be = _.segments.filter((we, de) => de !== T);
          n.exec('update-task', {
            id: J,
            task: { segments: be },
          });
        }
      } else n.exec('delete-task', { id: J });
    }, [n, S, z, _, T]),
    le = E(() => {
      n.exec('show-editor', { id: null });
    }, [n]),
    Oe = E(
      (J) => {
        const { item: be, changes: we } = J;
        be.id === 'delete' && he(),
          be.id === 'save' && (we.length ? le() : ne()),
          be.comp && le();
      },
      [n, S, a, ne, he, le],
    ),
    Ie = E(
      (J, be, we) => (
        C && J.type === 'summary' && (J.unscheduled = !1),
        yo(J, n.getState(), be),
        we || ae(!1),
        J
      ),
      [C, n],
    ),
    De = E(
      (J) => {
        (J = {
          ...J,
          unscheduled: C && J.unscheduled && J.type !== 'summary',
        }),
          delete J.links,
          delete J.data,
          (fe.indexOf('duration') === -1 || (J.segments && !J.duration)) &&
            delete J.duration;
        const be = {
          id: S?.id || S,
          task: J,
          ...(z && { segmentIndex: T }),
        };
        a && j && (be.inProgress = j), n.exec('update-task', be), a || ne();
      },
      [n, S, C, a, ne, fe, z, T, j],
    ),
    ce = E(
      (J) => {
        let { update: be, key: we, input: de } = J;
        if ((de && ae(!0), (J.update = Ie({ ...be }, we, de)), !a)) L(J.update);
        else if (!se && !de) {
          const ze = B.find((_e) => _e.key === we),
            Se = be[we];
          (!ze.validation || ze.validation(Se)) &&
            (!ze.required || Se) &&
            De(J.update);
        }
      },
      [a, Ie, se, B, De],
    ),
    me = E(
      (J) => {
        a || De(J.values);
      },
      [a, De],
    ),
    Ce = E((J) => {
      xe(J.errors);
    }, []),
    Ae = $(
      () =>
        V
          ? {
              'ctrl+z': (J) => {
                J.preventDefault(), n.exec('undo');
              },
              'ctrl+y': (J) => {
                J.preventDefault(), n.exec('redo');
              },
            }
          : {},
      [V, n],
    );
  return ge
    ? /* @__PURE__ */ g(In, {
        children: /* @__PURE__ */ g(Dd, {
          css: `wx-XkvqDXuw wx-gantt-editor ${b} ${t}`,
          items: B,
          values: ge,
          topBar: m,
          bottomBar: i,
          placement: o,
          layout: r,
          readonly: s,
          autoSave: a,
          focus: d,
          onAction: Oe,
          onSave: me,
          onValidation: Ce,
          onChange: ce,
          hotkeys: c && { ...Ae, ...c },
        }),
      })
    : null;
}
const Ld = ({ children: n, columns: e = null, api: t }) => {
  const [r, s] = U(null);
  return (
    G(() => {
      t && t.getTable(!0).then(s);
    }, [t]),
    /* @__PURE__ */ g(qc, { api: r, columns: e, children: n })
  );
};
function Pd(n) {
  const { api: e, content: t, children: r } = n,
    s = W(null),
    o = W(null),
    [i, l] = U({}),
    [a, d] = U(null),
    [c, u] = U({});
  function f(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const _ = k.getAttribute('data-tooltip-id'),
          S = k.getAttribute('data-tooltip-at'),
          C = k.getAttribute('data-tooltip');
        if (_ || C) return { id: _, tooltip: C, target: k, at: S };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  G(() => {
    const k = o.current;
    if (k && c && (c.text || t)) {
      const _ = k.getBoundingClientRect();
      let S = !1,
        C = c.left,
        D = c.top;
      _.right >= i.right && ((C = i.width - _.width - 5), (S = !0)),
        _.bottom >= i.bottom &&
          ((D = c.top - (_.bottom - i.bottom + 2)), (S = !0)),
        S && u((F) => F && { ...F, left: C, top: D });
    }
  }, [c, i, t]);
  const p = W(null),
    w = 300,
    h = (k) => {
      clearTimeout(p.current),
        (p.current = setTimeout(() => {
          k();
        }, w));
    };
  function m(k) {
    let { id: _, tooltip: S, target: C, at: D } = f(k.target);
    if ((u(null), d(null), !S))
      if (_) S = y(_);
      else {
        clearTimeout(p.current);
        return;
      }
    const F = k.clientX;
    h(() => {
      _ && d(x(b(_)));
      const N = C.getBoundingClientRect(),
        T = s.current,
        z = T
          ? T.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let Y, O;
      D === 'left'
        ? ((Y = N.top + 5 - z.top), (O = N.right + 5 - z.left))
        : ((Y = N.top + N.height - z.top), (O = F - z.left)),
        l(z),
        u({ top: Y, left: O, text: S });
    });
  }
  function x(k) {
    return e?.getTask(b(k)) || null;
  }
  function y(k) {
    return x(k)?.text || '';
  }
  function b(k) {
    const _ = parseInt(k);
    return isNaN(_) ? k : _;
  }
  return /* @__PURE__ */ Z('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: s,
    onMouseMove: m,
    children: [
      c && (c.text || t)
        ? /* @__PURE__ */ g('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: o,
            style: { top: `${c.top}px`, left: `${c.left}px` },
            children: t
              ? /* @__PURE__ */ g(t, { data: a })
              : c.text
                ? /* @__PURE__ */ g('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: c.text,
                  })
                : null,
          })
        : null,
      r,
    ],
  });
}
function zd({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ g(Ur, { fonts: n, children: e() })
    : /* @__PURE__ */ g(Ur, { fonts: n });
}
function Od({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ g(jr, { fonts: n, children: e })
    : /* @__PURE__ */ g(jr, { fonts: n });
}
function Wd({ fonts: n = !0, children: e }) {
  return e
    ? /* @__PURE__ */ g(Xr, { fonts: n, children: e })
    : /* @__PURE__ */ g(Xr, { fonts: n });
}
const Fd = '2.8.0',
  Yd = {
    version: Fd,
  },
  Gd = Yd.version,
  nu = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        ContextMenu: bd,
        Editor: Ad,
        Gantt: vd,
        HeaderMenu: Ld,
        Material: zd,
        Toolbar: kd,
        Tooltip: Pd,
        Willow: Od,
        WillowDark: Wd,
        defaultColumns: wo,
        defaultEditorItems: So,
        defaultMenuOptions: vo,
        defaultTaskTypes: Ln,
        defaultToolbarButtons: ko,
        getEditorItems: bo,
        getMenuOptions: fr,
        getToolbarButtons: hr,
        registerEditorItem: rt,
        registerScaleUnit: Yl,
        version: Gd,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
export { nu as default };
