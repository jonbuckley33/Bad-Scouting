define(["Ti/_/declare", "Ti/_/dom", "Ti/_/UI/Element", "Ti/_/lang", "Ti/_/string", "Ti/_/Layouts", "Ti/_/style", "Ti/UI"],
	function(declare, dom, Element, lang, string, Layouts, style, UI) {
		
	var unitize = dom.unitize,
		set = style.set,
		View;

	return View = declare("Ti.UI.View", Element, {

		_parent: null,

		constructor: function() {
			this.children = [];
			this.layout = "composite";
			this.containerNode = this.domNode;
		},

		add: function(view) {
			this._add(view);
		},

		remove: function(view) {
			this._remove(view);
		},

		destroy: function() {
			if (this.children) {
				var c;
				while (this.children.length) {
					c = this.children.splice(0, 1);
					c[0].destroy();
				}
			}
			Element.prototype.destroy.apply(this, arguments);
		},

		_getScrollableContentWidth: function() {
			return 600;
		},

		_getScrollablePosition: function() {
			return {x: 0, y: 0};
		},

		_createHorizontalScrollBar: function() {
			var scrollBar = this._horizontalScrollBar = dom.create("div", {
				className: "TiUIScrollBar",
				style: {
					position: 'absolute',
					zIndex: 0x7FFFFFFF, // Max (32-bit) z-index
					border: "3px solid #555",
					borderRadius: "3px",
					height: "0px",
					bottom: "0px",
					opacity: 0
				}
			}, this.domNode);
		},

		_destroyHorizontalScrollBar: function() {
			this._cancelPreviousAnimation();
			dom.destroy(this._horizontalScrollBar);
		},

		_createVerticalScrollBar: function() {
			var scrollBar = this._verticalScrollBar = dom.create("div", {
				className: "TiUIScrollBar",
				style: {
					position: 'absolute',
					zIndex: 0x7FFFFFFF, // Max (32-bit) z-index
					border: "3px solid #555",
					borderRadius: "3px",
					width: "0px",
					right: "0px",
					opacity: 0
				}
			}, this.domNode);
		},
		
		_destroyVerticalScrollBar: function() {
			this._cancelPreviousAnimation();
			dom.destroy(this._verticalScrollBar);
		},
		
		_cancelPreviousAnimation: function() {
			if (this._isScrollBarActive) {
				set(this._horizontalScrollBar,"transition","");
				set(this._verticalScrollBar,"transition","");
				clearTimeout(this._horizontalScrollBarTimer);
				clearTimeout(this._verticalScrollBarTimer);
			}
		},
		
		_startScrollBars: function(normalizedScrollPosition, visibleAreaRatio) {
			
			this._cancelPreviousAnimation();
			
			if (this._horizontalScrollBar && visibleAreaRatio.x < 1 && visibleAreaRatio.x > 0) {
				var startingX = normalizedScrollPosition.x,
					measuredWidth = this._measuredWidth;
				startingX < 0 && (startingX = 0);
				startingX > 1 && (startingX = 1);
				this._horizontalScrollBarWidth = (measuredWidth - 6) * visibleAreaRatio.x;
				this._horizontalScrollBarWidth < 10 && (this._horizontalScrollBarWidth = 10);
				set(this._horizontalScrollBar, {
					opacity: 0.5,
					left: unitize(startingX * (measuredWidth - this._horizontalScrollBarWidth - 6)),
					width: unitize(this._horizontalScrollBarWidth)
				});
				this._isScrollBarActive = true;
			}
			
			if (this._verticalScrollBar && visibleAreaRatio.y < 1 && visibleAreaRatio.y > 0) {
				var startingY = normalizedScrollPosition.y,
					measuredHeight = this._measuredHeight;
				startingY < 0 && (startingY = 0);
				startingY > 1 && (startingY = 1);
				this._verticalScrollBarHeight = (measuredHeight - 6) * visibleAreaRatio.y;
				this._verticalScrollBarHeight < 10 && (this._verticalScrollBarHeight = 10);
				set(this._verticalScrollBar, {
					opacity: 0.5,
					top: unitize(startingY * (measuredHeight - this._verticalScrollBarHeight - 6)),
					height: unitize(this._verticalScrollBarHeight)
				});
				this._isScrollBarActive = true;
			}
		},
		
		_updateScrollBars: function(normalizedScrollPosition) {
			if (!this._isScrollBarActive) {
				return;
			}
			
			if (this._horizontalScrollBar) {
				var newX = normalizedScrollPosition.x,
					measuredWidth = this._measuredWidth;
				newX < 0 && (newX = 0);
				newX > 1 && (newX = 1);
				set(this._horizontalScrollBar,"left",unitize(newX * (measuredWidth - this._horizontalScrollBarWidth - 6)));
			}
			
			if (this._verticalScrollBar) {
				var newY = normalizedScrollPosition.y,
					measuredHeight = this._measuredHeight;
				newY < 0 && (newY = 0);
				newY > 1 && (newY = 1);
				set(this._verticalScrollBar,"top",unitize(newY * (measuredHeight - this._verticalScrollBarHeight - 6)));
			}
		},
		
		_endScrollBars: function() {
			if (!this._isScrollBarActive) {
				return;
			}
			
			var self = this;
			if (this._horizontalScrollBar) {
				var horizontalScrollBar = this._horizontalScrollBar;
				if (horizontalScrollBar) {
					set(horizontalScrollBar,"transition","all 1s ease-in-out");
					setTimeout(function(){
						set(horizontalScrollBar,"opacity",0);
						self._horizontalScrollBarTimer = setTimeout(function(){
							self._isScrollBarActive = false;
							set(horizontalScrollBar,"transition","");
						},500);
					},0);
				}
			}
			
			if (this._verticalScrollBar) {
				var verticalScrollBar = this._verticalScrollBar;
				if (verticalScrollBar) {
					set(verticalScrollBar,"transition","all 1s ease-in-out");
					setTimeout(function(){
						set(verticalScrollBar,"opacity",0);
						self._verticalScrollBarTimer = setTimeout(function(){
							self._isScrollBarActive = false;
							set(verticalScrollBar,"transition","");
						},500);
					},0);
				}
			}
		},

		_defaultWidth: UI.FILL,

		_defaultHeight: UI.FILL,

		properties: {
			layout: {
				set: function(value) {
					var match = value.match(/^(horizontal|vertical)$/),
						value = match ? match[0] : "composite";

					if (this._layout) {
						this._layout.destroy();
						this._layout = null;
					}

					this._layout = new Layouts[string.capitalize(value)](this);

					return value;
				}
			}
		}

	});

});