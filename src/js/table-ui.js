(function () {
  var root = document.getElementById("table");
  if (!root || !window.TABLE) return;

  var T = window.TABLE;
  function param(name) {
    var q = (window.location.search || "").replace(/^\?/, "").split("&");
    var i;
    for (i = 0; i < q.length; i++) {
      if (!q[i]) continue;
      var p = q[i].split("=");
      if (decodeURIComponent(p[0]) === name) return decodeURIComponent((p[1] || "").replace(/\+/g, " "));
    }
    return null;
  }

  var seedParam = param("seed");
  var fresh = param("fresh") === "1";

  var state;
  if (fresh) {
    T.clearSave();
    state = T.newGame(seedParam);
  } else {
    state = T.loadGame();
    if (!state) state = T.newGame(seedParam);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function whoLabel(who) {
    if (who === "she") return "Zorya";
    if (who === "dm") return "DM";
    if (who === "you") return "You";
    if (who === "roll") return "Dice";
    return "";
  }

  function render() {
    var v = T.view(state);
    var html = "";
    html += '<div class="tb-stage">';
    html += '<div class="tb-plate bind-live" data-bind-art="' + esc(v.art) + '"></div>';
    html += '<p class="tb-where">' + esc(v.title || "The tent") + "</p>";
    html += '<div class="tb-log" id="tb-log">';
    v.log.forEach(function (entry) {
      html +=
        '<p class="tb-line tb-' +
        esc(entry.who) +
        '"><span class="tb-who">' +
        esc(whoLabel(entry.who)) +
        "</span> " +
        esc(entry.text) +
        "</p>";
    });
    html += "</div>";
    if (v.ending) {
      html += '<p class="tb-ending">This night ends: <strong>' + esc(v.ending) + "</strong></p>";
    }
    html += '<form class="tb-form" id="tb-form">';
    html += '<label class="tb-ask" for="tb-input">What do you do?</label>';
    html += '<div class="tb-row">';
    html += '<input id="tb-input" class="tb-input" name="do" autocomplete="off" maxlength="160" placeholder="look, go east, talk, put the stone in the pot…">';
    html += '<button type="submit" class="tb-go">Do</button>';
    html += "</div></form>";
    html += '<div class="tb-prompts">';
    v.prompts.forEach(function (p) {
      html += '<button type="button" class="tb-chip" data-say="' + esc(p) + '">' + esc(p) + "</button>";
    });
    html += "</div>";
    html += "</div>";

    html += '<aside class="tb-sheet">';
    html += '<p class="tb-sheet-kicker">Character</p>';
    html += "<h2>" + esc(v.name || "Unnamed") + "</h2>";
    html += '<p class="tb-job">' + esc(v.job ? v.job : "still being dealt") + "</p>";
    html += '<p class="tb-stat"><span>Hands</span> ' + v.hands + "</p>";
    html += '<p class="tb-stat"><span>Heart</span> ' + v.heart + "</p>";
    html += '<p class="tb-stat"><span>Hunger</span> ' + v.hp + " / " + v.maxHp + "</p>";
    html += '<div class="tb-hp"><i style="width:' + Math.max(0, Math.min(100, (v.hp / v.maxHp) * 100)) + '%"></i></div>';
    html += '<p class="tb-stat"><span>Pack</span></p>';
    html += '<p class="tb-pack">' + esc(v.pack.length ? v.pack.join(" · ") : "empty hands") + "</p>";
    html += '<p class="tb-stat"><span>Night</span> ' + v.seed + "</p>";
    html += '<p class="tb-hint">Each playthrough is rolled on the fly. Same seed, same kitchens. New night, new map.</p>';
    html += '<button type="button" class="tb-reset" data-new>New night</button>';
    html += '<button type="button" class="tb-reset" data-same>Deal this night again</button>';
    html += "</aside>";

    root.innerHTML = html;

    var logEl = document.getElementById("tb-log");
    if (logEl) logEl.scrollTop = logEl.scrollHeight;

    var form = document.getElementById("tb-form");
    var input = document.getElementById("tb-input");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      say(input.value);
    });
    var chips = root.querySelectorAll("[data-say]");
    var i;
    for (i = 0; i < chips.length; i++) {
      chips[i].addEventListener("click", function () {
        say(this.getAttribute("data-say"));
      });
    }
    var neu = root.querySelector("[data-new]");
    if (neu) {
      neu.addEventListener("click", function () {
        T.clearSave();
        state = T.newGame();
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, "", "/table/?seed=" + state.seed);
        }
        render();
      });
    }
    var same = root.querySelector("[data-same]");
    if (same) {
      same.addEventListener("click", function () {
        T.clearSave();
        state = T.newGame(v.seed);
        render();
      });
    }
    if (input) input.focus();
    if (window.BIND) window.BIND.adopt(root.querySelector(".bind-live"), v.art);
  }

  function say(text) {
    if (!text || !String(text).trim()) return;
    var result = T.act(state, text);
    state = result.state;
    render();
  }

  render();
})();
