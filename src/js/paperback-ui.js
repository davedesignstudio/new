(function () {
  var root = document.getElementById("paperback");
  if (!root || !window.PAPERBACK) return;

  var P = window.PAPERBACK;
  var state = P.newState();
  state = P.go(state, 1);

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function render() {
    var sc = P.scene(state);
    var html = "";

    html += '<div class="pb-sheet">';
    html += '<div class="pb-plate"><img src="' + esc(sc.art) + '" alt=""></div>';
    html += '<p class="pb-num">&sect;&thinsp;' + sc.n + "</p>";
    html += "<h2>" + esc(sc.title) + "</h2>";

    sc.text.forEach(function (p) {
      html += "<p>" + esc(p) + "</p>";
    });

    if (sc.ending) {
      html += '<p class="pb-ending">This reading ends: <strong>' + esc(sc.ending) + "</strong></p>";
      sc.after.forEach(function (p) {
        html += '<p class="pb-after">' + esc(p) + "</p>";
      });
    }

    html += '<ul class="pb-turns">';
    sc.choices.forEach(function (c) {
      if (c.href) {
        html += '<li><a class="pb-turn" href="' + esc(c.href) + '">' + esc(c.label) + "</a></li>";
        return;
      }
      html +=
        '<li><button type="button" class="pb-turn" data-idx="' +
        c.index +
        '">' +
        esc(c.label) +
        '<span class="pb-to">turn to &sect;' +
        c.turn +
        "</span></button></li>";
    });
    html += "</ul>";
    html += "</div>";

    html += '<aside class="pb-ribbon">';
    html += '<p class="pb-ribbon-line"><span>Sections read</span> ' + sc.dogEars + " / " + sc.sections + "</p>";
    html += '<p class="pb-ribbon-line"><span>Endings found</span> ' + sc.endingsFound.length + " / " + sc.endingsTotal + "</p>";
    if (sc.endingsFound.length) {
      html += '<p class="pb-ribbon-list">' + sc.endingsFound.map(esc).join(" · ") + "</p>";
    }
    if (sc.inv.length) {
      html += '<p class="pb-ribbon-line"><span>Carrying</span></p><p class="pb-ribbon-list">' + sc.inv.map(esc).join(" · ") + "</p>";
    }
    html += '<button type="button" class="pb-reset" data-reset>Forget the dog-ears</button>';
    html += "</aside>";

    root.innerHTML = html;

    var buttons = root.querySelectorAll("[data-idx]");
    var i;
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-idx"), 10);
        var node = P.BOOK[state.at];
        state = P.choose(state, node.choices[idx]);
        render();
        var sheet = root.querySelector(".pb-sheet");
        if (sheet && sheet.scrollIntoView) sheet.scrollIntoView({ block: "start" });
      });
    }
    var reset = root.querySelector("[data-reset]");
    if (reset) {
      reset.addEventListener("click", function () {
        state = P.resetAll();
        state = P.go(state, 1);
        render();
      });
    }
  }

  render();
})();
