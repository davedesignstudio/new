/* Checks & balances explorer */
const CHECKS = {
  legislative: {
    label: "Legislative",
    targets: [
      {
        name: "Executive",
        items: [
          "Can override a presidential veto with a two-thirds vote in both chambers",
          "Senate confirms (or rejects) presidential appointments and treaties",
          "Controls funding for executive programs and agencies",
          "Can impeach and remove the President",
        ],
      },
      {
        name: "Judicial",
        items: [
          "Senate confirms federal judges nominated by the President",
          "Can impeach and remove federal judges",
          "Can propose constitutional amendments to respond to court rulings",
          "Sets the structure and jurisdiction of lower federal courts",
        ],
      },
    ],
  },
  executive: {
    label: "Executive",
    targets: [
      {
        name: "Legislative",
        items: [
          "Can veto bills passed by Congress",
          "Can call special sessions of Congress",
          "Proposes the federal budget and legislative agenda",
          "Vice President casts tie-breaking votes in the Senate",
        ],
      },
      {
        name: "Judicial",
        items: [
          "Nominates Supreme Court justices and federal judges",
          "Can grant pardons and reprieves for federal offenses",
          "Enforces (or shapes enforcement of) court decisions",
        ],
      },
    ],
  },
  judicial: {
    label: "Judicial",
    targets: [
      {
        name: "Legislative",
        items: [
          "Can declare laws passed by Congress unconstitutional (judicial review)",
          "Interprets the meaning of statutes when disputes arise",
          "Chief Justice presides over presidential impeachment trials",
        ],
      },
      {
        name: "Executive",
        items: [
          "Can declare executive actions and orders unconstitutional",
          "Judges serve for life, insulating them from presidential pressure",
          "Rules on the limits of presidential power",
        ],
      },
    ],
  },
};

const panel = document.getElementById("checks-panel");
const tabs = Array.from(document.querySelectorAll(".checks-tab"));

function renderChecks(branchKey) {
  const branch = CHECKS[branchKey];
  panel.innerHTML = branch.targets
    .map(
      (target) => `
      <div class="check-card">
        <h3>How the <strong>${branch.label}</strong> branch checks the <strong>${target.name}</strong></h3>
        <ul>${target.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>`
    )
    .join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("is-active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    renderChecks(tab.dataset.branch);
  });
});

renderChecks("legislative");

/* Quiz */
const QUIZ = [
  {
    question: "Which branch of government makes the laws?",
    options: ["Executive", "Legislative", "Judicial"],
    answer: 1,
    explain: "Article I gives Congress — the legislative branch — the power to make laws.",
  },
  {
    question: "How many justices serve on the Supreme Court?",
    options: ["7", "9", "11"],
    answer: 1,
    explain: "Since 1869, the Supreme Court has had nine justices.",
  },
  {
    question: "What can Congress do if the President vetoes a bill?",
    options: [
      "Nothing — the bill is dead",
      "Ask the Supreme Court to pass it",
      "Override the veto with a two-thirds vote in both chambers",
    ],
    answer: 2,
    explain: "A two-thirds vote in both the House and Senate overrides a veto.",
  },
  {
    question: "Which case established judicial review?",
    options: ["Marbury v. Madison", "Brown v. Board of Education", "McCulloch v. Maryland"],
    answer: 0,
    explain: "Marbury v. Madison (1803) established the courts' power to strike down unconstitutional laws.",
  },
  {
    question: "Who is the Commander in Chief of the armed forces?",
    options: ["The Speaker of the House", "The Chief Justice", "The President"],
    answer: 2,
    explain: "Article II makes the President Commander in Chief of the armed forces.",
  },
];

const quizContainer = document.getElementById("quiz-container");
const scoreEl = document.getElementById("quiz-score");
const resetBtn = document.getElementById("quiz-reset");
let answered = 0;
let correct = 0;

function renderQuiz() {
  answered = 0;
  correct = 0;
  scoreEl.textContent = "";
  resetBtn.hidden = true;
  quizContainer.innerHTML = QUIZ.map(
    (q, qi) => `
    <div class="quiz-question" data-q="${qi}">
      <p>${qi + 1}. ${q.question}</p>
      <div class="quiz-options">
        ${q.options
          .map((opt, oi) => `<button class="quiz-option" data-q="${qi}" data-o="${oi}">${opt}</button>`)
          .join("")}
      </div>
      <p class="quiz-feedback" hidden></p>
    </div>`
  ).join("");
}

quizContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".quiz-option");
  if (!button || button.disabled) return;

  const qi = Number(button.dataset.q);
  const oi = Number(button.dataset.o);
  const q = QUIZ[qi];
  const questionEl = quizContainer.querySelector(`.quiz-question[data-q="${qi}"]`);
  const options = questionEl.querySelectorAll(".quiz-option");
  const feedback = questionEl.querySelector(".quiz-feedback");
  const isCorrect = oi === q.answer;

  options.forEach((opt, idx) => {
    opt.disabled = true;
    if (idx === q.answer) opt.classList.add("is-correct");
  });
  if (!isCorrect) button.classList.add("is-wrong");

  feedback.hidden = false;
  feedback.textContent = (isCorrect ? "Correct! " : "Not quite. ") + q.explain;
  feedback.classList.add(isCorrect ? "correct" : "wrong");

  answered += 1;
  if (isCorrect) correct += 1;

  if (answered === QUIZ.length) {
    scoreEl.textContent = `You scored ${correct} out of ${QUIZ.length}.`;
    resetBtn.hidden = false;
  }
});

resetBtn.addEventListener("click", renderQuiz);

renderQuiz();
