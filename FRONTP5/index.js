function displayBasket() {
  //Vérifier si le panier possède au moins une caméra :
  if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
      document.querySelector("#basketPage").hidden = true;
  } else {
      document.querySelector("#basketPage").hidden = false;
  }
}

//Récupération de l'API avec fetch
function addProduct() {
    fetch("http://localhost:3000/api/cameras/") //appel api, callback, ... return une promesse
      .then(
        response => { //fonction anonyme prend pour parametre response et return response.json
          return response.json();
        })
      .then(
        function (data) {
            console.log(data);
            // parcours de tableau
            for (var i = 0; i < data.length; i++ ){
                //appel function sur 1 camera
                oneCamera(data[i]);
            }
        }
      )
      .catch (function(error){
        alert("API ne fonctionne pas");
      })
  }


function oneCamera(camera){

    // Création éléments
    let cameraImage = document.createElement("img");
    let cameras = document.querySelector(".container-sm");
    let cameraItem = document.createElement("div");
    let cameraItemBody = document.createElement("div")
    let cameraName = document.createElement ("h2");
    let cameraPrice = document.createElement ("p");
    let link = document.createElement ("a");

    // Remplissage des éléments
    cameraImage.src = camera.imageUrl;
    cameraName.appendChild(document.createTextNode(camera.name));
    cameraPrice.appendChild(document.createTextNode(camera.price/100 + ",00€"));
    link.appendChild(document.createTextNode("Détails du produit"));

    // Style bootstrap
    cameraItem.classList.add("col", "d-flex", "align-items-center", "flex-column", "line");
    cameraImage.classList.add("w-100", "imgBox");
    cameraItemBody.classList.add("d-flex", "w-100", "justify-content-between");
    cameraPrice.classList.add("bold");
    link.classList.add("bold");

    // Link page produit
    link.href = ('catalogue.html?id=' + camera._id);

    // Placement des éléments
    cameras.appendChild(cameraItem);
    cameraItem.appendChild(cameraName);
    cameraItem.appendChild(cameraImage);
    cameraItem.appendChild(cameraItemBody);
    cameraItemBody.appendChild(cameraPrice);
    cameraItemBody.appendChild(link);

}

addProduct();

//scroll nav
const nav = document.querySelector("nav");

window.addEventListener('scroll', () => {

    if(window.scrollY > 180) {
        nav.style.position = "fixed";
        nav.style.top = 0;
    }else {
        nav.style.position = "static";
    }
});
displayBasket();



    

