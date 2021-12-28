"use strict";
// view

import { createCard } from "./card.js";
import { buildFormForNewCard } from "./form.js";

export default class View {
  constructor() {
    this.myModel = null; // с какой моделью работаем
    this.myElementApp = null; // внутри какого элемента вёрстка
    this.myElementList = null; // элемент - список карт
  }

  start(model, ...elements) {
    this.myModel = model;
    this.myElementApp = elements[0];
    this.myElementList = elements[1];
  }

  buildCurrentList(list) {
    let myList = "";
    list.forEach((item) => (myList += createCard(item)));
    this.myElementList.innerHTML = myList;
  }

  destroyFormForNewCard() {
    let newCard = this.myElementApp.querySelector("#newCard");
    let form = newCard.firstChild;
    newCard.removeChild(form);
  }

  update(list, addNewCard) {
    this.buildCurrentList(list);
    addNewCard && buildFormForNewCard();
  }

  updateLearnMoreCard(card) {
    buildFormForNewCard(card);
  }

  updateCancelNewCard() {
    this.destroyFormForNewCard();
  }

  updateErrorNewCard(errors) {
    errors.forEach((error) => {
      let keys = Object.keys(error);
      let span = this.myElementApp.querySelector("." + keys[0] + "Span");
      span.innerHTML = error[keys[0]];
    });
  }

  updateErrorField(errors) {
    this.updateErrorNewCard(errors);
  }

  cancelValidateField(field) {
    let span = this.myElementApp.querySelector(
      "." + field.getAttribute("class") + "Span"
    );
    span.innerHTML = "";
  }

  addLogoNewCard(logo) {
    let logoElem = document.getElementById("logoNewCard");
    logoElem.src = logo ? `img/logo-${logo}.png` : ``;
  }

  deleteCard(id) {
    let cardDelete = document.getElementById(id);
    cardDelete.setAttribute("class", "card deleteCard");
    cardDelete.addEventListener("transitionend", () => {
      cardDelete.setAttribute("class", "deletedCard");
      console.log(cardDelete);
    });
  }
}
