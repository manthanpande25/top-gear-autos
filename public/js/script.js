const budgetFilter = document.getElementById("budget-filter");
const typeFilter = document.getElementById("type-filter");
const filterBtn = document.getElementById("filter-btn");
const carList = document.getElementById("car-list");
const categoryButtons = document.querySelectorAll(".category-tabs button");

let activeCategory = "All";
let cars = [];

// ✅ Correct fetch from backend API
fetch('https://top-gear-autos.onrender.com/api/cars')
  .then(res => res.json())
  .then(data => {
    cars = data;
    renderCars(); // Render only after successful fetch
  })
  .catch(err => {
    carList.innerHTML = "<p>❌ Failed to load cars from server.</p>";
    console.error("Fetch error:", err);
  });

function renderCars() {
  carList.innerHTML = "";

  let filtered = [...cars];

  // ✅ Category filter
  if (activeCategory && activeCategory !== "All") {
    filtered = filtered.filter(car =>
      car.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  // ✅ Budget filter
  const budget = budgetFilter?.value || "All";
  if (budget === "under5") {
    filtered = filtered.filter(car => parseFloat(car.price.replace(/[₹ Lakh]/g, "")) < 5);
  } else if (budget === "5to10") {
    filtered = filtered.filter(car => {
      const price = parseFloat(car.price.replace(/[₹ Lakh]/g, ""));
      return price >= 5 && price <= 10;
    });
  } else if (budget === "10plus") {
    filtered = filtered.filter(car => parseFloat(car.price.replace(/[₹ Lakh]/g, "")) > 10);
  }

  // ✅ Type filter
  const type = typeFilter?.value || "All";
  if (type !== "All") {
    filtered = filtered.filter(car =>
      car.category?.toLowerCase() === type.toLowerCase()
    );
  }

  // ✅ Fallback if nothing matches
  if (filtered.length === 0) {
    carList.innerHTML = "<p>No cars found matching your filters.</p>";
    return;
  }

  // ✅ Render filtered car cards
  filtered.forEach((car, index) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <img src="${car.image}" alt="${car.name}" />
      <div class="info">
        <h4>${car.name}</h4>
        <p>${car.year} | ${car.category}</p>
        <p><strong>${car.price}</strong></p>
        <span class="offer-btn" data-index="${index}">View Details</span>
      </div>
    `;
    carList.appendChild(card);
  });
}

// ✅ Filter triggers
filterBtn.addEventListener("click", renderCars);
budgetFilter.addEventListener("change", renderCars);
typeFilter.addEventListener("change", renderCars);

// ✅ Category button logic
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category || button.textContent.trim();
    renderCars();
  });
});

// ✅ Modal logic
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("offer-btn")) {
    const index = e.target.dataset.index;
    const car = cars[index];

    document.getElementById("modal-name").textContent = car.name || "N/A";
    document.getElementById("modal-price").textContent = car.price || "N/A";
    document.getElementById("modal-year").textContent = car.year || "N/A";
    document.getElementById("modal-km").textContent = car.km || "N/A";
    document.getElementById("modal-fuel").textContent = car.fuel || "N/A";
    document.getElementById("modal-transmission").textContent = car.transmission || "N/A";
    document.getElementById("modal-image").src = car.image || "";

    document.getElementById("carModal").style.display = "flex";
  }

  if (e.target.classList.contains("close-btn")) {
    document.getElementById("carModal").style.display = "none";
  }
});
