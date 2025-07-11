// ========== SLIDER LOGIC ==========
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Initialize first slide and auto-slide
showSlide(currentSlide);
setInterval(nextSlide, 4000);

// ========== LOGIN SYSTEM ==========
const loginBtn = document.getElementById("loginBtn");
const cadetSection = document.getElementById("cadets");
const yearSelect = document.getElementById("yearSelect");
const cadetList = document.getElementById("cadetList");

loginBtn.addEventListener("click", () => {
  const email = prompt("🔐 Enter NCC Official Email:");
  const password = prompt("🔐 Enter Password:");

  // Reverse-logic credentials (real values = 'ncc')
  const validEmail = "ccn";
  const validPassword = "ccn";

  const inputEmail = email.split('').reverse().join('');
  const inputPassword = password.split('').reverse().join('');

  if (inputEmail === validEmail && inputPassword === validPassword) {
    cadetSection.classList.remove("hidden");
    alert("✅ Access Granted. Welcome, Officer.");
  } else {
    alert("❌ Access Denied. Unauthorized credentials.");
  }
});

// ========== LOAD CADETS FROM JSON ==========
yearSelect.addEventListener("change", () => {
  const selectedYear = yearSelect.value;
  if (!selectedYear) return;

  fetch("cadets.json")
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then(data => {
      cadetList.innerHTML = "";

      if (data[selectedYear] && data[selectedYear].length > 0) {
        data[selectedYear].forEach(name => {
          const li = document.createElement("li");
          li.textContent = name;
          cadetList.appendChild(li);
        });
      } else {
        cadetList.innerHTML = "<li>❌ No cadets found for selected year.</li>";
      }
    })
    .catch(err => {
      console.error("❌ Failed to load cadets.json:", err);
      cadetList.innerHTML = "<li>⚠️ Unable to load cadet list. Check file path or format.</li>";
    });
});
