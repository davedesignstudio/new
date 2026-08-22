const nav = document.getElementById("site-nav");
const toggle = document.querySelector(".nav-toggle");

if (nav && toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

const quiz = document.querySelector("[data-quiz]");

if (quiz) {
  const items = Array.from(quiz.querySelectorAll(".quiz__item"));
  const scoreEl = quiz.querySelector("[data-quiz-score]");
  let answered = 0;
  let correct = 0;

  items.forEach((item) => {
    const answer = item.getAttribute("data-answer");
    const buttons = Array.from(item.querySelectorAll("[data-choice]"));
    const explain = item.querySelector(".quiz__explain");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (item.classList.contains("is-locked")) {
          return;
        }

        item.classList.add("is-locked");
        answered += 1;

        const choice = button.getAttribute("data-choice");
        const isCorrect = choice === answer;

        if (isCorrect) {
          correct += 1;
          button.classList.add("is-correct");
        } else {
          button.classList.add("is-wrong");
          buttons
            .filter((other) => other.getAttribute("data-choice") === answer)
            .forEach((other) => other.classList.add("is-correct"));
        }

        if (explain) {
          explain.hidden = false;
        }

        if (scoreEl && answered === items.length) {
          scoreEl.hidden = false;
          scoreEl.textContent =
            correct === items.length
              ? `All ${items.length} — the map is clear.`
              : `${correct} of ${items.length} correct. The branches are meant to overlap; the labels still matter.`;
        }
      });
    });
  });
}
