// récupération et création elements HTML
let info = document.querySelector(".confirmationInfo");
let infoId = document.createElement("p");
let infoPrice = document.createElement('p');

let infoOrderId = JSON.parse(localStorage.getItem("orderId"));
let infoOrderPrice = JSON.parse(localStorage.getItem("total"));

infoId.appendChild(document.createTextNode("Votre numéro de commande est : " + infoOrderId));

infoPrice.appendChild(document.createTextNode("Le montant total de cette commande est de " + infoOrderPrice + ",00€"));

info.appendChild(infoId);
info.appendChild(infoPrice);

localStorage.removeItem("orderId");
localStorage.removeItem("total");
