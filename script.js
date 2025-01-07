const photoLink = document.querySelector(".photo-link");
const imgFile = document.querySelector("#uploaded-image");

let products = JSON.parse(localStorage.getItem('data'));

if (products) {
    console.log(products);
} else {
    console.log("No object found in localStorage.");
    products = [];
}

document.querySelector('.buy').addEventListener('click', function () {
    window.location.href = 'buy.html';
});
const add_block = document.querySelector('.add-block');
document.querySelector('.add').addEventListener('click', function(){
    add_block.style.display = "flex";
});
document.querySelector('._close').addEventListener('click', function(){
    add_block.style.display = "none";
});

photoLink.addEventListener('change', function(event) {
    imgFile.src = photoLink.value;
    if(photoLink.value != ""){
        imgFile.style.display = 'block';
        document.querySelector('.upload-text').style.display = 'none';
    }else{
        imgFile.style.display = 'none';
        document.querySelector('.upload-text').style.display = 'block';
    }
});

// Add product
document.querySelector('.add-btn').addEventListener('click', function () {
    const title = document.querySelector('._title').value;
    const description = document.querySelector('#_desription').value;
    const useCase = document.querySelector('#_use').value;
    const tags = document.querySelector('#_tags').value;
    const link = document.querySelector('#_link').value;
    const imageLink = photoLink.value;

    if (!title) {
        alert("Please enter title");
        return;
    }
    if (!description) {
        alert("Please enter description");
        return;
    }
    if (!useCase) {
        alert("Please enter use case");
        return;
    }
    if (!tags) {
        alert("Please enter tags");
        return;
    }
    if (!link) {
        alert("Please enter link");
        return;
    }
    if (!imageLink) {
        alert("Please upload an image");
        return;
    }


    let product = {
        "title": title.trim(),
        "description": description.trim(),
        "useCase": useCase.trim(),
        "tags": tags.trim(),
        "link": link.trim(),
        "imagePath": imageLink.trim()
    }
    products.push(product);
    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify(products));
    alert("Product added successfully")
});

