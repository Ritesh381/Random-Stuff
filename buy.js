const spawnBox = document.querySelector(".spawn-box");
const pic = document.querySelector("#pic");
const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const link = document.querySelector("#spawn-rocket");
const useCase = document.querySelector("#spawn-use");
const productContainer = document.querySelector('.product-container');
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

const data = JSON.parse(localStorage.getItem('data'));

if (data) {
    console.log(data);
} else {
    console.log("No object found in localStorage.");
    data = [];
}

let titles = [];
let currDetail = 0;

document.querySelector(".spawn").addEventListener('click', () => {
    spawnBox.style.display = 'block';
});

document.querySelector(".close").addEventListener('click', () => {
    spawnBox.style.display = 'none';
});

detailClose.addEventListener("click", () => {
    detailBox.style.display = 'none';
});




data.forEach(item => makeDiv(item.title, item.useCase, item.imagePath, item.link, item.tags));

// Random product logic
document.querySelector('.spawn').addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomProduct = data[randomIndex];
    updateSpawnBox(randomProduct);
});
document.querySelector('.next').addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomProduct = data[randomIndex];
    updateSpawnBox(randomProduct);
});

detailNext.addEventListener("click", ()=>{
    if(currDetail < titles.length-1){
        currDetail++;
        let i = currDetail;
        detailBox.style.display = "block";
        detailPic.src = data[i].imagePath;
        detailTitle.textContent = data[i].title;
        detailDesc.textContent = data[i].description;
        detailUse.textContent = data[i].useCase;
        detailLink.href = data[i].link;
    }
});

detailPrev.addEventListener("click", ()=>{
    if(currDetail > 0){
        currDetail--;
        let i = currDetail;
        detailBox.style.display = "block";
        detailPic.src = data[i].imagePath;
        detailTitle.textContent = data[i].title;
        detailDesc.textContent = data[i].description;
        detailUse.textContent = data[i].useCase;
        detailLink.href = data[i].link;
    }
});

for(let i = 0; i<titles.length; i++){
    titles[i].addEventListener('click', () => {
        currDetail = i;
        detailBox.style.display = "block";
        detailPic.src = data[i].imagePath;
        detailTitle.textContent = data[i].title;
        detailDesc.textContent = data[i].description;
        detailUse.textContent = data[i].useCase;
        detailLink.href = data[i].link;
    });
}


// Create and Add a Product Div to the Container
function makeDiv(title, useCase, imageUrl, prodLink, tags) {
    const productDiv = document.createElement('div');
    tags = tags.split(' ');
    productDiv.classList.add('product', ...tags);

    const iconLink = document.createElement('a');
    iconLink.href = prodLink;
    iconLink.target = "_blank"; // Open link in a new tab

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-rocket');
    iconLink.appendChild(icon);

    const pictureDiv = document.createElement('div');
    pictureDiv.classList.add('picture');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Product visual';
    pictureDiv.appendChild(img);

    const titlePara = document.createElement('p');
    titlePara.id = 'p-title';
    titlePara.textContent = title;
    titles.push(titlePara);

    const useCasePara = document.createElement('p');
    useCasePara.id = 'p-use';
    useCasePara.textContent = useCase;

    const hr = document.createElement('hr');

    productDiv.append(iconLink, pictureDiv, titlePara, hr, useCasePara);

    productContainer.appendChild(productDiv);
}

// Update the Spawn Box Content
function updateSpawnBox(product) {
    pic.src = product.imagePath || '';
    title.textContent = product.title || 'No title available';
    desc.textContent = product.description || 'No description available';
    link.href = product.link || '#'; // Fallback to '#' if no link
    useCase.textContent = product.useCase || 'No use case provided';

    // console.log('Updated Spawn Box:', {
    //     imagePath: product.imagePath,
    //     title: product.title,
    //     description: product.description,
    //     link: product.link,
    //     useCase: product.useCase,
    // });
}



searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const products = productContainer.querySelectorAll('.product');
    let ct = 0;
    products.forEach(product => {
        const productClasses = product.classList;
        if (Array.from(productClasses).some(className => className.includes(searchTerm))) {
            product.style.display = 'block';
            ct++;
        } else {
            product.style.display = 'none';
        }
    });
    if(ct == 0){
        console.log("No things found");
        not_found.textContent = "None of the things matched the searched keyword";
    }else{
        not_found.textContent = "";
    }
});
