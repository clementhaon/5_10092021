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

let articleCard = JSON.parse(localStorage.getItem("basket"));




//Calcul du montant total du panier
function totalPrice() {
  let total = 0; 
  for(let y = 0; y < articleCard.length; y++){
    total = total+(articleCard[y].price*articleCard[y].quantity)/100;
  }
  let totalBasket = document.querySelector(".totalbasket");
  totalBasket.textContent = "Montant à régler : " + total + ",00€";
}


//Localstorage présent ou pas fontcion à executer en fonction
function myBasket() {
  if(localStorage.getItem("basket") != null) {
    for (var i = 0; i < articleCard.length; i++){
      // console.log(articleCard[i]);
      createArticle(articleCard[i])
    }
  }
  else{
    emptyBasket();
  }
}

//Fonction du panier vide
function emptyBasket() {
  let emptyBasket = document.querySelector(".articlebasket");
  emptyBasket.innerHTML = "<p class='panniervide'>Votre panier est vide</p>";
}

//Fonction article présent dans le panier
function createArticle(data) {
  //Mise en place du html 
  let articleBasket = document.querySelector(".articlebasket");
  let articleOneCard = document.createElement("div");
  let articleOneCardBody = document.createElement("div");
  let articleTitle = document.createElement("h3");
  let articleImage = document.createElement("img");
  let articleLense = document.createElement("p");
  let articleQuantity = document.createElement("p");
  let articleQuantityElt = document.createElement("p");
  let articlePrice = document.createElement("p");


  articleOneCard.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-between", "my-2", "bord", "pt-2");
  articleOneCardBody.classList.add("d-flex", "flex-row", "align-items-center");
  articleImage.classList.add("imgArticle");

  articleImage.src = data.image;
  articleTitle.appendChild(document.createTextNode(data.name));
  articleLense.appendChild(document.createTextNode(data.lense));
  articleQuantityElt.appendChild(document.createTextNode(data.quantity));

  articleQuantity.appendChild(document.createTextNode("Quantité : "));
  articlePrice.appendChild(document.createTextNode(data.price*data.quantity/100 + ",00€"));

  articleBasket.appendChild(articleOneCard);
  articleOneCard.appendChild(articleTitle);
  articleOneCard.appendChild(articleImage);
  articleOneCard.appendChild(articleLense);
  articleOneCard.appendChild(articleOneCardBody);
  articleOneCardBody.appendChild(articleQuantity);
  articleOneCardBody.appendChild(articleQuantityElt);
  articleOneCard.appendChild(articlePrice);

}

myBasket();
totalPrice();



//FORMULAIRE
//pointage des élements
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"]'
);
//Variable pour récupération des données
let firstName, lastName, adress, city, email;

// Fonction concue pour le pointage de tous les éléments erreurs
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

//Vérification de la validation du prenom
const prenomChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("firstName", "Le prenom doit faire entre 3 et 20 caractères");
    firstName = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "firstName",
      "Le prenom ne doit pas contenir de caractères spéciaux"
    );
    firstName = null;
  } else {
    errorDisplay("firstName", "", true);
    firstName = value;
  }
};
//Vérification de la validation du nom
const nomChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
      errorDisplay("lastName", "Le nom doit faire entre 3 et 20 caractères");
      lastName = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
      errorDisplay(
        "lastName",
        "Le nom ne doit pas contenir de caractères spéciaux"
      );
      lastName = null;
    } else {
      errorDisplay("lastName", "", true);
      lastName = value;
    }
  };
// vérification adresse 
const adressChecker = (value) => {
    if (!value.match(/^[a-zA-Z0-9\s\,\''\-]*$/)) {
      errorDisplay("adress", "L'adresse n'est pas valide");
      adress = null;
    } else {
      errorDisplay("adress", "", true);
      adress = value;
    }
  };
// vérification ville 
const cityChecker = (value) => {
    if (!value.match(/^[a-zA-Z0-9\s\,\''\-]*$/)) {
      errorDisplay("city", "La ville n'est pas valide");
      city = null;
    } else {
      errorDisplay("city", "", true);
      city = value;
    }
  };
// vérification de la validité du mail
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};



inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        prenomChecker(e.target.value);
        break;
      case "lastName":
        nomChecker(e.target.value);
        break;
      case "adress":
        adressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});
//Fonction d'envoi des éléments si valide
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let products = [];
  products.push(articleCard);
  
  

  if (firstName && lastName && adress && city && email) {
    const contact = {
      firstName,
      lastName,
      adress,
      city,
      email,
    };
    let order = {
      contact, products
    };


    inputs.forEach((input) => (input.value = ""));

    
    firstName = null;
    lastName = null;
    adress = null;
    city = null;
    email = null;
    alert("Inscription validée !");
    sendData(order);
  } else {
    alert("veuillez remplir correctement les champs");
  }
});

function sendData(order) {
  fetch("http://localhost:3000/api/cameras/" + "order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      console.log(response); 
      return response.json();
    })
    .then((response) => {
    })

    console.log(order)   
}

