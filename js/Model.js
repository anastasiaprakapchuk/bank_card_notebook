"use strict";
//model

import { RequestUpdateCards } from "./fetch.js";
import { validationNewCard, validationLogo } from "./validation.js";
import { dataForForm } from "./constants.js";

export default class Model {
  constructor() {
    this.myView = null;
    this.list = null;
    this.logoNewCard = null;
    this.form = null; //'new'- форма для новой карты, 'current' - для текущей карты при редактировании
    this.currentCard = null; //текущая карта на редактировании
  }

  start(view, list) {
    this.myView = view;
    this.list = list;
  }

  update(addNewCard = false) {
    this.updateView(addNewCard);
  }

  updateView(addNewCard) {
    if (this.myView) {
      this.myView.update(this.list, addNewCard);
    }
  }

  async removeCard(id) {
    let newList = this.list.filter((item) => item.id !== id);
    this.list = newList;
    await RequestUpdateCards(newList); //запрос на сервер об обновлении списка карт

    this.myView.deleteCard(id); //удаляем карту
  }

  addNewCard() {
    this.form = "new";
    this.update(true);
  }

  learnMoreCard(id) {
    this.form = "current";
    let card = this.list.find((item) => item.id === id);
    this.logoNewCard = card.logo;
    this.currentCard = card;
    this.myView.updateLearnMoreCard(card);
  }

  async saveNewCard(newCard) {
    let newList = [...this.list];
    newList.push(newCard);
    this.list = newList;

    await RequestUpdateCards(newList); //запрос на сервер - обновляем список карт
    this.cancelNewCard();
    this.update();
  }

  async saveCurrentCard(currentCard) {
    let newList = [...this.list];
    let index = newList.findIndex((item) => item.id === this.currentCard.id);
    newList[index] = currentCard;
    this.list = [...newList];

    await RequestUpdateCards(newList); //запрос на сервер - обновляем список карт
    this.cancelNewCard();
    this.update();
  }

  cancelNewCard() {
    this.myView.updateCancelNewCard();
  }

  errorSaveCard(errors) {
    this.myView.updateErrorNewCard(errors);
  }

  errorField(errors) {
    this.myView.updateErrorField(errors);
  }

  cancelValidateField(field) {
    this.myView.cancelValidateField(field);
  }

  addLogoNewCard(logo) {
    this.myView.addLogoNewCard(logo);
  }

  //валидация отдельного поля формы
  validateField(field) {
    let objectForValidation = {};
    dataForForm.forEach((element) => {
      field.className === element.name &&
        (objectForValidation[element.name] = field.value);
    });
    let errors = validationNewCard(objectForValidation);
    if (errors.length !== 0) {
      this.errorField(errors);
    }
  }

  //валидация всех полей формы сразу
  async validationNewCard(formNewCard) {
    let objectForValidation = {};
    dataForForm.forEach(
      (element) =>
        (objectForValidation[element.name] = formNewCard.querySelector(
          "." + element.name
        ).value)
    );

    let errors = validationNewCard(objectForValidation);
    let sameCard;
    if (this.form === "new") {
      sameCard = this.list.find(
        (item) => objectForValidation.number === item.id
      );
    } else if (this.form === "current") {
      let list = [...this.list];
      let currentCardIndex = list.findIndex(
        (item) => this.currentCard.id === item.id
      );
      list.splice(currentCardIndex, 1);
      sameCard = list.find((item) => objectForValidation.number === item.id);
    }

    if (errors.length === 0) {
      if (this.logoNewCard && !sameCard) {
        let newCard = {
          id: objectForValidation.number,
          logo: this.logoNewCard,
          ...objectForValidation,
        };
        this.form === "new"
          ? await this.saveNewCard(newCard)
          : await this.saveCurrentCard(newCard);
      } else if (sameCard) {
        this.cancelNewCard();
        alert(
          "Ошибка при сохранении! Карта c таким номером уже есть в списке!"
        );
      } else if (!this.logoNewCard) {
        this.cancelNewCard();
        alert(
          "Ошибка при сохранении! Карта должна соответствовать платежной системе Visa или МаsterCard"
        );
      }
    } else {
      this.errorSaveCard(errors);
    }
  }

  //определение лого при вводе номера карты
  initializationLogo(value) {
    let logo = validationLogo(value);
    this.addLogoNewCard(logo);
    this.logoNewCard = logo;
  }
}
