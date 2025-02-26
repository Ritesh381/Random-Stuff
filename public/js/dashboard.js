if (!LoggedIn) {
  document.body.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.style.fontSize = "100px";
  document.body.appendChild(h1);
  h1.textContent = "Hacker hai kya bhai. Bina Login kiye Idhar kaise aa gaya";
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}

let titles = [];
let prodArray = [];
let currDetail = 0;
const add_block = document.querySelector(".add-block");
const UserName = document.querySelector("#name");
UserName.textContent = "Hello, " + user;
document.querySelector("#add").addEventListener("click", function () {
  add_block.style.display = "flex";
});

document.querySelector("._close").addEventListener("click", function () {
  add_block.style.display = "none";
});

const photoLink = document.querySelector(".photo-link");
const imgFile = document.querySelector("#uploaded-image");
const prodLink = document.querySelector("#_link");
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

    saveToSupabase(product);

    // Reset form fields
    this.reset();
    imgFile.style.display = "none";
    document.querySelector(".upload-text").style.display = "block";
  });

photoLink.addEventListener("change", function (event) {
  addImage(photoLink.value, imgFile);
});

document.querySelector("#find").addEventListener("click", function () {
  window.location.href = "buy.html";
});

// Logout
document.querySelector("#logout").addEventListener("click", () => {
  user = "";
  localStorage.setItem("auth", JSON.stringify({ auth: false, user: user }));
  window.location.href = "index.html";
  UserName.textContent = "Hello, ";
});

// Your Contributions section
const contributionDiv = document.querySelector(".your-contribution");
const nothing = document.querySelector(".nothing");

// Get the data from supabase data column of the user
async function getIDarray() {
  const { data, error } = await supabase
    .from("authentication")
    .select("data")
    .eq("username", user)
    .single();

  if (error) {
    console.error("Error fetching data", error);
    return;
  }
  // Waits until all the function are called
  await Promise.all(data.data.map(async (id) => await getTableData(parseInt(id))));

  handleTitleClicks()
}
getIDarray()
// Get the data of those ids from the data table
async function getTableData(id) {
  const { data, error } = await supabase
    .from("data")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching data from table data ", error);
    return;
  }
  prodArray.push(data);
  makeDiv(data.title, data.useCase, data.image, data.link, data.tags, data.description, id);
}

// Make divs of products and display it
function makeDiv(title, useCase, imageUrl, prodLink, tags, desc,id) {
  let taggs = tags.trim().split(" ");

  const productDiv = document.createElement("div");
  productDiv.classList.add(id)
  productDiv.classList.add("product", ...taggs);

  productDiv.innerHTML = `
        <a href="${prodLink}" target="_blank" id="prodLink">
            <i class="fa-solid fa-rocket"></i>
        </a>
        <div class="picture">
            <img src="${imageUrl}" alt="Product visual">
        </div>
        <p id="p-title">${title}</p>
        <hr>
        <p id="p-use">${useCase}</p>
        <div class="buts">
          <button id="delete">Delete</button>
          <button id="edit">Edit</button>
        </div>
    `;

  titles.push(productDiv.querySelector("#p-title"));
  contributionDiv.appendChild(productDiv);
  handleEdit(productDiv, desc, tags)
  handleDelete(productDiv, desc)
}

// Using the detail box to show detailed information about a product

const detailBox = document.querySelector(".details-box");
const detailPic = document.querySelector("#detail-pic");
const detailTitle = document.querySelector("#detail-title");
const detailDesc = document.querySelector("#detail-desc");
const detailUse = document.querySelector("#detail-spawn-use");
const detailLink = document.querySelector("#detail-spawn-rocket");
const detailNext = document.querySelector(".next-thing");
const detailPrev = document.querySelector(".prev-thing");
const detailClose = document.querySelector(".detail-close");

function handleTitleClicks() {
  for (let i = 0; i < titles.length; i++) {
    titles[i].addEventListener("click", () => {
      currDetail = i;
      detailBox.style.display = "block";
      detailPic.src = prodArray[i].image;
      detailTitle.textContent = prodArray[i].title;
      detailDesc.textContent = prodArray[i].description;
      detailUse.textContent = prodArray[i].useCase;
      detailLink.href = prodArray[i].link;
    });
  }
}

detailNext.addEventListener("click", () => {
  if (currDetail < prodArray.length - 1) {
    currDetail++;
    let i = currDetail;
    detailBox.style.display = "block";
    detailPic.src = prodArray[i].image;
    detailTitle.textContent = prodArray[i].title;
    detailDesc.textContent = prodArray[i].description;
    detailUse.textContent = prodArray[i].useCase;
    detailLink.href = prodArray[i].link;
  }
});

detailPrev.addEventListener("click", () => {
  if (currDetail > 0) {
    currDetail--;
    let i = currDetail;
    detailBox.style.display = "block";
    detailPic.src = prodArray[i].image;
    detailTitle.textContent = prodArray[i].title;
    detailDesc.textContent = prodArray[i].description;
    detailUse.textContent = prodArray[i].useCase;
    detailLink.href = prodArray[i].link;
  }
});

detailClose.addEventListener("click", () => {
  detailBox.style.display = "none";
});


// Search Input Logic

const searchInput = document.querySelector("#search");
const searchButton = document.querySelector(".search-btn");
const not_found = document.querySelector("#not-found");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const products = contributionDiv.querySelectorAll(".product");
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

// Edit button function
const editBox = document.querySelector(".edit-box")
const editTitle = document.querySelector("#title-inp")
const editDesc = document.querySelector("#description-inp")
const editUseCase = document.querySelector("#useCase-inp")
const editProdLink = document.querySelector("#product-inp")
const editImageLink = document.querySelector("#edit-img-link")
const editTags = document.querySelector("#tags-inp")
const editSave = document.querySelector(".save-edit")
const editImg = document.querySelector(".edit-pic img")
let editID = -1;
let selected = document.querySelector("#p-title")

function handleEdit(prod, desc, tags){
  prod.querySelector("#edit").addEventListener("click", ()=>{
    editBox.style.display = 'block';
    editTitle.value = prod.querySelector("#p-title").textContent
    editDesc.value = desc
    editUseCase.value = prod.querySelector("#p-use").textContent
    editProdLink.value = prod.querySelector("#prodLink").href;
    editImageLink.value = prod.querySelector(".picture img").src
    editTags.value = tags
    editImg.src = editImageLink.value
    editID = prod.classList[0];
  })
}

editImageLink.addEventListener("change", ()=>{
  addImage(editImageLink.value, editImg)
})

editSave.addEventListener("click", ()=>{
  console.log(editID)
  if(! (editTitle.value && editDesc.value && editUseCase.value && editTags.value)){
    alert("Please fill out all details")
    return
  }
  if(addImage(editImageLink.value, editImg)) return
  if(!checkLink) return;
  const newData = {
    title : editTitle.value,
    description : editDesc.value,
    useCase : editUseCase.value,
    tags : editTags.value,
    link : editProdLink.value,
    image : editImageLink.value
  }
  console.log(newData)
  updateProdData(editID, newData)
})

function checkLink(){
  const pattern = /^(http:\/\/|https:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;
  let valid = pattern.test(editProdLink.value);
  if (!valid && prodLink.value != "") {
    alert("Please enter a valid URL. For example : https://example.com");
    return false;
  }
  return true
}


// Handle delete event
const deleteBox = document.querySelector(".deleteBox")
const itemName = document.querySelector("#item-name")
const confirmDelete = document.querySelector(".btn-confirm")
const cancelDelete = document.querySelector(".btn-cancel")

function handleDelete(prod){
  prod.querySelector("#delete").addEventListener("click", ()=>{
    editID = prod.classList[0];
    deleteBox.style.display = "block"
    itemName.textContent = prod.querySelector("#p-title").textContent
    selected = prod
  })
}

confirmDelete.addEventListener("click", () => {
  if (editID==-1) {
    console.error("Error: No product ID found for deletion.");
    return;
  }
  console.log("User confirmed delete.");
  deleteBox.style.display = "none";
  deleteProduct(editID);
  selected.remove();
});

cancelDelete.addEventListener("click", () => {
  console.log("User canceled delete.");
  deleteBox.style.display = "none";
});

// Edit Box Functanialities
document.querySelector(".edit-close").addEventListener("click", ()=>{
  editBox.style.display = "none";
})
