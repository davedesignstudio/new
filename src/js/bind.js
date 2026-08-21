(function (g) {
  var INTERVAL = 5000;
  var PHOTOS = [
    "/img/road/paper.jpg",
    "/img/road/cafe.jpg",
    "/img/road/bville.jpg",
    "/img/road/bville-2.jpg",
    "/img/road/coffee.jpg",
    "/img/road/coffee-cup.jpg",
    "/img/road/kong.jpg",
    "/img/road/philhower.jpg",
    "/img/tower/ch1.jpg",
    "/img/tower/ch3.jpg",
    "/img/tower/ch4.jpg",
    "/img/mars/table.jpg"
  ];
  var PAPERS = ["#f7f1e4", "#efe6d4", "#e8dcc4", "#f4efe8", "#d9cbb3", "#f3ead8", "#e4ddd0"];
  var INKS = ["#1a1612", "#241d16", "#2b2118", "#3d2a1c", "#5c2e1a", "#1c2428"];
  var SUBS = ["Trading Ltd.", "ledger on the bar", "the stone is not the soup", "night kitchen", "Ltd."];

  var cache = {};
  var timer = null;
  var tick = 0;
  var started = false;

  function rng(seed) {
    var s = seed >>> 0;
    if (!s) s = 1;
    function next() {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    }
    return {
      next: next,
      int: function (n) {
        return Math.floor(next() * n);
      },
      pick: function (a) {
        return a[Math.floor(next() * a.length)];
      },
      between: function (a, b) {
        return a + next() * (b - a);
      },
      chance: function (p) {
        return next() < p;
      },
      jitter: function (n) {
        return (next() - 0.5) * 2 * n;
      }
    };
  }

  function frame(n, art) {
    var r = rng((n + 1) * 9973 + 17);
    var photo = art && String(art).indexOf("paper.jpg") === -1 ? art : r.pick(PHOTOS);
    if (r.chance(0.22)) photo = "/img/road/paper.jpg";
    return {
      n: n,
      paper: r.pick(PAPERS),
      ink: r.pick(INKS),
      photo: photo,
      photoAlpha: r.between(0.12, 0.48),
      tilt: r.between(-0.1, 0.1),
      scale: r.between(0.82, 1.18),
      stain: r.chance(0.7),
      stainX: r.between(0.1, 0.9),
      stainY: r.between(0.15, 0.85),
      stainR: r.between(0.08, 0.22),
      ledger: r.chance(0.45),
      fold: r.chance(0.4),
      sub: r.pick(SUBS),
      mark: r.chance(0.5) ? r.pick(["NIGHT", "STONE", "TABLE", "BIND"]) : "",
      grain: r.between(0.04, 0.12)
    };
  }

  function loadPhoto(src, done) {
    if (!src) return done(null);
    var im = cache[src];
    if (im && im.complete && im.naturalWidth) return done(im);
    im = cache[src] || new Image();
    cache[src] = im;
    im.onload = function () {
      done(im);
    };
    im.onerror = function () {
      done(null);
    };
    if (!im.getAttribute("src")) im.src = src;
    if (im.complete && im.naturalWidth) done(im);
  }

  function charcoalText(ctx, text, x, y, size, spec, r) {
    ctx.save();
    ctx.font = "italic 800 " + Math.round(size) + "px Georgia, 'Palatino Linotype', 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = spec.ink;
    ctx.strokeStyle = spec.ink;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    var i;
    for (i = 0; i < 22; i++) {
      ctx.globalAlpha = 0.06 + r.next() * 0.1;
      ctx.lineWidth = size * (0.03 + r.next() * 0.04);
      ctx.fillText(text, x + r.jitter(2.2), y + r.jitter(1.8));
      if (i % 3 === 0) ctx.strokeText(text, x + r.jitter(1.4), y + r.jitter(1.2));
    }
    ctx.globalAlpha = 0.92;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawFrame(ctx, w, h, spec, photo) {
    var r = rng((spec.n + 1) * 9973 + 17);
    ctx.save();
    ctx.fillStyle = spec.paper;
    ctx.fillRect(0, 0, w, h);

    if (photo && photo.naturalWidth) {
      ctx.globalAlpha = spec.photoAlpha;
      var scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight) * (1.05 + r.next() * 0.25);
      var pw = photo.naturalWidth * scale;
      var ph = photo.naturalHeight * scale;
      ctx.drawImage(photo, (w - pw) / 2 + r.jitter(12), (h - ph) / 2 + r.jitter(8), pw, ph);
      ctx.globalAlpha = 1;
    }

    if (spec.ledger) {
      ctx.strokeStyle = "rgba(36,29,22,0.18)";
      ctx.lineWidth = 1;
      var y;
      for (y = h * 0.18; y < h; y += 11 + r.int(4)) {
        ctx.beginPath();
        ctx.moveTo(w * 0.06, y);
        ctx.lineTo(w * 0.94, y + r.jitter(1.5));
        ctx.stroke();
      }
    }

    if (spec.stain) {
      var sx = spec.stainX * w;
      var sy = spec.stainY * h;
      var sr = spec.stainR * Math.min(w, h);
      var g = ctx.createRadialGradient(sx, sy, sr * 0.1, sx, sy, sr);
      g.addColorStop(0, "rgba(92,46,26,0.28)");
      g.addColorStop(0.55, "rgba(92,46,26,0.12)");
      g.addColorStop(1, "rgba(92,46,26,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    if (spec.fold) {
      ctx.strokeStyle = "rgba(36,29,22,0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.02, h * (0.2 + r.next() * 0.5));
      ctx.quadraticCurveTo(w * 0.5, h * r.next(), w * 0.98, h * (0.2 + r.next() * 0.5));
      ctx.stroke();
    }

    ctx.translate(w / 2, h * 0.46);
    ctx.rotate(spec.tilt);
    ctx.scale(spec.scale, spec.scale);

    var bindSize = Math.min(w, h * 2.2) * 0.28;
    charcoalText(ctx, "Bind", 0, 0, bindSize, spec, r);

    ctx.beginPath();
    ctx.strokeStyle = spec.ink;
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 1.6 + r.next() * 1.4;
    var uw = bindSize * 1.7;
    ctx.moveTo(-uw / 2, bindSize * 0.42);
    ctx.quadraticCurveTo(r.jitter(12), bindSize * 0.5 + r.jitter(4), uw / 2, bindSize * 0.4);
    ctx.stroke();

    ctx.globalAlpha = 1;
    charcoalText(ctx, spec.sub, 0, bindSize * 0.72, bindSize * 0.22, spec, r);

    ctx.restore();

    if (spec.mark) {
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = spec.ink;
      ctx.font = "600 11px 'IBM Plex Sans', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(spec.mark, 12, h - 12);
      ctx.restore();
    }

    var grains = Math.floor(w * h * spec.grain * 0.02);
    var i;
    ctx.fillStyle = spec.ink;
    for (i = 0; i < grains; i++) {
      ctx.globalAlpha = 0.04 + r.next() * 0.08;
      ctx.fillRect(r.next() * w, r.next() * h, 1, 1);
    }
    ctx.globalAlpha = 1;
  }

  function sizeCanvas(canvas, el) {
    var w = Math.max(el.clientWidth || 0, 320);
    var h = Math.max(el.clientHeight || 0, 140);
    var dpr = g.devicePixelRatio || 1;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    }
    return { w: w, h: h, dpr: dpr };
  }

  function paintEl(el) {
    if (!el) return;
    var canvas = el.querySelector("canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("aria-label", "Bind Trading — a new mark every five seconds");
      el.innerHTML = "";
      el.appendChild(canvas);
    }
    var art = el.getAttribute("data-bind-art") || "";
    var spec = frame(tick, art);
    var photoSrc = spec.photo;
    loadPhoto(photoSrc, function (photo) {
      var dim = sizeCanvas(canvas, el);
      var ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dim.dpr, 0, 0, dim.dpr, 0, 0);
      drawFrame(ctx, dim.w, dim.h, spec, photo);
    });
  }

  function paintAll() {
    var nodes = document.querySelectorAll(".bind-live");
    var i;
    for (i = 0; i < nodes.length; i++) paintEl(nodes[i]);
  }

  function reduced() {
    return g.matchMedia && g.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function adopt(el, art) {
    if (!el) return;
    el.classList.add("bind-live");
    if (art) el.setAttribute("data-bind-art", art);
    paintEl(el);
    if (started) return;
    started = true;
    if (reduced()) return;
    timer = setInterval(function () {
      if (g.document && g.document.hidden) return;
      if (reduced()) return;
      tick += 1;
      paintAll();
    }, INTERVAL);
  }

  function isBindArt(src) {
    return /paper\.jpg|paper-stamp/i.test(String(src || ""));
  }

  g.BIND = {
    INTERVAL: INTERVAL,
    frame: frame,
    adopt: adopt,
    paintAll: paintAll,
    isBindArt: isBindArt,
    tick: function () {
      return tick;
    }
  };
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
