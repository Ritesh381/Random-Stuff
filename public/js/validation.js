function addImage(imagePath, image) {
  let testImage = new Image();
  testImage.onload = function () {
    continueAddImage(image, imagePath)
    return true;
  };
  testImage.onerror = function () {
    if(imagePath != ""){
        alert("Please enter a valid image link")
    }
    image.style.display = 'none';
    return false;
  };
  testImage.setAttribute("src", imagePath);
}

function continueAddImage(imgFile, link){
    imgFile.src = link;
    imgFile.style.display = 'block';
    document.querySelector('.upload-text').style.display = 'none';
}




function isValidURL(url) {
    
}