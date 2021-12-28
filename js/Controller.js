"use strict";
//controller
import { dataForForm } from "./constants.js";

export default class Controller {
  constructor() {
    this.myModel = null; // с какой моделью работаем
    this.myElementApp = null; // внутри какого элемента вёрстка
    this.myElementList = null; // елемент - список

    //привязываем this
    this.notificationRemote = this.notificationRemote.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.cancelNewCard = this.cancelNewCard.bind(this);
    this.validationNewCard = this.validationNewCard.bind(this);
    this.validateField = this.validateField.bind(this);
    this.cancelValidateField = this.cancelValidateField.bind(this);
    this.initializationLogo = this.initializationLogo.bind(this);
    this.learnMoreCard = this.learnMoreCard.bind(this);
  }

  start(model, ...elements) {
    this.myModel = model;
    this.myElementApp = elements[0];
    this.myElementList = elements[1];
  }

  update() {
    // назначаем обработчики событий для интересных нам элементов

    //Удаляем одну из карт
    let cards = this.myElementList.querySelectorAll(".card");
    cards.forEach((item) =>
      item
        .querySelector(".remove")
        .addEventListener("click", this.notificationRemote)
    );

    //Кликаем на одну из карт
    cards.forEach((item) =>
      item
        .querySelector(".column")
        .addEventListener("click", this.learnMoreCard)
    );

    //Добавляем новую карту
    let addButton = this.myElementApp.querySelector("#addCard");
    addButton.addEventListener("click", this.addNewCard);

    //Сохраняем новую карту
    let newCard = this.myElementApp.querySelector("#newCard");
    let buttonSave = newCard.querySelector("#saveButton");
    buttonSave && buttonSave.addEventListener("click", this.validationNewCard);

    //Отменяем сохранение новой карты
    let buttonCancel = newCard.querySelector("#cancelButton");
    buttonCancel && buttonCancel.addEventListener("click", this.cancelNewCard);

    //Обработчик изменения полей формы
    dataForForm.forEach((element) => {
      let field = newCard.querySelector("." + element.name);
      field && field.addEventListener("blur", this.validateField);
      field && field.addEventListener("focus", this.cancelValidateField);
    });

    //Обработчик для поля 'Номер карты'
    let fieldNumberCard = newCard.querySelector(".number");
    fieldNumberCard &&
      fieldNumberCard.addEventListener("input", this.initializationLogo);
  }

  async notificationRemote(EO) {
    EO.stopPropagation();
    let message = confirm("Вы уверены, что хотите удалить карту?");
    if (message) {
      let parrent = EO.currentTarget.parentNode.parentNode;
      let id = parrent.id;
      await this.myModel.removeCard(id);
      this.update();
    } else {
      return;
    }
  }

  learnMoreCard(EO) {
    let card = EO.currentTarget.parentNode;
    this.myModel.learnMoreCard(card.id);
    this.update();
  }

  addNewCard() {
    this.myModel.addNewCard();
    this.update();
  }

  validateField(EO) {
    let field = EO.currentTarget;
    this.myModel.validateField(field);
    this.update();
  }

  cancelValidateField(EO) {
    let field = EO.currentTarget;
    this.myModel.cancelValidateField(field);
  }

  async validationNewCard(EO) {
    let formNewCard = EO.currentTarget.parentNode;
    await this.myModel.validationNewCard(formNewCard);
    this.update();
  }

  cancelNewCard() {
    this.myModel.cancelNewCard();
    this.update();
  }

  initializationLogo(EO) {
    let value = EO.currentTarget.value;
    this.myModel.initializationLogo(value);
  }
}
