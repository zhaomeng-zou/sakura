!
function(t) {
	var e = function(t) {
			var e = ["webkit", "Moz", "o", "ms"],
				n = "";
			for (var i in e) if (n = e[i] + "Transition", void 0 !== t.style[n]) return "-" + e[i].toLowerCase() + "-"
		}(document.createElement(n)),
		n = function() {
			function n(e, n) {
				this.settings = t.extend(!0, t.fn.PageSwitch.defaults, n || {}), this.element = e, this.init()
			}
			return n.prototype = {
				init: function() {
					var t = this;
					t.selectors = t.settings.selectors, t.sections = t.element.find(t.selectors.sections), t.section = t.element.find(t.selectors.section), t.direction = "vertical" == t.settings.direction, t.pagesCount = t.getPagesCount(), t.index = t.settings.index >= 0 && t.settings.index < t.pagesCount ? t.settings.index : 0, t.canScroll = !0, t.direction || t._initLayout(), t.settings.autoPlay && (t.settings.loop = !0, t.timer = null, t._autoPlay()), t.settings.pagination && t._initPaging()
				},
				getPagesCount: function() {
					return this.section.length
				},
				switchLength: function() {
					return this.direction ? this.element.height() : this.element.width()
				},
				_autoPlay: function() {
					function t() {
						e.timer = setTimeout(function() {
							e.next(), t()
						}, e.settings.interval)
					}
					var e = this;
					t()
				},
				_stopPlay: function() {
					clearTimeout(this.timer)
				},
				_initLayout: function() {
					var t = this,
						e = 100 * t.pagesCount + "%",
						n = (100 / t.pagesCount).toFixed(2) + "%";
					t.sections.width(e), t.section.width(n).css("float", "left")
				},
				_initPaging: function() {
					var t = this,
						e = t.selectors.pages.substring(1);
					t.activeClass = t.selectors.active.substring(1);
					for (var n = "<ul class='" + e + "'>", i = 0; i < t.pagesCount; i++) n += "<li></li>";
					n += "</ul>", t.element.append(n);
					var s = t.element.find(t.selectors.pages);
					t.pageItem = s.find("li"), t.pageItem.eq(t.index).addClass(t.activeClass), t.direction ? s.addClass("vertical") : s.addClass("horizontal"), t._initEvent()
				},
				_initEvent: function() {
					var e = this;
					e.element.on("click", e.selectors.pages + " li", function() {
						e.index = t(this).index(), e._scrollPage()
					}), e.element.on("mouseover", e.selectors.pages + " li", function() {
						e._stopPlay()
					}), e.element.on("mouseout", e.selectors.pages + " li", function() {
						e._autoPlay()
					}), e.element.on("mousewheel DOMMouseScroll", function(t) {
						if (e.canScroll) {
							var n = t.originalEvent.wheelDelta || -t.originalEvent.detail;
							n > 0 && (e.index && !e.settings.loop || e.settings.loop) ? e.prev() : n < 0 && (e.index < e.pagesCount - 1 && !e.settings.loop || e.settings.loop) && e.next()
						}
					}), e.settings.keyboard && t(window).on("keydown", function(t) {
						var n = t.keyCode;
						37 == n || 38 == n ? e.prev() : 39 != n && 40 != n || e.next()
					}), t(window).resize(function() {
						var t = e.switchLength(),
							n = e.settings.direction ? e.section.eq(e.index).offset().top : e.section.eq(e.index).offset().left;
						Math.abs(n) > t / 2 && e.index < e.pagesCount - 1 && e.index++, e.index && e._scrollPage()
					}), e.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function() {
						e.canScroll = !0, e.settings.callback && "function" === t.type(e.settings.callback) && e.settings.callback()
					})
				},
				prev: function() {
					var t = this;
					t.index > 0 ? t.index-- : t.settings.loop && (t.index = t.pagesCount - 1), t._scrollPage()
				},
				next: function() {
					var t = this;
					t.index < t.pagesCount - 1 ? t.index++ : t.settings.loop && (t.index = 0), t._scrollPage()
				},
				_scrollPage: function() {
					var n = this,
						i = n.section.eq(n.index).position();
					if (i) {
						if (n.canScroll = !1, e) {
							n.sections.css(e + "transition", "all " + n.settings.duration + "ms " + n.settings.easing);
							var s = n.direction ? "translateY(-" + i.top + "px)" : "translateX(-" + i.left + "px)";
							n.sections.css(e + "transform", s)
						} else {
							var o = n.direction ? {
								top: -i.top
							} : {
								left: -i.left
							};
							n.sections.animate(o, n.settings.duration, function() {
								n.canScroll = !0, n.settings.callback && "function" === t.type(n.settings.callback) && n.settings.callback()
							})
						}
						n.settings.pagination && n.pageItem.eq(n.index).addClass(n.activeClass).siblings("li").removeClass(n.activeClass)
					}
				}
			}, n
		}();
	t.fn.PageSwitch = function(e) {
		return this.each(function() {
			var i = t(this),
				s = i.data("PageSwitch");
			if (s || (s = new n(i, e), i.data("PageSwitch", s)), "string" === t.type(e)) return s[e]()
		})
	}, t.fn.PageSwitch.defaults = {
		selectors: {
			sections: ".sections",
			section: ".section",
			pages: ".pages",
			active: ".active"
		},
		index: 0,
		easing: "ease",
		duration: 500,
		loop: !1,
		pagination: !0,
		keyboard: !0,
		direction: "vertical",
		autoPlay: !0,
		interval: 3e3,
		callback: ""
	}, t(function() {
		t("[data-PageSwitch]").PageSwitch()
	})
}(jQuery);