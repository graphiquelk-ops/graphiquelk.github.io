// === Mobile menu toggle ===
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// === Dark mode toggle ===
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// === Entrance Animation on Page Load ===
window.addEventListener("load", () => {
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    setTimeout(() => {
      heroSection.classList.add("show");
    }, 200); // slight delay for smoother load
  }
});

// === Scroll Animation for About Section ===
window.addEventListener("scroll", () => {
  const aboutSection = document.querySelector(".about");
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const triggerHeight = window.innerHeight * 0.8;

  if (sectionTop < triggerHeight) {
    aboutSection.classList.add("show");
  }
});

// === Scroll Reveal Animations ===

// Function to reveal elements on scroll
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight * 0.85;

    if (elementTop < windowHeight) {
      el.classList.add("show");
    }
  });
};

// Trigger on scroll and on load
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// === Scroll Spy: Highlight Active Navbar Link ===
const sections = document.querySelectorAll("section");
const navLinksList = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinksList.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// === Smooth Scroll on Click ===
navLinksList.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60, // adjust offset for navbar height
        behavior: "smooth",
      });
    }
  });
});

// === Ensure Home is Active on Initial Load ===
window.addEventListener("load", () => {
  navLinksList.forEach((link) => link.classList.remove("active"));
  const homeLink = document.querySelector('.nav-links a[href="#hero"]');
  if (homeLink) homeLink.classList.add("active");
});

// === Portfolio card 3D glow ===
document.querySelectorAll(".portfolio-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--x", `50%`);
    card.style.setProperty("--y", `50%`);
  });
});

/* ===== Order -> WhatsApp integration (Auto Increment ID) ===== */
(function () {
  const orderForm = document.getElementById("orderForm");
  const orderNotice = document.getElementById("orderNotice");
  const phoneNumber = "94705080709"; // WhatsApp number without '+'

  if (!orderForm) return;

  function generateOrderId() {
    // Retrieve last ID from localStorage, increment, and store back
    let lastId = parseInt(localStorage.getItem("graphicLK_lastOrderId") || "0", 10);
    lastId += 1;
    localStorage.setItem("graphicLK_lastOrderId", lastId);

    // Format as GLK-0001 style
    const formatted = String(lastId).padStart(4, "0");
    return `GLK-${formatted}`;
  }

  function sanitizeText(s) {
    if (!s) return "";
    return s.replace(/\r\n/g, "\n").trim();
  }

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = sanitizeText(document.getElementById("name").value);
    const email = sanitizeText(document.getElementById("email").value);
    const service = sanitizeText(document.getElementById("service").value);
    const details = sanitizeText(document.getElementById("details").value);
    const fileInput = document.getElementById("file");
    const fileName = fileInput && fileInput.files && fileInput.files[0]
      ? fileInput.files[0].name
      : "No file attached";

    if (!name || !email || !service || !details) {
      orderNotice.textContent = "⚠️ Please fill all required fields.";
      return;
    }

    const orderId = generateOrderId();

    const messageLines = [
      "🧾 *New Order Request from GraphicLK*",
      `*Order ID:* ${orderId}`,
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      `*Service:* ${service}`,
      `*Details:* ${details}`,
      `*Attached file:* ${fileName}`,
      "",
      "Please respond to confirm the order and next steps."
    ];

    const message = messageLines.join("\n");
    const encoded = encodeURIComponent(message);

    const waURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encoded}`;

    orderNotice.textContent = `Opening WhatsApp… (Order ID: ${orderId})`;
    window.open(waURL, "_blank");

    setTimeout(() => {
      orderForm.reset();
    }, 400);
  });
})();

// === 3D interactive tilt & glow for Contact cards ===
document.querySelectorAll(".contact-card3d").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 15).toFixed(2);
    const rotateY = ((centerX - x) / 15).toFixed(2);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    card.style.setProperty("--x", `50%`);
    card.style.setProperty("--y", `50%`);
  });
});

// === 3D Interactive Floating Spheres (Hover + Move + Rotate) ===
document.querySelectorAll(".sphere").forEach((sphere) => {
  let isHovering = false;

  sphere.addEventListener("mousemove", (e) => {
    const rect = sphere.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / 8).toFixed(2);
    const rotateY = (-x / 8).toFixed(2);

    // Move the sphere slightly in 3D space based on mouse
    const translateX = (x / 25).toFixed(2);
    const translateY = (y / 25).toFixed(2);

    if (isHovering) {
      sphere.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(20px)
        scale(1.1)
      `;
    }
  });

  sphere.addEventListener("mouseenter", () => {
    isHovering = true;
    sphere.style.transition = "transform 0.2s ease-out, box-shadow 0.3s ease";
    sphere.style.boxShadow = "0 30px 80px rgba(0,123,255,0.35)";
  });

  sphere.addEventListener("mouseleave", () => {
    isHovering = false;
    sphere.style.transition = "transform 0.6s ease, box-shadow 0.4s ease";
    sphere.style.transform = "rotateX(0deg) rotateY(0deg) translateX(0) translateY(0) translateZ(0) scale(1)";
    sphere.style.boxShadow = "0 20px 50px rgba(0,123,255,0.15)";
  });

  sphere.addEventListener("mousedown", () => {
    sphere.style.cursor = "grabbing";
    sphere.style.transform += " scale(0.98)";
  });

  sphere.addEventListener("mouseup", () => {
    sphere.style.cursor = "grab";
  });
});

// === Auto Year Update for Footer ===
document.getElementById("year").textContent = new Date().getFullYear();
