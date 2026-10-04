/* ============================================================
   Shierly Therapy — interactions
   Lenis smooth scroll + GSAP/ScrollTrigger reveals & parallax
   Degrades gracefully: if libraries or motion are unavailable,
   all content stays fully visible.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  var ScrollTrigger = window.ScrollTrigger;

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nav scrolled state ---------- */
  var nav = document.getElementById("nav");
  var hasHero = !!document.querySelector(".hero");
  function setNavState(y) {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", !hasHero || y > 40);
  }
  setNavState(window.scrollY);

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  function closeMenu() {
    document.body.classList.remove("menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (menu) menu.setAttribute("aria-hidden", "true");
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Lenis smooth scroll ---------- */
  var lenis = null;
  if (!prefersReduced && typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", function (e) {
      setNavState(e.scroll || window.scrollY);
      if (ScrollTrigger) ScrollTrigger.update();
    });
    if (hasGSAP) {
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  } else {
    window.addEventListener("scroll", function () { setNavState(window.scrollY); }, { passive: true });
  }

  /* ---------- snap anchor navigation ---------- */
  var NAV_OFFSET = 76;
  // easeInOutCubic — fast middle, crisp settle = a "snap" feel
  var snapEase = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

  function focusTarget(target) {
    if (target.hasAttribute("tabindex") || target.tagName === "MAIN") {
      target.focus({ preventScroll: true });
    }
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      var done = function () { focusTarget(target); };
      if (lenis) {
        // lock:true blocks input mid-flight so it snaps cleanly into place
        lenis.scrollTo(target, { offset: -NAV_OFFSET, duration: 1.0, lock: true, easing: snapEase, onComplete: done });
      } else {
        var y = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top: y, behavior: prefersReduced ? "auto" : "smooth" });
        setTimeout(done, prefersReduced ? 0 : 650);
      }
    });
  });

  /* ---------- active section highlighting (aria-current) ---------- */
  (function () {
    if (!("IntersectionObserver" in window)) return;
    var linkMap = {};
    document.querySelectorAll('.nav__links a[href^="#"], .mobile-menu__links a[href^="#"]').forEach(function (a) {
      var href = a.getAttribute("href");
      (linkMap[href] = linkMap[href] || []).push(a);
    });
    var sections = ["#about", "#approach", "#offer", "#areas", "#process", "#faq", "#contact"]
      .map(function (s) { return document.querySelector(s); })
      .filter(Boolean);
    if (!sections.length) return;
    var clearAll = function () {
      document.querySelectorAll('.nav__links a[aria-current], .mobile-menu__links a[aria-current]')
        .forEach(function (a) { a.removeAttribute("aria-current"); });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        clearAll();
        (linkMap["#" + en.target.id] || []).forEach(function (a) { a.setAttribute("aria-current", "true"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  })();

  /* ---------- FAQ accordion with animated open/close ---------- */
  var faqItems = document.querySelectorAll(".faq__item");
  var faqAnimated = hasGSAP && !prefersReduced;

  function closeFaq(item, animate) {
    if (!item.open) return;
    var answer = item.querySelector(".faq__answer");
    if (animate) {
      window.gsap.fromTo(answer, { height: answer.offsetHeight, opacity: 1 }, {
        height: 0, opacity: 0, duration: 0.34, ease: "power2.inOut",
        onComplete: function () { item.open = false; window.gsap.set(answer, { clearProps: "height,opacity" }); }
      });
    } else {
      item.open = false;
    }
  }
  function openFaq(item) {
    var answer = item.querySelector(".faq__answer");
    item.open = true;                       // reveal so we can measure target height
    var h = answer.offsetHeight;
    window.gsap.fromTo(answer, { height: 0, opacity: 0 }, {
      height: h, opacity: 1, duration: 0.44, ease: "power2.out",
      onComplete: function () { window.gsap.set(answer, { clearProps: "height,opacity" }); }
    });
  }

  faqItems.forEach(function (item) {
    var summary = item.querySelector("summary");
    summary.addEventListener("click", function (e) {
      if (!faqAnimated) {
        // native instant toggle; just enforce single-open accordion
        if (!item.open) faqItems.forEach(function (o) { if (o !== item) o.open = false; });
        return;
      }
      e.preventDefault(); // we drive open/close ourselves to animate it
      if (item.open) {
        closeFaq(item, true);
      } else {
        faqItems.forEach(function (o) { if (o !== item) closeFaq(o, true); });
        openFaq(item);
      }
    });
  });

  /* ---------- Areas accordion with animated open/close ---------- */
  var areaItems = document.querySelectorAll(".area__item");
  var areaAnimated = hasGSAP && !prefersReduced;

  function closeArea(item, animate) {
    if (!item.open) return;
    var answer = item.querySelector(".area__answer");
    if (animate) {
      window.gsap.fromTo(answer, { height: answer.offsetHeight, opacity: 1 }, {
        height: 0, opacity: 0, duration: 0.34, ease: "power2.inOut",
        onComplete: function () { item.open = false; window.gsap.set(answer, { clearProps: "height,opacity" }); }
      });
    } else {
      item.open = false;
    }
  }
  function openArea(item) {
    var answer = item.querySelector(".area__answer");
    item.open = true;
    var h = answer.offsetHeight;
    window.gsap.fromTo(answer, { height: 0, opacity: 0 }, {
      height: h, opacity: 1, duration: 0.44, ease: "power2.out",
      onComplete: function () { window.gsap.set(answer, { clearProps: "height,opacity" }); }
    });
  }

  areaItems.forEach(function (item) {
    var summary = item.querySelector("summary");
    summary.addEventListener("click", function (e) {
      if (!areaAnimated) {
        if (!item.open) areaItems.forEach(function (o) { if (o !== item) o.open = false; });
        return;
      }
      e.preventDefault();
      if (item.open) {
        closeArea(item, true);
      } else {
        areaItems.forEach(function (o) { if (o !== item) closeArea(o, true); });
        openArea(item);
      }
    });
  });

  /* ---------- toast + async form submission ---------- */
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = '<p class="toast__msg"></p><button class="toast__close" aria-label="Dismiss">&#x2715;</button>';
  document.body.appendChild(toast);

  var toastMsg = toast.querySelector(".toast__msg");
  var toastTimer;

  function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.remove("is-hiding");
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 6000);
  }
  function hideToast() {
    clearTimeout(toastTimer);
    toast.classList.add("is-hiding");
    setTimeout(function () { toast.classList.remove("is-visible", "is-hiding"); }, 420);
  }

  toast.querySelector(".toast__close").addEventListener("click", hideToast);

  var txStart = 0, tyStart = 0;
  toast.addEventListener("touchstart", function (e) {
    txStart = e.touches[0].clientX;
    tyStart = e.touches[0].clientY;
  }, { passive: true });
  toast.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - txStart;
    var dy = e.changedTouches[0].clientY - tyStart;
    if (dy > 40 || Math.abs(dx) > 60) hideToast();
  }, { passive: true });

  /* ---------- custom "Preferred contact method" dropdown ---------- */
  var dropdownIdCounter = 0;

  function initContactDropdown(wrapper) {
    var trigger = wrapper.querySelector(".contact__dropdown-trigger");
    var valueEl = wrapper.querySelector(".contact__dropdown-value");
    var panel = wrapper.querySelector(".contact__dropdown-panel");
    var hiddenInput = wrapper.querySelector('input[type="hidden"]');
    var errorEl = wrapper.querySelector(".contact__dropdown-error");
    var labelEl = wrapper.querySelector(".contact__dropdown-label");
    var options = Array.prototype.slice.call(wrapper.querySelectorAll(".contact__dropdown-option"));
    if (!trigger || !panel || !hiddenInput || !options.length) return null;

    var uid = "contact-dropdown-" + (++dropdownIdCounter);
    panel.id = uid + "-listbox";
    trigger.setAttribute("role", "combobox");
    trigger.setAttribute("aria-controls", panel.id);
    trigger.setAttribute("aria-activedescendant", "");
    options.forEach(function (opt, i) {
      opt.id = uid + "-opt-" + i;
      opt.setAttribute("aria-selected", "false");
    });
    if (labelEl) {
      labelEl.id = uid + "-label";
      trigger.setAttribute("aria-labelledby", labelEl.id);
      panel.setAttribute("aria-labelledby", labelEl.id);
    }

    var placeholder = valueEl.textContent;
    var activeIndex = -1;
    var changeCallbacks = [];

    function isOpen() { return !panel.hidden; }

    function setActive(index) {
      if (index < 0) index = options.length - 1;
      if (index >= options.length) index = 0;
      activeIndex = index;
      options.forEach(function (opt, i) { opt.classList.toggle("is-active", i === index); });
      trigger.setAttribute("aria-activedescendant", options[index].id);
      if (options[index].scrollIntoView) options[index].scrollIntoView({ block: "nearest" });
    }

    function open() {
      if (isOpen()) return;
      panel.hidden = false;
      wrapper.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      var selectedIndex = -1;
      options.forEach(function (opt, i) { if (opt.getAttribute("aria-selected") === "true") selectedIndex = i; });
      setActive(selectedIndex >= 0 ? selectedIndex : 0);
    }

    function close() {
      if (!isOpen()) return;
      panel.hidden = true;
      wrapper.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      activeIndex = -1;
    }

    function setInvalid(isInvalid) {
      wrapper.classList.toggle("is-invalid", isInvalid);
      if (errorEl) errorEl.hidden = !isInvalid;
    }

    function selectOption(opt) {
      options.forEach(function (o) { o.setAttribute("aria-selected", o === opt ? "true" : "false"); });
      hiddenInput.value = opt.getAttribute("data-value");
      valueEl.textContent = opt.textContent;
      valueEl.classList.remove("contact__dropdown-value--placeholder");
      setInvalid(false);
      close();
      trigger.focus();
      changeCallbacks.forEach(function (cb) { cb(hiddenInput.value); });
    }

    function reset() {
      options.forEach(function (o) { o.setAttribute("aria-selected", "false"); });
      hiddenInput.value = "";
      valueEl.textContent = placeholder;
      valueEl.classList.add("contact__dropdown-value--placeholder");
      setInvalid(false);
      close();
    }

    trigger.addEventListener("click", function () {
      if (isOpen()) { close(); } else { open(); }
    });

    trigger.addEventListener("keydown", function (e) {
      var key = e.key;
      if (key === "ArrowDown") {
        e.preventDefault();
        if (!isOpen()) { open(); } else { setActive(activeIndex + 1); }
      } else if (key === "ArrowUp") {
        e.preventDefault();
        if (!isOpen()) { open(); } else { setActive(activeIndex - 1); }
      } else if (key === "Home") {
        if (isOpen()) { e.preventDefault(); setActive(0); }
      } else if (key === "End") {
        if (isOpen()) { e.preventDefault(); setActive(options.length - 1); }
      } else if (key === "Enter" || key === " ") {
        e.preventDefault();
        if (isOpen()) { selectOption(options[activeIndex]); } else { open(); }
      } else if (key === "Escape") {
        if (isOpen()) { e.preventDefault(); close(); }
      } else if (key === "Tab") {
        close();
      } else if (key.length === 1) {
        var lower = key.toLowerCase();
        for (var i = 0; i < options.length; i++) {
          if (options[i].textContent.trim().toLowerCase().indexOf(lower) === 0) {
            if (!isOpen()) open();
            setActive(i);
            break;
          }
        }
      }
    });

    options.forEach(function (opt, i) {
      opt.addEventListener("mouseenter", function () { setActive(i); });
      opt.addEventListener("click", function () { selectOption(opt); });
    });

    document.addEventListener("click", function (e) {
      if (!wrapper.contains(e.target)) close();
    });

    return {
      getValue: function () { return hiddenInput.value; },
      reset: reset,
      setInvalid: setInvalid,
      focus: function () { trigger.focus(); },
      onChange: function (cb) { changeCallbacks.push(cb); }
    };
  }

  document.querySelectorAll(".contact__form").forEach(function (form) {
    var dropdownEl = form.querySelector(".contact__dropdown");
    var dropdown = dropdownEl ? initContactDropdown(dropdownEl) : null;
    var phoneInput = form.querySelector('input[name="phone"]');
    var phoneNote = phoneInput && phoneInput.closest("label").querySelector("small");
    var phoneNoteDefault = phoneNote ? phoneNote.textContent : "";

    function syncContactPref(value) {
      var needsPhone = value === "SMS";
      if (phoneInput) phoneInput.required = needsPhone;
      if (phoneNote) phoneNote.textContent = needsPhone ? "(required for SMS)" : phoneNoteDefault;
    }

    if (dropdown) {
      dropdown.onChange(syncContactPref);
      syncContactPref(dropdown.getValue());
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (dropdown && !dropdown.getValue()) {
        dropdown.setInvalid(true);
        dropdown.focus();
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      var orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";
      fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json.success) {
            form.reset();
            if (dropdown) dropdown.reset();
            syncContactPref("");
            showToast("Thank you for your enquiry. I've received your message and will get back to you within 1–2 business days.");
          } else {
            showToast("Something went wrong. Please try again or email directly.");
          }
        })
        .catch(function () {
          showToast("Something went wrong. Please try again or email directly.");
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = orig;
        });
    });
  });

  /* ============================================================
     No GSAP at all: show everything statically and stop.
     ============================================================ */
  if (!hasGSAP) {
    document.querySelectorAll(".reveal, .reveal-line, .reveal-word").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  var gsap = window.gsap;
  gsap.registerPlugin(ScrollTrigger);

  /* ============================================================
     Reduced motion: gentle OPACITY-ONLY fade-ins.
     No parallax, no mask/scale, no pinning, no scroll hijacking,
     no slide movement — just soft cross-fades (not vestibular).
     ============================================================ */
  if (prefersReduced) {
    // hero copy fades in on load
    gsap.to(".hero .reveal-line", { opacity: 1, duration: 0.7, stagger: 0.1, ease: "power1.out" });
    // section content fades in as it enters the viewport
    gsap.utils.toArray(".reveal, .reveal-line").forEach(function (el) {
      if (el.closest(".hero")) return;
      gsap.to(el, {
        opacity: 1, duration: 0.6, ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 92%" }
      });
    });
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
    return;
  }

  /* ---------- HERO: masked reveal + parallax ---------- */
  var heroMedia = document.querySelector(".hero__media");

  var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (heroMedia) {
    gsap.set(heroMedia, { clipPath: "inset(14% 14% 14% 14% round 24px)", scale: 1.18 });
    heroTl.to(heroMedia, { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, duration: 1.5, ease: "power4.inOut" });
  }
  // fromTo with an explicit visible end + clearProps so no transform lingers
  // (the natural CSS state of .reveal-line is opacity:0, with no transform).
  heroTl.fromTo(".hero .reveal-line",
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", clearProps: "transform" },
    "-=0.9");

  // hero background parallax on scroll
  if (heroMedia) {
    gsap.to(heroMedia.querySelector("img"), {
      yPercent: 16, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* ---------- generic reveal-line (mask up) ---------- */
  gsap.utils.toArray(".reveal-line").forEach(function (el) {
    if (el.closest(".hero")) return; // hero handled above
    gsap.to(el, {
      yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });

  /* ---------- generic reveal (fade up), batched & staggered ---------- */
  ScrollTrigger.batch(".reveal", {
    start: "top 88%",
    onEnter: function (batch) {
      gsap.to(batch, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.09, overwrite: true });
    }
  });

  /* ---------- image parallax for [data-parallax-img] ---------- */
  gsap.utils.toArray("[data-parallax-img] img").forEach(function (img) {
    gsap.fromTo(img, { yPercent: -8 }, {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: img.closest("[data-parallax-img]"), start: "top bottom", end: "bottom top", scrub: true }
    });
  });


  /* ---------- about section subtle lift ---------- */
  gsap.from(".about__media", {
    y: 50, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: ".about", start: "top 75%" }
  });

  // Recalculate once fonts/images settle
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
