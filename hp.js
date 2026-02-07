const searchBox = document.getElementById("searchBar");
const searchResultsContainer = document.getElementById("searchResults");

const visibleCards = document.querySelectorAll(".products .card");
const hiddenCards = document.querySelectorAll("#allProducts .card");

let masterProducts = [];

// build master list
[...visibleCards, ...hiddenCards].forEach(card => {
  masterProducts.push(card.cloneNode(true));
});

// SEARCH
searchBox.addEventListener("keyup", function () {
  const value = this.value.toLowerCase().trim();
  if (value === "") {
    showHome();
    return;
  }
  const filtered = masterProducts.filter(c =>
    c.dataset.name.includes(value)
  );
  showResults(filtered);
});

// CATEGORY
function filterCategory(cat) {
  const filtered = masterProducts.filter(c => c.dataset.category === cat);
  showResults(filtered);
}

// SHOW RESULTS
function showResults(list) {
  document.querySelectorAll(".products").forEach(p => p.style.display = "none");

  searchResultsContainer.innerHTML = "";
  searchResultsContainer.style.display = "grid";

  if (list.length === 0) {
    searchResultsContainer.innerHTML = "<p>No products found</p>";
    return;
  }

  list.forEach(card =>
    searchResultsContainer.appendChild(card.cloneNode(true))
  );
}

// SHOW HOME
function showHome() {
  document.querySelectorAll(".products").forEach(p => p.style.display = "grid");
  searchResultsContainer.style.display = "none";
}

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(btn) {
  const card = btn.parentElement;
  const name = card.querySelector("p").innerText;
  const price = card.querySelectorAll("p")[1].innerText;
  const img = card.querySelector("img").src;

  let item = cart.find(i => i.name === name);
  if (item) item.qty++;
  else cart.push({ name, price, img, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// USER DROPDOWN
const userIcon = document.getElementById("userIcon");
const userDropdown = document.getElementById("userDropdown");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");

userIcon.addEventListener("click", e => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
  } else {
    userDropdown.style.display =
      userDropdown.style.display === "block" ? "none" : "block";
    userName.textContent = "Hello, " + user.name;
  }
});

logoutBtn.addEventListener("click", e => {
  e.preventDefault();
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

document.addEventListener("click", e => {
  if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
    userDropdown.style.display = "none";
  }
});