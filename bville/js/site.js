(() => {
  const nav = document.getElementById("nav");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.getElementById("nav-menu");

  const onScroll = () => {
    if (!nav) return;
    if (document.documentElement.classList.contains("menu-page")) {
      nav.classList.add("is-scrolled");
      return;
    }
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const menuRoot = document.getElementById("menu-root");
  const menuToc = document.getElementById("menu-toc");
  if (!menuRoot) return;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  fetch("menu.json")
    .then((res) => {
      if (!res.ok) throw new Error("Menu failed to load");
      return res.json();
    })
    .then((categories) => {
      menuToc.innerHTML = categories
        .map(
          (cat) =>
            `<a href="#${escapeHtml(cat.id)}">${escapeHtml(cat.title)}</a>`
        )
        .join("");

      menuRoot.innerHTML = categories
        .map((cat) => {
          const note = cat.note
            ? `<p class="note">${escapeHtml(cat.note)}</p>`
            : "";
          const items = (cat.items || [])
            .map((item) => {
              const desc = item.desc
                ? `<p>${escapeHtml(item.desc)}</p>`
                : "";
              return `<article class="menu-item">
                <h3>${escapeHtml(item.name)}</h3>
                <span class="price">${escapeHtml(item.price || "")}</span>
                ${desc}
              </article>`;
            })
            .join("");
          return `<section class="menu-category" id="${escapeHtml(cat.id)}">
            <header>
              <h2>${escapeHtml(cat.title)}</h2>
              ${note}
            </header>
            <div class="menu-list">${items}</div>
          </section>`;
        })
        .join("");

      const tocLinks = [...menuToc.querySelectorAll("a")];
      const sections = categories
        .map((cat) => document.getElementById(cat.id))
        .filter(Boolean);

      const setActive = () => {
        let current = sections[0]?.id;
        for (const section of sections) {
          const top = section.getBoundingClientRect().top;
          if (top <= 120) current = section.id;
        }
        tocLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${current}`
          );
        });
      };

      window.addEventListener("scroll", setActive, { passive: true });
      setActive();
    })
    .catch(() => {
      menuRoot.innerHTML =
        "<p>Could not load the menu. Please call (908) 766-1666.</p>";
    });
})();
