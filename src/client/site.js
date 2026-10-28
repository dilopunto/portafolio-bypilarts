// JavaScript del sitio. Todo es mejora progresiva: la web funciona sin él.
(function () {
  "use strict";
  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  // ── 1. Menú móvil ─────────────────────────────────────────
  var toggle = doc.querySelector("[data-nav-toggle]");
  var nav = doc.querySelector("[data-nav]");
  if (toggle && nav) {
    var toggleLabel = toggle.querySelector("[data-nav-label]");
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      if (open) nav.setAttribute("data-open", "");
      else nav.removeAttribute("data-open");
      root.classList.toggle("nav-open", open);
      if (toggleLabel) toggleLabel.textContent = open ? "Cerrar" : "Menú";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    window.matchMedia("(min-width: 821px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  // ── 2. Filtro de proyectos por disciplina ─────────────────
  doc.querySelectorAll("[data-plist-wrap]").forEach(function (wrap) {
    var filters = wrap.querySelector("[data-filters]");
    if (!filters) return;
    var chips = Array.prototype.slice.call(filters.querySelectorAll("[data-filter]"));
    var rows = Array.prototype.slice.call(wrap.querySelectorAll(".prow"));
    var empty = wrap.querySelector("[data-empty]");
    var status = wrap.querySelector("[data-filter-status]");

    function apply(id, updateHash) {
      var shown = 0;
      rows.forEach(function (row) {
        var match = id === "all" || row.getAttribute("data-disciplines").split(" ").indexOf(id) !== -1;
        row.hidden = !match;
        if (match) {
          shown += 1;
          var num = row.querySelector(".prow__num");
          if (num) num.textContent = String(shown).padStart(2, "0");
        }
      });
      chips.forEach(function (chip) {
        chip.setAttribute("aria-pressed", String(chip.getAttribute("data-filter") === id));
      });
      if (empty) empty.hidden = shown > 0;
      if (status) {
        var active = chips.filter(function (c) { return c.getAttribute("data-filter") === id; })[0];
        var name = active ? active.firstChild.textContent.trim() : "";
        status.textContent = id === "all" ? shown + " proyectos" : shown + " proyecto(s) de " + name;
      }
      if (updateHash && window.history && history.replaceState) {
        history.replaceState(null, "", id === "all" ? location.pathname : "#" + id);
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () { apply(chip.getAttribute("data-filter"), true); });
    });
    var initial = decodeURIComponent(location.hash.replace("#", ""));
    if (initial && chips.some(function (c) { return c.getAttribute("data-filter") === initial; })) apply(initial, false);
  });

  // ── 3. Vista previa que sigue al cursor (solo puntero fino) ──
  doc.querySelectorAll("[data-plist-wrap]").forEach(function (wrap) {
    var box = wrap.querySelector("[data-preview-box]");
    var holder = wrap.querySelector("[data-preview-media]");
    if (!box || !holder) return;
    var width = 0;
    var height = 0;
    var raf = 0;
    var pos = { x: 0, y: 0 };

    function place() {
      raf = 0;
      var x = pos.x + 28;
      var y = pos.y - height / 2;
      if (x + width > window.innerWidth - 12) x = pos.x - width - 28;
      y = Math.max(12, Math.min(window.innerHeight - height - 12, y));
      box.style.transform = "translate3d(" + Math.round(x) + "px," + Math.round(y) + "px,0)";
    }
    function show(link) {
      if (!finePointer.matches) return;
      var thumb = link.querySelector(".prow__thumb");
      if (!thumb) return;
      holder.innerHTML = thumb.innerHTML;
      box.classList.add("is-on");
      var rect = box.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }
    function hide() { box.classList.remove("is-on"); }

    wrap.querySelectorAll("[data-preview]").forEach(function (link) {
      link.addEventListener("pointerenter", function (e) {
        if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        pos.x = e.clientX; pos.y = e.clientY;
        show(link);
        if (!raf) raf = requestAnimationFrame(place);
      });
      link.addEventListener("pointermove", function (e) {
        pos.x = e.clientX; pos.y = e.clientY;
        if (box.classList.contains("is-on")) {
          var rect = box.getBoundingClientRect();
          width = rect.width; height = rect.height;
        }
        if (!raf) raf = requestAnimationFrame(place);
      });
      link.addEventListener("pointerleave", hide);
      link.addEventListener("blur", hide);
    });
    window.addEventListener("scroll", hide, { passive: true });
  });

  // ── 4. Collage de portada: reacciona levemente al cursor ──
  var collage = doc.querySelector("[data-parallax]");
  var hero = collage && collage.closest("[data-hero]");
  if (hero && finePointer.matches && !reduceMotion.matches) {
    var raf2 = 0;
    hero.addEventListener("pointermove", function (e) {
      if (raf2 || (e.pointerType && e.pointerType !== "mouse")) return;
      raf2 = requestAnimationFrame(function () {
        raf2 = 0;
        var r = hero.getBoundingClientRect();
        collage.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        collage.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    });
    hero.addEventListener("pointerleave", function () {
      collage.style.setProperty("--mx", "0");
      collage.style.setProperty("--my", "0");
    });
  }

  // ── 5. Vídeos de Vimeo / YouTube: se cargan solo al pulsar ──
  doc.querySelectorAll("[data-video]").forEach(function (box) {
    var button = box.querySelector(".video__play");
    if (!button) return;
    button.addEventListener("click", function () {
      var provider = box.getAttribute("data-provider");
      var id = encodeURIComponent(box.getAttribute("data-id"));
      var title = box.getAttribute("data-title") || "Vídeo";
      var src = provider === "vimeo"
        ? "https://player.vimeo.com/video/" + id + "?autoplay=1&dnt=1"
        : "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      var frame = doc.createElement("iframe");
      frame.src = src;
      frame.title = title;
      frame.allow = "autoplay; fullscreen; picture-in-picture";
      frame.allowFullscreen = true;
      box.appendChild(frame);
      button.remove();
      frame.focus();
    });
  });
})();
