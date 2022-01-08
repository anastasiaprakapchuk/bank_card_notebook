"use strict";
import "../css/card.css";

//функция построения карты в списке

function createCard(item) {
  let cardHTML = "";
  let logo = `img/logo-${item.logo}.png`;
  let logoImgStyle=(item.logo==="visa"?"height:33%":"height:80%");
  let number =
    item.number.substr(0, 4) +
    " " +
    item.number.substr(4, 4) +
    " " +
    item.number.substr(8, 4) +
    " " +
    item.number.substr(12, 4);
  let comment = item.comment;

  cardHTML += `<div id=${item.id} class='card'>`;

  cardHTML += "<div class='column'>";

  cardHTML += "<div class='string'>";

  cardHTML += "<div class='logo'>";
  cardHTML += `<img src=${logo} style=${logoImgStyle}>`;
  cardHTML += "</div>";

  cardHTML += `<div class='number'>${number}</div>`;

  cardHTML += "</div>";

  cardHTML += `<div class='comment'>${comment}</div>`;

  cardHTML += "</div>";

  cardHTML += "<div class='delete'>";
  cardHTML +=
    "<svg class='remove' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 22.88 22.88' xml:space='preserve'><path fill='#1E201D;' d='M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539 l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z'/></svg>";
  cardHTML += "</div>";

  cardHTML += "</div>";

  return cardHTML;
}

export { createCard };
