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
  function setNavState(y) {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", y > 40);
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
  function flashTarget(target) {
    if (prefersReduced) return;
    var head = target.querySelector(".section-title, .hero__title");
    if (!head) return;
    head.classList.remove("snap-flash");
    void head.offsetWidth; // force reflow so the animation can replay
    head.classList.add("snap-flash");
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      var done = function () { focusTarget(target); flashTarget(target); };
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
    var sections = ["#about", "#help", "#process", "#faq", "#contact"]
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

  /* ============================================================
     If GSAP is unavailable or reduced motion: reveal everything.
     ============================================================ */
  if (!hasGSAP || prefersReduced) {
    document.querySelectorAll(".reveal, .reveal-line, .reveal-word").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return; // skip all animation wiring
  }

  var gsap = window.gsap;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- HERO: masked reveal + parallax ---------- */
  var heroMedia = document.querySelector(".hero__media");

  var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (heroMedia) {
    gsap.set(heroMedia, { clipPath: "inset(14% 14% 14% 14% round 24px)", scale: 1.18 });
    heroTl.to(heroMedia, { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, duration: 1.5, ease: "power4.inOut" });
  }
  heroTl.from(".hero .reveal-line", {
    yPercent: 110, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out"
  }, "-=0.9");

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

  /* ---------- intro quote: word-by-word warm reveal ---------- */
  var quoteWrap = document.querySelector(".reveal-word-wrap");
  if (quoteWrap) {
    var words = quoteWrap.textContent.trim().split(/\s+/);
    quoteWrap.innerHTML = words.map(function (w) {
      return '<span class="reveal-word" style="display:inline-block">' + w + "</span>";
    }).join(" ");
    gsap.fromTo(quoteWrap.querySelectorAll(".reveal-word"),
      { opacity: 0.12, y: 10 },
      {
        opacity: 1, y: 0, ease: "none", stagger: 0.04,
        scrollTrigger: { trigger: ".intro", start: "top 70%", end: "center 55%", scrub: true }
      }
    );
  }

  /* ---------- image parallax for [data-parallax-img] ---------- */
  gsap.utils.toArray("[data-parallax-img] img").forEach(function (img) {
    gsap.fromTo(img, { yPercent: -8 }, {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: img.closest("[data-parallax-img]"), start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  /* ---------- PROCESS: pin + active step ---------- */
  var processSection = document.querySelector(".process");
  var steps = gsap.utils.toArray(".process__step");
  var bars = gsap.utils.toArray(".process__bar");
  if (processSection && steps.length) {
    var setActive = function (index) {
      steps.forEach(function (s, i) { s.classList.toggle("is-active", i === index); });
      bars.forEach(function (b, i) { b.style.setProperty("--fill", i <= index ? "100%" : "0%"); });
    };
    setActive(0);

    ScrollTrigger.create({
      trigger: processSection,
      start: "top top",
      end: "+=" + (steps.length * 60) + "%",
      pin: ".process__sticky",
      scrub: true,
      onUpdate: function (self) {
        var idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        setActive(idx);
      }
    });
  }

  /* ---------- about section subtle lift ---------- */
  gsap.from(".about__media", {
    y: 50, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: ".about", start: "top 75%" }
  });

  // Recalculate once fonts/images settle
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
