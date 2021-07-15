jQuery(function () {
  initMobileNav();
  initOpenClose();
  initAccordion();
  initCustomForms();
  initSlickCarousel();
  initNumbers();
  initTabs();
});

// accordion menu init
function initAccordion() {
  jQuery(".accordion").slideAccordion({
    opener: ".opener",
    slider: ".slide",
    animSpeed: 300,
  });
}

// content tabs init
function initTabs() {
  jQuery(".tabset").tabset({
    tabLinks: "a",
    defaultTab: true,
  });
}

// accordion menu init
function initNumbers() {
  var mxlen = 100;
  var inp = $("input[name='me'] ");

  var count = 0;
  inp.bind("keyup", function () {
    count++;
    this.value = this.value.replace(/[^0-9]/, "");

    if (mxlen < inp.val().length) {
      // $( "#sp_name" ).append( document.createTextNode( "Hello" ) );
      $("#sp_name").html(
        document.createTextNode("Maximun allowed characters reached")
      );
      // this.value = this.value.replace(/[a-zA-Z0-9\.\,\-\_]/,'');
      inp.val("");
      inp.blur();
      inp.focus();
      // alert('max reached');
    }
    // console.log(inp.val().length);
  });
}

$("body").on("click", ".toggle-filters", function () {
  var $this = $(this),
    rangeWrapper = $(".range-slider-wrapper"),
    advancedFilters = $(".advanced-filters");

  if (!rangeWrapper.hasClass("filters-expanded")) {
    $this.html("Hide advanced filters");
    rangeWrapper.addClass("filters-expanded");
    advancedFilters.slideDown();

    $(".slider").each(function () {
      var minValue = Number(
          $(this).find(".min-value").attr("data-selected-value")
        ),
        maxValue = Number($(this).attr("data-max")),
        value = Number($(this).attr("data-value")),
        step = Number($(this).attr("data-step")),
        $this = $(this);

      $this.slider({
        range: true,
        values: [minValue, maxValue],
        slide: function (event, ui) {
          var selectedMin = ui.values[0],
            selectedMax = ui.values[1],
            currentValueMin = selectedMin,
            currentValueMax = selectedMax;
          if (selectedMin > 999) {
            currentValueMin = selectedMin / 1000 + "k";
            currentValueMax = selectedMax / 1000 + "k";
          }

          $this
            .find(".min-value")
            .html(currentValueMin)
            .attr("data-selected-value", selectedMin);
          $this
            .find(".max-value")
            .html(currentValueMax)
            .attr("data-selected-value", selectedMax);
        },
      });

      var currentValueMin = minValue,
        currentValueMax = maxValue;
      if (currentValueMin > 999) {
        currentValueMin = currentValueMin / 1000 + "k";
        currentValueMax = currentValueMax / 1000 + "k";
      }

      $this
        .find("span[tabindex]:first-of-type .value")
        .html(currentValueMin)
        .attr("data-selected-value", minValue);
      $this
        .find("span[tabindex]:last-of-type")
        .append('<span class="value max-value" data-selected-value></span>')
        .find(".value")
        .html(currentValueMax)
        .attr("data-selected-value", maxValue);
    });
  } else {
    $this.html("Show advanced filters");
    rangeWrapper.removeClass("filters-expanded");
    advancedFilters.slideUp();

    $(".slider").each(function () {
      var value = Number($(this).attr("data-value")),
        $this = $(this);

      $this.slider({
        value: value,
        range: "min",
        slide: function (event, ui) {
          var currentValue = ui.value;
		  
          if (currentValue > 999) {
            currentValue = currentValue / 1000 + "k";
          }
          $(this)
            .find(".value")
            .html(currentValue)
            .attr("data-selected-value", ui.value);
        },
      });
    });
  }
});

$(".slider").each(function () {
  var minValue = Number($(this).attr("data-min")),
    maxValue = Number($(this).attr("data-max")),
    value = Number($(this).attr("data-value")),
    step = Number($(this).attr("data-step")),
    $this = $(this);

  $this.slider({
    range: "min",
    value: value,
    min: minValue,
    max: maxValue,
    step: step,
    slide: function (event, ui) {
      var currentValue = ui.value;
      if (currentValue > 999) {
        currentValue = currentValue / 1000 + "k";
      }
      $(this)
        .find(".value")
        .html(currentValue)
        .attr("data-selected-value", ui.value);
    },
  });

  var sliderHandle = $this.find(".ui-slider-handle"),
    currentValue = sliderHandle.parent().attr("data-value");
  sliderHandle.append(
    '<span class="value min-value" data-selected-value="' +
      currentValue +
      '"></span>'
  );

  if (minValue > 999) {
    value = value / 1000 + "k";
  }
  $this.find(".value").html(value);
});

// initialize custom form elements
function initCustomForms() {
  jcf.setOptions("Select", {
    wrapNative: false,
    wrapNativeOnMobile: false,
    fakeDropInBody: false,
  });
  jcf.replaceAll();
}

// slick init
function initSlickCarousel() {
  jQuery(".slick-slider").slick({
    slidesToScroll: 1,
    slidesToShow: 3,
    rows: 0,
    centerMode: true,
    centerPadding: "0",
    prevArrow: '<button class="slick-prev"></button>',
    nextArrow: '<button class="slick-next"></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  });
}

// mobile menu init
function initMobileNav() {
  jQuery("body").mobileNav({
    menuActiveClass: "nav-active",
    menuOpener: ".nav-opener",
  });
  jQuery("body").mobileNav({
    menuActiveClass: "cart-active",
    menuOpener: ".cart-popup,.btn-close",
  });
  jQuery("body").mobileNav({
    menuActiveClass: "sort-active",
    menuOpener: ".sort-opener",
    hideOnClickOutside: true,
    menuDrop: ".drop",
  });
}

// open-close init
function initOpenClose() {
  jQuery(".left-col").openClose({
    activeClass: "active",
    opener: ".account-opener",
    slider: ".slide",
    animSpeed: 400,
    effect: "slide",
  });
  jQuery(".sidebar").openClose({
    activeClass: "active",
    opener: ".account-opener",
    slider: ".slide",
    animSpeed: 400,
    effect: "slide",
  });

  ResponsiveHelper.addRange({
    "..767": {
      on: function () {
        jQuery(".main-nav ul li.has-drop").openClose({
          activeClass: "active",
          opener: ".drop-opener",
          slider: ".dropdown",
          animSpeed: 400,
          effect: "slide",
        });
      },
      off: function () {
        jQuery(".open-close").openClose("destroy");
      },
    },
  });
}

/*
 * jQuery Tabs plugin
 */

(function ($, $win) {
  "use strict";

  function Tabset($holder, options) {
    this.$holder = $holder;
    this.options = options;

    this.init();
  }

  Tabset.prototype = {
    init: function () {
      this.$tabLinks = this.$holder.find(this.options.tabLinks);

      this.setStartActiveIndex();
      this.setActiveTab();

      if (this.options.autoHeight) {
        this.$tabHolder = $(
          this.$tabLinks.eq(0).attr(this.options.attrib)
        ).parent();
      }

      this.makeCallback("onInit", this);
    },

    setStartActiveIndex: function () {
      var $classTargets = this.getClassTarget(this.$tabLinks);
      var $activeLink = $classTargets.filter("." + this.options.activeClass);
      var $hashLink = this.$tabLinks.filter(
        "[" + this.options.attrib + '="' + location.hash + '"]'
      );
      var activeIndex;

      if (this.options.checkHash && $hashLink.length) {
        $activeLink = $hashLink;
      }

      activeIndex = $classTargets.index($activeLink);

      this.activeTabIndex = this.prevTabIndex =
        activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex;
    },

    setActiveTab: function () {
      var self = this;

      this.$tabLinks.each(function (i, link) {
        var $link = $(link);
        var $classTarget = self.getClassTarget($link);
        var $tab = $($link.attr(self.options.attrib));

        if (i !== self.activeTabIndex) {
          $classTarget.removeClass(self.options.activeClass);
          $tab
            .addClass(self.options.tabHiddenClass)
            .removeClass(self.options.activeClass);
        } else {
          $classTarget.addClass(self.options.activeClass);
          $tab
            .removeClass(self.options.tabHiddenClass)
            .addClass(self.options.activeClass);
        }

        self.attachTabLink($link, i);
      });
    },

    attachTabLink: function ($link, i) {
      var self = this;

      $link.on(this.options.event + ".tabset", function (e) {
        e.preventDefault();

        if (
          self.activeTabIndex === self.prevTabIndex &&
          self.activeTabIndex !== i
        ) {
          self.activeTabIndex = i;
          self.switchTabs();
        }
        if (self.options.checkHash) {
          location.hash = jQuery(this).attr("href").split("#")[1];
        }
      });
    },

    resizeHolder: function (height) {
      var self = this;

      if (height) {
        this.$tabHolder.height(height);
        setTimeout(function () {
          self.$tabHolder.addClass("transition");
        }, 10);
      } else {
        self.$tabHolder.removeClass("transition").height("");
      }
    },

    switchTabs: function () {
      var self = this;

      var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
      var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

      var $prevTab = this.getTab($prevLink);
      var $nextTab = this.getTab($nextLink);

      $prevTab.removeClass(this.options.activeClass);

      if (self.haveTabHolder()) {
        this.resizeHolder($prevTab.outerHeight());
      }

      setTimeout(
        function () {
          self.getClassTarget($prevLink).removeClass(self.options.activeClass);

          $prevTab.addClass(self.options.tabHiddenClass);
          $nextTab
            .removeClass(self.options.tabHiddenClass)
            .addClass(self.options.activeClass);

          self.getClassTarget($nextLink).addClass(self.options.activeClass);

          if (self.haveTabHolder()) {
            self.resizeHolder($nextTab.outerHeight());

            setTimeout(function () {
              self.resizeHolder();
              self.prevTabIndex = self.activeTabIndex;
              self.makeCallback("onChange", self);
            }, self.options.animSpeed);
          } else {
            self.prevTabIndex = self.activeTabIndex;
          }
        },
        this.options.autoHeight ? this.options.animSpeed : 1
      );
    },

    getClassTarget: function ($link) {
      return this.options.addToParent ? $link.parent() : $link;
    },

    getActiveTab: function () {
      return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
    },

    getTab: function ($link) {
      return $($link.attr(this.options.attrib));
    },

    haveTabHolder: function () {
      return this.$tabHolder && this.$tabHolder.length;
    },

    destroy: function () {
      var self = this;

      this.$tabLinks.off(".tabset").each(function () {
        var $link = $(this);

        self.getClassTarget($link).removeClass(self.options.activeClass);
        $($link.attr(self.options.attrib)).removeClass(
          self.options.activeClass + " " + self.options.tabHiddenClass
        );
      });

      this.$holder.removeData("Tabset");
    },

    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
  };

  $.fn.tabset = function (opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    var options = $.extend(
      {
        activeClass: "active",
        addToParent: false,
        autoHeight: false,
        checkHash: false,
        defaultTab: true,
        animSpeed: 500,
        tabLinks: "a",
        attrib: "href",
        event: "click",
        tabHiddenClass: "js-tab-hidden",
      },
      opt
    );
    options.autoHeight = options.autoHeight;

    return this.each(function () {
      var $holder = jQuery(this);
      var instance = $holder.data("Tabset");

      if (typeof opt === "object" || typeof opt === "undefined") {
        $holder.data("Tabset", new Tabset($holder, options));
      } else if (typeof method === "string" && instance) {
        if (typeof instance[method] === "function") {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
})(jQuery, jQuery(window));

/*
 * jQuery Open/Close plugin
 */
(function ($) {
  function OpenClose(options) {
    this.options = $.extend(
      {
        addClassBeforeAnimation: true,
        hideOnClickOutside: false,
        activeClass: "active",
        opener: ".opener",
        slider: ".slide",
        animSpeed: 400,
        effect: "fade",
        event: "click",
      },
      options
    );
    this.init();
  }
  OpenClose.prototype = {
    init: function () {
      if (this.options.holder) {
        this.findElements();
        this.attachEvents();
        this.makeCallback("onInit", this);
      }
    },
    findElements: function () {
      this.holder = $(this.options.holder);
      this.opener = this.holder.find(this.options.opener);
      this.slider = this.holder.find(this.options.slider);
    },
    attachEvents: function () {
      // add handler
      var self = this;
      this.eventHandler = function (e) {
        e.preventDefault();
        if (self.slider.hasClass(slideHiddenClass)) {
          self.showSlide();
        } else {
          self.hideSlide();
        }
      };
      self.opener.on(self.options.event, this.eventHandler);

      // hover mode handler
      if (self.options.event === "hover") {
        self.opener.on("mouseenter", function () {
          if (!self.holder.hasClass(self.options.activeClass)) {
            self.showSlide();
          }
        });
        self.holder.on("mouseleave", function () {
          self.hideSlide();
        });
      }

      // outside click handler
      self.outsideClickHandler = function (e) {
        if (self.options.hideOnClickOutside) {
          var target = $(e.target);
          if (!target.is(self.holder) && !target.closest(self.holder).length) {
            self.hideSlide();
          }
        }
      };

      // set initial styles
      if (this.holder.hasClass(this.options.activeClass)) {
        $(document).on("click touchstart", self.outsideClickHandler);
      } else {
        this.slider.addClass(slideHiddenClass);
      }
    },
    showSlide: function () {
      var self = this;
      if (self.options.addClassBeforeAnimation) {
        self.holder.addClass(self.options.activeClass);
      }
      self.slider.removeClass(slideHiddenClass);
      $(document).on("click touchstart", self.outsideClickHandler);

      self.makeCallback("animStart", true);
      toggleEffects[self.options.effect].show({
        box: self.slider,
        speed: self.options.animSpeed,
        complete: function () {
          if (!self.options.addClassBeforeAnimation) {
            self.holder.addClass(self.options.activeClass);
          }
          self.makeCallback("animEnd", true);
        },
      });
    },
    hideSlide: function () {
      var self = this;
      if (self.options.addClassBeforeAnimation) {
        self.holder.removeClass(self.options.activeClass);
      }
      $(document).off("click touchstart", self.outsideClickHandler);

      self.makeCallback("animStart", false);
      toggleEffects[self.options.effect].hide({
        box: self.slider,
        speed: self.options.animSpeed,
        complete: function () {
          if (!self.options.addClassBeforeAnimation) {
            self.holder.removeClass(self.options.activeClass);
          }
          self.slider.addClass(slideHiddenClass);
          self.makeCallback("animEnd", false);
        },
      });
    },
    destroy: function () {
      this.slider.removeClass(slideHiddenClass).css({
        display: "",
      });
      this.opener.off(this.options.event, this.eventHandler);
      this.holder.removeClass(this.options.activeClass).removeData("OpenClose");
      $(document).off("click touchstart", this.outsideClickHandler);
    },
    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
  };

  // add stylesheet for slide on DOMReady
  var slideHiddenClass = "js-slide-hidden";
  (function () {
    var tabStyleSheet = $('<style type="text/css">')[0];
    var tabStyleRule = "." + slideHiddenClass;
    tabStyleRule +=
      "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}";
    if (tabStyleSheet.styleSheet) {
      tabStyleSheet.styleSheet.cssText = tabStyleRule;
    } else {
      tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
    }
    $("head").append(tabStyleSheet);
  })();

  // animation effects
  var toggleEffects = {
    slide: {
      show: function (o) {
        o.box.stop(true).hide().slideDown(o.speed, o.complete);
      },
      hide: function (o) {
        o.box.stop(true).slideUp(o.speed, o.complete);
      },
    },
    fade: {
      show: function (o) {
        o.box.stop(true).hide().fadeIn(o.speed, o.complete);
      },
      hide: function (o) {
        o.box.stop(true).fadeOut(o.speed, o.complete);
      },
    },
    none: {
      show: function (o) {
        o.box.hide().show(0, o.complete);
      },
      hide: function (o) {
        o.box.hide(0, o.complete);
      },
    },
  };

  // jQuery plugin interface
  $.fn.openClose = function (opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function () {
      var $holder = jQuery(this);
      var instance = $holder.data("OpenClose");

      if (typeof opt === "object" || typeof opt === "undefined") {
        $holder.data(
          "OpenClose",
          new OpenClose(
            $.extend(
              {
                holder: this,
              },
              opt
            )
          )
        );
      } else if (typeof method === "string" && instance) {
        if (typeof instance[method] === "function") {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
})(jQuery);

/*
 * Responsive Layout helper
 */
window.ResponsiveHelper = (function ($) {
  // init variables
  var handlers = [],
    prevWinWidth,
    win = $(window),
    nativeMatchMedia = false;

  // detect match media support
  if (window.matchMedia) {
    if (window.Window && window.matchMedia === Window.prototype.matchMedia) {
      nativeMatchMedia = true;
    } else if (window.matchMedia.toString().indexOf("native") > -1) {
      nativeMatchMedia = true;
    }
  }

  // prepare resize handler
  function resizeHandler() {
    var winWidth = win.width();
    if (winWidth !== prevWinWidth) {
      prevWinWidth = winWidth;

      // loop through range groups
      $.each(handlers, function (index, rangeObject) {
        // disable current active area if needed
        $.each(rangeObject.data, function (property, item) {
          if (item.currentActive && !matchRange(item.range[0], item.range[1])) {
            item.currentActive = false;
            if (typeof item.disableCallback === "function") {
              item.disableCallback();
            }
          }
        });

        // enable areas that match current width
        $.each(rangeObject.data, function (property, item) {
          if (!item.currentActive && matchRange(item.range[0], item.range[1])) {
            // make callback
            item.currentActive = true;
            if (typeof item.enableCallback === "function") {
              item.enableCallback();
            }
          }
        });
      });
    }
  }
  win.bind("load resize orientationchange", resizeHandler);

  // test range
  function matchRange(r1, r2) {
    var mediaQueryString = "";
    if (r1 > 0) {
      mediaQueryString += "(min-width: " + r1 + "px)";
    }
    if (r2 < Infinity) {
      mediaQueryString +=
        (mediaQueryString ? " and " : "") + "(max-width: " + r2 + "px)";
    }
    return matchQuery(mediaQueryString, r1, r2);
  }

  // media query function
  function matchQuery(query, r1, r2) {
    if (window.matchMedia && nativeMatchMedia) {
      return matchMedia(query).matches;
    } else if (window.styleMedia) {
      return styleMedia.matchMedium(query);
    } else if (window.media) {
      return media.matchMedium(query);
    } else {
      return prevWinWidth >= r1 && prevWinWidth <= r2;
    }
  }

  // range parser
  function parseRange(rangeStr) {
    var rangeData = rangeStr.split("..");
    var x1 = parseInt(rangeData[0], 10) || -Infinity;
    var x2 = parseInt(rangeData[1], 10) || Infinity;
    return [x1, x2].sort(function (a, b) {
      return a - b;
    });
  }

  // export public functions
  return {
    addRange: function (ranges) {
      // parse data and add items to collection
      var result = { data: {} };
      $.each(ranges, function (property, data) {
        result.data[property] = {
          range: parseRange(property),
          enableCallback: data.on,
          disableCallback: data.off,
        };
      });
      handlers.push(result);

      // call resizeHandler to recalculate all events
      prevWinWidth = null;
      resizeHandler();
    },
  };
})(jQuery);

/*
 * Simple Mobile Navigation
 */
(function ($) {
  function MobileNav(options) {
    this.options = $.extend(
      {
        container: null,
        hideOnClickOutside: false,
        menuActiveClass: "nav-active",
        menuOpener: ".nav-opener",
        menuDrop: ".nav-drop",
        toggleEvent: "click",
        outsideClickEvent: "click touchstart pointerdown MSPointerDown",
      },
      options
    );
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function () {
      this.page = $("html");
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function () {
      var self = this;

      if (activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }

      this.outsideClickHandler = function (e) {
        if (self.isOpened()) {
          var target = $(e.target);
          if (
            !target.closest(self.opener).length &&
            !target.closest(self.drop).length
          ) {
            self.hide();
          }
        }
      };

      this.openerClickHandler = function (e) {
        e.preventDefault();
        self.toggle();
      };

      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function () {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function () {
      this.container.addClass(this.options.menuActiveClass);
      if (this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function () {
      this.container.removeClass(this.options.menuActiveClass);
      if (this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function () {
      if (this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function () {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    },
  };

  var activateResizeHandler = function () {
    var win = $(window),
      doc = $("html"),
      resizeClass = "resize-active",
      flag,
      timer;
    var removeClassHandler = function () {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function () {
      if (!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on("resize orientationchange", resizeHandler);
  };

  $.fn.mobileNav = function (opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function () {
      var $container = jQuery(this);
      var instance = $container.data("MobileNav");

      if (typeof opt === "object" || typeof opt === "undefined") {
        $container.data(
          "MobileNav",
          new MobileNav(
            $.extend(
              {
                container: this,
              },
              opt
            )
          )
        );
      } else if (typeof method === "string" && instance) {
        if (typeof instance[method] === "function") {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
})(jQuery);

/*
 * jQuery Accordion plugin new
 */
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.SlideAccordion = factory(jQuery);
  }
})(this, function ($) {
  "use strict";
  var accHiddenClass = "js-acc-hidden";

  function SlideAccordion(options) {
    this.options = $.extend(
      true,
      {
        allowClickWhenExpanded: false,
        activeClass: "active",
        opener: ".opener",
        slider: ".slide",
        animSpeed: 300,
        collapsible: true,
        event: "click",
        scrollToActiveItem: {
          enable: false,
          breakpoint: 767, // max-width
          animSpeed: 600,
          extraOffset: null,
        },
      },
      options
    );
    this.init();
  }

  SlideAccordion.prototype = {
    init: function () {
      if (this.options.holder) {
        this.findElements();
        this.setStateOnInit();
        this.attachEvents();
        this.makeCallback("onInit");
      }
    },

    findElements: function () {
      this.$holder = $(this.options.holder).data("SlideAccordion", this);
      this.$items = this.$holder.find(":has(" + this.options.slider + ")");
    },

    setStateOnInit: function () {
      var self = this;

      this.$items.each(function () {
        if (!$(this).hasClass(self.options.activeClass)) {
          $(this).find(self.options.slider).addClass(accHiddenClass);
        }
      });
    },

    attachEvents: function () {
      var self = this;

      this.accordionToggle = function (e) {
        var $item = jQuery(this).closest(self.$items);
        var $actiItem = self.getActiveItem($item);

        if (
          !self.options.allowClickWhenExpanded ||
          !$item.hasClass(self.options.activeClass)
        ) {
          e.preventDefault();
          self.toggle($item, $actiItem);
        }
      };

      this.$items.on(
        this.options.event,
        this.options.opener,
        this.accordionToggle
      );
    },

    toggle: function ($item, $prevItem) {
      if (!$item.hasClass(this.options.activeClass)) {
        this.show($item);
      } else if (this.options.collapsible) {
        this.hide($item);
      }

      if (!$item.is($prevItem) && $prevItem.length) {
        this.hide($prevItem);
      }

      this.makeCallback("beforeToggle");
    },

    show: function ($item) {
      var $slider = $item.find(this.options.slider);

      $item.addClass(this.options.activeClass);
      $slider
        .stop()
        .hide()
        .removeClass(accHiddenClass)
        .slideDown({
          duration: this.options.animSpeed,
          complete: function () {
            $slider.removeAttr("style");
            if (
              this.options.scrollToActiveItem.enable &&
              window.innerWidth <= this.options.scrollToActiveItem.breakpoint
            ) {
              this.goToItem($item);
            }
            this.makeCallback("onShow", $item);
          }.bind(this),
        });

      this.makeCallback("beforeShow", $item);
    },

    hide: function ($item) {
      var $slider = $item.find(this.options.slider);

      $item.removeClass(this.options.activeClass);
      $slider
        .stop()
        .show()
        .slideUp({
          duration: this.options.animSpeed,
          complete: function () {
            $slider.addClass(accHiddenClass);
            $slider.removeAttr("style");
            this.makeCallback("onHide", $item);
          }.bind(this),
        });

      this.makeCallback("beforeHide", $item);
    },

    goToItem: function ($item) {
      var itemOffset = $item.offset().top;

      if (itemOffset < $(window).scrollTop()) {
        // handle extra offset
        if (typeof this.options.scrollToActiveItem.extraOffset === "number") {
          itemOffset -= this.options.scrollToActiveItem.extraOffset;
        } else if (
          typeof this.options.scrollToActiveItem.extraOffset === "function"
        ) {
          itemOffset -= this.options.scrollToActiveItem.extraOffset();
        }

        $("body, html").animate(
          {
            scrollTop: itemOffset,
          },
          this.options.scrollToActiveItem.animSpeed
        );
      }
    },

    getActiveItem: function ($item) {
      return $item.siblings().filter("." + this.options.activeClass);
    },

    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },

    destroy: function () {
      this.$holder.removeData("SlideAccordion");
      this.$items.off(
        this.options.event,
        this.options.opener,
        this.accordionToggle
      );
      this.$items.removeClass(this.options.activeClass).each(
        function (i, item) {
          $(item)
            .find(this.options.slider)
            .removeAttr("style")
            .removeClass(accHiddenClass);
        }.bind(this)
      );
      this.makeCallback("onDestroy");
    },
  };

  $.fn.slideAccordion = function (opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function () {
      var $holder = jQuery(this);
      var instance = $holder.data("SlideAccordion");

      if (typeof opt === "object" || typeof opt === "undefined") {
        new SlideAccordion(
          $.extend(
            true,
            {
              holder: this,
            },
            opt
          )
        );
      } else if (typeof method === "string" && instance) {
        if (typeof instance[method] === "function") {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };

  (function () {
    var tabStyleSheet = $('<style type="text/css">')[0];
    var tabStyleRule = "." + accHiddenClass;
    tabStyleRule +=
      "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important; width: 100% !important;}";
    if (tabStyleSheet.styleSheet) {
      tabStyleSheet.styleSheet.cssText = tabStyleRule;
    } else {
      tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
    }
    $("head").append(tabStyleSheet);
  })();

  return SlideAccordion;
});

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.jcf = factory(jQuery);
  }
})(this, function ($) {
  "use strict";

  // define version
  var version = "1.1.3";

  // private variables
  var customInstances = [];

  // default global options
  var commonOptions = {
    optionsKey: "jcf",
    dataKey: "jcf-instance",
    rtlClass: "jcf-rtl",
    focusClass: "jcf-focus",
    pressedClass: "jcf-pressed",
    disabledClass: "jcf-disabled",
    hiddenClass: "jcf-hidden",
    resetAppearanceClass: "jcf-reset-appearance",
    unselectableClass: "jcf-unselectable",
  };

  // detect device type
  var isTouchDevice =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch),
    isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

  var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
  if (isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, "."));
  commonOptions.ios = isIOS;

  // create global stylesheet if custom forms are used
  var createStyleSheet = function () {
    var styleTag = $("<style>").appendTo("head"),
      styleSheet = styleTag.prop("sheet") || styleTag.prop("styleSheet");

    // crossbrowser style handling
    var addCSSRule = function (selector, rules, index) {
      if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + "{" + rules + "}", index);
      } else {
        styleSheet.addRule(selector, rules, index);
      }
    };

    // add special rules
    addCSSRule(
      "." + commonOptions.hiddenClass,
      "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"
    );
    addCSSRule(
      "." + commonOptions.rtlClass + " ." + commonOptions.hiddenClass,
      "right:-9999px !important; left: auto !important"
    );
    addCSSRule(
      "." + commonOptions.unselectableClass,
      "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"
    );
    addCSSRule(
      "." + commonOptions.resetAppearanceClass,
      "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);"
    );

    // detect rtl pages
    var html = $("html"),
      body = $("body");
    if (html.css("direction") === "rtl" || body.css("direction") === "rtl") {
      html.addClass(commonOptions.rtlClass);
    }

    // handle form reset event
    html.on("reset", function () {
      setTimeout(function () {
        api.refreshAll();
      }, 0);
    });

    // mark stylesheet as created
    commonOptions.styleSheetCreated = true;
  };

  // simplified pointer events handler
  (function () {
    var pointerEventsSupported =
        navigator.pointerEnabled || navigator.msPointerEnabled,
      touchEventsSupported =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch),
      eventList,
      eventMap = {},
      eventPrefix = "jcf-";

    // detect events to attach
    if (pointerEventsSupported) {
      eventList = {
        pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
        pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
        pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
        pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp",
      };
    } else {
      eventList = {
        pointerover: "mouseover",
        pointerdown: "mousedown" + (touchEventsSupported ? " touchstart" : ""),
        pointermove: "mousemove" + (touchEventsSupported ? " touchmove" : ""),
        pointerup: "mouseup" + (touchEventsSupported ? " touchend" : ""),
      };
    }

    // create event map
    $.each(eventList, function (targetEventName, fakeEventList) {
      $.each(fakeEventList.split(" "), function (index, fakeEventName) {
        eventMap[fakeEventName] = targetEventName;
      });
    });

    // jQuery event hooks
    $.each(eventList, function (eventName, eventHandlers) {
      eventHandlers = eventHandlers.split(" ");
      $.event.special[eventPrefix + eventName] = {
        setup: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.addEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = fixEvent;
          });
        },
        teardown: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.removeEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = null;
          });
        },
      };
    });

    // check that mouse event are not simulated by mobile browsers
    var lastTouch = null;
    var mouseEventSimulated = function (e) {
      var dx = Math.abs(e.pageX - lastTouch.x),
        dy = Math.abs(e.pageY - lastTouch.y),
        rangeDistance = 25;

      if (dx <= rangeDistance && dy <= rangeDistance) {
        return true;
      }
    };

    // normalize event
    var fixEvent = function (e) {
      var origEvent = e || window.event,
        touchEventData = null,
        targetEventName = eventMap[origEvent.type];

      e = $.event.fix(origEvent);
      e.type = eventPrefix + targetEventName;

      if (origEvent.pointerType) {
        switch (origEvent.pointerType) {
          case 2:
            e.pointerType = "touch";
            break;
          case 3:
            e.pointerType = "pen";
            break;
          case 4:
            e.pointerType = "mouse";
            break;
          default:
            e.pointerType = origEvent.pointerType;
        }
      } else {
        e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
      }

      if (!e.pageX && !e.pageY) {
        touchEventData = origEvent.changedTouches
          ? origEvent.changedTouches[0]
          : origEvent;
        e.pageX = touchEventData.pageX;
        e.pageY = touchEventData.pageY;
      }

      if (origEvent.type === "touchend") {
        lastTouch = { x: e.pageX, y: e.pageY };
      }
      if (e.pointerType === "mouse" && lastTouch && mouseEventSimulated(e)) {
        return;
      } else {
        return ($.event.dispatch || $.event.handle).call(this, e);
      }
    };
  })();

  // custom mousewheel/trackpad handler
  (function () {
    var wheelEvents = (
        "onwheel" in document || document.documentMode >= 9
          ? "wheel"
          : "mousewheel DOMMouseScroll"
      ).split(" "),
      shimEventName = "jcf-mousewheel";

    $.event.special[shimEventName] = {
      setup: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.addEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = fixEvent;
        });
      },
      teardown: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.removeEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = null;
        });
      },
    };

    var fixEvent = function (e) {
      var origEvent = e || window.event;
      e = $.event.fix(origEvent);
      e.type = shimEventName;

      // old wheel events handler
      if ("detail" in origEvent) {
        e.deltaY = -origEvent.detail;
      }
      if ("wheelDelta" in origEvent) {
        e.deltaY = -origEvent.wheelDelta;
      }
      if ("wheelDeltaY" in origEvent) {
        e.deltaY = -origEvent.wheelDeltaY;
      }
      if ("wheelDeltaX" in origEvent) {
        e.deltaX = -origEvent.wheelDeltaX;
      }

      // modern wheel event handler
      if ("deltaY" in origEvent) {
        e.deltaY = origEvent.deltaY;
      }
      if ("deltaX" in origEvent) {
        e.deltaX = origEvent.deltaX;
      }

      // handle deltaMode for mouse wheel
      e.delta = e.deltaY || e.deltaX;
      if (origEvent.deltaMode === 1) {
        var lineHeight = 16;
        e.delta *= lineHeight;
        e.deltaY *= lineHeight;
        e.deltaX *= lineHeight;
      }

      return ($.event.dispatch || $.event.handle).call(this, e);
    };
  })();

  // extra module methods
  var moduleMixin = {
    // provide function for firing native events
    fireNativeEvent: function (elements, eventName) {
      $(elements).each(function () {
        var element = this,
          eventObject;
        if (element.dispatchEvent) {
          eventObject = document.createEvent("HTMLEvents");
          eventObject.initEvent(eventName, true, true);
          element.dispatchEvent(eventObject);
        } else if (document.createEventObject) {
          eventObject = document.createEventObject();
          eventObject.target = element;
          element.fireEvent("on" + eventName, eventObject);
        }
      });
    },
    // bind event handlers for module instance (functions beggining with "on")
    bindHandlers: function () {
      var self = this;
      $.each(self, function (propName, propValue) {
        if (propName.indexOf("on") === 0 && $.isFunction(propValue)) {
          // dont use $.proxy here because it doesn't create unique handler
          self[propName] = function () {
            return propValue.apply(self, arguments);
          };
        }
      });
    },
  };

  // public API
  var api = {
    version: version,
    modules: {},
    getOptions: function () {
      return $.extend({}, commonOptions);
    },
    setOptions: function (moduleName, moduleOptions) {
      if (arguments.length > 1) {
        // set module options
        if (this.modules[moduleName]) {
          $.extend(this.modules[moduleName].prototype.options, moduleOptions);
        }
      } else {
        // set common options
        $.extend(commonOptions, moduleName);
      }
    },
    addModule: function (proto) {
      // add module to list
      var Module = function (options) {
        // save instance to collection
        if (!options.element.data(commonOptions.dataKey)) {
          options.element.data(commonOptions.dataKey, this);
        }
        customInstances.push(this);

        // save options
        this.options = $.extend(
          {},
          commonOptions,
          this.options,
          getInlineOptions(options.element),
          options
        );

        // bind event handlers to instance
        this.bindHandlers();

        // call constructor
        this.init.apply(this, arguments);
      };

      // parse options from HTML attribute
      var getInlineOptions = function (element) {
        var dataOptions = element.data(commonOptions.optionsKey),
          attrOptions = element.attr(commonOptions.optionsKey);

        if (dataOptions) {
          return dataOptions;
        } else if (attrOptions) {
          try {
            return $.parseJSON(attrOptions);
          } catch (e) {
            // ignore invalid attributes
          }
        }
      };

      // set proto as prototype for new module
      Module.prototype = proto;

      // add mixin methods to module proto
      $.extend(proto, moduleMixin);
      if (proto.plugins) {
        $.each(proto.plugins, function (pluginName, plugin) {
          $.extend(plugin.prototype, moduleMixin);
        });
      }

      // override destroy method
      var originalDestroy = Module.prototype.destroy;
      Module.prototype.destroy = function () {
        this.options.element.removeData(this.options.dataKey);

        for (var i = customInstances.length - 1; i >= 0; i--) {
          if (customInstances[i] === this) {
            customInstances.splice(i, 1);
            break;
          }
        }

        if (originalDestroy) {
          originalDestroy.apply(this, arguments);
        }
      };

      // save module to list
      this.modules[proto.name] = Module;
    },
    getInstance: function (element) {
      return $(element).data(commonOptions.dataKey);
    },
    replace: function (elements, moduleName, customOptions) {
      var self = this,
        instance;

      if (!commonOptions.styleSheetCreated) {
        createStyleSheet();
      }

      $(elements).each(function () {
        var moduleOptions,
          element = $(this);

        instance = element.data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        } else {
          if (!moduleName) {
            $.each(self.modules, function (currentModuleName, module) {
              if (
                module.prototype.matchElement.call(module.prototype, element)
              ) {
                moduleName = currentModuleName;
                return false;
              }
            });
          }
          if (moduleName) {
            moduleOptions = $.extend({ element: element }, customOptions);
            instance = new self.modules[moduleName](moduleOptions);
          }
        }
      });
      return instance;
    },
    refresh: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        }
      });
    },
    destroy: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.destroy();
        }
      });
    },
    replaceAll: function (context) {
      var self = this;
      $.each(this.modules, function (moduleName, module) {
        $(module.prototype.selector, context).each(function () {
          if (this.className.indexOf("jcf-ignore") < 0) {
            self.replace(this, moduleName);
          }
        });
      });
    },
    refreshAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function () {
            var instance = $(this).data(commonOptions.dataKey);
            if (instance) {
              instance.refresh();
            }
          });
        });
      } else {
        for (var i = customInstances.length - 1; i >= 0; i--) {
          customInstances[i].refresh();
        }
      }
    },
    destroyAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function (index, element) {
            var instance = $(element).data(commonOptions.dataKey);
            if (instance) {
              instance.destroy();
            }
          });
        });
      } else {
        while (customInstances.length) {
          customInstances[0].destroy();
        }
      }
    },
  };

  // always export API to the global window object
  window.jcf = api;

  return api;
});

/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($, window) {
  "use strict";

  jcf.addModule({
    name: "Select",
    selector: "select",
    options: {
      element: null,
      multipleCompactStyle: false,
    },
    plugins: {
      ListBox: ListBox,
      ComboBox: ComboBox,
      SelectList: SelectList,
    },
    matchElement: function (element) {
      return element.is("select");
    },
    init: function () {
      this.element = $(this.options.element);
      this.createInstance();
    },
    isListBox: function () {
      return this.element.is("[size]:not([jcf-size]), [multiple]");
    },
    createInstance: function () {
      if (this.instance) {
        this.instance.destroy();
      }
      if (this.isListBox() && !this.options.multipleCompactStyle) {
        this.instance = new ListBox(this.options);
      } else {
        this.instance = new ComboBox(this.options);
      }
    },
    refresh: function () {
      var typeMismatch =
        (this.isListBox() && this.instance instanceof ComboBox) ||
        (!this.isListBox() && this.instance instanceof ListBox);

      if (typeMismatch) {
        this.createInstance();
      } else {
        this.instance.refresh();
      }
    },
    destroy: function () {
      this.instance.destroy();
    },
  });

  // combobox module
  function ComboBox(options) {
    this.options = $.extend(
      {
        wrapNative: true,
        wrapNativeOnMobile: true,
        fakeDropInBody: true,
        useCustomScroll: true,
        flipDropToFit: true,
        maxVisibleItems: 10,
        fakeAreaStructure:
          '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
        fakeDropStructure:
          '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
        optionClassPrefix: "jcf-option-",
        selectClassPrefix: "jcf-select-",
        dropContentSelector: ".jcf-select-drop-content",
        selectTextSelector: ".jcf-select-text",
        dropActiveClass: "jcf-drop-active",
        flipDropClass: "jcf-drop-flipped",
      },
      options
    );
    this.init();
  }
  $.extend(ComboBox.prototype, {
    init: function () {
      this.initStructure();
      this.bindHandlers();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function () {
      // prepare structure
      this.win = $(window);
      this.doc = $(document);
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(
        this.realElement
      );
      this.selectTextContainer = this.fakeElement.find(
        this.options.selectTextSelector
      );
      this.selectText = $("<span></span>").appendTo(this.selectTextContainer);
      makeUnselectable(this.fakeElement);

      // copy classes from original select
      this.fakeElement.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );

      // handle compact multiple style
      if (this.realElement.prop("multiple")) {
        this.fakeElement.addClass("jcf-compact-multiple");
      }

      // detect device type and dropdown behavior
      if (
        this.options.isMobileDevice &&
        this.options.wrapNativeOnMobile &&
        !this.options.wrapNative
      ) {
        this.options.wrapNative = true;
      }

      if (this.options.wrapNative) {
        // wrap native select inside fake block
        this.realElement
          .prependTo(this.fakeElement)
          .css({
            position: "absolute",
            height: "100%",
            width: "100%",
          })
          .addClass(this.options.resetAppearanceClass);
      } else {
        // just hide native select
        this.realElement.addClass(this.options.hiddenClass);
        this.fakeElement.attr("title", this.realElement.attr("title"));
        this.fakeDropTarget = this.options.fakeDropInBody
          ? $("body")
          : this.fakeElement;
      }
    },
    attachEvents: function () {
      // delayed refresh handler
      var self = this;
      this.delayedRefresh = function () {
        setTimeout(function () {
          self.refresh();
          if (self.list) {
            self.list.refresh();
            self.list.scrollToActiveOption();
          }
        }, 1);
      };

      // native dropdown event handlers
      if (this.options.wrapNative) {
        this.realElement.on({
          focus: this.onFocus,
          change: this.onChange,
          click: this.onChange,
          keydown: this.onChange,
        });
      } else {
        // custom dropdown event handlers
        this.realElement.on({
          focus: this.onFocus,
          change: this.onChange,
          keydown: this.onKeyDown,
        });
        this.fakeElement.on({
          "jcf-pointerdown": this.onSelectAreaPress,
        });
      }
    },
    onKeyDown: function (e) {
      if (e.which === 13) {
        this.toggleDropdown();
      } else if (this.dropActive) {
        this.delayedRefresh();
      }
    },
    onChange: function () {
      this.refresh();
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
        this.toggleListMode(true);
        this.focusedFlag = true;
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
        this.toggleListMode(false);
        this.focusedFlag = false;
      }
    },
    onResize: function () {
      if (this.dropActive) {
        this.hideDropdown();
      }
    },
    onSelectDropPress: function () {
      this.pressedFlag = true;
    },
    onSelectDropRelease: function (e, pointerEvent) {
      this.pressedFlag = false;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onSelectAreaPress: function (e) {
      // skip click if drop inside fake element or real select is disabled
      var dropClickedInsideFakeElement =
        !this.options.fakeDropInBody &&
        $(e.target).closest(this.dropdown).length;
      if (
        dropClickedInsideFakeElement ||
        e.button > 1 ||
        this.realElement.is(":disabled")
      ) {
        return;
      }

      // toggle dropdown visibility
      this.selectOpenedByEvent = e.pointerType;
      this.toggleDropdown();

      // misc handlers
      if (!this.focusedFlag) {
        if (e.pointerType === "mouse") {
          this.realElement.focus();
        } else {
          this.onFocus(e);
        }
      }
      this.pressedFlag = true;
      this.fakeElement.addClass(this.options.pressedClass);
      this.doc.on("jcf-pointerup", this.onSelectAreaRelease);
    },
    onSelectAreaRelease: function (e) {
      if (this.focusedFlag && e.pointerType === "mouse") {
        this.realElement.focus();
      }
      this.pressedFlag = false;
      this.fakeElement.removeClass(this.options.pressedClass);
      this.doc.off("jcf-pointerup", this.onSelectAreaRelease);
    },
    onOutsideClick: function (e) {
      var target = $(e.target),
        clickedInsideSelect =
          target.closest(this.fakeElement).length ||
          target.closest(this.dropdown).length;

      if (!clickedInsideSelect) {
        this.hideDropdown();
      }
    },
    onSelect: function () {
      this.refresh();

      if (this.realElement.prop("multiple")) {
        this.repositionDropdown();
      } else {
        this.hideDropdown();
      }

      this.fireNativeEvent(this.realElement, "change");
    },
    toggleListMode: function (state) {
      if (!this.options.wrapNative) {
        if (state) {
          // temporary change select to list to avoid appearing of native dropdown
          this.realElement.attr({
            size: 4,
            "jcf-size": "",
          });
        } else {
          // restore select from list mode to dropdown select
          if (!this.options.wrapNative) {
            this.realElement.removeAttr("size jcf-size");
          }
        }
      }
    },
    createDropdown: function () {
      // destroy previous dropdown if needed
      if (this.dropdown) {
        this.list.destroy();
        this.dropdown.remove();
      }

      // create new drop container
      this.dropdown = $(this.options.fakeDropStructure).appendTo(
        this.fakeDropTarget
      );
      this.dropdown.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );
      makeUnselectable(this.dropdown);

      // handle compact multiple style
      if (this.realElement.prop("multiple")) {
        this.dropdown.addClass("jcf-compact-multiple");
      }

      // set initial styles for dropdown in body
      if (this.options.fakeDropInBody) {
        this.dropdown.css({
          position: "absolute",
          top: -9999,
        });
      }

      // create new select list instance
      this.list = new SelectList({
        useHoverClass: true,
        handleResize: false,
        alwaysPreventMouseWheel: true,
        maxVisibleItems: this.options.maxVisibleItems,
        useCustomScroll: this.options.useCustomScroll,
        holder: this.dropdown.find(this.options.dropContentSelector),
        multipleSelectWithoutKey: this.realElement.prop("multiple"),
        element: this.realElement,
      });
      $(this.list).on({
        select: this.onSelect,
        press: this.onSelectDropPress,
        release: this.onSelectDropRelease,
      });
    },
    repositionDropdown: function () {
      var selectOffset = this.fakeElement.offset(),
        selectWidth = this.fakeElement.outerWidth(),
        selectHeight = this.fakeElement.outerHeight(),
        dropHeight = this.dropdown.css("width", selectWidth).outerHeight(),
        winScrollTop = this.win.scrollTop(),
        winHeight = this.win.height(),
        calcTop,
        calcLeft,
        bodyOffset,
        needFlipDrop = false;

      // check flip drop position
      if (
        selectOffset.top + selectHeight + dropHeight >
          winScrollTop + winHeight &&
        selectOffset.top - dropHeight > winScrollTop
      ) {
        needFlipDrop = true;
      }

      if (this.options.fakeDropInBody) {
        bodyOffset =
          this.fakeDropTarget.css("position") !== "static"
            ? this.fakeDropTarget.offset().top
            : 0;
        if (this.options.flipDropToFit && needFlipDrop) {
          // calculate flipped dropdown position
          calcLeft = selectOffset.left;
          calcTop = selectOffset.top - dropHeight - bodyOffset;
        } else {
          // calculate default drop position
          calcLeft = selectOffset.left;
          calcTop = selectOffset.top + selectHeight - bodyOffset;
        }

        // update drop styles
        this.dropdown.css({
          width: selectWidth,
          left: calcLeft,
          top: calcTop,
        });
      }

      // refresh flipped class
      this.dropdown
        .add(this.fakeElement)
        .toggleClass(
          this.options.flipDropClass,
          this.options.flipDropToFit && needFlipDrop
        );
    },
    showDropdown: function () {
      // do not show empty custom dropdown
      if (!this.realElement.prop("options").length) {
        return;
      }

      // create options list if not created
      if (!this.dropdown) {
        this.createDropdown();
      }

      // show dropdown
      this.dropActive = true;
      this.dropdown.appendTo(this.fakeDropTarget);
      this.fakeElement.addClass(this.options.dropActiveClass);
      this.refreshSelectedText();
      this.repositionDropdown();
      this.list.setScrollTop(this.savedScrollTop);
      this.list.refresh();

      // add temporary event handlers
      this.win.on("resize", this.onResize);
      this.doc.on("jcf-pointerdown", this.onOutsideClick);
    },
    hideDropdown: function () {
      if (this.dropdown) {
        this.savedScrollTop = this.list.getScrollTop();
        this.fakeElement.removeClass(
          this.options.dropActiveClass + " " + this.options.flipDropClass
        );
        this.dropdown.removeClass(this.options.flipDropClass).detach();
        this.doc.off("jcf-pointerdown", this.onOutsideClick);
        this.win.off("resize", this.onResize);
        this.dropActive = false;
        if (this.selectOpenedByEvent === "touch") {
          this.onBlur();
        }
      }
    },
    toggleDropdown: function () {
      if (this.dropActive) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    },
    refreshSelectedText: function () {
      // redraw selected area
      var selectedIndex = this.realElement.prop("selectedIndex"),
        selectedOption = this.realElement.prop("options")[selectedIndex],
        selectedOptionImage = selectedOption
          ? selectedOption.getAttribute("data-image")
          : null,
        selectedOptionText = "",
        selectedOptionClasses,
        self = this;

      if (this.realElement.prop("multiple")) {
        $.each(this.realElement.prop("options"), function (index, option) {
          if (option.selected) {
            selectedOptionText +=
              (selectedOptionText ? ", " : "") + option.innerHTML;
          }
        });
        if (!selectedOptionText) {
          selectedOptionText = self.realElement.attr("placeholder") || "";
        }
        this.selectText.removeAttr("class").html(selectedOptionText);
      } else if (!selectedOption) {
        if (this.selectImage) {
          this.selectImage.hide();
        }
        this.selectText.removeAttr("class").empty();
      } else if (
        this.currentSelectedText !== selectedOption.innerHTML ||
        this.currentSelectedImage !== selectedOptionImage
      ) {
        selectedOptionClasses = getPrefixedClasses(
          selectedOption.className,
          this.options.optionClassPrefix
        );
        this.selectText
          .attr("class", selectedOptionClasses)
          .html(selectedOption.innerHTML);

        if (selectedOptionImage) {
          if (!this.selectImage) {
            this.selectImage = $("<img>")
              .prependTo(this.selectTextContainer)
              .hide();
          }
          this.selectImage.attr("src", selectedOptionImage).show();
        } else if (this.selectImage) {
          this.selectImage.hide();
        }

        this.currentSelectedText = selectedOption.innerHTML;
        this.currentSelectedImage = selectedOptionImage;
      }
    },
    refresh: function () {
      // refresh fake select visibility
      if (this.realElement.prop("style").display === "none") {
        this.fakeElement.hide();
      } else {
        this.fakeElement.show();
      }

      // refresh selected text
      this.refreshSelectedText();

      // handle disabled state
      this.fakeElement.toggleClass(
        this.options.disabledClass,
        this.realElement.is(":disabled")
      );
    },
    destroy: function () {
      // restore structure
      if (this.options.wrapNative) {
        this.realElement
          .insertBefore(this.fakeElement)
          .css({
            position: "",
            height: "",
            width: "",
          })
          .removeClass(this.options.resetAppearanceClass);
      } else {
        this.realElement.removeClass(this.options.hiddenClass);
        if (this.realElement.is("[jcf-size]")) {
          this.realElement.removeAttr("size jcf-size");
        }
      }

      // removing element will also remove its event handlers
      this.fakeElement.remove();

      // remove other event handlers
      this.doc.off("jcf-pointerup", this.onSelectAreaRelease);
      this.realElement.off({
        focus: this.onFocus,
      });
    },
  });

  // listbox module
  function ListBox(options) {
    this.options = $.extend(
      {
        wrapNative: true,
        useCustomScroll: true,
        fakeStructure:
          '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
        selectClassPrefix: "jcf-select-",
        listHolder: ".jcf-list-wrapper",
      },
      options
    );
    this.init();
  }
  $.extend(ListBox.prototype, {
    init: function () {
      this.bindHandlers();
      this.initStructure();
      this.attachEvents();
    },
    initStructure: function () {
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeStructure).insertAfter(
        this.realElement
      );
      this.listHolder = this.fakeElement.find(this.options.listHolder);
      makeUnselectable(this.fakeElement);

      // copy classes from original select
      this.fakeElement.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );
      this.realElement.addClass(this.options.hiddenClass);

      this.list = new SelectList({
        useCustomScroll: this.options.useCustomScroll,
        holder: this.listHolder,
        selectOnClick: false,
        element: this.realElement,
      });
    },
    attachEvents: function () {
      // delayed refresh handler
      var self = this;
      this.delayedRefresh = function (e) {
        if (e && e.which === 16) {
          // ignore SHIFT key
          return;
        } else {
          clearTimeout(self.refreshTimer);
          self.refreshTimer = setTimeout(function () {
            self.refresh();
            self.list.scrollToActiveOption();
          }, 1);
        }
      };

      // other event handlers
      this.realElement.on({
        focus: this.onFocus,
        click: this.delayedRefresh,
        keydown: this.delayedRefresh,
      });

      // select list event handlers
      $(this.list).on({
        select: this.onSelect,
        press: this.onFakeOptionsPress,
        release: this.onFakeOptionsRelease,
      });
    },
    onFakeOptionsPress: function (e, pointerEvent) {
      this.pressedFlag = true;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onFakeOptionsRelease: function (e, pointerEvent) {
      this.pressedFlag = false;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onSelect: function () {
      this.fireNativeEvent(this.realElement, "change");
      this.fireNativeEvent(this.realElement, "click");
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
        this.focusedFlag = true;
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
        this.focusedFlag = false;
      }
    },
    refresh: function () {
      this.fakeElement.toggleClass(
        this.options.disabledClass,
        this.realElement.is(":disabled")
      );
      this.list.refresh();
    },
    destroy: function () {
      this.list.destroy();
      this.realElement
        .insertBefore(this.fakeElement)
        .removeClass(this.options.hiddenClass);
      this.fakeElement.remove();
    },
  });

  // options list module
  function SelectList(options) {
    this.options = $.extend(
      {
        holder: null,
        maxVisibleItems: 10,
        selectOnClick: true,
        useHoverClass: false,
        useCustomScroll: false,
        handleResize: true,
        multipleSelectWithoutKey: false,
        alwaysPreventMouseWheel: false,
        indexAttribute: "data-index",
        cloneClassPrefix: "jcf-option-",
        containerStructure:
          '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
        containerSelector: ".jcf-list-content",
        captionClass: "jcf-optgroup-caption",
        disabledClass: "jcf-disabled",
        optionClass: "jcf-option",
        groupClass: "jcf-optgroup",
        hoverClass: "jcf-hover",
        selectedClass: "jcf-selected",
        scrollClass: "jcf-scroll-active",
      },
      options
    );
    this.init();
  }
  $.extend(SelectList.prototype, {
    init: function () {
      this.initStructure();
      this.refreshSelectedClass();
      this.attachEvents();
    },
    initStructure: function () {
      this.element = $(this.options.element);
      this.indexSelector = "[" + this.options.indexAttribute + "]";
      this.container = $(this.options.containerStructure).appendTo(
        this.options.holder
      );
      this.listHolder = this.container.find(this.options.containerSelector);
      this.lastClickedIndex = this.element.prop("selectedIndex");
      this.rebuildList();
    },
    attachEvents: function () {
      this.bindHandlers();
      this.listHolder.on(
        "jcf-pointerdown",
        this.indexSelector,
        this.onItemPress
      );
      this.listHolder.on("jcf-pointerdown", this.onPress);

      if (this.options.useHoverClass) {
        this.listHolder.on(
          "jcf-pointerover",
          this.indexSelector,
          this.onHoverItem
        );
      }
    },
    onPress: function (e) {
      $(this).trigger("press", e);
      this.listHolder.on("jcf-pointerup", this.onRelease);
    },
    onRelease: function (e) {
      $(this).trigger("release", e);
      this.listHolder.off("jcf-pointerup", this.onRelease);
    },
    onHoverItem: function (e) {
      var hoverIndex = parseFloat(
        e.currentTarget.getAttribute(this.options.indexAttribute)
      );
      this.fakeOptions
        .removeClass(this.options.hoverClass)
        .eq(hoverIndex)
        .addClass(this.options.hoverClass);
    },
    onItemPress: function (e) {
      if (e.pointerType === "touch" || this.options.selectOnClick) {
        // select option after "click"
        this.tmpListOffsetTop = this.list.offset().top;
        this.listHolder.on(
          "jcf-pointerup",
          this.indexSelector,
          this.onItemRelease
        );
      } else {
        // select option immediately
        this.onSelectItem(e);
      }
    },
    onItemRelease: function (e) {
      // remove event handlers and temporary data
      this.listHolder.off(
        "jcf-pointerup",
        this.indexSelector,
        this.onItemRelease
      );

      // simulate item selection
      if (this.tmpListOffsetTop === this.list.offset().top) {
        this.listHolder.on(
          "click",
          this.indexSelector,
          { savedPointerType: e.pointerType },
          this.onSelectItem
        );
      }
      delete this.tmpListOffsetTop;
    },
    onSelectItem: function (e) {
      var clickedIndex = parseFloat(
          e.currentTarget.getAttribute(this.options.indexAttribute)
        ),
        pointerType =
          (e.data && e.data.savedPointerType) || e.pointerType || "mouse",
        range;

      // remove click event handler
      this.listHolder.off("click", this.indexSelector, this.onSelectItem);

      // ignore clicks on disabled options
      if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
        return;
      }

      if (this.element.prop("multiple")) {
        if (
          e.metaKey ||
          e.ctrlKey ||
          pointerType === "touch" ||
          this.options.multipleSelectWithoutKey
        ) {
          // if CTRL/CMD pressed or touch devices - toggle selected option
          this.realOptions[clickedIndex].selected =
            !this.realOptions[clickedIndex].selected;
        } else if (e.shiftKey) {
          // if SHIFT pressed - update selection
          range = [this.lastClickedIndex, clickedIndex].sort(function (a, b) {
            return a - b;
          });
          this.realOptions.each(function (index, option) {
            option.selected = index >= range[0] && index <= range[1];
          });
        } else {
          // set single selected index
          this.element.prop("selectedIndex", clickedIndex);
        }
      } else {
        this.element.prop("selectedIndex", clickedIndex);
      }

      // save last clicked option
      if (!e.shiftKey) {
        this.lastClickedIndex = clickedIndex;
      }

      // refresh classes
      this.refreshSelectedClass();

      // scroll to active item in desktop browsers
      if (pointerType === "mouse") {
        this.scrollToActiveOption();
      }

      // make callback when item selected
      $(this).trigger("select");
    },
    rebuildList: function () {
      // rebuild options
      var self = this,
        rootElement = this.element[0];

      // recursively create fake options
      this.storedSelectHTML = rootElement.innerHTML;
      this.optionIndex = 0;
      this.list = $(this.createOptionsList(rootElement));
      this.listHolder.empty().append(this.list);
      this.realOptions = this.element.find("option");
      this.fakeOptions = this.list.find(this.indexSelector);
      this.fakeListItems = this.list.find(
        "." + this.options.captionClass + "," + this.indexSelector
      );
      delete this.optionIndex;

      // detect max visible items
      var maxCount = this.options.maxVisibleItems,
        sizeValue = this.element.prop("size");
      if (sizeValue > 1 && !this.element.is("[jcf-size]")) {
        maxCount = sizeValue;
      }

      // handle scrollbar
      var needScrollBar = this.fakeOptions.length > maxCount;
      this.container.toggleClass(this.options.scrollClass, needScrollBar);
      if (needScrollBar) {
        // change max-height
        this.listHolder.css({
          maxHeight: this.getOverflowHeight(maxCount),
          overflow: "auto",
        });

        if (this.options.useCustomScroll && jcf.modules.Scrollable) {
          // add custom scrollbar if specified in options
          jcf.replace(this.listHolder, "Scrollable", {
            handleResize: this.options.handleResize,
            alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel,
          });
          return;
        }
      }

      // disable edge wheel scrolling
      if (this.options.alwaysPreventMouseWheel) {
        this.preventWheelHandler = function (e) {
          var currentScrollTop = self.listHolder.scrollTop(),
            maxScrollTop =
              self.listHolder.prop("scrollHeight") -
              self.listHolder.innerHeight();

          // check edge cases
          if (
            (currentScrollTop <= 0 && e.deltaY < 0) ||
            (currentScrollTop >= maxScrollTop && e.deltaY > 0)
          ) {
            e.preventDefault();
          }
        };
        this.listHolder.on("jcf-mousewheel", this.preventWheelHandler);
      }
    },
    refreshSelectedClass: function () {
      var self = this,
        selectedItem,
        isMultiple = this.element.prop("multiple"),
        selectedIndex = this.element.prop("selectedIndex");

      if (isMultiple) {
        this.realOptions.each(function (index, option) {
          self.fakeOptions
            .eq(index)
            .toggleClass(self.options.selectedClass, !!option.selected);
        });
      } else {
        this.fakeOptions.removeClass(
          this.options.selectedClass + " " + this.options.hoverClass
        );
        selectedItem = this.fakeOptions
          .eq(selectedIndex)
          .addClass(this.options.selectedClass);
        if (this.options.useHoverClass) {
          selectedItem.addClass(this.options.hoverClass);
        }
      }
    },
    scrollToActiveOption: function () {
      // scroll to target option
      var targetOffset = this.getActiveOptionOffset();
      if (typeof targetOffset === "number") {
        this.listHolder.prop("scrollTop", targetOffset);
      }
    },
    getSelectedIndexRange: function () {
      var firstSelected = -1,
        lastSelected = -1;
      this.realOptions.each(function (index, option) {
        if (option.selected) {
          if (firstSelected < 0) {
            firstSelected = index;
          }
          lastSelected = index;
        }
      });
      return [firstSelected, lastSelected];
    },
    getChangedSelectedIndex: function () {
      var selectedIndex = this.element.prop("selectedIndex"),
        targetIndex;

      if (this.element.prop("multiple")) {
        // multiple selects handling
        if (!this.previousRange) {
          this.previousRange = [selectedIndex, selectedIndex];
        }
        this.currentRange = this.getSelectedIndexRange();
        targetIndex =
          this.currentRange[
            this.currentRange[0] !== this.previousRange[0] ? 0 : 1
          ];
        this.previousRange = this.currentRange;
        return targetIndex;
      } else {
        // single choice selects handling
        return selectedIndex;
      }
    },
    getActiveOptionOffset: function () {
      // calc values
      var dropHeight = this.listHolder.height(),
        dropScrollTop = this.listHolder.prop("scrollTop"),
        currentIndex = this.getChangedSelectedIndex(),
        fakeOption = this.fakeOptions.eq(currentIndex),
        fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
        fakeOptionHeight = fakeOption.innerHeight();

      // scroll list
      if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
        // scroll down (always scroll to option)
        return fakeOptionOffset - dropHeight + fakeOptionHeight;
      } else if (fakeOptionOffset < dropScrollTop) {
        // scroll up to option
        return fakeOptionOffset;
      }
    },
    getOverflowHeight: function (sizeValue) {
      var item = this.fakeListItems.eq(sizeValue - 1),
        listOffset = this.list.offset().top,
        itemOffset = item.offset().top,
        itemHeight = item.innerHeight();

      return itemOffset + itemHeight - listOffset;
    },
    getScrollTop: function () {
      return this.listHolder.scrollTop();
    },
    setScrollTop: function (value) {
      this.listHolder.scrollTop(value);
    },
    createOption: function (option) {
      var newOption = document.createElement("span");
      newOption.className = this.options.optionClass;
      newOption.innerHTML = option.innerHTML;
      newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

      var optionImage,
        optionImageSrc = option.getAttribute("data-image");
      if (optionImageSrc) {
        optionImage = document.createElement("img");
        optionImage.src = optionImageSrc;
        newOption.insertBefore(optionImage, newOption.childNodes[0]);
      }
      if (option.disabled) {
        newOption.className += " " + this.options.disabledClass;
      }
      if (option.className) {
        newOption.className +=
          " " +
          getPrefixedClasses(option.className, this.options.cloneClassPrefix);
      }
      return newOption;
    },
    createOptGroup: function (optgroup) {
      var optGroupContainer = document.createElement("span"),
        optGroupName = optgroup.getAttribute("label"),
        optGroupCaption,
        optGroupList;

      // create caption
      optGroupCaption = document.createElement("span");
      optGroupCaption.className = this.options.captionClass;
      optGroupCaption.innerHTML = optGroupName;
      optGroupContainer.appendChild(optGroupCaption);

      // create list of options
      if (optgroup.children.length) {
        optGroupList = this.createOptionsList(optgroup);
        optGroupContainer.appendChild(optGroupList);
      }

      optGroupContainer.className = this.options.groupClass;
      return optGroupContainer;
    },
    createOptionContainer: function () {
      var optionContainer = document.createElement("li");
      return optionContainer;
    },
    createOptionsList: function (container) {
      var self = this,
        list = document.createElement("ul");

      $.each(container.children, function (index, currentNode) {
        var item = self.createOptionContainer(currentNode),
          newNode;

        switch (currentNode.tagName.toLowerCase()) {
          case "option":
            newNode = self.createOption(currentNode);
            break;
          case "optgroup":
            newNode = self.createOptGroup(currentNode);
            break;
        }
        list.appendChild(item).appendChild(newNode);
      });
      return list;
    },
    refresh: function () {
      // check for select innerHTML changes
      if (this.storedSelectHTML !== this.element.prop("innerHTML")) {
        this.rebuildList();
      }

      // refresh custom scrollbar
      var scrollInstance = jcf.getInstance(this.listHolder);
      if (scrollInstance) {
        scrollInstance.refresh();
      }

      // refresh selectes classes
      this.refreshSelectedClass();
    },
    destroy: function () {
      this.listHolder.off("jcf-mousewheel", this.preventWheelHandler);
      this.listHolder.off(
        "jcf-pointerdown",
        this.indexSelector,
        this.onSelectItem
      );
      this.listHolder.off(
        "jcf-pointerover",
        this.indexSelector,
        this.onHoverItem
      );
      this.listHolder.off("jcf-pointerdown", this.onPress);
    },
  });

  // helper functions
  var getPrefixedClasses = function (className, prefixToAdd) {
    return className
      ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + "$1 ")
      : "";
  };
  var makeUnselectable = (function () {
    var unselectableClass = jcf.getOptions().unselectableClass;
    function preventHandler(e) {
      e.preventDefault();
    }
    return function (node) {
      node.addClass(unselectableClass).on("selectstart", preventHandler);
    };
  })();
})(jQuery, this);

// initialize custom form elements
function initCustomForms() {
  jcf.setOptions("Select", {
    wrapNative: false,
    wrapNativeOnMobile: false,
  });
  jcf.replaceAll();
}

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.jcf = factory(jQuery);
  }
})(this, function ($) {
  "use strict";

  // define version
  var version = "1.1.3";

  // private variables
  var customInstances = [];

  // default global options
  var commonOptions = {
    optionsKey: "jcf",
    dataKey: "jcf-instance",
    rtlClass: "jcf-rtl",
    focusClass: "jcf-focus",
    pressedClass: "jcf-pressed",
    disabledClass: "jcf-disabled",
    hiddenClass: "jcf-hidden",
    resetAppearanceClass: "jcf-reset-appearance",
    unselectableClass: "jcf-unselectable",
  };

  // detect device type
  var isTouchDevice =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch),
    isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

  var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
  if (isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, "."));
  commonOptions.ios = isIOS;

  // create global stylesheet if custom forms are used
  var createStyleSheet = function () {
    var styleTag = $("<style>").appendTo("head"),
      styleSheet = styleTag.prop("sheet") || styleTag.prop("styleSheet");

    // crossbrowser style handling
    var addCSSRule = function (selector, rules, index) {
      if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + "{" + rules + "}", index);
      } else {
        styleSheet.addRule(selector, rules, index);
      }
    };

    // add special rules
    addCSSRule(
      "." + commonOptions.hiddenClass,
      "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"
    );
    addCSSRule(
      "." + commonOptions.rtlClass + " ." + commonOptions.hiddenClass,
      "right:-9999px !important; left: auto !important"
    );
    addCSSRule(
      "." + commonOptions.unselectableClass,
      "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"
    );
    addCSSRule(
      "." + commonOptions.resetAppearanceClass,
      "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);"
    );

    // detect rtl pages
    var html = $("html"),
      body = $("body");
    if (html.css("direction") === "rtl" || body.css("direction") === "rtl") {
      html.addClass(commonOptions.rtlClass);
    }

    // handle form reset event
    html.on("reset", function () {
      setTimeout(function () {
        api.refreshAll();
      }, 0);
    });

    // mark stylesheet as created
    commonOptions.styleSheetCreated = true;
  };

  // simplified pointer events handler
  (function () {
    var pointerEventsSupported =
        navigator.pointerEnabled || navigator.msPointerEnabled,
      touchEventsSupported =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch),
      eventList,
      eventMap = {},
      eventPrefix = "jcf-";

    // detect events to attach
    if (pointerEventsSupported) {
      eventList = {
        pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
        pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
        pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
        pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp",
      };
    } else {
      eventList = {
        pointerover: "mouseover",
        pointerdown: "mousedown" + (touchEventsSupported ? " touchstart" : ""),
        pointermove: "mousemove" + (touchEventsSupported ? " touchmove" : ""),
        pointerup: "mouseup" + (touchEventsSupported ? " touchend" : ""),
      };
    }

    // create event map
    $.each(eventList, function (targetEventName, fakeEventList) {
      $.each(fakeEventList.split(" "), function (index, fakeEventName) {
        eventMap[fakeEventName] = targetEventName;
      });
    });

    // jQuery event hooks
    $.each(eventList, function (eventName, eventHandlers) {
      eventHandlers = eventHandlers.split(" ");
      $.event.special[eventPrefix + eventName] = {
        setup: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.addEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = fixEvent;
          });
        },
        teardown: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.removeEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = null;
          });
        },
      };
    });

    // check that mouse event are not simulated by mobile browsers
    var lastTouch = null;
    var mouseEventSimulated = function (e) {
      var dx = Math.abs(e.pageX - lastTouch.x),
        dy = Math.abs(e.pageY - lastTouch.y),
        rangeDistance = 25;

      if (dx <= rangeDistance && dy <= rangeDistance) {
        return true;
      }
    };

    // normalize event
    var fixEvent = function (e) {
      var origEvent = e || window.event,
        touchEventData = null,
        targetEventName = eventMap[origEvent.type];

      e = $.event.fix(origEvent);
      e.type = eventPrefix + targetEventName;

      if (origEvent.pointerType) {
        switch (origEvent.pointerType) {
          case 2:
            e.pointerType = "touch";
            break;
          case 3:
            e.pointerType = "pen";
            break;
          case 4:
            e.pointerType = "mouse";
            break;
          default:
            e.pointerType = origEvent.pointerType;
        }
      } else {
        e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
      }

      if (!e.pageX && !e.pageY) {
        touchEventData = origEvent.changedTouches
          ? origEvent.changedTouches[0]
          : origEvent;
        e.pageX = touchEventData.pageX;
        e.pageY = touchEventData.pageY;
      }

      if (origEvent.type === "touchend") {
        lastTouch = { x: e.pageX, y: e.pageY };
      }
      if (e.pointerType === "mouse" && lastTouch && mouseEventSimulated(e)) {
        return;
      } else {
        return ($.event.dispatch || $.event.handle).call(this, e);
      }
    };
  })();

  // custom mousewheel/trackpad handler
  (function () {
    var wheelEvents = (
        "onwheel" in document || document.documentMode >= 9
          ? "wheel"
          : "mousewheel DOMMouseScroll"
      ).split(" "),
      shimEventName = "jcf-mousewheel";

    $.event.special[shimEventName] = {
      setup: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.addEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = fixEvent;
        });
      },
      teardown: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.removeEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = null;
        });
      },
    };

    var fixEvent = function (e) {
      var origEvent = e || window.event;
      e = $.event.fix(origEvent);
      e.type = shimEventName;

      // old wheel events handler
      if ("detail" in origEvent) {
        e.deltaY = -origEvent.detail;
      }
      if ("wheelDelta" in origEvent) {
        e.deltaY = -origEvent.wheelDelta;
      }
      if ("wheelDeltaY" in origEvent) {
        e.deltaY = -origEvent.wheelDeltaY;
      }
      if ("wheelDeltaX" in origEvent) {
        e.deltaX = -origEvent.wheelDeltaX;
      }

      // modern wheel event handler
      if ("deltaY" in origEvent) {
        e.deltaY = origEvent.deltaY;
      }
      if ("deltaX" in origEvent) {
        e.deltaX = origEvent.deltaX;
      }

      // handle deltaMode for mouse wheel
      e.delta = e.deltaY || e.deltaX;
      if (origEvent.deltaMode === 1) {
        var lineHeight = 16;
        e.delta *= lineHeight;
        e.deltaY *= lineHeight;
        e.deltaX *= lineHeight;
      }

      return ($.event.dispatch || $.event.handle).call(this, e);
    };
  })();

  // extra module methods
  var moduleMixin = {
    // provide function for firing native events
    fireNativeEvent: function (elements, eventName) {
      $(elements).each(function () {
        var element = this,
          eventObject;
        if (element.dispatchEvent) {
          eventObject = document.createEvent("HTMLEvents");
          eventObject.initEvent(eventName, true, true);
          element.dispatchEvent(eventObject);
        } else if (document.createEventObject) {
          eventObject = document.createEventObject();
          eventObject.target = element;
          element.fireEvent("on" + eventName, eventObject);
        }
      });
    },
    // bind event handlers for module instance (functions beggining with "on")
    bindHandlers: function () {
      var self = this;
      $.each(self, function (propName, propValue) {
        if (propName.indexOf("on") === 0 && $.isFunction(propValue)) {
          // dont use $.proxy here because it doesn't create unique handler
          self[propName] = function () {
            return propValue.apply(self, arguments);
          };
        }
      });
    },
  };

  // public API
  var api = {
    version: version,
    modules: {},
    getOptions: function () {
      return $.extend({}, commonOptions);
    },
    setOptions: function (moduleName, moduleOptions) {
      if (arguments.length > 1) {
        // set module options
        if (this.modules[moduleName]) {
          $.extend(this.modules[moduleName].prototype.options, moduleOptions);
        }
      } else {
        // set common options
        $.extend(commonOptions, moduleName);
      }
    },
    addModule: function (proto) {
      // add module to list
      var Module = function (options) {
        // save instance to collection
        if (!options.element.data(commonOptions.dataKey)) {
          options.element.data(commonOptions.dataKey, this);
        }
        customInstances.push(this);

        // save options
        this.options = $.extend(
          {},
          commonOptions,
          this.options,
          getInlineOptions(options.element),
          options
        );

        // bind event handlers to instance
        this.bindHandlers();

        // call constructor
        this.init.apply(this, arguments);
      };

      // parse options from HTML attribute
      var getInlineOptions = function (element) {
        var dataOptions = element.data(commonOptions.optionsKey),
          attrOptions = element.attr(commonOptions.optionsKey);

        if (dataOptions) {
          return dataOptions;
        } else if (attrOptions) {
          try {
            return $.parseJSON(attrOptions);
          } catch (e) {
            // ignore invalid attributes
          }
        }
      };

      // set proto as prototype for new module
      Module.prototype = proto;

      // add mixin methods to module proto
      $.extend(proto, moduleMixin);
      if (proto.plugins) {
        $.each(proto.plugins, function (pluginName, plugin) {
          $.extend(plugin.prototype, moduleMixin);
        });
      }

      // override destroy method
      var originalDestroy = Module.prototype.destroy;
      Module.prototype.destroy = function () {
        this.options.element.removeData(this.options.dataKey);

        for (var i = customInstances.length - 1; i >= 0; i--) {
          if (customInstances[i] === this) {
            customInstances.splice(i, 1);
            break;
          }
        }

        if (originalDestroy) {
          originalDestroy.apply(this, arguments);
        }
      };

      // save module to list
      this.modules[proto.name] = Module;
    },
    getInstance: function (element) {
      return $(element).data(commonOptions.dataKey);
    },
    replace: function (elements, moduleName, customOptions) {
      var self = this,
        instance;

      if (!commonOptions.styleSheetCreated) {
        createStyleSheet();
      }

      $(elements).each(function () {
        var moduleOptions,
          element = $(this);

        instance = element.data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        } else {
          if (!moduleName) {
            $.each(self.modules, function (currentModuleName, module) {
              if (
                module.prototype.matchElement.call(module.prototype, element)
              ) {
                moduleName = currentModuleName;
                return false;
              }
            });
          }
          if (moduleName) {
            moduleOptions = $.extend({ element: element }, customOptions);
            instance = new self.modules[moduleName](moduleOptions);
          }
        }
      });
      return instance;
    },
    refresh: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        }
      });
    },
    destroy: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.destroy();
        }
      });
    },
    replaceAll: function (context) {
      var self = this;
      $.each(this.modules, function (moduleName, module) {
        $(module.prototype.selector, context).each(function () {
          if (this.className.indexOf("jcf-ignore") < 0) {
            self.replace(this, moduleName);
          }
        });
      });
    },
    refreshAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function () {
            var instance = $(this).data(commonOptions.dataKey);
            if (instance) {
              instance.refresh();
            }
          });
        });
      } else {
        for (var i = customInstances.length - 1; i >= 0; i--) {
          customInstances[i].refresh();
        }
      }
    },
    destroyAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function (index, element) {
            var instance = $(element).data(commonOptions.dataKey);
            if (instance) {
              instance.destroy();
            }
          });
        });
      } else {
        while (customInstances.length) {
          customInstances[0].destroy();
        }
      }
    },
  };

  // always export API to the global window object
  window.jcf = api;

  return api;
});

/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($, window) {
  "use strict";

  jcf.addModule({
    name: "Select",
    selector: "select",
    options: {
      element: null,
      multipleCompactStyle: false,
    },
    plugins: {
      ListBox: ListBox,
      ComboBox: ComboBox,
      SelectList: SelectList,
    },
    matchElement: function (element) {
      return element.is("select");
    },
    init: function () {
      this.element = $(this.options.element);
      this.createInstance();
    },
    isListBox: function () {
      return this.element.is("[size]:not([jcf-size]), [multiple]");
    },
    createInstance: function () {
      if (this.instance) {
        this.instance.destroy();
      }
      if (this.isListBox() && !this.options.multipleCompactStyle) {
        this.instance = new ListBox(this.options);
      } else {
        this.instance = new ComboBox(this.options);
      }
    },
    refresh: function () {
      var typeMismatch =
        (this.isListBox() && this.instance instanceof ComboBox) ||
        (!this.isListBox() && this.instance instanceof ListBox);

      if (typeMismatch) {
        this.createInstance();
      } else {
        this.instance.refresh();
      }
    },
    destroy: function () {
      this.instance.destroy();
    },
  });

  // combobox module
  function ComboBox(options) {
    this.options = $.extend(
      {
        wrapNative: true,
        wrapNativeOnMobile: true,
        fakeDropInBody: true,
        useCustomScroll: true,
        flipDropToFit: true,
        maxVisibleItems: 10,
        fakeAreaStructure:
          '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
        fakeDropStructure:
          '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
        optionClassPrefix: "jcf-option-",
        selectClassPrefix: "jcf-select-",
        dropContentSelector: ".jcf-select-drop-content",
        selectTextSelector: ".jcf-select-text",
        dropActiveClass: "jcf-drop-active",
        flipDropClass: "jcf-drop-flipped",
      },
      options
    );
    this.init();
  }
  $.extend(ComboBox.prototype, {
    init: function () {
      this.initStructure();
      this.bindHandlers();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function () {
      // prepare structure
      this.win = $(window);
      this.doc = $(document);
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(
        this.realElement
      );
      this.selectTextContainer = this.fakeElement.find(
        this.options.selectTextSelector
      );
      this.selectText = $("<span></span>").appendTo(this.selectTextContainer);
      makeUnselectable(this.fakeElement);

      // copy classes from original select
      this.fakeElement.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );

      // handle compact multiple style
      if (this.realElement.prop("multiple")) {
        this.fakeElement.addClass("jcf-compact-multiple");
      }

      // detect device type and dropdown behavior
      if (
        this.options.isMobileDevice &&
        this.options.wrapNativeOnMobile &&
        !this.options.wrapNative
      ) {
        this.options.wrapNative = true;
      }

      if (this.options.wrapNative) {
        // wrap native select inside fake block
        this.realElement
          .prependTo(this.fakeElement)
          .css({
            position: "absolute",
            height: "100%",
            width: "100%",
          })
          .addClass(this.options.resetAppearanceClass);
      } else {
        // just hide native select
        this.realElement.addClass(this.options.hiddenClass);
        this.fakeElement.attr("title", this.realElement.attr("title"));
        this.fakeDropTarget = this.options.fakeDropInBody
          ? $("body")
          : this.fakeElement;
      }
    },
    attachEvents: function () {
      // delayed refresh handler
      var self = this;
      this.delayedRefresh = function () {
        setTimeout(function () {
          self.refresh();
          if (self.list) {
            self.list.refresh();
            self.list.scrollToActiveOption();
          }
        }, 1);
      };

      // native dropdown event handlers
      if (this.options.wrapNative) {
        this.realElement.on({
          focus: this.onFocus,
          change: this.onChange,
          click: this.onChange,
          keydown: this.onChange,
        });
      } else {
        // custom dropdown event handlers
        this.realElement.on({
          focus: this.onFocus,
          change: this.onChange,
          keydown: this.onKeyDown,
        });
        this.fakeElement.on({
          "jcf-pointerdown": this.onSelectAreaPress,
        });
      }
    },
    onKeyDown: function (e) {
      if (e.which === 13) {
        this.toggleDropdown();
      } else if (this.dropActive) {
        this.delayedRefresh();
      }
    },
    onChange: function () {
      this.refresh();
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
        this.toggleListMode(true);
        this.focusedFlag = true;
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
        this.toggleListMode(false);
        this.focusedFlag = false;
      }
    },
    onResize: function () {
      if (this.dropActive) {
        this.hideDropdown();
      }
    },
    onSelectDropPress: function () {
      this.pressedFlag = true;
    },
    onSelectDropRelease: function (e, pointerEvent) {
      this.pressedFlag = false;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onSelectAreaPress: function (e) {
      // skip click if drop inside fake element or real select is disabled
      var dropClickedInsideFakeElement =
        !this.options.fakeDropInBody &&
        $(e.target).closest(this.dropdown).length;
      if (
        dropClickedInsideFakeElement ||
        e.button > 1 ||
        this.realElement.is(":disabled")
      ) {
        return;
      }

      // toggle dropdown visibility
      this.selectOpenedByEvent = e.pointerType;
      this.toggleDropdown();

      // misc handlers
      if (!this.focusedFlag) {
        if (e.pointerType === "mouse") {
          this.realElement.focus();
        } else {
          this.onFocus(e);
        }
      }
      this.pressedFlag = true;
      this.fakeElement.addClass(this.options.pressedClass);
      this.doc.on("jcf-pointerup", this.onSelectAreaRelease);
    },
    onSelectAreaRelease: function (e) {
      if (this.focusedFlag && e.pointerType === "mouse") {
        this.realElement.focus();
      }
      this.pressedFlag = false;
      this.fakeElement.removeClass(this.options.pressedClass);
      this.doc.off("jcf-pointerup", this.onSelectAreaRelease);
    },
    onOutsideClick: function (e) {
      var target = $(e.target),
        clickedInsideSelect =
          target.closest(this.fakeElement).length ||
          target.closest(this.dropdown).length;

      if (!clickedInsideSelect) {
        this.hideDropdown();
      }
    },
    onSelect: function () {
      this.refresh();

      if (this.realElement.prop("multiple")) {
        this.repositionDropdown();
      } else {
        this.hideDropdown();
      }

      this.fireNativeEvent(this.realElement, "change");
    },
    toggleListMode: function (state) {
      if (!this.options.wrapNative) {
        if (state) {
          // temporary change select to list to avoid appearing of native dropdown
          this.realElement.attr({
            size: 4,
            "jcf-size": "",
          });
        } else {
          // restore select from list mode to dropdown select
          if (!this.options.wrapNative) {
            this.realElement.removeAttr("size jcf-size");
          }
        }
      }
    },
    createDropdown: function () {
      // destroy previous dropdown if needed
      if (this.dropdown) {
        this.list.destroy();
        this.dropdown.remove();
      }

      // create new drop container
      this.dropdown = $(this.options.fakeDropStructure).appendTo(
        this.fakeDropTarget
      );
      this.dropdown.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );
      makeUnselectable(this.dropdown);

      // handle compact multiple style
      if (this.realElement.prop("multiple")) {
        this.dropdown.addClass("jcf-compact-multiple");
      }

      // set initial styles for dropdown in body
      if (this.options.fakeDropInBody) {
        this.dropdown.css({
          position: "absolute",
          top: -9999,
        });
      }

      // create new select list instance
      this.list = new SelectList({
        useHoverClass: true,
        handleResize: false,
        alwaysPreventMouseWheel: true,
        maxVisibleItems: this.options.maxVisibleItems,
        useCustomScroll: this.options.useCustomScroll,
        holder: this.dropdown.find(this.options.dropContentSelector),
        multipleSelectWithoutKey: this.realElement.prop("multiple"),
        element: this.realElement,
      });
      $(this.list).on({
        select: this.onSelect,
        press: this.onSelectDropPress,
        release: this.onSelectDropRelease,
      });
    },
    repositionDropdown: function () {
      var selectOffset = this.fakeElement.offset(),
        selectWidth = this.fakeElement.outerWidth(),
        selectHeight = this.fakeElement.outerHeight(),
        dropHeight = this.dropdown.css("width", selectWidth).outerHeight(),
        winScrollTop = this.win.scrollTop(),
        winHeight = this.win.height(),
        calcTop,
        calcLeft,
        bodyOffset,
        needFlipDrop = false;

      // check flip drop position
      if (
        selectOffset.top + selectHeight + dropHeight >
          winScrollTop + winHeight &&
        selectOffset.top - dropHeight > winScrollTop
      ) {
        needFlipDrop = true;
      }

      if (this.options.fakeDropInBody) {
        bodyOffset =
          this.fakeDropTarget.css("position") !== "static"
            ? this.fakeDropTarget.offset().top
            : 0;
        if (this.options.flipDropToFit && needFlipDrop) {
          // calculate flipped dropdown position
          calcLeft = selectOffset.left;
          calcTop = selectOffset.top - dropHeight - bodyOffset;
        } else {
          // calculate default drop position
          calcLeft = selectOffset.left;
          calcTop = selectOffset.top + selectHeight - bodyOffset;
        }

        // update drop styles
        this.dropdown.css({
          width: selectWidth,
          left: calcLeft,
          top: calcTop,
        });
      }

      // refresh flipped class
      this.dropdown
        .add(this.fakeElement)
        .toggleClass(
          this.options.flipDropClass,
          this.options.flipDropToFit && needFlipDrop
        );
    },
    showDropdown: function () {
      // do not show empty custom dropdown
      if (!this.realElement.prop("options").length) {
        return;
      }

      // create options list if not created
      if (!this.dropdown) {
        this.createDropdown();
      }

      // show dropdown
      this.dropActive = true;
      this.dropdown.appendTo(this.fakeDropTarget);
      this.fakeElement.addClass(this.options.dropActiveClass);
      this.refreshSelectedText();
      this.repositionDropdown();
      this.list.setScrollTop(this.savedScrollTop);
      this.list.refresh();

      // add temporary event handlers
      this.win.on("resize", this.onResize);
      this.doc.on("jcf-pointerdown", this.onOutsideClick);
    },
    hideDropdown: function () {
      if (this.dropdown) {
        this.savedScrollTop = this.list.getScrollTop();
        this.fakeElement.removeClass(
          this.options.dropActiveClass + " " + this.options.flipDropClass
        );
        this.dropdown.removeClass(this.options.flipDropClass).detach();
        this.doc.off("jcf-pointerdown", this.onOutsideClick);
        this.win.off("resize", this.onResize);
        this.dropActive = false;
        if (this.selectOpenedByEvent === "touch") {
          this.onBlur();
        }
      }
    },
    toggleDropdown: function () {
      if (this.dropActive) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    },
    refreshSelectedText: function () {
      // redraw selected area
      var selectedIndex = this.realElement.prop("selectedIndex"),
        selectedOption = this.realElement.prop("options")[selectedIndex],
        selectedOptionImage = selectedOption
          ? selectedOption.getAttribute("data-image")
          : null,
        selectedOptionText = "",
        selectedOptionClasses,
        self = this;

      if (this.realElement.prop("multiple")) {
        $.each(this.realElement.prop("options"), function (index, option) {
          if (option.selected) {
            selectedOptionText +=
              (selectedOptionText ? ", " : "") + option.innerHTML;
          }
        });
        if (!selectedOptionText) {
          selectedOptionText = self.realElement.attr("placeholder") || "";
        }
        this.selectText.removeAttr("class").html(selectedOptionText);
      } else if (!selectedOption) {
        if (this.selectImage) {
          this.selectImage.hide();
        }
        this.selectText.removeAttr("class").empty();
      } else if (
        this.currentSelectedText !== selectedOption.innerHTML ||
        this.currentSelectedImage !== selectedOptionImage
      ) {
        selectedOptionClasses = getPrefixedClasses(
          selectedOption.className,
          this.options.optionClassPrefix
        );
        this.selectText
          .attr("class", selectedOptionClasses)
          .html(selectedOption.innerHTML);

        if (selectedOptionImage) {
          if (!this.selectImage) {
            this.selectImage = $("<img>")
              .prependTo(this.selectTextContainer)
              .hide();
          }
          this.selectImage.attr("src", selectedOptionImage).show();
        } else if (this.selectImage) {
          this.selectImage.hide();
        }

        this.currentSelectedText = selectedOption.innerHTML;
        this.currentSelectedImage = selectedOptionImage;
      }
    },
    refresh: function () {
      // refresh fake select visibility
      if (this.realElement.prop("style").display === "none") {
        this.fakeElement.hide();
      } else {
        this.fakeElement.show();
      }

      // refresh selected text
      this.refreshSelectedText();

      // handle disabled state
      this.fakeElement.toggleClass(
        this.options.disabledClass,
        this.realElement.is(":disabled")
      );
    },
    destroy: function () {
      // restore structure
      if (this.options.wrapNative) {
        this.realElement
          .insertBefore(this.fakeElement)
          .css({
            position: "",
            height: "",
            width: "",
          })
          .removeClass(this.options.resetAppearanceClass);
      } else {
        this.realElement.removeClass(this.options.hiddenClass);
        if (this.realElement.is("[jcf-size]")) {
          this.realElement.removeAttr("size jcf-size");
        }
      }

      // removing element will also remove its event handlers
      this.fakeElement.remove();

      // remove other event handlers
      this.doc.off("jcf-pointerup", this.onSelectAreaRelease);
      this.realElement.off({
        focus: this.onFocus,
      });
    },
  });

  // listbox module
  function ListBox(options) {
    this.options = $.extend(
      {
        wrapNative: true,
        useCustomScroll: true,
        fakeStructure:
          '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
        selectClassPrefix: "jcf-select-",
        listHolder: ".jcf-list-wrapper",
      },
      options
    );
    this.init();
  }
  $.extend(ListBox.prototype, {
    init: function () {
      this.bindHandlers();
      this.initStructure();
      this.attachEvents();
    },
    initStructure: function () {
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeStructure).insertAfter(
        this.realElement
      );
      this.listHolder = this.fakeElement.find(this.options.listHolder);
      makeUnselectable(this.fakeElement);

      // copy classes from original select
      this.fakeElement.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );
      this.realElement.addClass(this.options.hiddenClass);

      this.list = new SelectList({
        useCustomScroll: this.options.useCustomScroll,
        holder: this.listHolder,
        selectOnClick: false,
        element: this.realElement,
      });
    },
    attachEvents: function () {
      // delayed refresh handler
      var self = this;
      this.delayedRefresh = function (e) {
        if (e && e.which === 16) {
          // ignore SHIFT key
          return;
        } else {
          clearTimeout(self.refreshTimer);
          self.refreshTimer = setTimeout(function () {
            self.refresh();
            self.list.scrollToActiveOption();
          }, 1);
        }
      };

      // other event handlers
      this.realElement.on({
        focus: this.onFocus,
        click: this.delayedRefresh,
        keydown: this.delayedRefresh,
      });

      // select list event handlers
      $(this.list).on({
        select: this.onSelect,
        press: this.onFakeOptionsPress,
        release: this.onFakeOptionsRelease,
      });
    },
    onFakeOptionsPress: function (e, pointerEvent) {
      this.pressedFlag = true;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onFakeOptionsRelease: function (e, pointerEvent) {
      this.pressedFlag = false;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onSelect: function () {
      this.fireNativeEvent(this.realElement, "change");
      this.fireNativeEvent(this.realElement, "click");
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
        this.focusedFlag = true;
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
        this.focusedFlag = false;
      }
    },
    refresh: function () {
      this.fakeElement.toggleClass(
        this.options.disabledClass,
        this.realElement.is(":disabled")
      );
      this.list.refresh();
    },
    destroy: function () {
      this.list.destroy();
      this.realElement
        .insertBefore(this.fakeElement)
        .removeClass(this.options.hiddenClass);
      this.fakeElement.remove();
    },
  });

  // options list module
  function SelectList(options) {
    this.options = $.extend(
      {
        holder: null,
        maxVisibleItems: 10,
        selectOnClick: true,
        useHoverClass: false,
        useCustomScroll: false,
        handleResize: true,
        multipleSelectWithoutKey: false,
        alwaysPreventMouseWheel: false,
        indexAttribute: "data-index",
        cloneClassPrefix: "jcf-option-",
        containerStructure:
          '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
        containerSelector: ".jcf-list-content",
        captionClass: "jcf-optgroup-caption",
        disabledClass: "jcf-disabled",
        optionClass: "jcf-option",
        groupClass: "jcf-optgroup",
        hoverClass: "jcf-hover",
        selectedClass: "jcf-selected",
        scrollClass: "jcf-scroll-active",
      },
      options
    );
    this.init();
  }
  $.extend(SelectList.prototype, {
    init: function () {
      this.initStructure();
      this.refreshSelectedClass();
      this.attachEvents();
    },
    initStructure: function () {
      this.element = $(this.options.element);
      this.indexSelector = "[" + this.options.indexAttribute + "]";
      this.container = $(this.options.containerStructure).appendTo(
        this.options.holder
      );
      this.listHolder = this.container.find(this.options.containerSelector);
      this.lastClickedIndex = this.element.prop("selectedIndex");
      this.rebuildList();
    },
    attachEvents: function () {
      this.bindHandlers();
      this.listHolder.on(
        "jcf-pointerdown",
        this.indexSelector,
        this.onItemPress
      );
      this.listHolder.on("jcf-pointerdown", this.onPress);

      if (this.options.useHoverClass) {
        this.listHolder.on(
          "jcf-pointerover",
          this.indexSelector,
          this.onHoverItem
        );
      }
    },
    onPress: function (e) {
      $(this).trigger("press", e);
      this.listHolder.on("jcf-pointerup", this.onRelease);
    },
    onRelease: function (e) {
      $(this).trigger("release", e);
      this.listHolder.off("jcf-pointerup", this.onRelease);
    },
    onHoverItem: function (e) {
      var hoverIndex = parseFloat(
        e.currentTarget.getAttribute(this.options.indexAttribute)
      );
      this.fakeOptions
        .removeClass(this.options.hoverClass)
        .eq(hoverIndex)
        .addClass(this.options.hoverClass);
    },
    onItemPress: function (e) {
      if (e.pointerType === "touch" || this.options.selectOnClick) {
        // select option after "click"
        this.tmpListOffsetTop = this.list.offset().top;
        this.listHolder.on(
          "jcf-pointerup",
          this.indexSelector,
          this.onItemRelease
        );
      } else {
        // select option immediately
        this.onSelectItem(e);
      }
    },
    onItemRelease: function (e) {
      // remove event handlers and temporary data
      this.listHolder.off(
        "jcf-pointerup",
        this.indexSelector,
        this.onItemRelease
      );

      // simulate item selection
      if (this.tmpListOffsetTop === this.list.offset().top) {
        this.listHolder.on(
          "click",
          this.indexSelector,
          { savedPointerType: e.pointerType },
          this.onSelectItem
        );
      }
      delete this.tmpListOffsetTop;
    },
    onSelectItem: function (e) {
      var clickedIndex = parseFloat(
          e.currentTarget.getAttribute(this.options.indexAttribute)
        ),
        pointerType =
          (e.data && e.data.savedPointerType) || e.pointerType || "mouse",
        range;

      // remove click event handler
      this.listHolder.off("click", this.indexSelector, this.onSelectItem);

      // ignore clicks on disabled options
      if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
        return;
      }

      if (this.element.prop("multiple")) {
        if (
          e.metaKey ||
          e.ctrlKey ||
          pointerType === "touch" ||
          this.options.multipleSelectWithoutKey
        ) {
          // if CTRL/CMD pressed or touch devices - toggle selected option
          this.realOptions[clickedIndex].selected =
            !this.realOptions[clickedIndex].selected;
        } else if (e.shiftKey) {
          // if SHIFT pressed - update selection
          range = [this.lastClickedIndex, clickedIndex].sort(function (a, b) {
            return a - b;
          });
          this.realOptions.each(function (index, option) {
            option.selected = index >= range[0] && index <= range[1];
          });
        } else {
          // set single selected index
          this.element.prop("selectedIndex", clickedIndex);
        }
      } else {
        this.element.prop("selectedIndex", clickedIndex);
      }

      // save last clicked option
      if (!e.shiftKey) {
        this.lastClickedIndex = clickedIndex;
      }

      // refresh classes
      this.refreshSelectedClass();

      // scroll to active item in desktop browsers
      if (pointerType === "mouse") {
        this.scrollToActiveOption();
      }

      // make callback when item selected
      $(this).trigger("select");
    },
    rebuildList: function () {
      // rebuild options
      var self = this,
        rootElement = this.element[0];

      // recursively create fake options
      this.storedSelectHTML = rootElement.innerHTML;
      this.optionIndex = 0;
      this.list = $(this.createOptionsList(rootElement));
      this.listHolder.empty().append(this.list);
      this.realOptions = this.element.find("option");
      this.fakeOptions = this.list.find(this.indexSelector);
      this.fakeListItems = this.list.find(
        "." + this.options.captionClass + "," + this.indexSelector
      );
      delete this.optionIndex;

      // detect max visible items
      var maxCount = this.options.maxVisibleItems,
        sizeValue = this.element.prop("size");
      if (sizeValue > 1 && !this.element.is("[jcf-size]")) {
        maxCount = sizeValue;
      }

      // handle scrollbar
      var needScrollBar = this.fakeOptions.length > maxCount;
      this.container.toggleClass(this.options.scrollClass, needScrollBar);
      if (needScrollBar) {
        // change max-height
        this.listHolder.css({
          maxHeight: this.getOverflowHeight(maxCount),
          overflow: "auto",
        });

        if (this.options.useCustomScroll && jcf.modules.Scrollable) {
          // add custom scrollbar if specified in options
          jcf.replace(this.listHolder, "Scrollable", {
            handleResize: this.options.handleResize,
            alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel,
          });
          return;
        }
      }

      // disable edge wheel scrolling
      if (this.options.alwaysPreventMouseWheel) {
        this.preventWheelHandler = function (e) {
          var currentScrollTop = self.listHolder.scrollTop(),
            maxScrollTop =
              self.listHolder.prop("scrollHeight") -
              self.listHolder.innerHeight();

          // check edge cases
          if (
            (currentScrollTop <= 0 && e.deltaY < 0) ||
            (currentScrollTop >= maxScrollTop && e.deltaY > 0)
          ) {
            e.preventDefault();
          }
        };
        this.listHolder.on("jcf-mousewheel", this.preventWheelHandler);
      }
    },
    refreshSelectedClass: function () {
      var self = this,
        selectedItem,
        isMultiple = this.element.prop("multiple"),
        selectedIndex = this.element.prop("selectedIndex");

      if (isMultiple) {
        this.realOptions.each(function (index, option) {
          self.fakeOptions
            .eq(index)
            .toggleClass(self.options.selectedClass, !!option.selected);
        });
      } else {
        this.fakeOptions.removeClass(
          this.options.selectedClass + " " + this.options.hoverClass
        );
        selectedItem = this.fakeOptions
          .eq(selectedIndex)
          .addClass(this.options.selectedClass);
        if (this.options.useHoverClass) {
          selectedItem.addClass(this.options.hoverClass);
        }
      }
    },
    scrollToActiveOption: function () {
      // scroll to target option
      var targetOffset = this.getActiveOptionOffset();
      if (typeof targetOffset === "number") {
        this.listHolder.prop("scrollTop", targetOffset);
      }
    },
    getSelectedIndexRange: function () {
      var firstSelected = -1,
        lastSelected = -1;
      this.realOptions.each(function (index, option) {
        if (option.selected) {
          if (firstSelected < 0) {
            firstSelected = index;
          }
          lastSelected = index;
        }
      });
      return [firstSelected, lastSelected];
    },
    getChangedSelectedIndex: function () {
      var selectedIndex = this.element.prop("selectedIndex"),
        targetIndex;

      if (this.element.prop("multiple")) {
        // multiple selects handling
        if (!this.previousRange) {
          this.previousRange = [selectedIndex, selectedIndex];
        }
        this.currentRange = this.getSelectedIndexRange();
        targetIndex =
          this.currentRange[
            this.currentRange[0] !== this.previousRange[0] ? 0 : 1
          ];
        this.previousRange = this.currentRange;
        return targetIndex;
      } else {
        // single choice selects handling
        return selectedIndex;
      }
    },
    getActiveOptionOffset: function () {
      // calc values
      var dropHeight = this.listHolder.height(),
        dropScrollTop = this.listHolder.prop("scrollTop"),
        currentIndex = this.getChangedSelectedIndex(),
        fakeOption = this.fakeOptions.eq(currentIndex),
        fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
        fakeOptionHeight = fakeOption.innerHeight();

      // scroll list
      if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
        // scroll down (always scroll to option)
        return fakeOptionOffset - dropHeight + fakeOptionHeight;
      } else if (fakeOptionOffset < dropScrollTop) {
        // scroll up to option
        return fakeOptionOffset;
      }
    },
    getOverflowHeight: function (sizeValue) {
      var item = this.fakeListItems.eq(sizeValue - 1),
        listOffset = this.list.offset().top,
        itemOffset = item.offset().top,
        itemHeight = item.innerHeight();

      return itemOffset + itemHeight - listOffset;
    },
    getScrollTop: function () {
      return this.listHolder.scrollTop();
    },
    setScrollTop: function (value) {
      this.listHolder.scrollTop(value);
    },
    createOption: function (option) {
      var newOption = document.createElement("span");
      newOption.className = this.options.optionClass;
      newOption.innerHTML = option.innerHTML;
      newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

      var optionImage,
        optionImageSrc = option.getAttribute("data-image");
      if (optionImageSrc) {
        optionImage = document.createElement("img");
        optionImage.src = optionImageSrc;
        newOption.insertBefore(optionImage, newOption.childNodes[0]);
      }
      if (option.disabled) {
        newOption.className += " " + this.options.disabledClass;
      }
      if (option.className) {
        newOption.className +=
          " " +
          getPrefixedClasses(option.className, this.options.cloneClassPrefix);
      }
      return newOption;
    },
    createOptGroup: function (optgroup) {
      var optGroupContainer = document.createElement("span"),
        optGroupName = optgroup.getAttribute("label"),
        optGroupCaption,
        optGroupList;

      // create caption
      optGroupCaption = document.createElement("span");
      optGroupCaption.className = this.options.captionClass;
      optGroupCaption.innerHTML = optGroupName;
      optGroupContainer.appendChild(optGroupCaption);

      // create list of options
      if (optgroup.children.length) {
        optGroupList = this.createOptionsList(optgroup);
        optGroupContainer.appendChild(optGroupList);
      }

      optGroupContainer.className = this.options.groupClass;
      return optGroupContainer;
    },
    createOptionContainer: function () {
      var optionContainer = document.createElement("li");
      return optionContainer;
    },
    createOptionsList: function (container) {
      var self = this,
        list = document.createElement("ul");

      $.each(container.children, function (index, currentNode) {
        var item = self.createOptionContainer(currentNode),
          newNode;

        switch (currentNode.tagName.toLowerCase()) {
          case "option":
            newNode = self.createOption(currentNode);
            break;
          case "optgroup":
            newNode = self.createOptGroup(currentNode);
            break;
        }
        list.appendChild(item).appendChild(newNode);
      });
      return list;
    },
    refresh: function () {
      // check for select innerHTML changes
      if (this.storedSelectHTML !== this.element.prop("innerHTML")) {
        this.rebuildList();
      }

      // refresh custom scrollbar
      var scrollInstance = jcf.getInstance(this.listHolder);
      if (scrollInstance) {
        scrollInstance.refresh();
      }

      // refresh selectes classes
      this.refreshSelectedClass();
    },
    destroy: function () {
      this.listHolder.off("jcf-mousewheel", this.preventWheelHandler);
      this.listHolder.off(
        "jcf-pointerdown",
        this.indexSelector,
        this.onSelectItem
      );
      this.listHolder.off(
        "jcf-pointerover",
        this.indexSelector,
        this.onHoverItem
      );
      this.listHolder.off("jcf-pointerdown", this.onPress);
    },
  });

  // helper functions
  var getPrefixedClasses = function (className, prefixToAdd) {
    return className
      ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + "$1 ")
      : "";
  };
  var makeUnselectable = (function () {
    var unselectableClass = jcf.getOptions().unselectableClass;
    function preventHandler(e) {
      e.preventDefault();
    }
    return function (node) {
      node.addClass(unselectableClass).on("selectstart", preventHandler);
    };
  })();
})(jQuery, this);

/*!
 * JavaScript Custom Forms : Scrollbar Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($, window) {
  "use strict";

  jcf.addModule({
    name: "Scrollable",
    selector: ".jcf-scrollable",
    plugins: {
      ScrollBar: ScrollBar,
    },
    options: {
      mouseWheelStep: 150,
      handleResize: true,
      alwaysShowScrollbars: false,
      alwaysPreventMouseWheel: false,
      scrollAreaStructure: '<div class="jcf-scrollable-wrapper"></div>',
    },
    matchElement: function (element) {
      return element.is(".jcf-scrollable");
    },
    init: function () {
      this.initStructure();
      this.attachEvents();
      this.rebuildScrollbars();
    },
    initStructure: function () {
      // prepare structure
      this.doc = $(document);
      this.win = $(window);
      this.realElement = $(this.options.element);
      this.scrollWrapper = $(this.options.scrollAreaStructure).insertAfter(
        this.realElement
      );

      // set initial styles
      this.scrollWrapper.css("position", "relative");
      // this.realElement.css('overflow', 'hidden');
      this.realElement.css(
        "overflow",
        this.options.ios && this.options.ios >= 10 ? "auto" : "hidden"
      );
      this.vBarEdge = 0;
    },
    attachEvents: function () {
      // create scrollbars
      var self = this;
      this.vBar = new ScrollBar({
        holder: this.scrollWrapper,
        vertical: true,
        onScroll: function (scrollTop) {
          self.realElement.scrollTop(scrollTop);
        },
      });
      this.hBar = new ScrollBar({
        holder: this.scrollWrapper,
        vertical: false,
        onScroll: function (scrollLeft) {
          self.realElement.scrollLeft(scrollLeft);
        },
      });

      // add event handlers
      this.realElement.on("scroll", this.onScroll);
      if (this.options.handleResize) {
        this.win.on("resize orientationchange load", this.onResize);
      }

      // add pointer/wheel event handlers
      this.realElement.on("jcf-mousewheel", this.onMouseWheel);
      this.realElement.on("jcf-pointerdown", this.onTouchBody);
    },
    onScroll: function () {
      this.redrawScrollbars();
    },
    onResize: function () {
      // do not rebuild scrollbars if form field is in focus
      if (!$(document.activeElement).is(":input")) {
        this.rebuildScrollbars();
      }
    },
    onTouchBody: function (e) {
      if (e.pointerType === "touch") {
        this.touchData = {
          scrollTop: this.realElement.scrollTop(),
          scrollLeft: this.realElement.scrollLeft(),
          left: e.pageX,
          top: e.pageY,
        };
        this.doc.on({
          "jcf-pointermove": this.onMoveBody,
          "jcf-pointerup": this.onReleaseBody,
        });
      }
    },
    onMoveBody: function (e) {
      var targetScrollTop,
        targetScrollLeft,
        verticalScrollAllowed = this.verticalScrollActive,
        horizontalScrollAllowed = this.horizontalScrollActive;

      if (e.pointerType === "touch") {
        targetScrollTop =
          this.touchData.scrollTop - e.pageY + this.touchData.top;
        targetScrollLeft =
          this.touchData.scrollLeft - e.pageX + this.touchData.left;

        // check that scrolling is ended and release outer scrolling
        if (
          this.verticalScrollActive &&
          (targetScrollTop < 0 || targetScrollTop > this.vBar.maxValue)
        ) {
          verticalScrollAllowed = false;
        }
        if (
          this.horizontalScrollActive &&
          (targetScrollLeft < 0 || targetScrollLeft > this.hBar.maxValue)
        ) {
          horizontalScrollAllowed = false;
        }

        this.realElement.scrollTop(targetScrollTop);
        this.realElement.scrollLeft(targetScrollLeft);

        if (verticalScrollAllowed || horizontalScrollAllowed) {
          e.preventDefault();
        } else {
          this.onReleaseBody(e);
        }
      }
    },
    onReleaseBody: function (e) {
      if (e.pointerType === "touch") {
        delete this.touchData;
        this.doc.off({
          "jcf-pointermove": this.onMoveBody,
          "jcf-pointerup": this.onReleaseBody,
        });
      }
    },
    onMouseWheel: function (e) {
      var currentScrollTop = this.realElement.scrollTop(),
        currentScrollLeft = this.realElement.scrollLeft(),
        maxScrollTop =
          this.realElement.prop("scrollHeight") -
          this.embeddedDimensions.innerHeight,
        maxScrollLeft =
          this.realElement.prop("scrollWidth") -
          this.embeddedDimensions.innerWidth,
        extraLeft,
        extraTop,
        preventFlag;

      // check edge cases
      if (!this.options.alwaysPreventMouseWheel) {
        if (this.verticalScrollActive && e.deltaY) {
          if (
            !(currentScrollTop <= 0 && e.deltaY < 0) &&
            !(currentScrollTop >= maxScrollTop && e.deltaY > 0)
          ) {
            preventFlag = true;
          }
        }
        if (this.horizontalScrollActive && e.deltaX) {
          if (
            !(currentScrollLeft <= 0 && e.deltaX < 0) &&
            !(currentScrollLeft >= maxScrollLeft && e.deltaX > 0)
          ) {
            preventFlag = true;
          }
        }
        if (!this.verticalScrollActive && !this.horizontalScrollActive) {
          return;
        }
      }

      // prevent default action and scroll item
      if (preventFlag || this.options.alwaysPreventMouseWheel) {
        e.preventDefault();
      } else {
        return;
      }

      extraLeft = (e.deltaX / 100) * this.options.mouseWheelStep;
      extraTop = (e.deltaY / 100) * this.options.mouseWheelStep;

      this.realElement.scrollTop(currentScrollTop + extraTop);
      this.realElement.scrollLeft(currentScrollLeft + extraLeft);
    },
    setScrollBarEdge: function (edgeSize) {
      this.vBarEdge = edgeSize || 0;
      this.redrawScrollbars();
    },
    saveElementDimensions: function () {
      this.savedDimensions = {
        top: this.realElement.width(),
        left: this.realElement.height(),
      };
      return this;
    },
    restoreElementDimensions: function () {
      if (this.savedDimensions) {
        this.realElement.css({
          width: this.savedDimensions.width,
          height: this.savedDimensions.height,
        });
      }
      return this;
    },
    saveScrollOffsets: function () {
      this.savedOffsets = {
        top: this.realElement.scrollTop(),
        left: this.realElement.scrollLeft(),
      };
      return this;
    },
    restoreScrollOffsets: function () {
      if (this.savedOffsets) {
        this.realElement.scrollTop(this.savedOffsets.top);
        this.realElement.scrollLeft(this.savedOffsets.left);
      }
      return this;
    },
    getContainerDimensions: function () {
      // save current styles
      var desiredDimensions, currentStyles, currentHeight, currentWidth;

      if (this.isModifiedStyles) {
        desiredDimensions = {
          width: this.realElement.innerWidth() + this.vBar.getThickness(),
          height: this.realElement.innerHeight() + this.hBar.getThickness(),
        };
      } else {
        // unwrap real element and measure it according to CSS
        this.saveElementDimensions().saveScrollOffsets();
        this.realElement.insertAfter(this.scrollWrapper);
        this.scrollWrapper.detach();

        // measure element
        currentStyles = this.realElement.prop("style");
        currentWidth = parseFloat(currentStyles.width);
        currentHeight = parseFloat(currentStyles.height);

        // reset styles if needed
        if (this.embeddedDimensions && currentWidth && currentHeight) {
          this.isModifiedStyles |=
            currentWidth !== this.embeddedDimensions.width ||
            currentHeight !== this.embeddedDimensions.height;
          this.realElement.css({
            overflow: "",
            width: "",
            height: "",
          });
        }

        // calculate desired dimensions for real element
        desiredDimensions = {
          width: this.realElement.outerWidth(),
          height: this.realElement.outerHeight(),
        };

        // restore structure and original scroll offsets
        this.scrollWrapper.insertAfter(this.realElement);
        this.realElement
          .css(
            "overflow",
            this.options.ios && this.options.ios >= 10 ? "auto" : "hidden"
          )
          .prependTo(this.scrollWrapper);
        this.restoreElementDimensions().restoreScrollOffsets();
      }

      return desiredDimensions;
    },
    getEmbeddedDimensions: function (dimensions) {
      // handle scrollbars cropping
      var fakeBarWidth = this.vBar.getThickness(),
        fakeBarHeight = this.hBar.getThickness(),
        paddingWidth = this.realElement.outerWidth() - this.realElement.width(),
        paddingHeight =
          this.realElement.outerHeight() - this.realElement.height(),
        resultDimensions;

      if (this.options.alwaysShowScrollbars) {
        // simply return dimensions without custom scrollbars
        this.verticalScrollActive = true;
        this.horizontalScrollActive = true;
        resultDimensions = {
          innerWidth: dimensions.width - fakeBarWidth,
          innerHeight: dimensions.height - fakeBarHeight,
        };
      } else {
        // detect when to display each scrollbar
        this.saveElementDimensions();
        this.verticalScrollActive = false;
        this.horizontalScrollActive = false;

        // fill container with full size
        this.realElement.css({
          width: dimensions.width - paddingWidth,
          height: dimensions.height - paddingHeight,
        });

        this.horizontalScrollActive =
          this.realElement.prop("scrollWidth") > this.containerDimensions.width;
        this.verticalScrollActive =
          this.realElement.prop("scrollHeight") >
          this.containerDimensions.height;

        this.restoreElementDimensions();
        resultDimensions = {
          innerWidth:
            dimensions.width - (this.verticalScrollActive ? fakeBarWidth : 0),
          innerHeight:
            dimensions.height -
            (this.horizontalScrollActive ? fakeBarHeight : 0),
        };
      }
      $.extend(resultDimensions, {
        width: resultDimensions.innerWidth - paddingWidth,
        height: resultDimensions.innerHeight - paddingHeight,
      });
      return resultDimensions;
    },
    rebuildScrollbars: function () {
      // resize wrapper according to real element styles
      this.containerDimensions = this.getContainerDimensions();
      this.embeddedDimensions = this.getEmbeddedDimensions(
        this.containerDimensions
      );

      // resize wrapper to desired dimensions
      this.scrollWrapper.css({
        width: this.containerDimensions.width,
        height: this.containerDimensions.height,
      });

      // resize element inside wrapper excluding scrollbar size
      this.realElement.css({
        overflow:
          this.options.ios && this.options.ios >= 10 ? "auto" : "hidden",
        width: this.embeddedDimensions.width,
        height: this.embeddedDimensions.height,
      });

      // redraw scrollbar offset
      this.redrawScrollbars();
    },
    redrawScrollbars: function () {
      var viewSize, maxScrollValue;

      // redraw vertical scrollbar
      if (this.verticalScrollActive) {
        viewSize = this.vBarEdge
          ? this.containerDimensions.height - this.vBarEdge
          : this.embeddedDimensions.innerHeight;
        maxScrollValue =
          Math.max(
            this.realElement.prop("offsetHeight"),
            this.realElement.prop("scrollHeight")
          ) - this.vBarEdge;

        this.vBar
          .show()
          .setMaxValue(maxScrollValue - viewSize)
          .setRatio(viewSize / maxScrollValue)
          .setSize(viewSize);
        this.vBar.setValue(this.realElement.scrollTop());
      } else {
        this.vBar.hide();
      }

      // redraw horizontal scrollbar
      if (this.horizontalScrollActive) {
        viewSize = this.embeddedDimensions.innerWidth;
        maxScrollValue = this.realElement.prop("scrollWidth");

        if (maxScrollValue === viewSize) {
          this.horizontalScrollActive = false;
        }
        this.hBar
          .show()
          .setMaxValue(maxScrollValue - viewSize)
          .setRatio(viewSize / maxScrollValue)
          .setSize(viewSize);
        this.hBar.setValue(this.realElement.scrollLeft());
      } else {
        this.hBar.hide();
      }

      // set "touch-action" style rule
      var touchAction = "";
      if (this.verticalScrollActive && this.horizontalScrollActive) {
        touchAction = "none";
      } else if (this.verticalScrollActive) {
        touchAction = "pan-x";
      } else if (this.horizontalScrollActive) {
        touchAction = "pan-y";
      }
      this.realElement.css("touchAction", touchAction);
    },
    refresh: function () {
      this.rebuildScrollbars();
    },
    destroy: function () {
      // remove event listeners
      this.win.off("resize orientationchange load", this.onResize);
      this.realElement.off({
        "jcf-mousewheel": this.onMouseWheel,
        "jcf-pointerdown": this.onTouchBody,
      });
      this.doc.off({
        "jcf-pointermove": this.onMoveBody,
        "jcf-pointerup": this.onReleaseBody,
      });

      // restore structure
      this.saveScrollOffsets();
      this.vBar.destroy();
      this.hBar.destroy();
      this.realElement.insertAfter(this.scrollWrapper).css({
        touchAction: "",
        overflow: "",
        width: "",
        height: "",
      });
      this.scrollWrapper.remove();
      this.restoreScrollOffsets();
    },
  });

  // custom scrollbar
  function ScrollBar(options) {
    this.options = $.extend(
      {
        holder: null,
        vertical: true,
        inactiveClass: "jcf-inactive",
        verticalClass: "jcf-scrollbar-vertical",
        horizontalClass: "jcf-scrollbar-horizontal",
        scrollbarStructure:
          '<div class="jcf-scrollbar"><div class="jcf-scrollbar-dec"></div><div class="jcf-scrollbar-slider"><div class="jcf-scrollbar-handle"></div></div><div class="jcf-scrollbar-inc"></div></div>',
        btnDecSelector: ".jcf-scrollbar-dec",
        btnIncSelector: ".jcf-scrollbar-inc",
        sliderSelector: ".jcf-scrollbar-slider",
        handleSelector: ".jcf-scrollbar-handle",
        scrollInterval: 300,
        scrollStep: 400, // px/sec
      },
      options
    );
    this.init();
  }
  $.extend(ScrollBar.prototype, {
    init: function () {
      this.initStructure();
      this.attachEvents();
    },
    initStructure: function () {
      // define proporties
      this.doc = $(document);
      this.isVertical = !!this.options.vertical;
      this.sizeProperty = this.isVertical ? "height" : "width";
      this.fullSizeProperty = this.isVertical ? "outerHeight" : "outerWidth";
      this.invertedSizeProperty = this.isVertical ? "width" : "height";
      this.thicknessMeasureMethod =
        "outer" +
        this.invertedSizeProperty.charAt(0).toUpperCase() +
        this.invertedSizeProperty.substr(1);
      this.offsetProperty = this.isVertical ? "top" : "left";
      this.offsetEventProperty = this.isVertical ? "pageY" : "pageX";

      // initialize variables
      this.value = this.options.value || 0;
      this.maxValue = this.options.maxValue || 0;
      this.currentSliderSize = 0;
      this.handleSize = 0;

      // find elements
      this.holder = $(this.options.holder);
      this.scrollbar = $(this.options.scrollbarStructure).appendTo(this.holder);
      this.btnDec = this.scrollbar.find(this.options.btnDecSelector);
      this.btnInc = this.scrollbar.find(this.options.btnIncSelector);
      this.slider = this.scrollbar.find(this.options.sliderSelector);
      this.handle = this.slider.find(this.options.handleSelector);

      // set initial styles
      this.scrollbar
        .addClass(
          this.isVertical
            ? this.options.verticalClass
            : this.options.horizontalClass
        )
        .css({
          touchAction: this.isVertical ? "pan-x" : "pan-y",
          position: "absolute",
        });
      this.slider.css({
        position: "relative",
      });
      this.handle.css({
        touchAction: "none",
        position: "absolute",
      });
    },
    attachEvents: function () {
      this.bindHandlers();
      this.handle.on("jcf-pointerdown", this.onHandlePress);
      this.slider
        .add(this.btnDec)
        .add(this.btnInc)
        .on("jcf-pointerdown", this.onButtonPress);
    },
    onHandlePress: function (e) {
      if (e.pointerType === "mouse" && e.button > 1) {
        return;
      } else {
        e.preventDefault();
        this.handleDragActive = true;
        this.sliderOffset = this.slider.offset()[this.offsetProperty];
        this.innerHandleOffset =
          e[this.offsetEventProperty] -
          this.handle.offset()[this.offsetProperty];

        this.doc.on("jcf-pointermove", this.onHandleDrag);
        this.doc.on("jcf-pointerup", this.onHandleRelease);
      }
    },
    onHandleDrag: function (e) {
      e.preventDefault();
      this.calcOffset =
        e[this.offsetEventProperty] -
        this.sliderOffset -
        this.innerHandleOffset;
      this.setValue(
        (this.calcOffset / (this.currentSliderSize - this.handleSize)) *
          this.maxValue
      );
      this.triggerScrollEvent(this.value);
    },
    onHandleRelease: function () {
      this.handleDragActive = false;
      this.doc.off("jcf-pointermove", this.onHandleDrag);
      this.doc.off("jcf-pointerup", this.onHandleRelease);
    },
    onButtonPress: function (e) {
      var direction, clickOffset;
      if (e.pointerType === "mouse" && e.button > 1) {
        return;
      } else {
        e.preventDefault();
        if (!this.handleDragActive) {
          if (this.slider.is(e.currentTarget)) {
            // slider pressed
            direction =
              this.handle.offset()[this.offsetProperty] >
              e[this.offsetEventProperty]
                ? -1
                : 1;
            clickOffset =
              e[this.offsetEventProperty] -
              this.slider.offset()[this.offsetProperty];
            this.startPageScrolling(direction, clickOffset);
          } else {
            // scrollbar buttons pressed
            direction = this.btnDec.is(e.currentTarget) ? -1 : 1;
            this.startSmoothScrolling(direction);
          }
          this.doc.on("jcf-pointerup", this.onButtonRelease);
        }
      }
    },
    onButtonRelease: function () {
      this.stopPageScrolling();
      this.stopSmoothScrolling();
      this.doc.off("jcf-pointerup", this.onButtonRelease);
    },
    startPageScrolling: function (direction, clickOffset) {
      var self = this,
        stepValue = direction * self.currentSize;

      // limit checker
      var isFinishedScrolling = function () {
        var handleTop =
          (self.value / self.maxValue) *
          (self.currentSliderSize - self.handleSize);

        if (direction > 0) {
          return handleTop + self.handleSize >= clickOffset;
        } else {
          return handleTop <= clickOffset;
        }
      };

      // scroll by page when track is pressed
      var doPageScroll = function () {
        self.value += stepValue;
        self.setValue(self.value);
        self.triggerScrollEvent(self.value);

        if (isFinishedScrolling()) {
          clearInterval(self.pageScrollTimer);
        }
      };

      // start scrolling
      this.pageScrollTimer = setInterval(
        doPageScroll,
        this.options.scrollInterval
      );
      doPageScroll();
    },
    stopPageScrolling: function () {
      clearInterval(this.pageScrollTimer);
    },
    startSmoothScrolling: function (direction) {
      var self = this,
        dt;
      this.stopSmoothScrolling();

      // simple animation functions
      var raf =
        window.requestAnimationFrame ||
        function (func) {
          setTimeout(func, 16);
        };
      var getTimestamp = function () {
        return Date.now ? Date.now() : new Date().getTime();
      };

      // set animation limit
      var isFinishedScrolling = function () {
        if (direction > 0) {
          return self.value >= self.maxValue;
        } else {
          return self.value <= 0;
        }
      };

      // animation step
      var doScrollAnimation = function () {
        var stepValue =
          ((getTimestamp() - dt) / 1000) * self.options.scrollStep;

        if (self.smoothScrollActive) {
          self.value += stepValue * direction;
          self.setValue(self.value);
          self.triggerScrollEvent(self.value);

          if (!isFinishedScrolling()) {
            dt = getTimestamp();
            raf(doScrollAnimation);
          }
        }
      };

      // start animation
      self.smoothScrollActive = true;
      dt = getTimestamp();
      raf(doScrollAnimation);
    },
    stopSmoothScrolling: function () {
      this.smoothScrollActive = false;
    },
    triggerScrollEvent: function (scrollValue) {
      if (this.options.onScroll) {
        this.options.onScroll(scrollValue);
      }
    },
    getThickness: function () {
      return this.scrollbar[this.thicknessMeasureMethod]();
    },
    setSize: function (size) {
      // resize scrollbar
      var btnDecSize = this.btnDec[this.fullSizeProperty](),
        btnIncSize = this.btnInc[this.fullSizeProperty]();

      // resize slider
      this.currentSize = size;
      this.currentSliderSize = size - btnDecSize - btnIncSize;
      this.scrollbar.css(this.sizeProperty, size);
      this.slider.css(this.sizeProperty, this.currentSliderSize);
      this.currentSliderSize = this.slider[this.sizeProperty]();

      // resize handle
      this.handleSize = Math.round(this.currentSliderSize * this.ratio);
      this.handle.css(this.sizeProperty, this.handleSize);
      this.handleSize = this.handle[this.fullSizeProperty]();

      return this;
    },
    setRatio: function (ratio) {
      this.ratio = ratio;
      return this;
    },
    setMaxValue: function (maxValue) {
      this.maxValue = maxValue;
      this.setValue(Math.min(this.value, this.maxValue));
      return this;
    },
    setValue: function (value) {
      this.value = value;
      if (this.value < 0) {
        this.value = 0;
      } else if (this.value > this.maxValue) {
        this.value = this.maxValue;
      }
      this.refresh();
    },
    setPosition: function (styles) {
      this.scrollbar.css(styles);
      return this;
    },
    hide: function () {
      this.scrollbar.detach();
      return this;
    },
    show: function () {
      this.scrollbar.appendTo(this.holder);
      return this;
    },
    refresh: function () {
      // recalculate handle position
      if (this.value === 0 || this.maxValue === 0) {
        this.calcOffset = 0;
      } else {
        this.calcOffset =
          (this.value / this.maxValue) *
          (this.currentSliderSize - this.handleSize);
      }
      this.handle.css(this.offsetProperty, this.calcOffset);

      // toggle inactive classes
      this.btnDec.toggleClass(this.options.inactiveClass, this.value === 0);
      this.btnInc.toggleClass(
        this.options.inactiveClass,
        this.value === this.maxValue
      );
      this.scrollbar.toggleClass(
        this.options.inactiveClass,
        this.maxValue === 0
      );
    },
    destroy: function () {
      // remove event handlers and scrollbar block itself
      this.btnDec.add(this.btnInc).off("jcf-pointerdown", this.onButtonPress);
      this.handle.off("jcf-pointerdown", this.onHandlePress);
      this.doc.off("jcf-pointermove", this.onHandleDrag);
      this.doc.off("jcf-pointerup", this.onHandleRelease);
      this.doc.off("jcf-pointerup", this.onButtonRelease);
      this.stopSmoothScrolling();
      this.stopPageScrolling();
      this.scrollbar.remove();
    },
  });
})(jQuery, this);

/*!
 * JavaScript Custom Forms : Number Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($) {
  "use strict";

  jcf.addModule({
    name: "Number",
    selector: 'input[type="number"]',
    options: {
      realElementClass: "jcf-real-element",
      fakeStructure:
        '<span class="jcf-number"><span class="jcf-btn-inc"></span><span class="jcf-btn-dec"></span></span>',
      btnIncSelector: ".jcf-btn-inc",
      btnDecSelector: ".jcf-btn-dec",
      pressInterval: 150,
    },
    matchElement: function (element) {
      return element.is(this.selector);
    },
    init: function () {
      this.initStructure();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function () {
      this.page = $("html");
      this.realElement = $(this.options.element).addClass(
        this.options.realElementClass
      );
      this.fakeElement = $(this.options.fakeStructure)
        .insertBefore(this.realElement)
        .prepend(this.realElement);
      this.btnDec = this.fakeElement.find(this.options.btnDecSelector);
      this.btnInc = this.fakeElement.find(this.options.btnIncSelector);

      // set initial values
      this.initialValue = parseFloat(this.realElement.val()) || 0;
      this.minValue = parseFloat(this.realElement.attr("min"));
      this.maxValue = parseFloat(this.realElement.attr("max"));
      this.stepValue = parseFloat(this.realElement.attr("step")) || 1;

      // check attribute values
      this.minValue = isNaN(this.minValue) ? -Infinity : this.minValue;
      this.maxValue = isNaN(this.maxValue) ? Infinity : this.maxValue;

      // handle range
      if (isFinite(this.maxValue)) {
        this.maxValue -= (this.maxValue - this.minValue) % this.stepValue;
      }
    },
    attachEvents: function () {
      this.realElement.on({
        focus: this.onFocus,
      });
      this.btnDec.add(this.btnInc).on("jcf-pointerdown", this.onBtnPress);
    },
    onBtnPress: function (e) {
      var self = this,
        increment;

      if (!this.realElement.is(":disabled")) {
        increment = this.btnInc.is(e.currentTarget);

        self.step(increment);
        clearInterval(this.stepTimer);
        this.stepTimer = setInterval(function () {
          self.step(increment);
        }, this.options.pressInterval);

        this.page.on("jcf-pointerup", this.onBtnRelease);
      }
    },
    onBtnRelease: function () {
      clearInterval(this.stepTimer);
      this.page.off("jcf-pointerup", this.onBtnRelease);
    },
    onFocus: function () {
      this.fakeElement.addClass(this.options.focusClass);
      this.realElement.on({
        blur: this.onBlur,
        keydown: this.onKeyPress,
      });
    },
    onBlur: function () {
      this.fakeElement.removeClass(this.options.focusClass);
      this.realElement.off({
        blur: this.onBlur,
        keydown: this.onKeyPress,
      });
    },
    onKeyPress: function (e) {
      if (e.which === 38 || e.which === 40) {
        e.preventDefault();
        this.step(e.which === 38);
      }
    },
    step: function (increment) {
      var originalValue = parseFloat(this.realElement.val()),
        newValue = originalValue || 0,
        addValue = this.stepValue * (increment ? 1 : -1),
        edgeNumber = isFinite(this.minValue)
          ? this.minValue
          : this.initialValue - Math.abs(newValue * this.stepValue),
        diff = Math.abs(edgeNumber - newValue) % this.stepValue;

      // handle step diff
      if (diff) {
        if (increment) {
          newValue += addValue - diff;
        } else {
          newValue -= diff;
        }
      } else {
        newValue += addValue;
      }

      // handle min/max limits
      if (newValue < this.minValue) {
        newValue = this.minValue;
      } else if (newValue > this.maxValue) {
        newValue = this.maxValue;
      }

      // update value in real input if its changed
      if (newValue !== originalValue) {
        this.realElement.val(newValue).trigger("change");
        this.refresh();
      }
    },
    refresh: function () {
      var isDisabled = this.realElement.is(":disabled"),
        currentValue = parseFloat(this.realElement.val());

      // handle disabled state
      this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);

      // refresh button classes
      this.btnDec.toggleClass(
        this.options.disabledClass,
        currentValue === this.minValue
      );
      this.btnInc.toggleClass(
        this.options.disabledClass,
        currentValue === this.maxValue
      );
    },
    destroy: function () {
      // restore original structure
      this.realElement
        .removeClass(this.options.realElementClass)
        .insertBefore(this.fakeElement);
      this.fakeElement.remove();
      clearInterval(this.stepTimer);

      // remove event handlers
      this.page.off("jcf-pointerup", this.onBtnRelease);
      this.realElement.off({
        keydown: this.onKeyPress,
        focus: this.onFocus,
        blur: this.onBlur,
      });
    },
  });
})(jQuery);

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/
 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues
 */
(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  (e = (function () {
    function e(e, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(e),
        appendDots: i(e),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(e)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(e).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        "undefined" != typeof document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = t++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    }
    var t = 0;
    return e;
  })()),
    (e.prototype.activateADA = function () {
      var i = this;
      i.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : o === !0
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        s.options.rtl === !0 && s.options.vertical === !1 && (e = -e),
        s.transformsEnabled === !1
          ? s.options.vertical === !1
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : s.cssTransitions === !1
          ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    s.options.vertical === !1
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            s.options.vertical === !1
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this,
        o = t.getNavTarget();
      null !== o &&
        "object" == typeof o &&
        o.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      e.options.fade === !1
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (i.options.infinite === !1 &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 === 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      e.options.arrows === !0 &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            e.options.infinite !== !0 &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (e.options.centerMode !== !0 && e.options.swipeToSlide !== !0) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.options.draggable === !0 && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 0)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (r.originalSettings.mobileFirst === !1
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  e === !0 && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  e === !0 && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            e === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || l === !1 || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll !== 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e,
        t,
        o = this;
      if (((e = o.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var s in e) {
          if (i < e[s]) {
            i = t;
            break;
          }
          t = e[s];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        e.options.accessibility === !0 &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          e.options.accessibility === !0 &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        e.options.accessibility === !0 &&
          e.$list.off("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 0 &&
        ((i = e.$slides.children().children()),
        i.removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      var e = this;
      e.shouldClick === !1 &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      t.cssTransitions === !1
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      e.cssTransitions === !1
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick", "*", function (t) {
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              o.is(":focus") &&
              ((e.focussed = !0), e.autoPlay());
          }, 0);
        })
        .on("blur.slick", "*", function (t) {
          i(this);
          e.options.pauseOnFocus && ((e.focussed = !1), e.autoPlay());
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        var i = this;
        return i.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (i.options.infinite === !0)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (i.options.centerMode === !0) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        n.options.infinite === !0
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              n.options.vertical === !0 &&
                n.options.centerMode === !0 &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll !== 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : n.options.centerMode === !0 && n.options.infinite === !0
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : n.options.centerMode === !0 &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          n.options.vertical === !1
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        n.options.variableWidth === !0 &&
          ((o =
            n.slideCount <= n.options.slidesToShow || n.options.infinite === !1
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            n.options.rtl === !0
              ? o[0]
                ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1
                : 0
              : o[0]
              ? o[0].offsetLeft * -1
              : 0),
          n.options.centerMode === !0 &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              n.options.infinite === !1
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              n.options.rtl === !0
                ? o[0]
                  ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1
                  : 0
                : o[0]
                ? o[0].offsetLeft * -1
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        var e = this;
        return e.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        e.options.infinite === !1
          ? (i = e.slideCount)
          : ((t = e.options.slidesToScroll * -1),
            (o = e.options.slidesToScroll * -1),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o,
        s,
        n = this;
      return (
        (s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0),
        (o = n.swipeLeft * -1 + s),
        n.options.swipeToSlide === !0
          ? (n.$slideTrack.find(".slick-slide").each(function (e, s) {
              var r, l, d;
              if (
                ((r = i(s).outerWidth()),
                (l = s.offsetLeft),
                n.options.centerMode !== !0 && (l += r / 2),
                (d = l + r),
                o < d)
              )
                return (t = s), !1;
            }),
            (e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1))
          : n.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        var t = this;
        t.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        t.options.accessibility === !0 && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              if (
                (i(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + e.instanceUid + t,
                  tabindex: -1,
                }),
                s !== -1)
              ) {
                var n = "slick-slide-control" + e.instanceUid + s;
                i("#" + n).length && i(this).attr({ "aria-describedby": n });
              }
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.options.focusOnChange
          ? e.$slides.eq(s).attr({ tabindex: "0" })
          : e.$slides.eq(s).removeAttr("tabindex");
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        i.options.accessibility === !0 &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      e.options.dots === !0 &&
        e.slideCount > e.options.slidesToShow &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        e.options.accessibility === !0 &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        e.options.dots === !0 &&
          e.options.pauseOnDotsHover === !0 &&
          e.slideCount > e.options.slidesToShow &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        e.options.accessibility === !0 &&
          e.$list.on("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && e.options.accessibility === !0
          ? e.changeSlide({
              data: { message: e.options.rtl === !0 ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            e.options.accessibility === !0 &&
            e.changeSlide({
              data: { message: e.options.rtl === !0 ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
            n = document.createElement("img");
          (n.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                r.$slider.trigger("lazyLoaded", [r, e, t]);
            });
          }),
            (n.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                r.$slider.trigger("lazyLoadError", [r, e, t]);
            }),
            (n.src = t);
        });
      }
      var t,
        o,
        s,
        n,
        r = this;
      if (
        (r.options.centerMode === !0
          ? r.options.infinite === !0
            ? ((s = r.currentSlide + (r.options.slidesToShow / 2 + 1)),
              (n = s + r.options.slidesToShow + 2))
            : ((s = Math.max(
                0,
                r.currentSlide - (r.options.slidesToShow / 2 + 1)
              )),
              (n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide))
          : ((s = r.options.infinite
              ? r.options.slidesToShow + r.currentSlide
              : r.currentSlide),
            (n = Math.ceil(s + r.options.slidesToShow)),
            r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)),
        (t = r.$slider.find(".slick-slide").slice(s, n)),
        "anticipated" === r.options.lazyLoad)
      )
        for (
          var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0;
          c < r.options.slidesToScroll;
          c++
        )
          l < 0 && (l = r.slideCount - 1),
            (t = t.add(a.eq(l))),
            (t = t.add(a.eq(d))),
            l--,
            d++;
      e(t),
        r.slideCount <= r.options.slidesToShow
          ? ((o = r.$slider.find(".slick-slide")), e(o))
          : r.currentSlide >= r.slideCount - r.options.slidesToShow
          ? ((o = r.$slider
              .find(".slick-cloned")
              .slice(0, r.options.slidesToShow)),
            e(o))
          : 0 === r.currentSlide &&
            ((o = r.$slider
              .find(".slick-cloned")
              .slice(r.options.slidesToShow * -1)),
            e(o));
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        var i = this;
        i.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      if (
        !t.unslicked &&
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        t.options.accessibility === !0 &&
          (t.initADA(), t.options.focusOnChange))
      ) {
        var o = i(t.$slides.get(t.currentSlide));
        o.attr("tabindex", 0).focus();
      }
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        var i = this;
        i.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          (r = document.createElement("img")),
          (r.onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              l.options.adaptiveHeight === !0 && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        e.options.focusOnSelect === !0 &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        return (
          "boolean" == typeof i
            ? ((e = i), (i = e === !0 ? 0 : o.slideCount - 1))
            : (i = e === !0 ? --i : i),
          !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) &&
            (o.unload(),
            t === !0
              ? o.$slideTrack.children().remove()
              : o.$slideTrack.children(this.options.slide).eq(i).remove(),
            (o.$slides = o.$slideTrack.children(this.options.slide)),
            o.$slideTrack.children(this.options.slide).detach(),
            o.$slideTrack.append(o.$slides),
            (o.$slidesCache = o.$slides),
            void o.reinit())
        );
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      o.options.rtl === !0 && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        o.transformsEnabled === !1
          ? o.$slideTrack.css(s)
          : ((s = {}),
            o.cssTransitions === !1
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      i.options.vertical === !1
        ? i.options.centerMode === !0 &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          i.options.centerMode === !0 &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        i.options.vertical === !1 && i.options.variableWidth === !1
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : i.options.variableWidth === !0
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      i.options.variableWidth === !1 &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          t.options.rtl === !0
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        i.options.adaptiveHeight === !0 &&
        i.options.vertical === !1
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : "undefined" != typeof arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        i.options.fade === !1
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = i.options.vertical === !0 ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (i.options.useCSS === !0 && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          i.animType !== !1 &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && i.animType !== !1);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        n.options.centerMode === !0)
      ) {
        var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          n.options.infinite === !0 &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = n.options.infinite === !0 ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (s.options.fade === !0 && (s.options.centerMode = !1),
        s.options.infinite === !0 &&
          s.options.fade === !1 &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            s.options.centerMode === !0
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      return (
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? void t.slideHandler(s, !1, !0)
          : void t.slideHandler(s)
      );
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (a.animating === !0 && a.options.waitForAnimate === !0) ||
          (a.options.fade === !0 && a.currentSlide === i)
        ))
      )
        return (
          e === !1 && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          a.options.infinite === !1 &&
          a.options.centerMode === !1 &&
          (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)
            ? void (
                a.options.fade === !1 &&
                ((o = a.currentSlide),
                t !== !0 && a.slideCount > a.options.slidesToShow
                  ? a.animateSlide(r, function () {
                      a.postSlide(o);
                    })
                  : a.postSlide(o))
              )
            : a.options.infinite === !1 &&
              a.options.centerMode === !0 &&
              (i < 0 || i > a.slideCount - a.options.slidesToScroll)
            ? void (
                a.options.fade === !1 &&
                ((o = a.currentSlide),
                t !== !0 && a.slideCount > a.options.slidesToShow
                  ? a.animateSlide(r, function () {
                      a.postSlide(o);
                    })
                  : a.postSlide(o))
              )
            : (a.options.autoplay && clearInterval(a.autoPlayTimer),
              (s =
                o < 0
                  ? a.slideCount % a.options.slidesToScroll !== 0
                    ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                    : a.slideCount + o
                  : o >= a.slideCount
                  ? a.slideCount % a.options.slidesToScroll !== 0
                    ? 0
                    : o - a.slideCount
                  : o),
              (a.animating = !0),
              a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
              (n = a.currentSlide),
              (a.currentSlide = s),
              a.setSlideClasses(a.currentSlide),
              a.options.asNavFor &&
                ((l = a.getNavTarget()),
                (l = l.slick("getSlick")),
                l.slideCount <= l.options.slidesToShow &&
                  l.setSlideClasses(a.currentSlide)),
              a.updateDots(),
              a.updateArrows(),
              a.options.fade === !0
                ? (t !== !0
                    ? (a.fadeSlideOut(n),
                      a.fadeSlide(s, function () {
                        a.postSlide(s);
                      }))
                    : a.postSlide(s),
                  void a.animateHeight())
                : void (t !== !0 && a.slideCount > a.options.slidesToShow
                    ? a.animateSlide(d, function () {
                        a.postSlide(s);
                      })
                    : a.postSlide(s)))
        );
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      i.options.arrows === !0 &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        i.options.dots === !0 &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)),
        o < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? s.options.rtl === !1
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? s.options.rtl === !1
            ? "right"
            : "left"
          : s.options.verticalSwiping === !0
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (o.touchObject.edgeHit === !0 &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          e.options.swipe === !1 ||
          ("ontouchend" in document && e.options.swipe === !1) ||
          (e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          e.options.verticalSwiping === !0 &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (l.options.verticalSwiping === !0 &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (l.options.rtl === !1 ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              l.options.verticalSwiping === !0 &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              l.options.infinite === !1 &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              l.options.vertical === !1
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s),
              l.options.fade !== !0 &&
                l.options.touchMove !== !1 &&
                (l.animating === !0
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      return (
        (t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
        t.slideCount <= t.options.slidesToShow
          ? ((t.touchObject = {}), !1)
          : (void 0 !== i.originalEvent &&
              void 0 !== i.originalEvent.touches &&
              (e = i.originalEvent.touches[0]),
            (t.touchObject.startX = t.touchObject.curX =
              void 0 !== e ? e.pageX : i.clientX),
            (t.touchObject.startY = t.touchObject.curY =
              void 0 !== e ? e.pageY : i.clientY),
            void (t.dragging = !0))
      );
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i,
        e = this;
      (i = Math.floor(e.options.slidesToShow / 2)),
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          !e.options.infinite &&
          (e.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          e.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === e.currentSlide
            ? (e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : e.currentSlide >= e.slideCount - e.options.slidesToShow &&
              e.options.centerMode === !1
            ? (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : e.currentSlide >= e.slideCount - 1 &&
              e.options.centerMode === !0 &&
              (e.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || "undefined" == typeof s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          "undefined" != typeof t)
        )
          return t;
      return o;
    });
});
