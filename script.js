// ========= Typing Animation =========

const words = [
  "Frontend Developer",
  "Web Designer",
  "Freelancer",
  "UI Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {
  if (!typing) return;

  const current = words[wordIndex];

  if (!deleting) {
    typing.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typing.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 120);
}

typeEffect();


// ========= EmailJS =========

emailjs.init({
  publicKey: "N3w7iiXyHpdFCbKdx"
});

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {

    e.preventDefault();

    emailjs.send(
      "service_rmghs6a",
      "template_uza7q4g",
      {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
      }
    )
    .then(() => {
      alert("✅ Message Sent Successfully!");
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("❌ Error: " + error.text);
    });

  });
}


// ========= Navbar Active Link =========

const links = document.querySelectorAll("nav a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});
