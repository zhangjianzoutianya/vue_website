/*!
 * SmoothScroll for websites v1.4.6 (Balazs Galambosi)
 * http://www.smoothscroll.net/
 *
 * Licensed under the terms of the MIT license.
 */
!
function() {
    function e() {
        z.keyboardSupport && m("keydown", a)
    }
    function t() {
        if (!Y && document.body) {
            Y = !0;
            var t = document.body,
            o = document.documentElement,
            n = window.innerHeight,
            r = t.scrollHeight;
            if (A = document.compatMode.indexOf("CSS") >= 0 ? o: t, D = t, e(), top != self) O = !0;
            else if (te && r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                var a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + A.scrollHeight + "px",
                document.body.appendChild(a);
                var i;
                T = function() {
                    i || (i = setTimeout(function() {
                        L || (a.style.height = "0", a.style.height = A.scrollHeight + "px", i = null)
                    },
                    500))
                },
                setTimeout(T, 10),
                m("resize", T);
                var l = {
                    attributes: !0,
                    childList: !0,
                    characterData: !1
                };
                if ((M = new W(T)).observe(t, l), A.offsetHeight <= n) {
                    var c = document.createElement("div");
                    c.style.clear = "both",
                    t.appendChild(c)
                }
            }
            z.fixedBackground || L || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
        }
    }
    function o() {
        M && M.disconnect(),
        w(I, r),
        w("mousedown", i),
        w("keydown", a),
        w("resize", T),
        w("load", t)
    }
    function n(e, t, o) {
        if (p(t, o), 1 != z.accelerationMax) {
            var n = Date.now() - q;
            if (n < z.accelerationDelta) {
                var r = (1 + 50 / n) / 2;
                r > 1 && (r = Math.min(r, z.accelerationMax), t *= r, o *= r)
            }
            q = Date.now()
        }
        if (R.push({
            x: t,
            y: o,
            lastX: t < 0 ? .99 : -.99,
            lastY: o < 0 ? .99 : -.99,
            start: Date.now()
        }), !j) {
            var a = e === document.body,
            i = function(n) {
                for (var r = Date.now(), l = 0, c = 0, u = 0; u < R.length; u++) {
                    var d = R[u],
                    s = r - d.start,
                    f = s >= z.animationTime,
                    m = f ? 1 : s / z.animationTime;
                    z.pulseAlgorithm && (m = x(m));
                    var w = d.x * m - d.lastX >> 0,
                    h = d.y * m - d.lastY >> 0;
                    l += w,
                    c += h,
                    d.lastX += w,
                    d.lastY += h,
                    f && (R.splice(u, 1), u--)
                }
                a ? window.scrollBy(l, c) : (l && (e.scrollLeft += l), c && (e.scrollTop += c)),
                t || o || (R = []),
                R.length ? _(i, e, 1e3 / z.frameRate + 1) : j = !1
            };
            _(i, e, 0),
            j = !0
        }
    }
    function r(e) {
        Y || t();
        var o = e.target;
        if (e.defaultPrevented || e.ctrlKey) return ! 0;
        if (h(D, "embed") || h(o, "embed") && /\.pdf/i.test(o.src) || h(D, "object") || o.shadowRoot) return ! 0;
        var r = -e.wheelDeltaX || e.deltaX || 0,
        a = -e.wheelDeltaY || e.deltaY || 0;
        N && (e.wheelDeltaX && y(e.wheelDeltaX, 120) && (r = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && y(e.wheelDeltaY, 120) && (a = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)),
        r || a || (a = -e.wheelDelta || 0),
        1 === e.deltaMode && (r *= 40, a *= 40);
        var i = u(o);
        return i ? !!v(a) || (Math.abs(r) > 1.2 && (r *= z.stepSize / 120), Math.abs(a) > 1.2 && (a *= z.stepSize / 120), n(i, r, a), e.preventDefault(), void l()) : !O || !J || (Object.defineProperty(e, "target", {
            value: window.frameElement
        }), parent.wheel(e))
    }
    function a(e) {
        var t = e.target,
        o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== K.spacebar;
        document.body.contains(D) || (D = document.activeElement);
        var r = /^(textarea|select|embed|object)$/i,
        a = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (e.defaultPrevented || r.test(t.nodeName) || h(t, "input") && !a.test(t.type) || h(D, "video") || g(e) || t.isContentEditable || o) return ! 0;
        if ((h(t, "button") || h(t, "input") && a.test(t.type)) && e.keyCode === K.spacebar) return ! 0;
        if (h(t, "input") && "radio" == t.type && P[e.keyCode]) return ! 0;
        var i = 0,
        c = 0,
        d = u(D);
        if (!d) return ! O || !J || parent.keydown(e);
        var s = d.clientHeight;
        switch (d == document.body && (s = window.innerHeight), e.keyCode) {
        case K.up:
            c = -z.arrowScroll;
            break;
        case K.down:
            c = z.arrowScroll;
            break;
        case K.spacebar:
            c = -(e.shiftKey ? 1 : -1) * s * .9;
            break;
        case K.pageup:
            c = .9 * -s;
            break;
        case K.pagedown:
            c = .9 * s;
            break;
        case K.home:
            c = -d.scrollTop;
            break;
        case K.end:
            var f = d.scrollHeight - d.scrollTop - s;
            c = f > 0 ? f + 10 : 0;
            break;
        case K.left:
            i = -z.arrowScroll;
            break;
        case K.right:
            i = z.arrowScroll;
            break;
        default:
            return ! 0
        }
        n(d, i, c),
        e.preventDefault(),
        l()
    }
    function i(e) {
        D = e.target
    }
    function l() {
        clearTimeout(E),
        E = setInterval(function() {
            F = {}
        },
        1e3)
    }
    function c(e, t) {
        for (var o = e.length; o--;) F[V(e[o])] = t;
        return t
    }
    function u(e) {
        var t = [],
        o = document.body,
        n = A.scrollHeight;
        do {
            var r = F[V(e)];
            if (r) return c(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = s(A) && s(o) || f(A);
                if (O && d(A) || !O && a) return c(t, $())
            } else if (d(e) && f(e)) return c(t, e)
        } while ( e = e . parentElement )
    }
    function d(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }
    function s(e) {
        return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
    }
    function f(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }
    function m(e, t) {
        window.addEventListener(e, t, !1)
    }
    function w(e, t) {
        window.removeEventListener(e, t, !1)
    }
    function h(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }
    function p(e, t) {
        e = e > 0 ? 1 : -1,
        t = t > 0 ? 1 : -1,
        X.x === e && X.y === t || (X.x = e, X.y = t, R = [], q = 0)
    }
    function v(e) {
        if (e) return B.length || (B = [e, e, e]),
        e = Math.abs(e),
        B.push(e),
        B.shift(),
        clearTimeout(C),
        C = setTimeout(function() {
            try {
                localStorage.SS_deltaBuffer = B.join(",")
            } catch(e) {}
        },
        1e3),
        !b(120) && !b(100)
    }
    function y(e, t) {
        return Math.floor(e / t) == e / t
    }
    function b(e) {
        return y(B[0], e) && y(B[1], e) && y(B[2], e)
    }
    function g(e) {
        var t = e.target,
        o = !1;
        if ( - 1 != document.URL.indexOf("www.youtube.com/watch")) do {
            if (o = t.classList && t.classList.contains("html5-video-controls")) break
        } while ( t = t . parentNode );
        return o
    }
    function S(e) {
        var t, o;
        return e *= z.pulseScale,
        e < 1 ? t = e - (1 - Math.exp( - e)) : (e -= 1, t = (o = Math.exp( - 1)) + (1 - Math.exp( - e)) * (1 - o)),
        t * z.pulseNormalize
    }
    function x(e) {
        return e >= 1 ? 1 : e <= 0 ? 0 : (1 == z.pulseNormalize && (z.pulseNormalize /= S(1)), S(e))
    }
    function k(e) {
        for (var t in e) H.hasOwnProperty(t) && (z[t] = e[t])
    }
    var D, M, T, E, C, H = {
        frameRate: 150,
        animationTime: 1200,
        stepSize: 100,
        pulseAlgorithm: !0,
        pulseScale: 4,
        pulseNormalize: 1,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: !0,
        arrowScroll: 50,
        fixedBackground: !0,
        excluded: ""
    },
    z = H,
    L = !1,
    O = !1,
    X = {
        x: 0,
        y: 0
    },
    Y = !1,
    A = document.documentElement,
    B = [],
    N = /^Mac/.test(navigator.platform),
    K = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36
    },
    P = {
        37 : 1,
        38 : 1,
        39 : 1,
        40 : 1
    },
    R = [],
    j = !1,
    q = Date.now(),
    V = function() {
        var e = 0;
        return function(t) {
            return t.uniqueID || (t.uniqueID = e++)
        }
    } (),
    F = {};
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        B = localStorage.SS_deltaBuffer.split(",")
    } catch(e) {}
    var I, _ = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        function(e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        }
    } (),
    W = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
    $ = function() {
        var e;
        return function() {
            if (!e) {
                var t = document.createElement("div");
                t.style.cssText = "height:10000px;width:1px;",
                document.body.appendChild(t);
                var o = document.body.scrollTop;
                document.documentElement.scrollTop;
                window.scrollBy(0, 3),
                e = document.body.scrollTop != o ? document.body: document.documentElement,
                window.scrollBy(0, -3),
                document.body.removeChild(t)
            }
            return e
        }
    } (),
    U = window.navigator.userAgent,
    G = /Edge/.test(U),
    J = /chrome/i.test(U) && !G,
    Q = /safari/i.test(U) && !G,
    Z = /mobile/i.test(U),
    ee = /Windows NT 6.1/i.test(U) && /rv:11/i.test(U),
    te = Q && (/Version\/8/i.test(U) || /Version\/9/i.test(U)),
    oe = (J || Q || ee) && !Z;
    "onwheel" in document.createElement("div") ? I = "wheel": "onmousewheel" in document.createElement("div") && (I = "mousewheel"),
    I && oe && (m(I, r), m("mousedown", i), m("load", t)),
    k.destroy = o,
    window.SmoothScrollOptions && k(window.SmoothScrollOptions),
    "function" == typeof define && define.amd ? define(function() {
        return k
    }) : "object" == typeof exports ? module.exports = k: window.SmoothScroll = k
} ();