// Redirect if already logged in
if (localStorage.getItem("user")) {
  window.location.href = "index.html"; // homepage
}

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const address = document.getElementById("address").value.trim();

  // Allowed pincodes
  const allowedPincodes = ["421201", "421202", "421203", "421204"];

  if (!allowedPincodes.includes(pincode)) {
    errorMsg.textContent =
      "Delivery available only for pincodes 421201 to 421204.";
    return;
  }

  // Save user
  const user = {
    name,
    email,
    pincode,
    address
  };

  localStorage.setItem("user", JSON.stringify(user));

  // Redirect to homepage
  window.location.href = "index.html";
});