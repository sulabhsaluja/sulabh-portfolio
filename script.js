// ── Theme ──────────────────────────────────────────
const themeBtn = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme") || "dark";
document.body.setAttribute("data-theme", saved);

themeBtn.addEventListener("click", () => {
  const next = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ── Navigation ─────────────────────────────────────
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

function navigateTo(id) {   
  navLinks.forEach(l => l.classList.toggle("active", l.dataset.section === id));
  sections.forEach(s => s.classList.toggle("active", s.id === id));
  document.querySelector("main").scrollTo({ top: 0 });
  // close mobile menu
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("mobileMenuBtn").classList.remove("open");
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (link.dataset.section) navigateTo(link.dataset.section);
  });
});

// ── Mobile menu ────────────────────────────────────
const menuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
});

// ── EmailJS ────────────────────────────────────────
(function () { emailjs.init("QSjoX--7tQKcFtA6f"); })();

// ── Toast ──────────────────────────────────────────
function showToast(msg, type = "info") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = "toast"; }, 4000);
}

// ── Contact form ───────────────────────────────────
const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector(".send-btn");
  const orig = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = "Sending…";

  try {
    await emailjs.sendForm("service_zuj48fh", "template_4hd588q", form);
    showToast("Message sent! I'll get back to you soon.", "success");
    form.reset();
  } catch {
    showToast("Couldn't send — email me directly.", "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = orig;
  }
});
