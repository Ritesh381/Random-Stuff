// Create the zigzag patter on home scrren
function createZigzag() {
  const separator = document.querySelector(".seperator");
  separator.innerHTML = "";

  const screenWidth = window.innerWidth;
  const boxSize = 60;
  const numBoxes = Math.ceil(screenWidth / boxSize);

  for (let i = 0; i < numBoxes; i++) {
    const div = document.createElement("div");
    div.className = `sep_box ${i % 2 === 0 ? "black" : "white"}`;
    separator.appendChild(div);
  }
}

// Run on page load and when resizing
window.onload = createZigzag;
window.onresize = createZigzag;

const photoLink = document.querySelector(".photo-link");
const imgFile = document.querySelector("#uploaded-image");
const prodLink = document.querySelector("#_link");

// Get the products from localStroage
let products = JSON.parse(localStorage.getItem("data"));
if (products) {
  console.log(products);
} else {
  console.log("No object found in localStorage.");
  products = [];  
}

document.querySelector(".buy").addEventListener("click", function () {
  window.location.href = "buy.html";
});
const add_block = document.querySelector(".add-block");
document.querySelector(".add").addEventListener("click", function () {
  if (!LoggedIn) {
    window.location.href = "authentication.html";
  } else {
    add_block.style.display = "flex";
  }
});
document.querySelector("._close").addEventListener("click", function () {
  add_block.style.display = "none";
});

// Checking and adding the image url entered by user
photoLink.addEventListener("change", function (event) {
  addImage(photoLink.value, imgFile);
});
// Checking if the url given is correct/
prodLink.addEventListener("change", () => {
  const pattern = /^(http:\/\/|https:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;
  let valid = pattern.test(prodLink.value);
  if (!valid && prodLink.value != "") {
    alert("Please enter a valid URL. For example : https://example.com");
  }
});

// Add product
document
  .querySelector("#product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents form from reloading the page

    const title = document.querySelector("._title").value.trim();
    const description = document.querySelector("#_description").value.trim();
    const useCase = document.querySelector("#_use").value.trim();
    const tags = document.querySelector("#_tags").value.trim();
    const link = document.querySelector("#_link").value.trim();
    const imageLink = document.querySelector("#_photoLink").value.trim();

    let product = {
      title,
      description,
      useCase,
      tags,
      link,
      imagePath: imageLink,
    };

    products.push(product);
    // Save to supabase
    // Call the function of saveToSupabase
    saveToSupabase(product);
    localStorage.setItem("data", JSON.stringify(products));

    // Reset form fields
    this.reset();
    imgFile.style.display = "none";
    document.querySelector(".upload-text").style.display = "block";
  });

const loginSignup = document.querySelector(".login-signup");
let template = "";

if (LoggedIn) {
  template = `<a href="dashboard.html" style="text-decoration: none;font-size: 16px;color: inherit;">Hello, ${user}</a>`;
} else {
  template = `<a href="authentication.html">Login/Signup</a>`;
}

loginSignup.innerHTML = template;
