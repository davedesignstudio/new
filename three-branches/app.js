/* ============================================================
   Checks & Balances tabs + Quiz
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Checks & Balances ---------- */

  var CHECKS = {
    legislative: {
      label: "How Congress checks the other branches",
      cards: [
        {
          title: "Checks on the Executive",
          items: [
            "Can override a presidential veto with a two-thirds vote",
            "Controls funding for executive programs",
            "Senate confirms (or rejects) presidential appointments",
            "Senate ratifies treaties",
            "Can impeach and remove the President"
          ]
        },
        {
          title: "Checks on the Judiciary",
          items: [
            "Senate confirms federal judges",
            "Can impeach and remove judges",
            "Can propose constitutional amendments to overturn rulings",
            "Creates lower federal courts and sets their jurisdiction"
          ]
        }
      ]
    },
    executive: {
      label: "How the President checks the other branches",
      cards: [
        {
          title: "Checks on Congress",
          items: [
            "Can veto bills passed by Congress",
            "Can call special sessions of Congress",
            "Vice President casts tie-breaking votes in the Senate",
            "Recommends legislation in the State of the Union"
          ]
        },
        {
          title: "Checks on the Judiciary",
          items: [
            "Nominates Supreme Court justices and federal judges",
            "Can grant pardons and reprieves for federal offenses"
          ]
        }
      ]
    },
    judicial: {
      label: "How the courts check the other branches",
      cards: [
        {
          title: "Checks on Congress",
          items: [
            "Can declare laws unconstitutional (judicial review)",
            "Interprets what statutes actually mean in practice"
          ]
        },
        {
          title: "Checks on the Executive",
          items: [
            "Can declare executive actions unconstitutional",
            "Judges serve for life, insulating them from political pressure",
            "Chief Justice presides over presidential impeachment trials"
          ]
        }
      ]
    }
  };

  var panel = document.getElementById("checks-panel");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".checks-tab"));

  function renderChecks(branch) {
    var data = CHECKS[branch];
    var html = "";
    data.cards.forEach(function (card) {
      html += '<div class="check-card"><h3>' + card.title + "</h3><ul>";
      card.items.forEach(function (item) {
        html += "<li>" + item + "</li>";
      });
      html += "</ul></div>";
    });
    panel.innerHTML = html;
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      renderChecks(tab.dataset.branch);
    });
  });

  renderChecks("legislative");

  /* ---------- Quiz ---------- */

  var QUESTIONS = [
    {
      q: "Which branch of government makes the laws?",
      options: ["Executive", "Legislative", "Judicial", "The states"],
      answer: 1,
      why: "Congress — the legislative branch — writes and passes federal laws."
    },
    {
      q: "How many justices serve on the U.S. Supreme Court?",
      options: ["7", "9", "11", "13"],
      answer: 1,
      why: "Nine justices, appointed for life, sit on the Supreme Court."
    },
    {
      q: "What can the President do if they disagree with a bill Congress passed?",
      options: ["Rewrite it", "Ignore it", "Veto it", "Declare it unconstitutional"],
      answer: 2,
      why: "The President can veto a bill — but Congress can override the veto with a two-thirds vote."
    },
    {
      q: "The power of courts to strike down unconstitutional laws is called…",
      options: ["Judicial review", "Impeachment", "Ratification", "Federalism"],
      answer: 0,
      why: "Judicial review was established by Marbury v. Madison in 1803."
    },
    {
      q: "Which two chambers make up the United States Congress?",
      options: [
        "The Cabinet and the Senate",
        "The House and the Supreme Court",
        "The Senate and the House of Representatives",
        "The House and the Electoral College"
      ],
      answer: 2,
      why: "Congress is bicameral: the Senate (100 members) and the House (435 members)."
    }
  ];

  var quizRoot = document.getElementById("quiz-app");
  var current = 0;
  var score = 0;
  var answered = false;

  function renderQuestion() {
    answered = false;
    var q = QUESTIONS[current];
    var html =
      '<div class="quiz-card">' +
      '<p class="quiz-progress">Question ' + (current + 1) + " of " + QUESTIONS.length +
      " &nbsp;·&nbsp; Score: " + score + "</p>" +
      '<p class="quiz-question">' + q.q + "</p>" +
      '<div class="quiz-options">';
    q.options.forEach(function (opt, i) {
      html += '<button class="quiz-option" data-i="' + i + '">' + opt + "</button>";
    });
    html += "</div>" + '<p class="quiz-feedback" id="quiz-feedback"></p>' + "</div>";
    quizRoot.innerHTML = html;

    Array.prototype.slice.call(quizRoot.querySelectorAll(".quiz-option")).forEach(function (btn) {
      btn.addEventListener("click", onAnswer);
    });
  }

  function onAnswer(e) {
    if (answered) return;
    answered = true;

    var q = QUESTIONS[current];
    var chosen = parseInt(e.currentTarget.dataset.i, 10);
    var correct = chosen === q.answer;
    if (correct) score++;

    var buttons = Array.prototype.slice.call(quizRoot.querySelectorAll(".quiz-option"));
    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("is-correct");
      else if (i === chosen) btn.classList.add("is-wrong");
    });

    var feedback = document.getElementById("quiz-feedback");
    feedback.textContent = (correct ? "Correct! " : "Not quite. ") + q.why;
    feedback.classList.add(correct ? "good" : "bad");

    var card = quizRoot.querySelector(".quiz-card");
    var next = document.createElement("button");
    next.className = "quiz-next";
    next.textContent = current + 1 < QUESTIONS.length ? "Next Question →" : "See Results";
    next.addEventListener("click", function () {
      current++;
      if (current < QUESTIONS.length) renderQuestion();
      else renderResult();
    });
    card.appendChild(next);
  }

  function renderResult() {
    var verdict;
    if (score === QUESTIONS.length) verdict = "Perfect score — a true constitutional scholar!";
    else if (score >= 4) verdict = "Excellent! You know your branches well.";
    else if (score >= 3) verdict = "Good work — a solid grasp of the basics.";
    else verdict = "Keep studying — scroll back up and explore each branch.";

    quizRoot.innerHTML =
      '<div class="quiz-card quiz-result">' +
      '<p class="quiz-progress">Quiz complete</p>' +
      '<p class="quiz-score">' + score + " / " + QUESTIONS.length + "</p>" +
      '<p class="quiz-verdict">' + verdict + "</p>" +
      '<button class="quiz-next" id="quiz-retry">Try Again</button>' +
      "</div>";

    document.getElementById("quiz-retry").addEventListener("click", function () {
      current = 0;
      score = 0;
      renderQuestion();
    });
  }

  renderQuestion();
})();
