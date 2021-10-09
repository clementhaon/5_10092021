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

// Méthode pour renvoyer la valeur (id) recherché
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const produitId = params.get('id');

//récupération de l'api id
function addProductId() {
    fetch("http://localhost:3000/api/cameras/" + produitId) 
      .then(
        response => { 
          return response.json();
        })
      .then(
        function (data) {
            console.log(data);
            theCamera(data);
            addBasket(data);
        }
      )
  }

// Création éléments
let cameraImage = document.createElement("img");
let cameras = document.querySelector(".container-sm");
let cameraItem = document.createElement("div");
let cameraItemHeader = document.createElement("div");
let cameraItemBody = document.createElement("div");
let cameraItemFooter = document.createElement("div");
let cameraName = document.createElement ("h2");
let cameraPrice = document.createElement ("p");
let cameraDescription = document.createElement ("p");
let cameraLabelQuantity = document.createElement("label");
let cameraQuantity = document.createElement("input");
let cameraLenses = document.createElement ("label");
let cameraSelect = document.createElement ("select");
let cameraButton = document.createElement ("button");

//Attribution class id ...
cameraLenses.setAttribute("name", "Lenses");
cameraLabelQuantity.setAttribute("for", "quantity");
cameraQuantity.setAttribute("id", "quantity");
cameraQuantity.setAttribute("type", "number");
cameraQuantity.setAttribute("value", "1");
cameraQuantity.setAttribute("min", "1");

// Style bootstrap
cameraItem.classList.add("col", "d-flex", "align-items-center", "flex-column");
cameraImage.classList.add("w-100", "imgBox", "my-5");
cameraItemHeader.classList.add("d-flex", "w-100",);
cameraItemBody.classList.add("d-flex", "w-100",);
cameraItemFooter.classList.add("d-flex", "w-100", "justify-content-between", "pt-5");
cameraPrice.classList.add("bold");
cameraDescription.classList.add("bold", "pb-5");
cameraLenses.classList.add("bold", "align-self-start");
cameraLabelQuantity.classList.add("bold", "align-self-start");
cameraQuantity.classList.add("align-self-start");
cameraButton.classList.add("bold");


// Placement des éléments
cameras.appendChild(cameraItem);
cameraItem.appendChild(cameraName);
cameraItem.appendChild(cameraImage);
cameraItem.appendChild(cameraDescription);
cameraItem.appendChild(cameraItemHeader);
cameraItemHeader.appendChild(cameraLabelQuantity);
cameraItemHeader.appendChild(cameraQuantity);
cameraItem.appendChild(cameraItemBody);
cameraItemBody.appendChild(cameraLenses);
cameraItemBody.appendChild(cameraSelect);
cameraItem.appendChild(cameraItemFooter);
cameraItemFooter.appendChild(cameraPrice);
cameraItemFooter.appendChild(cameraButton);

//création de l'article
function theCamera(data){
  

  // Remplissage des éléments
  cameraImage.src = data.imageUrl;
  cameraName.appendChild(document.createTextNode(data.name));
  cameraPrice.appendChild(document.createTextNode(data.price/100 + ",00€"));
  cameraDescription.appendChild(document.createTextNode(data.description));
  cameraLabelQuantity.appendChild(document.createTextNode("Quantité : "));
  cameraLenses.appendChild(document.createTextNode("Lentilles : "));
  cameraButton.appendChild(document.createTextNode("Ajouter au panier"));
  for (i = 0; i < data.lenses.length; i++) {
    let option = document.createElement("option");
    option.textContent = data.lenses[i];
    cameraSelect.appendChild(option);
  }

}
// Ajout du produit au panier
function addBasket(data) {
  cameraButton.addEventListener('click', () => {
    //Création du panier dans le localStorage s'il n'existe pas déjà
    if (typeof localStorage.getItem("basket") !== "string") {
      let basket = [];
      localStorage.setItem("basket", JSON.stringify(basket));
    }
    //récupération des info du produit
    let produit = {
      'image' : data.imageUrl,
      'id' : data._id,
      'name' : data.name,
      'lense' : document.querySelector("option:checked").innerText,
      'price' : data.price,
      'description' : data.description,
      'quantity' : cameraQuantity.value,
    }
    console.log(produit);
    //création d'une variable pour manipuler le panier
    let basket = JSON.parse(localStorage.getItem("basket"));
    //Vérification que l'item n'existe pas déjà dans le panier
    let isThisItemExist = false;
    let existingItem;
    for (let i = 0; i < basket.length; i++) {
      if (produit.id === basket[i].id && produit.lense === basket[i].lense) {
        isThisItemExist = true;
        existingItem = basket[i];
      }
    }
    //Ajouter la caméra au panier
    if (isThisItemExist === false) {
      basket.push(produit);
      localStorage.setItem("basket", JSON.stringify(basket));
      alert("Votre article à bien été mis au panier")
    } else {
      existingItem.quantity = parseInt(existingItem.quantity, 10) + parseInt(produit.quantity, 10);
      localStorage.setItem("basket", JSON.stringify(basket));
      alert("La quantité du produit à bien été mise à jour")
    }
  })
}

addProductId();
