!function () {
    "use strict";
    var t = function () {
        return t = Object.assign || function (t) {
            for (var n, i = 1, s = arguments.length; i < s; i++) {
                n = arguments[i];
                for (const i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        }, t.apply(this, arguments)
    };
    const n = function () {
        function n(n, i, s) {
            const e = this;
            this.endVal = i, this.options = s, this.version = "2.3.2", this.defaults = {
                startVal: 0,
                decimalPlaces: 0,
                duration: 2,
                useEasing: !0,
                useGrouping: !0,
                smartEasingThreshold: 999,
                smartEasingAmount: 333,
                separator: ",",
                decimal: ".",
                prefix: "",
                suffix: "",
                enableScrollSpy: !1,
                scrollSpyDelay: 200,
                scrollSpyOnce: !1
            }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.once = !1, this.count = function (t) {
                e.startTime || (e.startTime = t);
                const n = t - e.startTime;
                e.remaining = e.duration - n, e.useEasing ? e.countDown ? e.frameVal = e.startVal - e.easingFn(n, 0, e.startVal - e.endVal, e.duration) : e.frameVal = e.easingFn(n, e.startVal, e.endVal - e.startVal, e.duration) : e.frameVal = e.startVal + (e.endVal - e.startVal) * (n / e.duration);
                const i = e.countDown ? e.frameVal < e.endVal : e.frameVal > e.endVal;
                e.frameVal = i ? e.endVal : e.frameVal, e.frameVal = Number(e.frameVal.toFixed(e.options.decimalPlaces)), e.printValue(e.frameVal), n < e.duration ? e.rAF = requestAnimationFrame(e.count) : null !== e.finalEndVal ? e.update(e.finalEndVal) : e.callback && e.callback()
            }, this.formatNumber = function (t) {
                const n = t < 0 ? "-" : "";
                let i, s, a, o;
                i = Math.abs(t).toFixed(e.options.decimalPlaces), i += "";
                const r = i.split(".");
                if (s = r[0], a = r.length > 1 ? e.options.decimal + r[1] : "", e.options.useGrouping) {
                    o = "";
                    for (let t = 0, n = s.length; t < n; ++t) 0 !== t && t % 3 == 0 && (o = e.options.separator + o), o = s[n - t - 1] + o;
                    s = o
                }
                return e.options.numerals && e.options.numerals.length && (s = s.replace(/[0-9]/g, (function (t) {
                    return e.options.numerals[+t]
                })), a = a.replace(/[0-9]/g, (function (t) {
                    return e.options.numerals[+t]
                }))), n + e.options.prefix + s + a + e.options.suffix
            }, this.easeOutExpo = function (t, n, i, s) {
                return i * (1 - Math.pow(2, -10 * t / s)) * 1024 / 1023 + n
            }, this.options = t(t({}, this.defaults), s), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(i), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, "" === this.options.separator && (this.options.useGrouping = !1), this.el = "string" == typeof n ? document.getElementById(n) : n, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined", "undefined" != typeof window && this.options.enableScrollSpy && (this.error ? console.error(this.error, n) : (window.onScrollFns = window.onScrollFns || [], window.onScrollFns.push((function () {
                return e.handleScroll(e)
            })), window.onscroll = function () {
                window.onScrollFns.forEach((function (t) {
                    return t()
                }))
            }, this.handleScroll(this)))
        }

        return n.prototype.handleScroll = function (t) {
            if (!t || !window || t.once) return;
            const n = window.innerHeight + window.scrollY, i = t.el.getBoundingClientRect(),
                s = i.top + i.height + window.pageYOffset;
            s < n && s > window.scrollY && t.paused ? (t.paused = !1, setTimeout((function () {
                return t.start()
            }), t.options.scrollSpyDelay), t.options.scrollSpyOnce && (t.once = !0)) : window.scrollY > s && !t.paused && t.reset()
        }, n.prototype.determineDirectionAndSmartEasing = function () {
            const t = this.finalEndVal ? this.finalEndVal : this.endVal;
            this.countDown = this.startVal > t;
            const n = t - this.startVal;
            if (Math.abs(n) > this.options.smartEasingThreshold && this.options.useEasing) {
                this.finalEndVal = t;
                const n = this.countDown ? 1 : -1;
                this.endVal = t + n * this.options.smartEasingAmount, this.duration = this.duration / 2
            } else this.endVal = t, this.finalEndVal = null;
            null !== this.finalEndVal ? this.useEasing = !1 : this.useEasing = this.options.useEasing
        }, n.prototype.start = function (t) {
            this.error || (this.callback = t, this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal))
        }, n.prototype.pauseResume = function () {
            this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused
        }, n.prototype.reset = function () {
            cancelAnimationFrame(this.rAF), this.paused = !0, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal)
        }, n.prototype.update = function (t) {
            cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t), this.endVal !== this.frameVal && (this.startVal = this.frameVal, null == this.finalEndVal && this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count))
        }, n.prototype.printValue = function (t) {
            const n = this.formattingFn(t);
            "INPUT" === this.el.tagName ? this.el.value = n : "text" === this.el.tagName || "tspan" === this.el.tagName ? this.el.textContent = n : (this.el.innerHTML = n + "%", this.el.style.width = n + "%")
        }, n.prototype.ensureNumber = function (t) {
            return "number" == typeof t && !isNaN(t)
        }, n.prototype.validateValue = function (t) {
            const n = Number(t);
            return this.ensureNumber(n) ? n : (this.error = "[CountUp] invalid start or end value: ".concat(t), null)
        }, n.prototype.resetDuration = function () {
            this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration
        }, n
    }();
    !function () {
        const t = {
            animate() {
                const t = document.querySelectorAll(".bsb-skill-pro-2-progress");
                null != t && t.forEach((function (t) {
                    t.classList.contains("animate-initiated") || (new n(t, t.getAttribute("aria-valuenow"), {duration: 5}).start(), t.classList.add("animate-initiated"))
                }))
            }, handleIntersect(n, i) {
                n.forEach((n => {
                    n.isIntersecting && t.animate()
                }))
            }, init() {
                const n = {root: null, rootMargin: "0px", threshold: [.5]},
                    i = document.querySelector("#bsb-skill-pro-2-observer");
                null != i && new IntersectionObserver(t.handleIntersect, n).observe(i)
            }
        };
        "loading" === document.readyState && document.addEventListener("DOMContentLoaded", (function () {
        })), window.addEventListener("load", (function () {
            t.init()
        }), !1)
    }()
}();