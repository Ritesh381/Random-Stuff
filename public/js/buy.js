const spawnBox = document.querySelector(".spawn-box");
const pic = document.querySelector("#pic");
const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const link = document.querySelector("#spawn-rocket");
const useCase = document.querySelector("#spawn-use");
const productContainer = document.querySelector(".product-container");
const searchInput = document.querySelector("#search");
const searchButton = document.querySelector(".search-btn");
const not_found = document.querySelector("#not-found");

const detailBox = document.querySelector(".details-box");
const detailPic = document.querySelector("#detail-pic");
const detailTitle = document.querySelector("#detail-title");
const detailDesc = document.querySelector("#detail-desc");
const detailUse = document.querySelector("#detail-spawn-use");
const detailLink = document.querySelector("#detail-spawn-rocket");
const detailNext = document.querySelector(".next-thing");
const detailPrev = document.querySelector(".prev-thing");
const detailClose = document.querySelector(".detail-close");

let data = [];

// Async function to load data from Supabase
async function initializeData() {
  data = await loadFromSupabase(); // Wait for data to load from Supabase
  if (data.length === 0) {
    console.log("No data found in Supabase.");
  } else {
    console.log("Data loaded from Supabase:", data);
    data.forEach((item) =>
      makeDiv(item.title, item.useCase, item.image, item.link, item.tags)
    );
  }
  continueWithTasks();
}

// Initialize data
initializeData();

let titles = [];
let currDetail = 0;

document.querySelector(".spawn").addEventListener("click", () => {
  spawnBox.style.display = "block";
});

document.querySelector(".close").addEventListener("click", () => {
  spawnBox.style.display = "none";
});

detailClose.addEventListener("click", () => {
  detailBox.style.display = "none";
});

// Random product logic
document.querySelector(".spawn").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomProduct = data[randomIndex];
  updateSpawnBox(randomProduct);
});
document.querySelector(".next").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomProduct = data[randomIndex];
  updateSpawnBox(randomProduct);
});

detailNext.addEventListener("click", () => {
  if (currDetail < data.length - 1) {
    currDetail++;
    let i = currDetail;
    detailBox.style.display = "block";
    detailPic.src = data[i].image;
    detailTitle.textContent = data[i].title;
    detailDesc.textContent = data[i].description;
    detailUse.textContent = data[i].useCase;
    detailLink.href = data[i].link;
  }
});

detailPrev.addEventListener("click", () => {
  if (currDetail > 0) {
    currDetail--;
    let i = currDetail;
    detailBox.style.display = "block";
    detailPic.src = data[i].image;
    detailTitle.textContent = data[i].title;
    detailDesc.textContent = data[i].description;
    detailUse.textContent = data[i].useCase;
    detailLink.href = data[i].link;
  }
});

// Create and Add a Product Div to the Container
function makeDiv(title, useCase, imageUrl, prodLink, tags) {
  tags = tags.trim().split(" ");

  const productDiv = document.createElement("div");
  productDiv.classList.add("product", ...tags);

  productDiv.innerHTML = `
        <a href="${prodLink}" target="_blank">
            <i class="fa-solid fa-rocket"></i>
        </a>
        <div class="picture">
            <img src="${imageUrl}" alt="Product visual">
        </div>
        <p id="p-title">${title}</p>
        <hr>
        <p id="p-use">${useCase}</p>
    `;

  titles.push(productDiv.querySelector("#p-title"));
  productContainer.appendChild(productDiv);
}

// Update the Spawn Box Content
function updateSpawnBox(product) {
  pic.src = product.image || "";
  title.textContent = product.title || "No title available";
  desc.textContent = product.description || "No description available";
  link.href = product.link || "#"; // Fallback to '#' if no link
  useCase.textContent = product.useCase || "No use case provided";
}

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const products = productContainer.querySelectorAll(".product");
  let ct = 0;
  products.forEach((product) => {
    const productClasses = product.classList;
    if (
      Array.from(productClasses).some((className) =>
        className.includes(searchTerm)
      )
    ) {
      product.style.display = "block";
      ct++;
    } else {
      product.style.display = "none";
    }
  });
  if (ct == 0) {
    console.log("No things found");
    not_found.textContent = "None of the things matched the searched keyword";
  } else {
    not_found.textContent = "";
  }
});

function continueWithTasks() {
  for (let i = 0; i < titles.length; i++) {
    titles[i].addEventListener("click", () => {
      currDetail = i;
      detailBox.style.display = "block";
      detailPic.src = data[i].image;
      detailTitle.textContent = data[i].title;
      detailDesc.textContent = data[i].description;
      detailUse.textContent = data[i].useCase;
      detailLink.href = data[i].link;
    });
  }
}
