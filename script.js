// =============================
// Toggle Search Panel
// =============================
function toggleSearch() {
  const searchPanel = document.getElementById("searchPanel");
  const searchBar = document.getElementById("searchBar");
  const resultsList = document.getElementById("resultsList");
  const requestBox = document.getElementById("requestBox");

  searchPanel.classList.toggle("active");
  searchBar.value = "";
  resultsList.innerHTML = "";
  requestBox.style.display = "none";
}

// =============================
// Toggle Dropdown Menu
// =============================
function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// =============================
// Services / Categories Database
// =============================
const services = [
  { name: "Royal Wedding Setup", img: "wedding.jpg", type: "Event", link: "royal-wedding.html" },
  { name: "Birthday Party Decor", img: "birthday.jpg", type: "Event", link: "birthday.html" },
  { name: "Corporate Conference", img: "corporate.jpg", type: "Event", link: "corporate.html" },
  { name: "Stage Decoration", img: "stage.jpg", type: "Category", link: "stage-decoration.html" },
  { name: "Event Catering", img: "catering.jpg", type: "Category", link: "catering.html" },
  { name: "DJ & Music Setup", img: "dj.jpg", type: "Service", link: "dj.html" }
];

// =============================
// Show Search Results
// =============================
function showResults(query) {
  const resultsList = document.getElementById("resultsList");
  const requestBox = document.getElementById("requestBox");

  resultsList.innerHTML = "";
  requestBox.style.display = "none";

  if (query.trim() === "") return;

  const filtered = services.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length > 0) {
    filtered.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("result-item");
      div.innerHTML = `
        <img src="${item.img}" alt="">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.type}</small>
        </div>
      `;
      div.onclick = () => { window.location.href = item.link; }; // ✅ redirect
      resultsList.appendChild(div);
    });
  } else {
    requestBox.style.display = "block";
  }
}

// =============================
// Request New Service (Email Redirect)
// =============================
function requestService() {
  const query = document.getElementById("searchBar").value;
  const supportEmail = "mercollab17@gmail.com";
  const subject = "Request New Service";
  const body = `Hello,\n\nA user searched for "${query}" which is not listed. Please add this service.\n\n- VELA Website`;

  // ✅ Show confirmation
  alert(`We received your request for "${query}". Redirecting to homepage...`);

  // ✅ Trigger email
  window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // ✅ Redirect after short delay
  setTimeout(() => {
    window.location.href = "index.html"; // adjust if homepage filename differs
  }, 1500);
}

// =============================
// Close Menu on Outside Click
// =============================
document.addEventListener("click", function(event) {
  const menu = document.getElementById("dropdownMenu");
  const btn = document.querySelector(".menu-btn");
  if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
    menu.style.display = "none";
  }
});

// =========================
// AUTOMATION FOR TOP PICKS
// =========================
const events = [
  {img:"wedding.jpg", title:"Royal Wedding Setup", desc:"Stage, Floral, Lights, Catering", price:"₹40,000 onwards", time:"30 days", offer:"50% OFF", link:"royal-wedding.html"},
  {img:"img/birthday-service.jpg", title:"Birthday Party Decor", desc:"Balloons, Cake Table, Theme", price:"₹15,000 onwards", time:"7 days", offer:"40% OFF", link:"birthday-party.html"},
  {img:"img/corporate-service.jpg", title:"Corporate Conference", desc:"Venue, Seating, AV Setup", price:"₹60,000 onwards", time:"14 days", offer:"30% OFF", link:"corporate-conference.html"},
  {img:"img/mehndi-service.jpg", title:"Mehndi Ceremony", desc:"Traditional Mehndi Artists & Setup", price:"₹10,000 onwards", time:"5 days", offer:"25% OFF", link:"mehndi-ceremony.html"},
  {img:"img/reception-service.jpg", title:"Reception Event", desc:"Decor, Catering, Music & Lighting", price:"₹50,000 onwards", time:"20 days", offer:"35% OFF", link:"reception-event.html"}
];

const eventGrid = document.getElementById("eventGrid");

// Populate events
events.forEach(ev => {
  eventGrid.innerHTML += `
    <div class="event-card">
      <a href="${ev.link}"><img src="${ev.img}" alt=""></a>
      <div class="offer">${ev.offer}</div>
      <div class="details">
        <h4>${ev.title}</h4>
        <p>${ev.desc}</p>
        <span class="price">${ev.price}</span>
        <span class="time">${ev.time}</span>
      </div>
    </div>
  `;
});

// Track clicks on event cards
document.addEventListener("click", e => {
  const card = e.target.closest('.event-card');
  if (!card) return;
  const name = card.querySelector('h4').innerText;
  updateTopPicks(name);
});

// Save stats in localStorage
function updateTopPicks(eventName) {
  let stats = JSON.parse(localStorage.getItem("eventStats")) || {};
  stats[eventName] = (stats[eventName] || 0) + 1;
  localStorage.setItem("eventStats", JSON.stringify(stats));
}

// Reorder events on page load
function reorderTopPicks() {
  let stats = JSON.parse(localStorage.getItem("eventStats")) || {};
  const grid = document.getElementById("eventGrid");
  if (!grid) return;

  let cards = Array.from(grid.children);
  cards.sort((a, b) => {
    const aName = a.querySelector('h4').innerText;
    const bName = b.querySelector('h4').innerText;
    return (stats[bName] || 0) - (stats[aName] || 0);
  });

  grid.innerHTML = "";
  cards.forEach(c => grid.appendChild(c));
}

document.addEventListener("DOMContentLoaded", reorderTopPicks);
