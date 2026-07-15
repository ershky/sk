
const EMAILJS_PUBLIC_KEY = "N3w7iiXyHpdFCbkdX";
const EMAILJS_SERVICE_ID = "service_rmghs6a";
const EMAILJS_TEMPLATE_ID = "template_uza7q4g";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const cursorGlow = document.getElementById("cursorGlow");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 25);
  updateActiveLink();
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

function updateActiveLink() {
  let current = "home";
  document.querySelectorAll("section[id]").forEach(section => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

const words = [
  "AI-powered ideas",
  "modern websites",
  "smart experiences",
  "future-ready products"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typedText = document.getElementById("typedText");

function typeLoop() {
  const word = words[wordIndex];
  typedText.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);

  let delay = deleting ? 45 : 85;

  if (!deleting && charIndex > word.length) {
    deleting = true;
    delay = 1200;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    charIndex = 0;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 300;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      entry.target.querySelectorAll?.(".track i").forEach(bar => {
        bar.style.width = `${bar.dataset.width}%`;
      });

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const stats = document.querySelectorAll("[data-count]");
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let value = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      value += step;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      el.textContent = value;
    }, 28);
    statObserver.unobserve(el);
  });
}, { threshold: 0.6 });

stats.forEach(stat => statObserver.observe(stat));

document.addEventListener("mousemove", e => {
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const profileCard = document.getElementById("profileCard");
const visualStage = document.getElementById("visualStage");

visualStage.addEventListener("mousemove", e => {
  const rect = visualStage.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  profileCard.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) translateZ(15px)`;
});

visualStage.addEventListener("mouseleave", () => {
  profileCard.style.transform = "rotateY(0) rotateX(0)";
});

document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".magnetic").forEach(button => {
  button.addEventListener("mousemove", e => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async event => {
  event.preventDefault();

  formStatus.className = "form-status";
  formStatus.textContent = "";
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  try {
    await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      contactForm
    );

    formStatus.className = "form-status success";
    formStatus.textContent = "Message sent successfully! I will reply soon.";
    contactForm.reset();
  } catch (error) {
    console.error("EmailJS error:", error);
    formStatus.className = "form-status error";
    formStatus.textContent = "Message could not be sent. Please check EmailJS template fields.";
  } finally {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  createParticles();
}

function createParticles() {
  const count = Math.min(90, Math.floor(innerWidth / 16));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    a: Math.random() * 0.45 + 0.1
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = innerWidth;
    if (p.x > innerWidth) p.x = 0;
    if (p.y < 0) p.y = innerHeight;
    if (p.y > innerHeight) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(190, 200, 255, ${p.a})`;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

resizeCanvas();
animateParticles();
window.addEventListener("resize", resizeCanvas);
