const QUESTIONS = [
  {
    q: "Which branch makes the laws?",
    options: ["Legislative", "Executive", "Judicial"],
    answer: 0,
    note: "Congress (the legislative branch) writes and passes laws.",
  },
  {
    q: "Which branch enforces the laws?",
    options: ["Legislative", "Executive", "Judicial"],
    answer: 1,
    note: "The President leads the executive branch, which carries out the laws.",
  },
  {
    q: "Which branch interprets the laws?",
    options: ["Legislative", "Executive", "Judicial"],
    answer: 2,
    note: "The courts (judicial branch) interpret laws and settle disputes.",
  },
  {
    q: "Who can veto a bill passed by Congress?",
    options: ["The President", "The Chief Justice", "The Speaker of the House"],
    answer: 0,
    note: "The President can veto legislation as a check on Congress.",
  },
  {
    q: "What power lets courts strike down unconstitutional laws?",
    options: ["Judicial review", "Executive order", "Filibuster"],
    answer: 0,
    note: "Judicial review lets the courts declare laws unconstitutional.",
  },
  {
    q: "How many justices serve on the U.S. Supreme Court?",
    options: ["7", "9", "12"],
    answer: 1,
    note: "The Supreme Court has 9 justices, appointed for life.",
  },
];

let current = 0;
let score = 0;
let answered = false;

const els = {
  progress: document.getElementById("quiz-progress"),
  question: document.getElementById("quiz-question"),
  options: document.getElementById("quiz-options"),
  feedback: document.getElementById("quiz-feedback"),
  score: document.getElementById("quiz-score"),
  next: document.getElementById("quiz-next"),
};

function renderQuestion() {
  const item = QUESTIONS[current];
  answered = false;
  els.progress.textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
  els.question.textContent = item.q;
  els.feedback.textContent = "";
  els.feedback.className = "quiz-feedback";
  els.next.disabled = true;
  els.next.textContent = current === QUESTIONS.length - 1 ? "Finish" : "Next";
  els.options.innerHTML = "";

  item.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = text;
    btn.addEventListener("click", () => selectOption(index, btn));
    els.options.appendChild(btn);
  });
}

function selectOption(index, btn) {
  if (answered) return;
  answered = true;
  const item = QUESTIONS[current];
  const buttons = els.options.querySelectorAll(".quiz-option");
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === item.answer) b.classList.add("correct");
  });

  if (index === item.answer) {
    score += 1;
    els.feedback.textContent = `Correct! ${item.note}`;
    els.feedback.classList.add("ok");
  } else {
    btn.classList.add("wrong");
    els.feedback.textContent = `Not quite. ${item.note}`;
    els.feedback.classList.add("no");
  }

  els.score.textContent = `Score: ${score}`;
  els.next.disabled = false;
}

function showResults() {
  els.progress.textContent = "Results";
  els.question.textContent = `You scored ${score} out of ${QUESTIONS.length}!`;
  els.options.innerHTML = "";
  els.feedback.textContent =
    score === QUESTIONS.length
      ? "Perfect score. You know your civics!"
      : "Nice work. Review the branches above and try again.";
  els.feedback.className = "quiz-feedback ok";
  els.next.textContent = "Restart";
  els.next.disabled = false;
}

els.next.addEventListener("click", () => {
  if (current === QUESTIONS.length - 1 && answered) {
    if (els.next.textContent === "Restart") {
      current = 0;
      score = 0;
      els.score.textContent = "Score: 0";
      renderQuestion();
    } else {
      showResults();
    }
    return;
  }
  current += 1;
  renderQuestion();
});

renderQuestion();
