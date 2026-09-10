/* TensorBlack — progressive enhancement only.
   The page is complete and readable with this file absent or blocked. */
(function () {
  "use strict";

  // Marks that JS is available, which is what arms the reveal animations.
  // Without it every [data-reveal] element stays visible by default.
  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Header border appears once the page has scrolled off the top --- */
  var header = document.getElementById("header");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });

  /* --- Reveal on scroll --- */
  var targets = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("is-in");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  // Cards stagger within their own grid so a row arrives as a wave.
  Array.prototype.forEach.call(targets, function (el, i) {
    var group = el.parentElement;
    var index = group ? Array.prototype.indexOf.call(group.children, el) : i;
    el.style.transitionDelay = Math.min(index, 5) * 60 + "ms";
    observer.observe(el);
  });
})();
